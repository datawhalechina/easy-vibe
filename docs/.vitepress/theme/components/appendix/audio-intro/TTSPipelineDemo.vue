<!--
  TTSPipelineDemo.vue
  TTS 流程演示组件

  用途：
  展示文本转语音的完整流程，对比不同架构（自回归/非自回归/流匹配）。
-->
<template>
  <div class="tts-pipeline-demo">
    <div class="header">
      <div class="title">🔄 TTS 架构演进：从慢到快</div>
      <div class="subtitle">
        探索文本如何变成语音，以及不同架构的优劣对比
      </div>
    </div>

    <div class="arch-selector">
      <button
        v-for="arch in architectures"
        :key="arch.id"
        @click="selectArch(arch.id)"
        class="arch-btn"
        :class="{ active: selectedArch === arch.id }"
      >
        <span class="arch-icon">{{ arch.icon }}</span>
        <span class="arch-name">{{ arch.name }}</span>
        <span class="arch-tag" :class="arch.tagClass">{{ arch.tag }}</span>
      </button>
    </div>

    <div class="pipeline-flow">
      <div
        v-for="(stage, index) in currentStages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === index }"
        @click="activeStage = index"
      >
        <div class="stage-num">{{ index + 1 }}</div>
        <div class="stage-content">
          <div class="stage-icon">{{ stage.icon }}</div>
          <div class="stage-name">{{ stage.name }}</div>
          <div class="stage-desc">{{ stage.shortDesc }}</div>
        </div>
        <div v-if="index < currentStages.length - 1" class="stage-arrow">→</div>
      </div>
    </div>

    <div class="stage-detail" v-if="currentStage">
      <div class="detail-header">
        <span class="detail-icon">{{ currentStage.icon }}</span>
        <div>
          <div class="detail-name">{{ currentStage.name }}</div>
          <div class="detail-desc">{{ currentStage.description }}</div>
        </div>
      </div>
      <div class="detail-canvas">
        <canvas ref="detailCanvas" width="500" height="150"></canvas>
      </div>
      <div class="detail-meta">
        <div class="meta-item">
          <span class="label">输入:</span>
          <span>{{ currentStage.input }}</span>
        </div>
        <div class="meta-item">
          <span class="label">输出:</span>
          <span>{{ currentStage.output }}</span>
        </div>
        <div class="meta-item">
          <span class="label">技术:</span>
          <span>{{ currentStage.tech }}</span>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">📊 架构对比</div>
      <div class="table">
        <div class="table-header">
          <div class="cell">特性</div>
          <div class="cell">自回归</div>
          <div class="cell">非自回归</div>
          <div class="cell">流匹配</div>
        </div>
        <div
          v-for="row in comparisonRows"
          :key="row.feature"
          class="table-row"
        >
          <div class="cell feature">{{ row.feature }}</div>
          <div class="cell" :class="{ highlight: selectedArch === 'ar' }">{{ row.ar }}</div>
          <div class="cell" :class="{ highlight: selectedArch === 'nar' }">{{ row.nar }}</div>
          <div class="cell" :class="{ highlight: selectedArch === 'flow' }">{{ row.flow }}</div>
        </div>
      </div>
    </div>

    <div class="models-section">
      <div class="models-title">🏆 代表模型</div>
      <div class="models-grid">
        <div
          v-for="model in models"
          :key="model.name"
          class="model-card"
          :class="{ active: model.arch === selectedArch }"
        >
          <div class="model-name">{{ model.name }}</div>
          <span class="model-tag" :class="model.tagClass">{{ model.type }}</span>
          <div class="model-desc">{{ model.desc }}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <p>
        <strong>TTS 演进趋势：</strong>
        从早期的自回归模型（如 Tacotron）到非自回归（如 FastSpeech），再到最新的流匹配模型（如 F5-TTS），
        TTS 技术正在向更快、更稳定、更高质量的方向发展。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const architectures = [
  { id: 'ar', name: '自回归', icon: '📝', tag: 'AR', tagClass: 'primary' },
  { id: 'nar', name: '非自回归', icon: '⚡', tag: 'NAR', tagClass: 'success' },
  { id: 'flow', name: '流匹配', icon: '🌊', tag: 'Flow', tagClass: 'warning' }
]

const pipelineStages = {
  ar: [
    { id: 'text', name: '文本处理', icon: '📝', shortDesc: '分词 & 音素', description: '将输入文本转换为音素序列', input: '原始文本', output: '音素序列', tech: 'G2P' },
    { id: 'encoder', name: '文本编码', icon: '🔢', shortDesc: '提取特征', description: '使用 Encoder 编码文本', input: '音素序列', output: '文本特征', tech: 'Transformer' },
    { id: 'decoder', name: '自回归解码', icon: '🎯', shortDesc: '逐帧生成', description: '逐个时间步生成梅尔频谱', input: '文本特征', output: '梅尔频谱', tech: 'AR Decoder' },
    { id: 'vocoder', name: '声码器', icon: '🔊', shortDesc: '频谱转波形', description: '将频谱转换为音频波形', input: '梅尔频谱', output: '音频波形', tech: 'HiFi-GAN' }
  ],
  nar: [
    { id: 'text', name: '文本处理', icon: '📝', shortDesc: '分词 & 音素', description: '将输入文本转换为音素序列', input: '原始文本', output: '音素序列', tech: 'G2P' },
    { id: 'duration', name: '时长预测', icon: '⏱️', shortDesc: '预测时长', description: '预测每个音素的帧数', input: '音素序列', output: '时长信息', tech: 'Duration Predictor' },
    { id: 'decoder', name: '并行解码', icon: '⚡', shortDesc: '一次性生成', description: '并行生成完整梅尔频谱', input: '文本特征', output: '梅尔频谱', tech: 'Non-AR Transformer' },
    { id: 'vocoder', name: '声码器', icon: '🔊', shortDesc: '频谱转波形', description: '将频谱转换为音频波形', input: '梅尔频谱', output: '音频波形', tech: 'HiFi-GAN' }
  ],
  flow: [
    { id: 'text', name: '文本处理', icon: '📝', shortDesc: '分词 & 音素', description: '将输入文本转换为音素序列', input: '原始文本', output: '音素序列', tech: 'G2P' },
    { id: 'embedding', name: '文本嵌入', icon: '🔢', shortDesc: '特征提取', description: '将音素转换为向量', input: '音素序列', output: '文本嵌入', tech: 'DiT' },
    { id: 'flow', name: '流匹配', icon: '🌊', shortDesc: '最优传输', description: '使用流匹配生成频谱', input: '文本嵌入', output: '梅尔频谱', tech: 'Flow Matching' },
    { id: 'vocoder', name: '声码器', icon: '🔊', shortDesc: '频谱转波形', description: '将频谱转换为音频波形', input: '梅尔频谱', output: '音频波形', tech: 'Vocoder' }
  ]
}

const comparisonRows = [
  { feature: '生成速度', ar: '慢', nar: '快', flow: '很快' },
  { feature: '音质', ar: '高', nar: '中高', flow: '高' },
  { feature: '稳定性', ar: '中', nar: '高', flow: '高' },
  { feature: '可控性', ar: '中', nar: '高', flow: '高' }
]

const models = [
  { name: 'Tacotron 2', arch: 'ar', type: 'AR', tagClass: 'primary', desc: '经典 AR 模型，音质优秀' },
  { name: 'FastSpeech 2', arch: 'nar', type: 'NAR', tagClass: 'success', desc: '并行生成，速度快' },
  { name: 'F5-TTS', arch: 'flow', type: 'Flow', tagClass: 'warning', desc: '最新 SOTA，10 步生成' },
  { name: 'CosyVoice', arch: 'flow', type: 'Flow', tagClass: 'warning', desc: '阿里开源，支持多语言' }
]

const selectedArch = ref('flow')
const activeStage = ref(0)
const detailCanvas = ref(null)

const currentStages = computed(() => pipelineStages[selectedArch.value])
const currentStage = computed(() => currentStages.value[activeStage.value])

const selectArch = (id) => {
  selectedArch.value = id
  activeStage.value = 0
}

const drawVisualization = () => {
  const canvas = detailCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  const stage = currentStage.value
  if (!stage) return

  // 根据阶段绘制不同的可视化
  if (stage.id === 'text') {
    // 文本到音素
    ctx.font = '16px sans-serif'
    ctx.fillStyle = '#333'
    ctx.fillText('"Hello"', 50, h/2)

    ctx.strokeStyle = '#409eff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(120, h/2)
    ctx.lineTo(200, h/2)
    ctx.stroke()

    const phonemes = ['h', 'ə', 'l', 'oʊ']
    let x = 220
    phonemes.forEach((p, i) => {
      ctx.fillStyle = `hsl(${200 + i * 30}, 70%, 50%)`
      ctx.fillRect(x, h/2 - 15, 30, 30)
      ctx.fillStyle = '#fff'
      ctx.fillText(p, x + 8, h/2 + 5)
      x += 40
    })
  } else if (stage.id === 'decoder' && selectedArch.value === 'ar') {
    // 自回归解码
    for (let i = 0; i < 5; i++) {
      const x = 80 + i * 80
      for (let j = 0; j < 8; j++) {
        const barH = Math.random() * 40 + 10
        ctx.fillStyle = `rgba(64, 158, 255, ${0.5 + i * 0.1})`
        ctx.fillRect(x + j * 8, h - 50 - barH, 6, barH)
      }
      if (i < 4) {
        ctx.strokeStyle = '#ccc'
        ctx.beginPath()
        ctx.moveTo(x + 70, h/2)
        ctx.lineTo(x + 80, h/2)
        ctx.stroke()
      }
    }
    ctx.fillStyle = '#666'
    ctx.fillText('逐个时间步生成', 50, 30)
  } else if (stage.id === 'flow') {
    // 流匹配
    ctx.strokeStyle = '#409eff'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(50, h - 50)
    for (let t = 0; t <= 1; t += 0.02) {
      const x = 50 + t * 400
      const y = h - 50 - t * (h - 100) + Math.sin(t * Math.PI * 4) * 20
      ctx.lineTo(x, y)
    }
    ctx.stroke()

    const steps = [0, 0.25, 0.5, 0.75, 1]
    steps.forEach((t, i) => {
      const x = 50 + t * 400
      const y = h - 50 - t * (h - 100) + Math.sin(t * Math.PI * 4) * 20
      ctx.fillStyle = '#e6a23c'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
    })
  }
}

onMounted(drawVisualization)
watch([selectedArch, activeStage], drawVisualization)
</script>

<style scoped>
.tts-pipeline-demo {
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

.arch-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.arch-btn {
  padding: 12px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.arch-btn:hover {
  border-color: var(--vp-c-brand);
}

.arch-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.arch-icon {
  font-size: 20px;
}

.arch-name {
  font-weight: 500;
}

.arch-tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}

.arch-tag.primary { background: #409eff33; color: #409eff; }
.arch-tag.success { background: #67c23a33; color: #67c23a; }
.arch-tag.warning { background: #e6a23c33; color: #e6a23c; }

.pipeline-flow {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  margin-bottom: 20px;
}

.stage {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.stage-content {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  transition: all 0.2s;
  min-width: 100px;
}

.stage:hover .stage-content,
.stage.active .stage-content {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.stage-num {
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.stage-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.stage-name {
  font-weight: 500;
  font-size: 13px;
}

.stage-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.stage-arrow {
  color: var(--vp-c-text-3);
  font-size: 20px;
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.detail-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.detail-icon {
  font-size: 32px;
}

.detail-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.detail-canvas {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 16px;
}

.detail-canvas canvas {
  width: 100%;
  height: auto;
}

.detail-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 13px;
}

.meta-item .label {
  color: var(--vp-c-text-3);
  margin-right: 4px;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.table-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background: var(--vp-c-bg);
}

.table-header {
  font-weight: 600;
  background: var(--vp-c-bg-mute);
}

.cell {
  padding: 12px;
  text-align: center;
  font-size: 13px;
}

.cell.feature {
  text-align: left;
  font-weight: 500;
}

.cell.highlight {
  background: rgba(64, 158, 255, 0.1);
  color: var(--vp-c-brand);
  font-weight: 500;
}

.models-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.models-title {
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.model-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.model-card.active {
  border-color: var(--vp-c-brand);
}

.model-name {
  font-weight: 600;
  margin-bottom: 8px;
}

.model-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
}

.model-tag.primary { background: #409eff33; color: #409eff; }
.model-tag.success { background: #67c23a33; color: #67c23a; }
.model-tag.warning { background: #e6a23c33; color: #e6a23c; }

.model-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
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
  .pipeline-flow {
    flex-direction: column;
  }
  .stage-arrow {
    transform: rotate(90deg);
  }
}
</style>
