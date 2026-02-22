<template>
  <div class="demo-card">
    <div class="events">
      <div class="event" v-for="e in events" :key="e.year">
        <div class="year-col">
          <span class="year-badge">{{ e.year }}</span>
        </div>
        <div class="dot-col">
          <div class="dot" :style="{ background: e.color }"></div>
          <div class="line" v-if="e !== events[events.length - 1]"></div>
        </div>
        <div class="content-col">
          <div class="event-title">{{ e.title }}</div>
          <div class="event-note">{{ e.note }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const events = [
  { year: '1943', title: 'MP 神经元模型', note: '麦卡洛克 & 皮茨：首次用数学公式模拟神经元，证明"神经元可被计算"。', color: '#3b82f6' },
  { year: '1950', title: '图灵测试', note: '图灵：如果机器的回答让人无法分辨是人还是机器，则认为它具备智能。', color: '#7c3aed' },
  { year: '1956', title: '达特茅斯会议 — AI 学科诞生', note: '麦卡锡等人首次提出"人工智能"概念，AI 正式成为一门学科。', color: '#059669' },
  { year: '1956', title: '逻辑理论家（Logic Theorist）', note: '纽厄尔 & 西蒙：第一个用规则自动证明数学定理的 AI 程序。', color: '#059669' },
  { year: '1958', title: 'LISP 语言诞生', note: '麦卡锡发明，成为此后数十年 AI 研究的核心编程语言。', color: '#d97706' },
  { year: '1959', title: '首台工业机器人', note: '德沃尔 & 恩格尔伯格：AI 从实验室走向工厂，开始改变工业生产。', color: '#dc2626' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.events { display: flex; flex-direction: column; }
.event { display: grid; grid-template-columns: 52px 24px 1fr; gap: 0 0.6rem; }
.year-col { display: flex; align-items: flex-start; padding-top: 0.15rem; justify-content: flex-end; }
.year-badge { font-size: 0.7rem; font-weight: bold; color: var(--vp-c-text-3); white-space: nowrap; }
.dot-col { display: flex; flex-direction: column; align-items: center; }
.dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 0.2rem; }
.line { width: 2px; flex: 1; background: var(--vp-c-divider); margin: 3px 0; min-height: 16px; }
.content-col { padding-bottom: 0.9rem; }
.event-title { font-weight: bold; font-size: 0.85rem; color: var(--vp-c-text-1); margin-bottom: 0.15rem; }
.event-note { font-size: 0.78rem; color: var(--vp-c-text-2); line-height: 1.5; }
</style>
