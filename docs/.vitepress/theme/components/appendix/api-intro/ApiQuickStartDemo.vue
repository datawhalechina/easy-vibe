<!--
  ApiQuickStartDemo.vue - 紧凑版
  目标：展示最简单的 API 调用流程，一眼看懂
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">试试看：获取当前时间</span>
    </div>

    <div class="demo-layout">
      <div class="left-panel">
        <div class="terminal">
          <div class="term-bar">
            <span class="dot r" /><span class="dot y" /><span class="dot g" />
            <span class="term-title">API 请求</span>
          </div>
          <div class="term-body">
            <div class="t-line">
              <span class="t-ps">&gt; </span>
              <span class="t-cmd">GET /api/time</span>
            </div>
            <div v-if="calling" class="t-line">
              <span class="t-dim">请求中...</span>
              <span class="t-loading">▋</span>
            </div>
            <div v-if="result" class="t-line">
              <span class="t-grn">HTTP/1.1 200 OK</span>
            </div>
            <div v-if="result" class="t-line">
              <span class="t-dim">{ "time": "{{ result.timeString }}" }</span>
            </div>
          </div>
        </div>
        <button class="call-btn" :disabled="calling" @click="callApi">
          {{ calling ? '请求中...' : '📡 发起请求' }}
        </button>
      </div>

      <div class="right-panel">
        <div class="flow-col" :class="{ 'flow-highlight': stage === 'client' }">
          <div class="flow-header">
            <span class="flow-icon">💻</span>
            <span class="flow-title">客户端</span>
          </div>
          <div class="flow-body">
            {{ stage === 'client' ? '准备请求...' : '等待中' }}
          </div>
        </div>

        <div class="flow-arrow" :class="{ 'arrow-lit': stage === 'request' }">
          <span class="arrow-symbol">→</span>
          <code class="arrow-label">Request</code>
        </div>

        <div class="flow-col" :class="{ 'flow-highlight': stage === 'server' }">
          <div class="flow-header">
            <span class="flow-icon">🖥️</span>
            <span class="flow-title">服务器</span>
          </div>
          <div class="flow-body">
            {{ stage === 'server' ? '处理中...' : '等待中' }}
          </div>
        </div>

        <div class="flow-arrow" :class="{ 'arrow-lit': stage === 'response' }">
          <code class="arrow-label">Response</code>
          <span class="arrow-symbol">←</span>
        </div>

        <div
          class="flow-col"
          :class="{ 'flow-highlight': stage === 'response' }"
        >
          <div class="flow-header">
            <span class="flow-icon">📦</span>
            <span class="flow-title">响应</span>
          </div>
          <div class="flow-body">
            <span v-if="result" class="result-time">{{
              result.timeString
            }}</span>
            <span v-else>等待响应</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span
        >点击按钮 → 发送请求 → 服务器处理 → 返回数据。这就是 API
        调用的完整流程。</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const calling = ref(false)
const result = ref(null)
const stage = ref(null)

function callApi() {
  calling.value = true
  result.value = null
  stage.value = 'client'

  setTimeout(() => {
    stage.value = 'request'
  }, 150)
  setTimeout(() => {
    stage.value = 'server'
  }, 300)
  setTimeout(() => {
    stage.value = 'response'
  }, 450)
  setTimeout(() => {
    const now = new Date()
    result.value = {
      timeString: now.toLocaleString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    calling.value = false
  }, 500)
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.demo-header {
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-layout {
  display: flex;
  align-items: stretch;
}

.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--vp-c-divider);
}

.right-panel {
  width: 200px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--vp-c-bg);
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .left-panel {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .right-panel {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
  .flow-arrow {
    display: none;
  }
}

.terminal {
  background: #141420;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  background: #1e1e2e;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.r {
  background: #ff5f57;
}
.dot.y {
  background: #febc2e;
}
.dot.g {
  background: #28c840;
}
.term-title {
  margin-left: 6px;
  font-size: 0.7rem;
  color: #666;
  font-family: monospace;
}

.term-body {
  min-height: 80px;
  padding: 10px 12px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #cdd6f4;
}
.t-line {
  margin-bottom: 4px;
}
.t-ps {
  color: #89b4fa;
}
.t-cmd {
  color: #cdd6f4;
}
.t-dim {
  color: #585b70;
}
.t-grn {
  color: #a6e3a1;
}
.t-loading {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.call-btn {
  margin: 10px;
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.call-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.flow-col {
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.flow-col.flow-highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand) 12%, transparent);
}

.flow-header {
  padding: 4px 8px;
  background: var(--vp-c-bg-alt);
  display: flex;
  align-items: center;
  gap: 4px;
}
.flow-icon {
  font-size: 0.8rem;
}
.flow-title {
  font-weight: 600;
  font-size: 0.75rem;
}

.flow-body {
  padding: 6px 8px;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}
.result-time {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 2px 0;
  opacity: 0.3;
  transition: opacity 0.2s;
}
.flow-arrow.arrow-lit {
  opacity: 1;
}
.arrow-symbol {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}
.arrow-label {
  font-size: 0.6rem;
  font-family: monospace;
  color: var(--vp-c-brand);
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 10px 14px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
