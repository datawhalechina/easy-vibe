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
    <div class="control-panel">
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
          <input type="color" v-model="fillColor" />
        </div>

        <div class="param-row">
          <label>Stroke Color / 描边颜色</label>
          <input type="color" v-model="strokeColor" />
        </div>

        <div class="param-row">
          <label>Stroke Width / 描边宽度: {{ strokeWidth }}px</label>
          <input type="range" v-model.number="strokeWidth" min="1" max="20" />
        </div>

        <div class="param-row" v-if="currentShape === 'rect'">
          <label>Size / 大小: {{ rectSize }}px</label>
          <input type="range" v-model.number="rectSize" min="20" max="200" />
        </div>

        <div class="param-row" v-if="currentShape === 'circle'">
          <label>Radius / 半径: {{ circleRadius }}px</label>
          <input
            type="range"
            v-model.number="circleRadius"
            min="10"
            max="150"
          />
        </div>

        <div class="param-row" v-if="currentShape === 'line'">
          <label>Line Length / 线条长度: {{ lineLength }}px</label>
          <input type="range" v-model.number="lineLength" min="50" max="300" />
        </div>
      </div>

      <button class="draw-btn" @click="draw">
        <span class="icon">🎨</span>
        Draw / 绘制
      </button>

      <button class="clear-btn" @click="clearCanvas">
        <span class="icon">🗑️</span>
        Clear / 清除
      </button>
    </div>

    <div class="canvas-container">
      <canvas ref="canvasRef" width="600" height="400"></canvas>
    </div>

    <div class="code-display">
      <h4>Code / 代码</h4>
      <pre><code>{{ currentCode }}</code></pre>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>提示：</strong>
        Canvas
        是一个位图画布，所有绘制都是像素操作。绘制后无法修改已有内容，只能覆盖或清除重绘。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const canvasRef = ref(null)
const currentShape = ref('rect')
const fillColor = ref('#3498db')
const strokeColor = ref('#2c3e50')
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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fafafa;
}

.control-panel {
  margin-bottom: 20px;
}

.shape-selector {
  margin-bottom: 15px;
}

.shape-selector label {
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

.parameters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 15px;
}

.param-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.param-row label {
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.param-row input[type='range'] {
  width: 100%;
}

.param-row input[type='color'] {
  width: 100%;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.draw-btn,
.clear-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.2s;
}

.draw-btn {
  background: #3498db;
  color: white;
}

.draw-btn:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.clear-btn {
  background: #e74c3c;
  color: white;
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
  background: white;
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

.info-box {
  margin-top: 15px;
  padding: 12px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

.info-box p {
  margin: 0;
  font-size: 14px;
  color: #856404;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.info-box .icon {
  font-size: 16px;
  flex-shrink: 0;
}
</style>
