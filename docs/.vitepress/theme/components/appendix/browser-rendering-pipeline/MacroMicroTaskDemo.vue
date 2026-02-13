<template>
  <div class="macro-micro-task-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">宏任务与微任务</span>
      <span class="subtitle">事件循环中的任务优先级</span>
    </div>

    <div class="intro-text">
      JavaScript 是单线程的，但可以通过<span class="highlight">任务队列</span>实现异步。就像餐厅只有一个厨师，但他可以同时处理多个订单：先做VIP订单（微任务），再做普通订单（宏任务）。
    </div>

    <div class="demo-content">
      <div class="event-loop-flow">
        <div class="flow-container">
          <div class="flow-section main-thread">
            <div class="section-title">主线程（执行栈）</div>
            <div class="execution-box">
              <div class="exec-item" :class="{ active: currentStep === 'script' }">
                <span class="exec-label">同步代码</span>
              </div>
            </div>
          </div>

          <div class="flow-section task-queues">
            <div class="section-title">任务队列</div>
            <div class="queues-container">
              <div class="queue-box micro">
                <div class="queue-title">微任务队列（优先级高）</div>
                <div class="queue-items">
                  <div
                    v-for="task in microTasks"
                    :key="task.id"
                    class="queue-item"
                    :class="{ active: task.isActive, processing: task.isProcessing }"
                  >
                    {{ task.name }}
                  </div>
                </div>
              </div>

              <div class="queue-box macro">
                <div class="queue-title">宏任务队列（优先级低）</div>
                <div class="queue-items">
                  <div
                    v-for="task in macroTasks"
                    :key="task.id"
                    class="queue-item"
                    :class="{ active: task.isActive, processing: task.isProcessing }"
                  >
                    {{ task.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-example">
        <div class="example-title">代码示例</div>
        <pre class="code-block"><code>console.log('1')

setTimeout(() => console.log('2'), 0)  // 宏任务

Promise.resolve().then(() => console.log('3'))  // 微任务

console.log('4')

<span class="code-comment">// 输出顺序：1 → 4 → 3 → 2</span></code></pre>
      </div>

      <div class="control-panel">
        <button class="run-btn" @click="runDemo">
          {{ isRunning ? '🔄 运行中...' : '▶️ 运行演示' }}
        </button>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心要点：</strong>每次宏任务执行完后，会清空所有微任务，然后再执行下一个宏任务。这就是为什么 Promise.then() 比 setTimeout() 先执行。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isRunning = ref(false)
const currentStep = ref('script')

const microTasks = ref([
  { id: 1, name: 'Promise.then()', isActive: false, isProcessing: false },
  { id: 2, name: 'queueMicrotask()', isActive: false, isProcessing: false }
])

const macroTasks = ref([
  { id: 1, name: 'setTimeout()', isActive: false, isProcessing: false },
  { id: 2, name: 'setInterval()', isActive: false, isProcessing: false },
  { id: 3, name: 'I/O 操作', isActive: false, isProcessing: false }
])

async function runDemo() {
  if (isRunning.value) return
  isRunning.value = true

  // Reset
  microTasks.value.forEach(t => {
    t.isActive = false
    t.isProcessing = false
  })
  macroTasks.value.forEach(t => {
    t.isActive = false
    t.isProcessing = false
  })

  // Step 1: Sync code
  currentStep.value = 'script'
  await sleep(800)

  // Step 2: Process microtasks
  microTasks.value[0].isActive = true
  await sleep(500)
  microTasks.value[0].isActive = false
  microTasks.value[0].isProcessing = true
  await sleep(600)
  microTasks.value[0].isProcessing = false

  microTasks.value[1].isActive = true
  await sleep(500)
  microTasks.value[1].isActive = false
  microTasks.value[1].isProcessing = true
  await sleep(600)
  microTasks.value[1].isProcessing = false

  // Step 3: Process one macrotask
  macroTasks.value[0].isActive = true
  await sleep(500)
  macroTasks.value[0].isActive = false
  macroTasks.value[0].isProcessing = true
  await sleep(600)
  macroTasks.value[0].isProcessing = false

  currentStep.value = ''
  isRunning.value = false
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>

<style scoped>
.macro-micro-task-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
}

.event-loop-flow {
  margin-bottom: 1rem;
}

.flow-container {
  display: flex;
  gap: 1rem;
}

.flow-section {
  flex: 1;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-align: center;
}

.execution-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exec-item {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.exec-item.active {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.05);
}

.queues-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.queue-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.queue-title {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.queue-box.micro .queue-title {
  color: var(--vp-c-brand-1);
}

.queue-box.macro .queue-title {
  color: var(--vp-c-text-3);
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.queue-item {
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.queue-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.queue-item.processing {
  background: var(--vp-c-success);
  color: white;
  border-color: var(--vp-c-success);
}

.code-example {
  margin-bottom: 1rem;
}

.example-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.code-comment {
  color: var(--vp-c-text-3);
}

.control-panel {
  display: flex;
  justify-content: center;
}

.run-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.run-btn:hover {
  background: var(--vp-c-brand-dark);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
