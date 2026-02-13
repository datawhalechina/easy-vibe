<template>
  <div class="rendering-performance-demo">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">渲染性能优化</span>
      <span class="subtitle">让页面丝滑流畅的秘诀</span>
    </div>

    <div class="intro-text">
      渲染性能优化的目标是<span class="highlight">每秒60帧</span>（16.67ms/帧）。就像拍电影，每秒帧数越多，画面越流畅。超过这个时间，用户就会感觉卡顿。
    </div>

    <div class="demo-content">
      <div class="performance-comparison">
        <div class="comparison-section">
          <div class="section-title">❌ 不好的做法</div>
          <div class="code-block">
            <div class="code-line">
              <span class="code-comment">// 触发重排和重绘</span>
            </div>
            <div class="code-line">
              <span class="code-keyword">function</span> <span class="code-func">animate</span>() {
            </div>
            <div class="code-line">
              <span class="code-indent"></span>element.style.width = <span class="code-string">'100px'</span>
            </div>
            <div class="code-line">
              <span class="code-indent"></span>element.style.height = <span class="code-string">'100px'</span>
            </div>
            <div class="code-line">
              <span class="code-indent"></span><span class="code-func">requestAnimationFrame</span>(animate)
            </div>
            <div class="code-line">
              }
            </div>
          </div>
          <div class="performance-meter bad">
            <div class="meter-label">性能开销</div>
            <div class="meter-bar">
              <div class="meter-fill bad-fill" style="width: 90%"></div>
            </div>
          </div>
        </div>

        <div class="vs-divider">VS</div>

        <div class="comparison-section">
          <div class="section-title good">✅ 优化做法</div>
          <div class="code-block">
            <div class="code-line">
              <span class="code-comment">/* 只触发合成 */</span>
            </div>
            <div class="code-line">
              <span class="code-keyword">function</span> <span class="code-func">animate</span>() {
            </div>
            <div class="code-line">
              <span class="code-indent"></span>element.style.transform = <span class="code-string">'translate3d(0,0,0)'</span>
            </div>
            <div class="code-line">
              <span class="code-indent"></span><span class="code-func">requestAnimationFrame</span>(animate)
            </div>
            <div class="code-line">
              }
            </div>
          </div>
          <div class="performance-meter good">
            <div class="meter-label">性能开销</div>
            <div class="meter-bar">
              <div class="meter-fill good-fill" style="width: 15%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="optimization-tips">
        <div class="tips-title">黄金法则：</div>
        <div class="tips-list">
          <div class="tip-item">
            <span class="tip-icon">1️⃣</span>
            <span class="tip-text">优先使用 <code>transform</code> 和 <code>opacity</code> 做动画</span>
          </div>
          <div class="tip-item">
            <span class="tip-icon">2️⃣</span>
            <span class="tip-text">避免频繁读取布局属性（如 offsetWidth）</span>
          </div>
          <div class="tip-item">
            <span class="tip-icon">3️⃣</span>
            <span class="tip-text">使用 <code>will-change</code> 提前告知浏览器</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心要点：</strong>渲染路径越长，性能越差。最佳路径是：合成（Composite）> 重绘（Paint）> 布局（Layout）> 样式计算（Style）。尽量让动画停留在"合成"阶段，在 GPU 上完成。
    </div>
  </div>
</template>

<script setup>
// No reactive state needed for this demo
</script>

<style scoped>
.rendering-performance-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
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

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
}

.performance-comparison {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.comparison-section {
  flex: 1;
  min-width: 200px;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-align: center;
}

.section-title.good {
  color: var(--vp-c-success);
}

.code-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
}

.code-line {
  line-height: 1.6;
}

.code-comment {
  color: var(--vp-c-text-3);
}

.code-keyword {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.code-func {
  color: var(--vp-c-text-1);
}

.code-string {
  color: var(--vp-c-success);
}

.code-indent {
  display: inline-block;
  width: 1rem;
}

.performance-meter {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.meter-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.meter-bar {
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.bad-fill {
  background: var(--vp-c-danger);
}

.good-fill {
  background: var(--vp-c-success);
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  padding-top: 2rem;
}

.optimization-tips {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.tips-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.tip-icon {
  font-size: 0.9rem;
}

.tip-text code {
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
