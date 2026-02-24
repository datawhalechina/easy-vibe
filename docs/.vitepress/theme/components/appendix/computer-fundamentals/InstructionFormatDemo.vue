<template>
  <div class="instruction-format-demo">
    <div class="demo-header">
      <span class="title">机器指令格式</span>
      <span class="subtitle">操作码 + 操作数 = 机器指令</span>
    </div>

    <div class="format-selector">
      <button 
        v-for="fmt in instructionFormats" 
        :key="fmt.type"
        :class="['format-btn', { active: selectedFormat === fmt.type }]"
        @click="selectedFormat = fmt.type"
      >
        {{ fmt.type }}
      </button>
    </div>

    <div class="format-visualization" v-if="selectedFormatData">
      <div class="format-diagram">
        <div 
          v-for="(field, i) in selectedFormatData.fields" 
          :key="i"
          class="field-box"
          :style="{ flex: field.bits }"
        >
          <span class="field-name">{{ field.name }}</span>
          <span class="field-bits">{{ field.bits }}位</span>
        </div>
      </div>
      
      <div class="format-example">
        <div class="example-title">示例指令</div>
        <div class="binary-display">
          <span 
            v-for="(bit, i) in selectedFormatData.example" 
            :key="i"
            class="bit"
            :class="{ highlight: isHighlight(i, selectedFormatData) }"
          >
            {{ bit }}
          </span>
        </div>
        <div class="example-desc">{{ selectedFormatData.description }}</div>
      </div>

      <div class="format-explanation">
        <div class="exp-title">{{ selectedFormatData.type }} 格式说明</div>
        <div class="exp-content">{{ selectedFormatData.explanation }}</div>
        
        <div class="examples-list" v-if="selectedFormatData.examples">
          <div class="list-title">常见指令示例</div>
          <div v-for="ex in selectedFormatData.examples" :key="ex.name" class="example-item">
            <span class="ex-name">{{ ex.name }}</span>
            <span class="ex-desc">{{ ex.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="opcode-table">
      <div class="table-title">常用操作码 (Opcode)</div>
      <div class="opcode-grid">
        <div v-for="op in opcodes" :key="op.code" class="opcode-item">
          <span class="op-code">{{ op.code }}</span>
          <span class="op-name">{{ op.name }}</span>
          <span class="op-desc">{{ op.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedFormat = ref('three-address')

const instructionFormats = ref([
  { 
    type: '零地址', 
    fields: [{ name: '操作码', bits: 8 }],
    example: '01101100',
    description: '操作数隐含在栈顶',
    explanation: '零地址指令只有操作码，操作数隐含在操作数栈中。常用于堆栈计算机，如 ENTER、EXIT 等。',
    examples: [
      { name: 'POP', desc: '弹出栈顶数据' },
      { name: 'PUSH', desc: '压入数据到栈顶' },
      { name: 'CALL', desc: '调用子程序' }
    ]
  },
  { 
    type: '一地址', 
    fields: [
      { name: '操作码', bits: 8 },
      { name: '地址', bits: 24 }
    ],
    example: '01101100 00000001 00000010 00000011',
    description: '一个操作数地址，另一个隐含',
    explanation: '一地址指令有一个操作数在内存/寄存器中，另一个操作数隐含在 ACC（累加器）中。如 INC、DEC 等单操作数指令。',
    examples: [
      { name: 'INC A', desc: 'A = A + 1' },
      { name: 'DEC A', desc: 'A = A - 1' },
      { name: 'NOT A', desc: 'A = ~A' }
    ]
  },
  { 
    type: '二地址', 
    fields: [
      { name: '操作码', bits: 8 },
      { name: '目的地址', bits: 8 },
      { name: '源地址', bits: 8 }
    ],
    example: '01101100 00000001 00000010',
    description: '两个操作数地址，结果存目的地址',
    explanation: '最常用的指令格式。两个操作数地址，结果覆盖目的操作数。如 ADD、SUB、MOV 等。',
    examples: [
      { name: 'MOV R1, R2', desc: 'R1 = R2' },
      { name: 'ADD R1, R2', desc: 'R1 = R1 + R2' },
      { name: 'SUB R1, R2', desc: 'R1 = R1 - R2' }
    ]
  },
  { 
    type: '三地址', 
    fields: [
      { name: '操作码', bits: 8 },
      { name: '目的', bits: 8 },
      { name: '源1', bits: 8 },
      { name: '源2', bits: 8 }
    ],
    example: '01101100 00000001 00000010 00000011',
    description: '结果存新地址，不破坏源操作数',
    explanation: '三个地址分别指定目的操作数和两个源操作数。结果存入目的地址，不改变源操作数。常见于复杂指令集。',
    examples: [
      { name: 'ADD R1, R2, R3', desc: 'R1 = R2 + R3' },
      { name: 'SUB R1, R2, R3', desc: 'R1 = R2 - R3' },
      { name: 'MUL R1, R2, R3', desc: 'R1 = R2 × R3' }
    ]
  }
])

const selectedFormatData = computed(() => {
  return instructionFormats.value.find(f => f.type === selectedFormat.value)
})

const isHighlight = (index, formatData) => {
  const opcodeBits = 8
  return index < opcodeBits
}

const opcodes = ref([
  { code: '00000000', name: 'NOP', desc: '无操作' },
  { code: '00000001', name: 'MOV', desc: '数据传送' },
  { code: '00000010', name: 'ADD', desc: '加法' },
  { code: '00000011', name: 'SUB', desc: '减法' },
  { code: '00000100', name: 'MUL', desc: '乘法' },
  { code: '00000101', name: 'DIV', desc: '除法' },
  { code: '00000110', name: 'AND', desc: '逻辑与' },
  { code: '00000111', name: 'OR', desc: '逻辑或' },
  { code: '00001000', name: 'NOT', desc: '逻辑非' },
  { code: '00001001', name: 'XOR', desc: '异或' },
  { code: '00001010', name: 'SHL', desc: '左移' },
  { code: '00001011', name: 'SHR', desc: '右移' },
  { code: '00001100', name: 'JMP', desc: '无条件跳转' },
  { code: '00001101', name: 'JE', desc: '相等跳转' },
  { code: '00001110', name: 'JNE', desc: '不等跳转' },
  { code: '00001111', name: 'CALL', desc: '调用子程序' },
  { code: '00010000', name: 'RET', desc: '返回' },
  { code: '00010001', name: 'PUSH', desc: '压栈' },
  { code: '00010010', name: 'POP', desc: '出栈' },
  { code: '00010011', name: 'LOAD', desc: '从内存加载' },
  { code: '00010100', name: 'STORE', desc: '存入内存' }
])
</script>

<style scoped>
.instruction-format-demo {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
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

.format-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.format-btn {
  padding: 8px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.format-btn.active {
  border-color: #22c55e;
  background: #dcfce7;
  color: #166534;
}

.format-visualization {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.format-diagram {
  display: flex;
  gap: 2px;
  margin-bottom: 16px;
}

.field-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  background: #e0f2fe;
  border-radius: 4px;
  text-align: center;
}

.field-box:first-child {
  background: #fef3c7;
}

.field-name {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
}

.field-bits {
  font-size: 10px;
  color: #64748b;
}

.format-example {
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  margin-bottom: 12px;
}

.example-title {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.binary-display {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 8px;
}

.bit {
  padding: 4px 6px;
  background: #e2e8f0;
  border-radius: 2px;
  font-family: monospace;
  font-size: 12px;
  color: #475569;
}

.bit.highlight {
  background: #fef3c7;
  font-weight: 600;
}

.example-desc {
  font-size: 11px;
  color: #64748b;
}

.format-explanation {
  padding: 12px;
  background: #f0f9ff;
  border-radius: 6px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-content {
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
}

.examples-list {
  margin-top: 12px;
}

.list-title {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.example-item {
  display: flex;
  gap: 12px;
  padding: 4px 0;
  font-size: 11px;
}

.ex-name {
  font-family: monospace;
  color: #0369a1;
  min-width: 80px;
}

.ex-desc {
  color: #64748b;
}

.opcode-table {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.table-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.opcode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.opcode-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 11px;
}

.op-code {
  font-family: monospace;
  padding: 2px 6px;
  background: #e0f2fe;
  border-radius: 2px;
  color: #0369a1;
}

.op-name {
  font-weight: 600;
  color: #1e293b;
  min-width: 40px;
}

.op-desc {
  color: #64748b;
}
</style>
