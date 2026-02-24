<template>
  <div class="ux-demo">
    <div class="header">
      <div class="title">AI 原生交互模式</div>
      <div class="subtitle">点击卡片，体验每种 AI 交互模式的效果</div>
    </div>

    <div class="pattern-grid">
      <div
        v-for="p in patterns"
        :key="p.id"
        :class="['pattern-card', { active: activePattern === p.id }]"
        @click="activatePattern(p.id)"
      >
        <div class="card-icon">{{ p.icon }}</div>
        <div class="card-name">{{ p.name }}</div>
        <div class="card-desc">{{ p.brief }}</div>
      </div>
    </div>

    <div v-if="activePattern" class="preview-area">
      <div class="preview-header">
        <span>{{ currentPattern.icon }} {{ currentPattern.name }} 演示</span>
        <button class="replay-btn" @click="replayDemo">🔄 重播</button>
      </div>

      <!-- 流式输出演示 -->
      <div v-if="activePattern === 'streaming'" class="demo-box">
        <div class="chat-bubble ai">
          <span class="stream-text">{{ streamText }}</span>
          <span v-if="isStreaming" class="cursor-blink">|</span>
        </div>
        <div class="demo-note">逐字输出，用户无需等待完整响应</div>
      </div>

      <!-- 加载状态演示 -->
      <div v-if="activePattern === 'loading'" class="demo-box">
        <div class="loading-stages">
          <div
            v-for="(s, idx) in loadingStages"
            :key="idx"
            :class="['stage', { done: loadingStep > idx, current: loadingStep === idx }]"
          >
            <span class="stage-icon">
              {{ loadingStep > idx ? '✅' : loadingStep === idx ? '⏳' : '⬜' }}
            </span>
            <span>{{ s }}</span>
          </div>
        </div>
        <div class="demo-note">分阶段展示进度，而非单一的"加载中"</div>
      </div>

      <!-- 置信度指示器演示 -->
      <div v-if="activePattern === 'confidence'" class="demo-box">
        <div class="confidence-list">
          <div v-for="c in confidenceItems" :key="c.text" class="conf-item">
            <div class="conf-bar-wrap">
              <div
                class="conf-bar"
                :style="{ width: c.score + '%', background: c.color }"
              />
            </div>
            <div class="conf-score">{{ c.score }}%</div>
            <div class="conf-label">{{ c.level }}</div>
            <div class="conf-text">{{ c.text }}</div>
          </div>
        </div>
        <div class="demo-note">让用户知道 AI 对自己的回答有多"确定"</div>
      </div>

      <!-- 降级处理演示 -->
      <div v-if="activePattern === 'fallback'" class="demo-box">
        <div class="fallback-flow">
          <div :class="['fb-step', { active: fallbackStep >= 0 }]">
            <span class="fb-icon">🤖</span>
            <span>AI 尝试回答...</span>
          </div>
          <div class="fb-arrow" v-if="fallbackStep >= 1">↓ 检测到不确定</div>
          <div :class="['fb-step warn', { active: fallbackStep >= 1 }]">
            <span class="fb-icon">⚠️</span>
            <span>提示用户：此回答可能不准确</span>
          </div>
          <div class="fb-arrow" v-if="fallbackStep >= 2">↓ 提供替代方案</div>
          <div :class="['fb-step safe', { active: fallbackStep >= 2 }]">
            <span class="fb-icon">🔄</span>
            <span>转接人工 / 推荐文档 / 换个方式提问</span>
          </div>
        </div>
        <div class="demo-note">AI 不确定时，优雅降级而非强行回答</div>
      </div>

      <div class="pattern-detail">
        <div class="detail-label">设计要点</div>
        <div class="detail-text">{{ currentPattern.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const patterns = [
  {
    id: 'streaming', icon: '💬', name: '流式输出',
    brief: '逐字生成，即时反馈',
    detail: '流式输出让用户在 AI 思考时就能看到部分结果，大幅降低感知等待时间。技术上通过 SSE（Server-Sent Events）或 WebSocket 实现，前端逐步渲染 Markdown 内容。'
  },
  {
    id: 'loading', icon: '⏳', name: '智能加载态',
    brief: '分阶段展示处理进度',
    detail: 'AI 请求通常需要数秒，传统的转圈加载会让用户焦虑。智能加载态将处理过程拆解为可见的步骤（理解问题 → 检索知识 → 生成回答），让等待变得可预期。'
  },
  {
    id: 'confidence', icon: '📊', name: '置信度指示',
    brief: '展示 AI 的确定程度',
    detail: 'AI 的输出具有概率性，不同回答的可靠程度不同。通过置信度指示器，用户可以判断哪些信息可以直接采纳，哪些需要二次验证。这是 AI 原生应用透明性的核心体现。'
  },
  {
    id: 'fallback', icon: '🛡️', name: '优雅降级',
    brief: '不确定时的兜底策略',
    detail: '当 AI 无法给出可靠回答时，不应该硬编一个答案。优雅降级策略包括：坦诚告知不确定性、提供替代信息源、转接人工服务、引导用户换个方式提问。'
  }
]

const activePattern = ref('')
const currentPattern = computed(() => patterns.find(p => p.id === activePattern.value) || {})

// Streaming demo
const streamText = ref('')
const isStreaming = ref(false)
const fullText = 'React 是一个用于构建用户界面的 JavaScript 库。它采用组件化的开发模式，让你可以将复杂的 UI 拆分成独立的、可复用的小模块。'

// Loading demo
const loadingStages = ['理解用户意图...', '检索相关知识...', '组织回答内容...', '生成最终响应']
const loadingStep = ref(-1)

// Confidence demo
const confidenceItems = [
  { text: 'React 由 Meta 开发', score: 98, level: '高置信', color: '#10b981' },
  { text: '全球约 40% 的网站使用 React', score: 72, level: '中置信', color: '#f59e0b' },
  { text: 'React 19 将在下月发布', score: 35, level: '低置信', color: '#ef4444' }
]

// Fallback demo
const fallbackStep = ref(-1)

let timer = null

const clearTimers = () => {
  if (timer) { clearInterval(timer); timer = null }
}

const activatePattern = (id) => {
  clearTimers()
  activePattern.value = id
  replayDemo()
}

const replayDemo = () => {
  clearTimers()
  if (activePattern.value === 'streaming') {
    streamText.value = ''
    isStreaming.value = true
    let i = 0
    timer = setInterval(() => {
      if (i < fullText.length) {
        streamText.value += fullText[i]
        i++
      } else {
        isStreaming.value = false
        clearTimers()
      }
    }, 50)
  } else if (activePattern.value === 'loading') {
    loadingStep.value = 0
    let step = 0
    timer = setInterval(() => {
      step++
      loadingStep.value = step
      if (step >= loadingStages.length) clearTimers()
    }, 900)
  } else if (activePattern.value === 'fallback') {
    fallbackStep.value = 0
    let step = 0
    timer = setInterval(() => {
      step++
      fallbackStep.value = step
      if (step >= 2) clearTimers()
    }, 1000)
  }
}
</script>

<style scoped>
.ux-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px; margin-bottom: 16px;
}
.pattern-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 14px; cursor: pointer;
  transition: all 0.2s; text-align: center;
}
.pattern-card:hover { background: var(--vp-c-bg-alt); }
.pattern-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.card-icon { font-size: 24px; margin-bottom: 6px; }
.card-name { font-weight: 600; font-size: 13px; }
.card-desc { font-size: 11px; color: var(--vp-c-text-2); margin-top: 4px; }

.preview-area {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.preview-header {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 700; font-size: 14px; margin-bottom: 12px;
}
.replay-btn {
  padding: 4px 12px; border: 1px solid var(--vp-c-divider);
  border-radius: 6px; background: var(--vp-c-bg-soft);
  cursor: pointer; font-size: 12px;
}

.demo-box {
  background: var(--vp-c-bg-soft); border-radius: 8px;
  padding: 16px; margin-bottom: 12px;
}
.demo-note {
  font-size: 11px; color: var(--vp-c-text-3);
  text-align: center; margin-top: 10px;
}

/* Streaming */
.chat-bubble.ai {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 12px; font-size: 13px; line-height: 1.7;
}
.cursor-blink { animation: blink 0.8s infinite; color: var(--vp-c-brand); }
@keyframes blink { 50% { opacity: 0; } }

/* Loading */
.loading-stages { display: flex; flex-direction: column; gap: 8px; }
.stage {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-radius: 6px; font-size: 13px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  opacity: 0.4; transition: all 0.3s;
}
.stage.current { opacity: 1; border-color: var(--vp-c-brand); background: var(--vp-c-brand-soft); }
.stage.done { opacity: 1; border-color: #86efac; background: #f0fdf4; }

/* Confidence */
.confidence-list { display: flex; flex-direction: column; gap: 10px; }
.conf-item {
  display: grid; grid-template-columns: 1fr 40px 60px 1fr;
  align-items: center; gap: 8px; font-size: 12px;
}
.conf-bar-wrap {
  height: 8px; background: var(--vp-c-bg);
  border-radius: 4px; overflow: hidden;
}
.conf-bar { height: 100%; border-radius: 4px; transition: width 0.6s; }
.conf-score { font-weight: 600; text-align: right; }
.conf-label { font-size: 11px; color: var(--vp-c-text-2); }
.conf-text { color: var(--vp-c-text-1); }

/* Fallback */
.fallback-flow { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.fb-step {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 10px 14px; border-radius: 8px; font-size: 13px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  opacity: 0.3; transition: all 0.4s;
}
.fb-step.active { opacity: 1; }
.fb-step.warn.active { border-color: #fbbf24; background: #fef3c7; }
.fb-step.safe.active { border-color: #86efac; background: #f0fdf4; }
.fb-arrow { font-size: 12px; color: var(--vp-c-text-3); }

.pattern-detail { margin-top: 12px; }
.detail-label { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
.detail-text { font-size: 13px; color: var(--vp-c-text-2); line-height: 1.7; }
</style>
