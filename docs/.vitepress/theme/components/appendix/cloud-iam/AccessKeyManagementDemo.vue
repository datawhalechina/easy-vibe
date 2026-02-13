<template>
  <div class="access-key-management-demo">
    <div class="demo-header">
      <h4>访问密钥（AK/SK）生命周期管理</h4>
      <p class="intro-text">模拟 AK/SK 的创建、使用和轮换流程</p>
    </div>

    <div class="demo-content">
      <div class="lifecycle-container">
        <!-- AK/SK Card -->
        <div class="aksk-card">
          <div class="card-header">
            <span class="status-badge" :class="akStatus">{{ statusText }}</span>
            <span class="age-indicator">已创建 {{ akAge }} 天</span>
          </div>

          <div class="credentials-display">
            <div class="credential-row">
              <span class="label">Access Key ID:</span>
              <div class="value-container">
                <span class="value">{{ maskedAK }}</span>
                <button class="icon-btn" @click="toggleAKVisibility">
                  {{ showAK ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="credential-row">
              <span class="label">Secret Access Key:</span>
              <div class="value-container">
                <span class="value">{{ maskedSK }}</span>
                <button class="icon-btn" @click="toggleSKVisibility">
                  {{ showSK ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
          </div>

          <div class="usage-stats">
            <div class="stat-item">
              <span class="stat-value">{{ apiCalls }}</span>
              <span class="stat-label">API 调用</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ lastUsed }}</span>
              <span class="stat-label">最后使用</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-panel">
          <button
            class="action-btn primary"
            @click="rotateKey"
            :disabled="isRotating"
          >
            <span class="btn-icon">🔄</span>
            <span class="btn-text">轮换密钥</span>
          </button>

          <button
            class="action-btn warning"
            @click="deactivateKey"
            :disabled="akStatus === 'inactive'"
          >
            <span class="btn-icon">⏸️</span>
            <span class="btn-text">{{ akStatus === 'inactive' ? '已禁用' : '禁用密钥' }}</span>
          </button>

          <button
            class="action-btn danger"
            @click="deleteKey"
          >
            <span class="btn-icon">🗑️</span>
            <span class="btn-text">删除密钥</span>
          </button>
        </div>
      </div>

      <!-- Rotation Progress -->
      <div class="rotation-progress" v-if="isRotating">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: rotationProgress + '%' }"></div>
        </div>
        <span class="progress-text">{{ rotationStatus }}</span>
      </div>
    </div>

    <div class="info-box">
      <strong>💡 安全提示：</strong>访问密钥泄露是云安全事件的主要原因之一。建议优先使用 IAM 角色替代访问密钥，如果必须使用，请务必定期轮换。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// AK/SK Data
const akId = ref('AKIAIOSFODNN7EXAMPLE')
const skId = ref('wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY')
const akStatus = ref('active')
const akAge = ref(45)
const apiCalls = ref(123456)
const lastUsed = ref('2 小时前')

// Visibility
const showAK = ref(false)
const showSK = ref(false)

// Rotation
const isRotating = ref(false)
const rotationProgress = ref(0)
const rotationStatus = ref('')

// Computed
const maskedAK = computed(() => {
  if (showAK.value) return akId.value
  return akId.value.substring(0, 8) + '...'
})

const maskedSK = computed(() => {
  if (showSK.value) return skId.value
  return '************************************'
})

const statusText = computed(() => {
  const map = {
    active: '活跃',
    inactive: '已禁用',
    rotating: '轮换中'
  }
  return map[akStatus.value] || akStatus.value
})

// Methods
function toggleAKVisibility() {
  showAK.value = !showAK.value
}

function toggleSKVisibility() {
  showSK.value = !showSK.value
}

async function rotateKey() {
  isRotating.value = true
  rotationProgress.value = 0
  rotationStatus.value = '生成新密钥对...'

  // Step 1: Generate new key
  await simulateProgress(30, '创建新 Access Key...')
  const newAK = 'AKIA' + Math.random().toString(36).substring(2, 14).toUpperCase()

  // Step 2: Update applications
  await simulateProgress(60, '更新应用配置...')

  // Step 3: Test new key
  await simulateProgress(85, '验证新密钥...')

  // Step 4: Disable old key
  await simulateProgress(100, '禁用旧密钥...')

  // Update data
  akId.value = newAK
  akAge.value = 0
  apiCalls.value = 0
  lastUsed.value = '刚刚'
  isRotating.value = false
  akStatus.value = 'active'
}

function simulateProgress(target, status) {
  return new Promise((resolve) => {
    rotationStatus.value = status
    const interval = setInterval(() => {
      rotationProgress.value += 1
      if (rotationProgress.value >= target) {
        clearInterval(interval)
        resolve()
      }
    }, 20)
  })
}

function deactivateKey() {
  if (confirm('确定要禁用这个访问密钥吗？禁用后使用该密钥的应用将无法访问云服务。')) {
    akStatus.value = 'inactive'
  }
}

function deleteKey() {
  if (confirm('警告：删除访问密钥是不可逆的操作！\n\n确定要删除这个密钥吗？')) {
    alert('密钥已删除（演示模式）')
  }
}
</script>

<style scoped>
.access-key-management-demo {
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

.lifecycle-container {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

/* AK/SK Card */
.aksk-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.status-badge.inactive {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.15);
  color: var(--vp-c-brand-delta);
}

.age-indicator {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.credentials-display {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.credential-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credential-row .label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}

.value-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.value {
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  word-break: break-all;
  color: var(--vp-c-text-1);
}

.icon-btn {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: var(--vp-c-bg-alt);
}

.usage-stats {
  display: flex;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

/* Action Panel */
.action-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.125rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.action-btn.warning {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.1);
  border-color: var(--vp-c-brand-delta);
  color: var(--vp-c-brand-delta);
}

.action-btn.warning:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-delta-rgb), 0.2);
}

.action-btn.danger {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.15);
  border-color: var(--vp-c-brand-delta);
  color: var(--vp-c-brand-delta);
}

.action-btn.danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-delta-rgb), 0.2);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Rotation Progress */
.rotation-progress {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
  margin-top: 1.25rem;
}

.progress-bar {
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  display: block;
  text-align: center;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
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

@media (max-width: 768px) {
  .lifecycle-container {
    grid-template-columns: 1fr;
  }

  .action-panel {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .action-btn {
    flex: 1;
    min-width: 140px;
  }
}
</style>
