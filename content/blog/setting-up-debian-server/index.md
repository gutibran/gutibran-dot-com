---
title: "Setting Up Debian Server"
date: 2024-05-11T19:30:56-05:00
description: "Notes on how to configure and harden a Debian Linux server. This is a very basic setup."
draft: false
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
```

### Configure SSH server
This is the bare minimum for a hardened SSH server.
- disable root login
- disable password authentication
- change the port used (prevent automated attacks by bots, also be sure to open this port in the firewall)
```bash
cd /etc/ssh
vim sshd_config
```

### Install unattended-upgrades
This is to automatically keep packages up to date.
```bash
apt install unattended-upgrades -y
dpkg --reconfigure --priority=low unattended-upgrades
```

### Install and configure firewall (UFW)
```bash
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

### Install and configure Fail2Ban
```bash
apt install fail2ban -y
```



### Create a user with limited privileges
```bash
apt install sudo -y
reboot now 
useradd natalie
usermod -a -G natalie sudo
```

## References