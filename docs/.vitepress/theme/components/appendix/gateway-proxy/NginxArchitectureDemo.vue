<!--
  NginxArchitectureDemo.vue
  Nginx架构 - Master-Worker/事件驱动
-->
<template>
  <div class="nginx-architecture-demo">
    <div class="header">
      <div class="title">⚡ Nginx 架构揭秘：为什么它能扛住百万并发？</div>
      <div class="subtitle">Master-Worker 进程模型 + 事件驱动 = 高性能的秘诀</div>
    </div>

    <div class="architecture-diagram">
      <div class="diagram-title">Nginx 进程架构图</div>

      <div class="process-layer master-layer">
        <div class="process master">
          <div class="process-icon">👑</div>
          <div class="process-info">
            <div class="process-name">Master 进程</div>
            <div class="process-desc">管理所有 Worker，负责配置加载、平滑升级</div>
          </div>
        </div>
      </div>

      <div class="connections">
        <div class="connection-line" v-for="n in workerCount" :key="n"></div>
      </div>

      <div class="process-layer worker-layer">
        <div class="worker-controls">
          <button class="control-btn" @click="decreaseWorker" :disabled="workerCount <= 1">-</button>
          <span class="worker-count">{{ workerCount }} 个 Worker</span>
          <button class="control-btn" @click="increaseWorker" :disabled="workerCount >= 8">+</button>
        </div>

        <div class="workers">
          <div
            class="process worker"
            v-for="n in workerCount"
            :key="n"
            :class="{ active: activeWorker === n, processing: processingWorkers.includes(n) }"
            @click="activateWorker(n)"
          >
            <div class="process-icon">⚙️</div>
            <div class="process-info">
              <div class="process-name">Worker {{ n }}</div>
              <div class="process-desc">处理 {{ requestCounts[n] || 0 }} 请求</div>
            </div>
            <div class="status-indicator"></div>
          </div>
        </div>
      </div>

      <div class="epoll-layer">
        <div class="epoll-box">
          <div class="epoll-title">📡 epoll (Linux) / kqueue (macOS)</div>
          <div class="epoll-desc">事件驱动：一个 Worker 同时处理数万个连接</div>
          <div class="epoll-comparison">
            <div class="compare-item old">
              <div class="compare-title">传统 Apache</div>
              <div class="compare-detail">一个连接 = 一个进程/线程</div>
              <div class="compare-result">❌ C10K 问题</div>
            </div>
            <div class="vs">VS</div>
            <div class="compare-item new">
              <div class="compare-title">Nginx</div>
              <div class="compare-detail">事件驱动 + 异步非阻塞</div>
              <div class="compare-result">✅ 百万并发</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="simulation-panel">
      <div class="panel-title">🎮 模拟请求处理</div>
      <div class="sim-controls">
        <button class="sim-btn" @click="simulateRequests" :disabled="isSimulating">
          {{ isSimulating ? '处理中...' : '发送 20 个并发请求' }}
        </button>
        <button class="sim-btn secondary" @click="resetSimulation">重置</button>
      </div>
      <div class="sim-stats" v-if="totalRequests > 0">
        <div class="stat-item">
          <div class="stat-value">{{ totalRequests }}</div>
          <div class="stat-label">总请求数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ mostActiveWorker }}</div>
          <div class="stat-label">最忙 Worker</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ avgRequests.toFixed(1) }}</div>
          <div class="stat-label">平均/Worker</div>
        </div>
      </div>
    </div>

    <div class="config-tip">
      <div class="tip-title">💡 生产环境建议</div>
      <div class="tip-content">
        <strong>Worker 数量 = CPU 核心数</strong>（通常设置为 auto，让 Nginx 自动检测）
        <br>
        太多了上下文切换开销大，太少了无法利用多核性能。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const workerCount = ref(4)
const activeWorker = ref(1)
const requestCounts = ref({})
const isSimulating = ref(false)
const processingWorkers = ref([])

const totalRequests = computed(() => {
  return Object.values(requestCounts.value).reduce((a, b) => a + b, 0)
})

const mostActiveWorker = computed(() => {
  let max = 0
  let worker = '-'
  Object.entries(requestCounts.value).forEach(([k, v]) => {
    if (v > max) {
      max = v
      worker = k
    }
  })
  return worker
})

const avgRequests = computed(() => {
  if (workerCount.value === 0) return 0
  return totalRequests.value / workerCount.value
})

const increaseWorker = () => {
  if (workerCount.value < 8) {
    workerCount.value++
  }
}

const decreaseWorker = () => {
  if (workerCount.value > 1) {
    workerCount.value--
  }
}

const activateWorker = (n) => {
  activeWorker.value = n
}

const simulateRequests = async () => {
  isSimulating.value = true
  const requests = 20

  for (let i = 0; i < requests; i++) {
    const worker = Math.floor(Math.random() * workerCount.value) + 1
    processingWorkers.value.push(worker)

    await new Promise(resolve => setTimeout(resolve, 100))

    requestCounts.value[worker] = (requestCounts.value[worker] || 0) + 1
    processingWorkers.value = processingWorkers.value.filter(w => w !== worker)
  }

  isSimulating.value = false
}

const resetSimulation = () => {
  requestCounts.value = {}
  processingWorkers.value = []
  isSimulating.value = false
}
</script>

<style scoped>
.nginx-architecture-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.architecture-diagram {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.diagram-title {
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.process-layer {
  margin-bottom: 1.5rem;
}

.process {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s;
}

.process.master {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
}

.process.worker {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
}

.process.worker:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.process.worker.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.process.worker.processing {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.process-icon {
  font-size: 2rem;
}

.process-info {
  flex: 1;
}

.process-name {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.process-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
}

.worker-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.control-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.worker-count {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.workers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.epoll-layer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--vp-c-divider);
}

.epoll-box {
  background: linear-gradient(135deg, rgba(var(--vp-c-brand-rgb), 0.1), rgba(var(--vp-c-brand-rgb), 0.05));
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  padding: 1.5rem;
}

.epoll-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.epoll-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.epoll-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

.compare-item {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.compare-item.old {
  border: 2px solid #ef4444;
}

.compare-item.new {
  border: 2px solid #22c55e;
}

.compare-title {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.compare-detail {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.compare-result {
  font-weight: 700;
  font-size: 1.1rem;
}

.old .compare-result {
  color: #ef4444;
}

.new .compare-result {
  color: #22c55e;
}

.vs {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.simulation-panel {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.panel-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.sim-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.sim-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.sim-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.sim-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sim-btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.sim-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.stat-value {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.config-tip {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
  border: 2px solid #22c55e;
  border-radius: 12px;
  padding: 1.25rem;
}

.tip-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #15803d;
}

.tip-content {
  color: var(--vp-c-text-1);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .epoll-comparison {
    grid-template-columns: 1fr;
  }

  .vs {
    text-align: center;
  }

  .sim-stats {
    grid-template-columns: 1fr;
  }

  .workers {
    grid-template-columns: 1fr;
  }
}
</style>
