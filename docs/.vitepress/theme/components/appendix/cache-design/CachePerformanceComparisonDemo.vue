<template>
  <div class="cache-comparison">
    <div
      v-for="scenario in scenarios"
      :key="scenario.name"
      class="scenario"
    >
      <div class="scenario-title">
        {{ scenario.name }}
      </div>
      <div class="bar">
        <span :style="{ width: scenario.width }" />
      </div>
      <div class="metric">
        {{ scenario.metric }}
      </div>
    </div>
  </div>
</template>

<script setup>
const scenarios = [
  { name: 'Without cache', metric: '5-8 s response, high DB pressure', width: '95%' },
  { name: 'With cache', metric: '50 ms response, most reads served from memory', width: '24%' }
]
</script>

<style scoped>
.cache-comparison {
  display: grid;
  gap: 14px;
  margin: 20px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.scenario-title {
  margin-bottom: 8px;
  font-weight: 700;
}

.bar {
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--vp-c-default-soft);
}

.bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--vp-c-brand-1);
}

.metric {
  margin-top: 6px;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
}
</style>
