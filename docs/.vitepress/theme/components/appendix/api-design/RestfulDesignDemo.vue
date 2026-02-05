<template>
  <div class="restful-design-demo">
    <div class="header">
      <div class="title">RESTful API 设计核心原则</div>
      <div class="subtitle">
        REST（Representational State Transfer）是一种架构风格，让接口设计像自然资源一样直观
      </div>
    </div>

    <div class="principles-grid">
      <div
        v-for="principle in principles"
        :key="principle.id"
        class="principle-card"
        :class="{ active: selectedPrinciple === principle.id }"
        @click="selectedPrinciple = principle.id"
      >
        <div class="principle-icon">{{ principle.icon }}</div>
        <div class="principle-name">{{ principle.name }}</div>
        <div class="principle-brief">{{ principle.brief }}</div>
      </div>
    </div>

    <div class="detail-panel">
      <div class="detail-header">
        <span class="detail-title">{{ activePrinciple.name }}</span>
        <span class="detail-tag">{{ activePrinciple.tag }}</span>
      </div>

      <div class="detail-content">
        <div class="explanation">
          <h4>核心概念</h4>
          <p>{{ activePrinciple.explanation }}</p>
        </div>

        <div class="comparison">
          <h4>对比示例</h4>
          <div class="code-comparison">
            <div class="code-block bad">
              <div class="code-label">传统方式（不推荐）</div>
              <pre><code>{{ activePrinciple.badExample }}</code></pre>
            </div>
            <div class="code-block good">
              <div class="code-label">RESTful 方式（推荐）</div>
              <pre><code>{{ activePrinciple.goodExample }}</code></pre>
            </div>
          </div>
        </div>

        <div class="tips">
          <h4>设计要点</h4>
          <ul>
            <li v-for="(tip, index) in activePrinciple.tips" :key="index">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const principles = [
  {
    id: 'resource',
    name: '资源导向',
    icon: '📦',
    brief: 'URL 表示资源，而非动作',
    tag: '核心原则',
    explanation: '将系统中的实体抽象为资源（Resource），每个资源对应唯一的 URL。资源是名词，而不是动词或动作。',
    badExample: `GET /getUserById?id=123
GET /deleteOrder?orderId=456
POST /createProduct`,
    goodExample: `GET /users/123
DELETE /orders/456
POST /products`,
    tips: [
      '使用名词复数形式（/users 而非 /user）',
      '避免在 URL 中出现动词（get、create、delete 等）',
      '资源层级用路径表示（/users/123/orders）',
      '资源名使用小写字母，多个单词用连字符（/order-items）'
    ]
  },
  {
    id: 'method',
    name: 'HTTP 方法',
    icon: '🎯',
    brief: '用 HTTP 方法表达操作语义',
    tag: '动作表达',
    explanation: '使用标准的 HTTP 方法（GET、POST、PUT、DELETE 等）来表示对资源的操作类型，让接口语义更加清晰。',
    badExample: `POST /users/query   // 查询用户
POST /users/create  // 创建用户
POST /users/update  // 更新用户
POST /users/delete  // 删除用户`,
    goodExample: `GET    /users      // 查询用户列表
POST   /users      // 创建用户
GET    /users/123 // 查询单个用户
PUT    /users/123 // 全量更新用户
PATCH  /users/123 // 部分更新用户
DELETE /users/123 // 删除用户`,
    tips: [
      'GET 用于获取资源，是幂等且安全的',
      'POST 用于创建资源，返回 201 和新资源 URI',
      'PUT 用于全量更新，替换整个资源',
      'PATCH 用于部分更新，只修改指定字段',
      'DELETE 用于删除资源，返回 204 或 200'
    ]
  },
  {
    id: 'stateless',
    name: '无状态',
    icon: '🔄',
    brief: '每个请求独立，服务端不保存会话',
    tag: '可扩展性',
    explanation: '服务端不保存客户端的上下文状态，每个请求都必须包含服务端处理该请求所需的全部信息。这让系统更容易水平扩展。',
    badExample: `// 服务端维护会话状态
POST /login
→ 服务端创建 session，返回 session_id cookie

GET /profile
→ 服务端根据 session_id 查找用户
→ 如果会话过期，需要重新登录`,
    goodExample: `// 无状态认证
POST /auth/token
→ 验证凭证，返回 JWT token

GET /profile
Authorization: Bearer <token>
→ 服务端验证 token，提取用户信息
→ 请求独立，可随时扩展到多台服务器`,
    tips: [
      '使用 JWT 或 API Key 进行无状态认证',
      '避免在服务端存储会话状态',
      '每个请求包含完整的认证信息',
      '便于负载均衡和水平扩展',
      '使用 Redis 等缓存共享必要的状态数据'
    ]
  },
  {
    id: 'representation',
    name: '统一表现',
    icon: '📋',
    brief: '使用标准数据格式',
    tag: '数据交换',
    explanation: '资源的表示（Representation）应该使用标准的数据格式，通常是 JSON。客户端可以通过 Accept 头部请求不同的表示格式。',
    badExample: `// 混合格式，字段不一致
GET /users
{
  "user_list": [...],
  "total_count": 100
}

GET /orders
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1
  }
}`,
    goodExample: `// 统一的响应结构
GET /users
{
  "code": 200,
  "message": "success",
  "data": {
    "items": [...],
    "pagination": {
      "total": 100,
      "page": 1,
      "page_size": 20
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`,
    tips: [
      '使用 JSON 作为默认数据格式',
      '统一的响应结构（code、message、data）',
      '支持字段过滤（fields=id,name,email）',
      '日期使用 ISO 8601 格式',
      '字段命名使用 camelCase 或 snake_case，保持一致'
    ]
  }
]

const selectedPrinciple = ref('resource')
const activePrinciple = computed(() =>
  principles.find(p => p.id === selectedPrinciple.value) || principles[0]
)
</script>

<style scoped>
.restful-design-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.principle-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.principle-card:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.5);
}

.principle-card.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.8);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.15);
}

.principle-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.principle-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.principle-brief {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.detail-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.detail-content h4 {
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 1rem 0 0.5rem;
}

.explanation p {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.code-block {
  border-radius: 6px;
  overflow: hidden;
}

.code-block.bad {
  border: 1px solid #ef4444;
}

.code-block.good {
  border: 1px solid #22c55e;
}

.code-label {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.code-block.bad .code-label {
  background: #ef4444;
}

.code-block.good .code-label {
  background: #22c55e;
}

.code-block pre {
  margin: 0;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  font-size: 0.8rem;
  line-height: 1.5;
  overflow-x: auto;
}

.tips ul {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
}

.tips li {
  margin: 0.4rem 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .principles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .code-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
