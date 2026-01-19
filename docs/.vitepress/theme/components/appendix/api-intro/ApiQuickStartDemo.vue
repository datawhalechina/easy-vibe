<!--
  ApiQuickStartDemo.vue
  参考 ide-intro 的“虚拟 UI + 先玩再讲”风格。
  目标：0 基础读者能立刻理解 API = 按钮/入口：
  选择按钮 -> 填一点 -> 点一下 -> 看结果（成功/失败）。
-->
<template>
  <div class="machine">
    <div class="top">
      <div>
        <div class="title">先玩一下：把 API 当成一个“按钮机”</div>
        <div class="sub">你只管：选按钮、填信息、点一下。别背术语。</div>
      </div>
      <div class="legend">
        <span class="dot in" /> 你填的信息
        <span class="dot mid" /> “按钮”（API） <span class="dot out" /> 返回结果
      </div>
    </div>

    <div class="screen">
      <div class="left">
        <div class="panelTitle">① 选一个按钮</div>
        <div class="buttons">
          <button
            v-for="b in buttons"
            :key="b.id"
            :class="['bigBtn', { active: currentId === b.id }]"
            @click="select(b.id)"
          >
            <div class="icon">{{ b.icon }}</div>
            <div class="label">{{ b.label }}</div>
            <div class="hint">{{ b.hint }}</div>
          </button>
        </div>
      </div>

      <div class="middle">
        <div class="panelTitle">② 填一点信息</div>

        <div class="form" v-if="currentId === 'date'">
          <label class="row">
            <span class="k">日期</span>
            <input
              v-model="form.dateText"
              class="input"
              placeholder="2026-01-19"
            />
          </label>
          <div class="row">
            <span class="k">格式</span>
            <div class="chips">
              <button
                v-for="f in formats"
                :key="f"
                :class="['chip', { active: form.dateFormat === f }]"
                @click="form.dateFormat = f"
              >
                {{ f }}
              </button>
            </div>
          </div>
          <div class="tip">玩法：把日期写错试试（比如 2026-99-99）。</div>
        </div>

        <div class="form" v-else-if="currentId === 'ai'">
          <label class="row">
            <span class="k">问题</span>
            <textarea
              v-model="form.question"
              class="textarea"
              placeholder="例如：用一句话解释什么是 API"
            />
          </label>
          <div class="tip">玩法：清空问题再点一下，看看会发生什么。</div>
        </div>

        <div class="form" v-else>
          <div class="row">
            <span class="k">选择</span>
            <div class="chips">
              <button
                :class="['chip', { active: form.loginOk }]"
                @click="form.loginOk = true"
              >
                同意
              </button>
              <button
                :class="['chip', { active: !form.loginOk }]"
                @click="form.loginOk = false"
              >
                取消
              </button>
            </div>
          </div>
          <div class="tip">玩法：选“取消”，再点一下。</div>
        </div>

        <div class="callBar">
          <button class="callBtn" :disabled="busy" @click="call">
            {{ busy ? '执行中…' : '③ 点一下（调用）' }}
          </button>
          <button class="ghost" :disabled="busy" @click="resetScore">
            清零计分
          </button>
        </div>

        <div class="score">
          <div class="scoreItem">
            <div class="scoreK">成功</div>
            <div class="scoreV">{{ score.ok }}</div>
          </div>
          <div class="scoreItem">
            <div class="scoreK">失败</div>
            <div class="scoreV">{{ score.bad }}</div>
          </div>
          <div class="scoreItem">
            <div class="scoreK">连续成功</div>
            <div class="scoreV">{{ score.streak }}</div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="panelTitle">④ 看结果</div>

        <div class="flow">
          <div class="node">
            <div class="nodeTop">
              <span class="dot in" />
              <span class="nodeTitle">你填的信息</span>
            </div>
            <div class="nodeBody">{{ requestPreview }}</div>
          </div>
          <div class="arrow" :class="{ go: animating }">→</div>
          <div class="node">
            <div class="nodeTop">
              <span class="dot mid" />
              <span class="nodeTitle">按钮（API）</span>
            </div>
            <div class="nodeBody">{{ currentHow }}</div>
          </div>
          <div class="arrow" :class="{ go: animating }">→</div>
          <div class="node">
            <div class="nodeTop">
              <span class="dot out" />
              <span class="nodeTitle">返回结果</span>
            </div>
            <div class="nodeBody">
              <div v-if="!result" class="muted">
                还没有结果。点一下“调用”试试。
              </div>
              <div
                v-else
                class="resultBox"
                :class="{ ok: result.ok, bad: !result.ok }"
              >
                <div class="badge">{{ result.ok ? '成功' : '失败' }}</div>
                <div class="resultText">{{ result.text }}</div>
                <pre
                  v-if="result.debug"
                  class="code"
                ><code>{{ result.debug }}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <details class="details">
          <summary>（选看）你不用管的细节</summary>
          <ul class="list">
            <li v-for="x in currentDetails" :key="x">{{ x }}</li>
          </ul>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const buttons = [
  {
    id: 'date',
    icon: '🗓️',
    label: '日期格式化',
    hint: '最简单：填日期 -> 得到结果',
    how: '调用一个日期格式化函数（本地）',
    details: ['内部怎么处理时区', '怎么优化性能', '怎么兼容不同语言环境']
  },
  {
    id: 'ai',
    icon: '🤖',
    label: '问 AI（模拟）',
    hint: '写一句话 -> 得到回答',
    how: '调用一个“问答入口”（可能是 SDK 或 HTTP）',
    details: ['模型怎么训练', '服务端怎么排队', '怎么限流/重试']
  },
  {
    id: 'login',
    icon: '🔑',
    label: '一键登录（模拟）',
    hint: '点同意/取消 -> 得到结果',
    how: '按登录流程走一遍（这里用模拟）',
    details: ['它怎么做安全校验', '登录凭证怎么生成', '怎么风控']
  }
]

const formats = ['YYYY-MM-DD', 'YYYY/MM/DD', 'MM-DD']

const currentId = ref('date')
const busy = ref(false)
const animating = ref(false)

const form = reactive({
  dateText: '2026-01-19',
  dateFormat: 'YYYY-MM-DD',
  question: '用一句话解释什么是 API',
  loginOk: true
})

const score = reactive({ ok: 0, bad: 0, streak: 0 })
const result = ref(null)

const callTimes = ref([]) // for "too frequent"

const current = computed(
  () => buttons.find((b) => b.id === currentId.value) || buttons[0]
)

const currentHow = computed(() => current.value.how)
const currentDetails = computed(() => current.value.details || [])

const requestPreview = computed(() => {
  if (currentId.value === 'date') {
    return `日期=${form.dateText || '(空)'}；格式=${form.dateFormat}`
  }
  if (currentId.value === 'ai') {
    return `问题=${(form.question || '').trim() || '(空)'}`
  }
  return `选择=${form.loginOk ? '同意' : '取消'}`
})

function select(id) {
  currentId.value = id
  result.value = null
}

function resetScore() {
  score.ok = 0
  score.bad = 0
  score.streak = 0
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

function fmtDate(d, fmt) {
  const y = d.getFullYear()
  const m = pad2(d.getMonth() + 1)
  const day = pad2(d.getDate())
  if (fmt === 'YYYY/MM/DD') return `${y}/${m}/${day}`
  if (fmt === 'MM-DD') return `${m}-${day}`
  return `${y}-${m}-${day}`
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function record(ok) {
  if (ok) {
    score.ok += 1
    score.streak += 1
  } else {
    score.bad += 1
    score.streak = 0
  }
}

async function call() {
  if (busy.value) return
  busy.value = true
  animating.value = true

  // simulate "too frequent"
  const now = Date.now()
  callTimes.value = callTimes.value.filter((t) => now - t < 1200)
  callTimes.value.push(now)
  if (callTimes.value.length >= 4) {
    await sleep(220)
    result.value = {
      ok: false,
      text: '太频繁了，请慢一点再试（模拟）',
      debug: '现实里：有些 API 会限制你“点太快”。'
    }
    record(false)
    animating.value = false
    busy.value = false
    return
  }

  await sleep(380)

  if (currentId.value === 'date') {
    const raw = String(form.dateText || '').trim()
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) {
      result.value = {
        ok: false,
        text: '日期写错了（我看不懂）',
        debug: `输入：${raw}`
      }
      record(false)
      animating.value = false
      busy.value = false
      return
    }
    const out = fmtDate(d, form.dateFormat)
    result.value = {
      ok: true,
      text: `结果：${out}`,
      debug: `你填的：${raw}\n你选的格式：${form.dateFormat}\n它给你的：${out}`
    }
    record(true)
    animating.value = false
    busy.value = false
    return
  }

  if (currentId.value === 'ai') {
    const q = String(form.question || '').trim()
    if (!q) {
      result.value = { ok: false, text: '你还没写问题', debug: '' }
      record(false)
      animating.value = false
      busy.value = false
      return
    }
    result.value = {
      ok: true,
      text: '回答：API 就是“别的软件给你用的按钮/入口”。',
      debug: `你的问题：${q}\n回答：API 就是“别的软件给你用的按钮/入口”。`
    }
    record(true)
    animating.value = false
    busy.value = false
    return
  }

  // login
  if (!form.loginOk) {
    result.value = { ok: false, text: '用户取消了登录（模拟）', debug: '' }
    record(false)
    animating.value = false
    busy.value = false
    return
  }
  result.value = {
    ok: true,
    text: '登录成功：拿到用户信息（模拟）',
    debug: '用户：Alice\n状态：成功'
  }
  record(true)
  animating.value = false
  busy.value = false
}
</script>

<style scoped>
.machine {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
}

.top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.title {
  font-weight: 900;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.sub {
  margin-top: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.legend {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
  border: 1px solid var(--vp-c-divider);
}

.dot.in {
  background: color-mix(in srgb, #60a5fa 40%, var(--vp-c-bg));
}

.dot.mid {
  background: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-bg));
}

.dot.out {
  background: color-mix(in srgb, #22c55e 30%, var(--vp-c-bg));
}

.screen {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1.05fr 1fr 1.2fr;
  gap: 12px;
}

.panelTitle {
  font-weight: 800;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.left,
.middle,
.right {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 12px;
}

.buttons {
  margin-top: 10px;
  display: grid;
  gap: 10px;
}

.bigBtn {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 12px;
  padding: 12px;
  text-align: left;
  cursor: pointer;
}

.bigBtn:hover {
  border-color: var(--vp-c-brand-1);
}

.bigBtn.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
}

.icon {
  font-size: 18px;
}

.label {
  margin-top: 6px;
  font-weight: 900;
  font-size: 13px;
}

.hint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
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
  align-items: start;
}

.k {
  font-size: 12px;
  color: var(--vp-c-text-3);
  padding-top: 8px;
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

.textarea {
  width: 100%;
  min-height: 78px;
  resize: vertical;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 8px 10px;
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.5;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
}

.chip.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
}

.tip {
  margin-top: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.callBar {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.callBtn {
  flex: 1;
  min-width: 200px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 900;
  cursor: pointer;
}

.ghost {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 900;
  cursor: pointer;
}

.callBtn:disabled,
.ghost:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.score {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.scoreItem {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
}

.scoreK {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.scoreV {
  margin-top: 4px;
  font-size: 18px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.flow {
  margin-top: 10px;
  display: grid;
  gap: 10px;
}

.node {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.nodeTop {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.nodeTitle {
  font-weight: 900;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.nodeBody {
  padding: 10px 12px;
  font-size: 12px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-weight: 900;
  font-size: 16px;
  transition: transform 180ms ease;
}

.arrow.go {
  transform: translateX(6px);
  color: var(--vp-c-brand-1);
}

.muted {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.resultBox {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 10px 12px;
}

.resultBox.ok {
  border-color: color-mix(in srgb, #22c55e 45%, var(--vp-c-divider));
}

.resultBox.bad {
  border-color: color-mix(in srgb, #ef4444 45%, var(--vp-c-divider));
}

.badge {
  display: inline-block;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-weight: 900;
}

.resultText {
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
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--vp-c-text-1);
}

.details {
  margin-top: 12px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 10px 12px;
}

.details summary {
  cursor: pointer;
  color: var(--vp-c-text-1);
  font-weight: 900;
  font-size: 13px;
}

.list {
  margin: 10px 0 0;
  padding-left: 16px;
  color: var(--vp-c-text-1);
  font-size: 12px;
  line-height: 1.6;
}

@media (max-width: 720px) {
  .top {
    flex-direction: column;
  }
  .screen {
    grid-template-columns: 1fr;
  }
  .score {
    grid-template-columns: 1fr;
  }
}
</style>
