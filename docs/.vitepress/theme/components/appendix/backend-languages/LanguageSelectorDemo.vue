<template>
  <div class="language-selector-demo">
    <div class="selector-header">
      <h4>🎯 语言选择器</h4>
      <p class="subtitle">根据项目需求选择最适合的后端语言</p>
    </div>

    <div class="selection-flow">
      <!-- Step 1: Project Type -->
      <div class="step-card" :class="{ active: currentStep === 1 }">
        <div class="step-number">1</div>
        <h5>项目类型</h5>
        <div class="options-grid">
          <button
            v-for="option in projectTypes"
            :key="option.id"
            class="option-btn"
            :class="{ selected: answers.projectType === option.id }"
            @click="selectProjectType(option.id)"
          >
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-label">{{ option.label }}</span>
          </button>
        </div>
      </div>

      <!-- Step 2: Performance Requirement -->
      <div
        class="step-card"
        :class="{ active: currentStep === 2, disabled: !answers.projectType }"
      >
        <div class="step-number">2</div>
        <h5>性能要求</h5>
        <div class="options-grid">
          <button
            v-for="option in performanceLevels"
            :key="option.id"
            class="option-btn"
            :class="{ selected: answers.performance === option.id }"
            @click="selectPerformance(option.id)"
          >
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-label">{{ option.label }}</span>
            <span class="option-desc">{{ option.desc }}</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Team Background -->
      <div
        class="step-card"
        :class="{
          active: currentStep === 3,
          disabled: !answers.performance
        }"
      >
        <div class="step-number">3</div>
        <h5>团队背景</h5>
        <div class="options-grid">
          <button
            v-for="option in teamBackgrounds"
            :key="option.id"
            class="option-btn"
            :class="{ selected: answers.team === option.id }"
            @click="selectTeam(option.id)"
          >
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-label">{{ option.label }}</span>
          </button>
        </div>
      </div>

      <!-- Step 4: Time to Market -->
      <div
        class="step-card"
        :class="{ active: currentStep === 4, disabled: !answers.team }"
      >
        <div class="step-number">4</div>
        <h5>上市时间</h5>
        <div class="options-grid">
          <button
            v-for="option in timeConstraints"
            :key="option.id"
            class="option-btn"
            :class="{ selected: answers.time === option.id }"
            @click="selectTime(option.id)"
          >
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-label">{{ option.label }}</span>
            <span class="option-desc">{{ option.desc }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Recommendation -->
    <transition name="result">
      <div v-if="recommendation" class="recommendation-panel">
        <h5>🎉 推荐语言</h5>
        <div class="recommendation-card">
          <div class="rec-language">
            <span class="rec-icon">{{ recommendation.icon }}</span>
            <span class="rec-name">{{ recommendation.language }}</span>
          </div>
          <div class="rec-reason">
            <h6>选择理由</h6>
            <p>{{ recommendation.reason }}</p>
          </div>
          <div class="rec-alternatives">
            <h6>备选方案</h6>
            <div class="alt-list">
              <span
                v-for="alt in recommendation.alternatives"
                :key="alt"
                class="alt-tag"
              >
                {{ alt }}
              </span>
            </div>
          </div>
        </div>
        <button class="reset-btn" @click="reset">🔄 重新选择</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(1)
const answers = ref({
  projectType: null,
  performance: null,
  team: null,
  time: null
})

const projectTypes = [
  { id: 'web', icon: '🌐', label: 'Web 应用' },
  { id: 'api', icon: '🔌', label: 'API 服务' },
  { id: 'microservice', icon: '⚙️', label: '微服务' },
  { id: 'ai', icon: '🤖', label: 'AI/ML' },
  { id: 'game', icon: '🎮', label: '游戏' },
  { id: 'system', icon: '💻', label: '系统编程' }
]

const performanceLevels = [
  { id: 'extreme', icon: '⚡', label: '极致性能', desc: '每秒百万级请求' },
  { id: 'high', icon: '🚀', label: '高性能', desc: '每秒十万级请求' },
  { id: 'medium', icon: '📊', label: '中等性能', desc: '每秒万级请求' },
  { id: 'low', icon: '🐌', label: '性能不敏感', desc: '快速开发优先' }
]

const teamBackgrounds = [
  { id: 'frontend', icon: '💚', label: '前端团队' },
  { id: 'python', icon: '🐍', label: 'Python 背景' },
  { id: 'java', icon: '☕', label: 'Java 背景' },
  { id: 'mixed', icon: '👥', label: '混合团队' },
  { id: 'new', icon: '🆕', label: '新团队' }
]

const timeConstraints = [
  { id: 'urgent', icon: '🔥', label: '紧急', desc: '1-2 周上线' },
  { id: 'normal', icon: '📅', label: '正常', desc: '1-2 个月' },
  { id: 'flexible', icon: '🎯', label: '灵活', desc: '3 个月以上' }
]

const recommendation = computed(() => {
  if (
    !answers.value.projectType ||
    !answers.value.performance ||
    !answers.value.team ||
    !answers.value.time
  ) {
    return null
  }

  const { projectType, performance, team, time } = answers.value

  // 决策逻辑
  if (projectType === 'ai') {
    return {
      language: 'Python',
      icon: '🐍',
      reason:
        'AI/ML 领域的绝对统治地位，生态无与伦比（NumPy、PyTorch、TensorFlow）。虽然性能不如 C++/Rust，但 95% 的 AI 项目都在用 Python。',
      alternatives: ['C++ (模型部署)', 'Julia (科学计算)']
    }
  }

  if (projectType === 'game') {
    return {
      language: 'C++',
      icon: '⚡',
      reason:
        '游戏开发的行业标准（Unreal Engine）。极致性能，底层控制力强。如果使用 Unity 引擎，则 C# 是首选。',
      alternatives: ['C# (Unity)', 'Rust (独立游戏)']
    }
  }

  if (projectType === 'system') {
    if (performance === 'extreme') {
      return {
        language: 'Rust',
        icon: '🦀',
        reason:
          '内存安全 + 极致性能，现代化系统语言。虽然学习曲线陡峭，但编译时保证无内存泄漏，适合长期维护的基础设施。',
        alternatives: ['C++ (传统选择)', 'Go (云原生)']
      }
    }
    return {
      language: 'Go',
      icon: '🐹',
      reason:
        '云原生时代的宠儿（Docker、K8s 都是 Go 写的）。简洁语法 + 原生并发 + 快速编译，非常适合系统编程和 DevOps 工具。',
      alternatives: ['Rust (更安全)', 'C++ (更成熟)']
    }
  }

  if (projectType === 'microservice') {
    if (performance === 'extreme' || performance === 'high') {
      return {
        language: 'Go',
        icon: '🐹',
        reason:
          '云原生的首选语言。Goroutine 轻量级并发可轻松处理百万级请求，编译后的单一可执行文件部署极其简单。',
        alternatives: ['Java (Spring Cloud)', 'Rust (极致性能)']
      }
    }
    return {
      language: 'Node.js',
      icon: '💚',
      reason:
        '前后端统一，减少语言切换成本。NPM 生态丰富，适合 I/O 密集型的微服务。',
      alternatives: ['Go (更高性能)', 'Python (快速开发)']
    }
  }

  if (team === 'frontend') {
    return {
      language: 'Node.js',
      icon: '💚',
      reason:
        '前端团队零学习成本，TypeScript 提供类型安全。全栈开发减少沟通成本，适合快速迭代和 MVP 开发。',
      alternatives: ['Go (后端性能优化)', 'TypeScript (类型安全)']
    }
  }

  if (team === 'python') {
    return {
      language: 'Python',
      icon: '🐍',
      reason:
        '利用团队现有技能，快速开发。Django/FastAPI 生态成熟，适合数据驱动的 Web 应用。',
      alternatives: ['Go (性能提升)', 'Node.js (全栈)']
    }
  }

  if (team === 'java') {
    return {
      language: 'Java',
      icon: '☕',
      reason:
        '企业级开发的最佳选择。Spring Boot 生态极其成熟，团队熟悉度高，维护成本最低。',
      alternatives: ['Go (云原生)', 'Kotlin (更现代)']
    }
  }

  if (time === 'urgent') {
    if (projectType === 'web' || projectType === 'api') {
      return {
        language: 'Python',
        icon: '🐍',
        reason:
          '开发速度最快的语言。FastAPI/Django 让你在几天内就能搭建起完整的 Web 应用，适合快速验证想法和 MVP。',
        alternatives: ['Ruby (Rails)', 'Node.js (全栈)']
      }
    }
  }

  // 默认推荐
  if (performance === 'extreme') {
    return {
      language: 'Go',
      icon: '🐹',
      reason:
        '高性能 + 简洁语法 + 快速开发的最佳平衡点。Goroutine 并发模型让处理高并发变得简单，而不会像 Java 那么复杂。',
      alternatives: ['Rust (更安全)', 'C++ (更极致)']
    }
  }

  if (performance === 'high') {
    return {
      language: 'Go',
      icon: '🐹',
      reason:
        '云原生时代的高性能语言。相比 Java 更简洁，相比 Node.js 性能更好，相比 C++ 更容易维护。',
      alternatives: ['Java (更成熟)', 'Node.js (更灵活)']
    }
  }

  // Default: Node.js or Python
  return {
    language: 'Node.js',
    icon: '💚',
    reason:
      '前后端统一，生态庞大，适合大多数 Web 应用和 API 服务。NPM 拥有世界最大的包仓库，几乎任何功能都能找到现成的库。',
    alternatives: ['Go (更高性能)', 'Python (更简单)']
  }
})

const selectProjectType = (value) => {
  answers.value.projectType = value
  currentStep.value = 2
}

const selectPerformance = (value) => {
  answers.value.performance = value
  currentStep.value = 3
}

const selectTeam = (value) => {
  answers.value.team = value
  currentStep.value = 4
}

const selectTime = (value) => {
  answers.value.time = value
  currentStep.value = 5
}

const reset = () => {
  answers.value = {
    projectType: null,
    performance: null,
    team: null,
    time: null
  }
  currentStep.value = 1
}
</script>

<style scoped>
.language-selector-demo {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.selector-header {
  text-align: center;
  margin-bottom: 3rem;
}

.selector-header h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.selection-flow {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.step-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.1);
}

.step-card.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.step-number {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.step-card h5 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-btn:hover:not(.selected) {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.option-btn.selected {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.option-icon {
  font-size: 2rem;
  line-height: 1;
}

.option-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.option-desc {
  font-size: 0.75rem;
  opacity: 0.8;
  text-align: center;
}

.recommendation-panel {
  margin-top: 3rem;
  animation: slide-up 0.5s ease;
}

.recommendation-panel h5 {
  text-align: center;
  margin: 0 0 2rem 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.recommendation-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2.5rem;
  color: white;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
}

.rec-language {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.rec-icon {
  font-size: 4rem;
  line-height: 1;
}

.rec-name {
  font-size: 2.5rem;
  font-weight: bold;
}

.rec-reason,
.rec-alternatives {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.rec-reason h6,
.rec-alternatives h6 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.rec-reason p {
  margin: 0;
  line-height: 1.7;
  font-size: 0.95rem;
}

.alt-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.alt-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.reset-btn {
  display: block;
  width: 100%;
  padding: 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.result-enter-active,
.result-leave-active {
  transition: all 0.5s ease;
}

.result-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.result-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .options-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .rec-name {
    font-size: 2rem;
  }

  .rec-icon {
    font-size: 3rem;
  }
}
</style>
