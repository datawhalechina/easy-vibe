<template>
  <div class="half-adder-demo">
    <div class="demo-label">
      半加器 (Half Adder) 内部构造 ── 尝试组合 A 和 B，观察 XOR（异或门）和
      AND（与门）的分工
    </div>

    <div class="circuit-container">
      <!-- 输入端 -->
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
      </div>

      <!-- 连线区域 -->
      <div class="wires">
        <!-- Path visualization can be complex, using simple SVG lines -->
        <svg class="wire-svg" viewBox="0 0 100 150" preserveAspectRatio="none">
          <!-- A to XOR -->
          <path
            d="M 0,30 C 50,30 50,40 100,40"
            fill="none"
            :stroke="inputA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
          <!-- B to XOR -->
          <path
            d="M 0,120 C 50,120 50,60 100,60"
            fill="none"
            :stroke="inputB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />

          <!-- A to AND -->
          <path
            d="M 20,30 L 20,90 C 20,90 50,90 100,90"
            fill="none"
            :stroke="inputA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
          <!-- B to AND -->
          <path
            d="M 40,120 L 40,110 C 40,110 50,110 100,110"
            fill="none"
            :stroke="inputB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />

          <!-- Nodes -->
          <circle
            cx="20"
            cy="30"
            r="3"
            :fill="inputA ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
          />
          <circle
            cx="40"
            cy="120"
            r="3"
            :fill="inputB ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
          />
        </svg>
      </div>

      <!-- 逻辑门 -->
      <div class="gates">
        <div class="gate-box xor-gate" :class="{ active: sumOut }">
          <div class="gate-name">XOR 门</div>
          <div class="gate-desc">计算"本位" (相加结果)</div>
        </div>
        <div class="gate-box and-gate" :class="{ active: carryOut }">
          <div class="gate-name">AND 门</div>
          <div class="gate-desc">计算"进位" (满2进1)</div>
        </div>
      </div>

      <!-- 线 -->
      <div class="wires outputs-wires">
        <svg class="wire-svg" viewBox="0 0 50 150" preserveAspectRatio="none">
          <line
            x1="0"
            y1="50"
            x2="50"
            y2="50"
            :stroke="
              sumOut ? 'var(--vp-c-green-1, #16a34a)' : 'var(--vp-c-text-3)'
            "
            stroke-width="2"
          />
          <line
            x1="0"
            y1="100"
            x2="50"
            y2="100"
            :stroke="carryOut ? '#d97706' : 'var(--vp-c-text-3)'"
            stroke-width="2"
          />
        </svg>
      </div>

      <!-- 输出端 -->
      <div class="outputs">
        <div class="output-line" :class="{ active: sumOut }">
          <span class="label">本位 (Sum)</span>
          <span class="out-val s-val">{{ sumOut ? '1' : '0' }}</span>
        </div>
        <div class="output-line" :class="{ active: carryOut }">
          <span class="label">向前进位 (Carry)</span>
          <span class="out-val c-val">{{ carryOut ? '1' : '0' }}</span>
        </div>
      </div>
    </div>

    <div class="logic-explain">
      <p>
        你的输入是 {{ inputA ? '1' : '0' }} 和 {{ inputB ? '1' : '0' }}。<br />
        <strong>XOR 门</strong>判断它们不仅要"相加"，还看是否"不同"：{{
          inputA !== inputB ? '不同，出1' : '相同，出0'
        }}
        ——> 核心本位 <strong>{{ sumOut ? '1' : '0' }}</strong
        >。<br />
        <strong>AND 门</strong>暗中观察是否"全为真"：{{
          inputA && inputB ? '全为 1，产生进位！' : '没有全为 1，不进位'
        }}
        ——> 进位信号 <strong>{{ carryOut ? '1' : '0' }}</strong
        >。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputA = ref(false)
const inputB = ref(true)

const sumOut = computed(() => inputA.value !== inputB.value)
const carryOut = computed(() => inputA.value && inputB.value)
</script>

<style scoped>
.half-adder-demo {
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
  margin-bottom: 1rem;
  letter-spacing: 0.2px;
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
  gap: 3.5rem;
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
.s-val {
  color: var(--vp-c-text-3);
}
.c-val {
  color: var(--vp-c-text-3);
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
  width: 80px;
  height: 150px;
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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 2;
  margin-top: 5px;
}

.gate-box {
  width: 7.5rem;
  height: 4rem;
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

.gate-name {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.gate-desc {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
}

.logic-explain {
  margin-top: 1.5rem;
  padding: 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 600px) {
  .circuit-container {
    transform: scale(0.85);
    transform-origin: left top;
    padding-bottom: 0;
  }
}
</style>
