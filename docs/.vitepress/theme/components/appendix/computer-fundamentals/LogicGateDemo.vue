<template>
  <div class="logic-gate-demo">
    <div class="demo-header">
      <span class="title">逻辑门：用开关做运算</span>
      <span class="subtitle">切换输入 A / B，同屏观察四种门的输出</span>
    </div>

    <div class="control-panel">
      <span class="panel-hint">点按钮切换 0 / 1，右侧四个门同步更新：</span>
      <div class="input-item">
        <span class="input-label">输入 A</span>
        <button class="input-btn" :class="{ on: inputA }" @click="inputA = !inputA">
          {{ inputA ? '1' : '0' }}
        </button>
      </div>
      <div class="input-item">
        <span class="input-label">输入 B</span>
        <button class="input-btn" :class="{ on: inputB }" @click="inputB = !inputB">
          {{ inputB ? '1' : '0' }}
        </button>
      </div>
      <span class="current-state">当前：A={{ inputA ? 1 : 0 }}，B={{ inputB ? 1 : 0 }}</span>
    </div>

    <div class="gate-grid">
      <div v-for="gate in gates" :key="gate.name" class="gate-card">
        <div class="gate-top">
          <span class="gate-name">{{ gate.name }}</span>
          <span class="gate-formula">{{ gate.formula }}</span>
        </div>
        <div class="gate-analogy">{{ gate.analogy }}</div>
        <div class="gate-output-row">
          <span class="output-label">输出</span>
          <span
            class="output-value"
            :class="{ on: gateOutput(gate.name, inputA, inputB) }"
          >
            {{ gateOutput(gate.name, inputA, inputB) }}
          </span>
          <span class="output-hint">{{ gateOutput(gate.name, inputA, inputB) ? '（真 / 导通）' : '（假 / 断开）' }}</span>
        </div>
      </div>
    </div>

    <div class="truth-section">
      <div class="table-title">四种门真值表对照（高亮行 = 当前输入）</div>
      <table>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>AND</th>
            <th>OR</th>
            <th>NOT(A)</th>
            <th>XOR</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in truthRows"
            :key="`${row.a}-${row.b}`"
            :class="{
              highlight:
                row.a === (inputA ? 1 : 0) && row.b === (inputB ? 1 : 0)
            }"
          >
            <td>{{ row.a }}</td>
            <td>{{ row.b }}</td>
            <td>{{ gateOutput('AND', !!row.a, !!row.b) }}</td>
            <td>{{ gateOutput('OR', !!row.a, !!row.b) }}</td>
            <td>{{ gateOutput('NOT', !!row.a, !!row.b) }}</td>
            <td>{{ gateOutput('XOR', !!row.a, !!row.b) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>逻辑门用晶体管的"开关"组合实现基本运算——AND 像串联、OR 像并联、NOT 取反、XOR 判异。所有复杂计算都由这四种基础操作构建而来。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputA = ref(false)
const inputB = ref(false)

const gates = [
  { name: 'AND', formula: 'A && B', analogy: '串联：都为 1 才输出 1' },
  { name: 'OR', formula: 'A || B', analogy: '并联：任一为 1 就输出 1' },
  { name: 'NOT', formula: '!A', analogy: '取反：0→1，1→0' },
  { name: 'XOR', formula: 'A ⊕ B', analogy: '判异：不同为 1，相同为 0' }
]

const truthRows = [
  { a: 0, b: 0 },
  { a: 0, b: 1 },
  { a: 1, b: 0 },
  { a: 1, b: 1 }
]

const gateOutput = (name, a, b) => {
  switch (name) {
    case 'AND':
      return a && b ? 1 : 0
    case 'OR':
      return a || b ? 1 : 0
    case 'NOT':
      return a ? 0 : 1
    case 'XOR':
      return a !== b ? 1 : 0
    default:
      return 0
  }
}
</script>

<style scoped>
.logic-gate-demo {
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

.control-panel {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  padding: 0.5rem 0.65rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.panel-hint {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.current-state {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}

.input-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
  font-size: 0.85rem;
}

.input-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.input-btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.input-btn.on {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.gate-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.gate-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.gate-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gate-name {
  font-weight: bold;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
}

.gate-formula {
  font-family: monospace;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.gate-analogy {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.gate-output-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.1rem;
}

.output-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.output-hint {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.output-value {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.output-value.on {
  background: var(--vp-c-success);
  color: white;
  border-color: var(--vp-c-success);
}

.truth-section {
  margin-bottom: 0;
}

.table-title {
  font-weight: bold;
  font-size: 0.82rem;
  margin-bottom: 0.4rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.8rem;
}

th,
td {
  border: 1px solid var(--vp-c-divider);
  padding: 0;
  height: 2rem;
  vertical-align: middle;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}

tr.highlight {
  background: var(--vp-c-brand-soft);
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

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .gate-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
