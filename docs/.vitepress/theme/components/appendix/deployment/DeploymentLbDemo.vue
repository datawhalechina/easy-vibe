<script setup>
import { ref, computed } from 'vue'

const algorithm = ref('round-robin')
const totalRequests = ref(0)
const servers = ref([
  { id: 1, name: '服务器 1', requests: 0, status: 'healthy' },
  { id: 2, name: '服务器 2', requests: 0, status: 'healthy' },
  { id: 3, name: '服务器 3', requests: 0, status: 'healthy' }
])

const algorithms = [
  { id: 'round-robin', name: '轮询 (Round Robin)', desc: '依次分配，像排队发号' },
  { id: 'least-connections', name: '最少连接 (Least Connections)', desc: '谁最空闲分配给谁' },
  { id: 'ip-hash', name: 'IP 哈希 (IP Hash)', desc: '同一IP总是分配给同一服务器' }
]

const currentAlgorithm = computed(() => {
  return algorithms.find(a => a.id === algorithm.value)
})

let requestIndex = 0
const sendRequest = () => {
  totalRequests.value++
  requestIndex++

  let serverIndex = 0

  if (algorithm.value === 'round-robin') {
    serverIndex = (totalRequests.value - 1) % servers.value.length
  } else if (algorithm.value === 'least-connections') {
    const minRequests = Math.min(...servers.value.map(s => s.requests))
    serverIndex = servers.value.findIndex(s => s.requests === minRequests)
  } else if (algorithm.value === 'ip-hash') {
    const mockIp = `192.168.1.${(requestIndex % 10) + 1}`
    serverIndex = parseInt(mockIp.split('.')[3]) % servers.value.length
  }

  servers.value[serverIndex].requests++
}

// Auto simulate
setInterval(() => {
  sendRequest()
}, 1500)
</script>

<template>
  <div class="deployment-lb">
    <div class="demo-header">
      <h3>负载均衡演示</h3>
      <p class="subtitle">多店协同，分散客流</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明开了三家咖啡店，<strong>引导员</strong>根据不同策略把顾客分流到不同门店，
        避免单店过载，提高整体服务能力。负载均衡器就是那个"引导员"。
      </p>
    </div>

    <div class="demo-content">
      <!-- 算法选择 -->
      <div class="algorithm-section">
        <div class="section-title">🎯 负载均衡算法</div>
        <div class="algorithm-list">
          <div
            v-for="algo in algorithms"
            :key="algo.id"
            class="algorithm-item"
            :class="{ active: algorithm === algo.id }"
            @click="algorithm = algo.id"
          >
            <div class="algo-header">
              <span class="algo-icon">{{ algorithm === algo.id ? '✓' : '○' }}</span>
              <span class="algo-name">{{ algo.name }}</span>
            </div>
            <div class="algo-desc">{{ algo.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 负载均衡器可视化 -->
      <div class="lb-visualization">
        <div class="lb-node">
          <div class="lb-icon">⚖️</div>
          <div class="lb-title">负载均衡器</div>
          <div class="lb-algorithm">{{ currentAlgorithm.name }}</div>
          <div class="lb-stats">{{ totalRequests }} 次请求</div>
        </div>

        <div class="lb-arrows">
          <div
            v-for="i in 3"
            :key="i"
            class="arrow-line"
            :style="{ animationDelay: `${i * 0.2}s` }"
          >
            →
          </div>
        </div>

        <div class="servers-grid">
          <div
            v-for="(server, idx) in servers"
            :key="server.id"
            class="server-card"
            :class="{ highlighted: server.requests > 0 }"
          >
            <div class="server-icon">🖥️</div>
            <div class="server-name">{{ server.name }}</div>
            <div class="server-status">
              <span class="status-dot healthy"></span>
              <span class="status-text">健康</span>
            </div>
            <div class="server-metrics">
              <div class="metric-item">
                <span class="metric-label">请求数</span>
                <span class="metric-value">{{ server.requests }}</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">负载</span>
                <div class="load-bar">
                  <div
                    class="load-fill"
                    :style="{ width: `${Math.min(server.requests * 5, 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 生活类比 -->
      <div class="analogy-box">
        <div class="analogy-title">💡 生活类比</div>
        <div class="analogy-content">
          <div v-if="algorithm === 'round-robin'" class="analogy-item">
            <strong>轮询</strong>：就像三家咖啡店轮流接待，A店、B店、C店、A店、B店、C店...公平分配。
          </div>
          <div v-if="algorithm === 'least-connections'" class="analogy-item">
            <strong>最少连接</strong>：就像引导员看哪家店人少就往哪家导，确保每家都不会太忙。
          </div>
          <div v-if="algorithm === 'ip-hash'" class="analogy-item">
            <strong>IP哈希</strong>：就像记住老顾客的习惯，张三总是去A店，李四总是去B店，保证体验一致。
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        💡 <strong>关键价值</strong>：负载均衡不仅能<strong>提高吞吐量</strong>，还能提供<strong>高可用性</strong>。
        某台服务器挂了，负载均衡器会自动把流量导向其他健康的服务器！
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-lb {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-height: 600px;
  overflow-y: auto;
  margin: 1rem 0;
}

.demo-header {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.intro-text {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.algorithm-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.algorithm-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.algorithm-item {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.algorithm-item:hover {
  border-color: var(--vp-c-brand-soft);
}

.algorithm-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.algo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.algo-icon {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  font-weight: 700;
}

.algo-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.algo-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  padding-left: 1.4rem;
}

.lb-visualization {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.lb-node {
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  width: 100%;
  max-width: 280px;
}

.lb-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.lb-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.lb-algorithm {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.lb-stats {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.lb-arrows {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.arrow-line {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  animation: flow 1.5s infinite;
}

@keyframes flow {
  0%, 100% { opacity: 0.3; transform: translateX(-5px); }
  50% { opacity: 1; transform: translateX(5px); }
}

.servers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  width: 100%;
}

.server-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.server-card.highlighted {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.server-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.server-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.server-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}

.status-dot.healthy {
  background: var(--vp-c-brand-delta);
}

.status-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.server-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.metric-value {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.load-bar {
  width: 50px;
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
}

.load-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-1));
  transition: width 0.3s ease;
}

.analogy-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-brand);
}

.analogy-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.analogy-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box {
  padding: 1rem 1.25rem;
  margin: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box p {
  margin: 0;
}

@media (max-width: 640px) {
  .servers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
