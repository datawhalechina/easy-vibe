<!--
  SessionCookieDemo.vue
  Session + Cookie（手动推进，更贴近真实 Web 登录态）
-->
<template>
  <div class="session-demo">
    <div class="header">
      <div class="title">
        🍪 Session + Cookie：有状态登录
      </div>
      <div class="subtitle">
        默认手动推进：先看清楚状态再进入下一步（避免“自动下一步”误解）。
      </div>
    </div>

    <div class="controls">
      <button
        class="btn primary"
        :disabled="step !== 0"
        @click="start"
      >
        开始
      </button>
      <button
        class="btn"
        :disabled="step <= 1"
        @click="prev"
      >
        上一步
      </button>
      <button
        class="btn primary"
        :disabled="step === 0 || step >= maxStep"
        @click="next"
      >
        下一步
      </button>
      <button
        class="btn"
        @click="reset"
      >
        重置
      </button>
    </div>

    <div
      v-if="step > 0"
      class="progress"
    >
      Step {{ step }} / {{ maxStep }} · {{ steps[step - 1]?.title }}
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          浏览器（客户端）
        </div>
        <div class="box">
          <div class="box-title">
            Cookie Jar
          </div>
          <div
            v-if="cookie"
            class="kv"
          >
            <div class="k">
              session_id
            </div>
            <div class="v mono">
              {{ cookie }}
            </div>
          </div>
          <div
            v-else
            class="empty"
          >
            暂无 Cookie
          </div>
        </div>

        <div class="box">
          <div class="box-title">
            本步请求
          </div>
          <pre class="code"><code>{{ clientRequest }}</code></pre>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          服务器
        </div>
        <div class="box">
          <div class="box-title">
            Session Store（Redis/Memory）
          </div>
          <div
            v-if="session"
            class="kv"
          >
            <div class="k mono">
              {{ cookie }}
            </div>
            <div class="v">
              <div class="row">
                <span class="muted">user_id</span> 123
              </div>
              <div class="row">
                <span class="muted">username</span> alice
              </div>
              <div class="row">
                <span class="muted">role</span> admin
              </div>
            </div>
          </div>
          <div
            v-else
            class="empty"
          >
            暂无 Session
          </div>
        </div>

        <div class="box">
          <div class="box-title">
            本步响应
          </div>
          <pre class="code"><code>{{ serverResponse }}</code></pre>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        {{ steps[step - 1]?.title || '流程说明' }}
      </div>
      <div class="desc">
        {{ steps[step - 1]?.desc }}
      </div>
      <div
        v-if="steps[step - 1]?.warn"
        class="warn"
      >
        <div class="warn-title">
          注意
        </div>
        <div class="warn-text">
          {{ steps[step - 1]?.warn }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const maxStep = 5
const step = ref(0)

const cookie = ref('')
const session = ref(false)

const steps = [
  {
    title: '1) 登录请求（POST /login）',
    desc: '用户提交用户名/密码，服务器验证成功后创建 Session。'
  },
  {
    title: '2) 服务器 Set-Cookie',
    desc: '服务器返回 Set-Cookie: session_id=...；浏览器保存 Cookie。',
    warn: 'Cookie 建议加 HttpOnly + Secure + SameSite；同时要考虑 CSRF 防护。'
  },
  {
    title: '3) 后续请求自动带 Cookie',
    desc: '浏览器对同域请求会自动带上 Cookie，服务器用 session_id 查 Session。'
  },
  {
    title: '4) 授权判断（role/权限）',
    desc: '认证（你是谁）之后，仍需要授权（你能做什么）。比如 admin 才能访问管理接口。'
  },
  {
    title: '5) 注销',
    desc: '服务器删除 Session（或让其过期），并让浏览器清理 Cookie。'
  }
]

const start = () => {
  step.value = 1
  cookie.value = ''
  session.value = false
}

const next = () => {
  step.value = Math.min(maxStep, step.value + 1)
  applyState()
}

const prev = () => {
  step.value = Math.max(1, step.value - 1)
  applyState()
}

const reset = () => {
  step.value = 0
  cookie.value = ''
  session.value = false
}

const applyState = () => {
  if (step.value <= 1) {
    cookie.value = ''
    session.value = false
    return
  }
  if (step.value >= 2) {
    if (!cookie.value)
      cookie.value = 'sess_' + Math.random().toString(36).slice(2, 10)
    session.value = true
  }
  if (step.value >= 5) {
    // logout (show as empty state by step title/response)
    // We don't auto-clear state; keep it visible until reset to avoid “auto” confusion.
  }
}

const clientRequest = computed(() => {
  if (step.value === 0) return '（点击开始）'
  if (step.value === 1) {
    return `POST /login
Content-Type: application/json

{"username":"alice","password":"******"}`
  }
  if (step.value === 2) return '（等待服务器响应并写入 Cookie）'
  if (step.value === 3) {
    return `GET /api/user/profile
Cookie: session_id=${cookie.value}`
  }
  if (step.value === 4) {
    return `GET /api/admin/users
Cookie: session_id=${cookie.value}`
  }
  return `POST /logout
Cookie: session_id=${cookie.value}`
})

const serverResponse = computed(() => {
  if (step.value === 0) return ''
  if (step.value === 1) return '200 OK (credentials valid)'
  if (step.value === 2) {
    return `200 OK
Set-Cookie: session_id=${cookie.value}; HttpOnly; Secure; SameSite=Lax`
  }
  if (step.value === 3) return '200 OK (profile payload...)'
  if (step.value === 4)
    return '200 OK (admin data...) / 403 Forbidden (if not admin)'
  return `200 OK
Set-Cookie: session_id=; Max-Age=0`
})
</script>

<style scoped>
.session-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.btn {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.box-title {
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.empty {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.kv {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.75rem;
  align-items: start;
}

.k {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.v {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.row {
  display: flex;
  gap: 0.5rem;
}

.muted {
  color: var(--vp-c-text-3);
  min-width: 72px;
}

.mono {
  font-family: var(--vp-font-family-mono);
  word-break: break-all;
}

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.warn {
  margin-top: 0.75rem;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.18);
  background: rgba(var(--vp-c-brand-rgb), 0.06);
  border-radius: 6px;
  padding: 0.75rem;
}

.warn-title {
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.warn-text {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
