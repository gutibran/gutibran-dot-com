---
title: "Mastering Linux Security and Hardening Notes"
date: 2024-05-14T19:13:05-05:00
description: "My notes that I took while reading the book \"Mastering Linux Security and Hardening Third Edition\" by Donald A. Tevault."
draft: true
pageType: "post"
postType: "notes"
tags: ["system administration", "linux"]
enableBreadcrumbs: true 
enableMathJax: false
enableSyntaxHighlighting: true 
enableUtterances: true
enableHeadingAnchors: true 
toc: true
displayTitle: true
---

## Chapter 1: Running Linux in a virtual environment

### Setting up VMs in VirtualBox
Download ISOs for {{<link url="https://almalinux.org/get-almalinux/" text="Alma Linux 8 and 9">}}, {{<link url="https://www.centos.org/download/" text="CentOS 7">}}, {{<link url="https://ubuntu.com/download/server" text="Ubuntu Server 24.04">}}, and {{<link url="https://www.debian.org/download" text="Debian 12">}}.

Set the network adapter for each VM to "bridged" so that each VM gets its own IP address. This so remote connections can be set up with SSH.

#### Enabling SSH
```bash
sudo systemctl enable sshd
sudo systemctl start sshd
sudo systemctl status sshd
```

### Installing EPEL repository in CentOS and AlmaLinux
The standard repositories for CentOS and AlmaLinux are unsubstantial. EPEL is a project run by the Fedora team.

#### Install EPEL repository in CentOS / Red Hat 7
To install third-party package repositories a priorities package needs to be installed and changes to `.repo` files need to be made to set the priorities for each repository which will prevent packages from these third party repositories from overwriting official distribution packages if they have the same name.
```bash
# install the best text editor
sudo yum install vim

sudo yum install yum-plugin-priorities epel-release
```

In `/etc/yum.repos.d` add `priority=1` to the `[base]`, `[updates]`, `[extras]` sections and `priority=2` to the `[centosplus]` in `/etc/yum.repos.d/CentOS-Base.repo` and add `priority=10` to the end of the `[epel]` section and `priority=11` to the end of every other section in the file. Then update the system.

```bash
sudo yum upgrade
sudo yum list > yum_list.txt
```

#### Install EPEL repository in AlmaLinux
```bash
sudo dnf install epel-release
sudo dnf upgrade
sudo dnf list > dnf_list.txt
```

### Updating systems
The main idea in this chapter is to automatically download updates but do not install them on a production server until the updates have been tested on a mock production server.

#### Debian based distributions
```bash
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade

# get rid of packages that are no longer needed on the system
sudo apt autoremove
```

##### Setting up automatic upgrades on Ubuntu Server
Ubuntu Server has `unattended-upgrades` installed by default. Check if the service is enabled and running properly.
```bash
sudo systemctl status unattended-upgrades
```

Check if auto updating is enabled in `/etc/apt/apt.conf.d/20auto-upgrades`, If `APT::Periodic::Update-Package-Lists` and `APT::Periodic::Unattended-Upgrade` are set to `1` then that setting is enabled. Setting an option to `0` will disable that setting.

In `/etc/apt/apt.conf.d/50unattended-upgrades` `Unattended-Upgrade::Automatic-Reboot` determines if the system will automatically reboot when it is required to by the updates. `Unattended-Upgrade::Automatic-Reboot-Time` sets the time that the system will reboot if it is set to do so.

To turn off automatic upgrades (installation aspect), this is what `/etc/apt/apt.conf.d/20auto-upgrades` should look like.

```plaintext
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "0";
```

Check for available security related updates.
```bash
# check for security update
sudo unattended-upgrade --dry-run -d

# manually install security updates
sudo unattended-upgrade -d
```

##### Setting up automatic upgrades on Debian 
Install the `unattended-upgrades` package.

```bash
sudo apt install unattended-upgrades -y

# ensure that unattended-upgrades does not interrupt any higher prioritized process
dpkg-reconfigure --priority=low unattended-upgrades
```

##### Setting up automatic upgrades on RedHat 7
```bash
# upgrade system
sudo yum upgrade

# check if there are any security related upgrades that are ready to be installed
sudo yum updateinfo list updates security

# install security related updates
sudo yum upgrade --security

# install package to allow CentOS to automatically update
sudo yum install yum-cron

# enable the service
sudo systemctl enable --now yum-cron
```

In `/etc/yum/yum-cron.conf` set `update_cmd` to `security`. This file list all the available options for upgrading that can be set for `update_cmd`. Set `download_updated` to `yes` and `apply_updates` to `no` to download all security updates but not install them automatically. Email settings can be found in the file. Set `email_to` the user that should receive email when updates are downloaded. To view the emails a command-line mail client will need to be installed such as `mutt`.

```bash
sudo yum install mutt
```

Some updates will require the system to be rebooted for updates to be applied. Use the `needs-restarting` command to show services and reasons why a reboot is required.

```bash
sudo yum install yum-utils

sudo needs-restarting 
sudo needs-restarting -s
sudo needs-restarting -r
```

##### Setting up automatic upgrades on RedHat 8 and 9
`dnf-automatic` is similar to `yum-cron`. The difference is that `dnf-automatic` works with `systemd-timer` instead of `cron`. The timer is disabled by default. `/etc/dnf/automatic.cron` is the configuration file.
```bash
# upgrade system
sudo dnf upgrade

# install package for automatic upgrades
sudo dnf install dnf-automatic

# enable timer
sudo systemctl enable --now dnf-automatic.timer

# check the status of the service
sudo systemctl status dnf-automatic-timer

# install package that contains needs-restarting
sudo dnf install yum-utils

# determine if the system needs to be restarted 
needs-restarting
```

Finally create snapshots of each VM so that if any errors are made while doing the labs there is pristine state that can be reverted to.

### Resources to keep up with security news
The author recommends these sites.

- {{<link url="https://packetstormsecurity.com/" text="Packet Storm Security">}}
- {{<link url="https://thehackernews.com/" text="The Hacker News">}}
- {{<link url="https://arstechnica.com/" text="Ars Technica" >}}
- {{<link url="https://www.fudzilla.com/" text="Fudzilla">}}
- {{<link url="https://www.theregister.co.uk/" text="The Register">}}
- {{<link url="https://www.zdnet.com/" text="ZDNet">}}
- {{<link url="http://lxer.com/" text="LXer">}}
- {{<link url="https://www.youtube.com/channel/UC88eard_2sz89an6unmlbeA" text="BeginLinux Guru on YouTube">}}

## Chapter 2: Securing administrative user accounts
