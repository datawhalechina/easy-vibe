<template>
  <div class="prompt-templates-demo">
    <div class="header">
      <div class="title">
        <div class="h">常见场景模板（标签切换，可直接复制）</div>
        <div class="sub">选一个场景 → 复制 → 把占位符替换成你的内容。</div>
      </div>
      <div class="actions">
        <input
          v-model="q"
          class="search"
          placeholder="搜索模板（如：会议 / debug / 翻译）"
        />
        <button class="btn" @click="copy(active.template)" :disabled="!active">
          {{ copied ? '已复制' : '复制模板' }}
        </button>
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="t in filtered"
        :key="t.id"
        class="tab"
        :class="{ active: activeId === t.id }"
        @click="select(t.id)"
      >
        {{ t.title }}
        <span class="tag">{{ t.category }}</span>
      </button>
      <div v-if="filtered.length === 0" class="empty">
        没搜到匹配模板：{{ q }}
      </div>
    </div>

    <div v-if="active" class="content">
      <div class="meta">
        <div class="desc">{{ active.desc }}</div>
        <div v-if="active.note" class="note">{{ active.note }}</div>
      </div>

      <pre class="code"><code>{{ active.template }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const q = ref('')
const copied = ref(false)

const templates = [
  {
    id: 'summary-boss',
    category: '总结',
    title: '总结给老板',
    desc: '适合把长文压缩成“结论 + 要点 + 下一步”。',
    template: `任务：把下面文本总结给“忙碌的老板”。\n要求：\n- 3 个要点\n- 1 句结论\n- 1 个下一步建议\n输出：Markdown\n文本：\n\`\`\`text\n[粘贴原文]\n\`\`\`\n`
  },
  {
    id: 'extract-json',
    category: '抽取',
    title: '抽取成 JSON',
    desc: '适合把非结构化文本转成可直接给程序用的数据。',
    template: `任务：从文本中抽取信息。\n输出：只输出 JSON（不要解释）。\nJSON 结构：\n\`\`\`json\n{\n  \"title\": \"\",\n  \"date\": \"\",\n  \"people\": [],\n  \"actions\": []\n}\n\`\`\`\n文本：\n\`\`\`text\n[粘贴原文]\n\`\`\`\n`
  },
  {
    id: 'rewrite-clear',
    category: '改写',
    title: '润色改写',
    desc: '适合把口语/混乱的内容变得更清晰、更像“正式输出”。',
    template: `任务：把下面文字改写得更清晰、更有条理，但不要改变事实含义。\n要求：\n- 保留关键信息与数字\n- 语气：专业但不生硬\n- 每段不超过 2 句\n输出：Markdown\n原文：\n\`\`\`text\n[粘贴原文]\n\`\`\`\n`
  },
  {
    id: 'translate-deliver',
    category: '翻译',
    title: '翻译可交付',
    desc: '适合跨语言交付，强调术语一致与结构保留。',
    template: `任务：把下面内容翻译成英文（或你指定的语言）。\n要求：\n- 术语保持一致（不确定就给 2 个备选译法并说明差异）\n- 保留标题层级与列表结构\n输出：Markdown\n原文：\n\`\`\`text\n[粘贴原文]\n\`\`\`\n`
  },
  {
    id: 'brainstorm-12',
    category: '脑暴',
    title: '12 个不同想法',
    desc: '适合需要“多样性”，而不是唯一正确答案。',
    template: `任务：为下面的问题给出 12 个不同方向的想法。\n要求：\n- 每条 <= 20 字\n- 覆盖不同角度（用户/技术/商业/运营/风险）\n输出：Markdown 列表\n问题：\n\`\`\`text\n[描述你的问题/目标/限制条件]\n\`\`\`\n`
  },
  {
    id: 'design-solution',
    category: '方案',
    title: '方案设计（先澄清）',
    desc: '适合复杂问题：先补信息，再给架构与任务拆分。',
    template: `你是资深架构师。\n任务：为下面需求给出一个可落地的技术方案。\n要求：\n1) 先列 5 个澄清问题（缺信息就问）\n2) 再给方案（架构图用文字描述也行）\n3) 列出关键权衡（至少 3 条）\n4) 给一份 1-2 周可执行的任务拆分（按天/按模块）\n输出：Markdown\n需求：\n\`\`\`text\n[粘贴需求]\n\`\`\`\n`
  },
  {
    id: 'meeting-minutes',
    category: '会议',
    title: '会议纪要（行动化）',
    desc: '适合把“记录”整理成能执行的清单。',
    template: `任务：把下面会议记录整理成可执行的纪要。\n要求：\n- 结论（1-3 条）\n- 决策（谁决定了什么）\n- Action Items（负责人 / 截止时间 / 交付物）\n- 风险与待确认项\n输出：Markdown\n会议记录：\n\`\`\`text\n[粘贴原文]\n\`\`\`\n`
  },
  {
    id: 'support-reply',
    category: '沟通',
    title: '客服回复',
    desc: '适合稳定语气 + 降低误解 + 引导用户补信息。',
    template: `你是专业客服/技术支持。\n任务：给用户回复下面这条消息。\n要求：\n- 先共情一句（不要道歉过度）\n- 用 3 步指导用户排查（每步 1 句）\n- 如需更多信息，列出你需要用户提供的 3 个信息\n- 语气：友好、清晰、少术语\n输出：Markdown\n用户消息：\n\`\`\`text\n[粘贴原文]\n\`\`\`\n`
  },
  {
    id: 'debug-fix',
    category: 'Debug',
    title: '定位并修复',
    desc: '适合线上/本地问题：先按概率列原因，再给验证与最终修复。',
    template: `你是资深工程师。\n任务：根据下面信息定位问题并给出修复方案。\n要求：\n1) 先列最可能的 3 个原因（按概率排序）\n2) 每个原因给一个最小验证步骤\n3) 给出最终修复（包含代码片段/配置）\n输出：Markdown\n上下文：\n\`\`\`text\n[项目/环境/版本信息]\n\`\`\`\n报错与日志：\n\`\`\`text\n[粘贴错误信息/日志]\n\`\`\`\n相关代码：\n\`\`\`text\n[粘贴代码]\n\`\`\`\n`
  },
  {
    id: 'table-track',
    category: '结构化',
    title: '整理成表格追踪',
    desc: '适合把大段内容变成可执行/可追踪事项。',
    template: `任务：把下面内容整理成表格，方便执行与追踪。\n要求：\n- 输出一个 Markdown 表格\n- 列：事项 / 负责人 / 截止时间 / 当前状态 / 备注\n- 如无负责人/截止时间，用“待定”\n原文：\n\`\`\`text\n[粘贴原文]\n\`\`\`\n`
  },
  {
    id: 'self-check',
    category: '验收',
    title: '自检清单',
    desc: '适合让输出“可验收”：最后强制自检，减少跑偏。',
    template: `任务：完成下面任务，并在最后做自检。\n要求：\n- 输出最后加一段“自检清单”：逐条回答是否满足（是/否/不适用）\n- 如果不满足，说明原因并给出改进版本\n任务：\n\`\`\`text\n[描述你的任务]\n\`\`\`\n约束（可选）：\n\`\`\`text\n[长度/格式/必须包含/必须避免]\n\`\`\`\n`
  },
  {
    id: 'code-review',
    category: '工程',
    title: '代码审查（先清单）',
    desc: '适合做结构化 Review：先给检查清单，再提问题与修复片段。',
    template: `你是资深工程师。\n任务：审查下面代码。\n要求：\n1) 先列检查清单（3-5条）\n2) 再列问题（现象/原因/修复）\n3) 最后给修复片段\n代码：\n\`\`\`text\n[粘贴代码]\n\`\`\`\n`
  }
]

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return templates
  return templates.filter((t) => {
    const hay = `${t.category} ${t.title} ${t.desc}`.toLowerCase()
    return hay.includes(s)
  })
})

const activeId = ref(templates[0].id)
const active = computed(
  () => templates.find((t) => t.id === activeId.value) || templates[0]
)

const select = (id) => {
  activeId.value = id
  copied.value = false
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 800)
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.prompt-templates-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.title .h {
  font-weight: 800;
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.title .sub {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.search {
  min-width: 220px;
  padding: 0.45rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.btn {
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 1rem;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.tab.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.empty {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  padding: 0.5rem 0.25rem;
}

.meta {
  margin-bottom: 0.75rem;
}

.desc {
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.note {
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.code {
  margin: 0;
  padding: 0.75rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

@media (max-width: 720px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  .actions {
    justify-content: flex-start;
  }
  .search {
    min-width: 0;
    width: 100%;
  }
}
</style>
