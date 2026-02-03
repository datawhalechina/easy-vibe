<!--
  MelSpectrogramDemo.vue
  梅尔频谱图交互演示组件

  用途：
  让用户直观理解音频如何从波形转换为梅尔频谱图，以及梅尔刻度的原理。

  交互功能：
  - 选择不同音频类型（语音/音乐/噪声）
  - 实时查看波形和频谱对比
  - 调整 FFT 参数观察变化
  - 理解梅尔刻度 vs 线性刻度
-->
<template>
  <div class="mel-spec-demo">
    <div class="header">
      <div class="title">📊 梅尔频谱：AI 如何"看懂"声音</div>
      <div class="subtitle">
        声音是波，但 AI 看到的是频谱图。探索波形如何变成 AI 能理解的"图像"
      </div>
    </div>

    <div class="control-panel">
      <div class="audio-types">
        <button
          v-for="type in audioTypes"
          :key="type.id"
          @click="selectType(type.id)"
          class="type-btn"
          :class="{ active: selectedType === type.id }"
        >
          <span class="type-icon">{{ type.icon }}</span>
          <span>{{ type.name }}</span>
        </button>
      </div>

      <div class="param-controls">
        <div class="param">
          <label>FFT 窗口</label>
          <input
            type="range"
            v-model="fftSize"
            min="256"
            max="2048"
            step="256"
          />
          <span class="value">{{ fftSize }}</span>
        </div>
        <div class="param">
          <label>梅尔滤波器</label>
          <input
            type="range"
            v-model="melBins"
            min="20"
            max="128"
            step="4"
          />
          <span class="value">{{ melBins }}</span>
        </div>
      </div>
    </div>

    <div class="visualization">
      <!-- 波形图 -->
      <div class="viz-section">
        <div class="viz-header">
          <span class="viz-title">🔊 波形 (时域)</span>
          <span class="viz-desc">原始音频振幅随时间变化</span>
        </div>
        <canvas ref="waveformCanvas" width="600" height="100"></canvas>
      </div>

      <div class="transform-arrow">
        <span>STFT 变换</span>
        <span class="arrow">⬇</span>
      </div>

      <!-- 频谱对比 -->
      <div class="spec-comparison">
        <div class="viz-section">
          <div class="viz-header">
            <span class="viz-title">📈 线性频谱</span>
            <span class="viz-tag">高频分辨率低</span>
          </div>
          <canvas ref="linearCanvas" width="280" height="150"></canvas>
        </div>

        <div class="vs">VS</div>

        <div class="viz-section highlight">
          <div class="viz-header">
            <span class="viz-title">🎯 梅尔频谱</span>
            <span class="viz-tag success">符合人耳感知</span>
          </div>
          <canvas ref="melCanvas" width="280" height="150"></canvas>
        </div>
      </div>
    </div>

    <div class="explanation">
      <div class="exp-title">🎧 为什么用梅尔刻度？</div>
      <div class="exp-content">
        <div class="exp-item">
          <div class="exp-visual">
            <div class="freq-bars human">
              <div class="bar" style="height: 80%"></div>
              <div class="bar" style="height: 60%"></div>
              <div class="bar" style="height: 40%"></div>
              <div class="bar" style="height: 20%"></div>
            </div>
          </div>
          <div class="exp-text">
            <strong>人耳感知</strong><br>
            100Hz→200Hz 与 10000Hz→10100Hz 感知差异相同
          </div>
        </div>
        <div class="exp-item">
          <div class="exp-visual">
            <div class="freq-bars linear">
              <div class="bar" style="height: 10%"></div>
              <div class="bar" style="height: 20%"></div>
              <div class="bar" style="height: 70%"></div>
              <div class="bar" style="height: 90%"></div>
            </div>
          </div>
          <div class="exp-text">
            <strong>线性刻度</strong><br>
            等距频率间隔，不符合人耳感知
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <p>
        <strong>梅尔频谱原理：</strong>
        梅尔刻度模拟了人耳对频率的非线性感知。人耳对低频变化更敏感，对高频变化较迟钝。
        梅尔频谱将频率映射到梅尔刻度，使 AI 更关注人耳敏感的部分。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const audioTypes = [
  { id: 'speech', name: '语音', icon: '🗣️' },
  { id: 'music', name: '音乐', icon: '🎵' },
  { id: 'noise', name: '噪声', icon: '📢' }
]

const selectedType = ref('speech')
const fftSize = ref(1024)
const melBins = ref(80)

const waveformCanvas = ref(null)
const linearCanvas = ref(null)
const melCanvas = ref(null)

const selectType = (type) => {
  selectedType.value = type
}

// 生成波形数据
const generateWaveform = (type) => {
  const samples = 600
  const data = []

  for (let i = 0; i < samples; i++) {
    let value = 0
    const t = i / samples

    if (type === 'speech') {
      value = Math.sin(t * 20 * Math.PI) * 0.3 +
              Math.sin(t * 50 * Math.PI) * 0.2 +
              Math.sin(t * 120 * Math.PI) * 0.15 +
              (Math.random() - 0.5) * 0.1
    } else if (type === 'music') {
      value = Math.sin(t * 10 * Math.PI) * 0.4 +
              Math.sin(t * 25 * Math.PI) * 0.3 +
              Math.sin(t * 40 * Math.PI) * 0.2
    } else {
      value = (Math.random() - 0.5) * 0.8
    }

    data.push(value)
  }

  return data
}

// 绘制波形
const drawWaveform = () => {
  const canvas = waveformCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  const data = generateWaveform(selectedType.value)
  const centerY = height / 2

  ctx.strokeStyle = '#409eff'
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let i = 0; i < data.length; i++) {
    const x = (i / data.length) * width
    const y = centerY + data[i] * height * 0.4

    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }

  ctx.stroke()

  // 中心线
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  ctx.lineTo(width, centerY)
  ctx.stroke()
}

// 生成频谱数据
const generateSpectrogram = (isMel = false) => {
  const timeBins = 60
  const freqBins = isMel ? melBins.value : 80
  const data = []

  for (let t = 0; t < timeBins; t++) {
    const frame = []
    for (let f = 0; f < freqBins; f++) {
      let value = 0
      const normalizedF = f / freqBins

      if (selectedType.value === 'speech') {
        const formant1 = Math.exp(-Math.pow(normalizedF - 0.1, 2) / 0.01)
        const formant2 = Math.exp(-Math.pow(normalizedF - 0.3, 2) / 0.02)
        value = (formant1 + formant2 * 0.7) * (0.8 + Math.random() * 0.2)
      } else if (selectedType.value === 'music') {
        value = Math.sin(normalizedF * Math.PI * 3) * 0.5 + 0.5
        value *= (0.7 + Math.random() * 0.3)
      } else {
        value = Math.random() * 0.5
      }

      if (isMel) {
        value *= (1 - normalizedF * 0.3)
      }

      frame.push(value)
    }
    data.push(frame)
  }

  return data
}

// 绘制频谱图
const drawSpectrogram = (canvas, data) => {
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  const cellWidth = width / data.length
  const cellHeight = height / data[0].length

  for (let t = 0; t < data.length; t++) {
    for (let f = 0; f < data[t].length; f++) {
      const value = data[t][f]
      const intensity = Math.floor(value * 255)

      const r = intensity
      const g = Math.floor(intensity * 0.6)
      const b = Math.floor(intensity * 0.2)

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.fillRect(
        t * cellWidth,
        height - (f + 1) * cellHeight,
        cellWidth + 1,
        cellHeight + 1
      )
    }
  }
}

const updateVisualization = () => {
  drawWaveform()
  drawSpectrogram(linearCanvas.value, generateSpectrogram(false))
  drawSpectrogram(melCanvas.value, generateSpectrogram(true))
}

onMounted(updateVisualization)
watch([selectedType, fftSize, melBins], updateVisualization)
</script>

<style scoped>
.mel-spec-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(120deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.audio-types {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.type-btn {
  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  transition: all 0.2s;
}

.type-btn:hover {
  border-color: var(--vp-c-brand);
}

.type-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.param-controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  flex: 1;
  justify-content: flex-end;
}

.param {
  display: flex;
  align-items: center;
  gap: 8px;
}

.param label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.param input[type="range"] {
  width: 100px;
}

.param .value {
  font-size: 12px;
  font-family: monospace;
  min-width: 40px;
}

.visualization {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.viz-section {
  margin-bottom: 16px;
}

.viz-section.highlight {
  border: 2px solid #67c23a;
  border-radius: 8px;
  padding: 12px;
}

.viz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.viz-title {
  font-weight: 600;
  font-size: 14px;
}

.viz-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.viz-tag {
  font-size: 11px;
  padding: 4px 8px;
  background: #e6a23c33;
  color: #e6a23c;
  border-radius: 4px;
}

.viz-tag.success {
  background: #67c23a33;
  color: #67c23a;
}

.viz-section canvas {
  width: 100%;
  height: auto;
  background: #f5f5f5;
  border-radius: 6px;
}

.transform-arrow {
  text-align: center;
  padding: 12px;
  color: var(--vp-c-text-3);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.transform-arrow .arrow {
  font-size: 20px;
}

.spec-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
}

.vs {
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.explanation {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.exp-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.exp-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.exp-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.freq-bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 80px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.freq-bars .bar {
  width: 30px;
  border-radius: 4px 4px 0 0;
}

.freq-bars.human .bar {
  background: linear-gradient(to top, #409eff, #67c23a);
}

.freq-bars.linear .bar {
  background: linear-gradient(to top, #e6a23c, #f56c6c);
}

.exp-text {
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.info-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
}

.info-box .icon {
  font-size: 18px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .spec-comparison {
    grid-template-columns: 1fr;
  }

  .vs {
    transform: rotate(90deg);
  }
}
</style>
