<template>
  <div class="vuex-pinia-demo">
    <div class="demo-header">
      <h4>Vuex vs Pinia 深度对比</h4>
      <p class="hint">体验 Vue 生态两种主流状态管理方案在语法、类型支持和开发体验上的差异</p>
    </div>

    <div class="comparison-container">
      <!-- Vuex 面板 -->
      <div class="panel vuex-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span class="panel-icon">🌿</span>
            <span>Vuex</span>
          </div>
          <span class="panel-badge legacy">经典</span>
        </div>

        <div class="panel-content">
          <!-- Store 定义 -->
          <div class="code-section">
            <div class="code-header">
              <span class="file-icon">📄</span>
              <span class="file-name">store/index.js</span>
            </div>
            <div class="code-block" v-pre>
              <pre><code>import { createStore } from 'vuex'

export default createStore({
  // State
  state: {
    count: 0,
    user: null
  },

  // Getters
  getters: {
    doubleCount: state => {
      return (state?.count ?? 0) * 2
    },
    isLoggedIn: state => !!(state?.user)
  },

  // Mutations (同步)
  mutations: {
    INCREMENT(state) {
      state.count = (state?.count ?? 0) + 1
    },
    SET_USER(state, user) {
      state.user = user
    }
  },

  // Actions (可异步)
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('INCREMENT')
      }, 1000)
    },
    async fetchUser({ commit }, userId) {
      const response =
        await fetch(\`/api/users/\${userId}\`)
      const user = await response.json()
      commit('SET_USER', user)
    }
  }
})</code></pre>
            </div>
          </div>

          <!-- 组件中使用 -->
          <div class="code-section">
            <div class="code-header">
              <span class="file-icon">📄</span>
              <span class="file-name">Counter.vue</span>
            </div>
            <div class="code-block" v-pre>
              <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: {{ count }}&lt;/p&gt;
    &lt;p&gt;Double: {{ doubleCount }}&lt;/p&gt;
    &lt;button @click="increment"&gt;+&lt;/button&gt;
    &lt;button @click="incrementAsync"&gt;+ (async)&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations(['INCREMENT']),
    ...mapActions(['incrementAsync']),

    increment() {
      this.INCREMENT()
    }
  }
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间对比区 -->
      <div class="comparison-divider">
        <div class="vs-badge">VS</div>
        <div class="comparison-points">
          <div class="point">
            <span class="point-icon">📝</span>
            <span class="point-text">Vuex 样板代码较多</span>
          </div>
          <div class="point">
            <span class="point-icon">🔷</span>
            <span class="point-text">TS 类型需额外定义</span>
          </div>
          <div class="point">
            <span class="point-icon">⚙️</span>
            <span class="point-text">选项式 API 风格</span>
          </div>
        </div>
      </div>

      <!-- Pinia 面板 -->
      <div class="panel pinia-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span class="panel-icon">🍍</span>
            <span>Pinia</span>
          </div>
          <span class="panel-badge modern">推荐</span>
        </div>

        <div class="panel-content">
          <!-- Store 定义 -->
          <div class="code-section">
            <div class="code-header">
              <span class="file-icon">📄</span>
              <span class="file-name">stores/counter.js</span>
            </div>
            <div class="code-block" v-pre>
              <pre><code>import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 方式1: 组合式 API (推荐)
export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const user = ref(null)

  // Getters
  const doubleCount = computed(() => (count.value ?? 0) * 2)
  const isLoggedIn = computed(() => !!user.value)

  // Actions
  function increment() {
    count.value = (count.value ?? 0) + 1
  }

  async function incrementAsync() {
    await new Promise(r => setTimeout(r, 1000))
    increment()
  }

  async function fetchUser(userId) {
    const response = await fetch(\`/api/users/\${userId}\`)
    user.value = await response.json()
  }

  return {
    count, user,
    doubleCount, isLoggedIn,
    increment, incrementAsync, fetchUser
  }
})

// 方式2: 选项式 API
export const useCounterStoreOld = defineStore('counter', {
  state: () => ({
    count: 0,
    user: null
  }),
  getters: {
    doubleCount: (state) => (state?.count ?? 0) * 2
  },
  actions: {
    increment() {
      this.count = (this?.count ?? 0) + 1
    }
  }
})</code></pre>
            </div>
          </div>

          <!-- 组件中使用 -->
          <div class="code-section">
            <div class="code-header">
              <span class="file-icon">📄</span>
              <span class="file-name">Counter.vue</span>
            </div>
            <div class="code-block" v-pre>
              <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: {{ counter.count }}&lt;/p&gt;
    &lt;p&gt;Double: {{ counter.doubleCount }}&lt;/p&gt;
    &lt;button @click="counter.increment()"&gt;+&lt;/button&gt;
    &lt;button @click="counter.incrementAsync()"&gt;+ (async)&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useCounterStore } from '@/stores/counter'

// 直接获取 store 实例
const counter = useCounterStore()

// 或者直接解构（但会失去响应式！）
// const { count, increment } = useCounterStore() // ❌ 错误

// 正确解构方式：使用 storeToRefs
// import { storeToRefs } from 'pinia'
// const { count, doubleCount } = storeToRefs(counter)
// const { increment } = counter
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 特性对比表格 -->
    <div class="features-comparison">
      <h5>🔄 核心特性对比</h5>
      <div class="features-table">
        <div class="feature-row header">
          <div class="feature-name">特性</div>
          <div class="feature-vuex">Vuex</div>
          <div class="feature-pinia">Pinia</div>
        </div>
        <div v-for="feature in comparisonFeatures" :key="feature.name" class="feature-row">
          <div class="feature-name">{{ feature.name }}</div>
          <div class="feature-vuex" :class="{ check: feature.vuex === '✓', cross: feature.vuex === '✗' }">{{ feature.vuex }}</div>
          <div class="feature-pinia" :class="{ check: feature.pinia === '✓', cross: feature.pinia === '✗' }">{{ feature.pinia }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comparisonFeatures = [
  { name: '组合式 API 支持', vuex: '✗', pinia: '✓' },
  { name: 'TypeScript 支持', vuex: '△', pinia: '✓' },
  { name: '无需 mutations', vuex: '✗', pinia: '✓' },
  { name: '自动模块化', vuex: '✗', pinia: '✓' },
  { name: '更轻量的体积', vuex: '✗', pinia: '✓' },
  { name: 'Vue 2 支持', vuex: '✓', pinia: '△' },
  { name: '开发工具支持', vuex: '✓', pinia: '✓' },
  { name: 'SSR 支持', vuex: '✓', pinia: '✓' }
]
</script>

<style scoped>
.vuex-pinia-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 968px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }

  .comparison-divider {
    flex-direction: row !important;
    padding: 12px !important;
  }

  .comparison-points {
    flex-direction: row !important;
    flex-wrap: wrap;
  }
}

.panel {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.vuex-panel {
  border-color: #42b883;
}

.pinia-panel {
  border-color: #ffd859;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.panel-icon {
  font-size: 24px;
}

.panel-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.panel-badge.legacy {
  background: #e0f2fe;
  color: #0369a1;
}

.panel-badge.modern {
  background: #fef3c7;
  color: #92400e;
}

.panel-content {
  padding: 16px;
}

.code-section {
  margin-bottom: 16px;
}

.code-section:last-child {
  margin-bottom: 0;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.file-icon {
  font-size: 14px;
}

.file-name {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.code-block {
  background: #1e1e1e;
  border-radius: 6px;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 12px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.5;
  color: #d4d4d4;
}

.comparison-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.vs-badge {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #42b883, #ffd859);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: white;
  margin-bottom: 16px;
}

.comparison-points {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.point {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
}

.point-icon {
  font-size: 14px;
}

.point-text {
  color: var(--vp-c-text-2);
}

.features-comparison {
  margin-top: 24px;
  padding: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.features-comparison h5 {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.features-table {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.feature-row:last-child {
  border-bottom: none;
}

.feature-row.header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.feature-name,
.feature-vuex,
.feature-pinia {
  padding: 10px 12px;
  font-size: 13px;
}

.feature-vuex,
.feature-pinia {
  text-align: center;
  border-left: 1px solid var(--vp-c-divider);
}

.feature-vuex.check,
.feature-pinia.check {
  color: #22c55e;
  font-weight: 600;
}

.feature-vuex.cross,
.feature-pinia.cross {
  color: #ef4444;
}

.feature-vuex:not(.check):not(.cross),
.feature-pinia:not(.check):not(.cross) {
  color: #f59e0b;
}

@media (max-width: 640px) {
  .feature-row {
    grid-template-columns: 1fr 60px 60px;
  }

  .feature-name,
  .feature-vuex,
  .feature-pinia {
    padding: 8px;
    font-size: 11px;
  }
}
</style>
