---
title: "Setting Up Debian Server"
date: 2024-05-11T19:30:56-05:00
description: "Notes on how to configure and harden a Debian Linux server. This is a very basic setup."
draft: true
pageType: "post"
postType: "notes"
tags: []
enableBreadcrumbs: true 
enableMathJax: true
enableSyntaxHighlighting: true
enableUtterances: true
enableHeadingAnchors: true 
toc: true 
displayTitle: true
---

This is not the "ultimate" guide, definitive guide, or anything like that. I am still learning about configuring and hardening a Debian Linux server. This is just the bare minimum for my needs.

## Requirements
- A server (VPS (virtual private server))

## Post-installation

### Update packages
```bash
apt update -y
apt upgrade -y
apt dist-upgrade
```

### Configure SSH server
This is the bare minimum for a hardened SSH server.
- disable root login
- disable password authentication
- change the port used (prevent automated attacks by bots, also be sure to open this port in the firewall)
- set address family to only use IPv4 (inet, prove this correlation with ip address command)

Edit the file(s) in `/etc/ssh/sshd_config.d/` because any configuration settings within those files will override the configuration settings in `/etc/ssh/sshd_config`.
```bash
cd /etc/ssh
vim sshd_config
systemctl reload sshd
systemctl status sshd
```

### Install unattended-upgrades
This is to automatically keep packages up to date.
```bash
apt install unattended-upgrades -y
dpkg-reconfigure --priority=low unattended-upgrades
```

### Create a user with limited privileges
```bash
# create a new user
adduser natalie

# add the user to sudo group
usermode -a -G natalie sudo
```

### Install and configure firewall (UFW)
```bash
# see what ports are open
sudo netcat -tunlp
ss -tunlp
apt install ufw -y
ufw default deny incoming
ufw default allow outgoing
```

The ports to be open and closed depends on what services are to be run.
```bash
ufw limit port/protocol
ufw allow port/protocol
```

Enable and start the ufw service. Check if the ufw started with no errors.
```bash
systemctl enable ufw
systemctl start ufw
systemctl status ufw
```

#### Block ping requests
In the file `/etc/ufw/before.rules` comment the last line and add the highlighted line to the section "ok icmp codes for INPUT".
```bash{hl_lines="2"}
# ok icmp codes for INPUT
-A ufw-before-input -p icmp --icmp-type echo-request -j DROP 
-A ufw-before-input -p icmp --icmp-type destination-unreachable -j ACCEPT
-A ufw-before-input -p icmp --icmp-type time-exceeded -j ACCEPT
-A ufw-before-input -p icmp --icmp-type parameter-problem -j ACCEPT
#-A ufw-before-input -p icmp --icmp-type echo-request -j ACCEPT
```

### Install and configure Fail2Ban
```bash
apt install fail2ban -y
```

Edit `/etc/fail2ban/jail.local`.
```bash
[DEFAULT]
ignoreip = 127.0.0.1/8 ::1
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
```

In `/etc/fail2ban/jail.conf` set the `backend` setting to `systemd` and in `/etc/fail2ban/fail2ban.conf` add `allowipv6 = yes` to the `[Definition]` section.

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
sudo systemctl status fail2ban
```

### Establishing an SSH honeypot
```bash
# clone repo
git clone https://github.com/skeeto/endlessh
cd endlessh

# compile the binary
make

# move binary into a directory within path vairable
sudo mv endless /usr/local.bin

# copy systemd service file
sudo cp util/endlessh.service /etc/systemd/system

# enable the service
sudo systemctl enable endlessh

# make configuration file and directory
sudo mkdir /etc/endlessh
sudo touch /etc/endlessh/config
sudo vim /etc/endlessh/config
sudo systemctl start endlessh
sudo netstat -tunlp
```

It did not work for me initially, I followed the steps on this {{<link url="https://askubuntu.com/questions/1385002/endlessh-failed-to-start-endlessh-ssh-tarpit" text="Stack Exchange \"askubuntu\" forum post">}} and got the service to work.

View how the gibberish that will be sent with the `-v` option when running SSH.
```bash
ssh root@host -p 22 -vvv
```

The gibberish will look like this. This will go on indefinitely until the attacker manually interrupts the automated attack. The attacker could hypothetically be stuck here forever, ha.
```bash
debug1: kex_exchange_identification: banner line 0: GGp-#]uDoe:%P,@Gh"OUX/Nv"GO/P*
debug1: kex_exchange_identification: banner line 1: JIfeaCoT.3G$/#@ZR"ZBXZ1SC
debug1: kex_exchange_identification: banner line 2: }/gJ
debug1: kex_exchange_identification: banner line 3: z89T"J9u+.,R3%"3gEz>`I"
debug1: kex_exchange_identification: banner line 4: +`fPq
debug1: kex_exchange_identification: banner line 5: Y+]*knt;m$HU,
```

### Create a user with limited privileges
```bash
apt install sudo -y
reboot now 
useradd tux
usermod -a -G tux sudo
```

### View access logs
```bash
sudo journalctl -u ssh
```

## References
- {{<link url="https://christitus.com/linux-security-mistakes/" text="Chris Titus's \"The Biggest Security Mistakes\" YouTube video">}}
- {{<link url="https://www.youtube.com/watch?v=ZhMw53Ud2tY" text="NetworkChuck's \"5 Steps to Secure Linux (protect from hackers)\" YouTube video">}}
- {{<link url="https://www.youtube.com/watch?v=SKhKNUo6rJU" text="Wolfgang's Channel's \"SSH Honeypot in 4 Minutes - Trap Hackers in Your Server\" YouTube video">}}
- {{<link url="https://askubuntu.com/questions/1385002/endlessh-failed-to-start-endlessh-ssh-tarpit" text="Stack Exchange \"askubuntu\" forum post tho fix endlessh service start error">}}
- {{<link url="https://github.com/skeeto/endlessh/issues/66" text="endlessh github issue">}}