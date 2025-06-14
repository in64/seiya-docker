#!/bin/bash

set -ex

cd /data/apps/

mkdir -p /root/.cache/pycache
export PYTHONPYCACHEPREFIX=/root/.cache/pycache

if [ ! -d uni-api ]; then
    git clone https://github.com/yym68686/uni-api.git && cd uni-api
    git submodule init
    git submodule update
else
    cd uni-api && git pull && git submodule update
fi

if [ ! -d venv ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

curl -fsSL -o /etc/supervisor/conf.d/uni-api.conf "https://in64.github.io/seiya-docker/services/uni-api/supervisor.conf"