<script setup>
import { ref } from 'vue'

const activeTab = ref('excel') // 'excel' or 'db'

// Excel Data (Flat, Redundant)
const excelData = [
  {
    id: 1,
    date: '2023-10-01',
    book: 'AI 入门',
    price: 59,
    user: '张三',
    phone: '13800138000'
  },
  {
    id: 2,
    date: '2023-10-02',
    book: 'Python 编程',
    price: 89,
    user: '李四',
    phone: '13900139000'
  },
  {
    id: 3,
    date: '2023-10-03',
    book: '算法导论',
    price: 120,
    user: '张三',
    phone: '13800138000'
  },
  {
    id: 4,
    date: '2023-10-03',
    book: '数据库原理',
    price: 45,
    user: '王五',
    phone: '13700137000'
  },
  {
    id: 5,
    date: '2023-10-04',
    book: 'Vue.js 实战',
    price: 78,
    user: '张三',
    phone: '13800138000'
  }
]

// DB Data (Normalized)
const usersTable = [
  { id: 101, name: '张三', phone: '13800138000' },
  { id: 102, name: '李四', phone: '13900139000' },
  { id: 103, name: '王五', phone: '13700137000' }
]

const ordersTable = [
  { id: 1, date: '2023-10-01', book: 'AI 入门', price: 59, user_id: 101 },
  { id: 2, date: '2023-10-02', book: 'Python 编程', price: 89, user_id: 102 },
  { id: 3, date: '2023-10-03', book: '算法导论', price: 120, user_id: 101 },
  { id: 4, date: '2023-10-03', book: '数据库原理', price: 45, user_id: 103 },
  { id: 5, date: '2023-10-04', book: 'Vue.js 实战', price: 78, user_id: 101 }
]

const hoveredUserId = ref(null)

const setHover = (id) => {
  hoveredUserId.value = id
}
</script>

<template>
  <div class="relational-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">关系型数据演示</span>
      <span class="subtitle">Excel 模式 vs 数据库模式</span>
    </div>

    <div class="intro-text">
      想象你在管理一个<span class="highlight">书店订单</span>。用 Excel 时，每个订单都重复写顾客信息；用关系型数据库时，顾客信息单独存一张表，订单表只存顾客 ID。就像把<span class="highlight">通讯录和订单分开</span>，而不是每笔订单都抄一遍地址。
    </div>

    <div class="tabs">
      <button
        class="tab"
        :class="{ active: activeTab === 'excel' }"
        @click="activeTab = 'excel'"
      >
        📋 Excel 模式 (单表)
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'db' }"
        @click="activeTab = 'db'"
      >
        🗄️ 数据库模式 (多表关联)
      </button>
    </div>

    <div class="content-area">
      <!-- Excel Mode -->
      <div v-if="activeTab === 'excel'" class="excel-view">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>日期</th>
                <th>书名</th>
                <th>价格</th>
                <th class="highlight-col">购买者</th>
                <th class="highlight-col">电话</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in excelData" :key="row.id">
                <td>{{ row.id }}</td>
                <td>{{ row.date }}</td>
                <td>{{ row.book }}</td>
                <td>{{ row.price }}</td>
                <td class="highlight-cell">{{ row.user }}</td>
                <td class="highlight-cell">{{ row.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="note error">
          <p>❌ <strong>问题：</strong> "张三"的信息重复存储了 3 次。</p>
          <p>如果张三换了电话，你需要修改 3 行数据，很容易漏改！这叫<span class="highlight">数据冗余</span>。</p>
        </div>
      </div>

      <!-- DB Mode -->
      <div v-else class="db-view">
        <div class="db-layout">
          <!-- Users Table -->
          <div class="db-table users-table">
            <div class="table-title">👥 用户表 (Users)</div>
            <table>
              <thead>
                <tr>
                  <th>ID (主键)</th>
                  <th>姓名</th>
                  <th>电话</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="u in usersTable"
                  :key="u.id"
                  :class="{ active: hoveredUserId === u.id }"
                  @mouseenter="setHover(u.id)"
                  @mouseleave="setHover(null)"
                >
                  <td class="primary-key">{{ u.id }}</td>
                  <td>{{ u.name }}</td>
                  <td>{{ u.phone }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Connection Lines (Visual only, simplified) -->
          <div class="connector">
            <div class="arrow-label">🔗 外键关联</div>
            <div class="arrow">⬅️ Join ➡️</div>
          </div>

          <!-- Orders Table -->
          <div class="db-table orders-table">
            <div class="table-title">📦 订单表 (Orders)</div>
            <table>
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>书名</th>
                  <th>价格</th>
                  <th class="highlight-col">用户 ID (外键)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="o in ordersTable"
                  :key="o.id"
                  :class="{ active: hoveredUserId === o.user_id }"
                  @mouseenter="setHover(o.user_id)"
                  @mouseleave="setHover(null)"
                >
                  <td>{{ o.id }}</td>
                  <td>{{ o.book }}</td>
                  <td>{{ o.price }}</td>
                  <td class="highlight-cell foreign-key">{{ o.user_id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="note success">
          <p>✅ <strong>优势：</strong> 订单表只存 "用户 ID"，不重复存用户信息。</p>
          <p>
            鼠标悬停在用户表或订单表的某一行，看看它们是如何通过 <span class="highlight">外键自动关联</span>的。修改用户表一次，所有订单都会自动更新！
          </p>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>关系型数据库通过<span class="highlight">拆表 + 外键</span>消除冗余。就像把通讯录和记账本分开，记账本只写"姓名"，查账时再去通讯录找详细信息。这样改一次电话，所有记录都更新。
    </div>
  </div>
</template>

<style scoped>
.relational-demo {
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
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  flex: 1;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.tab:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-1);
}

.content-area {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 0.75rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

th,
td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.highlight-col {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.highlight-cell {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-weight: 500;
}

.primary-key {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.foreign-key {
  color: #f59e0b;
  font-weight: 500;
}

.excel-view .highlight-cell {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.db-layout {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.db-table {
  flex: 1;
  min-width: 280px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.table-title {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
}

.connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 100px;
}

.arrow-label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.arrow {
  color: var(--vp-c-brand-1);
}

tr.active {
  background: rgba(34, 197, 94, 0.1);
}

.note {
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.5;
}

.note p {
  margin: 0.25rem 0;
}

.note.error {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--vp-c-text-2);
}

.note.success {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: var(--vp-c-text-2);
}

.note .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
