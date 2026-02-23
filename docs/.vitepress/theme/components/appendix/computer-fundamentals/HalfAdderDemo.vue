<template>
  <div class="half-adder-demo">
    <div class="demo-header">
      <span class="title">半加器 (Half Adder) — 交互演示</span>
      <span class="subtitle">点击输入 A / B，看看这一位加法的结果</span>
    </div>

    <!-- 主交互区 -->
    <div class="main-area">
      <!-- 左：输入和直观结果 -->
      <div class="left-panel">
        <div class="big-calc">
          <button class="big-bit" :class="{ on: inputA }" @click="inputA = !inputA">
            {{ inputA ? '1' : '0' }}
          </button>
          <span class="op">+</span>
          <button class="big-bit" :class="{ on: inputB }" @click="inputB = !inputB">
            {{ inputB ? '1' : '0' }}
          </button>
          <span class="op">=</span>
          <span class="result-display">
            <span class="result-bit carry-bit" :class="{ lit: carryOut }">{{ carryOut ? '1' : '0' }}</span>
            <span class="result-bit sum-bit" :class="{ lit: sumOut }">{{ sumOut ? '1' : '0' }}</span>
          </span>
        </div>
        <div class="result-labels">
          <span class="rl carry-label" :class="{ lit: carryOut }">▲ 进位：向左边那列借一个 1</span>
          <span class="rl sum-label" :class="{ lit: sumOut }">▲ 本位：这一列写下的数字</span>
        </div>

        <div class="explain-box">
          <div class="explain-text">{{ explainText }}</div>
        </div>
      </div>

      <!-- 右：四种情况对照表，高亮当前行 -->
      <div class="right-panel">
        <div class="table-title">所有可能的情况</div>
        <div class="truth-table">
          <div class="tr header">
            <span>A</span><span>B</span><span class="sum-col">写下（本位）</span><span class="carry-col">进位</span>
          </div>
          <div
            v-for="row in cases"
            :key="row.a + '' + row.b"
            class="tr"
            :class="{ active: row.a === +inputA && row.b === +inputB }"
          >
            <span>{{ row.a }}</span>
            <span>{{ row.b }}</span>
            <span class="sum-col">{{ row.sum }}</span>
            <span class="carry-col">{{ row.carry }}</span>
          </div>
        </div>
        <div class="pattern-note">
          <p>仔细看这张表，你会发现两个规律：</p>
          <ul>
            <li>「写下」列：只有 A 和 B <strong>不一样</strong>时才是 1 → 这个规律叫 <code>XOR（异或）</code></li>
            <li>「进位」列：只有 A 和 B <strong>都是 1</strong> 时才是 1 → 这个规律叫 <code>AND（与）</code></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 电路连接图 -->
    <div class="circuit-section">
      <div class="circuit-label">电路是这样连的：</div>
      <div class="circuit-row">
        <div class="wire-inputs">
          <div class="wire-bit a-bit" :class="{ on: inputA }">A = {{ inputA ? '1' : '0' }}</div>
          <div class="wire-bit b-bit" :class="{ on: inputB }">B = {{ inputB ? '1' : '0' }}</div>
        </div>
        <svg class="split-svg" viewBox="0 0 60 80" preserveAspectRatio="none">
          <!-- A 到 XOR -->
          <line x1="0" y1="20" x2="30" y2="20" :stroke="inputA ? '#3b82f6' : '#ccc'" stroke-width="2" />
          <line x1="30" y1="20" x2="60" y2="15" :stroke="inputA ? '#3b82f6' : '#ccc'" stroke-width="2" />
          <!-- A 到 AND -->
          <line x1="30" y1="20" x2="60" y2="65" :stroke="inputA ? '#3b82f6' : '#ccc'" stroke-width="2" />
          <!-- 分支点 -->
          <circle cx="30" cy="20" r="3" :fill="inputA ? '#3b82f6' : '#ccc'" />
          <!-- B 到 XOR -->
          <line x1="0" y1="60" x2="30" y2="60" :stroke="inputB ? '#8b5cf6' : '#ccc'" stroke-width="2" />
          <line x1="30" y1="60" x2="60" y2="25" :stroke="inputB ? '#8b5cf6' : '#ccc'" stroke-width="2" />
          <!-- B 到 AND -->
          <line x1="30" y1="60" x2="60" y2="75" :stroke="inputB ? '#8b5cf6' : '#ccc'" stroke-width="2" />
          <circle cx="30" cy="60" r="3" :fill="inputB ? '#8b5cf6' : '#ccc'" />
        </svg>
        <div class="gates-col">
          <div class="gate-chip xor" :class="{ active: sumOut }">
            <div class="chip-name">XOR 异或门</div>
            <div class="chip-rule">不同 → 1</div>
            <div class="chip-out">输出: <strong>{{ sumOut ? '1' : '0' }}</strong></div>
          </div>
          <div class="gate-chip and" :class="{ active: carryOut }">
            <div class="chip-name">AND 与门</div>
            <div class="chip-rule">全1 → 1</div>
            <div class="chip-out">输出: <strong>{{ carryOut ? '1' : '0' }}</strong></div>
          </div>
        </div>
        <svg class="out-svg" viewBox="0 0 40 80" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="40" y2="20" :stroke="sumOut ? '#16a34a' : '#ccc'" stroke-width="2" />
          <line x1="0" y1="60" x2="40" y2="60" :stroke="carryOut ? '#d97706' : '#ccc'" stroke-width="2" />
        </svg>
        <div class="output-col">
          <div class="out-chip sum" :class="{ active: sumOut }">
            本位 (Sum)<br><strong>{{ sumOut ? '1' : '0' }}</strong>
          </div>
          <div class="out-chip carry" :class="{ active: carryOut }">
            进位 (Carry)<br><strong>{{ carryOut ? '1' : '0' }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputA = ref(false)
const inputB = ref(false)

const sumOut = computed(() => inputA.value !== inputB.value)
const carryOut = computed(() => inputA.value && inputB.value)

const cases = [
  { a: 0, b: 0, sum: 0, carry: 0 },
  { a: 0, b: 1, sum: 1, carry: 0 },
  { a: 1, b: 0, sum: 1, carry: 0 },
  { a: 1, b: 1, sum: 0, carry: 1 },
]

const explainText = computed(() => {
  const a = +inputA.value
  const b = +inputB.value
  if (a === 0 && b === 0) return '0 + 0 = 0。这一列写下 0，不需要进位。'
  if (a === 0 && b === 1) return '0 + 1 = 1。这一列写下 1，不需要进位。'
  if (a === 1 && b === 0) return '1 + 0 = 1。这一列写下 1，不需要进位。'
  return '1 + 1 = 2。但二进制这一列最多写 1，所以写下 0，并且向左边那列"进一个 1"（进位）。就像十进制的 9+1=10，个位写 0、十位进 1。'
})
</script>

<style scoped>
.half-adder-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1rem;
}
.title {
  display: block;
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

/* ── main area ── */
.main-area {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.2rem;
}

/* left */
.left-panel { flex: 1; min-width: 200px; }

.big-calc {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.big-bit {
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: monospace;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}
.big-bit.on {
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #3b82f6;
}

.op {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

.result-display {
  display: flex;
  gap: 0.2rem;
}
.result-bit {
  width: 3rem;
  height: 3rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 1.5rem;
  font-weight: bold;
  font-family: monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  transition: all 0.2s;
}
.carry-bit.lit { background: #fef3c7; color: #d97706; border-color: #d97706; }
.sum-bit.lit   { background: #dcfce7; color: #16a34a; border-color: #16a34a; }

.result-labels {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
}
.rl {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  transition: all 0.2s;
}
.carry-label.lit { color: #d97706; font-weight: bold; }
.sum-label.lit   { color: #16a34a; font-weight: bold; }

.explain-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  border-left: 3px solid var(--vp-c-brand-1);
}
.explain-text {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* right */
.right-panel { flex: 1; min-width: 200px; }

.table-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}
.truth-table { border-radius: 6px; overflow: hidden; border: 1px solid var(--vp-c-divider); margin-bottom: 0.75rem; }
.tr {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1.5fr;
  padding: 0.35rem 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: monospace;
  font-size: 0.82rem;
  transition: all 0.2s;
}
.tr:last-child { border-bottom: none; }
.tr.header {
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  font-family: system-ui;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}
.tr.active {
  background: var(--vp-c-brand-soft);
  font-weight: bold;
}
.sum-col  { color: #16a34a; }
.carry-col { color: #d97706; }
.tr.active .sum-col  { color: #16a34a; }
.tr.active .carry-col { color: #d97706; }

.pattern-note {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.pattern-note p { margin: 0 0 0.4rem 0; }
.pattern-note ul { margin: 0; padding-left: 1.2rem; }
.pattern-note li { margin-bottom: 0.3rem; line-height: 1.4; }
.pattern-note code {
  background: var(--vp-c-bg-alt);
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

/* ── circuit section ── */
.circuit-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
}
.circuit-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}
.circuit-row {
  display: flex;
  align-items: center;
  gap: 0;
}
.wire-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.wire-bit {
  padding: 0.3rem 0.6rem;
  font-family: monospace;
  font-size: 0.8rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
  min-width: 4.5rem;
  text-align: center;
}
.wire-bit.on { background: #dbeafe; color: #1d4ed8; border-color: #3b82f6; }

.split-svg { width: 50px; height: 80px; flex-shrink: 0; }

.gates-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.gate-chip {
  width: 7rem;
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  text-align: center;
  transition: all 0.2s;
}
.gate-chip.active { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.chip-name { font-size: 0.7rem; font-weight: bold; color: var(--vp-c-text-1); }
.chip-rule { font-size: 0.62rem; color: var(--vp-c-text-3); }
.chip-out  { font-size: 0.7rem; font-family: monospace; margin-top: 0.15rem; }
.gate-chip.active .chip-out strong { color: var(--vp-c-brand-1); }

.out-svg { width: 35px; height: 80px; flex-shrink: 0; }

.output-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.out-chip {
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.7rem;
  text-align: center;
  line-height: 1.4;
  min-width: 5rem;
  transition: all 0.2s;
}
.out-chip strong { font-size: 1rem; display: block; }
.out-chip.sum.active    { background: #dcfce7; border-color: #16a34a; color: #166534; }
.out-chip.carry.active  { background: #fef3c7; border-color: #d97706; color: #92400e; }

@media (max-width: 640px) {
  .main-area { flex-direction: column; }
  .circuit-row { overflow-x: auto; }
}
</style>
