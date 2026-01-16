<!--
  TokenizerToMatrix.vue
  从分词到矩阵的转换过程演示
  
  用途：
  详细展示 LLM 处理文本的第一步：
  Text (文本) -> Tokens (分词) -> IDs (数字索引) -> One-hot (独热编码) / Embedding Lookup (查表) -> Matrix (输入矩阵)
  
  交互功能：
  - 步骤导航：分步演示每个转换阶段。
  - 动态输入：允许用户输入短语，实时看到转换结果。
  - 矩阵可视化：直观展示最终生成的数字矩阵。
-->
<template>
  <div class="matrix-demo">
    <div class="control-bar">
      <input
        v-model="inputText"
        type="text"
        placeholder="输入一段文本..."
        class="text-input"
        :disabled="currentStep > 0"
      />
      <div class="step-controls">
        <button
          class="step-btn prev"
          :disabled="currentStep === 0"
          @click="currentStep--"
        >
          ← 上一步
        </button>
        <div class="step-indicator">Step {{ currentStep + 1 }} / 4</div>
        <button
          class="step-btn next"
          :disabled="currentStep === 3"
          @click="currentStep++"
        >
          下一步 →
        </button>
      </div>
    </div>

    <div class="visualization-stage">
      <!-- Step 1: Tokenization -->
      <div class="stage-content" v-if="currentStep === 0">
        <h3 class="stage-title">Step 1: Tokenization (分词)</h3>
        <p class="stage-desc">
          计算机首先将文本切分为最小的语义单位（Token）。
        </p>
        <div class="token-container">
          <div
            v-for="(token, idx) in tokens"
            :key="idx"
            class="token-box"
            :style="{ borderColor: getTokenColor(idx) }"
          >
            <span class="token-val">{{ token.text }}</span>
          </div>
        </div>
      </div>

      <!-- Step 2: ID Mapping -->
      <div class="stage-content" v-if="currentStep === 1">
        <h3 class="stage-title">Step 2: ID Mapping (索引映射)</h3>
        <p class="stage-desc">
          在词表（Vocabulary）中查找每个 Token 对应的唯一数字 ID。
        </p>
        <div class="mapping-container">
          <div v-for="(token, idx) in tokens" :key="idx" class="mapping-row">
            <div
              class="token-box sm"
              :style="{ borderColor: getTokenColor(idx) }"
            >
              {{ token.text }}
            </div>
            <div class="arrow">→</div>
            <div class="vocab-lookup">
              <span class="vocab-label">Vocab Lookup</span>
            </div>
            <div class="arrow">→</div>
            <div class="id-box">
              {{ token.id }}
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Embedding Lookup -->
      <div class="stage-content" v-if="currentStep === 2">
        <h3 class="stage-title">Step 3: Embedding Lookup (向量查表)</h3>
        <p class="stage-desc">
          每个 ID 对应一个预训练好的高维向量（这里简化为 4 维）。
        </p>
        <div class="lookup-container">
          <div v-for="(token, idx) in tokens" :key="idx" class="lookup-row">
            <div class="id-box">{{ token.id }}</div>
            <div class="arrow">→</div>
            <div class="vector-row">
              <span class="bracket">[</span>
              <span
                v-for="(val, vIdx) in token.vector"
                :key="vIdx"
                class="vector-val"
              >
                {{ val.toFixed(2) }}
              </span>
              <span class="bracket">]</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Input Matrix -->
      <div class="stage-content" v-if="currentStep === 3">
        <h3 class="stage-title">Step 4: Matrix Construction (构建矩阵)</h3>
        <p class="stage-desc">
          所有向量堆叠在一起，形成了输入矩阵（Shape: [Batch, Seq_Len,
          Dim]）。这就是 LLM 真正“看见”的东西。
        </p>
        <div class="matrix-container">
          <div class="matrix-bracket left"></div>
          <div class="matrix-grid">
            <div v-for="(token, rIdx) in tokens" :key="rIdx" class="matrix-row">
              <div
                v-for="(val, cIdx) in token.vector"
                :key="cIdx"
                class="matrix-cell"
                :style="{ backgroundColor: getHeatmapColor(val) }"
                :title="val.toFixed(4)"
              >
                {{ val.toFixed(1) }}
              </div>
            </div>
          </div>
          <div class="matrix-bracket right"></div>
          <div class="matrix-label">Shape: ({{ tokens.length }}, 4)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref('我爱人工智能')
const currentStep = ref(0)

const colors = ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#a78bfa']

// 模拟 Tokenizer 和 Embedding
const tokens = computed(() => {
  const text = inputText.value || ''
  // 简单按字/词切分模拟
  const rawTokens = text.match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\s+|./g) || []

  return rawTokens.map((t, i) => {
    // 确定性伪随机生成 ID 和 Vector
    let hash = 0
    for (let j = 0; j < t.length; j++)
      hash = t.charCodeAt(j) + ((hash << 5) - hash)
    const id = Math.abs(hash) % 10000

    // 生成 4 维向量
    const vector = []
    for (let k = 0; k < 4; k++) {
      const val = Math.sin(id * (k + 1)) // 伪随机值 -1 ~ 1
      vector.push(val)
    }

    return { text: t, id, vector }
  })
})

const getTokenColor = (idx) => colors[idx % colors.length]

const getHeatmapColor = (val) => {
  // val is -1 to 1
  // Map to blue (negative) -> white (0) -> red (positive)
  const opacity = Math.abs(val)
  if (val > 0) return `rgba(239, 68, 68, ${opacity})` // Red
  return `rgba(59, 130, 246, ${opacity})` // Blue
}
</script>

<style scoped>
.matrix-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
}

.control-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.text-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.step-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.step-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.visualization-stage {
  padding: 2rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stage-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.stage-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  text-align: center;
  max-width: 80%;
}

/* Step 1 Styles */
.token-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.token-box {
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.token-box.sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
}

/* Step 2 Styles */
.mapping-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mapping-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vocab-lookup {
  padding: 0.25rem 0.5rem;
  background-color: var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.id-box {
  font-family: monospace;
  color: var(--vp-c-brand);
  font-weight: bold;
}

/* Step 3 Styles */
.lookup-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lookup-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vector-row {
  display: flex;
  gap: 0.25rem;
  font-family: monospace;
}

.vector-val {
  width: 40px;
  text-align: right;
  font-size: 0.9rem;
}

/* Step 4 Styles */
.matrix-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.matrix-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.matrix-row {
  display: flex;
  gap: 2px;
}

.matrix-cell {
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #fff; /* text always white for contrast on colored bg */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.matrix-bracket {
  width: 10px;
  border: 2px solid var(--vp-c-text-1);
  position: absolute;
  top: -5px;
  bottom: -5px;
}

.matrix-bracket.left {
  left: -15px;
  border-right: none;
}

.matrix-bracket.right {
  right: -15px;
  border-left: none;
}

.matrix-label {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .control-bar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .text-input {
    width: auto;
    flex: 1;
    max-width: 300px;
  }
}
</style>
