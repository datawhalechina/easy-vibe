<template>
  <div class="demo-card">
    <div class="pe-content">
      <div class="problem">
        <div class="title">问题：词序很重要</div>
        <div class="examples">
          <span class="ex">我爱你</span>
          <span class="vs">≠</span>
          <span class="ex">你爱我</span>
        </div>
      </div>
      <div class="solution">
        <div class="title">解决：位置编码</div>
        <div class="formula">Token Embedding + Positional Encoding</div>
        <div class="methods">
          <div class="method">正弦余弦（Transformer 原始）</div>
          <div class="method">可学习（BERT、GPT）</div>
          <div class="method">旋转编码 RoPE（LLaMA）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.pe-content { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
@media (max-width: 560px) { .pe-content { grid-template-columns: 1fr; } }
.problem, .solution { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.8rem; }
.title { font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.5rem; }
.examples { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.ex { font-size: 0.9rem; font-weight: bold; color: var(--vp-c-text-1); }
.vs { font-size: 1rem; color: var(--vp-c-brand); }
.formula { background: var(--vp-c-brand-soft); border: 1px dashed var(--vp-c-brand); border-radius: 4px; padding: 0.5rem; font-size: 0.75rem; color: var(--vp-c-brand); text-align: center; margin-bottom: 0.5rem; font-family: monospace; }
.methods { display: flex; flex-direction: column; gap: 0.25rem; }
.method { font-size: 0.7rem; color: var(--vp-c-text-2); background: var(--vp-c-bg-alt); padding: 0.3rem 0.5rem; border-radius: 3px; }
</style>
