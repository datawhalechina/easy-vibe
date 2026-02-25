<!--
  TaskWorkerDemo.vue
  Worker 工作池演示：展示任务分发和消费过程
-->
<template>
  <div class="worker-demo">
    <div class="header">
      <div class="title">Worker 工作池模型</div>
      <div class="subtitle">观察任务如何被分发到不同 Worker 处理</div>
    </div>

    <div class="controls">
      <button class="ctrl-btn" @click="addTask" :disabled="running">添加任务</button>
      <button class="ctrl-btn primary" @click="startProcessing" :disabled="running || queue.length === 0">开始处理</button>
      <button class="ctrl-btn" @click="resetAll">重置</button>
      <div class="worker-count">
        Worker 数量：
        <button class="small-btn" @click="workerCount = Math.max(1, workerCount - 1)" :disabled="running">-</button>
        <span>{{ workerCount }}</span>
        <button class="small-btn" @click="workerCount = Math.min(5, workerCount + 1)" :disabled="running">+</button>
      </div>
    </div>

    <div class="pool-layout">
      <div class="queue-section">
        <div class="section-title">任务队列 ({{ queue.length }})</div>
        <div class="queue-list">
          <div v-for="task in queue" :key="task.id" class="queue-item">
            {{ task.name }}
          </div>
          <div v-if="queue.length === 0" class="empty">队列为空</div>
        </div>
      </div>

      <div class="arrow-section">→</div>

      <div class="workers-section">
        <div class="section-title">Workers</div>
        <div class="workers-grid">
          <div v-for="w in workers" :key="w.id" :class="['worker-card', w.status]">
            <div class="worker-name">Worker {{ w.id }}</div>
            <div class="worker-status">
              <template v-if="w.status === 'idle'">💤 空闲</template>
              <template v-else>⚙️ {{ w.currentTask }}</template>
            </div>
            <div class="worker-count-label">已完成: {{ w.completed }}</div>
          </div>
        </div>
      </div>

      <div class="arrow-section">→</div>

      <div class="done-section">
        <div class="section-title">已完成 ({{ doneList.length }})</div>
        <div class="done-list">
          <div v-for="task in doneList" :key="task.id" class="done-item">
            ✅ {{ task.name }}
          </div>
          <div v-if="doneList.length === 0" class="empty">暂无</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const workerCount = ref(3)
const running = ref(false)
let taskId = 0

const taskTypes = ['发送邮件', '生成报表', '图片压缩', '数据同步', '推送通知', '日志归档', 'PDF 导出', '缓存预热']

const queue = ref([])
const doneList = ref([])

const workers = computed(() => {
  const arr = []
  for (let i = 1; i <= workerCount.value; i++) {
    arr.push(workerState.value[i] || { id: i, status: 'idle', currentTask: '', completed: 0 })
  }
  return arr
})

const workerState = ref({})

function addTask() {
  const name = taskTypes[taskId % taskTypes.length]
  queue.value.push({ id: ++taskId, name: `${name} #${taskId}` })
}

function resetAll() {
  running.value = false
  queue.value = []
  doneList.value = []
  workerState.value = {}
  taskId = 0
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function startProcessing() {
  running.value = true
  // Initialize worker states
  for (let i = 1; i <= workerCount.value; i++) {
    workerState.value[i] = { id: i, status: 'idle', currentTask: '', completed: 0 }
  }

  const workerPromises = []
  for (let i = 1; i <= workerCount.value; i++) {
    workerPromises.push(runWorker(i))
  }
  await Promise.all(workerPromises)
  running.value = false
}

async function runWorker(wid) {
  while (queue.value.length > 0) {
    const task = queue.value.shift()
    if (!task) break
    workerState.value = {
      ...workerState.value,
      [wid]: { ...workerState.value[wid], status: 'busy', currentTask: task.name }
    }
    await sleep(600 + Math.random() * 800)
    doneList.value.push(task)
    workerState.value = {
      ...workerState.value,
      [wid]: { ...workerState.value[wid], status: 'idle', currentTask: '', completed: workerState.value[wid].completed + 1 }
    }
  }
}
</script>

<style scoped>
.worker-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; }
.ctrl-btn {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.ctrl-btn.primary { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.small-btn {
  width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.small-btn:disabled { opacity: 0.5; }
.worker-count { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; margin-left: auto; }
.pool-layout { display: flex; gap: 0.75rem; align-items: flex-start; }
.arrow-section { font-size: 1.5rem; color: var(--vp-c-text-3); padding-top: 2rem; flex-shrink: 0; }
.queue-section, .done-section { flex: 1; min-width: 0; }
.workers-section { flex: 1.5; min-width: 0; }
.section-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; }
.queue-list, .done-list { display: flex; flex-direction: column; gap: 0.25rem; max-height: 200px; overflow-y: auto; }
.queue-item {
  padding: 0.4rem 0.6rem; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3);
  border-radius: 4px; font-size: 0.8rem;
}
.done-item {
  padding: 0.4rem 0.6rem; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2);
  border-radius: 4px; font-size: 0.8rem;
}
.empty { color: var(--vp-c-text-3); font-size: 0.8rem; padding: 0.5rem; }
.workers-grid { display: flex; flex-direction: column; gap: 0.5rem; }
.worker-card {
  padding: 0.5rem 0.75rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.worker-card.busy { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.worker-name { font-weight: 600; font-size: 0.85rem; }
.worker-status { font-size: 0.8rem; color: var(--vp-c-text-2); margin: 0.25rem 0; }
.worker-count-label { font-size: 0.75rem; color: var(--vp-c-text-3); }
@media (max-width: 640px) {
  .pool-layout { flex-direction: column; }
  .arrow-section { transform: rotate(90deg); align-self: center; padding: 0; }
}
</style>
