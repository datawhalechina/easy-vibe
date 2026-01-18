<template>
  <div class="css-playground">
    <div class="demo-box">
      <div
        class="target-element"
        :style="{
          backgroundColor: bgColor,
          color: textColor,
          fontSize: fontSize + 'px',
          padding: padding + 'px',
          borderRadius: borderRadius + 'px',
          border: `${borderWidth}px solid ${borderColor}`
        }"
      >
        我是演示元素
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>背景颜色 (background-color)</label>
        <input type="color" v-model="bgColor" />
        <span class="value">{{ bgColor }}</span>
      </div>

      <div class="control-group">
        <label>文字颜色 (color)</label>
        <input type="color" v-model="textColor" />
        <span class="value">{{ textColor }}</span>
      </div>

      <div class="control-group">
        <label>字体大小 (font-size)</label>
        <input type="range" v-model="fontSize" min="12" max="48" />
        <span class="value">{{ fontSize }}px</span>
      </div>

      <div class="control-group">
        <label>内边距 (padding)</label>
        <input type="range" v-model="padding" min="0" max="50" />
        <span class="value">{{ padding }}px</span>
      </div>

      <div class="control-group">
        <label>圆角 (border-radius)</label>
        <input type="range" v-model="borderRadius" min="0" max="50" />
        <span class="value">{{ borderRadius }}px</span>
      </div>

      <div class="control-group">
        <label>边框宽度 (border-width)</label>
        <input type="range" v-model="borderWidth" min="0" max="10" />
        <span class="value">{{ borderWidth }}px</span>
      </div>

      <div class="control-group">
        <label>边框颜色 (border-color)</label>
        <input type="color" v-model="borderColor" />
        <span class="value">{{ borderColor }}</span>
      </div>
    </div>

    <div class="code-preview">
      <div class="code-title">生成的 CSS 代码：</div>
      <pre><code>.element {
  background-color: <span class="highlight">{{ bgColor }}</span>;
  color: <span class="highlight">{{ textColor }}</span>;
  font-size: <span class="highlight">{{ fontSize }}px</span>;
  padding: <span class="highlight">{{ padding }}px</span>;
  border-radius: <span class="highlight">{{ borderRadius }}px</span>;
  border: <span class="highlight">{{ borderWidth }}px</span> solid <span class="highlight">{{ borderColor }}</span>;
}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bgColor = ref('#3b82f6')
const textColor = ref('#ffffff')
const fontSize = ref(16)
const padding = ref(20)
const borderRadius = ref(8)
const borderWidth = ref(0)
const borderColor = ref('#000000')
</script>

<style scoped>
.css-playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-box {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.target-element {
  transition: all 0.2s ease;
  text-align: center;
  /* Ensure it doesn't overflow easily */
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.control-group label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  flex: 1;
}

.value {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-1);
  width: 60px;
  text-align: right;
}

input[type='range'] {
  flex: 1;
  cursor: pointer;
}

input[type='color'] {
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
}

.code-preview {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  color: #d4d4d4;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.code-title {
  color: #808080;
  margin-bottom: 8px;
  font-size: 12px;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}

.highlight {
  color: #9cdcfe;
  font-weight: bold;
}
</style>
