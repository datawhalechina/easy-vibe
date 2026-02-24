<template>
  <div class="pattern-playground">
    <div class="demo-header">
      <span class="icon">🎮</span>
      <span class="title">设计模式演练场</span>
      <span class="subtitle">选择模式，动手体验</span>
    </div>

    <div class="mode-tabs">
      <button
        v-for="m in modes"
        :key="m.key"
        :class="['mode-btn', { active: activeMode === m.key }]"
        @click="activeMode = m.key; resetState()"
      >
        {{ m.icon }} {{ m.name }}
      </button>
    </div>

    <!-- 观察者模式演练 -->
    <div v-if="activeMode === 'observer'" class="playground-area">
      <div class="playground-desc">
        模拟事件发布/订阅：添加订阅者，发布事件，观察通知如何传播。
      </div>

      <div class="observer-layout">
        <div class="publisher-panel">
          <div class="panel-title">📡 发布者 (Publisher)</div>
          <div class="event-input">
            <input
              v-model="eventMessage"
              placeholder="输入事件消息..."
              @keyup.enter="publishEvent"
            />
            <button class="action-btn publish" @click="publishEvent">发布事件</button>
          </div>
        </div>

        <div class="subscribers-panel">
          <div class="panel-title">
            👥 订阅者
            <button class="action-btn add" @click="addSubscriber">+ 添加</button>
          </div>
          <div v-if="subscribers.length === 0" class="empty-hint">暂无订阅者，点击"添加"按钮</div>
          <div
            v-for="sub in subscribers"
            :key="sub.id"
            :class="['subscriber-card', { notified: sub.notified }]"
          >
            <span class="sub-name">{{ sub.name }}</span>
            <span v-if="sub.lastMsg" class="sub-msg">收到: {{ sub.lastMsg }}</span>
            <button class="remove-btn" @click="removeSubscriber(sub.id)">移除</button>
          </div>
        </div>
      </div>

      <div v-if="observerLog.length" class="event-log">
        <div class="log-title">📋 事件日志</div>
        <div v-for="(log, i) in observerLog" :key="i" class="log-item">{{ log }}</div>
      </div>
    </div>

    <!-- 策略模式演练 -->
    <div v-if="activeMode === 'strategy'" class="playground-area">
      <div class="playground-desc">
        选择不同的排序策略，观察同一组数据如何被不同算法处理。
      </div>

      <div class="strategy-layout">
        <div class="data-panel">
          <div class="panel-title">📊 待排序数据</div>
          <div class="data-bars">
            <div
              v-for="(v, i) in strategyData"
              :key="i"
              class="bar"
              :style="{ height: v * 3 + 'px', background: barColor(i) }"
            >
              <span class="bar-label">{{ v }}</span>
            </div>
          </div>
          <button class="action-btn" @click="shuffleData" style="margin-top: 10px">🔀 打乱数据</button>
        </div>

        <div class="strategy-panel">
          <div class="panel-title">⚙️ 选择策略</div>
          <div class="strategy-options">
            <button
              v-for="s in sortStrategies"
              :key="s.key"
              :class="['strategy-btn', { active: activeStrategy === s.key }]"
              @click="activeStrategy = s.key"
            >
              {{ s.name }}
              <span class="strategy-complexity">{{ s.complexity }}</span>
            </button>
          </div>
          <button class="action-btn publish" @click="executeSort" :disabled="sorting">
            {{ sorting ? '排序中...' : '▶ 执行排序' }}
          </button>
          <div v-if="sortSteps.length" class="steps-info">
            步骤数: {{ sortSteps.length }} | 策略: {{ sortStrategies.find(s => s.key === activeStrategy)?.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeMode = ref('observer')
const modes = [
  { key: 'observer', name: '观察者模式', icon: '📡' },
  { key: 'strategy', name: '策略模式', icon: '⚙️' }
]

// === 观察者模式状态 ===
let subIdCounter = 0
const subscribers = ref([])
const eventMessage = ref('')
const observerLog = ref([])
const subNames = ['小明', '小红', '小刚', '小美', '小李', '小王', '小张', '小赵']

function addSubscriber() {
  const name = subNames[subIdCounter % subNames.length]
  subscribers.value.push({
    id: ++subIdCounter,
    name: name + '#' + subIdCounter,
    lastMsg: '',
    notified: false
  })
  observerLog.value.unshift(`[订阅] ${name}#${subIdCounter} 加入了订阅列表`)
}

function removeSubscriber(id) {
  const sub = subscribers.value.find(s => s.id === id)
  subscribers.value = subscribers.value.filter(s => s.id !== id)
  if (sub) observerLog.value.unshift(`[取消订阅] ${sub.name} 离开了`)
}

function publishEvent() {
  const msg = eventMessage.value.trim() || '默认事件'
  observerLog.value.unshift(`[发布] 事件: "${msg}" → 通知 ${subscribers.value.length} 个订阅者`)
  subscribers.value.forEach((sub, i) => {
    setTimeout(() => {
      sub.lastMsg = msg
      sub.notified = true
      setTimeout(() => { sub.notified = false }, 600)
    }, i * 150)
  })
  eventMessage.value = ''
}

// === 策略模式状态 ===
const strategyData = ref([38, 15, 72, 46, 91, 23, 64, 8, 55, 30])
const activeStrategy = ref('bubble')
const sorting = ref(false)
const sortSteps = ref([])
const highlightIdx = ref(-1)

const sortStrategies = [
  { key: 'bubble', name: '冒泡排序', complexity: 'O(n²)' },
  { key: 'selection', name: '选择排序', complexity: 'O(n²)' },
  { key: 'insertion', name: '插入排序', complexity: 'O(n²)' }
]

function shuffleData() {
  const arr = [...strategyData.value]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  strategyData.value = arr
  sortSteps.value = []
}

function barColor(i) {
  if (i === highlightIdx.value) return '#f59e0b'
  return `hsl(${strategyData.value[i] * 2.5}, 65%, 55%)`
}

async function executeSort() {
  sorting.value = true
  sortSteps.value = []
  const arr = [...strategyData.value]
  const steps = []

  if (activeStrategy.value === 'bubble') {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          steps.push({ arr: [...arr], idx: j + 1 })
        }
      }
    }
  } else if (activeStrategy.value === 'selection') {
    for (let i = 0; i < arr.length; i++) {
      let min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) min = j
      }
      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[i]]
        steps.push({ arr: [...arr], idx: i })
      }
    }
  } else {
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = key
      steps.push({ arr: [...arr], idx: j + 1 })
    }
  }

  sortSteps.value = steps
  for (const step of steps) {
    strategyData.value = step.arr
    highlightIdx.value = step.idx
    await new Promise(r => setTimeout(r, 200))
  }
  highlightIdx.value = -1
  sorting.value = false
}

function resetState() {
  observerLog.value = []
  subscribers.value = []
  subIdCounter = 0
  eventMessage.value = ''
  strategyData.value = [38, 15, 72, 46, 91, 23, 64, 8, 55, 30]
  sortSteps.value = []
  sorting.value = false
  highlightIdx.value = -1
}
</script>

<style scoped>
.pattern-playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.demo-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
}
.demo-header .icon { font-size: 24px }
.demo-header .subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 400;
}
.mode-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.mode-btn {
  flex: 1;
  padding: 10px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}
.mode-btn.active {
  border-color: var(--vp-c-brand-1);
  background: rgba(100, 108, 255, 0.08);
  color: var(--vp-c-brand-1);
}
.playground-area { margin-top: 8px }
.playground-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 14px;
  line-height: 1.6;
}
.panel-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.action-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.action-btn:hover { background: var(--vp-c-bg-soft) }
.action-btn.publish {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.action-btn.publish:hover { opacity: 0.85 }
.action-btn.add {
  font-size: 12px;
  padding: 3px 10px;
}

/* Observer */
.observer-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.publisher-panel, .subscribers-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}
.event-input {
  display: flex;
  gap: 8px;
}
.event-input input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 13px;
  background: var(--vp-c-bg-soft);
}
.subscriber-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 4px;
  font-size: 13px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s;
}
.subscriber-card.notified {
  background: rgba(16, 185, 129, 0.15);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
}
.sub-name { font-weight: 500 }
.sub-msg {
  flex: 1;
  color: var(--vp-c-text-2);
  font-size: 12px;
}
.remove-btn {
  padding: 2px 8px;
  border: 1px solid #f87171;
  border-radius: 4px;
  background: transparent;
  color: #f87171;
  cursor: pointer;
  font-size: 11px;
}
.empty-hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 16px;
}
.event-log {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px;
  background: var(--vp-c-bg);
  max-height: 150px;
  overflow-y: auto;
}
.log-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}
.log-item {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 2px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Strategy */
.strategy-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.data-panel, .strategy-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}
.data-bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 280px;
  padding: 10px 0;
}
.bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 20px;
  transition: height 0.2s, background 0.2s;
}
.bar-label {
  font-size: 10px;
  color: #fff;
  font-weight: 600;
  margin-top: 4px;
}
.strategy-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}
.strategy-btn {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 13px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s;
}
.strategy-btn.active {
  border-color: var(--vp-c-brand-1);
  background: rgba(100, 108, 255, 0.08);
}
.strategy-complexity {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.steps-info {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .observer-layout, .strategy-layout {
    grid-template-columns: 1fr;
  }
}
</style>
