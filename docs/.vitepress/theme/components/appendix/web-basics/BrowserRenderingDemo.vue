<template>
  <div class="browser-rendering-demo">
    <div class="stepper">
      <button
        v-for="(step, index) in steps"
        :key="index"
        class="step-btn"
        :class="{
          active: currentStep === index,
          completed: currentStep > index
        }"
        @click="currentStep = index"
      >
        <span class="step-num">{{ index + 1 }}</span>
        <span class="step-label">{{ step.label }}</span>
      </button>
    </div>

    <div class="stage-container">
      <div class="stage-info">
        <h3>{{ steps[currentStep].title }}</h3>
        <p>{{ steps[currentStep].desc }}</p>
      </div>

      <div class="visualization-window">
        <!-- HTML/CSS Source -->
        <div class="source-view">
          <div class="window-title">积木说明书 (HTML/CSS)</div>
          <div class="code-content">
            <!-- HTML Highlighted always after Step 0 -->
            <div
              class="line"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'html'
              }"
              @mouseenter="hoveredPart = 'html'"
              @mouseleave="hoveredPart = null"
            >
              &lt;!DOCTYPE html&gt;
            </div>
            <div
              class="line"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'html'
              }"
              @mouseenter="hoveredPart = 'html'"
              @mouseleave="hoveredPart = null"
            >
              &lt;html&gt;
            </div>
            <div
              class="line indent"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'body'
              }"
              @mouseenter="hoveredPart = 'body'"
              @mouseleave="hoveredPart = null"
            >
              &lt;body&gt;
            </div>
            <div
              class="line indent-2"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'card'
              }"
              @mouseenter="hoveredPart = 'card'"
              @mouseleave="hoveredPart = null"
            >
              &lt;div class="card"&gt;
            </div>
            <div
              class="line indent-3"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'img'
              }"
              @mouseenter="hoveredPart = 'img'"
              @mouseleave="hoveredPart = null"
            >
              &lt;img class="icon" src="castle.png" /&gt;
            </div>
            <div
              class="line indent-3"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'title'
              }"
              @mouseenter="hoveredPart = 'title'"
              @mouseleave="hoveredPart = null"
            >
              &lt;h2 class="title"&gt;乐高城堡&lt;/h2&gt;
            </div>
            <div
              class="line indent-3"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'btn'
              }"
              @mouseenter="hoveredPart = 'btn'"
              @mouseleave="hoveredPart = null"
            >
              &lt;button class="btn"&gt;购买&lt;/button&gt;
            </div>
            <div
              class="line indent-2"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'card'
              }"
              @mouseenter="hoveredPart = 'card'"
              @mouseleave="hoveredPart = null"
            >
              &lt;/div&gt;
            </div>
            <div
              class="line indent"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'body'
              }"
              @mouseenter="hoveredPart = 'body'"
              @mouseleave="hoveredPart = null"
            >
              &lt;/body&gt;
            </div>
            <div
              class="line"
              :class="{
                active: currentStep >= 0,
                hovered: hoveredPart === 'html'
              }"
              @mouseenter="hoveredPart = 'html'"
              @mouseleave="hoveredPart = null"
            >
              &lt;/html&gt;
            </div>

            <div class="spacer"></div>

            <!-- CSS Highlighted precisely based on step usage -->
            <!-- Layout properties -->
            <div
              class="line"
              :class="{
                active: currentStep === 2,
                hovered: hoveredPart === 'card'
              }"
              @mouseenter="hoveredPart = 'card'"
              @mouseleave="hoveredPart = null"
            >
              .card { display: flex; padding: 10px; }
            </div>
            <div
              class="line"
              :class="{
                active: currentStep === 2,
                hovered: hoveredPart === 'img'
              }"
              @mouseenter="hoveredPart = 'img'"
              @mouseleave="hoveredPart = null"
            >
              .icon { width: 50px; height: 50px; }
            </div>
            <!-- Style properties -->
            <div
              class="line"
              :class="{
                active: currentStep === 1 || currentStep === 3,
                hovered: hoveredPart === 'title'
              }"
              @mouseenter="hoveredPart = 'title'"
              @mouseleave="hoveredPart = null"
            >
              .title { color: red; }
            </div>
            <div
              class="line"
              :class="{
                active: currentStep === 1 || currentStep === 3,
                hovered: hoveredPart === 'btn'
              }"
              @mouseenter="hoveredPart = 'btn'"
              @mouseleave="hoveredPart = null"
            >
              .btn { background: blue; }
            </div>
          </div>
        </div>

        <div class="transform-arrow">→</div>

        <!-- Render Result -->
        <div class="result-view">
          <div class="window-title">{{ steps[currentStep].resultTitle }}</div>

          <div class="render-canvas">
            <!-- Step 1: DOM (Skeleton) -->
            <transition-group name="block">
              <div
                v-if="currentStep >= 0"
                key="html"
                class="block-box root"
                :class="{ hovered: hoveredPart === 'html' }"
                @mouseenter.stop="hoveredPart = 'html'"
                @mouseleave="hoveredPart = null"
              >
                <span class="block-label">html</span>
                <div
                  class="block-box body"
                  :class="{ hovered: hoveredPart === 'body' }"
                  @mouseenter.stop="hoveredPart = 'body'"
                  @mouseleave="hoveredPart = null"
                >
                  <span class="block-label">body</span>

                  <!-- Product Card -->
                  <div
                    class="block-box card"
                    :class="{
                      layout: currentStep >= 2,
                      hovered: hoveredPart === 'card'
                    }"
                    @mouseenter.stop="hoveredPart = 'card'"
                    @mouseleave="hoveredPart = null"
                  >
                    <span class="block-label">div.card</span>

                    <!-- Image -->
                    <div
                      class="block-box img"
                      :class="{
                        layout: currentStep >= 2,
                        hovered: hoveredPart === 'img'
                      }"
                      @mouseenter.stop="hoveredPart = 'img'"
                      @mouseleave="hoveredPart = null"
                    >
                      <span class="block-label">img.icon</span>
                      <span v-if="currentStep >= 3" class="content-img"
                        >🏰</span
                      >
                    </div>

                    <!-- Title -->
                    <div
                      class="block-box title"
                      :class="{
                        styled: currentStep >= 1,
                        layout: currentStep >= 2,
                        hovered: hoveredPart === 'title'
                      }"
                      @mouseenter.stop="hoveredPart = 'title'"
                      @mouseleave="hoveredPart = null"
                    >
                      <span class="block-label">h2.title</span>
                      <span v-if="currentStep >= 3" class="content"
                        >乐高城堡</span
                      >
                    </div>

                    <!-- Button -->
                    <div
                      class="block-box btn"
                      :class="{
                        styled: currentStep >= 1,
                        layout: currentStep >= 2,
                        hovered: hoveredPart === 'btn'
                      }"
                      @mouseenter.stop="hoveredPart = 'btn'"
                      @mouseleave="hoveredPart = null"
                    >
                      <span class="block-label">button.btn</span>
                      <span v-if="currentStep >= 3" class="content-btn"
                        >购买</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

            <!-- Overlays for different steps -->
            <div v-if="currentStep === 1" class="overlay-info style-info">
              <div class="brush">🖌️ 正在上色 (Style)...</div>
            </div>

            <div v-if="currentStep === 2" class="overlay-info layout-info">
              <div class="ruler">📏 正在排版 (Layout)...</div>
            </div>

            <div v-if="currentStep === 3" class="overlay-info paint-info">
              <div class="paint">✨ 绘制完成 (Paint)!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const steps = [
  {
    label: 'DOM (搭骨架)',
    title: '1. 搭建骨架 (DOM)',
    desc: '浏览器工头 (Parser) 解析 HTML 代码，构建出完整的文档树结构。注意：即使代码中省略了 html/body，浏览器也会自动补全。',
    resultTitle: 'DOM 树结构'
  },
  {
    label: 'Style (上色)',
    title: '2. 计算样式 (Recalculate Style)',
    desc: '装修工 (CSS Parser) 匹配 CSS 规则。比如发现 .title 需要红色，.btn 需要蓝色背景。此时只关心"长什么样"，不关心"在哪"。',
    resultTitle: '附带样式的节点'
  },
  {
    label: 'Layout (排版)',
    title: '3. 布局排版 (Layout/Reflow)',
    desc: '测量员 (Layout) 根据 display:flex 和 padding 等属性，计算每个盒子的精确位置和大小。图片在左，文字在右。',
    resultTitle: '几何布局'
  },
  {
    label: 'Paint (绘制)',
    title: '4. 像素绘制 (Paint)',
    desc: '画家 (Paint) 按照计算好的位置和样式，真正把像素点画在屏幕上。最终你看到了一个完整的商品卡片。',
    resultTitle: '最终画面'
  }
]

const currentStep = ref(0)
const hoveredPart = ref(null)
</script>

<style scoped>
.browser-rendering-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
}

.stepper {
  display: flex;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.step-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.step-btn:hover {
  background: var(--vp-c-bg-alt);
}

.step-btn.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  font-weight: bold;
}

.step-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--vp-c-brand);
}

.step-num {
  background: var(--vp-c-bg-alt);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider);
}

.step-btn.active .step-num,
.step-btn.completed .step-num {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.stage-container {
  padding: 1.5rem;
}

.stage-info {
  margin-bottom: 2rem;
  text-align: center;
}

.stage-info h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.stage-info p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.visualization-window {
  display: flex;
  gap: 1rem;
  align-items: stretch;
  min-height: 400px;
}

.source-view,
.result-view {
  flex: 1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  display: flex;
  flex-direction: column;
}

.window-title {
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.code-content {
  padding: 1rem;
  font-size: 0.8rem;
  font-family: monospace;
  overflow-y: auto;
}

.line {
  padding: 2px 4px;
  border-radius: 2px;
  opacity: 0.3;
  transition: opacity 0.5s;
  white-space: nowrap;
}

.line.active {
  opacity: 1;
  background: rgba(59, 130, 246, 0.1);
  font-weight: bold;
  color: #2563eb;
}

.line.indent {
  padding-left: 1rem;
}
.line.indent-2 {
  padding-left: 2rem;
}
.line.indent-3 {
  padding-left: 3rem;
}
.line.mt-2 {
  margin-top: 1rem;
}

.transform-arrow {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.result-view {
  background: white;
  position: relative;
}

.render-canvas {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
}

/* Blocks Animation */
.block-box {
  border: 1px dashed #9ca3af;
  background: #f3f4f6;
  padding: 0.5rem;
  margin: 0.2rem;
  border-radius: 2px;
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  min-width: 50px;
  min-height: 30px;
  display: flex;
  flex-direction: column;
}

.block-box.root {
  width: 95%;
  border-color: #e5e7eb;
  background: #fff;
}
.block-box.body {
  width: 90%;
  border-color: #d1d5db;
  background: #f9fafb;
}
.block-box.card {
  width: 80%;
  border-color: #9ca3af;
  background: #e5e7eb;
}

.block-label {
  font-size: 0.6rem;
  color: #9ca3af;
  position: absolute;
  top: -8px;
  left: 4px;
  background: white;
  padding: 0 2px;
}

/* Step 2: Style */
.block-box.title.styled {
  color: red; /* Text color applied but not painted yet */
  border: 1px solid red; /* Visual cue for style applied */
  background: #fee2e2;
}

.block-box.btn.styled {
  background: blue;
  color: white;
  border: 1px solid blue;
}

/* Step 3: Layout */
.block-box.card.layout {
  display: flex;
  flex-direction: row; /* Horizontal layout */
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.block-box.img.layout {
  width: 50px;
  height: 50px;
  background: #eee;
  border: none;
}

.block-box.title.layout {
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
}

.block-box.btn.layout {
  margin-left: auto; /* Push to right */
  padding: 5px 15px;
  border-radius: 4px;
}

/* Content visibility for Paint step */
.content,
.content-img,
.content-btn {
  font-size: 1rem;
  font-weight: bold;
  animation: fadeIn 0.5s;
  align-self: center;
}

.content-img {
  font-size: 2rem;
}
.content-btn {
  font-size: 0.8rem;
}

/* Overlay Info */
.overlay-info {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  text-align: center;
  animation: bounceIn 0.5s;
  pointer-events: none;
}

.brush,
.ruler,
.paint {
  display: inline-block;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Vue Transitions */
.block-enter-active,
.block-leave-active {
  transition: all 0.5s ease;
}

.block-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

/* Hover Interactions */
.line.hovered {
  background: rgba(59, 130, 246, 0.15);
  opacity: 1 !important;
  cursor: crosshair;
}

.block-box.hovered {
  box-shadow: 0 0 0 2px #3b82f6;
  z-index: 10;
  background-color: rgba(59, 130, 246, 0.05);
  cursor: crosshair;
}
</style>
