<template>
  <div class="demo-card">
    <div class="schools-grid">
      <div class="school-card" v-for="s in schools" :key="s.name" :style="{ borderTopColor: s.color }">
        <div class="card-head">
          <span class="school-icon">{{ s.icon }}</span>
          <span class="school-name" :style="{ color: s.color }">{{ s.name }}</span>
        </div>
        <div class="school-idea">{{ s.idea }}</div>
        <div class="school-rep">代表：{{ s.rep }}</div>
        <div class="school-status">{{ s.status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const schools = [
  { name: '符号主义', icon: '📜', color: '#059669', idea: '智能 = 符号推理 / If-Then 规则', rep: '专家系统、深蓝', status: '→ 与连接主义融合（神经符号 AI）' },
  { name: '连接主义', icon: '🧠', color: '#7c3aed', idea: '智能 = 神经元网络 + 海量数据', rep: 'AlphaGo、GPT 系列', status: '→ 主导大模型时代，当前主流' },
  { name: '行为主义', icon: '🎮', color: '#d97706', idea: '智能 = 与环境互动 / 强化学习', rep: 'AlphaGo（RL 部分）', status: '→ 与连接主义融合（深度强化学习）' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.schools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; }
@media (max-width: 640px) { .schools-grid { grid-template-columns: 1fr; } }
.school-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-top: 3px solid; border-radius: 6px; padding: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem; }
.card-head { display: flex; align-items: center; gap: 0.5rem; }
.school-icon { font-size: 1.3rem; }
.school-name { font-weight: bold; font-size: 0.9rem; }
.school-idea { font-size: 0.78rem; color: var(--vp-c-text-1); background: var(--vp-c-bg-alt); padding: 0.35rem 0.5rem; border-radius: 4px; }
.school-rep { font-size: 0.72rem; color: var(--vp-c-text-3); }
.school-status { font-size: 0.72rem; color: var(--vp-c-text-2); border-top: 1px dashed var(--vp-c-divider); padding-top: 0.35rem; }
</style>
