<template>
  <div class="dns-lookup-demo">
    <div class="flow">
      <span class="domain">google.com</span>
      <span class="arrow">→</span>
      <span class="dns">DNS</span>
      <span class="arrow">→</span>
      <span class="ip">142.250.80.46</span>
    </div>
  </div>
</template>

<style scoped>
.dns-lookup-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.6rem 0.8rem;
  margin: 0.75rem 0;
  font-family: var(--vp-font-family-mono);
}

.flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.domain {
  color: var(--vp-c-text-1);
}

.dns {
  background: #dbeafe;
  color: #2563eb;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.ip {
  color: #059669;
  font-weight: 500;
}

.arrow {
  color: var(--vp-c-text-3);
}
</style>
