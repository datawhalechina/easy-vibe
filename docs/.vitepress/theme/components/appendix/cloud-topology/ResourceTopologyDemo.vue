<template>
  <div class="resource-topology-demo">
    <div class="controls">
      <el-radio-group v-model="viewMode" size="small">
        <el-radio-button label="overview">全景视图</el-radio-button>
        <el-radio-button label="compute">计算视角</el-radio-button>
        <el-radio-button label="network">网络视角</el-radio-button>
        <el-radio-button label="storage">存储视角</el-radio-button>
      </el-radio-group>
    </div>

    <div class="topology-container" ref="topologyRef">
      <!-- 云服务商层 -->
      <div class="layer cloud-provider">
        <div class="layer-title">☁️ 云服务商</div>
        <div class="provider-grid">
          <div v-for="provider in providers" :key="provider.name"
               class="provider-card"
               :class="{ active: selectedProvider === provider.name }"
               @click="selectProvider(provider.name)">
            <div class="provider-icon">{{ provider.icon }}</div>
            <div class="provider-name">{{ provider.name }}</div>
          </div>
        </div>
      </div>

      <!-- 连接箭头 -->
      <div class="connection-arrow">⬇️</div>

      <!-- 地域/可用区层 -->
      <div class="layer region-layer">
        <div class="layer-title">🌍 地域 & 可用区</div>
        <div class="region-grid">
          <div v-for="region in regions" :key="region.id"
               class="region-card"
               :class="{ active: selectedRegion === region.id }"
               @click="selectRegion(region.id)">
            <div class="region-name">{{ region.name }}</div>
            <div class="region-azs">
              <span v-for="az in region.azs" :key="az" class="az-badge">{{ az }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 连接箭头 -->
      <div class="connection-arrow">⬇️</div>

      <!-- 资源拓扑层 -->
      <div class="layer resource-layer">
        <div class="layer-title">🎯 资源拓扑</div>
        <div class="resource-grid">
          <!-- 计算资源 -->
          <div class="resource-category" :class="{ highlight: viewMode === 'compute' || viewMode === 'overview' }">
            <div class="category-title">💻 计算</div>
            <div class="resource-list">
              <div v-for="item in computeResources" :key="item.name" class="resource-item">
                <span class="resource-icon">{{ item.icon }}</span>
                <span class="resource-name">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <!-- 网络资源 -->
          <div class="resource-category" :class="{ highlight: viewMode === 'network' || viewMode === 'overview' }">
            <div class="category-title">🌐 网络</div>
            <div class="resource-list">
              <div v-for="item in networkResources" :key="item.name" class="resource-item">
                <span class="resource-icon">{{ item.icon }}</span>
                <span class="resource-name">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <!-- 存储资源 -->
          <div class="resource-category" :class="{ highlight: viewMode === 'storage' || viewMode === 'overview' }">
            <div class="category-title">💾 存储</div>
            <div class="resource-list">
              <div v-for="item in storageResources" :key="item.name" class="resource-item">
                <span class="resource-icon">{{ item.icon }}</span>
                <span class="resource-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 信息面板 -->
    <div class="info-panel" v-if="showInfo">
      <div class="info-header">
        <h4>💡 拓扑说明</h4>
        <el-button type="text" @click="showInfo = false">关闭</el-button>
      </div>
      <div class="info-content">
        <p><strong>当前视图：</strong>{{ viewModeText }}</p>
        <p><strong>选中云商：</strong>{{ selectedProvider || '未选择' }}</p>
        <p><strong>选中地域：</strong>{{ selectedRegion || '未选择' }}</p>
        <p class="tip">💡 提示：点击云服务商和地域可以查看不同组合的资源拓扑</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode = ref('overview')
const selectedProvider = ref('阿里云')
const selectedRegion = ref('cn-beijing')
const showInfo = ref(true)

const providers = [
  { name: '阿里云', icon: '☁️' },
  { name: '腾讯云', icon: '🌟' },
  { name: '华为云', icon: '🔥' },
  { name: 'AWS', icon: '📦' }
]

const regions = [
  { id: 'cn-beijing', name: '华北2 (北京)', azs: ['A', 'B', 'C', 'D', 'E'] },
  { id: 'cn-shanghai', name: '华东2 (上海)', azs: ['A', 'B', 'C', 'D', 'E', 'F'] },
  { id: 'cn-shenzhen', name: '华南1 (深圳)', azs: ['A', 'B', 'C', 'D'] },
  { id: 'cn-hangzhou', name: '华东1 (杭州)', azs: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] }
]

const computeResources = [
  { name: '云服务器 ECS', icon: '🖥️' },
  { name: '容器服务 K8s', icon: '📦' },
  { name: '函数计算 FC', icon: '⚡' },
  { name: '裸金属服务器', icon: '🔧' }
]

const networkResources = [
  { name: '专有网络 VPC', icon: '🕸️' },
  { name: '负载均衡 SLB', icon: '⚖️' },
  { name: '弹性公网 IP', icon: '🌍' },
  { name: 'VPN 网关', icon: '🔒' }
]

const storageResources = [
  { name: '对象存储 OSS', icon: '🪣' },
  { name: '块存储 EBS', icon: '💽' },
  { name: '文件存储 NAS', icon: '📁' },
  { name: '日志服务 SLS', icon: '📋' }
]

const viewModeText = computed(() => {
  const map = {
    overview: '全景视图 - 查看完整资源拓扑',
    compute: '计算视角 - 聚焦计算资源',
    network: '网络视角 - 聚焦网络资源',
    storage: '存储视角 - 聚焦存储资源'
  }
  return map[viewMode.value]
})

const selectProvider = (name) => {
  selectedProvider.value = name
}

const selectRegion = (id) => {
  selectedRegion.value = id
}
</script>

<style scoped>
.resource-topology-demo {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.controls {
  margin-bottom: 20px;
  text-align: center;
}

.topology-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layer {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.layer-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e4e7ed;
}

.connection-arrow {
  text-align: center;
  font-size: 24px;
  color: #909399;
  padding: 8px 0;
}

/* Provider Grid */
.provider-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.provider-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.provider-card:hover {
  border-color: #409eff;
  transform: translateY(-2px);
}

.provider-card.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.provider-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.provider-name {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

/* Region Grid */
.region-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.region-card {
  padding: 12px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.region-card:hover {
  border-color: #67c23a;
}

.region-card.active {
  border-color: #67c23a;
  background: #f0f9eb;
}

.region-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.region-azs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.az-badge {
  padding: 2px 6px;
  background: #e4e7ed;
  border-radius: 4px;
  font-size: 11px;
  color: #606266;
}

.region-card.active .az-badge {
  background: #67c23a;
  color: white;
}

/* Resource Grid */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.resource-category {
  padding: 16px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  transition: all 0.3s;
}

.resource-category.highlight {
  border-color: #409eff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.2);
}

.category-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e4e7ed;
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 6px;
  transition: all 0.2s;
}

.resource-item:hover {
  background: #ecf5ff;
  transform: translateX(4px);
}

.resource-icon {
  font-size: 18px;
}

.resource-name {
  font-size: 13px;
  color: #606266;
}

/* Info Panel */
.info-panel {
  margin-top: 20px;
  padding: 16px;
  background: #f0f9eb;
  border-radius: 8px;
  border-left: 4px solid #67c23a;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.info-header h4 {
  margin: 0;
  color: #67c23a;
}

.info-content p {
  margin: 8px 0;
  color: #606266;
  font-size: 14px;
}

.info-content .tip {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #dcdfe6;
  color: #909399;
  font-size: 13px;
}

@media (max-width: 768px) {
  .provider-grid,
  .region-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .resource-grid {
    grid-template-columns: 1fr;
  }
}
</style>
