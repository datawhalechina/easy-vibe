<!--
  AgentTaskFlowDemo.vue
  任务执行流：像看“回放”一样看 Agent 一步步完成一个任务。
-->
<template>
  <div class="flow">
    <div class="header">
      <div>
        <div class="title">任务回放：Agent 怎么一步步做完？</div>
        <div class="subtitle">点步骤，看“工具调用”和“中间结果”。</div>
      </div>
      <div class="actions">
        <button class="btn" @click="step = Math.max(0, step - 1)" :disabled="step === 0">上一步</button>
        <button class="btn primary" @click="step = Math.min(steps.length - 1, step + 1)" :disabled="step === steps.length - 1">下一步</button>
      </div>
    </div>

    <div class="timeline">
      <button
        v-for="(s, i) in steps"
        :key="s.title"
        :class="['t', { active: i === step }]"
        @click="step = i"
      >
        <span class="n">{{ i + 1 }}</span>
        <span class="txt">{{ s.title }}</span>
      </button>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">当前步骤</div>
        <div class="panel-body">{{ steps[step].desc }}</div>
      </div>
      <div class="panel">
        <div class="panel-title">工具调用（示意）</div>
        <pre><code>{{ steps[step].tool }}</code></pre>
      </div>
      <div class="panel">
        <div class="panel-title">结果（示意）</div>
        <pre><code>{{ steps[step].result }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(0)

const steps = [
  {
    title: '理解目标',
    desc: '把用户需求拆成“可交付”的输出结构。',
    tool: 'LLM: parse_goal({ task, constraints, output_format })',
    result: '目标：找 3 篇文章；输出：标题 + 一句话总结（Markdown 列表）'
  },
  {
    title: '搜索',
    desc: '先用搜索工具拿到候选链接。',
    tool: 'tool:web_search({ query: \"agent introduction\" })',
    result: '- link1\n- link2\n- link3\n- link4 ...'
  },
  {
    title: '读取页面',
    desc: '打开前三个链接，取出核心段落。',
    tool: 'tool:read_page({ url: link1/link2/link3 })',
    result: '每篇文章的核心段落（已截取）'
  },
  {
    title: '压缩与整理',
    desc: '把每篇文章压缩成“一句话总结”，统一格式。',
    tool: 'LLM: summarize_each({ paragraphs, max_len: 25 })',
    result: '- 标题A：一句话…\n- 标题B：一句话…\n- 标题C：一句话…'
  },
  {
    title: '自检与交付',
    desc: '检查是否满足“3 条 + 一句话 + 格式正确”，再输出。',
    tool: 'LLM: self_check({ checklist })',
    result: '✅ 满足要求；输出已就绪'
  }
]
</script>

<style scoped>
.flow {
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
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.timeline { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
.t { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 10px; display: flex; gap: 10px; align-items: center; cursor: pointer; text-align: left; }
.t.active { border-color: var(--vp-c-brand); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06); }
.n { width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); font-weight: 800; }
.txt { font-weight: 800; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
.panel { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 12px; }
.panel-title { font-weight: 700; margin-bottom: 6px; }
.panel-body { color: var(--vp-c-text-2); line-height: 1.6; }
pre { margin: 0; background: #0b1221; color: #e5e7eb; border-radius: 10px; padding: 12px; font-family: var(--vp-font-family-mono); font-size: 13px; overflow-x: auto; white-space: pre-wrap; }
</style>

