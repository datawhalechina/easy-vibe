<!--
  ReverseProxyDemo.vue
  反向代理原理 - 正向代理 vs 反向代理
-->
<template>
  <div class="reverse-proxy-demo">
    <div class="header">
      <div class="title">🔄 反向代理 vs 正向代理</div>
      <div class="subtitle">一句话区分：正向代理是"客户端的代理"，反向代理是"服务器的代理"</div>
    </div>

    <div class="mode-selector">
      <button
        :class="['mode-btn', { active: mode === 'forward' }]"
        @click="mode = 'forward'"
      >
        🔓 正向代理 (翻墙/隐藏身份)
      </button>
      <button
        :class="['mode-btn', { active: mode === 'reverse' }]"
        @click="mode = 'reverse'"
      >
        🛡️ 反向代理 (负载均衡/安全防护)
      </button>
    </div>

    <div class="flow-container">
      <div class="flow-row" v-if="mode === 'forward'">
        <div class="flow-card client">
          <div class="icon">👤</div>
          <div class="label">用户 (想翻墙)</div>
        </div>
        <div class="arrow-box">
          <div class="arrow">→</div>
          <div class="note">发给代理</div>
        </div>
        <div class="flow-card proxy forward">
          <div class="icon">🔓</div>
          <div class="label">正向代理 (VPN/SS)</div>
          <div class="tag">代理客户端</div>
        </div>
        <div class="arrow-box">
          <div class="arrow">→</div>
          <div class="note">转发请求</div>
        </div>
        <div class="flow-card target">
          <div class="icon">🌐</div>
          <div class="label">目标网站 (Google)</div>
        </div>
      </div>

      <div class="flow-row" v-if="mode === 'reverse'">
        <div class="flow-card client">
          <div class="icon">👤</div>
          <div class="label">用户 (浏览器)</div>
        </div>
        <div class="arrow-box">
          <div class="arrow">→</div>
          <div class="note">访问域名</div>
        </div>
        <div class="flow-card proxy reverse">
          <div class="icon">🛡️</div>
          <div class="label">反向代理 (Nginx)</div>
          <div class="tag">代理服务器</div>
        </div>
        <div class="arrow-box">
          <div class="arrow">→</div>
          <div class="note">负载均衡</div>
        </div>
        <div class="flow-card server">
          <div class="icon">⚙️</div>
          <div class="label">后端服务器集群</div>
          <div class="sub-label">Web1 | Web2 | Web3</div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-card">
        <div class="detail-title">
          {{ mode === 'forward' ? '🔓 正向代理特点' : '🛡️ 反向代理特点' }}
        </div>
        <ul class="detail-list">
          <li v-for="(item, index) in currentFeatures" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="detail-card">
        <div class="detail-title">💡 典型使用场景</div>
        <ul class="detail-list">
          <li v-for="(item, index) in currentScenarios" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="memory-trick">
      <div class="trick-title">🧠 记忆口诀</div>
      <div class="trick-content">
        <p v-if="mode === 'forward'">
          <strong>"正向代理 = 代理客户端"</strong> —— 客户端知情，服务器只知道代理IP
        </p>
        <p v-else>
          <strong>"反向代理 = 代理服务器"</strong> —— 客户端不知道真实服务器，只知道域名
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('reverse')

const forwardFeatures = [
  '客户端需要主动配置代理服务器地址',
  '服务端只知道代理IP，不知道真实客户端IP',
  '主要用于翻墙、隐藏身份、突破网络限制',
  '典型代表：VPN、Shadowsocks、V2Ray'
]

const reverseFeatures = [
  '客户端无感知，只需要访问域名',
  '隐藏真实服务器架构，统一对外接口',
  '提供负载均衡、安全防护、SSL卸载等功能',
  '典型代表：Nginx、HAProxy、AWS ELB'
]

const forwardScenarios = [
  '访问被屏蔽的网站（Google、YouTube）',
  '隐藏真实IP地址，保护个人隐私',
  '公司内部网络访问外部资源',
  '爬虫程序使用代理池防止被封IP'
]

const reverseScenarios = [
  '网站需要承载高并发流量（负载均衡）',
  '统一HTTPS证书管理（SSL卸载）',
  '防护DDoS攻击和SQL注入',
  '灰度发布、A/B测试、蓝绿部署'
]

const currentFeatures = computed(() => mode.value === 'forward' ? forwardFeatures : reverseFeatures)
const currentScenarios = computed(() => mode.value === 'forward' ? forwardScenarios : reverseScenarios)
</script>

<style scoped>
.reverse-proxy-demo {
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
  padding: 1rem 1.5rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 0.95rem;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.flow-container {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.flow-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  min-width: 100px;
  text-align: center;
  transition: all 0.3s;
}

.flow-card.client {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border: 2px solid #3b82f6;
}

.flow-card.proxy {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  position: relative;
}

.flow-card.proxy.forward {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-color: #22c55e;
}

.flow-card.proxy.reverse {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  border-color: #ec4899;
}

.flow-card.target {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  border: 2px solid #6366f1;
}

.flow-card.server {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border: 2px solid #a855f7;
}

.flow-card .icon {
  font-size: 2rem;
}

.flow-card .label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.flow-card .sub-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.flow-card .tag {
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
}

.arrow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.arrow .miss-text {
  font-size: 0.75rem;
  color: #ef4444;
}

.note {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.detail-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
}

.detail-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.detail-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.8;
}

.memory-trick {
  background: linear-gradient(135deg, rgba(var(--vp-c-brand-rgb), 0.1), rgba(var(--vp-c-brand-rgb), 0.05));
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
}

.trick-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.trick-content {
  color: var(--vp-c-text-1);
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .flow-row {
    flex-direction: column;
    gap: 1rem;
  }

  .detail-section {
    grid-template-columns: 1fr;
  }

  .mode-btn {
    min-width: 100%;
  }
}
</style>
