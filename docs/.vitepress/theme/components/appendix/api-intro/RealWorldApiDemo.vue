<!--
  RealWorldApiDemo.vue
  参考 ide-intro 的“虚拟 UI + 一眼看懂”的风格。
  目标：解释“为什么 SDK 的调用也叫 API”：
  - 左边：SDK 按钮（你调用函数）
  - 右边：HTTP 按钮（你发请求）
  两个按钮得到的结果一样：只是包装方式不同。
-->
<template>
  <div class="wrap">
    <div class="head">
      <div class="title">SDK vs HTTP：其实都是“按按钮拿结果”</div>
      <div class="sub">
        你可以把它理解成：<b>同一个按钮</b>，只是有两种“按法”。
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="cardTitle">方式 A：SDK 按钮（调用函数）</div>
        <div class="cardBody">
          <button class="call sdk" :disabled="busy" @click="call('sdk')">
            {{ busy ? '执行中…' : '按一下（SDK）' }}
          </button>
          <div class="muted">你写的通常是：<b>client.users.get(...)</b></div>
          <details class="details">
            <summary>（选看）长什么样</summary>
            <pre class="code"><code>{{ sdkCode }}</code></pre>
          </details>
        </div>
      </div>

      <div class="card">
        <div class="cardTitle">方式 B：HTTP 按钮（发请求）</div>
        <div class="cardBody">
          <button class="call http" :disabled="busy" @click="call('http')">
            {{ busy ? '执行中…' : '按一下（HTTP）' }}
          </button>
          <div class="muted">你写的通常是：<b>fetch(url, headers)</b></div>
          <details class="details">
            <summary>（选看）长什么样</summary>
            <pre class="code"><code>{{ httpCode }}</code></pre>
          </details>
        </div>
      </div>

      <div class="card">
        <div class="cardTitle">结果（两边一样）</div>
        <div class="cardBody">
          <div v-if="!res" class="muted">先按一下左边或右边的按钮。</div>
          <div v-else class="resBox">
            <div class="badge">返回</div>
            <div class="resText">{{ res }}</div>
          </div>
          <div class="tip">
            结论：<b>SDK 的“函数入口”也叫 API</b
            >，因为它也是对外公开的“怎么用”。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const busy = ref(false)
const res = ref('')

const sdkCode = computed(
  () => `import { AcmeClient } from 'acme-sdk'

const client = new AcmeClient({ apiKey: '****' })
const user = await client.users.get({ id: 'u_123' })
console.log(user)`
)

const httpCode = computed(
  () => `const res = await fetch('https://api.acme.com/v1/users/u_123', {
  headers: { 'X-Api-Key': '****' }
})
const user = await res.json()
console.log(user)`
)

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function call(which) {
  if (busy.value) return
  busy.value = true
  res.value = ''
  await sleep(280)
  res.value =
    which === 'sdk'
      ? '用户：{ id: "u_123", name: "Alice" }（模拟）'
      : '用户：{ id: "u_123", name: "Alice" }（模拟）'
  busy.value = false
}
</script>

<style scoped>
.wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
}

.head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-weight: 900;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.sub {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.cardTitle {
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.cardBody {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.call {
  width: 100%;
  border-radius: 12px;
  padding: 12px 12px;
  font-weight: 900;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.call.sdk {
  border-color: color-mix(in srgb, #22c55e 45%, var(--vp-c-divider));
}

.call.http {
  border-color: color-mix(in srgb, #60a5fa 45%, var(--vp-c-divider));
}

.call:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.muted {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.details {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
}

.details summary {
  cursor: pointer;
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.code {
  margin: 10px 0 0;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--vp-c-text-1);
}

.resBox {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
}

.badge {
  display: inline-block;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 900;
}

.resText {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.tip {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
