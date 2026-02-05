<template>
  <div class="compute-services-demo">
    <div class="demo-header">
      <h4>计算服务选型指南</h4>
      <p class="demo-desc">拖动滑块调整场景参数，获取最佳计算方案</p>
    </div>

    <div class="scenario-sliders">
      <div class="slider-group">
        <label>负载稳定性</label>
        <input
          v-model.number="scenario.stability"
          type="range"
          min="0"
          max="100"
        />
        <div class="slider-labels">
          <span>波动大</span>
          <span>非常稳定</span>
        </div>
      </div>

      <div class="slider-group">
        <label>平均负载率</label>
        <input
          v-model.number="scenario.utilization"
          type="range"
          min="0"
          max="100"
        />
        <div class="slider-labels">
          <span>很低</span>
          <span>接近100%</span>
        </div>
      </div>

      <div class="slider-group">
        <label>任务持续时间</label>
        <input
          v-model.number="scenario.duration"
          type="range"
          min="0"
          max="100"
        />
        <div class="slider-labels">
          <span>几分钟</span>
          <span>持续运行</span>
        </div>
      </div>

      <div class="slider-group">
        <label>流量突发程度</label>
        <input
          v-model.number="scenario.burstiness"
          type="range"
          min="0"
          max="100"
        />
        <div class="slider-labels">
          <span>平稳</span>
          <span>大起大落</span>
        </div>
      </div>
    </div>

    <div class="recommendation-panel">
      <div class="recommendation-title">
        <span class="icon">🎯</span>
        推荐方案
      </div>

      <div class="solution-cards">
        <div
          v-for="(solution, index) in recommendations"
          :key="index"
          class="solution-card"
          :class="{ 'top-pick': index === 0 }"
        >
          <div class="solution-rank" :class="{ 'rank-1': index === 0 }">
            {{ index === 0 ? '👑' : index + 1 }}
          </div>
          <div class="solution-content">
            <div class="solution-name">{{ solution.name }}</div>
            <div class="solution-services">
              <span class="service-tag aws">{{ solution.aws }}</span>
              <span class="vs-mini">vs</span>
              <span class="service-tag aliyun">{{ solution.aliyun }}</span>
            </div>
            <div class="solution-reason">{{ solution.reason }}</div>
            <div class="solution-savings" v-if="solution.savings">
              💰 预计节省: {{ solution.savings }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-presets">
      <span class="preset-label">快速场景:</span>
      <button
        v-for="preset in presets"
        :key="preset.name"
        class="preset-btn"
        @click="applyPreset(preset)"
      >
        {{ preset.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scenario = ref({
  stability: 50,
  utilization: 60,
  duration: 70,
  burstiness: 30
})

const presets = [
  {
    name: '电商大促',
    values: { stability: 20, utilization: 40, duration: 90, burstiness: 90 }
  },
  {
    name: '企业内部系统',
    values: { stability: 90, utilization: 70, duration: 95, burstiness: 10 }
  },
  {
    name: '初创公司官网',
    values: { stability: 40, utilization: 20, duration: 80, burstiness: 30 }
  },
  {
    name: '数据处理任务',
    values: { stability: 30, utilization: 95, duration: 10, burstiness: 80 }
  },
  {
    name: 'SaaS 平台',
    values: { stability: 60, utilization: 50, duration: 95, burstiness: 60 }
  }
]

const applyPreset = (preset) => {
  scenario.value = { ...preset.values }
}

const recommendations = computed(() => {
  const s = scenario.value
  const solutions = []

  // 计算各方案得分
  let serverlessScore = 0
  let ec2Score = 0
  let spotScore = 0
  let reservedScore = 0

  // Serverless (Lambda/FC)
  if (s.duration < 30) serverlessScore += 30
  if (s.burstiness > 70) serverlessScore += 25
  if (s.utilization < 30) serverlessScore += 20
  if (s.stability < 30) serverlessScore += 15

  // Spot 实例
  if (s.burstiness > 60) spotScore += 25
  if (s.stability < 40) spotScore += 30
  if (s.duration < 40) spotScore += 20
  if (s.utilization < 50) spotScore += 15

  // 预留实例
  if (s.stability > 70) reservedScore += 35
  if (s.duration > 80) reservedScore += 25
  if (s.utilization > 60) reservedScore += 20
  if (s.burstiness < 30) reservedScore += 10

  // 按需实例 (兜底)
  ec2Score = 40

  // 排序并生成推荐
  const scores = [
    { type: 'serverless', score: serverlessScore, savings: '40-70%' },
    { type: 'spot', score: spotScore, savings: '60-90%' },
    { type: 'reserved', score: reservedScore, savings: '30-60%' },
    { type: 'ondemand', score: ec2Score, savings: null }
  ].sort((a, b) => b.score - a.score)

  const solutionMap = {
    serverless: {
      name: '无服务器架构',
      aws: 'AWS Lambda',
      aliyun: '函数计算 FC',
      reason: '流量波动大、任务短时，按调用计费最划算，自动扩缩容免运维'
    },
    spot: {
      name: '竞价实例',
      aws: 'EC2 Spot',
      aliyun: '抢占式实例',
      reason: '可容忍中断的计算任务，价格极低，适合批处理、渲染等场景'
    },
    reserved: {
      name: '预留实例',
      aws: 'Reserved Instances',
      aliyun: '包年包月',
      reason: '长期稳定负载，提前承诺使用时长换取大幅折扣，成本最优'
    },
    ondemand: {
      name: '按需实例',
      aws: 'EC2 On-Demand',
      aliyun: '按量付费 ECS',
      reason: '灵活性最高，按小时计费，适合测试环境或 unpredictable 负载'
    }
  }

  return scores.slice(0, 3).map((s, idx) => ({
    ...solutionMap[s.type],
    savings: s.savings
  }))
})
</script>

<style scoped>
.compute-services-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #7b2cbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.scenario-sliders {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.slider-group {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 12px;
}

.slider-group label {
  display: block;
  font-size: 0.875rem;
  color: #e6f1ff;
  margin-bottom: 8px;
  font-weight: 500;
}

.slider-group input[type='range'] {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  margin-bottom: 8px;
}

.slider-group input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #8892b0;
}

.recommendation-panel {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.recommendation-title {
  font-size: 1rem;
  font-weight: 600;
  color: #e6f1ff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 1.25rem;
}

.solution-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.solution-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  gap: 12px;
  transition: all 0.3s ease;
}

.solution-card:hover {
  background: rgba(255, 255, 255, 0.08);
}

.solution-card.top-pick {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 44, 191, 0.15));
  border-color: rgba(0, 212, 255, 0.3);
}

.solution-rank {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: #8892b0;
  flex-shrink: 0;
}

.solution-rank.rank-1 {
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #1a1a2e;
  font-size: 1.25rem;
}

.solution-content {
  flex: 1;
}

.solution-name {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
  margin-bottom: 6px;
}

.solution-services {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.service-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.service-tag.aws {
  background: rgba(255, 153, 0, 0.2);
  color: #ff9900;
}

.service-tag.aliyun {
  background: rgba(255, 106, 0, 0.2);
  color: #ff6a00;
}

.vs-mini {
  color: #8892b0;
  font-size: 0.75rem;
}

.solution-reason {
  font-size: 0.875rem;
  color: #8892b0;
  line-height: 1.5;
}

.solution-savings {
  margin-top: 8px;
  font-size: 0.8125rem;
  color: #00d4ff;
  font-weight: 500;
}

.scenario-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.preset-label {
  font-size: 0.875rem;
  color: #8892b0;
  margin-right: 8px;
}

.preset-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e6f1ff;
  padding: 6px 14px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
}

.preset-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .scenario-sliders {
    grid-template-columns: 1fr;
  }

  .solution-card {
    flex-direction: column;
  }

  .scenario-presets {
    justify-content: flex-start;
  }
}
</style>
