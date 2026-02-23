# SQL：与数据库对话的语言

::: tip 核心问题
**如何高效地查询和操作数据？** 这就像问：图书馆的书怎么快速找到？仓库的货物怎么精准定位？银行的账目怎么安全转账？SQL 解决的就是"与数据对话"的问题。
:::

---

## 0. SQL 的核心价值

在现代软件开发中，数据是核心资产。无论是电商平台的商品信息、社交网络的用户关系，还是银行系统的交易记录，都需要一种高效的方式来管理和查询。

**SQL**（Structured Query Language，结构化查询语言）就是这样一种"与数据库对话"的语言。它让我们能够：

- **精准查询**：从百万级数据中快速找到目标
- **高效操作**：批量增删改，一条语句搞定
- **安全保障**：事务机制保证数据一致性
- **标准通用**：学一次，所有数据库都能用

---

## 1. SQL vs NoSQL：如何选择？

在深入了解 SQL 之前，先了解一下它与 NoSQL 的区别。

### 1.1 用仓库来类比

| 特性 | SQL（关系型数据库） | NoSQL（非关系型数据库） |
| :--- | :--- | :--- |
| **数据结构** | 严格的表结构（像 Excel） | 灵活的文档/键值/图结构 |
| **典型代表** | MySQL、PostgreSQL、Oracle | MongoDB、Redis、Elasticsearch |
| **适用场景** | 金融系统、电商订单、用户管理 | 社交动态、日志分析、实时缓存 |
| **优势** | 数据一致性、事务支持（ACID） | 高并发、灵活扩展、高性能 |
| **劣势** | 扩展性差、schema 固定 | 数据一致性弱、查询功能有限 |

### 1.2 一个直观的对比

**SQL 数据库**就像一个**规范化的仓库**：
- 每个货架有固定的编号、名称、容量
- 货物必须按照规则摆放
- 入库、出库有严格的流程和记录
- 适合需要严格管理的场景

**NoSQL 数据库**就像一个**灵活的杂物间**：
- 想放哪里就放哪里
- 不需要预先规划空间
- 快速存取，但可能找不到东西
- 适合需要快速迭代的场景

::: tip 💡 实际应用
大多数企业会**同时使用 SQL 和 NoSQL**：
- MySQL 存储用户信息、订单数据（核心业务）
- Redis 缓存热点数据（提高性能）
- MongoDB 存储日志、用户行为（数据分析）
:::

---

## 2. CRUD 操作：数据的增删改查

SQL 的核心操作就是 CRUD（Create, Read, Update, Delete）。

### 2.1 用 Excel 来类比

| Excel 操作 | SQL 关键字 | 说明 |
| :--- | :--- | :--- |
| 插入新行 | INSERT | 添加数据 |
| 筛选行 | SELECT | 查询数据 |
| 修改单元格 | UPDATE | 更新数据 |
| 删除行 | DELETE | 删除数据 |

### 2.2 实战演示

👇 **动手试试看**：在下方交互式演示中体验 CRUD 操作：

<SqlDemo />

### 2.3 常用查询语法

#### **SELECT：查询数据**

```sql
-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT name, email FROM users;

-- 带条件查询
SELECT * FROM users WHERE age > 18;

-- 排序
SELECT * FROM users ORDER BY age DESC;

-- 限制结果数量
SELECT * FROM users LIMIT 10;
```

#### **INSERT：插入数据**

```sql
-- 插入完整数据
INSERT INTO users (name, email, age)
VALUES ('张三', 'zhangsan@example.com', 25);

-- 批量插入
INSERT INTO users (name, email, age) VALUES
  ('李四', 'lisi@example.com', 30),
  ('王五', 'wangwu@example.com', 28);
```

#### **UPDATE：更新数据**

```sql
-- 更新单个字段
UPDATE users SET age = 26 WHERE id = 1;

-- 更新多个字段
UPDATE users
SET age = 27, email = 'newemail@example.com'
WHERE id = 1;

-- ⚠️ 危险操作：不带 WHERE 会更新所有行！
UPDATE users SET age = 0;  -- 慎用！
```

#### **DELETE：删除数据**

```sql
-- 删除指定行
DELETE FROM users WHERE id = 1;

-- ⚠️ 危险操作：不带 WHERE 会删除所有数据！
DELETE FROM users;  -- 慎用！
```

::: warning 💡 最佳实践
- 先用 `SELECT` 验证 WHERE 条件是否正确
- 再用 `UPDATE/DELETE` 执行操作
- 生产环境务必加 `LIMIT` 限制影响行数
:::

---

## 3. SELECT 进阶：JOIN、GROUP BY、子查询

当数据分布在多个表中时，我们需要更强大的查询能力。

### 3.1 JOIN：连接多个表

**场景**：一个电商系统有两个表：
- `users`（用户表）：id, name, email
- `orders`（订单表）：order_id, user_id, amount

如何查询"每个用户的订单总金额"？

#### **INNER JOIN：只返回匹配的行**

```sql
SELECT users.name, SUM(orders.amount) as total
FROM users
INNER JOIN orders ON users.id = orders.user_id
GROUP BY users.id;
```

**结果**：只显示有订单的用户

#### **LEFT JOIN：返回左表所有行**

```sql
SELECT users.name, SUM(orders.amount) as total
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id;
```

**结果**：显示所有用户，没有订单的用户 total 为 NULL

::: tip 💡 如何选择 JOIN？
- **INNER JOIN**：只要两边都有数据才需要（如：订单明细）
- **LEFT JOIN**：需要保留主表所有数据（如：用户列表 + 统计信息）
- **RIGHT JOIN**：需要保留从表所有数据（很少用）
- **FULL OUTER JOIN**：需要所有数据（MySQL 不支持，可用 UNION 实现）
:::

### 3.2 GROUP BY：分组统计

**场景**：统计每个部门的平均工资。

```sql
SELECT department, AVG(salary) as avg_salary, COUNT(*) as count
FROM employees
GROUP BY department
HAVING AVG(salary) > 10000;  -- HAVING 过滤分组后的结果
```

**注意**：
- `WHERE` 过滤行（在 GROUP BY 之前）
- `HAVING` 过滤分组（在 GROUP BY 之后）

### 3.3 子查询：查询嵌套查询

**场景**：查找工资高于平均工资的员工。

```sql
-- 方式一：WHERE 子查询
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- 方式二：FROM 子查询（派生表）
SELECT dept_name, avg_salary
FROM (
  SELECT department, AVG(salary) as avg_salary
  FROM employees
  GROUP BY department
) as dept_avg
WHERE avg_salary > 10000;
```

::: tip 💡 子查询 vs JOIN
- **子查询**：逻辑清晰，但性能较差（每个子查询都会执行一次）
- **JOIN**：性能更好，但需要理解连接逻辑
- **最佳实践**：优先使用 JOIN，必要时用子查询
:::

---

## 4. 索引原理：让查询快起来

### 4.1 为什么需要索引？

**场景**：在一个 100 万行的用户表中，查找 `id = 123456` 的用户。

**没有索引**：
- 数据库需要逐行扫描，最多比较 100 万次
- 时间复杂度：O(n)

**有索引**：
- 数据库通过 B+ 树快速定位，只需比较 log₂(100万) ≈ 20 次
- 时间复杂度：O(log n)

### 4.2 用图书馆来类比

| 概念 | 图书馆 | 数据库 |
| :--- | :--- | :--- |
| **数据** | 书籍 | 表的行 |
| **索引** | 目录卡片 | B+ 树 |
| **查询** | 按书名找书 | 按 WHERE 条件找行 |
| **无索引** | 逐排书架找 | 全表扫描 |
| **有索引** | 查目录定位 | 索引查找 |

### 4.3 索引的可视化演示

👇 **动手试试看**：在 SqlDemo 组件的"索引"标签页查看无索引 vs 有索引的对比：

<SqlDemo />

### 4.4 索引的使用建议

| 场景 | 是否建索引 | 说明 |
| :--- | :--- | :--- |
| **WHERE 条件** | 是 | 如 `WHERE user_id = 1` |
| **JOIN 连接** | 是 | 如 `JOIN ON user_id` |
| **ORDER BY 排序** | 是 | 如 `ORDER BY created_at` |
| **低选择性列** | 否 | 如性别（只有男/女） |
| **频繁更新的列** | 谨慎 | 索引会降低写入性能 |
| **小表** | 否 | 数据量小不需要索引 |

**创建索引**：
```sql
-- 单列索引
CREATE INDEX idx_user_id ON orders(user_id);

-- 复合索引（最左前缀原则）
CREATE INDEX idx_user_status ON orders(user_id, status);

-- 唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);
```

::: tip 💡 索引的代价
- **空间**：每个索引都是额外的存储空间
- **时间**：INSERT/UPDATE/DELETE 需要更新索引，降低写入速度
- **建议**：只在查询频繁、更新少的列上建索引
:::

---

## 5. 事务 ACID：保证数据一致性

### 5.1 什么是事务？

**事务**（Transaction）是一组 SQL 操作，要么全部成功，要么全部失败。

**经典案例**：银行转账

```sql
BEGIN;  -- 开始事务

-- 账户 A 扣款 100 元
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;

-- 账户 B 加款 100 元
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

COMMIT;  -- 提交事务（如果中间出错，自动 ROLLBACK）
```

如果第二步失败（比如账户 B 不存在），整个事务会回滚，账户 A 不会被扣款。

### 5.2 ACID 四大特性

👇 **动手试试看**：在 SqlDemo 组件的"事务"标签页查看 ACID 可视化：

<SqlDemo />

#### **A - Atomicity（原子性）**
- **含义**：事务中的操作要么全部成功，要么全部失败
- **类比**：转账要么同时成功，要么同时失败，不会出现"扣款了但没到账"的情况
- **实现**：Undo Log（回滚日志）

#### **C - Consistency（一致性）**
- **含义**：事务前后数据库状态一致，满足所有约束
- **类比**：转账前后总金额不变（A 余额 + B 余额 = 总金额）
- **实现**：应用层约束 + 数据库约束

#### **I - Isolation（隔离性）**
- **含义**：并发事务之间互不干扰
- **类比**：两个用户同时转账，不会相互影响
- **实现**：锁机制 + MVCC（多版本并发控制）

#### **D - Durability（持久性）**
- **含义**：事务提交后，永久保存，即使系统故障
- **类比**：转账成功后，断电也不会丢失记录
- **实现**：Redo Log（重做日志）

### 5.3 事务隔离级别

| 隔离级别 | 脏读 | 不可重复读 | 幻读 | 性能 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **READ UNCOMMITTED** | 是 | 是 | 是 | 高 | 几乎不用 |
| **READ COMMITTED** | 否 | 是 | 是 | 中 | 大多数数据库默认 |
| **REPEATABLE READ** | 否 | 否 | 是 | 低 | MySQL 默认 |
| **SERIALIZABLE** | 否 | 否 | 否 | 最低 | 金融级要求 |

**设置隔离级别**：
```sql
-- 查看
SELECT @@transaction_isolation;

-- 设置
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

::: tip 💡 如何选择隔离级别？
- **默认使用 READ COMMITTED**：避免脏读，性能可接受
- **金融场景**：使用 SERIALIZABLE 或 REPEATABLE READ
- **分析场景**：可降低到 READ UNCOMMITTED 提高性能
:::

---

## 6. SQL 注入：安全的警惕性

### 6.1 什么是 SQL 注入？

**SQL 注入**是一种常见的安全漏洞，攻击者通过构造恶意的输入，篡改 SQL 语句。

**示例**：一个登录接口

```sql
-- 正常 SQL
SELECT * FROM users WHERE username = 'admin' AND password = '123456';

-- 攻击者输入用户名：admin' --
-- 拼接后的 SQL
SELECT * FROM users WHERE username = 'admin' --' AND password = '123456';
--                                       ↑ 注释掉后面的密码验证，直接登录成功！
```

**更危险的攻击**：

```sql
-- 用户名输入：admin'; DROP TABLE users; --
-- 拼接后的 SQL
SELECT * FROM users WHERE username = 'admin'; DROP TABLE users; --'
```

### 6.2 如何防御？

#### **方法一：参数化查询（推荐）**

```python
# ❌ 错误：直接拼接字符串（危险！）
sql = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(sql)

# ✅ 正确：使用参数化查询（安全）
sql = "SELECT * FROM users WHERE username = %s"
cursor.execute(sql, (username,))
```

#### **方法二：ORM 框架**

```python
# Django ORM
user = User.objects.get(username=username)

# SQLAlchemy
user = session.query(User).filter(User.username == username).first()
```

#### **方法三：输入验证**

```python
# 限制用户名只能包含字母、数字、下划线
import re
if not re.match(r'^\w+$', username):
    raise ValueError('Invalid username')
```

::: warning 💡 防御 SQL 注入的黄金法则
1. **永远不要相信用户输入**
2. **永远使用参数化查询或 ORM**
3. **永远不要拼接 SQL 字符串**
4. **最小权限原则**：数据库用户只给必要权限
:::

---

## 7. 最佳实践

### 7.1 查询优化

| 优化技巧 | 说明 | 示例 |
| :--- | :--- | :--- |
| **避免 SELECT \*** | 只查询需要的列 | `SELECT name, email FROM users` |
| **使用 LIMIT** | 限制结果数量 | `SELECT * FROM users LIMIT 10` |
| **索引覆盖** | 查询条件使用索引列 | `WHERE indexed_col = 1` |
| **避免子查询** | 用 JOIN 替代子查询 | 见上文对比 |
| **批量操作** | 减少数据库往返 | `INSERT INTO ... VALUES (...), (...), (...)` |
| **分页查询** | 大数据量分页 | `SELECT * FROM users LIMIT 10 OFFSET 20` |

### 7.2 命名规范

| 类型 | 规范 | 示例 |
| :--- | :--- | :--- |
| **表名** | 小写 + 下划线 | `user_profiles`, `order_items` |
| **列名** | 小写 + 下划线 | `created_at`, `user_id` |
| **索引名** | `idx_表名_列名` | `idx_users_email` |
| **外键名** | `fk_表名_列名` | `fk_orders_user_id` |
| **主键名** | 统一使用 `id` | 无 |

### 7.3 数据库设计

| 设计原则 | 说明 | 示例 |
| :--- | :--- | :--- |
| **规范化** | 消除数据冗余 | 第三范式（3NF） |
| **反规范化** | 适当冗余提高性能 | 在订单表冗余用户姓名 |
| **主键选择** | 优先使用自增 ID | `id BIGINT AUTO_INCREMENT` |
| **时间字段** | 统一使用 DATETIME | `created_at DATETIME` |
| **软删除** | 用 `is_deleted` 标记 | 不真删除，便于恢复 |

---

## 8. 用 AI 辅助编写 SQL

AI 可以帮助你快速编写复杂的 SQL 查询。关键在于提供清晰的表结构和业务需求。

### 8.1 提示词模板

```
你是一位资深的数据库工程师，精通 SQL 查询优化。请帮我编写 SQL 查询。

## 数据库表结构
[提供表的 CREATE TABLE 语句或字段说明]

## 业务需求
[描述你想要查询的数据，例如：
- 统计每个月的订单总金额
- 查找购买过商品 A 和商品 B 的用户
- 计算用户的留存率]

## 要求
1. 使用标准 SQL 语法（兼容 MySQL 8.0）
2. 注释关键逻辑
3. 考虑性能优化（索引、JOIN 顺序）
4. 提供多种实现方案（如子查询 vs JOIN）

## 输出格式
### SQL 查询
\`\`\`sql
[SQL 语句]
\`\`\`

### 逻辑说明
[解释查询的逻辑和优化思路]
```

### 8.2 实战示例：复杂统计查询

**输入提示词**：

```
你是一位资深的数据库工程师，精通 SQL 查询优化。请帮我编写 SQL 查询。

## 数据库表结构

```sql
-- 用户表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  created_at DATETIME
);

-- 订单表
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  amount DECIMAL(10, 2),
  status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled'),
  created_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 订单详情表
CREATE TABLE order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT,
  product_id BIGINT,
  quantity INT,
  price DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 商品表
CREATE TABLE products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  category VARCHAR(50)
);
```

## 业务需求
1. 统计每个月的订单总金额和订单数量
2. 查找购买过商品 A 和商品 B 的用户
3. 计算用户复购率（有多少用户下了多个订单）

## 要求
1. 使用标准 SQL 语法（兼容 MySQL 8.0）
2. 注释关键逻辑
3. 考虑性能优化
```

**AI 输出示例**：

```sql
-- 需求 1：统计每个月的订单总金额和订单数量
SELECT
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  COUNT(*) AS order_count,
  SUM(amount) AS total_amount
FROM orders
WHERE status IN ('paid', 'shipped', 'completed')  -- 只统计有效订单
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- 需求 2：查找购买过商品 A 和商品 B 的用户
-- 方案一：INTERSECT（MySQL 不支持，用 IN 替代）
SELECT DISTINCT user_id
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE p.name IN ('商品 A', '商品 B')
GROUP BY user_id
HAVING COUNT(DISTINCT p.name) = 2;  -- 确保同时买了两个商品

-- 方案二：自连接（性能更好）
SELECT
  oa.user_id
FROM orders oa
JOIN order_items oia ON oa.id = oia.order_id
JOIN products pa ON oia.product_id = pa.id
JOIN order_items oib ON oa.id = oib.order_id  -- 同一个订单
JOIN products pb ON oib.product_id = pb.id
WHERE pa.name = '商品 A' AND pb.name = '商品 B';

-- 需求 3：计算用户复购率
WITH user_order_count AS (
  SELECT
    user_id,
    COUNT(*) AS order_count
  FROM orders
  WHERE status IN ('paid', 'shipped', 'completed')
  GROUP BY user_id
)
SELECT
  COUNT(CASE WHEN order_count >= 2 THEN 1 END) AS repeat_users,
  COUNT(*) AS total_users,
  ROUND(COUNT(CASE WHEN order_count >= 2 THEN 1 END) * 100.0 / COUNT(*), 2) AS repeat_rate
FROM user_order_count;
```

### 8.3 AI 辅助的注意事项

| 注意点 | 说明 |
| :--- | :--- |
| **提供完整上下文** | 表结构、索引、数据量都要说清楚 |
| **明确性能要求** | 是否需要优化、数据量大小 |
| **验证 SQL 语法** | AI 生成的 SQL 可能有小错误，需要测试 |
| **理解执行计划** | 用 `EXPLAIN` 查看查询是否使用了索引 |
| **分步实现** | 复杂查询可以拆分成多个简单查询 |

::: tip 💡 追问技巧
- "请提供另一种实现方案（如用 JOIN 替代子查询）"
- "请分析这条查询的性能瓶颈"
- "请添加索引建议"
- "请解释每个步骤的逻辑"
:::

---

## 名词速查表

| 名词 | 英文 | 解释 |
| :--- | :--- | :--- |
| **SQL** | Structured Query Language | 结构化查询语言，与数据库对话的标准语言 |
| **数据库** | Database | 存储和管理数据的仓库 |
| **表** | Table | 数据的二维表格，类似 Excel |
| **行** | Row | 表中的一条记录 |
| **列** | Column | 表中的一个字段 |
| **主键** | Primary Key | 唯一标识一行的字段（如 id） |
| **外键** | Foreign Key | 关联其他表的字段 |
| **索引** | Index | 加速查询的数据结构（B+ 树） |
| **事务** | Transaction | 一组要么全成功、要么全失败的 SQL 操作 |
| **ACID** | Atomicity, Consistency, Isolation, Durability | 事务的四大特性 |
| **JOIN** | Join | 连接多个表的查询操作 |
| **子查询** | Subquery | 嵌套在另一个查询中的查询 |
| **聚合函数** | Aggregate Function | SUM, AVG, COUNT, MAX, MIN |
| **分组** | Group By | 按字段分组统计 |
| **SQL 注入** | SQL Injection | 通过输入篡改 SQL 语句的攻击方式 |
| **规范化** | Normalization | 消除数据冗余的设计原则 |
| **反规范化** | Denormalization | 适当冗余提高性能的设计 |
| **执行计划** | Execution Plan | 数据库执行 SQL 的详细步骤 |
| **B+ 树** | B+ Tree | 索引的底层数据结构 |
| **MVCC** | Multi-Version Concurrency Control | 多版本并发控制，实现事务隔离 |
| **脏读** | Dirty Read | 读取未提交的数据 |
| **不可重复读** | Non-Repeatable Read | 同一事务两次读取结果不同 |
| **幻读** | Phantom Read | 同一事务两次读取结果集不同 |
| **隔离级别** | Isolation Level | 事务隔离的程度（READ UNCOMMITTED/READ COMMITTED/REPEATABLE READ/SERIALIZABLE） |
