<!--
 * Component: ContextCompressionDemo.vue
 * Description: Demonstrates various context compression techniques to save tokens.
 * Features:
 *  - Strategies: Summarization, Extraction, Structured Format (JSON)
 *  - Real-time comparison of original vs compressed text
 *  - Metrics display (Token count, Compression Ratio)
-->

<script setup>
import { ref, computed } from 'vue'

const originalText = ref(
  `上下文工程（Context Engineering）是指优化提供给大语言模型（LLM）的提示词，以确保其拥有生成准确且相关回复所需的信息。其中的一个主要挑战是 LLM 的上下文窗口有限，这限制了它们一次能处理的文本量。为了克服这个问题，开发者使用了诸如摘要生成（Summarization）等技术，将长文档浓缩为保留关键信息的短版本。另一种技术是检索增强生成（RAG），它根据用户的查询从数据库中仅获取最相关的片段。此外，通过将非结构化文本转换为 JSON 等结构化数据，也可以减少冗余字符，提高信息密度。`
)

const strategies = [
  { id: 'summary', label: '📝 摘要生成', desc: '保留大意，缩减篇幅' },
  { id: 'extract', label: '🔑 关键词提取', desc: '提取核心要点' },
  { id: 'json', label: '⚙️ 结构化数据', desc: '转换为 JSON 格式' }
]

const currentMode = ref('')
const compressedText = ref('')
const isCompressing = ref(false)

const originalTokens = computed(() => Math.ceil(originalText.value.length * 0.7)) // Approximation
const compressedTokens = computed(() => Math.ceil(compressedText.value.length * 0.7))

const compressionRatio = computed(() => {
  if (!originalText.value.length || !compressedText.value.length) return 0
  return Math.round((1 - compressedText.value.length / originalText.value.length) * 100)
})

const compress = async (mode) => {
  if (isCompressing.value) return
  currentMode.value = mode
  isCompressing.value = true
  compressedText.value = ''

  // Simulate API delay
  await new Promise(r => setTimeout(r, 600))

  if (mode === 'summary') {
    compressedText.value = '上下文工程旨在优化 LLM 提示词以解决上下文窗口限制。主要技术包括摘要生成（浓缩关键信息）、RAG（按需检索相关片段）以及结构化数据转换（提高信息密度）。'
  } else if (mode === 'extract') {
    compressedText.value = '- 目标: 优化 LLM 提示词\n- 挑战: 上下文窗口有限\n- 方案1: 摘要生成 (Summarization)\n- 方案2: 检索增强生成 (RAG)\n- 方案3: 结构化数据 (JSON)'
  } else if (mode === 'json') {
    compressedText.value = JSON.stringify({
      topic: "Context Engineering",
      problem: "Limited Context Window",
      solutions: ["Summarization", "RAG", "Structured Data"]
    }, null, 2)
  }
  
  isCompressing.value = false
}
</script>

<template>
  <div class="context-compression-demo">
    <!-- Control Panel -->
    <div class="control-panel">
      <div class="strategy-group">
        <button
          v-for="s in strategies"
          :key="s.id"
          class="strategy-btn"
          :class="{ active: currentMode === s.id }"
          @click="compress(s.id)"
          :title="s.desc"
        >
          <div class="btn-label">{{ s.label }}</div>
          <div class="btn-desc">{{ s.desc }}</div>
        </button>
      </div>
    </div>

    <!-- Main Comparison Area -->
    <div class="comparison-area">
      <!-- Original -->
      <div class="text-column original">
        <div class="column-header">
          <span class="badge">原始文本</span>
          <span class="meta">{{ originalTokens }} Tokens</span>
        </div>
        <textarea 
          v-model="originalText" 
          class="text-content"
          placeholder="在此输入长文本..."
        ></textarea>
      </div>

      <!-- Arrow -->
      <div class="process-arrow">
        <div class="arrow-icon" :class="{ compressing: isCompressing }">
          {{ isCompressing ? '⚙️' : '➡️' }}
        </div>
        <div class="ratio-badge" v-if="compressedText && !isCompressing">
          -{{ compressionRatio }}%
        </div>
      </div>

      <!-- Compressed -->
      <div class="text-column compressed">
        <div class="column-header">
          <span class="badge success">压缩后</span>
          <span class="meta" v-if="compressedText">{{ compressedTokens }} Tokens</span>
        </div>
        <div class="text-content result-box" :class="{ empty: !compressedText }">
          <div v-if="isCompressing" class="loading-state">
            <span class="spinner"></span> 压缩中...
          </div>
          <pre v-else-if="compressedText">{{ compressedText }}</pre>
          <div v-else class="placeholder">
            请选择一种压缩策略
            <br>
            <small>点击上方按钮开始</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics Bar -->
    <div class="metrics-bar" v-if="compressedText && !isCompressing">
      <div class="progress-bg">
        <div class="progress-fill" :style="{ width: (100 - compressionRatio) + '%' }"></div>
        <div class="progress-label">占用空间: {{ 100 - compressionRatio }}%</div>
      </div>
      <div class="saved-label">节省了 {{ compressionRatio }}% 的 Token</div>
    </div>
  </div>
</template>

<style scoped>
.context-compression-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
}

.control-panel {
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.strategy-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.strategy-btn {
  flex: 1;
  min-width: 140px;
  padding: 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.strategy-btn:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.strategy-btn.active {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
}

.btn-label {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
  color: var(--vp-c-text-1);
}

.btn-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Comparison Area */
.comparison-area {
  display: flex;
  padding: 1.5rem;
  gap: 1rem;
  align-items: stretch;
  min-height: 250px;
}

.text-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.badge {
  background-color: var(--vp-c-bg-mute);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}
.badge.success {
  background-color: var(--vp-c-green-dimm);
  color: var(--vp-c-green-dark);
}

.meta {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-mono);
}

.text-content {
  flex: 1;
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  font-size: 0.9rem;
  line-height: 1.6;
  resize: none;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-mono);
}
.text-content:focus {
  border-color: var(--vp-c-brand);
  outline: none;
}

.result-box {
  background-color: var(--vp-c-bg-alt);
  overflow-y: auto;
  position: relative;
}
.result-box.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder {
  color: var(--vp-c-text-3);
  text-align: center;
}

/* Process Arrow */
.process-arrow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 50px;
}

.arrow-icon {
  font-size: 1.5rem;
  transition: transform 0.5s;
}
.arrow-icon.compressing {
  animation: spin 1s linear infinite;
}

.ratio-badge {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-green);
  background-color: var(--vp-c-green-dimm);
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
}

/* Metrics Bar */
.metrics-bar {
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bg {
  flex: 1;
  height: 20px;
  background-color: var(--vp-c-bg-mute);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}

.progress-fill {
  height: 100%;
  background-color: var(--vp-c-brand);
  transition: width 0.5s ease;
}

.progress-label {
  position: absolute;
  left: 10px;
  font-size: 0.75rem;
  color: white;
  text-shadow: 0 0 2px rgba(0,0,0,0.5);
  font-weight: bold;
}

.saved-label {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-green);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .comparison-area {
    flex-direction: column;
  }
  .process-arrow {
    width: 100%;
    flex-direction: row;
    height: 40px;
  }
}
</style>
