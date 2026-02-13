<!--
  VirtualScrollingDemo.vue
  虚拟滚动演示
-->
<script setup>
import { ref, computed } from 'vue'

const TOTAL_ITEMS = 10000
const ITEM_HEIGHT = 50
const CONTAINER_HEIGHT = 280

// Generate mock data
const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  content: `Item #${i + 1} - 虚拟滚动列表项内容`
}))

const scrollTop = ref(0)
const containerRef = ref(null)

// Virtual scrolling calculations
const startIndex = computed(() => Math.floor(scrollTop.value / ITEM_HEIGHT))
const endIndex = computed(() =>
  Math.min(
    TOTAL_ITEMS,
    startIndex.value + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT) + 2
  )
)
const visibleItems = computed(() => {
  return items.slice(startIndex.value, endIndex.value).map((item) => ({
    ...item,
    top: item.id * ITEM_HEIGHT
  }))
})

const totalHeight = TOTAL_ITEMS * ITEM_HEIGHT

const onScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}

// Stats
const renderedCount = computed(() => visibleItems.value.length)
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="icon">📜</span>
      <span class="title">虚拟滚动</span>
      <span class="subtitle">只渲染可见区域的列表项</span>
    </div>

    <div class="controls">
      <div class="stat-box">
        <div class="stat-label">总数据量</div>
        <div class="stat-value">{{ TOTAL_ITEMS.toLocaleString() }}</div>
      </div>
      <div class="stat-box highlight">
        <div class="stat-label">实际渲染</div>
        <div class="stat-value">{{ renderedCount }}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">节省内存</div>
        <div class="stat-value">
          ~{{ ((1 - renderedCount / TOTAL_ITEMS) * 100).toFixed(1) }}%
        </div>
      </div>
    </div>

    <div
      class="scroll-container"
      ref="containerRef"
      @scroll="onScroll"
      :style="{ height: CONTAINER_HEIGHT + 'px' }"
    >
      <div class="scroll-phantom" :style="{ height: totalHeight + 'px' }"></div>
      <div class="visible-list">
        <div
          v-for="item in visibleItems"
          :key="item.id"
          class="list-item"
          :style="{
            transform: `translateY(${item.top}px)`,
            height: ITEM_HEIGHT + 'px'
          }"
        >
          <span class="item-index">{{ item.id + 1 }}</span>
          <span class="item-content">{{ item.content }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>工作原理：</strong>不渲染全部 {{ TOTAL_ITEMS }} 项，只渲染视口中可见的项（加上少量缓冲）。滚动时计算应该显示哪些项，并使用绝对定位创建完整列表的错觉。性能从 O(n) 优化到 O(1)。
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.stat-box {
  background: var(--vp-c-bg);
  padding: 0.6rem;
  border-radius: 6px;
  flex: 1;
  min-width: 100px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-box.highlight {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.scroll-container {
  overflow-y: auto;
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.scroll-phantom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.visible-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
}

.list-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  box-sizing: border-box;
  background: var(--vp-c-bg);
}

.item-index {
  font-weight: bold;
  color: var(--vp-c-brand);
  width: 50px;
  flex-shrink: 0;
  font-size: 0.85rem;
}

.item-content {
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.85rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }
</style>
