<!--
  PrivacyComplianceDemo.vue
  隐私合规演示 - 展示如何实现隐私合规的埋点系统
-->
<template>
  <div class="privacy-compliance-demo">
    <div class="header">
      <div class="title">隐私合规最佳实践</div>
      <div class="subtitle">GDPR、PIPL 等法规要求下的埋点系统设计</div>
    </div>

    <div class="compliance-cards">
      <div class="compliance-card gdpr">
        <div class="card-header">
          <div class="card-icon">🇪🇺</div>
          <div class="card-title">GDPR</div>
          <div class="card-subtitle">欧盟数据保护法规</div>
        </div>
        <div class="card-body">
          <div class="requirement-list">
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>用户明确同意</span>
            </div>
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>数据可删除</span>
            </div>
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>数据可导出</span>
            </div>
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>数据处理透明化</span>
            </div>
          </div>
        </div>
      </div>

      <div class="compliance-card pipl">
        <div class="card-header">
          <div class="card-icon">🇨🇳</div>
          <div class="card-title">PIPL</div>
          <div class="card-subtitle">中国个人信息保护法</div>
        </div>
        <div class="card-body">
          <div class="requirement-list">
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>明确告知目的</span>
            </div>
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>最小必要原则</span>
            </div>
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>用户同意</span>
            </div>
            <div class="requirement-item">
              <span class="requirement-icon">✓</span>
              <span>数据本地化</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="implementation-steps">
      <div class="steps-title">实施步骤</div>
      <div class="steps-container">
        <div class="step-item" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-name">{{ step.name }}</div>
            <div class="step-desc">{{ step.desc }}</div>
            <div class="step-code" v-if="step.code">
              <pre><code>{{ step.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="consent-flow-demo">
      <div class="flow-title">隐私同意流程演示</div>
      <div class="consent-simulation">
        <div class="simulation-screen">
          <div v-if="!userConsented" class="consent-dialog">
            <div class="dialog-header">
              <div class="dialog-title">🔐 隐私设置</div>
              <div class="dialog-subtitle">我们需要您的同意来收集数据</div>
            </div>

            <div class="dialog-body">
              <div class="consent-item">
                <div class="consent-info">
                  <div class="consent-name">必要数据</div>
                  <div class="consent-desc">
                    应用程序运行所必需的数据（崩溃日志、性能指标）
                  </div>
                </div>
                <div class="consent-status required">必需</div>
              </div>

              <div class="consent-item">
                <div class="consent-info">
                  <div class="consent-name">行为分析</div>
                  <div class="consent-desc">
                    收集用户行为数据用于产品优化（页面浏览、按钮点击）
                  </div>
                </div>
                <label class="consent-toggle">
                  <input
                    type="checkbox"
                    v-model="consents.analytics"
                    :disabled="!userConsented"
                  />
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="consent-item">
                <div class="consent-info">
                  <div class="consent-name">个性化推荐</div>
                  <div class="consent-desc">基于您的兴趣提供个性化内容推荐</div>
                </div>
                <label class="consent-toggle">
                  <input
                    type="checkbox"
                    v-model="consents.personalization"
                    :disabled="!userConsented"
                  />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="dialog-footer">
              <button class="dialog-btn secondary" @click="rejectAll">
                拒绝全部
              </button>
              <button class="dialog-btn primary" @click="acceptSelected">
                接受选中
              </button>
            </div>
          </div>

          <div v-else class="consented-view">
            <div class="consented-icon">✅</div>
            <div class="consented-title">感谢您的同意</div>
            <div class="consented-desc">您已经同意收集以下类型的数据：</div>

            <div class="consented-list">
              <div class="consented-item" v-if="consents.analytics">
                <span class="item-icon">📊</span>
                <span>行为分析数据</span>
              </div>
              <div class="consented-item" v-if="consents.personalization">
                <span class="item-icon">🎯</span>
                <span>个性化推荐数据</span>
              </div>
              <div class="consented-item">
                <span class="item-icon">🔧</span>
                <span>必要运行数据</span>
              </div>
            </div>

            <div class="consented-actions">
              <button class="action-btn" @click="changeSettings">
                修改设置
              </button>
              <button class="action-btn danger" @click="deleteData">
                删除我的数据
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="data-protection">
      <div class="protection-title">🛡️ 数据保护措施</div>
      <div class="protection-grid">
        <div class="protection-item">
          <div class="protection-icon">🔒</div>
          <div class="protection-content">
            <div class="protection-name">数据加密</div>
            <div class="protection-desc">
              传输层 HTTPS 加密，存储层 AES-256 加密
            </div>
          </div>
        </div>

        <div class="protection-item">
          <div class="protection-icon">🎭</div>
          <div class="protection-content">
            <div class="protection-name">数据脱敏</div>
            <div class="protection-desc">
              手机号、邮箱等敏感信息自动脱敏处理
            </div>
          </div>
        </div>

        <div class="protection-item">
          <div class="protection-icon">⏰</div>
          <div class="protection-content">
            <div class="protection-name">数据保留期限</div>
            <div class="protection-desc">
              不同类型数据设置不同保留期限，自动清理过期数据
            </div>
          </div>
        </div>

        <div class="protection-item">
          <div class="protection-icon">👤</div>
          <div class="protection-content">
            <div class="protection-name">用户控制权</div>
            <div class="protection-desc">用户可查看、导出、删除自己的数据</div>
          </div>
        </div>
      </div>
    </div>

    <div class="checklist">
      <div class="checklist-title">✅ 合规检查清单</div>
      <div class="checklist-items">
        <div
          v-for="(item, index) in checklistItems"
          :key="index"
          class="checklist-item"
          :class="{ checked: item.checked }"
          @click="toggleCheck(index)"
        >
          <span class="checklist-icon">{{ item.checked ? '✅' : '⬜' }}</span>
          <span class="checklist-text">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userConsented = ref(false)
const consents = ref({
  analytics: false,
  personalization: false
})

const steps = [
  {
    name: '隐私弹窗获取同意',
    desc: '在首次启动时展示隐私弹窗，明确告知数据收集目的，获取用户明确同意',
    code: `if (!hasUserConsent()) {
  showPrivacyDialog({
    onAccept: () => {
      grantTrackingConsent()
      tracker.start()
    },
    onReject: () => {
      denyTrackingConsent()
      tracker.stop()
    }
  })
}`
  },
  {
    name: '数据脱敏处理',
    desc: '对敏感信息进行加密或脱敏处理，确保用户隐私安全',
    code: `track('user_register', {
  user_id: hash('user_123'),           // 用户 ID 加密
  phone: mask_phone('138****1234'),    // 手机号脱敏
  email: mask_email('u***@example.com') // 邮箱脱敏
})`
  },
  {
    name: '提供数据删除接口',
    desc: '响应用户的"被遗忘权"，提供数据删除功能',
    code: `function deleteUserData(userId) {
  // 1. 删除所有事件数据
  database.delete_all_events(userId)

  // 2. 删除用户画像
  database.delete_user_profile(userId)

  // 3. 确认删除完成
  sendDeletionConfirmation(userId)
}`
  },
  {
    name: '数据导出功能',
    desc: '允许用户导出自己的所有数据，满足数据可携带权',
    code: `function exportUserData(userId) {
  const userData = {
    events: database.get_all_events(userId),
    profile: database.get_user_profile(userId),
    preferences: database.get_user_preferences(userId)
  }

  // 生成 JSON 文件供用户下载
  return downloadJSON(userData, 'my-data.json')
}`
  }
]

const checklistItems = ref([
  { text: '展示隐私政策，明确告知数据收集目的', checked: true },
  { text: '提供清晰的同意/拒绝选项', checked: true },
  { text: '用户可随时撤回同意', checked: false },
  { text: '敏感数据加密存储', checked: true },
  { text: '提供数据删除功能', checked: false },
  { text: '提供数据导出功能', checked: false },
  { text: '设置数据保留期限', checked: true },
  { text: '定期进行隐私合规审计', checked: false }
])

const acceptSelected = () => {
  userConsented.value = true
}

const rejectAll = () => {
  consents.value.analytics = false
  consents.value.personalization = false
  userConsented.value = true
}

const changeSettings = () => {
  userConsented.value = false
}

const deleteData = () => {
  alert('数据删除请求已提交，我们将在 30 天内完成删除')
}

const toggleCheck = (index) => {
  checklistItems.value[index].checked = !checklistItems.value[index].checked
}
</script>

<style scoped>
.privacy-compliance-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.compliance-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.compliance-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid;
}

.compliance-card.gdpr {
  border-color: #003399;
}

.compliance-card.pipl {
  border-color: #de2910;
}

.card-header {
  text-align: center;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.card-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.requirement-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.requirement-icon {
  color: #22c55e;
  font-weight: 700;
}

.implementation-steps {
  margin-bottom: 2rem;
}

.steps-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  background: var(--vp-c-bg);
  padding: 1.25rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.step-number {
  width: 36px;
  height: 36px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.step-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.step-code {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 0.75rem;
  overflow-x: auto;
}

.step-code pre {
  margin: 0;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.6;
}

.consent-flow-demo {
  margin-bottom: 2rem;
}

.flow-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.consent-simulation {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.simulation-screen {
  max-width: 500px;
  margin: 0 auto;
}

.consent-dialog {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.dialog-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.dialog-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.dialog-body {
  margin-bottom: 1.5rem;
}

.consent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.consent-info {
  flex: 1;
}

.consent-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.consent-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.consent-status {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.consent-status.required {
  background: #22c55e;
}

.consent-toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.consent-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--vp-c-brand);
}

input:checked + .toggle-slider:before {
  transform: translateX(22px);
}

.dialog-footer {
  display: flex;
  gap: 1rem;
}

.dialog-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.dialog-btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.dialog-btn.primary:hover {
  background: #3b82f6;
}

.dialog-btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.consented-view {
  text-align: center;
}

.consented-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.consented-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.consented-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.consented-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.consented-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.item-icon {
  font-size: 1.5rem;
}

.consented-actions {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.action-btn {
  padding: 0.75rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
}

.action-btn.danger {
  color: #ef4444;
  border-color: #ef4444;
}

.action-btn.danger:hover {
  background: #ef4444;
  color: white;
}

.data-protection {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.protection-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.protection-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.protection-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.protection-icon {
  font-size: 2rem;
}

.protection-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.protection-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.checklist {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border: 2px solid #22c55e;
  border-radius: 12px;
  padding: 1.5rem;
}

.checklist-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.checklist-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.checklist-item:hover {
  transform: translateX(4px);
}

.checklist-item.checked {
  background: #dcfce7;
}

.checklist-icon {
  font-size: 1.2rem;
}

.checklist-text {
  font-size: 0.85rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .compliance-cards,
  .protection-grid,
  .checklist-items {
    grid-template-columns: 1fr;
  }
}
</style>
