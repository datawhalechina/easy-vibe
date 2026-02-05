<template>
  <div class="demo-container">
    <h4>Go 协程 (Goroutine) 与 GMP 调度演示</h4>

    <div class="controls">
      <el-radio-group v-model="viewMode" size="small">
        <el-radio-button label="overview">整体视图</el-radio-button>
        <el-radio-button label="gmp">GMP 调度</el-radio-button>
        <el-radio-button label="channel">Channel 通信</el-radio-button>
      </el-radio-group>

      <el-button type="primary" size="small" @click="startDemo" :disabled="isRunning">
        {{ isRunning ? '运行中...' : '开始演示' }}
      </el-button>

      <el-button size="small" @click="addGoroutine" :disabled="goroutines.length >= 20">
        +Goroutine
      </el-button>

      <el-button size="small" @click="reset">重置</el-button>
    </div>

    <!-- GMP 调度视图 -->
    <div v-if="viewMode === 'gmp' || viewMode === 'overview'" class="gmp-view">
      <div class="gmp-container">
        <!-- Global Queue -->
        <div class="queue-section global-queue">
          <div class="queue-header">
            <span class="queue-name">Global Queue (G)</span>
            <el-tag size="small" type="info">{{ globalQueue.length }}</el-tag>
          </div>
          <div class="queue-content">
            <div v-for="g in globalQueue" :key="g.id" class="g-item"
              :style="{ backgroundColor: g.color }">
              G{{ g.id }}
            </div>
            <div v-if="globalQueue.length === 0" class="empty-queue">空</div>
          </div>
        </div>

        <!-- P (Processors) -->
        <div class="processors-section">
          <div class="section-header">
            <span class="section-name">P (Processors) - {{ processors.length }} 个</span>
          </div>

          <div class="processors-grid">
            <div v-for="(p, idx) in processors" :key="idx" class="processor"
              :class="{ 'active': p.active }"
              :style="{ borderColor: p.active ? p.color : '#e4e7ed' }">
              <div class="processor-header">
                <span class="processor-name">P{{ idx }}</span>
                <span class="processor-status" :class="{ 'running': p.active }">{{ p.active ? '运行中' : '空闲' }}</span>
              </div>

              <div class="local-queue">
                <div class="queue-label">本地队列</div>
                <div class="local-g-list">
                  <div v-for="g in p.localQueue" :key="g.id" class="local-g-item"
                    :style="{ backgroundColor: g.color }">
                    G{{ g.id }}
                  </div>
                  <div v-if="p.localQueue.length === 0" class="empty-local">-</div>
                </div>
              </div>

              <div class="m-binding" v-if="p.m">
                <span class="m-label">绑定 M{{ p.m.id }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- M (Machine Threads) -->
        <div class="machines-section">
          <div class="section-header">
            <span class="section-name">M (Machine Threads) - {{ machines.length }} 个</span>
          </div>

          <div class="machines-list">
            <div v-for="m in machines" :key="m.id" class="machine-item"
              :class="{ 'active': m.active }"
              :style="{ borderColor: m.active ? '#67c23a' : '#e4e7ed' }">
              <span class="machine-id">M{{ m.id }}</span>
              <span class="machine-status">{{ m.active ? '运行中' : '休眠' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <el-alert title="GMP 调度模型" type="success"
        :description="gmpDescription"
        show-icon :closable="false" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const gmpDescription = 'G (Goroutine): 待执行的任务。M (Machine): 操作系统线程，执行 G 的载体。P (Processor): 逻辑处理器，提供执行上下文。G 先放入 P 的本地队列，P 与 M 绑定后，M 从 P 获取 G 执行。当本地队列空时，会从全局队列或其他 P 偷任务。'

const viewMode = ref('gmp')
const isRunning = ref(false)
const goroutines = ref([])

// GMP 数据结构
const globalQueue = ref([])
const processors = ref([])
const machines = ref([])

// 初始化数据
function initGMP() {
  // 创建一些 Goroutines
  const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#b3d8ff', '#c2e7b0', '#f5dab1']
  const goroutinesData = []

  for (let i = 0; i < 12; i++) {
    goroutinesData.push({
      id: i + 1,
      color: colors[i % colors.length],
      status: 'waiting'
    })
  }

  goroutines.value = goroutinesData

  // 分配全局队列
  globalQueue.value = goroutinesData.slice(0, 3)

  // 初始化 Processors (P)
  processors.value = [
    { id: 0, active: true, color: '#409eff', localQueue: goroutinesData.slice(3, 6), m: { id: 0 } },
    { id: 1, active: false, color: '#67c23a', localQueue: goroutinesData.slice(6, 9), m: null },
    { id: 2, active: false, color: '#e6a23c', localQueue: goroutinesData.slice(9, 12), m: null },
    { id: 3, active: false, color: '#f56c6c', localQueue: [], m: null }
  ]

  // 初始化 Machines (M)
  machines.value = [
    { id: 0, active: true },
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false }
  ]
}

// 添加 Goroutine
function addGoroutine() {
  if (goroutines.value.length >= 20) return

  const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#b3d8ff']
  const id = goroutines.value.length + 1

  const newG = {
    id,
    color: colors[id % colors.length],
    status: 'waiting'
  }

  goroutines.value.push(newG)

  // 添加到第一个有空位的 P
  for (const p of processors.value) {
    if (p.localQueue.length < 5) {
      p.localQueue.push(newG)
      break
    }
  }
}

// 开始演示
function startDemo() {
  isRunning.value = true

  // 模拟调度过程
  let step = 0
  const interval = setInterval(() => {
    step++

    // 轮流激活 P
    processors.value.forEach((p, idx) => {
      p.active = (idx === step % processors.value.length)
    })

    // 对应的 M 也激活
    machines.value.forEach((m, idx) => {
      m.active = processors.value[idx]?.active || false
    })

    if (step >= 20) {
      clearInterval(interval)
      isRunning.value = false
    }
  }, 500)
}

// 重置
function reset() {
  isRunning.value = false
  initGMP()
}

// 监听视图模式变化
watch(viewMode, () => {
  if (viewMode.value === 'gmp') {
    initGMP()
  }
})

// 初始化
initGMP()
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
  align-items: center;
}

.gmp-view {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.gmp-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.queue-section {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
}

.queue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.queue-name {
  font-weight: bold;
  color: #303133;
}

.queue-content {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 40px;
  align-items: center;
}

.g-item {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 11px;
  font-weight: bold;
}

.empty-queue {
  color: #909399;
  font-size: 12px;
  text-align: center;
  width: 100%;
}

.processors-section,
.machines-section {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
}

.section-header {
  margin-bottom: 12px;
}

.section-name {
  font-weight: bold;
  color: #303133;
  font-size: 13px;
}

.processors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.processor {
  background: white;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.3s;
}

.processor.active {
  box-shadow: 0 0 10px currentColor;
}

.processor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.processor-name {
  font-weight: bold;
  font-size: 12px;
  color: #303133;
}

.processor-status {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  background: #dcdfe6;
  color: #606266;
}

.processor-status.running {
  background: #67c23a;
  color: white;
}

.local-queue {
  margin-bottom: 8px;
}

.queue-label {
  font-size: 10px;
  color: #909399;
  margin-bottom: 4px;
}

.local-g-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.local-g-item {
  padding: 2px 5px;
  border-radius: 3px;
  color: white;
  font-size: 9px;
  font-weight: bold;
}

.empty-local {
  font-size: 10px;
  color: #c0c4cc;
}

.m-binding {
  font-size: 10px;
  color: #409eff;
  background: #ecf5ff;
  padding: 2px 6px;
  border-radius: 3px;
}

.m-label {
  font-weight: 500;
}

.machines-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.machine-item {
  background: white;
  border: 2px solid #e4e7ed;
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.machine-item.active {
  border-color: #67c23a;
  background: #f0f9eb;
}

.machine-id {
  font-weight: bold;
  font-size: 12px;
  color: #303133;
}

.machine-status {
  font-size: 11px;
  color: #909399;
}

.machine-item.active .machine-status {
  color: #67c23a;
}

.explanation {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .processors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
