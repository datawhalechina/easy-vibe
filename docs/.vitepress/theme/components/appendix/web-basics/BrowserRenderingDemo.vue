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
          <div class="window-title">
            积木说明书 (HTML/CSS)
          </div>
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
              &lt;div class="player"&gt;
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
              &lt;img class="cover" src="cat.jpg" /&gt;
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
              &lt;h2 class="title"&gt;搞笑猫咪合集&lt;/h2&gt;
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
              &lt;button class="btn"&gt;▶️ 播放&lt;/button&gt;
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

            <div class="spacer" />

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
              .player { margin: auto; padding: 20px; }
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
              .cover { width: 100%; height: 200px; }
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
              .title { color: #fb7299; /* B站主题色 */ }
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
              .btn { background: #00aeec; color: white; }
            </div>
          </div>
        </div>

        <div class="transform-arrow">
          →
        </div>

        <!-- Render Result -->
        <div class="result-view">
          <div class="window-title">
            {{ steps[currentStep].resultTitle }}
          </div>

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
                    <span class="block-label">div.player</span>

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
                      <span class="block-label">img.cover</span>
                      <span
                        v-if="currentStep >= 3"
                        class="content-img"
                      >🐈</span>
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
                      <span
                        v-if="currentStep >= 3"
                        class="content"
                      >搞笑猫咪合集</span>
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
                      <span
                        v-if="currentStep >= 3"
                        class="content-btn"
                      >▶️ 播放</span>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

            <!-- Overlays for different steps -->
            <div
              v-if="currentStep === 1"
              class="overlay-info style-info"
            >
              <div class="brush">
                🖌️ 正在上色 (Style)...
              </div>
            </div>

            <div
              v-if="currentStep === 2"
              class="overlay-info layout-info"
            >
              <div class="ruler">
                📏 正在排版 (Layout)...
              </div>
            </div>

            <div
              v-if="currentStep === 3"
              class="overlay-info paint-info"
            >
              <div class="paint">
                ✨ 绘制完成 (Paint)!
              </div>
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
    title: '1. 搭建骨架 (DOM 解析)',
    desc: '浏览器工厂看懂了 HTML 代码，搭建好了页面的“骨架”（比如哪里是包裹盒 div，哪里是按钮 button）。',
    resultTitle: 'DOM 树结构'
  },
  {
    label: 'Style (看图纸)',
    title: '2. 匹配样式 (CSS 解析)',
    desc: '仔细看了眼配色的说明书。比如发现 .title 字体要是粉色的，.btn 背景要是蓝色的（此时只在脑子里确立样式，但不计算尺寸）。',
    resultTitle: '获取了各种配置规则'
  },
  {
    label: 'Layout (定尺寸)',
    title: '3. 排版规划 (Layout)',
    desc: '拿尺子量每个骨架的大小。考虑到用户的屏幕尺寸，精确计算出猫咪的图片要多高、播放按钮要挤到哪个坐标上。',
    resultTitle: '排版布局盒子'
  },
  {
    label: 'Paint (绘制)',
    title: '4. 像素上色 (Paint)',
    desc: '根据前面的几何位置和颜色计划，正式拿起画笔，将一个个像素填到你的屏幕上，一个可以看视频的播放器就诞生了。',
    resultTitle: '最终画面'
  }
]

const currentStep = ref(0)
const hoveredPart = ref(null)
</script>

<style scoped>
.browser-rendering-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  margin: 0.5rem 0;
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
  padding: 0.75rem;
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
  padding: 0.75rem;
  font-size: 0.8rem;
  font-family: monospace;
  
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
  color: #fb7299;
  border: 1px solid #fb7299;
  background: #fdf2f8;
}

.block-box.btn.styled {
  background: #00aeec;
  color: white;
  border: 1px solid #00aeec;
}

/* Step 3: Layout */
.block-box.card.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.block-box.img.layout {
  width: 100%;
  height: 120px;
  background: #eee;
  border: none;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block-box.title.layout {
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
}

.block-box.btn.layout {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
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
