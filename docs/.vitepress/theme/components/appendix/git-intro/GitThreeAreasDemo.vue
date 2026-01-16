<template>
  <div class="three-areas-demo">
    <div class="panel">
      <div class="areas-container">
        <div class="area working">
          <div class="area-header">
            <span class="area-icon">💻</span>
            <span class="area-name">工作区</span>
            <span class="area-count">{{ workingFiles.length }}</span>
          </div>
          <div class="file-list">
            <div v-for="file in workingFiles" :key="file.name" class="file-item">
              <span class="file-icon">📄</span>
              <span class="file-name">{{ file.name }}</span>
              <button @click="addToStaging(file)" class="mini-btn">+</button>
            </div>
            <div v-if="workingFiles.length === 0" class="empty">无文件</div>
          </div>
        </div>

        <div class="area staging">
          <div class="area-header">
            <span class="area-icon">📋</span>
            <span class="area-name">暂存区</span>
            <span class="area-count">{{ stagedFiles.length }}</span>
          </div>
          <div class="file-list">
            <div v-for="file in stagedFiles" :key="file.name" class="file-item">
              <span class="file-icon">📄</span>
              <span class="file-name">{{ file.name }}</span>
              <button @click="commitFile(file)" class="mini-btn">✓</button>
            </div>
            <div v-if="stagedFiles.length === 0" class="empty">无文件</div>
          </div>
        </div>

        <div class="area repo">
          <div class="area-header">
            <span class="area-icon">📦</span>
            <span class="area-name">仓库</span>
            <span class="area-count">{{ commits.length }}</span>
          </div>
          <div class="commit-list">
            <div v-for="commit in commits.slice(-3).reverse()" :key="commit.hash" class="commit-item">
              <span class="commit-hash">{{ commit.hash.substring(0, 6) }}</span>
              <span class="commit-msg">{{ commit.message }}</span>
            </div>
            <div v-if="commits.length === 0" class="empty">无提交</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p><strong>💡 三区工作流:</strong> 工作区修改 → 添加到暂存区 → 提交到仓库</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const workingFiles = ref([
  { name: 'index.vue' },
  { name: 'style.css' }
])

const stagedFiles = ref([])
const commits = ref([])

const addToStaging = (file) => {
  const index = workingFiles.value.findIndex(f => f.name === file.name)
  if (index !== -1) {
    workingFiles.value.splice(index, 1)
    stagedFiles.value.push(file)
  }
}

const commitFile = (file) => {
  const index = stagedFiles.value.findIndex(f => f.name === file.name)
  if (index !== -1) {
    stagedFiles.value.splice(index, 1)
    commits.value.push({
      hash: Math.random().toString(16).substr(2, 7),
      message: file.name
    })
  }
}
</script>

<style scoped>
.three-areas-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.areas-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.area {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
}

.area.working { border-color: #f59e0b; }
.area.staging { border-color: #3b82f6; }
.area.repo { border-color: #10b981; }

.area-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.area-icon { font-size: 1.25rem; }
.area-name { flex: 1; font-weight: 600; }
.area-count {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.file-list, .commit-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 80px;
}

.file-item, .commit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.file-icon { font-size: 1rem; }
.file-name { flex: 1; font-size: 0.875rem; }

.mini-btn {
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--vp-c-brand);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.mini-btn:hover { background: var(--vp-c-brand); color: var(--vp-c-bg); }

.commit-hash {
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.commit-msg {
  flex: 1;
  font-size: 0.875rem;
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.875rem;
  padding: 1rem;
}

.info-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
}

.info-box p {
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .areas-container {
    grid-template-columns: 1fr;
  }
}
</style>
