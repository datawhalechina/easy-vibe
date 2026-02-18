<template>
  <div class="relation-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">外键关系演示</span>
      <span class="subtitle">理解表与表之间如何关联</span>
    </div>

    <div class="intro-text">
      想象你在管理一个<span class="highlight">家族谱系</span>：有"家谱表"记录每个人，有"婚姻表"记录谁和谁结婚了。两张表通过"人名"关联起来，这就是<span class="highlight">外键</span>的作用。
    </div>

    <div class="tables-container">
      <div class="table-card users-table">
        <div class="table-header">
          <span class="table-icon">👥</span>
          <span class="table-name">用户表 (users)</span>
          <span class="table-badge">主表</span>
        </div>
        <div class="table-content">
          <div class="table-row header">
            <div class="cell primary-key">
              🔑 user_id
            </div>
            <div class="cell">
              name
            </div>
            <div class="cell">
              phone
            </div>
            <div class="cell">
              address
            </div>
          </div>
          <div
            v-for="user in users"
            :key="user.user_id"
            class="table-row"
            :class="{ highlighted: highlightedUserId === user.user_id }"
            @mouseenter="highlightedUserId = user.user_id"
            @mouseleave="highlightedUserId = null"
          >
            <div class="cell primary-key">
              {{ user.user_id }}
            </div>
            <div class="cell">
              {{ user.name }}
            </div>
            <div class="cell">
              {{ user.phone }}
            </div>
            <div class="cell">
              {{ user.address }}
            </div>
          </div>
        </div>
      </div>

      <div class="relation-arrow">
        <div class="arrow-line" />
        <div class="arrow-head">
          ➤
        </div>
        <div class="relation-label">
          user_id (外键) → user_id (主键)
        </div>
      </div>

      <div class="table-card orders-table">
        <div class="table-header">
          <span class="table-icon">📦</span>
          <span class="table-name">订单表 (orders)</span>
          <span class="table-badge">从表</span>
        </div>
        <div class="table-content">
          <div class="table-row header">
            <div class="cell primary-key">
              🔑 order_id
            </div>
            <div class="cell">
              book_name
            </div>
            <div class="cell foreign-key">
              🔗 user_id
            </div>
            <div class="cell">
              price
            </div>
          </div>
          <div
            v-for="order in filteredOrders"
            :key="order.order_id"
            class="table-row"
            :class="{ highlighted: highlightedUserId === order.user_id }"
          >
            <div class="cell primary-key">
              {{ order.order_id }}
            </div>
            <div class="cell">
              {{ order.book_name }}
            </div>
            <div class="cell foreign-key">
              {{ order.user_id }}
            </div>
            <div class="cell">
              {{ order.price }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation-box">
      <div class="explanation-title">
        💡 核心概念
      </div>
      <div class="explanation-content">
        <p><strong>主键（Primary Key）</strong>：用户表的 <code>user_id</code> 是主键，唯一标识每个用户。</p>
        <p><strong>外键（Foreign Key）</strong>：订单表的 <code>user_id</code> 是外键，指向用户表的主键。</p>
        <p><strong>关联查询</strong>：通过外键，数据库可以快速找到"订单 001 是用户 101 买的"，然后去用户表查到"用户 101 是张三"。</p>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">🎯</span>
      <strong>核心优势：</strong>外键消除了数据冗余。张三的地址只存一次，无论他买多少本书。如果要修改地址，只需改用户表的一行，所有订单自动关联到新地址。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const highlightedUserId = ref(null)

const users = ref([
  { user_id: 101, name: '张三', phone: '138xxxx', address: '北京' },
  { user_id: 102, name: '李四', phone: '139xxxx', address: '上海' },
  { user_id: 103, name: '王五', phone: '137xxxx', address: '广州' }
])

const orders = ref([
  { order_id: '001', book_name: '百年孤独', user_id: 101, price: 59 },
  { order_id: '002', book_name: '活着', user_id: 101, price: 39 },
  { order_id: '003', book_name: '三体', user_id: 101, price: 99 },
  { order_id: '004', book_name: '百年孤独', user_id: 102, price: 59 },
  { order_id: '005', book_name: '红楼梦', user_id: 102, price: 79 },
  { order_id: '006', book_name: '西游记', user_id: 103, price: 69 }
])

const filteredOrders = computed(() => {
  if (!highlightedUserId.value) {
    return orders.value
  }
  return orders.value.filter(order => order.user_id === highlightedUserId.value)
})
</script>

<style scoped>
.relation-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.tables-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

@media (max-width: 960px) {
  .tables-container {
    grid-template-columns: 1fr;
  }
  .relation-arrow {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }
}

.table-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.table-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-icon { font-size: 1rem; }
.table-name { font-weight: 600; font-size: 0.85rem; flex: 1; }
.table-badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.table-content {
  max-height: 280px;
  
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 0.8fr;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table.row.header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.table-row.header .cell {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem 0.25rem;
}

.table-row .cell {
  font-size: 0.75rem;
  padding: 0.5rem 0.25rem;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-row.highlighted {
  background: rgba(34, 197, 94, 0.1);
}

.cell.primary-key {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.cell.foreign-key {
  color: #f59e0b;
  font-weight: 500;
}

.relation-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.arrow-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(to right, var(--vp-c-brand), #f59e0b);
  margin-bottom: 4px;
}

.arrow-head {
  color: #f59e0b;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.relation-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  text-align: center;
  max-width: 120px;
  line-height: 1.3;
}

.explanation-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.explanation-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.explanation-content p {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
  line-height: 1.5;
}

.explanation-content code {
  background: var(--vp-c-bg-soft);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
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
</style>
