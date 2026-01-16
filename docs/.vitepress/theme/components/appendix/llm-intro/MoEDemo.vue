<template>
  <div class="moe-demo-container">
    <!-- Header / Mode Switch -->
    <div class="demo-header">
      <div class="mode-tabs">
        <button
          v-for="mode in ['dense', 'moe']"
          :key="mode"
          :class="['mode-tab', { active: architecture === mode }]"
          @click="setArchitecture(mode)"
        >
          {{ mode === 'dense' ? 'Dense (传统模型)' : 'MoE (混合专家)' }}
        </button>
      </div>
      <div class="mode-desc">
        {{
          architecture === 'dense'
            ? '全能天才：每个问题都动用整个大脑 (100% 激活)'
            : '专家团队：根据问题指派专人处理 (稀疏激活)'
        }}
      </div>
    </div>

    <!-- Interactive Area -->
    <div class="visual-stage">
      <!-- Step 1: Input Selection -->
      <div class="stage-section input-section">
        <div class="section-label">1. 输入指令 (Input)</div>
        <div class="task-selector">
          <button
            v-for="(task, idx) in tasks"
            :key="idx"
            class="task-btn"
            :class="{ selected: selectedTask.label === task.label }"
            @click="selectTask(task)"
            :disabled="processing"
          >
            <span class="task-icon">{{ task.icon }}</span>
            <span class="task-text">{{ task.label }}</span>
          </button>
        </div>
        <div
          class="token-stream"
          :class="{ flowing: processing && currentStep >= 1 }"
        >
          <div class="token-particle">{{ selectedTask.icon }}</div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="flow-arrow">⬇️</div>

      <!-- Step 2: Processing Unit (Dense or MoE) -->
      <div class="stage-section process-section">
        <div class="section-label">
          2. 模型处理 (Processing)
          <span v-if="processing" class="status-badge">计算中...</span>
        </div>

        <!-- Dense Visualization -->
        <div v-if="architecture === 'dense'" class="dense-visualization">
          <div
            class="dense-block"
            :class="{ activating: processing && currentStep === 2 }"
          >
            <div class="dense-label">前馈神经网络 (FFN)</div>
            <div class="neuron-grid">
              <div v-for="n in 32" :key="n" class="neuron"></div>
            </div>
            <div class="activation-info" v-if="processing && currentStep === 2">
              🔥 激活率: 100% (全员过载)
            </div>
          </div>
        </div>

        <!-- MoE Visualization -->
        <div v-else class="moe-visualization">
          <!-- Router -->
          <div
            class="router-node"
            :class="{ active: processing && currentStep === 1 }"
          >
            <div class="router-label">门控路由 (Router)</div>
            <div class="router-action" v-if="processing && currentStep >= 1">
              🔍 识别意图: "{{ selectedTask.type }}"
            </div>
          </div>

          <!-- Connections -->
          <div class="connections">
            <div
              v-for="(expert, idx) in experts"
              :key="idx"
              class="connection-line"
              :class="{
                active: processing && currentStep >= 2 && isExpertSelected(idx),
                inactive:
                  processing && currentStep >= 2 && !isExpertSelected(idx)
              }"
            ></div>
          </div>

          <!-- Experts -->
          <div class="experts-grid">
            <div
              v-for="(expert, idx) in experts"
              :key="idx"
              class="expert-card"
              :class="{
                active: processing && currentStep >= 2 && isExpertSelected(idx),
                inactive:
                  processing && currentStep >= 2 && !isExpertSelected(idx)
              }"
            >
              <div class="expert-icon">{{ expert.icon }}</div>
              <div class="expert-name">{{ expert.name }}</div>
              <div class="expert-role">{{ expert.role }}</div>
              <div
                class="expert-status"
                v-if="processing && currentStep >= 2 && isExpertSelected(idx)"
              >
                ✅ 激活
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="flow-arrow">⬇️</div>

      <!-- Step 3: Output -->
      <div class="stage-section output-section">
        <div class="section-label">3. 生成结果 (Output)</div>
        <div class="output-box" :class="{ revealed: currentStep === 3 }">
          <div v-if="currentStep === 3" class="output-content">
            <span class="output-icon">{{ selectedTask.icon }}</span>
            <span class="typing-effect">{{ selectedTask.output }}</span>
          </div>
          <div v-else class="placeholder">等待处理...</div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="demo-controls">
      <button class="run-btn" @click="runDemo" :disabled="processing">
        {{ processing ? '正在推理...' : '▶️ 开始生成 (Run Inference)' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const architecture = ref('moe')
const processing = ref(false)
const currentStep = ref(0) // 0: idle, 1: router, 2: experts, 3: output

const experts = [
  { icon: '💻', name: '代码专家', role: 'Python/JS/Rust' },
  { icon: '🎨', name: '创意专家', role: '诗歌/小说/绘画' },
  { icon: '📐', name: '逻辑专家', role: '数学/推理/证明' },
  { icon: '🌍', name: '语言专家', role: '翻译/润色/摘要' }
]

const tasks = [
  {
    label: '写 Python 脚本',
    type: '编程',
    icon: '🐍',
    expertIdx: 0,
    output: 'def fib(n): return n if n < 2 else...'
  },
  {
    label: '写七言绝句',
    type: '文学',
    icon: '🌸',
    expertIdx: 1,
    output: '窗含西岭千秋雪，门泊东吴万里船...'
  },
  {
    label: '解二元方程',
    type: '数学',
    icon: '✖️',
    expertIdx: 2,
    output: 'x = 5, y = -2 (过程略)'
  },
  {
    label: '翻译成英文',
    type: '翻译',
    icon: '🔤',
    expertIdx: 3,
    output: 'To be, or not to be, that is the question.'
  }
]

const selectedTask = ref(tasks[0])

const setArchitecture = (mode) => {
  if (processing.value) return
  architecture.value = mode
  resetDemo()
}

const selectTask = (task) => {
  if (processing.value) return
  selectedTask.value = task
  resetDemo()
}

const resetDemo = () => {
  currentStep.value = 0
}

const isExpertSelected = (idx) => {
  if (architecture.value === 'dense') return true // All active in dense
  return idx === selectedTask.value.expertIdx
}

const runDemo = async () => {
  if (processing.value) return
  processing.value = true
  currentStep.value = 0

  // Step 1: Input -> Router
  await wait(300)
  currentStep.value = 1

  // Step 2: Router -> Expert / Dense Processing
  await wait(800)
  currentStep.value = 2

  // Step 3: Expert -> Output
  await wait(1200)
  currentStep.value = 3

  // Finish
  await wait(500)
  processing.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.moe-demo-container {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Header */
.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.mode-tabs {
  display: inline-flex;
  background: var(--vp-c-bg-mute);
  padding: 4px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.mode-tab {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: transparent;
}

.mode-tab.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.mode-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* Stage */
.visual-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.stage-section {
  width: 100%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  position: relative;
  transition: all 0.3s;
}

.section-label {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}

.status-badge {
  color: var(--vp-c-brand);
  font-weight: bold;
  animation: blink 1s infinite;
}

/* Input Section */
.task-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.task-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-mute);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}

.task-btn:hover {
  background: var(--vp-c-bg-soft);
}

.task-btn.selected {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
}

.token-stream {
  height: 4px;
  background: var(--vp-c-divider);
  margin-top: 12px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.token-particle {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.3s;
}

.token-stream.flowing .token-particle {
  opacity: 1;
  top: 0;
  animation: slideDown 0.5s forwards;
}

/* Process Section */
.dense-visualization {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dense-block {
  width: 80%;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s;
}

.dense-block.activating {
  background: var(--vp-c-brand);
  box-shadow: 0 0 20px var(--vp-c-brand-dimm);
}

.dense-block.activating .neuron {
  background: #fff;
  box-shadow: 0 0 4px #fff;
}

.dense-label {
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.dense-block.activating .dense-label {
  color: white;
}

.neuron-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
}

.neuron {
  width: 100%;
  padding-bottom: 100%;
  background: var(--vp-c-divider);
  border-radius: 50%;
  transition: all 0.3s;
}

.activation-info {
  margin-top: 8px;
  font-size: 12px;
  color: white;
  text-align: center;
  font-weight: bold;
}

/* MoE Visualization */
.router-node {
  background: var(--vp-c-bg-mute);
  border: 2px dashed var(--vp-c-text-3);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  margin-bottom: 12px;
  transition: all 0.3s;
}

.router-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.router-label {
  font-size: 12px;
  font-weight: bold;
}

.router-action {
  font-size: 12px;
  color: var(--vp-c-brand);
  margin-top: 4px;
}

.connections {
  display: flex;
  justify-content: space-around;
  height: 20px;
  margin-bottom: -10px; /* Overlap slightly */
  z-index: 0;
}

.connection-line {
  width: 2px;
  height: 100%;
  background: var(--vp-c-divider);
  transition: all 0.3s;
}

.connection-line.active {
  background: var(--vp-c-brand);
  box-shadow: 0 0 8px var(--vp-c-brand);
}

.experts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  position: relative;
  z-index: 1;
}

.expert-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 4px;
  text-align: center;
  transition: all 0.3s;
  opacity: 0.7;
}

.expert-card.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.expert-card.inactive {
  opacity: 0.3;
  transform: scale(0.95);
}

.expert-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.expert-name {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 2px;
}
.expert-role {
  font-size: 9px;
  color: var(--vp-c-text-3);
}
.expert-status {
  font-size: 9px;
  color: var(--vp-c-brand);
  margin-top: 4px;
  font-weight: bold;
}

/* Output Section */
.output-box {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  padding: 10px;
  transition: all 0.3s;
}

.output-box.revealed {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand);
}

.output-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
  font-size: 13px;
}

.placeholder {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-style: italic;
}

/* Controls */
.demo-controls {
  margin-top: 20px;
  text-align: center;
}

.run-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.run-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Animations */
.flow-arrow {
  text-align: center;
  color: var(--vp-c-divider);
  font-size: 18px;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
