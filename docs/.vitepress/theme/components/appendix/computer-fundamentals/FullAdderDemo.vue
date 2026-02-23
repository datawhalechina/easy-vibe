<template>
  <div class="full-adder-demo">
    <div class="demo-header">
      <span class="title">全加器 (Full Adder)</span>
      <span class="subtitle">能处理进位输入的完整加法单元 ── 三个输入，两个输出</span>
    </div>

    <div class="terms-box">
      <div class="term-item">
        <span class="term-name">Cin (进位输入)</span>
        <span class="term-desc">来自低位的进位信号</span>
      </div>
      <div class="term-item">
        <span class="term-name">Sum (本位)</span>
        <span class="term-desc">三位异或的结果</span>
      </div>
      <div class="term-item">
        <span class="term-name">Cout (进位输出)</span>
        <span class="term-desc">向高位的进位信号</span>
      </div>
    </div>

    <div class="circuit-container">
      <div class="inputs">
        <div class="input-line">
          <button
            class="toggle-btn"
            :class="{ on: inputA }"
            @click="inputA = !inputA"
          >
            {{ inputA ? '1' : '0' }}
          </button>
          <span class="label">输入 A</span>
        </div>
        <div class="input-line">
          <button
            class="toggle-btn"
            :class="{ on: inputB }"
            @click="inputB = !inputB"
          >
            {{ inputB ? '1' : '0' }}
          </button>
          <span class="label">输入 B</span>
        </div>
        <div class="input-line">
          <button
            class="toggle-btn cin-btn"
            :class="{ on: carryIn }"
            @click="carryIn = !carryIn"
          >
            {{ carryIn ? '1' : '0' }}
          </button>
          <span class="label">Cin</span>
        </div>
      </div>

      <div class="wires">
        <svg class="wire-svg" viewBox="0 0 120 180" preserveAspectRatio="none">
          <path
            d="M 0,30 C 30,30 30,45 60,45"
            fill="none"
            :stroke="inputA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
          <path
            d="M 0,30 L 15,30 L 15,105 L 60,105"
            fill="none"
            :stroke="inputA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
          <path
            d="M 0,90 C 30,90 30,60 60,60"
            fill="none"
            :stroke="inputB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
          <path
            d="M 0,90 L 25,90 L 25,120 L 60,120"
            fill="none"
            :stroke="inputB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
          <path
            d="M 0,150 C 30,150 30,135 60,135"
            fill="none"
            :stroke="carryIn ? '#d97706' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
          <circle
            cx="15"
            cy="30"
            r="3"
            :fill="inputA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
          />
          <circle
            cx="25"
            cy="90"
            r="3"
            :fill="inputB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
          />
        </svg>
      </div>

      <div class="gates">
        <div class="gate-box xor-gate" :class="{ active: xor1 }">
          <div class="gate-header">
            <span class="gate-name">XOR</span>
            <span class="gate-cn">异或门</span>
          </div>
          <div class="gate-formula">A ⊕ B</div>
          <div class="gate-desc">不同为 1 → 中间值</div>
        </div>
        <div class="gate-box and-gate" :class="{ active: carry1 }">
          <div class="gate-header">
            <span class="gate-name">AND</span>
            <span class="gate-cn">与门</span>
          </div>
          <div class="gate-formula">A ∧ B</div>
          <div class="gate-desc">全 1 为 1 → 进位1</div>
        </div>
        <div class="gate-box xor-gate" :class="{ active: sumOut }">
          <div class="gate-header">
            <span class="gate-name">XOR</span>
            <span class="gate-cn">异或门</span>
          </div>
          <div class="gate-formula">xor1 ⊕ Cin</div>
          <div class="gate-desc">不同为 1 → 本位</div>
        </div>
        <div class="gate-box or-gate" :class="{ active: carryOut }">
          <div class="gate-header">
            <span class="gate-name">OR</span>
            <span class="gate-cn">或门</span>
          </div>
          <div class="gate-formula">c1 ∨ c2</div>
          <div class="gate-desc">有 1 为 1 → 进位输出</div>
        </div>
      </div>

      <div class="wires outputs-wires">
        <svg class="wire-svg" viewBox="0 0 50 180" preserveAspectRatio="none">
          <line
            x1="0"
            y1="52"
            x2="50"
            y2="52"
            :stroke="
              sumOut ? 'var(--vp-c-green-1, #16a34a)' : 'var(--vp-c-text-3)'
            "
            stroke-width="2"
          />
          <line
            x1="0"
            y1="135"
            x2="50"
            y2="135"
            :stroke="carryOut ? '#d97706' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
        </svg>
      </div>

      <div class="outputs">
        <div class="output-line" :class="{ active: sumOut }">
          <span class="label">本位 (Sum)</span>
          <span class="out-val s-val">{{ sumOut ? '1' : '0' }}</span>
        </div>
        <div class="output-line" :class="{ active: carryOut }">
          <span class="label">Cout (进位)</span>
          <span class="out-val c-val">{{ carryOut ? '1' : '0' }}</span>
        </div>
      </div>
    </div>

    <div class="calculation-box">
      <div class="calc-title">计算过程</div>
      <div class="calc-content">
        <div class="calc-row">
          <span class="calc-label">输入：</span>
          <span class="calc-value">A = {{ inputA ? '1' : '0' }}，B = {{ inputB ? '1' : '0' }}，Cin =
            {{ carryIn ? '1' : '0' }}</span>
        </div>
        <div class="calc-row">
          <span class="calc-label">中间值：</span>
          <span class="calc-formula">xor1 = A ⊕ B = {{ inputA ? '1' : '0' }} ⊕
            {{ inputB ? '1' : '0' }} =
            <strong>{{ xor1 ? '1' : '0' }}</strong></span>
          <span class="calc-reason">（{{ inputA !== inputB ? '不同' : '相同' }}）</span>
        </div>
        <div class="calc-row">
          <span class="calc-label">本位：</span>
          <span class="calc-formula">Sum = xor1 ⊕ Cin = {{ xor1 ? '1' : '0' }} ⊕
            {{ carryIn ? '1' : '0' }} =
            <strong>{{ sumOut ? '1' : '0' }}</strong></span>
          <span class="calc-reason">（{{ xor1 !== carryIn ? '不同' : '相同' }}）</span>
        </div>
        <div class="calc-row">
          <span class="calc-label">进位：</span>
          <span class="calc-formula">Cout = (A∧B) ∨ (xor1∧Cin) = ({{ carry1 ? '1' : '0' }}) ∨ ({{
              carry2 ? '1' : '0'
            }}) = <strong>{{ carryOut ? '1' : '0' }}</strong></span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      全加器 = 两个半加器 + 一个 OR 门。第一级半加器算
      A+B，第二级半加器把结果加上 Cin，OR 门合并两路进位信号。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputA = ref(true)
const inputB = ref(true)
const carryIn = ref(false)

const xor1 = computed(() => inputA.value !== inputB.value)
const carry1 = computed(() => inputA.value && inputB.value)
const carry2 = computed(() => xor1.value && carryIn.value)
const sumOut = computed(() => xor1.value !== carryIn.value)
const carryOut = computed(() => carry1.value || carry2.value)
</script>

<style scoped>
.full-adder-demo {
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

.circuit-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 1rem;
  overflow-x: auto;
}

.inputs,
.outputs {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 6rem;
  z-index: 2;
}

.outputs {
  min-width: 8rem;
}

.input-line,
.output-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.toggle-btn {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-family: monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn.on {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.toggle-btn.cin-btn.on {
  background: #fef3c7;
  color: #d97706;
  border-color: #d97706;
}

.out-val {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-family: monospace;
  font-size: 1rem;
  transition: all 0.2s;
}

.output-line.active .s-val {
  background: #dcfce7;
  color: #16a34a;
  border-color: #16a34a;
}

.output-line.active .c-val {
  background: #fef3c7;
  color: #d97706;
  border-color: #d97706;
}

.wires {
  width: 100px;
  height: 180px;
  position: relative;
}

.outputs-wires {
  width: 40px;
}

.wire-svg {
  width: 100%;
  height: 100%;
}

.gates {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  z-index: 2;
}

.gate-box {
  width: 6rem;
  height: 3.5rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.gate-box.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 8px var(--vp-c-brand-soft);
}

.gate-header {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.gate-name {
  font-weight: bold;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.gate-cn {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.gate-formula {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  font-family: 'JetBrains Mono', monospace;
}

.gate-desc {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
}

.calculation-box {
  margin-top: 1rem;
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
  min-width: 4rem;
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
  .circuit-container {
    transform: scale(0.75);
    transform-origin: left top;
    padding-bottom: 0;
  }
  .terms-box {
    flex-direction: column;
  }
  .gates {
    grid-template-columns: 1fr;
  }
}
</style>
