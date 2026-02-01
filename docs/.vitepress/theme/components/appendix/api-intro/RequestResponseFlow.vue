<!--
  RequestResponseFlow.vue - 简化版
  目标：用简单的动画展示请求-响应流程
-->
<template>
  <div class="demo">
    <div class="title">🔄 一次 API 调用的流程</div>
    <p class="subtitle">点一下按钮，看请求怎么飞过去再飞回来</p>

    <div class="flow-container">
      <div class="side you">
        <div class="window">
          <div class="window-header">👤 你这边</div>
          <div class="window-body">
            <div class="message">我想调用 API</div>
          </div>
        </div>
      </div>

      <div class="middle">
        <div class="arrow" :class="{ animating: isAnimating }">➔</div>
        <button class="send-btn" :disabled="isAnimating" @click="send">
          {{ isAnimating ? '发送中...' : '🚀 发送请求' }}
        </button>
      </div>

      <div class="side server">
        <div class="window">
          <div class="window-header">🖥️ 对方服务器</div>
          <div class="window-body">
            <div class="message">{{ serverMessage }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="result" v-if="result">
      <div class="result-box" :class="result.type">
        {{ result.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isAnimating = ref(false)
const serverMessage = ref('等待请求...')
const result = ref(null)

function send() {
  isAnimating.value = true
  serverMessage.value = '收到请求，处理中...'
  result.value = null

  // 模拟请求流程
  setTimeout(() => {
    serverMessage.value = '处理完成！'
    result.value = {
      type: 'success',
      text: '✅ 请求成功！服务器返回了数据'
    }
    isAnimating.value = false
  }, 1500)
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.side {
  flex: 1;
}

.window {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.window-header {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  font-weight: bold;
  font-size: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
}

.window-body {
  padding: 20px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message {
  font-size: 14px;
  color: var(--vp-c-text-1);
  text-align: center;
}

.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.arrow {
  font-size: 32px;
  color: var(--vp-c-brand-1);
  transition: transform 0.3s;
}

.arrow.animating {
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.send-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result {
  margin-top: 16px;
}

.result-box {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.result-box.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.result-box.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

@media (max-width: 720px) {
  .flow-container {
    flex-direction: column;
  }

  .middle {
    flex-direction: row;
  }
}
</style>
