<template>
  <div class="image-encoding-demo">
    <div class="demo-header">
      <span class="demo-title">🖼️ 图片是如何变成数字的？</span>
      <span class="demo-subtitle">（悬停在像素方块上看看）</span>
    </div>

    <div class="visualization-area">
      <!-- The Grid (Image) -->
      <div class="pixel-grid" @mouseleave="hoveredPixel = null">
        <div
          v-for="(pixel, i) in pixels"
          :key="i"
          class="pixel-cell"
          :style="{ backgroundColor: pixel.color }"
          @mouseenter="hoveredPixel = { ...pixel, index: i }"
        ></div>
      </div>

      <!-- The Code (Data) -->
      <div class="data-panel">
        <div class="data-label">💻 计算机实际看到的：</div>
        <div class="hex-stream">
          <span
            v-for="(pixel, i) in pixels"
            :key="'hex' + i"
            class="hex-code"
            :class="{ active: hoveredPixel && hoveredPixel.index === i }"
          >
            {{ pixel.color }}
          </span>
        </div>
        
        <div class="inspection-box" v-if="hoveredPixel">
          <div class="preview-color" :style="{ backgroundColor: hoveredPixel.color }"></div>
          <div class="preview-info">
            <div class="info-row">
              <span class="info-label">像素位置:</span>
              <span class="info-val">第 {{ hoveredPixel.index + 1 }} 个方块</span>
            </div>
            <div class="info-row">
              <span class="info-label">十六进制:</span>
              <span class="info-val highlight">{{ hoveredPixel.color }}</span>
            </div>
          </div>
        </div>
        <div class="inspection-box empty" v-else>
          将鼠标悬停在左侧画布的方块上
        </div>
      </div>
    </div>

    <div class="demo-insight">
      💡 <strong>原理解析</strong>：一张 1080p 的高清壁纸，其实就是 <strong>207 万</strong> 个像左边这样密密麻麻的小色块组成的。计算机把这两百多万个颜色的编号（如 #FF0000）按顺序记录下来，图片就变成了几百万个数字的集合。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Create a simple 8x8 pixel art (a smiley face)
const rawArt = [
  '00000000',
  '01100110',
  '01100110',
  '00000000',
  '10000001',
  '01000010',
  '00111100',
  '00000000'
]

const colorMap = {
  '0': '#F3F4F6', // Background (light gray)
  '1': '#3B82F6'  // Face (blue)
}

const pixels = ref([])
for (let row of rawArt) {
  for (let char of row) {
    pixels.value.push({ color: colorMap[char] })
  }
}

const hoveredPixel = ref(null)
</script>

<style scoped>
.image-encoding-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.demo-title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.visualization-area {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
}

@media (max-width: 640px) {
  .visualization-area { flex-direction: column; }
}

.pixel-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 200px;
  height: 200px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  flex-shrink: 0;
}

.pixel-cell {
  border: 1px solid rgba(0,0,0,0.05);
  cursor: crosshair;
  transition: transform 0.1s;
}

.pixel-cell:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  z-index: 10;
  border-color: var(--vp-c-brand);
}

.data-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  min-width: 0;
}

.data-label {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.hex-stream {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-height: 90px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.65rem;
}

.hex-code {
  padding: 2px 4px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  color: var(--vp-c-text-3);
  transition: all 0.2s;
}

.hex-code.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: bold;
  transform: scale(1.1);
}

.inspection-box {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px dashed var(--vp-c-brand);
}

.inspection-box.empty {
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  border-color: var(--vp-c-divider);
}

.preview-color {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.info-label { color: var(--vp-c-text-2); width: 60px; }
.info-val { font-family: monospace; font-weight: bold; }
.info-val.highlight { color: var(--vp-c-brand); font-size: 0.9rem; }

.demo-insight {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.85rem;
  line-height: 1.6;
}
</style>
