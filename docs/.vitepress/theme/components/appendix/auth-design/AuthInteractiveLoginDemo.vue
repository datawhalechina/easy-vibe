<!--
  AuthInteractiveLoginDemo.vue
  交互式登录流程演示

  用途：
  通过模拟真实的登录流程，让用户直观理解认证和授权的概念。

  互动功能：
  - 模拟登录：输入用户名密码，看到完整的认证流程
  - 可视化数据流：HTTP 请求和响应的实时展示
  - 两种模式对比：Session vs JWT
-->
<template>
  <div class="auth-interactive-login">
    <div class="header">
      <div class="title">
        🔐 认证流程演示
      </div>
      <div class="subtitle">
        模拟登录过程，理解认证与授权的区别
      </div>
    </div>

    <!-- 模式切换 -->
    <div class="mode-selector">
      <div class="mode-label">
        选择鉴权方式：
      </div>
      <div class="mode-buttons">
        <button
          class="mode-btn"
          :class="{ active: mode === 'session' }"
          @click="switchMode('session')"
        >
          🍪 Session + Cookie
        </button>
        <button
          class="mode-btn"
          :class="{ active: mode === 'jwt' }"
          @click="switchMode('jwt')"
        >
          🎫 JWT Token
        </button>
      </div>
    </div>

    <div class="main-content">
      <!-- 登录表单 -->
      <div class="login-section">
        <div class="form-container">
          <div class="form-title">
            登录表单
          </div>
          <div class="form-fields">
            <div class="field-group">
              <label>用户名</label>
              <input
                v-model="username"
                type="text"
                placeholder="输入用户名"
                :disabled="locked"
              >
            </div>
            <div class="field-group">
              <label>密码</label>
              <input
                v-model="password"
                type="password"
                placeholder="输入密码"
                :disabled="locked"
                @keyup.enter="startDemo"
              >
            </div>
            <button
              class="login-btn"
              :disabled="!username || !password || locked"
              @click="startDemo"
            >
              开始演示
            </button>
          </div>

          <div class="hints">
            <div class="hint-title">
              💡 提示
            </div>
            <div class="hint-text">
              试试用户名 <code>admin</code>，密码 <code>123456</code>
            </div>
          </div>

          <div
            v-if="flowStep > 0"
            class="stepper"
          >
            <div class="stepper-title">
              当前步骤：{{ flowStep }} / {{ maxStep }}
              <span class="stepper-hint">（手动推进，避免“自动下一步”误解）</span>
            </div>
            <div class="stepper-actions">
              <button
                class="step-btn"
                :disabled="flowStep <= 1"
                @click="prevStep"
              >
                上一步
              </button>
              <button
                class="step-btn primary"
                :disabled="flowStep >= maxStep"
                @click="nextStep"
              >
                下一步
              </button>
              <button
                class="step-btn"
                @click="resetDemo"
              >
                重置
              </button>
            </div>
          </div>
        </div>

        <!-- 实时数据流 -->
        <div class="data-flow">
          <div class="flow-title">
            📊 数据流可视化
          </div>

          <!-- 请求阶段 -->
          <div
            v-if="currentStage >= 1"
            class="flow-stage request-stage"
          >
            <div class="stage-header">
              <span class="stage-badge">{{
                currentStage === 1 ? '📤' : '✅'
              }}</span>
              <span class="stage-name">1. 客户端发送登录请求</span>
            </div>
            <div
              v-if="currentStage >= 1"
              class="request-content"
            >
              <div class="request-line">
                <span class="method">POST</span>
                <span class="path">/api/login</span>
              </div>
              <div class="request-body">
                <div class="body-title">
                  Body:
                </div>
                <pre>
{
  "username": "{{ username }}",
  "password": "******"
}</pre>
              </div>
            </div>
          </div>

          <div
            v-if="currentStage >= 1"
            class="flow-arrow"
          >
            ⬇️
          </div>

          <!-- 服务器验证阶段 -->
          <div
            v-if="currentStage >= 2"
            class="flow-stage server-stage"
          >
            <div class="stage-header">
              <span class="stage-badge">{{
                currentStage === 2 ? '⚙️' : '✅'
              }}</span>
              <span class="stage-name">2. 服务器验证身份</span>
            </div>
            <div
              v-if="currentStage >= 2"
              class="server-content"
            >
              <div class="verification-steps">
                <div
                  class="verify-step"
                  :class="{ success: verificationStep >= 1 }"
                >
                  <span class="step-icon">{{
                    verificationStep >= 1 ? '✅' : '⏳'
                  }}</span>
                  <span class="step-text">查询用户数据库</span>
                </div>
                <div
                  class="verify-step"
                  :class="{ success: verificationStep >= 2 }"
                >
                  <span class="step-icon">{{
                    verificationStep >= 2 ? '✅' : '⏳'
                  }}</span>
                  <span class="step-text">验证密码哈希</span>
                </div>
                <div
                  class="verify-step"
                  :class="{ success: verificationStep >= 3 }"
                >
                  <span class="step-icon">{{
                    verificationStep >= 3 ? '✅' : '⏳'
                  }}</span>
                  <span class="step-text">生成{{
                    mode === 'session' ? 'Session' : 'JWT Token'
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="currentStage >= 2"
            class="flow-arrow"
          >
            ⬇️
          </div>

          <!-- 响应阶段 -->
          <div
            v-if="currentStage >= 3"
            class="flow-stage response-stage"
          >
            <div class="stage-header">
              <span class="stage-badge">{{
                currentStage === 3 ? '📥' : '✅'
              }}</span>
              <span class="stage-name">3. 服务器返回认证结果</span>
            </div>
            <div
              v-if="authResult"
              class="response-content"
            >
              <div class="response-status success">
                ✅ 登录成功
              </div>
              <div class="response-body">
                <div class="body-title">
                  Response:
                </div>
                <pre v-if="mode === 'session'">
{
  "status": "success",
  "user": {
    "id": 123,
    "username": "{{ username }}"
  }
}</pre>
                <pre v-else>
{
  "status": "success",
  "token": "{{ authResult?.token }}",
  "user": {
    "id": 123,
    "username": "{{ username }}"
  }
}</pre>
              </div>
              <div
                v-if="currentStage >= 4"
                class="auth-mechanism"
              >
                <div class="mechanism-title">
                  {{ mode === 'session' ? '🍪 Cookie 设置' : '🎫 Token 存储' }}
                </div>
                <div class="mechanism-content">
                  <div v-if="mode === 'session'">
                    <code>Set-Cookie: session_id={{ authResult?.sessionId }};
                      HttpOnly; Secure</code>
                  </div>
                  <div v-else>
                    <code>localStorage.setItem("token", "{{
                      authResult?.token
                    }}")</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 后续请求 -->
          <div
            v-if="currentStage >= 5"
            class="flow-stage request-stage"
          >
            <div class="stage-header">
              <span class="stage-badge">🔄</span>
              <span class="stage-name">4. 后续请求自动携带认证信息</span>
            </div>
            <div class="subsequent-request">
              <div class="request-line">
                <span class="method">GET</span>
                <span class="path">/api/user/profile</span>
              </div>
              <div class="auth-header">
                <div class="header-title">
                  Header:
                </div>
                <div v-if="mode === 'session'">
                  <code>Cookie: session_id={{ authResult?.sessionId }}</code>
                </div>
                <div v-else>
                  <code>Authorization: Bearer {{ authResult?.token }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 状态说明 -->
    <div
      v-if="currentStage >= 4"
      class="state-description"
    >
      <div class="description-title">
        📖 {{ mode === 'session' ? 'Session' : 'JWT' }} 工作原理
      </div>
      <div class="description-content">
        <p v-if="mode === 'session'">
          <strong>Session 模式：</strong>服务器在内存或 Redis 中创建一个
          Session，存储用户信息。 服务器返回一个
          <code>session_id</code> 给客户端，客户端后续请求会自动在 Cookie
          中携带这个 ID。 服务器根据 ID 查找对应的 Session，从而识别用户身份。
        </p>
        <p v-else>
          <strong>JWT 模式：</strong>服务器将用户信息编码成 JWT
          Token，直接返回给客户端。 客户端将 Token 存储在
          localStorage，后续请求在 <code>Authorization</code> Header 中携带。
          服务器验证 Token 的签名即可识别用户，无需存储状态。
        </p>
      </div>
    </div>

    <!-- 重置按钮 -->
    <div
      v-if="currentStage >= 5"
      class="reset-section"
    >
      <button
        class="reset-btn"
        @click="resetDemo"
      >
        🔄 重新演示
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const mode = ref('session') // 'session' or 'jwt'
const username = ref('')
const password = ref('')
const flowStep = ref(0) // 0 = not started, 1..maxStep = manual steps
const authResult = ref(null)
const locked = ref(false)

const maxStep = 7

const currentStage = computed(() => {
  if (flowStep.value === 0) return 0
  if (flowStep.value === 1) return 1
  if (flowStep.value >= 2 && flowStep.value <= 4) return 2
  if (flowStep.value === 5) return 3
  if (flowStep.value === 6) return 4
  return 5
})

const verificationStep = computed(() => {
  if (flowStep.value < 2) return 0
  if (flowStep.value === 2) return 1
  if (flowStep.value === 3) return 2
  return 3
})

const switchMode = (newMode) => {
  mode.value = newMode
  resetDemo()
}

const buildAuthResult = () => {
  if (mode.value === 'session') {
    return {
      sessionId: 'sess_' + Math.random().toString(36).substring(2, 15)
    }
  }

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      user_id: 123,
      username: username.value,
      exp: Math.floor(Date.now() / 1000) + 3600
    })
  )
  const signature = btoa(`${header}.${payload}.secret`)
  return {
    token: `${header}.${payload}.${signature}`.substring(0, 50) + '...'
  }
}

const startDemo = () => {
  if (!username.value || !password.value) return

  // Start at step 1 (request). Other steps are manual via Next.
  authResult.value = buildAuthResult()
  flowStep.value = 1
  locked.value = true
}

const nextStep = () => {
  flowStep.value = Math.min(maxStep, flowStep.value + 1)
}

const prevStep = () => {
  flowStep.value = Math.max(1, flowStep.value - 1)
}

const resetDemo = () => {
  username.value = ''
  password.value = ''
  flowStep.value = 0
  authResult.value = null
  locked.value = false
}
</script>

<style scoped>
.auth-interactive-login {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* 模式切换 */
.mode-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.mode-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.mode-buttons {
  display: flex;
  gap: 0.5rem;
}

.mode-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border-color: var(--vp-c-brand);
}

/* 主内容 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

/* 登录表单 */
.login-section {
  display: contents;
}

.form-container {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.stepper {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stepper-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stepper-hint {
  margin-left: 0.5rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.stepper-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.step-btn {
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
}

.step-btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-group label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.field-group input {
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.field-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.field-group input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-btn {
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hints {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 6px;
}

.hint-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
  color: var(--vp-c-brand);
}

.hint-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.hint-text code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

/* 数据流 */
.data-flow {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.flow-stage {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  animation: slideIn 0.4s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.stage-badge {
  font-size: 1.2rem;
}

.stage-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.request-line {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.method {
  font-weight: 700;
  color: #16a34a;
  font-family: 'Courier New', monospace;
}

.path {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
}

.request-body,
.response-body {
  background: #1e293b;
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.5rem;
}

.body-title,
.header-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.4rem;
}

.request-body pre,
.response-body pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #e2e8f0;
  line-height: 1.5;
}

/* 验证步骤 */
.verification-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.verify-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.verify-step.success {
  background: rgba(34, 197, 94, 0.1);
}

.step-icon {
  font-size: 1rem;
}

.step-text {
  flex: 1;
}

/* 响应 */
.response-status {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.response-status.success {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

/* 认证机制 */
.auth-mechanism {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 6px;
}

.mechanism-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.mechanism-content code {
  display: block;
  background: #1e293b;
  color: #e2e8f0;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  word-break: break-all;
}

/* 后续请求 */
.subsequent-request {
  margin-top: 0.5rem;
}

.auth-header {
  margin-top: 0.5rem;
}

.auth-header code {
  display: block;
  background: #1e293b;
  color: #e2e8f0;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  word-break: break-all;
}

.flow-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
}

/* 状态说明 */
.state-description {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.description-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.description-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.description-content code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

/* 重置 */
.reset-section {
  text-align: center;
}

.reset-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  background: #64748b;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #475569;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .mode-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .mode-buttons {
    width: 100%;
  }

  .mode-btn {
    flex: 1;
  }
}
</style>
