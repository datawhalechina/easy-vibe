<!--
  DeadLetterQueueDemo.vue
  死信队列演示 - 处理失败消息
-->
<template>
  <div class="dlq-demo">
    <div class="demo-header">
      <span class="icon">🚑</span>
      <span class="title">死信队列</span>
      <span class="subtitle">消息的"急救站" - 处理失败消息</span>
    </div>

    <div class="controls">
      <div class="control">
        <label>失败率：</label>
        <input
          v-model.number="failureRate"
          type="range"
          min="0"
          max="100"
          step="10"
        >
        <span class="value">{{ failureRate }}%</span>
      </div>
      <div class="control">
        <label>最大重试：</label>
        <input
          v-model.number="maxRetries"
          type="range"
          min="1"
          max="5"
          step="1"
        >
        <span class="value">{{ maxRetries }}</span>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-container">
        <div class="main-queue-section">
          <div class="section-title">
            📦 主队列
          </div>
          <div class="queue-box main-queue">
            <div class="queue-header">
              <span>正常消息队列</span>
              <span class="count">{{ mainQueue.length }} 条</span>
            </div>
            <div class="message-list">
              <div
                v-for="msg in mainQueue.slice(0, 3)"
                :key="msg.id"
                class="message-item"
                :class="{ processing: msg.processing }"
              >
                <div class="msg-id">
                  #{{ msg.id }}
                </div>
                <div
                  v-if="msg.retries > 0"
                  class="msg-retries"
                >
                  重试: {{ msg.retries }}/{{ maxRetries }}
                </div>
              </div>
              <div
                v-if="mainQueue.length === 0"
                class="empty"
              >
                队列为空
              </div>
              <div
                v-else-if="mainQueue.length > 3"
                class="more"
              >
                还有 {{ mainQueue.length - 3 }} 条...
              </div>
            </div>
          </div>
          <button
            class="add-btn"
            :disabled="processing"
            @click="addMessage"
          >
            + 添加消息
          </button>
        </div>

        <div class="processing-section">
          <div class="section-title">
            ⚙️ 消费处理
          </div>
          <div class="processor-box">
            <div
              class="processor-icon"
              :class="{ active: processing }"
            >
              {{ processing ? '⚙️' : '💤' }}
            </div>
            <div class="processor-status">
              {{ processing ? '处理中...' : '空闲' }}
            </div>
            <div
              v-if="currentMessage"
              class="current-msg"
            >
              处理: #{{ currentMessage.id }}
            </div>
            <div
              v-if="lastResult"
              class="last-result"
              :class="lastResult.type"
            >
              {{ lastResult.message }}
            </div>
          </div>
        </div>

        <div class="dlq-section">
          <div class="section-title">
            ⚠️ 死信队列
          </div>
          <div class="queue-box dead-letter">
            <div class="queue-header">
              <span>失败消息</span>
              <span class="count">{{ deadLetterQueue.length }} 条</span>
            </div>
            <div class="message-list">
              <div
                v-for="msg in deadLetterQueue.slice(0, 2)"
                :key="msg.id"
                class="message-item failed"
              >
                <div class="msg-id">
                  #{{ msg.id }}
                </div>
                <div class="msg-error">
                  {{ msg.error }}
                </div>
              </div>
              <div
                v-if="deadLetterQueue.length === 0"
                class="empty"
              >
                无失败消息
              </div>
              <div
                v-else-if="deadLetterQueue.length > 2"
                class="more"
              >
                还有 {{ deadLetterQueue.length - 2 }} 条...
              </div>
            </div>
          </div>
          <button
            class="retry-btn"
            :disabled="deadLetterQueue.length === 0"
            @click="retryDeadLetters"
          >
            🔄 重试死信
          </button>
        </div>
      </div>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-label">
            总消息数
          </div>
          <div class="stat-value">
            {{ totalMessages }}
          </div>
        </div>
        <div class="stat-card success">
          <div class="stat-label">
            成功处理
          </div>
          <div class="stat-value">
            {{ successCount }}
          </div>
        </div>
        <div class="stat-card warning">
          <div class="stat-label">
            进入死信
          </div>
          <div class="stat-value">
            {{ deadLetterCount }}
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">
            成功率
          </div>
          <div class="stat-value">
            {{ successRate }}%
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想:</strong>失败消息进入死信队列,避免阻塞正常消息,可后续人工介入或自动重试
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

  let msg = mainQueue.value[0]
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
        // 超过最大重试次数,进入死信队列
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
          message: `⚠️ 消息 #${msg.id} 处理失败,重试 ${msg.retries}/${maxRetries.value}`
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
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.control input[type='range'] {
  flex: 1;
}

.control .value {
  font-weight: 600;
  min-width: 3rem;
  text-align: right;
}

.demo-content {
  margin-bottom: 0.75rem;
}

.flow-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.5rem;
}

.queue-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.queue-box.main-queue {
  border-color: var(--vp-c-brand);
}

.queue-box.dead-letter {
  border-color: var(--vp-c-danger);
}

.queue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  font-size: 0.75rem;
  font-weight: 600;
}

.message-list {
  max-height: 150px;
  
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
  font-size: 0.75rem;
}

.message-item.processing {
  border: 1px solid var(--vp-c-warning);
  background: var(--vp-c-warning-soft);
}

.message-item.failed {
  border: 1px solid var(--vp-c-danger);
  background: var(--vp-c-danger-soft);
}

.msg-id {
  font-weight: 600;
}

.msg-retries {
  font-size: 0.65rem;
  color: var(--vp-c-warning);
}

.msg-error {
  font-size: 0.65rem;
  color: var(--vp-c-danger);
}

.empty, .more {
  text-align: center;
  padding: 1rem 0.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.add-btn,
.retry-btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  transition: all 0.2s;
}

.add-btn {
  background: var(--vp-c-brand);
  color: white;
}

.add-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.retry-btn {
  background: var(--vp-c-warning);
  color: white;
}

.retry-btn:hover:not(:disabled) {
  opacity: 0.8;
}

.processor-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.processor-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.processor-icon.active {
  animation: spin 1s linear infinite;
}

.processor-status {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.current-msg {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.last-result {
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
}

.last-result.success {
  background: var(--vp-c-success);
  color: white;
}

.last-result.warning {
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-dark);
}

.last-result.error {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-dark);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-card.success {
  border-color: var(--vp-c-success);
  background: var(--vp-c-success-soft);
}

.stat-card.warning {
  border-color: var(--vp-c-danger);
  background: var(--vp-c-danger-soft);
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
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
