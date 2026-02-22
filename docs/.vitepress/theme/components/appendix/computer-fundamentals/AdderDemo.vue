<template>
  <div class="adder-demo">
    <div class="demo-header">
      <span class="title">加法器：用逻辑门做二进制加法</span>
      <span class="subtitle">就像手算竖式：从个位往高位算，逢二进一，进位往左传</span>
    </div>

    <div class="control-panel">
      <label>
        <span class="control-label">A（被加数）</span>
        <input v-model.number="inputA" type="number" min="0" max="15" class="num-input" />
      </label>
      <span class="op">+</span>
      <label>
        <span class="control-label">B（加数）</span>
        <input v-model.number="inputB" type="number" min="0" max="15" class="num-input" />
      </label>
      <span class="eq">=</span>
      <span class="result-dec">{{ resultDec }}</span>
    </div>

    <div class="why-what-box">
      <p class="why-p">
        <strong>为啥要看这些？</strong>CPU 只会处理 0 和 1，所以加法要「一位一位」算；每一列（第 0 位、第 1 位…）都需要一个小电路来算「这一位写几、要不要往左进位」。
      </p>
      <p class="what-p">
        <strong>这些词是啥？</strong>
        <span class="term">半加器</span>：只算这一位的 A+B（最右边没有进位进来）。  
        <span class="term">全加器</span>：算 A+B+上一位的进位。  
        <span class="term">S</span>：这一位写下的数字（0 或 1）。  
        <span class="term">Cout</span>：要不要往左边一位进 1（进就是 1，不进就是 0）。
      </p>
    </div>

    <div class="example-block">
      <div class="example-row">
        <span class="example-label">A（被加数）</span>
        <span class="example-bits">
          <span v-for="(b, i) in bitsA" :key="'a'+i" class="bit" :class="{ active: highlightedBit === (3 - i) }">{{ b }}</span>
        </span>
        <span class="example-dec">= {{ inputA }}</span>
      </div>
      <div class="example-row">
        <span class="example-label">B（加数）</span>
        <span class="example-bits">
          <span v-for="(b, i) in bitsB" :key="'b'+i" class="bit" :class="{ active: highlightedBit === (3 - i) }">{{ b }}</span>
        </span>
        <span class="example-dec">= {{ inputB }}</span>
      </div>
      <div class="example-row result-row">
        <span class="example-label">结果</span>
        <span class="example-bits">
          <span v-for="(b, i) in bitsSum" :key="'s'+i" class="bit" :class="{ active: highlightedBit === (3 - i) }">{{ b }}</span>
        </span>
        <span class="example-dec">= {{ resultDec }}</span>
      </div>
      <div class="bit-legend">
        <span v-for="i in 4" :key="i" class="bit-legend-item">第{{ 4 - i }}位</span>
      </div>
    </div>

    <div class="stages-label">逐位计算（从右往左：第 0 位 → 第 3 位，对应上面每一列）</div>
    <div class="adder-stages">
      <div
        v-for="(stage, idx) in stages"
        :key="idx"
        class="stage"
        :class="{ 'stage-highlight': highlightedBit === stage.bitPos }"
        @mouseenter="highlightedBit = stage.bitPos"
        @mouseleave="highlightedBit = null"
      >
        <div class="stage-title">第 {{ stage.bitPos }} 位（{{ stage.posName }}）</div>
        <div class="stage-content">
          <div class="io-col inputs-col">
            <div class="io-row">
              <span class="io-badge a-badge">A</span>
              <span class="io-val">{{ stage.a }}</span>
            </div>
            <div class="io-row">
              <span class="io-badge b-badge">B</span>
              <span class="io-val">{{ stage.b }}</span>
            </div>
            <div v-if="stage.carryIn !== null" class="io-row">
              <span class="io-badge cin-badge">Cin</span>
              <span class="io-val">{{ stage.carryIn }}</span>
            </div>
          </div>
          <div class="fa-box">
            <div class="fa-label">{{ stage.carryIn !== null ? '全加器' : '半加器' }}</div>
            <div class="fa-hint">{{ stage.carryIn !== null ? 'A+B+进位' : '只算 A+B' }}</div>
          </div>
          <div class="io-col outputs-col">
            <div class="io-row">
              <span class="io-badge s-badge" :title="'S = 这一位写下的数'">S</span>
              <span class="io-val sum-val">{{ stage.sum }}</span>
            </div>
            <div class="io-row">
              <span class="io-badge cout-badge" :title="'Cout = 往左进 0 还是 1'">Cout</span>
              <span class="io-val carry-val">{{ stage.carryOut }}</span>
            </div>
          </div>
        </div>
        <div v-if="idx < stages.length - 1" class="carry-hint" :class="{ 'no-carry': !stage.carryOut }">
          {{ stage.carryOut ? `进位 ${stage.carryOut} 传给第 ${stage.bitPos + 1} 位 →` : '无进位' }}
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>每位全加器接收 A、B 和上一位的进位（Cin），输出本位的和（S）与传给下一位的进位（Cout），和手算竖式「逢二进一」一致。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const POS_NAMES = ['最低位', '次低位', '次高位', '最高位']

function clamp(n) {
  const v = Number(n)
  if (Number.isNaN(v)) return 0
  return Math.max(0, Math.min(15, Math.floor(v)))
}

const inputA = ref(3)
const inputB = ref(2)
const highlightedBit = ref(null)

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
      posName: POS_NAMES[i],
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
  overflow.value ? `${fourBitResult.value}（4 位溢出）` : String(fourBitResult.value)
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
  margin-bottom: 0.35rem;
}

.demo-header .title {
  display: block;
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  display: block;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  font-weight: normal;
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
}

.control-panel label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.control-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.num-input {
  width: 3rem;
  padding: 0.25rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
}

.control-panel .op,
.control-panel .eq {
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.control-panel .result-dec {
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.why-what-box {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

.why-what-box .why-p {
  margin: 0 0 0.4rem;
}

.why-what-box .what-p {
  margin: 0;
}

.why-what-box .term {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-block {
  margin-bottom: 0.25rem;
}

.bit-legend {
  display: flex;
  gap: 0.25rem;
  margin-left: 6rem;
  margin-top: 0.2rem;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.bit-legend-item {
  min-width: 1.2em;
  text-align: center;
}

.example-row .example-bits {
  display: flex;
  gap: 0.25rem;
}

.bit {
  display: inline-block;
  min-width: 1.2em;
  text-align: center;
  padding: 0.1rem 0;
  border-radius: 3px;
  transition: background 0.15s ease;
}

.bit.active {
  background: var(--vp-c-brand-2);
  color: var(--vp-c-bg);
}

.stage.stage-highlight {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.example-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.example-label {
  color: var(--vp-c-text-2);
  min-width: 6rem;
}

.example-bits {
  font-family: monospace;
  font-variant-numeric: tabular-nums;
}

.example-dec {
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.result-row .example-bits {
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.stages-label {
  font-size: 0.85rem;
  font-weight: bold;
  margin: 0.75rem 0 0.4rem;
  color: var(--vp-c-text-2);
}

.adder-stages {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.stage {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stage-title {
  font-size: 0.72rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  text-align: center;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stage-content {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.io-col {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  flex: 1;
  min-width: 0;
}

.io-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;
}

.io-badge {
  font-size: 0.62rem;
  font-weight: bold;
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  flex-shrink: 0;
  color: white;
}

.a-badge { background: var(--vp-c-brand); }
.b-badge { background: #8b5cf6; }
.cin-badge { background: #d97706; }
.s-badge { background: var(--vp-c-success, #16a34a); }
.cout-badge { background: #d97706; }

.io-val {
  font-weight: bold;
  font-family: monospace;
  font-size: 0.85rem;
}

.sum-val { color: var(--vp-c-success, #16a34a); }
.carry-val { color: #d97706; }

.fa-box {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.3rem 0.35rem;
  flex-shrink: 0;
}

.fa-label {
  font-size: 0.68rem;
  font-weight: bold;
}

.fa-hint {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
}

.carry-hint {
  font-size: 0.65rem;
  color: #d97706;
  text-align: center;
  padding: 0.15rem 0;
}

.carry-hint.no-carry {
  color: var(--vp-c-text-3);
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .adder-stages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 440px) {
  .adder-stages {
    grid-template-columns: 1fr;
  }
}
</style>
