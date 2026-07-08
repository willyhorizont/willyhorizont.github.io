#!/bin/bash

SD=$(dirname "$(realpath "$0")")
RD=$(realpath "$SD")
V="2.2.7" # ! DON'T FORGET TO CHANGE VERSION BEFORE RUNNING !!!!
T=$(date "+%d %b %Y @ %I:%M %p")
\. "$HOME/.nvm/nvm.sh"
npm version "$V" --no-git-tag-version
git add .
H="
[Last updated: $T]
version $V:
"
H=$(sed -e '/./,$!d' <<< "$H")
# ! DON'T FORGET TO CHANGE COMMIT MESSAGE BEFORE RUNNING !!!!
M="
update footer
"
M=$(sed -e '/./,$!d' <<< "$M")
M="$H
$M"
awk -v msg="$M" 'BEGIN {print msg; print ""} {print}' "$RD/changelog.txt" > "$RD/changelog.tmp" && mv "$RD/changelog.tmp" "$RD/changelog.txt"
git add .
sed -i "s|const CACHE_NAME = \"willyhorizont.github.io#.*\";|const CACHE_NAME = \"willyhorizont.github.io#$V\";|g" sw.js
git add .
sed -i "s|Version: .* • Last updated|Version: $V • Last updated|g" component/component-footer.js
sed -i "s|Last updated: .*</p>|Last updated: $V</p>|g" component/component-footer.js
git add .
git commit -m "$M"
git tag -d "$V" 2>/dev/null
git tag -a "$V" -m "$M"
git push github main -f
git push github --tags -f
