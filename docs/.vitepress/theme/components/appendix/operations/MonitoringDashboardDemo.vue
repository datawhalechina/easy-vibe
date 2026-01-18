<!--
  MonitoringDashboardDemo.vue
  监控面板演示：展示基础设施、应用、业务三个层次的监控指标
-->
<template>
  <div class="monitoring-dashboard">
    <div class="header">
      <div class="title">实时监控面板 (Monitoring Dashboard)</div>
      <div class="subtitle">运维的"眼睛" - 让系统状态一目了然</div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="dashboard-content">
      <!-- 基础设施监控 -->
      <div v-if="activeTab === 'infra'" class="metrics-grid">
        <div
          v-for="metric in infraMetrics"
          :key="metric.name"
          class="metric-card"
        >
          <div class="metric-header">
            <span class="metric-name">{{ metric.name }}</span>
            <span class="metric-value"
              >{{ metric.value }}{{ metric.unit }}</span
            >
          </div>
          <div class="metric-chart">
            <div
              class="chart-bar"
              :style="{
                width: metric.value + '%',
                background: getColor(metric.value, metric.threshold)
              }"
            ></div>
          </div>
          <div
            class="metric-status"
            :class="getStatus(metric.value, metric.threshold)"
          >
            {{ getStatusText(metric.value, metric.threshold) }}
          </div>
        </div>
      </div>

      <!-- 应用监控 -->
      <div v-if="activeTab === 'app'" class="metrics-grid">
        <div class="metric-card large">
          <div class="metric-header">
            <span class="metric-name">QPS (每秒请求数)</span>
            <span class="metric-value">{{ qps }}</span>
          </div>
          <div class="qps-chart">
            <div
              v-for="(height, index) in qpsHistory"
              :key="index"
              class="qps-bar"
              :style="{ height: height + '%' }"
            ></div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-name">平均响应时间</span>
            <span class="metric-value">{{ latency }} ms</span>
          </div>
          <div
            class="metric-status"
            :class="latency > 500 ? 'critical' : 'normal'"
          >
            {{ latency > 500 ? '需要优化' : '正常' }}
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-name">错误率</span>
            <span class="metric-value">{{ errorRate }}%</span>
          </div>
          <div
            class="metric-status"
            :class="errorRate > 1 ? 'critical' : 'normal'"
          >
            {{ errorRate > 1 ? '告警' : '正常' }}
          </div>
        </div>
      </div>

      <!-- 业务监控 -->
      <div v-if="activeTab === 'business'" class="metrics-grid">
        <div
          v-for="metric in businessMetrics"
          :key="metric.name"
          class="metric-card"
        >
          <div class="metric-header">
            <span class="metric-name">{{ metric.name }}</span>
            <span class="metric-value">{{ metric.value }}</span>
          </div>
          <div class="trend" :class="metric.trend">
            {{
              metric.trend === 'up'
                ? '📈 上升'
                : metric.trend === 'down'
                  ? '📉 下降'
                  : '➡️ 持平'
            }}
          </div>
          <div class="metric-desc">{{ metric.desc }}</div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="item">
        <span class="dot normal"></span>
        <span>正常 (Normal)</span>
      </div>
      <div class="item">
        <span class="dot warning"></span>
        <span>警告 (Warning)</span>
      </div>
      <div class="item">
        <span class="dot critical"></span>
        <span>严重 (Critical)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeTab = ref('infra')

const tabs = [
  { id: 'infra', name: '基础设施' },
  { id: 'app', name: '应用监控' },
  { id: 'business', name: '业务监控' }
]

const infraMetrics = ref([
  { name: 'CPU 使用率', value: 45, unit: '%', threshold: 80 },
  { name: '内存使用率', value: 62, unit: '%', threshold: 85 },
  { name: '磁盘使用率', value: 78, unit: '%', threshold: 90 },
  { name: '网络带宽', value: 34, unit: '%', threshold: 80 },
  { name: '磁盘 I/O', value: 55, unit: '%', threshold: 70 },
  { name: '负载均衡', value: 42, unit: '%', threshold: 75 }
])

const qps = ref(1250)
const latency = ref(180)
const errorRate = ref(0.12)

const qpsHistory = ref([
  40, 55, 45, 60, 50, 65, 70, 60, 75, 80, 70, 85, 90, 80, 95, 100
])

const businessMetrics = ref([
  {
    name: '在线用户数',
    value: '12,458',
    trend: 'up',
    desc: '当前实时在线用户'
  },
  {
    name: '订单量/小时',
    value: '856',
    trend: 'up',
    desc: '过去一小时的订单数'
  },
  {
    name: '支付成功率',
    value: '98.5%',
    trend: 'stable',
    desc: '支付成功的比例'
  },
  {
    name: 'DAU (日活)',
    value: '45,621',
    trend: 'up',
    desc: '今日活跃用户数'
  }
])

let interval = null

const getColor = (value, threshold) => {
  if (value >= threshold) return '#ef4444'
  if (value >= threshold * 0.8) return '#f59e0b'
  return '#22c55e'
}

const getStatus = (value, threshold) => {
  if (value >= threshold) return 'critical'
  if (value >= threshold * 0.8) return 'warning'
  return 'normal'
}

const getStatusText = (value, threshold) => {
  if (value >= threshold) return '严重'
  if (value >= threshold * 0.8) return '警告'
  return '正常'
}

const updateMetrics = () => {
  // 更新基础设施指标
  infraMetrics.value = infraMetrics.value.map((metric) => ({
    ...metric,
    value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10))
  }))

  // 更新应用指标
  qps.value = Math.round(1200 + Math.random() * 200)
  latency.value = Math.round(150 + Math.random() * 100)
  errorRate.value = Math.max(
    0,
    Math.round((0.1 + Math.random() * 0.3) * 100) / 100
  )

  // 更新 QPS 历史图表
  qpsHistory.value.shift()
  qpsHistory.value.push(Math.round(40 + Math.random() * 60))
}

onMounted(() => {
  interval = setInterval(updateMetrics, 2000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.monitoring-dashboard {
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

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  border-radius: 6px;
  transition: all 0.2s;
}

.tab:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.tab.active {
  background: var(--vp-c-brand);
  color: #fff;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.metric-card.large {
  grid-column: span 2;
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.metric-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.metric-chart {
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.chart-bar {
  height: 100%;
  transition: width 0.5s ease;
}

.metric-status {
  font-size: 0.85rem;
  font-weight: 600;
}

.metric-status.normal {
  color: #22c55e;
}

.metric-status.warning {
  color: #f59e0b;
}

.metric-status.critical {
  color: #ef4444;
}

.qps-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 80px;
  margin-top: 0.5rem;
}

.qps-bar {
  flex: 1;
  background: var(--vp-c-brand);
  border-radius: 2px 2px 0 0;
  min-height: 10px;
  transition: height 0.3s ease;
}

.trend {
  font-size: 0.85rem;
  margin: 0.5rem 0;
  font-weight: 600;
}

.trend.up {
  color: #22c55e;
}

.trend.down {
  color: #ef4444;
}

.trend.stable {
  color: var(--vp-c-text-2);
}

.metric-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.legend {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.normal {
  background: #22c55e;
}

.dot.warning {
  background: #f59e0b;
}

.dot.critical {
  background: #ef4444;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .metric-card.large {
    grid-column: span 1;
  }
}
</style>
