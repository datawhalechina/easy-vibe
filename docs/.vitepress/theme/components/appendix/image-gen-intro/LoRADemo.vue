<!--
  LoRADemo.vue
  LoRA 微调演示组件

  用途：
  展示 LoRA (Low-Rank Adaptation) 如何以轻量级方式微调模型，实现特定风格或角色的生成。

  交互功能：
  - LoRA 权重调节
  - 基础模型 + LoRA 组合展示
  - 对比不同权重的生成效果
  - LoRA 融合可视化
-->
<template>
  <div class="lora-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Collection /></el-icon>
          <span>🎨 LoRA：轻量级微调</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- LoRA 概念说明 -->
        <div class="concept-section">
          <div class="concept-visual">
            <div class="model-box base">
              <div class="box-title">基础模型</div>
              <div class="box-size">4-8 GB</div>
              <div class="box-desc">通用知识</div>
            </div>
            <div class="plus-sign">+</div>
            <div class="model-box lora">
              <div class="box-title">LoRA 权重</div>
              <div class="box-size">50-200 MB</div>
              <div class="box-desc">特定风格/角色</div>
            </div>
            <div class="equals-sign">=</div>
            <div class="model-box result">
              <div class="box-title">定制模型</div>
              <div class="box-size">无需合并</div>
              <div class="box-desc">动态加载</div>
            </div>
          </div>
        </div>

        <!-- LoRA 权重调节 -->
        <div class="weight-control-section">
          <div class="weight-header">
            <span>LoRA 权重调节</span>
            <el-tag type="primary" effect="dark">{{ loraWeight }}</el-tag>
          </div>
          <el-slider
            v-model="loraWeight"
            :min="0"
            :max="1.5"
            :step="0.1"
            show-stops
            :marks="{
              0: '无效果',
              0.5: '轻微',
              1: '标准',
              1.5: '强烈'
            }"
          />

          <div class="lora-selector">
            <el-radio-group v-model="selectedLoRA">
              <el-radio-button label="anime">动漫风格</el-radio-button>
              <el-radio-button label="realistic">写实风格</el-radio-button>
              <el-radio-button label="sketch">素描风格</el-radio-button>
              <el-radio-button label="3d">3D 风格</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 效果对比 -->
        <div class="comparison-section">
          <div class="comparison-title">生成效果对比</div>
          <div class="comparison-grid">
            <div class="comparison-item">
              <div class="item-label">
                <el-tag type="info">仅基础模型</el-tag>
              </div>
              <canvas
                ref="baseCanvas"
                width="200"
                height="200"
                class="comparison-canvas"
              />
              <div class="item-desc">通用风格</div>
            </div>

            <div class="comparison-item main">
              <div class="item-label">
                <el-tag type="success">基础 + LoRA ({{ loraWeight }})</el-tag>
              </div>
              <canvas
                ref="loraCanvas"
                width="200"
                height="200"
                class="comparison-canvas main-canvas"
              />
              <div class="item-desc">{{ getLoRADescription() }}</div>
            </div>
          </div>
        </div>

        <!-- 多 LoRA 融合 -->
        <div class="fusion-section">
          <div class="fusion-title">🔀 多 LoRA 融合</div>
          <div class="fusion-controls">
            <div
              v-for="(lora, index) in activeLoRAs"
              :key="index"
              class="fusion-item"
            >
              <el-tag :type="lora.type" closable @close="removeLoRA(index)">
                {{ lora.name }}
              </el-tag>
              <el-slider
                v-model="lora.weight"
                :min="0"
                :max="1"
                :step="0.1"
                size="small"
                style="width: 120px"
              />
              <span class="weight-display">{{ lora.weight }}</span>
            </div>
            <el-dropdown @command="addLoRA">
              <el-button type="primary" size="small">
                <el-icon><Plus /></el-icon> 添加 LoRA
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="anime">动漫风格</el-dropdown-item>
                  <el-dropdown-item command="realistic">写实风格</el-dropdown-item>
                  <el-dropdown-item command="sketch">素描风格</el-dropdown-item>
                  <el-dropdown-item command="3d">3D 风格</el-dropdown-item>
                  <el-dropdown-item command="watercolor">水彩风格</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <div class="fusion-result">
            <canvas
              ref="fusionCanvas"
              width="250"
              height="250"
              class="fusion-canvas"
            />
            <div class="fusion-formula">
              <div class="formula-title">融合公式</div>
              <div class="formula-content">
                输出 = 基础模型 + Σ(LoRAᵢ × 权重ᵢ)
              </div>
            </div>
          </div>
        </div>

        <!-- 应用场景 -->
        <div class="use-cases">
          <div class="use-cases-title">🎯 LoRA 典型应用</div>
          <div class="use-cases-grid">
            <div class="use-case-card">
              <div class="use-case-icon">👤</div>
              <div class="use-case-title">角色一致性</div>
              <div class="use-case-desc">训练特定角色，保持形象一致</div>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">🎨</div>
              <div class="use-case-title">艺术风格</div>
              <div class="use-case-desc">模仿特定画家或艺术风格</div>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">👗</div>
              <div class="use-case-title">服装概念</div>
              <div class="use-case-desc">特定服装或配饰设计</div>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">🏢</div>
              <div class="use-case-title">产品展示</div>
              <div class="use-case-desc">特定产品或品牌风格</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>LoRA 原理：</strong>
          LoRA 通过在原始权重矩阵旁边添加低秩矩阵来进行微调，只训练少量参数（通常 < 1%），就能实现特定风格或角色的学习。相比完整微调，LoRA 文件小、训练快、可组合使用。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Collection, Plus } from '@element-plus/icons-vue'

const loraWeight = ref(0.8)
const selectedLoRA = ref('anime')

const baseCanvas = ref(null)
const loraCanvas = ref(null)
const fusionCanvas = ref(null)

const activeLoRAs = ref([
  { name: '动漫风格', type: 'primary', weight: 0.6 },
  { name: '水彩效果', type: 'success', weight: 0.3 }
])

const loraTypes = {
  anime: { name: '动漫风格', type: 'primary', color: '#FFB6C1' },
  realistic: { name: '写实风格', type: 'success', color: '#DDA0DD' },
  sketch: { name: '素描风格', type: 'warning', color: '#D3D3D3' },
  '3d': { name: '3D 风格', type: 'danger', color: '#87CEEB' },
  watercolor: { name: '水彩效果', type: 'info', color: '#98FB98' }
}

const getLoRADescription = () => {
  const descriptions = {
    anime: '大眼睛、鲜明色彩的动漫风格',
    realistic: '照片级真实感',
    sketch: '手绘线条和阴影',
    '3d': '立体感和材质渲染',
    watercolor: '柔和的水彩晕染效果'
  }
  return descriptions[selectedLoRA.value] || ''
}

const addLoRA = (command) => {
  const loraInfo = loraTypes[command]
  if (loraInfo) {
    activeLoRAs.value.push({
      name: loraInfo.name,
      type: loraInfo.type,
      weight: 0.5
    })
  }
}

const removeLoRA = (index) => {
  activeLoRAs.value.splice(index, 1)
}

// 绘制基础图像
const drawBaseImage = (ctx, width, height) => {
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, width, height)

  // 绘制一个简单的角色轮廓
  ctx.strokeStyle = '#666'
  ctx.lineWidth = 2

  // 头部
  ctx.beginPath()
  ctx.arc(width * 0.5, height * 0.3, width * 0.2, 0, Math.PI * 2)
  ctx.stroke()

  // 身体
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.5)
  ctx.lineTo(width * 0.5, height * 0.8)
  ctx.stroke()

  // 手臂
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.55)
  ctx.lineTo(width * 0.25, height * 0.7)
  ctx.moveTo(width * 0.5, height * 0.55)
  ctx.lineTo(width * 0.75, height * 0.7)
  ctx.stroke()
}

// 绘制 LoRA 效果
const drawLoRAImage = (ctx, width, height, loraType, weight) => {
  // 先画基础
  drawBaseImage(ctx, width, height)

  // 根据 LoRA 类型添加效果
  const effects = {
    anime: () => {
      // 动漫风格：大眼睛、鲜艳色彩
      ctx.fillStyle = `rgba(255, 182, 193, ${weight * 0.5})`
      ctx.fillRect(0, 0, width, height)

      // 大眼睛
      ctx.fillStyle = `rgba(100, 149, 237, ${weight})`
      ctx.beginPath()
      ctx.ellipse(width * 0.42, height * 0.28, width * 0.08 * weight, width * 0.1 * weight, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(width * 0.58, height * 0.28, width * 0.08 * weight, width * 0.1 * weight, 0, 0, Math.PI * 2)
      ctx.fill()
    },
    realistic: () => {
      // 写实风格：阴影、细节
      ctx.fillStyle = `rgba(139, 69, 19, ${weight * 0.3})`
      ctx.fillRect(0, 0, width, height)

      // 添加阴影
      ctx.fillStyle = `rgba(0, 0, 0, ${weight * 0.2})`
      ctx.beginPath()
      ctx.ellipse(width * 0.5, height * 0.85, width * 0.3, height * 0.05, 0, 0, Math.PI * 2)
      ctx.fill()
    },
    sketch: () => {
      // 素描风格：线条、交叉阴影
      ctx.strokeStyle = `rgba(0, 0, 0, ${weight * 0.5})`
      ctx.lineWidth = 1
      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * height * 0.1)
        ctx.lineTo(width, i * height * 0.1 + height * 0.1)
        ctx.stroke()
      }
    },
    '3d': () => {
      // 3D 风格：渐变、立体感
      const gradient = ctx.createRadialGradient(
        width * 0.3, height * 0.3, 0,
        width * 0.5, height * 0.5, width * 0.6
      )
      gradient.addColorStop(0, `rgba(255, 255, 255, ${weight * 0.5})`)
      gradient.addColorStop(1, `rgba(0, 0, 0, ${weight * 0.2})`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }
  }

  if (effects[loraType]) {
    effects[loraType]()
  }
}

// 绘制融合效果
const drawFusionImage = (ctx, width, height) => {
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, width, height)

  // 基础图像
  drawBaseImage(ctx, width, height)

  // 叠加所有 LoRA 效果
  activeLoRAs.value.forEach(lora => {
    const loraKey = Object.keys(loraTypes).find(
      key => loraTypes[key].name === lora.name
    )
    if (loraKey) {
      ctx.save()
      ctx.globalAlpha = lora.weight
      drawLoRAImage(ctx, width, height, loraKey, 1)
      ctx.restore()
    }
  })
}

const updateDisplay = () => {
  if (baseCanvas.value) {
    const ctx = baseCanvas.value.getContext('2d')
    drawBaseImage(ctx, 200, 200)
  }

  if (loraCanvas.value) {
    const ctx = loraCanvas.value.getContext('2d')
    drawLoRAImage(ctx, 200, 200, selectedLoRA.value, loraWeight.value)
  }

  if (fusionCanvas.value) {
    const ctx = fusionCanvas.value.getContext('2d')
    drawFusionImage(ctx, 250, 250)
  }
}

onMounted(updateDisplay)
watch([loraWeight, selectedLoRA, activeLoRAs], updateDisplay, { deep: true })
</script>

<style scoped>
.lora-demo {
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

.concept-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.concept-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.model-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px 24px;
  text-align: center;
  border: 2px solid var(--vp-c-divider);
  min-width: 120px;
}

.model-box.base {
  border-color: #409eff;
}

.model-box.lora {
  border-color: #67c23a;
}

.model-box.result {
  border-color: #e6a23c;
}

.box-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.box-size {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.box-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.plus-sign, .equals-sign {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.weight-control-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.weight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.lora-selector {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.comparison-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.comparison-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.comparison-grid {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.comparison-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.comparison-item.main {
  transform: scale(1.1);
}

.item-label {
  font-weight: 500;
}

.comparison-canvas {
  width: 160px;
  height: 160px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
}

.comparison-canvas.main-canvas {
  border-color: var(--vp-c-brand);
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.fusion-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.fusion-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.fusion-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
}

.fusion-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 6px;
}

.weight-display {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  min-width: 40px;
}

.fusion-result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.fusion-canvas {
  width: 200px;
  height: 200px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-brand);
}

.fusion-formula {
  text-align: center;
}

.formula-title {
  font-weight: 500;
  margin-bottom: 8px;
}

.formula-content {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
}

.use-cases {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.use-cases-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.use-case-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.use-case-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.use-case-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.use-case-desc {
  font-size: 0.75rem;
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
</style>
