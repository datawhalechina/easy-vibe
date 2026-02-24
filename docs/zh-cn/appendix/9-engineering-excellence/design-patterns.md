# 设计模式

::: tip 前言
**为什么你的代码总是"能跑但很乱"？** 你可能遇到过这样的情况：需求一变，代码就要大改；想复用一段逻辑，却发现它和其他代码纠缠在一起。设计模式就是前人总结的"代码组织套路"，帮你写出灵活、可维护的代码。

本章带你理解最实用的设计模式，不是死记硬背，而是理解"什么场景用什么套路"。
:::

**这篇文章会带你学什么？**

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第 1 章** | 设计模式是什么 | 模式的本质与分类 |
| **第 2 章** | 创建型模式 | 如何优雅地创建对象 |
| **第 3 章** | 结构型模式 | 如何组织代码结构 |
| **第 4 章** | 行为型模式 | 如何管理对象间的交互 |

学完本章，你将掌握最常用的设计模式，能在实际项目中识别适用场景并灵活运用。

---

## 0. 全景图：设计模式的本质

想象你在学做菜。你可以每次都从零开始摸索，也可以学习经典菜谱——菜谱不会限制你的创造力，反而让你站在前人的肩膀上。设计模式就是编程世界的"经典菜谱"。

::: tip 设计模式的价值
- **共同语言**：说"这里用观察者模式"，团队立刻理解你的设计意图
- **经验复用**：不用重新踩前人踩过的坑
- **灵活扩展**：好的模式让代码面对变化时只需小改，而不是大改
:::

通过下面的交互组件，浏览常见设计模式的分类和用途：

<DesignPatternCatalogDemo />

---

## 1. 创建型模式：如何优雅地创建对象

### 1.1 单例模式（Singleton）

**场景**：全局只需要一个实例，比如配置管理器、日志记录器、数据库连接池。

```javascript
class ConfigManager {
  static instance = null

  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  constructor() {
    this.config = {}
  }
}

// 无论调用多少次，都是同一个实例
const a = ConfigManager.getInstance()
const b = ConfigManager.getInstance()
console.log(a === b) // true
```

### 1.2 工厂模式（Factory）

**场景**：根据不同条件创建不同类型的对象，调用方不需要知道具体的创建细节。

```javascript
function createNotification(type, message) {
  switch (type) {
    case 'email':
      return { send: () => console.log(`发送邮件: ${message}`) }
    case 'sms':
      return { send: () => console.log(`发送短信: ${message}`) }
    case 'push':
      return { send: () => console.log(`推送通知: ${message}`) }
    default:
      throw new Error(`未知通知类型: ${type}`)
  }
}

// 调用方不关心具体实现
const notification = createNotification('email', '你好')
notification.send()
```

---

## 2. 结构型模式：如何组织代码结构

### 2.1 适配器模式（Adapter）

**场景**：两个接口不兼容，需要一个"转换插头"。比如旧 API 返回的数据格式和新组件期望的格式不一致。

```javascript
// 旧 API 返回的格式
const oldApi = {
  getUserInfo: () => ({ user_name: '张三', user_age: 25 })
}

// 适配器：转换为新格式
function adaptUser(oldUser) {
  return { name: oldUser.user_name, age: oldUser.user_age }
}

const user = adaptUser(oldApi.getUserInfo())
// { name: '张三', age: 25 }
```

### 2.2 装饰器模式（Decorator）

**场景**：在不修改原有代码的前提下，给对象添加新功能。像给手机套壳——手机功能不变，但多了保护。

```javascript
// 基础日志函数
function log(message) {
  console.log(message)
}

// 装饰：添加时间戳
function withTimestamp(fn) {
  return (message) => fn(`[${new Date().toISOString()}] ${message}`)
}

// 装饰：添加日志级别
function withLevel(fn, level) {
  return (message) => fn(`[${level}] ${message}`)
}

const enhancedLog = withTimestamp(withLevel(log, 'INFO'))
enhancedLog('服务启动成功')
// [2025-01-15T10:30:00.000Z] [INFO] 服务启动成功
```

---

## 3. 行为型模式：如何管理对象间的交互

### 3.1 观察者模式（Observer）

**场景**：一个对象状态变化时，需要自动通知其他对象。比如用户下单后，需要同时发邮件、扣库存、记日志。

```javascript
class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data))
  }
}

const bus = new EventEmitter()
bus.on('order:created', (order) => console.log('发送确认邮件', order.id))
bus.on('order:created', (order) => console.log('扣减库存', order.id))
bus.emit('order:created', { id: 'ORD-001' })
```

### 3.2 策略模式（Strategy）

**场景**：同一个操作有多种算法/策略，需要在运行时切换。比如不同的排序方式、不同的价格计算规则。

```javascript
const pricingStrategies = {
  normal: (price) => price,
  vip: (price) => price * 0.8,
  svip: (price) => price * 0.6
}

function calculatePrice(price, memberLevel) {
  const strategy = pricingStrategies[memberLevel] || pricingStrategies.normal
  return strategy(price)
}

calculatePrice(100, 'vip')  // 80
calculatePrice(100, 'svip') // 60
```

通过下面的交互组件，动手体验不同设计模式的运行效果：

<PatternPlaygroundDemo />

---

## 4. 如何选择设计模式？

| 你遇到的问题 | 推荐模式 | 核心思路 |
|-------------|---------|---------|
| 全局只需一个实例 | 单例 | 控制实例数量 |
| 根据条件创建不同对象 | 工厂 | 封装创建逻辑 |
| 接口不兼容需要转换 | 适配器 | 包装一层转换 |
| 动态添加功能 | 装饰器 | 层层包装增强 |
| 状态变化需通知多方 | 观察者 | 发布-订阅解耦 |
| 多种算法需运行时切换 | 策略 | 将算法封装为对象 |

::: tip 核心原则
设计模式不是越多越好。**过度设计**和**没有设计**一样糟糕。只在真正需要灵活性的地方使用模式，简单问题用简单方案。记住 KISS 原则：Keep It Simple, Stupid。
:::

---

## 5. AI 助力：用大模型学习和应用设计模式

大模型可以帮你识别代码中适合使用设计模式的场景，并给出具体的重构方案。

### 5.1 识别适用模式

> **提示词**：
> ```
> 分析以下代码，判断是否存在可以用设计模式改进的地方。
> 如果有，请说明：
> 1. 当前代码的问题
> 2. 推荐使用哪种设计模式
> 3. 重构后的代码示例
> 4. 为什么这个模式适合这个场景
>
> [粘贴你的代码]
> ```

### 5.2 用具体场景学习模式

> **提示词**：
> ```
> 用一个"外卖点餐系统"的真实场景，分别演示以下设计模式的应用：
> - 工厂模式：创建不同类型的订单
> - 观察者模式：订单状态变化通知
> - 策略模式：不同的配送费计算规则
>
> 用 JavaScript 代码示例，每个模式先展示不用模式的问题，
> 再展示用模式后的改进。
> ```

### 5.3 判断是否过度设计

> **提示词**：
> ```
> 审查以下代码，判断是否存在过度设计的问题。
> 是否有不必要的抽象、用不到的设计模式、或过早的优化？
> 如果有，请建议如何简化，遵循 KISS 原则。
>
> [粘贴你的代码]
> ```

::: tip AI 使用建议
让 AI 用你熟悉的业务场景来解释设计模式，比看抽象的 UML 图有效得多。但记住：AI 可能倾向于推荐更复杂的方案，你需要自己判断是否真的需要。
:::

---

## 6. 总结

1. **创建型模式**：解决"如何创建对象"的问题，让创建过程更灵活
2. **结构型模式**：解决"如何组织代码"的问题，让结构更清晰
3. **行为型模式**：解决"对象间如何交互"的问题，让协作更松耦合
4. **灵活运用**：根据实际场景选择，不要为了用模式而用模式

::: tip 终极思考
设计模式的本质是**管理变化**。好的设计让变化的部分容易修改，不变的部分保持稳定。当你写代码时问自己："如果需求变了，我需要改多少地方？"——如果答案是"很多地方"，那可能需要一个设计模式来帮忙了。
:::

---

## 延伸阅读

- **经典书籍**：GoF《设计模式：可复用面向对象软件的基础》是设计模式的开山之作。
- **现代视角**：JavaScript 中很多模式因为语言特性（闭包、高阶函数）变得更简洁。
- **实践建议**：先理解问题，再考虑模式。不要拿着锤子找钉子。
- **进阶学习**：了解 SOLID 原则，它是设计模式背后的指导思想。
