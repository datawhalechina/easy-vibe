<template>
  <div class="auto-scaling-demo">
    <div class="header">
      <div class="title">自动扩缩容</div>
      <div class="subtitle">基于CPU、内存、QPS的智能弹性伸缩</div>
    </div>

    <!-- 指标选择器 -->
    <div class="metric-selector">
      <div class="selector-label">扩容指标：</div>
      <div class="selector-buttons">
        <button
          v-for="metric in metrics"
          :key="metric.key"
          class="metric-btn"
          :class="{ active: currentMetric === metric.key }"
          @click="currentMetric = metric.key"
        >
          <span class="btn-icon">{{ metric.icon }}</span>
          <span class="btn-name">{{ metric.name }}</span>
        </button>
      </div>
    </div>

    <!-- 监控仪表盘 -->
    <div class="monitoring-dashboard">
      <div class="dashboard-header">
        <span class="dashboard-title">实时监控</span>
        <span class="refresh-indicator">
          <span class="live-dot"></span>
          实时
        </span>
      </div>

      <div class="metrics-grid">
        <!-- CPU使用率 -->
        <div class="metric-card" :class="{ warning: cpuUsage > 70, danger: cpuUsage > 90 }">
          <div class="metric-header">
            <span class="metric-icon">💻</span>
            <span class="metric-name">CPU使用率</span>
          </div>
          <div class="metric-value">
            <span class="value-number">{{ cpuUsage }}</span>
            <span class="value-unit">%</span>
          </div>
          <div class="metric-progress">
            <div class="progress-bar" :style="{ width: cpuUsage + '%', background: getUsageColor(cpuUsage) }"></div>
          </div>
          <div class="metric-threshold">
            <span>扩容阈值: 70%</span>
            <span>缩容阈值: 30%</span>
          </div>
        </div>

        <!-- 内存使用率 -->
        <div class="metric-card" :class="{ warning: memoryUsage > 75, danger: memoryUsage > 90 }">
          <div class="metric-header">
            <span class="metric-icon">🧠</span>
            <span class="metric-name">内存使用率</span>
          </div>
          <div class="metric-value">
            <span class="value-number">{{ memoryUsage }}</span>
            <span class="value-unit">%</span>
          </div>
          <div class="metric-progress">
            <div class="progress-bar" :style="{ width: memoryUsage + '%', background: getUsageColor(memoryUsage) }"></div>
          </div>
          <div class="metric-threshold">
            <span>扩容阈值: 75%</span>
            <span>缩容阈值: 40%</span>
          </div>
        </div>

        <!-- QPS -->
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">⚡</span>
            <span class="metric-name">QPS</span>
          </div>
          <div class="metric-value">
            <span class="value-number">{{ currentQPS }}</span>
            <span class="value-unit">req/s</span>
          </div>
          <div class="metric-chart">
            <svg viewBox="0 0 200 40" class="sparkline">
              <polyline
                fill="none"
                stroke="var(--vp-c-brand)"
                stroke-width="2"
                :points="qpsSparklinePoints"
              />
            </svg>
          </div>
          <div class="metric-threshold">
            <span>扩容阈值: 1000/s</span>
            <span>目标: 800/s</span>
          </div>
        </div>

        <!-- 实例数量 -->
        <div class="metric-card instances">
          <div class="metric-header">
            <span class="metric-icon">🖥️</span>
            <span class="metric-name">运行实例</span>
          </div>
          <div class="instances-display">
            <div class="instance-count">
              <span class="count-number">{{ currentInstances }}</span>
              <span class="count-label">个实例</span>
            </div>
            <div class="instance-range">
              <span>最小: {{ minInstances }}</span>
              <span>最大: {{ maxInstances }}</span>
            </div>
          </div>
          <div class="instance-visual">
            <div
              v-for="i in maxInstances"
              :key="i"
              class="instance-dot"
              :class="{ active: i <= currentInstances, scaling: isScaling && i === currentInstances + 1 }"
            >
              {{ i }}
            </div>
          </div>
          <div v-if="scaleReason" class="scale-reason">
            <span class="reason-icon">{{ scaleReason.includes('扩容') ? '📈' : '📉' }}</span>
            <span class="reason-text">{{ scaleReason }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 扩缩容历史 -->
    <div class="scaling-history">
      <div class="history-header">
        <span class="history-title">扩缩容历史</span>
        <span class="history-count">最近 5 次操作</span>
      </div>
      <div class="history-list">
        <div
          v-for="(record, index) in scalingHistory"
          :key="index"
          class="history-item"
          :class="{ scaleOut: record.type === '缩容' }"
        >
          <div class="item-icon">{{ record.type === '扩容' ? '📈' : '📉' }}</div>
          <div class="item-details">
            <div class="item-action">
              {{ record.type }}: {{ record.from }} → {{ record.to }} 实例
            </div>
            <div class="item-reason">{{ record.reason }}</div>
          </div>
          <div class="item-time">{{ record.time }}</div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="best-practices">
      <div class="practices-title">自动扩缩容最佳实践</div>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">⏱️</div>
          <div class="practice-title">冷却时间</div>
          <div class="practice-desc">
            设置适当的冷却时间（通常3-5分钟），避免扩缩容操作过于频繁导致的震荡
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">📊</div>
          <div class="practice-title">多指标综合</div>
          <div class="practice-desc">
            不要依赖单一指标，结合CPU、内存、QPS、连接数等多维度进行综合判断
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🎯</div>
          <div class="practice-title">目标利用率</div>
          <div class="practice-desc">
            设置合理的资源目标利用率（如70%），预留足够的缓冲应对突发流量
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">⚡</div>
          <div class="practice-title">快速扩容</div>
          <div class="practice-desc">
            扩容操作应该比缩容更激进，确保系统能快速应对流量增长
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const currentMetric = ref('cpu')
const cpuUsage = ref(45)
const memoryUsage = ref(60)
const currentQPS = ref(650)
const currentInstances = ref(3)
const minInstances = ref(2)
const maxInstances = ref(10)
const isScaling = ref(false)
const scaleReason = ref('')

const metrics = [
  { key: 'cpu', name: 'CPU 使用率', icon: '💻' },
  { key: 'memory', name: '内存使用率', icon: '🧠' },
  { key: 'qps', name: 'QPS', icon: '⚡' }
]

// QPS 历史数据
const qpsHistory = ref(Array(20).fill(650))

// 计算 QPS 折线图的点
const qpsSparklinePoints = computed(() => {
  const max = Math.max(...qpsHistory.value)
  const min = Math.min(...qpsHistory.value)
  const range = max - min || 1
  return qpsHistory.value.map((qps, index) => {
    const x = (index / (qpsHistory.value.length - 1)) * 200
    const y = 40 - ((qps - min) / range) * 35 - 2.5
    return `${x},${y}`
  }).join(' ')
})

// 获取颜色
const getUsageColor = (usage) => {
  if (usage > 90) return '#ef4444'
  if (usage > 70) return '#f59e0b'
  return '#22c55e'
}

// 扩缩容历史
const scalingHistory = ref([
  { type: '扩容', from: 2, to: 3, reason: 'CPU使用率超过70%', time: '10:23' },
  { type: '缩容', from: 4, to: 3, reason: 'CPU使用率低于30%', time: '09:15' },
  { type: '扩容', from: 3, to: 4, reason: 'QPS达到1000/s', time: '08:42' },
  { type: '扩容', from: 2, to: 3, reason: '内存使用率超过75%', time: '07:30' },
  { type: '缩容', from: 5, to: 4, reason: '流量下降', time: '06:20' }
])

// 模拟指标变化
let simulationInterval
const startSimulation = () => {
  simulationInterval = setInterval(() => {
    // 模拟 CPU 波动
    const cpuChange = (Math.random() - 0.5) * 10
    cpuUsage.value = Math.max(20, Math.min(95, cpuUsage.value + cpuChange))

    // 模拟内存波动
    const memChange = (Math.random() - 0.5) * 8
    memoryUsage.value = Math.max(30, Math.min(90, memoryUsage.value + memChange))

    // 模拟 QPS 波动
    const qpsChange = Math.floor((Math.random() - 0.5) * 50)
    currentQPS.value = Math.max(200, Math.min(1200, currentQPS.value + qpsChange))
    qpsHistory.value.shift()
    qpsHistory.value.push(currentQPS.value)

    // 根据指标触发扩缩容逻辑
    checkScalingLogic()
  }, 2000)
}

// 检查扩缩容逻辑
const checkScalingLogic = () => {
  if (isScaling.value) return

  let shouldScale = false
  let newCount = currentInstances.value
  let reason = ''

  // 扩容检查
  if (cpuUsage.value > 75 || memoryUsage.value > 75 || currentQPS.value > 900) {
    if (currentInstances.value < maxInstances.value) {
      shouldScale = true
      newCount = currentInstances.value + 1
      if (cpuUsage.value > 75) reason = 'CPU使用率超过75%'
      else if (memoryUsage.value > 75) reason = '内存使用率超过75%'
      else reason = 'QPS超过900/s'
    }
  }
  // 缩容检查
  else if (cpuUsage.value < 35 && memoryUsage.value < 40 && currentQPS.value < 400) {
    if (currentInstances.value > minInstances.value) {
      shouldScale = true
      newCount = currentInstances.value - 1
      reason = '资源使用率低于阈值'
    }
  }

  if (shouldScale) {
    triggerScaling(newCount, reason)
  }
}

// 触发扩缩容
const triggerScaling = (newCount, reason) => {
  isScaling.value = true
  scaleReason.value = `${newCount > currentInstances.value ? '扩容' : '缩容'}中: ${reason}`

  setTimeout(() => {
    currentInstances.value = newCount
    isScaling.value = false
    scaleReason.value = ''

    // 添加到历史
    scalingHistory.value.unshift({
      type: newCount > currentInstances.value ? '扩容' : '缩容',
      from: newCount > currentInstances.value ? newCount - 1 : newCount + 1,
      to: newCount,
      reason,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
    scalingHistory.value = scalingHistory.value.slice(0, 5)
  }, 3000)
}

onMounted(() => {
  startSimulation()
})

onUnmounted(() => {
  clearInterval(simulationInterval)
})
</script>

<style scoped>
.auto-scaling-demo {
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

/* Metric Selector */
.metric-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.selector-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.selector-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.metric-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.metric-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.metric-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.btn-icon {
  font-size: 1rem;
}

/* Monitoring Dashboard */
.monitoring-dashboard {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.dashboard-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.refresh-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

.metric-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s;
}

.metric-card.warning {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.metric-card.danger {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.metric-icon {
  font-size: 1.25rem;
}

.metric-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.metric-value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.value-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.value-unit {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.metric-progress {
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: all 0.3s;
}

.metric-threshold {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.metric-chart {
  height: 40px;
  margin-bottom: 0.5rem;
}

.sparkline {
  width: 100%;
  height: 100%;
}

/* Instances Card */
.metric-card.instances {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .metric-card.instances {
    grid-column: span 1;
  }
}

.instances-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.instance-count {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.count-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.count-label {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.instance-range {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.instance-visual {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.instance-dot {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}

.instance-dot.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}

.instance-dot.scaling {
  animation: scaleIn 1s ease-in-out infinite;
}

@keyframes scaleIn {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}

.scale-reason {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.reason-icon {
  font-size: 1rem;
}

/* Scaling History */
.scaling-history {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.history-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s;
}

.history-item.scaleOut {
  border-left: 3px solid #22c55e;
}

.history-item:not(.scaleOut) {
  border-left: 3px solid #f59e0b;
}

.item-icon {
  font-size: 1.25rem;
}

.item-details {
  flex: 1;
}

.item-action {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.item-reason {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.item-time {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

/* Best Practices */
.best-practices {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.practices-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .practices-grid {
    grid-template-columns: 1fr;
  }
}

.practice-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.practice-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.practice-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.practice-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
