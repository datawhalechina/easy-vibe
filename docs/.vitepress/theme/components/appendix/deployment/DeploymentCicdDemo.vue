<template>
  <div class="deployment-cicd-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">CI/CD 自动化流程</span>
      <span class="subtitle">从代码到上线，一键搞定</span>
    </div>

    <div class="intro-text">
      <strong>CI/CD</strong> 就像一条<strong>自动化流水线</strong>：你只管写代码，剩下的测试、构建、部署，流水线自动帮你完成！
    </div>

    <div class="demo-content">
      <div class="pipeline">
        <div
          v-for="(step, index) in pipelineSteps"
          :key="index"
          class="pipeline-step"
          :class="{ active: currentStep === index, completed: currentStep > index }"
        >
          <div class="step-connector" v-if="index > 0"></div>
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-info">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
          <div class="step-status" v-if="currentStep === index">
            <span class="spinner">⏳</span>
          </div>
          <div class="step-status" v-if="currentStep > index">
            <span class="check">✅</span>
          </div>
        </div>
      </div>

      <div class="manual-vs-auto">
        <div class="compare-column manual">
          <div class="column-header">
            <span class="column-icon">😰</span>
            <span class="column-title">手动部署</span>
          </div>
          <div class="column-body">
            <div class="step-list">
              <div class="step-item">❌ 手动改代码</div>
              <div class="step-item">❌ 手动上传 FTP</div>
              <div class="step-item">❌ 手动 SSH 连接</div>
              <div class="step-item">❌ 手动重启服务</div>
              <div class="step-item">❌ 容易出错，慢</div>
            </div>
          </div>
        </div>

        <div class="compare-column auto">
          <div class="column-header">
            <span class="column-icon">🎉</span>
            <span class="column-title">CI/CD 自动化</span>
          </div>
          <div class="column-body">
            <div class="step-list">
              <div class="step-item">✅ Git 推送代码</div>
              <div class="step-item">✅ 自动运行测试</div>
              <div class="step-item">✅ 自动构建打包</div>
              <div class="step-item">✅ 自动部署上线</div>
              <div class="step-item">✅ 快速可靠</div>
            </div>
          </div>
        </div>
      </div>

      <button @click="startPipeline" class="start-btn" :disabled="isRunning">
        {{ isRunning ? '⏳ 流水线运行中...' : '▶ 启动流水线' }}
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>推荐工具：</strong>GitHub Actions（免费）、GitLab CI、Jenkins。几分钟就能配置好！
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(-1)
const isRunning = ref(false)

const pipelineSteps = [
  { icon: '💻', title: '代码提交', desc: 'git push 到 GitHub' },
  { icon: '🧪', title: '自动测试', desc: '运行单元测试' },
  { icon: '📦', title: '自动构建', desc: 'npm run build' },
  { icon: '🚀', title: '自动部署', desc: '部署到服务器' },
  { icon: '✨', title: '完成上线', desc: '新版本可用' }
]

const startPipeline = () => {
  if (isRunning.value) return

  isRunning.value = true
  currentStep.value = -1

  const steps = [0, 1, 2, 3, 4]
  let delay = 0

  steps.forEach((step, index) => {
    delay += 1500
    setTimeout(() => {
      currentStep.value = step
      if (index === steps.length - 1) {
        setTimeout(() => {
          isRunning.value = false
          setTimeout(() => {
            currentStep.value = -1
          }, 2000)
        }, 1000)
      }
    }, delay)
  })
}
</script>

<style scoped>
.deployment-cicd-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 1rem;
}

.pipeline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.pipeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 100px;
  flex: 1;
}

.step-connector {
  position: absolute;
  top: 20px;
  left: -50%;
  width: 100%;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.pipeline-step.completed .step-connector {
  background: var(--vp-c-brand);
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  z-index: 1;
  background: var(--vp-c-bg);
  padding: 0 0.5rem;
}

.step-info {
  text-align: center;
  z-index: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.step-status {
  margin-top: 0.5rem;
  font-size: 1rem;
}

.pipeline-step.active .step-icon {
  animation: pulse 1s infinite;
}

.pipeline-step.completed .step-icon {
  opacity: 0.5;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.manual-vs-auto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.compare-column {
  border-radius: 8px;
  overflow: hidden;
}

.compare-column.manual {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
}

.compare-column.auto {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.column-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.column-icon {
  font-size: 1.5rem;
}

.column-title {
  font-size: 0.9rem;
}

.column-body {
  background: white;
  padding: 0.75rem;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-item {
  font-size: 0.8rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  text-align: center;
}

.start-btn {
  width: 100%;
  padding: 0.875rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.start-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.start-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .manual-vs-auto {
    grid-template-columns: 1fr;
  }

  .pipeline {
    flex-wrap: wrap;
  }

  .pipeline-step {
    min-width: 80px;
  }
}
</style>
