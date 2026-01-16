<template>
  <div class="diffusion-process-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-controls">
          <div class="mode-toggles">
            <el-radio-group v-model="mode" size="large">
              <el-radio-button label="forward">
                <el-icon><TopRight /></el-icon> 加噪 (Forward)
              </el-radio-button>
              <el-radio-button label="reverse">
                <el-icon><BottomLeft /></el-icon> 去噪 (Reverse)
              </el-radio-button>
            </el-radio-group>
          </div>
          <el-button type="primary" circle @click="togglePlay">
            <el-icon v-if="isPlaying"><VideoPause /></el-icon>
            <el-icon v-else><VideoPlay /></el-icon>
          </el-button>
        </div>
      </template>

      <div class="canvas-container">
        <canvas
          ref="canvasRef"
          width="300"
          height="300"
          class="noise-canvas"
        ></canvas>
        <div class="step-indicator">
          <span class="step-text"
            >Step: {{ currentStep }} / {{ totalSteps }}</span
          >
          <el-progress
            :percentage="
              mode === 'forward'
                ? (currentStep / totalSteps) * 100
                : ((totalSteps - currentStep) / totalSteps) * 100
            "
            :status="mode === 'forward' ? 'exception' : 'success'"
            :show-text="false"
            :stroke-width="4"
          />
        </div>
      </div>

      <div class="slider-control">
        <el-slider
          v-model="currentStep"
          :min="0"
          :max="totalSteps"
          :format-tooltip="formatTooltip"
          @input="draw"
        />
        <div class="slider-labels">
          <span>{{
            mode === 'forward' ? '原图 (Original)' : '纯噪声 (Noise)'
          }}</span>
          <span>{{
            mode === 'forward' ? '纯噪声 (Noise)' : '原图 (Original)'
          }}</span>
        </div>
      </div>

      <el-alert
        :title="
          mode === 'forward' ? '训练阶段：破坏数据' : '生成阶段：创造数据'
        "
        :type="mode === 'forward' ? 'warning' : 'success'"
        :description="
          mode === 'forward'
            ? 'AI 通过学习如何「一点点加噪」，掌握了噪声的规律。这就像教它把积木推倒。'
            : 'AI 通过预测并减去噪声，从混沌中还原出图像。这就像它学会了把推倒的积木重新搭好。'
        "
        show-icon
        :closable="false"
        class="explanation-alert"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import {
  VideoPlay,
  VideoPause,
  TopRight,
  BottomLeft
} from '@element-plus/icons-vue'

const canvasRef = ref(null)
const mode = ref('reverse')
const currentStep = ref(0)
const totalSteps = 100
const isPlaying = ref(false)
let animationFrame = null
let originalImage = null

// Load a base image (using a generated pattern to avoid external dependencies)
const loadBaseImage = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 300
  canvas.height = 300
  const ctx = canvas.getContext('2d')

  // Draw a simple landscape
  // Sky
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, '#87CEEB')
  gradient.addColorStop(1, '#E0F7FA')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 300, 300)

  // Sun
  ctx.beginPath()
  ctx.arc(240, 60, 30, 0, Math.PI * 2)
  ctx.fillStyle = '#FFD700'
  ctx.fill()

  // Mountains
  ctx.beginPath()
  ctx.moveTo(0, 300)
  ctx.lineTo(100, 150)
  ctx.lineTo(200, 250)
  ctx.lineTo(300, 100)
  ctx.lineTo(300, 300)
  ctx.fillStyle = '#4CAF50'
  ctx.fill()

  // House
  ctx.fillStyle = '#795548'
  ctx.fillRect(50, 220, 60, 60)
  ctx.beginPath()
  ctx.moveTo(40, 220)
  ctx.lineTo(80, 180)
  ctx.lineTo(120, 220)
  ctx.fillStyle = '#F44336'
  ctx.fill()

  originalImage = ctx.getImageData(0, 0, 300, 300)
}

const generateNoise = (width, height) => {
  const size = width * height * 4
  const data = new Uint8ClampedArray(size)
  for (let i = 0; i < size; i += 4) {
    const val = Math.random() * 255
    data[i] = val // R
    data[i + 1] = val // G
    data[i + 2] = val // B
    data[i + 3] = 255 // A
  }
  return new ImageData(data, width, height)
}

// Pre-generate noise to keep it consistent
let noiseImage = null

onMounted(() => {
  loadBaseImage()
  noiseImage = generateNoise(300, 300)
  // Always start from step 0 (Start of the process)
  // Forward: Step 0 = Clean Image
  // Reverse: Step 0 = Noisy Image
  currentStep.value = 0
  draw()
})

onUnmounted(() => {
  stopAnimation()
})

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas || !originalImage) return
  const ctx = canvas.getContext('2d')

  // Calculate noise ratio based on mode and step
  // Forward: 0 -> 100 (Clean -> Noisy)
  // Reverse: 100 -> 0 (Noisy -> Clean)
  // But wait, the slider is just "Progress".
  // Let's define currentStep as "Amount of Noise" for simplicity in logic,
  // but for UI, we want:
  // Forward Mode: Slider 0 (Clean) -> 100 (Noisy)
  // Reverse Mode: Slider 0 (Noisy) -> 100 (Clean)

  let noiseRatio = 0
  if (mode.value === 'forward') {
    noiseRatio = currentStep.value / totalSteps
  } else {
    // In reverse mode, slider 0 means start (Noisy), 100 means end (Clean)
    // So noise amount is 1 - slider
    noiseRatio = 1 - currentStep.value / totalSteps
  }

  // Non-linear interpolation for better visual effect
  // noiseRatio = Math.pow(noiseRatio, 1.5)

  const w = canvas.width
  const h = canvas.height
  const output = ctx.createImageData(w, h)
  const d = output.data
  const o = originalImage.data
  const n = noiseImage.data

  for (let i = 0; i < d.length; i += 4) {
    // Simple linear interpolation
    // Pixel = (1 - alpha) * Original + alpha * Noise
    // Note: This is a simplified diffusion visualization.
    // Real diffusion adds noise: x_t = sqrt(alpha_bar) * x_0 + sqrt(1 - alpha_bar) * epsilon

    // Using simple blending for visualization
    d[i] = o[i] * (1 - noiseRatio) + n[i] * noiseRatio
    d[i + 1] = o[i + 1] * (1 - noiseRatio) + n[i + 1] * noiseRatio
    d[i + 2] = o[i + 2] * (1 - noiseRatio) + n[i + 2] * noiseRatio
    d[i + 3] = 255
  }

  ctx.putImageData(output, 0, 0)
}

const togglePlay = () => {
  if (isPlaying.value) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

const startAnimation = () => {
  isPlaying.value = true
  // Reset if at end
  if (currentStep.value >= totalSteps) {
    currentStep.value = 0
  }

  const animate = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value += 1
      draw()
      animationFrame = requestAnimationFrame(animate)
    } else {
      stopAnimation()
    }
  }
  animationFrame = requestAnimationFrame(animate)
}

const stopAnimation = () => {
  isPlaying.value = false
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

watch(mode, () => {
  stopAnimation()
  currentStep.value = 0
  draw()
})

const formatTooltip = (val) => {
  return `Step ${val}`
}
</script>

<style scoped>
.diffusion-process-demo {
  margin: 20px 0;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  position: relative;
}

.noise-canvas {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  height: auto;
}

.step-indicator {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: bold;
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 80%;
}

.step-indicator .el-progress {
  width: 100%;
}

.slider-control {
  padding: 0 20px;
  margin-bottom: 20px;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: var(--el-text-color-secondary);
  margin-top: -10px;
}

.explanation-alert {
  margin-top: 20px;
}
</style>
