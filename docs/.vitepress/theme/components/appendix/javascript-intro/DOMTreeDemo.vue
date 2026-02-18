<script setup>
import { ref } from 'vue'

const title = ref('我的网页')
const items = ref(['项目1', '项目2'])
const paragraphColor = ref('black')

const modifyTitle = () => {
  title.value = 'Hello World!'
}

const addItem = () => {
  const id = items.value.length + 1
  items.value.push(`新项目${id}`)
}

const changeColor = () => {
  paragraphColor.value = paragraphColor.value === 'black' ? 'red' : 'black'
}

const removeItem = () => {
  if (items.value.length > 0) {
    items.value.pop()
  }
}
</script>

<template>
  <div class="dom-tree-demo">
    <h3>DOM 树：JavaScript 看到的网页</h3>

    <div class="demo-container">
      <!-- 左侧：迷你网页 -->
      <div class="webpage-preview">
        <div class="browser-bar">
          <div class="dots">
            <span class="dot red" />
            <span class="dot yellow" />
            <span class="dot green" />
          </div>
        </div>
        <div class="webpage-content">
          <h1>{{ title }}</h1>
          <p :style="{ color: paragraphColor }">
            欢迎光临
          </p>
          <ul>
            <li
              v-for="(item, index) in items"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧：DOM 树 -->
      <div class="dom-tree">
        <div class="tree-node">
          <span class="tag">&lt;html&gt;</span>
          <div class="tree-children">
            <div class="tree-node">
              <span class="tag">&lt;body&gt;</span>
              <div class="tree-children">
                <div
                  class="tree-node"
                  :class="{ 'active': title === 'Hello World!' }"
                >
                  <span class="tag">&lt;h1&gt;</span>
                  <span class="text">{{ title }}</span>
                </div>
                <div
                  class="tree-node"
                  :class="{ 'active': paragraphColor === 'red' }"
                >
                  <span class="tag">&lt;p&gt;</span>
                  <span class="text">欢迎光临</span>
                </div>
                <div class="tree-node">
                  <span class="tag">&lt;ul&gt;</span>
                  <div class="tree-children">
                    <div
                      v-for="(item, index) in items"
                      :key="index"
                      class="tree-node"
                    >
                      <span class="tag">&lt;li&gt;</span>
                      <span class="text">{{ item }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        class="btn-primary"
        @click="modifyTitle"
      >
        修改标题
      </button>
      <button
        class="btn-secondary"
        @click="addItem"
      >
        添加列表项
      </button>
      <button
        class="btn-secondary"
        @click="changeColor"
      >
        改变段落颜色
      </button>
      <button
        class="btn-danger"
        @click="removeItem"
      >
        删除列表项
      </button>
    </div>

    <div class="code-display">
      <h4>对应代码</h4>
      <pre><code v-if="title === 'Hello World!'">document.querySelector('h1').textContent = '{{ title }}'</code>
      <code v-else-if="paragraphColor === 'red'">document.querySelector('p').style.color = '{{ paragraphColor }}'</code>
      <code v-else>点击上方按钮查看对应代码</code></pre>
    </div>
  </div>
</template>

<style scoped>
.dom-tree-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
}

.webpage-preview {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.browser-bar {
  background: #f0f0f0;
  padding: 8px;
  border-bottom: 1px solid var(--vp-c-border);
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red {
  background: #ff5f56;
}

.dot.yellow {
  background: #ffbd2e;
}

.dot.green {
  background: #27c93f;
}

.webpage-content {
  padding: 16px;
  background: white;
  color: black;
}

.webpage-content h1 {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
}

.webpage-content p {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.webpage-content ul {
  margin: 0;
  padding-left: 20px;
}

.webpage-content li {
  font-size: 14px;
  margin-bottom: 4px;
}

.dom-tree {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  overflow-x: auto;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.tree-children {
  margin-left: 20px;
  border-left: 2px solid var(--vp-c-border);
  padding-left: 12px;
}

.tag {
  color: var(--vp-c-brand-1);
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.text {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.tree-node.active {
  background: rgba(62, 175, 124, 0.1);
  border-radius: 4px;
  padding: 4px 8px;
  animation: highlight 1s ease;
}

@keyframes highlight {
  0%, 100% { background: transparent; }
  50% { background: rgba(62, 175, 124, 0.2); }
}

.controls {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft-hover);
}

.btn-danger {
  background: #f56565;
  color: white;
}

.btn-danger:hover {
  background: #e53e3e;
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-display h4 {
  color: #d4d4d4;
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
