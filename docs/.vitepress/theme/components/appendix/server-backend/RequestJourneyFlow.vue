<template>
  <div class="request-journey-flow">
    <div
      v-for="(step, index) in steps"
      :key="step.title"
      class="journey-step"
    >
      <div class="step-index">
        {{ index + 1 }}
      </div>
      <div>
        <div class="step-title">
          {{ step.title }}
        </div>
        <div class="step-desc">
          {{ step.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { title: 'Browser', desc: 'Parse URL and prepare the HTTP request.' },
  { title: 'DNS', desc: 'Resolve the domain name to an IP address.' },
  { title: 'Network', desc: 'Route the request through TCP/TLS and proxies.' },
  { title: 'Server', desc: 'Run gateway, application, and database logic.' },
  { title: 'Response', desc: 'Return data and let the browser render it.' }
]
</script>

<style scoped>
.request-journey-flow {
  display: grid;
  gap: 12px;
  margin: 20px 0;
}

.journey-step {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.step-index {
  display: grid;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-weight: 700;
}

.step-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.step-desc {
  margin-top: 4px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
