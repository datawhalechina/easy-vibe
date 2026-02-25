# 后端项目架构设计

::: tip 🎯 核心问题
**API 越写越多，代码越来越乱，如何设计一个清晰、可维护的后端项目结构？** 这就像问：你是把所有工具都扔进一个抽屉，还是按功能分类整理？好的项目架构能让团队协作更高效，让系统扩展更轻松。
:::

---

## 1. 为什么要关注后端项目架构？

### 1.1 从小脚本到大系统的演变

很多初学者刚开始写后端时，代码结构非常简单：

```python
# app.py - 所有代码在一个文件
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/users', methods=['GET'])
def get_users():
    conn = sqlite3.connect('db.sqlite')
    users = conn.execute('SELECT * FROM users').fetchall()
    return jsonify(users)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    conn = sqlite3.connect('db.sqlite')
    conn.execute('INSERT INTO users (name, email) VALUES (?, ?)',
                 (data['name'], data['email']))
    conn.commit()
    return jsonify({'message': 'User created'})

# 还有订单、商品、支付...所有接口都在这个文件
```

几百行代码搞定一切，简单直接。但随着业务发展，问题开始出现：

- **接口多了**：一个文件几千行，找代码像"考古"
- **逻辑复杂了**：业务规则散落在各处，修改容易遗漏
- **数据库操作重复**：到处写 SQL，改表结构要改几十处
- **测试困难**：代码耦合严重，单元测试难以编写

**问题的本质**：没有"章法"，所有的逻辑都堆在一起，就像把所有的工具、零件、说明书都扔进一个抽屉。

### 1.2 好的架构像整理好的车间

想象一个整理好的工厂车间：

| 区域 | 功能 | 特点 |
|------|------|------|
| **原料区** | 存放原材料 | 分类摆放，标签清晰 |
| **加工区** | 生产加工 | 流水线作业，工序明确 |
| **质检区** | 质量检查 | 统一标准，严格把关 |
| **成品区** | 存放成品 | 整齐有序，易于出库 |
| **工具室** | 存放工具 | 按需借用，用完归还 |

**好的后端架构**就是把代码也这样组织：每一层只关心自己的职责，数据像流水一样在各层之间传递。

::: tip 💡 通俗比喻：餐厅后厨的组织
把后端系统想象成一家餐厅的后厨：

- **`controllers/`（出餐口）** = 服务员接单：接收订单、核对信息、上菜
- **`services/`（厨师团队）** = 厨师做菜：按照菜谱加工、协调各工序
- **`repositories/`（仓库管理）** = 仓管取料：从仓库取食材、记录库存
- **`models/`（菜谱标准）** = 菜谱定义：宫保鸡丁需要什么料、什么口味
- **`utils/`（工具柜）** = 厨具存放：刀、勺、秤等通用工具

**关键点**：每个角色职责明确，不会越界。服务员不会自己炒菜，厨师不会擅自改菜谱。
:::

---

## 2. 经典分层架构详解

### 2.1 四层架构（Controller-Service-Repository-Model）

最经典的后端分层架构如下：

```
my-backend-project/
├── src/
│   ├── controllers/          # 控制器层（Controller）
│   │   ├── userController.js
│   │   ├── orderController.js
│   │   └── index.js
│   ├── services/             # 业务逻辑层（Service）
│   │   ├── userService.js
│   │   ├── orderService.js
│   │   └── index.js
│   ├── repositories/         # 数据访问层（Repository/DAO）
│   │   ├── userRepository.js
│   │   └── index.js
│   ├── models/               # 数据模型层（Model/Entity）
│   │   ├── user.js
│   │   ├── order.js
│   │   └── index.js
│   ├── middlewares/          # 中间件
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── utils/                # 工具函数
│   │   ├── logger.js
│   │   ├── response.js
│   │   └── validator.js
│   ├── config/               # 配置文件
│   │   ├── database.js
│   │   ├── redis.js
│   │   └── index.js
│   ├── routes/               # 路由定义
│   │   ├── userRoutes.js
│   │   ├── index.js
│   │   └── api.js
│   ├── jobs/ 或 workers/     # 定时任务/后台任务
│   │   └── emailWorker.js
│   ├── events/ 或 subscribers/ # 事件监听
│   │   └── userEvents.js
│   └── app.js                # 应用入口
├── tests/                    # 测试文件
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── migrations/               # 数据库迁移
├── seeds/                    # 种子数据
├── docs/                     # 文档
├── .env                      # 环境变量
├── package.json
└── README.md
```

::: tip 📊 从图解中你能看到什么？
**分层逻辑**：

```
┌─────────────────────────────────────────┐
│  Controller 层（控制器层）               │  ← 接待员：接收请求，返回响应
│  - 接收 HTTP 请求                        │
│  - 参数校验、权限检查                     │
│  - 调用 Service                         │
│  - 格式化响应                            │
├─────────────────────────────────────────┤
│  Service 层（业务逻辑层）                │  ← 厨师：处理核心业务
│  - 业务逻辑编排                          │
│  - 事务管理                              │
│  - 调用 Repository                      │
│  - 跨模块协调                            │
├─────────────────────────────────────────┤
│  Repository 层（数据访问层）             │  ← 仓管员：管理数据存取
│  - 数据库操作                            │
│  - ORM 封装                              │
│  - 查询构建                              │
├─────────────────────────────────────────┤
│  Model 层（数据模型层）                  │  ← 菜谱标准：定义数据结构
│  - 实体定义（Entity）                    │
│  - 类型定义                              │
│  - 业务规则验证                          │
└─────────────────────────────────────────┘
```

**依赖方向**：
```
Controller → Service → Repository → Model
                ↓
         Middleware / Utils
```

上层依赖下层，下层不依赖上层。Model 是核心，所有层都可能依赖它。
:::

### 2.2 各层职责详解

#### Controller 层：请求的"接待员"

Controller 是系统的"门面"，负责接收 HTTP 请求并返回响应。

**职责**：
- 接收和解析请求参数
- 调用相应的 Service 处理业务
- 格式化响应数据
- 处理 HTTP 相关逻辑（状态码、Header 等）

**不应该做的事**：
- 直接操作数据库
- 编写复杂业务逻辑
- 处理事务

::: details 📝 Controller 代码示例（Node.js/Express）
```javascript
// controllers/userController.js
const userService = require('../services/userService')
const { success, error } = require('../utils/response')

class UserController {
  // 获取用户列表
  async list(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const users = await userService.getUsers({ page, limit })
      return success(res, users)
    } catch (err) {
      return error(res, err.message, 500)
    }
  }

  // 获取单个用户
  async getById(req, res) {
    try {
      const { id } = req.params
      const user = await userService.getUserById(id)
      if (!user) {
        return error(res, 'User not found', 404)
      }
      return success(res, user)
    } catch (err) {
      return error(res, err.message, 500)
    }
  }

  // 创建用户
  async create(req, res) {
    try {
      const userData = req.body
      const newUser = await userService.createUser(userData)
      return success(res, newUser, 201)
    } catch (err) {
      return error(res, err.message, 400)
    }
  }
}

module.exports = new UserController()
```
:::

#### Service 层：业务的"厨师"

Service 是系统的"大脑"，包含核心业务逻辑。

**职责**：
- 实现业务规则和流程
- 协调多个 Repository 完成复杂操作
- 管理事务
- 数据转换和计算

**不应该做的事**：
- 直接处理 HTTP 请求/响应
- 直接操作数据库（通过 Repository）

::: details 📝 Service 代码示例
```javascript
// services/userService.js
const userRepository = require('../repositories/userRepository')
const orderRepository = require('../repositories/orderRepository')
const emailService = require('./emailService')
const { hashPassword } = require('../utils/crypto')

class UserService {
  // 获取用户列表
  async getUsers({ page, limit }) {
    const offset = (page - 1) * limit
    const [users, total] = await Promise.all([
      userRepository.findAll({ limit, offset }),
      userRepository.count()
    ])
    
    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  // 获取用户详情（包含订单信息）
  async getUserById(id) {
    const user = await userRepository.findById(id)
    if (!user) return null
    
    // 获取用户订单统计
    const orderStats = await orderRepository.getStatsByUserId(id)
    
    return {
      ...user,
      orderStats
    }
  }

  // 创建用户（包含事务和邮件通知）
  async createUser(userData) {
    // 检查邮箱是否已存在
    const existingUser = await userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    // 密码加密
    const hashedPassword = await hashPassword(userData.password)
    
    // 创建用户
    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword
    })

    // 发送欢迎邮件（异步，不阻塞）
    emailService.sendWelcomeEmail(newUser.email).catch(console.error)

    return newUser
  }
}

module.exports = new UserService()
```
:::

#### Repository 层：数据的"仓管员"

Repository 负责所有与数据存储相关的操作。

**职责**：
- 数据库的增删改查
- ORM 映射
- 查询优化

**不应该做的事**：
- 包含业务逻辑
- 处理事务（由 Service 控制）

::: details 📝 Repository 代码示例
```javascript
// repositories/userRepository.js
const { User } = require('../models')

class UserRepository {
  // 查询所有用户
  async findAll({ limit, offset }) {
    return await User.findAll({
      limit,
      offset,
      attributes: { exclude: ['password'] }  // 不返回密码
    })
  }

  // 根据 ID 查询
  async findById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
  }

  // 根据邮箱查询
  async findByEmail(email) {
    return await User.findOne({ where: { email } })
  }

  // 创建用户
  async create(data) {
    return await User.create(data)
  }

  // 更新用户
  async update(id, data) {
    const user = await User.findByPk(id)
    if (!user) return null
    return await user.update(data)
  }

  // 删除用户
  async delete(id) {
    const user = await User.findByPk(id)
    if (!user) return null
    await user.destroy()
    return true
  }

  // 统计用户数量
  async count() {
    return await User.count()
  }
}

module.exports = new UserRepository()
```
:::

#### Model 层：数据的"定义"

Model 定义数据结构和业务规则。

::: details 📝 Model 代码示例（Sequelize）
```javascript
// models/user.js
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'banned'),
    defaultValue: 'active'
  }
}, {
  tableName: 'users',
  timestamps: true,  // 自动添加 createdAt 和 updatedAt
  indexes: [
    { fields: ['email'] },
    { fields: ['status'] }
  ]
})

module.exports = User
```
:::

---

## 3. 其他重要目录

### 3.1 `middlewares/` 中间件

中间件是请求处理流程中的"过滤器"。

```
middlewares/
├── auth.js                   # 认证中间件
├── errorHandler.js           # 错误处理
├── validator.js              # 参数校验
├── rateLimiter.js            # 限流
├── logger.js                 # 请求日志
└── cors.js                   # 跨域处理
```

::: details 📝 中间件示例
```javascript
// middlewares/auth.js
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authMiddleware
```
:::

### 3.2 `routes/` 路由

集中管理所有 API 路由。

```javascript
// routes/userRoutes.js
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/auth')

// 公开路由
router.get('/', userController.list)
router.get('/:id', userController.getById)

// 需要认证的路由
router.post('/', authMiddleware, userController.create)
router.put('/:id', authMiddleware, userController.update)
router.delete('/:id', authMiddleware, userController.delete)

module.exports = router
```

```javascript
// routes/index.js
const express = require('express')
const router = express.Router()

router.use('/users', require('./userRoutes'))
router.use('/orders', require('./orderRoutes'))
router.use('/products', require('./productRoutes'))

module.exports = router
```

### 3.3 `config/` 配置

集中管理所有配置，支持多环境。

```javascript
// config/index.js
const env = process.env.NODE_ENV || 'development'

const configs = {
  development: {
    port: 3000,
    database: {
      host: 'localhost',
      port: 5432,
      name: 'myapp_dev'
    },
    redis: {
      host: 'localhost',
      port: 6379
    }
  },
  production: {
    port: process.env.PORT || 80,
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME
    }
  }
}

module.exports = configs[env]
```

### 3.4 `utils/` 工具

```
utils/
├── logger.js                 # 日志工具
├── response.js               # 响应封装
├── crypto.js                 # 加密解密
├── date.js                   # 日期处理
└── validator.js              # 验证工具
```

---

## 4. 按功能组织（Feature-based）

对于中大型项目，可以采用按功能组织的方式：

```
src/
├── features/
│   ├── users/
│   │   ├── users.controller.js
│   │   ├── users.service.js
│   │   ├── users.repository.js
│   │   ├── users.model.js
│   │   ├── users.routes.js
│   │   ├── users.validator.js
│   │   └── index.js          # 统一导出
│   ├── orders/
│   │   ├── orders.controller.js
│   │   ├── orders.service.js
│   │   └── ...
│   └── products/
│       ├── products.controller.js
│       └── ...
├── shared/                   # 共享资源
│   ├── middlewares/
│   ├── utils/
│   └── config/
└── app.js
```

**优点**：
- 高内聚，一个功能的所有代码在一起
- 便于团队协作，不同人负责不同 feature
- 易于删除或重构

---

## 5. 知名开源项目的架构参考

### 5.1 Express.js 官方示例

```
express-example/
├── bin/                      # 启动脚本
├── public/                   # 静态资源
├── routes/                   # 路由
├── views/                    # 视图模板
├── app.js                    # 应用配置
└── package.json
```

**特点**：简单直接，适合小型项目。

### 5.2 NestJS（企业级 Node.js 框架）

```
nestjs-project/
├── src/
│   ├── modules/              # 功能模块
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   └── orders/
│   ├── common/               # 共享模块
│   ├── config/               # 配置
│   └── main.ts               # 入口
```

**特点**：
- 强制模块化结构
- 内置依赖注入
- 适合大型项目

### 5.3 Django（Python）

```
django-project/
├── project_name/             # 项目配置
├── apps/
│   ├── users/                # 用户应用
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   └── orders/               # 订单应用
├── templates/
├── static/
└── manage.py
```

**特点**：
- 约定优于配置
- MTV（Model-Template-View）模式
- 应用可复用

### 5.4 Spring Boot（Java）

```
spring-boot-project/
├── src/main/java/
│   └── com/example/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       ├── dto/
│       ├── config/
│       └── Application.java
├── src/main/resources/
│   ├── application.yml
│   └── mapper/
└── src/test/
```

**特点**：
- 严格的分层架构
- 注解驱动开发
- 强大的生态

---

## 6. 架构设计原则与检查清单

### 6.1 核心原则

| 原则 | 说明 | 实践建议 |
|------|------|----------|
| **单一职责** | 一个模块只做一件事 | Controller 只处理 HTTP，Service 只处理业务 |
| **依赖倒置** | 依赖抽象而非具体实现 | 使用接口/抽象类 |
| **开闭原则** | 对扩展开放，对修改关闭 | 新增功能不修改原有代码 |
| **DRY** | 不要重复自己 | 提取公共逻辑到 utils 或基类 |
| **KISS** | 保持简单 | 不要过度设计 |

### 6.2 检查清单

**分层检查**：
- [ ] Controller 是否只处理 HTTP 相关逻辑？
- [ ] Service 是否包含核心业务逻辑？
- [ ] Repository 是否只负责数据访问？
- [ ] 层与层之间是否通过明确的接口交互？

**代码质量**：
- [ ] 是否有统一的错误处理机制？
- [ ] 是否使用环境变量管理配置？
- [ ] 是否有日志记录？
- [ ] 是否编写了单元测试？

**安全**：
- [ ] 敏感配置是否放入环境变量？
- [ ] 是否有输入验证？
- [ ] 是否有认证和授权？
- [ ] 密码是否加密存储？

---

## 7. 总结

::: tip 💡 核心思想
好的后端架构应该像一家组织良好的餐厅：

- **分工明确**：每个角色知道自己的职责
- **流程清晰**：数据像流水一样在各层之间传递
- **易于扩展**：新增功能不会破坏现有结构
- **便于测试**：各层可以独立测试

**记住这几点**：
1. **分层是手段，不是目的**：不要为了分层而分层
2. **按功能组织**：中大型项目推荐 Feature-based
3. **统一约定**：命名、结构、错误处理保持一致
4. **持续重构**：定期审视架构，及时调整

**最终目标**：让代码像整理好的车间一样，想找什么立刻能找到，新功能容易添加，旧代码容易维护。
:::

---

## 参考资源

- [NestJS 文档](https://docs.nestjs.com/)
- [Express 最佳实践](https://expressjs.com/en/advanced/best-practice-security.html)
- [Bulletproof Node.js](https://github.com/santiq/bulletproof-nodejs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
