<!--
  FrameworkComparisonDemo.vue
  框架对比（更直观）：选择关注点，表格高亮适配度。
-->
<template>
  <div class="cmp">
    <div class="header">
      <div>
        <div class="title">主流框架对比（先看“适配度”）</div>
        <div class="subtitle">先选你的关注点，再看推荐。</div>
      </div>
      <div class="focus">
        <button
          v-for="f in focuses"
          :key="f.id"
          :class="['chip', { active: focus === f.id }]"
          @click="focus = f.id"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <div class="table">
      <div class="row head">
        <div>框架</div>
        <div>上手</div>
        <div>可控</div>
        <div>多 Agent</div>
        <div>适合做什么</div>
      </div>
      <div v-for="fw in frameworks" :key="fw.name" :class="['row', { best: fw.name === best }]">
        <div class="name">{{ fw.name }}</div>
        <div>{{ fw.learn }}</div>
        <div>{{ fw.control }}</div>
        <div>{{ fw.multi }}</div>
        <div class="use">{{ fw.use }}</div>
      </div>
    </div>

    <div class="rec">
      <div class="rec-title">此刻更推荐：{{ best }}</div>
      <div class="rec-body">{{ reason }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const focuses = [
  { id: 'start', label: '快速上手' },
  { id: 'control', label: '可控可调试' },
  { id: 'team', label: '多 Agent 协作' }
]

const focus = ref('control')

const frameworks = [
  { name: 'LangChain / LangGraph', learn: '中', control: '高', multi: '中', use: '可控的工具调用、工作流、企业集成' },
  { name: 'AutoGen', learn: '中', control: '中', multi: '高', use: '多 Agent 对话协作、编程/分析助手' },
  { name: 'CrewAI', learn: '低', control: '中', multi: '高', use: '角色分工清晰的团队协作任务' }
]

const best = computed(() => {
  if (focus.value === 'start') return 'CrewAI'
  if (focus.value === 'team') return 'AutoGen'
  return 'LangChain / LangGraph'
})

const reason = computed(() => {
  if (focus.value === 'start') return '概念更直观（角色+任务），适合先跑通一个最小团队。'
  if (focus.value === 'team') return '多 Agent 对话与协作是强项，适合需要分工的场景。'
  return '把流程“画成图/写成步骤”，更利于调试、上线与长期维护。'
})
</script>

<style scoped>
.cmp { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 16px; margin: 20px 0; display: flex; flex-direction: column; gap: 12px; }
.header { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.title { font-weight: 800; }
.subtitle { color: var(--vp-c-text-2); font-size: 13px; }
.focus { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); padding: 8px 12px; border-radius: 999px; cursor: pointer; }
.chip.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }

.table { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; }
.row { display: grid; grid-template-columns: 1.4fr 0.8fr 0.8fr 0.9fr 2.1fr; gap: 10px; padding: 10px 12px; border-top: 1px solid var(--vp-c-divider); align-items: center; }
.row.head { border-top: none; font-weight: 800; color: var(--vp-c-text-2); background: var(--vp-c-bg-soft); }
.name { font-weight: 800; }
.use { color: var(--vp-c-text-2); }
.row.best { outline: 2px solid var(--vp-c-brand); outline-offset: -2px; background: rgba(0, 0, 0, 0.02); }

.rec { background: var(--vp-c-bg); border: 1px dashed var(--vp-c-divider); border-radius: 12px; padding: 12px; }
.rec-title { font-weight: 800; margin-bottom: 6px; }
.rec-body { color: var(--vp-c-text-2); line-height: 1.6; }
</style>

