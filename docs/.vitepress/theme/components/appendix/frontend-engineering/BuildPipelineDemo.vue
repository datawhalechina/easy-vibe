<!--
  BuildPipelineDemo.vue
  构建流水线可视化演示

  用途：
  展示前端工程化的完整构建流程，从源代码到生产部署的全过程。

  交互功能：
  - 步骤播放：逐步展示构建流程的每个阶段
  - 速度控制：调整演示速度
  - 阶段详情：点击每个阶段查看详细信息
-->
<template>
  <div class="build-pipeline-demo">
    <div class="control-panel">
      <div class="title-section">
        <span class="icon">🏭</span>
        <span class="title">构建流水线</span>
        <span class="subtitle">从代码到部署的完整旅程</span>
      </div>
      <div class="controls">
        <button
          class="control-btn"
          @click="togglePlay"
          :class="{ active: isPlaying }"
        >
          {{ isPlaying ? '⏸ 暂停' : '▶ 播放' }}
        </button>
        <button class="control-btn outline" @click="reset">
          ↺ 重置
        </button>
        <div class="speed-control">
          <label>速度:</label>
          <select v-model="playbackSpeed">
            <option :value="0.5">0.5x</option>
            <option :value="1">1x</option>
            <option :value="2">2x</option>
            <option :value="4">4x</option>
          </select>
        </div>
      </div>
    </div>

    <div class="pipeline-visualization">
      <div class="pipeline-track">
        <div
          v-for="(stage, index) in stages"
          :key="stage.id"
          class="stage-node"
          :class="{
            completed: currentStage > index,
            active: currentStage === index,
            pending: currentStage < index
          }"
          @click="selectStage(index)"
        >
          <div class="stage-icon">{{ stage.icon }}</div>
          <div class="stage-info">
            <div class="stage-name">{{ stage.name }}</div>
            <div class="stage-duration" v-if="stageDurations[index]">
              {{ stageDurations[index] }}ms
            </div>
          </div>
          <div class="stage-status">
            <span v-if="currentStage > index" class="status-icon success">✓</span>
            <span v-else-if="currentStage === index" class="status-icon loading">
              <span class="spinner"></span>
            </span>
            <span v-else class="status-icon pending">○</span>
          </div>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${(currentStage / stages.length) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="stage-details" v-if="selectedStage !== null">
      <div class="detail-header">
        <span class="detail-icon">{{ stages[selectedStage].icon }}</span>
        <span class="detail-title">{{ stages[selectedStage].name }}</span>
      </div>
      <div class="detail-content">
        <div class="detail-section">
          <h4>📝 阶段说明</h4>
          <p>{{ stages[selectedStage].description }}</p>
        </div>
        <div class="detail-section">
          <h4>🔧 执行的工具</h4>
          <div class="tools-list">
            <span
              v-for="tool in stages[selectedStage].tools"
              :key="tool"
              class="tool-tag"
            >
              {{ tool }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <h4>📂 输入输出</h4>
          <div class="io-info">
            <div class="io-item">
              <span class="io-label">输入:</span>
              <span class="io-value">{{ stages[selectedStage].input }}</span>
            </div>
            <div class="io-item">
              <span class="io-label">输出:</span>
              <span class="io-value">{{ stages[selectedStage].output }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>构建流水线的作用：</strong>
        就像工厂的生产线一样，代码也需要经过一系列"加工工序"才能变成用户可以访问的网站。
        每个阶段都有特定的任务，确保最终产出的代码是优化过、无错误且性能良好的。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const stages = [
  {
    id: 'lint',
    name: '代码检查',
    icon: '🔍',
    description: '使用 ESLint、Prettier 等工具检查代码规范，确保代码风格一致，提前发现潜在问题。',
    tools: ['ESLint', 'Prettier', 'Stylelint'],
    input: '源代码 (.js, .vue, .css)',
    output: '检查报告'
  },
  {
    id: 'transform',
    name: '代码转换',
    icon: '⚙️',
    description: '将现代 JavaScript/TypeScript 转换为兼容旧浏览器的代码，处理 JSX、Vue SFC 等。',
    tools: ['Babel', 'TypeScript', 'SWC'],
    input: 'ES6+/TS/JSX 源码',
    output: 'ES5 兼容代码'
  },
  {
    id: 'dependency',
    name: '依赖解析',
    icon: '📦',
    description: '分析模块依赖关系，构建依赖图谱，确定模块加载顺序。',
    tools: ['Webpack', 'Rollup', 'esbuild'],
    input: '入口文件 (main.js)',
    output: '依赖图谱'
  },
  {
    id: 'bundle',
    name: '模块打包',
    icon: '📚',
    description: '将所有模块合并成一个或多个 bundle，优化加载性能。',
    tools: ['Webpack', 'Vite', 'Parcel'],
    input: '模块文件',
    output: 'bundle 文件'
  },
  {
    id: 'optimize',
    name: '代码优化',
    icon: '✨',
    description: '压缩代码、Tree Shaking 移除无用代码、代码分割、生成 Source Map。',
    tools: ['Terser', 'esbuild', 'Webpack'],
    input: '未优化的 bundle',
    output: '优化后的代码'
  },
  {
    id: 'assets',
    name: '资源处理',
    icon: '🖼️',
    description: '处理图片、字体、CSS 等资源，生成资源指纹(hash)，优化缓存策略。',
    tools: ['file-loader', 'url-loader', 'ImageMagick'],
    input: '原始资源文件',
    output: '带 hash 的资源'
  },
  {
    id: 'deploy',
    name: '部署发布',
    icon: '🚀',
    description: '将构建产物上传到 CDN 或服务器，配置缓存策略，完成发布。',
    tools: ['AWS S3', 'Vercel', 'Netlify'],
    input: 'dist 目录',
    output: '线上网站'
  }
]

const currentStage = ref(0)
const selectedStage = ref(null)
const isPlaying = ref(false)
const playbackSpeed = ref(1)
const stageDurations = ref({})
let playInterval = null

const togglePlay = () => {
  if (isPlaying.value) {
    pausePlay()
  } else {
    startPlay()
  }
}

const startPlay = () => {
  isPlaying.value = true
  playInterval = setInterval(() => {
    if (currentStage.value < stages.length) {
      const startTime = Date.now()
      stageDurations.value[currentStage.value] = Math.floor(Math.random() * 500 + 100)
      currentStage.value++
    } else {
      pausePlay()
    }
  }, 2000 / playbackSpeed.value)
}

const pausePlay = () => {
  isPlaying.value = false
  if (playInterval) {
    clearInterval(playInterval)
    playInterval = null
  }
}

const reset = () => {
  pausePlay()
  currentStage.value = 0
  selectedStage.value = null
  stageDurations.value = {}
}

const selectStage = (index) => {
  selectedStage.value = index
}

onMounted(() => {
  // Auto-start for demo
  setTimeout(() => {
    if (currentStage.value === 0) {
      startPlay()
    }
  }, 1000)
})

onUnmounted(() => {
  pausePlay()
})
</script>

<style scoped>
.build-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  gap: 1rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-section .icon {
  font-size: 1.5rem;
}

.title-section .title {
  font-weight: bold;
  font-size: 1.1rem;
}

.title-section .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.control-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.control-btn.outline {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.control-btn:hover {
  opacity: 0.85;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
}

.speed-control select {
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.8rem;
}

.pipeline-visualization {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.pipeline-track {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  z-index: 0;
}

.progress-fill {
  width: 100%;
  background: linear-gradient(180deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  border-radius: 2px;
  transition: height 0.5s ease;
}

.stage-node {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.stage-node:hover {
  transform: translateX(4px);
}

.stage-node.completed {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.stage-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.2);
  animation: pulse 2s infinite;
}

.stage-node.pending {
  opacity: 0.6;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.2); }
  50% { box-shadow: 0 0 0 6px rgba(var(--vp-c-brand-rgb), 0.1); }
}

.stage-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.stage-info {
  flex: 1;
}

.stage-name {
  font-weight: bold;
  font-size: 0.95rem;
}

.stage-duration {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.1rem;
}

.stage-status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
}

.status-icon {
  font-size: 1rem;
}

.status-icon.success {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.status-icon.pending {
  color: var(--vp-c-text-3);
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.stage-details {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-weight: bold;
  font-size: 1rem;
}

.detail-content {
  display: grid;
  gap: 0.75rem;
}

.detail-section h4 {
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.detail-section p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tool-tag {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.io-info {
  display: grid;
  gap: 0.3rem;
}

.io-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.io-label {
  color: var(--vp-c-text-3);
  min-width: 50px;
}

.io-value {
  color: var(--vp-c-text-1);
  font-family: monospace;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .stage-node {
    padding: 0.5rem;
  }

  .stage-icon {
    width: 32px;
    height: 32px;
    font-size: 1.25rem;
  }
}
</style>
