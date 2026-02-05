<template>
  <div class="mfa-security-demo">
    <div class="demo-header">
      <h4>MFA 多因素认证模拟</h4>
      <p class="demo-desc">体验 MFA 双因素认证流程</p>
    </div>

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

    <div class="security-tips">
      <h5>💡 MFA 安全提示</h5>
      <ul>
        <li>启用 MFA 可降低 99.9% 的账号被盗风险</li>
        <li>推荐使用 TOTP 应用（Google Authenticator、Microsoft Authenticator）</li>
        <li>硬件安全密钥（如 YubiKey）提供最高级别的安全性</li>
        <li>务必备份 MFA 恢复码，防止设备丢失无法登录</li>
      </ul>
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
}

.demo-desc {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.mfa-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.auth-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.auth-step.active {
  opacity: 1;
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.5);
}

.auth-step.completed {
  opacity: 1;
  background: rgba(76, 175, 80, 0.3);
}

.step-icon {
  font-size: 2rem;
}

.step-label {
  font-size: 0.8rem;
  font-weight: 500;
}

.step-arrow {
  font-size: 1.5rem;
  opacity: 0.6;
}

.auth-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.auth-panel h5 {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
}

.auth-panel input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 1rem;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.auth-panel input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.auth-panel button {
  width: 100%;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-panel button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-panel button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

.totp-display {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
}

.totp-code {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: monospace;
  letter-spacing: 0.2em;
  margin-bottom: 8px;
}

.totp-timer {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.timer-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
  transition: width 0.1s linear;
}

.success-message {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.5);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.success-message h5 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
}

.success-message p {
  margin: 0 0 20px 0;
  opacity: 0.8;
}

.success-message button {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.success-message button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.security-tips {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
}

.security-tips h5 {
  margin: 0 0 12px 0;
  font-size: 1rem;
}

.security-tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.security-tips li {
  padding: 6px 0;
  font-size: 0.85rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .mfa-flow {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }

  .lifecycle-container {
    grid-template-columns: 1fr;
  }
}
</style>
