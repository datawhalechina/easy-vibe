<template>
  <div class="psw-demo">
    <div class="demo-header">
      <span class="title">程序状态字 (PSW)</span>
      <span class="subtitle">CPU 的"状态指示灯"</span>
    </div>

    <div class="flags-layout">
      <div class="flags-grid">
        <div v-for="flag in flags" :key="flag.name" class="flag-card" :class="{ active: flag.value === 1 }" @click="toggleFlag(flag)">
          <div class="flag-name">{{ flag.name }}</div>
          <div class="flag-value">{{ flag.value }}</div>
          <div class="flag-fullname">{{ flag.fullName }}</div>
        </div>
      </div>
    </div>

    <div class="flag-details" v-if="selectedFlag">
      <div class="details-header">
        <span class="flag-title">{{ selectedFlag.name }} - {{ selectedFlag.fullName }}</span>
      </div>
      <div class="details-content">
        <div class="detail-row">
          <span class="detail-label">英文名：</span>
          <span class="detail-value">{{ selectedFlag.english }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">作用：</span>
          <span class="detail-value">{{ selectedFlag.description }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">设置条件：</span>
          <span class="detail-value">{{ selectedFlag.setCondition }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">用途：</span>
          <span class="detail-value">{{ selectedFlag.usage }}</span>
        </div>
      </div>
    </div>

    <div class="operation-demo">
      <div class="demo-title">运算结果对标志位的影响</div>
      
      <div class="operation-panel">
        <div class="operand-inputs">
          <div class="input-group">
            <label>操作数 A：</label>
            <input type="number" v-model.number="operandA" class="num-input" />
          </div>
          <div class="input-group">
            <label>操作数 B：</label>
            <input type="number" v-model.number="operandB" class="num-input" />
          </div>
        </div>
        
        <div class="operation-buttons">
          <button class="op-btn" @click="calculate('ADD')">A + B</button>
          <button class="op-btn" @click="calculate('SUB')">A - B</button>
          <button class="op-btn" @click="calculate('AND')">A AND B</button>
          <button class="op-btn" @click="calculate('OR')">A OR B</button>
        </div>
        
        <div class="result-display">
          <div class="result-label">运算结果：</div>
          <div class="result-value">{{ result }}</div>
        </div>
        
        <div class="flags-result">
          <div class="result-flags">
            <span v-for="f in flags" :key="f.name" :class="['result-flag', f.value === 1 ? 'set' : 'clear']">
              {{ f.name }}:{{ f.value }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="psw-usage">
      <div class="usage-title">标志位的典型用途</div>
      <div class="usage-grid">
        <div class="usage-card">
          <div class="usage-icon">🔀</div>
          <div class="usage-name">条件跳转</div>
          <div class="usage-desc">JE (相等跳转)、JNE、JG、JL 等指令根据 ZF、SF、OF 决定是否跳转</div>
        </div>
        <div class="usage-card">
          <div class="usage-icon">➕</div>
          <div class="usage-name">算术运算</div>
          <div class="usage-desc">多位数运算需要 CF 判断进位，OF 判断溢出</div>
        </div>
        <div class="usage-card">
          <div class="usage-icon">🔄</div>
          <div class="usage-name">循环控制</div>
          <div class="usage-desc">循环指令使用 ZF 判断循环结束条件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedFlag = ref(null)
const operandA = ref(10)
const operandB = ref(5)
const result = ref(0)

const flags = ref([
  { name: 'CF', fullName: '进位标志', english: 'Carry Flag', value: 0, 
    description: '无符号数运算产生进位或借位时置 1',
    setCondition: '加法产生进位，或减法产生借位',
    usage: '多位数无符号运算、循环计数' },
  { name: 'PF', fullName: '奇偶标志', english: 'Parity Flag', value: 0,
    description: '结果的低 8 位中 1 的个数为偶数时置 1',
    setCondition: '结果低 8 位有偶数个 1',
    usage: '数据通信中的错误检测' },
  { name: 'AF', fullName: '辅助进位', english: 'Auxiliary Carry Flag', value: 0,
    description: '低 4 位产生进位或借位时置 1',
    setCondition: '第 3 位（低 4 位）产生进位',
    usage: 'BCD 码运算调整' },
  { name: 'ZF', fullName: '零标志', english: 'Zero Flag', value: 0,
    description: '运算结果为 0 时置 1',
    setCondition: '结果 = 0',
    usage: '条件跳转、循环控制、比较操作' },
  { name: 'SF', fullName: '符号标志', english: 'Sign Flag', value: 0,
    description: '运算结果为负数时置 1（等于结果最高位）',
    setCondition: '结果最高位 = 1（负数）',
    usage: '有符号数大小比较、负数判断' },
  { name: 'TF', fullName: '陷阱标志', english: 'Trap Flag', value: 0,
    description: '置 1 时 CPU 进入单步调试模式',
    setCondition: '软件设置',
    usage: '程序调试' },
  { name: 'IF', fullName: '中断标志', english: 'Interrupt Flag', value: 1,
    description: '置 1 时 CPU 响应可屏蔽中断',
    setCondition: '软件设置',
    usage: '中断开关' },
  { name: 'DF', fullName: '方向标志', english: 'Direction Flag', value: 0,
    description: '置 1 时字符串操作从高地址向低地址',
    setCondition: '软件设置',
    usage: '字符串操作方向控制' },
  { name: 'OF', fullName: '溢出标志', english: 'Overflow Flag', value: 0,
    description: '有符号数运算结果超出表示范围时置 1',
    setCondition: '正溢出或负溢出',
    usage: '有符号数运算、溢出检测' }
])

const toggleFlag = (flag) => {
  flag.value = flag.value === 1 ? 0 : 1
  selectedFlag.value = flag
}

const calculate = (op) => {
  let res = 0
  
  if (op === 'ADD') {
    res = operandA.value + operandB.value
    
    const unsignedMax = Math.pow(2, 32)
    const signedMin = -Math.pow(2, 31)
    const signedMax = Math.pow(2, 31) - 1
    
    flags.value.find(f => f.name === 'CF').value = res >= unsignedMax ? 1 : 0
    flags.value.find(f => f.name === 'OF').value = (res > signedMax || res < signedMin) ? 1 : 0
    flags.value.find(f => f.name === 'ZF').value = res === 0 ? 1 : 0
    flags.value.find(f => f.name === 'SF').value = res < 0 ? 1 : 0
    
    const low8 = res & 0xFF
    const ones = (low8.toString(2).match(/1/g) || []).length
    flags.value.find(f => f.name === 'PF').value = ones % 2 === 0 ? 1 : 0
    
    flags.value.find(f => f.name === 'AF').value = ((operandA.value & 0xF) + (operandB.value & 0xF)) >= 16 ? 1 : 0
    
  } else if (op === 'SUB') {
    res = operandA.value - operandB.value
    
    flags.value.find(f => f.name === 'CF').value = operandA.value < operandB.value ? 1 : 0
    flags.value.find(f => f.name === 'OF').value = (operandA.value > 0 && operandB.value < 0 && res < 0) || (operandA.value < 0 && operandB.value > 0 && res > 0) ? 1 : 0
    flags.value.find(f => f.name === 'ZF').value = res === 0 ? 1 : 0
    flags.value.find(f => f.name === 'SF').value = res < 0 ? 1 : 0
    
    const low8 = res & 0xFF
    const ones = (low8.toString(2).match(/1/g) || []).length
    flags.value.find(f => f.name === 'PF').value = ones % 2 === 0 ? 1 : 0
    
    flags.value.find(f => f.name === 'AF').value = ((operandA.value & 0xF) - (operandB.value & 0xF)) < 0 ? 1 : 0
    
  } else if (op === 'AND') {
    res = operandA.value & operandB.value
    
    flags.value.find(f => f.name === 'CF').value = 0
    flags.value.find(f => f.name === 'OF').value = 0
    flags.value.find(f => f.name === 'ZF').value = res === 0 ? 1 : 0
    flags.value.find(f => f.name === 'SF').value = (res & 0x80000000) !== 0 ? 1 : 0
    
    const low8 = res & 0xFF
    const ones = (low8.toString(2).match(/1/g) || []).length
    flags.value.find(f => f.name === 'PF').value = ones % 2 === 0 ? 1 : 0
    
  } else if (op === 'OR') {
    res = operandA.value | operandB.value
    
    flags.value.find(f => f.name === 'CF').value = 0
    flags.value.find(f => f.name === 'OF').value = 0
    flags.value.find(f => f.name === 'ZF').value = res === 0 ? 1 : 0
    flags.value.find(f => f.name === 'SF').value = (res & 0x80000000) !== 0 ? 1 : 0
    
    const low8 = res & 0xFF
    const ones = (low8.toString(2).match(/1/g) || []).length
    flags.value.find(f => f.name === 'PF').value = ones % 2 === 0 ? 1 : 0
  }
  
  result.value = res
}
</script>

<style scoped>
.psw-demo {
  background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
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

.flags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

.flag-card {
  padding: 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.flag-card:hover {
  border-color: #14b8a6;
}

.flag-card.active {
  border-color: #14b8a6;
  background: #f0fdfa;
}

.flag-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.flag-value {
  font-size: 24px;
  font-weight: 700;
  color: #64748b;
  margin: 4px 0;
}

.flag-card.active .flag-value {
  color: #14b8a6;
}

.flag-fullname {
  font-size: 10px;
  color: #64748b;
}

.flag-details {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.details-header {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f3f4f6;
}

.flag-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  gap: 8px;
}

.detail-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  min-width: 80px;
}

.detail-value {
  font-size: 12px;
  color: #1e293b;
}

.operation-demo {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.demo-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.operand-inputs {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-group label {
  font-size: 12px;
  color: #475569;
}

.num-input {
  width: 80px;
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
}

.operation-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.op-btn {
  padding: 8px 16px;
  background: #14b8a6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.result-display {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.result-label {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.result-value {
  font-size: 20px;
  font-weight: 700;
  color: #14b8a6;
}

.flags-result {
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.result-flags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.result-flag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.result-flag.set {
  background: #dcfce7;
  color: #16a34a;
}

.result-flag.clear {
  background: #f1f5f9;
  color: #64748b;
}

.psw-usage {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.usage-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.usage-card {
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.usage-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.usage-name {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.usage-desc {
  font-size: 10px;
  color: #64748b;
}
</style>
