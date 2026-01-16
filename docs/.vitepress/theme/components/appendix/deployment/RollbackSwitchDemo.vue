<!--
  RollbackSwitchDemo.vue
  发布策略：如何不关门装修
-->
<template>
  <div class="roll">
    <div class="header">
      <div class="title">发布策略对比</div>
      <div class="subtitle">网站升级就像店铺装修，怎么才能不影响做生意？</div>
    </div>

    <div class="tabs">
      <button
        v-for="s in strategies"
        :key="s.id"
        :class="['tab', { active: current === s.id }]"
        @click="current = s.id"
      >
        <span class="emoji">{{ s.emoji }}</span>
        {{ s.label }}
      </button>
    </div>

    <div class="stats">
      <div class="card">
        <div class="label">操作方式</div>
        <div class="value">{{ flow }}</div>
      </div>
      <div class="card">
        <div class="label">后悔药 (回滚时间)</div>
        <div class="value">{{ rollbackTime }}</div>
      </div>
      <div class="card">
        <div class="label">成本代价</div>
        <div class="value">{{ cost }}</div>
      </div>
    </div>

    <div class="analogy-section">
      <div class="col">
        <div class="section-title">🧐 通俗理解</div>
        <div class="analogy-text">{{ analogy }}</div>
      </div>
      <div class="col">
        <div class="section-title">⚠️ 风险点</div>
        <div class="risk-text">{{ risk }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const strategies = [
  { id: 'rolling', label: '滚动更新 (Rolling)', emoji: '🔄' },
  { id: 'blue', label: '蓝绿发布 (Blue/Green)', emoji: '🔵🟢' },
  { id: 'canary', label: '金丝雀发布 (Canary)', emoji: '🐦' }
]

const current = ref('rolling')

const flow = computed(() => {
  if (current.value === 'rolling') return '分批替换'
  if (current.value === 'blue') return '全量切换'
  return '按比例慢慢切'
})

const rollbackTime = computed(() => {
  if (current.value === 'rolling') return '慢 (3-10 分钟)'
  if (current.value === 'blue') return '极快 (秒级)'
  return '快 (秒级)'
})

const cost = computed(() => {
  if (current.value === 'rolling') return '低 (资源利用率高)'
  if (current.value === 'blue') return '高 (需要双倍机器)'
  return '中 (需要复杂网关)'
})

const analogy = computed(() => {
  switch (current.value) {
    case 'rolling':
      return '就像餐厅换桌布。不关门，一桌一桌换。客人来了坐新桌子，还没换好的桌子先空着。'
    case 'blue':
      return '有钱任性。在隔壁新开一家一模一样的店。装修好了，直接把大门指路牌改到新店。'
    case 'canary':
      return '先让 VIP 客户去新包间体验一下。如果 VIP 没投诉，再把所有客人都请进去。'
    default: return ''
  }
})

const risk = computed(() => {
  if (current.value === 'rolling')
    return '中间状态比较乱，有的客人看到新装修，有的看到旧装修。'
  if (current.value === 'blue') return '太贵了！'
  return '技术要求高，得有能识别 VIP 的“门童” (流量网关)。'
})
</script>

<style scoped>
.roll {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header .title {
  font-weight: 800;
  font-size: 18px;
}
.header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.tab {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.2s;
}
.tab.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}
.label {
  color: var(--vp-c-text-2);
  font-size: 12px;
}
.value {
  font-weight: 800;
  margin-top: 4px;
  font-size: 15px;
}

.analogy-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}
.col {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}
.section-title {
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 14px;
}
.analogy-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}
.risk-text {
  font-size: 14px;
  line-height: 1.6;
  color: #ef4444;
}
</style>
