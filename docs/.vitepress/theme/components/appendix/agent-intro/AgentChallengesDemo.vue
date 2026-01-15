<template>
  <div class="agent-challenges-demo">
    <div class="challenges-grid">
      <div
        v-for="(challenge, index) in challenges"
        :key="challenge.title"
        class="challenge-card"
        :class="{ active: selectedChallenge === index }"
        @click="selectedChallenge = index"
      >
        <div class="challenge-icon">{{ challenge.icon }}</div>
        <div class="challenge-title">{{ challenge.title }}</div>
        <div class="challenge-level">
          <span
            v-for="i in challenge.difficulty"
            :key="i"
            class="difficulty-star"
          >⭐</span>
        </div>
      </div>
    </div>

    <div class="challenge-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ challenges[selectedChallenge].icon }}</span>
        <h3>{{ challenges[selectedChallenge].title }}</h3>
      </div>

      <div class="detail-sections">
        <div class="detail-section">
          <h4>📖 问题描述</h4>
          <p>{{ challenges[selectedChallenge].description }}</p>
        </div>

        <div class="detail-section">
          <h4>💡 为什么困难？</h4>
          <ul>
            <li v-for="reason in challenges[selectedChallenge].reasons" :key="reason">
              {{ reason }}
            </li>
          </ul>
        </div>

        <div class="detail-section">
          <h4>🔧 解决方案</h4>
          <div class="solutions">
            <div
              v-for="solution in challenges[selectedChallenge].solutions"
              :key="solution.title"
              class="solution-item"
            >
              <div class="solution-title">{{ solution.title }}</div>
              <div class="solution-desc">{{ solution.description }}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>📊 当前进展</h4>
          <div class="progress-item">
            <div class="progress-label">解决进度</div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: challenges[selectedChallenge].progress + '%' }"
              ></div>
            </div>
            <div class="progress-value">{{ challenges[selectedChallenge].progress }}%</div>
          </div>
        </div>

        <div class="detail-section">
          <h4>🔗 相关资源</h4>
          <div class="resources">
            <a
              v-for="resource in challenges[selectedChallenge].resources"
              :key="resource.title"
              :href="resource.url"
              target="_blank"
              class="resource-link"
            >
              {{ resource.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedChallenge = ref(0)

const challenges = [
  {
    title: '任务规划',
    icon: '📋',
    difficulty: 5,
    description: 'Agent 需要将复杂的用户任务分解为可执行的步骤，并动态调整计划。这要求 Agent 具备强大的推理能力和前瞻性思维。',
    reasons: [
      '任务分解需要深度理解用户意图',
      '长期规划容易偏离目标',
      '动态调整计划增加了复杂性',
      '缺乏反馈时难以评估进度'
    ],
    solutions: [
      {
        title: '层次化规划',
        description: '将大任务分解为子任务，子任务再分解为具体步骤，形成层次结构。'
      },
      {
        title: '反思机制',
        description: '定期回顾已完成的步骤，评估计划的有效性，及时调整策略。'
      },
      {
        title: '外部记忆',
        description: '使用 todo.md 等文件记录计划，将目标保持在 Agent 的"视野"中。'
      }
    ],
    progress: 40,
    resources: [
      { title: 'ReAct 论文', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Tree of Thoughts', url: 'https://arxiv.org/abs/2305.10601' }
    ]
  },
  {
    title: '上下文管理',
    icon: '🧠',
    difficulty: 5,
    description: 'Agent 在多次迭代中会积累大量上下文，如何有效管理、压缩和检索这些信息是一个巨大挑战。',
    reasons: [
      '上下文长度受限（128K-200K）',
      '长上下文会降低模型性能',
      '重要信息可能被"淹没"',
      '成本随长度线性增长'
    ],
    solutions: [
      {
        title: 'KV 缓存优化',
        description: '保持前缀稳定，只追加不修改，提高缓存命中率，降低 90% 成本。'
      },
      {
        title: '外部记忆',
        description: '大内容写入文件系统，上下文只保留引用和路径。'
      },
      {
        title: '智能压缩',
        description: '使用摘要、选择性保留、语义压缩等技术减少上下文长度。'
      }
    ],
    progress: 60,
    resources: [
      { title: '上下文工程指南', url: '#' },
      { title: 'Manus 最佳实践', url: '#' }
    ]
  },
  {
    title: '工具使用',
    icon: '🔧',
    difficulty: 4,
    description: 'Agent 需要从众多工具中选择正确的工具，并正确调用它们。工具选择错误或调用失败都会导致任务失败。',
    reasons: [
      '工具数量多，选择困难',
      '工具参数复杂，容易出错',
      '工具调用失败需要恢复',
      '工具之间可能存在依赖关系'
    ],
    solutions: [
      {
        title: 'Logits 遮蔽',
        description: '使用前缀限制模型只能调用特定工具，避免选择错误的工具。'
      },
      {
        title: '工具分组',
        description: '将工具按功能分类（如 browser_、shell_），便于选择和管理。'
      },
      {
        title: '错误恢复',
        description: '保留失败尝试在上下文中，让 Agent 从错误中学习。'
      }
    ],
    progress: 70,
    resources: [
      { title: 'Function Calling 指南', url: '#' },
      { title: '工具设计最佳实践', url: '#' }
    ]
  },
  {
    title: '记忆系统',
    icon: '💾',
    difficulty: 4,
    description: 'Agent 需要记住历史信息、学习经验、识别模式。设计一个高效的记忆系统对 Agent 的长期性能至关重要。',
    reasons: [
      '需要区分即时、短期、长期记忆',
      '信息检索和更新的效率',
      '记忆的准确性和相关性',
      '跨任务的知识迁移'
    ],
    solutions: [
      {
        title: '三层记忆架构',
        description: '即时上下文（当前对话）+ 短期记忆（会话级）+ 长期记忆（持久化）。'
      },
      {
        title: '向量检索',
        description: '使用嵌入和向量数据库实现语义相似度检索。'
      },
      {
        title: '记忆整合',
        description: '定期将短期记忆中的重要信息转移到长期记忆。'
      }
    ],
    progress: 50,
    resources: [
      { title: 'RAG 技术', url: '#' },
      { title: '向量数据库指南', url: '#' }
    ]
  },
  {
    title: '错误处理',
    icon: '⚠️',
    difficulty: 3,
    description: 'Agent 在执行过程中会遇到各种错误：工具失败、网络超时、无效响应等。如何优雅地处理这些错误是一个挑战。',
    reasons: [
      '错误类型多样',
      '需要区分可恢复和不可恢复的错误',
      '错误可能级联传播',
      '重试策略需要优化'
    ],
    solutions: [
      {
        title: '保留错误信息',
        description: '将失败的尝试保留在上下文中，让 Agent 学习并避免重复错误。'
      },
      {
        title: '重试机制',
        description: '对于可恢复的错误，实现指数退避的重试策略。'
      },
      {
        title: '回滚和恢复',
        description: '支持任务状态的保存和恢复，避免完全重新开始。'
      }
    ],
    progress: 65,
    resources: [
      { title: '错误处理最佳实践', url: '#' },
      { title: '容错设计模式', url: '#' }
    ]
  },
  {
    title: '安全防护',
    icon: '🛡️',
    difficulty: 5,
    description: 'Agent 具有执行能力，如果被恶意利用可能造成严重后果。提示注入、工具滥用、数据泄露都是需要防范的安全风险。',
    reasons: [
      '提示注入攻击难以检测',
      'Agent 可能被诱导执行危险操作',
      '敏感信息可能泄露',
      '攻击面广，难以全面防护'
    ],
    solutions: [
      {
        title: '输入清理',
        description: '严格清理和验证用户输入，分离系统和用户消息。'
      },
      {
        title: '权限控制',
        description: '使用白名单限制工具访问，敏感操作需要二次确认。'
      },
      {
        title: '沙箱环境',
        description: '在隔离的沙箱中执行危险操作，限制资源访问。'
      },
      {
        title: '输出过滤',
        description: '过滤敏感信息，加密存储数据，定期审计日志。'
      }
    ],
    progress: 55,
    resources: [
      { title: 'AI 安全指南', url: '#' },
      { title: 'OWASP LLM Top 10', url: '#' }
    ]
  }
]
</script>

<style scoped>
.agent-challenges-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.challenges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.challenge-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.challenge-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
}

.challenge-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.challenge-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.challenge-title {
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.challenge-level {
  display: flex;
  justify-content: center;
  gap: 2px;
}

.difficulty-star {
  font-size: 0.8rem;
}

.challenge-detail {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 2.5rem;
}

.detail-header h3 {
  margin: 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-section h4 {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.detail-section p {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0;
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

.solutions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.solution-item {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.solution-title {
  font-weight: bold;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}

.solution-desc {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

.progress-item {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  gap: 12px;
  align-items: center;
}

.progress-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.progress-bar {
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 12px;
  transition: width 0.5s ease;
}

.progress-value {
  font-weight: bold;
  color: var(--vp-c-brand);
  text-align: right;
}

.resources {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.resource-link {
  padding: 10px 20px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.resource-link:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}
</style>
