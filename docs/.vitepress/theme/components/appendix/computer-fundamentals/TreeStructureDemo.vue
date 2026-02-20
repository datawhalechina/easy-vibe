<template>
  <div class="tree-structure-demo">
    <div class="demo-header">
      <span class="icon">🌳</span>
      <span class="title">树形结构：层级关系的表示</span>
      <span class="subtitle">像家谱一样的组织方式</span>
    </div>

    <div class="tree-selector">
      <div class="selector-label">选择树的类型：</div>
      <div class="selector-buttons">
        <button
          v-for="type in treeTypes"
          :key="type.id"
          :class="['type-btn', { active: activeTreeType === type.id }]"
          @click="activeTreeType = type.id"
        >
          {{ type.icon }} {{ type.name }}
        </button>
      </div>
    </div>

    <!-- 二叉搜索树 -->
    <div v-if="activeTreeType === 'binary'" class="tree-display">
      <div class="tree-canvas">
        <svg viewBox="0 0 600 350" class="tree-svg">
          <!-- 连接线 -->
          <line v-for="line in binaryTreeLines" :key="line.id"
            :x1="line.x1" :y1="line.y1"
            :x2="line.x2" :y2="line.y2"
            stroke="var(--vp-c-divider)"
            stroke-width="2"
          />

          <!-- 节点 -->
          <g v-for="node in binaryTreeNodes" :key="node.id"
             :class="['tree-node', { root: node.isRoot, leaf: node.isLeaf }]"
             :style="{ transform: `translate(${node.x}px, ${node.y}px)` }"
          >
            <circle cx="0" cy="0" r="25" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand)" stroke-width="2" />
            <text x="0" y="0" text-anchor="middle" dominant-baseline="middle" fill="var(--vp-c-brand)" font-size="14" font-weight="600">{{ node.value }}</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- 文件系统树 -->
    <div v-if="activeTreeType === 'filesystem'" class="filesystem-tree">
      <div class="fs-root">
        <div class="fs-node root">📁 根目录 /</div>
        <div class="fs-children">
          <div class="fs-branch">
            <div class="fs-node">📁 home</div>
            <div class="fs-children">
              <div class="fs-node">👤 user</div>
              <div class="fs-children">
                <div class="fs-node">📄 document.txt</div>
                <div class="fs-node">🖼️ photo.jpg</div>
              </div>
            </div>
          </div>
          <div class="fs-branch">
            <div class="fs-node">📁 var</div>
            <div class="fs-children">
              <div class="fs-node">📁 www</div>
              <div class="fs-children">
                <div class="fs-node">📄 index.html</div>
                <div class="fs-node">📄 style.css</div>
              </div>
            </div>
          </div>
          <div class="fs-branch">
            <div class="fs-node">📁 etc</div>
            <div class="fs-children">
              <div class="fs-node">📄 config.conf</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DOM 树 -->
    <div v-if="activeTreeType === 'dom'" class="dom-tree">
      <div class="dom-preview">
        <div class="preview-title">HTML 结构</div>
        <div class="preview-html">
&lt;html&gt;
  &lt;body&gt;
    &lt;div class="container"&gt;
      &lt;h1&gt;标题&lt;/h1&gt;
      &lt;p&gt;段落&lt;/p&gt;
    &lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;
        </div>
      </div>
      <div class="dom-structure">
        <div class="structure-title">DOM 树结构</div>
        <div class="tree-nested">
          <div class="dom-node root">
            <span class="node-tag">html</span>
            <div class="dom-children">
              <div class="dom-node">
                <span class="node-tag">body</span>
                <div class="dom-children">
                  <div class="dom-node">
                    <span class="node-tag">div</span>
                    <span class="node-class">.container</span>
                    <div class="dom-children">
                      <div class="dom-node">
                        <span class="node-tag">h1</span>
                        <span class="node-text">"标题"</span>
                      </div>
                      <div class="dom-node">
                        <span class="node-tag">p</span>
                        <span class="node-text">"段落"</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 树的特点 -->
    <div class="tree-features">
      <div class="features-title">树形结构的特点</div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🌲</div>
          <div class="feature-title">层级关系</div>
          <div class="feature-desc">节点之间是一对多的父子关系</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <div class="feature-title">单一根节点</div>
          <div class="feature-desc">除根节点外，每个节点只有一个父节点</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <div class="feature-title">高效查找</div>
          <div class="feature-desc">二叉搜索树的查找时间是 O(log n)</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔄</div>
          <div class="feature-title">多种遍历</div>
          <div class="feature-desc">前序、中序、后序、层序遍历</div>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="applications">
      <div class="app-title">应用场景</div>
      <div class="app-list">
        <div class="app-item">
          <span class="app-icon">📁</span>
          <div class="app-content">
            <div class="app-name">文件系统</div>
            <div class="app-desc">文件夹和文件的层级组织</div>
          </div>
        </div>
        <div class="app-item">
          <span class="app-icon">🌐</span>
          <div class="app-content">
            <div class="app-name">HTML DOM</div>
            <div class="app-desc">网页元素的嵌套结构</div>
          </div>
        </div>
        <div class="app-item">
          <span class="app-icon">🏢</span>
          <div class="app-content">
            <div class="app-name">组织架构</div>
            <div class="app-desc">公司的管理层级关系</div>
          </div>
        </div>
        <div class="app-item">
          <span class="app-icon">🌲</span>
          <div class="app-content">
            <div class="app-name">决策树</div>
            <div class="app-desc">机器学习的分类算法</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTreeType = ref('binary')

const treeTypes = [
  { id: 'binary', name: '二叉搜索树', icon: '🌳' },
  { id: 'filesystem', name: '文件系统', icon: '📁' },
  { id: 'dom', name: 'DOM 树', icon: '🌐' }
]

const binaryTreeNodes = [
  { id: 1, value: 50, x: 300, y: 40, isRoot: true },
  { id: 2, value: 30, x: 180, y: 120 },
  { id: 3, value: 70, x: 420, y: 120 },
  { id: 4, value: 20, x: 100, y: 200, isLeaf: true },
  { id: 5, value: 40, x: 260, y: 200, isLeaf: true },
  { id: 6, value: 60, x: 340, y: 200, isLeaf: true },
  { id: 7, value: 80, x: 500, y: 200, isLeaf: true }
]

const binaryTreeLines = [
  { id: 1, x1: 300, y1: 65, x2: 180, y2: 95 },
  { id: 2, x1: 300, y1: 65, x2: 420, y2: 95 },
  { id: 3, x1: 180, y1: 145, x2: 100, y2: 175 },
  { id: 4, x1: 180, y1: 145, x2: 260, y2: 175 },
  { id: 5, x1: 420, y1: 145, x2: 340, y2: 175 },
  { id: 6, x1: 420, y1: 145, x2: 500, y2: 175 }
]
</script>

<style scoped>
.tree-structure-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.tree-selector {
  margin-bottom: 2rem;
}

.selector-label {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.selector-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.type-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.type-btn:hover {
  border-color: var(--vp-c-brand);
}

.type-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.tree-display {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.tree-canvas {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.tree-svg {
  width: 100%;
  height: auto;
}

.tree-node circle {
  transition: all 0.3s;
}

.tree-node:hover circle {
  fill: var(--vp-c-brand);
  stroke-width: 3;
}

.filesystem-tree {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.fs-root {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fs-node {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.9rem;
}

.fs-node.root {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  font-weight: 600;
}

.fs-children {
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dom-tree {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .dom-tree {
    grid-template-columns: 1fr;
  }
}

.dom-preview {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.preview-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.preview-html {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 6px;
}

.dom-structure {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.structure-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.tree-nested {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dom-node {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.dom-children {
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.node-tag {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.node-class {
  padding: 0.25rem 0.5rem;
  background: #f59e0b;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
}

.node-text {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-style: italic;
}

.tree-features {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.features-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
}

.feature-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.applications {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.app-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.app-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.app-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.app-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.app-content {
  flex: 1;
}

.app-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.app-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
