+++
title = 'Active Directory Home Lab Setup'
date = 2024-07-17T16:30:19-05:00
draft = false
postType = 'blog'
isProjectWriteup = true
projectName = 'Active Directory Home Lab'
+++
## Setup

### Designing an internal network for the VMs

### Creating VMs
First I created two VMs, one for Windows Server 2022 and one for Windows 10 which will be our client. I used Oracle's VirtualBox to this. The `vboxmanage` tool was used to automate the process of creating the Windows Server VM. I am using Linux as my host OS. I created a script for this because it is faster than using the VirtualBox's GUI and it is reproducible.

Here is the script to create the Windows Server 2022 VM. Run through the initial installation wizard and install VirtualBox's guest additions.
```bash
#!/bin/bash
vboxmanage createvm --name "Windows Server 2022" --ostype "Windows2022_64" --register

vboxmanage createhd --filename "/home/brandon/VirtualBox VMs/Windows Server 2022/Windows Server 2022.vdi" --size 50000 --format VDI --variant Standard

vboxmanage storagectl "Windows Server 2022" --name "SATA Controller" --add sata --controller IntelAhci

vboxmanage storageattach "Windows Server 2022" --storagectl "SATA Controller" --port 0 --device 0 --type hdd --medium "/home/brandon/VirtualBox VMs/Windows Server 2022/Windows Server 2022.vdi"

vboxmanage modifyvm "Windows Server 2022" --memory 8196 --graphicscontroller VBoxSVGA --vram 256 --accelerate3d on --cpus 4

vboxmanage modifyvm "Windows Server 2022" --boot1 dvd --boot2 disk --boot3 none --boot4 none

vboxmanage modifyvm "Windows Server 2022" --clipboard bidirectional --draganddrop bidirectional

vboxmanage modifyvm "Windows Server 2022" --nic1 nat

vboxmanage modifyvm "Windows Server 2022" --nic2 intnet

vboxmanage storagectl "Windows Server 2022" --name "IDE Controller" --add ide

vboxmanage storageattach "Windows Server 2022" --storagectl "IDE Controller" --port 0 --device 0 --type dvddrive --medium "/home/brandon/ISOs/en-us_windows_server_2022_updated_july_2024_x64_dvd_fee121d6.iso"

vboxmanage startvm "Windows Server 2022"
```

Here is the script to create the Windows 10 VM. I used Windows 10 because is slightly less of a pain in the ass to install compared to Windows 11. Windows 11 requires a Microsoft account to install the OS. Me and the homies don't use Windows. Just kidding I don't have friends. Run through the initial installation wizard and install VirtualBox's guest additions.
```bash
#!/bin/bash
vboxmanage createvm --name "Windows 10" --ostype "Windows10_64" --register

vboxmanage createhd --filename "/home/brandon/VirtualBox VMs/Windows 10/Windows 10.vdi" --size 50000 --format VDI --variant Standard

vboxmanage storagectl "Windows 10" --name "SATA Controller" --add sata --controller IntelAhci

vboxmanage storageattach "Windows 10" --storagectl "SATA Controller" --port 0 --device 0 --type hdd --medium "/home/brandon/VirtualBox VMs/Windows 10/Windows 10.vdi"

vboxmanage modifyvm "Windows 10" --memory 8196 --graphicscontroller VBoxSVGA --vram 256 --accelerate3d on --cpus 4

vboxmanage modifyvm "Windows 10" --boot1 dvd --boot2 disk --boot3 none --boot4 none

vboxmanage modifyvm "Windows 10" --clipboard bidirectional --draganddrop bidirectional

vboxmanage modifyvm "Windows 10" --nic1 intnet

vboxmanage modifyvm "Windows 10" --nic1 nat

vboxmanage storagectl "Windows 10" --name "IDE Controller" --add ide

vboxmanage storageattach "Windows 10" --storagectl "IDE Controller" --port 0 --device 0 --type dvddrive --medium "/home/brandon/ISOs/26100.1.240331-1435.ge_release_CLIENT_ENTERPRISES_OEM_x64FRE_en-us.iso"

vboxmanage startvm "Windows 10"
```

#### Configuring Windows Server 2022 VM
It will prompt you to set the administrator password.

Run this command to activate your Windows Server 2022 VM.
```powershell
irm "https://get.activated.win" | iex
```

Download guest additions for Windows Server 2022. On Linux specifically Kubuntu 24.04, VirtualBox does not download the guest additions within the GUI for some reason. The guest additions can be found at https://download.virtualbox.org/virtualbox/7.0.16/.

When inside the VM run this to run the guest additions install script. Reboot afterwards.
```powershell
Set-Location D:
./VBoxWindowsAdditions-amd64.exe
```

Explicitly name NICs to differentiate between them. Remember one for accessing the internet and one for accessing the internal virtual network. The NIC for accessing the internet will get its IP address automatically from the LAN that the host OS is connected to. The second NIC has to have its IP set for the internal network manually. This can be done through the GUI by going through settings > network & internet > change adapter options > rename. To double check which NIC is which is to check the status. The NIC with an IP address is the first one and the the NIC without an IP is second one for the internal virtual network.
```powershell
Get-NetAdapter
Rename-NetAdapter -Name "Ethernet" -NewName "Internet"
Rename-NetAdapter -Name "Ethernet2" -NewName "Internal"
```

Set the IP address, subnet mask, and the DNS server for the second NIC.
```powershell
New-NetIPAddress -InterfaceAlias "Internal" -IPAddress 192.168.1.100 -PrefixLength 24
Set-DnsClientServerAddress -InterfaceAlias "Internal" -ServerAddresses ("127,0.0.1")

# if you make a mistake you have to delete and re-write the entire command
Remove-NetIPAddress -InterfaceAlias "Internal" 172.16.0.1
```

Rename the PC.
```powershell
Rename-Computer -NewName "ADLabDC" -Restart
```

Install Active Directory Name Services.
```powershell
# list all available server roles (services)
Get-WindowsFeature -Name *

# filter active directory roles
Get-WindowsFeature -Name AD*

# install active directory domain services
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# import the module for active directory deployment
# create domain and deploy
Install-ADDSForest `
    -DomainName "mydomain.com" `
    -DomainNetbiosName "MYDOMAIN" `
    -DomainMode "WinThreshold" `
    -ForestMode "WinThreshold" `
    -SafeModeAdministratorPassword (ConvertTo-SecureString "L0ner1$m09" -AsPlainText -Force) `
    -DatabasePath "C:\Windows\NTDS" `
    -LogPath "C:\Windows\NTDS" `
    -SysvolPath "C:\Windows\SYSVOL" `
    -Force:$true

# restart the compuer
Restart-Computer

# create a new admin account
import-Module ActiveDirectory
New-ADUser -Name "NewAdmin" -GivenName "New" -Surname "Admin" -SamAccountName "NewAdmin" -UserPrincipalName "NewAdmin@yourdomain.com" -Path "OU=Admins,DC=yourdomain,DC=com" -AccountPassword (ConvertTo-SecureString "Password123!" -AsPlainText -Force) -Enabled $true -PasswordNeverExpires $true

# Add user to Domain Admins group
Add-ADGroupMember -Identity "Domain Admins" -Members "NewAdmin"

# log out
shutdown /l
```

#### Configuring Windows 10 VM
