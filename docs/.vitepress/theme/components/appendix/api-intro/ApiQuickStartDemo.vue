<!--
  ApiQuickStartDemo.vue - 演示版
  目标：展示最简单的 API 调用流程
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">💡</span>
      <span class="title">试试看：获取一条技术格言</span>
    </div>
    
    <div class="content">
      <div class="action-area">
        <button class="call-btn" :disabled="calling" @click="callApi">
          <span v-if="!calling">📡 发起 API 请求</span>
          <span v-else>🔄 请求处理中...</span>
        </button>
      </div>

      <div class="result-area" v-if="result || calling">
        <div class="loading-dots" v-if="calling">
          <span>.</span><span>.</span><span>.</span>
        </div>
        <div class="response-card" v-else-if="result">
          <div class="response-header">
            <span class="status-badge success">200 OK</span>
            <span class="time">耗时: 230ms</span>
          </div>
          <div class="response-body">
            {{ result.data }}
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>👆 <strong>流程演示：</strong> 点击按钮 -> 发送请求 -> 服务器处理 -> 返回数据。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const calling = ref(false)
const result = ref(null)

const quotes = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Programs must be written for people to read, and only incidentally for machines to execute. — Abelson & Sussman",
  "Truth can only be found in one place: the code. — Robert C. Martin",
  "Simplicity is the soul of efficiency. — Austin Freeman",
  "Code is like humor. When you have to explain it, it’s bad. — Cory House"
]

function callApi() {
  calling.value = true
  result.value = null

  // 模拟 API 网络延迟
  setTimeout(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    result.value = {
      success: true,
      data: randomQuote
    }
    calling.value = false
  }, 800)
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 24px;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

.content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 160px;
  justify-content: center;
}

.call-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
}

.call-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px -1px rgba(59, 130, 246, 0.6);
}

.call-btn:disabled {
  opacity: 0.7;
  cursor: wait;
  transform: scale(0.98);
}

.result-area {
  width: 100%;
  max-width: 400px;
}

.response-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  animation: slideUp 0.3s ease-out;
}

.response-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.status-badge {
  background: #dcfce7;
  color: #166534;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.response-body {
  font-size: 15px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.loading-dots span {
  animation: blink 1.4s infinite both;
  font-size: 24px;
  margin: 0 2px;
}

.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

.footer {
  padding: 12px 20px;
  background: rgba(0,0,0,0.02);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: center;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blink {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}
</style>
