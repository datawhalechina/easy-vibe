<template>
  <div class="cross-account-access-demo">
    <div class="demo-header">
      <h4>跨账号访问流程演示</h4>
      <p class="intro-text">角色扮演（AssumeRole）获取临时凭证</p>
    </div>

    <div class="demo-content">
      <div class="flow-diagram">
        <div class="account-box source">
          <div class="account-header">账号 A（源账号）</div>
          <div class="account-content">
            <div class="entity">IAM User / Application</div>
            <div class="action">调用 sts:AssumeRole</div>
          </div>
        </div>

        <div class="arrow">→</div>

        <div class="account-box sts">
          <div class="account-header">STS 服务</div>
          <div class="account-content">
            <div class="step">1. 验证源身份</div>
            <div class="step">2. 检查信任策略</div>
            <div class="step">3. 生成临时凭证</div>
          </div>
        </div>

        <div class="arrow">→</div>

        <div class="account-box target">
          <div class="account-header">账号 B（目标账号）</div>
          <div class="account-content">
            <div class="entity">CrossAccountRole</div>
            <div class="resource">访问 S3 / EC2 等资源</div>
          </div>
        </div>
      </div>

      <div class="code-example">
        <h5>Python 代码示例</h5>
        <pre><code>import boto3

# 在账号 A 中使用 IAM 用户凭证
sts_client = boto3.client('sts')

# 扮演账号 B 的角色
assumed_role = sts_client.assume_role(
    RoleArn='arn:aws:iam::123456789012:role/CrossAccountRole',
    RoleSessionName='MySession',
    DurationSeconds=3600
)

# 获取临时凭证
credentials = assumed_role['Credentials']

# 使用临时凭证访问账号 B 的资源
s3_client = boto3.client(
    's3',
    aws_access_key_id=credentials['AccessKeyId'],
    aws_secret_access_key=credentials['SecretAccessKey'],
    aws_session_token=credentials['SessionToken']
)</code></pre>
      </div>
    </div>

    <div class="info-box">
      <strong>💡 跨账号访问优势：</strong>通过角色扮演实现跨账号访问，无需在每个账号创建 IAM 用户，临时凭证自动过期，更安全更易管理。
    </div>
  </div>
</template>

<script setup>
// No script needed for this static demo
</script>

<style scoped>
.cross-account-access-demo {
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

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.account-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  min-width: 180px;
}

.account-header {
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.account-content {
  font-size: 0.8rem;
}

.entity {
  background: var(--vp-c-brand-soft);
  padding: 0.375rem 0.625rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.action {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.step {
  padding: 0.25rem 0;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.step:last-child {
  border-bottom: none;
}

.resource {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  padding: 0.375rem 0.625rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  color: var(--vp-c-brand);
}

.arrow {
  font-size: 2rem;
  color: var(--vp-c-text-3);
}

.code-example {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
}

.code-example h5 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 700;
}

.code-example pre {
  margin: 0;
  overflow-x: auto;
}

.code-example code {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.5;
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
  .flow-diagram {
    flex-direction: column;
  }

  .arrow {
    transform: rotate(90deg);
  }

  .account-box {
    min-width: auto;
    width: 100%;
  }
}
</style>
