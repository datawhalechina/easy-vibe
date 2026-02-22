<template>
  <div class="transistor-demo">
    <div class="demo-header">
      <span class="title">晶体管：数字世界的开关</span>
      <span class="subtitle">Gate 电压决定电流能否通过</span>
    </div>

    <div class="states">
      <div class="state-card">
        <div class="state-label">Gate = 0（低电压）</div>
        <div class="channel-row">
          <span class="terminal">源极</span>
          <div class="channel-track off">
            <span class="block-icon">✕ 断开</span>
          </div>
          <span class="terminal">漏极</span>
        </div>
        <div class="output-line">输出：<strong>0</strong></div>
      </div>

      <div class="state-card">
        <div class="state-label">Gate = 1（高电压）</div>
        <div class="channel-row">
          <span class="terminal">源极</span>
          <div class="channel-track on">
            <span class="flow-dot d1" />
            <span class="flow-dot d2" />
            <span class="flow-dot d3" />
            <span class="flow-label">导通</span>
          </div>
          <span class="terminal">漏极</span>
        </div>
        <div class="output-line">输出：<strong>1</strong></div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>晶体管是“电控开关”：Gate=1 导通、Gate=0 断开，所有数字计算都建立在这种 0/1 开关之上。
    </div>
  </div>
</template>

<script setup>
// 纯静态展示，无需交互
</script>

<style scoped>
.transistor-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.states {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.state-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 0.75rem;
}

.state-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.channel-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.terminal {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.channel-track {
  flex: 1;
  min-height: 2.5rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.channel-track.off {
  background: var(--vp-c-bg-alt);
}

.channel-track.on {
  background: var(--vp-c-success-soft);
  border-color: var(--vp-c-success);
}

.block-icon {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
}

.flow-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--vp-c-success);
  position: absolute;
  left: -10%;
  animation: flow 1.5s linear infinite;
}

.flow-dot.d2 {
  animation-delay: 0.45s;
}

.flow-dot.d3 {
  animation-delay: 0.9s;
}

.flow-label {
  margin-left: 0.4rem;
  font-size: 0.85rem;
  color: var(--vp-c-success-1);
  font-weight: 600;
}

@keyframes flow {
  from {
    left: -10%;
  }
  to {
    left: 105%;
  }
}

.output-line {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.output-line strong {
  color: var(--vp-c-brand-1);
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .states {
    grid-template-columns: 1fr;
  }
}
</style>
