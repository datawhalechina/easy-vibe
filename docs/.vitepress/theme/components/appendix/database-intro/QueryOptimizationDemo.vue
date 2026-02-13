<template>
  <div class="optimization-demo">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">查询优化演示</span>
      <span class="subtitle">常见错误与正确做法对比</span>
    </div>

    <div class="intro-text">
      很多时候，查询慢不是因为<span class="highlight">数据库性能差</span>，而是因为 SQL 写错了。下面这些错误，你可能每天都在犯。
    </div>

    <div class="pitfalls-list">
      <div
        v-for="(pitfall, index) in pitfalls"
        :key="index"
        class="pitfall-card"
        :class="{ expanded: expandedIndex === index }"
      >
        <div class="pitfall-header" @click="expandedIndex = expandedIndex === index ? null : index">
          <div class="pitfall-number">{{ index + 1 }}</div>
          <div class="pitfall-title">{{ pitfall.title }}</div>
          <div class="expand-icon">{{ expandedIndex === index ? '▼' : '▶' }}</div>
        </div>

        <Transition name="expand">
          <div v-if="expandedIndex === index" class="pitfall-content">
            <div class="code-comparison">
              <div class="code-section wrong">
                <div class="section-label">❌ 错误写法</div>
                <pre><code>{{ pitfall.wrong }}</code></pre>
                <div class="impact">⚠️ {{ pitfall.impact }}</div>
              </div>
              <div class="code-section correct">
                <div class="section-label">✅ 正确写法</div>
                <pre><code>{{ pitfall.correct }}</code></pre>
                <div class="benefit">💡 {{ pitfall.benefit }}</div>
              </div>
            </div>
            <div class="explanation">
              <strong>原理：</strong>{{ pitfall.explanation }}
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="tips-box">
      <div class="tips-title">📝 优化建议清单</div>
      <div class="tips-list">
        <div v-for="(tip, i) in tips" :key="i" class="tip-item">
          <span class="tip-icon">✓</span>
          <span class="tip-text">{{ tip }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">🎯</span>
      <strong>核心原则：</strong>不要让数据库做"多余的工作"。索引失效、全表扫描、返回不必要的数据，这些都是最常见的性能杀手。写出高效 SQL 的关键，是<span class="highlight">理解数据库如何执行你的查询</span>。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedIndex = ref(0)

const pitfalls = ref([
  {
    title: '在索引列上使用函数',
    wrong: "SELECT * FROM users WHERE YEAR(created_at) = 2024;",
    correct: "SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';",
    impact: '索引失效，全表扫描',
    benefit: '可以使用索引，查询速度提升 1000 倍',
    explanation: '当对列使用函数时，数据库必须先计算每一行的函数值，无法使用索引。把函数移到等号右边，或用范围查询代替。'
  },
  {
    title: '隐式类型转换',
    wrong: "SELECT * FROM users WHERE user_id = '123';  -- user_id 是 int",
    correct: "SELECT * FROM users WHERE user_id = 123;",
    impact: '索引失效，每次都要类型转换',
    benefit: '直接使用索引',
    explanation: '字符串和数字比较时，数据库会隐式转换，导致索引失效。确保比较的类型和列定义的类型一致。'
  },
  {
    title: 'LIKE 以 % 开头',
    wrong: "SELECT * FROM users WHERE name LIKE '%张三%';",
    correct: "SELECT * FROM users WHERE name LIKE '张三%';",
    impact: '无法使用索引，全表扫描',
    benefit: '可以使用索引进行前缀匹配',
    explanation: '索引是按照顺序存储的，% 开头的模糊查询无法利用顺序。如果只需要前缀匹配，把 % 放到后面。'
  },
  {
    title: 'SELECT * 返回所有列',
    wrong: "SELECT * FROM users WHERE user_id = 1;",
    correct: "SELECT user_id, name, email FROM users WHERE user_id = 1;",
    impact: '增加网络传输和内存消耗，无法使用覆盖索引',
    benefit: '减少传输量，可能使用覆盖索引',
    explanation: '只查询需要的列。如果索引包含了所有需要的列，数据库可以直接从索引返回数据，不需要查表（覆盖索引）。'
  }
])

const tips = ref([
  '为 WHERE、JOIN、ORDER BY 的列创建索引',
  '避免在索引列上使用函数或表达式',
  '用 EXPLAIN 分析查询执行计划',
  '只查询需要的列，避免 SELECT *',
  '批量操作代替单条操作',
  '考虑使用覆盖索引减少回表'
])
</script>

<style scoped>
.optimization-demo {
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

.pitfalls-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.pitfall-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.pitfall-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.pitfall-header:hover {
  background: var(--vp-c-bg-soft);
}

.pitfall-number {
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.pitfall-title {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.expand-icon {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.pitfall-content {
  padding: 0 0.75rem 0.75rem;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}

.code-section {
  border-radius: 6px;
  overflow: hidden;
}

.code-section.wrong {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.code-section.correct {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.section-label {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.code-section.wrong .section-label {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.code-section.correct .section-label {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.code-section pre {
  margin: 0;
  padding: 0.75rem;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.02);
}

.code-section code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
}

.impact, .benefit {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.impact {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.benefit {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.explanation {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.tips-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.tips-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .tips-list {
    grid-template-columns: 1fr;
  }
}

.tip-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.tip-icon {
  color: #22c55e;
  font-weight: bold;
  flex-shrink: 0;
}

.tip-text {
  line-height: 1.4;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
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
