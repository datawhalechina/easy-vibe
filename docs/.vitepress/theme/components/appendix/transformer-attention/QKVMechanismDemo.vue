<template>
  <div class="demo-card">
    <div class="qkv-grid">
      <div class="qkv-item query">
        <div class="icon">🔍</div>
        <div class="name">Query</div>
        <div class="desc">我想找什么</div>
      </div>
      <div class="qkv-item key">
        <div class="icon">🔑</div>
        <div class="name">Key</div>
        <div class="desc">我是什么</div>
      </div>
      <div class="qkv-item value">
        <div class="icon">💎</div>
        <div class="name">Value</div>
        <div class="desc">我的内容</div>
      </div>
    </div>
    <div class="formula">
      Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) V
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.qkv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-bottom: 0.8rem; }
@media (max-width: 560px) { .qkv-grid { grid-template-columns: 1fr; } }
.qkv-item { background: var(--vp-c-bg); border: 2px solid; border-radius: 6px; padding: 0.7rem; text-align: center; }
.qkv-item.query { border-color: #3b82f6; }
.qkv-item.key { border-color: #059669; }
.qkv-item.value { border-color: #7c3aed; }
.icon { font-size: 1.5rem; margin-bottom: 0.3rem; }
.name { font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.2rem; }
.desc { font-size: 0.7rem; color: var(--vp-c-text-2); }
.formula { background: var(--vp-c-bg); border: 1px dashed var(--vp-c-brand); border-radius: 4px; padding: 0.6rem; text-align: center; font-size: 0.85rem; font-family: 'Courier New', monospace; color: var(--vp-c-brand); font-weight: bold; }
</style>
