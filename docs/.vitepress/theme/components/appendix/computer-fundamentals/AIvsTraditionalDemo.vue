<template>
  <div class="ai-vs-traditional-demo">
    <div class="demo-header">
      <span class="icon">🤖</span>
      <span class="title">AI 工程师 vs 传统工程师</span>
      <span class="subtitle">工作方式的差异</span>
    </div>

    <div class="comparison-container">
      <div class="comparison-column traditional">
        <div class="column-header">
          <span class="col-icon">👨‍💻</span>
          <span class="col-title">传统工程师</span>
        </div>
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
        <div class="column-header">
          <span class="col-icon">🤖</span>
          <span class="col-title">AI 工程师</span>
        </div>
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
      <div class="shift-title">📊 能力重心转移</div>
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

    <div class="ai-insight">
      <div class="insight-icon">💡</div>
      <div class="insight-text">
        <strong>AI 时代的核心竞争力：</strong>不是"会写代码"，而是"会描述需求、会判断对错、会设计方案"。AI 是你的编程助手，但<strong>决策者永远是你</strong>。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const traditionalSteps = ref([
  '理解需求',
  '查阅文档学习语法',
  '手写代码实现',
  '调试修复 Bug',
  '优化代码性能',
  '编写测试用例'
])

const aiSteps = ref([
  '理解需求',
  '用自然语言描述给 AI',
  '审核 AI 生成的代码',
  '判断是否符合预期',
  '调整需求重新生成',
  '整合到项目中'
])

const skillShift = ref([
  { from: '语法记忆', to: '需求描述能力' },
  { from: '手写代码速度', to: '代码审核能力' },
  { from: '查文档能力', to: '架构设计能力' },
  { from: '调试技巧', to: '问题定位能力' }
])
</script>

<style scoped>
.ai-vs-traditional-demo {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #fed7aa;
}

.icon {
  font-size: 28px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
  margin-left: auto;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.comparison-column {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.col-icon {
  font-size: 24px;
}

.col-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.work-flow {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.step-num {
  width: 20px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.traditional .step-num {
  background: #dbeafe;
  color: #1d4ed8;
}

.ai .step-num {
  background: #dcfce7;
  color: #15803d;
}

.step-text {
  font-size: 13px;
  color: #475569;
}

.column-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  font-size: 18px;
  font-weight: 700;
  color: #f97316;
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
}

.skill-shift {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}

.shift-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}

.shift-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.shift-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.shift-from,
.shift-to {
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow {
  font-size: 14px;
  font-weight: 700;
}

.shift-from .arrow {
  color: #ef4444;
}

.shift-to .arrow {
  color: #22c55e;
}

.text {
  font-size: 13px;
  color: #475569;
}

.trend {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: auto;
}

.trend.down {
  background: #fee2e2;
  color: #dc2626;
}

.trend.up {
  background: #dcfce7;
  color: #16a34a;
}

.ai-insight {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  border-left: 4px solid #f97316;
}

.insight-icon {
  font-size: 20px;
}

.insight-text {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
}

.insight-text strong {
  color: #1e293b;
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }

  .vs-divider {
    padding: 8px 0;
  }

  .shift-grid {
    grid-template-columns: 1fr;
  }
}
</style>
