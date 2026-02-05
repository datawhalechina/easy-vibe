<template>
  <div class="mpa-routing-demo">
    <div class="demo-header">
      <h4>MPA vs SPA 路由对比</h4>
      <p class="demo-desc">对比多页面应用和单页面应用的路由机制差异</p>
    </div>

    <div class="comparison-table">
      <div class="table-header">
        <div class="col feature">特性</div>
        <div class="col mpa">MPA (多页面)</div>
        <div class="col spa">SPA (单页面)</div>
      </div>
      <div class="table-row" v-for="(row, index) in comparisonData" :key="index">
        <div class="col feature">{{ row.feature }}</div>
        <div class="col mpa">{{ row.mpa }}</div>
        <div class="col spa">{{ row.spa }}</div>
      </div>
    </div>

    <div class="flow-comparison">
      <div class="flow-box mpa-flow">
        <h5>MPA 导航流程</h5>
        <div class="flow-steps">
          <div class="step">1. 用户点击链接</div>
          <div class="step">2. 浏览器发送 HTTP 请求</div>
          <div class="step">3. 服务器返回完整 HTML</div>
          <div class="step">4. 浏览器解析并渲染新页面</div>
          <div class="step">5. 页面资源重新加载 (JS/CSS)</div>
        </div>
      </div>
      <div class="flow-box spa-flow">
        <h5>SPA 导航流程</h5>
        <div class="flow-steps">
          <div class="step">1. 用户点击链接</div>
          <div class="step">2. 拦截默认行为 (preventDefault)</div>
          <div class="step">3. 更新 URL (History API)</div>
          <div class="step">4. 匹配路由配置</div>
          <div class="step">5. 动态渲染新组件</div>
          <div class="step">6. 页面无刷新更新</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const comparisonData = [
  { feature: '页面加载', mpa: '每次跳转加载完整页面', spa: '首次加载后只更新内容' },
  { feature: 'URL 变化', mpa: '浏览器地址栏正常变化', spa: 'History API 控制 URL' },
  { feature: '用户体验', mpa: '页面有白屏闪烁', spa: '过渡流畅无刷新' },
  { feature: 'SEO 友好', mpa: '天生对搜索引擎友好', spa: '需要 SSR/预渲染优化' },
  { feature: '首屏时间', mpa: '较快（只加载当前页）', spa: '较慢（需加载完整应用）' },
  { feature: '服务端压力', mpa: '较高（每次请求都渲染）', spa: '较低（大部分逻辑在客户端）' },
  { feature: '开发复杂度', mpa: '简单，传统开发模式', spa: '较复杂，需理解前端路由' }
]
</script>

<style scoped>
.mpa-routing-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.demo-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 20px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  font-size: 13px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
  border-top: 1px solid var(--vp-c-divider);
}

.col {
  padding: 12px 16px;
  font-size: 13px;
}

.col.feature {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.col.mpa {
  color: var(--vp-c-text-2);
}

.col.spa {
  color: var(--vp-c-brand);
}

.flow-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.flow-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
}

.flow-box h5 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step {
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.mpa-flow .step {
  border-left-color: #888;
}

.spa-flow .step {
  border-left-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }

  .flow-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
</content>