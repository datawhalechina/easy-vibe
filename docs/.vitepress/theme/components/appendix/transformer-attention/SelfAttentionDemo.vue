<template>
  <div class="demo-card">
    <div class="attention-demo">
      <div class="demo-title">自注意力示例：「他」关注「小明」</div>
      <div class="sentence">小明 把 苹果 给了 <span class="focus">他</span> 的 母亲</div>
      <div class="attention-bar">
        <div class="bar-item" v-for="item in weights" :key="item.word">
          <span class="word">{{ item.word }}</span>
          <div class="bar" :style="{ width: item.w * 100 + '%', background: getColor(item.w) }"></div>
          <span class="pct">{{ Math.round(item.w * 100) }}%</span>
        </div>
      </div>
      <div class="caption">「他」把 65% 注意力投向「小明」，识别代词指代关系</div>
    </div>
  </div>
</template>

<script setup>
const weights = [
  { word: '小明', w: 0.65 },
  { word: '把', w: 0.05 },
  { word: '苹果', w: 0.10 },
  { word: '给了', w: 0.10 },
  { word: '他', w: 0.05 },
  { word: '的', w: 0.03 },
  { word: '母亲', w: 0.02 },
]

const getColor = (v) => v > 0.5 ? '#dc2626' : v > 0.15 ? '#d97706' : '#059669'
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1rem; margin: 1rem 0; }
.attention-demo { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.8rem; }
.demo-title { font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.sentence { font-size: 0.9rem; color: var(--vp-c-text-1); margin-bottom: 0.6rem; text-align: center; }
.sentence .focus { color: var(--vp-c-brand); font-weight: bold; background: var(--vp-c-brand-soft); padding: 0.1rem 0.3rem; border-radius: 3px; }
.attention-bar { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.5rem; }
.bar-item { display: flex; align-items: center; gap: 0.3rem; }
.word { width: 35px; text-align: right; font-size: 0.75rem; font-weight: bold; color: var(--vp-c-text-2); }
.bar { height: 10px; border-radius: 5px; min-width: 2px; }
.pct { font-size: 0.65rem; color: var(--vp-c-text-3); width: 30px; }
.caption { font-size: 0.7rem; color: var(--vp-c-text-3); text-align: center; font-style: italic; }
</style>
