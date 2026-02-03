<!--
  HttpExchangeDemo.vue
  HTTP请求响应演示 - 快递员送达对话类比

  用途：
  用"快递员和收件人对话"的生活化比喻，让用户理解HTTP请求和响应的过程。
  把枯燥的HTTP协议变成直观的对话场景。
-->
<template>
  <div class="delivery-dialog-demo">
    <!-- 标题 -->
    <div class="dialog-header">
      <span class="dialog-icon">[送达]</span>
      <span class="dialog-title">送达对话：请求与响应</span>
    </div>

    <!-- 场景选择 -->
    <div class="scenario-selector">
      <div class="selector-label">选择送达场景：</div>
      <div class="scenario-buttons">
        <button
          v-for="scene in scenarios"
          :key="scene.id"
          @click="selectScenario(scene)"
          class="scenario-btn"
          :class="{ active: currentScenario?.id === scene.id }"
          :disabled="isDelivering"
        >
          <span class="btn-text">{{ scene.name }}</span>
        </button>
      </div>
    </div>

    <!-- 对话场景 -->
    <div class="dialog-scene" v-if="currentScenario">
      <div class="scene-background">
        <!-- 快递员（请求方） -->
        <div class="character courier">
          <div class="char-avatar">送</div>
          <div class="char-name">快递员（浏览器）</div>
        </div>

        <!-- 对话区域 -->
        <div class="conversation-area">
          <!-- 请求消息 -->
          <div class="message request" :class="{ sent: step >= 1 }">
            <div class="message-bubble">
              <div class="bubble-header">
                <span class="method-badge" :class="currentScenario.method.toLowerCase()">
                  {{ currentScenario.method }}
                </span>
                <span class="path-text">{{ currentScenario.path }}</span>
              </div>
              <div class="bubble-body">{{ currentScenario.requestText }}</div>
            </div>
            <div class="message-meta">请求</div>
          </div>

          <!-- 传输动画 -->
          <div class="transit-animation" v-if="step === 2">
            <div class="transit-line"></div>
            <div class="transit-package">包</div>
          </div>

          <!-- 响应消息 -->
          <div class="message response" :class="{ sent: step >= 3 }">
            <div class="message-meta">响应</div>
            <div class="message-bubble" :class="currentScenario.statusType">
              <div class="bubble-header">
                <span class="status-badge" :class="currentScenario.statusType">
                  {{ currentScenario.status }}
                </span>
                <span class="status-text">{{ currentScenario.statusText }}</span>
              </div>
              <div class="bubble-body">{{ currentScenario.responseText }}</div>
            </div>
          </div>
        </div>

        <!-- 收件人（响应方） -->
        <div class="character recipient">
          <div class="char-avatar">收</div>
          <div class="char-name">收件人（服务器）</div>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="dialog-controls">
      <button
        class="control-btn primary"
        @click="nextStep"
        :disabled="isDelivering || step >= 3"
      >
        {{ step === 0 ? '[开始]' : step === 3 ? '对话完成' : '[下一步]' }}
      </button>
      <button class="control-btn" @click="reset" v-if="step > 0">
        [重置]
      </button>
    </div>

    <!-- 状态码说明 -->
    <div class="status-legend">
      <div class="legend-title">[对照] HTTP状态码速查：</div>
      <div class="legend-grid">
        <div class="legend-item success">
          <span class="status-dot"></span>
          <span class="status-code">2xx</span>
          <span class="status-meaning">成功送达</span>
        </div>
        <div class="legend-item redirect">
          <span class="status-dot"></span>
          <span class="status-code">3xx</span>
          <span class="status-meaning">地址变更</span>
        </div>
        <div class="legend-item client-error">
          <span class="status-dot"></span>
          <span class="status-code">4xx</span>
          <span class="status-meaning">请求有误</span>
        </div>
        <div class="legend-item server-error">
          <span class="status-dot"></span>
          <span class="status-code">5xx</span>
          <span class="status-meaning">服务器问题</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scenarios = [
  {
    id: 'success',
    name: '正常送达',
    method: 'GET',
    path: '/index.html',
    requestText: '您好，这是您的包裹，请签收！',
    status: '200',
    statusText: 'OK',
    statusType: 'success',
    responseText: '好的，收到了，谢谢！'
  },
  {
    id: 'notfound',
    name: '地址错误',
    method: 'GET',
    path: '/nopage',
    requestText: '您好，送包裹到这个地方。',
    status: '404',
    statusText: 'Not Found',
    statusType: 'client-error',
    responseText: '这里没有这个人，您送错地方了。'
  },
  {
    id: 'redirect',
    name: '地址变更',
    method: 'GET',
    path: '/old-address',
    requestText: '您好，送包裹到这个地址。',
    status: '301',
    statusText: 'Moved',
    statusType: 'redirect',
    responseText: '这里搬走了，请送到新地址。'
  },
  {
    id: 'error',
    name: '家中故障',
    method: 'POST',
    path: '/api/order',
    requestText: '您好，我来送您订购的商品。',
    status: '500',
    statusText: 'Error',
    statusType: 'server-error',
    responseText: '抱歉，我们家系统出问题了，暂时无法接收。'
  }
]

const currentScenario = ref(scenarios[0])
const step = ref(0)
const isDelivering = ref(false)

const selectScenario = (scenario) => {
  currentScenario.value = scenario
  reset()
}

const nextStep = () => {
  if (step.value < 3) {
    isDelivering.value = true
    step.value++

    if (step.value === 2) {
      setTimeout(() => {
        step.value++
        isDelivering.value = false
      }, 1000)
    } else {
      isDelivering.value = false
    }
  }
}

const reset = () => {
  step.value = 0
  isDelivering.value = false
}
</script>

<style scoped>
.delivery-dialog-demo {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 头部 */
.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.dialog-icon {
  font-size: 14px;
  color: var(--vp-c-brand);
  font-weight: 600;
}
.dialog-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* 场景选择 */
.scenario-selector {
  margin-bottom: 20px;
}
.selector-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}
.scenario-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.scenario-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
.scenario-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}
.scenario-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}
.scenario-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-text { font-size: 13px; }

/* 对话场景 */
.dialog-scene {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}
.scene-background {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 角色 */
.character {
  text-align: center;
  flex-shrink: 0;
}
.char-avatar {
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
.courier .char-avatar {
  background: linear-gradient(135deg, #409eff, #67c23a);
}
.recipient .char-avatar {
  background: linear-gradient(135deg, #e6a23c, #f56c6c);
}
.char-name {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

/* 对话区域 */
.conversation-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0.3;
  transform: translateY(10px);
  transition: all 0.4s;
}
.message.sent {
  opacity: 1;
  transform: translateY(0);
}
.message.request {
  justify-content: flex-end;
}
.message.response {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 280px;
  padding: 14px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
}
.message.request .message-bubble {
  background: #409eff;
  border-color: #409eff;
  color: white;
}
.message.response .message-bubble.success {
  background: #67c23a;
  border-color: #67c23a;
  color: white;
}
.message.response .message-bubble.redirect {
  background: #e6a23c;
  border-color: #e6a23c;
  color: white;
}
.message.response .message-bubble.client-error {
  background: #f56c6c;
  border-color: #f56c6c;
  color: white;
}
.message.response .message-bubble.server-error {
  background: #909399;
  border-color: #909399;
  color: white;
}

.bubble-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.method-badge, .status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  font-family: monospace;
  background: rgba(255,255,255,0.2);
}
.path-text, .status-text {
  font-size: 12px;
  opacity: 0.9;
}
.bubble-body {
  font-size: 13px;
  line-height: 1.5;
}

.message-meta {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

/* 传输动画 */
.transit-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
}
.transit-line {
  width: 100%;
  height: 2px;
  background: var(--vp-c-divider);
}
.transit-package {
  position: absolute;
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-brand);
  animation: deliver 1s ease-in-out;
}

@keyframes deliver {
  0% { transform: translateX(-100px); }
  50% { transform: translateX(0) scale(1.2); }
  100% { transform: translateX(100px); }
}

/* 控制按钮 */
.dialog-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}
.control-btn {
  padding: 12px 24px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}
.control-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.control-btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}
.control-btn.primary:hover:not(:disabled) {
  background: #66b1ff;
}

/* 状态码说明 */
.status-legend {
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 12px;
}
.legend-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}
.legend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.legend-item.success .status-dot { background: #67c23a; }
.legend-item.redirect .status-dot { background: #e6a23c; }
.legend-item.client-error .status-dot { background: #f56c6c; }
.legend-item.server-error .status-dot { background: #909399; }
.status-code {
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.status-meaning {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .scene-background {
    flex-direction: column;
  }
  .character {
    order: -1;
  }
  .legend-grid {
    grid-template-columns: 1fr;
  }
}
</style>
