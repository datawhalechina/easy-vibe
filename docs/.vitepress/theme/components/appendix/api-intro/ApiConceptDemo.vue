<!--
  ApiConceptDemo.vue
  目标：直观演示 API 的基本要素：地址 + 参数
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🔧</span>
      <span class="title">互动演示：调用 API 需要什么？</span>
    </div>

    <div class="content">
      <div class="step">
        <div class="step-header">
          <span class="step-num">1</span>
          <span class="step-title">地址 (Endpoint) - 告诉服务器你要找谁</span>
        </div>
        <div class="step-body">
          <div class="url-bar">
            <span class="url">https://api.example.com</span>
            <input
              v-model="endpoint"
              type="text"
              class="endpoint-input"
              placeholder="/users"
            />
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-header">
          <span class="step-num">2</span>
          <span class="step-title">参数 (Params) - 告诉服务器你要什么</span>
        </div>
        <div class="step-body">
          <div class="params-box">
            <div class="params-row">
              <span class="param-label">页码：</span>
              <input v-model.number="page" type="number" class="param-input" min="1" />
            </div>
            <div class="params-row">
              <span class="param-label">每页数量：</span>
              <input v-model.number="limit" type="number" class="param-input small" min="1" max="100" />
            </div>
          </div>
        </div>
      </div>

      <button class="send-btn" @click="sendRequest" :disabled="loading">
        {{ loading ? '发送中...' : '🚀 发送请求' }}
      </button>

      <div class="response" v-if="response">
        <div class="response-header">
          <span class="status-badge" :class="response.status >= 200 && response.status < 300 ? 'success' : 'error'">
            {{ response.status }} {{ response.statusText }}
          </span>
          <span class="response-time">耗时: {{ response.time }}ms</span>
        </div>
        <pre class="response-body">{{ JSON.stringify(response.data, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const endpoint = ref('/users')
const page = ref(1)
const limit = ref(5)
const loading = ref(false)
const response = ref(null)

function sendRequest() {
  loading.value = true
  response.value = null

  setTimeout(() => {
    const startTime = Date.now()

    if (endpoint.value === '/users') {
      // 限制最多返回3条，避免结果太长
      const actualLimit = Math.min(limit.value, 3)
      const users = []
      for (let i = 1; i <= actualLimit; i++) {
        users.push({
          id: i,
          name: `用户${(page.value - 1) * limit.value + i}`,
          age: 20 + i
        })
      }

      response.value = {
        status: 200,
        statusText: 'OK',
        time: Date.now() - startTime,
        data: { 
          users, 
          total: 100, 
          page: page.value, 
          limit: limit.value,
          note: limit.value > 3 ? `仅显示前3条，共${limit.value}条` : null
        }
      }
    } else {
      response.value = {
        status: 404,
        statusText: 'Not Found',
        time: Date.now() - startTime,
        data: { error: '找不到这个接口' }
      }
    }

    loading.value = false
  }, 300 + Math.random() * 200)
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.step-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.step-body {
  padding: 14px;
}

.url-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1e293b;
  padding: 10px 12px;
  border-radius: 6px;
}

.url {
  color: #94a3b8;
  font-size: 13px;
}

.endpoint-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #60a5fa;
  font-family: monospace;
  font-size: 14px;
  outline: none;
}

.params-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.params-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.param-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  min-width: 70px;
}

.param-input {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.param-input.small {
  width: 60px;
}

.send-btn {
  padding: 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.response {
  margin-top: 8px;
  animation: fadeIn 0.3s ease;
}

.response-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.success {
  background: #dcfce7;
  color: #166534;
}

.status-badge.error {
  background: #fee2e2;
  color: #991b1b;
}

.response-time {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.response-body {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 200px;
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
