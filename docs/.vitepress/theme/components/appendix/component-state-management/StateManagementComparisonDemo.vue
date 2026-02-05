<template>
  <div class="state-management-comparison">
    <div class="demo-header">
      <h4>状态管理库全景对比</h4>
      <p class="hint">全面对比主流状态管理方案的特性、适用场景和学习曲线</p>
    </div>

    <!-- 简化版对比表格 -->
    <div class="comparison-table-wrapper">
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="feature-col">特性</th>
            <th v-for="lib in libraries" :key="lib.id" class="lib-col">
              <div class="lib-header">
                <span class="lib-icon">{{ lib.icon }}</span>
                <span class="lib-name">{{ lib.name }}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="feature-name">学习曲线</td>
            <td v-for="lib in libraries" :key="lib.id" class="feature-value">
              <div class="curve-bar">
                <div class="curve-fill" :style="{ width: lib.learningCurve + '%', background: getCurveColor(lib.learningCurve) }"></div>
              </div>
              <span class="curve-label">{{ getCurveLabel(lib.learningCurve) }}</span>
            </td>
          </tr>
          <tr>
            <td class="feature-name">包大小</td>
            <td v-for="lib in libraries" :key="lib.id" class="feature-value">
              <span class="size-badge" :class="getSizeClass(lib.bundleSize)">{{ lib.bundleSize }}</span>
            </td>
          </tr>
          <tr>
            <td class="feature-name">TypeScript</td>
            <td v-for="lib in libraries" :key="lib.id" class="feature-value">
              <span class="boolean-badge" :class="{ yes: lib.typescript, no: !lib.typescript }">
                {{ lib.typescript ? '✓' : '✗' }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="feature-name">开发工具</td>
            <td v-for="lib in libraries" :key="lib.id" class="feature-value">
              <span class="boolean-badge" :class="{ yes: lib.devtools, no: !lib.devtools }">
                {{ lib.devtools ? '✓' : '✗' }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="feature-name">SSR 支持</td>
            <td v-for="lib in libraries" :key="lib.id" class="feature-value">
              <span class="boolean-badge" :class="{ yes: lib.ssr, no: !lib.ssr }">
                {{ lib.ssr ? '✓' : '✗' }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="feature-name">适用框架</td>
            <td v-for="lib in libraries" :key="lib.id" class="feature-value">
              <span class="text-value">{{ lib.framework }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 选中库的详细信息 -->
    <div v-if="selectedLibrary" class="library-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ selectedLibrary.icon }}</span>
        <div class="detail-title">
          <h5>{{ selectedLibrary.name }}</h5>
          <span class="detail-tagline">{{ selectedLibrary.tagline }}</span>
        </div>
        <a :href="selectedLibrary.docsUrl" target="_blank" class="docs-link">
          官方文档 ↗
        </a>
      </div>

      <div class="detail-grid">
        <div class="detail-section">
          <h6>🎯 适用场景</h6>
          <ul>
            <li v-for="(scenario, index) in selectedLibrary.scenarios" :key="index">{{ scenario }}</li>
          </ul>
        </div>

        <div class="detail-section">
          <h6>✅ 优势</h6>
          <ul class="advantages">
            <li v-for="(pro, index) in selectedLibrary.pros" :key="index">{{ pro }}</li>
          </ul>
        </div>

        <div class="detail-section">
          <h6>❌ 劣势</h6>
          <ul class="disadvantages">
            <li v-for="(con, index) in selectedLibrary.cons" :key="index">{{ con }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 决策流程图 -->
    <div class="decision-flow">
      <h5>🤔 如何选择？</h5>
      <div class="flow-chart">
        <div class="flow-node start">开始</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-node question">需要跨框架支持？</div>
        <div class="flow-arrow">↓ 是</div>
        <div class="flow-node result">考虑 Pinia / Vuex</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const libraries = [
  {
    id: 'redux',
    name: 'Redux',
    icon: '🔄',
    tagline: 'JavaScript 应用的可预测状态容器',
    docsUrl: 'https://redux.js.org/',
    scenarios: ['大型企业级应用', '需要严格数据流控制', '复杂的状态逻辑'],
    pros: ['严格的数据流，易于调试', '强大的中间件生态', '时间旅行调试', '可预测的状态更新'],
    cons: ['学习曲线陡峭', '样板代码较多', '小型项目可能过于复杂'],
    codeExample: '// Redux 示例代码',
    learningCurve: 80,
    bundleSize: '7KB',
    typescript: true,
    devtools: true,
    ssr: true,
    framework: 'React/Vue/Angular'
  },
  {
    id: 'vuex',
    name: 'Vuex',
    icon: '🌿',
    tagline: 'Vue.js 的官方状态管理库',
    docsUrl: 'https://vuex.vuejs.org/',
    scenarios: ['Vue 2/3 中大型项目', '需要模块化管理状态', '团队成员熟悉 Vue 生态'],
    pros: ['与 Vue 深度集成', '响应式系统', '模块化管理', '优秀的开发工具'],
    cons: ['仅适用于 Vue', 'Vue 3 中被 Pinia 取代', '相对冗余的 API'],
    codeExample: '// Vuex 示例代码',
    learningCurve: 60,
    bundleSize: '4KB',
    typescript: true,
    devtools: true,
    ssr: true,
    framework: 'Vue Only'
  },
  {
    id: 'pinia',
    name: 'Pinia',
    icon: '🍍',
    tagline: '直观、类型安全、灵活的 Vue Store',
    docsUrl: 'https://pinia.vuejs.org/',
    scenarios: ['Vue 3 新项目首选', '重视 TypeScript 支持', '希望简化状态管理'],
    pros: ['轻量级设计', '原生 TypeScript 支持', '组合式 API 风格', '代码更简洁'],
    cons: ['Vue 3 专属', '生态系统相对年轻', '大型项目需自定义规范'],
    codeExample: '// Pinia 示例代码',
    learningCurve: 30,
    bundleSize: '2KB',
    typescript: true,
    devtools: true,
    ssr: true,
    framework: 'Vue 3 Only'
  }
]

const features = [
  { key: 'learningCurve', label: '学习曲线', icon: '📈' },
  { key: 'bundleSize', label: '包大小', icon: '📦' },
  { key: 'typescript', label: 'TypeScript', icon: '🔷' },
  { key: 'devtools', label: '开发工具', icon: '🛠️' },
  { key: 'ssr', label: 'SSR 支持', icon: '🚀' },
  { key: 'framework', label: '适用框架', icon: '🔧' }
]

const selectedLib = ref(null)

const selectedLibrary = computed(() => {
  if (!selectedLib.value) return null
  return libraries.find(lib => lib.id === selectedLib.value)
})

function selectLib(id) {
  selectedLib.value = id
}

function getValue(lib, key) {
  return lib[key]
}

function getCurveColor(value) {
  if (value <= 30) return '#22c55e'
  if (value <= 60) return '#f59e0b'
  return '#ef4444'
}

function getCurveLabel(value) {
  if (value <= 30) return '简单'
  if (value <= 60) return '中等'
  return '陡峭'
}

function getSizeClass(size) {
  const num = parseInt(size)
  if (num <= 2) return 'small'
  if (num <= 5) return 'medium'
  return 'large'
}
</script>

<style scoped>
.state-management-comparison {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.demo-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.demo-header h4 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.comparison-table-wrapper {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.comparison-table th {
  background: var(--vp-c-bg);
  font-weight: 600;
}

.feature-col {
  width: 120px;
  background: var(--vp-c-bg-soft);
}

.lib-col {
  min-width: 120px;
  cursor: pointer;
  transition: background 0.2s;
}

.lib-col:hover,
.lib-col.selected {
  background: rgba(102, 126, 234, 0.1);
}

.lib-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lib-icon {
  font-size: 1.2rem;
}

.lib-name {
  font-weight: 500;
}

.feature-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.feature-value {
  text-align: center;
}

.curve-bar {
  width: 100%;
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.curve-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}

.curve-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.size-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.size-badge.small {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.size-badge.medium {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.size-badge.large {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.boolean-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
}

.boolean-badge.yes {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.boolean-badge.no {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.text-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.library-detail {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 2rem;
}

.detail-title {
  flex: 1;
}

.detail-title h5 {
  margin: 0 0 0.25rem;
  font-size: 1.2rem;
}

.detail-tagline {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.docs-link {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}

.docs-link:hover {
  opacity: 0.9;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-section {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.detail-section h6 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-section ul {
  margin: 0;
  padding-left: 1.2rem;
}

.detail-section li {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.code-block {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: var(--vp-c-text-1);
}

.decision-flow {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.decision-flow h5 {
  margin: 0 0 1rem;
  text-align: center;
  font-size: 1.1rem;
}

.flow-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.flow-node {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
}

.flow-node.start {
  background: var(--vp-c-brand);
  color: white;
}

.flow-node.question {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
}

.flow-node.result {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 2px solid #22c55e;
}

.flow-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .comparison-table {
    font-size: 0.8rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }

  .lib-icon {
    font-size: 1rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>