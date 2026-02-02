<!--
  AudioQuickStartDemo.vue
  AI 音频快速体验组件

  用途：
  让用户在文章开头就能体验 AI 音频的魅力，通过交互式演示理解文本转语音的基本概念。

  交互功能：
  - 文本输入和语音合成
  - 声音选择（不同音色）
  - 语速和音调调节
  - 实时波形可视化
-->
<template>
  <div class="audio-quickstart">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Microphone /></el-icon>
          <span>🎙️ AI 语音合成体验室</span>
        </div>
      </template>

      <div class="demo-layout">
        <!-- 左侧：控制面板 -->
        <div class="control-panel">
          <div class="input-section">
            <label>输入文本</label>
            <el-input
              v-model="inputText"
              type="textarea"
              :rows="4"
              placeholder="输入你想让 AI 朗读的文本..."
            />
          </div>

          <div class="voice-section">
            <label>选择声音</label>
            <div class="voice-options">
              <div
                v-for="voice in voices"
                :key="voice.id"
                class="voice-card"
                :class="{ active: selectedVoice === voice.id }"
                @click="selectedVoice = voice.id"
              >
                <div class="voice-icon">{{ voice.icon }}</div>
                <div class="voice-name">{{ voice.name }}</div>
                <div class="voice-desc">{{ voice.description }}</div>
              </div>
            </div>
          </div>

          <div class="params-section">
            <div class="param-row">
              <label>语速</label>
              <el-slider v-model="speed" :min="0.5" :max="2" :step="0.1" />
            </div>
            <div class="param-row">
              <label>音调</label>
              <el-slider v-model="pitch" :min="-10" :max="10" :step="1" />
            </div>
          </div>

          <el-button
            type="primary"
            :loading="isSynthesizing"
            @click="synthesize"
            class="synthesize-btn"
          >
            <el-icon><VideoPlay /></el-icon>
            {{ isSynthesizing ? '合成中...' : '开始合成' }}
          </el-button>
        </div>

        <!-- 右侧：可视化展示 -->
        <div class="display-panel">
          <div class="waveform-container">
            <canvas
              ref="waveformCanvas"
              width="400"
              height="200"
              class="waveform-canvas"
            />
            <div v-if="!hasAudio" class="placeholder">
              <el-icon :size="48"><Microphone /></el-icon>
              <p>点击"开始合成"生成语音</p>
            </div>
          </div>

          <div class="audio-controls" v-if="hasAudio">
            <el-button circle @click="togglePlay">
              <el-icon v-if="isPlaying"><VideoPause /></el-icon>
              <el-icon v-else><VideoPlay /></el-icon>
            </el-button>
            <el-slider v-model="playbackProgress" :max="100" class="progress-slider" />
            <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
          </div>

          <div class="audio-info" v-if="hasAudio">
            <el-descriptions :column="2" size="small" border>
              <el-descriptions-item label="采样率">22.05 kHz</el-descriptions-item>
              <el-descriptions-item label="声道">单声道</el-descriptions-item>
              <el-descriptions-item label="语速">{{ speed }}x</el-descriptions-item>
              <el-descriptions-item label="音调">{{ pitch > 0 ? '+' : '' }}{{ pitch }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>小提示：</strong>
          现代 TTS 模型可以生成非常自然的语音。尝试不同的声音和参数，找到最适合你场景的音色。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Microphone, VideoPlay, VideoPause } from '@element-plus/icons-vue'

const inputText = ref('你好，我是 AI 语音助手。我可以将文字转换成自然流畅的语音。')
const selectedVoice = ref('female1')
const speed = ref(1.0)
const pitch = ref(0)
const isSynthesizing = ref(false)
const hasAudio = ref(false)
const isPlaying = ref(false)
const playbackProgress = ref(0)
const currentTime = ref(0)
const duration = ref(0)

const waveformCanvas = ref(null)
let animationId = null

const voices = [
  { id: 'female1', name: '女声 1', icon: '👩', description: '温柔甜美' },
  { id: 'female2', name: '女声 2', icon: '👧', description: '活泼可爱' },
  { id: 'male1', name: '男声 1', icon: '👨', description: '沉稳磁性' },
  { id: 'male2', name: '男声 2', icon: '👦', description: '年轻活力' }
]

// 模拟波形动画
const drawWaveform = (isActive = false) => {
  const canvas = waveformCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  // 绘制背景网格
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1
  for (let i = 0; i < width; i += 40) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, height)
    ctx.stroke()
  }
  for (let i = 0; i < height; i += 40) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(width, i)
    ctx.stroke()
  }

  // 绘制波形
  const centerY = height / 2
  ctx.strokeStyle = isActive ? '#409eff' : '#909399'
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let x = 0; x < width; x++) {
    let amplitude = 0
    if (isActive) {
      // 模拟语音波形
      const t = Date.now() / 1000
      amplitude = Math.sin(x * 0.05 + t * 5) * 30 +
                  Math.sin(x * 0.1 + t * 3) * 20 +
                  Math.random() * 10
    } else {
      // 静态低振幅波形
      amplitude = Math.sin(x * 0.02) * 5
    }
    
    if (x === 0) {
      ctx.moveTo(x, centerY + amplitude)
    } else {
      ctx.lineTo(x, centerY + amplitude)
    }
  }
  ctx.stroke()

  // 填充波形下方
  if (isActive) {
    ctx.lineTo(width, centerY)
    ctx.lineTo(0, centerY)
    ctx.closePath()
    ctx.fillStyle = 'rgba(64, 158, 255, 0.1)'
    ctx.fill()
  }
}

const synthesize = async () => {
  isSynthesizing.value = true
  
  // 模拟合成过程
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  hasAudio.value = true
  isSynthesizing.value = false
  duration.value = inputText.value.length * 0.15 / speed.value
  
  // 开始波形动画
  startWaveformAnimation()
}

const startWaveformAnimation = () => {
  const animate = () => {
    if (!isPlaying.value) {
      drawWaveform(false)
      return
    }
    drawWaveform(true)
    animationId = requestAnimationFrame(animate)
  }
  animate()
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    startWaveformAnimation()
    simulatePlayback()
  } else {
    cancelAnimationFrame(animationId)
    drawWaveform(false)
  }
}

const simulatePlayback = () => {
  if (!isPlaying.value) return
  
  const interval = setInterval(() => {
    if (!isPlaying.value || currentTime.value >= duration.value) {
      clearInterval(interval)
      isPlaying.value = false
      currentTime.value = 0
      playbackProgress.value = 0
      return
    }
    
    currentTime.value += 0.1
    playbackProgress.value = (currentTime.value / duration.value) * 100
  }, 100)
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onMounted(() => {
  drawWaveform(false)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.audio-quickstart {
  margin: 1rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-section label,
.voice-section label,
.params-section label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.voice-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.voice-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.voice-card:hover {
  border-color: var(--vp-c-brand);
}

.voice-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.voice-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.voice-name {
  font-weight: 500;
  font-size: 0.875rem;
}

.voice-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.param-row {
  margin-bottom: 12px;
}

.param-row label {
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.synthesize-btn {
  width: 100%;
  margin-top: auto;
}

.display-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.waveform-container {
  position: relative;
  width: 100%;
  aspect-ratio: 2;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  overflow: hidden;
}

.waveform-canvas {
  width: 100%;
  height: 100%;
}

.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  gap: 8px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-slider {
  flex: 1;
}

.time-display {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  min-width: 100px;
  text-align: right;
}

.audio-info {
  font-size: 0.8rem;
}

.info-box {
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}
</style>
