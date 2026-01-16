<template>
  <div class="tokenization-demo">
    <el-card shadow="never">
      <div class="controls">
        <el-button type="primary" @click="playDemo" :loading="isPlaying">
          <el-icon><VideoPlay /></el-icon> 演示处理流程
        </el-button>
      </div>

      <el-steps
        :active="activeStep"
        align-center
        finish-status="success"
        class="steps"
      >
        <el-step title="音频信号" description="连续波形" />
        <el-step title="切片 (Chunking)" description="20ms/帧" />
        <el-step title="量化 (Quantization)" description="查字典" />
        <el-step title="Token 序列" description="离散数字" />
      </el-steps>

      <div class="stage-display">
        <!-- Stage 0: Audio -->
        <div v-if="activeStep === 0" class="stage-content audio-stage">
          <div class="waveform-viz">
            <div
              class="wave-bar"
              v-for="n in 20"
              :key="n"
              :style="{
                height: 30 + Math.random() * 50 + '%',
                animationDelay: n * 0.1 + 's'
              }"
            ></div>
          </div>
          <div class="stage-desc">原始的连续模拟信号或高采样率数字信号</div>
        </div>

        <!-- Stage 1: Chunks -->
        <div v-if="activeStep === 1" class="stage-content chunks-stage">
          <div class="chunks-container">
            <div class="chunk-item" v-for="n in 5" :key="n">
              <span class="chunk-label">Frame {{ n }}</span>
            </div>
          </div>
          <div class="stage-desc">
            将音频切分为固定长度的小片段（例如 20ms）
          </div>
        </div>

        <!-- Stage 2: Codebook -->
        <div v-if="activeStep === 2" class="stage-content codebook-stage">
          <div class="codebook-grid">
            <div
              class="codebook-entry"
              v-for="n in 9"
              :key="n"
              :class="{ highlight: n === currentMatch }"
            >
              {{ 1024 + n * 50 }}
            </div>
          </div>
          <div class="stage-desc">
            在预训练的"声音字典"中寻找最接近的特征向量
          </div>
        </div>

        <!-- Stage 3: Tokens -->
        <div v-if="activeStep === 3" class="stage-content token-stage">
          <div class="token-list">
            <el-tag
              v-for="(token, index) in tokens"
              :key="index"
              effect="dark"
              size="large"
              class="token-tag"
            >
              {{ token }}
            </el-tag>
          </div>
          <div class="stage-desc">最终转换为 GPT 可以理解的数字序列</div>
        </div>
      </div>

      <el-divider />

      <div class="comparison-box">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="compare-card">
              <div class="compare-title">文本 GPT</div>
              <div class="compare-content">
                <el-tag type="info">我</el-tag>
                <el-tag type="info">爱</el-tag>
                <el-tag type="info">编</el-tag>
                <el-tag type="info">程</el-tag>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="compare-card highlight-border">
              <div class="compare-title">音频 GPT</div>
              <div class="compare-content">
                <el-tag type="warning">1024</el-tag>
                <el-tag type="warning">5678</el-tag>
                <el-tag type="warning">2340</el-tag>
                <el-tag type="warning">8901</el-tag>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-alert
        title="为什么要做 Tokenization?"
        type="warning"
        :closable="false"
        description="因为 GPT 本质上是一个'预测下一个数字'的机器。只有把连续的声音变成离散的数字，才能用 GPT 来生成音频。"
        show-icon
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VideoPlay } from '@element-plus/icons-vue'

const activeStep = ref(0)
const isPlaying = ref(false)
const currentMatch = ref(0)
const tokens = [1024, 5678, 2340, 8901, 3342]

const playDemo = async () => {
  if (isPlaying.value) return
  isPlaying.value = true
  activeStep.value = 0

  // Step 0 -> 1
  await wait(1000)
  activeStep.value = 1

  // Step 1 -> 2
  await wait(1500)
  activeStep.value = 2

  // Simulate codebook matching
  for (let i = 0; i < 5; i++) {
    currentMatch.value = Math.floor(Math.random() * 9) + 1
    await wait(200)
  }
  currentMatch.value = 0

  // Step 2 -> 3
  activeStep.value = 3

  isPlaying.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.tokenization-demo {
  margin: 20px 0;
}

.controls {
  text-align: center;
  margin-bottom: 20px;
}

.steps {
  margin-bottom: 30px;
}

.stage-display {
  background: var(--el-fill-color-light);
  border-radius: 8px;
  padding: 30px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.stage-content {
  text-align: center;
  width: 100%;
}

.stage-desc {
  margin-top: 15px;
  color: var(--el-text-color-secondary);
  font-size: 0.9em;
}

/* Audio Stage */
.waveform-viz {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.wave-bar {
  width: 6px;
  background: var(--el-color-primary);
  border-radius: 3px;
  animation: wave 1s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    height: 30%;
    opacity: 0.5;
  }
  50% {
    height: 100%;
    opacity: 1;
  }
}

/* Chunks Stage */
.chunks-container {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.chunk-item {
  width: 60px;
  height: 60px;
  background: var(--el-color-primary-light-8);
  border: 1px solid var(--el-color-primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chunk-label {
  font-size: 10px;
  color: var(--el-color-primary);
}

/* Codebook Stage */
.codebook-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

.codebook-entry {
  padding: 10px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  font-family: monospace;
  transition: all 0.3s;
}

.codebook-entry.highlight {
  background: var(--el-color-warning);
  color: white;
  transform: scale(1.1);
  border-color: var(--el-color-warning);
}

/* Token Stage */
.token-list {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.token-tag {
  font-family: monospace;
  font-weight: bold;
}

.comparison-box {
  margin-top: 20px;
  margin-bottom: 20px;
}

.compare-card {
  background: var(--el-bg-color-page);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid transparent;
}

.highlight-border {
  border-color: var(--el-color-warning);
  background: var(--el-color-warning-light-9);
}

.compare-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.compare-content {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
