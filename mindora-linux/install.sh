#!/bin/bash

# =====================================================================
# Linux Mindora
## Ultra Lightweight Fedora Based Linux Distro for Older and Newer Hardware
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
    bc \
    fonts-dejavu-core \
    fonts-liberation \
    yabar

sudo systemctl disable dnf-makecache.timer
sudo systemctl disable abrt-journal-core.service

mkdir -p ~/.config/labwc
mkdir -p ~/.config/yabar

curl -L -o ~/.config/labwc/SPRM.sh https://willyhorizont.github.io/linux/SPRM.sh

cat << 'EOF' >> ~/.config/yabar/yabar.conf
bar-list: ["topbar"];

topbar: {
    font: "monospace, Courier New 10";
    position: "top";
    height: 20;
    
    background-color-hex: "C2066D";
    foreground-color-hex: "FFFFFF";
    
    block-list: ["monitor"];

    monitor: {
        exec: "~/.config/labwc/SPRM.sh";
        type: "periodic";
        interval: 2;
        align: "left";
        fixed-size: 800;
    }
}
EOF

cat << 'EOF' > ~/.config/labwc/autostart
#!/bin/sh
yabar &
sfbar &
EOF

chmod +x ~/.config/labwc/SPRM.sh
chmod +x ~/.config/labwc/autostart

echo "====================================================================="
echo " Mindora Linux Installation Done!"
echo " to connect Wi-Fi, run this command:"
echo "   sudo nmcli device wifi connect 'Your Wifi Name' password 'Your Wifi Password'"
echo "====================================================================="
