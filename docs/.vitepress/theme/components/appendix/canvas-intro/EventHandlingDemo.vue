<!--
  EventHandlingDemo.vue
  Canvas 事件处理演示组件

  用途：
  展示 Canvas 中的鼠标、键盘事件处理，包括点击、拖拽、悬停等交互

  交互功能：
  - 鼠标点击：在点击位置创建对象
  - 拖拽：拖动对象移动
  - 悬停：高亮显示鼠标下的对象
  - 键盘控制：使用键盘控制对象
-->
<template>
  <div class="event-demo">
    <div class="control-panel">
      <div class="mode-selector">
        <label>Interaction Mode / 交互模式</label>
        <div class="button-group">
          <button
            v-for="mode in modes"
            :key="mode.value"
            :class="{ active: currentMode === mode.value }"
            @click="currentMode = mode.value"
          >
            {{ mode.label }}
          </button>
        </div>
      </div>

      <div class="instructions">
        <h4>Instructions / 操作说明</h4>
        <ul>
          <li v-if="currentMode === 'click'">
            <strong>Click Mode：</strong>点击画布创建圆形，按住 Shift
            可创建不同颜色
          </li>
          <li v-if="currentMode === 'drag'">
            <strong>Drag Mode：</strong>拖拽圆形移动位置，拖拽时会改变颜色
          </li>
          <li v-if="currentMode === 'hover'">
            <strong>Hover Mode：</strong>鼠标悬停在圆形上会高亮显示并显示坐标
          </li>
          <li v-if="currentMode === 'keyboard'">
            <strong>Keyboard Mode：</strong>使用方向键移动选中的圆形，Delete
            键删除
          </li>
        </ul>
      </div>

      <div class="event-log">
        <h4>Event Log / 事件日志</h4>
        <div class="log-container">
          <div
            v-for="(log, index) in eventLogs"
            :key="index"
            class="log-entry"
            :class="log.type"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
      </div>

      <button class="clear-btn" @click="clearAll">
        <span class="icon">🗑️</span>
        Clear All / 清除全部
      </button>
    </div>

    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        width="600"
        height="400"
        @click="handleClick"
        @mousemove="handleMouseMove"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseLeave"
        tabindex="0"
        @keydown="handleKeyDown"
      ></canvas>
    </div>

    <div class="code-display">
      <h4>Event Handling Code / 事件处理代码</h4>
      <pre><code>{{ currentCode }}</code></pre>
    </div>

    <div class="explanation">
      <h4>Event Handling Tips / 事件处理要点</h4>
      <ul>
        <li>
          <strong>坐标转换：</strong>
          使用 getBoundingClientRect() 获取 Canvas 在页面中的位置，计算相对坐标
        </li>
        <li>
          <strong>碰撞检测：</strong>
          对于圆形，计算鼠标位置到圆心的距离；对于矩形，判断点是否在范围内
        </li>
        <li>
          <strong>事件委托：</strong>
          Canvas 只有一个元素，需要手动判断事件发生在哪个对象上
        </li>
        <li>
          <strong>性能优化：</strong>
          使用 requestAnimationFrame 优化重绘，避免频繁操作
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const currentMode = ref('click')
const circles = ref([])
const selectedCircle = ref(null)
const hoveredCircle = ref(null)
const isDragging = ref(false)
const eventLogs = ref([])

const modes = [
  { value: 'click', label: 'Click / 点击' },
  { value: 'drag', label: 'Drag / 拖拽' },
  { value: 'hover', label: 'Hover / 悬停' },
  { value: 'keyboard', label: 'Keyboard / 键盘' }
]

const colors = [
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c'
]

const currentCode = computed(() => {
  const templates = {
    click: `// 点击创建圆形
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const circle = {
    x: x,
    y: y,
    radius: 30,
    color: '#3498db'
  }

  circles.push(circle)
  draw()
})`,

    drag: `// 拖拽移动圆形
let isDragging = false
let selectedCircle = null

canvas.addEventListener('mousedown', (e) => {
  const { x, y } = getMousePos(e)

  // 检测点击了哪个圆形
  circles.forEach(circle => {
    const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2)
    if (dist < circle.radius) {
      isDragging = true
      selectedCircle = circle
    }
  })
})

canvas.addEventListener('mousemove', (e) => {
  if (isDragging && selectedCircle) {
    const { x, y } = getMousePos(e)
    selectedCircle.x = x
    selectedCircle.y = y
    draw()
  }
})

canvas.addEventListener('mouseup', () => {
  isDragging = false
  selectedCircle = null
})`,

    hover: `// 悬停高亮
canvas.addEventListener('mousemove', (e) => {
  const { x, y } = getMousePos(e)
  let hovered = null

  // 检测悬停
  circles.forEach(circle => {
    const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2)
    if (dist < circle.radius) {
      hovered = circle
    }
  })

  if (hovered) {
    canvas.style.cursor = 'pointer'
    // 绘制高亮效果
    ctx.strokeStyle = '#e74c3c'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(hovered.x, hovered.y, hovered.radius + 5, 0, Math.PI * 2)
    ctx.stroke()
  } else {
    canvas.style.cursor = 'default'
  }

  draw()
})`,

    keyboard: `// 键盘控制
canvas.tabIndex = 0  // 使 canvas 可以获取焦点
canvas.focus()

canvas.addEventListener('keydown', (e) => {
  const step = 10

  switch(e.key) {
    case 'ArrowUp':
      selectedCircle.y -= step
      break
    case 'ArrowDown':
      selectedCircle.y += step
      break
    case 'ArrowLeft':
      selectedCircle.x -= step
      break
    case 'ArrowRight':
      selectedCircle.x += step
      break
    case 'Delete':
      circles = circles.filter(c => c !== selectedCircle)
      selectedCircle = null
      break
  }

  draw()
})`
  }

  return templates[currentMode.value]
})

const addLog = (message, type = 'info') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  eventLogs.value.unshift({ time, message, type })
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop()
  }
}

const getMousePos = (e) => {
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制背景
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制所有圆形
  circles.value.forEach((circle) => {
    // 填充
    ctx.fillStyle = circle.color
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
    ctx.fill()

    // 描边
    ctx.strokeStyle = '#2c3e50'
    ctx.lineWidth = 2
    ctx.stroke()

    // 高光
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.beginPath()
    ctx.arc(
      circle.x - circle.radius * 0.3,
      circle.y - circle.radius * 0.3,
      circle.radius * 0.4,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // 选中状态
    if (circle === selectedCircle.value) {
      ctx.strokeStyle = '#e74c3c'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(circle.x, circle.y, circle.radius + 5, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 悬停状态
    if (circle === hoveredCircle.value && currentMode.value === 'hover') {
      ctx.fillStyle = 'rgba(231, 76, 60, 0.2)'
      ctx.beginPath()
      ctx.arc(circle.x, circle.y, circle.radius + 10, 0, Math.PI * 2)
      ctx.fill()

      // 显示坐标
      ctx.fillStyle = '#2c3e50'
      ctx.font = '12px Arial'
      ctx.fillText(
        `(${Math.round(circle.x)}, ${Math.round(circle.y)})`,
        circle.x + circle.radius + 10,
        circle.y
      )
    }
  })
}

const handleClick = (e) => {
  if (currentMode.value !== 'click') return

  const { x, y } = getMousePos(e)
  const color = e.shiftKey
    ? colors[Math.floor(Math.random() * colors.length)]
    : '#3498db'

  circles.value.push({
    x,
    y,
    radius: 30,
    color
  })

  addLog(`Created circle at (${Math.round(x)}, ${Math.round(y)})`, 'success')
  draw()
}

const handleMouseMove = (e) => {
  const { x, y } = getMousePos(e)

  if (
    currentMode.value === 'drag' &&
    isDragging.value &&
    selectedCircle.value
  ) {
    selectedCircle.value.x = x
    selectedCircle.value.y = y
    draw()
    return
  }

  if (currentMode.value === 'hover') {
    let found = null
    circles.value.forEach((circle) => {
      const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2)
      if (dist < circle.radius) {
        found = circle
      }
    })

    if (found !== hoveredCircle.value) {
      hoveredCircle.value = found
      if (found) {
        addLog(
          `Hovering circle at (${Math.round(found.x)}, ${Math.round(found.y)})`,
          'info'
        )
      }
    }
    draw()
  }
}

const handleMouseDown = (e) => {
  if (currentMode.value !== 'drag') return

  const { x, y } = getMousePos(e)

  circles.value.forEach((circle) => {
    const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2)
    if (dist < circle.radius) {
      isDragging.value = true
      selectedCircle.value = circle
      addLog(
        `Started dragging circle at (${Math.round(x)}, ${Math.round(y)})`,
        'info'
      )
    }
  })
}

const handleMouseUp = () => {
  if (isDragging.value) {
    addLog(
      `Dropped circle at (${Math.round(selectedCircle.value.x)}, ${Math.round(selectedCircle.value.y)})`,
      'success'
    )
  }
  isDragging.value = false
  selectedCircle.value = null
}

const handleMouseLeave = () => {
  isDragging.value = false
  selectedCircle.value = null
  hoveredCircle.value = null
  draw()
}

const handleKeyDown = (e) => {
  if (currentMode.value !== 'keyboard') return

  if (!selectedCircle.value && circles.value.length > 0) {
    selectedCircle.value = circles.value[0]
  }

  if (!selectedCircle.value) return

  const step = 10
  let moved = false

  switch (e.key) {
    case 'ArrowUp':
      selectedCircle.value.y -= step
      moved = true
      break
    case 'ArrowDown':
      selectedCircle.value.y += step
      moved = true
      break
    case 'ArrowLeft':
      selectedCircle.value.x -= step
      moved = true
      break
    case 'ArrowRight':
      selectedCircle.value.x += step
      moved = true
      break
    case 'Delete':
    case 'Backspace':
      circles.value = circles.value.filter((c) => c !== selectedCircle.value)
      addLog('Deleted circle', 'warning')
      selectedCircle.value = circles.value[0] || null
      moved = true
      break
  }

  if (moved) {
    e.preventDefault()
    draw()
  }
}

const clearAll = () => {
  circles.value = []
  selectedCircle.value = null
  hoveredCircle.value = null
  addLog('Cleared all circles', 'warning')
  draw()
}

onMounted(() => {
  // 初始化几个圆形
  circles.value = [
    { x: 150, y: 200, radius: 30, color: '#e74c3c' },
    { x: 300, y: 200, radius: 30, color: '#3498db' },
    { x: 450, y: 200, radius: 30, color: '#2ecc71' }
  ]
  draw()
})
</script>

<style scoped>
.event-demo {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fafafa;
}

.control-panel {
  margin-bottom: 20px;
}

.mode-selector {
  margin-bottom: 15px;
}

.mode-selector label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.button-group button {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.button-group button:hover {
  border-color: #3498db;
  background: #f0f8ff;
}

.button-group button.active {
  border-color: #3498db;
  background: #3498db;
  color: white;
}

.instructions {
  margin-bottom: 15px;
  padding: 12px;
  background: white;
  border-radius: 6px;
}

.instructions h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 14px;
}

.instructions ul {
  margin: 0;
  padding-left: 20px;
}

.instructions li {
  margin-bottom: 6px;
  color: #555;
  font-size: 13px;
}

.event-log {
  margin-bottom: 15px;
}

.event-log h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 14px;
}

.log-container {
  max-height: 150px;
  overflow-y: auto;
  background: white;
  border-radius: 6px;
  padding: 10px;
}

.log-entry {
  display: flex;
  gap: 10px;
  padding: 6px 8px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: #95a5a6;
  font-family: 'Courier New', monospace;
  flex-shrink: 0;
}

.log-message {
  color: #2c3e50;
}

.log-entry.info .log-message {
  color: #3498db;
}

.log-entry.success .log-message {
  color: #2ecc71;
}

.log-entry.warning .log-message {
  color: #f39c12;
}

.clear-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #e74c3c;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #c0392b;
  transform: translateY(-1px);
}

.canvas-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

canvas {
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: crosshair;
  outline: none;
}

canvas:focus {
  border-color: #3498db;
}

.code-display {
  margin-top: 20px;
  padding: 15px;
  background: #2c3e50;
  border-radius: 6px;
  overflow-x: auto;
}

.code-display h4 {
  color: #ecf0f1;
  margin: 0 0 10px 0;
  font-size: 14px;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  color: #ecf0f1;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
}

.explanation {
  margin: 20px 0;
  padding: 15px;
  background: white;
  border-radius: 6px;
}

.explanation h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.explanation ul {
  margin: 0;
  padding-left: 20px;
}

.explanation li {
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
}
</style>
