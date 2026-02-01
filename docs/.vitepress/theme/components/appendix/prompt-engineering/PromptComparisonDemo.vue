<!--
  PromptComparisonDemo.vue
  “清晰 vs 模糊”对比：把一个提示词拆成四块（任务/上下文/要求/输出），并展示哪些块缺失会导致输出跑偏。
-->
<template>
  <el-card class="cmp-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">清晰 vs 模糊：差的不是“废话”，而是“缺项”</h3>
          <p class="subtitle">勾选你想补充的信息，看看输出会怎么变。</p>
        </div>
        <div class="task-select">
          <el-select v-model="task" placeholder="选择任务" style="width: 200px">
            <el-option label="写一段技术博客开头" value="blog" />
            <el-option label="把内容输出成 JSON" value="json" />
          </el-select>
        </div>
      </div>
    </template>

    <div class="options-container">
      <el-checkbox v-model="useRole" label="角色（你是谁）" border />
      <el-checkbox v-model="useAudience" label="受众（写给谁）" border />
      <el-checkbox
        v-model="useConstraints"
        label="约束（长度/要点数）"
        border
      />
      <el-checkbox v-model="useFormat" label="输出格式（JSON/列表）" border />
    </div>

    <div class="grid-layout">
      <el-card shadow="never" class="panel input-panel">
        <template #header>
          <div class="panel-header">你给 AI 的提示词</div>
        </template>
        <div class="code-block">
          <pre><code>{{ prompt }}</code></pre>
        </div>
        <div class="checklist">
          <div class="check-item" v-for="i in checklist" :key="i.text">
            <el-tag
              :type="i.ok ? 'success' : 'danger'"
              size="small"
              effect="dark"
              style="margin-right: 8px; min-width: 60px; text-align: center;"
            >
              {{ i.ok ? 'OK' : 'MISSING' }}
            </el-tag>
            <span>{{ i.text }}</span>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="panel output-panel">
        <template #header>
          <div class="panel-header">AI 输出（示意）</div>
        </template>
        <div class="output-content">{{ output }}</div>

        <div v-if="warnings.length" class="warnings-section">
          <el-alert
            v-for="w in warnings"
            :key="w"
            :title="w"
            type="warning"
            show-icon
            :closable="false"
            style="margin-top: 8px"
          />
        </div>
        <el-empty v-else description="完美！没有明显问题。" :image-size="60" />
      </el-card>
    </div>
  </el-card>
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
    if (useConstraints.value)
      lines.push('要求：80-120 字，口语化，带一个生活类比。')
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
  { text: '角色定义（你是谁）', ok: useRole.value },
  { text: '上下文/受众（给谁看）', ok: useAudience.value },
  { text: '具体约束（怎么做）', ok: useConstraints.value },
  { text: '格式要求（输出长啥样）', ok: useFormat.value }
])

const output = computed(() => {
  if (task.value === 'blog') {
    if (!useConstraints.value && !useAudience.value) {
      return '提示词工程（Prompt Engineering）是指通过优化输入给大语言模型的文本提示，来引导模型生成更准确、高质量输出的技术。它涉及到理解模型的工作原理、设计有效的指令结构以及不断迭代测试。'
    }
    if (useAudience.value && !useConstraints.value) {
      return '嘿，大家好！今天咱们来聊聊“提示词工程”。简单说，它就像是教你怎么跟超级聪明的机器人说话。只要你说得对，它就能帮你干大事！'
    }
    return '嘿，朋友们！听说过“提示词工程”吗？其实它就像是在点外卖——你得告诉厨师（AI）你要微辣还是特辣（约束），是给小孩吃还是大人吃（受众）。说得越清楚，送来的饭（回答）才越合你胃口！今天咱们就来学学怎么“点菜”。'
  }

  // json
  if (!useFormat.value) {
    return '这段文字主要讲了提示词工程的作用，以及它需要的三个要素：清晰任务、约束和格式。关键词包括提示词工程、模型输出质量等。'
  }
  return `{
  "summary": "提示词工程通过明确任务、约束及格式提升模型输出。",
  "keywords": ["提示词工程", "输出质量", "清晰任务", "约束", "格式"]
}`
})

const warnings = computed(() => {
  const w = []
  if (!useRole.value) w.push('缺少角色设定，AI 语气可能不够专业或统一。')
  if (!useAudience.value)
    w.push('未指定受众，AI 可能不知道该用深奥术语还是大白话。')
  if (!useConstraints.value) w.push('没给约束，AI 容易啰嗦或者写太短。')
  if (!useFormat.value) w.push('没规定格式，后续程序很难自动解析结果。')
  return w
})
</script>

<style scoped>
.cmp-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.panel-header {
  font-weight: 600;
  font-size: 15px;
}

.code-block {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: var(--vp-font-family-mono);
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
}

.output-content {
  background-color: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 80px;
}

.warnings-section {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .task-select {
    width: 100%;
  }

  .task-select .el-select {
    width: 100% !important;
  }
}
</style>
