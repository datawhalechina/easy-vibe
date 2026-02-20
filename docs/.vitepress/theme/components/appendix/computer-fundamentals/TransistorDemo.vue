<template>
  <div class="transistor-demo">
    <div class="demo-header">
      <span class="title">晶体管：数字世界的开关</span>
      <span class="subtitle">一个开关如何变成计算能力</span>
    </div>

    <div class="demo-content">
      <div class="switch-container">
        <div
          class="switch-area"
          @click="toggleSwitch"
        >
          <div class="transistor-symbol">
            <svg
              viewBox="0 0 100 80"
              class="transistor-svg"
            >
              <line
                x1="10"
                y1="40"
                x2="35"
                y2="40"
                stroke="var(--vp-c-text-1)"
                stroke-width="2"
              />
              <line
                x1="65"
                y1="40"
                x2="90"
                y2="40"
                stroke="var(--vp-c-text-1)"
                stroke-width="2"
              />
              <line
                x1="50"
                y1="20"
                x2="50"
                y2="35"
                stroke="var(--vp-c-text-1)"
                stroke-width="2"
              />
              <line
                x1="50"
                y1="45"
                x2="50"
                y2="60"
                stroke="var(--vp-c-text-1)"
                stroke-width="2"
              />
              <line
                x1="35"
                y1="30"
                x2="35"
                y2="50"
                stroke="var(--vp-c-text-1)"
                stroke-width="3"
              />
              <line
                x1="65"
                y1="30"
                x2="65"
                y2="50"
                stroke="var(--vp-c-text-1)"
                stroke-width="3"
              />
              <line
                x1="35"
                y1="40"
                x2="65"
                y2="40"
                stroke="var(--vp-c-text-1)"
                stroke-width="2"
              />
              <circle
                cx="50"
                cy="60"
                r="4"
                fill="var(--vp-c-text-1)"
              />
            </svg>
          </div>
          <div class="switch-label">
            <span class="state-label">{{ isOn ? 'ON (1)' : 'OFF (0)' }}</span>
            <div
              class="current-flow"
              :class="{ active: isOn }"
            >
              <span class="flow-indicator">电流</span>
            </div>
          </div>
        </div>
      </div>

      <div class="truth-table">
        <div class="table-title">
          晶体管状态表
        </div>
        <table>
          <thead>
            <tr>
              <th>栅极(控制端)</th>
              <th>源极→漏极</th>
              <th>输出</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{ highlight: !isOn }">
              <td>低电压 (0)</td>
              <td>断开</td>
              <td>0</td>
            </tr>
            <tr :class="{ highlight: isOn }">
              <td>高电压 (1)</td>
              <td>导通</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>晶体管就是一个用电控制的开关。给它高电压(1)，它就导通；给低电压(0)，它就断开。这是所有数字计算的基础。
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
  margin-bottom: 0.75rem;
}

.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.demo-content {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.switch-container {
  flex: 1;
  min-width: 200px;
}

.switch-area {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.switch-area:hover {
  border-color: var(--vp-c-brand);
}

.transistor-symbol {
  width: 120px;
  height: 80px;
  margin: 0 auto 0.5rem;
}

.transistor-svg {
  width: 100%;
  height: 100%;
}

.switch-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
}

.state-label {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.current-flow {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  opacity: 0.5;
  transition: all 0.3s;
}

.current-flow.active {
  opacity: 1;
  color: var(--vp-c-success);
}

.truth-table {
  flex: 1;
  min-width: 250px;
}

.table-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th, td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem;
  text-align: center;
}

th {
  background: var(--vp-c-bg-alt);
}

tr.highlight {
  background: var(--vp-c-brand-soft);
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

</style>
