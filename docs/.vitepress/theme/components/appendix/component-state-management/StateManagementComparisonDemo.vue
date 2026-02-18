<template>
  <div class="state-management-comparison">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">状态管理方案对比</span>
      <span class="subtitle">不同工具的适用场景</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">超市</span>采购：小买小卖用购物篮（Zustand），大采购用手推车（Pinia），企业级采购用专业物流（Redux）。根据需求选对工具！
    </div>

    <div class="demo-content">
      <div class="comparison-table">
        <div class="table-header">
          <div class="header-col first">
            工具
          </div>
          <div class="header-col">
            难度
          </div>
          <div class="header-col">
            大小
          </div>
          <div class="header-col">
            框架
          </div>
        </div>
        <div class="table-body">
          <div
            v-for="lib in libraries"
            :key="lib.id"
            class="table-row"
            :class="{ selected: selectedLib === lib.id }"
            @click="selectedLib = lib.id"
          >
            <div class="row-col first">
              <span class="lib-icon">{{ lib.icon }}</span>
              <span class="lib-name">{{ lib.name }}</span>
            </div>
            <div class="row-col">
              <div class="curve-bar">
                <div
                  class="curve-fill"
                  :style="{ width: lib.learningCurve + '%', background: getCurveColor(lib.learningCurve) }"
                />
              </div>
              <span class="curve-label">{{ getCurveLabel(lib.learningCurve) }}</span>
            </div>
            <div class="row-col">
              <span
                class="size-badge"
                :class="getSizeClass(lib.bundleSize)"
              >{{ lib.bundleSize }}</span>
            </div>
            <div class="row-col">
              <span class="framework-text">{{ lib.framework }}</span>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="selectedLibrary"
          class="library-detail"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ selectedLibrary.icon }}</span>
            <div class="detail-title">
              <h5>{{ selectedLibrary.name }}</h5>
              <p class="tagline">
                {{ selectedLibrary.tagline }}
              </p>
            </div>
          </div>

          <div class="detail-grid">
            <div class="detail-section compact">
              <div class="section-title">
                🎯 适用场景
              </div>
              <div class="section-content">
                {{ selectedLibrary.scenarios.join('、') }}
              </div>
            </div>

            <div class="detail-section compact">
              <div class="section-title green">
                ✅ 优点
              </div>
              <div class="section-content">
                {{ selectedLibrary.pros.slice(0, 2).join('；') }}
              </div>
            </div>

            <div class="detail-section compact">
              <div class="section-title red">
                ❌ 缺点
              </div>
              <div class="section-content">
                {{ selectedLibrary.cons.slice(0, 2).join('；') }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>选择建议：</strong>Vue 3 新项目推荐 Pinia，React 中小型项目推荐 Zustand，大型企业级应用推荐 Redux Toolkit。根据项目规模选择最合适的工具。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedLib = ref('pinia')

const libraries = [
  {
    id: 'redux',
    name: 'Redux',
    icon: '🔄',
    tagline: 'JavaScript 应用的可预测状态容器',
    scenarios: ['大型企业级应用', '需要严格数据流控制', '复杂的状态逻辑'],
    pros: ['严格的数据流，易于调试', '强大的中间件生态'],
    cons: ['学习曲线陡峭', '样板代码较多'],
    learningCurve: 80,
    bundleSize: '7KB',
    framework: 'React/Vue/Angular'
  },
  {
    id: 'vuex',
    name: 'Vuex',
    icon: '🌿',
    tagline: 'Vue.js 的官方状态管理库',
    scenarios: ['Vue 2/3 中大型项目', '需要模块化管理状态', '团队成员熟悉 Vue 生态'],
    pros: ['与 Vue 深度集成', '响应式系统'],
    cons: ['仅适用于 Vue', 'Vue 3 中被 Pinia 取代'],
    learningCurve: 60,
    bundleSize: '4KB',
    framework: 'Vue Only'
  },
  {
    id: 'pinia',
    name: 'Pinia',
    icon: '🍍',
    tagline: '直观、类型安全、灵活的 Vue Store',
    scenarios: ['Vue 3 新项目首选', '重视 TypeScript 支持', '希望简化状态管理'],
    pros: ['轻量级设计', '原生 TypeScript 支持'],
    cons: ['Vue 3 专属', '生态系统相对年轻'],
    learningCurve: 30,
    bundleSize: '2KB',
    framework: 'Vue 3 Only'
  },
  {
    id: 'zustand',
    name: 'Zustand',
    icon: '🐻',
    tagline: '极简的 React 状态管理',
    scenarios: ['React 中小型项目', '追求简洁 API', '不需要复杂中间件'],
    pros: ['极简 API', '无需 Provider'],
    cons: ['生态相对较小', '调试工具不如 Redux'],
    learningCurve: 25,
    bundleSize: '1KB',
    framework: 'React Only'
  }
]

const selectedLibrary = computed(() => {
  return libraries.find(lib => lib.id === selectedLib.value)
})

function getCurveColor(value) {
  if (value <= 30) return 'var(--vp-c-brand-1)'
  if (value <= 60) return 'var(--vp-c-warning-1)'
  return 'var(--vp-c-danger-1)'
}

function getCurveLabel(value) {
  if (value <= 30) return '简单'
  if (value <= 60) return '中等'
  return '复杂'
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

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 1rem;
}

.comparison-table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.table-header {
  display: grid;
  grid-template-columns: 1.8fr 1.2fr 0.8fr 1.2fr;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-col {
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  font-size: 0.8rem;
  border-right: 1px solid var(--vp-c-divider);
}

.header-col:last-child {
  border-right: none;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 1.8fr 1.2fr 0.8fr 1.2fr;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--vp-c-bg-soft);
}

.table-row.selected {
  background: var(--vp-c-brand-soft);
}

.row-col {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.row-col:last-child {
  border-right: none;
}

.row-col.first {
  font-weight: 500;
}

.lib-icon {
  font-size: 1rem;
}

.lib-name {
  color: var(--vp-c-text-1);
}

.curve-bar {
  flex: 1;
  height: 5px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
  min-width: 50px;
}

.curve-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}

.curve-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.size-badge {
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.75rem;
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

.framework-text {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.library-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title h5 {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}

.tagline {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.detail-section.compact {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
}

.section-title.green {
  color: #22c55e;
}

.section-title.red {
  color: #ef4444;
}

.section-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1.5fr 1fr 0.7fr 1fr;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
