<template>
  <div class="power-on-demo">
    <div class="demo-title">硬件启动链路</div>
    <div class="flow">
      <div v-for="(step, i) in steps" :key="step.name" class="flow-item">
        <div class="step-card">
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
        <div v-if="i < steps.length - 1" class="arrow">
          <svg width="24" height="16" viewBox="0 0 24 16">
            <path d="M0 8h18M14 3l6 5-6 5" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { icon: '🔌', name: '电源 PSU', desc: '交流电 → 直流电' },
  { icon: '🧩', name: '主板芯片组', desc: '协调各硬件部件' },
  { icon: '⚙️', name: 'CPU 复位', desc: '清零寄存器，就绪' },
  { icon: '📟', name: 'BIOS/UEFI', desc: '执行第一条指令' }
]
</script>

<style scoped>
.power-on-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}
.flow-item {
  display: flex;
  align-items: center;
  gap: 0;
}
.step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  min-width: 5.5rem;
}
.step-icon { font-size: 1.4rem; margin-bottom: 0.3rem; }
.step-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}
.step-desc {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  text-align: center;
}
.arrow {
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
}
@media (max-width: 640px) {
  .flow { flex-direction: column; gap: 0.2rem; }
  .flow-item { flex-direction: column; }
  .arrow { transform: rotate(90deg); padding: 0.1rem 0; }
}
</style>
