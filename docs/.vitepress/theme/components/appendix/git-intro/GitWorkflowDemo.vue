<!--
  GitWorkflowDemo.vue
  Git 工作流演示 - 简洁版

  用途：展示 Git 的基本工作流程
  交互：初始化、提交、创建分支、合并
-->
<template>
  <div class="git-workflow-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <button @click="initRepo" :disabled="inited" class="action-btn">
        🎯 初始化仓库
      </button>
      <button @click="makeCommit" :disabled="!inited" class="action-btn">
        ✅ 提交
      </button>
      <button
        @click="createBranch"
        :disabled="!inited || hasBranch"
        class="action-btn"
      >
        🌿 创建分支
      </button>
      <button
        @click="mergeBranch"
        :disabled="!hasBranch || merging"
        class="action-btn"
      >
        🔀 合并分支
      </button>
      <button @click="reset" class="action-btn secondary">🔄 重置</button>
    </div>

    <!-- 提交历史可视化 -->
    <div class="visualization">
      <div class="graph-container">
        <svg viewBox="0 0 400 150" class="git-graph">
          <!-- 主分支线 -->
          <line
            x1="50"
            y1="60"
            x2="350"
            y2="60"
            stroke="#3b82f6"
            stroke-width="3"
          />

          <!-- 分支线 -->
          <line
            v-if="hasBranch"
            x1="150"
            y1="60"
            x2="150"
            y2="100"
            stroke="#10b981"
            stroke-width="3"
          />
          <line
            v-if="hasBranch"
            x1="150"
            y1="100"
            x2="300"
            y2="100"
            stroke="#10b981"
            stroke-width="3"
          />

          <!-- 合并线 -->
          <path
            v-if="merging"
            d="M 300 100 Q 320 80, 320 60"
            fill="none"
            stroke="#f59e0b"
            stroke-width="2"
            stroke-dasharray="5,5"
          />

          <!-- 提交节点 -->
          <circle
            v-for="(commit, i) in mainCommits"
            :key="'main-' + i"
            :cx="80 + i * 60"
            cy="60"
            r="10"
            fill="#3b82f6"
          />
          <circle
            v-for="(commit, i) in branchCommits"
            :key="'branch-' + i"
            :cx="200 + i * 60"
            cy="100"
            r="10"
            fill="#10b981"
          />
        </svg>
      </div>
    </div>

    <!-- 状态信息 -->
    <div class="status-panel">
      <div class="status-item">
        <span class="label">提交数:</span>
        <span class="value">{{ mainCommits.length }}</span>
      </div>
      <div class="status-item">
        <span class="label">分支:</span>
        <span class="value">{{ hasBranch ? '2' : '1' }}</span>
      </div>
      <div class="status-item">
        <span class="label">状态:</span>
        <span class="value">{{ status }}</span>
      </div>
    </div>

    <!-- 说明 -->
    <div class="info-box">
      <p>
        <strong>💡 工作流程:</strong> 初始化 → 提交 → 创建分支 → 开发 → 合并
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inited = ref(false)
const hasBranch = ref(false)
const merging = ref(false)
const mainCommits = ref([])
const branchCommits = ref([])

const status = computed(() => {
  if (merging) return '合并中...'
  if (hasBranch) return '分支已创建'
  if (inited) return '已初始化'
  return '未初始化'
})

const initRepo = () => {
  inited.value = true
  mainCommits.value = [{ hash: 'abc123' }]
}

const makeCommit = () => {
  if (inited.value) {
    mainCommits.value.push({ hash: Math.random().toString(16).substr(2, 6) })
  }
}

const createBranch = () => {
  if (inited.value && !hasBranch.value) {
    hasBranch.value = true
    branchCommits.value = [{ hash: 'def456' }]
  }
}

const mergeBranch = () => {
  if (hasBranch.value) {
    merging.value = true
    setTimeout(() => {
      mainCommits.value.push({ hash: Math.random().toString(16).substr(2, 6) })
      hasBranch.value = false
      branchCommits.value = []
      merging.value = false
    }, 1000)
  }
}

const reset = () => {
  inited.value = false
  hasBranch.value = false
  merging.value = false
  mainCommits.value = []
  branchCommits.value = []
}
</script>

<style scoped>
.git-workflow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.control-panel {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.625rem 1.25rem;
  border: 2px solid var(--vp-c-brand);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.action-btn.secondary {
  border-color: var(--vp-c-divider);
}

.visualization {
  margin: 1.5rem 0;
}

.graph-container {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.git-graph {
  width: 100%;
  height: auto;
}

.status-panel {
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.status-item {
  display: flex;
  gap: 0.5rem;
}

.status-item .label {
  color: var(--vp-c-text-2);
}

.status-item .value {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.info-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  margin-top: 1rem;
}

.info-box p {
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
