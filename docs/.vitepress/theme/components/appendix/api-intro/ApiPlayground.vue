<!--
  ApiPlayground.vue - 闯关版
  目标：通过"通关"的方式让用户体验 401/404/200
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🎮</span>
      <span class="title">练手场：搞崩它，再修好它</span>
    </div>

    <div class="playground">
      <!-- 控制台 -->
      <div class="console">
        <div class="console-header">
          <div class="dots">
            <span></span><span></span><span></span>
          </div>
          <span class="console-title">API Console</span>
        </div>
        
        <div class="console-body">
          <div class="input-group">
            <label>METHOD</label>
            <select v-model="method" class="method-select" :class="method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          <div class="input-group">
            <label>URL</label>
            <div class="url-input-wrapper">
              <span class="host">https://api.game.com</span>
              <input v-model="path" type="text" class="url-input" placeholder="/users/1" />
            </div>
          </div>

          <div class="input-group">
            <label>HEADERS</label>
            <div class="code-editor">
              Authorization: <input v-model="token" placeholder="(空)" class="code-input" />
            </div>
          </div>

          <button class="send-btn" @click="sendRequest" :disabled="loading">
            {{ loading ? 'Sending...' : 'SEND REQUEST' }}
          </button>
        </div>
      </div>

      <!-- 任务区 -->
      <div class="mission-panel">
        <div class="mission-title">👇 点这些按钮试错</div>
        <div class="scenarios">
          <button class="scenario-btn error-401" @click="loadScenario('401')">
            1. 没带钥匙 (401)
          </button>
          <button class="scenario-btn error-404" @click="loadScenario('404')">
            2. 找错人了 (404)
          </button>
          <button class="scenario-btn success-200" @click="loadScenario('200')">
            3. 成功通关 (200)
          </button>
        </div>
      </div>

      <!-- 结果区 -->
      <div class="result-area" v-if="result">
        <div class="status-bar" :class="result.statusClass">
          <span class="status-code">{{ result.code }}</span>
          <span class="status-text">{{ result.text }}</span>
        </div>
        <div class="response-preview">
          {{ result.data }}
        </div>
        <div class="result-tip">
          <strong>💡 现象解析：</strong> {{ result.tip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const method = ref('GET')
const path = ref('/secret-treasure')
const token = ref('')
const loading = ref(false)
const result = ref(null)

function loadScenario(type) {
  result.value = null
  if (type === '401') {
    method.value = 'GET'
    path.value = '/secret-treasure'
    token.value = '' // Empty token
  } else if (type === '404') {
    method.value = 'GET'
    path.value = '/nothing-here'
    token.value = 'Bearer my-secret-key'
  } else if (type === '200') {
    method.value = 'GET'
    path.value = '/secret-treasure'
    token.value = 'Bearer my-secret-key'
  }
}

function sendRequest() {
  loading.value = true
  result.value = null
  
  setTimeout(() => {
    loading.value = false
    
    // Logic
    if (path.value === '/nothing-here') {
      result.value = {
        code: 404,
        text: 'Not Found',
        statusClass: 'error',
        data: 'Error: The resource "/nothing-here" does not exist.',
        tip: '请求的路径不存在。服务器无法找到对应的资源，因此返回 404 状态码。'
      }
      return
    }

    if (!token.value || token.value.trim() === '') {
      result.value = {
        code: 401,
        text: 'Unauthorized',
        statusClass: 'error',
        data: 'Error: Missing authentication token.',
        tip: '请求头中缺少鉴权 Token。服务器无法识别身份，因此拒绝访问并返回 401。'
      }
      return
    }

    if (path.value === '/secret-treasure') {
      result.value = {
        code: 200,
        text: 'OK',
        statusClass: 'success',
        data: '🎉 Congratulations! You found the secret treasure: [Gold, Diamond, Ruby]',
        tip: '请求成功。路径正确且鉴权通过，服务器正常返回了数据。'
      }
    } else {
       result.value = {
        code: 404,
        text: 'Not Found',
        statusClass: 'error',
        data: 'Error: Resource not found.',
        tip: '路径错误。'
      }
    }
  }, 500)
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
  padding: 12px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.playground {
  padding: 20px;
}

.console {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.console-header {
  background: #0f172a;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.dots {
  display: flex;
  gap: 6px;
}

.dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #334155;
}
.dots span:nth-child(1) { background: #ef4444; }
.dots span:nth-child(2) { background: #eab308; }
.dots span:nth-child(3) { background: #22c55e; }

.console-title {
  color: #94a3b8;
  font-size: 12px;
  font-family: monospace;
}

.console-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group label {
  display: block;
  color: #64748b;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 6px;
  font-family: monospace;
}

.method-select {
  background: #334155;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
}

.method-select.GET { color: #22c55e; }
.method-select.POST { color: #eab308; }

.url-input-wrapper {
  display: flex;
  align-items: center;
  background: #0f172a;
  border-radius: 4px;
  border: 1px solid #334155;
  padding-left: 12px;
}

.host {
  color: #64748b;
  font-size: 13px;
  font-family: monospace;
}

.url-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  padding: 8px;
  font-family: monospace;
  font-size: 13px;
}

.code-editor {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 4px;
  padding: 8px 12px;
  color: #eab308;
  font-family: monospace;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.code-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  margin-left: 8px;
  font-family: monospace;
}

.send-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-family: monospace;
  transition: all 0.2s;
}

.send-btn:hover {
  background: #2563eb;
}

.mission-panel {
  margin-bottom: 20px;
}

.mission-title {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  font-weight: 600;
}

.scenarios {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid transparent;
  background: var(--vp-c-bg);
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.scenario-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.error-401 { color: #ef4444; border-color: rgba(239,68,68,0.2); }
.error-404 { color: #f97316; border-color: rgba(249,115,22,0.2); }
.success-200 { color: #22c55e; border-color: rgba(34,197,94,0.2); }

.result-area {
  animation: slideUp 0.3s ease;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px 6px 0 0;
  font-weight: bold;
  font-family: monospace;
}

.status-bar.success { background: #dcfce7; color: #166534; }
.status-bar.error { background: #fee2e2; color: #991b1b; }

.response-preview {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  font-family: monospace;
  font-size: 13px;
  border-left: 1px solid #334155;
  border-right: 1px solid #334155;
}

.result-tip {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  padding: 12px;
  border-radius: 0 0 6px 6px;
  font-size: 14px;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
