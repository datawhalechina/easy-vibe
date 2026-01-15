<template>
  <div class="url-to-browser">
    <div class="url-input-section">
      <div class="url-bar">
        <div class="lock-icon">🔒</div>
        <div class="url-text">https://www.example.com/page</div>
        <button class="go-button" @click="startProcess">Go</button>
      </div>
    </div>

    <div class="process-flow">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="flow-step"
        :class="{ active: currentStep === index, completed: currentStep > index }"
      >
        <div class="step-connector" v-if="index > 0"></div>
        <div class="step-circle">
          <div class="step-number">{{ index + 1 }}</div>
        </div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div v-if="currentStep === index" class="step-detail">
            {{ step.detail }}
          </div>
        </div>
      </div>
    </div>

    <div class="timeline">
      <div class="timeline-bar">
        <div class="timeline-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="timeline-label">{{ Math.round(progress / 10) }} / 10 步</div>
    </div>

    <div class="info-box">
      <div class="info-title">💡 知识点</div>
      <div class="info-content">
        <strong>DNS (域名系统)</strong>：将域名转换为 IP 地址，就像电话簿将姓名转换为电话号码。
        <br><br>
        <strong>TCP 三次握手</strong>：确保客户端和服务器都准备好通信。
        <br><br>
        <strong>HTTP/HTTPS</strong>：应用层协议，定义了请求和响应的格式。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(-1)
const progress = ref(0)

const steps = [
  {
    id: 1,
    title: 'URL 解析',
    desc: '解析地址',
    detail: '浏览器检查 URL 格式，提取协议(https)、域名(www.example.com)、路径(/page)'
  },
  {
    id: 2,
    title: 'DNS 查询',
    desc: '查找 IP 地址',
    detail: '查询 DNS 服务器：www.example.com → 93.184.216.34'
  },
  {
    id: 3,
    title: 'TCP 连接',
    desc: '建立连接',
    detail: '三次握手：SYN → SYN-ACK → ACK，建立可靠连接'
  },
  {
    id: 4,
    title: 'TLS 握手',
    desc: '加密协商',
    detail: '协商加密算法，交换证书，建立安全通道（HTTPS）'
  },
  {
    id: 5,
    title: '发送请求',
    desc: 'HTTP GET',
    detail: '发送：GET /page HTTP/1.1\nHost: www.example.com'
  },
  {
    id: 6,
    title: '服务器处理',
    desc: '生成响应',
    detail: '服务器接收请求，处理逻辑，查询数据库，生成 HTML'
  },
  {
    id: 7,
    title: '接收响应',
    desc: 'HTTP 200 OK',
    detail: '接收：HTML + CSS + JS 资源，状态码 200 表示成功'
  },
  {
    id: 8,
    title: '解析 DOM',
    desc: '构建页面结构',
    detail: '解析 HTML，构建 DOM 树，解析 CSS 构建 CSSOM 树'
  },
  {
    id: 9,
    title: '执行 JS',
    desc: '添加交互',
    detail: '执行 JavaScript，处理事件，动态修改页面'
  },
  {
    id: 10,
    title: '渲染完成',
    desc: '页面显示',
    detail: 'DOM + CSSOM → Render Tree → Layout → Paint → 显示页面'
  }
]

const startProcess = () => {
  currentStep.value = -1
  progress.value = 0

  let stepIndex = 0
  const interval = setInterval(() => {
    if (stepIndex < steps.length) {
      currentStep.value = stepIndex
      progress.value = ((stepIndex + 1) / steps.length) * 100
      stepIndex++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        currentStep.value = -1
        progress.value = 0
      }, 3000)
    }
  }, 1000)
}
</script>

<style scoped>
.url-to-browser {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.url-input-section {
  margin-bottom: 25px;
}

.url-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 8px 15px;
}

.lock-icon {
  font-size: 1rem;
}

.url-text {
  flex: 1;
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.go-button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 6px 18px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.go-button:hover {
  background: var(--vp-c-brand-dark);
}

.process-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 25px;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  position: relative;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.flow-step.active {
  opacity: 1;
}

.flow-step.completed {
  opacity: 0.7;
}

.step-connector {
  position: absolute;
  left: 20px;
  top: 40px;
  width: 2px;
  height: calc(100% - 20px);
  background: var(--vp-c-divider);
}

.flow-step.completed .step-connector {
  background: var(--vp-c-brand);
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  flex-shrink: 0;
  z-index: 1;
}

.flow-step.active .step-circle {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.flow-step.completed .step-circle {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.step-number {
  font-weight: bold;
  font-size: 0.9rem;
}

.step-content {
  flex: 1;
  padding-top: 5px;
  padding-bottom: 15px;
}

.step-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.step-detail {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  white-space: pre-line;
  line-height: 1.6;
}

.timeline {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.timeline-bar {
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.timeline-fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.5s ease;
}

.timeline-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.info-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
  border-left: 4px solid var(--vp-c-brand);
}

.info-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.info-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
