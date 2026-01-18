<!--
  ResponsiveGridDemo.vue
  响应式布局断点演示
-->
<template>
  <div class="responsive-demo">
    <div class="header">
      <div class="title">响应式布局：一套代码，多种屏幕</div>
      <div class="subtitle">拖动宽度，观察列数变化</div>
    </div>

    <div class="controls">
      <label>
        视口宽度：<strong>{{ viewportWidth }}</strong> px
      </label>
      <input
        v-model="viewportWidth"
        type="range"
        min="320"
        max="1200"
        step="10"
      />
    </div>

    <div class="preview" :style="{ width: viewportWidth + 'px' }">
      <div class="grid" :style="gridStyle">
        <div v-for="n in 6" :key="n" class="card">Card {{ n }}</div>
      </div>
    </div>

    <div class="note">
      当前列数：<strong>{{ columns }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewportWidth = ref(860)

const columns = computed(() => {
  if (viewportWidth.value < 640) return 1
  if (viewportWidth.value < 900) return 2
  return 3
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`
}))
</script>

<style scoped>
.responsive-demo {
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
}

.preview {
  border: 1px dashed var(--vp-c-divider);
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 10px;
  background: var(--vp-c-bg);
  overflow: hidden;
  max-width: 100%;
}

.grid {
  display: grid;
  gap: 0.6rem;
}

.card {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.9rem;
  text-align: center;
}

.note {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style>
