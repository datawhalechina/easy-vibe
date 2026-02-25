<!--
  DashboardLayoutDemo.vue
  仪表盘布局演示：展示仪表盘的常见布局模式
-->
<template>
  <div class="dashboard-demo">
    <div class="header">
      <div class="title">仪表盘布局模式</div>
      <div class="subtitle">点击查看不同类型的仪表盘布局</div>
    </div>

    <div class="layout-tabs">
      <div
        v-for="layout in layouts"
        :key="layout.key"
        :class="['tab', { active: activeLayout === layout.key }]"
        @click="activeLayout = layout.key"
      >
        {{ layout.name }}
      </div>
    </div>

    <div v-if="current" class="layout-preview">
      <div class="preview-title">{{ current.name }}</div>
      <div class="preview-desc">{{ current.desc }}</div>
      <div :class="['mock-dashboard', current.key]">
        <div
          v-for="(widget, i) in current.widgets"
          :key="i"
          :class="['widget', widget.type]"
        >
          <div class="widget-label">{{ widget.label }}</div>
        </div>
      </div>
      <div class="use-case">适用场景：{{ current.useCase }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLayout = ref('overview')

const layouts = [
  {
    key: 'overview',
    name: '全局概览型',
    desc: '顶部核心指标卡片 + 中间趋势图 + 底部明细表',
    useCase: '管理层日报、运营大盘',
    widgets: [
      { type: 'kpi', label: 'DAU 12.5万' },
      { type: 'kpi', label: '收入 ¥85万' },
      { type: 'kpi', label: '转化率 3.2%' },
      { type: 'kpi', label: '客单价 ¥268' },
      { type: 'chart-wide', label: '趋势折线图' },
      { type: 'table', label: '明细数据表' }
    ]
  },
  {
    key: 'comparison',
    name: '对比分析型',
    desc: '左右对比布局，适合 A/B 测试或同环比分析',
    useCase: 'A/B 测试报告、竞品分析',
    widgets: [
      { type: 'half', label: '实验组指标' },
      { type: 'half', label: '对照组指标' },
      { type: 'chart-wide', label: '差异对比图' },
      { type: 'table', label: '统计显著性检验' }
    ]
  },
  {
    key: 'drill',
    name: '下钻分析型',
    desc: '从汇总到明细逐层下钻，支持交互式探索',
    useCase: '销售分析、用户行为分析',
    widgets: [
      { type: 'chart-wide', label: '全国销售地图（点击省份下钻）' },
      { type: 'half', label: '省份排名柱状图' },
      { type: 'half', label: '城市明细饼图' },
      { type: 'table', label: '门店级明细表' }
    ]
  },
  {
    key: 'realtime',
    name: '实时监控型',
    desc: '大屏展示，数据自动刷新，适合投屏',
    useCase: '双十一大屏、服务器监控',
    widgets: [
      { type: 'big-number', label: '实时 GMV ¥1.2亿' },
      { type: 'half', label: '订单量实时曲线' },
      { type: 'half', label: '地域热力图' },
      { type: 'kpi', label: '支付成功率' },
      { type: 'kpi', label: '平均响应时间' },
      { type: 'kpi', label: '在线用户数' }
    ]
  }
]

const current = computed(() => layouts.find(l => l.key === activeLayout.value))
</script>

<style scoped>
.dashboard-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.layout-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.layout-preview { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.preview-title { font-weight: 700; font-size: 0.95rem; }
.preview-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.mock-dashboard { display: grid; gap: 0.4rem; margin-bottom: 0.75rem; grid-template-columns: repeat(4, 1fr); }
.widget {
  padding: 0.5rem; border-radius: 6px; text-align: center;
  font-size: 0.75rem; font-weight: 600; border: 1px dashed var(--vp-c-divider);
}
.widget.kpi { background: rgba(var(--vp-c-brand-rgb), 0.06); grid-column: span 1; }
.widget.chart-wide { background: rgba(34,197,94,0.06); grid-column: span 4; min-height: 50px; }
.widget.table { background: rgba(245,158,11,0.06); grid-column: span 4; }
.widget.half { background: rgba(99,102,241,0.06); grid-column: span 2; min-height: 40px; }
.widget.big-number { background: rgba(239,68,68,0.06); grid-column: span 4; min-height: 40px; font-size: 0.9rem; }
.widget-label { color: var(--vp-c-text-2); }
.use-case { font-size: 0.82rem; color: var(--vp-c-text-3); }
</style>
