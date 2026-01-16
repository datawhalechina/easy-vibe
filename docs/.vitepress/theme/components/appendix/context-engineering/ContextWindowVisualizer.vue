<template>
  <div class="context-window-visualizer">
    <div class="control-panel">
      <div class="stat-box">
        <div class="stat-label">Token Usage</div>
        <div class="stat-value" :class="{ error: isOverflow }">
          {{ usedTokens }} / {{ maxTokens }}
        </div>
      </div>
      <div class="progress-bar-container">
        <div
          class="progress-bar"
          :style="{
            width: usagePercentage + '%',
            backgroundColor: progressBarColor
          }"
        ></div>
      </div>
    </div>

    <div class="visualization-area">
      <div class="window-frame">
        <div class="window-header">Context Window (Model Memory)</div>
        <div class="token-stream">
          <transition-group name="token-list">
            <span
              v-for="(token, index) in tokenizedText"
              :key="index"
              class="token-chip"
              :class="{ overflow: index >= maxTokens }"
            >
              {{ token }}
            </span>
          </transition-group>
        </div>
        <div v-if="isOverflow" class="overflow-warning">
          ⚠️ Context Overflow! The model ignores everything beyond this point.
        </div>
      </div>
    </div>

    <div class="input-area">
      <textarea
        v-model="inputText"
        placeholder="Type here to see how tokens fill up the context window..."
        rows="4"
      ></textarea>
      <div class="presets">
        <button @click="fillLorem(50)">Add Short Text</button>
        <button @click="fillLorem(200)">Add Long Text</button>
        <button @click="clear">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const maxTokens = 100
const inputText = ref('Context engineering is the art of managing information.')

// Simple mock tokenizer: split by space for demonstration
const tokenizedText = computed(() => {
  return inputText.value
    .trim()
    .split(/\s+/)
    .filter((t) => t)
})

const usedTokens = computed(() => tokenizedText.value.length)
const isOverflow = computed(() => usedTokens.value > maxTokens)
const usagePercentage = computed(() =>
  Math.min((usedTokens.value / maxTokens) * 100, 100)
)

const progressBarColor = computed(() => {
  if (isOverflow.value) return '#ef4444'
  if (usagePercentage.value > 80) return '#f59e0b'
  return '#10b981'
})

const fillLorem = (count) => {
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua'
  ]
  let text = []
  for (let i = 0; i < count; i++) {
    text.push(words[Math.floor(Math.random() * words.length)])
  }
  inputText.value += (inputText.value ? ' ' : '') + text.join(' ')
}

const clear = () => {
  inputText.value = ''
}
</script>

<style scoped>
.context-window-visualizer {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  margin-bottom: 1.5rem;
}

.stat-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.stat-value.error {
  color: #ef4444;
}

.progress-bar-container {
  height: 10px;
  background: var(--vp-c-bg);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.progress-bar {
  height: 100%;
  transition: all 0.3s ease;
}

.visualization-area {
  margin-bottom: 1.5rem;
}

.window-frame {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
  position: relative;
  min-height: 150px;
}

.window-header {
  position: absolute;
  top: -12px;
  left: 10px;
  background: var(--vp-c-bg-soft);
  padding: 0 10px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.token-stream {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.token-chip {
  padding: 2px 6px;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.token-chip.overflow {
  background: #fee2e2;
  color: #b91c1c;
  opacity: 0.5;
  text-decoration: line-through;
}

.overflow-warning {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  border-radius: 4px;
  font-size: 0.8rem;
  text-align: center;
}

.input-area {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  resize: vertical;
}

.presets {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;
}

button:hover {
  background: var(--vp-c-brand-dark);
}

.token-list-enter-active,
.token-list-leave-active {
  transition: all 0.3s ease;
}
.token-list-enter-from,
.token-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
