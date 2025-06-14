#!/bin/bash

set -ex

mkdir -p /data/apps/moments/ && cd /data/apps/moments/

if [ ! -f moments ]; then
    ARCH=$(case $(uname -sm) in
        "Darwin x86_64") echo "darwin-amd64" ;;
        "Darwin arm64") echo "darwin-arm64" ;;
        "Linux aarch64") echo "linux-arm64" ;;
        *) echo "linux-amd64" ;;
    esac)
    MOMENTS_URL=$(curl -s https://api.github.com/repos/kingwrcy/moments/releases/latest \
                            | grep "browser_download_url.*moments-${ARCH}-.*\.zip" \
                            | cut -d ":" -f 2,3 \
                            | tr -d '" ')
    TMP_ZIP_FILE=$(mktemp -d)/moments.zip
    curl -fsSL -o ${TMP_ZIP_FILE} ${MOMENTS_URL}
    MOMENTS_FILE=$(unzip -l ${TMP_ZIP_FILE} |awk 'NR==4 {print $4}')
    unzip -d . -o ${TMP_ZIP_FILE}
    mv ${MOMENTS_FILE} moments
    chmod a+x moments
fi

# moments.conf
curl -fsSL -o /etc/supervisor/conf.d/moments.conf "https://in64.github.io/seiya-docker/services/moments/supervisor.conf"
