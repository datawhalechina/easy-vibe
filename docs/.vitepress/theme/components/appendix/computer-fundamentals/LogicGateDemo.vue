<template>
  <div class="logic-gate-demo">
    <div class="demo-header">
      <span class="title">四种基本逻辑门</span>
      <span class="subtitle">所有数字计算的基础积木</span>
    </div>

    <div class="gates-grid">
      <div v-for="gate in gates" :key="gate.name" class="gate-card">
        <div class="gate-header">
          <span class="gate-name-en">{{ gate.name }}</span>
          <span class="gate-name-cn">{{ gate.nameCn }}</span>
        </div>
        <div class="gate-formula">
          <span class="formula-label">运算：</span>
          <code class="formula-code">{{ gate.formula }}</code>
        </div>
        <div class="gate-rule">{{ gate.rule }}</div>
        <div class="gate-intuition">{{ gate.intuition }}</div>

        <div class="truth-section">
          <div class="truth-title">真值表</div>
          <table class="mini-truth">
            <thead>
              <tr>
                <th>A</th>
                <th v-if="gate.name !== 'NOT'">B</th>
                <th>输出</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in gate.rows" :key="i">
                <td>{{ row[0] }}</td>
                <td v-if="gate.name !== 'NOT'">{{ row[1] }}</td>
                <td
                  class="result-cell"
                  :class="{ one: row[row.length - 1] === 1 }"
                >
                  {{ row[row.length - 1] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      逻辑门把物理电路的"通/断"变成了数学上的"真/假"运算，是硬件实现软件逻辑的桥梁。
    </div>
  </div>
</template>

<script setup>
const gates = [
  {
    name: 'AND',
    nameCn: '与门',
    formula: 'A ∧ B',
    rule: '两个都为 1，才输出 1',
    intuition: '串联开关：两道门都开才通',
    rows: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ]
  },
  {
    name: 'OR',
    nameCn: '或门',
    formula: 'A ∨ B',
    rule: '有一个为 1，就输出 1',
    intuition: '并联开关：任一道门开就通',
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    name: 'NOT',
    nameCn: '非门',
    formula: '¬A',
    rule: '输入取反：0 变 1，1 变 0',
    intuition: '反向器：开变关，关变开',
    rows: [
      [0, 1],
      [1, 0]
    ]
  },
  {
    name: 'XOR',
    nameCn: '异或门',
    formula: 'A ⊕ B',
    rule: '两个不同，才输出 1',
    intuition: '差异检测器：相异为真',
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ]
  }
]
</script>

<style scoped>
.logic-gate-demo {
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

.gates-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.gate-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  text-align: center;
}

.gate-header {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.gate-name-en {
  font-weight: bold;
  font-size: 1rem;
  color: var(--vp-c-brand-1);
}

.gate-name-cn {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.gate-formula {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  margin-bottom: 0.25rem;
}

.formula-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.formula-code {
  font-size: 0.8rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  color: var(--vp-c-brand-1);
  font-family: 'JetBrains Mono', monospace;
}

.gate-rule {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.2rem;
  font-weight: 500;
}

.gate-intuition {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
  padding: 0.2rem 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.truth-section {
  margin-top: 0.3rem;
}

.truth-title {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mini-truth {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}

.mini-truth th,
.mini-truth td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.2rem 0.3rem;
  text-align: center;
}

.mini-truth th {
  background: var(--vp-c-bg-alt);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.result-cell.one {
  color: var(--vp-c-brand-1);
  font-weight: bold;
  background: var(--vp-c-brand-soft);
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
  .gates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
