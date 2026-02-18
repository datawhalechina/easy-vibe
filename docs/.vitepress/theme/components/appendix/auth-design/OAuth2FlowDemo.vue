<!--
  OAuth2FlowDemo.vue
  OAuth2 / OIDC 授权码流程（手动推进，更贴近真实接入）
-->
<template>
  <div class="oauth2-demo">
    <div class="header">
      <div class="title">
        🔑 OAuth2：第三方登录（授权码流程）
      </div>
      <div class="subtitle">
        用最常见的 Authorization Code Flow（建议配合
        PKCE）。默认手动推进，不自动下一步。
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
      <button
        class="btn"
        :disabled="!currentCmd"
        @click="copy(currentCmd)"
      >
        {{ copied ? '已复制' : '复制命令' }}
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
          角色
        </div>
        <div class="role">
          <div class="pill">
            Client（你的应用）
          </div>
          <div class="pill">
            Authorization Server（微信/Google 等）
          </div>
          <div class="pill">
            Resource Server（你的 API）
          </div>
        </div>
        <div class="desc">
          OAuth2
          的核心：<strong>你的应用不再保存用户在第三方的密码</strong>，而是拿到授权码/令牌后去换取用户信息。
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          本步要做什么
        </div>
        <div class="desc">
          {{ steps[step - 1]?.desc || '点击开始' }}
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

    <div class="card">
      <div class="card-title">
        请求/命令示例（可照抄）
      </div>
      <pre
        class="code"
      ><code>{{ currentCmd || '（点击开始后显示）' }}</code></pre>
      <div class="hint">
        这是“示例请求”，不是你电脑上真实发出去的请求；你可以把参数替换成自己的
        client_id / redirect_uri。
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        你真正需要记住的 4 件事
      </div>
      <ul class="list">
        <li>
          <strong>redirect_uri 必须白名单：</strong>避免被人把 code
          劫持到自己的站。
        </li>
        <li><strong>state 必须校验：</strong>防 CSRF（登录也会被 CSRF）。</li>
        <li><strong>code 只能用一次且很快过期：</strong>泄露影响有限。</li>
        <li>
          <strong>access token 要短 + refresh token 要保护：</strong>refresh
          token 更像“长期钥匙”。
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const maxStep = 6
const step = ref(0)
const copied = ref(false)

const params = {
  clientId: 'your_client_id',
  redirectUri: 'https://your.app/callback',
  scope: 'openid profile email',
  state: 'random_state_123',
  code: 'auth_code_xyz',
  codeVerifier: 'pkce_verifier_...',
  codeChallenge: 'pkce_challenge_...'
}

const steps = [
  {
    title: '1) 跳转到授权页',
    desc: '你的应用把用户重定向到授权服务器，让用户登录并授权。',
    warn: 'redirect_uri 必须白名单；state 用于防 CSRF。'
  },
  {
    title: '2) 用户授权',
    desc: '用户在第三方确认“允许此应用读取基本信息”。（这一步发生在第三方页面）'
  },
  {
    title: '3) 带 code 回调',
    desc: '授权服务器把用户带回 redirect_uri，并附上一次性的授权码 code。'
  },
  {
    title: '4) 用 code 换 token',
    desc: '你的后端（或移动端 + PKCE）调用 token endpoint，把 code 换成 access token。'
  },
  {
    title: '5) 用 token 拉取用户信息',
    desc: '携带 access token 请求 userinfo（或你自己业务的资源服务）。'
  },
  {
    title: '6) 建立你自己的登录态',
    desc: 'OAuth2 只解决“第三方授权”，你的系统还要创建自己的 session/JWT（并做授权）。',
    warn: '不要把第三方 access token 当作你系统的权限 token；两者用途不同。'
  }
]

const currentCmd = computed(() => {
  if (step.value === 0) return ''
  if (step.value === 1) {
    return `GET https://auth.server/authorize?response_type=code&client_id=${params.clientId}&redirect_uri=${encodeURIComponent(
      params.redirectUri
    )}&scope=${encodeURIComponent(params.scope)}&state=${params.state}&code_challenge=${params.codeChallenge}&code_challenge_method=S256`
  }
  if (step.value === 2) {
    return `（用户在授权页点击“同意/授权”）`
  }
  if (step.value === 3) {
    return `302 ${params.redirectUri}?code=${params.code}&state=${params.state}`
  }
  if (step.value === 4) {
    return `POST https://auth.server/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=${params.code}&
redirect_uri=${encodeURIComponent(params.redirectUri)}&
client_id=${params.clientId}&
code_verifier=${params.codeVerifier}`
  }
  if (step.value === 5) {
    return `GET https://auth.server/userinfo
Authorization: Bearer <access_token>`
  }
  return `你的后端：
1) 读取 userinfo（拿到第三方 user_id）
2) 在你系统里创建/绑定用户
3) 返回你自己的 session cookie 或 JWT`
})

const start = () => {
  step.value = 1
}

const next = () => {
  step.value = Math.min(maxStep, step.value + 1)
}

const prev = () => {
  step.value = Math.max(1, step.value - 1)
}

const reset = () => {
  step.value = 0
  copied.value = false
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 800)
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.oauth2-demo {
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

.role {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.pill {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  font-size: 0.85rem;
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

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

.list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
