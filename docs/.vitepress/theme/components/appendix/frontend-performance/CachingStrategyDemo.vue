<!--
  CachingStrategyDemo.vue
  缓存策略演示
-->
<template>
  <div class="caching-demo">
    <div class="header">
      <div class="title">缓存策略：速度与更新的平衡</div>
      <div class="subtitle">对比不同缓存策略的效果</div>
    </div>

    <div class="strategy-selector">
      <button
        v-for="strategy in strategies"
        :key="strategy.name"
        @click="selectStrategy(strategy)"
        :class="[
          'strategy-btn',
          { active: selectedStrategy.name === strategy.name }
        ]"
      >
        <span class="strategy-icon">{{ strategy.icon }}</span>
        <span class="strategy-name">{{ strategy.name }}</span>
      </button>
    </div>

    <div class="demo-area">
      <div class="browser-window">
        <div class="browser-header">
          <div class="browser-controls">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="browser-url">{{ selectedStrategy.url }}</div>
        </div>

        <div class="browser-content">
          <div class="loading-overlay" v-if="isLoading">
            <div class="spinner"></div>
            <div class="loading-text">加载中... ({{ loadingProgress }}%)</div>
          </div>

          <div class="page-content" v-else>
            <div class="page-hero">
              <h2>{{ selectedStrategy.pageTitle }}</h2>
            </div>
            <div class="page-body">
              <div
                class="resource-item"
                v-for="(resource, index) in selectedStrategy.resources"
                :key="index"
              >
                <div class="resource-icon">{{ resource.icon }}</div>
                <div class="resource-info">
                  <div class="resource-name">{{ resource.name }}</div>
                  <div
                    class="resource-status"
                    :class="resource.cached ? 'cached' : 'network'"
                  >
                    {{ resource.cached ? '✓ 来自缓存' : '↓ 从服务器下载' }}
                  </div>
                </div>
                <div class="resource-size">{{ resource.size }}</div>
                <div class="resource-time">{{ resource.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="metrics-panel">
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">⚡</span>
            <span class="metric-title">加载时间</span>
          </div>
          <div class="metric-value" :class="selectedStrategy.performanceClass">
            {{ selectedStrategy.loadTime }}
          </div>
          <div
            class="metric-change"
            :class="{ positive: selectedStrategy.isFast }"
          >
            {{ selectedStrategy.compared }}
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">💾</span>
            <span class="metric-title">缓存命中</span>
          </div>
          <div class="metric-value">{{ selectedStrategy.cacheHit }}%</div>
          <div class="metric-bar">
            <div
              class="metric-fill"
              :style="{ width: selectedStrategy.cacheHit + '%' }"
            ></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-icon">🌐</span>
            <span class="metric-title">网络请求</span>
          </div>
          <div class="metric-value">
            {{ selectedStrategy.requests }}
          </div>
          <div class="metric-desc">
            {{ selectedStrategy.requestDesc }}
          </div>
        </div>
      </div>
    </div>

    <div class="strategy-info">
      <h3>{{ selectedStrategy.name }} 说明</h3>
      <p>{{ selectedStrategy.description }}</p>
      <div class="code-example">
        <div class="code-header">配置示例</div>
        <pre><code>{{ selectedStrategy.code }}</code></pre>
      </div>
    </div>

    <div class="comparison-table">
      <h4>策略对比</h4>
      <table>
        <thead>
          <tr>
            <th>策略</th>
            <th>速度</th>
            <th>更新难度</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="strategy in strategies"
            :key="strategy.name"
            :class="{ highlighted: selectedStrategy.name === strategy.name }"
          >
            <td>
              <strong>{{ strategy.name }}</strong>
            </td>
            <td>{{ strategy.speed }}</td>
            <td>{{ strategy.updateDifficulty }}</td>
            <td>{{ strategy.useCase }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedStrategy = ref({})
const isLoading = ref(false)
const loadingProgress = ref(0)

const strategies = [
  {
    name: '无缓存',
    icon: '🚫',
    url: 'https://example.com/',
    pageTitle: '页面加载缓慢',
    resources: [
      {
        icon: '📄',
        name: 'index.html',
        size: '5 KB',
        time: '200ms',
        cached: false
      },
      {
        icon: '🎨',
        name: 'style.css',
        size: '50 KB',
        time: '300ms',
        cached: false
      },
      {
        icon: '⚙️',
        name: 'app.js',
        size: '200 KB',
        time: '800ms',
        cached: false
      },
      {
        icon: '🖼️',
        name: 'image.jpg',
        size: '150 KB',
        time: '500ms',
        cached: false
      }
    ],
    loadTime: '1.8s',
    performanceClass: 'poor',
    isFast: false,
    compared: '基准',
    cacheHit: 0,
    requests: 4,
    requestDesc: '所有资源都从网络下载',
    description:
      '不使用任何缓存，每次访问都要重新下载所有资源。速度最慢，但内容总是最新的。',
    code: '# 禁用缓存\nCache-Control: no-cache',
    speed: '慢',
    updateDifficulty: '容易',
    useCase: '频繁更新的内容'
  },
  {
    name: '传统缓存',
    icon: '💾',
    url: 'https://example.com/',
    pageTitle: '页面加载较快',
    resources: [
      {
        icon: '📄',
        name: 'index.html',
        size: '5 KB',
        time: '50ms',
        cached: true
      },
      {
        icon: '🎨',
        name: 'style.css',
        size: '50 KB',
        time: '30ms',
        cached: true
      },
      {
        icon: '⚙️',
        name: 'app.js',
        size: '200 KB',
        time: '20ms',
        cached: true
      },
      {
        icon: '🖼️',
        name: 'image.jpg',
        size: '150 KB',
        time: '25ms',
        cached: true
      }
    ],
    loadTime: '125ms',
    performanceClass: 'good',
    isFast: true,
    compared: '快 93%',
    cacheHit: 100,
    requests: 0,
    requestDesc: '所有资源都来自缓存',
    description:
      '设置固定的过期时间（如 1 年）。速度极快，但更新内容需要用户清除缓存或强制刷新。',
    code: '# Nginx 配置\nlocation ~* \\.(js|css|jpg|png)$ {\n  expires: 1y;\n  add_header: Cache-Control: public;\n}',
    speed: '极快',
    updateDifficulty: '困难',
    useCase: '文件名带哈希的静态资源'
  },
  {
    name: '协商缓存',
    icon: '🤝',
    url: 'https://example.com/',
    pageTitle: '页面加载快',
    resources: [
      {
        icon: '📄',
        name: 'index.html',
        size: '5 KB',
        time: '50ms',
        cached: true
      },
      {
        icon: '🎨',
        name: 'style.css',
        size: '50 KB',
        time: '30ms',
        cached: true
      },
      {
        icon: '⚙️',
        name: 'app.js',
        size: '200 KB',
        time: '350ms',
        cached: false
      },
      {
        icon: '🖼️',
        name: 'image.jpg',
        size: '150 KB',
        time: '25ms',
        cached: true
      }
    ],
    loadTime: '455ms',
    performanceClass: 'medium',
    isFast: true,
    compared: '快 75%',
    cacheHit: 75,
    requests: 1,
    requestDesc: '仅下载已更新的资源',
    description:
      '使用 ETag 或 Last-Modified 进行验证。资源未改变时返回 304，资源改变时下载新内容。',
    code: '# Nginx 配置\nlocation / {\n  etag on;\n  add_header Cache-Control: must-revalidate;\n}',
    speed: '快',
    updateDifficulty: '容易',
    useCase: 'HTML 文件和 API 响应'
  },
  {
    name: 'Service Worker',
    icon: '🔧',
    url: 'https://example.com/',
    pageTitle: '页面极速加载',
    resources: [
      {
        icon: '📄',
        name: 'index.html',
        size: '5 KB',
        time: '10ms',
        cached: true
      },
      {
        icon: '🎨',
        name: 'style.css',
        size: '50 KB',
        time: '5ms',
        cached: true
      },
      { icon: '⚙️', name: 'app.js', size: '200 KB', time: '5ms', cached: true },
      {
        icon: '🖼️',
        name: 'image.jpg',
        size: '150 KB',
        time: '5ms',
        cached: true
      }
    ],
    loadTime: '25ms',
    performanceClass: 'excellent',
    isFast: true,
    compared: '快 98%',
    cacheHit: 100,
    requests: 0,
    requestDesc: '完全离线可用',
    description:
      'Service Worker 拦截网络请求，从缓存中返回资源。可实现离线访问和即时加载。',
    code: "// 注册 Service Worker\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js');\n}\n\n// sw.js\ncaches.open('v1').then(cache => {\n  cache.addAll(['/', '/style.css', '/app.js']);\n});",
    speed: '极快',
    updateDifficulty: '中等',
    useCase: 'PWA 应用和关键资源'
  }
]

function selectStrategy(strategy) {
  selectedStrategy.value = strategy
  simulateLoading()
}

function simulateLoading() {
  isLoading.value = true
  loadingProgress.value = 0

  const interval = setInterval(() => {
    loadingProgress.value += 10
    if (loadingProgress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
  }, 100)
}

onMounted(() => {
  selectStrategy(strategies[1]) // 默认选中传统缓存
})
</script>

<style scoped>
.caching-demo {
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
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.strategy-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.strategy-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.8rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1);
}

.strategy-btn:hover {
  border-color: var(--vp-c-brand);
}

.strategy-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.strategy-icon {
  font-size: 1.2rem;
}

.demo-area {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .demo-area {
    grid-template-columns: 1fr;
  }
}

.browser-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.browser-header {
  background: var(--vp-c-bg-soft);
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.browser-controls {
  display: flex;
  gap: 0.4rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red {
  background: #ef4444;
}

.dot.yellow {
  background: #f59e0b;
}

.dot.green {
  background: #22c55e;
}

.browser-url {
  flex: 1;
  background: var(--vp-c-bg);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.browser-content {
  position: relative;
  min-height: 350px;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.page-content {
  padding: 1.5rem;
}

.page-hero {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand), #8b5cf6);
  border-radius: 8px;
  color: #fff;
}

.page-hero h2 {
  margin: 0;
  font-size: 1.5rem;
}

.page-body {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  transition: all 0.3s;
}

.resource-item:hover {
  background: var(--vp-c-divider);
}

.resource-icon {
  font-size: 1.5rem;
}

.resource-info {
  flex: 1;
}

.resource-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.resource-status {
  font-size: 0.75rem;
}

.resource-status.cached {
  color: #22c55e;
}

.resource-status.network {
  color: var(--vp-c-brand);
}

.resource-size {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.resource-time {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 60px;
  text-align: right;
}

.metrics-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.metric-icon {
  font-size: 1.2rem;
}

.metric-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.metric-value {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
}

.metric-value.good {
  color: #22c55e;
}

.metric-value.medium {
  color: #f59e0b;
}

.metric-value.poor {
  color: #ef4444;
}

.metric-value.excellent {
  color: #8b5cf6;
}

.metric-change {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.metric-change.positive {
  color: #22c55e;
  font-weight: 600;
}

.metric-bar {
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.metric-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #14b8a6);
  transition: width 0.3s;
}

.metric-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.3rem;
}

.strategy-info {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.strategy-info h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.strategy-info > p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.code-example {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  padding: 0.6rem 1rem;
  background: var(--vp-c-divider);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

code {
  display: block;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  overflow-x: auto;
  line-height: 1.5;
}

.comparison-table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
}

.comparison-table h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

thead {
  background: var(--vp-c-bg-soft);
}

th {
  padding: 0.8rem;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

td {
  padding: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

tr:last-child td {
  border-bottom: none;
}

tr.highlighted {
  background: rgba(59, 130, 246, 0.05);
}
</style>
