<!--
  CapacityPlanningDemo.vue
  容量规划计算器：帮助理解如何评估系统容量需求
-->
<template>
  <div class="capacity-demo">
    <div class="header">
      <div class="title">容量规划计算器 (Capacity Planning)</div>
      <div class="subtitle">估算系统需要多少台服务器才能满足需求</div>
    </div>

    <div class="calculator">
      <div class="input-section">
        <div class="section-title">📊 业务指标</div>
        <div class="input-grid">
          <div class="input-group">
            <label>日活用户 (DAU)</label>
            <input v-model.number="dau" type="number" min="1" step="1000" />
            <span class="unit">人</span>
          </div>

          <div class="input-group">
            <label>人均请求/天</label>
            <input v-model.number="requestsPerUser" type="number" min="1" />
            <span class="unit">次</span>
          </div>

          <div class="input-group">
            <label>高峰时段占比</label>
            <input v-model.number="peakRatio" type="number" min="1" max="100" />
            <span class="unit">%</span>
          </div>

          <div class="input-group">
            <label>单机 QPS 能力</label>
            <input v-model.number="serverQps" type="number" min="1" />
            <span class="unit">次/秒</span>
          </div>

          <div class="input-group">
            <label>冗余系数</label>
            <input
              v-model.number="redundancy"
              type="number"
              min="1"
              max="3"
              step="0.1"
            />
            <span class="unit">倍</span>
          </div>
        </div>

        <div class="tips">
          💡
          <span class="tip-text"
            >通常高峰期流量是平均流量的 2-3 倍，建议预留 50-100%
            冗余应对突发流量</span
          >
        </div>
      </div>

      <div class="output-section">
        <div class="section-title">📈 容量评估结果</div>

        <div class="result-card">
          <div class="result-label">日均总请求量</div>
          <div class="result-value">
            {{ totalRequests.toLocaleString() }} 次/天
          </div>
        </div>

        <div class="result-card highlight">
          <div class="result-label">高峰期 QPS (目标)</div>
          <div class="result-value">{{ targetQPS.toLocaleString() }} 次/秒</div>
        </div>

        <div class="result-card">
          <div class="result-label">理论所需服务器</div>
          <div class="result-value">{{ minServers }} 台</div>
        </div>

        <div class="result-card highlight">
          <div class="result-label">推荐配置 (含冗余)</div>
          <div class="result-value large">{{ recommendedServers }} 台</div>
        </div>

        <div class="cost-estimate">
          <div class="cost-title">💰 月成本估算 (云服务器)</div>
          <div class="cost-options">
            <div
              class="cost-option"
              v-for="option in costOptions"
              :key="option.name"
            >
              <div class="option-name">{{ option.name }}</div>
              <div class="option-price">
                ¥{{ option.price.toLocaleString() }}/月
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="planning-tips">
      <div class="tips-title">🎯 容量规划要点</div>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">1️⃣</div>
          <div class="tip-title">以峰值为核心</div>
          <div class="tip-desc">
            不能按平均流量规划，必须按高峰期流量（通常是平均的 2-3 倍）来准备
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">2️⃣</div>
          <div class="tip-title">预留冗余空间</div>
          <div class="tip-desc">
            至少预留 50% 冗余，用于应对突发流量、服务器故障、维护窗口
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">3️⃣</div>
          <div class="tip-title">定期压测验证</div>
          <div class="tip-desc">
            每季度进行压力测试，验证实际容量是否满足预估
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">4️⃣</div>
          <div class="tip-title">弹性扩缩容</div>
          <div class="tip-desc">
            结合云服务的自动扩缩容，在高峰期自动增加实例
          </div>
        </div>
      </div>
    </div>

    <div class="formula-section">
      <div class="formula-title">📐 计算公式</div>
      <div class="formula-list">
        <div class="formula-item">
          <span class="formula-label">日均请求量：</span>
          <span class="formula-math">DAU × 人均请求次数</span>
        </div>
        <div class="formula-item">
          <span class="formula-label">平均 QPS：</span>
          <span class="formula-math">日均请求量 ÷ 86400 秒</span>
        </div>
        <div class="formula-item">
          <span class="formula-label">高峰 QPS：</span>
          <span class="formula-math">平均 QPS × 高峰系数 (2-3 倍)</span>
        </div>
        <div class="formula-item">
          <span class="formula-label">所需服务器：</span>
          <span class="formula-math">高峰 QPS × 冗余系数 ÷ 单机 QPS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const dau = ref(100000)
const requestsPerUser = ref(50)
const peakRatio = ref(30)
const serverQps = ref(2000)
const redundancy = ref(1.5)

const totalRequests = computed(() => {
  return Math.round(dau.value * requestsPerUser.value)
})

const avgQPS = computed(() => {
  return Math.round(totalRequests.value / 86400)
})

const peakQPS = computed(() => {
  const avg = avgQPS.value
  const peak = avg * (1 + peakRatio.value / 100)
  return Math.round(peak)
})

const targetQPS = computed(() => {
  return peakQPS.value
})

const minServers = computed(() => {
  return Math.ceil(targetQPS.value / serverQps.value)
})

const recommendedServers = computed(() => {
  const min = minServers.value
  return Math.ceil(min * redundancy.value)
})

const costOptions = computed(() => {
  const servers = recommendedServers.value
  return [
    {
      name: '阿里云 (4核8G)',
      price: servers * 300
    },
    {
      name: '腾讯云 (4核8G)',
      price: servers * 280
    },
    {
      name: 'AWS (t3.xlarge)',
      price: servers * 500
    }
  ]
})
</script>

<style scoped>
.capacity-demo {
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

.calculator {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.input-section,
.output-section {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.input-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-group label {
  min-width: 120px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.input-group input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
}

.input-group .unit {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  min-width: 40px;
}

.tips {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  border-radius: 6px;
  font-size: 0.85rem;
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.tip-text {
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.result-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.result-card.highlight {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  border: 1px solid var(--vp-c-brand);
}

.result-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.result-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.result-value.large {
  font-size: 1.8rem;
  color: var(--vp-c-brand);
}

.cost-estimate {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.cost-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.cost-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cost-option {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
}

.option-name {
  color: var(--vp-c-text-1);
}

.option-price {
  font-weight: 700;
  color: var(--vp-c-brand);
}

.planning-tips {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.tips-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.tip-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.tip-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.tip-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.tip-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.formula-section {
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-brand);
}

.formula-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.formula-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.formula-item {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.formula-label {
  min-width: 120px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.formula-math {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

@media (max-width: 768px) {
  .calculator {
    grid-template-columns: 1fr;
  }

  .input-group {
    flex-wrap: wrap;
  }

  .input-group label {
    min-width: 100%;
    margin-bottom: 0.25rem;
  }

  .input-group input {
    min-width: 150px;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .formula-item {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
