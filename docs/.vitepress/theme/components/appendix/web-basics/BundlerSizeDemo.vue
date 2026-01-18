<!--
  BundlerSizeDemo.vue
  打包体积与构建时间演示
-->
<template>
  <div class="bundler-demo">
    <div class="header">
      <div class="title">工程化：打包体积与构建时间</div>
      <div class="subtitle">勾选功能，观察体积变化</div>
    </div>

    <div class="options">
      <label v-for="item in features" :key="item.key" class="option">
        <input type="checkbox" v-model="item.enabled" />
        {{ item.label }} (+{{ item.size }} KB)
      </label>
    </div>

    <label class="toggle">
      <input type="checkbox" v-model="treeShaking" />
      开启 Tree Shaking (移除未使用代码)
    </label>

    <div class="stats">
      <div class="stat-card">
        <div class="label">Bundle Size</div>
        <div class="value">{{ bundleSize }} KB</div>
      </div>
      <div class="stat-card">
        <div class="label">Build Time</div>
        <div class="value">{{ buildTime }} s</div>
      </div>
    </div>

    <div class="bar">
      <div class="progress" :style="{ width: barWidth + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const features = ref([
  { key: 'chart', label: '图表库', size: 180, enabled: true },
  { key: 'editor', label: '富文本编辑器', size: 220, enabled: false },
  { key: 'i18n', label: '国际化', size: 60, enabled: true },
  { key: 'analytics', label: '埋点分析', size: 80, enabled: false }
])

const treeShaking = ref(true)

const rawSize = computed(() =>
  features.value.reduce(
    (sum, item) => (item.enabled ? sum + item.size : sum),
    120
  )
)

const bundleSize = computed(() => {
  const size = treeShaking.value ? rawSize.value * 0.82 : rawSize.value
  return Math.round(size)
})

const buildTime = computed(() => Math.round(bundleSize.value / 90))
const barWidth = computed(() => Math.min(100, Math.round(bundleSize.value / 6)))
</script>

<style scoped>
.bundler-demo {
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.option {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.toggle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 0.75rem;
}

.stat-card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.8rem;
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.value {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

.bar {
  margin-top: 0.75rem;
  height: 10px;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}
</style>
