<!--
  AgentWorkflowDemo.vue
  Agent 核心循环（更像“先玩后讲”的演示）：
  - 点步骤：看这一轮 Agent “在干什么”
  - 点“下一轮”：看它如何反复迭代直到完成
-->
<template>
  <div class="workflow">
    <div class="header">
      <div>
        <div class="title">先玩一下：Agent 不是“聊天”，是“循环行动”</div>
        <div class="subtitle">它会反复：观察 → 计划 → 用工具 → 检查结果。</div>
      </div>
      <div class="actions">
        <button class="btn" @click="reset">重置</button>
        <button class="btn primary" @click="nextRound">下一轮 ({{ round }}/3)</button>
      </div>
    </div>

    <div class="cycle">
      <button
        v-for="s in steps"
        :key="s.id"
        :class="['step', { active: currentStep === s.id }]"
        @click="currentStep = s.id"
      >
        <span class="icon">{{ s.icon }}</span>
        <span class="name">{{ s.name }}</span>
      </button>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panel-title">任务</div>
        <div class="panel-body">
          帮我找 3 篇 “Agent” 入门文章，并输出：标题 + 一句话总结。
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">这一轮发生了什么？</div>
        <div class="panel-body">{{ detail }}</div>
      </div>
    </div>

    <div class="log">
      <div class="log-title">Agent 运行日志（示意）</div>
      <pre><code>{{ logText }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const steps = [
  { id: 'observe', name: '观察', icon: '👀' },
  { id: 'plan', name: '计划', icon: '🧩' },
  { id: 'act', name: '行动', icon: '🔧' },
  { id: 'check', name: '检查', icon: '✅' }
]

const round = ref(1)
const currentStep = ref('observe')

const scenarios = [
  {
    observe: '看到用户目标：要 3 篇入门文章 + 简短总结。',
    plan: '计划：1) 搜索关键词 2) 打开前几条 3) 抽取标题与要点。',
    act: '调用工具：web_search(query="agent introduction")。',
    check: '检查：结果里有 3 条可用链接，还缺“每条一句话总结”。'
  },
  {
    observe: '拿到链接列表，准备逐条打开并提取要点。',
    plan: '计划：依次 read_page 3 次，把内容压缩成一句话。',
    act: '调用工具：read_page(url=...) × 3。',
    check: '检查：信息够了，但标题格式不统一，需要整理输出。'
  },
  {
    observe: '材料齐全：标题 + 文章要点都已提取。',
    plan: '计划：统一格式，输出 Markdown 列表。',
    act: '组织输出：每条“标题 - 一句话总结”。',
    check: '完成：满足“3 条 + 一句话总结 + 可直接复制”。'
  }
]

const current = computed(() => scenarios[round.value - 1])

const detail = computed(() => current.value[currentStep.value])

const logText = computed(() => {
  const logs = []
  for (let i = 0; i < round.value; i++) {
    logs.push(`--- Round ${i + 1} ---`)
    logs.push(`OBS: ${scenarios[i].observe}`)
    logs.push(`PLAN: ${scenarios[i].plan}`)
    logs.push(`ACT: ${scenarios[i].act}`)
    logs.push(`CHECK: ${scenarios[i].check}`)
    logs.push('')
  }
  return logs.join('\n')
})

const nextRound = () => {
  if (round.value >= 3) return
  round.value++
  currentStep.value = 'observe'
}

const reset = () => {
  round.value = 1
  currentStep.value = 'observe'
}
</script>

<style scoped>
.workflow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.title { font-weight: 800; }
.subtitle { color: var(--vp-c-text-2); font-size: 13px; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.btn { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); padding: 8px 12px; border-radius: 10px; cursor: pointer; }
.btn.primary { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }

.cycle {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}
.step {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-align: left;
}
.step.active { border-color: var(--vp-c-brand); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06); }
.icon { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.name { font-weight: 800; }

.panels { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.panel { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 12px; }
.panel-title { font-weight: 700; margin-bottom: 6px; }
.panel-body { color: var(--vp-c-text-2); line-height: 1.6; }

.log { background: var(--vp-c-bg); border: 1px dashed var(--vp-c-divider); border-radius: 12px; padding: 12px; }
.log-title { font-weight: 700; margin-bottom: 8px; }
pre { margin: 0; background: #0b1221; color: #e5e7eb; border-radius: 10px; padding: 12px; font-family: var(--vp-font-family-mono); font-size: 13px; overflow-x: auto; white-space: pre-wrap; }
</style>

