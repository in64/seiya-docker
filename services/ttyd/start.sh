#!/bin/bash

set -xe

mkdir -p /data/apps/ttyd/ && cd /data/apps/ttyd/

if [ ! -f ttyd ]; then
    TTYD_URL=$(curl -s https://api.github.com/repos/tsl0922/ttyd/releases/latest \
                            | grep -E "browser_download_url.*ttyd.$(uname -m)" \
                            | cut -d ":" -f 2,3 \
                            | tr -d '" ')
    curl -fsSL -o ttyd ${TTYD_URL}
    chmod 755 ttyd
fi

curl -o /etc/supervisor/conf.d/ttyd.conf -L "https://in64.github.io/seiya-docker/services/ttyd/supervisor.conf"

if [ ! -z "${TTYD_PASSWORD}" ]; then
    sed -ri "/command/s:ttyd666:${TTYD_PASSWORD}:g" /etc/supervisor/conf.d/ttyd.conf
fi