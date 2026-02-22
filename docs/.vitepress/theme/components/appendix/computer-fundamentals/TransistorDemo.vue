<template>
  <div class="transistor-demo">
    <div class="demo-label">MOSFET 晶体管示意 ── 点击切换 Gate 电压</div>

    <div class="schematic" @click="gateOn = !gateOn">
      <!-- Source terminal -->
      <div class="terminal-box source">
        <span class="pin-label">源极<br><span class="en">Source</span></span>
        <div class="pin-wire" :class="{ active: gateOn }"></div>
      </div>

      <!-- Channel -->
      <div class="channel-area">
        <div class="gate-indicator" :class="{ on: gateOn }">
          <span class="gate-label">Gate</span>
          <span class="gate-val">{{ gateOn ? '1' : '0' }}</span>
        </div>
        <div class="channel-bar" :class="{ conducting: gateOn }">
          <template v-if="gateOn">
            <span class="electron e1"></span>
            <span class="electron e2"></span>
            <span class="electron e3"></span>
          </template>
          <span v-else class="block-mark">✕</span>
        </div>
        <div class="channel-status">{{ gateOn ? '导通 → 输出 1' : '断开 → 输出 0' }}</div>
      </div>

      <!-- Drain terminal -->
      <div class="terminal-box drain">
        <div class="pin-wire" :class="{ active: gateOn }"></div>
        <span class="pin-label">漏极<br><span class="en">Drain</span></span>
      </div>
    </div>

    <div class="tap-hint">👆 点击切换 Gate 电压</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const gateOn = ref(false)
</script>

<style scoped>
.transistor-demo {
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

/* ── layout ── */
.schematic {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

/* ── terminals ── */
.terminal-box {
  display: flex;
  align-items: center;
  gap: 0;
}

.pin-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  line-height: 1.3;
  text-align: center;
}

.pin-label .en {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  font-weight: normal;
}

.pin-wire {
  width: 2.5rem;
  height: 3px;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}

.pin-wire.active {
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 6px var(--vp-c-brand-soft);
}

/* ── channel ── */
.channel-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  min-width: 7rem;
}

.gate-indicator {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: all 0.3s;
}

.gate-indicator.on {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.gate-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.gate-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  transition: color 0.3s;
}

.gate-indicator.on .gate-val {
  color: var(--vp-c-brand-1);
}

.channel-bar {
  width: 100%;
  height: 2rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.channel-bar.conducting {
  background: var(--vp-c-success-soft, rgba(22, 163, 74, 0.12));
  border-color: var(--vp-c-success, #16a34a);
}

.block-mark {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
}

.electron {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-success, #16a34a);
  position: absolute;
  animation: flow 1.2s linear infinite;
}

.electron.e2 { animation-delay: 0.4s; }
.electron.e3 { animation-delay: 0.8s; }

@keyframes flow {
  0%   { left: -8%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 108%; opacity: 0; }
}

.channel-status {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: color 0.3s;
}

.channel-bar.conducting + .channel-status {
  color: var(--vp-c-success, #16a34a);
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.6rem;
}

@media (max-width: 480px) {
  .pin-wire { width: 1.5rem; }
  .channel-area { min-width: 5rem; }
}
</style>
