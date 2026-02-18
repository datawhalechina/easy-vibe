<!--
  DeploymentHttpsDemo.vue
  HTTPS 安全（精简版）
-->
<template>
  <div class="deployment-https">
    <div class="header">
      <span class="icon">🔒</span>
      <span class="title">HTTPS 安全</span>
      <span class="subtitle">给数据传输加把锁</span>
    </div>

    <div class="compare">
      <div class="col">
        <div class="title">
          HTTP
        </div>
        <div class="item">
          ❌ 明文传输
        </div>
      </div>
      <div class="col highlight">
        <div class="title">
          HTTPS
        </div>
        <div class="item">
          ✅ 加密传输
        </div>
      </div>
    </div>

    <div class="info">
      <span class="text">💡 推荐：Let's Encrypt 免费证书</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.deployment-https {
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

.compare {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
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

.info {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  text-align: center;
  font-size: 0.85rem;
}

.info .text {
  color: var(--vp-c-text-2);
}
</style>
