<template>
  <div class="demo-container">
    <div class="demo-header">
      <h4>{{ title }}</h4>
      <p class="hint">{{ description }}</p>
    </div>
    <div class="demo-content">
      <el-alert type="info" :closable="false">
        流量调度演示组件占位符 - 待实现具体交互
      </el-alert>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('流量调度演示')
const description = ref('展示CDN的智能流量调度机制，包括负载均衡、就近访问、故障切换等')
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
