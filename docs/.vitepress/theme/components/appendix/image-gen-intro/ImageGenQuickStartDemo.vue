<template>
  <div class="quick-start-demo">
    <div class="preset-row">
      <div 
        v-for="(preset, index) in presets" 
        :key="index"
        class="preset-card"
        :class="{ active: selectedPreset === index }"
        @click="selectPreset(index)"
      >
        <span class="preset-icon">{{ preset.icon }}</span>
        <span class="preset-name">{{ preset.name }}</span>
      </div>
    </div>

    <div class="preview-area">
      <div class="canvas-wrapper">
        <canvas ref="canvasRef" width="400" height="300"></canvas>
        <div v-if="!isGenerating && !hasGenerated" class="placeholder-text">
          👈 点击上方风格，开始创作
        </div>
        <div v-if="isGenerating" class="loading-overlay">
          <div class="spinner"></div>
          <div>AI 正在绘制 {{ presets[selectedPreset].name }}...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)
const isGenerating = ref(false)
const hasGenerated = ref(false)
const selectedPreset = ref(-1)

const presets = [
  { name: '赛博朋克 (Cyberpunk)', icon: '🌃', color: ['#2b0055', '#ff00aa', '#00ffff'] },
  { name: '油画风景 (Oil Painting)', icon: '🎨', color: ['#556b2f', '#8b4513', '#ffdead'] },
  { name: '二次元 (Anime)', icon: '🌸', color: ['#ffb7c5', '#87ceeb', '#ffffff'] }
]

const selectPreset = (index) => {
  if (isGenerating.value) return
  selectedPreset.value = index
  generate(presets[index])
}

const generate = (preset) => {
  isGenerating.value = true
  hasGenerated.value = false
  const ctx = canvasRef.value.getContext('2d')
  
  // Clear
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, 400, 300)

  let progress = 0
  const totalSteps = 60
  
  const animate = () => {
    progress++
    
    // Draw Noise mixed with colors
    const noiseLevel = 1 - (progress / totalSteps)
    
    // Draw base colors (simple composition)
    const gradient = ctx.createLinearGradient(0, 0, 400, 300)
    gradient.addColorStop(0, preset.color[0])
    gradient.addColorStop(0.5, preset.color[1])
    gradient.addColorStop(1, preset.color[2])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 400, 300)
    
    // Add noise overlay
    if (noiseLevel > 0) {
      const imgData = ctx.getImageData(0, 0, 400, 300)
      const data = imgData.data
      for(let i=0; i<data.length; i+=4) {
        if (Math.random() < noiseLevel) {
          const gray = Math.random() * 255
          data[i] = (data[i] + gray) / 2
          data[i+1] = (data[i+1] + gray) / 2
          data[i+2] = (data[i+2] + gray) / 2
        }
      }
      ctx.putImageData(imgData, 0, 0)
    }

    if (progress < totalSteps) {
      requestAnimationFrame(animate)
    } else {
      isGenerating.value = false
      hasGenerated.value = true
    }
  }
  
  animate()
}
</script>

<style scoped>
.quick-start-demo {
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.preset-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.preset-card {
  flex: 1;
  min-width: 120px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.preset-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
}

.preset-card.active {
  background: var(--vp-c-brand-dimm);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-dark);
}

.preset-icon {
  font-size: 24px;
}

.preset-name {
  font-size: 12px;
  font-weight: 600;
}

.preview-area {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: #000;
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-text {
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  pointer-events: none;
}

.loading-overlay {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-radius: 8px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
