<!--
  TraceVisualizationDemo.vue
  链路追踪可视化：展示分布式系统中的请求调用链路
-->
<template>
  <div class="trace-demo">
    <div class="header">
      <div class="title">分布式链路追踪 (Distributed Tracing)</div>
      <div class="subtitle">一个请求在微服务间流转的完整路径</div>
    </div>

    <div class="controls">
      <button
        :class="['scenario-btn', { active: scenario === 'normal' }]"
        @click="setScenario('normal')"
      >
        正常流程
      </button>
      <button
        :class="['scenario-btn', { active: scenario === 'slow' }]"
        @click="setScenario('slow')"
      >
        性能瓶颈
      </button>
      <button
        :class="['scenario-btn', { active: scenario === 'error' }]"
        @click="setScenario('error')"
      >
        错误追踪
      </button>
    </div>

    <div class="trace-info">
      <div class="info-item">
        <span class="label">Trace ID：</span>
        <span class="value">{{ traceId }}</span>
      </div>
      <div class="info-item">
        <span class="label">总耗时：</span>
        <span class="value">{{ totalDuration }}ms</span>
      </div>
      <div class="info-item">
        <span class="label">调用服务数：</span>
        <span class="value">{{ spans.length }}</span>
      </div>
    </div>

    <div class="spans-container">
      <div class="time-ruler">
        <div
          v-for="tick in timeTicks"
          :key="tick"
          class="tick"
          :style="{ left: tick + '%' }"
        >
          {{ tick }}ms
        </div>
      </div>

      <div class="spans">
        <div v-for="(span, index) in spans" :key="span.id" class="span-row">
          <div class="span-service">{{ span.service }}</div>
          <div class="span-timeline">
            <div
              class="span-bar"
              :class="{
                error: span.status === 'error',
                warning: span.duration > 200,
                success: span.status === 'success'
              }"
              :style="{
                left: (span.startTime / totalDuration) * 100 + '%',
                width: Math.max(5, (span.duration / totalDuration) * 100) + '%'
              }"
            >
              <div class="span-details">
                <div class="span-name">{{ span.name }}</div>
                <div class="span-time">{{ span.duration }}ms</div>
              </div>
            </div>
          </div>
          <div class="span-status">
            <span v-if="span.status === 'error'" class="status-error">✗</span>
            <span v-else-if="span.duration > 200" class="status-warning"
              >⚠</span
            >
            <span v-else class="status-success">✓</span>
          </div>
        </div>
      </div>
    </div>

    <div class="span-detail" v-if="selectedSpan">
      <div class="detail-header">Span 详情</div>
      <div class="detail-body">
        <div class="detail-row">
          <span class="label">服务名：</span>
          <span class="value">{{ selectedSpan.service }}</span>
        </div>
        <div class="detail-row">
          <span class="label">操作：</span>
          <span class="value">{{ selectedSpan.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">耗时：</span>
          <span class="value">{{ selectedSpan.duration }}ms</span>
        </div>
        <div class="detail-row">
          <span class="label">状态：</span>
          <span class="value" :class="selectedSpan.status">{{
            selectedSpan.status
          }}</span>
        </div>
        <div v-if="selectedSpan.error" class="detail-row">
          <span class="label">错误信息：</span>
          <span class="value error">{{ selectedSpan.error }}</span>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="color-box success"></span>
        <span>正常 (≤200ms)</span>
      </div>
      <div class="legend-item">
        <span class="color-box warning"></span>
        <span>慢调用 (>200ms)</span>
      </div>
      <div class="legend-item">
        <span class="color-box error"></span>
        <span>错误</span>
      </div>
    </div>

    <div class="tips">
      <div class="tip-title">💡 观察要点</div>
      <ul class="tip-list">
        <li>点击"性能瓶颈"查看数据库查询慢导致的延迟</li>
        <li>点击"错误追踪"查看库存服务异常如何影响整个链路</li>
        <li>每个 Span 都有唯一的 Span ID，通过 Trace ID 关联</li>
        <li>时间条越长，表示该服务耗时越长</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scenario = ref('normal')
const selectedSpan = ref(null)

const traceId = ref('a1b2c3d4-e5f6-7890-abcd-ef1234567890')

const spansData = {
  normal: [
    {
      id: 1,
      service: 'API Gateway',
      name: 'POST /api/order/create',
      startTime: 0,
      duration: 450,
      status: 'success'
    },
    {
      id: 2,
      service: 'User Service',
      name: '验证用户身份',
      startTime: 10,
      duration: 45,
      status: 'success'
    },
    {
      id: 3,
      service: 'Product Service',
      name: '查询商品信息',
      startTime: 70,
      duration: 85,
      status: 'success'
    },
    {
      id: 4,
      service: 'Inventory Service',
      name: '扣减库存',
      startTime: 175,
      duration: 120,
      status: 'success'
    },
    {
      id: 5,
      service: 'Payment Service',
      name: '创建支付订单',
      startTime: 310,
      duration: 95,
      status: 'success'
    },
    {
      id: 6,
      service: 'Order Service',
      name: '保存订单记录',
      startTime: 420,
      duration: 25,
      status: 'success'
    }
  ],
  slow: [
    {
      id: 1,
      service: 'API Gateway',
      name: 'POST /api/order/create',
      startTime: 0,
      duration: 1250,
      status: 'success'
    },
    {
      id: 2,
      service: 'User Service',
      name: '验证用户身份',
      startTime: 10,
      duration: 45,
      status: 'success'
    },
    {
      id: 3,
      service: 'Product Service',
      name: '查询商品信息',
      startTime: 70,
      duration: 85,
      status: 'success'
    },
    {
      id: 4,
      service: 'Inventory Service',
      name: '扣减库存',
      startTime: 175,
      duration: 520,
      status: 'success'
    },
    {
      id: 5,
      service: 'Database',
      name: 'UPDATE inventory SET count = count - 1',
      startTime: 200,
      duration: 480,
      status: 'success'
    },
    {
      id: 6,
      service: 'Payment Service',
      name: '创建支付订单',
      startTime: 710,
      duration: 95,
      status: 'success'
    },
    {
      id: 7,
      service: 'Order Service',
      name: '保存订单记录',
      startTime: 820,
      duration: 25,
      status: 'success'
    }
  ],
  error: [
    {
      id: 1,
      service: 'API Gateway',
      name: 'POST /api/order/create',
      startTime: 0,
      duration: 280,
      status: 'success'
    },
    {
      id: 2,
      service: 'User Service',
      name: '验证用户身份',
      startTime: 10,
      duration: 45,
      status: 'success'
    },
    {
      id: 3,
      service: 'Product Service',
      name: '查询商品信息',
      startTime: 70,
      duration: 85,
      status: 'success'
    },
    {
      id: 4,
      service: 'Inventory Service',
      name: '扣减库存',
      startTime: 175,
      duration: 55,
      status: 'error',
      error: '库存不足: product_id=12345, required=10, available=5'
    },
    {
      id: 5,
      service: 'Order Service',
      name: '回滚订单创建',
      startTime: 240,
      duration: 35,
      status: 'success'
    }
  ]
}

const spans = computed(() => spansData[scenario.value])

const totalDuration = computed(() => {
  const maxEnd = spans.value.reduce((max, span) => {
    return Math.max(max, span.startTime + span.duration)
  }, 0)
  return Math.ceil(maxEnd / 50) * 50 // 向上取整到 50ms
})

const timeTicks = computed(() => {
  const ticks = []
  for (let i = 0; i <= totalDuration.value; i += totalDuration.value / 10) {
    ticks.push(Math.round(i))
  }
  return ticks
})

const setScenario = (s) => {
  scenario.value = s
  selectedSpan.value = null
}
</script>

<style scoped>
.trace-demo {
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

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.trace-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.label {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.value {
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.spans-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.time-ruler {
  position: relative;
  height: 30px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.tick {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.spans {
  position: relative;
}

.span-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
  cursor: pointer;
}

.span-row:hover {
  background: var(--vp-c-bg);
}

.span-service {
  min-width: 140px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.span-timeline {
  flex: 1;
  position: relative;
  height: 40px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.span-bar {
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
}

.span-bar.success {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.span-bar.warning {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.span-bar.error {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.span-bar:hover {
  transform: scaleY(1.1);
  filter: brightness(1.1);
}

.span-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.span-status {
  min-width: 30px;
  text-align: center;
  font-size: 1.2rem;
}

.status-success {
  color: #22c55e;
}

.status-warning {
  color: #f59e0b;
}

.status-error {
  color: #ef4444;
}

.span-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  font-size: 0.9rem;
}

.detail-row .label {
  min-width: 100px;
  color: var(--vp-c-text-2);
}

.detail-row .value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-row .value.success {
  color: #22c55e;
}

.detail-row .value.error {
  color: #ef4444;
}

.legend {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  font-size: 0.85rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.color-box.success {
  background: #22c55e;
}

.color-box.warning {
  background: #f59e0b;
}

.color-box.error {
  background: #ef4444;
}

.tips {
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-brand);
}

.tip-title {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.tip-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.tip-list li {
  margin-bottom: 0.25rem;
}

@media (max-width: 768px) {
  .span-row {
    flex-wrap: wrap;
  }

  .span-service {
    min-width: 100%;
    margin-bottom: 0.25rem;
  }

  .span-timeline {
    min-width: 200px;
  }

  .controls {
    flex-direction: column;
  }

  .scenario-btn {
    width: 100%;
  }
}
</style>
