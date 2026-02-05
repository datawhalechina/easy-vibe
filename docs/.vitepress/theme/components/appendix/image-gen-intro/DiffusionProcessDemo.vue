<template>
  <div class="diffusion-magic">
    <div class="magic-frame">
      <!-- The Canvas -->
      <div class="canvas-wrapper">
        <canvas ref="canvasRef" width="300" height="300"></canvas>
        
        <!-- Overlay Status -->
        <div class="status-overlay" :class="{ visible: isProcessing }">
          <div class="step-counter">Step {{ currentStep }} / {{ totalSteps }}</div>
          <div class="step-desc">{{ stepDescription }}</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="controls">
        <button class="magic-btn" @click="startDenoise" :disabled="isProcessing">
          <span class="icon">✨</span>
          {{ isProcessing ? '去噪中...' : '开始去噪 (Denoise)' }}
        </button>
        
        <button class="reset-btn" @click="reset" :disabled="isProcessing">
          <span class="icon">🔄</span> 重置
        </button>
      </div>
    </div>

    <div class="info-bar">
      <span class="icon">💡</span>
      <span>
        <strong>观察重点：</strong>
        注意看，图像不是一下子变出来的，而是像在雾气中慢慢显影。这就是 Diffusion 的核心——它在不断猜测“噪声背后的真相”。
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const canvasRef = ref(null)
const isProcessing = ref(false)
const currentStep = ref(0)
const totalSteps = 50
let animationFrame = null

// Use a simple gradient pattern as the "Target Image" to avoid external assets
const drawTargetImage = (ctx) => {
  // Draw a sunset landscape
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, '#2c3e50')
  gradient.addColorStop(0.5, '#e67e22')
  gradient.addColorStop(1, '#f1c40f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 300, 300)
  
  // Draw a sun
  ctx.beginPath()
  ctx.arc(150, 200, 60, 0, Math.PI * 2)
  ctx.fillStyle = '#f39c12'
  ctx.fill()
  
  // Draw mountains
  ctx.beginPath()
  ctx.moveTo(0, 300)
  ctx.lineTo(100, 200)
  ctx.lineTo(200, 250)
  ctx.lineTo(300, 150)
  ctx.lineTo(300, 300)
  ctx.fillStyle = '#2c3e50'
  ctx.fill()
}

const drawNoise = (ctx, amount) => {
  const w = 300
  const h = 300
  const idata = ctx.getImageData(0, 0, w, h)
  const buffer = new Uint32Array(idata.data.buffer)
  
  // We need to blend the target image with noise based on 'amount' (0 to 1)
  // But since we can't easily read back the target image every frame efficiently without offscreen canvas,
  // let's do a simpler trick: Draw target, then draw semi-transparent noise on top.
  
  // Actually, let's generate noise overlay.
  // Amount 1.0 = Full Noise (Opaque)
  // Amount 0.0 = No Noise (Transparent)
  
  // Clear and draw target first
  drawTargetImage(ctx)
  
  if (amount <= 0) return

  const noiseCanvas = document.createElement('canvas')
  noiseCanvas.width = w
  noiseCanvas.height = h
  const nCtx = noiseCanvas.getContext('2d')
  const nImgData = nCtx.createImageData(w, h)
  const data = nImgData.data
  
  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.random() * 255
    data[i] = gray     // R
    data[i+1] = gray   // G
    data[i+2] = gray   // B
    data[i+3] = 255    // Alpha
  }
  nCtx.putImageData(nImgData, 0, 0)
  
  ctx.globalAlpha = amount
  ctx.drawImage(noiseCanvas, 0, 0)
  ctx.globalAlpha = 1.0
}

const stepDescription = computed(() => {
  if (currentStep.value === 0) return '纯噪声 (Pure Noise)'
  if (currentStep.value < 10) return '隐约出现轮廓...'
  if (currentStep.value < 30) return '色彩开始浮现...'
  if (currentStep.value < 50) return '细节逐渐清晰...'
  return '生成完成 (Done)!'
})

const startDenoise = () => {
  if (isProcessing.value) return
  isProcessing.value = true
  currentStep.value = 0
  
  const animate = () => {
    if (currentStep.value >= totalSteps) {
      isProcessing.value = false
      return
    }
    
    currentStep.value++
    const noiseLevel = 1 - (currentStep.value / totalSteps)
    // Non-linear ease out for better visual
    const visualNoise = Math.pow(noiseLevel, 1.5) 
    
    const ctx = canvasRef.value.getContext('2d')
    drawNoise(ctx, visualNoise)
    
    animationFrame = requestAnimationFrame(animate)
  }
  
  animate()
}

const reset = () => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  isProcessing.value = false
  currentStep.value = 0
  const ctx = canvasRef.value.getContext('2d')
  drawNoise(ctx, 1.0)
}

onMounted(() => {
  reset()
})
</script>

<style scoped>
.diffusion-magic {
  margin: 20px 0;
  max-width: 400px; /* Compact width */
  margin-left: auto;
  margin-right: auto;
  font-family: var(--vp-font-family-base);
}

.magic-frame {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* Square aspect ratio */
  background: #000;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}

.status-overlay {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 8px 12px;
  border-radius: 8px;
  color: #fff;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.status-overlay.visible {
  opacity: 1;
  transform: translateY(0);
}

.step-counter {
  font-size: 10px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.step-desc {
  font-size: 14px;
  font-weight: 600;
  margin-top: 2px;
}

.controls {
  padding: 16px;
  display: flex;
  gap: 12px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

button {
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.magic-btn {
  background: var(--vp-c-brand);
  color: white;
}

.magic-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.magic-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  flex: 0.4;
}

.reset-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-mute);
}

.info-bar {
  margin-top: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 8px;
  line-height: 1.4;
  padding: 0 8px;
}
</style>
