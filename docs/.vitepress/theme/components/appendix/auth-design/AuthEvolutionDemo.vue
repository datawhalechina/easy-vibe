<!--
  AuthEvolutionDemo.vue
  鉴权方案演进（更可用：给出“什么时候用”）
-->
<template>
  <div class="auth-evolution-demo">
    <div class="header">
      <div class="title">
        🧭 鉴权方案演进：从 Basic 到 OAuth2
      </div>
      <div class="subtitle">
        点击卡片，快速建立“场景 → 方案”的直觉。
      </div>
    </div>

    <div class="timeline">
      <button
        v-for="s in stages"
        :key="s.id"
        class="stage"
        :class="{ active: activeId === s.id }"
        @click="activeId = s.id"
      >
        <div class="stage-top">
          <span class="icon">{{ s.icon }}</span>
          <span class="name">{{ s.name }}</span>
        </div>
        <div class="stage-sub">
          {{ s.when }}
        </div>
      </button>
    </div>

    <div class="card">
      <div class="card-title">
        {{ active.icon }} {{ active.name }}
      </div>
      <div class="desc">
        {{ active.desc }}
      </div>

      <div class="grid">
        <div class="box">
          <div class="box-title">
            ✅ 适合
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in active.pros"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>
        <div class="box">
          <div class="box-title">
            ⚠️ 主要风险
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in active.cons"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>
      </div>

      <pre class="code"><code>{{ active.example }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const stages = [
  {
    id: 'basic',
    icon: '🪪',
    name: 'HTTP Basic',
    when: '内部工具/调试',
    desc: '最早期的方案：每次请求都带 username/password（或等价凭证）。',
    pros: ['实现最简单', '不需要额外存储'],
    cons: ['每次请求都带“高价值凭证”', '不适合公网生产', '很难做细粒度授权'],
    example: `GET /api/profile
Authorization: Basic <base64(username:password)>`
  },
  {
    id: 'session',
    icon: '🍪',
    name: 'Session + Cookie',
    when: '传统 Web / SSR',
    desc: '服务端存 Session，浏览器存 cookie(session_id)。后续请求自动带 Cookie。',
    pros: ['服务端可主动注销', '很适合同域 SSR', '工程落地成熟'],
    cons: [
      '服务端有状态，需要共享/扩展',
      'CSRF 风险更高（必须防）',
      '跨域更麻烦'
    ],
    example: `POST /login
→ Set-Cookie: session_id=abc; HttpOnly; Secure; SameSite=Lax

GET /api/profile
Cookie: session_id=abc`
  },
  {
    id: 'jwt',
    icon: '🎫',
    name: 'JWT Access Token',
    when: 'API / 移动端 / 多服务',
    desc: '服务端不存状态，把声明编码为 token；请求携带 Authorization: Bearer。',
    pros: ['无状态易扩展', '跨域友好', '多服务常用'],
    cons: [
      '难以全局注销（要额外机制）',
      'token 体积大',
      'payload 可读（别放敏感信息）'
    ],
    example: `GET /api/profile
Authorization: Bearer <access_token>`
  },
  {
    id: 'oauth2',
    icon: '🔑',
    name: 'OAuth2 / OIDC',
    when: '第三方登录/授权',
    desc: '解决“第三方授权/登录”，让应用无需保存第三方账号密码。',
    pros: [
      '用户体验好（扫码/一键登录）',
      '安全边界更清晰',
      '可扩展到 OIDC（登录）'
    ],
    cons: [
      '接入复杂度更高',
      '必须正确处理 redirect_uri/state',
      'token 生命周期设计很关键'
    ],
    example: `GET /authorize?response_type=code&client_id=...&redirect_uri=...&state=...`
  }
]

const activeId = ref(stages[1].id)
const active = computed(
  () => stages.find((s) => s.id === activeId.value) || stages[0]
)
</script>

<style scoped>
.auth-evolution-demo {
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

.timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.stage {
  text-align: left;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.stage.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.stage-top {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.25rem;
}

.icon {
  font-size: 1.1rem;
}

.name {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.stage-sub {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.4;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.card-title {
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
  margin-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.box-title {
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .timeline {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
