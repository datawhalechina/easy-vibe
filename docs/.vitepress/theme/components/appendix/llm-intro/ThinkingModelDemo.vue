<template>
  <div class="thinking-demo">
    <div class="mode-switch">
      <button :class="{ active: mode === 'fast' }" @click="switchMode('fast')">
        ⚡️ 传统快思考 (System 1)
      </button>
      <button :class="{ active: mode === 'slow' }" @click="switchMode('slow')">
        🧠 深度慢思考 (System 2)
      </button>
    </div>

    <div class="demo-display">
      <div class="question-box">
        <strong>用户提问:</strong>
        <p>9.11 和 9.9 哪个大？</p>
      </div>

      <div class="process-area">
        <!-- Fast Mode Visualization -->
        <div v-if="mode === 'fast'" class="fast-track">
          <div class="model-node">LLM</div>
          <div class="arrow">➜</div>
          <div class="output-box">
            <div class="typing-effect" v-if="generating">
              {{ displayedOutput }}
            </div>
            <div v-else>
              {{ fastOutput }}
            </div>
          </div>
        </div>

        <!-- Slow Mode Visualization -->
        <div v-else class="slow-track">
          <div class="model-node">Thinking LLM</div>
          <div class="arrow">➜</div>
          <div class="output-container">
            <!-- Thinking Process -->
            <div class="thought-bubble" :class="{ visible: showThoughts }">
              <div class="bubble-header" @click="toggleThoughts">
                💭 思考过程 (Chain of Thought)
                <span class="toggle-icon">{{ thoughtsOpen ? '▼' : '▶' }}</span>
              </div>
              <div class="bubble-content" v-show="thoughtsOpen">
                <div class="typing-effect-thought" v-if="generatingThoughts">
                  {{ displayedThoughts }}
                </div>
                <div v-else>
                  {{ slowThoughts }}
                </div>
              </div>
            </div>

            <!-- Final Answer -->
            <div class="output-box final-answer" v-if="showFinalAnswer">
              <div class="typing-effect" v-if="generatingFinal">
                {{ displayedOutput }}
              </div>
              <div v-else>
                {{ slowOutput }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="run-btn" @click="runSimulation" :disabled="isRunning">
        {{ isRunning ? '生成中...' : '开始生成' }}
      </button>
    </div>

    <div class="metrics" v-if="completed">
      <div class="metric-item">
        <span class="label">Token 消耗:</span>
        <span class="value">{{ mode === 'fast' ? '5' : '150' }} tokens</span>
      </div>
      <div class="metric-item">
        <span class="label">耗时:</span>
        <span class="value">{{ mode === 'fast' ? '0.2s' : '5.0s' }}</span>
      </div>
      <div class="metric-item">
        <span class="label">准确率:</span>
        <span class="value" :class="mode === 'fast' ? 'bad' : 'good'">
          {{ mode === 'fast' ? '❌ 错误' : '✅ 正确' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('fast')
const isRunning = ref(false)
const completed = ref(false)

// Fast Mode Data
const fastOutput = '9.11 比 9.9 大。'
const displayedOutput = ref('')

// Slow Mode Data
const slowThoughts = `首先比较整数部分，都是9，相等。
接下来比较小数部分。
9.11 的小数部分是 0.11。
9.9 的小数部分是 0.9。
比较第一位小数：1 < 9。
所以 0.11 小于 0.9。
结论：9.11 小于 9.9。`
const slowOutput = '9.11 比 9.9 小。'

const displayedThoughts = ref('')
const generating = ref(false)
const generatingThoughts = ref(false)
const generatingFinal = ref(false)
const showThoughts = ref(false)
const showFinalAnswer = ref(false)
const thoughtsOpen = ref(true)

const switchMode = (newMode) => {
  if (isRunning.value) return
  mode.value = newMode
  reset()
}

const reset = () => {
  displayedOutput.value = ''
  displayedThoughts.value = ''
  generating.value = false
  generatingThoughts.value = false
  generatingFinal.value = false
  showThoughts.value = false
  showFinalAnswer.value = false
  completed.value = false
  thoughtsOpen.value = true
}

const typeText = async (text, targetRef, speed = 30) => {
  for (let i = 0; i < text.length; i++) {
    targetRef.value += text[i]
    await new Promise((r) => setTimeout(r, speed))
  }
}

const runSimulation = async () => {
  reset()
  isRunning.value = true

  if (mode.value === 'fast') {
    generating.value = true
    await typeText(fastOutput, displayedOutput, 50)
    generating.value = false
  } else {
    // Thinking phase
    showThoughts.value = true
    generatingThoughts.value = true
    await typeText(slowThoughts, displayedThoughts, 20)
    generatingThoughts.value = false

    await new Promise((r) => setTimeout(r, 500)) // Pause

    // Final answer phase
    showFinalAnswer.value = true
    generatingFinal.value = true
    await typeText(slowOutput, displayedOutput, 50)
    generatingFinal.value = false
  }

  completed.value = true
  isRunning.value = false
}

const toggleThoughts = () => {
  thoughtsOpen.value = !thoughtsOpen.value
}
</script>

<style scoped>
.thinking-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
}

.mode-switch {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.mode-switch button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.mode-switch button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.question-box {
  background: var(--vp-c-bg-mute);
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.question-box p {
  margin: 5px 0 0;
  font-size: 1.1em;
}

.process-area {
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.fast-track,
.slow-track {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
}

.model-node {
  padding: 10px 15px;
  background: var(--vp-c-brand-dimm);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  font-weight: bold;
  color: var(--vp-c-brand-dark);
  white-space: nowrap;
}

.arrow {
  font-size: 1.5em;
  color: var(--vp-c-text-3);
  padding-top: 5px;
}

.output-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.output-box {
  padding: 15px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  min-height: 50px;
  font-family: monospace;
}

.final-answer {
  border-color: var(--vp-c-green-dimm);
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-darker);
}

.thought-bubble {
  border: 1px dashed var(--vp-c-text-3);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.3s;
}

.thought-bubble.visible {
  opacity: 1;
}

.bubble-header {
  padding: 8px 12px;
  background: var(--vp-c-bg-mute);
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

.bubble-content {
  padding: 10px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  line-height: 1.5;
  border-top: 1px dashed var(--vp-c-divider);
}

.controls {
  text-align: center;
  margin: 20px 0;
}

.run-btn {
  padding: 10px 30px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  transition: opacity 0.2s;
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.metrics {
  display: flex;
  justify-content: space-around;
  background: var(--vp-c-bg-mute);
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9em;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  color: var(--vp-c-text-3);
  font-size: 0.8em;
}

.value {
  font-weight: bold;
  font-size: 1.1em;
}

.bad {
  color: var(--vp-c-red);
}
.good {
  color: var(--vp-c-green);
}
</style>
