<!--
  TokenizationDemo.vue
  分词原理演示组件
  
  用途：
  展示大语言模型如何“看”文本。通过将文本拆解为 Token，让用户理解 Token 是 LLM 处理的最小单位。
  
  交互功能：
  - 文本输入：用户可输入任意文本。
  - 实时分词：模拟 Tokenizer 将文本切分为 Token。
  - 映射展示：显示 Token 文本与其对应的（模拟）数字 ID。
  - 颜色编码：使用不同颜色区分相邻 Token，直观展示切分边界。
-->
<template>
  <div class="token-demo">
    <div class="control-panel">
      <div class="main-controls">
        <div class="input-group">
          <label>Input Text / 输入文本</label>
          <textarea
            v-model="inputText"
            rows="3"
            placeholder="Type something to see how AI reads it..."
          ></textarea>
        </div>

        <div class="settings-group">
          <label>Algorithm / 算法</label>
          <div class="radio-group">
            <label
              class="radio-option"
              :class="{ active: algorithm === 'bpe' }"
            >
              <input type="radio" v-model="algorithm" value="bpe" />
              <span>BPE (GPT-4)</span>
            </label>
            <label
              class="radio-option"
              :class="{ active: algorithm === 'word' }"
            >
              <input type="radio" v-model="algorithm" value="word" />
              <span>Word (Legacy)</span>
            </label>
            <label
              class="radio-option"
              :class="{ active: algorithm === 'char' }"
            >
              <input type="radio" v-model="algorithm" value="char" />
              <span>Character (Raw)</span>
            </label>
          </div>
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="value">{{ tokens.length }}</span>
          <span class="label">Tokens</span>
        </div>
        <div class="stat-item">
          <span class="value">{{ inputText.length }}</span>
          <span class="label">Characters / 字符</span>
        </div>
      </div>
    </div>

    <!-- Tokenizer Process Visualization -->
    <div class="tokenizer-arrow">⬇</div>

    <div class="visualization-area">
      <div class="token-list">
        <div
          v-for="(token, index) in tokens"
          :key="index"
          class="token-chip"
          :class="`color-${index % 5}`"
          @mouseover="hoverIndex = index"
          @mouseleave="hoverIndex = -1"
        >
          <span class="token-text">{{ token.text }}</span>
          <span class="token-id">{{ token.id }}</span>
          <div class="tooltip" v-if="hoverIndex === index">
            ID: {{ token.id }}<br />
            Type: {{ token.type }}
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Note:</strong>
        LLM 不直接理解单词，它们处理的是数字（Token IDs）。 对于英文，一个 Token
        通常是一个单词或单词的一部分（如 "ing"）； 对于中文，一个 Token
        通常是一个汉字或词组。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref(
  'The quick brown fox jumps over the lazy dog. \n今天天气真不错！'
)
const hoverIndex = ref(-1)
const algorithm = ref('bpe')

// 模拟不同分词算法
const tokens = computed(() => {
  const text = inputText.value
  const result = []
  let idCounter = 1000

  // Helper to generate consistent fake ID
  const generateId = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash) % 50000
  }

  if (algorithm.value === 'bpe') {
    // 1. BPE (Subword) Simulation
    // 模拟：保留常用词，拆分生僻词/后缀，中文字符独立
    const regex = /([a-zA-Z]+)|([\u4e00-\u9fa5])|(\s+)|(.+?)/g
    let match
    while ((match = regex.exec(text)) !== null) {
      if (match[0]) {
        let type = 'other'
        if (match[1]) type = 'word (en)'
        else if (match[2]) type = 'char (zh)'
        else if (match[3]) type = 'whitespace'
        else type = 'punctuation'

        result.push({ text: match[0], id: generateId(match[0]), type })
      }
    }
  } else if (algorithm.value === 'word') {
    // 2. Word-based Simulation
    // 简单按空格拆分，标点符号也可能粘连
    const words = text.split(/(\s+)/)
    words.forEach((w) => {
      if (w) {
        let type = /^\s+$/.test(w) ? 'whitespace' : 'word'
        result.push({ text: w, id: generateId(w), type })
      }
    })
  } else if (algorithm.value === 'char') {
    // 3. Character-based Simulation
    // 每个字符都是一个 Token
    for (let char of text) {
      let type = 'char'
      if (/\s/.test(char)) type = 'whitespace'
      result.push({ text: char, id: generateId(char), type })
    }
  }

  return result
})
</script>

<style scoped>
.token-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.main-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0; /* Prevent flex item from overflowing */
}

.input-group {
  width: 100%;
}

.input-group label,
.settings-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--vp-c-bg);
  font-size: 0.85rem;
  transition: all 0.2s;
}

.radio-option:hover {
  background-color: var(--vp-c-bg-alt);
}

.radio-option.active {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.radio-option input {
  display: none;
}

.tokenizer-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 0.5rem 0;
  opacity: 0.5;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
}

textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 100px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.stat-item .value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  line-height: 1;
}

.stat-item .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.visualization-area {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  min-height: 100px;
  margin-bottom: 1rem;
}

.token-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.token-chip {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: help;
  transition: transform 0.1s;
}

.token-chip:hover {
  transform: scale(1.05);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.token-text {
  font-size: 1rem;
  line-height: 1.4;
  white-space: pre;
}

.token-id {
  font-size: 0.6rem;
  opacity: 0.6;
  margin-top: 2px;
}

/* Color palette for tokens */
.color-0 {
  background-color: rgba(255, 99, 132, 0.2);
  border: 1px solid rgba(255, 99, 132, 0.3);
}
.color-1 {
  background-color: rgba(54, 162, 235, 0.2);
  border: 1px solid rgba(54, 162, 235, 0.3);
}
.color-2 {
  background-color: rgba(255, 206, 86, 0.2);
  border: 1px solid rgba(255, 206, 86, 0.3);
}
.color-3 {
  background-color: rgba(75, 192, 192, 0.2);
  border: 1px solid rgba(75, 192, 192, 0.3);
}
.color-4 {
  background-color: rgba(153, 102, 255, 0.2);
  border: 1px solid rgba(153, 102, 255, 0.3);
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  pointer-events: none;
  margin-bottom: 6px;
  z-index: 20;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -4px;
  border-width: 4px;
  border-style: solid;
  border-color: var(--vp-c-text-1) transparent transparent transparent;
}

.info-box {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  font-size: 1.1em;
}

@media (max-width: 640px) {
  .control-panel {
    flex-direction: column;
    gap: 1rem;
  }

  .stats {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .stat-item {
    flex: 1;
  }
}
</style>
