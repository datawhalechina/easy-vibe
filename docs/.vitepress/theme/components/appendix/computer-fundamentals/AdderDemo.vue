<template>
  <div class="adder-demo">
    <div class="demo-header">
      <span class="icon">🧮</span>
      <span class="title">加法器：CPU 怎么做加法？</span>
      <span class="subtitle">从手算竖式理解"逐位计算"的原理</span>
    </div>

    <div class="intro-section">
      <div class="intro-title">🎯 先看十进制竖式，理解"逐位计算"</div>
      <div class="decimal-demo">
        <div class="decimal-column">
          <div class="decimal-row label-row">被加数</div>
          <div class="decimal-row num-row">
            <span class="d-digit">{{ decimalA }}</span>
          </div>
        </div>
        <div class="decimal-column op-col">
          <div class="decimal-row label-row">+</div>
          <div class="decimal-row num-row">
            <span class="d-digit">{{ decimalB }}</span>
          </div>
        </div>
        <div class="decimal-column">
          <div class="decimal-row label-row">结果</div>
          <div class="decimal-row num-row result">
            <span class="d-digit">{{ decimalA + decimalB }}</span>
          </div>
        </div>
      </div>
      <div class="intro-hint">
        <span class="icon">💡</span>
        <span>手算时，我们从<strong>个位往高位</strong>一位一位算，<strong>逢十进一</strong>。CPU 做加法也一样，只是它只认识 0 和 1，所以要<strong>逢二进一</strong>。</span>
      </div>
    </div>

    <div class="concept-section">
      <div class="concept-title">📚 核心概念</div>
      <div class="concepts-grid">
        <div class="concept-card half-adder">
          <div class="concept-name">半加器</div>
          <div class="concept-simple">只算 A + B</div>
          <div class="concept-detail">
            <p>最右边一位用，因为<strong>没有进位进来</strong></p>
            <p class="formula">输入：A、B → 输出：和(S)、进位(C)</p>
          </div>
        </div>
        <div class="concept-card full-adder">
          <div class="concept-name">全加器</div>
          <div class="concept-simple">算 A + B + 进位</div>
          <div class="concept-detail">
            <p>其他位用，因为<strong>要加上一位的进位</strong></p>
            <p class="formula">输入：A、B、Cin → 输出：和(S)、进位(Cout)</p>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="demo-title">🎮 动手试试：二进制加法</div>
      <div class="control-row">
        <label class="input-group">
          <span class="input-label">A（被加数）</span>
          <input v-model.number="inputA" type="number" min="0" max="15" class="num-input" />
        </label>
        <span class="op-sign">+</span>
        <label class="input-group">
          <span class="input-label">B（加数）</span>
          <input v-model.number="inputB" type="number" min="0" max="15" class="num-input" />
        </label>
        <span class="op-sign">=</span>
        <span class="result-num">{{ resultDec }}</span>
      </div>

      <div class="binary-display">
        <div class="binary-row">
          <span class="binary-label">A</span>
          <span class="binary-bits">
            <span v-for="(b, i) in bitsA" :key="'a'+i" class="bit" :class="{ highlight: activeBit === (3 - i) }">{{ b }}</span>
          </span>
          <span class="binary-dec">= {{ inputA }}</span>
        </div>
        <div class="binary-row">
          <span class="binary-label">B</span>
          <span class="binary-bits">
            <span v-for="(b, i) in bitsB" :key="'b'+i" class="bit" :class="{ highlight: activeBit === (3 - i) }">{{ b }}</span>
          </span>
          <span class="binary-dec">= {{ inputB }}</span>
        </div>
        <div class="binary-row result-row">
          <span class="binary-label">结果</span>
          <span class="binary-bits">
            <span v-for="(b, i) in bitsSum" :key="'s'+i" class="bit" :class="{ highlight: activeBit === (3 - i) }">{{ b }}</span>
          </span>
          <span class="binary-dec">= {{ fourBitResult }}</span>
        </div>
        <div class="bit-labels">
          <span v-for="i in 4" :key="i" class="bit-label">第{{ 4 - i }}位</span>
        </div>
      </div>

      <div class="stages-row">
        <div
          v-for="(stage, idx) in stages"
          :key="idx"
          class="stage-card"
          :class="{ active: activeBit === stage.bitPos }"
          @mouseenter="activeBit = stage.bitPos"
          @mouseleave="activeBit = null"
        >
          <div class="stage-header">
            <span class="stage-pos">第{{ stage.bitPos }}位</span>
            <span class="stage-type" :class="stage.carryIn !== null ? 'full' : 'half'">
              {{ stage.carryIn !== null ? '全加器' : '半加器' }}
            </span>
          </div>
          <div class="stage-io">
            <div class="io-line">
              <span class="io-tag a">A</span>
              <span class="io-val">{{ stage.a }}</span>
            </div>
            <div class="io-line">
              <span class="io-tag b">B</span>
              <span class="io-val">{{ stage.b }}</span>
            </div>
            <div v-if="stage.carryIn !== null" class="io-line">
              <span class="io-tag cin">Cin</span>
              <span class="io-val">{{ stage.carryIn }}</span>
            </div>
          </div>
          <div class="stage-divider"></div>
          <div class="stage-io">
            <div class="io-line">
              <span class="io-tag s">S</span>
              <span class="io-val sum">{{ stage.sum }}</span>
            </div>
            <div class="io-line">
              <span class="io-tag cout">Cout</span>
              <span class="io-val">{{ stage.carryOut }}</span>
            </div>
          </div>
          <div v-if="idx < 3" class="carry-arrow" :class="{ hasCarry: stage.carryOut }">
            {{ stage.carryOut ? '→ 进位' : '' }}
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>每位加法器接收 A、B 和上一位的进位，输出本位的和与传给下一位的进位。就像手算竖式"逢二进一"，只是用电路自动完成。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const decimalA = 35
const decimalB = 47

const inputA = ref(3)
const inputB = ref(2)
const activeBit = ref(null)

function clamp(n) {
  const v = Number(n)
  if (Number.isNaN(v)) return 0
  return Math.max(0, Math.min(15, Math.floor(v)))
}

const clampedA = computed(() => clamp(inputA.value))
const clampedB = computed(() => clamp(inputB.value))

const bitsA = computed(() => (clampedA.value >>> 0).toString(2).padStart(4, '0').split(''))
const bitsB = computed(() => (clampedB.value >>> 0).toString(2).padStart(4, '0').split(''))

const stages = computed(() => {
  const A = clampedA.value
  const B = clampedB.value
  const result = []
  let carryIn = null
  for (let i = 0; i < 4; i++) {
    const a = (A >> i) & 1
    const b = (B >> i) & 1
    let sum, carryOut
    if (carryIn === null) {
      sum = a ^ b
      carryOut = a & b
    } else {
      sum = (a ^ b) ^ carryIn
      carryOut = (a & b) | (carryIn & (a ^ b))
    }
    result.push({
      bitPos: i,
      a,
      b,
      carryIn: carryIn === null ? null : carryIn,
      sum,
      carryOut
    })
    carryIn = carryOut
  }
  return result
})

const bitsSum = computed(() => {
  const S = stages.value.reduce((acc, s, i) => acc + (s.sum << i), 0)
  return (S >>> 0).toString(2).padStart(4, '0').split('')
})

const fourBitResult = computed(() =>
  stages.value.reduce((acc, s, i) => acc + (s.sum << i), 0)
)

const overflow = computed(() => clampedA.value + clampedB.value > 15)
const resultDec = computed(() =>
  overflow.value ? `${fourBitResult.value}（4位溢出）` : String(fourBitResult.value)
)
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.25rem; }

.intro-section {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.intro-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.decimal-demo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.decimal-column {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.decimal-column.op-col {
  min-width: 2rem;
  text-align: center;
}

.decimal-row {
  font-size: 0.85rem;
}

.decimal-row.label-row {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.decimal-row.num-row {
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: bold;
}

.decimal-row.num-row.result {
  color: var(--vp-c-brand-1);
}

.d-digit {
  display: inline-block;
  min-width: 1.5rem;
  text-align: center;
}

.intro-hint {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.intro-hint .icon {
  flex-shrink: 0;
}

.concept-section {
  margin-bottom: 0.75rem;
}

.concept-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.concepts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.concept-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
}

.concept-name {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.concept-simple {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.concept-detail {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.concept-detail p {
  margin: 0;
}

.concept-detail .formula {
  margin-top: 0.2rem;
  font-family: monospace;
  color: var(--vp-c-text-3);
}

.half-adder .concept-name { color: var(--vp-c-brand-1); }
.full-adder .concept-name { color: #8b5cf6; }

.demo-section {
  margin-bottom: 0.5rem;
}

.demo-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.input-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.num-input {
  width: 3rem;
  padding: 0.2rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.85rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.op-sign {
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.result-num {
  font-weight: bold;
  color: var(--vp-c-brand-1);
  font-size: 0.95rem;
}

.binary-display {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
}

.binary-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
  font-size: 0.85rem;
}

.binary-label {
  color: var(--vp-c-text-2);
  min-width: 2.5rem;
}

.binary-bits {
  display: flex;
  gap: 0.2rem;
  font-family: monospace;
}

.bit {
  display: inline-block;
  min-width: 1.2rem;
  text-align: center;
  padding: 0.1rem 0.15rem;
  border-radius: 3px;
  transition: all 0.15s ease;
}

.bit.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.binary-dec {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  margin-left: 0.25rem;
}

.result-row .binary-bits {
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.bit-labels {
  display: flex;
  gap: 0.2rem;
  margin-left: 3rem;
  margin-top: 0.15rem;
}

.bit-label {
  min-width: 1.2rem;
  text-align: center;
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.stages-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}

.stage-card.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stage-pos {
  font-size: 0.7rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.stage-type {
  font-size: 0.65rem;
  font-weight: bold;
  padding: 0.1rem 0.25rem;
  border-radius: 3px;
}

.stage-type.half {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.stage-type.full {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

.stage-io {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.io-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;
}

.io-tag {
  font-size: 0.6rem;
  font-weight: bold;
  padding: 0.05rem 0.2rem;
  border-radius: 2px;
  color: white;
}

.io-tag.a { background: var(--vp-c-brand-1); }
.io-tag.b { background: #8b5cf6; }
.io-tag.cin { background: #d97706; }
.io-tag.s { background: var(--vp-c-green-1, #16a34a); }
.io-tag.cout { background: #d97706; }

.io-val {
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: bold;
}

.io-val.sum {
  color: var(--vp-c-green-1, #16a34a);
}

.stage-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 0.2rem 0;
}

.carry-arrow {
  position: absolute;
  right: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.6rem;
  color: #d97706;
  white-space: nowrap;
}

.carry-arrow.hasCarry {
  font-weight: bold;
}

.info-box {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  background: var(--vp-c-bg-alt);
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .stages-row {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .concepts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
