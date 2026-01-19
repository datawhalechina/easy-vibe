<template>
  <div class="request-response-flow">
    <div class="demo-header">
      <h3>📡 API 请求-响应流程</h3>
      <p>观察一个完整的 API 调用过程</p>
    </div>

    <!-- 请求配置 -->
    <div class="request-config">
      <label>
        请求方法：
        <select v-model="requestMethod">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>

      <label>
        接口地址：
        <input v-model="requestUrl" placeholder="/api/users" />
      </label>

      <button @click="sendRequest" :disabled="isLoading">
        {{ isLoading ? '发送中...' : '🚀 发送请求' }}
      </button>
    </div>

    <!-- 流程可视化 -->
    <div class="flow-visualization">
      <div
        class="flow-step"
        v-for="(step, index) in steps"
        :key="index"
        :class="{
          active: currentStep === index,
          completed: currentStep > index
        }"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-description">{{ step.description }}</div>
          <div v-if="currentStep === index" class="step-detail">
            {{ step.detail }}
          </div>
        </div>
        <div v-if="index < steps.length - 1" class="step-arrow">→</div>
      </div>
    </div>

    <!-- 请求/响应详情 -->
    <div class="details-panel">
      <div class="request-detail">
        <h4>📤 请求详情</h4>
        <pre><code>{{ requestDetail }}</code></pre>
      </div>

      <div class="response-detail">
        <h4>📥 响应详情</h4>
        <div v-if="responseData">
          <div class="status-badge" :class="responseStatusClass">
            {{ responseData.status }} {{ responseData.statusText }}
          </div>
          <pre><code>{{ JSON.stringify(responseData.data, null, 2) }}</code></pre>
          <div class="response-meta">
            <span>⏱️ 耗时: {{ responseTime }}ms</span>
            <span>📦 大小: {{ responseSize }} bytes</span>
          </div>
        </div>
        <div v-else class="waiting">等待请求...</div>
      </div>
    </div>

    <!-- 状态码说明 -->
    <div class="status-codes">
      <h4>常见状态码</h4>
      <div class="code-list">
        <span class="code success">200 - 成功</span>
        <span class="code redirect">301 - 重定向</span>
        <span class="code client-error">400 - 客户端错误</span>
        <span class="code client-error">401 - 未授权</span>
        <span class="code client-error">404 - 未找到</span>
        <span class="code server-error">500 - 服务器错误</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const requestMethod = ref('GET')
const requestUrl = ref('/api/users')
const isLoading = ref(false)
const currentStep = ref(-1)
const responseData = ref(null)
const responseTime = ref(0)
const responseSize = ref(0)

const steps = [
  {
    title: '客户端发起请求',
    description: '浏览器/APP 构建请求',
    get detail() {
      return `${requestMethod.value} ${requestUrl.value}`
    }
  },
  {
    title: '网络传输',
    description: '请求通过互联网发送',
    get detail() {
      return 'TCP/IP 数据包传输中...'
    }
  },
  {
    title: '服务器接收并处理',
    description: '解析请求，查询数据库/执行逻辑',
    get detail() {
      return `处理 ${requestMethod.value} 请求...`
    }
  },
  {
    title: '服务器返回响应',
    description: '生成 JSON 数据并返回',
    get detail() {
      return 'HTTP/1.1 200 OK'
    }
  },
  {
    title: '客户端接收响应',
    description: '解析数据并更新界面',
    get detail() {
      return '接收数据，渲染页面'
    }
  }
]

const requestDetail = computed(() => {
  return `${requestMethod.value} ${requestUrl.value} HTTP/1.1
Host: api.example.com
Content-Type: application/json

${
  requestMethod.value !== 'GET'
    ? '{\n  "name": "张三",\n  "email": "zhangsan@example.com"\n}'
    : ''
}`
})

const responseStatusClass = computed(() => {
  if (!responseData.value) return ''
  const status = responseData.value.status
  if (status >= 200 && status < 300) return 'success'
  if (status >= 300 && status < 400) return 'redirect'
  if (status >= 400 && status < 500) return 'client-error'
  if (status >= 500) return 'server-error'
  return ''
})

async function sendRequest() {
  if (isLoading.value) return

  isLoading.value = true
  responseData.value = null
  currentStep.value = -1

  // 模拟请求流程
  for (let i = 0; i < steps.length; i++) {
    currentStep.value = i
    await sleep(800)
  }

  // 模拟响应数据
  const startTime = Date.now()
  responseTime.value = Math.floor(Math.random() * 200) + 50
  responseSize.value = Math.floor(Math.random() * 1000) + 100

  responseData.value = {
    status: 200,
    statusText: 'OK',
    data: {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      createdAt: '2024-01-01T00:00:00Z'
    }
  }

  await sleep(responseTime.value)

  isLoading.value = false
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>

<style scoped>
.request-response-flow {
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

.request-config {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.request-config label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.request-config select,
.request-config input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.request-config button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.request-config button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.flow-visualization {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  padding: 12px 0;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.flow-step.active .step-number {
  background: #007bff;
  color: white;
  animation: pulse 1s infinite;
}

.flow-step.completed .step-number {
  background: #28a745;
  color: white;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.step-description {
  color: #666;
  font-size: 14px;
}

.step-detail {
  margin-top: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  color: #007bff;
}

.step-arrow {
  font-size: 24px;
  color: #ccc;
  margin-left: 16px;
}

.flow-step.active .step-arrow {
  color: #007bff;
  animation: arrowMove 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes arrowMove {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

.details-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.request-detail,
.response-detail {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.request-detail h4,
.response-detail h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
}

.request-detail pre,
.response-detail pre {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 13px;
  margin: 0;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 12px;
}

.status-badge.success {
  background: #d4edda;
  color: #155724;
}

.response-meta {
  margin-top: 12px;
  font-size: 13px;
  color: #666;
  display: flex;
  gap: 16px;
}

.waiting {
  color: #999;
  font-style: italic;
}

.status-codes {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.status-codes h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
}

.code-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.code {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
}

.code.success {
  background: #d4edda;
  color: #155724;
}

.code.redirect {
  background: #fff3cd;
  color: #856404;
}

.code.client-error {
  background: #f8d7da;
  color: #721c24;
}

.code.server-error {
  background: #f5c6cb;
  color: #721c24;
}
</style>
