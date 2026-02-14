# API 设计与错误处理:请求、响应与状态码结构

::: tip 🎯 核心问题
**前后端如何高效对话?** 这就像问:餐厅的菜单怎么设计,客人一看就懂?服务员怎么记单,不会出错?上菜怎么规范,客人满意?API 设计解决的就是"对话规则"的问题。
:::

---

## 1. 为什么要"API 设计"?

### 1.1 从混乱到规范

想象一下你走进一家餐厅:

- **菜单(API 文档)**:清楚标注了每道菜的口味、配料、价格
- **服务员(HTTP 协议)**:用标准化的方式记录你的点餐
- **后厨(服务端)**:按约定流程烹饪
- **上菜(响应)**:盘子摆盘规范,附带小票说明

**好的 API 设计就像这套点餐系统**——双方约定好"说什么话"、"怎么说话"、"出错怎么办",才能高效协作。

但很多团队的真实情况是:

- 接口命名随心所欲:`/getUserData`、`/fetchUserInfo`、`/queryUserById` 并存
- 错误处理五花八门:有的返回 HTTP 状态码,有的返回 `code: 500`,有的直接抛异常
- 响应结构千人千面:同一个项目里,有的用 `data`,有的用 `result`,有的用 `content`

<RestfulDesignDemo />

**结果就是**:前后端互相猜,联调痛苦,维护成本高,新人入职一脸懵。

::: tip 💡 通俗解释
**API**(Application Programming Interface,应用程序编程接口)就像"餐厅的服务协议":

- **RESTful** = 餐厅点餐:有菜单、有流程、有规范
- **GraphQL** = 自助餐:想要什么,自己组合
- **gRPC** = 快递:二进制格式,速度最快

**为什么需要设计?**

- 没有设计 = 服务员随机记单 → 后厨看不懂、客人等半天
- 有设计 = 标准化流程 → 效率高、错误少
  :::

---

## 2. RESTful 设计:让你的 URL 会说话

### 2.1 什么是 RESTful?

**REST**(Representational State Transfer,表述性状态传递)是一种软件架构风格,由 Roy Fielding 在 2000 年提出。

**核心思想**:把网络上的所有事物都抽象为"资源"(Resource),用 URL 标识资源,用 HTTP 方法操作资源。

<ResourceAnalogyDemo />

::: tip 💡 资源是什么?
**资源**(Resource)是 REST 架构的核心概念:

- 有唯一标识(URL)
- 有表达方式(JSON/XML/HTML)
- 有操作方法(GET/POST/PUT/DELETE)

**比喻**:

- URL 是"仓库的货架地址":`/warehouse/products` 是"产品区"
- HTTP 方法是"允许的操作":GET(查看)、POST(入库)、PUT(更新)、DELETE(出库)

**关键点**:

- URL 是名词,不是动词:`/users` 而不是 `/getUsers`
- HTTP 方法已经表达了操作,不需要在 URL 里重复
  :::

### 2.2 URL 设计的 7 个黄金法则

<HttpMethodsDemo />

| 法则                   | 正确示例                                      | 错误示例                                  | 原因                                     |
| ---------------------- | --------------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **1. 用名词,不用动词** | `GET /users`                                  | `GET /getUsers`                           | URL 是资源地址,不是操作                  |
| **2. 用复数**          | `GET /orders`                                 | `GET /order`                              | 一致性好,表示集合                        |
| **3. 小写字母**        | `/user-profiles`                              | `/UserProfiles`                           | URL 大小写敏感,统一小写避免混乱          |
| **4. 用连字符**        | `/user-profiles`                              | `/user_profiles`                          | 连字符是 URL 规范,下划线在某些场景会转义 |
| **5. 避免层级过深**    | `/users/123/orders`                           | `/users/123/orders/456/items/789/status`  | 超过 3 层考虑用查询参数或重构            |
| **6. 用查询参数过滤**  | `GET /products?category=phone&price_max=5000` | `GET /products/category/phone/price/5000` | 过滤条件多且变动,不适合放路径            |
| **7. 版本号放 URL**    | `/v1/users` 或 `v1.users.api.com`             | 混用新旧接口无版本                        | 便于灰度发布和向后兼容                   |

::: tip 📊 从表格中你能看到什么?
**规则 1-4**是"一致性"原则:

- 统一名词、复数、大小写,让团队所有人写的 URL 风格一致
- 减少认知负担,一眼就知道这是什么资源

**规则 5-6**是"灵活性"原则:

- 层级太深 = 耦心度太高,难以维护
- 查询参数 = 更灵活,可以组合任意过滤条件

**规则 7**是"兼容性"原则:

- API 是长期契约,不能随意改
- 版本号让新旧接口并存,平滑升级
  :::

### 2.3 HTTP 方法的选择

| 方法       | 用途     | 幂等性\* | 安全性\*\* | 典型场景                   |
| ---------- | -------- | -------- | ---------- | -------------------------- |
| **GET**    | 获取资源 | 是       | 是         | 查询列表、查看详情         |
| **POST**   | 创建资源 | 否       | 否         | 新增用户、提交订单         |
| **PUT**    | 全量更新 | 是       | 否         | 替换整个用户资料           |
| **PATCH**  | 部分更新 | 否       | 否         | 修改用户昵称(只传一个字段) |
| **DELETE** | 删除资源 | 是       | 否         | 删除用户、取消订单         |

> **\*幂等性**:多次执行结果相同。比如 PUT 同一个资源 10 次,结果还是那一个资源。\***\*安全性**:不会改变服务器状态。GET 是安全的,POST/PUT/DELETE 都不安全。

::: details 🔧 幂等性为什么重要?
**场景**:用户点击"支付"按钮,但网络延迟,用户又点了一次。

- **幂等的操作**(PUT/DELETE):点击 10 次和点击 1 次,结果相同。不会重复扣款。
- **不幂等的操作**(POST):点击 10 次,可能创建 10 个订单。

**解决方案**:

- **客户端**:按钮点击后禁用,防止重复提交
- **服务端**:POST 操作用唯一 ID 校验,避免重复处理

**关键点**:幂等性是分布式系统正确性的重要保证。
:::

### 2.4 实战示例:电商系统的 RESTful API

```
# 用户模块
GET    /v1/users                    # 获取用户列表(支持分页、过滤)
POST   /v1/users                    # 创建新用户
GET    /v1/users/{id}               # 获取用户详情
PUT    /v1/users/{id}               # 全量更新用户信息
PATCH  /v1/users/{id}               # 部分更新(如:修改密码)
DELETE /v1/users/{id}               # 删除用户

# 订单模块(嵌套资源,最多 3 层)
GET    /v1/users/{id}/orders         # 获取某用户的所有订单
POST   /v1/users/{id}/orders         # 为用户创建订单
GET    /v1/orders/{orderId}         # 获取订单详情(扁平化,避免过深)
PATCH  /v1/orders/{orderId}/status   # 更新订单状态(子资源操作)

# 商品模块(复杂过滤用查询参数)
GET    /v1/products?category=electronics&price_min=100&price_max=5000&sort=price_desc&page=2&page_size=20

# 复杂报表(特殊场景,URL 可带动词)
POST   /v1/reports/sales/export      # 导出销售报表(非纯 CRUD,动词可接受)
```

---

## 3. 状态码:让错误"会说话"

### 3.1 为什么状态码很重要?

<StatusCodeDemo />

想象一下,如果你的 API 不管成功失败都返回 `200 OK`,客户端该怎么判断?

```json
// ❌ 错误的做法:HTTP 200,但业务失败
HTTP/1.1 200 OK
{
  "success": false,
  "error": "用户不存在"
}
```

**问题在哪?**

- 缓存层(CDN、浏览器)会缓存这个"成功的"响应
- 监控工具以为一切正常
- 前端需要额外解析 JSON 才知道有没有错

**正确的做法**:用 HTTP 状态码表示传输层状态,和业务成功/失败解耦。

### 3.2 常用状态码速查表

| 状态码                    | 含义           | 使用场景                                       | 响应体内容               |
| ------------------------- | -------------- | ---------------------------------------------- | ------------------------ | --- |
| **2xx 成功**              |                |                                                |                          |     |
| 200 OK                    | 通用成功       | GET 查询成功、PUT/PATCH 更新成功               | 资源数据                 |
| 201 Created               | 创建成功       | POST 创建资源成功                              | 新资源数据 + Location 头 |
| 202 Accepted              | 已接受         | 异步任务提交成功(如:导出报表)                  | 任务状态/轮询地址        |
| 204 No Content            | 无内容         | DELETE 删除成功、PUT 更新但无需返回数据        | 空(用缓存)               |
| **3xx 重定向**            |                |                                                |                          |     |
| 301 Moved Permanently     | 永久重定向     | 资源 URL 永久变更(如:v1 废弃,跳转 v2)          | 新 URL                   |
| 302 Found                 | 临时重定向     | 临时跳转(较少用于 API)                         | 临时 URL                 |
| 304 Not Modified          | 未修改         | 缓存有效(配合 If-None-Match/If-Modified-Since) | 空(用缓存)               |
| **4xx 客户端错误**        |                |                                                |                          |     |
| 400 Bad Request           | 请求格式错误   | 参数缺失、JSON 格式错误、字段类型不对          | 错误详情                 |
| 401 Unauthorized          | 未认证         | 缺少 Token、Token 过期、签名错误               | 认证方式说明             |
| 403 Forbidden             | 禁止访问       | 已登录但无权限(如:普通用户访问管理员接口)      | 无权限说明               |
| 404 Not Found             | 资源不存在     | URL 错误、资源已删除                           | 错误详情                 |
| 405 Method Not Allowed    | 方法不允许     | 如:对只读资源调用 POST                         | 允许的 Methods           |
| 409 Conflict              | 资源冲突       | 重复创建(唯一约束冲突)、乐观锁版本冲突         | 冲突详情                 |
| 422 Unprocessable Entity  | 语义错误       | 请求格式对,但业务校验失败(如:密码太短)         | 校验错误详情             |
| 429 Too Many Requests     | 请求过多       | 触发限流(Rate Limiting)                        | 重试时间                 |
| **5xx 服务端错误**        |                |                                                |                          |     |
| 500 Internal Server Error | 服务器内部错误 | 未捕获的异常、代码 bug                         | 错误 ID(不要暴露堆栈)    |
| 502 Bad Gateway           | 网关错误       | 反向代理(Nginx)无法连接到后端服务              | -                        |
| 503 Service Unavailable   | 服务不可用     | 服务正在维护、过载保护触发                     | 恢复时间估计             |
| 504 Gateway Timeout       | 网关超时       | 后端响应太慢,被代理层切断                      | -                        |

::: tip 📊 从表格中你能看到什么?
**2xx(成功)** vs **3xx(重定向)** vs **4xx(客户端错误)** vs **5xx(服务端错误)**:

- **2xx**:一切正常,客户端可以继续
- **3xx**:资源换地方了,告诉客户端去哪找
- **4xx**:客户端搞错了,修正请求后重试
- **5xx**:服务端出问题了,客户端等一等再试,或者联系管理员

**关键点**:正确的状态码让客户端、浏览器、CDN、监控工具都能正确理解响应。
:::

### 3.3 状态码使用的"避坑指南"

**坑 1:所有错误都用 400**

```
❌ GET /users/999  → 400 (用户不存在应该返回 404)
❌ POST /login 密码错误 → 400 (应该返回 401 或 422)
❌ 删除已删除的资源 → 400 (应该返回 404 或 204)
```

**坑 2:业务状态混在 HTTP 状态码里**

```
❌ 订单支付失败 → 402 Payment Required (这个状态码是为数字钱包预留的,不要滥用)
✅ 订单支付失败 → 200 OK + body: { "code": "PAYMENT_FAILED", "message": "余额不足" }
```

**坑 3:暴露敏感信息**

```
❌ 500 响应里返回完整的堆栈跟踪、SQL 查询语句、数据库连接信息
✅ 只返回 "错误 ID",详细日志记录到服务器,通过错误 ID 关联
```

---

## 4. 请求与响应:标准化的数据契约

### 4.1 请求结构设计

<RequestStructureDemo />

**HTTP 请求由 3 部分组成**:

```http
# 1. 请求行(方法 + URL + 协议版本)
POST /v1/users HTTP/1.1

# 2. 请求头(元数据)
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
X-Request-ID: req-123456789
Accept: application/json
Accept-Language: zh-CN,zh;q=0.9

# 3. 请求体(仅 POST/PUT/PATCH 需要)
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "phone": "13800138000"
}
```

#### 查询参数设计规范

```http
# 分页(必须)
GET /products?page=1&page_size=20

# 排序(可选)
GET /products?sort=created_at&order=desc

# 过滤(可选,支持多种操作符)
GET /products?price_min=100&price_max=5000          # 范围
GET /products?category=electronics,clothing         # 多选(IN)
GET /products?status=active&is_featured=true         # 布尔
GET /products?search=iphone                         # 全文搜索

# 字段选择(可选,减少数据传输)
GET /products?fields=id,name,price

# 组合使用
GET /products?page=1&page_size=20&sort=price&order=asc&category=electronics&price_max=5000&fields=id,name,price
```

#### 请求头设计规范

| 头部字段           | 用途         | 示例                                      | 是否必需              |
| ------------------ | ------------ | ----------------------------------------- | --------------------- |
| `Authorization`    | 认证信息     | `Bearer eyJhbGciOiJIUzI1NiIs...`          | 受保护接口必需        |
| `Content-Type`     | 请求体格式   | `application/json`                        | POST/PUT/PATCH 必需   |
| `Accept`           | 期望响应格式 | `application/json`                        | 建议携带              |
| `Accept-Language`  | 期望语言     | `zh-CN,zh;q=0.9,en;q=0.8`                 | 多语言应用必需        |
| `X-Request-ID`     | 请求唯一标识 | `req-550e8400-e29b-41d4-a716-44665544000` | 建议携带,便于追踪     |
| `X-Client-Version` | 客户端版本   | `iOS-2.5.1` / `Web-3.0.0`                 | 建议携带,便于问题排查 |
| `If-None-Match`    | 缓存校验     | `"abc123"`                                | 可选,用于乐观并发控制 |

### 4.2 响应结构设计

<ResponseStructureDemo />

**标准化响应结构**(无论成功与否,结构一致):

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

| 字段         | 类型    | 说明                                                       | 示例                                        |
| ------------ | ------- | ---------------------------------------------------------- | ------------------------------------------- |
| `code`       | integer | 业务状态码,`0` 表示成功,非 `0` 表示失败                    | `0`, `10001`, `20003`                       |
| `message`    | string  | 状态描述,成功时为 `"success"`,失败时为错误描述             | `"success"`, `"用户不存在"`                 |
| `data`       | any     | 业务数据,成功时返回具体数据,失败时可返回 `null` 或错误详情 | `{ "id": 1, "name": "张三" }`               |
| `request_id` | string  | 请求唯一标识,用于问题追踪                                  | `"req-550e8400-e29b-41d4-a716-44665544000"` |
| `timestamp`  | string  | 响应时间戳,ISO 8601 格式                                   | `"2024-01-15T09:30:00.000Z"`                |

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

::: tip 💡 为什么要 request_id?
**request_id** 是问题追踪的关键:

1. **用户反馈**:"支付失败,错误 ID 是 abc123"
   → 技术人员直接在日志里搜索 abc123,立即定位问题

2. **分布式追踪**:
   - 请求经过 API Gateway → Service A → Service B
   - 每个服务都记录相同的 request_id
   - 日志系统可以把所有相关日志聚合起来

3. **性能分析**:
   - 统计某个 request_id 的完整链路耗时

- 发现瓶颈在哪个服务

**关键点**:request_id 是可观测性的基础,没有它,分布式系统的问题排查是地狱模式。
:::

---

## 5. 错误处理:优雅地"拒绝"

### 5.1 为什么错误处理如此重要?

<ErrorHandlingDemo />

一个好的错误处理机制,能让客户端"看状态码就知道怎么回事",而不是去猜。

**错误的示范**:

```json
HTTP/1.1 200 OK
{
  "error": "出错了"
}
```

**问题**:

- HTTP 状态码说"成功",但业务说"出错"
- 错误信息太笼统,无法定位问题
- 没有错误代码,难以程序化判断

**正确的示范**:

```json
HTTP/1.1 422 Unprocessable Entity
{
  "code": 20003,
  "message": "密码强度不足",
  "errors": [
    {
      "field": "password",
      "code": "VALIDATION_ERROR",
      "message": "密码必须包含至少 1 个大写字母、1 个小写字母、1 个数字,且长度至少 8 位"
    }
  ],
  "request_id": "req-550e8400-e29b-41d4-a716-44665544000",
  "timestamp": "2024-01-15T09:30:00.000Z",
  "help_url": "https://docs.example.com/errors/20003"
}
```

### 5.2 错误码设计规范

::: tip 💡 错误码的分层设计
**分层错误码**的好处:

- **可程序化判断**:前端根据 `code` 字段决定行为,而不是解析 `message`
- **国际化友好**:`code` 不变,`message` 可以根据用户语言返回不同文本
- **文档化**:每个错误码都有文档,开发者可以查

**结构**:1XXYY

- 第 1 位(1):固定,表示错误
- 第 2-3 位(XX):模块/层次
- 第 3-4 位(YY):具体错误

**示例**:

- `10001`:通用错误(参数错误)
- `10010`:用户模块(用户不存在)
- `20003`:业务错误(密码强度不足)
  :::

#### 分层错误码体系

```
错误码格式:1XXYY
- 第 1 位(1):固定,表示错误
- 第 2-3 位(XX):模块/层次
- 第 4-5 位(YY):具体错误
```

| 模块代码 | 模块名称   | 说明                     |
| -------- | ---------- | ------------------------ |
| 00       | 通用       | 系统级、通用错误         |
| 10       | 用户模块   | 注册、登录、用户信息相关 |
| 11       | 认证授权   | Token、权限相关          |
| 20       | 商品模块   | 商品 CRUD、库存相关      |
| 30       | 订单模块   | 下单、支付、物流相关     |
| 40       | 支付模块   | 支付渠道、退款相关       |
| 50       | 营销模块   | 优惠券、活动相关         |
| 90       | 第三方服务 | 短信、邮件、云存储等     |

---

## 6. 版本控制:API 的"向后兼容"

### 6.1 为什么要做 API 版本控制?

<VersioningStrategyDemo />

场景:你的电商系统已经上线,App 有 100 万用户。现在需要修改订单接口,添加一个新字段,同时废弃一个旧字段。

**如果不做版本控制**:

- 新 App 调用新接口 → 正常工作
- 旧 App 调用新接口 → 字段缺失,崩溃
- 用户投诉 → 老板震怒 → 你背锅

**正确的做法**:

```
/v1/orders  - 旧接口,继续服务旧 App
/v2/orders  - 新接口,新功能在这里
```

旧 App 继续调用 `/v1/orders`,新功能上线不会崩。等旧 App 用户都升级了,再考虑废弃 v1。

### 6.2 4 种版本控制策略

| 策略                    | 示例                                  | 优点                       | 缺点                               | 推荐度   |
| ----------------------- | ------------------------------------- | -------------------------- | ---------------------------------- | -------- |
| **URL Path**            | `/v1/users`                           | 最直观、易于缓存、文档清晰 | URL 变化                           | ⭐⭐⭐⭐ |
| **Header**              | `API-Version: v1`                     | URL 不变                   | 不直观,难以缓存,需要读 Header 文档 | ⭐⭐     |
| **Content Negotiation** | `Accept: application/vnd.api.v1+json` | 标准 HTTP 规范             | 复杂,理解成本高                    | ⭐⭐     |
| **Query Parameter**     | `/users?version=v1`                   | 简单                       | 不专业,容易被忽视,缓存麻烦         | ⭐       |

**推荐做法**:URL Path 版本控制,简单直观,行业主流。

---

## 7. 总结:API 设计 checklist

### 7.1 设计阶段

- [ ] URL 设计符合 RESTful 规范(名词、复数、小写、连字符)
- [ ] HTTP 方法使用正确(GET/POST/PUT/PATCH/DELETE)
- [ ] 状态码选择恰当(2xx/4xx/5xx 区分清楚)
- [ ] 错误码体系设计完成(分层、易扩展)
- [ ] 响应结构标准化(code/message/data 统一)
- [ ] 版本控制策略确定(URL Path 推荐)
- [ ] 分页/排序/过滤参数设计统一

### 7.2 实现阶段

- [ ] 所有接口都有完善的 OpenAPI 文档
- [ ] 参数校验规则清晰(类型、长度、必填)
- [ ] 敏感信息脱敏处理(密码、Token 等)
- [ ] 错误日志记录完整(带 request_id)
- [ ] 接口性能监控到位(响应时间、错误率)
- [ ] 限流熔断策略配置(防刷、降级)

### 7.3 维护阶段

- [ ] 接口变更走评审流程(兼容性检查)
- [ ] 废弃接口有明确的 Sunset 计划
- [ ] 客户端接入文档及时更新
- [ ] 错误码文档随代码同步维护

---

## 8. 名词对照表

| 英文术语                   | 中文对照         | 解释                                                  |
| -------------------------- | ---------------- | ----------------------------------------------------- |
| **REST**                   | 表述性状态传递   | 一种软件架构风格,用 URL 标识资源,用 HTTP 方法操作资源 |
| **RESTful**                | 符合 REST 规范的 | 遵循 REST 架构风格设计的 API                          |
| **Endpoint**               | 端点             | API 的具体 URL 地址,如 `/users`                       |
| **Resource**               | 资源             | REST 架构中的核心概念,网络上的任何事物都可抽象为资源  |
| **URI**                    | 统一资源标识符   | 标识资源的字符串,URL 是 URI 的一种                    |
| **HTTP Method**            | HTTP 方法        | GET、POST、PUT、PATCH、DELETE 等                      |
| **Status Code**            | 状态码           | HTTP 响应中的 3 位数字,表示请求的处理结果             |
| **Payload**                | 载荷             | HTTP 请求或响应的主体数据                             |
| **Header**                 | 头部             | HTTP 请求或响应的元数据                               |
| **Query String**           | 查询字符串       | URL 中 `?` 后面的参数部分                             |
| **Path Parameter**         | 路径参数         | URL 路径中的变量,如 `/users/{id}`                     |
| **Pagination**             | 分页             | 大数据量时分批返回的机制                              |
| **Idempotency**            | 幂等性           | 多次执行结果相同的特性                                |
| **Deprecation**            | 弃用             | 标记即将废弃的功能或接口                              |
| **Backward Compatibility** | 向后兼容         | 新版本兼容旧版本的接口调用                            |
| **Rate Limiting**          | 限流             | 限制单位时间内的请求数量                              |
| **OpenAPI**                | 开放 API 规范    | 描述 REST API 的标准格式(原 Swagger)                  |
| **SDK**                    | 软件开发工具包   | 封装 API 调用的开发工具包                             |
