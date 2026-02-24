<template>
  <div class="cpu-registers-demo">
    <div class="demo-header">
      <span class="title">CPU 寄存器组</span>
      <span class="subtitle">CPU 内部的高速存储单元</span>
    </div>

    <div class="registers-layout">
      <!-- 专用寄存器 -->
      <div class="reg-section special-regs">
        <div class="section-title">专用寄存器 (Special Registers)</div>
        <div class="reg-grid">
          <div v-for="reg in specialRegisters" :key="reg.name" class="reg-card" :class="{ active: activeReg === reg.name }" @click="selectReg(reg)">
            <div class="reg-name">{{ reg.name }}</div>
            <div class="reg-value">{{ reg.value }}</div>
            <div class="reg-desc">{{ reg.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 通用寄存器 -->
      <div class="reg-section general-regs">
        <div class="section-title">通用寄存器 (General Purpose Registers)</div>
        <div class="reg-grid">
          <div v-for="reg in generalRegisters" :key="reg.name" class="reg-card small" :class="{ active: activeReg === reg.name }" @click="selectReg(reg)">
            <div class="reg-name">{{ reg.name }}</div>
            <div class="reg-value">{{ reg.value }}</div>
            <div class="reg-desc">{{ reg.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 状态寄存器 -->
      <div class="reg-section status-reg">
        <div class="section-title">程序状态字 (PSW / FLAGS)</div>
        <div class="flags-container">
          <div v-for="flag in statusFlags" :key="flag.name" class="flag-bit" :class="{ set: flag.value === 1 }">
            <span class="flag-name">{{ flag.name }}</span>
            <span class="flag-value">{{ flag.value }}</span>
            <span class="flag-desc">{{ flag.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 寄存器详解 -->
    <div class="reg-details" v-if="selectedReg">
      <div class="details-header">
        <span class="details-title">{{ selectedReg.name }} 寄存器</span>
        <span class="details-type">{{ selectedReg.type }}</span>
      </div>
      <div class="details-content">{{ selectedReg.detail }}</div>
    </div>

    <!-- 寄存器说明 -->
    <div class="register-explanation">
      <div class="exp-title">寄存器 vs 内存</div>
      <div class="exp-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>寄存器</th>
              <th>内存 (RAM)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>位置</td>
              <td>CPU 内部</td>
              <td>CPU 外部</td>
            </tr>
            <tr>
              <td>访问速度</td>
              <td>最快 (&lt; 1ns)</td>
              <td>较慢 (50-100ns)</td>
            </tr>
            <tr>
              <td>容量</td>
              <td>极小 (Bytes)</td>
              <td>大 (GB)</td>
            </tr>
            <tr>
              <td>作用</td>
              <td>暂存指令/操作数/结果</td>
              <td>存储程序和数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeReg = ref('')
const selectedReg = ref(null)

const specialRegisters = ref([
  { name: 'PC', value: '0x00401000', desc: '程序计数器', type: '专用寄存器', detail: 'Program Counter，存放下一条要执行的指令地址。每执行一条指令，PC 自动加 4（32位）或 8（64位），指向下一条指令。' },
  { name: 'IR', value: '0x8B450008', desc: '指令寄存器', type: '专用寄存器', detail: 'Instruction Register，存放当前正在执行的指令。CPU 从内存取指令后，先存入 IR，再送入译码器进行解析。' },
  { name: 'MAR', value: '0x00401000', desc: '内存地址寄存器', type: '专用寄存器', detail: 'Memory Address Register，存放要访问的内存地址。CPU 通过它向地址总线发送内存位置。' },
  { name: 'MDR', value: '0x00000000', desc: '内存数据寄存器', type: '专用寄存器', detail: 'Memory Data Register，临时存放要写入或从内存读取的数据。是 CPU 与内存交换数据的桥梁。' },
  { name: 'ACC', value: '0x0000001A', desc: '累加器', type: '专用寄存器', detail: 'Accumulator，传统 CPU 中最重要的寄存器，用于存放算术运算和逻辑运算的中间结果。' },
])

const generalRegisters = ref([
  { name: 'RAX', value: '0x00000000', desc: '返回值', type: '通用寄存器', detail: '64位寄存器，用于存放函数返回值。低32位为 EAX，低16位为 AX，低8位为 AL。' },
  { name: 'RBX', value: '0x00000000', desc: '基址寄存器', type: '通用寄存器', detail: '64位通用寄存器，可用于存放数据或内存地址。' },
  { name: 'RCX', value: '0x00000000', desc: '计数寄存器', type: '通用寄存器', detail: '64位通用寄存器，常用于循环计数。低32位为 ECX。' },
  { name: 'RDX', value: '0x00000000', desc: '数据寄存器', type: '通用寄存器', detail: '64位通用寄存器，用于存放数据，也用于乘除法指令。' },
  { name: 'RSI', value: '0x00000000', desc: '源索引', type: '通用寄存器', detail: 'Source Index，字符串操作中作为源地址指针。' },
  { name: 'RDI', value: '0x00000000', desc: '目标索引', type: '通用寄存器', detail: 'Destination Index，字符串操作中作为目标地址指针。' },
  { name: 'RBP', value: '0x00000000', desc: '栈帧指针', type: '通用寄存器', detail: 'Base Pointer，指向函数栈帧的基址，用于访问局部变量和函数参数。' },
  { name: 'RSP', value: '0x7FFDE000', desc: '栈指针', type: '通用寄存器', detail: 'Stack Pointer，指向当前栈顶位置。Push 操作减 4，Pop 操作加 4。' },
])

const statusFlags = ref([
  { name: 'CF', value: 0, desc: '进位标志' },
  { name: 'PF', value: 0, desc: '奇偶标志' },
  { name: 'AF', value: 0, desc: '辅助进位' },
  { name: 'ZF', value: 0, desc: '零标志' },
  { name: 'SF', value: 0, desc: '符号标志' },
  { name: 'OF', value: 0, desc: '溢出标志' },
])

const selectReg = (reg) => {
  selectedReg.value = reg
  activeReg.value = reg.name
}
</script>

<style scoped>
.cpu-registers-demo {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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

.registers-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reg-section {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.reg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.reg-card {
  padding: 10px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.reg-card:hover {
  border-color: #3b82f6;
}

.reg-card.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.reg-card.small {
  padding: 8px;
}

.reg-name {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.reg-value {
  font-size: 11px;
  font-family: monospace;
  color: #0369a1;
  margin: 4px 0;
}

.reg-desc {
  font-size: 10px;
  color: #64748b;
}

.status-reg {
  margin-top: 0;
}

.flags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.flag-bit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  background: #f1f5f9;
  border-radius: 4px;
  min-width: 60px;
}

.flag-bit.set {
  background: #dbeafe;
  border: 1px solid #3b82f6;
}

.flag-name {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
}

.flag-value {
  font-size: 16px;
  font-weight: 700;
  color: #64748b;
}

.flag-bit.set .flag-value {
  color: #3b82f6;
}

.flag-desc {
  font-size: 9px;
  color: #64748b;
  text-align: center;
}

.reg-details {
  margin-top: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.details-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.details-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.details-type {
  font-size: 11px;
  padding: 2px 8px;
  background: #e0f2fe;
  border-radius: 4px;
  color: #0369a1;
}

.details-content {
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
}

.register-explanation {
  margin-top: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.exp-table th,
.exp-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.exp-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.exp-table td {
  color: #475569;
}
</style>
