<template>
  <div class="demo-card">
    <div class="net-layout">
      <div class="svg-wrap">
        <svg viewBox="0 0 380 200" class="net-svg">
          <line v-for="c in connections" :key="c.id" :x1="c.x1" :y1="c.y1" :x2="c.x2" :y2="c.y2" stroke="#94a3b8" stroke-width="1.2" opacity="0.35" />
          <g v-for="layer in layers" :key="layer.idx">
            <circle v-for="n in layer.nodes" :key="n.id" :cx="n.x" :cy="n.y" r="15" :fill="layer.fill" :stroke="layer.stroke" stroke-width="2" />
          </g>
          <text v-for="(layer, i) in layers" :key="'l-'+layer.idx" :x="layer.x" y="194" text-anchor="middle" :fill="layer.stroke" class="lbl">{{ localLayers[i]?.name }}</text>
        </svg>
      </div>
      <div class="layer-cards">
        <div v-for="(info, i) in localLayers" :key="i" class="layer-card" :style="{ borderLeftColor: layerColors[i]?.color }">
          <div class="lc-title" :style="{ color: layerColors[i]?.color }">{{ info.name }}</div>
          <div class="lc-desc">{{ info.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { aiHistoryLocale } from '../../../locales/ai-history/index.js'

const { messages } = useI18n(aiHistoryLocale)
const localLayers = computed(() => messages.value.neuralNet?.layers ?? [])

const W = 380, H = 185
const layerColors = [
  { color: '#3b82f6', fill: '#dbeafe' },
  { color: '#7c3aed', fill: '#ede9fe' },
  { color: '#059669', fill: '#d1fae5' },
]
const layerCounts = [3, 4, 2]
const xFracs = [0.13, 0.5, 0.87]

const layers = layerColors.map((l, idx) => {
  const x = xFracs[idx] * W
  const count = layerCounts[idx]
  const gap = Math.min(46, (H - 36) / (count - 1 || 1))
  const startY = (H - gap * (count - 1)) / 2
  return { idx, x, fill: l.fill, stroke: l.color, nodes: Array.from({ length: count }, (_, i) => ({ id: `${idx}-${i}`, x, y: startY + i * gap })) }
})
const connections = []
for (let li = 0; li < layers.length - 1; li++) {
  layers[li].nodes.forEach(a => { layers[li + 1].nodes.forEach(b => { connections.push({ id: `${a.id}-${b.id}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y }) }) })
}
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.net-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.9rem; }
@media (max-width: 600px) { .net-layout { grid-template-columns: 1fr; } }
.svg-wrap { display: flex; align-items: center; justify-content: center; background: var(--vp-c-bg-alt); border-radius: 6px; }
.net-svg { width: 100%; height: auto; }
.lbl { font-size: 9px; font-weight: bold; }
.layer-cards { display: flex; flex-direction: column; gap: 0.4rem; justify-content: center; }
.layer-card { border-left: 3px solid; padding: 0.5rem 0.7rem; background: var(--vp-c-bg-alt); border-radius: 0 5px 5px 0; }
.lc-title { font-weight: bold; font-size: 0.78rem; margin-bottom: 0.15rem; }
.lc-desc { font-size: 0.73rem; color: var(--vp-c-text-2); line-height: 1.4; }
</style>
