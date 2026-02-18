<!--
  SessionVsJWTDemo.vue
  Session vs JWT（决策辅助，更可用）
-->
<template>
  <div class="session-vs-jwt-demo">
    <div class="header">
      <div class="title">
        🧩 Session vs JWT：怎么选？
      </div>
      <div class="subtitle">
        选你的约束条件，得到推荐方案（并解释原因）。这比“背结论”更好用。
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          你的场景
        </div>

        <label class="label">主要客户端</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: client === 'web' }"
            @click="client = 'web'"
          >
            浏览器 Web
          </button>
          <button
            class="chip"
            :class="{ active: client === 'mobile' }"
            @click="client = 'mobile'"
          >
            移动端 App
          </button>
          <button
            class="chip"
            :class="{ active: client === 'server' }"
            @click="client = 'server'"
          >
            服务到服务
          </button>
        </div>

        <label class="label">是否强需求“立刻注销/踢下线”</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: revoke === 'yes' }"
            @click="revoke = 'yes'"
          >
            是
          </button>
          <button
            class="chip"
            :class="{ active: revoke === 'no' }"
            @click="revoke = 'no'"
          >
            否
          </button>
        </div>

        <label class="label">是否需要跨域（前后端分离，多域名）</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: cors === 'yes' }"
            @click="cors = 'yes'"
          >
            是
          </button>
          <button
            class="chip"
            :class="{ active: cors === 'no' }"
            @click="cors = 'no'"
          >
            否
          </button>
        </div>

        <label class="label">服务是否会水平扩容（多实例）</label>
        <div class="row">
          <button
            class="chip"
            :class="{ active: scale === 'yes' }"
            @click="scale = 'yes'"
          >
            是
          </button>
          <button
            class="chip"
            :class="{ active: scale === 'no' }"
            @click="scale = 'no'"
          >
            否
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          推荐
        </div>
        <div class="recommend">
          <div class="pill primary">
            {{ recommendation.title }}
          </div>
          <div class="desc">
            {{ recommendation.desc }}
          </div>
        </div>

        <div class="box">
          <div class="box-title">
            为什么
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in recommendation.reasons"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>

        <div class="box">
          <div class="box-title">
            落地建议
          </div>
          <ul class="list">
            <li
              v-for="(x, i) in recommendation.tips"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        常见误区
      </div>
      <ul class="list">
        <li>
          <strong>JWT ≠ 更安全：</strong>JWT
          只是“无状态”。安全取决于密钥、过期策略、存储方式、授权设计。
        </li>
        <li>
          <strong>Cookie ≠ 一定 CSRF：</strong>SameSite + CSRF token
          可以显著降低风险。
        </li>
        <li>
          <strong>别把第三方 OAuth token 当你系统 token：</strong>用途不同。
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const client = ref('web') // web | mobile | server
const revoke = ref('yes') // yes | no
const cors = ref('no') // yes | no
const scale = ref('yes') // yes | no

const recommendation = computed(() => {
  // Very simple heuristic: prefer session for same-site web + revoke requirement.
  const reasons = []
  const tips = []

  const isWeb = client.value === 'web'
  const needsRevoke = revoke.value === 'yes'
  const needsCors = cors.value === 'yes'
  const needsScale = scale.value === 'yes'

  if (isWeb && !needsCors && needsRevoke) {
    reasons.push('同域 Web + 需要“立刻注销/踢下线” → Session 更直观可控。')
    if (needsScale) reasons.push('多实例时用 Redis 等共享 Session 存储即可。')
    tips.push('Cookie: HttpOnly + Secure + SameSite=Lax/Strict（视业务）')
    tips.push('CSRF：SameSite + CSRF Token（双重保险）')
    tips.push('Session Store：Redis + TTL + 续期策略（滑动过期）')
    return {
      title: 'Session + Cookie',
      desc: '传统 Web 的最稳妥方案',
      reasons,
      tips
    }
  }

  // Otherwise default to token approach.
  reasons.push('跨域/移动端/多服务场景更偏向 Token（Authorization Header）。')
  if (needsRevoke)
    reasons.push(
      '需要主动注销：用短 access token + refresh token + 黑名单/版本号。'
    )
  if (!needsRevoke) reasons.push('不强求“立刻注销”时，JWT 的无状态优势更明显。')
  tips.push('Access Token：短过期（如 15m），Refresh Token：单独存/可轮换')
  tips.push(
    '存储：Web 尽量避免 localStorage；更推荐 HttpOnly Cookie 或内存 + 刷新机制（看业务）'
  )
  tips.push('授权：服务端做 RBAC/ABAC；不要把 role 全塞 JWT 然后永不变更')
  return {
    title: 'JWT Access Token（配合 Refresh）',
    desc: '现代 API/移动端常用组合',
    reasons,
    tips
  }
})
</script>

<style scoped>
.session-vs-jwt-demo {
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

.recommend {
  margin-bottom: 0.75rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.pill.primary {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-text-1);
}

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
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

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
