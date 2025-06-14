FROM debian:12

LABEL org.opencontainers.image.authors="cqx8@outlook.com"

SHELL ["/bin/bash", "-O", "extglob", "-c"]

WORKDIR /root

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates && \
    sed -ri 's#URIs: http://#URIs: https://#g' /etc/apt/sources.list.d/debian.sources && \
    apt-get update && apt-get upgrade -y

# install system required
RUN apt-get install -y apt-file sudo file patch wget curl gawk rsync locales net-tools telnet \
    at man bash-completion procps iproute2 vim universal-ctags \
    zip unzip zstd lz4 bzip2 tig tmux git jq ripgrep tree rpm2cpio cpio \
    iputils-ping dstat htop sysstat nload linux-perf bind9-dnsutils lsof strace patchelf \
    gcc-12 libgcc-12-dev libasan8 dwz flex bison gdb make autoconf pkg-config \
    liblz4-dev libreadline-dev libtbb-dev libssl-dev libmagic-dev libzstd-dev libfl-dev \
    python3 python3-pip python3-venv tini supervisor rclone && \
    apt-get clean autoclean && apt-get autoremove --yes && \
    curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/usr/local sh && \
    rm -rf /var/cache/apt/* && rm -rf /root/.cache && rm -rf /tmp/* && \
    rm -rf /usr/share/locale/!(zh_CN|en|en_US|locale.alias)

# configure
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 && \
    useradd -m -u 1024 -U admin && echo -e "admin    ALL=(ALL)    NOPASSWD: ALL\n" >/etc/sudoers.d/custom && \
    sed -ri 's/^\s*#alias/alias/g' /etc/skel/.bashrc && rsync -av /etc/skel/ /root/ && rsync -av /etc/skel/ /home/admin/ && \
    echo > /etc/motd && \
    echo -e "*\tsoft\tcore\tunlimited\n*\thard\tcore\tunlimited\n*\tsoft\tnofile\t524287\n*\thard\tnofile\t524287\n*\tsoft\tmemlock\tunlimited\n*\thard\tmemlock\tunlimited" >/etc/security/limits.d/custom.conf && \
    echo -e 'LANG=en_US.UTF-8\nTERM=xterm-256color\nLESSCHARSET=utf-8\nulimit -c unlimited' >>/etc/bash.bashrc && \
    mkdir -p ~/.config/htop && echo -e "hide_userland_threads=1\n" > ~/.config/htop/htoprc && \
    curl -o /usr/local/bin/docker-entrypoint.sh -L "https://in64.github.io/seiya-docker/docker-entrypoint.sh" && chmod 755 /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["tini", "--", "docker-entrypoint.sh"]
CMD ["echo", "hello seiya"]

EXPOSE 8000 8001 8002 8003 8004 8005 8006 8007 8008
