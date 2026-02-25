<!--
  CapacityEstimationDemo.vue
  容量估算计算器：信封背面估算交互演示
-->
<template>
  <div class="capacity-demo">
    <div class="header">
      <div class="title">信封背面估算器</div>
      <div class="subtitle">输入基础数据，自动计算系统容量需求</div>
    </div>

    <div class="inputs">
      <div class="input-group">
        <label>日活用户（万）</label>
        <input v-model.number="dau" type="number" min="1" max="100000" />
      </div>
      <div class="input-group">
        <label>人均请求数/天</label>
        <input v-model.number="reqPerUser" type="number" min="1" max="1000" />
      </div>
      <div class="input-group">
        <label>单次响应大小（KB）</label>
        <input v-model.number="responseSize" type="number" min="0.1" max="1000" />
      </div>
      <div class="input-group">
        <label>峰值系数</label>
        <input v-model.number="peakFactor" type="number" min="1" max="10" step="0.5" />
      </div>
    </div>

    <div class="results">
      <div class="result-card">
        <div class="result-label">日请求量</div>
        <div class="result-value">{{ formatNumber(dailyRequests) }}</div>
      </div>
      <div class="result-card">
        <div class="result-label">平均 QPS</div>
        <div class="result-value">{{ formatNumber(avgQps) }}</div>
      </div>
      <div class="result-card">
        <div class="result-label">峰值 QPS</div>
        <div class="result-value">{{ formatNumber(peakQps) }}</div>
      </div>
      <div class="result-card">
        <div class="result-label">日带宽</div>
        <div class="result-value">{{ formatBandwidth(dailyBandwidth) }}</div>
      </div>
      <div class="result-card">
        <div class="result-label">峰值带宽</div>
        <div class="result-value">{{ formatBandwidth(peakBandwidthPerSec) }}/s</div>
      </div>
    </div>

    <div class="reference">
      <div class="ref-title">常用估算参考值</div>
      <div class="ref-grid">
        <div class="ref-item" v-for="r in references" :key="r.label">
          <span class="ref-label">{{ r.label }}</span>
          <span class="ref-value">{{ r.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const dau = ref(100)
const reqPerUser = ref(20)
const responseSize = ref(5)
const peakFactor = ref(3)

const dailyRequests = computed(() => dau.value * 10000 * reqPerUser.value)
const avgQps = computed(() => Math.round(dailyRequests.value / 86400))
const peakQps = computed(() => Math.round(avgQps.value * peakFactor.value))
const dailyBandwidth = computed(() => dailyRequests.value * responseSize.value * 1024)
const peakBandwidthPerSec = computed(() => peakQps.value * responseSize.value * 1024)

const references = [
  { label: '1 天', value: '86,400 秒' },
  { label: '1 月', value: '≈ 250 万秒' },
  { label: 'QPS 1000', value: '≈ 1 台 8 核服务器' },
  { label: '1 亿/天', value: '≈ 1,200 QPS' },
  { label: 'MySQL 单机', value: '≈ 5,000 QPS' },
  { label: 'Redis 单机', value: '≈ 100,000 QPS' }
]

function formatNumber(n) {
  if (n >= 1e8) return (n / 1e8).toFixed(1) + ' 亿'
  if (n >= 1e4) return (n / 1e4).toFixed(1) + ' 万'
  return n.toLocaleString()
}

function formatBandwidth(bytes) {
  if (bytes >= 1e12) return (bytes / 1e12).toFixed(1) + ' TB'
  if (bytes >= 1e9) return (bytes / 1e9).toFixed(1) + ' GB'
  if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + ' MB'
  if (bytes >= 1e3) return (bytes / 1e3).toFixed(1) + ' KB'
  return bytes + ' B'
}
</script>

<style scoped>
.capacity-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.input-group label {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}
.input-group input {
  width: 100%;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.result-card {
  padding: 0.6rem;
  border-radius: 8px;
  text-align: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.result-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
.result-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}
.reference {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}
.ref-title {
  font-weight: 600;
  font-size: 0.82rem;
  margin-bottom: 0.5rem;
}
.ref-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.3rem;
}
.ref-item {
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
}
.ref-label { color: var(--vp-c-text-2); }
.ref-value { font-weight: 600; font-family: var(--vp-font-family-mono); }
</style>
