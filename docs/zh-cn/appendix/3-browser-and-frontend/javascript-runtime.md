# JavaScript 运行时深度指南

::: tip 前言
你已经学会了 JavaScript 的基本语法，但你是否想过：
- 代码到底在哪里运行？
- 为什么同样的代码在浏览器和 Node.js 中行为不一样？
- 为什么有时代码会"卡住"，有时却能"并行"执行？

这篇文章会带你深入了解 JavaScript 的运行时环境，包括事件循环、调用栈、内存管理等。读完这篇，你就能理解代码为什么按某个顺序执行，快速定位异步相关的 bug，优化代码性能并避免内存泄漏。
:::

**这篇文章会带你学什么?**

| 章节 | 内容 | 学完能干嘛 |
|-----|------|-----------|
| **第 1 章** | 运行时概述 | 理解 JavaScript 代码在哪里运行 |
| **第 2 章** | 浏览器运行时 | 知道浏览器提供了哪些 Web API |
| **第 3 章** | Node.js 运行时 | 了解服务器端的 JavaScript 环境 |
| **第 4 章** | 事件循环深入 | 掌握宏任务和微任务的执行顺序 |
| **第 5 章** | 调用栈与内存 | 理解代码执行过程和内存管理 |
| **第 6 章** | 实战技巧 | 优化性能、调试内存泄漏 |

---

## 1. 运行时概述

::: tip 🤔 核心问题
**什么是"运行时"?** JavaScript 只是一门语言,为什么同样的代码在不同环境中会有不同的行为?
:::

### 1.1 运行时是什么

**运行时 = JavaScript 引擎 + 环境提供的 API**

如果把 JavaScript 比作"编程语言",那么运行时就是"操作系统"——它决定了你的代码能做什么、不能做什么。

```
┌─────────────────────────────────────┐
│         JavaScript 代码             │
├─────────────────────────────────────┤
│      JavaScript 引擎 (V8)           │  ← 负责解析和执行代码
├─────────────────────────────────────┤
│      运行时环境 (浏览器/Node.js)     │  ← 提供额外能力
└─────────────────────────────────────┘
```

**一个比喻:JavaScript 是"普通话",运行时是"城市"**

- JavaScript 语法(普通话)哪里都一样
- 但不同城市提供的设施不一样:
  - 浏览器 = 有 DOM、window、fetch(就像城市有商场、图书馆)
  - Node.js = 有 fs、http、path(就像城市有工厂、高速公路)

### 1.2 两大主流运行时

| 特性 | 浏览器 | Node.js |
|------|--------|---------|
| **主要用途** | 网页交互、用户界面 | 服务器端应用、命令行工具 |
| **全局对象** | `window` | `global` |
| **DOM API** | ✅ 支持 | ❌ 不支持 |
| **文件系统** | ❌ 受限 | ✅ 完整支持 |
| **模块系统** | ES Modules | CommonJS + ES Modules |
| **定时器** | `setTimeout`, `setInterval` | `setTimeout`, `setInterval` |
| **网络请求** | `fetch`, `XMLHttpRequest` | `http`, `https` 模块 |

👇 **动手试试看**:对比浏览器和 Node.js 的环境差异

<RuntimeEnvironmentDemo />

::: info 💡 核心启示
运行时决定了你能用什么 API。在浏览器能用的 DOM API,在 Node.js 里用不了;在 Node.js 能用的文件 API,在浏览器里也用不了。这就是为什么有些代码需要"环境判断"。
:::

---

## 2. 浏览器运行时

::: tip 🤔 核心问题
**浏览器提供了哪些能力让 JavaScript 操作网页?**
:::

### 2.1 浏览器运行时的组成

```
┌─────────────────────────────────────────────┐
│            JavaScript 引擎                  │
│            (V8 / SpiderMonkey)              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              Web APIs                        │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐     │
│  │   DOM   │ │   BOM    │ │ Network  │     │
│  │  操作网页 │ │ 操作浏览器 │ │ 网络请求  │     │
│  └─────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           事件循环 (Event Loop)              │
│     负责协调代码执行、事件处理、任务调度        │
└─────────────────────────────────────────────┘
```

### 2.2 Web APIs 的三大类

**1. DOM API - 操作网页内容**

```javascript
// 查找元素
const title = document.querySelector('h1')

// 修改内容
title.textContent = '新标题'

// 添加样式
title.style.color = 'red'
```

**2. BOM API - 操作浏览器**

```javascript
// 页面跳转
window.location.href = 'https://example.com'

// 浏览器存储
localStorage.setItem('key', 'value')

// 浏览器历史
history.back()
```

**3. Network API - 网络请求**

```javascript
// 发送 HTTP 请求
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
```

### 2.3 浏览器特有的事件机制

浏览器运行时最强大的功能之一是"事件驱动"——代码不需要一直运行,而是等用户操作时才执行。

```javascript
button.addEventListener('click', () => {
  console.log('按钮被点击了')
})
```

**常见事件类型:**

| 事件类型 | 触发时机 | 实际场景 |
|---------|---------|---------|
| `click` | 鼠标点击 | 按钮交互 |
| `input` | 输入框内容变化 | 实时搜索 |
| `scroll` | 页面滚动 | 懒加载 |
| `load` | 资源加载完成 | 初始化数据 |
| `error` | 发生错误 | 错误处理 |

---

## 3. Node.js 运行时

::: tip 🤔 核心问题
**JavaScript 能在服务器端运行,靠的是什么?**
:::

### 3.1 Node.js 的组成

```
┌─────────────────────────────────────────────┐
│            JavaScript 引擎                  │
│                 (V8)                        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Node.js 内置模块                   │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐     │
│  │   fs    │ │   http   │ │   path   │     │
│  │ 文件操作 │ │ 网络服务器 │ │ 路径处理  │     │
│  └─────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          libuv 事件循环库                    │
│      跨平台的异步 I/O 支持                   │
└─────────────────────────────────────────────┘
```

### 3.2 Node.js 特有能力

**1. 文件系统操作**

```javascript
const fs = require('fs')

// 读取文件
fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// 写入文件
fs.writeFile('./output.txt', 'Hello', (err) => {
  if (err) throw err
  console.log('写入成功')
})
```

**2. HTTP 服务器**

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('<h1>Hello World</h1>')
})

server.listen(3000)
```

**3. 模块系统**

```javascript
// CommonJS (Node.js 默认)
const fs = require('fs')
module.exports = { myFunction }

// ES Modules (现代方式)
import fs from 'fs'
export { myFunction }
```

### 3.3 浏览器 vs Node.js 对比

| 特性 | 浏览器 | Node.js |
|------|--------|---------|
| **入口文件** | HTML 文件 | JavaScript 文件 |
| **全局对象** | `window`, `document` | `global`, `process` |
| **模块加载** | `<script>` 标签 | `require()` / `import` |
| **安全性** | 沙箱环境,受限 | 可以访问系统资源 |
| **用途** | 用户界面 | 后端服务、工具 |

---

## 4. 事件循环深入

::: tip 🤔 核心问题
**JavaScript 是单线程的,为什么能做到"不阻塞"?**
:::

### 4.1 事件循环是什么

**事件循环 = JavaScript 的"任务调度中心"**

JavaScript 是单线程的,一次只能做一件事。但事件循环让它看起来能"同时"做很多事。

**核心机制:**

1. **执行同步代码** (调用栈)
2. **处理异步任务** (任务队列)
3. **等待新任务** (循环往复)

```
调用栈                    任务队列
┌─────────┐              ┌──────────┐
│ 任务 1  │              │ 宏任务 1  │
│ 任务 2  │ ←────────────  │ 宏任务 2  │
│ 任务 3  │   执行完一个   │ 宏任务 3  │
└─────────┘   就取下一个  └──────────┘
      ↓                        ↑
      └────────────────────────┘
         事件循环不断检查
```

### 4.2 宏任务 vs 微任务

这是面试和实际开发中最容易搞混的概念!

**宏任务 (Macrotask):**
- `setTimeout`, `setInterval`
- I/O 操作
- UI 渲染

**微任务 (Microtask):**
- `Promise.then`
- `MutationObserver`
- `queueMicrotask`

**执行顺序:同步代码 → 微任务 → 宏任务**

👇 **动手试试看**:观察宏任务和微任务的执行顺序

<TaskQueueDemo />

### 4.3 经典面试题

```javascript
console.log('1')

setTimeout(() => console.log('2'), 0)

Promise.resolve().then(() => console.log('3'))

console.log('4')

// 输出: 1, 4, 3, 2
```

**为什么是这个顺序?**

1. 执行同步代码:`console.log('1')`,`console.log('4')` → 输出 1, 4
2. 检查微任务队列:`Promise.then` → 输出 3
3. 检查宏任务队列:`setTimeout` → 输出 2

::: info 💡 实战技巧
- 如果想让代码尽快执行,用微任务 (`Promise.then`)
- 如果想延迟执行,用宏任务 (`setTimeout`)
- 永远不要混用太多异步操作,否则会陷入"回调地狱"
:::

---

## 5. 调用栈与内存

::: tip 🤔 核心问题
**代码是怎么被执行的?变量存在哪里?什么时候被回收?**
:::

### 5.1 调用栈:函数执行的"足迹"

**调用栈 = 记录函数调用的"笔记本"**

每次调用一个函数,就会在栈上新增一条记录;函数执行完,记录就被移除。

```javascript
function a() {
  b()
}

function b() {
  c()
}

function c() {
  console.log('执行完毕')
}

a()
```

**调用栈的变化:**

```
步骤 1: 调用 a()
┌─────────┐
│    a    │
└─────────┘

步骤 2: a() 调用 b()
┌─────────┐
│    b    │
│    a    │
└─────────┘

步骤 3: b() 调用 c()
┌─────────┐
│    c    │
│    b    │
│    a    │
└─────────┘

步骤 4: c() 执行完,依次弹出
┌─────────┐
│    b    │
│    a    │
└─────────┘
```

👇 **动手试试看**:观察调用栈的变化

<CallStackDemo />

### 5.2 内存管理:垃圾去哪儿了

JavaScript 有"自动垃圾回收"机制——你不需要手动释放内存,引擎会帮你做。

**垃圾回收的原理:标记-清除算法**

1. **标记阶段**:从"根"开始,找到所有能访问的变量
2. **清除阶段**:没被标记的变量就是"垃圾",会被回收

```javascript
// 垃圾回收示例
let obj1 = { name: '对象1' }
let obj2 = { name: '对象2' }

// obj1 被重新赋值,原来的对象失去了引用
obj1 = null  // 原来的 { name: '对象1' } 会被回收

// obj2 还在使用中,不会被回收
console.log(obj2.name)
```

👇 **动手试试看**:观察垃圾回收的过程

<GarbageCollectionDemo />

### 5.3 内存泄漏:忘记清理的后果

**内存泄漏 = 该释放的内存没释放,越积越多**

常见原因:

**1. 全局变量太多**

```javascript
// ❌ 错误:全局变量不会被回收
globalCache = []

function addItem(item) {
  globalCache.push(item)
}
```

**2. 事件监听没移除**

```javascript
// ❌ 错误:监听器没移除
button.addEventListener('click', handleClick)

// ✅ 正确:不需要时移除监听
button.removeEventListener('click', handleClick)
```

**3. 闭包引用大对象**

```javascript
// ❌ 错误:闭包一直引用大对象,不会被回收
function createHandler() {
  const bigData = new Array(1000000).fill('data')
  return function() {
    console.log('处理中')
  }
}

const handler = createHandler()  // bigData 一直存在于内存中
```

👇 **动手试试看**:观察内存泄漏是如何发生的

<MemoryLeakDemo />

::: info 💡 实战技巧
- **定期检查**:打开浏览器 DevTools → Memory → Take Heap Snapshot,查看内存占用
- **避免全局变量**:尽量用 `const` 和 `let`,不用 `var`
- **及时清理**:事件监听、定时器用完要移除
- **弱引用**:用 `WeakMap` 和 `WeakSet` 存储对象引用
:::

---

## 6. 实战技巧

::: tip 🤔 核心问题
**怎么写出高性能的 JavaScript 代码?遇到问题怎么调试?**
:::

### 6.1 性能优化技巧

**1. 减少重排重绘**

```javascript
// ❌ 错误:每次循环都触发重排
for (let i = 0; i < 1000; i++) {
  element.style.top = i + 'px'
}

// ✅ 正确:批量修改
element.style.transform = `translateY(${position}px)`
```

**2. 使用事件委托**

```javascript
// ❌ 错误:给每个按钮都添加监听
buttons.forEach(btn => {
  btn.addEventListener('click', handleClick)
})

// ✅ 正确:只给父元素添加一个监听
container.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    handleClick(e)
  }
})
```

**3. 防抖和节流**

```javascript
// 防抖:用户停止输入后再执行
function debounce(fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 节流:限制执行频率
function throttle(fn, delay) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}
```

### 6.2 调试技巧

**1. 用 DevTools 查看调用栈**

```javascript
function a() {
  b()
}

function b() {
  c()
}

function c() {
  debugger  // 在这里暂停,查看调用栈
}

a()
```

**2. 用 `console.trace()` 追踪执行路径**

```javascript
function trackExecution() {
  console.trace('执行路径')
  // 会输出完整的调用栈
}
```

**3. 用 Performance 分析性能**

```javascript
performance.mark('start')

// 执行一些代码
for (let i = 0; i < 10000; i++) {
  // ...
}

performance.mark('end')
performance.measure('循环性能', 'start', 'end')

const measure = performance.getEntriesByName('循环性能')[0]
console.log(`执行时间: ${measure.duration}ms`)
```

### 6.3 常见问题速查

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| **内存占用高** | 内存泄漏、缓存太多 | 检查全局变量、移除监听器 |
| **页面卡顿** | 长任务阻塞主线程 | 拆分任务、用 Web Workers |
| **事件不触发** | 监听器没绑定、元素不存在 | 检查 DOM 加载时机 |
| **异步顺序错乱** | 混用宏任务和微任务 | 统一用 Promise 或 async/await |
| **定时器不准** | 主线程阻塞 | 用 Web Workers 或 requestAnimationFrame |

---

## 总结

你现在应该能理解:

- **运行时 = 引擎 + 环境 API**,不同运行时提供不同能力
- **事件循环**负责协调同步代码、微任务、宏任务的执行顺序
- **调用栈**记录函数执行过程,**栈溢出**是因为递归太深
- **垃圾回收**自动清理不用的变量,但要注意**内存泄漏**
- **性能优化**的关键是减少重排重绘、合理使用异步

::: info 💡 遇到问题时这样跟 AI 说
- "这个函数执行太慢,帮我看看怎么优化性能"
- "内存占用一直在涨,可能是内存泄漏,帮我检查一下"
- "异步操作顺序不对,应该是先 A 再 B,现在是 A 和 B 几乎同时开始"
- "事件监听器没有触发,检查一下元素是否已经加载到 DOM"
:::
