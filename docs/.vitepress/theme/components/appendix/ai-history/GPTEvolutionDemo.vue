<template>
  <div class="demo-card">
    <div class="gpt-grid">
      <div v-for="(m, i) in models" :key="i" class="gpt-card" :style="{ borderTopColor: modelColors[i] }">
        <div class="card-top">
          <span class="gpt-name" :style="{ color: modelColors[i] }">{{ m.name }}</span>
          <span class="gpt-year">{{ m.year }}</span>
        </div>
        <div class="param-val">{{ m.params }}</div>
        <div class="param-bar-bg">
          <div class="param-bar" :style="{ width: m.barWidth, background: modelColors[i] }"></div>
        </div>
        <div class="gpt-key">{{ m.key }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiHistoryLocale } from '../../../locales/ai-history/index.js'

const { messages } = useI18n(aiHistoryLocale)
const models = computed(() => messages.value.gptEvolution ?? [])

const modelColors = ['#94a3b8', '#3b82f6', '#7c3aed', '#dc2626']
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.gpt-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
@media (max-width: 640px) { .gpt-grid { grid-template-columns: repeat(2, 1fr); } }
.gpt-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-top: 3px solid; border-radius: 6px; padding: 0.7rem; display: flex; flex-direction: column; gap: 0.35rem; }
.card-top { display: flex; justify-content: space-between; }
.gpt-name { font-weight: bold; font-size: 0.88rem; }
.gpt-year { font-size: 0.68rem; color: var(--vp-c-text-3); }
.param-val { font-size: 0.78rem; font-weight: bold; font-family: monospace; color: var(--vp-c-text-1); }
.param-bar-bg { height: 6px; background: var(--vp-c-bg-alt); border-radius: 3px; overflow: hidden; }
.param-bar { height: 100%; border-radius: 3px; min-width: 3px; }
.gpt-key { font-size: 0.7rem; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); padding: 0.15rem 0.4rem; border-radius: 3px; }
</style>