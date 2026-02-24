<template>
  <div class="data-models-demo">
    <div class="demo-header">
      <span class="icon">🗂️</span>
      <span class="title">数据模型全景</span>
      <span class="subtitle">四种主流数据模型对比</span>
    </div>

    <div class="intro-text">
      不是所有数据都适合塞进<span class="highlight">关系型表格</span>。社交网络的人脉关系、IoT 设备的时间流水、AI 搜索的语义向量——不同的数据形态需要不同的<span class="highlight">建模方式</span>。
    </div>

    <div v-if="!props.tab" class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['tab', { active: active === t.id }]"
        @click="active = t.id"
      >
        {{ t.name }}
      </button>
    </div>

    <!-- 文档模型 -->
    <div v-if="active === 'document'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">📄</span>
        <span class="panel-title">文档模型 (Document)</span>
        <span class="panel-badge">MongoDB / DynamoDB</span>
      </div>
      <div class="panel-desc">数据以 JSON 文档存储，每条记录可以有不同的字段结构，天然适合<strong>嵌套、半结构化</strong>数据。</div>
      <div class="code-block">
        <pre><code>{
  "_id": "user_1001",
  "name": "张三",
  "tags": ["VIP", "活跃"],
  "address": {
    "city": "北京",
    "district": "朝阳区"
  },
  "orders": [
    { "id": "o1", "amount": 299 },
    { "id": "o2", "amount": 599 }
  ]
}</code></pre>
      </div>
      <div class="traits">
        <div class="trait good">无需预定义 Schema，字段随时扩展</div>
        <div class="trait good">嵌套数据一次读取，无需 JOIN</div>
        <div class="trait bad">跨文档关联查询较弱</div>
      </div>
      <div class="use-cases">
        <span class="use-label">典型场景：</span>
        <span class="use-tag">用户画像</span>
        <span class="use-tag">CMS 内容</span>
        <span class="use-tag">商品目录</span>
        <span class="use-tag">配置中心</span>
      </div>
    </div>

    <!-- 图模型 -->
    <div v-if="active === 'graph'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">🕸️</span>
        <span class="panel-title">图模型 (Graph)</span>
        <span class="panel-badge">Neo4j / Neptune</span>
      </div>
      <div class="panel-desc">数据由<strong>节点</strong>和<strong>边</strong>组成，专门表达实体之间的复杂关系网络。</div>
      <div class="graph-viz">
        <div class="graph-nodes">
          <div class="g-node user" style="grid-area: a">张三</div>
          <div class="g-node user" style="grid-area: b">李四</div>
          <div class="g-node user" style="grid-area: c">王五</div>
          <div class="g-node item" style="grid-area: d">iPhone</div>
        </div>
        <div class="graph-edges">
          <div class="g-edge">张三 —<span class="edge-label">关注</span>→ 李四</div>
          <div class="g-edge">李四 —<span class="edge-label">关注</span>→ 王五</div>
          <div class="g-edge">张三 —<span class="edge-label">购买</span>→ iPhone</div>
          <div class="g-edge">王五 —<span class="edge-label">购买</span>→ iPhone</div>
        </div>
      </div>
      <div class="traits">
        <div class="trait good">多跳关系查询极快（朋友的朋友）</div>
        <div class="trait good">关系本身可以携带属性</div>
        <div class="trait bad">不擅长大规模聚合统计</div>
      </div>
      <div class="use-cases">
        <span class="use-label">典型场景：</span>
        <span class="use-tag">社交网络</span>
        <span class="use-tag">推荐系统</span>
        <span class="use-tag">知识图谱</span>
        <span class="use-tag">欺诈检测</span>
      </div>
    </div>

    <!-- 时序模型 -->
    <div v-if="active === 'timeseries'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">📈</span>
        <span class="panel-title">时序模型 (Time-Series)</span>
        <span class="panel-badge">InfluxDB / TimescaleDB</span>
      </div>
      <div class="panel-desc">以<strong>时间戳</strong>为主轴，针对按时间顺序写入、按时间范围查询的场景深度优化。</div>
      <div class="ts-table">
        <div class="ts-row ts-header">
          <span>timestamp</span>
          <span>device</span>
          <span>cpu_usage</span>
          <span>memory</span>
        </div>
        <div v-for="row in tsData" :key="row.ts" class="ts-row">
          <span class="ts-time">{{ row.ts }}</span>
          <span>{{ row.device }}</span>
          <span :class="row.cpu > 80 ? 'val-high' : 'val-normal'">{{ row.cpu }}%</span>
          <span>{{ row.mem }}GB</span>
        </div>
      </div>
      <div class="traits">
        <div class="trait good">写入吞吐极高（百万点/秒）</div>
        <div class="trait good">内置降采样、自动过期策略</div>
        <div class="trait bad">不支持复杂关联查询</div>
      </div>
      <div class="use-cases">
        <span class="use-label">典型场景：</span>
        <span class="use-tag">服务器监控</span>
        <span class="use-tag">IoT 传感器</span>
        <span class="use-tag">金融行情</span>
        <span class="use-tag">日志分析</span>
      </div>
    </div>

    <!-- 向量模型 -->
    <div v-if="active === 'vector'" class="model-panel">
      <div class="panel-header">
        <span class="panel-icon">🧠</span>
        <span class="panel-title">向量模型 (Vector)</span>
        <span class="panel-badge">Pinecone / Milvus / pgvector</span>
      </div>
      <div class="panel-desc">将文本、图片等非结构化数据转为<strong>高维向量</strong>，通过计算向量距离实现语义相似度搜索。</div>
      <div class="vector-viz">
        <div class="vec-query">
          <div class="vec-label">查询："好吃的日料"</div>
          <div class="vec-arrow">→ Embedding →</div>
          <div class="vec-nums">[0.82, 0.15, 0.91, ...]</div>
        </div>
        <div class="vec-results">
          <div class="vec-result" v-for="r in vecResults" :key="r.text">
            <span class="vec-score" :style="{ opacity: r.score }">{{ (r.score * 100).toFixed(0) }}%</span>
            <span class="vec-text">{{ r.text }}</span>
          </div>
        </div>
      </div>
      <div class="traits">
        <div class="trait good">语义搜索，理解"意思"而非关键词</div>
        <div class="trait good">支持多模态（文本、图片、音频）</div>
        <div class="trait bad">向量生成依赖 Embedding 模型质量</div>
      </div>
      <div class="use-cases">
        <span class="use-label">典型场景：</span>
        <span class="use-tag">RAG 检索增强</span>
        <span class="use-tag">以图搜图</span>
        <span class="use-tag">语义搜索</span>
        <span class="use-tag">推荐系统</span>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>选型原则：</strong>没有万能数据库。关系型（MySQL/PostgreSQL）仍是大多数业务的基石，但当数据形态明确偏向文档、图、时序或向量时，选择专用模型能获得<span class="highlight">数量级的性能提升</span>。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ tab: { type: String, default: '' } })
const active = ref(props.tab || 'document')

const tabs = [
  { id: 'document', name: '📄 文档' },
  { id: 'graph', name: '🕸️ 图' },
  { id: 'timeseries', name: '📈 时序' },
  { id: 'vector', name: '🧠 向量' }
]

const tsData = [
  { ts: '10:00:01', device: 'server-01', cpu: 45, mem: 12.3 },
  { ts: '10:00:02', device: 'server-01', cpu: 67, mem: 12.5 },
  { ts: '10:00:03', device: 'server-01', cpu: 92, mem: 14.1 },
  { ts: '10:00:04', device: 'server-02', cpu: 23, mem: 8.2 },
  { ts: '10:00:05', device: 'server-02', cpu: 85, mem: 9.7 }
]

const vecResults = [
  { text: '银座寿司之神 — 顶级 omakase', score: 0.96 },
  { text: '新宿拉面一条街 — 浓厚豚骨汤底', score: 0.82 },
  { text: '居酒屋深夜食堂 — 烤串与清酒', score: 0.75 },
  { text: '意大利手工披萨 — 窑烤玛格丽特', score: 0.31 }
]
</script>

<style scoped>
.data-models-demo {
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

.tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  text-align: center;
  transition: all 0.2s;
}

.tab:hover { background: var(--vp-c-bg-soft); }
.tab.active { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand); }

@media (max-width: 640px) {
  .tabs { grid-template-columns: repeat(2, 1fr); }
}

/* Panel */
.model-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.panel-icon { font-size: 1.25rem; }
.panel-title { font-weight: 600; font-size: 0.9rem; flex: 1; }
.panel-badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.panel-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

/* Code block */
.code-block {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  overflow-x: auto;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  line-height: 1.5;
}

/* Traits */
.traits {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 0.75rem;
}

.trait {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1.4;
}

.trait.good {
  background: rgba(34, 197, 94, 0.08);
  color: #16a34a;
}

.trait.good::before { content: '✓ '; font-weight: 600; }

.trait.bad {
  background: rgba(239, 68, 68, 0.08);
  color: #dc2626;
}

.trait.bad::before { content: '✗ '; font-weight: 600; }

/* Use cases */
.use-cases {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.use-label { color: var(--vp-c-text-3); }

.use-tag {
  padding: 2px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

/* Graph viz */
.graph-viz {
  margin-bottom: 0.75rem;
}

.graph-nodes {
  display: grid;
  grid-template-areas: 'a . b' '. d .' 'c . .';
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.g-node {
  padding: 6px 12px;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
}

.g-node.user {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand);
}

.g-node.item {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
  border: 1px solid #f59e0b;
}

.graph-edges {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

@media (max-width: 640px) {
  .graph-edges { grid-template-columns: 1fr; }
}

.g-edge {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.edge-label {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  margin: 0 2px;
}

/* Time-series table */
.ts-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.ts-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.8fr 0.8fr;
  font-size: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.ts-row:last-child { border-bottom: none; }

.ts-row span {
  padding: 4px 8px;
}

.ts-header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.ts-time {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
}

.val-high { color: #ef4444; font-weight: 600; }
.val-normal { color: #22c55e; }

/* Vector viz */
.vector-viz {
  margin-bottom: 0.75rem;
}

.vec-query {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.vec-label { font-size: 0.8rem; color: var(--vp-c-text-1); font-weight: 500; }
.vec-arrow { font-size: 0.75rem; color: var(--vp-c-text-3); }
.vec-nums { font-family: var(--vp-font-family-mono); font-size: 0.7rem; color: var(--vp-c-brand-1); }

.vec-results {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vec-result {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.vec-score {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  min-width: 36px;
  text-align: right;
}

.vec-text { color: var(--vp-c-text-2); }

/* Info box */
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
