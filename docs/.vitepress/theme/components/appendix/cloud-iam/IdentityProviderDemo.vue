<template>
  <div class="identity-provider-demo">
    <div class="demo-header">
      <h4>身份提供商(IdP)集成流程</h4>
      <p class="intro-text">点击步骤查看 SSO 单点登录流程</p>
    </div>

    <div class="demo-content">
      <div class="sso-flow">
        <div class="flow-step" v-for="(step, index) in steps" :key="index"
             :class="{ active: currentStep === index, completed: currentStep > index }"
             @click="goToStep(index)">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <span class="step-title">{{ step.title }}</span>
            <span class="step-desc">{{ step.desc }}</span>
          </div>
          <div class="step-arrow" v-if="index < steps.length - 1">→</div>
        </div>
      </div>

      <div class="detail-panel" v-if="currentStepData">
        <h5>{{ currentStepData.title }}</h5>
        <p>{{ currentStepData.detail }}</p>

        <div class="code-block" v-if="currentStepData.code">
          <pre><code>{{ currentStepData.code }}</code></pre>
        </div>

        <div class="entity-flow" v-if="currentStepData.flow">
          <div class="flow-row" v-for="(row, i) in currentStepData.flow" :key="i">
            <span class="entity" :class="row.from.type">{{ row.from.name }}</span>
            <span class="action">{{ row.action }}</span>
            <span class="entity" :class="row.to.type">{{ row.to.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>💡 SSO 优势：</strong>通过企业 IdP 统一管理用户身份，避免在每个云平台单独创建账号，提高安全性和管理效率。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)

const steps = [
  { title: '用户访问应用', desc: '用户尝试访问企业应用' },
  { title: '重定向到 IdP', desc: '应用将用户重定向到身份提供商' },
  { title: '用户登录认证', desc: '用户在 IdP 输入企业账号密码' },
  { title: '颁发 SAML 令牌', desc: 'IdP 验证成功后颁发 SAML Assertion' },
  { title: '返回应用', desc: '携带令牌返回企业应用' },
  { title: '换取云凭证', desc: '应用使用令牌换取云临时凭证' },
  { title: '访问云资源', desc: '使用临时凭证访问云资源' }
]

const stepDetails = [
  {
    title: '用户访问企业应用',
    detail: '用户打开浏览器，访问企业内部的业务系统（如 CRM、ERP 等）。此时用户尚未登录，应用检测到用户没有有效的会话。',
    flow: [
      { from: { name: '用户', type: 'user' }, action: '访问 →', to: { name: '企业应用', type: 'app' } }
    ]
  },
  {
    title: '应用重定向到 IdP',
    detail: '应用发现用户未登录，生成 SAML Request，将用户浏览器重定向到企业的身份提供商（IdP，如 Azure AD、Okta 等）。',
    code: `// SAML Request 示例
<samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
                    Destination="https://idp.example.com/saml/sso"
                    ID="_1234567890"
                    IssueInstant="2024-01-15T10:00:00Z">
  <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">
    https://app.example.com
  </saml:Issuer>
</samlp:AuthnRequest>`,
    flow: [
      { from: { name: '企业应用', type: 'app' }, action: '重定向 →', to: { name: 'IdP', type: 'idp' } }
    ]
  },
  {
    title: '用户在 IdP 登录',
    detail: '用户在 IdP 的登录页面输入企业账号和密码。IdP 验证用户身份，可能还需要进行 MFA 多因素认证。',
    flow: [
      { from: { name: '用户', type: 'user' }, action: '登录 →', to: { name: 'IdP', type: 'idp' } }
    ]
  },
  {
    title: 'IdP 颁发 SAML Assertion',
    detail: '用户认证成功后，IdP 生成包含用户身份和属性的 SAML Assertion（断言），并使用 IdP 的私钥签名。',
    code: `<!-- SAML Response 示例 -->
<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
                ID="_response123"
                InResponseTo="_1234567890"
                IssueInstant="2024-01-15T10:01:00Z">
  <saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
                  ID="_assertion456"
                  IssueInstant="2024-01-15T10:01:00Z">
    <saml:Subject>
      <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
        user@example.com
      </saml:NameID>
    </saml:Subject>
    <saml:AttributeStatement>
      <saml:Attribute Name="Role">
        <saml:AttributeValue>Admin</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
</samlp:Response>`,
    flow: [
      { from: { name: 'IdP', type: 'idp' }, action: '颁发令牌 →', to: { name: '用户浏览器', type: 'user' } }
    ]
  },
  {
    title: '返回企业应用',
    detail: 'IdP 通过浏览器将 SAML Response POST 到企业应用。应用验证 SAML 断言的签名，确认用户身份，建立用户会话。',
    flow: [
      { from: { name: '用户浏览器', type: 'user' }, action: 'POST 令牌 →', to: { name: '企业应用', type: 'app' } }
    ]
  },
  {
    title: '换取云临时凭证',
    detail: '企业应用使用 SAML Assertion 向云厂商的 STS 服务请求临时安全凭证。云服务验证 SAML 断言后，颁发临时 AK/SK/Token。',
    code: `# Python 示例：使用 SAML 换取 AWS 临时凭证
import boto3

# 创建 STS 客户端
sts = boto3.client('sts')

# 使用 SAML 断言请求临时凭证
response = sts.assume_role_with_saml(
    RoleArn='arn:aws:iam::123456789012:role/SAML-Role',
    PrincipalArn='arn:aws:iam::123456789012:saml-provider/Okta',
    SAMLAssertion='VGhpcyBpcyBhIHRlc3QgU0FNTCBhc3NlcnRpb24=',
    DurationSeconds=3600
)

# 获取临时凭证
credentials = response['Credentials']
print(f"Access Key: {credentials['AccessKeyId']}")
print(f"Secret Key: {credentials['SecretAccessKey']}")
print(f"Session Token: {credentials['SessionToken']}")`,
    flow: [
      { from: { name: '企业应用', type: 'app' }, action: 'AssumeRole →', to: { name: '云 STS', type: 'cloud' } }
    ]
  },
  {
    title: '访问云资源',
    detail: '企业应用使用获取到的临时凭证，调用云服务的 API 访问资源（如 S3、EC2、数据库等）。临时凭证有过期时间，到期后需要重新获取。',
    flow: [
      { from: { name: '企业应用', type: 'app' }, action: '访问资源 →', to: { name: '云服务', type: 'cloud' } }
    ]
  }
]

const currentStepData = computed(() => {
  if (currentStep.value === null) return null
  return stepDetails[currentStep.value]
})

function goToStep(index) {
  currentStep.value = index
}
</script>

<style scoped>
.identity-provider-demo {
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

.sso-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.flow-step:hover,
.flow-step.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  transform: scale(1.02);
}

.flow-step.completed {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  border-color: var(--vp-c-brand);
}

.step-number {
  width: 24px;
  height: 24px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.flow-step.active .step-number {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.step-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.step-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.step-desc {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.step-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-text-3);
}

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.detail-panel h5 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.detail-panel p {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.code-block {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  line-height: 1.4;
  font-family: var(--vp-font-family-mono);
}

.entity-flow {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.entity {
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.entity.user {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.entity.app {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.15);
  color: var(--vp-c-brand-delta);
}

.entity.idp {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
}

.entity.cloud {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
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
  .sso-flow {
    flex-direction: column;
    align-items: stretch;
  }

  .flow-step {
    min-width: auto;
  }

  .step-arrow {
    display: none;
  }

  .flow-row {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
