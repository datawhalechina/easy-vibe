<template>
  <div class="graph-structure-demo">
    <div class="demo-header">
      <span class="icon">🕸️</span>
      <span class="title">图结构：复杂关系的表示</span>
      <span class="subtitle">节点和边的网络</span>
    </div>

    <div class="graph-types">
      <div class="type-selector">
        <button
          :class="['type-btn', { active: graphType === 'undirected' }]"
          @click="graphType = 'undirected'"
        >
          无向图
        </button>
        <button
          :class="['type-btn', { active: graphType === 'directed' }]"
          @click="graphType = 'directed'"
        >
          有向图
        </button>
        <button
          :class="['type-btn', { active: graphType === 'weighted' }]"
          @click="graphType = 'weighted'"
        >
          带权图
        </button>
      </div>
    </div>

    <div class="graph-visualization">
      <svg viewBox="0 0 400 300" class="graph-svg">
        <!-- 连接线 -->
        <line
          v-for="edge in edges"
          :key="edge.id"
          :x1="nodes[edge.from].x"
          :y1="nodes[edge.from].y"
          :x2="nodes[edge.to].x"
          :y2="nodes[edge.to].y"
          :stroke="edge.weight ? '#3b82f6' : 'var(--vp-c-divider)'"
          :stroke-width="edge.weight ? '3' : '2'"
          :marker-end="graphType === 'directed' ? 'url(#arrow)' : ''"
        />

        <!-- 箭头定义 -->
        <defs v-if="graphType === 'directed'">
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="20"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--vp-c-divider)" />
          </marker>
        </defs>

        <!-- 节点 -->
        <g
          v-for="(node, index) in nodes"
          :key="index"
          class="graph-node"
          @click="selectedNode = index"
        >
          <circle
            :cx="node.x"
            :cy="node.y"
            r="20"
            :fill="selectedNode === index ? 'var(--vp-c-brand)' : 'var(--vp-c-brand-soft)'"
            stroke="var(--vp-c-brand)"
            stroke-width="2"
          />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="white"
            font-size="12"
            font-weight="600"
          >
            {{ node.label }}
          </text>
        </g>
      </svg>
    </div>

    <div class="graph-info">
      <div class="info-title">图的特点</div>
      <div class="info-grid">
        <div class="info-item">
          <div class="item-label">节点 (V)</div>
          <div class="item-value">{{ nodes.length }}</div>
        </div>
        <div class="info-item">
          <div class="item-label">边 (E)</div>
          <div class="item-value">{{ edges.length }}</div>
        </div>
        <div class="info-item">
          <div class="item-label">度</div>
          <div class="item-value">{{ averageDegree }}</div>
        </div>
      </div>
    </div>

    <div class="applications">
      <div class="app-title">应用场景</div>
      <div class="app-list">
        <div class="app-item">
          <span class="app-icon">🗺️</span>
          <span class="app-text">地图导航（最短路径）</span>
        </div>
        <div class="app-item">
          <span class="app-icon">👥</span>
          <span class="app-text">社交网络（好友关系）</span>
        </div>
        <div class="app-item">
          <span class="app-icon">🌐</span>
          <span class="app-text">网页链接（PageRank）</span>
        </div>
        <div class="app-item">
          <span class="app-icon">🔗</span>
          <span class="app-text">依赖关系（包管理）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const graphType = ref('undirected')
const selectedNode = ref(null)

const nodes = [
  { label: 'A', x: 200, y: 50 },
  { label: 'B', x: 100, y: 130 },
  { label: 'C', x: 300, y: 130 },
  { label: 'D', x: 100, y: 250 },
  { label: 'E', x: 300, y: 250 }
]

const edges = ref([
  { id: 1, from: 0, to: 1 },
  { id: 2, from: 0, to: 2 },
  { id: 3, from: 1, to: 2 },
  { id: 4, from: 1, to: 3 },
  { id: 5, from: 2, to: 4 },
  { id: 6, from: 3, to: 4 }
])

const averageDegree = computed(() => {
  return (edges.value.length * 2 / nodes.length).toFixed(1)
})
</script>

<style scoped>
.graph-structure-demo {
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

.graph-types {
  margin-bottom: 2rem;
}

.type-selector {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.type-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.type-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.graph-visualization {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.graph-svg {
  width: 100%;
  height: auto;
}

.graph-node {
  cursor: pointer;
}

.graph-node circle {
  transition: all 0.3s;
}

.graph-node:hover circle {
  r: 25;
}

.graph-info {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.info-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.info-item {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.item-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.item-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.applications {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.app-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.app-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.app-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.app-icon {
  font-size: 1.3rem;
}

.app-text {
  font-size: 0.85rem;
}
</style>
