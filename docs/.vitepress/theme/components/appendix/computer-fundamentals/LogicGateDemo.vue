<template>
  <div class="logic-gate-demo">
    <div class="demo-header">
      <span class="title">逻辑门：用开关做运算</span>
    </div>

    <p class="intro">
      输入 A、B 只能是 0 或 1；四种门按不同规则输出一个 0 或 1。下面表格列出所有 4 种输入组合的结果。
    </p>

    <div class="truth-section">
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
          <tr v-for="row in truthRows" :key="`${row.a}-${row.b}`">
            <td>{{ row.a }}</td>
            <td>{{ row.b }}</td>
            <td>{{ row.and }}</td>
            <td>{{ row.or }}</td>
            <td>{{ row.not }}</td>
            <td>{{ row.xor }}</td>
          </tr>
        </tbody>
      </table>
      <ul class="col-meaning">
        <li><strong>AND</strong>：两个都是 1 才输出 1（像串联：都通才通）</li>
        <li><strong>OR</strong>：有一个 1 就输出 1（像并联：一通就通）</li>
        <li><strong>NOT(A)</strong>：对 A 取反，0→1、1→0</li>
        <li><strong>XOR</strong>：两个不同输出 1，相同输出 0</li>
      </ul>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>逻辑门用晶体管的“开关”组合实现这四种运算，复杂计算都由它们组合而成。
    </div>
  </div>
</template>

<script setup>
const truthRows = [
  { a: 0, b: 0, and: 0, or: 0, not: 1, xor: 0 },
  { a: 0, b: 1, and: 0, or: 1, not: 1, xor: 1 },
  { a: 1, b: 0, and: 0, or: 1, not: 0, xor: 1 },
  { a: 1, b: 1, and: 1, or: 1, not: 0, xor: 0 }
]
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
  margin-bottom: 0.5rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.intro {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.75rem;
  line-height: 1.5;
}

.truth-section {
  margin-bottom: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.88rem;
  margin-bottom: 0.75rem;
}

th,
td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.4rem 0.5rem;
  vertical-align: middle;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}

.col-meaning {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.col-meaning li {
  margin-bottom: 0.25rem;
}

.col-meaning strong {
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
