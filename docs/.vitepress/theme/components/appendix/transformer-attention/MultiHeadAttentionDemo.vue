<template>
  <div class="demo-card">
    <div class="heads-grid">
      <div v-for="head in heads" :key="head.id" class="head-card">
        <div class="head-name">{{ head.name }}</div>
        <div class="head-desc">{{ head.desc }}</div>
      </div>
    </div>
    <div class="summary">8 个头从不同角度理解语义，最后拼接融合</div>
  </div>
</template>

<script setup>
const heads = [
  { id: 1, name: '语法头', desc: '主谓宾关系' },
  { id: 2, name: '语义头', desc: '词义关联' },
  { id: 3, name: '位置头', desc: '距离关系' },
  { id: 4, name: '指代头', desc: '代词消解' },
  { id: 5, name: '情感头', desc: '情绪倾向' },
  { id: 6, name: '实体头', desc: '命名实体' },
  { id: 7, name: '修饰头', desc: '定状补' },
  { id: 8, name: '全局头', desc: '整体语境' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.heads-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 0.6rem; }
@media (max-width: 720px) { .heads-grid { grid-template-columns: repeat(2, 1fr); } }
.head-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 0.5rem; text-align: center; }
.head-name { font-size: 0.75rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.2rem; }
.head-desc { font-size: 0.68rem; color: var(--vp-c-text-2); }
.summary { font-size: 0.75rem; color: var(--vp-c-text-2); text-align: center; font-style: italic; }
</style>
