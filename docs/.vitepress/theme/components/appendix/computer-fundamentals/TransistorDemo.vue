<template>
  <div class="transistor-demo">
    <div class="demo-header">
      <span class="title">晶体管：数字世界的开关</span>
      <span class="subtitle">Gate 电压决定电流能否通过</span>
    </div>

    <div class="control-panel">
      <div class="control-left">
        <span class="control-label">栅极输入（Gate）</span>
        <button class="gate-toggle" :class="{ on: isOn }" @click="toggleSwitch">
          {{ isOn ? '1（高电压）' : '0（低电压）' }}
        </button>
      </div>
      <div class="control-right">
        <span class="chip">通道：{{ isOn ? '导通' : '断开' }}</span>
        <span class="chip">输出：{{ isOn ? '1' : '0' }}</span>
      </div>
    </div>

    <div class="demo-content">
      <div class="transistor-diagram">
        <div class="gate-column">
          <div class="gate-title">控制端 Gate</div>
          <div class="gate-value" :class="{ on: isOn }">
            {{ isOn ? '1' : '0' }}
          </div>
          <div class="gate-arrow">↓ 控制</div>
        </div>

        <div class="main-channel">
          <div class="terminal-box">源极 Source</div>
          <div class="channel-track" :class="{ on: isOn }">
            <span v-if="!isOn" class="block-icon">✕</span>
            <template v-else>
              <span class="flow-dot d1" />
              <span class="flow-dot d2" />
              <span class="flow-dot d3" />
            </template>
          </div>
          <div class="terminal-box">漏极 Drain</div>
        </div>

        <div class="result-line" :class="{ on: isOn }">
          {{ isOn ? '电流通过：Source → Drain' : '电流被阻断：无法通过通道' }}
        </div>
      </div>

      <div class="truth-table">
        <div class="table-title">晶体管状态表</div>
        <table>
          <thead>
            <tr>
              <th>Gate 输入</th>
              <th>通道状态</th>
              <th>输出</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{ highlight: !isOn }">
              <td>0（低电压）</td>
              <td>断开</td>
              <td>0</td>
            </tr>
            <tr :class="{ highlight: isOn }">
              <td>1（高电压）</td>
              <td>导通</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <div class="table-hint">
          点上方按钮切换 Gate，观察“通道状态”和“电流流动”如何同步变化。
        </div>
      </div>
    </div>

    <div class="step-guide">
      <div class="step-item">① 改变 Gate 电压（0/1）</div>
      <div class="step-item">② 通道变为断开/导通</div>
      <div class="step-item">③ 输出随之变成 0/1</div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>晶体管本质是“电控开关”：Gate=1 时导通，Gate=0
      时断开。所有数字计算都建立在这种 0/1 开关之上。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOn = ref(false)

const toggleSwitch = () => {
  isOn.value = !isOn.value
}
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
  margin-bottom: 0.8rem;
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

.control-panel {
  display: flex;
  align-items: center;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.control-left {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.control-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.gate-toggle {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 999px;
  padding: 0.3rem 0.65rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.gate-toggle.on {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
  border-color: var(--vp-c-success);
  color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}

.control-right {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-left: auto;
}

.chip {
  font-size: 0.78rem;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}
.chip.active {
  border-color: var(--vp-c-success);
}

.legend-chip {
  font-size: 0.72rem;
  padding: 0.16rem 0.42rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.demo-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0.9rem;
}

.transistor-diagram {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 0.8rem;
}

.gate-column {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.7rem;
}

.gate-title {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.gate-value {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--vp-c-divider);
  font-weight: bold;
}

.gate-value.on {
  border-color: var(--vp-c-success);
  color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}

.gate-arrow {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.main-channel {
  display: grid;
  grid-template-columns: 1fr 1.6fr 1fr;
  align-items: center;
  gap: 0.55rem;
}

.terminal-box {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  padding: 0.45rem;
  text-align: center;
  font-size: 0.78rem;
}

.channel-track {
  height: 2.4rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 999px;
  background: #e5e7eb;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.channel-track.on {
  background: var(--vp-c-success-soft);
  border-color: var(--vp-c-success);
}

.block-icon {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
}

.flow-dot {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--vp-c-success);
  position: absolute;
  left: -8%;
  animation: flow 1.5s linear infinite;
}

.flow-dot.d2 {
  animation-delay: 0.45s;
}

.flow-dot.d3 {
  animation-delay: 0.9s;
}

@keyframes flow {
  from {
    left: -8%;
  }
  to {
    left: 105%;
  }
}

.result-line {
  margin-top: 0.7rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  padding: 0.45rem 0.55rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.result-line.on {
  color: var(--vp-c-success-1);
}

.truth-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 0.8rem;
}

.table-title {
  font-weight: bold;
  margin-bottom: 0.55rem;
  font-size: 0.9rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
}

th,
td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.45rem;
  text-align: center;
}

th {
  background: var(--vp-c-bg-alt);
}

tr.highlight {
  background: var(--vp-c-brand-soft);
}

.table-hint {
  margin-top: 0.55rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step-guide {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.45rem;
  margin-top: 0.8rem;
}

.step-item {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.45rem 0.5rem;
  font-size: 0.78rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 860px) {
  .demo-content {
    grid-template-columns: 1fr;
  }

  .step-guide {
    grid-template-columns: 1fr;
  }
}
</style>
