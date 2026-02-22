<template>
  <div class="demo-card">
    <div class="timeline-visual">
      <div class="era" v-for="era in eras" :key="era.label" :style="{ flex: era.flex, background: era.bg }">
        <div class="era-label">{{ era.label }}</div>
        <div class="era-years">{{ era.years }}</div>
      </div>
    </div>
    <div class="legend">
      <span class="legend-item"><span class="dot" style="background:#059669"></span>技术浪潮</span>
      <span class="legend-item"><span class="dot" style="background:#94a3b8"></span>❄️ AI 寒冬</span>
      <span class="legend-item"><span class="dot" style="background:#7c3aed"></span>大模型时代</span>
    </div>
  </div>
</template>

<script setup>
const eras = [
  { label: '理论奠基', years: '1940s-50s', flex: 1.5, bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' },
  { label: '第一次浪潮', years: '1960s-70s', flex: 1.5, bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' },
  { label: '❄️ 寒冬 I', years: '1974-80', flex: 0.7, bg: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' },
  { label: '第二次浪潮', years: '1980s', flex: 1, bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' },
  { label: '❄️ 寒冬 II', years: '1987-93', flex: 0.7, bg: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' },
  { label: 'ML 崛起', years: '1990s-2000s', flex: 1.5, bg: 'linear-gradient(135deg, #d1fae5, #6ee7b7)' },
  { label: '深度学习', years: '2010s', flex: 1.2, bg: 'linear-gradient(135deg, #a7f3d0, #34d399)' },
  { label: '大模型时代', years: '2018+', flex: 1.2, bg: 'linear-gradient(135deg, #c4b5fd, #a78bfa)' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.timeline-visual { display: flex; border-radius: 6px; overflow: hidden; border: 1px solid var(--vp-c-divider); min-height: 60px; }
.era { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.4rem 0.2rem; text-align: center; border-right: 1px solid rgba(255,255,255,0.4); }
.era:last-child { border-right: none; }
.era-label { font-size: 0.65rem; font-weight: bold; color: #1e293b; line-height: 1.2; }
.era-years { font-size: 0.55rem; color: #475569; margin-top: 0.15rem; }
.legend { display: flex; gap: 1rem; margin-top: 0.6rem; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 0.3rem; font-size: 0.72rem; color: var(--vp-c-text-2); }
.dot { width: 8px; height: 8px; border-radius: 2px; }
@media (max-width: 640px) { .era-label { font-size: 0.58rem; } .era-years { display: none; } }
</style>