<!--
  AvailabilityCalculatorDemo.vue
  可用性计算器：展示不同 SLA 级别对应的停机时间
-->
<template>
  <div class="availability-demo">
    <div class="header">
      <div class="title">可用性等级计算器</div>
      <div class="subtitle">点击查看不同"几个 9"对应的停机时间</div>
    </div>

    <div class="sla-cards">
      <div
        v-for="sla in slaLevels"
        :key="sla.nines"
        :class="['sla-card', { active: activeSla === sla.nines }]"
        @click="activeSla = sla.nines"
      >
        <div class="sla-nines">{{ sla.label }}</div>
        <div class="sla-percent">{{ sla.percent }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.label }}（{{ current.percent }}）</div>
      <div class="downtime-grid">
        <div class="downtime-item">
          <div class="dt-label">每年停机</div>
          <div class="dt-value">{{ current.yearly }}</div>
        </div>
        <div class="downtime-item">
          <div class="dt-label">每月停机</div>
          <div class="dt-value">{{ current.monthly }}</div>
        </div>
        <div class="downtime-item">
          <div class="dt-label">每周停机</div>
          <div class="dt-value">{{ current.weekly }}</div>
        </div>
      </div>
      <div class="detail-examples">
        <span class="label">典型场景：</span>{{ current.examples }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeSla = ref('3')

const slaLevels = [
  { nines: '2', label: '2 个 9', percent: '99%', yearly: '3.65 天', monthly: '7.3 小时', weekly: '1.68 小时', examples: '内部工具、非关键系统' },
  { nines: '3', label: '3 个 9', percent: '99.9%', yearly: '8.76 小时', monthly: '43.8 分钟', weekly: '10.1 分钟', examples: '普通 Web 应用、企业系统' },
  { nines: '4', label: '4 个 9', percent: '99.99%', yearly: '52.6 分钟', monthly: '4.38 分钟', weekly: '1.01 分钟', examples: '电商平台、SaaS 服务' },
  { nines: '5', label: '5 个 9', percent: '99.999%', yearly: '5.26 分钟', monthly: '26.3 秒', weekly: '6.05 秒', examples: '金融交易、电信核心网' }
]

const current = computed(() => slaLevels.find(s => s.nines === activeSla.value))
</script>

<style scoped>
.availability-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.sla-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.sla-card {
  padding: 0.6rem; border-radius: 8px; cursor: pointer; text-align: center;
  background: var(--vp-c-bg); border: 2px solid var(--vp-c-divider); transition: all 0.2s;
}
.sla-card:hover { border-color: var(--vp-c-brand); }
.sla-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.08); }
.sla-nines { font-weight: 800; font-size: 1.1rem; color: var(--vp-c-brand); }
.sla-percent { font-size: 0.8rem; color: var(--vp-c-text-2); }
.detail-panel { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.downtime-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.75rem; }
.downtime-item { text-align: center; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.dt-label { font-size: 0.75rem; color: var(--vp-c-text-3); }
.dt-value { font-weight: 700; font-size: 0.9rem; color: var(--vp-c-brand); }
.detail-examples { font-size: 0.82rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
