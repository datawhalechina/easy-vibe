<template>
  <div class="retry-demo">
    <div class="header">
      <div class="title">重试机制演示</div>
      <div class="subtitle">观察指数退避重试策略</div>
    </div>
    <div class="controls">
      <button @click="execute" class="execute-btn" :disabled="running">执行任务</button>
      <button @click="reset" class="reset-btn">重置</button>
    </div>
    <div class="config">
      <div class="config-item">
        <span class="label">最大重试次数：</span>
        <span class="value">{{ maxRetries }}</span>
      </div>
      <div class="config-item">
        <span class="label">基础延迟：</span>
        <span class="value">{{ baseDelay }}ms</span>
      </div>
    </div>
    <div class="attempts">
      <div class="attempt-label">重试次数：{{ attempts.length }}</div>
      <div class="attempt-list">
        <div v-for="(a, i) in attempts" :key="i" :class="['attempt-item', a.success ? 'success' : 'fail']">
          <span class="attempt-num">第 {{ i + 1 }} 次</span>
          <span class="attempt-delay" v-if="a.delay">延迟 {{ a.delay }}ms</span>
          <span class="attempt-status">{{ a.success ? '成功' : '失败' }}</span>
        </div>
      </div>
    </div>
    <div class="log-area">
      <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const running = ref(false)
const maxRetries = 3
const baseDelay = 1000
const attempts = ref([])
const logs = ref([])

async function execute() {
  if (running.value) return
  running.value = true
  attempts.value = []
  logs.value = []
  
  for (let i = 0; i <= maxRetries; i++) {
    const delay = Math.min(baseDelay * Math.pow(2, i), 10000)
    const success = Math.random() > 0.3 || i === maxRetries
    
    attempts.value.push({ success, delay: i > 0 ? delay : 0 })
    logs.value.unshift(`尝试 ${i + 1}/${maxRetries + 1}: ${success ? '成功' : '失败'}${i > 0 ? ` (延迟 ${delay}ms)` : ''}`)
    
    if (success) {
      logs.value.unshift('任务执行成功！')
      break
    }
    if (i < maxRetries) {
      await new Promise(r => setTimeout(r, 50))
    }
  }
  running.value = false
}

function reset() {
  attempts.value = []
  logs.value = []
}
</script>

<style scoped>
.retry-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.execute-btn, .reset-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.execute-btn { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.execute-btn:disabled { opacity: 0.5; }
.config { display: flex; gap: 2rem; margin-bottom: 1rem; padding: 0.75rem; background: var(--vp-c-bg); border-radius: 8px; }
.config-item { display: flex; gap: 0.5rem; }
.label { color: var(--vp-c-text-2); font-size: 0.85rem; }
.value { font-weight: 600; }
.attempts { margin-bottom: 1rem; }
.attempt-label { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; }
.attempt-list { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.attempt-item { display: flex; flex-direction: column; align-items: center; padding: 0.5rem 0.75rem; border-radius: 6px; min-width: 60px; }
.attempt-item.success { background: #dcfce7; }
.attempt-item.fail { background: #fee2e2; }
.attempt-num { font-size: 0.8rem; font-weight: 600; }
.attempt-delay { font-size: 0.7rem; color: var(--vp-c-text-2); }
.attempt-status { font-size: 0.75rem; }
.log-area { background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem; max-height: 100px; overflow-y: auto; }
.log-item { font-size: 0.8rem; padding: 0.25rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.log-item:last-child { border-bottom: none; }
</style>
