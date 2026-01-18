<!--
  AuthEvolutionDemo.vue
  鉴权方案演进史演示
-->
<template>
  <div class="auth-evolution-demo">
    <div class="header">
      <div class="title">鉴权方案演进史</div>
      <div class="subtitle">从 HTTP Basic 到现代 JWT 的技术演进</div>
    </div>

    <div class="timeline">
      <div
        v-for="(era, index) in eras"
        :key="era.key"
        class="era-item"
        :class="{ active: selectedEra === era.key }"
        @click="selectEra(era.key)"
      >
        <div class="era-marker">{{ index + 1 }}</div>
        <div class="era-content">
          <div class="era-title">{{ era.title }}</div>
          <div class="era-year">{{ era.year }}</div>
        </div>
      </div>
    </div>

    <div class="era-details" v-if="currentEra">
      <div class="era-header">
        <h3>{{ currentEra.title }}</h3>
        <span class="era-badge">{{ currentEra.year }}</span>
      </div>

      <div class="era-description">
        {{ currentEra.description }}
      </div>

      <div class="era-flow" v-if="currentEra.flow">
        <div class="flow-title">工作流程</div>
        <div class="flow-steps">
          <div
            v-for="(step, idx) in currentEra.flow"
            :key="idx"
            class="flow-step"
          >
            <div class="step-number">{{ idx + 1 }}</div>
            <div class="step-content">{{ step }}</div>
            <div v-if="idx < currentEra.flow.length - 1" class="step-arrow">
              →
            </div>
          </div>
        </div>
      </div>

      <div class="era-pros-cons">
        <div class="pros">
          <div class="list-title">优点</div>
          <ul>
            <li v-for="(pro, idx) in currentEra.pros" :key="idx">{{ pro }}</li>
          </ul>
        </div>
        <div class="cons">
          <div class="list-title">缺点</div>
          <ul>
            <li v-for="(con, idx) in currentEra.cons" :key="idx">{{ con }}</li>
          </ul>
        </div>
      </div>

      <div class="era-usecase">
        <div class="usecase-title">适用场景</div>
        <div class="usecase-content">{{ currentEra.usecase }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEra = ref('basic')

const eras = [
  {
    key: 'basic',
    title: 'HTTP Basic Authentication',
    year: '1990s',
    description:
      '最古老的鉴权方案，直接把用户名密码经过 Base64 编码后放在 HTTP 头中。虽然简单，但因为安全性问题已不推荐使用。',
    flow: [
      '客户端发送用户名密码',
      '服务器验证身份',
      '返回受保护资源',
      '每次请求都携带密码'
    ],
    pros: ['实现简单，所有浏览器都支持', '标准化协议', '无需额外存储'],
    cons: [
      'Base64 可解码，相当于明文传输',
      '每次请求都要传密码，容易被截获',
      '无法主动注销（除非关闭浏览器）',
      '无法防止 CSRF 攻击'
    ],
    usecase: '只适合内部测试工具，绝不用于生产环境'
  },
  {
    key: 'session',
    title: 'Session + Cookie',
    year: '2000s',
    description:
      'Web 开发的经典方案。服务器验证用户身份后创建 Session，返回 Session ID 给客户端，客户端每次请求自动带上 Cookie。',
    flow: [
      '用户登录提交用户名密码',
      '服务器验证并创建 Session',
      '返回 Set-Cookie: session_id',
      '后续请求自动带上 Cookie'
    ],
    pros: [
      '简单直观，易于理解',
      '服务端可以主动注销（删除 Session）',
      'Session 信息存储在服务端，相对安全'
    ],
    cons: [
      '服务器有状态，需要存储 Session',
      '多台服务器需要共享 Session（如 Redis）',
      '跨域困难，Cookie 默认不能跨域',
      '容易受到 CSRF 攻击'
    ],
    usecase: '适合传统 Web 应用（服务器端渲染），不适合移动端和现代 SPA'
  },
  {
    key: 'jwt',
    title: 'JWT (JSON Web Token)',
    year: '2010s',
    description:
      '现代 Web 的主流方案。不在服务端存储状态，把用户信息加密成 Token，放在客户端。JWT 由 Header、Payload、Signature 三部分组成。',
    flow: [
      '用户登录验证身份',
      '服务器生成 JWT Token',
      '客户端存储 Token（localStorage）',
      '后续请求在 Header 中携带 Token'
    ],
    pros: [
      '无状态，服务端不存储 Session',
      '易于横向扩展',
      '跨域友好，不受 Cookie 限制',
      '移动端友好，原生 App 也能轻松使用',
      'Payload 可以存储用户信息、权限等'
    ],
    cons: [
      '无法主动注销，Token 一旦签发在过期前一直有效',
      'Payload 可见（Base64 编码），不能存敏感信息',
      'Token 过大，每次请求都要带上',
      '需要额外的黑名单机制实现注销'
    ],
    usecase: '现代 Web 和移动端的标准方案，特别适合分布式系统和微服务架构'
  }
]

const currentEra = computed(() => eras.find((e) => e.key === selectedEra.value))

const selectEra = (key) => {
  selectedEra.value = key
}
</script>

<style scoped>
.auth-evolution-demo {
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

.timeline {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.era-item {
  flex: 1;
  min-width: 180px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.era-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.era-item.active {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.1);
}

.era-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.era-content {
  flex: 1;
  min-width: 0;
}

.era-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.era-year {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.era-details {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.era-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.era-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.era-badge {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.era-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.era-flow {
  margin-bottom: 1.25rem;
}

.flow-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  background: var(--vp-c-bg-soft);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  border: 1px solid var(--vp-c-divider);
}

.step-arrow {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.era-pros-cons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.pros,
.cons {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.list-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.pros ul {
  margin: 0;
  padding-left: 1.25rem;
}

.pros li {
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  color: #16a34a;
}

.cons ul {
  margin: 0;
  padding-left: 1.25rem;
}

.cons li {
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  color: #ef4444;
}

.era-usecase {
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid var(--vp-c-brand);
  padding: 0.75rem 1rem;
  border-radius: 6px;
}

.usecase-title {
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
}

.usecase-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .timeline {
    flex-direction: column;
  }

  .era-item {
    min-width: auto;
  }

  .era-pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
