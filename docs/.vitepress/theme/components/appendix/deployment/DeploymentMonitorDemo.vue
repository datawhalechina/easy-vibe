<!--
  DeploymentMonitorDemo.vue
  监控备份（精简版）
-->
<template>
  <div class="deployment-monitor">
    <div class="header">
      <span class="icon">📊</span>
      <span class="title">监控 & 备份</span>
      <span class="subtitle">守住网站底线的最后一道防线</span>
    </div>

    <div class="metrics">
      <div class="metric">
        <span class="label">CPU 使用率</span>
        <span class="value">{{ cpuUsage }}%</span>
      </div>
      <div class="metric">
        <span class="label">内存使用率</span>
        <span class="value">{{ memoryUsage }}%</span>
      </div>
      <div class="metric">
        <span class="label">在线用户</span>
        <span class="value">{{ activeUsers }}</span>
      </div>
    </div>

    <div class="backup">
      <div class="label">上次备份：</div>
      <span class="value">{{ lastBackup }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const cpuUsage = ref(45)
const memoryUsage = ref(62)
const activeUsers = ref(23)
const lastBackup = ref('2024-01-15 14:30')

let interval = null

onMounted(() => {
  interval = setInterval(() => {
    cpuUsage.value = Math.max(20, Math.min(95, cpuUsage.value + (Math.random() - 0.5) * 10))
    memoryUsage.value = Math.max(30, Math.min(90, memoryUsage.value + (Math.random() - 0.5) * 5))
    activeUsers.value = Math.max(10, Math.min(100, activeUsers.value + Math.floor((Math.random() - 0.5) * 5)))
  }, 2000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.deployment-monitor {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 1rem 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.header .icon {
  font-size: 1.25rem;
}

.header .title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  text-align: center;
}

.metric .label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.metric .value {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-brand);
}

.backup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
}

.backup .label {
  color: var(--vp-c-text-2);
}

.backup .value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
</style>
