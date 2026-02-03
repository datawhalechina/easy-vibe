<!--
 * Component: RAGSimulationDemo.vue
 * Description: Demonstrates the Retrieval-Augmented Generation (RAG) process with a vertical, intuitive flow.
-->

<script setup>
import { ref, computed } from 'vue'

const query = ref('如何重置密码？')
const lastQuery = ref('')
const isSearching = ref(false)
const currentStep = ref(0) // 0: Idle, 1: Searching/Scanning, 2: Retrieved/Assembling, 3: Done

const documents = ref([
  {
    id: 1,
    title: '密码重置指南',
    content: '用户可以通过点击设置页面的"忘记密码"链接来重置密码。系统会发送验证邮件。',
    score: 0
  },
  {
    id: 2,
    title: '定价策略',
    content: '基础版每月 $10，专业版每月 $29。企业版需要联系销售团队获取报价。',
    score: 0
  },
  {
    id: 3,
    title: 'API 文档',
    content: '所有 API 请求都需要在 Header 中包含 Bearer Token 进行身份验证。',
    score: 0
  },
  {
    id: 4,
    title: '账户安全',
    content: '为了账户安全，建议开启双重认证 (2FA)。定期修改密码也是好习惯。',
    score: 0
  }
])

const retrievedDocs = computed(() => {
  return documents.value
    .filter(doc => doc.score > 0.6)
    .sort((a, b) => b.score - a.score)
})

const calculateSimilarity = (q, docContent) => {
  // Simple keyword matching simulation
  if (q.includes('密码') && (docContent.includes('密码') || docContent.includes('安全'))) return 0.95
  if (q.includes('价格') && docContent.includes('价')) return 0.9
  if (q.includes('API') && docContent.includes('API')) return 0.9
  
  // Random noise for non-matches
  return Math.random() * 0.3
}

const search = async () => {
  if (isSearching.value || !query.value) return
  
  isSearching.value = true
  lastQuery.value = query.value
  currentStep.value = 1
  
  // Reset scores
  documents.value.forEach(d => d.score = 0)

  // Step 1: Simulate Scanning (1.5s)
  await new Promise(r => setTimeout(r, 600))
  
  // Calculate scores
  documents.value.forEach(doc => {
    doc.score = calculateSimilarity(query.value, doc.content + doc.title)
  })
  
  await new Promise(r => setTimeout(r, 800)) // Wait for scan animation to finish visual impact
  
  currentStep.value = 2 // Transition to retrieval
  
  // Step 2: Assemble Context (1s)
  await new Promise(r => setTimeout(r, 1000))
  currentStep.value = 3 // Done
  
  isSearching.value = false
}
</script>

<template>
  <div class="rag-demo">
    
    <!-- Step 1: User Input -->
    <div class="step-section input-section">
      <div class="step-label">
        <span class="step-num">1</span>
        <span class="step-text">用户提问 (User Query)</span>
      </div>
      <div class="search-box">
        <input 
          v-model="query" 
          type="text" 
          placeholder="输入问题..."
          @keyup.enter="search"
          :disabled="isSearching"
        />
        <button 
          class="action-btn" 
          @click="search"
          :disabled="isSearching || !query"
        >
          {{ isSearching ? '检索中...' : '🚀 开始检索' }}
        </button>
      </div>
    </div>

    <!-- Arrow Connection -->
    <div class="flow-arrow" :class="{ active: currentStep >= 1 }">
      <div class="line"></div>
      <div class="icon">🔍</div>
    </div>

    <!-- Step 2: Library Scanning -->
    <div class="step-section library-section" :class="{ 'is-scanning': currentStep === 1 }">
      <div class="step-label">
        <span class="step-num">2</span>
        <span class="step-text">图书馆检索 (Retrieval)</span>
        <span class="status-badge" v-if="currentStep === 1">正在扫描...</span>
        <span class="status-badge success" v-if="currentStep >= 2">命中 {{ retrievedDocs.length }} 条</span>
      </div>
      
      <div class="docs-grid">
        <div 
          v-for="doc in documents" 
          :key="doc.id"
          class="doc-card"
          :class="{ 
            'matched': doc.score > 0.6 && currentStep >= 2,
            'ignored': doc.score <= 0.6 && currentStep >= 2
          }"
        >
          <div class="doc-header">
            <span class="doc-icon">📄</span>
            <span class="doc-title">{{ doc.title }}</span>
            <span class="doc-score" v-if="currentStep >= 2 && doc.score > 0.6">
              {{ (doc.score * 100).toFixed(0) }}% 相关
            </span>
          </div>
          <div class="doc-content">{{ doc.content }}</div>
          
          <!-- Visual effect for scanning -->
          <div class="scan-line" v-if="currentStep === 1"></div>
        </div>
      </div>
    </div>

    <!-- Arrow Connection -->
    <div class="flow-arrow" :class="{ active: currentStep >= 2 }">
      <div class="line"></div>
      <div class="icon">✂️ 复制粘贴</div>
    </div>

    <!-- Step 3: Context Assembly -->
    <div class="step-section context-section" :class="{ active: currentStep >= 3 }">
      <div class="step-label">
        <span class="step-num">3</span>
        <span class="step-text">最终上下文 (Final Prompt)</span>
      </div>
      
      <div class="blackboard">
        <div class="chalk-text system">
          <span class="role-badge">SYSTEM</span>
          你是一个专业的 AI 助手。请基于下方【检索到的资料】回答用户的提问。
        </div>
        
        <div class="retrieved-block" v-if="currentStep >= 2">
          <div class="block-header">📚 检索到的资料 (Context)</div>
          <div v-if="retrievedDocs.length > 0">
             <div v-for="doc in retrievedDocs" :key="doc.id" class="retrieved-item">
               {{ doc.content }}
             </div>
          </div>
          <div v-else class="empty-state">
            (未找到相关资料)
          </div>
        </div>
        
        <div class="chalk-text user">
          <span class="role-badge">USER</span>
          {{ lastQuery || '等待提问...' }}
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.rag-demo {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 600px;
  margin: 1rem auto;
}

.step-section {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.step-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.step-num {
  background: var(--vp-c-brand);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

/* Input Section */
.search-box {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  font-size: 0.9rem;
}

.action-btn {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: opacity 0.2s;
}
.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Library Section */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.8rem;
}

.doc-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.doc-card.matched {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.doc-card.ignored {
  opacity: 0.4;
  filter: grayscale(0.8);
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.doc-score {
  color: var(--vp-c-brand);
  font-size: 0.75rem;
}

.doc-content {
  color: var(--vp-c-text-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Scanning Animation */
.scan-line {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: scan 1s infinite;
  pointer-events: none;
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 200%; }
}

/* Context Section */
.blackboard {
  background: #2b2b2b;
  color: #e0e0e0;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  border: 2px solid #444;
}

.role-badge {
  display: inline-block;
  background: #444;
  color: #aaa;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.7rem;
  margin-right: 6px;
  vertical-align: middle;
}

.chalk-text {
  margin-bottom: 0.8rem;
}

.retrieved-block {
  background: rgba(255, 255, 255, 0.1);
  border-left: 3px solid var(--vp-c-brand);
  padding: 0.6rem;
  margin: 0.5rem 0 1rem 0;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.block-header {
  color: var(--vp-c-brand);
  font-weight: bold;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
}

.retrieved-item {
  margin-bottom: 0.4rem;
  padding-left: 0.8rem;
  position: relative;
}
.retrieved-item::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #888;
}

/* Arrows */
.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: var(--vp-c-divider);
  position: relative;
}

.flow-arrow .line {
  position: absolute;
  height: 100%;
  width: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.flow-arrow .icon {
  background: var(--vp-c-bg-soft);
  padding: 4px;
  z-index: 1;
  font-size: 1.2rem;
}

.flow-arrow.active .line {
  background: var(--vp-c-brand);
}
.flow-arrow.active .icon {
  animation: bounce 1s infinite;
}

.status-badge {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.status-badge.success {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
}
</style>
