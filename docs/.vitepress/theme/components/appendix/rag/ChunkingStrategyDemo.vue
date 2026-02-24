<!--
  ChunkingStrategyDemo.vue
  文本分块策略交互演示

  用途：
  展示不同的文本分块策略（固定大小、按句子、语义、递归），
  用户可以输入文本并观察不同策略如何切分。

  交互功能：
  - 输入自定义文本或使用预设文本
  - 切换不同分块策略
  - 可视化展示分块结果与边界
-->
<template>
  <div class="chunking-demo">
    <div class="input-section">
      <div class="section-header">
        <span class="section-title">输入文本</span>
        <button
          class="preset-btn"
          @click="usePreset"
        >
          使用示例文本
        </button>
      </div>
      <textarea
        v-model="inputText"
        class="text-input"
        rows="4"
        placeholder="请输入要分块的文本，或点击「使用示例文本」..."
      />
    </div>

    <div class="strategy-selector">
      <button
        v-for="s in strategies"
        :key="s.id"
        :class="['strategy-btn', { active: currentStrategy === s.id }]"
        @click="currentStrategy = s.id"
      >
        <span class="strategy-icon">{{ s.icon }}</span>
        <span class="strategy-name">{{ s.name }}</span>
      </button>
    </div>

    <div class="strategy-info">
      <div class="info-title">{{ activeStrategy.name }}</div>
      <div class="info-desc">{{ activeStrategy.desc }}</div>
      <div class="info-params">
        <span
          v-for="(p, i) in activeStrategy.params"
          :key="i"
          class="param-tag"
        >
          {{ p }}
        </span>
      </div>
    </div>

    <div class="result-section">
      <div class="result-header">
        分块结果
        <span class="chunk-count">共 {{ chunks.length }} 个块</span>
      </div>
      <div class="chunks-container">
        <div
          v-for="(chunk, i) in chunks"
          :key="i"
          class="chunk-item"
          :style="{ borderLeftColor: chunkColors[i % chunkColors.length] }"
        >
          <div class="chunk-meta">
            <span
              class="chunk-index"
              :style="{ background: chunkColors[i % chunkColors.length] }"
            >
              #{{ i + 1 }}
            </span>
            <span class="chunk-size">{{ chunk.length }} 字符</span>
          </div>
          <div class="chunk-text">{{ chunk }}</div>
        </div>
        <div
          v-if="chunks.length === 0"
          class="empty-hint"
        >
          请输入文本后查看分块结果
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>策略</th>
            <th>优点</th>
            <th>缺点</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in strategies"
            :key="s.id"
            :class="{ highlight: currentStrategy === s.id }"
          >
            <td class="strategy-cell">{{ s.icon }} {{ s.name }}</td>
            <td>{{ s.pros }}</td>
            <td>{{ s.cons }}</td>
            <td>{{ s.useCase }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const chunkColors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const presetText = '人工智能（AI）是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。机器学习是 AI 的核心方法之一，它让计算机能够从数据中学习规律。深度学习是机器学习的子集，使用多层神经网络来处理复杂任务。自然语言处理（NLP）使计算机能够理解和生成人类语言。大语言模型（LLM）如 GPT 和 Claude 通过海量文本训练，具备了强大的语言理解和生成能力。RAG（检索增强生成）技术通过在生成前检索相关文档，显著提升了 LLM 回答的准确性和时效性。向量数据库是 RAG 系统的关键组件，它能高效存储和检索文本的向量表示。'

const inputText = ref('')
const currentStrategy = ref('fixed')

const strategies = [
  {
    id: 'fixed',
    name: '固定大小',
    icon: '📏',
    desc: '按照固定的字符数切分文本，是最简单直接的分块方式。通常会设置一定的重叠区域（overlap），避免在切分边界丢失上下文。',
    params: ['块大小: 80 字符', '重叠: 20 字符'],
    pros: '实现简单，块大小均匀',
    cons: '可能在句子中间截断',
    useCase: '结构化程度低的长文本'
  },
  {
    id: 'sentence',
    name: '按句子',
    icon: '📝',
    desc: '以句号、问号、感叹号等标点作为分隔符，按完整句子进行切分。保证每个块都是语义完整的句子集合。',
    params: ['每块: 2-3 句', '分隔符: 。？！'],
    pros: '保持句子完整性',
    cons: '块大小不均匀',
    useCase: '文章、报告等自然文本'
  },
  {
    id: 'semantic',
    name: '语义分块',
    icon: '🧠',
    desc: '根据文本的语义相似度进行分块。当相邻句子的语义差异超过阈值时，在此处切分。能更好地保持主题的连贯性。',
    params: ['相似度阈值: 0.7', '最小块: 50 字符'],
    pros: '主题连贯，语义完整',
    cons: '计算成本高，需要嵌入模型',
    useCase: '多主题混合的复杂文档'
  },
  {
    id: 'recursive',
    name: '递归分块',
    icon: '🔄',
    desc: '使用多级分隔符递归切分：先按段落分，段落太长则按句子分，句子太长则按固定大小分。LangChain 的默认策略。',
    params: ['分隔符: \\n\\n → 。→ 固定', '目标: 80 字符'],
    pros: '兼顾结构与大小',
    cons: '实现较复杂',
    useCase: '通用场景，推荐默认选择'
  }
]

const activeStrategy = computed(() => strategies.find((s) => s.id === currentStrategy.value))

const chunks = computed(() => {
  const text = inputText.value.trim()
  if (!text) return []

  switch (currentStrategy.value) {
    case 'fixed':
      return chunkFixed(text, 80, 20)
    case 'sentence':
      return chunkBySentence(text, 3)
    case 'semantic':
      return chunkSemantic(text)
    case 'recursive':
      return chunkRecursive(text, 80)
    default:
      return []
  }
})

function chunkFixed(text, size, overlap) {
  const result = []
  let start = 0
  while (start < text.length) {
    result.push(text.slice(start, start + size))
    start += size - overlap
  }
  return result
}

function chunkBySentence(text, perChunk) {
  const sentences = text.split(/(?<=[。？！.?!])/).filter((s) => s.trim())
  const result = []
  for (let i = 0; i < sentences.length; i += perChunk) {
    result.push(sentences.slice(i, i + perChunk).join(''))
  }
  return result
}

function chunkSemantic(text) {
  const sentences = text.split(/(?<=[。？！.?!])/).filter((s) => s.trim())
  const result = []
  let current = ''
  const keywords = ['AI', 'LLM', 'RAG', 'NLP', '机器学习', '深度学习', '向量']
  let prevKeywords = new Set()

  for (const s of sentences) {
    const curKeywords = new Set(keywords.filter((k) => s.includes(k)))
    const overlap = [...curKeywords].filter((k) => prevKeywords.has(k)).length
    const similarity = prevKeywords.size > 0 ? overlap / Math.max(prevKeywords.size, curKeywords.size) : 1

    if (current && similarity < 0.5 && current.length > 50) {
      result.push(current)
      current = s
    } else {
      current += s
    }
    prevKeywords = curKeywords
  }
  if (current) result.push(current)
  return result
}

function chunkRecursive(text, target) {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim())
  const result = []
  for (const para of paragraphs) {
    if (para.length <= target) {
      result.push(para)
    } else {
      const sentences = para.split(/(?<=[。？！.?!])/).filter((s) => s.trim())
      let current = ''
      for (const s of sentences) {
        if ((current + s).length > target && current) {
          result.push(current)
          current = s
        } else {
          current += s
        }
      }
      if (current) result.push(current)
    }
  }
  return result
}

function usePreset() {
  inputText.value = presetText
}
</script>

<style scoped>
.chunking-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.section-title {
  font-weight: 600;
  font-size: 14px;
}
.preset-btn {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-size: 12px;
}
.text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.6;
  resize: vertical;
  box-sizing: border-box;
}
.strategy-selector {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
}
.strategy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}
.strategy-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.strategy-icon {
  font-size: 16px;
}
.strategy-info {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.info-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.info-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 8px;
}
.info-params {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.param-tag {
  padding: 2px 10px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-family: monospace;
}
.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
}
.chunk-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-weight: 400;
}
.chunks-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.chunk-item {
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid;
}
.chunk-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.chunk-index {
  padding: 1px 8px;
  border-radius: 4px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
}
.chunk-size {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.chunk-text {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  word-break: break-all;
}
.empty-hint {
  text-align: center;
  padding: 20px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}
.comparison-table {
  margin-top: 16px;
  overflow-x: auto;
}
.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.comparison-table th,
.comparison-table td {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}
.comparison-table th {
  background: var(--vp-c-bg);
  font-weight: 600;
}
.comparison-table tr.highlight {
  background: var(--vp-c-brand-soft);
}
.strategy-cell {
  white-space: nowrap;
}
</style>
