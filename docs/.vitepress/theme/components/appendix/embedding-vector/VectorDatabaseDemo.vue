<!--
  VectorDatabaseDemo.vue
  向量数据库对比组件

  用途：
  交互式对比主流向量数据库的特性、适用场景和架构差异。

  交互功能：
  - 点击卡片查看详情
  - 对比不同数据库的核心指标
  - 场景推荐
-->
<template>
  <div class="vdb-demo">
    <div class="demo-header">
      <h4>主流向量数据库对比</h4>
      <p class="desc">点击卡片查看详细信息，了解不同向量数据库的特点与适用场景</p>
    </div>

    <div class="db-grid">
      <div
        v-for="db in databases"
        :key="db.name"
        class="db-card"
        :class="{ active: selected === db.name }"
        @click="selected = selected === db.name ? null : db.name"
      >
        <div class="card-header">
          <span class="db-icon" :style="{ background: db.color }">{{ db.icon }}</span>
          <div>
            <div class="db-name">{{ db.name }}</div>
            <div class="db-type">{{ db.type }}</div>
          </div>
        </div>

        <div class="card-tags">
          <span
            v-for="tag in db.tags"
            :key="tag"
            class="tag"
          >{{ tag }}</span>
        </div>

        <div v-if="selected === db.name" class="card-detail">
          <div class="detail-row">
            <span class="detail-label">开源协议</span>
            <span class="detail-val">{{ db.license }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">索引算法</span>
            <span class="detail-val">{{ db.index }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">最大维度</span>
            <span class="detail-val">{{ db.maxDim }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">适用场景</span>
            <span class="detail-val">{{ db.useCase }}</span>
          </div>
          <p class="detail-desc">{{ db.description }}</p>
        </div>

        <div class="card-metrics">
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.perf + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">性能</span>
          </div>
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.ease + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">易用性</span>
          </div>
          <div class="metric">
            <div class="metric-bar-wrap">
              <div class="metric-bar" :style="{ width: db.scale + '%', background: db.color }"></div>
            </div>
            <span class="metric-label">扩展性</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-section">
      <h5>场景推荐</h5>
      <div class="scenario-grid">
        <div
          v-for="s in scenarios"
          :key="s.title"
          class="scenario-card"
        >
          <div class="scenario-icon">{{ s.icon }}</div>
          <div class="scenario-title">{{ s.title }}</div>
          <div class="scenario-rec">{{ s.recommend }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(null)

const databases = [
  {
    name: 'Pinecone',
    type: '全托管云服务',
    icon: 'P',
    color: '#3b82f6',
    tags: ['云原生', 'Serverless'],
    license: '商业',
    index: 'Proprietary ANN',
    maxDim: '20,000',
    useCase: '快速上线的 AI 应用',
    description: '全托管向量数据库，无需运维，按用量付费。适合初创团队和快速原型开发。',
    perf: 85,
    ease: 95,
    scale: 80
  },
  {
    name: 'Milvus',
    type: '开源分布式',
    icon: 'M',
    color: '#10b981',
    tags: ['开源', '分布式', '高性能'],
    license: 'Apache 2.0',
    index: 'IVF / HNSW / DiskANN',
    maxDim: '32,768',
    useCase: '大规模企业级检索',
    description: '支持十亿级向量的分布式数据库，提供丰富的索引类型和混合查询能力。',
    perf: 95,
    ease: 65,
    scale: 95
  },
  {
    name: 'Weaviate',
    type: '开源 AI 原生',
    icon: 'W',
    color: '#8b5cf6',
    tags: ['开源', 'GraphQL', '模块化'],
    license: 'BSD-3',
    index: 'HNSW',
    maxDim: '65,536',
    useCase: '语义搜索与多模态',
    description: '内置向量化模块，支持文本、图像等多模态数据的自动嵌入和检索。',
    perf: 80,
    ease: 85,
    scale: 80
  },
  {
    name: 'Chroma',
    type: '轻量级嵌入式',
    icon: 'C',
    color: '#f59e0b',
    tags: ['开源', '轻量', 'Python'],
    license: 'Apache 2.0',
    index: 'HNSW',
    maxDim: '无限制',
    useCase: '本地开发与 RAG 原型',
    description: '极简 API 设计，几行代码即可集成。非常适合 LangChain / LlamaIndex 生态。',
    perf: 60,
    ease: 98,
    scale: 40
  },
  {
    name: 'pgvector',
    type: 'PostgreSQL 扩展',
    icon: 'pg',
    color: '#ef4444',
    tags: ['SQL', 'PostgreSQL', '扩展'],
    license: 'PostgreSQL',
    index: 'IVFFlat / HNSW',
    maxDim: '16,000',
    useCase: '已有 PG 基础设施的团队',
    description: '在现有 PostgreSQL 中添加向量能力，无需引入新的数据库。支持 SQL 混合查询。',
    perf: 65,
    ease: 80,
    scale: 60
  }
]

const scenarios = [
  { icon: '&#x1F680;', title: '快速原型', recommend: 'Chroma / Pinecone' },
  { icon: '&#x1F3E2;', title: '企业级部署', recommend: 'Milvus / Weaviate' },
  { icon: '&#x1F4BE;', title: '已有 PG 数据库', recommend: 'pgvector' },
  { icon: '&#x1F916;', title: 'RAG 应用', recommend: 'Chroma / Weaviate' }
]
</script>

<style scoped>
.vdb-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.desc {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.db-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.db-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.db-card:hover {
  border-color: var(--vp-c-text-3);
}

.db-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.db-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.db-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.db-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 0.6rem;
}

.tag {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 3px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
}

.card-detail {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.6rem;
  margin-bottom: 0.6rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 3px 0;
}

.detail-label {
  color: var(--vp-c-text-3);
}

.detail-val {
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-align: right;
}

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0 0;
  line-height: 1.5;
}

.card-metrics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 6px;
}

.metric-bar-wrap {
  flex: 1;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.metric-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}

.metric-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  width: 40px;
  text-align: right;
}

.scenario-section h5 {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.5rem;
}

.scenario-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.scenario-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.scenario-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.scenario-rec {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 500;
}

@media (max-width: 640px) {
  .db-grid {
    grid-template-columns: 1fr;
  }

  .scenario-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .vdb-demo {
    padding: 1rem;
  }
}
</style>
