<template>
  <div class="demo-card">
    <div class="quick-start-grid">
      <div class="qs-item" v-for="item in items" :key="item.icon">
        <div class="qs-icon">{{ item.icon }}</div>
        <div class="qs-title">{{ item.title }}</div>
        <div class="qs-desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  { icon: '🔄', title: 'RNN 的困境', desc: '顺序处理，长距离依赖衰减' },
  { icon: '⚡', title: 'Transformer 突破', desc: '并行计算，全局注意力' },
  { icon: '🎯', title: '注意力机制', desc: '动态关注重要信息' },
  { icon: '🚀', title: '大模型基石', desc: 'GPT、BERT 的核心架构' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.quick-start-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; }
@media (max-width: 720px) { .quick-start-grid { grid-template-columns: repeat(2, 1fr); } }
.qs-item { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 1rem; text-align: center; }
.qs-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.qs-title { font-size: 0.85rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.3rem; }
.qs-desc { font-size: 0.72rem; color: var(--vp-c-text-2); line-height: 1.4; }
</style>
