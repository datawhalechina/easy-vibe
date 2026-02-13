<template>
  <div class="role-policy-demo">
    <div class="demo-header">
      <h4>角色与策略关系可视化</h4>
      <p class="intro-text">拖动查看角色如何关联多个策略</p>
    </div>

    <div class="demo-content">
      <div class="visualization-container">
        <!-- Central Role -->
        <div class="central-role">
          <div class="role-core" @click="toggleRoleDetails"
               :class="{ expanded: showRoleDetails }">
            <div class="role-icon">🎭</div>
            <div class="role-info">
              <span class="role-name">{{ roleName }}</span>
              <span class="role-type">{{ roleType }}</span>
            </div>
            <div class="expand-icon">{{ showRoleDetails ? '▼' : '▶' }}</div>
          </div>

          <!-- Trust Policy -->
          <div class="trust-policy" v-if="showRoleDetails">
            <div class="policy-header">
              <span class="policy-icon">🔐</span>
              <span class="policy-title">信任策略 (Trust Policy)</span>
            </div>
            <div class="policy-content">
              <div class="policy-item" v-for="(trust, i) in trustPolicy" :key="i">
                <span class="principal">{{ trust.principal }}</span>
                <span class="action">可执行: {{ trust.action }}</span>
                <span class="condition" v-if="trust.condition">条件: {{ trust.condition }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Connection Lines (SVG) -->
        <svg class="connection-lines" v-if="mounted">
          <line
            v-for="(line, index) in connectionLines"
            :key="index"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            :class="['connection-line', line.type, { active: hoveredPolicy === line.policyIndex }]"
            @mouseenter="hoveredPolicy = line.policyIndex"
            @mouseleave="hoveredPolicy = null"
          />
        </svg>

        <!-- Attached Policies -->
        <div class="attached-policies">
          <div
            v-for="(policy, index) in attachedPolicies"
            :key="index"
            class="policy-card"
            :class="{ active: hoveredPolicy === index, selected: selectedPolicy === index }"
            :style="getPolicyPosition(index)"
            @mouseenter="hoveredPolicy = index"
            @mouseleave="hoveredPolicy = null"
            @click="selectPolicy(index)"
          >
            <div class="policy-header">
              <span class="policy-icon">{{ policy.icon }}</span>
              <span class="policy-name">{{ policy.name }}</span>
            </div>

            <div class="policy-permissions" v-if="selectedPolicy === index">
              <div class="permission-item" v-for="(perm, i) in policy.permissions" :key="i">
                <span class="perm-effect" :class="perm.effect">{{ perm.effect }}</span>
                <span class="perm-action">{{ perm.action }}</span>
                <span class="perm-resource">{{ perm.resource }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>💡 策略叠加：</strong>一个角色可以附加多个策略，最终的权限是所有策略的叠加结果。Deny 策略优先级高于 Allow。
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Role Data
const roleName = ref('CrossAccountS3AccessRole')
const roleType = ref('跨账号访问角色')
const showRoleDetails = ref(false)

const trustPolicy = ref([
  { principal: '账号 A (123456789012)', action: 'sts:AssumeRole', condition: 'ExternalId 匹配' },
  { principal: '特定 IAM 用户', action: 'sts:AssumeRole', condition: 'IP 白名单' }
])

// Policies Data
const attachedPolicies = ref([
  {
    name: 'S3ReadWritePolicy',
    icon: '📦',
    permissions: [
      { effect: 'Allow', action: 's3:GetObject', resource: 'arn:aws:s3:::bucket/*' },
      { effect: 'Allow', action: 's3:PutObject', resource: 'arn:aws:s3:::bucket/*' },
      { effect: 'Allow', action: 's3:ListBucket', resource: 'arn:aws:s3:::bucket' }
    ]
  },
  {
    name: 'CloudWatchLogsPolicy',
    icon: '📊',
    permissions: [
      { effect: 'Allow', action: 'logs:CreateLogGroup', resource: '*' },
      { effect: 'Allow', action: 'logs:CreateLogStream', resource: '*' },
      { effect: 'Allow', action: 'logs:PutLogEvents', resource: '*' }
    ]
  },
  {
    name: 'DenySensitiveData',
    icon: '🚫',
    permissions: [
      { effect: 'Deny', action: 's3:GetObject', resource: 'arn:aws:s3:::bucket/sensitive/*' },
      { effect: 'Deny', action: 's3:DeleteObject', resource: 'arn:aws:s3:::bucket/*' }
    ]
  }
])

// State
const hoveredPolicy = ref(null)
const selectedPolicy = ref(0)
const mounted = ref(false)
const connectionLines = ref([])

// Methods
function toggleRoleDetails() {
  showRoleDetails.value = !showRoleDetails.value
}

function selectPolicy(index) {
  selectedPolicy.value = index
}

function getPolicyPosition(index) {
  const positions = [
    { top: '0%', right: '0%' },
    { top: '35%', right: '5%' },
    { top: '70%', right: '0%' }
  ]
  return positions[index] || positions[0]
}

function calculateConnections() {
  connectionLines.value = attachedPolicies.value.map((_, index) => ({
    x1: 50,
    y1: 50,
    x2: 80 + (index * 5),
    y2: 20 + (index * 30),
    type: index === 2 ? 'deny' : 'allow',
    policyIndex: index
  }))
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    mounted.value = true
    calculateConnections()
  })
})

onUnmounted(() => {
  mounted.value = false
})
</script>

<style scoped>
.role-policy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.intro-text {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.demo-content {
  margin-bottom: 1rem;
}

.visualization-container {
  position: relative;
  min-height: 500px;
}

/* Central Role */
.central-role {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 280px;
  z-index: 10;
}

.role-core {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.role-core:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.role-core.expanded {
  border-radius: 8px 8px 0 0;
}

.role-icon {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.role-info {
  text-align: center;
}

.role-name {
  display: block;
  color: var(--vp-c-text-1);
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.role-type {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.expand-icon {
  text-align: center;
  margin-top: 0.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

/* Trust Policy */
.trust-policy {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 1rem 1.25rem;
}

.policy-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.policy-icon {
  font-size: 1.2rem;
}

.policy-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.policy-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.policy-item {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.principal {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.action {
  color: var(--vp-c-text-2);
}

.condition {
  color: var(--vp-c-text-3);
}

/* Connection Lines SVG */
.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.connection-line {
  stroke: var(--vp-c-divider);
  stroke-width: 2;
  fill: none;
  pointer-events: stroke;
  cursor: pointer;
  transition: all 0.2s ease;
}

.connection-line.allow {
  stroke: var(--vp-c-brand);
}

.connection-line.deny {
  stroke: var(--vp-c-brand-delta);
  stroke-dasharray: 5, 5;
}

.connection-line:hover,
.connection-line.active {
  stroke-width: 4;
  opacity: 1;
}

/* Attached Policies */
.attached-policies {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 240px;
}

.policy-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.policy-card:hover,
.policy-card.active {
  border-color: var(--vp-c-brand);
  transform: translateX(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.policy-card.selected {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.policy-card .policy-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.5rem;
}

.policy-card .policy-icon {
  font-size: 1.4rem;
}

.policy-card .policy-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.policy-permissions {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem;
  margin-bottom: 0.25rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.7rem;
}

.perm-effect {
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.65rem;
  text-transform: uppercase;
}

.perm-effect.Allow {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.perm-effect.Deny {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.15);
  color: var(--vp-c-brand-delta);
}

.perm-action {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
}

.perm-resource {
  color: var(--vp-c-text-3);
  font-size: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.info-box strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 1024px) {
  .visualization-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .central-role,
  .attached-policies {
    position: static;
    transform: none;
    width: 100%;
  }

  .connection-lines {
    display: none;
  }
}
</style>
