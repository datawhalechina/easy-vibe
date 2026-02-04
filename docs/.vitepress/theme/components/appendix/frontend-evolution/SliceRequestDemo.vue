<!--
  SliceRequestDemo.vue
  切图时代请求次数演示 - 重构版

  用途：
  用外卖点餐的比喻，让零基础用户理解 HTTP 请求的概念。
  通过可视化的外卖小哥动画，展示切图时代 vs 雪碧图的性能差异。
-->
<template>
  <div class="slice-demo">
    <div class="scenario-intro">
      <div class="emoji-scene">🍕 📱 🛵</div>
      <h4>外卖点餐模拟器</h4>
      <p>想象一下你在点披萨外卖。每次下单，外卖小哥就要跑一趟。</p>
    </div>

    <div class="mode-tabs">
      <button
        v-for="mode in modes"
        :key="mode.id"
        :class="['mode-tab', { active: currentMode === mode.id }]"
        @click="switchMode(mode.id)"
      >
        <span class="tab-icon">{{ mode.icon }}</span>
        <span class="tab-label">{{ mode.label }}</span>
        <span class="tab-desc">{{ mode.desc }}</span>
      </button>
    </div>

    <div class="restaurant-scene">
      <div class="scene-header">
        <div class="restaurant-info">
          <span class="restaurant-emoji">🏪</span>
          <span class="restaurant-name">前端披萨店</span>
        </div>
        <div class="delivery-stats">
          <div class="stat">
            <span class="stat-label">外卖小哥跑了:</span>
            <span class="stat-value deliveries">{{ deliveryCount }}</span>
            <span class="stat-unit">趟</span>
          </div>
          <div class="stat time-stat">
            <span class="stat-label">总耗时:</span>
            <span class="stat-value time">{{ totalTime }}</span>
            <span class="stat-unit">秒</span>
          </div>
        </div>
      </div>

      <div class="scene-body">
        <div class="kitchen-area">
          <div class="kitchen-label">🍳 后厨（服务器）</div>
          <div class="food-items">
            <div
              v-for="(item, index) in foodItems"
              :key="index"
              class="food-item"
              :class="{ preparing: item.status === 'preparing', ready: item.status === 'ready' }"
            >
              <span class="food-emoji">{{ item.emoji }}</span>
              <span class="food-name">{{ item.name }}</span>
              <span class="food-status">{{ getStatusText(item.status) }}</span>
            </div>
          </div>
        </div>

        <div class="delivery-lane">
          <div class="lane-label">🛵 配送路线（网络）</div>
          <div class="delivery-runway">
            <div
              v-for="(rider, index) in activeRiders"
              :key="rider.id"
              class="rider"
              :style="{ left: rider.position + '%' }"
            >
              <div class="rider-emoji">{{ rider.mode === 'sprite' ? '🚚' : '🛵' }}</div>
              <div class="rider-package">
                <span v-for="emoji in rider.packages" :key="emoji">{{ emoji }}</span>
              </div>
            </div>
            <div v-if="activeRiders.length === 0" class="empty-lane">
              等待下单...
            </div>
          </div>
        </div>

        <div class="customer-area">
          <div class="customer-label">🏠 你家（浏览器）</div>
          <div class="received-items">
            <div v-if="receivedItems.length === 0" class="empty-plate">
              🍽️ 等待美食送达...
            </div>
            <div v-else class="food-on-table">
              <div
                v-for="(item, index) in receivedItems"
                :key="index"
                class="received-item"
                :class="{ fresh: item.isNew }"
              >
                <span class="item-emoji">{{ item.emoji }}</span>
                <span class="item-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button class="order-btn" @click="placeOrder" :disabled="isOrdering">
        <span class="btn-icon">{{ isOrdering ? '⏳' : '🛒' }}</span>
        <span class="btn-text">{{ isOrdering ? '配 送 中...' : '下 单 点 餐' }}</span>
      </button>
      <button class="reset-btn" @click="resetScene">
        <span class="btn-icon">🔄</span>
        <span class="btn-text">重新开始</span>
      </button>
    </div>

    <div class="explanation-box">
      <div class="explanation-icon">💡</div>
      <div class="explanation-content">
        <strong>{{ currentMode === 'slice' ? '切图时代' : '雪碧图时代' }}：</strong>
        {{ currentExplanation }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentMode = ref('slice')
const isOrdering = ref(false)
const deliveryCount = ref(0)
const totalTime = ref(0)
const activeRiders = ref([])
const receivedItems = ref([])

const modes = [
  {
    id: 'slice',
    label: '切图时代',
    icon: '🛵',
    desc: '每次只送一道菜'
  },
  {
    id: 'sprite',
    label: '雪碧图时代',
    icon: '🚚',
    desc: '一次送完整桌菜'
  }
]

const foodItems = [
  { emoji: '🍕', name: '披萨底', status: 'ready' },
  { emoji: '🧀', name: '芝士', status: 'ready' },
  { emoji: '🍄', name: '蘑菇', status: 'ready' },
  { emoji: '🥓', name: '培根', status: 'ready' },
  { emoji: '🫑', name: '青椒', status: 'ready' },
  { emoji: '🍅', name: '番茄酱', status: 'ready' }
]

const currentExplanation = computed(() => {
  return currentMode.value === 'slice'
    ? '每张小图都单独发一个 HTTP 请求。就像点外卖时，每道菜都单独叫一个外卖小哥，跑 6 趟才能送齐！'
    : '把所有小图合并成一张大图。就像把一桌菜装进一个保温箱，一个外卖小哥一趟就全送来了！'
})

const getStatusText = (status) => {
  const map = { ready: '✓ 就绪', preparing: '⏳ 制作中', delivering: '🛵 配送中' }
  return map[status] || status
}

let riderIdCounter = 0

const switchMode = (mode) => {
  currentMode.value = mode
  resetScene()
}

const resetScene = () => {
  isOrdering.value = false
  deliveryCount.value = 0
  totalTime.value = 0
  activeRiders.value = []
  receivedItems.value = []
  riderIdCounter = 0
}

const placeOrder = async () => {
  if (isOrdering.value) return
  isOrdering.value = true
  receivedItems.value = []

  const items = [...foodItems]

  if (currentMode.value === 'slice') {
    // 切图模式：每个食材单独配送
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      deliveryCount.value++

      // 创建骑手
      const rider = {
        id: riderIdCounter++,
        position: 0,
        mode: 'slice',
        packages: [item.emoji]
      }
      activeRiders.value = [rider]

      // 动画：去程 - 使用响应式方式更新
      await animateRiderReactive(rider, 100, 800)

      // 送达
      receivedItems.value.push({ ...item, isNew: true })
      setTimeout(() => { if (receivedItems.value[i]) receivedItems.value[i].isNew = false }, 500)

      // 动画：返程 - 使用响应式方式更新
      await animateRiderReactive(rider, 0, 600)

      totalTime.value += 1.4
      activeRiders.value = []
    }
  } else {
    // 雪碧图模式：一次送全部
    deliveryCount.value = 1

    const rider = {
      id: riderIdCounter++,
      position: 0,
      mode: 'sprite',
      packages: items.map(i => i.emoji)
    }
    activeRiders.value = [rider]

    // 动画：去程
    await animateRider(rider, 100, 1500)

    // 全部送达
    items.forEach((item, idx) => {
      setTimeout(() => {
        receivedItems.value.push({ ...item, isNew: true })
        setTimeout(() => {
          const found = receivedItems.value.find(r => r.name === item.name && r.isNew)
          if (found) found.isNew = false
        }, 500)
      }, idx * 100)
    })

    totalTime.value = 2.5

    // 动画：返程
    await animateRider(rider, 0, 1000)
    activeRiders.value = []
  }

  isOrdering.value = false
}

// 响应式动画函数 - 使用 Vue 的响希方式更新位置
const animateRiderReactive = (rider, targetPosition, duration) => {
  return new Promise(resolve => {
    const startPosition = rider.position
    const startTime = performance.now()
    let isActive = true

    const animate = (currentTime) => {
      if (!isActive) return

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // 缓动函数
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      // 使用 Vue 的方式触发更新 - 直接修改对象属性
      const newPosition = startPosition + (targetPosition - startPosition) * easeProgress

      // 通过强制触发 Vue 响应的方式更新
      rider.position = newPosition

      // 手动触发 Vue 的更新（通过操作数组）
      const riders = activeRiders.value
      const index = riders.indexOf(rider)
      if (index !== -1) {
        // 通过替换对象强制触发响应
        riders[index] = { ...rider, position: newPosition }
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        isActive = false
        resolve()
      }
    }

    requestAnimationFrame(animate)
  })
}
</script>

<style scoped>
.slice-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  padding: 1.5rem;
  margin: 1rem 0;
}

.scenario-intro {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255, 183, 77, 0.2), rgba(255, 138, 101, 0.2));
  border-radius: 12px;
}

.emoji-scene {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.scenario-intro h4 {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.scenario-intro p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.mode-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mode-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-tab:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.mode-tab.active {
  border-color: var(--vp-c-brand);
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg));
}

.tab-icon {
  font-size: 2rem;
}

.tab-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tab-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.restaurant-scene {
  background: linear-gradient(180deg, #e3f2fd 0%, #f5f5f5 100%);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.scene-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid #e0e0e0;
}

.restaurant-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.restaurant-emoji {
  font-size: 1.5rem;
}

.restaurant-name {
  font-weight: 600;
  color: #333;
}

.delivery-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: 700;
  font-size: 1.1rem;
}

.stat-value.deliveries {
  color: #ff6b6b;
}

.stat-value.time {
  color: #4ecdc4;
}

.scene-body {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem;
  min-height: 250px;
}

.kitchen-area,
.delivery-lane,
.customer-area {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 0.75rem;
}

.kitchen-label,
.lane-label,
.customer-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  text-align: center;
}

.food-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.food-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.75rem;
  transition: all 0.3s;
}

.food-item.preparing {
  background: #fff3e0;
}

.food-item.delivering {
  background: #e3f2fd;
}

.food-item.ready {
  background: #e8f5e9;
}

.food-emoji {
  font-size: 1rem;
}

.food-name {
  flex: 1;
  font-weight: 500;
}

.food-status {
  font-size: 0.625rem;
  color: #999;
}

.delivery-runway {
  position: relative;
  height: 120px;
  background: linear-gradient(90deg, #e8eaf6 0%, #c5cae9 50%, #e8eaf6 100%);
  border-radius: 8px;
  overflow: hidden;
}

.delivery-runway::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    #9fa8da 0px,
    #9fa8da 20px,
    transparent 20px,
    transparent 40px
  );
}

.rider {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: left 0.1s linear;
}

.rider-emoji {
  font-size: 2rem;
  animation: rider-bounce 0.5s infinite alternate;
}

@keyframes rider-bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-3px); }
}

.rider-package {
  display: flex;
  gap: 2px;
  margin-top: 2px;
  padding: 2px 4px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  font-size: 0.75rem;
}

.empty-lane {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9fa8da;
  font-size: 0.875rem;
}

.received-items {
  min-height: 150px;
}

.empty-plate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: #999;
  font-size: 0.875rem;
}

.food-on-table {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.received-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  transition: all 0.3s;
}

.received-item.fresh {
  animation: item-arrive 0.5s ease;
  background: #e8f5e9;
}

@keyframes item-arrive {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

.item-emoji {
  font-size: 1.5rem;
}

.item-name {
  font-size: 0.625rem;
  color: #666;
  margin-top: 0.25rem;
}

.control-panel {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.order-btn,
.reset-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.order-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
  color: white;
}

.order-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.order-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.reset-btn {
  background: #f5f5f5;
  color: #666;
}

.reset-btn:hover {
  background: #e0e0e0;
}

.explanation-box {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.explanation-icon {
  font-size: 1.5rem;
}

.explanation-content {
  flex: 1;
  font-size: 0.9rem;
  color: #444;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .scene-body {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .delivery-stats {
    flex-direction: column;
    gap: 0.5rem;
  }

  .mode-tabs {
    flex-direction: column;
  }

  .control-panel {
    flex-direction: column;
  }
}
</style>
