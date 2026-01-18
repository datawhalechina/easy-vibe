<!--
  AuthNvsAuthZDemo.vue
  认证 vs 授权对比演示
-->
<template>
  <div class="auth-n-vs-z-demo">
    <div class="header">
      <div class="title">认证 vs 授权</div>
      <div class="subtitle">先认证，再授权 - 两个不同的概念</div>
    </div>

    <div class="comparison">
      <div class="comparison-card authn">
        <div class="card-header">
          <div class="card-icon">🔐</div>
          <div class="card-title">Authentication (认证)</div>
          <div class="card-abbr">AuthN</div>
        </div>
        <div class="card-content">
          <div class="question">你是谁？</div>
          <div class="answer">验证用户身份</div>
          <div class="examples">
            <div class="example-title">常见方式：</div>
            <div class="example-list">
              <div class="example-item">🔑 输入用户名密码</div>
              <div class="example-item">👆 指纹识别</div>
              <div class="example-item">👤 人脸识别</div>
              <div class="example-item">📱 短信验证码</div>
            </div>
          </div>
          <div class="output">
            <div class="output-title">输出：</div>
            <div class="output-value">Token / Session</div>
          </div>
        </div>
      </div>

      <div class="vs-divider">VS</div>

      <div class="comparison-card authz">
        <div class="card-header">
          <div class="card-icon">🛡️</div>
          <div class="card-title">Authorization (授权)</div>
          <div class="card-abbr">AuthZ</div>
        </div>
        <div class="card-content">
          <div class="question">你能干什么？</div>
          <div class="answer">检查用户权限</div>
          <div class="examples">
            <div class="example-title">权限类型：</div>
            <div class="example-list">
              <div class="example-item">👀 查看权限</div>
              <div class="example-item">✏️ 编辑权限</div>
              <div class="example-item">🗑️ 删除权限</div>
              <div class="example-item">👨‍💼 管理员权限</div>
            </div>
          </div>
          <div class="output">
            <div class="output-title">输出：</div>
            <div class="output-value">允许 / 拒绝</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flow-demo">
      <div class="section-title">完整流程</div>
      <div class="flow-steps">
        <div
          v-for="(step, index) in flowSteps"
          :key="index"
          class="flow-step"
          :class="{
            active: currentStep === index,
            completed: currentStep > index
          }"
        >
          <div class="step-circle">
            {{ index + 1 }}
          </div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
          <div v-if="index < flowSteps.length - 1" class="step-arrow">→</div>
        </div>
      </div>

      <div class="scenario-demo">
        <div class="scenario-header">模拟场景</div>
        <div class="scenario-content">
          <div class="user-action">
            <div class="action-label">用户操作：</div>
            <select v-model="selectedAction" @change="runScenario">
              <option value="view">查看文章</option>
              <option value="edit">编辑文章</option>
              <option value="delete">删除文章</option>
              <option value="admin">访问管理后台</option>
            </select>
          </div>

          <div class="user-role">
            <div class="role-label">用户角色：</div>
            <div class="role-buttons">
              <button
                v-for="role in roles"
                :key="role.key"
                class="role-btn"
                :class="{ active: selectedRole === role.key }"
                @click="setRole(role.key)"
              >
                {{ role.label }}
              </button>
            </div>
          </div>

          <div class="result-box" :class="resultClass">
            <div class="result-icon">{{ resultIcon }}</div>
            <div class="result-text">{{ resultText }}</div>
          </div>

          <div class="step-details" v-if="stepDetails.length > 0">
            <div class="step-details-title">处理流程：</div>
            <div
              class="step-detail-item"
              v-for="(detail, idx) in stepDetails"
              :key="idx"
            >
              <span class="detail-step">步骤 {{ idx + 1 }}：</span>
              <span class="detail-text">{{ detail }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="key-insight">
      <div class="insight-icon">💡</div>
      <div class="insight-text">
        <strong>核心关系：</strong>先认证（AuthN），再授权（AuthZ）。
        只有确认了"你是谁"，才能判断"你能干什么"。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const selectedAction = ref('view')
const selectedRole = ref('user')

const roles = [
  { key: 'guest', label: '访客' },
  { key: 'user', label: '普通用户' },
  { key: 'admin', label: '管理员' }
]

const flowSteps = [
  {
    title: '用户请求',
    desc: '用户发起操作请求'
  },
  {
    title: '认证 (AuthN)',
    desc: '验证 Token 是否有效'
  },
  {
    title: '授权 (AuthZ)',
    desc: '检查是否有权限'
  },
  {
    title: '执行业务逻辑',
    desc: '允许或拒绝访问'
  }
]

const actionPermissions = {
  view: { guest: true, user: true, admin: true },
  edit: { guest: false, user: true, admin: true },
  delete: { guest: false, user: false, admin: true },
  admin: { guest: false, user: false, admin: true }
}

const actionNames = {
  view: '查看文章',
  edit: '编辑文章',
  delete: '删除文章',
  admin: '访问管理后台'
}

const stepDetails = ref([])

const resultText = computed(() => {
  const hasPermission =
    actionPermissions[selectedAction.value][selectedRole.value]
  const action = actionNames[selectedAction.value]
  const role = roles.find((r) => r.key === selectedRole.value)?.label

  if (!hasPermission) {
    return `${role}无法${action} - 权限不足`
  }
  return `${role}可以${action} - 授权通过`
})

const resultClass = computed(() => {
  const hasPermission =
    actionPermissions[selectedAction.value][selectedRole.value]
  return hasPermission ? 'success' : 'error'
})

const resultIcon = computed(() => {
  const hasPermission =
    actionPermissions[selectedAction.value][selectedRole.value]
  return hasPermission ? '✅' : '❌'
})

const setRole = (role) => {
  selectedRole.value = role
  runScenario()
}

const runScenario = () => {
  const action = selectedAction.value
  const role = selectedRole.value
  const hasPermission = actionPermissions[action][role]

  stepDetails.value = [
    `用户请求：${actionNames[action]}`,
    `认证检查：${role !== 'guest' ? '已登录，Token 有效' : '未登录或 Token 无效'}`,
    `授权检查：检查 ${role} 是否有 ${action} 权限`,
    `最终决定：${hasPermission ? '允许访问' : '拒绝访问，返回 403 Forbidden'}`
  ]

  currentStep.value = 4
}
</script>

<style scoped>
.auth-n-vs-z-demo {
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

.comparison {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.comparison-card {
  flex: 1;
  min-width: 280px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.2s ease;
}

.comparison-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.comparison-card.authn {
  border-color: #3b82f6;
}

.comparison-card.authz {
  border-color: #8b5cf6;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.card-icon {
  font-size: 2rem;
}

.card-title {
  flex: 1;
  font-weight: 700;
  font-size: 1rem;
}

.card-abbr {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.comparison-card.authn .card-abbr {
  background: #3b82f6;
}

.comparison-card.authz .card-abbr {
  background: #8b5cf6;
}

.question {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.answer {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.examples {
  margin-bottom: 1rem;
}

.example-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.example-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.example-item {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.comparison-card.authn .example-item {
  border-color: #3b82f6;
}

.comparison-card.authz .example-item {
  border-color: #8b5cf6;
}

.output {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand);
}

.comparison-card.authn .output {
  border-color: #3b82f6;
}

.comparison-card.authz .output {
  border-color: #8b5cf6;
}

.output-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.output-value {
  font-size: 0.95rem;
  font-weight: 700;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  min-width: 50px;
}

.flow-demo {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.section-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.flow-steps {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.flow-step {
  flex: 1;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
}

.flow-step.completed {
  opacity: 0.6;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  min-width: 0;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.step-arrow {
  color: var(--vp-c-text-2);
  font-weight: 700;
  flex-shrink: 0;
}

.scenario-demo {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.scenario-header {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.scenario-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-action,
.user-role {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.action-label,
.role-label {
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 80px;
}

.user-action select {
  flex: 1;
  min-width: 150px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 0.9rem;
}

.role-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.role-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.role-btn:hover {
  border-color: var(--vp-c-brand);
}

.role-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.result-box {
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.result-box.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid #22c55e;
  color: #16a34a;
}

.result-box.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #dc2626;
}

.result-icon {
  font-size: 1.5rem;
}

.step-details {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.step-details-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.step-detail-item {
  font-size: 0.85rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.step-detail-item:last-child {
  border-bottom: none;
}

.detail-step {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.key-insight {
  display: flex;
  gap: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid var(--vp-c-brand);
  padding: 1rem;
  border-radius: 8px;
}

.insight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.insight-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.insight-text strong {
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .comparison {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }

  .flow-steps {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }
}
</style>
