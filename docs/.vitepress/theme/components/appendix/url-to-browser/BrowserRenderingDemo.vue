<!--
  BrowserRenderingDemo.vue
  浏览器渲染演示 - 拆开包裹/装修房子类比
  压缩版：横向延展，减少纵向高度，增加自动播放逻辑
-->
<template>
  <div class="unboxing-demo">
    <!-- 紧凑头部：标题+步骤导航 -->
    <div class="compact-header">
      <div class="header-left">
        <span class="title-icon">📦</span>
        <span class="header-title">拆开包裹：代码如何变成画面</span>
      </div>
      <div class="header-steps">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          @click="goToStep(index)"
          class="step-chip"
          :class="{ active: currentStep === index, completed: currentStep > index }"
          :disabled="isAutoPlaying"
        >
          <span class="chip-num">{{ index + 1 }}</span>
          <span class="chip-name">{{ step.shortName }}</span>
        </button>
      </div>
    </div>

    <!-- 核心展示区：横向三栏布局 -->
    <div class="main-stage">
      <!-- 左侧：输入 (代码) -->
      <div class="stage-col input-col">
        <div class="col-header">
          <span class="col-icon">📄</span>
          <span class="col-title">收到的代码</span>
        </div>
        <div class="code-preview">
          <div class="code-line">&lt;div class="box"&gt;</div>
          <div class="code-line indent">Hello</div>
          <div class="code-line">&lt;/div&gt;</div>
          <div class="code-line style-tag">&lt;style&gt;</div>
          <div class="code-line indent">.box { bg: blue }</div>
          <div class="code-line style-tag">&lt;/style&gt;</div>
        </div>
      </div>

      <!-- 中间：处理 (动画区) -->
      <div class="stage-col process-col">
        <div class="col-header">
          <span class="col-icon">⚙️</span>
          <span class="col-title">浏览器处理中...</span>
        </div>
        
        <div class="process-stage">
          <!-- 步骤展示 -->
          <transition name="fade" mode="out-in">
            <div :key="currentStep" class="step-content">
              <div class="step-visual">
                <!-- 1. HTML解析 -->
                <div v-if="currentStep === 0" class="visual-tree">
                  <div class="tree-node root">html</div>
                  <div class="tree-line">│</div>
                  <div class="tree-node body">body</div>
                  <div class="tree-line">│</div>
                  <div class="tree-node div highlight">div.box</div>
                </div>

                <!-- 2. CSS解析 -->
                <div v-else-if="currentStep === 1" class="visual-css">
                  <div class="css-card">
                    <span class="selector">.box</span>
                    <div class="rule">background: <span class="value">blue</span></div>
                  </div>
                </div>

                <!-- 3. 合并渲染树 -->
                <div v-else-if="currentStep === 2" class="visual-combine">
                  <div class="combine-item dom">DOM树</div>
                  <div class="combine-plus">+</div>
                  <div class="combine-item css">CSS树</div>
                  <div class="combine-arrow">→</div>
                  <div class="combine-result">渲染树</div>
                </div>

                <!-- 4. 布局计算 -->
                <div v-else-if="currentStep === 3" class="visual-layout">
                  <div class="layout-box" :class="{ measured: isMeasured }">
                    <span class="measure-label" v-if="isMeasured">100px × 100px</span>
                    <div class="ruler-h" v-if="isMeasured"></div>
                    <div class="ruler-v" v-if="isMeasured"></div>
                  </div>
                </div>

                <!-- 5. 绘制 -->
                <div v-else-if="currentStep === 4" class="visual-paint">
                  <div class="paint-layer bg" :class="{ painted: isPainted }">背景层</div>
                  <div class="paint-layer text" :class="{ painted: isPainted }">文字层</div>
                </div>

                <!-- 6. 合成 -->
                <div v-else class="visual-final">
                  <div class="final-box">Hello</div>
                  <div class="check-mark">✨</div>
                </div>
              </div>
              
              <div class="step-desc">
                <span class="step-badge">{{ currentStep + 1 }}. {{ steps[currentStep].name }}</span>
                <p class="step-text">{{ steps[currentStep].desc }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 右侧：输出 (屏幕) -->
      <div class="stage-col output-col">
        <div class="col-header">
          <span class="col-icon">🖥️</span>
          <span class="col-title">屏幕显示</span>
        </div>
        <div class="screen-preview">
          <div class="browser-toolbar">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="viewport">
            <transition name="scale">
              <div v-if="currentStep >= 5" class="final-render">
                Hello
              </div>
              <div v-else-if="currentStep >= 4" class="skeleton-render">
                <div class="sk-box"></div>
              </div>
            </transition>
            <div v-if="currentStep < 4" class="loading-spinner">
              <div class="spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部控制栏：类比说明 + 按钮 -->
    <div class="bottom-control">
      <div class="analogy-bar">
        <span class="analogy-icon">💡</span>
        <span class="analogy-text">
          <strong>核心机制：</strong> <span v-html="steps[currentStep].analogy"></span>
        </span>
      </div>
      
      <div class="action-buttons">
        <button class="ctrl-btn" @click="prevStep" :disabled="currentStep <= 0 || isAutoPlaying">
          上一步
        </button>
        <button class="ctrl-btn primary" @click="toggleAutoPlay">
          {{ isAutoPlaying ? '暂停演示' : '自动演示' }}
        </button>
        <button class="ctrl-btn" @click="nextStep" :disabled="currentStep >= steps.length - 1 || isAutoPlaying">
          下一步
        </button>
      </div>
    </div>

    <!-- 技术答疑面板 -->
    <div class="qa-panel" v-if="steps[currentStep].qa">
      <div class="qa-header">
        {{ steps[currentStep].qa.title }}
      </div>
      <div class="qa-content">
        <div v-for="(item, idx) in steps[currentStep].qa.content" :key="idx" class="qa-item">
          <div class="qa-q" v-html="'Q: ' + item.q"></div>
          <div class="qa-a" v-html="item.a"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const currentStep = ref(0)
const isAutoPlaying = ref(false)
const isMeasured = ref(false)
const isPainted = ref(false)
let autoPlayTimer = null

const steps = [
  {
    id: 'html',
    name: '解析 HTML',
    shortName: 'DOM构建',
    desc: '浏览器解析 HTML 文本，将其转换为内存中的 DOM 树结构。',
    analogy: 'HTML 文件只是纯文本，浏览器无法直接操作。必须将其解析为 <strong>DOM (文档对象模型)</strong> 树，这是一种树状的数据结构，代表了页面的结构和内容，供 JavaScript 访问和修改。',
    qa: {
      title: '🤔 为什么需要 DOM 树？',
      content: [
        {
          q: 'DOM 到底是什么？',
          a: 'DOM 是 HTML 文档在内存中的<strong>对象表示</strong>。HTML 标签被转换为对象（如 div 对象），标签的嵌套关系被转换为<strong>父子节点关系</strong>，从而形成一棵树。'
        },
        {
          q: '为什么必须是树状结构？',
          a: '因为 HTML 本身就是嵌套的（&lt;div&gt; 包含 &lt;span&gt;）。树状结构能完美表达这种<strong>层级关系</strong>，并让浏览器能快速查找到任何一个节点（通过父找子，或通过子找父）。'
        }
      ]
    }
  },
  {
    id: 'css',
    name: '解析 CSS',
    shortName: 'CSS构建',
    desc: '浏览器解析 CSS 代码，构建 CSSOM 树（CSS 对象模型）。',
    analogy: '浏览器读取所有的 CSS 规则（来源包括外部 CSS 文件、&lt;style&gt; 标签和内联样式），构建 <strong>CSSOM 树</strong>。它计算出每个 DOM 节点最终应该应用什么样式（如红色、16px字体等）。',
    qa: {
      title: '🤔 什么是 CSSOM？',
      content: [
        {
          q: 'CSSOM 的作用是什么？',
          a: 'CSSOM 存储了所有的样式规则。它和 DOM 树是<strong>并行构建</strong>的。浏览器必须知道每个节点"长什么样"才能开始渲染，所以 CSSOM 是渲染的必要条件。'
        },
        {
          q: '样式计算是如何进行的？',
          a: '浏览器会根据 CSS 选择器的<strong>优先级</strong>（ID &gt; 类 &gt; 标签）和<strong>继承规则</strong>（子元素继承父元素字体），计算出每个节点最终的计算样式（Computed Style）。'
        }
      ]
    }
  },
  {
    id: 'render',
    name: '生成渲染树',
    shortName: '渲染树',
    desc: '合并 DOM 和 CSSOM，生成渲染树（Render Tree）。',
    analogy: '浏览器将 DOM 树和 CSSOM 树结合，生成<strong>渲染树</strong>。渲染树只包含<strong>可见</strong>的节点。不可见的节点（如 &lt;head&gt;、&lt;script&gt; 或 <code>display: none</code> 的元素）会被完全剔除，不参与后续的布局和绘制。',
    qa: {
      title: '🤔 渲染树包含什么？',
      content: [
        {
          q: '渲染树和 DOM 树一一对应吗？',
          a: '不是。DOM 树包含所有标签，而渲染树<strong>只包含需要显示的节点</strong>。例如 <code>display: none</code> 的节点在 DOM 里有，但在渲染树里没有。'
        },
        {
          q: '<code>visibility: hidden</code> 的元素在渲染树里吗？',
          a: '在。因为它虽然看不见，但<strong>占据空间</strong>（即布局时需要留出空白）。而 <code>display: none</code> 是完全不占空间，所以不在渲染树里。'
        }
      ]
    }
  },
  {
    id: 'layout',
    name: '布局计算',
    shortName: '布局',
    desc: '计算渲染树中每个节点在屏幕上的精确坐标和大小。',
    analogy: '浏览器从渲染树的根节点开始遍历，计算每个节点在视口（Viewport）内的<strong>几何信息</strong>（位置 x/y 坐标、宽度、高度）。这个过程通常被称为<strong>回流 (Reflow)</strong> 或布局 (Layout)。',
    qa: {
      title: '🤔 什么是回流 (Reflow)？',
      content: [
        {
          q: '为什么回流很消耗性能？',
          a: '因为页面布局是流式的。一个元素的尺寸或位置改变（如改变宽高、字体大小），可能会导致其所有子元素、兄弟元素甚至整个页面的布局都需要<strong>重新计算</strong>。'
        }
      ]
    }
  },
  {
    id: 'paint',
    name: '绘制像素',
    shortName: '绘制',
    desc: '将每个节点的视觉属性绘制成屏幕上的像素。',
    analogy: '浏览器遍历渲染树，调用系统的图形接口，将每个节点的<strong>视觉样式</strong>（背景色、边框、阴影、文本内容等）绘制出来。这个过程称为<strong>重绘 (Repaint)</strong>。',
    qa: {
      title: '🤔 什么是重绘 (Repaint)？',
      content: [
        {
          q: '重绘和回流的区别？',
          a: '回流涉及<strong>几何尺寸</strong>的变化，必然引起重绘。但重绘（如只改变背景色、文字颜色）<strong>不影响布局</strong>，所以不会触发回流。重绘的开销比回流小得多。'
        }
      ]
    }
  },
  {
    id: 'composite',
    name: '合成显示',
    shortName: '合成',
    desc: '将不同的图层进行合成，最终呈现在屏幕上。',
    analogy: '现代浏览器为了优化性能，会将页面分成多个<strong>图层 (Layers)</strong> 独立绘制（例如 <code>transform</code> 动画、<code>fixed</code> 定位元素）。最后由 <strong>GPU</strong> 将这些图层合成在一起，显示在屏幕上。',
    qa: {
      title: '🤔 为什么需要图层合成？',
      content: [
        {
          q: 'GPU 加速是如何工作的？',
          a: '对于一些复杂的动画（如 3D 变换、透明度变化），浏览器会将其提升到独立的图层。这样当动画发生时，只需要 GPU 对该图层进行变换，而不需要重新触发布局和绘制，从而极大提升流畅度。'
        }
      ]
    }
  }
]

// 动画触发逻辑
watch(currentStep, (val) => {
  if (val === 3) {
    isMeasured.value = false
    setTimeout(() => isMeasured.value = true, 300)
  }
  if (val === 4) {
    isPainted.value = false
    setTimeout(() => isPainted.value = true, 300)
  }
})

const goToStep = (index) => {
  if (isAutoPlaying.value) return
  currentStep.value = index
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const toggleAutoPlay = () => {
  if (isAutoPlaying.value) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
}

const startAutoPlay = () => {
  isAutoPlaying.value = true
  if (currentStep.value === steps.length - 1) {
    currentStep.value = 0
  }
  
  const playNext = () => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
      autoPlayTimer = setTimeout(playNext, 2000)
    } else {
      autoPlayTimer = setTimeout(() => {
        isAutoPlaying.value = false
      }, 1000)
    }
  }
  
  autoPlayTimer = setTimeout(playNext, 1500)
}

const stopAutoPlay = () => {
  isAutoPlaying.value = false
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer)
    autoPlayTimer = null
  }
}

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.unboxing-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  font-family: var(--vp-font-family-base);
}

/* 头部 */
.compact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
  gap: 12px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-icon { font-size: 18px; }
.header-title {
  font-weight: 600;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.header-steps {
  display: flex;
  gap: 6px;
}
.step-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.step-chip:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.step-chip.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}
.step-chip.completed {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand-dimm);
}
.chip-num {
  width: 14px;
  height: 14px;
  background: rgba(0,0,0,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
}
.active .chip-num { background: rgba(255,255,255,0.3); }

/* 主展示区 */
.main-stage {
  display: grid;
  grid-template-columns: 1fr 2.2fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
  min-height: 240px;
}

.stage-col {
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  /* overflow: hidden;  移除 hidden 以防截断 */
}

.col-header {
  padding: 8px 12px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

/* 左侧代码 */
.code-preview {
  padding: 12px;
  font-family: monospace;
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  overflow-y: auto;
}
.indent { margin-left: 12px; }
.style-tag { color: #e6a23c; }

/* 中间动画区 */
.process-col {
  position: relative;
}
.process-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}
.step-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.step-visual {
  min-height: 140px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}
.visual-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.visual-combine {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.step-desc {
  text-align: center;
  width: 100%;
}
.step-badge {
  display: inline-block;
  font-size: 10px;
  padding: 2px 6px;
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  border-radius: 4px;
  margin-bottom: 4px;
}
.step-text {
  font-size: 12px;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.4;
}

/* 视觉元素样式 */
.tree-node {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 10px;
  background: var(--vp-c-bg);
}
.tree-node.highlight {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  font-weight: bold;
}
.tree-line {
  color: var(--vp-c-divider);
  font-size: 10px;
  margin: 2px 0;
}

.css-card {
  padding: 8px 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid #e6a23c;
  border-radius: 4px;
  font-family: monospace;
  font-size: 11px;
}
.selector { color: #e6a23c; font-weight: bold; }
.value { color: #409eff; }

.combine-item {
  padding: 4px 8px;
  background: var(--vp-c-bg-alt);
  border: 1px dashed var(--vp-c-text-3);
  border-radius: 4px;
  font-size: 10px;
}
.combine-plus, .combine-arrow {
  margin: 0 6px;
  color: var(--vp-c-text-3);
}
.combine-result {
  padding: 4px 8px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 10px;
}

.layout-box {
  width: 60px;
  height: 60px;
  border: 2px dashed var(--vp-c-divider);
  position: relative;
  transition: all 0.5s;
}
.layout-box.measured {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}
.ruler-h {
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--vp-c-brand);
}
.ruler-v {
  position: absolute;
  left: -10px;
  top: 0;
  height: 100%;
  width: 2px;
  background: var(--vp-c-brand);
}
.measure-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 9px;
  color: var(--vp-c-brand);
  white-space: nowrap;
}

.paint-layer {
  padding: 6px 16px;
  margin: 4px 0;
  border-radius: 4px;
  font-size: 10px;
  text-align: center;
  opacity: 0.3;
  transition: opacity 0.5s;
}
.paint-layer.bg { background: #e1f3d8; color: #67c23a; border: 1px solid #67c23a; }
.paint-layer.text { background: #d9ecff; color: #409eff; border: 1px solid #409eff; }
.paint-layer.painted { opacity: 1; }

.final-box {
  width: 80px;
  height: 80px;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}
.check-mark {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 20px;
  animation: bounce 1s infinite;
}

/* 右侧屏幕 */
.screen-preview {
  flex: 1;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
.dark .screen-preview { background: #1a1a1a; }

.browser-toolbar {
  height: 20px;
  background: var(--vp-c-divider);
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 4px;
}
.dot { width: 6px; height: 6px; border-radius: 50%; }
.red { background: #ff5f57; }
.yellow { background: #febc2e; }
.green { background: #28c840; }

.viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.final-render {
  width: 60px;
  height: 60px;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
}
.skeleton-render .sk-box {
  width: 60px;
  height: 60px;
  background: var(--vp-c-divider);
  border-radius: 4px;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 底部控制 */
.bottom-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.analogy-bar {
  flex: 1;
  min-width: 200px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 6px;
}
.analogy-icon { font-size: 14px; }
.action-buttons {
  display: flex;
  gap: 8px;
}
.ctrl-btn {
  padding: 5px 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 14px;
  font-size: 11px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}
.ctrl-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.ctrl-btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}
.ctrl-btn.primary:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}
.ctrl-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 答疑面板 */
.qa-panel {
  margin-top: 16px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  font-size: 13px;
}
.qa-header {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.qa-item {
  margin-bottom: 8px;
}
.qa-item:last-child {
  margin-bottom: 0;
}
.qa-q {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}
.qa-a {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding-left: 12px;
  border-left: 2px solid var(--vp-c-divider);
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@media (max-width: 768px) {
  .main-stage {
    grid-template-columns: 1fr;
    height: auto;
  }
  .stage-col {
    min-height: 120px;
  }
  .compact-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .bottom-control {
    flex-direction: column;
    align-items: stretch;
  }
  .action-buttons {
    justify-content: center;
  }
}

/* Markdown 样式适配 */
.analogy-text :deep(code),
.qa-content :deep(code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  padding: 2px 5px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.analogy-text :deep(strong),
.qa-content :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-brand);
}
</style>
