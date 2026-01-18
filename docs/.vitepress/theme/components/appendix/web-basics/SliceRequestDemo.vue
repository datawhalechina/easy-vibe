<!--
  SliceRequestDemo.vue
  切图时代的请求数与加载时间演示
-->
<template>
  <div class="slice-demo">
    <div class="header">
      <div class="title">切图时代：请求数越多越慢</div>
      <div class="subtitle">调整切图数量，观察加载时间变化</div>
    </div>

    <div class="controls">
      <label>
        切图数量：<strong>{{ slices }}</strong> 张
      </label>
      <input v-model="slices" type="range" min="1" max="30" step="1" />
      <label class="toggle">
        <input v-model="useSprite" type="checkbox" />
        合并雪碧图 (Sprite)
      </label>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">总请求数</div>
        <div class="value">{{ totalRequests }}</div>
      </div>
      <div class="metric">
        <div class="label">预计加载时间</div>
        <div class="value">{{ loadTime }} ms</div>
      </div>
    </div>

    <div class="bar">
      <div class="progress" :style="{ width: barWidth + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const slices = ref(12)
const useSprite = ref(false)

const totalRequests = computed(() => {
  const sliceRequests = useSprite.value ? 1 : slices.value
  return sliceRequests + 2
})

const loadTime = computed(() => {
  const base = 120
  const perRequest = 45
  return Math.round(base + totalRequests.value * perRequest)
})

const barWidth = computed(() => Math.min(100, Math.round(loadTime.value / 20)))
</script>

<style scoped>
.slice-demo {
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
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.metric .label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.metric .value {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

.bar {
  height: 10px;
  margin-top: 1rem;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #ef4444);
}
</style>
