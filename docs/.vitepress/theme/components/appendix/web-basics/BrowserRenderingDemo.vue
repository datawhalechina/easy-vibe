<template>
  <div class="browser-rendering-demo">
    <div class="control-bar">
      <div class="step-indicator">Step: {{ currentStep + 1 }} / 4</div>
      <div class="steps-nav">
        <button
          v-for="(step, index) in steps"
          :key="index"
          :class="{ active: currentStep === index }"
          @click="currentStep = index"
        >
          {{ step.label }}
        </button>
      </div>
    </div>

    <div class="workspace">
      <!-- Left: Source Code -->
      <div class="source-panel">
        <div class="panel-label">HTML / CSS</div>
        <div class="code-block">
          <div class="line">&lt;div id="app"&gt;</div>
          <div class="line indent">&lt;h1&gt;Hello&lt;/h1&gt;</div>
          <div class="line indent">&lt;p&gt;World&lt;/p&gt;</div>
          <div class="line">&lt;/div&gt;</div>
          <div class="line mt-2">h1 { color: red; }</div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="arrow">→</div>

      <!-- Right: Visualization -->
      <div class="viz-panel">
        <div class="panel-label">{{ steps[currentStep].title }}</div>

        <transition name="fade" mode="out-in">
          <!-- Step 1: DOM Tree -->
          <div v-if="currentStep === 0" class="tree-viz">
            <div class="node root">Document</div>
            <div class="tree-lines">
              <div class="line-v"></div>
            </div>
            <div class="node element">html</div>
            <div class="tree-lines">
              <div class="line-v"></div>
            </div>
            <div class="node element">body</div>
            <div class="tree-children">
              <div class="node element active">div#app</div>
              <div class="tree-children row">
                <div class="node element">h1</div>
                <div class="node element">p</div>
              </div>
            </div>
          </div>

          <!-- Step 2: Render Tree -->
          <div v-else-if="currentStep === 1" class="tree-viz render-tree">
            <div class="node render-obj">RenderBlock (div)</div>
            <div class="tree-children row">
              <div class="node render-obj red">
                RenderText (h1) <br /><small>color: red</small>
              </div>
              <div class="node render-obj">RenderText (p)</div>
            </div>
          </div>

          <!-- Step 3: Layout -->
          <div v-else-if="currentStep === 2" class="layout-viz">
            <div class="layout-box root">
              <span class="dims">100% x 100%</span>
              <div class="layout-box container">
                <span class="dims">div: 100% x auto</span>
                <div class="layout-box item h1">h1: 100% x 32px (x:0, y:0)</div>
                <div class="layout-box item p">p: 100% x 16px (x:0, y:32)</div>
              </div>
            </div>
          </div>

          <!-- Step 4: Paint -->
          <div v-else-if="currentStep === 3" class="paint-viz">
            <div class="browser-window">
              <div class="painted-content">
                <h1 style="color: red; margin: 0">Hello</h1>
                <p style="margin: 0">World</p>
              </div>
              <div class="paint-layers">
                <div class="layer-item">Layer 1: Background</div>
                <div class="layer-item">Layer 2: Text</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="info-footer">
      <p>{{ steps[currentStep].desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)

const steps = [
  {
    label: '1. DOM',
    title: 'DOM Tree Construction',
    desc: '浏览器解析 HTML 标记，构建 DOM (文档对象模型) 树。每个标签成为一个节点。'
  },
  {
    label: '2. Render Tree',
    title: 'Render Tree Construction',
    desc: '结合 DOM 和 CSSOM，生成渲染树。只有可见元素会被包含（display: none 的元素会被排除）。'
  },
  {
    label: '3. Layout',
    title: 'Layout (Reflow)',
    desc: '计算每个节点在屏幕上的确切位置和大小。这一步也叫"回流"。'
  },
  {
    label: '4. Paint',
    title: 'Painting & Composite',
    desc: '将各个节点绘制到屏幕像素。现代浏览器会将不同部分绘制到不同图层，最后合成。'
  }
]
</script>

<style scoped>
.browser-rendering-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.steps-nav {
  display: flex;
  gap: 0.5rem;
}

.steps-nav button {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
}

.steps-nav button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.workspace {
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 300px;
}

.source-panel,
.viz-panel {
  flex: 1;
  height: 100%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.panel-label {
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.code-block {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.line.indent {
  padding-left: 1rem;
}
.line.mt-2 {
  margin-top: 1rem;
}

.viz-panel {
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Visualization Styles */
.node {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  text-align: center;
  font-size: 0.8rem;
  margin: 0.2rem;
}

.node.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.node.root {
  background: #e5e7eb;
  color: #374151;
}

.tree-viz {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-children.row {
  display: flex;
  gap: 1rem;
}

.render-obj.red {
  border-color: red;
  color: red;
}

.layout-box {
  border: 1px dashed var(--vp-c-text-3);
  padding: 1rem;
  position: relative;
}

.layout-box .dims {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
}

.layout-box.container {
  border-color: var(--vp-c-brand);
  margin: 0.5rem;
}
.layout-box.item {
  border-style: solid;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg-soft);
}

.painted-content {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.paint-layers {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.info-footer {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
