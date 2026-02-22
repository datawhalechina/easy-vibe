<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🎨</span>
      <span class="title">四种 API 风格对比</span>
    </div>

    <div class="tabs">
      <button
        v-for="style in styles"
        :key="style.id"
        :class="['tab', { active: active === style.id }]"
        @click="active = style.id"
      >
        {{ style.icon }} {{ style.name }}
      </button>
    </div>

    <div class="content">
      <div class="style-header">
        <h4>{{ currentStyle.name }}</h4>
        <span class="badge">{{ currentStyle.badge }}</span>
      </div>

      <p class="desc">{{ currentStyle.desc }}</p>

      <div class="example-section">
        <div class="example-label">示例：获取用户信息</div>
        <pre class="code-block"><code>{{ currentStyle.example }}</code></pre>
      </div>

      <div class="features">
        <div class="features-title">核心特点</div>
        <div class="features-grid">
          <div
            v-for="(f, i) in currentStyle.features"
            :key="i"
            class="feature-item"
          >
            <span class="check">✓</span>
            <span>{{ f }}</span>
          </div>
        </div>
      </div>

      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">适用场景</span>
          <span class="meta-value">{{ currentStyle.scenarios }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">官方地址</span>
          <a :href="currentStyle.official" target="_blank" class="meta-link">{{
            currentStyle.official
          }}</a>
        </div>
      </div>
    </div>

    <div class="compare-section">
      <div class="compare-title">📊 风格速览对比</div>
      <div class="compare-table">
        <div class="compare-row head">
          <div class="cell">特性</div>
          <div class="cell">RPC</div>
          <div class="cell highlight">REST</div>
          <div class="cell">GraphQL</div>
          <div class="cell">gRPC</div>
        </div>
        <div class="compare-row">
          <div class="cell">核心理念</div>
          <div class="cell">面向过程</div>
          <div class="cell highlight">面向资源</div>
          <div class="cell">面向数据</div>
          <div class="cell">面向方法</div>
        </div>
        <div class="compare-row">
          <div class="cell">URL 风格</div>
          <div class="cell">动词为主</div>
          <div class="cell highlight">名词为主</div>
          <div class="cell">单一端点</div>
          <div class="cell">不依赖URL</div>
        </div>
        <div class="compare-row">
          <div class="cell">学习曲线</div>
          <div class="cell low">低</div>
          <div class="cell">中</div>
          <div class="cell">中</div>
          <div class="cell high">高</div>
        </div>
        <div class="compare-row">
          <div class="cell">性能</div>
          <div class="cell">一般</div>
          <div class="cell">一般</div>
          <div class="cell">较好</div>
          <div class="cell best">优秀</div>
        </div>
        <div class="compare-row">
          <div class="cell">使用占比</div>
          <div class="cell">~30%</div>
          <div class="cell highlight">~50%</div>
          <div class="cell">~15%</div>
          <div class="cell">~5%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('rest')

const styles = [
  {
    id: 'rpc',
    icon: '📞',
    name: 'RPC',
    badge: '最传统',
    desc: 'Remote Procedure Call，远程过程调用。像调用本地方法一样调用远程服务，面向过程，简单直接。超过 50% 的内部 API 采用这种风格。',
    example: `GET /getUserInfo?id=123
POST /createUser
POST /deleteOrder
GET /queryUserList`,
    features: [
      'URL 命名往往是动词',
      'HTTP 方法基本只用 GET/POST',
      '设计简单，几乎无约束',
      '需要详细文档说明'
    ],
    scenarios: '内部 API、性能敏感场景、难以抽象为资源的业务',
    official: '无官方规范（概念性风格）'
  },
  {
    id: 'rest',
    icon: '🌐',
    name: 'REST',
    badge: '最常用',
    desc: 'Representational State Transfer，表述性状态转移。由 Roy Fielding 于 2000 年在其博士论文中提出。面向资源，用 URL 标识资源，用 HTTP 方法操作资源。',
    example: `GET    /users           # 获取用户列表
GET    /users/123       # 获取单个用户
POST   /users           # 创建用户
PUT    /users/123       # 全量更新
PATCH  /users/123       # 部分更新
DELETE /users/123       # 删除用户`,
    features: [
      'URL 是名词，不是动词',
      '使用 HTTP 方法表达操作',
      '无状态，请求包含所有信息',
      '可缓存，支持分层系统'
    ],
    scenarios: '公开 API、CRUD 操作、资源边界清晰的业务',
    official: 'https://restfulapi.net/'
  },
  {
    id: 'graphql',
    icon: '📊',
    name: 'GraphQL',
    badge: '最灵活',
    desc: '由 Facebook 于 2015 年开源。一种查询语言，客户端可以精确指定需要的数据字段，避免过度获取或获取不足。',
    example: `query {
  user(id: "123") {
    name
    email
    orders {
      id
      total
    }
  }
}`,
    features: [
      '单一端点（/graphql）',
      '客户端决定返回字段',
      'Schema 即文档',
      '一次请求获取多资源'
    ],
    scenarios: '客户端需求多变、数据关系复杂、移动端 App',
    official: 'https://graphql.org/'
  },
  {
    id: 'grpc',
    icon: '⚡',
    name: 'gRPC',
    badge: '最高效',
    desc: '由 Google 于 2016 年开源。高性能 RPC 框架，使用 Protocol Buffers 序列化，基于 HTTP/2，支持双向流通信。',
    example: `service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
}

message User {
  string id = 1;
  string name = 2;
}`,
    features: [
      '二进制传输，性能极高',
      '强类型，代码自动生成',
      '基于 HTTP/2，双向流',
      '浏览器支持差'
    ],
    scenarios: '微服务内部通信、高性能场景、强类型需求',
    official: 'https://grpc.io/'
  }
]

const currentStyle = computed(() => {
  return styles.find((s) => s.id === active.value) || styles[1]
})
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
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 20px;
}

.style-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.style-header h4 {
  margin: 0;
  font-size: 18px;
}

.badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: color-mix(in srgb, var(--vp-c-brand) 15%, transparent);
  color: var(--vp-c-brand);
}

.desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.example-section {
  margin-bottom: 16px;
}

.example-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 14px;
  border-radius: 8px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
}

.features {
  margin-bottom: 16px;
}

.features-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.check {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.meta {
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
}

.meta-label {
  color: var(--vp-c-text-3);
  min-width: 70px;
  flex-shrink: 0;
}

.meta-value {
  color: var(--vp-c-text-2);
}

.meta-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  word-break: break-all;
}

.meta-link:hover {
  text-decoration: underline;
}

.compare-section {
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  padding: 16px 20px;
}

.compare-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.compare-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.compare-row {
  display: grid;
  grid-template-columns: 1fr repeat(4, 1fr);
}

.compare-row:nth-child(odd) {
  background: var(--vp-c-bg-soft);
}

.compare-row:nth-child(even) {
  background: var(--vp-c-bg);
}

.compare-row.head {
  background: var(--vp-c-bg-alt);
}

.cell {
  padding: 10px 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
  border-right: 1px solid var(--vp-c-divider);
}

.cell:last-child {
  border-right: none;
}

.head .cell {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cell:first-child {
  text-align: left;
  font-weight: 500;
  color: var(--vp-c-text-1);
  padding-left: 12px;
}

.cell.highlight {
  background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.cell.low {
  color: #22c55e;
}

.cell.high {
  color: #f59e0b;
}

.cell.best {
  color: #22c55e;
  font-weight: 600;
}

@media (max-width: 640px) {
  .compare-row {
    grid-template-columns: 70px repeat(4, 1fr);
  }
  .cell {
    padding: 8px 4px;
    font-size: 11px;
  }
}
</style>
