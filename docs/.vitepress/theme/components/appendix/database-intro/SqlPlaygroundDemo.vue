<template>
  <div class="sql-playground-demo">
    <div class="demo-header">
      <span class="icon">💻</span>
      <span class="title">SQL 练习场</span>
      <span class="subtitle">体验 SQL 的 CRUD 操作</span>
    </div>

    <div class="intro-text">
      SQL 就像和数据库<span class="highlight">对话</span>：你说"给我找所有年龄大于 25 的用户"，数据库就会执行查询并返回结果。即使不会编程，也能很快上手。
    </div>

    <div class="playground-container">
      <div class="operation-selector">
        <button
          v-for="op in operations"
          :key="op.key"
          class="op-btn"
          :class="{ active: currentOp === op.key }"
          @click="currentOp = op.key"
        >
          <span class="op-icon">{{ op.icon }}</span>
          <span class="op-name">{{ op.name }}</span>
          <span class="op-keyword">{{ op.keyword }}</span>
        </button>
      </div>

      <div class="content-area">
        <div class="example-section">
          <div class="section-title">
            📝 示例 SQL
          </div>
          <div class="code-block">
            <pre><code>{{ currentOperation.example }}</code></pre>
          </div>
        </div>

        <div class="explanation-section">
          <div class="section-title">
            💡 逐词翻译
          </div>
          <div class="explanation-list">
            <div
              v-for="(item, i) in currentOperation.explanation"
              :key="i"
              class="explanation-item"
            >
              <span class="keyword">{{ item.keyword }}</span>
              <span class="meaning">{{ item.meaning }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">
          📊 返回结果
        </div>
        <div class="result-table">
          <div class="table-header">
            <div
              v-for="col in currentOperation.result.columns"
              :key="col"
              class="header-cell"
            >
              {{ col }}
            </div>
          </div>
          <div class="table-body">
            <div
              v-for="(row, i) in currentOperation.result.rows"
              :key="i"
              class="table-row"
            >
              <div
                v-for="(cell, j) in row"
                :key="j"
                class="table-cell"
              >
                {{ cell }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentOperation.warning"
      class="warning-box"
    >
      <span class="icon">⚠️</span>
      <span v-html="currentOperation.warning" />
    </div>

    <div class="info-box">
      <span class="icon">🎯</span>
      <strong>核心概念：</strong>CRUD 涵盖了所有数据管理的基本需求。无论是淘宝、微信、抖音，它们的数据库操作本质上就是这四种：增、删、改、查。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentOp = ref('SELECT')

const operations = {
  SELECT: {
    key: 'SELECT',
    name: '查询',
    icon: '🔍',
    keyword: 'SELECT ... FROM',
    example: "SELECT name, age FROM users WHERE age > 25;",
    explanation: [
      { keyword: 'SELECT name, age', meaning: '选择 name 和 age 这两列' },
      { keyword: 'FROM users', meaning: '从 users 这张表' },
      { keyword: 'WHERE age > 25', meaning: '在 age 大于 25 的条件下' }
    ],
    result: {
      columns: ['name', 'age'],
      rows: [
        ['李四', 30],
        ['王五', 28]
      ]
    }
  },
  INSERT: {
    key: 'INSERT',
    name: '插入',
    icon: '➕',
    keyword: 'INSERT INTO',
    example: "INSERT INTO users (name, age, city) VALUES ('赵六', 35, '广州');",
    explanation: [
      { keyword: 'INSERT INTO users', meaning: '插入到 users 表' },
      { keyword: '(name, age, city)', meaning: '这几列' },
      { keyword: "VALUES ('赵六', 35, '广州')", meaning: '值分别是...' }
    ],
    result: {
      columns: ['结果'],
      rows: [['✅ 成功插入 1 行']]
    },
    warning: '<strong>注意：</strong>字符串要用单引号包围，数字不需要引号。'
  },
  UPDATE: {
    key: 'UPDATE',
    name: '更新',
    icon: '✏️',
    keyword: 'UPDATE ... SET',
    example: "UPDATE users SET age = age + 1 WHERE city = '北京';",
    explanation: [
      { keyword: 'UPDATE users', meaning: '更新 users 表' },
      { keyword: 'SET age = age + 1', meaning: '把 age 设为 age + 1' },
      { keyword: "WHERE city = '北京'", meaning: '只修改城市为北京的行' }
    ],
    result: {
      columns: ['结果'],
      rows: [['✅ 成功更新 2 行']]
    },
    warning: '<strong>重要警告：</strong>如果忘记写 WHERE，会修改<strong>所有行</strong>！这是最危险的操作之一。'
  },
  DELETE: {
    key: 'DELETE',
    name: '删除',
    icon: '🗑️',
    keyword: 'DELETE FROM',
    example: 'DELETE FROM users WHERE user_id = 4;',
    explanation: [
      { keyword: 'DELETE FROM users', meaning: '从 users 表删除' },
      { keyword: 'WHERE user_id = 4', meaning: '只删除 user_id 为 4 的行' }
    ],
    result: {
      columns: ['结果'],
      rows: [['✅ 成功删除 1 行']]
    },
    warning: '<strong>重要警告：</strong>和 UPDATE 一样，如果忘记写 WHERE，会删除<strong>整张表</strong>的所有数据！'
  }
}

const currentOperation = computed(() => operations[currentOp.value])
</script>

<style scoped>
.sql-playground-demo {
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

.operation-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .operation-selector {
    grid-template-columns: repeat(2, 1fr);
  }
}

.op-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0.75rem 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.op-btn:hover {
  background: var(--vp-c-bg-soft);
}

.op-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.op-icon { font-size: 1.25rem; }
.op-name { font-size: 0.8rem; font-weight: 500; }
.op-keyword { font-size: 0.65rem; color: var(--vp-c-text-3); font-family: monospace; }

.content-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .content-area {
    grid-template-columns: 1fr;
  }
}

.example-section, .explanation-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.code-block {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.75rem;
  overflow-x: auto;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  line-height: 1.5;
}

.explanation-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.explanation-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.keyword {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  font-weight: 500;
  flex-shrink: 0;
}

.meaning {
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.result-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.75rem;
}

.result-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.table-header {
  display: grid;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-cell {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.warning-box {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.warning-box .icon {
  margin-right: 0.25rem;
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
