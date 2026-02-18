<!--
  CSRFDefenseDemo.vue
  CSRF 防护（手动推进 + “怎么做”清单）
-->
<template>
  <div class="csrf-demo">
    <div class="header">
      <div class="title">
        🛡️ CSRF：为什么“自动带 Cookie”会出事？
      </div>
      <div class="subtitle">
        手动推进一个最小攻击链，再看 3 个最常用防护手段（SameSite / CSRF Token /
        双重提交）。
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
          场景
        </div>
        <div class="desc">
          假设你登录了 <strong>bank.com</strong>（Cookie
          已存在）。你又打开了一个恶意网站
          <strong>evil.com</strong>，它偷偷发起转账请求。
        </div>
        <div class="box">
          <div class="box-title">
            你的 Cookie（浏览器会自动带）
          </div>
          <code class="mono">Cookie: session_id=abc123</code>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          本步请求
        </div>
        <pre class="code"><code>{{ requestText }}</code></pre>
        <div class="desc">
          {{ steps[step - 1]?.desc }}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        防护怎么选？（优先顺序）
      </div>
      <ol class="list">
        <li>
          <strong>SameSite Cookie：</strong>对大多数“跨站表单/图片”请求非常有效（Lax/Strict）。
        </li>
        <li>
          <strong>CSRF Token：</strong>在表单/请求头里带
          token，服务端校验（对复杂场景最稳）。
        </li>
        <li>
          <strong>双重提交 Cookie：</strong>Cookie + Header 同时带
          token（服务端比较一致性）。
        </li>
      </ol>
      <div class="warn">
        <div class="warn-title">
          注意
        </div>
        <div class="warn-text">
          CSRF 主要针对“Cookie 自动携带”的场景。若你用 Authorization:
          Bearer（不自动发送），CSRF 风险会显著降低，但仍要考虑 XSS/Token
          泄露等问题。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const maxStep = 4
const step = ref(0)

const steps = [
  {
    title: '1) 恶意站点发起跨站请求',
    desc: 'evil.com 诱导你点击按钮/加载图片/提交表单，目标是 bank.com 的转账接口。'
  },
  {
    title: '2) 浏览器自动带上 bank.com 的 Cookie',
    desc: '关键点：Cookie 是“按域名自动携带”的，evil.com 不需要知道你的 session_id。'
  },
  {
    title: '3) 服务端如果只靠 Cookie 识别用户，会误以为是你本人操作',
    desc: '如果 bank.com 没做 CSRF 防护，转账可能被执行。'
  },
  {
    title: '4) 加上 CSRF 防护后，请求会被拒绝',
    desc: 'SameSite/CSRF Token 等会阻断这类跨站伪造请求。'
  }
]

const requestText = computed(() => {
  if (step.value === 0) return '（点击开始）'
  if (step.value === 1) {
    return `POST https://bank.com/api/transfer
Origin: https://evil.com
Content-Type: application/x-www-form-urlencoded

to=attacker&amount=1000`
  }
  if (step.value === 2) {
    return `POST /api/transfer
Origin: https://evil.com
Cookie: session_id=abc123

to=attacker&amount=1000`
  }
  if (step.value === 3) {
    return `（如果服务端只校验 Cookie：可能返回 200 OK 并执行转账）`
  }
  return `POST /api/transfer
Origin: https://evil.com
Cookie: session_id=abc123
X-CSRF-Token: <missing or invalid>

→ 403 Forbidden`
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
}
</script>

<style scoped>
.csrf-demo {
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

.desc {
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.box {
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.box-title {
  font-weight: 800;
  margin-bottom: 0.35rem;
  color: var(--vp-c-text-1);
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
  padding-left: 1.2rem;
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
