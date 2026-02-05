<template>
  <div class="permission-hierarchy-demo">
    <div class="demo-header">
      <h4>权限层级结构</h4>
      <p class="demo-desc">点击层级查看详细权限范围</p>
    </div>

    <div class="hierarchy-container">
      <div
        v-for="(level, index) in hierarchyLevels"
        :key="index"
        class="level-row"
        :class="{ active: selectedLevel === index }"
        @click="selectLevel(index)"
      >
        <div class="level-icon">{{ level.icon }}</div>
        <div class="level-content">
          <span class="level-name">{{ level.name }}</span>
          <span class="level-scope">{{ level.scope }}</span>
        </div>
        <div class="permission-badges">
          <span
            v-for="(perm, i) in level.permissions.slice(0, 3)"
            :key="i"
            class="badge"
          >
            {{ perm }}
          </span>
          <span v-if="level.permissions.length > 3" class="badge more">
            +{{ level.permissions.length - 3 }}
          </span>
        </div>
      </div>
    </div>

    <div class="detail-panel" v-if="selectedLevelData">
      <h5>{{ selectedLevelData.name }} 详情</h5>
      <div class="detail-section">
        <span class="label">权限范围:</span>
        <span class="value">{{ selectedLevelData.scope }}</span>
      </div>
      <div class="detail-section">
        <span class="label">典型场景:</span>
        <span class="value">{{ selectedLevelData.scenario }}</span>
      </div>
      <div class="detail-section permissions-list">
        <span class="label">拥有权限:</span>
        <div class="permissions-grid">
          <span
            v-for="(perm, i) in selectedLevelData.permissions"
            :key="i"
            class="perm-tag"
            :class="perm.type"
          >
            {{ perm.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedLevel = ref(0)

const hierarchyLevels = [
  {
    icon: '👑',
    name: '根账号 (Root)',
    scope: '全账号最高权限',
    scenario: '账号所有者，拥有云服务的所有权限',
    permissions: [
      { name: '完全管理权限', type: 'full' },
      { name: '账单管理', type: 'billing' },
      { name: '组织架构管理', type: 'org' },
      { name: '关闭账号', type: 'critical' },
      { name: '恢复已删除资源', type: 'admin' }
    ]
  },
  {
    icon: '👤',
    name: 'IAM 管理员',
    scope: 'IAM 全权限',
    scenario: '管理所有 IAM 用户、角色、策略',
    permissions: [
      { name: '创建/删除用户', type: 'user' },
      { name: '创建/删除角色', type: 'role' },
      { name: '管理策略', type: 'policy' },
      { name: '查看凭证报告', type: 'audit' }
    ]
  },
  {
    icon: '👥',
    name: '普通 IAM 用户',
    scope: '受限权限',
    scenario: '日常开发人员，只能访问特定资源',
    permissions: [
      { name: '只读访问 EC2', type: 'read' },
      { name: '读写指定 S3 桶', type: 'limited' },
      { name: '查看 CloudWatch 日志', type: 'read' },
      { name: '无法创建 IAM 资源', type: 'deny' }
    ]
  },
  {
    icon: '🎭',
    name: '临时角色 (Role)',
    scope: '按策略定义',
    scenario: '跨账号访问、服务角色、临时授权',
    permissions: [
      { name: '临时凭证 (1-12小时)', type: 'temp' },
      { name: '按信任策略授权', type: 'conditional' },
      { name: '可跨账号使用', type: 'cross' },
      { name: '无长期凭证', type: 'secure' }
    ]
  },
  {
    icon: '🔑',
    name: '服务账号 / 应用',
    scope: 'API 访问权限',
    scenario: '应用程序、CI/CD 流水线、自动化脚本',
    permissions: [
      { name: 'AK/SK 或临时凭证', type: 'api' },
      { name: '特定服务 API 权限', type: 'service' },
      { name: '无控制台访问', type: 'programmatic' },
      { name: '建议定期轮换密钥', type: 'security' }
    ]
  }
]

const selectedLevelData = computed(() => {
  if (selectedLevel.value === null) return null
  return hierarchyLevels[selectedLevel.value]
})

function selectLevel(index) {
  selectedLevel.value = index
}
</script>

<style scoped>
.permission-hierarchy-demo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
}

.demo-desc {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.hierarchy-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.level-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.level-row:hover,
.level-row.active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(8px);
}

.level-icon {
  font-size: 1.6rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}

.level-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.level-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.level-scope {
  font-size: 0.75rem;
  opacity: 0.8;
}

.permission-badges {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 150px;
}

.badge {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 0.65rem;
  white-space: nowrap;
}

.badge.more {
  background: rgba(255, 255, 255, 0.4);
}

.detail-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  color: #333;
}

.detail-panel h5 {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  color: #667eea;
  padding-bottom: 8px;
  border-bottom: 2px solid #eee;
}

.detail-section {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.detail-section .label {
  font-weight: 600;
  color: #666;
  min-width: 80px;
  font-size: 0.85rem;
}

.detail-section .value {
  color: #333;
  font-size: 0.9rem;
  flex: 1;
}

.permissions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
}

.perm-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
}

.perm-tag.full {
  background: #f44336;
  color: white;
}

.perm-tag.read,
.perm-tag.user,
.perm-tag.readonly {
  background: #4caf50;
  color: white;
}

.perm-tag.limited,
.perm-tag.role,
.perm-tag.limited {
  background: #ff9800;
  color: white;
}

.perm-tag.deny,
.perm-tag.critical {
  background: #9c27b0;
  color: white;
}

.perm-tag.temp,
.perm-tag.conditional,
.perm-tag.service {
  background: #2196f3;
  color: white;
}

.perm-tag.admin,
.perm-tag.org,
.perm-tag.billing {
  background: #673ab7;
  color: white;
}

.perm-tag.api,
.perm-tag.programmatic,
.perm-tag.security {
  background: #607d8b;
  color: white;
}

.perm-tag.cross,
.perm-tag.secure,
.perm-tag.audit,
.perm-tag.policy {
  background: #795548;
  color: white;
}

@media (max-width: 768px) {
  .level-row {
    flex-wrap: wrap;
  }

  .permission-badges {
    width: 100%;
    justify-content: flex-start;
    max-width: none;
    margin-top: 8px;
  }

  .detail-section {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
