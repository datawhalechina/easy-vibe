<!--
  DelayedMessageDemo.vue
  延迟消息演示 - 定时任务可视化
-->
<template>
  <div class="delayed-message-demo">
    <div class="header">
      <div class="title">延迟消息：让消息"定时送达"</div>
      <div class="subtitle">实现订单超时取消、定时提醒等功能</div>
    </div>

    <div class="scenarios">
      <button
        v-for="scenario in scenarios"
        :key="scenario.id"
        class="scenario-btn"
        :class="{ active: selectedScenario === scenario.id }"
        @click="selectScenario(scenario.id)"
      >
        {{ scenario.icon }} {{ scenario.name }}
      </button>
    </div>

    <div class="demo-area">
      <div class="sender-section">
        <div class="section-title">📤 发送延迟消息</div>
        <div class="scenario-info">
          <div class="scenario-name">{{ currentScenario.name }}</div>
          <div class="scenario-desc">{{ currentScenario.description }}</div>
        </div>

        <div class="delay-setting">
          <label>延迟时间：</label>
          <div class="delay-presets">
            <button
              v-for="preset in delayPresets"
              :key="preset.value"
              class="preset-btn"
              :class="{ active: delaySeconds === preset.value }"
              @click="delaySeconds = preset.value"
            >
              {{ preset.label }}
            </button>
          </div>
          <div class="delay-custom">
            <input v-model="customDelay" type="number" min="1" max="3600" />
            <span>秒</span>
          </div>
        </div>

        <button
          class="send-btn"
          @click="sendDelayedMessage"
          :disabled="sending"
        >
          {{ sending ? '发送中...' : '📨 发送延迟消息' }}
        </button>
      </div>

      <div class="timeline-section">
        <div class="section-title">⏰ 延迟队列时间轴</div>
        <div class="timeline">
          <div class="timeline-now">
            <div class="now-marker">现在</div>
          </div>

          <div class="delayed-messages">
            <div
              v-for="msg in delayedMessages"
              :key="msg.id"
              class="delayed-msg"
              :style="{ left: msg.position + '%' }"
            >
              <div class="msg-bubble">
                <div class="msg-id">#{{ msg.id }}</div>
                <div class="msg-time">{{ msg.remaining }}s 后</div>
              </div>
              <div
                class="msg-timer"
                :style="{ height: msg.timerHeight + '%' }"
              ></div>
            </div>
          </div>

          <div class="timeline-scale">
            <div v-for="tick in timelineTicks" :key="tick" class="tick">
              <div class="tick-line"></div>
              <div class="tick-label">{{ tick }}s</div>
            </div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">📥 到期消息</div>
        <div class="result-box">
          <div v-if="deliveredMessages.length === 0" class="empty">
            等待消息到期...
          </div>
          <div
            v-for="msg in deliveredMessages"
            :key="msg.id"
            class="delivered-msg"
          >
            <div class="msg-header">
              <span class="msg-id">#{{ msg.id }}</span>
              <span class="msg-time">{{ msg.deliveredAt }}</span>
            </div>
            <div class="msg-content">{{ msg.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="use-cases">
      <div class="cases-title">💡 典型应用场景</div>
      <div class="cases-grid">
        <div class="case-card">
          <div class="case-icon">🛒</div>
          <div class="case-name">订单超时取消</div>
          <div class="case-desc">下单后 30 分钟未支付，自动取消订单</div>
        </div>
        <div class="case-card">
          <div class="case-icon">🔔</div>
          <div class="case-name">定时提醒</div>
          <div class="case-desc">会议开始前 15 分钟，发送提醒通知</div>
        </div>
        <div class="case-card">
          <div class="case-icon">🎁</div>
          <div class="case-name">会员过期提醒</div>
          <div class="case-desc">会员到期前 3 天，发送续费提醒</div>
        </div>
        <div class="case-card">
          <div class="case-icon">📊</div>
          <div class="case-name">数据统计</div>
          <div class="case-desc">每天凌晨 2 点，统计前一天的日报数据</div>
        </div>
      </div>
    </div>

    <div class="implementation">
      <div class="impl-title">🔧 实现方式对比</div>
      <div class="impl-table">
        <table>
          <thead>
            <tr>
              <th>方式</th>
              <th>优点</th>
              <th>缺点</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RocketMQ 延迟消息</td>
              <td>原生支持，精度高</td>
              <td>只能固定延迟级别</td>
              <td>电商、金融</td>
            </tr>
            <tr>
              <td>RabbitMQ TTL + DLQ</td>
              <td>灵活，可精确控制</td>
              <td>实现复杂</td>
              <td>传统业务</td>
            </tr>
            <tr>
              <td>Redis + 定时扫描</td>
              <td>简单，易于理解</td>
              <td>精度依赖扫描间隔</td>
              <td>小规模应用</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const selectedScenario = ref('order')
const sending = ref(false)
const delaySeconds = ref(30)
const customDelay = ref(30)
const delayedMessages = ref([])
const deliveredMessages = ref([])
let messageId = 0
let timer = null

const scenarios = [
  {
    id: 'order',
    icon: '🛒',
    name: '订单超时取消',
    description: '下单后 30 分钟未支付，自动取消订单'
  },
  {
    id: 'reminder',
    icon: '🔔',
    name: '定时提醒',
    description: '会议开始前 15 分钟，发送提醒通知'
  },
  {
    id: 'vip',
    icon: '🎁',
    name: '会员过期',
    description: '会员到期前 3 天，发送续费提醒'
  }
]

const delayPresets = [
  { label: '10秒', value: 10 },
  { label: '30秒', value: 30 },
  { label: '1分钟', value: 60 },
  { label: '5分钟', value: 300 }
]

const currentScenario = computed(() => {
  return scenarios.find((s) => s.id === selectedScenario.value) || scenarios[0]
})

const timelineTicks = computed(() => {
  const max = Math.max(...delayPresets.map((p) => p.value))
  const ticks = []
  for (let i = 10; i <= max; i += 10) {
    ticks.push(i)
  }
  return ticks
})

const selectScenario = (id) => {
  selectedScenario.value = id
}

const sendDelayedMessage = () => {
  if (sending.value) return

  sending.value = true
  messageId++

  const totalSeconds = delaySeconds.value
  const now = new Date()

  delayedMessages.value.push({
    id: messageId,
    remaining: totalSeconds,
    total: totalSeconds,
    position: 10,
    timerHeight: 100,
    scenario: currentScenario.value
  })

  setTimeout(() => {
    sending.value = false
  }, 500)
}

const updateTimers = () => {
  const now = new Date()

  delayedMessages.value.forEach((msg, index) => {
    msg.remaining--

    // 更新位置和高度
    const maxTime = Math.max(...delayPresets.map((p) => p.value))
    msg.position = 10 + ((msg.total - msg.remaining) / msg.total) * 80
    msg.timerHeight = (msg.remaining / msg.total) * 100

    if (msg.remaining <= 0) {
      // 消息到期
      delayedMessages.value.splice(index, 1)

      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

      deliveredMessages.value.unshift({
        id: msg.id,
        content: `${msg.scenario.name} - 消息已触发`,
        deliveredAt: timeStr
      })

      if (deliveredMessages.value.length > 5) {
        deliveredMessages.value.pop()
      }
    }
  })
}

timer = setInterval(updateTimers, 1000)

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.delayed-message-demo {
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

.scenarios {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.6rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.demo-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.sender-section,
.timeline-section,
.result-section {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.scenario-info {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.scenario-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.scenario-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.delay-setting {
  margin-bottom: 1rem;
}

.delay-setting > label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.delay-presets {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.preset-btn {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand);
}

.preset-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.delay-custom {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.delay-custom input {
  width: 80px;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
}

.send-btn {
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

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.timeline {
  position: relative;
  height: 150px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.timeline-now {
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-brand);
}

.now-marker {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  white-space: nowrap;
}

.delayed-messages {
  position: relative;
  height: 100%;
}

.delayed-msg {
  position: absolute;
  top: 10px;
  transform: translateX(-50%);
  transition: left 1s linear;
}

.msg-bubble {
  background: white;
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.msg-id {
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.msg-time {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.msg-timer {
  width: 3px;
  background: linear-gradient(180deg, var(--vp-c-brand), transparent);
  margin: 0.5rem auto 0;
  border-radius: 2px;
  transition: height 1s linear;
}

.timeline-scale {
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.tick {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tick-line {
  width: 1px;
  height: 10px;
  background: var(--vp-c-divider);
}

.tick-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
}

.result-box {
  max-height: 250px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  padding: 1.5rem;
}

.delivered-msg {
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.3s ease;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
}

.msg-header .msg-id {
  font-weight: 600;
}

.msg-time {
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
}

.msg-content {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.use-cases {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.cases-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.case-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
}

.case-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.case-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.case-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.implementation {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.impl-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.impl-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th,
td {
  padding: 0.6rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
