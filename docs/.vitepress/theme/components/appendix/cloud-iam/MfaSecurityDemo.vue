<template>
  <div class="mfa-security-demo">
    <div class="demo-header">
      <h4>MFA 多因素认证模拟</h4>
      <p class="intro-text">体验 MFA 双因素认证流程</p>
    </div>

    <div class="demo-content">
      <div class="mfa-flow">
        <div class="auth-step" :class="{ active: step >= 1, completed: step > 1 }">
          <div class="step-icon">🔐</div>
          <div class="step-label">密码验证</div>
        </div>
        <div class="step-arrow">→</div>
        <div class="auth-step" :class="{ active: step >= 2, completed: step > 2 }">
          <div class="step-icon">📱</div>
          <div class="step-label">MFA 验证</div>
        </div>
        <div class="step-arrow">→</div>
        <div class="auth-step" :class="{ active: step >= 3 }">
          <div class="step-icon">✅</div>
          <div class="step-label">登录成功</div>
        </div>
      </div>

      <div class="auth-panel" v-if="step === 1">
        <h5>请输入密码</h5>
        <input type="password" v-model="password" placeholder="输入密码" @keyup.enter="verifyPassword" />
        <button @click="verifyPassword" :disabled="!password">验证密码</button>
      </div>

      <div class="auth-panel" v-if="step === 2">
        <h5>MFA 验证</h5>
        <div class="totp-display">
          <span class="totp-code">{{ totpCode }}</span>
          <div class="totp-timer">
            <div class="timer-bar" :style="{ width: timerWidth + '%' }"></div>
          </div>
        </div>
        <input type="text" v-model="userCode" placeholder="输入6位验证码" maxlength="6" @keyup.enter="verifyMFA" />
        <button @click="verifyMFA" :disabled="userCode.length !== 6">验证</button>
      </div>

      <div class="success-message" v-if="step === 3">
        <div class="success-icon">🎉</div>
        <h5>登录成功！</h5>
        <p>已通过 MFA 双因素认证</p>
        <button @click="reset">重新演示</button>
      </div>
    </div>

    <div class="info-box">
      <strong>💡 MFA 安全价值：</strong>启用 MFA 可降低 99.9% 的账号被盗风险。即使密码泄露，攻击者没有你的 MFA 设备也无法登录。
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const step = ref(1)
const password = ref('')
const userCode = ref('')
const totpCode = ref('123456')
const timerWidth = ref(100)
let timerInterval = null

function generateTOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function startTimer() {
  timerWidth.value = 100
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timerWidth.value -= 1.67
    if (timerWidth.value <= 0) {
      totpCode.value = generateTOTP()
      timerWidth.value = 100
    }
  }, 100)
}

function verifyPassword() {
  if (password.value) {
    step.value = 2
    totpCode.value = generateTOTP()
    startTimer()
  }
}

function verifyMFA() {
  if (userCode.value.length === 6) {
    step.value = 3
    if (timerInterval) clearInterval(timerInterval)
  }
}

function reset() {
  step.value = 1
  password.value = ''
  userCode.value = ''
  if (timerInterval) clearInterval(timerInterval)
}

onMounted(() => {
  if (step.value === 2) startTimer()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.mfa-security-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.intro-text {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.demo-content {
  margin-bottom: 1rem;
}

.mfa-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.auth-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.2s ease;
}

.auth-step.active {
  opacity: 1;
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.auth-step.completed {
  opacity: 1;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  border-color: var(--vp-c-brand);
}

.step-icon {
  font-size: 2rem;
}

.step-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.auth-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
}

.auth-panel h5 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.auth-panel input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  margin-bottom: 0.75rem;
  box-sizing: border-box;
}

.auth-panel input::placeholder {
  color: var(--vp-c-text-3);
}

.auth-panel button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.auth-panel button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-panel button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.totp-display {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1rem;
}

.totp-code {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.totp-timer {
  height: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
}

.timer-bar {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.1s linear;
}

.success-message {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.25rem;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-message h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.success-message p {
  margin: 0 0 1.25rem 0;
  color: var(--vp-c-text-2);
}

.success-message button {
  padding: 0.75rem 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
}

.success-message button:hover {
  background: var(--vp-c-bg-alt);
  transform: translateY(-2px);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.info-box strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .mfa-flow {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }
}
</style>
