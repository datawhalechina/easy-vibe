<template>
  <div class="api-playground">
    <div class="header">
      <div class="title">🧪 API 练手场</div>
      <div class="subtitle">随便玩，坏了算我的</div>
    </div>

    <div class="playground-layout">
      <div class="left-panel">
        <div class="panel-title">发送请求</div>

        <div class="input-group">
          <label>Endpoint（网址）</label>
          <input
            v-model="endpoint"
            type="text"
            placeholder="/users/123"
            class="input"
          />
        </div>

        <div class="input-group">
          <label>方法</label>
          <div class="method-buttons">
            <button
              v-for="m in methods"
              :key="m"
              :class="['method-btn', { active: method === m }]"
              @click="method = m"
            >
              {{ m }}
            </button>
          </div>
        </div>

        <div class="input-group" v-if="method === 'POST'">
          <label>Body（JSON）</label>
          <textarea
            v-model="body"
            class="textarea"
            placeholder='{"name": "张三"}'
          ></textarea>
        </div>

        <div class="input-group">
          <label>API Key</label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="sk-..."
            class="input"
          />
        </div>

        <button class="send-btn" @click="sendRequest" :disabled="loading">
          {{ loading ? '发送中...' : '🚀 发送请求' }}
        </button>
      </div>

      <div class="right-panel">
        <div class="panel-title">响应结果</div>

        <div v-if="!response" class="empty-state">
          <span class="empty-icon">📭</span>
          <p>点击发送按钮，看看会发生什么</p>
          <p class="hint">可以试试输入错误的地址或 Key</p>
        </div>

        <div v-else class="response-content">
          <div class="status-bar" :class="getStatusClass(response.status)">
            <span class="status-code">{{ response.status }}</span>
            <span class="status-text">{{ response.statusText }}</span>
          </div>

          <div class="response-body">
            <pre>{{ JSON.stringify(response.data, null, 2) }}</pre>
          </div>

          <div class="explanation" v-if="response.explanation">
            💡 {{ response.explanation }}
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <div class="tip-title">可以试试这些玩法：</div>
      <div class="tip-list">
        <button @click="tryEndpoint('/users')">✅ GET /users</button>
        <button @click="tryEndpoint('/users/123')">✅ GET /users/123</button>
        <button @click="tryEndpoint('/posts')">✅ GET /posts</button>
        <button @click="tryError401">❌ 401 没带 Key</button>
        <button @click="tryError404">❌ 404 地址错了</button>
        <button @click="tryError429">❌ 429 点太快了</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const endpoint = ref('/users')
const method = ref('GET')
const methods = ['GET', 'POST']
const body = ref('{\n  "name": "张三",\n  "age": 25\n}')
const apiKey = ref('')
const loading = ref(false)
const response = ref(null)

function tryEndpoint(path) {
  endpoint.value = path
  method.value = 'GET'
  apiKey.value = 'sk-test123'
}

function tryError401() {
  endpoint.value = '/users'
  method.value = 'GET'
  apiKey.value = ''
}

function tryError404() {
  endpoint.value = '/unknown-path'
  method.value = 'GET'
  apiKey.value = 'sk-test123'
}

function tryError429() {
  endpoint.value = '/users'
  method.value = 'GET'
  apiKey.value = 'sk-test123'
}

function getStatusClass(status) {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'client-error'
  if (status >= 500) return 'server-error'
  return ''
}

function sendRequest() {
  loading.value = true
  response.value = null

  setTimeout(() => {
    loading.value = false

    if (!apiKey.value) {
      response.value = {
        status: 401,
        statusText: 'Unauthorized',
        data: { error: 'Invalid API key' },
        explanation: '没带 API Key，等于没带钱就想吃饭，被拒绝了'
      }
      return
    }

    if (endpoint.value === '/users' && method.value === 'GET') {
      response.value = {
        status: 200,
        statusText: 'OK',
        data: {
          users: [
            { id: 1, name: '张三', email: 'zhangsan@example.com' },
            { id: 2, name: '李四', email: 'lisi@example.com' },
            { id: 3, name: '王五', email: 'wangwu@example.com' }
          ],
          total: 3
        },
        explanation: '成功了！服务器返回了用户列表'
      }
    } else if (endpoint.value === '/users/123' && method.value === 'GET') {
      response.value = {
        status: 200,
        statusText: 'OK',
        data: { id: 123, name: '张三', email: 'zhangsan@example.com' },
        explanation: '找到了！服务器返回了单个用户信息'
      }
    } else if (endpoint.value === '/posts' && method.value === 'GET') {
      response.value = {
        status: 200,
        statusText: 'OK',
        data: {
          posts: [
            { id: 1, title: '学习 API 的第一天', author: '张三' },
            { id: 2, title: 'API 原来这么简单', author: '李四' }
          ]
        },
        explanation: '成功了！服务器返回了文章列表'
      }
    } else if (endpoint.value === '/posts' && method.value === 'POST') {
      response.value = {
        status: 201,
        statusText: 'Created',
        data: {
          id: 3,
          title: '学习 API 的第一天',
          author: '张三',
          created_at: '2025-01-15T10:30:00Z'
        },
        explanation: '新建成功了！服务器返回了新创建的帖子'
      }
    } else if (endpoint.value === '/unknown-path') {
      response.value = {
        status: 404,
        statusText: 'Not Found',
        data: { error: 'Resource not found' },
        explanation: '地址错了，这个接口不存在'
      }
    } else if (endpoint.value === '/users' && method.value === 'GET') {
      response.value = {
        status: 429,
        statusText: 'Too Many Requests',
        data: { error: 'Rate limit exceeded' },
        explanation: '点太快了！1 秒内只能请求 5 次，你超了'
      }
    } else {
      response.value = {
        status: 404,
        statusText: 'Not Found',
        data: { error: 'Endpoint not found' },
        explanation: '这个地址不存在，换一个试试？'
      }
    }
  }, 500)
}
</script>

<style scoped>
.api-playground {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.playground-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .playground-layout {
    grid-template-columns: 1fr;
  }
}

.left-panel,
.right-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}

.panel-title {
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--vp-c-text-2);
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
  font-family: monospace;
  background: var(--vp-c-bg-soft);
}

.input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.textarea {
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 13px;
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  resize: vertical;
}

.method-buttons {
  display: flex;
  gap: 8px;
}

.method-btn {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.method-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.send-btn {
  width: 100%;
  padding: 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s;
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--vp-c-text-3);
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
  opacity: 0.5;
}

.hint {
  font-size: 12px;
  margin-top: 8px;
  opacity: 0.7;
}

.response-content {
  animation: fadeIn 0.3s ease;
}

.status-bar {
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.status-bar.success {
  background: #dcfce7;
  color: #166534;
}

.status-bar.client-error {
  background: #fee2e2;
  color: #991b1b;
}

.status-bar.server-error {
  background: #fecaca;
  color: #7f1d1d;
}

.status-code {
  font-weight: 700;
  font-family: monospace;
}

.response-body {
  background: #1e293b;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 180px;
}

.response-body pre {
  margin: 0;
  font-family: monospace;
  font-size: 12px;
  color: #e2e8f0;
  white-space: pre-wrap;
}

.explanation {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.tips {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.tip-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--vp-c-text-2);
}

.tip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tip-list button {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.tip-list button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
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
