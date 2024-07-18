+++
title = 'Active Directory Home Lab'
date = 2024-07-17T16:30:19-05:00
draft = false
postType = 'blog'
isProjectWriteup = true
projectName = 'Active Directory Home Lab'
+++

## Introduction
I used Oracle's VirtualBox to create a virtual environment to learn the basics of Microsoft's Active Directory, Windows Server 2022, and PowerShell.

## Designing a virtual network for the VMs

## Setup
I used Linux specifically Kubuntu 22.04 as the host OS. I have created a bash script to automate the creation of the Windows Server 2022 and Windows 10 VMs to speed up the process of spinning up new VMs in the future. The script is available on [my GitHub](https://github.com/gutibran/scripts) as well. After creating and starting up the VMs go through the initial installation wizards as usual.

### Creating the Windows Server 2022 VM
It is important to create two NICs. One NIC is for accessing the virtual internal network to communicate with other VMs and the other NIC is to access the internet.
```bash
#!/bin/bash

vboxmanage createvm --name "Windows Server 2022" \
    --ostype "Windows2022_64" \
    --register

vboxmanage createhd --filename "/home/brandon/VirtualBox VMs/Windows Server 2022/Windows Server 2022.vdi" \
    --size 50000 \
    --format VDI \
    --variant Standard

vboxmanage storagectl "Windows Server 2022" \
    --name "SATA Controller" \
    --add sata \
    --controller IntelAhci

vboxmanage storageattach "Windows Server 2022" \
    --storagectl "SATA Controller" \
    --port 0 \
    --device 0 \
    --type hdd \
    --medium "/home/brandon/VirtualBox VMs/Windows Server 2022/Windows Server 2022.vdi"

vboxmanage modifyvm "Windows Server 2022" \
    --memory 8196 \
    --graphicscontroller VBoxSVGA \
    --vram 256 \
    --accelerate3d on \
    --cpus 4

vboxmanage modifyvm "Windows Server 2022" \
    --boot1 dvd \
    --boot2 disk \
    --boot3 none \
    --boot4 none

vboxmanage modifyvm "Windows Server 2022" \
    --clipboard bidirectional \
    --draganddrop bidirectional

vboxmanage modifyvm "Windows Server 2022" \
    --nic1 nat

vboxmanage modifyvm "Windows Server 2022" \
    --nic2 intnet

vboxmanage storagectl "Windows Server 2022" \
    --name "IDE Controller" \
    --add ide

vboxmanage storageattach "Windows Server 2022" \
    --storagectl "IDE Controller" \
    --port 0 \
    --device 0 \
    --type dvddrive \
    --medium "/home/brandon/ISOs/en-us_windows_server_2022_updated_july_2024_x64_dvd_fee121d6.iso"

vboxmanage startvm "Windows Server 2022"
```

### Creating the Windows 10 VM
The Windows 10 client VM will only have one NIC that communicates with the virtual network. Windows Server 2022 will be set up as a RAS so the clients can access the internet through it.
```bash
#!/bin/bash

vboxmanage createvm --name "Windows 10" \
    --ostype "Windows10_64" \
    --register

vboxmanage createhd --filename "/home/brandon/VirtualBox VMs/Windows 10/Windows 10.vdi" \
    --size 50000 \
    --format VDI \
    --variant Standard

vboxmanage storagectl "Windows 10" \
    --name "SATA Controller" \
    --add sata \
    --controller IntelAhci

vboxmanage storageattach "Windows 10" \
    --storagectl "SATA Controller" \
    --port 0 \
    --device 0 \
    --type hdd \
    --medium "/home/brandon/VirtualBox VMs/Windows 10/Windows 10.vdi"

vboxmanage modifyvm "Windows 10" \
    --memory 8196 \
    --graphicscontroller VBoxSVGA \
    --vram 256 \
    --accelerate3d on \
    --cpus 4

vboxmanage modifyvm "Windows 10" \
    --boot1 dvd \
    --boot2 disk \
    --boot3 none \
    --boot4 none

vboxmanage modifyvm "Windows 10" \
    --clipboard bidirectional \
    --draganddrop bidirectional

vboxmanage modifyvm "Windows 10" \
    --nic1 intnet

vboxmanage modifyvm "Windows 10" \
    --nic1 nat

vboxmanage storagectl "Windows 10" \
    --name "IDE Controller" \
    --add ide

vboxmanage storageattach "Windows 10" \
    --storagectl "IDE Controller" \
    --port 0 \
    --device 0 \
    --type dvddrive \
    --medium "/home/brandon/ISOs/26100.1.240331-1435.ge_release_CLIENT_ENTERPRISES_OEM_x64FRE_en-us.iso"

vboxmanage startvm "Windows 10"
```

### Post-installation setup for Windows Server 2022
Activate Windows Server 2022 with this command.
```powershell
irm "https://get.activated.win" | iex
```   

Then I installed VirtualBox's guest additions. For some reason my VirtualBox installation fails to install guest additions so I downloaded them from VirtualBox's [download index](https://download.virtualbox.org/virtualbox/7.0.16/) for my installed version of VirtualBox and inserted the guest additions ISO through the GUI. Then I ran this command to run the guest additions install executable.
```powershell
Set-Location D:
./VBoxWindowsAdditions-amd64.exe
```

After installing Windows Server 2022 the VM will reboot and prompt for a new administrator password.