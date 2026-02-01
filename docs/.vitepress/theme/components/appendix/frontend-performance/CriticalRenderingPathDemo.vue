<!--
  CriticalRenderingPathDemo.vue
  关键渲染路径演示
-->
<template>
  <div class="crp-demo">
    <div class="header">
      <div class="title">关键渲染路径 (Critical Rendering Path)</div>
      <div class="subtitle">
        浏览器如何将 HTML、CSS 和 JavaScript 转换为像素
      </div>
    </div>

    <div class="demo-container">
      <div class="input-section">
        <h4>1. DOM 树构建</h4>
        <div class="code-block">
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;link rel="stylesheet" href="style.css"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div class="container"&gt;
      &lt;h1&gt;标题&lt;/h1&gt;
      &lt;p&gt;段落&lt;/p&gt;
    &lt;/div&gt;
    &lt;script src="app.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
      </div>

      <div class="arrow-section">
        <div class="arrow">→</div>
      </div>

      <div class="process-section">
        <div class="step" :class="{ active: currentStep === 'dom' }">
          <div class="step-header">
            <div class="step-icon">🌲</div>
            <div class="step-title">DOM 树</div>
          </div>
          <div class="tree-visualization">
            <div class="tree-node root">html</div>
            <div class="tree-children">
              <div class="tree-node">head</div>
              <div class="tree-node">body</div>
              <div class="tree-children">
                <div class="tree-node">div.container</div>
                <div class="tree-children">
                  <div class="tree-node">h1</div>
                  <div class="tree-node">p</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="step" :class="{ active: currentStep === 'cssom' }">
          <div class="step-header">
            <div class="step-icon">🎨</div>
            <div class="step-title">CSSOM 树</div>
          </div>
          <div class="tree-visualization">
            <div class="tree-node root">body</div>
            <div class="tree-children">
              <div class="tree-node">.container</div>
              <div class="tree-children">
                <div class="tree-node">h1</div>
                <div class="tree-node">p</div>
              </div>
            </div>
          </div>
        </div>

        <div class="step" :class="{ active: currentStep === 'render' }">
          <div class="step-header">
            <div class="step-icon">🖼️</div>
            <div class="step-title">渲染树</div>
          </div>
          <div class="tree-visualization">
            <div class="tree-node root">body</div>
            <div class="tree-children">
              <div class="tree-node">div.container</div>
              <div class="tree-children">
                <div class="tree-node">h1</div>
                <div class="tree-node">p</div>
              </div>
            </div>
          </div>
        </div>

        <div class="step" :class="{ active: currentStep === 'layout' }">
          <div class="step-header">
            <div class="step-icon">📐</div>
            <div class="step-title">布局 (Layout)</div>
          </div>
          <div class="layout-demo">
            <div class="layout-box container">
              <div class="layout-label">container</div>
              <div class="layout-box h1">
                <div class="layout-label">h1</div>
              </div>
              <div class="layout-box p">
                <div class="layout-label">p</div>
              </div>
            </div>
          </div>
        </div>

        <div class="step" :class="{ active: currentStep === 'paint' }">
          <div class="step-header">
            <div class="step-icon">🖌️</div>
            <div class="step-title">绘制 (Paint)</div>
          </div>
          <div class="paint-demo">
            <div class="paint-box container">
              <div class="paint-content">
                <h1>标题</h1>
                <p>段落</p>
              </div>
            </div>
          </div>
        </div>

        <div class="step" :class="{ active: currentStep === 'composite' }">
          <div class="step-header">
            <div class="step-icon">✨</div>
            <div class="step-title">合成 (Composite)</div>
          </div>
          <div class="composite-demo">
            <div class="composite-layer">图层 1: 背景</div>
            <div class="composite-layer">图层 2: 内容</div>
            <div class="composite-layer">图层 3: 装饰</div>
            <div class="composite-result">= 最终页面</div>
          </div>
        </div>
      </div>
    </div>

    <div class="timeline">
      <div class="timeline-header">渲染时间线</div>
      <div class="timeline-bar">
        <div
          v-for="(step, index) in timelineSteps"
          :key="step.name"
          class="timeline-segment"
          :class="{ active: currentStep === step.name }"
          :style="{
            left: step.start + '%',
            width: step.width + '%',
            borderColor: step.color
          }"
          @click="setStep(step.name)"
        >
          <div class="segment-label" :style="{ color: step.color }">
            {{ step.label }}
          </div>
        </div>
      </div>
      <div class="timeline-scale">
        <span>0ms</span>
        <span>{{ totalDuration }}ms</span>
      </div>
    </div>

    <div class="optimization-tips">
      <div class="tip-card">
        <div class="tip-icon">⚡</div>
        <div class="tip-content">
          <h4>优化 DOM 构建</h4>
          <p>减少 HTML 嵌套层级，避免不必要的标签。使用语义化 HTML。</p>
        </div>
      </div>

      <div class="tip-card">
        <div class="tip-icon">🎨</div>
        <div class="tip-content">
          <h4>优化 CSS</h4>
          <p>CSS 是渲染阻塞资源。将关键 CSS 内联，异步加载非关键 CSS。</p>
        </div>
      </div>

      <div class="tip-card">
        <div class="tip-icon">⚙️</div>
        <div class="tip-content">
          <h4>优化 JavaScript</h4>
          <p>
            JS 会阻塞 DOM 构建。使用 <code>defer</code> 或
            <code>async</code> 属性。
          </p>
        </div>
      </div>

      <div class="tip-card">
        <div class="tip-icon">📐</div>
        <div class="tip-content">
          <h4>减少重排</h4>
          <p>
            批量修改样式，避免逐帧操作。使用
            <code>transform</code> 代替位置属性。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref('dom')

const timelineSteps = [
  { name: 'dom', label: 'DOM', start: 0, width: 20, color: '#3b82f6' },
  { name: 'cssom', label: 'CSSOM', start: 20, width: 15, color: '#8b5cf6' },
  {
    name: 'render',
    label: 'Render Tree',
    start: 35,
    width: 10,
    color: '#ec4899'
  },
  { name: 'layout', label: 'Layout', start: 45, width: 15, color: '#f59e0b' },
  { name: 'paint', label: 'Paint', start: 60, width: 20, color: '#10b981' },
  {
    name: 'composite',
    label: 'Composite',
    start: 80,
    width: 20,
    color: '#06b6d4'
  }
]

const totalDuration = computed(() => {
  return 1000 // 假设总时长 1000ms
})

function setStep(step) {
  currentStep.value = step
}
</script>

<style scoped>
.crp-demo {
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

.demo-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .demo-container {
    grid-template-columns: 1fr;
  }

  .arrow-section {
    transform: rotate(90deg);
  }
}

.input-section h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
}

code {
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.arrow-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.arrow {
  font-size: 2rem;
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.process-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s;
  opacity: 0.6;
}

.step.active {
  border-color: var(--vp-c-brand);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.step-icon {
  font-size: 1.5rem;
}

.step-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tree-visualization {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tree-node {
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: 'Monaco', monospace;
  color: var(--vp-c-text-1);
}

.tree-node.root {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.tree-children {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-left: 1rem;
  border-left: 2px dashed var(--vp-c-divider);
}

.layout-demo,
.paint-demo,
.composite-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.layout-box {
  border: 2px solid var(--vp-c-brand);
  border-radius: 4px;
  padding: 0.5rem;
  position: relative;
  min-width: 80px;
  min-height: 40px;
}

.layout-box.container {
  background: rgba(59, 130, 246, 0.1);
}

.layout-box.h1 {
  background: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  margin-bottom: 0.3rem;
}

.layout-box.p {
  background: rgba(236, 72, 153, 0.1);
  border-color: #ec4899;
}

.layout-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
}

.paint-box {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1rem;
  min-width: 120px;
}

.paint-content h1 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
}

.paint-content p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.composite-layer {
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
  text-align: center;
}

.composite-result {
  padding: 0.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.timeline {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.timeline-header {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.timeline-bar {
  position: relative;
  height: 50px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.timeline-segment {
  position: absolute;
  height: 100%;
  border-left: 3px solid;
  border-right: 3px solid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.timeline-segment:hover {
  opacity: 0.8;
}

.timeline-segment.active {
  background: rgba(59, 130, 246, 0.1);
}

.segment-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  padding: 0 0.3rem;
}

.timeline-scale {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.optimization-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.tip-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 0.8rem;
}

.tip-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-content h4 {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.tip-content p {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.tip-content code {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', monospace;
  font-size: 0.75rem;
  color: var(--vp-c-brand);
}
</style>
