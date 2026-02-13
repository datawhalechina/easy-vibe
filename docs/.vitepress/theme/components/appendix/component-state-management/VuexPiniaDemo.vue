<template>
  <div class="vuex-pinia-demo">
    <div class="demo-header">
      <span class="icon">🍍</span>
      <span class="title">Vuex vs Pinia</span>
      <span class="subtitle">Vue 状态管理的新老方案</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">餐厅</span>点餐：Vuex 就像传统餐厅，需要分部门（state/mutations/actions）填写单据；Pinia 就像快餐店，直接在一个柜台（组合式 API）搞定所有流程。
    </div>

    <div class="demo-content">
      <div class="comparison-cards">
        <div class="card vuex-card" :class="{ active: activeTab === 'vuex' }" @click="activeTab = 'vuex'">
          <div class="card-header">
            <span class="card-icon">🌿</span>
            <span class="card-title">Vuex</span>
            <span class="card-badge">经典</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">✅ 选项式 API</div>
              <div class="feature-item">✅ State / Mutations / Actions 分离</div>
              <div class="feature-item">❌ 样板代码较多</div>
              <div class="feature-item">❌ TypeScript 支持较弱</div>
            </div>
          </div>
        </div>

        <div class="card pinia-card" :class="{ active: activeTab === 'pinia' }" @click="activeTab = 'pinia'">
          <div class="card-header">
            <span class="card-icon">🍍</span>
            <span class="card-title">Pinia</span>
            <span class="card-badge recommended">推荐</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">✅ 组合式 API</div>
              <div class="feature-item">✅ 去除 Mutations，简化代码</div>
              <div class="feature-item">✅ 完美 TypeScript 支持</div>
              <div class="feature-item">✅ 自动代码分割</div>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="activeTab === 'vuex'" key="vuex" class="code-example">
          <div class="code-title">Vuex 代码示例</div>
          <pre class="code-block"><code>// store/index.js
export default createStore({
  state: { count: 0 },
  mutations: {
    INCREMENT(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    }
  }
})</code></pre>
        </div>

        <div v-else-if="activeTab === 'pinia'" key="pinia" class="code-example">
          <div class="code-title">Pinia 代码示例</div>
          <pre class="code-block"><code>// stores/counter.js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return { count, increment }
})</code></pre>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>选择建议：</strong>Vue 3 新项目直接用 Pinia，语法更简洁、TypeScript 支持更好。老项目用 Vuex 也没问题，但推荐逐步迁移到 Pinia。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('pinia')
</script>

<style scoped>
.vuex-pinia-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 1rem;
}

.comparison-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 1.5rem;
}

.card-title {
  font-weight: 600;
  font-size: 1rem;
  flex: 1;
}

.card-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.card-badge.recommended {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.card-body {
  padding: 0.5rem 0;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.code-example {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
}

.code-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.code-block {
  margin: 0;
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 6px;
  overflow-x: auto;
}

.code-block code {
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.6;
  color: #d4d4d4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
