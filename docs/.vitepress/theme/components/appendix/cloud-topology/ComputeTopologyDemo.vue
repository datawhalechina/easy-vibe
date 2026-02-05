<template>
  <div class="compute-topology-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <el-radio-group v-model="viewMode" size="small">
        <el-radio-button label="overview">概览</el-radio-button>
        <el-radio-button label="vm">虚拟机</el-radio-button>
        <el-radio-button label="container">容器</el-radio-button>
        <el-radio-button label="serverless">无服务器</el-radio-button>
      </el-radio-group>

      <el-switch v-model="showMetrics" active-text="显示指标" style="margin-left: 20px" />
    </div>

    <!-- 计算架构图 -->
    <div class="compute-architecture">
      <!-- 物理基础设施层 -->
      <div class="layer physical-layer" v-if="viewMode === 'overview' || viewMode === 'vm'">
        <div class="layer-header">
          <span class="layer-icon">🏭</span>
          <span class="layer-title">物理基础设施</span>
        </div>
        <div class="layer-content">
          <div class="server-rack" v-for="rack in serverRacks" :key="rack.id">
            <div class="rack-header">{{ rack.name }}</div>
            <div class="rack-servers">
              <div v-for="server in rack.servers" :key="server.id" class="server-node">
                <div class="server-indicator" :class="server.status"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 虚拟化层 -->
      <div class="layer virtualization-layer" v-if="viewMode === 'overview' || viewMode === 'vm'">
        <div class="layer-header">
          <span class="layer-icon">🔧</span>
          <span class="layer-title">虚拟化层</span>
        </div>
        <div class="layer-content">
          <div class="hypervisor-cluster">
            <div class="hypervisor" v-for="hv in hypervisors" :key="hv.id">
              <div class="hv-header">
                <span class="hv-icon">🔨</span>
                <span class="hv-name">{{ hv.name }}</span>
              </div>
              <div class="vms-list">
                <div v-for="vm in hv.vms" :key="vm.id" class="vm-item">
                  <div class="vm-info">
                    <span class="vm-icon">💻</span>
                    <span class="vm-name">{{ vm.name }}</span>
                  </div>
                  <div class="vm-metrics" v-if="showMetrics">
                    <div class="metric">
                      <div class="metric-bar">
                        <div class="metric-fill" :style="{ width: vm.cpu + '%' }"></div>
                      </div>
                      <span class="metric-label">CPU</span>
                    </div>
                    <div class="metric">
                      <div class="metric-bar">
                        <div class="metric-fill memory" :style="{ width: vm.memory + '%' }"></div>
                      </div>
                      <span class="metric-label">内存</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 容器层 -->
      <div class="layer container-layer" v-if="viewMode === 'overview' || viewMode === 'container'">
        <div class="layer-header">
          <span class="layer-icon">📦</span>
          <span class="layer-title">容器编排层 (Kubernetes)</span>
        </div>
        <div class="layer-content">
          <div class="k8s-cluster">
            <!-- 控制平面 -->
            <div class="control-plane">
              <div class="cp-title">控制平面</div>
              <div class="cp-components">
                <div class="cp-comp" v-for="comp in controlPlaneComponents" :key="comp.name">
                  <div class="comp-icon">{{ comp.icon }}</div>
                  <div class="comp-name">{{ comp.name }}</div>
                </div>
              </div>
            </div>

            <!-- 工作节点 -->
            <div class="worker-nodes">
              <div class="nodes-title">工作节点</div>
              <div class="nodes-grid">
                <div class="node" v-for="node in workerNodes" :key="node.name">
                  <div class="node-header">
                    <span class="node-icon">🔧</span>
                    <span class="node-name">{{ node.name }}</span>
                    <span class="node-status" :class="node.status"></span>
                  </div>
                  <div class="pods-list">
                    <div class="pod" v-for="pod in node.pods" :key="pod.name">
                      <div class="pod-color" :style="{ background: pod.color }"></div>
                      <span class="pod-name">{{ pod.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 无服务器层 -->
      <div class="layer serverless-layer" v-if="viewMode === 'overview' || viewMode === 'serverless'">
        <div class="layer-header">
          <span class="layer-icon">⚡</span>
          <span class="layer-title">无服务器计算 (Function Compute)</span>
        </div>
        <div class="layer-content">
          <div class="serverless-arch">
            <!-- 触发器 -->
            <div class="triggers-section">
              <div class="section-title">触发器</div>
              <div class="triggers-list">
                <div class="trigger" v-for="trigger in triggers" :key="trigger.name">
                  <div class="trigger-icon">{{ trigger.icon }}</div>
                  <div class="trigger-name">{{ trigger.name }}</div>
                </div>
              </div>
            </div>

            <!-- 函数计算 -->
            <div class="functions-section">
              <div class="section-title">函数计算实例</div>
              <div class="functions-list">
                <div class="function-card" v-for="func in functions" :key="func.name">
                  <div class="func-header">
                    <span class="func-icon">⚙️</span>
                    <span class="func-name">{{ func.name }}</span>
                  </div>
                  <div class="func-metrics" v-if="showMetrics">
                    <div class="metric-row">
                      <span class="metric-label">并发：</span>
                      <div class="concurrency-bar">
                        <div class="concurrency-fill" :style="{ width: (func.concurrency / 100 * 100) + '%' }"></div>
                      </div>
                      <span class="metric-value">{{ func.concurrency }}</span>
                    </div>
                    <div class="metric-row">
                      <span class="metric-label">冷启动：</span>
                      <span class="metric-value">{{ func.coldStart }}ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 后端服务 -->
            <div class="backend-section">
              <div class="section-title">后端服务</div>
              <div class="backend-services">
                <div class="service" v-for="svc in backendServices" :key="svc.name">
                  <div class="service-icon">{{ svc.icon }}</div>
                  <div class="service-name">{{ svc.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <div class="architecture-legend">
      <div class="legend-title">计算资源类型说明：</div>
      <div class="legend-items">
        <div class="legend-item">
          <span class="legend-icon">🔧</span>
          <span class="legend-text">虚拟机 (ECS)：完整 OS 控制，适合传统应用</span>
        </div>
        <div class="legend-item">
          <span class="legend-icon">📦</span>
          <span class="legend-text">容器 (K8s)：轻量级隔离，适合微服务</span>
        </div>
        <div class="legend-item">
          <span class="legend-icon">⚡</span>
          <span class="legend-text">无服务器 (FC)：事件驱动，按需付费</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const viewMode = ref('overview')
const showMetrics = ref(false)

// 物理服务器
const serverRacks = [
  {
    id: 'rack-1',
    name: '机柜 A',
    servers: Array(8).fill(null).map((_, i) => ({
      id: `srv-a-${i}`,
      status: i < 6 ? 'online' : 'offline'
    }))
  },
  {
    id: 'rack-2',
    name: '机柜 B',
    servers: Array(8).fill(null).map((_, i) => ({
      id: `srv-b-${i}`,
      status: i < 7 ? 'online' : 'standby'
    }))
  }
]

// 虚拟化层
const hypervisors = [
  {
    id: 'hv-1',
    name: 'Hypervisor-01',
    vms: [
      { id: 'vm-1', name: 'Web-01', cpu: 45, memory: 60 },
      { id: 'vm-2', name: 'Web-02', cpu: 32, memory: 45 },
      { id: 'vm-3', name: 'App-01', cpu: 67, memory: 78 }
    ]
  },
  {
    id: 'hv-2',
    name: 'Hypervisor-02',
    vms: [
      { id: 'vm-4', name: 'Web-03', cpu: 28, memory: 35 },
      { id: 'vm-5', name: 'DB-01', cpu: 82, memory: 88 },
      { id: 'vm-6', name: 'Cache-01', cpu: 45, memory: 55 }
    ]
  }
]

// K8s 控制平面
const controlPlaneComponents = [
  { name: 'API Server', icon: '🔌' },
  { name: 'etcd', icon: '📚' },
  { name: 'Scheduler', icon: '📅' },
  { name: 'Controller', icon: '🎮' }
]

// 工作节点
const workerNodes = [
  {
    name: 'Node-1',
    status: 'ready',
    pods: [
      { name: 'frontend-1', color: '#409eff' },
      { name: 'frontend-2', color: '#409eff' },
      { name: 'api-1', color: '#67c23a' }
    ]
  },
  {
    name: 'Node-2',
    status: 'ready',
    pods: [
      { name: 'api-2', color: '#67c23a' },
      { name: 'worker-1', color: '#e6a23c' },
      { name: 'cache-1', color: '#f56c6c' }
    ]
  },
  {
    name: 'Node-3',
    status: 'ready',
    pods: [
      { name: 'api-3', color: '#67c23a' },
      { name: 'worker-2', color: '#e6a23c' }
    ]
  }
]

// Serverless 触发器
const triggers = [
  { name: 'HTTP 请求', icon: '🌐' },
  { name: '定时任务', icon: '⏰' },
  { name: 'OSS 事件', icon: '📦' },
  { name: '消息队列', icon: '📨' }
]

// 函数列表
const functions = [
  { name: 'user-service', runtime: 'Node.js', concurrency: 45, coldStart: 120 },
  { name: 'order-processor', runtime: 'Python', concurrency: 32, coldStart: 85 },
  { name: 'image-resizer', runtime: 'Go', concurrency: 18, coldStart: 45 }
]

// 后端服务
const backendServices = [
  { name: 'API 网关', icon: '🚪' },
  { name: '对象存储', icon: '🪣' },
  { name: '数据库', icon: '🗄️' },
  { name: '缓存', icon: '⚡' }
]
</script>

<style scoped>
.compute-topology-demo {
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

.compute-architecture {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layer {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.layer-title {
  font-size: 14px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Physical Layer */
.layer-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.server-rack {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
}

.rack-header {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 8px;
}

.rack-servers {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
}

.server-node {
  aspect-ratio: 1;
  background: #dcdfe6;
  border-radius: 4px;
  position: relative;
}

.server-indicator {
  position: absolute;
  inset: 2px;
  border-radius: 2px;
}

.server-indicator.online {
  background: #67c23a;
}

.server-indicator.offline {
  background: #f56c6c;
}

.server-indicator.standby {
  background: #e6a23c;
}

/* Hypervisor Layer */
.hypervisor-cluster {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.hypervisor {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
}

.hv-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e4e7ed;
}

.hv-icon {
  font-size: 18px;
}

.hv-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.vms-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vm-item {
  background: white;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vm-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.vm-icon {
  font-size: 14px;
}

.vm-name {
  font-size: 13px;
  color: #606266;
  font-weight: 500;
}

.vm-metrics {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 6px;
}

.metric-bar {
  flex: 1;
  height: 4px;
  background: #e4e7ed;
  border-radius: 2px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: #409eff;
  border-radius: 2px;
  transition: width 0.3s;
}

.metric-fill.memory {
  background: #67c23a;
}

.metric-label {
  font-size: 11px;
  color: #909399;
  width: 40px;
}

/* Container Layer */
.k8s-cluster {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-plane {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 12px;
}

.cp-title {
  font-size: 13px;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 10px;
}

.cp-components {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.cp-comp {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0f2fe;
}

.comp-icon {
  font-size: 14px;
}

.comp-name {
  font-size: 12px;
  color: #0c4a6e;
}

.worker-nodes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nodes-title {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
}

.nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.node {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.node-icon {
  font-size: 14px;
}

.node-name {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #334155;
}

.node-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.node-status.ready {
  background: #22c55e;
}

.pods-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pod {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.pod-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.pod-name {
  font-size: 11px;
  color: #64748b;
}

/* Serverless Layer */
.serverless-arch {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.triggers-section,
.functions-section,
.backend-section {
  background: #fafafa;
  border-radius: 8px;
  padding: 12px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 10px;
}

.triggers-list,
.backend-services {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.trigger,
.service {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.trigger-icon,
.service-icon {
  font-size: 16px;
}

.trigger-name,
.service-name {
  font-size: 12px;
  color: #606266;
}

.functions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.function-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 12px;
}

.func-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f2f5;
}

.func-icon {
  font-size: 14px;
}

.func-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.func-metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-row .metric-label {
  width: 60px;
  font-size: 11px;
}

.concurrency-bar {
  flex: 1;
  height: 4px;
  background: #e4e7ed;
  border-radius: 2px;
  overflow: hidden;
}

.concurrency-fill {
  height: 100%;
  background: #67c23a;
  border-radius: 2px;
  transition: width 0.3s;
}

.metric-value {
  font-size: 11px;
  color: #909399;
  width: 40px;
  text-align: right;
}

/* Status Legend */
.architecture-legend {
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 6px;
}

.legend-icon {
  font-size: 20px;
}

.legend-text {
  font-size: 13px;
  color: #606266;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .hypervisor-cluster,
  .nodes-grid,
  .functions-list {
    grid-template-columns: 1fr;
  }
}
</style>
