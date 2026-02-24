<template>
  <div class="checklist-demo">
    <div class="header">
      <div class="title">项目安全检查清单</div>
      <div class="subtitle">勾选已完成的安全措施，查看项目安全评分</div>
    </div>

    <div class="score-bar">
      <div class="score-label">安全评分</div>
      <div class="score-track">
        <div
          class="score-fill"
          :style="{ width: score + '%', background: scoreColor }"
        />
      </div>
      <div class="score-value" :style="{ color: scoreColor }">
        {{ score }}分
      </div>
      <div class="score-level" :style="{ color: scoreColor }">
        {{ scoreLevel }}
      </div>
    </div>

    <div v-for="(cat, ci) in categories" :key="ci" class="category">
      <div class="cat-header" @click="cat.open = !cat.open">
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-progress">
          {{ checkedCount(ci) }}/{{ cat.items.length }}
        </span>
        <span class="cat-arrow">{{ cat.open ? '▾' : '▸' }}</span>
      </div>
      <div v-if="cat.open" class="cat-items">
        <div
          v-for="(item, ii) in cat.items"
          :key="ii"
          class="check-item"
        >
          <div class="item-row" @click="item.checked = !item.checked">
            <input type="checkbox" v-model="item.checked" @click.stop />
            <span :class="['item-text', { done: item.checked }]">
              {{ item.label }}
            </span>
          </div>
          <div
            class="item-detail"
            v-if="item.showDetail"
          >
            {{ item.detail }}
          </div>
          <button
            class="detail-toggle"
            @click="item.showDetail = !item.showDetail"
          >
            {{ item.showDetail ? '收起' : '查看最佳实践' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const categories = reactive([
  {
    icon: '🔍',
    name: '输入验证',
    open: true,
    items: [
      { label: '所有用户输入在服务端进行校验', checked: false, showDetail: false, detail: '永远不要仅依赖前端校验。攻击者可以绕过浏览器直接发送请求，服务端必须对长度、类型、格式、范围做二次验证。' },
      { label: '使用白名单而非黑名单过滤', checked: false, showDetail: false, detail: '黑名单容易遗漏。应明确定义"允许什么"而非"禁止什么"，例如只允许字母数字而非试图过滤所有特殊字符。' },
      { label: '对文件上传进行类型和大小限制', checked: false, showDetail: false, detail: '校验文件 MIME 类型和扩展名，限制文件大小，将上传文件存储在 Web 根目录之外，使用随机文件名。' }
    ]
  },
  {
    icon: '🔐',
    name: '认证授权',
    open: false,
    items: [
      { label: '密码使用 bcrypt/argon2 哈希存储', checked: false, showDetail: false, detail: '绝不明文存储密码。使用自带盐值的慢哈希算法（bcrypt cost>=10 或 argon2id），抵御彩虹表和暴力破解。' },
      { label: '实施多因素认证 (MFA)', checked: false, showDetail: false, detail: '在密码之外增加第二因素（TOTP、短信、硬件密钥），即使密码泄露也能阻止未授权登录。' },
      { label: '接口实施最小权限访问控制', checked: false, showDetail: false, detail: '每个 API 端点都应检查用户角色和权限，确保用户只能访问自己有权操作的资源（RBAC / ABAC）。' },
      { label: '会话管理安全（超时、轮换）', checked: false, showDetail: false, detail: '登录后重新生成 Session ID，设置合理的过期时间，登出时销毁服务端会话。' }
    ]
  },
  {
    icon: '🛡️',
    name: '数据保护',
    open: false,
    items: [
      { label: '敏感数据加密存储', checked: false, showDetail: false, detail: '对数据库中的敏感字段（手机号、身份证等）使用 AES-256 等算法加密，密钥与数据分离存储。' },
      { label: '日志中不记录敏感信息', checked: false, showDetail: false, detail: '日志中不应出现密码、Token、信用卡号等。使用脱敏处理，如只记录手机号后四位。' },
      { label: '实施 SQL 注入防护（参数化查询）', checked: false, showDetail: false, detail: '所有数据库操作使用参数化查询或 ORM，绝不拼接 SQL 字符串。' }
    ]
  },
  {
    icon: '🌐',
    name: '通信安全',
    open: false,
    items: [
      { label: '全站启用 HTTPS', checked: false, showDetail: false, detail: '使用 TLS 1.2+ 加密所有通信，配置 HSTS 头强制 HTTPS，防止中间人攻击和数据窃听。' },
      { label: '设置安全响应头（CSP、X-Frame-Options）', checked: false, showDetail: false, detail: '配置 Content-Security-Policy 限制资源加载来源，X-Frame-Options 防止点击劫持，X-Content-Type-Options 防止 MIME 嗅探。' },
      { label: 'Cookie 设置 HttpOnly / Secure / SameSite', checked: false, showDetail: false, detail: 'HttpOnly 防止 JS 读取，Secure 确保仅 HTTPS 传输，SameSite=Lax 防止 CSRF 攻击。' }
    ]
  }
])

const totalItems = computed(() =>
  categories.reduce((sum, c) => sum + c.items.length, 0)
)

const totalChecked = computed(() =>
  categories.reduce(
    (sum, c) => sum + c.items.filter((i) => i.checked).length,
    0
  )
)

const score = computed(() =>
  Math.round((totalChecked.value / totalItems.value) * 100)
)

const scoreColor = computed(() => {
  if (score.value >= 80) return '#27ae60'
  if (score.value >= 50) return '#f39c12'
  return '#e74c3c'
})

const scoreLevel = computed(() => {
  if (score.value >= 80) return '优秀'
  if (score.value >= 50) return '及格'
  return '危险'
})

const checkedCount = (ci) =>
  categories[ci].items.filter((i) => i.checked).length
</script>

<style scoped>
.checklist-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.header { margin-bottom: 1rem; }

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.score-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.score-label {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.score-track {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s, background 0.4s;
}

.score-value {
  font-weight: 800;
  font-size: 1.1rem;
  white-space: nowrap;
}

.score-level {
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
}

.category {
  margin-bottom: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  cursor: pointer;
  user-select: none;
}

.cat-icon { font-size: 1rem; }

.cat-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
  flex: 1;
}

.cat-progress {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.cat-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.cat-items {
  border-top: 1px solid var(--vp-c-divider);
}

.check-item {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.check-item:last-child {
  border-bottom: none;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.item-text {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.item-text.done {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.item-detail {
  margin-top: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.7;
}

.detail-toggle {
  margin-top: 0.3rem;
  background: none;
  border: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
}

@media (max-width: 720px) {
  .score-bar { flex-wrap: wrap; }
}
</style>
