<template>
  <div class="blue-green-deployment-demo">
    <div class="header">
      <div class="title">蓝绿部署</div>
      <div class="subtitle">零停机发布的经典策略，两套环境瞬间切换</div>
    </div>

    <!-- 部署状态控制 -->
    <div class="deployment-control">
      <div class="status-display">
        <div class="status-item" :class="{ active: currentEnv === 'blue' }">
          <div class="status-icon">🔵</div>
          <div class="status-label">蓝环境</div>
          <div class="status-version">v{{ blueVersion }}</div>
          <div class="status-traffic">
            {{ currentEnv === 'blue' ? '100%' : '0%' }} 流量
          </div>
        </div>

        <div class="switch-control">
          <button
            class="switch-btn"
            @click="toggleEnvironment"
            :disabled="isSwitching"
            :class="{ switching: isSwitching }"
          >
            <span v-if="!isSwitching">
              {{ currentEnv === 'blue' ? '切换到绿环境 →' : '← 切换到蓝环境' }}
            </span>
            <span v-else class="switching-text">
              <span class="spinner"></span>
              切换中...
            </span>
          </button>

          <div class="progress-bar" v-if="isSwitching">
            <div class="progress-fill" :style="{ width: switchProgress + '%' }"></div>
          </div>
        </div>

        <div class="status-item" :class="{ active: currentEnv === 'green' }">
          <div class="status-icon">🟢</div>
          <div class="status-label">绿环境</div>
          <div class="status-version">v{{ greenVersion }}</div>
          <div class="status-traffic">
            {{ currentEnv === 'green' ? '100%' : '0%' }} 流量
          </div>
        </div>
      </div>
    </div>

    <!-- 架构可视化 -->
    <div class="architecture-view">
      <div class="layer users">
        <div class="layer-title">用户流量</div>
        <div class="users-row">
          <div v-for="i in 5" :key="i" class="user-avatar" :class="{ active: isUserActive(i) }">
            👤
          </div>
        </div>
      </div>

      <div class="arrow-down">↓</div>

      <div class="layer load-balancer">
        <div class="lb-box">
          <div class="lb-icon">⚖️</div>
          <div class="lb-info">
            <div class="lb-title">负载均衡器</div>
            <div class="lb-status">
              当前指向:
              <span class="env-badge" :class="currentEnv">
                {{ currentEnv === 'blue' ? '🔵 蓝环境' : '🟢 绿环境' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="arrow-down">↓</div>

      <div class="layer environments">
        <div class="env-row">
          <!-- 蓝环境 -->
          <div class="env-box" :class="{ active: currentEnv === 'blue', standby: currentEnv === 'green' }">
            <div class="env-header">
              <span class="env-icon">🔵</span>
              <span class="env-name">蓝环境</span>
              <span class="env-badge version">v{{ blueVersion }}</span>
            </div>
            <div class="env-content">
              <div class="server-list">
                <div v-for="i in 3" :key="i" class="server-item" :class="{ busy: isServerBusy('blue', i) }">
                  <span class="server-icon">🖥️</span>
                  <span class="server-name">B{{ i }}</span>
                  <span class="server-status" :class="getServerStatus('blue', i)">
                    {{ getServerStatus('blue', i) === 'healthy' ? '●' : '○' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="env-footer">
              <div class="traffic-indicator">
                <span class="indicator-label">流量:</span>
                <span class="indicator-value" :class="{ active: currentEnv === 'blue' }">
                  {{ currentEnv === 'blue' ? '100%' : '0%' }}
                </span>
              </div>
              <div class="status-badge" :class="currentEnv === 'blue' ? 'active' : 'standby'">
                {{ currentEnv === 'blue' ? '生产环境' : '待命' }}
              </div>
            </div>
          </div>

          <!-- 绿环境 -->
          <div class="env-box" :class="{ active: currentEnv === 'green', standby: currentEnv === 'blue' }">
            <div class="env-header">
              <span class="env-icon">🟢</span>
              <span class="env-name">绿环境</span>
              <span class="env-badge version">v{{ greenVersion }}</span>
            </div>
            <div class="env-content">
              <div class="server-list">
                <div v-for="i in 3" :key="i" class="server-item" :class="{ busy: isServerBusy('green', i) }">
                  <span class="server-icon">🖥️</span>
                  <span class="server-name">G{{ i }}</span>
                  <span class="server-status" :class="getServerStatus('green', i)">
                    {{ getServerStatus('green', i) === 'healthy' ? '●' : '○' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="env-footer">
              <div class="traffic-indicator">
                <span class="indicator-label">流量:</span>
                <span class="indicator-value" :class="{ active: currentEnv === 'green' }">
                  {{ currentEnv === 'green' ? '100%' : '0%' }}
                </span>
              </div>
              <div class="status-badge" :class="currentEnv === 'green' ? 'active' : 'standby'">
                {{ currentEnv === 'green' ? '生产环境' : '待命' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 部署流程说明 -->
    <div class="deployment-process">
      <div class="process-title">蓝绿部署流程</div>
      <div class="process-steps">
        <div class="step" :class="{ active: deploymentStep >= 1 }">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-title">绿环境部署</div>
            <div class="step-desc">在绿环境部署新版本，进行冒烟测试</div>
          </div>
        </div>
        <div class="step-arrow">→</div>
        <div class="step" :class="{ active: deploymentStep >= 2 }">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-title">切换流量</div>
            <div class="step-desc">将负载均衡器指向绿环境，流量瞬间切换</div>
          </div>
        </div>
        <div class="step-arrow">→</div>
        <div class="step" :class="{ active: deploymentStep >= 3 }">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-title">监控观察</div>
            <div class="step-desc">观察绿环境运行状态，确认无异常</div>
          </div>
        </div>
        <div class="step-arrow">→</div>
        <div class="step" :class="{ active: deploymentStep >= 4 }">
          <div class="step-number">4</div>
          <div class="step-content">
            <div class="step-title">蓝环境升级</div>
            <div class="step-desc">在蓝环境部署新版本，为下次切换做准备</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优缺点分析 -->
    <div class="pros-cons-analysis">
      <div class="analysis-title">蓝绿部署优缺点</div>
      <div class="analysis-grid">
        <div class="analysis-card pros">
          <div class="card-header">
            <span class="header-icon">✅</span>
            <span class="header-title">优点</span>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li class="feature-item">
                <span class="item-title">零停机时间：</span>
                <span class="item-desc">流量切换在毫秒级完成，用户无感知</span>
              </li>
              <li class="feature-item">
                <span class="item-title">快速回滚：</span>
                <span class="item-desc">发现问题可立即切回原环境，风险可控</span>
              </li>
              <li class="feature-item">
                <span class="item-title">完整的预发布测试：</span>
                <span class="item-desc">新环境可完整测试后再接管流量</span>
              </li>
              <li class="feature-item">
                <span class="item-title">数据一致性：</span>
                <span class="item-desc">无需处理新旧版本同时运行时的兼容问题</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="analysis-card cons">
          <div class="card-header">
            <span class="header-icon">❌</span>
            <span class="header-title">缺点</span>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li class="feature-item">
                <span class="item-title">资源成本高：</span>
                <span class="item-desc">需要同时维护两套完整环境，服务器成本翻倍</span>
              </li>
              <li class="feature-item">
                <span class="item-title">数据库兼容性挑战：</span>
                <span class="item-desc">如果涉及数据库Schema变更，需要特别处理兼容性</span>
              </li>
              <li class="feature-item">
                <span class="item-title">预热问题：</span>
                <span class="item-desc">新环境启动后可能需要时间预热缓存、连接池等</span>
              </li>
              <li class="feature-item">
                <span class="item-title">不适合有状态服务：</span>
                <span class="item-desc">对于长连接、会话保持要求高的场景处理复杂</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const currentEnv = ref('blue')
const blueVersion = ref('1.0.0')
const greenVersion = ref('1.1.0')
const isSwitching = ref(false)
const switchProgress = ref(0)
const deploymentStep = ref(4)

// 加权服务器数据
const weightedServers = ref([
  { id: 1, name: 'Server 1', specs: '16核 64GB NVMe', ip: '10.0.1.10', weight: 5, status: 'healthy' },
  { id: 2, name: 'Server 2', specs: '8核 32GB SSD', ip: '10.0.1.11', weight: 3, status: 'healthy' },
  { id: 3, name: 'Server 3', specs: '4核 16GB SSD', ip: '10.0.1.12', weight: 2, status: 'healthy' }
])

const totalTraffic = ref(1000)

const getTotalWeight = () => {
  return weightedServers.value.reduce((sum, s) => sum + s.weight, 0)
}

const getAllocationPercentage = (weight) => {
  const total = getTotalWeight()
  return total > 0 ? (weight / total) * 100 : 0
}

const getWeightColor = (index) => {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
  return colors[index % colors.length]
}

// 流量流动画
const trafficFlows = ref([])

const generateTrafficFlows = () => {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b']
  trafficFlows.value = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)]
  }))
}

const isUserActive = (index) => {
  return index <= 3 || (currentEnv.value === 'green' && index > 3)
}

const isServerBusy = (env, index) => {
  return (currentEnv.value === env && index <= 2)
}

const getServerStatus = (env, index) => {
  return 'healthy'
}

const toggleEnvironment = async () => {
  if (isSwitching.value) return

  isSwitching.value = true
  switchProgress.value = 0

  // 模拟切换进度
  const interval = setInterval(() => {
    switchProgress.value += 10
    if (switchProgress.value >= 100) {
      clearInterval(interval)
      currentEnv.value = currentEnv.value === 'blue' ? 'green' : 'blue'
      isSwitching.value = false
      switchProgress.value = 0
    }
  }, 100)
}

onMounted(() => {
  generateTrafficFlows()
})
</script>

<style scoped>
.blue-green-deployment-demo {
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

/* Deployment Control */
.deployment-control {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.status-display {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 768px) {
  .status-display {
    grid-template-columns: 1fr;
  }
}

.status-item {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s;
  opacity: 0.6;
}

.status-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.status-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.status-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.status-version {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.status-traffic {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.switch-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.switch-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;
}

.switch-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.switch-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.switch-btn.switching {
  background: linear-gradient(135deg, #6b7280, #9ca3af);
}

.switching-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.progress-bar {
  width: 100%;
  max-width: 200px;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #22c55e);
  border-radius: 3px;
  transition: width 0.1s;
}

/* Architecture View */
.architecture-view {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.layer {
  margin-bottom: 0.75rem;
}

.layer-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.users-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  font-size: 1.25rem;
  transition: all 0.3s;
  opacity: 0.5;
}

.user-avatar.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  opacity: 1;
  transform: scale(1.1);
}

.arrow-down {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 0.25rem 0;
}

/* Load Balancer */
.load-balancer {
  display: flex;
  justify-content: center;
}

.lb-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.lb-icon {
  font-size: 2rem;
}

.lb-title {
  font-weight: 600;
  font-size: 1rem;
}

.lb-status {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-top: 0.25rem;
}

.env-badge {
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.env-badge.blue {
  background: rgba(59, 130, 246, 0.3);
  color: #bfdbfe;
}

.env-badge.green {
  background: rgba(34, 197, 94, 0.3);
  color: #bbf7d0;
}

/* Environments */
.env-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .env-row {
    grid-template-columns: 1fr;
  }
}

.env-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  opacity: 0.7;
}

.env-box.active {
  border-color: var(--vp-c-brand);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.env-box.standby {
  border-color: var(--vp-c-text-3);
}

.env-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.env-icon {
  font-size: 1.25rem;
}

.env-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  flex: 1;
}

.env-badge.version {
  font-size: 0.7rem;
  padding: 2px 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 4px;
}

.env-content {
  padding: 0.75rem;
}

.server-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.server-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s;
}

.server-item.busy {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.server-icon {
  font-size: 1rem;
}

.server-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
}

.server-status {
  font-size: 0.75rem;
}

.server-status.healthy {
  color: #22c55e;
}

.env-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.traffic-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
}

.indicator-label {
  color: var(--vp-c-text-2);
}

.indicator-value {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.indicator-value.active {
  color: var(--vp-c-brand);
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.status-badge.active {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.standby {
  background: #f3f4f6;
  color: #6b7280;
}

/* Deployment Process */
.deployment-process {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.process-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  opacity: 0.5;
  transition: all 0.3s;
}

.step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  opacity: 1;
}

.step-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.step-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.step-arrow {
  font-size: 1.25rem;
  color: var(--vp-c-text-3);
}

/* Pros Cons Analysis */
.pros-cons-analysis {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.analysis-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.analysis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .analysis-grid {
    grid-template-columns: 1fr;
  }
}

.analysis-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.analysis-card.pros {
  border-color: #22c55e;
}

.analysis-card.cons {
  border-color: #ef4444;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.analysis-card.pros .card-header {
  background: rgba(34, 197, 94, 0.1);
}

.analysis-card.cons .card-header {
  background: rgba(239, 68, 68, 0.1);
}

.header-icon {
  font-size: 1.25rem;
}

.header-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.card-body {
  padding: 0.75rem;
}

.feature-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.feature-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  line-height: 1.5;
}

.feature-item:last-child {
  border-bottom: none;
}

.item-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.item-desc {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
</style>
