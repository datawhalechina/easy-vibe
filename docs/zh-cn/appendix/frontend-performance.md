# 前端性能优化 (Frontend Performance)

> 💡 **学习指南**：本章节无需深入的算法背景，通过交互式演示带你掌握前端性能优化的核心逻辑。我们将从最直观的页面加载讲起，一直到浏览器底层的渲染机制和缓存策略。

<PerformanceOverviewDemo />

<PerformanceMetricsDemo />

## 0. 引言：从 "能用" 到 "好用"

如果把访问网页比作去餐厅**吃饭**，那么：

- **加载 (Loading)** 就是食材（HTML/CSS/JS/图片）从仓库（服务器）运送到厨房（浏览器）的过程。
- **渲染 (Rendering)** 就是厨师（浏览器引擎）把食材加工成美味菜肴（页面）的过程。
- **交互 (Interaction)** 就是服务员响应你的需求（点击、滚动）。

**前端性能优化**的本质，就是为了让这三个过程**更快、更顺畅**。

它的核心任务只有一个：**最大限度地减少用户的等待时间。**

为了实现这个目标，我们需要解决三个核心挑战：

1.  **传输**：怎么把“食材”运得更快？（压缩、CDN、懒加载）
2.  **渲染**：怎么让“厨师”做得更快？（关键渲染路径、重排重绘）
3.  **记忆**：怎么避免重复劳动？（缓存策略）

本教程将带你一步步拆解这些优化技巧。

---

## 1. 第一步：传输 (Loading)

在厨师开始做饭之前，首先得有食材。如果运送食材的卡车堵在路上了，厨房里再厉害的大厨也得干瞪眼。

### 1.1 为什么网速快了，网页还是很慢？

你可能会疑惑：现在的 5G 和光纤这么快，为什么有些网页打开还是很慢？

原因通常有两个：
1.  **东西太多**：一张高清大图可能就有 5MB，相当于下载一本书。
2.  **路太堵**：浏览器同时下载的资源数量是有限的（通常 6 个），就像只有 6 辆小卡车在运货，多出来的得排队。

### 1.2 解决方案：瘦身与偷懒

为了解决这个问题，我们主要用两招：**压缩（瘦身）**和**懒加载（偷懒）**。

#### 瘦身：图片与代码压缩

图片通常是网页里最大的“胖子”。
现代的图片格式（如 WebP, AVIF）就像是采用了高科技压缩技术的压缩包，在画质几乎不变的情况下，体积能减小 30%-70%。

<ImageOptimizationDemo />

#### 偷懒：懒加载 (Lazy Loading)

“偷懒”在这里是个褒义词。
如果用户只在看第一屏的内容，为什么要把底下第十屏的图片也下载下来呢？

**懒加载**的策略是：**只加载用户看得到的内容**。当用户滚动页面，图片快要出现时，再去下载它。

<LazyLoadingDemo />

**关键点**：永远不要让用户下载他们不需要（或者暂时不需要）的资源。

---

## 2. 核心难题：渲染 (Rendering)

食材运到了，接下来压力给到了厨师（浏览器）。

### 2.1 浏览器的“单线程”困境

浏览器里的大厨（主线程）非常忙，他不仅要负责**画页面**（布局、绘制），还要负责**响应用户**（点击事件、JS 逻辑）。
最糟糕的是，他只有**一个人**（单线程）。

如果你让他在切菜（运行复杂的 JS 计算）的时候，顾客（用户）想点菜（点击按钮），他是没法理你的。这就导致了**卡顿**。

### 2.2 关键渲染路径 (Critical Rendering Path)

为了让用户尽快看到东西，浏览器制定了一套标准的工作流程，我们叫它**关键渲染路径**：

1.  **HTML -> DOM**：把菜谱读懂，列出食材清单。
2.  **CSS -> CSSOM**：搞清楚每种食材怎么处理（颜色、大小）。
3.  **Render Tree**：把清单和处理方法结合，决定最后上桌的菜。
4.  **Layout (排版)**：决定每个菜摆在盘子的哪个位置。
5.  **Paint (绘制)**：最后淋上酱汁，上色。

<CriticalRenderingPathDemo />

### 2.3 避坑指南：重排 (Reflow) 与重绘 (Repaint)

在这个流程中，最累人的步骤是 **Layout (排版)**。

- **重排 (Reflow)**：如果你改变了元素的大小或位置，浏览器通过重新计算所有元素的位置。这就像因为桌子移了一下，整个餐厅的椅子都要重新摆一遍。**非常消耗性能！**
- **重绘 (Repaint)**：如果你只是改变了颜色，浏览器只需要重新上色。这就像给桌布换个颜色，简单多了。

<ReflowRepaintDemo />

**优化原则**：
- 尽量避免**重排**（比如不要频繁修改 `width`, `top`）。
- 尽量使用只会触发**合成**（Composite）的属性（如 `transform`, `opacity`），这相当于让 GPU（帮厨）来干活，不占用主厨的时间。

---

## 3. 进阶：处理海量数据

如果你的网页需要展示 10,000 条聊天记录，或者 5,000 个商品列表，该怎么办？

### 3.1 为什么不能直接 `v-for`？

如果直接在页面上生成 10,000 个 `<div>`，浏览器的内存会瞬间爆炸，渲染树会变得巨大无比，每动一下都会卡死。
这就好比餐厅里只有 10 张桌子，你却非要一次性接待 10,000 个客人，结果就是谁也吃不上饭。

### 3.2 解决方案：虚拟列表 (Virtual Scrolling)

聪明的工程师想出了**虚拟列表**。
它的核心思想是：**欺骗眼睛**。

既然屏幕只能显示 10 条数据，那我就只渲染这 10 条（加上前后一点缓冲）。当用户滚动时，我快速地把移出屏幕的 DOM 销毁，把新进入屏幕的数据填进去。
用户感觉他在滚一个无限长的列表，但实际上浏览器里永远只有几十个 DOM 节点。

<VirtualScrollingDemo />

**关键点**：DOM 节点是昂贵的，能省则省。

---

## 4. 脚本执行优化 (Script Execution)

JavaScript 的执行是阻塞主线程的，优化 JS 执行效率对于保持页面流畅至关重要。

### 4.1 代码压缩 (Minification)

**移除不必要的字符**：

- 空格、换行、注释
- 缩短变量名
- 移除无用代码

**工具**：

- **Terser**：JavaScript 压缩工具
- **ESBuild**：极快的打包工具
- **Vite**：开发环境使用 ESBuild，生产环境使用 Rollup

**示例**：

```javascript
// 原始代码
function calculateTotal(price, quantity) {
  return price * quantity
}

// 压缩后
function calculateTotal(a, b) {
  return a * b
}
```

### 4.2 防抖与节流

**防抖 (Debounce)**：事件触发后，等待一段时间再执行

```javascript
// 搜索框输入：停止输入 300ms 后才搜索
const debouncedSearch = debounce((keyword) => {
  searchAPI(keyword)
}, 300)

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value)
})
```

**节流 (Throttle)**：限制函数执行频率

```javascript
// 滚动事件：最多每 100ms 执行一次
const throttledScroll = throttle(() => {
  updatePosition()
}, 100)

window.addEventListener('scroll', throttledScroll)
```

### 4.3 Web Workers

**Web Workers**：在后台线程运行 JavaScript，不阻塞主线程

**使用场景**：

- 大数据计算
- 图片/视频处理
- 复杂算法

**示例**：

```javascript
// 主线程
const worker = new Worker('calculator.js')
worker.postMessage({ data: largeData })
worker.onmessage = (e) => {
  console.log('计算结果:', e.data.result)
}

// calculator.js (Worker 线程)
self.onmessage = (e) => {
  const result = heavyCalculation(e.data.data)
  self.postMessage({ result })
}
```

### 4.4 避免长任务

**长任务（Long Task）**：执行时间超过 50ms 的任务

**问题**：长任务会阻塞主线程，导致页面卡顿

**解决方案**：

- **时间切片**：把大任务拆成小任务
- **使用 requestIdleCallback**：在浏览器空闲时执行
- **Web Workers**：移到后台线程

**示例**（时间切片）：

```javascript
async function processLargeArray(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i])
    // 每 100 个项目暂停一次，让浏览器处理其他任务
    if (i % 100 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
  }
}
```

### 5.3 压缩与裁剪

**使用工具压缩图片**：

- **ImageOptim**（Mac）
- **TinyPNG**（在线）
- **Squoosh**（Google 开源）

**使用 CDN 实时裁剪**：

```html
<!-- 使用 CDN 裁剪为 800x600 -->
<img src="https://cdn.example.com/image.jpg?w=800&h=600&q=80" />
```

---

## 6. 字体优化

字体也会影响性能，不当的字体加载会导致 FOUT/FOIT。

### 6.1 Web Font 优化

**问题**：使用 Web Font 时，浏览器可能：

- **FOUT**（Flash of Unstyled Text）：先显示系统字体，然后切换到 Web Font
- **FOIT**（Flash of Invisible Text）：文字隐藏，等 Web Font 加载完才显示

### 6.2 Font Display 策略

```css
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap; /* 立即显示系统字体，Web Font 加载完再切换 */
}
```

**`font-display` 值**：

- `auto`：浏览器默认
- `swap`：立即显示文本，Web Font 加载后替换（推荐）
- `fallback`：短时间隐藏，超时后显示系统字体
- `optional`：如果 Web Font 加载慢，就不使用它

### 6.3 字体子集化

**只包含用到的字符**：

- 中文字体很大（几 MB），但通常只用几百个字
- 使用工具提取子集

**工具**：

- **Fontmin**（中文字体子集化）
- **glyphhanger**（提取页面实际使用的字符）

**示例**：

```bash
# 只提取常用的 500 个汉字
fontmin input.ttf output/ --text='常用的五百个汉字...'
```

**结果**：

- 原始字体：5 MB
- 子集化后：200 KB
- 减少 96%

---

## 7. 缓存策略

缓存是性能优化的"银弹"，用好了能极大提升性能。

### 7.1 HTTP 缓存

**强缓存（Strong Cache）**：

```nginx
# 静态资源缓存 1 年
location ~* \.(jpg|png|css|js)$ {
  expires: 1y;
  add_header Cache-Control: public, immutable;
}
```

**协商缓存（Conditional Cache）**：

```nginx
# 使用 ETag
location / {
  etag on;
}
```

**最佳实践**：

- 带哈希的文件名（如 `app.abc123.js`）：永久缓存
- 不带哈希的文件：协商缓存

### 7.2 Service Worker

**Service Worker**：在浏览器后台运行的脚本，可以拦截网络请求

**核心能力**：

- 离线访问
- 资源缓存
- 后台同步

**示例**（使用 Workbox）：

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// sw.js (Service Worker 脚本)
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 天
      })
    ]
  })
)
```

### 7.3 LocalStorage / IndexedDB

**LocalStorage**：存储简单数据（5-10 MB）

```javascript
// 缓存 API 数据
localStorage.setItem('cache_key', JSON.stringify(data))
const cached = JSON.parse(localStorage.getItem('cache_key'))
```

**IndexedDB**：存储大量结构化数据

```javascript
// 存储离线数据
const db = await openDB('mydb', 1, {
  upgrade(db) {
    db.createObjectStore('posts')
  }
})
await db.put('posts', postData, 'post-1')
```

---

## 8. 监控与持续优化

性能优化不是一次性的工作，需要持续监控和改进。

### 8.1 Real User Monitoring (RUM)

**RUM**：收集真实用户的性能数据

**工具**：

- **Google Analytics**：免费，基础数据
- **Cloudflare Web Analytics**：免费，注重隐私
- **SpeedCurve**：付费，专业级

**关键指标**：

- 首屏时间（FCP、LCP）
- 交互时间（TTI）
- 转化率与性能的关系

### 8.2 Synthetic Monitoring

**合成监控**：用模拟用户定期测试

**工具**：

- **Lighthouse CI**：每次提交代码自动测试
- **WebPageTest**：定期测试关键页面
- **Pingdom**：简单易用的监控服务

### 8.3 性能预算

**设置预算并强制执行**：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['element-plus']
        }
      }
    }
  }
})
```

**使用 Lighthouse CI 检查预算**：

```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "preset": "desktop",
      "assertions": {
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "interactive": ["error", { "maxNumericValue": 5000 }]
      }
    }
  }
}
```

---

## 9. 实战案例

### 9.1 案例 1：新闻列表页优化

**问题**：首屏加载慢，滚动卡顿

**优化**：

1. **图片**：WebP + 懒加载
2. **列表**：虚拟列表（只渲染可见的 10 项）
3. **数据**：分页加载

**结果**：LCP 2.5s -> 0.8s

### 9.2 案例 2：数据可视化大屏

**问题**：渲染大量节点卡死

**优化**：

1. **渲染**：Canvas 代替 DOM
2. **计算**：Web Worker 处理数据

**结果**：FPS 10 -> 60

### 9.3 案例 3：移动端活动页

**问题**：白屏时间长

**优化**：

1. **资源**：预加载 (Preload) 关键图
2. **体验**：骨架屏 (Skeleton)

**结果**：白屏减少 60%

---

## 10. 总结与最佳实践

### 10.1 性能优化清单

**加载优化**：

- ✅ 启用 Gzip/Brotli 压缩
- ✅ 使用 CDN 加速静态资源
- ✅ 实施代码分割和懒加载
- ✅ 压缩和优化图片

**渲染优化**：

- ✅ 减少重排和重绘
- ✅ 优化关键渲染路径
- ✅ 使用 CSS 动画代替 JS 动画

**执行优化**：

- ✅ 使用 Web Workers 处理重计算
- ✅ 避免长任务（Long Tasks）
- ✅ 合理使用防抖和节流

**缓存优化**：

- ✅ 配置 HTTP 强缓存和协商缓存
- ✅ 考虑使用 Service Worker

### 10.2 持续学习

前端性能优化是一个不断发展的领域，新的标准（如 INP）和新的工具（如 Vite, Turbopack）层出不穷。保持好奇心，多看 Performance 面板，是你最好的老师。

---

## 11. 名词速查表 (Glossary)

| 名词 | 全称 | 解释 |
| :--- | :--- | :--- |
| **FP / FCP** | First Paint / First Contentful Paint | **首屏时间**。用户看到页面第一个像素/第一块内容的时间。 |
| **LCP** | Largest Contentful Paint | **最大内容绘制**。页面主要内容加载完成的时间（衡量加载速度的核心指标）。 |
| **INP** | Interaction to Next Paint | **交互到下一次绘制**。衡量页面响应速度的新指标（替代 FID），关注点击后的反馈延迟。 |
| **CLS** | Cumulative Layout Shift | **累积布局偏移**。页面加载时元素乱跳的程度（衡量视觉稳定性）。 |
| **TTFB** | Time to First Byte | **首字节时间**。从发出请求到接收到服务器第一个字节的时间（衡量后端响应速度）。 |
| **TBT** | Total Blocking Time | **总阻塞时间**。主线程被长任务阻塞的总时间（衡量页面交互流畅度）。 |
| **Reflow** | Reflow (Layout) | **重排**。浏览器重新计算元素位置和大小的过程。成本高，应避免。 |
| **Repaint** | Repaint | **重绘**。浏览器重新绘制元素外观（如颜色）的过程。成本中等。 |
| **CDN** | Content Delivery Network | **内容分发网络**。把文件存在离用户最近的服务器上，加速下载。 |
| **SSR** | Server-Side Rendering | **服务端渲染**。在服务器端生成 HTML，加快首屏显示，利于 SEO。 |
| **CSR** | Client-Side Rendering | **客户端渲染**。在浏览器端通过 JS 生成 HTML，交互体验好，但首屏慢。 |
| **SSG** | Static Site Generation | **静态站点生成**。构建时生成静态 HTML，访问速度极快。 |
| **Tree Shaking** | Tree Shaking | **摇树优化**。构建时移除未使用的代码，减小包体积。 |
| **Code Splitting** | Code Splitting | **代码分割**。将代码拆分成小块，按需加载。 |
| **Preload / Prefetch** | Preload / Prefetch | **预加载/预获取**。提前告知浏览器加载关键资源或未来可能用到的资源。 |
