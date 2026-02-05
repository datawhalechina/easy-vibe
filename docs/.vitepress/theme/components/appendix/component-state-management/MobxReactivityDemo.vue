<template>
  <div class="mobx-reactivity-demo">
    <div class="demo-header">
      <h4>MobX 响应式原理演示</h4>
      <p class="hint">体验 MobX 的自动依赖追踪机制，理解 Observable、Action 和 Reaction 的关系</p>
    </div>

    <!-- 可视化图表 -->
    <div class="visualization-area">
      <div class="flow-diagram">
        <!-- Observable -->
        <div class="box-container observable-side">
          <div class="box-title">Observable (可观察状态)</div>
          <div class="state-boxes">
            <div
              v-for="item in todos"
              :key="item.id"
              class="state-item"
              :class="{ completed: item.completed, changed: recentlyChanged === item.id }"
            >
              <span class="item-text">{{ item.text }}</span>
              <span class="item-status">{{ item.completed ? '✓' : '○' }}</span>
            </div>
          </div>
        </div>

        <!-- 连接箭头 -->
        <div class="connection-area">
          <div class="arrow-bidirectional">
            <div class="arrow-label top">追踪依赖</div>
            <div class="arrow-line">
              <div class="particles">
                <span v-for="i in 3" :key="i" class="particle">●</span>
              </div>
            </div>
            <div class="arrow-label bottom">触发更新</div>
          </div>
        </div>

        <!-- Reaction -->
        <div class="box-container reaction-side">
          <div class="box-title">Reaction (响应/副作用)</div>
          <div class="reactions-list">
            <div class="reaction-item computed">
              <div class="reaction-header">
                <span class="reaction-icon">🧮</span>
                <span class="reaction-name">Computed: 待办统计</span>
              </div>
              <div class="reaction-value">
                共 {{ todos.length }} 项，已完成 {{ completedCount }} 项
              </div>
            </div>

            <div class="reaction-item autorun">
              <div class="reaction-header">
                <span class="reaction-icon">🔄</span>
                <span class="reaction-name">Autorun: 自动保存</span>
              </div>
              <div class="reaction-status" :class="{ active: autoSaveActive }">
                {{ autoSaveActive ? '💾 已自动保存到 localStorage' : '⏸️ 等待变更...' }}
              </div>
            </div>

            <div class="reaction-item reaction">
              <div class="reaction-header">
                <span class="reaction-icon">👀</span>
                <span class="reaction-name">Reaction: 变更日志</span>
              </div>
              <div class="reaction-log">
                <div v-for="(log, index) in changeLogs" :key="index" class="log-entry">
                  <span class="log-time">{{ log.time }}</span>
                  <span class="log-action">{{ log.action }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action 区域 -->
    <div class="action-area">
      <div class="action-title">🎮 交互控制台 (Action)</div>
      <div class="action-controls">
        <div class="input-group">
          <input v-model="newTodoText" placeholder="输入待办事项..." @keyup.enter="addTodo" />
          <button @click="addTodo">添加</button>
        </div>
        <div class="quick-actions">
          <button @click="completeAll">全部完成</button>
          <button @click="clearCompleted">清除已完成</button>
          <button @click="reset">重置</button>
        </div>
      </div>
    </div>

    <!-- 说明区域 -->
    <div class="explanation-area">
      <div class="explanation-card">
        <h5>📦 Observable (可观察状态)</h5>
        <p>使用 <code>observable</code> 或类属性装饰器 <code>@observable</code> 定义的状态。当状态变化时，所有依赖它的 Reaction 会自动重新执行。</p>
      </div>

      <div class="explanation-card">
        <h5>⚡ Action (动作)</h5>
        <p>使用 <code>action</code> 或 <code>@action</code> 装饰器标记的方法。用于修改 Observable 状态。Action 会批量处理变更通知，避免中间状态的重复渲染。</p>
      </div>

      <div class="explanation-card"
>
        <h5>🔄 Reaction (响应)</h5>
        <p>当 Observable 状态变化时自动执行的副作用。包括：</p>
        <ul>
          <li><code>autorun</code>: 自动追踪依赖并执行</li>
          <li><code>reaction</code>: 对特定数据变化作出反应</li>
          <li><code>when</code>: 条件满足时执行一次</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 状态
const todos = ref([
  { id: 1, text: '学习 MobX', completed: false },
  { id: 2, text: '理解响应式原理', completed: true }
])

const newTodoText = ref('')
const recentlyChanged = ref(null)
const autoSaveActive = ref(false)
const changeLogs = ref([])

// 计算属性（模拟 MobX 的 computed）
const completedCount = computed(() => {
  return todos.value.filter(t => t.completed).length
})

// 方法（模拟 MobX 的 action）
const addTodo = () => {
  if (!newTodoText.value.trim()) return

  const newTodo = {
    id: Date.now(),
    text: newTodoText.value,
    completed: false
  }

  todos.value.push(newTodo)
  recentlyChanged.value = newTodo.id
  newTodoText.value = ''

  setTimeout(() => {
    recentlyChanged.value = null
  }, 500)

  addLog('添加待办', newTodo.text)
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    recentlyChanged.value = id
    setTimeout(() => {
      recentlyChanged.value = null
    }, 500)
    addLog(todo.completed ? '完成待办' : '取消完成', todo.text)
  }
}

const completeAll = () => {
  todos.value.forEach(t => t.completed = true)
  addLog('全部完成', `${todos.value.length} 项`)
}

const clearCompleted = () => {
  const count = todos.value.filter(t => t.completed).length
  todos.value = todos.value.filter(t => !t.completed)
  addLog('清除已完成', `${count} 项`)
}

const reset = () => {
  todos.value = [
    { id: 1, text: '学习 MobX', completed: false },
    { id: 2, text: '理解响应式原理', completed: true }
  ]
  changeLogs.value = []
  addLog('重置', '恢复初始状态')
}

const addLog = (action, detail) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  changeLogs.value.unshift({ time, action, detail })
  if (changeLogs.value.length > 10) {
    changeLogs.value = changeLogs.value.slice(0, 10)
  }
}

// 模拟 autorun - 自动保存
watch(todos, () => {
  autoSaveActive.value = true
  setTimeout(() => {
    autoSaveActive.value = false
  }, 1000)
}, { deep: true })
</script>

<style scoped>
.mobx-reactivity-demo {
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

.visualization-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.flow-diagram {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: start;
}

@media (max-width: 968px) {
  .flow-diagram {
    grid-template-columns: 1fr;
  }

  .connection-area {
    transform: rotate(90deg);
    padding: 40px 0 !important;
  }
}

.box-container {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.box-container.observable-side {
  border-color: #ff6b6b;
}

.box-container.reaction-side {
  border-color: #4ecdc4;
}

.box-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.state-boxes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.state-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.state-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.state-item.completed {
  background: #f0fdf4;
  border-color: #86efac;
}

.state-item.changed {
  animation: highlight 0.5s ease;
}

@keyframes highlight {
  0%, 100% { background: var(--vp-c-bg); }
  50% { background: #fef3c7; }
}

.item-text {
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.state-item.completed .item-text {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.item-status {
  font-size: 14px;
  color: #22c55e;
}

.connection-area {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.arrow-bidirectional {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  white-space: nowrap;
}

.arrow-label.top {
  margin-bottom: 4px;
}

.arrow-label.bottom {
  margin-top: 4px;
}

.arrow-line {
  position: relative;
  width: 3px;
  height: 80px;
  background: linear-gradient(to bottom, #ff6b6b, #4ecdc4);
  border-radius: 2px;
}

.particles {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
}

.particle {
  font-size: 8px;
  color: var(--vp-c-brand);
  animation: flow 1.5s linear infinite;
  opacity: 0;
}

.particle:nth-child(1) { animation-delay: 0s; }
.particle:nth-child(2) { animation-delay: 0.5s; }
.particle:nth-child(3) { animation-delay: 1s; }

@keyframes flow {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(60px);
  }
}

.reactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reaction-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  transition: all 0.3s ease;
}

.reaction-item.computed {
  border-left: 4px solid #8b5cf6;
}

.reaction-item.autorun {
  border-left: 4px solid #f59e0b;
}

.reaction-item.reaction {
  border-left: 4px solid #ec4899;
}

.reaction-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.reaction-icon {
  font-size: 14px;
}

.reaction-name {
  font-weight: 600;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.reaction-value {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-family: monospace;
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.reaction-status {
  font-size: 12px;
  color: var(--vp-c-text-3);
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.reaction-status.active {
  color: #22c55e;
  background: #dcfce7;
}

.reaction-log {
  max-height: 100px;
  overflow-y: auto;
}

.log-entry {
  display: flex;
  gap: 8px;
  font-size: 11px;
  padding: 3px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.log-action {
  color: var(--vp-c-text-2);
}

.action-area {
  margin-top: 20px;
  padding: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.action-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  font-size: 14px;
}

.action-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group {
  display: flex;
  gap: 8px;
}

.input-group input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.input-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.input-group button {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.input-group button:hover {
  background: var(--vp-c-brand-dark);
}

.quick-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.quick-actions button {
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-actions button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.explanation-area {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.explanation-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.explanation-card h5 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.explanation-card p {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.explanation-card code {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
  color: var(--vp-c-brand);
}

.explanation-card ul {
  margin: 8px 0 0 0;
  padding-left: 18px;
}

.explanation-card li {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin: 4px 0;
}

@media (max-width: 640px) {
  .quick-actions {
    justify-content: center;
  }
}
</style>
