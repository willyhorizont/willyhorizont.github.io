#!/bin/bash

# =====================================================================
# Linux Mindora
## Ultra Lightweight Fedora Based Linux Distro for Older and Newer Hardware
# =====================================================================

sudo dnf install --setopt=install_weak_deps=False -y \
    labwc \
    gvfs \
    adwaita-icon-theme \
    hicolor-icon-theme \
    git \
    firefox \
    mousepad \
    foot \
    pcmanfm-qt \
    waybar \
    fuzzel \
    bc \
    dejavu-fonts-all \
    liberation-fonts

sudo systemctl disable dnf-makecache.timer
sudo systemctl set-default multi-user.target

mkdir -p ~/.config/labwc
mkdir -p ~/.config/waybar

curl -L -o ~/.config/labwc/SPRM.sh https://willyhorizont.github.io/linux/SPRM.sh

cat << 'EOF' > ~/.config/waybar/config
[
    {
        "layer": "top",
        "position": "top",
        "height": 24,
        "modules-left": ["custom/monitor"],
        "custom/monitor": {
            "exec": "~/.config/labwc/SPRM.sh",
            "interval": 2,
            "format": "{}"
        }
    },
    {
        "layer": "top",
        "position": "bottom",
        "height": 40,
        "modules-center": [
            "custom/launcher",
            "custom/terminal",
            "custom/browser",
            "custom/editor",
            "custom/files"
        ],
        "custom/launcher": {
            "format": "  ",
            "on-click": "fuzzel",
            "tooltip": false
        },
        "custom/terminal": {
            "format": "  ",
            "on-click": "foot",
            "tooltip": false
        },
        "custom/browser": {
            "format": "  ",
            "on-click": "firefox",
            "tooltip": false
        },
        "custom/editor": {
            "format": "  ",
            "on-click": "mousepad",
            "tooltip": false
        },
        "custom/files": {
            "format": "  ",
            "on-click": "pcmanfm-qt",
            "tooltip": false
        }
    }
]
EOF

cat << 'EOF' > ~/.config/waybar/style.css
window#waybar {
    background-color: #1A1A1A;
    color: #FFFFFF;
    font-family: monospace, "DejaVu Sans Mono";
    font-size: 13px;
}

window#waybar.top {
    background-color: #C2066D;
}

window#waybar.bottom {
    background-color: #1A1A1A;
    border-top: 2px solid #C2066D;
}

#custom-launcher, #custom-terminal, #custom-browser, #custom-editor, #custom-files {
    font-size: 18px;
    padding: 0 15px;
    color: #FFFFFF;
    transition: all 0.3s ease;
}

#custom-launcher:hover, #custom-terminal:hover, #custom-browser:hover, #custom-editor:hover, #custom-files:hover {
    background-color: #C2066D;
    color: #1A1A1A;
}
EOF

cat << 'EOF' > ~/.config/labwc/autostart
#!/bin/sh
waybar &
EOF

chmod +x ~/.config/labwc/SPRM.sh
chmod +x ~/.config/labwc/autostart

if ! grep -q "exec labwc" ~/.bash_profile; then
cat << 'EOF' >> ~/.bash_profile

if [ -z "$DISPLAY" ] && [ "$(tty)" = "/dev/tty1" ]; then
    exec labwc
fi
EOF
fi

echo "====================================================================="
echo " Mindora Linux Installation Done!"
echo " Please reboot"
echo " to connect Wi-Fi, run this command:"
echo "   sudo nmcli device wifi connect 'Your Wifi Name' password 'Your Wifi Password'"
echo "====================================================================="
