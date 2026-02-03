<template>
  <div class="lost-in-middle-demo">
    <div class="control-panel">
      <div class="control-group">
        <label>关键信息大概在整段话的哪个位置：{{ needlePosition }}%</label>
        <input 
          type="range" 
          v-model.number="needlePosition" 
          min="0" 
          max="100" 
          step="1"
          class="slider-input"
        >
      </div>
    </div>

    <div class="visualization-area">
      <!-- Context Window Bar -->
      <div class="context-bar">
        <div class="context-label start">Start (System)</div>
        <div class="context-label end">End (Query)</div>
        
        <!-- Attention Heatmap Background -->
        <div class="attention-heatmap"></div>
        
        <!-- Needle Marker -->
        <div 
          class="needle-marker"
          :style="{ left: `${needlePosition}%` }"
        >
          <div class="needle-icon">📍</div>
          <div class="needle-tooltip">关键事实</div>
        </div>
      </div>

      <!-- Probability Curve Chart -->
      <div class="chart-container">
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" class="chart-svg">
          <!-- U-Curve Path -->
          <path 
            d="M 0 5 Q 50 55 100 5" 
            fill="none" 
            stroke="var(--vp-c-divider)" 
            stroke-width="2" 
            stroke-dasharray="4"
          />
          <!-- Active Dot -->
          <circle 
            :cx="needlePosition" 
            :cy="60 - (retrievalProb * 0.5 + 5)" 
            r="3" 
            fill="var(--vp-c-brand)"
          />
        </svg>
        <div class="chart-label y-axis">被记住的概率</div>
        <div class="chart-label x-axis">在上下文里的位置</div>
      </div>
    </div>

    <div class="metrics-panel">
      <div class="metric-card">
        <div class="metric-value" :class="getScoreClass(retrievalProb)">
          {{ retrievalProb.toFixed(1) }}%
        </div>
        <div class="metric-label">检索成功率</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">{{ positionLabel }}</div>
        <div class="metric-label">位置描述</div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">🔍</span>
        <strong>实验观察：</strong>当关键信息藏在整段话的<strong>中间位置</strong>时，模型最容易“漏看掉”（Lost in the Middle）。
        <br>
        最靠谱的做法：把重要指令放在<strong>最前面的 System Prompt</strong>，或者<strong>最后的用户问题里</strong>。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const needlePosition = ref(50) // 0 to 100

// Parabolic curve calculation: Vertex at (50, 40), passing through (0, 95) and (100, 95)
// y = a(x-h)^2 + k
// a = 0.022
const retrievalProb = computed(() => {
  const x = needlePosition.value
  const prob = 0.022 * Math.pow(x - 50, 2) + 40
  return Math.min(99.9, Math.max(0, prob))
})

const positionLabel = computed(() => {
  const p = needlePosition.value
  if (p < 20) return '偏开头'
  if (p > 80) return '偏结尾'
  return '中间区域（最危险）'
})

const getScoreClass = (score) => {
  if (score > 85) return 'text-success'
  if (score > 60) return 'text-warning'
  return 'text-danger'
}
</script>

<style scoped>
.lost-in-middle-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: bold;
  font-size: 0.85rem;
}

.slider-input {
  width: 100%;
  accent-color: var(--vp-c-brand);
}

.visualization-area {
  margin-bottom: 1rem;
  position: relative;
}

.context-bar {
  height: 40px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  position: relative;
  margin-bottom: 0.75rem;
  background: var(--vp-c-bg);
  overflow: visible; /* Allow needle to stick out */
}

.attention-heatmap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  background: linear-gradient(
    90deg, 
    rgba(16, 185, 129, 0.2) 0%, 
    rgba(239, 68, 68, 0.1) 50%, 
    rgba(16, 185, 129, 0.2) 100%
  );
  opacity: 0.6;
}

.context-label {
  position: absolute;
  top: -18px;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.context-label.start { left: 0; }
.context-label.end { right: 0; }

.needle-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  cursor: grab;
  transition: left 0.1s ease;
}

.needle-icon {
  font-size: 1.25rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.needle-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.needle-marker:hover .needle-tooltip {
  opacity: 1;
}

.chart-container {
  height: 60px;
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-top: 0.75rem;
}

.chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.chart-label {
  position: absolute;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.chart-label.y-axis { top: 0; left: 0; }
.chart-label.x-axis { bottom: -1rem; width: 100%; text-align: center; }

.metrics-panel {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.metric-card {
  flex: 1;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: bold;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}

.text-success { color: var(--vp-c-success-1); }
.text-warning { color: var(--vp-c-warning-1); }
.text-danger { color: var(--vp-c-danger-1); }

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}
</style>
