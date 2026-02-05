<template>
  <div class="zustand-jotai-demo">
    <div class="demo-header">
      <h4>Zustand & Jotai：轻量级状态管理</h4>
      <p class="hint">探索现代 React 生态中最简洁的状态管理方案，体验"钩子即状态"的开发模式</p>
    </div>

    <div class="demo-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-name">{{ tab.name }}</span>
      </button>
    </div>

    <!-- Zustand 演示 -->
    <div v-if="activeTab === 'zustand'" class="tab-content">
      <div class="split-view">
        <!-- 左侧：代码 -->
        <div class="code-panel">
          <div class="code-tabs">
            <button
              v-for="file in zustandFiles"
              :key="file.name"
              class="code-tab"
              :class="{ active: activeZustandFile === file.name }"
              @click="activeZustandFile = file.name"
            >
              {{ file.name }}
            </button>
          </div>
          <div class="code-content">
            <pre><code>{{ getZustandFileContent() }}</code></pre>
          </div>
        </div>

        <!-- 右侧：演示 -->
        <div class="demo-panel">
          <div class="panel-header">
            <span class="header-icon">🐻</span>
            <span class="header-title">Zustand Store Demo</span>
          </div>

          <div class="bear-counter">
            <div class="bear-display">
              <span v-for="n in Math.min(bears, 10)" :key="n" class="bear-icon">🐻</span>
              <span v-if="bears > 10" class="more-bears">+{{ bears - 10 }}</span>
            </div>
            <div class="count-display">
              <span class="count-number">{{ bears }}</span>
              <span class="count-label">bears around here</span>
            </div>
          </div>

          <div class="fish-tank">
            <div class="tank-header">
              <span>🐟 Fish Tank</span>
              <span class="fish-count">{{ fishes }} fishes</span>
            </div>
            <div class="tank-content">
              <div v-for="fish in Math.min(fishes, 8)" :key="fish" class="fish">
                🐠
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="action-btn primary" @click="addBear">
              <span class="btn-icon">➕</span>
              Add Bear
            </button>
            <button class="action-btn secondary" @click="addFish">
              <span class="btn-icon">🐟</span>
              Add Fish
            </button>
            <button class="action-btn danger" @click="eatFish">
              <span class="btn-icon">🍽️</span>
              Eat Fish ({{ fishes }})
            </button>
            <button class="action-btn warning" @click="removeAllBears">
              <span class="btn-icon">🗑️</span>
              Remove All
            </button>
          </div>

          <div class="async-demo">
            <div class="async-header">Async Action Demo</div>
            <div class="async-controls">
              <button class="async-btn" :disabled="loading" @click="fetchBears">
                {{ loading ? '⏳ Fetching...' : '🌐 Fetch Bears from API' }}
              </button>
            </div>
            <div v-if="apiResponse" class="api-response">
              <pre>{{ apiResponse }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Jotai 演示 -->
    <div v-if="activeTab === 'jotai'" class="tab-content">
      <!-- Jotai 内容类似结构 -->
      <div class="split-view">
        <div class="code-panel">
          <!-- Jotai 代码示例 -->
          <div class="code-tabs">
            <button class="code-tab active">atoms/counter.js</button>
          </div>
          <div class="code-content">
            <pre><code>import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

// 基础原子
const countAtom = atom(0)

// 派生原子 - 自动追踪依赖
const doubleAtom = atom((get) => get(countAtom) * 2)
const isEvenAtom = atom((get) => get(countAtom) % 2 === 0)

// 可写派生原子
const countAndDoubleAtom = atom(
  (get) => ({
    count: get(countAtom),
    double: get(doubleAtom)
  }),
  (get, set, newCount) => {
    set(countAtom, newCount)
  }
)

// 原子家族 - 动态创建原子
const todoAtomFamily = atomFamily((id) =>
  atom({ id, text: '', completed: false })
)

// 异步原子
const userAtom = atom(null)
const fetchUserAtom = atom(
  (get) => get(userAtom),
  async (get, set, userId) => {
    const response = await fetch(\`/api/users/\${userId}\`)
    const user = await response.json()
    set(userAtom, user)
  }
)

export {
  countAtom,
  doubleAtom,
  isEvenAtom,
  countAndDoubleAtom,
  todoAtomFamily,
  fetchUserAtom
}</code></pre>
          </div>
        </div>

        <div class="demo-panel">
          <div class="panel-header">
            <span class="header-icon">⚛️</span>
            <span class="header-title">Jotai Atom Demo</span>
          </div>

          <div class="atom-demo">
            <div class="atom-visualization">
              <div class="atom-core" :class="{ active: count > 0 }">
                <div class="atom-nucleus">
                  <span class="nucleus-label">countAtom</span>
                  <span class="nucleus-value">{{ count }}</span>
                </div>
                <div class="electron-orbits">
                  <div class="orbit orbit-1"></div>
                  <div class="orbit orbit-2"></div>
                  <div class="orbit orbit-3"></div>
                </div>
              </div>

              <div class="derived-atoms">
                <div class="derived-atom" :class="{ active: double > 0 }">
                  <div class="atom-label">doubleAtom</div>
                  <div class="atom-value">{{ double }}</div>
                  <div class="atom-formula">count × 2</div>
                </div>

                <div class="derived-atom" :class="{ active: true }">
                  <div class="atom-label">isEvenAtom</div>
                  <div class="atom-value" :class="{ even: isEven }">{{ isEven ? 'YES' : 'NO' }}</div>
                  <div class="atom-formula">count % 2 === 0</div>
                </div>
              </div>
            </div>

            <div class="atom-controls">
              <div class="control-group">
                <button class="control-btn" @click="increment">
                  <span class="btn-icon">➕</span>
                  increment()
                </button>
                <button class="control-btn" @click="decrement">
                  <span class="btn-icon">➖</span>
                  decrement()
                </button>
                <button class="control-btn" @click="reset">
                  <span class="btn-icon">🔄</span>
                  reset()
                </button>
              </div>

              <div class="control-group">
                <button class="control-btn async" :disabled="loading" @click="fetchRandom">
                  <span class="btn-icon">{{ loading ? '⏳' : '🎲' }}</span>
                  {{ loading ? 'Fetching...' : 'Fetch Random (Async)' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部说明 -->
    <div class="info-section">
      <div class="info-card">
        <h5>🎯 核心概念</h5>
        <ul>
          <li><strong>Atom</strong>: 状态的基本单元，可读写</li>
          <li><strong>Derived Atom</strong>: 派生状态，自动追踪依赖</li>
          <li><strong>Atom Family</strong>: 动态创建原子集合</li>
        </ul>
      </div>

      <div class="info-card">
        <h5>⚡ 与 Redux/MobX 对比</h5>
        <ul>
          <li>更细粒度的状态管理</li>
          <li>天然支持 TypeScript</li>
          <li>不需要 Provider 包裹</li>
          <li>与 React Suspense 配合良好</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Tab 切换
const activeTab = ref('zustand')
const tabs = [
  { id: 'zustand', name: 'Zustand', icon: '🐻' },
  { id: 'jotai', name: 'Jotai', icon: '⚛️' }
]

// Zustand 状态
const bears = ref(0)
const fishes = ref(5)
const loading = ref(false)
const apiResponse = ref('')

// 计算属性（模拟派生状态）
const double = computed(() => bears.value * 2)
const isEven = computed(() => bears.value % 2 === 0)

// 方法
const increment = () => {
  bears.value++
}

const decrement = () => {
  if (bears.value > 0) bears.value--
}

const reset = () => {
  bears.value = 0
  fishes.value = 5
}

const addBear = () => {
  bears.value++
}

const addFish = () => {
  fishes.value++
}

const eatFish = () => {
  if (fishes.value > 0) {
    fishes.value--
    bears.value += 0.1
  }
}

const removeAllBears = () => {
  bears.value = 0
}

const fetchBears = async () => {
  loading.value = true
  apiResponse.value = ''
  await new Promise(resolve => setTimeout(resolve, 1500))
  bears.value = Math.floor(Math.random() * 10) + 1
  apiResponse.value = `{\n  "status": "success",\n  "data": {\n    "bears": ${bears.value},\n    "message": "Bears fetched successfully"\n  }\n}`
  loading.value = false
}

const fetchRandom = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  bears.value = Math.floor(Math.random() * 100)
  loading.value = false
}

// 文件切换
const zustandFiles = [
  { name: 'store.js', content: `import { create } from 'zustand'

const useStore = create((set, get) => ({
  // State
  bears: 0,
  fishes: 5,

  // Computed (in component using selectors)
  // const doubleBears = useStore(state => state.bears * 2)

  // Actions
  increasePopulation: () =>
    set((state) => ({ bears: state.bears + 1 })),

  removeAllBears: () => set({ bears: 0 }),

  eatFish: () => set((state) => ({
    fishes: state.fishes - 1,
    bears: state.bears + 0.1
  })),

  // Async action
  fetchBears: async () => {
    try {
      const response = await fetch('/api/bears')
      const data = await response.json()
      if (data && typeof data.count === 'number') {
        set({ bears: data.count })
      }
    } catch (error) {
      console.error('Failed to fetch bears:', error)
    }
  },

  // Get current state
  getState: () => get()
}))

export default useStore` },
  { name: 'Component.jsx', content: `import useStore from './store'

// Component using Zustand
function BearCounter() {
  // Select only what you need - fine-grained updates
  const bears = useStore((state) => state.bears)
  const increase = useStore((state) => state.increasePopulation)

  return (
    <div>
      <h1>{bears} bears around here...</h1>
      <button onClick={increase}>Add bear</button>
    </div>
  )
}

// Async action usage
function BearFetcher() {
  const fetchBears = useStore((state) => state.fetchBears)
  const bears = useStore((state) => state.bears)

  return (
    <div>
      <p>Bears: {bears}</p>
      <button onClick={fetchBears}>
        Fetch Bears
      </button>
    </div>
  )
}

// Multiple state selections
function FishTank() {
  const { fishes, bears, eatFish } = useStore(
    (state) => ({
      fishes: state.fishes,
      bears: state.bears,
      eatFish: state.eatFish
    })
  )

  return (
    <div>
      <p>Fishes: {fishes}</p>
      <p>Bears: {bears}</p>
      <button onClick={eatFish}>Eat Fish</button>
    </div>
  )
}` }
]

const activeZustandFile = ref('store.js')

const getZustandFileContent = () => {
  return zustandFiles.find(f => f.name === activeZustandFile.value)?.content || ''
}
</script>

<style scoped>
.zustand-jotai-demo {
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

.demo-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 12px;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.tab-button.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 20px;
}

.tab-name {
  font-weight: 500;
}

.split-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 968px) {
  .split-view {
    grid-template-columns: 1fr;
  }
}

.code-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.code-tabs {
  display: flex;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-tab {
  padding: 10px 16px;
  background: transparent;
  border: none;
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.code-tab.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  border-bottom: 2px solid var(--vp-c-brand);
}

.code-content {
  max-height: 600px;
  overflow: auto;
}

.code-content pre {
  margin: 0;
  padding: 16px;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
  background: #1e1e1e;
}

.demo-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-icon {
  font-size: 24px;
}

.header-title {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.bear-counter {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.bear-display {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-bottom: 12px;
  min-height: 40px;
}

.bear-icon {
  font-size: 24px;
}

.more-bears {
  font-size: 14px;
  color: var(--vp-c-text-2);
  align-self: center;
}

.count-display {
  text-align: center;
}

.count-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.count-label {
  display: block;
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.fish-tank {
  background: linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.tank-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #0369a1;
}

.tank-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  min-height: 50px;
}

.fish {
  font-size: 28px;
  animation: swim 2s ease-in-out infinite;
}

.fish:nth-child(2) { animation-delay: 0.3s; }
.fish:nth-child(3) { animation-delay: 0.6s; }
.fish:nth-child(4) { animation-delay: 0.9s; }

@keyframes swim {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(-2deg); }
  75% { transform: translateY(3px) rotate(2deg); }
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.action-btn.primary:hover {
  background: var(--vp-c-brand-dark);
}

.action-btn.secondary {
  background: #0ea5e9;
  color: white;
}

.action-btn.secondary:hover {
  background: #0284c7;
}

.action-btn.danger {
  background: #ef4444;
  color: white;
}

.action-btn.danger:hover {
  background: #dc2626;
}

.action-btn.warning {
  background: #f59e0b;
  color: white;
}

.action-btn.warning:hover {
  background: #d97706;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 14px;
}

.async-demo {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px;
}

.async-header {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.async-controls {
  margin-bottom: 8px;
}

.async-btn {
  width: 100%;
  padding: 10px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.async-btn:hover:not(:disabled) {
  background: #7c3aed;
}

.async-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.api-response {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 10px;
  overflow: auto;
}

.api-response pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  line-height: 1.5;
  color: #d4d4d4;
}

.info-section {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.info-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.info-card h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.info-card ul {
  margin: 0;
  padding-left: 18px;
}

.info-card li {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin: 5px 0;
  line-height: 1.5;
}

.info-card li strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .action-buttons {
    grid-template-columns: 1fr;
  }

  .atom-core {
    transform: scale(0.9);
  }
}
</style>
