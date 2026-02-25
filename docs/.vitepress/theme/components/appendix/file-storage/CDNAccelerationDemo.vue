<!--
  CDNAccelerationDemo.vue
  CDN 加速演示：展示 CDN 如何加速文件访问
-->
<template>
  <div class="cdn-demo">
    <div class="header">
      <div class="title">CDN 加速原理</div>
      <div class="subtitle">对比有无 CDN 时的文件访问路径</div>
    </div>

    <div class="mode-tabs">
      <button :class="['tab', { active: !cdnEnabled }]" @click="cdnEnabled = false">无 CDN</button>
      <button :class="['tab', { active: cdnEnabled }]" @click="cdnEnabled = true">有 CDN</button>
    </div>

    <div class="diagram">
      <div class="node user-node">
        <div class="node-icon">👤</div>
        <div class="node-label">北京用户</div>
      </div>

      <div class="path-line" :class="{ highlight: !cdnEnabled }">
        <span class="latency">{{ cdnEnabled ? '5ms' : '200ms' }}</span>
      </div>

      <div v-if="cdnEnabled" class="node cdn-node">
        <div class="node-icon">⚡</div>
        <div class="node-label">北京 CDN 节点</div>
        <div class="node-detail">缓存命中</div>
      </div>

      <div v-if="cdnEnabled" class="path-line miss-line">
        <span class="latency miss">缓存未命中时回源</span>
      </div>

      <div class="node origin-node">
        <div class="node-icon">🏢</div>
        <div class="node-label">源站（美西 S3）</div>
      </div>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="metric-label">首字节时间 (TTFB)</div>
        <div class="metric-bar">
          <div class="bar-fill" :style="{ width: cdnEnabled ? '15%' : '100%' }"></div>
        </div>
        <div class="metric-value">{{ cdnEnabled ? '~30ms' : '~200ms' }}</div>
      </div>
      <div class="metric">
        <div class="metric-label">下载 1MB 图片</div>
        <div class="metric-bar">
          <div class="bar-fill" :style="{ width: cdnEnabled ? '20%' : '100%' }"></div>
        </div>
        <div class="metric-value">{{ cdnEnabled ? '~50ms' : '~800ms' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const cdnEnabled = ref(true)
</script>

<style scoped>
.cdn-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
.tab {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.diagram {
  display: flex; align-items: center; justify-content: center;
  gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;
}
.node {
  padding: 0.75rem 1rem; border-radius: 10px; text-align: center;
  border: 2px solid var(--vp-c-divider); background: var(--vp-c-bg);
}
.cdn-node { border-color: #22c55e; background: rgba(34,197,94,0.05); }
.node-icon { font-size: 1.5rem; }
.node-label { font-weight: 600; font-size: 0.85rem; margin-top: 0.25rem; }
.node-detail { font-size: 0.75rem; color: #22c55e; }
.path-line {
  display: flex; align-items: center; padding: 0 0.5rem;
  font-size: 0.8rem; color: var(--vp-c-text-3);
}
.path-line::before, .path-line::after { content: '→'; margin: 0 0.25rem; }
.latency {
  padding: 0.15rem 0.4rem; border-radius: 4px; font-family: var(--vp-font-family-mono);
  background: rgba(var(--vp-c-brand-rgb), 0.1); color: var(--vp-c-brand); font-size: 0.75rem;
}
.latency.miss { background: rgba(245,158,11,0.1); color: #f59e0b; font-family: var(--vp-font-family-base); }
.miss-line { opacity: 0.5; }
.metrics { display: flex; flex-direction: column; gap: 0.75rem; }
.metric { display: flex; align-items: center; gap: 0.75rem; }
.metric-label { min-width: 140px; font-size: 0.85rem; font-weight: 600; }
.metric-bar {
  flex: 1; height: 20px; background: var(--vp-c-bg); border-radius: 4px;
  border: 1px solid var(--vp-c-divider); overflow: hidden;
}
.bar-fill {
  height: 100%; background: var(--vp-c-brand); border-radius: 3px;
  transition: width 0.5s ease;
}
.metric-value { min-width: 80px; font-size: 0.85rem; font-family: var(--vp-font-family-mono); text-align: right; }
@media (max-width: 640px) {
  .diagram { flex-direction: column; }
  .path-line::before, .path-line::after { content: '↓'; }
  .metric { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .metric-label { min-width: auto; }
  .metric-value { min-width: auto; }
}
</style>
