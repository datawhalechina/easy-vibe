<!--
  JWTWorkflowDemo.vue
  JWT 工作流程（手动推进，更贴近真实使用）
-->
<template>
  <div class="jwt-workflow-demo">
    <div class="header">
      <div class="title">
        🎫 JWT：生成 → 发送 → 验证 → 解析
      </div>
      <div class="subtitle">
        默认“手动推进”，不自动下一步；避免把演示误当成真实系统的安全边界。
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
          用户声明（Payload 示例）
        </div>
        <pre class="code"><code>{{ payloadJson }}</code></pre>
        <div class="hint">
          注意：JWT 的 payload 只是 Base64Url
          编码，任何人都能解码，所以不要放密码、手机号等敏感数据。
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          JWT Token（示意）
        </div>
        <div class="token">
          <div
            class="part"
            :class="{ active: step >= 1 }"
          >
            <div class="part-label">
              Header
            </div>
            <code class="mono">{{ step >= 1 ? headerB64 : '...' }}</code>
          </div>
          <div class="dot">
            .
          </div>
          <div
            class="part"
            :class="{ active: step >= 2 }"
          >
            <div class="part-label">
              Payload
            </div>
            <code class="mono">{{ step >= 2 ? payloadB64 : '...' }}</code>
          </div>
          <div class="dot">
            .
          </div>
          <div
            class="part"
            :class="{ active: step >= 3 }"
          >
            <div class="part-label">
              Signature
            </div>
            <code class="mono">{{ step >= 3 ? signatureB64 : '...' }}</code>
          </div>
        </div>

        <div
          v-if="step >= 4"
          class="mono-box"
        >
          <div class="mono-label">
            完整 Token
          </div>
          <code class="mono">{{ token }}</code>
          <button
            class="copy"
            @click="copy(token)"
          >
            {{ copied ? '已复制' : '复制 Token' }}
          </button>
        </div>

        <div
          v-if="step >= 5"
          class="mono-box"
        >
          <div class="mono-label">
            请求头示例
          </div>
          <code class="mono">Authorization: Bearer {{ token }}</code>
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

const maxStep = 6
const step = ref(0)
const copied = ref(false)

const headerObj = { alg: 'HS256', typ: 'JWT' }
const payloadObj = computed(() => ({
  user_id: 123,
  username: 'alice',
  role: 'admin',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600
}))

const payloadJson = computed(() => JSON.stringify(payloadObj.value, null, 2))
const headerB64 = computed(() => btoa(JSON.stringify(headerObj)))
const payloadB64 = computed(() => btoa(JSON.stringify(payloadObj.value)))
const signatureB64 = computed(() =>
  btoa(`${headerB64.value}.${payloadB64.value}.your-secret-key`)
)
const token = computed(
  () => `${headerB64.value}.${payloadB64.value}.${signatureB64.value}`
)

const steps = [
  {
    title: '1) 生成 Header',
    desc: 'Header 描述使用的算法与 token 类型（JWT）。'
  },
  {
    title: '2) 生成 Payload',
    desc: 'Payload 放业务声明（claims）。它可被解码，所以不要放敏感信息。'
  },
  {
    title: '3) 生成 Signature',
    desc: 'Signature 用密钥对 header.payload 做签名，用来防篡改。',
    warn: '只有“签名校验”能保证 payload 未被改过；Base64 不是加密。'
  },
  {
    title: '4) 拼接 Token',
    desc: '把三段用 “.” 连接：header.payload.signature。'
  },
  {
    title: '5) 客户端发送请求',
    desc: '通常放在 Authorization: Bearer <token>。'
  },
  {
    title: '6) 服务端验证与授权',
    desc: '服务端校验签名与过期时间，再按 role/权限做授权判断。',
    warn: 'JWT 无法“立刻全局注销”：常用解法是短 access token + refresh token + 黑名单/版本号。'
  }
]

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
.jwt-workflow-demo {
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
  line-height: 1.7;
  font-size: 0.9rem;
}

.token {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.part {
  flex: 1;
  min-width: 220px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  opacity: 0.6;
}

.part.active {
  opacity: 1;
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
}

.part-label {
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
}

.dot {
  display: none;
}

.mono {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.mono-box {
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.mono-label {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

.copy {
  margin-top: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
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
