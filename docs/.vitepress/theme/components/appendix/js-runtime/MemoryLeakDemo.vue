<script setup>
import { ref } from 'vue'

const activeScenario = ref('global-vars')

const scenarios = [
  { value: 'global-vars', label: '全局变量', icon: '🌍' },
  { value: 'event-listeners', label: '事件监听', icon: '🎯' },
  { value: 'closures', label: '闭包引用', icon: '🔒' }
]

// 全局变量场景
const globalMemory = ref([])

// 事件监听场景
const eventListeners = ref([])
const eventCount = ref(0)

// 闭包场景
const closureItems = ref([])

const memoryUsage = ref(0)
const maxMemory = ref(100)

const addGlobalVariable = () => {
  const largeData = new Array(10000).fill(`数据 ${globalMemory.value.length}`)
  globalMemory.value.push({
    id: Date.now(),
    data: largeData,
    timestamp: new Date().toLocaleTimeString()
  })
  updateMemory()
}

const clearGlobalVariables = () => {
  globalMemory.value = []
  updateMemory()
}

// 事件监听场景
const addEventListener = () => {
  const handler = () => console.log('事件监听器')
  eventListeners.value.push({
    id: Date.now(),
    handler: handler,
    active: true
  })
  eventCount.value++
  updateMemory()
}

const removeAllListeners = () => {
  eventListeners.value = []
  eventCount.value = 0
  updateMemory()
}

// 闭包场景
const createClosure = () => {
  const largeData = new Array(10000).fill('闭包数据')
  const closure = () => {
    return largeData.length
  }
  closureItems.value.push({
    id: Date.now(),
    closure: closure,
    data: largeData,
    timestamp: new Date().toLocaleTimeString()
  })
  updateMemory()
}

const clearClosures = () => {
  closureItems.value = []
  updateMemory()
}

const updateMemory = () => {
  const total = globalMemory.value.length + eventListeners.value.length + closureItems.value.length
  memoryUsage.value = Math.min(total, maxMemory.value)
}

const resetAll = () => {
  globalMemory.value = []
  eventListeners.value = []
  eventCount.value = 0
  closureItems.value = []
  memoryUsage.value = 0
}
</script>

<template>
  <div class="memory-leak-demo">
    <h3>内存泄漏演示</h3>

    <!-- 场景选择 -->
    <div class="scenario-tabs">
      <button
        v-for="scenario in scenarios"
        :key="scenario.value"
        @click="activeScenario = scenario.value"
        :class="{ 'active': activeScenario === scenario.value }"
        class="scenario-tab"
      >
        <span class="tab-icon">{{ scenario.icon }}</span>
        <span class="tab-label">{{ scenario.label }}</span>
      </button>
    </div>

    <!-- 内存使用情况 -->
    <div class="memory-monitor">
      <div class="monitor-header">
        <span class="monitor-title">内存使用情况</span>
        <span class="monitor-value">{{ memoryUsage }}%</span>
      </div>
      <div class="memory-bar">
        <div
          class="memory-fill"
          :class="{ 'warning': memoryUsage > 70, 'danger': memoryUsage > 90 }"
          :style="{ width: `${memoryUsage}%` }"
        >
          <span v-if="memoryUsage > 10" class="memory-text">{{ memoryUsage }}%</span>
        </div>
      </div>
      <div v-if="memoryUsage > 90" class="memory-alert">
        ⚠️ 内存占用过高!可能导致页面卡顿或崩溃
      </div>
    </div>

    <!-- 场景内容 -->
    <div class="scenario-content">
      <!-- 全局变量场景 -->
      <div v-if="activeScenario === 'global-vars'" class="scenario-panel">
        <h4>全局变量泄漏</h4>

        <div class="scenario-description">
          <p><strong>问题:</strong>全局变量不会被垃圾回收,会一直占用内存</p>
          <p><strong>示例:</strong>不断往全局数组添加数据,从不清理</p>
        </div>

        <div class="action-buttons">
          <button @click="addGlobalVariable" class="btn-add">
            ➕ 添加全局变量
          </button>
          <button @click="clearGlobalVariables" class="btn-clear">
            🗑️ 清空全局变量
          </button>
        </div>

        <div class="data-preview">
          <div class="preview-header">
            <span>全局变量 ({{ globalMemory.length }} 项)</span>
          </div>
          <div class="preview-list">
            <div
              v-for="item in globalMemory.slice(-5)"
              :key="item.id"
              class="preview-item"
            >
              <span class="item-id">ID: {{ item.id }}</span>
              <span class="item-time">{{ item.timestamp }}</span>
              <span class="item-size">{{ item.data.length }} 项数据</span>
            </div>
            <div v-if="globalMemory.length === 0" class="empty-state">
              暂无全局变量
            </div>
            <div v-if="globalMemory.length > 5" class="more-items">
              ... 还有 {{ globalMemory.length - 5 }} 项
            </div>
          </div>
        </div>

        <div class="code-example">
          <h5>❌ 错误做法</h5>
          <pre><code>// 全局变量不会被回收
globalCache = []
function addItem() {
  globalCache.push(largeData)
}</code></pre>
        </div>
      </div>

      <!-- 事件监听场景 -->
      <div v-if="activeScenario === 'event-listeners'" class="scenario-panel">
        <h4>事件监听器泄漏</h4>

        <div class="scenario-description">
          <p><strong>问题:</strong>事件监听器没有被移除,持续占用内存</p>
          <p><strong>示例:</strong>动态创建元素并添加监听,但从不移除</p>
        </div>

        <div class="action-buttons">
          <button @click="addEventListener" class="btn-add">
            ➕ 添加事件监听
          </button>
          <button @click="removeAllListeners" class="btn-clear">
            🗑️ 移除所有监听
          </button>
        </div>

        <div class="data-preview">
          <div class="preview-header">
            <span>活跃监听器: {{ eventCount }} 个</span>
          </div>
          <div class="listener-list">
            <div
              v-for="listener in eventListeners.slice(-5)"
              :key="listener.id"
              class="listener-item"
            >
              <div class="listener-icon">🎯</div>
              <div class="listener-info">
                <span class="listener-id">监听器 #{{ listener.id }}</span>
                <span class="listener-status">活跃中</span>
              </div>
            </div>
            <div v-if="eventListeners.length === 0" class="empty-state">
              暂无事件监听器
            </div>
            <div v-if="eventListeners.length > 5" class="more-items">
              ... 还有 {{ eventListeners.length - 5 }} 个监听器
            </div>
          </div>
        </div>

        <div class="code-example">
          <h5>❌ 错误做法</h5>
          <pre><code>// 监听器没有被移除
button.addEventListener('click', handler)
// 元素删除时监听器还在!</code></pre>

          <h5>✅ 正确做法</h5>
          <pre><code>// 保存监听器引用
const handler = () => { ... }
button.addEventListener('click', handler)

// 不需要时移除
button.removeEventListener('click', handler)</code></pre>
        </div>
      </div>

      <!-- 闭包场景 -->
      <div v-if="activeScenario === 'closures'" class="scenario-panel">
        <h4>闭包引用泄漏</h4>

        <div class="scenario-description">
          <p><strong>问题:</strong>闭包持有大对象引用,导致对象无法被回收</p>
          <p><strong>示例:</strong>闭包函数一直引用大数组</p>
        </div>

        <div class="action-buttons">
          <button @click="createClosure" class="btn-add">
            ➕ 创建闭包
          </button>
          <button @click="clearClosures" class="btn-clear">
            🗑️ 清空闭包
          </button>
        </div>

        <div class="data-preview">
          <div class="preview-header">
            <span>活跃闭包: {{ closureItems.length }} 个</span>
          </div>
          <div class="closure-list">
            <div
              v-for="item in closureItems.slice(-5)"
              :key="item.id"
              class="closure-item"
            >
              <div class="closure-icon">🔒</div>
              <div class="closure-info">
                <span class="closure-id">闭包 #{{ item.id }}</span>
                <span class="closure-time">{{ item.timestamp }}</span>
                <span class="closure-size">持有 {{ item.data.length }} 项数据</span>
              </div>
            </div>
            <div v-if="closureItems.length === 0" class="empty-state">
              暂无闭包
            </div>
            <div v-if="closureItems.length > 5" class="more-items">
              ... 还有 {{ closureItems.length - 5 }} 个闭包
            </div>
          </div>
        </div>

        <div class="code-example">
          <h5>❌ 错误做法</h5>
          <pre><code>// 闭包持有大对象引用
function createHandler() {
  const largeData = new Array(1000000)
  return function() {
    // largeData 一直被引用,不会被回收
    console.log('处理中')
  }
}
const handler = createHandler()</code></pre>

          <h5>✅ 正确做法</h5>
          <pre><code>// 使用后释放引用
let handler = createHandler()
handler()  // 使用
handler = null  // 释放引用</code></pre>
        </div>
      </div>
    </div>

    <!-- 重置按钮 -->
    <div class="global-actions">
      <button @click="resetAll" class="btn-reset">
        🔄 重置所有场景
      </button>
    </div>

    <!-- 总结 -->
    <div class="summary-box">
      <h4>如何避免内存泄漏</h4>
      <ul>
        <li><strong>避免全局变量:</strong> 使用 const/let 代替 var,尽量使用局部变量</li>
        <li><strong>及时清理监听器:</strong> 组件销毁时移除所有事件监听</li>
        <li><strong>释放闭包引用:</strong> 不需要时将闭包变量设为 null</li>
        <li><strong>使用 WeakMap/WeakSet:</strong> 自动清理不再被引用的对象</li>
        <li><strong>定期检查:</strong> 用 DevTools Memory 面板检查内存泄漏</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.memory-leak-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h5 {
  margin: 12px 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.scenario-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
}

.scenario-tab {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
}

.scenario-tab:hover {
  color: var(--vp-c-brand-1);
}

.scenario-tab.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.tab-icon {
  font-size: 18px;
  margin-right: 8px;
}

.tab-label {
  font-size: 14px;
}

.memory-monitor {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 20px;
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.monitor-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.monitor-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.memory-bar {
  height: 32px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.memory-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.memory-fill.warning {
  background: #ed8936;
}

.memory-fill.danger {
  background: #f56565;
}

.memory-text {
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.memory-alert {
  margin-top: 12px;
  padding: 12px;
  background: rgba(245, 101, 101, 0.1);
  border-left: 4px solid #f56565;
  border-radius: 6px;
  font-size: 13px;
  color: #f56565;
  font-weight: 500;
}

.scenario-content {
  margin-bottom: 20px;
}

.scenario-panel {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.scenario-description {
  margin-bottom: 16px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.scenario-description p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.scenario-description p:last-child {
  margin-bottom: 0;
}

.scenario-description strong {
  color: var(--vp-c-text-1);
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-add {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-add:hover {
  background: var(--vp-c-brand-2);
}

.btn-clear {
  background: #ed8936;
  color: white;
}

.btn-clear:hover {
  background: #dd6b20;
}

.btn-reset {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-border);
}

.btn-reset:hover {
  background: var(--vp-c-bg-soft-hover);
  border-color: var(--vp-c-brand-1);
}

.data-preview {
  margin-bottom: 20px;
}

.preview-header {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.preview-list,
.listener-list,
.closure-list {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
  min-height: 150px;
}

.preview-item,
.listener-item,
.closure-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  margin-bottom: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 13px;
}

.preview-item {
  justify-content: space-between;
}

.listener-icon,
.closure-icon {
  font-size: 20px;
}

.listener-info,
.closure-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.listener-id,
.closure-id {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.listener-status {
  font-size: 12px;
  color: #68d391;
}

.item-id,
.item-time,
.item-size,
.closure-time,
.closure-size {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.more-items {
  text-align: center;
  padding: 8px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-style: italic;
}

.code-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 16px;
}

.code-example pre {
  margin: 0;
}

.code-example code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}

.global-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.summary-box {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
}

.summary-box h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--vp-c-brand-1);
}

.summary-box ul {
  margin: 0;
  padding-left: 20px;
}

.summary-box li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.summary-box strong {
  color: var(--vp-c-text-1);
}
</style>
