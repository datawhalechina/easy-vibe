# 序列化：数据的"翻译"

::: tip 🎯 核心问题
**数据如何在网络上传输？** 这就像问：一个人说的话，如何让另一个人听懂？序列化解决的就是"数据翻译"的问题——把内存中的对象翻译成可以传输的格式。
:::

---

## 序列化数据的必要性

在前后端交互过程中，数据需要经历多次"变形"才能从服务器传递到客户端。

**场景一：前端收到的数据"变了"**

```javascript
// 后端发送
Date birth = new Date(1990, 5, 15)

// 前端收到
{ "birth": "1990-06-15T00:00:00Z" }  // 字符串！
```

前端想用 `.getFullYear()`，结果报错了——因为这不是 Date 对象，是字符串。

**场景二：中文乱码**

```json
// 期望
{ "name": "张三" }

// 实际收到
{ "name": "å¼ ä¸" }
```

字符编码问题导致中文变成乱码。

**场景三：性能瓶颈**

```json
// 一个包含 10000 条商品列表的响应
{
  "products": [
    { "id": 1, "name": "...", "description": "...", ... },
    // ... 9999 more
  ]
}
// 大小：5.2 MB，传输时间：3.5 秒
```

JSON 格式的冗余导致数据包太大，严重影响性能。

---

**序列化就像"翻译"**——把内存对象"翻译"成可以传输的格式，接收方再"翻译"回去。

---

## 1. 什么是序列化/反序列化？

**序列化**（Serialization）就是把对象转换成可传输格式的过程。

**反序列化**（Deserialization）就是把传输格式还原成对象的过程。

### 1.1 用寄快递来类比

| 寄快递 | 序列化 | 说明 |
| :--- | :--- | :--- |
| 打包物品 | 序列化 | 把物品装箱，贴上标签 |
| 运输 | 网络传输 | 快递车运送到目的地 |
| 拆包取物 | 反序列化 | 收件人打开箱子，取出物品 |

### 1.2 为什么需要序列化？

| 原因 | 说明 | 示例 |
| :--- | :--- | :--- |
| **网络传输** | 网络只能传输字节流 | API 调用、RPC 通信 |
| **持久化存储** | 磁盘只能存储字节 | 保存对象到文件、数据库 |
| **跨语言** | 不同语言的数据结构不同 | Java 对象 → Python 字典 |
| **分布式缓存** | Redis/Memcached 存储字节 | 缓存用户信息 |

---

## 2. 常见的序列化格式

👇 **动手试试看**：点击下方按钮，观察不同语言的序列化过程：

<SerializationDemo />

### 2.1 JSON：最通用

**优点**：
- 可读性好，调试方便
- 所有语言都支持
- 浏览器原生支持（`JSON.parse` / `JSON.stringify`）

**缺点**：
- 体积大（有大量 `{}` `""` 标记）
- 不支持丰富的数据类型（Date、Map、Set 会被转换成字符串）

**适用场景**：
- 公开 API
- 前后端通信
- 配置文件

### 2.2 XML：曾经的主流

```xml
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>123</id>
  <name>张三</name>
  <email>zhangsan@example.com</email>
  <age>28</age>
</user>
```

**优点**：
- 结构清晰，支持注释
- 支持复杂的嵌套结构
- 有 Schema 验证（XSD）

**缺点**：
- 体积大，解析慢
- 标签冗余（`<open></close>`）

**适用场景**：
- 配置文件（Spring、MyBatis）
- SOAP 协议
- 复杂数据交换

### 2.3 Protobuf：最高效

```protobuf
// user.proto
syntax = "proto3";
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  int32 age = 4;
}
```

**优点**：
- 体积小（比 JSON 小 30-50%）
- 速度快（解析速度快 5-10 倍）
- 向后兼容（新增字段不影响老版本）

**缺点**：
- 不可读（二进制格式）
- 需要 .proto 文件定义
- 不支持动态类型

**适用场景**：
- 微服务内部通信
- 高性能场景（游戏、实时通信）
- 移动端 App（节省流量）

### 2.4 MessagePack：兼顾可读性和性能

```json
// MessagePack 是 JSON 的二进制版本
// 相同数据，MessagePack 比 JSON 小 30% 左右
```

**优点**：
- 比 JSON 小，比 JSON 快
- 保持 JSON 的数据模型
- 支持所有 JSON 类型

**缺点**：
- 不可读
- 不如 Protobuf 高效

**适用场景**：
- 需要性能但不想用 Protobuf
- Redis 缓存
- WebSocket 消息

---

## 3. 各语言序列化方式对比

| 语言 | JSON 库 | Protobuf 库 | XML 库 |
| :--- | :--- | :--- | :--- |
| **JavaScript** | `JSON.stringify()` | `protobuf.js` | `fast-xml-parser` |
| **Python** | `json.dumps()` | `protobuf` | `xmltodict` |
| **Java** | `Jackson` / `Gson` | `protobuf-java` | `JAXB` |
| **Go** | `encoding/json` | `proto` | `encoding/xml` |
| **C++** | `nlohmann/json` | `protobuf` | `tinyxml2` |
| **C#** | `System.Text.Json` | `Google.Protobuf` | `System.Xml` |

::: tip 💡 选择建议
- **前后端通信**：JSON（调试方便）
- **微服务内部**：Protobuf（性能最优）
- **配置文件**：JSON 或 YAML
- **旧系统对接**：XML（可能别无选择）
:::

---

## 4. 性能对比

### 4.1 大小对比（以用户对象为例）

| 格式 | 大小 | 相对 JSON |
| :--- | :--- | :--- |
| JSON | 68 bytes | 100% |
| XML | 142 bytes | 209% |
| Protobuf | 38 bytes | 56% |
| MessagePack | 52 bytes | 76% |

### 4.2 速度对比（序列化 10000 次）

| 格式 | 耗时 | 相对 JSON |
| :--- | :--- | :--- |
| JSON | 45 ms | 100% |
| XML | 120 ms | 267% |
| Protobuf | 8 ms | 18% |
| MessagePack | 28 ms | 62% |

::: tip 💡 性能测试结论
- **Protobuf 最快**：适合高性能场景
- **MessagePack 次之**：比 JSON 快 40% 左右
- **JSON 最慢**：但对大多数场景已经足够
:::

---

## 5. 常见问题

### 5.1 日期序列化问题

**问题**：Date 对象序列化后变成字符串

```javascript
// 序列化前
const date = new Date('2024-01-01')

// 序列化后
JSON.stringify(date)  // "2024-01-01T00:00:00.000Z"
```

**解决方案**：
```javascript
// 方案1：转成时间戳
{ createdAt: date.getTime() }  // 1704067200000

// 方案2：转成 ISO 字符串
{ createdAt: date.toISOString() }  // "2024-01-01T00:00:00.000Z"

// 方案3：自定义序列化
JSON.stringify(obj, (key, value) => {
  if (value instanceof Date) {
    return { __type: 'Date', value: value.toISOString() }
  }
  return value
})
```

### 5.2 循环引用问题

**问题**：对象循环引用会报错

```javascript
const obj = { name: 'test' }
obj.self = obj
JSON.stringify(obj)  // TypeError: Converting circular structure to JSON
```

**解决方案**：
```javascript
// 方案1：过滤掉循环引用
const seen = new WeakSet()
JSON.stringify(obj, (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (seen.has(value)) return
    seen.add(value)
  }
  return value
})

// 方案2：使用 flatted 库
import { parse, stringify } from 'flatted'
stringify(obj)  // 自动处理循环引用
```

### 5.3 中文乱码问题

**问题**：中文序列化后乱码

**原因**：
- 字符编码不一致（UTF-8 vs GBK）
- BOM 标记

**解决方案**：
```python
# Python 确保使用 UTF-8
import json
json.dumps(data, ensure_ascii=False)  # 不转义中文
```

```javascript
// Node.js 设置响应头
res.setHeader('Content-Type', 'application/json; charset=utf-8')
```

---

## 6. 实战：电商系统序列化方案

### 6.1 场景分析

| 场景 | 格式选择 | 理由 |
| :--- | :--- | :--- |
| **App → 后端 API** | JSON | 调试方便，前后端统一 |
| **后端 → 后端 RPC** | Protobuf | 性能最优，节省流量 |
| **缓存到 Redis** | MessagePack | 比 JSON 小，可序列化复杂对象 |
| **日志记录** | JSON | 便于日志分析工具解析 |

### 6.2 代码示例

```javascript
// API 响应（JSON）
app.get('/api/products/:id', async (req, res) => {
  const product = await db.getProduct(req.params.id)
  res.json({
    code: 0,
    data: product
  })
})

// 微服务通信（Protobuf）
// product.proto
syntax = "proto3";
message Product {
  int32 id = 1;
  string name = 2;
  int32 price = 3;
}

// 服务端
const proto = require('./product.proto')
const message = proto.Product.create(product)
const buffer = proto.Product.encode(message).finish()

// 客户端
const decoded = proto.Product.decode(buffer)

// Redis 缓存（MessagePack）
const msgpack = require('msgpack-lite')
await redis.set(
  `product:${id}`,
  msgpack.encode(product)
)
const cached = msgpack.decode(await redis.get(`product:${id}`))
```

---

## 7. 用 AI 辅助选择序列化方案

AI 可以帮助你根据场景选择合适的序列化格式。

### 7.1 提示词模板

```
你是一位资深的系统架构师，精通数据序列化技术。请帮我选择合适的序列化方案。

## 业务场景
[描述你的场景，例如：电商 App、游戏后端、微服务等]

## 技术要求
[列出约束条件，例如：
- 前后端分离（Vue + Node.js）
- 性能要求高（QPS > 10000）
- 流量敏感（移动端，需节省流量）
- 需要跨语言（Java + Python + Go）]

## 数据特征
[描述数据特点，例如：
- 数据量大（单次响应 > 1MB）
- 结构复杂（多层嵌套）
- 包含日期、二进制数据等特殊类型]

## 输出格式
请按以下格式输出：
1. 推荐方案（JSON/Protobuf/MessagePack/XML）
2. 理由说明
3. 性能对比（估算大小和速度）
4. 代码示例
```

### 7.2 实战示例

**输入提示词**：

```
你是一位资深的系统架构师。我们的电商 App 需要优化商品列表接口性能。

## 业务场景
- 电商 App 的商品列表接口
- 单次返回 100 个商品
- 每个 商品包含：id, name, price, image, description 等 20 个字段
- 当前使用 JSON，响应大小约 200KB，耗时 800ms

## 技术要求
- 前端是 Vue.js
- 后端是 Node.js + Go 微服务
- 需要兼顾性能和开发效率

## 优化目标
- 响应时间降到 300ms 以内
- 数据包大小减少 30%
```

**AI 输出**：

```
推荐方案：混合方案

1. **API 层**：继续使用 JSON（前端友好）
2. **微服务通信**：切换到 Protobuf（性能提升）
3. **静态数据**：启用 gzip 压缩

### 理由说明
- JSON 对前端最友好，无需额外解析
- 后端微服务用 Protobuf，可以减少 40% 的数据量
- gzip 压缩对文本效果明显（JSON 可压缩 70%）

### 性能对比
| 方案 | 大小 | 耗时 |
|------|------|------|
| 当前 (JSON) | 200 KB | 800 ms |
| + gzip | 60 KB | 350 ms |
| + Protobuf | 50 KB | 280 ms |

### 代码示例
[具体实现代码...]
```

---

## 名词速查表

| 名词 | 英文 | 解释 |
| :--- | :--- | :--- |
| **序列化** | Serialization | 对象 → 字节流 |
| **反序列化** | Deserialization | 字节流 → 对象 |
| **JSON** | JavaScript Object Notation | 最常用的文本格式 |
| **XML** | Extensible Markup Language | 标记语言，曾主流 |
| **Protobuf** | Protocol Buffers | Google 开源的高效格式 |
| **MessagePack** | - | JSON 的二进制版本 |
| **编码** | Encoding | 字符 → 字节 |
| **解码** | Decoding | 字节 → 字符 |
