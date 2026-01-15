<template>
  <div class="git-workflow">
    <div class="control-panel">
      <button class="action-btn" @click="init" :disabled="inited">
        📁 初始化仓库
      </button>
      <button class="action-btn" @click="commit" :disabled="!inited">
        ✅ 提交 (Commit)
      </button>
      <button class="action-btn" @click="createBranch" :disabled="!inited || branches.length >= 3">
        🌿 创建分支
      </button>
      <button class="action-btn" @click="merge" :disabled="!inited || branches.length < 2">
        🔀 合并分支
      </button>
      <button class="action-btn danger" @click="reset">
        🔄 重置
      </button>
    </div>

    <div class="visualization">
      <div class="branch-lines">
        <svg class="git-graph" viewBox="0 0 400 200">
          <!-- Main branch line -->
          <line x1="50" y1="50" x2="350" y2="50" stroke="#e34c26" stroke-width="3" />

          <!-- Feature branch line -->
          <line
            v-if="branches.length > 1"
            x1="150"
            y1="50"
            x2="350"
            y2="50"
            stroke="#264de4"
            stroke-width="3"
            :style="{ transform: `translateY(${branches.length > 1 ? 50 : 0}px)` }"
          />

          <!-- Commits on main branch -->
          <circle v-for="(commit, index) in mainBranchCommits" :key="'main-' + index"
            cx="80 + index * 60"
            cy="50"
            r="12"
            :fill="commit.merged ? '#9ca3af' : '#e34c26'"
            stroke="white"
            stroke-width="2"
          />

          <!-- Commits on feature branch -->
          <circle v-for="(commit, index) in featureBranchCommits" :key="'feat-' + index"
            v-if="branches.length > 1"
            cx="140 + (index + 1) * 60"
            cy="100"
            r="12"
            fill="#264de4"
            stroke="white"
            stroke-width="2"
          />

          <!-- Merge arrow -->
          <path v-if="showMergeArrow"
            d="M 320 100 Q 340 75, 320 50"
            stroke="#22c55e"
            stroke-width="2"
            fill="none"
            stroke-dasharray="5,5"
          />
        </svg>
      </div>

      <div class="commit-list">
        <div class="section-title">提交历史</div>
        <div class="commits">
          <div v-for="(commit, index) in allCommits" :key="index" class="commit-item">
            <div class="commit-hash">{{ commit.hash }}</div>
            <div class="commit-message">{{ commit.message }}</div>
            <div class="commit-branch">{{ commit.branch }}</div>
          </div>
          <div v-if="allCommits.length === 0" class="no-commits">
            暂无提交，点击"初始化仓库"开始
          </div>
        </div>
      </div>
    </div>

    <div class="info-panel">
      <div class="info-title">💡 Git 核心概念</div>
      <div class="info-content">
        <div class="concept-item">
          <strong>📁 工作区 (Working Directory)</strong>：你实际操作的文件
        </div>
        <div class="concept-item">
          <strong>📦 暂存区 (Staging Area)</strong>：准备提交的文件
        </div>
        <div class="concept-item">
          <strong>📚 仓库 (Repository)</strong>：保存提交历史的地方
        </div>
        <div class="concept-item">
          <strong>🌿 分支 (Branch)</strong>：独立的开发线，互不干扰
        </div>
        <div class="concept-item">
          <strong>🔀 合并 (Merge)</strong>：将分支的改动整合到一起
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inited = ref(false)
const commitCount = ref(0)
const branches = ref(['main'])
const currentBranch = ref('main')
const commits = ref([])
const showMergeArrow = ref(false)

const mainBranchCommits = computed(() => {
  return commits.value.filter(c => c.branch === 'main')
})

const featureBranchCommits = computed(() => {
  return commits.value.filter(c => c.branch === 'feature')
})

const allCommits = computed(() => {
  return [...commits.value].reverse()
})

const generateHash = () => {
  return Math.random().toString(16).substr(2, 7)
}

const messages = [
  '初始化项目',
  '添加基础功能',
  '修复 bug',
  '更新文档',
  '优化性能',
  '添加新特性',
  '重构代码',
  '改进样式'
]

const init = () => {
  inited.value = true
  commitCount.value = 0
  branches.value = ['main']
  commits.value = []
}

const commit = () => {
  commitCount.value++
  const message = messages[(commitCount.value - 1) % messages.length]
  commits.value.push({
    hash: generateHash(),
    message: `${message} #${commitCount.value}`,
    branch: currentBranch.value,
    merged: false
  })
}

const createBranch = () => {
  if (branches.value.length < 3) {
    const newBranch = 'feature'
    branches.value.push(newBranch)
    currentBranch.value = newBranch
  }
}

const merge = () => {
  if (branches.value.length >= 2) {
    showMergeArrow.value = true
    setTimeout(() => {
      // Mark feature commits as merged
      commits.value.forEach(c => {
        if (c.branch === 'feature') {
          c.merged = true
        }
      })
      // Create merge commit
      commits.value.push({
        hash: generateHash(),
        message: '合并分支 feature → main',
        branch: 'main',
        merged: false
      })
      branches.value = ['main']
      currentBranch.value = 'main'
      showMergeArrow.value = false
    }, 1000)
  }
}

const reset = () => {
  inited.value = false
  commitCount.value = 0
  branches.value = ['main']
  currentBranch.value = 'main'
  commits.value = []
  showMergeArrow.value = false
}
</script>

<style scoped>
.git-workflow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.action-btn {
  padding: 10px 18px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.danger:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.visualization {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .visualization {
    grid-template-columns: 1fr;
  }
}

.branch-lines {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.git-graph {
  width: 100%;
  height: 150px;
}

.commit-list {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
}

.section-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.commits {
  max-height: 150px;
  overflow-y: auto;
}

.commit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 0.85rem;
}

.commit-hash {
  font-family: monospace;
  color: var(--vp-c-brand);
  font-weight: 600;
  min-width: 70px;
}

.commit-message {
  flex: 1;
  color: var(--vp-c-text-1);
}

.commit-branch {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-brand);
  color: white;
}

.no-commits {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  padding: 20px;
}

.info-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
  border-left: 4px solid var(--vp-c-brand);
}

.info-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.concept-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  padding-left: 10px;
}
</style>
