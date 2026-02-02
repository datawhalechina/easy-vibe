<!--
  CFGScaleDemo.vue
  CFG Scale 演示组件

  用途：
  展示 Classifier-Free Guidance (CFG) Scale 如何影响生成结果，帮助用户理解提示词遵循度的概念。

  交互功能：
  - CFG Scale 滑动调节
  - 实时对比不同 CFG 值的效果
  - 可视化 CFG 对图像的影响
-->
<template>
  <div class="cfg-scale-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><ScaleToOriginal /></el-icon>
          <span>⚖️ CFG Scale：提示词遵循度</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- CFG 控制 -->
        <div class="cfg-control">
          <div class="cfg-slider-section">
            <div class="cfg-label">
              <span>CFG Scale</span>
              <el-tag type="primary" effect="dark" size="large">{{ cfgScale }}</el-tag>
            </div>
            <el-slider
              v-model="cfgScale"
              :min="1"
              :max="15"
              :step="0.5"
              show-stops
              :marks="{
                1: '1\n(自由创作)',
                7: '7\n(平衡)',
                15: '15\n(严格遵循)'
              }"
            />
          </div>

          <div class="cfg-presets">
            <el-button
              v-for="preset in cfgPresets"
              :key="preset.value"
              :type="cfgScale === preset.value ? 'primary' : ''"
              size="small"
              @click="cfgScale = preset.value"
            >
              {{ preset.label }}
            </el-button>
          </div>
        </div>

        <!-- 对比展示 -->
        <div class="comparison-display">
          <div class="comparison-item">
            <div class="item-label">
              <el-tag type="info">无条件生成</el-tag>
              <span class="cfg-value">CFG = 1</span>
            </div>
            <canvas
              ref="uncondCanvas"
              width="200"
              height="200"
              class="comparison-canvas"
            />
            <div class="item-desc">忽略提示词，自由发挥</div>
          </div>

          <div class="comparison-arrow">
            <el-icon :size="32"><ArrowRight /></el-icon>
            <div class="guidance-formula">
              <div class="formula">输出 = 无条件 + CFG × (有条件 - 无条件)</div>
              <div class="formula-desc">CFG 越大，提示词影响越强</div>
            </div>
          </div>

          <div class="comparison-item">
            <div class="item-label">
              <el-tag type="success">当前设置</el-tag>
              <span class="cfg-value">CFG = {{ cfgScale }}</span>
            </div>
            <canvas
              ref="currentCanvas"
              width="200"
              height="200"
              class="comparison-canvas"
            />
            <div class="item-desc">{{ getCfgDescription() }}</div>
          </div>
        </div>

        <!-- CFG 效果展示 -->
        <div class="cfg-effects">
          <div class="effects-title">不同 CFG 值的效果对比</div>
          <div class="effects-grid">
            <div
              v-for="effect in cfgEffects"
              :key="effect.value"
              class="effect-item"
              :class="{ active: cfgScale === effect.value }"
              @click="cfgScale = effect.value"
            >
              <canvas
                :ref="el => setEffectCanvas(el, effect.value)"
                width="120"
                height="120"
                class="effect-canvas"
              />
              <div class="effect-label">CFG {{ effect.value }}</div>
              <div class="effect-desc">{{ effect.desc }}</div>
            </div>
          </div>
        </div>

        <!-- 推荐设置 -->
        <div class="recommendations">
          <div class="rec-title">🎯 推荐设置</div>
          <div class="rec-grid">
            <div class="rec-item">
              <div class="rec-scenario">创意探索</div>
              <div class="rec-value">CFG 3-5</div>
              <div class="rec-desc">给 AI 更多自由，适合艺术探索</div>
            </div>
            <div class="rec-item">
              <div class="rec-scenario">平衡模式</div>
              <div class="rec-value">CFG 7-9</div>
              <div class="rec-desc">大多数场景的最佳选择</div>
            </div>
            <div class="rec-item">
              <div class="rec-scenario">精确控制</div>
              <div class="rec-value">CFG 12-15</div>
              <div class="rec-desc">严格遵循提示词，但可能过饱和</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>CFG Scale 原理：</strong>
          CFG (Classifier-Free Guidance) 控制生成结果对提示词的遵循程度。值越高，图像越符合提示词描述，但过高会导致图像过饱和或失真。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ScaleToOriginal, ArrowRight } from '@element-plus/icons-vue'

const cfgScale = ref(7.5)
const uncondCanvas = ref(null)
const currentCanvas = ref(null)
const effectCanvases = ref({})

const cfgPresets = [
  { label: '自由 (3)', value: 3 },
  { label: '平衡 (7)', value: 7 },
  { label: '严格 (12)', value: 12 }
]

const cfgEffects = [
  { value: 1, desc: '完全自由' },
  { value: 3, desc: '创意优先' },
  { value: 5, desc: '轻度引导' },
  { value: 7, desc: '平衡' },
  { value: 9, desc: '严格遵循' },
  { value: 12, desc: '非常严格' },
  { value: 15, desc: '过度饱和' }
]

const setEffectCanvas = (el, value) => {
  if (el) {
    effectCanvases.value[value] = el
  }
}

// 绘制目标图像
const drawTargetImage = (ctx, width, height, cfgValue) => {
  // 基础图像（提示词：一只蓝色的猫）
  const baseColor = { r: 100, g: 150, b: 200 }

  // 根据 CFG 值调整颜色饱和度
  const saturationBoost = Math.min((cfgValue - 1) / 7, 1.5)
  const color = {
    r: Math.min(255, baseColor.r + saturationBoost * 50),
    g: Math.max(0, baseColor.g - saturationBoost * 30),
    b: Math.min(255, baseColor.b + saturationBoost * 30)
  }

  // 背景
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, width, height)

  // 猫的形状
  ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`

  // 身体
  ctx.beginPath()
  ctx.ellipse(width / 2, height * 0.65, width * 0.25, height * 0.2, 0, 0, Math.PI * 2)
  ctx.fill()

  // 头
  ctx.beginPath()
  ctx.arc(width / 2, height * 0.4, width * 0.18, 0, Math.PI * 2)
  ctx.fill()

  // 耳朵
  ctx.beginPath()
  ctx.moveTo(width * 0.35, height * 0.3)
  ctx.lineTo(width * 0.3, height * 0.15)
  ctx.lineTo(width * 0.42, height * 0.25)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(width * 0.65, height * 0.3)
  ctx.lineTo(width * 0.7, height * 0.15)
  ctx.lineTo(width * 0.58, height * 0.25)
  ctx.fill()

  // 眼睛
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.ellipse(width * 0.45, height * 0.38, width * 0.05, height * 0.04, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(width * 0.55, height * 0.38, width * 0.05, height * 0.04, 0, 0, Math.PI * 2)
  ctx.fill()

  // 瞳孔
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(width * 0.45, height * 0.38, width * 0.025, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(width * 0.55, height * 0.38, width * 0.025, 0, Math.PI * 2)
  ctx.fill()

  // 添加噪声（模拟低 CFG 的自由度）
  if (cfgValue < 5) {
    const imageData = ctx.getImageData(0, 0, width, height)
    const noiseAmount = (5 - cfgValue) / 5 * 30
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * noiseAmount
      imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise))
      imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise))
      imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise))
    }
    ctx.putImageData(imageData, 0, 0)
  }

  // 添加过饱和效果（高 CFG）
  if (cfgValue > 10) {
    const imageData = ctx.getImageData(0, 0, width, height)
    const oversaturation = (cfgValue - 10) / 5
    for (let i = 0; i < imageData.data.length; i += 4) {
      // 增强对比度
      const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
      imageData.data[i] = Math.min(255, imageData.data[i] + (imageData.data[i] - avg) * oversaturation)
      imageData.data[i + 1] = Math.min(255, imageData.data[i + 1] + (imageData.data[i + 1] - avg) * oversaturation)
      imageData.data[i + 2] = Math.min(255, imageData.data[i + 2] + (imageData.data[i + 2] - avg) * oversaturation)
    }
    ctx.putImageData(imageData, 0, 0)
  }
}

const getCfgDescription = () => {
  if (cfgScale.value <= 3) return '自由创作，AI 有更多发挥空间'
  if (cfgScale.value <= 7) return '平衡模式，兼顾创意和遵循'
  if (cfgScale.value <= 10) return '严格遵循提示词'
  return '过度控制，可能导致图像失真'
}

const updateDisplay = () => {
  // 更新无条件生成
  if (uncondCanvas.value) {
    const ctx = uncondCanvas.value.getContext('2d')
    drawTargetImage(ctx, 200, 200, 1)
  }

  // 更新当前设置
  if (currentCanvas.value) {
    const ctx = currentCanvas.value.getContext('2d')
    drawTargetImage(ctx, 200, 200, cfgScale.value)
  }

  // 更新效果网格
  cfgEffects.forEach(effect => {
    const canvas = effectCanvases.value[effect.value]
    if (canvas) {
      const ctx = canvas.getContext('2d')
      drawTargetImage(ctx, 120, 120, effect.value)
    }
  })
}

onMounted(updateDisplay)
watch(cfgScale, updateDisplay)
</script>

<style scoped>
.cfg-scale-demo {
  margin: 1rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cfg-control {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.cfg-slider-section {
  margin-bottom: 16px;
}

.cfg-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.cfg-label span {
  font-weight: 500;
}

.cfg-presets {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.comparison-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.comparison-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.item-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cfg-value {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.comparison-canvas {
  width: 180px;
  height: 180px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.comparison-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--vp-c-brand);
}

.guidance-formula {
  text-align: center;
  max-width: 200px;
}

.formula {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg);
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.formula-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.cfg-effects {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.effects-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.effects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
}

.effect-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.effect-item:hover {
  border-color: var(--vp-c-brand);
}

.effect-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.effect-canvas {
  width: 100px;
  height: 100px;
  border-radius: 6px;
}

.effect-label {
  font-weight: 500;
  font-size: 0.875rem;
}

.effect-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.recommendations {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.rec-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.rec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.rec-item {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.rec-scenario {
  font-weight: 500;
  margin-bottom: 8px;
}

.rec-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
}

.rec-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
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
  .comparison-display {
    flex-direction: column;
  }

  .comparison-arrow {
    transform: rotate(90deg);
    margin: 8px 0;
  }
}
</style>
