<template>
  <div class="demo-wrapper">
    <div class="demo-header">{{ t('websocket.title') }}</div>
    
    <div class="network-stage">
      
      <div class="node client">
        <div class="node-icon">🎮</div>
        <div class="node-label">{{ t('websocket.player1') }}</div>
        <button
          v-if="isConnected"
          class="action-btn client-btn"
          @click="sendMessage('client')"
        >
          {{ t('websocket.sendMove') }}
        </button>
      </div>

      
      <div class="channel">
        <div v-show="isConnected" class="ws-pipe">
          <div class="line top-line"></div>
          <div class="line bottom-line"></div>
        </div>
        
        
        <div 
          v-for="msg in activeMessages" 
          :key="msg.id" 
          class="ws-packet"
          :class="msg.sender" 
        >
          {{ msg.text }}
        </div>
      </div>

      
      <div class="node server">
        <div class="node-icon">🖥️</div>
        <div class="node-label">{{ t('websocket.gameServer') }}</div>
        <button
          v-if="isConnected"
          class="action-btn server-btn"
          @click="sendMessage('server')"
        >
          {{ t('websocket.broadcast') }}
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
          {{ isConnected ? t('websocket.disconnect') : t('websocket.connect') }}
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
import { useI18n } from '../../../composables/useI18n.js'
import { browserFrontendLocale } from '../../../locales/browser-frontend/index.js'

const { t } = useI18n(browserFrontendLocale)

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
    addLog(t('websocket.logDisconnect'))
    activeMessages.value = []
  } else {
    addLog(t('websocket.logClientRequest'))
    setTimeout(() => {
      addLog(t('websocket.logServerResponse'))
      isConnected.value = true
    }, 600)
  }
}

const sendMessage = (sender) => {
  const text = sender === 'client' ? '【Binary Frame】Move Left' : '【JSON Frame】Boss Skill'
  const msgObj = { id: msgId++, text, sender }
  activeMessages.value.push(msgObj)

  if (sender === 'client') {
    addLog(t('websocket.logClientSend'))
  } else {
    addLog(t('websocket.logServerSend'))
  }


  setTimeout(() => {
    activeMessages.value = activeMessages.value.filter(m => m.id !== msgObj.id)
    if (sender === 'client') addLog(t('websocket.logServerReceive'))
    else addLog(t('websocket.logClientReceive'))
  }, 800)
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
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
  position: relative;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
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
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  color: white;
}

.client-btn {
  background: #3b82f6; /* Blue for client sending */
}
.client-btn:hover { background: #2563eb; }

.server-btn {
  background: #eab308; /* Yellow for server sending */
}
.server-btn:hover { background: #ca8a04; }

.channel {
  flex-grow: 1;
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ws-pipe {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 40px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  height: 4px;
  width: 100%;
  background: repeating-linear-gradient(90deg, #10b981 0px, #10b981 10px, transparent 10px, transparent 20px);
}
.top-line {
  animation: slideRight 1s linear infinite;
}
.bottom-line {
  animation: slideLeft 1s linear infinite;
}

@keyframes slideRight {
  from { background-position: 0 0; }
  to { background-position: 20px 0; }
}
@keyframes slideLeft {
  from { background-position: 0 0; }
  to { background-position: -20px 0; }
}

.ws-packet {
  position: absolute;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  color: white;
  border-radius: 20px;
  white-space: nowrap;
  animation-duration: 0.8s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  z-index: 5;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.ws-packet.client {
  background: #3b82f6;
  top: 0;
  left: 0;
  animation-name: shootRight;
}

.ws-packet.server {
  background: #eab308;
  bottom: 0;
  right: 0;
  animation-name: shootLeft;
}

@keyframes shootRight {
  0% { left: 0; opacity: 1; transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { left: 85%; opacity: 0; transform: scale(0.5); }
}

@keyframes shootLeft {
  0% { right: 0; opacity: 1; transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { right: 85%; opacity: 0; transform: scale(0.5); }
}

.status-panel {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-weight: bold;
  font-size: 0.9rem;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toggle-btn:hover {
  transform: translateY(-2px);
}

.toggle-btn.active {
  border-color: #10b981;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.log-box {
  background: #1e293b;
  color: #6ee7b7; /* lighter green for WS logs */
  padding: 0.8rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  min-height: 100px;
}
</style>
