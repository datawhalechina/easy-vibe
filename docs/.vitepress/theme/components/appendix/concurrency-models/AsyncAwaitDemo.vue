<template>
  <div class="demo-container">
    <h4>async/await 机制演示</h4>

    <div class="controls">
      <el-button type="primary" size="small" @click="runExample" :disabled="isRunning">
        {{ isRunning ? '运行中...' : '运行示例' }}
      </el-button>
      <el-button size="small" @click="reset">重置</el-button>
      <el-checkbox v-model="showDetails" size="small">显示详细信息</el-checkbox>
    </div>

    <div class="code-section">
      <div class="code-block">
        <div class="code-header">
          <span class="code-title">Python asyncio 示例</span>
        </div>
        <pre class="code-content"><code><span class="keyword">import</span> asyncio

<span class="keyword">async def</span> <span class="function">fetch_data</span>(url):
    <span class="comment"># await 挂起，让出 CPU</span>
    response = <span class="keyword">await</span> aiohttp.get(url)
    <span class="comment"># I/O 完成后继续执行</span>
    <span class="keyword">return</span> response.json()

<span class="keyword">async def</span> <span class="function">main</span>():
    <span class="comment"># 并发执行</span>
    tasks = [fetch_data(url) <span class="keyword">for</span> url <span class="keyword">in</span> urls]
    results = <span class="keyword">await</span> asyncio.gather(*tasks)</code></pre>
      </div>
    </div>

    <div class="visualization">
      <div class="timeline-container">
        <h5>执行时间线</h5>
        <div class="timeline">
          <div class="time-axis">
            <div class="axis-label">0ms</div>
            <div class="axis-label">50ms</div>
            <div class="axis-label">100ms</div>
            <div class="axis-label">150ms</div>
            <div class="axis-label">200ms</div>
          </div>

          <div class="thread-rows">
            <div class="thread-row">
              <div class="row-label">事件循环</div>
              <div class="row-track">
                <div class="execution-segment event-loop" style="width: 100%;">
                  调度中
                </div>
              </div>
            </div>

            <div v-for="(task, idx) in tasks" :key="task.id" class="thread-row">
              <div class="row-label">任务 {{ task.id }}</div>
              <div class="row-track">
                <template v-for="(segment, sidx) in task.segments" :key="sidx">
                  <div class="execution-segment"
                    :class="{ 'active': segment.type === 'active', 'io': segment.type === 'io' }"
                    :style="{ left: segment.start + '%', width: segment.width + '%', backgroundColor: segment.color }">
                    <span v-if="segment.width > 8" class="segment-label">
                      {{ segment.type === 'active' ? '执行' : 'I/O' }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-title">并发任务数</div>
          <div class="stat-value">{{ tasks.length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-title">总执行时间</div>
          <div class="stat-value">{{ totalTime }}ms</div>
        </div>
        <div class="stat-card">
          <div class="stat-title">I/O 等待时间</div>
          <div class="stat-value">{{ ioWaitTime }}ms</div>
        </div>
        <div class="stat-card">
          <div class="stat-title">CPU 利用率</div>
          <div class="stat-value">{{ cpuUtilization }}%</div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <el-alert title="async/await 的优势" type="success"
        description="当一个任务遇到 I/O 操作(如网络请求)时，await 会让出 CPU，事件循环调度其他任务执行。I/O 完成后，任务从断点恢复。这种方式让单个线程可以并发处理数千个任务。"
        show-icon :closable="false" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const comparisonMode = ref('memory')
const coroutineCount = ref(1000)
const isRunning = ref(false)
const showDetails = ref(false)

const tasks = ref([])

// 颜色
const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']

// 计算统计数据
const totalTime = computed(() => {
  if (tasks.value.length === 0) return 0
  // 模拟总时间
  return Math.round(50 + tasks.value.length * 10)
})

const ioWaitTime = computed(() => {
  return Math.round(totalTime.value * 0.6)
})

const cpuUtilization = computed(() => {
  return Math.round(100 - (ioWaitTime.value / totalTime.value) * 100)
})

// 生成任务数据
function generateTasks() {
  const count = Math.min(Math.floor(coroutineCount.value / 200), 5)
  const newTasks = []

  for (let i = 0; i < count; i++) {
    const segments = []
    let currentPos = 5

    // 生成交替的执行和I/O段
    for (let j = 0; j < 3; j++) {
      // 执行段
      const execWidth = 10 + Math.random() * 10
      segments.push({
        type: 'active',
        start: currentPos,
        width: execWidth,
        color: colors[i % colors.length]
      })
      currentPos += execWidth

      // I/O段
      const ioWidth = 15 + Math.random() * 10
      segments.push({
        type: 'io',
        start: currentPos,
        width: ioWidth,
        color: '#dcdfe6'
      })
      currentPos += ioWidth
    }

    newTasks.push({
      id: i + 1,
      segments,
      state: 'ready'
    })
  }

  tasks.value = newTasks
}

// 运行示例
function runExample() {
  isRunning.value = true
  generateTasks()

  // 模拟运行
  setTimeout(() => {
    isRunning.value = false
  }, 2000)
}

// 重置
function reset() {
  tasks.value = []
  isRunning.value = false
  coroutineCount.value = 1000
}

// 监听协程数量变化
watch(coroutineCount, () => {
  if (tasks.value.length > 0) {
    generateTasks()
  }
})

// 初始化
generateTasks()
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
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.slider-label {
  font-size: 14px;
  color: #606266;
  min-width: 100px;
}

.code-section {
  margin-bottom: 20px;
}

.code-block {
  background: #282c34;
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  background: #21252b;
  padding: 8px 16px;
  border-bottom: 1px solid #181a1f;
}

.code-title {
  color: #abb2bf;
  font-size: 13px;
  font-weight: 500;
}

.code-content {
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.keyword {
  color: #c678dd;
}

.function {
  color: #61afef;
}

.comment {
  color: #5c6370;
  font-style: italic;
}

.visualization {
  margin-bottom: 20px;
}

.timeline-container {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.timeline-container h5 {
  margin: 0 0 12px 0;
  color: #303133;
}

.timeline {
  position: relative;
}

.time-axis {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 8px;
}

.axis-label {
  font-size: 11px;
  color: #909399;
}

.thread-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.thread-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 8px;
  align-items: center;
}

.row-label {
  font-size: 12px;
  color: #606266;
  text-align: right;
}

.row-track {
  position: relative;
  height: 24px;
  background: #f5f7fa;
  border-radius: 4px;
  overflow: hidden;
}

.execution-segment {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: 500;
}

.execution-segment.io {
  background: #dcdfe6 !important;
  color: #606266;
}

.execution-segment.event-loop {
  background: #409eff;
}

.current-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #f56c6c;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.stat-title {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.explanation {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .thread-row {
    grid-template-columns: 60px 1fr;
  }
}
</style>
