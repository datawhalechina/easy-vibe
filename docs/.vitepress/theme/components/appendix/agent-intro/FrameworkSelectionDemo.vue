<template>
  <div class="framework-selection-demo">
    <div class="selection-quiz">
      <h3>🤔 选择合适的 Agent 框架</h3>
      <p class="quiz-intro">回答几个问题，帮你找到最适合的框架！</p>

      <div v-if="currentQuestion < questions.length" class="question-container">
        <div class="question-header">
          <span class="question-number">问题 {{ currentQuestion + 1 }}/{{ questions.length }}</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: ((currentQuestion + 1) / questions.length * 100) + '%' }"></div>
          </div>
        </div>

        <h4 class="question-text">{{ questions[currentQuestion].question }}</h4>

        <div class="options">
          <button
            v-for="(option, index) in questions[currentQuestion].options"
            :key="index"
            class="option-btn"
            @click="selectOption(index)"
          >
            {{ option.text }}
          </button>
        </div>
      </div>

      <div v-else class="recommendation">
        <div class="result-header">
          <div class="result-icon">🎯</div>
          <h4>推荐框架：{{ recommendedFramework }}</h4>
        </div>

        <div class="result-description">
          {{ getRecommendationDescription() }}
        </div>

        <div class="result-reasons">
          <div class="reasons-title">为什么推荐这个？</div>
          <ul>
            <li v-for="reason in getRecommendationReasons()" :key="reason">{{ reason }}</li>
          </ul>
        </div>

        <div class="next-steps">
          <div class="steps-title">📚 下一步</div>
          <div class="step-links">
            <a :href="getFrameworkInfo().website" target="_blank" class="step-link">
              🌐 访问官网
            </a>
            <a :href="getFrameworkInfo().docs" target="_blank" class="step-link">
              📖 阅读文档
            </a>
            <a :href="getFrameworkInfo().github" target="_blank" class="step-link">
              💻 查看代码
            </a>
          </div>
        </div>

        <button @click="resetQuiz" class="restart-btn">
          ↺ 重新选择
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentQuestion = ref(0)
const answers = ref([])

const questions = [
  {
    question: '你的主要使用场景是什么？',
    options: [
      { text: '🤖 编程和代码开发', scores: { LangChain: 2, AutoGen: 5, CrewAI: 2, AgentScope: 2 } },
      { text: '📝 内容创作和文案', scores: { LangChain: 3, AutoGen: 1, CrewAI: 5, AgentScope: 3 } },
      { text: '🔍 数据分析和研究', scores: { LangChain: 4, AutoGen: 4, CrewAI: 3, AgentScope: 3 } },
      { text: '🌐 通用应用开发', scores: { LangChain: 5, AutoGen: 2, CrewAI: 3, AgentScope: 4 } }
    ]
  },
  {
    question: '你更看重什么？',
    options: [
      { text: '⚡ 快速上手', scores: { LangChain: 2, AutoGen: 3, CrewAI: 5, AgentScope: 4 } },
      { text: '🔧 高度定制', scores: { LangChain: 5, AutoGen: 3, CrewAI: 2, AgentScope: 2 } },
      { text: '👥 团队协作', scores: { LangChain: 3, AutoGen: 4, CrewAI: 5, AgentScope: 2 } },
      { text: '📚 文档完善', scores: { LangChain: 5, AutoGen: 3, CrewAI: 3, AgentScope: 3 } }
    ]
  },
  {
    question: '你的技术水平？',
    options: [
      { text: '🌱 初学者', scores: { LangChain: 2, AutoGen: 2, CrewAI: 4, AgentScope: 5 } },
      { text: '🌿 有一些经验', scores: { LangChain: 4, AutoGen: 3, CrewAI: 4, AgentScope: 4 } },
      { text: '🌳 经验丰富', scores: { LangChain: 5, AutoGen: 4, CrewAI: 3, AgentScope: 3 } },
      { text: '🏆 专家级别', scores: { LangChain: 5, AutoGen: 5, CrewAI: 3, AgentScope: 3 } }
    ]
  },
  {
    question: '项目规模？',
    options: [
      { text: '📦 个人项目', scores: { LangChain: 3, AutoGen: 3, CrewAI: 4, AgentScope: 5 } },
      { text: '🏢 小团队项目', scores: { LangChain: 4, AutoGen: 4, CrewAI: 5, AgentScope: 3 } },
      { text: '🏛️ 企业级应用', scores: { LangChain: 5, AutoGen: 3, CrewAI: 3, AgentScope: 2 } },
      { text: '🌍 大规模分布式', scores: { LangChain: 4, AutoGen: 2, CrewAI: 2, AgentScope: 3 } }
    ]
  },
  {
    question: '是否需要中文支持？',
    options: [
      { text: '🇨🇳 非常重要', scores: { LangChain: 2, AutoGen: 2, CrewAI: 2, AgentScope: 5 } },
      { text: '🌏 最好有', scores: { LangChain: 3, AutoGen: 2, CrewAI: 2, AgentScope: 4 } },
      { text: '🌐 不重要', scores: { LangChain: 4, AutoGen: 4, CrewAI: 4, AgentScope: 2 } },
      { text: '🚫 不需要', scores: { LangChain: 5, AutoGen: 5, CrewAI: 4, AgentScope: 2 } }
    ]
  }
]

const frameworkInfo = {
  LangChain: {
    website: 'https://langchain.com',
    docs: 'https://python.langchain.com',
    github: 'https://github.com/langchain-ai/langchain',
    description: 'LangChain 是最流行的 LLM 应用开发框架，拥有最完善的生态系统和社区支持。适合需要高度定制和集成的场景。',
    reasons: [
      '最强大的生态系统',
      '高度可定制',
      '丰富的集成选项',
      '活跃的社区支持'
    ]
  },
  AutoGen: {
    website: 'https://microsoft.github.io/autogen',
    docs: 'https://microsoft.github.io/autogen/docs',
    github: 'https://github.com/microsoft/autogen',
    description: 'AutoGen 是微软开发的多 Agent 协作框架，特别擅长编程和代码相关任务。如果你需要多个 Agent 协作完成编程任务，这是最佳选择。',
    reasons: [
      '独特的协作模式',
      '强大的代码执行能力',
      '微软官方支持',
      '适合编程辅助场景'
    ]
  },
  CrewAI: {
    website: 'https://crewai.com',
    docs: 'https://docs.crewai.com',
    github: 'https://github.com/joaomdmoura/crewAI',
    description: 'CrewAI 采用角色驱动的 Agent 设计，概念直观易懂。非常适合快速组建 AI 团队来完成内容创作、研究等任务。',
    reasons: [
      '直观的角色设计',
      '易于上手',
      '团队协作模式清晰',
      '适合快速原型开发'
    ]
  },
  AgentScope: {
    website: 'https://github.com/modelscope/agentscope',
    docs: 'https://modelscope.github.io/agentscope',
    github: 'https://github.com/modelscope/agentscope',
    description: 'AgentScope 是阿里开源的 Agent 框架，中文友好，简单易用。特别适合国内开发者和需要中文支持的项目。',
    reasons: [
      '完善的中文文档',
      '国内部署友好',
      '上手非常简单',
      '多模态支持良好'
    ]
  }
}

const recommendedFramework = computed(() => {
  const scores = { LangChain: 0, AutoGen: 0, CrewAI: 0, AgentScope: 0 }

  answers.value.forEach((answerIndex, questionIndex) => {
    const optionScores = questions[questionIndex].options[answerIndex].scores
    Object.keys(optionScores).forEach(framework => {
      scores[framework] += optionScores[framework]
    })
  })

  return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)
})

const selectOption = (index) => {
  answers.value.push(index)
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  }
}

const resetQuiz = () => {
  currentQuestion.value = 0
  answers.value = []
}

const getRecommendationDescription = () => {
  return frameworkInfo[recommendedFramework.value].description
}

const getRecommendationReasons = () => {
  return frameworkInfo[recommendedFramework.value].reasons
}

const getFrameworkInfo = () => {
  return frameworkInfo[recommendedFramework.value]
}
</script>

<style scoped>
.framework-selection-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.selection-quiz h3 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
  text-align: center;
}

.quiz-intro {
  text-align: center;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

.question-container {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
}

.question-header {
  margin-bottom: 20px;
}

.question-number {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  display: block;
}

.progress-bar {
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.question-text {
  margin: 0 0 24px 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  padding: 16px 20px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s;
}

.option-btn:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  transform: translateX(4px);
}

.recommendation {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
}

.result-header {
  margin-bottom: 24px;
}

.result-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.result-header h4 {
  margin: 0;
  color: var(--vp-c-brand);
  font-size: 1.8rem;
}

.result-description {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1.1rem;
}

.result-reasons {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: left;
}

.reasons-title {
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.result-reasons ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.result-reasons li {
  padding: 4px 0;
  color: var(--vp-c-text-2);
  position: relative;
}

.result-reasons li::before {
  content: '✓';
  position: absolute;
  left: -20px;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.next-steps {
  margin-bottom: 24px;
}

.steps-title {
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.step-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.step-link {
  padding: 12px 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.step-link:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

.restart-btn {
  padding: 12px 32px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
}

.restart-btn:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}
</style>
