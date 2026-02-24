<template>
  <div class="ai-vs-traditional-demo">
    <div class="demo-header">
      <span class="title">AI 工程师 vs 传统工程师</span>
      <span class="subtitle">工作方式的差异</span>
    </div>

    <div class="comparison-container">
      <div class="comparison-column traditional">
        <div class="column-header">传统工程师</div>
        <div class="work-flow">
          <div v-for="(step, index) in traditionalSteps" :key="index" class="flow-step">
            <span class="step-num">{{ index + 1 }}</span>
            <span class="step-text">{{ step }}</span>
          </div>
        </div>
        <div class="column-stats">
          <div class="stat-item">
            <span class="stat-label">编码时间占比</span>
            <span class="stat-value">60-70%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">思考时间占比</span>
            <span class="stat-value">30-40%</span>
          </div>
        </div>
      </div>

      <div class="vs-divider">
        <span class="vs-text">VS</span>
      </div>

      <div class="comparison-column ai">
        <div class="column-header">AI 工程师</div>
        <div class="work-flow">
          <div v-for="(step, index) in aiSteps" :key="index" class="flow-step">
            <span class="step-num">{{ index + 1 }}</span>
            <span class="step-text">{{ step }}</span>
          </div>
        </div>
        <div class="column-stats">
          <div class="stat-item">
            <span class="stat-label">编码时间占比</span>
            <span class="stat-value">20-30%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">思考时间占比</span>
            <span class="stat-value">70-80%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="skill-shift">
      <div class="shift-title">能力重心转移</div>
      <div class="shift-grid">
        <div v-for="item in skillShift" :key="item.from" class="shift-item">
          <div class="shift-from">
            <span class="arrow">↓</span>
            <span class="text">{{ item.from }}</span>
            <span class="trend down">重要性下降</span>
          </div>
          <div class="shift-to">
            <span class="arrow">↑</span>
            <span class="text">{{ item.to }}</span>
            <span class="trend up">重要性上升</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>AI 时代的核心竞争力：</strong>不是"会写代码"，而是"会描述需求、会判断对错、会设计方案"。AI 是你的编程助手，但决策者永远是你。
    </div>
  </div>
</template>

<script setup>
const traditionalSteps = [
  '理解需求',
  '查阅文档学习语法',
  '手写代码实现',
  '调试修复 Bug',
  '优化代码性能',
  '编写测试用例'
]

const aiSteps = [
  '理解需求',
  '用自然语言描述给 AI',
  '审核 AI 生成的代码',
  '判断是否符合预期',
  '调整需求重新生成',
  '整合到项目中'
]

const skillShift = [
  { from: '语法记忆', to: '需求描述能力' },
  { from: '手写代码速度', to: '代码审核能力' },
  { from: '查文档能力', to: '架构设计能力' },
  { from: '调试技巧', to: '问题定位能力' }
]
</script>

<style scoped>
.ai-vs-traditional-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.comparison-column {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.column-header {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.work-flow {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.step-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 600;
  background: var(--vp-c-divider);
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.traditional .step-num {
  background: var(--vp-c-indigo-soft);
  color: var(--vp-c-indigo-1);
}

.ai .step-num {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}

.step-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.column-stats {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.stat-value {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
}

.skill-shift {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.shift-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.shift-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.shift-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.shift-from,
.shift-to {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.arrow {
  font-size: 0.78rem;
  font-weight: 700;
}

.shift-from .arrow {
  color: var(--vp-c-danger-1);
}

.shift-to .arrow {
  color: var(--vp-c-green-1);
}

.text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.trend {
  font-size: 0.62rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  margin-left: auto;
}

.trend.down {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
}

.trend.up {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }

  .vs-divider {
    padding: 0.35rem 0;
  }

  .shift-grid {
    grid-template-columns: 1fr;
  }
}
</style>
