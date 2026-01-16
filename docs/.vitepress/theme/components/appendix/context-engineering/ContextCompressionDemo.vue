<template>
  <div class="context-compression-demo">
    <div class="input-section">
      <div class="label">Original Text (Long)</div>
      <textarea v-model="originalText" rows="6"></textarea>
      <div class="stats">Length: {{ originalText.length }} chars</div>
    </div>

    <div class="actions">
      <button
        @click="compress('summary')"
        :class="{ active: mode === 'summary' }"
      >
        📝 Summarize
      </button>
      <button
        @click="compress('extract')"
        :class="{ active: mode === 'extract' }"
      >
        🔑 Extract Key Points
      </button>
      <button @click="compress('json')" :class="{ active: mode === 'json' }">
        JSON Structure
      </button>
    </div>

    <div class="output-section">
      <div class="label">Compressed Context</div>
      <div class="result-box">
        <div v-if="compressedText" class="result-content">
          {{ compressedText }}
        </div>
        <div v-else class="placeholder">Select a compression strategy...</div>
      </div>
      <div class="stats" v-if="compressedText">
        Length: {{ compressedText.length }} chars
        <span class="ratio">(Ratio: {{ compressionRatio }}%)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const originalText = ref(
  `Context engineering involves optimizing the prompt given to a large language model (LLM) to ensure it has the necessary information to generate accurate and relevant responses. One of the main challenges is the limited context window of LLMs, which restricts the amount of text they can process at once. To overcome this, developers use techniques like summarization, where long documents are condensed into shorter versions retaining key information. Another technique is retrieval-augmented generation (RAG), which fetches only the most relevant pieces of information from a database based on the user's query.`
)

const compressedText = ref('')
const mode = ref('')

const compressionRatio = computed(() => {
  if (!originalText.value.length) return 0
  return Math.round(
    (compressedText.value.length / originalText.value.length) * 100
  )
})

const compress = (strategy) => {
  mode.value = strategy

  if (strategy === 'summary') {
    compressedText.value =
      'Context engineering optimizes LLM prompts to handle limited context windows. Key techniques include summarization (condensing text) and RAG (retrieving relevant info dynamically).'
  } else if (strategy === 'extract') {
    compressedText.value =
      '- Goal: Optimize prompts for LLMs\n- Challenge: Limited context window\n- Solution 1: Summarization\n- Solution 2: RAG (Retrieval-Augmented Generation)'
  } else if (strategy === 'json') {
    compressedText.value = JSON.stringify(
      {
        topic: 'Context Engineering',
        problem: 'Limited Context Window',
        solutions: ['Summarization', 'RAG']
      },
      null,
      2
    )
  }
}
</script>

<style scoped>
.context-compression-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
}

.stats {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-top: 0.3rem;
  text-align: right;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

button {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

button:hover {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand);
}

button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.result-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  min-height: 100px;
}

.result-content {
  white-space: pre-wrap;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.placeholder {
  color: var(--vp-c-text-3);
  font-style: italic;
  text-align: center;
  margin-top: 1rem;
}

.ratio {
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-left: 0.5rem;
}
</style>
