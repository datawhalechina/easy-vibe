<!--
  RealWorldCaseDemo.vue
  实战案例 - 电商、推荐、用户行为分析埋点设计
-->
<template>
  <div class="real-world-case-demo">
    <div class="header">
      <div class="title">实战案例</div>
      <div class="subtitle">真实场景下的埋点设计最佳实践</div>
    </div>

    <div class="case-tabs">
      <button
        v-for="caseItem in cases"
        :key="caseItem.id"
        class="case-tab"
        :class="{ active: selectedCase === caseItem.id }"
        @click="selectedCase = caseItem.id"
      >
        {{ caseItem.name }}
      </button>
    </div>

    <div class="case-content">
      <!-- 电商系统 -->
      <div v-if="selectedCase === 'ecommerce'" class="case-detail">
        <div class="case-intro">
          <div class="intro-icon">🛒</div>
          <div class="intro-text">
            <div class="intro-title">电商系统埋点设计</div>
            <div class="intro-desc">分析购买转化漏斗，优化用户体验</div>
          </div>
        </div>

        <div class="funnel-visualization">
          <div class="funnel-title">购买转化漏斗</div>
          <div class="funnel-steps">
            <div
              v-for="(step, index) in ecommerceFunnel"
              :key="index"
              class="funnel-step"
              :style="{ width: step.width }"
            >
              <div class="step-name">{{ step.name }}</div>
              <div class="step-count">{{ formatNumber(step.count) }}</div>
              <div class="step-rate">{{ step.rate }}%</div>
            </div>
          </div>
        </div>

        <div class="tracking-events">
          <div class="events-title">关键埋点</div>
          <div class="events-list">
            <div
              v-for="(event, index) in ecommerceEvents"
              :key="index"
              class="event-item"
            >
              <div class="event-code">
                <code>{{ event.name }}</code>
              </div>
              <div class="event-details">
                <div class="event-trigger">{{ event.trigger }}</div>
                <div class="event-props">
                  <span
                    v-for="(prop, i) in event.props"
                    :key="i"
                    class="prop-tag"
                  >
                    {{ prop }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐系统 -->
      <div v-if="selectedCase === 'recommendation'" class="case-detail">
        <div class="case-intro">
          <div class="intro-icon">🎯</div>
          <div class="intro-text">
            <div class="intro-title">内容推荐埋点设计</div>
            <div class="intro-desc">优化推荐算法，提高点击率</div>
          </div>
        </div>

        <div class="ab-test-demo">
          <div class="ab-title">A/B 测试效果对比</div>
          <div class="ab-metrics">
            <div class="metric-group">
              <div class="metric-label">算法 A</div>
              <div class="metric-value">{{ abTest.algorithmA }}%</div>
              <div class="metric-bar">
                <div
                  class="bar-fill"
                  :style="{ width: abTest.algorithmA + '%' }"
                ></div>
              </div>
            </div>
            <div class="metric-group">
              <div class="metric-label">算法 B</div>
              <div class="metric-value">{{ abTest.algorithmB }}%</div>
              <div class="metric-bar">
                <div
                  class="bar-fill better"
                  :style="{ width: abTest.algorithmB + '%' }"
                ></div>
              </div>
            </div>
          </div>
          <div class="ab-conclusion">
            ✨ 算法 B 点击率提升
            <span class="highlight"
              >{{
                (
                  ((abTest.algorithmB - abTest.algorithmA) /
                    abTest.algorithmA) *
                  100
                ).toFixed(1)
              }}%</span
            >
          </div>
        </div>

        <div class="tracking-events">
          <div class="events-title">关键埋点</div>
          <div class="events-list">
            <div
              v-for="(event, index) in recommendationEvents"
              :key="index"
              class="event-item"
            >
              <div class="event-code">
                <code>{{ event.name }}</code>
              </div>
              <div class="event-details">
                <div class="event-trigger">{{ event.trigger }}</div>
                <div class="event-props">
                  <span
                    v-for="(prop, i) in event.props"
                    :key="i"
                    class="prop-tag"
                  >
                    {{ prop }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 用户行为分析 -->
      <div v-if="selectedCase === 'userbehavior'" class="case-detail">
        <div class="case-intro">
          <div class="intro-icon">👤</div>
          <div class="intro-text">
            <div class="intro-title">用户行为分析埋点</div>
            <div class="intro-desc">分析用户粘性，识别流失风险</div>
          </div>
        </div>

        <div class="rfm-segments">
          <div class="segments-title">RFM 用户分群</div>
          <div class="segments-grid">
            <div
              v-for="(segment, index) in rfmSegments"
              :key="index"
              class="segment-card"
              :class="segment.type"
            >
              <div class="segment-name">{{ segment.name }}</div>
              <div class="segment-users">
                {{ formatNumber(segment.users) }} 用户
              </div>
              <div class="segment-desc">{{ segment.desc }}</div>
            </div>
          </div>
        </div>

        <div class="retention-chart">
          <div class="chart-title">用户留存率</div>
          <div class="chart-bars">
            <div
              v-for="(data, index) in retentionData"
              :key="index"
              class="chart-bar"
            >
              <div class="bar-label">{{ data.label }}</div>
              <div class="bar-container">
                <div
                  class="bar-fill"
                  :style="{ height: data.rate + '%' }"
                ></div>
              </div>
              <div class="bar-value">{{ data.rate }}%</div>
            </div>
          </div>
        </div>

        <div class="tracking-events">
          <div class="events-title">关键埋点</div>
          <div class="events-list">
            <div
              v-for="(event, index) in userBehaviorEvents"
              :key="index"
              class="event-item"
            >
              <div class="event-code">
                <code>{{ event.name }}</code>
              </div>
              <div class="event-details">
                <div class="event-trigger">{{ event.trigger }}</div>
                <div class="event-props">
                  <span
                    v-for="(prop, i) in event.props"
                    :key="i"
                    class="prop-tag"
                  >
                    {{ prop }}
                  </span>
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

const selectedCase = ref('ecommerce')

const cases = [
  { id: 'ecommerce', name: '电商系统' },
  { id: 'recommendation', name: '内容推荐' },
  { id: 'userbehavior', name: '用户行为' }
]

const ecommerceFunnel = [
  { name: '浏览商品', count: 100000, rate: 100, width: '100%' },
  { name: '加入购物车', count: 25000, rate: 25, width: '80%' },
  { name: '查看购物车', count: 18000, rate: 18, width: '60%' },
  { name: '开始结算', count: 12000, rate: 12, width: '45%' },
  { name: '支付成功', count: 8500, rate: 8.5, width: '30%' }
]

const ecommerceEvents = [
  {
    name: 'view_product',
    trigger: '商品详情页浏览',
    props: ['product_id', 'category', 'source', 'position']
  },
  {
    name: 'add_to_cart',
    trigger: '加入购物车',
    props: ['product_id', 'quantity', 'price', 'source']
  },
  {
    name: 'begin_checkout',
    trigger: '开始结算',
    props: ['cart_total', 'item_count', 'payment_method']
  },
  {
    name: 'purchase',
    trigger: '支付成功',
    props: ['order_id', 'total_amount', 'coupon', 'payment_method']
  }
]

const abTest = {
  algorithmA: 3.2,
  algorithmB: 4.1
}

const recommendationEvents = [
  {
    name: 'recommend_exposure',
    trigger: '推荐内容曝光',
    props: ['item_id', 'position', 'algorithm', 'rank_score']
  },
  {
    name: 'recommend_click',
    trigger: '点击推荐内容',
    props: ['item_id', 'position', 'algorithm']
  },
  {
    name: 'content_view_duration',
    trigger: '内容观看时长',
    props: ['item_id', 'duration', 'completion_rate']
  }
]

const rfmSegments = [
  {
    name: '高价值用户',
    users: 15842,
    desc: '最近购买+高频+高金额',
    type: 'high'
  },
  {
    name: '重要保持客户',
    users: 32158,
    desc: '最近购买+高频+中金额',
    type: 'medium'
  },
  { name: '流失风险用户', users: 28456, desc: '很久未购买+低频', type: 'risk' },
  { name: '已流失用户', users: 45123, desc: '超过90天未购买', type: 'lost' }
]

const retentionData = [
  { label: '次日', rate: 45 },
  { label: '7日', rate: 32 },
  { label: '30日', rate: 18 },
  { label: '90日', rate: 8 }
]

const userBehaviorEvents = [
  {
    name: 'app_start',
    trigger: 'App 启动',
    props: ['source', 'is_first_launch', 'last_visit_days']
  },
  {
    name: 'daily_active',
    trigger: '每日活跃',
    props: ['session_count', 'total_duration', 'feature_usage']
  },
  {
    name: 'feature_usage',
    trigger: '功能使用',
    props: ['feature_name', 'usage_duration', 'action_count']
  }
]

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<style scoped>
.real-world-case-demo {
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

.case-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.case-tab {
  padding: 0.75rem 2rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
}

.case-tab:hover {
  border-color: var(--vp-c-brand);
}

.case-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.case-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.case-intro {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.intro-icon {
  font-size: 3rem;
}

.intro-title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.intro-desc {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.funnel-visualization,
.ab-test-demo,
.rfm-segments,
.retention-chart {
  margin-bottom: 2rem;
}

.funnel-title,
.ab-title,
.segments-title,
.chart-title,
.events-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.funnel-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.funnel-step {
  background: linear-gradient(90deg, var(--vp-c-brand), #3b82f6);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: width 0.5s;
}

.step-name {
  font-weight: 600;
}

.step-count {
  font-weight: 700;
}

.ab-metrics {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.metric-group {
  margin-bottom: 1rem;
}

.metric-label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.metric-bar {
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 4px;
  transition: width 0.5s;
}

.bar-fill.better {
  background: #22c55e;
}

.ab-conclusion {
  text-align: center;
  padding: 1rem;
  background: #dcfce7;
  border-radius: 8px;
  font-weight: 600;
}

.highlight {
  color: #22c55e;
  font-size: 1.1rem;
}

.segments-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.segment-card {
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.segment-card.high {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border: 2px solid #22c55e;
}

.segment-card.medium {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border: 2px solid #3b82f6;
}

.segment-card.risk {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
}

.segment-card.lost {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  border: 2px solid #ef4444;
}

.segment-name {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.segment-users {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.segment-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 10px;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.bar-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.bar-container {
  width: 40px;
  height: 150px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  display: flex;
  align-items: flex-end;
}

.chart-bar .bar-fill {
  width: 100%;
  background: linear-gradient(180deg, var(--vp-c-brand), #3b82f6);
  border-radius: 4px;
  transition: height 0.5s;
}

.bar-value {
  font-size: 0.85rem;
  font-weight: 600;
}

.tracking-events {
  margin-bottom: 1rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.event-code code {
  background: #1e1e1e;
  color: #ce9178;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
}

.event-details {
  flex: 1;
}

.event-trigger {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.event-props {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prop-tag {
  padding: 0.15rem 0.5rem;
  background: white;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: 'Monaco', 'Courier New', monospace;
}

@media (max-width: 768px) {
  .segments-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .chart-bars {
    height: 150px;
  }

  .event-item {
    flex-direction: column;
  }
}
</style>
