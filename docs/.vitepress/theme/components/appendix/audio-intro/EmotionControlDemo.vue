<!--
  EmotionControlDemo.vue
  情感控制演示组件

  用途：
  展示如何在 TTS 中控制情感、语速、语调等风格特征。

  交互功能：
  - 情感选择器
  - 语速和音调滑块
  - 实时预览
  - 情感向量可视化
-->
<template>
  <div class="emotion-control-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><MagicStick /></el-icon>
          <span>🎭 情感与风格控制</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- 情感选择 -->
        <div class="emotion-selector">
          <div class="selector-title">选择情感风格</div>
          <div class="emotion-grid">
            <div
              v-for="emotion in emotions"
              :key="emotion.id"
              class="emotion-card"
              :class="{ active: selectedEmotion === emotion.id }"
              @click="selectEmotion(emotion.id)"
            >
              <div class="emotion-emoji">{{ emotion.emoji }}</div>
              <div class="emotion-name">{{ emotion.name }}</div>
              <div class="emotion-desc">{{ emotion.description }}</div>
            </div>
          </div>
        </div>

        <!-- 情感向量可视化 -->
        <div class="emotion-embedding">
          <div class="embedding-title">情感向量空间 (Emotion Embedding)</div>
          <canvas
            ref="emotionCanvas"
            width="400"
            height="200"
            class="emotion-canvas"
          />
          <div class="embedding-legend">
            <span
              v-for="emotion in emotions"
              :key="emotion.id"
              class="legend-item"
            >
              <span
                class="legend-dot"
                :style="{ background: emotion.color }"
              />
              {{ emotion.name }}
            </span>
          </div>
        </div>

        <!-- 参数控制 -->
        <div class="parameter-controls">
          <div class="control-title">🎚️ 细粒度控制</div>
          <div class="controls-grid">
            <div class="control-item">
              <div class="control-label">
                <span>语速</span>
                <el-tag size="small">{{ speed }}x</el-tag>
              </div>
              <el-slider v-model="speed" :min="0.5" :max="2" :step="0.1" />
              <div class="control-hint">
                <span>慢</span>
                <span>正常</span>
                <span>快</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>音调</span>
                <el-tag size="small">{{ pitch > 0 ? '+' : '' }}{{ pitch }}</el-tag>
              </div>
              <el-slider v-model="pitch" :min="-10" :max="10" :step="1" />
              <div class="control-hint">
                <span>低</span>
                <span>正常</span>
                <span>高</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>音量动态</span>
                <el-tag size="small">{{ energy }}%</el-tag>
              </div>
              <el-slider v-model="energy" :min="50" :max="150" :step="5" />
              <div class="control-hint">
                <span>柔和</span>
                <span>适中</span>
                <span>激昂</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-label">
                <span>停顿控制</span>
                <el-tag size="small">{{ pause }}ms</el-tag>
              </div>
              <el-slider v-model="pause" :min="0" :max="500" :step="50" />
              <div class="control-hint">
                <span>紧凑</span>
                <span>自然</span>
                <span>舒缓</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 文本输入和预览 -->
        <div class="preview-section">
          <div class="preview-title">🎙️ 预览合成</div>
          <el-input
            v-model="previewText"
            type="textarea"
            :rows="2"
            placeholder="输入要合成的文本..."
            class="preview-input"
          />
          <div class="preview-actions">
            <el-button type="primary" @click="synthesize">
              <el-icon><VideoPlay /></el-icon>
              合成预览
            </el-button>
            <el-button @click="resetParameters">
              <el-icon><RefreshRight /></el-icon>
              重置参数
            </el-button>
          </div>
        </div>

        <!-- 技术说明 -->
        <div class="tech-explanation">
          <el-collapse>
            <el-collapse-item title="🔬 情感控制原理">
              <div class="tech-content">
                <h4>全局风格 Token (Global Style Token)</h4>
                <p>
                  GST (Global Style Token) 是一种从参考音频中提取风格特征的方法。模型学习将情感、语速、语调等风格信息编码成一组 Token，
                  在推理时可以通过选择或插值这些 Token 来控制合成风格。
                </p>

                <h4>参考音频编码</h4>
                <p>
                  用户提供一段带有目标情感的参考音频，编码器提取其风格特征向量。这个向量作为条件输入到 TTS 模型，
                  指导生成相似风格的语音。
                </p>

                <h4>细粒度控制</h4>
                <p>
                  现代 TTS 模型（如 CosyVoice、F5-TTS）支持细粒度的风格控制，包括：
                </p>
                <ul>
                  <li><strong>速度控制：</strong>调整音频播放速度而不改变音调</li>
                  <li><strong>音调控制：</strong>改变基频 (F0) 曲线</li>
                  <li><strong>能量控制：</strong>调整音量包络</li>
                  <li><strong>停顿控制：</strong>调整句间和短语间的停顿长度</li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>情感控制：</strong>
          现代 TTS 系统不仅能合成自然的语音，还能精确控制情感、语速、语调等风格特征。这使得 AI 配音可以适应不同的应用场景，从平静的客服对话到激昂的演讲。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { MagicStick, VideoPlay, RefreshRight } from '@element-plus/icons-vue'

const emotions = [
  { id: 'neutral', name: '中性', emoji: '😐', description: '平稳自然', color: '#909399' },
  { id: 'happy', name: '开心', emoji: '😊', description: '轻快愉悦', color: '#67c23a' },
  { id: 'sad', name: '悲伤', emoji: '😢', description: '低沉缓慢', color: '#409eff' },
  { id: 'angry', name: '愤怒', emoji: '😠', description: '激昂有力', color: '#f56c6c' },
  { id: 'excited', name: '兴奋', emoji: '🤩', description: '热情高涨', color: '#e6a23c' },
  { id: 'calm', name: '平静', emoji: '😌', description: '舒缓放松', color: '#13c2c2' }
]

const selectedEmotion = ref('neutral')
const speed = ref(1.0)
const pitch = ref(0)
const energy = ref(100)
const pause = ref(150)
const previewText = ref('这是一段带有情感控制的语音合成演示。')

const emotionCanvas = ref(null)

const selectEmotion = (id) => {
  selectedEmotion.value = id
  drawEmotionEmbedding()
}

const resetParameters = () => {
  speed.value = 1.0
  pitch.value = 0
  energy.value = 100
  pause.value = 150
  selectedEmotion.value = 'neutral'
  drawEmotionEmbedding()
}

const synthesize = () => {
  // 模拟合成
  console.log('Synthesizing with:', {
    emotion: selectedEmotion.value,
    speed: speed.value,
    pitch: pitch.value,
    energy: energy.value,
    pause: pause.value
  })
}

// 绘制情感向量空间
const drawEmotionEmbedding = () => {
  const canvas = emotionCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  // 绘制坐标轴
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1

  // X轴 (Valence: 消极 -> 积极)
  ctx.beginPath()
  ctx.moveTo(40, height / 2)
  ctx.lineTo(width - 20, height / 2)
  ctx.stroke()

  // Y轴 (Arousal: 平静 -> 兴奋)
  ctx.beginPath()
  ctx.moveTo(width / 2, height - 30)
  ctx.lineTo(width / 2, 20)
  ctx.stroke()

  // 轴标签
  ctx.fillStyle = '#666'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Valence (消极 → 积极)', width / 2, height - 10)

  ctx.save()
  ctx.translate(15, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Arousal (平静 → 兴奋)', 0, 0)
  ctx.restore()

  // 情感位置
  const emotionPositions = {
    neutral: { x: 0.5, y: 0.5 },
    happy: { x: 0.8, y: 0.7 },
    sad: { x: 0.2, y: 0.3 },
    angry: { x: 0.3, y: 0.9 },
    excited: { x: 0.9, y: 0.9 },
    calm: { x: 0.6, y: 0.2 }
  }

  // 绘制所有情感点
  emotions.forEach(emotion => {
    const pos = emotionPositions[emotion.id]
    const x = 50 + pos.x * (width - 80)
    const y = height - 40 - pos.y * (height - 60)

    // 绘制点
    ctx.beginPath()
    ctx.arc(x, y, emotion.id === selectedEmotion.value ? 12 : 8, 0, Math.PI * 2)
    ctx.fillStyle = emotion.color
    ctx.fill()

    // 选中效果
    if (emotion.id === selectedEmotion.value) {
      ctx.strokeStyle = emotion.color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 18, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 标签
    ctx.fillStyle = '#333'
    ctx.font = emotion.id === selectedEmotion.value ? 'bold 12px sans-serif' : '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(emotion.name, x, y + 25)
  })
}

onMounted(drawEmotionEmbedding)
watch(selectedEmotion, drawEmotionEmbedding)
</script>

<style scoped>
.emotion-control-demo {
  margin: 1rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.emotion-selector {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.selector-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.emotion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.emotion-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.emotion-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.emotion-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.emotion-emoji {
  font-size: 2rem;
  margin-bottom: 8px;
}

.emotion-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.emotion-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.emotion-embedding {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.embedding-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.emotion-canvas {
  width: 100%;
  height: auto;
  max-height: 200px;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.embedding-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.parameter-controls {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.control-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.control-item {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
}

.control-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.control-hint {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.preview-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.preview-title {
  font-weight: 500;
  margin-bottom: 16px;
}

.preview-input {
  margin-bottom: 16px;
}

.preview-actions {
  display: flex;
  gap: 12px;
}

.tech-explanation {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.tech-content h4 {
  margin: 16px 0 8px 0;
  color: var(--vp-c-brand);
}

.tech-content h4:first-child {
  margin-top: 0;
}

.tech-content p {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.tech-content ul {
  margin: 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
}

.tech-content li {
  margin-bottom: 8px;
  line-height: 1.5;
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
