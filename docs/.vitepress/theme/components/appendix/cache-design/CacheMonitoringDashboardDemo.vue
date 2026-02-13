<template>
  <div class="cache-monitoring-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">缓存监控面板</span>
      <span class="subtitle">实时追踪缓存的健康状况</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">开车</span>：仪表盘显示速度、油量、引擎温度。缓存监控就像仪表盘，
      让你实时看到命中率、响应时间、内存使用等关键指标，及时发现问题。
    </div>

    <div class="metrics-grid">
      <div class="metric-card hit-rate">
        <div class="metric-icon">🎯</div>
        <div class="metric-content">
          <div class="metric-label">命中率</div>
          <div class="metric-value" :class="getHitRateClass">
            {{ hitRate }}%
          </div>
          <div class="metric-trend" :class="trendClass">
            {{ trendIcon }} {{ trendValue }}%
          </div>
        </div>
      </div>

      <div class="metric-card response-time">
        <div class="metric-icon">⚡</div>
        <div class="metric-content">
          <div class="metric-label">平均响应时间</div>
          <div class="metric-value">
            {{ avgResponseTime }}ms
          </div>
          <div class="metric-sub">
            命中: {{ hitTime }}ms | 未命中: {{ missTime }}ms
          </div>
        </div>
      </div>

      <div class="metric-card cache-size">
        <div class="metric-icon">📦</div>
        <div class="metric-content">
          <div class="metric-label">缓存使用量</div>
          <div class="metric-value">
            {{ usedSize }}MB
          </div>
          <div class="metric-bar">
            <div
              class="metric-bar-fill"
              :style="{
                width: `${sizeUsagePercent}%`,
                backgroundColor: getSizeBarColor
              }"
            ></div>
          </div>
          <div class="metric-sub">
            {{ usedSize }}MB / {{ maxSize }}MB
          </div>
        </div>
      </div>

      <div class="metric-card requests">
        <div class="metric-icon">📊</div>
        <div class="metric-content">
          <div class="metric-label">总请求数</div>
          <div class="metric-value">
            {{ totalRequests.toLocaleString() }}
          </div>
          <div class="metric-sub">
            命中: {{ totalHits.toLocaleString() }} | 未命中: {{ totalMisses.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <div class="request-log">
      <div class="log-header">
        <span>📋 请求日志</span>
        <button class="clear-btn" @click="clearLog">清空</button>
      </div>
      <div class="log-list">
        <transition-group name="log-item">
          <div
            v-for="log in requestLogs"
            :key="log.id"
            class="log-entry"
            :class="log.type"
          >
            <span class="log-icon">{{ log.type === 'hit' ? '✅' : '❌' }}</span>
            <span class="log-time">{{ log.time }}</span>
            <span class="log-key">{{ log.key }}</span>
            <span class="log-result">{{ log.type === 'hit' ? '命中' : '未命中' }}</span>
            <span class="log-latency">{{ log.latency }}ms</span>
          </div>
        </transition-group>
        <div v-if="requestLogs.length === 0" class="empty-log">
          暂无请求记录，点击下方按钮发送请求
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button class="action-btn" @click="simulateRequest">
        🎲 模拟请求
      </button>
      <button class="action-btn" @click="simulateBurst">
        🚀 连续请求 (10次)
      </button>
      <button class="action-btn outline" @click="resetMetrics">
        ↺ 重置指标
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心指标：</strong>命中率应该 > 80%，响应时间 < 10ms，内存使用 < 80%。如果命中率突然下降，可能是缓存穿透或雪崩；如果响应时间变长，可能是缓存满了。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const hitRate = ref(85)
const avgResponseTime = ref(15)
const hitTime = ref(2)
const missTime = ref(50)
const usedSize = ref(450)
const maxSize = ref(512)
const totalRequests = ref(1234)
const totalHits = ref(1049)
const totalMisses = ref(185)

const requestLogs = ref([])
let logId = 0
let autoSimulate = null

const sizeUsagePercent = computed(() => {
  return (usedSize.value / maxSize.value) * 100
})

const getHitRateClass = computed(() => {
  if (hitRate.value >= 80) return 'excellent'
  if (hitRate.value >= 60) return 'good'
  return 'poor'
})

const trendValue = ref(2.5)
const trendClass = computed(() => {
  return trendValue.value >= 0 ? 'up' : 'down'
})

const trendIcon = computed(() => {
  return trendValue.value >= 0 ? '📈' : '📉'
})

const getSizeBarColor = computed(() => {
  const percent = sizeUsagePercent.value
  if (percent >= 90) return 'var(--vp-c-danger-1)'
  if (percent >= 75) return 'var(--vp-c-warning-1)'
  return 'var(--vp-c-success-1)'
})

const simulateRequest = () => {
  const isHit = Math.random() < (hitRate.value / 100)
  const latency = isHit
    ? Math.round(hitTime.value + Math.random() * 3)
    : Math.round(missTime.value + Math.random() * 10)

  const keys = ['user:123', 'product:456', 'config:app', 'session:abc', 'cache:xyz']
  const key = keys[Math.floor(Math.random() * keys.length)]

  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  requestLogs.value.unshift({
    id: logId++,
    type: isHit ? 'hit' : 'miss',
    time,
    key,
    latency
  })

  // Keep only last 10 logs
  if (requestLogs.value.length > 10) {
    requestLogs.value = requestLogs.value.slice(0, 10)
  }

  // Update metrics
  totalRequests.value++
  if (isHit) {
    totalHits.value++
  } else {
    totalMisses.value++
  }

  // Recalculate hit rate
  hitRate.value = Math.round((totalHits.value / totalRequests.value) * 100)

  // Update response time (moving average)
  avgResponseTime.value = Math.round(
    (avgResponseTime.value * 0.9) + (latency * 0.1)
  )

  // Update cache size (random fluctuation)
  const sizeChange = Math.round((Math.random() - 0.5) * 10)
  usedSize.value = Math.max(0, Math.min(maxSize.value, usedSize.value + sizeChange))
}

const simulateBurst = () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => simulateRequest(), i * 100)
  }
}

const resetMetrics = () => {
  hitRate.value = 85
  avgResponseTime.value = 15
  usedSize.value = 450
  totalRequests.value = 0
  totalHits.value = 0
  totalMisses.value = 0
  requestLogs.value = []
  logId = 0
}

const clearLog = () => {
  requestLogs.value = []
}

onMounted(() => {
  // Auto-simulate a request every 3 seconds
  autoSimulate = setInterval(() => {
    simulateRequest()
  }, 3000)
})

onUnmounted(() => {
  if (autoSimulate) {
    clearInterval(autoSimulate)
  }
})
</script>

<style scoped>
.cache-monitoring-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  gap: 0.75rem;
  transition: all 0.2s;
}

.metric-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.metric-icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.metric-content {
  flex: 1;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.metric-value.excellent {
  color: #22c55e;
}

.metric-value.good {
  color: #f59e0b;
}

.metric-value.poor {
  color: #ef4444;
}

.metric-trend {
  font-size: 0.8rem;
  font-weight: 500;
}

.metric-trend.up {
  color: #22c55e;
}

.metric-trend.down {
  color: #ef4444;
}

.metric-sub {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.metric-bar {
  height: 4px;
  background: var(--vp-c-bg-alt);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.metric-bar-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.request-log {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 600;
  font-size: 0.9rem;
}

.clear-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.log-list {
  max-height: 180px;
  overflow-y: auto;
  padding: 0.5rem;
}

.log-entry {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.log-entry.hit {
  background: rgba(34, 197, 94, 0.05);
}

.log-entry.miss {
  background: rgba(239, 68, 68, 0.05);
}

.log-icon {
  font-size: 0.9rem;
}

.log-time {
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.log-key {
  flex: 1;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.log-result {
  font-weight: 500;
}

.log-entry.hit .log-result {
  color: #22c55e;
}

.log-entry.miss .log-result {
  color: #ef4444;
}

.log-latency {
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.empty-log {
  text-align: center;
  padding: 1.5rem;
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.85rem;
}

.control-panel {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.action-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: var(--vp-c-brand-dark);
}

.action-btn.outline {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action-btn.outline:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

/* Animations */
.log-item-enter-active,
.log-item-leave-active {
  transition: all 0.3s ease;
}

.log-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.log-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 640px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
