<script setup>
import { ref, computed } from 'vue'

const services = ref([
  { id: 1, name: 'Vite 前端', port: 5173, status: 'running', color: '#646cff' },
])

const nextServices = [
  { name: 'React 项目', defaultPort: 5173, color: '#61dafb' },
  { name: 'Express API', defaultPort: 3000, color: '#10b981' },
  { name: 'Flask 后端', defaultPort: 5000, color: '#f59e0b' },
]

const nextServiceIndex = ref(0)
const conflictMessage = ref('')
const resolveMessage = ref('')
let idCounter = 2

const nextService = computed(() => nextServices[nextServiceIndex.value])

const occupiedPorts = computed(() => services.value.map(s => s.port))

function tryStart() {
  conflictMessage.value = ''
  resolveMessage.value = ''

  const svc = nextService.value
  if (occupiedPorts.value.includes(svc.defaultPort)) {
    conflictMessage.value = `❌ 端口 ${svc.defaultPort} 已被「${services.value.find(s => s.port === svc.defaultPort).name}」占用！Error: EADDRINUSE :::${svc.defaultPort}`
  } else {
    services.value.push({
      id: idCounter++,
      name: svc.name,
      port: svc.defaultPort,
      status: 'running',
      color: svc.color
    })
    resolveMessage.value = `✅ ${svc.name} 成功启动在端口 ${svc.defaultPort}`
    advanceNext()
  }
}

function autoResolve() {
  const svc = nextService.value
  let newPort = svc.defaultPort
  while (occupiedPorts.value.includes(newPort)) {
    newPort++
  }

  services.value.push({
    id: idCounter++,
    name: svc.name,
    port: newPort,
    status: 'running',
    color: svc.color
  })

  if (newPort !== svc.defaultPort) {
    resolveMessage.value = `✅ 端口 ${svc.defaultPort} 被占用，自动换到端口 ${newPort}！（很多框架会自动帮你做这件事）`
  } else {
    resolveMessage.value = `✅ ${svc.name} 成功启动在端口 ${newPort}`
  }
  conflictMessage.value = ''
  advanceNext()
}

function killService(id) {
  const svc = services.value.find(s => s.id === id)
  if (svc) {
    services.value = services.value.filter(s => s.id !== id)
    resolveMessage.value = `🗑️ 已停止「${svc.name}」，端口 ${svc.port} 已释放`
    conflictMessage.value = ''
  }
}

function advanceNext() {
  nextServiceIndex.value = (nextServiceIndex.value + 1) % nextServices.length
}

function reset() {
  services.value = [
    { id: 1, name: 'Vite 前端', port: 5173, status: 'running', color: '#646cff' }
  ]
  idCounter = 2
  nextServiceIndex.value = 0
  conflictMessage.value = ''
  resolveMessage.value = ''
}
</script>

<template>
  <div class="port-conflict-demo">
    <div class="control-panel">
      <div class="control-left">
        <span class="panel-label">尝试启动：</span>
        <span class="next-svc" :style="{ color: nextService.color }">{{ nextService.name }}</span>
        <span class="next-port">（默认端口 {{ nextService.defaultPort }}）</span>
      </div>
      <div class="control-btns">
        <button class="action-btn" @click="tryStart">直接启动</button>
        <button class="action-btn secondary" @click="autoResolve">智能启动</button>
        <button class="action-btn ghost" @click="reset">重置</button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="port-list">
        <div class="port-list-header">
          <span>当前运行的服务</span>
          <span class="port-count">{{ services.length }} 个</span>
        </div>
        <transition-group name="list" tag="div" class="port-items">
          <div
            v-for="svc in services"
            :key="svc.id"
            class="port-item"
          >
            <div class="port-dot" :style="{ backgroundColor: svc.color }" />
            <span class="svc-name">{{ svc.name }}</span>
            <code class="svc-port">:{{ svc.port }}</code>
            <span class="svc-status">🟢 运行中</span>
            <button class="kill-btn" title="停止服务" @click="killService(svc.id)">✕</button>
          </div>
        </transition-group>
      </div>

      <transition name="fade">
        <div v-if="conflictMessage" class="msg-box error">
          <div class="msg-content">{{ conflictMessage }}</div>
          <div class="msg-hint">
            <strong>解决办法：</strong>
            ① 停掉占用端口的进程（点击上方 ✕ 按钮）；
            ② 改用其他端口（点击"智能启动"）；
            ③ 命令行排查：<code>lsof -i :{{ nextService.defaultPort }}</code>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="resolveMessage && !conflictMessage" class="msg-box success">
          {{ resolveMessage }}
        </div>
      </transition>
    </div>

    <div class="info-box">
      <strong>端口冲突：</strong>一个端口同一时刻只能被一个程序监听。如果你看到 <code>EADDRINUSE</code> 错误，说明这个端口已经被占了。要么杀掉旧进程，要么换个端口。
    </div>
  </div>
</template>

<style scoped>
.port-conflict-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 0.5rem 0;
}

.control-panel {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.control-left {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.panel-label {
  font-size: 0.9rem;
  font-weight: 600;
}

.next-svc {
  font-weight: 700;
  font-size: 0.9rem;
}

.next-port {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.control-btns {
  display: flex;
  gap: 0.4rem;
}

.action-btn {
  padding: 0.35rem 0.7rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: opacity 0.2s;
}

.action-btn.secondary {
  background: var(--vp-c-green-1);
}

.action-btn.ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.visualization-area {
  padding: 1rem;
}

.port-list {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.port-list-header {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
}

.port-count {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.port-items {
  position: relative;
}

.port-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.port-item:last-child {
  border-bottom: none;
}

.port-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.svc-name {
  font-weight: 600;
  min-width: 80px;
}

.svc-port {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}

.svc-status {
  font-size: 0.75rem;
  margin-left: auto;
  color: var(--vp-c-green-1);
}

.kill-btn {
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  transition: all 0.2s;
}

.kill-btn:hover {
  color: var(--vp-c-red-1);
  background: rgba(239, 68, 68, 0.1);
}

.msg-box {
  margin-top: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.msg-box.error {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid var(--vp-c-red-1);
  color: var(--vp-c-red-1);
}

.msg-box.success {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid var(--vp-c-green-1);
  color: var(--vp-c-green-1);
}

.msg-content {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.msg-hint {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.msg-hint code {
  font-size: 0.78rem;
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.info-box {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

.info-box code {
  font-size: 0.82rem;
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from { opacity: 0; transform: translateX(-20px); }
.list-leave-to { opacity: 0; transform: translateX(20px); }

@media (max-width: 640px) {
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
