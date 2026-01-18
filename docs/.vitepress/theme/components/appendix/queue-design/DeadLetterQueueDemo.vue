<!--
  DeadLetterQueueDemo.vue
  死信队列演示 - 处理失败消息
-->
<template>
  <div class="dlq-demo">
    <div class="header">
      <div class="title">死信队列：消息的"急救站"</div>
      <div class="subtitle">处理无法消费的消息，避免阻塞队列</div>
    </div>

    <div class="controls">
      <div class="control">
        <label>失败率：</label>
        <input v-model="failureRate" type="range" min="0" max="100" step="10" />
        <span class="value">{{ failureRate }}%</span>
      </div>
      <div class="control">
        <label>最大重试次数：</label>
        <input v-model="maxRetries" type="range" min="1" max="5" step="1" />
        <span class="value">{{ maxRetries }}</span>
      </div>
    </div>

    <div class="flow-container">
      <div class="main-queue-section">
        <div class="section-title">📦 主队列</div>
        <div class="queue-box main-queue">
          <div class="queue-header">
            <span>正常消息队列</span>
            <span class="count">{{ mainQueue.length }} 条</span>
          </div>
          <div class="message-list">
            <div
              v-for="msg in mainQueue"
              :key="msg.id"
              class="message-item"
              :class="{ processing: msg.processing }"
            >
              <div class="msg-id">#{{ msg.id }}</div>
              <div class="msg-retries" v-if="msg.retries > 0">
                重试: {{ msg.retries }}/{{ maxRetries }}
              </div>
            </div>
            <div v-if="mainQueue.length === 0" class="empty">队列为空</div>
          </div>
        </div>
        <button class="add-btn" @click="addMessage" :disabled="processing">
          + 添加消息
        </button>
      </div>

      <div class="processing-section">
        <div class="section-title">⚙️ 消费处理</div>
        <div class="processor-box">
          <div class="processor-icon" :class="{ active: processing }">
            {{ processing ? '⚙️' : '💤' }}
          </div>
          <div class="processor-status">
            {{ processing ? '处理中...' : '空闲' }}
          </div>
          <div v-if="currentMessage" class="current-msg">
            处理: #{{ currentMessage.id }}
          </div>
          <div v-if="lastResult" class="last-result" :class="lastResult.type">
            {{ lastResult.message }}
          </div>
        </div>
      </div>

      <div class="dlq-section">
        <div class="section-title">⚠️ 死信队列</div>
        <div class="queue-box dead-letter">
          <div class="queue-header">
            <span>失败消息</span>
            <span class="count">{{ deadLetterQueue.length }} 条</span>
          </div>
          <div class="message-list">
            <div
              v-for="msg in deadLetterQueue"
              :key="msg.id"
              class="message-item failed"
            >
              <div class="msg-id">#{{ msg.id }}</div>
              <div class="msg-error">{{ msg.error }}</div>
            </div>
            <div v-if="deadLetterQueue.length === 0" class="empty">
              无失败消息
            </div>
          </div>
        </div>
        <button
          class="retry-btn"
          @click="retryDeadLetters"
          :disabled="deadLetterQueue.length === 0"
        >
          🔄 重试死信
        </button>
      </div>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">总消息数</div>
        <div class="stat-value">{{ totalMessages }}</div>
      </div>
      <div class="stat-card success">
        <div class="stat-label">成功处理</div>
        <div class="stat-value">{{ successCount }}</div>
      </div>
      <div class="stat-card warning">
        <div class="stat-label">进入死信</div>
        <div class="stat-value">{{ deadLetterCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">成功率</div>
        <div class="stat-value">{{ successRate }}%</div>
      </div>
    </div>

    <div class="explanation">
      <div class="exp-title">💡 死信队列的作用</div>
      <div class="exp-content">
        <div class="exp-item">
          <strong>1. 隔离异常消息：</strong>失败消息不会阻塞正常消息的处理
        </div>
        <div class="exp-item">
          <strong>2. 保留失败记录：</strong>可以后续人工介入或自动重试
        </div>
        <div class="exp-item">
          <strong>3. 系统保护：</strong>避免因持续失败导致消费者崩溃
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const failureRate = ref(30)
const maxRetries = ref(3)
const processing = ref(false)
const currentMessage = ref(null)
const lastResult = ref(null)

let messageId = 0
const mainQueue = ref([])
const deadLetterQueue = ref([])
const successCount = ref(0)

const totalMessages = computed(
  () =>
    successCount.value + deadLetterQueue.value.length + mainQueue.value.length
)
const deadLetterCount = computed(() => deadLetterQueue.value.length)
const successRate = computed(() => {
  if (totalMessages.value === 0) return 0
  return Math.round((successCount.value / totalMessages.value) * 100)
})

let addMessage = () => {
  messageId++
  mainQueue.value.push({
    id: messageId,
    retries: 0,
    processing: false
  })
}

const processNext = () => {
  if (mainQueue.value.length === 0 || processing.value) {
    processing.value = false
    return
  }

  let msg = mainQueue[0]
  msg.processing = true
  processing.value = true
  currentMessage.value = msg
  lastResult.value = null

  setTimeout(() => {
    const shouldFail = Math.random() * 100 < failureRate.value

    if (shouldFail) {
      msg.retries++
      msg.processing = false

      if (msg.retries >= maxRetries.value) {
        // 超过最大重试次数，进入死信队列
        mainQueue.value.shift()
        deadLetterQueue.value.push({
          id: msg.id,
          error: `重试 ${msg.retries} 次后仍失败`
        })
        lastResult.value = {
          type: 'error',
          message: `❌ 消息 #${msg.id} 进入死信队列`
        }
      } else {
        // 重新入队
        lastResult.value = {
          type: 'warning',
          message: `⚠️ 消息 #${msg.id} 处理失败，重试 ${msg.retries}/${maxRetries.value}`
        }
      }

      setTimeout(processNext, 500)
    } else {
      // 成功处理
      mainQueue.value.shift()
      successCount.value++
      msg.processing = false
      currentMessage.value = null
      lastResult.value = {
        type: 'success',
        message: `✅ 消息 #${msg.id} 处理成功`
      }

      setTimeout(processNext, 300)
    }
  }, 1000)
}

const retryDeadLetters = () => {
  const failed = deadLetterQueue.value.splice(0)
  failed.forEach((msg) => {
    msg.retries = 0
    mainQueue.value.push(msg)
  })

  if (!processing.value && mainQueue.value.length > 0) {
    processNext()
  }
}

// 自动开始处理
const startProcessing = () => {
  if (!processing.value && mainQueue.value.length > 0) {
    processNext()
  }
}

// 监听队列变化
const checkAndProcess = () => {
  startProcessing()
}

// 添加消息后自动开始处理
const originalAddMessage = addMessage
const addMessageWithAutoProcess = () => {
  originalAddMessage()
  checkAndProcess()
}

// 覆盖 addMessage 方法
addMessage = addMessageWithAutoProcess
</script>

<style scoped>
.dlq-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.control input[type='range'] {
  flex: 1;
}

.control .value {
  font-weight: 600;
  min-width: 3rem;
  text-align: right;
}

.flow-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.75rem;
}

.queue-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.queue-box.main-queue {
  border-color: var(--vp-c-brand);
}

.queue-box.dead-letter {
  border-color: #ef4444;
}

.queue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  font-size: 0.8rem;
  font-weight: 600;
}

.message-list {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
}

.message-item.processing {
  border: 1px solid #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.message-item.failed {
  border: 1px solid #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.msg-id {
  font-weight: 600;
}

.msg-retries {
  font-size: 0.7rem;
  color: #f59e0b;
}

.msg-error {
  font-size: 0.7rem;
  color: #ef4444;
}

.empty {
  text-align: center;
  padding: 1.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.add-btn,
.retry-btn {
  width: 100%;
  padding: 0.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  margin-top: 0.75rem;
  transition: all 0.2s;
}

.add-btn {
  background: var(--vp-c-brand);
  color: white;
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.retry-btn {
  background: #f59e0b;
  color: white;
}

.retry-btn:hover:not(:disabled) {
  background: #d97706;
}

.processor-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.processor-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.processor-icon.active {
  animation: spin 1s linear infinite;
}

.processor-status {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.current-msg {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.last-result {
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
}

.last-result.success {
  background: #dcfce7;
  color: #166534;
}

.last-result.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.last-result.error {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-card.success {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.stat-card.warning {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.stat-value {
  font-size: 1.3rem;
  font-weight: 700;
}

.explanation {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.exp-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.exp-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exp-item {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
