<template>
  <div class="microservices-demo">
    <div class="demo-header">
      <h4>🏭 微服务架构演示</h4>
      <p>观察多个独立服务如何协作，以及服务间通信方式</p>
    </div>

    <div class="services-grid">
      <div
        v-for="service in services"
        :key="service.name"
        class="service-card"
        :class="{ active: activeService === service.name, failed: service.status === 'failed' }"
        @click="selectService(service.name)"
      >
        <div class="service-header">
          <span class="service-icon">{{ service.icon }}</span>
          <span class="service-name">{{ service.name }}</span>
          <span class="service-status" :class="service.status">{{ service.statusText }}</span>
        </div>
        <div class="service-details">
          <div class="detail-row">
            <span class="label">端口:</span>
            <span class="value">{{ service.port }}</span>
          </div>
          <div class="detail-row">
            <span class="label">数据库:</span>
            <span class="value">{{ service.database }}</span>
          </div>
          <div class="detail-row">
            <span class="label">依赖:</span>
            <span class="value deps">{{ service.dependencies.join(', ') || '无' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="communication-flow">
      <h5>服务间通信链路</h5>
      <div class="flow-visualization">
        <div class="flow-step" v-for="(step, idx) in flowSteps" :key="idx"
             :class="{ active: currentFlowStep === idx, completed: currentFlowStep > idx }">
          <div class="step-number">{{ idx + 1 }}</div>
          <div class="step-content">
            <div class="step-service">{{ step.service }}</div>
            <div class="step-action">{{ step.action }}</div>
          </div>
        </div>
      </div>
      <div class="flow-controls">
        <button class="flow-btn" @click="startFlow" :disabled="isFlowRunning">开始流程</button>
        <button class="flow-btn" @click="resetFlow">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const services = ref([
  {
    name: '用户服务',
    icon: '👤',
    status: 'healthy',
    statusText: '健康',
    port: '8081',
    database: 'MySQL',
    dependencies: []
  },
  {
    name: '订单服务',
    icon: '📦',
    status: 'healthy',
    statusText: '健康',
    port: '8082',
    database: 'PostgreSQL',
    dependencies: ['用户服务']
  },
  {
    name: '支付服务',
    icon: '💳',
    status: 'healthy',
    statusText: '健康',
    port: '8083',
    database: 'MongoDB',
    dependencies: ['用户服务', '订单服务']
  },
  {
    name: '库存服务',
    icon: '🏭',
    status: 'healthy',
    statusText: '健康',
    port: '8084',
    database: 'Redis',
    dependencies: ['订单服务']
  }
])

const activeService = ref(null)
const currentFlowStep = ref(-1)
const isFlowRunning = ref(false)

const flowSteps = [
  { service: '用户服务', action: '验证用户身份' },
  { service: '订单服务', action: '创建订单记录' },
  { service: '库存服务', action: '检查库存数量' },
  { service: '支付服务', action: '处理支付请求' },
  { service: '订单服务', action: '更新订单状态' }
]

const selectService = (name) => {
  activeService.value = activeService.value === name ? null : name
}

const startFlow = async () => {
  isFlowRunning.value = true
  currentFlowStep.value = 0

  for (let i = 0; i < flowSteps.length; i++) {
    currentFlowStep.value = i
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  isFlowRunning.value = false
}

const resetFlow = () => {
  currentFlowStep.value = -1
  isFlowRunning.value = false
}
</script>

<style scoped>
.microservices-demo {
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.service-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.service-card:hover {
  border-color: var(--vp-c-brand);
}

.service-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.service-card.failed {
  border-color: var(--vp-c-danger);
  background: rgba(239, 68, 68, 0.05);
}

.service-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.service-icon {
  font-size: 1.25rem;
}

.service-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  flex: 1;
}

.service-status {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
}

.service-status.healthy {
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.service-status.failed {
  background: rgba(239, 68, 68, 0.2);
  color: #dc2626;
}

.service-details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.label {
  color: var(--vp-c-text-3);
}

.value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.value.deps {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.communication-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.communication-flow h5 {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.flow-visualization {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
}

.flow-step.completed {
  border-color: var(--vp-c-success);
  background: rgba(34, 197, 94, 0.1);
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.flow-step.active .step-number {
  background: var(--vp-c-brand);
  color: white;
}

.flow-step.completed .step-number {
  background: var(--vp-c-success);
  color: white;
}

.step-content {
  flex: 1;
}

.step-service {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.step-action {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.flow-controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.flow-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.flow-btn:hover {
  border-color: var(--vp-c-brand);
}

.flow-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-header {
    flex-wrap: wrap;
  }
}
</style>
