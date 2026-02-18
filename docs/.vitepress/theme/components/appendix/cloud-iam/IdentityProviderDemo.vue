<template>
  <div class="identity-provider-demo">
    <div class="demo-header">
      <span class="icon">🔐</span>
      <span class="title">身份提供商集成</span>
      <span class="subtitle">企业 SSO 单点登录流程</span>
    </div>

    <div class="flow-steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{ active: currentStep === index }"
        @click="currentStep = index"
      >
        <span class="step-num">{{ index + 1 }}</span>
        <span class="step-title">{{ step.title }}</span>
      </div>
    </div>

    <div class="detail-panel">
      <div class="detail-title">
        {{ currentStepData.title }}
      </div>
      <p class="detail-desc">
        {{ currentStepData.detail }}
      </p>
      <div
        v-if="currentStepData.flow"
        class="flow-row"
      >
        <span class="entity user">{{ currentStepData.flow[0].from.name }}</span>
        <span class="action">{{ currentStepData.flow[0].action }}</span>
        <span class="entity cloud">{{ currentStepData.flow[0].to.name }}</span>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>通过企业 IdP 统一管理用户身份，避免在每个云平台单独创建账号。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)

const steps = [
  { title: '访问应用' },
  { title: '重定向 IdP' },
  { title: '用户登录' },
  { title: '颁发令牌' },
  { title: '返回应用' },
  { title: '换取凭证' },
  { title: '访问资源' }
]

const stepDetails = [
  { title: '用户访问企业应用', detail: '用户打开浏览器访问企业业务系统，应用检测到用户没有有效会话。', flow: [{ from: { name: '用户' }, action: '访问 →', to: { name: '企业应用' } }] },
  { title: '应用重定向到 IdP', detail: '应用生成 SAML Request，将用户重定向到企业身份提供商。', flow: [{ from: { name: '应用' }, action: '重定向 →', to: { name: 'IdP' } }] },
  { title: '用户在 IdP 登录', detail: '用户在 IdP 登录页面输入企业账号密码，可能需要 MFA 认证。', flow: [{ from: { name: '用户' }, action: '登录 →', to: { name: 'IdP' } }] },
  { title: 'IdP 颁发 SAML 令牌', detail: '用户认证成功后，IdP 生成包含用户身份的 SAML Assertion。', flow: [{ from: { name: 'IdP' }, action: '颁发 →', to: { name: '令牌' } }] },
  { title: '返回企业应用', detail: 'IdP 通过浏览器将 SAML Response POST 到企业应用。', flow: [{ from: { name: '浏览器' }, action: 'POST →', to: { name: '应用' } }] },
  { title: '换取云临时凭证', detail: '应用使用 SAML 向云 STS 服务请求临时安全凭证。', flow: [{ from: { name: '应用' }, action: 'AssumeRole →', to: { name: '云 STS' } }] },
  { title: '访问云资源', detail: '应用使用临时凭证调用云服务 API 访问资源。', flow: [{ from: { name: '应用' }, action: '访问 →', to: { name: '云服务' } }] }
]

const currentStepData = computed(() => stepDetails[currentStep.value])
</script>

<style scoped>
.identity-provider-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.step:hover { border-color: var(--vp-c-brand); }
.step.active { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand); }

.step-num {
  width: 18px;
  height: 18px;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}

.step.active .step-num { background: var(--vp-c-brand); color: #fff; }

.step-title { font-size: 0.75rem; font-weight: 500; color: var(--vp-c-text-1); }

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.4rem;
}

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.flow-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.entity {
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 500;
}

.entity.user { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.entity.cloud { background: rgba(239, 68, 68, 0.1); color: #dc2626; }

.action { font-size: 0.7rem; color: var(--vp-c-text-3); }

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
