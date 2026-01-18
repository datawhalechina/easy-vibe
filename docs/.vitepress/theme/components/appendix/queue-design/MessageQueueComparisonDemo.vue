<!--
  MessageQueueComparisonDemo.vue
  主流消息队列对比交互演示
-->
<template>
  <div class="mq-comparison-demo">
    <div class="header">
      <div class="title">主流消息队列对比</div>
      <div class="subtitle">选择不同 MQ，查看特性对比和适用场景</div>
    </div>

    <div class="mq-selector">
      <button
        v-for="mq in messageQueues"
        :key="mq.name"
        class="mq-btn"
        :class="{ active: selectedMQ === mq.name }"
        @click="selectMQ(mq.name)"
      >
        {{ mq.label }}
      </button>
    </div>

    <div class="mq-details">
      <div class="mq-card">
        <div class="mq-header">
          <div class="mq-name">{{ currentMQ.label }}</div>
          <div class="mq-tag">{{ currentMQ.positioning }}</div>
        </div>

        <div class="metrics-grid">
          <div class="metric">
            <div class="metric-label">吞吐量</div>
            <div class="metric-value">{{ currentMQ.throughput }}</div>
            <div class="metric-bar">
              <div
                class="bar-fill"
                :style="{ width: currentMQ.throughputPercent + '%' }"
              ></div>
            </div>
          </div>

          <div class="metric">
            <div class="metric-label">延迟</div>
            <div class="metric-value">{{ currentMQ.latency }}</div>
            <div class="metric-desc">{{ currentMQ.latencyDesc }}</div>
          </div>

          <div class="metric">
            <div class="metric-label">可靠性</div>
            <div class="metric-value">{{ currentMQ.reliability }}</div>
            <div class="metric-desc">{{ currentMQ.reliabilityDesc }}</div>
          </div>

          <div class="metric">
            <div class="metric-label">学习曲线</div>
            <div class="metric-value">{{ currentMQ.learning }}</div>
            <div class="metric-bar">
              <div
                class="bar-fill learning"
                :style="{ width: currentMQ.learningPercent + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="features">
          <div class="feature-title">核心特性</div>
          <div class="feature-list">
            <div
              v-for="feature in currentMQ.features"
              :key="feature"
              class="feature-item"
            >
              ✓ {{ feature }}
            </div>
          </div>
        </div>

        <div class="use-cases">
          <div class="use-case-title">✅ 适用场景</div>
          <ul class="use-case-list">
            <li v-for="useCase in currentMQ.useCases" :key="useCase">
              {{ useCase }}
            </li>
          </ul>
        </div>

        <div class="not-recommended">
          <div class="not-title">⚠️ 不推荐场景</div>
          <ul class="not-list">
            <li v-for="item in currentMQ.notRecommended" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">快速对比表</div>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>吞吐量</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.throughput }}
            </td>
          </tr>
          <tr>
            <td>延迟</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.latency }}
            </td>
          </tr>
          <tr>
            <td>消息顺序</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.ordering }}
            </td>
          </tr>
          <tr>
            <td>消息回溯</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.rewind }}
            </td>
          </tr>
          <tr>
            <td>最佳场景</td>
            <td
              v-for="mq in messageQueues"
              :key="mq.name"
              :class="{ highlight: mq.name === selectedMQ }"
            >
              {{ mq.bestScenario }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="recommendation">
      <div class="rec-title">💡 选择建议</div>
      <div class="rec-content">
        <div v-if="selectedMQ === 'rabbitmq'" class="rec-text">
          <strong>RabbitMQ</strong>
          是最稳妥的选择，适合大多数传统业务场景。如果团队有 AMQP
          经验，或者需要复杂的路由规则，优先选择它。
        </div>
        <div v-else-if="selectedMQ === 'kafka'" class="rec-text">
          <strong>Kafka</strong> 适合大数据量和流式处理场景。如果需要处理百万级
          TPS，或者需要消息回溯、与大数据生态集成，选择 Kafka。
        </div>
        <div v-else-if="selectedMQ === 'rocketmq'" class="rec-text">
          <strong>RocketMQ</strong>
          是阿里开源，特别适合电商、金融场景。如果需要事务消息、顺序消息、延迟消息等高级特性，RocketMQ
          是最佳选择。
        </div>
        <div v-else class="rec-text">
          <strong>Redis Stream</strong> 最轻量，适合小团队和 MVP
          验证。如果已经有 Redis 基础设施，且对可靠性要求不是极高，可以先用
          Redis Stream 快速实现。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMQ = ref('rabbitmq')

const messageQueues = [
  {
    name: 'rabbitmq',
    label: 'RabbitMQ',
    positioning: '传统消息队列',
    throughput: '1 万/秒',
    throughputPercent: 10,
    latency: '微秒级',
    latencyDesc: '极低延迟',
    reliability: '高',
    reliabilityDesc: '持久化支持',
    learning: '中等',
    learningPercent: 40,
    ordering: '支持（单队列）',
    rewind: '不支持',
    bestScenario: '传统业务',
    features: [
      'AMQP 协议标准',
      '灵活的路由规则',
      '多种消息模式',
      '管理界面友好',
      '成熟的生态'
    ],
    useCases: [
      '传统业务系统',
      '任务队列',
      '需要复杂路由规则',
      '对延迟敏感（微秒级）',
      '团队熟悉 AMQP'
    ],
    notRecommended: ['吞吐量要求百万级', '需要消息回溯功能']
  },
  {
    name: 'kafka',
    label: 'Kafka',
    positioning: '分布式日志系统',
    throughput: '100 万/秒',
    throughputPercent: 100,
    latency: '毫秒级',
    latencyDesc: '相对较高',
    reliability: '高',
    reliabilityDesc: '多副本机制',
    learning: '陡峭',
    learningPercent: 80,
    ordering: '支持（分区内）',
    rewind: '支持',
    bestScenario: '日志/流处理',
    features: [
      '超高吞吐量',
      '消息回溯能力',
      '分布式架构',
      '与大数据生态集成',
      '分区机制'
    ],
    useCases: [
      '日志收集',
      '流式处理',
      '事件溯源',
      '用户行为分析',
      '百万级 TPS 场景'
    ],
    notRecommended: ['对延迟极度敏感', '简单的任务队列', '小团队快速开发']
  },
  {
    name: 'rocketmq',
    label: 'RocketMQ',
    positioning: '电商级消息队列',
    throughput: '10 万/秒',
    throughputPercent: 30,
    latency: '毫秒级',
    latencyDesc: '低延迟',
    reliability: '高',
    reliabilityDesc: '同步/异步刷盘',
    learning: '陡峭',
    learningPercent: 70,
    ordering: '支持',
    rewind: '支持',
    bestScenario: '电商/金融',
    features: ['事务消息', '顺序消息', '延迟消息', '消息过滤', '金融级可靠性'],
    useCases: [
      '电商交易系统',
      '金融支付',
      '订单处理',
      '需要事务一致性',
      '需要定时/延迟消息'
    ],
    notRecommended: ['简单的异步任务', '小团队快速验证', '不需要高级特性']
  },
  {
    name: 'redis',
    label: 'Redis Stream',
    positioning: '轻量级队列',
    throughput: '5 万/秒',
    throughputPercent: 20,
    latency: '毫秒级',
    latencyDesc: '低延迟',
    reliability: '中',
    reliabilityDesc: 'AOF 持久化',
    learning: '简单',
    learningPercent: 15,
    ordering: '支持',
    rewind: '支持',
    bestScenario: '小规模队列',
    features: ['轻量级', '基于 Redis', '学习成本低', '易于部署', '性能优秀'],
    useCases: [
      '小团队项目',
      'MVP 快速验证',
      '已有 Redis 基础设施',
      '简单队列需求',
      '对可靠性要求不高'
    ],
    notRecommended: ['对可靠性要求极高', '复杂的路由需求', '需要事务消息']
  }
]

const currentMQ = computed(() => {
  return (
    messageQueues.find((mq) => mq.name === selectedMQ.value) || messageQueues[0]
  )
})

const selectMQ = (name) => {
  selectedMQ.value = name
}
</script>

<style scoped>
.mq-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.mq-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mq-btn {
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.mq-btn:hover {
  border-color: var(--vp-c-brand);
}

.mq-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.mq-details {
  margin-bottom: 1.5rem;
}

.mq-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.mq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.mq-name {
  font-size: 1.3rem;
  font-weight: 700;
}

.mq-tag {
  padding: 0.4rem 0.8rem;
  background: rgba(59, 130, 246, 0.15);
  color: var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.metric-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.metric-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.metric-bar {
  height: 6px;
  background: var(--vp-c-bg);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.5s ease;
}

.bar-fill.learning {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.features {
  margin-bottom: 1.5rem;
}

.feature-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
}

.feature-item {
  padding: 0.5rem 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 6px;
  font-size: 0.85rem;
  color: #166534;
}

.use-cases,
.not-recommended {
  margin-bottom: 1rem;
}

.use-case-title,
.not-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.use-case-list,
.not-list {
  margin: 0;
  padding-left: 1.5rem;
}

.use-case-list li,
.not-list li {
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.not-list li {
  color: var(--vp-c-text-2);
}

.comparison-table {
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.table-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  background: var(--vp-c-bg);
  font-weight: 600;
}

td.highlight,
th.highlight {
  background: rgba(59, 130, 246, 0.1);
  font-weight: 600;
}

.recommendation {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.rec-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.rec-text {
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
