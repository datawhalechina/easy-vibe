<template>
  <div class="demo-card">
    <div class="attention-layout">
      <div class="sentence-col">
        <div class="col-label" v-html="colLabel"></div>
        <div class="sentence-box">
          <span v-for="(word, i) in sentence" :key="i" class="word-token" :class="{ focus: i === focusIdx }">{{ word }}</span>
        </div>
      </div>
      <div class="bars-col">
        <div v-for="(item, i) in weights" :key="i" class="attention-item">
          <span class="bar-word" :class="{ focus: i === focusIdx }">{{ item.word }}</span>
          <div class="bar-bg">
            <div class="bar-fill" :style="{ width: item.w * 100 + '%', background: barColor(item.w) }"></div>
          </div>
          <span class="bar-pct">{{ Math.round(item.w * 100) }}%</span>
        </div>
      </div>
    </div>
    <div class="caption">
{{ t('attention.caption') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiHistoryLocale } from '../../../locales/ai-history/index.js'

const { t, messages } = useI18n(aiHistoryLocale)

const attnData = computed(() => messages.value.attention ?? {})
const sentence = computed(() => attnData.value.sentence ?? [])
const focusIdx = computed(() => attnData.value.focusIdx ?? 4)
const rawWeights = computed(() => attnData.value.weights ?? [])
const weights = computed(() => sentence.value.map((word, i) => ({ word, w: rawWeights.value[i] ?? 0 })))
const focusWord = computed(() => sentence.value[focusIdx.value] ?? '')
const colLabel = computed(() => (attnData.value.colLabel ?? '').replace('{word}', focusWord.value))

const barColor = (v) => v > 0.5 ? '#dc2626' : v > 0.15 ? '#d97706' : v > 0.06 ? '#059669' : 'var(--vp-c-divider)'
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.attention-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: 1rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.9rem; margin-bottom: 0.5rem; }
@media (max-width: 560px) { .attention-layout { grid-template-columns: 1fr; } }
.col-label { font-size: 0.76rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; font-weight: bold; }
.sentence-box { display: flex; flex-wrap: wrap; gap: 0.35rem; background: var(--vp-c-bg-alt); padding: 0.6rem; border-radius: 5px; border: 1px dashed var(--vp-c-divider); }
.word-token { font-size: 0.88rem; font-weight: bold; padding: 0.2rem 0.5rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 4px; }
.word-token.focus { background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand); }
.bars-col { display: flex; flex-direction: column; gap: 0.3rem; justify-content: center; }
.attention-item { display: flex; align-items: center; gap: 0.4rem; }
.bar-word { width: 30px; text-align: right; font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-2); flex-shrink: 0; }
.bar-word.focus { color: var(--vp-c-brand); }
.bar-bg { flex: 1; height: 12px; background: var(--vp-c-bg-alt); border-radius: 6px; overflow: hidden; border: 1px solid var(--vp-c-divider); }
.bar-fill { height: 100%; border-radius: 6px; }
.bar-pct { font-size: 0.7rem; font-weight: bold; color: var(--vp-c-text-2); width: 30px; flex-shrink: 0; }
.caption { font-size: 0.75rem; color: var(--vp-c-text-3); text-align: center; }
</style>
