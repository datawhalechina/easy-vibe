<template>
  <div class="redux-flow-demo">
    <div class="demo-header">
      <h4>Redux 数据流演示</h4>
      <p class="hint">理解 Redux 的单向数据流：Action → Reducer → Store → View</p>
    </div>

    <div class="flow-diagram">
      <!-- 视图层 -->
      <div class="flow-layer view-layer">
        <div class="layer-header">
          <span class="layer-icon">👁️</span>
          <span class="layer-title">View (视图层)</span>
        </div>
        <div class="view-content">
          <div class="counter-display">
            <span class="counter-label">当前计数:</span>
            <span class="counter-value" :class="{ changed: countChanged }">{{ count }}</span>
          </div>
          <div class="action-buttons">
            <button class="action-btn" @click="dispatchAction('INCREMENT')">
              <span class="btn-icon">➕</span>
              增加
            </button>
            <button class="action-btn" @click="dispatchAction('DECREMENT')">
              <span class="btn-icon">➖</span>
              减少
            </button>
            <button class="action-btn" @click="dispatchAction('RESET')">
              <span class="btn-icon">🔄</span>
              重置
            </button>
          </div>
        </div>
      </div>

      <!-- 箭头：View -> Action -->
      <div class="flow-arrow-container">
        <div class="flow-arrow" :class="{ active: flowStage === 'action' }">
          <div class="arrow-line"></div>
          <div class="arrow-head">▼</div>
        </div>
        <div class="arrow-label" :class="{ active: flowStage === 'action' }">
          dispatch(action)
        </div>
      </div>

      <!-- Action 层 -->
      <div class="flow-layer action-layer" :class="{ active: flowStage === 'action' }">
        <div class="layer-header">
          <span class="layer-icon">📨</span>
          <span class="layer-title">Action (动作)</span>
        </div>
        <div class="action-content">
          <div class="action-object">
            <div class="code-block">
              <pre><code>{
  type: "{{ currentAction.type }}",
  payload: {{ currentAction.payload || 'undefined' }}
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 箭头：Action -> Reducer -->
      <div class="flow-arrow-container">
        <div class="flow-arrow" :class="{ active: flowStage === 'reducer' }">
          <div class="arrow-line"></div>
          <div class="arrow-head">▼</div>
        </div>
        <div class="arrow-label" :class="{ active: flowStage === 'reducer' }">
          reduce(state, action)
        </div>
      </div>

      <!-- Reducer 层 -->
      <div class="flow-layer reducer-layer" :class="{ active: flowStage === 'reducer' }">
        <div class="layer-header">
          <span class="layer-icon">⚙️</span>
          <span class="layer-title">Reducer (纯函数)</span>
        </div>
        <div class="reducer-content">
          <div class="reducer-function">
            <div class="code-block">
              <pre><code>function reducer(state, action) {
  switch (action.type) {
    case "{{ currentAction.type }}":
      return {
        ...state,
        count: (state?.count ?? 0) {{ currentAction.operator }} {{ currentAction.step || 1 }}
      };
    default:
      return state;
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 箭头：Reducer -> Store -->
      <div class="flow-arrow-container">
        <div class="flow-arrow" :class="{ active: flowStage === 'store' }">
          <div class="arrow-line"></div>
          <div class="arrow-head">▼</div>
        </div>
        <div class="arrow-label" :class="{ active: flowStage === 'store' }">
          update store
        </div>
      </div>

      <!-- Store 层 -->
      <div class="flow-layer store-layer" :class="{ active: flowStage === 'store' }">
        <div class="layer-header">
          <span class="layer-icon">🏪</span>
          <span class="layer-title">Store (单一数据源)</span>
        </div>
        <div class="store-content">
          <div class="store-state">
            <div class="state-label">Current State:</div>
            <div class="code-block">
              <pre><code>{
  count: {{ count }}
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 箭头：Store -> View -->
      <div class="flow-arrow-container">
        <div class="flow-arrow" :class="{ active: flowStage === 'view' }">
          <div class="arrow-line"></div>
          <div class="arrow-head">▲</div>
        </div>
        <div class="arrow-label" :class="{ active: flowStage === 'view' }">
          notify subscribers
        </div>
      </div>
    </div>

    <!-- 底部说明 -->
    <div class="redux-principles">
      <h5>📋 Redux 三大原则</h5>
      <div class="principles-grid">
        <div class="principle-card">
          <div class="principle-number">1</div>
          <h6>单一数据源</h6>
          <p>整个应用的 state 储存在唯一的 store 中</p>
        </div>
        <div class="principle-card">
          <div class="principle-number">2</div>
          <h6>State 只读</h6>
          <p>唯一改变 state 的方法是触发 action</p>
        </div>
        <div class="principle-card">
          <div class="principle-number">3</div>
          <h6>纯函数修改</h6>
          <p>Reducer 必须是纯函数，接收旧 state 返回新 state</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 状态
const count = ref(0)
const countChanged = ref(false)
const flowStage = ref('')

// 当前 action
const currentAction = reactive({
  type: '',
  payload: null,
  operator: '+',
  step: 1
})

// 调度 action
const dispatchAction = async (actionType) => {
  flowStage.value = 'action'

  // 设置当前 action
  currentAction.type = actionType

  switch (actionType) {
    case 'INCREMENT':
      currentAction.payload = undefined
      currentAction.operator = '+'
      currentAction.step = 1
      break
    case 'DECREMENT':
      currentAction.payload = undefined
      currentAction.operator = '-'
      currentAction.step = 1
      break
    case 'RESET':
      currentAction.payload = undefined
      currentAction.operator = '='
      currentAction.step = 0
      break
  }

  // 模拟流程
  await wait(600)
  flowStage.value = 'reducer'
  await wait(800)
  flowStage.value = 'store'
  await wait(600)
  flowStage.value = 'view'

  // 更新状态
  switch (actionType) {
    case 'INCREMENT':
      count.value++
      break
    case 'DECREMENT':
      count.value--
      break
    case 'RESET':
      count.value = 0
      break
  }

  countChanged.value = true
  setTimeout(() => {
    countChanged.value = false
  }, 300)

  await wait(400)
  flowStage.value = ''
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.redux-flow-demo {
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

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.flow-layer {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.flow-layer.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
  transform: scale(1.02);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.layer-icon {
  font-size: 20px;
}

.layer-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.view-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.counter-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.counter-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.counter-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--vp-c-brand);
  transition: all 0.3s ease;
}

.counter-value.changed {
  transform: scale(1.2);
  color: #22c55e;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 14px;
}

.flow-arrow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.flow-arrow.active {
  opacity: 1;
}

.arrow-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
  transition: all 0.3s ease;
}

.flow-arrow.active .arrow-line {
  background: var(--vp-c-brand);
  box-shadow: 0 0 8px var(--vp-c-brand);
}

.arrow-head {
  color: var(--vp-c-divider);
  font-size: 12px;
  line-height: 1;
  transition: all 0.3s ease;
}

.flow-arrow.active .arrow-head {
  color: var(--vp-c-brand);
  animation: bounce 0.5s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}

.arrow-label {
  margin-top: 4px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-family: monospace;
  transition: all 0.3s ease;
}

.arrow-label.active {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.action-content,
.reducer-content,
.store-content {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.action-object {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  font-size: 12px;
  line-height: 1.5;
  color: #d4d4d4;
}

.reducer-function {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.store-state {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.state-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.redux-principles {
  margin-top: 24px;
  padding: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.redux-principles h5 {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.principle-card {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.principle-number {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.principle-card h6 {
  margin: 0 0 6px 0;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.principle-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
  }

  .principles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
