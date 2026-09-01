#!/bin/bash

# =====================================================================
# Linux Minx
## Ultra Lightweight Debian Based Linux Distro for Older Hardware
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

/usr/sbin/usermod -aG sudo $USER
"

mkdir -p ~/.icewm
cp /usr/share/icewm/preferences ~/.icewm/preferences

cat << 'EOF' >> ~/.icewm/preferences
DesktopMenuButton=0
ShowTaskBar=0
EOF

curl -L -o ~/.icewm/lemonbar-simple-resource-monitor.sh https://willyhorizont.github.io/linux-minx/lemonbar-simple-resource-monitor.sh

cat << 'EOF' > ~/.icewm/startup
#!/bin/bash
lxpanel &
~/.icewm/lemonbar-simple-resource-monitor.sh | lemonbar -p -g x20+0+0 -f "monospace-10" &
EOF

chmod +x ~/.icewm/lemonbar-simple-resource-monitor.sh
chmod +x ~/.icewm/startup

echo "====================================================================="
echo " Linux Minx Installation Done!"
echo " Please reboot and run this command:"
echo "   sudo systemctl enable --now iwd"
echo "   iwctl"
echo "   device list"
echo "   station wlan0 scan"
echo "   station wlan0 get-networks"
echo "   station wlan0 connect 'Your Wifi Name'"
echo "   quit"
echo "====================================================================="
