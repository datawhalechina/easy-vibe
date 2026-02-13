<template>
  <div class="cache-architecture-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">缓存架构</span>
      <span class="subtitle">数据访问的"高速公路系统"</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">图书馆</span>找书：如果书桌上已经有你要的书（缓存），直接拿就行；
      如果没有，就得去书架（数据库）找。缓存就是这样一张"书桌"，让常用数据触手可及。
    </div>

    <div class="architecture-flow">
      <div class="flow-layer user">
        <div class="layer-label">用户请求</div>
        <div class="request-icon">👤</div>
      </div>

      <div class="arrow">↓</div>

      <div class="flow-layer cache" :class="{ active: currentLayer === 'cache' }">
        <div class="layer-label">缓存层 (Cache)</div>
        <div class="cache-box">
          <div class="cache-icon">⚡</div>
          <div class="cache-stats">
            <div>命中率: {{ hitRate }}%</div>
            <div>响应时间: ~1ms</div>
          </div>
        </div>
      </div>

      <div class="arrow">
        ↓ <span v-if="showMiss" class="miss-text">未命中</span>
      </div>

      <div
        class="flow-layer database"
        :class="{ active: currentLayer === 'database' }"
      >
        <div class="layer-label">数据库层 (Database)</div>
        <div class="database-box">
          <div class="database-icon">🗄️</div>
          <div class="database-stats">
            <div>响应时间: ~50ms</div>
            <div>持久化存储</div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison">
      <div class="comparison-title">访问速度对比</div>
      <div class="speed-bars">
        <div class="speed-item">
          <div class="label">缓存命中</div>
          <div class="bar-container">
            <div class="bar fast" :style="{ width: '5%' }"></div>
          </div>
          <div class="time">~1ms</div>
        </div>
        <div class="speed-item">
          <div class="label">数据库查询</div>
          <div class="bar-container">
            <div class="bar slow" :style="{ width: '100%' }"></div>
          </div>
          <div class="time">~50ms</div>
        </div>
      </div>
      <div class="conclusion">
        缓存命中时，响应速度提升 <strong>{{ speedup }}x</strong>
      </div>
    </div>

    <div class="interactive-demo">
      <button class="demo-btn" @click="simulateRequest">模拟请求</button>
      <div class="demo-result" v-if="lastResult">
        <span :class="{ hit: lastResult.hit, miss: !lastResult.hit }">
          {{ lastResult.hit ? '✅ 缓存命中' : '❌ 缓存未命中，访问数据库' }}
        </span>
        <span class="response-time">{{ lastResult.time }}ms</span>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>缓存就像内存和数据库之间的"高速缓冲区"，用空间换时间，把热点数据放在更快的地方。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentLayer = ref('cache')
const showMiss = ref(false)
const lastResult = ref(null)
const hitRate = ref(75)

const speedup = computed(() => Math.round(50 / 1))

const simulateRequest = () => {
  const hit = Math.random() * 100 < hitRate.value
  lastResult.value = {
    hit,
    time: hit ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 20) + 40
  }

  currentLayer.value = 'cache'
  showMiss.value = false

  if (!hit) {
    setTimeout(() => {
      showMiss.value = true
      currentLayer.value = 'database'
    }, 300)
  }
}
</script>

<style scoped>
.cache-architecture-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.architecture-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.flow-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s;
}

.flow-layer.active {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
}

.layer-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cache-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 2px solid #f59e0b;
}

.cache-icon {
  font-size: 2rem;
}

.cache-stats {
  font-size: 0.85rem;
  line-height: 1.6;
}

.database-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 2px solid #3b82f6;
}

.database-icon {
  font-size: 2rem;
}

.database-stats {
  font-size: 0.85rem;
  line-height: 1.6;
}

.arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  position: relative;
}

.miss-text {
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #ef4444;
  white-space: nowrap;
}

.comparison {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.comparison-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.speed-bars {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.speed-item {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  align-items: center;
  gap: 1rem;
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.bar-container {
  height: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s;
}

.bar.fast {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.bar.slow {
  background: linear-gradient(90deg, #f59e0b, #ef4444);
}

.time {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.conclusion {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.interactive-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.demo-btn {
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-result {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
}

.hit {
  color: #22c55e;
  font-weight: 600;
}

.miss {
  color: #ef4444;
  font-weight: 600;
}

.response-time {
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
