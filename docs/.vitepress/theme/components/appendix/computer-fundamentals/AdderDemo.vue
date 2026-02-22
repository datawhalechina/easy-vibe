<template>
  <div class="adder-demo">
    <div class="demo-label">
      二进制加法器 ── 输入 0–15 的两个数，观察逐位计算过程
    </div>

    <div class="control-row">
      <label class="input-group">
        <span class="input-label">A</span>
        <input
          v-model.number="inputA"
          type="number"
          min="0"
          max="15"
          class="num-input"
        />
      </label>
      <span class="op-sign">+</span>
      <label class="input-group">
        <span class="input-label">B</span>
        <input
          v-model.number="inputB"
          type="number"
          min="0"
          max="15"
          class="num-input"
        />
      </label>
      <span class="op-sign">=</span>
      <span class="result-num">{{ resultDec }}</span>
    </div>

    <div class="binary-display">
      <div class="binary-row">
        <span class="binary-label">A</span>
        <span class="binary-bits">
          <span
            v-for="(b, i) in bitsA"
            :key="'a' + i"
            class="bit"
            :class="{ hl: activeBit === 3 - i }"
            >{{ b }}</span
          >
        </span>
        <span class="binary-dec">= {{ clampedA }}</span>
      </div>
      <div class="binary-row">
        <span class="binary-label">B</span>
        <span class="binary-bits">
          <span
            v-for="(b, i) in bitsB"
            :key="'b' + i"
            class="bit"
            :class="{ hl: activeBit === 3 - i }"
            >{{ b }}</span
          >
        </span>
        <span class="binary-dec">= {{ clampedB }}</span>
      </div>
      <div class="binary-row sum-row">
        <span class="binary-label">结果</span>
        <span class="binary-bits">
          <span
            v-for="(b, i) in bitsSum"
            :key="'s' + i"
            class="bit"
            :class="{ hl: activeBit === 3 - i }"
            >{{ b }}</span
          >
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
        <div class="stage-head">
          <span class="stage-pos">第{{ stage.bitPos }}位</span>
          <span
            class="stage-type"
            :class="stage.carryIn !== null ? 'full' : 'half'"
          >
            {{ stage.carryIn !== null ? '全加器' : '半加器' }}
          </span>
        </div>
        <div class="stage-io">
          <span class="io-item"
            ><span class="io-tag a">A</span>{{ stage.a }}</span
          >
          <span class="io-item"
            ><span class="io-tag b">B</span>{{ stage.b }}</span
          >
          <span v-if="stage.carryIn !== null" class="io-item"
            ><span class="io-tag cin">Cin</span>{{ stage.carryIn }}</span
          >
        </div>
        <div class="stage-divider"></div>
        <div class="stage-io">
          <span class="io-item"
            ><span class="io-tag s">S</span
            ><strong>{{ stage.sum }}</strong></span
          >
          <span class="io-item"
            ><span class="io-tag cout">C</span>{{ stage.carryOut }}</span
          >
        </div>
      </div>
    </div>

    <div class="demo-caption">
      鼠标悬停某一位，查看该位加法器的输入 / 输出 · 就像手算竖式"逢二进一"
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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

const bitsA = computed(() =>
  (clampedA.value >>> 0).toString(2).padStart(4, '0').split('')
)
const bitsB = computed(() =>
  (clampedB.value >>> 0).toString(2).padStart(4, '0').split('')
)

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
      sum = a ^ b ^ carryIn
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
  overflow.value
    ? `${fourBitResult.value}（溢出）`
    : String(fourBitResult.value)
)
</script>

<style scoped>
.adder-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

/* ── controls ── */
.control-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.input-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.num-input {
  width: 3.2rem;
  padding: 0.25rem 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.op-sign {
  font-weight: bold;
  color: var(--vp-c-text-3);
}

.result-num {
  font-weight: bold;
  color: var(--vp-c-brand-1);
  font-size: 1rem;
}

/* ── binary ── */
.binary-display {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.6rem;
}

.binary-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.15rem;
  font-size: 0.85rem;
}

.binary-label {
  color: var(--vp-c-text-2);
  min-width: 2.5rem;
  font-weight: 600;
}

.binary-bits {
  display: flex;
  gap: 0.2rem;
  font-family: 'JetBrains Mono', monospace;
}

.bit {
  display: inline-block;
  min-width: 1.3rem;
  text-align: center;
  padding: 0.1rem 0.15rem;
  border-radius: 3px;
  transition: all 0.15s;
}

.bit.hl {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.binary-dec {
  color: var(--vp-c-text-3);
  font-size: 0.78rem;
  margin-left: 0.25rem;
}

.sum-row .binary-bits {
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.bit-labels {
  display: flex;
  gap: 0.2rem;
  margin-left: 3rem;
  margin-top: 0.1rem;
}

.bit-label {
  min-width: 1.3rem;
  text-align: center;
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
}

/* ── stages ── */
.stages-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.45rem;
  cursor: pointer;
  transition: all 0.15s;
}

.stage-card.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.stage-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stage-pos {
  font-size: 0.68rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.stage-type {
  font-size: 0.6rem;
  font-weight: bold;
  padding: 0.08rem 0.25rem;
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
  gap: 0.1rem;
}

.io-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
}

.io-tag {
  font-size: 0.55rem;
  font-weight: bold;
  padding: 0.04rem 0.18rem;
  border-radius: 2px;
  color: white;
  font-family: system-ui;
}

.io-tag.a {
  background: var(--vp-c-brand-1);
}
.io-tag.b {
  background: #8b5cf6;
}
.io-tag.cin {
  background: #d97706;
}
.io-tag.s {
  background: var(--vp-c-green-1, #16a34a);
}
.io-tag.cout {
  background: #d97706;
}

.stage-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 0.2rem 0;
}

.demo-caption {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

@media (max-width: 600px) {
  .stages-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
