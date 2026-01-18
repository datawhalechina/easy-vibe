<!--
  PeakShavingDemo.vue
  削峰填谷演示 - 流量缓冲可视化
-->
<template>
  <div class="peak-shaving-demo">
    <div class="header">
      <div class="title">削峰填谷：把高峰"摊平"</div>
      <div class="subtitle">调整请求速率，观察队列如何缓冲流量</div>
    </div>

    <div class="controls">
      <div class="control">
        <label>
          请求速率：<strong>{{ requestRate }}</strong> 请求/秒
        </label>
        <input
          v-model="requestRate"
          type="range"
          min="100"
          max="10000"
          step="100"
        />
      </div>
      <div class="control">
        <label>
          处理速率：<strong>{{ processRate }}</strong> 请求/秒
        </label>
        <input
          v-model="processRate"
          type="range"
          min="50"
          max="500"
          step="10"
        />
      </div>
      <div class="control">
        <label>
          队列容量：<strong>{{ queueCapacity }}</strong>
        </label>
        <input
          v-model="queueCapacity"
          type="range"
          min="100"
          max="5000"
          step="100"
        />
      </div>
    </div>

    <div class="simulation">
      <button class="sim-btn" @click="toggleSimulation">
        {{ running ? '⏸️ 暂停' : '▶️ 开始模拟' }}
      </button>
      <button class="sim-btn reset" @click="reset">🔄 重置</button>
    </div>

    <div class="flow-visualization">
      <div class="column incoming">
        <div class="col-header">📥 入站流量</div>
        <div class="rate-display">{{ requestRate }}/s</div>
        <div class="bar-container">
          <div class="bar-fill" :style="{ height: requestHeight + '%' }"></div>
        </div>
        <div class="particles incoming-particles">
          <div
            v-for="p in incomingParticles"
            :key="p.id"
            class="particle"
            :style="{ animationDelay: p.delay + 'ms' }"
          ></div>
        </div>
      </div>

      <div class="column queue">
        <div class="col-header">📦 消息队列</div>
        <div class="queue-info">
          <div class="queue-count">{{ queueLength }} / {{ queueCapacity }}</div>
          <div class="queue-percent">{{ queuePercent }}%</div>
        </div>
        <div class="queue-bar-container">
          <div
            class="queue-bar"
            :class="queueStatus"
            :style="{ width: queuePercent + '%' }"
          ></div>
        </div>
        <div class="queue-status-text">{{ queueStatusText }}</div>
      </div>

      <div class="column outgoing">
        <div class="col-header">📤 处理流量</div>
        <div class="rate-display">{{ processRate }}/s</div>
        <div class="bar-container">
          <div
            class="bar-fill stable"
            :style="{ height: processHeight + '%' }"
          ></div>
        </div>
        <div class="particles outgoing-particles">
          <div
            v-for="p in outgoingParticles"
            :key="p.id"
            class="particle processed"
            :style="{ animationDelay: p.delay + 'ms' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="metrics">
      <div class="metric-card">
        <div class="metric-label">队列积压</div>
        <div class="metric-value">{{ queueLength }}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">平均等待时间</div>
        <div class="metric-value">{{ avgWaitTime }}s</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">已处理请求</div>
        <div class="metric-value">{{ processedCount }}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">拒绝请求</div>
        <div class="metric-value error">{{ rejectedCount }}</div>
      </div>
    </div>

    <div class="scenario-tips">
      <div class="tip">
        <strong>💡 典型场景：</strong>秒杀活动 1 秒内 10 万请求，数据库只能处理
        1000/秒
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const requestRate = ref(5000)
const processRate = ref(200)
const queueCapacity = ref(2000)
const queueLength = ref(0)
const processedCount = ref(0)
const rejectedCount = ref(0)
const running = ref(false)

let interval = null
let particleId = 0

const incomingParticles = ref([])
const outgoingParticles = ref([])

const requestHeight = computed(() =>
  Math.min(100, (requestRate.value / 10000) * 100)
)
const processHeight = computed(() =>
  Math.min(100, (processRate.value / 500) * 100)
)
const queuePercent = computed(() =>
  Math.round((queueLength.value / queueCapacity.value) * 100)
)

const queueStatus = computed(() => {
  if (queuePercent.value >= 90) return 'critical'
  if (queuePercent.value >= 70) return 'warning'
  return 'normal'
})

const queueStatusText = computed(() => {
  if (queuePercent.value >= 90) return '⚠️ 队列接近满载'
  if (queuePercent.value >= 70) return '⚡ 队列积压较多'
  return '✅ 队列状态良好'
})

const avgWaitTime = computed(() => {
  if (processRate.value === 0) return '∞'
  return (queueLength.value / processRate.value).toFixed(1)
})

const toggleSimulation = () => {
  running.value = !running.value
  if (running.value) {
    startSimulation()
  } else {
    stopSimulation()
  }
}

const startSimulation = () => {
  interval = setInterval(() => {
    // 模拟请求到达
    const requests = Math.floor(requestRate.value / 10)

    // 尝试加入队列
    const available = queueCapacity.value - queueLength.value
    const accepted = Math.min(requests, available)
    const rejected = requests - accepted

    queueLength.value += accepted
    rejectedCount.value += rejected

    // 生成入站粒子
    for (let i = 0; i < Math.min(5, accepted); i++) {
      particleId++
      incomingParticles.value.push({ id: particleId, delay: i * 50 })
      setTimeout(
        () => {
          incomingParticles.value = incomingParticles.value.filter(
            (p) => p.id !== particleId
          )
        },
        500 + i * 50
      )
    }

    // 模拟处理请求
    const processed = Math.min(
      Math.floor(processRate.value / 10),
      queueLength.value
    )
    queueLength.value -= processed
    processedCount.value += processed

    // 生成出站粒子
    for (let i = 0; i < Math.min(5, processed); i++) {
      particleId++
      outgoingParticles.value.push({ id: particleId, delay: i * 50 })
      setTimeout(
        () => {
          outgoingParticles.value = outgoingParticles.value.filter(
            (p) => p.id !== particleId
          )
        },
        500 + i * 50
      )
    }
  }, 100)
}

const stopSimulation = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

const reset = () => {
  stopSimulation()
  running.value = false
  queueLength.value = 0
  processedCount.value = 0
  rejectedCount.value = 0
  incomingParticles.value = []
  outgoingParticles.value = []
}

onUnmounted(() => {
  stopSimulation()
})
</script>

<style scoped>
.peak-shaving-demo {
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

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.control label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.control input[type='range'] {
  width: 100%;
}

.simulation {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 1rem 0;
}

.sim-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.sim-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.sim-btn.reset {
  background: var(--vp-c-text-2);
}

.flow-visualization {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 10px;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.col-header {
  font-weight: 600;
  font-size: 0.9rem;
}

.rate-display {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.bar-container {
  width: 60px;
  height: 120px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #3b82f6, #1d4ed8);
  border-radius: 0 0 8px 8px;
  transition: height 0.3s ease;
}

.bar-fill.stable {
  background: linear-gradient(180deg, #22c55e, #16a34a);
}

.queue-info {
  text-align: center;
}

.queue-count {
  font-size: 1.2rem;
  font-weight: 700;
}

.queue-percent {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.queue-bar-container {
  width: 100%;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  position: relative;
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

.queue-status-text {
  font-size: 0.85rem;
  text-align: center;
  margin-top: 0.25rem;
}

.particles {
  position: relative;
  height: 60px;
  width: 100%;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  animation: fall 0.5s linear infinite;
}

.particle.processed {
  background: #22c55e;
}

@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(60px);
    opacity: 0;
  }
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.metric-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.metric-value.error {
  color: #ef4444;
}

.scenario-tips {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
