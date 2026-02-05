<template>
  <div class="prompt-visualizer">
    <div class="viz-card">
      <div class="input-display">
        <span class="label">Prompt:</span>
        <span class="text">"cyberpunk cat, neon lights, futuristic city"</span>
      </div>

      <div class="tokens-row">
        <div 
          v-for="(token, index) in tokens" 
          :key="index"
          class="token-pill"
          :style="{ opacity: 0.4 + (token.weight * 0.6) }"
        >
          {{ token.text }}
          <div class="tooltip">关注度: {{ (token.weight * 100).toFixed(0) }}%</div>
        </div>
      </div>
      
      <div class="arrow-down">⬇️ CLIP Encoding & Attention</div>
      
      <div class="image-map">
        <!-- Abstract representation of an image being attended to -->
        <div class="map-layer" style="background: #2b0055; opacity: 0.9;">
          <span>City Base</span>
        </div>
        <div class="map-layer" style="background: #ff00aa; width: 60%; height: 60%; opacity: 0.8;">
          <span>Neon Glow</span>
        </div>
        <div class="map-layer" style="background: #fff; width: 30%; height: 30%; border-radius: 50%;">
          <span>Cat</span>
        </div>
      </div>
    </div>

    <div class="info-bar">
      <span class="icon">💡</span>
      <span>
        <strong>交叉注意力 (Cross-Attention)：</strong>
        AI 在画画时，每画一笔都会回头看一眼 Prompt。当它画背景时，"city" 单词会亮起来；当它画主角时，"cat" 单词会亮起来。
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tokens = ref([
  { text: 'cyberpunk', weight: 0.8 },
  { text: 'cat', weight: 1.0 },
  { text: 'neon', weight: 0.7 },
  { text: 'lights', weight: 0.6 },
  { text: 'futuristic', weight: 0.5 },
  { text: 'city', weight: 0.9 }
])
</script>

<style scoped>
.prompt-visualizer {
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.viz-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.input-display {
  font-family: monospace;
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  width: 100%;
  text-align: center;
}

.label {
  color: var(--vp-c-text-2);
  margin-right: 8px;
}

.tokens-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.token-pill {
  background: var(--vp-c-brand);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  position: relative;
  cursor: help;
  transition: transform 0.2s;
}

.token-pill:hover {
  transform: scale(1.1);
  z-index: 10;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  margin-bottom: 6px;
}

.token-pill:hover .tooltip {
  opacity: 1;
}

.arrow-down {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.image-map {
  width: 200px;
  height: 200px;
  background: #000;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-layer {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.8);
  font-size: 10px;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.info-bar {
  margin-top: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 8px;
  line-height: 1.4;
  padding: 0 8px;
}
</style>
