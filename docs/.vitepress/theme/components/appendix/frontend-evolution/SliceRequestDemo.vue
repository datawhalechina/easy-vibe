<!--
  SliceRequestDemo.vue - HTTP请求优化对比
  用"搬家"的比喻来解释雪碧图 vs 切片请求
-->
<template>
  <div class="slice-request-demo">
    <!-- 标题区 -->
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">HTTP请求优化</span>
      <span class="subtitle">雪碧图 vs 独立请求</span>
    </div>

    <!-- 主内容区 -->
    <div class="demo-content">
      <!-- 故事引入 -->
      <div class="story-box">
        <p class="story-text">
          <strong>通俗说法：</strong>就像搬家——<br>
          <strong>切图模式</strong>：一箱一箱搬，需要6趟（6次HTTP请求）<br>
          <strong>雪碧图模式</strong>：打包一次性运走，只需1趟（1次HTTP请求）
        </p>
      </div>

      <!-- 模式选择 -->
      <div class="mode-selector">
        <div
          class="mode-card"
          :class="{ active: mode === 'separate' }"
          @click="mode = 'separate'"
        >
          <div class="mode-icon">
            🛵
          </div>
          <div class="mode-name">
            切图模式
          </div>
          <div class="mode-desc">
            通俗说法: 一箱一趟
          </div>
          <div class="mode-detail">
            需要 6 趟运输
          </div>
        </div>

        <div class="vs-divider">
          VS
        </div>

        <div
          class="mode-card"
          :class="{ active: mode === 'packed' }"
          @click="mode = 'packed'"
        >
          <div class="mode-icon">
            🚚
          </div>
          <div class="mode-name">
            雪碧图模式
          </div>
          <div class="mode-desc">
            通俗说法: 打包一车拉
          </div>
          <div class="mode-detail">
            只需 1 趟运输
          </div>
        </div>
      </div>

      <!-- 动画演示区 -->
      <div class="animation-area">
        <!-- 起点 -->
        <div class="location start">
          <div class="location-icon">
            🏠
          </div>
          <div class="location-label">
            旧家
          </div>
          <div class="boxes-remaining">
            剩余箱子: <span class="count">{{ remainingBoxes }}</span>
          </div>
        </div>

        <!-- 道路 -->
        <div class="road">
          <div class="road-line" />

          <!-- 运输车辆 -->
          <div
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            class="vehicle"
            :class="{ 'moving': vehicle.isMoving }"
            :style="{ left: vehicle.position + '%' }"
          >
            <div class="vehicle-body">
              {{ mode === 'separate' ? '🛵' : '🚚' }}
            </div>
            <div
              v-if="vehicle.cargo > 0"
              class="vehicle-cargo"
            >
              {{ mode === 'separate' ? '📦' : '📦×' + vehicle.cargo }}
            </div>
          </div>
        </div>

        <!-- 终点 -->
        <div class="location end">
          <div class="location-icon">
            🏡
          </div>
          <div class="location-label">
            新家
          </div>
          <div class="boxes-delivered">
            已送达: <span class="count">{{ deliveredBoxes }}</span>/6
          </div>
        </div>
      </div>

      <!-- 统计面板 -->
      <div class="stats-panel">
        <div class="stat-item">
          <div class="stat-label">
            运输趟数
          </div>
          <div
            class="stat-value"
            :class="{ 'good': trips <= 2, 'bad': trips > 2 }"
          >
            {{ trips }} 趟
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">
            总耗时
          </div>
          <div class="stat-value">
            {{ totalTime.toFixed(1) }} 秒
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">
            效率评分
          </div>
          <div
            class="stat-value"
            :class="efficiencyClass"
          >
            {{ efficiency }}
          </div>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="controls">
        <button
          class="btn btn-primary"
          :disabled="isRunning"
          @click="startSimulation"
        >
          {{ isRunning ? '运输中...' : '开始搬家' }}
        </button>
        <button
          class="btn btn-secondary"
          @click="resetSimulation"
        >
          重置
        </button>
      </div>
    </div>

    <!-- 信息框 -->
    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想:</strong>
      <span v-if="mode === 'separate'">切图模式每次只拉一件货,需要6次HTTP请求,效率低。</span>
      <span v-else>雪碧图模式打包一次性运走,只需1次HTTP请求,大幅减少连接开销。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模式选择
const mode = ref('separate')

// 运行状态
const isRunning = ref(false)
const trips = ref(0)
const totalTime = ref(0)
const remainingBoxes = ref(6)
const deliveredBoxes = ref(0)

// 车辆动画
const vehicles = ref([])

// 计算效率评分
const efficiency = computed(() => {
  if (mode.value === 'packed') {
    return trips.value <= 1 ? '优秀' : '良好'
  } else {
    return trips.value <= 3 ? '一般' : '低效'
  }
})

const efficiencyClass = computed(() => {
  const score = efficiency.value
  if (score === '优秀') return 'excellent'
  if (score === '良好') return 'good'
  if (score === '一般') return 'average'
  return 'poor'
})

// 开始模拟
const startSimulation = async () => {
  if (isRunning.value) return

  isRunning.value = true
  resetStats()

  if (mode.value === 'separate') {
    // 分开运输：一箱一趟
    for (let i = 0; i < 6; i++) {
      await runTrip(1)
      trips.value++
    }
  } else {
    // 打包运输：6箱一趟
    await runTrip(6)
    trips.value = 1
  }

  isRunning.value = false
}

// 单次运输动画
const runTrip = (cargoCount) => {
  return new Promise((resolve) => {
    // 创建车辆
    const vehicle = {
      id: Date.now(),
      position: 0,
      cargo: cargoCount,
      isMoving: true
    }
    vehicles.value = [vehicle]

    // 更新剩余箱子
    remainingBoxes.value = Math.max(0, remainingBoxes.value - cargoCount)

    // 动画：去程
    const goTrip = setInterval(() => {
      vehicle.position += 2
      if (vehicle.position >= 100) {
        clearInterval(goTrip)

        // 送达
        deliveredBoxes.value += cargoCount

        // 动画：返程
        setTimeout(() => {
          const returnTrip = setInterval(() => {
            vehicle.position -= 2
            if (vehicle.position <= 0) {
              clearInterval(returnTrip)
              vehicles.value = []
              resolve()
            }
          }, 20)
        }, 300)
      }
    }, 20)

    // 累计时间
    totalTime.value += 2.5
  })
}

// 重置模拟
const resetSimulation = () => {
  isRunning.value = false
  vehicles.value = []
  resetStats()
}

const resetStats = () => {
  trips.value = 0
  totalTime.value = 0
  remainingBoxes.value = 6
  deliveredBoxes.value = 0
}
</script>

<style scoped>
.slice-request-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

/* 标题区 */
.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

/* 主内容区 */
.demo-content {
  margin-bottom: 0.75rem;
}

/* 故事框 */
.story-box {
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.story-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}

/* 模式选择 */
.mode-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mode-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 160px;
  flex: 1;
  max-width: 220px;
}

.mode-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mode-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mode-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.mode-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.mode-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.mode-detail {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  display: inline-block;
}

.vs-divider {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
  padding: 0 0.5rem;
}

/* 动画演示区 */
.animation-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.location {
  text-align: center;
  min-width: 80px;
}

.location-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.location-label {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.boxes-remaining,
.boxes-delivered {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.count {
  font-weight: bold;
  color: var(--vp-c-brand);
  font-size: 0.9rem;
}

.road {
  flex: 1;
  position: relative;
  height: 60px;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow: hidden;
}

.road-line {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    var(--vp-c-brand) 0px,
    var(--vp-c-brand) 20px,
    transparent 20px,
    transparent 40px
  );
  transform: translateY(-50%);
}

.vehicle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: none;
}

.vehicle-body {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.vehicle-cargo {
  font-size: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.125rem 0.375rem;
  border-radius: 6px;
  margin-top: 0.125rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: var(--vp-c-brand);
}

/* 统计面板 */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  border: 2px solid var(--vp-c-divider);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.stat-value.good {
  color: var(--vp-c-success);
}

.stat-value.bad {
  color: var(--vp-c-danger);
}

.stat-value.excellent {
  color: var(--vp-c-brand);
}

.stat-value.poor {
  color: var(--vp-c-warning);
}

/* 控制按钮 */
.controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

/* 信息框 */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

/* 响应式 */
@media (max-width: 768px) {
  .mode-selector {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
  }

  .animation-area {
    flex-direction: column;
    gap: 0.75rem;
  }

  .road {
    width: 100%;
    height: 60px;
  }

  .stats-panel {
    grid-template-columns: 1fr;
  }
}
</style>
