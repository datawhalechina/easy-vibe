<template>
  <div class="flow-matching-demo">
    <div class="demo-card">
      <div class="controls">
        <button class="play-btn" @click="startRace" :disabled="isPlaying">
          <span class="icon">{{ isPlaying ? 'Running...' : '🚀 开始比赛 (Start Race)' }}</span>
        </button>
      </div>

      <div class="track-container">
        <!-- Track 1: Diffusion -->
        <div class="track">
          <div class="track-info">
            <span class="track-name">Diffusion (迷宫模式)</span>
            <span class="step-count">{{ diffSteps }} Steps</span>
          </div>
          <div class="canvas-wrapper">
            <canvas ref="diffCanvasRef" width="400" height="100"></canvas>
            <div class="marker start">噪声</div>
            <div class="marker end">图像</div>
          </div>
        </div>

        <!-- Track 2: Flow Matching -->
        <div class="track">
          <div class="track-info">
            <span class="track-name">Flow Matching (直通模式)</span>
            <span class="step-count highlight">{{ flowSteps }} Steps</span>
          </div>
          <div class="canvas-wrapper">
            <canvas ref="flowCanvasRef" width="400" height="100"></canvas>
            <div class="marker start">噪声</div>
            <div class="marker end">图像</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-bar">
      <span class="icon">💡</span>
      <span>
        <strong>核心区别：</strong>
        Diffusion 就像在走迷宫，虽然也能到终点，但绕了很多弯路（步数多）。Flow Matching 则是直接修了一条直线高速公路，所以 8 步就能走完别人 50 步的路。
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const diffCanvasRef = ref(null)
const flowCanvasRef = ref(null)
const isPlaying = ref(false)
const diffSteps = ref(0)
const flowSteps = ref(0)
let animationId = null

// Constants
const TARGET_STEPS_DIFF = 50
const TARGET_STEPS_FLOW = 8
const DURATION = 3000 // 3 seconds for the whole race

// Particles state
let particles = []
const NUM_PARTICLES = 5

class Particle {
  constructor(type) {
    this.type = type // 'diff' or 'flow'
    this.progress = 0
    this.path = []
    this.noiseOffset = Math.random() * 1000
    this.yOffset = (Math.random() - 0.5) * 60 // Spread vertically
  }

  update(dt) {
    // Speed varies: Flow is faster because it covers distance in fewer steps? 
    // Actually, let's make them finish at the same TIME, but show the path difference.
    // Or make Flow finish faster. Let's make Flow finish faster.
    
    const speed = this.type === 'flow' ? 0.8 : 0.3
    this.progress += speed * dt
    
    if (this.progress > 1) this.progress = 1
    
    // Calculate Position
    const startX = 20
    const endX = 380
    const startY = 50 + this.yOffset
    const endY = 50
    
    // Linear interpolation base
    let x = startX + (endX - startX) * this.progress
    let y = startY + (endY - startY) * this.progress
    
    if (this.type === 'diff') {
      // Add noise to path
      if (this.progress < 1) {
        const noise = Math.sin(this.progress * 20 + this.noiseOffset) * 30 * (1 - this.progress)
        y += noise
      }
    }
    
    this.path.push({x, y})
    return {x, y}
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.path[0].x, this.path[0].y)
    for (let p of this.path) {
      ctx.lineTo(p.x, p.y)
    }
    ctx.strokeStyle = this.type === 'flow' ? '#10b981' : '#f43f5e'
    ctx.lineWidth = 2
    ctx.stroke()
    
    const current = this.path[this.path.length - 1]
    ctx.beginPath()
    ctx.arc(current.x, current.y, 4, 0, Math.PI * 2)
    ctx.fillStyle = this.type === 'flow' ? '#10b981' : '#f43f5e'
    ctx.fill()
  }
}

const startRace = () => {
  if (isPlaying.value) return
  isPlaying.value = true
  diffSteps.value = 0
  flowSteps.value = 0
  particles = []
  
  // Create particles
  for(let i=0; i<NUM_PARTICLES; i++) {
    particles.push(new Particle('diff'))
    particles.push(new Particle('flow'))
  }
  
  let lastTime = performance.now()
  
  const animate = (time) => {
    const dt = (time - lastTime) / 1000
    lastTime = time
    
    const dCtx = diffCanvasRef.value.getContext('2d')
    const fCtx = flowCanvasRef.value.getContext('2d')
    
    // Clear
    dCtx.clearRect(0, 0, 400, 100)
    fCtx.clearRect(0, 0, 400, 100)
    
    // Draw Guidelines
    drawGuide(dCtx)
    drawGuide(fCtx)
    
    let allFinished = true
    
    particles.forEach(p => {
      p.update(dt)
      if (p.progress < 1) allFinished = false
      
      if (p.type === 'diff') p.draw(dCtx)
      else p.draw(fCtx)
    })
    
    // Update steps counter simulation
    // Flow finishes in 8 steps, Diff in 50
    // Map progress to steps
    const flowP = particles.find(p => p.type === 'flow')
    const diffP = particles.find(p => p.type === 'diff')
    
    if (flowP) flowSteps.value = Math.floor(flowP.progress * TARGET_STEPS_FLOW)
    if (diffP) diffSteps.value = Math.floor(diffP.progress * TARGET_STEPS_DIFF)
    
    if (!allFinished) {
      animationId = requestAnimationFrame(animate)
    } else {
      isPlaying.value = false
      flowSteps.value = TARGET_STEPS_FLOW
      diffSteps.value = TARGET_STEPS_DIFF
    }
  }
  
  requestAnimationFrame(animate)
}

const drawGuide = (ctx) => {
  ctx.strokeStyle = 'rgba(128,128,128,0.1)'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(20, 50)
  ctx.lineTo(380, 50)
  ctx.stroke()
  ctx.setLineDash([])
}

onMounted(() => {
  // Initial draw
  const dCtx = diffCanvasRef.value.getContext('2d')
  const fCtx = flowCanvasRef.value.getContext('2d')
  drawGuide(dCtx)
  drawGuide(fCtx)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.flow-matching-demo {
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.demo-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.play-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
}

.play-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.play-btn:disabled {
  opacity: 0.7;
  cursor: default;
}

.track {
  margin-bottom: 24px;
}

.track-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
}

.step-count {
  font-family: monospace;
  background: var(--vp-c-bg-alt);
  padding: 2px 8px;
  border-radius: 4px;
}

.step-count.highlight {
  color: #10b981;
}

.canvas-wrapper {
  position: relative;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  height: 100px;
}

.marker {
  position: absolute;
  bottom: 4px;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.marker.start { left: 10px; }
.marker.end { right: 10px; }

canvas {
  width: 100%;
  height: 100%;
}

.info-bar {
  margin-top: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 8px;
  line-height: 1.4;
  padding: 0 8px;
}
</style>
