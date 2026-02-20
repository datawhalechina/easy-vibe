<template>
  <div class="application-layer-demo">
    <div class="demo-header">
      <span class="icon">🌍</span>
      <span class="title">应用层：为你服务的各种协议</span>
      <span class="subtitle">HTTP、DNS、DHCP 等协议如何工作</span>
    </div>

    <div class="protocol-gallery">
      <div
        v-for="protocol in protocols"
        :key="protocol.id"
        :class="['protocol-card', { active: activeProtocol === protocol.id }]"
        @click="activeProtocol = protocol.id"
      >
        <div class="card-icon">{{ protocol.icon }}</div>
        <div class="card-name">{{ protocol.name }}</div>
        <div class="card-desc">{{ protocol.desc }}</div>
      </div>
    </div>

    <!-- 协议详情 -->
    <div class="protocol-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentProtocol.icon }}</span>
        <span class="detail-title">{{ currentProtocol.name }} 协议</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">作用</div>
          <div class="section-text">{{ currentProtocol.purpose }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">工作原理</div>
          <div class="section-steps">
            <div v-for="(step, index) in currentProtocol.steps" :key="index" class="step-item">
              <span class="step-num">{{ index + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">日常应用</div>
          <div class="app-list">
            <div v-for="(app, index) in currentProtocol.apps" :key="index" class="app-tag">
              {{ app.icon }} {{ app.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- HTTP 请求响应示例 -->
    <div v-if="activeProtocol === 'http'" class="http-example">
      <div class="example-title">HTTP 请求/响应示例</div>
      <div class="example-content">
        <div class="request-response">
          <div class="request-box">
            <div class="box-header">📤 请求 (Request)</div>
            <div class="box-body">
              <div class="line method">GET /index.html HTTP/1.1</div>
              <div class="line header">Host: www.example.com</div>
              <div class="line header">User-Agent: Mozilla/5.0</div>
              <div class="line header">Accept: text/html</div>
            </div>
          </div>

          <div class="arrow">→</div>

          <div class="response-box">
            <div class="box-header">📥 响应 (Response)</div>
            <div class="box-body">
              <div class="line status">HTTP/1.1 200 OK</div>
              <div class="line header">Content-Type: text/html</div>
              <div class="line header">Content-Length: 1234</div>
              <div class="line empty"></div>
              <div class="line body">&lt;html&gt;...&lt;/html&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DNS 查询示例 -->
    <div v-if="activeProtocol === 'dns'" class="dns-example">
      <div class="example-title">DNS 查询过程</div>
      <div class="dns-flow">
        <div class="flow-step">
          <div class="step-icon">💻</div>
          <div class="step-text">用户输入 www.example.com</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-icon">🔍</div>
          <div class="step-text">DNS 服务器查询</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-icon">📍</div>
          <div class="step-text">返回 IP: 93.184.216.34</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeProtocol = ref('http')

const protocols = [
  {
    id: 'http',
    name: 'HTTP',
    icon: '🌐',
    desc: '网页浏览的基础'
  },
  {
    id: 'https',
    name: 'HTTPS',
    icon: '🔐',
    desc: '加密的安全连接'
  },
  {
    id: 'dns',
    name: 'DNS',
    icon: '🔍',
    desc: '域名解析服务'
  },
  {
    id: 'dhcp',
    name: 'DHCP',
    icon: '📡',
    desc: '自动分配 IP 地址'
  },
  {
    id: 'smtp',
    name: 'SMTP',
    icon: '📧',
    desc: '发送邮件'
  },
  {
    id: 'ftp',
    name: 'FTP',
    icon: '📁',
    desc: '文件传输'
  }
]

const protocolDetails = {
  http: {
    name: 'HTTP',
    icon: '🌐',
    purpose: '超文本传输协议，用于在浏览器和服务器之间传输网页数据',
    steps: [
      '浏览器发起 HTTP 请求',
      '服务器接收并处理请求',
      '服务器返回 HTTP 响应',
      '浏览器解析并显示网页'
    ],
    apps: [
      { icon: '🌍', name: '网页浏览' },
      { icon: '📱', name: '移动应用 API' },
      { icon: '🔌', name: 'RESTful 服务' }
    ]
  },
  https: {
    name: 'HTTPS',
    icon: '🔐',
    purpose: 'HTTP Secure，在 HTTP 基础上加入 SSL/TLS 加密层',
    steps: [
      '客户端请求 HTTPS 连接',
      '服务器发送数字证书',
      '客户端验证证书并生成会话密钥',
      '使用加密通道传输数据'
    ],
    apps: [
      { icon: '🏦', name: '网上银行' },
      { icon: '🛒', name: '在线支付' },
      { icon: '🔑', name: '登录认证' }
    ]
  },
  dns: {
    name: 'DNS',
    icon: '🔍',
    purpose: '域名系统，将人类可读的域名转换为机器可读的 IP 地址',
    steps: [
      '用户输入域名',
      '查询本地 DNS 缓存',
      '若缓存未命中，查询 DNS 服务器',
      '返回对应的 IP 地址'
    ],
    apps: [
      { icon: '🌐', name: '网址访问' },
      { icon: '📧', name: '邮件服务器' },
      { icon: '🎮', name: '游戏连接' }
    ]
  },
  dhcp: {
    name: 'DHCP',
    icon: '📡',
    purpose: '动态主机配置协议，自动为设备分配 IP 地址和网络配置',
    steps: [
      '设备发送 DHCP Discover',
      'DHCP 服务器发送 Offer',
      '设备发送 Request',
      '服务器发送 ACK，完成分配'
    ],
    apps: [
      { icon: '📱', name: '手机连 WiFi' },
      { icon: '💻', name: '电脑入网' },
      { icon: '🏠', name: '家庭网络' }
    ]
  },
  smtp: {
    name: 'SMTP',
    icon: '📧',
    purpose: '简单邮件传输协议，用于发送电子邮件',
    steps: [
      '邮件客户端连接 SMTP 服务器',
      '验证发件人身份',
      '传输邮件内容和附件',
      '服务器将邮件投递到收件人服务器'
    ],
    apps: [
      { icon: '📬', name: '邮件发送' },
      { icon: '🔔', name: '邮件通知' },
      { icon: '📋', name: '邮件列表' }
    ]
  },
  ftp: {
    name: 'FTP',
    icon: '📁',
    purpose: '文件传输协议，用于在网络上进行文件传输',
    steps: [
      '客户端建立 FTP 控制连接',
      '用户认证（用户名密码）',
      '建立数据连接传输文件',
      '传输完成后关闭连接'
    ],
    apps: [
      { icon: '⬆️', name: '文件上传' },
      { icon: '⬇️', name: '文件下载' },
      { icon: '📂', name: '文件管理' }
    ]
  }
}

const currentProtocol = computed(() => protocolDetails[activeProtocol.value])
</script>

<style scoped>
.application-layer-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.protocol-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.protocol-card {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.protocol-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.protocol-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.protocol-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.section-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-item {
  display: flex;
  gap: 0.75rem;
  align-items: start;
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-text {
  font-size: 0.85rem;
  line-height: 1.5;
  padding-top: 0.15rem;
}

.app-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.app-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
}

.http-example,
.dns-example {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.example-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.request-response {
  display: flex;
  align-items: stretch;
  gap: 1rem;
}

.request-box,
.response-box {
  flex: 1;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.box-header {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.box-body {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.line {
  padding: 0.25rem 0;
}

.line.method {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.line.status {
  color: #10b981;
  font-weight: 600;
}

.line.header {
  color: var(--vp-c-text-2);
}

.line.body {
  color: var(--vp-c-text-1);
}

.arrow {
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: var(--vp-c-brand);
}

.dns-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.flow-step {
  flex: 1;
  min-width: 150px;
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.step-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.step-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .request-response {
    flex-direction: column;
  }

  .arrow {
    transform: rotate(90deg);
  }
}
</style>
