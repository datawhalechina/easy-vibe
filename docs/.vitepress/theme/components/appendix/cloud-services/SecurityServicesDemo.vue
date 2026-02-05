<template>
  <div class="security-services-demo">
    <div class="demo-header">
      <h4>安全服务架构配置器</h4>
      <p class="demo-desc">选择您的业务场景，一键生成安全防护方案</p>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">选择业务场景</div>
      <div class="scenario-cards">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-btn"
          :class="{ active: selectedScenario === scenario.id }"
          @click="selectScenario(scenario.id)"
        >
          <span class="scenario-icon">{{ scenario.icon }}</span>
          <span class="scenario-name">{{ scenario.name }}</span>
        </button>
      </div>
    </div>

    <div v-if="selectedScenarioData" class="security-architecture">
      <div class="architecture-header">
        <span class="header-icon">🏗️</span>
        <span class="header-title">推荐安全架构</span>
      </div>

      <div class="architecture-layers">
        <div class="layer edge-layer">
          <div class="layer-title">
            <span class="layer-icon">🌐</span>
            边缘防护层
          </div>
          <div class="layer-services">
            <div class="service-card">
              <div class="service-header aws">
                <span class="service-name">{{ selectedScenarioData.edge.aws }}</span>
              </div>
              <div class="service-features">
                <div v-for="(feat, idx) in selectedScenarioData.edge.awsFeatures" :key="idx" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
            <div class="vs-mini">VS</div>
            <div class="service-card">
              <div class="service-header aliyun">
                <span class="service-name">{{ selectedScenarioData.edge.aliyun }}</span>
              </div>
              <div class="service-features">
                <div v-for="(feat, idx) in selectedScenarioData.edge.aliyunFeatures" :key="idx" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="layer application-layer">
          <div class="layer-title">
            <span class="layer-icon">🔐</span>
            应用安全层
          </div>
          <div class="layer-services">
            <div class="service-card">
              <div class="service-header aws">
                <span class="service-name">{{ selectedScenarioData.app.aws }}</span>
              </div>
              <div class="service-features">
                <div v-for="(feat, idx) in selectedScenarioData.app.awsFeatures" :key="idx" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
            <div class="vs-mini">VS</div>
            <div class="service-card">
              <div class="service-header aliyun">
                <span class="service-name">{{ selectedScenarioData.app.aliyun }}</span>
              </div>
              <div class="service-features">
                <div v-for="(feat, idx) in selectedScenarioData.app.aliyunFeatures" :key="idx" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="layer data-layer">
          <div class="layer-title">
            <span class="layer-icon">🗝️</span>
            数据安全层
          </div>
          <div class="layer-services">
            <div class="service-card">
              <div class="service-header aws">
                <span class="service-name">{{ selectedScenarioData.data.aws }}</span>
              </div>
              <div class="service-features">
                <div v-for="(feat, idx) in selectedScenarioData.data.awsFeatures" :key="idx" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
            <div class="vs-mini">VS</div>
            <div class="service-card">
              <div class="service-header aliyun">
                <span class="service-name">{{ selectedScenarioData.data.aliyun }}</span>
              </div>
              <div class="service-features">
                <div v-for="(feat, idx) in selectedScenarioData.data.aliyunFeatures" :key="idx" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="security-recommendations">
        <div class="rec-title">💡 安全建议</div>
        <div class="rec-list">
          <div v-for="(rec, idx) in selectedScenarioData.recommendations" :key="idx" class="rec-item">
            <span class="rec-num">{{ idx + 1 }}</span>
            <span class="rec-text">{{ rec }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedScenario = ref('web')

const scenarios = [
  { id: 'web', name: 'Web 应用', icon: '🌐' },
  { id: 'api', name: 'API 服务', icon: '🔌' },
  { id: 'mobile', name: '移动应用', icon: '📱' },
  { id: 'enterprise', name: '企业系统', icon: '🏢' }
]

const scenarioData = {
  web: {
    edge: {
      aws: 'CloudFront + WAF',
      aliyun: 'CDN + WAF',
      awsFeatures: ['全球 400+ 边缘节点', 'DDoS 防护和 Bot 管理', '自动 SSL/TLS 加密'],
      aliyunFeatures: ['国内 2800+ 节点', 'CC 攻击防护和防爬虫', 'HTTPS 证书一键部署']
    },
    app: {
      aws: 'AWS WAF + Shield',
      aliyun: 'Web 应用防火墙',
      awsFeatures: ['SQL 注入和 XSS 防护', '速率限制和 IP 黑名单', '托管规则和自定义规则'],
      aliyunFeatures: ['OWASP Top 10 防护', '敏感数据防泄漏', '智能 CC 防护策略']
    },
    data: {
      aws: 'KMS + Secrets Manager',
      aliyun: 'KMS + 凭据管家',
      awsFeatures: ['AES-256 加密算法', '自动密钥轮换', '与 AWS 服务原生集成'],
      aliyunFeatures: ['国密算法支持', '密钥版本管理', 'RAM 细粒度权限控制']
    },
    recommendations: [
      '启用 HTTPS 强制跳转，配置 HSTS 头部',
      '设置 WAF 规则防御 SQL 注入、XSS 等常见攻击',
      '启用 CDN 缓存静态资源，减少源站压力',
      '配置敏感数据加密存储，使用 KMS 管理密钥'
    ]
  },
  api: {
    edge: {
      aws: 'API Gateway + WAF',
      aliyun: 'API 网关 + WAF',
      awsFeatures: ['API 版本管理和流量控制', '缓存和节流策略', '请求/响应转换'],
      aliyunFeatures: ['API 发布和生命周期管理', '流量控制和访问频次限制', '参数校验和Mock 数据']
    },
    app: {
      aws: 'Cognito + IAM',
      aliyun: '应用身份服务 + RAM',
      awsFeatures: ['OAuth 2.0 和 OpenID Connect', '用户池和身份池', 'MFA 多因素认证'],
      aliyunFeatures: ['OIDC 和 SAML 协议支持', '企业 AD/LDAP 集成', '实人认证和设备指纹']
    },
    data: {
      aws: 'KMS + Parameter Store',
      aliyun: 'KMS + 应用配置管理',
      awsFeatures: ['API 密钥加密存储', '配置参数版本管理', '与 CloudFormation 集成'],
      aliyunFeatures: ['敏感配置加密', '配置灰度发布', '配置变更审计']
    },
    recommendations: [
      '实施 API 认证鉴权，使用 OAuth 2.0 或 API Key',
      '配置 API 网关的速率限制，防止暴力破解',
      '对敏感 API 实施 IP 白名单限制',
      '加密存储 API 密钥和敏感配置'
    ]
  },
  mobile: {
    edge: {
      aws: 'CloudFront + WAF',
      aliyun: 'CDN + WAF',
      awsFeatures: ['移动网络优化', 'HTTP/2 和 QUIC 支持', '智能压缩和图像优化'],
      aliyunFeatures: ['移动加速方案', '弱网环境优化', '自适应码率调整']
    },
    app: {
      aws: 'Cognito + Device Farm',
      aliyun: '应用身份服务 + 移动测试',
      awsFeatures: ['设备指纹识别', '设备风险评估', '越狱/Root 检测'],
      aliyunFeatures: ['设备可信认证', '作弊设备识别', '安全键盘输入']
    },
    data: {
      aws: 'KMS + S3',
      aliyun: 'KMS + OSS',
      awsFeatures: ['移动端数据加密', '本地缓存加密', '密钥安全存储'],
      aliyunFeatures: ['国密 SM4 支持', '本地数据库加密', '密钥白盒保护']
    },
    recommendations: [
      '实施设备绑定和设备指纹识别',
      '检测越狱/Root 设备并限制访问',
      '本地敏感数据加密存储',
      '使用 HTTPS 证书绑定防止中间人攻击'
    ]
  },
  enterprise: {
    edge: {
      aws: 'CloudFront + WAF + Shield Advanced',
      aliyun: 'CDN + WAF + DDoS 高防',
      awsFeatures: ['DDoS 攻击自动缓解', '24/7 DRT 团队支持', '成本保护保障'],
      aliyunFeatures: ['T 级 DDoS 防护能力', 'CC 攻击智能清洗', '专家应急响应']
    },
    app: {
      aws: 'IAM + SSO + Directory Service',
      aliyun: 'RAM + IDaaS + 云 SSO',
      awsFeatures: ['与企业 AD 集成', '单点登录 SSO', '临时凭证和权限边界'],
      aliyunFeatures: ['LDAP/AD 目录同步', 'SaaS 应用集成', '细粒度权限管控']
    },
    data: {
      aws: 'KMS + CloudHSM + Macie',
      aliyun: 'KMS + 加密服务 + 敏感数据保护',
      awsFeatures: ['FIPS 140-2 Level 3 HSM', '自动敏感数据发现', '密钥分级管理'],
      aliyunFeatures: ['国密局认证 HSM', '敏感数据自动识别', '合规审计报告']
    },
    recommendations: [
      '部署 DDoS 高防和 WAF 多层防护',
      '实施统一身份管理和 SSO 单点登录',
      '启用数据加密和敏感数据保护',
      '建立安全审计和合规监控体系'
    ]
  }
}

const selectScenario = (id) => {
  selectedScenario.value = id
}

const currentScenario = computed(() => scenarioData[selectedScenario.value])
</script>

<style scoped>
.network-services-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #7b2cbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.scenario-selector {
  margin-bottom: 20px;
}

.selector-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.scenario-cards {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.scenario-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e6f1ff;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.scenario-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.scenario-btn.active {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  border-color: transparent;
  color: #fff;
}

.scenario-icon {
  font-size: 1rem;
}

.security-architecture {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.architecture-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-icon {
  font-size: 1.25rem;
}

.header-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
}

.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layer {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 16px;
}

.layer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.layer-icon {
  font-size: 1.25rem;
}

.layer-services {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: start;
}

.service-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.service-header {
  padding: 10px 12px;
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.service-header.aws {
  background: rgba(255, 153, 0, 0.2);
  color: #ff9900;
}

.service-header.aliyun {
  background: rgba(255, 106, 0, 0.2);
  color: #ff6a00;
}

.service-features {
  padding: 12px;
}

.feature {
  font-size: 0.8125rem;
  color: #e6f1ff;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feature:last-child {
  border-bottom: none;
}

.vs-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 700;
  align-self: center;
}

.security-recommendations {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.rec-title {
  font-weight: 600;
  font-size: 1rem;
  color: #00d4ff;
  margin-bottom: 12px;
}

.rec-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rec-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  padding: 10px 12px;
  border-radius: 8px;
  border-left: 3px solid #00d4ff;
}

.rec-num {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.rec-text {
  font-size: 0.875rem;
  color: #e6f1ff;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .scenario-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .layer-services {
    grid-template-columns: 1fr;
  }

  .vs-mini {
    display: none;
  }

  .config-content {
    grid-template-columns: 1fr;
  }
}
</style>
