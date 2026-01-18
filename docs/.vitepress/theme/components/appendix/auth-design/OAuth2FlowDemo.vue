<!--
  OAuth2FlowDemo.vue
  OAuth 2.0 授权流程演示
-->
<template>
  <div class="oauth2-flow-demo">
    <div class="header">
      <div class="title">OAuth 2.0 授权码流程</div>
      <div class="subtitle">第三方登录（如微信登录）的完整流程</div>
    </div>

    <div class="controls">
      <button
        class="action-btn"
        @click="startFlow"
        :disabled="isProcessing || currentStep > 0"
      >
        <span class="btn-icon">🚀</span>
        <span class="btn-text">开始授权流程</span>
      </button>
      <button
        class="action-btn"
        @click="nextStep"
        :disabled="isProcessing || currentStep === 0 || currentStep >= maxSteps"
      >
        <span class="btn-icon">➡️</span>
        <span class="btn-text">下一步</span>
      </button>
      <button
        class="action-btn reset"
        @click="resetFlow"
        :disabled="isProcessing"
      >
        <span class="btn-icon">🔄</span>
        <span class="btn-text">重置</span>
      </button>
    </div>

    <div class="flow-visualization">
      <div class="actors">
        <div class="actor user" :class="{ active: isUserActive }">
          <div class="actor-icon">👤</div>
          <div class="actor-label">用户</div>
        </div>

        <div class="actor client" :class="{ active: isClientActive }">
          <div class="actor-icon">🌐</div>
          <div class="actor-label">第三方应用</div>
        </div>

        <div class="actor auth-server" :class="{ active: isAuthServerActive }">
          <div class="actor-icon">🔐</div>
          <div class="actor-label">授权服务器</div>
          <div class="actor-sub">微信/Google</div>
        </div>

        <div
          class="actor resource-server"
          :class="{ active: isResourceServerActive }"
        >
          <div class="actor-icon">📊</div>
          <div class="actor-label">资源服务器</div>
          <div class="actor-sub">用户信息 API</div>
        </div>
      </div>

      <div class="current-action" v-if="currentAction">
        <div class="action-icon">{{ currentAction.icon }}</div>
        <div class="action-text">{{ currentAction.text }}</div>
        <div class="action-detail" v-if="currentAction.detail">
          {{ currentAction.detail }}
        </div>
      </div>

      <div class="data-exchange" v-if="currentDataExchange">
        <div class="exchange-title">数据交换</div>
        <div class="exchange-content">
          <div
            class="exchange-item"
            v-for="(item, index) in currentDataExchange"
            :key="index"
          >
            <span class="exchange-label">{{ item.label }}:</span>
            <span class="exchange-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flow-steps">
      <div class="steps-title">流程步骤</div>
      <div class="steps-list">
        <div
          v-for="(step, index) in flowSteps"
          :key="index"
          class="step-item"
          :class="{
            active: currentStep === index + 1,
            completed: currentStep > index + 1,
            current: currentStep === index + 1
          }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="security-notes">
      <div class="notes-title">安全要点</div>
      <div class="notes-list">
        <div class="note-item">
          <div class="note-icon">🔒</div>
          <div class="note-content">
            <div class="note-title">code 只能用一次</div>
            <div class="note-text">授权码使用后立即失效，防止截获重放</div>
          </div>
        </div>
        <div class="note-item">
          <div class="note-icon">🎲</div>
          <div class="note-content">
            <div class="note-title">state 防 CSRF</div>
            <div class="note-text">
              生成随机字符串，回调时验证，防止恶意网站伪造
            </div>
          </div>
        </div>
        <div class="note-item">
          <div class="note-icon">🔗</div>
          <div class="note-content">
            <div class="note-title">redirect_uri 必须匹配</div>
            <div class="note-text">提前在授权服务器注册，防止重定向攻击</div>
          </div>
        </div>
      </div>
    </div>

    <div class="participants-table">
      <div class="table-title">OAuth 2.0 核心角色</div>
      <table>
        <thead>
          <tr>
            <th>角色</th>
            <th>说明</th>
            <th>例子</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Resource Owner</strong></td>
            <td>资源所有者（用户）</td>
            <td>你</td>
          </tr>
          <tr>
            <td><strong>Client</strong></td>
            <td>第三方应用</td>
            <td>某个网站</td>
          </tr>
          <tr>
            <td><strong>Authorization Server</strong></td>
            <td>授权服务器</td>
            <td>微信、Google</td>
          </tr>
          <tr>
            <td><strong>Resource Server</strong></td>
            <td>资源服务器</td>
            <td>微信的用户信息 API</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const isProcessing = ref(false)
const maxSteps = 5

const currentAction = ref(null)
const currentDataExchange = ref(null)

const flowSteps = [
  {
    title: '用户点击"使用微信登录"',
    desc: '第三方应用重定向到微信授权页面'
  },
  {
    title: '用户扫码并同意授权',
    desc: '微信重定向回第三方应用，携带授权码 code'
  },
  {
    title: '后端用 code 换取 access_token',
    desc: '第三方应用后端调用微信 API，使用 code 换取 token'
  },
  {
    title: '用 access_token 获取用户信息',
    desc: '调用微信用户信息 API，获取用户数据'
  },
  {
    title: '创建或更新本地用户',
    desc: '第三方应用创建本地用户，生成本系统的 JWT'
  }
]

const stepActions = {
  1: {
    icon: '👆',
    text: '用户点击授权按钮',
    detail: '重定向到微信授权页面',
    dataExchange: [
      { label: 'URL', value: 'open.weixin.qq.com/connect/qrconnect' },
      { label: 'appid', value: 'wx1234567890' },
      { label: 'redirect_uri', value: 'https://yourapp.com/callback' },
      { label: 'response_type', value: 'code' },
      { label: 'state', value: 'random_state_string' }
    ],
    activeActors: ['client', 'auth-server']
  },
  2: {
    icon: '✅',
    text: '用户同意授权',
    detail: '微信重定向回第三方应用',
    dataExchange: [
      { label: 'Callback URL', value: 'https://yourapp.com/callback' },
      { label: 'code', value: 'AUTHORIZATION_CODE' },
      { label: 'state', value: 'random_state_string' }
    ],
    activeActors: ['user', 'auth-server', 'client']
  },
  3: {
    icon: '🔄',
    text: '后端交换 Token',
    detail: '使用 code 换取 access_token',
    dataExchange: [
      { label: 'POST', value: 'api.weixin.qq.com/sns/oauth2/access_token' },
      { label: 'appid', value: 'wx1234567890' },
      { label: 'secret', value: '***' },
      { label: 'code', value: 'AUTHORIZATION_CODE' },
      { label: 'grant_type', value: 'authorization_code' }
    ],
    activeActors: ['client', 'auth-server']
  },
  4: {
    icon: '📊',
    text: '获取用户信息',
    detail: '使用 access_token 调用用户信息 API',
    dataExchange: [
      { label: 'GET', value: 'api.weixin.qq.com/sns/userinfo' },
      { label: 'access_token', value: 'ACCESS_TOKEN' },
      { label: 'openid', value: 'USER_OPENID' },
      { label: '返回', value: '{ nickname, headimgurl, ... }' }
    ],
    activeActors: ['client', 'resource-server']
  },
  5: {
    icon: '🎉',
    text: '创建本地用户',
    detail: '生成第三方应用的 JWT Token',
    dataExchange: [
      { label: '操作', value: '创建或更新本地用户' },
      { label: '生成', value: '本地 JWT Token' },
      { label: '返回', value: '{ token, user_info }' }
    ],
    activeActors: ['client']
  }
}

const isUserActive = computed(() =>
  stepActions[currentStep.value]?.activeActors.includes('user')
)
const isClientActive = computed(() =>
  stepActions[currentStep.value]?.activeActors.includes('client')
)
const isAuthServerActive = computed(() =>
  stepActions[currentStep.value]?.activeActors.includes('auth-server')
)
const isResourceServerActive = computed(() =>
  stepActions[currentStep.value]?.activeActors.includes('resource-server')
)

const startFlow = async () => {
  isProcessing.value = true
  currentStep.value = 1
  await executeStep(1)
  isProcessing.value = false
}

const nextStep = async () => {
  if (currentStep.value >= maxSteps) return

  isProcessing.value = true
  currentStep.value++
  await executeStep(currentStep.value)
  isProcessing.value = false
}

const executeStep = async (step) => {
  const action = stepActions[step]
  currentAction.value = {
    icon: action.icon,
    text: action.text,
    detail: action.detail
  }
  currentDataExchange.value = action.dataExchange

  await delay(1500)
}

const resetFlow = () => {
  currentStep.value = 0
  currentAction.value = null
  currentDataExchange.value = null
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.oauth2-flow-demo {
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
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn:hover:not(:disabled) {
  background: #2563eb;
}

.action-btn.reset {
  background: #64748b;
}

.action-btn.reset:hover:not(:disabled) {
  background: #475569;
}

.btn-icon {
  font-size: 1.2rem;
}

.flow-visualization {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.actors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  opacity: 0.5;
}

.actor.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.05);
}

.actor-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.actor-label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.actor-sub {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.current-action {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid var(--vp-c-brand);
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.action-text {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.action-detail {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.data-exchange {
  background: #1e293b;
  border-radius: 8px;
  padding: 1rem;
}

.exchange-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.75rem;
}

.exchange-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exchange-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
}

.exchange-label {
  color: #94a3b8;
  min-width: 120px;
}

.exchange-value {
  color: #e2e8f0;
  word-break: break-all;
}

.flow-steps {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.steps-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.step-item.completed {
  opacity: 0.6;
}

.step-item.current {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.security-notes {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.notes-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
}

.note-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.note-content {
  flex: 1;
}

.note-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.note-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.participants-table {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.85rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

tbody td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

tbody tr:last-child td {
  border-bottom: none;
}

@media (max-width: 768px) {
  .actors {
    grid-template-columns: repeat(2, 1fr);
  }

  .exchange-item {
    flex-direction: column;
    gap: 0.25rem;
  }

  .exchange-label {
    min-width: auto;
  }
}
</style>
