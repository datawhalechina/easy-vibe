<template>
  <div class="http-root">
    <div class="http-header">
      <span class="http-icon">🌐</span>
      <span class="http-title">HTTP 协议演示</span>
    </div>

    <div class="http-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['http-tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="http-content">
      <!-- 请求响应演示 -->
      <div v-if="activeTab === 'request'" class="http-section">
        <div class="http-flow">
          <div class="http-card http-request">
            <div class="http-card-header">
              <span class="http-card-icon">📤</span>
              <span class="http-card-title">HTTP 请求</span>
            </div>
            <div class="http-card-body">
              <div class="http-line http-line-start">
                <span class="http-method" :class="request.method">{{
                  request.method
                }}</span>
                <span class="http-url">{{ request.url }}</span>
                <span class="http-version">{{ request.version }}</span>
              </div>
              <div
                v-for="(header, key) in request.headers"
                :key="key"
                class="http-line"
              >
                <span class="http-header-key">{{ key }}:</span>
                <span class="http-header-value">{{ header }}</span>
              </div>
              <div class="http-line http-line-empty"></div>
              <div v-if="request.body" class="http-body">
                {{ request.body }}
              </div>
            </div>
          </div>

          <div class="http-connection">
            <div class="http-connection-line"></div>
            <span class="http-connection-label">TCP 连接</span>
          </div>

          <div class="http-card http-response">
            <div class="http-card-header">
              <span class="http-card-icon">📥</span>
              <span class="http-card-title">HTTP 响应</span>
            </div>
            <div class="http-card-body">
              <div class="http-line http-line-start">
                <span class="http-version">{{ response.version }}</span>
                <span class="http-status" :class="response.statusClass">{{
                  response.status
                }}</span>
                <span class="http-status-text">{{ response.statusText }}</span>
              </div>
              <div
                v-for="(header, key) in response.headers"
                :key="key"
                class="http-line"
              >
                <span class="http-header-key">{{ key }}:</span>
                <span class="http-header-value">{{ header }}</span>
              </div>
              <div class="http-line http-line-empty"></div>
              <div class="http-body">{{ response.body }}</div>
            </div>
          </div>
        </div>

        <div class="http-buttons">
          <button
            v-for="demo in demos"
            :key="demo.id"
            class="http-btn"
            @click="loadDemo(demo)"
          >
            {{ demo.name }}
          </button>
        </div>
      </div>

      <!-- HTTP 版本对比 -->
      <div v-else-if="activeTab === 'versions'" class="http-section">
        <div class="version-table">
          <div class="version-row version-row-head">
            <div class="version-cell">版本</div>
            <div class="version-cell">年份</div>
            <div class="version-cell">核心特性</div>
            <div class="version-cell">传输格式</div>
            <div class="version-cell">连接方式</div>
          </div>
          <div
            v-for="ver in versions"
            :key="ver.version"
            class="version-row"
            :class="{ 'version-row-highlight': ver.highlight }"
          >
            <div class="version-cell version-version">{{ ver.version }}</div>
            <div class="version-cell">{{ ver.year }}</div>
            <div class="version-cell">{{ ver.features }}</div>
            <div class="version-cell">{{ ver.format }}</div>
            <div class="version-cell">{{ ver.connection }}</div>
          </div>
        </div>
      </div>

      <!-- HTTP/2 多路复用 -->
      <div v-else-if="activeTab === 'http2'" class="http-section">
        <div class="http2-diagram">
          <div class="http2-header">
            <span class="http2-title">HTTP/1.1 vs HTTP/2</span>
          </div>

          <div class="http2-comparison">
            <div class="http2-side">
              <div class="http2-side-title">HTTP/1.1</div>
              <div class="http2-connection http2-connection-legacy">
                <div class="http2-stream http2-stream-1">
                  <div class="http2-label">请求 1</div>
                  <div class="http2-timeline">
                    <div class="http2-block http2-block-req">发送</div>
                    <div class="http2-block http2-block-wait">等待</div>
                    <div class="http2-block http2-block-res">接收</div>
                  </div>
                </div>
                <div class="http2-stream http2-stream-2">
                  <div class="http2-label">请求 2</div>
                  <div class="http2-timeline">
                    <div class="http2-block http2-block-wait">排队</div>
                    <div class="http2-block http2-block-req">发送</div>
                    <div class="http2-block http2-block-wait">等待</div>
                    <div class="http2-block http2-block-res">接收</div>
                  </div>
                </div>
                <div class="http2-stream http2-stream-3">
                  <div class="http2-label">请求 3</div>
                  <div class="http2-timeline">
                    <div class="http2-block http2-block-wait">排队</div>
                    <div class="http2-block http2-block-wait">排队</div>
                    <div class="http2-block http2-block-req">发送</div>
                    <div class="http2-block http2-block-res">接收</div>
                  </div>
                </div>
              </div>
              <div class="http2-note">串行传输，需等待前一个请求完成</div>
            </div>

            <div class="http2-side">
              <div class="http2-side-title">HTTP/2</div>
              <div class="http2-connection http2-connection-modern">
                <div class="http2-stream http2-stream-1">
                  <div class="http2-label">Stream 1</div>
                  <div class="http2-timeline">
                    <div class="http2-block http2-block-req">发送</div>
                    <div class="http2-block http2-block-res">接收</div>
                  </div>
                </div>
                <div class="http2-stream http2-stream-2">
                  <div class="http2-label">Stream 2</div>
                  <div class="http2-timeline">
                    <div class="http2-block http2-block-req">发送</div>
                    <div class="http2-block http2-block-res">接收</div>
                  </div>
                </div>
                <div class="http2-stream http2-stream-3">
                  <div class="http2-label">Stream 3</div>
                  <div class="http2-timeline">
                    <div class="http2-block http2-block-req">发送</div>
                    <div class="http2-block http2-block-res">接收</div>
                  </div>
                </div>
              </div>
              <div class="http2-note">多路复用，并发传输多个请求</div>
            </div>
          </div>
        </div>
      </div>

      <!-- HTTPS vs HTTP -->
      <div v-else-if="activeTab === 'https'" class="http-section">
        <div class="https-comparison">
          <div class="https-card https-http">
            <div class="https-header">
              <span class="https-icon">🔓</span>
              <span class="https-title">HTTP</span>
            </div>
            <div class="https-body">
              <div class="https-warning">⚠️ 不安全</div>
              <ul class="https-list">
                <li>明文传输，数据可被窃听</li>
                <li>无法验证服务器身份</li>
                <li>数据可能被篡改</li>
              </ul>
              <div class="https-example">
                <div class="https-example-label">传输内容：</div>
                <code>GET /login?user=admin&pass=123456</code>
              </div>
            </div>
          </div>

          <div class="https-card https-https">
            <div class="https-header">
              <span class="https-icon">🔒</span>
              <span class="https-title">HTTPS</span>
            </div>
            <div class="https-body">
              <div class="https-success">✓ 安全</div>
              <ul class="https-list">
                <li>加密传输，数据无法被窃听</li>
                <li>SSL/TLS 证书验证身份</li>
                <li>数据完整性校验，防篡改</li>
              </ul>
              <div class="https-example">
                <div class="https-example-label">传输内容：</div>
                <code>8f3a2b...（加密数据）</code>
              </div>
            </div>
          </div>
        </div>

        <div class="https-flow">
          <div class="https-flow-title">HTTPS 握手过程</div>
          <div class="https-steps">
            <div class="https-step">
              <div class="https-step-number">1</div>
              <div class="https-step-content">
                <div class="https-step-title">Client Hello</div>
                <div class="https-step-desc">客户端发送支持的加密套件</div>
              </div>
            </div>
            <div class="https-step">
              <div class="https-step-number">2</div>
              <div class="https-step-content">
                <div class="https-step-title">Server Hello</div>
                <div class="https-step-desc">
                  服务器返回证书和选定的加密套件
                </div>
              </div>
            </div>
            <div class="https-step">
              <div class="https-step-number">3</div>
              <div class="https-step-content">
                <div class="https-step-title">验证证书</div>
                <div class="https-step-desc">客户端验证服务器证书</div>
              </div>
            </div>
            <div class="https-step">
              <div class="https-step-number">4</div>
              <div class="https-step-content">
                <div class="https-step-title">密钥交换</div>
                <div class="https-step-desc">生成会话密钥</div>
              </div>
            </div>
            <div class="https-step">
              <div class="https-step-number">5</div>
              <div class="https-step-content">
                <div class="https-step-title">加密通信</div>
                <div class="https-step-desc">使用会话密钥加密数据</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('request')

const tabs = [
  { id: 'request', name: '请求响应', icon: '📡' },
  { id: 'versions', name: '版本对比', icon: '📊' },
  { id: 'http2', name: 'HTTP/2', icon: '⚡' },
  { id: 'https', name: 'HTTPS', icon: '🔒' }
]

const request = ref({
  method: 'GET',
  url: '/api/users/123',
  version: 'HTTP/1.1',
  headers: {
    Host: 'api.example.com',
    'User-Agent': 'Mozilla/5.0',
    Accept: 'application/json',
    Authorization: 'Bearer xxx'
  },
  body: null
})

const response = ref({
  version: 'HTTP/1.1',
  status: '200',
  statusClass: 'success',
  statusText: 'OK',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': '156',
    'Cache-Control': 'max-age=3600'
  },
  body: '{\n  "id": 123,\n  "name": "张三",\n  "email": "zhangsan@example.com"\n}'
})

const demos = [
  {
    id: 'get',
    name: 'GET 请求',
    request: {
      method: 'GET',
      url: '/api/users/123',
      version: 'HTTP/1.1',
      headers: {
        Host: 'api.example.com',
        Accept: 'application/json'
      },
      body: null
    },
    response: {
      version: 'HTTP/1.1',
      status: '200',
      statusClass: 'success',
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '156'
      },
      body: '{\n  "id": 123,\n  "name": "张三"\n}'
    }
  },
  {
    id: 'post',
    name: 'POST 创建',
    request: {
      method: 'POST',
      url: '/api/users',
      version: 'HTTP/1.1',
      headers: {
        Host: 'api.example.com',
        'Content-Type': 'application/json',
        'Content-Length': '45'
      },
      body: '{\n  "name": "李四",\n  "email": "lisi@example.com"\n}'
    },
    response: {
      version: 'HTTP/1.1',
      status: '201',
      statusClass: 'success',
      statusText: 'Created',
      headers: {
        'Content-Type': 'application/json',
        Location: '/api/users/124'
      },
      body: '{\n  "id": 124,\n  "name": "李四"\n}'
    }
  },
  {
    id: '404',
    name: '404 错误',
    request: {
      method: 'GET',
      url: '/api/users/999',
      version: 'HTTP/1.1',
      headers: {
        Host: 'api.example.com'
      },
      body: null
    },
    response: {
      version: 'HTTP/1.1',
      status: '404',
      statusClass: 'error',
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{\n  "error": "用户不存在"\n}'
    }
  }
]

const versions = [
  {
    version: 'HTTP/0.9',
    year: '1991',
    features: '仅支持 GET',
    format: '纯文本',
    connection: '一次一请求',
    highlight: false
  },
  {
    version: 'HTTP/1.0',
    year: '1996',
    features: '增加 POST/HEAD',
    format: '纯文本',
    connection: '短连接',
    highlight: false
  },
  {
    version: 'HTTP/1.1',
    year: '1997',
    features: '持久连接、分块传输',
    format: '纯文本',
    connection: '长连接',
    highlight: true
  },
  {
    version: 'HTTP/2',
    year: '2015',
    features: '多路复用、头部压缩',
    format: '二进制帧',
    connection: '多路复用',
    highlight: true
  },
  {
    version: 'HTTP/3',
    year: '2022',
    features: '基于 QUIC、解决队头阻塞',
    format: 'QUIC (UDP)',
    connection: '独立连接',
    highlight: true
  }
]

function loadDemo(demo) {
  request.value = demo.request
  response.value = demo.response
}
</script>

<style scoped>
.http-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.http-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.http-icon {
  font-size: 20px;
}

.http-title {
  font-weight: 600;
  font-size: 15px;
}

.http-tabs {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.http-tab {
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

.http-tab:hover {
  border-color: var(--vp-c-brand);
}

.http-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.http-content {
  padding: 20px;
}

/* 请求响应演示 */
.http-flow {
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-bottom: 16px;
}

.http-card {
  flex: 1;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.http-request {
  border-left-color: #3b82f6;
  border-left-width: 4px;
}

.http-response {
  border-left-color: #22c55e;
  border-left-width: 4px;
}

.http-card-header {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 13px;
}

.http-card-body {
  padding: 12px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.6;
}

.http-line {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.http-line-start {
  margin-bottom: 8px;
  font-weight: 600;
}

.http-method {
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: 700;
}

.http-method.GET {
  background: #22c55e22;
  color: #22c55e;
}

.http-method.POST {
  background: #3b82f622;
  color: #3b82f6;
}

.http-url {
  color: var(--vp-c-text-1);
}

.http-version {
  color: var(--vp-c-text-3);
}

.http-header-key {
  color: var(--vp-c-brand);
  min-width: 100px;
}

.http-header-value {
  color: var(--vp-c-text-2);
}

.http-line-empty {
  height: 4px;
}

.http-body {
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  word-break: break-all;
}

.http-connection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.http-connection-line {
  width: 2px;
  height: 60px;
  background: var(--vp-c-divider);
  position: relative;
}

.http-connection-line::before {
  content: '→';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: var(--vp-c-brand);
}

.http-connection-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.http-status {
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: 700;
}

.http-status.success {
  background: #22c55e22;
  color: #22c55e;
}

.http-status.error {
  background: #ef444422;
  color: #ef4444;
}

.http-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.http-btn {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.http-btn:hover {
  border-color: var(--vp-c-brand);
}

/* 版本对比表 */
.version-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.version-row {
  display: grid;
  grid-template-columns: 100px 80px 1fr 120px 120px;
}

.version-row:nth-child(odd) {
  background: var(--vp-c-bg-soft);
}

.version-row:nth-child(even) {
  background: var(--vp-c-bg);
}

.version-row-head {
  background: var(--vp-c-bg-alt);
}

.version-row-highlight {
  background: color-mix(in srgb, var(--vp-c-brand) 8%, transparent);
}

.version-cell {
  padding: 12px 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  border-right: 1px solid var(--vp-c-divider);
}

.version-cell:last-child {
  border-right: none;
}

.version-row-head .version-cell {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.version-version {
  font-weight: 600;
  color: var(--vp-c-brand);
}

/* HTTP/2 对比 */
.http2-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.http2-side-title {
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
}

.http2-connection {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
}

.http2-stream {
  margin-bottom: 12px;
}

.http2-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.http2-timeline {
  display: flex;
  gap: 4px;
  height: 32px;
}

.http2-block {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.http2-block-req {
  background: #3b82f622;
  color: #3b82f6;
}

.http2-block-res {
  background: #22c55e22;
  color: #22c55e;
}

.http2-block-wait {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
}

.http2-note {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: center;
  margin-top: 8px;
}

/* HTTPS 对比 */
.https-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.https-card {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.https-http {
  border-color: #ef4444;
}

.https-https {
  border-color: #22c55e;
}

.https-header {
  padding: 12px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.https-body {
  padding: 14px;
}

.https-warning,
.https-success {
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
  text-align: center;
}

.https-warning {
  background: #ef444422;
  color: #ef4444;
}

.https-success {
  background: #22c55e22;
  color: #22c55e;
}

.https-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}

.https-list li {
  padding: 6px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  position: relative;
  padding-left: 20px;
}

.https-list li::before {
  content: '•';
  position: absolute;
  left: 6px;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.https-example {
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.https-example-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.https-example code {
  display: block;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.https-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.https-flow-title {
  font-weight: 600;
  margin-bottom: 14px;
  font-size: 14px;
}

.https-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.https-step {
  display: flex;
  gap: 10px;
}

.https-step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.https-step-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.https-step-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .http-flow {
    flex-direction: column;
  }

  .http-connection {
    flex-direction: row;
    width: 100%;
    height: 40px;
  }

  .http-connection-line {
    width: 100%;
    height: 2px;
  }

  .version-row {
    grid-template-columns: 80px 60px 1fr 100px 100px;
  }

  .version-cell {
    padding: 8px 6px;
    font-size: 11px;
  }

  .http2-comparison,
  .https-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
