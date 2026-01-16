<template>
  <div class="http-exchange-demo">
    <div class="demo-container">
      <!-- Client Side -->
      <div class="panel client-panel">
        <div class="panel-header">
          <span class="icon">💻</span> Client (Browser)
        </div>

        <div class="request-builder">
          <div class="input-row">
            <select v-model="method" class="method-select">
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <input
              v-model="path"
              class="path-input"
              placeholder="/index.html"
            />
          </div>

          <div class="headers-section">
            <div class="section-title">Headers</div>
            <div v-for="(value, key) in headers" :key="key" class="header-row">
              <span class="header-key">{{ key }}:</span>
              <span class="header-value">{{ value }}</span>
            </div>
          </div>

          <button
            @click="sendRequest"
            class="send-btn"
            :disabled="isProcessing"
          >
            {{ isProcessing ? 'Sending...' : 'Send Request' }}
          </button>
        </div>
      </div>

      <!-- Network Visualization -->
      <div class="network-space">
        <div class="connection-line"></div>
        <div
          v-if="currentPacket"
          class="packet"
          :class="currentPacket.type"
          :style="{ left: packetPosition + '%' }"
        >
          {{ currentPacket.label }}
        </div>
      </div>

      <!-- Server Side -->
      <div class="panel server-panel">
        <div class="panel-header"><span class="icon">🖥️</span> Server</div>

        <div class="response-viewer" :class="{ empty: !response }">
          <div v-if="response">
            <div class="status-row" :class="statusClass">
              {{ response.status }} {{ response.statusText }}
            </div>
            <div class="headers-section">
              <div
                v-for="(value, key) in response.headers"
                :key="key"
                class="header-row"
              >
                <span class="header-key">{{ key }}:</span>
                <span class="header-value">{{ value }}</span>
              </div>
            </div>
            <div class="body-preview">
              {{ response.body }}
            </div>
          </div>
          <div v-else class="placeholder">Waiting for request...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const method = ref('GET')
const path = ref('/index.html')
const isProcessing = ref(false)
const packetPosition = ref(10)
const currentPacket = ref(null)
const response = ref(null)

const headers = ref({
  Host: 'www.example.com',
  'User-Agent': 'Mozilla/5.0',
  Accept: 'text/html'
})

const responses = {
  GET: {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'text/html',
      Server: 'Nginx'
    },
    body: '<!DOCTYPE html>\n<html>\n  <body>Hello World</body>\n</html>'
  },
  POST: {
    status: 201,
    statusText: 'Created',
    headers: {
      'Content-Type': 'application/json'
    },
    body: '{"success": true, "id": 123}'
  }
}

const statusClass = computed(() => {
  if (!response.value) return ''
  const code = response.value.status
  if (code >= 200 && code < 300) return 'success'
  if (code >= 400) return 'error'
  return ''
})

const sendRequest = () => {
  if (isProcessing.value) return
  isProcessing.value = true
  response.value = null

  // Animate Request
  currentPacket.value = {
    type: 'request',
    label: `${method.value} ${path.value}`
  }
  animatePacket(10, 90, () => {
    // Server Processing
    setTimeout(() => {
      // Prepare Response
      const mockResponse = responses[method.value] || responses['GET']

      // Animate Response
      currentPacket.value = {
        type: 'response',
        label: `${mockResponse.status} ${mockResponse.statusText}`
      }
      animatePacket(90, 10, () => {
        response.value = mockResponse
        currentPacket.value = null
        isProcessing.value = false
      })
    }, 800)
  })
}

const animatePacket = (start, end, callback) => {
  let pos = start
  const step = (end - start) / 50
  const interval = setInterval(() => {
    pos += step
    packetPosition.value = pos

    if ((step > 0 && pos >= end) || (step < 0 && pos <= end)) {
      clearInterval(interval)
      callback()
    }
  }, 10)
}
</script>

<style scoped>
.http-exchange-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  height: 300px;
}

.panel {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.panel-header {
  font-weight: bold;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.network-space {
  width: 20%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.connection-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vp-c-divider);
  border-top: 1px dashed var(--vp-c-text-3);
}

.packet {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.packet.request {
  background: #3b82f6;
  color: white;
}

.packet.response {
  background: #10b981;
  color: white;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.method-select {
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.path-input {
  flex: 1;
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.headers-section {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
}

.header-row {
  display: flex;
  justify-content: space-between;
}

.send-btn {
  width: 100%;
  padding: 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.response-viewer {
  flex: 1;
  font-size: 0.8rem;
  overflow-y: auto;
}

.response-viewer.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder {
  color: var(--vp-c-text-3);
}

.status-row {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.status-row.success {
  color: #10b981;
}
.status-row.error {
  color: #ef4444;
}

.body-preview {
  margin-top: 1rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
}
</style>
