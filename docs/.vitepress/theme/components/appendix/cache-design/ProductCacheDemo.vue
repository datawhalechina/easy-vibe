<!--
  ProductCacheDemo.vue
  商品详情页缓存实战演示 - 完整的三级缓存系统
-->
<template>
  <div class="product-cache-demo">
    <div class="header">
      <div class="title">商品详情页缓存系统实战</div>
      <div class="subtitle">完整的三级缓存架构 + 监控面板</div>
    </div>

    <div class="architecture-overview">
      <div class="overview-title">系统架构</div>
      <div class="architecture-diagram">
        <div class="layer client">
          <div class="layer-label">客户端</div>
          <div class="layer-icon">📱</div>
        </div>
        <div class="arrow">↓</div>
        <div class="layer local-cache" :class="{ hit: currentLevel === 1 }">
          <div class="layer-label">L1: 本地缓存 (Caffeine)</div>
          <div class="layer-stats">
            <div>容量: 1000</div>
            <div>TTL: 30s</div>
            <div>命中: {{ localHits }}</div>
          </div>
        </div>
        <div class="arrow">↓</div>
        <div class="layer redis-cache" :class="{ hit: currentLevel === 2 }">
          <div class="layer-label">L2: Redis 集群</div>
          <div class="layer-stats">
            <div>容量: 100万</div>
            <div>TTL: 5min</div>
            <div>命中: {{ redisHits }}</div>
          </div>
        </div>
        <div class="arrow">↓</div>
        <div class="layer database" :class="{ hit: currentLevel === 3 }">
          <div class="layer-label">L3: MySQL 数据库</div>
          <div class="layer-stats">
            <div>持久化存储</div>
            <div>查询: {{ dbQueries }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-sections">
      <div class="section query-demo">
        <div class="section-title">查询商品</div>
        <div class="query-controls">
          <input
            v-model="productId"
            type="text"
            placeholder="输入商品ID (如: P001)"
            class="product-input"
          />
          <button class="query-btn" @click="queryProduct" :disabled="querying">
            {{ querying ? '查询中...' : '查询' }}
          </button>
          <button class="reset-btn" @click="resetDemo">重置</button>
        </div>

        <div class="query-result" v-if="queryResult">
          <div class="result-header">
            <span class="result-icon">{{ queryResult.icon }}</span>
            <span class="result-title">{{ queryResult.title }}</span>
          </div>
          <div class="result-details">
            <div class="detail-item">
              <span class="detail-label">商品ID:</span>
              <span class="detail-value">{{ queryResult.id }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">名称:</span>
              <span class="detail-value">{{ queryResult.name }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">价格:</span>
              <span class="detail-value">¥{{ queryResult.price }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">来源:</span>
              <span
                class="detail-value source"
                :class="queryResult.sourceLevel"
              >
                {{ queryResult.source }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">响应时间:</span>
              <span class="detail-value">{{ queryResult.responseTime }}ms</span>
            </div>
          </div>
        </div>

        <div class="query-flow" v-if="queryFlow.length > 0">
          <div class="flow-title">查询流程</div>
          <div class="flow-steps">
            <div
              v-for="(step, index) in queryFlow"
              :key="index"
              class="flow-step"
              :class="step.type"
            >
              <div class="step-level">{{ step.level }}</div>
              <div class="step-result">{{ step.result }}</div>
              <div class="step-time">{{ step.time }}ms</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section cache-monitor">
        <div class="section-title">缓存监控</div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">总请求数</div>
            <div class="metric-value">{{ metrics.totalRequests }}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">本地缓存命中</div>
            <div class="metric-value local">{{ localHits }}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Redis命中</div>
            <div class="metric-value redis">{{ redisHits }}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">数据库查询</div>
            <div class="metric-value db">{{ dbQueries }}</div>
          </div>
        </div>

        <div class="hit-rate-display">
          <div class="rate-label">整体命中率</div>
          <div class="rate-value">{{ overallHitRate }}%</div>
          <div class="rate-bar">
            <div
              class="rate-fill"
              :style="{ width: overallHitRate + '%' }"
            ></div>
          </div>
          <div class="rate-target">目标: > 90%</div>
        </div>

        <div class="cache-stats-detail">
          <div class="stats-title">详细统计</div>
          <div class="stats-list">
            <div class="stat-item">
              <span class="stat-label">本地缓存命中率:</span>
              <span class="stat-value">{{ localHitRate }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Redis缓存命中率:</span>
              <span class="stat-value">{{ redisHitRate }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">平均响应时间:</span>
              <span class="stat-value">{{ avgResponseTime }}ms</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">数据库压力:</span>
              <span class="stat-value">{{ dbPressure }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="features">
      <div class="feature-title">核心特性</div>
      <div class="feature-grid">
        <div class="feature-item">
          <div class="feature-icon">🛡️</div>
          <div class="feature-name">多级缓存</div>
          <div class="feature-desc">
            本地缓存 + Redis 双层防护，减少 99% 数据库查询
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🔒</div>
          <div class="feature-name">防击穿</div>
          <div class="feature-desc">互斥锁保护热点数据，避免并发查询数据库</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <div class="feature-name">防穿透</div>
          <div class="feature-desc">缓存空对象，防止查询不存在的商品</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⏰</div>
          <div class="feature-name">随机 TTL</div>
          <div class="feature-desc">避免缓存雪崩，过期时间加随机值</div>
        </div>
      </div>
    </div>

    <div class="code-preview">
      <div class="code-title">核心代码片段</div>
      <pre class="code-block"><code>// 三级缓存查询
public Product getProduct(String productId) {
    // L1: 本地缓存
    Product product = localCache.getIfPresent(productId);
    if (product != null) {
        metrics.localHits++;
        return product;
    }

    // L2: Redis 缓存
    product = redisTemplate.get("product:" + productId);
    if (product != null) {
        localCache.put(productId, product);  // 回填
        metrics.redisHits++;
        return product;
    }

    // L3: 数据库（加锁防击穿）
    synchronized(this) {
        // 双重检查
        product = redisTemplate.get("product:" + productId);
        if (product != null) return product;

        // 查数据库
        product = productMapper.selectById(productId);
        if (product == null) {
            // 缓存空对象（防穿透）
            redisTemplate.set("product:" + productId,
                NULL_PRODUCT, 5, TimeUnit.MINUTES);
            return null;
        }

        // 写入缓存（随机 TTL 防雪崩）
        int ttl = 300 + ThreadLocalRandom.current().nextInt(-30, 30);
        redisTemplate.set("product:" + productId, product,
            ttl, TimeUnit.SECONDS);
        localCache.put(productId, product);

        metrics.dbQueries++;
        return product;
    }
}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const productId = ref('P001')
const querying = ref(false)
const queryResult = ref(null)
const queryFlow = ref([])
const currentLevel = ref(0)

const localHits = ref(0)
const redisHits = ref(0)
const dbQueries = ref(0)

const metrics = ref({
  totalRequests: 0
})

const products = {
  P001: { id: 'P001', name: 'iPhone 15 Pro', price: 7999 },
  P002: { id: 'P002', name: 'MacBook Pro 14"', price: 14999 },
  P003: { id: 'P003', name: 'AirPods Pro', price: 1999 },
  P004: { id: 'P004', name: 'iPad Air', price: 4799 }
}

const overallHitRate = computed(() => {
  const total = metrics.value.totalRequests
  if (total === 0) return 0
  const hits = localHits.value + redisHits.value
  return Math.round((hits / total) * 100)
})

const localHitRate = computed(() => {
  const total = metrics.value.totalRequests
  if (total === 0) return 0
  return Math.round((localHits.value / total) * 100)
})

const redisHitRate = computed(() => {
  const total = metrics.value.totalRequests
  if (total === 0) return 0
  return Math.round((redisHits.value / total) * 100)
})

const avgResponseTime = computed(() => {
  const total = metrics.value.totalRequests
  if (total === 0) return 0
  const totalTime =
    localHits.value * 1 + redisHits.value * 5 + dbQueries.value * 50
  return Math.round(totalTime / total)
})

const dbPressure = computed(() => {
  const total = metrics.value.totalRequests
  if (total === 0) return 0
  return Math.round((dbQueries.value / total) * 100)
})

const queryProduct = async () => {
  if (!productId.value || querying.value) return

  querying.value = true
  queryFlow.value = []
  queryResult.value = null
  currentLevel.value = 0

  const id = productId.value.toUpperCase()
  const exists = products[id]

  // Simulate cache levels
  const flow = []

  // Level 1: Local Cache (30% hit rate for demo)
  await new Promise((resolve) => setTimeout(resolve, 300))
  currentLevel.value = 1
  const localHit = Math.random() < 0.3
  flow.push({
    level: 'L1: 本地缓存',
    result: localHit ? '✅ 命中' : '❌ 未命中',
    time: 1,
    type: localHit ? 'hit' : 'miss'
  })

  if (localHit && exists) {
    localHits.value++
    metrics.value.totalRequests++
    queryFlow.value = flow
    queryResult.value = {
      icon: '⚡',
      title: '本地缓存命中',
      id: products[id].id,
      name: products[id].name,
      price: products[id].price,
      source: '本地缓存',
      sourceLevel: 'local',
      responseTime: 1
    }
    querying.value = false
    currentLevel.value = 0
    return
  }

  // Level 2: Redis (50% hit rate for demo)
  await new Promise((resolve) => setTimeout(resolve, 300))
  currentLevel.value = 2
  const redisHit = !localHit && Math.random() < 0.5 && exists
  flow.push({
    level: 'L2: Redis',
    result: redisHit ? '✅ 命中' : '❌ 未命中',
    time: 5,
    type: redisHit ? 'hit' : 'miss'
  })

  if (redisHit && exists) {
    redisHits.value++
    metrics.value.totalRequests++
    queryFlow.value = flow
    queryResult.value = {
      icon: '🚀',
      title: 'Redis缓存命中',
      id: products[id].id,
      name: products[id].name,
      price: products[id].price,
      source: 'Redis缓存',
      sourceLevel: 'redis',
      responseTime: 6
    }
    querying.value = false
    currentLevel.value = 0
    return
  }

  // Level 3: Database
  await new Promise((resolve) => setTimeout(resolve, 500))
  currentLevel.value = 3
  flow.push({
    level: 'L3: 数据库',
    result: exists ? '✅ 查询成功' : '❌ 商品不存在',
    time: 50,
    type: exists ? 'hit' : 'miss'
  })

  dbQueries.value++
  metrics.value.totalRequests++
  queryFlow.value = flow

  if (exists) {
    queryResult.value = {
      icon: '🗄️',
      title: '数据库查询',
      id: products[id].id,
      name: products[id].name,
      price: products[id].price,
      source: 'MySQL 数据库',
      sourceLevel: 'database',
      responseTime: 56
    }
  } else {
    queryResult.value = {
      icon: '❌',
      title: '商品不存在',
      id: id,
      name: '-',
      price: '-',
      source: '缓存空对象',
      sourceLevel: 'notfound',
      responseTime: 56
    }
  }

  querying.value = false
  currentLevel.value = 0
}

const resetDemo = () => {
  productId.value = 'P001'
  queryResult.value = null
  queryFlow.value = []
  localHits.value = 0
  redisHits.value = 0
  dbQueries.value = 0
  metrics.value.totalRequests = 0
  currentLevel.value = 0
}
</script>

<style scoped>
.product-cache-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.architecture-overview {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.overview-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.layer {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.layer.hit {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.layer.client {
  background: #f3e8ff;
  border-color: #a855f7;
  text-align: center;
}

.layer.local-cache {
  background: #dbeafe;
  border-color: #3b82f6;
}

.layer.local-cache.hit {
  background: #eff6ff;
  border-color: #3b82f6;
}

.layer.redis-cache {
  background: #fef3c7;
  border-color: #f59e0b;
}

.layer.redis-cache.hit {
  background: #fef9c3;
  border-color: #f59e0b;
}

.layer.database {
  background: #fee2e2;
  border-color: #ef4444;
}

.layer.database.hit {
  background: #fef2f2;
  border-color: #ef4444;
}

.layer-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.layer-icon {
  font-size: 2rem;
}

.layer-stats {
  display: flex;
  justify-content: space-around;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.demo-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 960px) {
  .demo-sections {
    grid-template-columns: 1fr;
  }
}

.section {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.query-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.product-input {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 0.9rem;
}

.query-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.query-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.query-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.query-result {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid var(--vp-c-brand);
}

.result-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-icon {
  font-size: 1.5rem;
}

.result-title {
  font-weight: 700;
  font-size: 1rem;
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.detail-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.detail-value {
  font-size: 0.9rem;
  font-weight: 600;
}

.detail-value.source.local {
  color: #22c55e;
}

.detail-value.source.redis {
  color: #f59e0b;
}

.detail-value.source.database {
  color: #ef4444;
}

.detail-value.source.notfound {
  color: #94a3b8;
}

.query-flow {
  margin-top: 1rem;
}

.flow-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: grid;
  grid-template-columns: 1fr 1fr 60px;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.flow-step.hit {
  background: #f0fdf4;
}

.flow-step.miss {
  background: #fef2f2;
}

.step-level {
  font-weight: 600;
}

.step-result {
  text-align: center;
}

.step-time {
  text-align: right;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.metric-value.local {
  color: #22c55e;
}

.metric-value.redis {
  color: #f59e0b;
}

.metric-value.db {
  color: #ef4444;
}

.hit-rate-display {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.rate-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.rate-value {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
}

.rate-bar {
  height: 12px;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.rate-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  transition: width 0.5s;
}

.rate-target {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.cache-stats-detail {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
}

.stats-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.stat-label {
  color: var(--vp-c-text-2);
}

.stat-value {
  font-weight: 600;
}

.features {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.feature-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.code-preview {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.code-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.6;
}
</style>
