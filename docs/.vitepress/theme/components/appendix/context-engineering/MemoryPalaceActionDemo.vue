<!--
 * Component: MemoryPalaceActionDemo.vue
 * Description: Interactive simulation of the "Memory Palace" in action.
 * Features:
 *  - Scenario selection (Coding vs Support)
 *  - Chat interface simulation
 *  - Real-time visualization of the 4 context layers
 *  - Step-by-step walkthrough of the context construction process
-->

<script setup>
import { ref, computed, nextTick } from 'vue'

const scenarios = {
  coding: {
    name: '👨‍💻 代码助手场景',
    steps: [
      {
        user: '帮我写一个 Python 贪吃蛇游戏',
        action: '初始化',
        layers: {
          base: 'System: 你是资深 Python 工程师...',
          task: 'Task: 编写贪吃蛇游戏，使用 Pygame 库...',
          chat: [],
          rag: []
        },
        desc: '初始化：装载地基(System)和任务(Task)。此时 Layer 1 & 2 建立。'
      },
      {
        user: null,
        ai_thinking: '需要查询 Pygame 的最新初始化代码...',
        action: '检索',
        layers: {
          base: 'System: 你是资深 Python 工程师...',
          task: 'Task: 编写贪吃蛇游戏，使用 Pygame 库...',
          chat: [],
          rag: ['Docs: Pygame.init() usage...', 'Docs: Game loop pattern...']
        },
        desc: '思考与检索：发现需要知识补充，临时调取 RAG 资料到 Layer 4。'
      },
      {
        user: null,
        ai: '好的，这是一个基于 Pygame 的贪吃蛇基础代码...',
        action: '生成',
        layers: {
          base: 'System: 你是资深 Python 工程师...',
          task: 'Task: 编写贪吃蛇游戏，使用 Pygame 库...',
          chat: ['User: 写贪吃蛇', 'AI: [Code Block]'],
          rag: [] // RAG cleared after generation to save space
        },
        desc: '生成回答：RAG 资料用完即扔(节省空间)，对话写入 Layer 3 (Chat)。'
      },
      {
        user: '蛇移动得太快了，怎么调慢点？',
        action: '追问',
        layers: {
          base: 'System: 你是资深 Python 工程师...',
          task: 'Task: 编写贪吃蛇游戏，使用 Pygame 库...',
          chat: ['User: 写贪吃蛇', 'AI: [Code Block]', 'User: 调慢点'],
          rag: []
        },
        desc: '用户追问：新对话追加到 Layer 3。Layer 1 & 2 保持不变(0成本)。'
      },
      {
        user: null,
        ai: '你可以调整 clock.tick(15) 中的数值...',
        action: '回复',
        layers: {
          base: 'System: 你是资深 Python 工程师...',
          task: 'Task: 编写贪吃蛇游戏，使用 Pygame 库...',
          chat: ['User: 写贪吃蛇', 'AI: [Code Block]', 'User: 调慢点', 'AI: 调整 tick 值...'],
          rag: []
        },
        desc: '持续对话：Layer 3 增长。如果太长，最上面的对话会被挤出去(滑动窗口)。'
      }
    ]
  },
  support: {
    name: '👩‍💼 客服助手场景',
    steps: [
      {
        user: '我的订单发货了吗？单号 12345',
        action: '接收',
        layers: {
          base: 'System: 你是电商客服，语气温柔...',
          task: 'Task: 处理订单查询请求...',
          chat: [],
          rag: []
        },
        desc: '接收消息：加载地基(System)。'
      },
      {
        user: null,
        ai_thinking: '查询订单系统 API...',
        action: '工具调用',
        layers: {
          base: 'System: 你是电商客服，语气温柔...',
          task: 'Task: 处理订单查询请求...',
          chat: ['User: 查单号 12345'],
          rag: ['API_Result: {id:12345, status:"shipped", loc:"Beijing"}']
        },
        desc: '调用工具/RAG：获取实时订单状态，放入 Layer 4。'
      },
      {
        user: null,
        ai: '亲，查到了哦！您的包裹已经在北京中转了。',
        action: '回复',
        layers: {
          base: 'System: 你是电商客服，语气温柔...',
          task: 'Task: 处理订单查询请求...',
          chat: ['User: 查单号 12345', 'AI: 在北京中转'],
          rag: []
        },
        desc: '完成回复：Layer 4 清空，对话保留在 Layer 3。'
      }
    ]
  }
}

const currentScenarioKey = ref('coding')
const currentStepIndex = ref(0)

const currentScenario = computed(() => scenarios[currentScenarioKey.value])
const currentStep = computed(() => currentScenario.value.steps[currentStepIndex.value])
const isLastStep = computed(() => currentStepIndex.value === currentScenario.value.steps.length - 1)

const setScenario = (key) => {
  currentScenarioKey.value = key
  currentStepIndex.value = 0
}

const nextStep = () => {
  if (!isLastStep.value) {
    currentStepIndex.value++
  } else {
    currentStepIndex.value = 0
  }
}

const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

// Visual helpers
const getLayerStyle = (layerId) => {
  const isActive = (layer) => {
    // Logic to highlight active layer based on step action could go here
    // For now, simple static colors
    return true
  }
  return {}
}
</script>

<template>
  <div class="action-demo">
    <!-- Scenario Selector -->
    <div class="scenario-tabs">
      <button 
        v-for="(s, key) in scenarios" 
        :key="key"
        class="tab-btn"
        :class="{ active: currentScenarioKey === key }"
        @click="setScenario(key)"
      >
        {{ s.name }}
      </button>
    </div>

    <div class="demo-grid">
      <!-- Left: Chat Simulator -->
      <div class="chat-panel">
        <div class="panel-header">📱 用户视角 (Chat)</div>
        <div class="chat-window">
          <div v-for="(msg, idx) in currentStep.layers.chat" :key="idx" class="chat-bubble" :class="msg.startsWith('User') ? 'user' : 'ai'">
            {{ msg.split(': ')[1] || msg }}
          </div>
          <div v-if="currentStep.user && !currentStep.layers.chat.some(m => m.includes(currentStep.user))" class="chat-bubble user pending">
            {{ currentStep.user }}...
          </div>
           <div v-if="currentStep.ai_thinking" class="chat-bubble thinking">
            💭 {{ currentStep.ai_thinking }}
          </div>
        </div>
        <div class="controls">
          <div class="step-info">步骤 {{ currentStepIndex + 1 }} / {{ currentScenario.steps.length }}</div>
          <div class="btn-group">
            <button class="nav-btn" @click="prevStep" :disabled="currentStepIndex === 0">⬅️ 上一步</button>
            <button class="nav-btn primary" @click="nextStep">
              {{ isLastStep ? '🔄 重新演示' : '下一步 ➡️' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Memory Palace Internals -->
      <div class="palace-panel">
        <div class="panel-header">🧠 AI 视角 (Context Construction)</div>
        <div class="context-visualizer">
          
          <!-- Layer 1: Base -->
          <div class="layer-box base">
            <div class="layer-label">
              <span class="icon">🏛️</span> 
              <span class="title">Layer 1: 地基 (System)</span>
              <span class="badge">KV Cached</span>
            </div>
            <div class="layer-content">{{ currentStep.layers.base }}</div>
          </div>

          <!-- Layer 2: Task -->
          <div class="layer-box task">
            <div class="layer-label">
              <span class="icon">📌</span> 
              <span class="title">Layer 2: 支柱 (Task)</span>
              <span class="badge">Pinned</span>
            </div>
            <div class="layer-content">{{ currentStep.layers.task }}</div>
          </div>

          <!-- Layer 3: Chat -->
          <div class="layer-box chat">
            <div class="layer-label">
              <span class="icon">💬</span> 
              <span class="title">Layer 3: 客厅 (Chat)</span>
              <span class="badge">Sliding</span>
            </div>
            <div class="layer-content">
              <div v-for="(m, i) in currentStep.layers.chat" :key="i" class="mini-line">{{ m }}</div>
              <div v-if="currentStep.layers.chat.length === 0" class="empty-hint">(暂无对话历史)</div>
            </div>
          </div>

          <!-- Layer 4: RAG -->
          <div class="layer-box rag" :class="{ active: currentStep.layers.rag.length > 0 }">
            <div class="layer-label">
              <span class="icon">📚</span> 
              <span class="title">Layer 4: 图书馆 (RAG)</span>
              <span class="badge ephemeral">Temp</span>
            </div>
            <div class="layer-content">
              <div v-for="(r, i) in currentStep.layers.rag" :key="i" class="rag-item">{{ r }}</div>
              <div v-if="currentStep.layers.rag.length === 0" class="empty-hint">(当前无需检索)</div>
            </div>
          </div>

        </div>
        
        <!-- Explanation Footer -->
        <div class="step-desc">
          <strong>💡 这一步发生了什么：</strong>
          {{ currentStep.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  margin: 1.5rem 0;
  overflow: hidden;
  font-size: 14px;
}

.scenario-tabs {
  display: flex;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-btn {
  flex: 1;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  min-height: 400px;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

/* Chat Panel */
.chat-panel {
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
}

.panel-header {
  padding: 10px;
  font-weight: bold;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.9em;
}

.chat-window {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  background: #f9f9f9;
}
.dark .chat-window {
  background: #1e1e20;
}

.chat-bubble {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.9em;
  line-height: 1.4;
}

.chat-bubble.user {
  align-self: flex-end;
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 2px;
}

.chat-bubble.ai {
  align-self: flex-start;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 2px;
}

.chat-bubble.thinking {
  align-self: center;
  background: transparent;
  color: var(--vp-c-text-2);
  font-style: italic;
  font-size: 0.85em;
  border: 1px dashed var(--vp-c-divider);
}

.chat-bubble.pending {
  opacity: 0.6;
}

.controls {
  padding: 15px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.step-info {
  text-align: center;
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.nav-btn {
  flex: 1;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-size: 0.9em;
  cursor: pointer;
}
.nav-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}
.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.nav-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}
.nav-btn.primary:hover {
  background: var(--vp-c-brand-dark);
}

/* Palace Panel */
.palace-panel {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
}

.context-visualizer {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.layer-box {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  padding: 8px;
  transition: all 0.3s;
}

.layer-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 0.85em;
}

.title {
  font-weight: bold;
}

.badge {
  margin-left: auto;
  font-size: 0.7em;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.badge.ephemeral {
  background: #e74c3c;
  color: white;
}

.layer-content {
  font-family: var(--vp-font-mono);
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  padding: 6px;
  border-radius: 4px;
  white-space: pre-wrap;
  max-height: 80px;
  overflow-y: auto;
}

.mini-line {
  margin-bottom: 2px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 2px;
}

.rag-item {
  color: #27ae60;
  margin-bottom: 2px;
}

.empty-hint {
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.8em;
}

/* Layer specific styling */
.base .layer-label { color: var(--vp-c-brand); }
.base .badge { background: var(--vp-c-brand); color: white; }

.task .layer-label { color: #8e44ad; }
.task .badge { background: #8e44ad; color: white; }

.chat .layer-label { color: #e67e22; }

.rag { border-style: dashed; opacity: 0.6; }
.rag.active { opacity: 1; border-color: #27ae60; background: rgba(39, 174, 96, 0.05); }
.rag .layer-label { color: #27ae60; }

.step-desc {
  padding: 12px;
  background: #fff9c4;
  color: #555;
  font-size: 0.9em;
  border-top: 1px solid #e0e0e0;
  line-height: 1.4;
}
.dark .step-desc {
  background: #333322;
  color: #ddd;
  border-top-color: #444;
}
</style>
