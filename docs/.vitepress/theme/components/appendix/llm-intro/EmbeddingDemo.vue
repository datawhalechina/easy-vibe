<!--
  EmbeddingDemo.vue
  词向量空间可视化演示
  
  用途：
  直观展示“词向量”的概念：将词映射到坐标空间中，距离代表相似度。
  展示经典的向量算术：King - Man + Woman ≈ Queen
  
  交互功能：
  - 2D 坐标系展示：预置几组词向量（动物、国家、职业）。
  - 算术演示：用户点击“King - Man + Woman”按钮，动画展示向量移动过程。
  - 缩放/平移：简单的视图控制。
-->
<template>
  <div class="embedding-demo">
    <div class="demo-controls">
      <div class="btn-group">
        <button
          v-for="mode in modes"
          :key="mode.id"
          :class="{ active: currentMode === mode.id }"
          @click="setMode(mode.id)"
        >
          {{ mode.label }}
        </button>
      </div>
      <div class="info-text">
        {{ modes.find((m) => m.id === currentMode)?.desc }}
      </div>
    </div>

    <div class="canvas-container" ref="canvasContainer">
      <!-- 简单的 SVG 坐标系 -->
      <svg viewBox="0 0 400 300" class="vector-canvas">
        <!-- Grid lines -->
        <g class="grid">
          <line
            x1="0"
            y1="150"
            x2="400"
            y2="150"
            stroke="var(--vp-c-divider)"
          />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="300"
            stroke="var(--vp-c-divider)"
          />
        </g>

        <!-- Vectors/Points -->
        <g class="points">
          <g
            v-for="point in activePoints"
            :key="point.id"
            class="point-group"
            :class="{ highlight: point.highlight }"
            :transform="`translate(${point.x}, ${point.y})`"
          >
            <circle r="4" :fill="point.color" />
            <text
              y="-8"
              text-anchor="middle"
              class="point-label"
              :fill="point.color"
            >
              {{ point.word }}
            </text>
          </g>
        </g>

        <!-- Calculation Arrows (for King/Queen demo) -->
        <g v-if="currentMode === 'analogy'" class="arrows">
          <!-- King -> Man -->
          <line
            :x1="getPoint('king').x"
            :y1="getPoint('king').y"
            :x2="getPoint('man').x"
            :y2="getPoint('man').y"
            stroke="rgba(0,0,0,0.2)"
            stroke-dasharray="4"
            marker-end="url(#arrowhead)"
          />
          <!-- Queen -> Woman -->
          <line
            :x1="getPoint('queen').x"
            :y1="getPoint('queen').y"
            :x2="getPoint('woman').x"
            :y2="getPoint('woman').y"
            stroke="var(--vp-c-brand)"
            stroke-width="2"
            marker-end="url(#arrowhead-brand)"
          />
          <text
            x="390"
            y="280"
            text-anchor="end"
            class="math-label"
            fill="var(--vp-c-text-2)"
          >
            King - Man ≈ Queen - Woman
          </text>
        </g>

        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(0,0,0,0.2)" />
          </marker>
          <marker
            id="arrowhead-brand"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--vp-c-brand)" />
          </marker>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentMode = ref('cluster')

const modes = [
  { id: 'cluster', label: '语义聚类', desc: '语义相近的词在空间中距离更近。' },
  {
    id: 'analogy',
    label: '向量算术',
    desc: 'King - Man + Woman ≈ Queen (方向平行)'
  }
]

const basePoints = [
  // Cluster 1: Animals
  { id: 'cat', word: 'Cat', x: 80, y: 80, color: '#f87171', group: 'animal' },
  { id: 'dog', word: 'Dog', x: 100, y: 70, color: '#f87171', group: 'animal' },
  {
    id: 'tiger',
    word: 'Tiger',
    x: 60,
    y: 100,
    color: '#f87171',
    group: 'animal'
  },

  // Cluster 2: Technology
  {
    id: 'computer',
    word: 'Computer',
    x: 300,
    y: 200,
    color: '#60a5fa',
    group: 'tech'
  },
  {
    id: 'phone',
    word: 'Phone',
    x: 320,
    y: 220,
    color: '#60a5fa',
    group: 'tech'
  },
  { id: 'ai', word: 'AI', x: 280, y: 210, color: '#60a5fa', group: 'tech' },

  // Cluster 3: Royalty (Analogy)
  {
    id: 'king',
    word: 'King',
    x: 100,
    y: 200,
    color: '#fbbf24',
    group: 'royal'
  },
  {
    id: 'queen',
    word: 'Queen',
    x: 220,
    y: 200,
    color: '#fbbf24',
    group: 'royal'
  },
  { id: 'man', word: 'Man', x: 100, y: 120, color: '#a78bfa', group: 'gender' },
  {
    id: 'woman',
    word: 'Woman',
    x: 220,
    y: 120,
    color: '#a78bfa',
    group: 'gender'
  }
]

const activePoints = computed(() => {
  if (currentMode.value === 'cluster') {
    return basePoints.filter((p) => ['animal', 'tech'].includes(p.group))
  } else {
    return basePoints.filter((p) => ['royal', 'gender'].includes(p.group))
  }
})

const getPoint = (id) => basePoints.find((p) => p.id === id) || { x: 0, y: 0 }

const setMode = (mode) => {
  currentMode.value = mode
}
</script>

<style scoped>
.embedding-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-controls {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-group {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

button.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.info-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.canvas-container {
  padding: 1rem;
  background-color: var(--vp-c-bg);
  display: flex;
  justify-content: center;
}

.vector-canvas {
  width: 100%;
  max-width: 400px;
  height: 300px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 4px;
}

.point-label {
  font-size: 12px;
  font-weight: 500;
}

.math-label {
  font-size: 12px;
  font-style: italic;
}

.point-group {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
