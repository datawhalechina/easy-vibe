<!--
  CouplingDemo.vue
  系统解耦演示 - 同步 vs 异步对比
-->
<template>
  <div class="coupling-demo">
    <div class="header">
      <div class="title">系统解耦：从紧耦合到松耦合</div>
      <div class="subtitle">观察同步调用与异步消息的区别</div>
    </div>

    <div class="mode-switch">
      <button
        class="mode-btn"
        :class="{ active: !useAsync }"
        @click="useAsync = false"
      >
        🔗 紧耦合 (同步)
      </button>
      <button
        class="mode-btn"
        :class="{ active: useAsync }"
        @click="useAsync = true"
      >
        🔓 松耦合 (异步)
      </button>
    </div>

    <div class="demo-container">
      <!-- 紧耦合模式 -->
      <div v-if="!useAsync" class="synchronous-mode">
        <div class="scenario">
          <div class="scenario-title">❌ 紧耦合问题</div>
          <div class="flow-diagram">
            <div class="service-box order">
              <div class="service-name">订单服务</div>
              <div class="service-desc">创建订单</div>
            </div>

            <div class="arrows">
              <div
                v-for="call in syncCalls"
                :key="call.id"
                class="sync-call"
                :class="{ active: call.active }"
              >
                <div class="call-line"></div>
                <div class="call-label">{{ call.service }}</div>
                <div v-if="call.active" class="call-status">
                  {{ call.status }}
                </div>
              </div>
            </div>

            <div
              class="service-box notification"
              :class="{ failed: notificationFailed }"
            >
              <div class="service-name">通知服务</div>
              <div class="service-desc">发送短信/邮件</div>
              <div v-if="notificationFailed" class="error-msg">服务宕机 ❌</div>
            </div>
          </div>

          <div class="problem-list">
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>依赖性强：</strong>通知服务宕机，订单创建失败</span>
            </div>
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span
                ><strong>响应慢：</strong>总耗时 = 300ms + 500ms + 400ms =
                1200ms</span
              >
            </div>
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>扩展难：</strong>增加新服务需要修改订单代码</span>
            </div>
          </div>

          <button class="test-btn fail" @click="testSyncCall">
            模拟通知服务故障
          </button>
        </div>
      </div>

      <!-- 松耦合模式 -->
      <div v-else class="asynchronous-mode">
        <div class="scenario">
          <div class="scenario-title">✅ 松耦合优势</div>
          <div class="flow-diagram">
            <div class="service-box order">
              <div class="service-name">订单服务</div>
              <div class="service-desc">创建订单 + 发送消息</div>
            </div>

            <div class="mq-bridge">
              <div class="mq-box">
                <div class="mq-icon">📨</div>
                <div class="mq-label">消息队列</div>
                <div v-if="messageInQueue" class="msg-indicator">
                  消息已发送
                </div>
              </div>
              <div class="flow-arrow">→</div>
            </div>

            <div class="consumers-group">
              <div class="consumer-box" :class="{ failed: consumerFailed }">
                <div class="consumer-name">短信服务</div>
                <div class="consumer-status">
                  {{ consumerFailed ? '离线（不影响订单）' : '运行中' }}
                </div>
              </div>
              <div class="consumer-box">
                <div class="consumer-name">邮件服务</div>
                <div class="consumer-status">运行中</div>
              </div>
              <div class="consumer-box">
                <div class="consumer-name">积分服务</div>
                <div class="consumer-status">运行中</div>
              </div>
              <div class="consumer-box new">
                <div class="consumer-name">数据分析</div>
                <div class="consumer-status">新增 ✨</div>
              </div>
            </div>
          </div>

          <div class="benefit-list">
            <div class="benefit-item">
              <span class="icon">✅</span>
              <span><strong>独立运行：</strong>通知服务宕机不影响订单创建</span>
            </div>
            <div class="benefit-item">
              <span class="icon">✅</span>
              <span
                ><strong>响应快：</strong>订单服务只耗时 50ms（发送消息）</span
              >
            </div>
            <div class="benefit-item">
              <span class="icon">✅</span>
              <span><strong>易扩展：</strong>增加新消费者无需修改订单代码</span>
            </div>
          </div>

          <button class="test-btn success" @click="testAsyncCall">
            发送订单消息
          </button>
        </div>
      </div>
    </div>

    <div class="comparison-summary">
      <div class="summary-title">📊 对比总结</div>
      <div class="summary-table">
        <table>
          <thead>
            <tr>
              <th>维度</th>
              <th>紧耦合 (同步)</th>
              <th>松耦合 (异步)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>服务依赖</td>
              <td class="bad">强依赖，一个挂全挂</td>
              <td class="good">弱依赖，独立运行</td>
            </tr>
            <tr>
              <td>响应时间</td>
              <td class="bad">1200ms（串行执行）</td>
              <td class="good">50ms（只发消息）</td>
            </tr>
            <tr>
              <td>扩展性</td>
              <td class="bad">修改订单服务代码</td>
              <td class="good">增加新消费者即可</td>
            </tr>
            <tr>
              <td>可用性</td>
              <td class="bad">90%（任一服务故障）</td>
              <td class="good">99.9%（独立故障域）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const useAsync = ref(false)
const notificationFailed = ref(false)
const consumerFailed = ref(false)
const messageInQueue = ref(false)

const syncCalls = ref([
  { id: 1, service: '调用库存服务', active: false, status: '处理中...' },
  { id: 2, service: '调用积分服务', active: false, status: '处理中...' },
  { id: 3, service: '调用通知服务', active: false, status: '失败！订单回滚' }
])

const testSyncCall = () => {
  notificationFailed.value = true

  syncCalls.value.forEach((call, index) => {
    setTimeout(() => {
      call.active = true
      if (index === syncCalls.value.length - 1) {
        setTimeout(() => {
          call.active = false
        }, 2000)
      }
    }, index * 800)
  })
}

const testAsyncCall = () => {
  messageInQueue.value = true
  setTimeout(() => {
    messageInQueue.value = false
  }, 2000)
}
</script>

<style scoped>
.coupling-demo {
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

.mode-switch {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

.demo-container {
  margin-bottom: 1.5rem;
}

.scenario-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 10px;
  margin-bottom: 1rem;
}

.service-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  min-width: 180px;
  transition: all 0.3s;
}

.service-box.failed {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.service-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.service-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.error-msg {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: #ef4444;
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.arrows {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 300px;
}

.sync-call {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s;
}

.sync-call.active {
  background: rgba(239, 68, 68, 0.1);
}

.call-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
}

.sync-call.active .call-line {
  background: #ef4444;
}

.call-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  flex: 1;
}

.call-status {
  font-size: 0.75rem;
  color: #ef4444;
  font-weight: 600;
}

.mq-bridge {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mq-box {
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid var(--vp-c-brand);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  min-width: 140px;
}

.mq-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.mq-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.msg-indicator {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: #dcfce7;
  color: #166534;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.consumers-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
  width: 100%;
  max-width: 500px;
}

.consumer-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s;
}

.consumer-box.failed {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.consumer-box.new {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.consumer-name {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.consumer-status {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.problem-list,
.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.problem-item,
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.problem-item {
  background: rgba(239, 68, 68, 0.1);
}

.benefit-item {
  background: rgba(34, 197, 94, 0.1);
}

.icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.test-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.test-btn.fail {
  background: #ef4444;
  color: white;
}

.test-btn.fail:hover {
  background: #dc2626;
}

.test-btn.success {
  background: #22c55e;
  color: white;
}

.test-btn.success:hover {
  background: #16a34a;
}

.comparison-summary {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.summary-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.summary-table {
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
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.bad {
  color: #ef4444;
}

.good {
  color: #16a34a;
}
</style>
