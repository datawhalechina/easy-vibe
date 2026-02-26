<template>
  <div class="jobqueue-demo">
    <div class="header">
      <div class="title">任务队列演示</div>
      <div class="subtitle">生产者-消费者模式模拟</div>
    </div>
    <div class="controls">
      <button @click="enqueue" class="enqueue-btn">添加任务</button>
      <button @click="consume" class="consume-btn" :disabled="queue.length === 0">消费任务</button>
      <button @click="reset" class="reset-btn">重置</button>
    </div>
    <div class="queue-visual">
      <div class="producer">
        <div class="role-label">生产者</div>
        <div class="action">添加任务</div>
      </div>
      <div class="queue-section">
        <div class="queue-label">队列 ({{ queue.length }}/{{ maxSize }})</div>
        <div class="queue-bar">
          <div class="queue-fill" :style="{ width: (queue.length / maxSize * 100) + '%' }"></div>
        </div>
        <div class="queue-items">
          <span v-for="(job, i) in queue" :key="i" class="job-item">{{ job }}</span>
          <span v-if="queue.length === 0" class="empty-msg">队列为空</span>
        </div>
      </div>
      <div class="consumer">
        <div class="role-label">消费者</div>
        <div class="action">处理任务</div>
      </div>
    </div>
    <div class="log-area">
      <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const queue = ref([])
const maxSize = 10
const logs = ref([])
let jobId = 1

function enqueue() {
  if (queue.value.length >= maxSize) {
    logs.value.unshift(`队列已满，无法添加！`)
    return
  }
  queue.value.push(`Job-${jobId++}`)
  logs.value.unshift(`添加任务: Job-${jobId - 1}`)
}

function consume() {
  if (queue.value.length === 0) {
    logs.value.unshift(`队列为空，无任务可消费`)
    return
  }
  const job = queue.value.shift()
  logs.value.unshift(`消费任务: ${job}`)
}

function reset() {
  queue.value = []
  jobId = 1
  logs.value = []
}
</script>

<style scoped>
.jobqueue-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.enqueue-btn, .consume-btn, .reset-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.enqueue-btn { background: #22c55e; color: #fff; border-color: #22c55e; }
.consume-btn { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.queue-visual { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }
.producer, .consumer { text-align: center; min-width: 80px; }
.role-label { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem; }
.action { font-size: 0.75rem; color: var(--vp-c-text-2); }
.queue-section { flex: 1; }
.queue-label { font-size: 0.85rem; margin-bottom: 0.5rem; }
.queue-bar { height: 8px; background: var(--vp-c-bg); border-radius: 4px; overflow: hidden; }
.queue-fill { height: 100%; background: var(--vp-c-brand); transition: width 0.3s; }
.queue-items { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; min-height: 40px; }
.job-item { padding: 0.25rem 0.5rem; background: var(--vp-c-brand); color: #fff; border-radius: 4px; font-size: 0.8rem; }
.empty-msg { color: var(--vp-c-text-3); font-size: 0.85rem; }
.log-area { background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem; max-height: 120px; overflow-y: auto; }
.log-item { font-size: 0.8rem; padding: 0.25rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.log-item:last-child { border-bottom: none; }
</style>
