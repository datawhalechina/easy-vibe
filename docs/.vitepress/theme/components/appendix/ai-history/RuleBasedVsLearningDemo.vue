<template>
  <div class="rule-learning-demo">
    <div class="demo-grid">
      <!-- Rule Based System -->
      <div class="panel rule-based">
        <div class="panel-header">
          <span class="icon">📜</span> Rule-Based System
        </div>
        <div class="panel-body">
          <div class="code-block">
            if (size >
            <input v-model="ruleThreshold" type="number" class="mini-input" />)
            {<br />
            &nbsp;&nbsp;return "Big 🍎"<br />
            } else {<br />
            &nbsp;&nbsp;return "Small 🍒"<br />
            }
          </div>
          <div class="test-area">
            Test Input:
            <input
              v-model="testInput"
              type="range"
              min="1"
              max="10"
              class="slider"
            />
            {{ testInput }}
            <div
              class="result-box"
              :class="ruleResult === 'Big 🍎' ? 'big' : 'small'"
            >
              Result: {{ ruleResult }}
            </div>
          </div>
          <div class="note">You must explicitly program the rule.</div>
        </div>
      </div>

      <!-- Machine Learning System -->
      <div class="panel learning">
        <div class="panel-header">
          <span class="icon">🧠</span> Machine Learning
        </div>
        <div class="panel-body">
          <div class="training-data">
            <div class="data-point" v-for="(p, i) in trainingData" :key="i">
              {{ p.size }}={{ p.label }}
            </div>
            <button class="train-btn" @click="trainModel" :disabled="isTrained">
              {{ isTrained ? 'Model Trained ✅' : '⚡ Train Model' }}
            </button>
          </div>

          <div class="test-area">
            Test Input:
            <input
              v-model="testInput"
              type="range"
              min="1"
              max="10"
              class="slider"
            />
            {{ testInput }}
            <div
              class="result-box"
              :class="mlResult === 'Big 🍎' ? 'big' : 'small'"
            >
              Result: {{ mlResult }}
            </div>
          </div>
          <div class="note">
            Model "learned" threshold is ~{{ learnedThreshold }}. <br />
            (Derived from data, not coded)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const testInput = ref(5)

// Rule Based Logic
const ruleThreshold = ref(6)
const ruleResult = computed(() => {
  return testInput.value > ruleThreshold.value ? 'Big 🍎' : 'Small 🍒'
})

// ML Logic
const trainingData = [
  { size: 2, label: '🍒' },
  { size: 3, label: '🍒' },
  { size: 8, label: '🍎' },
  { size: 9, label: '🍎' }
]
const isTrained = ref(false)
const learnedThreshold = ref(5.5) // Simplified mock learning

const trainModel = () => {
  // Simulate training delay
  setTimeout(() => {
    isTrained.value = true
  }, 500)
}

const mlResult = computed(() => {
  if (!isTrained.value) return '❓ Untrained'
  return testInput.value > learnedThreshold.value ? 'Big 🍎' : 'Small 🍒'
})
</script>

<style scoped>
.rule-learning-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  padding: 0.8rem;
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.code-block {
  background: #1e1e2e;
  color: #a6accd;
  padding: 0.8rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}

.mini-input {
  width: 40px;
  background: #334155;
  border: 1px solid #475569;
  color: white;
  border-radius: 2px;
  text-align: center;
}

.test-area {
  background: var(--vp-c-bg-soft);
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
}

.slider {
  width: 100%;
  margin: 0.5rem 0;
}

.result-box {
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: white;
  border: 1px solid var(--vp-c-divider);
}
.result-box.big {
  color: #ef4444;
  border-color: #fecaca;
  background: #fef2f2;
}
.result-box.small {
  color: #db2777;
  border-color: #fce7f3;
  background: #fdf2f8;
}

.note {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-style: italic;
  text-align: center;
}

.training-data {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.data-point {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
}

.train-btn {
  width: 100%;
  padding: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.train-btn:disabled {
  background: #10b981;
  cursor: default;
}
</style>
