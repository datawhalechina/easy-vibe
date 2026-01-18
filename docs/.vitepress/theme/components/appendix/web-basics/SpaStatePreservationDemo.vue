<!--
  SpaStatePreservationDemo.vue
  SPA vs MPA：页面切换时“状态”是否保留的演示
-->
<template>
  <div class="spa-state-demo">
    <div class="header">
      <div class="title">页面切换时，输入会不会丢？</div>
      <div class="subtitle">
        同样点击“切换页面”，MPA 会像刷新一样清空；SPA 会保留状态
      </div>
    </div>

    <div class="mode-switch">
      <button
        class="mode"
        :class="{ active: mode === 'mpa' }"
        @click="switchMode('mpa')"
      >
        MPA（整页刷新）
      </button>
      <button
        class="mode"
        :class="{ active: mode === 'spa' }"
        @click="switchMode('spa')"
      >
        SPA（局部切换）
      </button>
      <button class="reset" @click="resetAll">重置</button>
    </div>

    <div class="app">
      <div class="nav">
        <button
          v-for="p in pages"
          :key="p"
          class="nav-btn"
          :class="{ active: page === p }"
          @click="go(p)"
        >
          {{ p }}
        </button>
      </div>

      <div class="screen">
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else class="content">
          <div class="row">
            当前页面：<strong>{{ page }}</strong>
          </div>

          <div class="form">
            <label>
              备注（模拟表单输入）：
              <input v-model="note" type="text" placeholder="输入点东西试试" />
            </label>
            <div class="help">
              提示：切到别的页面再回来，看看这段文字还在不在。
            </div>
          </div>

          <div class="row">
            购物车数量（模拟状态）：
            <button class="small" @click="cart = Math.max(0, cart - 1)">
              -
            </button>
            <strong class="num">{{ cart }}</strong>
            <button class="small" @click="cart = cart + 1">+</button>
          </div>
        </div>
      </div>

      <div class="explain">
        <div class="card">
          <div class="label">你现在看到的现象</div>
          <div class="value">{{ explainText }}</div>
        </div>
        <div class="card">
          <div class="label">背后的原因（一句话）</div>
          <div class="value">{{ reasonText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pages = ['首页', '商品', '购物车']
const mode = ref('mpa')
const page = ref('首页')
const loading = ref(false)

// 模拟用户输入/页面状态
const note = ref('我想买两杯奶茶')
const cart = ref(1)

const switchMode = (next) => {
  mode.value = next
  // 切模式时也模拟一次“回到首页”
  go('首页')
}

const resetAll = () => {
  mode.value = 'mpa'
  page.value = '首页'
  note.value = '我想买两杯奶茶'
  cart.value = 1
  loading.value = false
}

const go = (nextPage) => {
  loading.value = true

  // MPA：切换 = 类似刷新，状态丢失
  if (mode.value === 'mpa') {
    note.value = ''
    cart.value = 0
  }

  const delay = mode.value === 'mpa' ? 650 : 150
  setTimeout(() => {
    page.value = nextPage
    loading.value = false
  }, delay)
}

const explainText = computed(() =>
  mode.value === 'mpa'
    ? 'MPA：切换页面时像刷新，输入和状态经常会丢'
    : 'SPA：切换页面只换内容区域，输入和状态更容易保留'
)

const reasonText = computed(() =>
  mode.value === 'mpa'
    ? '因为浏览器加载了“新的页面”，旧页面的内存状态会被清掉'
    : '因为还是“同一个页面”，只是 JavaScript 把内容换了一下'
)
</script>

<style scoped>
.spa-state-demo {
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

.mode-switch {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.mode {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.mode.active {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.12);
}

.reset {
  border: none;
  background: var(--vp-c-brand);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.app {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 1rem;
}

.nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.nav-btn {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
}

.nav-btn.active {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.screen {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.9rem;
  min-height: 120px;
}

.loading {
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.content .row {
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
}

.form input {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.45rem 0.6rem;
  font-size: 0.9rem;
}

.help {
  margin-top: 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.small {
  border: none;
  background: rgba(99, 102, 241, 0.15);
  color: #4338ca;
  padding: 0.2rem 0.55rem;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 0.35rem;
}

.num {
  display: inline-block;
  min-width: 2ch;
  text-align: center;
}

.explain {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 0.9rem;
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.value {
  margin-top: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
}
</style>
