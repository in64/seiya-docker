#!/bin/bash

set -ex

mkdir -p /data/apps /data/var/log


for service in "$@"; do
  case "$service" in
    ttyd)
      curl -fsSL "https://in64.github.io/seiya-docker/services/ttyd/start.sh" -o - | bash
      ;;
    hajimi)
      curl -fsSL "https://in64.github.io/seiya-docker/services/hajimi/start.sh" -o - | bash
      ;;
    speedup)
      curl -fsSL "https://in64.github.io/seiya-docker/services/speedup/start.sh" -o - | bash
      ;;
    moments)
      curl -fsSL "https://in64.github.io/seiya-docker/services/moments/start.sh" -o - | bash
      ;;
    alist)
      curl -fsSL "https://in64.github.io/seiya-docker/services/alist/start.sh" -o - | bash
      ;;
    uni-api)
      curl -fsSL "https://in64.github.io/seiya-docker/services/uni-api/start.sh" -o - | bash
      ;;
    sshd)
      curl -fsSL "https://in64.github.io/seiya-docker/services/sshd/start.sh" -o - | bash
      ;;
    *)
      echo "未知服务: $service"
      exit 1
      ;;
  esac
done