# AI Agent 协议（MCP & A2A）

::: tip 核心问题
**AI Agent 如何与外部世界"对话"？** 就像互联网需要 HTTP 协议，AI Agent 也需要标准化的通信协议。本章介绍两个最主流的 Agent 协议：MCP 和 A2A，它们分别解决了 AI 与工具、Agent 与 Agent 之间的通信问题。
:::

---

## 0. 什么是协议？

在计算机领域，**协议（Protocol）** 是一套标准化的规则和约定，让不同的系统、程序能够相互"理解"和"通信"。

### 0.1 为什么需要协议？

想象一个场景：你给朋友寄快递，需要填写地址。如果每个人写的地址格式都不一样，快递员就没法投递。协议就是规定了"地址怎么写"的标准——省、市、区、街道、门牌号，按这个格式写，谁都能看懂。

计算机也是一样。两个程序要通信，必须约定好：
- 数据格式是什么？（JSON？二进制？）
- 怎么建立连接？（握手流程）
- 出错了怎么办？（错误处理）

### 0.2 计算机中常见的协议

| 协议 | 作用 | 你每天都在用 |
|------|------|-------------|
| **HTTP** | 网页传输协议 | 浏览器打开网页 |
| **HTTPS** | 加密的 HTTP | 网银、支付页面 |
| **TCP/IP** | 互联网基础协议 | 所有网络通信 |
| **DNS** | 域名解析协议 | 把 `google.com` 变成 IP 地址 |
| **SMTP** | 邮件发送协议 | 发送邮件 |
| **WebSocket** | 双向实时通信 | 聊天软件、在线游戏 |
| **SSH** | 安全远程登录 | 连接服务器 |
| **FTP** | 文件传输协议 | 上传/下载文件 |

这些协议构成了互联网的基石。没有它们，你无法浏览网页、发送邮件、观看视频。

### 0.3 协议的价值

协议的核心价值是**标准化**和**互操作性**：

- **标准化**：大家都按同一套规则办事，减少沟通成本
- **互操作性**：不同厂商、不同技术栈的系统可以无缝对接

比如 HTTP 协议，让 Chrome 浏览器可以访问 Nginx 服务器，让 Python 爬虫可以抓取 Java 网站的数据。不需要 Chrome 和 Nginx 互相"认识"，只要都遵守 HTTP 协议就行。

### 0.4 AI Agent 也需要协议

AI Agent 要真正"干活"，需要：
- 调用外部工具（查天气、发邮件、操作数据库）
- 与其他 Agent 协作（分工合作完成复杂任务）

这就需要标准化的协议来规定"AI 怎么调用工具"、"Agent 之间怎么对话"。这就是 **MCP** 和 **A2A** 的由来。

---

## 1. Agent 协议的层次

在深入了解具体协议之前，让我们先看看 Agent 生态中的通信层次：

| 层级 | 协议 | 解决的问题 | 类比 |
|------|------|-----------|------|
| **1** | Function Call | AI 如何调用本地函数 | 大脑发出指令 |
| **2** | **MCP** | AI 如何连接外部工具和数据源 | USB-C 接口 |
| **3** | **A2A** | Agent 之间如何协作通信 | 企业微信 |

::: tip 逐行解读这张表
**第1层（Function Call）**：这是大模型最基础的能力——通过输出结构化数据（JSON）来触发函数执行。它是"协议"的基础，但本身更像是一种能力而非标准协议。

**第2层（MCP）**：Model Context Protocol，由 Anthropic 于 2024 年 11 月发布。它标准化了 AI 与外部工具、数据源的连接方式，就像 USB-C 统一了各种设备的充电接口。

**第3层（A2A）**：Agent-to-Agent Protocol，由 Google 于 2025 年 4 月发布。它让不同的 Agent 能够相互发现、通信和协作，就像企业微信让同事之间可以发任务、聊天。
:::

本章重点介绍第 2、3 层的两个正式协议：MCP 和 A2A。

---

## 2. MCP (Model Context Protocol)

### 2.1 协议基本信息

| 项目 | 内容 |
|------|------|
| **全称** | Model Context Protocol |
| **发起方** | Anthropic |
| **发布时间** | 2024 年 11 月 25 日 |
| **官方文档** | [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| **开源协议** | MIT License |
| **GitHub** | [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |

::: tip 为什么叫"Context Protocol"？
**Context（上下文）** 是大模型理解任务的关键。MCP 的核心思想是：**让 AI 能够动态获取所需的上下文信息**，而不是把所有信息都塞进 Prompt。

比如，AI 需要读取一个文件时，不需要你把文件内容复制粘贴给它，而是通过 MCP 直接访问文件系统。
:::

### 2.2 发布的背景

2024 年，随着 Claude 3.5 Sonnet 的发布，Anthropic 发现一个问题：**每个工具都要单独集成**。

想象一下：
- 你想让 AI 读取 GitHub 仓库 → 要写 GitHub 集成代码
- 你想让 AI 查询数据库 → 要写数据库集成代码
- 你想让 AI 操作文件系统 → 要写文件系统集成代码

每个集成都要重复写类似的代码：认证、错误处理、数据转换……

Anthropic 在官方博客中写道：
> "We're introducing the Model Context Protocol (MCP), an open protocol that standardizes how applications provide context to LLMs."

**核心目标**：让工具开发者写一次代码，所有支持 MCP 的 AI 应用都能使用。

### 2.3 MCP 是什么？

<McpVisualDemo />

**三大核心能力**：

| 能力 | 英文 | 作用 | 示例 |
|------|------|------|------|
| **工具** | Tools | AI 可以调用的功能 | 查询天气、发送邮件 |
| **资源** | Resources | AI 可以读取的数据 | 文件内容、数据库记录 |
| **提示** | Prompts | 预定义的提示模板 | 代码审查模板、写作模板 |

### 2.4 MCP 的内部实现

<McpDetailedDemo />

### 2.5 类比理解：USB-C 接口

MCP 就像 **USB-C 接口**：

- **以前**：每个设备都有自己的充电口（圆口、扁口、磁吸……）
- **现在**：USB-C 统一了所有设备的充电和数据传输
- **MCP**：统一了 AI 与所有工具的连接方式

工具开发者只需要实现一次 MCP Server，所有支持 MCP 的 AI 应用（Claude、Cursor、Windsurf 等）都能直接使用。

### 2.6 MCP 的典型应用场景

| 场景 | 说明 | 示例 |
|------|------|------|
| **本地文件操作** | 让 AI 读取/修改本地文件 | 读取代码库、分析日志文件 |
| **数据库查询** | 让 AI 直接查询数据库 | SQL 查询、数据分析 |
| **API 调用** | 让 AI 调用第三方服务 | GitHub API、Slack、邮件 |
| **开发工具集成** | 让 AI 使用开发工具 | Git 操作、终端命令 |

**实际案例**：
- **Cursor/Windsurf**：通过 MCP 连接文件系统、Git、终端
- **Claude Desktop**：通过 MCP 连接笔记软件、邮件客户端
- **自动化脚本**：让 AI 执行自动化任务（备份、部署、数据同步）

---

## 3. A2A (Agent-to-Agent Protocol)

### 3.1 协议基本信息

| 项目 | 内容 |
|------|------|
| **全称** | Agent-to-Agent Protocol |
| **发起方** | Google |
| **发布时间** | 2025 年 4 月 9 日 |
| **官方文档** | [google.github.io/A2A](https://google.github.io/A2A) |
| **开源协议** | Apache 2.0 |
| **GitHub** | [github.com/google/A2A](https://github.com/google/A2A) |

::: tip 为什么是 Google 发起？
Google 在 Cloud Next 2025 大会上发布 A2A，与其企业级 AI 战略密切相关。

Google 认为：未来的企业 AI 不是单个超级 Agent，而是**多个专业 Agent 协作**——有的负责数据分析，有的负责代码生成，有的负责文档处理。

这些 Agent 需要一种标准化的方式相互通信，A2A 应运而生。
:::

### 3.2 发布的背景

MCP 解决了"AI 如何连接工具"的问题，但还有一个问题：**多个 Agent 如何协作？**

想象一个场景：
- Agent A 是"需求分析专家"
- Agent B 是"代码生成专家"
- Agent C 是"测试专家"

用户说："帮我开发一个登录功能"

Agent A 分析需求后，需要把任务分配给 Agent B；Agent B 写完代码后，需要让 Agent C 测试。它们之间如何通信？

Google 在官方博客中写道：
> "A2A is an open protocol that enables AI agents to communicate with each other, facilitating collaboration across different frameworks and vendors."

**核心目标**：让不同厂商、不同框架开发的 Agent 能够无缝协作。

### 3.3 A2A 是什么？

<A2AVisualDemo />

**三大核心概念**：

| 概念 | 英文 | 作用 | 类比 |
|------|------|------|------|
| **Agent Card** | Agent 名片 | 描述 Agent 的能力 | 员工工牌 |
| **Task** | 任务 | 要执行的工作单元 | 工单 |
| **Message** | 消息 | Agent 之间的通信内容 | 聊天记录 |

### 3.4 A2A 的内部实现

<A2ADetailedDemo />

### 3.5 类比理解：企业微信

A2A 就像 **企业微信**：

- **Agent Card**：每个人的名片，显示姓名、部门、职责
- **发任务**：@某人，分配一个任务
- **聊天沟通**：任务执行过程中可以随时沟通
- **任务追踪**：能看到任务的进度和状态

不同的 Agent 就像不同的同事，A2A 让它们能够协作完成复杂项目。

### 3.6 A2A 的典型应用场景

| 场景 | 说明 | 示例 |
|------|------|------|
| **软件开发** | 多 Agent 协作完成开发任务 | 需求分析→代码→测试→部署 |
| **企业工作流** | 不同部门 Agent 协作处理业务 | HR Agent + 财务 Agent + 法务 Agent |
| **智能客服** | 多个专业 Agent 分工处理 | 接待→解答→转接→记录 |
| **数据分析** | 多个 Agent 协作分析数据 | 收集→清洗→分析→可视化→报告 |

**实际案例**：
- **Google Agent Space**：企业内部多个 Agent 协作处理文档、邮件、日程
- **软件开发团队**：需求 Agent → 代码 Agent → 测试 Agent → 部署 Agent
- **智能客服系统**：接待 Agent → 专业解答 Agent → 人工转接 Agent

---

## 4. MCP vs A2A：对比与关系

### 4.1 核心差异

| 维度 | MCP | A2A |
|------|-----|-----|
| **发起方** | Anthropic (2024.11) | Google (2025.04) |
| **定位** | AI 与工具的连接 | Agent 与 Agent 的协作 |
| **通信范围** | Client-Server | Peer-to-Peer |
| **数据格式** | JSON-RPC 2.0 | HTTP + JSON |
| **类比** | USB-C 接口 | 企业微信 |

### 4.2 两者的关系

MCP 和 A2A **不是竞争关系，而是互补关系**：

<ProtocolComparisonDemo />

### 4.3 如何选择？

| 场景 | 选择 |
|------|------|
| 让 AI 调用本地函数或工具 | Function Call |
| 使用第三方工具（数据库、API、文件系统） | MCP |
| 构建多 Agent 协作系统 | A2A |
| 同时需要工具集成和多 Agent 协作 | MCP + A2A |

---

## 5. 协议的未来趋势

### 5.1 生态发展

**MCP 生态**（截至 2025 年初）：
- 官方提供的 Server：文件系统、SQLite、Git、PostgreSQL 等
- 社区贡献的 Server：Slack、Notion、Figma、Stripe 等
- 支持 MCP 的应用：Claude Desktop、Cursor、Windsurf、Zed 等

**A2A 生态**（刚发布）：
- Google 自家的 Agent 产品率先支持
- 开源社区正在开发各种语言的 SDK
- 企业级应用正在探索中

### 5.2 标准化进程

目前 Agent 协议还处于"战国时代"：
- MCP 和 A2A 是最主流的两个
- 还有其他新兴协议如 ANP、AGP 等
- 未来可能会融合或统一

类比互联网的发展：
- 早期：各种局域网协议并存
- 后来：TCP/IP 成为标准
- 现在：Agent 协议可能也会走向统一

---

## 6. 小结

::: tip 核心要点
| 协议 | 一句话理解 | 发布时间 | 发起方 | 适用场景 |
|------|-----------|---------|--------|---------|
| **MCP** | AI 连接工具的"USB-C" | 2024.11 | Anthropic | 工具集成、数据源连接 |
| **A2A** | Agent 协作的"企业微信" | 2025.04 | Google | 多 Agent 协作、任务委托 |

**关键洞察**：
1. MCP 解决"AI 如何获取外部能力"的问题
2. A2A 解决"多个 AI 如何协作"的问题
3. 两者互补，未来可能会融合使用
4. 选择协议要根据具体场景，没有银弹
:::

---

## 参考资料

1. **MCP 官方文档**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
2. **MCP GitHub**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
3. **Anthropic 发布博客**: "Introducing the Model Context Protocol" (2024-11-25)
4. **A2A 官方文档**: [google.github.io/A2A](https://google.github.io/A2A)
5. **A2A GitHub**: [github.com/google/A2A](https://github.com/google/A2A)
6. **Google Cloud Blog**: "Announcing the Agent-to-Agent Protocol" (2025-04-09)
