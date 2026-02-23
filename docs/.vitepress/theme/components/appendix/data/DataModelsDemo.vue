<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🗄️</span>
      <span class="title">数据模型设计演示</span>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: active === tab.id }]"
        @click="active = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <!-- ER 图展示 -->
      <div v-if="active === 'er'" class="section">
        <h4>实体关系图（ER Diagram）</h4>
        <div class="er-diagram">
          <div class="er-table users">
            <div class="table-header">
              <span class="table-name">users</span>
              <span class="table-type">用户表</span>
            </div>
            <div class="table-fields">
              <div class="field pk">
                <span class="field-key">PK</span>
                <code>id</code>
                <span class="field-type">BIGINT</span>
              </div>
              <div class="field">
                <span class="field-key"></span>
                <code>username</code>
                <span class="field-type">VARCHAR(50)</span>
              </div>
              <div class="field">
                <span class="field-key"></span>
                <code>email</code>
                <span class="field-type">VARCHAR(100)</span>
              </div>
              <div class="field">
                <span class="field-key"></span>
                <code>created_at</code>
                <span class="field-type">TIMESTAMP</span>
              </div>
            </div>
          </div>

          <div class="relationship one-to-many">
            <div class="rel-line">
              <span class="rel-cardinality">1</span>
              <span class="rel-arrow">———⟡</span>
              <span class="rel-cardinality">N</span>
            </div>
            <div class="rel-label">一个用户可以有多个订单</div>
          </div>

          <div class="er-table orders">
            <div class="table-header">
              <span class="table-name">orders</span>
              <span class="table-type">订单表</span>
            </div>
            <div class="table-fields">
              <div class="field pk">
                <span class="field-key">PK</span>
                <code>id</code>
                <span class="field-type">BIGINT</span>
              </div>
              <div class="field fk">
                <span class="field-key">FK</span>
                <code>user_id</code>
                <span class="field-type">BIGINT</span>
              </div>
              <div class="field">
                <span class="field-key"></span>
                <code>total_amount</code>
                <span class="field-type">DECIMAL(10,2)</span>
              </div>
              <div class="field">
                <span class="field-key"></span>
                <code>status</code>
                <span class="field-type">VARCHAR(20)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="legend">
          <div class="legend-item">
            <span class="legend-key pk">PK</span>
            <span>主键 (Primary Key)</span>
          </div>
          <div class="legend-item">
            <span class="legend-key fk">FK</span>
            <span>外键 (Foreign Key)</span>
          </div>
          <div class="legend-item">
            <span class="legend-rel">1 ———⟡ N</span>
            <span>一对多关系</span>
          </div>
        </div>
      </div>

      <!-- 关系类型 -->
      <div v-if="active === 'relationships'" class="section">
        <h4>三种基本关系类型</h4>
        <div class="relationship-cards">
          <div class="rel-card">
            <div class="rel-icon">1️⃣</div>
            <div class="rel-title">一对一 (One-to-One)</div>
            <div class="rel-example">
              <div class="rel-tables">
                <code>users</code> → <code>user_profiles</code>
              </div>
              <div class="rel-desc">一个用户只有一个详细资料</div>
            </div>
            <div class="rel-sql">
              <pre>user_id UNIQUE</pre>
            </div>
          </div>

          <div class="rel-card">
            <div class="rel-icon">1️⃣➡️🔢</div>
            <div class="rel-title">一对多 (One-to-Many)</div>
            <div class="rel-example">
              <div class="rel-tables">
                <code>users</code> → <code>orders</code>
              </div>
              <div class="rel-desc">一个用户可以有多个订单</div>
            </div>
            <div class="rel-sql">
              <pre>user_id FOREIGN KEY</pre>
            </div>
          </div>

          <div class="rel-card">
            <div class="rel-icon">🔢↔️🔢</div>
            <div class="rel-title">多对多 (Many-to-Many)</div>
            <div class="rel-example">
              <div class="rel-tables">
                <code>students</code> ↔ <code>courses</code>
              </div>
              <div class="rel-desc">
                一个学生可以选多门课，一门课可以有多个学生
              </div>
            </div>
            <div class="rel-sql">
              <pre>
中间表: enrollments
- student_id FK
- course_id FK</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 范式理论 -->
      <div v-if="active === 'normalization'" class="section">
        <h4>范式理论：从混乱到有序</h4>
        <div class="norm-container">
          <div class="norm-tabs">
            <button
              v-for="norm in norms"
              :key="norm.id"
              :class="['norm-tab', { active: normId === norm.id }]"
              @click="normId = norm.id"
            >
              {{ norm.name }}
            </button>
          </div>

          <div class="norm-content">
            <div class="norm-header">
              <span class="norm-title">{{ currentNorm.name }}</span>
              <span class="norm-desc">{{ currentNorm.desc }}</span>
            </div>

            <div class="norm-example">
              <div v-if="currentNorm.before" class="norm-before">
                <div class="norm-label">
                  ❌ {{ currentNorm.beforeTitle || '不符合' }}
                </div>
                <pre class="norm-code">{{ currentNorm.before }}</pre>
              </div>
              <div v-if="currentNorm.after" class="norm-after">
                <div class="norm-label">
                  ✅ {{ currentNorm.afterTitle || '符合' }}
                </div>
                <pre class="norm-code">{{ currentNorm.after }}</pre>
              </div>
            </div>

            <div v-if="currentNorm.note" class="norm-note">
              <span class="note-icon">💡</span>
              <span class="note-text">{{ currentNorm.note }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 反范式化 -->
      <div v-if="active === 'denormalization'" class="section">
        <h4>反范式化：用空间换时间</h4>
        <div class="denorm-box">
          <div class="denorm-scenario">
            <h5>场景：电商订单查询</h5>
            <div class="denorm-comparison">
              <div class="denorm-side norm">
                <div class="denorm-title">范式化设计</div>
                <div class="denorm-tables">
                  <pre class="code-sm">
orders:      users:
- id         - id
- user_id ⟐  - name
- total      - email
- status
                  </pre>
                </div>
                <div class="denorm-query">
                  <div class="query-label">查询 SQL：</div>
                  <pre class="code-sm">
SELECT o.*, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.id = 123;</pre>
                </div>
                <div class="denorm-result">
                  <span class="result-label">结果：</span>
                  <span class="result-bad">需要 JOIN，查询慢</span>
                </div>
              </div>

              <div class="denorm-arrow">→</div>

              <div class="denorm-side denorm">
                <div class="denorm-title">反范式化设计</div>
                <div class="denorm-tables">
                  <pre class="code-sm">
orders:
- id
- user_id
- user_name     ← 冗余
- user_email    ← 冗余
- total
- status</pre>
                </div>
                <div class="denorm-query">
                  <div class="query-label">查询 SQL：</div>
                  <pre class="code-sm">
SELECT *
FROM orders
WHERE id = 123;</pre>
                </div>
                <div class="denorm-result">
                  <span class="result-label">结果：</span>
                  <span class="result-good">单表查询，速度快</span>
                </div>
              </div>
            </div>
          </div>

          <div class="denorm-tradeoff">
            <div class="tradeoff-item">
              <span class="tradeoff-icon">✅</span>
              <span class="tradeoff-text">查询性能提升，减少 JOIN</span>
            </div>
            <div class="tradeoff-item">
              <span class="tradeoff-icon">⚠️</span>
              <span class="tradeoff-text">数据冗余，占用更多存储</span>
            </div>
            <div class="tradeoff-item">
              <span class="tradeoff-icon">⚠️</span>
              <span class="tradeoff-text">更新时需同步冗余字段</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 电商实战 -->
      <div v-if="active === 'ecommerce'" class="section">
        <h4>实战：电商系统数据模型</h4>
        <div class="ecommerce-diagram">
          <div class="ecosystem">
            <!-- 用户中心 -->
            <div class="eco-module users-module">
              <div class="module-title">用户模块</div>
              <div class="module-tables">
                <div class="mini-table">users</div>
                <div class="mini-table">user_addresses</div>
                <div class="mini-table">user_profiles</div>
              </div>
            </div>

            <!-- 商品中心 -->
            <div class="eco-module products-module">
              <div class="module-title">商品模块</div>
              <div class="module-tables">
                <div class="mini-table">categories</div>
                <div class="mini-table">products</div>
                <div class="mini-table">product_skus</div>
                <div class="mini-table">product_inventory</div>
              </div>
            </div>

            <!-- 订单中心 -->
            <div class="eco-module orders-module">
              <div class="module-title">订单模块</div>
              <div class="module-tables">
                <div class="mini-table">orders</div>
                <div class="mini-table">order_items</div>
                <div class="mini-table">payments</div>
              </div>
            </div>

            <!-- 营销中心 -->
            <div class="eco-module marketing-module">
              <div class="module-title">营销模块</div>
              <div class="module-tables">
                <div class="mini-table">coupons</div>
                <div class="mini-table">user_coupons</div>
                <div class="mini-table">promotions</div>
              </div>
            </div>
          </div>

          <div class="relationships">
            <div class="rel-item">
              <span class="rel-from">users</span>
              <span class="rel-type">1:N</span>
              <span class="rel-to">orders</span>
            </div>
            <div class="rel-item">
              <span class="rel-from">orders</span>
              <span class="rel-type">1:N</span>
              <span class="rel-to">order_items</span>
            </div>
            <div class="rel-item">
              <span class="rel-from">products</span>
              <span class="rel-type">1:N</span>
              <span class="rel-to">product_skus</span>
            </div>
            <div class="rel-item">
              <span class="rel-from">users & coupons</span>
              <span class="rel-type">M:N</span>
              <span class="rel-to">user_coupons</span>
            </div>
          </div>
        </div>

        <div class="design-principles">
          <div class="principle-item">
            <span class="principle-icon">📐</span>
            <div class="principle-text">
              <strong>适度范式</strong>
              <div class="principle-desc">
                核心业务表遵循 3NF，查询表适当反范式化
              </div>
            </div>
          </div>
          <div class="principle-item">
            <span class="principle-icon">🔗</span>
            <div class="principle-text">
              <strong>明确关系</strong>
              <div class="principle-desc">通过外键约束保证数据完整性</div>
            </div>
          </div>
          <div class="principle-item">
            <span class="principle-icon">📊</span>
            <div class="principle-text">
              <strong>预留扩展</strong>
              <div class="principle-desc">
                使用 JSON 字段存储非结构化扩展数据
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 反模式 -->
      <div v-if="active === 'antipatterns'" class="section">
        <h4>常见反模式及改进</h4>
        <div class="antipatterns-list">
          <div v-for="anti in antipatterns" :key="anti.id" class="anti-item">
            <div class="anti-header">
              <span class="anti-icon">{{ anti.icon }}</span>
              <span class="anti-title">{{ anti.title }}</span>
            </div>
            <div class="anti-problem">
              <div class="anti-label">❌ 问题</div>
              <pre class="anti-code">{{ anti.problem }}</pre>
            </div>
            <div class="anti-solution">
              <div class="anti-label">✅ 改进</div>
              <pre class="anti-code">{{ anti.solution }}</pre>
            </div>
            <div v-if="anti.impact" class="anti-impact">
              <span class="impact-icon">💥</span>
              <span class="impact-text">{{ anti.impact }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('er')
const normId = ref('1nf')

const tabs = [
  { id: 'er', icon: '📊', name: 'ER 图' },
  { id: 'relationships', icon: '🔗', name: '关系类型' },
  { id: 'normalization', icon: '📐', name: '范式理论' },
  { id: 'denormalization', icon: '⚡', name: '反范式化' },
  { id: 'ecommerce', icon: '🛒', name: '电商实战' },
  { id: 'antipatterns', icon: '⚠️', name: '反模式' }
]

const norms = [
  {
    id: '1nf',
    name: '第一范式 (1NF)',
    desc: '每个字段都是不可再分的最小数据单元',
    beforeTitle: '不符合 1NF',
    before: `users 表:
| id | name           |
|----|----------------|
| 1  | 张三,北京,工程师 |`,
    afterTitle: '符合 1NF',
    after: `users 表:
| id | name | city   | role    |
|----|------|--------|---------|
| 1  | 张三 | 北京   | 工程师  |`,
    note: '字段原子性：一个字段只存储一个值'
  },
  {
    id: '2nf',
    name: '第二范式 (2NF)',
    desc: '在 1NF 基础上，非主键字段完全依赖于主键',
    beforeTitle: '不符合 2NF',
    before: `order_items 表:
| id | order_id | product_name | quantity | unit_price |
|----|----------|--------------|----------|------------|
| 1  | 100      | iPhone       | 2        | 5999       |`,
    afterTitle: '符合 2NF',
    after: `order_items 表:
| id | order_id | product_id | quantity |
|----|----------|------------|----------|
| 1  | 100      | 1          | 2        |

products 表:
| id | name       | price    |
|----|------------|----------|
| 1  | iPhone     | 5999     |`,
    note: '消除部分依赖：product_name 只依赖 product_id，不依赖 (order_id, product_id) 联合主键'
  },
  {
    id: '3nf',
    name: '第三范式 (3NF)',
    desc: '在 2NF 基础上，非主键字段不传递依赖主键',
    beforeTitle: '不符合 3NF',
    before: `orders 表:
| id | user_id | total | user_level | discount |
|----|---------|-------|------------|----------|
| 1  | 100     | 500   | VIP        | 0.9      |`,
    afterTitle: '符合 3NF',
    after: `orders 表:
| id | user_id | total | discount |
|----|---------|-------|----------|
| 1  | 100     | 500   | 0.9      |

users 表:
| id | level |
|----|-------|
| 100| VIP   |`,
    note: '消除传递依赖：user_level 依赖 user_id，再依赖 orders.id'
  }
]

const antipatterns = [
  {
    id: 'flat',
    icon: '📋',
    title: '巨型宽表',
    problem: `big_table 表:
- id
- user_name
- user_email
- user_phone
- user_address_city
- user_address_street
- order_1_id
- order_1_amount
- order_2_id
- order_2_amount
- ...（订单字段重复 100 次）`,
    solution: `users 表:
- id
- name
- email
- phone

orders 表:
- id
- user_id
- amount
- created_at`,
    impact: '字段数量爆炸，空值多，扩展困难'
  },
  {
    id: 'comma',
    icon: '🔢',
    title: '逗号分隔值',
    problem: `posts 表:
| id | title      | tags               |
|----|------------|--------------------|
| 1  | Vue入门    | vue,frontend,jjs   |`,
    solution: `posts 表:
| id | title      |
|----|------------|
| 1  | Vue入门    |

post_tags 表:
| post_id | tag_id |
|---------|--------|
| 1       | 1      |
| 1       | 2      |

tags 表:
| id | name      |
|----|-----------|
| 1  | vue       |
| 2  | frontend |`,
    impact: '无法索引，无法关联查询，无法统计'
  },
  {
    id: 'json',
    icon: '📦',
    title: '滥用 JSON 字段',
    problem: `orders 表:
| id | user_id | items                  | total |
|----|---------|------------------------|-------|
| 1  | 100     | [{"pid":1,"qty":2}]    | 200   |`,
    solution: `orders 表:
| id | user_id | total |
|----|---------|-------|
| 1  | 100     | 200   |

order_items 表:
| id | order_id | product_id | quantity |
|----|----------|------------|----------|
| 1  | 1        | 1          | 2        |`,
    impact: '无法建立外键约束，无法有效索引，数据完整性差'
  }
]

const currentNorm = computed(() => {
  return norms.find((n) => n.id === normId.value) || norms[0]
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 16px;
}

.section h4 {
  margin: 0 0 14px 0;
  font-size: 15px;
}

/* ER Diagram Styles */
.er-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}

.er-table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  min-width: 280px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.table-type {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.table-fields {
  display: flex;
  flex-direction: column;
}

.field {
  display: grid;
  grid-template-columns: 32px 1fr 80px;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  align-items: center;
  font-size: 12px;
}

.field:last-child {
  border-bottom: none;
}

.field.pk {
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg));
}

.field.fk {
  background: color-mix(in srgb, #3b82f6 8%, var(--vp-c-bg));
}

.field-key {
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-text-3);
}

.field.pk .field-key {
  color: #22c55e;
}

.field.fk .field-key {
  color: #3b82f6;
}

.field code {
  font-size: 11px;
  color: var(--vp-c-text-1);
}

.field-type {
  font-size: 10px;
  color: var(--vp-c-text-3);
  text-align: right;
}

.relationship {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.rel-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.rel-cardinality {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.rel-arrow {
  font-size: 16px;
}

.rel-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 11px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-key {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
}

.legend-key.pk {
  background: color-mix(in srgb, #22c55e 20%, transparent);
  color: #22c55e;
}

.legend-key.fk {
  background: color-mix(in srgb, #3b82f6 20%, transparent);
  color: #3b82f6;
}

.legend-rel {
  font-size: 12px;
}

/* Relationship Cards */
.relationship-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.rel-card {
  padding: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.rel-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.rel-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.rel-example {
  margin-bottom: 10px;
}

.rel-tables {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.rel-tables code {
  background: var(--vp-c-bg-soft);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.rel-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.rel-sql {
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg));
  padding: 8px;
  border-radius: 4px;
}

.rel-sql pre {
  margin: 0;
  font-size: 10px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

/* Normalization Styles */
.norm-container {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
}

.norm-tabs {
  display: flex;
  gap: 2px;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.norm-tab {
  padding: 6px 14px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.norm-tab:hover {
  background: var(--vp-c-bg-soft);
}

.norm-tab.active {
  background: var(--vp-c-brand);
  color: white;
}

.norm-content {
  padding: 14px;
}

.norm-header {
  margin-bottom: 14px;
}

.norm-title {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

.norm-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.norm-example {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

@media (min-width: 768px) {
  .norm-example {
    grid-template-columns: 1fr 1fr;
  }
}

.norm-before,
.norm-after {
  padding: 12px;
  border-radius: 6px;
}

.norm-before {
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, #ef4444 20%, transparent);
}

.norm-after {
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, #22c55e 20%, transparent);
}

.norm-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.norm-code {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 10px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.norm-note {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 11px;
}

.note-icon {
  font-size: 14px;
}

.note-text {
  color: var(--vp-c-text-2);
}

/* Denormalization */
.denorm-box {
  background: var(--vp-c-bg);
  padding: 14px;
  border-radius: 8px;
}

.denorm-scenario {
  margin-bottom: 14px;
}

.denorm-scenario h5 {
  margin: 0 0 12px 0;
  font-size: 13px;
}

.denorm-comparison {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  align-items: center;
}

@media (min-width: 768px) {
  .denorm-comparison {
    grid-template-columns: 1fr auto 1fr;
  }
}

.denorm-side {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.denorm-side.norm {
  background: color-mix(in srgb, #ef4444 5%, var(--vp-c-bg));
}

.denorm-side.denorm {
  background: color-mix(in srgb, #22c55e 5%, var(--vp-c-bg));
}

.denorm-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.denorm-tables {
  margin-bottom: 10px;
}

.denorm-query {
  margin-bottom: 10px;
}

.query-label {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
}

.denorm-result {
  font-size: 11px;
}

.result-label {
  font-weight: 600;
}

.result-bad {
  color: #ef4444;
}

.result-good {
  color: #22c55e;
}

.denorm-arrow {
  font-size: 20px;
  color: var(--vp-c-text-3);
}

.denorm-tradeoff {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tradeoff-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.tradeoff-icon {
  font-size: 14px;
}

/* E-commerce Diagram */
.ecommerce-diagram {
  background: var(--vp-c-bg);
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 14px;
}

.ecosystem {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

@media (min-width: 768px) {
  .ecosystem {
    grid-template-columns: repeat(2, 1fr);
  }
}

.eco-module {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.module-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-brand);
}

.module-tables {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-table {
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 11px;
  font-family: 'Menlo', monospace;
}

.relationships {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rel-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 11px;
}

.rel-from,
.rel-to {
  font-family: 'Menlo', monospace;
  color: var(--vp-c-brand);
}

.rel-type {
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.design-principles {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.principle-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.principle-icon {
  font-size: 18px;
}

.principle-text {
  flex: 1;
}

.principle-text strong {
  display: block;
  font-size: 12px;
  margin-bottom: 2px;
}

.principle-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

/* Antipatterns */
.antipatterns-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.anti-item {
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.anti-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.anti-icon {
  font-size: 18px;
}

.anti-title {
  font-size: 13px;
  font-weight: 600;
}

.anti-problem,
.anti-solution {
  margin-bottom: 8px;
}

.anti-label {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
}

.anti-code {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 10px;
  line-height: 1.4;
  overflow-x: auto;
  margin: 0;
}

.anti-impact {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.impact-icon {
  font-size: 14px;
}

.code-sm {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 10px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}
</style>
