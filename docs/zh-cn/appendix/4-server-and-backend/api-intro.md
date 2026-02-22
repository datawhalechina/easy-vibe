# API 入门

::: tip 🎯 学习目标
阅读完本节后，你将能够：
- 理解 API 的本质概念和设计哲学
- 区分不同类型的 API（函数 API、操作系统 API、Web API）
- 掌握 HTTP 方法的语义和使用场景
- 学会阅读和使用 API 文档
- 理解 HTTP 调用与 SDK 调用的区别
:::

---

## 1. 从一个按钮开始

<ApiQuickStartDemo />

👆 看见了吗？点击按钮，几百毫秒后，服务器返回了当前时间。

这个过程，就是一次完整的 **API 调用**。虽然简单，但它包含了 API 交互的所有核心要素：

| 阶段 | 发生了什么 |
|------|-----------|
| **请求** | 客户端向服务器发送 "给我当前时间" 的请求 |
| **处理** | 服务器接收请求，查询系统时间 |
| **响应** | 服务器将时间数据返回给客户端 |

这就像你去便利店买水——你说"来瓶可乐"，店员给你一瓶可乐。你问一句，他给一笔。

**API（Application Programming Interface，应用程序编程接口）**，本质上就是一种"对话约定"：一方提出请求，另一方给出响应。

---

## 2. API 的三种形态

很多人一提到 API，就觉得这是很高深的东西。其实，你写代码的第一天就在用 API 了。

### 2.1 函数 API：最基础的形态

<FunctionApiDemo />

当你调用 `len("hello")` 时，你就在使用 Python 提供的一个 API。你不需要知道 `len()` 内部是怎么数字符串长度的——是用 C 实现的还是用 Python 实现的？是遍历计数还是直接读取长度字段？这些细节都被隐藏了。

**API 的核心价值：把复杂的东西藏起来，只给你一个简单的用法。**

再看一个更贴近实际的例子：

```python
# 你写这行代码
response = requests.get("https://api.example.com/users")

# 背后发生了什么？
# 1. DNS 解析：把域名转成 IP 地址
# 2. TCP 连接：建立网络通道
# 3. TLS 握手：加密通信
# 4. HTTP 请求：发送数据包
# 5. 等待响应：接收服务器返回
# 6. 解析数据：把字节流转成 Python 对象
```

如果你要自己处理这 6 步，每次请求都要写几百行代码。但 `requests.get()` 把这些都封装好了，你只需要一行代码。

### 2.2 操作系统 API：让程序能"碰"硬件

当你在电脑上打开一个文件：

```python
with open("file.txt", "r") as f:
    content = f.read()
```

这行代码背后，Python 调用了**操作系统的 API**。

| 操作系统 | API 名称 | 作用 |
|---------|---------|------|
| Windows | Win32 API | 文件操作、窗口管理、进程控制 |
| Linux | POSIX API | 系统调用、进程通信、设备访问 |
| macOS | Cocoa API | 图形界面、文件系统、网络 |

没有操作系统 API，你的 Python 代码就是一堆文字，根本动不了硬盘里的文件、显示不了窗口、连不上网络。

### 2.3 Web API：跨越网络的"超能力"

最后，才是大多数人熟知的 Web API：

```python
import requests

response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={"Authorization": "Bearer sk-xxx"},
    json={
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": "你好"}]
    }
)
```

这行代码做了什么？它让你的程序穿越互联网，调用了千里之外 DeepSeek 服务器上的 AI 模型。就像你打了个越洋电话，让大洋彼岸的厨师帮你做了一道菜。

**Web API 的神奇之处：让"调用别人的超级电脑"变得像调用本地函数一样简单。**

---

## 3. API 的统一结构

无论哪种 API，结构都一样。就像插头和插座，怎么变都离不开三样东西：

<ApiConceptDemo />

| 要素 | 函数 API | Web API |
|------|---------|---------|
| **地址/名称** | `len()` | `https://api.example.com/users` |
| **输入/参数** | `"hello"` | `{"name": "张三"}` |
| **输出/返回** | `5` | `{"id": 1, "name": "张三"}` |

理解了这个统一结构，你就掌握了 API 的本质。无论是调用一个 Python 函数，还是请求一个远程服务器，思路都是一样的：

1. **找到入口**（函数名或 URL）
2. **传入参数**（按要求的格式）
3. **处理返回**（按约定的结构解析）

---

## 4. HTTP 方法：你是在"问"还是在"做"？

调用 Web API 时，你需要告诉服务器你想做什么。这就是 HTTP 方法的由来。

想象你去一家餐厅：

| 场景 | 现实中你会怎么说？ | 对应的 HTTP 方法 |
|------|-------------------|-----------------|
| 你想知道今天有什么菜 | "服务员，菜单给我看看" | **GET** - 纯"问"，不改数据 |
| 你想点一份宫保鸡丁 | "给我来份宫保鸡丁" | **POST** - "做"件事，创建数据 |
| 你想换一道菜 | "把宫保鸡丁改成糖醋里脊" | **PUT** - 替换数据 |
| 你想改口味 | "宫保鸡丁不要放花生" | **PATCH** - 部分修改 |
| 你不想要了 | "算了，那道菜不要了" | **DELETE** - 删除数据 |

<ApiMethodDemo />

::: warning 关于幂等性
**幂等性**是一个重要概念：多次执行结果是否相同？

- **GET**：查询 10 次和查询 1 次，结果一样 → 幂等
- **DELETE**：删除 10 次和删除 1 次，结果一样 → 幂等
- **POST**：下单 10 次，可能创建 10 个订单 → 不幂等

实际开发中，POST 操作通常需要用唯一 ID 来防止重复处理。
:::

---

## 5. HTTP vs SDK：自己跑腿还是让管家代办？

在 AI 编程教程中，你会经常看到两种调用方式：**HTTP** 和 **SDK**。它们的区别就像"自己跑腿"和"让管家代办"。

<RealWorldApiDemo />

### 5.1 HTTP API：自己跑腿

这是最原始的方式。你需要：

1. **找到网址**（Base URL + Endpoint）
2. **准备请求头**（Authorization、Content-Type）
3. **构造请求体**（JSON 格式的参数）
4. **发送请求**（处理网络错误、超时）
5. **解析响应**（把 JSON 转成可用的数据）

所有编程语言都能用，但你需要处理很多细节。

### 5.2 SDK：让管家代办

SDK（Software Development Kit）就像是 API 提供方派给你的专属管家：

```python
# HTTP 方式：自己处理所有细节
import requests
response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={"Authorization": "Bearer sk-xxx"},
    json={"model": "deepseek-chat", "messages": [...]}
)
result = response.json()["choices"][0]["message"]["content"]

# SDK 方式：管家帮你处理
from openai import OpenAI
client = OpenAI(api_key="sk-xxx")
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[...]
)
result = response.choices[0].message.content
```

SDK 自动处理了：鉴权、请求格式、错误处理、重试逻辑、响应解析。

::: tip 建议
**能用 SDK 就用 SDK**，把麻烦事留给库，把时间留给自己。
:::

---

## 6. 如何阅读 API 文档？

API 文档就像说明书和菜单的结合体。你不需要从头读到尾，只需要学会"查字典"。

打开任何一个 API 文档（比如 OpenAI 或 DeepSeek），你只需要找这几样东西：

<ApiDocumentDemo />

### 6.1 文档阅读清单

| 项目 | 说明 | 示例 |
|------|------|------|
| **Base URL** | API 的根地址 | `https://api.deepseek.com` |
| **Authentication** | 如何证明身份 | `Authorization: Bearer sk-xxx` |
| **Endpoints** | 具体的接口列表 | `/v1/chat/completions` |
| **Parameters** | 必填/可选参数 | `model`（必填）、`temperature`（可选） |
| **Response** | 返回数据结构 | `{"choices": [...]}` |

### 6.2 常见状态码

服务器回复时，会先返回一个状态码，告诉你请求是否成功：

| 状态码 | 含义 | 常见原因 |
|--------|------|---------|
| **200 OK** | 成功 | 请求正常处理 |
| **201 Created** | 创建成功 | POST 请求成功创建资源 |
| **400 Bad Request** | 请求格式错误 | 参数缺失或格式不对 |
| **401 Unauthorized** | 未认证 | 没有提供有效的 API Key |
| **403 Forbidden** | 无权限 | API Key 没有访问该资源的权限 |
| **404 Not Found** | 不存在 | 请求的地址或资源不存在 |
| **429 Too Many Requests** | 请求过多 | 超过了速率限制 |
| **500 Internal Server Error** | 服务器错误 | 服务端出了问题 |

---

## 7. 动手练习

光说不练假把式。这里有个模拟 API，你可以随便填参数、随便改地址，看看会发生什么。

<ApiPlayground />

试着触发以下场景：
- ✅ **成功请求**：填入正确的 Endpoint 和 API Key
- ❌ **401 错误**：不填 API Key，看看服务器怎么拒绝你
- ❌ **404 错误**：填一个不存在的地址

---

## 8. 小结

::: info 核心要点
1. **API 就是传声筒**，帮你把话传给另一段代码或远程服务器
2. **你早就用过 API 了**，从 `len()` 到 `open()` 都是 API
3. **Web API 是超能力**，让你调用千里之外的超级电脑
4. **SDK 是好管家**，能用 SDK 就别自己跑腿
5. **看文档找三样**：地址、鉴权、参数
:::

在 AI 编程的时代，你只需要记住这几个核心概念。剩下的细节，IDE 和 AI 助手会帮你处理。

---

## 名词速查表

| 名词 | 全称 | 解释 |
|------|------|------|
| **API** | Application Programming Interface | 应用程序编程接口，定义了软件之间如何交互 |
| **Web API** | - | 基于 HTTP 协议的 API，用于网络通信 |
| **Endpoint** | - | 端点，API 的具体地址 |
| **HTTP** | HyperText Transfer Protocol | Web API 使用的通信协议 |
| **GET** | - | 获取资源的方法 |
| **POST** | - | 提交数据的方法 |
| **SDK** | Software Development Kit | 软件开发工具包，封装了底层 API 调用 |
| **URL** | Uniform Resource Locator | API 的网络地址 |
| **JSON** | JavaScript Object Notation | 常用的数据格式 |
| **Authentication** | - | 验证身份的过程 |
| **Status Code** | - | HTTP 响应中的状态码 |
| **Request** | - | 请求 |
| **Response** | - | 响应 |
| **Header** | - | HTTP 头，包含元信息 |
| **Payload** | - | 请求或响应的实际数据 |
| **Rate Limit** | - | 速率限制 |
| **Idempotent** | - | 幂等，多次执行结果相同 |
