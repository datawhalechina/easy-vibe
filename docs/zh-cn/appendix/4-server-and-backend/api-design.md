# API 设计：前后端的"对话协议"

::: tip 🎯 核心问题
**前后端如何高效对话？** 这就像问：餐厅的菜单怎么设计，客人一看就懂？服务员怎么记单，不会出错？上菜怎么规范，客人满意？API 设计解决的就是"对话规则"的问题。
:::

---

## 0. 先问一个问题：你有没有经历过这些噩梦？

**场景一：接口命名随心所欲**

```
GET /getUserData
GET /fetchUserInfo
GET /queryUserById
GET /users/query
```

四个接口，功能一样，命名风格完全不同。新人入职一脸懵：我该用哪个？

**场景二：错误处理五花八门**

```json
// 有的返回 HTTP 状态码
HTTP/1.1 404 Not Found

// 有的返回 200 + code
HTTP/1.1 200 OK
{ "code": 404, "message": "用户不存在" }

// 有的直接抛异常
HTTP/1.1 200 OK
{ "error": "出错了" }
```

前端不知道该怎么判断请求是否成功。

**场景三：响应结构千人千面**

```json
// 接口 A
{ "data": { ... } }

// 接口 B
{ "result": { ... } }

// 接口 C
{ "content": { ... } }
```

每个接口返回格式都不一样，前端需要针对每个接口单独处理。

---

**好的 API 设计就像餐厅的点餐系统**——菜单清晰、流程规范、出错有提示。

---

## 1. 什么是 API？

**API**（Application Programming Interface，应用程序编程接口）就是"程序之间对话的约定"。

### 1.1 用餐厅来类比

| 餐厅角色 | 对应概念 | 说明 |
| :--- | :--- | :--- |
| 菜单 | API 文档 | 告诉你有哪些"菜"可以点 |
| 服务员 | HTTP 协议 | 标准化的"对话方式" |
| 后厨 | 服务端 | 按"订单"处理请求 |
| 上菜 | 响应 | 把结果返回给"客人" |

### 1.2 一个完整的 API 请求

👇 **动手试试看**：点击下方按钮，观察一次完整的 API 请求-响应流程：

<ApiRequestDemo />

---

## 2. API 设计哲学：RPC / REST / GraphQL / gRPC

在开始具体的 RESTful 设计之前，先了解四种主流的 API 设计风格：

<ApiStyleCompare />

### 2.1 REST vs RESTful：有什么区别？

很多人会混淆这两个概念：

| 概念 | 含义 | 说明 |
| :--- | :--- | :--- |
| **REST** | 一种架构风格 | 由 Roy Fielding 提出的设计理念，包含一组约束条件 |
| **RESTful** | 符合 REST 风格的 | 形容词，表示 API 设计遵循了 REST 原则 |

**类比**：
- REST 就像"极简主义"——一种设计理念
- RESTful API 就像"极简风格的房间"——应用了这个理念的具体实现

**REST 的六大约束**：

| 约束 | 说明 |
| :--- | :--- |
| **客户端-服务器分离** | 前后端独立开发，接口解耦 |
| **无状态** | 每个请求包含所有必要信息，服务器不保存会话状态 |
| **可缓存** | 响应应标明是否可缓存，提高性能 |
| **统一接口** | 使用标准的 HTTP 方法和状态码 |
| **分层系统** | 客户端无需知道连接的是哪层服务器 |
| **按需代码**（可选） | 服务器可以扩展客户端功能 |

::: tip 💡 为什么 REST 最常用？
1. **学习成本低**：HTTP 协议本身就体现了 REST 思想
2. **生态成熟**：工具、框架、文档丰富
3. **通用性强**：任何语言、任何平台都能调用
4. **易于缓存**：GET 请求天然可缓存，CDN 友好
:::

---

## 3. RESTful 设计：让 URL 会说话

**REST**（Representational State Transfer）是一种架构风格，核心思想是：

- 把网络上的事物抽象为"资源"（Resource）
- 用 URL 标识资源
- 用 HTTP 方法操作资源

### 3.1 用仓库来类比

| 仓库概念 | REST 对应 | 示例 |
| :--- | :--- | :--- |
| 货架地址 | URL | `/users`、`/orders` |
| 操作方式 | HTTP 方法 | GET（查看）、POST（入库） |
| 货物 | 资源 | 用户数据、订单数据 |

**关键原则**：URL 是名词，不是动词。

### 3.2 URL 设计规则

| 规则 | 错误示例 | 正确示例 | 说明 |
| :--- | :--- | :--- | :--- |
| 用名词不用动词 | `/getUsers` | `/users` | URL 表示资源，HTTP 方法表示操作 |
| 用复数形式 | `/user` | `/users` | 统一复数风格 |
| 小写+连字符 | `/UserProfiles` | `/user-profiles` | URL 大小写敏感 |
| 避免层级过深 | `/a/b/c/d/e` | `/a/b/c` | 最多 3 层 |
| 过滤用查询参数 | `/products/phone/5000` | `/products?cat=phone` | 过滤条件用 `?` 参数 |

::: tip 💡 URL 大小写敏感
统一用小写 + 连字符（-）是最安全的做法，避免大小写混乱和下划线风格不一致的问题。
:::

### 3.3 HTTP 方法选择

| 方法 | 用途 | 幂等性 | 安全性 | 典型场景 |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | 获取资源 | 是 | 是 | 查询列表、查看详情 |
| **POST** | 创建资源 | 否 | 否 | 新增用户、提交订单 |
| **PUT** | 全量更新 | 是 | 否 | 替换整个用户资料 |
| **PATCH** | 部分更新 | 否 | 否 | 只修改昵称 |
| **DELETE** | 删除资源 | 是 | 否 | 删除用户、取消订单 |

::: tip 💡 什么是幂等性？
**幂等性**：多次执行结果相同。

- **幂等的操作**（GET/PUT/DELETE）：点 10 次和点 1 次，结果一样
- **不幂等的操作**（POST）：点 10 次，可能创建 10 个订单

**解决方案**：POST 操作用唯一 ID 校验，避免重复处理。
:::

---

## 4. 状态码：让错误"会说话"

HTTP 状态码是服务器告诉客户端"发生了什么"的标准方式。

### 4.1 状态码分类

| 分类 | 含义 | 典型状态码 |
| :--- | :--- | :--- |
| **2xx** | 成功 | 200 OK、201 Created、204 No Content |
| **3xx** | 重定向 | 301 永久移动、304 未修改 |
| **4xx** | 客户端错误 | 400 参数错误、401 未认证、404 不存在 |
| **5xx** | 服务端错误 | 500 内部错误、503 服务不可用 |

### 4.2 常用状态码演示

👇 **动手试试看**：点击下方按钮，了解常见状态码的含义：

<StatusCodeDemo />

---

## 5. 错误处理：优雅地"拒绝"

好的错误处理能让客户端"看状态码就知道怎么回事"，而不是去猜。

### 4.1 错误处理的"避坑指南"

**坑 1：所有错误都返回 200**

```json
// ❌ 错误做法
HTTP/1.1 200 OK
{ "error": "出错了" }
```

问题：缓存层会缓存这个"成功"响应，监控系统发现不了问题。

**坑 2：错误信息太笼统**

```json
// ❌ 错误做法
HTTP/1.1 400 Bad Request
{ "message": "参数错误" }
```

问题：客户端不知道哪个参数错了、为什么错。

**坑 3：暴露敏感信息**

```json
// ❌ 危险做法
HTTP/1.1 500 Internal Server Error
{ "stack": "at UserService.login...", "sql": "SELECT * FROM..." }
```

危险：暴露了代码结构、数据库查询，攻击者可以利用这些信息。

### 5.2 正确的错误处理演示

👇 **动手试试看**：对比"好的"和"差的"错误响应设计：

<ErrorHandlingDemo />

---

## 6. 版本控制：API 的"向后兼容"

### 6.1 为什么要版本控制？

场景：你的 App 有 100 万用户，需要修改订单接口。

**如果不做版本控制**：
- 新 App 调用新接口 → 正常
- 旧 App 调用新接口 → 字段缺失，崩溃！

**正确的做法**：
- `/v1/orders` - 旧接口，继续服务旧 App
- `/v2/orders` - 新接口，新功能在这里

### 6.2 版本控制策略

| 策略 | 示例 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- |
| **URL 路径** | `/v1/users` | 直观、易缓存 | URL 变长 |
| **请求头** | `Accept: vnd.api.v2+json` | URL 干净 | 不便调试 |
| **查询参数** | `/users?version=2` | 简单 | 不够标准 |

### 6.3 版本演进示例

以用户接口为例，展示 v1 到 v2 的演进：

| 接口 | v1（旧版） | v2（新版） | 变化说明 |
| :--- | :--- | :--- | :--- |
| **获取用户** | `GET /v1/users`<br>返回：`name, email` | `GET /v2/users`<br>返回：`name, email, avatar, phone` | 新增头像、手机号字段 |
| **创建订单** | `POST /v1/orders`<br>接收：`items[]` | `POST /v2/orders`<br>接收：`items[], coupons[]` | 新增优惠券支持 |
| **批量操作** | 无 | `POST /v2/orders/batch` | 新增批量创建接口 |

::: tip 💡 版本控制最佳实践
- **保持向后兼容**：v1 接口至少维护 6-12 个月，给客户端升级时间
- **文档同步更新**：每个版本有独立的 API 文档
- **废弃公告**：提前通知 v1 将在何时下线，引导迁移
- **监控使用情况**：统计 v1 调用量，确认可以安全下线后再停止服务
:::

---

## 7. 响应结构设计

响应结构是前后端协作的"数据契约"，统一格式能大幅降低沟通成本。

<ResponseStructureDemo />

### 7.1 大厂实践参考

::: details Google API 设计指南
参考 [Google API Design Guide](https://cloud.google.com/apis/design/errors)，Google 要求所有 API 错误响应必须包含 `google.rpc.Status` 消息结构：

```json
{
  "error": {
    "code": 429,
    "message": "资源不足，请稍后重试",
    "status": "RESOURCE_EXHAUSTED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "RESOURCE_AVAILABILITY",
        "domain": "compute.googleapis.com",
        "metadata": {
          "zone": "us-east1-a",
          "service": "compute"
        }
      }
    ]
  }
}
```

**核心要求**：
- 必须包含 `ErrorInfo` 提供机器可读的错误标识
- `message` 面向开发者，用简洁语言描述问题和解决方案
- `details` 数组可包含 `LocalizedMessage`（本地化消息）、`Help`（帮助链接）等
:::

::: details Microsoft REST API 指南
参考 [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md)，微软强调响应的一致性：

**错误与故障的分类**：
- **错误（Error）**：客户端传递无效数据导致，返回 4xx，不影响 API 可用性
- **故障（Fault）**：服务端无法正确响应有效请求，返回 5xx，影响 API 可用性

**响应标头规范**：
- `Date`：必须返回，使用 RFC 5322 格式（GMT 时区）
- `Content-Type`：必须返回
- `ETag`：支持乐观并发控制的资源必须返回
:::

::: details 阿里巴巴 Java 开发手册
参考 [阿里巴巴 Java 开发手册](https://developer.aliyun.com/special/tech-java)，阿里对 API 响应有以下规范：

**统一返回对象**：
```java
public class Result<T> {
    private Integer code;
    private String message;
    private T data;
    private String requestId;
}
```

**错误码分段设计**：
| 范围 | 类型 | 示例 |
| :--- | :--- | :--- |
| 0 | 成功 | 0 |
| 1xxxx | 参数错误 | 10001 缺少必填参数 |
| 2xxxx | 业务错误 | 20001 余额不足 |
| 3xxxx | 认证错误 | 30001 未登录 |
| 5xxxx | 系统错误 | 50001 数据库异常 |
:::

::: details Stripe API 响应设计
参考 [Stripe API Documentation](https://docs.stripe.com/api/errors)，Stripe 的错误响应设计非常精细：

```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "Your card was declined.",
    "param": "number",
    "decline_code": "insufficient_funds",
    "doc_url": "https://stripe.com/docs/error-codes/card-declined"
  }
}
```

**设计亮点**：
- `type` 区分错误类型：`api_error`、`card_error`、`invalid_request_error`
- `param` 指出具体哪个参数出错，前端可直接定位表单字段
- `doc_url` 提供文档链接，开发者可深入了解
- `decline_code` 提供更细粒度的错误原因
:::

::: details JSON:API 规范
参考 [JSON:API Specification](https://jsonapi.org/format/)，这是一个业界广泛采纳的 JSON API 响应规范：

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API 规范详解"
    },
    "relationships": {
      "author": {
        "data": { "type": "users", "id": "9" }
      }
    }
  },
  "included": [
    {
      "type": "users",
      "id": "9",
      "attributes": {
        "name": "张三"
      }
    }
  ]
}
```

**核心设计**：
- `data` 包含主资源，必须有 `type` 和 `id`
- `attributes` 存放资源属性
- `relationships` 描述资源关联
- `included` 避免重复请求，一次性返回关联数据
:::

::: details GitHub REST API 响应设计
参考 [GitHub REST API Documentation](https://docs.github.com/en/rest)，GitHub 的响应设计注重开发者体验：

**成功响应**：
```json
{
  "id": 1296269,
  "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "owner": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif"
  },
  "private": false,
  "html_url": "https://github.com/octocat/Hello-World"
}
```

**错误响应**：
```json
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest"
}
```

**设计亮点**：
- 响应包含多种 URL 格式（`html_url`、`url`）方便不同场景使用
- 错误响应包含 `documentation_url` 指向文档
- 使用 `Link` 响应头实现分页导航
:::

::: details Twitter/X API v2 响应设计
参考 [Twitter API v2 Documentation](https://developer.twitter.com/en/docs/twitter-api)，Twitter API v2 采用简洁的响应格式：

```json
{
  "data": {
    "id": "1460323737035677698",
    "text": "Hello, Twitter!"
  },
  "includes": {
    "users": [
      {
        "id": "2244994945",
        "name": "Twitter Dev",
        "username": "TwitterDev"
      }
    ]
  }
}
```

**设计亮点**：
- `data` 包含主数据，`includes` 包含关联数据（类似 JSON:API）
- 支持字段选择：`?tweet.fields=created_at,public_metrics`
- 分页使用 `next_token` 和 `previous_token`
:::

### 7.2 最佳实践总结

综合以上规范，响应结构设计应遵循以下原则：

1. **一致性优先**：所有接口使用相同的响应结构，前端可统一封装请求层
2. **机器可读**：错误码 + 错误原因（reason）让程序能自动处理
3. **人类友好**：message 描述清晰，包含解决建议
4. **可追踪**：request_id 贯穿请求全链路，便于问题定位
5. **国际化支持**：通过 details 扩展本地化消息

### 7.3 data 字段设计规范

`data` 是响应的核心，其设计直接影响前端开发效率。

<DataFieldDesignDemo />

### 7.4 错误响应设计进阶

<ErrorResponseDesignDemo />

::: tip 参考链接
- [Google API Design Guide - Errors](https://cloud.google.com/apis/design/errors)
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- [阿里巴巴 Java 开发手册](https://developer.aliyun.com/special/tech-java)
- [Heroku HTTP API Design Guide](https://github.com/interagent/http-api-design)
- [Stripe API - Errors](https://docs.stripe.com/api/errors)
- [JSON:API Specification](https://jsonapi.org/format/)
:::

---

## 8. 实战：电商系统 API 设计示例

```
# 用户模块
GET    /v1/users                    # 获取用户列表
POST   /v1/users                    # 创建新用户
GET    /v1/users/{id}               # 获取用户详情
PUT    /v1/users/{id}               # 全量更新用户
PATCH  /v1/users/{id}               # 部分更新用户
DELETE /v1/users/{id}               # 删除用户

# 订单模块
GET    /v1/users/{id}/orders        # 获取某用户的订单
POST   /v1/orders                   # 创建订单
GET    /v1/orders/{id}              # 获取订单详情
PATCH  /v1/orders/{id}/status       # 更新订单状态

# 商品模块（复杂过滤用查询参数）
GET    /v1/products?category=phone&price_max=5000&sort=price_desc&page=1
```

---

## 9. 用 AI 辅助设计 API

AI 可以帮助你快速生成符合规范的 API 设计。关键在于提供清晰的上下文和约束条件。

### 9.1 提示词模板

```
你是一位资深的后端架构师，精通 RESTful API 设计。请帮我设计一套 API 接口。

## 业务背景
[描述你的业务场景，例如：电商系统、博客平台、任务管理等]

## 功能需求
[列出需要的功能模块，例如：
- 用户管理：注册、登录、个人信息
- 订单管理：创建订单、查询订单、取消订单
- 商品管理：商品列表、商品详情、搜索]

## 设计要求
1. 遵循 RESTful 规范
2. URL 使用名词复数，小写+连字符
3. 正确使用 HTTP 方法（GET/POST/PUT/PATCH/DELETE）
4. 统一的响应格式：{ code, message, data, request_id }
5. 合理的状态码使用
6. 版本控制：URL 路径方式（/v1/）

## 输出格式
请按以下格式输出：

### 接口列表
| 方法 | URL | 描述 | 请求体 | 响应体 |
|------|-----|------|--------|--------|

### 请求/响应示例
[关键接口的详细示例]

### 状态码说明
[使用的状态码及其含义]
```

### 9.2 实战示例：电商订单 API

**输入提示词：**

```
你是一位资深的后端架构师，精通 RESTful API 设计。请帮我设计一套电商订单系统的 API 接口。

## 业务背景
一个 B2C 电商平台，用户可以浏览商品、下单购买、查看订单状态。

## 功能需求
- 订单模块：创建订单、查询订单列表、查询订单详情、取消订单、支付订单
- 购物车模块：添加商品、修改数量、删除商品、查看购物车

## 设计要求
1. 遵循 RESTful 规范
2. URL 使用名词复数，小写+连字符
3. 正确使用 HTTP 方法
4. 统一的响应格式
5. 版本控制：/v1/
```

**AI 输出示例：**

| 方法 | URL | 描述 |
| :--- | :--- | :--- |
| `POST` | `/v1/orders` | 创建订单 |
| `GET` | `/v1/orders` | 查询订单列表 |
| `GET` | `/v1/orders/{id}` | 查询订单详情 |
| `PATCH` | `/v1/orders/{id}/status` | 更新订单状态（取消/支付） |
| `GET` | `/v1/users/{id}/cart` | 获取购物车 |
| `POST` | `/v1/users/{id}/cart/items` | 添加商品到购物车 |
| `PATCH` | `/v1/users/{id}/cart/items/{itemId}` | 修改购物车商品数量 |
| `DELETE` | `/v1/users/{id}/cart/items/{itemId}` | 删除购物车商品 |

### 9.3 AI 辅助设计的注意事项

| 注意点 | 说明 |
| :--- | :--- |
| **提供完整上下文** | 业务背景、用户角色、数据关系都要说清楚 |
| **明确约束条件** | 命名规范、版本策略、响应格式等要提前定义 |
| **迭代优化** | 第一次输出可能不完美，追问细节、要求修改 |
| **人工审核** | AI 生成的内容需要人工检查是否符合业务需求 |
| **补充边界情况** | 让 AI 考虑错误处理、权限控制、分页等边界情况 |

::: tip 💡 追问技巧
- "请补充每个接口的错误响应示例"
- "请考虑分页、排序、过滤参数"
- "请添加接口的权限控制说明"
- "请检查是否符合 RESTful 最佳实践"
:::

---

## 名词速查表

| 名词 | 英文 | 解释 |
| :--- | :--- | :--- |
| **API** | Application Programming Interface | 程序之间对话的约定 |
| **REST** | Representational State Transfer | 一种架构风格，用 URL 标识资源 |
| **资源** | Resource | REST 架构的核心概念，有唯一标识（URL） |
| **幂等性** | Idempotency | 多次执行结果相同 |
| **状态码** | Status Code | HTTP 协议定义的响应状态 |
| **版本控制** | Versioning | 让新旧 API 并存，平滑升级 |
| **请求体** | Request Body | POST/PUT/PATCH 请求携带的数据 |
| **响应体** | Response Body | 服务器返回的数据 |
| **Header** | Header | 请求/响应的元数据（如 Content-Type） |
| **认证** | Authentication | 验证"你是谁"（登录、Token） |
| **授权** | Authorization | 验证"你能做什么"（权限） |
