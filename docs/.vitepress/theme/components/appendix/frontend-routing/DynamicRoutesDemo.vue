<template>
  <div class="dynamic-routes-demo">
    <div class="demo-header">
      <h4>动态路由与参数</h4>
      <p class="demo-desc">探索动态参数、正则匹配和可选参数的使用方式</p>
    </div>

    <div class="demo-content">
      <!-- 路由参数类型说明 -->
      <div class="param-types">
        <div
          v-for="type in paramTypes"
          :key="type.name"
          :class="['param-card', { active: selectedType === type.name }]"
          @click="selectedType = type.name"
        >
          <div class="param-pattern">{{ type.pattern }}</div>
          <div class="param-name">{{ type.name }}</div>
          <div class="param-desc">{{ type.description }}</div>
        </div>
      </div>

      <!-- 参数解析演示 -->
      <div class="parsing-demo">
        <div class="demo-section">
          <h5>测试路径</h5>
          <div class="input-group">
            <span class="input-prefix">/</span>
            <input
              v-model="testPath"
              type="text"
              placeholder="user/123/profile"
              class="demo-input"
              @input="parsePath"
            >
          </div>
        </div>

        <div class="demo-section">
          <h5>匹配结果</h5>
          <div v-if="parseResult" class="result-box">
            <div class="result-row">
              <span class="result-label">匹配路由:</span>
              <code class="result-value">{{ parseResult.route }}</code>
            </div>
            <div v-if="Object.keys(parseResult.params).length" class="result-params">
              <span class="result-label">提取参数:</span>
              <div class="params-grid">
                <div
                  v-for="(value, key) in parseResult.params"
                  :key="key"
                  class="param-tag"
                >
                  <span class="param-key">{{ key }}</span>
                  <span class="param-eq">=</span>
                  <span class="param-val">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-result">
            输入路径查看解析结果
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedType = ref('required')
const testPath = ref('user/123/profile')

const paramTypes = [
  {
    name: 'required',
    pattern: ':id',
    description: '必填参数，URL中必须有对应的值',
    example: '/user/123'
  },
  {
    name: 'optional',
    pattern: ':id?',
    description: '可选参数，可以省略',
    example: '/user 或 /user/123'
  },
  {
    name: 'multiple',
    pattern: ':id+',
    description: '一个或多个，至少有一个值',
    example: '/files/a 或 /files/a/b/c'
  },
  {
    name: 'zeroOrMore',
    pattern: ':id*',
    description: '零个或多个，可以没有',
    example: '/tags 或 /tags/vue/router'
  }
]

// 模拟的路由配置
const routePatterns = [
  { pattern: '/user/:id', name: 'UserDetail' },
  { pattern: '/user/:id/profile', name: 'UserProfile' },
  { pattern: '/user/:id/:tab', name: 'UserTab' },
  { pattern: '/products/:category/:id', name: 'ProductDetail' },
  { pattern: '/search/:keyword?', name: 'Search' },
  { pattern: '/files/:path*', name: 'FileBrowser' }
]

const parsePath = () => {
  const path = testPath.value.trim()
  if (!path) return null

  // 简化的匹配逻辑
  for (const route of routePatterns) {
    const match = matchRoute(route.pattern, path)
    if (match) {
      return {
        route: route.pattern,
        params: match
      }
    }
  }

  return null
}

const matchRoute = (pattern, path) => {
  // 将 :param 转换为正则
  const regexPattern = pattern
    .replace(/:([^/]+)\*/g, '(.*)') // :path* → (.*)
    .replace(/:([^/]+)\?/g, '([^/]*)') // :keyword? → ([^/]*)
    .replace(/:([^/]+)/g, '([^/]+)') // :id → ([^/]+)

  const regex = new RegExp(`^${regexPattern}$`)
  const match = path.match(regex)

  if (!match) return null

  // 提取参数名
  const paramNames = []
  const paramRegex = /:([^/]+)/g
  let paramMatch
  while ((paramMatch = paramRegex.exec(pattern)) !== null) {
    paramNames.push(paramMatch[1].replace(/[?*+]$/, ''))
  }

  // 构建参数对象
  const params = {}
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1]
  })

  return params
}

const parseResult = computed(() => parsePath())

// 初始化
parsePath()
</script>

<style scoped>
.dynamic-routes-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
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

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.param-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.param-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.param-card:hover {
  border-color: var(--vp-c-brand);
}

.param-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.param-pattern {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
}

.param-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.param-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.parsing-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.demo-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.demo-section h5 {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.input-group {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.input-prefix {
  padding: 10px 8px 10px 12px;
  color: var(--vp-c-text-3);
  font-family: monospace;
  font-size: 14px;
}

.demo-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 12px 10px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
  outline: none;
  font-family: monospace;
}

.result-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  min-width: 60px;
}

.result-value {
  font-size: 13px;
  color: var(--vp-c-text-1);
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
}

.result-params {
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.params-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.param-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--vp-c-brand-soft);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.param-key {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.param-eq {
  color: var(--vp-c-text-3);
}

.param-val {
  color: var(--vp-c-text-1);
}

.no-result {
  text-align: center;
  padding: 32px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

@media (max-width: 768px) {
  .param-types {
    grid-template-columns: 1fr;
  }

  .parsing-demo {
    grid-template-columns: 1fr;
  }
}
</style>
