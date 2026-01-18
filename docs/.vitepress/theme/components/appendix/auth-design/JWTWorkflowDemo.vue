<!--
  JWTWorkflowDemo.vue
  JWT 工作流程演示
-->
<template>
  <div class="jwt-workflow-demo">
    <div class="header">
      <div class="title">JWT 工作流程</div>
      <div class="subtitle">JSON Web Token 的生成与验证</div>
    </div>

    <div class="controls">
      <button
        class="action-btn"
        @click="generateToken"
        :disabled="isProcessing"
      >
        <span class="btn-icon">🔑</span>
        <span class="btn-text">生成 Token</span>
      </button>
      <button
        class="action-btn"
        @click="verifyToken"
        :disabled="!generatedToken || isProcessing"
      >
        <span class="btn-icon">✅</span>
        <span class="btn-text">验证 Token</span>
      </button>
      <button
        class="action-btn"
        @click="decodeToken"
        :disabled="!generatedToken || isProcessing"
      >
        <span class="btn-icon">🔓</span>
        <span class="btn-text">解析 Payload</span>
      </button>
      <button
        class="action-btn reset"
        @click="resetDemo"
        :disabled="isProcessing"
      >
        <span class="btn-icon">🔄</span>
        <span class="btn-text">重置</span>
      </button>
    </div>

    <div class="demo-area">
      <div class="user-info">
        <div class="info-title">用户信息</div>
        <div class="info-content">
          <div class="info-row">
            <span class="info-key">用户 ID:</span>
            <span class="info-value">123</span>
          </div>
          <div class="info-row">
            <span class="info-key">用户名:</span>
            <span class="info-value">alice</span>
          </div>
          <div class="info-row">
            <span class="info-key">角色:</span>
            <span class="info-value">admin</span>
          </div>
        </div>
      </div>

      <div class="token-display" v-if="generatedToken">
        <div class="token-title">生成的 JWT</div>
        <div class="token-parts">
          <div class="token-part header" @click="showPart = 'header'">
            <div class="part-label">Header</div>
            <div class="part-content">{{ tokenParts.header }}</div>
          </div>
          <div class="token-divider">.</div>
          <div class="token-part payload" @click="showPart = 'payload'">
            <div class="part-label">Payload</div>
            <div class="part-content">{{ tokenParts.payload }}</div>
          </div>
          <div class="token-divider">.</div>
          <div class="token-part signature" @click="showPart = 'signature'">
            <div class="part-label">Signature</div>
            <div class="part-content">{{ tokenParts.signature }}</div>
          </div>
        </div>

        <div class="token-full" v-if="showFull">
          <div class="full-title">完整 Token</div>
          <div class="full-content">{{ generatedToken }}</div>
        </div>

        <button class="toggle-btn" @click="showFull = !showFull">
          {{ showFull ? '隐藏' : '显示' }}完整 Token
        </button>
      </div>

      <div class="part-detail" v-if="showPart && partDetail">
        <div class="detail-title">
          {{
            showPart === 'header'
              ? 'Header'
              : showPart === 'payload'
                ? 'Payload'
                : 'Signature'
          }}
          详情
        </div>
        <div class="detail-content">
          <pre class="detail-json">{{ partDetail }}</pre>
        </div>
      </div>

      <div class="result-box" v-if="result" :class="result.type">
        <div class="result-icon">{{ result.icon }}</div>
        <div class="result-text">{{ result.text }}</div>
      </div>
    </div>

    <div class="jwt-structure">
      <div class="structure-title">JWT 结构</div>
      <div class="structure-diagram">
        <div class="diagram-part">
          <div class="part-name">Header</div>
          <div class="part-desc">算法信息</div>
          <div class="part-example">{"alg": "HS256", "typ": "JWT"}</div>
        </div>
        <div class="diagram-plus">+</div>
        <div class="diagram-part">
          <div class="part-name">Payload</div>
          <div class="part-desc">用户信息</div>
          <div class="part-example">{"user_id": 123, "role": "admin"}</div>
        </div>
        <div class="diagram-plus">+</div>
        <div class="diagram-part">
          <div class="part-name">Signature</div>
          <div class="part-desc">签名（防篡改）</div>
          <div class="part-example">
            HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload),
            secret)
          </div>
        </div>
      </div>
    </div>

    <div class="info-cards">
      <div class="info-card pros">
        <div class="card-icon">✅</div>
        <div class="card-title">优点</div>
        <ul class="card-list">
          <li>无状态，服务端不存储</li>
          <li>易于横向扩展</li>
          <li>跨域友好</li>
          <li>移动端友好</li>
        </ul>
      </div>

      <div class="info-card cons">
        <div class="card-icon">⚠️</div>
        <div class="card-title">缺点</div>
        <ul class="card-list">
          <li>无法主动注销</li>
          <li>Payload 可见，不能存敏感信息</li>
          <li>Token 过大，每次请求都要带上</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isProcessing = ref(false)
const generatedToken = ref('')
const showFull = ref(false)
const showPart = ref(null)
const result = ref(null)

const tokenParts = ref({
  header: '',
  payload: '',
  signature: ''
})

const partDetail = computed(() => {
  if (showPart.value === 'header') {
    return JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2)
  } else if (showPart.value === 'payload') {
    return JSON.stringify(
      {
        user_id: 123,
        username: 'alice',
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      },
      null,
      2
    )
  } else if (showPart.value === 'signature') {
    return 'HMACSHA256(\n  base64UrlEncode(header) + "." + base64UrlEncode(payload),\n  your-secret-key\n)'
  }
  return null
})

const generateToken = async () => {
  isProcessing.value = true
  result.value = null

  // 模拟生成 JWT
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      user_id: 123,
      username: 'alice',
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    })
  )
  const signature = btoa(`${header}.${payload}.your-secret-key`)

  tokenParts.value = {
    header: header.substring(0, 20) + '...',
    payload: payload.substring(0, 20) + '...',
    signature: signature.substring(0, 20) + '...'
  }

  generatedToken.value = `${header}.${payload}.${signature}`

  await delay(800)

  result.value = {
    type: 'success',
    icon: '✅',
    text: 'Token 生成成功！有效期 1 小时'
  }

  isProcessing.value = false
}

const verifyToken = async () => {
  isProcessing.value = true

  await delay(800)

  // 模拟验证
  const isValid = Math.random() > 0.2

  result.value = {
    type: isValid ? 'success' : 'error',
    icon: isValid ? '✅' : '❌',
    text: isValid ? 'Token 验证通过！签名有效' : 'Token 验证失败：签名无效'
  }

  isProcessing.value = false
}

const decodeToken = async () => {
  isProcessing.value = true

  await delay(600)

  showPart.value = 'payload'

  result.value = {
    type: 'info',
    icon: '🔓',
    text: 'Payload 已解析（Base64 可解码，不要存敏感信息！）'
  }

  isProcessing.value = false
}

const resetDemo = () => {
  generatedToken.value = ''
  tokenParts.value = { header: '', payload: '', signature: '' }
  showFull.value = false
  showPart.value = null
  result.value = null
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.jwt-workflow-demo {
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

.controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn:hover:not(:disabled) {
  background: #2563eb;
}

.action-btn.reset {
  background: #64748b;
}

.action-btn.reset:hover:not(:disabled) {
  background: #475569;
}

.btn-icon {
  font-size: 1.2rem;
}

.demo-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.user-info {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.info-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.info-key {
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 80px;
}

.info-value {
  color: var(--vp-c-text-1);
  font-family: 'Courier New', monospace;
}

.token-display {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.token-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.token-parts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.token-part {
  flex: 1;
  min-width: 100px;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s ease;
}

.token-part:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.token-part.header {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.token-part.payload {
  background: rgba(168, 85, 247, 0.1);
  border-color: #a855f7;
}

.token-part.signature {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}

.part-label {
  font-weight: 700;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.part-content {
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  word-break: break-all;
}

.token-divider {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.token-full {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #1e293b;
  border-radius: 6px;
}

.full-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.full-content {
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: #e2e8f0;
  word-break: break-all;
  line-height: 1.5;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.part-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.detail-content {
  background: #1e293b;
  border-radius: 8px;
  padding: 1rem;
}

.detail-json {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #e2e8f0;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.result-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
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

.result-box.info {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid #3b82f6;
  color: #2563eb;
}

.result-icon {
  font-size: 1.5rem;
}

.jwt-structure {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.structure-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.structure-diagram {
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.diagram-part {
  flex: 1;
  min-width: 180px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.part-name {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.part-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.part-example {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  word-break: break-all;
}

.diagram-plus {
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.info-card {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.card-list {
  margin: 0;
  padding-left: 1.25rem;
}

.card-list li {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.info-card.pros .card-list li {
  color: #16a34a;
}

.info-card.cons .card-list li {
  color: #dc2626;
}

@media (max-width: 768px) {
  .structure-diagram {
    flex-direction: column;
  }

  .diagram-plus {
    transform: rotate(90deg);
  }

  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>
