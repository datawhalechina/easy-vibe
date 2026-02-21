<script setup>
import { ref, computed } from 'vue'

const selectedBuilding = ref('web-server')

const buildings = {
  'web-server': {
    name: 'Web 服务器大楼',
    ip: '192.168.1.100',
    doors: [
      { port: 80, label: 'HTTP', status: 'open', color: '#10b981', desc: '网页访问入口' },
      { port: 443, label: 'HTTPS', status: 'open', color: '#3b82f6', desc: '加密网页入口' },
      { port: 22, label: 'SSH', status: 'open', color: '#f59e0b', desc: '远程管理通道' },
      { port: 3306, label: 'MySQL', status: 'closed', color: '#ef4444', desc: '数据库（已关闭）' }
    ]
  },
  'dev-machine': {
    name: '你的开发电脑',
    ip: '127.0.0.1',
    doors: [
      { port: 3000, label: 'React', status: 'open', color: '#61dafb', desc: '前端开发服务' },
      { port: 5173, label: 'Vite', status: 'open', color: '#646cff', desc: 'Vite 开发服务' },
      { port: 8080, label: 'API', status: 'open', color: '#10b981', desc: '后端 API 服务' },
      { port: 5432, label: 'PostgreSQL', status: 'open', color: '#336791', desc: '本地数据库' }
    ]
  }
}

const currentBuilding = computed(() => buildings[selectedBuilding.value])
const knockingPort = ref(null)
const knockResult = ref('')

function knockDoor(door) {
  knockingPort.value = door.port
  if (door.status === 'open') {
    knockResult.value = `✅ 端口 ${door.port} 开着！${door.label} 服务正在监听，准备接收你的请求。`
  } else {
    knockResult.value = `🚫 端口 ${door.port} 关着！没有程序在监听这个端口，连接被拒绝 (Connection Refused)。`
  }
  setTimeout(() => { knockingPort.value = null }, 600)
}
</script>

<template>
  <div class="port-analogy-demo">
    <div class="control-panel">
      <span class="panel-label">选择一栋"大楼"：</span>
      <div class="btn-group">
        <button
          v-for="(b, key) in buildings"
          :key="key"
          :class="['tab-btn', { active: selectedBuilding === key }]"
          @click="selectedBuilding = key; knockResult = ''"
        >
          {{ b.name }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="building">
        <div class="building-roof">
          <span class="building-name">{{ currentBuilding.name }}</span>
          <span class="building-ip">IP: {{ currentBuilding.ip }}</span>
        </div>
        <div class="doors-grid">
          <div
            v-for="door in currentBuilding.doors"
            :key="door.port"
            :class="['door-card', door.status, { knocking: knockingPort === door.port }]"
            @click="knockDoor(door)"
          >
            <div class="door-number" :style="{ backgroundColor: door.color }">
              {{ door.port }}
            </div>
            <div class="door-info">
              <span class="door-label">{{ door.label }}</span>
              <span class="door-desc">{{ door.desc }}</span>
            </div>
            <div :class="['door-status', door.status]">
              {{ door.status === 'open' ? '🟢 监听中' : '🔴 已关闭' }}
            </div>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="knockResult" :class="['knock-result', { error: knockResult.startsWith('🚫') }]">
          {{ knockResult }}
        </div>
      </transition>
    </div>

    <div class="info-box">
      <strong>核心比喻：</strong>IP 地址 = 大楼地址，端口号 = 房间门牌号。一台电脑上可以同时运行多个服务，每个服务"占用"一个端口号，就像同一栋大楼里的不同房间。
    </div>
  </div>
</template>

<style scoped>
.port-analogy-demo {
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
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.panel-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.btn-group {
  display: flex;
  gap: 0.5rem;
}

.tab-btn {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.visualization-area {
  padding: 1rem;
}

.building {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.building-roof {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--vp-c-divider);
}

.building-name {
  font-weight: 700;
  font-size: 0.95rem;
}

.building-ip {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.doors-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 1rem;
}

.door-card {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.door-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.door-card.knocking {
  animation: knock 0.3s ease 2;
}

@keyframes knock {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

.door-card.closed {
  opacity: 0.6;
}

.door-number {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  font-family: var(--vp-font-family-mono);
  flex-shrink: 0;
}

.door-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 0;
}

.door-label {
  font-weight: 600;
  font-size: 0.88rem;
}

.door-desc {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.door-status {
  font-size: 0.75rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.knock-result {
  margin-top: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.88rem;
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
  border: 1px solid var(--vp-c-green-1);
}

.knock-result.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-red-1);
  border-color: var(--vp-c-red-1);
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .doors-grid {
    grid-template-columns: 1fr;
  }
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
