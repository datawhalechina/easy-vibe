<!--
  AuthNvsAuthZDemo.vue
  AuthN vs AuthZ（更可用：请求模拟器）
-->
<template>
  <div class="authn-authz-demo">
    <div class="header">
      <div class="title">
        🪪 AuthN vs 🛂 AuthZ：一个请求到底会经历什么？
      </div>
      <div class="subtitle">
        选择“谁在请求”与“要做什么”，看看认证/授权分别在哪一步起作用。
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          选择请求
        </div>

        <label class="label">身份（AuthN：你是谁）</label>
        <div class="row">
          <button
            v-for="u in users"
            :key="u.id"
            class="chip"
            :class="{ active: userId === u.id }"
            @click="userId = u.id"
          >
            {{ u.name }}
          </button>
        </div>

        <label class="label">操作（AuthZ：你能做什么）</label>
        <div class="row">
          <button
            v-for="a in actions"
            :key="a.id"
            class="chip"
            :class="{ active: actionId === a.id }"
            @click="actionId = a.id"
          >
            {{ a.name }}
          </button>
        </div>

        <div class="hint">
          真实系统里：认证先发生（解析
          cookie/JWT），授权发生在路由/业务逻辑层（RBAC/ABAC）。
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          模拟结果
        </div>

        <div class="result">
          <div class="line">
            <span class="k">AuthN（认证）</span>
            <span
              class="v"
              :class="authn.ok ? 'ok' : 'bad'"
            >
              {{ authn.ok ? '通过' : '失败' }}
            </span>
          </div>
          <div class="line">
            <span class="k">AuthZ（授权）</span>
            <span
              class="v"
              :class="authz.ok ? 'ok' : 'bad'"
            >
              {{ authz.ok ? '允许' : '拒绝' }}
            </span>
          </div>
          <div class="line">
            <span class="k">HTTP</span>
            <span class="v mono">{{ finalStatus }}</span>
          </div>
        </div>

        <pre class="code"><code>{{ decisionLog }}</code></pre>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        关键点
      </div>
      <ul class="list">
        <li><strong>认证失败：</strong>你是谁都不确定 → 通常返回 401。</li>
        <li>
          <strong>认证通过但没权限：</strong>你是谁确定了，但不能做 → 通常返回
          403。
        </li>
        <li>
          <strong>授权规则要在服务端：</strong>别相信前端的“是否显示按钮”，那只是 UX。
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const users = [
  { id: 'anon', name: '匿名用户' },
  { id: 'user', name: '普通用户' },
  { id: 'admin', name: '管理员' }
]

const actions = [
  { id: 'view_profile', name: '查看个人资料（/api/me）' },
  { id: 'create_post', name: '发帖（POST /posts）' },
  { id: 'delete_user', name: '删除用户（DELETE /users/:id）' }
]

const userId = ref('anon')
const actionId = ref('view_profile')

const authn = computed(() => {
  if (userId.value === 'anon')
    return { ok: false, reason: '缺少有效凭证（cookie/JWT）' }
  return { ok: true, reason: `识别为 ${userId.value}` }
})

const authz = computed(() => {
  if (!authn.value.ok)
    return { ok: false, reason: '认证未通过，无法做授权判断' }
  if (actionId.value === 'delete_user') {
    return userId.value === 'admin'
      ? { ok: true, reason: 'admin 允许删除用户' }
      : { ok: false, reason: '只有 admin 才能删除用户' }
  }
  return { ok: true, reason: '此操作对已登录用户开放' }
})

const finalStatus = computed(() => {
  if (!authn.value.ok) return '401 Unauthorized'
  if (!authz.value.ok) return '403 Forbidden'
  return '200 OK'
})

const decisionLog = computed(() => {
  const lines = []
  lines.push(`Request: ${actionId.value}`)
  lines.push(
    `AuthN: ${authn.value.ok ? 'PASS' : 'FAIL'} - ${authn.value.reason}`
  )
  lines.push(
    `AuthZ: ${authz.value.ok ? 'ALLOW' : 'DENY'} - ${authz.value.reason}`
  )
  lines.push(`Result: ${finalStatus.value}`)
  return lines.join('\n')
})
</script>

<style scoped>
.authn-authz-demo {
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

.label {
  display: block;
  font-weight: 800;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  margin: 0.75rem 0 0.35rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.chip.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
}

.result {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.line {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.35rem 0;
}

.k {
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.v {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.v.ok {
  color: var(--vp-c-green-1, #22c55e);
}

.v.bad {
  color: var(--vp-c-red-1, #ef4444);
}

.mono {
  font-family: var(--vp-font-family-mono);
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
