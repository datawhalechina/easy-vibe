# 系统缓存设计：从原理到实战 (Interactive Guide to Caching)

> 💡 **学习指南**：本章节带你深入理解后端系统的"加速器"——缓存。我们将从最基础的"为什么要缓存"讲起，一步步掌握多级缓存架构、缓存模式、以及实战中的坑与解决方案。

<CacheArchitectureDemo />

## 0. 引言：看不见的"加速器"

你有没有想过这些问题：

- 刷朋友圈时，为什么几秒钟就能加载出几百张图片？
- 查询订单时，为什么瞬间就能看到几个月前的数据？
- 刷新短视频时，为什么视频几乎瞬间就能播放？

这背后都有一个功臣：**缓存 (Cache)**。

### 0.1 什么是缓存？用生活化的例子理解

想象一下你在家里的场景：

**场景 1：没有缓存的日子**

每次想喝水，你都要：

1. 走到厨房（相当于访问数据库）
2. 打开柜子
3. 拿出水壶
4. 倒水
5. 回到客厅

即使你一小时内要喝 10 次水，每次都要重复这个过程。很累对吧？

**场景 2：有了缓存**

你在客厅的茶几上放了一个水杯（这就是缓存！）：

- 第一次喝水：你还是要去厨房倒水，但把水杯留在茶几上
- 之后每次喝水：直接拿起茶几上的水杯喝就行

**这就是缓存的核心思想**：把常用的东西放在触手可及的地方，避免每次都"跑远路"。

回到计算机世界：

| 生活中的例子                   | 计算机中的对应                                     |
| :----------------------------- | :------------------------------------------------- |
| **茶几上的水杯**               | **内存缓存**（速度快，但容量小）                   |
| **厨房的水壶**                 | **数据库**（速度慢，但容量大）                     |
| **"我刚才用过这个水杯"**       | **时间局部性**（刚用过的数据，很可能还会用）       |
| **"把这些常用的都放在茶几上"** | **空间局部性**（用过的数据附近的数据，也可能用到） |

### 0.2 为什么要缓存？

只有一个理由：**快**。

但有多快呢？我们用个形象的比喻：

| 存储介质         | 访问时间  | 生活类比                              | 能做什么         |
| :--------------- | :-------- | :------------------------------------ | :--------------- |
| **L1 CPU 缓存**  | ~1 纳秒   | 眨一下眼睛（1/10秒）的 **十亿分之一** | CPU 执行一条指令 |
| **内存 (Redis)** | ~100 纳秒 | 眨一下眼睛的 **千万分之一**           | 存储热点数据     |
| **SSD 数据库**   | ~1 毫秒   | 眨一下眼睛                            | 读写文件         |
| **HDD 数据库**   | ~10 毫秒  | 眨 10 下眼睛                          | 传统硬盘操作     |

**换个角度理解**：

- 从内存读数据 = 从茶几拿水杯
- 从 SSD 读数据 = 从厨房拿水壶
- 从 HDD 读数据 = 从楼下便利店买水

**关键点**：缓存的本质是**用空间换时间**——多准备几份"副本"放在快速的地方，节省每次都去"慢速地方"取数据的时间。

### 0.3 缓存的真实案例

**案例 1：淘宝商品详情页**

当你打开一个商品页面时：

- **商品基本信息**（价格、标题）：从 Redis 缓存读取（~5 毫秒）
- **商品大图**：从 CDN 缓存读取（~20 毫秒）
- **用户浏览历史**：从本地缓存读取（~1 毫秒）

如果这些都不用缓存，全部查数据库：

- 查询时间可能从 **5 毫秒** 变成 **200 毫秒**
- 数据库要同时处理几百万人的请求，直接"累垮"

**案例 2：微信朋友圈**

你刷朋友圈时：

- **图片**：之前看过的图片，都在手机本地缓存里
- **好友列表**：第一次加载后缓存在内存里
- **点赞数据**：热点数据在 Redis 缓存中

没有缓存的话：每次刷新都要重新下载所有内容，流量和速度都受不了。

---

## 🗺️ 全局观：缓存知识地图

在深入细节之前，让我们先看看缓存设计的"全貌"。就像旅游前先看地图一样，这样你不会迷路。

### 核心目标（一句话概括）

**让数据访问更快、系统更强，同时保证数据不出错。**

### 知识体系地图

```
缓存设计
│
├─ 📦 基础概念（为什么需要缓存？）
│   ├─ 局部性原理（时间局部性、空间局部性）
│   ├─ 缓存生命周期（写入 → 命中 → 过期 → 淘汰）
│   └─ 性能对比（内存 vs 数据库：快 100 倍）
│
├─ 🏗️ 架构选型（用什么缓存？）
│   ├─ 本地缓存（单机快，但容量小）
│   ├─ 分布式缓存（容量大，但稍慢）
│   └─ 多级缓存（组合使用，最佳方案）
│       ├─ 浏览器缓存（用户本地）
│       ├─ CDN 缓存（离用户近）
│       ├─ 应用本地缓存（极速）
│       ├─ Redis 缓存（高容量）
│       └─ 数据库（兜底）
│
├─ 🎯 设计模式（怎么用缓存？）
│   ├─ Cache-Aside（最常用，手动控制）
│   ├─ Read-Through（缓存自己加载）
│   ├─ Write-Through（同步写缓存和数据库）
│   └─ Write-Behind（异步写，最快但可能丢数据）
│
├─ ⚠️ 常见问题（缓存会出什么错？）
│   ├─ 缓存穿透（查不存在数据，数据库压力大）
│   ├─ 缓存击穿（热点数据过期，瞬间高并发）
│   └─ 缓存雪崩（大量数据同时过期）
│
├─ 🔒 一致性保证（缓存和数据库不一致怎么办？）
│   ├─ 更新策略（先更数据库，再删缓存）
│   ├─ 延迟双删（极致一致性）
│   └─ Binlog 订阅（异步解耦）
│
└─ 🛠️ 实战技巧（工程中怎么做？）
    ├─ 布隆过滤器（快速判断数据是否存在）
    ├─ 分布式锁（防止缓存击穿）
    ├─ 随机 TTL（防止雪崩）
    ├─ 缓存预热（启动时加载热点数据）
    └─ 监控调优（命中率要 > 90%）
```

### 学习路径建议（0基础小白版）

**第一步：理解核心概念**（1-2 天）

- 理解"为什么需要缓存"（茶几 vs 厨房的例子）
- 记住性能数据：内存比数据库快 100 倍
- 了解缓存的生命周期（写入 → 命中 → 过期 → 淘汰）

**第二步：掌握最常用的模式**（2-3 天）

- 重点学习 **Cache-Aside 模式**（90% 的场景都用这个）
- 动手写代码：用 Redis 做简单的键值缓存
- 理解"为什么删缓存而不是更新缓存"

**第三步：学习多级缓存**（3-5 天）

- 理解为什么需要"多层防御"（浏览器 → CDN → 本地 → Redis → 数据库）
- 掌握每一层的用途和特点
- 动手实践：给自己的项目加一层缓存

**第四步：解决常见问题**（1 周）

- 理解缓存三大问题（穿透、击穿、雪崩）
- 学习解决方案（布隆过滤器、分布式锁、随机 TTL）
- 实战演练：模拟高并发场景，看缓存如何保护数据库

**第五步：深入一致性**（1-2 周）

- 理解缓存和数据库可能不一致的场景
- 掌握"先更数据库，再删缓存"的最佳实践
- 进阶：学习 Binlog 订阅方案

**第六步：实战项目**（2-4 周）

- 设计一个完整的缓存系统（如商品详情页缓存）
- 搭建监控系统，实时查看缓存命中率
- 压测验证：看看性能提升了多少倍

### 关键指标（学完后你要能回答）

- 缓存的**命中率**是多少？（优秀：> 90%）
- 缓存能**提升多少性能**？（10-100 倍）
- 如何解决缓存**三大问题**？（穿透、击穿、雪崩）
- 缓存和数据库**不一致**怎么办？（先更库，再删缓存）
- **多级缓存**的顺序是什么？（浏览器 → CDN → 本地 → Redis → 数据库）

---

## 1. 第一步：理解缓存的本质

### 1.1 局部性原理 (Locality Principle)

缓存之所以有效，是因为两个神奇的观察：

1.  **时间局部性 (Temporal Locality)**：
    - 如果你现在访问了某个数据，未来很可能**再次访问它**。
    - _例子_：一个用户登录后，接下来几分钟的每次请求都需要查询他的用户信息。

2.  **空间局部ity (Spatial Locality)**：
    - 如果你访问了某个数据，很可能**访问它附近的数据**。
    - _例子_：浏览商品列表时，通常会翻到下一页（相邻的商品）。

<LocalityPrincipleDemo />

### 1.2 缓存的生命周期

一个缓存条目（Cache Entry）的一生：

1.  **写入 (Write)**：首次访问数据时，从数据库读取并存入缓存。
2.  **命中 (Hit)**：后续访问直接从缓存返回（快！）。
3.  **过期 (Expiration)**：超过设定时间（TTL），标记为过期。
4.  **淘汰 (Eviction)**：缓存满了，需要腾空间给新数据。

<CacheLifecycleDemo />

**关键点**：好的缓存设计需要平衡**命中率**（Hit Ratio）和**内存占用**。

---

## 2. 单机缓存 vs 分布式缓存

### 2.1 本地缓存 (Local Cache)

缓存和应用在同一个进程里。

- **优点**：
  - 极快（没有网络开销）。
  - 简单（就是一个 Map/Dictionary）。
- **缺点**：
  - 容量有限（受限于单机内存）。
  - 不一致（每个实例的缓存独立）。
- **典型实现**：
  - Java: Caffeine、Guava Cache
  - Go: bigcache、ristretto
  - Python: functools.lru_cache

```java
// Java Caffeine 示例
Cache<String, User> userCache = Caffeine.newBuilder()
    .maximumSize(10_000)           // 最多存 1 万条
    .expireAfterWrite(10, TimeUnit.MINUTES)  // 10 分钟过期
    .build();

// 使用
User user = userCache.get(userId, key -> {
    // 缓存没命中，从数据库查
    return database.getUserById(key);
});
```

### 2.2 分布式缓存 (Distributed Cache)

缓存是一个独立的服务，应用通过网络访问。

- **优点**：
  - 容量巨大（可以集群扩展）。
  - 一致性好（所有实例共享同一份缓存）。
- **缺点**：
  - 有网络延迟（通常 1-5 ms）。
  - 需要额外维护缓存服务。
- **典型实现**：**Redis**、Memcached

```python
# Python + Redis 示例
import redis

r = redis.Redis(host='localhost', port=6379)

def get_user(user_id):
    # 先查缓存
    cached = r.get(f'user:{user_id}')
    if cached:
        return json.loads(cached)

    # 缓存未命中，查数据库
    user = db.query(f'SELECT * FROM users WHERE id = {user_id}')

    # 写入缓存，过期时间 10 分钟
    r.setex(f'user:{user_id}', 600, json.dumps(user))
    return user
```

<LocalVsDistributedCacheDemo />

**关键点**：现代系统通常**组合使用**——本地缓存做第一道防线，分布式缓存做第二道防线。

---

## 3. 多级缓存架构 (Multi-Level Caching)

真实的系统通常是"多层防御"：

```
用户请求
    ↓
浏览器缓存 (Cache-Control)
    ↓ (未命中)
CDN 缓存 (静态资源)
    ↓ (未命中)
负载均衡器
    ↓
应用服务器 (本地缓存: Caffeine)
    ↓ (未命中)
分布式缓存 (Redis)
    ↓ (未命中)
数据库 (MySQL / PostgreSQL)
```

### 3.1 每一层的特点

| 层级           | 存储介质   | 典型容量 | 响应时间 | 适用场景                   |
| :------------- | :--------- | :------- | :------- | :------------------------- |
| **浏览器缓存** | 用户磁盘   | ~100 MB  | ~0 ms    | 静态资源（图片、CSS、JS）  |
| **CDN 缓存**   | 边缘节点   | TB 级    | ~10 ms   | 静态文件、API 响应         |
| **本地缓存**   | 应用内存   | ~1 GB    | ~1 ms    | 极热点数据（配置、白名单） |
| **Redis 缓存** | Redis 集群 | ~100 GB  | ~5 ms    | 热点数据（用户信息、商品） |
| **数据库**     | SSD/HDD    | TB ~ PB  | ~50 ms   | 持久化存储                 |

<MultiLevelCacheDemo />

**关键点**：每一层都是上一层的"保护伞"，逐级过滤请求，最终打到数据库的流量可能只有原来的 **1%**。

---

## 4. 缓存模式 (Caching Patterns)

### 4.0 为什么需要缓存模式？

**问题场景**：

当有大量请求访问内部系统时，如果每个请求都需要操作数据库（例如查询操作），对于那种基本不变化的数据来说，每次都去数据库查询会极大地消耗性能。

尤其是在海量数据操作时，如果都从 DB 加载，这是在挑战用户的耐性。

**生活中的例子**：

想象你要去小区里了解某个人在不在家。当没有通讯工具时：

- **没有缓存**：每次都要经过小区保安，再到具体单元楼，最终到这家门口，才知道在不在家。
- **有缓存**：如果换一个优秀的保安，他知道当前小区特定的家里是否有人，直接问保安就知道了，无需跑冤枉路。

这个"优秀保安"就是**缓存**。每次访问时先访问缓存，就能极大提高访问效率和系统性能。

### 4.1 Cache-Aside (旁路缓存) ⭐ 最常用

最常用的模式，由**应用代码**直接控制缓存。

#### 读取流程

```
1. 应用读取缓存
   ↓ 命中？
   ├─ 是 → 直接返回数据
   └─ 否 → 读取数据库
            ↓
         将数据写入缓存
            ↓
         返回数据
```

**代码示例**：

```python
def get_user(user_id):
    # 1. 先查缓存
    cached = cache.get(f'user:{user_id}')
    if cached:
        return cached

    # 2. 缓存未命中，查数据库
    user = db.query(f'SELECT * FROM users WHERE id = {user_id}')

    # 3. 将数据写入缓存
    if user:
        cache.set(f'user:{user_id}', user, ttl=600)

    return user
```

#### 更新流程

```
1. 应用更新数据库
   ↓
2. 删除缓存（不是更新！）
```

**代码示例**：

```python
def update_user(user_id, new_data):
    # 1. 更新数据库
    db.execute('UPDATE users SET ... WHERE id = ?', user_id)

    # 2. 删除缓存（而不是更新）
    cache.delete(f'user:{user_id}')

    # 为什么删除而不是更新？
    # 因为并发更新时，更新缓存的顺序可能和数据库不一致！
```

**关键点**：

- ✅ **删除而非更新**：避免并发写入导致缓存和数据库不一致
- ✅ **延迟双删**：为了极致一致性，可以在更新前再删一次
- ✅ **最灵活**：应用代码完全控制缓存逻辑

**常见问题：会不会有脏数据？**

场景：一个查询操作发现缓存没数据，准备去查 DB。此时另一个写操作更新了 DB 并删除了缓存，第一个操作从 DB 拿到的还是老数据并写入缓存。

**解答**：这种情况出现的概率极低！

- 写操作需要锁表
- 数据库写入比读取慢
- 同等条件下，查询操作先返回，写操作再返回

### 4.2 Read-Through (读穿透)

由**缓存服务**负责与数据库交互，应用代码只和缓存打交道。

#### 工作原理

```
应用请求 → 缓存服务
            ↓
         缓存命中？
         ├─ 是 → 直接返回
         └─ 否 → 缓存服务自己加载 DB 数据
                  ↓
               更新缓存
                  ↓
               返回数据
```

**代码示例**：

```python
# 应用代码只需要
user = cache.get(user_id)  # 缓存库自动处理数据库查询

# 不需要手写：
# if not cached:
#     user = db.query(...)
#     cache.set(user_id, user)
```

**对比 Cache-Aside**：

| 特性           | Cache-Aside      | Read-Through             |
| :------------- | :--------------- | :----------------------- |
| **谁负责加载** | 应用代码         | 缓存服务                 |
| **代码复杂度** | 需要手写缓存逻辑 | 简洁，只需调用 get       |
| **灵活性**     | 高（完全控制）   | 低（依赖缓存库实现）     |
| **适用场景**   | 通用场景         | 读多写少，缓存逻辑标准化 |

**优点**：

- 代码简洁，缓存逻辑对业务透明
- 统一的缓存加载策略

**缺点**：

- 灵活性差，缓存库和数据库强绑定
- 需要特殊的缓存库支持

### 4.3 Write-Through (写穿透)

更新时**同时**写缓存和数据库，由缓存服务负责同步。

#### 工作原理

```
应用写请求 → 缓存服务
              ↓
           更新缓存
              ↓
           同步更新数据库
              ↓
           返回成功
```

**代码示例**：

```python
# 应用代码只需要
cache.set(user_id, user)  # 缓存库自动同步到数据库

# 不需要手写：
# db.update(user)
# cache.set(user_id, user)
```

**关键点**：

- 缓存和数据库**同步更新**，强一致性
- 写入性能受数据库影响（相对较慢）

**对比 Cache-Aside**：

| 特性         | Cache-Aside        | Write-Through   |
| :----------- | :----------------- | :-------------- |
| **写操作**   | 先写 DB，再删缓存  | 同时写缓存和 DB |
| **一致性**   | 最终一致           | 强一致          |
| **写入性能** | 高（异步删缓存）   | 低（同步写 DB） |
| **缓存更新** | 懒加载（读时更新） | 主动更新        |

**优点**：

- 数据一致性最好
- 读取时总能命中缓存

**缺点**：

- 写入延迟高
- 需要特殊的缓存库支持

### 4.4 Write-Behind (异步写回) ⚡ 最快

更新时**只写缓存**，缓存服务异步批量更新数据库。

#### 工作原理

```
应用写请求 → 缓存服务
              ↓
           更新缓存（立即返回）
              ↓
           ⚡ 异步批量写数据库（后台进行）
```

**代码示例**：

```python
# 应用代码只需要
cache.set(user_id, user)  # 立即返回，不等待数据库

# 缓存服务会在后台批量写入：
# while True:
#     batch = cache.get_dirty_entries()
#     db.batch_update(batch)
```

**性能对比**：

| 模式              | 写入延迟 | 吞吐量       | 数据一致性 |
| :---------------- | :------- | :----------- | :--------- |
| **直接写 DB**     | ~50 ms   | ~1000 QPS    | 强一致     |
| **Write-Through** | ~50 ms   | ~1000 QPS    | 强一致     |
| **Cache-Aside**   | ~50 ms   | ~1000 QPS    | 最终一致   |
| **Write-Behind**  | ~1 ms    | ~100,000 QPS | 可能丢失   |

**优点**：

- ✅ 写入极快（毫秒级响应）
- ✅ 吞吐量极高（十万级 QPS）
- ✅ 减少数据库 IO（批量写入）

**缺点**：

- ❌ 数据可能丢失（缓存崩了，数据就没了）
- ❌ 缓存和数据库不一致（异步延迟）

**适用场景**：

- ✅ 秒杀系统（库存扣减）
- ✅ 点赞数、浏览量（可接受少量丢失）
- ✅ 计数器、统计信息
- ❌ 订单、支付（绝对不能丢）

### 4.5 四种模式对比总结

| 模式              | 谁控制缓存 | 读取策略 | 写入策略            | 一致性   | 性能 | 使用频率          |
| :---------------- | :--------- | :------- | :------------------ | :------- | :--- | :---------------- |
| **Cache-Aside**   | 应用代码   | 懒加载   | 先写 DB，删缓存     | 最终一致 | 中   | ⭐⭐⭐⭐⭐ 最常用 |
| **Read-Through**  | 缓存服务   | 自动加载 | 先写 DB，删缓存     | 最终一致 | 中   | ⭐⭐              |
| **Write-Through** | 缓存服务   | 自动加载 | 同时写缓存和 DB     | 强一致   | 低   | ⭐⭐              |
| **Write-Behind**  | 缓存服务   | 自动加载 | 只写缓存，异步写 DB | 可能丢失 | 极高 | ⭐⭐⭐            |

**选择建议**：

- **大多数场景**：使用 **Cache-Aside**，灵活且成熟
- **读多写少**：考虑 **Read-Through**，简化代码
- **强一致性要求**：考虑 **Write-Through**
- **海量写入，可接受丢失**：使用 **Write-Behind**

<CachePatternsDemo />

---

## 5. 缓存的"坑"与解决方案

### 5.1 缓存穿透 (Cache Penetration)

**问题**：查询一个**不存在的数据**（如恶意请求 id=-1），缓存没有，数据库也没有。导致每次请求都直接打到数据库。

**解决方案**：

1.  **布隆过滤器 (Bloom Filter)**：
    - 在缓存前加一层过滤器，快速判断"这个 id **肯定不存在**"。
    - 100% 判断不存在，但可能有**误判**（说不存在实际存在）。

```python
# 布隆过滤器示例
from pybloom_live import BloomFilter

# 预热：把所有有效的 user_id 放进去
bf = BloomFilter(capacity=1000000, error_rate=0.001)

for user_id in all_valid_user_ids:
    bf.add(user_id)

def get_user(user_id):
    # 第一道防线：布隆过滤器
    if user_id not in bf:
        return None  # 肯定不存在，直接返回

    # 第二道防线：缓存
    cached = cache.get(f'user:{user_id}')
    if cached is not None:
        return cached

    # 第三道防线：数据库
    user = db.get_user(user_id)
    if user:
        cache.set(f'user:{user_id}', user)
    else:
        # 即使数据库没有，也缓存一个空值（防止穿透）
        cache.set(f'user:{user_id}', NULL, ttl=60)
    return user
```

2.  **缓存空对象**：
    - 查询不存在时，缓存一个 NULL 值（TTL 设置短一点，如 5 分钟）。

### 5.2 缓存击穿 (Cache Breakdown)

**问题**：某个**热点数据**过期（如微博热搜），瞬间几百万请求同时打到数据库。

**解决方案**：

1.  **互斥锁 (Mutex Lock)**：
    - 只允许一个线程查数据库，其他线程等待。

```python
import threading

lock = threading.Lock()

def get_user(user_id):
    cached = cache.get(f'user:{user_id}')
    if cached:
        return cached

    # 缓存未命中，尝试获取锁
    if lock.acquire(blocking=False):
        try:
            # 只有拿到锁的线程才查数据库
            user = db.get_user(user_id)
            cache.set(f'user:{user_id}', user, ttl=600)
            return user
        finally:
            lock.release()
    else:
        # 没拿到锁，等待一下再重试
        time.sleep(0.01)
        return get_user(user_id)  # 递归重试
```

2.  **逻辑过期 (Logical Expiration)**：
    - 不设置 TTL，而是在 value 里存一个过期时间字段。
    - 查询时发现"逻辑过期"，异步更新缓存，同时返回旧数据。

### 5.3 缓存雪崩 (Cache Avalanche)

**问题**：大量缓存**同时过期**（如系统重启后，所有缓存都在 00:00:00 过期），数据库瞬间被打爆。

**解决方案**：

1.  **随机 TTL**：
    - 避免同时过期，TTL 加上随机值。

```python
import random

ttl = 600 + random.randint(-60, 60)  # 600 ± 60 秒
cache.set(f'user:{user_id}', user, ttl=ttl)
```

2.  **缓存预热**：
    - 系统启动时，主动加载热点数据到缓存。
    - 使用定时任务，提前刷新即将过期的热点数据。

3.  **熔断降级**：
    - 当数据库压力过大时，暂时停止更新缓存，直接返回降级数据（如"系统繁忙，请稍后再试"）。

<CacheProblemsDemo />

---

## 6. 缓存的一致性策略

缓存是副本，副本和主本（数据库）可能不一致。如何保证一致性？

### 6.1 数据更新流程

假设你要更新用户信息：

```python
# 方案 1：先更新数据库，再更新缓存
db.update(user)
cache.set(user)  # ⚠️ 问题：如果缓存更新失败，就不一致了

# 方案 2：先删除缓存，再更新数据库
cache.delete(user)
db.update(user)  # ⚠️ 问题：删除和更新之间，有并发读，读到了旧数据并写回缓存

# 方案 3：先更新数据库，再删除缓存（推荐）
db.update(user)
cache.delete(user)  # ✅ 最佳实践
```

**为什么删除而不是更新？**

假设两个线程同时更新：

| 时间 | 线程 A           | 线程 B           | 数据库 | 缓存  |
| :--- | :--------------- | :--------------- | :----- | :---- |
| 1    | 读 user (age=20) |                  | 20     | 20    |
| 2    |                  | 读 user (age=20) | 20     | 20    |
| 3    | 更新 age=25      |                  | 25     | 20    |
| 4    |                  | 更新 age=30      | 30     | 20    |
| 5    | 写缓存 (age=25)  |                  | 30     | 25 ❌ |
| 6    |                  | 写缓存 (age=30)  | 30     | 30 ✅ |

如果是**删除缓存**，则不存在这个问题。

### 6.2 延迟双删 (Delayed Double Deletion)

为了极致一致性，可以在更新数据库前后都删除缓存：

```python
def update_user(user_id, new_data):
    # 1. 第一次删除缓存
    cache.delete(f'user:{user_id}')

    # 2. 更新数据库
    db.update(user_id, new_data)

    # 3. 延迟几百毫秒后，再次删除缓存
    # （为了删除在步骤 1-2 之间被写入的旧数据）
    time.sleep(0.5)
    cache.delete(f'user:{user_id}')
```

### 6.3 订阅 Binlog (Canal / Debezium)

最完美的方案：**把缓存更新从应用代码中剥离**。

- 监听 MySQL 的 Binlog（变更日志）。
- 数据库更新后，异步消费 Binlog，更新/删除缓存。
- **优点**：代码解耦，最终一致性保证。

<CacheConsistencyDemo />

---

## 7. 实战：设计一个高性能缓存系统

### 7.1 需求分析

我们要设计一个"商品详情页"的缓存系统：

- **读多写少**：100 次浏览，1 次编辑。
- **热点集中**：20% 的商品占 80% 的访问。
- **可接受短时不一致**：价格延迟 1 秒更新没问题。

### 7.2 架构设计

```
客户端
    ↓
[本地缓存: Caffeine]
    - 容量: 1000 个商品
    - TTL: 30 秒
    - 用途: 极热点商品（如秒杀活动）
    ↓ (未命中)
[分布式缓存: Redis Cluster]
    - 容量: 100 万个商品
    - TTL: 5 分钟
    - 用途: 所有商品数据
    ↓ (未命中)
[数据库: MySQL]
    - 持久化存储
```

### 7.3 代码实现

```java
@Service
public class ProductService {

    // 本地缓存
    private final Cache<String, Product> localCache;

    // Redis 客户端
    @Autowired
    private RedisTemplate<String, Product> redisTemplate;

    // 数据库
    @Autowired
    private ProductMapper productMapper;

    /**
     * 三级缓存查询
     */
    public Product getProduct(String productId) {
        // L1: 本地缓存
        Product product = localCache.getIfPresent(productId);
        if (product != null) {
            return product;
        }

        // L2: Redis 缓存
        product = redisTemplate.opsForValue().get("product:" + productId);
        if (product != null) {
            localCache.put(productId, product);  // 回填本地缓存
            return product;
        }

        // L3: 数据库
        synchronized (this) {  // 防止缓存击穿
            // 双重检查
            product = redisTemplate.opsForValue().get("product:" + productId);
            if (product != null) {
                return product;
            }

            // 查数据库
            product = productMapper.selectById(productId);
            if (product == null) {
                // 缓存空对象（防止缓存穿透）
                redisTemplate.opsForValue().set(
                    "product:" + productId,
                    NULL_PRODUCT,
                    5,
                    TimeUnit.MINUTES
                );
                return null;
            }

            // 写入缓存（带随机 TTL，防止雪崩）
            int ttl = 300 + ThreadLocalRandom.current().nextInt(-30, 30);
            redisTemplate.opsForValue().set("product:" + productId, product, ttl, TimeUnit.SECONDS);
            localCache.put(productId, product);

            return product;
        }
    }

    /**
     * 更新商品（Cache-Aside 模式）
     */
    public void updateProduct(Product product) {
        // 1. 更新数据库
        productMapper.updateById(product);

        // 2. 删除缓存（而不是更新）
        redisTemplate.delete("product:" + product.getId());
        localCache.invalidate(product.getId());

        // 3. （可选）延迟双删
        CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(500);
                redisTemplate.delete("product:" + product.getId());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    }
}
```

### 7.4 监控与调优

```java
@RestController
public class CacheMetricsController {

    @Autowired
    private Cache localCache;

    @GetMapping("/cache/stats")
    public Map<String, Object> getCacheStats() {
        CacheStats stats = localCache.stats();

        return Map.of(
            "hitRate", stats.hitRate(),              // 命中率（目标: > 90%）
            "hitCount", stats.hitCount(),            // 命中次数
            "missCount", stats.missCount(),          // 未命中次数
            "evictionCount", stats.evictionCount(),  // 淘汰次数
            "averageLoadPenalty", stats.averageLoadPenalty()  // 平均加载耗时 (ns)
        );
    }
}
```

**关键指标**：

- **命中率 (Hit Rate)**：> 90% 为优秀。
- **平均加载耗时 (Average Load Penalty)**：未命中时加载数据的平均时间，越小越好。
- **淘汰次数 (Eviction Count)**：过高说明缓存容量不足。

<ProductCacheDemo />

---

## 8. 总结与学习路线

缓存设计是后端系统的"核心技能"，掌握它能让你的系统性能提升 **10-100 倍**。

### 8.1 核心知识点

| 知识点                 | 重要程度   | 难度 | 实战频率 |
| :--------------------- | :--------- | :--- | :------- |
| **多级缓存架构**       | ⭐⭐⭐⭐⭐ | 中   | 极高     |
| **Cache-Aside 模式**   | ⭐⭐⭐⭐⭐ | 低   | 极高     |
| **缓存穿透/击穿/雪崩** | ⭐⭐⭐⭐⭐ | 高   | 高       |
| **布隆过滤器**         | ⭐⭐⭐⭐   | 中   | 中       |
| **缓存一致性**         | ⭐⭐⭐⭐   | 高   | 高       |
| **分布式锁**           | ⭐⭐⭐⭐   | 中   | 中       |
| **缓存监控与调优**     | ⭐⭐⭐⭐   | 中   | 高       |

### 8.2 学习路线

1.  **入门**（1-2 天）：
    - 理解缓存的本质和局部性原理。
    - 使用 Redis 做简单的键值缓存。
    - 掌握 Cache-Aside 模式。

2.  **进阶**（1 周）：
    - 实现多级缓存（本地缓存 + Redis）。
    - 解决缓存三大问题（穿透、击穿、雪崩）。
    - 学习布隆过滤器、分布式锁。

3.  **实战**（2-4 周）：
    - 设计一个高并发的商品详情页缓存系统。
    - 接入监控系统，实时观测缓存命中率。
    - 压测验证性能提升。

4.  **深入**（持续）：
    - 学习 Redis 高可用（哨兵、集群）。
    - 研究热点数据的自动识别与预热。
    - 探索一致性哈希、缓存分片算法。

### 8.3 推荐资源

- **书籍**：
  - 《Redis 设计与实现》（Huangz）
  - 《高性能 MySQL》（第 5 章：缓存）
- **文章**：
  - Redis 官方文档: https://redis.io/docs/
  - Google 的《缓存设计指南》
- **工具**：
  - Redis Desktop Manager (Redis 可视化)
  - JMeter (压测工具)

---

## 9. 名词速查表 (Glossary)

| 名词                   | 全称                | 解释                                                                             |
| :--------------------- | :------------------ | :------------------------------------------------------------------------------- |
| **Cache**              | -                   | **缓存**。存储数据副本的快速存储层，用于加速访问。                               |
| **Hit Ratio**          | -                   | **命中率**。缓存命中的请求数占总请求数的比例（目标: > 90%）。                    |
| **TTL**                | Time To Live        | **生存时间**。缓存条目的过期时间。                                               |
| **Cache Penetration**  | -                   | **缓存穿透**。查询不存在的数据，导致请求直接打到数据库。                         |
| **Cache Breakdown**    | -                   | **缓存击穿**。热点数据过期，瞬间大量请求打到数据库。                             |
| **Cache Avalanche**    | -                   | **缓存雪崩**。大量缓存同时过期，数据库压力骤增。                                 |
| **Bloom Filter**       | -                   | **布隆过滤器**。空间效率高的概率型数据结构，用于判断"一个元素是否在一个集合中"。 |
| **Eviction**           | -                   | **淘汰**。缓存满了时，删除旧数据为新数据腾空间。                                 |
| **LRU**                | Least Recently Used | **最近最少使用**。常见的缓存淘汰策略。                                           |
| **Cache-Aside**        | -                   | **旁路缓存**。应用代码直接操作缓存和数据库的模式。                               |
| **Read-Through**       | -                   | **读穿透**。缓存库自动从数据库加载数据。                                         |
| **Write-Through**      | -                   | **写穿透**。写入缓存时同步写入数据库。                                           |
| **Write-Behind**       | -                   | **异步写回**。写入缓存后异步批量写数据库，性能高但可能丢失数据。                 |
| **Consistent Hashing** | -                   | **一致性哈希**。分布式缓存中用于数据分片的算法。                                 |
| **Local Cache**        | -                   | **本地缓存**。与应用在同一进程内的缓存（如 Caffeine）。                          |
| **Distributed Cache**  | -                   | **分布式缓存**。独立服务，通过网络访问（如 Redis）。                             |
