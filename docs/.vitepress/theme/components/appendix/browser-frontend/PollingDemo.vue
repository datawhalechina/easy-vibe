<template>
  <div class="demo-wrapper">
    <div class="demo-header">Polling / 短轮询交互演示</div>
    
    <div class="network-stage">
      <!-- 客户端 -->
      <div class="node client">
        <div class="node-icon">💻</div>
        <div class="node-label">Client</div>
      </div>

      <!-- 通信链路 -->
      <div class="channel">
        <div class="message req" :class="{ 'moving-right': isRequesting }">
          <span v-if="isRequesting">"有新消息吗？" →</span>
        </div>
        <div class="message res" :class="{ 'moving-left': isResponding }">
          <span v-if="isResponding">← "{{ serverResponse }}"</span>
        </div>
      </div>

      <!-- 服务端 -->
      <div class="node server">
        <div class="node-icon">🖧</div>
        <div class="node-label">Server (无状态)</div>
        <button class="action-btn" @click="triggerNewMessage" :disabled="hasNewMessage">
          制造新消息
        </button>
      </div>
    </div>

    <div class="status-panel">
      <div class="status-controls">
        <button 
          class="toggle-btn" 
          :class="{ active: isPolling }" 
          @click="togglePolling"
        >
          {{ isPolling ? '⏹ 停止轮询' : '▶ 开始定时轮询 (1s)' }}
        </button>
      </div>
      <div class="log-box">
        <div v-for="(log, idx) in logs" :key="idx" class="log-line">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const isPolling = ref(false)
const isRequesting = ref(false)
const isResponding = ref(false)
const serverResponse = ref('')
const hasNewMessage = ref(false)
const logs = ref([])
let timer = null

const addLog = (msg) => {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)
  if (logs.value.length > 5) logs.value.pop()
}

const triggerNewMessage = () => {
  hasNewMessage.value = true
  addLog('服务端：偷偷准备了一条新消息 🤫')
}

const performPoll = () => {
  if (isRequesting.value || isResponding.value) return
  
  // 发起请求
  isRequesting.value = true
  addLog('客户端：发起 HTTP GET 请求...')
  
  setTimeout(() => {
    isRequesting.value = false
    // 服务端处理并响应
    if (hasNewMessage.value) {
      serverResponse.value = '有啦！这是刚收到的弹幕'
      hasNewMessage.value = false
    } else {
      serverResponse.value = '没有'
    }
    isResponding.value = true
    addLog(`服务端：响应 "${serverResponse.value}"，然后关闭连接。`)
    
    setTimeout(() => {
      isResponding.value = false
    }, 600)
  }, 600)
}

const togglePolling = () => {
  if (isPolling.value) {
    clearInterval(timer)
    isPolling.value = false
    addLog('停止定时器。')
  } else {
    isPolling.value = true
    addLog('启动 setInterval() 狂轰乱炸模式。')
    performPoll()
    timer = setInterval(performPoll, 2500) // 放慢演示速度
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.network-stage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px dashed var(--vp-c-divider);
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}

.node-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.node-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.action-btn {
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  opacity: 0.9;
}
.action-btn:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
}

.channel {
  flex-grow: 1;
  position: relative;
  height: 60px;
  border-top: 2px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.message {
  position: absolute;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.6s linear;
}

.message.req {
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  top: 0;
  left: 0;
}

.message.res {
  color: var(--vp-c-warning-1, #d97706);
  background: var(--vp-c-warning-soft, rgba(217, 119, 6, 0.1));
  bottom: 0;
  right: 0;
}

.moving-right {
  opacity: 1;
  transform: translateX(100px);
}

.moving-left {
  opacity: 1;
  transform: translateX(-100px);
}

.status-panel {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-weight: bold;
  transition: 0.2s;
}

.toggle-btn.active {
  border-color: var(--vp-c-danger, #e74c3c);
  color: var(--vp-c-danger, #e74c3c);
  background: rgba(231, 76, 60, 0.1);
}

.log-box {
  background: #1e293b;
  color: #a7f3d0;
  padding: 0.8rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  min-height: 100px;
}
</style>
