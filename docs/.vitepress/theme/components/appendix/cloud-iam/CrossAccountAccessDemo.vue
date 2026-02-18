<template>
  <div class="cross-account-access-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">跨账号访问</span>
      <span class="subtitle">AssumeRole 机制</span>
    </div>

    <div class="flow-diagram">
      <div class="account-box source">
        <div class="account-header">
          账号 A（源）
        </div>
        <div class="entity">
          IAM User
        </div>
        <div class="action">
          sts:AssumeRole
        </div>
      </div>
      <span class="arrow">→</span>
      <div class="account-box sts">
        <div class="account-header">
          STS 服务
        </div>
        <div class="step">
          验证身份
        </div>
        <div class="step">
          生成临时凭证
        </div>
      </div>
      <span class="arrow">→</span>
      <div class="account-box target">
        <div class="account-header">
          账号 B（目标）
        </div>
        <div class="entity">
          CrossAccountRole
        </div>
        <div class="resource">
          访问 S3/EC2
        </div>
      </div>
    </div>

    <div class="code-block">
      <div class="code-title">
        Python 示例
      </div>
      <pre><code>sts = boto3.client('sts')
assumed = sts.assume_role(
    RoleArn='arn:aws:iam::123456789012:role/CrossAccountRole',
    RoleSessionName='MySession'
)
# 使用临时凭证访问目标账号资源</code></pre>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>通过角色扮演实现跨账号访问，临时凭证自动过期，更安全更易管理。
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.cross-account-access-demo {
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

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.account-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  min-width: 120px;
}

.account-header {
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.entity {
  background: var(--vp-c-brand-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  margin-bottom: 0.25rem;
  color: var(--vp-c-brand-1);
  font-size: 0.7rem;
  font-weight: 500;
}

.action {
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
  font-style: italic;
}

.step {
  padding: 0.15rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.7rem;
}

.resource {
  background: var(--vp-c-brand-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  margin-top: 0.25rem;
  color: var(--vp-c-brand);
  font-size: 0.7rem;
}

.arrow {
  font-size: 1.25rem;
  color: var(--vp-c-text-3);
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  margin-bottom: 0.75rem;
}

.code-title {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-1);
}

.code-block pre {
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  line-height: 1.4;
}

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

@media (max-width: 640px) {
  .flow-diagram { flex-direction: column; }
  .arrow { transform: rotate(90deg); }
}
</style>
