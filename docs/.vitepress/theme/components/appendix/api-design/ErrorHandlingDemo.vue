<template>
  <div class="eh-root">
    <div class="eh-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">错误处理演示</span>
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

    <div class="eh-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="['eh-btn', { 'eh-btn--on': active === op.id, 'eh-btn--dim': !op.ok() }]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="eh-btn eh-btn--reset" :disabled="running" @click="reset">重置</button>
    </div>

    <div class="eh-response">
      <div class="res-header">
        <span class="res-label">响应结构</span>
        <span class="res-status" :class="responseStatus">{{ responseStatus }}</span>
      </div>
      <div class="res-body">
        <pre v-if="responseData">{{ responseData }}</pre>
        <div v-else class="res-empty">点击上方按钮查看错误响应示例</div>
      </div>
    </div>

    <div v-if="hint" class="eh-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: '// 对比好的和差的错误处理方式' }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref('点击按钮，对比"好的"和"差的"错误响应设计。')
const responseData = ref('')
const responseStatus = ref('')

const sleep = ms => new Promise(r => setTimeout(r, ms))

const ops = [
  {
    id: 'bad1',
    cmd: '❌ 差: 所有错误都 200',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// HTTP 200 但业务失败' },
      { kind: 'yel', text: 'HTTP/1.1 200 OK' },
      { kind: 'dim', text: '' },
      { kind: 'yel', text: '{ "error": "出错了" }' },
    ],
    hint: '问题：HTTP 状态码说"成功"，但业务说"出错"。缓存层会缓存这个"成功"响应，监控系统也发现不了问题。',
    do: () => {
      responseStatus.value = '200 (错误)'
      responseData.value = `{
  "error": "出错了"
}`
    }
  },
  {
    id: 'bad2',
    cmd: '❌ 差: 错误信息太笼统',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 错误信息没有帮助' },
      { kind: 'red', text: 'HTTP/1.1 400 Bad Request' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "message": "参数错误" }' },
    ],
    hint: '问题：客户端不知道哪个参数错了、为什么错。用户只能看到"参数错误"，无法修正。',
    do: () => {
      responseStatus.value = '400'
      responseData.value = `{
  "message": "参数错误"
}`
    }
  },
  {
    id: 'bad3',
    cmd: '❌ 差: 暴露敏感信息',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 500 错误暴露堆栈' },
      { kind: 'red', text: 'HTTP/1.1 500 Internal Server Error' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '{ "error": "TypeError: Cannot read property..." }' },
      { kind: 'red', text: '{ "stack": "at UserService.login..." }' },
      { kind: 'red', text: '{ "sql": "SELECT * FROM users WHERE..." }' },
    ],
    hint: '危险！暴露了代码结构、数据库查询。攻击者可以利用这些信息进行攻击。',
    do: () => {
      responseStatus.value = '500'
      responseData.value = `{
  "error": "TypeError: Cannot read property 'id' of undefined",
  "stack": "at UserService.login (src/service.js:45)",
  "sql": "SELECT * FROM users WHERE email='...'"
}`
    }
  },
  {
    id: 'good1',
    cmd: '✅ 好: 正确的状态码',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// HTTP 状态码准确表达错误类型' },
      { kind: 'grn', text: 'HTTP/1.1 404 Not Found' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 10002, "message": "用户不存在" }' },
    ],
    hint: '正确！404 表示资源不存在，客户端一看就知道问题所在。',
    do: () => {
      responseStatus.value = '404'
      responseData.value = `{
  "code": 10002,
  "message": "用户不存在",
  "request_id": "req-550e8400"
}`
    }
  },
  {
    id: 'good2',
    cmd: '✅ 好: 详细的错误信息',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 错误信息帮助定位问题' },
      { kind: 'grn', text: 'HTTP/1.1 422 Unprocessable Entity' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 20003, "message": "密码强度不足" }' },
      { kind: 'grn', text: '{ "errors": [{ "field": "password", ... }] }' },
    ],
    hint: '正确！提供了错误码、字段级别的错误详情，前端可以精确提示用户。',
    do: () => {
      responseStatus.value = '422'
      responseData.value = `{
  "code": 20003,
  "message": "密码强度不足",
  "errors": [
    {
      "field": "password",
      "code": "VALIDATION_ERROR",
      "message": "密码必须包含至少 1 个大写字母、1 个小写字母、1 个数字"
    }
  ],
  "request_id": "req-550e8400"
}`
    }
  },
  {
    id: 'good3',
    cmd: '✅ 好: 安全的错误响应',
    ok: () => true,
    output: [
      { kind: 'dim', text: '// 500 只返回错误 ID' },
      { kind: 'grn', text: 'HTTP/1.1 500 Internal Server Error' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '{ "code": 10000, "message": "服务器错误" }' },
      { kind: 'grn', text: '{ "error_id": "err-a1b2c3d4" }' },
    ],
    hint: '正确！只返回错误 ID，详细日志记录在服务器。用户反馈错误 ID，技术人员可以快速定位。',
    do: () => {
      responseStatus.value = '500'
      responseData.value = `{
  "code": 10000,
  "message": "服务器内部错误，请联系管理员",
  "error_id": "err-a1b2c3d4",
  "request_id": "req-550e8400",
  "help_url": "https://docs.example.com/errors/10000"
}`
    }
  },
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  hint.value = ''
  typing.value = ''
  responseData.value = ''
  responseStatus.value = ''

  for (const ch of op.cmd) {
    typing.value += ch
    await sleep(15)
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
  lines.value = [{ kind: 'dim', text: '// 对比好的和差的错误处理方式' }]
  active.value = null
  hint.value = '点击按钮，对比"好的"和"差的"错误响应设计。'
  typing.value = ''
  running.value = false
  responseData.value = ''
  responseStatus.value = ''
}
</script>

<style scoped>
.eh-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.eh-terminal { background: #141420; }
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
  min-height: 100px;
  max-height: 160px;
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
.t-yel { color: #f9e2af; }
.t-typing { color: #cdd6f4; }
.t-cur { animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.eh-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.eh-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.eh-btn code { font-size: 0.68rem; color: #7f849c; font-family: monospace; white-space: nowrap; }
.eh-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); }
.eh-btn--on { border-color: var(--vp-c-brand) !important; }
.eh-btn--on code { color: var(--vp-c-brand); }
.eh-btn--dim { opacity: 0.3; cursor: not-allowed; }
.eh-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.eh-btn--reset code { display: none; }
.eh-btn--reset::after { content: '重置'; font-size: 0.7rem; color: #585b70; }

.eh-response {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.res-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}
.res-label { font-weight: 700; font-size: 0.8rem; color: var(--vp-c-text-1); }
.res-status {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}
.res-status\.200\ \(错误\) { background: #f9e2af22; color: #d97706; }
.res-status\.400 { background: #f59e0b22; color: #d97706; }
.res-status\.404 { background: #3b82f622; color: #3b82f6; }
.res-status\.422 { background: #8b5cf622; color: #8b5cf6; }
.res-status\.500 { background: #ef444422; color: #ef4444; }

.res-body {
  padding: 12px;
  min-height: 80px;
}
.res-body pre {
  margin: 0;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.72rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-break: break-all;
}
.res-empty {
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.8rem;
}

.eh-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
