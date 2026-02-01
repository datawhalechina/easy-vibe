<template>
  <div class="performance-benchmark-demo">
    <div class="benchmark-controls">
      <h4>性能基准测试</h4>
      <div class="control-group">
        <label>测试场景：</label>
        <select v-model="selectedScenario" @change="runBenchmark">
          <option value="hello">Hello World (简单 HTTP)</option>
          <option value="json">JSON 序列化</option>
          <option value="db">数据库查询</option>
          <option value="compute">CPU 密集计算</option>
        </select>
      </div>
      <button class="run-btn" @click="runBenchmark" :disabled="isRunning">
        {{ isRunning ? '测试中...' : '▶ 运行测试' }}
      </button>
    </div>

    <div class="results-panel">
      <div class="results-header">
        <h5>测试结果（Requests/Second）</h5>
        <div class="legend">
          <span class="legend-item"
            ><span class="dot" style="background: #f59e0b"></span> 高性能</span
          >
          <span class="legend-item"
            ><span class="dot" style="background: #10b981"></span> 中等</span
          >
          <span class="legend-item"
            ><span class="dot" style="background: #6366f1"></span> 较低</span
          >
        </div>
      </div>

      <transition-group name="bar" tag="div" class="chart-container">
        <div
          v-for="result in sortedResults"
          :key="result.language"
          class="chart-bar-wrapper"
        >
          <div class="bar-label">{{ result.language }}</div>
          <div class="bar-container">
            <div
              class="bar-fill"
              :class="getBarClass(result.rps)"
              :style="{ width: getBarWidth(result.rps) + '%' }"
            >
              <span class="bar-value">{{ formatRPS(result.rps) }}</span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div class="explanation-panel">
      <h5>💡 性能解释</h5>
      <div class="explanation-content">
        <p>{{ getCurrentExplanation() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedScenario = ref('hello')
const isRunning = ref(false)

const benchmarkData = {
  hello: {
    'C++': { rps: 1500000, time: 0.5 },
    Rust: { rps: 1200000, time: 0.6 },
    Go: { rps: 1000000, time: 0.7 },
    Java: { rps: 700000, time: 1.0 },
    'Node.js': { rps: 800000, time: 0.9 },
    Python: { rps: 200000, time: 2.5 },
    Ruby: { rps: 150000, time: 3.0 },
    PHP: { rps: 250000, time: 2.0 }
  },
  json: {
    'C++': { rps: 800000, time: 1.0 },
    Rust: { rps: 700000, time: 1.1 },
    Go: { rps: 600000, time: 1.2 },
    Java: { rps: 500000, time: 1.5 },
    'Node.js': { rps: 450000, time: 1.6 },
    Python: { rps: 150000, time: 4.0 },
    Ruby: { rps: 120000, time: 5.0 },
    PHP: { rps: 180000, time: 3.5 }
  },
  db: {
    'C++': { rps: 300000, time: 2.5 },
    Rust: { rps: 280000, time: 2.6 },
    Go: { rps: 250000, time: 3.0 },
    Java: { rps: 200000, time: 3.5 },
    'Node.js': { rps: 220000, time: 3.2 },
    Python: { rps: 80000, time: 8.0 },
    Ruby: { rps: 70000, time: 9.0 },
    PHP: { rps: 90000, time: 7.5 }
  },
  compute: {
    'C++': { rps: 500000, time: 1.5 },
    Rust: { rps: 480000, time: 1.6 },
    Go: { rps: 400000, time: 2.0 },
    Java: { rps: 350000, time: 2.3 },
    'Node.js': { rps: 50000, time: 15.0 },
    Python: { rps: 30000, time: 25.0 },
    Ruby: { rps: 25000, time: 30.0 },
    PHP: { rps: 35000, time: 20.0 }
  }
}

const explanations = {
  hello:
    '简单的 Hello World HTTP 响应测试。C++ 和 Rust 在这个测试中展现出接近硬件的性能优势。Go 和 Node.js 表现也很优秀，因为它们的 HTTP 栈经过高度优化。Python 和 Ruby 由于解释器开销，性能相对较低。',
  json: 'JSON 序列化/反序列化测试。这个测试考验语言的 JSON 处理能力。C++ 和 Rust 依然领先，但 Node.js 的表现也不错（V8 引擎优化）。Python 的标准库 json 模块性能尚可，但比编译型语言慢很多。',
  db: '模拟数据库查询（连接池 + 查询）。这个测试更接近真实应用。性能差距缩小了，因为瓶颈主要在数据库 I/O 而非语言本身。但依然能看到编译型语言（C++、Rust、Go）的优势。',
  compute:
    'CPU 密集型计算（斐波那契数列）。这个测试充分暴露了 Node.js 的短板：单线程 + V8 编译优化不如静态语言。Python 和 Ruby 表现最差，因为它们是解释型语言，且 GIL 限制了多线程性能。C++ 和 Rust 几乎是唯一选择。'
}

const currentResults = ref([])

const sortedResults = computed(() => {
  return [...currentResults.value].sort((a, b) => b.rps - a.rps)
})

const runBenchmark = () => {
  isRunning.value = true
  currentResults.value = []

  // 模拟测试延迟
  setTimeout(() => {
    const data = benchmarkData[selectedScenario.value]
    currentResults.value = Object.entries(data).map(([language, stats]) => ({
      language,
      rps: stats.rps,
      time: stats.time
    }))
    isRunning.value = false
  }, 1000)
}

const getBarWidth = (rps) => {
  const max = 1500000
  return (rps / max) * 100
}

const getBarClass = (rps) => {
  if (rps >= 800000) return 'bar-high'
  if (rps >= 300000) return 'bar-medium'
  return 'bar-low'
}

const formatRPS = (rps) => {
  if (rps >= 1000000) return (rps / 1000000).toFixed(1) + 'M'
  if (rps >= 1000) return (rps / 1000).toFixed(0) + 'K'
  return rps.toString()
}

const getCurrentExplanation = () => {
  return explanations[selectedScenario.value]
}

// 初始运行一次
runBenchmark()
</script>

<style scoped>
.performance-benchmark-demo {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.benchmark-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.benchmark-controls h4 {
  margin: 0;
  color: var(--vp-c-brand);
  font-size: 1.2rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.control-group select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
}

.run-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.run-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.results-panel {
  margin-bottom: 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-header h5 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.legend {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chart-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bar-label {
  min-width: 80px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.bar-container {
  flex: 1;
  height: 40px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  transition: width 0.8s ease-out;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
}

.bar-high {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.bar-medium {
  background: linear-gradient(90deg, #10b981, #059669);
}

.bar-low {
  background: linear-gradient(90deg, #6366f1, #4f46e5);
}

.bar-enter-active,
.bar-leave-active {
  transition: all 0.5s ease;
}

.bar-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.bar-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.explanation-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid var(--vp-c-brand);
}

.explanation-panel h5 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
}

.explanation-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .benchmark-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .control-group {
    flex: 1;
  }

  .run-btn {
    width: 100%;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .bar-label {
    min-width: 60px;
    font-size: 0.8rem;
  }

  .bar-value {
    font-size: 0.8rem;
  }
}
</style>
