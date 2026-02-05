<template>
  <div class="route-matching-demo">
    <div class="demo-header">
      <h4>路由匹配机制</h4>
      <p class="demo-desc">输入URL路径，查看路由是如何匹配和解析参数的</p>
    </div>

    <div class="demo-container">
      <div class="input-section">
        <div class="input-group">
          <label>测试路径</label>
          <div class="path-input-wrapper">
            <span class="path-prefix">/</span>
            <input
              v-model="testPath"
              type="text"
              placeholder="user/123/posts"
              class="path-input"
              @keyup.enter="testMatch"
            >
          </div>
        </div>
        <button class="test-btn" @click="testMatch">
          <span class="btn-icon">▶</span>
          测试匹配
        </button>
      </div>

      <div class="routes-section">
        <div class="section-header">
          <h5>已定义的路由</h5>
          <span class="route-count">{{ routes.length }} 条</span>
        </div>

        <div class="routes-list">
          <div
            v-for="route in routes"
            :key="route.path"
            :class="['route-item', { matched: matchedRoute?.path === route.path }]"
          >
            <div class="route-path">
              <span class="route-pattern">{{ route.path }}</span>
              <span v-if="route.hasParams" class="param-badge">含参数</span>
            </div>
            <div class="route-name">{{ route.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="matchResult" class="result-section">
      <div class="result-header">
        <h5>匹配结果</h5>
        <span :class="['match-status', matchResult.matched ? 'success' : 'fail']">
          {{ matchResult.matched ? '匹配成功' : '无匹配路由' }}
        </span>
      </div>

      <div v-if="matchResult.matched" class="match-details">
        <div class="detail-item">
          <span class="detail-label">匹配路由</span>
          <span class="detail-value code">{{ matchResult.route.path }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">路由名称</span>
          <span class="detail-value">{{ matchResult.route.name }}</span>
        </div>

        <div v-if="Object.keys(matchResult.params).length > 0" class="params-section">
          <div class="detail-label">路径参数</div>
          <div class="params-list">
            <div
              v-for="(value, key) in matchResult.params"
              :key="key"
              class="param-item"
            >
              <span class="param-key">{{ key }}</span>
              <span class="param-arrow">→</span>
              <span class="param-value">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-match">
        <div class="no-match-icon">❓</div>
        <p>路径 "{{ testPath }}" 未匹配到任何路由</p>
        <ul class="suggestions">
          <li>检查路径拼写是否正确</li>
          <li>确认路径是否以斜杠开头</li>
          <li>查看是否缺少必要的参数</li>
        </ul>
      </div>
    </div>

    <div class="tips-section">
      <h5>路由匹配规则速查</h5>
      <div class="tips-grid">
        <div class="tip-item">
          <code>/user</code>
          <span>精确匹配 /user</span>
        </div>
        <div class="tip-item">
          <code>/user/:id</code>
          <span>匹配 /user/123，id=123</span>
        </div>
        <div class="tip-item">
          <code>/user/:id?</code>
          <span>id可选，匹配 /user 或 /user/123</span>
        </div>
        <div class="tip-item">
          <code>/user/:id+</code>
          <span>匹配一个或多个，如 /user/1/2</span>
        </div>
        <div class="tip-item">
          <code>/user/:id*</code>
          <span>匹配零个或多个</span>
        </div>
        <div class="tip-item">
          <code>/user(.*)*</code>
          <span>通配符，匹配任意路径</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const testPath = ref('user/123/posts')
const matchResult = ref(null)
const matchedRoute = ref(null)

const routes = [
  { path: '/', name: '首页', hasParams: false },
  { path: '/user', name: '用户列表', hasParams: false },
  { path: '/user/:id', name: '用户详情', hasParams: true },
  { path: '/user/:id/posts', name: '用户文章', hasParams: true },
  { path: '/products', name: '产品列表', hasParams: false },
  { path: '/products/:category/:id', name: '产品详情', hasParams: true },
  { path: '/search', name: '搜索结果', hasParams: false },
  { path: '/:path(.*)*', name: '404页面', hasParams: true }
]

const parsePath = (path) => {
  // 移除开头的斜杠
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

    // 通配符匹配
    if (routePart === '(.*)*' || routePart === ':path(.*)*') {
      params['pathMatch'] = testParts.slice(i).join('/')
      return { matched: true, params }
    }

    // 动态参数匹配
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

    // 精确匹配
    if (routePart !== testPart) {
      return { matched: false, params: {} }
    }
  }

  // 检查是否有剩余的测试路径部分（除非是通配符路由）
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

// 自动测试初始路径
testMatch()
</script>

<style scoped>
.route-matching-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.demo-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.input-section {
  background: var(--vp-c-bg);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.path-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.path-prefix {
  padding: 10px 8px 10px 12px;
  color: var(--vp-c-text-3);
  font-family: monospace;
  font-size: 14px;
}

.path-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 12px 10px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
  outline: none;
}

.test-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.test-btn:hover {
  background: var(--vp-c-brand-dark);
}

.btn-icon {
  font-size: 10px;
}

.routes-section {
  background: var(--vp-c-bg);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h5 {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.route-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 10px;
}

.routes-list {
  max-height: 280px;
  overflow-y: auto;
}

.route-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.route-item:hover {
  background: var(--vp-c-bg-soft);
}

.route-item.matched {
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
}

.route-path {
  display: flex;
  align-items: center;
  gap: 8px;
}

.route-pattern {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.param-badge {
  font-size: 10px;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

.route-name {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.result-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  margin-top: 20px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.result-header h5 {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.match-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.match-status.success {
  background: rgba(39, 201, 63, 0.15);
  color: #27c93f;
}

.match-status.fail {
  background: rgba(255, 95, 86, 0.15);
  color: #ff5f56;
}

.match-details {
  display: grid;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.detail-label {
  width: 80px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.detail-value {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.detail-value.code {
  font-family: 'Monaco', 'Menlo', monospace;
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
}

.params-section {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.params-list {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.param-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--vp-c-bg-soft);
  padding: 6px 12px;
  border-radius: 6px;
}

.param-key {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: var(--vp-c-brand);
}

.param-arrow {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.param-value {
  font-size: 13px;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.no-match {
  text-align: center;
  padding: 32px;
}

.no-match-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.no-match p {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.suggestions {
  text-align: left;
  display: inline-block;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.suggestions li {
  margin: 4px 0;
}

.tips-section {
  margin-top: 20px;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.tips-section h5 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.tip-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tip-item code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: var(--vp-c-brand);
  background: transparent;
  padding: 0;
}

.tip-item span:last-child {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .detail-label {
    width: auto;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
