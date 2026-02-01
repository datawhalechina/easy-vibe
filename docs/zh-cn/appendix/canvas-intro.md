# Canvas 2D 入门：从像素到动画（交互式教程）

> **学习指南**：本章节无需深厚的前端基础，通过交互式演示带你掌握 Canvas 2D 的核心原理和实践技巧。我们将从最基础的绘制开始，一直到构建复杂的交互式图形应用。

## 0. 引言：Canvas 是什么

Canvas（画布）是 HTML5 提供的一个通过 JavaScript 绘制 2D 图形的元素。你可以把它想象成一张**数字画布**，上面可以用代码"画"出任何东西：简单的形状、复杂的图表、流畅的动画，甚至是完整的游戏。

### 0.1 Canvas vs SVG：有什么区别？

在 Web 开发中，绘制图形主要有两种方式：Canvas 和 SVG（Scalable Vector Graphics）。它们各有优劣：

| 特性     | Canvas               | SVG                   |
| :------- | :------------------- | :-------------------- |
| **类型** | 位图（光栅图形）     | 矢量图形              |
| **DOM**  | 单个 `<canvas>` 元素 | 每个图形都是 DOM 元素 |
| **交互** | 需要手动计算碰撞     | 天然支持事件绑定      |
| **性能** | 适合大量对象         | 适合少量复杂对象      |
| **缩放** | 放大会失真           | 无限缩放不失真        |
| **应用** | 游戏、数据可视化     | 图标、插画            |

**简单总结**：

- **Canvas** = 像素画，画完就变成像素，性能好但交互麻烦
- **SVG** = 矢量图，每个图形都是对象，交互方便但对象多了会慢

### 0.2 Canvas 的应用场景

Canvas 的用途非常广泛，你可能在很多地方都见过它：

1. **数据可视化**：折线图、饼图、热力图（如 ECharts、Chart.js）
2. **游戏开发**：网页游戏（如 Phaser.js 引擎）
3. **图像处理**：图片裁剪、滤镜、拼图（如 Fabric.js）
4. **创意效果**：粒子特效、动画背景（如 Three.js 的 2D 渲染）
5. **工程绘图**：CAD、流程图、思维导图

---

## 1. Canvas 基础

### 1.1 Canvas 元素和上下文

使用 Canvas 的第一步是在 HTML 中创建一个 `<canvas>` 元素：

```html
<canvas id="myCanvas" width="600" height="400"></canvas>
```

然后通过 JavaScript 获取**渲染上下文（Rendering Context）**：

```javascript
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d') // 获取 2D 上下文
```

**关键概念**：

- `canvas` 是 DOM 元素，控制画布的大小和位置
- `ctx` 是绘图工具，所有的绘制操作都通过它完成
- `'2d'` 表示使用 2D 渲染上下文（WebGL 使用 `'webgl'`）

> 🕹️ **交互演示**：点击下方按钮，体验 Canvas 的基本绘图操作。

<CanvasBasicsDemo />

### 1.2 坐标系统

Canvas 使用的是**屏幕坐标系**，这与传统数学坐标系有所不同：

- **原点 (0, 0)**：在左上角（不是中心）
- **X 轴**：向右为正方向
- **Y 轴**：向下为正方向（注意：数学坐标系中 Y 轴向上）
- **单位**：像素（px）

```javascript
// 在左上角绘制一个点
ctx.fillRect(0, 0, 10, 10)

// 在右下角绘制一个点
ctx.fillRect(canvas.width - 10, canvas.height - 10, 10, 10)
```

> 🕹️ **交互演示**：拖动下方的点，感受 Canvas 的坐标系统。

<CoordinateSystemDemo />

### 1.3 绘制基本形状

Canvas 提供了几种绘制基本形状的方法：

#### 矩形

```javascript
// 填充矩形
ctx.fillStyle = '#3498db'
ctx.fillRect(x, y, width, height)

// 描边矩形
ctx.strokeStyle = '#2c3e50'
ctx.lineWidth = 2
ctx.strokeRect(x, y, width, height)

// 清除矩形区域
ctx.clearRect(x, y, width, height)
```

#### 圆形

```javascript
ctx.beginPath()
ctx.arc(x, y, radius, startAngle, endAngle)
ctx.fill() // 或 ctx.stroke()
```

**参数说明**：

- `x, y`：圆心坐标
- `radius`：半径
- `startAngle, endAngle`：起始和结束角度（弧度制）
  - `0` = 3 点钟方向
  - `Math.PI / 2` = 6 点钟方向
  - `Math.PI` = 9 点钟方向
  - `Math.PI * 1.5` = 12 点钟方向
  - `Math.PI * 2` = 回到 3 点钟方向

#### 线条

```javascript
ctx.beginPath()
ctx.moveTo(x1, y1) // 起点
ctx.lineTo(x2, y2) // 终点
ctx.stroke()
```

### 1.4 颜色和渐变

Canvas 支持多种颜色设置方式：

```javascript
// 纯色
ctx.fillStyle = '#3498db' // 十六进制
ctx.fillStyle = 'rgb(52, 152, 219)' // RGB
ctx.fillStyle = 'rgba(52, 152, 219, 0.5)' // RGBA（带透明度）

// 线性渐变
const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
gradient.addColorStop(0, '#3498db')
gradient.addColorStop(1, '#e74c3c')
ctx.fillStyle = gradient

// 径向渐变
const radialGradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
radialGradient.addColorStop(0, '#3498db')
radialGradient.addColorStop(1, 'transparent')
ctx.fillStyle = radialGradient
```

---

## 2. 路径与形状

### 2.1 路径 (Path) 的概念

**路径**是 Canvas 中的核心概念，它是由一系列点连接成的"轨迹"。你可以把它想象成用笔画线的过程：

1. `beginPath()` - 开始新路径（拿起笔）
2. `moveTo()` - 移动到起点（不画线）
3. `lineTo()` / `arc()` / `curveTo()` - 绘制线条或曲线
4. `closePath()` - 闭合路径（可选）
5. `fill()` / `stroke()` - 填充或描边

```javascript
ctx.beginPath()
ctx.moveTo(100, 100) // 移动到起点
ctx.lineTo(200, 100) // 画横线
ctx.lineTo(150, 150) // 画斜线
ctx.closePath() // 闭合路径（回到起点）
ctx.fill() // 填充
```

### 2.2 绘制复杂形状

通过组合路径，可以绘制任意复杂的形状：

#### 三角形

```javascript
ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(150, 150)
ctx.lineTo(50, 150)
ctx.closePath()
ctx.fillStyle = '#e74c3c'
ctx.fill()
```

#### 星形

```javascript
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3
  let x = cx
  let y = cy
  const step = Math.PI / spikes

  ctx.beginPath()
  ctx.moveTo(cx, cy - outerRadius)

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy + Math.sin(rot) * outerRadius
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    ctx.lineTo(x, y)
    rot += step
  }

  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath()
  ctx.fill()
}

drawStar(ctx, 150, 150, 5, 50, 25)
```

---

## 3. 文本与图片

### 3.1 绘制文本

Canvas 也可以绘制文本：

```javascript
// 填充文本
ctx.font = '30px Arial'
ctx.fillStyle = '#2c3e50'
ctx.fillText('Hello Canvas', x, y)

// 描边文本
ctx.font = 'bold 40px Arial'
ctx.strokeStyle = '#e74c3c'
ctx.lineWidth = 2
ctx.strokeText('Hello Canvas', x, y)

// 文本对齐
ctx.textAlign = 'center' // left, center, right
ctx.textBaseline = 'middle' // top, middle, bottom
ctx.fillText('Centered', canvas.width / 2, canvas.height / 2)
```

### 3.2 加载和绘制图片

```javascript
const img = new Image()
img.src = 'image.png'
img.onload = () => {
  // 绘制图片
  ctx.drawImage(img, x, y)

  // 缩放图片
  ctx.drawImage(img, x, y, width, height)

  // 裁剪图片
  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}
```

**参数说明**：

- `sx, sy, sWidth, sHeight`：源图像的裁剪区域
- `dx, dy, dWidth, dHeight`：目标画布的绘制区域

### 3.3 裁剪与合成

```javascript
// 裁剪区域
ctx.save()
ctx.beginPath()
ctx.arc(x, y, radius, 0, Math.PI * 2)
ctx.clip() // 之后的所有绘制都只会显示在圆形内
ctx.drawImage(img, 0, 0)
ctx.restore()

// 全局合成操作
ctx.globalCompositeOperation = 'source-over' // 默认
ctx.globalCompositeOperation = 'destination-over' // 绘制在现有内容后面
ctx.globalCompositeOperation = 'source-in' // 只保留重叠部分
```

---

## 4. 动画基础

### 4.1 requestAnimationFrame

在 Canvas 中创建动画，核心是使用 `requestAnimationFrame` 方法。它是浏览器专门为动画优化的 API：

```javascript
function animate() {
  // 1. 清除画布（或绘制半透明背景产生拖尾效果）
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 2. 更新状态
  update()

  // 3. 绘制
  draw()

  // 4. 请求下一帧
  requestAnimationFrame(animate)
}

// 启动动画
animate()
```

**为什么用 requestAnimationFrame 而不是 setInterval？**

- 自动优化，通常为 60FPS（每秒 60 帧）
- 页面不可见时自动暂停，节省资源
- 与浏览器刷新周期同步，避免画面撕裂

> 🕹️ **交互演示**：点击播放，观察不同类型的动画效果。

<AnimationLoopDemo />

### 4.2 清除与重绘

动画的本质是**快速连续绘制静态画面**。每帧需要：

1. **清除旧画面**：`ctx.clearRect()` 或用半透明背景覆盖
2. **更新状态**：计算新位置、新角度等
3. **绘制新画面**：重新绘制所有对象

```javascript
// 方法1：完全清除
ctx.clearRect(0, 0, canvas.width, canvas.height)

// 方法2：半透明背景（产生拖尾效果）
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// 方法3：只清除变化区域（脏矩形优化）
objects.forEach((obj) => {
  if (obj.moved) {
    ctx.clearRect(obj.oldX, obj.oldY, obj.size, obj.size)
    obj.draw(ctx)
  }
})
```

### 4.3 动画循环

一个完整的动画循环示例：

```javascript
let ball = {
  x: 300,
  y: 200,
  vx: 2,
  vy: 3,
  radius: 20
}

function update() {
  // 更新位置
  ball.x += ball.vx
  ball.y += ball.vy

  // 边界碰撞
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.vx = -ball.vx
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.vy = -ball.vy
  }
}

function draw() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制球
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fillStyle = '#3498db'
  ctx.fill()
}

function animate() {
  update()
  draw()
  requestAnimationFrame(animate)
}

animate()
```

---

## 5. 事件处理

Canvas 只是一个 DOM 元素，不像 SVG 那样每个图形都是独立的 DOM 元素。因此，我们需要**手动处理交互事件**。

### 5.1 鼠标事件

```javascript
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  console.log(`Clicked at (${x}, ${y})`)
})

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // 检测是否悬停在某个对象上
  objects.forEach((obj) => {
    const dist = Math.sqrt((x - obj.x) ** 2 + (y - obj.y) ** 2)
    if (dist < obj.radius) {
      canvas.style.cursor = 'pointer'
      obj.hovered = true
    }
  })
})
```

### 5.2 拖拽实现

```javascript
let isDragging = false
let selectedObject = null

canvas.addEventListener('mousedown', (e) => {
  const { x, y } = getMousePos(e)

  objects.forEach((obj) => {
    const dist = Math.sqrt((x - obj.x) ** 2 + (y - obj.y) ** 2)
    if (dist < obj.radius) {
      isDragging = true
      selectedObject = obj
    }
  })
})

canvas.addEventListener('mousemove', (e) => {
  if (isDragging && selectedObject) {
    const { x, y } = getMousePos(e)
    selectedObject.x = x
    selectedObject.y = y
    draw() // 重绘
  }
})

canvas.addEventListener('mouseup', () => {
  isDragging = false
  selectedObject = null
})
```

### 5.3 键盘事件

```javascript
canvas.tabIndex = 0 // 使 canvas 可以获取焦点
canvas.focus()

canvas.addEventListener('keydown', (e) => {
  const step = 10

  switch (e.key) {
    case 'ArrowUp':
      selectedObject.y -= step
      break
    case 'ArrowDown':
      selectedObject.y += step
      break
    case 'ArrowLeft':
      selectedObject.x -= step
      break
    case 'ArrowRight':
      selectedObject.x += step
      break
    case 'Delete':
      objects = objects.filter((obj) => obj !== selectedObject)
      break
  }

  draw()
})
```

> 🕹️ **交互演示**：尝试在下方的 Canvas 中点击、拖拽、悬停，体验不同的事件处理方式。

<EventHandlingDemo />

---

## 6. 实战案例

### 6.1 绘制折线图

```javascript
const data = [10, 50, 30, 80, 60, 90, 40]

function drawLineChart(ctx, data) {
  const padding = 50
  const chartWidth = canvas.width - padding * 2
  const chartHeight = canvas.height - padding * 2
  const maxValue = Math.max(...data)

  // 绘制坐标轴
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, canvas.height - padding)
  ctx.lineTo(canvas.width - padding, canvas.height - padding)
  ctx.strokeStyle = '#2c3e50'
  ctx.stroke()

  // 绘制折线
  ctx.beginPath()
  data.forEach((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth
    const y = canvas.height - padding - (value / maxValue) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.strokeStyle = '#3498db'
  ctx.lineWidth = 2
  ctx.stroke()

  // 绘制数据点
  data.forEach((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth
    const y = canvas.height - padding - (value / maxValue) * chartHeight

    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#e74c3c'
    ctx.fill()
  })
}
```

### 6.2 简单粒子系统

粒子系统是游戏和特效中常见的技术，它由大量小粒子组成，每个粒子有独立的位置、速度、生命周期等属性。

```javascript
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 4
    this.vy = (Math.random() - 0.5) * 4
    this.life = 1.0
    this.color = `hsl(${Math.random() * 360}, 70%, 50%)`
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.life -= 0.02
  }

  draw(ctx) {
    ctx.globalAlpha = this.life
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1.0
  }

  isDead() {
    return this.life <= 0
  }
}

// 动画循环
let particles = []

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles = particles.filter((p) => !p.isDead())
  particles.forEach((p) => {
    p.update()
    p.draw(ctx)
  })

  requestAnimationFrame(animate)
}

// 鼠标移动产生粒子
canvas.addEventListener('mousemove', (e) => {
  const { x, y } = getMousePos(e)
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(x, y))
  }
})

animate()
```

> 🕹️ **交互演示**：在下方 Canvas 中移动鼠标，体验不同的粒子效果。

<ParticleSystemDemo />

---

## 7. 性能优化

随着绘制的对象增多，Canvas 性能会下降。以下是一些常用的优化技巧：

### 7.1 离屏 Canvas (Offscreen Canvas)

预渲染静态内容到离屏 Canvas，减少每帧的绘制操作：

```javascript
// 创建离屏 Canvas
const offscreenCanvas = document.createElement('canvas')
const offscreenCtx = offscreenCanvas.getContext('2d')
offscreenCanvas.width = 600
offscreenCanvas.height = 400

// 预渲染背景
function drawBackground(ctx) {
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, 600, 400)
  // 绘制网格...
}
drawBackground(offscreenCtx)

// 主渲染循环
function draw() {
  // 直接复制预渲染的背景
  ctx.drawImage(offscreenCanvas, 0, 0)

  // 只绘制动态对象
  objects.forEach((obj) => obj.draw(ctx))
}
```

### 7.2 图层管理

将静态背景和动态对象分层渲染：

```javascript
// 背景层（只绘制一次）
const backgroundLayer = document.createElement('canvas')
// ... 绘制静态背景

// 动态层（每帧重绘）
const dynamicLayer = canvas

function draw() {
  // 清除动态层
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制背景层
  ctx.drawImage(backgroundLayer, 0, 0)

  // 绘制动态对象
  objects.forEach((obj) => obj.draw(ctx))
}
```

### 7.3 减少重绘

只重绘变化的部分（脏矩形优化）：

```javascript
function draw() {
  objects.forEach((obj) => {
    if (obj.moved) {
      // 清除旧位置
      ctx.clearRect(
        obj.oldX - obj.size,
        obj.oldY - obj.size,
        obj.size * 2,
        obj.size * 2
      )

      // 绘制新位置
      obj.draw(ctx)

      obj.moved = false
    }
  })
}
```

### 7.4 批量渲染

减少状态切换（fillStyle、strokeStyle 等）：

```javascript
// 按颜色分组
const batches = {}
objects.forEach((obj) => {
  if (!batches[obj.color]) {
    batches[obj.color] = []
  }
  batches[obj.color].push(obj)
})

// 批量绘制相同颜色的对象
Object.keys(batches).forEach((color) => {
  ctx.fillStyle = color // 只设置一次颜色
  batches[color].forEach((obj) => {
    ctx.beginPath()
    ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
    ctx.fill()
  })
})
```

> 🕹️ **交互演示**：对比不同优化技术的性能差异。

<PerformanceDemo />

---

## 8. 常见库与框架

虽然原生 Canvas 已经很强大，但在实际项目中，使用成熟的库可以大大提高开发效率。

### 8.1 Fabric.js

**特点**：对象模型，支持交互

```javascript
const canvas = new fabric.Canvas('c')

// 创建圆形
const circle = new fabric.Circle({
  radius: 20,
  fill: '#3498db',
  left: 100,
  top: 100
})

canvas.add(circle)

// 自动处理事件
circle.on('click', () => {
  circle.set('fill', '#e74c3c')
  canvas.renderAll()
})
```

**适用场景**：图片编辑器、白板工具、图形设计工具

### 8.2 Konva.js

**特点**：高性能，支持动画和滤镜

```javascript
const stage = new Konva.Stage({
  container: 'container',
  width: 600,
  height: 400
})

const layer = new Konva.Layer()
stage.add(layer)

const circle = new Konva.Circle({
  x: 300,
  y: 200,
  radius: 50,
  fill: '#3498db',
  draggable: true
})

layer.add(circle)
```

**适用场景**：复杂的图形应用、动画演示

### 8.3 PixiJS (WebGL)

**特点**：WebGL 加速，超高性能

```javascript
const app = new PIXI.Application({
  width: 600,
  height: 400,
  backgroundColor: 0x1099bb
})
document.body.appendChild(app.view)

const graphics = new PIXI.Graphics()
graphics.beginFill(0x3498db)
graphics.drawCircle(300, 200, 50)
graphics.endFill()
app.stage.addChild(graphics)
```

**适用场景**：大型游戏、粒子系统、大量对象的场景

### 8.4 Three.js (3D)

虽然 Three.js 主要用于 3D，但也支持 2D 渲染：

```javascript
const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(0, 600, 400, 0, 1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(600, 400)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.CircleGeometry(50, 32)
const material = new THREE.MeshBasicMaterial({ color: 0x3498db })
const circle = new THREE.Mesh(geometry, material)
circle.position.set(300, 200, 0)
scene.add(circle)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
```

**适用场景**：2.5D 游戏、混合 2D/3D 应用

### 8.5 选择建议

| 库              | 优势               | 劣势       | 适用场景         |
| :-------------- | :----------------- | :--------- | :--------------- |
| **原生 Canvas** | 轻量、无依赖       | 开发效率低 | 学习、简单图形   |
| **Fabric.js**   | 对象模型、交互友好 | 性能一般   | 图片编辑器、白板 |
| **Konva.js**    | 高性能、API 简洁   | 体积较大   | 复杂图形应用     |
| **PixiJS**      | 超高性能、WebGL    | 学习曲线陡 | 大型游戏         |
| **Three.js**    | 3D 能力强          | 过于重量级 | 2.5D 游戏        |

---

## 9. 总结与最佳实践

### 9.1 核心要点回顾

1. **Canvas 是位图画布**：绘制后就是像素，无法直接修改已有内容
2. **坐标系统**：原点在左上角，Y 轴向下为正
3. **路径系统**：beginPath → moveTo → lineTo → fill/stroke
4. **动画原理**：清除 → 更新 → 绘制 → requestAnimationFrame
5. **事件处理**：需要手动计算碰撞检测
6. **性能优化**：离屏 Canvas、脏矩形、批量渲染

### 9.2 最佳实践

#### 代码组织

```javascript
// 使用类封装对象
class GameObject {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  update() {
    // 更新状态
  }

  draw(ctx) {
    // 绘制
  }

  isHit(x, y) {
    // 碰撞检测
    const dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2)
    return dist < this.radius
  }
}
```

#### 性能优化清单

- ✅ 使用 `requestAnimationFrame` 而不是 `setInterval`
- ✅ 减少状态切换（按颜色分组绘制）
- ✅ 使用离屏 Canvas 预渲染静态内容
- ✅ 只重绘变化的部分（脏矩形）
- ✅ 限制对象数量，使用对象池
- ✅ 避免 `save()` 和 `restore()` 的频繁调用

#### 调试技巧

```javascript
// 绘制边界框（用于调试）
function drawBoundingBox(ctx, obj) {
  ctx.strokeStyle = '#e74c3c'
  ctx.lineWidth = 1
  ctx.strokeRect(
    obj.x - obj.radius,
    obj.y - obj.radius,
    obj.radius * 2,
    obj.radius * 2
  )
}

// 显示 FPS
let lastTime = performance.now()
let frameCount = 0

function showFPS() {
  const now = performance.now()
  frameCount++

  if (now >= lastTime + 1000) {
    console.log(`FPS: ${frameCount}`)
    frameCount = 0
    lastTime = now
  }

  requestAnimationFrame(showFPS)
}
showFPS()
```

### 9.3 学习路线

1. **入门**：掌握基本形状绘制和颜色
2. **进阶**：学习动画原理和事件处理
3. **实战**：制作小游戏（贪吃蛇、打砖块）
4. **优化**：学习性能优化技巧
5. **扩展**：尝试成熟的 Canvas 库（Fabric.js、Konva）

---

## 10. 名词速查表 (Glossary)

| 名词                      | 解释                                                                      |
| :------------------------ | :------------------------------------------------------------------------ |
| **Context / 上下文**      | Canvas 的渲染环境，通过 `getContext('2d')` 获取，所有绘制操作都通过它完成 |
| **Path / 路径**           | 由一系列点连接成的轨迹，是 Canvas 绘图的基础                              |
| **Stroke / 描边**         | 绘制路径的轮廓线                                                          |
| **Fill / 填充**           | 用颜色填充路径内部                                                        |
| **requestAnimationFrame** | 浏览器提供的动画 API，在每次重绘前调用回调函数                            |
| **Offscreen Canvas**      | 离屏 Canvas，用于预渲染静态内容以提高性能                                 |
| **Dirty Rect**            | 脏矩形优化，只重绘变化的部分                                              |
| **Particle System**       | 粒子系统，由大量小粒子组成的特效系统                                      |
| **Collision Detection**   | 碰撞检测，判断鼠标或对象是否点击了某个图形                                |
| **Raster vs Vector**      | 位图 vs 矢量图，Canvas 是位图，SVG 是矢量图                               |

---

**下一步建议**：

- 如果你想深入学习 Canvas 动画，可以尝试制作一个**贪吃蛇游戏**或**打砖块游戏**
- 如果你对数据可视化感兴趣，可以学习 **ECharts** 或 **D3.js**
- 如果你想做游戏开发，可以尝试 **Phaser.js** 游戏引擎
- 如果你对 WebGL 感兴趣，可以学习 **Three.js** 或 **PixiJS**

祝你学习愉快！🎨
