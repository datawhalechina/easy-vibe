<template>
  <div class="demo-card">
    <div class="comparison-grid">
      <div class="model-col">
        <div class="model-name">RNN / LSTM</div>
        <div class="model-desc">顺序处理：词1 → 词2 → 词3</div>
        <div class="issues">
          <div class="issue">❌ 长距离依赖衰减</div>
          <div class="issue">❌ 无法并行训练</div>
        </div>
      </div>
      <div class="model-col highlight">
        <div class="model-name">Transformer</div>
        <div class="model-desc">并行处理：所有词同时计算</div>
        <div class="benefits">
          <div class="benefit">✅ 全局注意力</div>
          <div class="benefit">✅ 高效并行</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
@media (max-width: 560px) { .comparison-grid { grid-template-columns: 1fr; } }
.model-col { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.8rem; }
.model-col.highlight { border-color: var(--vp-c-brand); background: linear-gradient(135deg, var(--vp-c-bg), var(--vp-c-brand-soft)); }
.model-name { font-size: 0.85rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.4rem; }
.model-desc { font-size: 0.75rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.issues, .benefits { display: flex; flex-direction: column; gap: 0.25rem; }
.issue, .benefit { font-size: 0.7rem; }
.issue { color: #dc2626; }
.benefit { color: #059669; }
</style>
