<!--
  ChainOfThoughtDemo.vue
  “先计划再输出”演示（更易懂版本）。

  注意：这里不强调让模型展示冗长推理，而是用“先列计划/检查点”来降低跑偏概率。
-->
<template>
  <div class="cot">
    <div class="header">
      <div>
        <div class="title">复杂任务：先“列计划”，再“交付结果”</div>
        <div class="subtitle">你要的是：不漏步骤 + 可检查 + 不跑题。</div>
      </div>
      <div class="controls">
        <select v-model="task">
          <option value="debug">代码审查</option>
          <option value="plan">行程规划</option>
        </select>
        <button
          v-for="m in modes"
          :key="m.id"
          :class="['mode', { active: mode === m.id }]"
          @click="mode = m.id"
        >
          {{ m.label }}
        </button>
      </div>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">提示词 / Prompt</div>
        <pre><code>{{ prompt }}</code></pre>
      </div>
      <div class="panel">
        <div class="panel-title">输出（示意）</div>
        <div class="output">{{ output }}</div>
      </div>
    </div>

    <div class="why">
      <div class="why-title">为什么这样更稳？</div>
      <div class="why-grid">
        <div class="why-card">
          <div class="k">✅ 不漏步骤</div>
          <div class="v">计划就是清单，能一项项对照。</div>
        </div>
        <div class="why-card">
          <div class="k">✅ 更好验收</div>
          <div class="v">你知道该检查什么，而不是只看“像不像”。</div>
        </div>
        <div class="why-card">
          <div class="k">✅ 更少返工</div>
          <div class="v">先对齐方向，再生成结果，减少来回修。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const task = ref('debug')
const mode = ref('plan-first')

const modes = [
  { id: 'direct', label: '直接输出' },
  { id: 'plan-first', label: '先列计划再输出' }
]

const prompt = computed(() => {
  if (task.value === 'debug') {
    if (mode.value === 'direct') {
      return '帮我看看这段代码有什么问题，并给修复建议。'
    }
    return `你是资深前端工程师。\n任务：代码审查。\n要求：\n1) 先列“检查清单”（3-5 项），说明你将检查什么\n2) 再输出问题列表（每条包含：现象/原因/修复）\n3) 最后给一段修复后的代码（仅关键片段）`
  }
  // plan
  if (mode.value === 'direct') return '帮我做一个上海三日游行程，越详细越好。'
  return `你是旅行规划师。\n任务：上海三日游。\n要求：\n1) 先列“规划原则”（交通/节奏/预算）\n2) 再给 Day1-Day3 行程（每段 3-5 个地点）\n3) 每天最后给一句“备选方案”\n输出：Markdown`
})

const output = computed(() => {
  if (task.value === 'debug') {
    if (mode.value === 'direct') {
      return '代码可能有一些问题，比如命名不规范、性能不佳……（容易泛泛而谈/漏点）'
    }
    return `检查清单：\n- 边界条件（空值/类型）\n- 异步/错误处理\n- 性能（重复计算/循环）\n- 可读性（命名/拆分）\n\n问题列表：\n1) 现象：…\n   原因：…\n   修复：…\n2) 现象：…\n   原因：…\n   修复：…\n\n修复片段：\n// ...关键修改代码...`
  }
  if (mode.value === 'direct') {
    return 'Day1：外滩…Day2：迪士尼…Day3：田子坊…（可能太散/不成体系）'
  }
  return `规划原则：\n- 交通：地铁优先\n- 节奏：上午景点，下午咖啡/逛街\n- 预算：人均 300-500/天\n\nDay1：外滩 → 南京路 → 人民广场\n备选：雨天去博物馆\n\nDay2：豫园 → 城隍庙 → 新天地\n备选：改为室内商场+展览\n\nDay3：武康路 → 安福路 → 徐汇滨江\n备选：去书店/美术馆`
})
</script>

<style scoped>
.cot {
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

.controls {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.mode {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.mode.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.panel-title {
  font-weight: 700;
}
pre {
  margin: 0;
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  overflow-x: auto;
  white-space: pre-wrap;
}
.output {
  white-space: pre-wrap;
  line-height: 1.6;
}

.why {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}
.why-title {
  font-weight: 700;
  margin-bottom: 8px;
}
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.why-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
}
.k {
  font-weight: 800;
}
.v {
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin-top: 4px;
  line-height: 1.5;
}
</style>
