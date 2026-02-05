<template>
  <div class="role-policy-demo">
    <div class="demo-header">
      <h4>角色与策略关系可视化</h4>
      <p class="demo-desc">拖动查看角色如何关联多个策略</p>
    </div>

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

function selectFeature(platform, index) {
  // For compatibility with other demos
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
  // Simplified connection calculation
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 600px;
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.role-core:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.role-core.expanded {
  border-radius: 16px 16px 0 0;
}

.role-icon {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 8px;
}

.role-info {
  text-align: center;
}

.role-name {
  display: block;
  color: #333;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 4px;
}

.role-type {
  display: block;
  color: #666;
  font-size: 0.8rem;
}

.expand-icon {
  text-align: center;
  margin-top: 8px;
  color: #999;
  font-size: 0.8rem;
}

/* Trust Policy */
.trust-policy {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 0 16px 16px;
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.policy-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.policy-icon {
  font-size: 1.2rem;
}

.policy-title {
  font-weight: 700;
  color: #333;
  font-size: 0.85rem;
}

.policy-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.policy-item {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 6px;
  padding: 8px;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.principal {
  font-weight: 600;
  color: #667eea;
}

.action {
  color: #4caf50;
}

.condition {
  color: #ff9800;
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
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 2;
  fill: none;
  pointer-events: stroke;
  cursor: pointer;
  transition: all 0.3s ease;
}

.connection-line.allow {
  stroke: #4caf50;
}

.connection-line.deny {
  stroke: #f44336;
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
}

.policy-card:hover,
.policy-card.active {
  transform: translateX(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.policy-card.selected {
  border: 2px solid #667eea;
}

.policy-card .policy-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.policy-card .policy-icon {
  font-size: 1.4rem;
}

.policy-card .policy-name {
  font-weight: 700;
  color: #333;
  font-size: 0.9rem;
}

.policy-permissions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  margin-bottom: 4px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  font-size: 0.7rem;
}

.perm-effect {
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.65rem;
  text-transform: uppercase;
}

.perm-effect.Allow {
  background: #4caf50;
  color: white;
}

.perm-effect.Deny {
  background: #f44336;
  color: white;
}

.perm-action {
  font-family: monospace;
  color: #667eea;
}

.perm-resource {
  color: #999;
  font-size: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1024px) {
  .visualization-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
