<template>
  <div class="bus-demo">
    <div class="demo-header">
      <span class="title">计算机总线系统</span>
      <span class="subtitle">地址总线、数据总线、控制总线</span>
    </div>

    <div class="bus-architecture">
      <div class="cpu-box">
        <div class="component-label">CPU</div>
        <div class="cpu-internal">
          <div class="cu">控制单元</div>
          <div class="alu">运算单元</div>
        </div>
      </div>

      <div class="bus-section">
        <div class="bus-line address-bus" :class="{ active: activeBus === 'address' }">
          <span class="bus-name">地址总线</span>
          <span class="bus-width">32位</span>
          <div class="bus-data" v-if="activeBus === 'address'">{{ addressValue }}</div>
        </div>
        <div class="bus-line data-bus" :class="{ active: activeBus === 'data' }">
          <span class="bus-name">数据总线</span>
          <span class="bus-width">64位</span>
          <div class="bus-data" v-if="activeBus === 'data'">{{ dataValue }}</div>
        </div>
        <div class="bus-line ctrl-bus" :class="{ active: activeBus === 'control' }">
          <span class="bus-name">控制总线</span>
          <span class="bus-width">控制信号</span>
          <div class="bus-data" v-if="activeBus === 'control'">{{ ctrlSignal }}</div>
        </div>
      </div>

      <div class="memory-box">
        <div class="component-label">主存</div>
        <div class="mem-cells">
          <div v-for="i in 8" :key="i" class="mem-cell" :class="{ active: activeMem === i-1 }">
            {{ fmtAddr(i-1) }}
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <div class="operation-group">
        <button class="btn" @click="simulateRead">读取内存</button>
        <button class="btn" @click="simulateWrite">写入内存</button>
      </div>
      <div class="input-group">
        <input v-model.number="addressInput" type="number" placeholder="地址(0-7)" min="0" max="7" class="addr-input" />
        <input v-model.number="dataInput" type="number" placeholder="数据" class="data-input" />
      </div>
    </div>

    <div class="operation-log">
      <div class="log-title">操作流程</div>
      <div class="log-steps">
        <div v-for="(step, i) in logSteps" :key="i" :class="['log-step', step.active ? 'active' : '']">
          <span class="step-num">{{ i + 1 }}</span>
          <span class="step-text">{{ step.text }}</span>
        </div>
      </div>
    </div>

    <div class="bus-explanation">
      <div class="exp-title">总线知识点</div>
      <div class="exp-grid">
        <div class="exp-item">
          <div class="exp-label">地址总线</div>
          <div class="exp-desc">CPU 发送内存地址，单向传输</div>
        </div>
        <div class="exp-item">
          <div class="exp-label">数据总线</div>
          <div class="exp-desc">传输实际数据，双向传输</div>
        </div>
        <div class="exp-item">
          <div class="exp-label">控制总线</div>
          <div class="exp-desc">传输读/写等控制信号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeBus = ref('')
const activeMem = ref(-1)
const addressValue = ref('')
const dataValue = ref('')
const ctrlSignal = ref('')

const addressInput = ref(0)
const dataInput = ref(100)

const logSteps = ref([])

const simulateRead = async () => {
  logSteps.value = []
  addressValue.value = addressInput.value.toString(2).padStart(32, '0').slice(-8)
  
  activeBus.value = 'address'
  logSteps.value.push({ text: `CPU 通过地址总线发送地址 ${addressInput.value}`, active: true })
  await wait(1000)
  
  activeBus.value = 'control'
  ctrlSignal.value = 'READ'
  logSteps.value.push({ text: '控制总线发送 READ 信号', active: true })
  await wait(1000)
  
  activeBus.value = 'data'
  activeMem.value = addressInput.value
  dataValue.value = Math.floor(Math.random() * 256)
  logSteps.value.push({ text: `主存通过数据总线返回数据 ${dataValue.value}`, active: true })
  await wait(1000)
  
  logSteps.value.push({ text: 'CPU 接收数据到寄存器', active: true })
}

const simulateWrite = async () => {
  logSteps.value = []
  addressValue.value = addressInput.value.toString(2).padStart(32, '0').slice(-8)
  dataValue.value = dataInput.value.toString(2).padStart(64, '0').slice(-8)
  
  activeBus.value = 'address'
  logSteps.value.push({ text: `CPU 通过地址总线发送地址 ${addressInput.value}`, active: true })
  await wait(1000)
  
  activeBus.value = 'data'
  logSteps.value.push({ text: `CPU 通过数据总线发送数据 ${dataInput.value}`, active: true })
  await wait(1000)
  
  activeBus.value = 'control'
  ctrlSignal.value = 'WRITE'
  logSteps.value.push({ text: '控制总线发送 WRITE 信号', active: true })
  await wait(1000)
  
  activeMem.value = addressInput.value
  logSteps.value.push({ text: `数据写入主存地址 ${addressInput.value}`, active: true })
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fmtAddr = (addr) => '0x' + addr.toString(16).toUpperCase()
</script>

<style scoped>
.bus-demo {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  margin-left: auto;
}

.bus-architecture {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.cpu-box, .memory-box {
  background: white;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.component-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.cpu-internal {
  display: flex;
  gap: 8px;
}

.cu, .alu {
  padding: 8px 12px;
  background: #e0f2fe;
  border-radius: 4px;
  font-size: 11px;
  color: #0369a1;
}

.bus-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bus-line {
  background: #f1f5f9;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  transition: all 0.3s;
}

.bus-line.active {
  transform: scale(1.02);
}

.address-bus.active { background: #fef3c7; border-left: 3px solid #f59e0b; }
.data-bus.active { background: #dbeafe; border-left: 3px solid #3b82f6; }
.ctrl-bus.active { background: #fce7f3; border-left: 3px solid #ec4899; }

.bus-name {
  font-weight: 600;
  color: #1e293b;
  min-width: 60px;
}

.bus-width {
  color: #64748b;
  font-size: 11px;
}

.bus-data {
  margin-left: auto;
  font-family: monospace;
  font-size: 10px;
  color: #1e293b;
}

.memory-box {
  width: 100px;
}

.mem-cells {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.mem-cell {
  padding: 4px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  text-align: center;
}

.mem-cell.active {
  background: #dbeafe;
  border: 1px solid #3b82f6;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.operation-group {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.btn:hover {
  background: #2563eb;
}

.input-group {
  display: flex;
  gap: 8px;
}

.addr-input, .data-input {
  width: 80px;
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
}

.operation-log {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.log-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.log-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.log-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 12px;
  color: #64748b;
}

.log-step.active {
  background: #dbeafe;
  color: #1e293b;
}

.step-num {
  width: 20px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.step-text {
  flex: 1;
}

.bus-explanation {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.exp-item {
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.exp-label {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.exp-desc {
  font-size: 11px;
  color: #64748b;
}
</style>
