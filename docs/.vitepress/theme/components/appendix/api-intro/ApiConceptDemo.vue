<!--
  ApiConceptDemo.vue - 紧凑版
  目标：直观演示 API 的基本要素：地址 + 参数
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">🔧</span>
      <span class="title">调用 API 需要什么？</span>
    </div>

    <div class="demo-layout">
      <div class="left-panel">
        <div class="step">
          <div class="step-header">
            <span class="step-num">1</span>
            <span class="step-title">地址 (Endpoint)</span>
          </div>
          <div class="url-bar">
            <span class="url-base">https://api.example.com</span>
            <input
              v-model="endpoint"
              type="text"
              class="endpoint-input"
              placeholder="/users"
            />
          </div>
        </div>

        <div class="step">
          <div class="step-header">
            <span class="step-num">2</span>
            <span class="step-title">参数 (Params)</span>
          </div>
          <div class="params-row">
            <label>页码:</label>
            <input
              v-model.number="page"
              type="number"
              class="param-input"
              min="1"
            />
            <label>每页:</label>
            <input
              v-model.number="limit"
              type="number"
              class="param-input"
              min="1"
              max="100"
            />
          </div>
        </div>

        <button class="send-btn" :disabled="loading" @click="sendRequest">
          {{ loading ? '发送中...' : '🚀 发送请求' }}
        </button>
      </div>

      <div class="right-panel">
        <div class="response-header">
          <span
            v-if="response"
            class="status-badge"
            :class="
              response.status >= 200 && response.status < 300
                ? 'success'
                : 'error'
            "
          >
            {{ response.status }} {{ response.statusText }}
          </span>
          <span v-else class="status-badge pending">等待请求</span>
        </div>
        <div v-if="response" class="response-body">
          <pre>{{ JSON.stringify(response.data, null, 2) }}</pre>
        </div>
        <div v-else class="response-empty">点击发送按钮查看结果</div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span
        >无论哪种 API，结构都一样：地址（找谁）+ 参数（要什么）=
        响应（得到什么）。</span
      >
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
    if (endpoint.value === '/users') {
      const actualLimit = Math.min(limit.value, 3)
      const users = []
      for (let i = 1; i <= actualLimit; i++) {
        users.push({
          id: i,
          name: `用户${(page.value - 1) * limit.value + i}`
        })
      }
      response.value = {
        status: 200,
        statusText: 'OK',
        data: { users, total: 100, page: page.value }
      }
    } else {
      response.value = {
        status: 404,
        statusText: 'Not Found',
        data: { error: '找不到这个接口' }
      }
    }
    loading.value = false
  }, 300)
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.demo-header {
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-layout {
  display: flex;
}

.left-panel {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid var(--vp-c-divider);
}

.right-panel {
  width: 220px;
  padding: 12px;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .left-panel {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .right-panel {
    width: 100%;
  }
}

.step {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.step-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

.step-title {
  font-size: 0.8rem;
  font-weight: 600;
}

.url-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #1e293b;
  padding: 8px 10px;
  border-radius: 0 0 6px 6px;
}

.url-base {
  color: #94a3b8;
  font-size: 0.7rem;
  white-space: nowrap;
}

.endpoint-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #60a5fa;
  font-family: monospace;
  font-size: 0.8rem;
  outline: none;
}

.params-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 0 0 6px 6px;
}

.params-row label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.param-input {
  width: 50px;
  padding: 4px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
}

.send-btn {
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.response-header {
  display: flex;
  justify-content: center;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
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

.status-badge.pending {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
}

.response-body {
  flex: 1;
  background: #1e293b;
  border-radius: 6px;
  padding: 8px;
  overflow: auto;
  max-height: 120px;
}

.response-body pre {
  margin: 0;
  font-family: monospace;
  font-size: 0.7rem;
  color: #e2e8f0;
  white-space: pre-wrap;
}

.response-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  font-style: italic;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 10px 14px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
