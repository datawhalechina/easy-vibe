<template>
  <div class="rag-simulation-demo">
    <div class="layout">
      <!-- Left: Long-term Memory (Vector DB) -->
      <div class="panel vector-db">
        <div class="panel-header">📚 Long-term Memory (Vector DB)</div>
        <div class="documents">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="doc-card"
            :class="{ retrieved: doc.retrieved }"
          >
            <div class="doc-icon">📄</div>
            <div class="doc-content">{{ doc.content }}</div>
            <div class="doc-meta">
              ID: {{ doc.id }} | Vector: {{ doc.vector }}
            </div>
          </div>
        </div>
      </div>

      <!-- Center: Query & Retrieval Process -->
      <div class="process-area">
        <div class="search-box">
          <input
            v-model="query"
            placeholder="Ask a question..."
            @keyup.enter="search"
          />
          <button @click="search" :disabled="isSearching">
            {{ isSearching ? 'Searching...' : '🔍 Retrieve' }}
          </button>
        </div>

        <div class="arrow-down">⬇️</div>

        <div class="retrieval-status" :class="{ active: isSearching }">
          <div class="status-step" v-if="step >= 1">1. Embed Query</div>
          <div class="status-step" v-if="step >= 2">2. Semantic Search</div>
          <div class="status-step" v-if="step >= 3">3. Retrieve Top-K</div>
        </div>

        <div class="arrow-down">⬇️</div>

        <!-- Right: Augmented Context -->
        <div class="panel context-builder">
          <div class="panel-header">📦 Augmented Context</div>
          <div class="context-content">
            <div class="context-section system">
              <span class="label">System:</span>
              You are a helpful assistant. Use the following context to answer
              the user.
            </div>
            <div
              class="context-section retrieved"
              v-if="retrievedDocs.length > 0"
            >
              <span class="label">Retrieved Context:</span>
              <div
                v-for="doc in retrievedDocs"
                :key="doc.id"
                class="retrieved-item"
              >
                - {{ doc.content }}
              </div>
            </div>
            <div class="context-section user">
              <span class="label">User:</span>
              {{ lastQuery }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('How do I reset my password?')
const lastQuery = ref('')
const isSearching = ref(false)
const step = ref(0)

const documents = ref([
  {
    id: 1,
    content: 'To reset password, go to settings page.',
    vector: '[0.1, 0.9]',
    retrieved: false
  },
  {
    id: 2,
    content: 'Pricing starts at $10/month.',
    vector: '[0.8, 0.2]',
    retrieved: false
  },
  {
    id: 3,
    content: 'Contact support at support@example.com.',
    vector: '[0.3, 0.5]',
    retrieved: false
  },
  {
    id: 4,
    content: 'Click "Forgot Password" on login screen.',
    vector: '[0.2, 0.8]',
    retrieved: false
  }
])

const retrievedDocs = ref([])

const search = async () => {
  if (isSearching.value) return
  isSearching.value = true
  lastQuery.value = query.value
  step.value = 0

  // Reset previous state
  documents.value.forEach((d) => (d.retrieved = false))
  retrievedDocs.value = []

  // Step 1: Embedding
  await wait(500)
  step.value = 1

  // Step 2: Search
  await wait(500)
  step.value = 2

  // Mock semantic search logic (simple keyword match for demo)
  const keywords = query.value.toLowerCase().split(' ')
  const matches = documents.value
    .map((doc) => {
      let score = 0
      keywords.forEach((k) => {
        if (doc.content.toLowerCase().includes(k)) score++
      })
      return { ...doc, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2) // Top 2

  // Step 3: Retrieve
  await wait(500)
  step.value = 3

  matches.forEach((m) => {
    const doc = documents.value.find((d) => d.id === m.id)
    if (doc) doc.retrieved = true
  })

  retrievedDocs.value = matches

  isSearching.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.rag-simulation-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.layout {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.panel {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  min-width: 250px;
}

.panel-header {
  font-weight: bold;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.doc-card {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg-alt);
  transition: all 0.3s;
  font-size: 0.8rem;
}

.doc-card.retrieved {
  border-color: #10b981;
  background: #ecfdf5;
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.doc-meta {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

.process-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
}

.search-box {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
}

.retrieval-status {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  width: 100%;
  text-align: center;
  margin: 0.5rem 0;
}

.status-step {
  color: var(--vp-c-brand);
  font-weight: bold;
  margin: 0.2rem 0;
  font-size: 0.9rem;
}

.context-content {
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.context-section {
  padding: 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  border-left: 3px solid #ccc;
}

.context-section.system {
  border-color: #f59e0b;
}
.context-section.retrieved {
  border-color: #10b981;
  background: #ecfdf5;
}
.context-section.user {
  border-color: #3b82f6;
}

.label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.retrieved-item {
  margin-bottom: 0.3rem;
  color: #047857;
}

.arrow-down {
  color: var(--vp-c-text-3);
  margin: 0.5rem 0;
}
</style>
