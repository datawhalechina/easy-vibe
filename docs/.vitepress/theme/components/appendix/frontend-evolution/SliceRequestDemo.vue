<!--
  SliceRequestDemo.vue - 搬家快递大作战
  用"搬家打包"的比喻来解释 HTTP 请求优化（切图 vs 雪碧图）
-->
<template>
  <div class="moving-game">
    <!-- 故事引入 -->
    <div class="story-box">
      <div class="story-emoji">📦🚚🏠</div>
      <h4 class="story-title">小明搬家记</h4>
      <p class="story-text">
        小明要搬 6 箱书到新房子。有两种搬家方式：<br>
        <strong>A 方案：一箱一箱搬</strong>（切图模式） vs <strong>B 方案：一次性打包运走</strong>（雪碧图模式）<br>
        看看哪种更省时间？
      </p>
    </div>

    <!-- 模式选择 -->
    <div class="mode-selector">
      <div
        class="mode-card"
        :class="{ active: mode === 'separate' }"
        @click="mode = 'separate'"
      >
        <div class="mode-icon">🛵</div>
        <div class="mode-name">A 方案：一箱一趟</div>
        <div class="mode-desc">小面包车，一次拉一箱</div>
        <div class="mode-detail">需要 6 趟运输</div>
      </div>

      <div class="vs-divider">VS</div>

      <div
        class="mode-card"
        :class="{ active: mode === 'packed' }"
        @click="mode = 'packed'"
      >
        <div class="mode-icon">🚚</div>
        <div class="mode-name">B 方案：打包一车拉</div>
        <div class="mode-desc">大卡车，6箱一次运走</div>
        <div class="mode-detail">只需 1 趟运输</div>
      </div>
    </div>

    <!-- 动画演示区 -->
    <div class="animation-area">
      <!-- 起点 -->
      <div class="location start">
        <div class="location-icon">🏠</div>
        <div class="location-label">旧家</div>
        <div class="boxes-remaining">
          剩余箱子: <span class="count">{{ remainingBoxes }}</span>
        </div>
      </div>

      <!-- 道路 -->
      <div class="road">
        <div class="road-line"></div>

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
          <div class="vehicle-cargo" v-if="vehicle.cargo > 0">
            {{ mode === 'separate' ? '📦' : '📦×' + vehicle.cargo }}
          </div>
        </div>
      </div>

      <!-- 终点 -->
      <div class="location end">
        <div class="location-icon">🏡</div>
        <div class="location-label">新家</div>
        <div class="boxes-delivered">
          已送达: <span class="count">{{ deliveredBoxes }}</span>/6
        </div>
      </div>
    </div>

    <!-- 统计面板 -->
    <div class="stats-panel">
      <div class="stat-item">
        <div class="stat-label">运输趟数</div>
        <div class="stat-value" :class="{ 'good': trips <= 2, 'bad': trips > 2 }">
          {{ trips }} 趟
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-label">总耗时</div>
        <div class="stat-value">{{ totalTime.toFixed(1) }} 秒</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">效率评分</div>
        <div class="stat-value" :class="efficiencyClass">
          {{ efficiency }}
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <button
        class="btn btn-primary"
        @click="startSimulation"
        :disabled="isRunning"
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

    <!-- 知识点总结 -->
    <div class="knowledge-box">
      <div class="knowledge-title">💡 核心原理</div>
      <div class="knowledge-content">
        <p v-if="mode === 'separate'">
          <strong>切图模式（分开请求）：</strong>就像一箱一箱搬，每次只拉一件货。
          浏览器要发起 6 次 HTTP 请求，每次都要建立连接、传输数据，
          <span class="highlight-bad">效率低、耗时长</span>。
        </p>
        <p v-else>
          <strong>雪碧图模式（合并请求）：</strong>就像用大卡车一次性拉走所有箱子。
          浏览器只需 1 次 HTTP 请求就能获取所有图片，
          <span class="highlight-good">大幅减少连接开销，速度更快</span>！
        </p>
      </div>
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
.moving-game {
  border: 2px solid #e8e8e8;
  border-radius: 16px;
  background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 故事框 */
.story-box {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border-radius: 16px;
  border: 2px dashed #ffc107;
}

.story-emoji {
  font-size: 48px;
  margin-bottom: 8px;
}

.story-title {
  font-size: 20px;
  font-weight: bold;
  color: #8b4513;
  margin: 0 0 8px 0;
}

.story-text {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* 模式选择 */
.mode-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.mode-card {
  background: white;
  border: 3px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  flex: 1;
  max-width: 280px;
}

.mode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.mode-card.active {
  border-color: #4caf50;
  background: #e8f5e9;
}

.mode-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.mode-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.mode-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.mode-detail {
  font-size: 14px;
  font-weight: bold;
  color: #e65100;
  padding: 4px 12px;
  background: #fff3e0;
  border-radius: 12px;
  display: inline-block;
}

.vs-divider {
  font-size: 24px;
  font-weight: bold;
  color: #999;
  padding: 0 8px;
}

/* 动画演示区 */
.animation-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
}

.location {
  text-align: center;
  min-width: 100px;
}

.location-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.location-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.boxes-remaining,
.boxes-delivered {
  font-size: 12px;
  color: #666;
  padding: 4px 8px;
  background: #f5f5f5;
  border-radius: 8px;
}

.count {
  font-weight: bold;
  color: #e65100;
  font-size: 16px;
}

.road {
  flex: 1;
  position: relative;
  height: 80px;
  background: linear-gradient(to bottom, #e8eaf6 0%, #c5cae9 100%);
  border-radius: 8px;
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
    #7986cb 0px,
    #7986cb 20px,
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
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.vehicle-cargo {
  font-size: 12px;
  background: white;
  padding: 2px 6px;
  border-radius: 8px;
  margin-top: 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-weight: bold;
  color: #e65100;
}

/* 统计面板 */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 2px solid #e0e0e0;
}

.stat-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

.stat-value.good {
  color: #4caf50;
}

.stat-value.bad {
  color: #f44336;
}

.stat-value.excellent {
  color: #2196f3;
}

.stat-value.good {
  color: #4caf50;
}

.stat-value.poor {
  color: #ff9800;
}

/* 控制按钮 */
.controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

/* 知识点总结 */
.knowledge-box {
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #2196f3;
}

.knowledge-title {
  font-size: 16px;
  font-weight: bold;
  color: #1565c0;
  margin-bottom: 12px;
}

.knowledge-content {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.knowledge-content p {
  margin: 0;
}

.highlight-good {
  color: #4caf50;
  font-weight: bold;
}

.highlight-bad {
  color: #f44336;
  font-weight: bold;
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
    gap: 12px;
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
