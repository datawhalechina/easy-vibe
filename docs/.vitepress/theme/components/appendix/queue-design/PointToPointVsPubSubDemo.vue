<!--
  PointToPointVsPubSubDemo.vue
  点对点 vs 发布订阅对比演示
-->
<template>
  <div class="messaging-patterns-demo">
    <div class="header">
      <div class="title">消息模式：点对点 vs 发布订阅</div>
      <div class="subtitle">选择模式，观察消息如何分发</div>
    </div>

    <div class="mode-selector">
      <button
        class="mode-btn"
        :class="{ active: mode === 'p2p' }"
        @click="setMode('p2p')"
      >
        点对点 (P2P)
      </button>
      <button
        class="mode-btn"
        :class="{ active: mode === 'pubsub' }"
        @click="setMode('pubsub')"
      >
        发布订阅 (Pub/Sub)
      </button>
    </div>

    <div class="description">
      <div v-if="mode === 'p2p'" class="desc-text">
        <strong>点对点模式：</strong
        >一条消息只能被<strong>一个消费者</strong>消费。适合任务分配、负载均衡场景。
      </div>
      <div v-else class="desc-text">
        <strong>发布订阅模式：</strong
        >一条消息可以被<strong>多个消费者</strong>同时接收。适合事件通知、广播场景。
      </div>
    </div>

    <div class="demo-area">
      <div class="producer-section">
        <div class="section-title">生产者 Producer</div>
        <div class="producer-box">
          <div class="icon">📤</div>
          <div class="label">订单服务</div>
        </div>
        <button class="send-btn" @click="sendMessage" :disabled="sending">
          {{ sending ? '发送中...' : '发送消息' }}
        </button>
      </div>

      <div class="broker-section">
        <div class="section-title">
          {{ mode === 'p2p' ? '队列 Queue' : '主题 Topic' }}
        </div>
        <div class="broker-box">
          <div class="broker-icon">{{ mode === 'p2p' ? '📦' : '📡' }}</div>
          <div class="broker-label">
            {{ mode === 'p2p' ? '消息队列' : '发布主题' }}
          </div>
          <div class="message-indicator" v-if="lastMessage">
            消息 #{{ lastMessage }}
          </div>
        </div>
        <div class="mode-badge">
          {{ mode === 'p2p' ? '竞争消费' : '广播' }}
        </div>
      </div>

      <div class="consumer-section">
        <div class="section-title">消费者 Consumers</div>
        <div class="consumers-grid">
          <div
            v-for="consumer in consumers"
            :key="consumer.id"
            class="consumer-box"
            :class="{ active: consumer.active }"
          >
            <div class="consumer-icon">
              {{ consumer.active ? '⚙️' : '💤' }}
            </div>
            <div class="consumer-label">{{ consumer.name }}</div>
            <div class="consumer-count">已处理: {{ consumer.count }}</div>
            <div class="consumer-status">
              {{ consumer.active ? '处理中' : '空闲' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>点对点 (P2P)</th>
            <th>发布订阅 (Pub/Sub)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>消息消费</td>
            <td>一个消费者</td>
            <td>多个消费者</td>
          </tr>
          <tr>
            <td>典型场景</td>
            <td>任务分配、负载均衡</td>
            <td>事件通知、数据广播</td>
          </tr>
          <tr>
            <td>消费关系</td>
            <td>竞争消费</td>
            <td>独立订阅</td>
          </tr>
          <tr>
            <td>例子</td>
            <td>Excel 导出任务分发给工作节点</td>
            <td>用户注册后发邮件+短信+优惠券</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="example-scenario">
      <div class="scenario-title">📌 实际场景</div>
      <div v-if="mode === 'p2p'" class="scenario-content">
        <div>
          <strong>任务分配：</strong>批量导入 10000 条用户数据，分发给 3
          个工作节点并行处理
        </div>
        <div class="flow">
          任务入队 → [Worker1, Worker2, Worker3] 竞争抢任务 →
          每个任务只被处理一次
        </div>
      </div>
      <div v-else class="scenario-content">
        <div><strong>事件通知：</strong>用户下单成功后，同时通知多个系统</div>
        <div class="flow">
          发布事件 → [库存服务, 积分服务, 通知服务, 数据仓库] 各自独立处理
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('p2p')
const sending = ref(false)
const lastMessage = ref(null)
let messageId = 0

const consumers = ref([
  { id: 1, name: '消费者 A', count: 0, active: false },
  { id: 2, name: '消费者 B', count: 0, active: false },
  { id: 3, name: '消费者 C', count: 0, active: false }
])

const setMode = (newMode) => {
  mode.value = newMode
  consumers.value.forEach((c) => {
    c.count = 0
    c.active = false
  })
  lastMessage.value = null
}

const sendMessage = () => {
  if (sending.value) return

  sending.value = true
  messageId++
  lastMessage.value = messageId

  setTimeout(() => {
    if (mode.value === 'p2p') {
      // P2P: 随机选择一个消费者
      const availableConsumers = consumers.value.filter((c) => !c.active)
      if (availableConsumers.length > 0) {
        const consumer =
          availableConsumers[
            Math.floor(Math.random() * availableConsumers.length)
          ]
        processMessage(consumer)
      }
    } else {
      // Pub/Sub: 所有消费者都接收
      consumers.value.forEach((consumer) => {
        setTimeout(() => {
          processMessage(consumer)
        }, Math.random() * 500)
      })
    }

    sending.value = false
  }, 500)
}

const processMessage = (consumer) => {
  consumer.active = true
  setTimeout(
    () => {
      consumer.count++
      consumer.active = false
    },
    1000 + Math.random() * 1000
  )
}
</script>

<style scoped>
.messaging-patterns-demo {
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

.mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.description {
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
}

.desc-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.demo-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.producer-section,
.broker-section,
.consumer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.producer-box,
.broker-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  min-width: 140px;
  margin-bottom: 0.75rem;
}

.icon,
.broker-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.label,
.broker-label {
  font-size: 0.9rem;
  font-weight: 600;
}

.message-indicator {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.send-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mode-badge {
  padding: 0.4rem 0.8rem;
  background: rgba(59, 130, 246, 0.15);
  color: var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.consumers-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.consumer-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s;
}

.consumer-box.active {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.consumer-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.consumer-label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.consumer-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.consumer-status {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: var(--vp-c-text-3);
}

.comparison-table {
  margin: 1.5rem 0;
  overflow-x: auto;
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

tr:hover td {
  background: var(--vp-c-bg-soft);
}

.example-scenario {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.scenario-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.scenario-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

.scenario-content > div:first-child {
  margin-bottom: 0.5rem;
}

.flow {
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: monospace;
}
</style>
