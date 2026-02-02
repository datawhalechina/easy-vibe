<!--
  ImageGenQuickStartDemo.vue
  AI 绘画快速体验组件

  用途：
  让用户在文章开头就能体验 AI 绘画的魅力，通过交互式演示理解文生图的基本概念。

  交互功能：
  - 预设提示词选择：快速体验不同风格的图像生成
  - 模拟生成过程：展示从文本到图像的渐进过程
  - 参数调节：调整生成步数、CFG Scale 等参数
  - 对比展示：对比不同参数下的生成效果
-->
<template>
  <div class="image-gen-quickstart">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Picture /></el-icon>
          <span>🎨 AI 绘画体验室</span>
        </div>
      </template>

      <div class="demo-layout">
        <!-- 左侧：控制面板 -->
        <div class="control-panel">
          <div class="input-section">
            <label>提示词 (Prompt)</label>
            <el-input
              v-model="prompt"
              type="textarea"
              :rows="3"
              placeholder="描述你想生成的图像..."
            />
            <div class="prompt-tags">
              <el-tag
                v-for="tag in presetPrompts"
                :key="tag.label"
                size="small"
                class="prompt-tag"
                @click="prompt = tag.prompt"
              >
                {{ tag.label }}
              </el-tag>
            </div>
          </div>

          <div class="params-section">
            <div class="param-row">
              <label>生成步数</label>
              <el-slider v-model="steps" :min="10" :max="50" :step="5" show-stops />
            </div>
            <div class="param-row">
              <label>CFG Scale (提示词遵循度)</label>
              <el-slider v-model="cfgScale" :min="1" :max="15" :step="0.5" />
            </div>
            <div class="param-row">
              <label>采样器</label>
              <el-select v-model="sampler" size="small">
                <el-option label="Euler" value="euler" />
                <el-option label="DPM++" value="dpm" />
                <el-option label="DDIM" value="ddim" />
              </el-select>
            </div>
          </div>

          <el-button
            type="primary"
            :loading="isGenerating"
            @click="startGeneration"
            class="generate-btn"
          >
            <el-icon><MagicStick /></el-icon>
            {{ isGenerating ? '生成中...' : '开始生成' }}
          </el-button>
        </div>

        <!-- 右侧：生成展示 -->
        <div class="display-panel">
          <div class="canvas-container">
            <canvas
              ref="canvasRef"
              width="400"
              height="400"
              class="gen-canvas"
            />
            <div v-if="isGenerating" class="progress-overlay">
              <el-progress
                type="circle"
                :percentage="progress"
                :status="progress === 100 ? 'success' : ''"
              />
              <p class="step-info">Step {{ currentStep }} / {{ steps }}</p>
            </div>
          </div>

          <div class="image-info" v-if="!isGenerating && hasGenerated">
            <el-descriptions :column="2" size="small" border>
              <el-descriptions-item label="分辨率">512 × 512</el-descriptions-item>
              <el-descriptions-item label="生成步数">{{ steps }}</el-descriptions-item>
              <el-descriptions-item label="CFG Scale">{{ cfgScale }}</el-descriptions-item>
              <el-descriptions-item label="采样器">{{ sampler }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>小提示：</strong>
          提示词越详细，生成效果越好。尝试使用 "风格词"（如 "赛博朋克"、"水彩画"）来控制图像风格。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Picture, MagicStick } from '@element-plus/icons-vue'

const canvasRef = ref(null)
const prompt = ref('一只戴着墨镜的猫，赛博朋克风格，霓虹灯光')
const steps = ref(20)
const cfgScale = ref(7.5)
const sampler = ref('euler')
const isGenerating = ref(false)
const progress = ref(0)
const currentStep = ref(0)
const hasGenerated = ref(false)

const presetPrompts = [
  { label: '🐱 赛博朋克猫', prompt: '一只戴着墨镜的猫，赛博朋克风格，霓虹灯光' },
  { label: '🏔️ 山水画', prompt: '中国山水画，云雾缭绕，水墨风格' },
  { label: '🚀 太空', prompt: '宇航员在火星表面，日落时分，科幻风格' },
  { label: '🌸 樱花', prompt: '樱花树下，日本传统建筑，春天，柔和光线' },
]

// 模拟生成过程
const startGeneration = async () => {
  isGenerating.value = true
  progress.value = 0
  currentStep.value = 0
  hasGenerated.value = false

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  // 生成噪声图像作为起点
  const generateNoise = () => {
    const imageData = ctx.createImageData(400, 400)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const val = Math.random() * 255
      imageData.data[i] = val
      imageData.data[i + 1] = val
      imageData.data[i + 2] = val
      imageData.data[i + 3] = 255
    }
    return imageData
  }

  // 模拟渐进生成
  for (let i = 0; i <= steps.value; i++) {
    await new Promise(resolve => setTimeout(resolve, 100))
    currentStep.value = i
    progress.value = Math.round((i / steps.value) * 100)

    // 绘制渐进图像（模拟）
    const noiseRatio = 1 - (i / steps.value)
    drawSimulatedImage(ctx, noiseRatio)
  }

  isGenerating.value = false
  hasGenerated.value = true
}

// 根据提示词绘制模拟图像
const drawSimulatedImage = (ctx, noiseRatio) => {
  const width = 400
  const height = 400

  // 清空画布
  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(0, 0, width, height)

  // 根据提示词关键词绘制不同内容
  const promptLower = prompt.value.toLowerCase()

  // 赛博朋克风格
  if (promptLower.includes('赛博') || promptLower.includes('cyber')) {
    drawCyberpunkScene(ctx, width, height, noiseRatio)
  }
  // 山水画
  else if (promptLower.includes('山水') || promptLower.includes('水墨')) {
    drawLandscape(ctx, width, height, noiseRatio)
  }
  // 太空
  else if (promptLower.includes('太空') || promptLower.includes('宇航员')) {
    drawSpaceScene(ctx, width, height, noiseRatio)
  }
  // 樱花
  else if (promptLower.includes('樱花') || promptLower.includes('日本')) {
    drawSakuraScene(ctx, width, height, noiseRatio)
  }
  // 默认：抽象艺术
  else {
    drawAbstractArt(ctx, width, height, noiseRatio)
  }

  // 添加噪声
  if (noiseRatio > 0) {
    addNoise(ctx, width, height, noiseRatio)
  }
}

const drawCyberpunkScene = (ctx, w, h, noise) => {
  // 霓虹背景
  const gradient = ctx.createLinearGradient(0, 0, 0, h)
  gradient.addColorStop(0, '#0a0a1a')
  gradient.addColorStop(1, '#1a0a2e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // 霓虹灯条
  ctx.shadowBlur = 20 * (1 - noise)
  ctx.shadowColor = '#ff00ff'
  ctx.fillStyle = `rgba(255, 0, 255, ${0.8 * (1 - noise)})`
  ctx.fillRect(50, 100, 300, 5)

  ctx.shadowColor = '#00ffff'
  ctx.fillStyle = `rgba(0, 255, 255, ${0.8 * (1 - noise)})`
  ctx.fillRect(100, 200, 200, 5)

  // 猫的形状（简化）
  ctx.shadowBlur = 0
  ctx.fillStyle = `rgba(100, 100, 150, ${0.9 * (1 - noise)})`
  ctx.beginPath()
  ctx.ellipse(200, 280, 60, 50, 0, 0, Math.PI * 2)
  ctx.fill()

  // 耳朵
  ctx.beginPath()
  ctx.moveTo(160, 250)
  ctx.lineTo(150, 200)
  ctx.lineTo(180, 240)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(240, 250)
  ctx.lineTo(250, 200)
  ctx.lineTo(220, 240)
  ctx.fill()

  // 墨镜
  ctx.fillStyle = `rgba(0, 0, 0, ${0.9 * (1 - noise)})`
  ctx.beginPath()
  ctx.ellipse(180, 270, 20, 12, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(220, 270, 20, 12, 0, 0, Math.PI * 2)
  ctx.fill()

  // 镜片反光
  ctx.fillStyle = `rgba(255, 0, 255, ${0.6 * (1 - noise)})`
  ctx.beginPath()
  ctx.ellipse(175, 268, 5, 3, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(215, 268, 5, 3, 0, 0, Math.PI * 2)
  ctx.fill()
}

const drawLandscape = (ctx, w, h, noise) => {
  // 天空渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, h)
  gradient.addColorStop(0, '#e8f4f8')
  gradient.addColorStop(0.5, '#c8e0e8')
  gradient.addColorStop(1, '#a8c8d8')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // 远山
  ctx.fillStyle = `rgba(100, 120, 140, ${0.5 * (1 - noise)})`
  ctx.beginPath()
  ctx.moveTo(0, 250)
  ctx.lineTo(100, 150)
  ctx.lineTo(200, 200)
  ctx.lineTo(300, 120)
  ctx.lineTo(400, 180)
  ctx.lineTo(400, 400)
  ctx.lineTo(0, 400)
  ctx.fill()

  // 近山
  ctx.fillStyle = `rgba(60, 80, 100, ${0.7 * (1 - noise)})`
  ctx.beginPath()
  ctx.moveTo(0, 300)
  ctx.lineTo(150, 220)
  ctx.lineTo(300, 280)
  ctx.lineTo(400, 240)
  ctx.lineTo(400, 400)
  ctx.lineTo(0, 400)
  ctx.fill()

  // 云雾
  ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * (1 - noise)})`
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.ellipse(80 + i * 70, 180 + i * 20, 40, 20, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}

const drawSpaceScene = (ctx, w, h, noise) => {
  // 太空背景
  ctx.fillStyle = '#0a0a15'
  ctx.fillRect(0, 0, w, h)

  // 星星
  ctx.fillStyle = `rgba(255, 255, 255, ${1 - noise})`
  for (let i = 0; i < 100; i++) {
    const x = (i * 37) % w
    const y = (i * 73) % h
    ctx.beginPath()
    ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // 火星地面
  ctx.fillStyle = `rgba(180, 80, 40, ${0.8 * (1 - noise)})`
  ctx.beginPath()
  ctx.moveTo(0, 350)
  ctx.lineTo(100, 320)
  ctx.lineTo(200, 340)
  ctx.lineTo(300, 310)
  ctx.lineTo(400, 330)
  ctx.lineTo(400, 400)
  ctx.lineTo(0, 400)
  ctx.fill()

  // 宇航员（简化）
  ctx.fillStyle = `rgba(220, 220, 230, ${0.9 * (1 - noise)})`
  ctx.beginPath()
  ctx.arc(200, 220, 40, 0, Math.PI * 2)
  ctx.fill()

  // 头盔反光
  ctx.fillStyle = `rgba(255, 200, 100, ${0.5 * (1 - noise)})`
  ctx.beginPath()
  ctx.arc(185, 210, 15, 0, Math.PI * 2)
  ctx.fill()

  // 日落
  const sunGradient = ctx.createRadialGradient(300, 100, 0, 300, 100, 60)
  sunGradient.addColorStop(0, `rgba(255, 200, 100, ${1 - noise})`)
  sunGradient.addColorStop(1, `rgba(255, 100, 50, ${0.5 * (1 - noise)})`)
  ctx.fillStyle = sunGradient
  ctx.beginPath()
  ctx.arc(300, 100, 50, 0, Math.PI * 2)
  ctx.fill()
}

const drawSakuraScene = (ctx, w, h, noise) => {
  // 天空
  const gradient = ctx.createLinearGradient(0, 0, 0, h)
  gradient.addColorStop(0, '#ffe4e1')
  gradient.addColorStop(1, '#ffb6c1')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // 传统建筑屋顶
  ctx.fillStyle = `rgba(80, 60, 60, ${0.9 * (1 - noise)})`
  ctx.beginPath()
  ctx.moveTo(100, 300)
  ctx.lineTo(150, 200)
  ctx.lineTo(250, 200)
  ctx.lineTo(300, 300)
  ctx.fill()

  // 樱花树
  ctx.fillStyle = `rgba(139, 90, 43, ${0.9 * (1 - noise)})`
  ctx.fillRect(50, 200, 20, 200)

  // 樱花
  ctx.fillStyle = `rgba(255, 183, 197, ${0.8 * (1 - noise)})`
  for (let i = 0; i < 30; i++) {
    const x = 30 + (i * 13) % 80
    const y = 150 + (i * 17) % 100
    ctx.beginPath()
    ctx.arc(x, y, 8 + Math.random() * 5, 0, Math.PI * 2)
    ctx.fill()
  }

  // 飘落的樱花
  ctx.fillStyle = `rgba(255, 192, 203, ${0.6 * (1 - noise)})`
  for (let i = 0; i < 20; i++) {
    const x = (i * 23) % w
    const y = 250 + (i * 31) % 150
    ctx.beginPath()
    ctx.ellipse(x, y, 4, 2, i, 0, Math.PI * 2)
    ctx.fill()
  }
}

const drawAbstractArt = (ctx, w, h, noise) => {
  // 渐变背景
  const gradient = ctx.createLinearGradient(0, 0, w, h)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // 抽象形状
  const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe']
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = colors[i % colors.length] + Math.floor((1 - noise) * 255).toString(16).padStart(2, '0')
    ctx.beginPath()
    const x = 100 + (i * 50) % 300
    const y = 100 + (i * 70) % 250
    const r = 30 + i * 5
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

const addNoise = (ctx, w, h, ratio) => {
  const imageData = ctx.getImageData(0, 0, w, h)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 50 * ratio
    imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise))
    imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise))
    imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise))
  }
  ctx.putImageData(imageData, 0, 0)
}

onMounted(() => {
  // 初始绘制
  const canvas = canvasRef.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    drawSimulatedImage(ctx, 1)
  }
})
</script>

<style scoped>
.image-gen-quickstart {
  margin: 1rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-section label,
.params-section label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.prompt-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.prompt-tag {
  cursor: pointer;
  transition: all 0.2s;
}

.prompt-tag:hover {
  transform: translateY(-2px);
}

.param-row {
  margin-bottom: 12px;
}

.param-row label {
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.generate-btn {
  width: 100%;
  margin-top: auto;
}

.display-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.canvas-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  overflow: hidden;
}

.gen-canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.progress-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  gap: 16px;
}

.step-info {
  color: white;
  font-size: 0.9rem;
}

.image-info {
  font-size: 0.8rem;
}

.info-box {
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}
</style>
