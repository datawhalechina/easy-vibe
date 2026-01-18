<!--
  CssLayoutDemo.vue
  布局演示：Flexbox 核心概念交互
-->
<template>
  <div class="layout-demo">
    <div class="controls">
      <div class="control-group">
        <label>排列方向 (flex-direction)</label>
        <div class="btn-group">
          <button
            v-for="val in ['row', 'column']"
            :key="val"
            :class="{ active: direction === val }"
            @click="direction = val"
          >
            {{ val }}
          </button>
        </div>
      </div>

      <div class="control-group">
        <label>主轴对齐 (justify-content)</label>
        <div class="btn-group">
          <button
            v-for="val in [
              'flex-start',
              'center',
              'space-between',
              'space-around'
            ]"
            :key="val"
            :class="{ active: justify === val }"
            @click="justify = val"
          >
            {{ val }}
          </button>
        </div>
      </div>

      <div class="control-group">
        <label>交叉轴对齐 (align-items)</label>
        <div class="btn-group">
          <button
            v-for="val in ['stretch', 'center', 'flex-start', 'flex-end']"
            :key="val"
            :class="{ active: align === val }"
            @click="align = val"
          >
            {{ val }}
          </button>
        </div>
      </div>

      <div class="control-group">
        <label>换行 (flex-wrap)</label>
        <div class="btn-group">
          <button
            v-for="val in ['nowrap', 'wrap']"
            :key="val"
            :class="{ active: wrap === val }"
            @click="wrap = val"
          >
            {{ val }}
          </button>
        </div>
      </div>
    </div>

    <div class="preview-area">
      <div class="container" :style="containerStyle">
        <div
          v-for="n in itemCount"
          :key="n"
          class="item"
          :style="[itemStyle, getItemColor(n)]"
        >
          {{ n }}
        </div>
      </div>
    </div>

    <div class="code-display">
      <div class="code-header">👆 点击代码行可以暂时禁用该属性</div>
      <pre>.container {
  display: flex;
  <div 
    class="code-line" 
    :class="{ disabled: !activeProps.direction }"
    @click="toggleProp('direction')"
  >flex-direction: <span class="val">{{ direction }}</span>;</div>
  <div 
    class="code-line" 
    :class="{ disabled: !activeProps.justify }"
    @click="toggleProp('justify')"
  >justify-content: <span class="val">{{ justify }}</span>;</div>
  <div 
    class="code-line" 
    :class="{ disabled: !activeProps.align }"
    @click="toggleProp('align')"
  >align-items: <span class="val">{{ align }}</span>;</div>
  <div 
    class="code-line" 
    :class="{ disabled: !activeProps.wrap }"
    @click="toggleProp('wrap')"
  >flex-wrap: <span class="val">{{ wrap }}</span>;</div>
  /* ...其他样式 */
}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const direction = ref('row')
const justify = ref('center')
const align = ref('center')
const wrap = ref('nowrap')

const activeProps = reactive({
  direction: true,
  justify: true,
  align: true,
  wrap: true
})

const toggleProp = (prop) => {
  activeProps[prop] = !activeProps[prop]
}

const containerStyle = computed(() => {
  const style = { display: 'flex' }
  if (activeProps.direction) style.flexDirection = direction.value
  if (activeProps.justify) style.justifyContent = justify.value
  if (activeProps.align) style.alignItems = align.value
  if (activeProps.wrap) style.flexWrap = wrap.value
  return style
})

const itemStyle = computed(() => {
  const style = {}
  // Default fixed size
  style.width = '60px'
  style.height = '60px'

  // Adjust for stretch - use effective align/direction values
  const effectiveAlign = activeProps.align ? align.value : 'stretch'
  const effectiveDirection = activeProps.direction ? direction.value : 'row'

  if (effectiveAlign === 'stretch') {
    if (effectiveDirection === 'row') {
      style.height = 'auto'
    } else {
      style.width = 'auto'
    }
  }
  return style
})

const itemCount = computed(() => (wrap.value === 'wrap' ? 12 : 5))

const colors = [
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#6366f1',
  '#14b8a6',
  '#f97316',
  '#ef4444',
  '#84cc16',
  '#06b6d4',
  '#d946ef'
]

const getItemColor = (n) => {
  return { background: colors[(n - 1) % colors.length] }
}
</script>

<style scoped>
.layout-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.btn-group {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.btn-group button {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-group button:hover {
  border-color: var(--vp-c-brand);
}

.btn-group button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.preview-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  height: 200px;
  margin-bottom: 16px;
  overflow: hidden;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  gap: 10px;
  background-image: radial-gradient(var(--vp-c-divider) 1px, transparent 1px);
  background-size: 10px 10px;
}

.item {
  /* Dimensions handled by inline style */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.code-display {
  background: #1e293b;
  padding: 16px;
  border-radius: 8px;
  color: #e2e8f0;
  font-family: monospace;
  font-size: 13px;
  overflow-x: auto;
}

.code-header {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
  font-style: italic;
}

.code-line {
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s;
  width: fit-content;
}

.code-line:hover {
  background: rgba(255, 255, 255, 0.1);
}

.code-line.disabled {
  opacity: 0.4;
  text-decoration: line-through;
  color: #94a3b8;
}
.code-line.disabled .val {
  color: #94a3b8;
  font-weight: normal;
}

pre {
  margin: 0;
}
.val {
  color: #f472b6;
  font-weight: bold;
}
</style>
