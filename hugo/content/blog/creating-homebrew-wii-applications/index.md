+++
title = 'Creating Homebrew Wii Applications'
date = 2024-07-23T06:02:19-05:00
draft = true
+++

## Setting up a development environment
[devkitPPC](https://wiibrew.org/wiki/DevkitPPC) is
> a port of the GNU Compiler Collection (GCC) and includes a C (gcc) and C++ compiler (g++), a debugger (gdb) and associated utilities, with the architecture "powerpc-eabi". 
>
> -- <cite>devkitPPC wiki article</cite>

Installation instructions for your OS is found [here](https://devkitpro.org/wiki/devkitPro_pacman). This will install a mini package manager (based on Arch Linux's `pacman`) specifically for installing and managing devkitPro's tools. When installing wii-dev there will be a prompt to select 
```bash
# download the install script
wget https://apt.devkitpro.org/install-devkitpro-pacman

# make the install script executable
chmod +x ./install-devkitpro-pacman

# run the install script
sudo ./install-devkitpro-pacman

# install wii dev tools
sudo dkp-pacman -S wii-dev

# tool chains are found here
cat /etc/profile.d/devkit-env.sh

# add tool chains to .bashrc
echo "export DEVKITPRO=/opt/devkitpro" >> .bashrc
echo "export DEVKITARM=${DEVKITPRO}/devkitARM" >> .bashrc
echo "export DEVKITPPC=${DEVKITPRO}/devkitPPC" >> .bashrc
echo "export PATH=${DEVKITPRO}/tools/bin:$PATH" >> .bashrc

# list installed packages
dkp-pacman -Q

# install gcc and make
sudo apt install gcc make -y
```

In VSCode set the '"includePath"' (array) property in `c_cpp_properties.json` add `"/opt/devkitpro/libogc/include"` so that VSCode knows where to search for the devkitpro header files.

Makefile's are read by the `make` command which automates the process of compiling C and C++ programs. It allows developers to use environment variables and logic. Will go into further detail later on.

To test out the compiled programs (.dol files) use the [Dolphin Emulator](https://dolphin-emu.org/). Download this onto your OS.

After installing go to tools > perform online system update > United States.
Tools > load wii system menu.

After loading it will start the emulator and go through the Wii's initial setup wizard.

So far I have got the tool chain to work properly and the executable load and runs in Dolphin. Going to learn more and annotate and create tutorial series.