<template>
  <div class="dom-render-tree-demo">
    <div class="demo-header">
      <span class="icon">🌲</span>
      <span class="title">DOM到渲染树</span>
      <span class="subtitle">浏览器如何构建渲染树</span>
    </div>

    <div class="intro-text">
      浏览器需要把 HTML 和 CSS 合并成一棵"渲染树"。想象你在<span class="highlight">组装家具</span>：图纸是 DOM，说明书是 CSSOM，只有结合两者，才能知道每个零件长什么样、放在哪里。
    </div>

    <div class="demo-content">
      <div class="trees-container">
        <div class="tree-section">
          <div class="tree-title">
            DOM树
          </div>
          <div class="tree dom-tree">
            <div class="tree-node">
              <span class="node-tag">&lt;html&gt;</span>
              <div class="node-children">
                <div class="tree-node">
                  <span class="node-tag">&lt;head&gt;</span>
                  <div class="node-children">
                    <div class="tree-node">
                      <span class="node-tag">&lt;style&gt;</span>
                    </div>
                  </div>
                </div>
                <div class="tree-node">
                  <span class="node-tag">&lt;body&gt;</span>
                  <div class="node-children">
                    <div class="tree-node">
                      <span class="node-tag highlight-node">&lt;div&gt;</span>
                    </div>
                    <div class="tree-node">
                      <span class="node-tag">&lt;span&gt;</span>
                      <div class="node-children">
                        <div class="tree-node">
                          <span class="node-tag hidden-node">&lt;script&gt;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="plus-sign">
          +
        </div>

        <div class="tree-section">
          <div class="tree-title">
            CSSOM树
          </div>
          <div class="tree cssom-tree">
            <div class="tree-node">
              <span class="node-tag">body</span>
              <div class="node-children">
                <div class="tree-node">
                  <span class="node-tag">div</span>
                  <div class="node-children">
                    <div class="tree-node">
                      <span class="node-prop">color: red</span>
                    </div>
                  </div>
                </div>
                <div class="tree-node">
                  <span class="node-tag">span</span>
                  <div class="node-children">
                    <div class="tree-node">
                      <span class="node-prop">display: block</span>
                    </div>
                  </div>
                </div>
                <div class="tree-node">
                  <span class="node-tag">script</span>
                  <div class="node-children">
                    <div class="tree-node">
                      <span class="node-prop">display: none</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="equal-sign">
          =
        </div>

        <div class="tree-section">
          <div class="tree-title">
            渲染树
          </div>
          <div class="tree render-tree">
            <div class="tree-node">
              <span class="node-tag render-node">div</span>
              <div class="node-children">
                <div class="tree-node">
                  <span class="node-tag render-node">span</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="legend">
        <div class="legend-item">
          <span class="legend-dot highlight-node" />
          <span class="legend-text">可见节点</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot hidden-node" />
          <span class="legend-text">不可见节点（不包含在渲染树中）</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心要点：</strong>渲染树只包含可见的节点（display: none 的元素会被忽略）。每个渲染树节点都包含对应的 DOM 节点和计算出的样式信息。渲染树构建完成后，浏览器才能进入布局阶段。
    </div>
  </div>
</template>

<script setup>
// No reactive state needed for this demo
</script>

<style scoped>
.dom-render-tree-demo {
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

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.trees-container {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tree-section {
  flex: 1;
  min-width: 140px;
}

.tree-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-align: center;
}

.tree {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  min-height: 180px;
  font-size: 0.75rem;
}

.tree-node {
  position: relative;
  padding-left: 0.75rem;
}

.node-children {
  padding-left: 0.75rem;
  border-left: 1px solid var(--vp-c-divider);
  margin-left: 0.5rem;
}

.node-tag {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: var(--vp-c-text-1);
}

.node-prop {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.65rem;
  color: var(--vp-c-brand-1);
}

.highlight-node {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.hidden-node {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  text-decoration: line-through;
}

.render-node {
  background: var(--vp-c-brand);
  color: white;
}

.plus-sign, .equal-sign {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
  padding-top: 2rem;
}

.legend {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-dot.highlight-node {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
}

.legend-dot.hidden-node {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-text-3);
}

.legend-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
