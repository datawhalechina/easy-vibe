<!--
  TrackingOverviewDemo.vue
  埋点系统概览 - 展示埋点在系统中的位置和作用
-->
<template>
  <div class="tracking-overview-demo">
    <div class="header">
      <div class="title">埋点系统概览</div>
      <div class="subtitle">从用户行为到数据洞察的完整链路</div>
    </div>

    <div class="system-flow">
      <div class="flow-section user-actions">
        <div class="section-title">用户行为层</div>
        <div class="action-grid">
          <div
            v-for="action in userActions"
            :key="action.id"
            class="action-item"
            :class="{ active: selectedAction === action.id }"
            @click="selectAction(action)"
          >
            <div class="action-icon">{{ action.icon }}</div>
            <div class="action-name">{{ action.name }}</div>
          </div>
        </div>
      </div>

      <div class="arrow">↓</div>

      <div class="flow-section tracking-layer">
        <div class="section-title">埋点采集层</div>
        <div class="tracking-box">
          <div class="tracking-icon">📊</div>
          <div class="tracking-info">
            <div class="event-name">{{ selectedEventData.event }}</div>
            <div class="event-data">
              {{ formatEventData(selectedEventData) }}
            </div>
          </div>
        </div>
      </div>

      <div class="arrow">↓</div>

      <div class="flow-section data-pipeline">
        <div class="section-title">数据处理层</div>
        <div class="pipeline-steps">
          <div
            v-for="(step, index) in pipelineSteps"
            :key="step.name"
            class="pipeline-step"
            :class="{ active: currentStep === index }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-info">
              <div class="step-name">{{ step.name }}</div>
              <div class="step-desc">{{ step.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="arrow">↓</div>

      <div class="flow-section insights">
        <div class="section-title">数据洞察层</div>
        <div class="insight-cards">
          <div class="insight-card">
            <div class="insight-value">
              {{ formatNumber(metrics.totalUsers) }}
            </div>
            <div class="insight-label">总用户数</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">
              {{ formatNumber(metrics.totalEvents) }}
            </div>
            <div class="insight-label">总事件数</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">{{ metrics.conversionRate }}%</div>
            <div class="insight-label">转化率</div>
          </div>
          <div class="insight-card">
            <div class="insight-value">{{ metrics.retentionRate }}%</div>
            <div class="insight-label">留存率</div>
          </div>
        </div>
      </div>
    </div>

    <div class="benefits">
      <div class="benefit-title">埋点的核心价值</div>
      <div class="benefit-grid">
        <div class="benefit-item">
          <div class="benefit-icon">🎯</div>
          <div class="benefit-text">
            <div class="benefit-name">精准决策</div>
            <div class="benefit-desc">基于数据而非直觉做决策</div>
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">🔍</div>
          <div class="benefit-text">
            <div class="benefit-name">用户洞察</div>
            <div class="benefit-desc">理解用户行为和需求</div>
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">📈</div>
          <div class="benefit-text">
            <div class="benefit-name">增长优化</div>
            <div class="benefit-desc">发现增长机会和瓶颈</div>
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">⚡</div>
          <div class="benefit-text">
            <div class="benefit-name">快速迭代</div>
            <div class="benefit-desc">验证假设，快速调整</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedAction = ref('click')
const currentStep = ref(0)

const userActions = [
  { id: 'click', name: '点击按钮', icon: '👆' },
  { id: 'view', name: '浏览页面', icon: '👀' },
  { id: 'search', name: '搜索内容', icon: '🔍' },
  { id: 'purchase', name: '购买商品', icon: '🛒' }
]

const selectedEventData = computed(() => {
  const eventMap = {
    click: {
      event: 'click_button',
      properties: {
        button_name: '立即购买',
        page: '商品详情页',
        position: '顶部'
      }
    },
    view: {
      event: 'page_view',
      properties: {
        page_title: '商品详情页',
        page_url: '/product/123',
        referrer: '首页'
      }
    },
    search: {
      event: 'search',
      properties: {
        query: 'iPhone 15',
        results_count: 42,
        filter: '价格升序'
      }
    },
    purchase: {
      event: 'purchase',
      properties: {
        order_id: 'ORD123456',
        total_amount: 7999.0,
        payment_method: '支付宝'
      }
    }
  }
  return eventMap[selectedAction.value]
})

const pipelineSteps = [
  { name: '数据采集', desc: '客户端 SDK 收集用户行为' },
  { name: '数据传输', desc: '加密上报到服务器' },
  { name: '数据清洗', desc: '去重、校验、格式化' },
  { name: '数据存储', desc: '存入数据仓库' },
  { name: '数据分析', desc: '生成报表和洞察' }
]

const metrics = ref({
  totalUsers: 158420,
  totalEvents: 8921450,
  conversionRate: 3.2,
  retentionRate: 45.8
})

let stepInterval = null

const selectAction = (action) => {
  selectedAction.value = action.id
  currentStep.value = 0

  if (stepInterval) clearInterval(stepInterval)

  stepInterval = setInterval(() => {
    if (currentStep.value < pipelineSteps.length - 1) {
      currentStep.value++
    } else {
      clearInterval(stepInterval)
    }
  }, 800)
}

const formatEventData = (data) => {
  return JSON.stringify(data.properties, null, 2)
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
.tracking-overview-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.system-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.flow-section {
  width: 100%;
  max-width: 800px;
}

.section-title {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.action-item {
  background: var(--vp-c-bg);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.action-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.action-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.action-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tracking-box {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.tracking-icon {
  font-size: 3rem;
}

.event-name {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.event-data {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.75rem;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  white-space: pre;
  overflow-x: auto;
}

.pipeline-steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
}

.pipeline-step {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem 0.75rem;
  text-align: center;
  transition: all 0.3s;
}

.pipeline-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  transform: scale(1.05);
}

.step-number {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  margin: 0 auto 0.5rem;
}

.step-name {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.insight-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.insight-card {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
}

.insight-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #1e40af;
}

.insight-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.arrow {
  font-size: 2rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
}

.benefits {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.benefit-title {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.benefit-icon {
  font-size: 2rem;
}

.benefit-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.benefit-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .action-grid,
  .insight-cards,
  .benefit-grid,
  .pipeline-steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .pipeline-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
