<!--
  ASRvsTTSDemo.vue
  ASR 与 TTS 双向转换演示组件

  用途：
  展示语音识别(ASR)和语音合成(TTS)的互逆过程。
-->
<template>
  <div class="asr-tts-demo">
    <div class="header">
      <div class="title">🔄 ASR ↔ TTS：语音的双向转换</div>
      <div class="subtitle">
        探索语音识别和语音合成的互逆过程
      </div>
    </div>

    <div class="conversion-flow">
      <!-- ASR 区域 -->
      <div class="flow-section">
        <div class="section-header">
          <span class="section-icon">🎙️</span>
          <div>
            <div class="section-name">ASR 语音识别</div>
            <div class="section-desc">音频 → 文本</div>
          </div>
        </div>

        <div class="demo-box">
          <div class="input-area">
            <button
              class="record-btn"
              :class="{ recording: isRecording }"
              @click="toggleRecording"
            >
              <span class="record-icon">{{ isRecording ? '⏹' : '🎤' }}</span>
              <span>{{ isRecording ? '停止录音' : '开始录音' }}</span>
            </button>
            <div class="or-text">或</div>
            <button class="upload-audio-btn" @click="uploadAudio">
              📁 上传音频
            </button>
          </div>

          <div v-if="recordedAudio" class="audio-preview">
            <canvas ref="inputWaveform" width="300" height="60"></canvas>
          </div>

          <button
            class="process-btn"
            :disabled="!recordedAudio || isProcessingASR"
            @click="processASR"
          >
            <span v-if="isProcessingASR" class="spinner"></span>
            <span v-else>🔍 识别语音</span>
          </button>

          <div v-if="asrResult" class="result-box">
            <div class="result-label">识别结果</div>
            <div class="result-text">{{ asrResult }}</div>
            <div class="result-meta">
              <span>置信度: {{ asrConfidence }}%</span>
              <span>耗时: {{ asrTime }}ms</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间转换 -->
      <div class="flow-arrow">
        <div class="arrow-line"></div>
        <div class="arrow-btns">
          <button
            class="arrow-btn"
            :class="{ active: direction === 'asr' }"
            @click="direction = 'asr'"
          >
            ASR →
          </button>
          <button
            class="arrow-btn"
            :class="{ active: direction === 'tts' }"
            @click="direction = 'tts'"
          >
            ← TTS
          </button>
        </div>
      </div>

      <!-- TTS 区域 -->
      <div class="flow-section">
        <div class="section-header">
          <span class="section-icon">🔊</span>
          <div>
            <div class="section-name">TTS 语音合成</div>
            <div class="section-desc">文本 → 音频</div>
          </div>
        </div>

        <div class="demo-box">
          <div class="input-area">
            <textarea
              v-model="ttsInput"
              placeholder="输入要合成的文本..."
              rows="3"
            ></textarea>
          </div>

          <div class="voice-select">
            <label>选择声音:</label>
            <div class="voice-options">
              <button
                v-for="voice in voices"
                :key="voice.id"
                class="voice-btn"
                :class="{ active: selectedVoice === voice.id }"
                @click="selectedVoice = voice.id"
              >
                {{ voice.icon }} {{ voice.name }}
              </button>
            </div>
          </div>

          <button
            class="process-btn tts"
            :disabled="!ttsInput.trim() || isProcessingTTS"
            @click="processTTS"
          >
            <span v-if="isProcessingTTS" class="spinner"></span>
            <span v-else>🗣 合成语音</span>
          </button>

          <div v-if="ttsResult" class="result-box audio-result">
            <div class="result-label">合成结果</div>
            <canvas ref="outputWaveform" width="300" height="60"></canvas>
            <div class="audio-controls">
              <button class="play-btn" @click="playResult">
                {{ playing ? '⏸' : '▶' }}
              </button>
              <div class="progress-bar">
                <div class="progress" :style="{ width: playProgress + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="comp-title">📊 ASR vs TTS 对比</div>
      <div class="comp-grid">
        <div class="comp-card">
          <div class="comp-icon">🎙️</div>
          <div class="comp-name">ASR</div>
          <div class="comp-items">
            <div class="comp-item">
              <span class="label">输入:</span>
              <span>音频波形</span>
            </div>
            <div class="comp-item">
              <span class="label">输出:</span>
              <span>文本序列</span>
            </div>
            <div class="comp-item">
              <span class="label">难点:</span>
              <span>噪声、口音、同音词</span>
            </div>
          </div>
        </div>

        <div class="comp-card">
          <div class="comp-icon">🔊</div>
          <div class="comp-name">TTS</div>
          <div class="comp-items">
            <div class="comp-item">
              <span class="label">输入:</span>
              <span>文本序列</span>
            </div>
            <div class="comp-item">
              <span class="label">输出:</span>
              <span>音频波形</span>
            </div>
            <div class="comp-item">
              <span class="label">难点:</span>
              <span>韵律、情感、自然度</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pipeline-comparison">
      <div class="pipe-title">🔀 架构对比</div>
      <div class="pipeline-diagram">
        <div class="pipeline asr-pipe">
          <div class="pipe-label">ASR Pipeline</div>
          <div class="pipe-flow">
            <div class="pipe-step">音频</div>
            <span>→</span>
            <div class="pipe-step">特征</div>
            <span>→</span>
            <div class="pipe-step">Encoder</div>
            <span>→</span>
            <div class="pipe-step">Decoder</div>
            <span>→</span>
            <div class="pipe-step output">文本</div>
          </div>
        </div>

        <div class="pipeline tts-pipe">
          <div class="pipe-label">TTS Pipeline</div>
          <div class="pipe-flow">
            <div class="pipe-step">文本</div>
            <span>→</span>
            <div class="pipe-step">Encoder</div>
            <span>→</span>
            <div class="pipe-step">Decoder</div>
            <span>→</span>
            <div class="pipe-step">声码器</div>
            <span>→</span>
            <div class="pipe-step output">音频</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <p>
        <strong>互逆关系：</strong>
        ASR 和 TTS 是语音技术的两个核心方向，互为逆过程。
        ASR 将连续的音频信号转换为离散的文本，TTS 则将离散的文本转换为连续的音频信号。
        两者都依赖于声学模型和语言模型。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const direction = ref('asr')
const isRecording = ref(false)
const recordedAudio = ref(false)
const isProcessingASR = ref(false)
const asrResult = ref('')
const asrConfidence = ref(0)
const asrTime = ref(0)

const ttsInput = ref('')
const selectedVoice = ref('default')
const isProcessingTTS = ref(false)
const ttsResult = ref(false)
const playing = ref(false)
const playProgress = ref(0)

const voices = [
  { id: 'default', name: '默认', icon: '🎙️' },
  { id: 'male', name: '男声', icon: '👨' },
  { id: 'female', name: '女声', icon: '👩' },
  { id: 'child', name: '童声', icon: '🧒' }
]

const inputWaveform = ref(null)
const outputWaveform = ref(null)

const toggleRecording = () => {
  isRecording.value = !isRecording.value
  if (!isRecording.value) {
    recordedAudio.value = true
    drawWaveform(inputWaveform.value)
  }
}

const uploadAudio = () => {
  recordedAudio.value = true
  setTimeout(() => drawWaveform(inputWaveform.value), 100)
}

const drawWaveform = (canvas) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#409eff'
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let x = 0; x < w; x += 2) {
    const y = h / 2 + Math.sin(x * 0.1) * 20 + (Math.random() - 0.5) * 10
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }

  ctx.stroke()
}

const processASR = () => {
  isProcessingASR.value = true
  asrResult.value = ''

  setTimeout(() => {
    isProcessingASR.value = false
    asrResult.value = '这是一段示例语音识别结果，展示了 ASR 的工作效果。'
    asrConfidence.value = 94
    asrTime.value = 320
    ttsInput.value = asrResult.value
  }, 1500)
}

const processTTS = () => {
  isProcessingTTS.value = true
  ttsResult.value = false

  setTimeout(() => {
    isProcessingTTS.value = false
    ttsResult.value = true
    setTimeout(() => drawWaveform(outputWaveform.value), 100)
  }, 1500)
}

const playResult = () => {
  playing.value = !playing.value
  if (playing.value) {
    playProgress.value = 0
    const interval = setInterval(() => {
      playProgress.value += 2
      if (playProgress.value >= 100) {
        playing.value = false
        playProgress.value = 0
        clearInterval(interval)
      }
    }, 100)
  }
}

onMounted(() => {
  if (recordedAudio.value) drawWaveform(inputWaveform.value)
})
</script>

<style scoped>
.asr-tts-demo {
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

.conversion-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.flow-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  font-size: 32px;
}

.section-name {
  font-weight: 600;
}

.section-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.demo-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.record-btn {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.record-btn:hover {
  border-color: #f56c6c;
}

.record-btn.recording {
  background: #f56c6c;
  color: white;
  border-color: #f56c6c;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.record-icon {
  font-size: 20px;
}

.or-text {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.upload-audio-btn {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.audio-preview {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px;
}

.audio-preview canvas {
  width: 100%;
  height: auto;
}

.process-btn {
  padding: 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.process-btn.tts {
  background: #67c23a;
}

.process-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.result-box {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.result-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.result-text {
  font-size: 14px;
  line-height: 1.5;
}

.result-meta {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  resize: vertical;
}

.voice-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.voice-select label {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.voice-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.voice-btn {
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.voice-btn.active {
  background: #67c23a;
  color: white;
  border-color: #67c23a;
}

.audio-result canvas {
  width: 100%;
  height: auto;
  margin-bottom: 12px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #67c23a;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #67c23a;
  transition: width 0.1s;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.arrow-line {
  width: 2px;
  height: 100px;
  background: var(--vp-c-divider);
}

.arrow-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.arrow-btn {
  padding: 8px 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
}

.arrow-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.comparison-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.comp-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.comp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.comp-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.comp-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.comp-name {
  font-weight: 600;
  margin-bottom: 12px;
}

.comp-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.comp-item {
  font-size: 13px;
}

.comp-item .label {
  color: var(--vp-c-text-3);
}

.pipeline-comparison {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.pipe-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.pipeline-diagram {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pipeline {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
}

.pipe-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
}

.pipe-flow {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.pipe-step {
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
}

.pipe-step.output {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
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

@media (max-width: 768px) {
  .conversion-flow {
    grid-template-columns: 1fr;
  }
  .flow-arrow {
    flex-direction: row;
  }
  .arrow-line {
    width: 100px;
    height: 2px;
  }
  .arrow-btns {
    flex-direction: row;
  }
}
</style>
