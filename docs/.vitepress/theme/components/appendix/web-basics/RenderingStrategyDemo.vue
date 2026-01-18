<!--
  RenderingStrategyDemo.vue
  CSR / SSR / SSG 对比演示
-->
<template>
  <div class="render-demo">
    <div class="header">
      <div class="title">渲染策略：CSR / SSR / SSG</div>
      <div class="subtitle">选择策略，观察首屏表现</div>
    </div>

    <div class="options">
      <button
        v-for="item in strategies"
        :key="item.key"
        class="option"
        :class="{ active: current === item.key }"
        @click="current = item.key"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="cards">
      <div class="card">
        <div class="label">TTFB</div>
        <div class="value">{{ metrics.ttfb }} ms</div>
      </div>
      <div class="card">
        <div class="label">可交互时间</div>
        <div class="value">{{ metrics.tti }} ms</div>
      </div>
      <div class="card">
        <div class="label">SEO 友好</div>
        <div class="value">{{ metrics.seo }}</div>
      </div>
    </div>

    <div class="hint">{{ metrics.note }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const strategies = [
  { key: 'csr', label: 'CSR' },
  { key: 'ssr', label: 'SSR' },
  { key: 'ssg', label: 'SSG' }
]

const current = ref('csr')

const metrics = computed(() => {
  if (current.value === 'csr') {
    return { ttfb: 450, tti: 1600, seo: '一般', note: 'JS 拉取完成后才渲染' }
  }
  if (current.value === 'ssr') {
    return {
      ttfb: 220,
      tti: 1100,
      seo: '好',
      note: '首屏更快，但服务器压力更大'
    }
  }
  return { ttfb: 120, tti: 700, seo: '很好', note: '静态预渲染，适合内容站点' }
})
</script>

<style scoped>
.render-demo {
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

.options {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.option {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.option.active {
  border-color: #22c55e;
  color: #15803d;
  background: rgba(34, 197, 94, 0.12);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}

.card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

.hint {
  margin-top: 0.8rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
