<template>
  <div class="flex-demo">
    <div class="demo-header">
      <span class="icon">📐</span>
      <span class="title">Flex 布局</span>
      <span class="subtitle">一行代码搞定排列对齐</span>
    </div>

    <div class="main-area">
      <div class="controls">
        <div class="control-group">
          <label>方向</label>
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
        <div class="control-group">
          <label>对齐</label>
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
        <div class="control-group">
          <label>换行</label>
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

      <div class="preview-area">
        <div class="canvas" :style="boxStyle">
          <div v-for="n in 4" :key="n" class="item">{{ n }}</div>
        </div>
      </div>
    </div>

    <div class="code-row">
      <div class="code-label">CSS：</div>
      <code class="code-text">display: flex; flex-direction: {{ dir }}; justify-content: {{ justify }}; flex-wrap: {{ wrap }};</code>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>Flex 让元素自动排列，就像书架上的书会自动对齐一样。
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const directions = [
  { id: 'row', label: '水平' },
  { id: 'column', label: '垂直' }
]
const justifies = [
  { id: 'flex-start', label: '靠左' },
  { id: 'center', label: '居中' },
  { id: 'space-between', label: '两端' }
]
const wraps = [
  { id: 'nowrap', label: '不换行' },
  { id: 'wrap', label: '换行' }
]

const dir = ref('row')
const justify = ref('flex-start')
const wrap = ref('nowrap')

const boxStyle = computed(() => ({
  display: 'flex',
  flexDirection: dir.value,
  justifyContent: justify.value,
  flexWrap: wrap.value,
  gap: '8px',
  minHeight: dir.value === 'column' ? '140px' : '60px',
  padding: '12px'
}))
</script>

<style scoped>
.flex-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.main-area {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.control-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.chips {
  display: flex;
  gap: 0.25rem;
}

.chip {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.chip:hover { background: var(--vp-c-bg-soft); }
.chip.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.preview-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.canvas {
  background-image: radial-gradient(var(--vp-c-divider) 1px, transparent 1px);
  background-size: 16px 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.item {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: #fff;
  font-weight: 700;
  display: grid;
  place-items: center;
  font-size: 14px;
  flex-shrink: 0;
}

.code-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.code-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.code-text {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
