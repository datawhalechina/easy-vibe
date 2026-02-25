<!--
  SearchRelevanceDemo.vue
  搜索相关性评分演示：展示 TF-IDF 和 BM25 评分原理
-->
<template>
  <div class="relevance-demo">
    <div class="header">
      <div class="title">搜索相关性评分</div>
      <div class="subtitle">输入查询词，观察不同文档的相关性得分</div>
    </div>

    <div class="search-box">
      <input v-model="query" placeholder="输入搜索词，如：数据库" class="search-input" />
      <button class="search-btn" @click="calcScores">计算得分</button>
    </div>

    <div v-if="results.length > 0" class="results">
      <div
        v-for="(r, i) in results"
        :key="i"
        class="result-item"
      >
        <div class="result-rank">#{{ i + 1 }}</div>
        <div class="result-content">
          <div class="result-title">{{ r.title }}</div>
          <div class="result-snippet">{{ r.snippet }}</div>
        </div>
        <div class="result-score">
          <div class="score-bar">
            <div class="score-fill" :style="{ width: r.scorePercent + '%' }"></div>
          </div>
          <div class="score-value">{{ r.score.toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <div class="scoring-info">
      <div class="info-title">BM25 评分因子</div>
      <div class="factor-grid">
        <div class="factor">
          <div class="factor-name">词频 (TF)</div>
          <div class="factor-desc">关键词在文档中出现的次数越多，得分越高（但有上限）</div>
        </div>
        <div class="factor">
          <div class="factor-name">逆文档频率 (IDF)</div>
          <div class="factor-desc">越稀有的词权重越高，"的"这种常见词权重很低</div>
        </div>
        <div class="factor">
          <div class="factor-name">文档长度</div>
          <div class="factor-desc">较短文档中出现关键词，比长文档中出现更有意义</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])

const documents = [
  { title: 'MySQL 数据库入门', snippet: '数据库是存储和管理数据的系统，MySQL 是最流行的关系型数据库之一', keywords: { '数据库': 3, '数据': 2, 'MySQL': 2, '存储': 1 } },
  { title: 'Redis 缓存设计', snippet: 'Redis 是内存数据库，常用作缓存层，提升数据读取性能', keywords: { 'Redis': 2, '缓存': 2, '数据库': 1, '数据': 1, '性能': 1 } },
  { title: 'Python 数据分析', snippet: '使用 Python 进行数据清洗、分析和可视化', keywords: { 'Python': 2, '数据': 3, '分析': 2, '可视化': 1 } },
  { title: '分布式数据库架构', snippet: '分布式数据库通过分片和复制实现高可用和水平扩展', keywords: { '分布式': 2, '数据库': 2, '分片': 1, '高可用': 1 } },
  { title: 'API 接口设计', snippet: 'RESTful API 设计规范与最佳实践', keywords: { 'API': 3, '设计': 2, 'RESTful': 1 } }
]

function calcScores() {
  if (!query.value.trim()) { results.value = []; return }
  const q = query.value.trim()
  const scored = documents.map(doc => {
    let score = 0
    for (const [word, tf] of Object.entries(doc.keywords)) {
      if (word.includes(q) || q.includes(word)) {
        const idf = Math.log(documents.length / (1 + documents.filter(d => d.keywords[word]).length))
        score += tf * (idf + 1)
      }
    }
    return { ...doc, score }
  }).filter(d => d.score > 0).sort((a, b) => b.score - a.score)

  const maxScore = scored.length > 0 ? scored[0].score : 1
  results.value = scored.map(r => ({ ...r, scorePercent: (r.score / maxScore) * 100 }))
}
</script>

<style scoped>
.relevance-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.search-box { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.search-input {
  flex: 1; padding: 0.5rem 0.75rem; border-radius: 6px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); font-size: 0.9rem;
}
.search-btn {
  padding: 0.5rem 1rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.85rem;
}
.results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.result-item {
  display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem;
  border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.result-rank { font-weight: 700; font-size: 1rem; color: var(--vp-c-brand); min-width: 30px; }
.result-content { flex: 1; }
.result-title { font-weight: 600; font-size: 0.9rem; }
.result-snippet { font-size: 0.8rem; color: var(--vp-c-text-2); }
.result-score { min-width: 120px; }
.score-bar { height: 8px; background: var(--vp-c-bg-soft); border-radius: 4px; overflow: hidden; }
.score-fill { height: 100%; background: var(--vp-c-brand); border-radius: 4px; transition: width 0.3s; }
.score-value { font-size: 0.75rem; color: var(--vp-c-text-3); text-align: right; font-family: var(--vp-font-family-mono); }
.scoring-info { padding: 0.75rem; border-radius: 8px; background: rgba(var(--vp-c-brand-rgb),0.05); border: 1px solid var(--vp-c-brand); }
.info-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem; }
.factor-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem; }
.factor { padding: 0.5rem; background: var(--vp-c-bg); border-radius: 6px; }
.factor-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.2rem; }
.factor-desc { font-size: 0.75rem; color: var(--vp-c-text-2); line-height: 1.5; }
</style>
