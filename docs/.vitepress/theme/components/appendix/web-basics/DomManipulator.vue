<template>
  <div class="dom-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">DOM 操作</span>
      <span class="subtitle">用代码动态修改页面</span>
    </div>

    <div class="main-area">
      <div class="left-panel">
        <div class="controls">
          <div class="field">
            <label>修改标题</label>
            <input v-model="title" placeholder="输入新标题" />
          </div>
          <label class="checkbox">
            <input type="checkbox" v-model="highlight" />
            高亮模式
          </label>
        </div>

        <div class="card" :class="{ highlight }">
          <h2>{{ title }}</h2>
          <p>这里是段落说明，勾选高亮看看变化。</p>
          <button @click="toggleText">{{ buttonText }}</button>
        </div>
      </div>

      <div class="right-panel">
        <div class="code-block">
          <div class="code-title">JavaScript</div>
          <div class="code-content">
            <div class="line">// 改内容</div>
            <div class="line">titleEl.textContent = '{{ title }}'</div>
            <div class="line"></div>
            <div class="line">// 切换 class</div>
            <div class="line">card.classList.toggle('highlight', {{ highlight }})</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>DOM 是网页的"乐高积木"，JS 可以随时添加、删除、修改这些积木。
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

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.field {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
}

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.field input[type='text'] {
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  outline: none;
  width: 120px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.checkbox input {
  accent-color: var(--vp-c-brand);
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  transition: all 0.2s;
}

.card.highlight {
  border-color: var(--vp-c-warning);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: var(--vp-c-bg-soft);
}

.card h2 {
  margin: 0 0 0.25rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
}

.card p {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.card button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  font-size: 0.8rem;
  transition: opacity 0.2s;
}

.card button:hover { opacity: 0.9; }

.right-panel {
  display: flex;
  flex-direction: column;
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  height: 100%;
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
