<template>
  <div class="demo-card">
    <div class="gpt-grid">
      <div class="gpt-card" v-for="m in models" :key="m.name" :style="{ borderTopColor: m.color }">
        <div class="card-top">
          <span class="gpt-name" :style="{ color: m.color }">{{ m.name }}</span>
          <span class="gpt-year">{{ m.year }}</span>
        </div>
        <div class="param-val">{{ m.params }}</div>
        <div class="param-bar-bg">
          <div class="param-bar" :style="{ width: m.barWidth, background: m.color }"></div>
        </div>
        <div class="gpt-key">{{ m.key }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const models = [
  { name: 'GPT-1', year: '2018', params: '1.17 亿', barWidth: '2%', color: '#94a3b8', key: '预训练+微调范式确立' },
  { name: 'GPT-2', year: '2019', params: '15 亿', barWidth: '6%', color: '#3b82f6', key: 'Zero-shot 零样本泛化' },
  { name: 'GPT-3', year: '2020', params: '1750 亿', barWidth: '45%', color: '#7c3aed', key: '⚡ 涌现！上下文学习' },
  { name: 'GPT-4', year: '2023', params: '~1.8 万亿', barWidth: '100%', color: '#dc2626', key: '多模态 + 复杂推理' },
]
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