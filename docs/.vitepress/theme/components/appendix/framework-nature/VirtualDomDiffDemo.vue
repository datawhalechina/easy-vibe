<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">虚拟 DOM Diff 过程</span>
      <span class="subtitle">最小化 DOM 更新的核心机制</span>
    </div>

    <div class="control-panel">
      <button
        class="action-btn"
        :disabled="isModified"
        @click="modifyData"
      >
        修改数据
      </button>
      <button
        class="outline-btn"
        :disabled="!isModified"
        @click="reset"
      >
        重置
      </button>
    </div>

    <div class="visualization-area">
      <div class="columns-row">
        <div class="column">
          <div class="column-title">Old VTree</div>
          <div class="tree-container">
            <div class="tree-node tree-root">div.app</div>
            <div class="tree-children">
              <div class="tree-node">h1: 待办清单</div>
              <div class="tree-node">ul.list</div>
              <div class="tree-children">
                <div class="tree-node">li: 学习 Vue</div>
                <div class="tree-node">li: 写作业</div>
                <div class="tree-node">li: 打游戏</div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="column-title">Diff Result</div>
          <div v-if="isModified" class="diff-badges">
            <span class="badge badge-modified">修改: 1 个节点</span>
            <span class="badge badge-new">新增: 1 个节点</span>
          </div>
          <div class="tree-container">
            <div class="tree-node tree-root">div.app</div>
            <div class="tree-children">
              <div class="tree-node node-unchanged">h1: 待办清单</div>
              <div class="tree-node node-unchanged">ul.list</div>
              <div class="tree-children">
                <div
                  :class="[
                    'tree-node',
                    isModified && 'node-unchanged'
                  ]"
                >
                  li: 学习 Vue
                </div>
                <div
                  :class="[
                    'tree-node',
                    isModified && 'node-modified'
                  ]"
                >
                  li: {{ isModified ? '写代码' : '写作业' }}
                </div>
                <div
                  :class="[
                    'tree-node',
                    isModified && 'node-unchanged'
                  ]"
                >
                  li: 打游戏
                </div>
                <div
                  v-if="isModified"
                  class="tree-node node-new"
                >
                  li: 看电影
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="column-title">Real DOM</div>
          <div class="real-dom-preview">
            <div class="dom-root">
              <div class="dom-node">div.app</div>
              <div class="dom-children">
                <div class="dom-node">h1: 待办清单</div>
                <ul class="dom-list">
                  <li>学习 Vue</li>
                  <li :class="{ 'dom-changed': isModified }">
                    {{ isModified ? '写代码' : '写作业' }}
                  </li>
                  <li>打游戏</li>
                  <li
                    v-if="isModified"
                    class="dom-new"
                  >
                    看电影
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="metrics-row">
        <div class="metric-card">
          <div class="metric-value">7</div>
          <div class="metric-label">虚拟 DOM 节点总数</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ isModified ? '2' : '0' }}</div>
          <div class="metric-label">需要更新的真实 DOM</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ isModified ? '71%' : '—' }}</div>
          <div class="metric-label">节省的 DOM 操作</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      虚拟 DOM 先在内存中对比新旧两棵树，找出最小差异，然后只更新必要的真实 DOM 节点——避免了大量无效操作。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isModified = ref(false)

function modifyData() {
  if (isModified.value) return
  isModified.value = true
}

function reset() {
  isModified.value = false
}
</script>

<style scoped>
.demo-root {
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
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.control-panel {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.action-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.85rem;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.outline-btn {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.85rem;
}

.outline-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.outline-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.visualization-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.columns-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.column {
  min-width: 0;
}

.column-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.tree-container {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.5rem;
  min-height: 6rem;
}

.diff-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.badge {
  font-size: 0.72rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.badge-modified {
  background: rgba(255, 206, 86, 0.2);
  border: 1px solid var(--vp-c-warning-1);
  color: var(--vp-c-warning-1);
}

.badge-new {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid var(--vp-c-green-1);
  color: var(--vp-c-green-1);
}

.real-dom-preview {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.5rem;
}

.dom-root {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
}

.dom-node {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  margin: 0.2rem 0;
}

.dom-children {
  margin-left: 1rem;
}

.dom-list {
  list-style: none;
  padding-left: 0;
  margin: 0.25rem 0;
}

.dom-list li {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  margin: 0.2rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.dom-changed {
  border-color: var(--vp-c-warning-1);
  background: rgba(255, 206, 86, 0.1);
  animation: flash 0.5s ease;
}

.dom-new {
  border-color: var(--vp-c-green-1);
  background: rgba(16, 185, 129, 0.1);
  animation: fadeIn 0.4s ease;
}

@keyframes flash {
  0%,
  100% {
    background: rgba(255, 206, 86, 0.1);
  }
  50% {
    background: rgba(255, 206, 86, 0.25);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.metric-card {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.metric-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

.tree-container .tree-node {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
  margin: 0.2rem 0;
}

.tree-container .tree-node.node-modified {
  border-color: var(--vp-c-warning-1);
  background: rgba(255, 206, 86, 0.1);
}

.tree-container .tree-node.node-new {
  border-color: var(--vp-c-green-1);
  background: rgba(16, 185, 129, 0.1);
}

.tree-container .tree-node.node-unchanged {
  opacity: 0.5;
}

.tree-children {
  margin-left: 1rem;
}

@media (max-width: 720px) {
  .columns-row {
    grid-template-columns: 1fr;
  }

  .metrics-row {
    grid-template-columns: 1fr;
  }
}
</style>
