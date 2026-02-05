<template>
  <div class="physical-server-demo">
    <div class="demo-header">
      <h4>🖥️ 物理服务器时代演示</h4>
      <p>点击"发送请求"，观察早期 CGI 服务器的处理瓶颈</p>
    </div>

    <div class="demo-stage">
      <div class="client-zone">
        <div class="zone-title">👤 用户浏览器</div>
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
        <div class="network-line" :class="{ busy: isProcessing }">
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
        <div class="latency-display" v-if="currentLatency > 0">
          ⏱️ {{ currentLatency }}ms
        </div>
      </div>

      <div class="server-zone">
        <div class="zone-title">🖥️ CGI 服务器</div>
        <div class="server-status">
          <div
            class="status-indicator"
            :class="{ processing: isProcessing }"
          >
            <span class="status-dot"></span>
            <span class="status-text">{{ serverStatus }}</span>
          </div>
          <div class="cpu-usage" v-if="isProcessing">
            <div class="cpu-bar">
              <div
                class="cpu-fill"
                :style="{ width: cpuUsage + '%' }"
              ></div>
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
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-explanation">
      <h5>💡 早期的痛点在哪里？</h5>
      <ul>
        <li>
          <strong>进程启动开销</strong>：每个请求都要启动新的 CGI
          进程，就像每来一个客人都要重新搭一个厨房
        </li>
        <li>
          <strong>资源无法复用</strong>：数据库连接每次都要重新建立，CPU
          频繁在进程间切换
        </li>
        <li>
          <strong>扩展困难</strong>：只能买更强的单机（垂直扩展），无法通过增加机器分担压力
        </li>
      </ul>
      <p class="demo-conclusion">
        这就是<strong>物理服务器 + CGI</strong>时代的核心问题：<span
          class="highlight"
          >进程级隔离带来了稳定性，但也带来了巨大的性能开销</span
        >。
      </p>
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
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.demo-stage {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.client-zone,
.server-zone {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.zone-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.75rem;
  text-align: center;
}

.request-queue {
  min-height: 60px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.request-card {
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  padding: 0.4rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.req-method {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-weight: 600;
}

.send-btn {
  width: 100%;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem;
  font-size: 0.85rem;
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
  min-width: 60px;
}

.network-line {
  width: 3px;
  height: 120px;
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
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.server-status {
  margin-bottom: 0.75rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
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
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.cpu-usage {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cpu-bar {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.cpu-fill {
  height: 100%;
  background: var(--vp-c-danger);
  border-radius: 3px;
  transition: width 0.1s ease;
}

.cpu-text {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  min-width: 60px;
  text-align: right;
}

.process-queue {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.process-item {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.proc-name {
  display: block;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.proc-progress {
  height: 4px;
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

.demo-explanation {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.demo-explanation h5 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem 0;
}

.demo-explanation ul {
  margin: 0 0 1rem 0;
  padding-left: 1.25rem;
}

.demo-explanation li {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.4rem;
}

.demo-explanation li strong {
  color: var(--vp-c-text-1);
}

.demo-conclusion {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.highlight {
  color: var(--vp-c-brand);
  font-weight: 600;
}

@media (max-width: 768px) {
  .demo-stage {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .connection-zone {
    flex-direction: row;
    height: 60px;
  }

  .network-line {
    width: 100%;
    height: 3px;
  }
}
</style>
