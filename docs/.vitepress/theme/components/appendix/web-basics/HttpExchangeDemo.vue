<template>
  <div class="http-exchange-demo">
    <div class="browser-frame">
      <!-- Address Bar (Simplified) -->
      <div class="address-bar">
        <select v-model="method" class="method-select" :disabled="loading">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input v-model="path" class="url-input" :disabled="loading" />
        <button @click="sendRequest" :disabled="loading" class="send-btn">
          {{ loading ? '...' : t.send }}
        </button>
      </div>

      <div class="split-view">
        <!-- Network Log (Left) -->
        <div class="network-log">
          <div class="log-header">
            <span>{{ t.cols.name }}</span>
            <span>{{ t.cols.status }}</span>
            <span>{{ t.cols.type }}</span>
            <span>{{ t.cols.time }}</span>
          </div>
          <div
            class="log-row"
            :class="{ active: requestSent, selected: true }"
            v-if="requestSent"
          >
            <span class="col-name">{{ path.split('/').pop() || 'index' }}</span>
            <span class="col-status" :class="statusClass">{{
              responseStatus
            }}</span>
            <span class="col-type">document</span>
            <span class="col-time">{{ loading ? 'Pending' : '45ms' }}</span>
          </div>
          <div v-else class="empty-state">{{ t.noRequests }}</div>
        </div>

        <!-- Details Panel (Right) -->
        <div class="details-panel" v-if="requestSent">
          <div class="tabs">
            <button
              v-for="tabKey in ['headers', 'response', 'preview']"
              :key="tabKey"
              :class="{ active: activeTab === tabKey }"
              @click="activeTab = tabKey"
            >
              {{ t.tabs[tabKey] }}
            </button>
          </div>

          <div class="tab-content">
            <!-- Headers Tab -->
            <div v-if="activeTab === 'headers'" class="headers-view">
              <div class="section">
                <div class="section-title">{{ t.general }}</div>
                <div class="kv-row">
                  <span class="key">{{ t.requestUrl }}:</span>
                  <span class="value">https://api.example.com{{ path }}</span>
                </div>
                <div class="kv-row">
                  <span class="key">{{ t.requestMethod }}:</span>
                  <span class="value">{{ method }}</span>
                </div>
                <div class="kv-row">
                  <span class="key">{{ t.statusCode }}:</span>
                  <span class="value">
                    <span class="status-dot" :class="statusClass"></span>
                    {{ responseStatus || '...' }}
                  </span>
                </div>
              </div>
              <div class="section">
                <div class="section-title">{{ t.responseHeaders }}</div>
                <div
                  class="kv-row"
                  v-for="(val, key) in responseHeaders"
                  :key="key"
                >
                  <span class="key">{{ key }}:</span>
                  <span class="value">{{ val }}</span>
                </div>
              </div>
            </div>

            <!-- Response Tab -->
            <div v-if="activeTab === 'response'" class="code-view">
              <pre>{{ responseBody }}</pre>
            </div>

            <!-- Preview Tab -->
            <div v-if="activeTab === 'preview'" class="preview-view">
              <div
                v-if="method === 'GET'"
                class="html-preview"
                v-html="responseBody"
              ></div>
              <div v-else class="json-preview">
                JSON Data: {{ responseBody }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="details-placeholder">
          {{ t.placeholder }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'zh'
  }
})

const t = {
  send: '提交订单 (发送请求)',
  noRequests: '购物车是空的 (无请求)',
  placeholder: '点击 "提交订单" 向店员购买玩具',
  general: '订单详情 (General)',
  requestUrl: '商品地址 (URL)',
  requestMethod: '操作类型 (Method)',
  statusCode: '店员回复 (Status)',
  responseHeaders: '包裹标签 (Headers)',
  tabs: {
    headers: '订单信息',
    response: '包裹内容',
    preview: '玩具预览'
  },
  cols: {
    name: '商品',
    status: '状态',
    type: '类型',
    time: '耗时'
  }
}

const method = ref('GET')
const path = ref('/toys/lego-castle')
const loading = ref(false)
const requestSent = ref(false)
const activeTab = ref('headers')

const responseStatus = ref('')
const responseBody = ref('')
const responseHeaders = ref({})

const sendRequest = async () => {
  if (loading.value) return
  loading.value = true
  requestSent.value = true
  responseStatus.value = '处理中...'

  await new Promise((r) => setTimeout(r, 800))

  loading.value = false

  if (method.value === 'GET') {
    responseStatus.value = '200 OK (有货)'
    responseHeaders.value = {
      'Content-Type': 'application/json (积木)',
      Date: new Date().toLocaleString(),
      Store: '乐高官方店'
    }
    responseBody.value = `{\n  "id": 101,\n  "name": "Lego Castle",\n  "pieces": 500,\n  "price": "$99"\n}`
  } else {
    responseStatus.value = '201 Created (下单成功)'
    responseHeaders.value = {
      'Content-Type': 'application/json',
      Date: new Date().toLocaleString()
    }
    responseBody.value = `{\n  "success": true,\n  "message": "Order placed"\n}`
  }
}

const statusClass = computed(() => {
  if (loading.value) return 'pending'
  if (responseStatus.value.startsWith('2')) return 'success'
  return 'error'
})
</script>

<style scoped>
.http-exchange-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin: 1rem 0;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  overflow: hidden;
}

.browser-frame {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.address-bar {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 0.5rem;
}

.method-select {
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
}

.url-input {
  flex: 1;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.send-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.split-view {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.network-log {
  width: 40%;
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
}

.log-header {
  display: flex;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.log-header span {
  flex: 1;
}

.log-row {
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid var(--vp-c-divider);
}

.log-row.selected {
  background: #e0f2fe; /* Light blue */
}

html.dark .log-row.selected {
  background: #1e3a8a;
}

.log-row span {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-status.success {
  color: #10b981;
}
.col-status.pending {
  color: #9ca3af;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-3);
}

.details-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
}

.details-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.tabs button {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.tabs button.active {
  border-bottom-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.kv-row {
  display: flex;
  margin-bottom: 0.3rem;
  font-family: monospace;
}

.kv-row .key {
  width: 120px;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.kv-row .value {
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.code-view pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: monospace;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}
.status-dot.success {
  background: #10b981;
}
.status-dot.pending {
  background: #9ca3af;
}
</style>
