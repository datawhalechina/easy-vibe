<!--
  CssFlexbox.vue
  Flex 速学：三个按钮控制方向/对齐/换行，实时看盒子怎么排。
-->
<template>
  <div class="flex-demo">
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
        <div v-for="n in 8" :key="n" class="item">{{ n }}</div>
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
  minHeight: '200px',
  padding: '16px'
}))
</script>

<style scoped>
.flex-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 24px;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.control-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.control-header label {
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.chip:hover {
  background: var(--vp-c-bg-soft);
}

.chip.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  font-weight: 600;
}

.canvas-container {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 4px; /* Tiny padding for the inner canvas */
}

.canvas {
  background: var(--vp-c-bg);
  border-radius: 8px;
  /* border: 1px dashed var(--vp-c-divider); */
  background-image: radial-gradient(var(--vp-c-divider) 1px, transparent 1px);
  background-size: 20px 20px;
}

.item {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0ea5e9, #10b981);
  color: #fff;
  font-weight: 800;
  display: grid;
  place-items: center;
  font-size: 18px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.val {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 13px;
}

input[type='range'] {
  width: 100%;
  accent-color: var(--vp-c-brand);
  cursor: pointer;
  margin-top: 8px;
}

.code-block {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}

.code-title {
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.code-content {
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  overflow-x: auto;
  line-height: 1.6;
}

.line {
  white-space: pre;
}
</style>
