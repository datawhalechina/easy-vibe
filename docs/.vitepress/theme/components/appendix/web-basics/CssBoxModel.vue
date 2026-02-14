<template>
  <div class="box-demo">
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">CSS 盒模型</span>
      <span class="subtitle">理解元素尺寸的构成</span>
    </div>

    <div class="main-area">
      <div class="left-panel">
        <div class="controls">
          <div class="control-row">
            <label>Padding</label>
            <input type="range" min="0" max="30" v-model.number="padding" />
            <span class="val">{{ padding }}px</span>
          </div>
          <div class="control-row">
            <label>Border</label>
            <input type="range" min="0" max="20" v-model.number="border" />
            <span class="val">{{ border }}px</span>
          </div>
          <div class="control-row">
            <label>Margin</label>
            <input type="range" min="0" max="30" v-model.number="margin" />
            <span class="val">{{ margin }}px</span>
          </div>
        </div>

        <div class="visual">
          <div class="layer margin" :style="{ padding: margin + 'px' }">
            <span class="label" v-if="margin >= 10">Margin</span>
            <div class="layer border" :style="{ borderWidth: border + 'px' }">
              <span class="label" v-if="border >= 8">Border</span>
              <div class="layer padding" :style="{ padding: padding + 'px' }">
                <span class="label" v-if="padding >= 10">Padding</span>
                <div class="content">内容</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="result">
          <div class="result-row">
            <span class="result-label">总宽度：</span>
            <span class="result-value">{{ total }}px</span>
          </div>
          <div class="formula">= {{ margin }}×2 + {{ border }}×2 + {{ padding }}×2 + {{ contentW }}</div>
        </div>

        <div class="code-block">
          <div class="code-title">CSS</div>
          <div class="code-content">
            <div class="line">.box {</div>
            <div class="line">  width: {{ contentW }}px;</div>
            <div class="line">  padding: {{ padding }}px;</div>
            <div class="line">  border: {{ border }}px solid;</div>
            <div class="line">  margin: {{ margin }}px;</div>
            <div class="line">}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>元素实际占用宽度 = 内容宽 + padding×2 + border×2 + margin×2
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const contentW = 80
const padding = ref(15)
const border = ref(8)
const margin = ref(15)

const total = computed(
  () => margin.value * 2 + border.value * 2 + padding.value * 2 + contentW
)
</script>

<style scoped>
.box-demo {
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

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
}

.control-row label {
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 55px;
  color: var(--vp-c-text-1);
}

.control-row input[type='range'] {
  flex: 1;
  height: 4px;
  accent-color: var(--vp-c-brand);
}

.control-row .val {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  min-width: 35px;
  text-align: right;
}

.visual {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layer {
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.layer .label {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 9px;
  font-weight: 700;
  opacity: 0.7;
}

.margin {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
}
.margin .label { color: var(--vp-c-text-3); }

.border {
  background: var(--vp-c-brand-soft);
  border-style: solid;
  border-color: var(--vp-c-brand);
}
.border .label { color: var(--vp-c-brand-1); }

.padding {
  background: var(--vp-c-bg-alt);
  border: 1px dashed var(--vp-c-divider);
}
.padding .label { color: var(--vp-c-text-2); }

.content {
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.result-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.result-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.formula {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  flex: 1;
}

.code-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.code-content {
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 4px;
  padding: 0.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  line-height: 1.5;
}

.line { white-space: pre; }

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
