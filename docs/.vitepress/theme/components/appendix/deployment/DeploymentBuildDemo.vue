<script setup>
import { ref, computed } from 'vue'

const files = ref([
  { name: 'App.vue', size: '5KB', status: 'pending' },
  { name: 'main.js', size: '2KB', status: 'pending' },
  { name: 'utils.js', size: '8KB', status: 'pending' },
  { name: 'style.css', size: '15KB', status: 'pending' }
])

const buildProgress = ref(0)
const buildStatus = ref('idle') // idle, building, completed
const optimizedSize = ref('0KB')
const originalSize = ref('30KB')

const startBuild = () => {
  buildStatus.value = 'building'
  buildProgress.value = 0
  files.value.forEach(f => f.status = 'pending')

  // 模拟构建过程
  const steps = [
    { progress: 20, file: 0 },
    { progress: 40, file: 1 },
    { progress: 60, file: 2 },
    { progress: 80, file: 3 },
    { progress: 100, file: -1 }
  ]

  steps.forEach((step, idx) => {
    setTimeout(() => {
      buildProgress.value = step.progress
      if (step.file >= 0) {
        files.value[step.file].status = 'completed'
      }
      if (idx === steps.length - 1) {
        buildStatus.value = 'completed'
        optimizedSize.value = '12KB'
      }
    }, (idx + 1) * 600)
  })
}

const resetBuild = () => {
  buildStatus.value = 'idle'
  buildProgress.value = 0
  files.value.forEach(f => f.status = 'pending')
  optimizedSize.value = '0KB'
}
</script>

<template>
  <div class="deployment-build">
    <div class="demo-header">
      <h3>构建过程演示</h3>
      <p class="subtitle">把原材料变成成品的过程</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明制作咖啡前要<strong>研磨咖啡豆</strong>、<strong>调配比例</strong>、<strong>加热融合</strong>，
        代码构建也需要<strong>编译</strong>、<strong>压缩</strong>、<strong>优化</strong>才能变成可以部署的成品。
      </p>
    </div>

    <div class="demo-content">
      <!-- 源文件列表 -->
      <div class="source-files">
        <div class="section-title">📁 源代码文件</div>
        <div class="file-list">
          <div
            v-for="(file, idx) in files"
            :key="file.name"
            class="file-item"
            :class="{ completed: file.status === 'completed' }"
          >
            <div class="file-icon">📄</div>
            <div class="file-info">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-size">{{ file.size }}</div>
            </div>
            <div class="file-status">
              <span v-if="file.status === 'completed'" class="status-badge success">✓ 已处理</span>
              <span v-else class="status-badge pending">待处理</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 构建流程 -->
      <div class="build-process">
        <div class="section-title">⚙️ 构建流程</div>
        <div class="pipeline">
          <div class="pipeline-step">
            <div class="step-icon">1️⃣</div>
            <div class="step-content">
              <div class="step-title">解析依赖</div>
              <div class="step-desc">分析文件导入关系</div>
            </div>
          </div>
          <div class="pipeline-arrow">↓</div>
          <div class="pipeline-step">
            <div class="step-icon">2️⃣</div>
            <div class="step-content">
              <div class="step-title">编译转换</div>
              <div class="step-desc">Vue → JavaScript</div>
            </div>
          </div>
          <div class="pipeline-arrow">↓</div>
          <div class="pipeline-step">
            <div class="step-icon">3️⃣</div>
            <div class="step-content">
              <div class="step-title">打包压缩</div>
              <div class="step-desc">合并文件，去除空格</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 构建进度 -->
      <div class="build-status">
        <div class="status-header">
          <span class="status-label">构建进度</span>
          <span class="status-percent">{{ buildProgress }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${buildProgress}%` }"
          ></div>
        </div>

        <!-- 对比展示 -->
        <div v-if="buildStatus === 'completed'" class="size-comparison">
          <div class="size-item original">
            <div class="size-label">原始大小</div>
            <div class="size-value">{{ originalSize }}</div>
          </div>
          <div class="size-arrow">→</div>
          <div class="size-item optimized">
            <div class="size-label">优化后</div>
            <div class="size-value success">{{ optimizedSize }}</div>
          </div>
          <div class="compression-badge">
            压缩 60%
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button
          v-if="buildStatus === 'idle' || buildStatus === 'completed'"
          @click="startBuild"
          class="btn primary"
        >
          {{ buildStatus === 'idle' ? '开始构建' : '重新构建' }}
        </button>
        <button
          v-if="buildStatus === 'completed'"
          @click="resetBuild"
          class="btn secondary"
        >
          重置
        </button>
      </div>
    </div>

    <div class="info-box">
      <p v-if="buildStatus === 'idle'">
        💡 <strong>待机中</strong>：点击"开始构建"按钮，看看代码是如何一步步变成可部署的文件的。
      </p>
      <p v-else-if="buildStatus === 'building'">
        ⏳ <strong>构建中</strong>：正在处理源文件，就像小明在准备咖啡材料...
      </p>
      <p v-else class="success-text">
        ✅ <strong>构建完成</strong>：所有文件已打包压缩，体积减少了60%！就像把咖啡豆研磨成粉，更易冲泡。
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-build {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-height: 600px;
  overflow-y: auto;
  margin: 1rem 0;
}

.demo-header {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.intro-text {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.source-files {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.file-item.completed {
  border-color: var(--vp-c-brand-delta);
  background: var(--vp-c-brand-dimm);
}

.file-icon {
  font-size: 1.5rem;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.file-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.file-size {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.file-status {
  display: flex;
  align-items: center;
}

.status-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.status-badge.pending {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
}

.status-badge.success {
  background: var(--vp-c-brand-delta);
  color: white;
}

.build-process {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.pipeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.pipeline-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  width: 100%;
  max-width: 350px;
}

.step-icon {
  font-size: 1.5rem;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.pipeline-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  margin: 0.25rem 0;
}

.build-status {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.status-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.status-percent {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.progress-bar {
  height: 10px;
  background: var(--vp-c-bg-alt);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-1));
  transition: width 0.6s ease;
  border-radius: 5px;
}

.size-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  position: relative;
}

.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.size-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.size-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.size-value.success {
  color: var(--vp-c-brand-delta);
}

.size-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.compression-badge {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn.primary:hover {
  background: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.btn.secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn.secondary:hover {
  border-color: var(--vp-c-brand);
}

.info-box {
  padding: 1rem 1.25rem;
  margin: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box p {
  margin: 0;
}

.success-text {
  color: var(--vp-c-brand-delta);
}

@media (max-width: 640px) {
  .file-item {
    padding: 0.5rem;
  }

  .size-comparison {
    flex-direction: column;
    gap: 0.75rem;
  }

  .compression-badge {
    position: static;
  }
}
</style>
