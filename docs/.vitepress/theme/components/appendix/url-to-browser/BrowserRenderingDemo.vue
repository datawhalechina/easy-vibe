<template>
  <div class="browser-render-demo">
    <div class="demo-header">
      <span class="title">浏览器渲染</span>
      <span class="subtitle">代码如何变成画面</span>
    </div>

    <div class="render-pipeline">
      <div class="stage">
        <span class="stage-num">1</span>
        <span class="stage-name">解析 HTML</span>
        <span class="stage-icon">📄</span>
      </div>
      <div class="stage">
        <span class="stage-num">2</span>
        <span class="stage-name">解析 CSS</span>
        <span class="stage-icon">🎨</span>
      </div>
      <div class="stage">
        <span class="stage-num">3</span>
        <span class="stage-name">生成渲染树</span>
        <span class="stage-icon">🌲</span>
      </div>
      <div class="stage">
        <span class="stage-num">4</span>
        <span class="stage-name">布局计算</span>
        <span class="stage-icon">📐</span>
      </div>
      <div class="stage">
        <span class="stage-num">5</span>
        <span class="stage-name">绘制像素</span>
        <span class="stage-icon">✏️</span>
      </div>
      <div class="stage">
        <span class="stage-num">6</span>
        <span class="stage-name">显示屏幕</span>
        <span class="stage-icon">🖥️</span>
      </div>
    </div>

    <div class="preview-box">
      <div class="browser-mockup">
        <div class="browser-bar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="url">google.com/search</span>
        </div>
        <div class="viewport">
          <div class="result-item">
            <span class="result-title">Hello World</span>
            <span class="result-url">www.example.com</span>
            <span class="result-desc">This is a sample search result...</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      浏览器将 HTML/CSS 转换为像素的过程：解析 → 合并 → 布局 → 绘制 → 显示。
    </div>
  </div>
</template>

<style scoped>
.browser-render-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header {
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  display: block;
}

.demo-header .subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.render-pipeline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.stage {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.stage-num {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage-name {
  font-size: 0.7rem;
  color: var(--vp-c-text-1);
}

.stage-icon {
  font-size: 0.8rem;
}

.preview-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.browser-mockup {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.url {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-left: 0.5rem;
  font-family: var(--vp-font-family-mono);
}

.viewport {
  padding: 0.75rem;
  min-height: 60px;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.result-title {
  font-size: 0.8rem;
  color: #1a0dab;
  font-weight: 500;
}

.result-url {
  font-size: 0.65rem;
  color: #006621;
}

.result-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background-color: var(--vp-c-bg-alt);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}
</style>
