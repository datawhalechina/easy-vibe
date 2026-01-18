<!--
  CSRFDefenseDemo.vue
  CSRF 防御演示
-->
<template>
  <div class="csrf-defense-demo">
    <div class="header">
      <div class="title">CSRF 攻击与防御</div>
      <div class="subtitle">Cross-Site Request Forgery 跨站请求伪造</div>
    </div>

    <div class="attack-demo">
      <div class="demo-title">CSRF 攻击演示</div>
      <div class="attack-scenario">
        <div class="scenario-box good-site">
          <div class="box-header">
            <span class="box-icon">🏦</span>
            <span class="box-title">银行网站 bank.com</span>
          </div>
          <div class="box-content">
            <div class="login-status" :class="{ logged: isLoggedIn }">
              {{ isLoggedIn ? '✅ 已登录' : '❌ 未登录' }}
            </div>
            <button
              v-if="isLoggedIn"
              class="action-btn transfer"
              @click="performTransfer"
            >
              💰 转账
            </button>
            <button v-else class="action-btn login" @click="isLoggedIn = true">
              🔑 登录银行
            </button>
            <div class="cookie-info" v-if="isLoggedIn">
              <div class="info-title">浏览器 Cookie</div>
              <div class="cookie-item">
                <span class="cookie-key">session_id:</span>
                <span class="cookie-value">bank_session_xyz</span>
              </div>
            </div>
          </div>
        </div>

        <div class="scenario-arrow">→ 用户同时访问</div>

        <div class="scenario-box evil-site">
          <div class="box-header">
            <span class="box-icon">😈</span>
            <span class="box-title">恶意网站 evil.com</span>
          </div>
          <div class="box-content">
            <div class="evil-content">
              <p>🎣 欢迎来到抽奖活动！</p>
              <button class="action-btn evil-btn" @click="triggerAttack">
                🎁 点击抽奖
              </button>
              <div class="evil-code" v-if="attackTriggered">
                <div class="code-title">恶意代码（隐藏）：</div>
                <pre class="code-block">
&lt;img src="https://bank.com/api/transfer?to=attacker&amount=10000" /&gt;</pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="attack-result" v-if="attackResult">
        <div class="result-box" :class="attackResult.type">
          <div class="result-icon">{{ attackResult.icon }}</div>
          <div class="result-text">{{ attackResult.text }}</div>
        </div>
      </div>
    </div>

    <div class="defense-mechanisms">
      <div class="mechanisms-title">防御措施</div>

      <div class="mechanism-tabs">
        <button
          v-for="mechanism in mechanisms"
          :key="mechanism.key"
          class="tab-btn"
          :class="{ active: selectedMechanism === mechanism.key }"
          @click="selectedMechanism = mechanism.key"
        >
          <span class="tab-icon">{{ mechanism.icon }}</span>
          <span class="tab-label">{{ mechanism.name }}</span>
        </button>
      </div>

      <div class="mechanism-content" v-if="currentMechanism">
        <div class="mechanism-header">
          <div class="header-title">{{ currentMechanism.title }}</div>
          <div class="header-subtitle">{{ currentMechanism.subtitle }}</div>
        </div>

        <div class="mechanism-demo">
          <div class="demo-flow">
            <div class="flow-steps">
              <div
                v-for="(step, index) in currentMechanism.steps"
                :key="index"
                class="flow-step"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">{{ step }}</div>
              </div>
            </div>
          </div>

          <div class="code-example" v-if="currentMechanism.code">
            <div class="code-title">代码示例</div>
            <pre class="code-block">{{ currentMechanism.code }}</pre>
          </div>
        </div>

        <div class="mechanism-pros-cons">
          <div class="pros">
            <div class="list-title">优点</div>
            <ul>
              <li v-for="(pro, index) in currentMechanism.pros" :key="index">
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="cons">
            <div class="list-title">注意事项</div>
            <ul>
              <li v-for="(con, index) in currentMechanism.cons" :key="index">
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">CSRF vs XSS 对比</div>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>CSRF</th>
            <th>XSS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>攻击方式</strong></td>
            <td>冒用用户身份发送请求</td>
            <td>在网页注入恶意脚本</td>
          </tr>
          <tr>
            <td><strong>攻击目标</strong></td>
            <td>trusted 网站</td>
            <td>网站的其他用户</td>
          </tr>
          <tr>
            <td><strong>利用点</strong></td>
            <td>浏览器自动带 Cookie</td>
            <td>网站未过滤用户输入</td>
          </tr>
          <tr>
            <td><strong>防御重点</strong></td>
            <td>验证请求来源</td>
            <td>输出转义、CSP</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isLoggedIn = ref(false)
const attackTriggered = ref(false)
const attackResult = ref(null)
const selectedMechanism = ref('csrf-token')

const mechanisms = [
  {
    key: 'csrf-token',
    icon: '🎫',
    name: 'CSRF Token',
    title: 'CSRF Token 验证',
    subtitle: '在每个请求中添加随机 Token，服务端验证',
    steps: [
      '用户访问页面时，服务端生成随机 CSRF Token',
      'Token 存储在 Session 中，并返回给前端',
      '前端在表单中加入隐藏字段：&lt;input type="hidden" name="csrf_token" value="..."&gt;',
      '提交表单时，服务端验证 Token 是否匹配',
      'Token 只能用一次，验证后立即失效'
    ],
    code: `// 后端生成 Token
app.get('/form', (req, res) => {
  const token = generateRandomToken()
  req.session.csrf_token = token
  res.render('form', { csrf_token: token })
})

// 验证 Token
app.post('/transfer', (req, res) => {
  if (req.body.csrf_token !== req.session.csrf_token) {
    return res.status(403).send('CSRF Token 无效')
  }
  // 执行转账
})`,
    pros: [
      '✅ 最有效的 CSRF 防御方法',
      '✅ Token 随机生成，攻击者无法预测',
      '✅ 每次请求验证，安全性高'
    ],
    cons: ['⚠️ 需要在每个表单中添加 Token', '⚠️ 增加开发和维护成本']
  },
  {
    key: 'samesite',
    icon: '🍪',
    name: 'SameSite Cookie',
    title: 'SameSite Cookie 属性',
    subtitle: '限制 Cookie 在跨站请求时发送',
    steps: [
      '设置 Cookie 的 SameSite 属性',
      'SameSite=Strict：只在同一站点请求时发送',
      'SameSite=Lax：允许安全的跨站请求（如链接跳转）',
      '浏览器自动阻止跨站请求携带 Cookie',
      '无需修改应用代码'
    ],
    code: `// 设置 SameSite Cookie
app.use(session({
  secret: 'your-secret',
  cookie: {
    sameSite: 'strict', // 或 'lax'
    secure: true,       // 只在 HTTPS 下传输
    httpOnly: true      // 防止 JavaScript 读取
  }
}))`,
    pros: [
      '✅ 简单易用，只需设置 Cookie 属性',
      '✅ 浏览器原生支持，无需修改应用逻辑',
      '✅ 与其他防御方法兼容'
    ],
    cons: ['⚠️ 老版本浏览器不支持', '⚠️ 可能影响某些合法的跨站请求']
  },
  {
    key: 'jwt',
    icon: '🎫',
    name: '使用 JWT',
    title: 'JWT 替代 Cookie',
    subtitle: '将 Token 存储在 localStorage，不使用 Cookie',
    steps: [
      '用户登录后，服务端生成 JWT',
      '前端将 JWT 存储在 localStorage',
      '每次请求在 Header 中携带：Authorization: Bearer &lt;token&gt;',
      'localStorage 的内容不会自动发送',
      '天然防 CSRF 攻击'
    ],
    code: `// 前端存储 JWT
localStorage.setItem('token', jwt_token)

// 发送请求时携带
fetch('/api/data', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})`,
    pros: [
      '✅ 天然防 CSRF，Cookie 不自动携带',
      '✅ 适合前后端分离和移动端',
      '✅ 易于实现'
    ],
    cons: [
      '⚠️ 容易受到 XSS 攻击',
      '⚠️ 需要额外防范 XSS（HttpOnly Cookie 无法用）'
    ]
  }
]

const currentMechanism = computed(() => {
  return mechanisms.find((m) => m.key === selectedMechanism.value)
})

const performTransfer = () => {
  if (!isLoggedIn.value) return
  alert('正常转账：转账成功')
}

const triggerAttack = () => {
  attackTriggered.value = true

  if (isLoggedIn.value) {
    attackResult.value = {
      type: 'danger',
      icon: '⚠️',
      text: 'CSRF 攻击成功！浏览器自动带上了银行的 Cookie，转账请求被发送。'
    }
  } else {
    attackResult.value = {
      type: 'warning',
      icon: '🛡️',
      text: '攻击失败：用户未登录银行网站。'
    }
  }
}
</script>

<style scoped>
.csrf-defense-demo {
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

.attack-demo {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.demo-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.attack-scenario {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: stretch;
  margin-bottom: 1rem;
}

.scenario-box {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 1rem;
  border: 2px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

.scenario-box.good-site {
  border-color: #3b82f6;
}

.scenario-box.evil-site {
  border-color: #ef4444;
}

.box-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.box-icon {
  font-size: 1.5rem;
}

.box-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.box-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.login-status {
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
  background: #fef3c7;
  color: #92400e;
}

.login-status.logged {
  background: #d1fae5;
  color: #065f46;
}

.action-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.action-btn.login {
  background: #3b82f6;
  color: white;
}

.action-btn.transfer {
  background: #22c55e;
  color: white;
}

.action-btn.evil-btn {
  background: #ef4444;
  color: white;
}

.cookie-info {
  background: white;
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.info-title {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.cookie-item {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  display: flex;
  gap: 0.5rem;
}

.cookie-key {
  color: #3b82f6;
  font-weight: 600;
}

.cookie-value {
  color: var(--vp-c-text-2);
  word-break: break-all;
}

.scenario-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.evil-content {
  text-align: center;
}

.evil-content p {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.evil-code {
  background: #1e293b;
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
  text-align: left;
}

.code-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.code-block {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #e2e8f0;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.attack-result {
  margin-top: 1rem;
}

.result-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
}

.result-box.danger {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #dc2626;
}

.result-box.warning {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid #f59e0b;
  color: #d97706;
}

.result-icon {
  font-size: 1.5rem;
}

.defense-mechanisms {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.mechanisms-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.mechanism-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.75rem 1rem;
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

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.tab-icon {
  font-size: 1.2rem;
}

.mechanism-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mechanism-header {
  margin-bottom: 1.5rem;
}

.header-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.header-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.mechanism-demo {
  margin-bottom: 1.5rem;
}

.demo-flow {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flow-step {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.step-number {
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
  font-size: 0.85rem;
  line-height: 1.5;
  padding-top: 0.25rem;
}

.code-example {
  background: #1e293b;
  border-radius: 8px;
  padding: 1rem;
}

.code-example .code-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 0.75rem;
}

.code-example .code-block {
  font-size: 0.8rem;
  line-height: 1.6;
}

.mechanism-pros-cons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.pros,
.cons {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.list-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.pros ul,
.cons ul {
  margin: 0;
  padding-left: 1.25rem;
}

.pros li,
.cons li {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.85rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

tbody td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

tbody tr:last-child td {
  border-bottom: none;
}

@media (max-width: 768px) {
  .attack-scenario {
    grid-template-columns: 1fr;
  }

  .scenario-arrow {
    writing-mode: horizontal-tb;
    transform: rotate(90deg);
  }

  .mechanism-tabs {
    flex-direction: column;
  }

  .mechanism-pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
