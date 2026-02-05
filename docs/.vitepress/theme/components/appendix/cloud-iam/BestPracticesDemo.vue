<template>
  <div class="best-practices-demo">
    <div class="demo-header">
      <h4>云账号权限管理最佳实践清单</h4>
      <p class="demo-desc">点击查看详细的实施指南和代码示例</p>
    </div>

    <div class="practices-grid">
      <div
        v-for="(practice, index) in bestPractices"
        :key="index"
        class="practice-card"
        :class="{ expanded: expandedCard === index }"
        @click="toggleCard(index)"
      >
        <div class="card-header">
          <div class="icon-wrapper" :style="{ background: practice.color }">
            <span class="icon">{{ practice.icon }}</span>
          </div>
          <div class="title-wrapper">
            <h5>{{ practice.title }}</h5>
            <span class="priority" :class="practice.priority">{{ practice.priorityText }}</span>
          </div>
          <div class="expand-icon">{{ expandedCard === index ? '−' : '+' }}</div>
        </div>

        <div class="card-body" v-if="expandedCard === index">
          <p class="description">{{ practice.description }}</p>

          <div class="checklist">
            <h6>✓ 检查清单</h6>
            <ul>
              <li v-for="(item, i) in practice.checklist" :key="i">{{ item }}</li>
            </ul>
          </div>

          <div class="code-example" v-if="practice.code">
            <h6>代码示例</h6>
            <pre><code>{{ practice.code }}</code></pre>
          </div>

          <div class="tools" v-if="practice.tools">
            <h6>推荐工具</h6>
            <div class="tool-tags">
              <span v-for="(tool, i) in practice.tools" :key="i" class="tool-tag">{{ tool }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedCard = ref(0)

const bestPractices = [
  {
    icon: '👑',
    title: '根账号保护',
    priority: 'p0',
    priorityText: 'P0 - 最高优先级',
    color: '#f44336',
    description: '根账号是云服务的所有者，拥有所有权限。必须实施最高级别的保护措施。',
    checklist: [
      '启用 MFA（推荐硬件 MFA 设备）',
      '创建 IAM 管理员用户用于日常操作',
      '删除或锁定根账号的访问密钥',
      '配置根账号使用告警',
      '设置账号恢复联系信息'
    ],
    code: `# AWS CLI - 创建管理员用户并禁用根账号 AK
aws iam create-user --user-name AdminUser
aws iam attach-user-policy --user-name AdminUser \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# 删除根账号访问密钥（必须使用根账号登录控制台操作）`,
    tools: ['硬件 MFA (YubiKey)', '虚拟 MFA (Google Authenticator)', 'AWS IAM', '阿里云 RAM']
  },
  {
    icon: '👤',
    title: '用户权限最小化',
    priority: 'p0',
    priorityText: 'P0 - 最高优先级',
    color: '#ff9800',
    description: '遵循最小权限原则，只授予用户完成工作所需的最低权限。',
    checklist: [
      '避免使用 AdministratorAccess 等全权限策略',
      '使用 IAM 用户组批量管理权限',
      '定期审查和删除未使用的 IAM 用户',
      '为不同角色创建细粒度的自定义策略',
      '使用 IAM Access Analyzer 识别过度宽松的权限'
    ],
    code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-northeast-1"
        }
      }
    }
  ]
}`,
    tools: ['IAM Policy Simulator', 'IAM Access Analyzer', 'AWS CloudTrail', 'AWS Config']
  },
  {
    icon: '🎭',
    title: '优先使用 IAM 角色',
    priority: 'p1',
    priorityText: 'P1 - 高优先级',
    color: '#4caf50',
    description: 'IAM 角色没有长期凭证，通过临时凭证访问，大大降低凭证泄露风险。',
    checklist: [
      'EC2 实例使用实例角色(Instance Profile)',
      'Lambda 函数使用执行角色',
      'ECS 任务使用任务角色',
      '跨账号访问使用角色扮演(AssumeRole)',
      'CI/CD 流水线使用 OIDC 联邦身份'
    ],
    code: `import boto3

# EC2 实例自动使用附加的实例角色
# 无需提供任何凭证
s3 = boto3.client('s3')

# 跨账号角色扮演
sts = boto3.client('sts')
assumed_role = sts.assume_role(
    RoleArn='arn:aws:iam::123456789012:role/CrossAccountRole',
    RoleSessionName='MyApplication',
    DurationSeconds=3600
)

# 使用临时凭证
temp_creds = assumed_role['Credentials']
s3_cross = boto3.client(
    's3',
    aws_access_key_id=temp_creds['AccessKeyId'],
    aws_secret_access_key=temp_creds['SecretAccessKey'],
    aws_session_token=temp_creds['SessionToken']
)`,
    tools: ['IAM Roles', 'AWS STS', 'EC2 Instance Profiles', 'Lambda Execution Roles']
  },
  {
    icon: '🔑',
    title: '访问密钥安全管理',
    priority: 'p1',
    priorityText: 'P1 - 高优先级',
    color: '#2196f3',
    description: '如果必须使用访问密钥(AK/SK)，需要实施严格的安全管理措施。',
    checklist: [
      '绝不将 AK/SK 硬编码在代码或配置文件中',
      '使用环境变量或密钥管理服务(如 AWS Secrets Manager)',
      '每 90 天轮换一次访问密钥',
      '定期审查和删除未使用的访问密钥',
      '启用 CloudTrail 记录所有 AK/SK 的使用情况'
    ],
    code: `# ❌ 错误做法 - 硬编码凭证
import boto3

s3 = boto3.client(
    's3',
    aws_access_key_id='AKIAIOSFODNN7EXAMPLE',
    aws_secret_access_key='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
)

# ✅ 正确做法 - 使用环境变量
import boto3
import os

s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
)

# ✅ 正确做法 - 使用 AWS Secrets Manager
import boto3
import json

secrets_client = boto3.client('secretsmanager')
secret_value = secrets_client.get_secret_value(SecretId='my-app/credentials')
credentials = json.loads(secret_value['SecretString'])

s3 = boto3.client(
    's3',
    aws_access_key_id=credentials['access_key_id'],
    aws_secret_access_key=credentials['secret_access_key']
)`,
    tools: ['AWS Secrets Manager', 'HashiCorp Vault', 'Azure Key Vault', 'GCP Secret Manager']
  },
  {
    icon: '📊',
    title: '监控与审计',
    priority: 'p2',
    priorityText: 'P2 - 中优先级',
    color: '#9c27b0',
    description: '建立全面的监控和审计机制，及时发现和响应安全事件。',
    checklist: [
      '启用 CloudTrail 记录所有 API 调用',
      '配置关键操作的实时告警（根账号使用、策略变更等）',
      '使用 IAM Access Analyzer 持续分析权限',
      '定期审查 IAM 用户和权限配置',
      '将日志存储到独立的审计账号，防止篡改'
    ],
    code: `# AWS CloudTrail 配置示例
aws cloudtrail create-trail \
  --name OrganizationTrail \
  --s3-bucket-name my-cloudtrail-bucket \
  --is-organization-trail \
  --enable-log-file-validation \
  --is-multi-region-trail

# CloudWatch 告警配置 - 根账号使用
aws cloudwatch put-metric-alarm \
  --alarm-name RootAccountUsageAlarm \
  --alarm-description "Alert when root account is used" \
  --metric-name RootAccountUsage \
  --namespace CloudTrailMetrics \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold

# IAM Access Analyzer 创建分析器
aws accessanalyzer create-analyzer \
  --analyzer-name MyOrgAnalyzer \
  --type ORGANIZATION`,
    tools: ['AWS CloudTrail', 'AWS CloudWatch', 'IAM Access Analyzer', 'AWS Config', 'AWS Security Hub']
  }
]

function toggleCard(index) {
  expandedCard.value = expandedCard.value === index ? null : index
}
</script>

<style scoped>
.best-practices-demo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
}

.demo-desc {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.practices-grid {
  display: grid;
  gap: 16px;
}

.practice-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.practice-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.practice-card.expanded {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.title-wrapper {
  flex: 1;
}

.title-wrapper h5 {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
}

.priority {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.priority.p0 {
  background: #f44336;
  color: white;
}

.priority.p1 {
  background: #ff9800;
  color: white;
}

.priority.p2 {
  background: #2196f3;
  color: white;
}

.expand-icon {
  font-size: 1.5rem;
  font-weight: 300;
  opacity: 0.7;
}

.card-body {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.description {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.checklist {
  margin-bottom: 20px;
}

.checklist h6 {
  margin: 0 0 12px 0;
  font-size: 0.9rem;
  color: #667eea;
}

.checklist ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.checklist li {
  padding: 6px 0;
  padding-left: 24px;
  position: relative;
  font-size: 0.9rem;
}

.checklist li:before {
  content: '☐';
  position: absolute;
  left: 0;
  color: #667eea;
}

.code-example {
  margin-bottom: 20px;
}

.code-example h6 {
  margin: 0 0 12px 0;
  font-size: 0.9rem;
  color: #667eea;
}

.code-example pre {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  margin: 0;
}

.code-example code {
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
}

.tools h6 {
  margin: 0 0 12px 0;
  font-size: 0.9rem;
  color: #667eea;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tool-tag {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1565c0;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .card-header {
    flex-wrap: wrap;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .title-wrapper h5 {
    font-size: 1rem;
  }
}
</style>
