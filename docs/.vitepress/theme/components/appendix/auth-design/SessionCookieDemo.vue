<!--
  SessionCookieDemo.vue
  Session + Cookie 工作流程演示
-->
<template>
  <div class="session-cookie-demo">
    <div class="header">
      <div class="title">Session + Cookie 工作流程</div>
      <div class="subtitle">Web 开发的经典鉴权方案</div>
    </div>

    <div class="controls">
      <button
        class="action-btn login"
        @click="performLogin"
        :disabled="isLoggedIn"
      >
        <span class="btn-icon">🔑</span>
        <span class="btn-text">模拟登录</span>
      </button>
      <button
        class="action-btn request"
        @click="performRequest"
        :disabled="!isLoggedIn"
      >
        <span class="btn-icon">🌐</span>
        <span class="btn-text">发送请求</span>
      </button>
      <button
        class="action-btn logout"
        @click="performLogout"
        :disabled="!isLoggedIn"
      >
        <span class="btn-icon">🚪</span>
        <span class="btn-text">退出登录</span>
      </button>
    </div>

    <div class="visual-container">
      <div class="client-server">
        <div class="client">
          <div class="device-header">
            <span class="device-icon">💻</span>
            <span class="device-label">浏览器</span>
          </div>
          <div class="device-content">
            <div class="cookie-jar">
              <div class="jar-label">Cookie 存储</div>
              <div class="jar-content">
                <div v-if="sessionCookie" class="cookie-item">
                  <div class="cookie-key">session_id</div>
                  <div class="cookie-value">{{ sessionCookie }}</div>
                </div>
                <div v-else class="cookie-empty">暂无 Cookie</div>
              </div>
            </div>
            <div class="request-preview" v-if="currentRequest">
              <div class="preview-title">当前请求</div>
              <div class="preview-content">
                <div class="preview-line">{{ currentRequest }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="connection">
          <div class="connection-line" :class="{ active: isTransferring }">
            <div class="data-packet" v-if="isTransferring">
              {{ transferData }}
            </div>
          </div>
        </div>

        <div class="server">
          <div class="device-header">
            <span class="device-icon">🖥️</span>
            <span class="device-label">服务器</span>
          </div>
          <div class="device-content">
            <div class="session-storage">
              <div class="storage-label">Session 存储 (Redis/Memory)</div>
              <div class="storage-content">
                <div v-if="serverSession" class="session-item">
                  <div class="session-key">{{ sessionCookie }}</div>
                  <div class="session-data">
                    <div class="data-row">
                      <span class="data-key">user_id:</span>
                      <span class="data-value">{{
                        serverSession.user_id
                      }}</span>
                    </div>
                    <div class="data-row">
                      <span class="data-key">username:</span>
                      <span class="data-value">{{
                        serverSession.username
                      }}</span>
                    </div>
                    <div class="data-row">
                      <span class="data-key">role:</span>
                      <span class="data-value">{{ serverSession.role }}</span>
                    </div>
                  </div>
                </div>
                <div v-else class="session-empty">暂无 Session</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flow-steps" v-if="currentStep">
      <div class="steps-title">流程说明</div>
      <div class="steps-list">
        <div
          v-for="(step, index) in currentStep.steps"
          :key="index"
          class="step-item"
          :class="{ active: step.active }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">{{ step.text }}</div>
        </div>
      </div>
    </div>

    <div class="info-cards">
      <div class="info-card pros">
        <div class="card-icon">✅</div>
        <div class="card-title">优点</div>
        <ul class="card-list">
          <li>简单直观，易于理解</li>
          <li>服务端可以主动注销</li>
          <li>Session 信息存储在服务端，相对安全</li>
        </ul>
      </div>

      <div class="info-card cons">
        <div class="card-icon">⚠️</div>
        <div class="card-title">缺点</div>
        <ul class="card-list">
          <li>服务器有状态，需要存储 Session</li>
          <li>多台服务器需要共享 Session（如 Redis）</li>
          <li>跨域困难，Cookie 默认不能跨域</li>
          <li>容易受到 CSRF 攻击</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isLoggedIn = ref(false)
const isTransferring = ref(false)
const sessionCookie = ref('')
const serverSession = ref(null)
const currentRequest = ref('')
const transferData = ref('')
const currentStep = ref(null)

const steps = {
  login: {
    steps: [
      { text: '用户提交用户名密码', active: false },
      { text: '服务器验证身份', active: false },
      { text: '创建 Session 并存储用户信息', active: false },
      { text: '返回 Set-Cookie: session_id=xxx', active: false },
      { text: '浏览器保存 Cookie', active: false }
    ]
  },
  request: {
    steps: [
      { text: '浏览器自动带上 Cookie', active: false },
      { text: '服务器根据 session_id 查找 Session', active: false },
      { text: '找到 Session，验证通过', active: false },
      { text: '返回请求的数据', active: false }
    ]
  },
  logout: {
    steps: [
      { text: '用户点击退出', active: false },
      { text: '服务器删除 Session', active: false },
      { text: '清除浏览器 Cookie', active: false },
      { text: '退出成功', active: false }
    ]
  }
}

const performLogin = async () => {
  const sessionId = generateSessionId()
  const stepsData = steps.login

  for (let i = 0; i < stepsData.steps.length; i++) {
    stepsData.steps[i].active = true
    currentStep.value = stepsData

    if (i === 0) {
      currentRequest.value =
        'POST /login\n{ username: "alice", password: "***" }'
      transferData.value = '登录请求'
      isTransferring.value = true
      await delay(800)
    } else if (i === 2) {
      serverSession.value = {
        user_id: 123,
        username: 'alice',
        role: 'user'
      }
      await delay(600)
    } else if (i === 3) {
      transferData.value = 'Set-Cookie'
      isTransferring.value = true
      await delay(800)
      sessionCookie.value = sessionId
      isLoggedIn.value = true
    } else {
      await delay(500)
    }
  }

  isTransferring.value = false
  currentRequest.value = ''
  transferData.value = ''
}

const performRequest = async () => {
  const stepsData = steps.request

  for (let i = 0; i < stepsData.steps.length; i++) {
    stepsData.steps[i].active = true
    currentStep.value = stepsData

    if (i === 0) {
      currentRequest.value = `GET /api/user/profile\nCookie: session_id=${sessionCookie.value}`
      transferData.value = '请求 + Cookie'
      isTransferring.value = true
      await delay(800)
    } else if (i === 1) {
      isTransferring.value = false
      await delay(600)
    } else if (i === 3) {
      transferData.value = '响应数据'
      isTransferring.value = true
      await delay(800)
    } else {
      await delay(500)
    }
  }

  isTransferring.value = false
  currentRequest.value = ''
  transferData.value = ''
}

const performLogout = async () => {
  const stepsData = steps.logout

  for (let i = 0; i < stepsData.steps.length; i++) {
    stepsData.steps[i].active = true
    currentStep.value = stepsData

    if (i === 0) {
      currentRequest.value = 'POST /logout'
      transferData.value = '退出请求'
      isTransferring.value = true
      await delay(800)
    } else if (i === 1) {
      serverSession.value = null
      await delay(600)
    } else if (i === 2) {
      sessionCookie.value = ''
      isLoggedIn.value = false
      await delay(500)
    } else {
      await delay(400)
    }
  }

  isTransferring.value = false
  currentRequest.value = ''
  transferData.value = ''
}

const generateSessionId = () => {
  return 'sess_' + Math.random().toString(36).substring(2, 15)
}

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>

<style scoped>
.session-cookie-demo {
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
  min-width: 140px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
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

.action-btn.login {
  background: #22c55e;
  color: white;
}

.action-btn.login:hover:not(:disabled) {
  background: #16a34a;
}

.action-btn.request {
  background: #3b82f6;
  color: white;
}

.action-btn.request:hover:not(:disabled) {
  background: #2563eb;
}

.action-btn.logout {
  background: #ef4444;
  color: white;
}

.action-btn.logout:hover:not(:disabled) {
  background: #dc2626;
}

.btn-icon {
  font-size: 1.2rem;
}

.visual-container {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.client-server {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.client,
.server {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.device-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.device-icon {
  font-size: 1.5rem;
}

.device-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.device-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cookie-jar,
.session-storage {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.jar-label,
.storage-label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.jar-content,
.storage-content {
  min-height: 80px;
}

.cookie-item,
.session-item {
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.cookie-key {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.4rem;
}

.cookie-value {
  color: var(--vp-c-text-2);
  word-break: break-all;
}

.session-key {
  font-weight: 600;
  color: #8b5cf6;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.session-data {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.data-row {
  display: flex;
  gap: 0.5rem;
}

.data-key {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.data-value {
  color: var(--vp-c-text-2);
}

.cookie-empty,
.session-empty {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  padding: 1rem;
  font-style: italic;
}

.request-preview {
  background: #1e293b;
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.preview-title {
  font-weight: 600;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.preview-content {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #e2e8f0;
  line-height: 1.5;
}

.preview-line {
  white-space: pre-wrap;
  word-break: break-all;
}

.connection {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.connection-line {
  width: 100px;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.connection-line.active {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
}

.data-packet {
  position: absolute;
  background: white;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-brand);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.flow-steps {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
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
  gap: 0.5rem;
}

.step-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.step-item.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.info-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.card-list {
  margin: 0;
  padding-left: 1.25rem;
}

.card-list li {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.info-card.pros .card-list li {
  color: #16a34a;
}

.info-card.cons .card-list li {
  color: #dc2626;
}

@media (max-width: 768px) {
  .client-server {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .connection {
    display: none;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>
