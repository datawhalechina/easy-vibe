<!--
  DependencyGraphDemo.vue
  依赖图谱可视化演示

  用途：
  展示前端项目的依赖关系图，帮助理解模块如何相互引用。

  交互功能：
  - 图谱可视化：以力导向图展示模块依赖关系
  - 节点交互：悬停/点击节点查看详情
  - 路径追踪：高亮显示两个模块间的依赖路径
  - 布局切换：切换不同的图谱布局方式
-->
<template>
  <div class="dependency-graph-demo">
    <div class="control-panel">
      <div class="title-section">
        <span class="icon">🕸️</span>
        <span class="title">依赖图谱</span>
        <span class="subtitle">模块依赖关系可视化</span>
      </div>

      <div class="controls">
        <div class="layout-control">
          <label>布局:</label>
          <select v-model="currentLayout">
            <option value="force">力导向图</option>
            <option value="circular">环形布局</option>
            <option value="hierarchical">层次布局</option>
          </select>
        </div>

        <button class="control-btn" @click="resetGraph">
          ↺ 重置视图
        </button>

        <button class="control-btn outline" @click="toggleAnimation">
          {{ isAnimating ? '⏸ 暂停' : '▶ 动画' }}
        </button>
      </div>
    </div>

    <div class="graph-container" ref="graphContainer">
      <svg
        class="graph-svg"
        :viewBox="`0 0 ${width} ${height}`"
        @wheel.prevent="handleZoom"
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
      >
        <!-- 网格背景 -->
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--vp-c-divider)"
              stroke-width="0.5"
            />
          </pattern>

          <!-- 箭头标记 -->
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="20"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="var(--vp-c-text-3)"
            />
          </marker>

          <!-- 高亮箭头 -->
          <marker
            id="arrowhead-highlight"
            markerWidth="10"
            markerHeight="7"
            refX="20"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="var(--vp-c-brand)"
            />
          </marker>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        <!-- 连线 -->
        <g class="edges">
          <line
            v-for="edge in edges"
            :key="`${edge.source}-${edge.target}`"
            :x1="getNode(edge.source).x"
            :y1="getNode(edge.source).y"
            :x2="getNode(edge.target).x"
            :y2="getNode(edge.target).y"
            :stroke="edge.highlighted ? 'var(--vp-c-brand)' : 'var(--vp-c-text-3)'"
            :stroke-width="edge.highlighted ? 3 : 1.5"
            :marker-end="edge.highlighted ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'"
            class="edge-line"
          />
        </g>

        <!-- 节点 -->
        <g class="nodes">
          <g
            v-for="node in nodes"
            :key="node.id"
            :transform="`translate(${node.x}, ${node.y})`"
            class="node"
            :class="{
              selected: selectedNode === node.id,
              highlighted: node.highlighted,
              entry: node.type === 'entry'
            }"
            @mouseenter="highlightNode(node.id)"
            @mouseleave="unhighlightNode"
            @click="selectNode(node.id)"
          >
            <!-- 节点外圈 -->
            <circle
              :r="node.size + 4"
              :fill="node.color"
              opacity="0.2"
              class="node-glow"
            />

            <!-- 节点主体 -->
            <circle
              :r="node.size"
              :fill="node.color"
              stroke="white"
              stroke-width="2"
              class="node-circle"
            />

            <!-- 节点图标 -->
            <text
              y="4"
              text-anchor="middle"
              fill="white"
              font-size="14"
              class="node-icon"
            >
              {{ node.icon }}
            </text>

            <!-- 节点标签 -->
            <text
              :y="node.size + 18"
              text-anchor="middle"
              :fill="selectedNode === node.id ? 'var(--vp-c-brand)' : 'var(--vp-c-text-1)'"
              font-size="11"
              font-weight="500"
              class="node-label"
            >
              {{ node.name }}
            </text>
          </g>
        </g>
      </svg>

      <!-- 缩放控制 -->
      <div class="zoom-controls">
        <button class="zoom-btn" @click="zoomIn">+</button>
        <span class="zoom-level">{{ Math.round(zoom * 100) }}%</span>
        <button class="zoom-btn" @click="zoomOut">-</button>
      </div>
    </div>

    <!-- 节点详情面板 -->
    <div v-if="selectedNodeData" class="node-details">
      <div class="detail-header">
        <span
          class="detail-icon"
          :style="{ background: selectedNodeData.color }"
        >{{ selectedNodeData.icon }}</span>
        <div class="detail-title-wrap">
          <span class="detail-title">{{ selectedNodeData.name }}</span>
          <span class="detail-type">{{ selectedNodeData.type === 'entry' ? '入口文件' : '模块' }}</span>
        </div>
        <button class="close-btn" @click="selectedNode = null">×</button>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <h4>📦 依赖信息</h4>
          <div class="deps-info">
            <div class="deps-count">
              <span class="count-label">引入:</span>
              <span class="count-value">{{ selectedNodeData.dependencies?.length || 0 }} 个模块</span>
            </div>
            <div class="deps-count">
              <span class="count-label">被引用:</span>
              <span class="count-value">{{ getIncomingDeps(selectedNodeData.id).length }} 个模块</span>
            </div>
          </div>
        </div>

        <div class="detail-section" v-if="selectedNodeData.dependencies?.length">
          <h4>🔗 引用的模块</h4>
          <div class="deps-list">
            <span
              v-for="depId in selectedNodeData.dependencies"
              :key="depId"
              class="dep-tag"
              :style="{ background: getNode(depId)?.color || 'var(--vp-c-brand)' }"
              @click="selectNode(depId)"
            >
              {{ getNode(depId)?.name || depId }}
            </span>
          </div>
        </div>

        <div class="detail-section">
          <h4>📊 模块大小</h4>
          <div class="size-bar">
            <div
              class="size-fill"
              :style="{
                width: `${Math.min((selectedNodeData.size || 0) / 10, 100)}%`,
                background: selectedNodeData.color
              }"
            ></div>
            <span class="size-text">{{ selectedNodeData.size || 0 }} KB</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>依赖图谱的作用：</strong>
        就像地图一样，依赖图谱帮助你理解项目中的模块是如何相互关联的。
        你可以快速找到某个模块被哪些地方引用，或者发现循环依赖等问题。
        在大型项目中，良好的依赖结构是维护性的关键。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const width = 600
const height = 400
const currentView = ref('radar')
const highlightedTool = ref(null)
const selectedNode = ref(null)
const zoom = ref(1)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const panOffset = ref({ x: 0, y: 0 })
const currentLayout = ref('force')
const isAnimating = ref(true)

// 模拟项目依赖数据
const nodes = ref([
  { id: 'main', name: 'main.js', type: 'entry', size: 5, icon: '🚀', color: '#646cff', x: 300, y: 200, dependencies: ['utils', 'components', 'api'] },
  { id: 'utils', name: 'utils.js', type: 'module', size: 12, icon: '🛠️', color: '#ff6b6b', x: 150, y: 100, dependencies: ['helpers'] },
  { id: 'components', name: 'components/', type: 'module', size: 45, icon: '🧩', color: '#4ecdc4', x: 450, y: 120, dependencies: ['utils', 'hooks'] },
  { id: 'api', name: 'api.js', type: 'module', size: 8, icon: '🔌', color: '#ffe66d', x: 200, y: 300, dependencies: ['config'] },
  { id: 'helpers', name: 'helpers.js', type: 'module', size: 6, icon: '🔧', color: '#a8e6cf', x: 80, y: 50, dependencies: [] },
  { id: 'hooks', name: 'hooks.js', type: 'module', size: 15, icon: '⚓', color: '#ff8b94', x: 520, y: 200, dependencies: ['utils'] },
  { id: 'config', name: 'config.js', type: 'module', size: 3, icon: '⚙️', color: '#c7ceea', x: 120, y: 350, dependencies: [] }
])

const edges = computed(() => {
  const edgeList = []
  nodes.value.forEach(node => {
    if (node.dependencies) {
      node.dependencies.forEach(depId => {
        edgeList.push({
          source: node.id,
          target: depId,
          highlighted: false
        })
      })
    }
  })
  return edgeList
})

const selectedNodeData = computed(() => {
  if (!selectedNode.value) return null
  return nodes.value.find(n => n.id === selectedNode.value)
})

const getNode = (id) => nodes.value.find(n => n.id === id)

const getIncomingDeps = (nodeId) => {
  return nodes.value.filter(n => n.dependencies?.includes(nodeId))
}

const selectNode = (id) => {
  selectedNode.value = id
  // 高亮相关边
  edges.value.forEach(edge => {
    edge.highlighted = edge.source === id || edge.target === id
  })
}

const highlightNode = (id) => {
  // 悬停效果
}

const unhighlightNode = () => {
  // 清除悬停效果
}

const zoomIn = () => {
  zoom.value = Math.min(zoom.value * 1.2, 3)
}

const zoomOut = () => {
  zoom.value = Math.max(zoom.value / 1.2, 0.3)
}

const handleZoom = (e) => {
  const delta = e.deltaY > 0 ? 0.9 : 1.1
  zoom.value = Math.max(0.3, Math.min(3, zoom.value * delta))
}

const startDrag = (e) => {
  isDragging.value = true
  dragStart.value = { x: e.clientX - panOffset.value.x, y: e.clientY - panOffset.value.y }
}

const handleDrag = (e) => {
  if (!isDragging.value) return
  panOffset.value = {
    x: e.clientX - dragStart.value.x,
    y: e.clientY - dragStart.value.y
  }
}

const endDrag = () => {
  isDragging.value = false
}

const resetGraph = () => {
  zoom.value = 1
  panOffset.value = { x: 0, y: 0 }
  selectedNode.value = null
  // 重置节点位置
  nodes.value.forEach((node, i) => {
    const angle = (i / nodes.value.length) * 2 * Math.PI
    node.x = 300 + 150 * Math.cos(angle)
    node.y = 200 + 100 * Math.sin(angle)
  })
}

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value
}

const toggleScenario = (id) => {
  expandedScenario.value = expandedScenario.value === id ? null : id
}

// 简化的力导向布局模拟
let animationFrame
const simulateForceLayout = () => {
  if (!isAnimating.value) return

  const centerX = width / 2
  const centerY = height / 2
  const k = 50 // 弹簧常数
  const repulsion = 500 // 斥力

  nodes.value.forEach((node, i) => {
    let fx = 0, fy = 0

    // 向中心的引力
    fx += (centerX - node.x) * 0.01
    fy += (centerY - node.y) * 0.01

    // 节点间的斥力
    nodes.value.forEach((other, j) => {
      if (i === j) return
      const dx = node.x - other.x
      const dy = node.y - other.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const force = repulsion / (dist * dist)
      fx += (dx / dist) * force
      fy += (dy / dist) * force
    })

    // 依赖的弹簧力
    if (node.dependencies) {
      node.dependencies.forEach(depId => {
        const target = nodes.value.find(n => n.id === depId)
        if (target) {
          const dx = target.x - node.x
          const dy = target.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const force = (dist - k) * 0.01
          fx += (dx / dist) * force
          fy += (dy / dist) * force
        }
      })
    }

    // 应用力
    node.x += fx * 0.1
    node.y += fy * 0.1

    // 边界限制
    node.x = Math.max(30, Math.min(width - 30, node.x))
    node.y = Math.max(30, Math.min(height - 30, node.y))
  })

  animationFrame = requestAnimationFrame(simulateForceLayout)
}

onMounted(() => {
  simulateForceLayout()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

// 场景推荐数据
const expandedScenario = ref(null)

const scenarios = [
  {
    id: 'spa',
    icon: '🚀',
    name: '中小型 SPA 项目',
    shortDesc: '单页应用，快速开发',
    bestChoice: 'vite',
    bestReason: 'Vite 的极速冷启动和热更新让开发体验极佳，配置简单，是中小型项目的首选。',
    alternative: 'webpack',
    altReason: '如果需要大量自定义配置或依赖特定的 webpack loader，webpack 仍然是可靠的选择。'
  },
  {
    id: 'library',
    icon: '📚',
    name: 'JavaScript 库/组件库',
    shortDesc: '打包发布 npm 包',
    bestChoice: 'rollup',
    bestReason: 'Rollup 生成的代码最干净，Tree Shaking 效果最好，非常适合打包 JavaScript 库。',
    alternative: 'vite',
    altReason: 'Vite 使用 Rollup 进行生产构建，同时提供更好的开发体验，也是现代库开发的好选择。'
  },
  {
    id: 'enterprise',
    icon: '🏢',
    name: '大型企业级应用',
    shortDesc: '复杂业务，多人协作',
    bestChoice: 'webpack',
    bestReason: 'Webpack 生态最成熟，loader 和 plugin 最丰富，能应对各种复杂场景和定制化需求。',
    alternative: 'vite',
    altReason: '如果团队追求更好的开发体验，且项目不需要太多自定义构建逻辑，Vite 也是值得考虑的选项。'
  },
  {
    id: 'ssg',
    icon: '📝',
    name: '静态站点生成 (SSG)',
    shortDesc: '文档站、博客、营销页',
    bestChoice: 'vite',
    bestReason: 'VitePress、Astro 等现代 SSG 工具都基于 Vite，开发体验好，构建速度快。',
    alternative: 'rollup',
    altReason: '一些轻量级 SSG 工具直接使用 Rollup，如果对产物体积要求极高可以考虑。'
  }
]

const getTool = (id) => bundlers.find(b => b.id === id)

// 简化的布局切换
watch(currentLayout, (newLayout) => {
  // 重置节点位置以演示不同布局
  nodes.value.forEach((node, i) => {
    if (newLayout === 'circular') {
      const angle = (i / nodes.value.length) * 2 * Math.PI
      node.x = 300 + 150 * Math.cos(angle)
      node.y = 200 + 120 * Math.sin(angle)
    } else if (newLayout === 'hierarchical') {
      const level = node.type === 'entry' ? 0 : node.dependencies?.length > 2 ? 1 : 2
      const siblings = nodes.value.filter(n => {
        const nl = n.type === 'entry' ? 0 : n.dependencies?.length > 2 ? 1 : 2
        return nl === level
      })
      const index = siblings.indexOf(node)
      const total = siblings.length
      node.x = 100 + (index + 1) * (400 / (total + 1))
      node.y = 80 + level * 120
    }
  })
})
</script>

<style scoped>
.dependency-graph-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  gap: 1rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-section .icon {
  font-size: 1.5rem;
}

.title-section .title {
  font-weight: bold;
  font-size: 1.1rem;
}

.title-section .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.layout-control {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
}

.layout-control select {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.85rem;
}

.control-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.control-btn.outline {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.control-btn:hover {
  opacity: 0.85;
}

.graph-container {
  position: relative;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  height: 400px;
  overflow: hidden;
}

.graph-svg {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.graph-svg:active {
  cursor: grabbing;
}

.edge-line {
  transition: all 0.3s ease;
}

.node {
  cursor: pointer;
  transition: all 0.3s ease;
}

.node:hover {
  transform: scale(1.1);
}

.node.selected .node-circle {
  stroke: var(--vp-c-brand);
  stroke-width: 4;
}

.node.highlighted .node-glow {
  opacity: 0.5;
}

.node-glow {
  transition: opacity 0.3s ease;
}

.zoom-controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.25rem;
  border: 1px solid var(--vp-c-divider);
}

.zoom-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.zoom-btn:hover {
  background: var(--vp-c-bg-alt);
}

.zoom-level {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 40px;
  text-align: center;
}

.node-details {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.detail-title-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.detail-title {
  font-weight: bold;
  font-size: 1rem;
}

.detail-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.close-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 4px;
}

.close-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  gap: 0.75rem;
}

.detail-section h4 {
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.deps-info {
  display: flex;
  gap: 1rem;
}

.deps-count {
  display: flex;
  flex-direction: column;
}

.count-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.count-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.deps-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.dep-tag {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: white;
  font-size: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.dep-tag:hover {
  opacity: 0.85;
}

.size-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.25rem;
}

.size-fill {
  height: 8px;
  border-radius: 4px;
  transition: width 0.3s ease;
  min-width: 4px;
}

.size-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 50px;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .radar-view {
    grid-template-columns: 1fr;
  }

  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
