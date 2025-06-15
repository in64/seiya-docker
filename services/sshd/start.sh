#!/bin/bash

set -ex

mkdir -p /data/apps/sshd /var/run/sshd /data/var/log

apt-get update && apt-get install -y openssh-server

[ ! -f /etc/ssh/sshd_config ] && cp /etc/ssh/sshd_config.original /etc/ssh/sshd_config

# 使用 root 登录，使用 8006 端口
sed -i -e '/PermitRootLogin/s#.*#PermitRootLogin yes#g' \
       -e 's/^\(UsePAM yes\)/# \1/' \
       -e '/^#?Port/s#.*#Port 8006#g' /etc/ssh/sshd_config

# 配置密钥登录
mkdir -p -m 700 /root/.ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCVcrYMyFkwxZ89v38zZPu9CXKjbCgyuyV88W9ZWkITJOxcgcAOUw5RJU0nffLG2EHeZniJ4XKW0c5alvCXhBqzviCaWMYkID1D37qUzQImwTICJMfssBpgS+VQEMMjAdv3UYoNAfy1jXSA+nxuHyQ/ufGepkSQeJBLDuvlLvWQ55KIr+5gkhnhrORoic5WKtRB8FmxSH6tSdSCEcYPSjqUF8A7LypE0wzqK7YiLtOvc0fOC6WD5vqJVnf87oF1208aT3mIOF54fVEG4O5jTwwAdVzNa4qx6FDPo5bZS6yjDcYWQImb/7tT4FWkeIHlP3C6btDcdNYMQx7GRjpVny81p5CDz8UvrF7EB1jOcC8lKU+MsBMYadJOZmqk5qpUtcrV42ShoG3cRavLdn5nwR72+hgWAgPuAhz0k6DYEQSEfTmdJxiyB80CXAWuzO2J29uJRIl7h/FMy4GH43R3GqWp69x8KAJcaNqxxCihD69Os+45w0wWLWMgWQ4ktEppVqeImFn3JsklLRKH5aUCj/CPA8I3vi93FYiLIP5PBJHytJlDUkE7vAnczqZXcJ3Lpnb2n5T7C+BVSRr3WBvIaBcgcrJ4TgH2tzYnkqIPBEgso62HhvIOFd3KjFw0bhsyu+WYkR2M2l2gP6EAsJQTQhjpwfkag1XubnPjl9xWGSlF/w==" > /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

curl -fsSL -o /etc/supervisor/conf.d/sshd.conf "https://in64.github.io/seiya-docker/services/sshd/supervisor.conf"