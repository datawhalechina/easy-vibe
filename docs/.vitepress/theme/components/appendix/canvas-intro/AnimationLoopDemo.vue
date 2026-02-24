<!--
  AnimationLoopDemo.vue
  Canvas 动画循环演示组件

  用途：
  展示 Canvas 动画的基本原理，包括 requestAnimationFrame、清除重绘、动画循环

  交互功能：
  - 播放控制：播放/暂停动画
  - 速度调整：控制动画速度
  - 显示帧率：实时显示 FPS
  - 多种动画：不同的动画效果示例
-->
<template>
  <div class="animation-demo">
    <div class="control-panel">
      <div class="playback-controls">
        <button
          class="play-btn"
          @click="togglePlay"
        >
          <span class="icon">{{ isPlaying ? '⏸️' : '▶️' }}</span>
          {{ isPlaying ? 'Pause' : 'Play' }}
        </button>

        <button
          class="reset-btn"
          @click="resetAnimation"
        >
          <span class="icon">🔄</span>
          Reset / 重置
        </button>
      </div>

      <div class="animation-selector">
        <label>Animation / 动画类型</label>
        <select v-model="animationType">
          <option value="bounce">
            Bouncing Ball / 弹跳球
          </option>
          <option value="rotate">
            Rotating Square / 旋转方块
          </option>
          <option value="wave">
            Wave / 波浪
          </option>
        </select>
      </div>

      <div class="parameters">
        <div class="param-row">
          <label>Speed / 速度: {{ speed }}x</label>
          <input
            v-model.number="speed"
            type="range"
            min="0.1"
            max="3"
            step="0.1"
          >
        </div>

        <div class="param-row">
          <label>Object Count / 对象数量: {{ objectCount }}</label>
          <input
            v-model.number="objectCount"
            type="range"
            min="1"
            max="10"
          >
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="label">FPS:</span>
          <span class="value">{{ fps }}</span>
        </div>
        <div class="stat-item">
          <span class="label">Frame:</span>
          <span class="value">{{ frame }}</span>
        </div>
      </div>
    </div>

    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        width="600"
        height="400"
      />
    </div>

    

    

    
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const isPlaying = ref(false)
const animationType = ref('bounce')
const speed = ref(1)
const objectCount = ref(3)
const fps = ref(0)
const frame = ref(0)

let animationId = null
let lastTime = 0
let frameCount = 0
let fpsTime = 0

// 动画对象状态
const balls = ref([])
const angle = ref(0)

const animationCode = computed(() => {
  const templates = {
    bounce: `// 弹跳球动画
let balls = [
  { x: 100, y: 100, vx: 2, vy: 3, radius: 20 },
  // ... 更多球
]

function animate(timestamp) {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制每个球
  balls.forEach(ball => {
    // 更新位置
    ball.x += ball.vx * ${speed.value}
    ball.y += ball.vy * ${speed.value}

    // 边界碰撞检测
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.vx = -ball.vx
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.vy = -ball.vy
    }

    // 绘制
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fill()
  })

  // 请求下一帧
  requestAnimationFrame(animate)
}

// 启动动画
requestAnimationFrame(animate)`,

    rotate: `// 旋转方块动画
let angle = 0

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新角度
  angle += 0.02 * ${speed.value}

  // 保存当前状态
  ctx.save()

  // 移动到中心点
  ctx.translate(canvas.width / 2, canvas.height / 2)

  // 旋转
  ctx.rotate(angle)

  // 绘制方块
  ctx.fillStyle = '#3498db'
  ctx.fillRect(-50, -50, 100, 100)

  // 恢复状态
  ctx.restore()

  requestAnimationFrame(animate)
}`,

    wave: `// 波浪动画
let offset = 0

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  offset += 0.05 * ${speed.value}

  // 绘制波浪
  ctx.beginPath()
  ctx.moveTo(0, canvas.height / 2)

  for (let x = 0; x < canvas.width; x++) {
    const y = canvas.height / 2 + Math.sin(x * 0.02 + offset) * 50
    ctx.lineTo(x, y)
  }

  ctx.strokeStyle = '#3498db'
  ctx.lineWidth = 3
  ctx.stroke()

  requestAnimationFrame(animate)
}`
  }

  return templates[animationType.value]
})

const initBalls = () => {
  balls.value = []
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']

  for (let i = 0; i < objectCount.value; i++) {
    balls.value.push({
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: 15 + Math.random() * 20,
      color: colors[i % colors.length]
    })
  }
}

const drawBouncingBall = (ctx) => {
  balls.value.forEach((ball) => {
    // 更新位置
    ball.x += ball.vx * speed.value
    ball.y += ball.vy * speed.value

    // 边界碰撞
    if (ball.x + ball.radius > 600 || ball.x - ball.radius < 0) {
      ball.vx = -ball.vx
    }
    if (ball.y + ball.radius > 400 || ball.y - ball.radius < 0) {
      ball.vy = -ball.vy
    }

    // 绘制
    ctx.fillStyle = ball.color
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fill()

    // 高光效果
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.beginPath()
    ctx.arc(
      ball.x - ball.radius * 0.3,
      ball.y - ball.radius * 0.3,
      ball.radius * 0.4,
      0,
      Math.PI * 2
    )
    ctx.fill()
  })
}

const drawRotatingSquare = (ctx) => {
  angle.value += 0.02 * speed.value

  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']
  const positions = [
    { x: 200, y: 200 },
    { x: 400, y: 200 },
    { x: 300, y: 300 }
  ]

  positions.slice(0, objectCount.value).forEach((pos, i) => {
    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.rotate(angle.value + (i * Math.PI) / 3)

    ctx.fillStyle = colors[i % colors.length]
    ctx.fillRect(-40, -40, 80, 80)

    ctx.restore()
  })
}

const drawWave = (ctx) => {
  angle.value += 0.05 * speed.value

  const colors = ['#e74c3c', '#3498db', '#2ecc71']

  for (let w = 0; w < objectCount.value; w++) {
    ctx.beginPath()
    ctx.moveTo(0, 200)

    for (let x = 0; x < 600; x++) {
      const y = 200 + Math.sin(x * 0.02 + angle.value + w * 0.5) * (50 + w * 20)
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = colors[w % colors.length]
    ctx.lineWidth = 3
    ctx.stroke()
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

  // 根据类型绘制
  switch (animationType.value) {
    case 'bounce':
      drawBouncingBall(ctx)
      break
    case 'rotate':
      drawRotatingSquare(ctx)
      break
    case 'wave':
      drawWave(ctx)
      break
  }

  frame.value++
}

const animate = (timestamp) => {
  if (!lastTime) lastTime = timestamp
  const deltaTime = timestamp - lastTime

  // 计算 FPS
  frameCount++
  fpsTime += deltaTime
  if (fpsTime >= 1000) {
    fps.value = Math.round((frameCount * 1000) / fpsTime)
    frameCount = 0
    fpsTime = 0
  }

  lastTime = timestamp

  draw()

  if (isPlaying.value) {
    animationId = requestAnimationFrame(animate)
  }
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    lastTime = 0
    animationId = requestAnimationFrame(animate)
  } else {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }
}

const resetAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  isPlaying.value = false
  frame.value = 0
  angle.value = 0
  initBalls()
  draw()
}

watch(objectCount, () => {
  initBalls()
  if (!isPlaying.value) {
    draw()
  }
})

onMounted(() => {
  initBalls()
  draw()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.animation-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.control-panel {
  margin-bottom: 1.5rem;
}

.playback-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.play-btn,
.reset-btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.play-btn {
  background: #2ecc71;
  color: white;
}

.play-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
}

.reset-btn {
  background: #95a5a6;
  color: white;
}

.reset-btn:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(149, 165, 166, 0.4);
}

.animation-selector {
  margin-bottom: 1.25rem;
}

.animation-selector label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.animation-selector select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.animation-selector select:hover {
  border-color: var(--vp-c-brand);
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

.stats {
  display: flex;
  gap: 20px;
  padding: 12px;
  background: white;
  border-radius: 6px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.stat-item .label {
  font-weight: 600;
  color: #555;
}

.stat-item .value {
  font-family: 'Courier New', monospace;
  color: #2c3e50;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 700;
}

.canvas-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border: 2px solid var(--vp-c-divider);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

canvas {
  border: 3px solid var(--vp-c-divider);
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

</style>
