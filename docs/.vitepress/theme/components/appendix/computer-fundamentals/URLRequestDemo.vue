<template>
  <div class="url-demo">
    <div class="demo-label">URL 访问流程 ── 点击逐步演示</div>

    <div class="flow">
      <div
        v-for="(step, index) in steps"
        :key="step.name"
        class="flow-step"
        :class="{ active: currentStep >= index }"
        @click="currentStep = index"
      >
        <div class="step-num">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div v-if="currentStep >= index && step.detail" class="step-detail">
            {{ step.detail }}
          </div>
        </div>
      </div>
    </div>

    <div class="tap-hint">👆 点击查看各步骤详情</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const currentStep = ref(0)
const steps = [
  { name: 'URL 解析', desc: '提取协议、域名、路径', detail: 'https://www.example.com → 协议:https, 域名:www.example.com' },
  { name: 'DNS 解析', desc: '域名转换为 IP 地址', detail: 'www.example.com → 93.184.216.34' },
  { name: 'TCP 连接', desc: '建立与服务器的连接', detail: '三次握手完成' },
  { name: 'TLS 握手', desc: '建立加密通道（HTTPS）', detail: '交换密钥，验证证书' },
  { name: '发送请求', desc: '发送 HTTP 请求', detail: 'GET /index.html HTTP/1.1' },
  { name: '服务器处理', desc: '后端处理请求', detail: '查询数据库，返回 HTML' },
  { name: '返回响应', desc: '接收服务器响应', detail: 'HTTP/1.1 200 OK, Content-Type: text/html' },
  { name: '浏览器渲染', desc: '解析并显示页面', detail: '构建 DOM 树，计算样式，绘制页面' }
]
</script>

<style scoped>
.url-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.flow {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.flow-step {
  display: flex;
  gap: 0.6rem;
  padding: 0.4rem;
  border-radius: 6px;
  opacity: 0.4;
  transition: all 0.3s;
  background: var(--vp-c-bg);
}

.flow-step.active {
  opacity: 1;
}

.step-num {
  width: 1.3rem;
  height: 1.3rem;
  background: var(--vp-c-divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.flow-step.active .step-num {
  background: var(--vp-c-brand);
  color: white;
}

.step-content {
  flex: 1;
}

.step-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.step-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
}

.step-detail {
  font-size: 0.65rem;
  color: var(--vp-c-brand);
  margin-top: 0.3rem;
  padding: 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-family: monospace;
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}
</style>
