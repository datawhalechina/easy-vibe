<template>
  <div class="flow-matching-demo">
    <el-card shadow="never">
      <div class="controls">
        <el-button type="primary" @click="startAnimation" :disabled="isPlaying">
          <el-icon><VideoPlay /></el-icon> 开始对比演示 (Start Demo)
        </el-button>
      </div>

      <div class="comparison-grid">
        <!-- Diffusion -->
        <div class="viz-panel">
          <div class="panel-header">
            <el-icon color="#F56C6C"><RefreshLeft /></el-icon>
            <span>Diffusion (扩散模型)</span>
          </div>
          <div class="canvas-wrapper">
            <canvas ref="diffCanvasRef" width="300" height="200"></canvas>
            <div class="labels">
              <span class="label-noise">噪声 (Noise)</span>
              <span class="label-img">图像 (Image)</span>
            </div>
          </div>
          <div class="stats-box">
            <el-statistic title="步数 (Steps)" :value="diffSteps" />
            <el-tag type="danger">路径弯曲 (Curved)</el-tag>
          </div>
        </div>

        <!-- Flow Matching -->
        <div class="viz-panel">
          <div class="panel-header">
            <el-icon color="#67C23A"><Right /></el-icon>
            <span>Flow Matching (流匹配)</span>
          </div>
          <div class="canvas-wrapper">
            <canvas ref="flowCanvasRef" width="300" height="200"></canvas>
            <div class="labels">
              <span class="label-noise">噪声 (Noise)</span>
              <span class="label-img">图像 (Image)</span>
            </div>
          </div>
          <div class="stats-box">
            <el-statistic title="步数 (Steps)" :value="flowSteps" />
            <el-tag type="success">路径直线 (Straight)</el-tag>
          </div>
        </div>
      </div>

      <el-divider />

      <el-alert
        title="为什么 Flow Matching 更快？"
        type="success"
        :closable="false"
        show-icon
      >
        <template #default>
          <p>
            <strong>Diffusion</strong>
            就像在迷雾中摸索，路径充满了随机性，需要走很多弯路（步数多）才能到达终点。
            <br />
            <strong>Flow Matching</strong> 就像使用了 GPS
            导航，直接找到了从噪声到图像的<strong
              >直线最优路径 (Optimal Transport)</strong
            >，因此只需要极少的步数。
          </p>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { VideoPlay, RefreshLeft, Right } from '@element-plus/icons-vue'

const diffCanvasRef = ref(null)
const flowCanvasRef = ref(null)
const isPlaying = ref(false)
const diffSteps = ref(0)
const flowSteps = ref(0)

let animationFrame = null

// Animation State
let diffProgress = 0
let flowProgress = 0
const diffSpeed = 0.005 // Slow
const flowSpeed = 0.02 // Fast

// Particles
const particles = []

onMounted(() => {
  drawStatic(diffCanvasRef.value, 'curve')
  drawStatic(flowCanvasRef.value, 'line')
})

onUnmounted(() => {
  stopAnimation()
})

const startAnimation = () => {
  if (isPlaying.value) return
  isPlaying.value = true
  diffProgress = 0
  flowProgress = 0
  diffSteps.value = 0
  flowSteps.value = 0

  animate()
}

const stopAnimation = () => {
  isPlaying.value = false
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

const animate = () => {
  let finished = 0

  // Update Diffusion
  if (diffProgress < 1) {
    diffProgress += diffSpeed
    diffSteps.value = Math.floor(diffProgress * 50) // Simulate 50 steps
    drawFrame(diffCanvasRef.value, diffProgress, 'curve')
  } else {
    diffSteps.value = 50
    drawFrame(diffCanvasRef.value, 1, 'curve')
    finished++
  }

  // Update Flow
  if (flowProgress < 1) {
    flowProgress += flowSpeed
    flowSteps.value = Math.floor(flowProgress * 8) // Simulate 8 steps
    drawFrame(flowCanvasRef.value, flowProgress, 'line')
  } else {
    flowSteps.value = 8
    drawFrame(flowCanvasRef.value, 1, 'line')
    finished++
  }

  if (finished < 2) {
    animationFrame = requestAnimationFrame(animate)
  } else {
    isPlaying.value = false
  }
}

const drawStatic = (canvas, type) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)
  drawBackground(ctx, w, h)
  drawPath(ctx, w, h, type, false)
  drawEndpoints(ctx, w, h)
}

const drawFrame = (canvas, progress, type) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)
  drawBackground(ctx, w, h)
  drawPath(ctx, w, h, type, true) // active path
  drawEndpoints(ctx, w, h)

  // Draw Particle
  const pos = getPosition(progress, type, w, h)

  // Draw Trail
  ctx.beginPath()
  if (type === 'curve') {
    ctx.moveTo(30, h - 30)
    // Re-calculate curve up to progress
    for (let t = 0; t <= progress; t += 0.01) {
      const p = getPosition(t, type, w, h)
      ctx.lineTo(p.x, p.y)
    }
  } else {
    ctx.moveTo(30, h - 30)
    ctx.lineTo(pos.x, pos.y)
  }
  ctx.strokeStyle = type === 'curve' ? '#F56C6C' : '#67C23A'
  ctx.lineWidth = 3
  ctx.stroke()

  // Draw Head
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2)
  ctx.fillStyle = type === 'curve' ? '#F56C6C' : '#67C23A'
  ctx.fill()
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.stroke()
}

const drawBackground = (ctx, w, h) => {
  ctx.fillStyle = '#f9f9f9' // Light bg
  // Grid
  ctx.strokeStyle = '#eee'
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = 0; x <= w; x += 20) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
  }
  for (let y = 0; y <= h; y += 20) {
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
  }
  ctx.stroke()
}

const drawEndpoints = (ctx, w, h) => {
  // Start (Noise)
  ctx.beginPath()
  ctx.arc(30, h - 30, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#909399'
  ctx.fill()

  // End (Image)
  ctx.beginPath()
  ctx.arc(w - 30, 30, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#409EFF'
  ctx.fill()
}

const drawPath = (ctx, w, h, type, isActive) => {
  ctx.beginPath()
  ctx.moveTo(30, h - 30)

  if (type === 'line') {
    ctx.lineTo(w - 30, 30)
  } else {
    // Bezier curve for diffusion
    ctx.quadraticCurveTo(w * 0.2, 30, w - 30, 30)
  }

  ctx.strokeStyle = isActive ? 'rgba(0,0,0,0.1)' : '#ddd'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  ctx.stroke()
  ctx.setLineDash([])
}

const getPosition = (t, type, w, h) => {
  const startX = 30
  const startY = h - 30
  const endX = w - 30
  const endY = 30

  if (type === 'line') {
    return {
      x: startX + (endX - startX) * t,
      y: startY + (endY - startY) * t
    }
  } else {
    // Quadratic Bezier: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    // Control Point
    const cpX = w * 0.2
    const cpY = 30

    const x =
      Math.pow(1 - t, 2) * startX +
      2 * (1 - t) * t * cpX +
      Math.pow(t, 2) * endX
    const y =
      Math.pow(1 - t, 2) * startY +
      2 * (1 - t) * t * cpY +
      Math.pow(t, 2) * endY

    // Add some random jitter for diffusion look if t < 1
    // const jitter = t < 1 ? (Math.random() - 0.5) * 5 : 0
    // return { x: x + jitter, y: y + jitter }
    return { x, y }
  }
}
</script>

<style scoped>
.flow-matching-demo {
  margin: 20px 0;
}

.controls {
  text-align: center;
  margin-bottom: 20px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.viz-panel {
  background: var(--el-fill-color-light);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  font-size: 0.9em;
  color: var(--el-text-color-primary);
}

.canvas-wrapper {
  position: relative;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

canvas {
  width: 100%;
  height: auto;
  display: block;
}

.labels {
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #999;
  pointer-events: none;
}

.stats-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}
</style>
