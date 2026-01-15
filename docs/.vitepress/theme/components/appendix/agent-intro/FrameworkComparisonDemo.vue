<template>
  <div class="framework-comparison-demo">
    <div class="framework-tabs">
      <button
        v-for="(framework, index) in frameworks"
        :key="framework.name"
        class="tab-btn"
        :class="{ active: selectedFramework === index }"
        @click="selectedFramework = index"
      >
        {{ framework.name }}
      </button>
    </div>

    <div class="framework-content">
      <div class="framework-header">
        <div class="framework-icon">{{ frameworks[selectedFramework].icon }}</div>
        <div>
          <h3>{{ frameworks[selectedFramework].name }}</h3>
          <p class="framework-tagline">{{ frameworks[selectedFramework].tagline }}</p>
        </div>
      </div>

      <div class="framework-details">
        <div class="detail-section">
          <h4>✨ 特点</h4>
          <ul>
            <li v-for="feature in frameworks[selectedFramework].features" :key="feature">
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="detail-section">
          <h4>🎯 适用场景</h4>
          <div class="scenarios">
            <div
              v-for="scenario in frameworks[selectedFramework].scenarios"
              :key="scenario"
              class="scenario-tag"
            >
              {{ scenario }}
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>⚖️ 优缺点</h4>
          <div class="pros-cons">
            <div class="pros">
              <div class="pros-title">✅ 优点</div>
              <ul>
                <li v-for="pro in frameworks[selectedFramework].pros" :key="pro">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <div class="cons-title">❌ 缺点</div>
              <ul>
                <li v-for="con in frameworks[selectedFramework].cons" :key="con">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>📊 能力评分</h4>
          <div class="capabilities">
            <div
              v-for="(value, key) in frameworks[selectedFramework].scores"
              :key="key"
              class="capability-item"
            >
              <div class="capability-label">{{ key }}</div>
              <div class="capability-bar">
                <div class="bar-fill" :style="{ width: value + '%' }"></div>
              </div>
              <div class="capability-value">{{ value }}/100</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>🔗 相关链接</h4>
          <div class="links">
            <a :href="frameworks[selectedFramework].website" target="_blank" class="link-item">
              🌐 官网
            </a>
            <a :href="frameworks[selectedFramework].github" target="_blank" class="link-item">
              💻 GitHub
            </a>
            <a :href="frameworks[selectedFramework].docs" target="_blank" class="link-item">
              📚 文档
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <h3>📋 快速对比</h3>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th v-for="fw in frameworks" :key="fw.name">{{ fw.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>学习曲线</td>
            <td v-for="fw in frameworks" :key="fw.name">{{ fw.learningCurve }}</td>
          </tr>
          <tr>
            <td>社区规模</td>
            <td v-for="fw in frameworks" :key="fw.name">{{ fw.community }}</td>
          </tr>
          <tr>
            <td>最佳用途</td>
            <td v-for="fw in frameworks" :key="fw.name">{{ fw.bestFor }}</td>
          </tr>
          <tr>
            <td>GitHub Stars</td>
            <td v-for="fw in frameworks" :key="fw.name">{{ fw.stars }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedFramework = ref(0)

const frameworks = [
  {
    name: 'LangChain',
    icon: '🦜',
    tagline: '最流行的 LLM 应用开发框架',
    features: [
      '组件化设计，高度灵活',
      '丰富的集成（100+ 工具）',
      'LangGraph 专门用于构建 Agent',
      '支持多种 LLM 提供商',
      '活跃的社区和生态系统'
    ],
    scenarios: ['需要高度定制', '企业级应用', '与现有系统集成', '快速原型开发'],
    pros: [
      '生态系统最完善',
      '文档齐全，示例丰富',
      '灵活性强',
      '社区支持好'
    ],
    cons: [
      '学习曲线陡峭',
      '概念较多',
      '版本更新快',
      '有些抽象难以理解'
    ],
    scores: {
      '灵活性': 95,
      '易用性': 70,
      '性能': 80,
      '文档': 90,
      '社区': 95
    },
    website: 'https://langchain.com',
    github: 'https://github.com/langchain-ai/langchain',
    docs: 'https://python.langchain.com',
    learningCurve: '⭐⭐⭐⭐',
    community: '⭐⭐⭐⭐⭐',
    bestFor: '通用 LLM 应用',
    stars: '95k+'
  },
  {
    name: 'AutoGen',
    icon: '🤖',
    tagline: '微软出品的 Agent 协作框架',
    features: [
      '多 Agent 协作',
      'Agent 之间可以对话',
      '强大的代码执行能力',
      '支持人类介入',
      '内置错误恢复'
    ],
    scenarios: ['编程辅助', '多 Agent 协作', '数据分析', '代码审查'],
    pros: [
      '协作模式独特',
      '代码执行能力强',
      '微软支持',
      '易于调试'
    ],
    cons: [
      '相对小众',
      '文档不够完善',
      '社区较小',
      '主要用于编程场景'
    ],
    scores: {
      '灵活性': 75,
      '易用性': 80,
      '性能': 85,
      '文档': 70,
      '社区': 70
    },
    website: 'https://microsoft.github.io/autogen',
    github: 'https://github.com/microsoft/autogen',
    docs: 'https://microsoft.github.io/autogen/docs',
    learningCurve: '⭐⭐⭐',
    community: '⭐⭐⭐',
    bestFor: '多 Agent 编程',
    stars: '30k+'
  },
  {
    name: 'CrewAI',
    icon: '👥',
    tagline: '角色驱动的多 Agent 系统',
    features: [
      '角色驱动的 Agent 设计',
      '团队协作模式',
      '直观的任务定义',
      '支持复杂的协作流程',
      '易于理解和使用'
    ],
    scenarios: ['内容创作', '研究团队', '营销团队', '业务流程自动化'],
    pros: [
      '概念易于理解',
      '角色设计直观',
      '协作流程清晰',
      '快速上手'
    ],
    cons: [
      '生态相对较小',
      '定制性有限',
      '性能优化不足',
      '社区较小'
    ],
    scores: {
      '灵活性': 70,
      '易用性': 90,
      '性能': 70,
      '文档': 80,
      '社区': 65
    },
    website: 'https://crewai.com',
    github: 'https://github.com/joaomdmoura/crewAI',
    docs: 'https://docs.crewai.com',
    learningCurve: '⭐⭐',
    community: '⭐⭐⭐',
    bestFor: '角色协作',
    stars: '12k+'
  },
  {
    name: 'AgentScope',
    icon: '🔭',
    tagline: '阿里开源的 Agent 框架',
    features: [
      '中文友好',
      '简单易用',
      '支持多模态',
      '分布式执行',
      '可视化调试'
    ],
    scenarios: ['中文应用', '多模态 Agent', '分布式系统', '国内部署'],
    pros: [
      '中文文档完善',
      '国内部署友好',
      '上手简单',
      '多模态支持好'
    ],
    cons: [
      '生态较新',
      '社区较小',
      '功能相对有限',
      '国际化不足'
    ],
    scores: {
      '灵活性': 70,
      '易用性': 85,
      '性能': 75,
      '文档': 80,
      '社区': 60
    },
    website: 'https://github.com/modelscope/agentscope',
    github: 'https://github.com/modelscope/agentscope',
    docs: 'https://modelscope.github.io/agentscope',
    learningCurve: '⭐⭐',
    community: '⭐⭐',
    bestFor: '中文多模态',
    stars: '5k+'
  }
]
</script>

<style scoped>
.framework-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.framework-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 12px 24px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.framework-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
}

.framework-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.framework-icon {
  font-size: 3rem;
}

.framework-header h3 {
  margin: 0 0 4px 0;
  color: var(--vp-c-brand);
  font-size: 1.8rem;
}

.framework-tagline {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.framework-details {
  display: grid;
  gap: 24px;
}

.detail-section h4 {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.detail-section ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.detail-section li {
  padding: 4px 0;
  color: var(--vp-c-text-2);
  position: relative;
}

.detail-section li::before {
  content: '•';
  position: absolute;
  left: -16px;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.scenarios {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.scenario-tag {
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros-title {
  color: #10b981;
  font-weight: bold;
  margin-bottom: 8px;
}

.cons-title {
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 8px;
}

.capabilities {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.capability-item {
  display: grid;
  grid-template-columns: 80px 1fr 60px;
  gap: 12px;
  align-items: center;
}

.capability-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.capability-bar {
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 12px;
  transition: width 0.5s ease;
}

.capability-value {
  font-weight: bold;
  color: var(--vp-c-brand);
  text-align: right;
}

.links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.link-item {
  padding: 10px 20px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.link-item:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
}

.comparison-table h3 {
  margin: 0 0 20px 0;
  color: var(--vp-c-text-1);
  font-size: 1.3rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  text-align: left;
  font-weight: bold;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

tbody td {
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>
