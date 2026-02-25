<!--
  ChartTypeSelectorDemo.vue
  图表类型选择器：根据数据特征推荐合适的图表类型
-->
<template>
  <div class="chart-selector-demo">
    <div class="header">
      <div class="title">图表类型选择器</div>
      <div class="subtitle">选择你的数据目的，查看推荐的图表类型</div>
    </div>

    <div class="purposes">
      <div
        v-for="p in purposes"
        :key="p.key"
        :class="['purpose-card', { active: activePurpose === p.key }]"
        @click="activePurpose = p.key"
      >
        <div class="purpose-icon">{{ p.icon }}</div>
        <div class="purpose-name">{{ p.name }}</div>
      </div>
    </div>

    <div v-if="currentPurpose" class="charts-panel">
      <div class="panel-title">{{ currentPurpose.name }}：推荐图表</div>
      <div class="chart-list">
        <div
          v-for="chart in currentPurpose.charts"
          :key="chart.name"
          class="chart-item"
        >
          <div class="chart-visual">{{ chart.visual }}</div>
          <div class="chart-info">
            <div class="chart-name">{{ chart.name }}</div>
            <div class="chart-desc">{{ chart.desc }}</div>
            <div class="chart-example">示例：{{ chart.example }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activePurpose = ref('comparison')

const purposes = [
  {
    key: 'comparison',
    name: '比较',
    icon: '📊',
    charts: [
      { name: '柱状图', visual: '▐▐▐', desc: '比较不同类别的数值大小', example: '各部门销售额对比' },
      { name: '分组柱状图', visual: '▐▐ ▐▐', desc: '多维度分组比较', example: '各季度各产品线收入' },
      { name: '雷达图', visual: '◇', desc: '多维度综合对比', example: '候选人能力评估' }
    ]
  },
  {
    key: 'trend',
    name: '趋势',
    icon: '📈',
    charts: [
      { name: '折线图', visual: '╱╲╱', desc: '展示数据随时间的变化趋势', example: '月度用户增长曲线' },
      { name: '面积图', visual: '▓▓▓', desc: '强调趋势下的累积量', example: '各渠道流量占比变化' },
      { name: '阶梯图', visual: '┐└┐', desc: '展示离散时间点的变化', example: '价格调整历史' }
    ]
  },
  {
    key: 'proportion',
    name: '占比',
    icon: '🍩',
    charts: [
      { name: '饼图', visual: '◔', desc: '展示各部分占整体的比例', example: '市场份额分布' },
      { name: '环形图', visual: '◎', desc: '饼图的变体，中间可放数字', example: '预算使用率' },
      { name: '堆叠柱状图', visual: '▐▐▐', desc: '展示各部分的组成和总量', example: '各地区各品类销售构成' }
    ]
  },
  {
    key: 'distribution',
    name: '分布',
    icon: '🔔',
    charts: [
      { name: '直方图', visual: '▁▃▇▃▁', desc: '展示数据的频率分布', example: '用户年龄分布' },
      { name: '散点图', visual: '· ·· ·', desc: '展示两个变量的关系', example: '广告投入 vs 销售额' },
      { name: '箱线图', visual: '├─┤', desc: '展示数据的中位数、四分位数和异常值', example: '各城市房价分布' }
    ]
  },
  {
    key: 'relation',
    name: '关系',
    icon: '🕸️',
    charts: [
      { name: '桑基图', visual: '≋≋≋', desc: '展示流量或能量的流向', example: '用户转化漏斗' },
      { name: '网络图', visual: '⊙─⊙', desc: '展示节点之间的关联关系', example: '社交关系网络' },
      { name: '热力图', visual: '▓▒░', desc: '用颜色深浅表示数值大小', example: '各时段各页面访问量' }
    ]
  }
]

const currentPurpose = computed(() => purposes.find(p => p.key === activePurpose.value))
</script>

<style scoped>
.chart-selector-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.purposes { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.purpose-card {
  display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
  padding: 0.6rem; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.2s;
}
.purpose-card:hover { border-color: var(--vp-c-brand); }
.purpose-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.purpose-icon { font-size: 1.3rem; }
.purpose-name { font-size: 0.8rem; font-weight: 600; }
.panel-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.charts-panel { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.chart-list { display: flex; flex-direction: column; gap: 0.5rem; }
.chart-item { display: flex; gap: 0.75rem; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.chart-visual { font-size: 1.2rem; min-width: 50px; display: flex; align-items: center; justify-content: center; font-family: var(--vp-font-family-mono); color: var(--vp-c-brand); }
.chart-name { font-weight: 600; font-size: 0.85rem; }
.chart-desc { font-size: 0.78rem; color: var(--vp-c-text-2); }
.chart-example { font-size: 0.75rem; color: var(--vp-c-text-3); font-style: italic; }
</style>
