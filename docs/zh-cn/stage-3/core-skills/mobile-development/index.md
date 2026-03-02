# Claude Code 手机远程开发

## 引言

想象一下这些场景：你在通勤的地铁上突然想到一个绝妙的 bug 修复方案；你在咖啡厅排队时收到线上故障的紧急通知；你在陪女朋友逛街时想看看 AI 构建的项目进展如何。

传统开发模式下，这些场景意味着你需要找个地方打开电脑，或者无奈地把事情推迟。但在 AI 辅助编程时代，规则变了。Claude Code 的出现让我们可以把开发环境装进口袋，随时随地保持生产力。

2025 年夏天，随着 Claude Code 的普及，开发者们开始探索各种"手机编程"方案。从简单的 Termux 本地运行，到复杂的 SSH + Tailscale 远程连接，再到专门的 Happy Coder 应用，一个完整的移动开发生态逐渐形成。

本章要解决的核心问题是：如何让 Claude Code 跟随你的手机，成为真正的"口袋开发助手"。

---

::: info 💡 社区反馈速览

根据群友实际使用反馈，各方案体验对比如下：

**Happy Coder（方案二）**
- ⚠️ 连接稳定性问题：经常断线，且断线后上下文丢失
- ⚠️ 功能受限：无法使用 `/` 指令
- ⚠️ 安全性顾虑：依赖官方中继服务器，部分用户担心数据安全

**HAPI（方案三）**
- ✅ 可自建服务器：支持部署在自己的 VPS 上
- ✅ 搭配 Tailscale 使用体验更佳：电脑运行 `hapi server`，手机通过 Tailscale IP 连接
- ✅ 连接相对稳定，适合长期使用

**Claude Remote Control（官方方案）**
- ✅ 官方出品，与 Claude Code 原生集成
- ✅ 支持本地环境完整访问（MCP、工具、项目配置）
- ⚠️ 需要 Max 订阅（Pro 支持即将到来）
- ⚠️ 依赖 Anthropic 云服务连接

**建议**：如果对连接稳定性要求高，或担心第三方中继安全性，推荐选择 **HAPI + Tailscale** 或 **官方 Remote Control** 方案。

:::

---

## 核心原理：手机开发的架构模式

在介绍各种方案之前，先理解问题的本质。

### 为什么手机开发是个问题？

传统的 IDE（如 VS Code、IntelliJ）需要完整的操作系统环境、强大的 CPU、大量内存和存储空间。手机虽然性能越来越强，但在开发体验上仍有天然限制：

**输入限制**：虚拟键盘输入代码效率低，复杂语法容易出错

**屏幕限制**：小屏幕难以同时查看代码、终端和浏览器

**环境限制**：手机无法运行完整的开发工具链（编译器、数据库、调试器）

**连接限制**：移动网络不稳定，SSH 连接容易断开

### 核心思想：瘦客户端架构

所有手机开发方案的核心思想都是：手机只是"控制台"，真正的开发工作在别处完成。

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │   手机      │              │  主机/云端  │             │
│    │  (控制端)   │   ────────►  │ (执行端)    │             │
│    │             │   指令/结果  │             │             │
│    │  • 输入指令 │              │  • 运行 CLI │             │
│    │  • 查看输出 │              │  • 执行代码 │             │
│    │  • 审查更改 │              │  • 访问文件 │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

这种架构让手机只需要负责"人机交互"，把繁重的计算工作交给主机或云端。

---

## 方案一：iOS 官方 App

2025 年 10 月，Anthropic 正式在 iOS App 中推出了 Claude Code 移动版，这是最简单的手机开发方案。

### 地区限制

⚠️ **重要提示**：Claude App 在中国大陆地区**无法直接使用**。

如果你在中国大陆，推荐直接使用 **Happy Coder**（方案二），它可以通过配置国内 API 中转服务正常工作。

如果你有海外 Apple ID，可以通过切换地区下载 Claude App。

### 工作原理

```
┌─────────────┐                    ┌─────────────────┐
│  iOS App    │ ──────────────────► │  Anthropic 云端 │
│  (手机)     │   HTTPS + OAuth     │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

你的手机 App 只是发送指令，所有代码执行都在 Anthropic 的云端沙盒中进行，结果通过 GitHub 同步。

### 基本使用

**前提条件**：

- iPhone iOS 15 或更高版本
- Claude Pro/Team/Enterprise 订阅（免费版不支持）
- GitHub 账号

**使用步骤**：

1. 从 App Store 下载 Claude App
2. 登录你的 Anthropic 账号
3. 在 App 中找到"Code"标签页
4. 通过 OAuth 连接你的 GitHub 仓库
5. 开始创建任务

### 优缺点

优点是配置零门槛、体验流畅、有推送通知。缺点是只支持 iOS、主要支持 GitHub、功能相对受限（不能访问本地文件系统）、中国大陆无法使用。

---

## 方案二：Happy Coder

Happy Coder 是一个为 Claude Code 和 Codex 设计的开源移动和 Web 客户端，支持端到端加密，可以从任何地方控制你的 AI 编程助手。

### 工作原理

```
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Happy App  │   ────────►  │ Happy Server │   ◄────────   │happy-coder  │
│  (手机/Web) │  加密WebSocket│  (中继服务器) │  WebSocket   │  (电脑CLI)  │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │    CLI      │
                                                        └─────────────┘
```

在电脑上运行 `happy` 代替 `claude` 启动 AI 编程助手。当需要在手机上控制时，会话会自动切换到远程模式。电脑上按任意键即可切回本地控制。

### 安装和使用

**步骤 1：下载 App**

| 平台 | 链接 |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| Web | [app.happy.engineering](https://app.happy.engineering) |

**步骤 2：电脑安装 CLI**

```bash
npm install -g happy-coder
```

**步骤 3：启动并配对**

```bash
# 在项目目录中运行
cd ~/my-project
happy

# 会显示配对二维码
```

**步骤 4：手机扫码配对**

打开 Happy App，扫描电脑上显示的二维码。配对成功后即可在手机上控制 Claude Code。

**步骤 5：使用**

```bash
# 启动 Claude Code
happy

# 或启动 Codex
happy codex
```

### 资源链接

- [GitHub 项目](https://github.com/slopus/happy) - 源代码
- [文档网站](https://happy.engineering/docs) - 使用文档
- [Discord 社区](https://discord.gg/fX9WBAhyfD) - 社区讨论

### 优缺点

优点是配置简单、跨平台支持、端到端加密、开源可审计。缺点是需要依赖第三方中继服务器、手机应用需要自行验证可用性。

---

## 方案三：HAPI

HAPI 是 Happy Coder 的替代方案，采用本地优先的设计理念，支持无缝切换设备和多种 AI 模型。

### 工作原理

```
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  HAPI App   │   ────────►  │ HAPI Server │   ◄────────   │    hapi    │
│(手机/PWA/   │  WireGuard   │  (自建中继)  │   WireGuard  │  (电脑CLI)  │
│  Telegram)  │   + TLS      │              │   + TLS      │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │  / Codex /  │
                                                        │  Gemini等   │
                                                        └─────────────┘
```

HAPI 使用 WireGuard 配合 TLS 实现端到端加密，所有通信经过加密中继服务器。你可以自建中继服务器，完全掌控数据流。

### 核心特性

- **无缝切换**：在电脑和手机之间无缝切换控制，按任意键即可回到本地控制
- **原生优先**：使用原生技术封装移动应用，提供流畅的交互体验
- **AFK 审批**：离开电脑时，手机可以接收审批请求，无需中断工作流
- **多模型支持**：支持 Claude Code、Codex、Gemini、OpenCode 等多种 AI 编程助手
- **随时随地终端**：通过 PWA、Telegram Mini App 等多种方式访问
- **语音控制**：支持语音输入指令，解放双手

### 安装和使用

**步骤 1：启动中继服务器**

```bash
# 在你的服务器上运行（或使用 npx 直接启动）
npx @twsxtd/hapi hub --relay
```

**步骤 2：电脑安装 CLI**

```bash
# 在项目目录中运行
cd ~/my-project
npx @twsxtd/hapi

# 或全局安装
npm install -g @twsxtd/hapi
hapi
```

**步骤 3：配对设备**

按照终端提示，在手机上打开 HAPI App 并扫描二维码完成配对。

**步骤 4：访问方式**

| 访问方式 | 说明 |
|---------|------|
| Web PWA | 浏览器访问，支持安装到桌面 |
| Telegram Mini App | 在 Telegram 内直接使用 |
| 移动应用 | 原生应用体验（如已发布） |

### 与 Happy Coder 的区别

| 特性 | Happy Coder | HAPI |
|------|-------------|------|
| 设计理念 | 云端优先 | 本地优先 |
| 加密方式 | WebSocket + E2E | WireGuard + TLS |
| 多模型支持 | Claude Code, Codex | Claude, Codex, Gemini, OpenCode |
| 访问方式 | iOS/Android/Web | PWA, Telegram, 更多 |
| 语音控制 | ❌ | ✅ 支持 |
| AFK 审批 | ❌ | ✅ 支持 |
| 自建中继 | ⚠️ 需手动部署 | ✅ 开箱即用 |

### 资源链接

- [GitHub 项目](https://github.com/tiann/hapi) - 源代码
- [PWA 使用文档](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - PWA 安装和使用
- [工作原理](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - 技术实现细节
- [语音助手](https://github.com/tiann/hapi/blob/main/docs/voice.md) - 语音控制功能
- [为什么选择 HAPI](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - 设计理念
- [常见问题](https://github.com/tiann/hapi/blob/main/docs/faq.md) - FAQ

### 优缺点

优点是本地优先设计、多模型支持、端到端加密、支持语音控制、可自建中继。缺点是项目相对较新、社区生态仍在发展中。

---

## 方案四：SSH + Tailscale + Tmux

这是最适合专业开发者的方案，通过 SSH 远程连接到你的开发机器，配合 Tmux 保持会话持久化。

### 工作原理

```
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   手机      │   ────────►  │  Tailscale  │   ◄────────   │   电脑     │
│  (SSH客户端)│   VPN P2P    │   中继/打洞  │   VPN P2P    │  (开发机)   │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │  (会话保持)  │
                                                        └─────────────┘
```

Tailscale 创建一个点对点 VPN 网络，让你在任何网络环境下都能直接访问家里的电脑。Tmux 确保即使 SSH 断开，Claude Code 仍在后台运行。

### 为什么需要 Tailscale？

**传统的 SSH 连接问题**：

```
手机 (4G) ──XX──> 路由器 NAT ──XX──> 家里电脑
              (无法穿透)         (内网隔离)
```

你的电脑在内网，手机在外网无法直接访问。传统的解决方案是配置端口转发和动态 DNS，过程复杂且有安全风险。

**Tailscale 的解决方案**：

```
手机 (4G) ──► Tailscale 中继 ──◄── 家里电脑
            (自动打洞或中继)
```

Tailscale 使用 NAT 打洞技术，如果打洞失败会自动使用中继服务器，全程加密。

### 完整配置步骤

**步骤 1：在电脑上安装 Tailscale**

```bash
# macOS
brew install --cask tailscale

# 或下载安装包
# https://tailscale.com/download
```

**步骤 2：登录并获取 IP**

```bash
# 启动 Tailscale
sudo tailscale up

# 查看 Tailscale IP
tailscale ip -4
# 输出示例: 100.x.x.x
```

**步骤 3：在手机上安装 Tailscale**

从 App Store 或 Google Play 下载 Tailscale，用同一账号登录。

**步骤 4：安装并配置 Tmux**

```bash
# macOS
brew install tmux

# 创建配置文件 ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# 启用鼠标支持
set -g mouse on

# 设置默认终端模式为 256 色
set -g default-terminal "screen-256color"

# 更改按键绑定为 Ctrl+A（可选）
unbind C-b
set -g prefix C-a

# 简化的分割面板快捷键
bind v split-window -h
bind h split-window
```

**步骤 5：创建持久化会话**

```bash
# 创建名为 "claude" 的会话
tmux new -s claude

# 在这个会话中启动 Claude Code
cd ~/my-project
claude

# 分离会话（不关闭）
# 按 Ctrl+B 然后按 D
```

**步骤 6：手机 SSH 客户端连接**

推荐使用的 SSH 客户端：

| 客户端 | 平台 | 特点 |
|--------|------|------|
| Blink Shell | iOS | 支持 MOSH，适合不稳定网络 |
| Termius | iOS/Android | 跨平台，界面美观 |
| a-Shell | iOS | 免费，轻量级 |

连接配置：

```
Host: 100.x.x.x (你的 Tailscale IP)
Port: 22
Username: 你的电脑用户名
```

连接后附加到 Tmux 会话：

```bash
tmux attach -t claude
```

### 进阶技巧

**防止电脑休眠**：

```bash
# macOS
caffeinate -dimsu &

# 或设置系统偏好 > 能源节能 > 防止自动休眠
```

**使用 MOSH 应对不稳定网络**：

MOSH (Mobile Shell) 是专门为移动网络优化的 SSH 替代品，支持网络切换无缝恢复。

```bash
# 在电脑上安装
brew install mosh

# 在手机上使用 MOSH 连接
# Blink Shell 原生支持 MOSH
```

**一键连接脚本**：

在 SSH 客户端中设置启动命令：

```bash
tmux attach -t claude || tmux new -s claude
```

这样连接后会自动附加到现有会话，或创建新会话。

### 优缺点

优点是功能完整、体验与桌面一致、支持所有开发工具。缺点是配置相对复杂、需要电脑保持运行。

---

## 方案五：Termux 本地运行

如果你是 Android 用户，可以直接在手机上运行 Claude Code，无需连接外部设备。

### 工作原理

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │  (Linux环境) │                         │
│                    │             │                          │
│                    │  • Node.js  │                          │
│                    │  • Claude   │                          │
│                    │    Code CLI │                          │
│                    │             │                          │
│                    │  • 项目文件 │                          │
│                    │  • Git      │                          │
│                    └─────────────┘                          │
│                         │                                  │
│                         ▼                                  │
│                   ┌─────────────┐                          │
│                   │Anthropic API│                          │
│                   └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

Termux 是 Android 上的终端模拟器和 Linux 环境，你可以直接在上面安装 Node.js 和 Claude Code。

### 安装步骤

**重要**：从 [F-Droid](https://f-droid.org/) 下载 Termux，不要用 Google Play 版本（已过时）。

**步骤 1：安装基础工具**

```bash
# 更新包管理器
pkg update && pkg upgrade

# 安装开发工具
pkg install git nodejs python vim
```

**步骤 2：安装 Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

**步骤 3：配置环境**

```bash
# 创建工作目录
mkdir -p ~/projects
cd ~/projects

# 初始化项目
git clone https://github.com/your-repo.git
cd your-repo

# 启动 Claude Code
claude
```

**步骤 4：配置外部键盘（推荐）**

在 Termux 中：

```bash
# 启用扩展键行
# 长按屏幕 > More > Extra keys row

# 配置快捷键
# 在 ~/.termux/termux.properties 中添加
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### 性能考虑

| 任务类型 | Android 表现 |
|---------|-------------|
| Web 开发 (HTML/CSS/JS) | ✅ 优秀 |
| Python 脚本 | ✅ 优秀 |
| Node.js 应用 | ✅ 良好 |
| 运行测试套件 | ⚠️ 中等 |
| 编译大型项目 | ❌ 不推荐 |

### 优缺点

优点是完全本地化、无需网络、完全掌控。缺点是手机性能有限、输入体验差、仅限 Android。

---

## 方案六：Claude Code UI

Claude Code UI（又名 CloudCLI）是一个开源项目，为 Claude Code 提供 Web 界面，支持手机浏览器访问。

### 工作原理

```
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  手机浏览器 │   ────────►  │  Web 服务器  │   ◄────────   │Claude Code  │
│            │   HTTP/HTTPS │  (localhost)  │   调用       │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

在电脑上运行 Web 服务器，手机通过浏览器访问。这需要内网穿透或局域网访问。

### 安装和使用

**步骤 1：安装**

```bash
# 一键启动（推荐）
npx @siteboon/claude-code-ui

# 或全局安装
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**步骤 2：访问界面**

服务器默认运行在 `http://localhost:3001`

**步骤 3：手机访问**

方法 A - 局域网访问（同一 WiFi）：

```bash
# 启动时绑定所有接口
claude-code-ui --host 0.0.0.0

# 手机访问
http://电脑局域网IP:3001
```

方法 B - 使用 ngrok 内网穿透：

```bash
# 安装 ngrok
brew install ngrok

# 启动隧道
ngrok http 3001

# 手机访问 ngrok 提供的 URL
```

### 功能

- 响应式设计，支持移动端
- 内置聊天界面
- 文件浏览器
- Git 操作界面
- 会话管理

### 优缺点

优点是有图形界面、功能完整。缺点是需要内网穿透（除非局域网）、配置相对复杂。

---

## 方案七：云端开发环境

如果你没有常开的电脑，可以使用云端开发环境，Claude Code 运行在云服务器上。

### 工作原理

```
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  手机       │   ────────►  │  云端容器    │   ─────────► │Claude Code  │
│ (浏览器/App)│   HTTPS     │ (DevBox)     │               │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

云容器中预装了 Claude Code，你通过浏览器或手机 App 访问。

### 使用 Sealos DevBox

**步骤 1：创建环境**

访问 [Sealos DevBox](https://sealos.io/devbox)，选择 Claude Code 模板创建环境。

**步骤 2：启动开发环境**

约 30-60 秒后环境就绪，你得到一个 Web 终端。

**步骤 3：配置 Claude API**

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**步骤 4：连接 Happy App**

```bash
# 安装 happy-coder（已预装）
npm install -g happy-coder

# 生成配对二维码
happy
```

手机扫码后即可使用。

### 云端方案对比

| 平台 | Claude Code | 移动优化 | 启动时间 | 定价 |
|------|------------|----------|----------|------|
| Sealos DevBox | ✅ 预装 | ✅ Happy | ~60秒 | 按量付费 |
| GitHub Codespaces | ⚠️ 手动 | ⚠️ 浏览器 | ~2-3分钟 | 免费额度+按小时 |
| Gitpod | ⚠️ 手动 | ⚠️ 浏览器 | ~1-2分钟 | 免费额度+按小时 |
| Replit | ❌ | ✅ 原生App | 即时 | 免费+订阅 |

### 优缺点

优点是无需本地电脑、环境一致、可扩展。缺点是需要付费、依赖网络、代码在云端。

---

## 方案对比与选择

各种方案各有特点，适合不同场景。

### 对比表

| 方案 | 难度 | 需要内网穿透 | 费用 | 适用场景 |
|------|------|-------------|------|----------|
| iOS 官方 App | 简单 | ❌ | $20/月 | 快速查看、简单任务 |
| Happy Coder | 较简单 | ❌ | 免费 | 日常使用、便利性 |
| HAPI | 中等 | ❌ | 免费 | 多模型支持、本地优先 |
| SSH + Tailscale | 较复杂 | ❌ | 免费 | 专业开发、完整功能 |
| Termux | 中等 | ❌ | 免费 | Android 本地开发 |
| Claude Code UI | 中等 | ✅ 需要 | 免费 | 需要 Web 界面 |
| 云端 DevBox | 简单 | ❌ | 按量付费 | 无本地电脑 |

### 选择指南

**如果你在中国大陆**：推荐使用 **Happy Coder**，可以通过配置国内 API 中转服务正常工作。

**如果你追求便利性**：Happy Coder 最省心，扫码即用。

**如果需要多模型支持**：HAPI 支持多种 AI 编程助手，适合需要在不同模型间切换的开发者。

**如果你有常开的电脑**：SSH + Tailscale 是最佳选择，体验最完整。

**如果你是 iPhone 用户（非大陆）**：官方 App 是最简单的入门方式。

**如果你只有 Android 手机**：Termux 可以让你完全在手机上开发。

**如果你没有电脑**：云端 DevBox 是理想选择。

---

## 安全性与隐私

手机开发涉及代码在网络上传输，需要特别注意安全。

### 中继服务器的风险

使用 Happy Coder、HAPI 等需要中继的服务时，考虑以下问题：

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  中继服务器能看到什么？                                      │
│                                                             │
│  • 加密前的数据（如果端到端加密实现不当）                     │
│  • 元数据（何时连接、连接多长时间）                           │
│  • 你的 API Key（如果配置不当）                              │
│                                                             │
│  中继服务器能做什么？                                        │
│                                                             │
│  • 记录你的代码内容                                          │
│  • 窃取 API 密钥                                             │
│  • 注入恶意命令                                              │
│  • 把你的设备当作节点攻击其他人                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 安全最佳实践

**1. 代码敏感度分级**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  公开项目/学习代码 ──► 可以用任何方案                         │
│                                                             │
│  私人项目 ──► 推荐 SSH+Tailscale 或 自建中继                 │
│                                                             │
│  商业代码 ──► 只用 SSH+Tailscale，禁用所有第三方中继          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. 密钥管理**

```bash
# ❌ 不要在代码中硬编码密钥
const apiKey = "sk-ant-xxxxx"

# ✅ 使用环境变量
const apiKey = process.env.ANTHROPIC_API_KEY

# ✅ 使用 .env 文件（加入 .gitignore）
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. 使用沙盒**

Claude Code 支持沙盒模式，限制其访问范围：

```bash
claude --sandbox /path/to/project
```

**4. 自建中继**

如果你使用 Happy Coder，可以考虑自建中继服务器：

```bash
# 克隆项目（包含服务器代码）
git clone https://github.com/slopus/happy.git
cd happy

# 部署服务器代码到你的 VPS
# 具体步骤参考项目文档
```

**5. 使用 Headscale**

Headscale 是 Tailscale 的开源实现，可以自建中继服务器：

```bash
# Docker 一键部署
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## 常见问题

### 需要内网穿透吗？

大部分现代方案**不需要**内网穿透：

| 方案 | 原理 |
|------|------|
| Happy Coder | 中继模式，双方主动连接服务器 |
| HAPI | 中继模式，WireGuard + TLS |
| Tailscale | NAT 打洞或中继 |
| iOS App | 云端执行 |
| Claude Code UI | 需要（被动入站） |

### 为什么中继模式不需要穿透？

```
主动出站（NAT允许）：
电脑 ──► 中继服务器 ✓

主动入站（NAT阻挡）：
外部 ──► 电脑 ✗

中继模式的巧妙之处：
双方都主动连接中继服务器，都不需要入站！
```

### 手机开发会影响电池吗？

不同方案耗电不同：

| 方案 | 耗电量 | 原因 |
|------|--------|------|
| SSH 终端 | 低 | 只是文本显示 |
| iOS App | 中 | 云端执行，手机只做控制 |
| Termux | 高 | 本地运行 CLI |
| 浏览器 | 中 | Web 界面渲染 |

建议长时间使用时连接充电器。

### 网络断开会怎样？

| 方案 | 网络断开影响 |
|------|-------------|
| SSH + Tmux | Claude 继续运行，重连后可恢复 |
| Happy Coder | 自动重连 |
| HAPI | 自动重连 |
| iOS App | 云端继续，App 提示断开 |
| Termux | 会话中断 |

### 能在手机上编译大型项目吗？

不推荐。手机 CPU 和内存有限，大型编译会导致：

- 手机发烫
- 电池快速消耗
- 编译时间过长

建议将编译任务放到远程服务器或云端执行。

---

## 总结

Claude Code 手机开发的核心思想是：**手机只是控制端，真正的开发工作在别处完成**。

选择哪种方案取决于你的具体需求。

如果你在中国大陆，推荐 **Happy Coder**，配置国内 API 中转即可使用。

如果想要最省心的方案，用 **Happy Coder**。扫码即用，推送通知，设备切换流畅。

如果需要多模型支持或本地优先设计，用 **HAPI**。支持多种 AI 编程助手，可自建中继。

如果想要最完整的开发体验，用 **SSH + Tailscale**。配置稍复杂，但功能最全，体验与桌面一致。

如果是 iOS 用户（非大陆），**官方 App** 是最简单的入门方式。

如果是 Android 用户，**Termux** 让你完全在手机上开发。

如果没有常开的电脑，**云端 DevBox** 是理想选择。

无论哪种方案，都要注意安全性：敏感代码要慎用第三方中继，API 密钥要妥善管理，重要项目最好用自建中继。

---

## 参考资料

### 官方资源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code) - Claude Code 的完整官方文档
- [Claude iOS App](https://apps.apple.com/app/claude/id6473753684) - 官方 iOS 应用

### 开源项目

- [slopus/happy](https://github.com/slopus/happy) (2.5k⭐) - Happy Coder 移动客户端
- [tiann/hapi](https://github.com/tiann/hapi) - HAPI 本地优先的多模型 AI 编程助手
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) - Claude Code UI (CloudCLI)
- [juanfont/headscale](https://github.com/juanfont/headscale) (19k⭐) - Tailscale 的开源实现

### 中文教程

- [随时随地大小编，手机也能配置Claude Code](https://m.blog.csdn.net/haa_y/article/details/151156494) - Termux 配置教程
- [口袋里的 AI 实验室：永不掉线的 Claude Code 移动工作流](https://www.cnblogs.com/swizard/p/19308983) - Tmux + Docker 方案
- [陪女朋友逛街时，我带上了 Claude Code](https://post.m.smzdm.com/p/a3r7d63d/) - Tailscale 远程连接
- [手机就能写上线级App](https://m.toutiao.com/article/7611823834756301318/) - 移动开发实战案例

### 英文资源

- [The Definitive Guide to Using Claude Code on Your Phone | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/) - 最全面的手机开发指南
- [SSH + Tailscale + Termius Complete Guide](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - 远程连接详细教程

### 工具下载

- [Tailscale](https://tailscale.com/download) - 点对点 VPN 工具
- [Termux (F-Droid)](https://f-droid.org/en/packages/com.termux/) - Android 终端模拟器
- [Blink Shell](https://blink.sh/) - iOS SSH 客户端（支持 MOSH）
- [Termius](https://termius.com/) - 跨平台 SSH 客户端
