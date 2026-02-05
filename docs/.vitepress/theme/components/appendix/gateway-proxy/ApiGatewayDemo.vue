<!--
  ApiGatewayDemo.vue
  API网关架构 - 统一入口/协议转换
-->
<template>
  <div class="api-gateway-demo">
    <div class="header">
      <div class="title">🚪 API 网关：系统的"统一大门"</div>
      <div class="subtitle">想象成写字楼的「前台」——所有访客都要先经过这里，才能到达不同的办公室</div>
    </div>

    <div class="architecture-view">
      <div class="layer client-layer">
        <div class="layer-title">客户端 (来访者)</div>
        <div class="clients">
          <div class="client-item">📱 App</div>
          <div class="client-item">💻 Web</div>
          <div class="client-item">🔧 第三方</div>
        </div>
      </div>

      <div class="arrow-down">⬇️ 统一入口</div>

      <div class="layer gateway-layer">
        <div class="layer-title">🚪 API 网关 (前台)</div>
        <div class="gateway-box">
          <div class="gateway-function" :class="{ active: activeFunc === 'auth' }" @click="setActive('auth')">
            <span class="func-icon">🔐</span>
            <span class="func-name">身份认证</span>
          </div>
          <div class="gateway-function" :class="{ active: activeFunc === 'rate' }" @click="setActive('rate')">
            <span class="func-icon">⚡</span>
            <span class="func-name">限流熔断</span>
          </div>
          <div class="gateway-function" :class="{ active: activeFunc === 'route' }" @click="setActive('route')">
            <span class="func-icon">🧭</span>
            <span class="func-name">路由转发</span>
          </div>
          <div class="gateway-function" :class="{ active: activeFunc === 'transform' }" @click="setActive('transform')">
            <span class="func-icon">🔄</span>
            <span class="func-name">协议转换</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">⬇️ 分发请求</div>

      <div class="layer backend-layer">
        <div class="layer-title">⚙️ 后端服务 (各个部门)</div>
        <div class="services">
          <div class="service-card">
            <div class="service-icon">👤</div>
            <div class="service-name">用户服务</div>
            <div class="service-tech">/api/users</div>
          </div>
          <div class="service-card">
            <div class="service-icon">📦</div>
            <div class="service-name">订单服务</div>
            <div class="service-tech">/api/orders</div>
          </div>
          <div class="service-card">
            <div class="service-icon">💳</div>
            <div class="service-name">支付服务</div>
            <div class="service-tech">/api/pay</div>
          </div>
        </div>
      </div>
    </div>

    <div class="function-detail" v-if="activeFunc">
      <div class="detail-header">
        <span class="detail-icon">{{ currentFunction.icon }}</span>
        <span class="detail-name">{{ currentFunction.name }}</span>
      </div>
      <div class="detail-desc">{{ currentFunction.desc }}</div>
      <div class="detail-example">
        <div class="example-title">💡 实际场景</div>
        <div class="example-content">{{ currentFunction.example }}</div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">🤔 没有网关 vs 有网关的区别</div>
      <table>
        <thead>
          <tr>
            <th>功能需求</th>
            <th>没有网关 (直接访问)</th>
            <th>有 API 网关</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>身份认证</td>
            <td>每个服务都要写一遍登录校验</td>
            <td>✅ 统一在网关层校验 JWT</td>
          </tr>
          <tr>
            <td>限流保护</td>
            <td>每个服务自己实现限流</td>
            <td>✅ 网关统一限流，保护后端</td>
          </tr>
          <tr>
            <td>协议转换</td>
            <td>HTTP、gRPC、WebSocket各自处理</td>
            <td>✅ 网关统一对外暴露 HTTP</td>
          </tr>
          <tr>
            <td>灰度发布</td>
            <td>需要改负载均衡器配置</td>
            <td>✅ 网关层按 Header 路由</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFunc = ref('auth')

const functions = {
  auth: {
    icon: '🔐',
    name: '身份认证',
    desc: '统一校验用户身份，无需每个后端服务都写登录逻辑。支持 JWT、OAuth2、API Key 等多种认证方式。',
    example: '用户请求携带 JWT Token，网关校验签名和过期时间，通过后把用户ID添加到请求头转发给后端服务。'
  },
  rate: {
    icon: '⚡',
    name: '限流熔断',
    desc: '防止突发流量压垮后端服务。支持令牌桶、漏桶等算法，超过阈值时自动拒绝或排队。',
    example: '设置每秒钟最多1000个请求，超过的返回 429 Too Many Requests，保护后端数据库不被打崩。'
  },
  route: {
    icon: '🧭',
    name: '路由转发',
    desc: '根据 URL 路径、请求头、Query 参数等规则，将请求转发到不同的后端服务。',
    example: '/api/users → 用户服务，/api/orders → 订单服务，/api/admin → 管理服务（需管理员权限）。'
  },
  transform: {
    icon: '🔄',
    name: '协议转换',
    desc: '对外统一暴露 HTTP/HTTPS，内部可转换为 gRPC、GraphQL、WebSocket 等协议。',
    example: '客户端用普通 HTTP POST 请求，网关转换为 gRPC 调用内部微服务，返回结果再转成 JSON。'
  }
}

const currentFunction = computed(() => functions[activeFunc.value])

const setActive = (func) => {
  activeFunc.value = func
}
</script>

<style scoped>
.api-gateway-demo {
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
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
}

.mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.mode-btn {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 0.9rem;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.architecture-view {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.layer {
  margin-bottom: 1rem;
}

.layer-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.clients {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.client-item {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border: 2px solid #3b82f6;
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.arrow-down {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
  font-weight: 600;
}

.gateway-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.gateway-function {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.gateway-function:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.gateway-function.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.func-icon {
  font-size: 1.5rem;
}

.func-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.services {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.service-card {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border: 2px solid #a855f7;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  text-align: center;
  min-width: 100px;
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.service-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.service-tech {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.function-detail {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-name {
  font-weight: 700;
  font-size: 1.1rem;
}

.detail-desc {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.example-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.example-content {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .gateway-box {
    grid-template-columns: 1fr;
  }

  table {
    font-size: 0.8rem;
  }

  th, td {
    padding: 0.5rem;
  }
}
</style>
