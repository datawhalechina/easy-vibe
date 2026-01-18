<!--
  TrackingMethodsComparisonDemo.vue
  埋点方法对比 - 代码埋点、可视化埋点、全埋点
-->
<template>
  <div class="tracking-methods-comparison-demo">
    <div class="header">
      <div class="title">埋点方法对比</div>
      <div class="subtitle">三种主流埋点实现方式的深度对比</div>
    </div>

    <div class="methods-grid">
      <div
        v-for="method in methods"
        :key="method.id"
        class="method-card"
        :class="{ selected: selectedMethod === method.id }"
        @click="selectMethod(method.id)"
      >
        <div class="method-header">
          <div class="method-icon">{{ method.icon }}</div>
          <div class="method-info">
            <div class="method-name">{{ method.name }}</div>
            <div class="method-english">{{ method.english }}</div>
          </div>
          <div v-if="selectedMethod === method.id" class="selected-badge">
            已选择
          </div>
        </div>

        <div class="method-body">
          <div class="method-description">{{ method.description }}</div>

          <div class="method-features">
            <div class="feature-category">
              <div class="category-title">✅ 优点</div>
              <ul class="feature-list pros">
                <li v-for="(pro, index) in method.pros" :key="index">
                  {{ pro }}
                </li>
              </ul>
            </div>

            <div class="feature-category">
              <div class="category-title">❌ 缺点</div>
              <ul class="feature-list cons">
                <li v-for="(con, index) in method.cons" :key="index">
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>

          <div class="method-code">
            <div class="code-title">代码示例</div>
            <pre class="code-block"><code>{{ method.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-matrix">
      <div class="matrix-title">综合对比矩阵</div>
      <table class="matrix">
        <thead>
          <tr>
            <th>评估维度</th>
            <th v-for="method in methods" :key="method.id">
              {{ method.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in matrixData" :key="index">
            <td class="dimension">{{ row.dimension }}</td>
            <td
              v-for="method in methods"
              :key="method.id"
              class="score"
              :class="{ best: row.best === method.id }"
            >
              <div class="score-bar">
                <div
                  class="score-fill"
                  :style="{ width: row.scores[method.id] + '%' }"
                ></div>
              </div>
              <div class="score-value">{{ row.scores[method.id] }}%</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="recommendation">
      <div class="recommendation-title">💡 选型建议</div>
      <div class="recommendation-content">
        <div class="recommendation-item">
          <div class="rec-scenario">核心业务指标</div>
          <div class="rec-method">推荐：代码埋点</div>
          <div class="rec-reason">
            原因：数据准确性最高，可自定义属性，适合支付、注册等关键业务
          </div>
        </div>

        <div class="recommendation-item">
          <div class="rec-scenario">运营活动埋点</div>
          <div class="rec-method">推荐：可视化埋点</div>
          <div class="rec-reason">
            原因：快速部署，产品经理可操作，适合快速验证活动效果
          </div>
        </div>

        <div class="recommendation-item">
          <div class="rec-scenario">页面浏览数据</div>
          <div class="rec-method">推荐：全埋点</div>
          <div class="rec-reason">
            原因：零开发成本，一次性采集，适合 PV/UV 等基础指标
          </div>
        </div>

        <div class="recommendation-item">
          <div class="rec-scenario">大型企业级应用</div>
          <div class="rec-method">推荐：混合方案</div>
          <div class="rec-reason">
            原因：核心业务用代码埋点，运营活动用可视化埋点，基础数据用全埋点
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMethod = ref('code')

const methods = [
  {
    id: 'code',
    name: '代码埋点',
    english: 'Code-based Tracking',
    icon: '💻',
    description: '在代码中显式调用埋点 SDK，由开发人员手动添加采集代码',
    pros: [
      '数据准确，时机可控',
      '灵活度高，可自定义属性',
      '可采集复杂业务逻辑',
      '适用于各种场景'
    ],
    cons: ['需要开发资源', '新增埋点需要发版', '维护成本较高', '依赖开发团队'],
    code: `// 点击"购买"按钮埋点
function onBuyButtonClick() {
  // 业务逻辑
  addToCart(product)

  // 埋点
  track('click_buy_button', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    page: 'product_detail'
  })
}`
  },
  {
    id: 'visual',
    name: '可视化埋点',
    english: 'Visual Tracking',
    icon: '🎨',
    description: '通过可视化工具圈选页面元素，自动生成埋点代码',
    pros: ['无需编码', '产品经理可操作', '快速部署', '所见即所得'],
    cons: [
      '只能采集标准事件',
      '自定义属性能力弱',
      '页面改版后易失效',
      '功能相对单一'
    ],
    code: `// 可视化埋点管理后台
// 1. 打开可视化埋点工具
// 2. 在页面上圈选"立即购买"按钮
// 3. 配置事件名称：click_buy_button
// 4. 配置属性：product_id, price
// 5. 一键发布

// SDK 自动生成埋点代码
// 无需手动编写代码`
  },
  {
    id: 'auto',
    name: '全埋点',
    english: 'Auto Tracking',
    icon: '🤖',
    description: 'SDK 自动采集所有用户行为，无需手动添加代码',
    pros: ['零开发成本', '一次性采集所有数据', '支持回溯分析', '部署简单'],
    cons: [
      '数据量大，噪声多',
      '无法自定义属性',
      '隐私合规风险',
      '数据质量相对较低'
    ],
    code: `// SDK 初始化（只需一行代码）
const tracker = new AutoTracker({
  serverUrl: 'https://analytics.example.com',
  autoTrack: true  // 开启全埋点
})

// SDK 自动采集：
// - 所有页面浏览
// - 所有元素点击
// - 所有表单提交
// - 所有页面滚动`
  }
]

const matrixData = [
  {
    dimension: '灵活性',
    scores: { code: 95, visual: 70, auto: 30 },
    best: 'code'
  },
  {
    dimension: '开发成本',
    scores: { code: 30, visual: 80, auto: 100 },
    best: 'auto'
  },
  {
    dimension: '维护成本',
    scores: { code: 40, visual: 60, auto: 90 },
    best: 'auto'
  },
  {
    dimension: '数据质量',
    scores: { code: 100, visual: 75, auto: 60 },
    best: 'code'
  },
  {
    dimension: '部署速度',
    scores: { code: 40, visual: 85, auto: 100 },
    best: 'auto'
  },
  {
    dimension: '自定义能力',
    scores: { code: 100, visual: 50, auto: 20 },
    best: 'code'
  }
]

const selectMethod = (methodId) => {
  selectedMethod.value = methodId
}
</script>

<style scoped>
.tracking-methods-comparison-demo {
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

.methods-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.method-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.method-card.selected {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(60, 130, 246, 0.1);
}

.method-header {
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.method-icon {
  font-size: 2.5rem;
}

.method-info {
  flex: 1;
}

.method-name {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.method-english {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.selected-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.method-body {
  padding: 1.25rem;
}

.method-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.method-features {
  margin-bottom: 1rem;
}

.feature-category {
  margin-bottom: 1rem;
}

.category-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  font-size: 0.85rem;
  padding: 0.25rem 0;
  padding-left: 1.25rem;
  position: relative;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.feature-list.pros li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #22c55e;
  font-weight: 700;
}

.feature-list.cons li::before {
  content: '✗';
  position: absolute;
  left: 0;
  color: #ef4444;
  font-weight: 700;
}

.method-code {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.code-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 0.75rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
}

.comparison-matrix {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.matrix-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
}

.matrix {
  width: 100%;
  border-collapse: collapse;
}

.matrix th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.matrix td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.matrix .dimension {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.score {
  position: relative;
}

.score.best {
  background: #dcfce7;
}

.score-bar {
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #3b82f6);
  border-radius: 4px;
  transition: width 0.5s;
}

.score-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.recommendation {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
}

.recommendation-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.recommendation-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.recommendation-item {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #f59e0b;
}

.rec-scenario {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.rec-method {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.rec-reason {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .methods-grid {
    grid-template-columns: 1fr;
  }

  .recommendation-content {
    grid-template-columns: 1fr;
  }
}
</style>
