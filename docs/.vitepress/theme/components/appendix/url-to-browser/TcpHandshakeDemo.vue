<!--
  TcpHandshakeDemo.vue
  TCP三次握手演示 - 打电话确认类比

  用途：
  用"打电话确认对方是否在家"的生活化比喻，让用户理解TCP三次握手的必要性。
  把枯燥的技术概念变成直观的对话过程。
-->
<template>
  <div class="phone-call-demo">
    <!-- 标题 -->
    <div class="call-header">
      <span class="call-icon">[电话]</span>
      <span class="call-title">打电话确认：建立可靠连接</span>
    </div>

    <!-- 场景说明 -->
    <div class="scenario-box">
      <div class="scenario-text">
        快递员到了<strong>"{{ targetAddress }}"</strong>附近，但他需要确认收件人是否在家，才能确保包裹能成功送达。
      </div>
    </div>

    <!-- 模式切换 -->
    <div class="mode-toggle">
      <button
        v-for="mode in modes"
        :key="mode.id"
        @click="currentMode = mode.id"
        class="mode-btn"
        :class="{ active: currentMode === mode.id }"
      >
        {{ mode.label }}
      </button>
    </div>

    <!-- 通话可视化 -->
    <div class="call-visualization">
      <!-- 左侧：快递员（客户端） -->
      <div class="caller-side">
        <div class="avatar-box client">
          <div class="avatar">员</div>
          <div class="avatar-label">快递员（你的电脑）</div>
        </div>
        <div class="speech-bubble client" v-if="currentStep >= 1">
          <div class="bubble-content">
            {{ currentMode === 'simple' ? '喂，在家吗？我是快递员！' : 'SYN: 请求连接' }}
          </div>
          <div class="bubble-arrow"></div>
        </div>
      </div>

      <!-- 中间：信号传输 -->
      <div class="signal-area">
        <div class="signal-line">
          <div
            v-for="(signal, i) in signals"
            :key="i"
            class="signal-dot"
            :class="[signal.type, { active: currentStep >= signal.step }]"
          >
            {{ signal.icon }}
          </div>
        </div>
        <div class="connection-status" v-if="currentStep > 0">
          <span class="status-text" :class="{ connected: currentStep >= 3 }">
            {{ currentStep >= 3 ? '[已接通]' : '[连接中...]' }}
          </span>
        </div>
      </div>

      <!-- 右侧：收件人（服务器） -->
      <div class="receiver-side">
        <div class="speech-bubble server" v-if="currentStep >= 2">
          <div class="bubble-arrow"></div>
          <div class="bubble-content">
            {{ currentMode === 'simple' ? '在的！我听到了，请说！' : 'SYN-ACK: 确认收到' }}
          </div>
        </div>
        <div class="avatar-box server">
          <div class="avatar">主</div>
          <div class="avatar-label">收件人（服务器）</div>
        </div>
        <div class="speech-bubble server final" v-if="currentStep >= 3">
          <div class="bubble-arrow"></div>
          <div class="bubble-content">
            {{ currentMode === 'simple' ? '好的，开始说吧！' : 'ACK: 确认连接' }}
          </div>
        </div>
      </div>
    </div>

    <!-- 步骤说明 -->
    <div class="steps-explanation">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-card"
        :class="{ active: currentStep === index + 1, completed: currentStep > index + 1 }"
        @click="goToStep(index + 1)"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ currentMode === 'simple' ? step.simpleTitle : step.techTitle }}</div>
          <div class="step-desc">{{ currentMode === 'simple' ? step.simpleDesc : step.techDesc }}</div>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="control-panel">
      <button class="ctrl-btn" @click="prevStep" :disabled="currentStep <= 0">
        [上一步]
      </button>
      <button
        class="ctrl-btn primary"
        @click="nextStep"
        :disabled="currentStep >= 3"
      >
        {{ currentStep >= 3 ? '已接通' : '[下一步]' }}
      </button>
      <button class="ctrl-btn" @click="reset">
        [重置]
      </button>
    </div>

    <!-- 为什么是三次？ -->
    <div class="why-three-box" v-if="currentStep >= 3">
      <div class="why-icon">[提示]</div>
      <div class="why-content">
        <strong>为什么是三次，不是两次？</strong>
        <p>两次对话只能确认"你能发、对方能收"，但对方不知道他的回复你有没有收到。三次对话确保<strong>双方都能发、双方都能收</strong>，通信才是可靠的。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentMode = ref('simple')
const currentStep = ref(0)
const targetAddress = ref('北京市朝阳区XX小区')

const modes = [
  { id: 'simple', label: '生活语言' },
  { id: 'tech', label: '技术术语' }
]

const steps = [
  {
    simpleTitle: '快递员：喂，在家吗？',
    simpleDesc: '快递员拨通电话，确认对方是否在家',
    techTitle: '客户端发送 SYN',
    techDesc: 'Synchronize: 请求建立连接，携带初始序列号'
  },
  {
    simpleTitle: '收件人：在的，请说！',
    simpleDesc: '收件人确认在家，也表示可以接收包裹',
    techTitle: '服务器回复 SYN-ACK',
    techDesc: 'Synchronize-Acknowledge: 确认收到，也请求连接'
  },
  {
    simpleTitle: '快递员：好的，开始送！',
    simpleDesc: '快递员确认对方已准备好，开始运送',
    techTitle: '客户端回复 ACK',
    techDesc: 'Acknowledge: 确认收到，连接建立成功'
  }
]

const signals = [
  { type: 'syn', step: 1, icon: '发' },
  { type: 'synack', step: 2, icon: '收' },
  { type: 'ack', step: 3, icon: '通' }
]

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const goToStep = (step) => {
  currentStep.value = step
}

const reset = () => {
  currentStep.value = 0
}
</script>

<style scoped>
.phone-call-demo {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 头部 */
.call-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.call-icon {
  font-size: 14px;
  color: var(--vp-c-brand);
  font-weight: 600;
}
.call-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* 场景 */
.scenario-box {
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(103, 194, 58, 0.1));
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
.scenario-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
.scenario-text strong {
  color: var(--vp-c-brand);
}

/* 模式切换 */
.mode-toggle {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}
.mode-btn {
  padding: 8px 20px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}
.mode-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.mode-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

/* 通话可视化 */
.call-visualization {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  margin-bottom: 20px;
}

.caller-side, .receiver-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.avatar-box {
  text-align: center;
}
.avatar-box.client .avatar {
  background: linear-gradient(135deg, #409eff, #67c23a);
}
.avatar-box.server .avatar {
  background: linear-gradient(135deg, #e6a23c, #f56c6c);
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.avatar-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.speech-bubble {
  position: relative;
  max-width: 160px;
}
.speech-bubble.client {
  align-self: flex-end;
}
.speech-bubble.server {
  align-self: flex-start;
}
.bubble-content {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.5;
}
.speech-bubble.client .bubble-content {
  background: #409eff;
  color: white;
  border-bottom-right-radius: 4px;
}
.speech-bubble.server .bubble-content {
  background: #67c23a;
  color: white;
  border-bottom-left-radius: 4px;
}

/* 信号区域 */
.signal-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.signal-line {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.signal-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
  opacity: 0.2;
  transform: scale(0.8);
  transition: all 0.4s;
}
.signal-dot.active {
  opacity: 1;
  transform: scale(1);
  animation: pulseSignal 1s infinite;
}
.signal-dot.syn { background: #409eff; }
.signal-dot.synack { background: #67c23a; }
.signal-dot.ack { background: #e6a23c; }

@keyframes pulseSignal {
  0%, 100% { box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(64, 158, 255, 0); }
}

.connection-status {
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
}
.status-text {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.status-text.connected {
  color: #67c23a;
  font-weight: 600;
}

/* 步骤说明 */
.steps-explanation {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.step-card {
  flex: 1;
  padding: 14px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.5;
}
.step-card:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}
.step-card.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  background: rgba(64, 158, 255, 0.05);
}
.step-card.completed {
  opacity: 0.8;
  border-color: #67c23a;
}
.step-number {
  width: 28px;
  height: 28px;
  background: var(--vp-c-divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 10px;
}
.step-card.active .step-number {
  background: var(--vp-c-brand);
  color: white;
}
.step-card.completed .step-number {
  background: #67c23a;
  color: white;
}
.step-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}
.step-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

/* 控制面板 */
.control-panel {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}
.ctrl-btn {
  padding: 10px 20px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}
.ctrl-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.ctrl-btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}
.ctrl-btn.primary:hover:not(:disabled) {
  background: #66b1ff;
}

/* 为什么是三次 */
.why-three-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(103, 194, 58, 0.1), rgba(64, 158, 255, 0.1));
  border-radius: 12px;
  border-left: 4px solid #67c23a;
  animation: slideIn 0.4s ease;
}
.why-icon {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
}
.why-content {
  flex: 1;
}
.why-content strong {
  font-size: 14px;
  color: var(--vp-c-text-1);
}
.why-content p {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
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

@media (max-width: 640px) {
  .call-visualization {
    flex-direction: column;
  }
  .signal-area {
    flex-direction: row;
    order: -1;
  }
  .signal-line {
    flex-direction: row;
  }
  .steps-explanation {
    flex-direction: column;
  }
}
</style>
