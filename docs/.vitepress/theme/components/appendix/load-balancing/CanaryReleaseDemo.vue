<template>
  <div class="canary-release-demo">
    <div class="header">
      <div class="title">金丝雀发布</div>
      <div class="subtitle">灰度发布策略，小流量先行验证新版本</div>
    </div>

    <!-- 流量分配控制 -->
    <div class="traffic-control">
      <div class="control-header">
        <span class="control-title">流量分配比例</span>
        <span class="control-hint">拖动滑块调整新旧版本流量占比</span>
      </div>

      <div class="slider-container">
        <div class="version-labels">
          <span class="version-label stable">
            <span class="dot blue"></span>
            稳定版 v{{ stableVersion }}
          </span>
          <span class="percentage stable">{{ 100 - canaryPercentage }}%</span>
        </div>

        <input
          type="range"
          v-model.number="canaryPercentage"
          min="0"
          max="100"
          step="5"
          class="traffic-slider"
        />

        <div class="version-labels">
          <span class="version-label canary">
            <span class="dot yellow"></span>
            金丝雀 v{{ canaryVersion }}
          </span>
          <span class="percentage canary">{{ canaryPercentage }}%</span>
        </div>
      </div>

      <!-- 预设按钮 -->
      <div class="preset-buttons">
        <button
          v-for="preset in trafficPresets"
          :key="preset.value"
          class="preset-btn"
          :class="{ active: canaryPercentage === preset.value }"
          @click="canaryPercentage = preset.value"
        >
          {{ preset.label }}
        </button>
      </div>
    </div>

    <!-- 可视化流量 -->
    <div class="traffic-visualization">
      <div class="viz-header">
        <span class="viz-title">实时流量模拟</span>
        <span class="viz-stats">
          总请求: {{ totalRequests }} |
          稳定版: {{ stableRequests }} |
          金丝雀: {{ canaryRequests }}
        </span>
      </div>

      <div class="traffic-pipeline">
        <div class="pipeline-stage">
          <div class="stage-label">用户请求</div>
          <div class="request-bubbles">
            <div
              v-for="(req, index) in requestQueue"
              :key="index"
              class="request-bubble"
              :class="{ canary: req.isCanary }"
              :style="{ animationDelay: req.delay + 's' }"
            >
              {{ req.isCanary ? 'C' : 'S' }}
            </div>
          </div>
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-stage">
          <div class="stage-label">负载均衡器</div>
          <div class="lb-diagram">
            <div class="lb-icon">⚖️</div>
            <div class="routing-logic">
              <div class="logic-line">
                <span class="logic-label">Canary:</span>
                <span class="logic-value">{{ canaryPercentage }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-stage">
          <div class="stage-label">后端服务</div>
          <div class="backend-pods">
            <div class="pod-group stable">
              <div class="pod-label">稳定版 v{{ stableVersion }}</div>
              <div class="pods-row">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="pod"
                  :class="{ active: hasTrafficToStable }"
                >
                  <span class="pod-icon">📦</span>
                  <span class="pod-name">S{{ i }}</span>
                </div>
              </div>
            </div>
            <div class="pod-group canary">
              <div class="pod-label">金丝雀 v{{ canaryVersion }}</div>
              <div class="pods-row">
                <div
                  v-for="i in 2"
                  :key="i"
                  class="pod"
                  :class="{ active: hasTrafficToCanary }"
                >
                  <span class="pod-icon">🧪</span>
                  <span class="pod-name">C{{ i }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 金丝雀发布策略 -->
    <div class="canary-strategy">
      <div class="strategy-title">金丝雀发布最佳实践</div>

      <div class="strategy-grid">
        <div class="strategy-card">
          <div class="card-header">
            <span class="card-icon">📊</span>
            <span class="card-title">渐进式放量</span>
          </div>
          <div class="card-body">
            <ul class="strategy-list">
              <li>1% → 5% → 10% → 25% → 50% → 100%</li>
              <li>每个阶段观察至少15-30分钟</li>
              <li>关键指标：错误率、延迟、吞吐量</li>
            </ul>
          </div>
        </div>

        <div class="strategy-card">
          <div class="card-header">
            <span class="card-icon">🎯</span>
            <span class="card-title">精准用户选择</span>
          </div>
          <div class="card-body">
            <ul class="strategy-list">
              <li>内部员工/测试用户先行</li>
              <li>按地域：选择特定区域用户</li>
              <li>按用户属性：VIP用户或普通用户</li>
              <li>按设备类型：iOS/Android/Web</li>
            </ul>
          </div>
        </div>

        <div class="strategy-card">
          <div class="card-header">
            <span class="card-icon">🛡️</span>
            <span class="card-title">自动回滚机制</span>
          </div>
          <div class="card-body">
            <ul class="strategy-list">
              <li>错误率超过阈值自动回滚</li>
              <li>P99延迟异常触发告警</li>
              <li>关键业务指标下降自动回滚</li>
              <li>一键回滚：30秒内恢复旧版本</li>
            </ul>
          </div>
        </div>

        <div class="strategy-card">
          <div class="card-header">
            <span class="card-icon">📈</span>
            <span class="card-title">监控与指标</span>
          </div>
          <div class="card-body">
            <ul class="strategy-list">
              <li>基础设施：CPU、内存、磁盘、网络</li>
              <li>应用指标：QPS、错误率、延迟分布</li>
              <li>业务指标：转化率、订单量、收入</li>
              <li>用户体验：页面加载时间、交互延迟</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const canaryPercentage = ref(10)
const stableVersion = ref('1.0.0')
const canaryVersion = ref('1.1.0')
const currentEnv = ref('blue')
const isSwitching = ref(false)
const blueVersion = ref('1.0.0')
const greenVersion = ref('1.1.0')
const switchProgress = ref(0)
const deploymentStep = ref(4)

const trafficPresets = [
  { label: '1%', value: 1 },
  { label: '5%', value: 5 },
  { label: '10%', value: 10 },
  { label: '25%', value: 25 },
  { label: '50%', value: 50 },
  { label: '100%', value: 100 }
]

// 请求队列
const requestQueue = ref([])
const totalRequests = ref(0)
const stableRequests = ref(0)
const canaryRequests = ref(0)

// 计算属性
const hasTrafficToStable = computed(() => canaryPercentage.value < 100)
const hasTrafficToCanary = computed(() => canaryPercentage.value > 0)

// 生成请求
const generateRequests = () => {
  const isCanary = Math.random() * 100 < canaryPercentage.value
  const request = {
    isCanary,
    delay: Math.random() * 2
  }
  requestQueue.value.push(request)
  if (requestQueue.value.length > 10) {
    requestQueue.value.shift()
  }

  // 更新统计
  totalRequests.value++
  if (isCanary) {
    canaryRequests.value++
  } else {
    stableRequests.value++
  }
}

let requestInterval
onMounted(() => {
  requestInterval = setInterval(generateRequests, 500)
})

onUnmounted(() => {
  clearInterval(requestInterval)
})
</script>

<style scoped>
.canary-release-demo {
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

/* Traffic Control */
.traffic-control {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.control-header {
  margin-bottom: 1.5rem;
}

.control-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.control-hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.slider-container {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.version-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.version-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.version-label.stable {
  color: #3b82f6;
}

.version-label.canary {
  color: #f59e0b;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.blue {
  background: #3b82f6;
}

.dot.yellow {
  background: #f59e0b;
}

.percentage {
  font-size: 1.25rem;
  font-weight: 700;
}

.percentage.stable {
  color: #3b82f6;
}

.percentage.canary {
  color: #f59e0b;
}

.traffic-slider {
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, #3b82f6 0%, #3b82f6 v-bind('(100 - canaryPercentage) + "%"'), #f59e0b v-bind('(100 - canaryPercentage) + "%"'), #f59e0b 100%);
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

.traffic-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border: 3px solid var(--vp-c-brand);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.preset-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preset-btn {
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.preset-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

/* Traffic Visualization */
.traffic-visualization {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.viz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.viz-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.viz-stats {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.traffic-pipeline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 1rem 0;
}

.pipeline-stage {
  flex-shrink: 0;
}

.stage-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.request-bubbles {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.request-bubble {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 600;
  animation: bubbleFlow 2s ease-in-out infinite;
}

.request-bubble.canary {
  background: #f59e0b;
}

@keyframes bubbleFlow {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-5px); opacity: 0.8; }
}

.pipeline-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.lb-diagram {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 10px;
}

.lb-icon {
  font-size: 1.5rem;
}

.routing-logic {
  font-size: 0.75rem;
}

.logic-line {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.logic-label {
  opacity: 0.8;
}

.logic-value {
  font-weight: 600;
}

.backend-pods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pod-group {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.pod-group.stable {
  border-left: 4px solid #3b82f6;
}

.pod-group.canary {
  border-left: 4px solid #f59e0b;
}

.pod-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.pods-row {
  display: flex;
  gap: 0.5rem;
}

.pod {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.4rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  min-width: 40px;
  opacity: 0.5;
  transition: all 0.3s;
}

.pod.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.pod.busy {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.pod-icon {
  font-size: 1rem;
}

.pod-name {
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

/* Canary Strategy */
.canary-strategy {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.strategy-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .strategy-grid {
    grid-template-columns: 1fr;
  }
}

.strategy-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.card-body {
  padding: 0.75rem;
}

.strategy-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.strategy-list li {
  margin-bottom: 0.25rem;
}
</style>
