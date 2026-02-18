<template>
  <div class="language-selector-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">语言选择器</span>
      <span class="subtitle">根据需求选择最合适的后端语言</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">点餐</span>：想吃快餐选 Python（快速），想吃大餐选 Java（正式），想吃健康餐选 Go（平衡）。没有"最好的"选择，只有"最合适"的选择。
    </div>

    <div class="questions-container">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="question-card"
        :class="{ active: currentQuestion === index }"
      >
        <div class="question-number">
          {{ index + 1 }}
        </div>
        <div class="question-content">
          <h6>{{ question.text }}</h6>
          <div class="options">
            <button
              v-for="option in question.options"
              :key="option.value"
              class="option-btn"
              :class="{ selected: answers[index] === option.value }"
              @click="selectAnswer(index, option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="recommendation"
        class="recommendation-panel"
      >
        <div class="rec-header">
          <span class="rec-icon">{{ recommendation.icon }}</span>
          <div class="rec-title">
            <h6>推荐语言</h6>
            <div class="rec-name">
              {{ recommendation.language }}
            </div>
          </div>
        </div>
        <div class="rec-reason">
          <strong>选择理由：</strong>
          <p>{{ recommendation.reason }}</p>
        </div>
        <button
          class="reset-btn"
          @click="reset"
        >
          🔄 重新选择
        </button>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>不要问"哪个语言最火"，而要问"我的项目需要什么"。初创公司优先开发速度（Python/Node.js），大厂优先稳定性和性能（Java/Go），系统编程优先安全（Rust）。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentQuestion = ref(0)
const answers = ref({})

const questions = [
  {
    id: 'project_type',
    text: '项目类型是什么？',
    options: [
      { value: 'web', label: 'Web 应用' },
      { value: 'api', label: 'API 服务' },
      { value: 'ai', label: 'AI/ML' },
      { value: 'system', label: '系统编程' }
    ]
  },
  {
    id: 'performance',
    text: '性能要求如何？',
    options: [
      { value: 'high', label: '高性能' },
      { value: 'medium', label: '中等' },
      { value: 'low', label: '不敏感' }
    ]
  },
  {
    id: 'team',
    text: '团队背景？',
    options: [
      { value: 'frontend', label: '前端团队' },
      { value: 'python', label: 'Python 背景' },
      { value: 'java', label: 'Java 背景' },
      { value: 'new', label: '新团队' }
    ]
  }
]

const recommendation = computed(() => {
  if (Object.keys(answers.value).length < 3) return null

  const { project_type, performance, team } = answers.value

  if (project_type === 'ai') {
    return {
      icon: '🐍',
      language: 'Python',
      reason: 'AI/ML 的绝对统治地位，生态无与伦比。虽然性能不如 C++/Rust，但 95% 的 AI 项目都在用 Python。'
    }
  }

  if (project_type === 'system' || performance === 'high') {
    return {
      icon: '🐹',
      language: 'Go',
      reason: '云原生时代的宠儿，简洁语法 + 原生并发 + 快速编译。单一可执行文件部署极其简单。'
    }
  }

  if (team === 'frontend') {
    return {
      icon: '💚',
      language: 'Node.js',
      reason: '前后端统一，减少语言切换成本。NPM 生态庞大，适合快速迭代和 MVP 开发。'
    }
  }

  if (team === 'python') {
    return {
      icon: '🐍',
      language: 'Python',
      reason: '利用团队现有技能，快速开发。Django/FastAPI 生态成熟，适合数据驱动的应用。'
    }
  }

  if (team === 'java') {
    return {
      icon: '☕',
      language: 'Java',
      reason: '企业级开发的最佳选择。Spring Boot 生态极其成熟，团队熟悉度高，维护成本低。'
    }
  }

  return {
    icon: '🐹',
    language: 'Go',
    reason: '云原生时代的高性能语言。相比 Java 更简洁，相比 Node.js 性能更好，相比 Python 更稳定。'
  }
})

const selectAnswer = (questionIndex, value) => {
  answers.value[questionIndex] = value
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  }
}

const reset = () => {
  answers.value = {}
  currentQuestion.value = 0
}
</script>

<style scoped>
.language-selector-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
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

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.question-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px solid transparent;
  display: flex;
  gap: 0.75rem;
}

.question-card.active {
  border-color: var(--vp-c-brand);
}

.question-number {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.question-content {
  flex: 1;
}

.question-content h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.option-btn:hover {
  border-color: var(--vp-c-brand);
}

.option-btn.selected {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.recommendation-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 2px solid var(--vp-c-brand);
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.rec-icon {
  font-size: 2.5rem;
}

.rec-title h6 {
  margin: 0 0 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.rec-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.rec-reason {
  margin-bottom: 0.75rem;
}

.rec-reason strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.rec-reason p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.reset-btn {
  width: 100%;
  padding: 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.reset-btn:hover {
  background: var(--vp-c-brand-dark);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>
