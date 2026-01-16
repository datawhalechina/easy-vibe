<!--
  AgentArchitectureDemo.vue
  Agent 架构“点哪看哪”：点击模块，右侧展示它负责什么 + 典型输入输出。
-->
<template>
  <div class="arch">
    <div class="header">
      <div>
        <div class="title">Agent 由哪些模块拼起来？</div>
        <div class="subtitle">点一下模块，看它“负责什么”。</div>
      </div>
    </div>

    <div class="grid">
      <div class="diagram">
        <button
          v-for="m in modules"
          :key="m.id"
          :class="['node', { active: current.id === m.id }]"
          @click="current = m"
        >
          <span class="icon">{{ m.icon }}</span>
          <span class="name">{{ m.name }}</span>
        </button>

        <div class="pipes">
          <div class="pipe">用户目标 → 计划 → 工具调用 → 结果 → 再计划…</div>
          <div class="pipe small">（记忆会贯穿整个过程）</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">{{ current.icon }} {{ current.name }}</div>
        <div class="panel-body">{{ current.desc }}</div>

        <div class="io">
          <div class="io-title">典型输入</div>
          <pre><code>{{ current.input }}</code></pre>
        </div>
        <div class="io">
          <div class="io-title">典型输出</div>
          <pre><code>{{ current.output }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modules = [
  {
    id: 'llm',
    icon: '🧠',
    name: 'LLM（大脑）',
    desc: '负责理解目标、生成计划、选择动作、组织语言输出。',
    input: '用户目标 + 当前状态 + 可用工具列表',
    output: '下一步计划 / 工具调用参数 / 最终回答'
  },
  {
    id: 'tools',
    icon: '🔧',
    name: 'Tools（手脚）',
    desc: '负责真正“做事”：搜索、读写文件、调用 API、运行命令。',
    input: 'tool_name + input_schema 参数',
    output: '工具执行结果（文本/数据/文件变更）'
  },
  {
    id: 'memory',
    icon: '💾',
    name: 'Memory（记忆）',
    desc: '把“已经做过什么、得到什么结果”存起来，避免重复与跑偏。',
    input: '对话历史 / 工具结果 / 当前任务状态',
    output: '可检索的上下文（短期/长期/工作记忆）'
  },
  {
    id: 'planner',
    icon: '🧩',
    name: 'Planning（规划）',
    desc: '把大目标拆成小步骤，并在失败时改计划（计划不是一次性的）。',
    input: '目标 + 约束（预算/时间/安全） + 当前进度',
    output: '步骤清单 / 下一步动作 / 停止条件'
  },
  {
    id: 'guard',
    icon: '🛡️',
    name: 'Guardrails（护栏）',
    desc: '限制风险：权限白名单、预算上限、敏感操作确认、沙箱执行。',
    input: '请求执行的动作 + 安全策略',
    output: '允许/拒绝/要求确认 + 审计日志'
  }
]

const current = ref(modules[0])
</script>

<style scoped>
.arch {
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

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }

.diagram {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
}

.node.active { border-color: var(--vp-c-brand); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06); }
.icon { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.name { font-weight: 800; }

.pipes { margin-top: 6px; padding-top: 10px; border-top: 1px dashed var(--vp-c-divider); }
.pipe { color: var(--vp-c-text-2); font-size: 13px; line-height: 1.5; }
.pipe.small { font-size: 12px; color: var(--vp-c-text-3); }

.panel { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.panel-title { font-weight: 800; }
.panel-body { color: var(--vp-c-text-2); line-height: 1.6; }
.io-title { font-weight: 700; margin-bottom: 6px; }
pre { margin: 0; background: #0b1221; color: #e5e7eb; border-radius: 10px; padding: 12px; font-family: var(--vp-font-family-mono); font-size: 13px; overflow-x: auto; white-space: pre-wrap; }
</style>

