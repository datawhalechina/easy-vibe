<template>
  <div class="demo-card">
    <div class="era-container">
      <div class="era-header">
        {{ t('erasComparison.header') }}
      </div>
      <div class="era-grid">
        <div v-for="(era, i) in localEras" :key="i" class="era-item" :style="{ borderTopColor: eraStyles[i]?.color }">
          <div class="e-icon" :style="{ background: eraStyles[i]?.color }">{{ eraStyles[i]?.icon }}</div>
          <div class="e-name" :style="{ color: eraStyles[i]?.color }">{{ era.name }}</div>
          <div class="e-time">{{ era.time }}</div>

          <div class="e-section">
            <div class="e-label">{{ t('erasComparison.driverLabel') }}</div>
            <div class="e-value">{{ era.driver }}</div>
          </div>

          <div class="e-section">
            <div class="e-label">{{ t('erasComparison.mechanismLabel') }}</div>
            <div class="e-value">
              <span class="highlight">{{ era.mechanism }}</span>
            </div>
          </div>

          <div class="e-section">
            <div class="e-label">{{ t('erasComparison.examplesLabel') }}</div>
            <div class="e-tags">
              <span v-for="tag in era.examples" :key="tag" class="e-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiHistoryLocale } from '../../../locales/ai-history/index.js'

const { t, messages } = useI18n(aiHistoryLocale)
const localEras = computed(() => messages.value.erasComparison?.eras ?? [])

const eraStyles = [
  { icon: '📜', color: '#059669' },
  { icon: '📊', color: '#d97706' },
  { icon: '🧠', color: '#dc2626' },
  { icon: '💬', color: '#7c3aed' },
  { icon: '🤖', color: '#0284c7' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1.5rem 0; overflow-x: auto; }
.era-container { min-width: 800px; display: flex; flex-direction: column; gap: 1rem; }
.era-header { text-align: center; font-weight: bold; font-size: 1.1rem; color: var(--vp-c-text-1); margin-bottom: 0.5rem; }

.era-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.8rem; }
.era-item { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-top: 4px solid; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.8rem; }

.e-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 0.2rem; }
.e-name { font-weight: 800; font-size: 0.95rem; }
.e-time { font-size: 0.75rem; color: var(--vp-c-text-3); font-weight: bold; margin-top: -0.6rem; }

.e-section { width: 100%; display: flex; flex-direction: column; gap: 0.3rem; margin-top: 0.2rem; }
.e-label { font-size: 0.7rem; color: var(--vp-c-text-3); text-transform: uppercase; letter-spacing: 0.5px; }
.e-value { font-size: 0.8rem; color: var(--vp-c-text-2); line-height: 1.4; }
.highlight { display: inline-block; background: var(--vp-c-bg-soft); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600; color: var(--vp-c-text-1); border: 1px dashed var(--vp-c-divider); }

.e-tags { display: flex; flex-direction: column; gap: 0.4rem; align-items: center; justify-content: center; }
.e-tag { font-size: 0.75rem; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); padding: 0.25rem 0.6rem; border-radius: 12px; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.html.dark .highlight { background: var(--vp-c-bg-alt); }
</style>
