<template>
  <div class="load-balancer-types-demo">
    <div class="header">
      <div class="title">负载均衡器类型</div>
      <div class="subtitle">从四层到七层，从硬件到软件的演进</div>
    </div>

    <!-- 层级选择器 -->
    <div class="layer-selector">
      <button
        v-for="layer in layers"
        :key="layer.key"
        class="layer-btn"
        :class="{ active: currentLayer === layer.key }"
        @click="currentLayer = layer.key"
      >
        <span class="layer-icon">{{ layer.icon }}</span>
        <span class="layer-name">{{ layer.name }}</span>
        <span class="layer-tag">{{ layer.tag }}</span>
      </button>
    </div>

    <!-- 架构对比图 -->
    <div class="architecture-comparison">
      <div class="comparison-panel">
        <div class="panel-header">
          <span class="panel-title">传统架构</span>
          <span class="panel-badge single">单点</span>
        </div>
        <div class="panel-content">
          <div class="single-server">
            <div class="server-icon">🖥️</div>
            <div class="server-label">Web Server</div>
            <div class="server-load">
              <div class="load-bar" :style="{ width: '95%' }"></div>
            </div>
            <div class="load-text">负载: 95% 🔥</div>
          </div>
        </div>
      </div>

      <div class="comparison-arrow">→</div>

      <div class="comparison-panel highlighted">
        <div class="panel-header">
          <span class="panel-title">负载均衡架构</span>
          <span class="panel-badge distributed">分布式</span>
        </div>
        <div class="panel-content">
          <div class="lb-layer">
            <div class="lb-node">
              <span class="lb-icon">⚖️</span>
              <span class="lb-label">{{ currentLayerData.label }}</span>
            </div>
          </div>
          <div class="servers-layer">
            <div
              v-for="(server, index) in servers"
              :key="index"
              class="server-node"
              :class="{ active: activeServer === index }"
            >
              <div class="server-icon-small">🖥️</div>
              <div class="server-id">S{{ index + 1 }}</div>
              <div class="server-load-mini">
                <div class="load-bar-mini" :style="{ width: server.load + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细信息面板 -->
    <div class="detail-panel">
      <div class="detail-header">
        <span class="detail-icon">{{ currentLayerData.icon }}</span>
        <span class="detail-title">{{ currentLayerData.name }}</span>
      </div>
      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">工作原理</div>
          <p class="section-desc">{{ currentLayerData.principle }}</p>
        </div>
        <div class="detail-section">
          <div class="section-title">典型产品</div>
          <div class="product-tags">
            <span v-for="product in currentLayerData.products" :key="product" class="product-tag">
              {{ product }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-title">适用场景</div>
          <ul class="scenario-list">
            <li v-for="scenario in currentLayerData.scenarios" :key="scenario">{{ scenario }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 性能对比 -->
    <div class="performance-comparison">
      <div class="comparison-title">性能对比一览</div>
      <div class="comparison-table">
        <div class="table-header">
          <div class="th">类型</div>
          <div class="th">处理层</div>
          <div class="th">性能</div>
          <div class="th">灵活性</div>
          <div class="th">成本</div>
        </div>
        <div
          v-for="row in comparisonData"
          :key="row.type"
          class="table-row"
          :class="{ active: currentLayer === row.key }"
        >
          <div class="td type">{{ row.type }}</div>
          <div class="td">{{ row.layer }}</div>
          <div class="td">
            <div class="rating-bar">
              <div class="rating-fill" :style="{ width: row.performance + '%' }"></div>
            </div>
          </div>
          <div class="td">
            <div class="rating-bar">
              <div class="rating-fill" :style="{ width: row.flexibility + '%' }"></div>
            </div>
          </div>
          <div class="td cost">{{ row.cost }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentLayer = ref('l4')
const activeServer = ref(0)

const layers = [
  {
    key: 'hardware',
    name: '硬件负载均衡',
    icon: '🏗️',
    tag: 'F5/A10'
  },
  {
    key: 'l4',
    name: '四层负载均衡',
    icon: '📦',
    tag: 'L4'
  },
  {
    key: 'l7',
    name: '七层负载均衡',
    icon: '🌐',
    tag: 'L7'
  },
  {
    key: 'software',
    name: '软件负载均衡',
    icon: '💻',
    tag: '开源'
  }
]

const layerDetails = {
  hardware: {
    name: '硬件负载均衡器',
    icon: '🏗️',
    label: 'F5 BIG-IP',
    principle: '专用硬件设备，通过ASIC芯片实现高性能流量转发。独立于服务器部署，具备高可靠性和丰富的企业级功能。',
    products: ['F5 BIG-IP', 'A10 Thunder', 'Citrix ADC', 'Radware'],
    scenarios: ['金融核心系统', '电信级应用', '需要硬件SSL卸载的场景', '高合规要求环境']
  },
  l4: {
    name: '四层负载均衡 (L4)',
    icon: '📦',
    label: 'L4 Load Balancer',
    principle: '基于传输层信息（IP地址+端口）进行流量分发。不关心应用层内容，只做"快递分拣"，因此性能极高。',
    products: ['LVS (Linux Virtual Server)', 'HAProxy (TCP模式)', 'AWS NLB', 'Azure Load Balancer'],
    scenarios: ['需要极高吞吐量的场景', 'TCP/UDP流量分发', '不需要内容识别的场景', '微服务间通信']
  },
  l7: {
    name: '七层负载均衡 (L7)',
    icon: '🌐',
    label: 'L7 Load Balancer',
    principle: '基于应用层内容（HTTP头、URL、Cookie等）进行智能路由。可以理解"快递内容"，实现更精细的流量控制。',
    products: ['Nginx', 'HAProxy (HTTP模式)', 'Envoy', 'AWS ALB', 'Traefik'],
    scenarios: ['基于URL路径路由', 'A/B测试和灰度发布', '基于Cookie的会话保持', 'HTTPS终结和证书管理']
  },
  software: {
    name: '软件负载均衡方案',
    icon: '💻',
    label: 'Software LB',
    principle: '运行在通用服务器上的负载均衡软件，灵活可定制。从开源方案到云原生方案，选择丰富。',
    products: ['Nginx / OpenResty', 'HAProxy', 'Envoy Proxy', 'Kong', 'Spring Cloud Gateway'],
    scenarios: ['成本敏感场景', '需要深度定制的环境', '云原生/K8s环境', '快速迭代开发']
  }
}

const currentLayerData = computed(() => layerDetails[currentLayer.value])

const servers = ref([
  { load: 30 },
  { load: 45 },
  { load: 25 }
])

const comparisonData = [
  {
    key: 'hardware',
    type: '硬件负载均衡',
    layer: 'L4/L7',
    performance: 95,
    flexibility: 40,
    cost: '$$$$$'
  },
  {
    key: 'l4',
    type: '四层负载均衡',
    layer: 'L4 (传输层)',
    performance: 90,
    flexibility: 50,
    cost: '$$'
  },
  {
    key: 'l7',
    type: '七层负载均衡',
    layer: 'L7 (应用层)',
    performance: 70,
    flexibility: 90,
    cost: '$$$'
  },
  {
    key: 'software',
    type: '软件负载均衡',
    layer: 'L4/L7',
    performance: 75,
    flexibility: 95,
    cost: '$'
  }
]

// 自动轮播演示
let demoInterval
const startDemo = () => {
  demoInterval = setInterval(() => {
    activeServer.value = (activeServer.value + 1) % servers.value.length
  }, 2000)
}

// 组件挂载时启动演示
onMounted(() => {
  startDemo()
})

// 组件卸载时清理
onUnmounted(() => {
  clearInterval(demoInterval)
})
</script>

<style scoped>
.load-balancer-types-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* Layer Selector */
.layer-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .layer-selector {
    grid-template-columns: repeat(2, 1fr);
  }
}

.layer-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.layer-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.layer-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-icon {
  font-size: 1.5rem;
}

.layer-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.layer-tag {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Architecture Comparison */
.architecture-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .architecture-comparison {
    grid-template-columns: 1fr;
  }
  .comparison-arrow {
    transform: rotate(90deg);
  }
}

.comparison-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.comparison-panel.highlighted {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.panel-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.panel-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.panel-badge.single {
  background: #fee2e2;
  color: #dc2626;
}

.panel-badge.distributed {
  background: #d1fae5;
  color: #059669;
}

.panel-content {
  padding: 1rem;
}

/* Single Server */
.single-server {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.server-icon {
  font-size: 2.5rem;
}

.server-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.server-load {
  width: 150px;
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.load-bar {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
  border-radius: 4px;
  transition: width 0.3s;
}

.load-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

/* LB Layer */
.lb-layer {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.lb-node {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
}

.lb-icon {
  font-size: 1.2rem;
}

/* Servers Layer */
.servers-layer {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.server-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.2s;
  min-width: 60px;
}

.server-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.server-icon-small {
  font-size: 1.25rem;
}

.server-id {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.server-load-mini {
  width: 40px;
  height: 4px;
  background: var(--vp-c-bg);
  border-radius: 2px;
  overflow: hidden;
}

.load-bar-mini {
  height: 100%;
  background: #22c55e;
  border-radius: 2px;
  transition: width 0.3s;
}

.comparison-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}

/* Detail Panel */
.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
}

.detail-content {
  padding: 1rem;
}

.detail-section {
  margin-bottom: 1rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.section-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.product-tag {
  font-size: 0.8rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.scenario-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.scenario-list li {
  margin-bottom: 0.25rem;
}

/* Performance Comparison */
.performance-comparison {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.comparison-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 0.8fr;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 0.8fr;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  transition: background 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.active {
  background: var(--vp-c-brand-soft);
}

.td.type {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.td.cost {
  font-family: monospace;
  color: var(--vp-c-brand);
}

.rating-bar {
  width: 60px;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.rating-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #3b82f6);
  border-radius: 3px;
  transition: width 0.3s;
}
</style>
