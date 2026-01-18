<!--
  FrameworkSelectionDemo.vue
  框架选择小向导：回答 3 个问题，给出推荐 + 适配理由 + 你需要注意什么。
-->
<template>
  <div class="sel">
    <div class="header">
      <div>
        <div class="title">三问选框架</div>
        <div class="subtitle">目标：先跑通一个最小 Agent，再逐步增强。</div>
      </div>
    </div>

    <div class="q">
      <div class="q-title">1) 你更在乎什么？</div>
      <div class="opts">
        <button
          v-for="o in q1"
          :key="o.id"
          :class="['opt', { active: a1 === o.id }]"
          @click="a1 = o.id"
        >
          {{ o.label }}
        </button>
      </div>
    </div>

    <div class="q">
      <div class="q-title">2) 你的任务像哪种？</div>
      <div class="opts">
        <button
          v-for="o in q2"
          :key="o.id"
          :class="['opt', { active: a2 === o.id }]"
          @click="a2 = o.id"
        >
          {{ o.label }}
        </button>
      </div>
    </div>

    <div class="q">
      <div class="q-title">3) 需要多 Agent 分工吗？</div>
      <div class="opts">
        <button
          v-for="o in q3"
          :key="o.id"
          :class="['opt', { active: a3 === o.id }]"
          @click="a3 = o.id"
        >
          {{ o.label }}
        </button>
      </div>
    </div>

    <div class="result">
      <div class="r-title">推荐：{{ rec.name }}</div>
      <div class="r-body">{{ rec.reason }}</div>
      <div class="r-note"><strong>注意：</strong>{{ rec.note }}</div>
      <div class="r-next"><strong>下一步：</strong>{{ rec.next }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const q1 = [
  { id: 'easy', label: '快速上手' },
  { id: 'stable', label: '可控可上线' },
  { id: 'team', label: '团队协作' }
]
const q2 = [
  { id: 'workflow', label: '有明确流程（步骤/图）' },
  { id: 'chat', label: '偏对话与协商' },
  { id: 'explore', label: '探索式试错' }
]
const q3 = [
  { id: 'no', label: '不需要' },
  { id: 'maybe', label: '可能需要' },
  { id: 'yes', label: '必须需要' }
]

const a1 = ref('stable')
const a2 = ref('workflow')
const a3 = ref('maybe')

const rec = computed(() => {
  // Multi-agent first
  if (a3.value === 'yes' || a1.value === 'team') {
    if (a2.value === 'chat') {
      return {
        name: 'AutoGen',
        reason: '多 Agent 对话协作是强项，适合“互相讨论、分工协作”。',
        note: '先把角色边界写清楚，否则容易重复劳动或互怼。',
        next: '从 2 个 Agent 开始：研究员 + 执行者。'
      }
    }
    return {
      name: 'CrewAI',
      reason: '角色+任务模型很直观，适合“分工明确”的团队工作流。',
      note: '先把输入/输出格式定死，避免多人输出难合并。',
      next: '先搭 2-3 个角色：Researcher/Writer/Reviewer。'
    }
  }

  // Single-agent / controllable workflow
  if (a1.value === 'stable' || a2.value === 'workflow') {
    return {
      name: 'LangChain / LangGraph',
      reason: '更适合把 Agent 写成“可控流程”，便于调试、上线、加护栏。',
      note: '别一上来做大系统，先把 1 个工具调用跑通。',
      next: '用 LangGraph 画一个 3-5 节点的小图。'
    }
  }

  // Easy start
  return {
    name: 'CrewAI',
    reason: '上手快、概念直观，适合先做出一个“能跑”的 demo。',
    note: 'demo 能跑不代表可上线，后续要补安全与可观测。',
    next: '先做一个“研究+写作”的最小团队。'
  }
})
</script>

<style scoped>
.sel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.q {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.q-title {
  font-weight: 800;
  margin-bottom: 8px;
}
.opts {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.opt {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.opt.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.result {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.r-title {
  font-weight: 900;
  margin-bottom: 6px;
}
.r-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 6px;
}
.r-note,
.r-next {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
