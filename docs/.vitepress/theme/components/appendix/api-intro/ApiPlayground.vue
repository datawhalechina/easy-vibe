<!--
  ApiPlayground.vue
  参考 ide-intro 的“虚拟工具”风格：做一个极简 Postman。
  目标：可玩、可视化、少字段：
  - 选操作（拿/加/删）
  - 填一点（id 或 name）
  - 钥匙开关
  - 点发送 -> 看结果
-->
<template>
  <div class="wrap">
    <div class="head">
      <div class="title">练习场：一个“迷你 Postman”</div>
      <div class="sub">
        你不用懂代码。把它当成“按钮调试器”：按对了拿结果，按错了看失败原因。
      </div>
    </div>

    <div class="app">
      <div class="topbar">
        <div class="brand">API Console</div>
        <div class="toggles">
          <button :class="['toggle', { on: keyOn }]" @click="keyOn = !keyOn">
            钥匙：{{ keyOn ? '有' : '没有' }}
          </button>
          <button class="toggle" @click="reset">重置</button>
        </div>
      </div>

      <div class="main">
        <div class="left">
          <div class="panelTitle">① 选操作</div>
          <div class="ops">
            <button
              v-for="o in ops"
              :key="o.id"
              :class="['op', { active: opId === o.id }]"
              @click="setOp(o.id)"
            >
              <div class="opTitle">{{ o.label }}</div>
              <div class="opHint">{{ o.hint }}</div>
            </button>
          </div>
        </div>

        <div class="mid">
          <div class="panelTitle">② 填一点</div>
          <div class="form">
            <label class="row" v-if="opId !== 'list'">
              <span class="k">id</span>
              <input v-model="idText" class="input" placeholder="例如：u_123" />
            </label>
            <label class="row" v-if="opId === 'create'">
              <span class="k">name</span>
              <input
                v-model="nameText"
                class="input"
                placeholder="例如：Alice"
              />
            </label>
            <div class="tip">
              玩法：
              <span class="mono">钥匙=没有</span> 再发送一次；或者连续点 4
              次触发“太频繁”。
            </div>
          </div>

          <button class="send" :disabled="busy" @click="send">
            {{ busy ? '发送中…' : '③ 发送（模拟）' }}
          </button>

          <details class="details">
            <summary>（选看）这一次你“相当于”发了什么</summary>
            <pre class="code"><code>{{ pseudo }}</code></pre>
          </details>
        </div>

        <div class="right">
          <div class="panelTitle">④ 返回结果</div>
          <div v-if="!res" class="muted">还没有结果。点“发送”。</div>
          <div v-else class="resBox" :class="{ ok: res.ok, bad: !res.ok }">
            <div class="badge">{{ res.ok ? '成功' : '失败' }}</div>
            <div class="resText">{{ res.text }}</div>
            <pre v-if="res.data" class="code"><code>{{ res.data }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const ops = [
  { id: 'list', label: '拿列表（GET）', hint: '不改数据' },
  { id: 'get', label: '拿一个（GET）', hint: '需要 id' },
  { id: 'create', label: '加一个（POST）', hint: '需要 name' },
  { id: 'delete', label: '删一个（DELETE）', hint: '需要 id' }
]

const opId = ref('list')
const keyOn = ref(true)
const idText = ref('u_123')
const nameText = ref('Alice')
const busy = ref(false)
const res = ref(null)
const callTimes = ref([])

const pseudo = computed(() => {
  const key = keyOn.value ? "X-Api-Key: '****'" : '(没有钥匙)'
  if (opId.value === 'list') return `GET /v1/users\n${key}`
  if (opId.value === 'get')
    return `GET /v1/users/${idText.value || '{id}'}\n${key}`
  if (opId.value === 'create')
    return `POST /v1/users\n${key}\nBody: { name: '${nameText.value || ''}' }`
  return `DELETE /v1/users/${idText.value || '{id}'}\n${key}`
})

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function setOp(id) {
  opId.value = id
  res.value = null
}

function reset() {
  opId.value = 'list'
  keyOn.value = true
  idText.value = 'u_123'
  nameText.value = 'Alice'
  res.value = null
  callTimes.value = []
}

async function send() {
  if (busy.value) return
  busy.value = true
  res.value = null

  const now = Date.now()
  callTimes.value = callTimes.value.filter((t) => now - t < 1200)
  callTimes.value.push(now)
  if (callTimes.value.length >= 4) {
    await sleep(180)
    res.value = { ok: false, text: '太频繁了，请慢一点（模拟）' }
    busy.value = false
    return
  }

  await sleep(300)

  if (!keyOn.value) {
    res.value = { ok: false, text: '没有钥匙（没权限，模拟）' }
    busy.value = false
    return
  }

  if (opId.value === 'list') {
    res.value = {
      ok: true,
      text: '拿到列表（模拟）',
      data: JSON.stringify(
        {
          data: [
            { id: 'u_123', name: 'Alice' },
            { id: 'u_124', name: 'Bob' }
          ]
        },
        null,
        2
      )
    }
    busy.value = false
    return
  }

  if (opId.value === 'get') {
    const id = String(idText.value || '').trim()
    if (!id) {
      res.value = { ok: false, text: '你还没填 id' }
      busy.value = false
      return
    }
    if (id === 'u_404') {
      res.value = { ok: false, text: '找不到这个 id（模拟）' }
      busy.value = false
      return
    }
    res.value = {
      ok: true,
      text: `拿到用户 ${id}（模拟）`,
      data: JSON.stringify({ id, name: 'Alice' }, null, 2)
    }
    busy.value = false
    return
  }

  if (opId.value === 'create') {
    const name = String(nameText.value || '').trim()
    if (!name) {
      res.value = { ok: false, text: '你还没填 name' }
      busy.value = false
      return
    }
    res.value = {
      ok: true,
      text: `创建成功（模拟）`,
      data: JSON.stringify({ id: 'u_789', name }, null, 2)
    }
    busy.value = false
    return
  }

  // delete
  const id = String(idText.value || '').trim()
  if (!id) {
    res.value = { ok: false, text: '你还没填 id' }
    busy.value = false
    return
  }
  res.value = { ok: true, text: `删除成功：${id}（模拟）` }
  busy.value = false
}
</script>

<style scoped>
.wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
}

.head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-weight: 900;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.sub {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.app {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.brand {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.toggles {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.toggle {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
}

.toggle.on {
  border-color: var(--vp-c-brand-1);
}

.main {
  padding: 12px;
  display: grid;
  grid-template-columns: 0.9fr 1fr 1.1fr;
  gap: 12px;
}

.left,
.mid,
.right {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 12px;
}

.panelTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.ops {
  margin-top: 10px;
  display: grid;
  gap: 10px;
}

.op {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 12px;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
}

.op.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
}

.opTitle {
  font-weight: 900;
  font-size: 13px;
}

.opHint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.form {
  margin-top: 10px;
  display: grid;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 10px;
  align-items: center;
}

.k {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 900;
}

.input {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 8px 10px;
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.send {
  margin-top: 12px;
  width: 100%;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 900;
  cursor: pointer;
}

.send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tip {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.mono {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
}

.details {
  margin-top: 12px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
}

.details summary {
  cursor: pointer;
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.muted {
  margin-top: 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.resBox {
  margin-top: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
}

.resBox.ok {
  border-color: color-mix(in srgb, #22c55e 45%, var(--vp-c-divider));
}

.resBox.bad {
  border-color: color-mix(in srgb, #ef4444 45%, var(--vp-c-divider));
}

.badge {
  display: inline-block;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 900;
}

.resText {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.code {
  margin: 8px 0 0;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .main {
    grid-template-columns: 1fr;
  }
}
</style>
