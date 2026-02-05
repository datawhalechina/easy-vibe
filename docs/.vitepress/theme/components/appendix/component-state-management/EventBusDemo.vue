<template>
  <div class="event-bus-demo">
    <div class="demo-header">
      <h4>事件总线通信演示</h4>
      <p class="hint">观察多个独立组件如何通过事件总线进行通信，注意内存管理的重要性</p>
    </div>

    <div class="architecture-view">
      <div class="central-hub" :class="{ active: isTransmitting }">
        <div class="hub-core">
          <div class="hub-icon">🔌</div>
          <div class="hub-label">Event Bus</div>
          <div class="hub-status">{{ isTransmitting ? '传输中...' : '待机' }}</div>
        </div>
        <div class="hub-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
        </div>
      </div>

      <div class="connected-components">
        <div
          v-for="comp in components"
          :key="comp.id"
          class="component-node"
          :class="{ active: comp.isActive, emitting: comp.isEmitting, listening: comp.isListening }"
          :style="{ top: comp.y + '%', left: comp.x + '%' }"
        >
          <div class="node-header">
            <span class="node-icon">{{ comp.icon }}</span>
            <span class="node-name">{{ comp.name }}</span>
          </div>
          <div class="node-status">
            <span class="status-dot" :class="{ active: comp.isListening }"></span>
            {{ comp.isListening ? '监听中' : '未监听' }}
          </div>
          <button class="emit-btn" @click="emitEvent(comp)">
            发送事件
          </button>
        </div>
      </div>

      <svg class="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" :fill="isTransmitting ? 'var(--vp-c-brand)' : 'var(--vp-c-divider)'" />
          </marker>
        </defs>
        <line
          v-for="(comp, index) in components"
          :key="index"
          class="connection-line"
          :class="{ active: comp.isEmitting || isTransmitting }"
          :x1="comp.x"
          :y1="comp.y"
          x2="50"
          y2="50"
          marker-end="url(#arrowhead)"
        />
      </svg>
    </div>

    <div class="event-log">
      <div class="log-header">
        <h5>📨 事件日志</h5>
        <button class="clear-btn" @click="clearLogs">清空</button>
      </div>
      <div class="log-content">
        <div v-if="logs.length === 0" class="empty-log">
          暂无事件记录，点击组件上的"发送事件"按钮开始测试
        </div>
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="log-item"
          :class="log.type"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-type">{{ log.type === 'emit' ? '发送' : '接收' }}</span>
          <span class="log-from">{{ log.from }}</span>
          <span class="log-arrow">➜</span>
          <span class="log-to">{{ log.to }}</span>
          <span class="log-data">{{ log.data }}</span>
        </div>
      </div>
    </div>

    <div class="memory-warning">
      <div class="warning-icon">⚠️</div>
      <div class="warning-content">
        <h6>内存泄漏风险提醒</h6>
        <p>使用 Event Bus 时，如果组件销毁前没有取消订阅（$off），会导致内存泄漏。推荐在 beforeUnmount 钩子中清理订阅。</p>
        <pre><code>// 正确做法
export default {
  created() {
    this.$bus.$on('event', this.handler)
  },
  beforeUnmount() {
    this.$bus.$off('event', this.handler) // 必须取消订阅
  }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue'

// 组件定义
const components = reactive([
  { id: 1, name: 'Header', icon: '📌', x: 15, y: 15, isActive: false, isEmitting: false, isListening: true },
  { id: 2, name: 'Sidebar', icon: '📑', x: 85, y: 15, isActive: false, isEmitting: false, isListening: true },
  { id: 3, name: 'ProductList', icon: '🛍️', x: 15, y: 85, isActive: false, isEmitting: false, isListening: true },
  { id: 4, name: 'Cart', icon: '🛒', x: 85, y: 85, isActive: false, isEmitting: false, isListening: true }
])

const isTransmitting = ref(false)
const logs = ref([])

// 格式化时间
const formatTime = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
}

// 添加日志
const addLog = (type, from, to, data) => {
  logs.value.unshift({
    type,
    time: formatTime(),
    from,
    to,
    data: JSON.stringify(data)
  })
  if (logs.value.length > 50) {
    logs.value = logs.value.slice(0, 50)
  }
}

// 发送事件
const emitEvent = (comp) => {
  // 触发发送动画
  comp.isEmitting = true
  isTransmitting.value = true

  // 记录发送日志
  addLog('emit', comp.name, 'Event Bus', { event: 'user:action', payload: { from: comp.name } })

  // 模拟其他组件接收
  components.forEach(target => {
    if (target.id !== comp.id && target.isListening) {
      setTimeout(() => {
        target.isActive = true
        addLog('receive', 'Event Bus', target.name, { event: 'user:action', payload: { from: comp.name } })
        setTimeout(() => {
          target.isActive = false
        }, 500)
      }, 300 + Math.random() * 200)
    }
  })

  // 清理动画状态
  setTimeout(() => {
    comp.isEmitting = false
    isTransmitting.value = false
  }, 1000)
}

// 清空日志
const clearLogs = () => {
  logs.value = []
}

onBeforeUnmount(() => {
  // 模拟清理订阅
  components.forEach(comp => {
    comp.isListening = false
  })
})
</script>

<style scoped>
.event-bus-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.architecture-view {
  position: relative;
  min-height: 400px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}

.central-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.hub-core {
  position: relative;
  z-index: 2;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.central-hub.active .hub-core {
  transform: scale(1.1);
  box-shadow: 0 0 30px var(--vp-c-brand);
}

.hub-icon {
  font-size: 28px;
  margin-bottom: 2px;
}

.hub-label {
  font-size: 11px;
  font-weight: 600;
  color: white;
  text-align: center;
}

.hub-status {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 2px;
}

.hub-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.central-hub.active .ring {
  border-color: var(--vp-c-brand);
  opacity: 0.6;
}

.ring-1 { width: 140px; height: 140px; }
.ring-2 { width: 180px; height: 180px; }
.ring-3 { width: 220px; height: 220px; }

.central-hub.active .ring-1 { animation: pulse1 1s ease infinite; }
.central-hub.active .ring-2 { animation: pulse2 1s ease infinite 0.2s; }
.central-hub.active .ring-3 { animation: pulse3 1s ease infinite 0.4s; }

@keyframes pulse1 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.3; }
}

@keyframes pulse2 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.2; }
}

@keyframes pulse3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
  50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.1; }
}

.connected-components {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.component-node {
  position: absolute;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  min-width: 120px;
  pointer-events: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.component-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-node.active {
  border-color: #22c55e;
  background: #f0fdf4;
  box-shadow: 0 0 0 3px #bbf7d0;
}

.component-node.emitting {
  border-color: var(--vp-c-brand);
  animation: emitPulse 0.5s ease;
}

@keyframes emitPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.node-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.node-icon {
  font-size: 16px;
}

.node-name {
  font-weight: 600;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.node-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  transition: all 0.3s ease;
}

.status-dot.active {
  background: #22c55e;
  box-shadow: 0 0 4px #22c55e;
  animation: blink 1.5s ease infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.emit-btn {
  width: 100%;
  padding: 6px 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.emit-btn:hover {
  background: var(--vp-c-brand-dark);
}

.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connection-line {
  stroke: var(--vp-c-divider);
  stroke-width: 2;
  fill: none;
  transition: all 0.3s ease;
}

.connection-line.active {
  stroke: var(--vp-c-brand);
  stroke-width: 3;
  filter: drop-shadow(0 0 4px var(--vp-c-brand));
}

.event-log {
  margin-top: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.log-header h5 {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.clear-btn {
  padding: 4px 12px;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
}

.empty-log {
  text-align: center;
  padding: 40px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.log-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.log-item.emit {
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
}

.log-item.receive {
  background: #f0fdf4;
  border-left: 3px solid #22c55e;
}

.log-time {
  color: var(--vp-c-text-3);
  font-size: 11px;
}

.log-type {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
}

.log-item.emit .log-type {
  background: #dbeafe;
  color: #1d4ed8;
}

.log-item.receive .log-type {
  background: #bbf7d0;
  color: #15803d;
}

.log-from,
.log-to {
  color: var(--vp-c-text-2);
}

.log-arrow {
  color: var(--vp-c-divider);
}

.log-data {
  color: var(--vp-c-brand);
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.memory-warning {
  margin-top: 20px;
  padding: 16px;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  display: flex;
  gap: 12px;
}

.warning-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.warning-content h6 {
  margin: 0 0 4px 0;
  color: #92400e;
  font-size: 14px;
}

.warning-content p {
  margin: 0 0 8px 0;
  color: #a16207;
  font-size: 13px;
  line-height: 1.5;
}

.warning-content pre {
  margin: 0;
  padding: 12px;
  background: #fef3c7;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
}

.warning-content code {
  color: #92400e;
  font-family: monospace;
}
</style>
