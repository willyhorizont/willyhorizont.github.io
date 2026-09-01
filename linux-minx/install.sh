#!/bin/bash

# =====================================================================
# Linux Minx
## Ultra Lightweight Debian 13 (Trixie) Based Linux Distro for Older Hardware
# =====================================================================

su -c "
apt update && apt install --no-install-recommends -y \
    sudo \
    xserver-xorg-core \
    xserver-xorg \
    xinit \
    icewm \
    lightdm \
    gvfs-backends \
    iwd \
    firmware-iwlwifi \
    adwaita-icon-theme \
    hicolor-icon-theme \
    git \
    firefox-esr \
    mousepad \
    lxterminal \
    pcmanfm \
    lxpanel \
    lemonbar

usermod -aG sudo $USER
"

echo "====================================================================="
echo " Base Setup Done!"
echo " Please reboot and run this command:"
echo "   sudo systemctl enable --now iwd"
echo "   iwctl"
echo "   device list"
echo "   station wlan0 scan"
echo "   station wlan0 get-networks"
echo "   station wlan0 connect 'Your Wifi Name'"
echo "   quit"
echo "====================================================================="

mkdir -p ~/.icewm
cp /usr/share/icewm/preferences ~/.icewm/preferences

cat << 'EOF' >> ~/.icewm/preferences
DesktopMenuButton=0
ShowTaskBar=0
EOF

cat << 'EOF' > ~/.icewm/startup
#!/bin/bash

lxpanel &
EOF

chmod +x ~/.icewm/startup

echo "=== Bootstrap Done! ==="
echo " Please reboot"
