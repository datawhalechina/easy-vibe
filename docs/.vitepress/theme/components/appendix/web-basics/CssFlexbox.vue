<!--
  CssFlexbox.vue
  Flex 布局速学：三个按钮控制方向/对齐/换行，实时看盒子怎么排
-->
<template>
  <div class="flex-demo">
    <div class="demo-header">
      <span class="icon">📐</span>
      <span class="title">Flex 布局</span>
      <span class="subtitle">一行代码搞定排列对齐（通俗说：自动排版）</span>
    </div>

    <div class="demo-content">
      <div class="controls">
        <div class="control-item">
          <div class="control-header">
            <label>主轴方向 (flex-direction)</label>
          </div>
          <div class="chips">
            <button
              v-for="d in directions"
              :key="d.id"
              :class="['chip', { active: dir === d.id }]"
              @click="dir = d.id"
            >
              {{ d.label }}
            </button>
          </div>
        </div>
        <div class="control-item">
          <div class="control-header">
            <label>主轴对齐 (justify-content)</label>
          </div>
          <div class="chips">
            <button
              v-for="j in justifies"
              :key="j.id"
              :class="['chip', { active: justify === j.id }]"
              @click="justify = j.id"
            >
              {{ j.label }}
            </button>
          </div>
        </div>
        <div class="control-item">
          <div class="control-header">
            <label>是否换行 (flex-wrap)</label>
          </div>
          <div class="chips">
            <button
              v-for="w in wraps"
              :key="w.id"
              :class="['chip', { active: wrap === w.id }]"
              @click="wrap = w.id"
            >
              {{ w.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="canvas-container">
        <div class="canvas" :style="boxStyle">
          <div v-for="n in 6" :key="n" class="item">{{ n }}</div>
        </div>
      </div>

      <div class="code-block">
        <div class="code-title">CSS 代码片段</div>
        <div class="code-content">
          <div class="line">.container {</div>
          <div class="line">display: flex;</div>
          <div class="line">flex-direction: {{ dir }};</div>
          <div class="line">justify-content: {{ justify }};</div>
          <div class="line">flex-wrap: {{ wrap }};</div>
          <div class="line">}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>Flex 让元素自动排列，不用手动计算位置。就像书架上的书，会自动对齐。
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const directions = [
  { id: 'row', label: '水平 (row)' },
  { id: 'column', label: '垂直 (column)' }
]
const justifies = [
  { id: 'flex-start', label: '靠左/上' },
  { id: 'center', label: '居中' },
  { id: 'space-between', label: '两端对齐' }
]
const wraps = [
  { id: 'nowrap', label: '不换行' },
  { id: 'wrap', label: '可换行' }
]

const dir = ref('row')
const justify = ref('flex-start')
const wrap = ref('nowrap')

const boxStyle = computed(() => ({
  display: 'flex',
  flexDirection: dir.value,
  justifyContent: justify.value,
  flexWrap: wrap.value,
  gap: '12px',
  minHeight: '180px',
  padding: '16px'
}))
</script>

<style scoped>
.flex-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.control-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-header label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
}

.chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.chip:hover {
  background: var(--vp-c-bg-soft);
}

.chip.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

.canvas-container {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.25rem;
  margin-bottom: 1rem;
}

.canvas {
  background: var(--vp-c-bg);
  border-radius: 6px;
  background-image: radial-gradient(var(--vp-c-divider) 1px, transparent 1px);
  background-size: 20px 20px;
}

.item {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: #fff;
  font-weight: 700;
  display: grid;
  place-items: center;
  font-size: 16px;
  transition: all 0.3s;
  flex-shrink: 0;
}

.code-block {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.code-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.code-content {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  overflow-x: auto;
  line-height: 1.6;
}

.line {
  white-space: pre;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
