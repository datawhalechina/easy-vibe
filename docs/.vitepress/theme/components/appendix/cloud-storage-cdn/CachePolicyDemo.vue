<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="icon">⚙️</span>
      <span class="title">{{ title }}</span>
      <span class="subtitle">{{ description }}</span>
    </div>
    <div class="demo-content">
      <el-alert
        type="info"
        :closable="false"
      >
        缓存策略演示组件占位符 - 待实现具体交互
      </el-alert>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>缓存策略平衡命中率和新鲜度，TTL 设置太短会导致频繁回源，太长会导致内容过期。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('缓存策略演示')
const description = ref('展示CDN和对象存储的缓存策略配置，包括缓存时间、刷新机制等')
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
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
