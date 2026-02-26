<template>
  <div class="demo-card">
    <div class="timeline-visual">
      <div v-for="(era, i) in eras" :key="i" class="era" :style="{ flex: era.flex, background: era.bg }">
        <div class="era-label">{{ localeEras[i]?.label ?? era.label }}</div>
        <div class="era-years">{{ localeEras[i]?.years ?? era.years }}</div>
      </div>
    </div>
    <div class="legend">
      <span class="legend-item"><span class="dot" style="background:#059669"></span>{{ t('aiEvolution.legend.wave') }}</span>
      <span class="legend-item"><span class="dot" style="background:#94a3b8"></span>{{ t('aiEvolution.legend.winter') }}</span>
      <span class="legend-item"><span class="dot" style="background:#7c3aed"></span>{{ t('aiEvolution.legend.llm') }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiHistoryLocale } from '../../../locales/ai-history/index.js'

const { t, messages } = useI18n(aiHistoryLocale)
const localeEras = computed(() => messages.value.aiEvolution?.eras ?? [])

const eras = [
  { flex: 1.5, bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' },
  { flex: 1.5, bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' },
  { flex: 0.7, bg: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' },
  { flex: 1, bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' },
  { flex: 0.7, bg: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' },
  { flex: 1.5, bg: 'linear-gradient(135deg, #d1fae5, #6ee7b7)' },
  { flex: 1.2, bg: 'linear-gradient(135deg, #a7f3d0, #34d399)' },
  { flex: 1.2, bg: 'linear-gradient(135deg, #c4b5fd, #a78bfa)' },
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