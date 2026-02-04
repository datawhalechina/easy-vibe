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
            ? '全能天才：每个 Token 都激活所有神经元 (100% 激活)'
            : '专家团队：每个 Token 路由给特定专家 (Token-Level Routing)'
        }}
      </div>
    </div>

    <!-- Interactive Area -->
    <div class="visual-stage">
      <!-- Step 1: Input Selection -->
      <div class="stage-section input-section">
        <div class="section-label">1. 选择输入 (Select Input)</div>
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
      </div>

      <!-- Processing Pipeline -->
      <div class="pipeline-container">
        <!-- Token Flow Animation -->
        <div class="token-flow-viz" v-if="processing">
          <div class="current-token-display">
            <span class="token-label">Current Token:</span>
            <span class="token-badge" :style="{ borderColor: getExpertColor(currentToken?.expert) }">
              {{ currentToken?.text || '...' }}
            </span>
          </div>
        </div>

        <!-- Step 2: Processing Unit (Dense or MoE) -->
        <div class="stage-section process-section">
          <div class="section-label">
            2. 模型处理 (Processing)
            <span v-if="processing" class="status-badge">生成中...</span>
          </div>

          <!-- Dense Visualization -->
          <div v-if="architecture === 'dense'" class="dense-visualization">
            <div
              class="dense-block"
              :class="{ activating: processing && currentStep === 'expert' }"
            >
              <div class="dense-label">Dense FFN Layers</div>
              <div class="neuron-grid">
                <div v-for="n in 32" :key="n" class="neuron"></div>
              </div>
              <div class="activation-info" v-if="processing">
                🔥 激活率: 100% (All Parameters)
              </div>
            </div>
          </div>

          <!-- MoE Visualization -->
          <div v-else class="moe-visualization">
            <!-- Router -->
            <div
              class="router-node"
              :class="{ active: processing && currentStep === 'router' }"
            >
              <div class="router-label">Router (Token 分发)</div>
              <div class="router-action" v-if="processing && currentToken">
                Routing "{{ currentToken.text.trim() }}" → {{ experts[currentToken.expert].name }}
              </div>
            </div>

            <!-- Connections -->
            <div class="connections">
              <div
                v-for="(expert, idx) in experts"
                :key="idx"
                class="connection-line"
                :class="{
                  active: processing && currentStep === 'expert' && currentToken?.expert === idx,
                  inactive: processing && currentStep === 'expert' && currentToken?.expert !== idx
                }"
                :style="{
                   borderColor: processing && currentStep === 'expert' && currentToken?.expert === idx ? expert.color : ''
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
                  active: processing && currentStep === 'expert' && currentToken?.expert === idx,
                  inactive: processing && currentStep === 'expert' && currentToken?.expert !== idx
                }"
                :style="{
                   borderColor: processing && currentStep === 'expert' && currentToken?.expert === idx ? expert.color : ''
                }"
              >
                <div class="expert-icon">{{ expert.icon }}</div>
                <div class="expert-name">{{ expert.name }}</div>
                <div
                  class="expert-status"
                  v-if="processing && currentStep === 'expert' && currentToken?.expert === idx"
                  :style="{ color: expert.color }"
                >
                  ⚡ Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Output -->
      <div class="stage-section output-section">
        <div class="section-label">3. 逐步生成 (Output Stream)</div>
        <div class="output-box">
          <span class="output-content">
            <span
              v-for="(token, idx) in generatedTokens"
              :key="idx"
              class="generated-token"
              :style="{ color: architecture === 'moe' ? experts[token.expert].color : 'inherit' }"
              :title="architecture === 'moe' ? `Expert: ${experts[token.expert].name}` : ''"
            >{{ token.text }}</span>
            <span v-if="processing" class="cursor">|</span>
          </span>
          <div v-if="generatedTokens.length === 0 && !processing" class="placeholder">点击运行查看生成过程...</div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="demo-controls">
      <button class="run-btn" @click="runDemo" :disabled="processing">
        {{ processing ? '正在生成 (Generating)...' : '▶️ 开始生成 (Run Generation)' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const architecture = ref('moe')
const processing = ref(false)
const currentStep = ref('idle') // idle, router, expert
const currentToken = ref(null)
const generatedTokens = ref([])

const experts = [
  { icon: '💻', name: 'Code', color: '#059669' },     // Green
  { icon: '📐', name: 'Math', color: '#2563eb' },     // Blue
  { icon: '🎨', name: 'Creative', color: '#d97706' }, // Amber
  { icon: '📝', name: 'Grammar', color: '#7c3aed' }   // Purple
]

const tasks = [
  {
    label: 'Python 代码示例',
    icon: '🐍',
    tokens: [
      { text: 'def', expert: 0 },
      { text: ' calc', expert: 3 },
      { text: '_area', expert: 0 },
      { text: '(', expert: 3 },
      { text: 'r', expert: 0 },
      { text: '):', expert: 0 },
      { text: '\n  ', expert: 3 },
      { text: 'return', expert: 0 },
      { text: ' 3.14', expert: 1 }, // Math
      { text: ' *', expert: 1 },
      { text: ' r', expert: 0 },
      { text: ' **', expert: 1 },
      { text: ' 2', expert: 1 }
    ]
  },
  {
    label: '科幻小说片段',
    icon: '🚀',
    tokens: [
      { text: 'The', expert: 3 },
      { text: ' spaceship', expert: 2 },
      { text: ' warped', expert: 2 },
      { text: ' into', expert: 3 },
      { text: ' dimension', expert: 1 }, // Logic/Math concept
      { text: ' X', expert: 2 },
      { text: '.', expert: 3 },
      { text: ' Coordinates', expert: 1 },
      { text: ':', expert: 3 },
      { text: ' 42', expert: 1 },
      { text: '.', expert: 3 },
      { text: '00', expert: 1 }
    ]
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
  currentStep.value = 'idle'
  generatedTokens.value = []
  currentToken.value = null
}

const getExpertColor = (expertIdx) => {
  if (expertIdx === undefined || architecture.value === 'dense') return 'var(--vp-c-text-1)'
  return experts[expertIdx].color
}

const runDemo = async () => {
  if (processing.value) return
  processing.value = true
  resetDemo()

  for (const token of selectedTask.value.tokens) {
    currentToken.value = token
    
    // Step 1: Router (MoE only) or Prep (Dense)
    currentStep.value = 'router'
    await wait(architecture.value === 'moe' ? 400 : 200)

    // Step 2: Expert Processing
    currentStep.value = 'expert'
    await wait(architecture.value === 'moe' ? 600 : 400) // Dense might be slower in reality, but for demo keep it brisk

    // Step 3: Output
    generatedTokens.value.push(token)
    await wait(200)
  }

  currentStep.value = 'idle'
  currentToken.value = null
  processing.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.moe-demo-container {
  font-family: monospace, system-ui;
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
  gap: 16px;
}

.stage-section {
  width: 100%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  position: relative;
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
  font-size: 13px;
}

.task-btn.selected {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
}

/* Token Flow */
.token-flow-viz {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  height: 30px;
}

.current-token-display {
  display: flex;
  align-items: center;
  gap: 8px;
  animation: slideIn 0.3s ease-out;
}

.token-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.token-badge {
  background: var(--vp-c-bg-mute);
  border: 1px solid;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
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
  transition: all 0.2s;
}

.dense-block.activating {
  background: var(--vp-c-brand);
  box-shadow: 0 0 15px var(--vp-c-brand-dimm);
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
  transition: all 0.2s;
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
  padding: 8px;
  text-align: center;
  margin-bottom: 12px;
  transition: all 0.2s;
}

.router-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  transform: scale(1.02);
}

.router-label {
  font-size: 12px;
  font-weight: bold;
}

.router-action {
  font-size: 12px;
  color: var(--vp-c-brand);
  margin-top: 2px;
}

.connections {
  display: flex;
  justify-content: space-around;
  height: 20px;
  margin-bottom: -10px;
  z-index: 0;
}

.connection-line {
  width: 2px;
  height: 100%;
  background: var(--vp-c-divider);
  transition: all 0.2s;
  opacity: 0.3;
}

.connection-line.active {
  background: currentColor; /* Use inline style color */
  box-shadow: 0 0 6px currentColor;
  opacity: 1;
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
  transition: all 0.2s;
  opacity: 0.5;
}

.expert-card.active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.expert-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.expert-name {
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 2px;
}
.expert-status {
  font-size: 9px;
  font-weight: bold;
}

/* Output Section */
.output-box {
  min-height: 40px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  padding: 12px;
  font-family: monospace;
  white-space: pre-wrap;
  line-height: 1.5;
}

.generated-token {
  display: inline-block;
  transition: all 0.3s;
}

.placeholder {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.cursor {
  display: inline-block;
  width: 2px;
  background: var(--vp-c-text-1);
  animation: blink 1s infinite;
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

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>