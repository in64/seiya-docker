#!/bin/bash

set -ex

mkdir -p /data/apps/alist && cd /data/apps/alist

if [ ! -f alist ]; then
    ARCH=$(case "$(uname -m)" in
        x86_64) echo amd64 ;;
        aarch64) echo arm64 ;;
        *) echo "不支持的架构: $(uname -m)" >&2; exit 1 ;;
    esac)
    PACKAGE_NAME="alist-linux-${ARCH}.tar.gz"
    ALIST_URL=$(curl -s https://api.github.com/repos/AlistGo/alist/releases/latest \
                            | grep "browser_download_url.*${PACKAGE_NAME}" \
                            | cut -d ":" -f 2,3 \
                            | tr -d '" ')
    TMP_TGZ_FILE=$(mktemp -d)/${PACKAGE_NAME}
    curl -fsSL -o "${TMP_TGZ_FILE}" "${ALIST_URL}"

    tar -xzf "${TMP_TGZ_FILE}" -C .
    chmod a+x alist
fi

# alist.conf
curl -fsSL -o /etc/supervisor/conf.d/alist.conf "https://in64.github.io/seiya-docker/services/alist/supervisor.conf"
