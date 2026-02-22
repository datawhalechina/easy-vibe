<template>
  <div class="demo-card">
    <div class="net-layout">
      <div class="svg-wrap">
        <svg viewBox="0 0 380 200" class="net-svg">
          <line v-for="c in connections" :key="c.id" :x1="c.x1" :y1="c.y1" :x2="c.x2" :y2="c.y2" stroke="#94a3b8" stroke-width="1.2" opacity="0.35" />
          <g v-for="layer in layers" :key="layer.idx">
            <circle v-for="n in layer.nodes" :key="n.id" :cx="n.x" :cy="n.y" r="15" :fill="layer.fill" :stroke="layer.stroke" stroke-width="2" />
          </g>
          <text v-for="layer in layers" :key="'l-'+layer.idx" :x="layer.x" y="194" text-anchor="middle" :fill="layer.stroke" class="lbl">{{ layer.name }}</text>
        </svg>
      </div>
      <div class="layer-cards">
        <div class="layer-card" v-for="info in layerInfo" :key="info.name" :style="{ borderLeftColor: info.color }">
          <div class="lc-title" :style="{ color: info.color }">{{ info.name }}</div>
          <div class="lc-desc">{{ info.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const W = 380, H = 185
const layerDef = [
  { name: '输入层', count: 3, xFrac: 0.13, color: '#3b82f6', fill: '#dbeafe' },
  { name: '隐藏层', count: 4, xFrac: 0.5,  color: '#7c3aed', fill: '#ede9fe' },
  { name: '输出层', count: 2, xFrac: 0.87, color: '#059669', fill: '#d1fae5' },
]
const layers = layerDef.map((l, idx) => {
  const x = l.xFrac * W
  const gap = Math.min(46, (H - 36) / (l.count - 1 || 1))
  const startY = (H - gap * (l.count - 1)) / 2
  return { idx, x, name: l.name, fill: l.fill, stroke: l.color, nodes: Array.from({ length: l.count }, (_, i) => ({ id: `${idx}-${i}`, x, y: startY + i * gap })) }
})
const connections = []
for (let li = 0; li < layers.length - 1; li++) {
  layers[li].nodes.forEach(a => { layers[li + 1].nodes.forEach(b => { connections.push({ id: `${a.id}-${b.id}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y }) }) })
}
const layerInfo = [
  { name: '输入层', desc: '原始像素 / 数值信号', color: '#3b82f6' },
  { name: '隐藏层（可叠加多层）', desc: '底层识别边缘 → 中层识别形状 → 高层识别语义概念', color: '#7c3aed' },
  { name: '输出层', desc: '最终分类或预测结果', color: '#059669' },
]
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
