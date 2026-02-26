<template>
  <div class="demo-card">
    <div class="schools-grid">
      <div v-for="(s, i) in schoolStyles" :key="i" class="school-card" :style="{ borderTopColor: s.color }">
        <div class="card-head">
          <span class="school-icon">{{ s.icon }}</span>
          <span class="school-name" :style="{ color: s.color }">{{ localeItems[i]?.name }}</span>
        </div>
        <div class="school-idea">{{ localeItems[i]?.idea }}</div>
        <div class="school-rep">{{ t('schools.repLabel') }}：{{ localeItems[i]?.rep }}</div>
        <div class="school-status">{{ localeItems[i]?.status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiHistoryLocale } from '../../../locales/ai-history/index.js'

const { t, messages } = useI18n(aiHistoryLocale)
const localeItems = computed(() => messages.value.schools?.items ?? [])

const schoolStyles = [
  { icon: '📜', color: '#059669' },
  { icon: '🧠', color: '#7c3aed' },
  { icon: '🎮', color: '#d97706' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.schools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; }
@media (max-width: 640px) { .schools-grid { grid-template-columns: 1fr; } }
.school-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-top: 3px solid; border-radius: 6px; padding: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem; }
.card-head { display: flex; align-items: center; gap: 0.5rem; }
.school-icon { font-size: 1.3rem; }
.school-name { font-weight: bold; font-size: 0.9rem; }
.school-idea { font-size: 0.78rem; color: var(--vp-c-text-1); background: var(--vp-c-bg-alt); padding: 0.35rem 0.5rem; border-radius: 4px; }
.school-rep { font-size: 0.72rem; color: var(--vp-c-text-3); }
.school-status { font-size: 0.72rem; color: var(--vp-c-text-2); border-top: 1px dashed var(--vp-c-divider); padding-top: 0.35rem; }
</style>
