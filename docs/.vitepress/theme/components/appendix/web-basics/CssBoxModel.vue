<template>
  <div class="css-box-model">
    <div class="model-container">
      <div class="box-display">
        <div
          class="margin-box"
          :style="{
            padding: margin + 'px',
            background: '#f3f4f6',
            display: 'inline-block'
          }"
        >
          <div
            class="border-box"
            :style="{
              padding: borderWidth + 'px',
              borderStyle: borderStyle,
              borderColor: borderColor,
              background: '#e5e7eb',
              display: 'inline-block'
            }"
          >
            <div
              class="padding-box"
              :style="{
                padding: padding + 'px',
                background: '#d1d5db',
                display: 'inline-block'
              }"
            >
              <div
                class="content-box"
                :style="{
                  width: width + 'px',
                  height: height + 'px',
                  background: contentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }"
              >
                {{ width }} × {{ height }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <div class="control-group">
          <label>内容宽度 (Width)</label>
          <input
            type="range"
            v-model.number="width"
            min="50"
            max="200"
            class="slider"
          />
          <span class="value">{{ width }}px</span>
        </div>

        <div class="control-group">
          <label>内容高度 (Height)</label>
          <input
            type="range"
            v-model.number="height"
            min="50"
            max="200"
            class="slider"
          />
          <span class="value">{{ height }}px</span>
        </div>

        <div class="control-group">
          <label>内边距 (Padding)</label>
          <input
            type="range"
            v-model.number="padding"
            min="0"
            max="50"
            class="slider"
          />
          <span class="value">{{ padding }}px</span>
        </div>

        <div class="control-group">
          <label>边框宽度 (Border)</label>
          <input
            type="range"
            v-model.number="borderWidth"
            min="0"
            max="20"
            class="slider"
          />
          <span class="value">{{ borderWidth }}px</span>
        </div>

        <div class="control-group">
          <label>边框样式 (Style)</label>
          <select v-model="borderStyle" class="select">
            <option value="solid">solid (实线)</option>
            <option value="dashed">dashed (虚线)</option>
            <option value="dotted">dotted (点线)</option>
            <option value="double">double (双线)</option>
          </select>
        </div>

        <div class="control-group">
          <label>外边距 (Margin)</label>
          <input
            type="range"
            v-model.number="margin"
            min="0"
            max="50"
            class="slider"
          />
          <span class="value">{{ margin }}px</span>
        </div>

        <div class="control-group">
          <label>内容颜色</label>
          <input
            type="color"
            v-model="contentColor"
            class="color-picker"
          />
        </div>

        <div class="control-group">
          <label>边框颜色</label>
          <input
            type="color"
            v-model="borderColor"
            class="color-picker"
          />
        </div>
      </div>

      <div class="dimensions">
        <div class="dimension-item">
          <span class="label">总宽度:</span>
          <span class="value">{{ totalWidth }}px</span>
        </div>
        <div class="dimension-item">
          <span class="label">总高度:</span>
          <span class="value">{{ totalHeight }}px</span>
        </div>
        <div class="calculation">
          总宽度 = {{ margin }} + {{ borderWidth }} + {{ padding }} + {{ width }} + {{ padding }} + {{ borderWidth }} + {{ margin }}
        </div>
      </div>
    </div>

    <div class="code-output">
      <div class="code-title">💻 实时 CSS 代码</div>
      <pre><code>.box {
  /* 内容尺寸 */
  width: {{ width }}px;
  height: {{ height }}px;

  /* 内边距 */
  padding: {{ padding }}px;

  /* 边框 */
  border: {{ borderWidth }}px {{ borderStyle }} {{ borderColor }};

  /* 外边距 */
  margin: {{ margin }}px;

  /* 内容背景色 */
  background-color: {{ contentColor }};
}

/* 总尺寸计算 */
/* 总宽度: {{ totalWidth }}px */
/* 总高度: {{ totalHeight }}px */</code></pre>
    </div>

    <div class="explanation">
      <div class="exp-title">📦 CSS 盒模型说明</div>
      <div class="exp-content">
        <strong>Content (内容)</strong>：元素的实际内容，通过 width 和 height 设置
        <br><br>
        <strong>Padding (内边距)</strong>：内容和边框之间的空间，属于元素内部
        <br><br>
        <strong>Border (边框)</strong>：包裹内容的边界线
        <br><br>
        <strong>Margin (外边距)</strong>：元素外部的空间，用于分隔其他元素
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const width = ref(100)
const height = ref(100)
const padding = ref(20)
const borderWidth = ref(5)
const borderStyle = ref('solid')
const margin = ref(20)
const contentColor = ref('#3b82f6')
const borderColor = ref('#1e40af')

const totalWidth = computed(() => {
  return margin * 2 + borderWidth * 2 + padding * 2 + width
})

const totalHeight = computed(() => {
  return margin * 2 + borderWidth * 2 + padding * 2 + height
})
</script>

<style scoped>
.css-box-model {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.model-container {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.box-display {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-conic-gradient(#f9fafb 0% 25%, #fff 0% 50%) 50% / 20px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 20px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .controls {
    grid-template-columns: 1fr;
  }
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  border: none;
}

.select {
  padding: 8px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.color-picker {
  width: 100%;
  height: 40px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
}

.value {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-family: monospace;
  font-weight: 600;
}

.dimensions {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
}

.dimension-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.dimension-item .label {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.dimension-item .value {
  color: var(--vp-c-brand);
  font-family: monospace;
}

.calculation {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.code-output {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.code-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

pre {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 15px;
  overflow-x: auto;
}

code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  color: #d4d4d4;
  line-height: 1.6;
}

.explanation {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.exp-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.exp-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
