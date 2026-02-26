<script setup>
import { ref, computed } from 'vue'

const activeOp = ref('groupBy')

const rawOrders = [
  { userId: 'U001', orderId: 'ORD001', amount: 100, date: '2024-01-01' },
  { userId: 'U001', orderId: 'ORD002', amount: 200, date: '2024-01-02' },
  { userId: 'U002', orderId: 'ORD003', amount: 150, date: '2024-01-01' },
  { userId: 'U002', orderId: 'ORD004', amount: 300, date: '2024-01-03' },
  { userId: 'U003', orderId: 'ORD005', amount: 250, date: '2024-01-02' },
  { userId: 'U001', orderId: 'ORD006', amount: 180, date: '2024-01-04' }
]

const ops = {
  groupBy: {
    name: '按用户分组',
    sql: `SELECT user_id, COUNT(*) as order_count, SUM(amount) as total
FROM orders GROUP BY user_id;`,
    columns: ['用户 ID', '订单数', '总金额'],
    data: [
      { '用户 ID': 'U001', 订单数: 3, 总金额: 480 },
      { '用户 ID': 'U002', 订单数: 2, 总金额: 450 },
      { '用户 ID': 'U003', 订单数: 1, 总金额: 250 }
    ]
  },
  sum: {
    name: '总销售额',
    sql: `SELECT SUM(amount) as total_sales FROM orders;`,
    columns: ['总销售额'],
    data: [{ 总销售额: 1180 }]
  },
  avg: {
    name: '平均订单额',
    sql: `SELECT AVG(amount) as avg_amount FROM orders;`,
    columns: ['平均订单额'],
    data: [{ 平均订单额: 196.67 }]
  },
  max: {
    name: '最大订单额',
    sql: `SELECT MAX(amount) as max_amount FROM orders;`,
    columns: ['最大订单额'],
    data: [{ 最大订单额: 300 }]
  }
}

const opKeys = Object.keys(ops)
const currentOp = computed(() => ops[activeOp.value])
</script>

<template>
  <div class="agg-demo">
    <div class="demo-header">
      <span class="icon">🧮</span>
      <span class="title">数据聚合演示</span>
      <span class="subtitle">拆分-计算-组合</span>
    </div>

    <div class="intro-text">
      "所有用户平均转化率 5%" 往往毫无意义。通过
      <span class="hl">分组聚合</span>
      把数据"切开"，才能发现不同用户之间的真实差异。点击下方操作，观察同一份原始数据如何产生不同的
      <span class="hl">聚合视角</span>。
    </div>

    <!-- 原始数据表 -->
    <div class="section">
      <div class="section-label">原始订单数据</div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>用户 ID</th>
              <th>订单号</th>
              <th>金额（元）</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in rawOrders" :key="r.orderId">
              <td>{{ r.userId }}</td>
              <td>{{ r.orderId }}</td>
              <td>{{ r.amount }}</td>
              <td>{{ r.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="ops-row">
      <button
        v-for="k in opKeys"
        :key="k"
        :class="['op-btn', { active: activeOp === k }]"
        @click="activeOp = k"
      >
        {{ ops[k].name }}
      </button>
    </div>

    <!-- 聚合结果 -->
    <div class="section result-section">
      <div class="section-label">{{ currentOp.name }} 结果</div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th v-for="col in currentOp.columns" :key="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in currentOp.data" :key="i">
              <td v-for="col in currentOp.columns" :key="col">
                {{ row[col] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="sql-block">
        <div class="sql-label">SQL 示例</div>
        <pre class="sql-code">{{ currentOp.sql }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agg-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.demo-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.intro-text {
  padding: 16px 20px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  border-bottom: 1px solid var(--vp-c-divider);
}

.hl {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.section {
  padding: 16px 20px;
}

.section-label {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 10px;
}

.table-wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.data-table th,
.data-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.data-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}

.data-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.ops-row {
  display: flex;
  gap: 8px;
  padding: 0 20px 16px;
  flex-wrap: wrap;
}

.op-btn {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.op-btn:hover {
  border-color: var(--vp-c-brand);
}

.op-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.result-section {
  border-top: 1px solid var(--vp-c-divider);
}

.sql-block {
  margin-top: 12px;
}

.sql-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.sql-code {
  margin: 0;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.6;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .ops-row {
    flex-direction: column;
  }
}
</style>
