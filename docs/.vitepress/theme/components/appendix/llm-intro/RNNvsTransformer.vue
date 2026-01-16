<!--
  RNNvsTransformer.vue
  RNN vs Transformer 架构对比演示
  
  用途：
  对比两种处理序列数据的核心架构：
  - RNN: 串行处理，记忆随距离衰减。
  - Transformer: 并行处理，Self-Attention 机制捕捉长距离依赖。
  
  交互功能：
  - 架构切换：RNN / Transformer (Self-Attention)。
  - 动态演示：
    - RNN: 逐步输入单词，观察 Hidden State 的变化。
    - Transformer: 鼠标悬停在单词上，显示其关注（Attend to）的其他单词（Attention Map）。
-->
<template>
  <div class="arch-demo">
    <div class="control-tabs">
      <button :class="{ active: mode === 'rnn' }" @click="mode = 'rnn'">
        🐌 RNN (Sequential)
      </button>
      <button
        :class="{ active: mode === 'transformer' }"
        @click="mode = 'transformer'"
      >
        ⚡ Transformer (Parallel + Attention)
      </button>
    </div>

    <div class="visualization-area">
      <!-- RNN Visualization -->
      <div v-if="mode === 'rnn'" class="rnn-viz">
        <div class="sequence-display">
          <div
            v-for="(word, idx) in rnnWords"
            :key="idx"
            class="word-item"
            :class="{ active: currentRnnStep === idx }"
          >
            {{ word }}
          </div>
        </div>

        <div class="rnn-process">
          <div class="hidden-state-track">
            <div
              class="hidden-state-box"
              :style="{ opacity: rnnMemoryOpacity }"
            >
              <div class="memory-content">
                Memory (h)
                <div
                  class="memory-level"
                  :style="{ height: rnnMemoryStrength + '%' }"
                ></div>
              </div>
            </div>
            <div class="arrow-right">→</div>
            <div class="output-box">Output: {{ rnnOutput }}</div>
          </div>
          <div class="controls">
            <button @click="playRnn" :disabled="isPlayingRnn">
              {{ isPlayingRnn ? 'Processing...' : '▶ Play Sequence' }}
            </button>
          </div>
        </div>
        <p class="desc-text">
          RNN 从左到右逐个读取。注意看
          Memory（记忆），随着句子变长，最早的信息（"The"）可能会被后面的信息冲淡，这就是“长距离依赖”问题。
        </p>
      </div>

      <!-- Transformer Visualization -->
      <div v-else class="transformer-viz">
        <div class="sentence-container">
          <div
            v-for="(word, idx) in transformerWords"
            :key="idx"
            class="t-word"
            :class="{
              hovered: hoveredWordIndex === idx,
              attended: getAttentionScore(hoveredWordIndex, idx) > 0
            }"
            @mouseenter="hoveredWordIndex = idx"
            @mouseleave="hoveredWordIndex = -1"
            :style="{
              backgroundColor: getAttentionColor(hoveredWordIndex, idx)
            }"
          >
            {{ word }}
          </div>
        </div>

        <div class="attention-info" v-if="hoveredWordIndex !== -1">
          <p>
            Current Focus:
            <strong>"{{ transformerWords[hoveredWordIndex] }}"</strong>
          </p>
          <p class="sub-info">
            Paying attention to:
            <span v-for="(attn, idx) in currentAttentions" :key="idx">
              <span v-if="attn.score > 0.01">
                "{{ transformerWords[attn.idx] }}" ({{
                  Math.round(attn.score * 100)
                }}%)
              </span>
            </span>
          </p>
        </div>
        <div class="attention-info" v-else>
          <p>👆 鼠标悬停在任意单词上，查看它在“关注”谁。</p>
        </div>

        <p class="desc-text">
          Transformer 一眼看完整个句子（并行）。Self-Attention
          机制让每个词都能直接“看见”其他词，无论距离多远。
          <br />例如：悬停在 <strong>"it"</strong> 上，你会发现它强烈关注
          <strong>"animal"</strong>，因为它指代的就是 animal。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('rnn')

// RNN Data
const rnnWords = [
  'The',
  'quick',
  'brown',
  'fox',
  'jumps',
  'over',
  'the',
  'lazy',
  'dog'
]
const currentRnnStep = ref(-1)
const isPlayingRnn = ref(false)
const rnnMemoryOpacity = ref(0.3)
const rnnMemoryStrength = ref(0)
const rnnOutput = ref('...')

const playRnn = async () => {
  isPlayingRnn.value = true
  currentRnnStep.value = -1
  rnnMemoryStrength.value = 0
  rnnOutput.value = '...'

  for (let i = 0; i < rnnWords.length; i++) {
    currentRnnStep.value = i
    // Memory accumulates but also decays
    rnnMemoryStrength.value = Math.min(100, rnnMemoryStrength.value * 0.8 + 30)
    rnnMemoryOpacity.value = 0.5 + (i / rnnWords.length) * 0.5
    rnnOutput.value = `h${i}`
    await new Promise((r) => setTimeout(r, 800))
  }

  isPlayingRnn.value = false
  rnnOutput.value = 'Done'
}

// Transformer Data
const transformerWords = [
  'The',
  'animal',
  "didn't",
  'cross',
  'the',
  'street',
  'because',
  'it',
  'was',
  'too',
  'tired',
  '.'
]

// Pre-defined attention matrix (simplified for demo)
// Source -> Targets (scores)
const attentionMap = {
  7: {
    // "it"
    1: 0.8, // animal
    5: 0.1, // street
    7: 1.0 // itself
  },
  10: {
    // "tired"
    1: 0.6, // animal
    7: 0.9, // it
    10: 1.0
  },
  3: {
    // "cross"
    1: 0.5, // animal
    5: 0.5, // street
    3: 1.0
  }
}

const hoveredWordIndex = ref(-1)

const currentAttentions = computed(() => {
  if (hoveredWordIndex.value === -1) return []
  const map = attentionMap[hoveredWordIndex.value] || {}

  return transformerWords
    .map((_, idx) => {
      let score = map[idx]
      if (score === undefined) {
        // Default behavior if not in map: attend to self strongly, neighbors weakly
        if (idx === hoveredWordIndex.value) score = 1.0
        else if (Math.abs(idx - hoveredWordIndex.value) === 1) score = 0.1
        else score = 0.0
      }
      return { idx, score }
    })
    .sort((a, b) => b.score - a.score)
})

const getAttentionScore = (sourceIdx, targetIdx) => {
  if (sourceIdx === -1) return 0
  const map = attentionMap[sourceIdx]

  if (map) {
    return map[targetIdx] || 0
  } else {
    // Default behavior if not in map
    if (sourceIdx === targetIdx) return 1.0
    if (Math.abs(sourceIdx - targetIdx) === 1) return 0.1
    return 0
  }
}

const getAttentionColor = (sourceIdx, targetIdx) => {
  if (sourceIdx === -1) return 'transparent'
  const score = getAttentionScore(sourceIdx, targetIdx)
  if (score === 0) return 'transparent'
  // Purple alpha
  return `rgba(139, 92, 246, ${score * 0.6})`
}
</script>

<style scoped>
.arch-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
}

.control-tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
}

.control-tabs button {
  flex: 1;
  padding: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  background-color: var(--vp-c-bg-alt);
}

.control-tabs button.active {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-brand);
}

.visualization-area {
  padding: 2rem;
  min-height: 250px;
}

/* RNN Styles */
.sequence-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.word-item {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  opacity: 0.5;
  transition: all 0.3s;
}

.word-item.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  transform: scale(1.1);
}

.rnn-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hidden-state-track {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hidden-state-box {
  width: 100px;
  height: 80px;
  border: 2px solid var(--vp-c-text-2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--vp-c-bg);
  overflow: hidden;
}

.memory-content {
  position: relative;
  z-index: 2;
  font-size: 0.8rem;
  text-align: center;
}

.memory-level {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--vp-c-brand);
  opacity: 0.3;
  transition: height 0.3s;
}

.output-box {
  padding: 0.5rem;
  border: 1px dashed var(--vp-c-text-2);
  border-radius: 4px;
  min-width: 80px;
  text-align: center;
}

/* Transformer Styles */
.sentence-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.t-word {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid transparent;
}

.t-word:hover {
  border-color: var(--vp-c-brand);
}

.attention-info {
  text-align: center;
  min-height: 3rem;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.sub-info {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.desc-text {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
