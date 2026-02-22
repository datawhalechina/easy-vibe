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

## 2. RESTful 设计：让 URL 会说话

**REST**（Representational State Transfer）是一种架构风格，核心思想是：

- 把网络上的事物抽象为"资源"（Resource）
- 用 URL 标识资源
- 用 HTTP 方法操作资源

### 2.1 用仓库来类比

| 仓库概念 | REST 对应 | 示例 |
| :--- | :--- | :--- |
| 货架地址 | URL | `/users`、`/orders` |
| 操作方式 | HTTP 方法 | GET（查看）、POST（入库） |
| 货物 | 资源 | 用户数据、订单数据 |

**关键原则**：URL 是名词，不是动词。

### 2.2 URL 设计规则

👇 **动手试试看**：点击下方按钮，查看 RESTful URL 的正确与错误写法对比：

<RestfulUrlDemo />

### 2.3 HTTP 方法选择

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

## 3. 状态码：让错误"会说话"

HTTP 状态码是服务器告诉客户端"发生了什么"的标准方式。

### 3.1 状态码分类

| 分类 | 含义 | 典型状态码 |
| :--- | :--- | :--- |
| **2xx** | 成功 | 200 OK、201 Created、204 No Content |
| **3xx** | 重定向 | 301 永久移动、304 未修改 |
| **4xx** | 客户端错误 | 400 参数错误、401 未认证、404 不存在 |
| **5xx** | 服务端错误 | 500 内部错误、503 服务不可用 |

### 3.2 常用状态码演示

👇 **动手试试看**：点击下方按钮，了解常见状态码的含义：

<StatusCodeDemo />

---

## 4. 错误处理：优雅地"拒绝"

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

### 4.2 正确的错误处理演示

👇 **动手试试看**：对比"好的"和"差的"错误响应设计：

<ErrorHandlingDemo />

---

## 5. 版本控制：API 的"向后兼容"

### 5.1 为什么要版本控制？

场景：你的 App 有 100 万用户，需要修改订单接口。

**如果不做版本控制**：
- 新 App 调用新接口 → 正常
- 旧 App 调用新接口 → 字段缺失，崩溃！

**正确的做法**：
- `/v1/orders` - 旧接口，继续服务旧 App
- `/v2/orders` - 新接口，新功能在这里

### 5.2 版本控制策略

| 策略 | 示例 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- |
| **URL 路径** | `/v1/users` | 直观、易缓存 | URL 变长 |
| **请求头** | `Accept: vnd.api.v2+json` | URL 干净 | 不便调试 |
| **查询参数** | `/users?version=2` | 简单 | 不够标准 |

### 5.3 版本控制演示

👇 **动手试试看**：了解 API 版本控制的策略和最佳实践：

<ApiVersioningDemo />

---

## 6. 响应结构：标准化的"数据契约"

无论成功还是失败，响应结构应该保持一致：

### 6.1 标准响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "request_id": "req-550e8400",
  "timestamp": "2024-01-15T09:30:00.000Z"
}
```

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `code` | number | 业务状态码，0 表示成功 |
| `message` | string | 状态描述 |
| `data` | any | 业务数据 |
| `request_id` | string | 请求唯一标识，用于问题追踪 |
| `timestamp` | string | 响应时间戳 |

### 6.2 分页响应格式

```json
{
  "code": 0,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total": 156,
      "total_pages": 8
    }
  }
}
```

::: tip 💡 为什么要 request_id？
**request_id** 是问题追踪的关键：

1. 用户反馈："支付失败，错误 ID 是 abc123"
2. 技术人员直接在日志里搜索 abc123，立即定位问题
3. 分布式系统中，每个服务都记录相同的 request_id，可以把所有相关日志聚合起来
:::

---

## 7. 实战：电商系统 API 设计示例

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
