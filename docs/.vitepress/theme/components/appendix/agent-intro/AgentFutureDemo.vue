<template>
  <div class="agent-future-demo">
    <div class="future-intro">
      <h3>🚀 Agent 的未来展望</h3>
      <p>探索 Agent 技术的发展趋势和应用前景</p>
    </div>

    <div class="timeline">
      <div class="timeline-line"></div>

      <div
        v-for="(era, index) in timeline"
        :key="era.period"
        class="timeline-item"
        :class="{ active: selectedEra === index }"
        @click="selectedEra = index"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="era-period">{{ era.period }}</div>
          <div class="era-title">{{ era.title }}</div>
          <div class="era-description">{{ era.description }}</div>
        </div>
      </div>
    </div>

    <div class="era-details">
      <div class="detail-card">
        <h4>{{ timeline[selectedEra].title }} ({{ timeline[selectedEra].period }})</h4>
        <p class="era-detail-desc">{{ timeline[selectedEra].detailDescription }}</p>

        <div class="era-features">
          <div class="features-title">🎯 关键特征</div>
          <div class="features-list">
            <div
              v-for="feature in timeline[selectedEra].features"
              :key="feature"
              class="feature-tag"
            >
              {{ feature }}
            </div>
          </div>
        </div>

        <div class="era-applications">
          <div class="applications-title">💼 典型应用</div>
          <div class="applications-grid">
            <div
              v-for="app in timeline[selectedEra].applications"
              :key="app.name"
              class="app-item"
            >
              <div class="app-icon">{{ app.icon }}</div>
              <div class="app-name">{{ app.name }}</div>
              <div class="app-desc">{{ app.description }}</div>
            </div>
          </div>
        </div>

        <div class="era-challenges">
          <div class="challenges-title">⚠️ 面临挑战</div>
          <ul>
            <li v-for="challenge in timeline[selectedEra].challenges" :key="challenge">
              {{ challenge }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="future-predictions">
      <h4>🔮 未来预测</h4>
      <div class="predictions-grid">
        <div
          v-for="(prediction, index) in predictions"
          :key="prediction.title"
          class="prediction-card"
        >
          <div class="prediction-icon">{{ prediction.icon }}</div>
          <div class="prediction-title">{{ prediction.title }}</div>
          <div class="prediction-desc">{{ prediction.description }}</div>
          <div class="prediction-time">预计实现：{{ prediction.timeline }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedEra = ref(3)

const timeline = [
  {
    period: '2023-2024',
    title: '萌芽期',
    description: '单 Agent，简单工具调用',
    detailDescription: 'Agent 技术的起步阶段，主要是简单的单 Agent 系统，能够调用有限工具完成基础任务。这个阶段证明了 Agent 的可行性，但能力还比较有限。',
    features: [
      '单一 Agent 执行',
      '基础工具调用',
      '简单的任务规划',
      '有限的记忆能力'
    ],
    applications: [
      { icon: '💬', name: '聊天机器人', description: '增强型对话助手' },
      { icon: '🔍', name: '搜索助手', description: '信息检索和汇总' },
      { icon: '📝', name: '写作助手', description: '内容生成辅助' }
    ],
    challenges: [
      '规划能力弱',
      '容易迷失目标',
      '上下文管理困难',
      '错误恢复能力差'
    ]
  },
  {
    period: '2024-2025',
    title: '成长期',
    description: '多工具，复杂任务处理',
    detailDescription: 'Agent 开始能够处理更复杂的任务，使用多个工具，具备基本的规划能力。框架和工具日趋成熟，开始出现实际应用。',
    features: [
      '多工具协作',
      '层次化任务分解',
      '短期记忆管理',
      '基础的反思能力'
    ],
    applications: [
      { icon: '💻', name: '编程助手', description: '代码编写和调试' },
      { icon: '📊', name: '数据分析', description: '自动化报告生成' },
      { icon: '🌐', name: 'Web Agent', description: '网页自动化操作' }
    ],
    challenges: [
      '长期规划困难',
      '记忆容量有限',
      '工具选择不准确',
      '安全风险增加'
    ]
  },
  {
    period: '2025-2026',
    title: '成熟期',
    description: '多 Agent 协作，专业化分工',
    detailDescription: '多个专业化的 Agent 开始协作，每个 Agent 专注于特定领域。通过通信和协作完成复杂任务，形成 AI 团队。',
    features: [
      '多 Agent 协作',
      '专业化分工',
      '持久化记忆',
      '主动学习和改进'
    ],
    applications: [
      { icon: '👥', name: 'AI 团队', description: '协作完成复杂项目' },
      { icon: '🔬', name: '研究助手', description: '自动化科研流程' },
      { icon: '🏢', name: '企业助手', description: '业务流程自动化' }
    ],
    challenges: [
      'Agent 间通信效率',
      '协作策略优化',
      '资源调度复杂',
      '责任归属问题'
    ]
  },
  {
    period: '2026-2028',
    title: '进化期',
    description: '自主 Agent，持续学习',
    detailDescription: 'Agent 具备强大的自主学习和改进能力，能够从经验中学习，优化自己的行为。可以适应新环境，掌握新技能，实现真正的智能。',
    features: [
      '自主学习和优化',
      '跨任务知识迁移',
      '多模态理解',
      '情感和个性'
    ],
    applications: [
      { icon: '🤖', name: '个人助理', description: '全天候智能助手' },
      { icon: '🎨', name: '创意专家', description: '艺术创作和设计' },
      { icon: '🔬', name: '科学家', description: '独立开展研究' }
    ],
    challenges: [
      '伦理和道德',
      '可控性和安全性',
      '社会接受度',
      '法律监管'
    ]
  },
  {
    period: '2028+',
    title: '融合期',
    description: '人机共生，Agent 社会',
    detailDescription: 'Agent 深度融入人类社会，成为工作、生活不可或缺的伙伴。形成复杂的 Agent 社会，与人类共同创造价值。',
    features: [
      '人机深度融合',
      'Agent 社会形成',
      '集体智能涌现',
      '通用人工智能'
    ],
    applications: [
      { icon: '🌍', name: '全球协作', description: '跨区域 Agent 协作' },
      { icon: '🧠', name: '知识网络', description: '全人类知识整合' },
      { icon: '🚀', name: '创新引擎', description: '加速科技发展' }
    ],
    challenges: [
      '人类身份认同',
      '社会结构变化',
      'AI 治理',
      '存在性风险'
    ]
  }
]

const predictions = [
  {
    icon: '🧠',
    title: '通用 Agent',
    description: '能够处理几乎所有类型的任务，达到人类专家水平',
    timeline: '2027-2030'
  },
  {
    icon: '👥',
    title: 'Agent 社会',
    description: '数百万 Agent 协作工作，形成复杂的经济系统',
    timeline: '2028-2032'
  },
  {
    icon: '🔬',
    title: '科学突破',
    description: 'Agent 帮助人类在药物、材料、能源等领域取得重大突破',
    timeline: '2026-2028'
  },
  {
    icon: '🎨',
    title: '创意革命',
    description: 'Agent 在艺术、音乐、文学等创作领域达到大师水准',
    timeline: '2025-2027'
  },
  {
    icon: '🏥',
    title: '医疗革命',
    description: 'Agent 医生提供个性化、精准化的医疗服务',
    timeline: '2026-2029'
  },
  {
    icon: '🌍',
    title: '全球协作',
    description: 'Agent 打破语言和文化障碍，实现真正的全球协作',
    timeline: '2027-2030'
  }
]
</script>

<style scoped>
.agent-future-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.future-intro {
  text-align: center;
  margin-bottom: 32px;
}

.future-intro h3 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.future-intro p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.timeline {
  position: relative;
  padding: 20px 0;
  margin-bottom: 32px;
}

.timeline-line {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  padding-bottom: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.timeline-item:hover {
  opacity: 0.8;
}

.timeline-item.active {
  opacity: 1;
}

.timeline-dot {
  position: absolute;
  left: 6px;
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

.timeline-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 16px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.timeline-item.active .timeline-content {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
}

.era-period {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-bottom: 4px;
}

.era-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.era-description {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.era-details {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
}

.detail-card h4 {
  margin: 0 0 12px 0;
  color: var(--vp-c-brand);
  font-size: 1.3rem;
}

.era-detail-desc {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 20px;
}

.era-features {
  margin-bottom: 20px;
}

.features-title {
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.era-applications {
  margin-bottom: 20px;
}

.applications-title {
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.app-item {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}

.app-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.app-name {
  font-weight: bold;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}

.app-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.era-challenges {
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #ef4444;
  border-radius: 8px;
}

.challenges-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #ef4444;
}

.era-challenges ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.era-challenges li {
  padding: 4px 0;
  color: var(--vp-c-text-2);
  position: relative;
}

.era-challenges li::before {
  content: '⚠️';
  position: absolute;
  left: -20px;
}

.future-predictions h4 {
  margin: 0 0 20px 0;
  color: var(--vp-c-text-1);
  font-size: 1.3rem;
}

.predictions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.prediction-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.prediction-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
}

.prediction-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.prediction-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.prediction-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 12px;
}

.prediction-time {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}
</style>
