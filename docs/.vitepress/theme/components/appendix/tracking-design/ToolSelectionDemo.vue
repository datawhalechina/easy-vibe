<!--
  ToolSelectionDemo.vue
  工具选型建议 - 帮助选择合适的埋点工具
-->
<template>
  <div class="tool-selection-demo">
    <div class="header">
      <div class="title">埋点工具选型</div>
      <div class="subtitle">根据团队规模和需求选择合适的方案</div>
    </div>

    <div class="selection-criteria">
      <div class="criteria-title">请选择您的场景</div>
      <div class="criteria-options">
        <div
          v-for="(option, key) in criteria"
          :key="key"
          class="criteria-option"
        >
          <div class="option-label">{{ option.label }}</div>
          <div class="option-buttons">
            <button
              v-for="(value, index) in option.values"
              :key="index"
              class="value-btn"
              :class="{ active: selectedCriteria[key] === value }"
              @click="selectedCriteria[key] = value"
            >
              {{ value }}
            </button>
          </div>
        </div>
      </div>

      <button class="recommend-btn" @click="getRecommendation">
        获取推荐方案
      </button>
    </div>

    <div v-if="recommendation" class="recommendation-result">
      <div class="result-header">
        <div class="result-icon">🎯</div>
        <div class="result-title">推荐方案</div>
      </div>

      <div class="result-card">
        <div class="result-name">{{ recommendation.name }}</div>
        <div class="result-desc">{{ recommendation.desc }}</div>

        <div class="result-details">
          <div class="detail-item">
            <span class="detail-label">适用阶段：</span>
            <span class="detail-value">{{ recommendation.stage }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">预估成本：</span>
            <span class="detail-value">{{ recommendation.cost }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">实施难度：</span>
            <span class="detail-value">{{ recommendation.difficulty }}</span>
          </div>
        </div>

        <div class="result-pros">
          <div class="pros-title">✅ 优势</div>
          <ul class="pros-list">
            <li v-for="(pro, i) in recommendation.pros" :key="i">{{ pro }}</li>
          </ul>
        </div>

        <div class="result-cons">
          <div class="cons-title">⚠️ 注意事项</div>
          <ul class="cons-list">
            <li v-for="(con, i) in recommendation.cons" :key="i">{{ con }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="tools-comparison">
      <div class="comparison-title">工具对比表</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>工具</th>
            <th>类型</th>
            <th>价格</th>
            <th>适用场景</th>
            <th>推荐指数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tool, index) in tools" :key="index">
            <td class="tool-name">{{ tool.name }}</td>
            <td>{{ tool.type }}</td>
            <td>{{ tool.price }}</td>
            <td>{{ tool.scenario }}</td>
            <td>
              <span class="rating">
                {{ '⭐'.repeat(tool.rating) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCriteria = ref({
  teamSize: '',
  budget: '',
  technical: '',
  dataSecurity: ''
})

const criteria = {
  teamSize: {
    label: '团队规模',
    values: ['1-5人', '5-20人', '20-100人', '100+人']
  },
  budget: {
    label: '预算',
    values: ['免费优先', '低预算', '中等预算', '预算充足']
  },
  technical: {
    label: '技术能力',
    values: ['无技术团队', '有开发人员', '技术团队完善']
  },
  dataSecurity: {
    label: '数据安全要求',
    values: ['一般', '较高', '极高（需私有化）']
  }
}

const recommendation = ref(null)

const recommendations = {
  small: {
    name: 'Google Analytics',
    desc: '全球最流行的免费网站分析工具，功能强大，易于上手',
    stage: '0-1 阶段（初创期）',
    cost: '免费',
    difficulty: '低',
    pros: ['完全免费', '功能全面', '社区资源丰富', '上手简单'],
    cons: ['数据在海外服务器', '国内访问可能不稳定', '高级功能需要翻墙']
  },
  medium: {
    name: '神策数据 / GrowingIO',
    desc: '国内领先的用户行为分析平台，支持私有化部署',
    stage: '1-10 阶段（成长期）',
    cost: '$5,000 - $20,000 /年',
    difficulty: '中',
    pros: ['专业的事件分析', '支持私有化部署', '国内技术支持', '符合国内法规'],
    cons: ['价格较高', '需要技术团队维护', '定制化需求成本高']
  },
  large: {
    name: '自建埋点系统',
    desc: '基于开源技术栈（Kafka + ClickHouse）搭建私有化埋点平台',
    stage: '10-100 阶段（成熟期）',
    cost: '$50,000+ /年（人力+服务器）',
    difficulty: '高',
    pros: ['数据完全自主可控', '灵活定制化', '长期成本更低', '数据安全性最高'],
    cons: ['初期投入大', '需要专业团队', '维护成本高', '实施周期长']
  }
}

const tools = [
  {
    name: 'Google Analytics',
    type: 'SaaS',
    price: '免费',
    scenario: '小型项目、个人网站',
    rating: 5
  },
  {
    name: 'Umami',
    type: '开源',
    price: '服务器成本',
    scenario: '注重隐私、需要私有化',
    rating: 4
  },
  {
    name: '神策数据',
    type: '商业+私有化',
    price: '$10,000+/年',
    scenario: '中大型企业',
    rating: 5
  },
  {
    name: 'GrowingIO',
    type: '商业+SaaS',
    price: '$5,000+/年',
    scenario: '增长团队、产品优化',
    rating: 4
  },
  {
    name: 'Mixpanel',
    type: 'SaaS',
    price: '$25,000+/年',
    scenario: '产品数据分析',
    rating: 4
  }
]

const getRecommendation = () => {
  const { teamSize, budget, technical, dataSecurity } = selectedCriteria.value

  if (dataSecurity === '极高（需私有化）') {
    recommendation.value = recommendations.large
  } else if (teamSize === '1-5人' || budget === '免费优先') {
    recommendation.value = recommendations.small
  } else if (teamSize === '5-20人' || teamSize === '20-100人') {
    recommendation.value = recommendations.medium
  } else {
    recommendation.value = recommendations.large
  }
}
</script>

<style scoped>
.tool-selection-demo {
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

.selection-criteria {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.criteria-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.criteria-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.criteria-option {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.option-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.value-btn {
  padding: 0.5rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.value-btn:hover {
  border-color: var(--vp-c-brand);
}

.value-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.recommend-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.recommend-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(60, 130, 246, 0.3);
}

.recommendation-result {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.result-icon {
  font-size: 2.5rem;
}

.result-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.result-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
}

.result-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.result-desc {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.result-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.detail-item {
  text-align: center;
}

.detail-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: block;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
}

.result-pros,
.result-cons {
  margin-top: 1rem;
}

.pros-title,
.cons-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.pros-list,
.cons-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros-list li,
.cons-list li {
  padding: 0.25rem 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: 0.85rem;
}

.pros-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #22c55e;
  font-weight: 700;
}

.cons-list li::before {
  content: '⚠️';
  position: absolute;
  left: 0;
}

.tools-comparison {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.comparison-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.tool-name {
  font-weight: 600;
}

.rating {
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .result-details {
    grid-template-columns: 1fr;
  }

  .option-buttons {
    flex-direction: column;
  }

  .value-btn {
    width: 100%;
  }
}
</style>
