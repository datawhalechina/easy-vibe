<template>
  <div class="physical-server-demo">
    <div class="demo-header">
      <span class="icon">🖥️</span>
      <span class="title">物理服务器时代演示</span>
      <span class="subtitle">观察早期 CGI 服务器的处理瓶颈</span>
    </div>

    <div class="demo-stage">
      <div class="client-zone">
        <div class="zone-title">
          👤 用户浏览器
        </div>
        <div class="request-queue">
          <div
            v-for="(req, idx) in pendingRequests"
            :key="req.id"
            class="request-card"
            :style="{ animationDelay: idx * 0.1 + 's' }"
          >
            <span class="req-method">{{ req.method }}</span>
            <span class="req-path">{{ req.path }}</span>
          </div>
        </div>
        <button
          class="send-btn"
          :disabled="isProcessing"
          @click="sendRequest"
        >
          {{ isProcessing ? '处理中...' : '🚀 发起请求' }}
        </button>
      </div>

      <div class="connection-zone">
        <div
          class="network-line"
          :class="{ busy: isProcessing }"
        >
          <div class="packets">
            <div
              v-for="pkt in packets"
              :key="pkt.id"
              class="packet"
              :class="pkt.type"
              :style="{ top: pkt.top + 'px' }"
            >
              {{ pkt.type === 'req' ? '📤' : '📥' }}
            </div>
          </div>
        </div>
        <div
          v-if="currentLatency > 0"
          class="latency-display"
        >
          ⏱️ {{ currentLatency }}ms
        </div>
      </div>

      <div class="server-zone">
        <div class="zone-title">
          🖥️ CGI 服务器
        </div>
        <div class="server-status">
          <div
            class="status-indicator"
            :class="{ processing: isProcessing }"
          >
            <span class="status-dot" />
            <span class="status-text">{{ serverStatus }}</span>
          </div>
          <div
            v-if="isProcessing"
            class="cpu-usage"
          >
            <div class="cpu-bar">
              <div
                class="cpu-fill"
                :style="{ width: cpuUsage + '%' }"
              />
            </div>
            <span class="cpu-text">CPU: {{ cpuUsage }}%</span>
          </div>
        </div>
        <div class="process-queue">
          <div
            v-for="proc in processQueue"
            :key="proc.id"
            class="process-item"
          >
            <span class="proc-name">{{ proc.name }}</span>
            <div class="proc-progress">
              <div
                class="proc-bar"
                :style="{ width: proc.progress + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>进程级隔离带来了稳定性，但也带来了巨大的性能开销。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isProcessing = ref(false)
const currentLatency = ref(0)
const cpuUsage = ref(0)
const packets = ref([])
const pendingRequests = ref([])
const processQueue = ref([])
const requestCounter = ref(0)
const packetCounter = ref(0)

const serverStatus = computed(() => {
  if (isProcessing.value) return '处理中...'
  return '等待请求'
})

const sendRequest = async () => {
  if (isProcessing.value) return

  isProcessing.value = true
  requestCounter.value++
  const requestId = requestCounter.value

  // Add request to queue
  pendingRequests.value.push({
    id: requestId,
    method: 'GET',
    path: '/index.cgi'
  })

  // Simulate network latency
  currentLatency.value = 0
  const latencyInterval = setInterval(() => {
    currentLatency.value += Math.floor(Math.random() * 50) + 20
  }, 100)

  // Simulate packet
  const packetId = ++packetCounter.value
  packets.value.push({
    id: packetId,
    type: 'req',
    top: 20
  })

  // Add process to queue
  processQueue.value.push({
    id: requestId,
    name: `CGI Process #${requestId}`,
    progress: 0
  })

  // Simulate CPU usage fluctuation
  const cpuInterval = setInterval(() => {
    cpuUsage.value = Math.min(100, cpuUsage.value + Math.random() * 20 + 10)
    processQueue.value.forEach(p => {
      p.progress = Math.min(100, p.progress + Math.random() * 15 + 5)
    })
  }, 100)

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000))

  clearInterval(latencyInterval)
  clearInterval(cpuInterval)

  // Cleanup
  pendingRequests.value = pendingRequests.value.filter(r => r.id !== requestId)
  packets.value = packets.value.filter(p => p.id !== packetId)
  processQueue.value = processQueue.value.filter(p => p.id !== requestId)

  cpuUsage.value = 0
  currentLatency.value = 0
  isProcessing.value = false
}
</script>

<style scoped>
.physical-server-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.demo-stage {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.client-zone,
.server-zone {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
}

.zone-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.4rem;
  text-align: center;
}

.request-queue {
  min-height: 40px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.3rem;
  margin-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.request-card {
  background: var(--vp-c-brand);
  color: white;
  border-radius: 3px;
  padding: 0.25rem 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6rem;
}

.req-method {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.05rem 0.2rem;
  border-radius: 2px;
  font-weight: 600;
}

.send-btn {
  width: 100%;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.connection-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.network-line {
  width: 2px;
  height: 80px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  position: relative;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.network-line.busy {
  opacity: 1;
  background: var(--vp-c-brand);
}

.latency-display {
  margin-top: 0.3rem;
  font-size: 0.6rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.server-status {
  margin-bottom: 0.4rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  margin-bottom: 0.3rem;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-success);
}

.status-indicator.processing .status-dot {
  background: var(--vp-c-danger);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.status-text {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.cpu-usage {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.cpu-bar {
  flex: 1;
  height: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
}

.cpu-fill {
  height: 100%;
  background: var(--vp-c-danger);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.cpu-text {
  font-size: 0.55rem;
  color: var(--vp-c-text-2);
  min-width: 50px;
  text-align: right;
}

.process-queue {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.process-item {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.3rem;
}

.proc-name {
  display: block;
  font-size: 0.55rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.2rem;
}

.proc-progress {
  height: 3px;
  background: var(--vp-c-bg);
  border-radius: 2px;
  overflow: hidden;
}

.proc-bar {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 2px;
  transition: width 0.1s linear;
}

@media (max-width: 768px) {
  .demo-stage {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .connection-zone {
    flex-direction: row;
    height: 40px;
  }

  .network-line {
    width: 100%;
    height: 2px;
  }
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  display: flex;
  gap: 0.2rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
