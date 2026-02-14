# 图形与动画（Canvas / SVG / WebGL）
::: tip 🎯 核心问题
**如何在网页上画图、做动画、甚至开发游戏?** Canvas 提供了一个强大的 2D 绘图能力,让你用代码创造视觉内容。
:::

---

## 1. 为什么要学 Canvas?

### 1.1 Canvas 是什么?

**Canvas (画布)** 是 HTML5 提供的一个通过 JavaScript 绘制 2D 图形的元素。

你可以把它想象成一张**数字画布**:

- 🖌️ 你可以用代码"画笔"在上面作画
- 🎨 可以画任何东西: 简单的形状、复杂的图表、流畅的动画
- 🎮 甚至可以做成完整的游戏

::: tip 💡 Canvas vs SVG:有什么区别?

在 Web 开发中,绘制图形主要有两种方式:

| 特性     | Canvas               | SVG                   |
| -------- | -------------------- | --------------------- |
| **类型** | 位图(光栅图形)       | 矢量图形              |
| **DOM**  | 单个 `<canvas>` 元素 | 每个图形都是 DOM 元素 |
| **交互** | 需要手动计算碰撞     | 天然支持事件绑定      |
| **性能** | 适合大量对象         | 适合少量复杂对象      |
| **缩放** | 放大会失真           | 无限缩放不失真        |
| **应用** | 游戏、数据可视化     | 图标、插画            |

**简单总结**:

- **Canvas** = 像素画,画完就变成像素,性能好但交互麻烦
- **SVG** = 矢量图,每个图形都是对象,交互方便但对象多了会慢
  :::

### 1.2 Canvas 的应用场景

Canvas 的用途非常广泛,你可能每天都在用:

1. **数据可视化**: ECharts、Chart.js 的图表
2. **游戏开发**: 网页游戏(如 Phaser.js 引擎)
3. **图像处理**: 图片裁剪、滤镜、拼图(如 Fabric.js)
4. **创意效果**: 粒子特效、动画背景
5. **工程绘图**: CAD、流程图、思维导图

---

## 2. Canvas 基础

### 2.1 Canvas 元素和上下文

使用 Canvas 的第一步是在 HTML 中创建一个 `<canvas>` 元素:

```html
<canvas id="myCanvas" width="600" height="400"></canvas>
```

然后通过 JavaScript 获取**渲染上下文 (Rendering Context)**:

```javascript
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d') // 获取 2D 上下文
```

::: tip 💡 关键概念

- **canvas** 是 DOM 元素,控制画布的大小和位置
- **ctx** 是绘图工具,所有的绘制操作都通过它完成
- **`"2d"`** 表示使用 2D 渲染上下文(WebGL 使用 `"webgl"`)
  :::

### 2.2 坐标系统:Canvas 的"地图规则"

Canvas 使用的是**屏幕坐标系**,这与传统数学坐标系有所不同:

- **原点 (0, 0)**: 在**左上角**(不是中心)
- **X 轴**: 向右为正方向
- **Y 轴**: **向下**为正方向(注意: 数学坐标系中 Y 轴向上)
- **单位**: 像素 (px)

```javascript
// 在左上角绘制一个矩形
ctx.fillRect(0, 0, 10, 10)

// 在右下角绘制一个矩形
ctx.fillRect(canvas.width - 10, canvas.height - 10, 10, 10)
```

::: tip 💡 记忆技巧

想象你在看**屏幕**:

- 向右移 → X 增加 ✅
- 向下移(滚动页面) → Y 增加 ✅
- 向左移 → X 减少
- 向上移(向上滚动) → Y 减少

这就是 Canvas 的坐标规则。
:::

### 2.3 绘制基本形状

Canvas 提供了几种绘制基本形状的方法:

**矩形**:

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

**圆形**:

```javascript
ctx.beginPath()
ctx.arc(x, y, radius, startAngle, endAngle)
ctx.fill() // 或 ctx.stroke()
```

**参数说明**:

- **x, y**: 圆心坐标
- **radius**: 半径
- **startAngle, endAngle**: 起始和结束角度(弧度制)
  - `0` = 3 点钟方向
  - `Math.PI / 2` = 6 点钟方向
  - `Math.PI` = 9 点钟方向

**线条**:

```javascript
ctx.beginPath()
ctx.moveTo(x1, y1) // 起点
ctx.lineTo(x2, y2) // 终点
ctx.stroke()
```

### 2.4 颜色和样式

Canvas 支持多种颜色设置方式:

```javascript
// 纯色
ctx.fillStyle = '#3498db' // 十六进制
ctx.fillStyle = 'rgb(52, 152, 219)' // RGB
ctx.fillStyle = 'rgba(52, 152, 219, 0.5)' // RGBA(带透明度)

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

## 3. 路径:Canvas 的"笔画"

### 3.1 什么是路径?

**路径 (Path)** 是 Canvas 中的核心概念。你可以把它想象成用笔画线的过程:

1. **`beginPath()`** - 开始新路径(拿起笔)
2. **`moveTo()`** - 移动到起点(不画线)
3. **`lineTo()` / `arc()`** - 绘制线条或曲线
4. **`closePath()`** - 闭合路径(可选)
5. **`fill()` / `stroke()`** - 填充或描边

```javascript
ctx.beginPath()
ctx.moveTo(100, 100) // 移动到起点
ctx.lineTo(200, 100) // 画横线
ctx.lineTo(150, 150) // 画斜线
ctx.closePath() // 闭合路径(回到起点)
ctx.fill() // 填充
```

### 3.2 绘制复杂形状

通过组合路径,可以绘制任意复杂的形状。

**三角形**:

```javascript
ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(150, 150)
ctx.lineTo(50, 150)
ctx.closePath()
ctx.fillStyle = '#e74c3c'
ctx.fill()
```

---

## 4. 动画基础

### 4.1 动画循环

在 Canvas 中创建动画,核心是使用 **`requestAnimationFrame`** 方法。

```javascript
function animate() {
  // 1. 清除画布(或绘制半透明背景产生拖尾效果)
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

::: tip 💡 为什么用 requestAnimationFrame 而不是 setInterval?

- ✅ 自动优化,通常为 60FPS(每秒 60 帧)
- ✅ 页面不可见时自动暂停,节省资源
- ✅ 与浏览器刷新周期同步,避免画面撕裂
  :::

### 4.2 动画的本质

动画的本质是**快速连续绘制静态画面**。每帧需要:

1. **清除旧画面**: `ctx.clearRect()` 或用半透明背景覆盖
2. **更新状态**: 计算新位置、新角度等
3. **绘制新画面**: 重新绘制所有对象

```javascript
// 清除画布
ctx.clearRect(0, 0, canvas.width, canvas.height)

// 半透明背景(产生拖尾效果)
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
ctx.fillRect(0, 0, canvas.width, canvas.height)
```

---

## 5. 事件处理

Canvas 只是一个 DOM 元素,不像 SVG 那样每个图形都是独立的 DOM 元素。因此,我们需要**手动处理交互事件**。

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

---

## 6. 性能优化

随着绘制的对象增多,Canvas 性能会下降。以下是一些常用的优化技巧:

### 6.1 离屏 Canvas (Offscreen Canvas)

预渲染静态内容到离屏 Canvas,减少每帧的绘制操作:

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

### 6.2 减少重绘(脏矩形优化)

只重绘变化的部分:

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

### 6.3 批量渲染

减少状态切换(fillStyle、strokeStyle 等):

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

---

## 7. 常见库与框架

虽然原生 Canvas 已经很强大,但在实际项目中,使用成熟的库可以大大提高开发效率。

### 7.1 Fabric.js

**特点**: 对象模型,支持交互

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

**适用场景**: 图片编辑器、白板工具、图形设计工具

### 7.2 PixiJS (WebGL)

**特点**: WebGL 加速,超高性能

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

**适用场景**: 大型游戏、粒子系统、大量对象的场景

---

## 8. 总结与最佳实践

### 8.1 核心要点回顾

1. **Canvas 是位图画布**: 绘制后就是像素,无法直接修改已有内容
2. **坐标系统**: 原点在左上角,Y 轴向下为正
3. **路径系统**: beginPath → moveTo → lineTo → fill/stroke
4. **动画原理**: 清除 → 更新 → 绘制 → requestAnimationFrame
5. **事件处理**: 需要手动计算碰撞
6. **性能优化**: 离屏 Canvas、脏矩形、批量渲染

### 8.2 最佳实践

**代码组织**:

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

**性能优化清单**:

- ✅ 使用 `requestAnimationFrame` 而不是 `setInterval`
- ✅ 减少状态切换(按颜色分组绘制)
- ✅ 使用离屏 Canvas 预渲染静态内容
- ✅ 只重绘变化的部分(脏矩形)
- ✅ 限制对象数量,使用对象池
- ✅ 避免 `save()` 和 `restore()` 的频繁调用

---

## 9. 名词速查表 (Glossary)

| 名词                      | 解释                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| **Context / 上下文**      | Canvas 的渲染环境,通过 `getContext("2d")` 获取,所有绘制操作都通过它完成 |
| **Path / 路径**           | 由一系列点连接成的轨迹,是 Canvas 绘图的基础                             |
| **Stroke / 描边**         | 绘制路径的轮廓线                                                        |
| **Fill / 填充**           | 用颜色填充路径内部                                                      |
| **requestAnimationFrame** | 浏览器提供的动画 API,在每次重绘前调用回调函数                           |
| **Offscreen Canvas**      | 离屏 Canvas,用于预渲染静态内容以提高性能                                |
| **Dirty Rect**            | 脏矩形优化,只重绘变化的部分                                             |
| **Collision Detection**   | 碰撞检测,判断鼠标或对象是否点击了某个图形                               |
| **Raster vs Vector**      | 位图 vs 矢量图,Canvas 是位图,SVG 是矢量图                               |

---

## 总结

现在你已经掌握了 Canvas 2D 的核心概念:

- **基本绘图**: 矩形、圆形、线条
- **样式控制**: 颜色、渐变、阴影
- **动画制作**: requestAnimationFrame + 清除重绘
- **交互处理**: 鼠标事件、碰撞检测
- **性能优化**: 离屏 Canvas、批量渲染

**下一步建议**:

- 如果你想深入学习动画,可以尝试制作一个**贪吃蛇游戏**或**打砖块游戏**
- 如果你对数据可视化感兴趣,可以学习 **ECharts** 或 **D3.js**
- 如果你想做游戏开发,可以尝试 **Phaser.js** 游戏引擎
- 如果你对 WebGL 感兴趣,可以学习 **Three.js** 或 **PixiJS**

祝你学习愉快! 🎨
