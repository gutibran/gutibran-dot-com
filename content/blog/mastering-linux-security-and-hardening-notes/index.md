---
title: "Mastering Linux Security and Hardening Notes"
date: 2024-05-14T19:13:05-05:00
description: ""
draft: false
pageType: "root"
tags: []
enableBreadcrumbs: false
enableMathJax: false
enableSyntaxHighlighting: false
enableUtterances: false
enableHeadingAnchors: false
toc: false
displayTitle: true
---

## Chapter 1: Running Linux in a Virtual Environment

### Setting up VMs
- CentOS 7
- Alma Linux 8
- Alma Linux 9
- Ubuntu Server 24.04
- Debian 12

```bash
sudo apt update
sudo apt dist-upgrade
```

#### Install EPEL repo in CentOS.
```bash
sudo yum install vim
sudo yum install yum-plugin-priorities epel-release
```

Add `pritority=1` to the `[base]`, `[updates], [extras]` sections and `pritority=2` to the `[centosplus]` in `/etc/yum.repos.d/CentOS-Base.repo`.

Add `priority=10` to the end of the `[epel]` section and `priority=11` to the end of every other section in `/etc/yum.repos.d/epel.repo`.

Update the system and create a list of installed and available packages.
```bash
sudo yum upgrade
sudo yum list > yum_list.txt
```

#### Install EPEL repo in AlmaLinux
```bash
sudo dnf install epel-release
```