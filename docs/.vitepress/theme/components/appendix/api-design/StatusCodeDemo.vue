<template>
  <div class="sc-root">
    <div class="sc-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">HTTP 状态码演示</span>
      </div>
      <div ref="termEl" class="term-body">
        <div v-for="(l, i) in lines" :key="i" class="t-line">
          <span v-if="l.kind === 'cmd'" class="t-ps">&gt; </span>
          <span :class="'t-' + l.kind">{{ l.text }}</span>
        </div>
        <div class="t-line">
          <span class="t-ps">&gt; </span>
          <span class="t-typing">{{ typing }}<span class="t-cur">▋</span></span>
        </div>
      </div>
    </div>

    <div class="sc-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="['sc-btn', { 'sc-btn--on': active === op.id, 'sc-btn--dim': !op.ok() }]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="sc-btn sc-btn--reset" :disabled="running" @click="reset">重置</button>
    </div>

    <div class="sc-codes">
      <div class="code-section">
        <div class="section-header success">
          <span class="section-icon">✅</span>
          <span class="section-title">2xx 成功</span>
        </div>
        <div class="section-body">
          <div v-for="c in successCodes" :key="c.code" class="code-item" :class="{ active: activeCode === c.code }">
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="section-header client">
          <span class="section-icon">⚠️</span>
          <span class="section-title">4xx 客户端错误</span>
        </div>
        <div class="section-body">
          <div v-for="c in clientCodes" :key="c.code" class="code-item" :class="{ active: activeCode === c.code }">
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="section-header server">
          <span class="section-icon">🔴</span>
          <span class="section-title">5xx 服务端错误</span>
        </div>
        <div class="section-body">
          <div v-for="c in serverCodes" :key="c.code" class="code-item" :class="{ active: activeCode === c.code }">
            <span class="code-num">{{ c.code }}</span>
            <span class="code-name">{{ c.name }}</span>
            <span class="code-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="sc-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: '// 点击按钮查看不同状态码的含义' }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const activeCode = ref(null)
const hint = ref('点击命令按钮，了解常见的 HTTP 状态码。')

const successCodes = ref([
  { code: 200, name: 'OK', desc: '请求成功' },
  { code: 201, name: 'Created', desc: '创建成功' },
  { code: 204, name: 'No Content', desc: '成功但无返回内容' },
])

const clientCodes = ref([
  { code: 400, name: 'Bad Request', desc: '请求格式错误' },
  { code: 401, name: 'Unauthorized', desc: '未认证' },
  { code: 403, name: 'Forbidden', desc: '无权限' },
  { code: 404, name: 'Not Found', desc: '资源不存在' },
  { code: 422, name: 'Unprocessable', desc: '语义错误' },
  { code: 429, name: 'Too Many', desc: '请求过多' },
])

const serverCodes = ref([
  { code: 500, name: 'Server Error', desc: '服务器内部错误' },
  { code: 502, name: 'Bad Gateway', desc: '网关错误' },
  { code: 503, name: 'Unavailable', desc: '服务不可用' },
])

const sleep = ms => new Promise(r => setTimeout(r, ms))

const ops = [
  {
    id: '200',
    cmd: '200 OK',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 最常用的成功状态码' },
      { kind: 'grn', text: 'HTTP/1.1 200 OK' },
      { kind: 'dim', text: 'Content-Type: application/json' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 0, "data": { ... } }' },
    ],
    hint: '200 表示请求成功处理。GET 查询、PUT/PATCH 更新成功时常用。',
    do: () => { activeCode.value = 200 }
  },
  {
    id: '201',
    cmd: '201 Created',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 创建资源成功' },
      { kind: 'grn', text: 'HTTP/1.1 201 Created' },
      { kind: 'dim', text: 'Location: /api/users/123' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 0, "data": { "id": 123 } }' },
    ],
    hint: '201 表示资源创建成功。响应头 Location 指向新资源的地址。',
    do: () => { activeCode.value = 201 }
  },
  {
    id: '400',
    cmd: '400 Bad Request',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 客户端请求有问题' },
      { kind: 'red', text: 'HTTP/1.1 400 Bad Request' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10001, "message": "参数格式错误" }' },
    ],
    hint: '400 表示请求语法错误。比如 JSON 格式不对、缺少必填参数。',
    do: () => { activeCode.value = 400 }
  },
  {
    id: '401',
    cmd: '401 Unauthorized',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 需要登录认证' },
      { kind: 'red', text: 'HTTP/1.1 401 Unauthorized' },
      { kind: 'dim', text: 'WWW-Authenticate: Bearer' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10018, "message": "请先登录" }' },
    ],
    hint: '401 表示未认证。Token 过期、未登录时返回，客户端应引导用户登录。',
    do: () => { activeCode.value = 401 }
  },
  {
    id: '403',
    cmd: '403 Forbidden',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 已登录但无权限' },
      { kind: 'red', text: 'HTTP/1.1 403 Forbidden' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10021, "message": "需要管理员权限" }' },
    ],
    hint: '403 表示已认证但无权限。普通用户访问管理员接口时返回。',
    do: () => { activeCode.value = 403 }
  },
  {
    id: '404',
    cmd: '404 Not Found',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 资源不存在' },
      { kind: 'red', text: 'HTTP/1.1 404 Not Found' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10002, "message": "用户不存在" }' },
    ],
    hint: '404 表示请求的资源不存在。URL 错误或资源已被删除。',
    do: () => { activeCode.value = 404 }
  },
  {
    id: '500',
    cmd: '500 Server Error',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 服务器内部错误' },
      { kind: 'red', text: 'HTTP/1.1 500 Internal Server Error' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "code": 10000, "message": "服务器错误，请联系管理员" }' },
    ],
    hint: '500 表示服务器内部错误。代码 bug、数据库连接失败等，不要暴露堆栈信息！',
    do: () => { activeCode.value = 500 }
  },
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  activeCode.value = null
  hint.value = ''
  typing.value = ''

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

  op.do()
  await sleep(120)
  hint.value = op.hint
  running.value = false
}

function scroll() {
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function reset() {
  lines.value = [{ kind: 'dim', text: '// 点击按钮查看不同状态码的含义' }]
  active.value = null
  activeCode.value = null
  hint.value = '点击命令按钮，了解常见的 HTTP 状态码。'
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.sc-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.sc-terminal { background: #141420; }
.term-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  background: #1e1e2e;
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }
.term-title { margin-left: 8px; font-size: 0.72rem; color: #666; font-family: monospace; }

.term-body {
  min-height: 90px;
  max-height: 140px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0.7rem 1rem;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.76rem;
  line-height: 1.6;
  color: #cdd6f4;
}
.t-line { display: flex; min-width: min-content; }
.t-ps { color: #89b4fa; flex-shrink: 0; }
.t-cmd { color: #cdd6f4; }
.t-dim { color: #585b70; }
.t-grn { color: #a6e3a1; }
.t-red { color: #f38ba8; }
.t-typing { color: #cdd6f4; }
.t-cur { animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.sc-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.sc-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.sc-btn code { font-size: 0.68rem; color: #7f849c; font-family: monospace; white-space: nowrap; }
.sc-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); }
.sc-btn--on { border-color: var(--vp-c-brand) !important; }
.sc-btn--on code { color: var(--vp-c-brand); }
.sc-btn--dim { opacity: 0.3; cursor: not-allowed; }
.sc-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.sc-btn--reset code { display: none; }
.sc-btn--reset::after { content: '重置'; font-size: 0.7rem; color: #585b70; }

.sc-codes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.code-section {
  border-right: 1px solid var(--vp-c-divider);
}
.code-section:last-child {
  border-right: none;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  font-weight: 700;
  font-size: 0.8rem;
}
.section-header.success { background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg-alt)); color: #22c55e; }
.section-header.client { background: color-mix(in srgb, #f59e0b 8%, var(--vp-c-bg-alt)); color: #d97706; }
.section-header.server { background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg-alt)); color: #ef4444; }

.section-icon { font-size: 0.9rem; }
.section-title { font-size: 0.75rem; }

.section-body {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.code-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition: all 0.2s;
}
.code-item.active {
  border-color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 8%, var(--vp-c-bg));
}

.code-num {
  font-family: monospace;
  font-weight: 700;
  font-size: 0.75rem;
  min-width: 28px;
}
.code-item.active .code-num { color: var(--vp-c-brand); }

.code-name {
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.code-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.sc-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .sc-codes {
    grid-template-columns: 1fr;
  }
  .code-section {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .code-section:last-child {
    border-bottom: none;
  }
}
</style>
