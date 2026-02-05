<template>
  <div class="demo-container">
    <h4>线程调度演示</h4>

    <div class="controls">
      <el-radio-group v-model="schedulingPolicy" size="small">
        <el-radio-button label="fifo">FIFO (先来先服务)</el-radio-button>
        <el-radio-button label="roundrobin">时间片轮转</el-radio-button>
        <el-radio-button label="priority">优先级调度</el-radio-button>
      </el-radio-group>

      <el-button type="primary" size="small" @click="addThread" :disabled="threads.length >= 6">
        添加线程
      </el-button>

      <el-button
        type="success"
        size="small"
        @click="toggleSimulation"
      >
        {{ isRunning ? '暂停' : '开始调度' }}
      </el-button>

      <el-button size="small" @click="reset">
        重置
      </el-button>
    </div>

    <div class="timeline-container">
      <div class="timeline-header">
        <span class="timeline-label">时间轴</span>
        <div class="time-marker">0ms</div>
        <div class="time-marker">100ms</div>
        <div class="time-marker">200ms</div>
        <div class="time-marker">300ms</div>
        <div class="time-marker">400ms</div>
        <div class="time-marker">500ms</div>
      </div>

      <div class="thread-rows">
        <div
          v-for="thread in threads"
          :key="thread.id"
          class="thread-row"
        >
          <div class="thread-info">
            <div class="thread-name" :style="{ color: thread.color }">
              {{ thread.name }}
            </div>
            <div class="thread-details">
              <el-tag size="small" :type="thread.state === 'running' ? 'success' : thread.state === 'ready' ? 'warning' : 'info'">
                {{ stateText(thread.state) }}
              </el-tag>
              <span class="priority">优先级: {{ thread.priority }}</span>
            </div>
          </div>

          <div class="execution-track">
            <div
              v-for="(slot, idx) in thread.executionSlots"
              :key="idx"
              class="execution-slot"
              :class="{ running: slot.state === 'running', blocked: slot.state === 'blocked' }"
              :style="{ left: slot.start + '%', width: slot.width + '%', backgroundColor: slot.state === 'running' ? thread.color : '#dcdfe6' }"
            >
              <span v-if="slot.state === 'running'" class="slot-label">运行</span>
              <span v-else class="slot-label">等待</span>
            </div>

            <div
              v-if="thread.state === 'running'"
              class="current-indicator"
              :style="{ left: currentTime + '%', backgroundColor: thread.color }"
            >
              <div class="indicator-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-panel">
      <div class="stat-item">
        <div class="stat-value">{{ completedThreads }}</div>
        <div class="stat-label">已完成线程</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ contextSwitches }}</div>
        <div class="stat-label">上下文切换</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ avgWaitTime }}ms</div>
        <div class="stat-label">平均等待时间</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ throughput }}</div>
        <div class="stat-label">吞吐量 (线程/秒)</div>
      </div>
    </div>

    <div class="algorithm-info">
      <h5>当前调度算法: {{ algorithmName }}</h5>
      <p>{{ algorithmDescription }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const schedulingPolicy = ref('roundrobin')
const threads = ref([])
const isRunning = ref(false)
const currentTime = ref(0)
const completedThreads = ref(0)
const contextSwitches = ref(0)
const totalWaitTime = ref(0)
const startTime = ref(null)

let animationId = null
let currentThreadIndex = 0
let timeQuantum = 50 // 时间片长度

const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#b3d8ff']

const algorithmName = computed(() => {
  const names = {
    fifo: 'FIFO (First In First Out)',
    roundrobin: 'Round Robin (时间片轮转)',
    priority: 'Priority Scheduling (优先级调度)'
  }
  return names[schedulingPolicy.value]
})

const algorithmDescription = computed(() => {
  const descriptions = {
    fifo: '按照线程到达的先后顺序执行，直到当前线程完成才执行下一个。简单公平但可能导致短任务等待长任务。',
    roundrobin: '每个线程轮流执行一个时间片，时间片用完就切换到下一个线程。响应性好，适合交互式系统。',
    priority: '根据线程优先级决定执行顺序，高优先级线程优先执行。需要处理优先级反转和饥饿问题。'
  }
  return descriptions[schedulingPolicy.value]
})

const avgWaitTime = computed(() => {
  if (completedThreads.value === 0) return 0
  return Math.round(totalWaitTime.value / completedThreads.value)
})

const throughput = computed(() => {
  if (!startTime.value) return 0
  const elapsed = (Date.now() - startTime.value) / 1000
  if (elapsed === 0) return 0
  return (completedThreads.value / elapsed).toFixed(2)
})

const stateText = (state) => {
  const map = {
    running: '运行中',
    ready: '就绪',
    blocked: '阻塞',
    completed: '完成'
  }
  return map[state] || state
}

function addThread() {
  if (threads.value.length >= 6) return

  const id = threads.value.length + 1
  const priority = Math.floor(Math.random() * 10) + 1
  const workAmount = 30 + Math.floor(Math.random() * 50) // 30-80% 的工作量

  threads.value.push({
    id,
    name: `Thread-${id}`,
    color: colors[id - 1],
    priority,
    state: 'ready',
    progress: 0,
    workAmount,
    executionSlots: [],
    startTime: null,
    endTime: null
  })
}

function reset() {
  threads.value = []
  isRunning.value = false
  currentTime.value = 0
  completedThreads.value = 0
  contextSwitches.value = 0
  totalWaitTime.value = 0
  startTime.value = null
  currentThreadIndex = 0
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function toggleSimulation() {
  if (isRunning.value) {
    pauseSimulation()
  } else {
    startSimulation()
  }
}

function startSimulation() {
  if (threads.value.length === 0) {
    // 自动创建一些线程
    for (let i = 0; i < 3; i++) {
      addThread()
    }
  }

  isRunning.value = true
  if (!startTime.value) {
    startTime.value = Date.now()
  }

  // 初始化所有线程的开始时间
  threads.value.forEach(thread => {
    if (!thread.startTime) {
      thread.startTime = Date.now()
    }
  })

  runSimulation()
}

function pauseSimulation() {
  isRunning.value = false
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function runSimulation() {
  if (!isRunning.value) return

  // 根据调度策略选择下一个线程
  let nextThread = null
  let nextIndex = -1

  switch (schedulingPolicy.value) {
    case 'fifo':
      // FIFO: 找到第一个未完成的线程
      for (let i = 0; i < threads.value.length; i++) {
        if (threads.value[i].progress < threads.value[i].workAmount) {
          nextThread = threads.value[i]
          nextIndex = i
          break
        }
      }
      break

    case 'roundrobin':
      // Round Robin: 轮流执行
      let attempts = 0
      while (attempts < threads.value.length) {
        const idx = currentThreadIndex % threads.value.length
        if (threads.value[idx].progress < threads.value[idx].workAmount) {
          nextThread = threads.value[idx]
          nextIndex = idx
          currentThreadIndex = (idx + 1) % threads.value.length
          break
        }
        currentThreadIndex++
        attempts++
      }
      break

    case 'priority':
      // Priority: 选择优先级最高的就绪线程
      let highestPriority = -1
      for (let i = 0; i < threads.value.length; i++) {
        const thread = threads.value[i]
        if (thread.progress < thread.workAmount && thread.priority > highestPriority) {
          highestPriority = thread.priority
          nextThread = thread
          nextIndex = i
        }
      }
      break
  }

  // 执行选中的线程
  if (nextThread) {
    // 记录状态变化
    if (nextThread.state !== 'running') {
      contextSwitches.value++
      nextThread.state = 'running'
    }

    // 其他线程设为就绪状态
    threads.value.forEach((thread, idx) => {
      if (idx !== nextIndex && thread.state === 'running') {
        thread.state = 'ready'
      }
    })

    // 记录执行槽
    const lastSlot = nextThread.executionSlots[nextThread.executionSlots.length - 1]
    if (!lastSlot || lastSlot.state !== 'running') {
      nextThread.executionSlots.push({
        start: nextThread.progress,
        width: 0,
        state: 'running'
      })
    } else {
      lastSlot.width = 2
    }

    // 增加进度
    const increment = schedulingPolicy.value === 'roundrobin' ? 5 : 3
    nextThread.progress = Math.min(nextThread.progress + increment, nextThread.workAmount)

    // 检查是否完成
    if (nextThread.progress >= nextThread.workAmount) {
      nextThread.state = 'completed'
      nextThread.endTime = Date.now()
      completedThreads.value++
      totalWaitTime.value += (nextThread.endTime - nextThread.startTime)
    }

    // 更新时间显示
    currentTime.value = nextThread.progress
  }

  // 检查是否所有线程都完成
  const allCompleted = threads.value.every(t => t.progress >= t.workAmount)
  if (allCompleted) {
    isRunning.value = false
  } else {
    animationId = requestAnimationFrame(runSimulation)
  }
}

// 生命周期
onMounted(() => {
  // 自动创建初始线程
  for (let i = 0; i < 3; i++) {
    addThread()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

h4 {
  margin: 0 0 16px 0;
  color: #303133;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.memory-view {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.memory-label {
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
}

.memory-blocks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.process-block {
  border-radius: 6px;
  padding: 12px;
  color: white;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.process-block.crashed {
  opacity: 0.5;
}

.process-block.active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.process-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.process-name {
  font-weight: bold;
}

.process-pid {
  opacity: 0.8;
  font-size: 12px;
}

.process-memory {
  display: flex;
  gap: 8px;
  font-size: 11px;
}

.memory-section {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-label {
  opacity: 0.7;
  font-size: 10px;
}

.section-size {
  font-weight: bold;
}

.crash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.crash-text {
  font-size: 24px;
  margin-bottom: 8px;
}

.crash-info {
  font-size: 12px;
  opacity: 0.8;
}

.shared-memory {
  margin-top: 16px;
  padding: 12px;
  background: #f4f4f5;
  border-radius: 6px;
  border: 2px dashed #c0c4cc;
}

.shared-label {
  font-weight: bold;
  color: #606266;
  margin-bottom: 8px;
}

.shared-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.shared-access {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #606266;
}

.access-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.info-panel {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .process-memory {
    flex-wrap: wrap;
  }
}
</style>
