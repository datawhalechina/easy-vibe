# 埋点设计：从原理到实战 (Interactive Guide to Event Tracking)

> 💡 **学习指南**：本章节带你深入理解数据采集的基石——埋点设计。我们将从最基础的"为什么要埋点"讲起，一步步掌握埋点方案、数据模型、处理流程，以及实战中的坑与解决方案。

<TrackingOverviewDemo />

## 0. 引言：数据驱动决策的基石

你刷抖音时，为什么总能刷到感兴趣的视频？
你逛淘宝时，为什么推荐的商品总是那么精准？
你打开 App 时，为什么收到的推送总是恰到好处？

这背后都有一个功臣：**埋点 (Event Tracking)**。

如果产品是"眼睛"，那埋点就是"视神经"。
它把用户的一举一动转化为数据，帮助产品经理、开发者、运营人员理解用户、优化产品。

### 0.1 为什么要埋点？

只有一个理由：**数据驱动决策**。

| 决策方式   | 依赖         | 准确率 | 风险 |
| :--------- | :----------- | :----- | :--- |
| **凭感觉** | 个人经验     | ~30%   | 高   |
| **看反馈** | 少数用户声音 | ~50%   | 中   |
| **看数据** | 全量用户行为 | ~90%   | 低   |

**关键点**：埋点的本质是**把用户行为转化为可量化的数据**，让产品决策从"我觉得"变成"数据显示"。

---

## 1. 第一步：理解埋点的基本概念

### 1.1 什么是埋点？

埋点（Event Tracking），是指在应用程序的关键位置添加代码，收集用户行为数据的过程。

**生活中的例子**：

想象你在经营一家实体店：

- **没有埋点**：你只能看到门口人来人往，但不知道他们看了什么、买了什么。
- **有埋点**：你能知道每个顾客进店后走了哪条路线、拿起过哪些商品、在哪个货架停留最久、最后买了什么。

这个"监控系统"就是**埋点系统**。

### 1.2 埋点的分类

按采集位置分类：

| 类型           | 位置             | 数据特点                   | 典型场景                     |
| :------------- | :--------------- | :------------------------- | :--------------------------- |
| **前端埋点**   | Web、App、小程序 | 实时、可视化、全量         | 页面浏览、按钮点击、表单提交 |
| **后端埋点**   | 服务器           | 准确、不可篡改、服务端视角 | API 调用、订单创建、支付成功 |
| **全链路埋点** | 前端 + 后端      | 端到端追踪、完整链路       | 用户旅程分析、转化漏斗       |

<TrackingTypesDemo />

### 1.3 埋点数据的基本要素

一个完整的埋点事件 (Event) 通常包含：

```javascript
{
  // 1. 事件身份
  "event_id": "click_button",           // 事件名称
  "timestamp": 1704067200000,            // 时间戳

  // 2. 用户身份
  "user_id": "user_12345",               // 用户 ID
  "device_id": "device_67890",           // 设备 ID（匿名用户）
  "session_id": "session_abc",           // 会话 ID

  // 3. 公共属性 (Common Properties)
  "platform": "iOS",                     // 平台
  "app_version": "1.2.3",                // 应用版本
  "os_version": "iOS 17.0",              // 系统版本
  "screen_size": "390x844",              // 屏幕尺寸
  "network": "WiFi",                     // 网络类型

  // 4. 自定义属性 (Custom Properties)
  "properties": {
    "button_name": "立即购买",
    "page": "商品详情页",
    "product_id": "prod_98765",
    "price": 299.00
  }
}
```

**关键点**：设计埋点时，**公共属性**要统一、**自定义属性**要灵活。

---

## 2. 埋点方案对比

### 2.1 代码埋点 (Code-based Tracking) ⭐ 最常用

**原理**：在代码中显式调用埋点 SDK。

**优点**：

- ✅ 灵活可控，可以收集任意数据
- ✅ 数据准确，时机可控
- ✅ 可以传递自定义属性

**缺点**：

- ❌ 需要开发资源，每次新增都要发版
- ❌ 维护成本高

**代码示例**：

```javascript
// 点击"购买"按钮
function onBuyButtonClick() {
  // 业务逻辑
  addToCart(product)

  // 埋点
  track('click_buy_button', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    page: 'product_detail'
  })
}
```

### 2.2 可视化埋点 (Visual Tracking)

**原理**：通过可视化工具圈选元素，自动生成埋点代码。

**优点**：

- ✅ 无需编码，产品经理可操作
- ✅ 快速验证埋点方案

**缺点**：

- ❌ 只能采集标准事件（点击、浏览）
- ❌ 自定义属性能力弱
- ❌ 页面改版后埋点易失效

**典型工具**：GrowingIO、神策数据、Google Tag Manager

### 2.3 无埋点 / 全埋点 (Auto-tracking)

**原理**：SDK 自动采集所有用户行为，无需手动添加代码。

**优点**：

- ✅ 零开发成本
- ✅ 一次性采集，回溯分析

**缺点**：

- ❌ 数据量大，噪声多
- ❌ 无法自定义属性
- ❌ 隐私合规风险

**典型场景**：

- 页面浏览 (Page View)
- 元素点击 (Element Click)
- 表单提交 (Form Submit)

<TrackingMethodsComparisonDemo />

### 2.4 三种方案对比总结

| 方案           | 灵活性     | 开发成本 | 维护成本 | 数据质量   | 适用场景               |
| :------------- | :--------- | :------- | :------- | :--------- | :--------------------- |
| **代码埋点**   | ⭐⭐⭐⭐⭐ | 高       | 高       | ⭐⭐⭐⭐⭐ | 核心业务指标、复杂分析 |
| **可视化埋点** | ⭐⭐⭐     | 低       | 中       | ⭐⭐⭐     | 快速验证、运营活动     |
| **全埋点**     | ⭐         | 低       | 低       | ⭐⭐       | 探索性分析、行为回溯   |

**最佳实践**：

- **核心业务指标**（支付、注册）：用代码埋点
- **运营活动埋点**：用可视化埋点
- **页面浏览等基础数据**：用全埋点

---

## 3. 数据采集方案

### 3.1 客户端埋点

**流程**：App/Web → 埋点 SDK → 本地缓存 → 批量上报 → 服务器

**优点**：

- 实时性好（用户在线时立即上报）
- 可以采集设备信息、网络状态
- 离线数据缓存，联网后补传

**缺点**：

- 数据可能被篡改
- 耗电、流量消耗
- App 崩溃可能丢失数据

**代码示例**：

```javascript
// 前端埋点 SDK 初始化
import { Tracker } from '@analytics/sdk'

const tracker = new Tracker({
  serverUrl: 'https://analytics.example.com/collect',
  batchSize: 10, // 批量上报：每 10 个事件上报一次
  flushInterval: 5000, // 定时上报：每 5 秒上报一次
  maxCacheSize: 100 // 本地缓存：最多存 100 个事件
})

// 采集事件
tracker.track('page_view', {
  page_title: document.title,
  page_url: window.location.href
})
```

### 3.2 服务端埋点

**流程**：业务逻辑 → 埋点代码 → 异步队列 → 数据仓库

**优点**：

- 数据准确、不可篡改
- 可以采集服务端特有数据（数据库查询、API 调用）
- 不依赖客户端网络状态

**缺点**：

- 无法采集客户端信息（设备型号、网络类型）
- 需要业务代码侵入

**代码示例**：

```python
# 后端埋点：订单创建
from celery import Celery

# 异步任务队列
analytics_queue = Celery('analytics', broker='redis://localhost:6379')

@analytics_queue.task
def track_order_created(order_id, user_id, amount):
    """异步上报埋点数据，不阻塞主业务"""
    event = {
        'event': 'order_created',
        'user_id': user_id,
        'properties': {
            'order_id': order_id,
            'amount': amount,
            'timestamp': datetime.now().isoformat()
        }
    }
    # 发送到埋点服务器
    requests.post('https://analytics.example.com/collect', json=event)

# 业务代码
def create_order(user, cart):
    order = Order.objects.create(user=user, total=cart.total)

    # 触发埋点（异步，不阻塞）
    track_order_created.delay(order.id, user.id, order.total)

    return order
```

### 3.3 CDN 日志采集

**原理**：通过 CDN 访问日志分析用户行为。

**优点**：

- 零代码侵入
- 覆盖所有用户（包括失败请求）
- 成本低（CDN 日志本身就有）

**缺点**：

- 数据维度有限（只有 URL、User-Agent 等）
- 无法获取业务数据

**典型场景**：

- 页面 PV/UV 统计
- 资源加载性能分析
- 错误监控

### 3.4 第三方统计

**典型工具**：

- **Google Analytics**：免费、功能强大
- **Mixpanel**：事件分析专业
- **神策数据**：国内领先
- **GrowingIO**：增长分析

**选择建议**：

- 小团队、预算有限：Google Analytics
- 中大型团队、需要私有化部署：神策数据
- 增长黑客、产品优化：Mixpanel / GrowingIO

<DataCollectionDemo />

---

## 4. 数据模型设计

### 4.1 事件模型 (Event Model)

**核心原则**：一个事件 = 一个动作（动词 + 名词）

**命名规范**：

| 好的事件名     | ❌ 坏的事件名  | 原因               |
| :------------- | :------------- | :----------------- |
| `click_button` | `button_click` | 动词在前，语义清晰 |
| `view_page`    | `page_view`    | 同上               |
| `add_to_cart`  | `cart_add`     | 同上               |
| `submit_form`  | `form_submit`  | 同上               |

**事件属性设计**：

```javascript
// ✅ 好的设计：属性清晰、维度丰富
{
  event: "add_to_cart",
  properties: {
    product_id: "12345",          // 必填：商品 ID
    product_name: "iPhone 15",    // 必填：商品名称
    category: "电子产品",          // 必填：商品类目
    price: 7999.00,               // 必填：价格
    quantity: 1,                  // 必填：数量
    source: "recommendation",     // 可选：来源（推荐/搜索/浏览）
    position: 3                   // 可选：在列表中的位置
  }
}

// ❌ 坏的设计：属性冗余、维度不足
{
  event: "add_to_cart",
  properties: {
    product: "iPhone 15",         // ❌ 应该拆分为 id + name
    info: "电子产品|7999"         // ❌ 不应该把多个字段拼在一起
  }
}
```

### 4.2 用户模型 (User Model)

**核心原则**：一个用户 = 唯一身份 + 多个设备

**身份识别**：

| ID 类型        | 来源             | 稳定性 | 用途                   |
| :------------- | :--------------- | :----- | :--------------------- |
| **user_id**    | 注册后由后端分配 | 极高   | 跨设备关联、长期分析   |
| **device_id**  | 设备指纹（UUID） | 高     | 匿名用户分析、设备去重 |
| **cookie_id**  | 浏览器 Cookie    | 中     | 短期追踪（用户可清除） |
| **session_id** | 当前会话         | 低     | 单次会话分析           |

**ID Mapping（身份打通）**：

```python
# 用户注册前
event1 = {
    "device_id": "device_123",
    "user_id": null,           # 匿名用户
    "event": "view_product"
}

# 用户注册后
event2 = {
    "device_id": "device_123", # 同一台设备
    "user_id": "user_456",     # 已注册
    "event": "purchase"
}

# 数据分析时，可以通过 device_id 将两个事件关联
# → 用户在注册前浏览了商品，注册后购买了
```

### 4.3 会话模型 (Session Model)

**什么是会话 (Session)**？

会话 = 用户一次连续的使用过程。

**会话划分规则**：

| 平台    | 会话定义                 | 超时时间 |
| :------ | :----------------------- | :------- |
| **Web** | 连续浏览，无操作超过阈值 | 30 分钟  |
| **App** | App 从后台回到前台       | 5 分钟   |

**会话的作用**：

- 计算转化率（注册转化、购买转化）
- 分析用户粘性（会话时长、会话深度）
- 漏斗分析（注册漏斗、购买漏斗）

### 4.4 公共属性与自定义属性

**公共属性 (Common Properties)**：

所有事件都自动携带的属性，由 SDK 自动采集。

```javascript
const commonProperties = {
  // 设备信息
  platform: 'iOS', // 平台：iOS / Android / Web
  device_id: 'device_123', // 设备 ID
  app_version: '1.2.3', // App 版本

  // 环境信息
  network: 'WiFi', // 网络类型：WiFi / 4G / 5G
  screen_size: '390x844', // 屏幕尺寸
  os_version: 'iOS 17.0', // 系统版本

  // 用户信息
  user_id: 'user_456', // 用户 ID（登录后）
  is_login: true, // 是否登录

  // 时间信息
  timestamp: 1704067200000, // 事件时间戳
  timezone: '+08:00' // 时区
}
```

**自定义属性 (Custom Properties)**：

针对具体事件的业务属性。

```javascript
// 商品详情页浏览事件
track('view_product', {
  product_id: '12345', // 商品 ID
  product_name: 'iPhone 15', // 商品名称
  category: '电子产品', // 商品类目
  price: 7999.0, // 商品价格
  source: 'search' // 来源：搜索 / 推荐 / 浏览
})
```

**关键点**：

- **公共属性**要少而精，避免数据冗余
- **自定义属性**要丰富，满足分析需求

<DataModelDesignDemo />

---

## 5. 数据处理流程

### 5.1 完整的数据管道 (Data Pipeline)

```
┌─────────────┐
│  用户行为   │  (点击、浏览、购买)
└──────┬──────┘
       ↓
┌─────────────────────────────────────────┐
│  1. 数据采集 (Collection)               │
│  - 前端埋点 SDK                         │
│  - 后端埋点代码                         │
│  - CDN 日志                             │
└──────┬──────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  2. 数据传输 (Transmission)             │
│  - HTTP/HTTPS 上报                      │
│  - 批量上报（减少请求）                  │
│  - 断点续传（失败重试）                  │
└──────┬──────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  3. 数据清洗 (Cleaning)                 │
│  - 去重（重复数据）                      │
│  - 校验（格式错误）                      │
│  - 补全（缺失字段）                      │
└──────┬──────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  4. 数据存储 (Storage)                  │
│  - 数据仓库：ClickHouse / Snowflake     │
│  - 实时分析：Redis / Elasticsearch      │
│  - 离线分析：Hive / Spark               │
└──────┬──────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  5. 数据分析 (Analysis)                 │
│  - BI 工具：Tableau / PowerBI           │
│  - 自助查询：SQL / Python               │
│  - 可视化报表：Grafana / Metabase       │
└─────────────────────────────────────────┘
```

### 5.2 数据采集最佳实践

**批量上报**：

```javascript
// ❌ 坏的做法：每次点击立即上报
track('click_button') // 1 个 HTTP 请求
track('scroll_page') // 1 个 HTTP 请求
track('view_image') // 1 个 HTTP 请求
// → 3 个请求，浪费资源

// ✅ 好的做法：批量上报
tracker.track('click_button')
tracker.track('scroll_page')
tracker.track('view_image')
// SDK 自动打包成 1 个请求上报
// → 1 个请求，节省资源
```

**断点续传**：

```javascript
// SDK 本地缓存 + 失败重试
const tracker = new Tracker({
  serverUrl: 'https://analytics.example.com/collect',
  batchSize: 10,
  flushInterval: 5000,

  // 本地缓存（IndexedDB / LocalStorage）
  storage: new IndexedDBStorage(),

  // 失败重试策略
  retryTimes: 3, // 失败后重试 3 次
  retryDelay: 2000, // 每次重试间隔 2 秒

  // 离线支持
  offline: true // 离线时缓存，联网后补传
})
```

### 5.3 数据清洗常见问题

**问题 1：数据重复**

原因：网络超时导致客户端重发。

解决方案：

```sql
-- 使用事件去重键（dedup_id）
CREATE TABLE events (
  event_id STRING,
  dedup_id STRING UNIQUE,  -- 客户端生成的唯一 ID
  timestamp TIMESTAMP,
  properties JSON
)

-- 插入时去重
INSERT INTO events (event_id, dedup_id, timestamp, properties)
VALUES ('click_button', 'uuid_123', NOW(), '{"page": "home"}')
ON CONFLICT (dedup_id) DO NOTHING;
```

**问题 2：时间戳错误**

原因：客户端时间不准。

解决方案：

```javascript
// SDK 使用服务器时间校准
const serverTime = await fetchServerTime()
const clientTime = Date.now()
const timeDiff = serverTime - clientTime

// 后续事件使用校准后的时间
track('click_button', {
  timestamp: Date.now() + timeDiff
})
```

**问题 3：格式不统一**

原因：不同客户端、不同版本的数据格式不一致。

解决方案：

```python
# 数据清洗脚本（ETL）
def clean_event(raw_event):
    # 统一字段名
    if 'userId' in raw_event:
        raw_event['user_id'] = raw_event.pop('userId')

    # 统一时间格式
    if isinstance(raw_event['timestamp'], str):
        raw_event['timestamp'] = parse_iso_8601(raw_event['timestamp'])

    # 补全缺失字段
    if 'platform' not in raw_event:
        raw_event['platform'] = 'unknown'

    return raw_event
```

<DataPipelineDemo />

---

## 6. 常见问题与解决方案

### 6.1 数据丢失

**原因**：

- App 崩溃
- 网络断开
- 用户关闭浏览器

**解决方案**：

| 方案           | 原理                    | 效果          | 成本 |
| :------------- | :---------------------- | :------------ | :--- |
| **本地缓存**   | 本地存储 + 联网后补传   | 减少 90% 丢失 | 低   |
| **断点续传**   | 失败自动重试            | 减少 95% 丢失 | 中   |
| **多通道上报** | HTTP + WebSocket 双通道 | 减少 99% 丢失 | 高   |

**代码示例**：

```javascript
// 本地缓存 + 失败重试
class ReliableTracker {
  constructor() {
    this.cache = new IndexedDBStorage('events_cache')
    this.queue = []
  }

  async track(event) {
    // 1. 先存本地缓存
    await this.cache.add(event)

    // 2. 尝试上报
    this.flush()
  }

  async flush() {
    const events = await this.cache.getAll()

    try {
      await fetch('/api/collect', {
        method: 'POST',
        body: JSON.stringify(events)
      })

      // 成功后删除缓存
      await this.cache.clear()
    } catch (error) {
      // 失败：下次重试（数据仍在缓存中）
      console.error('上报失败，下次重试', error)
    }
  }
}
```

### 6.2 数据重复

**原因**：网络超时导致客户端重复上报。

**解决方案**：

```python
# 服务端去重（使用 Redis Set）
def save_event(event):
    dedup_id = event.get('dedup_id')

    # 检查是否已处理过
    if redis.sismember('processed_events', dedup_id):
        return {'status': 'duplicate'}

    # 首次处理
    process_event(event)

    # 标记已处理（24 小时过期）
    redis.sadd('processed_events', dedup_id)
    redis.expire('processed_events', 86400)

    return {'status': 'success'}
```

### 6.3 时区问题

**问题**：跨国业务时，用户时区不同，导致日期统计错误。

**解决方案**：

```javascript
// 前端：上报时携带时区
track('page_view', {
  timestamp: Date.now(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // 'Asia/Shanghai'
})

// 后端：统一转换为 UTC
def save_event(event):
    local_time = event['timestamp']
    timezone = event['timezone']

    # 转换为 UTC
    utc_time = convert_to_utc(local_time, timezone)

    # 存储 UTC 时间
    db.save(utc_time=utc_time, timezone=timezone)
```

### 6.4 隐私合规

**核心原则**：用户知情、用户同意、用户可控。

**合规要求**：

| 法规     | 适用范围 | 核心要求                         |
| :------- | :------- | :------------------------------- |
| **GDPR** | 欧盟     | 用户同意、数据可删除、数据可导出 |
| **CCPA** | 美国加州 | 用户可拒绝出售数据               |
| **PIPL** | 中国     | 明确告知、最小必要、用户同意     |

**实践方案**：

```javascript
// 1. 隐私弹窗获取同意
if (!hasUserConsent()) {
  showPrivacyDialog({
    onAccept: () => {
      grantTrackingConsent()
      tracker.start()
    },
    onReject: () => {
      denyTrackingConsent()
      tracker.stop()
    }
  })
}

// 2. 数据脱敏
track('user_register', {
  user_id: hash('user_123'), // 用户 ID 加密
  phone: mask_phone('138****1234'), // 手机号脱敏
  email: mask_email('u***@example.com') // 邮箱脱敏
})

// 3. 提供数据删除接口
function deleteUserData(userId) {
  // 响应用户的"被遗忘权"
  database.delete_all_events(userId)
  database.delete_user_profile(userId)
}
```

<PrivacyComplianceDemo />

### 6.5 性能影响

**问题**：埋点代码影响 App 性能。

**解决方案**：

| 优化点       | 方案                         | 效果                |
| :----------- | :--------------------------- | :------------------ |
| **上报时机** | 异步、批量上报               | 减少 80% 主线程阻塞 |
| **数据压缩** | Gzip 压缩                    | 减少 70% 流量消耗   |
| **采样上报** | 低价值事件采样（只上报 10%） | 减少 90% 数据量     |
| **懒加载**   | 非核心 SDK 延迟加载          | 减少 50% 首屏时间   |

**代码示例**：

```javascript
// 1. 异步批量上报
tracker.track('click_button', { async: true })

// 2. 采样上报
if (shouldSample('page_view', 0.1)) {
  // 10% 采样
  tracker.track('page_view')
}

// 3. 数据压缩
const compressed = pako.gzip(JSON.stringify(events))
fetch('/api/collect', {
  method: 'POST',
  body: compressed,
  headers: { 'Content-Encoding': 'gzip' }
})
```

---

## 7. 实战案例

### 7.1 电商系统埋点设计

**业务目标**：分析购买转化漏斗，优化用户体验。

**关键埋点**：

| 埋点             | 时机           | 核心属性                       |
| :--------------- | :------------- | :----------------------------- |
| `view_product`   | 商品详情页浏览 | product_id, category, source   |
| `add_to_cart`    | 加入购物车     | product_id, quantity, price    |
| `view_cart`      | 查看购物车     | cart_total, item_count         |
| `begin_checkout` | 开始结算       | cart_total, payment_method     |
| `purchase`       | 支付成功       | order_id, total_amount, coupon |

**转化漏斗分析**：

```sql
-- 计算转化漏斗
WITH funnel AS (
  -- 1. 浏览商品
  SELECT
    user_id,
    COUNT(DISTINCT product_id) as view_count
  FROM events
  WHERE event = 'view_product'
  GROUP BY user_id

  -- 2. 加入购物车
  SELECT
    user_id,
    COUNT(DISTINCT product_id) as cart_count
  FROM events
  WHERE event = 'add_to_cart'
  GROUP BY user_id

  -- 3. 支付成功
  SELECT
    user_id,
    COUNT(DISTINCT order_id) as purchase_count
  FROM events
  WHERE event = 'purchase'
  GROUP BY user_id
)
SELECT
  view_count,
  cart_count,
  purchase_count,
  cart_count / view_count as cart_rate,
  purchase_count / cart_count as purchase_rate
FROM funnel
```

### 7.2 内容推荐埋点设计

**业务目标**：优化推荐算法，提高点击率。

**关键埋点**：

| 埋点                    | 时机         | 核心属性                     |
| :---------------------- | :----------- | :--------------------------- |
| `recommend_exposure`    | 推荐内容曝光 | item_id, position, algorithm |
| `recommend_click`       | 点击推荐内容 | item_id, position, algorithm |
| `content_view_duration` | 内容观看时长 | item_id, duration            |
| `content_like`          | 点赞内容     | item_id, is_liked            |

**A/B 测试分析**：

```sql
-- 对比不同推荐算法的点击率
SELECT
  properties->>'algorithm' as algorithm,
  COUNT(*) as exposure_count,
  SUM(CASE WHEN event = 'recommend_click' THEN 1 ELSE 0 END) as click_count,
  SUM(CASE WHEN event = 'recommend_click' THEN 1 ELSE 0 END) / COUNT(*) as ctr
FROM events
WHERE event IN ('recommend_exposure', 'recommend_click')
GROUP BY algorithm
ORDER BY ctr DESC
```

### 7.3 用户行为分析埋点

**业务目标**：分析用户粘性，识别流失风险。

**关键埋点**：

| 埋点             | 时机         | 核心属性                     |
| :--------------- | :----------- | :--------------------------- |
| `app_start`      | App 启动     | source, is_first_launch      |
| `app_background` | App 进入后台 | session_duration             |
| `daily_active`   | 每日活跃     | last_active_date             |
| `feature_usage`  | 功能使用     | feature_name, usage_duration |

**用户分群**：

```sql
-- RFM 模型用户分群
WITH user_rfm AS (
  SELECT
    user_id,

    -- Recency: 最近一次活跃距今天数
    DATEDIFF('day', MAX(timestamp), CURRENT_DATE) as recency,

    -- Frequency: 最近 30 天活跃天数
    COUNT(DISTINCT DATE(timestamp)) as frequency,

    -- Monetary: 最近 30 天消费金额
    SUM(CASE WHEN event = 'purchase' THEN properties->>'total_amount' ELSE 0 END) as monetary
  FROM events
  WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY user_id
)
SELECT
  user_id,
  CASE
    WHEN recency <= 7 AND frequency >= 10 THEN '高价值用户'
    WHEN recency <= 7 AND frequency < 10 THEN '新用户'
    WHEN recency > 7 AND recency <= 30 THEN '流失风险用户'
    WHEN recency > 30 THEN '已流失用户'
  END as user_segment
FROM user_rfm
```

<RealWorldCaseDemo />

---

## 8. 工具选型

### 8.1 开源方案

| 工具                 | 特点            | 适用场景            | 成本            |
| :------------------- | :-------------- | :------------------ | :-------------- |
| **Google Analytics** | 免费、功能强大  | 小型项目、个人网站  | 免费            |
| **Umami**            | 开源、隐私友好  | 需要私有化部署      | 服务器成本      |
| **Matomo**           | 开源、GDPR 合规 | 欧洲项目、注重隐私  | 服务器成本      |
| **PostHog**          | 开源、产品分析  | SaaS 产品、初创公司 | 免费 / $20/月起 |

### 8.2 商业方案

| 工具          | 特点                 | 适用场景           | 价格        |
| :------------ | :------------------- | :----------------- | :---------- |
| **神策数据**  | 国内领先、私有化部署 | 中大型企业         | $10,000+/年 |
| **GrowingIO** | 增长分析、无埋点     | 增长团队、产品优化 | $5,000+/年  |
| **Mixpanel**  | 事件分析专业         | 产品数据分析       | $25,000+/年 |
| **Amplitude** | 产品分析、用户分群   | 移动应用分析       | $1,000+/月  |

### 8.3 自建方案

**技术栈**：

```
数据采集：自建 SDK
数据传输：Kafka / Kinesis
数据存储：ClickHouse / Snowflake / BigQuery
数据分析：SQL / Python / Metabase / Superset
```

**成本对比**：

| 方案            | 初期成本 | 维护成本 | 灵活性 | 数据安全 |
| :-------------- | :------- | :------- | :----- | :------- |
| **第三方 SaaS** | 低       | 低       | 中     | 中       |
| **开源方案**    | 中       | 中       | 高     | 高       |
| **完全自建**    | 高       | 高       | 极高   | 极高     |

**选择建议**：

- **0-1 阶段**：使用 Google Analytics / Umami（快速验证）
- **1-10 阶段**：使用神策 / Mixpanel（专业分析）
- **10-100 阶段**：自建埋点系统（数据安全、成本控制）

<ToolSelectionDemo />

---

## 9. 总结与最佳实践

### 9.1 埋点设计核心原则

| 原则         | 说明                             | 示例                              |
| :----------- | :------------------------------- | :-------------------------------- |
| **业务驱动** | 埋点服务于业务目标，不要盲目采集 | 电商核心指标：转化率、客单价      |
| **最小必要** | 只采集必要数据，减少隐私风险     | 不采集手机号、身份证等敏感信息    |
| **命名规范** | 统一命名规范，便于理解           | 事件名：动词\_名词 (click_button) |
| **属性完整** | 公共属性 + 自定义属性            | 公共属性：平台、版本、网络        |
| **可扩展性** | 预留扩展空间，避免频繁重构       | 支持动态属性、自定义维度          |

### 9.2 埋点实施流程

```
1. 需求分析
   └─ 明确业务目标（提升转化率、优化用户体验）

2. 方案设计
   ├─ 事件设计（命名、属性）
   ├─ 技术选型（代码埋点 / 可视化埋点 / 全埋点）
   └─ 数据模型设计（用户、事件、会话）

3. 开发实施
   ├─ 前端埋点 SDK 集成
   ├─ 后端埋点代码开发
   └─ 数据采集管道搭建

4. 测试验证
   ├─ 埋点数据完整性测试
   ├─ 数据准确性测试
   └─ 性能影响测试

5. 上线监控
   ├─ 数据量监控（日活、事件数）
   ├─ 数据质量监控（缺失率、重复率）
   └─ 异常告警（数据丢失、格式错误）

6. 持续优化
   ├─ 根据分析需求新增埋点
   ├─ 清理无效埋点
   └─ 优化数据管道性能
```

### 9.3 学习路线

**入门**（1-2 天）：

- 理解埋点的价值和基本概念
- 使用 Google Analytics 实战一次
- 掌握事件、用户、会话模型

**进阶**（1 周）：

- 设计一个完整的埋点方案
- 实现前端 + 后端埋点
- 搭建数据采集管道（Kafka + ClickHouse）

**实战**（2-4 周）：

- 为一个真实产品设计埋点系统
- 实现转化漏斗分析、用户分群
- 优化埋点性能、数据质量

**深入**（持续）：

- 学习数据仓库建模（星型模型、雪花模型）
- 研究 A/B 测试系统设计
- 探索实时数据分析（Flink、Spark Streaming）

### 9.4 推荐资源

**书籍**：

- 《数据驱动：从数据中掘金》
- 《增长黑客：如何低成本实现爆发式成长》

**文章**：

- Google Analytics 官方文档
- 神策数据《数据驱动入门》系列

**工具**：

- Google Analytics（免费、易上手）
- Umami（开源、隐私友好）
- ClickHouse（高性能数据仓库）

---

## 10. 名词速查表 (Glossary)

| 名词                | 全称                                | 解释                                                       |
| :------------------ | :---------------------------------- | :--------------------------------------------------------- |
| **Event Tracking**  | -                                   | **埋点**。在应用程序中添加代码，收集用户行为数据。         |
| **Event**           | -                                   | **事件**。用户的一次行为（点击、浏览、购买）。             |
| **User ID**         | -                                   | **用户 ID**。注册后由后端分配的唯一标识，用于跨设备关联。  |
| **Device ID**       | -                                   | **设备 ID**。设备的唯一标识（如 UUID），用于匿名用户分析。 |
| **Session ID**      | -                                   | **会话 ID**。用户一次连续使用过程的标识。                  |
| **Page View**       | PV                                  | **页面浏览**。用户访问页面的次数。                         |
| **Unique Visitor**  | UV                                  | **独立访客**。访问网站的不同用户数。                       |
| **Conversion Rate** | CR                                  | **转化率**。完成目标行为的用户占总用户数的比例。           |
| **Funnel Analysis** | -                                   | **漏斗分析**。分析用户在转化流程各环节的流失情况。         |
| **Cohort Analysis** | -                                   | **同期群分析**。分析同一时期进入的用户的行为特征。         |
| **Retention Rate**  | -                                   | **留存率**。用户在一段时间后继续使用的比例。               |
| **Churn Rate**      | -                                   | **流失率**。用户停止使用的比例。                           |
| **ARPU**            | Average Revenue Per User            | **每用户平均收入**。总收入 / 用户数。                      |
| **LTV**             | Lifetime Value                      | **用户生命周期价值**。用户在整个使用期间带来的总收入。     |
| **A/B Testing**     | -                                   | **A/B 测试**。对比两个版本，找出效果更好的方案。           |
| **SDK**             | Software Development Kit            | **软件开发工具包**。埋点 SDK 用于采集数据并上报。          |
| **Data Pipeline**   | -                                   | **数据管道**。数据从采集到分析的完整流程。                 |
| **ETL**             | Extract, Transform, Load            | **数据抽取、转换、加载**。数据清洗的标准流程。             |
| **GDPR**            | General Data Protection Regulation  | **欧盟数据保护法规**。要求数据采集需用户同意。             |
| **PIPL**            | Personal Information Protection Law | **中国个人信息保护法**。规范个人信息处理活动。             |
