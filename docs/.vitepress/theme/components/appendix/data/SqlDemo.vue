<template>
  <div class="sql-root">
    <div class="sql-header">
      <span class="sql-icon">🗄️</span>
      <span class="sql-title">SQL 演示</span>
    </div>

    <div class="sql-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['sql-tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="sql-content">
      <!-- CRUD 演示 -->
      <div v-if="activeTab === 'crud'" class="sql-section">
        <div class="sql-editor">
          <div class="sql-editor-header">
            <span class="sql-editor-title">SQL 编辑器</span>
          </div>
          <div class="sql-editor-body">
            <div class="sql-code" contenteditable="true" @blur="updateQuery">
              {{ currentQuery }}
            </div>
          </div>
          <div class="sql-editor-footer">
            <button class="sql-btn sql-btn-run" @click="runQuery">
              ▶ 运行
            </button>
            <select
              v-model="selectedQuery"
              class="sql-select"
              @change="selectQuery"
            >
              <option value="">选择示例...</option>
              <option value="select">SELECT 查询</option>
              <option value="insert">INSERT 插入</option>
              <option value="update">UPDATE 更新</option>
              <option value="delete">DELETE 删除</option>
            </select>
          </div>
        </div>

        <div class="sql-result">
          <div class="sql-result-header">
            <span class="sql-result-title">查询结果</span>
            <span class="sql-result-count">{{ result.length }} 行</span>
          </div>
          <div class="sql-result-body">
            <table class="sql-table">
              <thead>
                <tr>
                  <th v-for="col in columns" :key="col">{{ col }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in result" :key="i">
                  <td v-for="col in columns" :key="col">{{ row[col] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- JOIN 演示 -->
      <div v-else-if="activeTab === 'join'" class="sql-section">
        <div class="join-diagram">
          <div class="join-title">JOIN 类型对比</div>
          <div class="join-grid">
            <div
              v-for="join in joins"
              :key="join.type"
              class="join-card"
              :class="{ 'join-card-active': activeJoin === join.type }"
              @click="activeJoin = join.type"
            >
              <div class="join-name">{{ join.name }}</div>
              <div class="join-desc">{{ join.desc }}</div>
              <div class="join-viz">
                <div class="join-circle join-left"></div>
                <div class="join-circle join-right"></div>
                <div :class="['join-highlight', join.highlight]"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="join-result">
          <div class="join-sql">
            <div class="join-sql-title">SQL 示例</div>
            <pre class="join-code">{{ currentJoin.sql }}</pre>
          </div>
          <div class="join-table">
            <div class="join-table-title">查询结果</div>
            <table class="sql-table">
              <thead>
                <tr>
                  <th v-for="col in currentJoin.columns" :key="col">
                    {{ col }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in currentJoin.data" :key="i">
                  <td v-for="col in currentJoin.columns" :key="col">
                    {{ row[col] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 索引演示 -->
      <div v-else-if="activeTab === 'index'" class="sql-section">
        <div class="index-demo">
          <div class="index-title">索引原理</div>
          <div class="index-comparison">
            <div class="index-side">
              <div class="index-side-title">无索引</div>
              <div class="index-visual index-no-index">
                <div v-for="i in 8" :key="i" class="index-item">
                  {{ indexData[i - 1] }}
                </div>
              </div>
              <div class="index-stats">
                <div class="index-stat">
                  <span class="index-stat-label">查找 ID=5:</span>
                  <span class="index-stat-value">需要扫描 5 次</span>
                </div>
              </div>
            </div>

            <div class="index-side">
              <div class="index-side-title">有索引 (B+树)</div>
              <div class="index-visual index-tree">
                <div class="index-tree-level">
                  <div class="index-tree-node">1-8</div>
                </div>
                <div class="index-tree-level">
                  <div class="index-tree-node">1-4</div>
                  <div class="index-tree-node">5-8</div>
                </div>
                <div class="index-tree-level">
                  <div v-for="i in 8" :key="i" class="index-tree-node-small">
                    {{ i }}
                  </div>
                </div>
              </div>
              <div class="index-stats">
                <div class="index-stat">
                  <span class="index-stat-label">查找 ID=5:</span>
                  <span class="index-stat-value index-fast">只需 3 次比较</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="index-tips">
          <div class="index-tip-title">索引使用建议</div>
          <ul class="index-tips-list">
            <li>✓ 在 WHERE、JOIN、ORDER BY 列上创建索引</li>
            <li>✓ 选择性高的列适合建索引（如手机号、用户名）</li>
            <li>✗ 避免在低选择性列上建索引（如性别、状态）</li>
            <li>✗ 索引会降低写入性能，不要过度索引</li>
          </ul>
        </div>
      </div>

      <!-- 事务演示 -->
      <div v-else-if="activeTab === 'transaction'" class="sql-section">
        <div class="transaction-demo">
          <div class="transaction-title">ACID 特性</div>
          <div class="acid-grid">
            <div
              v-for="acid in acids"
              :key="acid.id"
              class="acid-card"
              :class="{ 'acid-card-active': activeAcid === acid.id }"
              @click="activeAcid = acid.id"
            >
              <div class="acid-letter">{{ acid.letter }}</div>
              <div class="acid-name">{{ acid.name }}</div>
              <div class="acid-desc">{{ acid.desc }}</div>
              <div class="acid-example">{{ acid.example }}</div>
            </div>
          </div>
        </div>

        <div class="transaction-flow">
          <div class="transaction-flow-title">转账示例</div>
          <div class="transaction-steps">
            <div class="transaction-step">
              <div class="transaction-step-number">1</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">开始事务</div>
                <code>BEGIN;</code>
              </div>
            </div>
            <div class="transaction-step">
              <div class="transaction-step-number">2</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">扣款</div>
                <code>UPDATE accounts SET balance = balance - 100 WHERE user_id =
                  1;</code>
              </div>
            </div>
            <div class="transaction-step">
              <div class="transaction-step-number">3</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">收款</div>
                <code>UPDATE accounts SET balance = balance + 100 WHERE user_id =
                  2;</code>
              </div>
            </div>
            <div class="transaction-step">
              <div class="transaction-step-number">4</div>
              <div class="transaction-step-content">
                <div class="transaction-step-title">提交事务</div>
                <code>COMMIT;</code>
              </div>
            </div>
          </div>
          <div class="transaction-note">
            如果步骤 2 或 3 失败，整个事务会回滚（ROLLBACK），保证原子性
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('crud')
const activeJoin = ref('inner')
const activeAcid = ref('atomicity')
const selectedQuery = ref('')
const currentQuery = ref('SELECT * FROM users;')

const tabs = [
  { id: 'crud', name: 'CRUD 操作', icon: '📝' },
  { id: 'join', name: 'JOIN 查询', icon: '🔗' },
  { id: 'index', name: '索引', icon: '📇' },
  { id: 'transaction', name: '事务', icon: '🔄' }
]

const queries = {
  select: 'SELECT id, name, email FROM users WHERE age > 18;',
  insert:
    "INSERT INTO users (name, email, age) VALUES ('王五', 'wangwu@example.com', 25);",
  update: 'UPDATE users SET age = 26 WHERE id = 1;',
  delete: 'DELETE FROM users WHERE id = 3;'
}

const indexData = ref([1, 2, 3, 4, 5, 6, 7, 8])

const columns = ref(['id', 'name', 'email', 'age'])
const result = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', age: 28 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 32 },
  { id: 3, name: '王五', email: 'wangwu@example.com', age: 25 }
])

const joins = {
  inner: {
    type: 'inner',
    name: 'INNER JOIN',
    desc: '只返回两个表中匹配的行',
    highlight: 'join-highlight-intersect',
    sql: `SELECT users.name, orders.order_id
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: '张三', order_id: 'ORD001' },
      { name: '李四', order_id: 'ORD002' }
    ]
  },
  left: {
    type: 'left',
    name: 'LEFT JOIN',
    desc: '返回左表所有行，右表不匹配的填 NULL',
    highlight: 'join-highlight-left',
    sql: `SELECT users.name, orders.order_id
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: '张三', order_id: 'ORD001' },
      { name: '李四', order_id: 'ORD002' },
      { name: '王五', order_id: 'NULL' }
    ]
  },
  right: {
    type: 'right',
    name: 'RIGHT JOIN',
    desc: '返回右表所有行，左表不匹配的填 NULL',
    highlight: 'join-highlight-right',
    sql: `SELECT users.name, orders.order_id
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: '张三', order_id: 'ORD001' },
      { name: '李四', order_id: 'ORD002' },
      { name: 'NULL', order_id: 'ORD003' }
    ]
  },
  full: {
    type: 'full',
    name: 'FULL OUTER JOIN',
    desc: '返回两个表所有行，不匹配的填 NULL',
    highlight: 'join-highlight-full',
    sql: `SELECT users.name, orders.order_id
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;`,
    columns: ['name', 'order_id'],
    data: [
      { name: '张三', order_id: 'ORD001' },
      { name: '李四', order_id: 'ORD002' },
      { name: '王五', order_id: 'NULL' },
      { name: 'NULL', order_id: 'ORD003' }
    ]
  }
}

const acids = {
  atomicity: {
    id: 'atomicity',
    letter: 'A',
    name: '原子性',
    desc: '事务中的操作要么全部成功，要么全部失败',
    example: '转账：要么同时成功，要么同时回滚'
  },
  consistency: {
    id: 'consistency',
    letter: 'C',
    name: '一致性',
    desc: '事务前后数据库状态一致，满足约束',
    example: '转账前后总金额不变'
  },
  isolation: {
    id: 'isolation',
    letter: 'I',
    name: '隔离性',
    desc: '并发事务之间互不干扰',
    example: '两个用户同时转账，不会相互影响'
  },
  durability: {
    id: 'durability',
    letter: 'D',
    name: '持久性',
    desc: '事务提交后，永久保存，即使系统故障',
    example: '转账成功后，断电也不会丢失'
  }
}

const currentJoin = computed(() => joins[activeJoin.value])

function updateQuery(e) {
  currentQuery.value = e.target.textContent
}

function selectQuery() {
  if (selectedQuery.value && queries[selectedQuery.value]) {
    currentQuery.value = queries[selectedQuery.value]
  }
}

function runQuery() {
  // 模拟查询执行
  console.log('Running query:', currentQuery.value)
}
</script>

<style scoped>
.sql-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.sql-header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.sql-icon {
  font-size: 20px;
}

.sql-title {
  font-weight: 600;
  font-size: 15px;
}

.sql-tabs {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.sql-tab {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.sql-tab:hover {
  border-color: var(--vp-c-brand);
}

.sql-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.sql-content {
  padding: 20px;
}

/* CRUD 演示 */
.sql-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sql-editor,
.sql-result {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.sql-editor-header,
.sql-result-header {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sql-editor-title,
.sql-result-title {
  font-weight: 600;
  font-size: 13px;
}

.sql-result-count {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
}

.sql-editor-body,
.sql-result-body {
  padding: 12px;
}

.sql-code {
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 6px;
  min-height: 80px;
  white-space: pre-wrap;
  word-break: break-all;
}

.sql-editor-footer {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 10px;
}

.sql-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.sql-btn:hover {
  border-color: var(--vp-c-brand);
}

.sql-btn-run {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.sql-select {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
}

.sql-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.sql-table th,
.sql-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sql-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sql-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

/* JOIN 演示 */
.join-diagram {
  margin-bottom: 20px;
}

.join-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.join-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.join-card {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.join-card:hover,
.join-card-active {
  border-color: var(--vp-c-brand);
}

.join-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
}

.join-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.join-viz {
  position: relative;
  height: 80px;
}

.join-circle {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  top: 10px;
}

.join-left {
  left: 10px;
}

.join-right {
  right: 10px;
}

.join-highlight {
  position: absolute;
  top: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.2);
}

.join-highlight-intersect {
  left: 25px;
  width: 50px;
  height: 50px;
}

.join-highlight-left {
  left: 10px;
  width: 60px;
}

.join-highlight-right {
  right: 10px;
  width: 60px;
}

.join-highlight-full {
  left: 10px;
  width: calc(100% - 20px);
  border-radius: 8px;
}

.join-result {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.join-sql,
.join-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
}

.join-sql-title,
.join-table-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 10px;
}

.join-code {
  margin: 0;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
}

/* 索引演示 */
.index-demo {
  margin-bottom: 16px;
}

.index-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.index-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.index-side {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}

.index-side-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
  text-align: center;
}

.index-visual {
  min-height: 120px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 12px;
}

.index-no-index {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.index-item {
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
}

.index-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.index-tree-level {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.index-tree-node {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.index-tree-node-small {
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 11px;
  font-family: 'Menlo', 'Monaco', monospace;
}

.index-stats {
  text-align: center;
}

.index-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.index-stat-label {
  color: var(--vp-c-text-3);
}

.index-stat-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.index-fast {
  color: #22c55e;
}

.index-tips {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}

.index-tip-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 10px;
}

.index-tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.index-tips-list li {
  padding: 6px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* 事务演示 */
.transaction-demo {
  margin-bottom: 16px;
}

.transaction-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.acid-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.acid-card {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.acid-card:hover,
.acid-card-active {
  border-color: var(--vp-c-brand);
}

.acid-letter {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.acid-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
}

.acid-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.acid-example {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.transaction-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  background: var(--vp-c-bg);
}

.transaction-flow-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 12px;
}

.transaction-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.transaction-step {
  display: flex;
  gap: 12px;
}

.transaction-step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.transaction-step-content {
  flex: 1;
}

.transaction-step-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}

.transaction-step-content code {
  display: block;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 8px;
  border-radius: 4px;
  margin-top: 4px;
  word-break: break-all;
}

.transaction-note {
  font-size: 12px;
  color: var(--vp-c-text-3);
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

@media (max-width: 768px) {
  .join-result,
  .index-comparison {
    grid-template-columns: 1fr;
  }

  .acid-grid {
    grid-template-columns: 1fr;
  }

  .sql-editor-footer {
    flex-direction: column;
  }
}
</style>
