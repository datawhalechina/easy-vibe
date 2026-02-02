<!--
 * Component: RAGSimulationDemo.vue
 * Description: Demonstrates the Retrieval-Augmented Generation (RAG) process.
 * Features:
 *  - Interactive search simulation
 *  - Visual representation of Vector DB and Document retrieval
 *  - Step-by-step animation of the RAG pipeline
 *  - Visualization of context augmentation
-->

<script setup>
import { ref, computed } from 'vue'

const query = ref('如何重置密码？')
const lastQuery = ref('')
const isSearching = ref(false)
const currentStep = ref(0)
const searchTime = ref(0)

const documents = ref([
  {
    id: 1,
    title: '密码重置指南',
    content: '用户可以通过点击设置页面的"忘记密码"链接来重置密码。系统会发送验证邮件。',
    vector: [0.12, 0.88, 0.05],
    score: 0
  },
  {
    id: 2,
    title: '定价策略',
    content: '基础版每月 $10，专业版每月 $29。企业版需要联系销售团队获取报价。',
    vector: [0.85, 0.15, 0.10],
    score: 0
  },
  {
    id: 3,
    title: 'API 文档',
    content: '所有 API 请求都需要在 Header 中包含 Bearer Token 进行身份验证。',
    vector: [0.30, 0.20, 0.95],
    score: 0
  },
  {
    id: 4,
    title: '账户安全',
    content: '为了账户安全，建议开启双重认证 (2FA)。定期修改密码也是好习惯。',
    vector: [0.15, 0.85, 0.12],
    score: 0
  }
])

const steps = [
  { id: 1, label: 'Embedding', desc: '将问题转换为向量' },
  { id: 2, label: 'Similarity Search', desc: '计算向量相似度' },
  { id: 3, label: 'Retrieval', desc: '提取 Top-K 相关文档' },
  { id: 4, label: 'Augmentation', desc: '注入上下文窗口' }
]

const retrievedDocs = computed(() => {
  return documents.value
    .filter(doc => doc.score > 0.7)
    .sort((a, b) => b.score - a.score)
})

const calculateSimilarity = (q, docVector) => {
  // Mock similarity calculation based on keywords for demo purposes
  // In reality, this would be a vector dot product
  if (q.includes('密码') || q.includes('安全')) {
    if (docVector[1] > 0.8) return 0.92 + (Math.random() * 0.05)
    if (docVector[0] > 0.8) return 0.15
    return 0.4 + (Math.random() * 0.1)
  }
  if (q.includes('价格') || q.includes('多少钱')) {
    if (docVector[0] > 0.8) return 0.95
    return 0.1
  }
  return Math.random() * 0.3
}

const search = async () => {
  if (isSearching.value || !query.value) return
  
  isSearching.value = true
  lastQuery.value = query.value
  currentStep.value = 1
  searchTime.value = 0
  
  // Reset scores
  documents.value.forEach(d => d.score = 0)

  // Step 1: Embedding (Simulated)
  await new Promise(r => setTimeout(r, 800))
  currentStep.value = 2

  // Step 2: Search
  const startTime = performance.now()
  documents.value.forEach(doc => {
    doc.score = calculateSimilarity(query.value, doc.vector)
  })
  await new Promise(r => setTimeout(r, 800))
  searchTime.value = Math.round(performance.now() - startTime) + 45 // Add base latency
  currentStep.value = 3

  // Step 3: Retrieval
  await new Promise(r => setTimeout(r, 800))
  currentStep.value = 4
  
  // Step 4: Complete
  await new Promise(r => setTimeout(r, 800))
  isSearching.value = false
}
</script>

<template>
  <div class="rag-simulation-demo">
    <!-- Control Panel -->
    <div class="control-panel">
      <div class="search-bar">
        <input 
          v-model="query" 
          type="text" 
          placeholder="输入问题 (例如: 怎么重置密码?)"
          @keyup.enter="search"
          :disabled="isSearching"
        />
        <button 
          class="search-btn" 
          @click="search"
          :disabled="isSearching || !query"
        >
          {{ isSearching ? '检索中...' : '🔍 开始检索' }}
        </button>
      </div>
      <div class="step-indicator">
        <div 
          v-for="s in steps" 
          :key="s.id"
          class="step-dot"
          :class="{ active: currentStep >= s.id, current: currentStep === s.id }"
          :title="s.label"
        ></div>
      </div>
    </div>

    <!-- Main Visualization -->
    <div class="viz-container">
      
      <!-- Left: Vector Database -->
      <div class="panel vector-db" :class="{ dimmed: currentStep === 4 }">
        <div class="panel-header">
          <span class="icon">🗄️</span> 向量数据库 (Knowledge Base)
        </div>
        <div class="doc-list">
          <div 
            v-for="doc in documents" 
            :key="doc.id"
            class="doc-card"
            :class="{ 
              'scanning': currentStep === 2,
              'matched': doc.score > 0.7 && currentStep >= 3,
              'rejected': doc.score <= 0.7 && currentStep >= 3
            }"
            :style="{ '--score': doc.score }"
          >
            <div class="doc-icon">📄</div>
            <div class="doc-info">
              <div class="doc-title">{{ doc.title }}</div>
              <div class="doc-preview">{{ doc.content.substring(0, 20) }}...</div>
            </div>
            <div class="doc-score" v-if="currentStep >= 2 && doc.score > 0">
              {{ (doc.score * 100).toFixed(0) }}%
            </div>
            <div class="vector-visual">
              <span v-for="(v,i) in doc.vector" :key="i" :style="{ height: v * 10 + 'px' }"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Center: Pipeline Visuals -->
      <div class="pipeline-arrow">
        <div class="arrow-line" :class="{ active: isSearching }"></div>
        <div class="pipeline-status" v-if="currentStep > 0">
          {{ steps[currentStep - 1]?.label }}
        </div>
      </div>

      <!-- Right: Augmented Context -->
      <div class="panel context-window" :class="{ active: currentStep === 4 }">
        <div class="panel-header">
          <span class="icon">🤖</span> 增强后的上下文 (Final Prompt)
        </div>
        <div class="prompt-content">
          <div class="prompt-section system">
            <span class="tag">System</span>
            <p>你是一个帮助用户的 AI 助手。请基于以下上下文回答用户的问题。</p>
          </div>
          
          <div class="prompt-section context" v-if="currentStep >= 3">
            <span class="tag">Context (RAG)</span>
            <div v-if="retrievedDocs.length > 0">
              <div v-for="doc in retrievedDocs" :key="doc.id" class="retrieved-item">
                <span class="bullet">•</span> {{ doc.content }}
              </div>
            </div>
            <div v-else class="empty-context">
              (暂无相关文档)
            </div>
          </div>
          
          <div class="prompt-section user" v-if="lastQuery">
            <span class="tag">User</span>
            <p>{{ lastQuery }}</p>
          </div>
          <div class="placeholder-text" v-else>
            等待查询...
          </div>
        </div>
      </div>

    </div>

    <!-- Metrics Footer -->
    <div class="metrics-footer">
      <div class="metric">
        <span class="label">检索耗时:</span>
        <span class="value">{{ searchTime }} ms</span>
      </div>
      <div class="metric">
        <span class="label">命中数量:</span>
        <span class="value">{{ retrievedDocs.length }} docs</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rag-simulation-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
}

.control-panel {
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  min-width: 280px;
}

input {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}
input:focus {
  border-color: var(--vp-c-brand);
  outline: none;
}

.search-btn {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
}
.search-btn:hover:not(:disabled) {
  background-color: var(--vp-c-brand-dark);
}
.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.step-indicator {
  display: flex;
  gap: 0.4rem;
}
.step-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--vp-c-divider);
  transition: all 0.3s;
}
.step-dot.active {
  background-color: var(--vp-c-brand);
}
.step-dot.current {
  transform: scale(1.4);
  box-shadow: 0 0 4px var(--vp-c-brand);
}

/* Viz Container */
.viz-container {
  display: flex;
  padding: 1.5rem;
  gap: 1rem;
  background-color: var(--vp-c-bg-alt);
  min-height: 350px;
  align-items: stretch;
}

.panel {
  flex: 1;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
}
.panel.dimmed {
  opacity: 0.6;
  filter: grayscale(0.5);
}
.panel.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 15px rgba(var(--vp-c-brand-rgb), 0.1);
}

.panel-header {
  padding: 0.8rem;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--vp-c-bg-soft);
}

.doc-list {
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow-y: auto;
  max-height: 300px;
}

.doc-card {
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  position: relative;
  transition: all 0.3s;
  background-color: var(--vp-c-bg);
}

.doc-card.scanning {
  animation: pulse 1s infinite;
  border-color: var(--vp-c-brand-dimm);
}
.doc-card.matched {
  border-color: var(--vp-c-green);
  background-color: var(--vp-c-green-dimm);
  transform: translateX(5px);
}
.doc-card.rejected {
  opacity: 0.5;
}

.doc-icon {
  font-size: 1.2rem;
}
.doc-info {
  flex: 1;
  overflow: hidden;
}
.doc-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.doc-preview {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.doc-score {
  font-family: var(--vp-font-mono);
  font-weight: bold;
  color: var(--vp-c-brand);
}
.vector-visual {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 15px;
  width: 20px;
}
.vector-visual span {
  width: 4px;
  background-color: var(--vp-c-text-3);
  border-radius: 1px;
}

/* Pipeline Arrow */
.pipeline-arrow {
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.arrow-line {
  width: 100%;
  height: 4px;
  background-color: var(--vp-c-divider);
  border-radius: 2px;
  transition: all 0.3s;
}
.arrow-line.active {
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  background-size: 200% 100%;
  animation: flow 1s linear infinite;
}
.pipeline-status {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--vp-c-brand);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  white-space: nowrap;
  z-index: 10;
}

/* Context Window */
.prompt-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--vp-font-mono);
  font-size: 0.85rem;
  overflow-y: auto;
}

.prompt-section {
  background-color: var(--vp-c-bg-soft);
  padding: 0.8rem;
  border-radius: 6px;
  border-left: 3px solid transparent;
}
.prompt-section.system {
  border-left-color: var(--vp-c-yellow);
}
.prompt-section.context {
  border-left-color: var(--vp-c-green);
  background-color: rgba(var(--vp-c-green-rgb), 0.1);
}
.prompt-section.user {
  border-left-color: var(--vp-c-brand);
}

.tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
}
.retrieved-item {
  margin-top: 0.4rem;
  color: var(--vp-c-text-1);
}
.empty-context {
  color: var(--vp-c-text-3);
  font-style: italic;
  text-align: center;
}
.placeholder-text {
  text-align: center;
  color: var(--vp-c-text-3);
  margin-top: 2rem;
}

/* Metrics Footer */
.metrics-footer {
  display: flex;
  justify-content: space-around;
  padding: 0.8rem;
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}
.metric .label {
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}
.metric .value {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

@keyframes flow {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

@media (max-width: 768px) {
  .viz-container {
    flex-direction: column;
  }
  .pipeline-arrow {
    width: 100%;
    height: 40px;
    flex-direction: row;
  }
  .arrow-line {
    width: 4px;
    height: 100%;
  }
}
</style>
