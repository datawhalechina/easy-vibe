<!--
  PerformanceMetricsDemo.vue
  Core Web Vitals 性能指标演示
-->
<template>
  <div class="metrics-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">Core Web Vitals</span>
      <span class="subtitle">调整加载时间，观察性能指标变化</span>
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
      >
    </div>

    <div class="metrics-grid">
      <div
        class="metric-card"
        :class="fcpStatus.class"
      >
        <div class="metric-header">
          <div class="metric-name">
            FCP
          </div>
          <div class="metric-full">
            First Contentful Paint
          </div>
        </div>
        <div class="metric-value">
          {{ fcp }} s
        </div>
        <div class="metric-desc">
          首次内容绘制
        </div>
        <div class="metric-status">
          {{ fcpStatus.text }}
        </div>
        <div
          class="indicator"
          :class="fcpStatus.class"
        />
      </div>

      <div
        class="metric-card"
        :class="lcpStatus.class"
      >
        <div class="metric-header">
          <div class="metric-name">
            LCP
          </div>
          <div class="metric-full">
            Largest Contentful Paint
          </div>
        </div>
        <div class="metric-value">
          {{ lcp }} s
        </div>
        <div class="metric-desc">
          最大内容绘制
        </div>
        <div class="metric-status">
          {{ lcpStatus.text }}
        </div>
        <div
          class="indicator"
          :class="lcpStatus.class"
        />
      </div>

      <div
        class="metric-card"
        :class="fidStatus.class"
      >
        <div class="metric-header">
          <div class="metric-name">
            FID
          </div>
          <div class="metric-full">
            First Input Delay
          </div>
        </div>
        <div class="metric-value">
          {{ fid }} ms
        </div>
        <div class="metric-desc">
          首次输入延迟
        </div>
        <div class="metric-status">
          {{ fidStatus.text }}
        </div>
        <div
          class="indicator"
          :class="fidStatus.class"
        />
      </div>

      <div
        class="metric-card"
        :class="clsStatus.class"
      >
        <div class="metric-header">
          <div class="metric-name">
            CLS
          </div>
          <div class="metric-full">
            Cumulative Layout Shift
          </div>
        </div>
        <div class="metric-value">
          {{ cls }}
        </div>
        <div class="metric-desc">
          累积布局偏移
        </div>
        <div class="metric-status">
          {{ clsStatus.text }}
        </div>
        <div
          class="indicator"
          :class="clsStatus.class"
        />
      </div>
    </div>

    <div class="standards">
      <div class="standard-item">
        <span class="color-box good" />
        <span>良好</span>
      </div>
      <div class="standard-item">
        <span class="color-box needs-improvement" />
        <span>需改进</span>
      </div>
      <div class="standard-item">
        <span class="color-box poor" />
        <span>差</span>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心指标：</strong>FCP（首次绘制）≤1.8s，LCP（最大内容绘制）≤2.5s，FID（输入延迟）≤100ms，CLS（布局偏移）≤0.1。目标是让所有指标都达到"良好"标准。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const loadTime = ref(2.5)

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
</script>

<style scoped>
.metrics-demo {
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

.simulation-controls {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.simulation-controls label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.simulation-controls input[type='range'] {
  width: 100%;
  cursor: pointer;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.85rem;
  position: relative;
  transition: all 0.3s;
}

.metric-card.good {
  border-color: var(--vp-c-success-1);
}

.metric-card.needs-improvement {
  border-color: var(--vp-c-warning-1);
}

.metric-card.poor {
  border-color: var(--vp-c-error-1);
}

.metric-header {
  margin-bottom: 0.4rem;
}

.metric-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.metric-full {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.4rem 0;
  color: var(--vp-c-text-1);
}

.metric-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.metric-status {
  font-size: 0.8rem;
  font-weight: 600;
}

.indicator {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.indicator.good {
  background: var(--vp-c-success-1);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
}

.indicator.needs-improvement {
  background: var(--vp-c-warning-1);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}

.indicator.poor {
  background: var(--vp-c-error-1);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}

.standards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.standard-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.color-box {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
}

.color-box.good {
  background: var(--vp-c-success-1);
}

.color-box.needs-improvement {
  background: var(--vp-c-warning-1);
}

.color-box.poor {
  background: var(--vp-c-error-1);
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
