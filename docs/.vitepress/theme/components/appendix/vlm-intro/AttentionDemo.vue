<template>
  <div class="attn-demo">
    <div class="header">
      <div class="title">Self-Attention Mechanism</div>
      <div class="subtitle">自注意力机制：全局信息交互</div>
    </div>

    <div class="visual-stage">
      <!-- Grid Layout -->
      <div class="grid-container" @mouseleave="hoverIndex = -1">
        <!-- SVG Layer for Connection Lines -->
        <svg class="connections-layer">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="4"
              refX="18"
              refY="2"
              orient="auto"
            >
              <polygon
                points="0 0, 6 2, 0 4"
                fill="var(--vp-c-brand)"
                opacity="0.6"
              />
            </marker>
          </defs>
          <!-- Draw lines from hoverIndex to ALL other nodes -->
          <g v-if="hoverIndex !== -1">
            <line
              v-for="(target, tIndex) in items"
              :key="tIndex"
              v-show="tIndex !== hoverIndex"
              :x1="getCenter(hoverIndex).x"
              :y1="getCenter(hoverIndex).y"
              :x2="getCenter(tIndex).x"
              :y2="getCenter(tIndex).y"
              :stroke="getLineColor(hoverIndex, tIndex)"
              :stroke-width="getLineWidth(hoverIndex, tIndex)"
              stroke-linecap="round"
              :opacity="getLineOpacity(hoverIndex, tIndex)"
            />
          </g>
        </svg>

        <!-- Cells -->
        <div
          v-for="(item, index) in items"
          :key="index"
          class="grid-cell"
          :class="{
            'is-source': hoverIndex === index,
            'is-target': hoverIndex !== -1 && hoverIndex !== index,
            'is-strong-attn':
              hoverIndex !== -1 && getAttentionScore(hoverIndex, index) > 0.5
          }"
          @mouseenter="hoverIndex = index"
          :style="{
            left: getCenter(index).x - 30 + 'px',
            top: getCenter(index).y - 30 + 'px'
          }"
        >
          <div class="cell-content">
            <span class="cell-icon">{{ item.icon }}</span>
            <span class="cell-label">{{ item.label }}</span>
          </div>
          <!-- Attention Score Badge -->
          <div
            class="attn-badge"
            v-if="hoverIndex !== -1 && hoverIndex !== index"
            :style="{
              opacity: Math.max(0.3, getAttentionScore(hoverIndex, index))
            }"
          >
            {{ (getAttentionScore(hoverIndex, index) * 100).toFixed(0) }}%
          </div>
        </div>
      </div>

      <!-- Info Panel -->
      <div class="info-panel">
        <div v-if="hoverIndex === -1" class="placeholder-text">
          <span class="cursor-icon">👆</span>
          把鼠标悬停在任意方块上，<br />观察它在"关注"谁
        </div>
        <div v-else class="active-info">
          <div class="source-info">
            <span class="label">当前 Patch:</span>
            <div class="patch-tag">
              {{ items[hoverIndex].icon }} {{ items[hoverIndex].label }}
            </div>
          </div>

          <div class="attn-list">
            <div class="list-header">Attention Weights (注意力权重)</div>
            <div
              class="attn-item"
              v-for="(score, idx) in getTopAttentions(hoverIndex)"
              :key="idx"
            >
              <div class="item-left">
                <span class="item-icon">{{ items[idx].icon }}</span>
                <span class="item-name">{{ items[idx].label }}</span>
              </div>
              <div class="item-right">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: score * 100 + '%' }"
                  ></div>
                </div>
                <span class="score-text">{{ (score * 100).toFixed(0) }}%</span>
              </div>
            </div>
          </div>

          <div class="insight-box">
            <span class="bulb">💡</span>
            <span class="insight-text">
              {{ getInsightText(hoverIndex) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hoverIndex = ref(-1)

// 3x3 Grid Data (Cat in grass)
const items = [
  { icon: '🌿', label: '草地' }, // 0
  { icon: '🌿', label: '草地' }, // 1
  { icon: '🦋', label: '蝴蝶' }, // 2
  { icon: '🌿', label: '草地' }, // 3
  { icon: '🐱', label: '猫头' }, // 4
  { icon: '🌿', label: '草地' }, // 5
  { icon: '🧶', label: '毛球' }, // 6
  { icon: '🐾', label: '猫爪' }, // 7
  { icon: '🌿', label: '草地' } // 8
]

// Layout Logic
const getCenter = (index) => {
  const row = Math.floor(index / 3)
  const col = index % 3
  const gap = 100
  const offsetX = 50
  const offsetY = 50
  return {
    x: col * gap + offsetX,
    y: row * gap + offsetY
  }
}

// Attention Logic
const getAttentionScore = (source, target) => {
  if (source === target) return 0

  // Cat Head (4) attends strongly to:
  if (source === 4) {
    if (target === 7) return 0.95 // Paws (Body parts connected)
    if (target === 2) return 0.8 // Butterfly (Interest)
    if (target === 6) return 0.6 // Yarn (Toy)
    return 0.1 // Background
  }

  // Cat Paws (7) attends strongly to:
  if (source === 7) {
    if (target === 4) return 0.95 // Head
    if (target === 6) return 0.9 // Yarn (Touching)
    return 0.1
  }

  // Butterfly (2)
  if (source === 2) {
    if (target === 4) return 0.7 // Danger?
    return 0.2
  }

  // Grass (Background)
  // Background patches attend to each other for texture consistency
  const bgIndices = [0, 1, 3, 5, 8]
  if (bgIndices.includes(source)) {
    if (bgIndices.includes(target)) return 0.6
    return 0.05
  }

  // Default fallback
  return 0.1
}

const getLineColor = (source, target) => {
  const score = getAttentionScore(source, target)
  return score > 0.5 ? 'var(--vp-c-brand)' : 'var(--vp-c-text-3)'
}

const getLineWidth = (source, target) => {
  const score = getAttentionScore(source, target)
  return 1 + score * 4
}

const getLineOpacity = (source, target) => {
  const score = getAttentionScore(source, target)
  return 0.2 + score * 0.8
}

const getTopAttentions = (source) => {
  const scores = {}
  items.forEach((_, idx) => {
    if (idx !== source) {
      scores[idx] = getAttentionScore(source, idx)
    }
  })
  // Sort descending
  const sortedKeys = Object.keys(scores).sort((a, b) => scores[b] - scores[a])
  const top3 = {}
  sortedKeys.slice(0, 3).forEach((key) => {
    top3[key] = scores[key]
  })
  return top3
}

const getInsightText = (idx) => {
  if (idx === 4) return '猫头最关注猫爪（组成身体）和蝴蝶（捕猎目标）。'
  if (idx === 7) return '猫爪最关注毛球（正在玩耍）和猫头。'
  if (idx === 2) return '蝴蝶关注到了猫，可能是因为它是个威胁。'
  if ([0, 1, 3, 5, 8].includes(idx))
    return '草地主要关注周围的草地，确认背景纹理。'
  if (idx === 6) return '毛球和猫爪有很强的互动关系。'
  return 'Self-Attention 让每个部分找到它的上下文关联。'
}
</script>

<style scoped>
.attn-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 20px 0;
  user-select: none;
  font-family: 'Menlo', 'Monaco', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.visual-stage {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* Grid Area */
.grid-container {
  width: 300px;
  height: 300px;
  position: relative;
  /* background: rgba(0,0,0,0.02); */
  border-radius: 12px;
}

.connections-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.grid-cell {
  position: absolute;
  width: 60px;
  height: 60px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.cell-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cell-icon {
  font-size: 24px;
  line-height: 1.2;
}

.cell-label {
  font-size: 10px;
  color: var(--vp-c-text-2);
  font-weight: bold;
}

/* Interaction States */
.grid-cell:hover,
.grid-cell.is-source {
  z-index: 10;
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  transform: scale(1.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.grid-cell.is-strong-attn {
  border-color: var(--vp-c-brand-light);
  background: var(--vp-c-brand-dimm);
}

.attn-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Info Panel */
.info-panel {
  width: 280px;
  min-height: 260px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.placeholder-text {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.cursor-icon {
  font-size: 32px;
  animation: bounce 2s infinite;
}

.source-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.patch-tag {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
}

.list-header {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.attn-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 80px;
}

.item-icon {
  font-size: 16px;
}
.item-name {
  font-size: 12px;
  font-weight: 500;
}

.item-right {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 3px;
}

.score-text {
  font-size: 11px;
  color: var(--vp-c-text-2);
  width: 30px;
  text-align: right;
  font-family: monospace;
}

.insight-box {
  margin-top: 15px;
  background: var(--vp-c-yellow-dimm);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.bulb {
  font-size: 16px;
}
.insight-text {
  font-size: 12px;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .visual-stage {
    flex-direction: column;
    align-items: center;
  }
  .info-panel {
    width: 100%;
    min-height: auto;
  }
}
</style>
