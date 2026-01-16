<template>
  <div class="agent-context-flow">
    <div class="flow-controls">
      <button class="control-btn" @click="startSimulation" :disabled="running">
        🚀 开始演示
      </button>
      <button class="control-btn reset" @click="reset" v-if="completed">
        🔄 重新演示
      </button>
    </div>

    <div class="flow-visualization">
      <div class="user-input">
        <div class="input-icon">👤</div>
        <div class="input-content">
          <div class="input-label">用户输入</div>
          <div class="input-text">{{ userInput }}</div>
        </div>
      </div>

      <div class="arrow-down">↓</div>

      <div class="context-window" :class="{ active: step >= 1 }">
        <div class="window-header">
          <span class="window-title">上下文窗口</span>
          <span class="window-size">{{ contextTokens }} tokens</span>
        </div>
        <div class="window-content">
          <div
            v-for="(item, index) in contextItems"
            :key="index"
            class="context-item"
            :class="{ cached: item.cached, active: item.active }"
          >
            <div class="item-type">{{ item.type }}</div>
            <div class="item-content">{{ item.content }}</div>
            <div class="item-tokens">{{ item.tokens }} tokens</div>
          </div>
        </div>
      </div>

      <div class="arrow-down">↓</div>

      <div class="agent-decision" :class="{ active: step >= 2 }">
        <div class="decision-icon">🤖</div>
        <div class="decision-content">
          <div class="decision-label">Agent 决策</div>
          <div class="decision-text">{{ currentAction }}</div>
        </div>
      </div>

      <div class="arrow-down">↓</div>

      <div class="tool-execution" :class="{ active: step >= 3 }">
        <div class="tool-icon">🔧</div>
        <div class="tool-content">
          <div class="tool-label">工具执行</div>
          <div class="tool-name">{{ currentTool }}</div>
        </div>
      </div>

      <div class="arrow-down">↓</div>

      <div class="observation" :class="{ active: step >= 4 }">
        <div class="obs-icon">👁️</div>
        <div class="obs-content">
          <div class="obs-label">观察结果</div>
          <div class="obs-text">{{ observation }}</div>
        </div>
      </div>

      <div class="arrow-down">↓</div>

      <div class="context-update" :class="{ active: step >= 5 }">
        <div class="update-icon">📝</div>
        <div class="update-content">
          <div class="update-label">更新上下文</div>
          <div class="update-text">动作 + 结果被追加到上下文</div>
        </div>
      </div>
    </div>

    <div class="metrics">
      <div class="metric-card">
        <div class="metric-title">KV 缓存命中率</div>
        <div class="metric-value">{{ cacheHitRate }}%</div>
        <div class="metric-desc">
          节省成本: {{ (costSavings * 100).toFixed(0) }}%
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-title">上下文长度</div>
        <div class="metric-value">{{ contextTokens }}</div>
        <div class="metric-desc">迭代: {{ iteration }} 步</div>
      </div>

      <div class="metric-card">
        <div class="metric-title">已用工具</div>
        <div class="metric-value">{{ toolsUsed.length }}</div>
        <div class="metric-desc">
          {{ toolsUsed.join(', ') || '无' }}
        </div>
      </div>
    </div>

    <div class="explanation" v-if="explanationText">
      <div class="exp-title">💡 当前步骤说明</div>
      <div class="exp-content">{{ explanationText }}</div>
    </div>

    <div class="principles">
      <div class="principle-title">🎯 Agent 上下文工程核心原则</div>
      <div class="principle-list">
        <div class="principle-item">
          <div class="principle-icon">1️⃣</div>
          <div class="principle-content">
            <strong>保持前缀稳定</strong>
            <br />
            系统提示和工具定义不要频繁变化，提高 KV 缓存命中率
          </div>
        </div>
        <div class="principle-item">
          <div class="principle-icon">2️⃣</div>
          <div class="principle-content">
            <strong>只追加不修改</strong>
            <br />
            上下文应该只追加新的动作和观察，不修改历史内容
          </div>
        </div>
        <div class="principle-item">
          <div class="principle-icon">3️⃣</div>
          <div class="principle-content">
            <strong>遮蔽而非移除</strong>
            <br />
            不动态添加/删除工具，而是通过 logits 掩码控制可用工具
          </div>
        </div>
        <div class="principle-item">
          <div class="principle-icon">4️⃣</div>
          <div class="principle-content">
            <strong>文件系统作为外部记忆</strong>
            <br />
            大型内容（网页、PDF）写入文件，上下文只保留路径
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const userInput = ref('帮我搜索最新的 AI 技术文章')
const running = ref(false)
const completed = ref(false)
const step = ref(0)
const iteration = ref(0)
const contextTokens = ref(0)
const currentAction = ref('')
const currentTool = ref('')
const observation = ref('')
const toolsUsed = ref([])

const contextItems = ref([
  {
    type: '系统提示',
    content: '你是一个 AI 助手，可以使用搜索和文件工具',
    tokens: 150,
    cached: true,
    active: false
  },
  {
    type: '工具定义',
    content: 'search: 搜索网络信息',
    tokens: 80,
    cached: true,
    active: false
  },
  {
    type: '工具定义',
    content: 'write_file: 写入文件',
    tokens: 75,
    cached: true,
    active: false
  }
])

const steps = [
  {
    step: 1,
    action: '分析用户需求',
    tool: '',
    obs: '',
    explanation:
      'Agent 首先解析用户的请求，决定需要采取什么行动。系统提示和工具定义从缓存读取（绿色），节省成本！',
    addTokens: 50
  },
  {
    step: 2,
    action: '选择工具: search',
    tool: 'search',
    obs: '',
    explanation:
      'Agent 根据用户需求选择合适的工具。注意：工具定义在缓存中，不需要重新计算！',
    addTokens: 30
  },
  {
    step: 3,
    action: '执行搜索',
    tool: 'search',
    obs: '找到 5 篇相关文章',
    explanation: '工具执行完成，返回观察结果。结果会被追加到上下文中。',
    addTokens: 100
  },
  {
    step: 4,
    action: '决定保存摘要',
    tool: 'write_file',
    obs: '文件已保存',
    explanation:
      'Agent 将搜索结果写入文件，而不是在上下文中保留所有内容。这样上下文保持精简！',
    addTokens: 60
  },
  {
    step: 5,
    action: '完成任务',
    tool: '',
    obs: '已保存到 summary.md',
    explanation:
      '任务完成！整个过程中，系统提示和工具定义只缓存一次，每次迭代只追加新的动作和观察结果。',
    addTokens: 40
  }
]

const cacheHitRate = computed(() => {
  const cachedTokens = contextItems.value
    .filter((item) => item.cached)
    .reduce((sum, item) => sum + item.tokens, 0)
  const totalTokens = contextTokens.value
  return totalTokens > 0 ? ((cachedTokens / totalTokens) * 100).toFixed(1) : 0
})

const costSavings = computed(() => {
  return cacheHitRate.value > 0 ? (cacheHitRate.value / 100) * 0.9 : 0
})

const explanationText = computed(() => {
  if (step.value === 0) return '点击"开始演示"查看 Agent 如何管理上下文'
  const currentStepData = steps[step.value - 1]
  return currentStepData ? currentStepData.explanation : ''
})

const startSimulation = () => {
  running.value = true
  completed.value = false
  step.value = 0
  iteration.value = 0
  contextTokens.value = 305
  toolsUsed.value = []

  let currentStepIndex = 0
  const interval = setInterval(() => {
    if (currentStepIndex < steps.length) {
      const stepData = steps[currentStepIndex]
      step.value = stepData.step
      currentAction.value = stepData.action
      currentTool.value = stepData.tool
      observation.value = stepData.obs

      if (stepData.tool) {
        toolsUsed.value.push(stepData.tool)
      }

      // 追加新的上下文项
      if (stepData.obs) {
        contextItems.value.push({
          type: '观察结果',
          content: stepData.obs,
          tokens: stepData.addTokens,
          cached: false,
          active: true
        })
      } else {
        contextItems.value.push({
          type: '思考',
          content: stepData.action,
          tokens: stepData.addTokens,
          cached: false,
          active: true
        })
      }

      contextTokens.value += stepData.addTokens
      iteration.value++
      currentStepIndex++
    } else {
      clearInterval(interval)
      running.value = false
      completed.value = true
    }
  }, 1500)
}

const reset = () => {
  running.value = false
  completed.value = false
  step.value = 0
  iteration.value = 0
  contextTokens.value = 0
  currentAction.value = ''
  currentTool.value = ''
  observation.value = ''
  toolsUsed.value = []
  contextItems.value = [
    {
      type: '系统提示',
      content: '你是一个 AI 助手，可以使用搜索和文件工具',
      tokens: 150,
      cached: true,
      active: false
    },
    {
      type: '工具定义',
      content: 'search: 搜索网络信息',
      tokens: 80,
      cached: true,
      active: false
    },
    {
      type: '工具定义',
      content: 'write_file: 写入文件',
      tokens: 75,
      cached: true,
      active: false
    }
  ]
}
</script>

<style scoped>
.agent-context-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.flow-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  justify-content: center;
}

.control-btn {
  padding: 12px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-btn.reset {
  background: #22c55e;
}

.control-btn.reset:hover {
  background: #16a34a;
}

.flow-visualization {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.user-input,
.agent-decision,
.tool-execution,
.observation,
.context-update {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-divider);
  margin-bottom: 15px;
  opacity: 0.5;
  transition: all 0.3s;
}

.user-input.active,
.agent-decision.active,
.tool-execution.active,
.observation.active,
.context-update.active {
  opacity: 1;
  border-left-color: var(--vp-c-brand);
}

.user-input {
  border-left-color: #3b82f6;
}

.agent-decision {
  border-left-color: #8b5cf6;
}

.tool-execution {
  border-left-color: #f59e0b;
}

.observation {
  border-left-color: #10b981;
}

.context-update {
  border-left-color: #ef4444;
  margin-bottom: 0;
}

.input-icon,
.decision-icon,
.tool-icon,
.obs-icon,
.update-icon {
  font-size: 2rem;
}

.input-content,
.decision-content,
.tool-content,
.obs-content,
.update-content {
  flex: 1;
}

.input-label,
.decision-label,
.tool-label,
.obs-label,
.update-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
  margin-bottom: 4px;
}

.input-text,
.decision-text,
.tool-name,
.obs-text,
.update-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.arrow-down {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 5px 0;
}

.context-window {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  border: 2px solid var(--vp-c-divider);
  opacity: 0.5;
  transition: all 0.3s;
}

.context-window.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
}

.window-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.window-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.window-size {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-family: monospace;
  font-weight: 600;
}

.window-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.context-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  transition: all 0.3s;
}

.context-item.cached {
  border-left: 3px solid #22c55e;
}

.context-item.active {
  border-left: 3px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.item-type {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-weight: 600;
  min-width: 70px;
  text-align: center;
}

.item-content {
  flex: 1;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.item-tokens {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
  min-width: 60px;
  text-align: right;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .metrics {
    grid-template-columns: 1fr;
  }
}

.metric-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
  border-left: 4px solid var(--vp-c-brand);
}

.metric-title {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 4px;
}

.metric-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.explanation {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid var(--vp-c-brand);
}

.exp-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.exp-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.principles {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
}

.principle-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.principle-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.principle-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.principle-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.principle-content {
  flex: 1;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
