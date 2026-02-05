<template>
  <div class="access-key-management-demo">
    <div class="demo-header">
      <h4>访问密钥（AK/SK）生命周期管理</h4>
      <p class="demo-desc">模拟 AK/SK 的创建、使用和轮换流程</p>
    </div>

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

    <!-- Best Practices -->
    <div class="best-practices">
      <h5>🔒 AK/SK 安全管理最佳实践</h5>
      <ul>
        <li v-for="(tip, i) in securityTips" :key="i">
          <span class="tip-icon">{{ tip.icon }}</span>
          <span class="tip-text">{{ tip.text }}</span>
        </li>
      </ul>
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

// Security Tips
const securityTips = [
  { icon: '🔄', text: '每 90 天轮换一次访问密钥' },
  { icon: '🔒', text: '绝不将 AK/SK 硬编码在代码中' },
  { icon: '👁️', text: '定期审计和监控密钥使用情况' },
  { icon: '🗑️', text: '及时删除不再使用的访问密钥' },
  { icon: '🛡️', text: '优先使用 IAM 角色替代访问密钥' }
]
</script>

<style scoped>
.access-key-management-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
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

.lifecycle-container {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  margin-bottom: 20px;
}

/* AK/SK Card */
.aksk-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #4caf50;
  color: white;
}

.status-badge.inactive {
  background: #f44336;
  color: white;
}

.age-indicator {
  font-size: 0.75rem;
  opacity: 0.7;
}

.credentials-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.credential-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.credential-row .label {
  font-size: 0.7rem;
  opacity: 0.7;
  text-transform: uppercase;
}

.value-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.value {
  flex: 1;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  word-break: break-all;
}

.icon-btn {
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.usage-stats {
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #4caf50;
}

.stat-label {
  font-size: 0.7rem;
  opacity: 0.7;
}

/* Action Panel */
.action-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

.action-btn.warning {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  color: white;
}

.action-btn.warning:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 152, 0, 0.3);
}

.action-btn.danger {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
}

.action-btn.danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(244, 67, 54, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Rotation Progress */
.rotation-progress {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  display: block;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Best Practices */
.best-practices {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.best-practices h5 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  font-weight: 600;
}

.best-practices ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.best-practices li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.best-practices li:last-child {
  border-bottom: none;
}

.tip-icon {
  font-size: 1.2rem;
}

.tip-text {
  font-size: 0.85rem;
  opacity: 0.9;
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
