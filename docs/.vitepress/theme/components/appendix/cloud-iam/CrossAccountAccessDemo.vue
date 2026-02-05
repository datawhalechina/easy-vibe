<template>
  <div class="cross-account-access-demo">
    <div class="demo-header">
      <h4>跨账号访问流程演示</h4>
      <p class="demo-desc">角色扮演（AssumeRole）获取临时凭证</p>
    </div>

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
</template>

<style scoped>
.cross-account-access-demo {
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

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.account-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  min-width: 180px;
  color: #333;
}

.account-header {
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #eee;
}

.account-content {
  font-size: 0.8rem;
}

.entity {
  background: #e3f2fd;
  padding: 6px 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  color: #1565c0;
  font-weight: 500;
}

.action {
  color: #666;
  font-style: italic;
}

.step {
  padding: 4px 0;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
}

.step:last-child {
  border-bottom: none;
}

.resource {
  background: #e8f5e9;
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 8px;
  color: #2e7d32;
}

.arrow {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
}

.code-example {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
}

.code-example h5 {
  margin: 0 0 12px 0;
  color: #fff;
  font-size: 0.9rem;
}

.code-example pre {
  margin: 0;
  overflow-x: auto;
}

.code-example code {
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
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
