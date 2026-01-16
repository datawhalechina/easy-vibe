<!--
  AgentFutureDemo.vue
  Agent 未来方向：点选趋势，看看“会带来什么变化”和“现在就能做的准备”。
-->
<template>
  <div class="future">
    <div class="header">
      <div>
        <div class="title">Agent 的未来：更稳、更强、更协作</div>
        <div class="subtitle">点一个趋势，看它意味着什么。</div>
      </div>
    </div>

    <div class="chips">
      <button
        v-for="t in trends"
        :key="t.id"
        :class="['chip', { active: current.id === t.id }]"
        @click="current = t"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="panel">
      <div class="p-title">{{ current.label }}</div>
      <div class="p-body">{{ current.desc }}</div>
      <div class="grid">
        <div class="card">
          <div class="k">会带来什么？</div>
          <div class="v">{{ current.impact }}</div>
        </div>
        <div class="card">
          <div class="k">你现在能做什么准备？</div>
          <div class="v">{{ current.prepare }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trends = [
  {
    id: 'planning',
    label: '更强规划',
    desc: '把大目标拆成更合理的子任务，并能动态改计划。',
    impact: '更少跑题、更少漏步骤，复杂任务成功率更高。',
    prepare: '学会写“计划/检查点”，并把任务拆成可验收小块。'
  },
  {
    id: 'memory',
    label: '更好记忆',
    desc: '长期记住偏好、事实与项目状态，跨任务复用。',
    impact: '更像长期同事：越用越懂你，重复工作更少。',
    prepare: '设计记忆结构：短期/长期/工作记忆，并做好隐私与脱敏。'
  },
  {
    id: 'multi',
    label: '多 Agent 协作',
    desc: '多个角色并行处理，再由协调者合并输出。',
    impact: '大任务并行化，质量更稳（研究/实现/评审分工）。',
    prepare: '先把“角色边界”和“交付格式”定义清楚。'
  },
  {
    id: 'safety',
    label: '更强安全护栏',
    desc: '更细的权限、确认与审计，降低工具滥用风险。',
    impact: '更容易上线到真实业务场景，减少事故。',
    prepare: '默认开启：最大步数、预算上限、危险操作确认、沙箱。'
  }
]

const current = ref(trends[0])
</script>

<style scoped>
.future { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 16px; margin: 20px 0; display: flex; flex-direction: column; gap: 12px; }
.header { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.title { font-weight: 800; }
.subtitle { color: var(--vp-c-text-2); font-size: 13px; }

.chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); padding: 8px 12px; border-radius: 999px; cursor: pointer; }
.chip.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

.panel { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 12px; }
.p-title { font-weight: 900; margin-bottom: 6px; }
.p-body { color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 10px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; }
.card { background: var(--vp-c-bg-soft); border: 1px dashed var(--vp-c-divider); border-radius: 12px; padding: 10px; }
.k { font-weight: 900; margin-bottom: 4px; }
.v { color: var(--vp-c-text-2); line-height: 1.6; }
</style>

