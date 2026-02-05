<!--
  TreeShakingDemo.vue
  摇树优化演示

  用途：
  直观展示 Tree Shaking 如何移除未使用的代码。

  交互功能：
  - 代码选择：选择使用哪些导出
  - 实时计算：显示包体积变化
  - 对比视图：对比 Tree Shaking 前后
-->
<template>
  <div class="tree-shaking-demo">
    <div class="demo-header">
      <h3>🌳 Tree Shaking 演示</h3>
      <p>选择你需要的功能，观察包体积变化</p>
    </div>

    <div class="demo-content">
      <!-- 源代码面板 -->
      <div class="source-panel">
        <div class="panel-title">📦 utils.js (源代码)</div>
        <div class="code-block">
          <div
            v-for="(func, index) in functions"
            :key="index"
            class="code-line"
            :class="{ used: func.used, unused: !func.used && hasSelection }"
          >
            <span class="line-number">{{ index + 1 }}</span>
            <span class="line-content">{{ func.code }}</span>
          </div>
        </div>
      </div>

      <!-- 控制面板 -->
      <div class="control-panel">
        <div class="panel-title">🎛️ 选择需要的功能</div>
        <div class="function-toggles">
          <label
            v-for="(func, index) in functions"
            :key="index"
            class="toggle-item"
            :class="{ active: func.used }"
          >
            <input type="checkbox" v-model="func.used" />
            <span class="toggle-name">{{ func.name }}</span>
            <span class="toggle-size">{{ func.size }}B</span>
          </label>
        </div>

        <div class="stats-box">
          <div class="stat-item">
            <span class="stat-label">原始大小</span>
            <span class="stat-value original">{{ originalSize }}B</span>
          </div>
          <div class="stat-arrow">→</div>
          <div class="stat-item">
            <span class="stat-label">Tree Shaking 后</span>
            <span class="stat-value optimized">{{ optimizedSize }}B</span>
          </div>
          <div class="stat-item savings">
            <span class="stat-label">节省</span>
            <span class="stat-value">{{ savingsPercent }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Tree Shaking 原理：</strong>
        现代打包工具会分析 ES 模块的导出/导入关系，自动移除未被使用的代码。
        前提条件：1) 使用 ES 模块 (import/export)；2) 代码无副作用；3) 打包工具支持（Webpack、Rollup 等）
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const functions = ref([
  {
    name: 'debounce',
    code: 'export function debounce(fn, delay) { ... }',
    size: 156,
    used: true
  },
  {
    name: 'throttle',
    code: 'export function throttle(fn, limit) { ... }',
    size: 142,
    used: false
  },
  {
    name: 'deepClone',
    code: 'export function deepClone(obj) { ... }',
    size: 234,
    used: true
  },
  {
    name: 'formatDate',
    code: 'export function formatDate(date, fmt) { ... }',
    size: 189,
    used: false
  },
  {
    name: 'randomString',
    code: 'export function randomString(len) { ... }',
    size: 98,
    used: false
  }
])

const originalSize = computed(() =>
  functions.value.reduce((sum, f) => sum + f.size, 0)
)

const optimizedSize = computed(() =>
  functions.value.filter(f => f.used).reduce((sum, f) => sum + f.size, 0)
)

const savingsPercent = computed(() => {
  const saved = originalSize.value - optimizedSize.value
  return Math.round((saved / originalSize.value) * 100)
})

const hasSelection = computed(() =>
  functions.value.some(f => f.used)
)

const getFileIcon = (type) => {
  const icons = { js: '📜', css: '🎨', image: '🖼️', html: '📄' }
  return icons[type] || '📄'
}

const formatSize = (size) => size > 1024 ? (size / 1024).toFixed(1) + ' MB' : size + ' KB'
const formatTime = (timestamp) => new Date(timestamp).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

const selectedNode = ref(null)
const selectedFile = computed(() => selectedNode.value)
const cacheHits = ref(42)
const cacheMisses = ref(8)
</script>

<style scoped>
.tree-shaking-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
}

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }
}

.source-panel,
.control-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.panel-title {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-block {
  padding: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-line {
  display: flex;
  gap: 0.5rem;
  padding: 0.1rem 0;
  border-radius: 3px;
  transition: all 0.2s;
}

.code-line:hover {
  background: var(--vp-c-bg-soft);
}

.code-line.used {
  background: rgba(34, 197, 94, 0.1);
}

.code-line.unused {
  opacity: 0.4;
  text-decoration: line-through;
}

.line-number {
  color: var(--vp-c-text-3);
  min-width: 20px;
  text-align: right;
  user-select: none;
}

.line-content {
  color: var(--vp-c-text-1);
  white-space: pre;
}

.function-toggles {
  padding: 0.75rem;
}

.toggle-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.25rem;
}

.toggle-item:hover {
  background: var(--vp-c-bg-soft);
}

.toggle-item.active {
  background: rgba(34, 197, 94, 0.1);
}

.toggle-item input {
  cursor: pointer;
}

.toggle-name {
  flex: 1;
  font-size: 0.85rem;
}

.toggle-size {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.stats-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  margin: 0 0.75rem 0.75rem;
  border-radius: 6px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.stat-value.original {
  color: var(--vp-c-text-2);
  text-decoration: line-through;
}

.stat-value.optimized {
  color: #22c55e;
}

.stat-item.savings .stat-value {
  color: var(--vp-c-brand);
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}
</style>
