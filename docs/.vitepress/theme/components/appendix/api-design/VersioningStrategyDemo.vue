<!--
  VersioningStrategyDemo.vue - API 版本控制策略演示
  展示 4 种版本控制策略的对比
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🔢</span>
      <span class="title">API 版本控制：向后兼容的艺术</span>
    </div>

    <div class="content">
      <div class="strategies">
        <div
          v-for="strategy in strategies"
          :key="strategy.id"
          class="strategy-card"
          :class="{ active: selectedStrategy === strategy.id }"
          @click="selectedStrategy = strategy.id"
        >
          <div class="strategy-header">
            <div class="strategy-name">
              {{ strategy.name }}
            </div>
            <div class="strategy-stars">
              <span
                v-for="n in strategy.stars"
                :key="n"
                class="star"
              >⭐</span>
            </div>
          </div>
          <div class="strategy-example">
            {{ strategy.example }}
          </div>
        </div>
      </div>

      <div
        v-if="currentStrategy"
        class="strategy-detail"
      >
        <div class="detail-header">
          <div class="detail-title">
            {{ currentStrategy.name }}
          </div>
          <div
            class="detail-recommendation"
            :class="currentStrategy.level"
          >
            {{ currentStrategy.level === 'high' ? '强烈推荐' : currentStrategy.level === 'medium' ? '可以使用' : '不推荐' }}
          </div>
        </div>

        <div class="detail-sections">
          <div class="detail-section">
            <h4>✅ 优点</h4>
            <ul>
              <li
                v-for="(pro, idx) in currentStrategy.pros"
                :key="idx"
              >
                {{ pro }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h4>❌ 缺点</h4>
            <ul>
              <li
                v-for="(con, idx) in currentStrategy.cons"
                :key="idx"
              >
                {{ con }}
              </li>
            </ul>
          </div>
        </div>

        <div class="detail-section example">
          <h4>💻 实现示例</h4>
          <div class="code-box">
            <div class="code-header">
              Request
            </div>
            <pre><code>{{ currentStrategy.codeExample.request }}</code></pre>
            <div class="code-header">
              Response Headers
            </div>
            <pre><code>{{ currentStrategy.codeExample.response }}</code></pre>
          </div>
        </div>

        <div class="detail-section tips">
          <h4>💡 最佳实践</h4>
          <ul>
            <li
              v-for="(tip, idx) in currentStrategy.tips"
              :key="idx"
            >
              {{ tip }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const strategies = [
  {
    id: 'url-path',
    name: 'URL Path 版本',
    example: '/v1/users',
    stars: 4,
    level: 'high',
    pros: [
      '最直观，一目了然看到版本号',
      '易于缓存和控制权限',
      '文档清晰，社区主流做法',
      '支持不同版本的并行部署'
    ],
    cons: [
      'URL 会变化，不符合 REST 资源唯一性',
      '需要配置路由规则'
    ],
    codeExample: {
      request: `GET /v1/users HTTP/1.1
Host: api.example.com`,
      response: `HTTP/1.1 200 OK
Content-Type: application/json
X-API-Version: v1`
    },
    tips: [
      '版本号放在路径开头：`/v1/users`',
      '使用语义化版本号（Semantic Versioning）',
      '废弃版本返回 Sunset 头部',
      '客户端升级提示可通过响应头提示'
    ]
  },
  {
    id: 'header',
    name: 'Header 版本',
    example: 'API-Version: v1',
    stars: 2,
    level: 'medium',
    pros: [
      'URL 保持简洁不变',
      '版本控制不影响路由'
    ],
    cons: [
      '不直观，需要在工具里配置 Header',
      '缓存策略复杂',
      '文档不够清晰',
      '调试不便'
    ],
    codeExample: {
      request: `GET /users HTTP/1.1
Host: api.example.com
API-Version: v1`,
      response: `HTTP/1.1 200 OK
Content-Type: application/json
X-API-Version: v1`
    },
    tips: [
      '使用自定义 Header：`API-Version` 或 `Accept`',
      '需在 API Gateway 中统一处理',
      '适合内部系统或对 API 规范要求高的场景'
    ]
  },
  {
    id: 'content-negotiation',
    name: '内容协商',
    example: 'Accept: application/vnd.api.v1+json',
    stars: 2,
    level: 'medium',
    pros: [
      '符合 HTTP 标准',
      'URL 完全不变'
    ],
    cons: [
      '复杂，理解成本高',
      '开发者容易用错',
      '缓存和代理支持不佳'
    ],
    codeExample: {
      request: `GET /users HTTP/1.1
Host: api.example.com
Accept: application/vnd.api.v1+json`,
      response: `HTTP/1.1 200 OK
Content-Type: application/vnd.api.v1+json`
    },
    tips: [
      '使用 Vendor MIME 类型：`application/vnd.{company}.{resource}.v{version}+json`',
      '需要 API Gateway 或框架支持内容协商',
      'GitHub API 使用此策略'
    ]
  },
  {
    id: 'query-param',
    name: 'Query 参数',
    example: '/users?version=v1',
    stars: 1,
    level: 'low',
    pros: [
      '实现简单'
    ],
    cons: [
      '不专业，容易忽视',
      '缓存麻烦（不同参数视为不同资源）',
      'URL 混乱'
    ],
    codeExample: {
      request: `GET /users?version=v1 HTTP/1.1
Host: api.example.com`,
      response: `HTTP/1.1 200 OK
Content-Type: application/json`
    },
    tips: [
      '仅用于快速原型或内部工具',
      '生产环境不推荐使用'
    ]
  }
]

const selectedStrategy = ref('url-path')
const currentStrategy = computed(() =>
  strategies.find(s => s.id === selectedStrategy.value)
)
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 16px 20px;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 24px;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

.content {
  padding: 24px;
}

.strategies {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.strategy-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.strategy-card:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.5);
  transform: translateY(-2px);
}

.strategy-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.15);
}

.strategy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.strategy-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.strategy-stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 12px;
}

.strategy-example {
  font-family: monospace;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 8px;
}

.strategy-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-weight: 700;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.detail-recommendation {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.detail-recommendation.high {
  background: #dcfce7;
  color: #16a34a;
}

.detail-recommendation.medium {
  background: #fef3c7;
  color: #d97706;
}

.detail-recommendation.low {
  background: #fee2e2;
  color: #dc2626;
}

.detail-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
}

.detail-section {
  padding: 16px;
}

.detail-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.detail-section ul {
  margin: 0;
  padding-left: 20px;
}

.detail-section li {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 6px 0;
}

.detail-section.example {
  grid-column: 1 / -1;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.code-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.code-header {
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-box pre {
  margin: 0;
  padding: 12px;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-box code {
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.detail-section.tips {
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
}

@media (max-width: 768px) {
  .strategies {
    grid-template-columns: 1fr;
  }

  .detail-sections {
    grid-template-columns: 1fr;
  }
}
</style>
