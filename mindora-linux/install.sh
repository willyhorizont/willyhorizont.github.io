#!/bin/bash

# =====================================================================
# Linux Mindora
## Ultra Lightweight Fedora Based Linux Distro for Older Hardware and Newer Hardware
# =====================================================================

sudo dnf install --setopt=install_weak_deps=False -y \
    labwc \
    ly \
    gvfs-backends \
    adwaita-icon-theme \
    hicolor-icon-theme \
    git \
    firefox \
    mousepad \
    foot \
    pcmanfm-qt \
    sfbar \
    yabar

echo "====================================================================="
echo " Base Setup Done!"
echo " to connect Wi-Fi, run this command:"
echo "   sudo nmcli device wifi connect 'Your Wifi Name' password 'Your Wifi Password'"
echo "====================================================================="

sudo systemctl disable dnf-makecache.timer
sudo systemctl disable abrt-journal-core.service

mkdir -p ~/.config/labwc

cat << 'EOF' > ~/.config/labwc/autostart
#!/bin/sh

yabar &
sfbar &
EOF

chmod +x ~/.config/labwc/autostart

echo "=== Bootstrap Done! ==="
echo " Please reboot"
