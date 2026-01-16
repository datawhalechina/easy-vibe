<template>
  <div class="latent-space-viz">
    <el-card shadow="never">
      <div class="viz-container">
        <!-- Pixel Space -->
        <div class="space-block">
          <div class="space-header">
            <el-icon :size="20"><Picture /></el-icon>
            <span class="space-title">像素空间 (Pixel Space)</span>
          </div>
          <div class="grid-wrapper pixel-wrapper">
            <div class="pixel-grid">
              <div
                v-for="n in 256"
                :key="n"
                class="pixel-cell"
                :style="getPixelStyle(n)"
              ></div>
            </div>
            <div class="grid-overlay">
              <span>HD Image</span>
              <span class="res-tag">1024x1024</span>
            </div>
          </div>
          <div class="data-stats">
            <div class="stat-row">
              <span class="label">维度:</span>
              <span class="value">3 (RGB)</span>
            </div>
            <div class="stat-row">
              <span class="label">数据量:</span>
              <span class="value">~300万</span>
            </div>
          </div>
        </div>

        <!-- Transformation -->
        <div class="transform-process">
          <div class="process-arrow">
            <div class="vae-box">
              <span class="vae-label">VAE Encoder</span>
              <el-icon><Filter /></el-icon>
            </div>
            <el-icon :size="24" class="arrow-icon"><Right /></el-icon>
          </div>
          <el-tag type="danger" size="small" effect="dark" class="compress-tag"
            >压缩 48x</el-tag
          >
        </div>

        <!-- Latent Space -->
        <div class="space-block highlight">
          <div class="space-header">
            <el-icon :size="20" color="#E6A23C"><Cpu /></el-icon>
            <span class="space-title">潜空间 (Latent Space)</span>
          </div>
          <div class="grid-wrapper latent-wrapper">
            <div class="latent-grid">
              <div
                v-for="n in 16"
                :key="n"
                class="latent-cell"
                :style="getLatentStyle(n)"
              ></div>
            </div>
            <div class="grid-overlay">
              <span>Latent Feature</span>
              <span class="res-tag">64x64</span>
            </div>
          </div>
          <div class="data-stats">
            <div class="stat-row">
              <span class="label">维度:</span>
              <span class="value">4 (Channels)</span>
            </div>
            <div class="stat-row">
              <span class="label">数据量:</span>
              <span class="value">~1.6万</span>
            </div>
          </div>
        </div>
      </div>

      <el-divider />

      <el-row :gutter="20">
        <el-col :span="8">
          <el-statistic title="压缩比" value="1:48">
            <template #suffix>
              <el-icon style="vertical-align: -0.125em"><Scissor /></el-icon>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="16">
          <el-alert
            title="为什么要压缩？"
            type="success"
            :closable="false"
            description="直接处理 300 万个像素太慢了。VAE 把图像压缩成「压缩饼干」（潜变量），保留了核心特征（语义、构图），扔掉了冗余细节。AI 在这个小空间里画画，速度飞快！"
            show-icon
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { Picture, Cpu, Right, Filter, Scissor } from '@element-plus/icons-vue'

const getPixelStyle = (n) => {
  // Simulate a natural image with smooth color transitions
  const r = 100 + Math.sin(n * 0.1) * 50
  const g = 150 + Math.cos(n * 0.1) * 50
  const b = 200 + Math.sin(n * 0.05) * 50
  return {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    opacity: 0.8 + Math.random() * 0.2
  }
}

const getLatentStyle = (n) => {
  // Simulate high-level features (more abstract, high contrast colors)
  const hue = (n * 137) % 360
  return {
    backgroundColor: `hsl(${hue}, 70%, 60%)`,
    boxShadow: `0 0 5px hsl(${hue}, 70%, 60%)`
  }
}
</script>

<style scoped>
.latent-space-viz {
  margin: 20px 0;
}

.viz-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.space-block {
  flex: 1;
  min-width: 200px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid var(--el-border-color-lighter);
}

.space-block.highlight {
  border-color: var(--el-color-warning-light-5);
  background: var(--el-color-warning-light-9);
}

.space-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.grid-wrapper {
  position: relative;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pixel-wrapper {
  height: 160px;
}

.latent-wrapper {
  height: 100px; /* Smaller representation */
  width: 100px;
  margin: 0 auto 15px auto;
}

.pixel-grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  width: 100%;
  height: 100%;
}

.pixel-cell {
  width: 100%;
  height: 100%;
}

.latent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  gap: 2px;
  padding: 5px;
}

.latent-cell {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.grid-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.75em;
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.res-tag {
  font-family: monospace;
  opacity: 0.8;
}

.data-stats {
  font-size: 0.85em;
  color: var(--el-text-color-secondary);
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.transform-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--el-text-color-secondary);
}

.process-arrow {
  display: flex;
  align-items: center;
  gap: 5px;
}

.vae-box {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #fff;
}

.compress-tag {
  transform: scale(0.9);
}

@media (max-width: 600px) {
  .viz-container {
    flex-direction: column;
  }

  .transform-process {
    transform: rotate(90deg);
    margin: 10px 0;
  }

  .compress-tag {
    display: none; /* Hide tag when rotated to avoid layout issues */
  }
}
</style>
