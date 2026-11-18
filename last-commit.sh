#!/bin/bash

$HOME/willyhorizont.github.io/linux/confirm-cmd.sh || exit 1

SD=$(dirname "$(realpath "$0")")
RD=$(realpath "$SD")
V="2.3.29" # ! DON'T FORGET TO CHANGE VERSION BEFORE RUNNING !!!!
T=$(date "+%d %b %Y @ %I:%M %p")
cd "$RD" || exit

python3 "$HOME/willyhorizont.github.io/linux/npm-version.py" "$V" "$RD"

H="
[Last updated: $T][version: $V]
"
H=$(sed -e '/./,$!d' <<< "$H")
# ! DON'T FORGET TO CHANGE COMMIT MESSAGE BEFORE RUNNING !!!!
M="
set window.title back after print;
"
M=$(sed -e '/./,$!d' <<< "$M")
M="$H
$M"
touch "$RD/changelog.txt" && awk -v msg="$M" 'BEGIN {print msg; print ""} {print}' "$RD/changelog.txt" > "$RD/changelog.tmp" && mv "$RD/changelog.tmp" "$RD/changelog.txt"
sed -i "s|const CACHE_NAME = \"willyhorizont.github.io#.*\";|const CACHE_NAME = \"willyhorizont.github.io#$V\";|g" sw.js
sed -i "s|Version: .* • Last updated|Version: $V • Last updated|g" component/component-footer.js
sed -i "s|Last updated: .*</p>|Last updated: $T</p>|g" component/component-footer.js
git add changelog.txt
git add package-lock.json
git add package.json
git add .
git commit -m "$M"
git tag -d "$V" 2>/dev/null
git tag -a "$V" -m "$M"
git push origin main
git push origin --tags
