<template>
  <div class="deployment-https-demo">
    <div class="demo-header">
      <span class="icon">🔒</span>
      <span class="title">HTTPS 安全传输</span>
      <span class="subtitle">给数据传输加把锁</span>
    </div>

    <div class="intro-text">
      <strong>HTTP</strong> 就像寄明信片，邮递员能看见内容。<strong>HTTPS</strong> 就像寄保险箱，只有收件人能打开。
    </div>

    <div class="demo-content">
      <div class="comparison">
        <div class="compare-card http">
          <div class="card-header">
            <span class="lock-icon">🔓</span>
            <span class="card-title">HTTP（不安全）</span>
          </div>
          <div class="card-body">
            <div class="data-flow">
              <div class="sender">👤 用户</div>
              <div class="envelope open">
                <div class="content-visible">密码: 123456</div>
              </div>
              <div class="thief">😈 黑客</div>
              <div class="receiver">🌐 服务器</div>
            </div>
            <div class="warning-text">⚠️ 数据"裸奔"，黑客能看见密码</div>
          </div>
        </div>

        <div class="compare-card https">
          <div class="card-header">
            <span class="lock-icon">🔒</span>
            <span class="card-title">HTTPS（安全）</span>
          </div>
          <div class="card-body">
            <div class="data-flow">
              <div class="sender">👤 用户</div>
              <div class="envelope locked">
                <div class="content-hidden">??加密??</div>
              </div>
              <div class="thief-confused">😕 黑客看不懂</div>
              <div class="receiver">🌐 服务器</div>
            </div>
            <div class="success-text">✅ 数据加密，黑客看不懂</div>
          </div>
        </div>
      </div>

      <div class="certificate-box">
        <div class="cert-title">📜 SSL/TLS 证书的作用</div>
        <div class="cert-features">
          <div class="cert-feature">
            <span class="feature-icon">🔐</span>
            <span class="feature-text">加密传输数据</span>
          </div>
          <div class="cert-feature">
            <span class="feature-icon">✅</span>
            <span class="feature-text">验证网站身份</span>
          </div>
          <div class="cert-feature">
            <span class="feature-icon">🛡️</span>
            <span class="feature-text">防止数据篡改</span>
          </div>
        </div>
      </div>

      <div class="setup-steps">
        <div class="steps-title">🚀 快速上手（Let's Encrypt 免费）</div>
        <div class="step-list">
          <div class="step-item">
            <span class="step-num">1</span>
            <span class="step-text">安装 Certbot 工具</span>
          </div>
          <div class="step-item">
            <span class="step-num">2</span>
            <span class="step-text">运行命令申请证书</span>
          </div>
          <div class="step-item">
            <span class="step-num">3</span>
            <span class="step-text">自动配置 Nginx</span>
          </div>
          <div class="step-item">
            <span class="step-num">4</span>
            <span class="step-text">完成！网站显示🔒小锁</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>推荐工具：</strong>Let's Encrypt 免费证书 + Certbot 自动工具，几分钟就能搞定 HTTPS！
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.deployment-https-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 1rem;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.compare-card {
  border-radius: 8px;
  overflow: hidden;
}

.compare-card.http {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.compare-card.https {
  background: linear-gradient(135deg, #51cf66 0%, #69db7c 100%);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  color: white;
}

.lock-icon {
  font-size: 1.5rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.card-body {
  background: white;
  padding: 0.75rem;
}

.data-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.sender,
.receiver {
  font-size: 1.25rem;
}

.envelope {
  flex: 1;
  padding: 0.5rem;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
  font-size: 0.75rem;
  font-family: monospace;
}

.envelope.open {
  background: #fff3cd;
}

.envelope.locked {
  background: #d4edda;
}

.thief {
  font-size: 1.25rem;
}

.thief-confused {
  font-size: 1.25rem;
  opacity: 0.5;
}

.warning-text {
  color: #dc3545;
  font-size: 0.75rem;
  text-align: center;
  font-weight: 500;
}

.success-text {
  color: #28a745;
  font-size: 0.75rem;
  text-align: center;
  font-weight: 500;
}

.certificate-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.cert-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.cert-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cert-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.feature-icon {
  font-size: 1rem;
}

.setup-steps {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
}

.steps-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .comparison {
    grid-template-columns: 1fr;
  }

  .data-flow {
    flex-wrap: wrap;
  }
}
</style>
