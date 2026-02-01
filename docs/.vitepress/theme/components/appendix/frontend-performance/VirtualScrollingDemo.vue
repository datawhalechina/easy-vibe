<script setup>
import { ref, computed, onMounted } from 'vue'

const TOTAL_ITEMS = 10000
const ITEM_HEIGHT = 50
const CONTAINER_HEIGHT = 400

// Generate mock data
const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  content: `Item #${i + 1} - This is a long list item content to simulate real data.`
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
    <div class="controls">
      <div class="stat-box">
        <div class="stat-label">Total Items</div>
        <div class="stat-value">{{ TOTAL_ITEMS.toLocaleString() }}</div>
      </div>
      <div class="stat-box highlight">
        <div class="stat-label">Rendered DOM Nodes</div>
        <div class="stat-value">{{ renderedCount }}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Memory Saved</div>
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

    <div class="explanation">
      <p>
        <strong>How it works:</strong> Instead of rendering all
        {{ TOTAL_ITEMS }} items at once, we only render the items currently
        visible in the viewport (plus a small buffer). As you scroll, we
        calculate which items should be visible and position them absolutely to
        create the illusion of a full list.
      </p>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
}

.controls {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.stat-box {
  background-color: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
  flex: 1;
  min-width: 120px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-box.highlight {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-dimm);
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.scroll-container {
  overflow-y: auto;
  position: relative;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
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
  pointer-events: none; /* Let scroll events pass through to container */
}

.list-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  box-sizing: border-box;
  background-color: var(--vp-c-bg); /* Ensure background covers phantom */
}

.item-index {
  font-weight: bold;
  color: var(--vp-c-brand);
  width: 50px;
  flex-shrink: 0;
}

.item-content {
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.explanation {
  margin-top: 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
