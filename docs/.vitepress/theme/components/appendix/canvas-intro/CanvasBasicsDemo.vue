<!--
  CanvasBasicsDemo.vue
  Canvas 基础演示组件

  用途：
  展示 Canvas 2D 的基本绘图能力，包括矩形、圆形、线条和文字的绘制

  交互功能：
  - 形状选择：选择不同的基本形状
  - 颜色调整：自定义填充和描边颜色
  - 参数调整：控制大小、位置等参数
  - 实时绘制：即时在 Canvas 上显示效果
-->
<template>
  <div class="canvas-basics-demo">
    <div class="demo-header">
      <span class="icon">🎨</span>
      <span class="title">Canvas 基础</span>
      <span class="subtitle">用代码画图（通俗说：编程画板）</span>
    </div>

    <div class="demo-content">
      <div class="controls">
        <div class="shape-selector">
          <label>Shape / 形状</label>
          <div class="button-group">
            <button
              v-for="shape in shapes"
              :key="shape.value"
              :class="{ active: currentShape === shape.value }"
              @click="currentShape = shape.value"
            >
              {{ shape.label }}
            </button>
          </div>
        </div>

        <div class="parameters">
          <div class="param-row">
            <label>Fill Color / 填充颜色</label>
            <input
              v-model="fillColor"
              type="color"
            >
          </div>

          <div class="param-row">
            <label>Stroke Color / 描边颜色</label>
            <input
              v-model="strokeColor"
              type="color"
            >
          </div>

          <div class="param-row">
            <label>Stroke Width / 描边宽度: {{ strokeWidth }}px</label>
            <input
              v-model.number="strokeWidth"
              type="range"
              min="1"
              max="20"
            >
          </div>

          <div
            v-if="currentShape === 'rect'"
            class="param-row"
          >
            <label>Size / 大小: {{ rectSize }}px</label>
            <input
              v-model.number="rectSize"
              type="range"
              min="20"
              max="200"
            >
          </div>

          <div
            v-if="currentShape === 'circle'"
            class="param-row"
          >
            <label>Radius / 半径: {{ circleRadius }}px</label>
            <input
              v-model.number="circleRadius"
              type="range"
              min="10"
              max="150"
            >
          </div>

          <div
            v-if="currentShape === 'line'"
            class="param-row"
          >
            <label>Line Length / 线条长度: {{ lineLength }}px</label>
            <input
              v-model.number="lineLength"
              type="range"
              min="50"
              max="300"
            >
          </div>
        </div>

        <button
          class="draw-btn"
          @click="draw"
        >
          <span class="icon">🎨</span>
          Draw / 绘制
        </button>

        <button
          class="clear-btn"
          @click="clearCanvas"
        >
          <span class="icon">🗑️</span>
          Clear / 清除
        </button>
      </div>

      <div class="canvas-container">
        <canvas
          ref="canvasRef"
          width="600"
          height="400"
        />
      </div>

      <div class="code-display">
        <h4>Code / 代码</h4>
        <pre><code>{{ currentCode }}</code></pre>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>Canvas 是一个位图画布，所有绘制都是像素操作。绘制后无法修改已有内容，只能覆盖或清除重绘。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const canvasRef = ref(null)
const currentShape = ref('rect')
const fillColor = ref('#3b82f6')
const strokeColor = ref('#1e293b')
const strokeWidth = ref(2)
const rectSize = ref(100)
const circleRadius = ref(50)
const lineLength = ref(150)

const shapes = [
  { value: 'rect', label: 'Rectangle / 矩形' },
  { value: 'circle', label: 'Circle / 圆形' },
  { value: 'line', label: 'Line / 线条' }
]

const currentCode = computed(() => {
  const codeTemplates = {
    rect: `const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '${fillColor.value}'
ctx.strokeStyle = '${strokeColor.value}'
ctx.lineWidth = ${strokeWidth.value}

// 绘制填充矩形
ctx.fillRect(${300 - rectSize.value / 2}, ${200 - rectSize.value / 2}, ${rectSize.value}, ${rectSize.value})

// 绘制描边矩形
ctx.strokeRect(${300 - rectSize.value / 2}, ${200 - rectSize.value / 2}, ${rectSize.value}, ${rectSize.value})`,

    circle: `const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '${fillColor.value}'
ctx.strokeStyle = '${strokeColor.value}'
ctx.lineWidth = ${strokeWidth.value}

ctx.beginPath()
ctx.arc(300, 200, ${circleRadius.value}, 0, Math.PI * 2)
ctx.fill()
ctx.stroke()`,

    line: `const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.strokeStyle = '${strokeColor.value}'
ctx.lineWidth = ${strokeWidth.value}

ctx.beginPath()
ctx.moveTo(${300 - lineLength.value / 2}, 200)
ctx.lineTo(${300 + lineLength.value / 2}, 200)
ctx.stroke()`
  }

  return codeTemplates[currentShape.value]
})

const clearCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 设置样式
  ctx.fillStyle = fillColor.value
  ctx.strokeStyle = strokeColor.value
  ctx.lineWidth = strokeWidth.value

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  // 根据选择的形状绘制
  switch (currentShape.value) {
    case 'rect':
      ctx.fillRect(
        centerX - rectSize.value / 2,
        centerY - rectSize.value / 2,
        rectSize.value,
        rectSize.value
      )
      ctx.strokeRect(
        centerX - rectSize.value / 2,
        centerY - rectSize.value / 2,
        rectSize.value,
        rectSize.value
      )
      break

    case 'circle':
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius.value, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      break

    case 'line':
      ctx.beginPath()
      ctx.moveTo(centerX - lineLength.value / 2, centerY)
      ctx.lineTo(centerX + lineLength.value / 2, centerY)
      ctx.stroke()
      break
  }
}

// 监听参数变化，自动重绘
watch(
  [fillColor, strokeColor, strokeWidth, rectSize, circleRadius, lineLength],
  () => {
    draw()
  }
)

watch(currentShape, () => {
  draw()
})

onMounted(() => {
  draw()
})
</script>

<style scoped>
.canvas-basics-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  margin-left: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 20px;
  font-weight: 500;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.controls {
  margin-bottom: 1rem;
}

.shape-selector {
  margin-bottom: 1.25rem;
}

.shape-selector label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.625rem;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.button-group {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.button-group button {
  padding: 0.625rem 1.25rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.25s ease;
}

.button-group button:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.button-group button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.parameters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.param-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.param-row label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.param-row input[type='range'] {
  width: 100%;
  accent-color: var(--vp-c-brand);
}

.param-row input[type='color'] {
  width: 100%;
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
}

.draw-btn,
.clear-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.draw-btn {
  background: var(--vp-c-brand);
  color: white;
}

.draw-btn:hover {
  opacity: 0.9;
}

.clear-btn {
  background: var(--vp-c-danger);
  color: white;
}

.clear-btn:hover {
  opacity: 0.9;
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
  background: #ffffff;
  max-width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  font-size: 0.875rem;
  color: #92400e;
  border-left: 4px solid #f59e0b;
  display: flex;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
}

.info-box p {
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  line-height: 1.6;
}

.info-box .icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}

.info-box strong {
  color: #78350f;
}
</style>
