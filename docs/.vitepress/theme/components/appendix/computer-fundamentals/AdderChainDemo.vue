<template>
  <div class="adder-chain-demo">
    <div class="demo-header">
      <span class="title">行波进位加法器 (Ripple Carry Adder)</span>
      <span class="subtitle">多个全加器级联，实现多位二进制加法</span>
    </div>

    <div class="terms-box">
      <div class="term-item">
        <span class="term-name">级联</span>
        <span class="term-desc">低位 Cout 连接高位 Cin</span>
      </div>
      <div class="term-item">
        <span class="term-name">行波</span>
        <span class="term-desc">进位像波浪一样逐位传递</span>
      </div>
      <div class="term-item">
        <span class="term-name">溢出</span>
        <span class="term-desc">最高位产生进位，结果超出范围</span>
      </div>
    </div>

    <div class="control-panel">
      <div class="bit-selector">
        <span class="selector-label">位数：</span>
        <button
          v-for="b in [2, 4, 8]"
          :key="b"
          class="bit-btn"
          :class="{ active: bitCount === b }"
          @click="bitCount = b"
        >
          {{ b }} 位
        </button>
      </div>
      <div class="input-group">
        <label class="input-label">
          <span>A =</span>
          <input
            v-model.number="inputA"
            type="number"
            :min="0"
            :max="maxValue"
            class="num-input"
          />
        </label>
        <span class="op">+</span>
        <label class="input-label">
          <span>B =</span>
          <input
            v-model.number="inputB"
            type="number"
            :min="0"
            :max="maxValue"
            class="num-input"
          />
        </label>
        <span class="op">=</span>
        <span class="result">{{ resultDec }}</span>
        <span v-if="overflow" class="overflow-badge">溢出</span>
      </div>
    </div>

    <div class="binary-display">
      <div class="binary-row">
        <span class="binary-label">A</span>
        <span class="binary-bits">
          <span
            v-for="(b, i) in bitsA"
            :key="'a' + i"
            class="bit"
            :class="{ hl: activeBit === (bitCount - 1 - i) }"
            >{{ b }}</span>
        </span>
        <span class="binary-dec">({{ clampedA }})</span>
      </div>
      <div class="binary-row">
        <span class="binary-label">B</span>
        <span class="binary-bits">
          <span
            v-for="(b, i) in bitsB"
            :key="'b' + i"
            class="bit"
            :class="{ hl: activeBit === (bitCount - 1 - i) }"
            >{{ b }}</span>
        </span>
        <span class="binary-dec">({{ clampedB }})</span>
      </div>
      <div class="binary-row result-row">
        <span class="binary-label">=</span>
        <span class="binary-bits">
          <span
            v-for="(b, i) in bitsSum"
            :key="'s' + i"
            class="bit result-bit"
            :class="{ hl: activeBit === (bitCount - 1 - i) }"
            >{{ b }}</span>
        </span>
        <span class="binary-dec">({{ resultDec }}{{ overflow ? ' 溢出' : '' }})</span>
      </div>
    </div>

    <div class="chain-visualization">
      <div class="chain-header">
        <span class="chain-title">加法器级联</span>
        <span class="chain-hint">悬停查看每位计算详情</span>
      </div>
      <div class="chain-row">
        <div
          v-for="(stage, idx) in stages"
          :key="idx"
          class="stage-box"
          :class="{ active: activeBit === idx, first: idx === 0 }"
          @mouseenter="activeBit = idx"
          @mouseleave="activeBit = null"
        >
          <div class="stage-header">
            <span class="stage-bit">第{{ idx }}位</span>
            <span class="stage-type">{{
              idx === 0 ? '半加器' : '全加器'
            }}</span>
          </div>
          <div class="stage-io">
            <div class="io-row">
              <span class="io-tag a">A</span>
              <span class="io-val">{{ stage.a }}</span>
              <span class="io-tag b">B</span>
              <span class="io-val">{{ stage.b }}</span>
              <span v-if="stage.cin !== null" class="io-tag cin">Cin</span>
              <span v-if="stage.cin !== null" class="io-val">{{
                stage.cin
              }}</span>
            </div>
            <div class="io-divider"></div>
            <div class="io-row">
              <span class="io-tag sum">Sum</span>
              <span class="io-val result">{{ stage.sum }}</span>
              <span class="io-tag cout">Cout</span>
              <span class="io-val" :class="{ carry: stage.cout }">{{
                stage.cout
              }}</span>
            </div>
          </div>
          <div v-if="idx < stages.length - 1 && stage.cout" class="carry-arrow">
            <svg width="20" height="12" viewBox="0 0 20 12">
              <path
                d="M 0,6 L 15,6 M 12,3 L 15,6 L 12,9"
                fill="none"
                stroke="#d97706"
                stroke-width="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeBit !== null" class="calculation-box">
      <div class="calc-title">第 {{ activeBit }} 位计算过程</div>
      <div class="calc-content">
        <div class="calc-row">
          <span class="calc-label">输入：</span>
          <span class="calc-value">A = {{ stages[activeBit]?.a }}，B = {{ stages[activeBit]?.b
            }}<span v-if="stages[activeBit]?.cin !== null">，Cin = {{ stages[activeBit]?.cin }}</span></span>
        </div>
        <div class="calc-row">
          <span class="calc-label">本位：</span>
          <span class="calc-formula">
            {{ stages[activeBit]?.a }} XOR {{ stages[activeBit]?.b }}
            <span v-if="stages[activeBit]?.cin !== null">
              XOR {{ stages[activeBit]?.cin }}</span>
            = <strong>{{ stages[activeBit]?.sum }}</strong>
          </span>
          <span class="calc-reason">（{{ getSumReason(stages[activeBit]) }}）</span>
        </div>
        <div class="calc-row">
          <span class="calc-label">进位：</span>
          <span class="calc-formula">
            {{ stages[activeBit]?.cout ? '产生进位 → 传递给高位' : '无进位' }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="calculation-box">
      <div class="calc-title">整体计算过程</div>
      <div class="calc-content">
        <div class="calc-row">
          <span class="calc-label">输入：</span>
          <span class="calc-value">A = {{ clampedA }} ({{ bitsA.join('') }})，B = {{ clampedB }} ({{
              bitsB.join('')
            }})</span>
        </div>
        <div class="calc-row">
          <span class="calc-label">过程：</span>
          <span class="calc-formula">从第 0 位开始，逐位计算本位和进位，进位向高位传递</span>
        </div>
        <div class="calc-row">
          <span class="calc-label">结果：</span>
          <span class="calc-formula">{{ bitsSum.join('') }} = <strong>{{ resultDec }}</strong>{{ overflow ? ' (溢出)' : '' }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      进位像波浪一样从最低位逐级传递到最高位，所以叫"行波进位"。位数越多，延迟越大，但电路简单。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const bitCount = ref(4)
const inputA = ref(7)
const inputB = ref(6)
const activeBit = ref(null)

const maxValue = computed(() => Math.pow(2, bitCount.value) - 1)

function clamp(n) {
  const v = Number(n)
  if (Number.isNaN(v)) return 0
  return Math.max(0, Math.min(maxValue.value, Math.floor(v)))
}

const clampedA = computed(() => clamp(inputA.value))
const clampedB = computed(() => clamp(inputB.value))

const bitsA = computed(() =>
  (clampedA.value >>> 0).toString(2).padStart(bitCount.value, '0').split('')
)

const bitsB = computed(() =>
  (clampedB.value >>> 0).toString(2).padStart(bitCount.value, '0').split('')
)

const stages = computed(() => {
  const A = clampedA.value
  const B = clampedB.value
  const result = []
  let carryIn = null

  for (let i = 0; i < bitCount.value; i++) {
    const a = (A >> i) & 1
    const b = (B >> i) & 1
    let sum, carryOut

    if (carryIn === null) {
      sum = a ^ b
      carryOut = a & b
    } else {
      const xor1 = a ^ b
      sum = xor1 ^ carryIn
      carryOut = (a & b) | (carryIn & xor1)
    }

    result.push({
      bitPos: i,
      a,
      b,
      cin: carryIn,
      sum,
      cout: carryOut
    })
    carryIn = carryOut
  }

  return result
})

const bitsSum = computed(() => {
  const S = stages.value.reduce((acc, s, i) => acc + (s.sum << i), 0)
  return (S >>> 0).toString(2).padStart(bitCount.value, '0').split('')
})

const overflow = computed(() => {
  return (
    stages.value.length > 0 && stages.value[stages.value.length - 1].cout === 1
  )
})

const resultDec = computed(() =>
  stages.value.reduce((acc, s, i) => acc + (s.sum << i), 0)
)

function getSumReason(stage) {
  if (!stage) return ''
  const inputs = [stage.a, stage.b]
  if (stage.cin !== null) inputs.push(stage.cin)
  const ones = inputs.filter((x) => x === 1).length
  if (stage.sum === 1) {
    return ones % 2 === 1 ? '奇数个 1' : '偶数个 1'
  } else {
    return ones % 2 === 0 ? '偶数个 1' : '奇数个 1'
  }
}
</script>

<style scoped>
.adder-chain-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 0.75rem;
}

.title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.terms-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.term-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.term-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.term-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.bit-selector {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.selector-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.bit-btn {
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s;
}

.bit-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.num-input {
  width: 3.5rem;
  padding: 0.2rem 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.op {
  font-weight: bold;
  color: var(--vp-c-text-3);
}

.result {
  font-weight: bold;
  color: var(--vp-c-brand-1);
  font-size: 1rem;
}

.overflow-badge {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  background: #fef3c7;
  color: #d97706;
  border-radius: 3px;
  font-weight: 600;
}

.binary-display {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
}

.binary-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
  font-size: 0.82rem;
}

.binary-label {
  color: var(--vp-c-text-2);
  min-width: 1.5rem;
  font-weight: 600;
}

.binary-bits {
  display: flex;
  gap: 0.15rem;
  font-family: 'JetBrains Mono', monospace;
}

.bit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.2rem;
  height: 1.4rem;
  border-radius: 3px;
  transition: all 0.15s;
}

.bit.hl {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.result-bit {
  font-weight: 600;
}

.binary-dec {
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
  margin-left: 0.25rem;
}

.result-row .binary-bits {
  color: var(--vp-c-green-1, #16a34a);
}

.chain-visualization {
  margin-bottom: 0.75rem;
}

.chain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.chain-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.chain-hint {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.chain-row {
  display: flex;
  gap: 0.3rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.stage-box {
  flex-shrink: 0;
  width: 5.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}

.stage-box.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.stage-box.first {
  border-color: var(--vp-c-brand-soft);
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stage-bit {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.stage-type {
  font-size: 0.6rem;
  padding: 0.1rem 0.25rem;
  border-radius: 3px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.stage-box.first .stage-type {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

.stage-io {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.io-row {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  font-size: 0.72rem;
}

.io-tag {
  font-size: 0.55rem;
  font-weight: 600;
  padding: 0.05rem 0.2rem;
  border-radius: 2px;
  color: white;
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
.io-tag.sum {
  background: var(--vp-c-green-1, #16a34a);
}
.io-tag.cout {
  background: #d97706;
}

.io-val {
  font-family: 'JetBrains Mono', monospace;
  color: var(--vp-c-text-1);
}

.io-val.result {
  font-weight: 600;
  color: var(--vp-c-green-1, #16a34a);
}

.io-val.carry {
  color: #d97706;
  font-weight: 600;
}

.io-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 0.15rem 0;
}

.carry-arrow {
  position: absolute;
  right: -1.3rem;
  top: 50%;
  transform: translateY(-50%);
}

.calculation-box {
  margin-top: 0.75rem;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.calc-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.calc-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.calc-row {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  font-size: 0.78rem;
}

.calc-label {
  color: var(--vp-c-text-3);
  min-width: 3rem;
}

.calc-formula {
  font-family: 'JetBrains Mono', monospace;
  color: var(--vp-c-text-1);
}

.calc-formula strong {
  color: var(--vp-c-brand-1);
}

.calc-reason {
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 600px) {
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }
  .chain-row {
    gap: 0.2rem;
  }
  .stage-box {
    width: 5rem;
  }
  .terms-box {
    flex-direction: column;
  }
}
</style>
