# 数据模型：设计的"骨架"

::: tip 🎯 核心问题
**如何设计合理的数据结构？** 这就像问：盖房子前怎么画图纸？仓库怎么摆放货物最高效？家族谱系怎么记录最清晰？数据模型解决的就是"数据如何组织"的问题。
:::

---

## 0. 先问一个问题：你有没有经历过这些噩梦？

**场景一：表设计混乱**

```
users 表：
| id | name | address | order_1 | order_1_amount | order_2 | order_2_amount | ... |
```

订单字段重复 100 次，每次下单都要改表结构。

**场景二：数据冗余严重**

```
orders 表：
| id | user_name | user_email | user_phone | product_name | product_price |
```

用户信息、商品信息全部复制到订单表，修改用户邮箱需要更新所有历史订单。

**场景三：关系处理错误**

```
posts 表：
| id | title | tags |
| 1  | Vue入门 | vue,frontend,javascript |
```

用逗号分隔存储标签，无法查询"有哪些文章包含 vue 标签"。

---

**好的数据模型就像建筑蓝图**——结构清晰、扩展灵活、关系明确。

---

## 1. 数据模型的重要性

**数据模型**（Data Model）是对现实世界的抽象，描述数据如何存储、组织和关联。

### 1.1 用建筑来类比

| 建筑概念 | 对应概念 | 说明 |
| :--- | :--- | :--- |
| 蓝图 | 数据模型 | 设计的"骨架"和结构 |
| 承重墙 | 主键/外键 | 保证结构稳固的核心 |
| 房间布局 | 表结构 | 各个功能单元的设计 |
| 水电管线 | 关系 | 连接各个部分的数据流 |

### 1.2 数据模型的层次

| 层次 | 内容 | 示例 |
| :--- | :--- | :--- |
| **概念模型** | 业务对象和关系 | 用户、订单、商品 |
| **逻辑模型** | 表结构、关系类型 | users 表 1:N orders 表 |
| **物理模型** | 具体存储实现 | 字段类型、索引、分区 |

---

## 2. ER 图：实体关系建模

**ER 图**（Entity-Relationship Diagram）是用图形化方式描述数据模型的工具。

### 2.1 核心概念

| 符号 | 含义 | 示例 |
| :--- | :--- | :--- |
| **矩形** | 实体（表） | 用户、订单、商品 |
| **椭圆** | 属性（字段） | 用户名、邮箱、电话 |
| **菱形** | 关系 | 下单、支付、评论 |
| **线条** | 连接 | 表与表的关联 |

### 2.2 完整的 ER 图示例

👇 **动手试试看**：探索用户-订单-商品的实体关系模型：

<DataModelsDemo />

---

## 3. 关系类型：一对一、一对多、多对多

关系类型决定了表之间如何关联，是数据模型设计的核心。

### 3.1 一对一（One-to-One）

**定义**：A 表的一条记录对应 B 表的一条记录。

**示例**：用户 ↔ 详细资料

```sql
users 表：          user_profiles 表：
| id | username |   | user_id | bio | avatar |
| 1  | 张三     |   | 1       | ... | ...    |
```

**实现方式**：

```sql
-- 方式 1：外键唯一约束
CREATE TABLE user_profiles (
  user_id BIGINT PRIMARY KEY,
  bio TEXT,
  avatar VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 方式 2：直接在主表扩展
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(50),
  profile_id BIGINT UNIQUE,
  FOREIGN KEY (profile_id) REFERENCES user_profiles(id)
);
```

**使用场景**：
- 用户表 + 详细资料表（分离敏感信息）
- 订单表 + 支付信息表（分离支付数据）
- 商品表 + 库存表（分离库存管理）

::: tip 💡 什么时候用一对一？
当字段数量过多（超过 20 个）或需要分离敏感信息时，考虑拆分为一对一关系。
:::

### 3.2 一对多（One-to-Many）

**定义**：A 表的一条记录对应 B 表的多条记录。

**示例**：用户 → 订单

```sql
users 表：          orders 表：
| id | username |   | id | user_id | amount |
| 1  | 张三     |   | 1  | 1       | 100    |
                    | 2  | 1       | 200    |
```

**实现方式**：

```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  amount DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 查询某用户的所有订单
SELECT * FROM orders WHERE user_id = 1;
```

**使用场景**：
- 用户 → 订单
- 分类 → 商品
- 部门 → 员工

::: tip 💡 最常见的关系
一对多是关系型数据库中最常见的关系，约占 70% 的场景。
:::

### 3.3 多对多（Many-to-Many）

**定义**：A 表的多条记录对应 B 表的多条记录。

**示例**：学生 ↔ 课程

```sql
students 表：        courses 表：        enrollments 表（中间表）：
| id | name  |      | id | title |     | student_id | course_id |
| 1  | 小明  |      | 1  | 数学  |     | 1          | 1         |
| 2  | 小红  |      | 2  | 英语  |     | 1          | 2         |
                                     | 2          | 1         |
```

**实现方式**：

```sql
-- 学生表
CREATE TABLE students (
  id BIGINT PRIMARY KEY,
  name VARCHAR(50)
);

-- 课程表
CREATE TABLE courses (
  id BIGINT PRIMARY KEY,
  title VARCHAR(100)
);

-- 中间表（选课记录）
CREATE TABLE enrollments (
  student_id BIGINT,
  course_id BIGINT,
  enrolled_at TIMESTAMP,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- 查询小明选的所有课程
SELECT c.* FROM courses c
JOIN enrollments e ON c.id = e.course_id
WHERE e.student_id = 1;
```

**使用场景**：
- 学生 ↔ 课程
- 用户 ↔ 角色
- 商品 ↔ 标签
- 文章 ↔ 分类

::: tip 💡 多对多需要中间表
多对多关系必须通过中间表来实现，中间表包含两个外键，分别指向两张表。
:::

---

## 4. 范式理论：从混乱到有序

**范式**（Normalization）是数据库设计的规范，目的是消除数据冗余，避免数据异常。

### 4.1 第一范式（1NF）：字段原子性

**要求**：每个字段都是不可再分的最小数据单元。

❌ **不符合 1NF**：

```sql
-- 用户和地址混在一起
| id | name | contact_info              |
| 1  | 张三 | 北京朝阳区,13800138000     |
```

✅ **符合 1NF**：

```sql
| id | name | city        | district   | phone        |
| 1  | 张三 | 北京        | 朝阳区     | 13800138000  |
```

::: tip 💡 1NF 是基础
所有关系型数据库默认都满足 1NF，因为字段本身就不能存储复杂对象（JSON 除外）。
:::

### 4.2 第二范式（2NF）：消除部分依赖

**要求**：非主键字段必须完全依赖于主键（针对复合主键）。

❌ **不符合 2NF**：

```sql
-- 订单明细表：(order_id, product_id) 是复合主键
| order_id | product_id | product_name | quantity | unit_price |
| 100      | 1          | iPhone       | 2        | 5999       |
```

**问题**：`product_name` 和 `unit_price` 只依赖 `product_id`，不依赖 `order_id`。

✅ **符合 2NF**：

```sql
-- 订单明细表
| order_id | product_id | quantity |
| 100      | 1          | 2        |

-- 商品表
| product_id | name   | price    |
| 1          | iPhone | 5999     |
```

::: tip 💡 2NF 针对复合主键
如果主键是单个字段，则自动满足 2NF。2NF 主要解决复合主键的部分依赖问题。
:::

### 4.3 第三范式（3NF）：消除传递依赖

**要求**：非主键字段不传递依赖于主键。

❌ **不符合 3NF**：

```sql
-- 订单表
| id | user_id | total | user_level | discount |
| 1  | 100     | 500   | VIP        | 0.9      |
```

**问题**：`user_level` 依赖 `user_id`，再依赖 `id`（传递依赖）。

✅ **符合 3NF**：

```sql
-- 订单表
| id | user_id | total | discount |
| 1  | 100     | 500   | 0.9      |

-- 用户表
| id | level |
| 100| VIP   |
```

::: tip 💡 3NF 是最常见的范式
实际业务中，大部分表设计都遵循 3NF，它在数据冗余和查询性能之间取得了平衡。
:::

### 4.4 范式对比演示

👇 **点击下方标签页，查看各范式的对比**：

<DataModelsDemo />

---

## 5. 反范式化：用空间换时间

**范式化**虽然能消除冗余，但查询时需要多次 JOIN，影响性能。

**反范式化**（Denormalization）是有意增加冗余，换取查询性能提升。

### 5.1 何时需要反范式化？

| 场景 | 说明 |
| :--- | :--- |
| **高频查询** | 每秒数百次查询，JOIN 成为瓶颈 |
| **大数据量** | 表数据超过千万级，JOIN 性能下降 |
| **报表统计** | 需要聚合计算，预先存储结果 |
| **分布式系统** | 跨库 JOIN 困难，需要冗余数据 |

### 5.2 反范式化实战

**场景**：电商订单查询

**范式化设计**：

```sql
-- 订单表
orders (id, user_id, total, status)
users (id, name, email)

-- 查询订单及用户信息
SELECT o.*, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.id = 123;
```

**性能问题**：每次查询都需要 JOIN，数据量大时慢。

**反范式化设计**：

```sql
-- 订单表（冗余用户信息）
orders (id, user_id, user_name, user_email, total, status)

-- 查询订单（单表查询）
SELECT * FROM orders WHERE id = 123;
```

**性能提升**：无需 JOIN，单表查询速度快 5-10 倍。

**代价**：
- 存储空间增加（每个订单多存用户名和邮箱）
- 更新成本增加（修改用户邮箱需更新所有历史订单）

### 5.3 反范式化的设计原则

| 原则 | 说明 |
| :--- | :--- |
| **冗余不经常变化的数据** | 如用户名、商品名称（很少修改） |
| **冗余查询频繁的字段** | 如订单列表展示的用户名、商品图片 |
| **保留原始表** | 范式化表作为"主表"，反范式化表作为"查询表" |
| **数据同步策略** | 通过定时任务、消息队列同步冗余字段 |

::: warning ⚠️ 反范式化的风险
- 数据冗余：占用更多存储空间
- 更新异常：修改数据需同步多处
- 数据不一致：同步失败导致数据不匹配

**建议**：核心交易表保持范式化，查询表、统计表适当反范式化。
:::

---

## 6. 常见反模式及改进

**反模式**（Antipattern）是看似正确但实际有害的设计模式。

### 6.1 反模式 1：巨型宽表

**错误设计**：

```sql
-- 将所有数据塞进一张表
CREATE TABLE big_table (
  id BIGINT,
  -- 用户字段
  user_name, user_email, user_phone,
  -- 订单字段（重复 100 次）
  order_1_id, order_1_amount, order_1_status,
  order_2_id, order_2_amount, order_2_status,
  -- ...
  order_100_id, order_100_amount, order_100_status
);
```

**问题**：
- 字段数量爆炸，超过数据库限制
- 大量空值，浪费存储空间
- 新增订单需要修改表结构（DDL 操作）
- 无法查询"某个用户的所有订单"

**正确设计**：

```sql
-- 用户表
users (id, name, email, phone)

-- 订单表
orders (id, user_id, amount, status, created_at)
```

### 6.2 反模式 2：逗号分隔值

**错误设计**：

```sql
-- 文章表，用逗号分隔标签
posts (id, title, tags)

| id | title    | tags                    |
| 1  | Vue入门  | vue,frontend,javascript |
```

**问题**：
- 无法索引，查询慢
- 无法关联查询"有哪些文章包含 vue 标签"
- 无法统计"每个标签有多少篇文章"
- 修改标签需要字符串操作

**正确设计**：

```sql
-- 文章表
posts (id, title)

-- 标签表
tags (id, name)

-- 文章-标签关联表
post_tags (post_id, tag_id)

-- 查询包含 vue 标签的文章
SELECT p.* FROM posts p
JOIN post_tags pt ON p.id = pt.post_id
JOIN tags t ON pt.tag_id = t.id
WHERE t.name = 'vue';
```

### 6.3 反模式 3：滥用 JSON 字段

**错误设计**：

```sql
-- 订单表，订单明细存为 JSON
orders (id, user_id, items, total)

| id | user_id | items                              | total |
| 1  | 100     | [{"pid":1,"qty":2},{"pid":2,"qty":1}] | 500   |
```

**问题**：
- 无法建立外键约束
- 无法有效索引（MySQL 5.7+ 部分支持）
- 数据完整性差（插入错误数据无法检测）
- 查询"某个商品的所有订单"需要全文扫描

**正确设计**：

```sql
-- 订单表
orders (id, user_id, total)

-- 订单明细表
order_items (id, order_id, product_id, quantity, price)
```

::: tip 💡 什么时候用 JSON？
JSON 适合存储非结构化、低频查询的数据，如：
- 用户的扩展配置信息
- 商品的动态属性（不同品类属性不同）
- 日志、埋点数据
:::

---

## 7. 实战：电商系统数据模型

下面是一个完整的电商系统数据模型设计。

### 7.1 核心模块

**用户模块**：

```sql
-- 用户表
users (id, username, email, password_hash, created_at)

-- 用户地址表
user_addresses (id, user_id, province, city, district, detail, is_default)

-- 用户资料表
user_profiles (id, user_id, nickname, avatar, bio)
```

**商品模块**：

```sql
-- 分类表
categories (id, name, parent_id, level)

-- 商品表
products (id, category_id, name, description, created_at)

-- 商品 SKU 表
product_skus (id, product_id, specs, price, stock)

-- 库存表
product_inventory (sku_id, warehouse_id, quantity)
```

**订单模块**：

```sql
-- 订单表
orders (
  id,
  user_id,
  user_name,          -- 冗余，反范式化
  total_amount,
  discount_amount,
  pay_amount,
  status,
  created_at
)

-- 订单明细表
order_items (
  id,
  order_id,
  product_id,
  product_name,       -- 冗余，反范式化
  product_sku_id,
  price,
  quantity
)

-- 支付记录表
payments (id, order_id, amount, method, status, transaction_id)
```

**营销模块**：

```sql
-- 优惠券表
coupons (id, name, type, discount, min_amount, stock)

-- 用户优惠券表
user_coupons (id, user_id, coupon_id, status, used_at)

-- 促销活动表
promotions (id, name, type, discount, start_time, end_time)
```

### 7.2 关系设计

| 关系 | 类型 | 说明 |
| :--- | :--- | :--- |
| users ↔ orders | 1:N | 一个用户有多个订单 |
| orders ↔ order_items | 1:N | 一个订单有多个明细 |
| products ↔ product_skus | 1:N | 一个商品有多个 SKU |
| users & coupons | M:N | 通过 user_coupons 中间表 |
| products & categories | M:N | 一个商品可属于多个分类 |

### 7.3 反范式化策略

| 字段 | 冗余位置 | 原因 |
| :--- | :--- | :--- |
| user_name | orders 表 | 避免查询订单时 JOIN users 表 |
| product_name | order_items 表 | 避免商品改名后历史订单显示问题 |
| product_price | order_items 表 | 保存下单时价格，避免价格变动影响 |

---

## 8. 数据模型设计流程

### 8.1 需求分析阶段

1. **识别业务实体**：用户、订单、商品、优惠券
2. **梳理业务关系**：用户下单、商品分类、优惠券使用
3. **确定数据量级**：预计用户数、订单数、商品数

### 8.2 概念模型阶段

1. **绘制 ER 图**：用图形化工具（如 draw.io、MySQL Workbench）
2. **标注关系类型**：一对一、一对多、多对多
3. **确定主外键**：每个表的主键、外键关联

### 8.3 逻辑模型阶段

1. **设计表结构**：字段名、类型、约束
2. **应用范式理论**：确保满足 3NF
3. **考虑扩展性**：预留扩展字段（如 ext_json）

### 8.4 物理模型阶段

1. **选择存储引擎**：InnoDB（事务）、MyISAM（只读）
2. **设计索引**：主键索引、外键索引、唯一索引
3. **分区策略**：按时间、ID 范围分区

### 8.5 优化迭代阶段

1. **性能测试**：模拟真实查询，分析慢查询
2. **适当反范式化**：高频查询表冗余字段
3. **数据归档**：历史数据迁移到归档表

---

## 9. 用 AI 辅助设计数据模型

AI 可以帮你快速生成符合规范的数据模型。关键在于提供清晰的业务描述。

### 9.1 提示词模板

```
你是一位资深的数据库架构师，精通关系型数据库设计。请帮我设计数据模型。

## 业务背景
[描述你的业务场景，例如：电商系统、博客平台、任务管理系统]

## 核心实体
[列出主要的业务对象，例如：
- 用户：注册、登录、个人信息
- 订单：下单、支付、发货
- 商品：分类、库存、价格]

## 关系说明
[描述实体之间的关系，例如：
- 一个用户可以有多个订单
- 一个订单包含多个商品
- 商品属于分类，多级分类]

## 设计要求
1. 遵循 3NF 范式
2. 明确标注主键（PK）和外键（FK）
3. 说明表之间的一对一、一对多、多对多关系
4. 考虑反范式化策略（如果需要）
5. 提供完整的建表 SQL（MySQL 语法）

## 输出格式
请按以下格式输出：

### 表结构
- 表名：说明
  - 字段定义

### 关系图
用文字描述表之间的关系

### 索引建议
列出需要建立的索引

### 反范式化建议
说明哪些字段需要冗余，为什么
```

### 9.2 实战示例：博客系统

**输入提示词**：

```
你是一位资深的数据库架构师。请帮我设计一个博客系统的数据模型。

## 业务背景
一个多用户博客平台，用户可以发布文章、评论、点赞。

## 核心实体
- 用户：昵称、邮箱、密码
- 文章：标题、内容、发布时间
- 评论：评论内容、评论时间
- 标签：文章可以打多个标签

## 关系说明
- 一个用户可以发表多篇文章
- 一篇文章可以有多个评论
- 一篇文章可以有多个标签
- 一个用户可以点赞多篇文章

## 设计要求
1. 遵循 3NF 范式
2. 标注 PK 和 FK
3. 说明关系类型
4. 提供建表 SQL
```

**AI 输出示例**：

```sql
-- 用户表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文章表
CREATE TABLE posts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 评论表
CREATE TABLE comments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  post_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 标签表
CREATE TABLE tags (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- 文章-标签关联表
CREATE TABLE post_tags (
  post_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- 点赞表
CREATE TABLE likes (
  user_id BIGINT NOT NULL,
  post_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 索引建议
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
```

### 9.3 AI 辅助设计的注意事项

| 注意点 | 说明 |
| :--- | :--- |
| **提供完整上下文** | 业务场景、数据量级、查询模式都要说明 |
| **明确关系类型** | 一对一、一对多、多对多要说清楚 |
| **要求解释原因** | 让 AI 说明为什么这样设计 |
| **检查约束条件** | 主键、外键、唯一索引是否合理 |
| **考虑扩展性** | 询问未来可能的扩展场景 |
| **人工审核** | AI 生成的内容需要人工检查是否符合业务需求 |

::: tip 💡 追问技巧
- "请说明这个设计遵循了哪些范式"
- "如果数据量达到千万级，如何优化"
- "哪些字段可以考虑反范式化"
- "请补充索引设计的理由"
:::

---

## 名词速查表

| 名词 | 英文 | 解释 |
| :--- | :--- | :--- |
| **数据模型** | Data Model | 对现实世界的抽象，描述数据如何存储、组织和关联 |
| **ER 图** | Entity-Relationship Diagram | 用图形化方式描述实体关系的工具 |
| **主键** | Primary Key | 唯一标识表中每条记录的字段 |
| **外键** | Foreign Key | 关联另一张表主键的字段 |
| **范式** | Normalization | 数据库设计的规范，消除数据冗余 |
| **反范式化** | Denormalization | 有意增加冗余，换取查询性能提升 |
| **一对一** | One-to-One | A 表一条记录对应 B 表一条记录 |
| **一对多** | One-to-Many | A 表一条记录对应 B 表多条记录 |
| **多对多** | Many-to-Many | A 表多条记录对应 B 表多条记录 |
| **中间表** | Junction Table | 实现多对多关系的关联表 |
| **冗余** | Redundancy | 数据重复存储 |
| **传递依赖** | Transitive Dependency | A → B → C，C 传递依赖 A |
| **部分依赖** | Partial Dependency | 非主键字段只依赖复合主键的一部分 |
| **原子性** | Atomicity | 字段不可再分的最小数据单元 |
| **宽表** | Wide Table | 字段数量特别多的表 |
| **索引** | Index | 加速查询的数据结构 |
| **约束** | Constraint | 保证数据完整性的规则（如 NOT NULL、UNIQUE） |
