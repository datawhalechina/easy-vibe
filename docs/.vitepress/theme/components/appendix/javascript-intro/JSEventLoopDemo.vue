<script setup>
import { ref } from 'vue'

const isPlaying = ref(false)
const currentStep = ref(0)
const codeQueue = ref([
  { id: 1, code: 'console.log("1")', type: 'sync', output: '1' },
  { id: 2, code: 'setTimeout(() => console.log("2"), 0)', type: 'async', output: '2' },
  { id: 3, code: 'console.log("3")', type: 'sync', output: '3' },
  { id: 4, code: 'fetch("/api").then(() => console.log("4"))', type: 'async', output: '4' },
  { id: 5, code: 'console.log("5")', type: 'sync', output: '5' }
])
const taskQueue = ref([])
const outputLog = ref([])

const steps = [
  { description: '执行 console.log("1")', output: '1' },
  { description: '遇到 setTimeout，把回调贴到便签栏', output: null },
  { description: '执行 console.log("3")', output: '3' },
  { description: '遇到 fetch，把回调贴到便签栏', output: null },
  { description: '执行 console.log("5")', output: '5' },
  { description: '执行 setTimeout 的回调', output: '2' },
  { description: '执行 fetch 的回调', output: '4' }
]

const reset = () => {
  currentStep.value = 0
  taskQueue.value = []
  outputLog.value = []
  isPlaying.value = false
}

const nextStep = () => {
  if (currentStep.value >= steps.length) return

  const step = steps[currentStep.value]

  if (currentStep.value === 1) {
    taskQueue.value.push({ id: 2, code: 'console.log("2")', status: 'pending' })
  } else if (currentStep.value === 3) {
    taskQueue.value.push({ id: 4, code: 'console.log("4")', status: 'pending' })
  } else if (currentStep.value === 4) {
    taskQueue.value[0].status = 'ready'
  } else if (currentStep.value === 5) {
    outputLog.value.push({ output: '2', source: 'setTimeout' })
    taskQueue.value.shift()
    taskQueue.value[0].status = 'ready'
  } else if (currentStep.value === 6) {
    outputLog.value.push({ output: '4', source: 'fetch' })
  }

  if (step.output) {
    outputLog.value.push({ output: step.output, source: '同步代码' })
  }

  currentStep.value++
}

const play = async () => {
  if (isPlaying.value) return
  isPlaying.value = true

  while (currentStep.value < steps.length && isPlaying.value) {
    nextStep()
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  isPlaying.value = false
}

const stop = () => {
  isPlaying.value = false
}
</script>

<template>
  <div class="event-loop-demo">
    <h3>事件循环：JavaScript 的执行机制</h3>

    <div class="workspace">
      <!-- 代码队列 -->
      <div class="code-queue-section">
        <h4>代码队列</h4>
        <div class="queue">
          <div
            v-for="(item, index) in codeQueue"
            :key="item.id"
            class="code-item"
            :class="{
              'active': currentStep === index,
              'processed': currentStep > index
            }"
          >
            <div class="item-index">
              {{ item.id }}
            </div>
            <div class="item-code">
              {{ item.code }}
            </div>
            <div
              v-if="currentStep === index"
              class="executing"
            >
              执行中
            </div>
          </div>
        </div>
      </div>

      <!-- 工位 -->
      <div class="worker-section">
        <h4>工位（单线程）</h4>
        <div class="worker">
          <div class="worker-emoji">
            👨‍💻
          </div>
          <div class="worker-status">
            {{ currentStep < steps.length ? '正在执行' : '执行完成' }}
          </div>
          <div
            v-if="currentStep < steps.length"
            class="current-task"
          >
            {{ steps[currentStep]?.description }}
          </div>
        </div>
      </div>

      <!-- 便签栏 -->
      <div class="task-queue-section">
        <h4>便签栏（任务队列）</h4>
        <div class="task-queue">
          <div
            v-for="task in taskQueue"
            :key="task.id"
            class="task-item"
            :class="{ 'ready': task.status === 'ready' }"
          >
            <div class="task-code">
              {{ task.code }}
            </div>
            <div class="task-status">
              {{ task.status === 'ready' ? '✅ 就绪' : '⏳ 等待中...' }}
            </div>
          </div>
          <div
            v-if="taskQueue.length === 0"
            class="empty-queue"
          >
            暂无待办任务
          </div>
        </div>
      </div>
    </div>

    <!-- 输出日志 -->
    <div class="output-section">
      <h4>输出日志</h4>
      <div class="output-log">
        <div
          v-if="outputLog.length === 0"
          class="empty-log"
        >
          等待输出...
        </div>
        <div
          v-for="(log, index) in outputLog"
          :key="index"
          class="log-entry"
        >
          <span class="log-output">{{ log.output }}</span>
          <span class="log-source">({{ log.source }})</span>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <button
        :disabled="isPlaying || currentStep >= steps.length"
        class="btn-play"
        @click="play"
      >
        {{ isPlaying ? '执行中...' : '▶ 自动播放' }}
      </button>
      <button
        :disabled="isPlaying || currentStep >= steps.length"
        class="btn-step"
        @click="nextStep"
      >
        ⏭ 单步执行
      </button>
      <button
        :disabled="!isPlaying"
        class="btn-stop"
        @click="stop"
      >
        ⏸ 停止
      </button>
      <button
        class="btn-reset"
        @click="reset"
      >
        🔄 重置
      </button>
    </div>

    <!-- 说明 -->
    <div class="explanation">
      <p><strong>执行顺序：</strong>{{ outputLog.map(l => l.output).join(', ') || '还未开始' }}</p>
      <p><strong>代码书写顺序：</strong>1, 2, 3, 4, 5</p>
      <p class="highlight">
        代码从上到下写的，但执行顺序不一定从上到下——因为异步操作会被"推迟"到当前代码执行完之后。
      </p>
    </div>
  </div>
</template>

<style scoped>
.event-loop-demo {
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
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.workspace {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .workspace {
    grid-template-columns: 1fr;
  }
}

.code-queue-section,
.worker-section,
.task-queue-section {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  min-height: 300px;
}

.queue,
.task-queue {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.code-item,
.task-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.code-item.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(62, 175, 124, 0.1);
  animation: highlight 1s ease infinite;
}

@keyframes highlight {
  0%, 100% { background: var(--vp-c-bg); }
  50% { background: rgba(62, 175, 124, 0.1); }
}

.code-item.processed {
  opacity: 0.5;
}

.item-index {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 20px;
}

.item-code,
.task-code {
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.executing {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.task-item.ready {
  border-color: #38a169;
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(56, 161, 105, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(56, 161, 105, 0); }
}

.task-status {
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.empty-queue {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.worker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.worker-emoji {
  font-size: 48px;
  margin-bottom: 12px;
}

.worker-status {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.current-task {
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding: 8px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.output-section {
  margin-bottom: 20px;
}

.output-log {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 60px;
  padding: 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.empty-log {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.log-entry {
  padding: 8px 12px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.log-output {
  font-family: 'Courier New', monospace;
}

.log-source {
  margin-left: 8px;
  font-size: 12px;
  opacity: 0.8;
}

.controls {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-play {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-play:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.btn-step {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-step:hover:not(:disabled) {
  background: var(--vp-c-bg-soft-hover);
}

.btn-stop {
  background: #ed8936;
  color: white;
}

.btn-stop:hover:not(:disabled) {
  background: #dd6b20;
}

.btn-reset {
  background: #f56565;
  color: white;
}

.btn-reset:hover {
  background: #e53e3e;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.explanation {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
}

.explanation p {
  margin: 0 0 8px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.explanation p:last-child {
  margin-bottom: 0;
}

.explanation strong {
  color: var(--vp-c-brand-1);
}

.explanation .highlight {
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}
</style>
