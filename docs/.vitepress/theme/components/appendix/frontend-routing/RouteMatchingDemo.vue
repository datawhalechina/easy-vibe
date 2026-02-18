<template>
  <div class="route-matching-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">路由匹配</span>
      <span class="subtitle">URL如何找到对应组件</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">查字典</span>：输入一个词，字典会帮你找到对应的解释。路由匹配也是这样，浏览器根据URL路径，在路由配置中找到最匹配的那一项，然后渲染对应组件。
    </div>

    <div class="demo-content">
      <div class="input-section">
        <h5>📍 测试路径</h5>
        <div class="input-group">
          <span class="input-prefix">/</span>
          <input
            v-model="testPath"
            type="text"
            placeholder="user/123"
            class="path-input"
            @input="testMatch"
          >
        </div>
        <div class="hint-text">
          试试：user/123 或 products/electronics/456
        </div>
      </div>

      <div class="result-section">
        <h5>🎯 匹配结果</h5>
        <div
          v-if="matchResult && matchResult.matched"
          class="match-success"
        >
          <div class="success-icon">
            ✅
          </div>
          <div class="result-details">
            <div class="result-row">
              <span class="label">匹配路由:</span>
              <code class="value">{{ matchResult.route.path }}</code>
            </div>
            <div
              v-if="Object.keys(matchResult.params).length"
              class="params-box"
            >
              <span class="label">提取参数:</span>
              <div class="params-list">
                <span
                  v-for="(value, key) in matchResult.params"
                  :key="key"
                  class="param-tag"
                >
                  {{ key }} = {{ value }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="match-fail"
        >
          <div class="fail-icon">
            ❌
          </div>
          <div>未找到匹配的路由</div>
        </div>
      </div>
    </div>

    <div class="routes-list">
      <h5>📋 已定义的路由</h5>
      <div class="routes-grid">
        <div
          v-for="route in routes"
          :key="route.path"
          :class="['route-item', { matched: matchedRoute?.path === route.path }]"
        >
          <code class="route-path">{{ route.path }}</code>
          <span class="route-name">{{ route.name }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>匹配规则：</strong>路由按定义顺序匹配，先定义的优先。动态参数（:id）可以匹配任意值，但精确匹配优先级更高。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const testPath = ref('user/123')
const matchResult = ref(null)
const matchedRoute = ref(null)

const routes = [
  { path: '/', name: '首页', hasParams: false },
  { path: '/user', name: '用户列表', hasParams: false },
  { path: '/user/:id', name: '用户详情', hasParams: true },
  { path: '/user/:id/posts', name: '用户文章', hasParams: true },
  { path: '/products/:category/:id', name: '产品详情', hasParams: true },
  { path: '/:path(.*)*', name: '404页面', hasParams: true }
]

const parsePath = (path) => {
  const cleanPath = path.replace(/^\//, '')
  return cleanPath.split('/').filter(Boolean)
}

const matchPath = (routePath, testPath) => {
  const routeParts = parsePath(routePath)
  const testParts = parsePath(testPath)
  const params = {}

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i]
    const testPart = testParts[i]

    if (routePart === '(.*)*' || routePart === ':path(.*)*') {
      params['pathMatch'] = testParts.slice(i).join('/')
      return { matched: true, params }
    }

    if (routePart.startsWith(':')) {
      const paramName = routePart.replace(/^:/, '').replace(/\?$/, '')
      const isOptional = routePart.endsWith('?')

      if (testPart !== undefined) {
        params[paramName] = testPart
        continue
      } else if (isOptional) {
        continue
      } else {
        return { matched: false, params: {} }
      }
    }

    if (routePart !== testPart) {
      return { matched: false, params: {} }
    }
  }

  if (testParts.length > routeParts.length) {
    const lastRoutePart = routeParts[routeParts.length - 1]
    if (!lastRoutePart || (!lastRoutePart.includes('*') && !lastRoutePart.endsWith('+'))) {
      return { matched: false, params: {} }
    }
  }

  return { matched: true, params }
}

const testMatch = () => {
  if (!testPath.value.trim()) {
    matchResult.value = { matched: false }
    matchedRoute.value = null
    return
  }

  let foundMatch = false

  for (const route of routes) {
    const { matched, params } = matchPath(route.path, testPath.value)

    if (matched) {
      matchResult.value = {
        matched: true,
        route,
        params
      }
      matchedRoute.value = route
      foundMatch = true
      break
    }
  }

  if (!foundMatch) {
    matchResult.value = { matched: false }
    matchedRoute.value = null
  }
}

testMatch()
</script>

<style scoped>
.route-matching-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
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

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-section, .result-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.input-group {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.input-prefix {
  padding: 0.5rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
  font-size: 0.85rem;
}

.path-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  outline: none;
}

.hint-text {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.match-success {
  display: flex;
  gap: 0.75rem;
}

.success-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.result-details {
  flex: 1;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  min-width: 60px;
}

.value {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.params-box {
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.params-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.param-tag {
  background: var(--vp-c-brand-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: monospace;
  color: var(--vp-c-brand);
}

.match-fail {
  text-align: center;
  padding: 0.75rem;
  color: var(--vp-c-text-3);
}

.fail-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.routes-list {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
}

.route-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.route-item.matched {
  border-color: var(--vp-c-brand);
  background: rgba(66, 184, 131, 0.1);
}

.route-path {
  font-size: 0.75rem;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.route-name {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }
}
</style>
