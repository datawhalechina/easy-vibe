# Docker 容器化

::: tip 前言
**"在我机器上能跑"是开发者最经典的借口，Docker 让这个借口彻底消失。** 容器化技术将应用及其所有依赖打包成一个标准化的单元，确保在任何环境中都能一致运行。它是现代软件交付的基石。
:::

**这篇文章会带你学什么？**

学完这章后，你将获得：

- **核心概念**：理解镜像、容器、仓库三大核心概念
- **架构对比**：明白容器和虚拟机的本质区别
- **实操能力**：掌握 Dockerfile 编写和常用命令
- **编排基础**：学会用 Docker Compose 管理多服务应用
- **最佳实践**：了解镜像优化、安全加固等生产级实践

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第 1 章** | 为什么需要容器 | 环境一致性、资源效率、标准化交付 |
| **第 2 章** | 核心概念 | 镜像、容器、仓库、Dockerfile |
| **第 3 章** | Docker 生命周期 | 编写、构建、推送、运行、管理 |
| **第 4 章** | Docker Compose | 多服务编排、网络、数据卷 |
| **第 5 章** | 最佳实践 | 镜像优化、安全、多阶段构建 |

---

## 1. 为什么需要容器？

在容器出现之前，部署一个应用需要在服务器上手动安装运行时、配置环境变量、处理依赖冲突。不同环境（开发、测试、生产）之间的差异是 bug 的温床。

<DockerArchitectureDemo />

### 容器解决了什么问题？

| 问题 | 传统方式 | 容器方式 |
|------|---------|---------|
| 环境不一致 | "我本地能跑" | 打包所有依赖，到处一致 |
| 依赖冲突 | App A 要 Node 14，App B 要 Node 18 | 每个容器独立环境 |
| 资源浪费 | 每个 VM 一个完整 OS | 共享内核，MB 级开销 |
| 部署慢 | 手动安装配置 | docker run 一条命令 |
| 扩容难 | 新建 VM、装环境、部署 | 秒级启动新容器 |

::: tip 容器的本质
容器不是轻量级虚拟机。它的本质是**被隔离的进程**。Linux 内核通过两个机制实现容器：
- **Namespace**：隔离进程的视野（PID、网络、文件系统等）
- **Cgroups**：限制进程的资源使用（CPU、内存、IO）

容器里的进程和宿主机上的普通进程没有本质区别，只是被"关在了一个看不到外面的房间里"。
:::

---

## 2. 核心概念

Docker 的世界围绕三个核心概念：镜像（Image）、容器（Container）、仓库（Registry）。

| 概念 | 类比 | 说明 |
|------|------|------|
| 镜像（Image） | 类 / 模板 | 只读的应用模板，包含代码、运行时、库、配置 |
| 容器（Container） | 实例 / 对象 | 镜像的运行实例，可读写，有独立的生命周期 |
| 仓库（Registry） | 应用商店 | 存储和分发镜像的服务（Docker Hub、ACR、ECR） |
| Dockerfile | 配方 / 蓝图 | 定义如何构建镜像的文本文件 |
| 数据卷（Volume） | 外接硬盘 | 持久化数据，容器删除后数据不丢失 |

### 镜像的分层结构

Docker 镜像由多个只读层（Layer）叠加而成，每条 Dockerfile 指令创建一层：

```
┌─────────────────────────┐
│  CMD ["node", "app.js"] │  ← 启动命令层
├─────────────────────────┤
│  COPY . /app            │  ← 应用代码层（经常变）
├─────────────────────────┤
│  RUN npm install        │  ← 依赖安装层（偶尔变）
├─────────────────────────┤
│  FROM node:18-alpine    │  ← 基础镜像层（很少变）
└─────────────────────────┘
```

::: tip 为什么分层很重要？
Docker 会缓存每一层。如果某一层没有变化，构建时会直接复用缓存。所以 Dockerfile 中应该把**变化频率低的指令放在前面**（如安装依赖），**变化频率高的放在后面**（如复制代码）。这样大部分构建都能命中缓存，速度快很多。
:::

---

## 3. Docker 生命周期

从编写 Dockerfile 到容器运行，Docker 的工作流程是一条清晰的流水线。

<DockerLifecycleDemo />

### Dockerfile 常用指令速查

| 指令 | 作用 | 示例 |
|------|------|------|
| `FROM` | 指定基础镜像 | `FROM node:18-alpine` |
| `WORKDIR` | 设置工作目录 | `WORKDIR /app` |
| `COPY` | 复制文件到镜像 | `COPY package.json ./` |
| `RUN` | 构建时执行命令 | `RUN npm install` |
| `ENV` | 设置环境变量 | `ENV NODE_ENV=production` |
| `EXPOSE` | 声明端口（仅文档作用） | `EXPOSE 3000` |
| `CMD` | 容器启动命令 | `CMD ["node", "app.js"]` |
| `ENTRYPOINT` | 容器入口点（不易被覆盖） | `ENTRYPOINT ["nginx"]` |

---

## 4. Docker Compose：多服务编排

真实项目通常不止一个容器。一个 Web 应用可能需要：应用服务器 + 数据库 + Redis + Nginx。Docker Compose 用一个 YAML 文件定义和管理多个容器。

### docker-compose.yml 示例

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

  redis:
    image: redis:7-alpine

volumes:
  db-data:
```

### Compose 核心概念

| 概念 | 说明 | 示例 |
|------|------|------|
| services | 定义各个容器服务 | app、db、redis |
| volumes | 持久化数据卷 | db-data 保存数据库文件 |
| networks | 自定义网络（默认自动创建） | 服务间通过服务名互相访问 |
| depends_on | 启动顺序依赖 | app 依赖 db 和 redis |
| environment | 环境变量 | 数据库密码、连接地址 |

::: tip 服务发现
在 Docker Compose 中，服务名就是主机名。app 容器可以直接用 `db:5432` 访问数据库，用 `redis:6379` 访问 Redis，不需要知道 IP 地址。这是 Docker 内置 DNS 的功劳。
:::

---

## 5. 最佳实践

### 5.1 多阶段构建（Multi-stage Build）

多阶段构建是优化镜像大小的利器。构建阶段安装所有工具和依赖，最终阶段只保留运行时需要的文件。

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### 5.2 镜像优化清单

| 优化项 | 做法 | 效果 |
|--------|------|------|
| 选择小基础镜像 | 用 `alpine` 而非 `ubuntu` | 镜像从 ~200MB 降到 ~50MB |
| 合并 RUN 指令 | 多个命令用 `&&` 连接 | 减少镜像层数 |
| 使用 .dockerignore | 排除 node_modules、.git 等 | 加速构建，减小上下文 |
| 多阶段构建 | 分离构建和运行环境 | 最终镜像不含构建工具 |
| 固定版本号 | `node:18.17-alpine` 而非 `node:latest` | 构建可重复 |

### 5.3 安全实践

| 实践 | 说明 |
|------|------|
| 不用 root 运行 | `USER node` 指定非 root 用户 |
| 扫描漏洞 | `docker scout` 或 Trivy 扫描镜像 |
| 最小权限 | 只安装必要的包，不装调试工具 |
| 不硬编码密钥 | 用环境变量或 Docker Secrets |
| 定期更新基础镜像 | 及时修复安全漏洞 |

---

## 总结

Docker 容器化是现代软件交付的基础设施，理解它对于任何开发者都至关重要。

回顾本章的关键要点：

1. **容器 vs 虚拟机**：容器共享宿主内核，更轻量、更快，但隔离性略弱于 VM
2. **核心三件套**：镜像（模板）、容器（实例）、仓库（分发）
3. **Dockerfile**：分层构建，利用缓存，变化少的指令放前面
4. **Docker Compose**：用 YAML 定义多服务应用，服务名即主机名
5. **生产实践**：多阶段构建减小镜像、alpine 基础镜像、非 root 运行

## 延伸阅读

- [Docker 官方文档](https://docs.docker.com/) - 最权威的参考资料
- [Docker Getting Started](https://docs.docker.com/get-started/) - 官方入门教程
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) - 官方最佳实践指南
- [Docker Compose 文档](https://docs.docker.com/compose/) - Compose 完整参考
