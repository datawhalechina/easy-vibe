<template>
  <div class="multi-region-demo">
    <div class="header">
      <div class="title">多区域部署</div>
      <div class="subtitle">异地多活架构，就近服务与容灾备份</div>
    </div>

    <!-- 全球地图 -->
    <div class="world-map">
      <div class="map-header">
        <span class="map-title">全球部署视图</span>
        <span class="map-legend">
          <span class="legend-item">
            <span class="legend-dot active"></span>
            主节点
          </span>
          <span class="legend-item">
            <span class="legend-dot standby"></span>
            备节点
          </span>
        </span>
      </div>

      <div class="map-container">
        <!-- 简化的世界地图 -->
        <div class="map-bg">
          <!-- 亚洲 -->
          <div class="continent asia">
            <div
              v-for="region in asiaRegions"
              :key="region.id"
              class="region-node"
              :class="{
                active: region.isPrimary,
                standby: !region.isPrimary,
                selected: selectedRegion === region.id
              }"
              :style="{ top: region.y + '%', left: region.x + '%' }"
              @click="selectedRegion = region.id"
            >
              <div class="node-icon">{{ region.isPrimary ? '📡' : '📶' }}</div>
              <div class="node-label">{{ region.name }}</div>
              <div class="node-delay">{{ region.delay }}ms</div>
            </div>
          </div>

          <!-- 欧洲 -->
          <div class="continent europe">
            <div
              v-for="region in europeRegions"
              :key="region.id"
              class="region-node"
              :class="{
                active: region.isPrimary,
                standby: !region.isPrimary,
                selected: selectedRegion === region.id
              }"
              :style="{ top: region.y + '%', left: region.x + '%' }"
              @click="selectedRegion = region.id"
            >
              <div class="node-icon">{{ region.isPrimary ? '📡' : '📶' }}</div>
              <div class="node-label">{{ region.name }}</div>
              <div class="node-delay">{{ region.delay }}ms</div>
            </div>
          </div>

          <!-- 北美 -->
          <div class="continent north-america">
            <div
              v-for="region in northAmericaRegions"
              :key="region.id"
              class="region-node"
              :class="{
                active: region.isPrimary,
                standby: !region.isPrimary,
                selected: selectedRegion === region.id
              }"
              :style="{ top: region.y + '%', left: region.x + '%' }"
              @click="selectedRegion = region.id"
            >
              <div class="node-icon">{{ region.isPrimary ? '📡' : '📶' }}</div>
              <div class="node-label">{{ region.name }}</div>
              <div class="node-delay">{{ region.delay }}ms</div>
            </div>
          </div>
        </div>

        <!-- 连接线路 -->
        <svg class="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrowhead" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto">
              <polygon points="0 0, 3 1.5, 0 3" fill="var(--vp-c-brand)" />
            </marker>
          </defs>
          <line
            v-for="(line, index) in connectionLines"
            :key="index"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke="var(--vp-c-brand)"
            stroke-width="0.3"
            stroke-dasharray="2 1"
            marker-end="url(#arrowhead)"
          />
        </svg>
      </div>
    </div>

    <!-- 区域详情 -->
    <div class="region-details" v-if="selectedRegionData">
      <div class="details-header">
        <div class="region-title">
          <span class="region-icon">{{ selectedRegionData.isPrimary ? '📡' : '📶' }}</span>
          <span class="region-name">{{ selectedRegionData.name }}</span>
          <span class="region-badge" :class="{ primary: selectedRegionData.isPrimary, standby: !selectedRegionData.isPrimary }">
            {{ selectedRegionData.isPrimary ? '主节点' : '备节点' }}
          </span>
        </div>
        <button class="close-btn" @click="selectedRegion = null">×</button>
      </div>

      <div class="details-grid">
        <div class="detail-item">
          <div class="detail-label">延迟</div>
          <div class="detail-value">{{ selectedRegionData.delay }}ms</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">在线实例</div>
          <div class="detail-value">{{ selectedRegionData.instances }}个</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">当前QPS</div>
          <div class="detail-value">{{ selectedRegionData.qps }}/s</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">数据同步延迟</div>
          <div class="detail-value">{{ selectedRegionData.syncDelay }}ms</div>
        </div>
      </div>

      <div class="details-actions">
        <button class="action-btn primary" v-if="!selectedRegionData.isPrimary">
          提升为主节点
        </button>
        <button class="action-btn danger" v-if="selectedRegionData.isPrimary">
          切换流量
        </button>
        <button class="action-btn">
          查看日志
        </button>
      </div>
    </div>

    <!-- 架构优势 -->
    <div class="architecture-benefits">
      <div class="benefits-title">多区域部署优势</div>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-title">就近服务</div>
          <div class="benefit-desc">用户请求自动路由到最近的区域，降低网络延迟，提升访问速度</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🛡️</div>
          <div class="benefit-title">容灾备份</div>
          <div class="benefit-desc">单区域故障时自动切换流量，确保服务高可用，数据多副本保存</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🌍</div>
          <div class="benefit-title">全球覆盖</div>
          <div class="benefit-desc">支持跨区域部署，满足不同地区的合规要求和数据主权法规</div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">📈</div>
          <div class="benefit-title">负载均衡</div>
          <div class="benefit-desc">跨区域流量调度，避免单点过载，实现全局资源优化配置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 当前选中的指标
const currentMetric = ref('cpu')
const selectedRegion = ref(null)

// 亚洲区域数据
const asiaRegions = ref([
  { id: 'bj', name: '北京', x: 75, y: 35, isPrimary: true, delay: 20, instances: 5, qps: 2500, syncDelay: 10 },
  { id: 'sh', name: '上海', x: 80, y: 45, isPrimary: false, delay: 25, instances: 3, qps: 1500, syncDelay: 15 },
  { id: 'sg', name: '新加坡', x: 72, y: 65, isPrimary: false, delay: 45, instances: 2, qps: 800, syncDelay: 25 }
])

// 欧洲区域数据
const europeRegions = ref([
  { id: 'fr', name: '法兰克福', x: 48, y: 30, isPrimary: true, delay: 120, instances: 4, qps: 1800, syncDelay: 20 },
  { id: 'uk', name: '伦敦', x: 45, y: 25, isPrimary: false, delay: 130, instances: 2, qps: 900, syncDelay: 30 }
])

// 北美区域数据
const northAmericaRegions = ref([
  { id: 'usw', name: '硅谷', x: 15, y: 38, isPrimary: true, delay: 150, instances: 6, qps: 3200, syncDelay: 25 },
  { id: 'use', name: '弗吉尼亚', x: 28, y: 35, isPrimary: false, delay: 160, instances: 3, qps: 1400, syncDelay: 35 }
])

// 连接线数据
const connectionLines = ref([
  // 北京-上海
  { x1: 75, y1: 35, x2: 80, y2: 45 },
  // 北京-新加坡
  { x1: 75, y1: 35, x2: 72, y2: 65 },
  // 法兰克福-伦敦
  { x1: 48, y1: 30, x2: 45, y2: 25 },
  // 硅谷-弗吉尼亚
  { x1: 15, y1: 38, x2: 28, y2: 35 },
  // 跨洲连接
  { x1: 75, y1: 35, x2: 48, y2: 30 },
  { x1: 48, y1: 30, x2: 15, y2: 38 }
])

// 选中区域详情
const selectedRegionData = computed(() => {
  if (!selectedRegion.value) return null
  const allRegions = [
    ...asiaRegions.value,
    ...europeRegions.value,
    ...northAmericaRegions.value
  ]
  return allRegions.find(r => r.id === selectedRegion.value)
})

// 获取使用率颜色
const getUsageColor = (usage) => {
  if (usage > 90) return '#ef4444'
  if (usage > 70) return '#f59e0b'
  return '#22c55e'
}
</script>

<style scoped>
.multi-region-demo {
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

/* World Map */
.world-map {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.map-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.map-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-dot.active {
  background: var(--vp-c-brand);
}

.legend-dot.standby {
  background: var(--vp-c-text-3);
}

.map-container {
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  background: linear-gradient(135deg, #f0f4f8, #e2e8f0);
  border-radius: 8px;
  overflow: hidden;
}

.map-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.continent {
  position: absolute;
  width: 100%;
  height: 100%;
}

.region-node {
  position: absolute;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 60px;
  z-index: 10;
}

.region-node:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.region-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.region-node.active .node-icon {
  color: var(--vp-c-brand);
}

.region-node.standby {
  opacity: 0.7;
}

.region-node.selected {
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.node-icon {
  font-size: 1.25rem;
  margin-bottom: 0.2rem;
}

.node-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.node-delay {
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
}

.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Region Details */
.region-details {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.region-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.region-icon {
  font-size: 1.5rem;
}

.region-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.region-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.region-badge.primary {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.region-badge.standby {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.close-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  border-color: var(--vp-c-danger);
  color: var(--vp-c-danger);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}

.detail-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.detail-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.details-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
}

.action-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.action-btn.danger {
  background: var(--vp-c-danger);
  color: white;
  border-color: var(--vp-c-danger);
}

/* Architecture Benefits */
.architecture-benefits {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.benefits-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.benefit-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.benefit-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.benefit-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
