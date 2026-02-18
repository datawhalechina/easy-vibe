<template>
  <div class="subnet-calculator">
    <div class="demo-header">
      <span class="icon">🔢</span>
      <span class="title">子网计算器</span>
      <span class="subtitle">理解 IP 地址和子网掩码</span>
    </div>

    <div class="demo-content">
      <div class="input-section">
        <div class="input-group">
          <label>IP 地址</label>
          <div class="ip-inputs">
            <input
              v-model="ip[0]"
              type="number"
              min="0"
              max="255"
              @input="calculate"
            >
            <span>.</span>
            <input
              v-model="ip[1]"
              type="number"
              min="0"
              max="255"
              @input="calculate"
            >
            <span>.</span>
            <input
              v-model="ip[2]"
              type="number"
              min="0"
              max="255"
              @input="calculate"
            >
            <span>.</span>
            <input
              v-model="ip[3]"
              type="number"
              min="0"
              max="255"
              @input="calculate"
            >
          </div>
        </div>
        <div class="input-group">
          <label>子网掩码 (CIDR)</label>
          <div class="cidr-input">
            <span>/</span>
            <input
              v-model.number="cidr"
              type="number"
              min="8"
              max="30"
              @input="calculate"
            >
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="result-item">
          <span class="label">子网掩码</span>
          <span class="value">{{ mask }}</span>
        </div>
        <div class="result-item">
          <span class="label">网络地址</span>
          <span class="value">{{ networkAddress }}</span>
        </div>
        <div class="result-item">
          <span class="label">广播地址</span>
          <span class="value">{{ broadcastAddress }}</span>
        </div>
        <div class="result-item">
          <span class="label">可用主机数</span>
          <span class="value">{{ usableHosts }}</span>
        </div>
        <div class="result-item">
          <span class="label">主机范围</span>
          <span class="value">{{ hostRange }}</span>
        </div>
      </div>

      <div class="binary-section">
        <div class="binary-title">
          二进制表示
        </div>
        <div class="binary-row">
          <span class="binary-label">IP 地址:</span>
          <span class="binary-value">{{ ipBinary }}</span>
        </div>
        <div class="binary-row">
          <span class="binary-label">子网掩码:</span>
          <span class="binary-value">{{ maskBinary }}</span>
        </div>
        <div class="binary-row">
          <span class="binary-label">网络部分:</span>
          <span class="binary-value network">{{ networkBinary }}</span>
        </div>
        <div class="binary-row">
          <span class="binary-label">主机部分:</span>
          <span class="binary-value host">{{ hostBinary }}</span>
        </div>
      </div>

      <div class="visual-section">
        <div class="visual-title">
          地址结构可视化
        </div>
        <div class="address-visual">
          <div class="bit-blocks">
            <div 
              v-for="(bit, i) in bits" 
              :key="i"
              :class="['bit', { network: i < cidr, host: i >= cidr }]"
            >
              {{ bit }}
            </div>
          </div>
          <div class="legend">
            <span class="legend-item"><span class="network-box" /> 网络位 ({{ cidr }}位)</span>
            <span class="legend-item"><span class="host-box" /> 主机位 ({{ 32 - cidr }}位)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>子网掩码决定了 IP 地址的哪部分是"网络号"(小区)，哪部分是"主机号"(房间)。/24 表示前 24 位是网络位，后 8 位是主机位。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const ip = ref([192, 168, 1, 100])
const cidr = ref(24)

const mask = computed(() => {
  const maskValue = 0xFFFFFFFF << (32 - cidr.value)
  return [
    (maskValue >>> 24) & 255,
    (maskValue >>> 16) & 255,
    (maskValue >>> 8) & 255,
    maskValue & 255
  ].join('.')
})

const ipValue = computed(() => {
  return (parseInt(ip.value[0]) << 24) + 
         (parseInt(ip.value[1]) << 16) + 
         (parseInt(ip.value[2]) << 8) + 
         parseInt(ip.value[3])
})

const maskValue = computed(() => {
  return 0xFFFFFFFF << (32 - cidr.value)
})

const networkAddress = computed(() => {
  const network = ipValue.value & maskValue.value
  return [
    (network >>> 24) & 255,
    (network >>> 16) & 255,
    (network >>> 8) & 255,
    network & 255
  ].join('.')
})

const broadcastAddress = computed(() => {
  const network = ipValue.value & maskValue.value
  const broadcast = network | (~maskValue.value >>> 0)
  return [
    (broadcast >>> 24) & 255,
    (broadcast >>> 16) & 255,
    (broadcast >>> 8) & 255,
    broadcast & 255
  ].join('.')
})

const usableHosts = computed(() => {
  return Math.pow(2, 32 - cidr.value) - 2
})

const hostRange = computed(() => {
  const network = ipValue.value & maskValue.value
  const first = network + 1
  const last = (network | (~maskValue.value >>> 0)) - 1
  
  const firstIP = [
    (first >>> 24) & 255,
    (first >>> 16) & 255,
    (first >>> 8) & 255,
    first & 255
  ].join('.')
  
  const lastIP = [
    (last >>> 24) & 255,
    (last >>> 16) & 255,
    (last >>> 8) & 255,
    last & 255
  ].join('.')
  
  return `${firstIP} - ${lastIP}`
})

const toBinary = (num) => {
  return num.toString(2).padStart(8, '0')
}

const ipBinary = computed(() => {
  return ip.value.map(toBinary).join(' ')
})

const maskBinary = computed(() => {
  const m = [
    (maskValue.value >>> 24) & 255,
    (maskValue.value >>> 16) & 255,
    (maskValue.value >>> 8) & 255,
    maskValue.value & 255
  ]
  return m.map(toBinary).join(' ')
})

const bits = computed(() => {
  return ip.value.map(octet => toBinary(parseInt(octet))).join('').split('')
})

const networkBinary = computed(() => {
  return bits.value.slice(0, cidr.value).join('') + ' '.repeat(32 - cidr.value)
})

const hostBinary = computed(() => {
  return ' '.repeat(cidr.value) + bits.value.slice(cidr.value).join('')
})

const calculate = () => {
  ip.value = ip.value.map(v => Math.min(255, Math.max(0, parseInt(v) || 0)))
  cidr.value = Math.min(30, Math.max(8, cidr.value || 24))
}

onMounted(() => {
  calculate()
})
</script>

<style scoped>
.subnet-calculator {
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

.input-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.input-group label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.ip-inputs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.ip-inputs input {
  width: 50px;
  padding: 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  text-align: center;
  font-size: 0.85rem;
}

.ip-inputs span {
  color: var(--vp-c-text-2);
}

.cidr-input {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.cidr-input input {
  width: 50px;
  padding: 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  text-align: center;
  font-size: 0.85rem;
}

.result-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.result-item {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
}

.result-item .label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.15rem;
}

.result-item .value {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.binary-section {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.binary-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.binary-row {
  display: flex;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.binary-label {
  color: var(--vp-c-text-2);
  min-width: 80px;
}

.binary-value {
  letter-spacing: 1px;
}

.binary-value.network {
  color: var(--vp-c-brand);
}

.binary-value.host {
  color: var(--vp-c-text-3);
}

.visual-section {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.visual-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.bit-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 0.5rem;
}

.bit {
  width: 12px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-family: monospace;
  border-radius: 2px;
}

.bit.network {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.bit.host {
  background: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.legend {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.network-box, .host-box {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.network-box {
  background: var(--vp-c-brand-soft);
}

.host-box {
  background: var(--vp-c-divider);
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
