---
title: "Installing Arch Linux"
date: 2024-05-12T23:13:50-05:00
description: "My notes"
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

## Requirements
- Arch Linux ISO ({{<link url="https://archlinux.org/download/" text="grab the most recent release here">}})
- computer
- USB stick to flash the ISO to

## Pre-installation

### Connect to the internet

#### Ethernet
If possible connect your computer to the internet via Ethernet.

#### Wi-Fi
View the name of the network interface for Wi-Fi. Usually something like wlanx.
```
# list out network interfaces on the computer
ip address

# run the iwctl utility
iwctl

# list out the available wireless that are reachable
[iwd]# station wlan0 get-networks

# authenticate to a wireless network
iwctl --passphrase wirelessPassword station wlan0 connect wirelessNetworkName

# test the connection
ping google.com
```

### Establish remote connection to computer with SSH
This is not necessary but it allows one to use a higher resolution terminal emulator while installing Arch Linux. It is also useful so if you get stuck and some errors appear you can copy and paste it to find solutions.

#### Check that SSH server is running on the Arch Linux computer
```bash
systemctl status sshd
```

#### Set root password on the Arch Linux computer
This is a temporary password for the SSH server configuration.
```
passwd
```

#### Connect remotely to the Arch Linux computer
```bash
ssh root@xxx.xxx.xxx.xxx
```

## Installation
At this point Arch Linux is ready to be installed. One can use the `archinstall` script or manually install Arch.

### `archinstall`
```bash
archinstall
```


1. Choose the language used in the `archinstaller`
2. Choose mirrors (location/region of servers where the `archinstall` script will download software from)
3. Choose locale (keyboard layout, language code, encoding)
4. Disk configuration (where to install Arch, filesystem type, create separate partition for /home)
5. Choose bootloader
6. Unified kernel images
7. Swap (with zram)
8. Hostname
9. Root password
10. User account name
11. Profile

two kernels just in case for back up to boot in to

```bash
{
    "__separator__": null,
    "additional-repositories": [],
    "archinstall-language": "English",
    "audio_config": {
        "audio": "pipewire"
    },
    "bootloader": "Systemd-boot",
    "config_version": "2.8.0",
    "debug": false,
    "disk_config": {
        "config_type": "default_layout",
        "device_modifications": [
            {
                "device": "/dev/nvme0n1",
                "partitions": [
                    {
                        "btrfs": [],
                        "dev_path": null,
                        "flags": [
                            "Boot",
                            "ESP"
                        ],
                        "fs_type": "fat32",
                        "mount_options": [],
                        "mountpoint": "/boot",
                        "obj_id": "ea0db99e-1d5f-4014-9c77-bdb1a6dbf820",
                        "size": {
                            "sector_size": {
                                "unit": "B",
                                "value": 512
                            },
                            "unit": "GiB",
                            "value": 1
                        },
                        "start": {
                            "sector_size": {
                                "unit": "B",
                                "value": 512
                            },
                            "unit": "MiB",
                            "value": 1
                        },
                        "status": "create",
                        "type": "primary"
                    },
                    {
                        "btrfs": [],
                        "dev_path": null,
                        "flags": [],
                        "fs_type": "ext4",
                        "mount_options": [],
                        "mountpoint": "/",
                        "obj_id": "05a3b687-6b29-41a9-932b-80a40ce2cd2f",
                        "size": {
                            "sector_size": {
                                "unit": "B",
                                "value": 512
                            },
                            "unit": "GiB",
                            "value": 20
                        },
                        "start": {
                            "sector_size": {
                                "unit": "B",
                                "value": 512
                            },
                            "unit": "B",
                            "value": 1074790400
                        },
                        "status": "create",
                        "type": "primary"
                    },
                    {
                        "btrfs": [],
                        "dev_path": null,
                        "flags": [],
                        "fs_type": "ext4",
                        "mount_options": [],
                        "mountpoint": "/home",
                        "obj_id": "965aef6c-9f0a-489f-ae05-91378dd0ecd0",
                        "size": {
                            "sector_size": {
                                "unit": "B",
                                "value": 512
                            },
                            "unit": "B",
                            "value": 977654210560
                        },
                        "start": {
                            "sector_size": {
                                "unit": "B",
                                "value": 512
                            },
                            "unit": "B",
                            "value": 22549626880
                        },
                        "status": "create",
                        "type": "primary"
                    }
                ],
                "wipe": true
            }
        ]
    },
    "disk_encryption": {
        "encryption_type": "luks",
        "partitions": []
    },
    "hostname": "archlinux",
    "kernels": [
        "linux",
        "linux-lts"
    ],
    "locale_config": {
        "kb_layout": "us",
        "sys_enc": "UTF-8",
        "sys_lang": "en_US"
    },
    "mirror_config": {
        "custom_mirrors": [],
        "mirror_regions": {
            "United States": [
                "https://zxcvfdsa.com/arch/$repo/os/$arch",
                "https://ziply.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://volico.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://uvermont.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://us.mirrors.cicku.me/archlinux/$repo/os/$arch",
                "https://southfront.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://ridgewireless.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://repo.ialab.dsu.edu/archlinux/$repo/os/$arch",
                "https://plug-mirror.rcac.purdue.edu/archlinux/$repo/os/$arch",
                "https://ord.mirror.rackspace.com/archlinux/$repo/os/$arch",
                "https://opencolo.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://ohioix.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://nocix.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://nnenix.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://mnvoip.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://mirrors.xtom.com/archlinux/$repo/os/$arch",
                "https://mirrors.vectair.net/archlinux/$repo/os/$arch",
                "https://mirrors.sonic.net/archlinux/$repo/os/$arch",
                "https://mirrors.rit.edu/archlinux/$repo/os/$arch",
                "https://mirrors.ocf.berkeley.edu/archlinux/$repo/os/$arch",
                "https://mirrors.mit.edu/archlinux/$repo/os/$arch",
                "https://mirrors.lug.mtu.edu/archlinux/$repo/os/$arch",
                "https://mirrors.kernel.org/archlinux/$repo/os/$arch",
                "https://mirrors.iu13.net/archlinux/$repo/os/$arch",
                "https://mirrors.bloomu.edu/archlinux/$repo/os/$arch",
                "https://mirror.zackmyers.io/archlinux/$repo/os/$arch",
                "https://mirror.wdc1.us.leaseweb.net/archlinux/$repo/os/$arch",
                "https://mirror.tmmworkshop.com/archlinux/$repo/os/$arch",
                "https://mirror.theash.xyz/arch/$repo/os/$arch",
                "https://mirror.sfo12.us.leaseweb.net/archlinux/$repo/os/$arch",
                "https://mirror.pit.teraswitch.com/archlinux/$repo/os/$arch",
                "https://mirror.pilotfiber.com/archlinux/$repo/os/$arch",
                "https://mirror.mia11.us.leaseweb.net/archlinux/$repo/os/$arch",
                "https://mirror.lty.me/archlinux/$repo/os/$arch",
                "https://mirror.fcix.net/archlinux/$repo/os/$arch",
                "https://mirror.ette.biz/archlinux/$repo/os/$arch",
                "https://mirror.elightcap.com/archlinux/$repo/os/$arch",
                "https://mirror.dal10.us.leaseweb.net/archlinux/$repo/os/$arch",
                "https://mirror.clarkson.edu/archlinux/$repo/os/$arch",
                "https://mirror.arizona.edu/archlinux/$repo/os/$arch",
                "https://mirror.adectra.com/archlinux/$repo/os/$arch",
                "https://m.lqy.me/arch/$repo/os/$arch",
                "https://irltoolkit.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://iad.mirrors.misaka.one/archlinux/$repo/os/$arch",
                "https://iad.mirror.rackspace.com/archlinux/$repo/os/$arch",
                "https://ftp.osuosl.org/pub/archlinux/$repo/os/$arch",
                "https://forksystems.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://dfw.mirror.rackspace.com/archlinux/$repo/os/$arch",
                "https://coresite.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://codingflyboy.mm.fcix.net/archlinux/$repo/os/$arch",
                "https://arlm.tyzoid.com/$repo/os/$arch",
                "https://archmirror1.octyl.net/$repo/os/$arch",
                "https://arch.mirror.k0.ae/$repo/os/$arch",
                "https://arch.mirror.constant.com/$repo/os/$arch",
                "https://arch.hu.fo/archlinux/$repo/os/$arch",
                "https://america.mirror.pkgbuild.com/$repo/os/$arch",
                "http://ziply.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://wcbmedia.io:8000/$repo/os/$arch",
                "http://volico.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://uvermont.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://us.mirrors.cicku.me/archlinux/$repo/os/$arch",
                "http://southfront.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://ridgewireless.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://repo.miserver.it.umich.edu/archlinux/$repo/os/$arch",
                "http://repo.ialab.dsu.edu/archlinux/$repo/os/$arch",
                "http://plug-mirror.rcac.purdue.edu/archlinux/$repo/os/$arch",
                "http://ord.mirror.rackspace.com/archlinux/$repo/os/$arch",
                "http://opencolo.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://ohioix.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://nocix.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://nnenix.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://mnvoip.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://mirrors.xtom.com/archlinux/$repo/os/$arch",
                "http://mirrors.vectair.net/archlinux/$repo/os/$arch",
                "http://mirrors.sonic.net/archlinux/$repo/os/$arch",
                "http://mirrors.rutgers.edu/archlinux/$repo/os/$arch",
                "http://mirrors.rit.edu/archlinux/$repo/os/$arch",
                "http://mirrors.ocf.berkeley.edu/archlinux/$repo/os/$arch",
                "http://mirrors.mit.edu/archlinux/$repo/os/$arch",
                "http://mirrors.lug.mtu.edu/archlinux/$repo/os/$arch",
                "http://mirrors.kernel.org/archlinux/$repo/os/$arch",
                "http://mirrors.iu13.net/archlinux/$repo/os/$arch",
                "http://mirrors.gigenet.com/archlinux/$repo/os/$arch",
                "http://mirrors.cat.pdx.edu/archlinux/$repo/os/$arch",
                "http://mirrors.bloomu.edu/archlinux/$repo/os/$arch",
                "http://mirrors.bjg.at/arch/$repo/os/$arch",
                "http://mirrors.advancedhosters.com/archlinux/$repo/os/$arch",
                "http://mirrors.acm.wpi.edu/archlinux/$repo/os/$arch",
                "http://mirror.wdc1.us.leaseweb.net/archlinux/$repo/os/$arch",
                "http://mirror.vtti.vt.edu/archlinux/$repo/os/$arch",
                "http://mirror.siena.edu/archlinux/$repo/os/$arch",
                "http://mirror.sfo12.us.leaseweb.net/archlinux/$repo/os/$arch",
                "http://mirror.pit.teraswitch.com/archlinux/$repo/os/$arch",
                "http://mirror.mia11.us.leaseweb.net/archlinux/$repo/os/$arch",
                "http://mirror.metrocast.net/archlinux/$repo/os/$arch",
                "http://mirror.math.princeton.edu/pub/archlinux/$repo/os/$arch",
                "http://mirror.lty.me/archlinux/$repo/os/$arch",
                "http://mirror.fossable.org/archlinux/$repo/os/$arch",
                "http://mirror.fcix.net/archlinux/$repo/os/$arch",
                "http://mirror.ette.biz/archlinux/$repo/os/$arch",
                "http://mirror.elightcap.com/archlinux/$repo/os/$arch",
                "http://mirror.dal10.us.leaseweb.net/archlinux/$repo/os/$arch",
                "http://mirror.cs.vt.edu/pub/ArchLinux/$repo/os/$arch",
                "http://mirror.clarkson.edu/archlinux/$repo/os/$arch",
                "http://mirror.arizona.edu/archlinux/$repo/os/$arch",
                "http://mirror.adectra.com/archlinux/$repo/os/$arch",
                "http://irltoolkit.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://iad.mirrors.misaka.one/archlinux/$repo/os/$arch",
                "http://iad.mirror.rackspace.com/archlinux/$repo/os/$arch",
                "http://ftp.osuosl.org/pub/archlinux/$repo/os/$arch",
                "http://forksystems.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://distro.ibiblio.org/archlinux/$repo/os/$arch",
                "http://dfw.mirror.rackspace.com/archlinux/$repo/os/$arch",
                "http://coresite.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://codingflyboy.mm.fcix.net/archlinux/$repo/os/$arch",
                "http://arlm.tyzoid.com/$repo/os/$arch",
                "http://archmirror1.octyl.net/$repo/os/$arch",
                "http://arch.mirror.constant.com/$repo/os/$arch",
                "http://arch.hu.fo/archlinux/$repo/os/$arch"
            ]
        }
    },
    "network_config": {
        "type": "nm"
    },
    "no_pkg_lookups": false,
    "ntp": true,
    "offline": false,
    "packages": [],
    "parallel downloads": 0,
    "profile_config": {
        "gfx_driver": "Nvidia (proprietary)",
        "greeter": "sddm",
        "profile": {
            "custom_settings": {
                "Kde": {}
            },
            "details": [
                "Kde"
            ],
            "main": "Desktop"
        }
    },
    "save_config": null,
    "script": "guided",
    "silent": false,
    "skip_ntp": false,
    "skip_version_check": false,
    "swap": true,
    "timezone": "America/Chicago",
    "uki": false,
    "version": "2.8.0"
}
```

### Manual Installation
Installing manually is usually for educational purposes or more granular customization of the installation (rare, for autists).

#### List out storage volumes mounted to the computer
Pay attention to the size column to differentiate between drives.
```bash
lsblk
```

#### Setup partitions
Target the identifier found with `lsblk`
- set partition number
- set first sector: 1
- set last sector: +1G

- 2
- default
- +1G

- 3, 44 
```bash
fdisk /dev/sda

# view parition layout of the targeted device
Command (m for help): p

# create a new empty parition table
Command (m for help): g

# create three paritions
Command (m for help): n
Command (m for help): n
Command (m for help): n

# set the type of parition for the thrid one
Command (m for help): t

# check
Command (m for help): p

# commit write
w
```

#### Format
```bash
mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/sda2

# encrypt partition 3
# password is boobies
cryptsetup luksFormat /dev/sda3

# open encrypted parition
cryptsetup open --type luks /dev/sda3 lvm

# create a physical volume
# refer to lvm (name vivent)
pvcreate /dev/mapper/lvm

# create volume group
pvcreate /dev/mapper/lvm

# create a logical volume
lvcreate -L 30GB volgroup0
```

## References
- {{<link src="https://wiki.archlinux.org/title/Installation_guide" text="Arch Linux installation guide">}}
- {{<link src="https://www.youtube.com/watch?v=FxeriGuJKTM" text="Learn Linux TV's \"Arch Linux Installation Guide 2024: An Easy to Follow Tutorial\" YouTube video">}}