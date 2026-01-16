<template>
  <div class="attn-demo">
    <div class="controls">
      <span class="hint">🖱️ 把鼠标悬停在方块上，查看它的“注意力”分配</span>
    </div>

    <div class="visual-area">
      <div class="image-grid" @mouseleave="hoverIndex = -1">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="grid-cell"
          :class="{ active: hoverIndex === index }"
          @mouseenter="hoverIndex = index"
        >
          {{ item.icon }}
          <div class="cell-label">{{ item.label }}</div>
        </div>

        <!-- SVG Overlay for lines -->
        <svg class="connections" v-if="hoverIndex !== -1">
          <line
            v-for="(target, tIndex) in items"
            :key="tIndex"
            v-if="tIndex !== hoverIndex"
            :x1="getCenter(hoverIndex).x"
            :y1="getCenter(hoverIndex).y"
            :x2="getCenter(tIndex).x"
            :y2="getCenter(tIndex).y"
            :stroke="getAttentionColor(hoverIndex, tIndex)"
            :stroke-width="getAttentionWidth(hoverIndex, tIndex)"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div class="info-panel" :class="{ visible: hoverIndex !== -1 }">
        <div class="info-title">Patch: {{ items[hoverIndex]?.label }}</div>
        <div class="info-desc">正在关注：</div>
        <ul class="attn-list" v-if="hoverIndex !== -1">
          <li
            v-for="(weight, targetIdx) in getTopAttentions(hoverIndex)"
            :key="targetIdx"
          >
            <span class="target-icon">{{ items[targetIdx].icon }}</span>
            <span class="target-name">{{ items[targetIdx].label }}</span>
            <div class="bar-bg">
              <div
                class="bar-fill"
                :style="{ width: weight * 100 + '%' }"
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hoverIndex = ref(-1)

const items = [
  { icon: '🌲', label: '背景' },
  { icon: '🌲', label: '背景' },
  { icon: '☁️', label: '天空' },
  { icon: '👂', label: '猫耳' },
  { icon: '😼', label: '猫脸' },
  { icon: '🌲', label: '背景' },
  { icon: '🐾', label: '猫爪' },
  { icon: '🧶', label: '毛线' },
  { icon: '🌱', label: '草地' }
]

// 3x3 Grid
const getCenter = (index) => {
  const row = Math.floor(index / 3)
  const col = index % 3
  // Assuming 80px cell + 10px gap
  const cellSize = 80
  const gap = 10
  const offset = cellSize / 2
  return {
    x: col * (cellSize + gap) + offset,
    y: row * (cellSize + gap) + offset
  }
}

// Mock attention weights
const getAttentionWeight = (source, target) => {
  // Self attention is ignored for visualization clarity usually, but let's say:

  // Cat parts (3, 4, 6) attend strongly to each other
  const catParts = [3, 4, 6]
  const isSourceCat = catParts.includes(source)
  const isTargetCat = catParts.includes(target)

  if (isSourceCat && isTargetCat) return 0.9 // Strong connection between cat parts

  // Cat interacts with Yarn (7)
  if (isSourceCat && target === 7) return 0.7
  if (source === 7 && isTargetCat) return 0.7

  // Background parts attend to each other
  const bgParts = [0, 1, 2, 5, 8]
  if (bgParts.includes(source) && bgParts.includes(target)) return 0.5

  return 0.1 // Weak attention otherwise
}

const getAttentionColor = (source, target) => {
  const weight = getAttentionWeight(source, target)
  // Green for strong, gray for weak
  if (weight > 0.6) return `rgba(16, 185, 129, ${weight})`
  return `rgba(156, 163, 175, ${weight * 0.5})`
}

const getAttentionWidth = (source, target) => {
  const weight = getAttentionWeight(source, target)
  return weight * 5
}

const getTopAttentions = (source) => {
  const weights = {}
  items.forEach((_, idx) => {
    if (idx !== source) {
      weights[idx] = getAttentionWeight(source, idx)
    }
  })
  // Sort by weight desc
  return weights
}
</script>

<style scoped>
.attn-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin: 20px 0;
  user-select: none;
}

.controls {
  text-align: center;
  margin-bottom: 20px;
}

.hint {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.visual-area {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 10px;
  position: relative;
}

.grid-cell {
  width: 80px;
  height: 80px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 2;
  position: relative;
}

.grid-cell:hover,
.grid-cell.active {
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: var(--vp-c-bg-mute);
}

.cell-label {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.info-panel {
  width: 200px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 15px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.info-panel.visible {
  opacity: 1;
  pointer-events: auto;
}

.info-title {
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--vp-c-brand);
}

.info-desc {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
}

.attn-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.attn-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 0.85em;
}

.target-icon {
  width: 20px;
  text-align: center;
}

.target-name {
  width: 40px;
}

.bar-bg {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 3px;
}
</style>
