<template>
  <div class="dns-lookup-demo">
    <div class="control-panel">
      <div class="input-group">
        <label>Domain</label>
        <input
          v-model="domain"
          placeholder="www.example.com"
          class="domain-input"
        />
      </div>
      <div class="toggle-group">
        <label class="toggle">
          <input type="checkbox" v-model="useCache" />
          <span class="slider"></span>
          <span class="label">Simulate Cache Hit</span>
        </label>
      </div>
      <button @click="startLookup" :disabled="isLooking" class="lookup-btn">
        {{ isLooking ? 'Resolving...' : 'Lookup' }}
      </button>
    </div>

    <div class="viz-area">
      <!-- Client -->
      <div class="node client">
        <span class="icon">💻</span>
        <span>Browser</span>
      </div>

      <!-- Servers -->
      <div class="servers-container">
        <div
          v-for="(server, index) in servers"
          :key="server.name"
          class="node server"
          :class="{
            active: currentServer === index,
            success: completed && currentServer === index
          }"
        >
          <div class="server-icon">{{ server.icon }}</div>
          <div class="server-name">{{ server.name }}</div>
          <div class="server-desc">{{ server.desc }}</div>
        </div>
      </div>

      <!-- Packet Animation -->
      <div v-if="packet.visible" class="packet" :style="packetStyle">
        {{ packet.text }}
      </div>
    </div>

    <div class="log-panel" ref="logPanel">
      <div v-for="(log, i) in logs" :key="i" class="log-entry">
        <span class="time">{{ log.time }}ms</span>
        <span class="msg">{{ log.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const domain = ref('www.google.com')
const useCache = ref(false)
const isLooking = ref(false)
const currentServer = ref(-1)
const completed = ref(false)
const logs = ref([])
const packet = ref({ visible: false, text: '?', x: 0, y: 0 })

const servers = [
  { name: 'Root (.)', icon: '🌲', desc: 'Global Root' },
  { name: 'TLD (.com)', icon: '🏢', desc: 'Top Level' },
  { name: 'Authoritative', icon: '📝', desc: 'example.com' }
]

const packetStyle = computed(() => ({
  transform: `translate(${packet.value.x}px, ${packet.value.y}px)`,
  opacity: packet.value.visible ? 1 : 0
}))

const addLog = (message) => {
  logs.value.push({
    time: Math.floor(performance.now() % 10000),
    message
  })
  // Auto scroll
  nextTick(() => {
    const el = document.querySelector('.log-panel')
    if (el) el.scrollTop = el.scrollHeight
  })
}

const startLookup = async () => {
  if (isLooking.value) return
  isLooking.value = true
  currentServer.value = -1
  completed.value = false
  logs.value = []

  addLog(`Starting DNS lookup for ${domain.value}`)

  if (useCache.value) {
    await wait(500)
    addLog('✅ Cache HIT! IP found in browser cache.')
    completed.value = true
    isLooking.value = false
    return
  }

  // Recursive Query Simulation
  for (let i = 0; i < servers.length; i++) {
    const server = servers[i]
    addLog(`Querying ${server.name}...`)

    // Simulate network delay
    currentServer.value = i
    await wait(800)

    if (i < servers.length - 1) {
      addLog(`Received referral to ${servers[i + 1].name}`)
    } else {
      addLog(`✅ Resolved IP: 142.250.185.238`)
    }
  }

  completed.value = true
  isLooking.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.dns-lookup-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.domain-input {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.lookup-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  align-self: flex-end;
}

.lookup-btn:disabled {
  opacity: 0.5;
}

.viz-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  min-height: 150px;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.3s;
  width: 100px;
}

.node.client {
  border-color: #3b82f6;
}

.servers-container {
  display: flex;
  gap: 1rem;
}

.node.server.active {
  border-color: #f59e0b;
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
}

.node.server.success {
  border-color: #10b981;
}

.server-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.server-name {
  font-weight: bold;
  font-size: 0.8rem;
}
.server-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.log-panel {
  background: #1e1e1e;
  color: #10b981;
  padding: 1rem;
  border-radius: 6px;
  height: 150px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.8rem;
}

.log-entry {
  margin-bottom: 0.3rem;
}
.log-entry .time {
  color: #6b7280;
  margin-right: 0.5rem;
}

/* Toggle Switch */
.toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}
.toggle input {
  display: none;
}
.toggle .slider {
  width: 40px;
  height: 20px;
  background: #ccc;
  border-radius: 20px;
  position: relative;
  transition: 0.3s;
}
.toggle .slider:before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: 0.3s;
}
.toggle input:checked + .slider {
  background: var(--vp-c-brand);
}
.toggle input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
