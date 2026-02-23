<template>
  <div class="journey-demo">
    <!-- Header -->
    <div class="demo-header">
      <span class="title">📸 照片上传的完整旅程</span>
      <span class="subtitle">从按下快门到云端备份，数据经历了什么？</span>
    </div>

    <!-- Progress Steps -->
    <div class="progress-steps">
      <div
        v-for="(step, i) in steps"
        :key="i"
        :class="['step-item', { 
          completed: currentStep > i, 
          active: currentStep === i,
          pending: currentStep < i 
        }]"
      >
        <div class="step-circle">
          <span v-if="currentStep > i">✓</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
        <div v-if="i < steps.length - 1" class="step-line"></div>
      </div>
    </div>

    <!-- Main Visualization Area -->
    <div class="visualization-area" :style="{ borderColor: currentStepData.color + '40' }">
      <!-- Stage Title -->
      <div class="stage-title-bar" :style="{ background: currentStepData.color + '15' }">
        <span class="stage-icon">{{ currentStepData.icon }}</span>
        <span class="stage-name">{{ currentStepData.stageName }}</span>
        <span class="stage-status" :style="{ color: currentStepData.color }">{{ stageStatus }}</span>
      </div>

      <!-- Flow Visualization -->
      <div class="flow-visualization">
        <div class="flow-container">
          <div
            v-for="(actor, i) in currentStepData.actors"
            :key="i"
            class="flow-node"
            :class="{ 
              active: isNodeActive(i), 
              completed: isNodeCompleted(i),
              processing: isNodeProcessing(i)
            }"
          >
            <div class="node-icon">{{ actor.icon }}</div>
            <div class="node-content">
              <div class="node-name">{{ actor.name }}</div>
              <div v-if="actor.value" class="node-value">{{ actor.value }}</div>
            </div>
            <div v-if="i < currentStepData.actors.length - 1" class="node-arrow">
              <span class="arrow-line" :class="{ animated: isArrowActive(i) }"></span>
              <span class="arrow-head" :class="{ animated: isArrowActive(i) }">▶</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Panel -->
      <div class="detail-panel">
        <div class="detail-header">
          <span class="detail-title">{{ currentStepData.title }}</span>
        </div>
        <div class="detail-content">
          <div
            v-for="(point, i) in currentStepData.points"
            :key="i"
            class="detail-point"
            :class="{ visible: isPointVisible(i), highlight: isPointHighlight(i) }"
          >
            <span class="point-bullet" :style="{ background: currentStepData.color }">{{ i + 1 }}</span>
            <span class="point-text">{{ point }}</span>
          </div>
        </div>
        <div 
          v-if="currentInsight" 
          class="insight-box"
          :class="{ visible: showInsight }"
          :style="{ borderLeftColor: currentStepData.color }"
        >
          <span class="insight-icon">💡</span>
          <span class="insight-text">{{ currentInsight }}</span>
        </div>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="control-panel">
      <button 
        class="ctrl-btn secondary" 
        :disabled="currentStep === 0 && stepPhase === 'idle'" 
        @click="handlePrev"
      >
        ← 上一步
      </button>
      
      <button 
        class="ctrl-btn primary" 
        :disabled="isAnimating" 
        @click="handleMainAction"
      >
        <span v-if="isAnimating" class="btn-loading">
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
        </span>
        <span v-else>{{ mainButtonText }}</span>
      </button>
      
      <button 
        class="ctrl-btn secondary" 
        :disabled="currentStep >= steps.length - 1 && stepPhase === 'completed'" 
        @click="handleNext"
      >
        {{ currentStep >= steps.length - 1 && stepPhase === 'completed' ? '完成 ✓' : '下一步 →' }}
      </button>
    </div>

    <!-- Summary Panel (shown when all completed) -->
    <div v-if="allCompleted" class="summary-panel">
      <div class="summary-title">🎯 三步协同，完成数据旅程</div>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-icon">🔢</span>
          <span class="summary-label">编码</span>
          <span class="summary-desc">把光信号翻译成数字</span>
        </div>
        <div class="summary-item">
          <span class="summary-icon">💾</span>
          <span class="summary-label">存储</span>
          <span class="summary-desc">先内存缓冲，再持久写入</span>
        </div>
        <div class="summary-item">
          <span class="summary-icon">📡</span>
          <span class="summary-label">传输</span>
          <span class="summary-desc">分包加密，可靠送达</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentStep = ref(0)
const stepPhase = ref('idle') // idle, animating, completed
const visiblePoints = ref([])
const showInsight = ref(false)
const allCompleted = ref(false)

const steps = [
  {
    label: '编码',
    stageName: '编码阶段',
    icon: '🔢',
    title: '第一步：编码 — 把光变成数字',
    color: '#7c3aed',
    actors: [
      { icon: '☀️', name: '光线', value: '物理信号' },
      { icon: '📷', name: '传感器', value: 'CMOS/CCD' },
      { icon: '📊', name: 'RAW 数据', value: '24MB / 4860万像素' },
      { icon: '🗜️', name: 'JPEG 压缩', value: '有损压缩' },
      { icon: '📄', name: 'JPEG 文件', value: '3.2MB' }
    ],
    points: [
      '相机传感器把光信号转换成 RGB 数值（每个像素 3 × 8 bit = 24 bit）',
      '整张照片 4860 万像素 × 24 bit ≈ 140 MB 的原始数据',
      'JPEG 算法分析像素相似性，去掉人眼不敏感的信息，压缩到 3 MB'
    ],
    insight: '压缩 ≠ 降质，好的压缩算法让你几乎看不出差别，但文件小了 97%。'
  },
  {
    label: '存储',
    stageName: '存储阶段',
    icon: '💾',
    title: '第二步：存储 — 先内存后闪存',
    color: '#059669',
    actors: [
      { icon: '📄', name: 'JPEG（已编码）', value: '3.2 MB' },
      { icon: '🧠', name: 'RAM（内存）', value: '写入 ~1 ms' },
      { icon: '💾', name: '闪存（Flash）', value: '写入 ~10 ms' }
    ],
    points: [
      '⚡ 图像先写进内存（RAM）——速度极快，但断电消失',
      '💾 内存中的数据再异步写入闪存（手机存储）——速度慢一些，但永久保存',
      '🔒 写完后操作系统标记文件"安全"，你才能看到相册里的新照片'
    ],
    insight: '为什么拍完不能马上拔电池？因为数据可能还在内存里，还没写进闪存！'
  },
  {
    label: '传输',
    stageName: '传输阶段',
    icon: '📡',
    title: '第三步：传输 — 数据"旅行"到云端',
    color: '#d97706',
    actors: [
      { icon: '💾', name: '闪存（JPEG）', value: '3.2 MB' },
      { icon: '📶', name: 'Wi-Fi / 4G', value: 'TCP 分包传输' },
      { icon: '☁️', name: '云端服务器', value: '写入云存储' }
    ],
    points: [
      '📦 3.2 MB 的 JPEG 文件被 TCP 协议切成数千个小"数据包"',
      '🔐 每个包都有序号和校验码，丢了会自动重传——所以传输是可靠的',
      '☁️ 云端收齐所有包，重新拼成完整 JPEG，写入对象存储（如 OSS/S3）'
    ],
    insight: '上传时你以为数据是"整个发过去"的，其实是"切碎了一片片送过去"。'
  }
]

const currentStepData = computed(() => steps[currentStep.value])

const isAnimating = computed(() => stepPhase.value === 'animating')

const stageStatus = computed(() => {
  if (stepPhase.value === 'idle') return '等待执行'
  if (stepPhase.value === 'animating') return '执行中...'
  return '已完成'
})

const mainButtonText = computed(() => {
  if (allCompleted.value) return '🔄 重新演示'
  if (stepPhase.value === 'completed') return '✓ 已完成，点击下一步'
  return '▶ 执行这一步'
})

const currentInsight = computed(() => {
  if (stepPhase.value === 'completed') {
    return currentStepData.value.insight
  }
  return ''
})

// Node state helpers
function isNodeActive(index) {
  if (stepPhase.value === 'idle') return index === 0
  if (stepPhase.value === 'animating') {
    const progress = visiblePoints.value.length / currentStepData.value.points.length
    const nodeProgress = (index + 1) / currentStepData.value.actors.length
    return nodeProgress <= progress + 0.2
  }
  return true
}

function isNodeCompleted(index) {
  if (stepPhase.value === 'completed') return true
  if (stepPhase.value === 'animating') {
    const progress = visiblePoints.value.length / currentStepData.value.points.length
    const nodeProgress = (index + 1) / currentStepData.value.actors.length
    return nodeProgress < progress
  }
  return false
}

function isNodeProcessing(index) {
  if (stepPhase.value !== 'animating') return false
  const progress = visiblePoints.value.length / currentStepData.value.points.length
  const nodeProgress = (index + 1) / currentStepData.value.actors.length
  return Math.abs(nodeProgress - progress) < 0.3
}

function isArrowActive(index) {
  if (stepPhase.value === 'idle') return false
  if (stepPhase.value === 'completed') return true
  const progress = visiblePoints.value.length / currentStepData.value.points.length
  const arrowProgress = (index + 1) / (currentStepData.value.actors.length - 1)
  return arrowProgress <= progress
}

function isPointVisible(index) {
  return visiblePoints.value.includes(index)
}

function isPointHighlight(index) {
  if (stepPhase.value !== 'animating') return false
  return visiblePoints.value.length === index + 1
}

// Actions
async function handleMainAction() {
  if (allCompleted.value) {
    resetDemo()
    return
  }
  
  if (stepPhase.value === 'completed') {
    // If already completed, move to next step
    if (currentStep.value < steps.length - 1) {
      goToStep(currentStep.value + 1)
    }
    return
  }
  
  // Start animation
  await runCurrentStep()
}

async function runCurrentStep() {
  stepPhase.value = 'animating'
  visiblePoints.value = []
  showInsight.value = false
  
  const pts = currentStepData.value.points
  for (let i = 0; i < pts.length; i++) {
    await new Promise(r => setTimeout(r, 800))
    visiblePoints.value.push(i)
  }
  
  // Show insight after all points
  await new Promise(r => setTimeout(r, 400))
  showInsight.value = true
  
  stepPhase.value = 'completed'
  
  // Check if all steps completed
  if (currentStep.value === steps.length - 1) {
    allCompleted.value = true
  }
}

function handlePrev() {
  if (stepPhase.value === 'idle' && currentStep.value > 0) {
    goToStep(currentStep.value - 1)
  } else {
    // Reset current step
    stepPhase.value = 'idle'
    visiblePoints.value = []
    showInsight.value = false
  }
}

function handleNext() {
  if (currentStep.value < steps.length - 1) {
    goToStep(currentStep.value + 1)
  }
}

function goToStep(index) {
  currentStep.value = index
  stepPhase.value = 'idle'
  visiblePoints.value = []
  showInsight.value = false
  if (index < steps.length - 1) {
    allCompleted.value = false
  }
}

function resetDemo() {
  currentStep.value = 0
  stepPhase.value = 'idle'
  visiblePoints.value = []
  showInsight.value = false
  allCompleted.value = false
}

// Watch for step changes to reset state
watch(currentStep, () => {
  stepPhase.value = 'idle'
  visiblePoints.value = []
  showInsight.value = false
})
</script>

<style scoped>
.journey-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

/* Header */
.demo-header {
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.25rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* Progress Steps */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  max-width: 120px;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.step-item.active .step-circle {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
  transform: scale(1.1);
}

.step-item.completed .step-circle {
  background: var(--vp-c-success);
  border-color: var(--vp-c-success);
  color: white;
}

.step-label {
  font-size: 0.8rem;
  margin-top: 0.4rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  transition: all 0.3s;
}

.step-item.active .step-label {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.step-item.completed .step-label {
  color: var(--vp-c-success);
}

.step-line {
  position: absolute;
  top: 16px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: var(--vp-c-divider);
  transform: translateY(-50%);
  z-index: 0;
  transition: background 0.3s;
}

.step-item.completed .step-line {
  background: var(--vp-c-success);
}

/* Visualization Area */
.visualization-area {
  background: var(--vp-c-bg);
  border: 2px solid;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: border-color 0.4s ease;
}

.stage-title-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stage-icon {
  font-size: 1.3rem;
}

.stage-name {
  font-weight: 600;
  font-size: 0.95rem;
  flex: 1;
}

.stage-status {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

/* Flow Visualization */
.flow-visualization {
  padding: 1.5rem 1rem;
  background: var(--vp-c-bg-soft);
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  min-width: 90px;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
}

.flow-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flow-node.completed {
  border-color: var(--vp-c-success);
  background: var(--vp-c-success-soft);
}

.flow-node.processing {
  animation: pulse-node 1.5s ease-in-out infinite;
}

@keyframes pulse-node {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--vp-c-brand-rgb), 0.4);
  }
  50% { 
    transform: scale(1.02);
    box-shadow: 0 0 0 8px rgba(var(--vp-c-brand-rgb), 0);
  }
}

.node-icon {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
}

.node-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.node-value {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

.node-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.25rem;
}

.arrow-line {
  width: 30px;
  height: 2px;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}

.arrow-line.animated {
  background: var(--vp-c-brand);
  animation: flow-line 1s ease-in-out infinite;
}

@keyframes flow-line {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

.arrow-head {
  font-size: 0.7rem;
  color: var(--vp-c-divider);
  margin-top: -2px;
  transition: color 0.3s;
}

.arrow-head.animated {
  color: var(--vp-c-brand);
}

/* Detail Panel */
.detail-panel {
  padding: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-header {
  margin-bottom: 0.75rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.detail-point {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.85rem;
  line-height: 1.5;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s ease;
}

.detail-point.visible {
  opacity: 1;
  transform: translateX(0);
}

.detail-point.highlight {
  background: var(--vp-c-brand-soft);
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  margin: 0 -0.3rem;
}

.point-bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.point-text {
  color: var(--vp-c-text-1);
  flex: 1;
}

/* Insight Box */
.insight-box {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid;
  border-radius: 0 6px 6px 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.insight-box.visible {
  opacity: 1;
  transform: translateY(0);
}

.insight-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.insight-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  line-height: 1.5;
}

/* Control Panel */
.control-panel {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
}

.ctrl-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.ctrl-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ctrl-btn:active:not(:disabled) {
  transform: translateY(0);
}

.ctrl-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  flex: 1;
  max-width: 200px;
}

.ctrl-btn.primary:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.ctrl-btn.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.ctrl-btn.secondary:hover:not(:disabled) {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand);
}

.ctrl-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading Animation */
.btn-loading {
  display: flex;
  gap: 4px;
}

.loading-dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: loading-bounce 1.4s ease-in-out infinite both;
}

.loading-dot:nth-child(1) { animation-delay: -0.32s; }
.loading-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes loading-bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Summary Panel */
.summary-panel {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: var(--vp-c-success-soft);
  border: 1px solid var(--vp-c-success);
  border-radius: 10px;
  animation: fade-in-up 0.5s ease;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-success);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.summary-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.summary-label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.summary-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Responsive */
@media (max-width: 640px) {
  .journey-demo {
    padding: 1rem;
  }
  
  .progress-steps {
    padding: 0;
  }
  
  .step-label {
    font-size: 0.7rem;
  }
  
  .flow-container {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .flow-node {
    flex-direction: row;
    width: 100%;
    min-width: auto;
    text-align: left;
    gap: 0.75rem;
  }
  
  .node-arrow {
    transform: rotate(90deg);
    margin: 0.25rem 0;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .control-panel {
    flex-direction: column;
  }
  
  .ctrl-btn {
    width: 100%;
    max-width: none;
  }
}
</style>
