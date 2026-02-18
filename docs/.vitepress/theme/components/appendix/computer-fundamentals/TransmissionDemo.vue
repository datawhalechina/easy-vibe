<template>
  <div class="transmission-demo">
    <div class="demo-header">
      <span class="icon">📡</span>
      <span class="title">数据传输：从串行到并行</span>
      <span class="subtitle">数据如何在不同设备间移动</span>
    </div>

    <div class="demo-content">
      <div class="transmission-types">
        <div
          class="type-card"
          :class="{ active: activeType === 'serial' }"
          @click="activeType = 'serial'"
        >
          <div class="card-icon">
            ➡️
          </div>
          <div class="card-title">
            串行传输
          </div>
          <div class="card-desc">
            一位一位依次传输
          </div>
          <div class="card-examples">
            USB、SATA、PCIe
          </div>
        </div>
        <div
          class="type-card"
          :class="{ active: activeType === 'parallel' }"
          @click="activeType = 'parallel'"
        >
          <div class="card-icon">
            ⬇️⬇️⬇️⬇️
          </div>
          <div class="card-title">
            并行传输
          </div>
          <div class="card-desc">
            多位同时传输
          </div>
          <div class="card-examples">
            旧式打印机接口、IDE
          </div>
        </div>
      </div>

      <div class="transmission-visual">
        <div class="visual-title">
          {{ activeType === 'serial' ? '串行传输示意' : '并行传输示意' }}
        </div>
        <div class="visual-area">
          <div class="sender">
            <div class="device-label">
              发送端
            </div>
            <div class="data-bits">
              <span
                v-for="(bit, i) in dataBits"
                :key="i"
                class="bit"
                :class="{ sending: sendingBit === i && activeType === 'serial' }"
              >{{ bit }}</span>
            </div>
          </div>
          <div class="channels">
            <div
              v-if="activeType === 'serial'"
              class="channel serial"
            >
              <div class="channel-label">
                单通道
              </div>
              <div class="channel-flow">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="flow-dot"
                  :class="{ active: sendingBit !== null }"
                >●</span>
              </div>
            </div>
            <div
              v-else
              class="channel parallel"
            >
              <div
                v-for="i in 4"
                :key="i"
                class="channel-row"
              >
                <div class="channel-label">
                  通道{{ i }}
                </div>
                <div class="channel-flow">
                  <span class="flow-dot active">●</span>
                </div>
              </div>
            </div>
          </div>
          <div class="receiver">
            <div class="device-label">
              接收端
            </div>
            <div class="data-bits received">
              <span
                v-for="(bit, i) in receivedBits"
                :key="i"
                class="bit"
              >{{ bit }}</span>
            </div>
          </div>
        </div>
        <button
          class="send-btn"
          @click="startTransmission"
        >
          发送数据
        </button>
      </div>

      <div class="comparison-table">
        <div class="table-title">
          串行 vs 并行对比
        </div>
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>串行</th>
              <th>并行</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>传输线数量</td>
              <td>少（1-几根）</td>
              <td>多（8-64根）</td>
            </tr>
            <tr>
              <td>抗干扰能力</td>
              <td>强</td>
              <td>弱（线间干扰）</td>
            </tr>
            <tr>
              <td>传输距离</td>
              <td>远</td>
              <td>近</td>
            </tr>
            <tr>
              <td>现代应用</td>
              <td>主流（USB、PCIe）</td>
              <td>较少</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>现代高速传输多采用串行方式。虽然并行"看起来"更快（一次传多位），但串行可以跑更高频率，抗干扰更强，实际速度反而更快。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeType = ref('serial')
const dataBits = ref(['1', '0', '1', '1', '0', '0', '1', '0'])
const receivedBits = ref(['-', '-', '-', '-', '-', '-', '-', '-'])
const sendingBit = ref(null)

const startTransmission = () => {
  if (activeType.value === 'serial') {
    receivedBits.value = ['-', '-', '-', '-', '-', '-', '-', '-']
    let i = 0
    const interval = setInterval(() => {
      if (i < dataBits.value.length) {
        sendingBit.value = i
        receivedBits.value[i] = dataBits.value[i]
        i++
      } else {
        clearInterval(interval)
        sendingBit.value = null
      }
    }, 300)
  } else {
    receivedBits.value = [...dataBits.value]
  }
}
</script>

<style scoped>
.transmission-demo {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transmission-types {
  display: flex;
  gap: 1rem;
}

.type-card {
  flex: 1;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
}

.type-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.card-title {
  font-weight: bold;
  font-size: 0.9rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.card-examples {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  margin-top: 0.25rem;
}

.transmission-visual {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.visual-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.visual-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.sender, .receiver {
  text-align: center;
}

.device-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.data-bits {
  display: flex;
  gap: 2px;
}

.bit {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 2px;
  font-size: 0.75rem;
  font-family: monospace;
}

.bit.sending {
  background: var(--vp-c-brand);
  color: white;
}

.channels {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.channel.serial {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.channel.parallel {
  gap: 2px;
}

.channel-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.channel-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.channel-flow {
  display: flex;
  gap: 2px;
}

.flow-dot {
  font-size: 0.5rem;
  color: var(--vp-c-divider);
}

.flow-dot.active {
  color: var(--vp-c-brand);
}

.send-btn {
  width: 100%;
  padding: 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.comparison-table {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.table-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

th, td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.4rem;
  text-align: center;
}

th {
  background: var(--vp-c-bg);
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

.info-box .icon { flex-shrink: 0; }
</style>
