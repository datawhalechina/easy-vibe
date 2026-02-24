<template>
  <div class="addressing-mode-demo">
    <div class="demo-header">
      <span class="title">寻址方式</span>
      <span class="subtitle">如何找到操作数的位置</span>
    </div>

    <div class="mode-selector">
      <button 
        v-for="mode in addressingModes" 
        :key="mode.name"
        :class="['mode-btn', { active: selectedMode === mode.name }]"
        @click="selectMode(mode)"
      >
        {{ mode.name }}
      </button>
    </div>

    <div class="mode-details" v-if="selectedModeData">
      <div class="detail-header">
        <span class="mode-name">{{ selectedModeData.name }}</span>
        <span class="mode-english">{{ selectedModeData.english }}</span>
      </div>
      
      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">定义</div>
          <div class="section-content">{{ selectedModeData.definition }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">指令格式</div>
          <div class="instruction-example">
            <code>{{ selectedModeData.format }}</code>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">示例</div>
          <div class="example-code">
            <div class="code-line">{{ selectedModeData.example.assembly }}</div>
            <div class="code-desc">{{ selectedModeData.example.description }}</div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">执行过程</div>
          <div class="execution-flow">
            <div v-for="(step, i) in selectedModeData.steps" :key="i" class="flow-step">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">特点</div>
          <div class="characteristics">
            <div class="char-item" :class="selectedModeData.fast ? 'fast' : 'slow'">
              <span class="char-label">速度</span>
              <span class="char-value">{{ selectedModeData.fast ? '快' : '慢' }}</span>
            </div>
            <div class="char-item">
              <span class="char-label">灵活性</span>
              <span class="char-value">{{ selectedModeData.flexibility }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">寻址方式对比</div>
      <table>
        <thead>
          <tr>
            <th>寻址方式</th>
            <th>格式</th>
            <th>速度</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in addressingModes" :key="mode.name">
            <td>{{ mode.name }}</td>
            <td><code>{{ mode.format }}</code></td>
            <td :class="mode.fast ? 'fast' : 'slow'">{{ mode.fast ? '最快' : '较快' }}</td>
            <td>{{ mode.usage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMode = ref('立即数寻址')
const selectedModeData = ref(null)

const addressingModes = ref([
  {
    name: '立即数寻址',
    english: 'Immediate Addressing',
    definition: '操作数直接包含在指令中，作为指令的一部分立即可用',
    format: 'MOV R1, #100',
    usage: '常数赋值、初始化',
    fast: true,
    flexibility: '低',
    example: {
      assembly: 'MOV R1, #100  ; R1 = 100',
      description: '立即数 100 直接存在于指令中，无需访问任何寄存器或内存'
    },
    steps: [
      'CPU 从指令中直接读取立即数 100',
      '将立即数写入目标寄存器 R1',
      '执行完成，无需额外内存访问'
    ]
  },
  {
    name: '寄存器寻址',
    english: 'Register Addressing',
    definition: '操作数位于 CPU 内部的寄存器中',
    format: 'MOV R1, R2',
    usage: '寄存器间数据传送',
    fast: true,
    flexibility: '中',
    example: {
      assembly: 'MOV R1, R2  ; R1 = R2',
      description: '从源寄存器 R2 读取数据，存入目标寄存器 R1'
    },
    steps: [
      'CPU 从寄存器组中读取 R2 的值',
      '将值写入目标寄存器 R1',
      '执行完成，无需访问内存'
    ]
  },
  {
    name: '直接寻址',
    english: 'Direct Addressing',
    definition: '指令中直接给出操作数的内存地址',
    format: 'MOV R1, [100]',
    usage: '访问全局变量',
    fast: false,
    flexibility: '高',
    example: {
      assembly: 'MOV R1, [0x1000]  ; R1 = M[0x1000]',
      description: '指令中包含内存地址 0x1000，从该地址读取数据'
    },
    steps: [
      'CPU 从指令中解析出地址 0x1000',
      '将地址送入 MAR（内存地址寄存器）',
      '访问内存，从地址 0x1000 读取数据到 MDR',
      '将数据从 MDR 写入目标寄存器 R1'
    ]
  },
  {
    name: '间接寻址',
    english: 'Indirect Addressing',
    definition: '指令中给出寄存器，寄存器中存放操作数的地址',
    format: 'MOV R1, [R2]',
    usage: '指针操作、数组遍历',
    fast: false,
    flexibility: '高',
    example: {
      assembly: 'MOV R1, [R2]  ; R1 = M[R2]',
      description: 'R2 中存放地址，从该地址读取数据'
    },
    steps: [
      'CPU 从寄存器 R2 中读取地址',
      '将地址送入 MAR',
      '访问内存，读取数据到 MDR',
      '将数据写入目标寄存器 R1'
    ]
  },
  {
    name: '变址寻址',
    english: 'Indexed Addressing',
    definition: '指令中给出基地址加上变址寄存器的值作为操作数地址',
    format: 'MOV R1, [R2 + R3]',
    usage: '数组访问、循环',
    fast: false,
    flexibility: '高',
    example: {
      assembly: 'MOV R1, [R2 + R3]  ; R1 = M[R2+R3]',
      description: '有效地址 = R2 + R3，用于数组元素访问'
    },
    steps: [
      'CPU 读取基地址寄存器 R2 的值',
      'CPU 读取变址寄存器 R3 的值',
      'ALU 计算有效地址 = R2 + R3',
      '将有效地址送入 MAR',
      '访问内存，读取数据到 MDR',
      '将数据写入目标寄存器 R1'
    ]
  },
  {
    name: '基址寻址',
    english: 'Based Addressing',
    definition: '指令中给出基址寄存器加上偏移量作为操作数地址',
    format: 'MOV R1, [R2 + 100]',
    usage: '结构体访问、函数参数',
    fast: false,
    flexibility: '高',
    example: {
      assembly: 'MOV R1, [RBP - 8]  ; 访问栈帧中的局部变量',
      description: '有效地址 = RBP - 8，用于访问函数栈帧中的变量'
    },
    steps: [
      'CPU 读取基址寄存器 RBP 的值',
      '计算有效地址 = RBP - 8',
      '将有效地址送入 MAR',
      '访问内存，读取数据'
    ]
  },
  {
    name: '相对寻址',
    english: 'Relative Addressing',
    definition: '操作数地址是当前指令地址加上一个偏移量',
    format: 'JMP LABEL',
    usage: '循环、条件跳转',
    fast: true,
    flexibility: '高',
    example: {
      assembly: 'JMP LOOP  ; 跳转到 LOOP 标签处',
      description: '跳转目标地址 = PC + 偏移量，用于循环和分支'
    },
    steps: [
      'CPU 计算跳转目标地址 = 当前 PC + 偏移量',
      '将目标地址写入 PC',
      '下一条指令从新地址开始执行'
    ]
  }
])

const selectMode = (mode) => {
  selectedMode.value = mode.name
  selectedModeData.value = mode
}
</script>

<style scoped>
.addressing-mode-demo {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
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

.mode-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn {
  padding: 8px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.mode-btn.active {
  border-color: #f59e0b;
  background: #fef3c7;
}

.mode-details {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.mode-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.mode-english {
  font-size: 13px;
  color: #64748b;
}

.detail-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.section-content {
  font-size: 14px;
  color: #1e293b;
  line-height: 1.6;
}

.instruction-example {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 4px;
}

.instruction-example code {
  font-family: monospace;
  font-size: 14px;
  color: #0369a1;
}

.example-code {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 4px;
}

.code-line {
  font-family: monospace;
  font-size: 13px;
  color: #0369a1;
  margin-bottom: 4px;
}

.code-desc {
  font-size: 12px;
  color: #64748b;
}

.execution-flow {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 4px;
}

.step-num {
  width: 24px;
  height: 24px;
  background: #f59e0b;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.step-text {
  font-size: 13px;
  color: #475569;
}

.characteristics {
  display: flex;
  gap: 16px;
}

.char-item {
  padding: 8px 16px;
  background: #f8fafc;
  border-radius: 6px;
}

.char-label {
  font-size: 11px;
  color: #64748b;
  display: block;
}

.char-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.char-item.fast .char-value {
  color: #16a34a;
}

.char-item.slow .char-value {
  color: #ea580c;
}

.comparison-table {
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

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.comparison-table th,
.comparison-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.comparison-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.comparison-table td {
  color: #475569;
}

.comparison-table code {
  font-size: 11px;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 2px;
}

.fast {
  color: #16a34a;
}

.slow {
  color: #ea580c;
}
</style>
