<!--
  AgentChallengesDemo.vue
  挑战不是“列清单”，而是“能感受到风险”：
  - 开关护栏（步数上限/预算/确认/沙箱）
  - 看风险分数怎么变化
-->
<template>
  <div class="risk">
    <div class="header">
      <div>
        <div class="title">Agent 的挑战：没护栏就容易“翻车”</div>
        <div class="subtitle">打开这些护栏，风险会明显下降。</div>
      </div>
      <div class="score" :class="scoreClass">风险分数：{{ score }}/100</div>
    </div>

    <div class="controls">
      <label class="toggle"
        ><input type="checkbox" v-model="maxSteps" />
        最大迭代次数（防死循环）</label
      >
      <label class="toggle"
        ><input type="checkbox" v-model="budget" /> 预算上限（防烧钱）</label
      >
      <label class="toggle"
        ><input type="checkbox" v-model="confirm" /> 危险操作二次确认</label
      >
      <label class="toggle"
        ><input type="checkbox" v-model="sandbox" /> 沙箱执行（隔离系统）</label
      >
    </div>

    <div class="grid">
      <div class="card">
        <div class="k">常见风险</div>
        <ul>
          <li>重复尝试 → 死循环</li>
          <li>乱用工具 → 误删/误发</li>
          <li>外部内容注入 → 被带偏</li>
          <li>调用太多 → 成本失控</li>
        </ul>
      </div>
      <div class="card">
        <div class="k">你现在开启了什么？</div>
        <div class="v">{{ enabledList }}</div>
        <div class="note">建议：最少也要有“最大步数 + 确认”。</div>
      </div>
      <div class="card">
        <div class="k">一句话建议</div>
        <div class="v">{{ advice }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const maxSteps = ref(true)
const budget = ref(false)
const confirm = ref(true)
const sandbox = ref(false)

const score = computed(() => {
  let s = 85
  if (maxSteps.value) s -= 18
  if (budget.value) s -= 15
  if (confirm.value) s -= 22
  if (sandbox.value) s -= 18
  return Math.max(0, s)
})

const scoreClass = computed(() => {
  if (score.value <= 35) return 'good'
  if (score.value <= 60) return 'mid'
  return 'bad'
})

const enabledList = computed(() => {
  const items = []
  if (maxSteps.value) items.push('最大步数')
  if (budget.value) items.push('预算上限')
  if (confirm.value) items.push('二次确认')
  if (sandbox.value) items.push('沙箱')
  return items.length ? items.join('、') : '（都没开）'
})

const advice = computed(() => {
  if (!maxSteps.value && !confirm.value)
    return '先加“最大步数”和“二次确认”，这是最低成本的安全感。'
  if (score.value <= 35)
    return '很稳了：可以开始做更复杂的任务，但记得加日志与监控。'
  if (score.value <= 60) return '还不错：建议再加预算或沙箱，避免极端情况。'
  return '风险偏高：建议优先补护栏，再让 Agent 真去执行。'
})
</script>

<style scoped>
.risk {
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
  align-items: center;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.score {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 900;
}
.score.good {
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.4);
}
.score.mid {
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.4);
}
.score.bad {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.controls {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.toggle {
  display: flex;
  gap: 8px;
  align-items: center;
}
input {
  accent-color: var(--vp-c-brand);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.k {
  font-weight: 900;
  margin-bottom: 6px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.note {
  margin-top: 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
