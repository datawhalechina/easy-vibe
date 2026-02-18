<template>
  <div class="dom-demo">
    <div class="demo-header">
      <span class="title">DOM 操作演示</span>
      <span class="subtitle">通过 JavaScript 动态修改页面内容、样式和结构</span>
    </div>

    <div class="main-area">
      <div class="left-panel">
        <div class="operations">
          <div class="op-group">
            <div class="op-label">修改内容</div>
            <div class="op-row">
              <input v-model="titleText" placeholder="输入标题" class="input" />
              <button @click="updateTitle" class="btn">更新标题</button>
            </div>
          </div>

          <div class="op-group">
            <div class="op-label">修改样式</div>
            <div class="op-row">
              <button 
                v-for="s in styles" 
                :key="s.id"
                @click="currentStyle = s.id"
                :class="['btn-sm', { active: currentStyle === s.id }]"
              >
                {{ s.label }}
              </button>
            </div>
          </div>

          <div class="op-group">
            <div class="op-label">添加/删除元素</div>
            <div class="op-row">
              <button @click="addItem" class="btn">添加项目</button>
              <button @click="removeLastItem" class="btn btn-danger">删除最后</button>
            </div>
          </div>
        </div>

        <div class="preview-card" :class="currentStyle">
          <h2 class="card-title">{{ titleText || '点击按钮更新标题' }}</h2>
          <p class="card-desc">这是一个演示 DOM 操作的卡片区域。</p>
          <ul class="card-list">
            <li v-for="(item, i) in items" :key="i">{{ item }}</li>
            <li v-if="items.length === 0" class="empty">（列表为空）</li>
          </ul>
        </div>
      </div>

      <div class="right-panel">
        <div class="code-block">
          <div class="code-title">对应的 JavaScript 代码</div>
          <div class="code-content">
            <template v-if="lastOp === 'title'">
              <div class="line comment">// 修改文本内容</div>
              <div class="line">const el = document.querySelector('.card-title')</div>
              <div class="line">el.textContent = '{{ titleText }}'</div>
            </template>
            <template v-else-if="lastOp === 'style'">
              <div class="line comment">// 切换 CSS 类</div>
              <div class="line">const card = document.querySelector('.preview-card')</div>
              <div class="line">card.className = 'preview-card {{ currentStyle }}'</div>
            </template>
            <template v-else-if="lastOp === 'add'">
              <div class="line comment">// 创建并添加新元素</div>
              <div class="line">const list = document.querySelector('.card-list')</div>
              <div class="line">const li = document.createElement('li')</div>
              <div class="line">li.textContent = '新项目 {{ items.length }}'</div>
              <div class="line">list.appendChild(li)</div>
            </template>
            <template v-else-if="lastOp === 'remove'">
              <div class="line comment">// 删除最后一个元素</div>
              <div class="line">const list = document.querySelector('.card-list')</div>
              <div class="line">const last = list.lastElementChild</div>
              <div class="line">if (last) last.remove()</div>
            </template>
            <template v-else>
              <div class="line comment">// 点击左侧按钮查看对应代码</div>
            </template>
          </div>
        </div>

        <div class="methods-card">
          <div class="methods-title">常用 DOM 方法</div>
          <div class="methods-list">
            <div class="method">
              <code>querySelector()</code>
              <span>按选择器查找元素</span>
            </div>
            <div class="method">
              <code>textContent</code>
              <span>获取/设置文本内容</span>
            </div>
            <div class="method">
              <code>classList</code>
              <span>操作元素的 CSS 类</span>
            </div>
            <div class="method">
              <code>createElement()</code>
              <span>创建新元素</span>
            </div>
            <div class="method">
              <code>appendChild()</code>
              <span>添加子元素</span>
            </div>
            <div class="method">
              <code>remove()</code>
              <span>删除元素</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>注意：</strong>频繁操作 DOM 会影响性能。现代框架（Vue/React）使用虚拟 DOM 来优化这个过程——先在内存中计算差异，再批量更新真实 DOM。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const titleText = ref('欢迎学习 DOM')
const currentStyle = ref('')
const items = ref(['项目 1', '项目 2'])
const lastOp = ref('')

const styles = [
  { id: '', label: '默认' },
  { id: 'highlight', label: '高亮' },
  { id: 'dark', label: '深色' }
]

const updateTitle = () => {
  lastOp.value = 'title'
}

const addItem = () => {
  items.value.push(`新项目 ${items.value.length + 1}`)
  lastOp.value = 'add'
}

const removeLastItem = () => {
  if (items.value.length > 0) {
    items.value.pop()
  }
  lastOp.value = 'remove'
}
</script>

<style scoped>
.dom-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.demo-header .title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.operations {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.op-group {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
}

.op-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.op-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  align-items: center;
}

.input {
  flex: 1;
  min-width: 120px;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
}

.input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.btn {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: #fff;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-danger {
  background: #ef4444;
  border-color: #ef4444;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.7rem;
  transition: all 0.2s;
}

.btn-sm:hover {
  background: var(--vp-c-bg);
}

.btn-sm.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.preview-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  transition: all 0.3s;
}

.preview-card.highlight {
  border-color: var(--vp-c-warning);
  background: var(--vp-c-warning-soft);
}

.preview-card.dark {
  background: #1a1a2e;
  border-color: #2d2d44;
}

.preview-card.dark .card-title,
.preview-card.dark .card-desc,
.preview-card.dark .card-list {
  color: #e5e7eb;
}

.card-title {
  margin: 0 0 0.35rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.card-desc {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.card-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.card-list li {
  margin-bottom: 0.15rem;
}

.card-list .empty {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.code-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-content {
  background: #1a1a2e;
  color: #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.6;
  min-height: 100px;
}

.line {
  padding-left: 0.25rem;
}

.comment {
  color: #6b7280;
}

.methods-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  flex: 1;
}

.methods-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.methods-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.method code {
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
}

.method span {
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong { color: var(--vp-c-text-1); }
</style>
