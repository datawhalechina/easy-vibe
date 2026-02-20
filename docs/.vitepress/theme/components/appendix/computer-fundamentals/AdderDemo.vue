<template>
  <div class="adder-demo">
    <div class="demo-header">
      <span class="title">加法器：用逻辑门做加法</span>
      <span class="subtitle">从逻辑门到算术运算</span>
    </div>

    <div class="demo-content">
      <div class="adder-controls">
        <div class="input-group">
          <label>A:</label>
          <div class="bits">
            <button 
              v-for="(bit, i) in bitsA" 
              :key="'a'+i"
              class="bit-btn"
              :class="{ on: bit }"
              @click="toggleBit('A', i)"
            >
              {{ bit }}
            </button>
          </div>
          <span class="decimal">= {{ decimalA }}</span>
        </div>
        <div class="operator">
          +
        </div>
        <div class="input-group">
          <label>B:</label>
          <div class="bits">
            <button 
              v-for="(bit, i) in bitsB" 
              :key="'b'+i"
              class="bit-btn"
              :class="{ on: bit }"
              @click="toggleBit('B', i)"
            >
              {{ bit }}
            </button>
          </div>
          <span class="decimal">= {{ decimalB }}</span>
        </div>
      </div>

      <div class="adder-visual">
        <div
          v-for="(s, i) in stages"
          :key="i"
          class="adder-stage"
        >
          <div class="stage-label">
            {{ s.label }}
          </div>
          <div class="stage-bits">
            <span class="bit-label">A{{ 3-i }}: {{ bitsA[i] }}</span>
            <span class="bit-label">B{{ 3-i }}: {{ bitsB[i] }}</span>
            <span
              v-if="i > 0"
              class="bit-label"
            >C{{ i }}: {{ carries[i-1] }}</span>
          </div>
          <div class="stage-result">
            <span class="sum-bit">S{{ 3-i }}: {{ sumBits[i] }}</span>
            <span class="carry-bit">C{{ i+1 }}: {{ carries[i] }}</span>
          </div>
        </div>
      </div>

      <div class="result-display">
        <div class="result-row">
          <span class="result-label">二进制结果:</span>
          <span class="result-bits">{{ resultBinary }}</span>
        </div>
        <div class="result-row">
          <span class="result-label">十进制验证:</span>
          <span class="result-decimal">{{ decimalA }} + {{ decimalB }} = {{ resultDecimal }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>加法器用全加器级联实现。每个全加器处理一位，产生"和"与"进位"。进位传递给下一位，就像我们手算加法一样。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const bitsA = ref([0, 0, 1, 1])
const bitsB = ref([0, 0, 1, 0])

const toggleBit = (arr, i) => {
  if (arr === 'A') {
    bitsA.value[i] = bitsA.value[i] ? 0 : 1
  } else {
    bitsB.value[i] = bitsB.value[i] ? 0 : 1
  }
}

const decimalA = computed(() => {
  return bitsA.value.reduce((acc, bit, i) => acc + bit * Math.pow(2, 3-i), 0)
})

const decimalB = computed(() => {
  return bitsB.value.reduce((acc, bit, i) => acc + bit * Math.pow(2, 3-i), 0)
})

const carries = computed(() => {
  const c = [0, 0, 0, 0]
  for (let i = 3; i >= 0; i--) {
    const sum = bitsA.value[i] + bitsB.value[i] + (i < 3 ? c[i+1] : 0)
    c[i] = sum >= 2 ? 1 : 0
  }
  return c
})

const sumBits = computed(() => {
  const s = [0, 0, 0, 0]
  for (let i = 3; i >= 0; i--) {
    const sum = bitsA.value[i] + bitsB.value[i] + (i < 3 ? carries.value[i+1] : 0)
    s[i] = sum % 2
  }
  return s
})

const resultBinary = computed(() => {
  const allBits = [carries.value[0], ...sumBits.value]
  return allBits.join('')
})

const resultDecimal = computed(() => {
  return decimalA.value + decimalB.value
})

const stages = [
  { label: '第4位 (个位)' },
  { label: '第3位' },
  { label: '第2位' },
  { label: '第1位 (最高位)' }
]
</script>

<style scoped>
.adder-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.adder-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-group label {
  font-weight: bold;
  font-size: 0.9rem;
}

.bits {
  display: flex;
  gap: 0.25rem;
}

.bit-btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.bit-btn.on {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.decimal {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.operator {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.adder-visual {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.adder-stage {
  flex: 1;
  min-width: 100px;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.stage-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.25rem;
}

.stage-bits {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.bit-label {
  color: var(--vp-c-text-2);
}

.stage-result {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: bold;
}

.sum-bit {
  color: var(--vp-c-brand);
}

.carry-bit {
  color: var(--vp-c-warning);
}

.result-display {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.result-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.result-row:last-child {
  margin-bottom: 0;
}

.result-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.result-bits {
  font-family: monospace;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.result-decimal {
  font-weight: bold;
  color: var(--vp-c-success);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

</style>
