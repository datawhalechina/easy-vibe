<template>
  <div class="iam-ram-comparison-demo">
    <div class="demo-header">
      <h4>AWS IAM vs 阿里云 RAM 对比</h4>
      <p class="intro-text">点击各个模块查看详细对比</p>
    </div>

    <div class="demo-content">
      <div class="comparison-container">
        <!-- AWS IAM Column -->
        <div class="platform-column aws-column">
          <div class="platform-header aws">
            <div class="logo">AWS</div>
            <h5>IAM</h5>
            <span class="subtitle">Identity and Access Management</span>
          </div>

          <div class="features-list">
            <div
              v-for="(feature, index) in awsFeatures"
              :key="index"
              class="feature-item"
              :class="{ active: selectedFeature === `aws-${index}` }"
              @click="selectFeature('aws', index)"
            >
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-content">
                <span class="feature-name">{{ feature.name }}</span>
                <span class="feature-desc">{{ feature.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Details -->
        <div class="comparison-details" v-if="selectedFeatureData">
          <div class="detail-card">
            <h6>{{ selectedFeatureData.name }}</h6>
            <div class="comparison-row">
              <div class="aws-detail">
                <span class="label">AWS IAM</span>
                <p>{{ selectedFeatureData.awsDetail }}</p>
                <code v-if="selectedFeatureData.awsExample">{{ selectedFeatureData.awsExample }}</code>
              </div>
              <div class="vs-divider">VS</div>
              <div class="ram-detail">
                <span class="label">阿里云 RAM</span>
                <p>{{ selectedFeatureData.ramDetail }}</p>
                <code v-if="selectedFeatureData.ramExample">{{ selectedFeatureData.ramExample }}</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Alibaba Cloud RAM Column -->
        <div class="platform-column ram-column">
          <div class="platform-header ram">
            <div class="logo">阿里云</div>
            <h5>RAM</h5>
            <span class="subtitle">Resource Access Management</span>
          </div>

          <div class="features-list">
            <div
              v-for="(feature, index) in ramFeatures"
              :key="index"
              class="feature-item"
              :class="{ active: selectedFeature === `ram-${index}` }"
              @click="selectFeature('ram', index)"
            >
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-content">
                <span class="feature-name">{{ feature.name }}</span>
                <span class="feature-desc">{{ feature.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>💡 提示：</strong>IAM 和 RAM 的核心概念基本一致，只是术语和实现细节略有不同。掌握一个平台后，可以快速迁移到另一个平台。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedFeature = ref(null)

const featureDetails = [
  {
    name: '用户管理',
    awsDetail: '使用 IAM User，支持编程访问和控制台访问，可分配独立 AK/SK',
    ramDetail: '使用 RAM 用户，功能与 IAM User 类似，支持子账号登录控制台',
    awsExample: 'arn:aws:iam::123456789012:user/alice',
    ramExample: 'acs:ram::123456789012:user/alice'
  },
  {
    name: '用户组管理',
    awsDetail: 'IAM Group 用于批量管理用户权限，一个用户可属于多个组',
    ramDetail: 'RAM 用户组功能类似，支持按部门或项目分组管理',
    awsExample: 'arn:aws:iam::123456789012:group/Developers',
    ramExample: 'acs:ram::123456789012:group/Developers'
  },
  {
    name: '角色与扮演',
    awsDetail: 'IAM Role 支持跨账号访问和服务角色，使用 STS AssumeRole',
    ramDetail: 'RAM 角色支持跨云账号访问和临时授权，使用 STS AssumeRole',
    awsExample: 'arn:aws:iam::123456789012:role/CrossAccountRole',
    ramExample: 'acs:ram::123456789012:role/CrossAccountRole'
  },
  {
    name: '权限策略',
    awsDetail: 'IAM Policy 使用 JSON 格式，支持 Action/Resource/Condition',
    ramDetail: 'RAM Policy 语法类似，支持阿里云服务特定的 Action',
    awsExample: '"Action": "s3:GetObject"',
    ramExample: '"Action": "oss:GetObject"'
  },
  {
    name: '身份联合',
    awsDetail: '支持 SAML 2.0 和 OIDC，可与 AD、Okta 等 IdP 集成',
    ramDetail: '支持 SAML 2.0 和企业 AD/LDAP，支持钉钉等国内 IdP',
    awsExample: 'SAML Provider: arn:aws:iam::123:saml-provider/Okta',
    ramExample: 'SAML Provider: acs:ram::123:saml-provider/DingTalk'
  },
  {
    name: '访问密钥',
    awsDetail: 'IAM User 可创建 AK/SK，支持定期轮换和访问分析',
    ramDetail: 'RAM 用户支持 AccessKey，提供密钥使用分析和安全建议',
    awsExample: 'AKIAIOSFODNN7EXAMPLE',
    ramExample: 'LTAI...'
  }
]

const awsFeatures = featureDetails.map((f, i) => ({
  icon: ['👤', '👥', '🎭', '📋', '🔗', '🔑'][i],
  name: f.name,
  desc: f.awsDetail.slice(0, 30) + '...'
}))

const ramFeatures = featureDetails.map((f, i) => ({
  icon: ['👤', '👥', '🎭', '📋', '🔗', '🔑'][i],
  name: f.name,
  desc: f.ramDetail.slice(0, 30) + '...'
}))

const selectedFeatureData = computed(() => {
  if (!selectedFeature.value) return null
  const [platform, index] = selectedFeature.value.split('-')
  return featureDetails[parseInt(index)]
})

function selectFeature(platform, index) {
  selectedFeature.value = `${platform}-${index}`
}
</script>

<style scoped>
.iam-ram-comparison-demo {
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

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 1rem;
  align-items: start;
}

.platform-column {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.platform-header {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
}

.platform-header.aws {
  background: var(--vp-c-brand-soft);
}

.platform-header.ram {
  background: rgba(var(--vp-c-brand-delta-rgb), 0.15);
}

.platform-header .logo {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.platform-header h5 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.platform-header .subtitle {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.features-list {
  padding: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feature-item:hover,
.feature-item.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.feature-icon {
  font-size: 1.2rem;
}

.feature-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.feature-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.feature-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.comparison-details {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.detail-card {
  text-align: center;
}

.detail-card h6 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-brand-1);
}

.comparison-row {
  display: flex;
  align-items: stretch;
  gap: 1rem;
}

.aws-detail,
.ram-detail {
  flex: 1;
  padding: 0.75rem;
  border-radius: 6px;
  text-align: left;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.aws-detail .label,
.ram-detail .label {
  display: block;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.375rem;
  color: var(--vp-c-text-1);
}

.aws-detail .label {
  color: var(--vp-c-brand-1);
}

.ram-detail .label {
  color: var(--vp-c-brand-delta);
}

.aws-detail p,
.ram-detail p {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.aws-detail code,
.ram-detail code {
  display: block;
  padding: 0.375rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.65rem;
  word-break: break-all;
  color: var(--vp-c-text-2);
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  padding: 0 0.5rem;
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

@media (max-width: 1024px) {
  .comparison-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .comparison-details {
    order: -1;
  }

  .comparison-row {
    flex-direction: column;
  }

  .vs-divider {
    padding: 0.5rem 0;
  }
}
</style>
