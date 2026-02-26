<template>
  <div class="monitor-demo">
    <div class="header">
      <div class="title">任务监控面板</div>
      <div class="subtitle">实时监控任务执行状态</div>
    </div>
    <div class="controls">
      <button @click="start" class="start-btn">启动监控</button>
      <button @click="stop" class="stop-btn">停止</button>
    </div>
    <div class="metrics">
      <div class="metric-card">
        <div class="metric-value">{{ running }}</div>
        <div class="metric-label">运行中</div>
      </div>
      <div class="metric-card success">
        <div class="metric-value">{{ completed }}</div>
        <div class="metric-label">已完成</div>
      </div>
      <div class="metric-card error">
        <div class="metric-value">{{ failed }}</div>
        <div class="metric-label">失败</div>
      </div>
    </div>
    <div class="tasks">
      <div v-for="t in tasks" :key="t.id" :class="['task-row', t.status]">
        <span class="task-name">{{ t.name }}</span>
        <span class="task-status">{{ t.status === 'running' ? '运行中' : t.status === 'completed' ? '完成' : '失败' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const running = ref(0)
const completed = ref(0)
const failed = ref(0)
const tasks = ref([])
let timer = null

function start() {
  if (timer) return
  timer = setInterval(() => {
    const rand = Math.random()
    if (rand < 0.3) {
      const id = Date.now()
      tasks.value.unshift({ id, name: `Task-${id}`, status: 'running' })
      running.value++
    }
    
    tasks.value = tasks.value.map(t => {
      if (t.status === 'running') {
        if (Math.random() < 0.2) {
          running.value--
          if (Math.random() < 0.8) {
            completed.value++
            return { ...t, status: 'completed' }
          } else {
            failed.value++
            return { ...t, status: 'failed' }
          }
        }
      }
      return t
    }).slice(0, 10)
  }, 1000)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.monitor-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.start-btn, .stop-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.start-btn { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
.metric-card { padding: 1rem; background: var(--vp-c-bg); border-radius: 8px; text-align: center; }
.metric-card.success { background: #dcfce7; }
.metric-card.error { background: #fee2e2; }
.metric-value { font-size: 1.5rem; font-weight: 700; }
.metric-label { font-size: 0.85rem; color: var(--vp-c-text-2); }
.tasks { background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem; }
.task-row { display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid var(--vp-c-divider); }
.task-row:last-child { border-bottom: none; }
.task-row.running { color: var(--vp-c-brand); }
.task-row.completed { color: #22c55e; }
.task-row.failed { color: #ef4444; }
.task-name { font-size: 0.85rem; }
.task-status { font-size: 0.8rem; }
</style>
