<!--
  ParticleSystemDemo.vue
  Canvas 粒子系统演示组件

  用途：
  展示 Canvas 粒子系统的实现，包括粒子生成、运动、生命周期管理

  交互功能：
  - 鼠标交互：鼠标移动产生粒子
  - 参数调整：粒子数量、速度、大小、颜色
  - 效果选择：不同的粒子效果
-->
<template>
  <div class="particle-demo">
    <div class="control-panel">
      <div class="effect-selector">
        <label>Particle Effect / 粒子效果</label>
        <div class="button-group">
          <button
            v-for="effect in effects"
            :key="effect.value"
            :class="{ active: currentEffect === effect.value }"
            @click="currentEffect = effect.value"
          >
            {{ effect.label }}
          </button>
        </div>
      </div>

      <div class="parameters">
        <div class="param-row">
          <label>Particle Count / 粒子数量: {{ maxParticles }}</label>
          <input
            v-model.number="maxParticles"
            type="range"
            min="50"
            max="500"
            step="50"
          >
        </div>

        <div class="param-row">
          <label>Particle Size / 粒子大小: {{ particleSize }}</label>
          <input
            v-model.number="particleSize"
            type="range"
            min="1"
            max="10"
          >
        </div>

        <div class="param-row">
          <label>Speed / 速度: {{ speed }}</label>
          <input
            v-model.number="speed"
            type="range"
            min="0.5"
            max="3"
            step="0.1"
          >
        </div>

        <div class="param-row">
          <label>Gravity / 重力: {{ gravity }}</label>
          <input
            v-model.number="gravity"
            type="range"
            min="0"
            max="0.5"
            step="0.05"
          >
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="label">Active Particles:</span>
          <span class="value">{{ particles.length }}</span>
        </div>
        <div class="stat-item">
          <span class="label">FPS:</span>
          <span class="value">{{ fps }}</span>
        </div>
      </div>

      <button
        class="clear-btn"
        @click="clearParticles"
      >
        <span class="icon">🗑️</span>
        Clear Particles / 清除粒子
      </button>
    </div>

    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        width="600"
        height="400"
        @mousemove="handleMouseMove"
        @click="handleClick"
      />
    </div>

    

    

    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const currentEffect = ref('trail')
const maxParticles = ref(200)
const particleSize = ref(3)
const speed = ref(1)
const gravity = ref(0.1)
const particles = ref([])
const fps = ref(0)

let animationId = null
let lastTime = 0
let frameCount = 0
let fpsTime = 0
let mousePos = { x: 300, y: 200 }

const effects = [
  { value: 'trail', label: 'Mouse Trail / 鼠标轨迹' },
  { value: 'firework', label: 'Firework / 烟花' },
  { value: 'snow', label: 'Snowfall / 雪花' },
  { value: 'fountain', label: 'Fountain / 喷泉' }
]

const particleCode = computed(() => {
  return `// 粒子系统核心代码
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * ${speed.value}
    this.vy = (Math.random() - 0.5) * ${speed.value}
    this.life = 1.0
    this.decay = 0.01 + Math.random() * 0.02
    this.size = ${particleSize.value}
    this.color = this.randomColor()
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += ${gravity.value}  // 重力
    this.life -= this.decay
  }

  draw(ctx) {
    ctx.globalAlpha = this.life
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1.0
  }

  isDead() {
    return this.life <= 0
  }
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles = particles.filter(p => !p.isDead())
  particles.forEach(p => {
    p.update()
    p.draw(ctx)
  })

  requestAnimationFrame(animate)
}`
})

const colors = [
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e91e63',
  '#00bcd4'
]

class Particle {
  constructor(x, y, effect) {
    this.x = x
    this.y = y
    this.effect = effect
    this.life = 1.0
    this.size = particleSize.value + Math.random() * 2
    this.color = colors[Math.floor(Math.random() * colors.length)]

    // 根据效果类型设置不同的初始速度
    switch (effect) {
      case 'trail':
        this.vx = (Math.random() - 0.5) * 2 * speed.value
        this.vy = (Math.random() - 0.5) * 2 * speed.value
        this.decay = 0.02
        break
      case 'firework':
        const angle = Math.random() * Math.PI * 2
        const velocity = Math.random() * 5 * speed.value
        this.vx = Math.cos(angle) * velocity
        this.vy = Math.sin(angle) * velocity
        this.decay = 0.015
        break
      case 'snow':
        this.vx = (Math.random() - 0.5) * 0.5 * speed.value
        this.vy = 1 + Math.random() * 2 * speed.value
        this.decay = 0.005
        this.color = '#ecf0f1'
        break
      case 'fountain':
        this.vx = (Math.random() - 0.5) * 2 * speed.value
        this.vy = -3 - Math.random() * 5 * speed.value
        this.decay = 0.01
        break
    }
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.effect === 'snow' || this.effect === 'fountain') {
      this.vy += gravity.value
    }

    this.life -= this.decay
  }

  draw(ctx) {
    ctx.globalAlpha = this.life
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1.0
  }

  isDead() {
    return this.life <= 0 || this.y > 400 || this.x < 0 || this.x > 600
  }
}

const createParticles = (x, y, count) => {
  for (let i = 0; i < count; i++) {
    if (particles.value.length >= maxParticles.value) {
      particles.value.shift()
    }
    particles.value.push(new Particle(x, y, currentEffect.value))
  }
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  // 清除画布（使用半透明背景产生拖尾效果）
  ctx.fillStyle =
    currentEffect.value === 'trail'
      ? 'rgba(250, 250, 250, 0.2)'
      : 'rgba(250, 250, 250, 1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles.value = particles.value.filter((p) => !p.isDead())
  particles.value.forEach((p) => {
    p.update()
    p.draw(ctx)
  })

  // 持续产生粒子（雪花效果）
  if (currentEffect.value === 'snow') {
    createParticles(Math.random() * 600, -10, 2)
  }
}

const animate = (timestamp) => {
  if (!lastTime) lastTime = timestamp
  const deltaTime = timestamp - lastTime

  frameCount++
  fpsTime += deltaTime
  if (fpsTime >= 1000) {
    fps.value = Math.round((frameCount * 1000) / fpsTime)
    frameCount = 0
    fpsTime = 0
  }

  lastTime = timestamp

  draw()
  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  mousePos.x = e.clientX - rect.left
  mousePos.y = e.clientY - rect.top

  // 鼠标轨迹效果
  if (currentEffect.value === 'trail') {
    createParticles(mousePos.x, mousePos.y, 3)
  }
}

const handleClick = (e) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // 烟花和喷泉效果在点击时产生
  if (currentEffect.value === 'firework') {
    createParticles(x, y, 50)
  } else if (currentEffect.value === 'fountain') {
    createParticles(x, y, 30)
  }
}

const clearParticles = () => {
  particles.value = []
}

onMounted(() => {
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.particle-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.control-panel {
  margin-bottom: 1.5rem;
}

.effect-selector {
  margin-bottom: 15px;
}

.effect-selector label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.button-group button {
  padding: 0.5rem 1rem;
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
  margin-bottom: 15px;
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
  cursor: crosshair;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

</style>
