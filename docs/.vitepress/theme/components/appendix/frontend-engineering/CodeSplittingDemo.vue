<!--
  CodeSplittingDemo.vue
  代码分割演示

  用途：
  展示如何通过代码分割实现按需加载，优化首屏性能。
-->
<template>
  <div class="code-splitting-demo">
    <div class="demo-header">
      <h3>✂️ 代码分割演示</h3>
      <p>按需加载，提升首屏速度</p>
    </div>

    <div class="demo-content">
      <!-- 左侧：路由配置 -->
      <div class="routes-panel">
        <div class="panel-title">🚦 路由配置</div>
        <div class="routes-list">
          <div
            v-for="route in routes"
            :key="route.path"
            class="route-item"
            :class="{ active: currentRoute === route.path, loaded: route.loaded }"
            @click="navigateTo(route)"
          >
            <div class="route-info">
              <div class="route-path">{{ route.path }}</div>
              <div class="route-name">{{ route.name }}</div>
            </div>

            <div class="route-load-info">
              <span v-if="route.loading" class="loading-badge">加载中...</span>
              <span v-else-if="route.loaded" class="loaded-badge">已缓存</span>
              <span v-else class="lazy-badge">按需加载</span>
            </div>

            <div class="route-size">
              {{ formatSize(route.size) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：加载可视化 -->
      <div class="load-panel">
        <div class="panel-title">📊 加载分析</div>

        <div class="load-visualization">
          <!-- 初始加载 -->
          <div class="load-section">
            <div class="section-header">
              <span class="section-icon">🚀</span>
              <span class="section-title">首屏加载</span>
              <span class="section-size">{{ formatSize(initialLoadSize) }}</span>
            </div>

            <div class="chunk-list">
              <div
                v-for="chunk in initialChunks"
                :key="chunk.name"
                class="chunk-item initial"
                :style="{ width: getChunkWidth(chunk.size) }"
              >
                <span class="chunk-name">{{ chunk.name }}</span>
                <span class="chunk-size">{{ formatSize(chunk.size) }}</span>
              </div>
            </div>
          </div>

          <!-- 按需加载 -->
          <div class="load-section">
            <div class="section-header">
              <span class="section-icon">📦</span>
              <span class="section-title">按需加载 (Lazy Loading)</span>
              <span class="section-size">{{ formatSize(lazyLoadSize) }}</span>
            </div>

            <div class="chunk-list">
              <div
                v-for="chunk in lazyChunks"
                :key="chunk.name"
                class="chunk-item lazy"
                :class="{ loaded: chunk.loaded }"
                :style="{ width: getChunkWidth(chunk.size) }"
                @click="loadChunk(chunk)"
              >
                <span class="chunk-status">{{ chunk.loaded ? '✓' : '○' }}</span>
                <span class="chunk-name">{{ chunk.name }}</span>
                <span class="chunk-size">{{ formatSize(chunk.size) }}</span>
              </div>
            </div>

            <p class="lazy-tip">💡 点击上方模块可模拟按需加载</p>
          </div>

          <!-- 优化效果 -->
          <div class="optimization-summary">
            <div class="summary-item">
              <span class="summary-label">未优化总大小</span>
              <span class="summary-value original">{{ formatSize(totalSize) }}</span>
            </div>

            <div class="summary-arrow">→</div>

            <div class="summary-item">
              <span class="summary-label">首屏加载</span>
              <span class="summary-value optimized">{{ formatSize(initialLoadSize) }}</span>
            </div>

            <div class="summary-item savings">
              <span class="summary-label">节省</span>
              <span class="summary-value">{{ savingsPercent }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>代码分割的核心思想：</strong>
        不是所有代码都需要在首屏加载。通过动态导入 `import()`，
        我们可以把非核心功能延迟到真正需要时再加载。
        这就像餐厅的点餐制——不是把所有菜一次性端上来，而是按需上菜。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模拟路由配置
const routes = ref([
  { path: '/', name: '首页', size: 45, loaded: true, loading: false },
  { path: '/about', name: '关于我们', size: 28, loaded: false, loading: false },
  { path: '/dashboard', name: '数据面板', size: 156, loaded: false, loading: false },
  { path: '/settings', name: '系统设置', size: 89, loaded: false, loading: false },
  { path: '/reports', name: '报表中心', size: 234, loaded: false, loading: false }
])

const currentRoute = ref('/')

// 模拟代码块
const initialChunks = ref([
  { name: 'runtime', size: 3 },
  { name: 'core', size: 42 }
])

const lazyChunks = ref([
  { name: 'about.chunk', size: 28, loaded: false },
  { name: 'dashboard.chunk', size: 156, loaded: false },
  { name: 'settings.chunk', size: 89, loaded: false },
  { name: 'reports.chunk', size: 234, loaded: false }
])

// 计算属性
const initialLoadSize = computed(() =>
  initialChunks.value.reduce((sum, c) => sum + c.size, 0)
)

const lazyLoadSize = computed(() =>
  lazyChunks.value.reduce((sum, c) => sum + c.size, 0)
)

const totalSize = computed(() => initialLoadSize.value + lazyLoadSize.value)

const savingsPercent = computed(() => {
  const saved = totalSize.value - initialLoadSize.value
  return Math.round((saved / totalSize.value) * 100)
})

// 方法
const formatSize = (size) => {
  if (size > 1024) return (size / 1024).toFixed(1) + ' MB'
  return size + ' KB'
}

const getChunkWidth = (size) => {
  const maxSize = Math.max(...initialChunks.value.map(c => c.size), ...lazyChunks.value.map(c => c.size))
  const percent = (size / maxSize) * 100
  return `${Math.max(percent, 20)}%`
}

const navigateTo = (route) => {
  currentRoute.value = route.path

  if (!route.loaded && !route.loading) {
    route.loading = true
    // 模拟加载延迟
    setTimeout(() => {
      route.loaded = true
      route.loading = false
      // 同步更新 chunk 状态
      const chunkName = route.path.slice(1) || 'index'
      const chunk = lazyChunks.value.find(c => c.name.includes(chunkName))
      if (chunk) chunk.loaded = true
    }, 800)
  }
}

const loadChunk = (chunk) => {
  if (chunk.loaded) return
  chunk.loaded = true
}

const selectFile = (file) => {
  // 简化处理
}
</script>

<style scoped>
.code-splitting-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
}

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }
}

.routes-panel,
.load-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.panel-title {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.routes-list {
  max-height: 280px;
  overflow-y: auto;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.route-item:last-child {
  border-bottom: none;
}

.route-item:hover {
  background: var(--vp-c-bg-soft);
}

.route-item.active {
  background: rgba(100, 108, 255, 0.1);
  border-left: 3px solid #646cff;
}

.route-item.loaded .route-path {
  color: #22c55e;
}

.route-info {
  flex: 1;
  min-width: 0;
}

.route-path {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.route-name {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.route-load-info {
  display: flex;
  align-items: center;
}

.loading-badge,
.loaded-badge,
.lazy-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  white-space: nowrap;
}

.loading-badge {
  background: #3b82f6;
  color: white;
  animation: pulse 1.5s infinite;
}

.loaded-badge {
  background: #22c55e;
  color: white;
}

.lazy-badge {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.route-size {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
  min-width: 50px;
  text-align: right;
}

.load-visualization {
  padding: 1rem;
}

.load-section {
  margin-bottom: 1.25rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.section-icon {
  font-size: 1rem;
}

.section-title {
  flex: 1;
  font-weight: 500;
  font-size: 0.85rem;
}

.section-size {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.chunk-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.chunk-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.chunk-item.initial {
  background: rgba(100, 108, 255, 0.15);
  border: 1px solid rgba(100, 108, 255, 0.3);
}

.chunk-item.lazy {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  cursor: pointer;
}

.chunk-item.lazy:hover {
  background: var(--vp-c-bg-alt);
}

.chunk-item.lazy.loaded {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-style: solid;
}

.chunk-status {
  font-size: 0.75rem;
  width: 16px;
  text-align: center;
}

.chunk-name {
  flex: 1;
  font-family: monospace;
}

.chunk-size {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.lazy-tip {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

.optimization-summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.optimization-summary h4 {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.stat-item {
  text-align: center;
  padding: 0.6rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.stat-value.original {
  color: var(--vp-c-text-2);
  text-decoration: line-through;
  font-size: 0.9rem;
}

.stat-value.optimized {
  color: #22c55e;
}

.stat-value.savings {
  color: var(--vp-c-brand);
}

.stat-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .route-item {
    flex-wrap: wrap;
  }

  .route-size {
    width: 100%;
    text-align: left;
    margin-top: 0.25rem;
  }
}
</style>
