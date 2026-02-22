<template>
  <div class="logic-gate-demo">
    <div class="demo-label">四种基本逻辑门 ── 真值表一览</div>

    <div class="gates-grid">
      <div v-for="gate in gates" :key="gate.name" class="gate-card">
        <div class="gate-name">{{ gate.name }}</div>
        <div class="gate-rule">{{ gate.rule }}</div>
        <table class="mini-truth">
          <thead>
            <tr>
              <th>A</th>
              <th v-if="gate.name !== 'NOT'">B</th>
              <th>结果</th>
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

    <div class="demo-caption">所有数字计算都由这四种门的组合实现</div>
  </div>
</template>

<script setup>
const gates = [
  {
    name: 'AND',
    rule: '都为 1 才得 1',
    rows: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ]
  },
  {
    name: 'OR',
    rule: '有一个 1 就得 1',
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    name: 'NOT',
    rule: '取反',
    rows: [
      [0, 1],
      [1, 0]
    ]
  },
  {
    name: 'XOR',
    rule: '不同才得 1',
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

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
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

.gate-name {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.15rem;
}

.gate-rule {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.mini-truth {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
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
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.result-cell.one {
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.demo-caption {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.6rem;
  text-align: center;
}

@media (max-width: 600px) {
  .gates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
