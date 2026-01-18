<!--
  JQueryVsStateDemo.vue
  用可视化方式解释：jQuery = 手动改 DOM；框架 = 改 State 自动同步
-->
<template>
  <div class="jq-demo">
    <div class="header">
      <div class="title">什么是 jQuery？用“购物车数量”秒懂</div>
      <div class="subtitle">
        左边：像 jQuery 一样手动改页面（容易漏）。右边：像 Vue/React
        一样只改状态。
      </div>
    </div>

    <div class="panes">
      <!-- jQuery-like -->
      <div class="pane">
        <div class="pane-title">jQuery 思路：到处改 DOM</div>
        <div class="mock-app">
          <div class="topbar">
            <span>🛒 角标：</span>
            <span class="badge" :class="{ wrong: jqBadgeWrong }">{{
              jqBadge
            }}</span>
          </div>
          <div class="content">
            <div class="row">
              购物车页数量：
              <span class="num" :class="{ wrong: jqPageWrong }">{{
                jqPage
              }}</span>
            </div>
            <div class="row">
              结算按钮：
              <button class="checkout">去结算 ({{ jqButtonLabel }})</button>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="control-title">模拟“你写的命令”</div>
          <div class="btns">
            <button @click="jqIncreaseData">数据 +1（但还没改页面）</button>
            <button @click="jqUpdateBadge">改角标</button>
            <button @click="jqUpdateCartPage">改购物车页</button>
            <button @click="jqUpdateCheckoutButton">改结算按钮</button>
          </div>

          <div class="hint" :class="{ danger: jqInconsistent }">
            {{ jqHint }}
          </div>

          <div class="log">
            <div class="log-title">命令日志</div>
            <div v-if="jqLogs.length === 0" class="log-empty">
              （还没有操作）
            </div>
            <div v-else class="log-list">
              <div v-for="(l, idx) in jqLogs" :key="idx" class="log-item">
                {{ l }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- State-driven -->
      <div class="pane">
        <div class="pane-title">Vue/React 思路：只改 State</div>
        <div class="mock-app">
          <div class="topbar">
            <span>🛒 角标：</span>
            <span class="badge">{{ state }}</span>
          </div>
          <div class="content">
            <div class="row">
              购物车页数量： <span class="num">{{ state }}</span>
            </div>
            <div class="row">
              结算按钮：
              <button class="checkout">去结算 ({{ state }} 件)</button>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="control-title">你只需要做一件事</div>
          <div class="btns">
            <button class="primary" @click="state = state + 1">state +1</button>
            <button class="secondary" @click="resetAll">重置</button>
          </div>
          <div class="hint ok">
            State 变了，界面三处会自动同步，不需要你“手动找 DOM 去改”。
          </div>

          <div class="mini">
            <div class="mini-title">这里的两个新词</div>
            <div class="mini-item">
              <strong>DOM</strong>：浏览器里的页面结构（按钮/文字/图片都在里面）
            </div>
            <div class="mini-item">
              <strong>State</strong>：页面的数据（比如购物车数量）
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const state = ref(1)

// jQuery side: "real data" + "DOM" values displayed at multiple places
const jqData = ref(1)
const jqBadge = ref(1)
const jqPage = ref(1)
const jqButtonLabel = ref('1 件')
const jqLogs = ref([])

const log = (txt) => {
  jqLogs.value.unshift(
    `${new Date().toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })} - ${txt}`
  )
  jqLogs.value = jqLogs.value.slice(0, 8)
}

const jqIncreaseData = () => {
  jqData.value += 1
  log(`数据 +1（现在真实数据 = ${jqData.value}）`)
}
const jqUpdateBadge = () => {
  jqBadge.value = jqData.value
  log(`更新角标 DOM = ${jqBadge.value}`)
}
const jqUpdateCartPage = () => {
  jqPage.value = jqData.value
  log(`更新购物车页 DOM = ${jqPage.value}`)
}
const jqUpdateCheckoutButton = () => {
  jqButtonLabel.value = `${jqData.value} 件`
  log(`更新结算按钮 DOM = ${jqButtonLabel.value}`)
}

const jqInconsistent = computed(() => {
  return (
    jqBadge.value !== jqData.value ||
    jqPage.value !== jqData.value ||
    jqButtonLabel.value !== `${jqData.value} 件`
  )
})

const jqBadgeWrong = computed(() => jqBadge.value !== jqData.value)
const jqPageWrong = computed(() => jqPage.value !== jqData.value)

const jqHint = computed(() => {
  if (!jqInconsistent.value) return '✅ 三处显示一致（恭喜你都改对了）'
  return '⚠️ 数据和页面不一致：你可能漏更新了某一处 DOM（真实项目里这就是 bug）'
})

const resetAll = () => {
  state.value = 1
  jqData.value = 1
  jqBadge.value = 1
  jqPage.value = 1
  jqButtonLabel.value = '1 件'
  jqLogs.value = []
}
</script>

<style scoped>
.jq-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.panes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.pane {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1rem;
}

.pane-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.mock-app {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.topbar {
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2ch;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.15);
  color: #1d4ed8;
  font-weight: 700;
}

.content {
  padding: 0.75rem;
}

.row {
  margin-bottom: 0.6rem;
  font-size: 0.92rem;
}

.num {
  font-weight: 800;
  padding: 0.05rem 0.25rem;
  border-radius: 6px;
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.checkout {
  border: none;
  background: var(--vp-c-brand);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  font-size: 0.85rem;
}

.controls {
  margin-top: 0.9rem;
}

.control-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btns button {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.35rem 0.65rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btns button.primary {
  border: none;
  background: #22c55e;
  color: #fff;
}

.btns button.secondary {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.hint {
  margin-top: 0.65rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.6rem 0.7rem;
  border-radius: 10px;
}

.hint.danger {
  color: #b91c1c;
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
}

.hint.ok {
  color: #166534;
  border-color: rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.08);
}

.wrong {
  background: rgba(239, 68, 68, 0.12) !important;
  color: #b91c1c !important;
}

.log {
  margin-top: 0.75rem;
}

.log-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.log-empty {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.log-list {
  display: grid;
  gap: 0.25rem;
}

.log-item {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.35rem 0.5rem;
}

.mini {
  margin-top: 0.75rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.75rem;
}

.mini-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.mini-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}
</style>
