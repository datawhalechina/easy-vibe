<template>
  <div class="agent-level-demo">
    <div class="levels-container">
      <div
        v-for="(level, index) in levels"
        :key="level.id"
        class="level-card"
        :class="{ active: selectedLevel === index }"
        @click="selectedLevel = index"
      >
        <div class="level-header">
          <div class="level-badge">{{ level.id }}</div>
          <div class="level-name">{{ level.name }}</div>
        </div>

        <div class="level-features">
          <div v-for="feature in level.features" :key="feature" class="feature-item">
            <span class="feature-icon">✓</span>
            {{ feature }}
          </div>
        </div>

        <div class="level-example">
          <div class="example-label">典型应用</div>
          <div class="example-text">{{ level.example }}</div>
        </div>
      </div>
    </div>

    <div class="level-comparison">
      <h3>📊 能力对比</h3>

      <div class="comparison-grid">
        <div class="comparison-item">
          <div class="item-label">工具使用</div>
          <div class="item-bar">
            <div
              class="bar-fill"
              :style="{ width: levels[selectedLevel].capabilities.tools + '%' }"
            ></div>
          </div>
          <div class="item-value">{{ levels[selectedLevel].capabilities.tools }}%</div>
        </div>

        <div class="comparison-item">
          <div class="item-label">规划能力</div>
          <div class="item-bar">
            <div
              class="bar-fill"
              :style="{ width: levels[selectedLevel].capabilities.planning + '%' }"
            ></div>
          </div>
          <div class="item-value">{{ levels[selectedLevel].capabilities.planning }}%</div>
        </div>

        <div class="comparison-item">
          <div class="item-label">自主性</div>
          <div class="item-bar">
            <div
              class="bar-fill"
              :style="{ width: levels[selectedLevel].capabilities.autonomy + '%' }"
            ></div>
          </div>
          <div class="item-value">{{ levels[selectedLevel].capabilities.autonomy }}%</div>
        </div>

        <div class="comparison-item">
          <div class="item-label">复杂度</div>
          <div class="item-bar">
            <div
              class="bar-fill"
              :style="{ width: levels[selectedLevel].capabilities.complexity + '%' }"
            ></div>
          </div>
          <div class="item-value">{{ levels[selectedLevel].capabilities.complexity }}%</div>
        </div>
      </div>

      <div class="level-description">
        <h4>{{ levels[selectedLevel].name }}</h4>
        <p>{{ levels[selectedLevel].description }}</p>

        <div class="use-cases">
          <div class="use-case-title">🎯 适用场景</div>
          <ul>
            <li v-for="use in levels[selectedLevel].useCases" :key="use">{{ use }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLevel = ref(2)

const levels = [
  {
    id: 'L0',
    name: '无工具',
    features: ['只能对话', '不能执行操作', '被动响应'],
    example: 'ChatGPT 聊天',
    description: '最基础的 LLM 应用，只能进行对话，无法执行任何实际操作。所有的"行动"都需要人工完成。',
    capabilities: { tools: 0, planning: 0, autonomy: 0, complexity: 10 },
    useCases: ['问答系统', '内容生成', '语言翻译']
  },
  {
    id: 'L1',
    name: '单工具',
    features: ['使用一个固定工具', '有限的操作能力', '简单任务执行'],
    example: '代码解释器',
    description: '可以使用一个特定的工具来扩展能力，但工具选择是固定的，无法自主切换。',
    capabilities: { tools: 20, planning: 10, autonomy: 20, complexity: 30 },
    useCases: ['代码执行', '数据计算', '文件分析']
  },
  {
    id: 'L2',
    name: '多工具',
    features: ['可以选择多个工具', '工具切换能力', '灵活的任务处理'],
    example: 'Web Agent',
    description: '可以使用多个不同的工具，并能根据任务需要自主选择合适的工具。',
    capabilities: { tools: 60, planning: 30, autonomy: 40, complexity: 50 },
    useCases: ['网页浏览', '数据采集', '信息检索']
  },
  {
    id: 'L3',
    name: '多步骤',
    features: ['复杂任务规划', '多步骤执行', '状态跟踪'],
    example: '数据分析 Agent',
    description: '能够将复杂任务分解为多个步骤，按照计划逐步执行，并跟踪整体进度。',
    capabilities: { tools: 70, planning: 60, autonomy: 60, complexity: 70 },
    useCases: ['数据分析', '报告生成', '工作流自动化']
  },
  {
    id: 'L4',
    name: '自主迭代',
    features: ['主动反思和改进', '从错误中学习', '策略调整'],
    example: '研究 Agent',
    description: '不仅能执行任务，还能主动反思结果，从错误中学习，不断优化自己的策略。',
    capabilities: { tools: 80, planning: 80, autonomy: 80, complexity: 85 },
    useCases: ['科学研究', '复杂问题求解', '自适应系统']
  },
  {
    id: 'L5',
    name: '多 Agent 协作',
    features: ['Agent 间通信', '分工协作', '集体智能'],
    example: '企业级系统',
    description: '多个专业化的 Agent 协同工作，通过通信和协作完成单个 Agent 无法完成的复杂任务。',
    capabilities: { tools: 100, planning: 100, autonomy: 100, complexity: 100 },
    useCases: ['企业自动化', '软件开发团队', '智能组织']
  }
]
</script>

<style scoped>
.agent-level-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.levels-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.level-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.level-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
}

.level-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
}

.level-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.level-badge {
  background: var(--vp-c-brand);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
}

.level-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.level-features {
  margin-bottom: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.feature-icon {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.level-example {
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.example-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.example-text {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.level-comparison {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
}

.level-comparison h3 {
  margin: 0 0 24px 0;
  color: var(--vp-c-text-1);
  font-size: 1.3rem;
}

.comparison-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
}

.comparison-item {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  gap: 16px;
  align-items: center;
}

.item-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.item-bar {
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 12px;
  transition: width 0.5s ease;
}

.item-value {
  font-weight: bold;
  color: var(--vp-c-brand);
  text-align: right;
}

.level-description {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand);
}

.level-description h4 {
  margin: 0 0 12px 0;
  color: var(--vp-c-brand);
  font-size: 1.2rem;
}

.level-description p {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.use-cases {
  margin-top: 16px;
}

.use-case-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.use-cases ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.use-cases li {
  padding: 4px 0;
  color: var(--vp-c-text-2);
  position: relative;
}

.use-cases li::before {
  content: '•';
  position: absolute;
  left: -16px;
  color: var(--vp-c-brand);
  font-weight: bold;
}
</style>
