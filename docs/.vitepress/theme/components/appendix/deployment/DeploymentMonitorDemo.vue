<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMonitoring = ref(false)
const cpuUsage = ref(45)
const memoryUsage = ref(62)
const activeUsers = ref(23)
const requestRate = ref(145)
const errorRate = ref(0.8)

const alerts = ref([
  { id: 1, type: 'warning', message: 'CPU 使用率超过 70%', time: '2分钟前' },
  { id: 2, type: 'info', message: '新用户注册激增', time: '5分钟前' }
])

const metrics = ref([
  { name: '响应时间', value: '120ms', status: 'good', threshold: '200ms' },
  { name: '可用性', value: '99.9%', status: 'good', threshold: '99.5%' },
  { name: '错误率', value: '0.8%', status: 'warning', threshold: '1%' },
  { name: '吞吐量', value: '145 req/s', status: 'good', threshold: '100 req/s' }
])

let interval = null

const toggleMonitoring = () => {
  isMonitoring.value = !isMonitoring.value

  if (isMonitoring.value) {
    startSimulation()
  } else {
    stopSimulation()
  }
}

const startSimulation = () => {
  interval = setInterval(() => {
    cpuUsage.value = Math.max(20, Math.min(95, cpuUsage.value + (Math.random() - 0.5) * 10))
    memoryUsage.value = Math.max(30, Math.min(90, memoryUsage.value + (Math.random() - 0.5) * 5))
    activeUsers.value = Math.max(10, Math.min(100, activeUsers.value + Math.floor((Math.random() - 0.5) * 5)))
    requestRate.value = Math.max(50, Math.min(300, requestRate.value + Math.floor((Math.random() - 0.5) * 20)))
    errorRate.value = Math.max(0, Math.min(5, errorRate.value + (Math.random() - 0.5) * 0.3))
  }, 2000)
}

const stopSimulation = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

onUnmounted(() => {
  stopSimulation()
})
</script>

<template>
  <div class="deployment-monitor">
    <div class="demo-header">
      <h3>监控演示</h3>
      <p class="subtitle">实时掌握咖啡店运营状况</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明通过<strong>监控摄像头</strong>、<strong>收银系统</strong>实时了解客流量、销售额、库存情况，
        服务监控能帮助我们发现性能瓶颈、提前预警故障。
      </p>
    </div>

    <div class="demo-content">
      <!-- 控制栏 -->
      <div class="control-bar">
        <div class="monitor-status">
          <span class="status-indicator" :class="{ active: isMonitoring }"></span>
          <span class="status-text">{{ isMonitoring ? '监控运行中' : '监控已停止' }}</span>
        </div>
        <button
          class="toggle-btn"
          :class="{ active: isMonitoring }"
          @click="toggleMonitoring"
        >
          {{ isMonitoring ? '⏸ 暂停' : '▶ 启动监控' }}
        </button>
      </div>

      <!-- 核心指标 -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">💻</span>
            <span class="metric-name">CPU 使用率</span>
          </div>
          <div class="metric-value">
            {{ cpuUsage.toFixed(1) }}%
          </div>
          <div class="metric-bar">
            <div
              class="metric-fill"
              :class="cpuUsage > 80 ? 'danger' : cpuUsage > 60 ? 'warning' : 'good'"
              :style="{ width: `${cpuUsage}%` }"
            ></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">🧠</span>
            <span class="metric-name">内存使用率</span>
          </div>
          <div class="metric-value">
            {{ memoryUsage.toFixed(1) }}%
          </div>
          <div class="metric-bar">
            <div
              class="metric-fill"
              :class="memoryUsage > 80 ? 'danger' : memoryUsage > 60 ? 'warning' : 'good'"
              :style="{ width: `${memoryUsage}%` }"
            ></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">👥</span>
            <span class="metric-name">在线用户</span>
          </div>
          <div class="metric-value large">
            {{ activeUsers }}
          </div>
          <div class="metric-sub">实时</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">⚡</span>
            <span class="metric-name">请求速率</span>
          </div>
          <div class="metric-value large">
            {{ requestRate }}
          </div>
          <div class="metric-sub">req/s</div>
        </div>
      </div>

      <!-- 业务指标 -->
      <div class="business-metrics">
        <div class="section-title">📊 业务指标</div>
        <div class="metrics-list">
          <div
            v-for="(metric, idx) in metrics"
            :key="idx"
            class="business-metric-item"
            :class="metric.status"
          >
            <div class="metric-info">
              <span class="metric-label">{{ metric.name }}</span>
              <span class="metric-threshold">目标: {{ metric.threshold }}</span>
            </div>
            <div class="metric-val">{{ metric.value }}</div>
            <div class="metric-status-badge">
              <span v-if="metric.status === 'good'" class="badge good">✓ 正常</span>
              <span v-else-if="metric.status === 'warning'" class="badge warning">⚠️ 警告</span>
              <span v-else class="badge danger">❌ 异常</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 告警列表 -->
      <div class="alerts-section">
        <div class="section-title">🔔 最近告警</div>
        <div class="alerts-list">
          <div
            v-for="alert in alerts"
            :key="alert.id"
            class="alert-item"
            :class="alert.type"
          >
            <span class="alert-icon">{{ alert.type === 'warning' ? '⚠️' : 'ℹ️' }}</span>
            <span class="alert-message">{{ alert.message }}</span>
            <span class="alert-time">{{ alert.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p v-if="!isMonitoring">
        💡 <strong>准备就绪</strong>：点击"启动监控"按钮，开始实时查看服务器各项指标。就像打开咖啡店的监控系统！
      </p>
      <p v-else>
        ✅ <strong>监控中</strong>：各项指标实时更新。设置合理的阈值和告警，才能在问题发生时第一时间响应！
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-monitor {
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

.control-bar {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.monitor-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}

.status-indicator.active {
  background: var(--vp-c-brand-delta);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.toggle-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.metric-icon {
  font-size: 1.2rem;
}

.metric-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  margin-bottom: 0.5rem;
}

.metric-value.large {
  font-size: 2rem;
}

.metric-bar {
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.metric-fill.good {
  background: var(--vp-c-brand-delta);
}

.metric-fill.warning {
  background: #f59e0b;
}

.metric-fill.danger {
  background: #ef4444;
}

.metric-sub {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
}

.business-metrics {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.business-metric-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.business-metric-item.warning {
  border-left-color: #f59e0b;
}

.business-metric-item.danger {
  border-left-color: #ef4444;
}

.metric-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.metric-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.metric-threshold {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.metric-val {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.metric-status-badge {
  margin-left: 0.75rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.badge.good {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-delta);
}

.badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.badge.danger {
  background: #fee2e2;
  color: #dc2626;
}

.alerts-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.alert-item.warning {
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
}

.alert-item.info {
  background: #dbeafe;
  border-left: 3px solid #3b82f6;
}

.alert-icon {
  font-size: 1rem;
}

.alert-message {
  flex: 1;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.alert-time {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
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
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
