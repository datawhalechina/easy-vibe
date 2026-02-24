<!--
  RAGPipelineDemo.vue
  RAG 完整流程可视化演示

  用途：
  展示 RAG 的核心流程：用户提问 → 检索 → 上下文组装 → LLM 生成 → 返回结果
  用户可以逐步点击，观察每个阶段的数据流动。

  交互功能：
  - 点击"下一步"逐步推进流程
  - 每个阶段高亮并展示说明
  - 可选择不同的示例问题
-->
<template>
  <div class="rag-pipeline-demo">
    <div class="query-selector">
      <span class="label">选择问题：</span>
      <button
        v-for="(q, i) in queries"
        :key="i"
        :class="['query-btn', { active: currentQuery === i }]"
        @click="selectQuery(i)"
      >
        {{ q.short }}
      </button>
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="i"
        :class="['stage', { active: currentStep >= i, current: currentStep === i }]"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div
          v-if="currentStep >= i"
          class="stage-content"
        >
          {{ getStageContent(i) }}
        </div>
        <div
          v-if="i < stages.length - 1"
          :class="['arrow', { active: currentStep > i }]"
        >
          →
        </div>
      </div>
    </div>

    <div class="detail-panel">
      <div class="detail-title">{{ stages[currentStep]?.name }} — 详细说明</div>
      <div class="detail-desc">{{ stages[currentStep]?.desc }}</div>
      <div
        v-if="currentStep >= 1 && currentStep <= 2"
        class="retrieved-docs"
      >
        <div class="doc-title">检索到的文档片段：</div>
        <div
          v-for="(doc, i) in queries[currentQuery].docs"
          :key="i"
          :class="['doc-item', { visible: currentStep >= 2 }]"
        >
          <span class="doc-score">相关度 {{ doc.score }}</span>
          <span class="doc-text">{{ doc.text }}</span>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        class="ctrl-btn"
        :disabled="currentStep <= 0"
        @click="prevStep"
      >
        ← 上一步
      </button>
      <span class="step-indicator">{{ currentStep + 1 }} / {{ stages.length }}</span>
      <button
        class="ctrl-btn primary"
        :disabled="currentStep >= stages.length - 1"
        @click="nextStep"
      >
        下一步 →
      </button>
      <button
        class="ctrl-btn"
        @click="reset"
      >
        重置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stages = [
  {
    name: '用户提问',
    icon: '💬',
    desc: '用户向系统提出一个自然语言问题。这个问题会被转化为向量表示，用于后续的语义检索。'
  },
  {
    name: '语义检索',
    icon: '🔍',
    desc: '系统将问题编码为向量，在向量数据库中搜索语义最相近的文档片段。通常使用余弦相似度或点积来衡量相关性。'
  },
  {
    name: '上下文组装',
    icon: '📋',
    desc: '将检索到的 Top-K 文档片段与原始问题拼接，构造成一个完整的 Prompt。这个 Prompt 会告诉 LLM："请根据以下参考资料回答问题"。'
  },
  {
    name: 'LLM 生成',
    icon: '🤖',
    desc: '大语言模型接收组装好的 Prompt，基于检索到的上下文信息生成回答。因为有了真实的参考资料，模型的回答更加准确、可靠。'
  },
  {
    name: '返回结果',
    icon: '✅',
    desc: '系统将 LLM 生成的回答返回给用户。高级系统还会附带引用来源，方便用户验证答案的可靠性。'
  }
]

const queries = [
  {
    short: '公司年假政策',
    question: '我们公司的年假政策是什么？',
    docs: [
      { score: '0.95', text: '员工入职满一年后享有 10 天带薪年假，满五年后增至 15 天。' },
      { score: '0.87', text: '年假需提前 3 个工作日申请，经直属主管审批后生效。' },
      { score: '0.72', text: '未使用的年假可结转至次年第一季度，逾期作废。' }
    ],
    answer: '根据公司规定，入职满一年享有 10 天带薪年假，满五年增至 15 天。需提前 3 个工作日申请并经主管审批，未用年假可结转至次年 Q1。'
  },
  {
    short: 'API 限流规则',
    question: '我们的 API 限流规则是怎样的？',
    docs: [
      { score: '0.93', text: '免费用户每分钟限 60 次请求，付费用户限 600 次。' },
      { score: '0.85', text: '超出限流后返回 HTTP 429 状态码，需等待 60 秒后重试。' },
      { score: '0.68', text: '企业版用户可申请自定义限流配额，最高支持每分钟 10000 次。' }
    ],
    answer: '免费用户每分钟限 60 次请求，付费用户 600 次。超限返回 429 状态码，需等 60 秒。企业版可申请最高 10000 次/分钟的自定义配额。'
  }
]

const currentQuery = ref(0)
const currentStep = ref(0)

function selectQuery(i) {
  currentQuery.value = i
  currentStep.value = 0
}

function getStageContent(i) {
  const q = queries[currentQuery.value]
  if (i === 0) return q.question
  if (i === 1) return `找到 ${q.docs.length} 个相关片段`
  if (i === 2) return '问题 + 参考资料 → Prompt'
  if (i === 3) return '基于上下文生成回答...'
  if (i === 4) return q.answer
  return ''
}

function nextStep() {
  if (currentStep.value < stages.length - 1) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}
function reset() {
  currentStep.value = 0
}
</script>

<style scoped>
.rag-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.query-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.query-selector .label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.query-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.query-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.pipeline {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  overflow-x: auto;
  padding: 12px 0;
}
.stage {
  flex: 1;
  min-width: 100px;
  text-align: center;
  padding: 12px 8px;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  opacity: 0.5;
  transition: all 0.3s;
  position: relative;
}
.stage.active {
  opacity: 1;
}
.stage.current {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1-rgb, 100, 108, 255), 0.15);
}
.stage-icon {
  font-size: 24px;
  margin-bottom: 4px;
}
.stage-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.stage-content {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 6px;
  line-height: 1.4;
}
.arrow {
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: var(--vp-c-divider);
  z-index: 1;
  transition: color 0.3s;
}
.arrow.active {
  color: var(--vp-c-brand-1);
}
.detail-panel {
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--vp-c-brand-1);
}
.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.retrieved-docs {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
}
.doc-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}
.doc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  margin-bottom: 4px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}
.doc-item.visible {
  opacity: 1;
}
.doc-score {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
}
.doc-text {
  color: var(--vp-c-text-2);
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.ctrl-btn {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.ctrl-btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.step-indicator {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
