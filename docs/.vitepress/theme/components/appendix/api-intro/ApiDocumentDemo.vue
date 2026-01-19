<template>
  <div class="api-document-demo">
    <div class="demo-header">
      <h3>📚 API 文档导航</h3>
      <p>学会像阅读菜单一样阅读 API 文档</p>
    </div>

    <!-- 文档导航 -->
    <div class="doc-nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ active: activeTab === tab.id }"
      >
        {{ tab.icon }} {{ tab.label }}
      </button>
    </div>

    <!-- 概述标签页 -->
    <div v-if="activeTab === 'overview'" class="tab-content">
      <div class="api-overview">
        <h4>用户管理 API</h4>
        <p>本 API 提供用户的增删改查功能，支持分页查询和高级过滤。</p>

        <div class="info-cards">
          <div class="info-card">
            <div class="card-icon">🔗</div>
            <div class="card-title">Base URL</div>
            <div class="card-value"><code>https://api.example.com/v1</code></div>
          </div>

          <div class="info-card">
            <div class="card-icon">🔑</div>
            <div class="card-title">认证方式</div>
            <div class="card-value">API Key 或 Bearer Token</div>
          </div>

          <div class="info-card">
            <div class="card-icon">📊</div>
            <div class="card-title">数据格式</div>
            <div class="card-value">JSON</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 接口列表标签页 -->
    <div v-if="activeTab === 'endpoints'" class="tab-content">
      <div class="endpoint-list">
        <div
          v-for="endpoint in endpoints"
          :key="endpoint.id"
          @click="selectedEndpoint = endpoint"
          :class="['endpoint-item', endpoint.method.toLowerCase(), { active: selectedEndpoint?.id === endpoint.id }]"
        >
          <div class="method-badge">{{ endpoint.method }}</div>
          <div class="endpoint-path">{{ endpoint.path }}</div>
          <div class="endpoint-desc">{{ endpoint.description }}</div>
        </div>
      </div>

      <!-- 接口详情 -->
      <div v-if="selectedEndpoint" class="endpoint-detail">
        <div class="detail-header">
          <span class="method-badge large" :class="selectedEndpoint.method.toLowerCase()">
            {{ selectedEndpoint.method }}
          </span>
          <span class="endpoint-path">{{ selectedEndpoint.path }}</span>
        </div>

        <p class="detail-description">{{ selectedEndpoint.description }}</p>

        <!-- 请求参数 -->
        <div class="params-section">
          <h5>📥 请求参数</h5>
          <table class="params-table">
            <thead>
              <tr>
                <th>参数名</th>
                <th>类型</th>
                <th>必填</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in selectedEndpoint.params" :key="param.name">
                <td><code>{{ param.name }}</code></td>
                <td><span class="type-badge">{{ param.type }}</span></td>
                <td>{{ param.required ? '✅ 是' : '❌ 否' }}</td>
                <td>{{ param.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 请求示例 -->
        <div class="example-section">
          <h5>📤 请求示例</h5>
          <div class="code-tabs">
            <button
              v-for="lang in ['curl', 'javascript', 'python']"
              :key="lang"
              @click="codeLang = lang"
              :class="{ active: codeLang === lang }"
            >
              {{ lang }}
            </button>
          </div>
          <pre class="code-block"><code>{{ getCodeExample() }}</code></pre>
        </div>

        <!-- 响应示例 -->
        <div class="response-section">
          <h5>📥 响应示例</h5>
          <pre class="code-block json"><code>{{ JSON.stringify(selectedEndpoint.response, null, 2) }}</code></pre>
        </div>

        <button @click="tryApi" class="try-btn">🚀 试试这个 API</button>
      </div>
    </div>

    <!-- 数据模型标签页 -->
    <div v-if="activeTab === 'models'" class="tab-content">
      <div class="models-list">
        <div v-for="model in models" :key="model.name" class="model-card">
          <h5>{{ model.name }}</h5>
          <p>{{ model.description }}</p>
          <table class="fields-table">
            <thead>
              <tr>
                <th>字段</th>
                <th>类型</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in model.fields" :key="field.name">
                <td><code>{{ field.name }}</code></td>
                <td>{{ field.type }}</td>
                <td>{{ field.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 错误码标签页 -->
    <div v-if="activeTab === 'errors'" class="tab-content">
      <div class="error-codes">
        <div v-for="error in errorCodes" :key="error.code" class="error-item">
          <div class="error-code" :class="getErrorClass(error.code)">
            {{ error.code }}
          </div>
          <div class="error-info">
            <div class="error-title">{{ error.title }}</div>
            <div class="error-description">{{ error.description }}</div>
            <div class="error-solution">💡 {{ error.solution }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- API 测试弹窗 -->
    <div v-if="showTestModal" class="modal-overlay" @click="showTestModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>🧪 测试 API</h4>
          <button @click="showTestModal = false" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="test-config">
            <label>
              接口地址：
              <input v-model="testUrl" readonly />
            </label>
            <label v-for="param in testParams" :key="param.name">
              {{ param.name }}：
              <input v-model="param.value" :placeholder="param.placeholder" />
            </label>
          </div>
          <button @click="sendTestRequest" class="send-btn" :disabled="testLoading">
            {{ testLoading ? '发送中...' : '🚀 发送请求' }}
          </button>

          <div v-if="testResponse" class="test-result">
            <h5>响应结果：</h5>
            <pre><code>{{ JSON.stringify(testResponse, null, 2) }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="tips">
      <h4>💡 阅读技巧</h4>
      <ul>
        <li>先看 <strong>概述</strong> 了解 API 的基本信息</li>
        <li>再看 <strong>接口列表</strong> 找到你需要的功能</li>
        <li>仔细看 <strong>请求参数</strong>，注意必填项和类型</li>
        <li>参考 <strong>请求示例</strong>，复制粘贴修改</li>
        <li>遇到错误查 <strong>错误码</strong> 快速定位问题</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('overview')
const selectedEndpoint = ref(null)
const codeLang = ref('curl')
const showTestModal = ref(false)
const testUrl = ref('')
const testResponse = ref(null)
const testLoading = ref(false)

const tabs = [
  { id: 'overview', label: '概述', icon: '📖' },
  { id: 'endpoints', label: '接口列表', icon: '🔌' },
  { id: 'models', label: '数据模型', icon: '📊' },
  { id: 'errors', label: '错误码', icon: '⚠️' }
]

const endpoints = [
  {
    id: 1,
    method: 'GET',
    path: '/users',
    description: '获取用户列表（支持分页）',
    params: [
      { name: 'page', type: 'number', required: false, description: '页码，默认 1' },
      { name: 'limit', type: 'number', required: false, description: '每页数量，默认 20' },
      { name: 'search', type: 'string', required: false, description: '搜索关键词' }
    ],
    response: {
      code: 200,
      message: 'success',
      data: [
        { id: 1, name: '张三', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', email: 'lisi@example.com' }
      ],
      pagination: { page: 1, limit: 20, total: 100 }
    }
  },
  {
    id: 2,
    method: 'POST',
    path: '/users',
    description: '创建新用户',
    params: [
      { name: 'name', type: 'string', required: true, description: '用户名' },
      { name: 'email', type: 'string', required: true, description: '邮箱地址' },
      { name: 'password', type: 'string', required: true, description: '密码' }
    ],
    response: {
      code: 201,
      message: 'created',
      data: { id: 3, name: '王五', email: 'wangwu@example.com', createdAt: '2024-01-15' }
    }
  }
]

const models = [
  {
    name: 'User',
    description: '用户对象',
    fields: [
      { name: 'id', type: 'number', description: '用户 ID' },
      { name: 'name', type: 'string', description: '用户名' },
      { name: 'email', type: 'string', description: '邮箱地址' },
      { name: 'createdAt', type: 'string', description: '创建时间（ISO 8601）' }
    ]
  }
]

const errorCodes = [
  { code: 400, title: '参数错误', description: '请求参数格式错误或缺少必填参数', solution: '检查参数名、类型和格式' },
  { code: 401, title: '未授权', description: '缺少有效的认证信息', solution: '添加 API Key 或 Bearer Token' },
  { code: 404, title: '资源不存在', description: '请求的资源未找到', solution: '检查 URL 路径是否正确' },
  { code: 429, title: '请求过于频繁', description: '超过了 API 的速率限制', solution: '降低请求频率或联系提供方' },
  { code: 500, title: '服务器错误', description: '服务器内部错误', solution: '稍后重试或联系技术支持' }
]

const testParams = ref([])

function getCodeExample() {
  if (!selectedEndpoint.value) return ''

  const ep = selectedEndpoint.value

  if (codeLang.value === 'curl') {
    return `curl -X ${ep.method} \\
  https://api.example.com/v1${ep.path} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  ${ep.method === 'POST' ? '-d \'{"name":"张三","email":"zhangsan@example.com"}\'' : ''}`
  }

  if (codeLang.value === 'javascript') {
    return `fetch('https://api.example.com/v1${ep.path}', {
  method: '${ep.method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  }${ep.method === 'POST' ? `,
  body: JSON.stringify({
    name: '张三',
    email: 'zhangsan@example.com'
  })` : ''}
}).then(res => res.json())
  .then(data => console.log(data))`
  }

  if (codeLang.value === 'python') {
    return `import requests

url = 'https://api.example.com/v1${ep.path}'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
}
${ep.method === 'POST' ? 'data = {"name": "张三", "email": "zhangsan@example.com"}\n\n' : ''}response = requests.${ep.method.toLowerCase()}(url, headers=headers${ep.method === 'POST' ? ', json=data' : ''})

print(response.json())`
  }

  return ''
}

function getErrorClass(code) {
  if (code >= 200 && code < 300) return 'success'
  if (code >= 300 && code < 400) return 'redirect'
  if (code >= 400 && code < 500) return 'client-error'
  return 'server-error'
}

function tryApi() {
  if (!selectedEndpoint.value) return

  testUrl.value = `https://api.example.com/v1${selectedEndpoint.value.path}`
  testParams.value = selectedEndpoint.value.params.map(p => ({
    name: p.name,
    value: '',
    placeholder: p.description
  }))
  testResponse.value = null
  showTestModal.value = true
}

function sendTestRequest() {
  testLoading.value = true

  setTimeout(() => {
    testResponse.value = selectedEndpoint.value.response
    testLoading.value = false
  }, 1000)
}
</script>

<style scoped>
.api-document-demo {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  background: #fafafa;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h3 {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.doc-nav {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 16px;
}

.doc-nav button {
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.doc-nav button:hover {
  background: #f0f0f0;
}

.doc-nav button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.tab-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-height: 400px;
}

.api-overview h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.info-card {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.card-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #666;
}

.endpoint-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.endpoint-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.endpoint-item:hover {
  border-color: #007bff;
  background: #f8f9fa;
}

.endpoint-item.active {
  border-color: #007bff;
  background: #e8f4ff;
}

.method-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
  min-width: 60px;
  text-align: center;
}

.method-badge.large {
  font-size: 16px;
  padding: 8px 16px;
}

.method-badge.get {
  background: #61affe;
  color: white;
}

.method-badge.post {
  background: #49cc90;
  color: white;
}

.endpoint-path {
  font-family: monospace;
  font-weight: bold;
  color: #333;
}

.endpoint-desc {
  color: #666;
  font-size: 14px;
}

.endpoint-detail {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.params-section,
.example-section,
.response-section {
  margin-top: 24px;
}

.params-section h5,
.example-section h5,
.response-section h5 {
  margin: 0 0 12px 0;
  font-size: 16px;
}

.params-table,
.fields-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.params-table th,
.params-table td,
.fields-table th,
.fields-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.params-table th,
.fields-table th {
  background: #f0f0f0;
  font-weight: bold;
  font-size: 13px;
}

.type-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #e0e0e0;
  border-radius: 3px;
  font-size: 12px;
  font-family: monospace;
}

.code-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.code-tabs button {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.code-tabs button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
}

.code-block.json {
  background: #1e1e1e;
}

.try-btn {
  margin-top: 20px;
  padding: 12px 24px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.try-btn:hover {
  background: #218838;
}

.model-card {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
}

.model-card h5 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.model-card p {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.error-codes {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.error-code {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  font-family: monospace;
  font-size: 18px;
  min-width: 80px;
  text-align: center;
}

.error-code.success {
  background: #d4edda;
  color: #155724;
}

.error-code.client-error {
  background: #f8d7da;
  color: #721c24;
}

.error-code.server-error {
  background: #f5c6cb;
  color: #721c24;
}

.error-info {
  flex: 1;
}

.error-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.error-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.error-solution {
  color: #007bff;
  font-size: 13px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h4 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.test-config {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.test-config label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: bold;
}

.test-config input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.send-btn {
  width: 100%;
  padding: 12px;
  background: #007bff;
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

.test-result {
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.test-result h5 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.test-result pre {
  margin: 0;
}

.tips {
  margin-top: 24px;
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

code {
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
  color: #e83e8c;
}
</style>
