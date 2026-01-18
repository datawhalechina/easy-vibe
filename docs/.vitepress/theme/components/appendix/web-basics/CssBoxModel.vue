<!--
  CssBoxModel.vue
  盒模型速懂：三根滑杆 + 颜色区分，实时显示总宽高、渲染顺序提示和 CSS 片段。
-->
<template>
  <div class="box-demo">
    <div class="controls">
      <div class="control-item">
        <div class="control-header">
          <label>Padding (内边距)</label>
          <span class="val">{{ padding }}px</span>
        </div>
        <input type="range" min="0" max="50" v-model.number="padding" />
      </div>
      <div class="control-item">
        <div class="control-header">
          <label>Border (边框)</label>
          <span class="val">{{ border }}px</span>
        </div>
        <input type="range" min="0" max="30" v-model.number="border" />
      </div>
      <div class="control-item">
        <div class="control-header">
          <label>Margin (外边距)</label>
          <span class="val">{{ margin }}px</span>
        </div>
        <input type="range" min="0" max="50" v-model.number="margin" />
      </div>
    </div>

    <div class="stage-container">
      <div class="stage-scroll">
        <div class="layer margin" :style="{ padding: margin + 'px' }">
          <span class="layer-label" v-if="margin >= 15">Margin</span>
          <div class="layer border" :style="{ borderWidth: border + 'px' }">
            <span class="layer-label" v-if="border >= 10">Border</span>
            <div class="layer padding" :style="{ padding: padding + 'px' }">
              <span class="layer-label" v-if="padding >= 15">Padding</span>
              <div class="content">
                <div class="content-inner">
                  内容区<br />
                  {{ contentW }} × {{ contentH }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="meta">
      <div class="meta-row main">
        <span class="meta-label">总占用宽度：</span>
        <span class="meta-value">{{ total }}px</span>
      </div>
      <div class="meta-detail">
        <div class="detail-item">
          <span class="detail-label">渲染顺序</span>
          <span class="detail-text">内容 → Padding → Border → Margin</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">计算公式</span>
          <span class="detail-text"
            >Margin(×2) + Border(×2) + Padding(×2) + 内容宽</span
          >
        </div>
      </div>
    </div>

    <div class="code-block">
      <div class="code-title">CSS 代码片段</div>
      <div class="code-content">
        <div class="line">.box {</div>
        <div class="line">width: {{ contentW }}px;</div>
        <div class="line">height: {{ contentH }}px;</div>
        <div class="line">padding: {{ padding }}px;</div>
        <div class="line">border: {{ border }}px solid #0ea5e9;</div>
        <div class="line">margin: {{ margin }}px;</div>
        <div class="line">}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const contentW = 120
const contentH = 80
const padding = ref(20)
const border = ref(10)
const margin = ref(20)

const total = computed(
  () => margin.value * 2 + border.value * 2 + padding.value * 2 + contentW
)
</script>

<style scoped>
.box-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 24px;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.control-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

label {
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.val {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
  font-weight: 600;
}

input[type='range'] {
  width: 100%;
  accent-color: var(--vp-c-brand);
  cursor: pointer;
}

.stage-container {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.stage-scroll {
  overflow: auto;
  max-width: 100%;
  padding: 10px; /* space for scrollbar if needed */
}

.layer {
  position: relative;
  border-radius: 4px;
  transition: all 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-label {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0.7;
  pointer-events: none;
}

/* Margin Layer */
.margin {
  background-color: #f9fafb; /* gray-50 */
  border: 1px dashed #d1d5db; /* gray-300 */
  color: #6b7280;
}
.margin > .layer-label {
  color: #6b7280;
}

/* Border Layer */
.border {
  background-color: #e0f2fe; /* sky-100 */
  border-style: solid;
  border-color: #7dd3fc; /* sky-300 */
  color: #0284c7;
}
.border > .layer-label {
  color: #0284c7;
}

/* Padding Layer */
.padding {
  background-color: #dbeafe; /* blue-100 */
  border: 1px dashed #93c5fd; /* blue-300 */
  color: #2563eb;
}
.padding > .layer-label {
  color: #2563eb;
}

/* Content Box */
.content {
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 120px;
  height: 80px;
  flex-shrink: 0;
}

.content-inner {
  text-align: center;
  font-size: 13px;
  line-height: 1.4;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.meta-row.main {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.meta-value {
  color: var(--vp-c-brand);
}

.meta-detail {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-item {
  display: flex;
  gap: 12px;
  font-size: 13px;
  align-items: flex-start;
}

.detail-label {
  color: var(--vp-c-text-2);
  min-width: 60px;
  flex-shrink: 0;
}

.detail-text {
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.code-block {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}

.code-title {
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.code-content {
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  overflow-x: auto;
  line-height: 1.6;
}

.line {
  white-space: pre;
}
</style>
