<!--
  PerformanceMetricsDemo.vue
  Core Web Vitals 性能指标演示
-->
<template>
  <div class="metrics-demo">
    <div class="header">
      <div class="title">Core Web Vitals 核心性能指标</div>
      <div class="subtitle">调整页面加载时间，观察各项指标变化</div>
    </div>

    <div class="simulation-controls">
      <label>
        模拟加载时间：<strong>{{ loadTime }}</strong> 秒
      </label>
      <input
        v-model.number="loadTime"
        type="range"
        min="0.5"
        max="5"
        step="0.1"
      />
      <button @click="startLoading" :disabled="isLoading">
        {{ isLoading ? '加载中...' : '模拟加载' }}
      </button>
    </div>

    <div class="metrics-grid">
      <div class="metric-card" :class="fcpStatus.class">
        <div class="metric-header">
          <div class="metric-name">FCP</div>
          <div class="metric-full">First Contentful Paint</div>
        </div>
        <div class="metric-value">{{ fcp }} s</div>
        <div class="metric-desc">首次内容绘制</div>
        <div class="metric-status">{{ fcpStatus.text }}</div>
        <div class="indicator" :class="fcpStatus.class"></div>
      </div>

      <div class="metric-card" :class="lcpStatus.class">
        <div class="metric-header">
          <div class="metric-name">LCP</div>
          <div class="metric-full">Largest Contentful Paint</div>
        </div>
        <div class="metric-value">{{ lcp }} s</div>
        <div class="metric-desc">最大内容绘制</div>
        <div class="metric-status">{{ lcpStatus.text }}</div>
        <div class="indicator" :class="lcpStatus.class"></div>
      </div>

      <div class="metric-card" :class="fidStatus.class">
        <div class="metric-header">
          <div class="metric-name">FID</div>
          <div class="metric-full">First Input Delay</div>
        </div>
        <div class="metric-value">{{ fid }} ms</div>
        <div class="metric-desc">首次输入延迟</div>
        <div class="metric-status">{{ fidStatus.text }}</div>
        <div class="indicator" :class="fidStatus.class"></div>
      </div>

      <div class="metric-card" :class="clsStatus.class">
        <div class="metric-header">
          <div class="metric-name">CLS</div>
          <div class="metric-full">Cumulative Layout Shift</div>
        </div>
        <div class="metric-value">{{ cls }}</div>
        <div class="metric-desc">累积布局偏移</div>
        <div class="metric-status">{{ clsStatus.text }}</div>
        <div class="indicator" :class="clsStatus.class"></div>
      </div>
    </div>

    <div class="explanation">
      <div class="section">
        <h4>指标说明</h4>
        <ul>
          <li>
            <strong>FCP</strong
            >：浏览器首次绘制内容的时间（用户第一次看到页面有内容）
          </li>
          <li><strong>LCP</strong>：最大内容绘制完成的时间（主要内容可见）</li>
          <li>
            <strong>FID</strong
            >：用户首次交互到浏览器响应的时间（页面是否可交互）
          </li>
          <li>
            <strong>CLS</strong
            >：页面布局在加载过程中的稳定性（是否发生意外跳动）
          </li>
        </ul>
      </div>

      <div class="section">
        <h4>评分标准</h4>
        <div class="standards">
          <div class="standard-item">
            <span class="color-box good"></span>
            <span>良好 (Good)</span>
          </div>
          <div class="standard-item">
            <span class="color-box needs-improvement"></span>
            <span>需改进 (Needs Improvement)</span>
          </div>
          <div class="standard-item">
            <span class="color-box poor"></span>
            <span>差 (Poor)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const loadTime = ref(2.5)
const isLoading = ref(false)

const fcp = computed(() => (loadTime.value * 0.3).toFixed(1))
const lcp = computed(() => (loadTime.value * 0.7).toFixed(1))
const fid = computed(() => Math.round(loadTime.value * 80))
const cls = computed(() =>
  loadTime.value > 3 ? '0.25' : loadTime.value > 2 ? '0.15' : '0.05'
)

const fcpStatus = computed(() => {
  const value = parseFloat(fcp.value)
  if (value <= 1.8) return { class: 'good', text: '良好' }
  if (value <= 3) return { class: 'needs-improvement', text: '需改进' }
  return { class: 'poor', text: '差' }
})

const lcpStatus = computed(() => {
  const value = parseFloat(lcp.value)
  if (value <= 2.5) return { class: 'good', text: '良好' }
  if (value <= 4) return { class: 'needs-improvement', text: '需改进' }
  return { class: 'poor', text: '差' }
})

const fidStatus = computed(() => {
  const value = fid.value
  if (value <= 100) return { class: 'good', text: '良好' }
  if (value <= 300) return { class: 'needs-improvement', text: '需改进' }
  return { class: 'poor', text: '差' }
})

const clsStatus = computed(() => {
  const value = parseFloat(cls.value)
  if (value <= 0.1) return { class: 'good', text: '良好' }
  if (value <= 0.25) return { class: 'needs-improvement', text: '需改进' }
  return { class: 'poor', text: '差' }
})

function startLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, loadTime.value * 1000)
}
</script>

<style scoped>
.metrics-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.simulation-controls {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.simulation-controls label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.simulation-controls input[type='range'] {
  width: calc(100% - 120px);
  margin-right: 1rem;
  vertical-align: middle;
}

.simulation-controls button {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.simulation-controls button:hover:not(:disabled) {
  opacity: 0.9;
}

.simulation-controls button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  position: relative;
  transition: all 0.3s;
}

.metric-card.good {
  border-color: #22c55e;
  background: linear-gradient(
    135deg,
    var(--vp-c-bg) 0%,
    rgba(34, 197, 94, 0.05) 100%
  );
}

.metric-card.needs-improvement {
  border-color: #f59e0b;
  background: linear-gradient(
    135deg,
    var(--vp-c-bg) 0%,
    rgba(245, 158, 11, 0.05) 100%
  );
}

.metric-card.poor {
  border-color: #ef4444;
  background: linear-gradient(
    135deg,
    var(--vp-c-bg) 0%,
    rgba(239, 68, 68, 0.05) 100%
  );
}

.metric-header {
  margin-bottom: 0.5rem;
}

.metric-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.metric-full {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
}

.metric-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.metric-status {
  font-size: 0.85rem;
  font-weight: 600;
}

.indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.indicator.good {
  background: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
}

.indicator.needs-improvement {
  background: #f59e0b;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.indicator.poor {
  background: #ef4444;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

.explanation {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.section {
  margin-bottom: 1.5rem;
}

.section h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section li {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  padding-left: 1rem;
  position: relative;
}

.section li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
}

.standards {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.standard-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.color-box.good {
  background: #22c55e;
}

.color-box.needs-improvement {
  background: #f59e0b;
}

.color-box.poor {
  background: #ef4444;
}
</style>
