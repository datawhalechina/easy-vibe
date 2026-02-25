<template>
  <div class="url-demo">
    <div class="demo-header">
      <div class="demo-title">URL 访问全流程</div>
      <button class="play-btn" @click="autoPlay" :disabled="playing">
        {{ playing ? '播放中...' : '▶ 自动演示' }}
      </button>
    </div>

    <div class="flow">
      <div class="flow-side client-side">
        <div class="side-label">浏览器</div>
      </div>

      <div class="flow-steps">
        <div
          v-for="(step, i) in steps"
          :key="step.name"
          class="step"
          :class="{ active: current >= i, highlight: current === i }"
          @click="current = i"
        >
          <div class="step-line">
            <span class="step-dot"></span>
            <span v-if="i < steps.length - 1" class="step-connector"></span>
          </div>
          <div class="step-body">
            <div class="step-head">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-name">{{ step.name }}</span>
              <span class="step-dir" :class="step.dir">{{ step.dir === 'right' ? '→' : '←' }}</span>
            </div>
            <div v-if="current >= i" class="step-detail">{{ step.detail }}</div>
          </div>
        </div>
      </div>

      <div class="flow-side server-side">
        <div class="side-label">服务器</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const current = ref(-1)
const playing = ref(false)
let timer = null

const steps = [
  { name: 'URL 解析', dir: 'right', detail: 'https://example.com → 协议: https, 域名: example.com, 路径: /' },
  { name: 'DNS 解析', dir: 'right', detail: '向 DNS 服务器查询，将域名翻译为 IP 地址 93.184.216.34' },
  { name: 'TCP 三次握手', dir: 'right', detail: 'SYN → SYN-ACK → ACK，建立可靠的传输连接' },
  { name: 'TLS 握手', dir: 'right', detail: '交换密钥、验证证书，建立 HTTPS 加密通道' },
  { name: '发送 HTTP 请求', dir: 'right', detail: 'GET /index.html HTTP/1.1  Host: example.com' },
  { name: '服务器处理', dir: 'left', detail: '解析请求 → 执行业务逻辑 → 查询数据库 → 组装响应' },
  { name: '返回 HTTP 响应', dir: 'left', detail: 'HTTP/1.1 200 OK  Content-Type: text/html' },
  { name: '浏览器渲染', dir: 'left', detail: 'HTML → DOM 树 → 样式计算 → 布局 → 绘制到屏幕' }
]

const autoPlay = () => {
  if (timer) clearInterval(timer)
  current.value = -1
  playing.value = true
  let i = 0
  timer = setInterval(() => {
    current.value = i
    i++
    if (i >= steps.length) {
      if (timer) clearInterval(timer)
      playing.value = false
    }
  }, 800)
}

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.url-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.play-btn {
  font-size: 0.65rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: border-color 0.2s;
}
.play-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); }
.play-btn:disabled { opacity: 0.5; cursor: default; }
.flow {
  display: flex;
  gap: 0.5rem;
}
.flow-side {
  display: flex;
  align-items: flex-start;
  padding-top: 0.3rem;
}
.side-label {
  writing-mode: vertical-rl;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  letter-spacing: 0.15em;
}
.flow-steps { flex: 1; display: flex; flex-direction: column; }
.step {
  display: flex;
  gap: 0.5rem;
  opacity: 0.35;
  transition: opacity 0.3s;
}
.step.active { opacity: 1; }
.step.highlight .step-dot { box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.2); }
.step-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 0.8rem;
  flex-shrink: 0;
}
.step-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--vp-c-divider);
  transition: all 0.3s;
  flex-shrink: 0;
  margin-top: 0.35rem;
}
.step.active .step-dot { background: var(--vp-c-brand); }
.step-connector {
  flex: 1;
  width: 1px;
  background: var(--vp-c-divider);
  min-height: 0.8rem;
}
.step.active .step-connector { background: var(--vp-c-brand); opacity: 0.3; }
.step-body { flex: 1; padding-bottom: 0.5rem; }
.step-head { display: flex; align-items: center; gap: 0.35rem; }
.step-num {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  min-width: 1rem;
}
.step.active .step-num { color: var(--vp-c-brand); }
.step-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.step-dir {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}
.step-dir.right { color: var(--vp-c-brand); }
.step-dir.left { color: #e879a0; }
.step-detail {
  font-size: 0.63rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
  padding: 0.25rem 0.4rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-family: monospace;
  line-height: 1.5;
}
@media (max-width: 480px) {
  .flow-side { display: none; }
}
</style>
