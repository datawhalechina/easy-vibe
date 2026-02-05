<template>
  <div class="vpc-architecture-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <el-radio-group v-model="viewMode" size="small">
        <el-radio-button label="full">完整架构</el-radio-button>
        <el-radio-button label="public">公网访问</el-radio-button>
        <el-radio-button label="private">私网隔离</el-radio-button>
        <el-radio-button label="hybrid">混合云</el-radio-button>
      </el-radio-group>
      <el-switch
        v-model="showDetails"
        active-text="显示详情"
        style="margin-left: 20px"
      />
    </div>

    <!-- VPC 架构图 -->
    <div class="vpc-container">
      <!-- 外部互联网 -->
      <div class="internet-zone" v-if="showInternet">
        <div class="zone-header">
          <span class="zone-icon">🌐</span>
          <span class="zone-title">互联网 (Internet)</span>
        </div>
        <div class="zone-content">
          <div class="internet-user">
            <div class="user-avatar">👤</div>
            <div class="user-label">用户</div>
          </div>
          <div class="internet-user">
            <div class="user-avatar">🏢</div>
            <div class="user-label">企业</div>
          </div>
        </div>
      </div>

      <!-- 连接箭头 -->
      <div class="connection-flow" v-if="showInternet">
        <div class="flow-line"></div>
        <div class="flow-devices">
          <div class="device" v-for="device in borderDevices" :key="device.name"
               :class="device.type"
               @mouseenter="hoverDevice = device.name"
               @mouseleave="hoverDevice = null"
003e
            <div class="device-icon">{{ device.icon }}</div>
            <div class="device-name">{{ device.name }}</div>
            <div class="device-tooltip" v-if="hoverDevice === device.name && showDetails">
              {{ device.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- VPC 主体 -->
      <div class="vpc-zone">
        <div class="vpc-header">
          <div class="vpc-title">
            <span class="vpc-icon">🏠</span>
            <span>专有网络 VPC</span>
            <span class="vpc-id">vpc-2ze7p8w7c9d6x5y4</span>
          </div>
          <div class="vpc-meta">
            <span class="meta-item">📍 华北2 (北京)</span>
            <span class="meta-item">🌐 172.16.0.0/12</span>
          </div>
        </div>

        <div class="vpc-content">
          <!-- 可用区 1 -->
          <div class="az-container">
            <div class="az-header">
              <span class="az-name">可用区 A</span>
              <span class="az-status online">在线</span>
            </div>
            <div class="subnets">
              <div class="subnet public"
                   @mouseenter="hoverSubnet = 'public-a'"
                   @mouseleave="hoverSubnet = null">
                <div class="subnet-header">
                  <span class="subnet-type">🌐 公网子网</span>
                  <span class="subnet-cidr">172.16.1.0/24</span>
                </div>
                <div class="subnet-resources">
                  <div class="resource-tag">🖥️ ECS × 2</div>
                  <div class="resource-tag">⚖️ SLB</div>
                  <div class="resource-tag">🌐 NAT</div>
                </div>
                <div class="subnet-tooltip" v-if="hoverSubnet === 'public-a' && showDetails">
                  公网子网：可直接访问互联网，部署对外服务
                </div>
              </div>

              <div class="subnet private"
                   @mouseenter="hoverSubnet = 'private-a'"
                   @mouseleave="hoverSubnet = null">
                <div class="subnet-header">
                  <span class="subnet-type">🔒 私网子网</span>
                  <span class="subnet-cidr">172.16.2.0/24</span>
                </div>
                <div class="subnet-resources">
                  <div class="resource-tag">🖥️ ECS × 4</div>
                  <div class="resource-tag">🗄️ RDS</div>
                  <div class="resource-tag">📦 Redis</div>
                </div>
                <div class="subnet-tooltip" v-if="hoverSubnet === 'private-a' && showDetails">
                  私网子网：无法直接访问互联网，部署核心服务
                </div>
              </div>
            </div>
          </div>

          <!-- 可用区 2 -->
          <div class="az-container">
            <div class="az-header">
              <span class="az-name">可用区 B</span>
              <span class="az-status online">在线</span>
            </div>
            <div class="subnets">
              <div class="subnet public">
                <div class="subnet-header">
                  <span class="subnet-type">🌐 公网子网</span>
                  <span class="subnet-cidr">172.16.3.0/24</span>
                </div>
                <div class="subnet-resources">
                  <div class="resource-tag">🖥️ ECS × 2</div>
                  <div class="resource-tag">⚖️ SLB</div>
                </div>
              </div>

              <div class="subnet private">
                <div class="subnet-header">
                  <span class="subnet-type">🔒 私网子网</span>
                  <span class="subnet-cidr">172.16.4.0/24</span>
                </div>
                <div class="subnet-resources">
                  <div class="resource-tag">🖥️ ECS × 4</div>
                  <div class="resource-tag">🗄️ RDS Slave</div>
                  <div class="resource-tag">📦 Redis Slave</div>
                </div>
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

const viewMode = ref('full')
const showDetails = ref(false)
const hoverDevice = ref(null)
const hoverSubnet = ref(null)

const showInternet = computed(() => {
  return ['full', 'public', 'hybrid'].includes(viewMode.value)
})

const borderDevices = [
  {
    name: '边界路由器',
    icon: '📡',
    type: 'router',
    description: '连接VPC与互联网的核心路由设备'
  },
  {
    name: 'NAT网关',
    icon: '🔄',
    type: 'nat',
    description: '实现私网资源访问互联网的地址转换'
  },
  {
    name: '负载均衡',
    icon: '⚖️',
    type: 'slb',
    description: '分发公网流量到多台后端服务器'
  }
]
</script>

<style scoped>
.vpc-architecture-demo {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.vpc-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Internet Zone */
.internet-zone {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #90caf9;
}

.zone-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.zone-icon {
  font-size: 20px;
}

.zone-title {
  font-size: 16px;
  font-weight: 600;
  color: #1565c0;
}

.zone-content {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.internet-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.user-avatar {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-label {
  font-size: 12px;
  color: #546e7a;
}

/* Connection Flow */
.connection-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flow-line {
  width: 4px;
  height: 24px;
  background: linear-gradient(to bottom, #90caf9, #4caf50);
  border-radius: 2px;
}

.flow-devices {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.device:hover {
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.device.router {
  border-color: #ff9800;
}

.device.nat {
  border-color: #9c27b0;
}

.device.slb {
  border-color: #2196f3;
}

.device-icon {
  font-size: 24px;
}

.device-name {
  font-size: 12px;
  font-weight: 500;
  color: #424242;
}

.device-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background: #333;
  color: white;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 10;
  margin-bottom: 8px;
}

.device-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #333;
}

/* VPC Zone */
.vpc-zone {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #409eff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.1);
}

.vpc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.vpc-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.vpc-icon {
  font-size: 20px;
}

.vpc-id {
  font-size: 12px;
  color: #909399;
  font-weight: normal;
  margin-left: 8px;
}

.vpc-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  font-size: 13px;
  color: #606266;
}

.vpc-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* AZ Container */
.az-container {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
}

.az-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.az-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.az-status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.az-status.online {
  background: #e1f3d8;
  color: #67c23a;
}

.subnets {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subnet {
  background: white;
  border-radius: 6px;
  padding: 10px;
  border: 2px solid #e4e7ed;
  transition: all 0.3s;
  position: relative;
}

.subnet:hover {
  transform: translateX(4px);
}

.subnet.public {
  border-left: 4px solid #409eff;
}

.subnet.private {
  border-left: 4px solid #67c23a;
}

.subnet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.subnet-type {
  font-size: 13px;
  font-weight: 600;
  color: #303133;
}

.subnet-cidr {
  font-size: 11px;
  padding: 2px 6px;
  background: #f0f2f5;
  border-radius: 4px;
  color: #606266;
  font-family: monospace;
}

.subnet-resources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.resource-tag {
  font-size: 11px;
  padding: 3px 8px;
  background: #ecf5ff;
  border-radius: 4px;
  color: #409eff;
}

.subnet-tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  padding: 8px 12px;
  background: #333;
  color: white;
  font-size: 12px;
  border-radius: 6px;
  z-index: 10;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .vpc-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .vpc-meta {
    flex-wrap: wrap;
  }
}
</style>
