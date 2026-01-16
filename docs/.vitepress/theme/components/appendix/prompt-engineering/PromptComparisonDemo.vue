<!--
  PromptComparisonDemo.vue
  “清晰 vs 模糊”对比：把一个提示词拆成四块（任务/上下文/要求/输出），并展示哪些块缺失会导致输出跑偏。
-->
<template>
  <div class="cmp">
    <div class="header">
      <div>
        <div class="title">清晰 vs 模糊：差的不是“废话”，而是“缺项”</div>
        <div class="subtitle">勾选你想补充的信息，看看输出会怎么变。</div>
      </div>
      <div class="task">
        <select v-model="task">
          <option value="blog">写一段技术博客开头</option>
          <option value="json">把内容输出成 JSON</option>
        </select>
      </div>
    </div>

    <div class="options">
      <label><input type="checkbox" v-model="useRole" /> 角色（你是谁）</label>
      <label><input type="checkbox" v-model="useAudience" /> 受众（写给谁）</label>
      <label><input type="checkbox" v-model="useConstraints" /> 约束（长度/要点数）</label>
      <label><input type="checkbox" v-model="useFormat" /> 输出格式（JSON/列表）</label>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">你给 AI 的提示词</div>
        <pre><code>{{ prompt }}</code></pre>
        <div class="checklist">
          <div class="item" v-for="i in checklist" :key="i.text">
            <span :class="['dot', i.ok ? 'ok' : 'bad']"></span>
            <span>{{ i.text }}</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">AI 输出（示意）</div>
        <div class="output">{{ output }}</div>
        <div class="warn" v-if="warnings.length">
          <div class="warn-title">可能的问题</div>
          <ul>
            <li v-for="w in warnings" :key="w">{{ w }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const task = ref('blog')
const useRole = ref(false)
const useAudience = ref(true)
const useConstraints = ref(true)
const useFormat = ref(false)

const prompt = computed(() => {
  if (task.value === 'blog') {
    const lines = []
    if (useRole.value) lines.push('你是资深前端工程师。')
    lines.push('请写一段技术博客的开头，主题：提示词工程。')
    if (useAudience.value) lines.push('目标读者：零基础新手。')
    if (useConstraints.value) lines.push('要求：80-120 字，口语化，带一个生活类比。')
    if (useFormat.value) lines.push('输出：只输出一段文字，不要标题。')
    return lines.join('\n')
  }

  // json task
  const lines = []
  if (useRole.value) lines.push('你是信息抽取助手。')
  lines.push('从下面这段文字中提取关键信息。')
  if (useAudience.value) lines.push('用途：给产品经理快速阅读。')
  if (useConstraints.value) lines.push('要求：提取 3-5 个关键词 + 1 句摘要。')
  if (useFormat.value) {
    lines.push('输出格式（JSON）：')
    lines.push('{')
    lines.push('  "summary": "...",')
    lines.push('  "keywords": ["..."]')
    lines.push('}')
  }
  lines.push('输入：')
  lines.push('“提示词工程能显著提升模型输出质量，但需要清晰任务、约束和格式。”')
  return lines.join('\n')
})

const checklist = computed(() => [
  { text: '任务清晰（要做什么）', ok: true },
  { text: '角色（用什么口吻）', ok: useRole.value },
  { text: '受众/用途（给谁用）', ok: useAudience.value },
  { text: '约束（长度/数量/范围）', ok: useConstraints.value },
  { text: '输出格式（如何交付）', ok: useFormat.value }
])

const warnings = computed(() => {
  const w = []
  if (!useAudience.value) w.push('语气可能过专业或太泛')
  if (!useConstraints.value) w.push('长度/结构可能不稳定')
  if (task.value === 'json' && !useFormat.value) w.push('可能输出成一大段话，不是 JSON')
  if (task.value === 'blog' && !useFormat.value) w.push('可能加标题/分段，超出预期')
  return w
})

const output = computed(() => {
  if (task.value === 'blog') {
    if (warnings.value.length >= 2) {
      return '提示词工程是一种与 AI 沟通的方法，它可以帮助你获得更好的输出......（可能偏长/风格不稳）'
    }
    return '把 AI 当成新来的同事：你说得越清楚，它越不容易跑偏。提示词工程就是把“要做什么、给谁、怎么交付”一次说明白。'
  }

  // json
  if (!useFormat.value) {
    return '这段文字主要讲提示词工程的重要性，并强调需要清晰任务、约束和格式……（但不是 JSON）'
  }
  return `{\n  \"summary\": \"提示词工程能提升输出质量，关键在于清晰任务、约束与格式。\",\n  \"keywords\": [\"提示词工程\", \"任务清晰\", \"约束\", \"格式\"]\n}`
})
</script>

<style scoped>
.cmp {
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

.title { font-weight: 800; }
.subtitle { color: var(--vp-c-text-2); font-size: 13px; }

select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
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

.panel-title { font-weight: 700; }
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

.checklist { display: grid; gap: 6px; }
.item { display: flex; gap: 8px; align-items: center; color: var(--vp-c-text-2); font-size: 13px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.ok { background: #22c55e; }
.dot.bad { background: #ef4444; }

.output { white-space: pre-wrap; line-height: 1.6; }
.warn { border-top: 1px dashed var(--vp-c-divider); padding-top: 10px; }
.warn-title { font-weight: 700; margin-bottom: 6px; }
ul { margin: 0; padding-left: 18px; color: var(--vp-c-text-2); }
</style>

