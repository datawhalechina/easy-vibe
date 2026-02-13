<script setup>
import { ref } from 'vue'

const connected = ref(false)
const connecting = ref(false)
const currentStep = ref(0)
const commandHistory = ref([])
const currentCommand = ref('')

const steps = [
  { text: '正在连接服务器...', icon: '🔌' },
  { text: '身份验证中...', icon: '🔑' },
  { text: '建立安全通道...', icon: '🛡️' },
  { text: '连接成功！', icon: '✅' }
]

const connect = () => {
  if (connected.value || connecting.value) return

  connecting.value = true
  currentStep.value = 0
  commandHistory.value = []

  const interval = setInterval(() => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    } else {
      clearInterval(interval)
      connecting.value = false
      connected.value = true
      commandHistory.value.push({
        type: 'success',
        text: 'Welcome to Ubuntu 22.04 LTS'
      })
      commandHistory.value.push({
        type: 'info',
        text: 'Last login: ' + new Date().toLocaleString()
      })
    }
  }, 800)
}

const disconnect = () => {
  connected.value = false
  currentStep.value = 0
  commandHistory.value = []
}

const executeCommand = () => {
  if (!currentCommand.value.trim()) return

  commandHistory.value.push({
    type: 'command',
    text: `$ ${currentCommand.value}`
  })

  // 模拟命令响应
  setTimeout(() => {
    if (currentCommand.value === 'ls') {
      commandHistory.value.push({
        type: 'output',
        text: 'app.js  package.json  node_modules/  README.md'
      })
    } else if (currentCommand.value === 'pwd') {
      commandHistory.value.push({
        type: 'output',
        text: '/home/user/my-app'
      })
    } else if (currentCommand.value === 'whoami') {
      commandHistory.value.push({
        type: 'output',
        text: 'user'
      })
    } else {
      commandHistory.value.push({
        type: 'output',
        text: `Command '${currentCommand.value}' executed`
      })
    }
  }, 300)

  currentCommand.value = ''
}
</script>

<template>
  <div class="deployment-ssh">
    <div class="demo-header">
      <h3>SSH远程连接演示</h3>
      <p class="subtitle">像小明远程指挥咖啡店</p>
    </div>

    <div class="intro-text">
      <p>
        SSH就像小明通过<strong>电话远程指挥</strong>咖啡店员工工作，
        不需要亲自到店里，就能执行命令、查看状态、部署应用。
      </p>
    </div>

    <div class="demo-content">
      <!-- 连接控制 -->
      <div class="connection-panel">
        <div class="connection-info">
          <div class="info-item">
            <span class="label">服务器地址</span>
            <span class="value">192.168.1.100</span>
          </div>
          <div class="info-item">
            <span class="label">用户名</span>
            <span class="value">xiaoming</span>
          </div>
          <div class="info-item">
            <span class="label">状态</span>
            <span class="status" :class="{ connected, connecting }">
              {{ connecting ? '连接中...' : connected ? '已连接' : '未连接' }}
            </span>
          </div>
        </div>

        <button
          v-if="!connected && !connecting"
          @click="connect"
          class="btn primary"
        >
          🔗 连接服务器
        </button>
        <button
          v-else-if="connected"
          @click="disconnect"
          class="btn danger"
        >
          ❌ 断开连接
        </button>
        <button v-else class="btn" disabled>
          ⏳ 连接中...
        </button>
      </div>

      <!-- 连接进度 -->
      <div v-if="connecting || (connected && currentStep === steps.length - 1)" class="connection-progress">
        <div class="progress-steps">
          <div
            v-for="(step, idx) in steps"
            :key="idx"
            class="progress-step"
            :class="{ active: idx === currentStep, completed: idx < currentStep }"
          >
            <span class="step-icon">{{ step.icon }}</span>
            <span class="step-text">{{ step.text }}</span>
          </div>
        </div>
      </div>

      <!-- 终端模拟 -->
      <div v-if="connected" class="terminal">
        <div class="terminal-header">
          <span class="terminal-title">xiaoming@server ~</span>
          <div class="terminal-buttons">
            <span class="btn-dot red"></span>
            <span class="btn-dot yellow"></span>
            <span class="btn-dot green"></span>
          </div>
        </div>
        <div class="terminal-body">
          <div
            v-for="(cmd, idx) in commandHistory"
            :key="idx"
            class="terminal-line"
            :class="cmd.type"
          >
            {{ cmd.text }}
          </div>
          <div class="terminal-input-line">
            <span class="prompt">$</span>
            <input
              v-model="currentCommand"
              @keyup.enter="executeCommand"
              type="text"
              class="terminal-input"
              placeholder="输入命令 (try: ls, pwd, whoami)"
              autofocus
            />
          </div>
        </div>
      </div>

      <!-- 说明 -->
      <div v-if="!connected && !connecting" class="ssh-features">
        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-icon">🔐</div>
            <div class="feature-title">加密通信</div>
            <div class="feature-desc">所有数据加密传输，防止被窃听</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🎫</div>
            <div class="feature-title">身份验证</div>
            <div class="feature-desc">密码或密钥验证，确保只有授权用户访问</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <div class="feature-title">远程执行</div>
            <div class="feature-desc">像在本地一样操作远程服务器</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p v-if="!connected">
        💡 <strong>生活类比</strong>：SSH就像小明用专用电话打给咖啡店，只有知道号码（IP）和密码（密钥）的人才能指挥店里工作。
      </p>
      <p v-else>
        ✅ <strong>已连接</strong>：现在你可以像在本地一样操作远程服务器了！试试输入 <code>ls</code>、<code>pwd</code> 或 <code>whoami</code>。
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-ssh {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-height: 600px;
  overflow-y: auto;
  margin: 1rem 0;
}

.demo-header {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.intro-text {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.connection-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.connection-info {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.info-item .value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.status {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
}

.status.connected {
  background: var(--vp-c-brand-delta);
  color: white;
}

.status.connecting {
  background: var(--vp-c-brand);
  color: white;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn.primary:hover {
  background: var(--vp-c-brand-1);
}

.btn.danger {
  background: var(--vp-c-red);
  color: white;
}

.btn.danger:hover {
  background: #dc2626;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.connection-progress {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.progress-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 6px;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.progress-step.active {
  opacity: 1;
  background: var(--vp-c-brand-soft);
}

.progress-step.completed {
  opacity: 0.7;
}

.step-icon {
  font-size: 1.2rem;
}

.step-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.terminal {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.terminal-header {
  background: #2d2d2d;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #404040;
}

.terminal-title {
  font-size: 0.8rem;
  color: #b4b4b4;
  font-family: var(--vp-font-family-mono);
}

.terminal-buttons {
  display: flex;
  gap: 0.4rem;
}

.btn-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.btn-dot.red { background: #ff5f56; }
.btn-dot.yellow { background: #ffbd2e; }
.btn-dot.green { background: #27c93f; }

.terminal-body {
  padding: 1rem;
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}

.terminal-line {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.terminal-line.command {
  color: #4ec9b0;
}

.terminal-line.output {
  color: #d4d4d4;
}

.terminal-line.success {
  color: #4ec9b0;
}

.terminal-line.info {
  color: #9cdcfe;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt {
  color: #4ec9b0;
  font-weight: 600;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #d4d4d4;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}

.terminal-input::placeholder {
  color: #606060;
}

.ssh-features {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.feature-item {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.info-box {
  padding: 1rem 1.25rem;
  margin: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box p {
  margin: 0;
}

.info-box code {
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .connection-panel {
    flex-direction: column;
  }

  .connection-info {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }
}
</style>
