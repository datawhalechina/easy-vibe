<template>
  <div class="demo-container">
    <h4>进程 / 线程 / 协程 对比演示</h4>

    <div class="controls">
      <el-radio-group v-model="model" size="small">
        <el-radio-button label="process">多进程</el-radio-button>
        <el-radio-button label="thread">多线程</el-radio-button>
        <el-radio-button label="coroutine">协程</el-radio-button>
      </el-radio-group>

      <el-button
        type="primary"
        size="small"
        @click="startSimulation"
        :disabled="isRunning"
      >
        {{ isRunning ? '运行中...' : '开始模拟' }}
      </el-button>
    </div>

    <div class="stats-bar">
      <el-statistic title="内存占用" :value="memoryUsage" suffix="MB" />
      <el-statistic title="上下文切换" :value="contextSwitches" />
      <el-statistic title="完成任务" :value="completedTasks" />
      <el-statistic title="耗时" :value="elapsedTime" suffix="ms" />
    </div>

    <div class="visualization">
      <div class="cpu-cores">
        <div
          v-for="(core, idx) in cpuCores"
          :key="idx"
          class="core"
          :class="{ active: core.active, type: core.type }"
        >
          <span class="core-label">CPU {{ idx + 1 }}</span>
          <div class="task-indicator" v-if="core.task">
            {{ core.task }}
          </div>
        </div>
      </div>

      <div class="task-queue">
        <h5>任务队列</h5>
        <div class="queue-items">
          <div
            v-for="(task, idx) in pendingTasks"
            :key="task.id"
            class="queue-item"
            :style="{ animationDelay: `${idx * 0.1}s` }"
          >
            Task {{ task.id }}
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <el-alert
        :title="explanationTitle"
        :type="explanationType"
        :description="explanationText"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const model = ref('process')
const isRunning = ref(false)
const memoryUsage = ref(0)
const contextSwitches = ref(0)
const completedTasks = ref(0)
const elapsedTime = ref(0)

const cpuCores = ref([
  { active: false, type: 'process', task: null },
  { active: false, type: 'process', task: null },
  { active: false, type: 'process', task: null },
  { active: false, type: 'process', task: null },
])

const pendingTasks = ref([])

const explanationTitle = computed(() => {
  const titles = {
    process: '多进程模型',
    thread: '多线程模型',
    coroutine: '协程模型'
  }
  return titles[model.value]
})

const explanationType = computed(() => {
  const types = {
    process: 'success',
    thread: 'warning',
    coroutine: 'info'
  }
  return types[model.value]
})

const explanationText = computed(() => {
  const texts = {
    process: '每个进程拥有独立的内存空间，隔离性强但开销大。进程间通信需要 IPC 机制。适合需要强隔离的场景，如浏览器标签页、沙箱程序。',
    thread: '线程共享进程内存，切换开销较小，但需要同步机制保护共享数据。适合 CPU 密集型任务和需要共享数据的场景。',
    coroutine: '用户态轻量级线程，由运行时调度，切换极快。适合 I/O 密集型高并发场景，如 Web 服务器、网关、长连接服务。'
  }
  return texts[model.value]
})

watch(model, () => {
  // 重置状态
  resetSimulation()
})

function resetSimulation() {
  isRunning.value = false
  memoryUsage.value = model.value === 'process' ? 400 : model.value === 'thread' ? 100 : 20
  contextSwitches.value = 0
  completedTasks.value = 0
  elapsedTime.value = 0
  cpuCores.value.forEach(core => {
    core.active = false
    core.type = model.value
    core.task = null
  })
  pendingTasks.value = Array.from({ length: 16 }, (_, i) => ({ id: i + 1 }))
}

async function startSimulation() {
  if (isRunning.value) return
  isRunning.value = true

  const startTime = Date.now()
  const taskCount = pendingTasks.value.length
  const baseSwitchCost = model.value === 'process' ? 10 : model.value === 'thread' ? 2 : 1

  // 模拟任务处理
  while (pendingTasks.value.length > 0 && isRunning.value) {
    // 分配任务到 CPU 核心
    for (let i = 0; i < cpuCores.value.length; i++) {
      if (!cpuCores.value[i].active && pendingTasks.value.length > 0) {
        const task = pendingTasks.value.shift()
        cpuCores.value[i].active = true
        cpuCores.value[i].task = task.id

        // 模拟任务执行时间
        setTimeout(() => {
          if (isRunning.value) {
            cpuCores.value[i].active = false
            cpuCores.value[i].task = null
            completedTasks.value++
            contextSwitches.value += baseSwitchCost
          }
        }, 300 + Math.random() * 200)
      }
    }

    elapsedTime.value = Date.now() - startTime
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  isRunning.value = false
}

// 初始化
resetSimulation()
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
  margin: 20px 0;
}

.controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.cpu-cores {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.core {
  background: white;
  border: 2px solid #dcdfe6;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s;
}

.core.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.core.active.process {
  border-color: #67c23a;
  background: #f0f9eb;
}

.core.active.thread {
  border-color: #e6a23c;
  background: #fdf6ec;
}

.core.active.coroutine {
  border-color: #909399;
  background: #f4f4f5;
}

.core-label {
  font-size: 12px;
  color: #606266;
  display: block;
  margin-bottom: 8px;
}

.task-indicator {
  font-size: 14px;
  font-weight: bold;
  color: #409eff;
}

.task-queue {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.task-queue h5 {
  margin: 0 0 12px 0;
  color: #303133;
}

.queue-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.queue-item {
  background: #409eff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.explanation {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }

  .visualization {
    grid-template-columns: 1fr;
  }

  .cpu-cores {
    grid-template-columns: 1fr;
  }
}
</style>
