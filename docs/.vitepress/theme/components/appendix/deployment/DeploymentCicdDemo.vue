<!--
  DeploymentCicdDemo.vue
  CI/CD 自动化（精简版）
-->
<template>
  <div class="deployment-cicd">
    <div class="header">
      <span class="icon">🔄</span>
      <span class="title">CI/CD 自动化</span>
      <span class="subtitle">从代码到上线，一键搞定</span>
    </div>

    <div class="pipeline">
      <div class="step">
        <span class="num">1</span>
        <span class="text">代码推送</span>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <span class="num">2</span>
        <span class="text">自动测试</span>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <span class="num">3</span>
        <span class="text">自动构建</span>
      </div>
      <span class="arrow">→</span>
      <div class="step">
        <span class="num">4</span>
        <span class="text">自动部署</span>
      </div>
    </div>

    <div class="compare">
      <div class="col">
        <div class="title">手动部署</div>
        <div class="item">❌ 容易出错</div>
      </div>
      <div class="col highlight">
        <div class="title">CI/CD</div>
        <div class="item">✅ 快速可靠</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.deployment-cicd {
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

.pipeline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  min-width: 60px;
}

.step .num {
  font-weight: 700;
  color: var(--vp-c-brand);
}

.step .text {
  font-weight: 600;
}

.arrow {
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

.compare {
  display: flex;
  gap: 0.75rem;
}

.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.col.highlight {
  background: var(--vp-c-brand-dimm);
}

.col .title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.col .item {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>
