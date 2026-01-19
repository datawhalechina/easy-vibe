<template>
  <div class="api-playground">
    <div class="playground-header">
      <h3>🎮 API 调用游乐场</h3>
      <p>像使用 Postman 一样测试 API</p>
    </div>

    <!-- 预设场景 -->
    <div class="presets">
      <span class="presets-label">快速场景：</span>
      <button
        v-for="preset in presets"
        :key="preset.id"
        @click="loadPreset(preset)"
        class="preset-btn"
      >
        {{ preset.icon }} {{ preset.name }}
      </button>
    </div>

    <div class="playground-container">
      <!-- 左侧：请求配置 -->
      <div class="request-panel">
        <div class="panel-header">
          <h4>📤 请求</h4>
          <button @click="sendRequest" class="send-btn" :disabled="isLoading">
            {{ isLoading ? '发送中...' : '🚀 发送请求' }}
          </button>
        </div>

        <!-- 请求行 -->
        <div class="request-line">
          <select v-model="request.method" class="method-select">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            v-model="request.url"
            class="url-input"
            placeholder="https://api.example.com/users"
          />
        </div>

        <!-- 标签页 -->
        <div class="request-tabs">
          <button
            v-for="tab in ['headers', 'body', 'auth']"
            :key="tab"
            @click="activeTab = tab"
            :class="{ active: activeTab === tab }"
            class="tab-btn"
          >
            {{ tab.toUpperCase() }}
          </button>
        </div>

        <!-- Headers 编辑器 -->
        <div v-if="activeTab === 'headers'" class="tab-content">
          <div class="key-value-editor">
            <div v-for="(header, index) in request.headers" :key="index" class="kv-row">
              <input v-model="header.key" placeholder="Header 名称" />
              <input v-model="header.value" placeholder="Header 值" />
              <button @click="removeHeader(index)" class="remove-btn">×</button>
            </div>
            <button @click="addHeader" class="add-btn">+ 添加 Header</button>
          </div>
        </div>

        <!-- Body 编辑器 -->
        <div v-if="activeTab === 'body'" class="tab-content">
          <div class="body-toolbar">
            <button @click="formatBody" class="tool-btn">✨ 格式化</button>
            <button @click="minifyBody" class="tool-btn">🗜️ 压缩</button>
            <button @click="copyBody" class="tool-btn">📋 复制</button>
          </div>
          <textarea
            v-model="request.body"
            class="body-editor"
            placeholder='{"key": "value"}'
            spellcheck="false"
          ></textarea>
          <div v-if="bodyError" class="error-message">
            ⚠️ JSON 格式错误：{{ bodyError }}
          </div>
        </div>

        <!-- Auth 编辑器 -->
        <div v-if="activeTab === 'auth'" class="tab-content">
          <div class="auth-section">
            <label>
              <input type="radio" v-model="authType" value="none" />
              无认证
            </label>
            <label>
              <input type="radio" v-model="authType" value="apikey" />
              API Key
            </label>
            <label>
              <input type="radio" v-model="authType" value="bearer" />
              Bearer Token
            </label>
          </div>

          <div v-if="authType === 'apikey'" class="auth-inputs">
            <input v-model="auth.apikey.name" placeholder="X-API-Key" />
            <input v-model="auth.apikey.value" placeholder="your-api-key" />
          </div>

          <div v-if="authType === 'bearer'" class="auth-inputs">
            <input v-model="auth.bearer.token" placeholder="your-bearer-token" />
          </div>
        </div>
      </div>

      <!-- 右侧：响应展示 -->
      <div class="response-panel">
        <div class="panel-header">
          <h4>📥 响应</h4>
          <div v-if="response" class="response-meta">
            <span class="status-badge" :class="getStatusClass(response.status)">
              {{ response.status }}
            </span>
            <span class="response-time">{{ responseTime }}ms</span>
            <span class="response-size">{{ responseSize }}B</span>
          </div>
        </div>

        <div v-if="!response && !isLoading" class="empty-state">
          <div class="empty-icon">📡</div>
          <p>点击"发送请求"开始测试</p>
        </div>

        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>请求发送中...</p>
        </div>

        <div v-if="response" class="response-content">
          <pre class="response-body"><code>{{ formatJson(response.data) }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 历史记录 -->
    <div class="history-section">
      <div class="history-header">
        <h4>📜 历史记录</h4>
        <button @click="clearHistory" class="clear-btn">清空</button>
      </div>
      <div class="history-list">
        <div
          v-for="(item, index) in history"
          :key="index"
          @click="loadFromHistory(item)"
          class="history-item"
        >
          <span class="history-method" :class="item.method.toLowerCase()">
            {{ item.method }}
          </span>
          <span class="history-url">{{ truncateUrl(item.url) }}</span>
          <span class="history-time">{{ formatTime(item.timestamp) }}</span>
          <span class="history-status" :class="getStatusClass(item.status)">
            {{ item.status }}
          </span>
        </div>
        <div v-if="history.length === 0" class="history-empty">
          暂无历史记录
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="tips">
      <h4>💡 使用技巧</h4>
      <ul>
        <li>🎯 使用<strong>快速场景</strong>快速填充常用配置</li>
        <li>✨ 点击<strong>格式化</strong>按钮美化 JSON</li>
        <li>📋 查看历史记录可以快速重发之前的请求</li>
        <li>🔒 在 Auth 标签页中添加 API Key 或 Token</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const isLoading = ref(false)
const activeTab = ref('headers')
const authType = ref('none')
const response = ref(null)
const responseTime = ref(0)
const responseSize = ref(0)
const bodyError = ref('')

const request = ref({
  method: 'GET',
  url: 'https://api.example.com/users',
  headers: [
    { key: 'Content-Type', value: 'application/json' }
  ],
  body: '{\n  "name": "张三",\n  "email": "zhangsan@example.com"\n}'
})

const auth = ref({
  apikey: { name: 'X-API-Key', value: '' },
  bearer: { token: '' }
})

const history = ref([])

const presets = [
  {
    id: 1,
    name: '获取用户列表',
    icon: '👥',
    method: 'GET',
    url: 'https://api.example.com/users',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: ''
  },
  {
    id: 2,
    name: '创建用户',
    icon: '➕',
    method: 'POST',
    url: 'https://api.example.com/users',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '{\n  "name": "李四",\n  "email": "lisi@example.com",\n  "password": "123456"\n}'
  },
  {
    id: 3,
    name: '更新用户',
    icon: '✏️',
    method: 'PUT',
    url: 'https://api.example.com/users/1',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '{\n  "name": "张三（已修改）",\n  "email": "new_zhangsan@example.com"\n}'
  },
  {
    id: 4,
    name: '删除用户',
    icon: '❌',
    method: 'DELETE',
    url: 'https://api.example.com/users/1',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: ''
  }
]

// 模拟响应数据
const mockResponses = {
  'GET:https://api.example.com/users': {
    status: 200,
    data: {
      code: 200,
      message: 'success',
      data: [
        { id: 1, name: '张三', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', email: 'lisi@example.com' }
      ],
      pagination: { page: 1, limit: 20, total: 2 }
    }
  },
  'POST:https://api.example.com/users': {
    status: 201,
    data: {
      code: 201,
      message: 'created',
      data: { id: 3, name: '李四', email: 'lisi@example.com', createdAt: '2024-01-15T10:30:00Z' }
    }
  },
  'PUT:https://api.example.com/users/1': {
    status: 200,
    data: {
      code: 200,
      message: 'updated',
      data: { id: 1, name: '张三（已修改）', email: 'new_zhangsan@example.com', updatedAt: '2024-01-15T10:30:00Z' }
    }
  },
  'DELETE:https://api.example.com/users/1': {
    status: 204,
    data: { code: 204, message: 'deleted' }
  }
}

function loadPreset(preset) {
  request.value = {
    method: preset.method,
    url: preset.url,
    headers: [...preset.headers],
    body: preset.body
  }
  activeTab.value = 'headers'
}

async function sendRequest() {
  if (isLoading.value) return

  // 验证 JSON 格式
  if (request.value.method !== 'GET' && request.value.body.trim()) {
    try {
      JSON.parse(request.value.body)
      bodyError.value = ''
    } catch (e) {
      bodyError.value = e.message
      return
    }
  }

  isLoading.value = true
  response.value = null

  const startTime = Date.now()

  // 模拟网络请求
  await sleep(1000 + Math.random() * 1000)

  const key = `${request.value.method}:${request.value.url}`
  const mockResponse = mockResponses[key] || {
    status: 200,
    data: { code: 200, message: 'OK', data: {} }
  }

  responseTime.value = Date.now() - startTime
  responseSize.value = JSON.stringify(mockResponse.data).length
  response.value = mockResponse

  // 添加到历史记录
  history.value.unshift({
    ...request.value,
    status: mockResponse.status,
    timestamp: Date.now()
  })

  if (history.value.length > 10) {
    history.value = history.value.slice(0, 10)
  }

  isLoading.value = false
}

function formatBody() {
  try {
    const parsed = JSON.parse(request.value.body)
    request.value.body = JSON.stringify(parsed, null, 2)
    bodyError.value = ''
  } catch (e) {
    bodyError.value = e.message
  }
}

function minifyBody() {
  try {
    const parsed = JSON.parse(request.value.body)
    request.value.body = JSON.stringify(parsed)
    bodyError.value = ''
  } catch (e) {
    bodyError.value = e.message
  }
}

function copyBody() {
  navigator.clipboard.writeText(request.value.body)
}

function addHeader() {
  request.value.headers.push({ key: '', value: '' })
}

function removeHeader(index) {
  request.value.headers.splice(index, 1)
}

function formatJson(data) {
  return JSON.stringify(data, null, 2)
}

function getStatusClass(status) {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 300 && status < 400) return 'redirect'
  if (status >= 400 && status < 500) return 'client-error'
  return 'server-error'
}

function truncateUrl(url) {
  return url.length > 40 ? url.substring(0, 40) + '...' : url
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function loadFromHistory(item) {
  request.value = {
    method: item.method,
    url: item.url,
    headers: [...item.headers],
    body: item.body
  }
}

function clearHistory() {
  history.value = []
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 监听 auth 类型变化，自动添加 headers
watch(authType, (newType) => {
  if (newType === 'apikey') {
    request.value.headers.push({ key: auth.value.apikey.name, value: auth.value.apikey.value })
  } else if (newType === 'bearer') {
    request.value.headers.push({ key: 'Authorization', value: `Bearer ${auth.value.bearer.token}` })
  }
})
</script>

<style scoped>
.api-playground {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  background: #fafafa;
}

.playground-header {
  text-align: center;
  margin-bottom: 24px;
}

.playground-header h3 {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.presets {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  flex-wrap: wrap;
}

.presets-label {
  font-weight: bold;
  color: #666;
}

.preset-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.playground-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.request-panel,
.response-panel {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-header h4 {
  margin: 0;
  font-size: 16px;
}

.send-btn {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.request-line {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.method-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-weight: bold;
  font-family: monospace;
  cursor: pointer;
}

.url-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: monospace;
}

.request-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
}

.tab-btn {
  padding: 6px 12px;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.tab-content {
  min-height: 200px;
}

.key-value-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kv-row {
  display: flex;
  gap: 8px;
}

.kv-row input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-btn {
  padding: 4px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.body-toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.tool-btn {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.tool-btn:hover {
  background: #f0f0f0;
}

.body-editor {
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  resize: vertical;
}

.error-message {
  margin-top: 8px;
  padding: 8px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  font-size: 13px;
}

.auth-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.auth-section label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.auth-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-inputs input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.response-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 13px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
}

.status-badge.success { background: #d4edda; color: #155724; }
.status-badge.redirect { background: #fff3cd; color: #856404; }
.status-badge.client-error { background: #f8d7da; color: #721c24; }
.status-badge.server-error { background: #f5c6cb; color: #721c24; }

.empty-state,
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.response-content {
  max-height: 400px;
  overflow-y: auto;
}

.response-body {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}

.history-section {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.history-header h4 {
  margin: 0;
  font-size: 16px;
}

.clear-btn {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.clear-btn:hover {
  background: #f0f0f0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.history-item:hover {
  background: #f8f9fa;
  border-color: #007bff;
}

.history-method {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
  font-size: 12px;
  min-width: 60px;
  text-align: center;
}

.history-method.get { background: #61affe; color: white; }
.history-method.post { background: #49cc90; color: white; }
.history-method.put { background: #fca130; color: white; }
.history-method.delete { background: #f93e3e; color: white; }

.history-url {
  flex: 1;
  font-family: monospace;
  font-size: 13px;
  color: #333;
}

.history-time {
  font-size: 12px;
  color: #999;
}

.history-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
}

.history-status.success { background: #d4edda; color: #155724; }
.history-status.client-error { background: #f8d7da; color: #721c24; }

.history-empty {
  padding: 20px;
  text-align: center;
  color: #999;
}

.tips {
  padding: 16px;
  background: #e7f3ff;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}

.tips h4 {
  margin: 0 0 12px 0;
  color: #007bff;
}

.tips ul {
  margin: 0;
  padding-left: 20px;
}

.tips li {
  margin: 8px 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .playground-container {
    grid-template-columns: 1fr;
  }
}
</style>
