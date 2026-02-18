<!--
  CouplingDemo.vue
  系统解耦演示 - 同步 vs 异步对比
-->
<template>
  <div class="coupling-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">系统解耦</span>
      <span class="subtitle">从紧耦合到松耦合</span>
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

    <div class="demo-content">
      <!-- 紧耦合模式 -->
      <div
        v-if="!useAsync"
        class="synchronous-mode"
      >
        <div class="scenario">
          <div class="scenario-title">
            ❌ 紧耦合问题
          </div>
          <div class="flow-diagram">
            <div class="service-box order">
              <div class="service-name">
                订单服务
              </div>
              <div class="service-desc">
                创建订单
              </div>
            </div>

            <div class="arrows">
              <div
                v-for="call in syncCalls"
                :key="call.id"
                class="sync-call"
                :class="{ active: call.active }"
              >
                <div class="call-line" />
                <div class="call-label">
                  {{ call.service }}
                </div>
                <div
                  v-if="call.active"
                  class="call-status"
                >
                  {{ call.status }}
                </div>
              </div>
            </div>

            <div
              class="service-box notification"
              :class="{ failed: notificationFailed }"
            >
              <div class="service-name">
                通知服务
              </div>
              <div class="service-desc">
                发送短信/邮件
              </div>
              <div
                v-if="notificationFailed"
                class="error-msg"
              >
                服务宕机 ❌
              </div>
            </div>
          </div>

          <div class="problem-list">
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>依赖性强：</strong>通知服务宕机,订单创建失败</span>
            </div>
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>响应慢：</strong>总耗时 = 300ms + 500ms + 400ms =
                1200ms</span>
            </div>
            <div class="problem-item">
              <span class="icon">⚠️</span>
              <span><strong>扩展难：</strong>增加新服务需要修改订单代码</span>
            </div>
          </div>

          <button
            class="test-btn fail"
            @click="testSyncCall"
          >
            模拟通知服务故障
          </button>
        </div>
      </div>

      <!-- 松耦合模式 -->
      <div
        v-else
        class="asynchronous-mode"
      >
        <div class="scenario">
          <div class="scenario-title">
            ✅ 松耦合优势
          </div>
          <div class="flow-diagram">
            <div class="service-box order">
              <div class="service-name">
                订单服务
              </div>
              <div class="service-desc">
                创建订单 + 发送消息
              </div>
            </div>

            <div class="mq-bridge">
              <div class="mq-box">
                <div class="mq-icon">
                  📨
                </div>
                <div class="mq-label">
                  消息队列
                </div>
                <div
                  v-if="messageInQueue"
                  class="msg-indicator"
                >
                  消息已发送
                </div>
              </div>
              <div class="flow-arrow">
                →
              </div>
            </div>

            <div class="consumers-group">
              <div
                class="consumer-box"
                :class="{ failed: consumerFailed }"
              >
                <div class="consumer-name">
                  短信服务
                </div>
                <div class="consumer-status">
                  {{ consumerFailed ? '离线(不影响订单)' : '运行中' }}
                </div>
              </div>
              <div class="consumer-box">
                <div class="consumer-name">
                  邮件服务
                </div>
                <div class="consumer-status">
                  运行中
                </div>
              </div>
              <div class="consumer-box">
                <div class="consumer-name">
                  积分服务
                </div>
                <div class="consumer-status">
                  运行中
                </div>
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
              <span><strong>响应快：</strong>订单服务只耗时 50ms(发送消息)</span>
            </div>
            <div class="benefit-item">
              <span class="icon">✅</span>
              <span><strong>易扩展：</strong>增加新消费者无需修改订单代码</span>
            </div>
          </div>

          <button
            class="test-btn success"
            @click="testAsyncCall"
          >
            发送订单消息
          </button>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想:</strong>同步调用强依赖、响应慢;异步消息解耦、响应快、易扩展
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
  { id: 3, service: '调用通知服务', active: false, status: '失败!订单回滚' }
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
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.mode-switch {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.demo-content {
  margin-bottom: 0.75rem;
}

.scenario-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.service-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  min-width: 140px;
  transition: all 0.3s;
}

.service-box.failed {
  border-color: var(--vp-c-danger);
  background: var(--vp-c-danger-soft);
}

.service-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.service-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.error-msg {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-danger);
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.arrows {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 250px;
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
  background: var(--vp-c-danger-soft);
}

.call-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
}

.sync-call.active .call-line {
  background: var(--vp-c-danger);
}

.call-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  flex: 1;
}

.call-status {
  font-size: 0.7rem;
  color: var(--vp-c-danger);
  font-weight: 600;
}

.mq-bridge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mq-box {
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  min-width: 120px;
}

.mq-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.mq-label {
  font-weight: 600;
  font-size: 0.85rem;
}

.msg-indicator {
  margin-top: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-success);
  color: white;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.flow-arrow {
  font-size: 1.25rem;
  color: var(--vp-c-brand);
}

.consumers-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
}

.consumer-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
  transition: all 0.3s;
}

.consumer-box.failed {
  border-color: var(--vp-c-warning);
  background: var(--vp-c-warning-soft);
}

.consumer-name {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.consumer-status {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.problem-list,
.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.problem-item,
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.4;
}

.problem-item {
  background: var(--vp-c-danger-soft);
}

.benefit-item {
  background: var(--vp-c-success-soft);
}

.icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.test-btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.test-btn.fail {
  background: var(--vp-c-danger);
  color: white;
}

.test-btn.fail:hover {
  opacity: 0.9;
}

.test-btn.success {
  background: var(--vp-c-success);
  color: white;
}

.test-btn.success:hover {
  opacity: 0.9;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}
</style>
