<template>
  <div class="mpa-routing-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">MPA vs SPA</span>
      <span class="subtitle">多页面 vs 单页面导航</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">餐厅吃饭</span>：MPA像是每次点菜都<span class="highlight">换一家餐厅</span>（重新加载整个页面），SPA则是在同一家餐厅换菜品（只更新需要变化的部分）。显然，SPA体验更流畅！
    </div>

    <div class="comparison-container">
      <div class="mode-box mpa">
        <div class="mode-header">
          <span class="mode-icon">🏢</span>
          <span class="mode-title">MPA (多页面应用)</span>
        </div>
        <div class="flow-steps">
          <div class="step">
            1. 用户点击链接
          </div>
          <div class="step">
            2. 浏览器发送 HTTP 请求
          </div>
          <div class="step">
            3. 服务器返回完整 HTML
          </div>
          <div class="step">
            4. 浏览器解析并渲染新页面
          </div>
          <div class="step">
            5. 页面资源重新加载 (JS/CSS)
          </div>
        </div>
        <div class="mode-features">
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>SEO 友好</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>首屏快</span>
          </div>
          <div class="feature bad">
            <span class="feature-icon">✗</span>
            <span>页面有白屏</span>
          </div>
        </div>
      </div>

      <div class="mode-box spa">
        <div class="mode-header">
          <span class="mode-icon">⚡</span>
          <span class="mode-title">SPA (单页面应用)</span>
        </div>
        <div class="flow-steps">
          <div class="step">
            1. 用户点击链接
          </div>
          <div class="step">
            2. 拦截默认行为
          </div>
          <div class="step">
            3. 更新 URL (History API)
          </div>
          <div class="step">
            4. 匹配路由配置
          </div>
          <div class="step">
            5. 动态渲染新组件
          </div>
          <div class="step">
            6. 页面无刷新更新
          </div>
        </div>
        <div class="mode-features">
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>过渡流畅</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>体验好</span>
          </div>
          <div class="feature bad">
            <span class="feature-icon">✗</span>
            <span>需要 SSR 支持 SEO</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心区别：</strong>MPA每次跳转都要重新下载整个页面，SPA只在首次加载时下载，后续只更新变化的内容。这就是为什么SPA感觉"更快"的原因。
    </div>
  </div>
</template>

<script setup>
const comparisonData = [
  { feature: '页面加载', mpa: '每次跳转加载完整页面', spa: '首次加载后只更新内容' },
  { feature: 'URL 变化', mpa: '浏览器地址栏正常变化', spa: 'History API 控制 URL' },
  { feature: '用户体验', mpa: '页面有白屏闪烁', spa: '过渡流畅无刷新' },
  { feature: 'SEO 友好', mpa: '天生对搜索引擎友好', spa: '需要 SSR/预渲染优化' },
  { feature: '首屏时间', mpa: '较快（只加载当前页）', spa: '较慢（需加载完整应用）' }
]
</script>

<style scoped>
.mpa-routing-demo {
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

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.mode-header {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.mode-box.mpa .mode-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mode-box.spa .mode-header {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.mode-icon {
  font-size: 1.25rem;
}

.mode-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.flow-steps {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.mode-features {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.feature-icon {
  font-size: 0.9rem;
}

.feature .feature-icon {
  color: #27c93f;
}

.feature.bad .feature-icon {
  color: #ff5f56;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}
</style>
