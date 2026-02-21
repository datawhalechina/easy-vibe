<template>
  <div class="what-is-dom-demo">
    <div class="demo-header">
      <span class="title">HTML → DOM 树</span>
      <span class="subtitle">浏览器如何理解你写的 HTML</span>
    </div>

    <div class="demo-body">
      <div class="html-panel">
        <div class="panel-title">你写的 HTML 代码</div>
        <div class="code-display">
          <div
            v-for="(line, i) in htmlLines"
            :key="i"
            :class="['code-line', { highlighted: highlightedTag === line.tag }]"
            @mouseenter="highlightedTag = line.tag"
            @mouseleave="highlightedTag = ''"
          >
            <span class="line-num">{{ i + 1 }}</span>
            <span class="line-code" :style="{ paddingLeft: line.indent * 12 + 'px' }">{{ line.text }}</span>
          </div>
        </div>
      </div>

      <div class="arrow-col">
        <div class="arrow-label">浏览器解析</div>
        <div class="arrow-icon">→</div>
      </div>

      <div class="tree-panel">
        <div class="panel-title">浏览器生成的 DOM 树</div>
        <div class="tree-display">
          <div
            v-for="node in treeNodes"
            :key="node.id"
            :class="['tree-node', { highlighted: highlightedTag === node.tag }]"
            :style="{ marginLeft: node.depth * 20 + 'px' }"
            @mouseenter="highlightedTag = node.tag"
            @mouseleave="highlightedTag = ''"
          >
            <span class="connector" v-if="node.depth > 0">└─</span>
            <span class="node-tag">{{ node.label }}</span>
            <span v-if="node.text" class="node-text">"{{ node.text }}"</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dom-explain">
      <div class="explain-item">
        <span class="explain-icon">📄</span>
        <div class="explain-content">
          <strong>节点（Node）</strong>
          <span>DOM 树上的每一个方块就是一个节点。每个 HTML 标签（如 <code>&lt;h1&gt;</code>、<code>&lt;p&gt;</code>）都对应一个节点。</span>
        </div>
      </div>
      <div class="explain-item">
        <span class="explain-icon">🌳</span>
        <div class="explain-content">
          <strong>父子关系</strong>
          <span>标签嵌套在另一个标签里面，在 DOM 树上就是父节点和子节点的关系。<code>&lt;body&gt;</code> 里包含 <code>&lt;h1&gt;</code>，所以 body 是 h1 的父节点。</span>
        </div>
      </div>
      <div class="explain-item">
        <span class="explain-icon">✏️</span>
        <div class="explain-content">
          <strong>DOM 操作</strong>
          <span>JavaScript 可以增加、删除、修改 DOM 树上的节点。修改节点后，浏览器会重新计算布局并重新绘制页面，这就是"DOM 操作"。</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>关键概念：</strong>
      <span>DOM 是浏览器在内存中维护的一棵树，它和你写的 HTML 一一对应。JavaScript 无法直接修改 HTML 文件，它修改的是这棵 DOM 树——浏览器再根据 DOM 树的变化更新屏幕上的显示。</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const highlightedTag = ref('')

const htmlLines = [
  { text: '<html>', indent: 0, tag: 'html' },
  { text: '<body>', indent: 1, tag: 'body' },
  { text: '<h1>我的购物车</h1>', indent: 2, tag: 'h1' },
  { text: '<p>共 3 件商品</p>', indent: 2, tag: 'p' },
  { text: '<ul>', indent: 2, tag: 'ul' },
  { text: '<li>耳机</li>', indent: 3, tag: 'li1' },
  { text: '<li>键盘</li>', indent: 3, tag: 'li2' },
  { text: '<li>鼠标</li>', indent: 3, tag: 'li3' },
  { text: '</ul>', indent: 2, tag: 'ul' },
  { text: '<button>结算</button>', indent: 2, tag: 'btn' },
  { text: '</body>', indent: 1, tag: 'body' },
  { text: '</html>', indent: 0, tag: 'html' }
]

const treeNodes = [
  { id: 1, label: 'html', depth: 0, tag: 'html' },
  { id: 2, label: 'body', depth: 1, tag: 'body' },
  { id: 3, label: 'h1', depth: 2, tag: 'h1', text: '我的购物车' },
  { id: 4, label: 'p', depth: 2, tag: 'p', text: '共 3 件商品' },
  { id: 5, label: 'ul', depth: 2, tag: 'ul' },
  { id: 6, label: 'li', depth: 3, tag: 'li1', text: '耳机' },
  { id: 7, label: 'li', depth: 3, tag: 'li2', text: '键盘' },
  { id: 8, label: 'li', depth: 3, tag: 'li3', text: '鼠标' },
  { id: 9, label: 'button', depth: 2, tag: 'btn', text: '结算' }
]
</script>

<style scoped>
.what-is-dom-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: 600;
}

.demo-header .subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.demo-body {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.html-panel,
.tree-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
}

.panel-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-display {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-line {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  cursor: default;
  transition: background 0.15s;
}

.code-line.highlighted {
  background: rgba(59, 130, 246, 0.1);
}

.line-num {
  color: var(--vp-c-text-3);
  font-size: 0.65rem;
  min-width: 1rem;
  text-align: right;
  flex-shrink: 0;
  user-select: none;
}

.line-code {
  color: var(--vp-c-text-1);
}

.arrow-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding-top: 1.5rem;
}

.arrow-label {
  font-size: 0.68rem;
  color: var(--vp-c-text-2);
  writing-mode: vertical-rl;
  white-space: nowrap;
}

.arrow-icon {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.tree-display {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.7;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  cursor: default;
  transition: background 0.15s;
}

.tree-node.highlighted {
  background: rgba(59, 130, 246, 0.1);
}

.connector {
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
  flex-shrink: 0;
}

.node-tag {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  padding: 0 0.3rem;
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--vp-c-brand);
}

.tree-node.highlighted .node-tag {
  border-color: var(--vp-c-brand);
}

.node-text {
  color: var(--vp-c-text-2);
  font-size: 0.7rem;
}

.dom-explain {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.explain-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  display: flex;
  gap: 0.4rem;
}

.explain-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.explain-content {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.explain-content strong {
  display: block;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
  font-size: 0.8rem;
}

.explain-content code {
  background: var(--vp-c-bg-alt);
  padding: 0 0.2rem;
  border-radius: 2px;
  font-size: 0.72rem;
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

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .demo-body {
    grid-template-columns: 1fr;
  }
  .arrow-col {
    flex-direction: row;
    padding-top: 0;
  }
  .arrow-label {
    writing-mode: horizontal-tb;
  }
  .dom-explain {
    grid-template-columns: 1fr;
  }
}
</style>
