<!--
  EmbeddingPipelineDemo.vue
  嵌入生成流水线演示组件

  用途：
  展示从原始文本到向量存储的完整嵌入流水线：
  Text → Tokenize → Model → Vector → Store → Query

  交互功能：
  - 输入自定义文本
  - 逐步执行流水线
  - 每一步展示中间结果
-->
<template>
  <div class="pipeline-demo">
    <div class="demo-header">
      <h4>嵌入生成流水线</h4>
      <p class="desc">逐步体验从文本到向量的完整转换过程</p>
    </div>

    <div class="input-area">
      <label>输入文本</label>
      <input
        v-model="inputText"
        type="text"
        placeholder="输入一段文本，观察嵌入生成过程..."
        class="text-input"
      />
      <button class="run-btn" @click="runPipeline">
        {{ running ? '处理中...' : '开始处理' }}
      </button>
    </div>

    <!-- 流水线步骤 -->
    <div class="pipeline-steps">
      <div
        v-for="(step, idx) in steps"
        :key="step.key"
        class="step"
        :class="{
          active: currentStep >= idx,
          current: currentStep === idx && running
        }"
      >
        <div class="step-header">
          <div class="step-num" :style="{ background: currentStep >= idx ? step.color : '' }">
            {{ idx + 1 }}
          </div>
          <div class="step-title">{{ step.title }}</div>
          <div v-if="currentStep > idx" class="step-check">&#x2713;</div>
        </div>

        <div v-if="currentStep >= idx" class="step-content">
          <div class="step-desc">{{ step.desc }}</div>
          <div class="step-output" v-if="stepOutputs[step.key]">
            <code>{{ stepOutputs[step.key] }}</code>
          </div>
        </div>

        <!-- 箭头连接 -->
        <div v-if="idx < steps.length - 1" class="step-arrow">
          <span :class="{ visible: currentStep > idx }">&#x2193;</span>
        </div>
      </div>
    </div>

    <!-- 最终结果 -->
    <div v-if="currentStep >= steps.length - 1 && !running" class="final-result">
      <div class="result-title">嵌入向量已生成</div>
      <div class="vector-viz">
        <div
          v-for="(val, i) in finalVector"
          :key="i"
          class="vec-bar"
          :style="{
            height: Math.abs(val) * 60 + 'px',
            background: val >= 0 ? '#3b82f6' : '#ef4444',
            opacity: 0.4 + Math.abs(val) * 0.6
          }"
        >
          <span class="vec-val">{{ val.toFixed(2) }}</span>
        </div>
      </div>
      <p class="vec-note">
        实际嵌入向量通常有 768~1536 个维度，这里仅展示前 16 维的模拟值
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const inputText = ref('今天天气真不错，适合出去散步')
const currentStep = ref(-1)
const running = ref(false)
const stepOutputs = reactive({})
const finalVector = ref([])

const steps = [
  {
    key: 'tokenize',
    title: '分词 (Tokenize)',
    desc: '将文本拆分为模型可处理的 Token 序列',
    color: '#3b82f6'
  },
  {
    key: 'encode',
    title: '编码 (Encode)',
    desc: '将 Token 映射为数字 ID',
    color: '#8b5cf6'
  },
  {
    key: 'model',
    title: '模型推理 (Model)',
    desc: '通过 Transformer 模型生成上下文感知的向量表示',
    color: '#10b981'
  },
  {
    key: 'pool',
    title: '池化 (Pooling)',
    desc: '将多个 Token 向量聚合为单一句子向量',
    color: '#f59e0b'
  },
  {
    key: 'normalize',
    title: '归一化 (Normalize)',
    desc: '将向量缩放到单位长度，便于余弦相似度计算',
    color: '#ef4444'
  }
]

function simulateTokenize(text) {
  const tokens = []
  const zhRegex = /[\u4e00-\u9fa5]/g
  const enRegex = /[a-zA-Z]+/g
  let i = 0
  while (i < text.length) {
    if (/[\u4e00-\u9fa5]/.test(text[i])) {
      tokens.push(text[i])
      i++
    } else if (/[a-zA-Z]/.test(text[i])) {
      let word = ''
      while (i < text.length && /[a-zA-Z]/.test(text[i])) {
        word += text[i]
        i++
      }
      tokens.push(word)
    } else if (/\s/.test(text[i])) {
      i++
    } else {
      tokens.push(text[i])
      i++
    }
  }
  return tokens
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

function generateVector(text, dim = 16) {
  const vec = []
  for (let i = 0; i < dim; i++) {
    const seed = hashCode(text + i)
    vec.push(((seed % 2000) - 1000) / 1000)
  }
  // 归一化
  const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0))
  return vec.map((v) => v / (mag || 1))
}

async function runPipeline() {
  if (running.value) return
  running.value = true
  currentStep.value = -1
  Object.keys(stepOutputs).forEach((k) => delete stepOutputs[k])
  finalVector.value = []

  const text = inputText.value || '你好世界'

  // Step 1: Tokenize
  await delay(400)
  currentStep.value = 0
  const tokens = simulateTokenize(text)
  stepOutputs.tokenize = `[${tokens.map((t) => '"' + t + '"').join(', ')}]`

  // Step 2: Encode
  await delay(500)
  currentStep.value = 1
  const ids = tokens.map((t) => hashCode(t) % 50000)
  stepOutputs.encode = `[${ids.join(', ')}]`

  // Step 3: Model
  await delay(600)
  currentStep.value = 2
  stepOutputs.model = `${tokens.length} 个 Token -> ${tokens.length} x 768 维隐藏状态矩阵`

  // Step 4: Pool
  await delay(500)
  currentStep.value = 3
  stepOutputs.pool = `Mean Pooling: ${tokens.length} 个向量 -> 1 个 768 维句子向量`

  // Step 5: Normalize
  await delay(400)
  currentStep.value = 4
  finalVector.value = generateVector(text)
  stepOutputs.normalize = `L2 归一化: ||v|| = 1.0000`

  running.value = false
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>

<style scoped>
.pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.desc {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.input-area {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.input-area label {
  width: 100%;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.text-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.text-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.run-btn {
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  white-space: nowrap;
  transition: background 0.2s;
}

.run-btn:hover {
  opacity: 0.9;
}

.pipeline-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step {
  padding: 0.75rem;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  opacity: 0.4;
  transition: all 0.3s;
}

.step.active {
  opacity: 1;
}

.step.current {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  background: var(--vp-c-text-3);
  flex-shrink: 0;
  transition: background 0.3s;
}

.step-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.step-check {
  margin-left: auto;
  color: #10b981;
  font-weight: 700;
}

.step-content {
  margin-top: 0.5rem;
  padding-left: 2rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
}

.step-output {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 6px 10px;
  overflow-x: auto;
}

.step-output code {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  word-break: break-all;
}

.step-arrow {
  text-align: center;
  height: 24px;
  line-height: 24px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.step-arrow span {
  opacity: 0;
  transition: opacity 0.3s;
}

.step-arrow span.visible {
  opacity: 0.5;
}

.final-result {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid #10b981;
  border-radius: 8px;
}

.result-title {
  font-weight: 600;
  color: #10b981;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.vector-viz {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 80px;
  padding: 0 4px;
}

.vec-bar {
  flex: 1;
  min-width: 0;
  border-radius: 2px 2px 0 0;
  position: relative;
  transition: height 0.3s;
}

.vec-val {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  white-space: nowrap;
}

.vec-note {
  margin: 0.75rem 0 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .pipeline-demo {
    padding: 1rem;
  }

  .input-area {
    flex-direction: column;
    align-items: stretch;
  }

  .run-btn {
    width: 100%;
  }
}
</style>
