<template>
  <div class="spectrogram-viz">
    <el-card shadow="never">
      <div class="viz-layout">
        <!-- Left: Waveform -->
        <div class="viz-box">
          <div class="viz-header">
            <span class="viz-title">🌊 波形 (Waveform)</span>
            <el-tag size="small" type="success">Time Domain</el-tag>
          </div>
          <div class="viz-content waveform-container">
            <div class="wave-bars">
              <div
                v-for="n in 30"
                :key="n"
                class="wave-bar"
                :style="{
                  height: 20 + Math.random() * 60 + '%',
                  animationDelay: n * 0.05 + 's'
                }"
              ></div>
            </div>
            <div class="axis-label x-axis">时间 (Time) →</div>
            <div class="axis-label y-axis">振幅 (Amplitude) ↑</div>
          </div>
        </div>

        <div class="transform-arrow">
          <div class="arrow-content">
            <span class="fft-text">FFT 变换</span>
            <el-icon><Right /></el-icon>
          </div>
        </div>

        <!-- Right: Spectrogram -->
        <div class="viz-box">
          <div class="viz-header">
            <span class="viz-title">🎨 频谱图 (Spectrogram)</span>
            <el-tag size="small" type="warning">Freq Domain</el-tag>
          </div>
          <div class="viz-content spectrogram-container">
            <canvas ref="canvasRef" width="200" height="100"></canvas>
            <div class="axis-label x-axis">时间 (Time) →</div>
            <div class="axis-label y-axis">频率 (Freq) ↑</div>
          </div>
        </div>
      </div>

      <el-divider />

      <el-alert
        title="像看乐谱一样看声音"
        type="info"
        :closable="false"
        show-icon
      >
        <template #default>
          <div class="legend">
            <div class="legend-item">
              <div class="color-box low"></div>
              低能量 (安静)
            </div>
            <div class="legend-item">
              <div class="color-box high"></div>
              高能量 (响亮)
            </div>
          </div>
          <p>
            频谱图将一维的声音信号变成了二维图像，这样我们就可以用
            <strong>CNN (卷积神经网络)</strong> 等图像模型来处理声音了！
          </p>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Right } from '@element-plus/icons-vue'

const canvasRef = ref(null)

onMounted(() => {
  drawSpectrogram()
})

const drawSpectrogram = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // Draw heatmap
  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      // Simulate frequency energy distribution
      // Low frequencies (bottom) have more energy generally
      // High frequencies (top) have less
      const normalizedY = 1 - y / height
      const baseEnergy = normalizedY * 0.8
      const noise = Math.random() * 0.2
      const timeVar = Math.sin(x * 0.1) * 0.2 // Time variation

      let intensity = baseEnergy + noise + timeVar
      intensity = Math.max(0, Math.min(1, intensity))

      const hue = 240 - intensity * 240 // Blue (low) to Red (high)
      ctx.fillStyle = `hsl(${hue}, 80%, 50%)`
      ctx.fillRect(x, height - y - 4, 4, 4)
    }
  }
}
</script>

<style scoped>
.spectrogram-viz {
  margin: 20px 0;
}

.viz-layout {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
}

.viz-box {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.viz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.viz-title {
  font-weight: bold;
  font-size: 0.9em;
}

.viz-content {
  position: relative;
  background: #1a1a1a;
  border-radius: 6px;
  height: 140px;
  padding: 10px 10px 20px 25px; /* Space for axis labels */
  overflow: hidden;
}

.waveform-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wave-bars {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 100%;
  width: 100%;
}

.wave-bar {
  flex: 1;
  background: var(--el-color-success);
  border-radius: 2px;
  animation: wave 1.5s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    height: 20%;
    opacity: 0.6;
  }
  50% {
    height: 90%;
    opacity: 1;
  }
}

.transform-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--el-text-color-secondary);
}

.arrow-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;
}

.fft-text {
  font-size: 0.7em;
  margin-bottom: 5px;
}

.spectrogram-container canvas {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.axis-label {
  position: absolute;
  font-size: 9px;
  color: #666;
}

.x-axis {
  bottom: 2px;
  right: 10px;
}

.y-axis {
  top: 10px;
  left: 2px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.legend {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 0.8em;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.color-box {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.color-box.low {
  background: hsl(240, 80%, 50%);
}

.color-box.high {
  background: hsl(0, 80%, 50%);
}
</style>
