<template>
  <div class="ru-root">
    <div class="ru-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">RESTful URL 设计规则</span>
      </div>
      <div ref="termEl" class="term-body">
        <div v-for="(l, i) in lines" :key="i" class="t-line">
          <span v-if="l.kind === 'cmd'" class="t-ps">$ </span>
          <span :class="'t-' + l.kind">{{ l.text }}</span>
        </div>
        <div class="t-line">
          <span class="t-ps">$ </span>
          <span class="t-typing">{{ typing }}<span class="t-cur">▋</span></span>
        </div>
      </div>
    </div>

    <div class="ru-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="[
          'ru-btn',
          { 'ru-btn--on': active === op.id, 'ru-btn--dim': !op.ok() }
        ]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="ru-btn ru-btn--reset" :disabled="running" @click="reset">
        重置
      </button>
    </div>

    <div class="ru-compare">
      <div class="compare-col compare-bad">
        <div class="compare-header">
          <span class="compare-icon">❌</span>
          <span class="compare-title">错误示例</span>
        </div>
        <div class="compare-body">
          <div
            v-for="(item, i) in badExamples"
            :key="i"
            class="url-row"
            :class="{ highlight: item.active }"
          >
            <code class="url-text">{{ item.url }}</code>
            <span class="url-reason">{{ item.reason }}</span>
          </div>
        </div>
      </div>

      <div class="compare-col compare-good">
        <div class="compare-header">
          <span class="compare-icon">✅</span>
          <span class="compare-title">正确示例</span>
        </div>
        <div class="compare-body">
          <div
            v-for="(item, i) in goodExamples"
            :key="i"
            class="url-row"
            :class="{ highlight: item.active }"
          >
            <code class="url-text">{{ item.url }}</code>
            <span class="url-reason">{{ item.reason }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="ru-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([
  { kind: 'dim', text: '# 对比 RESTful URL 的正确与错误写法' }
])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref('点击命令按钮，查看不同场景下的 URL 设计对比。')

const badExamples = ref([
  { url: 'GET /getUsers', reason: 'URL 含动词', active: false },
  { url: 'GET /user', reason: '单数形式', active: false },
  { url: 'GET /UserProfiles', reason: '大写字母', active: false },
  { url: 'GET /user_profiles', reason: '下划线连接', active: false },
  {
    url: 'GET /users/123/orders/456/items/789',
    reason: '层级过深',
    active: false
  },
  {
    url: 'GET /products/category/phone/price/5000',
    reason: '过滤条件放路径',
    active: false
  }
])

const goodExamples = ref([
  { url: 'GET /users', reason: '名词 + 复数', active: false },
  { url: 'GET /users', reason: '复数形式', active: false },
  { url: 'GET /user-profiles', reason: '小写 + 连字符', active: false },
  { url: 'GET /user-profiles', reason: '连字符连接', active: false },
  { url: 'GET /users/123/orders', reason: '最多 3 层', active: false },
  {
    url: 'GET /products?category=phone&price_max=5000',
    reason: '过滤用查询参数',
    active: false
  }
])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = [
  {
    id: 'rule1',
    cmd: '规则1: 用名词不用动词',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# URL 表示资源地址，不是操作' },
      { kind: 'red', text: '❌ GET /getUsers' },
      { kind: 'red', text: '❌ GET /fetchUserInfo' },
      { kind: 'red', text: '❌ POST /createOrder' },
      { kind: 'grn', text: '✅ GET /users' },
      { kind: 'grn', text: '✅ GET /users/123' },
      { kind: 'grn', text: '✅ POST /orders' }
    ],
    hint: 'URL 是资源的"地址"，HTTP 方法已经表达了"操作"。不要在 URL 里重复说"做什么"。',
    do: () => {
      badExamples.value[0].active = true
      goodExamples.value[0].active = true
    }
  },
  {
    id: 'rule2',
    cmd: '规则2: 用复数形式',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 复数形式表示集合，风格统一' },
      { kind: 'red', text: '❌ GET /user' },
      { kind: 'red', text: '❌ GET /order' },
      { kind: 'grn', text: '✅ GET /users' },
      { kind: 'grn', text: '✅ GET /orders' },
      { kind: 'grn', text: '✅ GET /users/123  (获取单个)' }
    ],
    hint: '统一用复数，避免 /user 和 /users 混用。获取单个资源时用 /users/123。',
    do: () => {
      badExamples.value[1].active = true
      goodExamples.value[1].active = true
    }
  },
  {
    id: 'rule3',
    cmd: '规则3: 小写+连字符',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# URL 大小写敏感，统一小写避免混乱' },
      { kind: 'red', text: '❌ GET /UserProfiles' },
      { kind: 'red', text: '❌ GET /user_profiles' },
      { kind: 'grn', text: '✅ GET /user-profiles' },
      { kind: 'grn', text: '✅ GET /order-items' }
    ],
    hint: 'URL 大小写敏感，统一用小写 + 连字符（-）是最安全的做法。',
    do: () => {
      badExamples.value[2].active = true
      badExamples.value[3].active = true
      goodExamples.value[2].active = true
      goodExamples.value[3].active = true
    }
  },
  {
    id: 'rule4',
    cmd: '规则4: 避免层级过深',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 层级太深 = 耦合度高，难以维护' },
      { kind: 'red', text: '❌ /users/123/orders/456/items/789/status' },
      { kind: 'grn', text: '✅ /users/123/orders  (用户订单)' },
      { kind: 'grn', text: '✅ /orders/456/items  (订单商品)' },
      { kind: 'grn', text: '✅ /order-items/789  (直接访问)' }
    ],
    hint: '超过 3 层考虑重构。可以用扁平化路径或查询参数替代深层嵌套。',
    do: () => {
      badExamples.value[4].active = true
      goodExamples.value[4].active = true
    }
  },
  {
    id: 'rule5',
    cmd: '规则5: 过滤用查询参数',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 过滤条件多变，不适合放路径' },
      { kind: 'red', text: '❌ /products/category/phone/price/5000' },
      { kind: 'grn', text: '✅ /products?category=phone&price_max=5000' },
      { kind: 'grn', text: '✅ /products?status=active&sort=created_desc' },
      { kind: 'grn', text: '✅ /products?category=phone,electronics' }
    ],
    hint: '查询参数可以灵活组合，路径则固定不变。过滤、排序、分页都用查询参数。',
    do: () => {
      badExamples.value[5].active = true
      goodExamples.value[5].active = true
    }
  }
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  hint.value = ''
  typing.value = ''

  badExamples.value.forEach((e) => (e.active = false))
  goodExamples.value.forEach((e) => (e.active = false))

  for (const ch of op.cmd) {
    typing.value += ch
    await sleep(18)
  }
  await sleep(80)
  lines.value.push({ kind: 'cmd', text: op.cmd })
  typing.value = ''
  await nextTick()
  scroll()
  await sleep(150)

  for (const l of op.output) {
    lines.value.push(l)
    await nextTick()
    scroll()
    await sleep(50)
  }

  op.do()
  await sleep(120)
  hint.value = op.hint
  running.value = false
}

function scroll() {
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function reset() {
  lines.value = [{ kind: 'dim', text: '# 对比 RESTful URL 的正确与错误写法' }]
  badExamples.value.forEach((e) => (e.active = false))
  goodExamples.value.forEach((e) => (e.active = false))
  active.value = null
  hint.value = '点击命令按钮，查看不同场景下的 URL 设计对比。'
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.ru-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.ru-terminal {
  background: #141420;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  background: #1e1e2e;
}
.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.r {
  background: #ff5f57;
}
.dot.y {
  background: #febc2e;
}
.dot.g {
  background: #28c840;
}
.term-title {
  margin-left: 8px;
  font-size: 0.72rem;
  color: #666;
  font-family: monospace;
}

.term-body {
  min-height: 100px;
  max-height: 160px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0.7rem 1rem;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.76rem;
  line-height: 1.6;
  color: #cdd6f4;
}
.t-line {
  display: flex;
  min-width: min-content;
}
.t-ps {
  color: #a6e3a1;
  flex-shrink: 0;
}
.t-cmd {
  color: #cdd6f4;
}
.t-dim {
  color: #585b70;
}
.t-grn {
  color: #a6e3a1;
}
.t-red {
  color: #f38ba8;
}
.t-typing {
  color: #cdd6f4;
}
.t-cur {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.ru-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.ru-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.ru-btn code {
  font-size: 0.68rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.ru-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.ru-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.ru-btn--on code {
  color: var(--vp-c-brand);
}
.ru-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.ru-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.ru-btn--reset code {
  display: none;
}
.ru-btn--reset::after {
  content: '重置';
  font-size: 0.7rem;
  color: #585b70;
}

.ru-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.compare-col {
  padding: 12px;
}
.compare-bad {
  background: color-mix(in srgb, #ef4444 4%, var(--vp-c-bg));
  border-right: 1px solid var(--vp-c-divider);
}
.compare-good {
  background: color-mix(in srgb, #22c55e 4%, var(--vp-c-bg));
}

.compare-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}
.compare-icon {
  font-size: 1rem;
}
.compare-title {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.compare-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.url-row {
  padding: 6px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.url-row.highlight {
  border-color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 8%, var(--vp-c-bg));
}
.url-text {
  display: block;
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}
.url-reason {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.ru-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .ru-compare {
    grid-template-columns: 1fr;
  }
  .compare-bad {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
