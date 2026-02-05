<!--
  SslTerminationDemo.vue
  SSL终结 - HTTPS卸载/证书管理
-->
<template>
  <div class="ssl-termination-demo">
    <div class="header">
      <div class="title">🔒 SSL 终结：HTTPS 流量的"解密官"</div>
      <div class="subtitle">想象成公司的前台接待——对外使用正式头衔（HTTPS），对内用内部称呼（HTTP），负责"翻译"身份</div>
    </div>

    <div class="ssl-flow">
      <div class="flow-title">🔐 HTTPS 流量解密流程</div>

      <div class="flow-diagram">
        <!-- 客户端 -->
        <div class="flow-node client">
          <div class="node-icon">👤</div>
          <div class="node-label">客户端 (浏览器)</div>
          <div class="node-detail">发起 HTTPS 请求</div>
        </div>

        <div class="flow-arrow encrypted">
          <div class="arrow-line"></div>
          <div class="arrow-label">
            <span class="lock-icon">🔒</span>
            <span>TLS 加密连接</span>
          </div>
          <div class="cert-info">
            <div class="cert-item"><span class="cert-label">证书:</span> *.example.com</div>
            <div class="cert-item"><span class="cert-label">算法:</span> TLS 1.3</div>
            <div class="cert-item"><span class="cert-label">加密:</span> AES-256-GCM</div>
          </div>
        </div>

        <!-- Nginx -->
        <div class="flow-node nginx">
          <div class="node-icon">🚪</div>
          <div class="node-label">Nginx (SSL 终结)</div>
          <div class="node-actions">
            <div class="action"><span class="action-icon">📜</span> 校验证书</div>
            <div class="action"><span class="action-icon">🔓</span> 解密流量</div>
            <div class="action"><span class="action-icon">📝</span> 添加 X-Forwarded-*</div>
          </div>
        </div>

        <div class="flow-arrow plain">
          <div class="arrow-line"></div>
          <div class="arrow-label">
            <span class="unlock-icon">🔓</span>
            <span>HTTP 明文</span>
          </div>
          <div class="headers-info">
            <div class="header-item">X-Forwarded-For: 203.0.113.42</div>
            <div class="header-item">X-Forwarded-Proto: https</div>
            <div class="header-item">X-Real-IP: 203.0.113.42</div>
          </div>
        </div>

        <!-- 后端服务 -->
        <div class="flow-node backend">
          <div class="node-icon">⚙️</div>
          <div class="node-label">后端服务集群</div>
          <div class="node-detail">专注于业务逻辑，无需处理 TLS</div>
        </div>
      </div>
    </div>

    <div class="cert-management">
      <div class="section-title">📜 SSL 证书管理</div>

      <div class="cert-tabs">
        <button
          v-for="tab in certTabs"
          :key="tab.id"
          :class="['cert-tab', { active: currentCertTab === tab.id }]"
          @click="currentCertTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="cert-content">
        <!-- 证书申请流程 -->
        <div v-if="currentCertTab === 'apply'" class="apply-flow">
          <div class="flow-steps">
            <div v-for="(step, index) in certSteps" :key="index" class="cert-step">
              <div class="step-badge">{{ index + 1 }}</div>
              <div class="step-content">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-desc">{{ step.desc }}</div>
                <div class="step-command" v-if="step.command">
                  <code>{{ step.command }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Nginx 配置 -->
        <div v-if="currentCertTab === 'config'" class="nginx-config">
          <pre class="config-block"><code>server {
    listen 443 ssl http2;
    server_name api.example.com;

    # SSL 证书配置
    ssl_certificate /etc/nginx/ssl/api.example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/api.example.com.key;

    # SSL 协议和密码套件
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # SSL 会话缓存
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/nginx/ssl/chain.crt;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # 安全响应头
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name api.example.com;
    return 301 https://$server_name$request_uri;
}</code></pre>
        </div>

        <!-- 最佳实践 -->
        <div v-if="currentCertTab === 'bestpractice'" class="best-practices">
          <div class="practices-grid">
            <div v-for="practice in bestPractices" :key="practice.id" class="practice-card">
              <div class="practice-header">
                <span class="practice-icon">{{ practice.icon }}</span>
                <span class="practice-title">{{ practice.title }}</span>
              </div>
              <div class="practice-content">{{ practice.content }}</div>
              <div class="practice-code" v-if="practice.code">
                <code>{{ practice.code }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="benefits-section">
      <div class="section-title">✨ SSL 终结的核心优势</div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🚀</div>
          <div class="benefit-title">性能提升</div>
          <div class="benefit-desc">TLS 握手和加密解密是 CPU 密集型操作，集中在 Nginx 处理，后端服务专注业务逻辑，整体吞吐量提升 2-5 倍</div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">🔧</div>
          <div class="benefit-title">简化运维</div>
          <div class="benefit-desc">证书统一管理，只需在 Nginx 配置一次，无需在每个后端服务重复配置，证书续期、更换一键完成</div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">🛡️</div>
          <div class="benefit-title">集中安全</div>
          <div class="benefit-desc">SSL/TLS 配置统一管控，强制使用最新协议版本和密码套件，统一添加安全响应头（HSTS、CSP 等）</div>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">📊</div>
          <div class="benefit-title">统一监控</div>
          <div class="benefit-desc">所有 HTTPS 流量经过 Nginx，可以统一记录访问日志、分析 SSL 握手性能、监控证书有效期，便于审计和排障</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 证书管理标签
const certTabs = [
  { id: 'apply', name: '证书申请' },
  { id: 'config', name: 'Nginx 配置' },
  { id: 'bestpractice', name: '最佳实践' }
]

const currentCertTab = ref('apply')

// 证书申请步骤
const certSteps = [
  {
    title: '生成私钥',
    desc: '使用 OpenSSL 生成 RSA 私钥，这是证书的基础',
    command: 'openssl genrsa -out private.key 2048'
  },
  {
    title: '创建 CSR',
    desc: '生成证书签名请求，包含域名和组织信息',
    command: 'openssl req -new -key private.key -out csr.pem'
  },
  {
    title: '域名验证',
    desc: 'CA 机构验证域名所有权（DNS 记录或 HTTP 文件）',
    command: '# 添加 DNS TXT 记录 或 上传验证文件到 /.well-known/'
  },
  {
    title: '签发证书',
    desc: '验证通过后，CA 签发证书文件',
    command: '# 下载 certificate.crt 和 chain.crt'
  },
  {
    title: '部署配置',
    desc: '将证书配置到 Nginx 并测试',
    command: 'nginx -t && systemctl reload nginx'
  }
]

// 最佳实践
const bestPractices = [
  {
    id: 'protocol',
    icon: '🔐',
    title: '使用 TLS 1.2+',
    content: '禁用 SSLv3、TLS 1.0/1.1 等老旧协议，仅启用 TLS 1.2 和 1.3',
    code: 'ssl_protocols TLSv1.2 TLSv1.3;'
  },
  {
    id: 'cipher',
    icon: '🛡️',
    title: '强密码套件',
    content: '禁用弱加密算法，优先使用 ECDHE 和 AES-GCM',
    code: 'ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;'
  },
  {
    id: 'hsts',
    icon: '🔒',
    title: 'HSTS 头部',
    content: '强制浏览器始终使用 HTTPS 访问，防止 SSL 剥离攻击',
    code: 'add_header Strict-Transport-Security "max-age=63072000" always;'
  },
  {
    id: 'ocsp',
    icon: '✅',
    title: 'OCSP Stapling',
    content: '启用 OCSP 装订，加速 SSL 握手并保护用户隐私',
    code: 'ssl_stapling on; ssl_stapling_verify on;'
  }
]
</script>

<style scoped>
.ssl-termination-demo {
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

.ssl-flow {
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
  gap: 1rem;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  text-align: center;
}

.flow-node.client {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.flow-node.nginx {
  border-color: #22c55e;
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
}

.flow-node.backend {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
}

.node-icon {
  font-size: 2rem;
}

.node-label {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.node-detail {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.node-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.action {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.action-icon {
  font-size: 0.9rem;
}

.flow-arrow {
  position: relative;
  padding: 0.5rem 0;
}

.arrow-line {
  height: 2px;
  background: var(--vp-c-divider);
  position: relative;
}

.arrow-line::after {
  content: '▼';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--vp-c-divider);
  font-size: 0.75rem;
}

.flow-arrow.encrypted .arrow-line {
  background: linear-gradient(90deg, #22c55e, #3b82f6);
  height: 3px;
}

.flow-arrow.encrypted .arrow-line::after {
  color: #22c55e;
}

.arrow-label {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-bg);
  padding: 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
}

.lock-icon {
  color: #22c55e;
}

.unlock-icon {
  color: #f59e0b;
}

.cert-info,
.headers-info {
  position: absolute;
  top: 15px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 0.7rem;
  font-family: monospace;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  z-index: 10;
}

.cert-info {
  left: 0;
}

.headers-info {
  right: 0;
}

.cert-item,
.header-item {
  margin: 0.15rem 0;
}

.cert-label {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.cert-management {
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

.cert-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.cert-tab {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.cert-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.cert-tab.active {
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.cert-content {
  min-height: 200px;
}

.apply-flow {
  padding: 1rem 0;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cert-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand);
}

.step-badge {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-command {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.nginx-config {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
}

.config-block {
  margin: 0;
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre;
}

.best-practices {
  padding: 1rem 0;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.practice-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.practice-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.practice-icon {
  font-size: 1.25rem;
}

.practice-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.practice-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.practice-code {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
}

.benefits-section {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.benefit-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.3s;
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.benefit-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.benefit-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .strategy-tabs {
    grid-template-columns: 1fr;
  }

  .cert-tabs {
    flex-direction: column;
    gap: 0.25rem;
  }

  .pool-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .servers-grid {
    grid-template-columns: 1fr;
  }

  .flow-node {
    padding: 0.75rem;
  }

  .cert-info,
  .headers-info {
    position: static;
    margin-top: 0.5rem;
  }
}
</style>
