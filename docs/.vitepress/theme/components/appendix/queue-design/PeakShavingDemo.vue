<!--
  PeakShavingDemo.vue
  削峰填谷演示 - 流量缓冲可视化
-->
<template>
  <div class="peak-shaving-demo">
    <div class="header">
      <div class="title">削峰填谷：把高峰"摊平"</div>
      <div class="subtitle">模拟流量突增场景，观察队列如何保护后端系统</div>
    </div>

    <div class="main-layout">
      <!-- 左侧：控制面板 -->
      <div class="controls-panel">
        <div class="control-group">
          <div class="label-row">
            <span class="label">处理能力 (Consumer)</span>
            <span class="value">{{ processRate }} req/s</span>
          </div>
          <input
            v-model="processRate"
            type="range"
            min="50"
            max="1000"
            step="50"
            class="range-input process-range"
          />
          <div class="desc">后端系统的最大处理速度</div>
        </div>

        <div class="control-group">
          <div class="label-row">
            <span class="label">队列容量 (Queue Size)</span>
            <span class="value">{{ queueCapacity }}</span>
          </div>
          <input
            v-model="queueCapacity"
            type="range"
            min="500"
            max="10000"
            step="500"
            class="range-input queue-range"
          />
          <div class="desc">消息队列能暂存的最大请求数</div>
        </div>

        <div class="actions">
          <button
            class="action-btn burst-btn"
            @click="triggerBurst"
            :disabled="isBursting"
          >
            ⚡️ 模拟秒杀流量突增
          </button>
          <button class="action-btn reset-btn" @click="reset">
            🔄 重置系统
          </button>
        </div>
      </div>

      <!-- 右侧：实时监控 -->
      <div class="monitor-panel">
        <!-- 状态指标卡片 -->
        <div class="metrics-grid">
          <div class="metric-item">
            <div class="m-label">当前入站流量</div>
            <div class="m-value blue">
              {{ currentRequestRate }} <span class="unit">req/s</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="m-label">队列积压量</div>
            <div class="m-value orange">
              {{ queueLength }} <span class="unit">msgs</span>
            </div>
            <div class="m-bar-bg">
              <div
                class="m-bar-fill"
                :style="{ width: queuePercent + '%', background: queueColor }"
              ></div>
            </div>
          </div>
          <div class="metric-item">
            <div class="m-label">实际处理速率</div>
            <div class="m-value green">
              {{ currentProcessRate }} <span class="unit">req/s</span>
            </div>
          </div>
          <div class="metric-item">
            <div class="m-label">丢弃请求 (限流)</div>
            <div class="m-value red">
              {{ rejectedCount }} <span class="unit">req</span>
            </div>
          </div>
        </div>

        <!-- 实时图表 -->
        <div class="chart-container">
          <canvas ref="chartCanvas" width="600" height="200"></canvas>
          <div class="chart-legend">
            <span class="legend-item"
              ><span class="dot blue"></span>入站流量 (用户请求)</span
            >
            <span class="legend-item"
              ><span class="dot green"></span>处理流量 (系统负载)</span
            >
            <span class="legend-item"
              ><span class="dot orange"></span>队列积压</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-tips">
      <div class="tip-icon">💡</div>
      <div class="tip-content">
        <strong>核心原理：</strong>
        当<strong>入站流量</strong>（蓝色）超过<strong>处理能力</strong>（绿色直线）时，多余的请求会被存入<strong>消息队列</strong>（橙色区域）。
        <br />
        一旦流量高峰过去，系统会继续全速处理队列中的积压，直到队列清空。这就是"削峰填谷"。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 核心状态
const processRate = ref(200) // 消费速率 (req/s)
const queueCapacity = ref(2000) // 队列容量
const queueLength = ref(0) // 当前队列长度
const rejectedCount = ref(0) // 总丢弃数

// 实时状态（用于展示和图表）
const currentRequestRate = ref(100) // 当前产生的请求速率
const currentProcessRate = ref(0) // 当前实际处理的速率
const isBursting = ref(false)

// 图表相关
const chartCanvas = ref(null)
let ctx = null
let animationFrameId = null
const historyLength = 300 // 记录最近 N 帧
const dataHistory = [] // { input, process, queue }

// 模拟循环
let lastTime = Date.now()
const updateLoop = () => {
  const now = Date.now()
  const dt = (now - lastTime) / 1000 // delta time in seconds
  lastTime = now

  // 1. 生成流量 (模拟波动的入站流量)
  // 如果在突发模式下，流量激增；否则维持在低水位波动
  let targetInput = isBursting.value ? 2000 : 100 + Math.random() * 50

  // 平滑过渡入站流量
  const smoothing = 0.1
  currentRequestRate.value = Math.round(
    currentRequestRate.value * (1 - smoothing) + targetInput * smoothing
  )

  // 2. 计算本帧新增请求
  const newRequests = Math.round(currentRequestRate.value * dt * 10) // 放大系数以便观察

  // 3. 入队逻辑
  const availableSpace = queueCapacity.value - queueLength.value
  const accepted = Math.min(newRequests, availableSpace)
  const rejected = newRequests - accepted

  queueLength.value += accepted
  rejectedCount.value += rejected

  // 4. 处理逻辑 (出队)
  // 实际处理速率取决于：队列里有多少货，以及处理能力上限
  // 如果队列足够多，就满负荷处理；否则只处理队列里有的
  const maxProcessable = Math.round(processRate.value * dt * 10)
  const processed = Math.min(queueLength.value, maxProcessable)

  queueLength.value -= processed

  // 计算瞬时处理速率 (用于显示)
  currentProcessRate.value = Math.round(processed / (dt * 10))

  // 5. 记录历史数据用于绘图
  dataHistory.push({
    input: currentRequestRate.value,
    process: currentProcessRate.value,
    queue: queueLength.value,
    maxQueue: queueCapacity.value
  })

  if (dataHistory.length > historyLength) {
    dataHistory.shift()
  }

  drawChart()
  animationFrameId = requestAnimationFrame(updateLoop)
}

// 绘图逻辑
const drawChart = () => {
  if (!ctx || !chartCanvas.value) return

  // 动态调整画布大小以匹配显示尺寸（解决模糊和拉伸问题）
  const canvas = chartCanvas.value
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()

  // 只有当尺寸变化时才重置 canvas 尺寸
  if (
    canvas.width !== rect.width * dpr ||
    canvas.height !== rect.height * dpr
  ) {
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    // 缩放上下文以适配 DPR
    ctx.scale(dpr, dpr)
  }

  // 逻辑宽高（CSS像素）
  const width = rect.width
  const height = rect.height

  // 必须清除整个物理画布区域
  ctx.clearRect(0, 0, width, height) // 由于 scale 了，这里用逻辑宽高即可吗？
  // 不，clearRect 受 scale 影响。所以 clearRect(0,0, width, height) 是对的。
  // 但是为了安全，通常建议用 save/restore 或者直接重置 transform 清除。
  // 简单起见，我们假设 ctx.scale 已经生效。

  // 实际上，最好是在 resize 时只设置一次 scale。
  // 让我们简化一下：每帧都重置 transform 并清除
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.scale(dpr, dpr)

  // 绘制网格背景
  ctx.strokeStyle = '#eee'
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const y = height - (height / 4) * i
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.stroke()

  if (dataHistory.length < 2) return

  // 找出最大值用于Y轴缩放
  const maxVal = Math.max(
    2000, // 固定最小刻度
    ...dataHistory.map((d) => Math.max(d.input, d.queue))
  )
  const yScale = (val) => height - (val / maxVal) * height * 0.9 // 留点余量
  const xScale = (index) => (index / (historyLength - 1)) * width

  // 1. 绘制队列积压 (填充区域)
  ctx.fillStyle = 'rgba(249, 115, 22, 0.2)' // Orange transparent
  ctx.beginPath()
  ctx.moveTo(0, height)
  dataHistory.forEach((d, i) => {
    ctx.lineTo(xScale(i), yScale(d.queue))
  })
  ctx.lineTo(width, height)
  ctx.fill()

  // 队列线
  ctx.strokeStyle = '#f97316' // Orange
  ctx.lineWidth = 2
  ctx.beginPath()
  dataHistory.forEach((d, i) => {
    if (i === 0) ctx.moveTo(xScale(i), yScale(d.queue))
    else ctx.lineTo(xScale(i), yScale(d.queue))
  })
  ctx.stroke()

  // 2. 绘制入站流量 (蓝色线)
  ctx.strokeStyle = '#3b82f6' // Blue
  ctx.lineWidth = 2
  ctx.beginPath()
  dataHistory.forEach((d, i) => {
    if (i === 0) ctx.moveTo(xScale(i), yScale(d.input))
    else ctx.lineTo(xScale(i), yScale(d.input))
  })
  ctx.stroke()

  // 3. 绘制处理流量 (绿色线)
  ctx.strokeStyle = '#22c55e' // Green
  ctx.lineWidth = 2
  ctx.beginPath()
  dataHistory.forEach((d, i) => {
    if (i === 0) ctx.moveTo(xScale(i), yScale(d.process))
    else ctx.lineTo(xScale(i), yScale(d.process))
  })
  ctx.stroke()
}

// 模拟突发流量
const triggerBurst = () => {
  if (isBursting.value) return
  isBursting.value = true

  // 3秒后恢复
  setTimeout(() => {
    isBursting.value = false
  }, 3000)
}

const reset = () => {
  queueLength.value = 0
  rejectedCount.value = 0
  dataHistory.length = 0
  currentRequestRate.value = 100
  isBursting.value = false
}

const queuePercent = computed(() => {
  return Math.min(100, (queueLength.value / queueCapacity.value) * 100)
})

const queueColor = computed(() => {
  if (queuePercent.value > 80) return '#ef4444'
  if (queuePercent.value > 50) return '#f97316'
  return '#22c55e'
})

onMounted(() => {
  if (chartCanvas.value) {
    ctx = chartCanvas.value.getContext('2d')
    // 解决高清屏模糊
    const dpr = window.devicePixelRatio || 1
    const rect = chartCanvas.value.getBoundingClientRect()
    // 简单处理：这里由于是固定width/height属性，暂时不处理resize
  }

  lastTime = Date.now()
  animationFrameId = requestAnimationFrame(updateLoop)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.peak-shaving-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 24px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.main-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
}

.controls-panel {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 14px;
  font-weight: 500;
}

.value {
  font-size: 13px;
  font-family: monospace;
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
}

.desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.range-input {
  width: 100%;
  accent-color: var(--vp-c-brand);
}

.actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  padding: 10px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.burst-btn {
  background: var(--vp-c-brand);
  color: white;
}
.burst-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}
.burst-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}
.reset-btn:hover {
  background: var(--vp-c-bg-mute);
}

.monitor-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.metric-item {
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.m-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.m-value {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.unit {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
}

.m-value.blue {
  color: #3b82f6;
}
.m-value.green {
  color: #22c55e;
}
.m-value.orange {
  color: #f97316;
}
.m-value.red {
  color: #ef4444;
}

.m-bar-bg {
  height: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.m-bar-fill {
  height: 100%;
  transition: width 0.2s;
}

.chart-container {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-height: 250px;
}

canvas {
  width: 100%;
  height: 100%;
  flex: 1;
}

.chart-legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.blue {
  background: #3b82f6;
}
.dot.green {
  background: #22c55e;
}
.dot.orange {
  background: #f97316;
}

.scenario-tips {
  margin-top: 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}
</style>
