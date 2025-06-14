# seiya-docker

## 项目简介

`seiya-docker` 是一个基于 [`Debian`](Dockerfile:1) 12 构建的 [`Docker`](Dockerfile:1) 镜像，旨在提供一个功能丰富、预配置的开发和运行环境。它集成了大量常用的系统工具、开发工具、网络工具和监控工具，并支持通过灵活的入口点脚本按需启动多种服务。

## 主要特性

*   **丰富的工具集**: 预装了包括 [`git`](Dockerfile:16), [`vim`](Dockerfile:15), [`tmux`](Dockerfile:16), [`jq`](Dockerfile:16), [`ripgrep`](Dockerfile:16), [`tree`](Dockerfile:16), [`python3`](Dockerfile:20), [`deno`](Dockerfile:22) 等在内的多种开发和系统管理工具。
*   **灵活的服务管理**: 通过 [`docker-entrypoint.sh`](docker-entrypoint.sh:1) 和 [`scripts/start_service.sh`](scripts/start_service.sh:1) 支持动态下载和启动 `ttyd`, `hajimi`, `speedup`, `moments`, `alist`, `uni-api` 等服务。
*   **Supervisor 进程管理**: 使用 [`supervisord`](docker-entrypoint.sh:17) 确保服务的稳定运行和自动重启。
*   **安全与性能优化**: 配置了 [`tini`](Dockerfile:37) 作为入口点以处理僵尸进程，并优化了 `ulimit` 设置。
*   **多端口暴露**: 暴露了 8000-8008 端口，方便部署多种网络服务。

## 构建镜像

要构建 `seiya-docker` 镜像，请在项目根目录下执行以下命令：

```bash
docker build -t seiya-docker .
```

## 运行容器

### 运行默认命令

容器启动后将执行默认的 `echo "hello seiya"` 命令：

```bash
docker run -it --rm seiya-docker
```

### 运行自定义命令

您可以直接在容器中运行任何命令：

```bash
docker run -it --rm seiya-docker bash
```

### 启动特定服务

通过 [`scripts/start_service.sh`](scripts/start_service.sh:1) 脚本，您可以启动容器内预定义的服务。例如，启动 `ttyd` 服务：

```bash
docker run -it --rm -p 7681:7681 seiya-docker scripts/start_service.sh ttyd
```

支持的服务列表：`ttyd`, `hajimi`, `speedup`, `moments`, `alist`, `uni-api`。

您可以同时启动多个服务：

```bash
docker run -it --rm -p 7681:7681 -p 8080:8080 seiya-docker scripts/start_service.sh ttyd hajimi
```

### 通过 URL 执行脚本

[`docker-entrypoint.sh`](docker-entrypoint.sh:1) 支持从 URL 下载并执行脚本，这在需要动态加载配置或启动逻辑时非常有用：

```bash
docker run -it --rm seiya-docker https://example.com/my_script.sh arg1 arg2
```

## 服务详情

以下是 `seiya-docker` 中包含的各项服务的详细信息，包括其默认运行端口和相关环境变量：

### ttyd

*   **端口**: 8000
*   **环境变量**:
    *   `TTYD_PASSWORD`: 用于设置 [`ttyd`](services/ttyd/start.sh:1) 的登录密码。

### hajimi

*   **端口**: 8001
*   **环境变量**:
    *   `HAJIMI_ENV_URL`: 用于指定 [`hajimi`](services/hajimi/start.sh:1) 服务的 `.env` 文件下载地址。

### speedup

*   **端口**: 8002

### moments

*   **端口**: 8003
*   **环境变量**:

### alist

*   **端口**: 8004
*   **环境变量**:
    *   `HTTP_PORT`: [`Alist`](services/alist/start.sh:1) 服务监听的 HTTP 端口。

### uni-api

*   **端口**: 8005
*   **环境变量**:


## 作者

cqx8、in64
