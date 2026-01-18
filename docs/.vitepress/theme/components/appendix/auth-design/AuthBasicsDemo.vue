<!--
  AuthBasicsDemo.vue
  鉴权基础概念演示
-->
<template>
  <div class="auth-basics-demo">
    <div class="header">
      <div class="title">为什么要鉴权？</div>
      <div class="subtitle">理解系统安全的第一道防线</div>
    </div>

    <div class="building-metaphor">
      <div class="building">
        <div class="building-header">
          <div class="building-icon">🏢</div>
          <div class="building-text">后端系统 = 一栋大楼</div>
        </div>

        <div class="building-areas">
          <div
            v-for="area in areas"
            :key="area.key"
            class="area"
            :class="{
              protected: area.protected,
              'can-access': canAccess(area)
            }"
            @click="toggleProtection(area)"
          >
            <div class="area-icon">{{ area.icon }}</div>
            <div class="area-label">{{ area.label }}</div>
            <div class="area-status" v-if="area.protected">
              <div class="lock-icon">🔒</div>
              <div class="lock-text">需要{{ area.requiredRole }}</div>
            </div>
            <div class="area-access" v-if="canAccess(area)">
              <div class="access-icon">✅</div>
              <div class="access-text">可访问</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="user-control">
      <div class="control-title">当前用户角色</div>
      <div class="role-selector">
        <button
          v-for="role in roles"
          :key="role.key"
          class="role-btn"
          :class="{ active: currentRole === role.key }"
          @click="setRole(role.key)"
        >
          <span class="role-icon">{{ role.icon }}</span>
          <span class="role-name">{{ role.name }}</span>
        </button>
      </div>
    </div>

    <div class="scenarios">
      <div class="section-title">保护资源的理由</div>
      <div class="scenario-cards">
        <div
          v-for="scenario in scenarios"
          :key="scenario.key"
          class="scenario-card"
          :class="`scenario-${scenario.key}`"
        >
          <div class="scenario-icon">{{ scenario.icon }}</div>
          <div class="scenario-title">{{ scenario.title }}</div>
          <div class="scenario-desc">{{ scenario.description }}</div>
          <div class="scenario-example">{{ scenario.example }}</div>
        </div>
      </div>
    </div>

    <div class="key-point">
      <div class="key-point-icon">💡</div>
      <div class="key-point-text">
        <strong>关键点：</strong
        >鉴权是第一道防线，所有敏感操作都必须先验证身份。
        没有鉴权的系统就像没有门禁的大楼，任何人都可以进出。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentRole = ref('guest')

const roles = [
  { key: 'guest', name: '访客', icon: '👤' },
  { key: 'user', name: '普通用户', icon: '👤' },
  { key: 'vip', name: 'VIP 用户', icon: '⭐' },
  { key: 'admin', name: '管理员', icon: '👨‍💼' }
]

const areas = ref([
  {
    key: 'lobby',
    label: '大厅',
    icon: '🚪',
    protected: false,
    requiredRole: null
  },
  {
    key: 'profile',
    label: '个人资料',
    icon: '👤',
    protected: true,
    requiredRole: '登录'
  },
  {
    key: 'vip-lounge',
    label: 'VIP 休息室',
    icon: '⭐',
    protected: true,
    requiredRole: 'VIP'
  },
  {
    key: 'admin-room',
    label: '管理员办公室',
    icon: '👨‍💼',
    protected: true,
    requiredRole: '管理员'
  }
])

const scenarios = [
  {
    key: 'privacy',
    icon: '🔐',
    title: '隐私保护',
    description: '个人信息、聊天记录只能本人查看',
    example: '你的微信聊天记录，别人不能看'
  },
  {
    key: 'permission',
    icon: '🛡️',
    title: '权限控制',
    description: '不同角色有不同的操作权限',
    example: '管理员可以删除用户，普通用户不行'
  },
  {
    key: 'abuse',
    icon: '🚫',
    title: '防止滥用',
    description: '防止恶意调用、刷接口、爬虫',
    example: '限制 API 调用频率，防止服务被攻击'
  }
]

const setRole = (role) => {
  currentRole.value = role
}

const toggleProtection = (area) => {
  area.protected = !area.protected
}

const canAccess = (area) => {
  if (!area.protected) return true

  const roleAccess = {
    guest: [],
    user: ['登录'],
    vip: ['登录', 'VIP'],
    admin: ['登录', 'VIP', '管理员']
  }

  const permissions = roleAccess[currentRole.value] || []
  return permissions.includes(area.requiredRole)
}
</script>

<style scoped>
.auth-basics-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.building-metaphor {
  margin-bottom: 1.5rem;
}

.building {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.building-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.building-icon {
  font-size: 2rem;
}

.building-text {
  font-size: 1.05rem;
  font-weight: 600;
}

.building-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.area {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.area:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.area.protected {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.area.can-access {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.area-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.area-label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.area-status,
.area-access {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.lock-icon,
.access-icon {
  font-size: 1rem;
}

.lock-text {
  color: #f59e0b;
  font-weight: 600;
}

.access-text {
  color: #22c55e;
  font-weight: 600;
}

.user-control {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.control-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.role-selector {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.role-btn {
  flex: 1;
  min-width: 100px;
  padding: 0.75rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.role-btn:hover {
  border-color: var(--vp-c-brand);
}

.role-btn.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
}

.role-icon {
  font-size: 1.2rem;
}

.scenarios {
  margin-bottom: 1.5rem;
}

.section-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.scenario-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.scenario-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.scenario-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.scenario-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.scenario-example {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.scenario-privacy .scenario-icon {
  filter: hue-rotate(200deg);
}
.scenario-permission .scenario-icon {
  filter: hue-rotate(120deg);
}
.scenario-abuse .scenario-icon {
  filter: hue-rotate(0deg);
}

.key-point {
  display: flex;
  gap: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid var(--vp-c-brand);
  padding: 1rem;
  border-radius: 8px;
}

.key-point-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.key-point-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.key-point-text strong {
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .building-areas {
    grid-template-columns: repeat(2, 1fr);
  }

  .scenario-cards {
    grid-template-columns: 1fr;
  }

  .role-selector {
    flex-direction: column;
  }

  .role-btn {
    min-width: auto;
  }
}
</style>
