<template>
  <div class="serverless-demo">
    <div class="demo-header">
      <h4>⚡ Serverless 架构演示</h4>
      <p>观察 Serverless 如何按需执行函数、自动扩缩容</p>
    </div>

    <div class="serverless-visualization">
      <div class="function-grid">
        <div v-for="func in functions" :key="func.name" class="function-card" :class="{ active: func.state === 'running', cold: func.state === 'cold', warming: func.state === 'warming' }" @click="triggerFunction(func.name)">
          <div class="function-icon">{{ func.icon }}</div>
          <div class="function-name">{{ func.name }}</div>
          <div class="function-state" :class="func.state">{{ stateText(func.state) }}</div>
          <div class="function-metrics" v-if="func.invocations > 0">
            <span>调用: {{ func.invocations }}</span>
            <span>平均: {{ func.avgDuration }}ms</span>
          </div>
        </div>
      </div>

      <div class="auto-scaling-panel">
        <div class="scaling-title">自动扩缩容状态</div>
        <div class="scaling-metrics">
          <div class="metric">
            <span class="metric-label">并发请求:</span>
            <span class="metric-value">{{ concurrentRequests }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">运行实例:</span>
            <span class="metric-value">{{ runningInstances }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">冷启动:</span>
            <span class="metric-value">{{ coldStarts }}</span>
          </div>
        </div>
        <div class="scaling-chart">
          <div v-for="(point, idx) in scalingHistory" :key="idx" class="chart-bar" :style="{ height: point + '%' }" :class="{ high: point > 70 }"></div>
        </div>
      </div>
    </div>

    <div class="traffic-simulator">
      <div class="simulator-title">流量模拟器</div>
      <div class="traffic-patterns">
        <button v-for="pattern in trafficPatterns" :key="pattern.name" class="pattern-btn" :class="{ active: currentPattern === pattern.name }" @click="applyPattern(pattern)">
          <span class="pattern-icon">{{ pattern.icon }}</span>
          <span class="pattern-name">{{ pattern.name }}</span>
          <span class="pattern-desc">{{ pattern.desc }}</span>
        </button>
      </div>
    </div>

    <div class="demo-explanation">
      <h5>💡 Serverless 核心特性</h5>
      <ul>
        <li><strong>按需执行</strong>：函数只在被调用时运行，不调用不产生费用</li>
        <li><strong>自动扩缩容</strong>：从 0 到数千实例自动扩展，无需人工干预</li>
        <li><strong>冷启动</strong>：长时间未调用后首次调用会有延迟，需要预热策略</li>
        <li><strong>事件驱动</strong>：响应 HTTP 请求、消息队列、定时任务等多种事件源</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const functions = reactive([
  { name: '用户登录', icon: '🔐', state: 'cold', invocations: 0, avgDuration: 0 },
  { name: '订单处理', icon: '📦', state: 'cold', invocations: 0, avgDuration: 0 },
  { name: '图片处理', icon: '🖼️', state: 'cold', invocations: 0, avgDuration: 0 },
  { name: '数据备份', icon: '💾', state: 'cold', invocations: 0, avgDuration: 0 }
])

const concurrentRequests = ref(0)
const runningInstances = ref(0)
const coldStarts = ref(0)
const scalingHistory = ref([10, 15, 20, 25, 30, 35, 40, 35, 30, 25, 20, 15])
const currentPattern = ref(null)
const isFlowRunning = ref(false)

const trafficPatterns = [
  { name: '正常流量', icon: '📊', desc: '平稳的请求速率' },
  { name: '突发流量', icon: '🚀', desc: '突然的流量激增' },
  { name: '潮汐流量', icon: '🌊', desc: '周期性的高低峰' }
]

const stateText = (state) => {
  const map = { cold: '冷状态', warming: '预热中', running: '运行中' }
  return map[state] || state
}

const triggerFunction = async (name) => {
  const fn = functions.find(f => f.name === name)
  if (!fn) return

  if (fn.state === 'cold') {
    fn.state = 'warming'
    coldStarts.value++
    await new Promise(r => setTimeout(r, 800))
  }

  fn.state = 'running'
  fn.invocations++
  concurrentRequests.value++
  runningInstances.value++

  const duration = Math.floor(Math.random() * 150) + 50
  fn.avgDuration = Math.floor((fn.avgDuration * (fn.invocations - 1) + duration) / fn.invocations)

  await new Promise(r => setTimeout(r, duration))

  concurrentRequests.value--
  if (concurrentRequests.value === 0) {
    runningInstances.value = 0
  }

  setTimeout(() => {
    if (fn.invocations > 0) {
      fn.state = 'cold'
    }
  }, 3000)
}

const applyPattern = (pattern) => {
  currentPattern.value = pattern.name
  // 模拟流量模式
  if (pattern.name === '突发流量') {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const fn = functions[Math.floor(Math.random() * functions.length)]
        triggerFunction(fn.name)
      }, i * 200)
    }
  } else if (pattern.name === '潮汐流量') {
    const interval = setInterval(() => {
      const fn = functions[Math.floor(Math.random() * functions.length)]
      triggerFunction(fn.name)
    }, 500)
    setTimeout(() => clearInterval(interval), 3000)
  }
}

let interval
onMounted(() => {
  interval = setInterval(() => {
    scalingHistory.value.shift()
    const last = scalingHistory.value[scalingHistory.value.length - 1]
    const variation = Math.floor(Math.random() * 20) - 10
    const next = Math.max(10, Math.min(90, last + variation))
    scalingHistory.value.push(next)
  }, 2000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.serverless-demo {
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

.serverless-visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.function-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.function-card:hover {
  border-color: var(--vp-c-brand);
}

.function-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.function-card.cold {
  opacity: 0.7;
}

.function-card.warming {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.function-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.function-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.function-state {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.function-state.cold {
  background: rgba(156, 163, 175, 0.2);
  color: var(--vp-c-text-2);
}

.function-state.warming {
  background: rgba(245, 158, 11, 0.2);
  color: #d97706;
}

.function-state.running {
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.function-metrics {
  display: flex;
  justify-content: space-around;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.5rem;
}

.auto-scaling-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.scaling-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  text-align: center;
}

.scaling-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.metric-label {
  color: var(--vp-c-text-2);
}

.metric-value {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.scaling-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 60px;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.chart-bar {
  flex: 1;
  background: var(--vp-c-brand);
  border-radius: 1px;
  transition: height 0.3s;
  min-height: 2px;
}

.chart-bar.high {
  background: var(--vp-c-warning);
}

.traffic-simulator {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.simulator-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  text-align: center;
}

.traffic-patterns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.pattern-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pattern-btn:hover {
  border-color: var(--vp-c-brand);
}

.pattern-btn.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
}

.pattern-icon {
  font-size: 1.5rem;
}

.pattern-name {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.pattern-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.demo-explanation {
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
  margin: 0;
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

@media (max-width: 768px) {
  .serverless-visualization {
    grid-template-columns: 1fr;
  }

  .function-grid {
    grid-template-columns: 1fr;
  }

  .traffic-patterns {
    grid-template-columns: 1fr;
  }
}
</style>
