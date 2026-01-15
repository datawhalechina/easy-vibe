<template>
  <div class="agent-task-flow-demo">
    <div class="task-input">
      <div class="input-label">🎯 用户任务</div>
      <div class="input-content">"搜索并总结最新的 AI 技术文章"</div>
    </div>

    <div class="flow-timeline">
      <div class="timeline-line"></div>

      <div
        v-for="(step, index) in steps"
        :key="index"
        class="timeline-item"
        :class="{ active: currentStep === index, completed: currentStep > index }"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="step-number">步骤 {{ index + 1 }}</div>
          <div class="step-title">{{ step.title }}</div>
          <div class="step-description">{{ step.description }}</div>

          <div v-if="step.code" class="step-code">
            <div class="code-label">执行代码</div>
            <pre><code>{{ step.code }}</code></pre>
          </div>

          <div v-if="step.result" class="step-result">
            <div class="result-label">执行结果</div>
            <div class="result-content">{{ step.result }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flow-controls">
      <button @click="prevStep" :disabled="currentStep === 0" class="control-btn">
        ← 上一步
      </button>
      <button @click="togglePlay" class="control-btn primary">
        {{ isPlaying ? '⏸ 暂停' : '▶ 自动演示' }}
      </button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1" class="control-btn">
        下一步 →
      </button>
      <button @click="reset" class="control-btn">
        ↺ 重置
      </button>
    </div>

    <div class="flow-explanation">
      <div class="explanation-card">
        <h4>{{ steps[currentStep].title }}</h4>
        <p>{{ steps[currentStep].explanation }}</p>

        <div class="tips">
          <div class="tip-icon">💡</div>
          <div>{{ steps[currentStep].tip }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const currentStep = ref(0)
const isPlaying = ref(false)
let playInterval = null

const steps = [
  {
    title: '理解任务',
    description: 'Agent 分析用户需求，明确目标',
    code: null,
    result: null,
    explanation: 'Agent 首先理解用户的意图，识别出这是一个需要搜索和总结的任务。它会分析关键词： "搜索"、"最新"、"AI 技术"、"文章"、"总结"。',
    tip: '好的任务理解是成功的一半。Agent 需要识别出核心需求和约束条件。'
  },
  {
    title: '制定计划',
    description: '分解任务，制定执行步骤',
    code: `plan = [
  "搜索关键词：'AI 技术 2024'",
  "筛选前 5 篇文章",
  "阅读每篇文章摘要",
  "生成综合总结"
]`,
    result: '✅ 计划已制定：4 个步骤',
    explanation: 'Agent 将复杂任务分解为可执行的小步骤。这个计划会动态调整，比如如果搜索结果质量不高，可能会重新搜索。',
    tip: '任务分解是 Agent 的核心能力。复杂任务必须拆解为可管理的步骤。'
  },
  {
    title: '执行搜索',
    description: '调用搜索工具，获取文章列表',
    code: `results = web_search(
  query="AI 技术 2024",
  max_results=10,
  time_range="last_month"
)`,
    result: '✅ 找到 15 篇相关文章',
    explanation: 'Agent 调用 web_search 工具，使用合适的搜索关键词和参数。搜索结果会被保存到短期记忆中，供后续步骤使用。',
    tip: '工具调用需要选择合适的参数。Agent 会根据任务需求动态调整。'
  },
  {
    title: '筛选结果',
    description: '根据相关性筛选最佳文章',
    code: `top_articles = filter_by_relevance(
  results,
  top_n=5,
  criteria=["date", "citations", "source"]
)`,
    result: '✅ 筛选出 5 篇高质量文章',
    explanation: '不是所有搜索结果都有用。Agent 会根据日期、引用数、来源权威性等指标筛选出最有价值的文章。',
    tip: '信息筛选能力决定了 Agent 的输出质量。需要多维度的评估标准。'
  },
  {
    title: '阅读内容',
    description: '读取并理解每篇文章的内容',
    code: `for article in top_articles:
  content = read_page(article.url)
  summary = extract_key_points(content)
  memory.store(article.id, summary)`,
    result: '✅ 已阅读 5 篇文章，提取关键信息',
    explanation: 'Agent 依次阅读每篇文章，提取关键信息并存储到记忆系统中。这样可以在生成总结时快速检索相关信息。',
    tip: '记忆管理很重要。只保留关键信息，避免上下文膨胀。'
  },
  {
    title: '生成总结',
    description: '综合所有信息，生成最终报告',
    code: `summary = generate_report(
  memories=memory.get_all(),
  format="markdown",
  style="concise"
)

summary.add_references(top_articles)`,
    result: '✅ 总结已完成，包含 5 个参考文献',
    explanation: 'Agent 从记忆中检索所有关键信息，生成一份结构化的总结报告，并附上参考文献，确保信息的可追溯性。',
    tip: '输出质量取决于信息的整合能力。结构化输出更易读、更专业。'
  }
]

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    playInterval = setInterval(() => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++
      } else {
        currentStep.value = 0
      }
    }, 2500)
  } else {
    clearInterval(playInterval)
  }
}

const reset = () => {
  currentStep.value = 0
  isPlaying.value = false
  clearInterval(playInterval)
}

onUnmounted(() => {
  clearInterval(playInterval)
})
</script>

<style scoped>
.agent-task-flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.task-input {
  background: var(--vp-c-brand);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 32px;
  text-align: center;
}

.input-label {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 8px;
}

.input-content {
  font-size: 1.2rem;
  font-weight: bold;
}

.flow-timeline {
  position: relative;
  padding: 20px 0;
  margin-bottom: 24px;
}

.timeline-line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  padding-bottom: 32px;
  opacity: 0.5;
  transition: all 0.3s;
}

.timeline-item.active {
  opacity: 1;
}

.timeline-item.completed {
  opacity: 0.7;
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 0;
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg);
  border: 4px solid var(--vp-c-divider);
  border-radius: 50%;
  transition: all 0.3s;
  z-index: 1;
}

.timeline-item.active .timeline-dot {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  box-shadow: 0 0 20px rgba(66, 153, 225, 0.5);
}

.timeline-item.completed .timeline-dot {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
}

.timeline-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.timeline-item.active .timeline-content {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
}

.step-number {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-bottom: 8px;
}

.step-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.step-description {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.step-code {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.code-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  font-weight: 600;
}

.step-code pre {
  margin: 0;
}

.step-code code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.step-result {
  background: rgba(66, 153, 225, 0.1);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 12px;
}

.result-label {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  margin-bottom: 4px;
  font-weight: 600;
}

.result-content {
  color: var(--vp-c-text-1);
  font-family: monospace;
  font-size: 0.9rem;
}

.flow-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 10px 20px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.control-btn.primary:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.flow-explanation {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
}

.explanation-card h4 {
  margin: 0 0 12px 0;
  color: var(--vp-c-brand);
  font-size: 1.3rem;
}

.explanation-card p {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 16px;
}

.tips {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.tip-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tips > div:last-child {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
