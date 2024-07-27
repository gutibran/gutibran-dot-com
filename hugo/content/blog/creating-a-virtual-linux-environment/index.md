+++
title = 'Creating a Virtual Linux Environment'
date = 2024-07-26T19:17:14-05:00
draft = true
+++

# Chapter 1
Here is my setup for learning Linux. I found some books on a boat near a lake in the area where I live.

I found these books. Here are the ISBN-13s.
- 978-1264798964
- 978-1119878940
- 978-1119879619

The distributions used are Rocky Linux (RHEL), Ubuntu (Debian), OpenSUSE, and Fedora. Find the ISOs for these distributions on the internet. Learn the main flavors of Linux used in corporate environments.

After creating VMs for each of these distributions update and upgrade the packages (software).

For rocky linux.
```bash
sudo dnf update -y
```

For Ubuntu.
```bash
sudo apt-get update -y
sudo apt-get upgrade -y
```

For openSUSE.
```bash
sudo zypper patch
```

For Fedora.
```bash
sudo su -c 'dnf upgrade'

# if few packages get updated
sudo su -c 'dnf upgrade -refresh'
```

To locate a TTY. Press CTRL + ALT + one of the function keys.

# Chapter 2 - what is a linux server
