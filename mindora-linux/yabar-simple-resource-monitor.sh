#!/bin/bash

NET_INTERFACE="wlp3s0"
INTERVAL=2

PREV_TOTAL=0
PREV_IDLE=0
PREV_DISK_R=0
PREV_DISK_W=0
PREV_NET_D=0
PREV_NET_U=0

format_bytes() {
    local bytes_raw=$1
    local bytes=$(echo "$bytes_raw" | awk '{print ($1 < 0) ? 0 : $1}')
    
    if (( $(echo "$bytes <= 0" | bc -l) )); then
        printf "      0B/s"
        return
    fi
    
    local units=("B/s" "KB/s" "MB/s")
    local i=0
    local v=$bytes
    
    while (( $(echo "$v >= 1024" | bc -l) )) && [ $i -lt 2 ]; do
        v=$(echo "scale=4; $v / 1024" | bc -l)
        i=$((i+1))
    done
    
    if [ $i -eq 0 ]; then
        printf "%7.3f%s" "$v" "${units[$i]}"
    else
        printf "%6.2f%s" "$v" "${units[$i]}"
    fi
}

while true; do
    TEMP=$(sensors 2>/dev/null | awk '/Core/ {sum+=$3; count++} END {if (count > 0) printf "%.1f", sum/count; else print "0.0"}')
    if (( $(echo "$TEMP >= 100.0" | bc -l) )); then TEMP_LIMIT="9999"; else TEMP_LIMIT="$TEMP"; fi

    CPU_LINE=$(grep '^cpu ' /proc/stat)
    USER=$(echo "$CPU_LINE" | awk '{print $2}')
    NICE=$(echo "$CPU_LINE" | awk '{print $3}')
    SYSTEM=$(echo "$CPU_LINE" | awk '{print $4}')
    IDLE=$(echo "$CPU_LINE" | awk '{print $5}')
    IOWAIT=$(echo "$CPU_LINE" | awk '{print $6}')
    IRQ=$(echo "$CPU_LINE" | awk '{print $7}')
    SOFTIRQ=$(echo "$CPU_LINE" | awk '{print $8}')
    
    NEW_IDLE=$((IDLE + IOWAIT))
    NEW_NON_IDLE=$((USER + NICE + SYSTEM + IRQ + SOFTIRQ))
    TOTAL=$((NEW_IDLE + NEW_NON_IDLE))
    
    DIFF_TOTAL=$((TOTAL - PREV_TOTAL))
    DIFF_IDLE=$((NEW_IDLE - PREV_IDLE))
    
    CPU_PERCENT="0.0"
    if [ $PREV_TOTAL -gt 0 ] && [ $DIFF_TOTAL -gt 0 ]; then
        CPU_PERCENT=$(echo "scale=1; (($DIFF_TOTAL - $DIFF_IDLE) / $DIFF_TOTAL) * 100" | bc -l)
    fi
    PREV_TOTAL=$TOTAL
    PREV_IDLE=$NEW_IDLE
    CPU=$(printf "%4s" "$CPU_PERCENT")

    GPU_RAW=$(cat /sys/class/drm/card0/device/gpu_busy_percent 2>/dev/null || echo "0")
    GPU=$(printf "%4.1f" "$GPU_RAW")

    RAM_DATA=($(awk '/MemTotal/ {t=$2} /MemAvailable/ {a=$2} END {print (t-a), t}' /proc/meminfo))
    RAM_USED_GB=$(echo "scale=2; ${RAM_DATA[0]} / 1024 / 1024" | bc -l)
    RAM_TOT_GB=$(echo "scale=2; ${RAM_DATA[1]} / 1024 / 1024" | bc -l)
    RAM_USED_STR=$(printf "%5.2f" "$RAM_USED_GB")
    RAM_TOT_STR=$(printf "%.2f" "$RAM_TOT_GB")

    DISK_DATA=($(df -B1 / | awk 'NR==2 {print $4, $2}'))
    DISK_FREE_GBYTES=$(echo "scale=2; ${DISK_DATA[0]} / 1000000000" | bc -l)
    DISK_TOT_GBYTES=$(echo "scale=2; ${DISK_DATA[1]} / 1000000000" | bc -l)

    DISK_IO=($(awk '/ss/ || /sd/ || /nvme/ {r+=$6; w+=$10} END {print r, w}' /proc/diskstats))
    CUR_DISK_R=$((DISK_IO[0] * 512))
    CUR_DISK_W=$((DISK_IO[1] * 512))
    
    RATE_R=0; RATE_W=0
    if [ $PREV_DISK_R -gt 0 ]; then
        RATE_R=$(echo "scale=2; ($CUR_DISK_R - $PREV_DISK_R) / $INTERVAL" | bc -l)
    fi
    if [ $PREV_DISK_W -gt 0 ]; then
        RATE_W=$(echo "scale=2; ($CUR_DISK_W - $PREV_DISK_W) / $INTERVAL" | bc -l)
    fi
    PREV_DISK_R=$CUR_DISK_R
    PREV_DISK_W=$CUR_DISK_W

    NET_IO=($(grep "$NET_INTERFACE" /proc/net/dev | awk -F: '{print $2}' | awk '{print $1, $9}'))
    CUR_NET_D=${NET_IO[0]:-0}
    CUR_NET_U=${NET_IO[1]:-0}
    
    RATE_D=0; RATE_U=0
    if [ $PREV_NET_D -gt 0 ]; then
        RATE_D=$(echo "scale=2; ($CUR_NET_D - $PREV_NET_D) / $INTERVAL" | bc -l)
    fi
    if [ $PREV_NET_U -gt 0 ]; then
        RATE_U=$(echo "scale=2; ($CUR_NET_U - $PREV_NET_U) / $INTERVAL" | bc -l)
    fi
    PREV_NET_D=$CUR_NET_D
    PREV_NET_U=$CUR_NET_U

    F_R=$(format_bytes "$RATE_R")
    F_W=$(format_bytes "$RATE_W")
    F_D=$(format_bytes "$RATE_D")
    F_U=$(format_bytes "$RATE_U")

    if [ "$TEMP_LIMIT" = "9999" ] || [[ "$F_R" == *"999999"* ]] || [[ "$F_W" == *"999999"* ]] || [[ "$F_D" == *"999999"* ]] || [[ "$F_U" == *"999999"* ]]; then
        [ "$TEMP_LIMIT" = "9999" ] && OUT_T="9999°C" || OUT_T="${TEMP_LIMIT}°C"
        [[ "$F_R" == *"999999"* ]] && OUT_R="999999GB/s" || OUT_R="$F_R"
        [[ "$F_W" == *"999999"* ]] && OUT_W="999999GB/s" || OUT_W="$F_W"
        [[ "$F_D" == *"999999"* ]] && OUT_D="999999GB/s" || OUT_D="$F_D"
        [[ "$F_U" == *"999999"* ]] && OUT_U="999999GB/s" || OUT_U="$F_U"

        RR="T ${OUT_T} | C ${CPU}% | G ${GPU}% | M ${RAM_USED_STR}/${RAM_TOT_STR}GB | D ${DISK_FREE_GBYTES}/${DISK_TOT_GBYTES}GB | R ${OUT_R} | W ${OUT_W} | v ${OUT_D} | ^ ${OUT_U} "
    else
        RR="T ${TEMP_LIMIT}°C | C ${CPU}% | G ${GPU}% | M ${RAM_USED_STR}/${RAM_TOT_STR}GB | D ${DISK_FREE_GBYTES}/${DISK_TOT_GBYTES}GB | R ${F_R} | W ${F_W} | v ${F_D} | ^ ${F_U} "
    fi

    echo "$RR"

    sleep $INTERVAL
done
