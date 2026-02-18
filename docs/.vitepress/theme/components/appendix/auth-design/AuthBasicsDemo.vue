<!--
  AuthBasicsDemo.vue
  鉴权基础：你到底在“传什么”来证明身份？
-->
<template>
  <div class="auth-basics-demo">
    <div class="header">
      <div class="title">
        🧰 鉴权的 4 种常见“凭证”
      </div>
      <div class="subtitle">
        选一个方案，看看请求长什么样、优缺点是什么、最常见坑是什么。
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="m in methods"
        :key="m.id"
        class="tab"
        :class="{ active: current === m.id }"
        @click="current = m.id"
      >
        {{ m.name }}
        <span class="tag">{{ m.bestFor }}</span>
      </button>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          请求长什么样
        </div>
        <pre class="code"><code>{{ active.example }}</code></pre>
        <div class="hint">
          {{ active.note }}
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          什么时候用 / 不用
        </div>
        <div class="two">
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
              ⚠️ 不适合 / 风险
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
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        一句话口诀
      </div>
      <div class="desc">
        <strong>先认证（你是谁）</strong>，再授权（你能做什么）。凭证只是“证明身份的方式”，授权永远要在服务端执行。
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const methods = [
  {
    id: 'basic',
    name: 'HTTP Basic',
    bestFor: '内部工具',
    example: `GET /api/profile
Authorization: Basic <base64(username:password)>`,
    note: 'Base64 不是加密；必须配合 HTTPS，且不建议用于公网生产。',
    pros: ['最简单，所有客户端都支持', '适合内部/临时调试工具'],
    cons: [
      '每次请求都带密码（风险大）',
      '无法“注销”（除非服务端改密码）',
      '不适合现代业务'
    ]
  },
  {
    id: 'cookie',
    name: 'Session + Cookie',
    bestFor: '传统 Web',
    example: `POST /login
→ 200 OK
Set-Cookie: session_id=abc; HttpOnly; Secure; SameSite=Lax

GET /api/profile
Cookie: session_id=abc`,
    note: '浏览器会自动带 Cookie；因此一定要做 CSRF 防护（SameSite / CSRF Token）。',
    pros: ['服务端可控（可主动注销）', '适合 SSR/同域 Web', '实现直观'],
    cons: ['服务端有状态（需要共享 session）', '跨域复杂', '容易被 CSRF 影响']
  },
  {
    id: 'jwt',
    name: 'JWT Bearer',
    bestFor: 'API/移动端',
    example: `POST /login
→ { "access_token": "..." }

GET /api/profile
Authorization: Bearer <access_token>`,
    note: 'JWT payload 可解码；不要放敏感信息。建议短 access token + refresh token。',
    pros: ['无状态，易扩展', '跨域友好', '移动端/多服务常用'],
    cons: [
      '难以全局注销（需要额外机制）',
      'token 变大，每次都要带',
      '设计不好会导致权限失控'
    ]
  },
  {
    id: 'apikey',
    name: 'API Key',
    bestFor: '服务到服务',
    example: `GET /api/metrics
X-API-Key: <your_api_key>`,
    note: 'API Key 更像“门禁卡”，要配合限流、IP 白名单、轮换、最小权限。',
    pros: ['实现简单', '适合服务间/脚本访问', '易于轮换（如果设计得当）'],
    cons: ['通常缺少用户上下文', '泄露后影响大', '需要做权限/轮换/审计']
  }
]

const current = ref(methods[0].id)
const active = computed(
  () => methods.find((m) => m.id === current.value) || methods[0]
)
</script>

<style scoped>
.auth-basics-demo {
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

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.tab.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 600;
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

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
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

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .two {
    grid-template-columns: 1fr;
  }
}
</style>
