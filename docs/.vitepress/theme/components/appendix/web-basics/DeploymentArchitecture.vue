<template>
  <div class="deployment-architecture">
    <div class="architecture-view">
      <div class="view-selector">
        <button
          v-for="(view, index) in views"
          :key="index"
          class="view-btn"
          :class="{ active: currentView === index }"
          @click="currentView = index"
        >
          {{ view.name }}
        </button>
      </div>

      <div class="architecture-diagram">
        <!-- 基础架构 -->
        <div v-if="currentView === 0" class="basic-architecture">
          <div class="user-node">
            <div class="node-icon">👤</div>
            <div class="node-label">用户</div>
          </div>

          <div class="arrow-down">↓</div>

          <div class="domain-node">
            <div class="node-icon">🌐</div>
            <div class="node-label">域名</div>
            <div class="node-desc">example.com</div>
          </div>

          <div class="arrow-down">↓ DNS 解析</div>

          <div class="server-node">
            <div class="node-icon">🖥️</div>
            <div class="node-label">服务器</div>
            <div class="node-desc">IP: 1.2.3.4</div>
          </div>

          <div class="arrow-down">↓</div>

          <div class="web-node">
            <div class="node-icon">🌍</div>
            <div class="node-label">Web 应用</div>
          </div>
        </div>

        <!-- CDN 架构 -->
        <div v-if="currentView === 1" class="cdn-architecture">
          <div class="user-nodes">
            <div class="user-node china">
              <div class="node-icon">🇨🇳</div>
              <div class="node-label">中国用户</div>
            </div>
            <div class="user-node usa">
              <div class="node-icon">🇺🇸</div>
              <div class="node-label">美国用户</div>
            </div>
          </div>

          <div class="arrow-group">
            <div class="arrow-left">↙</div>
            <div class="arrow-right">↘</div>
          </div>

          <div class="cdn-nodes">
            <div class="cdn-node">
              <div class="node-icon">📡</div>
              <div class="node-label">CDN 北京节点</div>
            </div>
            <div class="cdn-node">
              <div class="node-icon">📡</div>
              <div class="node-label">CDN 纽约节点</div>
            </div>
          </div>

          <div class="arrow-down">↓ 缓存未命中</div>

          <div class="origin-node">
            <div class="node-icon">🖥️</div>
            <div class="node-label">源服务器</div>
          </div>
        </div>

        <!-- 负载均衡 -->
        <div v-if="currentView === 2" class="loadbalancer-architecture">
          <div class="user-node">
            <div class="node-icon">👥</div>
            <div class="node-label">用户请求</div>
          </div>

          <div class="arrow-down">↓</div>

          <div class="lb-node">
            <div class="node-icon">⚖️</div>
            <div class="node-label">负载均衡器</div>
          </div>

          <div class="arrow-group">
            <div class="arrow-1">↖</div>
            <div class="arrow-2">↑</div>
            <div class="arrow-3">↗</div>
          </div>

          <div class="server-nodes">
            <div class="server-node">
              <div class="node-icon">🖥️</div>
              <div class="node-label">服务器 1</div>
            </div>
            <div class="server-node">
              <div class="node-icon">🖥️</div>
              <div class="node-label">服务器 2</div>
            </div>
            <div class="server-node">
              <div class="node-icon">🖥️</div>
              <div class="node-label">服务器 3</div>
            </div>
          </div>
        </div>

        <!-- 完整架构 -->
        <div v-if="currentView === 3" class="full-architecture">
          <div class="user-nodes">
            <div class="user-node">
              <div class="node-icon">👤</div>
              <div class="node-label">用户</div>
            </div>
          </div>

          <div class="arrow-down">↓</div>

          <div class="dns-node">
            <div class="node-icon">🔍</div>
            <div class="node-label">DNS</div>
          </div>

          <div class="arrow-down">↓</div>

          <div class="cdn-lb-row">
            <div class="cdn-node">
              <div class="node-icon">📡</div>
              <div class="node-label">CDN</div>
            </div>
            <div class="lb-node">
              <div class="node-icon">⚖️</div>
              <div class="node-label">LB</div>
            </div>
          </div>

          <div class="arrow-down">↓</div>

          <div class="server-cluster">
            <div class="server-node">
              <div class="node-icon">🖥️</div>
              <div class="node-label">Web 1</div>
            </div>
            <div class="server-node">
              <div class="node-icon">🖥️</div>
              <div class="node-label">Web 2</div>
            </div>
            <div class="server-node">
              <div class="node-icon">💾</div>
              <div class="node-label">Database</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-cards">
      <div class="info-card" v-if="currentView === 0">
        <div class="card-title">🌐 域名 (Domain)</div>
        <div class="card-content">
          <strong>什么是域名？</strong>
          <br />域名是网站的地址，如 example.com，便于记忆和访问。 <br /><br />
          <strong>域名注册</strong>
          <br />• 注册商：GoDaddy、Namecheap、阿里云 <br />•
          选择后缀：.com、.cn、.org、.io <br />• 价格：$10-50/年
        </div>
      </div>

      <div class="info-card" v-if="currentView === 1">
        <div class="card-title">📡 CDN (内容分发网络)</div>
        <div class="card-content">
          <strong>什么是 CDN？</strong>
          <br />将内容缓存到全球各地的节点，用户就近访问。 <br /><br />
          <strong>优势</strong>
          <br />• 加速访问：就近获取内容 <br />• 减轻负载：减少源站压力 <br />•
          提高可用性：节点故障自动切换 <br /><br />
          <strong>常见 CDN</strong>
          <br />• Cloudflare、AWS CloudFront、阿里云 CDN
        </div>
      </div>

      <div class="info-card" v-if="currentView === 2">
        <div class="card-title">⚖️ 负载均衡 (Load Balancer)</div>
        <div class="card-content">
          <strong>什么是负载均衡？</strong>
          <br />将请求分发到多台服务器，提高并发能力。 <br /><br />
          <strong>负载均衡算法</strong>
          <br />• 轮询 (Round Robin) <br />• 最少连接 (Least Connections)
          <br />• IP 哈希 (IP Hash) <br /><br />
          <strong>常见工具</strong>
          <br />• Nginx、HAProxy、AWS ELB
        </div>
      </div>

      <div class="info-card" v-if="currentView === 3">
        <div class="card-title">🏗️ 完整部署架构</div>
        <div class="card-content">
          <strong>现代 Web 应用架构</strong>
          <br /><br />
          1. 用户通过域名访问
          <br />2. DNS 解析到 CDN 或负载均衡器 <br />3. CDN 缓存静态资源
          <br />4. 负载均衡器分发请求 <br />5. Web 服务器处理动态请求 <br />6.
          数据库存储持久化数据 <br /><br />
          <strong>监控和运维</strong>
          <br />• 日志收集、性能监控、自动备份
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref(0)

const views = [
  { name: '基础架构' },
  { name: 'CDN 加速' },
  { name: '负载均衡' },
  { name: '完整架构' }
]
</script>

<style scoped>
.deployment-architecture {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.architecture-view {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.view-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  justify-content: center;
  flex-wrap: wrap;
}

.view-btn {
  padding: 10px 20px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.view-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.architecture-diagram {
  min-height: 300px;
}

.node-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.node-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.node-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.user-node,
.domain-node,
.server-node,
.web-node,
.cdn-node,
.lb-node,
.dns-node,
.origin-node {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  margin: 0 auto;
  max-width: 200px;
}

.arrow-down {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 10px 0;
}

.basic-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.cdn-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.user-nodes {
  display: flex;
  gap: 30px;
  justify-content: center;
}

.user-node.china {
  background: #ffebee;
  border-color: #f44336;
}

.user-node.usa {
  background: #e3f2fd;
  border-color: #2196f3;
}

.arrow-group {
  display: flex;
  gap: 20px;
  font-size: 2rem;
  color: var(--vp-c-text-3);
}

.cdn-nodes {
  display: flex;
  gap: 20px;
}

.cdn-node {
  background: #e8f5e9;
  border-color: #4caf50;
}

.loadbalancer-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.lb-node {
  background: #fff3e0;
  border-color: #ff9800;
}

.server-nodes {
  display: flex;
  gap: 15px;
}

.full-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.cdn-lb-row {
  display: flex;
  gap: 20px;
}

.server-cluster {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.info-cards {
  display: grid;
  gap: 15px;
}

.info-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.card-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .user-nodes,
  .cdn-nodes,
  .server-nodes,
  .cdn-lb-row,
  .server-cluster {
    flex-direction: column;
    align-items: center;
  }
}
</style>
