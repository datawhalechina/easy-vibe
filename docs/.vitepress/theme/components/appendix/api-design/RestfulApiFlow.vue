<template>
  <div class="raf-root">
    <div class="raf-layout">
      <!-- Left: Client Side -->
      <div class="raf-left">
        <div class="raf-header">
          <span class="raf-icon">💻</span>
          <span class="raf-title">Client (Browser/App)</span>
        </div>
        
        <div class="raf-controls">
          <div class="raf-scenarios">
            <button 
              v-for="s in scenarios" 
              :key="s.id"
              :class="['raf-chip', { active: currentScenario.id === s.id }]"
              @click="selectScenario(s)"
              :disabled="processing"
            >
              {{ s.label }}
            </button>
          </div>
        </div>

        <div class="raf-request-box">
          <div class="raf-http-line">
            <span :class="['raf-method', currentScenario.method]">{{ currentScenario.method }}</span>
            <span class="raf-url">{{ currentScenario.url }}</span>
          </div>
          <div v-if="currentScenario.body" class="raf-code-block">
            {{ JSON.stringify(currentScenario.body, null, 2) }}
          </div>
          <button 
            class="raf-send-btn" 
            @click="sendRequest" 
            :disabled="processing"
          >
            {{ processing ? 'Sending...' : 'Send Request' }}
          </button>
        </div>

        <div class="raf-response-box" v-if="response">
          <div class="raf-status-line">
            <span class="raf-label">Response Status:</span>
            <span :class="['raf-status-badge', getStatusColor(response.status)]">
              {{ response.status }} {{ response.statusText }}
            </span>
          </div>
          <div class="raf-code-block response-body">
            {{ JSON.stringify(response.body, null, 2) }}
          </div>
        </div>
      </div>

      <!-- Right: Server Side -->
      <div class="raf-right">
        <div class="raf-header server-header">
          <span class="raf-icon">☁️</span>
          <span class="raf-title">Server (API)</span>
        </div>

        <div class="raf-server-state">
          <!-- Database View -->
          <div class="raf-section">
            <div class="raf-section-title">📦 Database (Users Resource)</div>
            <div class="raf-db-view">
              <transition-group name="list">
                <div v-for="user in db" :key="user.id" class="raf-db-item">
                  <span class="raf-db-id">ID: {{ user.id }}</span>
                  <span class="raf-db-name">{{ user.name }}</span>
                  <span class="raf-db-role">({{ user.role }})</span>
                </div>
              </transition-group>
              <div v-if="db.length === 0" class="raf-empty">No users found</div>
            </div>
          </div>

          <!-- Logs -->
          <div class="raf-section">
            <div class="raf-section-title">📜 Server Logs</div>
            <div class="raf-logs" ref="logsRef">
              <div v-for="(log, i) in logs" :key="i" class="raf-log-line">
                <span class="raf-log-time">[{{ log.time }}]</span>
                <span :class="log.type">{{ log.msg }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const processing = ref(false)
const response = ref(null)
const logs = ref([])
const logsRef = ref(null)

const db = ref([
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" }
])

const scenarios = [
  { id: 'get-all', label: 'GET /users', method: 'GET', url: '/api/users', body: null },
  { id: 'get-one', label: 'GET /users/1', method: 'GET', url: '/api/users/1', body: null },
  { id: 'create', label: 'POST /users', method: 'POST', url: '/api/users', body: { name: "Charlie", role: "user" } },
  { id: 'not-found', label: 'GET /users/99', method: 'GET', url: '/api/users/99', body: null },
  { id: 'delete', label: 'DELETE /users/1', method: 'DELETE', url: '/api/users/1', body: null },
]

const currentScenario = ref(scenarios[0])

function selectScenario(s) {
  currentScenario.value = s
  response.value = null
}

function addLog(msg, type = 'info') {
  const now = new Date()
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  logs.value.push({ time, msg, type })
  nextTick(() => {
    if (logsRef.value) logsRef.value.scrollTop = logsRef.value.scrollHeight
  })
}

function getStatusColor(status) {
  if (status >= 200 && status < 300) return 'status-success'
  if (status >= 400 && status < 500) return 'status-error'
  return 'status-neutral'
}

async function sendRequest() {
  processing.value = true
  response.value = null
  addLog(`Received ${currentScenario.value.method} ${currentScenario.value.url}`, 'info')
  
  await new Promise(r => setTimeout(r, 600)) // Simulate network latency

  const { method, url, body } = currentScenario.value
  
  // Router Logic Simulation
  if (method === 'GET' && url === '/api/users') {
    response.value = { status: 200, statusText: 'OK', body: db.value }
    addLog('Matched route: GET /users -> listUsers()', 'success')
  } 
  else if (method === 'GET' && url.match(/\/api\/users\/\d+/)) {
    const id = parseInt(url.split('/').pop())
    const user = db.value.find(u => u.id === id)
    if (user) {
      response.value = { status: 200, statusText: 'OK', body: user }
      addLog(`Found user ${id}`, 'success')
    } else {
      response.value = { status: 404, statusText: 'Not Found', body: { error: "User not found" } }
      addLog(`User ${id} not found in DB`, 'error')
    }
  }
  else if (method === 'POST' && url === '/api/users') {
    const newUser = { id: Math.max(0, ...db.value.map(u => u.id)) + 1, ...body }
    db.value.push(newUser)
    response.value = { status: 201, statusText: 'Created', body: newUser }
    addLog(`Created user ${newUser.id}`, 'success')
  }
  else if (method === 'DELETE' && url.match(/\/api\/users\/\d+/)) {
    const id = parseInt(url.split('/').pop())
    const idx = db.value.findIndex(u => u.id === id)
    if (idx !== -1) {
      db.value.splice(idx, 1)
      response.value = { status: 204, statusText: 'No Content', body: null }
      addLog(`Deleted user ${id}`, 'success')
    } else {
      response.value = { status: 404, statusText: 'Not Found', body: { error: "User not found" } }
      addLog(`User ${id} not found for deletion`, 'error')
    }
  }

  processing.value = false
}
</script>

<style scoped>
.raf-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.raf-layout {
  display: flex;
  min-height: 400px;
}

.raf-left, .raf-right {
  flex: 1;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
}

.raf-left {
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.raf-right {
  background: var(--vp-c-bg-alt);
}

.raf-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1em;
  color: var(--vp-c-text-1);
}

.raf-scenarios {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.raf-chip {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.raf-chip:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.raf-chip.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.raf-request-box {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.raf-http-line {
  display: flex;
  gap: 10px;
  font-family: monospace;
  margin-bottom: 8px;
  align-items: center;
  font-size: 1.1em;
}

.raf-method {
  font-weight: bold;
}
.raf-method.GET { color: #61affe; }
.raf-method.POST { color: #49cc90; }
.raf-method.DELETE { color: #f93e3e; }

.raf-code-block {
  background: var(--vp-c-bg);
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: pre;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.raf-send-btn {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}
.raf-send-btn:hover {
  opacity: 0.9;
}
.raf-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.raf-response-box {
  margin-top: auto;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.raf-status-line {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.raf-status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 8px;
}
.status-success { background: #d1fae5; color: #065f46; }
.status-error { background: #fee2e2; color: #991b1b; }
.status-neutral { background: #f3f4f6; color: #374151; }

.raf-db-view {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.raf-db-item {
  display: flex;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  font-size: 12px;
  align-items: center;
}

.raf-db-id { color: var(--vp-c-text-3); font-family: monospace; }
.raf-db-name { font-weight: bold; }
.raf-db-role { color: var(--vp-c-brand); font-size: 0.9em; }

.raf-logs {
  height: 180px;
  overflow-y: auto;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 11px;
  line-height: 1.5;
}

.raf-log-line {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.raf-log-time { color: #6b7280; flex-shrink: 0; }
.info { color: #93c5fd; }
.success { color: #86efac; }
.error { color: #fca5a5; }

.raf-section-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-3);
  margin-top: 1.5rem;
}
.raf-section:first-child .raf-section-title { margin-top: 0; }

.raf-empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  padding: 10px;
  text-align: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .raf-layout { flex-direction: column; }
  .raf-left { border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
}
</style>
