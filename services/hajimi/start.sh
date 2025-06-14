#!/bin/bash

set -ex

cd /data/apps/

mkdir -p /root/.cache/pycache
export PYTHONPYCACHEPREFIX=/root/.cache/pycache

if [ ! -d hajimi ]; then
    git clone https://github.com/wyeeeee/hajimi.git && cd hajimi
else
    cd hajimi && git pull
fi

if [ ! -d venv ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install tzdata -r requirements.txt

curl -fsSL -o /etc/supervisor/conf.d/hajimi.conf "https://in64.github.io/seiya-docker/services/hajimi/supervisor.conf"
