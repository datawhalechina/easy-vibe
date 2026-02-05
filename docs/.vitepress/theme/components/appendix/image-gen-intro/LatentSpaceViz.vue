<template>
  <div class="latent-space-viz">
    <div class="viz-card">
      <!-- Left: The Output (Pixel Space) -->
      <div class="preview-section">
        <div class="emoji-display" :style="{ transform: `scale(${1 + zoomLevel})` }">
          {{ currentEmoji }}
        </div>
        <div class="label">像素空间 (Pixel Space)</div>
        <div class="sub-label">最终看到的图像</div>
      </div>

      <!-- Center: The Mechanism -->
      <div class="connection">
        <div class="arrow">← 映射 →</div>
        <div class="vae-tag">VAE Decoder</div>
      </div>

      <!-- Right: The Input (Latent Space) -->
      <div class="control-section">
        <div class="latent-grid" ref="gridRef" @mousedown="startDrag" @touchstart="startDrag">
          <div class="grid-lines"></div>
          <div class="axis-label x-axis">开心值 (Happiness)</div>
          <div class="axis-label y-axis">惊讶值 (Surprise)</div>
          
          <!-- The Latent Point -->
          <div 
            class="latent-point"
            :style="{ left: `${point.x}%`, top: `${point.y}%` }"
          >
            <div class="tooltip">Latent Vector: [{{ ((point.x-50)/50).toFixed(1) }}, {{ ((50-point.y)/50).toFixed(1) }}]</div>
          </div>
        </div>
        <div class="label">潜空间 (Latent Space)</div>
        <div class="sub-label">拖动红点改变特征</div>
      </div>
    </div>
    
    <div class="info-bar">
      <span class="icon">💡</span>
      <span>
        <strong>核心原理：</strong>
        在像素空间里修改图片很难（要改几千个像素）。但在潜空间里，我们只需要修改两个坐标（开心值、惊讶值），就能生成完全不同的表情。这就是 AI "画画" 的本质——在数学空间里找坐标。
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const gridRef = ref(null)
const isDragging = ref(false)
const point = ref({ x: 50, y: 50 }) // Percentage 0-100
const zoomLevel = ref(0)

// Emoji map based on quadrants
// X: Unhappy -> Happy
// Y: Calm -> Surprised (Top is 0 in CSS, so small Y is high surprise?) 
// Let's map: 
// X (0-100): Sad -> Happy
// Y (0-100): Surprised -> Sleepy (Top is 0, so 0 is Surprised, 100 is Sleepy)

const currentEmoji = computed(() => {
  const x = point.value.x // 0 (Sad) to 100 (Happy)
  const y = point.value.y // 0 (Surprised) to 100 (Sleepy)
  
  if (x < 33) { // Sad Zone
    if (y < 33) return '😨' // Sad + Surprised = Fear
    if (y > 66) return '😪' // Sad + Sleepy = Tired
    return '😢' // Just Sad
  } else if (x > 66) { // Happy Zone
    if (y < 33) return '🤩' // Happy + Surprised = Starstruck
    if (y > 66) return '😌' // Happy + Sleepy = Relieved
    return '😃' // Just Happy
  } else { // Neutral Zone
    if (y < 33) return '😮' // Neutral + Surprised
    if (y > 66) return '😴' // Neutral + Sleepy
    return '😐' // Just Neutral
  }
})

const handleMove = (event) => {
  if (!isDragging.value) return
  
  const grid = gridRef.value.getBoundingClientRect()
  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const clientY = event.touches ? event.touches[0].clientY : event.clientY
  
  let newX = ((clientX - grid.left) / grid.width) * 100
  let newY = ((clientY - grid.top) / grid.height) * 100
  
  // Clamp
  newX = Math.max(0, Math.min(100, newX))
  newY = Math.max(0, Math.min(100, newY))
  
  point.value = { x: newX, y: newY }
}

const startDrag = (event) => {
  isDragging.value = true
  handleMove(event)
  // Prevent default to stop scrolling on mobile
  if (event.type === 'touchstart') event.preventDefault()
}

const stopDrag = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', handleMove)
  window.addEventListener('touchend', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', handleMove)
  window.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.latent-space-viz {
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.viz-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  gap: 20px;
  flex-wrap: wrap;
}

.preview-section, .control-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
}

.emoji-display {
  font-size: 80px;
  line-height: 1;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
}

.latent-grid {
  width: 200px;
  height: 200px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  position: relative;
  cursor: crosshair;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
}

.latent-point {
  width: 20px;
  height: 20px;
  background: var(--vp-c-brand);
  border: 3px solid #fff;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: transform 0.1s;
}

.latent-point:hover {
  transform: translate(-50%, -50%) scale(1.2);
}

.tooltip {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.latent-point:hover .tooltip,
.latent-point:active .tooltip {
  opacity: 1;
}

.axis-label {
  position: absolute;
  font-size: 10px;
  color: var(--vp-c-text-2);
  pointer-events: none;
}

.x-axis {
  bottom: 4px;
  right: 8px;
}

.y-axis {
  top: 8px;
  left: 8px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.connection {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.arrow {
  margin-bottom: 4px;
  font-weight: bold;
}

.vae-tag {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.label {
  margin-top: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sub-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.info-bar {
  margin-top: 16px;
  background: var(--vp-c-bg-alt);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 8px;
}

.icon {
  font-size: 16px;
}

@media (max-width: 600px) {
  .viz-card {
    flex-direction: column-reverse;
  }
  
  .connection {
    transform: rotate(90deg);
    margin: 10px 0;
  }
}
</style>
