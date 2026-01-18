<!--
  SeckillSystemDemo.vue
  秒杀系统架构演示 - 完整的 MQ 应用场景
-->
<template>
  <div class="seckill-demo">
    <div class="header">
      <div class="title">秒杀系统：消息队列的典型应用</div>
      <div class="subtitle">处理 10 万/秒的并发请求，保证不超卖</div>
    </div>

    <div class="scenario-settings">
      <div class="setting">
        <label>
          商品库存：
          <strong>{{ stock }}</strong>
          件
        </label>
        <input v-model="stock" type="range" min="10" max="1000" step="10" />
      </div>
      <div class="setting">
        <label>
          请求速率：
          <strong>{{ requestRate }}</strong>
          请求/秒
        </label>
        <input
          v-model="requestRate"
          type="range"
          min="100"
          max="10000"
          step="100"
        />
      </div>
      <div class="setting">
        <label>
          订单处理：
          <strong>{{ processRate }}</strong>
          订单/秒
        </label>
        <input
          v-model="processRate"
          type="range"
          min="50"
          max="500"
          step="10"
        />
      </div>
    </div>

    <div class="action-bar">
      <button class="start-btn" @click="startSeckill" :disabled="running">
        🚀 开始秒杀
      </button>
      <button class="reset-btn" @click="reset">🔄 重置</button>
    </div>

    <div class="architecture">
      <div class="arch-layer gateway">
        <div class="layer-title">🌐 网关层 - 限流</div>
        <div class="layer-content">
          <div class="stat-box">
            <div class="stat-label">总请求数</div>
            <div class="stat-value">{{ totalRequests.toLocaleString() }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">限流通过</div>
            <div class="stat-value success">
              {{ passedRequests.toLocaleString() }}
            </div>
          </div>
          <div class="stat-box">
            <div class="stat-label">被拒绝</div>
            <div class="stat-value error">
              {{ rejectedRequests.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <div class="arch-arrow">⬇️</div>

      <div class="arch-layer redis">
        <div class="layer-title">⚡ Redis 预扣库存</div>
        <div class="layer-content">
          <div class="stock-display">
            <div class="stock-bar">
              <div
                class="stock-fill"
                :style="{ width: stockPercent + '%' }"
              ></div>
            </div>
            <div class="stock-text">
              剩余: {{ remainingStock }} / {{ stock }}
            </div>
          </div>
          <div class="redis-status" :class="redisStatus.class">
            {{ redisStatus.text }}
          </div>
        </div>
      </div>

      <div class="arch-arrow">⬇️</div>

      <div class="arch-layer queue">
        <div class="layer-title">📦 消息队列缓冲</div>
        <div class="layer-content">
          <div class="queue-visual">
            <div class="queue-box">
              <div class="queue-header">
                <span>秒杀订单队列</span>
                <span class="queue-count">{{ queueLength }}</span>
              </div>
              <div class="queue-bar-container">
                <div
                  class="queue-bar"
                  :class="queueStatus"
                  :style="{ width: queuePercent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="arch-arrow">⬇️</div>

      <div class="arch-layer consumer">
        <div class="layer-title">⚙️ 订单服务处理</div>
        <div class="layer-content">
          <div class="stat-box">
            <div class="stat-label">处理中</div>
            <div class="stat-value">{{ processing }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">成功订单</div>
            <div class="stat-value success">{{ successOrders }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">失败订单</div>
            <div class="stat-value error">{{ failedOrders }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="real-time-stats">
      <div class="stats-title">📊 实时监控</div>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-label">平均响应时间</div>
          <div class="stat-value">{{ avgLatency }}ms</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">订单成功率</div>
          <div class="stat-value">{{ orderSuccessRate }}%</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">队列积压</div>
          <div class="stat-value">{{ queueLength }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">预计清空时间</div>
          <div class="stat-value">{{ estimatedTime }}</div>
        </div>
      </div>
    </div>

    <div class="log-section">
      <div class="log-header">
        <div class="log-title">📋 事件日志</div>
        <button class="clear-log" @click="clearLogs">清空</button>
      </div>
      <div class="log-content">
        <div v-if="logs.length === 0" class="log-empty">暂无日志</div>
        <div
          v-for="(log, index) in logs.slice(0, 15)"
          :key="index"
          class="log-entry"
          :class="log.type"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-msg">{{ log.message }}</span>
        </div>
      </div>
    </div>

    <div class="key-points">
      <div class="point-title">🎯 核心设计要点</div>
      <div class="point-list">
        <div class="point-item">
          <span class="point-icon">1️⃣</span>
          <div>
            <strong>网关限流：</strong>只放行系统能处理的请求数（如 1
            万/秒），避免打爆后端
          </div>
        </div>
        <div class="point-item">
          <span class="point-icon">2️⃣</span>
          <div>
            <strong>Redis 预扣：</strong
            >原子操作扣减库存，快速判断是否有货，避免无效请求
          </div>
        </div>
        <div class="point-item">
          <span class="point-icon">3️⃣</span>
          <div>
            <strong>消息队列：</strong
            >将成功的扣库存请求放入队列，异步处理，削峰填谷
          </div>
        </div>
        <div class="point-item">
          <span class="point-icon">4️⃣</span>
          <div>
            <strong>异步处理：</strong
            >订单服务慢慢消费队列，创建订单，保证不超卖
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const stock = ref(100)
const requestRate = ref(5000)
const processRate = ref(200)
const running = ref(false)

const totalRequests = ref(0)
const passedRequests = ref(0)
const rejectedRequests = ref(0)
const remainingStock = ref(100)
const queueLength = ref(0)
const processing = ref(0)
const successOrders = ref(0)
const failedOrders = ref(0)
const logs = ref([])

let simulationInterval = null
let processInterval = null

const stockPercent = computed(() => {
  if (stock.value === 0) return 0
  return Math.round((remainingStock.value / stock.value) * 100)
})

const redisStatus = computed(() => {
  if (remainingStock.value === 0) {
    return { text: '🔴 已售罄', class: 'soldout' }
  }
  if (stockPercent.value < 20) {
    return { text: '⚠️ 库存紧张', class: 'low' }
  }
  return { text: '✅ 库存充足', class: 'normal' }
})

const queuePercent = computed(() => {
  const maxQueue = 5000
  return Math.min(100, Math.round((queueLength.value / maxQueue) * 100))
})

const queueStatus = computed(() => {
  if (queuePercent.value >= 80) return 'critical'
  if (queuePercent.value >= 50) return 'warning'
  return 'normal'
})

const avgLatency = computed(() => {
  return 15 + Math.floor(queueLength.value / 100)
})

const orderSuccessRate = computed(() => {
  const total = successOrders.value + failedOrders.value
  if (total === 0) return 0
  return Math.round((successOrders.value / total) * 100)
})

const estimatedTime = computed(() => {
  if (queueLength.value === 0 || processRate.value === 0) return '0s'
  const seconds = Math.ceil(queueLength.value / (processRate.value / 10))
  if (seconds < 60) return `${seconds}s`
  return `${Math.ceil(seconds / 60)}m`
})

const startSeckill = () => {
  if (running.value) return

  running.value = true
  remainingStock.value = stock.value
  successOrders.value = 0
  failedOrders.value = 0

  addLog(
    'info',
    `🚀 秒杀开始！库存: ${stock.value}, 请求速率: ${requestRate.value}/s`
  )

  simulationInterval = setInterval(() => {
    const requests = Math.floor(requestRate.value / 10)
    totalRequests.value += requests

    // 网关限流：只放行 80%
    const passed = Math.floor(requests * 0.8)
    const rejected = requests - passed

    passedRequests.value += passed
    rejectedRequests.value += rejected

    // Redis 预扣库存
    let successfulPreDeduct = 0
    for (let i = 0; i < passed; i++) {
      if (remainingStock.value > 0) {
        remainingStock.value--
        queueLength.value++
        successfulPreDeduct++
      }
    }

    if (remainingStock.value === 0 && stock.value > 0) {
      addLog('error', '🔴 商品已售罄！')
    }

    if (successfulPreDeduct > 0 && Math.random() < 0.1) {
      addLog('info', `✅ ${successfulPreDeduct} 个请求预扣成功，进入队列`)
    }
  }, 100)

  processInterval = setInterval(() => {
    if (queueLength.value > 0) {
      const toProcess = Math.min(
        Math.floor(processRate.value / 10),
        queueLength.value
      )
      queueLength.value -= toProcess
      processing.value = toProcess

      setTimeout(() => {
        processing.value = 0
        // 90% 成功率
        const success = Math.floor(toProcess * 0.9)
        const failed = toProcess - success

        successOrders.value += success
        failedOrders.value += failed

        if (success > 0) {
          addLog('success', `✅ 创建 ${success} 个订单`)
        }
        if (failed > 0) {
          addLog('warning', `⚠️ ${failed} 个订单创建失败（库存不足）`)
        }
      }, 200)
    }
  }, 100)
}

const reset = () => {
  stopSimulation()
  totalRequests.value = 0
  passedRequests.value = 0
  rejectedRequests.value = 0
  remainingStock.value = stock.value
  queueLength.value = 0
  processing.value = 0
  successOrders.value = 0
  failedOrders.value = 0
  logs.value = []
}

const stopSimulation = () => {
  running.value = false
  if (simulationInterval) {
    clearInterval(simulationInterval)
    simulationInterval = null
  }
  if (processInterval) {
    clearInterval(processInterval)
    processInterval = null
  }
}

const addLog = (type, message) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.unshift({ type, time, message })
  if (logs.value.length > 50) {
    logs.value = logs.value.slice(0, 50)
  }
}

const clearLogs = () => {
  logs.value = []
}

onUnmounted(() => {
  stopSimulation()
})
</script>

<style scoped>
.seckill-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.scenario-settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.setting label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.setting input[type='range'] {
  width: 100%;
}

.action-bar {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 1rem 0;
}

.start-btn,
.reset-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.start-btn {
  background: var(--vp-c-brand);
  color: white;
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.start-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-text-2);
  color: white;
}

.architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.arch-layer {
  width: 100%;
  max-width: 600px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
}

.layer-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.layer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
}

.stat-box {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.stat-value.success {
  color: #22c55e;
}

.stat-value.error {
  color: #ef4444;
}

.arch-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.stock-display {
  grid-column: 1 / -1;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.stock-bar {
  height: 20px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.stock-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  transition: width 0.3s ease;
}

.stock-text {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.redis-status {
  grid-column: 1 / -1;
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.redis-status.normal {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.redis-status.low {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.redis-status.soldout {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.queue-visual {
  grid-column: 1 / -1;
}

.queue-box {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
}

.queue-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.queue-bar-container {
  height: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
}

.queue-bar {
  height: 100%;
  transition:
    width 0.3s ease,
    background 0.3s ease;
}

.queue-bar.normal {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.queue-bar.warning {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.queue-bar.critical {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.real-time-stats {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
}

.stats-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.stat-item {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.stat-item .stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.stat-item .stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.log-section {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.log-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.clear-log {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
}

.log-content {
  max-height: 300px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.8rem;
}

.log-empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 1rem;
}

.log-entry {
  display: flex;
  gap: 0.5rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.log-msg {
  flex: 1;
}

.log-entry.info .log-msg {
  color: var(--vp-c-text-1);
}

.log-entry.success .log-msg {
  color: #16a34a;
}

.log-entry.warning .log-msg {
  color: #d97706;
}

.log-entry.error .log-msg {
  color: #dc2626;
}

.key-points {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.point-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.point-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.point-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.point-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.point-item div {
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
