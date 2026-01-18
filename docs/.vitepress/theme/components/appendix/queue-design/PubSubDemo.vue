<!--
  PubSubDemo.vue
  发布订阅模式演示 - 一条消息多消费者
-->
<template>
  <div class="pubsub-demo">
    <div class="header">
      <div class="title">发布订阅模式：一条消息，多处消费</div>
      <div class="subtitle">发布一次事件，多个订阅者独立处理</div>
    </div>

    <div class="main-flow">
      <div class="publisher-section">
        <div class="section-title">📤 发布者 Publisher</div>
        <div class="event-selector">
          <label>选择事件：</label>
          <select v-model="selectedEvent" @change="onEventChange">
            <option value="order.created">订单创建成功</option>
            <option value="user.registered">用户注册成功</option>
            <option value="product.updated">商品信息更新</option>
          </select>
        </div>
        <div class="event-details">
          <div class="event-name">{{ eventDetails.name }}</div>
          <div class="event-desc">{{ eventDetails.description }}</div>
        </div>
        <button
          class="publish-btn"
          @click="publishEvent"
          :disabled="publishing"
        >
          {{ publishing ? '发布中...' : '🚀 发布事件' }}
        </button>
      </div>

      <div class="topic-section">
        <div class="section-title">📡 主题 Topic</div>
        <div class="topic-box" :class="{ active: hasMessage }">
          <div class="topic-icon">📨</div>
          <div class="topic-name">{{ selectedEvent }}</div>
          <div v-if="hasMessage" class="message-indicator">消息已发布</div>
        </div>
        <div class="topic-desc">所有订阅者都会收到这条消息</div>
      </div>

      <div class="subscribers-section">
        <div class="section-title">📥 订阅者 Subscribers</div>
        <div class="subscribers-grid">
          <div
            v-for="sub in currentSubscribers"
            :key="sub.id"
            class="subscriber-card"
            :class="{ processing: sub.processing, completed: sub.completed }"
          >
            <div class="sub-icon">{{ sub.icon }}</div>
            <div class="sub-name">{{ sub.name }}</div>
            <div class="sub-action">{{ sub.action }}</div>
            <div class="sub-status">
              <span v-if="sub.processing">⏳ 处理中...</span>
              <span v-else-if="sub.completed">✅ 已完成</span>
              <span v-else>💤 等待消息</span>
            </div>
            <div class="sub-count">已处理: {{ sub.count }} 条</div>
          </div>
        </div>
      </div>
    </div>

    <div class="real-time-log">
      <div class="log-header">
        <div class="log-title">📋 实时日志</div>
        <button class="clear-btn" @click="clearLog">清空</button>
      </div>
      <div class="log-content">
        <div v-if="logs.length === 0" class="log-empty">暂无日志</div>
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="log-entry"
          :class="log.type"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>

    <div class="use-cases">
      <div class="case-title">💡 典型应用场景</div>
      <div class="case-grid">
        <div class="case-card">
          <div class="case-icon">🛒</div>
          <div class="case-name">电商订单</div>
          <div class="case-desc">
            订单创建 → 库存服务、积分服务、通知服务、数据仓库同时处理
          </div>
        </div>
        <div class="case-card">
          <div class="case-icon">👤</div>
          <div class="case-name">用户注册</div>
          <div class="case-desc">
            用户注册 → 欢迎邮件、短信验证、发放优惠券、创建用户画像
          </div>
        </div>
        <div class="case-card">
          <div class="case-icon">📊</div>
          <div class="case-name">数据分析</div>
          <div class="case-desc">
            用户行为 → 推荐系统、实时统计、数据仓库、风控系统
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEvent = ref('order.created')
const publishing = ref(false)
const hasMessage = ref(false)
const logs = ref([])

const eventConfigs = {
  'order.created': {
    name: '订单创建成功',
    description: '用户完成支付，订单创建成功',
    subscribers: [
      {
        id: 1,
        name: '库存服务',
        icon: '📦',
        action: '扣减库存',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 2,
        name: '积分服务',
        icon: '💎',
        action: '增加积分',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 3,
        name: '短信服务',
        icon: '📱',
        action: '发送短信',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 4,
        name: '邮件服务',
        icon: '📧',
        action: '发送邮件',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 5,
        name: '数据仓库',
        icon: '📊',
        action: '记录订单数据',
        processing: false,
        completed: false,
        count: 0
      }
    ]
  },
  'user.registered': {
    name: '用户注册成功',
    description: '新用户完成注册流程',
    subscribers: [
      {
        id: 1,
        name: '欢迎邮件',
        icon: '📧',
        action: '发送欢迎邮件',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 2,
        name: '短信验证',
        icon: '📱',
        action: '发送验证短信',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 3,
        name: '优惠券服务',
        icon: '🎫',
        action: '发放新用户券',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 4,
        name: '用户画像',
        icon: '👤',
        action: '创建用户档案',
        processing: false,
        completed: false,
        count: 0
      }
    ]
  },
  'product.updated': {
    name: '商品信息更新',
    description: '商家更新商品信息',
    subscribers: [
      {
        id: 1,
        name: '搜索服务',
        icon: '🔍',
        action: '更新搜索索引',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 2,
        name: '推荐服务',
        icon: '⭐',
        action: '更新推荐列表',
        processing: false,
        completed: false,
        count: 0
      },
      {
        id: 3,
        name: '缓存服务',
        icon: '⚡',
        action: '刷新缓存',
        processing: false,
        completed: false,
        count: 0
      }
    ]
  }
}

const subscribers = ref(
  JSON.parse(JSON.stringify(eventConfigs['order.created'].subscribers))
)

const eventDetails = computed(() => {
  return eventConfigs[selectedEvent.value]
})

const currentSubscribers = computed(() => {
  return subscribers.value
})

const onEventChange = () => {
  subscribers.value = JSON.parse(
    JSON.stringify(eventConfigs[selectedEvent.value].subscribers)
  )
  hasMessage.value = false
}

const publishEvent = () => {
  if (publishing.value) return

  publishing.value = true
  hasMessage.value = true

  addLog('info', `📤 发布事件: ${eventDetails.value.name}`)

  // 所有订阅者都收到消息
  subscribers.value.forEach((sub, index) => {
    setTimeout(() => {
      sub.processing = true
      sub.completed = false
      addLog('info', `📥 ${sub.name} 开始处理`)

      // 模拟处理时间
      setTimeout(
        () => {
          sub.processing = false
          sub.completed = true
          sub.count++
          addLog('success', `✅ ${sub.name} 处理完成: ${sub.action}`)

          setTimeout(() => {
            sub.completed = false
          }, 2000)
        },
        1500 + Math.random() * 1000
      )
    }, index * 200)
  })

  setTimeout(() => {
    publishing.value = false
    setTimeout(() => {
      hasMessage.value = false
    }, 1000)
  }, 3000)
}

const addLog = (type, message) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.unshift({ type, time, message })
  logs.value = logs.value.slice(0, 20)
}

const clearLog = () => {
  logs.value = []
}
</script>

<style scoped>
.pubsub-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
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

.main-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

.publisher-section,
.topic-section,
.subscribers-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-selector {
  width: 100%;
  margin-bottom: 1rem;
}

.event-selector label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
}

.event-selector select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 0.9rem;
}

.event-details {
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  width: 100%;
}

.event-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.event-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.publish-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.publish-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.publish-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.topic-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  min-width: 160px;
  transition: all 0.3s;
}

.topic-box.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
  animation: pulse 2s infinite;
}

.topic-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.topic-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.message-indicator {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: #dcfce7;
  color: #166534;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.topic-desc {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.subscribers-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.subscriber-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  transition: all 0.3s;
}

.subscriber-card.processing {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.subscriber-card.completed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.sub-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  text-align: center;
}

.sub-name {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.25rem;
}

.sub-action {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.35rem;
}

.sub-status {
  font-size: 0.75rem;
  text-align: center;
  margin-bottom: 0.25rem;
}

.sub-count {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.real-time-log {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.log-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.clear-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--vp-c-divider);
}

.log-content {
  max-height: 250px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.8rem;
}

.log-empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 1rem;
}

.log-entry {
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 0.5rem;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.log-message {
  flex: 1;
}

.log-entry.info .log-message {
  color: var(--vp-c-text-1);
}

.log-entry.success .log-message {
  color: #16a34a;
}

.use-cases {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.case-title {
  font-weight: 600;
  margin-bottom: 1rem;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.case-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.case-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.case-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
  }
}
</style>
