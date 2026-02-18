<!--
  CoordinateSystemDemo.vue
  Canvas 坐标系统演示组件

  用途：
  展示 Canvas 的坐标系统，包括原点位置、坐标方向、网格绘制等

  交互功能：
  - 网格显示：开关网格线和坐标轴
  - 点位置拖拽：拖动点查看坐标变化
  - 坐标显示：实时显示鼠标位置和选中点坐标
-->
<template>
  <div class="coordinate-demo">
    <div class="control-panel">
      <div class="toggle-group">
        <label class="toggle-option">
          <input
            v-model="showGrid"
            type="checkbox"
          >
          <span>Show Grid / 显示网格</span>
        </label>

        <label class="toggle-option">
          <input
            v-model="showAxis"
            type="checkbox"
          >
          <span>Show Axis / 显示坐标轴</span>
        </label>

        <label class="toggle-option">
          <input
            v-model="showCoordinates"
            type="checkbox"
          >
          <span>Show Coordinates / 显示坐标</span>
        </label>
      </div>

      <div class="info-display">
        <div class="info-item">
          <span class="label">Canvas Width:</span>
          <span class="value">600px</span>
        </div>
        <div class="info-item">
          <span class="label">Canvas Height:</span>
          <span class="value">400px</span>
        </div>
        <div class="info-item">
          <span class="label">Mouse Position:</span>
          <span class="value">({{ mouseX }}, {{ mouseY }})</span>
        </div>
        <div
          v-if="selectedPoint"
          class="info-item"
        >
          <span class="label">Selected Point:</span>
          <span class="value">({{ selectedPoint.x }}, {{ selectedPoint.y }})</span>
        </div>
      </div>
    </div>

    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        width="600"
        height="400"
        @mousemove="handleMouseMove"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
      />
    </div>

    <div class="explanation">
      <h4>Canvas Coordinate System / Canvas 坐标系统</h4>
      <ul>
        <li><strong>Origin / 原点：</strong>在左上角，坐标为 (0, 0)</li>
        <li>
          <strong>X Axis / X 轴：</strong>向右为正方向，从 0 到 canvas.width
        </li>
        <li>
          <strong>Y Axis / Y 轴：</strong>向下为正方向，从 0 到 canvas.height
        </li>
        <li><strong>Unit / 单位：</strong>像素 (px)，与 CSS 像素 1:1 对应</li>
      </ul>
    </div>

    <div class="code-display">
      <h4>Example Code / 示例代码</h4>
      <pre><code>// 绘制坐标轴
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// X 轴（红色）
ctx.strokeStyle = '#e74c3c'
ctx.lineWidth = 2
ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(canvas.width, 0)
ctx.stroke()

// Y 轴（蓝色）
ctx.strokeStyle = '#3498db'
ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(0, canvas.height)
ctx.stroke()

// 绘制点
ctx.fillStyle = '#2ecc71'
ctx.beginPath()
ctx.arc({{ Math.round(selectedPoint?.x || 100) }}, {{ Math.round(selectedPoint?.y || 100) }}, 5, 0, Math.PI * 2)
ctx.fill()</code></pre>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>提示：</strong>
        Canvas 的 Y
        轴方向与传统数学坐标系相反，向下为正。这在处理图形定位时需要特别注意。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const canvasRef = ref(null)
const showGrid = ref(true)
const showAxis = ref(true)
const showCoordinates = ref(true)
const mouseX = ref(0)
const mouseY = ref(0)
const selectedPoint = ref(null)
const isDragging = ref(false)

const points = [
  { x: 100, y: 100 },
  { x: 300, y: 200 },
  { x: 500, y: 100 }
]

const drawGrid = (ctx) => {
  if (!showGrid.value) return

  ctx.strokeStyle = '#f0f0f0'
  ctx.lineWidth = 1

  // 垂直线
  for (let x = 0; x <= 600; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 400)
    ctx.stroke()
  }

  // 水平线
  for (let y = 0; y <= 400; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(600, y)
    ctx.stroke()
  }
}

const drawAxis = (ctx) => {
  if (!showAxis.value) return

  ctx.lineWidth = 2

  // X 轴
  ctx.strokeStyle = '#e74c3c'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(600, 0)
  ctx.stroke()

  // Y 轴
  ctx.strokeStyle = '#3498db'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, 400)
  ctx.stroke()

  // 原点标记
  ctx.fillStyle = '#2c3e50'
  ctx.font = '12px Arial'
  ctx.fillText('(0,0)', 5, 15)
}

const drawPoints = (ctx) => {
  points.forEach((point, index) => {
    // 绘制点
    ctx.fillStyle =
      index === 0 ? '#e74c3c' : index === 1 ? '#3498db' : '#2ecc71'
    ctx.beginPath()
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
    ctx.fill()

    // 绘制坐标
    if (showCoordinates.value) {
      ctx.fillStyle = '#2c3e50'
      ctx.font = '12px Arial'
      ctx.fillText(
        `(${Math.round(point.x)}, ${Math.round(point.y)})`,
        point.x + 12,
        point.y - 12
      )
    }
  })
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

  // 绘制各层
  drawGrid(ctx)
  drawAxis(ctx)
  drawPoints(ctx)
}

const handleMouseMove = (e) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  mouseX.value = Math.round(e.clientX - rect.left)
  mouseY.value = Math.round(e.clientY - rect.top)

  // 拖拽逻辑
  if (isDragging.value && selectedPoint.value) {
    selectedPoint.value.x = mouseX.value
    selectedPoint.value.y = mouseY.value
    draw()
  }
}

const handleMouseDown = (e) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // 检查是否点击了某个点
  points.forEach((point) => {
    const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2)
    if (distance < 15) {
      selectedPoint.value = point
      isDragging.value = true
    }
  })
}

const handleMouseUp = () => {
  isDragging.value = false
}

watch([showGrid, showAxis, showCoordinates], () => {
  draw()
})

onMounted(() => {
  draw()
})
</script>

<style scoped>
.coordinate-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.control-panel {
  margin-bottom: 1.5rem;
}

.toggle-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.toggle-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s;
}

.toggle-option:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.toggle-option input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--vp-c-brand);
}

.info-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.info-item .label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.info-item .value {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
}

.canvas-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border: 2px solid var(--vp-c-divider);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

canvas {
  border: 3px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: crosshair;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.explanation {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.explanation h4 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 600;
}

.explanation ul {
  margin: 0;
  padding-left: 1.25rem;
}

.explanation li {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
}

.code-display {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: #1e293b;
  border-radius: 12px;
  overflow-x: auto;
  border: 2px solid #334155;
}

.code-display h4 {
  color: #f8fafc;
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  color: #e2e8f0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.7;
}

.info-box {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
}

.info-box p {
  margin: 0;
  font-size: 0.875rem;
  color: #92400e;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.6;
}

.info-box .icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}
</style>
