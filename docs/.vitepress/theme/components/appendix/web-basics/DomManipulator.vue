<!--
  DomManipulator.vue
  DOM 速体验：输入标题+切换高亮类，直观看到文本和样式变化。
-->
<template>
  <div class="dom-demo">
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
.dom-demo { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 16px; margin: 20px 0; display: flex; flex-direction: column; gap: 12px; }
.controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
.field { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
.checkbox { flex-direction: row; align-items: center; gap: 8px; }
input[type='text'], input[type='checkbox'] { accent-color: var(--vp-c-brand); }

.card { border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 16px; background: var(--vp-c-bg); transition: all 0.2s; }
.card.highlight { border-color: #f59e0b; box-shadow: 0 8px 18px rgba(245, 158, 11, 0.2); background: #fff7ed; }
.card h2 { margin: 0 0 8px 0; }
.card p { margin: 0 0 12px 0; color: var(--vp-c-text-2); }
.card button { background: var(--vp-c-brand); color: #fff; border: none; border-radius: 8px; padding: 8px 12px; cursor: pointer; }

.code { background: #0b1221; color: #e5e7eb; border-radius: 10px; padding: 12px; font-family: var(--vp-font-family-mono); font-size: 13px; overflow-x: auto; }
</style>
