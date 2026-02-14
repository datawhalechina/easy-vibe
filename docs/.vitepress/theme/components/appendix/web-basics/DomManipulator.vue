<!--
  DomManipulator.vue
  DOM 操作速体验：输入标题+切换高亮类，直观看到文本和样式变化
-->
<template>
  <div class="dom-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">DOM 操作</span>
      <span class="subtitle">网页内容的动态修改（通俗说：用代码改页面）</span>
    </div>

    <div class="demo-content">
      <div class="controls">
        <div class="field">
          <label>改个标题</label>
          <input v-model="title" placeholder="输入新标题" />
        </div>
        <div class="field checkbox">
          <label><input type="checkbox" v-model="highlight" /> 高亮模式 (class="highlight")</label>
        </div>
      </div>

      <div class="card" :class="{ highlight }">
        <h2 id="hero">{{ title }}</h2>
        <p id="desc">这里是段落说明，勾选高亮看看变化。</p>
        <button @click="toggleText">{{ buttonText }}</button>
      </div>

      <pre class="code"><code>// JS 改内容
const titleEl = document.getElementById('hero')
titleEl.textContent = '{{ title }}'

// JS 切 class
const card = document.querySelector('.card')
card.classList.toggle('highlight', {{ highlight }})</code></pre>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>DOM 是网页的"乐高积木"，JavaScript 可以随时添加、删除、修改这些积木。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('欢迎来到我的网站')
const highlight = ref(false)
const buttonText = ref('点我试试')

const toggleText = () => {
  buttonText.value = buttonText.value === '点我试试' ? '再点一次' : '点我试试'
}
</script>

<style scoped>
.dom-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.field {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

input[type='text'] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

input[type='text']:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

input[type='checkbox'] {
  accent-color: var(--vp-c-brand);
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
  transition: all 0.2s;
  margin-bottom: 1rem;
}

.card.highlight {
  border-color: var(--vp-c-warning);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: var(--vp-c-bg-soft);
}

.card h2 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.card p {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.card button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}

.card button:hover {
  opacity: 0.9;
}

.code {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  overflow-x: auto;
  line-height: 1.6;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
