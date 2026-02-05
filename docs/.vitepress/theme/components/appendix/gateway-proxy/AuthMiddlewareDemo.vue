<!--
  AuthMiddlewareDemo.vue
  认证中间件 - JWT/OAuth/签名验证
-->
<template>
  <div class="auth-middleware-demo">
    <div class="header">
      <div class="title">🔐 认证中间件：谁可以进大门？</div>
      <div class="subtitle">想象成写字楼门禁——检查工牌、验证身份，没权限的人进不来</div>
    </div>

    <div class="auth-tabs">
      <button
        v-for="method in authMethods"
        :key="method.id"
        :class="['auth-tab', { active: currentAuth === method.id }]"
        @click="currentAuth = method.id"
      >
        <span class="tab-icon">{{ method.icon }}</span>
        <span class="tab-name">{{ method.name }}</span>
      </button>
    </div>

    <div class="auth-flow">
      <div class="flow-title">{{ currentAuthData.title }}</div>

      <div class="flow-diagram">
        <div class="flow-step" v-for="(step, index) in currentAuthData.steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-actor">{{ step.actor }}</div>
            <div class="step-action">{{ step.action }}</div>
            <div class="step-arrow" v-if="index < currentAuthData.steps.length - 1">↓</div>
          </div>
        </div>
      </div>

      <div class="token-display" v-if="currentAuth === 'jwt'">
        <div class="token-header">🔑 JWT Token 结构（Base64编码）</div>
        <div class="token-parts">
          <div class="token-part header">
            <div class="part-label">HEADER</div>
            <div class="part-content">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</div>
            <div class="part-decoded">{ "alg": "HS256", "typ": "JWT" }</div>
          </div>
          <div class="token-separator">.</div>
          <div class="token-part payload">
            <div class="part-label">PAYLOAD</div>
            <div class="part-content">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</div>
            <div class="part-decoded">{ "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }</div>
          </div>
          <div class="token-separator">.</div>
          <div class="token-part signature">
            <div class="part-label">SIGNATURE</div>
            <div class="part-content">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</div>
            <div class="part-decoded">HMACSHA256(base64Url(header) + "." + base64Url(payload), secret)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="implementation-comparison">
      <div class="section-title">🛠️ 三种方案实现对比</div>

      <table class="comparison-table">
        <thead>
          <tr>
            <th>对比维度</th>
            <th>Session + Cookie</th>
            <th>JWT</th>
            <th>OAuth2.0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="dim">存储位置</td>
            <td>服务端存储 Session，客户端存 Cookie</td>
            <td>客户端存储 Token，服务端无状态</td>
            <td>授权服务器存储，客户端存 Access Token</td>
          </tr>
          <tr>
            <td class="dim">扩展性</td>
            <td>❌ 需要共享 Session，扩展复杂</td>
            <td>✅ 无状态，易于水平扩展</td>
            <td>✅ 分布式架构，支持大规模系统</td>
          </tr>
          <tr>
            <td class="dim">安全性</td>
            <td>⚠️ Cookie 可能被窃取，需要 CSRF 防护</td>
            <td>⚠️ Token 泄露风险，需 HTTPS + 短期有效</td>
            <td>✅ 行业最佳实践，支持多种安全机制</td>
          </tr>
          <tr>
            <td class="dim">实现复杂度</td>
            <td>🟢 简单，开箱即用</td>
            <td>🟡 中等，需要 Token 管理</td>
            <td>🔴 复杂，需要授权服务器</td>
          </tr>
          <tr>
            <td class="dim">适用场景</td>
            <td>传统 Web 应用、后台管理系统</td>
            <td>SPA、移动端 API、微服务</td>
            <td>第三方登录、开放平台、SSO</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="security-tips">
      <div class="tips-title">🔒 网关层认证最佳实践</div>
      <div class="tips-list">
        <div class="tip-item">
          <div class="tip-icon">1</div>
          <div class="tip-content">
            <div class="tip-heading">统一在网关层验证</div>
            <div class="tip-desc">不要在每个微服务里重复写认证逻辑，统一在网关层校验 JWT 或 Session</div>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">2</div>
          <div class="tip-content">
            <div class="tip-heading">HTTPS 强制</div>
            <div class="tip-desc">网关层强制 HTTPS，防止 Token 在传输过程中被窃取（中间人攻击）</div>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">3</div>
          <div class="tip-content">
            <div class="tip-heading">Token 过期策略</div>
            <div class="tip-desc">Access Token 短期有效（15分钟），配合 Refresh Token 实现无感知续期</div>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">4</div>
          <div class="tip-content">
            <div class="tip-heading">黑名单机制</div>
            <div class="tip-desc">用户登出或 Token 泄露时，将 Token 加入黑名单（Redis 存储）</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentAuth = ref('jwt')

const authMethods = [
  {
    id: 'jwt',
    icon: '🔑',
    name: 'JWT Token'
  },
  {
    id: 'oauth',
    icon: '🔐',
    name: 'OAuth 2.0'
  },
  {
    id: 'signature',
    icon: '✍️',
    name: '签名验证'
  }
]

const authData = {
  jwt: {
    title: 'JWT (JSON Web Token) 认证流程',
    steps: [
      { actor: '用户', action: '输入用户名密码，点击登录' },
      { actor: '网关/Nginx', action: '转发登录请求到认证服务' },
      { actor: '认证服务', action: '验证密码，生成 JWT Token（包含 Header、Payload、Signature）' },
      { actor: '用户/客户端', action: '保存 Token（LocalStorage 或 Cookie）' },
      { actor: '后续请求', action: '在 HTTP Header 中携带: Authorization: Bearer <Token>' },
      { actor: '网关/Nginx', action: '校验 Token 签名和过期时间，通过后转发请求' },
      { actor: '后端服务', action: '从 Token 中解析用户信息，处理业务逻辑' }
    ]
  },
  oauth: {
    title: 'OAuth 2.0 第三方登录流程（以微信登录为例）',
    steps: [
      { actor: '用户', action: '点击"微信登录"按钮' },
      { actor: '我们的应用', action: '重定向到微信授权页面，携带 client_id 和回调地址' },
      { actor: '微信/授权服务器', action: '展示授权页面，询问用户是否同意' },
      { actor: '用户', action: '确认授权（或扫码登录）' },
      { actor: '微信/授权服务器', action: '重定向回我们的应用，携带授权码 Code' },
      { actor: '我们的后端', action: '用 Code 换取 Access Token（对客户端不可见）' },
      { actor: '我们的后端', action: '用 Access Token 请求微信用户信息服务' },
      { actor: '微信/资源服务器', action: '返回用户基本信息（openid, nickname, avatar）' },
      { actor: '我们的后端', action: '创建/关联本地用户，生成自己的 Session/JWT' },
      { actor: '用户', action: '登录成功，进入应用首页' }
    ]
  },
  signature: {
    title: 'API 签名验证流程（常用于开放平台和支付接口）',
    steps: [
      { actor: '开发者', action: '在开放平台申请 AppKey 和 AppSecret' },
      { actor: '发起请求前', action: '将所有参数按字典序排序，拼接成字符串' },
      { actor: '客户端', action: '用 AppSecret 对字符串进行 HMAC-SHA256 签名' },
      { actor: '请求参数', action: '携带 AppKey、签名(Sign)、时间戳(Timestamp)、随机数(Nonce)' },
      { actor: '网关/Nginx', action: '提取 AppKey，查询对应的 AppSecret' },
      { actor: '网关/Nginx', action: '用同样算法计算签名，对比是否一致' },
      { actor: '网关/Nginx', action: '检查时间戳（防重放攻击，通常5分钟内有效）' },
      { actor: '网关/Nginx', action: '检查随机数是否已使用（Redis 存储防重放）' },
      { actor: '验证通过', action: '转发请求到后端服务' },
      { actor: '验证失败', action: '返回 401/403，不暴露签名算法细节' }
    ]
  }
}

const currentAuthData = computed(() => authData[currentAuth.value])

// 实现对比数据
const comparisonData = [
  {
    dimension: '存储位置',
    session: '服务端存储 Session，客户端存 Cookie',
    jwt: '客户端存储 Token，服务端无状态',
    oauth: '授权服务器存储，客户端存 Access Token'
  },
  {
    dimension: '扩展性',
    session: '❌ 需要共享 Session，扩展复杂',
    jwt: '✅ 无状态，易于水平扩展',
    oauth: '✅ 分布式架构，支持大规模系统'
  },
  {
    dimension: '安全性',
    session: '⚠️ Cookie 可能被窃取，需要 CSRF 防护',
    jwt: '⚠️ Token 泄露风险，需 HTTPS + 短期有效',
    oauth: '✅ 行业最佳实践，支持多种安全机制'
  },
  {
    dimension: '实现复杂度',
    session: '🟢 简单，开箱即用',
    jwt: '🟡 中等，需要 Token 管理',
    oauth: '🔴 复杂，需要授权服务器'
  },
  {
    dimension: '适用场景',
    session: '传统 Web 应用、后台管理系统',
    jwt: 'SPA、移动端 API、微服务',
    oauth: '第三方登录、开放平台、SSO'
  }
]

// Nginx 配置示例
const nginxConfigs = [
  {
    id: 'basic',
    name: '基础限流',
    config: `# 定义限流区域
# $binary_remote_addr: 按 IP 限流
# zone=mylimit:10m: 区域名称和大小
# rate=10r/s: 每秒最多10个请求
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    listen 80;
    server_name api.example.com;

    location / {
        # 应用限流
        # burst=20: 桶容量，允许突发20个请求
        # nodelay: 不延迟处理突发请求
        limit_req zone=mylimit burst=20 nodelay;

        proxy_pass http://backend;
    }
}`,
    explanation: [
      'limit_req_zone: 在 http 块中定义限流区域',
      '$binary_remote_addr: 使用二进制 IP 地址作为限流键（省内存）',
      'zone=mylimit:10m: 区域名称 mylimit，分配 10MB 内存',
      'rate=10r/s: 每秒允许 10 个请求（漏桶算法）',
      'burst=20: 桶的容量为 20，允许一定程度的突发流量',
      'nodelay: 不延迟处理突发请求（立即处理或拒绝）'
    ]
  },
  {
    id: 'connection',
    name: '连接数限制',
    config: `# 限制并发连接数
# zone=addr:10m: 区域名称为 addr，大小 10MB
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    listen 80;
    server_name download.example.com;

    location / {
        # 每个 IP 最多 5 个并发连接
        limit_conn addr 5;

        # 同时应用限流：每秒 1 个请求
        limit_req zone=mylimit rate=1r/s;

        proxy_pass http://fileserver;
    }
}`,
    explanation: [
      'limit_conn_zone: 定义连接数限制区域',
      'limit_conn addr 5: 每个 IP 最多同时保持 5 个连接',
      '适用于文件下载、视频流媒体等长连接场景',
      '可以和 limit_req 同时使用（双重保护）',
      '超过连接数限制时返回 503 Service Unavailable'
    ]
  },
  {
    id: 'whiteblack',
    name: '黑白名单',
    config: `# 白名单 + 限流组合
# 公司内网 IP 不限流
geo $limit {
    default 1;
    10.0.0.0/8 0;     # 内网网段
    172.16.0.0/12 0;  # 内网网段
    192.168.0.0/16 0; # 内网网段
}

map $limit $limit_key {
    0 "";
    1 $binary_remote_addr;
}

# 只有外网 IP 会触发限流
limit_req_zone $limit_key zone=sensitive:10m rate=1r/s;

server {
    listen 80;
    server_name api.example.com;

    location /admin {
        # 管理后台严格限流
        limit_req zone=sensitive burst=5 nodelay;

        # 拒绝特定 IP
        deny 1.2.3.4;
        deny 5.6.7.8;

        proxy_pass http://backend;
    }
}`,
    explanation: [
      'geo 模块：根据 IP 地址设置变量值',
      '内网 IP 设置为 0，外网 IP 默认为 1',
      'map 模块：将 0 映射为空字符串（不限流），1 映射为 IP 地址',
      '只有外网 IP 会被限流，内网访问畅通无阻',
      'deny 指令：直接拒绝特定 IP 访问',
      '适用于管理后台、敏感接口的安全防护'
    ]
  }
]

const currentNginxConfig = computed(() => nginxConfigs.find(c => c.id === currentConfig.value))
</script>

<style scoped>
.auth-middleware-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.auth-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.auth-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.auth-tab:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.auth-tab.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.tab-icon {
  font-size: 2rem;
}

.tab-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.auth-flow {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.step-actor {
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.step-action {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}

.step-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
}

.token-display {
  margin-top: 1.5rem;
  background: #1a1a2e;
  border-radius: 12px;
  padding: 1.5rem;
  color: #eaeaea;
}

.token-header {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

.token-parts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.token-part {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.75rem;
}

.part-label {
  font-weight: 700;
  font-size: 0.75rem;
  color: #ffd700;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.part-content {
  font-family: monospace;
  font-size: 0.8rem;
  color: #a78bfa;
  word-break: break-all;
  margin-bottom: 0.5rem;
}

.part-decoded {
  font-family: monospace;
  font-size: 0.75rem;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
}

.token-separator {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
}

.implementation-comparison {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.comparison-table th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.comparison-table td.dim {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  white-space: nowrap;
}

.security-tips {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
  border: 2px solid #22c55e;
  border-radius: 12px;
  padding: 1.5rem;
}

.tips-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #15803d;
  text-align: center;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #22c55e;
}

.tip-icon {
  width: 32px;
  height: 32px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-heading {
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.tip-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .auth-tabs {
    grid-template-columns: 1fr;
  }

  .flow-step {
    flex-direction: column;
    gap: 0.5rem;
  }

  .step-content {
    width: 100%;
  }

  .token-parts {
    font-size: 0.75rem;
  }

  .comparison-table {
    font-size: 0.75rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }
}
</style>
