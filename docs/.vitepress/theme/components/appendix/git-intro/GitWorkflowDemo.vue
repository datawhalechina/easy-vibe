<!--
  GitWorkflowDemo.vue
  Git 基础工作流演示 - 寄快递版

  展示 Git 的基本工作流程：修改 → 暂存 → 提交
  高度控制：紧凑布局，确保在 600px 内
-->
<template>
  <div class="git-workflow-demo">
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">Git 工作流</span>
      <span class="subtitle">修改 → 暂存 → 提交，三步走</span>
    </div>

    <div class="demo-content">
      <!-- 文件状态区域 -->
      <div class="file-area">
        <div class="area-header">
          <span class="area-icon">📝</span>
          <span class="area-name">工作区</span>
          <span class="area-desc">你正在改的文件</span>
        </div>
        <div class="file-list">
          <div
            v-for="file in files"
            :key="file.name"
            class="file-item"
            :class="{
              'modified': file.status === 'modified',
              'staged': file.status === 'staged',
              'committed': file.status === 'committed'
            }"
          >
            <span class="file-icon">{{ getIcon(file.status) }}</span>
            <span class="file-name">{{ file.name }}</span>
            <span class="file-status">{{ getStatusText(file.status) }}</span>
          </div>
        </div>
      </div>

      <!-- 箭头 -->
      <div
        v-if="!allCommitted"
        class="arrow-group"
      >
        <div
          class="arrow"
          :class="{ active: hasStaged }"
        >
          ↓
        </div>
        <div
          v-if="hasStaged"
          class="arrow-label"
        >
          git add
        </div>
      </div>

      <!-- 暂存区 -->
      <div class="stage-area">
        <div class="area-header">
          <span class="area-icon">📋</span>
          <span class="area-name">暂存区</span>
          <span class="area-desc">准备打包的文件</span>
        </div>
        <div class="file-list">
          <div
            v-for="file in stagedFiles"
            :key="file.name"
            class="file-item staged"
          >
            <span class="file-icon">📌</span>
            <span class="file-name">{{ file.name }}</span>
            <span class="file-status">待提交</span>
          </div>
          <div
            v-if="stagedFiles.length === 0"
            class="empty-tip"
          >
            暂无文件
          </div>
        </div>
      </div>

      <!-- 箭头 -->
      <div
        v-if="hasStaged"
        class="arrow-group"
      >
        <div class="arrow active">
          ↓
        </div>
        <div class="arrow-label">
          git commit
        </div>
      </div>

      <!-- 仓库区 -->
      <div class="repo-area">
        <div class="area-header">
          <span class="area-icon">🏪</span>
          <span class="area-name">仓库</span>
          <span class="area-desc">已保存的版本</span>
        </div>
        <div class="commit-list">
          <div
            v-for="(commit, i) in commits"
            :key="i"
            class="commit-item"
          >
            <span class="commit-icon">✅</span>
            <span class="commit-msg">{{ commit.msg }}</span>
          </div>
          <div
            v-if="commits.length === 0"
            class="empty-tip"
          >
            暂无提交
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-panel">
      <button
        class="action-btn"
        :disabled="allModified"
        @click="modifyFile"
      >
        ✏️ 修改文件
      </button>
      <button
        class="action-btn"
        :disabled="!hasModified || allStaged"
        @click="stageFiles"
      >
        📌 暂存修改
      </button>
      <button
        class="action-btn"
        :disabled="!hasStaged"
        @click="commitFiles"
      >
        ✅ 提交版本
      </button>
      <button
        class="action-btn secondary"
        @click="reset"
      >
        🔄 重置
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>工作区修改 → 暂存区挑选 → 仓库永久保存
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const files = ref([
  { name: 'index.html', status: 'unmodified' },
  { name: 'app.js', status: 'unmodified' },
  { name: 'style.css', status: 'unmodified' }
])

const commits = ref([])

const hasModified = computed(() =>
  files.value.some(f => f.status === 'modified')
)

const hasStaged = computed(() =>
  files.value.some(f => f.status === 'staged')
)

const allCommitted = computed(() =>
  files.value.every(f => f.status === 'committed')
)

const allModified = computed(() =>
  files.value.every(f => f.status === 'modified')
)

const allStaged = computed(() =>
  files.value.every(f => f.status === 'staged' || f.status === 'committed')
)

const stagedFiles = computed(() =>
  files.value.filter(f => f.status === 'staged')
)

const getIcon = (status) => {
  switch (status) {
    case 'modified': return '📝'
    case 'staged': return '📌'
    case 'committed': return '✅'
    default: return '📄'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'modified': return '已修改'
    case 'staged': return '已暂存'
    case 'committed': return '已提交'
    default: return '未修改'
  }
}

const modifyFile = () => {
  const unmodified = files.value.filter(f => f.status === 'unmodified' || f.status === 'committed')
  if (unmodified.length > 0) {
    const file = unmodified[0]
    file.status = 'modified'
  }
}

const stageFiles = () => {
  files.value.forEach(f => {
    if (f.status === 'modified') {
      f.status = 'staged'
    }
  })
}

const commitFiles = () => {
  const staged = files.value.filter(f => f.status === 'staged')
  if (staged.length > 0) {
    files.value.forEach(f => {
      if (f.status === 'staged') {
        f.status = 'committed'
      }
    })
    commits.value.push({
      msg: `提交了 ${staged.length} 个文件`,
      files: staged.map(f => f.name)
    })
  }
}

const reset = () => {
  files.value.forEach(f => {
    f.status = 'unmodified'
  })
  commits.value = []
}
</script>

<style scoped>
.git-workflow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  max-height: 550px;
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.area-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.area-icon {
  font-size: 1.1rem;
}

.area-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.area-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-left: 0.5rem;
}

.file-area,
.stage-area,
.repo-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.file-list,
.commit-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 60px;
}

.file-item,
.commit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.85rem;
}

.file-item.modified {
  background: var(--vp-c-bg-alt);
  border-left: 3px solid var(--vp-c-warning);
}

.file-item.staged {
  background: var(--vp-c-brand-soft);
  border-left: 3px solid var(--vp-c-brand);
}

.file-item.committed {
  background: var(--vp-c-bg-alt);
  border-left: 3px solid var(--vp-c-success);
  opacity: 0.7;
}

.file-icon {
  font-size: 1rem;
}

.file-name {
  flex: 1;
  color: var(--vp-c-text-1);
}

.file-status {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.commit-item {
  font-size: 0.8rem;
}

.commit-icon {
  font-size: 0.9rem;
}

.commit-msg {
  flex: 1;
  color: var(--vp-c-text-2);
}

.empty-tip {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  padding: 0.5rem;
}

.arrow-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0;
}

.arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  transition: all 0.3s;
}

.arrow.active {
  color: var(--vp-c-brand);
  transform: scale(1.2);
}

.arrow-label {
  font-size: 0.7rem;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.action-panel {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 100px;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: var(--vp-c-divider);
}

.action-btn.secondary {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.action-btn.secondary:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
