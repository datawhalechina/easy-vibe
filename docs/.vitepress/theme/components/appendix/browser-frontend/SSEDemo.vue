<template>
  <div class="demo-wrapper">
    <div class="demo-header">Server-Sent Events / 单向流推送演示</div>
    
    <div class="network-stage">
      <!-- 客户端 -->
      <div class="node client">
        <div class="node-icon">📱</div>
        <div class="node-label">Client</div>
      </div>

      <!-- 通信链路（带动画的管道） -->
      <div class="channel">
        <div class="pipe" v-show="isConnected">
          <div class="pipe-flow"></div>
        </div>
        <div 
          v-for="msg in activeMessages" 
          :key="msg.id" 
          class="message-chunk" 
        >
          ● {{ msg.text }}
        </div>
      </div>

      <!-- 服务端 -->
      <div class="node server">
        <div class="node-icon">☁️</div>
        <div class="node-label">Server (流管道)</div>
        <button 
          v-if="isConnected" 
          class="action-btn" 
          @click="pushEvent"
        >
          推送大盘数据 👇
        </button>
      </div>
    </div>

    <div class="status-panel">
      <div class="status-controls">
        <button 
          class="toggle-btn" 
          :class="{ active: isConnected }" 
          @click="toggleConnection"
        >
          {{ isConnected ? '⏹ 断开 SSE 连接' : '▶ 建立 SSE 流连接' }}
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

const isConnected = ref(false)
const activeMessages = ref([])
const logs = ref([])
let msgId = 0

const addLog = (msg) => {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)
  if (logs.value.length > 5) logs.value.pop()
}

const toggleConnection = () => {
  if (isConnected.value) {
    isConnected.value = false
    addLog('客户端：主动断开连接 (Connection: close)')
    activeMessages.value = []
  } else {
    isConnected.value = true
    addLog('客户端：发起 HTTP Get, Accept: text/event-stream')
    setTimeout(() => {
      addLog('服务端：保持连接不断开，随时准备单向下发数据。')
    }, 600)
  }
}

const pushEvent = () => {
  const stockPrices = ['上证指数 3012.3', '茅台 ¥1750', '宁德时代涨停', '中石油跌 -1%']
  const randomMsg = stockPrices[Math.floor(Math.random() * stockPrices.length)]
  
  const msgObj = { id: msgId++, text: randomMsg }
  activeMessages.value.push(msgObj)
  addLog(`服务端：向管道喷射数据 "data: ${randomMsg}\\n\\n"`)
  
  // 模拟动画结束移除
  setTimeout(() => {
    activeMessages.value = activeMessages.value.filter(m => m.id !== msgObj.id)
    addLog(`客户端：触发 onmessage 事件，拿到数据：${randomMsg}`)
  }, 1200)
}

onUnmounted(() => {
  isConnected.value = false
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
  border: 1px dashed var(--vp-c-brand-soft);
  position: relative;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  z-index: 2;
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
  cursor: pointer;
  transition: 0.2s;
}

.action-btn:hover {
  opacity: 1;
}

.channel {
  flex-grow: 1;
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pipe {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--vp-c-brand-soft);
  transform: translateY(-50%);
  border-radius: 4px;
  overflow: hidden;
}

.pipe-flow {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    var(--vp-c-brand) 0,
    var(--vp-c-brand) 10px,
    transparent 10px,
    transparent 20px
  );
  animation: flow 1s linear infinite;
}

@keyframes flow {
  from { background-position: 0 0; }
  to { background-position: -28px 0; }
}

.message-chunk {
  position: absolute;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  color: white;
  background: var(--vp-c-brand-1);
  border-radius: 4px;
  white-space: nowrap;
  animation: moveLeft 1.2s linear forwards;
  z-index: 5;
}

@keyframes moveLeft {
  0% { right: 0; opacity: 1; transform: scale(1); }
  90% { right: 90%; opacity: 1; transform: scale(1.1); }
  100% { right: 100%; opacity: 0; transform: scale(0.5); }
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
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
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
