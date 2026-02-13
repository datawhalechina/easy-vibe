<template>
  <div class="deployment-cdn-demo">
    <div class="demo-header">
      <span class="icon">🌍</span>
      <span class="title">CDN 加速原理</span>
      <span class="subtitle">把资源送到用户家门口</span>
    </div>

    <div class="intro-text">
      <strong>CDN</strong>（Content Delivery Network）就像在全世界开了连锁仓库，用户访问时从<strong>最近的仓库</strong>取货，速度超快！
    </div>

    <div class="demo-content">
      <div class="world-map">
        <div class="server-origin">
          <span class="server-icon">🏠</span>
          <span class="server-label">源站服务器<br/>(北京)</span>
        </div>

        <div class="cdn-nodes">
          <div
            v-for="node in cdnNodes"
            :key="node.id"
            class="cdn-node"
            :class="{ active: activeNode === node.id }"
            @click="selectNode(node)"
          >
            <span class="node-icon">{{ node.icon }}</span>
            <span class="node-label">{{ node.city }}</span>
            <span class="node-time">{{ node.time }}</span>
          </div>
        </div>

        <div class="user-requests">
          <div
            v-for="user in users"
            :key="user.id"
            class="user-request"
            :class="{ active: activeUser === user.id }"
            @click="selectUser(user)"
          >
            <span class="user-icon">{{ user.icon }}</span>
            <span class="user-label">{{ user.location }}</span>
            <span class="user-arrow">→</span>
            <span class="user-target">{{ user.cdnNode }}</span>
          </div>
        </div>
      </div>

      <div class="comparison-table">
        <div class="table-title">⚡ 性能对比</div>
        <table>
          <thead>
            <tr>
              <th>用户位置</th>
              <th>不使用 CDN</th>
              <th>使用 CDN</th>
              <th>提速</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in speedData" :key="row.location">
              <td>{{ row.location }}</td>
              <td class="slow">{{ row.withoutCdn }}</td>
              <td class="fast">{{ row.withCdn }}</td>
              <td class="speedup">{{ row.speedup }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="benefits">
        <div class="benefit-title">✨ CDN 的好处</div>
        <div class="benefit-list">
          <div class="benefit-item">
            <span class="benefit-icon">🚀</span>
            <span class="benefit-text">访问速度提升 50-80%</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">💰</span>
            <span class="benefit-text">节省源站带宽成本</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">🛡️</span>
            <span class="benefit-text">DDoS 防护能力</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">📱</span>
            <span class="benefit-text">全球覆盖无死角</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>适用场景：</strong>静态资源（图片、CSS、JS）最适合上 CDN，动态数据还是走源站。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeNode = ref(null)
const activeUser = ref(null)

const cdnNodes = [
  { id: 'beijing', city: '北京', icon: '🏙️', time: '10ms' },
  { id: 'shanghai', city: '上海', icon: '🏙️', time: '15ms' },
  { id: 'tokyo', city: '东京', icon: '🗼', time: '20ms' },
  { id: 'london', city: '伦敦', icon: '🎡', time: '25ms' },
  { id: 'newyork', city: '纽约', icon: '🗽', time: '18ms' }
]

const users = [
  { id: 'user1', location: '北京用户', cdnNode: '北京节点', icon: '👤' },
  { id: 'user2', location: '纽约用户', cdnNode: '纽约节点', icon: '👤' },
  { id: 'user3', location: '伦敦用户', cdnNode: '伦敦节点', icon: '👤' }
]

const speedData = [
  { location: '北京', withoutCdn: '10ms', withCdn: '10ms', speedup: '-' },
  { location: '上海', withoutCdn: '30ms', withCdn: '15ms', speedup: '50%' },
  { location: '纽约', withoutCdn: '200ms', withCdn: '18ms', speedup: '91%' },
  { location: '伦敦', withoutCdn: '180ms', withCdn: '25ms', speedup: '86%' }
]

const selectNode = (node) => {
  activeNode.value = node.id
  activeUser.value = null
}

const selectUser = (user) => {
  activeUser.value = user.id
  activeNode.value = null
}
</script>

<style scoped>
.deployment-cdn-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 1rem;
}

.world-map {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.server-origin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg));
  border-radius: 8px;
  border: 2px solid var(--vp-c-brand);
}

.server-icon {
  font-size: 2rem;
}

.server-label {
  font-size: 0.85rem;
  text-align: center;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.cdn-nodes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.cdn-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 80px;
}

.cdn-node:hover,
.cdn-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.node-icon {
  font-size: 1.5rem;
}

.node-label {
  font-size: 0.75rem;
  text-align: center;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.node-time {
  font-size: 0.7rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.user-requests {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-request {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-request:hover,
.user-request.active {
  background: var(--vp-c-brand-soft);
}

.user-icon {
  font-size: 1rem;
}

.user-label {
  color: var(--vp-c-text-1);
  flex: 1;
}

.user-arrow {
  color: var(--vp-c-text-3);
}

.user-target {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.table-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

thead {
  background: var(--vp-c-bg-soft);
}

th {
  padding: 0.5rem;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

td {
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

td.slow {
  color: #dc3545;
  font-weight: 500;
}

td.fast {
  color: #28a745;
  font-weight: 500;
}

td.speedup {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.benefits {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
}

.benefit-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.benefit-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.benefit-icon {
  font-size: 1.25rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .benefit-list {
    grid-template-columns: 1fr;
  }

  .cdn-nodes {
    justify-content: center;
  }
}
</style>
