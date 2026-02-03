<template>
  <div class="kv-cache-demo">
    <div class="control-panel">
      <div class="control-group">
        <label class="toggle-switch">
          <input type="checkbox" v-model="isCacheEnabled" :disabled="isProcessing">
          <span class="slider"></span>
        </label>
        <span class="label">开启“背课文加速”（前缀复用 / KV Cache）</span>
      </div>
      <button 
        class="action-btn" 
        :disabled="isProcessing"
        @click="sendRequest"
      >
        {{ isProcessing ? '生成中...' : '发送新请求' }}
      </button>
    </div>

    <div class="visualization-area">
      <div class="memory-blocks">
        <!-- System Prompt Block -->
        <div 
          class="memory-block system"
          :class="{ 'cached': isCacheEnabled && hasCache, 'processing': processingStep === 'system' }"
        >
          <div class="block-header">
            <span class="icon">⚙️</span>
            <span>固定开场白（System Prompt）</span>
            <span class="badge" v-if="isCacheEnabled && hasCache">已背过</span>
          </div>
          <div class="block-content">
            你是一个乐于助人的 AI 助手... （大约 500 个 token）
          </div>
          <div class="process-indicator" v-if="processingStep === 'system'">
            计算中...
          </div>
        </div>

        <!-- History Block -->
        <div 
          class="memory-block history"
          :class="{ 'processing': processingStep === 'history' }"
        >
          <div class="block-header">
            <span class="icon">💬</span>
            <span>最近几轮聊天记录</span>
          </div>
          <div class="block-content">
            用户：你好... （大约 200 个 token）
          </div>
          <div class="process-indicator" v-if="processingStep === 'history'">
            计算中...
          </div>
        </div>

        <!-- New Query Block -->
        <div 
          class="memory-block query"
          :class="{ 'processing': processingStep === 'query' }"
        >
          <div class="block-header">
            <span class="icon">❓</span>
            <span>这一次的新问题</span>
          </div>
          <div class="block-content">
            {{ currentQuery }} （大约 50 个 token）
          </div>
          <div class="process-indicator" v-if="processingStep === 'query'">
            计算中...
          </div>
        </div>
      </div>
    </div>

    <div class="metrics-panel">
      <div class="metric-card">
        <div class="metric-value">{{ metrics.ttft }}ms</div>
        <div class="metric-label">开口速度（首字延迟 TTFT）</div>
        <div class="metric-diff" :class="{ 'good': metrics.savedTime > 0 }" v-if="metrics.savedTime > 0">
          节省 {{ metrics.savedTime }}ms
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-value">{{ metrics.processedTokens }}</div>
        <div class="metric-label">这次一共算了多少个 token</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">{{ metrics.cost }}</div>
        <div class="metric-label">大致算力消耗（越少越省钱）</div>
      </div>
    </div>

    <div class="info-box">
      <p v-if="isCacheEnabled">
        <span class="icon">⚡</span>
        <strong>命中时在干嘛：</strong>前面的固定开场白不再重复计算，直接用“上一次背过的结果”，所以又快又省。
      </p>
      <p v-else>
        <span class="icon">🐌</span>
        <strong>没开缓存时：</strong>每次都要从头把所有 token 重新算一遍注意力，就像每次都从第一页开始重读课文，又慢又费钱。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isCacheEnabled = ref(false)
const hasCache = ref(false)
const isProcessing = ref(false)
const processingStep = ref('') // 'system', 'history', 'query'
const currentQuery = ref('帮我写一段 Python 代码')

const metrics = reactive({
  ttft: 0,
  processedTokens: 0,
  cost: 0,
  savedTime: 0
})

const sendRequest = async () => {
  if (isProcessing.value) return
  isProcessing.value = true
  
  // Reset metrics display
  metrics.ttft = 0
  metrics.processedTokens = 0
  metrics.cost = 0
  metrics.savedTime = 0

  const systemTokens = 500
  const historyTokens = 200
  const queryTokens = 50
  
  // Step 1: System Prompt
  processingStep.value = 'system'
  const systemDelay = (isCacheEnabled.value && hasCache.value) ? 100 : 800
  await new Promise(r => setTimeout(r, systemDelay))
  
  // Step 2: Chat History
  processingStep.value = 'history'
  await new Promise(r => setTimeout(r, 400))
  
  // Step 3: New Query
  processingStep.value = 'query'
  await new Promise(r => setTimeout(r, 200))
  
  // Calculate final metrics
  processingStep.value = ''
  isProcessing.value = false
  
  // Logic: 
  // Without Cache: Process all (500 + 200 + 50) = 750 tokens
  // With Cache: Process only (200 + 50) = 250 tokens (System is reused)
  
  if (isCacheEnabled.value && hasCache.value) {
    metrics.ttft = 150 // Fast
    metrics.processedTokens = historyTokens + queryTokens
    metrics.cost = 3 // Low cost
    metrics.savedTime = 650
  } else {
    metrics.ttft = 800 // Slow
    metrics.processedTokens = systemTokens + historyTokens + queryTokens
    metrics.cost = 10 // High cost
    
    // First run with cache enabled establishes the cache
    if (isCacheEnabled.value) {
      hasCache.value = true
    }
  }
  
  // Update query for next run to simulate conversation
  currentQuery.value = currentQuery.value === '帮我写一段 Python 代码' 
    ? '这段代码怎么运行？' 
    : '帮我写一段 Python 代码'
}
</script>

<style scoped>
.kv-cache-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  transition: .4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 1px;
  bottom: 1px;
  background-color: var(--vp-c-text-2);
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

input:checked + .slider:before {
  transform: translateX(20px);
  background-color: white;
}

.action-btn {
  padding: 0.4rem 0.8rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;
  font-size: 0.9rem;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.visualization-area {
  margin-bottom: 1rem;
}

.memory-blocks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.memory-block {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  position: relative;
  transition: all 0.3s ease;
}

.memory-block.system { border-left: 4px solid var(--vp-c-green-1); }
.memory-block.history { border-left: 4px solid var(--vp-c-yellow-1); }
.memory-block.query { border-left: 4px solid var(--vp-c-brand-1); }

.memory-block.cached {
  background: rgba(16, 185, 129, 0.1);
  border-color: var(--vp-c-green-1);
}

.memory-block.processing {
  box-shadow: 0 0 10px var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  transform: scale(1.01);
}

.block-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.block-content {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.badge {
  background: var(--vp-c-green-1);
  color: white;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-left: auto;
}

.process-indicator {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

.metrics-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric-card {
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  position: relative;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.metric-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.metric-diff {
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--vp-c-brand);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: bold;
}

.metric-diff.good {
  background: var(--vp-c-green-1);
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}
</style>
