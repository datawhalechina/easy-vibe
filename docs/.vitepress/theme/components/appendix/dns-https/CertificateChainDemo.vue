<template>
  <div class="cert-chain-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      🔗 证书信任链可视化
    </h4>
    <p class="intro-text">
      点击每一层证书，查看它的详细信息和在信任链中的角色。
    </p>

    <div class="chain-container">
      <div
        v-for="(cert, idx) in certs"
        :key="idx"
        class="cert-node"
        :class="{ selected: selectedIdx === idx }"
        :style="{ '--level-color': cert.color }"
        @click="selectedIdx = idx"
      >
        <div class="cert-icon">{{ cert.icon }}</div>
        <div class="cert-title">{{ cert.title }}</div>
        <div class="cert-subtitle">{{ cert.subtitle }}</div>
        <div v-if="idx < certs.length - 1" class="chain-arrow">
          <span class="arrow-text">签发</span>
          <span class="arrow-symbol">↓</span>
        </div>
      </div>
    </div>

    <div v-if="selectedIdx >= 0" class="detail-panel">
      <div
        class="detail-header"
        :style="{ borderColor: certs[selectedIdx].color }"
      >
        <span class="detail-icon">{{ certs[selectedIdx].icon }}</span>
        <span class="detail-name">{{ certs[selectedIdx].title }}</span>
      </div>
      <div class="detail-body">
        <div class="detail-row" v-for="(item, i) in certs[selectedIdx].details" :key="i">
          <span class="detail-label">{{ item.label }}</span>
          <span class="detail-value">{{ item.value }}</span>
        </div>
      </div>
      <div class="detail-explain">
        {{ certs[selectedIdx].explain }}
      </div>
    </div>

    <div class="verify-box">
      <div class="verify-title">🔍 浏览器验证流程</div>
      <div class="verify-steps">
        <div v-for="(s, i) in verifySteps" :key="i" class="verify-step">
          <span class="verify-num">{{ i + 1 }}</span>
          <span class="verify-text">{{ s }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedIdx = ref(0)

const certs = [
  {
    icon: '🏛️',
    title: '根证书（Root CA）',
    subtitle: '信任的起点',
    color: '#c62828',
    explain:
      '根证书是整个信任链的锚点。它由根证书颁发机构自签名，预装在操作系统和浏览器中。全球只有少数几十个根 CA，它们的安全性由严格的审计和物理安全措施保障。根 CA 的私钥通常存储在离线的硬件安全模块（HSM）中。',
    details: [
      { label: '签发者', value: 'DigiCert Global Root G2（自签名）' },
      { label: '有效期', value: '25 年（2013 - 2038）' },
      { label: '密钥长度', value: 'RSA 2048 位' },
      { label: '存储位置', value: '操作系统 / 浏览器内置信任库' },
      { label: '数量级', value: '全球约 150 个受信根证书' }
    ]
  },
  {
    icon: '🏢',
    title: '中间证书（Intermediate CA）',
    subtitle: '信任的桥梁',
    color: '#e65100',
    explain:
      '中间证书由根 CA 签发，作为根证书和服务器证书之间的桥梁。这种分层设计的好处是：即使中间证书被泄露，也可以单独吊销它而不影响根证书。中间 CA 负责日常的证书签发工作，根 CA 的私钥因此可以保持离线状态。',
    details: [
      { label: '签发者', value: 'DigiCert Global Root G2' },
      { label: '持有者', value: 'DigiCert SHA2 Extended Validation Server CA' },
      { label: '有效期', value: '10 年' },
      { label: '用途', value: '签发终端实体（服务器）证书' },
      { label: '可吊销', value: '是（通过 CRL 或 OCSP）' }
    ]
  },
  {
    icon: '🌐',
    title: '服务器证书（Server Certificate）',
    subtitle: '网站的身份证',
    color: '#1565c0',
    explain:
      '服务器证书是网站向浏览器证明自己身份的凭证。它由中间 CA 签发，包含网站的域名、公钥和有效期等信息。当浏览器收到这张证书后，会沿着信任链向上验证，直到找到一个已经信任的根证书为止。',
    details: [
      { label: '签发者', value: 'DigiCert SHA2 Extended Validation Server CA' },
      { label: '持有者', value: 'www.example.com' },
      { label: '有效期', value: '1 年（行业标准）' },
      { label: '包含公钥', value: 'ECDSA P-256 公钥' },
      { label: '验证级别', value: 'EV（扩展验证）/ DV（域名验证）' }
    ]
  }
]

const verifySteps = [
  '浏览器收到服务器证书，读取其签发者信息',
  '找到中间证书，用中间 CA 的公钥验证服务器证书的签名',
  '再用根 CA 的公钥验证中间证书的签名',
  '确认根证书在本地信任库中 → 整条链验证通过'
]
</script>

<style scoped>
.cert-chain-demo {
  background: linear-gradient(135deg, #fce4ec 0%, #fff3e0 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.intro-text {
  font-size: 13px;
  color: #666;
  margin: 0 0 16px 0;
}

.chain-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 18px;
}

.cert-node {
  position: relative;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 14px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  width: 280px;
  max-width: 100%;
}

.cert-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cert-node.selected {
  border-color: var(--level-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: scale(1.03);
}

.cert-icon {
  font-size: 30px;
}

.cert-title {
  font-weight: 700;
  font-size: 14px;
  color: #1a1a2e;
  margin-top: 4px;
}

.cert-subtitle {
  font-size: 12px;
  color: #888;
}

.chain-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
  color: #999;
}

.arrow-text {
  font-size: 11px;
}

.arrow-symbol {
  font-size: 20px;
  line-height: 1;
}

.detail-panel {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 3px solid;
}

.detail-icon {
  font-size: 24px;
}

.detail-name {
  font-weight: 700;
  font-size: 16px;
  color: #1a1a2e;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.detail-row {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.detail-label {
  color: #888;
  min-width: 80px;
  flex-shrink: 0;
}

.detail-value {
  color: #333;
  font-weight: 500;
  word-break: break-all;
}

.detail-explain {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
  background: #f5f5f5;
  padding: 10px 14px;
  border-radius: 8px;
}

.verify-box {
  background: #e8f5e9;
  border-radius: 10px;
  padding: 14px 18px;
}

.verify-title {
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 10px;
  font-size: 14px;
}

.verify-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.verify-step {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #333;
}

.verify-num {
  background: #4caf50;
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.verify-text {
  line-height: 1.5;
  padding-top: 1px;
}
</style>
