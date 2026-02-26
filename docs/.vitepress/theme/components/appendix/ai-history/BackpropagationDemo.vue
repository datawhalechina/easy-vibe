<template>
  <div class="demo-card">
    <div class="bp-flow">
      <div v-for="(step, i) in localSteps" :key="i" class="step-block" :style="{ borderTopColor: stepColors[i] }">
        <div class="step-num" :style="{ background: stepColors[i] }">{{ i + 1 }}</div>
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-name">{{ step.name }}</div>
        <div class="step-desc">{{ step.desc }}</div>
      </div>
    </div>
    <div class="loss-visual">
      <div class="loss-label">{{ t('backprop.lossLabel') }}</div>
      <svg viewBox="0 0 320 130" class="loss-svg">
        <!-- Axes -->
        <line x1="40" y1="110" x2="300" y2="110" stroke="var(--vp-c-text-3)" stroke-width="1.5" />
        <line x1="40" y1="110" x2="40" y2="15" stroke="var(--vp-c-text-3)" stroke-width="1.5" />
        
        <!-- X Arrow -->
        <polygon points="300,107 305,110 300,113" fill="var(--vp-c-text-3)" />
        <!-- Y Arrow -->
        <polygon points="37,15 40,10 43,15" fill="var(--vp-c-text-3)" />

        <!-- Y Label -->
        <text x="30" y="25" text-anchor="end" class="ax-text">{{ t('backprop.axisHigh') }}</text>
        <text x="30" y="105" text-anchor="end" class="ax-text">{{ t('backprop.axisLow') }}</text>
        <text x="20" y="65" text-anchor="middle" transform="rotate(-90 20 65)" class="ax-title">Loss</text>
        
        <!-- X Label -->
        <text x="300" y="125" text-anchor="end" class="ax-title">{{ t('backprop.axisEpochs') }}</text>

        <!-- Loss 曲线 -->
        <polyline :points="lossPoints" fill="none" stroke="var(--vp-c-brand)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiHistoryLocale } from '../../../locales/ai-history/index.js'

const { t, messages } = useI18n(aiHistoryLocale)
const localSteps = computed(() => messages.value.backprop?.steps ?? [])

const stepColors = ['#3b82f6', '#d97706', '#dc2626', '#059669']
const lossPoints = (() => {
  const pts = []
  for (let i = 0; i <= 50; i++) {
    const x = 40 + i * 5; // 40 to 290
    // Y从上(小值)到下(大值)，Loss越来越低，意味着Y越来越大，靠近110
    // 我们让一开始的高Loss出现在 y=20 附近，最终的低Loss停留 在 y=105 附近
    let noise = (Math.random() - 0.5) * 3; 
    let y = 105 - 85 * Math.exp(-i * 0.12) + noise; 
    
    if (i === 0) y = 20; // 确保起点干净
    if (y > 108) y = 108; // 不超过底轴
    
    pts.push(`${x},${y}`)
  }
  return pts.join(' ')
})()
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.bp-flow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.8rem; }
@media (max-width: 600px) { .bp-flow { grid-template-columns: repeat(2, 1fr); } }
.step-block { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-top: 3px solid; border-radius: 6px; padding: 0.7rem 0.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; text-align: center; }
.step-num { width: 16px; height: 16px; border-radius: 50%; color: white; font-size: 0.6rem; font-weight: bold; display: flex; align-items: center; justify-content: center; }
.step-icon { font-size: 1.2rem; }
.step-name { font-weight: bold; font-size: 0.78rem; }
.step-desc { font-size: 0.68rem; color: var(--vp-c-text-2); line-height: 1.3; }
.loss-visual { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.7rem; }
.loss-label { font-size: 0.75rem; color: var(--vp-c-text-2); margin-bottom: 0.3rem; }
.loss-svg { width: 100%; max-width: 460px; height: auto; display: block; margin: 0 auto; overflow: visible; font-family: sans-serif; }
.axis-line { color: var(--vp-c-text-3); }
.ax-text { font-size: 10px; fill: var(--vp-c-text-2); }
.ax-title { font-size: 11px; fill: var(--vp-c-text-1); font-weight: 500; }
</style>
