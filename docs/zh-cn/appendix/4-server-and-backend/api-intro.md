# API 入门：从零理解"程序之间的对话"

::: tip 🎯 核心问题
**什么是 API?** 这就像问:餐厅的菜单怎么设计,客人一看就懂?服务员怎么记单,不会出错?API 解决的就是"程序之间如何对话"的问题。你写代码的第一天就在用 API,只是你可能没意识到。
:::

---

## 0. 新手常见的三个困惑

**困惑一:API 是很高深的东西吗?**

很多人一听到 API,就觉得是高级工程师才能理解的概念。其实你早就用过 API 了:

```python
len("hello")        # 这就是 Python 提供的 API
open("file.txt")    # 这也是 API
requests.get(url)   # 这还是 API
```

**困惑二:Web API 和普通 API 有什么区别?**

| 类型 | 调用对象 | 通信方式 | 典型场景 |
| :--- | :--- | :--- | :--- |
| **函数 API** | 本地代码 | 函数调用 | `len()`, `open()` |
| **操作系统 API** | 操作系统 | 系统调用 | 读写文件、创建进程 |
| **Web API** | 远程服务器 | HTTP 请求 | 调用 AI 模型、获取天气 |

**困惑三:我该用 HTTP 还是 SDK?**

```python
# HTTP 方式:自己处理所有细节
import requests
response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={"Authorization": "Bearer sk-xxx"},
    json={"model": "deepseek-chat", "messages": [...]}
)
result = response.json()["choices"][0]["message"]["content"]

# SDK 方式:管家帮你处理
from openai import OpenAI
client = OpenAI(api_key="sk-xxx")
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[...]
)
result = response.choices[0].message.content
```

---

## 1. API 的本质:插头与插座

**API**(Application Programming Interface,应用程序编程接口)就是"程序之间对话的约定"。

### 1.1 用电器来类比

| 概念 | 电器类比 | API 对应 |
| :--- | :--- | :--- |
| **接口** | 插座形状 | 函数签名 / URL |
| **输入** | 电流输入 | 函数参数 / 请求体 |
| **输出** | 电器工作 | 返回值 / 响应体 |

### 1.2 三种 API 形态对比

<ApiTypesComparison />

### 1.3 函数 API vs HTTP API 的区别

很多初学者会困惑：函数 API 和 HTTP API 到底有什么区别？看文档时该如何区分？

<ApiFunctionVsHttp />

### 1.4 不同类型的 API 文档怎么看

面对不同类型的 API 文档，关注重点各不相同：

<DocumentTypesComparison />

---

## 2. 一次完整的 API 调用

👇 **动手试试看**:点击下方按钮,观察一次完整的 API 请求-响应流程:

<ApiRequestDemo />

### 2.1 API 调用的四个阶段

| 阶段 | 发生了什么 | 电器类比 |
| :--- | :--- | :--- |
| **请求** | 客户端向服务器发送请求 | 按下开关 |
| **传输** | 请求通过网络传输到服务器 | 电流通过电线 |
| **处理** | 服务器处理请求并返回数据 | 电器开始工作 |
| **响应** | 客户端接收并处理返回结果 | 灯泡发光 |

### 2.2 餐厅类比

| 餐厅角色 | API 对应 | 说明 |
| :--- | :--- | :--- |
| **菜单** | API 文档 | 告诉你有哪些"菜"可以点 |
| **服务员** | HTTP 协议 | 标准化的"对话方式" |
| **后厨** | 服务端 | 按"订单"处理请求 |
| **上菜** | 响应 | 把结果返回给"客人" |

---

## 3. HTTP 方法:你是在"问"还是在"做"?

调用 Web API 时,你需要告诉服务器你想做什么。这就是 HTTP 方法的由来。

### 3.1 用餐厅点餐来理解

| 场景 | 现实中你会怎么说? | 对应的 HTTP 方法 |
| :--- | :--- | :--- |
| 你想知道今天有什么菜 | "服务员,菜单给我看看" | **GET** - 纯"问",不改数据 |
| 你想点一份宫保鸡丁 | "给我来份宫保鸡丁" | **POST** - "做"件事,创建数据 |
| 你想换一道菜 | "把宫保鸡丁改成糖醋里脊" | **PUT** - 替换数据 |
| 你想改口味 | "宫保鸡丁不要放花生" | **PATCH** - 部分修改 |
| 你不想要了 | "算了,那道菜不要了" | **DELETE** - 删除数据 |

<HttpMethodsDemo />

::: warning 关于幂等性
**幂等性**:多次执行结果是否相同?

- **幂等的操作**(GET/PUT/DELETE):点 10 次和点 1 次,结果一样
- **不幂等的操作**(POST):点 10 次,可能创建 10 个订单

**解决方案**:POST 操作用唯一 ID 校验,避免重复处理。
:::

### 3.2 HTTP 方法速查表

| 方法 | 用途 | 幂等性 | 安全性 | 典型场景 |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | 获取资源 | 是 | 是 | 查询列表、查看详情 |
| **POST** | 创建资源 | 否 | 否 | 新增用户、提交订单 |
| **PUT** | 全量更新 | 是 | 否 | 替换整个用户资料 |
| **PATCH** | 部分更新 | 否 | 否 | 只修改昵称 |
| **DELETE** | 删除资源 | 是 | 否 | 删除用户、取消订单 |

---

## 4. HTTP 状态码:服务器在告诉你什么?

服务器回复时,会先返回一个状态码,告诉你请求是否成功。

### 4.1 状态码分类

<StatusCodeCategories />

### 4.2 常见状态码详解

| 状态码 | 含义 | 典型场景 | 客户端处理 |
| :--- | :--- | :--- | :--- |
| **200 OK** | 成功 | 请求正常处理 | 展示数据 |
| **201 Created** | 创建成功 | POST 请求成功创建资源 | 跳转到新资源 |
| **400 Bad Request** | 请求格式错误 | 参数缺失或格式不对 | 检查参数 |
| **401 Unauthorized** | 未认证 | 没有提供有效的 API Key | 引导用户登录 |
| **403 Forbidden** | 无权限 | API Key 没有访问该资源的权限 | 提示权限不足 |
| **404 Not Found** | 不存在 | 请求的地址或资源不存在 | 检查 URL |
| **429 Too Many Requests** | 请求过多 | 超过了速率限制 | 稍后重试 |
| **500 Internal Server Error** | 服务器错误 | 服务端出了问题 | 提示用户稍后重试 |

👇 **动手试试看**:点击下方按钮,了解常见状态码的含义:

<StatusCodeDemo />

---

## 5. HTTP vs SDK:自己跑腿还是让管家代办?

### 5.1 两种调用方式对比

| | 🏃 **HTTP API** | 🤵 **SDK** |
| :--- | :--- | :--- |
| **比喻** | 自己跑腿 | 管家代办 |
| **优点** | ✓ 所有语言都能用<br>✓ 完全控制请求细节<br>✓ 无需额外依赖 | ✓ 代码简洁易读<br>✓ 自动处理鉴权<br>✓ 内置错误重试 |
| **缺点** | ✗ 需要处理所有细节<br>✗ 代码冗长易出错 | ✗ 需要安装依赖<br>✗ 可能有版本问题 |
| **代码示例** | `requests.post(url, json=..., headers={...})` | `client.chat.completions.create(...)` |

### 5.2 如何选择?

| 场景 | 推荐方式 | 原因 |
| :--- | :--- | :--- |
| **快速开发** | SDK | 自动处理鉴权、错误、重试 |
| **学习原理** | HTTP | 理解底层机制 |
| **不支持的语言** | HTTP | 任何语言都能用 |
| **需要定制** | HTTP | 灵活控制每个细节 |

::: tip 💡 建议
**能用 SDK 就用 SDK**,把麻烦事留给库,把时间留给自己。
:::

---

## 6. 如何阅读 API 文档?

API 文档就像说明书和菜单的结合体。你不需要从头读到尾,只需要学会"查字典"。

### 6.1 文档阅读清单

打开任何一个 API 文档(比如 OpenAI 或 DeepSeek),你只需要找这几样东西:

<ApiDocumentDemo />

| 项目 | 说明 | 示例 |
| :--- | :--- | :--- |
| **Base URL** | API 的根地址 | `https://api.deepseek.com` |
| **Authentication** | 如何证明身份 | `Authorization: Bearer sk-xxx` |
| **Endpoints** | 具体的接口列表 | `/v1/chat/completions` |
| **Parameters** | 必填/可选参数 | `model`(必填)、`temperature`(可选) |
| **Response** | 返回数据结构 | `{"choices": [...]}` |

### 6.2 阅读文档的步骤

1. **找到 Base URL** - 这是所有请求的前缀
2. **看懂认证方式** - API Key 放在 Header 还是 Query?
3. **找到需要的 Endpoint** - 你要调用的具体接口
4. **查看请求参数** - 哪些必填?哪些可选?
5. **理解返回格式** - 数据是如何组织的?

---

## 7. 动手练习:模拟 API 调用

光说不练假把式。这里有个模拟 API,你可以随便填参数、随便改地址,看看会发生什么。

<ApiPlayground />

试着触发以下场景:
- ✅ **成功请求**:填入正确的 Endpoint 和 API Key
- ❌ **401 错误**:不填 API Key,看看服务器怎么拒绝你
- ❌ **404 错误**:填一个不存在的地址

---

## 8. 小结

::: info 核心要点
1. **API 就是传声筒**,帮你把话传给另一段代码或远程服务器
2. **你早就用过 API 了**,从 `len()` 到 `open()` 都是 API
3. **Web API 是超能力**,让你调用千里之外的超级电脑
4. **SDK 是好管家**,能用 SDK 就别自己跑腿
5. **看文档找三样**:地址、鉴权、参数
:::

在 AI 编程的时代,你只需要记住这几个核心概念。剩下的细节,IDE 和 AI 助手会帮你处理。

---

## 名词速查表

| 名词 | 全称 | 解释 |
| :--- | :--- | :--- |
| **API** | Application Programming Interface | 应用程序编程接口,定义了软件之间如何交互 |
| **Web API** | - | 基于 HTTP 协议的 API,用于网络通信 |
| **Endpoint** | - | 端点,API 的具体地址 |
| **HTTP** | HyperText Transfer Protocol | Web API 使用的通信协议 |
| **GET** | - | 获取资源的方法 |
| **POST** | - | 提交数据的方法 |
| **SDK** | Software Development Kit | 软件开发工具包,封装了底层 API 调用 |
| **URL** | Uniform Resource Locator | API 的网络地址 |
| **JSON** | JavaScript Object Notation | 常用的数据格式 |
| **Authentication** | - | 验证身份的过程 |
| **Status Code** | - | HTTP 响应中的状态码 |
| **Request** | - | 请求 |
| **Response** | - | 响应 |
| **Header** | - | HTTP 头,包含元信息 |
| **Payload** | - | 请求或响应的实际数据 |
| **Rate Limit** | - | 速率限制 |
| **Idempotent** | - | 幂等,多次执行结果相同 |
| **REST** | Representational State Transfer | 一种 API 架构风格 |
| **RPC** | Remote Procedure Call | 远程过程调用 |
| **GraphQL** | - | 一种查询语言 API |
| **gRPC** | - | Google 开发的高性能 RPC 框架 |
