# Claude MCP 完全指南

## MCP 简介

**MCP（Model Context Protocol，模型上下文协议）** 是由 Anthropic 公司开发的一个**开放协议标准**，于 2024 年 11 月正式发布。

想象一下，MCP 就像是 AI 世界的「USB-C 接口」——它提供了一种标准化的方式，让 AI 大模型（如 Claude、GPT）能够与外部数据源、工具和 API 进行交互。

### 为什么需要 MCP？

在没有 MCP 之前，AI 模型与外部系统的交互存在诸多问题：

- **缺乏统一标准**：每个工具都需要单独的集成方式
- **开发成本高**：为每个新功能编写专用连接器
- **安全性难以保证**：没有统一的权限和认证机制
- **模型无关性差**：不同 AI 平台需要重复开发

MCP 解决了这些问题，提供了一套统一的协议，让 AI 能够「即插即用」地连接各种外部服务。

## 快速开始

### 5 分钟上手 MCP

让我们通过一个简单的例子，快速体验 MCP 的强大功能。

#### 步骤 1：安装 Claude Desktop（如果还没有）

访问 [Claude Desktop 下载页面](https://claude.ai/download) 下载并安装。

#### 步骤 2：找到配置文件

| 操作系统 | 配置文件路径 |
|---------|-------------|
| **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |
| **Linux** | `~/.claude/mcp-config.json` |

#### 步骤 3：添加你的第一个 MCP 服务器

以 **GitHub 服务器**为例——它让 Claude 能够**操作你的 GitHub 仓库**，这是 AI 原本做不到的！

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

**获取 GitHub Token：**访问 [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)，创建一个 Classic Token，勾选 `repo`、`issues`、`pull_requests` 权限。

#### 步骤 4：重启 Claude Desktop

保存配置文件后，完全退出 Claude Desktop 并重新打开。

#### 步骤 5：查看已安装的 MCP 服务器

在 Claude Desktop 中，输入以下命令查看：

```
你：你现在有哪些可用的工具？

Claude：[会列出所有 MCP 服务器提供的工具]
```

配置成功后，你会看到类似这样的输出：

```
可用工具：
- github_create_issue: 在 GitHub 仓库中创建 Issue
- github_list_issues: 列出仓库的 Issues
- github_create_pull_request: 创建 Pull Request
- github_add_comment: 添加评论
...
```

#### 步骤 6：开始使用

现在 Claude 可以操作你的 GitHub 仓库了：

```
你：帮我在 anthropic/claude-code 仓库里创建一个 Issue，标题是"添加新功能"，内容是描述需要添加的功能

Claude：[会调用 github_create_issue 工具创建 Issue]

你：帮我看看最近有哪些开放的 Issue 需要处理

Claude：[会调用 github_list_issues 工具并列出 Issues]
```

### 尝试更多 MCP 服务器

#### SQLite 服务器 - 查询本地数据库

让 Claude 能够查询和分析你的 SQLite 数据库：

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "/path/to/your/database.db"]
    }
  }
}
```

**配置后你可以让 Claude：**
- 执行 SQL 查询
- 分析数据库结构
- 生成数据报表

#### 文件系统服务器 - 安全访问本地文件

让 Claude 能够访问指定目录的文件：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/你的用户名/Documents"]
    }
  }
}
```

**配置后你可以让 Claude：**
- 读取和编辑文件
- 搜索文件内容
- 创建新文件

#### Puppeteer 服务器 - 浏览器自动化

让 Claude 能够控制浏览器进行自动化操作：

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

**配置后你可以让 Claude：**
- 截取网页截图
- 填写表单
- 点击按钮
- 抓取动态网页内容

### 在 Claude Code 中使用 MCP

如果你使用的是 **Claude Code（CLI 工具）**，配置更加简单：

```bash
# 添加一个 MCP 服务器
claude mcp add --transport http https://mcp.notion.com/mcp

# 查看已安装的 MCP 服务器
/mcp

# 检查 MCP 连接状态
/doctor
```

**配置文件位置：**
- 用户级：`~/.claude.json`
- 项目级：`.claude/mcp.json`

## MCP 原理

### 核心架构

MCP 采用 **客户端-服务器架构**，包含以下几个核心组件：

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   MCP Host      │────▶│   MCP Client    │────▶│   MCP Server    │
│  (Claude Desktop)│     │  (协议适配层)     │     │  (工具提供者)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                       │
                       ┌───────────────────────────────┘
                       ▼
              ┌─────────────────────────────┐
              │  Tools / Resources / Prompts │
              │  (工具 / 资源 / 提示模板)     │
              └─────────────────────────────┘
```

### 三大核心能力

MCP 定义了三种主要的能力类型：

#### 1. Tools（工具）
- **定义**：可执行的函数，AI 模型可以调用
- **特点**：可以修改外部状态，产生副作用
- **示例**：发送邮件、执行代码、文件操作、API 调用
- **操作**：`tools/list`（发现）、`tools/call`（执行）

#### 2. Resources（资源）
- **定义**：服务器向客户端暴露的只读数据
- **特点**：提供数据和上下文，不修改外部状态
- **示例**：文件内容、配置信息、数据库记录、系统状态
- **操作**：`resources/list`（发现）、`resources/read`（读取）

#### 3. Prompts（提示）
- **定义**：可重用的提示模板和工作流
- **特点**：预定义的参数化模板，提供标准化指令
- **示例**：欢迎消息、工作流模板、角色特定提示、数据库调试模板
- **操作**：`prompts/list`（发现）、`getPrompt()`（获取）

### 通信机制

MCP 基于 **JSON-RPC 2.0** 规范进行消息交互：

```json
// 请求示例
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "city": "北京"
    }
  }
}

// 响应示例
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "北京今天晴天，温度 15-25°C"
      }
    ]
  }
}
```

### 传输方式

MCP 支持三种传输方式，各有适用场景：

| 传输方式 | 部署方式 | 延迟 | 安全性 | 适用场景 |
|---------|---------|------|--------|----------|
| **STDIO** | 本地 | 零延迟 | 高 | 本地工具集成、开发环境 |
| **SSE** | 远程 | 低 | 中等 | 微服务架构、远程调试 |
| **Streamable HTTP** | 远程 | 中等 | 高（需认证） | 企业级生产环境 |

#### STDIO（标准输入/输出）
- 客户端启动服务器为子进程
- 消息通过 stdin/stdout 传输
- 数据不经过网卡，安全性最高
- 生命周期与客户端绑定

#### SSE（Server-Sent Events）
- 下游使用 SSE 长连接推送
- 上游使用 HTTP POST 请求
- 支持远程部署和独立运行
- 需要持久连接

#### Streamable HTTP
- HTTP POST 发送消息
- 支持流式实时响应
- 跨越网络边界
- 需要严格的认证机制（OAuth 2.1）

---

### 三种传输方式深度对比

#### 1. 核心区别对比表

| 对比维度 | STDIO | SSE | HTTP |
|---------|-------|-----|------|
| **通信方向** | 双向（stdin/stdout） | 单向（Server→Client）+ POST | 双向（请求/响应） |
| **连接方式** | 子进程管道 | 长连接（SSE）+ 短连接（POST） | 短连接/流式 |
| **部署位置** | 必须本地 | 本地或远程 | 本地或远程 |
| **启动方式** | 客户端启动子进程 | 独立进程/服务 | 独立进程/服务 |
| **网络依赖** | 无（不经过网卡） | 需要网络 | 需要网络 |
| **并发处理** | 单连接 | 多客户端 | 多客户端 |
| **适用场景** | 本地工具、CLI | 实时推送、监控 | REST API、微服务 |
| **配置复杂度** | 低 | 中 | 中 |
| **调试难度** | 低 | 中 | 中 |

#### 2. 各传输方式的详细特点

##### 简单比喻理解三种传输方式

在深入了解技术细节之前，让我们先用**同一个场景**来理解这三种传输方式的区别——想象你需要从一个仓库（MCP 服务器）获取货物（数据）：

**STDIO 就像「仓库就在你家地下室」**：仓库和你在同一栋房子里，你走下楼梯就能拿到货物。这种方式最快（零延迟），最安全（外人进不来），但仓库只能服务你一个人，而且必须和你住在一起（本地运行）。当你离开家（关闭 Claude），仓库也关门了。

**SSE 就像「仓库开通了送货上门服务」**：仓库可以开在小区任何地方（本地或远程）。你办了一张会员卡（建立 SSE 连接），仓库会主动把新到的货物送到你家门口（服务器推送）。你不需要每天去问，有新货自动送来。这张卡可以被多个邻居办理（多客户端），大家各自收到各自的货物。

**HTTP 就像「你在网上商城下单」**：仓库可以开在任何地方（本地或远程）。每次需要货物时，你打开 App 下单（发送 HTTP 请求），仓库处理后发货（返回响应）。每次下单都是独立的，仓库不需要记住你是谁。如果订单太多，商城可以自动分配给多个仓库处理（负载均衡），保证服务不中断。

---

##### STDIO（标准输入/输出）传输方式

STDIO 是 MCP 最简单也是最常用的传输方式，它通过操作系统的标准输入输出管道进行通信。当你使用 STDIO 方式时，MCP 客户端（如 Claude Desktop）会启动 MCP 服务器作为一个子进程，然后通过 stdin（标准输入）向服务器发送消息，通过 stdout（标准输出）接收服务器的响应。

STDIO 方式的最大特点是**数据不经过网络协议栈**，所有通信都在本机内存中通过管道完成。这意味着它的延迟几乎为零，而且安全性极高——数据不会离开本机，不会被网络嗅探，也不需要考虑网络认证和加密的问题。由于客户端直接管理服务器的生命周期，当 Claude Desktop 关闭时，STDIO 服务器也会自动终止，这种绑定关系简化了资源管理。

STDIO 特别适合那些只需要访问本地资源的工具，比如文件系统操作、本地数据库查询、系统命令执行等。例如，你想让 Claude 帮你读取本地文件、查询 SQLite 数据库、或者执行 Git 命令，STDIO 是最佳选择。它的配置也非常简单，只需要指定启动命令和参数即可。

不过，STDIO 也有其局限性。由于服务器是作为子进程运行的，它只能运行在本地机器上，无法部署到远程服务器。同时，每个 STDIO 服务器只能服务于一个客户端连接，不支持多客户端并发访问。

##### SSE（Server-Sent Events）传输方式

SSE 传输方式让 MCP 服务器可以作为独立的 HTTP 服务运行，支持本地或远程部署。它采用了一种混合通信模式：服务器通过 SSE（Server-Sent Events）长连接向客户端推送消息，而客户端则通过普通的 HTTP POST 请求向服务器发送消息。

这种设计的巧妙之处在于，SSE 本身就是基于 HTTP 的，因此它可以天然地穿透防火墙和代理服务器，同时又能保持服务器向客户端主动推送数据的能力。当你建立 SSE 连接后，服务器可以随时将数据推送到客户端，而不需要客户端不断轮询，这对于实时监控、日志流式输出、进度通知等场景非常有用。

SSE 服务器独立于客户端运行，这意味着它可以部署在远程服务器上，多个客户端可以同时连接到同一个 SSE 服务器。例如，你可以在公司内网部署一个 SSE 类型的 MCP 服务器，让团队成员的 Claude Desktop 都能连接使用。服务器有自己的生命周期，不会因为某个客户端断开而停止运行。

SSE 的适用场景包括：需要服务器主动推送数据的实时监控工具、日志收集和分析服务、多用户共享的企业级工具等。相比 STDIO，SSE 的配置稍微复杂一些，需要指定服务器的 URL 地址，并且可能需要处理 CORS（跨域资源共享）和网络认证的问题。

##### HTTP（Streamable HTTP）传输方式

HTTP 传输方式采用传统的请求-响应模式，客户端通过 HTTP POST 请求向服务器发送消息，服务器处理完成后返回响应。这是最常见的 Web 服务通信方式，也是最容易与现有基础设施集成的方案。

Streamable HTTP 在普通 HTTP 的基础上增加了流式响应的支持，这意味着服务器可以在处理过程中逐步返回结果，而不需要等到全部处理完成。这对于处理耗时操作（如大文件处理、复杂计算）时特别有用，因为客户端可以实时看到进度，而不需要一直等待。

HTTP 方式的最大优势在于**无状态设计**。每个请求都是独立的，服务器不需要维护客户端的连接状态，这使得 HTTP 服务器可以轻松地水平扩展——你可以部署多个服务器实例，通过负载均衡器分发请求，实现高可用和高性能。HTTP 方式也最容易与现有的 Web 基础设施集成，比如使用 Nginx 反向代理、CDN 缓存、API 网关等。

HTTP 服务器同样支持本地或远程部署，可以服务于多个客户端。由于 HTTP 是无状态的，它特别适合构建 RESTful API 风格的 MCP 服务。企业级部署时，通常会在 HTTP 层添加认证机制（如 OAuth 2.1、JWT），确保只有授权用户才能访问 MCP 工具。

HTTP 方式适用于：需要水平扩展的微服务架构、需要与现有 Web 服务集成的场景、需要 RESTful API 风格的工具服务、企业级生产环境部署等。它的配置相对复杂，需要处理 URL、认证头部、错误重试等问题。

---

##### 稳定性与可靠性对比

**STDIO：最稳定，最不容易出问题**
- **稳定性**：⭐⭐⭐⭐⭐ 极高。因为所有通信都在本机内存中进行，不依赖网络，不存在网络抖动、丢包、超时等问题
- **故障点**：几乎没有。唯一的故障点是进程崩溃，但这种情况很少见
- **常见问题**：命令配置错误（路径不对、参数错误）、权限不足（无法执行命令）
- **排查难度**：低。错误日志通常很直观，直接在终端就能看到

**SSE：中等稳定性，长连接可能断开**
- **稳定性**：⭐⭐⭐ 中等。依赖网络连接，长连接可能因网络波动、防火墙超时、代理服务器中断而断开
- **故障点**：网络不稳定、服务器重启、Nginx/代理超时配置、CORS 配置错误
- **常见问题**：连接突然断开、收不到推送、跨域错误、心跳机制配置不当
- **排查难度**：中等。需要检查网络状态、服务器日志、浏览器/客户端控制台

**HTTP：高稳定性，但依赖基础设施**
- **稳定性**：⭐⭐⭐⭐ 高。无状态设计让服务更健壮，单点故障可以通过负载均衡解决
- **故障点**：网络问题、服务器过载、认证失败、DNS 解析失败、证书过期
- **常见问题**：请求超时、503 服务不可用、401/403 认证错误、重试风暴
- **排查难度**：中等。需要监控 HTTP 状态码、响应时间、错误率等指标

**总结**：
- **追求极致稳定**：选 STDIO（本地场景）
- **需要推送能力但能接受偶尔重连**：选 SSE
- **需要高可用和容错能力**：选 HTTP（配合负载均衡）

---

##### 资源消耗对比

| 资源类型 | STDIO | SSE | HTTP |
|---------|-------|-----|------|
| **内存占用** | 低（单进程） | 中（维护连接状态） | 低（无状态，请求完即释放） |
| **CPU 消耗** | 低 | 中（维护长连接、心跳检测） | 低-中（看请求频率） |
| **网络带宽** | 无（不走网络） | 中（保持连接有开销） | 按需使用 |
| **连接资源** | 1 个进程 | 每个客户端 1 个长连接 | 短暂连接，用完即放 |
| **扩展成本** | 无法水平扩展 | 中等（需要会话同步） | 低（无状态，随意扩容） |

**详细说明：**

**STDIO 资源消耗**：
- 内存：只占用一个进程的内存，通常几十到几百 MB
- CPU：只在处理请求时使用 CPU，空闲时几乎不消耗
- 网络：零网络开销，数据通过内存管道传输
- 适合：资源受限的本地环境、笔记本电脑、边缘设备

**SSE 资源消耗**：
- 内存：需要为每个客户端维护连接状态，内存占用随客户端数量线性增长
- CPU：需要定期发送心跳包保持连接，有一定 CPU 开销
- 网络：保持长连接需要持续占用网络资源，防火墙/代理可能限制连接数
- 适合：客户端数量可控的场景（几十到几百个连接）

**HTTP 资源消耗**：
- 内存：无状态设计，每个请求处理完即释放资源，内存占用稳定
- CPU：只在处理请求时使用，空闲时资源完全释放
- 网络：按需使用，没有空闲连接的开销
- 适合：高并发场景、云原生部署、Serverless 架构

---

##### 选择建议：什么情况用什么？

**无脑选择 STDIO 的场景（推荐优先尝试）：**
- 工具只访问本地资源（文件、数据库、系统命令）
- 个人使用，不需要分享给他人
- 快速验证想法、原型开发
- 对安全性要求极高（金融、医疗等敏感数据）
- 网络环境不稳定或没有网络

**选择 SSE 的场景：**
- 需要服务器主动推送数据（实时日志、进度通知、监控告警）
- 多个用户需要共享同一个服务（小团队协作）
- 需要远程访问，但客户端数量不多（< 100）
- 需要双向通信，但不想用复杂的 WebSocket

**选择 HTTP 的场景：**
- 企业级部署，需要高可用和容错
- 客户端数量大（几百到几千）
- 需要与现有微服务架构集成
- 需要 RESTful API 风格，方便调试和测试
- 需要缓存、CDN、API 网关等基础设施支持
- 需要 Serverless 部署（如 AWS Lambda、Vercel）

**决策流程图：**

```
开始
  │
  ├─ 是否只需要访问本地资源？
  │   ├─ 是 → 使用 STDIO ✅
  │   └─ 否 → 继续
  │
  ├─ 是否需要服务器主动推送数据？
  │   ├─ 是 → 使用 SSE ✅
  │   └─ 否 → 继续
  │
  ├─ 是否需要高并发/高可用？
  │   ├─ 是 → 使用 HTTP ✅
  │   └─ 否 → 继续
  │
  └─ 默认推荐：STDIO（最简单）✅
```

---

#### 3. 配置方式对比

**STDIO 配置（Claude Desktop）：**
```json
{
  "mcpServers": {
    "my-local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

**SSE 配置（Claude Desktop）：**
```json
{
  "mcpServers": {
    "my-sse-server": {
      "url": "http://localhost:3000/sse",
      "transport": "sse"
    }
  }
}
```

**HTTP 配置（Claude Desktop）：**
```json
{
  "mcpServers": {
    "my-http-server": {
      "url": "http://localhost:3000/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### 3. 配置方式对比

**STDIO 配置（Claude Desktop）：**
```json
{
  "mcpServers": {
    "my-local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

**SSE 配置（Claude Desktop）：**
```json
{
  "mcpServers": {
    "my-sse-server": {
      "url": "http://localhost:3000/sse",
      "transport": "sse"
    }
  }
}
```

**HTTP 配置（Claude Desktop）：**
```json
{
  "mcpServers": {
    "my-http-server": {
      "url": "http://localhost:3000/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

---

### 利用大模型生成不同类型 MCP 服务器

你可以根据需要的传输方式，使用特定的 Prompt 让 AI 生成对应类型的 MCP 服务器。

#### Prompt 模板 1：生成 STDIO 类型 MCP 服务器

```
# 角色
你是一个 MCP 服务器开发专家，精通 STDIO 传输方式。

# 任务
请帮我创建一个 STDIO 类型的 MCP 服务器，功能是：[描述你的功能需求]

# 传输方式要求
- 使用 STDIO（标准输入/输出）传输
- 客户端通过 command + args 启动服务器为子进程
- 消息通过 process.stdin/process.stdout 传输

# 技术要求
1. 使用 TypeScript + @modelcontextprotocol/sdk
2. 使用 StdioServerTransport
3. 服务器作为独立可执行文件运行
4. 支持通过 npx 直接运行
5. 包含完整的 package.json，配置 bin 入口

# 必须包含的文件
--- package.json ---
（包含 "bin": { "my-server": "./dist/index.js" }）

--- src/index.ts ---
（使用 StdioServerTransport 创建服务器）

--- tsconfig.json ---
--- README.md ---
（包含 Claude Desktop 配置示例，使用 command + args 方式）
```

#### Prompt 模板 2：生成 SSE 类型 MCP 服务器

```
# 角色
你是一个 MCP 服务器开发专家，精通 SSE 传输方式。

# 任务
请帮我创建一个 SSE 类型的 MCP 服务器，功能是：[描述你的功能需求]

# 传输方式要求
- 使用 SSE（Server-Sent Events）传输
- 服务器作为独立 HTTP 服务运行
- 客户端通过 /sse 端点建立长连接接收消息
- 客户端通过 POST 请求发送消息到 /message 端点
- 支持多客户端并发连接

# 技术要求
1. 使用 TypeScript + @modelcontextprotocol/sdk
2. 使用 SSEServerTransport
3. 基于 Express 或原生 HTTP 服务器
4. 实现 /sse 和 /message 两个路由
5. 支持 CORS 配置

# 必须包含的文件
--- package.json ---
--- src/index.ts ---
（创建 HTTP 服务器，实现 /sse 和 /message 路由）

--- tsconfig.json ---
--- README.md ---
（包含 Claude Desktop 配置示例，使用 url + transport: "sse"）
```

#### Prompt 模板 3：生成 HTTP 类型 MCP 服务器

```
# 角色
你是一个 MCP 服务器开发专家，精通 HTTP 传输方式。

# 任务
请帮我创建一个 HTTP 类型的 MCP 服务器，功能是：[描述你的功能需求]

# 传输方式要求
- 使用 Streamable HTTP 传输
- 服务器作为独立 HTTP 服务运行
- 支持流式响应（streamable）
- 支持身份验证（Bearer Token 或 API Key）
- 支持无状态请求处理

# 技术要求
1. 使用 TypeScript + @modelcontextprotocol/sdk
2. 使用 StreamableHTTPServerTransport
3. 基于 Express 或 Fastify
4. 实现 /mcp 端点处理所有请求
5. 添加认证中间件
6. 支持流式响应

# 必须包含的文件
--- package.json ---
--- src/index.ts ---
（创建 HTTP 服务器，实现 /mcp 端点，支持认证和流式响应）

--- tsconfig.json ---
--- README.md ---
（包含 Claude Desktop 配置示例，使用 url + transport: "http" + headers）
```

#### Prompt 模板 4：生成支持多种传输方式的 MCP 服务器

```
# 角色
你是一个 MCP 服务器开发专家。

# 任务
请帮我创建一个支持多种传输方式的 MCP 服务器，功能是：[描述你的功能需求]

# 传输方式要求
- 同时支持 STDIO、SSE、HTTP 三种传输方式
- 通过环境变量或命令行参数选择传输方式
- 共享相同的业务逻辑代码

# 技术要求
1. 使用 TypeScript + @modelcontextprotocol/sdk
2. 根据启动参数动态选择 Transport
3. 核心逻辑封装为独立模块
4. 支持通过 --transport 参数切换

# 启动方式示例
- STDIO: node dist/index.js --transport stdio
- SSE: node dist/index.js --transport sse --port 3000
- HTTP: node dist/index.js --transport http --port 3000

# 必须包含的文件
--- package.json ---
--- src/index.ts ---
（根据参数选择 Transport）
--- src/server.ts ---
（核心业务逻辑，与传输方式无关）
--- tsconfig.json ---
--- README.md ---
（包含三种传输方式的配置示例）
```

---

### 实战示例：浏览器自动化 MCP 服务器

下面以**浏览器自动化**为例，展示三种传输方式的完整实现。

#### 场景说明
创建一个 MCP 服务器，让 Claude 能够控制浏览器进行自动化操作：
- 打开网页
- 截取屏幕截图
- 点击元素
- 填写表单
- 获取页面内容

#### 选项 1：STDIO 方式（本地浏览器控制）

**适用场景：** 在本地机器上控制本地安装的 Chrome/Edge 浏览器

**Claude Desktop 配置：**
```json
{
  "mcpServers": {
    "browser-stdio": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

**使用 Prompt 生成 STDIO 版本：**

```
# 角色
你是一个 MCP 服务器开发专家。

# 任务
创建一个基于 Puppeteer 的浏览器自动化 MCP 服务器，使用 STDIO 传输。

# 功能要求
1. navigate(url): 导航到指定 URL
2. screenshot(): 截取当前页面截图（返回 base64）
3. click(selector): 点击指定元素
4. type(selector, text): 在输入框中输入文本
5. get_content(): 获取页面文本内容
6. evaluate(script): 执行 JavaScript 代码

# 技术要求
1. 使用 TypeScript + @modelcontextprotocol/sdk
2. 使用 StdioServerTransport
3. 使用 puppeteer 控制浏览器
4. 浏览器以 headless 模式启动
5. 每个工具调用后保持页面状态
6. 支持错误处理（如元素不存在、导航失败）

# 输出格式
请提供完整的 package.json、tsconfig.json 和 src/index.ts
```

#### 选项 2：SSE 方式（远程浏览器控制）

**适用场景：** 浏览器运行在远程服务器，Claude 通过 SSE 长连接实时接收浏览器事件

**Claude Desktop 配置：**
```json
{
  "mcpServers": {
    "browser-sse": {
      "url": "http://localhost:3000/sse",
      "transport": "sse"
    }
  }
}
```

**使用 Prompt 生成 SSE 版本：**

```
# 角色
你是一个 MCP 服务器开发专家。

# 任务
创建一个基于 Playwright 的浏览器自动化 MCP 服务器，使用 SSE 传输。

# 功能要求
1. navigate(url): 导航到指定 URL
2. screenshot(): 截取当前页面截图
3. click(selector): 点击指定元素
4. type(selector, text): 在输入框中输入文本
5. get_content(): 获取页面文本内容
6. wait_for_selector(selector): 等待元素出现
7. on_page_event(): 监听页面事件（console, request, response）

# 传输方式要求
- 使用 SSE 传输
- 服务器运行在 http://localhost:3000
- /sse 端点用于建立 SSE 连接
- /message 端点用于接收客户端消息
- 支持多浏览器实例管理（每个客户端独立浏览器）

# 技术要求
1. 使用 TypeScript + @modelcontextprotocol/sdk
2. 使用 SSEServerTransport
3. 使用 playwright 控制浏览器
4. 基于 Express 创建 HTTP 服务器
5. 实现会话管理（每个 SSE 连接对应一个浏览器上下文）
6. 支持 CORS

# 输出格式
请提供完整的项目文件和 README.md
```

#### 选项 3：HTTP 方式（RESTful 浏览器服务）

**适用场景：** 将浏览器自动化作为微服务部署，支持水平扩展和负载均衡

**Claude Desktop 配置：**
```json
{
  "mcpServers": {
    "browser-http": {
      "url": "http://browser-service.company.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-api-token"
      }
    }
  }
}
```

**使用 Prompt 生成 HTTP 版本：**

```
# 角色
你是一个 MCP 服务器开发专家。

# 任务
创建一个基于 Playwright 的浏览器自动化 MCP 服务器，使用 HTTP 传输。

# 功能要求
1. navigate(url): 导航到指定 URL
2. screenshot(): 截取当前页面截图
3. click(selector): 点击指定元素
4. type(selector, text): 在输入框中输入文本
5. get_content(): 获取页面文本内容
6. create_session(): 创建新的浏览器会话
7. close_session(sessionId): 关闭指定会话

# 传输方式要求
- 使用 Streamable HTTP 传输
- 服务器运行在 http://localhost:3000
- /mcp 端点处理所有 MCP 请求
- 支持 Bearer Token 认证
- 支持流式响应（大页面内容分块返回）
- 支持会话持久化（通过 sessionId）

# 技术要求
1. 使用 TypeScript + @modelcontextprotocol/sdk
2. 使用 StreamableHTTPServerTransport
3. 使用 playwright 控制浏览器
4. 基于 Express 创建 HTTP 服务器
5. 实现 JWT 认证中间件
6. 实现会话池管理
7. 支持流式响应

# 输出格式
请提供完整的项目文件、Dockerfile 和部署说明
```

---

### 浏览器 MCP 使用示例

配置好浏览器 MCP 后，你可以在 Claude 中进行以下操作：

#### 示例 1：网页截图分析
```
用户：帮我打开 https://example.com 并截图，然后分析一下这个网页的设计

Claude：
1. 调用 browser_navigate 导航到网页
2. 调用 browser_screenshot 截取屏幕
3. 分析截图中的布局、配色、字体等设计元素
```

#### 示例 2：自动化表单填写
```
用户：帮我登录 GitHub，用户名是 xxx，密码是 yyy

Claude：
1. 调用 browser_navigate 打开 https://github.com/login
2. 调用 browser_type 在 #login_field 输入用户名
3. 调用 browser_type 在 #password 输入密码
4. 调用 browser_click 点击登录按钮
5. 调用 browser_screenshot 确认登录成功
```

#### 示例 3：数据抓取
```
用户：帮我抓取 https://news.ycombinator.com 上的前 10 条新闻标题

Claude：
1. 调用 browser_navigate 打开 Hacker News
2. 调用 browser_get_content 获取页面内容
3. 解析并返回前 10 条新闻标题和链接
```

#### 示例 4：网页测试
```
用户：帮我测试一下我们的登录页面是否能正常工作

Claude：
1. 调用 browser_navigate 打开登录页
2. 调用 browser_type 输入测试账号
3. 调用 browser_click 点击登录
4. 调用 browser_wait_for_selector 等待登录后的元素
5. 调用 browser_screenshot 记录结果
6. 返回测试报告
```

### 工作流程

```
1. 用户输入提示
   │
2. MCP Client 发送（用户提示 + 系统提示 + 可用工具/资源）→ LLM
   │
3. 模型分析提示，决定调用哪个工具
   │
4. 模型返回 API 调用及参数 → MCP Client
   │
5. MCP Client 发送请求 → MCP Server
   │
6. 工具执行并返回结果
   │
7. MCP Server 返回结果 → MCP Client
   │
8. MCP Client 返回最终结果 → 用户
```

## MCP 使用方式

### Claude Desktop 配置

Claude Desktop 是最常用的 MCP 客户端之一。

#### 配置文件位置

| 操作系统 | 配置文件路径 |
|---------|-------------|
| **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |
| **Linux** | `~/.claude/mcp-config.json` |

#### 基本配置格式

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

### Claude Code 配置

Claude Code（CLI 工具）也支持 MCP，配置更加灵活。

#### 用户级（全局）配置

```bash
claude mcp add-json --scope user '{
  "mcpServers": {
    "server-name": {
      "url": "http://127.0.0.1:8888/mcp",
      "transport": "http"
    }
  }
}'
```

#### 项目级（本地）配置

```bash
claude mcp add-json --scope local '{
  "mcpServers": {
    "server-name": {
      "url": "http://127.0.0.1:8888/mcp",
      "transport": "http"
    }
  }
}'
```

#### 添加远程 HTTP 服务器

```bash
claude mcp add --transport http https://mcp.notion.com/mcp
```

#### 验证命令

| 命令 | 功能 |
|-----|------|
| `/mcp` | 列出所有已连接的服务器 |
| `/doctor` | 检查 MCP 连接错误 |
| `claude mcp list` | 列出所有配置的 MCP 服务器 |
| `claude mcp get <name>` | 获取特定服务器详情 |
| `claude mcp remove <name>` | 移除服务器 |

#### 配置文件位置

| 级别 | 配置文件位置 |
|-----|-------------|
| **用户级** | `~/.claude.json`（全局，所有项目） |
| **项目级** | `.claude/mcp.json`（项目特定） |

## 推荐的 MCP 服务器

### 官方服务器

Anthropic 提供了 15 个官方参考服务器：

| 服务器 | 功能 | 安装命令 |
|-------|------|---------|
| **@modelcontextprotocol/server-filesystem** | 文件系统访问 | `npx -y @modelcontextprotocol/server-filesystem /path` |
| **@modelcontextprotocol/server-sqlite** | SQLite 数据库 | `npx -y @modelcontextprotocol/server-sqlite` |
| **@modelcontextprotocol/server-postgres** | PostgreSQL 数据库 | `npx -y @modelcontextprotocol/server-postgres` |
| **@modelcontextprotocol/server-github** | GitHub 集成 | `npx -y @modelcontextprotocol/server-github` |
| **@modelcontextprotocol/server-git** | Git 操作 | `npx -y @modelcontextprotocol/server-git` |
| **@modelcontextprotocol/server-brave-search** | Brave 搜索 | `npx -y @modelcontextprotocol/server-brave-search` |
| **@modelcontextprotocol/server-fetch** | 网页抓取 | `npx -y @modelcontextprotocol/server-fetch` |
| **@modelcontextprotocol/server-puppeteer** | 浏览器自动化 | `npx -y @modelcontextprotocol/server-puppeteer` |

### 社区热门服务器

根据 GitHub 星标数，以下是最受欢迎的社区 MCP 服务器：

| 服务器 | Stars | 功能描述 |
|-------|-------|---------|
| **MarkItDown** (Microsoft) | 84,703⭐ | 将 PDF、Word、Excel、图片、音频转换为 Markdown |
| **Netdata** | 77,164⭐ | 实时基础设施监控 |
| **Context7** (Upstash) | 40,332⭐ | 最新代码库文档和示例 |
| **GitHub** (Official) | 25,487⭐ | GitHub 仓库管理、Issues、PR 工作流 |
| **Playwright** (Microsoft) | 24,855⭐ | 浏览器自动化和 Web 测试 |
| **ChromeDevTools** | 18,136⭐ | Chrome DevTools 协议集成 |
| **Serena** (Oraios) | 17,796⭐ | 语义代码搜索和编辑 |
| **Firecrawl** | 5,137⭐ | 网页抓取转为结构化数据 |
| **Unity** | 4,453⭐ | 通过本地桥接控制 Unity 编辑器 |
| **Notion** (Official) | 3,632⭐ | 官方 Notion API 接口 |

### MCP 服务器资源网站

| 网站 | URL | 描述 |
|-----|-----|------|
| **Awesome MCP Servers** | [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | GitHub 上最全面的列表，3,000+ 服务器 |
| **Official MCP Registry** | https://registry.modelcontextprotocol.io | Anthropic 官方「应用商店」 |
| **MCP.so** | https://mcp.so | 社区 MCP 服务器中心 |
| **Glama.ai** | https://glama.ai/mcp/servers | 分类良好的 MCP 目录 |
| **Smithery** | https://smithery.ai | MCP 服务器市场 |

## MCP 地点服务

地点和地图服务是 MCP 的重要应用场景之一。以下是目前主流的地点类 MCP 服务器：

### 高德地图 MCP Server

高德地图是中文环境下最推荐的地图服务 MCP 服务器。

**功能特性（12+ 核心服务）：**

| 功能 | 说明 |
|-----|------|
| **地理编码** | 地址 → 坐标转换 |
| **逆地理编码** | 坐标 → 详细地址 |
| **POI 搜索** | 关键词搜索、周边搜索、多边形区域搜索 |
| **路线规划** | 驾车、步行、骑行、公交路线 |
| **坐标转换** | 支持 GPS、百度、图吧坐标系 |
| **距离测量** | 精确距离计算 |
| **IP 定位** | 通过 IP 地址获取位置 |
| **天气查询** | 实时天气和预报数据 |

**配置方式：**

```json
{
  "mcpServers": {
    "amap": {
      "command": "npx",
      "args": ["-y", "mcp-amap"],
      "env": {
        "AMAP_API_KEY": "your-amap-api-key"
      }
    }
  }
}
```

**获取 API Key：** 访问 [高德开放平台](https://lbs.amap.com/) 注册并创建应用。

### 腾讯位置服务 MCP

**功能特性：**

- 地理编码和逆地理编码
- IP 定位
- 天气查询
- 路线规划（驾车、步行、骑行、公交）
- 距离测量
- 关键词搜索和周边搜索

**优势：**
- 无需本地部署
- 自动更新
- 针对 LLM 理解优化的语义 JSON 转换
- 支持 SSE 协议

### Google Maps MCP Server

**NPM 包：** `@cablate/mcp-google-map`

**功能特性：**

| 功能 | 说明 |
|-----|------|
| **地点搜索** | 根据关键词或类型搜索地点 |
| **地理编码** | 地址 → 坐标 |
| **逆地理编码** | 坐标 → 地址 |
| **路线规划** | 驾车、步行、骑行、公交路线 |
| **周边搜索** | 搜索指定位置附近的地点 |
| **地点详情** | 获取地点的详细信息 |

**配置示例：**

```json
{
  "mcpServers": {
    "google-map": {
      "command": "npx",
      "args": ["-y", "@cablate/mcp-google-map"],
      "env": {
        "GOOGLE_MAPS_API_KEY": "your-google-maps-api-key"
      }
    }
  }
}
```

**获取 API Key：** 访问 [Google Cloud Console](https://console.cloud.google.com/) 启用 Maps JavaScript API。

### OpenStreetMap MCP Server

OpenStreetMap 是开源的地图服务，使用 Nominatim API 进行地点查询。

**Python 实现示例（使用 FastMCP）：**

```python
from fastmcp import FastMCP
import requests

mcp = FastMCP("osm-mcp-server")

@mcp.tool()
def search_location(query: str) -> str:
    """搜索地点并返回坐标和地址信息

    Args:
        query: 地点名称或地址
    """
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": query,
        "format": "json",
        "addressdetails": 1
    }
    response = requests.get(url, params=params)
    return response.json()

@mcp.tool()
def reverse_geocode(lat: float, lon: float) -> str:
    """根据坐标获取详细地址

    Args:
        lat: 纬度
        lon: 经度
    """
    url = "https://nominatim.openstreetmap.org/reverse"
    params = {
        "lat": lat,
        "lon": lon,
        "format": "json"
    }
    response = requests.get(url, params=params)
    return response.json()
```

**优势：**
- 完全免费
- 无需 API Key
- 开源数据

### 天气 MCP Server

天气服务通常与地点服务配合使用。

#### 彩云天气 MCP Server

**GitHub：** [caiyunapp/mcp-caiyun-weather](https://github.com/caiyunapp/mcp-caiyun-weather)

**提供工具：**

| 工具 | 功能 |
|-----|------|
| `get_realtime_weather` | 获取实时天气 |
| `get_hourly_forecast` | 获取 72 小时预报 |
| `get_weekly_forecast` | 获取 7 天预报 |
| `get_historical_weather` | 获取 24 小时历史数据 |
| `get_weather_alerts` | 获取天气预警 |

#### OpenWeatherMap MCP Server

**GitHub：** [CodeByWaqas/weather-mcp-server](https://github.com/CodeByWaqas/weather-mcp-server)

**功能特性：**
- 实时天气数据
- 温度、湿度、风速
- 日出日落时间
- 天气描述

**安装命令：**
```bash
npx -y @smithery/cli install @CodeByWaqas/weather-mcp-server --client claude
```

### 实际应用示例

#### 示例 1：旅行规划助手

结合高德地图和彩云天气，可以创建一个智能旅行规划助手：

```
用户：帮我规划从北京到上海的行程，想知道沿途天气情况

Claude：
1. 调用 maps_text_search 搜索北京到上海的路线
2. 调用 maps_weather 获取沿途城市天气
3. 返回带天气信息的旅行建议
```

#### 示例 2：周边服务查找

```
用户：帮我找附近的咖啡店

Claude：
1. 调用 maps_ip_location 获取当前位置
2. 调用 maps_around_search 搜索周边咖啡店
3. 返回按距离排序的咖啡店列表
```

#### 示例 3：坐标地址转换

```
用户：这个坐标 39.9087,116.3975 在哪里？

Claude：
1. 调用 maps_regeocode 进行逆地理编码
2. 返回：北京市东城区长安街（天安门广场附近）
```

## 用 AI 生成 MCP 服务

你不需要从头编写 MCP 服务器——让 AI 帮你完成！以下是经过验证的提示词模板。

### 方式一：让 Claude 生成完整 MCP 服务器

```
# 角色
你是一个 MCP 服务器开发专家。

# 任务
请帮我创建一个 MCP 服务器，功能是：[描述你的功能需求]

# 要求
1. 使用 TypeScript/Python（二选一）
2. 基于 @modelcontextprotocol SDK 或 FastMCP
3. 包含完整的 package.json 和安装说明
4. 实现错误处理和日志输出
5. 添加详细的 JSDoc/docstring 注释
6. 提供 Claude Desktop 配置示例

# 输出格式
请直接输出完整的代码文件内容，每个文件用 --- 文件名 --- 分隔。
```

### 示例：生成天气 MCP 服务器

```
# 角色
你是一个 MCP 服务器开发专家。

# 任务
请帮我创建一个天气查询 MCP 服务器。

# 功能要求
1. 提供获取实时天气的工具（get_weather）
2. 支持城市名称查询
3. 使用免费的 wttr.in API（无需 API key）
4. 返回温度、天气状况、湿度等信息

# 技术要求
1. 使用 Python + FastMCP
2. 包含完整的 setup.py 和 requirements.txt
3. 实现错误处理（城市不存在时给出友好提示）
4. 添加使用说明

# 输出格式
请按以下格式输出：

--- main.py ---
[代码内容]

--- requirements.txt ---
[内容]

--- README.md ---
[使用说明]

--- claude-config.json ---
[Claude Desktop 配置示例]
```

### 方式二：让 Cursor/Windsurf AI 生成项目

在使用 Cursor 或 Windsurf 等 AI IDE 时，可以使用这个提示词：

```
创建一个完整的 MCP 服务器项目，功能是 [你的需求]。

项目要求：
1. 语言：TypeScript
2. 包含完整的 tsconfig.json 和 package.json
3. 使用 @modelcontextprotocol/sdk
4. 实现至少 2 个工具
5. 添加单元测试
6. 包含 README.md 和使用示例
7. 支持 npx 直接运行

请创建完整的项目结构。
```

### 示例：生成笔记 MCP 服务器

```
创建一个完整的 MCP 服务器项目，功能是管理本地 Markdown 笔记。

项目要求：
1. 语言：TypeScript
2. 包含完整的 tsconfig.json 和 package.json
3. 使用 @modelcontextprotocol/sdk

工具要求：
1. list_notes(): 列出指定目录下的所有笔记
2. read_note(path): 读取笔记内容
3. create_note(title, content): 创建新笔记
4. search_notes(keyword): 搜索包含关键词的笔记
5. delete_note(path): 删除笔记

额外要求：
1. 笔记存储在 ~/notes 目录
2. 每个笔记是独立的 .md 文件
3. 文件名使用日期-标题格式（如 2025-02-28-my-note.md）
4. 添加单元测试
5. 包含 README.md 和 Claude Desktop 配置示例

请创建完整的项目结构。
```

### 方式三：增量开发提示词

如果你已经有基础代码，想让 AI 帮你完善：

```
# 当前代码
[粘贴你现有的 MCP 服务器代码]

# 需要添加的功能
1. [具体功能1]
2. [具体功能2]

# 要求
1. 保持现有代码结构
2. 只输出修改/新增的部分
3. 标注修改的位置
```

### 调试提示词

当 MCP 服务器出现问题时：

```
我的 MCP 服务器有问题，请帮我诊断：

# 问题现象
[描述具体问题，如：工具无法调用、报错等]

# 配置
[粘贴 claude_desktop_config.json 中的服务器配置]

# 错误日志
[粘贴 Claude Desktop 的错误日志或服务器输出]

# 服务器代码
[粘贴相关代码片段]

请分析可能的原因并给出解决方案。
```

### AI 生成后的验证清单

生成代码后，让 AI 帮你验证：

```
请检查这个 MCP 服务器：

# 验证清单
1. [ ] 是否正确实现了 MCP 协议？
2. [ ] 工具的 inputSchema 是否符合 JSON Schema 规范？
3. [ ] 错误处理是否完善？
4. [ ] 是否有安全风险（如路径遍历、命令注入）？
5. [ ] 配置示例是否正确？
6. [ ] README 是否包含完整的使用说明？

如果发现问题，请指出并给出修复建议。
```

## 开发自定义 MCP 服务器

### TypeScript 实现

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// 创建服务器实例
const server = new Server(
  {
    name: "my-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 注册工具列表
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "my_tool",
        description: "我的自定义工具",
        inputSchema: {
          type: "object",
          properties: {
            param: {
              type: "string",
              description: "参数描述",
            },
          },
          required: ["param"],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "my_tool") {
    return {
      content: [
        {
          type: "text",
          text: `执行结果：${args.param}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("My MCP Server running on stdio");
}

main().catch(console.error);
```

### Python 实现（使用 FastMCP）

```python
from mcp.server.fastmcp import FastMCP

# 创建 MCP 服务器
mcp = FastMCP("my-mcp-server")

@mcp.tool()
def calculate(expression: str) -> str:
    """计算数学表达式

    Args:
        expression: 数学表达式，如 "2 + 2"
    """
    try:
        result = eval(expression)
        return f"结果: {result}"
    except Exception as e:
        return f"错误: {str(e)}"

@mcp.resource("data://config")
def get_config() -> str:
    """获取配置信息"""
    return '{"setting": "value"}'

# 启动服务器
if __name__ == "__main__":
    mcp.run()
```

## MCP 最佳实践

### 安全建议

1. **最小权限原则**：只授予 MCP 服务器必要的权限
2. **沙箱隔离**：使用容器或虚拟环境运行不可信的服务器
3. **认证授权**：HTTP 传输使用 OAuth 2.1 或类似机制
4. **数据验证**：验证所有输入参数，防止注入攻击
5. **审计日志**：记录所有工具调用和资源访问

### 开发建议

1. **渐进式实现**：先实现核心功能，再逐步添加高级特性
2. **错误处理**：提供清晰的错误消息和恢复建议
3. **文档完善**：为每个工具提供详细描述和示例
4. **性能优化**：缓存频繁访问的资源，减少延迟
5. **兼容性测试**：在不同客户端上测试服务器兼容性

### 生产环境建议

1. **容器化部署**：使用 Docker 打包 MCP 服务器
2. **健康检查**：实现健康检查端点
3. **监控告警**：监控服务器性能和错误率
4. **优雅降级**：服务不可用时提供友好降级方案
5. **特性开关**：使用特性开关控制新功能发布

## MCP 生态现状

根据 2025 年的数据统计：

| 指标 | 数量 |
|-----|------|
| MCP 服务器总数 | ~14,000 |
| MCP 客户端 | ~300 |
| 官方参考服务器 | 15 |
| GitHub 社区服务器 | 200+ |
| 企业级服务器 | 50+ |
| 实验性项目 | 235+ |

**主要支持的 AI 平台：**
- Claude Desktop / Claude Code
- Cursor IDE
- Cherry Studio
- ModelScope (通义千问)
- Gemini CLI
- Windsurf

## MCP 服务器资源 - 去哪里找更多 MCP 服务器？

### 官方资源

- [Official MCP Registry](https://registry.modelcontextprotocol.io) - Anthropic 官方「应用商店」
- [MCP 官方文档](https://modelcontextprotocol.io) - 官方文档和规范
- [MCP 官方 GitHub](https://github.com/modelcontextprotocol) - 官方服务器和 SDK

### MCP 市场与目录

- [MCPmarket.cn](https://mcpmarket.cn) - 中文 MCP 市场
- [MCP.so](https://mcp.so) - 社区 MCP 中心
- [MCPServers](https://www.mcpservers.cn) - 中文 MCP 社区
- [MCP.ad](https://mcp.ad) - 国际聚合平台
- [MCPFlow](https://mcpflow.io/home) - 中文社区平台
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - GitHub 最全面列表
- [Glama.ai MCP](https://glama.ai/mcp/servers) - 带评分评论的 MCP 目录
- [Smithery](https://smithery.ai) - MCP 服务器市场
- [MCPHub](https://mcphub.io/registry) - 界面简洁的目录
- [MCPHunt](https://www.mcphunt.com/zh) - 「MCP 版 Product Hunt」
- [PulseMCP](https://www.pulsemcp.com/servers) - 实时更新的 MCP 目录
- [LobeHub MCP](https://lobehub.com/zh/mcp) - 中文 MCP 目录

### IDE 专属市场

- [Cursor Directory MCP](https://cursor.directory/mcp) - Cursor 优化
- [Cline MCP Marketplace](https://cline.bot/mcp-marketplace) - VSCode 集成

### 国内大厂平台

- [ModelScope MCP 广场](https://www.modelscope.cn/mcp) - 阿里魔搭社区
- [百度 MCP 平台](https://sai.baidu.com/ai/mcp) - 百度千帆
- [阿里云百练 MCP](https://bailian.console.aliyun.com) - 阿里云

## 参考资源

### 官方文档
- [Model Context Protocol 官方网站](https://modelcontextprotocol.io/)
- [MCP 规范文档](https://modelcontextprotocol.io/specification/)
- [Claude Code MCP 官方文档](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [MCP GitHub 仓库](https://github.com/modelcontextprotocol)

### 教程文章
- [一文讲透 MCP 的原理及实践](https://view.inews.qq.com/a/20250414A023WV00)
- [MCP（Model Context Protocol）架构与工作原理](https://m.toutiao.com/w/1826385835060307/)
- [2025 最全 MCP 图像生成指南](https://juejin.cn/post/7576838552472043563)
- [Claude MCP 完全策略：AI 应用的无限可能](https://juejin.cn/post/7576838552472043563)
- [2025 大模型最新教程：MCP 协议从入门到精通](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [从零开始学 MCP（八）- 构建一个 MCP server](https://juejin.cn/post/7582510291667419187)

### 配置指南
- [Claude Code MCP 配置完全指南](https://juejin.cn/post/7576838552472043563)（2025 年 8 月最新）
- [最新 Claude Code 超详细完全指南](https://m.blog.csdn.net/)
- [Claude Code 最佳实践](https://www.anthropic.com/engineering/claude-code-best-practices)

### 开发教程
- [零基础构建 MCP 服务器 TypeScript/Python 双语言实战指南](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [终极 MCP 服务器构建指南：TypeScript 与 Python 双版本完整教程](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [使用 TypeScript 构建一个最简单的 MCP 服务器](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [使用 Azure 容器应用生成 TypeScript MCP 服务器](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### 地图和天气服务
- [高德地图 MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [腾讯位置服务 MCP 文档](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [彩云天气 MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)
- [Valhalla MCP Server（OpenStreetMap 路由）](https://lobehub.com/mcp/aatakansalar-valhalla-mcp)

### 社区资源
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - 最全面的 MCP 服务器列表
- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - 生产级 Claude Code 配置集合
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - Claude Code 中文学习路径

### 实际应用案例
- [BlenderMCP - AI 驱动的 3D 建模](https://github.com/Belthur/blender-mcp) - 4,100+ ⭐
- [MCP 生产环境 15 条最佳实践](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
