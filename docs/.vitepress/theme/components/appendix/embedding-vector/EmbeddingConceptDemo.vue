<!--
  EmbeddingConceptDemo.vue
  嵌入概念可视化组件

  用途：
  将词语/句子嵌入可视化为二维空间中的点，展示语义相似的概念如何聚集在一起。

  交互功能：
  - 切换不同词组类别查看聚类效果
  - 悬停查看词语详情和坐标
  - 动态展示语义空间的分布
-->
<template>
  <div class="embedding-demo">
    <div class="demo-header">
      <h4>词嵌入空间可视化</h4>
      <p class="desc">语义相近的词语在向量空间中距离更近，形成自然聚类</p>
    </div>

    <div class="controls">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="cat-btn"
        :class="{ active: activeCategory === cat.key }"
        @click="activeCategory = cat.key"
      >
        {{ cat.label }}
      </button>
    </div>

    <div class="canvas-wrap">
      <svg
        ref="svgRef"
        viewBox="0 0 500 400"
        class="embed-svg"
      >
        <!-- 坐标轴 -->
        <line x1="50" y1="370" x2="480" y2="370" stroke="var(--vp-c-divider)" stroke-width="1" />
        <line x1="50" y1="370" x2="50" y2="20" stroke="var(--vp-c-divider)" stroke-width="1" />
        <text x="265" y="395" text-anchor="middle" fill="var(--vp-c-text-3)" font-size="12">维度 1</text>
        <text x="15" y="195" text-anchor="middle" fill="var(--vp-c-text-3)" font-size="12" transform="rotate(-90, 15, 195)">维度 2</text>

        <!-- 聚类椭圆 -->
        <ellipse
          v-for="cluster in currentClusters"
          :key="cluster.label"
          :cx="cluster.cx"
          :cy="cluster.cy"
          :rx="cluster.rx"
          :ry="cluster.ry"
          :fill="cluster.color"
          fill-opacity="0.08"
          :stroke="cluster.color"
          stroke-opacity="0.3"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />

        <!-- 数据点 -->
        <g
          v-for="(point, idx) in currentPoints"
          :key="point.word"
          class="point-group"
          @mouseenter="hoveredPoint = idx"
          @mouseleave="hoveredPoint = -1"
        >
          <circle
            :cx="point.x"
            :cy="point.y"
            :r="hoveredPoint === idx ? 8 : 6"
            :fill="point.color"
            stroke="#fff"
            stroke-width="1.5"
            class="data-point"
          />
          <text
            :x="point.x"
            :y="point.y - 12"
            text-anchor="middle"
            :fill="point.color"
            font-size="12"
            font-weight="600"
          >
            {{ point.word }}
          </text>
        </g>

        <!-- 聚类标签 -->
        <text
          v-for="cluster in currentClusters"
          :key="'label-' + cluster.label"
          :x="cluster.cx"
          :y="cluster.cy + cluster.ry + 16"
          text-anchor="middle"
          :fill="cluster.color"
          font-size="11"
          font-weight="500"
          opacity="0.7"
        >
          {{ cluster.label }}
        </text>
      </svg>

      <!-- 悬停信息 -->
      <div v-if="hoveredPoint >= 0" class="hover-info">
        <span class="hw">{{ currentPoints[hoveredPoint].word }}</span>
        <span class="hc">向量: [{{ currentPoints[hoveredPoint].vec.join(', ') }}]</span>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">&#x1F4A1;</span>
        嵌入模型将文本映射到高维向量空间（通常 768~1536 维）。这里我们将其简化为二维来展示核心思想：<strong>语义相近的词语，向量距离也更近</strong>。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('animals-royalty')
const hoveredPoint = ref(-1)

const categories = [
  { key: 'animals-royalty', label: '动物 vs 皇室' },
  { key: 'food-tech', label: '食物 vs 科技' },
  { key: 'emotions', label: '情感词汇' }
]

const dataMap = {
  'animals-royalty': {
    clusters: [
      { label: '动物', cx: 150, cy: 160, rx: 80, ry: 65, color: '#10b981' },
      { label: '皇室', cx: 370, cy: 200, rx: 75, ry: 60, color: '#8b5cf6' }
    ],
    points: [
      { word: '猫', x: 120, y: 140, color: '#10b981', vec: [0.21, 0.68] },
      { word: '狗', x: 160, y: 180, color: '#10b981', vec: [0.28, 0.55] },
      { word: '老虎', x: 185, y: 130, color: '#10b981', vec: [0.35, 0.72] },
      { word: '兔子', x: 130, y: 195, color: '#10b981', vec: [0.22, 0.48] },
      { word: '国王', x: 350, y: 175, color: '#8b5cf6', vec: [0.82, 0.58] },
      { word: '王后', x: 390, y: 195, color: '#8b5cf6', vec: [0.88, 0.52] },
      { word: '王子', x: 360, y: 225, color: '#8b5cf6', vec: [0.84, 0.42] },
      { word: '公主', x: 395, y: 215, color: '#8b5cf6', vec: [0.89, 0.45] }
    ]
  },
  'food-tech': {
    clusters: [
      { label: '食物', cx: 140, cy: 240, rx: 85, ry: 70, color: '#f59e0b' },
      { label: '科技', cx: 360, cy: 120, rx: 80, ry: 65, color: '#3b82f6' }
    ],
    points: [
      { word: '苹果(水果)', x: 110, y: 220, color: '#f59e0b', vec: [0.15, 0.38] },
      { word: '面包', x: 155, y: 260, color: '#f59e0b', vec: [0.25, 0.28] },
      { word: '牛奶', x: 130, y: 280, color: '#f59e0b', vec: [0.20, 0.22] },
      { word: '蛋糕', x: 175, y: 230, color: '#f59e0b', vec: [0.30, 0.35] },
      { word: '电脑', x: 340, y: 100, color: '#3b82f6', vec: [0.78, 0.82] },
      { word: '手机', x: 375, y: 130, color: '#3b82f6', vec: [0.85, 0.75] },
      { word: '芯片', x: 355, y: 150, color: '#3b82f6', vec: [0.82, 0.70] },
      { word: '算法', x: 390, y: 110, color: '#3b82f6', vec: [0.88, 0.80] }
    ]
  },
  emotions: {
    clusters: [
      { label: '积极情感', cx: 150, cy: 130, rx: 90, ry: 70, color: '#10b981' },
      { label: '消极情感', cx: 360, cy: 270, rx: 85, ry: 65, color: '#ef4444' },
      { label: '中性情感', cx: 260, cy: 200, rx: 60, ry: 45, color: '#6b7280' }
    ],
    points: [
      { word: '快乐', x: 120, y: 110, color: '#10b981', vec: [0.15, 0.78] },
      { word: '幸福', x: 155, y: 130, color: '#10b981', vec: [0.22, 0.72] },
      { word: '兴奋', x: 180, y: 100, color: '#10b981', vec: [0.28, 0.82] },
      { word: '悲伤', x: 340, y: 250, color: '#ef4444', vec: [0.78, 0.30] },
      { word: '愤怒', x: 380, y: 270, color: '#ef4444', vec: [0.85, 0.25] },
      { word: '恐惧', x: 360, y: 295, color: '#ef4444', vec: [0.82, 0.18] },
      { word: '平静', x: 245, y: 190, color: '#6b7280', vec: [0.50, 0.52] },
      { word: '淡然', x: 275, y: 210, color: '#6b7280', vec: [0.55, 0.48] }
    ]
  }
}

const currentClusters = computed(() => dataMap[activeCategory.value].clusters)
const currentPoints = computed(() => dataMap[activeCategory.value].points)
</script>

<style scoped>
.embedding-demo {
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

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.cat-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.cat-btn:hover {
  background: var(--vp-c-bg-alt);
}

.cat-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.canvas-wrap {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.embed-svg {
  width: 100%;
  height: auto;
  display: block;
}

.data-point {
  cursor: pointer;
  transition: r 0.2s;
}

.point-group {
  transition: opacity 0.2s;
}

.hover-info {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hw {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.hc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 4px;
}

.info-box p {
  margin: 0;
}

@media (max-width: 640px) {
  .embedding-demo {
    padding: 1rem;
  }
}
</style>
