<template>
  <div class="power-on-demo">
    <div class="demo-label">电脑启动第一步 ── 点击通电</div>

    <div class="sequence" @click="powerOn = !powerOn">
      <div class="step" :class="{ active: powerOn }">
        <div class="step-icon">🔌</div>
        <div class="step-name">电源</div>
        <div class="step-status">{{ powerOn ? '✅ 供电中' : '⬜ 等待' }}</div>
      </div>

      <div class="arrow">→</div>

      <div class="step" :class="{ active: powerOn }">
        <div class="step-icon">🔋</div>
        <div class="step-name">主板</div>
        <div class="step-status">{{ powerOn ? '✅ 唤醒' : '⬜ 等待' }}</div>
      </div>

      <div class="arrow">→</div>

      <div class="step" :class="{ active: powerOn }">
        <div class="step-icon">⚙️</div>
        <div class="step-name">CPU</div>
        <div class="step-status">{{ powerOn ? '✅ 复位' : '⬜ 等待' }}</div>
      </div>

      <div class="arrow">→</div>

      <div class="step" :class="{ active: powerOn }">
        <div class="step-icon">💾</div>
        <div class="step-name">BIOS</div>
        <div class="step-status">{{ powerOn ? '✅ 启动' : '⬜ 等待' }}</div>
      </div>
    </div>

    <div class="tap-hint">👆 点击切换电源状态</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const powerOn = ref(false)
</script>

<style scoped>
.power-on-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.sequence {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem;
  border-radius: 6px;
  opacity: 0.4;
  transition: all 0.3s;
}

.step.active {
  opacity: 1;
  background: var(--vp-c-bg);
}

.step-icon {
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
}

.step-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.step-status {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
}

.arrow {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}
</style>
