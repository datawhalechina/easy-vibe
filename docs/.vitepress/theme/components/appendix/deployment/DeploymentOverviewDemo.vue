<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const steps = [
  { id: 'code', title: '写代码', desc: '小明在厨房开发新咖啡配方', icon: '☕' },
  { id: 'build', title: '构建打包', desc: '准备原材料，清洗咖啡豆', icon: '📦' },
  { id: 'test', title: '测试验证', desc: '小明自己先品尝确认没问题', icon: '🧪' },
  { id: 'deploy', title: '部署上线', desc: '把咖啡上架到门店售卖', icon: '🚀' },
  { id: 'monitor', title: '监控维护', desc: '观察顾客反馈，持续优化', icon: '📊' }
]

const stepProgress = computed(() => ((currentStep.value + 1) / steps.length) * 100)
</script>

<template>
  <div class="deployment-overview">
    <div class="demo-header">
      <h3>服务上线全流程</h3>
      <p class="subtitle">从小明咖啡店看部署流程</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明要推出一款新咖啡，需要经过<strong>配方研发</strong>→<strong>材料准备</strong>→<strong>试喝确认</strong>→<strong>上架售卖</strong>→<strong>收集反馈</strong>，
        软件上线也需要完整的流程保障质量。
      </p>
    </div>

    <div class="demo-content">
      <!-- 进度条 -->
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${stepProgress}%` }"></div>
        </div>
        <div class="progress-label">{{ currentStep + 1 }} / {{ steps.length }}</div>
      </div>

      <!-- 步骤卡片 -->
      <div class="steps-container">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="step-card"
          :class="{ active: currentStep === index, completed: index < currentStep }"
          @click="currentStep = index"
        >
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>

          <!-- 状态指示 -->
          <div class="step-status">
            <span v-if="index < currentStep" class="status-icon completed">✓</span>
            <span v-else-if="index === currentStep" class="status-icon active">●</span>
            <span v-else class="status-icon pending">○</span>
          </div>
        </div>
      </div>

      <!-- 当前步骤详情 -->
      <div class="step-detail">
        <h4>{{ steps[currentStep].title }}</h4>
        <p>{{ steps[currentStep].desc }}</p>
        <div class="detail-analogy">
          <div class="analogy-label">💡 技术对应</div>
          <div class="analogy-content">
            <span v-if="currentStep === 0">编写代码：开发新功能</span>
            <span v-if="currentStep === 1">构建打包：Webpack/Vite 编译资源</span>
            <span v-if="currentStep === 2">测试验证：单元测试、集成测试</span>
            <span v-if="currentStep === 3">部署上线：推送到服务器/云平台</span>
            <span v-if="currentStep === 4">监控维护：日志、性能监控、告警</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>💡 <strong>关键要点</strong>：每个环节都不可或缺。跳过测试就上线，就像没试喝就卖咖啡，可能让顾客喝到难喝的咖啡（Bug）！</p>
    </div>
  </div>
</template>

<style scoped>
.deployment-overview {
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
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-1));
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 3rem;
  text-align: right;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.step-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.step-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.step-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-card.completed {
  border-color: var(--vp-c-brand-delta);
  opacity: 0.8;
}

.step-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.step-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.step-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.status-icon {
  font-size: 0.9rem;
}

.status-icon.completed {
  color: var(--vp-c-brand-delta);
}

.status-icon.active {
  color: var(--vp-c-brand);
}

.status-icon.pending {
  color: var(--vp-c-text-3);
}

.step-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.step-detail h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.step-detail p {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.detail-analogy {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  border-left: 3px solid var(--vp-c-brand);
}

.analogy-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.analogy-content {
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
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

@media (max-width: 640px) {
  .steps-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-card {
    min-height: 100px;
    padding: 0.75rem;
  }

  .step-icon {
    font-size: 1.5rem;
  }
}
</style>
