<template>
  <div class="full-adder-demo">
    <div class="demo-header">
      <span class="title">全加器 (Full Adder) — 交互演示</span>
      <span class="subtitle">比半加器多一个输入：来自低位的进位 (Cin)。点击三个输入试试</span>
    </div>

    <!-- 主交互区 -->
    <div class="main-area">
      <!-- 左：大号加法展示 -->
      <div class="left-panel">
        <div class="big-calc">
          <button class="big-bit" :class="{ on: inputA }" @click="inputA = !inputA">{{ inputA ? '1' : '0' }}</button>
          <span class="op">+</span>
          <button class="big-bit" :class="{ on: inputB }" @click="inputB = !inputB">{{ inputB ? '1' : '0' }}</button>
          <span class="op">+</span>
          <button class="big-bit cin" :class="{ on: carryIn }" @click="carryIn = !carryIn">{{ carryIn ? '1' : '0' }}</button>
          <span class="op">=</span>
          <span class="result-display">
            <span class="result-bit carry-bit" :class="{ lit: carryOut }">{{ carryOut ? '1' : '0' }}</span>
            <span class="result-bit sum-bit" :class="{ lit: sumOut }">{{ sumOut ? '1' : '0' }}</span>
          </span>
        </div>

        <div class="input-labels">
          <span class="il">A</span>
          <span class="il spacer"></span>
          <span class="il">B</span>
          <span class="il spacer"></span>
          <span class="il cin-label">低位进位</span>
          <span class="il spacer"></span>
          <span class="result-labels">
            <span class="rl" :class="{ lit: carryOut }">进位</span>
            <span class="rl" :class="{ lit: sumOut }">本位</span>
          </span>
        </div>

        <div class="explain-box">
          <div class="explain-text">{{ explainText }}</div>
        </div>

        <div class="vs-half">
          <strong>和半加器相比：</strong>全加器多了第三个输入「低位进位 (Cin)」。在多位加法中，每一列不仅要加 A 和 B，还要加上右边那一列传来的进位。
        </div>
      </div>

      <!-- 右：真值表 -->
      <div class="right-panel">
        <div class="table-title">所有 8 种情况（3个输入 → 2³ = 8）</div>
        <div class="truth-table">
          <div class="tr header">
            <span>A</span><span>B</span><span>Cin</span><span class="sum-col">本位</span><span class="carry-col">进位</span>
          </div>
          <div
            v-for="row in cases"
            :key="row.key"
            class="tr"
            :class="{ active: row.a === +inputA && row.b === +inputB && row.cin === +carryIn }"
          >
            <span>{{ row.a }}</span>
            <span>{{ row.b }}</span>
            <span>{{ row.cin }}</span>
            <span class="sum-col">{{ row.sum }}</span>
            <span class="carry-col">{{ row.carry }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 内部结构：用两个半加器来理解 -->
    <div class="structure-section">
      <div class="structure-label">全加器的内部 = 两个半加器串联</div>
      <div class="structure-row">
        <!-- 半加器 1 -->
        <div class="ha-block">
          <div class="ha-title">第一步：半加器 ①</div>
          <div class="ha-desc">先算 A + B</div>
          <div class="ha-io">
            <div class="ha-in">
              <span class="io-tag a">A = {{ inputA ? '1' : '0' }}</span>
              <span class="io-tag b">B = {{ inputB ? '1' : '0' }}</span>
            </div>
            <div class="ha-arrow">→</div>
            <div class="ha-out">
              <span class="io-result" :class="{ lit: xor1 }">中间和: {{ xor1 ? '1' : '0' }}</span>
              <span class="io-result carry" :class="{ lit: carry1 }">进位①: {{ carry1 ? '1' : '0' }}</span>
            </div>
          </div>
        </div>

        <div class="chain-arrow">▸</div>

        <!-- 半加器 2 -->
        <div class="ha-block">
          <div class="ha-title">第二步：半加器 ②</div>
          <div class="ha-desc">把中间和 + 低位进位</div>
          <div class="ha-io">
            <div class="ha-in">
              <span class="io-tag mid">中间和 = {{ xor1 ? '1' : '0' }}</span>
              <span class="io-tag cin">Cin = {{ carryIn ? '1' : '0' }}</span>
            </div>
            <div class="ha-arrow">→</div>
            <div class="ha-out">
              <span class="io-result sum" :class="{ lit: sumOut }">本位: {{ sumOut ? '1' : '0' }}</span>
              <span class="io-result carry" :class="{ lit: carry2 }">进位②: {{ carry2 ? '1' : '0' }}</span>
            </div>
          </div>
        </div>

        <div class="chain-arrow">▸</div>

        <!-- OR 合并 -->
        <div class="or-block">
          <div class="ha-title">第三步：合并进位</div>
          <div class="ha-desc">两路进位只要有一个是 1，就向高位进 1</div>
          <div class="ha-io">
            <div class="ha-in">
              <span class="io-tag c1">进位① = {{ carry1 ? '1' : '0' }}</span>
              <span class="io-tag c2">进位② = {{ carry2 ? '1' : '0' }}</span>
            </div>
            <div class="ha-arrow">→</div>
            <div class="ha-out">
              <span class="io-result cout" :class="{ lit: carryOut }">最终进位: {{ carryOut ? '1' : '0' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputA = ref(true)
const inputB = ref(false)
const carryIn = ref(false)

// 第一步：半加器 1
const xor1 = computed(() => inputA.value !== inputB.value)
const carry1 = computed(() => inputA.value && inputB.value)

// 第二步：半加器 2
const sumOut = computed(() => xor1.value !== carryIn.value)
const carry2 = computed(() => xor1.value && carryIn.value)

// 第三步：OR 合并
const carryOut = computed(() => carry1.value || carry2.value)

const cases = [
  { a: 0, b: 0, cin: 0, sum: 0, carry: 0, key: '000' },
  { a: 0, b: 0, cin: 1, sum: 1, carry: 0, key: '001' },
  { a: 0, b: 1, cin: 0, sum: 1, carry: 0, key: '010' },
  { a: 0, b: 1, cin: 1, sum: 0, carry: 1, key: '011' },
  { a: 1, b: 0, cin: 0, sum: 1, carry: 0, key: '100' },
  { a: 1, b: 0, cin: 1, sum: 0, carry: 1, key: '101' },
  { a: 1, b: 1, cin: 0, sum: 0, carry: 1, key: '110' },
  { a: 1, b: 1, cin: 1, sum: 1, carry: 1, key: '111' },
]

const explainText = computed(() => {
  const a = +inputA.value
  const b = +inputB.value
  const c = +carryIn.value
  const total = a + b + c
  if (total === 0) return '0 + 0 + 0 = 0。本位写 0，不进位。'
  if (total === 1) return `${a} + ${b} + ${c} = 1。本位写 1，不进位。`
  if (total === 2) return `${a} + ${b} + ${c} = 2。二进制里 2 就是 "10"，所以本位写 0，向左进 1。`
  return `${a} + ${b} + ${c} = 3。二进制里 3 就是 "11"，所以本位写 1，向左进 1。`
})
</script>

<style scoped>
.full-adder-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}
.demo-header { margin-bottom: 1rem; }
.title { display: block; font-size: 0.95rem; font-weight: bold; color: var(--vp-c-text-1); }
.subtitle { font-size: 0.75rem; color: var(--vp-c-text-3); }

/* main area */
.main-area { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.2rem; }
.left-panel { flex: 1; min-width: 220px; }
.right-panel { flex: 1; min-width: 220px; }

/* big calc */
.big-calc { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.2rem; flex-wrap: wrap; }
.big-bit {
  width: 2.8rem; height: 2.8rem; font-size: 1.3rem; font-weight: bold; font-family: monospace;
  border-radius: 6px; background: var(--vp-c-bg); border: 2px solid var(--vp-c-divider);
  cursor: pointer; transition: all 0.2s;
}
.big-bit.on { background: #dbeafe; color: #1d4ed8; border-color: #3b82f6; }
.big-bit.cin.on { background: #fef3c7; color: #d97706; border-color: #d97706; }
.op { font-size: 1.2rem; color: var(--vp-c-text-3); font-weight: bold; }

.result-display { display: flex; gap: 0.15rem; }
.result-bit {
  width: 2.8rem; height: 2.8rem; border-radius: 6px; border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg); font-size: 1.3rem; font-weight: bold; font-family: monospace;
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-text-3); transition: all 0.2s;
}
.carry-bit.lit { background: #fef3c7; color: #d97706; border-color: #d97706; }
.sum-bit.lit   { background: #dcfce7; color: #16a34a; border-color: #16a34a; }

.input-labels { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.6rem; flex-wrap: wrap; }
.il { font-size: 0.65rem; color: var(--vp-c-text-3); text-align: center; width: 2.8rem; }
.il.spacer { width: 1rem; }
.cin-label { color: #d97706; font-weight: 600; }
.result-labels { display: flex; gap: 0.15rem; }
.rl { font-size: 0.6rem; color: var(--vp-c-text-3); text-align: center; width: 2.8rem; transition: all 0.2s; }
.rl.lit:first-child { color: #d97706; font-weight: bold; }
.rl.lit:last-child  { color: #16a34a; font-weight: bold; }

.explain-box {
  background: var(--vp-c-bg); border-radius: 6px; padding: 0.6rem 0.8rem;
  border-left: 3px solid var(--vp-c-brand-1); margin-bottom: 0.6rem;
}
.explain-text { font-size: 0.82rem; color: var(--vp-c-text-2); line-height: 1.5; }

.vs-half {
  font-size: 0.78rem; color: var(--vp-c-text-2); line-height: 1.4;
  padding: 0.5rem 0.7rem; background: var(--vp-c-bg-alt); border-radius: 6px;
}
.vs-half strong { color: var(--vp-c-text-1); }

/* truth table */
.table-title { font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-2); margin-bottom: 0.4rem; }
.truth-table { border-radius: 6px; overflow: hidden; border: 1px solid var(--vp-c-divider); }
.tr {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1.5fr 1.5fr;
  padding: 0.3rem 0.5rem; border-bottom: 1px solid var(--vp-c-divider);
  font-family: monospace; font-size: 0.78rem; transition: all 0.2s;
}
.tr:last-child { border-bottom: none; }
.tr.header {
  background: var(--vp-c-bg-alt); font-weight: bold; font-family: system-ui;
  font-size: 0.7rem; color: var(--vp-c-text-2);
}
.tr.active { background: var(--vp-c-brand-soft); font-weight: bold; }
.sum-col  { color: #16a34a; }
.carry-col { color: #d97706; }

/* structure section */
.structure-section { border-top: 1px solid var(--vp-c-divider); padding-top: 1rem; }
.structure-label { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 0.6rem; }

.structure-row { display: flex; align-items: stretch; gap: 0.3rem; overflow-x: auto; }

.ha-block, .or-block {
  flex: 1; min-width: 160px; padding: 0.6rem; border-radius: 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.or-block { border-color: #d97706; background: #fffbeb; }

.ha-title { font-size: 0.72rem; font-weight: bold; color: var(--vp-c-text-1); margin-bottom: 0.15rem; }
.ha-desc  { font-size: 0.65rem; color: var(--vp-c-text-3); margin-bottom: 0.4rem; }

.ha-io { display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap; }
.ha-in { display: flex; flex-direction: column; gap: 0.2rem; }
.ha-arrow { font-size: 0.8rem; color: var(--vp-c-text-3); padding: 0 0.15rem; }
.ha-out { display: flex; flex-direction: column; gap: 0.2rem; }

.io-tag {
  font-size: 0.65rem; font-family: monospace; padding: 0.15rem 0.4rem;
  border-radius: 3px; background: var(--vp-c-bg-alt); color: var(--vp-c-text-2);
}
.io-tag.a   { border-left: 2px solid #3b82f6; }
.io-tag.b   { border-left: 2px solid #8b5cf6; }
.io-tag.cin { border-left: 2px solid #d97706; }
.io-tag.mid { border-left: 2px solid #16a34a; }
.io-tag.c1  { border-left: 2px solid #d97706; }
.io-tag.c2  { border-left: 2px solid #d97706; }

.io-result {
  font-size: 0.68rem; font-family: monospace; padding: 0.15rem 0.4rem;
  border-radius: 3px; background: var(--vp-c-bg-alt); color: var(--vp-c-text-3);
  transition: all 0.2s;
}
.io-result.lit  { background: #dcfce7; color: #16a34a; font-weight: bold; }
.io-result.carry.lit { background: #fef3c7; color: #d97706; }
.io-result.sum.lit   { background: #dcfce7; color: #16a34a; }
.io-result.cout.lit  { background: #fef3c7; color: #d97706; }

.chain-arrow {
  display: flex; align-items: center; font-size: 1.2rem; color: var(--vp-c-text-3);
  flex-shrink: 0; padding: 0 0.1rem;
}

@media (max-width: 640px) {
  .main-area { flex-direction: column; }
  .structure-row { flex-direction: column; }
  .chain-arrow { transform: rotate(90deg); justify-content: center; padding: 0.3rem 0; }
}
</style>
