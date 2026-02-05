# 后端接口设计与错误处理：请求、响应与状态码结构

> 💡 **学习指南**：接口设计解决的是"客户端和服务端如何对话"，错误处理解决的是"出问题时怎么优雅地告诉用户"。本章节会围绕一个问题展开：**如何设计一套让前后端都舒服的 API 规范？**

在开始之前，建议你先补两块"基础砖"：

- **HTTP 是什么**：可以先阅读 [Web 基础](./web-basics/http.md) 的「请求-响应模型」部分。
- **REST 是什么**：如果你还不熟悉 RESTful 架构风格，可以先了解 [REST API 设计原则](https://restfulapi.net/)。

---

## 0. 引言：为什么好接口像好餐厅的点餐系统？

<RestfulDesignDemo />

想象一下你走进一家餐厅：

- 菜单（API 文档）清楚标注了每道菜的口味、配料、价格
- 服务员（HTTP 协议）用标准化的方式记录你的点餐
- 后厨（服务端）按约定流程烹饪
- 上菜时（响应）盘子摆盘规范，附带小票说明

**好的 API 设计就像这套点餐系统**——双方约定好"说什么话"、"怎么说话"、"出错怎么办"，才能高效协作。

但很多团队的真实情况是：

- 接口命名随心所欲：`/getUserData`、`/fetchUserInfo`、`/queryUserById` 并存
- 错误处理五花八门：有的返回 HTTP 状态码，有的返回 `code: 500`，有的直接抛异常
- 响应结构千人千面：同一个项目里，有的用 `data`，有的用 `result`，有的用 `content`

**结果就是**：前后端互相猜，联调痛苦，维护成本高，新人入职一脸懵。

本章节会带你从最基础的 RESTful 设计开始，一步步掌握一套**可落地、可维护、可扩展**的 API 设计规范。

---

## 1. RESTful 设计：让你的 URL 会说话

### 1.1 什么是 RESTful？

REST（Representational State Transfer，表述性状态传递）是一种软件架构风格，由 Roy Fielding 在 2000 年提出。

**核心思想**：把网络上的所有事物都抽象为"资源"（Resource），用 URL 标识资源，用 HTTP 方法操作资源。

<ResourceAnalogy />

> 想象 URL 是一个仓库的货架地址：
> - `/warehouse/products` 是"产品区"
> - `/warehouse/products/123` 是"编号 123 的产品"
> - HTTP 方法就是你允许的操作：GET（查看）、POST（入库）、PUT（更新）、DELETE（出库）

### 1.2 URL 设计的 7 个黄金法则

<HttpMethodsDemo />

| 法则 | 正确示例 | 错误示例 | 原因 |
|------|---------|---------|------|
| **1. 用名词，不用动词** | `GET /users` | `GET /getUsers` | URL 是资源地址，不是操作 |
| **2. 用复数** | `GET /orders` | `GET /order` | 一致性好，表示集合 |
| **3. 小写字母** | `/user-profiles` | `/UserProfiles` | URL 大小写敏感，统一小写避免混乱 |
| **4. 用连字符分隔** | `/user-profiles` | `/user_profiles` | 连字符是 URL 规范，下划线在某些场景会转义 |
| **5. 避免层级过深** | `/users/123/orders` | `/users/123/orders/456/items/789/status` | 超过 3 层考虑用查询参数或重构 |
| **6. 用查询参数过滤** | `GET /products?category=phone&price_max=5000` | `GET /products/category/phone/price/5000` | 过滤条件多且变，不适合放路径 |
| **7. 版本号放 URL** | `/v1/users` 或 `v1.users.api.com` | 混用新旧接口无版本 | 便于灰度发布和向后兼容 |

### 1.3 HTTP 方法的选择

| 方法 | 用途 | 幂等性* | 安全性** | 典型场景 |
|------|------|---------|---------|---------|
| **GET** | 获取资源 | 是 | 是 | 查询列表、查看详情 |
| **POST** | 创建资源 | 否 | 否 | 新增用户、提交订单 |
| **PUT** | 全量更新 | 是 | 否 | 替换整个用户资料 |
| **PATCH** | 部分更新 | 否 | 否 | 修改用户昵称（只传一个字段） |
| **DELETE** | 删除资源 | 是 | 否 | 删除用户、取消订单 |

> *幂等性：多次执行结果相同。比如 PUT 同一个资源 10 次，结果还是那一个资源。
> **安全性：不会改变服务器状态。GET 是安全的，POST/PUT/DELETE 都不安全。

### 1.4 实战示例：电商系统的 RESTful API

```
# 用户模块
GET    /v1/users                    # 获取用户列表（支持分页、过滤）
POST   /v1/users                    # 创建新用户
GET    /v1/users/{id}               # 获取用户详情
PUT    /v1/users/{id}               # 全量更新用户信息
PATCH  /v1/users/{id}               # 部分更新（如：修改密码）
DELETE /v1/users/{id}               # 删除用户

# 订单模块（嵌套资源，最多 3 层）
GET    /v1/users/{id}/orders         # 获取某用户的所有订单
POST   /v1/users/{id}/orders         # 为用户创建订单
GET    /v1/orders/{orderId}         # 获取订单详情（扁平化，避免过深）
PATCH  /v1/orders/{orderId}/status   # 更新订单状态（子资源操作）

# 商品模块（复杂过滤用查询参数）
GET    /v1/products?category=electronics&price_min=100&price_max=5000&sort=price_desc&page=2&page_size=20

# 复杂报表（特殊场景，URL 可带动词）
POST   /v1/reports/sales/export      # 导出销售报表（非纯 CRUD，动词可接受）
```

---

## 2. 状态码：让错误"会说话"

### 2.1 为什么状态码很重要？

<StatusCodeDemo />

想象一下，如果你的 API 不管成功失败都返回 `200 OK`，客户端该怎么判断？

```json
// 错误的做法：HTTP 200，但业务失败
HTTP/1.1 200 OK
{
  "success": false,
  "error": "用户不存在"
}
```

**问题在哪？**
- 缓存层（CDN、浏览器）会缓存这个"成功的"响应
- 监控工具以为一切正常
- 前端需要额外解析 JSON 才知道有没有错

**正确的做法**：用 HTTP 状态码表示传输层状态，和业务成功/失败解耦。

### 2.2 常用状态码速查表

| 状态码 | 含义 | 使用场景 | 响应体内容 |
|--------|------|---------|-----------|
| **2xx 成功** ||||
| 200 OK | 通用成功 | GET 查询成功、PUT/PATCH 更新成功 | 资源数据 |
| 201 Created | 创建成功 | POST 创建资源成功 | 新资源数据 + Location 头 |
| 202 Accepted | 已接受 | 异步任务提交成功（如：导出报表） | 任务状态/轮询地址 |
| 204 No Content | 无内容 | DELETE 删除成功、PUT 更新但无需返回数据 | 空 |
| **3xx 重定向** ||||
| 301 Moved Permanently | 永久重定向 | 资源 URL 永久变更（如：v1 废弃，跳转 v2） | 新 URL |
| 302 Found | 临时重定向 | 临时跳转（较少用于 API） | 临时 URL |
| 304 Not Modified | 未修改 | 缓存有效（配合 If-None-Match/If-Modified-Since） | 空（用缓存） |
| **4xx 客户端错误** ||||
| 400 Bad Request | 请求格式错误 | 参数缺失、JSON 格式错误、字段类型不对 | 错误详情 |
| 401 Unauthorized | 未认证 | 缺少 Token、Token 过期、签名错误 | 认证方式说明 |
| 403 Forbidden | 禁止访问 | 已登录但无权限（如：普通用户访问管理员接口） | 无权限说明 |
| 404 Not Found | 资源不存在 | URL 错误、资源已删除 | 错误详情 |
| 405 Method Not Allowed | 方法不允许 | 如：对只读资源调用 POST | 允许的 Methods |
| 409 Conflict | 资源冲突 | 重复创建（唯一约束冲突）、乐观锁版本冲突 | 冲突详情 |
| 422 Unprocessable Entity | 语义错误 | 请求格式对，但业务校验失败（如：密码太短） | 校验错误详情 |
| 429 Too Many Requests | 请求过多 | 触发限流（Rate Limiting） | 重试时间 |
| **5xx 服务端错误** ||||
| 500 Internal Server Error | 服务器内部错误 | 未捕获的异常、代码 bug | 错误 ID（不要暴露堆栈） |
| 502 Bad Gateway | 网关错误 | 反向代理（Nginx）无法连接到后端服务 | - |
| 503 Service Unavailable | 服务不可用 | 服务正在维护、过载保护触发 | 恢复时间估计 |
| 504 Gateway Timeout | 网关超时 | 后端响应太慢，被代理层切断 | - |

### 2.3 状态码使用的"避坑指南"

**坑 1：所有错误都用 400**
```
❌ GET /users/999  → 400 (用户不存在应该返回 404)
❌ POST /login 密码错误 → 400 (应该返回 401 或 422)
❌ 删除已删除的资源 → 400 (应该返回 404 或 204)
```

**坑 2：业务状态混在 HTTP 状态码里**
```
❌ 订单支付失败 → 402 Payment Required (这个状态码是为数字钱包预留的，不要滥用)
✅ 订单支付失败 → 200 OK + body: { "code": "PAYMENT_FAILED", "message": "余额不足" }
```

**坑 3：暴露敏感信息**
```
❌ 500 响应里返回完整的堆栈跟踪、SQL 查询语句、数据库连接信息
✅ 只返回 "错误 ID"，详细日志记录到服务器，通过错误 ID 关联
```

---

## 3. 请求与响应：标准化的数据契约

### 3.1 请求结构设计

<RequestStructureDemo />

**HTTP 请求由 3 部分组成**：

```http
# 1. 请求行（方法 + URL + 协议版本）
POST /v1/users HTTP/1.1

# 2. 请求头（元数据）
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
X-Request-ID: req-123456789
Accept: application/json
Accept-Language: zh-CN,zh;q=0.9

# 3. 请求体（仅 POST/PUT/PATCH 需要）
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "phone": "13800138000"
}
```

#### 查询参数设计规范

```http
# 分页（必须）
GET /products?page=1&page_size=20

# 排序（可选）
GET /products?sort=created_at&order=desc

# 过滤（可选，支持多种操作符）
GET /products?price_min=100&price_max=5000          # 范围
GET /products?category=electronics,clothing         # 多选（IN）
GET /products?status=active&is_featured=true         # 布尔
GET /products?search=iPhone                         # 全文搜索

# 字段选择（可选，减少数据传输）
GET /products?fields=id,name,price,image

# 组合使用
GET /products?page=1&page_size=20&sort=price&order=asc&category=electronics&price_max=5000&fields=id,name,price
```

#### 请求头设计规范

| 头部字段 | 用途 | 示例 | 是否必需 |
|---------|------|------|---------|
| `Authorization` | 认证信息 | `Bearer eyJhbGciOiJIUzI1NiIs...` | 受保护接口必需 |
| `Content-Type` | 请求体格式 | `application/json` | POST/PUT/PATCH 必需 |
| `Accept` | 期望响应格式 | `application/json` | 建议携带 |
| `Accept-Language` | 期望语言 | `zh-CN,zh;q=0.9,en;q=0.8` | 多语言应用必需 |
| `X-Request-ID` | 请求唯一标识 | `req-550e8400-e29b-41d4-a716-446655440000` | 建议携带，便于追踪 |
| `X-Client-Version` | 客户端版本 | `iOS-2.5.1` / `Web-3.0.0` | 建议携带，便于问题排查 |
| `If-None-Match` | 缓存校验 | `"abc123"` | 可选，用于乐观并发控制 |

### 3.2 响应结构设计

<ResponseStructureDemo />

**标准化响应结构**（无论成功与否，结构一致）：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "request_id": "req-123456789",
  "timestamp": "2024-01-15T09:30:00.000Z"
}
```

#### 响应字段说明

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `code` | integer | 业务状态码，`0` 表示成功，非 `0` 表示失败 | `0`, `10001`, `20003` |
| `message` | string | 状态描述，成功时为 `"success"`，失败时为错误描述 | `"success"`, `"用户不存在"` |
| `data` | any | 业务数据，成功时返回具体数据，失败时可返回 `null` 或错误详情 | `{ "id": 1, "name": "张三" }` |
| `request_id` | string | 请求唯一标识，用于问题追踪 | `"req-550e8400-e29b-41d4-a716-446655440000"` |
| `timestamp` | string | 响应时间戳，ISO 8601 格式 | `"2024-01-15T09:30:00.000Z"` |

#### 分页响应结构

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      { "id": 1, "name": "商品A", "price": 100 },
      { "id": 2, "name": "商品B", "price": 200 }
    ],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total": 156,
      "total_pages": 8,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

#### 批量操作响应结构

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "success_count": 8,
    "fail_count": 2,
    "details": [
      { "id": 1, "status": "success", "message": "操作成功" },
      { "id": 2, "status": "success", "message": "操作成功" },
      { "id": 3, "status": "failed", "code": 40001, "message": "用户不存在" },
      { "id": 4, "status": "failed", "code": 40002, "message": "状态不允许操作" }
    ]
  }
}
```

---

## 4. 错误处理：优雅地"拒绝"

### 4.1 为什么错误处理如此重要？

<ErrorHandlingDemo />

一个好的错误处理机制，能让客户端"看状态码就知道怎么回事"，而不是去猜。

**错误的示范**：
```json
HTTP/1.1 200 OK
{
  "error": "出错了"
}
```
问题：
- HTTP 状态码说"成功"，但业务说"出错"
- 错误信息太笼统，无法定位问题
- 没有错误代码，难以程序化判断

**正确的示范**：
```json
HTTP/1.1 422 Unprocessable Entity
{
  "code": 20003,
  "message": "密码强度不足",
  "errors": [
    {
      "field": "password",
      "code": "VALIDATION_ERROR",
      "message": "密码必须包含至少 1 个大写字母、1 个小写字母、1 个数字，且长度至少 8 位"
    }
  ],
  "request_id": "req-550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T09:30:00.000Z",
  "help_url": "https://docs.example.com/errors/20003"
}
```

### 4.2 错误码设计规范

#### 分层错误码体系

```
错误码格式：1XXYY
- 第 1 位（1）：固定，表示错误
- 第 2-3 位（XX）：模块/层次
- 第 4-5 位（YY）：具体错误
```

| 模块代码 | 模块名称 | 说明 |
|---------|---------|------|
| 00 | 通用 | 系统级、通用错误 |
| 10 | 用户模块 | 注册、登录、用户信息相关 |
| 11 | 认证授权 | Token、权限相关 |
| 20 | 商品模块 | 商品 CRUD、库存相关 |
| 30 | 订单模块 | 下单、支付、物流相关 |
| 40 | 支付模块 | 支付渠道、退款相关 |
| 50 | 营销模块 | 优惠券、活动相关 |
| 90 | 第三方服务 | 短信、邮件、云存储等 |

#### 错误码定义示例

```javascript
// 通用错误 (00XXX)
const CommonErrors = {
  UNKNOWN_ERROR: { code: 10000, message: '未知错误', httpStatus: 500 },
  INVALID_PARAMETER: { code: 10001, message: '参数错误', httpStatus: 400 },
  RESOURCE_NOT_FOUND: { code: 10002, message: '资源不存在', httpStatus: 404 },
  METHOD_NOT_ALLOWED: { code: 10003, message: '请求方法不允许', httpStatus: 405 },
  REQUEST_TIMEOUT: { code: 10004, message: '请求超时', httpStatus: 408 },
  RATE_LIMIT_EXCEEDED: { code: 10005, message: '请求过于频繁', httpStatus: 429 },
  INTERNAL_SERVER_ERROR: { code: 10006, message: '服务器内部错误', httpStatus: 500 },
  SERVICE_UNAVAILABLE: { code: 10007, message: '服务不可用', httpStatus: 503 },
}

// 用户模块错误 (10XXX)
const UserErrors = {
  USER_NOT_FOUND: { code: 10010, message: '用户不存在', httpStatus: 404 },
  USER_ALREADY_EXISTS: { code: 10011, message: '用户已存在', httpStatus: 409 },
  INVALID_EMAIL_FORMAT: { code: 10012, message: '邮箱格式不正确', httpStatus: 422 },
  INVALID_PHONE_FORMAT: { code: 10013, message: '手机号格式不正确', httpStatus: 422 },
  PASSWORD_TOO_WEAK: { code: 10014, message: '密码强度不足', httpStatus: 422 },
  PASSWORD_MISMATCH: { code: 10015, message: '两次输入的密码不一致', httpStatus: 422 },
  USER_ACCOUNT_DISABLED: { code: 10016, message: '账号已被禁用', httpStatus: 403 },
  USER_ACCOUNT_LOCKED: { code: 10017, message: '账号已被锁定', httpStatus: 403 },
}

// 认证授权错误 (11XXX)
const AuthErrors = {
  TOKEN_MISSING: { code: 10018, message: '缺少认证令牌', httpStatus: 401 },
  TOKEN_INVALID: { code: 10019, message: '无效的认证令牌', httpStatus: 401 },
  TOKEN_EXPIRED: { code: 10020, message: '认证令牌已过期', httpStatus: 401 },
  INSUFFICIENT_PERMISSIONS: { code: 10021, message: '权限不足', httpStatus: 403 },
  REFRESH_TOKEN_EXPIRED: { code: 10022, message: '刷新令牌已过期', httpStatus: 401 },
}
```

### 4.3 多字段校验错误处理

当表单有多个字段错误时，应该一次性返回所有错误：

```json
HTTP/1.1 422 Unprocessable Entity
{
  "code": 10001,
  "message": "参数校验失败",
  "errors": [
    {
      "field": "email",
      "code": "INVALID_FORMAT",
      "message": "邮箱格式不正确",
      "value": "not-an-email"
    },
    {
      "field": "password",
      "code": "TOO_SHORT",
      "message": "密码长度不能少于 8 位",
      "value": "(hidden)",
      "constraints": {
        "min": 8,
        "max": 32
      }
    },
    {
      "field": "age",
      "code": "OUT_OF_RANGE",
      "message": "年龄必须在 18-120 之间",
      "value": 15,
      "constraints": {
        "min": 18,
        "max": 120
      }
    }
  ],
  "request_id": "req-550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T09:30:00.000Z"
}
```

---

## 5. 版本控制：API 的"向后兼容"

### 5.1 为什么要做 API 版本控制？

<VersioningStrategyDemo />

场景：你的电商系统已经上线，App 有 100 万用户。现在需要修改订单接口，添加一个新字段，同时废弃一个旧字段。

**如果不做版本控制**：
- 新 App 调用新接口 → 正常工作
- 旧 App 调用新接口 → 字段缺失，崩溃
- 用户投诉 → 老板震怒 → 你背锅

**正确的做法**：
```
/v1/orders  - 旧接口，继续服务旧 App
/v2/orders  - 新接口，新功能在这里
```

旧 App 继续调用 `/v1/orders`，新功能上线不会崩。等旧 App 用户都升级了，再考虑废弃 v1。

### 5.2 4 种版本控制策略

| 策略 | 示例 | 优点 | 缺点 | 推荐度 |
|------|------|------|------|--------|
| **URL Path** | `/v1/users` | 最直观、易于缓存、文档清晰 | URL 变化 | ⭐⭐⭐⭐⭐ |
| **Header** | `API-Version: v1` | URL 不变 | 不直观，难以缓存，需要读 Header 文档 | ⭐⭐⭐ |
| **Content Negotiation** | `Accept: application/vnd.api.v1+json` | 标准 HTTP 规范 | 复杂，理解成本高 | ⭐⭐ |
| **Query Parameter** | `/users?version=v1` | 简单 | 不专业，容易被忽视，缓存麻烦 | ⭐ |

**推荐做法**：URL Path 版本控制，简单直观，行业主流。

```
# 推荐的 URL 结构
https://api.example.com/v1/users
https://api.example.com/v2/users

# 或者使用子域名（大型系统）
https://v1.api.example.com/users
https://v2.api.example.com/users

# 不推荐的做法
https://api.example.com/users?version=v1  (Query 参数)
https://api.example.com/users  (Header: API-Version: v1)
```

### 5.3 版本演进策略

#### 语义化版本（SemVer）在 API 中的应用

```
API 版本格式：v{主版本}.{次版本}

- 主版本（v1, v2, v3）：破坏性变更，不向后兼容
- 次版本（v1.1, v1.2）：新增功能，向后兼容

实际使用：
- 通常只保留主版本在 URL：/v1/users, /v2/users
- 次版本通过文档和 Header 标注：X-API-Revision: 1.3
```

#### 版本演进示例

```
时间线：

2023-01: 发布 v1
  GET /v1/users → 返回 { id, name, email }

2023-06: v1 新增字段（向后兼容）
  GET /v1/users → 返回 { id, name, email, phone }  ✓ 旧客户端仍能正常工作

2024-01: 破坏性变更，发布 v2
  GET /v2/users → 返回 {
    user_id,           # id 改为 user_id
    full_name,         # name 改为 full_name
    email_address,     # email 改为 email_address
    contact_phone,     # phone 改为 contact_phone
    created_at         # 新增字段
  }

  同时：
  - v1 标记为 Deprecated，继续服务 6 个月
  - 在响应头添加：Deprecation: true, Sunset: Wed, 30 Jun 2024 00:00:00 GMT

2024-07: 正式下线 v1
  GET /v1/users → 410 Gone
  {
    "code": 10002,
    "message": "API v1 已停用，请升级到 v2",
    "help_url": "https://docs.example.com/migration/v1-to-v2"
  }
```

---

## 6. 文档规范：让接口"活"在文档里

### 6.1 为什么 API 文档容易过时？

<DocumentationDemo />

传统文档的问题：
- 接口变更后，文档没人更新
- 文档和代码"各说各话"
- 前端联调时，发现实际接口和文档不一致

**解决方案**：
1. **代码即文档**：使用 Swagger/OpenAPI 注解，从代码自动生成文档
2. **契约先行**：API 变更必须同时更新文档，代码审查时检查
3. **Mock 服务**：文档即 Mock，前端不用等后端完成就能开发

### 6.2 OpenAPI 规范示例

```yaml
openapi: 3.0.3
info:
  title: 电商系统 API
  description: |
    提供用户、商品、订单等模块的接口服务。

    ## 认证方式
    所有需要认证的接口都需要在 Header 中携带 `Authorization: Bearer {token}`
  version: 1.0.0
  contact:
    name: API Support
    email: api@example.com

servers:
  - url: https://api.example.com/v1
    description: 生产环境
  - url: https://staging-api.example.com/v1
    description: 测试环境

paths:
  /users:
    get:
      summary: 获取用户列表
      description: 支持分页、排序和过滤
      tags:
        - 用户管理
      parameters:
        - name: page
          in: query
          description: 页码，从 1 开始
          schema:
            type: integer
            default: 1
            minimum: 1
        - name: page_size
          in: query
          description: 每页数量
          schema:
            type: integer
            default: 20
            minimum: 1
            maximum: 100
        - name: sort
          in: query
          description: 排序字段
          schema:
            type: string
            enum: [created_at, updated_at, name]
            default: created_at
        - name: order
          in: query
          description: 排序方向
          schema:
            type: string
            enum: [asc, desc]
            default: desc
        - name: status
          in: query
          description: 按状态过滤
          schema:
            type: string
            enum: [active, inactive, suspended]
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserListResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/TooManyRequests'

    post:
      summary: 创建用户
      description: 注册新用户
      tags:
        - 用户管理
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
            examples:
              success:
                summary: 正常请求
                value:
                  name: "张三"
                  email: "zhangsan@example.com"
                  phone: "13800138000"
                  password: "SecurePass123!"
      responses:
        '201':
          description: 创建成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          $ref: '#/components/responses/Conflict'

  /users/{userId}:
    get:
      summary: 获取用户详情
      tags:
        - 用户管理
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
          description: 用户 ID
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '404':
          $ref: '#/components/responses/NotFound'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          description: 用户唯一标识
          example: 1
        name:
          type: string
          description: 用户姓名
          example: "张三"
        email:
          type: string
          format: email
          description: 邮箱地址
          example: "zhangsan@example.com"
        phone:
          type: string
          description: 手机号
          example: "13800138000"
        status:
          type: string
          enum: [active, inactive, suspended]
          description: 账号状态
          example: "active"
        created_at:
          type: string
          format: date-time
          description: 创建时间
          example: "2024-01-15T09:30:00.000Z"
        updated_at:
          type: string
          format: date-time
          description: 更新时间
          example: "2024-01-15T09:30:00.000Z"
      required:
        - id
        - name
        - email
        - status
        - created_at
        - updated_at

    UserResponse:
      type: object
      properties:
        code:
          type: integer
          example: 0
        message:
          type: string
          example: "success"
        data:
          $ref: '#/components/schemas/User'

    UserListResponse:
      type: object
      properties:
        code:
          type: integer
          example: 0
        message:
          type: string
          example: "success"
        data:
          type: object
          properties:
            list:
              type: array
              items:
                $ref: '#/components/schemas/User'
            pagination:
              type: object
              properties:
                page:
                  type: integer
                  example: 1
                page_size:
                  type: integer
                  example: 20
                total:
                  type: integer
                  example: 156
                total_pages:
                  type: integer
                  example: 8
                has_next:
                  type: boolean
                  example: true
                has_prev:
                  type: boolean
                  example: false

    CreateUserRequest:
      type: object
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 50
          description: 用户姓名
          example: "张三"
        email:
          type: string
          format: email
          description: 邮箱地址
          example: "zhangsan@example.com"
        phone:
          type: string
          pattern: '^1[3-9]\\d{9}$'
          description: 手机号
          example: "13800138000"
        password:
          type: string
          minLength: 8
          description: 密码
          example: "SecurePass123!"
      required:
        - name
        - email
        - password

    Error:
      type: object
      properties:
        code:
          type: integer
          description: 业务错误码
          example: 10001
        message:
          type: string
          description: 错误描述
          example: "参数校验失败"
        errors:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
                example: "email"
              code:
                type: string
                example: "INVALID_FORMAT"
              message:
                type: string
                example: "邮箱格式不正确"
        request_id:
          type: string
          example: "req-550e8400-e29b-41d4-a716-446655440000"
        timestamp:
          type: string
          format: date-time
          example: "2024-01-15T09:30:00.000Z"
        help_url:
          type: string
          example: "https://docs.example.com/errors/10001"

  responses:
    BadRequest:
      description: 请求参数错误
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: 10001
            message: "参数校验失败"
            errors:
              - field: "email"
                code: "INVALID_FORMAT"
                message: "邮箱格式不正确"
            request_id: "req-550e8400-e29b-41d4-a716-446655440000"
            timestamp: "2024-01-15T09:30:00.000Z"

    Unauthorized:
      description: 未认证或认证失败
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: 10018
            message: "无效的认证令牌"
            request_id: "req-550e8400-e29b-41d4-a716-446655440000"
            timestamp: "2024-01-15T09:30:00.000Z"

    Forbidden:
      description: 无权限访问
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: 10021
            message: "权限不足，需要管理员权限"
            request_id: "req-550e8400-e29b-41d4-a716-446655440000"
            timestamp: "2024-01-15T09:30:00.000Z"

    NotFound:
      description: 资源不存在
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: 10002
            message: "用户不存在"
            request_id: "req-550e8400-e29b-41d4-a716-446655440000"
            timestamp: "2024-01-15T09:30:00.000Z"

    Conflict:
      description: 资源冲突
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: 10011
            message: "用户已存在"
            request_id: "req-550e8400-e29b-41d4-a716-446655440000"
            timestamp: "2024-01-15T09:30:00.000Z"

    TooManyRequests:
      description: 请求过于频繁
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: 10005
            message: "请求过于频繁，请稍后再试"
            request_id: "req-550e8400-e29b-41d4-a716-446655440000"
            timestamp: "2024-01-15T09:30:00.000Z"
```

---

## 7. 总结：API 设计 checklist

### 设计阶段

- [ ] URL 设计符合 RESTful 规范（名词、复数、小写、连字符）
- [ ] HTTP 方法使用正确（GET/POST/PUT/PATCH/DELETE）
- [ ] 状态码选择恰当（2xx/4xx/5xx 区分清楚）
- [ ] 错误码体系设计完成（分层、易扩展）
- [ ] 响应结构标准化（code/message/data 统一）
- [ ] 版本控制策略确定（URL Path 推荐）
- [ ] 分页/排序/过滤参数设计统一

### 实现阶段

- [ ] 所有接口都有完善的 OpenAPI 文档
- [ ] 参数校验规则清晰（类型、长度、必填）
- [ ] 敏感信息脱敏处理（密码、Token 等）
- [ ] 错误日志记录完整（带 request_id）
- [ ] 接口性能监控到位（响应时间、错误率）
- [ ] 限流熔断策略配置（防刷、降级）

### 维护阶段

- [ ] 接口变更走评审流程（兼容性检查）
- [ ] 废弃接口有明确的 Sunset 计划
- [ ] 客户端接入文档及时更新
- [ ] 错误码文档随代码同步维护

---

## 名词对照表

| 英文术语 | 中文对照 | 解释 |
|---------|---------|------|
| **REST** | 表述性状态传递 | 一种软件架构风格，用 URL 标识资源，用 HTTP 方法操作资源 |
| **RESTful** | 符合 REST 规范的 | 遵循 REST 架构风格设计的 API |
| **Endpoint** | 端点 | API 的具体 URL 地址，如 `/users` |
| **Resource** | 资源 | REST 架构中的核心概念，网络上的任何事物都可抽象为资源 |
| **URI** | 统一资源标识符 | 标识资源的字符串，URL 是 URI 的一种 |
| **HTTP Method** | HTTP 方法 | GET、POST、PUT、PATCH、DELETE 等 |
| **Status Code** | 状态码 | HTTP 响应中的 3 位数字，表示请求的处理结果 |
| **Payload** | 载荷 | HTTP 请求或响应的主体数据 |
| **Header** | 头部 | HTTP 请求或响应的元数据 |
| **Query String** | 查询字符串 | URL 中 `?` 后面的参数部分 |
| **Path Parameter** | 路径参数 | URL 路径中的变量，如 `/users/{id}` |
| **Pagination** | 分页 | 大数据量时分批返回的机制 |
| **Idempotency** | 幂等性 | 多次执行结果相同的特性 |
| **Deprecation** | 弃用 | 标记即将废弃的功能或接口 |
| **Backward Compatibility** | 向后兼容 | 新版本兼容旧版本的接口调用 |
| **Rate Limiting** | 限流 | 控制单位时间内的请求数量 |
| **OpenAPI** | 开放 API 规范 | 描述 REST API 的标准格式（原 Swagger） |
| **SDK** | 软件开发工具包 | 封装 API 调用的开发工具包 |
