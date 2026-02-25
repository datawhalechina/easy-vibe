<!--
  AsyncTaskFlowDemo.vue
  异步任务流程演示：展示同步 vs 异步处理的对比
-->
<template>
  <div class="async-task-demo">
    <div class="header">
      <div class="title">同步 vs 异步处理对比</div>
      <div class="subtitle">点击按钮观察两种模式的差异</div>
    </div>

    <div class="mode-tabs">
      <button
        :class="['tab', { active: mode === 'sync' }]"
        @click="mode = 'sync'; reset()"
      >同步模式</button>
      <button
        :class="['tab', { active: mode === 'async' }]"
        @click="mode = 'async'; reset()"
      >异步模式</button>
    </div>

    <div class="flow-area">
      <div class="user-side">
        <div class="label">用户请求</div>
        <button class="action-btn" @click="startProcess" :disabled="running">
          {{ running ? '处理中...' : '提交订单' }}
        </button>
        <div :class="['response-box', { success: responseReady }]">
          <template v-if="!running && !responseReady">等待提交</template>
          <template v-else-if="running && mode === 'sync'">
            ⏳ 用户等待中... ({{ elapsed }}s)
          </template>
          <template v-else-if="running && mode === 'async' && responseReady">
            ✅ 已返回 ({{ asyncResponseTime }}ms)
          </template>
          <template v-else-if="running && mode === 'async'">
            ⏳ 等待响应...
          </template>
          <template v-else>
            ✅ 完成 ({{ mode === 'sync' ? syncTime + 'ms' : asyncResponseTime + 'ms' }})
          </template>
        </div>
      </div>

      <div class="arrow">→</div>

      <div class="server-side">
        <div class="label">服务端处理</div>
        <div class="tasks">
          <div
            v-for="(task, i) in tasks"
            :key="i"
            :class="['task-item', task.status]"
          >
            <span class="task-icon">{{ task.status === 'done' ? '✅' : task.status === 'running' ? '⏳' : '⬜' }}</span>
            <span>{{ task.name }}</span>
            <span class="task-time">{{ task.time }}ms</span>
          </div>
        </div>
      </div>
    </div>

    <div class="summary" v-if="!running && responseReady">
      <template v-if="mode === 'sync'">
        <div class="summary-bad">同步模式：用户等待了 {{ syncTime }}ms，所有任务串行完成后才返回响应</div>
      </template>
      <template v-else>
        <div class="summary-good">异步模式：用户仅等待 {{ asyncResponseTime }}ms，耗时任务在后台异步处理</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('sync')
const running = ref(false)
const responseReady = ref(false)
const elapsed = ref(0)
const syncTime = ref(0)
const asyncResponseTime = ref(200)

const tasks = ref([
  { name: '扣减库存', time: 50, status: 'pending' },
  { name: '创建订单', time: 100, status: 'pending' },
  { name: '发送确认邮件', time: 800, status: 'pending' },
  { name: '更新推荐系统', time: 600, status: 'pending' },
  { name: '记录审计日志', time: 300, status: 'pending' }
])

let timer = null

function reset() {
  running.value = false
  responseReady.value = false
  elapsed.value = 0
  syncTime.value = 0
  tasks.value.forEach(t => t.status = 'pending')
  if (timer) clearInterval(timer)
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, Math.min(ms, 1500)))
}

async function startProcess() {
  reset()
  running.value = true

  if (mode.value === 'sync') {
    timer = setInterval(() => { elapsed.value = (elapsed.value + 0.1).toFixed(1) }, 100)
    let total = 0
    for (const task of tasks.value) {
      task.status = 'running'
      await sleep(task.time)
      task.status = 'done'
      total += task.time
    }
    syncTime.value = total
    responseReady.value = true
    running.value = false
    clearInterval(timer)
  } else {
    // 异步模式：只等核心任务
    tasks.value[0].status = 'running'
    await sleep(tasks.value[0].time)
    tasks.value[0].status = 'done'

    tasks.value[1].status = 'running'
    await sleep(tasks.value[1].time)
    tasks.value[1].status = 'done'

    responseReady.value = true

    // 后台任务继续
    for (let i = 2; i < tasks.value.length; i++) {
      tasks.value[i].status = 'running'
      await sleep(tasks.value[i].time)
      tasks.value[i].status = 'done'
    }
    running.value = false
  }
}
</script>

<style scoped>
.async-task-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.9rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.flow-area { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; }
.arrow { font-size: 2rem; color: var(--vp-c-text-3); padding-top: 2rem; }
.user-side, .server-side { flex: 1; }
.label { font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem; }
.action-btn {
  padding: 0.5rem 1.5rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.9rem;
  margin-bottom: 0.75rem; width: 100%;
}
.action-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.response-box {
  padding: 0.75rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); font-size: 0.85rem; text-align: center;
}
.response-box.success { border-color: #22c55e; background: rgba(34,197,94,0.05); }
.tasks { display: flex; flex-direction: column; gap: 0.5rem; }
.task-item {
  display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem;
  border-radius: 6px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}
.task-item.running { border-color: #f59e0b; background: rgba(245,158,11,0.05); }
.task-item.done { border-color: #22c55e; background: rgba(34,197,94,0.05); }
.task-icon { font-size: 0.9rem; }
.task-time { margin-left: auto; color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); font-size: 0.8rem; }
.summary { margin-top: 0.75rem; padding: 0.75rem; border-radius: 8px; font-size: 0.9rem; }
.summary-bad { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 0.75rem; }
.summary-good { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; padding: 0.75rem; }
@media (max-width: 640px) {
  .flow-area { flex-direction: column; }
  .arrow { transform: rotate(90deg); align-self: center; padding: 0; }
}
</style>
