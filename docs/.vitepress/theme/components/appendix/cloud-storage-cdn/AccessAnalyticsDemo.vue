<template>
  <div class="access-analytics-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">访问分析</span>
      <span class="subtitle">理解 CDN 访问统计和日志分析</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        访问分析演示组件占位符 - 待实现具体交互
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>通过日志分析，可以了解谁在何时访问了什么资源，帮助发现异常访问模式和安全事件。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('访问分析演示')
const description = ref('展示CDN和对象存储的访问统计分析，包括流量、带宽、访问热点等')
</script>

<style scoped>
.access-analytics-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  margin-bottom: 1rem;
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

.demo-content {
  margin-bottom: 1rem;
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
