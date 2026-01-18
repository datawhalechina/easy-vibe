<!--
  HttpsNginxDemo.vue
  Nginx 配置生成器：极简版
-->
<template>
  <div class="https">
    <div class="header">
      <div class="title">Nginx 配置生成器</div>
      <div class="subtitle">复制粘贴就能用，自动配置 HTTPS</div>
    </div>

    <div class="options">
      <div
        class="option"
        :class="{ active: mode === 'static' }"
        @click="mode = 'static'"
      >
        <span class="icon">📄</span>
        <span>静态网站</span>
      </div>
      <div
        class="option"
        :class="{ active: mode === 'proxy' }"
        @click="mode = 'proxy'"
      >
        <span class="icon">🔄</span>
        <span>反向代理 (Node/Python)</span>
      </div>
    </div>

    <div class="code-box">
      <div class="code-header">
        <span>/etc/nginx/sites-available/default</span>
        <button class="copy-btn" @click="copy">
          {{ copied ? '已复制' : '复制' }}
        </button>
      </div>
      <pre><code>{{ snippet }}</code></pre>
    </div>

    <div class="tips">
      <div class="tip-item">
        <span class="emoji">🔑</span>
        <div>
          <strong>开启 HTTPS 神器：</strong>
          <div class="cmd">sudo certbot --nginx</div>
          <div class="desc">
            运行这行命令，它会自动修改上面的配置，帮你加上 SSL 证书。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const mode = ref('proxy')
const copied = ref(false)

const snippet = computed(() => {
  if (mode.value === 'static') {
    return `server {
    listen 80;
    server_name example.com;  # 改成你的域名

    # 静态文件在哪里？
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`
  } else {
    return `server {
    listen 80;
    server_name example.com;  # 改成你的域名

    location / {
        # 把请求转发给 3000 端口的程序
        proxy_pass http://127.0.0.1:3000;
        
        # 告诉后端真实的客户 IP 是多少
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`
  }
})

function copy() {
  navigator.clipboard.writeText(snippet.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scoped>
.https {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
}

.header {
  margin-bottom: 16px;
}
.header .title {
  font-weight: 800;
  font-size: 18px;
}
.header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.options {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.option {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.option.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.code-box {
  background: #1e1e20;
  border-radius: 8px;
  overflow: hidden;
  color: #fff;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  margin-bottom: 16px;
}

.code-header {
  background: #2d2d30;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #aaa;
}

.copy-btn {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

pre {
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  line-height: 1.5;
}

.tips {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tip-item {
  display: flex;
  gap: 10px;
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 8px;
  border: 1px dashed var(--vp-c-divider);
}

.cmd {
  background: #1e1e20;
  color: #22c55e;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin: 4px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
