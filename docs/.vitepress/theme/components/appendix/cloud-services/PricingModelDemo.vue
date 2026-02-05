<template>
  <div class="pricing-model-demo">
    <div class="demo-header">
      <h4>云服务器计费模式计算器</h4>
      <p class="demo-desc">输入您的使用场景，对比不同计费模式的成本</p>
    </div>

    <div class="calculator-inputs">
      <div class="input-section">
        <h5>基础配置</h5>
        <div class="input-grid">
          <div class="input-group">
            <label>实例规格</label>
            <select v-model="config.instanceType">
              <option v-for="type in instanceTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label>数量 (台)</label>
            <input v-model.number="config.quantity" type="number" min="1" max="100" />
          </div>
        </div>
      </div>

      <div class="input-section">
        <h5>使用模式</h5>
        <div class="input-grid">
          <div class="input-group">
            <label>每日运行时长 (小时)</label>
            <input v-model.number="config.dailyHours" type="range" min="1" max="24" />
            <span class="range-value">{{ config.dailyHours }} 小时</span>
          </div>
          <div class="input-group">
            <label>每月运行天数</label>
            <input v-model.number="config.monthlyDays" type="range" min="1" max="31" />
            <span class="range-value">{{ config.monthlyDays }} 天</span>
          </div>
        </div>
      </div>

      <div class="input-section">
        <h5>计费偏好</h5>
        <div class="billing-options">
          <label v-for="option in billingOptions" :key="option.value" class="option-card"
            :class="{ active: config.billingType === option.value }">
            <input type="radio" v-model="config.billingType" :value="option.value" />
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-name">{{ option.label }}</span>
            <span class="option-desc">{{ option.desc }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="cost-comparison">
      <h5>成本对比分析</h5>
      <div class="comparison-chart">
        <div v-for="model in costComparison" :key="model.type" class="chart-bar"
          :class="{ recommended: model.recommended }">
          <div class="bar-label">{{ model.label }}</div>
          <div class="bar-visual">
            <div class="bar-fill" :style="{ height: model.percentage + '%' }"
              :class="model.type"></div>
          </div>
          <div class="bar-value">
            <span class="amount">{{ model.cost }}</span>
            <span v-if="model.savings" class="savings">省 {{ model.savings }}</span>
          </div>
          <div v-if="model.recommended" class="recommend-badge">推荐</div>
        </div>
      </div>
    </div>

    <div class="recommendation-panel">
      <div class="rec-header">
        <span class="rec-icon">💡</span>
        <span class="rec-title">优化建议</span>
      </div>
      <div class="rec-content">
        <div v-for="(tip, index) in optimizationTips" :key="index" class="tip-item">
          <span class="tip-num">{{ index + 1 }}</span>
          <span class="tip-text">{{ tip }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const config = ref({
  instanceType: 'medium',
  quantity: 2,
  dailyHours: 12,
  monthlyDays: 22,
  billingType: 'ondemand'
})

const instanceTypes = [
  { value: 'small', label: '小型 (2核4G)' },
  { value: 'medium', label: '中型 (4核8G)' },
  { value: 'large', label: '大型 (8核16G)' },
  { value: 'xlarge', label: '超大型 (16核32G)' }
]

const billingOptions = [
  { value: 'ondemand', label: '按需付费', icon: '⚡', desc: '按实际使用时长计费，灵活性最高' },
  { value: 'reserved', label: '预留实例', icon: '📅', desc: '预付费用换取更低单价，适合长期稳定负载' },
  { value: 'spot', label: '抢占式', icon: '💰', desc: '利用闲置资源，价格极低但可能被回收' }
]

const hourlyRates = {
  small: { ondemand: 0.05, reserved: 0.03, spot: 0.015 },
  medium: { ondemand: 0.10, reserved: 0.06, spot: 0.03 },
  large: { ondemand: 0.20, reserved: 0.12, spot: 0.06 },
  xlarge: { ondemand: 0.40, reserved: 0.24, spot: 0.12 }
}

const costComparison = computed(() => {
  const rate = hourlyRates[config.value.instanceType]
  const monthlyHours = config.value.dailyHours * config.value.monthlyDays * config.value.quantity

  const costs = [
    { type: 'ondemand', label: '按需付费', rate: rate.ondemand },
    { type: 'reserved', label: '预留实例', rate: rate.reserved },
    { type: 'spot', label: '抢占式', rate: rate.spot }
  ]

  const maxCost = Math.max(...costs.map(c => c.rate * monthlyHours))

  return costs.map(c => {
    const cost = c.rate * monthlyHours
    const percentage = (cost / maxCost) * 100
    const isRecommended = c.type === config.value.billingType
    const savings = c.type === 'ondemand' ? null :
      Math.round(((rate.ondemand - c.rate) / rate.ondemand) * 100) + '%'

    return {
      type: c.type,
      label: c.label,
      cost: '$' + cost.toFixed(2) + '/月',
      percentage,
      recommended: isRecommended,
      savings
    }
  })
})

const optimizationTips = computed(() => {
  const tips = []

  if (config.value.dailyHours < 8) {
    tips.push('每日运行时间较短，考虑使用抢占式实例降低成本')
  }

  if (config.value.monthlyDays > 25) {
    tips.push('月度运行天数接近全月，预留实例可节省 30-60% 成本')
  }

  if (config.value.quantity > 5) {
    tips.push('实例数量较多，建议混合使用预留实例和按需实例')
  }

  if (config.value.billingType === 'ondemand' && config.value.monthlyDays > 20) {
    tips.push('当前使用按需付费但负载稳定，切换预留实例可显著降低成本')
  }

  if (tips.length === 0) {
    tips.push('当前配置较为合理，建议定期监控实际使用率进行优化')
  }

  return tips
})
</script>

<style scoped>
/* Add styles here */
</style>
