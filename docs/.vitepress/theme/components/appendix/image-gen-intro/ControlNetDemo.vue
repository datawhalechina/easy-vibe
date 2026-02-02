<!--
  ControlNetDemo.vue
  ControlNet 控制网络演示组件

  用途：
  展示 ControlNet 如何精确控制图像生成，包括姿态、边缘、深度等控制方式。

  交互功能：
  - 不同控制类型切换
  - 控制强度调节
  - 可视化控制信号
  - 对比有无 ControlNet 的效果
-->
<template>
  <div class="controlnet-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Pointer /></el-icon>
          <span>🎮 ControlNet：精确控制</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- 控制类型选择 -->
        <div class="control-types">
          <div
            v-for="control in controlTypes"
            :key="control.id"
            class="control-card"
            :class="{ active: selectedControl === control.id }"
            @click="selectedControl = control.id"
          >
            <div class="control-icon">{{ control.icon }}</div>
            <div class="control-name">{{ control.name }}</div>
            <div class="control-desc">{{ control.description }}</div>
          </div>
        </div>

        <!-- 可视化流程 -->
        <div class="workflow-viz">
          <div class="workflow-step">
            <div class="step-label">输入图像</div>
            <canvas
              ref="inputCanvas"
              width="200"
              height="200"
              class="workflow-canvas"
            />
          </div>

          <div class="workflow-arrow">
            <el-icon :size="24"><ArrowRight /></el-icon>
            <div class="arrow-label">提取</div>
          </div>

          <div class="workflow-step">
            <div class="step-label">控制信号</div>
            <canvas
              ref="controlCanvas"
              width="200"
              height="200"
              class="workflow-canvas control-signal"
            />
          </div>

          <div class="workflow-arrow">
            <el-icon :size="24"><ArrowRight /></el-icon>
            <div class="arrow-label">+ 提示词</div>
          </div>

          <div class="workflow-step">
            <div class="step-label">生成结果</div>
            <canvas
              ref="outputCanvas"
              width="200"
              height="200"
              class="workflow-canvas"
            />
          </div>
        </div>

        <!-- 控制强度 -->
        <div class="strength-control">
          <div class="strength-header">
            <span>控制强度 (Control Strength)</span>
            <el-tag type="primary" effect="dark">{{ controlStrength }}</el-tag>
          </div>
          <el-slider
            v-model="controlStrength"
            :min="0"
            :max="2"
            :step="0.1"
            show-stops
            :marks="{
              0: '无控制',
              1: '平衡',
              2: '强控制'
            }"
          />
          <div class="strength-desc">
            {{ getStrengthDescription() }}
          </div>
        </div>

        <!-- 对比展示 -->
        <div class="comparison-section">
          <div class="comparison-title">对比：有无 ControlNet</div>
          <div class="comparison-grid">
            <div class="comparison-item">
              <div class="item-label">
                <el-tag type="info">仅文本生成</el-tag>
              </div>
              <canvas
                ref="textOnlyCanvas"
                width="180"
                height="180"
                class="comparison-canvas"
              />
              <div class="item-desc">姿态随机，不可控</div>
            </div>

            <div class="comparison-item">
              <div class="item-label">
                <el-tag type="success">ControlNet 控制</el-tag>
              </div>
              <canvas
                ref="controlNetCanvas"
                width="180"
                height="180"
                class="comparison-canvas"
              />
              <div class="item-desc">姿态精确匹配输入</div>
            </div>
          </div>
        </div>

        <!-- 应用场景 -->
        <div class="use-cases">
          <div class="use-cases-title">🎯 典型应用场景</div>
          <div class="use-cases-grid">
            <div
              v-for="useCase in useCases"
              :key="useCase.title"
              class="use-case-card"
            >
              <div class="use-case-icon">{{ useCase.icon }}</div>
              <div class="use-case-title">{{ useCase.title }}</div>
              <div class="use-case-desc">{{ useCase.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>ControlNet 原理：</strong>
          ControlNet 是一个附加在扩散模型上的神经网络，它学习从输入图像中提取特定的结构信息（如姿态、边缘），并用这些信息引导生成过程，实现精确控制。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Pointer, ArrowRight } from '@element-plus/icons-vue'

const selectedControl = ref('pose')
const controlStrength = ref(1.0)

const inputCanvas = ref(null)
const controlCanvas = ref(null)
const outputCanvas = ref(null)
const textOnlyCanvas = ref(null)
const controlNetCanvas = ref(null)

const controlTypes = [
  {
    id: 'pose',
    name: 'OpenPose',
    icon: '🕺',
    description: '姿态控制，提取人体骨骼关键点'
  },
  {
    id: 'canny',
    name: 'Canny',
    icon: '✏️',
    description: '边缘检测，提取图像轮廓'
  },
  {
    id: 'depth',
    name: 'Depth',
    icon: '📐',
    description: '深度估计，控制空间结构'
  },
  {
    id: 'scribble',
    name: 'Scribble',
    icon: '🎨',
    description: '涂鸦控制，手绘引导生成'
  },
  {
    id: 'segmentation',
    name: 'Segmentation',
    icon: '🧩',
    description: '语义分割，控制物体布局'
  }
]

const useCases = [
  {
    icon: '👗',
    title: '虚拟试衣',
    description: '保持人物姿态，更换服装款式'
  },
  {
    icon: '🏠',
    title: '室内设计',
    description: '基于房间结构，生成不同装修风格'
  },
  {
    icon: '🎭',
    title: '角色一致性',
    description: '保持角色姿态，改变服装或场景'
  },
  {
    icon: '📐',
    title: '产品展示',
    description: '固定产品角度，变换背景和光照'
  }
]

const getStrengthDescription = () => {
  if (controlStrength.value < 0.5) {
    return '控制较弱，生成结果更自由，但可能偏离预期结构'
  } else if (controlStrength.value < 1.5) {
    return '平衡模式，在遵循控制和保持创意之间取得平衡'
  } else {
    return '强控制模式，严格遵循输入结构，但可能牺牲一些图像质量'
  }
}

// 绘制姿态骨架
const drawPoseSkeleton = (ctx, width, height, isControl = false) => {
  ctx.clearRect(0, 0, width, height)

  if (isControl) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#0f0'
    ctx.fillStyle = '#0f0'
  } else {
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#333'
    ctx.fillStyle = '#333'
  }

  ctx.lineWidth = isControl ? 3 : 2

  // 头部
  ctx.beginPath()
  ctx.arc(width * 0.5, height * 0.15, width * 0.08, 0, Math.PI * 2)
  ctx.stroke()

  // 身体
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.23)
  ctx.lineTo(width * 0.5, height * 0.5)
  ctx.stroke()

  // 左臂
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.3)
  ctx.lineTo(width * 0.25, height * 0.4)
  ctx.stroke()

  // 右臂
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.3)
  ctx.lineTo(width * 0.75, height * 0.35)
  ctx.stroke()

  // 左腿
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.5)
  ctx.lineTo(width * 0.35, height * 0.8)
  ctx.stroke()

  // 右腿
  ctx.beginPath()
  ctx.moveTo(width * 0.5, height * 0.5)
  ctx.lineTo(width * 0.65, height * 0.75)
  ctx.stroke()

  // 关节点
  const joints = [
    [0.5, 0.23], [0.5, 0.3], [0.5, 0.5],
    [0.25, 0.4], [0.75, 0.35],
    [0.35, 0.8], [0.65, 0.75]
  ]

  joints.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(width * x, height * y, isControl ? 4 : 3, 0, Math.PI * 2)
    ctx.fill()
  })
}

// 绘制边缘检测
const drawCannyEdges = (ctx, width, height) => {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2

  // 绘制简单的几何形状边缘
  ctx.beginPath()
  ctx.moveTo(width * 0.2, height * 0.2)
  ctx.lineTo(width * 0.8, height * 0.2)
  ctx.lineTo(width * 0.8, height * 0.8)
  ctx.lineTo(width * 0.2, height * 0.8)
  ctx.closePath()
  ctx.stroke()

  // 内部细节
  ctx.beginPath()
  ctx.arc(width * 0.5, height * 0.5, width * 0.2, 0, Math.PI * 2)
  ctx.stroke()
}

// 绘制深度图
const drawDepthMap = (ctx, width, height) => {
  // 创建深度渐变
  const gradient = ctx.createRadialGradient(
    width * 0.5, height * 0.5, 0,
    width * 0.5, height * 0.5, width * 0.5
  )
  gradient.addColorStop(0, '#fff')
  gradient.addColorStop(0.5, '#888')
  gradient.addColorStop(1, '#000')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

// 绘制涂鸦
const drawScribble = (ctx, width, height) => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 3

  // 随机涂鸦线条
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
  }
  ctx.stroke()
}

// 绘制语义分割
const drawSegmentation = (ctx, width, height) => {
  // 天空
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, width, height * 0.4)

  // 地面
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(0, height * 0.6, width, height * 0.4)

  // 建筑
  ctx.fillStyle = '#808080'
  ctx.fillRect(width * 0.3, height * 0.2, width * 0.4, height * 0.5)

  // 树木
  ctx.fillStyle = '#228B22'
  ctx.beginPath()
  ctx.arc(width * 0.15, height * 0.5, width * 0.1, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(width * 0.85, height * 0.5, width * 0.1, 0, Math.PI * 2)
  ctx.fill()
}

// 绘制生成结果
const drawOutput = (ctx, width, height, withControl = true) => {
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, width, height)

  // 根据控制类型绘制不同的输出
  if (selectedControl.value === 'pose') {
    // 绘制一个人物，姿态与骨架匹配
    const strength = withControl ? controlStrength.value : 0.3

    // 头部
    ctx.fillStyle = '#fdbcb4'
    ctx.beginPath()
    ctx.arc(width * 0.5, height * 0.15, width * 0.08 * (0.5 + strength * 0.5), 0, Math.PI * 2)
    ctx.fill()

    // 身体
    ctx.fillStyle = '#4a90e2'
    ctx.fillRect(
      width * (0.5 - 0.08 * strength),
      height * 0.23,
      width * 0.16 * strength,
      height * 0.27
    )

    // 简单的肢体
    ctx.strokeStyle = '#fdbcb4'
    ctx.lineWidth = 8 * strength

    // 左臂
    ctx.beginPath()
    ctx.moveTo(width * 0.5, height * 0.3)
    ctx.lineTo(width * (0.25 + (0.5 - strength) * 0.3), height * 0.4)
    ctx.stroke()

    // 右臂
    ctx.beginPath()
    ctx.moveTo(width * 0.5, height * 0.3)
    ctx.lineTo(width * (0.75 - (0.5 - strength) * 0.3), height * 0.35)
    ctx.stroke()
  } else if (selectedControl.value === 'canny') {
    // 边缘控制效果
    const strength = withControl ? controlStrength.value : 0.3
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(width * 0.2, height * 0.2)
    ctx.lineTo(width * (0.8 - (1 - strength) * 0.3), height * 0.2)
    ctx.lineTo(width * 0.8, height * (0.8 - (1 - strength) * 0.2))
    ctx.lineTo(width * (0.2 + (1 - strength) * 0.3), height * 0.8)
    ctx.closePath()
    ctx.stroke()
  }
}

const updateDisplay = () => {
  // 输入图像
  if (inputCanvas.value) {
    const ctx = inputCanvas.value.getContext('2d')
    drawPoseSkeleton(ctx, 200, 200, false)
  }

  // 控制信号
  if (controlCanvas.value) {
    const ctx = controlCanvas.value.getContext('2d')
    switch (selectedControl.value) {
      case 'pose':
        drawPoseSkeleton(ctx, 200, 200, true)
        break
      case 'canny':
        drawCannyEdges(ctx, 200, 200)
        break
      case 'depth':
        drawDepthMap(ctx, 200, 200)
        break
      case 'scribble':
        drawScribble(ctx, 200, 200)
        break
      case 'segmentation':
        drawSegmentation(ctx, 200, 200)
        break
    }
  }

  // 输出
  if (outputCanvas.value) {
    const ctx = outputCanvas.value.getContext('2d')
    drawOutput(ctx, 200, 200, true)
  }

  // 对比
  if (textOnlyCanvas.value) {
    const ctx = textOnlyCanvas.value.getContext('2d')
    drawOutput(ctx, 180, 180, false)
  }

  if (controlNetCanvas.value) {
    const ctx = controlNetCanvas.value.getContext('2d')
    drawOutput(ctx, 180, 180, true)
  }
}

onMounted(updateDisplay)
watch([selectedControl, controlStrength], updateDisplay)
</script>

<style scoped>
.controlnet-demo {
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

.control-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.control-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.control-card:hover {
  border-color: var(--vp-c-brand);
}

.control-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.control-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.control-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.control-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.workflow-viz {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.workflow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.workflow-canvas {
  width: 160px;
  height: 160px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
}

.workflow-canvas.control-signal {
  background: #000;
}

.workflow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-3);
}

.arrow-label {
  font-size: 0.75rem;
}

.strength-control {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.strength-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.strength-desc {
  margin-top: 12px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
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

.item-label {
  font-weight: 500;
}

.comparison-canvas {
  width: 150px;
  height: 150px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  .workflow-viz {
    flex-direction: column;
  }

  .workflow-arrow {
    transform: rotate(90deg);
    margin: 8px 0;
  }
}
</style>
