<template>
  <div class="demo-card">
    <div class="bp-flow">
      <div class="step-block" v-for="(step, i) in steps" :key="i" :style="{ borderTopColor: step.color }">
        <div class="step-num" :style="{ background: step.color }">{{ i + 1 }}</div>
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-name">{{ step.name }}</div>
        <div class="step-desc">{{ step.desc }}</div>
      </div>
    </div>
    <div class="loss-visual">
      <div class="loss-label">Loss（误差）随训练轮次下降：</div>
      <svg viewBox="0 0 300 60" class="loss-svg">
        <polyline :points="lossPoints" fill="none" stroke="var(--vp-c-brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <text x="5" y="10" class="ax">高</text>
        <text x="5" y="56" class="ax">低</text>
        <text x="220" y="56" class="ax">训练轮次 →</text>
      </svg>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { icon: '➡️', name: '前向传播', desc: '数据流过网络，得出预测', color: '#3b82f6' },
  { icon: '📐', name: '计算误差', desc: '预测值 vs 正确答案，算 Loss', color: '#d97706' },
  { icon: '⬅️', name: '反向传播', desc: '逐层追溯每个权重的"责任"', color: '#dc2626' },
  { icon: '⚙️', name: '更新权重', desc: '按责任微调，减少下次误差', color: '#059669' },
]
const lossPoints = (() => {
  const pts = []
  for (let i = 0; i <= 50; i++) {
    const x = 20 + i * 5.2
    const y = 52 - 44 * Math.exp(-i * 0.09) + Math.sin(i * 0.7) * 1
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
.loss-svg { width: 100%; max-width: 380px; height: auto; display: block; margin: 0 auto; }
.ax { font-size: 6px; fill: var(--vp-c-text-3); }
</style>
