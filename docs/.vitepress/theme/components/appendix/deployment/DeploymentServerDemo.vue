<!--
  DeploymentServerDemo.vue
  服务器选择（精简版）
-->
<template>
  <div class="deployment-server">
    <div class="header">
      <span class="icon">🖥️</span>
      <span class="title">服务器选择</span>
      <span class="subtitle">根据客流量选择合适的店面</span>
    </div>

    <div class="scenarios">
      <div
        class="scenario"
        :class="{ active: scenario === 'personal' }"
        @click="scenario = 'personal'"
      >
        <span class="name">个人博客</span>
        <span class="spec">1核 1G</span>
        <span class="cost">¥50/月</span>
      </div>
      <div
        class="scenario"
        :class="{ active: scenario === 'small' }"
        @click="scenario = 'small'"
      >
        <span class="name">小型电商</span>
        <span class="spec">2核 4G</span>
        <span class="cost">¥300/月</span>
      </div>
      <div
        class="scenario"
        :class="{ active: scenario === 'medium' }"
        @click="scenario = 'medium'"
      >
        <span class="name">中型应用</span>
        <span class="spec">4核 8G</span>
        <span class="cost">¥1000/月</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scenario = ref('small')
</script>

<style scoped>
.deployment-server {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.scenarios {
  display: flex;
  gap: 0.5rem;
}

.scenario {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scenario:hover {
  border-color: var(--vp-c-brand-soft);
}

.scenario.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.scenario .name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.scenario .spec {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.scenario .cost {
  font-weight: 700;
  color: var(--vp-c-brand);
}
</style>
