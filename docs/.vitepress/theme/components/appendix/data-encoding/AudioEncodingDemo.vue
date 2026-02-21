<template>
  <div class="audio-encoding-demo">
    <div class="demo-header">
      <span class="demo-title">声音是如何变成数字的？</span>
      <span class="demo-subtitle">（拖拽滑块调整采样率）</span>
    </div>

    <div class="controls-panel">
      <div class="slider-group">
        <label>采样频率：{{ sampleRate }} 次/秒</label>
        <input 
          type="range" 
          v-model="sliderValue" 
          min="1" 
          max="50" 
          step="1"
          class="range-slider"
        >
        <div class="scale-marks">
          <span>低音质 (严重失真)</span>
          <span>高音质 (贴近原声)</span>
        </div>
      </div>
    </div>

    <div class="wave-visualization">
      <!-- Continuous Wave Shape (Analog) -->
      <svg class="analog-wave" viewBox="0 0 500 100" preserveAspectRatio="none">
        <path :d="analogPath" fill="none" stroke="var(--vp-c-divider)" stroke-width="2" stroke-dasharray="4" />
      </svg>

      <!-- Digital Samples (Bars) -->
      <div class="digital-samples">
        <div 
          v-for="(sample, i) in samples" 
          :key="i"
          class="sample-bar"
          :style="{ 
            left: `${sample.x}%`, 
            height: `${Math.abs(sample.y)}%`,
            bottom: sample.y >= 0 ? '50%' : 'auto',
            top: sample.y < 0 ? '50%' : 'auto',
            width: `${100 / sampleRate}%`
          }"
        >
          <div class="sample-dot" :class="{ 'positive': sample.y >= 0, 'negative': sample.y < 0 }"></div>
        </div>
      </div>
    </div>

    <div class="data-stream">
      <div class="stream-label">转译后的数字(高度)：</div>
      <div class="stream-numbers">
        <span v-for="(s, i) in displayedNumbers" :key="i" class="num">{{ s }}</span>
        <span v-if="samples.length > 15" class="num">...</span>
      </div>
    </div>

    <div class="demo-insight">
      说明：灰色的虚线是真实的连贯声波（大自然的模拟信号）。蓝色柱子是我们每隔一段时间去测量它的高度（数字信号）。采样频率越密集，记录下来的数字就越多，恢复出来的声音就越清晰逼真，但产生的文件也随之飙升。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const sliderValue = ref(8)
const sampleRate = computed(() => Number(sliderValue.value))

// Generate a smooth sine wave path for the SVG
const analogPath = computed(() => {
  let path = 'M 0 50 '
  for (let x = 0; x <= 500; x += 5) {
    // Generate a compound wave
    const normalizedX = x / 500
    const y = Math.sin(normalizedX * Math.PI * 4) * 35 + Math.sin(normalizedX * Math.PI * 8) * 10
    path += `L ${x} ${50 - y} `
  }
  return path
})

// Generate discrete samples
const samples = computed(() => {
  const result = []
  const count = sampleRate.value
  for (let i = 0; i <= count; i++) {
    const normalizedX = i / count
    // Same compound wave formula
    const rawY = Math.sin(normalizedX * Math.PI * 4) * 35 + Math.sin(normalizedX * Math.PI * 8) * 10
    // Map to percentage of height (0 to 50 for max amplitude)
    result.push({
      x: normalizedX * 100,
      y: rawY, // -45 to +45 roughly
      val: Math.round(rawY * 1.5) // scaled value for display
    })
  }
  return result
})

const displayedNumbers = computed(() => {
  return samples.value.slice(0, 15).map(s => s.val)
})
</script>

<style scoped>
.audio-encoding-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.demo-header {
  display: flex;
  align-items: baseline;
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

.controls-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
}

.slider-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.range-slider {
  width: 100%;
  accent-color: var(--vp-c-brand);
  cursor: pointer;
}

.scale-marks {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
}

.wave-visualization {
  position: relative;
  height: 140px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.analog-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.digital-samples {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sample-bar {
  position: absolute;
  background: rgba(59, 130, 246, 0.2);
  border-left: 1px solid rgba(59, 130, 246, 0.4);
  border-right: 1px solid rgba(59, 130, 246, 0.4);
  transform: translateX(-50%);
  transition: all 0.2s ease-out;
}

.sample-bar:hover {
  background: rgba(59, 130, 246, 0.5);
}

.sample-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
}

.sample-dot.positive { top: -3px; }
.sample-dot.negative { bottom: -3px; }

/* Add center line */
.wave-visualization::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--vp-c-divider);
  opacity: 0.5;
}

.data-stream {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-radius: 6px;
}

.stream-label {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.stream-numbers {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.num {
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.demo-insight {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-left: 3px solid var(--vp-c-divider);
  padding-left: 0.8rem;
}
</style>
