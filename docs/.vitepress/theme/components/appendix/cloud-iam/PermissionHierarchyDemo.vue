<template>
  <div class="permission-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">🏛️</span>
      <span class="title">权限层级结构</span>
      <span class="subtitle">不同权限级别的范围差异</span>
    </div>

    <div class="main-area">
      <div class="levels-list">
        <div
          v-for="(level, index) in hierarchyLevels"
          :key="index"
          class="level-row"
          :class="{ active: selectedLevel === index }"
          @click="selectLevel(index)"
        >
          <span class="level-icon">{{ level.icon }}</span>
          <div class="level-info">
            <span class="level-name">{{ level.name }}</span>
            <span class="level-scope">{{ level.scope }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="selectedLevelData"
        class="detail-panel"
      >
        <div class="detail-title">
          {{ selectedLevelData.name }}
        </div>
        <div class="detail-row">
          <span class="label">范围：</span>
          <span class="value">{{ selectedLevelData.scope }}</span>
        </div>
        <div class="detail-row">
          <span class="label">场景：</span>
          <span class="value">{{ selectedLevelData.scenario }}</span>
        </div>
        <div class="perms-list">
          <span
            v-for="(perm, i) in selectedLevelData.permissions.slice(0, 3)"
            :key="i"
            class="perm-tag"
          >{{ perm.name }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>最小权限原则——始终授予用户完成工作所需的最小权限。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedLevel = ref(0)

const hierarchyLevels = [
  {
    icon: '👑',
    name: '根账号',
    scope: '全账号最高权限',
    scenario: '账号所有者，拥有所有权限',
    permissions: [{ name: '完全管理' }, { name: '账单管理' }, { name: '关闭账号' }]
  },
  {
    icon: '👤',
    name: 'IAM 管理员',
    scope: 'IAM 全权限',
    scenario: '管理所有 IAM 用户、角色、策略',
    permissions: [{ name: '创建/删除用户' }, { name: '管理策略' }, { name: '查看凭证' }]
  },
  {
    icon: '👥',
    name: '普通用户',
    scope: '受限权限',
    scenario: '日常开发，只能访问特定资源',
    permissions: [{ name: '只读 EC2' }, { name: '读写 S3' }, { name: '查看日志' }]
  },
  {
    icon: '🎭',
    name: '临时角色',
    scope: '按策略定义',
    scenario: '跨账号访问、临时授权',
    permissions: [{ name: '临时凭证' }, { name: '跨账号' }, { name: '无长期凭证' }]
  },
  {
    icon: '🔑',
    name: '服务账号',
    scope: 'API 访问',
    scenario: '应用程序、CI/CD 流水线',
    permissions: [{ name: 'AK/SK' }, { name: '特定 API' }, { name: '定期轮换' }]
  }
]

const selectedLevelData = computed(() => hierarchyLevels[selectedLevel.value])

function selectLevel(index) {
  selectedLevel.value = index
}
</script>

<style scoped>
.permission-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
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

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.levels-list { display: flex; flex-direction: column; gap: 0.4rem; }

.level-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.level-row:hover { border-color: var(--vp-c-brand); }
.level-row.active { border-color: var(--vp-c-brand); background: var(--vp-c-brand-soft); }

.level-icon { font-size: 1.25rem; }

.level-info { display: flex; flex-direction: column; }
.level-name { font-weight: 600; font-size: 0.85rem; color: var(--vp-c-text-1); }
.level-scope { font-size: 0.7rem; color: var(--vp-c-text-2); }

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-row {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
}

.detail-row .label { color: var(--vp-c-text-2); }
.detail-row .value { color: var(--vp-c-text-1); }

.perms-list { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.5rem; }

.perm-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
