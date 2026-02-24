<template>
  <div class="data-analysis-root">
    <div class="data-analysis-header">
      <span class="data-analysis-title">数据分析演示</span>
    </div>

    <div v-if="!props.tab" class="data-analysis-tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['data-analysis-tab', { active: activeTab === t.id }]"
        @click="activeTab = t.id"
      >
        {{ t.name }}
      </button>
    </div>

    <div class="data-analysis-content">
      <!-- 描述性统计 -->
      <div v-if="activeTab === 'stats'" class="data-analysis-section">
        <div class="stats-demo">
          <div class="stats-input-section">
            <div class="stats-input-title">数据集</div>
            <div class="stats-input-desc">输入一组数字，计算统计指标</div>
            <div class="stats-input-wrapper">
              <input
                v-model="dataInput"
                type="text"
                class="stats-input"
                placeholder="用逗号分隔，例如：1, 2, 3, 4, 5"
                @input="calculateStats"
              />
              <button class="stats-btn" @click="generateRandomData">
                随机生成
              </button>
            </div>
          </div>

          <div class="stats-results">
            <div class="stats-result-title">统计结果</div>
            <div class="stats-grid">
              <div v-for="stat in stats" :key="stat.key" class="stat-card">
                <div class="stat-label">{{ stat.label }}</div>
                <div class="stat-value" :style="{ color: stat.color }">
                  {{ stat.value }}
                </div>
                <div class="stat-desc">{{ stat.desc }}</div>
              </div>
            </div>
          </div>

          <div class="stats-visualization">
            <div class="stats-viz-title">数据分布</div>
            <div class="stats-chart">
              <div class="stats-chart-bar">
                <div
                  v-for="(val, i) in sortedData"
                  :key="i"
                  class="stats-bar-item"
                  :style="{
                    height: getBarHeight(val),
                    background: getBarColor(i)
                  }"
                >
                  <div class="stats-bar-value">{{ val }}</div>
                </div>
              </div>
              <div class="stats-chart-mean">
                <div
                  class="stats-mean-line"
                  :style="{ left: meanLinePosition + '%' }"
                >
                  <div class="stats-mean-label">均值: {{ mean }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据聚合 -->
      <div
        v-else-if="activeTab === 'aggregation'"
        class="data-analysis-section"
      >
        <div class="aggregation-demo">
          <div class="aggregation-title">数据聚合操作</div>
          <div class="aggregation-table">
            <table class="agg-table">
              <thead>
                <tr>
                  <th>用户 ID</th>
                  <th>订单号</th>
                  <th>金额（元）</th>
                  <th>日期</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in rawOrders" :key="row.id">
                  <td>{{ row.userId }}</td>
                  <td>{{ row.orderId }}</td>
                  <td>{{ row.amount }}</td>
                  <td>{{ row.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="aggregation-operations">
            <button
              v-for="op in aggregationOps"
              :key="op.id"
              :class="['agg-op-btn', { active: activeAggOp === op.id }]"
              @click="activeAggOp = op.id"
            >
              {{ op.name }}
            </button>
          </div>

          <div class="aggregation-result">
            <div class="agg-result-title">{{ currentAggOp.name }}结果</div>
            <div class="agg-result-table">
              <table class="agg-table">
                <thead>
                  <tr>
                    <th v-for="col in currentAggResult.columns" :key="col">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in currentAggResult.data" :key="i">
                    <td v-for="col in currentAggResult.columns" :key="col">
                      {{ row[col] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="agg-result-sql">
              <div class="agg-sql-title">SQL 示例</div>
              <pre class="agg-sql-code">{{ currentAggOp.sql }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 漏斗分析 -->
      <div v-else-if="activeTab === 'funnel'" class="data-analysis-section">
        <div class="funnel-demo">
          <div class="funnel-title">用户转化漏斗</div>
          <div class="funnel-description">
            漏斗分析用于追踪用户在一系列步骤中的转化率
          </div>

          <div class="funnel-visualization">
            <div class="funnel-steps">
              <div
                v-for="(step, i) in funnelSteps"
                :key="step.name"
                class="funnel-step"
                :style="{ width: getFunnelWidth(step.count, i) }"
              >
                <div class="funnel-step-header">
                  <span class="funnel-step-name">{{ step.name }}</span>
                  <span class="funnel-step-count">{{ step.count }} 人</span>
                </div>
                <div class="funnel-step-bar"></div>
                <div class="funnel-step-conversion">
                  {{
                    i === 0
                      ? '100%'
                      : getConversionRate(step.count, funnelSteps[0].count)
                  }}
                  {{
                    i > 0
                      ? `(转化率 ${getConversionRate(step.count, funnelSteps[i - 1].count)})`
                      : ''
                  }}
                </div>
              </div>
            </div>
          </div>

          <div class="funnel-insights">
            <div class="funnel-insights-title">洞察与建议</div>
            <div class="funnel-insights-list">
              <div class="funnel-insight">
                <span class="funnel-insight-text">
                  最低转化步骤：<strong>{{ worstStep.name }}</strong> ({{
                    worstStep.rate
                  }})
                </span>
              </div>
              <div class="funnel-insight">
                <span class="funnel-insight-text">
                  整体转化率：<strong>{{ overallConversion }}</strong>
                </span>
              </div>
              <div class="funnel-insight">
                <span class="funnel-insight-text">
                  建议：优化
                  <strong>{{ worstStep.name }}</strong>
                  页面，减少表单字段或简化流程
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 留存分析 -->
      <div v-else-if="activeTab === 'retention'" class="data-analysis-section">
        <div class="retention-demo">
          <div class="retention-title">用户留存分析</div>
          <div class="retention-description">
            留存分析衡量用户在首次使用后持续使用产品的情况
          </div>

          <div class="retention-table">
            <table class="retention-table-el">
              <thead>
                <tr>
                  <th>注册日期</th>
                  <th>注册用户数</th>
                  <th>次日留存</th>
                  <th>7日留存</th>
                  <th>30日留存</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in retentionData" :key="row.date">
                  <td>{{ row.date }}</td>
                  <td>{{ row.users }}</td>
                  <td :class="getRetentionClass(row.day1)">{{ row.day1 }}%</td>
                  <td :class="getRetentionClass(row.day7)">{{ row.day7 }}%</td>
                  <td :class="getRetentionClass(row.day30)">
                    {{ row.day30 }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="retention-chart">
            <div class="retention-chart-title">留存曲线</div>
            <div class="retention-curve">
              <svg viewBox="0 0 400 200" class="retention-svg">
                <!-- 坐标轴 -->
                <line
                  x1="40"
                  y1="180"
                  x2="380"
                  y2="180"
                  stroke="#666"
                  stroke-width="1"
                />
                <line
                  x1="40"
                  y1="20"
                  x2="40"
                  y2="180"
                  stroke="#666"
                  stroke-width="1"
                />

                <!-- Y轴标签 -->
                <text x="10" y="30" font-size="10" fill="#666">100%</text>
                <text x="15" y="100" font-size="10" fill="#666">50%</text>
                <text x="20" y="180" font-size="10" fill="#666">0%</text>

                <!-- 次日留存曲线 -->
                <polyline
                  :points="
                    getRetentionCurvePoints([45, 42, 40, 38, 41, 43, 40])
                  "
                  fill="none"
                  stroke="#3b82f6"
                  stroke-width="2"
                />
                <circle
                  v-for="(i, idx) in 7"
                  :key="'d1-' + idx"
                  :cx="60 + idx * 50"
                  :cy="180 - 45 * 1.6"
                  r="4"
                  fill="#3b82f6"
                />

                <!-- 7日留存曲线 -->
                <polyline
                  :points="
                    getRetentionCurvePoints([45, 32, 28, 25, 30, 33, 29])
                  "
                  fill="none"
                  stroke="#22c55e"
                  stroke-width="2"
                />
                <circle
                  v-for="(i, idx) in 7"
                  :key="'d7-' + idx"
                  :cx="60 + idx * 50"
                  :cy="180 - 32 * 1.6"
                  r="4"
                  fill="#22c55e"
                />

                <!-- 30日留存曲线 -->
                <polyline
                  :points="
                    getRetentionCurvePoints([45, 18, 15, 12, 14, 16, 13])
                  "
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="2"
                />
                <circle
                  v-for="(i, idx) in 7"
                  :key="'d30-' + idx"
                  :cx="60 + idx * 50"
                  :cy="180 - 18 * 1.6"
                  r="4"
                  fill="#f59e0b"
                />

                <!-- X轴标签 -->
                <text
                  v-for="(day, idx) in [
                    'D1',
                    'D2',
                    'D3',
                    'D4',
                    'D5',
                    'D6',
                    'D7'
                  ]"
                  :key="day"
                  :x="60 + idx * 50"
                  y="195"
                  font-size="10"
                  fill="#666"
                  text-anchor="middle"
                >
                  {{ day }}
                </text>
              </svg>

              <div class="retention-legend">
                <div class="retention-legend-item">
                  <span
                    class="retention-legend-color"
                    style="background: #3b82f6"
                  ></span>
                  <span class="retention-legend-text">次日留存</span>
                </div>
                <div class="retention-legend-item">
                  <span
                    class="retention-legend-color"
                    style="background: #22c55e"
                  ></span>
                  <span class="retention-legend-text">7日留存</span>
                </div>
                <div class="retention-legend-item">
                  <span
                    class="retention-legend-color"
                    style="background: #f59e0b"
                  ></span>
                  <span class="retention-legend-text">30日留存</span>
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
import { ref, computed } from 'vue'

const props = defineProps({
  tab: {
    type: String,
    default: null
  }
})

const activeTab = ref(props.tab || 'stats')
const activeAggOp = ref('groupBy')

const tabs = [
  { id: 'stats', name: '描述性统计' },
  { id: 'aggregation', name: '数据聚合' },
  { id: 'funnel', name: '漏斗分析' },
  { id: 'retention', name: '留存分析' }
]

// 描述性统计
const dataInput = ref('23, 45, 67, 89, 12, 34, 56, 78, 90, 21')

const rawData = computed(() => {
  return dataInput.value
    .split(',')
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n))
})

const sortedData = computed(() => {
  return [...rawData.value].sort((a, b) => a - b)
})

const count = computed(() => rawData.value.length)

const mean = computed(() => {
  if (count.value === 0) return 0
  const sum = rawData.value.reduce((a, b) => a + b, 0)
  return (sum / count.value).toFixed(2)
})

const median = computed(() => {
  const sorted = sortedData.value
  const n = sorted.length
  if (n === 0) return 0
  if (n % 2 === 0) {
    return ((sorted[n / 2 - 1] + sorted[n / 2]) / 2).toFixed(2)
  } else {
    return sorted[Math.floor(n / 2)].toFixed(2)
  }
})

const mode = computed(() => {
  const frequency = {}
  let maxFreq = 0
  let modes = []

  rawData.value.forEach((num) => {
    frequency[num] = (frequency[num] || 0) + 1
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num]
    }
  })

  Object.keys(frequency).forEach((num) => {
    if (frequency[num] === maxFreq) {
      modes.push(num)
    }
  })

  return maxFreq === 1 ? '无' : modes.join(', ')
})

const variance = computed(() => {
  if (count.value === 0) return 0
  const squaredDiffs = rawData.value.map((num) =>
    Math.pow(num - parseFloat(mean.value), 2)
  )
  return (squaredDiffs.reduce((a, b) => a + b, 0) / count.value).toFixed(2)
})

const stdDev = computed(() => {
  return Math.sqrt(parseFloat(variance.value)).toFixed(2)
})

const stats = computed(() => [
  {
    key: 'count',
    label: '样本数',
    value: count.value,
    desc: '数据点的总数',
    color: '#3b82f6'
  },
  {
    key: 'mean',
    label: '均值',
    value: mean.value,
    desc: '所有数值的平均值',
    color: '#22c55e'
  },
  {
    key: 'median',
    label: '中位数',
    value: median.value,
    desc: '排序后位于中间的值',
    color: '#f59e0b'
  },
  {
    key: 'mode',
    label: '众数',
    value: mode.value,
    desc: '出现次数最多的值',
    color: '#8b5cf6'
  },
  {
    key: 'variance',
    label: '方差',
    value: variance.value,
    desc: '数据分散程度的度量',
    color: '#ec4899'
  },
  {
    key: 'stdDev',
    label: '标准差',
    value: stdDev.value,
    desc: '方差的平方根',
    color: '#06b6d4'
  }
])

function generateRandomData() {
  const data = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 100) + 1
  )
  dataInput.value = data.join(', ')
}

function getBarHeight(value) {
  const max = Math.max(...sortedData.value)
  const min = Math.min(...sortedData.value)
  const range = max - min || 1
  return ((value - min) / range) * 80 + 20 + '%'
}

function getBarColor(index) {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899']
  return colors[index % colors.length]
}

const meanLinePosition = computed(() => {
  const sorted = sortedData.value
  const min = Math.min(...sorted)
  const max = Math.max(...sorted)
  const range = max - min || 1
  return ((parseFloat(mean.value) - min) / range) * 100
})

function calculateStats() {
  // Triggered by input
}

// 数据聚合
const rawOrders = [
  { id: 1, userId: 'U001', orderId: 'ORD001', amount: 100, date: '2024-01-01' },
  { id: 2, userId: 'U001', orderId: 'ORD002', amount: 200, date: '2024-01-02' },
  { id: 3, userId: 'U002', orderId: 'ORD003', amount: 150, date: '2024-01-01' },
  { id: 4, userId: 'U002', orderId: 'ORD004', amount: 300, date: '2024-01-03' },
  { id: 5, userId: 'U003', orderId: 'ORD005', amount: 250, date: '2024-01-02' },
  { id: 6, userId: 'U001', orderId: 'ORD006', amount: 180, date: '2024-01-04' }
]

const aggregationOps = {
  groupBy: {
    id: 'groupBy',
    name: '按用户分组',
    sql: `SELECT user_id, COUNT(*) as order_count, SUM(amount) as total_amount
FROM orders
GROUP BY user_id;`,
    columns: ['用户 ID', '订单数', '总金额'],
    data: [
      { '用户 ID': 'U001', 订单数: 3, 总金额: 480 },
      { '用户 ID': 'U002', 订单数: 2, 总金额: 450 },
      { '用户 ID': 'U003', 订单数: 1, 总金额: 250 }
    ]
  },
  sum: {
    id: 'sum',
    name: '总销售额',
    sql: `SELECT SUM(amount) as total_sales
FROM orders;`,
    columns: ['总销售额'],
    data: [{ 总销售额: 1180 }]
  },
  avg: {
    id: 'avg',
    name: '平均订单额',
    sql: `SELECT AVG(amount) as avg_amount
FROM orders;`,
    columns: ['平均订单额'],
    data: [{ 平均订单额: 196.67 }]
  },
  max: {
    id: 'max',
    name: '最大订单额',
    sql: `SELECT MAX(amount) as max_amount
FROM orders;`,
    columns: ['最大订单额'],
    data: [{ 最大订单额: 300 }]
  }
}

const currentAggOp = computed(() => aggregationOps[activeAggOp.value])
const currentAggResult = computed(() => ({
  columns: currentAggOp.value.columns,
  data: currentAggOp.value.data
}))

// 漏斗分析
const funnelSteps = [
  { name: '访问商品页', count: 10000 },
  { name: '加入购物车', count: 6000 },
  { name: '进入结算页', count: 4000 },
  { name: '完成支付', count: 2500 }
]

function getFunnelWidth(count, index) {
  const maxWidth = 100
  const minWidth = 30
  const percentage = (count / funnelSteps[0].count) * 100
  return Math.max(minWidth, (percentage / 100) * maxWidth) + '%'
}

function getConversionRate(current, previous) {
  return ((current / previous) * 100).toFixed(1) + '%'
}

const worstStep = computed(() => {
  let worst = { name: '', rate: '100%' }
  let minRate = 100

  for (let i = 1; i < funnelSteps.length; i++) {
    const rate = (funnelSteps[i].count / funnelSteps[i - 1].count) * 100
    if (rate < minRate) {
      minRate = rate
      worst = {
        name: funnelSteps[i].name,
        rate: rate.toFixed(1) + '%'
      }
    }
  }

  return worst
})

const overallConversion = computed(() => {
  return (
    (
      (funnelSteps[funnelSteps.length - 1].count / funnelSteps[0].count) *
      100
    ).toFixed(1) + '%'
  )
})

// 留存分析
const retentionData = [
  { date: '2024-01-01', users: 1000, day1: 45, day7: 32, day30: 18 },
  { date: '2024-01-02', users: 1200, day1: 42, day7: 28, day30: 15 },
  { date: '2024-01-03', users: 950, day1: 40, day7: 25, day30: 12 },
  { date: '2024-01-04', users: 1100, day1: 38, day7: 30, day30: 14 },
  { date: '2024-01-05', users: 1050, day1: 41, day7: 33, day30: 16 },
  { date: '2024-01-06', users: 1300, day1: 43, day7: 29, day30: 13 },
  { date: '2024-01-07', users: 1150, day1: 40, day7: 31, day30: 15 }
]

function getRetentionClass(rate) {
  if (rate >= 40) return 'retention-high'
  if (rate >= 25) return 'retention-medium'
  return 'retention-low'
}

function getRetentionCurvePoints(data) {
  return data
    .map((val, idx) => {
      const x = 60 + idx * 50
      const y = 180 - val * 1.6
      return `${x},${y}`
    })
    .join(' ')
}
</script>

<style scoped>
.data-analysis-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.data-analysis-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.data-analysis-icon {
  font-size: 20px;
}

.data-analysis-title {
  font-weight: 600;
  font-size: 15px;
}

.data-analysis-tabs {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.data-analysis-tab {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.data-analysis-tab:hover {
  border-color: var(--vp-c-brand);
}

.data-analysis-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.data-analysis-content {
  padding: 20px;
}

/* 描述性统计 */
.stats-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-input-section {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.stats-input-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
}

.stats-input-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
}

.stats-input-wrapper {
  display: flex;
  gap: 10px;
}

.stats-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-family: 'Menlo', 'Monaco', monospace;
}

.stats-btn {
  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.stats-btn:hover {
  opacity: 0.9;
}

.stats-results {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.stats-result-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.stat-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.stats-visualization {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.stats-viz-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.stats-chart {
  position: relative;
  height: 200px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 20px;
}

.stats-chart-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 160px;
  gap: 8px;
}

.stats-bar-item {
  flex: 1;
  max-width: 60px;
  background: var(--vp-c-brand);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.stats-bar-value {
  position: absolute;
  top: -20px;
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stats-chart-mean {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  height: 160px;
}

.stats-mean-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ef4444;
  border-left: 2px dashed #ef4444;
}

.stats-mean-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: #ef4444;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

/* 数据聚合 */
.aggregation-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aggregation-title {
  font-weight: 600;
  font-size: 14px;
}

.aggregation-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.agg-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.agg-table th,
.agg-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.agg-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.agg-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.aggregation-operations {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.agg-op-btn {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.agg-op-btn:hover {
  border-color: var(--vp-c-brand);
}

.agg-op-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.aggregation-result {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.agg-result-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
}

.agg-result-table {
  margin-bottom: 12px;
}

.agg-result-sql {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
}

.agg-sql-title {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 8px;
  color: var(--vp-c-text-3);
}

.agg-sql-code {
  margin: 0;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
}

/* 漏斗分析 */
.funnel-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.funnel-title {
  font-weight: 600;
  font-size: 14px;
}

.funnel-description {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.funnel-visualization {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg);
}

.funnel-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.funnel-step {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 14px 18px;
  position: relative;
  transition: all 0.3s;
}

.funnel-step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.funnel-step-name {
  font-weight: 600;
  font-size: 13px;
}

.funnel-step-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.funnel-step-bar {
  height: 24px;
  background: linear-gradient(90deg, var(--vp-c-brand), #60a5fa);
  border-radius: 4px;
  margin-bottom: 8px;
}

.funnel-step-conversion {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.funnel-insights {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.funnel-insights-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
}

.funnel-insights-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.funnel-insight {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.funnel-insight-icon {
  font-size: 16px;
}

/* 留存分析 */
.retention-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.retention-title {
  font-weight: 600;
  font-size: 14px;
}

.retention-description {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.retention-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.retention-table-el {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.retention-table-el th,
.retention-table-el td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.retention-table-el th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.retention-table-el tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.retention-high {
  color: #22c55e;
  font-weight: 600;
}

.retention-medium {
  color: #f59e0b;
  font-weight: 600;
}

.retention-low {
  color: #ef4444;
  font-weight: 600;
}

.retention-chart {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.retention-chart-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
}

.retention-curve {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 16px;
}

.retention-svg {
  width: 100%;
  height: auto;
}

.retention-legend {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  justify-content: center;
}

.retention-legend-item {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 12px;
}

.retention-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.retention-legend-text {
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .aggregation-operations {
    flex-direction: column;
  }

  .funnel-steps {
    gap: 8px;
  }

  .stats-chart-bar {
    gap: 4px;
  }

  .stats-bar-value {
    font-size: 9px;
  }
}
</style>
