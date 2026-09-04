# Linux Mindora
## Ultra Lightweight Fedora Based Linux Distro for Older and Newer Hardware

## Install
```
sudo dnf install --setopt=install_weak_deps=False -y curl ca-certificates
mkdir -p ~/mindora-linux
curl -L -o ~/mindora-linux/install.sh https://willyhorizont.github.io/mindora-linux/install.sh
bash ~/mindora-linux/install.sh
```

## Update Top Bar Simple Resource Monitor
```
curl -L -o ~/.config/labwc/SPRM.sh https://willyhorizont.github.io/linux/SPRM.sh
```

## Installed Packages
* labwc
* gvfs
* adwaita-icon-theme
* hicolor-icon-theme
* git
* firefox
* mousepad
* foot
* pcmanfm-qt
* waybar
* fuzzel
* bc
* dejavu-fonts-all
* liberation-fonts

## Disabled Fedora Features
```
sudo systemctl disable dnf-makecache.timer
```

## Install package
```
sudo dnf install --setopt=install_weak_deps=False packagename
```

## Uninstall package
```
sudo dnf remove packagename && sudo dnf autoremove
```

## Top Best Lightweight Alternative for Text Editor
* mousepad
* kwrite
* kate

## Top Best Lightweight Alternative for File Manager
* pcmanfm-qt
* thunar

## Top Best Lightweight Alternative for Terminal Emulator
* foot

## Top Best Lightweight Alternative for Bottom Panel
* waybar
* lavalauncher

## Top Best Lightweight Alternative for Top Bar
* waybar
