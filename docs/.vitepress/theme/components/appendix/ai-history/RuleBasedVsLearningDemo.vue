<template>
  <div class="rule-learning-demo">
    <div class="header">
      <div class="title">
        规则 vs 学习：你写阈值，还是让模型从数据里“推断”阈值？
      </div>
      <div class="subtitle">
        右侧允许你自己添加样本；点击“训练”只做一次计算，不会自动连着做下一步。
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">规则系统（手写 If/Else）</div>

        <div class="row">
          <label class="label">阈值 size &gt;</label>
          <input
            v-model.number="ruleThreshold"
            type="number"
            min="1"
            max="10"
            class="input"
          />
          <span class="muted">（你必须明确写出来）</span>
        </div>

        <div class="row">
          <label class="label">测试输入 size</label>
          <input
            v-model.number="testInput"
            type="range"
            min="1"
            max="10"
            class="range"
          />
          <code class="mono">{{ testInput }}</code>
        </div>

        <div
          class="result"
          :class="{
            good: ruleResult.label === '🍎',
            bad: ruleResult.label === '🍒'
          }"
        >
          <div class="result-title">输出</div>
          <div class="result-value">{{ ruleResult.text }}</div>
          <div class="result-note mono">
            if (size &gt; {{ ruleThreshold }}) return 🍎 else return 🍒
          </div>
        </div>

        <div class="hint">
          当环境变化（比如“苹果平均变小了”），你需要手动改规则；规则越多，维护成本越高。
        </div>
      </div>

      <div class="card">
        <div class="card-title">机器学习（从样本推断边界）</div>

        <div class="row">
          <label class="label">添加训练样本</label>
          <input
            v-model.number="newSize"
            type="number"
            min="1"
            max="10"
            class="input"
          />
          <select v-model="newLabel" class="select">
            <option value="🍒">🍒 樱桃（小）</option>
            <option value="🍎">🍎 苹果（大）</option>
          </select>
          <button class="btn" @click="addSample">添加</button>
        </div>

        <div class="samples">
          <div v-if="trainingData.length === 0" class="empty muted">
            还没有样本：先添加 2-4 个样本再训练。
          </div>
          <div v-else class="chips">
            <div v-for="(p, i) in trainingData" :key="p.id" class="chip">
              <span class="mono">{{ p.size }}</span>
              <span class="sep">→</span>
              <span class="chip-label">{{ p.label }}</span>
              <button class="chip-x" @click="removeSample(i)">×</button>
            </div>
          </div>
        </div>

        <div class="controls">
          <button
            class="btn primary"
            @click="train"
            :disabled="trainingData.length < 2"
          >
            训练（推断阈值）
          </button>
          <button class="btn" @click="resetLearning">重置样本</button>
        </div>

        <div class="row">
          <label class="label">测试输入 size</label>
          <input
            v-model.number="testInput"
            type="range"
            min="1"
            max="10"
            class="range"
          />
          <code class="mono">{{ testInput }}</code>
        </div>

        <div
          class="result"
          :class="{
            good: mlResult.label === '🍎',
            bad: mlResult.label === '🍒'
          }"
        >
          <div class="result-title">输出</div>
          <div class="result-value">{{ mlResult.text }}</div>
          <div class="result-note">
            <span class="muted">学习到的阈值：</span>
            <code class="mono">{{ learnedThresholdDisplay }}</code>
          </div>
        </div>

        <div class="hint">
          这里的“训练”是极简示意：用样本推断一个分界点（阈值）。真实模型会用更复杂的损失函数与优化算法。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const testInput = ref(5)

// Rule based
const ruleThreshold = ref(6)
const ruleResult = computed(() => {
  const isApple = testInput.value > ruleThreshold.value
  return {
    label: isApple ? '🍎' : '🍒',
    text: isApple ? 'Big 🍎' : 'Small 🍒'
  }
})

// Learning (toy)
let idCounter = 0
const trainingData = ref([
  { id: idCounter++, size: 2, label: '🍒' },
  { id: idCounter++, size: 3, label: '🍒' },
  { id: idCounter++, size: 8, label: '🍎' },
  { id: idCounter++, size: 9, label: '🍎' }
])

const newSize = ref(5)
const newLabel = ref('🍒')
const isTrained = ref(false)
const learnedThreshold = ref(5.5)

const addSample = () => {
  const size = Math.max(1, Math.min(10, Number(newSize.value)))
  trainingData.value.push({ id: idCounter++, size, label: newLabel.value })
  isTrained.value = false
}

const removeSample = (index) => {
  trainingData.value.splice(index, 1)
  isTrained.value = false
}

const inferThreshold = () => {
  const cherries = trainingData.value
    .filter((p) => p.label === '🍒')
    .map((p) => p.size)
  const apples = trainingData.value
    .filter((p) => p.label === '🍎')
    .map((p) => p.size)

  if (cherries.length === 0 || apples.length === 0) return null

  const maxCherry = Math.max(...cherries)
  const minApple = Math.min(...apples)
  return (maxCherry + minApple) / 2
}

const train = () => {
  const t = inferThreshold()
  if (t === null) {
    isTrained.value = false
    return
  }
  learnedThreshold.value = t
  isTrained.value = true
}

const resetLearning = () => {
  trainingData.value = []
  isTrained.value = false
  learnedThreshold.value = 5.5
}

const learnedThresholdDisplay = computed(() => {
  if (!isTrained.value) return '未训练'
  return learnedThreshold.value.toFixed(2)
})

const mlResult = computed(() => {
  if (!isTrained.value) {
    return { label: '❓', text: 'Untrained / 未训练' }
  }
  const isApple = testInput.value > learnedThreshold.value
  return {
    label: isApple ? '🍎' : '🍒',
    text: isApple ? 'Big 🍎' : 'Small 🍒'
  }
})
</script>

<style scoped>
.rule-learning-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  color: var(--vp-c-text-1);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 1rem;
}

.card-title {
  font-weight: 900;
  margin-bottom: 0.75rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.label {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.input,
.select {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  padding: 0.4rem 0.5rem;
  font-weight: 700;
}

.input {
  width: 84px;
}

.select {
  min-width: 140px;
}

.range {
  width: 220px;
  max-width: 100%;
}

.mono {
  font-family: var(--vp-font-family-mono);
}

.muted {
  color: var(--vp-c-text-2);
}

.btn {
  padding: 0.45rem 0.7rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 800;
  font-size: 0.875rem;
}

.btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.samples {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  margin-bottom: 0.75rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-weight: 800;
}

.sep {
  color: var(--vp-c-text-2);
}

.chip-x {
  margin-left: 0.2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1;
}

.controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.25rem 0 0.75rem;
}

.result {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.result.good {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
}

.result-title {
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.result-value {
  margin-top: 0.25rem;
  font-weight: 900;
  font-size: 1.1rem;
}

.result-note {
  margin-top: 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.hint {
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.6;
}
</style>
