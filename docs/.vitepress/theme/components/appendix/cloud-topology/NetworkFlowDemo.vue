<template>
  <div class="network-flow-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <el-radio-group v-model="flowMode" size="small">
        <el-radio-button label="inbound">入向流量</el-radio-button>
        <el-radio-button label="outbound">出向流量</el-radio-button>
        <el-radio-button label="east-west">东西向流量</el-radio-button>
        <el-radio-button label="full">完整拓扑</el-radio-button>
      </el-radio-group>

      <el-switch v-model="showMetrics" active-text="显示流量数据" style="margin-left: 20px" />
    </div>

    <!-- 网络拓扑图 -->
    <div class="network-topology">
      <!-- 互联网区域 -->
      <div class="zone internet-zone" v-if="showInternet">
        <div class="zone-header">
          <span class="zone-icon">🌐</span>
          <span class="zone-title">互联网 (Internet)</span>
        </div>
        <div class="zone-content">
          <div class="internet-entities">
            <div class="entity" v-for="entity in internetEntities" :key="entity.name">
              <div class="entity-icon">{{ entity.icon }}</div>
              <div class="entity-name">{{ entity.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 流量箭头 -->
      <div class="flow-arrows" v-if="showFlowArrows">
        <div class="arrow-container">
          <div class="flow-line" :class="flowMode"></div>
          <div class="flow-particles" v-if="showMetrics">
            <div class="particle" v-for="n in 5" :key="n"
                 :style="{ animationDelay: (n * 0.5) + 's' }"></div>
          </div>
        </div>

        <div class="flow-stats" v-if="showMetrics">
          <div class="stat-item">
            <div class="stat-label">带宽</div>
            <div class="stat-value">2.5 Gbps</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">流量</div>
            <div class="stat-value">1.2 TB/天</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">延迟</div>
            <div class="stat-value">15 ms</div>
          </div>
        </div>
      </div>

      <!-- VPC 区域 -->
      <div class="zone vpc-zone">
        <div class="zone-header">
          <span class="zone-icon">🏠</span>
          <span class="zone-title">VPC 网络 (172.16.0.0/12)</span>
        </div>
        <div class="zone-content">
          <!-- 网络设备层 -->
          <div class="network-devices">
            <div class="device" v-for="device in networkDevices" :key="device.name"
                 :class="device.type">
              <div class="device-icon">{{ device.icon }}</div>
              <div class="device-name">{{ device.name }}</div>

              <div class="device-stats" v-if="showMetrics">
                <div class="stat">
                  <span class="stat-label">吞吐</span>
                  <span class="stat-value">{{ device.throughput }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">并发</span>
                  <span class="stat-value">{{ device.connections }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 子网层 -->
          <div class="subnets-container">
            <div class="subnet" v-for="subnet in subnets" :key="subnet.name"
                 :class="subnet.type">
              <div class="subnet-header">
                <span class="subnet-type-icon">{{ subnet.type === 'public' ? '🌐' : '🔒' }}</span>
                <span class="subnet-name">{{ subnet.name }}</span>
                <span class="subnet-cidr">{{ subnet.cidr }}</span>
              </div>

              <div class="subnet-resources">
                <div class="resource" v-for="resource in subnet.resources" :key="resource.name">
                  <div class="resource-icon">{{ resource.icon }}</div>
                  <div class="resource-info">
                    <div class="resource-name">{{ resource.name }}</div>
                    <div class="resource-ip">{{ resource.ip }}</div>
                  </div>

                  <div class="resource-traffic" v-if="showMetrics">
                    <div class="traffic-in">
                      <span class="traffic-label">↓</span>
                      <span class="traffic-value">{{ resource.inTraffic }}</span>
                    </div>
                    <div class="traffic-out">
                      <span class="traffic-label">↑</span>
                      <span class="traffic-value">{{ resource.outTraffic }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图例说明 -->
    <div class="network-legend">
      <div class="legend-title">流量类型说明：</div>
      <div class="legend-items">
        <div class="legend-item">
          <span class="legend-color inbound"></span>
          <span>入向流量：用户 → 服务器</span>
        </div>
        <div class="legend-item">
          <span class="legend-color outbound"></span>
          <span>出向流量：服务器 → 外部</span>
        </div>
        <div class="legend-item">
          <span class="legend-color east-west"></span>
          <span>东西向流量：服务间通信</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const flowMode = ref('inbound')
const showMetrics = ref(false)

// 显示互联网
const showInternet = computed(() => {
  return ['inbound', 'outbound', 'full'].includes(flowMode.value)
})

// 显示流量箭头
const showFlowArrows = computed(() => {
  return ['inbound', 'outbound', 'east-west', 'full'].includes(flowMode.value)
})

// 互联网实体
const internetEntities = [
  { name: '移动用户', icon: '📱' },
  { name: 'PC 用户', icon: '💻' },
  { name: '企业网络', icon: '🏢' },
  { name: '第三方 API', icon: '🔗' }
]

// 网络设备
const networkDevices = [
  { name: 'Internet Gateway', icon: '🌐', type: 'igw', throughput: '10 Gbps', connections: '10M' },
  { name: 'NAT Gateway', icon: '🔄', type: 'nat', throughput: '5 Gbps', connections: '1M' },
  { name: 'Load Balancer', icon: '⚖️', type: 'slb', throughput: '8 Gbps', connections: '500K' },
  { name: 'VPN Gateway', icon: '🔒', type: 'vpn', throughput: '1 Gbps', connections: '1K' }
]

// 子网
const subnets = [
  {
    name: 'Public-Subnet-A',
    type: 'public',
    cidr: '172.16.1.0/24',
    resources: [
      { name: 'Nginx-LB-01', icon: '⚖️', ip: '172.16.1.10', inTraffic: '850 MB/s', outTraffic: '2.1 GB/s' },
      { name: 'Nginx-LB-02', icon: '⚖️', ip: '172.16.1.11', inTraffic: '780 MB/s', outTraffic: '1.9 GB/s' },
      { name: 'Bastion-Host', icon: '🔧', ip: '172.16.1.20', inTraffic: '5 MB/s', outTraffic: '12 MB/s' }
    ]
  },
  {
    name: 'Private-Subnet-A',
    type: 'private',
    cidr: '172.16.2.0/24',
    resources: [
      { name: 'App-Server-01', icon: '💻', ip: '172.16.2.10', inTraffic: '450 MB/s', outTraffic: '320 MB/s' },
      { name: 'App-Server-02', icon: '💻', ip: '172.16.2.11', inTraffic: '420 MB/s', outTraffic: '290 MB/s' },
      { name: 'App-Server-03', icon: '💻', ip: '172.16.2.12', inTraffic: '380 MB/s', outTraffic: '260 MB/s' }
    ]
  },
  {
    name: 'Data-Subnet-A',
    type: 'private',
    cidr: '172.16.3.0/24',
    resources: [
      { name: 'MySQL-Primary', icon: '🗄️', ip: '172.16.3.10', inTraffic: '120 MB/s', outTraffic: '180 MB/s' },
      { name: 'MySQL-Replica', icon: '🗄️', ip: '172.16.3.11', inTraffic: '80 MB/s', outTraffic: '95 MB/s' },
      { name: 'Redis-Cluster', icon: '⚡', ip: '172.16.3.20', inTraffic: '45 MB/s', outTraffic: '68 MB/s' }
    ]
  }
]
</script>

<style scoped>
.network-flow-demo {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 12px;
}

.network-topology {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.zone {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.zone-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
}

.zone-icon {
  font-size: 20px;
}

.zone-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

/* Internet Zone */
.internet-entities {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.entity {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 8px;
  min-width: 80px;
}

.entity-icon {
  font-size: 24px;
}

.entity-name {
  font-size: 12px;
  color: #606266;
}

/* Flow Arrows */
.flow-arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.arrow-container {
  position: relative;
  width: 100%;
  height: 40px;
}

.flow-line {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 4px;
  background: #e4e7ed;
  border-radius: 2px;
  transform: translateY(-50%);
}

.flow-line.inbound {
  background: linear-gradient(to right, #409eff, #67c23a);
}

.flow-line.outbound {
  background: linear-gradient(to left, #409eff, #e6a23c);
}

.flow-line.east-west {
  background: linear-gradient(to right, #67c23a, #409eff, #67c23a);
}

.flow-line.full {
  background: linear-gradient(90deg, #409eff, #67c23a, #e6a23c, #f56c6c);
}

.flow-particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  top: 50%;
  left: 10%;
  width: 8px;
  height: 8px;
  background: #409eff;
  border-radius: 50%;
  transform: translateY(-50%);
  animation: flow 2s linear infinite;
}

@keyframes flow {
  0% {
    left: 10%;
    opacity: 1;
  }
  100% {
    left: 90%;
    opacity: 0;
  }
}

.flow-stats {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 11px;
  color: #909399;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #409eff;
}

/* VPC Zone */
.vpc-zone {
  border: 2px solid #409eff;
}

/* Network Devices */
.network-devices {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #e4e7ed;
}

.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
  min-width: 100px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.device:hover {
  border-color: #409eff;
  transform: translateY(-2px);
}

.device.igw {
  border-color: #409eff;
  background: #ecf5ff;
}

.device.nat {
  border-color: #67c23a;
  background: #f0f9eb;
}

.device.slb {
  border-color: #e6a23c;
  background: #fdf6ec;
}

.device.vpn {
  border-color: #909399;
  background: #f4f4f5;
}

.device-icon {
  font-size: 24px;
}

.device-name {
  font-size: 12px;
  font-weight: 500;
  color: #303133;
}

.device-stats {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  padding-top: 6px;
  border-top: 1px solid #e4e7ed;
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}

.stat-label {
  color: #909399;
}

.stat-value {
  color: #409eff;
  font-weight: 500;
}

/* Subnets */
.subnets-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subnet {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
  border-left: 4px solid;
}

.subnet.public {
  border-left-color: #409eff;
}

.subnet.private {
  border-left-color: #67c23a;
}

.subnet-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e4e7ed;
}

.subnet-type-icon {
  font-size: 14px;
}

.subnet-name {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.subnet-cidr {
  font-size: 11px;
  padding: 2px 8px;
  background: #e4e7ed;
  border-radius: 10px;
  color: #606266;
  font-family: monospace;
}

.subnet-resources {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.resource {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
  flex: 1;
  min-width: 200px;
}

.resource-icon {
  font-size: 18px;
}

.resource-info {
  flex: 1;
}

.resource-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.resource-ip {
  font-size: 11px;
  color: #909399;
  font-family: monospace;
}

.resource-traffic {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 8px;
  border-left: 1px solid #e4e7ed;
}

.traffic-in,
.traffic-out {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
}

.traffic-label {
  color: #909399;
  font-weight: 600;
}

.traffic-value {
  color: #409eff;
  font-weight: 500;
}

/* Network Legend */
.network-legend {
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.legend-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #606266;
}

.legend-color {
  width: 20px;
  height: 4px;
  border-radius: 2px;
}

.legend-color.inbound {
  background: linear-gradient(to right, #409eff, #67c23a);
}

.legend-color.outbound {
  background: linear-gradient(to right, #409eff, #e6a23c);
}

.legend-color.east-west {
  background: linear-gradient(to right, #67c23a, #409eff, #67c23a);
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .network-devices {
    justify-content: center;
  }

  .resource {
    min-width: 100%;
  }

  .flow-stats {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
