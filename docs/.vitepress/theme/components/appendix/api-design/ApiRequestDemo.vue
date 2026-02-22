<template>
  <div class="ar-root">
    <div class="ar-layout">
      <div class="ar-left">
        <div class="ar-terminal">
          <div class="term-bar">
            <span class="dot r" /><span class="dot y" /><span class="dot g" />
            <span class="term-title">API 请求演示</span>
          </div>
          <div ref="termEl" class="term-body">
            <div v-for="(l, i) in lines" :key="i" class="t-line">
              <span v-if="l.kind === 'cmd'" class="t-ps">&gt; </span>
              <span :class="'t-' + l.kind">{{ l.text }}</span>
            </div>
            <div class="t-line">
              <span class="t-ps">&gt; </span>
              <span class="t-typing"
                >{{ typing }}<span class="t-cur">▋</span></span
              >
            </div>
          </div>
        </div>
        <div class="ar-btns">
          <button
            v-for="op in ops"
            :key="op.id"
            :disabled="running || !op.ok()"
            :class="[
              'ar-btn',
              { 'ar-btn--on': active === op.id, 'ar-btn--dim': !op.ok() }
            ]"
            @click="run(op)"
          >
            <code>{{ op.cmd }}</code>
          </button>
          <button
            class="ar-btn ar-btn--reset"
            :disabled="running"
            @click="reset"
          >
            重置
          </button>
        </div>
      </div>

      <div class="ar-right">
        <div class="ar-flow">
          <div
            class="flow-col flow-client"
            :class="{ 'flow-highlight': pulseArea === 'client' }"
          >
            <div class="flow-header">
              <span class="flow-icon">💻</span>
              <span class="flow-title">客户端</span>
              <span class="flow-desc">发起请求</span>
            </div>
            <div class="flow-body">
              <div v-if="requestData" class="req-preview">
                <div class="req-line">
                  <span class="req-method" :class="requestData.method">{{
                    requestData.method
                  }}</span>
                  <span class="req-url">{{ requestData.url }}</span>
                </div>
                <div v-if="requestData.body" class="req-body">
                  <pre>{{ requestData.body }}</pre>
                </div>
              </div>
              <div v-else class="flow-empty">等待请求...</div>
            </div>
          </div>

          <div
            class="flow-arrow"
            :class="{ 'arrow-lit': pulseArea === 'request' }"
          >
            <code class="arrow-label">HTTP Request</code>
            <span class="arrow-symbol">→</span>
          </div>

          <div
            class="flow-col flow-server"
            :class="{ 'flow-highlight': pulseArea === 'server' }"
          >
            <div class="flow-header">
              <span class="flow-icon">🖥️</span>
              <span class="flow-title">服务器</span>
              <span class="flow-desc">处理请求</span>
            </div>
            <div class="flow-body">
              <div v-if="serverStatus" class="server-status">
                <span class="status-icon">{{ serverStatus.icon }}</span>
                <span class="status-text">{{ serverStatus.text }}</span>
              </div>
              <div v-else class="flow-empty">等待中...</div>
            </div>
          </div>

          <div
            class="flow-arrow"
            :class="{ 'arrow-lit': pulseArea === 'response' }"
          >
            <code class="arrow-label">HTTP Response</code>
            <span class="arrow-symbol">←</span>
          </div>

          <div
            class="flow-col flow-response"
            :class="{ 'flow-highlight': pulseArea === 'response' }"
          >
            <div class="flow-header">
              <span class="flow-icon">📦</span>
              <span class="flow-title">响应</span>
              <span class="flow-desc">返回结果</span>
            </div>
            <div class="flow-body">
              <div v-if="responseData" class="res-preview">
                <div class="res-status" :class="responseData.statusClass">
                  {{ responseData.status }}
                </div>
                <div class="res-body">
                  <pre>{{ responseData.body }}</pre>
                </div>
              </div>
              <div v-else class="flow-empty">等待响应...</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="ar-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([
  { kind: 'dim', text: '// 点击下方按钮，模拟不同的 API 请求' }
])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref('点击命令按钮，观察一次完整的 API 请求-响应流程。')
const pulseArea = ref(null)

const requestData = ref(null)
const serverStatus = ref(null)
const responseData = ref(null)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = [
  {
    id: 'get-users',
    cmd: 'GET /api/users',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 获取用户列表' },
      { kind: 'grn', text: 'HTTP/1.1 200 OK' },
      { kind: 'dim', text: 'Content-Type: application/json' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 0, "data": { "items": [...] } }' }
    ],
    hint: 'GET 请求成功！状态码 200 表示请求正常。服务器返回了用户列表数据。',
    do: async () => {
      requestData.value = { method: 'GET', url: '/api/users' }
      pulseArea.value = 'client'
      await sleep(300)
      pulseArea.value = 'request'
      await sleep(300)
      serverStatus.value = { icon: '⚡', text: '查询数据库...' }
      pulseArea.value = 'server'
      await sleep(500)
      serverStatus.value = { icon: '✓', text: '处理完成' }
      pulseArea.value = 'response'
      await sleep(300)
      responseData.value = {
        status: '200 OK',
        statusClass: 'success',
        body: '{\n  "code": 0,\n  "data": {\n    "items": [\n      {"id": 1, "name": "张三"},\n      {"id": 2, "name": "李四"}\n    ]\n  }\n}'
      }
    }
  },
  {
    id: 'post-user',
    cmd: 'POST /api/users',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 创建新用户' },
      { kind: 'grn', text: 'HTTP/1.1 201 Created' },
      { kind: 'dim', text: 'Location: /api/users/3' },
      { kind: 'dim', text: '' },
      {
        kind: 'grn',
        text: '{ "code": 0, "data": { "id": 3, "name": "王五" } }'
      }
    ],
    hint: 'POST 创建成功！状态码 201 表示资源已创建，响应头 Location 指向新资源地址。',
    do: async () => {
      requestData.value = {
        method: 'POST',
        url: '/api/users',
        body: '{\n  "name": "王五",\n  "email": "wangwu@example.com"\n}'
      }
      pulseArea.value = 'client'
      await sleep(300)
      pulseArea.value = 'request'
      await sleep(300)
      serverStatus.value = { icon: '⚡', text: '验证数据...' }
      pulseArea.value = 'server'
      await sleep(400)
      serverStatus.value = { icon: '⚡', text: '写入数据库...' }
      await sleep(400)
      serverStatus.value = { icon: '✓', text: '创建成功' }
      pulseArea.value = 'response'
      await sleep(300)
      responseData.value = {
        status: '201 Created',
        statusClass: 'success',
        body: '{\n  "code": 0,\n  "data": {\n    "id": 3,\n    "name": "王五",\n    "email": "wangwu@example.com"\n  }\n}'
      }
    }
  },
  {
    id: 'get-404',
    cmd: 'GET /api/users/999',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 获取不存在的用户' },
      { kind: 'red', text: 'HTTP/1.1 404 Not Found' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10002, "message": "用户不存在" }' }
    ],
    hint: '404 错误！请求的资源不存在。客户端应该检查请求的 ID 是否正确。',
    do: async () => {
      requestData.value = { method: 'GET', url: '/api/users/999' }
      pulseArea.value = 'client'
      await sleep(300)
      pulseArea.value = 'request'
      await sleep(300)
      serverStatus.value = { icon: '🔍', text: '查找用户...' }
      pulseArea.value = 'server'
      await sleep(500)
      serverStatus.value = { icon: '✗', text: '未找到' }
      pulseArea.value = 'response'
      await sleep(300)
      responseData.value = {
        status: '404 Not Found',
        statusClass: 'error',
        body: '{\n  "code": 10002,\n  "message": "用户不存在"\n}'
      }
    }
  },
  {
    id: 'post-401',
    cmd: 'POST /api/orders (无Token)',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 未登录尝试下单' },
      { kind: 'red', text: 'HTTP/1.1 401 Unauthorized' },
      { kind: 'dim', text: 'WWW-Authenticate: Bearer' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10018, "message": "请先登录" }' }
    ],
    hint: '401 错误！需要身份认证。客户端应该引导用户登录后再重试。',
    do: async () => {
      requestData.value = {
        method: 'POST',
        url: '/api/orders',
        body: '{\n  "product_id": "P001",\n  "quantity": 2\n}'
      }
      pulseArea.value = 'client'
      await sleep(300)
      pulseArea.value = 'request'
      await sleep(300)
      serverStatus.value = { icon: '🔐', text: '验证身份...' }
      pulseArea.value = 'server'
      await sleep(400)
      serverStatus.value = { icon: '✗', text: '未授权' }
      pulseArea.value = 'response'
      await sleep(300)
      responseData.value = {
        status: '401 Unauthorized',
        statusClass: 'error',
        body: '{\n  "code": 10018,\n  "message": "请先登录"\n}'
      }
    }
  }
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  hint.value = ''
  typing.value = ''
  pulseArea.value = null
  requestData.value = null
  serverStatus.value = null
  responseData.value = null

  for (const ch of op.cmd) {
    typing.value += ch
    await sleep(18)
  }
  await sleep(80)
  lines.value.push({ kind: 'cmd', text: op.cmd })
  typing.value = ''
  await nextTick()
  scroll()
  await sleep(150)

  for (const l of op.output) {
    lines.value.push(l)
    await nextTick()
    scroll()
    await sleep(50)
  }

  await op.do()
  await sleep(120)
  hint.value = op.hint
  running.value = false
  setTimeout(() => {
    pulseArea.value = null
  }, 1500)
}

function scroll() {
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function reset() {
  lines.value = [{ kind: 'dim', text: '// 点击下方按钮，模拟不同的 API 请求' }]
  active.value = null
  pulseArea.value = null
  hint.value = '点击命令按钮，观察一次完整的 API 请求-响应流程。'
  typing.value = ''
  running.value = false
  requestData.value = null
  serverStatus.value = null
  responseData.value = null
}
</script>

<style scoped>
.ar-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.ar-layout {
  display: flex;
  align-items: stretch;
  gap: 0;
}

.ar-left {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.ar-right {
  width: 280px;
  flex-shrink: 0;
  border-left: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

@media (max-width: 768px) {
  .ar-layout {
    flex-direction: column;
  }
  .ar-right {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

.ar-terminal {
  background: #141420;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  background: #1e1e2e;
}
.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.r {
  background: #ff5f57;
}
.dot.y {
  background: #febc2e;
}
.dot.g {
  background: #28c840;
}
.term-title {
  margin-left: 8px;
  font-size: 0.72rem;
  color: #666;
  font-family: monospace;
}

.term-body {
  min-height: 120px;
  max-height: 180px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0.8rem 1rem;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.76rem;
  line-height: 1.65;
  color: #cdd6f4;
}
.t-line {
  display: flex;
  min-width: min-content;
}
.t-ps {
  color: #89b4fa;
  flex-shrink: 0;
}
.t-cmd {
  color: #cdd6f4;
}
.t-dim {
  color: #585b70;
}
.t-grn {
  color: #a6e3a1;
}
.t-red {
  color: #f38ba8;
}
.t-typing {
  color: #cdd6f4;
}
.t-cur {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.ar-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.ar-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.ar-btn code {
  font-size: 0.7rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.ar-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.ar-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.ar-btn--on code {
  color: var(--vp-c-brand);
}
.ar-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.ar-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.ar-btn--reset code {
  display: none;
}
.ar-btn--reset::after {
  content: '重置';
  font-size: 0.7rem;
  color: #585b70;
}

.ar-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  font-size: 0.75rem;
}

.flow-col {
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 60px;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
}
.flow-col.flow-highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand) 14%, transparent);
}
.flow-client {
  border-left: 4px solid #89b4fa;
}
.flow-server {
  border-left: 4px solid #f9e2af;
}
.flow-response {
  border-left: 4px solid #a6e3a1;
}

.flow-header {
  padding: 6px 8px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 6px;
}
.flow-icon {
  font-size: 0.9rem;
}
.flow-title {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}
.flow-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.flow-body {
  padding: 8px 10px;
  flex: 1;
  min-height: 48px;
}
.flow-empty {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.req-preview,
.res-preview {
  font-size: 0.72rem;
}
.req-line {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.req-method {
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 700;
  font-size: 0.68rem;
}
.req-method.GET {
  background: #22c55e22;
  color: #22c55e;
}
.req-method.POST {
  background: #3b82f622;
  color: #3b82f6;
}
.req-url {
  font-family: monospace;
  color: var(--vp-c-text-1);
}
.req-body pre,
.res-body pre {
  margin: 0;
  padding: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.65rem;
  line-height: 1.4;
  overflow-x: auto;
}

.server-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}
.status-icon {
  font-size: 1rem;
}
.status-text {
  color: var(--vp-c-text-2);
}

.res-status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.7rem;
  margin-bottom: 6px;
}
.res-status.success {
  background: #22c55e22;
  color: #22c55e;
}
.res-status.error {
  background: #ef444422;
  color: #ef4444;
}

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 0;
  opacity: 0.3;
  transition: opacity 0.3s;
}
.flow-arrow.arrow-lit {
  opacity: 1;
}
.arrow-label {
  font-size: 0.65rem;
  font-family: monospace;
  color: var(--vp-c-brand);
  white-space: nowrap;
}
.arrow-symbol {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
}

.ar-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
