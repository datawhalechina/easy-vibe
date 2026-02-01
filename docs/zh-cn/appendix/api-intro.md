# API 入门

<ApiQuickStartDemo />

👆 看见了吗？点一下按钮，230 毫秒后，一句格言就回来了。

这个过程，就是 **API 调用**。

---

## 说白了，API 就是"问一句，拿一笔"

你可能觉得"调用 API"是很高大上的操作。

其实吧，就像你去便利店买水——你说"来瓶可乐"，店员给你一瓶可乐。你问一句，他给一笔。

API 也是一样：

1. **你问**（发送请求）
2. **别人答**（服务器处理）
3. **你拿到**（返回结果）

只不过这次，你问的不是店员，而是一台远在千里之外的电脑。

---

## 但 API 远不止"网络接口"

一提到 API，很多人觉得这是很高深的东西，离自己很远。

其实吧，你写代码的第一天就在用 API 了，只是你不知道而已。

### 函数，就是最基础的 API

<FunctionApiDemo />

```python
length = len("hello")
```

`len()` 这个东西，你觉得它是什么？

它是个函数，没错。但同时，它也是 Python 给你留的一个 API。

什么意思呢？你不需要知道 `len()` 内部是怎么数字符串长度的，你不需要知道它是用 C 写的还是用 Python 写的，你只需要知道一件事——**把字符串给我，我告诉你多长**。

这就叫 API：**我把复杂的东西藏起来，只给你一个简单的用法**。

再看一个：

```python
my_list = []
my_list.append("item")
```

`append()` 也是 API。背后可能是内存分配、指针移动、容量扩容...但你不用关心这些。你只需要说"给我加上去"，它就帮你搞定。

### 操作系统 API：让你的程序能"碰"硬件

当你在电脑上打开一个文件：

```python
with open("file.txt", "r") as f:
    content = f.read()
```

这行代码背后，Python 其实在调用**操作系统的 API**。

Windows 有 Win32 API，Linux 有 POSIX API，macOS 有 Cocoa API。这些 API 是干嘛的？让程序能真正操作硬件——读写硬盘、显示窗口、播放声音。

没有操作系统 API，你的 Python 代码就是一堆文字，根本动不了硬盘里的文件。

### 第三方库的 API：站在巨人的肩膀上

当你用 NumPy 做矩阵运算：

```python
import numpy as np
matrix = np.array([[1, 2], [3, 4]])
result = np.dot(matrix, matrix)
```

`np.dot()` 就是 NumPy 给你留的 API。背后可能是经过优化的 C++ 代码、多线程计算、SIMD 指令...但你只需要知道一件事——**给我两个矩阵，我还你一个乘积**。

这就是 API 的魅力：**把别人的能力，变成你的能力**。

### Web API：跨越网络的"超能力"

最后，才是大多数人熟知的 Web API：

```python
import requests

response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={"Authorization": "Bearer sk-xxx"},
    json={"model": "deepseek-chat", "messages": [{"role": "user", "content": "你好"}]}
)
```

这行代码做了什么？

它让你的程序穿越互联网，调用了千里之外 DeepSeek 服务器上的 AI 模型。就像你打了个越洋电话，让大洋彼岸的厨师帮你做了一道菜。

**Web API 的神奇之处就在于：它让"调用别人的超级电脑"变得像调用本地函数一样简单。**

---

## 无论哪种 API，结构都一样

说了这么多，你可能发现了——不管哪种 API，它们的结构都是一样的。

就像插头和插座，怎么变都离不开三样东西：

| 要素 | 函数 API 的例子 | Web API 的例子 |
|------|----------------|---------------|
| **地址/名称** | `len()` | `https://api.example.com/users` |
| **输入/参数** | `"hello"` | `{"name": "张三"}` |
| **输出/返回** | `5` | `{"id": 1}` |

<ApiConceptDemo />

---

## 调用服务器：你是在"问"还是在"做"？

好，现在你知道调用 API 需要地址和参数。

但还有个问题没说：**你跟服务器说话的方式，不止一种。**

什么意思？

想象你去一家餐厅：

| 场景 | 现实中你会怎么说？ | 对应的 API 方式 |
|------|-------------------|-----------------|
| 你想知道今天有什么菜 | "服务员，菜单给我看看" | **GET** - 纯"问"，不改数据 |
| 你想点一份宫保鸡丁 | "给我来份宫保鸡丁" | **POST** - "做"件事 |
| 你想换一道菜 | "把宫保鸡丁改成糖醋里脊" | **PUT** - 替换数据 |
| 你不想要了 | "算了，那道菜不要了" | **DELETE** - 删除数据 |

这就是 HTTP 方法的来历：**不同的动词，对应不同的操作。**

但最常用的就两个：**GET 和 POST**。其他的先不用管。

<ApiMethodDemo />

---

## HTTP vs SDK：自己跑腿还是让管家代办？

既然教程的重点是 AI 编程，我们就重点讲讲 Web API——这是你和 AI 模型打交道的主要方式。

你在教程里经常会看到两种调用方式：**HTTP** 和 **SDK**。很多人会被绕晕，其实很简单，就是**"自己跑腿"**和**"让管家代办"**的区别。

### HTTP API：自己跑腿

这是最原始的方式。就像你自己去餐厅，从头开始点菜。

所有编程语言都能用，甚至你在浏览器地址栏里敲一行字也是一种 HTTP 请求。

### SDK：让管家代办

SDK (Software Development Kit) 就像是餐厅派给你的专属管家。

你不需要自己填单子、贴邮票。你只需要跟管家说"来份宫保鸡丁"，管家会自己在后台帮你填单子、发请求、处理报错。

<RealWorldApiDemo />

> 能用 SDK 就用 SDK，把麻烦事留给别人，把时间留给自己。

## 怎么看 API 文档？

文档就像说明书和菜单的结合体。你不需要从头读到尾，只需要学会查字典。

打开任何一个 API 文档（比如 OpenAI 或 DeepSeek），你只需要找这几样东西：

1. **Base URL**：根地址（餐厅在哪？）
2. **Authentication**：怎么证明你是会员？（通常是 `Authorization: Bearer sk-...`）
3. **Endpoints**：具体的接口列表
   - `/v1/chat/completions` -> 对话（最常用的）
   - `/v1/images/generations` -> 画图
4. **Parameters**：必填项有哪些？

<ApiDocumentDemo />

### 常见的"餐厅黑话"（状态码）

服务员（API）回复你的时候，通常会先喊一个数字代码：

| 状态码 | 含义 |
|--------|------|
| **200 OK** | 成功了 |
| **400 Bad Request** | 你填错了 |
| **401 Unauthorized** | 没权限 |
| **404 Not Found** | 地址错了 |
| **429 Too Many Requests** | 你点太快了 |
| **500 Internal Server Error** | 对方服务器崩了 |

---

## 练手场：弄坏它也没关系

光说不练假把式。这里有个模拟 API，你可以随便填参数、随便改地址，看看会发生什么。

试着触发一下 401（假装没带钱）或者 404（瞎填地址）。

<ApiPlayground />

---

## 总结

别把 API 想得太复杂。在 AI 编程的时代，你只需要记住这几件事：

1. **API 就是传声筒**，帮你把话传给 AI 模型
2. **你早就用过 API**了，从 `len()` 到 `open()`
3. **Web API 是超能力**，让你调用千里之外的超级电脑
4. **SDK 是好管家**，能用管家就别自己跑腿
5. **看文档找三样**：地址、密钥、参数

这就够了。剩下的，交给 IDE 去写吧。

---

## 名词速查表 (Glossary)

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
