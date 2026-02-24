<template>
  <div class="demo ab-testing-demo">
    <div class="header">
      <span class="title">A/B 测试演示</span>
    </div>

    <div v-if="!props.tab" class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['tab', { active: activeTab === t.id }]"
        @click="activeTab = t.id"
      >
        {{ t.name }}
      </button>
    </div>

    <!-- 流量分配演示 -->
    <div v-if="activeTab === 'traffic'" class="content">
      <h4>流量分配可视化</h4>
      <p class="desc">观察用户如何被随机分配到对照组（A组）和实验组（B组）</p>

      <div class="traffic-split">
        <div class="split-container">
          <div class="group group-a" :style="{ width: trafficSplit + '%' }">
            <div class="group-label">A组 (对照组)</div>
            <div class="group-percent">{{ trafficSplit }}%</div>
          </div>
          <div
            class="group group-b"
            :style="{ width: 100 - trafficSplit + '%' }"
          >
            <div class="group-label">B组 (实验组)</div>
            <div class="group-percent">{{ 100 - trafficSplit }}%</div>
          </div>
        </div>
      </div>



      <div class="traffic-stats">
        <div class="stat-item">
          <span class="stat-label">总用户数</span>
          <span class="stat-value">{{ totalUsers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">A组用户</span>
          <span class="stat-value">{{ groupAUsers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">B组用户</span>
          <span class="stat-value">{{ groupBUsers }}</span>
        </div>
      </div>

      <div class="tips">
        <span class="tips-text">50/50分配能最快检测出差异，确保两组样本量足够大以获得统计显著性</span>
      </div>
    </div>

    <!-- 结果对比演示 -->
    <div v-if="activeTab === 'results'" class="content">
      <h4>A/B组结果对比</h4>
      <p class="desc">比较两组的转化率和统计显著性</p>

      <div class="comparison-settings">
        <div class="setting-item">
          <label>A组转化率（基准）</label>
          <input
            v-model.number="conversionA"
            type="number"
            min="1"
            max="50"
            step="0.5"
            class="number-input"
          />
          <span class="unit">%</span>
        </div>
        <div class="setting-item">
          <label>B组转化率</label>
          <input
            v-model.number="conversionB"
            type="number"
            min="1"
            max="50"
            step="0.5"
            class="number-input"
          />
          <span class="unit">%</span>
        </div>
        <div class="setting-item">
          <label>每组样本量</label>
          <input
            v-model.number="sampleSize"
            type="number"
            min="100"
            max="100000"
            step="100"
            class="number-input"
          />
        </div>
      </div>

      <div class="results-comparison">
        <div class="result-card result-a">
          <div class="card-header">A组（对照组）</div>
          <div class="card-metric">
            <span class="metric-label">转化率</span>
            <span class="metric-value">{{ conversionA }}%</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">转化数</span>
            <span class="metric-value">{{ conversionsA }}</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">样本量</span>
            <span class="metric-value">{{ sampleSize }}</span>
          </div>
        </div>

        <div class="vs-divider">VS</div>

        <div class="result-card result-b">
          <div class="card-header">B组（实验组）</div>
          <div class="card-metric">
            <span class="metric-label">转化率</span>
            <span class="metric-value">{{ conversionB }}%</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">转化数</span>
            <span class="metric-value">{{ conversionsB }}</span>
          </div>
          <div class="card-metric">
            <span class="metric-label">样本量</span>
            <span class="metric-value">{{ sampleSize }}</span>
          </div>
        </div>
      </div>

      <div class="statistical-summary">
        <div class="summary-item">
          <span class="summary-label">相对提升</span>
          <span
            class="summary-value"
            :class="{
              positive: relativeLift > 0,
              negative: relativeLift < 0,
              neutral: relativeLift === 0
            }"
          >
            {{ relativeLift > 0 ? '+' : '' }}{{ relativeLift.toFixed(2) }}%
          </span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Z值</span>
          <span class="summary-value">{{ zScore.toFixed(3) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">P值</span>
          <span class="summary-value">{{ pValue.toFixed(5) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">统计显著性</span>
          <span
            class="summary-value significance"
            :class="{
              significant: isSignificant,
              'not-significant': !isSignificant
            }"
          >
            {{ isSignificant ? '显著' : '不显著' }}
          </span>
        </div>
      </div>

      <div class="confidence-interval">
        <div class="ci-header">95%置信区间</div>
        <div class="ci-values">
          <span class="ci-bound">{{ ciLower.toFixed(2) }}%</span>
          <span class="ci-arrow">← 真实差异 →</span>
          <span class="ci-bound">{{ ciUpper.toFixed(2) }}%</span>
        </div>
        <div class="ci-note">我们有95%的信心认为，真实差异在这个区间内</div>
      </div>

      <div class="tips">
        <span class="tips-text">P值 &lt; 0.05 表示结果统计显著，说明差异不太可能是随机产生的</span>
      </div>
    </div>

    <!-- 样本量计算器 -->
    <div v-if="activeTab === 'calculator'" class="content">
      <h4>样本量计算器</h4>
      <p class="desc">计算达到统计显著性所需的最小样本量</p>

      <div class="calc-inputs">
        <div class="input-group">
          <label>基准转化率</label>
          <div class="input-wrapper">
            <input
              v-model.number="baselineRate"
              type="number"
              min="1"
              max="50"
              step="0.5"
              class="number-input"
            />
            <span class="unit">%</span>
          </div>
          <span class="input-hint">当前版本的转化率</span>
        </div>

        <div class="input-group">
          <label>最小检测提升</label>
          <div class="input-wrapper">
            <input
              v-model.number="minimumDetectable"
              type="number"
              min="1"
              max="100"
              step="1"
              class="number-input"
            />
            <span class="unit">%</span>
          </div>
          <span class="input-hint">希望检测到的最小相对提升（相对值）</span>
        </div>

        <div class="input-group">
          <label>显著性水平 (α)</label>
          <select v-model.number="alpha" class="select-input">
            <option :value="0.01">0.01 (99%置信度)</option>
            <option :value="0.05">0.05 (95%置信度) - 推荐</option>
            <option :value="0.1">0.1 (90%置信度)</option>
          </select>
          <span class="input-hint">犯第一类错误的概率</span>
        </div>

        <div class="input-group">
          <label>统计功效 (1-β)</label>
          <select v-model.number="power" class="select-input">
            <option :value="0.7">70%</option>
            <option :value="0.8">80% - 推荐</option>
            <option :value="0.9">90%</option>
          </select>
          <span class="input-hint">检测到真实效应的概率</span>
        </div>
      </div>

      <button class="btn-primary btn-calc" @click="calculateSampleSize">
        计算所需样本量
      </button>

      <div v-if="calculatedSampleSize > 0" class="calc-results">
        <div class="result-highlight">
          <div class="highlight-label">每组所需样本量</div>
          <div class="highlight-value">
            {{ calculatedSampleSize.toLocaleString() }}
          </div>
        </div>

        <div class="result-details">
          <div class="detail-row">
            <span class="detail-label">总样本量（A+B组）</span>
            <span class="detail-value">{{
              (calculatedSampleSize * 2).toLocaleString()
            }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">目标转化率（实验组）</span>
            <span class="detail-value">{{ targetRate }}%</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">绝对差异</span>
            <span class="detail-value">{{ absoluteDifference }}%</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">检测时长估算</span>
            <span class="detail-value">{{ estimatedDays }}</span>
          </div>
        </div>
      </div>

      <div class="tips">
        <span class="tips-text">提升目标越小，所需样本量越大。5%的提升比20%的提升需要更多样本</span>
      </div>
    </div>

    <!-- 常见误区 -->
    <div v-if="activeTab === 'pitfalls'" class="content">
      <h4>A/B测试常见误区</h4>

      <div class="pitfall-list">
        <div v-for="pitfall in pitfalls" :key="pitfall.id" class="pitfall-card">
          <div class="pitfall-header">
            <span class="pitfall-title">{{ pitfall.title }}</span>
          </div>
          <div class="pitfall-desc">{{ pitfall.description }}</div>
          <div class="pitfall-example">
            <strong>示例：</strong>{{ pitfall.example }}
          </div>
          <div class="pitfall-solution">
            <strong>解决方案：</strong>{{ pitfall.solution }}
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

const activeTab = ref(props.tab || 'traffic')

const tabs = [
  { id: 'traffic', name: '流量分配' },
  { id: 'results', name: '结果对比' },
  { id: 'calculator', name: '样本量计算' },
  { id: 'pitfalls', name: '常见误区' }
]

// 流量分配相关
const groupAUsers = ref(500)
const groupBUsers = ref(500)

const totalUsers = computed(() => groupAUsers.value + groupBUsers.value)
const trafficSplit = computed(() => {
  if (totalUsers.value === 0) return 50
  return Math.round((groupAUsers.value / totalUsers.value) * 100)
})

function allocateUser() {
  if (Math.random() < 0.5) {
    groupAUsers.value++
  } else {
    groupBUsers.value++
  }
}

function allocateBatch() {
  for (let i = 0; i < 100; i++) {
    allocateUser()
  }
}

function resetTraffic() {
  groupAUsers.value = 500
  groupBUsers.value = 500
}

// 结果对比相关
const conversionA = ref(5.0)
const conversionB = ref(6.0)
const sampleSize = ref(10000)

const conversionsA = computed(
  () => Math.round((conversionA.value / 100) * sampleSize.value)
)
const conversionsB = computed(
  () => Math.round((conversionB.value / 100) * sampleSize.value)
)

const relativeLift = computed(() => {
  if (conversionA.value === 0) return 0
  return ((conversionB.value - conversionA.value) / conversionA.value) * 100
})

// Z-score计算
const zScore = computed(() => {
  const p1 = conversionA.value / 100
  const p2 = conversionB.value / 100
  const n1 = sampleSize.value
  const n2 = sampleSize.value

  const pooledP = (conversionsA.value + conversionsB.value) / (n1 + n2)
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2))

  if (se === 0) return 0
  return (p2 - p1) / se
})

const pValue = computed(() => {
  const z = Math.abs(zScore.value)
  // 使用标准正态分布的近似
  return 2 * (1 - normalCDF(z))
})

function normalCDF(x) {
  // 标准正态分布累积分布函数近似
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)

  const t = 1.0 / (1.0 + p * x)
  const y =
    1.0 -
    (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return 0.5 * (1.0 + sign * y)
}

const isSignificant = computed(() => pValue.value < 0.05)

// 95%置信区间
const ciLower = computed(() => {
  const diff = conversionB.value - conversionA.value
  const p1 = conversionA.value / 100
  const p2 = conversionB.value / 100
  const n = sampleSize.value

  const se = Math.sqrt((p1 * (1 - p1)) / n + (p2 * (1 - p2)) / n)
  const margin = 1.96 * se * 100 // 1.95996是95%置信区间的z值

  return diff - margin
})

const ciUpper = computed(() => {
  const diff = conversionB.value - conversionA.value
  const p1 = conversionA.value / 100
  const p2 = conversionB.value / 100
  const n = sampleSize.value

  const se = Math.sqrt((p1 * (1 - p1)) / n + (p2 * (1 - p2)) / n)
  const margin = 1.96 * se * 100

  return diff + margin
})

// 样本量计算器相关
const baselineRate = ref(5.0)
const minimumDetectable = ref(20)
const alpha = ref(0.05)
const power = ref(0.8)
const calculatedSampleSize = ref(0)

const targetRate = computed(
  () => (baselineRate.value * (1 + minimumDetectable.value / 100)).toFixed(2)
)

const absoluteDifference = computed(
  () => (targetRate.value - baselineRate.value).toFixed(2)
)

const estimatedDays = computed(() => {
  const dailyVisitors = 5000 // 假设每日5000访客
  const totalNeeded = calculatedSampleSize.value * 2
  const days = Math.ceil(totalNeeded / dailyVisitors)
  return `约 ${days} 天`
})

function calculateSampleSize() {
  const p1 = baselineRate.value / 100
  const p2 = targetRate.value / 100
  const constZa = 1.96 // alpha = 0.05对应的z值
  const constZb = 0.84 // power = 0.8对应的z值

  // 合并标准差
  const pBar = (p1 + p2) / 2
  const sd1 = Math.sqrt(2 * pBar * (1 - pBar))
  const sd2 = Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))

  // 简化的样本量公式
  const n =
    (Math.pow(constZa * sd1 + constZb * sd2, 2)) / Math.pow(p2 - p1, 2)

  calculatedSampleSize.value = Math.ceil(n)
}

// 常见误区数据
const pitfalls = [
  {
    id: 'early-stop',
    title: '过早停止实验',
    description:
      '看到结果"显著"就立即停止实验，实际上只是随机波动',
    example:
      '运行2天后发现B组领先，立即宣布胜利。但继续运行一周后，差异消失。',
    solution: '预先计算所需样本量，运行完整周期（至少2周）后再做决策'
  },
  {
    id: 'peeking',
    title: '频繁窥探结果',
    description: '每天查看数据，一旦"显著"就停止，这会大幅增加假阳性率',
    example:
      '每天检查p值，看到<0.05就停止。这种做法会让假阳性率从5%飙升到30%+。',
    solution: '使用序贯检验方法，或预先设定唯一的检查点'
  },
  {
    id: 'simpson',
    title: '辛普森悖论',
    description: '分组看B组更差，但合并后B组反而更好（或相反）',
    example:
      '移动端转化率B>A，桌面端也是B>A，但合并后却A>B。原因：流量分配不均。',
    solution: '按流量来源、设备、用户群体等维度分别分析，验证随机化是否正确'
  },
  {
    id: 'p-hacking',
    title: 'P值操纵（P-hacking）',
    description: '通过尝试不同指标、不同子群体，直到找到"显著"结果',
    example:
      '主指标不显著，就按年龄、地区、设备细分，发现某个子群显著就宣称成功。',
    solution: '预先注册假设和指标，只分析预先设定的指标'
  },
  {
    id: 'novelty',
    title: '新奇效应',
    description: '用户因好奇点击新功能，导致短期数据虚高',
    example:
      '新按钮上线首周点击率提升30%，但三周后回落到原水平甚至更低。',
    solution: '运行足够长的时间（至少2-4周），让新奇效应消退'
  },
  {
    id: 'underpowered',
    title: '样本量不足',
    description: '样本量太小，即使有真实差异也检测不出来',
    example:
      '预期提升5%，但只运行了1000样本，结果"不显著"就放弃，实际上需要30000样本。',
    solution: '实验前计算所需样本量，确保统计功效≥80%'
  }
]
</script>

<style scoped>
.ab-testing-demo {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.icon {
  font-size: 24px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.tab:hover {
  background: #e2e8f0;
}

.tab.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.content {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
}

.content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #1e293b;
}

.desc {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 16px;
}

/* 流量分配样式 */
.traffic-split {
  margin-bottom: 20px;
}

.split-container {
  display: flex;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease;
}

.group-a {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.group-b {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.group-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.group-percent {
  font-size: 32px;
  font-weight: 700;
}

.traffic-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-tertiary,
.btn-calc {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #8b5cf6;
  color: white;
}

.btn-secondary:hover {
  background: #7c3aed;
}

.btn-tertiary {
  background: #64748b;
  color: white;
}

.btn-tertiary:hover {
  background: #475569;
}

.btn-calc {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  padding: 12px;
}

.traffic-stats {
  display: flex;
  gap: 24px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

/* 结果对比样式 */
.comparison-settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item label {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.number-input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.unit {
  font-size: 14px;
  color: #64748b;
  margin-left: -40px;
  padding-left: 4px;
}

.setting-item {
  position: relative;
}

.setting-item .unit {
  position: absolute;
  right: 12px;
  top: 33px;
}

.setting-item input {
  padding-right: 40px;
}

.results-comparison {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.result-card {
  flex: 1;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.result-a {
  border-left: 4px solid #3b82f6;
}

.result-b {
  border-left: 4px solid #f59e0b;
}

.card-header {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
}

.card-metric {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.card-metric:last-child {
  border-bottom: none;
}

.metric-label {
  font-size: 13px;
  color: #64748b;
}

.metric-value {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.vs-divider {
  font-size: 20px;
  font-weight: 700;
  color: #94a3b8;
  padding: 0 8px;
}

.statistical-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.summary-item {
  background: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-label {
  font-size: 12px;
  color: #64748b;
}

.summary-value {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.summary-value.positive {
  color: #10b981;
}

.summary-value.negative {
  color: #ef4444;
}

.summary-value.neutral {
  color: #64748b;
}

.summary-value.significance.significant {
  color: #10b981;
}

.summary-value.significance.not-significant {
  color: #f59e0b;
}

.confidence-interval {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.ci-header {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 12px;
}

.ci-values {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 16px;
}

.ci-bound {
  font-weight: 600;
  color: #3b82f6;
}

.ci-arrow {
  color: #94a3b8;
  font-size: 14px;
}

.ci-note {
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-top: 12px;
}

/* 样本量计算器样式 */
.calc-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .unit {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0;
  padding-left: 0;
}

.input-wrapper input {
  padding-right: 40px;
}

.select-input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  width: 100%;
}

.input-hint {
  font-size: 12px;
  color: #94a3b8;
}

.calc-results {
  margin-top: 20px;
}

.result-highlight {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
}

.highlight-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.highlight-value {
  font-size: 36px;
  font-weight: 700;
}

.result-details {
  background: white;
  padding: 16px;
  border-radius: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 14px;
  color: #64748b;
}

.detail-value {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

/* 常见误区样式 */
.pitfall-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pitfall-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #f59e0b;
}

.pitfall-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.pitfall-icon {
  font-size: 24px;
}

.pitfall-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.pitfall-desc {
  font-size: 14px;
  color: #475569;
  margin-bottom: 12px;
  line-height: 1.6;
}

.pitfall-example {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
  padding: 12px;
  background: #fef3c7;
  border-radius: 6px;
  line-height: 1.6;
}

.pitfall-solution {
  font-size: 13px;
  color: #059669;
  padding: 12px;
  background: #d1fae5;
  border-radius: 6px;
  line-height: 1.6;
}

/* 提示框样式 */
.tips {
  display: flex;
  gap: 12px;
  background: #fef3c7;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.tips-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.tips-text {
  font-size: 14px;
  color: #92400e;
  line-height: 1.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .results-comparison {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
  }

  .statistical-summary {
    grid-template-columns: 1fr;
  }
}
</style>
