# HTTP 协议：前后端的"通信语言"

::: tip 🎯 核心问题
**HTTP 是如何工作的？** 这就像问：两个人如何对话？需要约定语言、语法、对话规则。HTTP 就是前后端之间的"对话协议"。
:::

---

## 0. HTTP 的本质

**HTTP**（HyperText Transfer Protocol，超文本传输协议）是前后端通信的基础协议。

### 0.1 用对话来类比

| 对话要素 | HTTP 对应 | 说明 |
| :--- | :--- | :--- |
| 语言 | HTTP 协议 | 双方都能理解的语言 |
| 语法 | 请求/响应格式 | 怎么"说话" |
| 流程 | 请求-响应模式 | 一问一答 |
| 结束 | 挂断 | TCP 连接关闭 |

---

## 1. HTTP 的发展历程

HTTP 从 1991 年诞生至今，经历了多次重大升级。

<HttpProtocolDemo />

### 1.1 版本对比

| 版本 | 年份 | 核心改进 | 典型特征 |
| :--- | :--- | :--- | :--- |
| **HTTP/0.9** | 1991 | 仅支持 GET | 纯文本，只有请求，无响应头 |
| **HTTP/1.0** | 1996 | 增加 POST/HEAD | 每个请求一个 TCP 连接 |
| **HTTP/1.1** | 1997 | 持久连接 | Keep-Alive，一个连接多个请求 |
| **HTTP/2** | 2015 | 多路复用 | 二进制帧，头部压缩 |
| **HTTP/3** | 2022 | 基于 QUIC | UDP 传输，解决队头阻塞 |

::: tip 💡 为什么需要 HTTP/2？
HTTP/1.1 虽然支持持久连接，但请求必须串行发送（前一个请求的响应返回后，才能发送下一个请求）。HTTP/2 通过多路复用解决了这个问题，可以同时发送多个请求。
:::

---

## 2. HTTP 请求的结构

### 2.1 请求行

```http
GET /api/users/123 HTTP/1.1
```

包含三个部分：
- **方法**：GET、POST、PUT、DELETE 等
- **URL**：请求的资源路径
- **版本**：HTTP/1.1 或 HTTP/2

### 2.2 请求头

```http
Host: api.example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer xxx
Content-Type: application/json
Content-Length: 45
```

常见请求头：
| 头部 | 说明 | 示例 |
| :--- | :--- | :--- |
| **Host** | 服务器域名 | `api.example.com` |
| **User-Agent** | 客户端信息 | `Mozilla/5.0` |
| **Accept** | 接受的响应类型 | `application/json` |
| **Authorization** | 认证信息 | `Bearer token` |
| **Content-Type** | 请求体类型 | `application/json` |

### 2.3 请求体

```json
{
  "name": "张三",
  "email": "zhangsan@example.com"
}
```

只有 POST、PUT、PATCH 等方法才有请求体。

---

## 3. HTTP 响应的结构

### 3.1 状态行

```http
HTTP/1.1 200 OK
```

包含三个部分：
- **版本**：HTTP/1.1
- **状态码**：200、404、500 等
- **状态文本**：OK、Not Found 等

### 3.2 响应头

```http
Content-Type: application/json
Content-Length: 156
Cache-Control: max-age=3600
Set-Cookie: session=xxx; HttpOnly
```

常见响应头：
| 头部 | 说明 | 示例 |
| :--- | :--- | :--- |
| **Content-Type** | 响应体类型 | `application/json` |
| **Content-Length** | 响应体大小 | `156` |
| **Cache-Control** | 缓存策略 | `max-age=3600` |
| **Set-Cookie** | 设置 Cookie | `session=xxx` |

### 3.3 响应体

```json
{
  "code": 0,
  "data": {
    "id": 123,
    "name": "张三"
  }
}
```

---

## 4. HTTP 方法详解

| 方法 | 用途 | 请求体 | 幂等性 | 安全性 |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | 获取资源 | 无 | 是 | 是 |
| **POST** | 创建资源 | 有 | 否 | 否 |
| **PUT** | 全量更新 | 有 | 是 | 否 |
| **PATCH** | 部分更新 | 有 | 否 | 否 |
| **DELETE** | 删除资源 | 无 | 是 | 否 |
| **HEAD** | 获取头部 | 无 | 是 | 是 |
| **OPTIONS** | 查询支持的方法 | 无 | 是 | 是 |

### 4.1 GET vs POST

| 特性 | GET | POST |
| :--- | :--- | :--- |
| **参数位置** | URL 查询参数 | 请求体 |
| **缓存** | 可缓存 | 默认不缓存 |
| **书签** | 可添加为书签 | 不可 |
| **历史记录** | 保存在浏览器历史 | 不保存 |
| **数据长度** | 有限制（URL 长度） | 无限制 |
| **安全性** | 参数可见在 URL | 参数在请求体中 |

::: tip 💡 何时使用 GET/POST？
- **GET**：查询、获取数据
- **POST**：创建、提交数据
- **PUT**：全量更新（替换整个资源）
- **PATCH**：部分更新（只修改指定字段）
- **DELETE**：删除资源
:::

---

## 5. HTTP 状态码

### 5.1 状态码分类

| 分类 | 说明 | 典型状态码 |
| :--- | :--- | :--- |
| **2xx** | 成功 | 200 OK、201 Created、204 No Content |
| **3xx** | 重定向 | 301 永久、302 临时、304 未修改 |
| **4xx** | 客户端错误 | 400 参数错误、401 未认证、404 不存在 |
| **5xx** | 服务端错误 | 500 内部错误、503 不可用 |

### 5.2 常用状态码

| 状态码 | 说明 | 使用场景 |
| :--- | :--- | :--- |
| **200 OK** | 请求成功 | GET、PUT 请求成功 |
| **201 Created** | 创建成功 | POST 创建资源成功 |
| **204 No Content** | 无内容 | DELETE 删除成功 |
| **301 Moved Permanently** | 永久重定向 | URL 永久变更 |
| **302 Found** | 临时重定向 | URL 临时变更 |
| **304 Not Modified** | 未修改 | 缓存有效 |
| **400 Bad Request** | 参数错误 | 请求参数格式错误 |
| **401 Unauthorized** | 未认证 | 需要登录 |
| **403 Forbidden** | 无权限 | 已登录但权限不足 |
| **404 Not Found** | 不存在 | 资源不存在 |
| **500 Internal Server Error** | 内部错误 | 服务器异常 |
| **503 Service Unavailable** | 不可用 | 服务器维护或过载 |

---

## 6. HTTPS：安全的 HTTP

### 6.1 HTTP vs HTTPS

| 特性 | HTTP | HTTPS |
| :--- | :--- | :--- |
| **协议** | TCP | TCP + SSL/TLS |
| **端口** | 80 | 443 |
| **数据** | 明文传输 | 加密传输 |
| **证书** | 不需要 | 需要 SSL 证书 |
| **性能** | 略快 | 略慢（握手开销） |
| **SEO** | 无影响 | 搜索引擎优先收录 |

### 6.2 HTTPS 的工作流程

1. **Client Hello**：客户端发送支持的加密套件
2. **Server Hello**：服务器返回证书和选定的加密套件
3. **验证证书**：客户端验证服务器证书的有效性
4. **密钥交换**：使用非对称加密交换会话密钥
5. **加密通信**：使用会话密钥进行对称加密通信

::: tip 💡 HTTPS 的优势
- **防窃听**：数据加密，第三方无法读取
- **防篡改**：数据完整性校验
- **防冒充**：SSL 证书验证服务器身份
:::

---

## 7. HTTP 缓存机制

### 7.1 缓存头

| 头部 | 说明 | 示例 |
| :--- | :--- | :--- |
| **Cache-Control** | 缓存策略 | `max-age=3600` |
| **ETag** | 资源版本号 | `"33a64df551425fcc"` |
| **Last-Modified** | 最后修改时间 | `Wed, 21 Oct 2015 07:28:00 GMT` |

### 7.2 缓存策略

**强缓存**：
```http
Cache-Control: max-age=3600
```
在 3600 秒内，浏览器直接使用缓存，不发送请求。

**协商缓存**：
```http
ETag: "33a64df551425fcc"
```
浏览器发送 `If-None-Match`，服务器返回 304（未修改）或 200（已修改）。

---

## 8. 常见问题

### 8.1 GET 和 POST 的本质区别

**误区**：GET 和 POST 的区别只是参数位置不同。

**真相**：
- GET 是幂等的，多次请求结果相同
- POST 是非幂等的，多次请求可能创建多个资源
- GET 可被缓存，POST 默认不缓存
- GET 可被书签保存，POST 不可

### 8.2 HTTP/1.1 的队头阻塞

**问题**：HTTP/1.1 虽然支持持久连接，但请求必须串行发送。前一个请求响应慢，后续请求都要等待。

**解决方案**：
- HTTP/2 多路复用
- 域名分片（多个域名建立多个连接）
- 连接池（限制并发数）

### 8.3 HTTP/2 的优势

| 特性 | HTTP/1.1 | HTTP/2 |
| :--- | :--- | :--- |
| **传输格式** | 文本 | 二进制帧 |
| **多路复用** | 不支持 | 支持 |
| **头部压缩** | 无 | HPACK 算法 |
| **服务器推送** | 不支持 | 支持 |

---

## 名词速查表

| 名词 | 英文 | 解释 |
| :--- | :--- | :--- |
| **HTTP** | HyperText Transfer Protocol | 超文本传输协议 |
| **HTTPS** | HTTP Secure | HTTP + SSL/TLS |
| **TCP** | Transmission Control Protocol | 传输控制协议 |
| **SSL/TLS** | Secure Sockets Layer | 安全套接层 |
| **幂等性** | Idempotent | 多次请求结果相同 |
| **持久连接** | Keep-Alive | 一个 TCP 连接发送多个请求 |
| **多路复用** | Multiplexing | 同时发送多个请求 |
| **队头阻塞** | Head-of-Line Blocking | 前面的请求阻塞后面的请求 |
