<!--
  VectorSimilarityDemo.vue
  向量相似度交互演示组件

  用途：
  交互式展示余弦相似度和欧氏距离的计算过程，用户可拖动点观察相似度变化。

  交互功能：
  - 拖动两个向量端点
  - 实时计算余弦相似度和欧氏距离
  - 切换度量方式查看差异
-->
<template>
  <div class="similarity-demo">
    <div class="demo-header">
      <h4>向量相似度计算器</h4>
      <p class="desc">拖动向量端点，观察不同相似度指标的实时变化</p>
    </div>

    <div class="metric-tabs">
      <button
        v-for="m in metrics"
        :key="m.key"
        class="metric-btn"
        :class="{ active: activeMetric === m.key }"
        @click="activeMetric = m.key"
      >
        {{ m.label }}
      </button>
    </div>

    <div class="canvas-area">
      <svg
        ref="svgEl"
        viewBox="0 0 460 360"
        class="sim-svg"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
      >
        <!-- 网格 -->
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--vp-c-divider)" stroke-width="0.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect x="30" y="10" width="400" height="320" fill="url(#grid)" />

        <!-- 坐标轴 -->
        <line x1="230" y1="10" x2="230" y2="330" stroke="var(--vp-c-divider)" stroke-width="1" />
        <line x1="30" y1="170" x2="430" y2="170" stroke="var(--vp-c-divider)" stroke-width="1" />

        <!-- 夹角弧线 (余弦相似度模式) -->
        <path
          v-if="activeMetric === 'cosine'"
          :d="anglePath"
          fill="none"
          stroke="var(--vp-c-brand)"
          stroke-width="1.5"
          stroke-dasharray="3 2"
          opacity="0.6"
        />

        <!-- 距离线 (欧氏距离模式) -->
        <line
          v-if="activeMetric === 'euclidean'"
          :x1="vecA.x" :y1="vecA.y"
          :x2="vecB.x" :y2="vecB.y"
          stroke="#ef4444"
          stroke-width="2"
          stroke-dasharray="6 3"
          opacity="0.7"
        />

        <!-- 向量 A -->
        <line x1="230" y1="170" :x2="vecA.x" :y2="vecA.y" stroke="#3b82f6" stroke-width="2.5" />
        <polygon :points="arrowHead(230, 170, vecA.x, vecA.y)" fill="#3b82f6" />
        <circle
          :cx="vecA.x" :cy="vecA.y" r="10"
          fill="#3b82f6" stroke="#fff" stroke-width="2"
          class="drag-handle"
          @mousedown.prevent="startDrag('A')"
        />
        <text :x="vecA.x + 14" :y="vecA.y - 8" fill="#3b82f6" font-size="13" font-weight="600">A</text>

        <!-- 向量 B -->
        <line x1="230" y1="170" :x2="vecB.x" :y2="vecB.y" stroke="#10b981" stroke-width="2.5" />
        <polygon :points="arrowHead(230, 170, vecB.x, vecB.y)" fill="#10b981" />
        <circle
          :cx="vecB.x" :cy="vecB.y" r="10"
          fill="#10b981" stroke="#fff" stroke-width="2"
          class="drag-handle"
          @mousedown.prevent="startDrag('B')"
        />
        <text :x="vecB.x + 14" :y="vecB.y - 8" fill="#10b981" font-size="13" font-weight="600">B</text>

        <!-- 原点标记 -->
        <circle cx="230" cy="170" r="3" fill="var(--vp-c-text-3)" />
      </svg>
    </div>

    <!-- 结果面板 -->
    <div class="results">
      <div class="result-card" :class="{ highlight: activeMetric === 'cosine' }">
        <div class="result-label">余弦相似度</div>
        <div class="result-value">{{ cosineSim.toFixed(4) }}</div>
        <div class="result-bar">
          <div class="bar-fill cosine-bar" :style="{ width: ((cosineSim + 1) / 2 * 100) + '%' }"></div>
        </div>
        <div class="result-range">-1 (相反) ~ 1 (相同)</div>
      </div>
      <div class="result-card" :class="{ highlight: activeMetric === 'euclidean' }">
        <div class="result-label">欧氏距离</div>
        <div class="result-value">{{ euclideanDist.toFixed(2) }}</div>
        <div class="result-bar">
          <div class="bar-fill euclidean-bar" :style="{ width: Math.min(euclideanDist / 5 * 100, 100) + '%' }"></div>
        </div>
        <div class="result-range">0 (完全重合) ~ &#x221E; (无穷远)</div>
      </div>
      <div class="result-card">
        <div class="result-label">点积</div>
        <div class="result-value">{{ dotProduct.toFixed(2) }}</div>
        <div class="result-hint">dot(A, B) = |A||B|cos&#x3B8;</div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">&#x1F4A1;</span>
        <strong>余弦相似度</strong>只关注方向，不关注长度，适合文本语义比较；<strong>欧氏距离</strong>同时考虑方向和大小，适合需要绝对距离的场景。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeMetric = ref('cosine')
const dragging = ref(null)

const metrics = [
  { key: 'cosine', label: '余弦相似度' },
  { key: 'euclidean', label: '欧氏距离' }
]

const vecA = ref({ x: 350, y: 80 })
const vecB = ref({ x: 370, y: 250 })

const svgEl = ref(null)

function toVec(p) {
  return { x: (p.x - 230) / 100, y: (170 - p.y) / 100 }
}

const cosineSim = computed(() => {
  const a = toVec(vecA.value)
  const b = toVec(vecB.value)
  const dot = a.x * b.x + a.y * b.y
  const magA = Math.sqrt(a.x * a.x + a.y * a.y)
  const magB = Math.sqrt(b.x * b.x + b.y * b.y)
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
})

const euclideanDist = computed(() => {
  const a = toVec(vecA.value)
  const b = toVec(vecB.value)
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
})

const dotProduct = computed(() => {
  const a = toVec(vecA.value)
  const b = toVec(vecB.value)
  return a.x * b.x + a.y * b.y
})

const anglePath = computed(() => {
  const r = 40
  const ax = vecA.value.x - 230
  const ay = vecA.value.y - 170
  const bx = vecB.value.x - 230
  const by = vecB.value.y - 170
  const angA = Math.atan2(ay, ax)
  const angB = Math.atan2(by, bx)
  const x1 = 230 + r * Math.cos(angA)
  const y1 = 170 + r * Math.sin(angA)
  const x2 = 230 + r * Math.cos(angB)
  const y2 = 170 + r * Math.sin(angB)
  const diff = angB - angA
  const large = Math.abs(diff) > Math.PI ? 1 : 0
  const sweep = diff > 0 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`
})

function arrowHead(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len < 1) return ''
  const ux = dx / len
  const uy = dy / len
  const px = -uy
  const py = ux
  const tipX = x2
  const tipY = y2
  const s = 8
  const p1x = tipX - ux * s + px * s * 0.4
  const p1y = tipY - uy * s + py * s * 0.4
  const p2x = tipX - ux * s - px * s * 0.4
  const p2y = tipY - uy * s - py * s * 0.4
  return `${tipX},${tipY} ${p1x},${p1y} ${p2x},${p2y}`
}

function startDrag(which) {
  dragging.value = which
}

function stopDrag() {
  dragging.value = null
}

function onDrag(e) {
  if (!dragging.value || !svgEl.value) return
  const svg = svgEl.value
  const rect = svg.getBoundingClientRect()
  const scaleX = 460 / rect.width
  const scaleY = 360 / rect.height
  const x = Math.max(30, Math.min(430, (e.clientX - rect.left) * scaleX))
  const y = Math.max(10, Math.min(330, (e.clientY - rect.top) * scaleY))
  if (dragging.value === 'A') {
    vecA.value = { x, y }
  } else {
    vecB.value = { x, y }
  }
}
</script>

<style scoped>
.similarity-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.desc {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.metric-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.metric-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.metric-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.canvas-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.sim-svg {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
}

.drag-handle {
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  transition: border-color 0.2s;
}

.result-card.highlight {
  border-color: var(--vp-c-brand);
}

.result-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.result-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.result-bar {
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  margin: 6px 0 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}

.cosine-bar {
  background: #3b82f6;
}

.euclidean-bar {
  background: #ef4444;
}

.result-range {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.result-hint {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 6px;
  font-family: var(--vp-font-family-mono);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box p {
  margin: 0;
}

.info-box .icon {
  margin-right: 4px;
}

@media (max-width: 640px) {
  .results {
    grid-template-columns: 1fr;
  }

  .similarity-demo {
    padding: 1rem;
  }
}
</style>
