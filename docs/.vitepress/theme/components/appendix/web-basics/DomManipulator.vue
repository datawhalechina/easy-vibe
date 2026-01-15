<template>
  <div class="dom-manipulator">
    <div class="preview-area">
      <div class="preview-title">实时预览</div>
      <div class="preview-box" ref="previewBox">
        <div id="target-element" :style="elementStyle">
          {{ text }}
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="control-section">
        <div class="section-title">📝 文本内容操作</div>

        <div class="control-group">
          <label>修改文本</label>
          <input
            type="text"
            v-model="text"
            class="text-input"
            placeholder="输入文本..."
          />
        </div>

        <div class="button-group">
          <button class="action-btn" @click="changeText">
            修改内容
          </button>
          <button class="action-btn" @click="appendText">
            追加内容
          </button>
          <button class="action-btn" @click="clearText">
            清空内容
          </button>
        </div>
      </div>

      <div class="control-section">
        <div class="section-title">🎨 样式操作</div>

        <div class="control-group">
          <label>背景颜色</label>
          <input
            type="color"
            v-model="backgroundColor"
            class="color-picker"
          />
        </div>

        <div class="control-group">
          <label>文字颜色</label>
          <input
            type="color"
            v-model="color"
            class="color-picker"
          />
        </div>

        <div class="control-group">
          <label>字体大小 ({{ fontSize }}px)</label>
          <input
            type="range"
            v-model.number="fontSize"
            min="12"
            max="48"
            class="slider"
          />
        </div>

        <div class="control-group">
          <label>内边距 ({{ padding }}px)</label>
          <input
            type="range"
            v-model.number="padding"
            min="0"
            max="50"
            class="slider"
          />
        </div>

        <div class="control-group">
          <label>圆角 ({{ borderRadius }}px)</label>
          <input
            type="range"
            v-model.number="borderRadius"
            min="0"
            max="50"
            class="slider"
          />
        </div>

        <div class="button-group">
          <button class="action-btn" @click="toggleHidden">
            {{ isHidden ? '显示' : '隐藏' }}
          </button>
          <button class="action-btn" @click="resetStyles">
            重置样式
          </button>
        </div>
      </div>

      <div class="control-section">
        <div class="section-title">📊 属性操作</div>

        <div class="property-list">
          <div class="property-item">
            <span class="prop-label">元素 ID:</span>
            <span class="prop-value">target-element</span>
          </div>
          <div class="property-item">
            <span class="prop-label">类名:</span>
            <span class="prop-value">{{ className }}</span>
          </div>
          <div class="property-item">
            <span class="prop-label">可见性:</span>
            <span class="prop-value">{{ isHidden ? '隐藏' : '可见' }}</span>
          </div>
          <div class="property-item">
            <span class="prop-label">文本长度:</span>
            <span class="prop-value">{{ text.length }} 字符</span>
          </div>
        </div>
      </div>
    </div>

    <div class="code-display">
      <div class="code-title">💻 等效的 JavaScript 代码</div>
      <pre><code>// 获取元素
const element = document.getElementById('target-element');

// 修改文本内容
element.textContent = '{{ text }}';

// 修改样式
element.style.backgroundColor = '{{ backgroundColor }}';
element.style.color = '{{ color }}';
element.style.fontSize = '{{ fontSize }}px';
element.style.padding = '{{ padding }}px';
element.style.borderRadius = '{{ borderRadius }}px';

// 显示/隐藏
element.style.display = '{{ isHidden ? 'none' : 'block' }}';</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const text = ref('Hello DOM!')
const backgroundColor = ref('#3b82f6')
const color = ref('#ffffff')
const fontSize = ref(24)
const padding = ref(20)
const borderRadius = ref(8)
const isHidden = ref(false)
const className = ref('demo-element')

const elementStyle = computed(() => ({
  backgroundColor: backgroundColor.value,
  color: color.value,
  fontSize: fontSize.value + 'px',
  padding: padding.value + 'px',
  borderRadius: borderRadius.value + 'px',
  display: isHidden.value ? 'none' : 'block',
  transition: 'all 0.3s ease',
  fontWeight: 'bold',
  textAlign: 'center',
  minHeight: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const changeText = () => {
  const newTexts = [
    'Hello World!',
    'DOM 很有趣!',
    'JavaScript 强大!',
    '继续学习!',
    '你真棒!'
  ]
  text.value = newTexts[Math.floor(Math.random() * newTexts.length)]
}

const appendText = () => {
  text.value += ' 👋'
}

const clearText = () => {
  text.value = ''
}

const toggleHidden = () => {
  isHidden.value = !isHidden.value
}

const resetStyles = () => {
  backgroundColor.value = '#3b82f6'
  color.value = '#ffffff'
  fontSize.value = 24
  padding.value = 20
  borderRadius.value = 8
  isHidden.value = false
}
</script>

<style scoped>
.dom-manipulator {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.preview-area {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.preview-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.preview-box {
  min-height: 200px;
  background: repeating-conic-gradient(#f9fafb 0% 25%, #fff 0% 50%) 50% / 20px 20px;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.text-input {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.text-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.color-picker {
  width: 100%;
  height: 40px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
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

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.action-btn {
  padding: 8px 16px;
  border: 2px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--vp-c-brand);
  color: white;
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.property-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
}

.prop-label {
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.prop-value {
  color: var(--vp-c-brand);
  font-family: monospace;
}

.code-display {
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
