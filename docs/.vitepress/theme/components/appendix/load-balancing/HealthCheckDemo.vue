<template>
  <div class="health-check-demo">
    <div class="header">
      <div class="title">健康检查机制</div>
      <div class="subtitle">主动探测、被动感知与智能阈值</div>
    </div>

    <!-- 模式选择器 -->
    <div class="mode-selector">
      <button
        v-for="mode in modes"
        :key="mode.key"
        class="mode-btn"
        :class="{ active: currentMode === mode.key }"
        @click="currentMode = mode.key"
      >
        <span class="mode-icon">{{ mode.icon }}</span>
        <span class="mode-name">{{ mode.name }}</span>
      </button>
    </div>

    <!-- 可视化展示区 -->
    <div class="visualization-area">
      <!-- 负载均衡器 -->
      <div class="lb-node">
        <div class="lb-icon">⚖️</div>
        <div class="lb-label">负载均衡器</div>
        <div class="lb-status">{{ currentModeData.label }}</div>
      </div>

      <!-- 连接线和健康检查标记 -->
      <div class="connections-layer">
        <div
          v-for="(server, index) in servers"
          :key="index"
          class="connection-line"
          :class="{
            healthy: server.status === 'healthy',
            unhealthy: server.status === 'unhealthy',
            checking: server.status === 'checking'
          }"
        >
          <div class="health-packet" v-if="server.showPacket">{{ server.packetType }}</div>
          <div class="health-indicator">
            <span v-if="server.status === 'healthy'">✅</span>
            <span v-else-if="server.status === 'unhealthy'">❌</span>
            <span v-else">🔄</span>
          </div>
        </div>
      </div>

      <!-- 后端服务器 -->
      <div class="servers-grid">
        <div
          v-for="(server, index) in servers"
          :key="index"
          class="server-card"
          :class="{
            healthy: server.status === 'healthy',
            unhealthy: server.status === 'unhealthy',
            checking: server.status === 'checking'
          }"
        >
          <div class="server-header">
            <div class="server-icon">🖥️</div>
            <div class="server-info">
              <div class="server-name">Server {{ index + 1 }}</div>
              <div class="server-ip">{{ server.ip }}</div>
            </div>
            <div class="status-badge" :class="server.status">
              {{ server.status === 'healthy' ? '健康' : server.status === 'unhealthy' ? '故障' : '检查中' }}
            </div>
          </div>

          <div class="server-metrics">
            <div class="metric">
              <div class="metric-label">响应时间</div>
              <div class="metric-value" :class="{ warning: server.responseTime > 100 }">{{ server.responseTime }}ms</div>
            </div>
            <div class="metric">
              <div class="metric-label">失败率</div>
              <div class="metric-value" :class="{ danger: server.errorRate > 5 }">{{ server.errorRate }}%</div>
            </div>
            <div class="metric">
              <div class="metric-label">连续成功</div>
              <div class="metric-value">{{ server.consecutiveSuccess }}/3</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 检查机制详情 -->
    <div class="mechanism-details">
      <div class="detail-card">
        <div class="card-header">
          <span class="card-icon">{{ currentModeData.icon }}</span>
          <span class="card-title">{{ currentModeData.name }}</span>
        </div>
        <div class="card-body">
          <p class="description">{{ currentModeData.description }}</p>

          <div class="config-section">
            <div class="section-title">关键配置参数</div>
            <div class="config-grid">
              <div
                v-for="param in currentModeData.params"
                :key="param.name"
                class="config-item"
              >
                <div class="config-name">{{ param.name }}</div>
                <div class="config-value">{{ param.value }}</div>
                <div class="config-desc">{{ param.desc }}</div>
              </div>
            </div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <div class="pros-cons-title">✅ 优点</div>
              <ul>
                <li v-for="pro in currentModeData.pros" :key="pro">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <div class="pros-cons-title">❌ 缺点</div>
              <ul>
                <li v-for="con in currentModeData.cons" :key="con">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentMode = ref('active')

const modes = [
  {
    key: 'active',
    name: '主动健康检查',
    icon: '🔍',
    label: 'Probing'
  },
  {
    key: 'passive',
    name: '被动健康检查',
    icon: '👁️',
    label: 'Observing'
  },
  {
    key: 'threshold',
    name: '阈值判定',
    icon: '📊',
    label: 'Threshold'
  }
]

const modeDetails = {
  active: {
    name: '主动健康检查',
    icon: '🔍',
    label: '定期主动探测',
    description: '负载均衡器主动向后端服务器发送探测请求（如HTTP /health、TCP握手等），根据响应判断服务器健康状态。这是最常用的健康检查方式。',
    params: [
      { name: '检查间隔', value: '5s', desc: '两次检查之间的时间间隔' },
      { name: '超时时间', value: '3s', desc: '等待响应的最大时间' },
      { name: '健康阈值', value: '2', desc: '判定为健康所需的连续成功次数' },
      { name: '不健康阈值', value: '3', desc: '判定为不健康所需的连续失败次数' }
    ],
    pros: [
      '检测结果准确可靠，能真实反映服务状态',
      '可以精确配置检查参数和阈值',
      '不依赖实际业务流量，无流量时也能检测'
    ],
    cons: [
      '产生额外的探测流量和系统开销',
      '检查间隔期间发生的故障不能立即发现',
      '需要后端服务提供健康检查端点'
    ]
  },
  passive: {
    name: '被动健康检查',
    icon: '👁️',
    label: '观察实际流量',
    description: '负载均衡器通过监控实际业务流量的响应情况来判断后端健康状态。不发送额外的探测请求，而是分析真实请求的响应时间、状态码等指标。',
    params: [
      { name: '采样窗口', value: '60s', desc: '统计响应时间的时间窗口' },
      { name: '错误阈值', value: '10%', desc: '可接受的最大错误率' },
      { name: '延迟阈值', value: '500ms', desc: '可接受的最大平均延迟' },
      { name: '最小样本', value: '100', desc: '判定所需的最小请求数' }
    ],
    pros: [
      '不产生额外的探测流量',
      '能反映真实业务场景下的服务状态',
      '对无法提供健康检查端点的服务也有效'
    ],
    cons: [
      '需要足够的流量样本才能判定',
      '低流量时可能无法及时发现问题',
      '检测结果受业务流量特征影响较大'
    ]
  },
  threshold: {
    name: '阈值判定机制',
    icon: '📊',
    label: '多维度阈值',
    description: '结合多种指标（响应时间、错误率、连接数、CPU/内存使用率等）设置阈值，进行综合判定。支持动态阈值调整，适应不同负载场景。',
    params: [
      { name: '响应时间P99', value: '200ms', desc: '99%请求的响应时间阈值' },
      { name: '错误率', value: '1%', desc: '可接受的最大错误比例' },
      { name: '连接数', value: '1000', desc: '最大并发连接数限制' },
      { name: 'CPU使用率', value: '80%', desc: '服务器CPU使用率阈值' }
    ],
    pros: [
      '多维度综合判定，结果更全面准确',
      '可根据业务特点灵活配置阈值',
      '支持动态阈值调整，适应负载变化'
    ],
    cons: [
      '配置复杂，需要深入理解各项指标',
      '阈值设置不当可能导致误判',
      '需要持续调优以达到最佳效果'
    ]
  }
}

const currentModeData = computed(() => modeDetails[currentMode.value])

// 模拟服务器数据
const servers = ref([
  { ip: '10.0.1.10', status: 'healthy', responseTime: 25, errorRate: 0.1, consecutiveSuccess: 5, showPacket: false, packetType: '' },
  { ip: '10.0.1.11', status: 'healthy', responseTime: 30, errorRate: 0.2, consecutiveSuccess: 4, showPacket: false, packetType: '' },
  { ip: '10.0.1.12', status: 'unhealthy', responseTime: 3500, errorRate: 15, consecutiveSuccess: 0, showPacket: false, packetType: '' }
])

// 模拟健康检查动画
let healthCheckInterval
let packetInterval

const simulateHealthCheck = () => {
  // 随机选择一个服务器发送健康检查包
  const serverIndex = Math.floor(Math.random() * servers.value.length)
  const server = servers.value[serverIndex]

  server.showPacket = true
  server.packetType = currentMode.value === 'active' ? 'GET /health' : currentMode.value === 'passive' ? 'Observing' : 'Metrics'

  setTimeout(() => {
    server.showPacket = false

    // 模拟检查结果
    if (server.status === 'healthy') {
      server.consecutiveSuccess = Math.min(server.consecutiveSuccess + 1, 5)
      server.responseTime = Math.floor(Math.random() * 50) + 20
    } else if (server.status === 'unhealthy') {
      server.consecutiveSuccess = 0
      server.responseTime = 3000 + Math.floor(Math.random() * 2000)
    }
  }, 500)
}

onMounted(() => {
  // 启动健康检查模拟
  healthCheckInterval = setInterval(() => {
    simulateHealthCheck()
  }, 2000)

  // 轮播显示活跃服务器
  packetInterval = setInterval(() => {
    const healthyServers = servers.value.filter(s => s.status === 'healthy')
    if (healthyServers.length > 0) {
      const randomServer = healthyServers[Math.floor(Math.random() * healthyServers.length)]
      activeServer.value = servers.value.indexOf(randomServer)
    }
  }, 1500)
})

onUnmounted(() => {
  clearInterval(healthCheckInterval)
  clearInterval(packetInterval)
})

const activeServer = ref(0)
</script>

<style scoped>
.health-check-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* Mode Selector */
.mode-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .mode-selector {
    grid-template-columns: 1fr;
  }
}

.mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mode-icon {
  font-size: 1.2rem;
}

.mode-name {
  font-weight: 600;
}

/* Visualization Area */
.visualization-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.lb-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.lb-icon {
  font-size: 1.5rem;
}

.lb-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.lb-status {
  font-size: 0.75rem;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
}

/* Connections Layer */
.connections-layer {
  display: flex;
  gap: 2rem;
}

.connection-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s;
  min-width: 80px;
}

.connection-line.healthy {
  background: rgba(34, 197, 94, 0.1);
}

.connection-line.unhealthy {
  background: rgba(239, 68, 68, 0.1);
}

.connection-line.checking {
  background: rgba(245, 158, 11, 0.1);
}

.health-packet {
  position: absolute;
  top: -20px;
  font-size: 0.7rem;
  background: var(--vp-c-brand);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  animation: packetMove 1s ease-in-out;
}

@keyframes packetMove {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(30px); opacity: 0; }
}

.health-indicator {
  font-size: 1.25rem;
}

/* Servers Grid */
.servers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 800px;
}

@media (max-width: 768px) {
  .servers-grid {
    grid-template-columns: 1fr;
  }
}

.server-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s;
}

.server-card.healthy {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.server-card.unhealthy {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.server-card.checking {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.server-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.server-icon {
  font-size: 1.25rem;
}

.server-info {
  flex: 1;
}

.server-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.server-ip {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.status-badge.healthy {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.unhealthy {
  background: #fee2e2;
  color: #dc2626;
}

.status-badge.checking {
  background: #fef3c7;
  color: #d97706;
}

.server-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.metric {
  text-align: center;
}

.metric-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2px;
}

.metric-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.metric-value.warning {
  color: #f59e0b;
}

.metric-value.danger {
  color: #ef4444;
}

/* Mechanism Details */
.mechanism-details {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.detail-card {
  padding: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  font-weight: 600;
  font-size: 1rem;
}

.description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.config-section {
  margin-bottom: 1rem;
}

.section-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
}

.config-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.config-name {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.config-value {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.25rem;
}

.config-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros-cons-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.pros ul,
.cons ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.pros li,
.cons li {
  margin-bottom: 0.25rem;
}
</style>
