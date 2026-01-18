<!--
  CacheHitRatioDemo.vue
  缓存命中率与延迟/数据库压力演示
-->
<template>
  <div class="cache-demo">
    <div class="header">
      <div class="title">缓存命中率：速度与成本的杠杆</div>
      <div class="subtitle">调整命中率，观察平均延迟与数据库压力</div>
    </div>

    <div class="controls">
      <label>
        缓存命中率：<strong>{{ hitRatio }}%</strong>
      </label>
      <input v-model="hitRatio" type="range" min="0" max="100" step="1" />
      <label class="toggle">
        <input v-model="cacheEnabled" type="checkbox" />
        启用缓存
      </label>
    </div>

    <div class="metrics">
      <div class="metric-card">
        <div class="label">平均延迟</div>
        <div class="value">{{ avgLatency }} ms</div>
        <div class="meter">
          <div class="bar" :style="{ width: latencyBar + '%' }"></div>
        </div>
      </div>
      <div class="metric-card">
        <div class="label">数据库请求比例</div>
        <div class="value">{{ dbRate }}%</div>
        <div class="meter">
          <div class="bar warn" :style="{ width: dbRate + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="item"><span class="dot cache"></span>缓存命中</div>
      <div class="item"><span class="dot db"></span>数据库读取</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const hitRatio = ref(60)
const cacheEnabled = ref(true)

const cacheLatency = 8
const dbLatency = 120

const effectiveHit = computed(() => (cacheEnabled.value ? hitRatio.value : 0))

const avgLatency = computed(() => {
  const hit = effectiveHit.value / 100
  return Math.round(hit * cacheLatency + (1 - hit) * dbLatency)
})

const dbRate = computed(() => Math.round(100 - effectiveHit.value))
const latencyBar = computed(() =>
  Math.min(100, Math.round(avgLatency.value / 2))
)
</script>

<style scoped>
.cache-demo {
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
}

.controls label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.controls input[type='range'] {
  width: 100%;
  margin-bottom: 0.6rem;
}

.toggle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.9rem;
  border: 1px solid var(--vp-c-divider);
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.value {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.25rem 0 0.5rem;
}

.meter {
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #14b8a6);
}

.bar.warn {
  background: linear-gradient(90deg, #f59e0b, #ef4444);
}

.legend {
  display: flex;
  gap: 1rem;
  margin-top: 0.9rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.dot.cache {
  background: #22c55e;
}

.dot.db {
  background: #ef4444;
}
</style>
