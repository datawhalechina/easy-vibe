<template>
  <div class="cache-consistency">
    <div
      v-for="strategy in strategies"
      :key="strategy.name"
      class="strategy"
    >
      <div class="strategy-title">
        {{ strategy.name }}
      </div>
      <p>{{ strategy.desc }}</p>
    </div>
  </div>
</template>

<script setup>
const strategies = [
  { name: 'Update DB, then delete cache', desc: 'Low complexity and a short inconsistency window; works for most products.' },
  { name: 'Delayed double delete', desc: 'Deletes cache twice to reduce stale reads in high consistency scenarios.' },
  { name: 'Avoid delete-before-update', desc: 'Deleting cache first can reload old database values under concurrency.' }
]
</script>

<style scoped>
.cache-consistency {
  display: grid;
  gap: 12px;
  margin: 20px 0;
}

.strategy {
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.strategy-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.strategy p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
}
</style>
