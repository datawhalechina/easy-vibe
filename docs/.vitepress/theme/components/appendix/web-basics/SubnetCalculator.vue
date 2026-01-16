<template>
  <div class="subnet-calculator">
    <div class="calculator-input">
      <div class="input-group">
        <label class="input-label">IP 地址</label>
        <input
          v-model="ipAddress"
          type="text"
          placeholder="例如: 192.168.1.0"
          class="ip-input"
        />
      </div>

      <div class="input-group">
        <label class="input-label">子网掩码</label>
        <select v-model="cidr" class="cidr-select">
          <option v-for="n in 32" :key="n" :value="n">/{{ n }}</option>
        </select>
      </div>

      <button class="calculate-btn" @click="calculate">计算</button>
    </div>

    <div class="results" v-if="results">
      <div class="result-section">
        <div class="section-title">基本信息</div>
        <div class="result-grid">
          <div class="result-item">
            <div class="result-label">网络地址</div>
            <div class="result-value">{{ results.network }}</div>
          </div>
          <div class="result-item">
            <div class="result-label">广播地址</div>
            <div class="result-value">{{ results.broadcast }}</div>
          </div>
          <div class="result-item">
            <div class="result-label">子网掩码</div>
            <div class="result-value">{{ results.mask }}</div>
          </div>
          <div class="result-item">
            <div class="result-label">可用主机数</div>
            <div class="result-value">{{ results.hosts }}</div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">IP 范围</div>
        <div class="range-display">
          <div class="range-item">
            <div class="range-label">起始 IP</div>
            <div class="range-value">{{ results.firstHost }}</div>
          </div>
          <div class="range-arrow">→</div>
          <div class="range-item">
            <div class="range-label">结束 IP</div>
            <div class="range-value">{{ results.lastHost }}</div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">二进制表示</div>
        <div class="binary-display">
          <div class="binary-row">
            <div class="binary-label">IP 地址</div>
            <div class="binary-value">{{ results.binaryIp }}</div>
          </div>
          <div class="binary-row">
            <div class="binary-label">子网掩码</div>
            <div class="binary-value">{{ results.binaryMask }}</div>
          </div>
          <div class="binary-row">
            <div class="binary-label">网络地址</div>
            <div class="binary-value">{{ results.binaryNetwork }}</div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="section-title">子网类型</div>
        <div class="subnet-info">
          <div class="info-tag" :class="getSubnetClass(cidr)">
            {{ getSubnetType(cidr) }}
          </div>
          <div class="info-desc">{{ getSubnetDescription(cidr) }}</div>
        </div>
      </div>
    </div>

    <div class="example-presets">
      <div class="presets-title">常见子网示例</div>
      <div class="presets-grid">
        <button
          v-for="(preset, index) in presets"
          :key="index"
          class="preset-btn"
          @click="applyPreset(preset)"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <div class="info-box">
      <div class="info-title">💡 子网划分知识点</div>
      <div class="info-content">
        <div class="info-item">
          <strong>什么是子网？</strong>
          将一个大网络分割成更小的网络，提高地址利用率和网络性能。
        </div>
        <div class="info-item">
          <strong>CIDR 表示法</strong>
          /24 表示前 24 位是网络位，后 8 位是主机位。
        </div>
        <div class="info-item">
          <strong>常用子网掩码</strong>
          <br />
          /8 = 255.0.0.0 (A 类网络)
          <br />
          /16 = 255.255.0.0 (B 类网络)
          <br />
          /24 = 255.255.255.0 (C 类网络)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ipAddress = ref('192.168.1.0')
const cidr = ref(24)
const results = ref(null)

const presets = [
  { name: '小型网络 /24', ip: '192.168.1.0', cidr: 24 },
  { name: '家庭网络 /26', ip: '192.168.1.0', cidr: 26 },
  { name: '大型网络 /16', ip: '192.168.0.0', cidr: 16 },
  { name: '超大型网络 /8', ip: '10.0.0.0', cidr: 8 }
]

const calculate = () => {
  const ip = ipAddress.value.split('.').map(Number)
  const mask = cidr.value

  // 计算子网掩码
  const maskBits = Array(32)
    .fill(0)
    .map((_, i) => (i < mask ? 1 : 0))
  const maskBytes = []
  for (let i = 0; i < 4; i++) {
    maskBytes.push(
      maskBits.slice(i * 8, (i + 1) * 8).reduce((acc, bit) => acc * 2 + bit, 0)
    )
  }

  // 计算网络地址
  const networkBytes = ip.map((byte, i) => byte & maskBytes[i])

  // 计算广播地址
  const hostBits = 32 - mask
  const broadcastBytes = [...networkBytes]
  if (hostBits <= 8) {
    broadcastBytes[3] |= (1 << hostBits) - 1
  } else if (hostBits <= 16) {
    broadcastBytes[2] |= (1 << (hostBits - 8)) - 1
    broadcastBytes[3] = 255
  } else if (hostBits <= 24) {
    broadcastBytes[1] |= (1 << (hostBits - 16)) - 1
    broadcastBytes[2] = 255
    broadcastBytes[3] = 255
  } else {
    broadcastBytes[0] |= (1 << (hostBits - 24)) - 1
    broadcastBytes[1] = 255
    broadcastBytes[2] = 255
    broadcastBytes[3] = 255
  }

  // 计算可用主机范围
  const firstHost = [...broadcastBytes]
  firstHost[3] = networkBytes[3] + 1

  const lastHost = [...broadcastBytes]
  lastHost[3] = broadcastBytes[3] - 1

  // 可用主机数
  const hosts = Math.pow(2, hostBits) - 2

  // 二进制表示
  const toBinary = (bytes) =>
    bytes.map((b) => b.toString(2).padStart(8, '0')).join('.')

  results.value = {
    network: networkBytes.join('.'),
    broadcast: broadcastBytes.join('.'),
    mask: maskBytes.join('.'),
    hosts: hosts > 0 ? hosts : 0,
    firstHost: firstHost.join('.'),
    lastHost: lastHost.join('.'),
    binaryIp: toBinary(ip),
    binaryMask: toBinary(maskBytes),
    binaryNetwork: toBinary(networkBytes)
  }
}

const applyPreset = (preset) => {
  ipAddress.value = preset.ip
  cidr.value = preset.cidr
  calculate()
}

const getSubnetType = (mask) => {
  if (mask <= 8) return 'A 类网络'
  if (mask <= 16) return 'B 类网络'
  if (mask <= 24) return 'C 类网络'
  return '小型子网'
}

const getSubnetClass = (mask) => {
  if (mask <= 8) return 'class-a'
  if (mask <= 16) return 'class-b'
  if (mask <= 24) return 'class-c'
  return 'class-small'
}

const getSubnetDescription = (mask) => {
  if (mask <= 8) return '超大型网络，适合互联网服务提供商'
  if (mask <= 16) return '大型网络，适合公司或机构'
  if (mask <= 24) return '标准网络，适合小型企业或家庭'
  return '小型子网，适合特定部门或用途'
}

// 初始计算
calculate()
</script>

<style scoped>
.subnet-calculator {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.calculator-input {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.input-group {
  flex: 1;
  min-width: 200px;
}

.input-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  display: block;
}

.ip-input,
.cidr-select {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.ip-input:focus,
.cidr-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.calculate-btn {
  padding: 10px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.calculate-btn:hover {
  background: var(--vp-c-brand-dark);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

.result-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
}

.section-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

@media (max-width: 768px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
}

.result-item {
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 6px;
}

.result-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 5px;
}

.result-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.range-display {
  display: flex;
  align-items: center;
  gap: 15px;
}

.range-item {
  flex: 1;
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.range-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 5px;
}

.range-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.range-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.binary-display {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.binary-row {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.binary-label {
  width: 100px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.binary-value {
  flex: 1;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  word-break: break-all;
}

.subnet-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-tag {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.info-tag.class-a {
  background: #fee2e2;
  color: #dc2626;
}

.info-tag.class-b {
  background: #fef3c7;
  color: #d97706;
}

.info-tag.class-c {
  background: #dbeafe;
  color: #2563eb;
}

.info-tag.class-small {
  background: #d1fae5;
  color: #059669;
}

.info-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.example-presets {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.presets-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 768px) {
  .presets-grid {
    grid-template-columns: 1fr;
  }
}

.preset-btn {
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.info-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.info-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
