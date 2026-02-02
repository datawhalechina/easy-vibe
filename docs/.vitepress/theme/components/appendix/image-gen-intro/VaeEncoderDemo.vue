<!--
  VaeEncoderDemo.vue
  VAE 编解码器演示组件

  用途：
  展示 VAE 如何将高分辨率图像压缩到潜空间，以及如何从潜空间还原图像。
  帮助用户理解 Latent Space 的概念。

  交互功能：
  - 编码/解码模式切换
  - 可视化压缩过程
  - 展示潜空间表示
  - 对比原始图像和重建图像
-->
<template>
  <div class="vae-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-controls">
          <span class="title">🔍 VAE 编解码器</span>
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="encode">
              <el-icon><ArrowRight /></el-icon> 编码 (Encode)
            </el-radio-button>
            <el-radio-button label="decode">
              <el-icon><ArrowLeft /></el-icon> 解码 (Decode)
            </el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <div class="vae-flow">
        <!-- 输入侧 -->
        <div class="stage">
          <div class="stage-label">{{ mode === 'encode' ? '原始图像' : '潜空间表示' }}</div>
          <div class="stage-visual">
            <canvas
              ref="inputCanvas"
              width="200"
              height="200"
              class="stage-canvas"
            />
          </div>
          <div class="stage-info">
            <el-tag size="small" type="info">
              {{ mode === 'encode' ? '512 × 512 × 3 = 786,432 数值' : '64 × 64 × 4 = 16,384 数值' }}
            </el-tag>
          </div>
        </div>

        <!-- 箭头 -->
        <div class="arrow-stage">
          <el-icon class="flow-arrow" :size="32">
            <component :is="mode === 'encode' ? ArrowRight : ArrowLeft" />
          </el-icon>
          <div class="compression-ratio">
            <el-tag type="success" effect="dark">压缩率: 48×</el-tag>
          </div>
        </div>

        <!-- 输出侧 -->
        <div class="stage">
          <div class="stage-label">{{ mode === 'encode' ? '潜空间表示' : '重建图像' }}</div>
          <div class="stage-visual">
            <canvas
              ref="outputCanvas"
              width="200"
              height="200"
              class="stage-canvas"
            />
          </div>
          <div class="stage-info">
            <el-tag size="small" type="info">
              {{ mode === 'encode' ? '64 × 64 × 4 = 16,384 数值' : '512 × 512 × 3 = 786,432 数值' }}
            </el-tag>
          </div>
        </div>
      </div>

      <!-- 潜空间可视化 -->
      <div class="latent-viz" v-if="mode === 'encode'">
        <div class="latent-title">潜空间特征图 (4 个通道)</div>
        <div class="latent-channels">
          <div
            v-for="i in 4"
            :key="i"
            class="channel-box"
            :style="getChannelStyle(i)"
          >
            <span class="channel-label">Channel {{ i }}</span>
          </div>
        </div>
      </div>

      <div class="explanation">
        <el-alert
          :title="mode === 'encode' ? '编码：图像 → 潜空间' : '解码：潜空间 → 图像'"
          :type="mode === 'encode' ? 'warning' : 'success'"
          :description="mode === 'encode'
            ? 'VAE Encoder 将高维图像压缩到低维潜空间，保留关键语义信息，丢弃冗余细节。这就像把一本厚书浓缩成大纲。'
            : 'VAE Decoder 从潜空间表示中重建图像。虽然无法完美还原每一个细节，但足以生成高质量的图像。这就像根据大纲重写一本书。'"
          show-icon
          :closable="false"
        />
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>为什么需要 VAE？</strong>
          直接在像素空间训练扩散模型计算量太大。通过 VAE 压缩到潜空间，计算效率提升约 48 倍，同时保持图像质量。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'

const mode = ref('encode')
const inputCanvas = ref(null)
const outputCanvas = ref(null)

// 绘制示例图像
const drawSampleImage = (canvas) => {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  // 绘制一个风景图
  // 天空
  const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6)
  skyGradient.addColorStop(0, '#87CEEB')
  skyGradient.addColorStop(1, '#E0F7FA')
  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, w, h * 0.6)

  // 太阳
  ctx.beginPath()
  ctx.arc(w * 0.75, h * 0.2, w * 0.1, 0, Math.PI * 2)
  ctx.fillStyle = '#FFD700'
  ctx.fill()

  // 山
  ctx.fillStyle = '#4CAF50'
  ctx.beginPath()
  ctx.moveTo(0, h * 0.6)
  ctx.lineTo(w * 0.3, h * 0.3)
  ctx.lineTo(w * 0.7, h * 0.5)
  ctx.lineTo(w, h * 0.4)
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.fill()

  // 草地
  ctx.fillStyle = '#8BC34A'
  ctx.fillRect(0, h * 0.6, w, h * 0.4)

  // 花朵
  const colors = ['#FF69B4', '#FFD700', '#FF6347', '#9370DB']
  for (let i = 0; i < 8; i++) {
    const x = (i * w * 0.12) + 20
    const y = h * 0.75 + (i % 2) * 30
    ctx.fillStyle = colors[i % colors.length]
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()
  }
}

// 绘制潜空间表示（抽象可视化）
const drawLatentRepresentation = (canvas) => {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  // 生成噪声纹理表示潜空间
  const imageData = ctx.createImageData(w, h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      // 使用柏林噪声模拟潜空间特征
      const value = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 50 + 128
      imageData.data[i] = value + Math.random() * 30
      imageData.data[i + 1] = value + Math.random() * 30
      imageData.data[i + 2] = value + Math.random() * 30
      imageData.data[i + 3] = 255
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

// 获取通道样式
const getChannelStyle = (channel) => {
  const hues = [200, 120, 30, 280]
  return {
    background: `linear-gradient(135deg, hsl(${hues[channel - 1]}, 70%, 50%), hsl(${hues[channel - 1]}, 70%, 30%))`
  }
}

// 更新显示
const updateDisplay = () => {
  if (!inputCanvas.value || !outputCanvas.value) return

  if (mode.value === 'encode') {
    drawSampleImage(inputCanvas.value)
    drawLatentRepresentation(outputCanvas.value)
  } else {
    drawLatentRepresentation(inputCanvas.value)
    drawSampleImage(outputCanvas.value)
  }
}

onMounted(updateDisplay)
watch(mode, updateDisplay)
</script>

<style scoped>
.vae-demo {
  margin: 1rem 0;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: 600;
}

.vae-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 0;
  flex-wrap: wrap;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.stage-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.stage-visual {
  width: 200px;
  height: 200px;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--vp-c-divider);
}

.stage-canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stage-info {
  font-size: 0.75rem;
}

.arrow-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.flow-arrow {
  color: var(--vp-c-brand);
}

.compression-ratio {
  font-size: 0.8rem;
}

.latent-viz {
  margin-top: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.latent-title {
  font-weight: 500;
  margin-bottom: 12px;
  text-align: center;
}

.latent-channels {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.channel-box {
  aspect-ratio: 1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.channel-label {
  position: absolute;
  bottom: 4px;
  left: 4px;
  font-size: 0.7rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 3px;
}

.explanation {
  margin-top: 16px;
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

@media (max-width: 640px) {
  .vae-flow {
    flex-direction: column;
  }

  .arrow-stage {
    transform: rotate(90deg);
  }

  .latent-channels {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
