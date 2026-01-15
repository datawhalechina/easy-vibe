<template>
  <div class="css-flexbox">
    <div class="preview-container">
      <div class="flex-container" :style="flexContainerStyle">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex-item"
          :style="{ flex: item.flex, minWidth: item.minWidth + 'px' }"
        >
          Item {{ index + 1 }}
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="control-section">
        <div class="section-title">容器属性</div>

        <div class="control-group">
          <label>flex-direction (方向)</label>
          <div class="button-group">
            <button
              v-for="dir in ['row', 'column', 'row-reverse', 'column-reverse']"
              :key="dir"
              class="control-btn"
              :class="{ active: flexDirection === dir }"
              @click="flexDirection = dir"
            >
              {{ dir }}
            </button>
          </div>
        </div>

        <div class="control-group">
          <label>justify-content (主轴对齐)</label>
          <div class="button-group">
            <button
              v-for="align in ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']"
              :key="align"
              class="control-btn"
              :class="{ active: justifyContent === align }"
              @click="justifyContent = align"
            >
              {{ align }}
            </button>
          </div>
        </div>

        <div class="control-group">
          <label>align-items (交叉轴对齐)</label>
          <div class="button-group">
            <button
              v-for="align in ['stretch', 'flex-start', 'center', 'flex-end']"
              :key="align"
              class="control-btn"
              :class="{ active: alignItems === align }"
              @click="alignItems = align"
            >
              {{ align }}
            </button>
          </div>
        </div>

        <div class="control-group">
          <label>flex-wrap (换行)</label>
          <div class="button-group">
            <button
              class="control-btn"
              :class="{ active: flexWrap === 'nowrap' }"
              @click="flexWrap = 'nowrap'"
            >
              nowrap
            </button>
            <button
              class="control-btn"
              :class="{ active: flexWrap === 'wrap' }"
              @click="flexWrap = 'wrap'"
            >
              wrap
            </button>
            <button
              class="control-btn"
              :class="{ active: flexWrap === 'wrap-reverse' }"
              @click="flexWrap = 'wrap-reverse'"
            >
              wrap-reverse
            </button>
          </div>
        </div>

        <div class="control-group">
          <label>gap (间距)</label>
          <input
            type="range"
            v-model.number="gap"
            min="0"
            max="30"
            class="slider"
          />
          <span class="value">{{ gap }}px</span>
        </div>
      </div>

      <div class="control-section">
        <div class="section-title">项目属性</div>

        <div class="control-group">
          <label>Item 1 flex-grow</label>
          <input
            type="range"
            v-model.number="items[0].flex"
            min="0"
            max="3"
            step="0.5"
            class="slider"
          />
          <span class="value">{{ items[0].flex }}</span>
        </div>

        <div class="control-group">
          <label>Item 2 flex-grow</label>
          <input
            type="range"
            v-model.number="items[1].flex"
            min="0"
            max="3"
            step="0.5"
            class="slider"
          />
          <span class="value">{{ items[1].flex }}</span>
        </div>

        <div class="control-group">
          <label>Item 3 flex-grow</label>
          <input
            type="range"
            v-model.number="items[2].flex"
            min="0"
            max="3"
            step="0.5"
            class="slider"
          />
          <span class="value">{{ items[2].flex }}</span>
        </div>
      </div>
    </div>

    <div class="code-output">
      <div class="code-title">生成的 CSS 代码</div>
      <pre><code>.container {
  display: flex;
  flex-direction: {{ flexDirection }};
  justify-content: {{ justifyContent }};
  align-items: {{ alignItems }};
  flex-wrap: {{ flexWrap }};
  gap: {{ gap }}px;
}

.item {
  flex: {{ items[0].flex }}; /* 第一个项目的值 */
}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const flexDirection = ref('row')
const justifyContent = ref('flex-start')
const alignItems = ref('stretch')
const flexWrap = ref('nowrap')
const gap = ref(0)

const items = ref([
  { flex: 1, minWidth: 60 },
  { flex: 1, minWidth: 60 },
  { flex: 1, minWidth: 60 }
])

const flexContainerStyle = computed(() => ({
  display: 'flex',
  flexDirection: flexDirection.value,
  justifyContent: justifyContent.value,
  alignItems: alignItems.value,
  flexWrap: flexWrap.value,
  gap: gap.value + 'px',
  minHeight: '200px',
  background: '#f3f4f6',
  borderRadius: '8px',
  padding: '10px'
}))
</script>

<style scoped>
.css-flexbox {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.preview-container {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.flex-container {
  width: 100%;
  min-height: 200px;
}

.flex-item {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-item:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.flex-item:nth-child(3) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .controls {
    grid-template-columns: 1fr;
  }
}

.control-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
}

.section-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.control-btn {
  padding: 6px 12px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.control-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
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

.value {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-family: monospace;
  font-weight: 600;
  margin-left: 8px;
}

.code-output {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
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
</style>
