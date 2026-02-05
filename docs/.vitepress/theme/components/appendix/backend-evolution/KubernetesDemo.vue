<template>
  <div class="kubernetes-demo">
    <div class="demo-header">
      <h4>☸️ Kubernetes 编排演示</h4>
      <p>观察 K8s 如何自动调度容器、实现负载均衡和故障恢复</p>
    </div>

    <div class="k8s-architecture">
      <div class="control-plane">
        <div class="plane-title">控制平面 (Control Plane)</div>
        <div class="components">
          <div class="component" v-for="comp in controlPlane" :key="comp.name"
               :class="{ active: activeComponent === comp.name }"
               @click="activeComponent = comp.name">
            <div class="comp-icon">{{ comp.icon }}</div>
            <div class="comp-name">{{ comp.name }}</div>
            <div class="comp-desc">{{ comp.desc }}</div>
          </div>
        </div>
      </div>

      <div class="worker-nodes">
        <div class="plane-title">工作节点 (Worker Nodes)</div>
        <div class="nodes-container">
          <div class="node" v-for="node in workerNodes" :key="node.name"
               :class="{
                 active: node.status === 'active',
                 failed: node.status === 'failed',
                 selected: selectedNode === node.name
               }"
               @click="selectNode(node.name)">
            <div class="node-header">
              <span class="node-icon">{{ node.icon }}</span>
              <span class="node-name">{{ node.name }}</span>
              <span class="node-status" :class="node.status">{{ node.statusText }}</span>
            </div>
            <div class="node-resources">
              <div class="resource">
                <span class="res-label">CPU:</span>
                <div class="res-bar">
                  <div class="res-fill" :style="{ width: node.cpu + '%' }" :class="{ high: node.cpu > 80 }"></div>
                </div>
                <span class="res-value">{{ node.cpu }}%</span>
              </div>
              <div class="resource">
                <span class="res-label">内存:</span>
                <div class="res-bar">
                  <div class="res-fill" :style="{ width: node.memory + '%' }" :class="{ high: node.memory > 80 }"></div>
                </div>
                <span class="res-value">{{ node.memory }}%</span>
              </div>
            </div>
            <div class="node-pods">
              <div class="pods-label">运行 Pod: {{ node.pods }} 个</div>
              <div class="pods-grid">
                <div v-for="n in Math.min(node.pods, 8)" :key="n" class="pod-dot" :class="{
                  running: node.status === 'active',
                  pending: node.status === 'pending',
                  failed: node.status === 'failed'
                }"></div>
                <div v-if="node.pods > 8" class="pod-more">+{{ node.pods - 8 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="k8s-controls">
      <button class="control-btn" @click="simulateScheduling" :disabled="isScheduling">{{ isScheduling ? '调度中...' : '🚀 模拟 Pod 调度' }}</button>
      <button class="control-btn" @click="simulateScaling" :disabled="isScaling">{{ isScaling ? '扩容中...' : '📈 自动扩容' }}</button>
      <button class="control-btn danger" @click="simulateFailure" :disabled="isFailing">{{ isFailing ? '故障注入中...' : '💥 模拟节点故障' }}</button>
      <button class="control-btn" @click="resetCluster">🔄 重置集群</button>
    </div>

    <div class="k8s-logs" v-if="logs.length > 0">
      <div class="log-entry" v-for="(log, idx) in logs.slice(-5)" :key="idx" :class="log.level">
        <span class="log-time">{{ log.time }}</span>
        <span class="log-message">{{ log.message }}</span>
      </div>
    </div>

    <div class="demo-explanation">
      <h5>💡 Kubernetes 核心概念</h5>
      <ul>
        <li><strong>Pod</strong>：最小的部署单元，一个 Pod 可以包含一个或多个容器</li>
        <li><strong>Deployment</strong>：管理 Pod 的副本数量和滚动更新</li>
        <li><strong>Service</strong>：提供稳定的网络访问入口，实现负载均衡</li>
        <li><strong>Scheduler</strong>：根据资源需求和策略，自动将 Pod 调度到合适的节点</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const controlPlane = [
  { name: 'API Server', icon: '🌐', desc: '集群的统一入口' },
  { name: 'etcd', icon: '🗄️', desc: '分布式键值存储' },
  { name: 'Scheduler', icon: '📋', desc: 'Pod 调度器' },
  { name: 'Controller', icon: '🎮', desc: '控制器管理器' }
]

const workerNodes = reactive([
  {
    name: 'Node-1',
    icon: '🖥️',
    status: 'active',
    statusText: '运行中',
    cpu: 45,
    memory: 60,
    pods: 5
  },
  {
    name: 'Node-2',
    icon: '🖥️',
    status: 'active',
    statusText: '运行中',
    cpu: 30,
    memory: 40,
    pods: 3
  },
  {
    name: 'Node-3',
    icon: '🖥️',
    status: 'pending',
    statusText: '准备中',
    cpu: 0,
    memory: 0,
    pods: 0
  }
])

const activeComponent = ref(null)
const selectedNode = ref(null)
const isScheduling = ref(false)
const isScaling = ref(false)
const isFailing = ref(false)
const logs = ref([])

const addLog = (message, level = 'info') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.push({ time, message, level })
  if (logs.value.length > 20) logs.value.shift()
}

const selectNode = (name) => {
  selectedNode.value = selectedNode.value === name ? null : name
}

const simulateScheduling = async () => {
  isScheduling.value = true
  addLog('开始调度新 Pod...', 'info')

  await new Promise(r => setTimeout(r, 800))
  addLog('Scheduler: 评估节点资源...', 'info')

  await new Promise(r => setTimeout(r, 800))
  const targetNode = workerNodes.find(n => n.status === 'active' && n.cpu < 70)
  if (targetNode) {
    targetNode.pods++
    targetNode.cpu += 10
    addLog(`Pod 已调度到 ${targetNode.name}`, 'success')
  } else {
    addLog('警告: 没有合适的节点可调度', 'warning')
  }

  isScheduling.value = false
}

const simulateScaling = async () => {
  isScaling.value = true
  addLog('检测到高负载，开始水平扩容...', 'info')

  const pendingNode = workerNodes.find(n => n.status === 'pending')
  if (pendingNode) {
    await new Promise(r => setTimeout(r, 1500))
    pendingNode.status = 'active'
    pendingNode.statusText = '运行中'
    pendingNode.cpu = 20
    pendingNode.memory = 30
    addLog(`${pendingNode.name} 已启动并加入集群`, 'success')
  } else {
    addLog('已达到最大节点数', 'warning')
  }

  isScaling.value = false
}

const simulateFailure = async () => {
  isFailing.value = true
  const targetNode = workerNodes.find(n => n.status === 'active')

  if (targetNode) {
    addLog(`警告: ${targetNode.name} 失去连接!`, 'error')
    targetNode.status = 'failed'
    targetNode.statusText = '故障'

    await new Promise(r => setTimeout(r, 1000))
    addLog('Controller: 开始重新调度 Pod...', 'info')

    await new Promise(r => setTimeout(r, 1500))
    const healthyNode = workerNodes.find(n => n.status === 'active' && n.name !== targetNode.name)
    if (healthyNode) {
      healthyNode.pods += targetNode.pods
      addLog(`Pod 已成功迁移到 ${healthyNode.name}`, 'success')
    }

    targetNode.pods = 0
    targetNode.cpu = 0
    targetNode.memory = 0
  }

  isFailing.value = false
}

const resetCluster = () => {
  workerNodes.forEach((node, index) => {
    if (index < 2) {
      node.status = 'active'
      node.statusText = '运行中'
      node.cpu = 30 + index * 15
      node.memory = 40 + index * 20
      node.pods = 3 + index * 2
    } else {
      node.status = 'pending'
      node.statusText = '准备中'
      node.cpu = 0
      node.memory = 0
      node.pods = 0
    }
  })
  logs.value = []
  addLog('集群已重置', 'info')
}
</script>

<style scoped>
.container-docker-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.docker-visualization {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: stretch;
}

.layer {
  flex: 1;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.layer:hover,
.layer.active {
  border-color: var(--vp-c-brand);
}

.layer h5 {
  margin: 0 0 1rem 0;
  text-align: center;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.server-stack,
.docker-stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-item {
  padding: 0.6rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.8rem;
}

.layer-item.app {
  background: rgba(102, 126, 234, 0.2);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.layer-item.deps {
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
}

.layer-item.os,
.layer-item.hardware {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.layer-item.conflict {
  background: rgba(239, 68, 68, 0.2);
  color: var(--vp-c-danger);
  font-weight: 600;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.containers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.container-box {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
}

.container-app {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.2rem;
}

.container-deps {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.docker-engine {
  padding: 0.6rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 4px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #059669;
}

.host-os,
.hardware {
  padding: 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.vs-divider {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.benefit-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.2s;
}

.benefit-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.benefit-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.benefit-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.benefit-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .docker-visualization {
    flex-direction: column;
  }

  .vs-divider {
    justify-content: center;
    padding: 0.5rem 0;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
