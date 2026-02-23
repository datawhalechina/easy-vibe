<!--
  ApiPlayground.vue - 紧凑版
  目标：让用户动手尝试 API 调用
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">🧪</span>
      <span class="title">API 练手场</span>
      <span class="subtitle">随便玩，坏了算我的</span>
    </div>

    <div class="demo-layout">
      <div class="left-panel">
        <div class="input-row">
          <label>Endpoint</label>
          <input
            v-model="endpoint"
            type="text"
            placeholder="/users"
            class="input"
          />
        </div>
        <div class="input-row">
          <label>方法</label>
          <div class="method-btns">
            <button
              v-for="m in methods"
              :key="m"
              :class="['m-btn', { active: method === m }]"
              @click="method = m"
            >
              {{ m }}
            </button>
          </div>
        </div>
        <div class="input-row">
          <label>API Key</label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="sk-..."
            class="input"
          />
        </div>
        <button class="send-btn" :disabled="loading" @click="sendRequest">
          {{ loading ? '发送中...' : '🚀 发送' }}
        </button>
      </div>

      <div class="right-panel">
        <div v-if="!response" class="empty">点击发送查看结果</div>
        <div v-else class="response">
          <div class="status-bar" :class="getStatusClass(response.status)">
            <span class="code">{{ response.status }}</span>
            <span class="text">{{ response.statusText }}</span>
          </div>
          <div class="body">
            <pre>{{ JSON.stringify(response.data, null, 2) }}</pre>
          </div>
          <div v-if="response.explanation" class="explanation">
            💡 {{ response.explanation }}
          </div>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <span class="label">快速尝试：</span>
      <button @click="tryEndpoint('/users')">✅ GET /users</button>
      <button @click="tryError401">❌ 401</button>
      <button @click="tryError404">❌ 404</button>
      <button @click="tryError429">❌ 429</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const endpoint = ref('/users')
const method = ref('GET')
const apiKey = ref('sk-demo-key')
const loading = ref(false)
const response = ref(null)

const methods = ['GET', 'POST', 'PUT', 'DELETE']

function getStatusClass(status) {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'client-error'
  return 'server-error'
}

function sendRequest() {
  loading.value = true
  response.value = null

  setTimeout(() => {
    if (!apiKey.value) {
      response.value = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: '缺少 API Key' },
        explanation: '服务器不认识你，需要提供有效的身份证明'
      }
    } else if (endpoint.value === '/users') {
      response.value = {
        status: 200,
        statusText: 'OK',
        data: {
          users: [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
          ],
          total: 2
        },
        explanation: '成功！服务器返回了用户列表'
      }
    } else {
      response.value = {
        status: 404,
        statusText: 'Not Found',
        data: { error: '接口不存在' },
        explanation: '这个地址没有对应的 API，检查一下路径'
      }
    }
    loading.value = false
  }, 300)
}

function tryEndpoint(ep) {
  endpoint.value = ep
  method.value = 'GET'
  sendRequest()
}

function tryError401() {
  apiKey.value = ''
  sendRequest()
}

function tryError404() {
  endpoint.value = '/not-exist'
  sendRequest()
}

function tryError429() {
  loading.value = true
  response.value = null
  setTimeout(() => {
    response.value = {
      status: 429,
      statusText: 'Too Many Requests',
      data: { error: '请求太频繁' },
      explanation: '你请求太快了，服务器让你歇会儿'
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
.subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.demo-layout {
  display: flex;
}

.left-panel {
  width: 240px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid var(--vp-c-divider);
}

.right-panel {
  flex: 1;
  padding: 12px;
  background: var(--vp-c-bg);
  min-height: 180px;
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .left-panel {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}

.input-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-row label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.input {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  background: var(--vp-c-bg);
}

.method-btns {
  display: flex;
  gap: 4px;
}

.m-btn {
  flex: 1;
  padding: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  font-size: 0.75rem;
  cursor: pointer;
}

.m-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.send-btn {
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.response {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status-bar.success {
  background: #dcfce7;
}
.status-bar.success .code {
  color: #166534;
}
.status-bar.client-error {
  background: #fee2e2;
}
.status-bar.client-error .code {
  color: #991b1b;
}
.status-bar.server-error {
  background: #fef3c7;
}
.status-bar.server-error .code {
  color: #92400e;
}

.code {
  font-weight: bold;
}
.text {
  color: var(--vp-c-text-2);
}

.body {
  flex: 1;
  background: #1e293b;
  border-radius: 6px;
  padding: 8px;
  overflow: auto;
}

.body pre {
  margin: 0;
  font-family: monospace;
  font-size: 0.7rem;
  color: #e2e8f0;
  white-space: pre-wrap;
}

.explanation {
  padding: 8px;
  background: #fef3c7;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #92400e;
}

.quick-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.quick-actions .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.quick-actions button {
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.75rem;
  cursor: pointer;
}

.quick-actions button:hover {
  background: var(--vp-c-bg-soft);
}
</style>
