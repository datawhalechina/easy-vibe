<template>
  <div class="demo-container">
    <h4>进程内存隔离演示</h4>

    <div class="controls">
      <el-button type="primary" size="small" @click="addProcess" :disabled="processes.length >= 4">
        创建进程
      </el-button>
      <el-button type="danger" size="small" @click="killProcess" :disabled="processes.length === 0">
        结束进程
      </el-button>
      <el-button size="small" @click="simulateCrash">
        模拟进程崩溃
      </el-button>
      <el-button size="small" @click="reset">
        重置
      </el-button>
    </div>

    <div class="memory-view">
      <div class="memory-label">系统内存</div>
      <div class="memory-blocks">
        <div
          v-for="process in processes"
          :key="process.id"
          class="process-block"
          :class="{ crashed: process.crashed, active: process.active }"
          :style="{ width: process.size + '%', backgroundColor: process.color }"
        >
          <div class="process-header">
            <span class="process-name">进程 {{ process.id }}</span>
            <span class="process-pid">PID: {{ process.pid }}</span>
          </div>
          <div class="process-memory">
            <div class="memory-section code">
              <span class="section-label">代码段</span>
              <span class="section-size">{{ process.codeSize }}MB</span>
            </div>
            <div class="memory-section data">
              <span class="section-label">数据段</span>
              <span class="section-size">{{ process.dataSize }}MB</span>
            </div>
            <div class="memory-section heap">
              <span class="section-label">堆</span>
              <span class="section-size">{{ process.heapSize }}MB</span>
            </div>
            <div class="memory-section stack">
              <span class="section-label">栈</span>
              <span class="section-size">{{ process.stackSize }}MB</span>
            </div>
          </div>
          <div v-if="process.crashed" class="crash-overlay">
            <span class="crash-text">💥 已崩溃</span>
            <span class="crash-info">不影响其他进程</span>
          </div>
        </div>
      </div>

      <div class="shared-memory" v-if="showSharedMemory">
        <div class="shared-label">共享内存区域 (IPC)</div>
        <div class="shared-content">
          <div v-for="process in processes" :key="process.id" class="shared-access">
            <span class="access-indicator" :style="{ backgroundColor: process.color }"></span>
            <span>进程 {{ process.id }} 可以访问</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-panel">
      <el-alert
        :title="currentInfo.title"
        :type="currentInfo.type"
        :description="currentInfo.description"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const processes = ref([])
const showSharedMemory = ref(false)
const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
let pidCounter = 1000

const currentInfo = computed(() => {
  if (processes.value.length === 0) {
    return {
      title: '进程隔离',
      type: 'info',
      description: '每个进程拥有独立的虚拟地址空间，一个进程崩溃不会影响其他进程。点击"创建进程"开始演示。'
    }
  }

  const crashed = processes.value.filter(p => p.crashed).length
  if (crashed > 0) {
    return {
      title: '隔离性验证',
      type: 'success',
      description: `进程已崩溃但其他进程正常运行，证明进程间内存隔离有效。崩溃的进程会被操作系统回收资源。`
    }
  }

  return {
    title: '内存布局',
    type: 'info',
    description: `当前有 ${processes.value.length} 个进程在运行。每个进程的内存分为代码段、数据段、堆和栈，相互隔离不可访问。`
  }
})

function createProcess() {
  if (processes.value.length >= 4) return

  const id = processes.value.length + 1
  const size = 20 + Math.random() * 10

  processes.value.push({
    id,
    pid: pidCounter++,
    size,
    color: colors[id - 1],
    codeSize: Math.floor(size * 0.15),
    dataSize: Math.floor(size * 0.1),
    heapSize: Math.floor(size * 0.6),
    stackSize: Math.floor(size * 0.15),
    crashed: false,
    active: true
  })
}

function killProcess() {
  if (processes.value.length === 0) return
  processes.value.pop()
}

function simulateCrash() {
  if (processes.value.length === 0) return

  // 随机让一个未崩溃的进程崩溃
  const candidates = processes.value.filter(p => !p.crashed)
  if (candidates.length > 0) {
    const victim = candidates[Math.floor(Math.random() * candidates.length)]
    victim.crashed = true
    victim.active = false
  }
}

function reset() {
  processes.value = []
  showSharedMemory.value = false
  pidCounter = 1000
}
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

  .cpu-cores {
    grid-template-columns: 1fr;
  }
}
</style>
