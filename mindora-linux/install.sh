#!/bin/bash

# =====================================================================
# Linux Mindora
## Ultra Lightweight Fedora Based Linux Distro for Older and Newer Hardware
# =====================================================================

sudo dnf install --setopt=install_weak_deps=False -y \
    labwc \
    ly \
    gvfs \
    adwaita-icon-theme \
    hicolor-icon-theme \
    git \
    firefox \
    mousepad \
    foot \
    pcmanfm-qt \
    waybar \
    bc \
    dejavu-fonts-all \
    liberation-fonts \
    lavalauncher

sudo systemctl disable dnf-makecache.timer

mkdir -p ~/.config/labwc
mkdir -p ~/.config/waybar

curl -L -o ~/.config/labwc/SPRM.sh https://willyhorizont.github.io/linux/SPRM.sh

cat << 'EOF' > ~/.config/waybar/config
[
    {
        "layer": "top",
        "position": "top",
        "height": 20,
        "modules-left": ["custom/monitor"],
        "custom/monitor": {
            "exec": "~/.config/labwc/SPRM.sh",
            "interval": 2,
            "format": "{}"
        }
    }
]
EOF

cat << 'EOF' > ~/.config/waybar/style.css
window#waybar {
    background-color: #C2066D;
    color: #FFFFFF;
    font-family: monospace, "Courier New";
    font-size: 13px;
}
EOF

cat << 'EOF' > ~/.config/labwc/autostart
#!/bin/sh
waybar &
lavalauncher &
EOF

chmod +x ~/.config/labwc/SPRM.sh
chmod +x ~/.config/labwc/autostart

echo "====================================================================="
echo " Mindora Linux Installation Done!"
echo " to connect Wi-Fi, run this command:"
echo "   sudo nmcli device wifi connect 'Your Wifi Name' password 'Your Wifi Password'"
echo "====================================================================="
