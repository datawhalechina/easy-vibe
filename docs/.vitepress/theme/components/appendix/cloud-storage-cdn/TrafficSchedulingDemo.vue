<template>
  <div class="traffic-scheduling-demo">
    <div class="demo-header">
      <span class="icon">🚦</span>
      <span class="title">流量调度</span>
      <span class="subtitle">理解 CDN 智能调度和负载均衡</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        流量调度演示组件占位符 - 待实现具体交互
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>智能调度通过就近访问、负载均衡和故障切换，实现全球加速和高可用性。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('流量调度演示')
const description = ref('展示CDN的智能流量调度机制，包括负载均衡、就近访问、故障切换等')
</script>

<style scoped>
.traffic-scheduling-demo {
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
  margin-top:  0.75rem;
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
