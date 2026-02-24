<template>
  <div class="dns-record-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      📋 DNS 记录类型速查
    </h4>
    <div class="tab-row">
      <button
        v-for="rec in records"
        :key="rec.type"
        class="tab-btn"
        :class="{ active: selected === rec.type }"
        @click="selected = rec.type"
      >
        {{ rec.type }}
      </button>
    </div>

    <div v-if="current" class="detail-card">
      <div class="detail-header">
        <span class="type-badge">{{ current.type }}</span>
        <span class="type-name">{{ current.name }}</span>
      </div>
      <p class="type-desc">{{ current.desc }}</p>

      <div class="example-block">
        <div class="example-title">示例记录</div>
        <code class="example-code">{{ current.example }}</code>
      </div>

      <div class="usage-block">
        <div class="usage-title">常见用途</div>
        <ul class="usage-list">
          <li v-for="(u, i) in current.usages" :key="i">{{ u }}</li>
        </ul>
      </div>
    </div>

    <div class="info-box">
      <strong>小贴士：</strong>
      DNS 不只是把域名翻译成 IP，它还承载了邮件路由、域名验证、负载均衡等多种功能，全靠不同的记录类型来实现。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref('A')

const records = [
  {
    type: 'A',
    name: 'Address 记录',
    desc: '将域名映射到一个 IPv4 地址。这是最常见的 DNS 记录类型，浏览器访问网站时最终需要的就是这条记录。',
    example: 'example.com.  IN  A  93.184.216.34',
    usages: [
      '网站域名指向服务器 IP',
      '子域名指向不同的服务器',
      '配合负载均衡返回多个 IP'
    ]
  },
  {
    type: 'AAAA',
    name: 'IPv6 Address 记录',
    desc: '将域名映射到一个 IPv6 地址。随着 IPv4 地址耗尽，AAAA 记录变得越来越重要。',
    example: 'example.com.  IN  AAAA  2606:2800:220:1:248:1893:25c8:1946',
    usages: [
      '支持 IPv6 网络的设备访问',
      '双栈部署（同时配置 A 和 AAAA）',
      '面向未来的网络架构'
    ]
  },
  {
    type: 'CNAME',
    name: 'Canonical Name 记录',
    desc: '将一个域名指向另一个域名（别名）。浏览器会继续解析目标域名，直到找到 A 记录。',
    example: 'www.example.com.  IN  CNAME  example.com.',
    usages: [
      'www 子域名指向主域名',
      'CDN 加速（指向 CDN 提供商域名）',
      '多个域名指向同一服务'
    ]
  },
  {
    type: 'MX',
    name: 'Mail Exchange 记录',
    desc: '指定负责接收该域名邮件的邮件服务器地址和优先级。数字越小优先级越高。',
    example: 'example.com.  IN  MX  10 mail.example.com.',
    usages: [
      '配置企业邮箱（如 Gmail、Outlook）',
      '设置邮件服务器优先级',
      '邮件备份和容灾'
    ]
  },
  {
    type: 'TXT',
    name: 'Text 记录',
    desc: '存储任意文本信息。常用于域名所有权验证、邮件安全策略（SPF/DKIM/DMARC）等场景。',
    example: 'example.com.  IN  TXT  "v=spf1 include:_spf.google.com ~all"',
    usages: [
      'SPF 记录防止邮件伪造',
      'SSL 证书申请时的域名验证',
      '第三方服务的域名所有权确认'
    ]
  },
  {
    type: 'NS',
    name: 'Name Server 记录',
    desc: '指定该域名由哪些 DNS 服务器负责解析。这是 DNS 委派机制的核心。',
    example: 'example.com.  IN  NS  ns1.exampledns.com.',
    usages: [
      '将域名托管到指定 DNS 服务商',
      '子域名委派给不同团队管理',
      'DNS 服务迁移'
    ]
  }
]

const current = computed(() => records.find((r) => r.type === selected.value))
</script>

<style scoped>
.dns-record-demo {
  background: linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.tab-row {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 6px 16px;
  border: 2px solid #ce93d8;
  border-radius: 20px;
  background: #fff;
  color: #7b1fa2;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #7b1fa2;
  color: #fff;
  border-color: #7b1fa2;
}

.tab-btn:hover:not(.active) {
  background: #f3e5f5;
}

.detail-card {
  background: #fff;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 14px;
  border: 1px solid #e1bee7;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.type-badge {
  background: #7b1fa2;
  color: #fff;
  padding: 3px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  font-family: monospace;
}

.type-name {
  font-size: 15px;
  color: #555;
  font-weight: 500;
}

.type-desc {
  font-size: 14px;
  color: #333;
  line-height: 1.7;
  margin: 0 0 14px 0;
}

.example-block {
  background: #263238;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 14px;
}

.example-title {
  font-size: 11px;
  color: #80cbc4;
  margin-bottom: 6px;
  font-weight: 600;
}

.example-code {
  color: #e0f7fa;
  font-size: 13px;
  font-family: 'Fira Code', monospace;
  word-break: break-all;
}

.usage-block {
  background: #f3e5f5;
  border-radius: 8px;
  padding: 12px 16px;
}

.usage-title {
  font-size: 12px;
  font-weight: 700;
  color: #7b1fa2;
  margin-bottom: 6px;
}

.usage-list {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #444;
  line-height: 1.8;
}

.info-box {
  margin-top: 14px;
  padding: 10px 14px;
  background: #fff3e0;
  border-radius: 8px;
  font-size: 13px;
  color: #5d4037;
  line-height: 1.6;
}
</style>
