#!/bin/bash

set -ex

mkdir -p /data/apps/deno/scripts

if [ ! -f /usr/local/bin/deno ]; then
    curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/data/apps/deno --no-modify-path sh
    ln -sf /data/apps/deno/deno /usr/local/bin/deno
fi

# speedup.js
curl -fsSL -o /data/apps/deno/scripts/speedup.js "https://in64.github.io/seiya-docker/services/speedup/speedup.js"
sed -ri '/Deno\.serve/a\    port: 8002,' /data/apps/deno/scripts/speedup.js

# speedup.conf
curl -fsSL -o /etc/supervisor/conf.d/speedup.conf "https://in64.github.io/seiya-docker/services/speedup/supervisor.conf"
