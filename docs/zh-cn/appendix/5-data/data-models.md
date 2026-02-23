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

## 0.5 从零开始：什么是数据？

在深入了解数据模型之前，我们需要先搞清楚几个最基础的问题。

### 0.5.1 什么是数据？

**数据**就是对事物的记录。

**生活中的例子**：

- 你的购物车里的商品：商品名称、价格、数量、图片链接
- 你的通讯录：姓名、电话、邮箱、地址
- 你的书架：书名、作者、出版社、出版年份
- 你的游戏存档：等级、经验值、装备、金币

这些都是"数据"——它们记录了某种信息。

### 0.5.2 数据为什么要组织？

想象一下这些场景：

**场景一：杂乱的通讯录**

```
张三 13800138000 北京朝阳区
李四 13900139000 上海浦东新区
王五 13700137000 lisi@example.com
赵六 13600136000 广州天河区 zhaoliu@example.com
```

所有信息混在一起，你想：
- 找"李四"的电话号码 → 需要逐行扫描
- 找所有"广州"的人 → 需要逐行判断
- 添加一个人的邮箱 → 格式不统一，不知道放哪里

**场景二：有组织的通讯录**

```
姓名        电话           邮箱                    城市
张三        13800138000    zhangsan@example.com    北京朝阳区
李四        13900139000    lisi@example.com        上海浦东新区
王五        13700137000    wangwu@example.com      深圳南山区
赵六        13600136000    zhaoliu@example.com     广州天河区
```

现在：
- 找"李四"的电话 → 在"姓名"列查找 → 快速定位
- 找所有"广州"的人 → 在"城市"列筛选 → 一目了然
- 添加新信息 → 按列填写 → 格式统一

**结论**：**数据需要组织才能高效使用！**

### 0.5.3 一个简单的例子：记录你的书架

让我们用一个最简单的例子——"记录你的书架"——来理解数据模型是如何一步步形成的。

**第一步：原始想法（用一张纸记录）**

```
我的书架：
《JavaScript高级程序设计》 Matt Frisbie 2020年 人民邮电出版社
《Vue.js设计与实现》 霍春阳 2022年 人民邮电出版社
《深入浅出Node.js》 朴灵 2013年 人民邮电出版社
```

**问题**：
- 想找"2022年"出版的书 → 需要逐行看
- 想找"人民邮电出版社"的所有书 → 需要逐行判断
- 想按"出版年份"排序 → 需要重新整理

**第二步：用表格组织（这就是数据模型的雏形）**

```
| 书名                        | 作者       | 出版年份 | 出版社         |
|---------------------------|-----------|---------|--------------|
| JavaScript高级程序设计      | Matt Frisbie | 2020   | 人民邮电出版社  |
| Vue.js设计与实现           | 霍春阳      | 2022   | 人民邮电出版社  |
| 深入浅出Node.js            | 朴灵       | 2013   | 人民邮电出版社  |
```

**改进**：
- 每列有明确的含义（书名、作者、出版年份、出版社）
- 可以按任意列排序
- 可以按任意列筛选（比如找出所有"人民邮电出版社"的书）

**第三步：发现新需求（多本书有多个作者）**

```
问题：《重构：改善既有代码的设计》有两个作者：Martin Fowler 和 Kent Beck
```

怎么记录？

**错误做法**：把两个名字塞进一个字段

```
| 书名   | 作者                    |
|------|------------------------|
| 重构   | Martin Fowler, Kent Beck |
```

**问题**：
- 无法单独查询"Martin Fowler 写了哪些书"
- 无法统计"每个作者写了几本书"
- 修改作者名字时需要字符串操作

**正确做法**：拆分成两张表，用"关系"连接

```
书籍表：
| 书名           | 出版年份 |
|--------------|---------|
| 重构           | 2019    |
| JavaScript高级程序设计 | 2020   |

作者表：
| 作者姓名           |
|------------------|
| Martin Fowler     |
| Kent Beck         |
| Matt Frisbie      |

书籍-作者关联表：
| 书名           | 作者姓名        |
|--------------|---------------|
| 重构           | Martin Fowler |
| 重构           | Kent Beck     |
| JavaScript高级程序设计 | Matt Frisbie  |
```

**这就是数据模型设计的核心**：
1. **识别实体**（书、作者）
2. **设计属性**（书名、出版年份、作者姓名）
3. **建立关系**（一本书可以有多个作者）

### 0.5.4 什么是数据模型？

**数据模型**（Data Model）就是对"数据如何组织、存储、关联"的设计方案。

**用盖房子来类比**：

| 盖房子 | 数据模型 |
|:-----|:-------|
| 蓝图设计 | 数据模型设计 |
| 客厅、卧室、厨房 | 不同的表（用户表、订单表、商品表） |
| 承重墙、水电管线 | 主键、外键（关系） |
| 房屋的格局 | 表的结构（字段、类型） |

::: tip 💡 为什么要设计数据模型？
想象一下：
- 没有蓝图盖房子 → 房子可能会倒、功能混乱、无法扩建
- 没有数据模型写程序 → 数据冗余、查询缓慢、难以维护

**好的数据模型让你：**
- 数据不重复（节省空间）
- 查询快速（性能好）
- 易于扩展（新增功能方便）
- 避免错误（数据一致性强）
:::

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

### 2.0 为什么需要画图？

想象你和朋友聊天，描述你的家庭关系：

**用文字描述**：
> "我有一个爸爸、一个妈妈、一个哥哥。我爸爸的父母是我爷爷奶奶，我妈妈的父母是我外公外婆。我哥哥结婚了，有一个嫂子。"

听的人可能会困惑：
- 你哥哥和你嫂子是什么关系？
- 你和你嫂子是什么关系？
- 如果你哥哥又有孩子，那孩子和你是什么关系？

**用图画出来**：

```
        爷爷 -- 奶奶
            |
            爸爸  --  妈妈 -- 外公 -- 外婆
                |       |
              你    哥哥 -- 嫂子
```

瞬间就清晰了！

**ER 图的作用**：
- 把复杂的"数据关系"可视化
- 帮助设计者理清思路
- 方便团队沟通讨论
- 在写代码前发现问题

**ER 图**（Entity-Relationship Diagram，实体关系图）就是专门用来画"数据关系"的工具。

### 2.1 手把手：从零画出你的第一个 ER 图

让我们用一个**家庭关系**的例子，一步步画出 ER 图。

#### 第一步：识别"实体"

**实体**（Entity）就是现实世界中的"对象"或"事物"。

在家庭关系中，实体有：
- 人（Person）
- 家庭（Family）

**问题**：我们把"人"作为核心实体，"家庭"可以暂时忽略。

#### 第二步：确定"属性"

**属性**（Attribute）就是实体的"特征"或"信息"。

"人"这个实体的属性：
- 姓名（name）
- 性别（gender）
- 出生日期（birth_date）
- 身份证号（id_card）

#### 第三步：识别"关系"

**关系**（Relationship）就是实体之间的"联系"。

家庭中的关系：
- 结婚（丈夫 ↔ 妻子）
- 亲子（父母 → 孩子）
- 兄弟姐妹（兄弟姐妹之间）

#### 第四步：确定"关系类型"

每种关系都有一个"基数"（Cardinality）：

**一对一（1:1）**：
- 一个丈夫 ↔ 一个妻子（假设一夫一妻制）
```
丈夫 1 ---- 1 妻子
```

**一对多（1:N）**：
- 一个父母 → 多个孩子
```
父母 1 ---- N 孩子
```

**多对多（M:N）**：
- 多个兄弟姐妹 ↔ 多个兄弟姐妹
```
兄弟姐妹 M ---- N 兄弟姐妹
```

#### 第五步：画出完整的 ER 图

**ER 图的基本符号**：

| 符号 | 名称 | 含义 | 生活类比 |
|:---:|:---:|:---|:---|
| ▭ | 矩形 | 实体（表） | 一个"箱子"装一类数据 |
| ▭ | 椭圆 | 属性（字段） | 箱子里的"物品" |
| ◇ | 菱形 | 关系 | 箱子之间的"连线" |
| — | 线条 | 连接 | 把东西串起来的"绳子" |

**家庭关系的 ER 图示例**：

```
    ┌─────────┐
    │   人    │
    └─────────┘
    │ 姓名    │
    │ 性别    │
    │ 出生日期│
    └─────────┘
         │
         │
    ┌────┴────┐
    │         │
  结婚       亲子
  1:1       1:N
```

::: tip 💡 为什么要画 ER 图？
1. **设计前理清思路**：画图比改代码容易得多
2. **团队沟通**：一张图胜过千言万语
3. **发现遗漏**：画图时容易发现"咦，这个关系好像没考虑"
4. **文档留存**：新人看图就能理解系统结构
:::

### 2.2 核心概念详解

#### 实体（Entity）

**实体**就是你想记录的"对象"或"事物"。

**示例**：
- 用户（User）
- 订单（Order）
- 商品（Product）
- 文章（Article）

**如何识别实体？**
问自己："我需要记录什么信息？"
- 我需要记录用户 → 用户实体
- 我需要记录订单 → 订单实体
- 我需要记录商品 → 商品实体

#### 属性（Attribute）

**属性**就是实体的"特征"或"详细信息"。

**示例**：
- 用户实体的属性：用户名、邮箱、电话、注册时间
- 订单实体的属性：订单号、金额、状态、创建时间

**如何识别属性？**
问自己："这个实体有哪些信息需要记录？"

#### 关系（Relationship）

**关系**就是实体之间的"联系"。

**示例**：
- 用户**下**订单（下单关系）
- 订单**包含**商品（包含关系）
- 用户**购买**商品（购买关系）

**如何识别关系？**
问自己："这些实体之间有什么关联？"

### 2.3 用一个简单例子练习

让我们画一个**班级管理系统**的 ER 图。

#### 第一步：识别实体

在这个系统中，有哪些实体？
- 学生（Student）
- 课程（Course）
- 老师（Teacher）

#### 第二步：确定属性

每个实体有哪些属性？

**学生**：学号、姓名、班级
**课程**：课程编号、课程名称、学分
**老师**：工号、姓名、职称

#### 第三步：识别关系

- 学生**选修**课程（多对多：一个学生可以选多门课，一门课可以被多个学生选）
- 老师**教授**课程（一对多：一个老师可以教多门课，一门课通常由一个老师教）

#### 第四步：画出 ER 图

```
  ┌─────────┐
  │  学生   │
  └─────────┘
  │ 学号    │
  │ 姓名    │
  │ 班级    │
  └─────────┘
      │
      │ 选修 (M:N)
      │
  ┌─────────┐
  │  课程   │
  └─────────┘
  │ 课程编号│
  │ 课程名称│
  │ 学分    │
  └─────────┘
      │
      │ 教授 (1:N)
      │
  ┌─────────┐
  │  老师   │
  └─────────┘
  │ 工号    │
  │ 姓名    │
  │ 职称    │
  └─────────┘
```

### 2.4 核心概念总结表

| 符号 | 含义 | 示例 | 通俗理解 |
| :--- | :--- | :--- | :--- |
| **矩形** | 实体（表） | 用户、订单、商品 | 一个"箱子"装一类数据 |
| **椭圆** | 属性（字段） | 用户名、邮箱、电话 | 箱子里的"物品" |
| **菱形** | 关系 | 下单、支付、评论 | 箱子之间的"连线" |
| **线条** | 连接 | 表与表的关联 | 把东西串起来的"绳子" |

| 符号 | 含义 | 示例 |
| :--- | :--- | :--- |
| **矩形** | 实体（表） | 用户、订单、商品 |
| **椭圆** | 属性（字段） | 用户名、邮箱、电话 |
| **菱形** | 关系 | 下单、支付、评论 |
| **线条** | 连接 | 表与表的关联 |

### 2.5 完整的 ER 图示例

👇 **动手试试看**：探索用户-订单-商品的实体关系模型：

<DataModelsDemo />

---

## 3. 关系类型：一对一、一对多、多对多

关系类型决定了表之间如何关联，是数据模型设计的核心。

### 3.1 一对一（One-to-One）

#### 3.1.1 什么是"一对一"？

**定义**：A 表的一条记录对应 B 表的一条记录，反过来也成立。

**生活类比**：
- 一个人 ↔ 一个身份证号码
- 一个丈夫 ↔ 一个妻子（一夫一妻制）
- 一个国家 ↔ 一个首都

#### 3.1.2 用生活场景理解

想象你在做一个**用户系统**：

**场景**：用户基本信息 + 详细资料

你发现用户信息太多了：
- 基本信息：用户名、邮箱、密码（经常用）
- 详细资料：昵称、头像、个人简介、生日、地址、手机号（不常用）

**问题**：要不要把所有信息放一张表？

**方案一：全放一张表**

```
users 表：
| id | username | email | password | nickname | avatar | bio | birthday | address | phone |
```

**缺点**：
- 表太宽，字段太多（超过 20 个）
- 查询"登录"时只需要基本字段，但会加载所有字段（浪费性能）
- 详细资料可能很长（bio、avatar），拖慢查询速度

**方案二：拆分成两张表（一对一关系）**

```
users 表（基本信息）：
| id | username | email          | password_hash |
| 1  | zhangsan | zhangsan@qq.com | xxxxx...     |

user_profiles 表（详细资料）：
| user_id | nickname | avatar | bio          | birthday   |
| 1       | 小张     | ...    | 热爱编程...   | 1995-06-15 |
```

**优点**：
- 登录时只查 users 表，快速
- 查看资料时再 JOIN user_profiles 表
- 分离敏感信息（password）和非敏感信息

**关系表示**：
```
users (1) ---- (1) user_profiles
   |                    |
   id (主键)      user_id (主键 + 外键)
```

#### 3.1.3 SQL 实现

**方式 1：外键唯一约束（推荐）**

```sql
-- 用户表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用户详细资料表
CREATE TABLE user_profiles (
  user_id BIGINT PRIMARY KEY,           -- user_id 同时是主键和外键
  nickname VARCHAR(50),
  avatar VARCHAR(255),
  bio TEXT,
  birthday DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 插入数据
INSERT INTO users (id, username, email, password_hash) VALUES
(1, 'zhangsan', 'zhangsan@qq.com', 'hashed_password');

INSERT INTO user_profiles (user_id, nickname, bio) VALUES
(1, '小张', '热爱编程，热爱生活');

-- 查询：获取用户完整信息
SELECT u.*, p.nickname, p.bio, p.avatar
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE u.id = 1;
```

**方式 2：在主表添加外键（不推荐）**

```sql
-- 详细资料表
CREATE TABLE user_profiles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(50),
  bio TEXT
);

-- 用户表（引用 profile）
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  profile_id BIGINT UNIQUE,              -- 唯一约束
  FOREIGN KEY (profile_id) REFERENCES user_profiles(id)
);
```

**为什么方式 1 更好？**
- 用户是"主实体"，资料是"从属信息"
- 先有用户，再有资料
- 删除用户时，资料也应该删除（CASCADE）

#### 3.1.4 数据样子

```
users 表：
┌────┬──────────┬─────────────────┬───────────────┐
│ id │ username │ email           │ password_hash │
├────┼──────────┼─────────────────┼───────────────┤
│ 1  │ zhangsan │ zhangsan@qq.com │ xxxxx...      │
│ 2  │ lisi     │ lisi@qq.com     │ yyyyy...      │
└────┴──────────┴─────────────────┴───────────────┘
         │
         │ 一对一关系
         │
user_profiles 表：
┌──────────┬──────────┬─────────┬──────────────┐
│ user_id  │ nickname │ avatar  │ bio          │
├──────────┼──────────┼─────────┼──────────────┤
│ 1        │ 小张     │ avatar1 │ 热爱编程...  │
│ 2        │ 小李     │ avatar2 │ 喜欢读书...  │
└──────────┴──────────┴─────────┴──────────────┘
```

#### 3.1.5 什么时候用一对一？

**适合使用的场景**：
- 字段数量过多（超过 20 个字段）
- 需要分离敏感信息（密码、支付信息）
- 部分字段很少查询（登录时不需要加载简介、头像）
- 需要独立扩展（用户资料可能有多种类型：个人、企业）

**不适合使用的场景**：
- 字段不多（少于 15 个），直接放一张表即可
- 所有字段都会频繁查询（拆分反而需要 JOIN，降低性能）

::: tip 💡 一对一关系的判断标准
问自己："A 的一条记录能对应 B 的多条记录吗？"
- 如果能 → 一对多或多对多
- 如果不能 → 可能是一对一

再问："B 的一条记录能对应 A 的多条记录吗？"
- 如果能 → 一对多
- 如果不能 → 一对一
:::

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

::: tip 💡 一对一关系的判断标准
问自己："A 的一条记录能对应 B 的多条记录吗？"
- 如果能 → 一对多或多对多
- 如果不能 → 可能是一对一

再问："B 的一条记录能对应 A 的多条记录吗？"
- 如果能 → 一对多
- 如果不能 → 一对一
:::

### 3.2 一对多（One-to-Many）

#### 3.2.1 什么是"一对多"？

**定义**：A 表的一条记录可以对应 B 表的多条记录，但 B 的一条记录只能对应 A 的一条记录。

**生活类比**：
- 一个母亲 → 多个孩子
- 一个班级 → 多个学生
- 一个作者 → 多篇文章

**这是最常见的关系！约占数据库关系的 70%。**

#### 3.2.2 用生活场景理解

想象你在做一个**电商系统**：

**场景**：用户和订单

**需求**：
- 一个用户可以下多个订单
- 一个订单只能属于一个用户

**怎么设计数据库？**

**方案一：全放一张表（错误）**

```
users 表：
| id | username | order_1 | order_1_amount | order_2 | order_2_amount | ... |
| 1  | 张三     | 100     | 500            | 101     | 300            | ... |
```

**问题**：
- 一个用户最多能下多少单？10 个？100 个？
- 字段数量爆炸，表结构混乱
- 无法查询"某个订单属于哪个用户"

**方案二：拆分成两张表（一对多关系）**

```
users 表：
| id | username | email          |
| 1  | 张三     | zhangsan@qq.com |

orders 表：
| id | user_id | amount | status    |
| 1  | 1       | 500    | paid      |
| 2  | 1       | 300    | shipping  |
| 3  | 1       | 800    | completed |
```

**关系表示**：
```
users (1) ---- (N) orders
   |              |
   id (主键)  user_id (外键)
```

**关键点**：在"多"的那张表（orders）添加"外键"（user_id），指向"一"的那张表（users）。

#### 3.2.3 SQL 实现

```sql
-- 用户表（"一"的那一方）
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 订单表（"多"的那一方）
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,                 -- 外键，指向 users 表
  amount DECIMAL(10, 2) NOT NULL,          -- 订单金额
  status VARCHAR(20) DEFAULT 'pending',    -- 订单状态
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 插入数据
INSERT INTO users (id, username, email) VALUES
(1, '张三', 'zhangsan@qq.com'),
(2, '李四', 'lisi@qq.com');

INSERT INTO orders (user_id, amount, status) VALUES
(1, 500.00, 'paid'),
(1, 300.00, 'shipping'),
(1, 800.00, 'completed'),
(2, 200.00, 'pending');

-- 查询 1：查询用户的所有订单
SELECT o.*
FROM orders o
WHERE o.user_id = 1;

-- 查询 2：查询订单及对应的用户信息
SELECT o.*, u.username, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.id = 1;

-- 查询 3：统计每个用户的订单数量
SELECT u.username, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
```

#### 3.2.4 数据样子

```
users 表（"一"的一方）：
┌────┬──────────┬─────────────────┐
│ id │ username │ email           │
├────┼──────────┼─────────────────┤
│ 1  │ 张三     │ zhangsan@qq.com │
│ 2  │ 李四     │ lisi@qq.com     │
└────┴──────────┴─────────────────┘
         │
         │ 一对多关系
         │
orders 表（"多"的一方）：
┌────┬─────────┬────────┬───────────┐
│ id │ user_id │ amount │ status    │
├────┼─────────┼────────┼───────────┤
│ 1  │ 1       │ 500.00 │ paid      │  ← 张三的订单
│ 2  │ 1       │ 300.00 │ shipping  │  ← 张三的订单
│ 3  │ 1       │ 800.00 │ completed │  ← 张三的订单
│ 4  │ 2       │ 200.00 │ pending   │  ← 李四的订单
└────┴─────────┴────────┴───────────┘
```

#### 3.2.5 什么时候用一对多？

**适合使用的场景**：
- 父子关系：用户 → 订单、分类 → 商品
- 包含关系：文章 → 评论、部门 → 员工
- 层级关系：菜单 → 子菜单

**设计原则**：
- 在"多"的那张表添加外键
- 外键指向"一"的那张表的主键
- 使用 LEFT JOIN 可以查询"即使没有订单的用户"

::: tip 💡 一对多关系的判断标准
问自己："A 的一条记录能对应 B 的多条记录吗？"
- 如果能 → 可能是一对多
- 再问："B 的一条记录能对应 A 的多条记录吗？"
  - 如果不能 → 确定是一对多
  - 如果能 → 是多对多
:::

#### 3.3.1 什么是"多对多"？

**定义**：A 表的多条记录可以对应 B 表的多条记录，反过来也成立。

**生活类比**：
- 多个学生 ↔ 多门课程（一个学生可以选多门课，一门课可以被多个学生选）
- 多个顾客 ↔ 多个商品（一个顾客可以买多个商品，一个商品可以被多个顾客买）
- 多个作者 ↔ 多篇文章（一篇文章可以有多个作者，一个作者可以写多篇文章）

**这是最复杂的关系，需要使用"中间表"！**

#### 3.3.2 用生活场景理解

想象你在做一个**学生选课系统**：

**场景**：学生和课程

**需求**：
- 一个学生可以选多门课程
- 一门课程可以被多个学生选

**怎么设计数据库？**

**方案一：在学生表添加课程字段（错误）**

```
students 表：
| id | name  | courses          |
| 1  | 小明  | 1,2,3            |
| 2  | 小红  | 1,2              |
```

**问题**：
- 无法查询"选了数学 1 的所有学生"（需要字符串匹配，很慢）
- 无法建立外键约束
- 无法给"选课"添加额外信息（比如：选课时间、成绩）

**方案二：在课程表添加学生字段（同样错误）**

```
courses 表：
| id | title | students        |
| 1  | 数学  | 1,2,3,4,5       |
```

**同样的问题**：查询慢、无法建立约束、无法添加额外信息。

**方案三：使用中间表（正确！）**

创建三张表：
1. students 表（学生）
2. courses 表（课程）
3. enrollments 表（选课记录，中间表）

**关系表示**：
```
students (M) ---- (M) courses
      |              |
      |    enrollments（中间表）
      |    | student_id | course_id |
```

#### 3.3.3 SQL 实现

```sql
-- 学生表
CREATE TABLE students (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  student_no VARCHAR(20) UNIQUE NOT NULL,  -- 学号
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 课程表
CREATE TABLE courses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  credits DECIMAL(3, 1) NOT NULL,           -- 学分
  teacher VARCHAR(50)
);

-- 选课记录表（中间表）
CREATE TABLE enrollments (
  student_id BIGINT NOT NULL,
  course_id BIGINT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 选课时间
  grade DECIMAL(5, 2),                              -- 成绩（可选）
  PRIMARY KEY (student_id, course_id),              -- 联合主键，防止重复选课
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 插入数据
INSERT INTO students (id, name, student_no) VALUES
(1, '小明', '2021001'),
(2, '小红', '2021002'),
(3, '小刚', '2021003');

INSERT INTO courses (id, title, credits, teacher) VALUES
(1, '数学', 4.0, '王老师'),
(2, '英语', 3.0, '李老师'),
(3, '物理', 4.0, '张老师');

-- 学生选课
INSERT INTO enrollments (student_id, course_id) VALUES
(1, 1),  -- 小明选了数学
(1, 2),  -- 小明选了英语
(2, 1),  -- 小红选了数学
(2, 3),  -- 小红选了物理
(3, 2),  -- 小刚选了英语
(3, 3);  -- 小刚选了物理

-- 查询 1：查询小明选了哪些课程
SELECT c.*
FROM courses c
JOIN enrollments e ON c.id = e.course_id
WHERE e.student_id = 1;

-- 查询 2：查询数学课有哪些学生选了
SELECT s.*
FROM students s
JOIN enrollments e ON s.id = e.student_id
WHERE e.course_id = 1;

-- 查询 3：查询每个学生选了多少门课
SELECT s.name, COUNT(e.course_id) as course_count
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id;

-- 查询 4：录入成绩
UPDATE enrollments
SET grade = 90.5
WHERE student_id = 1 AND course_id = 1;

-- 查询 5：查询小明的选课及成绩
SELECT c.title, e.grade, e.enrolled_at
FROM courses c
JOIN enrollments e ON c.id = e.course_id
WHERE e.student_id = 1;
```

#### 3.3.4 数据样子

```
students 表：
┌────┬──────┬───────────┐
│ id │ name │ student_no│
├────┼──────┼───────────┤
│ 1  │ 小明 │ 2021001   │
│ 2  │ 小红 │ 2021002   │
│ 3  │ 小刚 │ 2021003   │
└────┴──────┴───────────┘
     │                    ┌──────────────┐
     │                    │ courses 表   │
     │                    ├────┬─────────┬────────┬────────┐
     │                    │ id │ title   │ credits│ teacher│
     │                    ├────┼─────────┼────────┼────────┤
     │                    │ 1  │ 数学    │ 4.0    │ 王老师 │
     │                    │ 2  │ 英语    │ 3.0    │ 李老师 │
     │                    │ 3  │ 物理    │ 4.0    │ 张老师 │
     │                    └────┴─────────┴────────┴────────┘
     │                            ▲
     │                            │
     │                            │ 多对多关系
     │                            │
     │                    ┌───────────────────┐
     │                    │ enrollments（中间表）│
     │                    ├──────────┬─────────┬──────────────┬───────┐
     │                    │student_id│course_id│ enrolled_at  │ grade │
     │                    ├──────────┼─────────┼──────────────┼───────┤
     │                    │ 1        │ 1       │ 2024-09-01   │ 90.5  │ ← 小明选数学
     │                    │ 1        │ 2       │ 2024-09-01   │ NULL  │ ← 小明选英语
     │                    │ 2        │ 1       │ 2024-09-01   │ NULL  │ ← 小红选数学
     │                    │ 2        │ 3       │ 2024-09-01   │ NULL  │ ← 小红选物理
     │                    │ 3        │ 2       │ 2024-09-01   │ NULL  │ ← 小刚选英语
     │                    │ 3        │ 3       │ 2024-09-01   │ NULL  │ ← 小刚选物理
     │                    └──────────┴─────────┴──────────────┴───────┘
```

#### 3.3.5 中间表的设计要点

**要点 1：联合主键**
```sql
PRIMARY KEY (student_id, course_id)
```
作用：防止同一个学生重复选同一门课

**要点 2：外键约束**
```sql
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
```
作用：保证数据完整性
- 删除学生时，自动删除该学生的选课记录
- 删除课程时，自动删除该课程的选课记录

**要点 3：中间表可以添加额外字段**
```sql
enrolled_at TIMESTAMP,  -- 选课时间
grade DECIMAL(5, 2),    -- 成绩
status VARCHAR(20),     -- 状态：选课中、已退课、已完成
```
这是多对多关系的一大优势！

#### 3.3.6 什么时候用多对多？

**适合使用的场景**：
- 标签系统：文章 ↔ 标签
- 权限系统：用户 ↔ 角色
- 社交关系：用户 ↔ 用户（关注、好友）
- 购物车：用户 ↔ 商品

**设计原则**：
- 必须创建中间表（也叫关联表、桥接表）
- 中间表包含两个外键，分别指向两张表
- 使用联合主键防止重复关联
- 可以在中间表添加额外属性（如：选课时间、成绩）

::: tip 💡 多对多关系的判断标准
问自己：
1. "A 的一条记录能对应 B 的多条记录吗？" → 是
2. "B 的一条记录能对应 A 的多条记录吗？" → 是
3. "A 和 B 之间的关联需要额外信息吗？" → 可能需要

如果 1 和 2 都是"是"，这就是多对多关系，需要用中间表！
:::

---

## 4. 范式理论：从混乱到有序

### 4.0 什么是"范式"？

**范式**（Normalization，规范化）是数据库设计的"规范"或"标准"。

**目的**：
- 消除数据冗余（重复的数据）
- 避免数据异常（插入、更新、删除时的问题）
- 让数据结构更清晰

**通俗理解**：
就像整理你的衣柜：
- 乱七八糟的衣服堆在一起 → 不符合范式
- 按类别分开（上衣、裤子、袜子）→ 符合第一范式
- 再按颜色分开 → 符合第二范式
- 再按季节分开 → 符合第三范式

**范式的级别**：
- 1NF（第一范式）：基础要求
- 2NF（第二范式）：在 1NF 基础上进一步优化
- 3NF（第三范式）：在 2NF 基础上再优化
- BCNF（BC 范式）：3NF 的增强版
- 4NF、5NF：更高级的范式（很少用到）

**实际开发中**：
- 大部分系统做到 3NF 就够了
- 有时为了性能，会故意违反范式（反范式化，后面会讲）

### 4.1 第一范式（1NF）：消除重复组

#### 4.1.1 1NF 的规则

**规则**：每个字段都应该是"原子性"的，不可再分。

**什么是不符合 1NF？**
- 一个字段包含多个值
- 一个字段包含"组合数据"（如：地址 = 城市 + 区 + 详细地址）

**什么是符合 1NF？**
- 每个字段只存储一个值
- 每个字段都是"最小数据单元"

#### 4.1.2 问题场景：订单信息重复

想象你在做一个**订单管理系统**：

**场景**：一个订单包含多个商品

**错误的表设计（不符合 1NF）**：

```sql
orders 表：
| id | user_id | products                          | total |
| 1  | 100     | iPhone(2台),iPad(1台),AirPods(3台) | 50000 |
```

**问题**：
1. `products` 字段包含多个值（不原子）
2. 无法查询"哪些订单包含 iPhone"
3. 无法统计"卖了多少台 iPad"
4. 修改商品数量需要字符串操作
5. 无法对商品建立索引

#### 4.1.3 应用 1NF 后

**方案 1：拆分成多行（符合 1NF）**

```sql
orders 表：
| id | user_id | product_id | product_name | quantity | price    |
| 1  | 100     | 1          | iPhone       | 2        | 5999     |
| 1  | 100     | 2          | iPad         | 1        | 3999     |
| 1  | 100     | 3          | AirPods      | 3        | 1299     |
```

**改进**：
- 每行只记录一个商品（原子性）
- 可以查询"哪些订单包含 iPhone"
- 可以统计"卖了多少台 iPad"
- 可以对 `product_id` 建立索引

**问题**：`user_id` 和 `id` 重复了（这是 2NF 要解决的问题）

#### 4.1.4 另一个例子：地址字段

**不符合 1NF**：

```sql
users 表：
| id | name | address              |
| 1  | 张三 | 北京市朝阳区xxx街道   |
```

**问题**：`address` 包含多个信息（城市、区、详细地址），不原子。

**符合 1NF**：

```sql
users 表：
| id | name | city    | district | detail_address |
| 1  | 张三 | 北京市  | 朝阳区   | xxx街道        |
```

**改进**：
- 每个字段只存储一个信息
- 可以按城市查询、按区统计

::: tip 💡 1NF 是基础
所有关系型数据库（MySQL、PostgreSQL、Oracle）默认都满足 1NF，因为字段本身就不能存储复杂对象（JSON 除外）。即使你违反了 1NF（如存储逗号分隔的字符串），数据库也不会报错，但会导致查询和维护困难。
:::

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
所有关系型数据库（MySQL、PostgreSQL、Oracle）默认都满足 1NF，因为字段本身就不能存储复杂对象（JSON 除外）。即使你违反了 1NF（如存储逗号分隔的字符串），数据库也不会报错，但会导致查询和维护困难。
:::

### 4.2 第二范式（2NF）：消除部分依赖

#### 4.2.1 2NF 的规则

**前提**：表必须先符合 1NF

**规则**：非主键字段必须**完全依赖于**主键，而不是只依赖主键的一部分。

**什么是"部分依赖"？**
- 当主键是"复合主键"（多个字段组成的主键）时才存在
- 某个非主键字段只依赖主键的一部分，而不是全部

**什么是不符合 2NF？**
- 主键是复合主键（如：order_id + product_id）
- 某个字段（如 product_name）只依赖 product_id，不依赖 order_id

**什么是符合 2NF？**
- 消除部分依赖
- 所有非主键字段都完全依赖主键

#### 4.2.2 问题场景：订单明细表

想象你在设计**订单明细表**：

**场景**：记录每个订单的每个商品

**表设计**：
```sql
order_items 表（订单明细）：
| order_id | product_id | product_name | quantity | unit_price | subtotal |
| 100      | 1          | iPhone       | 2        | 5999       | 11998    |
| 100      | 2          | iPad         | 1        | 3999       | 3999     |
```

**主键**：(order_id, product_id) —— 复合主键

**问题分析**：

| 字段 | 依赖关系 | 是否符合 2NF |
|:-----|:---------|:------------|
| quantity | 依赖 (order_id, product_id) | ✅ 符合 |
| subtotal | 依赖 (order_id, product_id) | ✅ 符合 |
| product_name | 只依赖 product_id | ❌ 不符合 |
| unit_price | 只依赖 product_id | ❌ 不符合 |

**为什么不符合？**
- `product_name` 只依赖 `product_id`
- 即使我改变 `order_id`，`product_name` 也不会变
- 这就是"部分依赖"（只依赖主键的一部分）

#### 4.2.3 会有什么问题？

**问题 1：数据冗余**
```sql
| order_id | product_id | product_name | quantity |
| 100      | 1          | iPhone       | 2        |
| 101      | 1          | iPhone       | 5        |  ← 重复了
| 102      | 1          | iPhone       | 1        |  ← 又重复了
```
每次订购 iPhone，都要重复存储 `product_name`。

**问题 2：更新异常**
如果 iPhone 改名为 "iPhone 15"，需要更新所有包含该产品的订单记录。

**问题 3：插入异常**
无法插入一个还没有被订购的新产品（因为 order_id 不能为空）。

#### 4.2.4 应用 2NF 后

**方案：拆分成两张表**

```sql
-- 订单明细表（只依赖复合主键）
order_items 表：
| order_id | product_id | quantity | subtotal |
| 100      | 1          | 2        | 11998    |
| 100      | 2          | 1        | 3999     |
| 101      | 1          | 5        | 29995    |

-- 商品表（只依赖 product_id）
products 表：
| product_id | product_name | unit_price |
| 1          | iPhone       | 5999       |
| 2          | iPad         | 3999       |
```

**改进**：
- `product_name` 和 `unit_price` 只在 products 表存储一次
- 修改商品信息时，只需更新 products 表
- 新商品可以先插入 products 表，即使还没人买

#### 4.2.5 查询数据

**查询订单 100 的所有商品详情**：

```sql
SELECT
  oi.order_id,
  oi.product_id,
  p.product_name,
  oi.quantity,
  oi.subtotal
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
WHERE oi.order_id = 100;
```

虽然需要 JOIN，但数据结构更合理，避免了冗余和异常。

::: tip 💡 2NF 针对复合主键
如果主键是单个字段，则自动满足 2NF。2NF 主要解决复合主键的部分依赖问题。

**判断方法**：
- 主键是单个字段？ → 自动满足 2NF
- 主键是复合主键？ → 检查是否有字段只依赖主键的一部分
:::

### 4.3 第三范式（3NF）：消除传递依赖

#### 4.3.1 3NF 的规则

**前提**：表必须先符合 2NF

**规则**：非主键字段不**传递依赖**于主键。

**什么是"传递依赖"？**
- A → B → C
- C 依赖 B，B 依赖 A
- 所以 C 传递依赖 A

**什么是不符合 3NF？**
- 非主键字段之间有依赖关系
- 比如：user_level 依赖 user_id，而 user_id 又依赖 id

**什么是符合 3NF？**
- 所有非主键字段只直接依赖主键
- 非主键字段之间没有依赖关系

#### 4.3.2 问题场景：订单表包含用户等级

想象你在设计**订单表**：

**场景**：记录订单时，需要记录用户的等级（用于计算折扣）

**表设计**：
```sql
orders 表：
| id | user_id | total | user_level | discount | pay_amount |
| 1  | 100     | 500   | VIP        | 0.9      | 450        |
| 2  | 101     | 300   | 普通       | 1.0      | 300        |
```

**主键**：id

**问题分析**：

| 字段 | 依赖关系 | 是否符合 3NF |
|:-----|:---------|:------------|
| total | 直接依赖 id | ✅ 符合 |
| user_id | 直接依赖 id | ✅ 符合 |
| user_level | 依赖 user_id，再依赖 id | ❌ 不符合（传递依赖） |
| discount | 依赖 user_level | ❌ 不符合（传递依赖） |

**为什么不符合？**
- `user_level` 依赖 `user_id`（用户的等级存在用户表中）
- `user_id` 依赖 `id`（订单属于用户）
- 所以 `user_level` 传递依赖 `id`
- 同理，`discount` 依赖 `user_level`，也传递依赖 `id`

#### 4.3.3 会有什么问题？

**问题 1：数据冗余**
```sql
| id | user_id | user_level | discount |
| 1  | 100     | VIP        | 0.9      |
| 2  | 100     | VIP        | 0.9      |  ← 重复了
| 3  | 100     | VIP        | 0.9      |  ← 又重复了
```
同一用户的多个订单，重复存储 `user_level` 和 `discount`。

**问题 2：更新异常**
如果用户从"VIP"升级到"SVIP"，需要更新该用户的所有历史订单。

**问题 3：数据不一致**
```sql
| id | user_id | user_level | discount |
| 1  | 100     | VIP        | 0.9      |
| 2  | 100     | SVIP       | 0.8      |  ← 不一致！
```
同一用户的不同订单，等级可能不同（数据更新不一致）。

#### 4.3.4 应用 3NF 后

**方案：把用户等级放到用户表**

```sql
-- 订单表（只存储订单相关字段）
orders 表：
| id | user_id | total | discount | pay_amount |
| 1  | 100     | 500   | 0.9      | 450        |
| 2  | 100     | 300   | 0.9      | 270        |

-- 用户表（存储用户等级）
users 表：
| id  | username | level |
| 100 | 张三     | VIP   |
```

**改进**：
- `user_level` 只在 users 表存储一次
- 修改用户等级时，只需更新 users 表
- 订单表只存储 `discount`（下单时的折扣），作为历史记录

::: tip 💡 3NF 与历史数据
有些场景需要"冗余"历史数据：
- 订单的折扣（下单时的折扣，即使后来用户等级变了）
- 商品的快照（下单时的价格，即使后来商品改价了）

这不是违反 3NF，而是为了"历史准确性"故意保留的冗余。
:::

#### 4.3.5 另一个例子：员工表

**不符合 3NF**：

```sql
employees 表：
| id | name | dept_id | dept_name | dept_location |
| 1  | 张三 | 10      | 技术部    | 北京         |
| 2  | 李四 | 10      | 技术部    | 北京         |  ← 重复
| 3  | 王五 | 20      | 销售部    | 上海         |
| 4  | 赵六 | 20      | 销售部    | 上海         |  ← 重复
```

**问题**：`dept_name` 和 `dept_location` 依赖 `dept_id`，再依赖 `id`（传递依赖）

**符合 3NF**：

```sql
-- 员工表
employees 表：
| id | name | dept_id |
| 1  | 张三 | 10      |
| 2  | 李四 | 10      |
| 3  | 王五 | 20      |

-- 部门表
departments 表：
| dept_id | dept_name | dept_location |
| 10      | 技术部    | 北京          |
| 20      | 销售部    | 上海          |
```

::: tip 💡 3NF 是最常见的范式
实际业务中，大部分表设计都遵循 3NF，它在数据冗余和查询性能之间取得了平衡。

**判断方法**：
- 非主键字段之间有依赖关系吗？ → 有，可能不符合 3NF
- 这个依赖是"历史快照"还是"可以外键关联"？ → 可以外键关联，应该拆分
:::

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

**反模式**（Antipattern）是"看似正确但实际有害"的设计模式。

就像生活中的"误区"：
- 为了省钱买便宜的鞋子 → 结果经常坏，花更多钱
- 为了省时间不睡觉 → 结果身体垮了，效率更低

数据库设计也有很多"反模式"，看起来方便，实际上埋雷。

### 6.1 反模式 1：巨型宽表

#### 6.1.1 错误的做法

**错误设计**：把所有数据塞进一张表

```sql
-- 巨型宽表（错误示例）
CREATE TABLE big_table (
  id BIGINT,
  -- 用户字段
  user_name VARCHAR(50),
  user_email VARCHAR(100),
  user_phone VARCHAR(20),
  -- 订单字段（重复 100 次！）
  order_1_id BIGINT,
  order_1_amount DECIMAL(10, 2),
  order_1_status VARCHAR(20),
  order_2_id BIGINT,
  order_2_amount DECIMAL(10, 2),
  order_2_status VARCHAR(20),
  -- ...
  order_100_id BIGINT,
  order_100_amount DECIMAL(10, 2),
  order_100_status VARCHAR(20)
);

-- 数据样子
| id | user_name | user_email | order_1_id | order_1_amount | order_2_id | order_2_amount | ... |
| 1  | 张三     | zhang@qq.com | 100      | 500.00        | 101       | 300.00        | ... |
```

#### 6.1.2 为什么会这样做？

**当时的需求**：
- 产品经理说："我们想在一个页面显示用户的所有订单"
- 开发者想："少 JOIN 几次，查询更快"
- 时间紧："先赶上线，以后再优化"

**看起来很合理**：
- 查询用户订单时，不需要 JOIN，单表查询快
- SQL 简单：`SELECT * FROM big_table WHERE id = 1`

#### 6.1.3 会有什么问题？

**问题 1：字段数量爆炸**

```sql
-- MySQL 对表字段数量有限制
-- InnoDB: 最多 1017 列
-- MyISAM: 最多 259 列

-- 如果用户下了 1000 个订单怎么办？
order_1_id, order_2_id, ..., order_1000_id  ← 字段爆炸！
```

**问题 2：大量空值，浪费存储**

```sql
-- 大部分用户只有 5-10 个订单，其他 90-95 个字段都是 NULL
| id | order_1_amount | order_2_amount | order_3_amount | ... | order_100_amount |
| 1  | 500.00         | 300.00         | 800.00         | ... | NULL             |  ← 浪费 97 个字段
```

**存储浪费**：
- 假设每个字段占用 8 字节（DECIMAL(10,2)）
- 100 个字段 × 8 字节 = 800 字节/行
- 实际只用 3 个字段 = 24 字节
- 浪费了 97% 的存储空间！

**问题 3：新增订单需要修改表结构（DDL 操作）**

```sql
-- 用户下了第 101 个订单，需要加字段
ALTER TABLE big_table ADD COLUMN order_101_id BIGINT;
ALTER TABLE big_table ADD COLUMN order_101_amount DECIMAL(10, 2);

-- 问题：
-- 1. DDL 操作会锁表，影响线上服务
-- 2. 大表加字段非常慢（可能需要几小时）
-- 3. 需要停机维护，用户体验差
```

**问题 4：无法查询"某个订单的所有信息"**

```sql
-- 想查询订单 100 的信息
-- 需要扫描所有 order_XX_id 字段
SELECT *
FROM big_table
WHERE order_1_id = 100
   OR order_2_id = 100
   OR order_3_id = 100
   -- ...
   OR order_100_id = 100;  ← SQL 非常复杂，性能极差！
```

**问题 5：无法统计订单数据**

```sql
-- 想统计"所有订单的总金额"
-- 需要写复杂的 SQL
SELECT
  SUM(order_1_amount) +
  SUM(order_2_amount) +
  -- ...
  SUM(order_100_amount) as total  ← 无法维护！
FROM big_table;
```

#### 6.1.4 正确的做法

**正确设计**：拆分成多张表，用外键关联

```sql
-- 用户表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 订单表
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,              -- 外键，指向 users 表
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 创建索引（提升查询性能）
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

#### 6.1.5 数据样子

```sql
-- users 表
| id | name | email          | phone         |
| 1  | 张三 | zhang@qq.com   | 13800138000   |

-- orders 表
| id  | user_id | amount | status   | created_at         |
| 100 | 1       | 500.00 | paid     | 2024-01-01 10:00:00|
| 101 | 1       | 300.00 | shipping | 2024-01-05 14:30:00|
| 102 | 1       | 800.00 | completed| 2024-01-10 09:15:00|
```

#### 6.1.6 查询数据

**查询用户的所有订单**：

```sql
SELECT o.*
FROM orders o
WHERE o.user_id = 1;  -- 利用索引，快速查询
```

**查询订单及对应的用户信息**：

```sql
SELECT o.*, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.id = 100;  -- 只 JOIN 需要的字段
```

**统计用户的订单总数和总金额**：

```sql
SELECT
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.amount) as total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
```

#### 6.1.7 优缺点对比

| 对比项 | 宽表（错误） | 分表（正确） |
|:-----|:-----------|:-----------|
| **存储空间** | 大量空值，浪费 90%+ | 紧凑存储，无浪费 |
| **扩展性** | 需要修改表结构（DDL） | 直接 INSERT，无需改表 |
| **查询性能** | 简单查询快，复杂查询极慢 | 利用索引，整体性能好 |
| **维护性** | 字段数量爆炸，无法维护 | 结构清晰，易于维护 |
| **数据完整性** | 无法建立外键约束 | 外键保证数据一致 |

**结论**：**不要用宽表！用一对多关系 + 索引来解决！**

---

### 6.2 反模式 2：逗号分隔值

#### 6.2.1 错误的做法

**错误设计**：用逗号分隔存储多个值

```sql
-- 文章表（错误示例）
CREATE TABLE posts (
  id BIGINT PRIMARY KEY,
  title VARCHAR(200),
  content TEXT,
  tags VARCHAR(500)  -- 用逗号分隔存储标签
);

-- 数据样子
| id | title    | tags                    |
| 1  | Vue入门  | vue,frontend,javascript |
| 2  | React实战 | react,frontend          |
| 3  | Node.js后端 | node,backend          |
```

#### 6.2.2 为什么会这样做？

**当时的需求**：
- 产品经理说："一篇文章可以有多个标签"
- 开发者想："用逗号分隔最简单，不用建中间表"
- 时间紧："先赶上线，以后再优化"

**看起来很合理**：
- 存储简单：直接 `'vue,frontend,javascript'`
- 查询简单：`SELECT * FROM posts WHERE id = 1`
- 不用 JOIN：少一张表，少麻烦

#### 6.2.3 会有什么问题？

**问题 1：无法有效索引**

```sql
-- 即使给 tags 字段建索引
CREATE INDEX idx_tags ON posts(tags);

-- 查询包含 "vue" 标签的文章
SELECT * FROM posts WHERE tags LIKE '%vue%';

-- 问题：
-- 1. LIKE '%xxx%' 无法使用索引（全表扫描）
-- 2. 查询 "vue" 会匹配 "javascript"（包含 "vue" 字符）
-- 3. 性能极差，数据量大时数据库卡死
```

**问题 2：无法精确查询**

```sql
-- 想查询"有哪些文章包含 frontend 标签"
SELECT * FROM posts WHERE tags LIKE '%frontend%';

-- 问题：会匹配到错误的记录
-- 'vue,frontend,javascript'  ← 正确
-- 'frontendend'              ← 错误！但会被匹配到
-- 'myfrontendapp'            ← 错误！但会被匹配到
```

**问题 3：无法统计查询**

```sql
-- 想统计"每个标签有多少篇文章"
-- 几乎无法用 SQL 实现！
-- 需要：
-- 1. 查出所有文章
-- 2. 在应用层分割 tags 字符串
-- 3. 手动统计

-- 或者用复杂的 SQL（性能极差）
SELECT
  SUBSTRING_INDEX(SUBSTRING_INDEX(tags, ',', n), ',', -1) as tag,
  COUNT(*) as count
FROM posts
JOIN (
  SELECT 1 as n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
) numbers
ON CHAR_LENGTH(tags) - CHAR_LENGTH(REPLACE(tags, ',', '')) >= n - 1
GROUP BY tag;
```

**问题 4：无法关联查询**

```sql
-- 想查询"包含 vue 标签的文章 + 作者信息"
-- 需要字符串匹配，无法用 JOIN
SELECT p.*, u.name
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.tags LIKE '%vue%';  ← 性能差，不准确
```

**问题 5：修改标签需要字符串操作**

```sql
-- 想给文章 1 添加一个 "tutorial" 标签
-- 需要分步操作
-- 1. 查询当前 tags
SELECT tags FROM posts WHERE id = 1;  -- 'vue,frontend,javascript'

-- 2. 在应用层拼接字符串
new_tags = old_tags + ',tutorial'  -- 'vue,frontend,javascript,tutorial'

-- 3. 更新数据库
UPDATE posts SET tags = 'vue,frontend,javascript,tutorial' WHERE id = 1;

-- 问题：
-- 1. 需要 3 步操作，代码复杂
-- 2. 并发修改时可能丢失数据
-- 3. 无法保证标签唯一性（可能添加重复标签）
```

#### 6.2.4 正确的做法

**正确设计**：用中间表（多对多关系）

```sql
-- 文章表
CREATE TABLE posts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 标签表
CREATE TABLE tags (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL  -- 标签名称唯一
);

-- 文章-标签关联表（中间表）
CREATE TABLE post_tags (
  post_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  PRIMARY KEY (post_id, tag_id),  -- 联合主键，防止重复关联
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 创建索引（提升查询性能）
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
```

#### 6.2.5 数据样子

```sql
-- posts 表
| id | title    | content               |
| 1  | Vue入门  | Vue 是一个渐进式框架... |
| 2  | React实战| React 是一个 UI 库...   |

-- tags 表
| id | name       |
| 1  | vue        |
| 2  | frontend   |
| 3  | javascript |
| 4  | react      |

-- post_tags 表
| post_id | tag_id |
| 1       | 1      |  ← 文章 1 有 vue 标签
| 1       | 2      |  ← 文章 1 有 frontend 标签
| 1       | 3      |  ← 文章 1 有 javascript 标签
| 2       | 2      |  ← 文章 2 有 frontend 标签
| 2       | 4      |  ← 文章 2 有 react 标签
```

#### 6.2.6 查询数据

**查询包含 "vue" 标签的所有文章**：

```sql
SELECT p.*
FROM posts p
JOIN post_tags pt ON p.id = pt.post_id
JOIN tags t ON pt.tag_id = t.id
WHERE t.name = 'vue';  -- 利用索引，快速查询
```

**查询文章的所有标签**：

```sql
SELECT t.name
FROM tags t
JOIN post_tags pt ON t.id = pt.tag_id
WHERE pt.post_id = 1;

-- 结果
| name       |
| vue        |
| frontend   |
| javascript |
```

**统计每个标签的文章数量**：

```sql
SELECT t.name, COUNT(pt.post_id) as post_count
FROM tags t
LEFT JOIN post_tags pt ON t.id = pt.tag_id
GROUP BY t.id
ORDER BY post_count DESC;

-- 结果
| name       | post_count |
| frontend   | 2          |
| vue        | 1          |
| javascript | 1          |
| react      | 1          |
```

**给文章添加标签**：

```sql
-- 先查询或创建标签
INSERT IGNORE INTO tags (name) VALUES ('tutorial');

-- 添加关联
INSERT INTO post_tags (post_id, tag_id)
VALUES (1, (SELECT id FROM tags WHERE name = 'tutorial'));

-- 完事！一条 SQL 搞定
```

#### 6.2.7 优缺点对比

| 对比项 | 逗号分隔（错误） | 中间表（正确） |
|:-----|:--------------|:-------------|
| **查询性能** | 无法使用索引，全表扫描 | 利用索引，快速查询 |
| **查询精确度** | LIKE 匹配不准确 | 精确匹配 |
| **统计查询** | 几乎无法实现 | 简单的 GROUP BY |
| **数据完整性** | 无约束，可重复、格式混乱 | 外键 + 唯一约束 |
| **维护性** | 字符串操作，复杂 | 标准 SQL，简单 |
| **扩展性** | 难以扩展（如标签权重） | 易于扩展 |

**结论**：**不要用逗号分隔！用多对多关系 + 中间表来解决！**

---

### 6.3 反模式 3：滥用 JSON 字段

#### 6.3.1 错误的做法

**错误设计**：把订单明细存为 JSON

```sql
-- 订单表（错误示例）
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  items JSON,           -- 订单明细存为 JSON
  total DECIMAL(10, 2),
  created_at TIMESTAMP
);

-- 数据样子
| id | user_id | items                                            | total |
| 1  | 100     | [{"pid":1,"qty":2},{"pid":2,"qty":1}]            | 500   |
| 2  | 101     | [{"pid":3,"qty":5}]                              | 300   |
```

#### 6.3.2 为什么会这样做？

**当时的需求**：
- 产品经理说："订单明细结构复杂，字段不固定"
- 开发者想："JSON 灵活，不用定义字段"
- 时间紧："先赶上线，以后再优化"

**看起来很合理**：
- 灵活：可以存储任意结构的数据
- 简单：不需要建 order_items 表
- 查询快：单表查询，不需要 JOIN

#### 6.3.3 会有什么问题？

**问题 1：无法建立外键约束**

```sql
-- 无法保证 JSON 中的 pid（商品 ID）真实存在
INSERT INTO orders (id, user_id, items, total) VALUES
(1, 100, '[{"pid":9999,"qty":1}]', 500);  ← pid 9999 不存在，但能插入！

-- 问题：数据完整性无法保证
```

**问题 2：无法有效索引（MySQL 5.7 之前）**

```sql
-- MySQL 5.7+ 支持生成列 + 索引，但很复杂
-- MySQL 5.6 及之前版本，JSON 字段完全无法索引

-- 查询"购买了商品 1 的所有订单"
SELECT * FROM orders
WHERE JSON_CONTAINS(items, '{"pid": 1}');  ← 全表扫描！
```

**问题 3：数据完整性差**

```sql
-- 可以插入错误格式的 JSON
INSERT INTO orders (id, user_id, items, total) VALUES
(1, 100, '[{"pid":1}]', 500),          -- 缺少 qty
(2, 100, '[{"qty":2}]', 300),          -- 缺少 pid
(3, 100, 'not-a-json', 200);           -- 不是 JSON

-- 问题：数据库无法检测 JSON 内容的正确性
```

**问题 4：查询"某个商品的所有订单"需要全文扫描**

```sql
-- 想查询"购买了 iPhone 的所有订单"
-- 需要扫描所有订单的 JSON 字段
SELECT * FROM orders
WHERE JSON_CONTAINS(items, '{"pid": 1}');  ← 全表扫描，性能极差！
```

**问题 5：修改商品信息很困难**

```sql
-- 想把商品 1 的名称从 "iPhone" 改为 "iPhone 15"
-- 需要更新所有包含该商品的订单的 JSON 字段
-- 但 JSON 无法用 UPDATE 语句部分更新，只能整体替换

-- 步骤：
-- 1. 查询订单
SELECT items FROM orders WHERE id = 1;

-- 2. 在应用层解析 JSON，修改，再序列化
items = JSON.parse(items)
items.forEach(item => {
  if (item.pid === 1) {
    item.name = "iPhone 15"  -- 但订单表没存 name！
  }
})
new_items = JSON.stringify(items)

-- 3. 更新数据库
UPDATE orders SET items = new_items WHERE id = 1;

-- 问题：操作复杂，性能差，容易出错
```

**问题 6：无法统计商品销量**

```sql
-- 想统计"每个商品卖了多少"
-- 需要在应用层遍历所有订单的 JSON
-- 或用复杂的 SQL（MySQL 5.7+）
SELECT
  JSON_UNQUOTE(JSON_EXTRACT(items, '$[0].pid')) as pid,
  SUM(JSON_EXTRACT(items, '$[0].qty')) as total_qty
FROM orders
GROUP BY pid;  ← 假设每个订单只有一个商品，不通用！
```

#### 6.3.4 正确的做法

**正确设计**：用关联表（一对多关系）

```sql
-- 订单表
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 订单明细表
CREATE TABLE order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,           -- 外键，指向 orders 表
  product_id BIGINT NOT NULL,         -- 外键，指向 products 表
  product_name VARCHAR(200),          -- 冗余，保存下单时的商品名称
  price DECIMAL(10, 2) NOT NULL,      -- 冗余，保存下单时的价格
  quantity INT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,   -- 小计 = price * quantity
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 创建索引（提升查询性能）
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

#### 6.3.5 数据样子

```sql
-- orders 表
| id | user_id | total | status   | created_at         |
| 1  | 100     | 500.00| paid     | 2024-01-01 10:00:00|

-- order_items 表
| id | order_id | product_id | product_name | price  | quantity | subtotal|
| 1  | 1        | 1          | iPhone       | 5999.00| 2        | 11998.00|
| 2  | 1        | 2          | iPad         | 3999.00| 1        | 3999.00 |
```

#### 6.3.6 查询数据

**查询订单的所有商品**：

```sql
SELECT oi.*
FROM order_items oi
WHERE oi.order_id = 1;  -- 利用索引，快速查询
```

**查询"购买了商品 1 的所有订单"**：

```sql
SELECT DISTINCT o.*
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE oi.product_id = 1;  -- 利用索引，快速查询
```

**统计每个商品的销量**：

```sql
SELECT
  p.name,
  SUM(oi.quantity) as total_qty,
  SUM(oi.subtotal) as total_amount
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY total_qty DESC;
```

#### 6.3.7 什么时候可以用 JSON？

JSON 不是"洪水猛兽"，在以下场景可以使用：

**适合使用 JSON 的场景**：

1. **非结构化数据**
   ```sql
   -- 用户的扩展配置信息（每个用户配置不同）
   ALTER TABLE users ADD COLUMN preferences JSON;

   -- 数据样子
   | id | username | preferences                                |
   | 1  | zhangsan | {"theme":"dark","lang":"zh","fontSize":14} |
   | 2  | lisi     | {"theme":"light","lang":"en"}              |
   ```

2. **低频查询的数据**
   ```sql
   -- 日志、埋点数据（查询频率低）
   CREATE TABLE events (
     id BIGINT PRIMARY KEY,
     user_id BIGINT,
     event_data JSON,  -- 事件详情（字段不固定）
     created_at TIMESTAMP
   );
   ```

3. **动态属性**
   ```sql
   -- 商品的动态属性（不同品类属性不同）
   -- 手机：屏幕尺寸、电池容量
   -- 衣服：尺码、材质、颜色
   CREATE TABLE products (
     id BIGINT PRIMARY KEY,
     name VARCHAR(200),
     attributes JSON  -- 动态属性
   );

   -- 数据样子
   | id | name   | attributes                                        |
   | 1  | iPhone | {"screen":"6.1 inch","battery":"3000mAh"}         |
   | 2  | T恤    | {"size":"L","material":"cotton","color":"blue"}    |
   ```

**不适合使用 JSON 的场景**：
- 核心业务数据（订单、用户、商品）
- 需要频繁查询的字段
- 需要建立索引的字段
- 需要保证数据完整性的字段（外键约束）

::: tip 💡 JSON 的使用原则
**能用关系表就用关系表，实在不行才用 JSON。**

判断标准：
1. 这个字段需要查询吗？ → 需要，别用 JSON
2. 这个字段需要建立索引吗？ → 需要，别用 JSON
3. 这个字段需要保证数据完整性吗？ → 需要，别用 JSON
4. 这个字段结构经常变化吗？ → 是，可以考虑 JSON
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

### 8.0 手把手：从零设计一个数据模型

让我们用一个**图书馆管理系统**的例子，从头到尾演示数据模型设计过程。

#### 第一步：识别实体（识别"对象"）

**问题**：这个系统需要管理哪些"东西"？

**需求分析**：
- 图书馆有很多书
- 书有不同的类别（小说、科技、历史）
- 读者可以借书、还书
- 每本书可以被多次借阅

**识别出的实体**：
1. **图书**（Book）：书的基本信息
2. **读者**（Reader）：借书的人
3. **借阅记录**（Borrow）：谁借了哪本书
4. **分类**（Category）：书的分类

#### 第二步：确定属性（识别"特征"）

**问题**：每个实体有哪些信息需要记录？

**图书的属性**：
- 书名（title）
- 作者（author）
- ISBN（isbn）- 唯一标识
- 出版社（publisher）
- 出版年份（publish_year）
- 库存数量（stock）

**读者的属性**：
- 姓名（name）
- 电话（phone）
- 邮箱（email）
- 注册日期（registered_at）

**借阅记录的属性**：
- 借阅日期（borrowed_at）
- 应还日期（due_date）
- 实还日期（returned_at）
- 状态（status）：借阅中、已归还、逾期

**分类的属性**：
- 分类名称（name）
- 分类描述（description）

#### 第三步：确定关系（识别"关联"）

**问题**：这些实体之间有什么关系？

**分析**：

1. **图书 ↔ 读者**：多对多？
   - 一个读者可以借多本书
   - 一本书可以被多个读者借（不同时间）
   - **但是**：同一时间，一本书只能被一个读者借
   - **所以**：需要**借阅记录**来记录"谁借了哪本书"

2. **图书 ↔ 分类**：多对多
   - 一本书可以属于多个分类（如：《Python编程》属于"编程"和"Python"）
   - 一个分类包含多本书
   - **需要中间表**：book_categories

3. **读者 ↔ 借阅记录**：一对多
   - 一个读者可以有多条借阅记录
   - 一条借阅记录只属于一个读者

4. **图书 ↔ 借阅记录**：一对多
   - 一本书可以有多条借阅记录（被不同人借过）
   - 一条借阅记录只针对一本书

#### 第四步：画出 ER 图

```
    ┌─────────┐
    │  图书   │
    └─────────┘
    │ id      │
    │ title   │
    │ author  │
    │ isbn    │
    └─────────┘
         │
         │ 1:N
         │
    ┌─────────┐     ┌─────────┐
    │ 借阅记录│────│  读者   │
    └─────────┘     └─────────┘
    │ book_id │     │ id      │
    │ reader_id│    │ name    │
    │ borrowed_at│  │ phone   │
    └─────────┘     └─────────┘
         │
         │ N:M
         │
    ┌─────────┐
    │  分类   │
    └─────────┘
    │ id      │
    │ name    │
    └─────────┘
```

#### 第五步：设计表结构（SQL）

```sql
-- 图书表
CREATE TABLE books (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(20) UNIQUE NOT NULL,  -- ISBN 唯一
  publisher VARCHAR(100),
  publish_year INT,
  stock INT DEFAULT 1,               -- 库存数量
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 读者表
CREATE TABLE readers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,  -- 电话唯一
  email VARCHAR(100) UNIQUE,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 借阅记录表
CREATE TABLE borrows (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  book_id BIGINT NOT NULL,
  reader_id BIGINT NOT NULL,
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP NOT NULL,         -- 应还日期
  returned_at TIMESTAMP NULL,          -- 实还日期（NULL 表示未还）
  status VARCHAR(20) DEFAULT 'borrowed', -- borrowed: 借阅中, returned: 已归还, overdue: 逾期
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (reader_id) REFERENCES readers(id)
);

-- 分类表
CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

-- 图书-分类关联表（多对多）
CREATE TABLE book_categories (
  book_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  PRIMARY KEY (book_id, category_id),  -- 联合主键
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 创建索引（提升查询性能）
CREATE INDEX idx_borrows_reader_id ON borrows(reader_id);
CREATE INDEX idx_borrows_book_id ON borrows(book_id);
CREATE INDEX idx_borrows_status ON borrows(status);
CREATE INDEX idx_book_categories_category_id ON book_categories(category_id);
```

#### 第六步：应用范式（检查和优化）

**检查 1NF**：
- ✅ 所有字段都是原子的（没有字段包含多个值）
- ✅ 没有重复组

**检查 2NF**：
- ✅ 没有复合主键的情况（除了 book_categories 的联合主键）
- ✅ 所有非主键字段完全依赖于主键

**检查 3NF**：
- ✅ 没有传递依赖
- 例如：借阅记录中的 `status` 不会因为 `reader_id` 的变化而变化

**优化**：
- 考虑是否需要冗余字段？
  - 例如：在 `borrows` 表中冗余 `book_title` 和 `reader_name`，避免查询时 JOIN
  - **决策**：不冗余，因为查询频率不高，保持数据一致性更重要

#### 第七步：设计查询（验证设计）

**查询 1：查询读者当前借阅的所有图书**

```sql
SELECT
  b.title,
  b.author,
  bor.borrowed_at,
  bor.due_date,
  bor.status
FROM borrows bor
JOIN books b ON bor.book_id = b.id
WHERE bor.reader_id = 1
  AND bor.status = 'borrowed';  -- 只查未还的
```

**查询 2：查询某本书的所有借阅历史**

```sql
SELECT
  r.name,
  bor.borrowed_at,
  bor.returned_at,
  bor.status
FROM borrows bor
JOIN readers r ON bor.reader_id = r.id
WHERE bor.book_id = 1
ORDER BY bor.borrowed_at DESC;
```

**查询 3：查询逾期未还的图书**

```sql
SELECT
  r.name as reader_name,
  r.phone as reader_phone,
  b.title as book_title,
  bor.due_date
FROM borrows bor
JOIN readers r ON bor.reader_id = r.id
JOIN books b ON bor.book_id = b.id
WHERE bor.status = 'borrowed'
  AND bor.due_date < NOW();  -- 应还日期早于当前时间
```

**查询 4：查询某个分类的所有图书**

```sql
SELECT b.*
FROM books b
JOIN book_categories bc ON b.id = bc.book_id
JOIN categories c ON bc.category_id = c.id
WHERE c.name = '编程';
```

#### 第八步：迭代优化（根据实际情况调整）

**问题发现**：
- 每次查询"读者借阅的图书"都需要 JOIN 3 张表（borrows、books、readers）
- 如果数据量大，查询可能慢

**优化方案 1：添加冗余字段（反范式化）**

```sql
-- 在 borrows 表添加冗余字段
ALTER TABLE borrows ADD COLUMN book_title VARCHAR(200);
ALTER TABLE borrows ADD COLUMN reader_name VARCHAR(50);

-- 修改插入逻辑
INSERT INTO borrows (book_id, reader_id, book_title, reader_name, ...)
VALUES (1, 2, (SELECT title FROM books WHERE id = 1),
             (SELECT name FROM readers WHERE id = 2), ...);

-- 现在查询可以简化
SELECT book_title, borrowed_at, due_date, status
FROM borrows
WHERE reader_id = 1 AND status = 'borrowed';  -- 无需 JOIN
```

**代价**：
- 存储空间增加（每次借阅都存储书名和读者名）
- 更新复杂（修改书名时需要同步更新所有借阅记录）

**优化方案 2：添加缓存**
- 把热门读者的借阅记录缓存到 Redis
- 定期刷新缓存

**优化方案 3：添加视图**
- 创建视图简化查询

```sql
CREATE VIEW reader_borrows AS
SELECT
  bor.id,
  r.name as reader_name,
  b.title as book_title,
  bor.borrowed_at,
  bor.due_date,
  bor.status
FROM borrows bor
JOIN readers r ON bor.reader_id = r.id
JOIN books b ON bor.book_id = b.id;

-- 查询时直接用视图
SELECT * FROM reader_borrows WHERE reader_name = '张三';
```

::: tip 💡 数据模型设计是个迭代过程
1. **第一步**：先设计一个满足 3NF 的规范模型
2. **第二步**：根据实际查询需求，考虑反范式化
3. **第三步**：通过性能测试，找出瓶颈
4. **第四步**：优化（添加索引、缓存、冗余字段）
5. **第五步**：重复 2-4 步

**不要一开始就过度优化**！先保证正确性，再优化性能。
:::

### 8.1 数据模型设计流程总结

| 阶段 | 目标 | 产出 | 工具 |
|:---|:---|:---|:---|
| **需求分析** | 识别实体和关系 | 实体清单、关系描述 | 文档、脑图 |
| **概念设计** | 画出 ER 图 | ER 图 | draw.io、Workbench |
| **逻辑设计** | 设计表结构 | 表结构 SQL | 文本编辑器 |
| **范式检查** | 消除冗余 | 符合 3NF 的表 | 检查清单 |
| **物理设计** | 索引、分区 | 建表 SQL + 索引 | 数据库工具 |
| **性能优化** | 反范式化 | 冗余字段、缓存 | 慢查询日志 |
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
