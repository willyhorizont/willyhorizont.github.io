#!/bin/bash

# SPRM (Simple Panel Resource Monitor)

NET_INTERFACE="wlp3s0"
INTERVAL=2

LAST_CPU_USER=0
LAST_CPU_NICE=0
LAST_CPU_SYSTEM=0
LAST_CPU_IDLE=0
LAST_CPU_IOWAIT=0
LAST_CPU_IRQ=0
LAST_CPU_SOFTIRQ=0
LAST_BYTES_READ=0
LAST_BYTES_WRITE=0
LAST_BYTES_DOWN=0
LAST_BYTES_UP=0

get_monotonic_time() {
    echo $(date +%s%N | awk '{print int($1/1000)}')
}
LAST_TIME=$(get_monotonic_time)

_pad() {
    printf "%*s" "$2" "$1"
}

_fmt() {
    local bytes_p_sec=$1
    if (( $(echo "$bytes_p_sec <= 0" | bc -l) )); then
        printf "      0B/s"
        return
    fi
    
    local units=("B/s" "KB/s" "MB/s")
    local i=0
    local v=$bytes_p_sec
    
    while (( $(echo "$v >= 1024" | bc -l) )) && [ $i -lt 2 ]; do
        v=$(echo "scale=4; $v / 1024" | bc -l)
        i=$((i+1))
    done
    
    local num_str=""
    if [ $i -eq 0 ]; then
        num_str=$(printf "%.3f" "$v")
    else
        num_str=$(printf "%.2f" "$v")
    fi
    
    local f_p=$(echo "$num_str" | cut -d. -f1)
    local b_p=$(echo "$num_str" | cut -d. -f2)
    
    if [ ${#f_p} -gt 3 ]; then
        printf "999999GB/s"
        return
    fi
    
    local padded_fp=$(_pad "$f_p" 3)
    printf "%s.%s%s" "$padded_fp" "$b_p" "${units[$i]}"
}

while true; do
    if command -v sensors >/dev/null 2>&1; then
        TEMP=$(sensors 2>/dev/null | awk '/Core/ {sum+=$3; count++} END {if (count > 0) printf "%.1f", sum/count; else print "0.0"}')
    else
        if [ -f /sys/class/thermal/thermal_zone0/temp ]; then
            TEMP_RAW=$(cat /sys/class/thermal/thermal_zone0/temp)
            TEMP=$(echo "scale=1; $TEMP_RAW / 1000" | bc -l)
        else
            TEMP="0.0"
        fi
    fi

    if (( $(echo "$TEMP >= 100.0" | bc -l) )); then temp_label="9999"; else temp_label=$(printf "%.1f" "$TEMP"); fi

    CPU_LINE=$(awk '/^cpu / {print $2" "$3" "$4" "$5" "$6" "$7" "$8}' /proc/stat)
    user=$(echo "$CPU_LINE" | cut -d' ' -f1)
    nice=$(echo "$CPU_LINE" | cut -d' ' -f2)
    system=$(echo "$CPU_LINE" | cut -d' ' -f3)
    idle=$(echo "$CPU_LINE" | cut -d' ' -f4)
    iowait=$(echo "$CPU_LINE" | cut -d' ' -f5)
    irq=$(echo "$CPU_LINE" | cut -d' ' -f6)
    softirq=$(echo "$CPU_LINE" | cut -d' ' -f7)

    old_idle=$((LAST_CPU_IDLE + LAST_CPU_IOWAIT))
    new_idle=$((idle + iowait))
    
    old_non_idle=$((LAST_CPU_USER + LAST_CPU_NICE + LAST_CPU_SYSTEM + LAST_CPU_IRQ + LAST_CPU_SOFTIRQ))
    new_non_idle=$((user + nice + system + irq + softirq))
    
    tot_old=$((old_idle + old_non_idle))
    tot_new=$((new_idle + new_non_idle))
    
    tot_delta=$((tot_new - tot_old))
    idle_delta=$((new_idle - old_idle))
    
    cpu_percent="0.0"
    if [ $tot_delta -gt 0 ]; then
        cpu_percent=$(echo "scale=4; (($tot_delta - $idle_delta) / $tot_delta) * 100" | bc -l)
    fi
    
    LAST_CPU_USER=$user; LAST_CPU_NICE=$nice; LAST_CPU_SYSTEM=$system
    LAST_CPU_IDLE=$idle; LAST_CPU_IOWAIT=$iowait; LAST_CPU_IRQ=$irq; LAST_CPU_SOFTIRQ=$softirq
    
    cpu_str=$(printf "%.1f" "$cpu_percent")
    cpu=$(_pad "$cpu_str" 4)

    gpu_v=$(cat /sys/class/drm/card0/device/gpu_busy_percent 2>/dev/null || echo "0")
    gpu=$(_pad "$(printf "%.1f" "$gpu_v")" 4)

    RAM_RAW=($(awk '/MemTotal/ {t=$2} /MemAvailable/ {a=$2} END {print (t-a), t}' /proc/meminfo))
    ram_used_gbytes=$(echo "scale=4; ${RAM_RAW[0]} / 1024 / 1024" | bc -l)
    ram_tot_gbytes=$(echo "scale=4; ${RAM_RAW[1]} / 1024 / 1024" | bc -l)
    ram_used_str=$(_pad "$(printf "%.2f" "$ram_used_gbytes")" 5)
    ram_tot_str=$(printf "%.2f" "$ram_tot_gbytes")

    DISK_RAW=($(df -B1 / | awk 'NR==2 {print $4, $2}'))
    disk_free_gbytes=$(echo "scale=2; ${DISK_RAW[0]} / 1000000000" | bc -l)
    disk_tot_gbytes=$(echo "scale=2; ${DISK_RAW[1]} / 1000000000" | bc -l)

    DISK_IO=($(awk '/ss/ || /sd/ || /nvme/ {r+=$6; w+=$10} END {print r, w}' /proc/diskstats))
    cur_disk_r=$((DISK_IO[0] * 512))
    cur_disk_w=$((DISK_IO[1] * 512))

    NET_IO=($(grep "$NET_INTERFACE" /proc/net/dev | awk -F: '{print $2}' | awk '{print $1, $9}'))
    cur_net_down=${NET_IO[0]:-0}
    cur_net_up=${NET_IO[1]:-0}

    now=$(get_monotonic_time)
    time_delta=$(echo "scale=6; ($now - $LAST_TIME) / 1000000.0" | bc -l)
    if (( $(echo "$time_delta <= 0" | bc -l) )); then time_delta="2.0"; fi

    r_rate=0; w_rate=0; d_rate=0; u_rate=0
    if [ $LAST_BYTES_READ -gt 0 ]; then r_rate=$(echo "scale=4; ($cur_disk_r - $LAST_BYTES_READ) / $time_delta" | bc -l); fi
    if [ $LAST_BYTES_WRITE -gt 0 ]; then w_rate=$(echo "scale=4; ($cur_disk_w - $LAST_BYTES_WRITE) / $time_delta" | bc -l); fi
    if [ $LAST_BYTES_DOWN -gt 0 ]; then d_rate=$(echo "scale=4; ($cur_net_down - $LAST_BYTES_DOWN) / $time_delta" | bc -l); fi
    if [ $LAST_BYTES_UP -gt 0 ]; then u_rate=$(echo "scale=4; ($cur_net_up - $LAST_BYTES_UP) / $time_delta" | bc -l); fi

    (( $(echo "$r_rate < 0" | bc -l) )) && r_rate=0
    (( $(echo "$w_rate < 0" | bc -l) )) && w_rate=0
    (( $(echo "$d_rate < 0" | bc -l) )) && d_rate=0
    (( $(echo "$u_rate < 0" | bc -l) )) && u_rate=0

    LAST_TIME=$now
    LAST_BYTES_READ=$cur_disk_r; LAST_BYTES_WRITE=$cur_disk_w
    LAST_BYTES_DOWN=$cur_net_down; LAST_BYTES_UP=$cur_net_up

    f_r=$(_fmt "$r_rate")
    f_w=$(_fmt "$w_rate")
    f_d=$(_fmt "$d_rate")
    f_u=$(_fmt "$u_rate")

    if [ "$temp_label" = "9999" ] || [[ "$f_r" == *"999999"* ]] || [[ "$f_w" == *"999999"* ]] || [[ "$f_d" == *"999999"* ]] || [[ "$f_u" == *"999999"* ]]; then
        [ "$temp_label" = "9999" ] && out_t="9999°C" || out_t="${temp_label}°C"
        [[ "$f_r" == *"999999"* ]] && out_r="999999GB/s" || out_r="$f_r"
        [[ "$f_w" == *"999999"* ]] && out_w="999999GB/s" || out_w="$f_w"
        [[ "$f_d" == *"999999"* ]] && out_d="999999GB/s" || out_d="$f_d"
        [[ "$f_u" == *"999999"* ]] && out_u="999999GB/s" || out_u="$f_u"

        rr="T ${out_t} | C ${cpu}% | G ${gpu}% | M ${ram_used_str}/${ram_tot_str}GB | D ${disk_free_gbytes}/${disk_tot_gbytes}GB | R ${out_r} | W ${out_w} | ▼ ${out_d} | ▲ ${out_u} "
    else
        rr="T ${temp_label}°C | C ${cpu}% | G ${gpu}% | M ${ram_used_str}/${ram_tot_str}GB | D ${disk_free_gbytes}/${disk_tot_gbytes}GB | R ${f_r} | W ${f_w} | ▼ ${f_d} | ▲ ${f_u} "
    fi

    echo "$rr"

    sleep $INTERVAL
done
