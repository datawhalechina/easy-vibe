<template>
  <div class="network-services-demo">
    <div class="demo-header">
      <h4>网络架构可视化配置</h4>
      <p class="demo-desc">拖拽组件构建您的云上网络架构</p>
    </div>

    <div class="network-builder">
      <div class="components-panel">
        <div class="panel-title">可用组件</div>
        <div class="component-list">
          <div
            v-for="component in networkComponents"
            :key="component.id"
            class="component-item"
            draggable="true"
            @dragstart="onDragStart($event, component)"
          >
            <span class="component-icon">{{ component.icon }}</span>
            <span class="component-name">{{ component.name }}</span>
          </div>
        </div>
      </div>

      <div class="canvas-area">
        <div
          class="network-canvas"
          @drop="onDrop"
          @dragover.prevent
        >
          <div v-if="canvasItems.length === 0" class="empty-state">
            <div class="empty-icon">🏗️</div>
            <div class="empty-text">拖拽左侧组件到此处</div>
            <div class="empty-subtext">开始构建您的网络架构</div>
          </div>

          <div
            v-for="(item, index) in canvasItems"
            :key="item.id"
            class="canvas-item"
            :class="item.type"
            :style="itemStyle(index)"
            @click="selectItem(item)"
          >
            <div class="item-icon">{{ item.icon }}</div>
            <div class="item-name">{{ item.name }}</div>
            <button class="remove-btn" @click.stop="removeItem(index)">×</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedItem" class="config-panel">
      <div class="config-header">
        <span class="config-icon">{{ selectedItem.icon }}</span>
        <span class="config-title">{{ selectedItem.name }} 配置</span>
        <button class="close-config" @click="selectedItem = null">×</button>
      </div>

      <div class="config-content">
        <div class="config-section">
          <div class="section-title">AWS 配置</div>
          <div class="service-name">{{ selectedItem.awsService }}</div>
          <div class="config-options">
            <div
              v-for="(option, idx) in selectedItem.awsOptions"
              :key="idx"
              class="option-item"
            >
              <span class="option-check">✓</span>
              <span>{{ option }}</span>
            </div>
          </div>
        </div>

        <div class="config-divider"></div>

        <div class="config-section">
          <div class="section-title aliyun-title">阿里云配置</div>
          <div class="service-name aliyun-service">{{ selectedItem.aliyunService }}</div>
          <div class="config-options">
            <div
              v-for="(option, idx) in selectedItem.aliyunOptions"
              :key="idx"
              class="option-item"
            >
              <span class="option-check aliyun-check">✓</span>
              <span>{{ option }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="config-footer">
        <div class="price-compare">
          <div class="price-item">
            <span class="price-label">AWS:</span>
            <span class="price-value">{{ selectedItem.awsPrice }}</span>
          </div>
          <div class="price-item">
            <span class="price-label">阿里云:</span>
            <span class="price-value aliyun-price">{{ selectedItem.aliyunPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const canvasItems = ref([])
const selectedItem = ref(null)
let draggedItem = null

const networkComponents = [
  {
    id: 'vpc',
    name: '专有网络',
    icon: '🏠',
    type: 'network',
    awsService: 'Amazon VPC',
    aliyunService: '专有网络 VPC',
    awsOptions: [
      '自定义 IP 地址范围',
      '多可用区子网划分',
      '网络 ACL 和安全组',
      'VPC 对等连接和 Transit Gateway'
    ],
    aliyunOptions: [
      '自定义私网网段',
      '交换机跨可用区部署',
      '安全组和网络 ACL',
      'VPC 互通和云企业网'
    ],
    awsPrice: '免费（子网内流量）',
    aliyunPrice: '免费（同 VPC 内流量）'
  },
  {
    id: 'cdn',
    name: '内容分发',
    icon: '🚀',
    type: 'network',
    awsService: 'Amazon CloudFront',
    aliyunService: 'CDN 内容分发',
    awsOptions: [
      '全球 400+ 边缘节点',
      '支持静态和动态内容加速',
      'Lambda@Edge 边缘计算',
      '与 AWS Shield 集成防护'
    ],
    aliyunOptions: [
      '国内 2800+ 节点覆盖',
      '全站加速和下载分发',
      '边缘脚本和缓存优化',
      '与 WAF 联动安全防护'
    ],
    awsPrice: 'HTTP: $0.085/GB 起',
    aliyunPrice: 'HTTP: ¥0.15/GB 起'
  },
  {
    id: 'lb',
    name: '负载均衡',
    icon: '⚖️',
    type: 'network',
    awsService: 'Elastic Load Balancing',
    aliyunService: 'SLB 负载均衡',
    awsOptions: [
      'ALB/NLB/CLB 多种类型',
      '自动健康检查和故障转移',
      'SSL/TLS 终止和证书管理',
      '与 Auto Scaling 集成'
    ],
    aliyunOptions: [
      'ALB/NLB/CLB 全类型支持',
      '主备和集群高可用模式',
      'HTTPS 证书一键部署',
      '与 ESS 弹性伸缩联动'
    ],
    awsPrice: 'ALB: $0.0225/小时 + LCU',
    aliyunPrice: 'ALB: ¥0.15/小时 + LCU'
  },
  {
    id: 'waf',
    name: 'WAF 防火墙',
    icon: '🛡️',
    type: 'security',
    awsService: 'AWS WAF',
    aliyunService: 'Web 应用防火墙',
    awsOptions: [
      '托管规则和自定义规则',
      '速率限制和 IP 黑名单',
      '与 CloudFront/ALB 集成',
      'Bot Control 机器人管理'
    ],
    aliyunOptions: [
      '内置防护策略和自定义规则',
      'CC 攻击防护和 IP 封禁',
      '与 CDN/SLB 无缝集成',
      '数据风控和爬虫管理'
    ],
    awsPrice: '$5/月 + $0.6/百万请求',
    aliyunPrice: '¥980/月起 + 流量费'
  },
  {
    id: 'nat',
    name: 'NAT 网关',
    icon: '🚪',
    type: 'network',
    awsService: 'NAT Gateway',
    aliyunService: 'NAT 网关',
    awsOptions: [
      '自动高可用，无需管理',
      '每个 AZ 独立部署',
      '支持 SNAT 出网',
      '流量监控和告警'
    ],
    aliyunOptions: [
      '多可用区容灾',
      '按规格选择带宽',
      'SNAT/DNAT 支持',
      '流量和连接数监控'
    ],
    awsPrice: '$0.045/小时 + $0.045/GB',
    aliyunPrice: '¥0.35/小时 + 流量费'
  }
]

const onDragStart = (event, component) => {
  draggedItem = component
  event.dataTransfer.effectAllowed = 'copy'
}

const onDrop = (event) => {
  event.preventDefault()
  if (draggedItem) {
    canvasItems.value.push({
      ...draggedItem,
      id: `${draggedItem.id}-${Date.now()}`
    })
    draggedItem = null
  }
}

const itemStyle = (index) => {
  const positions = [
    { top: '10%', left: '10%' },
    { top: '10%', right: '10%' },
    { bottom: '10%', left: '10%' },
    { bottom: '10%', right: '10%' },
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  ]
  return positions[index % positions.length]
}

const selectItem = (item) => {
  selectedItem.value = item
}

const removeItem = (index) => {
  canvasItems.value.splice(index, 1)
  if (selectedItem.value && !canvasItems.value.find(i => i.id === selectedItem.value.id)) {
    selectedItem.value = null
  }
}
</script>

<style scoped>
.network-services-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #7b2cbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.network-builder {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.components-panel {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
}

.panel-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: #e6f1ff;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.component-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s ease;
}

.component-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.component-item:active {
  cursor: grabbing;
}

.component-icon {
  font-size: 1.25rem;
}

.component-name {
  font-size: 0.8125rem;
  color: #e6f1ff;
}

.canvas-area {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  min-height: 400px;
}

.network-canvas {
  position: relative;
  width: 100%;
  height: 400px;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

.empty-text {
  font-size: 1rem;
  color: #e6f1ff;
  margin-bottom: 4px;
}

.empty-subtext {
  font-size: 0.8125rem;
  color: #8892b0;
}

.canvas-item {
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.canvas-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: scale(1.05);
}

.canvas-item.network {
  border-color: rgba(0, 212, 255, 0.4);
  background: rgba(0, 212, 255, 0.1);
}

.canvas-item.security {
  border-color: rgba(255, 99, 99, 0.4);
  background: rgba(255, 99, 99, 0.1);
}

.item-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.item-name {
  font-size: 0.8125rem;
  color: #e6f1ff;
  font-weight: 500;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: #ff4444;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.canvas-item:hover .remove-btn {
  opacity: 1;
}

.config-panel {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.config-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.config-icon {
  font-size: 1.25rem;
}

.config-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
  flex: 1;
}

.close-config {
  background: none;
  border: none;
  color: #8892b0;
  font-size: 1.25rem;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-config:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.config-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.config-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 16px;
}

.section-title {
  font-size: 0.75rem;
  color: #ff9900;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.aliyun-title {
  color: #ff6a00;
}

.service-name {
  font-size: 1rem;
  font-weight: 600;
  color: #e6f1ff;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.aliyun-service {
  color: #e6f1ff;
}

.config-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.8125rem;
  color: #e6f1ff;
  line-height: 1.4;
}

.option-check {
  color: #ff9900;
  font-weight: 700;
  flex-shrink: 0;
}

.aliyun-check {
  color: #ff6a00;
}

.config-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.config-footer {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
}

.price-compare {
  display: flex;
  justify-content: space-around;
  gap: 16px;
}

.price-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-label {
  font-size: 0.8125rem;
  color: #8892b0;
}

.price-value {
  font-size: 0.875rem;
  color: #e6f1ff;
  font-weight: 500;
}

.aliyun-price {
  color: #ff6a00;
}

@media (max-width: 768px) {
  .network-builder {
    grid-template-columns: 1fr;
  }

  .components-panel {
    max-height: 200px;
    overflow-y: auto;
  }

  .config-content {
    grid-template-columns: 1fr;
  }

  .config-divider {
    display: none;
  }

  .price-compare {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
