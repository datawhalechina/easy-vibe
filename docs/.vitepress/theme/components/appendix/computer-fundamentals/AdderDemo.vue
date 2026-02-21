<template>
  <div class="adder-demo">
    <div class="demo-header">
      <span class="title">加法器：用逻辑门做二进制加法</span>
      <span class="subtitle">点击蓝色位按钮切换 0/1，观察进位如何逐位传递</span>
    </div>

    <!-- 名词解释 -->
    <div class="legend">
      <span class="legend-item"><span class="dot a" />A = 被加数</span>
      <span class="legend-item"><span class="dot b" />B = 加数</span>
      <span class="legend-item"><span class="dot s" />S = 和（Sum，本位结果）</span>
      <span class="legend-item"><span class="dot c" />C = 进位（Carry，传给下一位）</span>
    </div>

    <!-- 输入控制 -->
    <div class="control-panel">
      <div class="input-group">
        <span class="group-label">A（被加数）</span>
        <div class="bits">
          <button
            v-for="(bit, i) in bitsA"
            :key="'a' + i"
            class="bit-btn"
            :class="{ on: bit }"
            @click="toggleBit('A', i)"
          >
            {{ bit }}
          </button>
        </div>
        <span class="decimal">= {{ decimalA }}</span>
      </div>
      <div class="op-sign">+</div>
      <div class="input-group">
        <span class="group-label">B（加数）</span>
        <div class="bits">
          <button
            v-for="(bit, i) in bitsB"
            :key="'b' + i"
            class="bit-btn"
            :class="{ on: bit }"
            @click="toggleBit('B', i)"
          >
            {{ bit }}
          </button>
        </div>
        <span class="decimal">= {{ decimalB }}</span>
      </div>
      <div class="op-sign">=</div>
      <div class="result-inline">
        <span class="result-bin">{{ resultBinary }}</span>
        <span class="result-dec">（十进制 {{ resultDecimal }}）</span>
      </div>
    </div>

    <!-- 每位加法器展示 -->
    <div class="stages-label">逐位计算过程（从最低位开始）</div>
    <div class="adder-stages">
      <div
        v-for="(stage, idx) in stageData"
        :key="idx"
        class="stage"
      >
        <div class="stage-title">第 {{ stage.bitPos }} 位（{{ stage.posName }}）</div>

        <div class="stage-content">
          <!-- 输入列 -->
          <div class="io-col inputs-col">
            <div class="io-row">
              <span class="io-badge a-badge">A</span>
              <span class="io-val">{{ stage.a }}</span>
            </div>
            <div class="io-row">
              <span class="io-badge b-badge">B</span>
              <span class="io-val">{{ stage.b }}</span>
            </div>
            <div v-if="stage.carryIn !== null" class="io-row carry-in-row">
              <span class="io-badge cin-badge">Cin</span>
              <span class="io-val">{{ stage.carryIn }}</span>
            </div>
          </div>

          <!-- 全加器框 -->
          <div class="fa-box">
            <div class="fa-label">{{ stage.carryIn !== null ? '全加器' : '半加器' }}</div>
            <div class="fa-hint">{{ stage.carryIn !== null ? 'Full Adder' : 'Half Adder' }}</div>
          </div>

          <!-- 输出列 -->
          <div class="io-col outputs-col">
            <div class="io-row">
              <span class="io-badge s-badge">S</span>
              <span class="io-val sum-val">{{ stage.sum }}</span>
            </div>
            <div class="io-row">
              <span class="io-badge cout-badge">Cout</span>
              <span class="io-val carry-val">{{ stage.carryOut }}</span>
            </div>
          </div>
        </div>

        <!-- 进位传递提示 -->
        <div v-if="idx < stageData.length - 1 && stage.carryOut" class="carry-hint">
          进位 {{ stage.carryOut }} 传给第 {{ stage.bitPos + 1 }} 位 →
        </div>
        <div v-else-if="idx < stageData.length - 1" class="carry-hint no-carry">
          无进位
        </div>
      </div>
    </div>

    <!-- 结果 -->
    <div class="result-bar">
      <div class="result-row">
        <span class="result-label">二进制结果</span>
        <span class="result-bits">{{ resultBinary }}</span>
      </div>
      <div class="result-row">
        <span class="result-label">十进制验证</span>
        <span class="result-eq">{{ decimalA }} + {{ decimalB }} = {{ resultDecimal }}</span>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>每位全加器接收 A、B 和上一位的进位（Cin），输出本位的和（S）与向上传递的进位（Cout）——和我们手算竖式加法"逢二进一"完全一致。
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

const decimalA = computed(() =>
  bitsA.value.reduce((acc, bit, i) => acc + bit * Math.pow(2, 3 - i), 0)
)

const decimalB = computed(() =>
  bitsB.value.reduce((acc, bit, i) => acc + bit * Math.pow(2, 3 - i), 0)
)

const stageData = computed(() => {
  const stages = []
  let carry = 0
  const posNames = ['最低位', '次低位', '次高位', '最高位']
  for (let i = 3; i >= 0; i--) {
    const a = bitsA.value[i]
    const b = bitsB.value[i]
    const total = a + b + carry
    const sum = total % 2
    const carryOut = total >= 2 ? 1 : 0
    stages.push({
      bitPos: 3 - i,
      posName: posNames[3 - i],
      a,
      b,
      carryIn: stages.length > 0 ? carry : null,
      sum,
      carryOut
    })
    carry = carryOut
  }
  return stages
})

const sumBits = computed(() => stageData.value.map((s) => s.sum).reverse())

const resultBinary = computed(() => {
  const lastCarry = stageData.value[stageData.value.length - 1]?.carryOut || 0
  return (lastCarry ? lastCarry.toString() : '') + sumBits.value.join('')
})

const resultDecimal = computed(() => decimalA.value + decimalB.value)
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
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  margin-left: 0.5rem;
}

/* 名词解释 */
.legend {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.a { background: var(--vp-c-brand); }
.dot.b { background: #8b5cf6; }
.dot.s { background: var(--vp-c-success, #16a34a); }
.dot.c { background: #d97706; }

/* 控制面板 */
.control-panel {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.group-label {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.bits {
  display: flex;
  gap: 0.2rem;
}

.bit-btn {
  width: 26px;
  height: 26px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
  transition: all 0.2s;
}

.bit-btn.on {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.decimal {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.op-sign {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  flex-shrink: 0;
}

.result-inline {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.result-bin {
  font-family: monospace;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.result-dec {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

/* 阶段 */
.stages-label {
  font-size: 0.82rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
}

.adder-stages {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
  margin-bottom: 0.75rem;
}

.stage {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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

/* 全加器盒子 */
.fa-box {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.3rem 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  flex-shrink: 0;
}

.fa-label {
  font-size: 0.68rem;
  font-weight: bold;
}

.fa-hint {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
}

/* 进位提示 */
.carry-hint {
  font-size: 0.65rem;
  color: #d97706;
  text-align: center;
  padding: 0.15rem 0;
}

.carry-hint.no-carry {
  color: var(--vp-c-text-3);
}

/* 结果栏 */
.result-bar {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.55rem 0.75rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.result-row {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.result-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.result-bits {
  font-family: monospace;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.result-eq {
  font-weight: bold;
  color: var(--vp-c-success, #16a34a);
}

/* info box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
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
