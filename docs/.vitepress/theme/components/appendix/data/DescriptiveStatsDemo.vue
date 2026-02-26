<script setup>
import { ref, computed } from 'vue'

const dataInput = ref('23, 45, 67, 89, 12, 34, 56, 78, 90, 21')

const rawData = computed(() =>
  dataInput.value
    .split(',')
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n))
)

const sortedData = computed(() => [...rawData.value].sort((a, b) => a - b))
const count = computed(() => rawData.value.length)

const mean = computed(() => {
  if (!count.value) return 0
  return (rawData.value.reduce((a, b) => a + b, 0) / count.value).toFixed(2)
})

const median = computed(() => {
  const s = sortedData.value
  const n = s.length
  if (!n) return 0
  return n % 2 === 0
    ? ((s[n / 2 - 1] + s[n / 2]) / 2).toFixed(2)
    : s[Math.floor(n / 2)].toFixed(2)
})

const mode = computed(() => {
  const freq = {}
  let maxFreq = 0
  rawData.value.forEach((n) => {
    freq[n] = (freq[n] || 0) + 1
    if (freq[n] > maxFreq) maxFreq = freq[n]
  })
  if (maxFreq === 1) return '无'
  return Object.keys(freq)
    .filter((k) => freq[k] === maxFreq)
    .join(', ')
})

const stdDev = computed(() => {
  if (!count.value) return 0
  const m = parseFloat(mean.value)
  const variance =
    rawData.value.reduce((sum, n) => sum + Math.pow(n - m, 2), 0) /
    count.value
  return Math.sqrt(variance).toFixed(2)
})

const stats = computed(() => [
  { label: '样本数', value: count.value, desc: '数据点总数', color: '#3b82f6' },
  {
    label: '均值',
    value: mean.value,
    desc: '所有数值的平均值',
    color: '#22c55e'
  },
  {
    label: '中位数',
    value: median.value,
    desc: '排序后中间位置的值',
    color: '#f59e0b'
  },
  {
    label: '众数',
    value: mode.value,
    desc: '出现次数最多的值',
    color: '#8b5cf6'
  },
  {
    label: '标准差',
    value: stdDev.value,
    desc: '数据离散程度',
    color: '#06b6d4'
  }
])

function generateRandom() {
  dataInput.value = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 100) + 1
  ).join(', ')
}

function getBarHeight(val) {
  const max = Math.max(...sortedData.value)
  const min = Math.min(...sortedData.value)
  const range = max - min || 1
  return ((val - min) / range) * 80 + 20 + '%'
}

const barColors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899']
</script>

<template>
  <div class="stats-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">描述性统计演示</span>
      <span class="subtitle">输入数据，实时计算统计指标</span>
    </div>

    <div class="intro-text">
      面对大量数据时，我们需要用少数
      <span class="hl">代表性指标</span>
      来概括全貌。输入一组数字，观察均值、中位数、标准差等指标如何描述数据的
      <span class="hl">集中趋势</span> 和
      <span class="hl">离散程度</span>。
    </div>

    <div class="input-area">
      <div class="input-row">
        <input
          v-model="dataInput"
          class="data-input"
          placeholder="用逗号分隔，例如：1, 2, 3, 4, 5"
        />
        <button class="btn-random" @click="generateRandom">随机生成</button>
      </div>
    </div>

    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-value" :style="{ color: s.color }">{{ s.value }}</div>
        <div class="stat-desc">{{ s.desc }}</div>
      </div>
    </div>

    <div class="chart-area">
      <div class="chart-title">数据分布（升序排列）</div>
      <div class="bar-chart">
        <div
          v-for="(val, i) in sortedData"
          :key="i"
          class="bar"
          :style="{
            height: getBarHeight(val),
            background: barColors[i % barColors.length]
          }"
        >
          <span class="bar-label">{{ val }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.demo-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.intro-text {
  padding: 16px 20px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  border-bottom: 1px solid var(--vp-c-divider);
}

.hl {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.input-area {
  padding: 16px 20px;
}

.input-row {
  display: flex;
  gap: 10px;
}

.data-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
  font-family: 'Menlo', 'Monaco', monospace;
}

.btn-random {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.btn-random:hover {
  opacity: 0.85;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
  padding: 0 20px 16px;
}

.stat-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.chart-area {
  padding: 16px 20px 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.chart-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 160px;
  gap: 6px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px 12px 8px;
}

.bar {
  flex: 1;
  max-width: 50px;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.3s;
}

.bar-label {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bar-chart {
    gap: 3px;
  }
  .bar-label {
    font-size: 8px;
  }
}
</style>
