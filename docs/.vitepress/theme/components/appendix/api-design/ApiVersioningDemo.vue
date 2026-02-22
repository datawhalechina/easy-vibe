<template>
  <div class="av-root">
    <div class="av-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">API 版本控制演示</span>
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

    <div class="av-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="[
          'av-btn',
          { 'av-btn--on': active === op.id, 'av-btn--dim': !op.ok() }
        ]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="av-btn av-btn--reset" :disabled="running" @click="reset">
        重置
      </button>
    </div>

    <div class="av-versions">
      <div class="version-col" :class="{ active: activeVersion === 'v1' }">
        <div class="version-header v1">
          <span class="version-name">v1 (旧版)</span>
          <span class="version-status">兼容旧客户端</span>
        </div>
        <div class="version-body">
          <div class="api-item">
            <code>GET /v1/users</code>
            <span class="api-desc">返回 name, email</span>
          </div>
          <div class="api-item">
            <code>POST /v1/orders</code>
            <span class="api-desc">接收 items 数组</span>
          </div>
        </div>
      </div>

      <div class="version-arrow">
        <span class="arrow-text">升级</span>
        <span class="arrow-symbol">→</span>
      </div>

      <div class="version-col" :class="{ active: activeVersion === 'v2' }">
        <div class="version-header v2">
          <span class="version-name">v2 (新版)</span>
          <span class="version-status">新功能在这里</span>
        </div>
        <div class="version-body">
          <div class="api-item">
            <code>GET /v2/users</code>
            <span class="api-desc">返回 name, email, avatar, phone</span>
          </div>
          <div class="api-item">
            <code>POST /v2/orders</code>
            <span class="api-desc">接收 items + coupons</span>
          </div>
          <div class="api-item new">
            <code>POST /v2/orders/batch</code>
            <span class="api-desc">🆕 批量下单</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hint" class="av-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: '# API 版本控制：让新旧接口和平共处' }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const activeVersion = ref('')
const hint = ref('点击按钮，了解 API 版本控制的策略和最佳实践。')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ops = [
  {
    id: 'why',
    cmd: '为什么需要版本控制?',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 场景：你的 App 有 100 万用户' },
      { kind: 'dim', text: '' },
      { kind: 'yel', text: '问题：需要修改订单接口，添加新字段、废弃旧字段' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: '❌ 如果不做版本控制：' },
      { kind: 'red', text: '   新 App 调用新接口 → 正常' },
      { kind: 'red', text: '   旧 App 调用新接口 → 字段缺失，崩溃!' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '✅ 正确做法：' },
      { kind: 'grn', text: '   /v1/orders - 旧接口，继续服务旧 App' },
      { kind: 'grn', text: '   /v2/orders - 新接口，新功能在这里' }
    ],
    hint: '版本控制让新旧客户端都能正常工作。旧 App 用户可以慢慢升级，不会突然崩溃。',
    do: () => {
      activeVersion.value = ''
    }
  },
  {
    id: 'url',
    cmd: '方式1: URL 路径版本',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 最常用的方式' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: 'GET /v1/users' },
      { kind: 'grn', text: 'GET /v2/users' },
      { kind: 'grn', text: 'GET /v3/users' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: '优点：直观、易缓存、浏览器友好' },
      { kind: 'dim', text: '缺点：URL 变长' }
    ],
    hint: 'URL 路径版本是最常用的方式。GitHub、Twitter、Stripe 都用这种方式。',
    do: () => {
      activeVersion.value = 'v1'
    }
  },
  {
    id: 'header',
    cmd: '方式2: Header 版本',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 通过请求头指定版本' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: 'GET /users' },
      { kind: 'grn', text: 'Accept: application/vnd.myapi.v2+json' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: '或者：' },
      { kind: 'grn', text: 'GET /users' },
      { kind: 'grn', text: 'X-API-Version: 2' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: '优点：URL 干净' },
      { kind: 'dim', text: '缺点：不便调试、缓存复杂' }
    ],
    hint: 'Header 版本让 URL 更干净，但调试时需要额外设置 Header，不如 URL 版本直观。',
    do: () => {
      activeVersion.value = 'v2'
    }
  },
  {
    id: 'query',
    cmd: '方式3: 查询参数版本',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 通过查询参数指定版本' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: 'GET /users?version=1' },
      { kind: 'grn', text: 'GET /users?version=2' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: '优点：简单、向后兼容' },
      { kind: 'dim', text: '缺点：容易被忽略、不是 RESTful 标准' }
    ],
    hint: '查询参数版本简单但不够"正规"。适合内部 API 或快速迭代的项目。',
    do: () => {
      activeVersion.value = ''
    }
  },
  {
    id: 'best',
    cmd: '最佳实践',
    ok: () => true,
    output: [
      { kind: 'dim', text: '# 版本控制的最佳实践' },
      { kind: 'dim', text: '' },
      { kind: 'grn', text: '1. 从一开始就加版本号 /v1/' },
      { kind: 'grn', text: '2. 新功能放新版本，旧版本保持稳定' },
      { kind: 'grn', text: '3. 设置废弃时间线（如 v1 将在 2025-06 废弃）' },
      { kind: 'grn', text: '4. 响应头标注当前版本和废弃信息' },
      { kind: 'grn', text: '5. 文档明确标注每个版本的变更' }
    ],
    hint: '版本控制不是"以后再说"的事，从第一天就应该规划好。废弃旧版本要给用户足够的迁移时间。',
    do: () => {
      activeVersion.value = 'v2'
    }
  }
]

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  hint.value = ''
  typing.value = ''

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
  lines.value = [{ kind: 'dim', text: '# API 版本控制：让新旧接口和平共处' }]
  active.value = null
  activeVersion.value = ''
  hint.value = '点击按钮，了解 API 版本控制的策略和最佳实践。'
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.av-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.av-terminal {
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
  max-height: 180px;
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
.t-yel {
  color: #f9e2af;
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

.av-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.av-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.av-btn code {
  font-size: 0.68rem;
  color: #7f849c;
  font-family: monospace;
  white-space: nowrap;
}
.av-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}
.av-btn--on {
  border-color: var(--vp-c-brand) !important;
}
.av-btn--on code {
  color: var(--vp-c-brand);
}
.av-btn--dim {
  opacity: 0.3;
  cursor: not-allowed;
}
.av-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.av-btn--reset code {
  display: none;
}
.av-btn--reset::after {
  content: '重置';
  font-size: 0.7rem;
  color: #585b70;
}

.av-versions {
  display: flex;
  align-items: stretch;
  gap: 0;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.version-col {
  flex: 1;
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-left: none;
  transition: all 0.3s;
}
.version-col:last-child {
  border-right: none;
}
.version-col.active {
  background: color-mix(in srgb, var(--vp-c-brand) 4%, var(--vp-c-bg));
}

.version-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 0.85rem;
}
.version-header.v1 {
  background: color-mix(in srgb, #64748b 10%, var(--vp-c-bg-alt));
  color: #64748b;
}
.version-header.v2 {
  background: color-mix(in srgb, var(--vp-c-brand) 10%, var(--vp-c-bg-alt));
  color: var(--vp-c-brand);
}
.version-status {
  font-size: 0.7rem;
  font-weight: 400;
  opacity: 0.8;
}

.version-body {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.api-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}
.api-item.new {
  border-left: 3px solid #22c55e;
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg-soft));
}
.api-item code {
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
}
.api-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.version-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: var(--vp-c-text-3);
}
.arrow-text {
  font-size: 0.7rem;
}
.arrow-symbol {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.av-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .av-versions {
    flex-direction: column;
  }
  .version-col {
    border-left: none;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .version-arrow {
    flex-direction: row;
    padding: 8px 0;
  }
}
</style>
