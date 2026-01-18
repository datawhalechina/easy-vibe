<!--
  LocalityPrincipleDemo.vue
  局部性原理演示 - 展示时间局部性和空间局部性
-->
<template>
  <div class="locality-demo">
    <div class="header">
      <div class="title">局部性原理演示</div>
      <div class="subtitle">理解缓存为什么有效</div>
    </div>

    <div class="tabs">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'temporal' }"
        @click="activeTab = 'temporal'"
      >
        时间局部性
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'spatial' }"
        @click="activeTab = 'spatial'"
      >
        空间局部性
      </button>
    </div>

    <div class="tab-content">
      <!-- Temporal Locality -->
      <div v-if="activeTab === 'temporal'" class="temporal-demo">
        <div class="description">
          <strong>时间局部性</strong
          >：如果你访问了某个数据，未来很可能再次访问它。
          <br />
          <span class="example"
            >例子：用户登录后，每次请求都需要查询用户信息</span
          >
        </div>

        <div class="timeline">
          <div class="timeline-title">访问时间线</div>
          <div class="timeline-events">
            <div
              v-for="(event, index) in temporalEvents"
              :key="index"
              class="event"
              :class="{ hit: event.hit, miss: !event.hit }"
            >
              <div class="event-time">{{ event.time }}</div>
              <div class="event-action">
                <span class="user-icon">👤</span>
                <span>查询 user_{{ event.userId }}</span>
              </div>
              <div class="event-result">
                {{ event.hit ? '✅ 缓存命中' : '❌ 缓存未命中' }}
              </div>
            </div>
          </div>
        </div>

        <div class="cache-state">
          <div class="cache-title">当前缓存状态</div>
          <div class="cache-items">
            <div
              v-for="item in cacheItems"
              :key="item.id"
              class="cache-item"
              :class="{ active: item.active }"
            >
              <div class="item-id">{{ item.id }}</div>
              <div class="item-hits">命中 {{ item.hits }} 次</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spatial Locality -->
      <div v-if="activeTab === 'spatial'" class="spatial-demo">
        <div class="description">
          <strong>空间局部性</strong
          >：如果你访问了某个数据，很可能访问它附近的数据。
          <br />
          <span class="example">例子：浏览商品列表时，通常会翻到下一页</span>
        </div>

        <div class="product-grid">
          <div class="grid-title">商品浏览序列</div>
          <div class="products">
            <div
              v-for="product in products"
              :key="product.id"
              class="product"
              :class="{
                viewed: product.viewed,
                cached: product.cached,
                current: product.current
              }"
            >
              <div class="product-id">{{ product.id }}</div>
              <div class="product-status">
                <span v-if="product.current">👁️ 当前</span>
                <span v-else-if="product.cached">⚡ 已缓存</span>
                <span v-else-if="product.viewed">✓ 已浏览</span>
              </div>
            </div>
          </div>
        </div>

        <div class="spatial-explanation">
          <div class="explanation-item">
            <div class="icon">📊</div>
            <div class="text">
              <strong>预取策略</strong>：当你浏览第 5 个商品时，系统自动将 6-8
              预加载到缓存
            </div>
          </div>
          <div class="explanation-item">
            <div class="icon">🎯</div>
            <div class="text">
              <strong>命中率提升</strong>：空间局部性让缓存命中率达到 70-90%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="interactive-controls">
      <button class="control-btn" @click="addEvent">添加访问事件</button>
      <button class="control-btn secondary" @click="reset">重置</button>
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-label">总访问次数</div>
        <div class="stat-value">{{ totalAccess }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">缓存命中</div>
        <div class="stat-value hit">{{ hitCount }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">命中率</div>
        <div class="stat-value">{{ hitRate }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('temporal')
const temporalEvents = ref([])
const cacheItems = ref([])
const products = ref([])
let eventCounter = 0

const totalAccess = computed(() => temporalEvents.value.length)
const hitCount = computed(
  () => temporalEvents.value.filter((e) => e.hit).length
)
const hitRate = computed(() => {
  if (totalAccess.value === 0) return 0
  return Math.round((hitCount.value / totalAccess.value) * 100)
})

const initializeProducts = () => {
  products.value = Array.from({ length: 10 }, (_, i) => ({
    id: `P${i + 1}`,
    viewed: false,
    cached: false,
    current: false
  }))
}

const addEvent = () => {
  const currentTime = new Date().toLocaleTimeString()
  const userId = Math.floor(Math.random() * 3) + 1

  const existingItem = cacheItems.value.find(
    (item) => item.id === `user_${userId}`
  )
  const hit = existingItem !== undefined

  if (existingItem) {
    existingItem.hits++
    existingItem.active = true
    setTimeout(() => {
      existingItem.active = false
    }, 1000)
  } else {
    if (cacheItems.value.length >= 5) {
      cacheItems.value.shift()
    }
    cacheItems.value.push({
      id: `user_${userId}`,
      hits: 1,
      active: true
    })
  }

  temporalEvents.value.push({
    time: currentTime,
    userId,
    hit
  })

  if (temporalEvents.value.length > 8) {
    temporalEvents.value.shift()
  }

  if (activeTab.value === 'spatial') {
    const currentIndex = products.value.findIndex((p) => p.current)
    if (currentIndex !== -1) {
      products.value[currentIndex].current = false
      products.value[currentIndex].viewed = true
    }

    const nextIndex = currentIndex + 1
    if (nextIndex < products.value.length) {
      products.value[nextIndex].current = true
      products.value[nextIndex].viewed = true

      // Prefetch next items
      for (let i = 1; i <= 2; i++) {
        const prefetchIndex = nextIndex + i
        if (prefetchIndex < products.value.length) {
          products.value[prefetchIndex].cached = true
        }
      }
    }
  }
}

const reset = () => {
  temporalEvents.value = []
  cacheItems.value = []
  initializeProducts()
}

initializeProducts()
</script>

<style scoped>
.locality-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.tab-content {
  min-height: 300px;
}

.description {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.example {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.timeline {
  margin-bottom: 1.5rem;
}

.timeline-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.timeline-events {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event {
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border-left: 3px solid #94a3b8;
}

.event.hit {
  border-left-color: #22c55e;
}

.event.miss {
  border-left-color: #ef4444;
}

.event-time {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.event-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.user-icon {
  font-size: 1.2rem;
}

.event-result {
  font-size: 0.8rem;
  font-weight: 600;
}

.cache-state {
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 8px;
}

.cache-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.cache-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cache-item {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  transition: all 0.3s;
}

.cache-item.active {
  border-color: var(--vp-c-brand);
  background: #eff6ff;
  transform: scale(1.05);
}

.item-id {
  font-weight: 600;
}

.item-hits {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.product-grid {
  margin-bottom: 1.5rem;
}

.grid-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
}

.product {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  text-align: center;
  transition: all 0.3s;
}

.product.viewed {
  border-color: #94a3b8;
}

.product.cached {
  border-color: #f59e0b;
  background: #fef3c7;
}

.product.current {
  border-color: var(--vp-c-brand);
  background: #dbeafe;
  transform: scale(1.1);
}

.product-id {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.product-status {
  font-size: 0.75rem;
}

.spatial-explanation {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.explanation-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.icon {
  font-size: 1.5rem;
}

.text {
  flex: 1;
  font-size: 0.85rem;
  line-height: 1.5;
}

.interactive-controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.control-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.control-btn.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.stat-value.hit {
  color: #22c55e;
}
</style>
