<!--
  TrackingTypesDemo.vue
  埋点类型对比 - 展示前端、后端、全链路埋点的区别
-->
<template>
  <div class="tracking-types-demo">
    <div class="header">
      <div class="title">埋点类型对比</div>
      <div class="subtitle">三种埋点方式的优缺点与适用场景</div>
    </div>

    <div class="type-tabs">
      <button
        v-for="type in trackingTypes"
        :key="type.id"
        class="type-tab"
        :class="{ active: selectedType === type.id }"
        @click="selectType(type.id)"
      >
        {{ type.name }}
      </button>
    </div>

    <div class="type-content">
      <div class="type-info">
        <div class="type-header">
          <div class="type-icon">{{ currentType.icon }}</div>
          <div class="type-title">
            <div class="name">{{ currentType.name }}</div>
            <div class="subtitle">{{ currentType.subtitle }}</div>
          </div>
        </div>

        <div class="type-description">
          {{ currentType.description }}
        </div>

        <div class="characteristics">
          <div class="characteristics-title">主要特征</div>
          <div class="characteristics-list">
            <div
              v-for="(char, index) in currentType.characteristics"
              :key="index"
              class="characteristic-item"
            >
              <span class="check">✓</span>
              <span>{{ char }}</span>
            </div>
          </div>
        </div>

        <div class="use-cases">
          <div class="use-cases-title">典型场景</div>
          <div class="use-cases-list">
            <div
              v-for="(useCase, index) in currentType.useCases"
              :key="index"
              class="use-case-item"
            >
              <div class="use-case-icon">{{ useCase.icon }}</div>
              <div class="use-case-info">
                <div class="use-case-name">{{ useCase.name }}</div>
                <div class="use-case-desc">{{ useCase.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="type-architecture">
        <div class="architecture-title">架构示意</div>
        <div class="architecture-diagram">
          <div class="diagram-layer">
            <div class="layer-label">用户</div>
            <div class="layer-icon">👤</div>
          </div>
          <div class="diagram-arrow">↓</div>
          <div class="diagram-layer client">
            <div class="layer-label">客户端</div>
            <div class="layer-content">
              <div
                v-if="selectedType === 'frontend'"
                class="layer-box frontend"
              >
                <div>前端埋点 SDK</div>
                <div class="layer-detail">采集用户交互</div>
              </div>
              <div v-if="selectedType === 'backend'" class="layer-box backend">
                <div>业务代码</div>
                <div class="layer-detail">调用后端埋点</div>
              </div>
              <div v-if="selectedType === 'full'" class="layer-box full">
                <div>前端埋点 SDK</div>
                <div>后端埋点</div>
                <div class="layer-detail">全链路追踪</div>
              </div>
            </div>
          </div>
          <div class="diagram-arrow">↓</div>
          <div
            v-if="selectedType === 'backend' || selectedType === 'full'"
            class="diagram-layer server"
          >
            <div class="layer-label">服务端</div>
            <div class="layer-content">
              <div class="layer-box server">
                <div>埋点服务</div>
                <div class="layer-detail">处理埋点请求</div>
              </div>
            </div>
          </div>
          <div class="diagram-arrow">↓</div>
          <div class="diagram-layer data">
            <div class="layer-label">数据平台</div>
            <div class="layer-content">
              <div class="layer-box data">
                <div>数据仓库</div>
                <div class="layer-detail">存储与分析</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="comparison-title">详细对比</div>
      <table class="comparison">
        <thead>
          <tr>
            <th>对比维度</th>
            <th v-for="type in trackingTypes" :key="type.id">
              {{ type.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in comparisonData" :key="index">
            <td class="dimension">{{ row.dimension }}</td>
            <td
              v-for="type in trackingTypes"
              :key="type.id"
              class="value"
              :class="{ best: row.best === type.id }"
            >
              {{ row.values[type.id] }}
              <span v-if="row.best === type.id" class="best-badge">最优</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedType = ref('frontend')

const trackingTypes = [
  {
    id: 'frontend',
    name: '前端埋点',
    subtitle: 'Client-side Tracking',
    icon: '💻',
    description:
      '在 Web、App、小程序的前端代码中集成埋点 SDK，直接采集用户与界面的交互行为。数据实时性好，可采集设备信息，但可能被篡改。',
    characteristics: [
      '实时采集用户行为',
      '可获取设备信息、网络状态',
      '可视化数据收集',
      '离线缓存，联网补传',
      '支持 A/B 测试和热力图'
    ],
    useCases: [
      { icon: '📱', name: '页面浏览', desc: '记录用户访问了哪些页面' },
      { icon: '👆', name: '按钮点击', desc: '统计用户点击了哪些按钮' },
      { icon: '📝', name: '表单提交', desc: '追踪表单填写和提交' },
      { icon: '🎯', name: '转化漏斗', desc: '分析用户转化路径' }
    ]
  },
  {
    id: 'backend',
    name: '后端埋点',
    subtitle: 'Server-side Tracking',
    icon: '⚙️',
    description:
      '在服务器端业务逻辑中添加埋点代码，采集服务端事件。数据准确可靠，不可篡改，但无法获取客户端信息。',
    characteristics: [
      '数据准确，不可篡改',
      '采集业务核心事件',
      '不受客户端网络影响',
      '可采集服务端特有数据',
      '隐私合规性更好'
    ],
    useCases: [
      { icon: '💰', name: '支付成功', desc: '记录订单支付完成' },
      { icon: '📦', name: '订单创建', desc: '追踪订单生成' },
      { icon: '🔐', name: '用户注册', desc: '记录账号注册' },
      { icon: '📊', name: 'API 调用', desc: '统计接口调用次数' }
    ]
  },
  {
    id: 'full',
    name: '全链路埋点',
    subtitle: 'Full-funnel Tracking',
    icon: '🔗',
    description:
      '前端埋点 + 后端埋点组合，实现从用户行为到业务完成的端到端追踪。数据最完整，但实现成本最高。',
    characteristics: [
      '端到端完整追踪',
      '数据交叉验证',
      '前后端数据打通',
      '漏斗分析更准确',
      '异常定位更快速'
    ],
    useCases: [
      { icon: '🛒', name: '购物流程', desc: '从浏览到购买的完整链路' },
      { icon: '📈', name: '用户旅程', desc: '分析用户全生命周期行为' },
      { icon: '🔍', name: '问题排查', desc: '定位前后端异常' },
      { icon: '💎', name: '数据治理', desc: '提升数据质量和准确性' }
    ]
  }
]

const comparisonData = [
  {
    dimension: '数据准确性',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★★★',
      full: '★★★★★'
    },
    best: 'backend'
  },
  {
    dimension: '实时性',
    values: {
      frontend: '★★★★★',
      backend: '★★★★☆',
      full: '★★★★★'
    },
    best: 'frontend'
  },
  {
    dimension: '开发成本',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★☆☆',
      full: '★☆☆☆☆'
    },
    best: 'frontend'
  },
  {
    dimension: '维护成本',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★☆☆',
      full: '★★☆☆☆'
    },
    best: 'frontend'
  },
  {
    dimension: '数据完整性',
    values: {
      frontend: '★★★☆☆',
      backend: '★★★☆☆',
      full: '★★★★★'
    },
    best: 'full'
  },
  {
    dimension: '隐私合规',
    values: {
      frontend: '★★☆☆☆',
      backend: '★★★★★',
      full: '★★★★☆'
    },
    best: 'backend'
  }
]

const currentType = computed(() => {
  return trackingTypes.find((t) => t.id === selectedType.value)
})

const selectType = (typeId) => {
  selectedType.value = typeId
}
</script>

<style scoped>
.tracking-types-demo {
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

.type-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.type-tab {
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

.type-tab:hover {
  border-color: var(--vp-c-brand);
}

.type-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.type-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.type-info {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.type-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.type-icon {
  font-size: 3rem;
}

.type-title .name {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.type-title .subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.type-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.characteristics,
.use-cases {
  margin-bottom: 1.5rem;
}

.characteristics-title,
.use-cases-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.characteristics-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.characteristic-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.check {
  color: #22c55e;
  font-weight: 700;
}

.use-cases-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.use-case-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.use-case-icon {
  font-size: 1.5rem;
}

.use-case-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.type-architecture {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.architecture-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.diagram-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
  min-width: 200px;
}

.diagram-layer.client,
.diagram-layer.server,
.diagram-layer.data {
  width: 100%;
}

.layer-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.layer-icon {
  font-size: 2rem;
}

.layer-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-box {
  background: white;
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.layer-box.frontend {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-color: #3b82f6;
}

.layer-box.backend {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-color: #f59e0b;
}

.layer-box.full {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-color: #22c55e;
}

.layer-box.server {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  border-color: #ec4899;
}

.layer-box.data {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  border-color: #6366f1;
}

.layer-detail {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.diagram-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.comparison-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
}

.comparison {
  width: 100%;
  border-collapse: collapse;
}

.comparison th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.comparison .dimension {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.comparison .value {
  position: relative;
}

.comparison .value.best {
  background: #dcfce7;
  font-weight: 600;
}

.best-badge {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.15rem 0.5rem;
  background: #22c55e;
  color: white;
  font-size: 0.7rem;
  border-radius: 4px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .type-content {
    grid-template-columns: 1fr;
  }

  .type-tabs {
    flex-direction: column;
  }
}
</style>
