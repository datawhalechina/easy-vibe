<!--
 * Component: AgentContextFlow.vue
 * Description: Visualizes the data flow in an agentic system, showing how context is built, used, and updated during interactions.
 * Features:
 *  - Step-by-step visualization of the Agent Loop (Input -> Context -> Decision -> Action -> Observation -> Update)
 *  - Animation of data flowing between components
 *  - Metrics display for context usage and cache hits
-->

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const steps = [
  { id: 'input', label: '用户输入', icon: '👤', desc: '用户提出问题或指令' },
  { id: 'context', label: '构建上下文', icon: '📚', desc: '检索历史消息与相关知识' },
  { id: 'reasoning', label: '模型推理', icon: '🧠', desc: 'LLM 分析意图并规划行动' },
  { id: 'action', label: '工具调用', icon: '🔧', desc: '执行外部工具或 API' },
  { id: 'observation', label: '观察结果', icon: '👁️', desc: '获取工具执行的返回结果' },
  { id: 'update', label: '更新上下文', icon: '📝', desc: '将结果追加到记忆中' }
]

const currentStepIndex = ref(-1)
const isAutoPlaying = ref(false)
const iteration = ref(1)
const contextTokens = ref(120)
const cacheHitRate = ref(0)
const autoPlayInterval = ref(null)

// Simulation data
const currentScenario = computed(() => {
  const scenarios = [
    { input: "查询北京天气", action: "WeatherAPI.get('Beijing')", result: "晴, 25°C", response: "北京今天晴，气温25度。" },
    { input: "计算 123 * 456", action: "Calculator.mul(123, 456)", result: "56088", response: "结果是 56088。" },
    { input: "搜索最新的 AI 新闻", action: "Search.query('AI news')", result: "Found 5 articles...", response: "最近的 AI 新闻包括..." }
  ]
  return scenarios[(iteration.value - 1) % scenarios.length]
})

const currentStep = computed(() => {
  if (currentStepIndex.value === -1) return null
  return steps[currentStepIndex.value]
})

const progress = computed(() => {
  if (currentStepIndex.value === -1) return 0
  return ((currentStepIndex.value + 1) / steps.length) * 100
})

const nextStep = () => {
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++
    // Update metrics based on step
    if (steps[currentStepIndex.value].id === 'context') {
      contextTokens.value += 50
    } else if (steps[currentStepIndex.value].id === 'update') {
      contextTokens.value += 30
      cacheHitRate.value = Math.min(95, cacheHitRate.value + 15)
    }
  } else {
    // Loop finished, prepare next iteration
    currentStepIndex.value = -1
    iteration.value++
    setTimeout(() => {
      if (isAutoPlaying.value) nextStep()
    }, 500)
  }
}

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  if (isAutoPlaying.value) {
    if (currentStepIndex.value === steps.length - 1) {
      currentStepIndex.value = -1
      iteration.value++
    }
    runAutoPlay()
  } else {
    clearTimeout(autoPlayInterval.value)
  }
}

const runAutoPlay = () => {
  if (!isAutoPlaying.value) return
  
  nextStep()
  
  // Determine delay based on current step
  const delay = currentStepIndex.value === -1 ? 500 : 1500
  
  autoPlayInterval.value = setTimeout(() => {
    runAutoPlay()
  }, delay)
}

const reset = () => {
  isAutoPlaying.value = false
  clearTimeout(autoPlayInterval.value)
  currentStepIndex.value = -1
  iteration.value = 1
  contextTokens.value = 120
  cacheHitRate.value = 0
}

onUnmounted(() => {
  clearTimeout(autoPlayInterval.value)
})
</script>

<template>
  <div class="agent-context-flow">
    <!-- Control Panel -->
    <div class="control-panel">
      <div class="controls-left">
        <button 
          class="action-btn primary" 
          @click="toggleAutoPlay"
        >
          {{ isAutoPlaying ? '⏸ 暂停' : '▶ 自动运行' }}
        </button>
        <button 
          class="action-btn secondary" 
          @click="nextStep"
          :disabled="isAutoPlaying || currentStepIndex === steps.length - 1"
        >
          下一步 ➝
        </button>
        <button 
          class="action-btn text" 
          @click="reset"
        >
          重置
        </button>
      </div>
      <div class="status-indicator">
        <span class="status-dot" :class="{ active: isAutoPlaying }"></span>
        {{ isAutoPlaying ? '运行中' : '等待中' }}
      </div>
    </div>

    <!-- Visualization Area -->
    <div class="visualization-area">
      <!-- Central Flow Diagram -->
      <div class="flow-container">
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="flow-step"
          :class="{ 
            active: index === currentStepIndex,
            completed: index < currentStepIndex,
            pending: index > currentStepIndex
          }"
        >
          <div class="step-connector" v-if="index > 0"></div>
          <div class="step-node">
            <div class="step-icon">{{ step.icon }}</div>
            <div class="step-label">{{ step.label }}</div>
          </div>
        </div>
      </div>

      <!-- Detail View -->
      <div class="detail-view">
        <transition name="fade" mode="out-in">
          <div v-if="currentStep" :key="currentStep.id" class="step-detail">
            <div class="detail-header">
              <h3>{{ currentStep.icon }} {{ currentStep.label }}</h3>
              <p>{{ currentStep.desc }}</p>
            </div>
            <div class="detail-content">
              <div class="scenario-info" v-if="currentStep.id === 'input'">
                <strong>输入:</strong> {{ currentScenario.input }}
              </div>
              <div class="scenario-info" v-else-if="currentStep.id === 'action'">
                <strong>执行:</strong> <code>{{ currentScenario.action }}</code>
              </div>
              <div class="scenario-info" v-else-if="currentStep.id === 'observation'">
                <strong>结果:</strong> {{ currentScenario.result }}
              </div>
              <div class="scenario-info" v-else-if="currentStep.id === 'update'">
                 上下文已更新，准备下一轮对话。
              </div>
              <div class="scenario-info" v-else>
                 正在处理...
              </div>
            </div>
          </div>
          <div v-else class="step-detail placeholder">
            <div class="empty-state">
              <span class="empty-icon">👋</span>
              <p>点击"自动运行"或"下一步"开始 Agent 流程演示</p>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Metrics/Info Section -->
    <div class="metrics-panel">
      <div class="metric-item">
        <div class="metric-label">迭代轮次</div>
        <div class="metric-value">#{{ iteration }}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">上下文长度</div>
        <div class="metric-value">{{ contextTokens }} tokens</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">KV 缓存命中</div>
        <div class="metric-value highlight">{{ cacheHitRate }}%</div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-context-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
}

/* Control Panel */
.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.controls-left {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.action-btn.primary {
  background-color: var(--vp-c-brand);
  color: white;
}
.action-btn.primary:hover {
  background-color: var(--vp-c-brand-dark);
}

.action-btn.secondary {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}
.action-btn.secondary:hover:not(:disabled) {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}
.action-btn.secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.text {
  background: none;
  color: var(--vp-c-text-2);
}
.action-btn.text:hover {
  color: var(--vp-c-text-1);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--vp-c-divider);
  transition: background-color 0.3s;
}
.status-dot.active {
  background-color: var(--vp-c-green);
  box-shadow: 0 0 4px var(--vp-c-green);
}

/* Visualization Area */
.visualization-area {
  padding: 2rem 1rem;
  background-color: var(--vp-c-bg-alt);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  max-width: 800px;
}

.flow-step {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 80px;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  width: 100%;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  transition: color 0.3s;
  text-align: center;
}

.step-connector {
  position: absolute;
  top: 20px;
  left: -50%;
  width: 100%;
  height: 2px;
  background-color: var(--vp-c-divider);
  z-index: 1;
  transform: translateY(-50%);
  transition: background-color 0.5s ease;
}

/* Active State */
.flow-step.active .step-icon {
  background-color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 0 10px var(--vp-c-brand-dimm);
}
.flow-step.active .step-label {
  color: var(--vp-c-brand);
  font-weight: bold;
}

/* Completed State */
.flow-step.completed .step-icon {
  background-color: var(--vp-c-brand-dimm);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-dark);
}
.flow-step.completed .step-connector {
  background-color: var(--vp-c-brand);
}

/* Detail View */
.detail-view {
  width: 100%;
  max-width: 500px;
  min-height: 120px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  position: relative;
}

.detail-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.detail-header p {
  margin: 0.25rem 0 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.detail-content {
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.scenario-info code {
  background-color: var(--vp-c-bg-mute);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: var(--vp-font-mono);
  font-size: 0.85rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 1rem;
}
.empty-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Metrics Panel */
.metrics-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  position: relative;
}

.metric-item {
  text-align: center;
}

.metric-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.2rem;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-mono);
}
.metric-value.highlight {
  color: var(--vp-c-brand);
}

.progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: transparent;
}

.progress-bar {
  height: 100%;
  background-color: var(--vp-c-brand);
  transition: width 0.3s linear;
}

@media (max-width: 640px) {
  .flow-container {
    flex-direction: column;
    gap: 1rem;
  }
  .step-connector {
    width: 2px;
    height: 20px;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .flow-step {
    width: 100%;
    min-width: unset;
  }
  .controls-left span {
    display: none;
  }
}
</style>
