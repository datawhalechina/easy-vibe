<template>
  <div class="flow-demo">
    <div class="header">
      <div class="title">AI 应用请求处理流程</div>
      <div class="subtitle">点击"发送请求"，观察一次 AI 请求的完整生命周期</div>
    </div>

    <div class="pipeline">
      <div
        v-for="(step, idx) in steps"
        :key="step.id"
        :class="['pipe-step', {
          active: currentStep === idx,
          done: currentStep > idx
        }]"
      >
        <div class="step-icon">{{ currentStep > idx ? '✅' : step.icon }}</div>
        <div class="step-info">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-en">{{ step.en }}</div>
        </div>
        <div v-if="idx < steps.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="control-bar">
      <button
        v-if="!isRunning && currentStep < 0"
        class="action-btn"
        @click="startFlow"
      >
        ▶ 发送请求
      </button>
      <button
        v-else-if="!isRunning && currentStep >= steps.length"
        class="action-btn reset"
        @click="resetFlow"
      >
        🔄 重置
      </button>
      <div v-else-if="isRunning" class="running-hint">
        ⏳ 处理中...
      </div>
    </div>

    <div v-if="currentStep >= 0" class="detail-area">
      <div class="detail-card">
        <div class="detail-title">
          {{ activeStep.icon }} {{ activeStep.name }}
        </div>
        <div class="detail-desc">{{ activeStep.detail }}</div>

        <div class="io-section">
          <div class="io-block">
            <div class="io-label">输入</div>
            <pre class="io-code"><code>{{ activeStep.input }}</code></pre>
          </div>
          <div class="io-block">
            <div class="io-label">输出</div>
            <pre class="io-code"><code>{{ activeStep.output }}</code></pre>
          </div>
        </div>

        <div class="latency-bar">
          <span class="latency-label">耗时</span>
          <div class="latency-track">
            <div
              class="latency-fill"
              :style="{ width: activeStep.latencyPct + '%' }"
            />
          </div>
          <span class="latency-val">{{ activeStep.latency }}</span>
        </div>
      </div>
    </div>

    <div class="insight-bar">
      <span class="insight-label">💡 关键洞察：</span>
      <span class="insight-text">
        AI 应用的请求链路比传统应用更长，模型推理通常占总耗时的 60-80%。
        优化重点在于：Prompt 缓存、流式输出、异步处理。
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const steps = [
  {
    id: 'input', icon: '👤', name: '用户输入', en: 'User Input',
    detail: '用户通过自然语言输入请求。系统需要处理多种输入形式：文本、语音转文字、图片描述等。与传统应用的表单提交不同，输入是开放式的、非结构化的。',
    input: '"帮我总结这篇文章的核心观点"',
    output: '{ text: "帮我总结...", type: "text", lang: "zh" }',
    latency: '~0ms', latencyPct: 2
  },
  {
    id: 'preprocess', icon: '🔧', name: '预处理', en: 'Preprocessing',
    detail: '对用户输入进行清洗和增强：意图识别、关键词提取、上下文拼接、RAG 检索相关文档片段、构建完整的 Prompt。这一步决定了模型能获得多少有效信息。',
    input: '{ text: "帮我总结...", context: [...历史对话] }',
    output: '{ system_prompt: "你是...", user_prompt: "...", retrieved_docs: [...] }',
    latency: '~200ms', latencyPct: 15
  },
  {
    id: 'model', icon: '🧠', name: '模型推理', en: 'Model Inference',
    detail: '将构建好的 Prompt 发送给大语言模型进行推理。这是整个链路中耗时最长的环节。模型会根据 Prompt 中的指令、上下文和检索到的知识，生成回答。',
    input: '{ messages: [...], model: "gpt-4", temperature: 0.7 }',
    output: '{ content: "这篇文章的核心观点有三个...", tokens: 256 }',
    latency: '~2-8s', latencyPct: 75
  },
  {
    id: 'postprocess', icon: '🛡️', name: '后处理', en: 'Post-processing',
    detail: '对模型输出进行安全检查和格式化：内容审核过滤、幻觉检测、格式转换（Markdown 渲染）、引用来源标注、敏感信息脱敏等。',
    input: '{ raw_output: "这篇文章的核心观点有三个..." }',
    output: '{ safe: true, formatted: "## 核心观点\\n1. ...", sources: [...] }',
    latency: '~100ms', latencyPct: 8
  },
  {
    id: 'response', icon: '💬', name: '响应输出', en: 'Response',
    detail: '将处理后的结果以流式方式返回给用户。前端逐步渲染 Markdown 内容，同时展示引用来源和置信度。用户可以在生成过程中随时中断或追问。',
    input: '{ formatted: "## 核心观点\\n1. ...", stream: true }',
    output: '用户看到逐字出现的回答 + 来源引用',
    latency: '~50ms (首字节)', latencyPct: 5
  }
]

const currentStep = ref(-1)
const isRunning = ref(false)

const activeStep = computed(() => {
  const idx = Math.min(currentStep.value, steps.length - 1)
  return idx >= 0 ? steps[idx] : steps[0]
})

const startFlow = async () => {
  isRunning.value = true
  for (let i = 0; i < steps.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 1200))
  }
  currentStep.value = steps.length
  isRunning.value = false
}

const resetFlow = () => {
  currentStep.value = -1
  isRunning.value = false
}
</script>

<style scoped>
.flow-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #10b981, #3b82f6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.pipeline {
  display: flex; align-items: center; justify-content: center;
  gap: 4px; flex-wrap: wrap; margin-bottom: 16px;
}
.pipe-step {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); transition: all 0.3s;
  font-size: 12px;
}
.pipe-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.pipe-step.done {
  border-color: #86efac; background: #f0fdf4;
}
.step-icon { font-size: 18px; }
.step-name { font-weight: 600; font-size: 12px; }
.step-en { font-size: 10px; color: var(--vp-c-text-3); }
.arrow { color: var(--vp-c-text-3); font-size: 14px; margin: 0 2px; }

.control-bar { text-align: center; margin-bottom: 16px; }
.action-btn {
  padding: 10px 28px; background: var(--vp-c-brand);
  color: white; border: none; border-radius: 8px;
  font-size: 13px; cursor: pointer; transition: background 0.2s;
}
.action-btn:hover { background: var(--vp-c-brand-dark); }
.action-btn.reset { background: #6b7280; }
.action-btn.reset:hover { background: #4b5563; }
.running-hint { color: var(--vp-c-brand); font-size: 13px; }

.detail-area { margin-bottom: 16px; }
.detail-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.detail-title { font-weight: 700; font-size: 15px; margin-bottom: 8px; }
.detail-desc {
  color: var(--vp-c-text-2); font-size: 13px;
  line-height: 1.7; margin-bottom: 12px;
}

.io-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px; margin-bottom: 12px;
}
.io-label { font-weight: 600; font-size: 11px; margin-bottom: 4px; color: var(--vp-c-text-2); }
.io-code {
  margin: 0; background: #0b1221; color: #e5e7eb;
  border-radius: 8px; padding: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px; overflow-x: auto; white-space: pre-wrap;
}

.latency-bar {
  display: flex; align-items: center; gap: 10px;
}
.latency-label { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
.latency-track {
  flex: 1; height: 8px; background: var(--vp-c-bg-soft);
  border-radius: 4px; overflow: hidden;
}
.latency-fill {
  height: 100%; border-radius: 4px;
  background: var(--vp-c-brand); transition: width 0.5s;
}
.latency-val { font-size: 11px; font-weight: 600; min-width: 80px; text-align: right; }

.insight-bar {
  padding: 12px 16px; background: var(--vp-c-brand-soft);
  border-radius: 6px; font-size: 13px;
}
.insight-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.insight-text { color: var(--vp-c-text-1); }
</style>
