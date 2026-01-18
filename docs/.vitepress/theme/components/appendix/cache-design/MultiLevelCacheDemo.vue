<!--
  MultiLevelCacheDemo.vue
  多级缓存架构演示 - 展示浏览器缓存、CDN、本地缓存、Redis、数据库的多级架构
-->
<template>
  <div class="multi-level-cache-demo">
    <div class="header">
      <div class="title">多级缓存架构</div>
      <div class="subtitle">每一层都是上一层的"保护伞"</div>
    </div>

    <div class="cache-levels">
      <div
        v-for="(level, index) in cacheLevels"
        :key="level.name"
        class="cache-level"
        :class="{
          active: activeLevel === index,
          hit: level.status === 'hit',
          miss: level.status === 'miss'
        }"
      >
        <div class="level-number">L{{ level.layer }}</div>
        <div class="level-content">
          <div class="level-header">
            <div class="level-name">{{ level.name }}</div>
            <div class="level-meta">
              <span class="latency">{{ level.latency }}</span>
              <span class="capacity">{{ level.capacity }}</span>
            </div>
          </div>
          <div class="level-description">{{ level.description }}</div>
          <div class="level-status" v-if="level.status">
            <span v-if="level.status === 'hit'" class="status-badge hit"
              >✅ 命中</span
            >
            <span v-if="level.status === 'miss'" class="status-badge miss"
              >❌ 未命中</span
            >
          </div>
        </div>
        <div class="level-arrow" v-if="index < cacheLevels.length - 1">↓</div>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>请求数据</label>
        <button class="request-btn" @click="makeRequest" :disabled="processing">
          {{ processing ? '处理中...' : '发起请求' }}
        </button>
      </div>

      <div class="control-group">
        <label>模拟场景</label>
        <select
          v-model="scenario"
          @change="onScenarioChange"
          class="scenario-select"
        >
          <option value="normal">正常访问 (70% 命中率)</option>
          <option value="cold">冷启动 (0% 命中率)</option>
          <option value="hot">热点数据 (95% 命中率)</option>
        </select>
      </div>
    </div>

    <div class="request-flow" v-if="requestHistory.length > 0">
      <div class="flow-title">请求流程</div>
      <div class="flow-timeline">
        <div
          v-for="(event, index) in requestHistory"
          :key="index"
          class="flow-event"
          :class="event.type"
        >
          <div class="event-level">{{ event.level }}</div>
          <div class="event-action">
            <span class="event-icon">{{ event.icon }}</span>
            <span class="event-text">{{ event.action }}</span>
          </div>
          <div class="event-time">{{ event.time }}ms</div>
        </div>
      </div>
    </div>

    <div class="statistics">
      <div class="stat-card">
        <div class="stat-label">总请求数</div>
        <div class="stat-value">{{ stats.totalRequests }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">缓存命中</div>
        <div class="stat-value hit">{{ stats.cacheHits }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">命中率</div>
        <div class="stat-value">{{ stats.hitRate }}%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">平均响应时间</div>
        <div class="stat-value">{{ stats.avgLatency }}ms</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">数据库访问</div>
        <div class="stat-value db">{{ stats.dbAccess }}</div>
      </div>
    </div>

    <div class="explanation">
      <div class="explanation-title">多级缓存的优势</div>
      <div class="explanation-grid">
        <div class="explanation-item">
          <div class="item-icon">🛡️</div>
          <div class="item-text">
            <strong>逐级过滤</strong>
            <br />
            <span class="item-detail"
              >每层过滤掉大部分请求，最终到达数据库的可能只有 1%</span
            >
          </div>
        </div>
        <div class="explanation-item">
          <div class="item-icon">⚡</div>
          <div class="item-text">
            <strong>极速响应</strong>
            <br />
            <span class="item-detail"
              >上层缓存命中时，响应时间从 50ms 降至 0-10ms</span
            >
          </div>
        </div>
        <div class="explanation-item">
          <div class="item-icon">💰</div>
          <div class="item-text">
            <strong>降低成本</strong>
            <br />
            <span class="item-detail"
              >减少昂贵的数据库查询，节省服务器资源</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLevel = ref(-1)
const processing = ref(false)
const scenario = ref('normal')
const requestHistory = ref([])

const cacheLevels = ref([
  {
    layer: 1,
    name: '浏览器缓存',
    latency: '~0 ms',
    capacity: '~100 MB',
    description: '静态资源（图片、CSS、JS）',
    status: null
  },
  {
    layer: 2,
    name: 'CDN 缓存',
    latency: '~10 ms',
    capacity: 'TB 级',
    description: '边缘节点静态文件',
    status: null
  },
  {
    layer: 3,
    name: '本地缓存',
    latency: '~1 ms',
    capacity: '~1 GB',
    description: '进程内极热点数据',
    status: null
  },
  {
    layer: 4,
    name: 'Redis 缓存',
    latency: '~5 ms',
    capacity: '~100 GB',
    description: '分布式热点数据',
    status: null
  },
  {
    layer: 5,
    name: '数据库',
    latency: '~50 ms',
    capacity: 'TB ~ PB',
    description: '持久化存储',
    status: null
  }
])

const stats = ref({
  totalRequests: 0,
  cacheHits: 0,
  hitRate: 0,
  avgLatency: 0,
  dbAccess: 0
})

const scenarioConfigs = {
  normal: { hitRate: 0.7 },
  cold: { hitRate: 0 },
  hot: { hitRate: 0.95 }
}

const onScenarioChange = () => {
  requestHistory.value = []
  stats.value = {
    totalRequests: 0,
    cacheHits: 0,
    hitRate: 0,
    avgLatency: 0,
    dbAccess: 0
  }
  cacheLevels.value.forEach((level) => {
    level.status = null
  })
}

const makeRequest = async () => {
  if (processing.value) return

  processing.value = true
  requestHistory.value = []

  // Reset statuses
  cacheLevels.value.forEach((level) => {
    level.status = null
  })

  const config = scenarioConfigs[scenario.value]
  let hit = Math.random() < config.hitRate
  let totalLatency = 0

  const delays = [100, 100, 100, 100, 100]

  for (let i = 0; i < cacheLevels.value.length; i++) {
    activeLevel.value = i

    await new Promise((resolve) => setTimeout(resolve, delays[i]))

    const level = cacheLevels.value[i]
    let eventTime = 0

    if (hit && i < cacheLevels.value.length - 1) {
      level.status = 'hit'
      eventTime = parseInt(level.latency.match(/\d+/)[0])
      totalLatency += eventTime

      requestHistory.value.push({
        level: level.name,
        icon: '✅',
        action: '缓存命中',
        time: eventTime,
        type: 'hit'
      })

      stats.value.cacheHits++
      break
    } else if (i === cacheLevels.value.length - 1) {
      level.status = 'miss'
      eventTime = parseInt(level.latency.match(/\d+/)[0])
      totalLatency += eventTime

      requestHistory.value.push({
        level: level.name,
        icon: '🗄️',
        action: '查询数据库',
        time: eventTime,
        type: 'miss'
      })

      stats.value.dbAccess++
    } else {
      level.status = 'miss'
      eventTime = parseInt(level.latency.match(/\d+/)[0])
      totalLatency += eventTime

      requestHistory.value.push({
        level: level.name,
        icon: '❌',
        action: '未命中，继续',
        time: eventTime,
        type: 'miss'
      })
    }
  }

  stats.value.totalRequests++
  stats.value.hitRate = Math.round(
    (stats.value.cacheHits / stats.value.totalRequests) * 100
  )
  stats.value.avgLatency = Math.round(totalLatency)

  processing.value = false
  activeLevel.value = -1
}
</script>

<style scoped>
.multi-level-cache-demo {
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
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.cache-levels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.cache-level {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.cache-level.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.cache-level.hit {
  border-color: #22c55e;
  background: #f0fdf4;
}

.cache-level.miss {
  border-color: #ef4444;
  background: #fef2f2;
}

.level-number {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.level-content {
  flex: 1;
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.level-name {
  font-weight: 700;
  font-size: 1rem;
}

.level-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.level-description {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.level-status {
  display: flex;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.hit {
  background: #22c55e;
  color: white;
}

.status-badge.miss {
  background: #ef4444;
  color: white;
}

.level-arrow {
  width: 40px;
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.request-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.request-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.request-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.scenario-select {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}

.request-flow {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.flow-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-event {
  display: grid;
  grid-template-columns: 120px 1fr 80px;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
}

.flow-event.hit {
  background: #f0fdf4;
}

.flow-event.miss {
  background: #fef2f2;
}

.event-level {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.event-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-icon {
  font-size: 1rem;
}

.event-time {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.stat-value.hit {
  color: #22c55e;
}

.stat-value.db {
  color: #ef4444;
}

.explanation {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.explanation-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.explanation-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.item-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.item-text {
  font-size: 0.85rem;
  line-height: 1.5;
}

.item-detail {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}
</style>
