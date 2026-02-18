<!--
  PasswordHashingDemo.vue
  密码哈希/加密学派生函数演示（更安全/更可用）

  说明：
  - 为避免引入第三方依赖（bcryptjs）导致构建失败，本组件用 WebCrypto 的 PBKDF2 来模拟“慢哈希 + 盐”的核心效果。
  - 生产环境更推荐 bcrypt / scrypt / Argon2（取决于语言/库），本演示只讲原理。
-->
<template>
  <div class="password-hashing-demo">
    <div class="header">
      <div class="title">
        🔐 密码存储：哈希 + 盐 + 慢
      </div>
      <div class="subtitle">
        演示 PBKDF2（模拟慢哈希）如何抵抗彩虹表/暴力破解；真实项目通常选
        bcrypt/Argon2。
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">
          输入
        </div>

        <label class="label">密码</label>
        <input
          v-model="password"
          type="password"
          class="input"
          placeholder="例如：123456"
          @input="debouncedRecompute"
        >

        <div class="row">
          <div class="col">
            <label class="label">
              iterations（迭代次数）：<strong>{{ iterations }}</strong>
            </label>
            <input
              v-model.number="iterations"
              class="range"
              type="range"
              min="1000"
              max="200000"
              step="1000"
              @input="debouncedRecompute"
            >
            <div class="hint">
              越大越慢，暴力破解成本越高（但登录也更慢）。
            </div>
          </div>
        </div>

        <div class="row">
          <label class="toggle">
            <input
              v-model="saltEnabled"
              type="checkbox"
              @change="recompute"
            >
            <span>启用盐（salt）</span>
          </label>
          <button
            class="btn"
            :disabled="!saltEnabled"
            @click="regenSalt"
          >
            生成新盐
          </button>
        </div>

        <div class="mono-box">
          <div class="mono-label">
            salt
          </div>
          <code class="mono">{{ saltEnabled ? saltHex : '(disabled)' }}</code>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          输出（模拟）
        </div>

        <div class="status">
          <span class="badge">Algorithm: PBKDF2-SHA256</span>
          <span class="badge">Time: {{ timeMs }}ms</span>
        </div>

        <div class="mono-box">
          <div class="mono-label">
            derived key (hex)
          </div>
          <code class="mono">{{ hashHex || '（请输入密码）' }}</code>
        </div>

        <div class="alert">
          <div class="alert-title">
            结论
          </div>
          <div class="alert-text">
            不要存明文；不要用无盐的快速哈希（MD5/SHA1/SHA256 直接 hash 密码）。
            应使用“专门的密码哈希/KDF（慢 + 盐）”，并设置合理成本。
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        🌈 彩虹表为什么会失效？（同一密码 + 不同盐 → 不同结果）
      </div>
      <div class="two">
        <div class="mono-box">
          <div class="mono-label">
            salt A
          </div>
          <code class="mono">{{ saltA }}</code>
          <div class="mono-label">
            hash A
          </div>
          <code class="mono">{{ hashA || '-' }}</code>
        </div>
        <div class="mono-box">
          <div class="mono-label">
            salt B
          </div>
          <code class="mono">{{ saltB }}</code>
          <div class="mono-label">
            hash B
          </div>
          <code class="mono">{{ hashB || '-' }}</code>
        </div>
      </div>
      <div class="hint">
        彩虹表依赖“预计算”：同一个密码如果总产生同一个哈希，攻击者就能快速反查。盐让预计算成本爆炸。
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const password = ref('')
const iterations = ref(60000)
const saltEnabled = ref(true)
const saltHex = ref('')

const hashHex = ref('')
const timeMs = ref(0)

let t = null

const toHex = (bytes) =>
  [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')

const fromHex = (hex) => {
  const clean = hex.trim().replace(/^0x/, '')
  if (!clean) return new Uint8Array()
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  }
  return out
}

const randomSaltHex = (len = 16) => {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  return toHex(bytes)
}

const derive = async ({ pwd, iters, salt }) => {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(pwd),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: iters, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  return toHex(new Uint8Array(bits))
}

const recompute = async () => {
  if (!password.value) {
    hashHex.value = ''
    timeMs.value = 0
    await recomputeRainbow()
    return
  }

  const saltBytes = saltEnabled.value
    ? fromHex(saltHex.value)
    : new Uint8Array(16) // "no salt" demonstration: constant all-zero salt

  const start = performance.now()
  try {
    hashHex.value = await derive({
      pwd: password.value,
      iters: iterations.value,
      salt: saltBytes
    })
  } finally {
    timeMs.value = Math.max(0, Math.round(performance.now() - start))
  }

  await recomputeRainbow()
}

const debouncedRecompute = () => {
  if (t) clearTimeout(t)
  t = setTimeout(() => {
    recompute()
  }, 200)
}

const regenSalt = () => {
  saltHex.value = randomSaltHex(16)
  recompute()
}

// Rainbow demo
const saltA = ref('')
const saltB = ref('')
const hashA = ref('')
const hashB = ref('')

const recomputeRainbow = async () => {
  if (!password.value) {
    hashA.value = ''
    hashB.value = ''
    return
  }
  const a = fromHex(saltA.value)
  const b = fromHex(saltB.value)
  hashA.value = await derive({ pwd: password.value, iters: 30000, salt: a })
  hashB.value = await derive({ pwd: password.value, iters: 30000, salt: b })
}

onMounted(() => {
  saltHex.value = randomSaltHex(16)
  saltA.value = randomSaltHex(16)
  saltB.value = randomSaltHex(16)
})
</script>

<style scoped>
.password-hashing-demo {
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
  font-size: 1.1rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
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
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.label {
  display: block;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  margin-bottom: 0.35rem;
}

.input {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.range {
  width: 100%;
}

.row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 240px;
}

.toggle {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.btn {
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 600;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.badge {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
}

.mono-box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
}

.mono-label {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.mono {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.alert {
  margin-top: 0.75rem;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.18);
  background: rgba(var(--vp-c-brand-rgb), 0.06);
  border-radius: 6px;
  padding: 0.75rem;
}

.alert-title {
  font-weight: 800;
  margin-bottom: 0.35rem;
  color: var(--vp-c-text-1);
}

.alert-text {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.hint {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.7;
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
