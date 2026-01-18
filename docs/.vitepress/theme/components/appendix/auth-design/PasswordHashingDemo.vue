<!--
  PasswordHashingDemo.vue
  密码哈希演示
-->
<template>
  <div class="password-hashing-demo">
    <div class="header">
      <div class="title">密码哈希：为什么不能存明文？</div>
      <div class="subtitle">理解 bcrypt 和彩虹表攻击</div>
    </div>

    <div class="password-input">
      <label>输入密码</label>
      <input
        v-model="password"
        type="text"
        placeholder="输入密码..."
        @input="updateHash"
      />
      <button class="generate-btn" @click="updateHash">
        <span class="btn-icon">🔐</span>
        <span class="btn-text">生成哈希</span>
      </button>
    </div>

    <div class="comparison">
      <div class="comparison-card bad">
        <div class="card-header">
          <div class="card-icon">❌</div>
          <div class="card-title">错误做法</div>
        </div>

        <div class="method-selector">
          <button
            v-for="method in badMethods"
            :key="method.key"
            class="method-btn"
            :class="{ active: selectedBadMethod === method.key }"
            @click="selectedBadMethod = method.key"
          >
            {{ method.name }}
          </button>
        </div>

        <div class="hash-result">
          <div class="result-label">哈希结果</div>
          <div class="result-value">{{ badHashResult }}</div>
        </div>

        <div class="security-info">
          <div class="info-title">安全问题</div>
          <ul class="info-list">
            <li v-for="(issue, index) in badMethodIssues" :key="index">
              {{ issue }}
            </li>
          </ul>
        </div>
      </div>

      <div class="vs-divider">VS</div>

      <div class="comparison-card good">
        <div class="card-header">
          <div class="card-icon">✅</div>
          <div class="card-title">正确做法</div>
        </div>

        <div class="method-selector">
          <button class="method-btn active">bcrypt</button>
        </div>

        <div class="hash-result">
          <div class="result-label">bcrypt 哈希</div>
          <div class="result-value">{{ bcryptHashResult }}</div>
        </div>

        <div class="security-info">
          <div class="info-title">安全特性</div>
          <ul class="info-list">
            <li>🐌 慢哈希：故意设计得很慢，防暴力破解</li>
            <li>🎲 自适应：可调整 rounds，随硬件变强而增强</li>
            <li>🧂 自带加盐：每个密码都有随机盐，防彩虹表</li>
            <li>🔒 单向加密：无法反向解密</li>
          </ul>
        </div>

        <div class="rounds-control">
          <label>
            rounds (复杂度): <strong>{{ rounds }}</strong>
          </label>
          <input
            v-model="rounds"
            type="range"
            min="4"
            max="14"
            step="1"
            @input="updateHash"
          />
          <div class="rounds-info">当前耗时: {{ hashTime }} ms</div>
        </div>
      </div>
    </div>

    <div class="rainbow-table">
      <div class="section-title">彩虹表攻击演示</div>
      <div class="rainbow-content">
        <div class="rainbow-explanation">
          <div class="explanation-text">
            <p><strong>什么是彩虹表？</strong></p>
            <p>
              彩虹表是一个预先计算好的哈希值字典，包含常见密码及其哈希结果。攻击者可以通过查询彩虹表快速破解密码。
            </p>
            <p><strong>为什么需要盐？</strong></p>
            <p>
              盐（salt）是随机字符串，在每个密码哈希时加入。即使两个用户使用相同的密码，由于盐不同，哈希结果也不同。这使得彩虹表失效。
            </p>
          </div>
        </div>

        <div class="rainbow-demo">
          <div class="demo-title">彩虹表示例（MD5，无盐）</div>
          <div class="rainbow-table-container">
            <table>
              <thead>
                <tr>
                  <th>密码</th>
                  <th>MD5 哈希</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in rainbowTable" :key="index">
                  <td>{{ item.password }}</td>
                  <td class="hash">{{ item.hash }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="lookup-demo">
            <div class="lookup-title">哈希查询</div>
            <div class="lookup-input">
              <input
                v-model="lookupHash"
                type="text"
                placeholder="粘贴 MD5 哈希值..."
              />
              <button class="lookup-btn" @click="lookupPassword">查询</button>
            </div>
            <div class="lookup-result" v-if="lookupResult">
              <div class="result-text">
                {{ lookupResult }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <div class="practices-title">最佳实践</div>
      <div class="practices-list">
        <div class="practice-item">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <strong>使用 bcrypt、scrypt 或 Argon2</strong>
            <p>这些是专门为密码设计的哈希算法，具有抗暴力破解的特性。</p>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <strong>调整 rounds 参数</strong>
            <p>使哈希操作耗时在 100-500ms 之间，平衡安全性和用户体验。</p>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <strong>使用 HTTPS</strong>
            <p>防止密码在传输过程中被截获。</p>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">❌</div>
          <div class="practice-content">
            <strong>不要使用 MD5、SHA1、SHA256</strong>
            <p>这些是快速哈希算法，不适合密码存储，容易被暴力破解。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const password = ref('password123')
const selectedBadMethod = ref('md5')
const rounds = ref(10)
const lookupHash = ref('')
const lookupResult = ref('')
const hashTime = ref(0)

const badMethods = [
  { key: 'md5', name: 'MD5' },
  { key: 'sha1', name: 'SHA1' },
  { key: 'sha256', name: 'SHA256' }
]

const rainbowTable = [
  { password: '123456', hash: 'e10adc3949ba59abbe56e057f20f883e' },
  { password: 'password', hash: '5f4dcc3b5aa765d61d8327deb882cf99' },
  { password: 'admin', hash: '21232f297a57a5a743894a0e4a801fc3' },
  { password: '123456789', hash: '25f9e794323b453885f5181f1b624d0b' },
  { password: 'qwerty', hash: 'd8578edf8458ce06fbc5bb76a58c5ca4' }
]

const badHashResult = computed(() => {
  if (!password.value) return '等待输入...'

  const hash = simpleHash(password.value, selectedBadMethod.value)
  return hash
})

const badMethodIssues = computed(() => {
  const issues = {
    md5: [
      '⚡ 快速哈希：1秒可计算数十亿次',
      '🌈 彩虹表攻击：常见密码可秒破',
      '🔓 无盐：相同密码产生相同哈希'
    ],
    sha1: [
      '⚡ 快速哈希：比 MD5 慢一点，但仍然太快',
      '🌈 彩虹表攻击：同样 vulnerable',
      '🔓 无盐：相同密码产生相同哈希'
    ],
    sha256: [
      '⚡ 快速哈希：虽然比 SHA1 慢，但仍不够',
      '🌈 彩虹表攻击：GPU 可加速破解',
      '🔓 无盐：相同密码产生相同哈希'
    ]
  }
  return issues[selectedBadMethod.value] || []
})

const bcryptHashResult = computed(() => {
  if (!password.value) return '等待输入...'

  // 模拟 bcrypt 格式: $2a$rounds$salt+hash
  const salt = Math.random().toString(36).substring(2, 14)
  const hash = simpleHash(password.value + salt, 'sha256').substring(0, 31)

  return `$2a$${rounds.value}$${salt}${hash}`
})

const simpleHash = (str, algorithm) => {
  // 简化的哈希函数用于演示
  let hash = 0
  const str2 = algorithm + str

  for (let i = 0; i < str2.length; i++) {
    const char = str2.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }

  return Math.abs(hash).toString(16).padStart(32, '0').substring(0, 32)
}

const updateHash = () => {
  const startTime = performance.now()

  // 模拟 bcrypt 的延迟
  const delay = Math.pow(2, rounds.value - 4) * 10
  hashTime.value = Math.min(delay, 500)

  // 模拟哈希计算
  setTimeout(() => {
    const endTime = performance.now()
    hashTime.value = Math.round(endTime - startTime)
  }, 0)
}

const lookupPassword = () => {
  const hash = lookupHash.value.trim()

  if (!hash) {
    lookupResult.value = '请输入哈希值'
    return
  }

  const found = rainbowTable.find((item) => item.hash === hash)

  if (found) {
    lookupResult.value = `✅ 找到匹配：密码是 "${found.password}"`
  } else {
    lookupResult.value = '❌ 未在彩虹表中找到'
  }
}
</script>

<style scoped>
.password-hashing-demo {
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

.password-input {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.password-input label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.password-input input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  font-family: 'Courier New', monospace;
}

.generate-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.generate-btn:hover {
  background: #2563eb;
}

.comparison {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.comparison-card {
  flex: 1;
  min-width: 300px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid var(--vp-c-divider);
}

.comparison-card.bad {
  border-color: #ef4444;
}

.comparison-card.good {
  border-color: #22c55e;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 1.5rem;
}

.card-title {
  font-weight: 700;
  font-size: 1rem;
}

.method-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.method-btn {
  flex: 1;
  min-width: 80px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.method-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.hash-result {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.result-label {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.result-value {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  word-break: break-all;
  line-height: 1.5;
}

.security-info {
  margin-bottom: 1rem;
}

.info-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.info-list {
  margin: 0;
  padding-left: 1.25rem;
}

.info-list li {
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  line-height: 1.4;
}

.rounds-control {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.rounds-control label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.rounds-control input[type='range'] {
  width: 100%;
  margin-bottom: 0.5rem;
}

.rounds-info {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
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

.rainbow-table {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.section-title,
.practices-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.rainbow-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.rainbow-explanation {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.explanation-text {
  font-size: 0.85rem;
  line-height: 1.6;
}

.explanation-text p {
  margin-bottom: 0.75rem;
}

.explanation-text strong {
  color: var(--vp-c-brand);
}

.rainbow-demo {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.demo-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.rainbow-table-container {
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

thead th {
  padding: 0.5rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-divider);
}

tbody td {
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: 'Courier New', monospace;
}

.hash {
  color: var(--vp-c-text-2);
  word-break: break-all;
}

.lookup-demo {
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.lookup-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.lookup-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.lookup-input input {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
}

.lookup-btn {
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
}

.lookup-result {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
}

.result-text {
  font-weight: 600;
}

.best-practices {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.practices-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.practice-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.practice-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.practice-content {
  flex: 1;
}

.practice-content strong {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.practice-content p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .comparison {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }

  .rainbow-content {
    grid-template-columns: 1fr;
  }
}
</style>
