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
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'excel' }"
        @click="activeTab = 'excel'"
      >
        Excel 模式 (单表)
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'db' }"
        @click="activeTab = 'db'"
      >
        数据库模式 (多表关联)
      </div>
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
          <p>如果张三换了电话，你需要修改 3 行数据，很容易漏改！</p>
        </div>
      </div>

      <!-- DB Mode -->
      <div v-else class="db-view">
        <div class="db-layout">
          <!-- Users Table -->
          <div class="db-table users-table">
            <div class="table-title">用户表 (Users)</div>
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
                  <td>{{ u.id }}</td>
                  <td>{{ u.name }}</td>
                  <td>{{ u.phone }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Connection Lines (Visual only, simplified) -->
          <div class="connector">
            <div class="arrow">⬅️ 关联 (Join) ➡️</div>
          </div>

          <!-- Orders Table -->
          <div class="db-table orders-table">
            <div class="table-title">订单表 (Orders)</div>
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
                  <td class="highlight-cell">{{ o.user_id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="note success">
          <p>✅ <strong>优势：</strong> 订单表只存 "用户 ID"。</p>
          <p>
            鼠标悬停在某一行，看看它们是如何自动关联的。修改用户表一次，所有订单都会自动更新！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.relational-demo {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  margin: 20px 0;
  font-family: sans-serif;
}
.tabs {
  display: flex;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}
.tab {
  padding: 12px 24px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  border-right: 1px solid #e4e7ed;
  transition: all 0.2s;
}
.tab.active {
  background: #fff;
  color: #409eff;
  font-weight: bold;
  border-bottom: 2px solid #409eff;
  margin-bottom: -1px;
}
.content-area {
  padding: 20px;
}
.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
th,
td {
  border: 1px solid #ebeef5;
  padding: 8px 12px;
  text-align: left;
}
th {
  background: #fafafa;
  font-weight: bold;
  color: #303133;
}
.highlight-col {
  background: #ecf5ff;
  color: #409eff;
}
.highlight-cell {
  background: #f0f9eb;
  color: #67c23a;
  font-weight: bold;
}
.excel-view .highlight-cell {
  background: #fef0f0;
  color: #f56c6c;
}

.db-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.db-table {
  flex: 1;
  min-width: 280px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}
.table-title {
  background: #f2f6fc;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 13px;
  color: #606266;
  border-bottom: 1px solid #ebeef5;
}
.connector {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  font-size: 12px;
  color: #909399;
}
tr.active {
  background: #ecf5ff;
}

.note {
  margin-top: 15px;
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.6;
}
.note.error {
  background: #fef0f0;
  color: #f56c6c;
}
.note.success {
  background: #f0f9eb;
  color: #67c23a;
}
</style>
