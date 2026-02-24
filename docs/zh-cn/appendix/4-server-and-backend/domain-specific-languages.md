# 领域特定语言（DSL）：后端世界中那些"不像代码的代码"

::: tip 前言
在一个真实案例中，工程师 Armin 在新公司用 AI 构建了一套基础设施服务，总计约 4 万行代码（Go + YAML + Pulumi + SDK 胶水代码），其中超过 90% 由 AI 生成。这个案例中出现了许多初学者不熟悉的术语：YAML、Pulumi、HCL、Lua、SDK 胶水代码……它们既不是 Python，也不是 JavaScript，却在后端项目中无处不在。本文将从一个统一的视角——**领域特定语言（DSL）**——来系统地介绍这些技术。
:::

**本文的学习目标**

在后端开发中，除了用通用编程语言（Python、Go、Java 等）编写的业务逻辑之外，还存在大量**用途各异、语法各异、但都不属于通用编程语言**的文件和代码。它们有一个共同的上位概念：**DSL（Domain-Specific Language，领域特定语言）**。

学完本文后，你将能够：

- 理解 DSL 与通用编程语言（GPL）的本质区别
- 掌握 DSL 的分类体系：数据序列化格式、嵌入式脚本语言、基础设施定义语言
- 区分 XML、JSON、YAML、TOML、CSV、Protobuf 等数据格式的适用场景
- 理解 Lua 等嵌入式脚本语言的设计目的
- 解释 Terraform（HCL）和 Pulumi 的原理与区别
- 理解 OpenAPI 规范与 SDK 自动生成的工作原理
- 判断哪些类型的代码适合交给 AI 生成

| 章节 | 主题 | 核心概念 |
|-----|------|---------|
| **第 1 章** | DSL 总论 | DSL vs GPL 的定义、分类体系与全景图 |
| **第 2 章** | 数据序列化格式 | XML、JSON、YAML、TOML、CSV、Protobuf 等 |
| **第 3 章** | 嵌入式脚本语言 | Lua 等语言的设计哲学与典型应用 |
| **第 4 章** | 基础设施即代码 | Terraform（HCL）、Pulumi 的原理与对比 |
| **第 5 章** | 胶水代码与 SDK 生成 | OpenAPI 规范与客户端代码自动生成 |
| **第 6 章** | AI 与 DSL 的关系 | 为什么 AI 特别擅长生成 DSL 代码 |

---

## 1. DSL 总论：通用语言之外的另一个世界

### 1.1 什么是 DSL？

**DSL（Domain-Specific Language，领域特定语言）** 是为某个特定领域或特定任务设计的语言。与之相对的是 **GPL（General-Purpose Language，通用编程语言）**，如 Python、Java、Go、C++ 等——它们被设计为可以解决任意计算问题。

两者的核心区别：

| 维度 | GPL（通用编程语言） | DSL（领域特定语言） |
|------|-------------------|-------------------|
| **设计目标** | 解决任意计算问题 | 解决某个特定领域的问题 |
| **表达范围** | 图灵完备，理论上可以计算任何东西 | 通常有意限制表达范围 |
| **学习成本** | 较高，需要理解完整的语言体系 | 较低，只需理解该领域的概念 |
| **典型代表** | Python、Java、Go、C++、JavaScript | SQL、HTML/CSS、正则表达式、YAML、HCL |

你其实早就在使用 DSL 了：

- **SQL** 是数据库查询领域的 DSL——你用 `SELECT * FROM users WHERE age > 18` 来查数据，而不是用 Python 手写遍历逻辑
- **HTML/CSS** 是网页结构与样式领域的 DSL——你用标签和属性描述页面，而不是用 C++ 操作像素
- **正则表达式** 是文本模式匹配领域的 DSL——你用 `\d{3}-\d{4}` 匹配电话号码，而不是手写字符比较循环

### 1.2 DSL 的分类

DSL 可以按照"是否具备图灵完备性"分为两大类：

**外部 DSL（External DSL）**

拥有独立的语法和解析器，不依附于任何通用编程语言。用户编写的代码由专用的解释器或编译器处理。

- 纯数据描述型：JSON、YAML、XML、TOML、CSV、Protobuf（不含任何逻辑）
- 查询/操作型：SQL、GraphQL、正则表达式（有限的逻辑能力）
- 领域建模型：HCL（Terraform）、Dockerfile、Nginx 配置语法（声明式描述特定领域的状态）

**内部 DSL（Internal DSL / Embedded DSL）**

寄生在某门通用编程语言内部，利用宿主语言的语法来构建领域专用的表达方式。代码本身是合法的宿主语言代码，但读起来像是一门专用语言。

- Pulumi（用 TypeScript/Python/Go 编写，但 API 设计得像声明式配置）
- Ruby on Rails 的路由定义（`get '/users', to: 'users#index'`，合法的 Ruby 代码，但读起来像配置）
- 测试框架中的断言语法（`expect(value).toBe(42)`，合法的 JavaScript，但读起来像自然语言）

### 1.3 后端项目中的 DSL 全景图

在一个典型的后端项目中，你会遇到以下几类 DSL：

```
后端项目中的 DSL
├── 数据序列化格式（描述数据结构）
│   ├── 文本格式：JSON、YAML、XML、TOML、CSV、INI
│   └── 二进制格式：Protobuf、MessagePack、Avro、BSON
├── 嵌入式脚本语言（可编程的配置层）
│   ├── Lua（游戏引擎、Nginx、Redis）
│   ├── GDScript（Godot 引擎）
│   └── Jsonnet（配置模板生成）
├── 基础设施与运维 DSL（声明式描述系统状态）
│   ├── HCL（Terraform）
│   ├── Dockerfile / Docker Compose YAML
│   └── Nginx / Apache 配置语法
└── 接口描述语言（描述 API 契约）
    ├── OpenAPI / Swagger
    ├── Protocol Buffers（.proto 文件）
    └── GraphQL Schema
```

理解了这张全景图，后续章节将逐一展开每个分支。

---

## 2. 数据序列化格式：用文本描述结构化数据

### 2.1 什么是数据序列化？

**序列化（Serialization）** 是指将内存中的数据结构（对象、字典、数组等）转换为一种可存储或可传输的文本/字节流的过程。反过来，从文本/字节流还原为内存中的数据结构，称为**反序列化（Deserialization）**。

数据序列化格式是 DSL 中最基础的一类——它们属于纯数据描述型外部 DSL，不具备任何逻辑能力，只负责静态地描述"值是什么"。

### 2.2 为什么需要这些格式？

假设你开发了一个后端服务，数据库地址为 `localhost:5432`。如果将这个地址硬编码在源代码中，本地开发没有问题，但部署到生产环境时，数据库地址变为 `db.prod.company.com:5432`，你就需要修改源代码并重新编译。

工程实践中的通用做法是：**将可变的参数从代码中分离出来，存放在独立的配置文件中。** 程序在启动时读取配置文件，根据其中的值来决定行为。

除了配置之外，数据序列化格式还广泛用于：系统间的数据交换（API 请求/响应）、数据持久化存储、跨语言通信等场景。

### 2.3 人类可读的文本格式

以下是工程中最常见的文本序列化格式，按历史顺序介绍。

**INI**

最早期的配置格式，起源于 Windows 系统。结构简单，由节（section）和键值对组成：

```ini
[database]
host = localhost
port = 5432

[server]
debug = true
```

优点是可读性强。局限在于不支持嵌套结构和数组类型，无法表达复杂配置。目前主要出现在遗留系统和部分 Linux 配置中（如 `php.ini`、`my.cnf`）。

**CSV**

**CSV（Comma-Separated Values，逗号分隔值）** 是最简单的表格数据格式：

```csv
name,age,city
Alice,30,Beijing
Bob,25,Shanghai
```

每行是一条记录，字段之间用逗号分隔。CSV 广泛用于数据导入导出、电子表格交换、数据分析管道。它的局限是只能表达扁平的二维表格，不支持嵌套结构，且没有类型信息（所有值都是字符串）。

**XML**

**XML（eXtensible Markup Language，可扩展标记语言）** 诞生于 1998 年，曾经是数据交换的主流标准：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
  <database>
    <host>localhost</host>
    <port>5432</port>
  </database>
  <server>
    <debug>true</debug>
    <allowed_origins>
      <origin>https://example.com</origin>
      <origin>https://app.example.com</origin>
    </allowed_origins>
  </server>
</config>
```

XML 的表达力非常强，支持嵌套、属性、命名空间、Schema 验证等高级特性。但它的语法冗长——大量的开闭标签导致信噪比低，手动编写和阅读的体验较差。

XML 在以下领域仍然广泛使用：
- Java 生态（Maven 的 `pom.xml`、Spring 配置、Android 布局文件）
- 企业级 Web 服务（SOAP 协议）
- 办公文档格式（`.docx`、`.xlsx` 本质上是 ZIP 压缩的 XML 文件集合）
- RSS/Atom 订阅源、SVG 矢量图形

**JSON**

**JSON（JavaScript Object Notation）** 诞生于 2001 年，因其简洁性迅速取代 XML 成为 Web API 数据交换的事实标准：

```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  },
  "server": {
    "debug": true
  }
}
```

优点是结构清晰，几乎所有编程语言都有原生解析支持。主要缺点是**不支持注释**，且大量的括号和引号在手动编写时容易出错。JSON 同时也是前端项目配置的标准格式（`package.json`、`tsconfig.json`）。

**YAML**

**YAML（YAML Ain't Markup Language）** 同样诞生于 2001 年，是目前后端和 DevOps 领域使用最广泛的配置格式。Docker Compose、Kubernetes、GitHub Actions 等工具均采用 YAML：

```yaml
# 数据库配置
database:
  host: localhost
  port: 5432

# 服务器配置
server:
  debug: true
  allowed_origins:
    - https://example.com
    - https://app.example.com
```

优点是支持注释、语法简洁、可表达复杂嵌套结构。缺点是**依赖缩进来表示层级关系**，缩进错误会导致解析失败，这是初学者最常遇到的问题。

> 补充：YAML 的全称 "YAML Ain't Markup Language" 是一个递归缩写。

**TOML**

**TOML（Tom's Obvious Minimal Language）** 诞生于 2013 年，被 Rust 的包管理器 Cargo 和 Python 的 `pyproject.toml` 采用：

```toml
[database]
host = "localhost"
port = 5432

[server]
debug = true
allowed_origins = [
  "https://example.com",
  "https://app.example.com"
]
```

TOML 试图兼顾 INI 的简洁性和 YAML 的表达力，同时避免缩进敏感带来的问题。

### 2.4 二进制序列化格式

上述格式都是人类可读的文本。在对性能和体积有更高要求的场景中，还存在一类**二进制序列化格式**——它们牺牲可读性，换取更小的体积和更快的解析速度。

| 格式 | 开发方 | 特点 | 典型使用场景 |
|------|-------|------|------------|
| **Protocol Buffers (Protobuf)** | Google | 需要预定义 `.proto` Schema 文件，强类型，体积极小 | gRPC 通信、Google 内部服务、高性能微服务 |
| **MessagePack** | 社区 | 类似 JSON 的二进制版本，无需 Schema | Redis 内部编码、跨语言高性能通信 |
| **Avro** | Apache | 支持 Schema 演进，适合大数据场景 | Hadoop / Kafka 生态的数据序列化 |
| **BSON** | MongoDB | JSON 的二进制扩展，支持更多数据类型 | MongoDB 数据库内部存储格式 |

以 Protocol Buffers 为例，需要先定义 Schema：

```protobuf
// user.proto
syntax = "proto3";

message User {
  string name = 1;
  int32 age = 2;
  string email = 3;
}
```

然后通过编译器（`protoc`）自动生成各语言的序列化/反序列化代码。这种"先定义 Schema，再生成代码"的模式与后文将介绍的 OpenAPI SDK 生成思路一致。

### 2.5 完整对比

| 格式 | 类型 | 诞生年代 | 可读性 | 支持注释 | 典型使用场景 |
|------|------|---------|--------|---------|------------|
| **INI** | 文本 | 1980s | 高 | ✅ | 系统配置、遗留项目 |
| **CSV** | 文本 | 1972 | 高 | ❌ | 数据导入导出、表格交换 |
| **XML** | 文本 | 1998 | 中 | ✅ | Java 生态、企业级 Web 服务、文档格式 |
| **JSON** | 文本 | 2001 | 高 | ❌ | Web API 数据交换、前端配置 |
| **YAML** | 文本 | 2001 | 高 | ✅ | Docker、K8s、CI/CD、后端服务配置 |
| **TOML** | 文本 | 2013 | 高 | ✅ | Rust / Python 项目配置 |
| **Protobuf** | 二进制 | 2008 | 无 | — | gRPC、高性能微服务通信 |
| **MessagePack** | 二进制 | 2008 | 无 | — | 高性能跨语言通信 |
| **Avro** | 二进制 | 2009 | 无 | — | Hadoop / Kafka 大数据管道 |
| **BSON** | 二进制 | 2009 | 无 | — | MongoDB 内部存储 |

**要点**：所有这些格式的本质功能相同——**将结构化数据转换为可存储、可传输的形式**。文本格式优先考虑人类可读性和易编辑性；二进制格式优先考虑解析性能和传输体积。选择哪种格式取决于具体场景的需求权衡。


---

## 3. 嵌入式脚本语言：可编程的配置层

### 3.1 概念定义

Python、JavaScript、Go 等语言是通用编程语言（General-Purpose Language），它们可以独立运行，构建完整的应用程序。

与之不同，还有一类语言**专门设计为嵌入到其他宿主程序中运行**，为宿主程序提供可编程的扩展能力。这类语言被称为**嵌入式脚本语言（Embedded Scripting Language）**。

它们解决的核心问题是：**当静态配置文件（YAML/JSON）的表达力不够，需要引入条件判断、循环等逻辑时，如何在不修改宿主程序源码的前提下实现动态行为。**

### 3.2 Lua：最具代表性的嵌入式脚本语言

Lua（葡萄牙语中"月亮"的意思）是一门极其轻量的脚本语言，整个解释器编译后仅几百 KB。它的设计目标不是独立运行，而是作为可嵌入的扩展层。

Lua 的典型应用场景：

- **游戏引擎**：《魔兽世界》的插件系统、《Roblox》的游戏脚本均使用 Lua。游戏引擎用 C/C++ 实现核心渲染和物理计算，将关卡逻辑、NPC 对话等频繁变动的部分交给 Lua 脚本。这样，策划人员修改游戏内容时不需要重新编译引擎。

- **Web 服务器**：OpenResty 将 Lua 嵌入 Nginx 内部，使运维人员可以用 Lua 脚本实现请求过滤、限流、鉴权等逻辑，而无需修改 Nginx 的 C 源码。

- **数据库**：Redis 支持将 Lua 脚本发送到服务端执行，用于实现需要原子性保证的复合操作（如"先读后写"）。

以下是一段嵌入在 Nginx（OpenResty）中的 Lua 脚本示例：

```lua
-- 功能：对 /api/secret 路径进行 token 鉴权
local uri = ngx.var.uri
local token = ngx.req.get_headers()["Authorization"]

if uri == "/api/secret" and token ~= "Bearer my-secret-token" then
    ngx.status = 403
    ngx.say("Access denied")
    return ngx.exit(403)
end
```

### 3.3 其他嵌入式脚本语言

| 语言 | 宿主环境 | 典型用途 |
|------|---------|---------|
| **Lua** | 游戏引擎、Nginx（OpenResty）、Redis | 游戏逻辑、网关策略、缓存操作 |
| **VimScript / Lua** | Vim / Neovim 编辑器 | 编辑器插件开发 |
| **Emacs Lisp** | Emacs 编辑器 | 编辑器行为自定义 |
| **GDScript** | Godot 游戏引擎 | 游戏逻辑脚本 |
| **Jsonnet** | Kubernetes 生态 / 配置生成工具 | 模板化生成大量相似的 JSON/YAML 配置 |

**要点**：嵌入式脚本语言在 DSL 分类中属于**内部 DSL 与外部 DSL 的交界地带**——它们是独立的语言（有自己的语法和解释器），但设计目标是嵌入宿主程序运行，而非独立构建应用。它们填补了"静态配置文件"（纯数据描述型 DSL）与"通用编程语言"（GPL）之间的空白：当配置需要表达逻辑（条件判断、循环、函数调用）时，嵌入一门轻量脚本语言是工程上的标准解决方案。


---

## 4. 基础设施即代码（Infrastructure as Code）

### 4.1 什么是"基础设施"

在后端工程中，"基础设施"（Infrastructure）指的是应用程序运行所依赖的底层资源：

- 计算资源：服务器（虚拟机或容器）
- 数据存储：数据库实例、对象存储桶
- 网络：防火墙规则、负载均衡器、DNS 配置
- 中间件：消息队列、缓存集群

在云计算时代，这些资源通过云服务商（如 AWS、阿里云、腾讯云）的控制台以图形界面的方式创建和管理。

### 4.2 手动管理的局限性

通过控制台手动操作在小规模项目中可行，但随着项目规模增长，会暴露以下问题：

1. **不可重复**：操作步骤没有记录，无法精确复现同一套环境
2. **不可审计**：无法追溯"谁在什么时间修改了什么配置"
3. **不可协作**：操作过程无法纳入版本控制，无法进行代码审查
4. **容易出错**：手动操作在生产环境中存在误操作风险

**基础设施即代码（Infrastructure as Code，简称 IaC）** 的核心思想是：**用代码来声明式地定义基础设施资源，使其具备版本控制、自动化执行和可重复部署的能力。**

### 4.3 Terraform

Terraform 是目前使用最广泛的 IaC 工具，由 HashiCorp 公司开发。它使用专用的 **HCL（HashiCorp Configuration Language）** 语言。

Terraform 采用**声明式**范式：用户描述期望的最终状态，Terraform 自动计算从当前状态到目标状态所需的操作。

```hcl
# 定义一台云服务器
resource "aws_instance" "my_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # 操作系统镜像
  instance_type = "t3.micro"               # 实例规格

  tags = {
    Name = "my-first-server"
  }
}

# 定义一个 PostgreSQL 数据库实例
resource "aws_db_instance" "my_database" {
  engine         = "postgres"
  instance_class = "db.t3.micro"
  username       = "admin"
  password       = "please-use-secrets-manager"
}
```

执行流程：

```bash
terraform plan    # 预览将要执行的变更
terraform apply   # 确认并执行，自动在云平台创建资源
```

### 4.4 Pulumi

Pulumi 提供了另一种思路：**直接使用通用编程语言（TypeScript、Python、Go 等）来定义基础设施**，而非学习专用的 HCL 语法。

同样的服务器定义，用 Pulumi + TypeScript 表达如下：

```typescript
import * as aws from "@pulumi/aws";

const server = new aws.ec2.Instance("my-server", {
    ami: "ami-0c55b159cbfafe1f0",
    instanceType: "t3.micro",
    tags: { Name: "my-first-server" },
});

const bucket = new aws.s3.Bucket("my-bucket", {
    acl: "private",
});

export const serverIp = server.publicIp;
```

由于使用的是通用编程语言，开发者可以利用循环、条件判断、函数抽象等语言特性来处理复杂的基础设施逻辑。

### 4.5 Terraform 与 Pulumi 的对比

| 维度 | Terraform | Pulumi |
|------|-----------|--------|
| **语言** | HCL（专用语言） | TypeScript / Python / Go 等通用语言 |
| **学习成本** | 需要学习 HCL 语法 | 使用已掌握的编程语言，学习成本较低 |
| **社区生态** | 非常成熟，几乎覆盖所有云服务商 | 快速增长中，但规模小于 Terraform |
| **适用场景** | 运维团队主导的标准化基础设施管理 | 开发者主导的项目，需要复杂逻辑的场景 |
| **AI 代码生成适配度** | 高（模式固定） | 很高（本质是通用编程语言代码） |

**要点**：IaC 工具中的 HCL 是一种典型的外部 DSL——它有独立的语法和解析器，专门用于声明式描述基础设施状态。而 Pulumi 则采用内部 DSL 的策略——用通用编程语言的语法来表达领域特定的概念。两者目标一致（将基础设施管理从手动操作转为代码驱动），路径不同（专用语言 vs 通用语言）。代码可以纳入 Git 版本控制、进行团队审查、自动化执行和回滚。


---

## 5. 胶水代码与 SDK 自动生成

### 5.1 什么是胶水代码

在软件工程中，**胶水代码（Glue Code）** 指的是本身不包含业务逻辑，仅用于连接两个系统或模块的代码。

典型的胶水代码包括：

- 前端调用后端 API 时编写的 HTTP 请求代码（URL 拼接、请求头设置、响应解析）
- 后端服务 A 调用服务 B 接口时编写的 HTTP 客户端代码
- 不同编程语言之间的接口适配代码

这类代码的特征是：**高度重复、模式固定、但不可省略。**

### 5.2 OpenAPI 规范与代码自动生成

既然胶水代码具有高度的模式化特征，工程界的解决方案是：**先用标准格式描述 API 接口，再用工具自动生成客户端代码。**

**OpenAPI 规范**（前身为 Swagger）是描述 REST API 的行业标准。它使用 YAML 或 JSON 格式，精确定义 API 的路径、参数、请求体和响应结构：

```yaml
openapi: 3.0.0
info:
  title: 邮件服务 API
  version: 1.0.0

paths:
  /emails:
    post:
      summary: 发送邮件
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                to:
                  type: string
                  example: "user@example.com"
                subject:
                  type: string
                body:
                  type: string
      responses:
        '200':
          description: 发送成功
```

基于这份规范文件，使用 `openapi-generator` 等工具可以自动生成多种语言的客户端 SDK：

- **Python**：`client.emails.send(to="user@example.com", subject="Hi", body="Hello")`
- **TypeScript**：`client.emails.send({ to: "user@example.com", subject: "Hi", body: "Hello" })`
- **Go**：`client.Emails.Send(ctx, &SendEmailRequest{To: "user@example.com", ...})`

生成的 SDK 封装了 HTTP 请求的所有细节，调用方无需关心 URL 路径、请求方法、序列化格式等底层实现。

### 5.3 重新理解 Armin 的案例

回到本文开头的案例，现在可以准确理解其中每个组成部分：

| 组成部分 | 性质 | 说明 |
|---------|------|------|
| **Go** | 业务逻辑代码 | 邮件收发服务的核心功能实现 |
| **YAML** | 配置文件 | 服务配置、CI/CD 流水线定义、OpenAPI 规范文件 |
| **Pulumi** | 基础设施代码 | 用 Go/TypeScript 定义云资源（服务器、数据库、网络） |
| **SDK 胶水代码** | 自动生成的客户端库 | 从 OpenAPI 规范自动生成的 Python 和 TypeScript SDK |

其中 YAML 配置、Pulumi 资源定义、SDK 胶水代码这三类均属于高度模式化、有明确规范约束的代码，这正是 AI 代码生成能力最强的领域。因此"4 万行代码中 90% 由 AI 生成"是合理的。


---

## 6. AI 与 DSL 的关系

### 6.1 AI 代码生成的适用性分析

| 特征维度 | 适合 AI 生成 | 不适合 AI 生成 |
|---------|-------------|---------------|
| **模式化程度** | 高度重复，存在固定模板 | 需要创造性设计，无先例可循 |
| **规范约束** | 有明确的 schema 或语法规范 | 需求模糊，边界不清晰 |
| **上下文依赖** | 局部自洽，单个定义不依赖全局理解 | 需要理解整个系统的架构意图 |
| **可验证性** | 可被工具自动校验（如 `terraform validate`） | 只能依靠人工判断设计合理性 |

本文介绍的四类技术——配置文件、嵌入式脚本、IaC 代码、SDK 胶水代码——均具备左列的特征。这解释了为什么 AI 在这些领域的代码生成效果显著优于业务逻辑代码。

### 6.2 评估框架

在判断某段代码是否适合交给 AI 生成时，可以参考以下三个标准：

1. **是否存在现成的规范或 schema？** —— 存在则 AI 友好
2. **是否属于大量重复的模式？** —— 是则 AI 友好
3. **生成结果能否被工具自动验证？** —— 能则 AI 友好

三项均满足的代码（如从 OpenAPI 规范生成 SDK、用 Terraform 批量定义同构资源），可以高度依赖 AI 生成。三项均不满足的代码（如设计一个新的分布式一致性协议），仍需要工程师自行完成。

---

## 7. 术语表

| 术语 | 全称 / 中文 | 定义 |
|------|------------|------|
| **DSL** | Domain-Specific Language / 领域特定语言 | 为特定领域设计的语言，与通用编程语言相对 |
| **GPL** | General-Purpose Language / 通用编程语言 | 可解决任意计算问题的编程语言，如 Python、Java、Go |
| **外部 DSL** | External DSL | 拥有独立语法和解析器的领域特定语言，如 SQL、HCL、YAML |
| **内部 DSL** | Internal DSL / Embedded DSL | 寄生在通用编程语言内部、利用宿主语法构建的领域专用表达，如 Pulumi |
| **数据序列化** | Data Serialization | 将内存中的数据结构转换为可存储或可传输的格式的过程 |
| **INI** | Initialization | 最早期的键值对配置格式，起源于 Windows 系统 |
| **CSV** | Comma-Separated Values / 逗号分隔值 | 用逗号分隔字段的纯文本表格格式 |
| **XML** | eXtensible Markup Language / 可扩展标记语言 | 基于标签的文本数据格式，表达力强但语法冗长 |
| **JSON** | JavaScript Object Notation | 基于键值对的轻量数据交换格式，Web API 的事实标准 |
| **YAML** | YAML Ain't Markup Language | 基于缩进的配置文件格式，后端和 DevOps 领域广泛使用 |
| **TOML** | Tom's Obvious Minimal Language | 显式语法的配置格式，Rust 和 Python 生态常用 |
| **Protobuf** | Protocol Buffers | Google 开发的二进制序列化格式，需预定义 Schema，体积小、速度快 |
| **MessagePack** | — | 类似 JSON 的二进制序列化格式，无需 Schema |
| **Lua** | — | 轻量级嵌入式脚本语言，常用于游戏引擎、Web 服务器和数据库扩展 |
| **IaC** | Infrastructure as Code / 基础设施即代码 | 用代码定义和管理云计算资源的工程实践 |
| **Terraform** | — | HashiCorp 开发的 IaC 工具，使用 HCL 声明式语言 |
| **HCL** | HashiCorp Configuration Language | Terraform 使用的专用配置语言 |
| **Pulumi** | — | 支持通用编程语言的 IaC 工具 |
| **OpenAPI** | — | 描述 REST API 接口的行业标准规范（前身为 Swagger） |
| **SDK** | Software Development Kit / 软件开发工具包 | 封装了 API 调用细节的客户端库 |
| **胶水代码** | Glue Code | 不含业务逻辑，仅用于连接两个系统的适配代码 |

---

## 总结

后端工程中存在大量非业务逻辑代码。它们有一个共同的上位概念：**DSL（领域特定语言）**——为特定领域设计的、与通用编程语言相对的语言。

本文介绍的 DSL 可以归为四个类别：

1. **数据序列化格式**（XML / JSON / YAML / TOML / CSV / Protobuf 等）—— 纯数据描述型外部 DSL，将结构化数据转换为可存储、可传输的形式
2. **嵌入式脚本语言**（Lua 等）—— 介于配置与通用语言之间，为宿主程序提供可编程的扩展能力
3. **基础设施定义语言**（HCL / Dockerfile 等）—— 声明式外部 DSL，描述系统期望状态；Pulumi 则以内部 DSL 的方式实现同一目标
4. **接口描述语言与胶水代码生成**（OpenAPI / .proto）—— 通过规范描述自动生成系统间的连接代码

理解 DSL 这一分类框架后，面对后端项目中各类"不像代码的代码"时，可以快速识别其性质：它属于哪类 DSL、解决什么领域的问题、为什么不用通用编程语言来写。

同时，由于 DSL 代码具有高度模式化、规范驱动、可自动验证的特征，它们也是当前 AI 代码生成技术最有效的应用领域。