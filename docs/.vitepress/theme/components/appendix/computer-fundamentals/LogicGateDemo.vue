<template>
  <div class="logic-gate-demo">
    <div class="demo-header">
      <span class="title">逻辑门：用开关做运算</span>
      <span class="subtitle">晶体管组合成基本运算单元</span>
    </div>

    <div class="demo-content">
      <div class="gate-tabs">
        <button 
          v-for="gate in gates" 
          :key="gate.name"
          :class="['tab-btn', { active: activeGate === gate.name }]"
          @click="activeGate = gate.name"
        >
          {{ gate.name }}
        </button>
      </div>

      <div class="gate-display">
        <div class="gate-visual">
          <div class="inputs">
            <div class="input-item">
              <span>A:</span>
              <button 
                class="input-btn" 
                :class="{ on: inputA }"
                @click="inputA = !inputA"
              >
                {{ inputA ? '1' : '0' }}
              </button>
            </div>
            <div class="input-item">
              <span>B:</span>
              <button 
                class="input-btn" 
                :class="{ on: inputB }"
                @click="inputB = !inputB"
              >
                {{ inputB ? '1' : '0' }}
              </button>
            </div>
          </div>

          <div class="gate-symbol">
            <svg
              viewBox="0 0 120 80"
              class="gate-svg"
            >
              <template v-if="activeGate === 'AND'">
                <path
                  d="M20,20 L20,60 L60,60 Q90,60 90,40 Q90,20 60,20 Z"
                  fill="none"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="90"
                  y1="40"
                  x2="110"
                  y2="40"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="0"
                  y1="30"
                  x2="20"
                  y2="30"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="0"
                  y1="50"
                  x2="20"
                  y2="50"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
              </template>
              <template v-else-if="activeGate === 'OR'">
                <path
                  d="M20,20 Q40,40 20,60 Q60,60 90,40 Q60,20 20,20"
                  fill="none"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="90"
                  y1="40"
                  x2="110"
                  y2="40"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="0"
                  y1="30"
                  x2="25"
                  y2="30"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="0"
                  y1="50"
                  x2="25"
                  y2="50"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
              </template>
              <template v-else-if="activeGate === 'NOT'">
                <polygon
                  points="20,20 80,40 20,60"
                  fill="none"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <circle
                  cx="85"
                  cy="40"
                  r="5"
                  fill="none"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="90"
                  y1="40"
                  x2="110"
                  y2="40"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="0"
                  y1="40"
                  x2="20"
                  y2="40"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
              </template>
              <template v-else-if="activeGate === 'XOR'">
                <path
                  d="M25,20 Q45,40 25,60 Q65,60 95,40 Q65,20 25,20"
                  fill="none"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <path
                  d="M15,20 Q35,40 15,60"
                  fill="none"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="95"
                  y1="40"
                  x2="115"
                  y2="40"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="0"
                  y1="30"
                  x2="30"
                  y2="30"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
                <line
                  x1="0"
                  y1="50"
                  x2="30"
                  y2="50"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2"
                />
              </template>
            </svg>
            <div class="gate-name">
              {{ activeGate }}
            </div>
          </div>

          <div class="output">
            <span class="output-label">输出:</span>
            <span
              class="output-value"
              :class="{ on: output }"
            >{{ output ? '1' : '0' }}</span>
          </div>
        </div>

        <div class="truth-table-mini">
          <div class="table-title">
            {{ activeGate }} 真值表
          </div>
          <table>
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>输出</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in currentTruthTable"
                :key="row.a + '-' + row.b" 
                :class="{ highlight: row.a === (inputA ? 1 : 0) && (activeGate === 'NOT' || row.b === (inputB ? 1 : 0)) }"
              >
                <td>{{ row.a }}</td>
                <td>{{ row.b }}</td>
                <td>{{ row.out }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gate-explanation">
        <div class="exp-title">
          {{ currentGate.expTitle }}
        </div>
        <div class="exp-content">
          {{ currentGate.expContent }}
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>逻辑门用晶体管的"开关"组合实现基本运算。AND门像"串联开关"(两个都开才通)，OR门像"并联开关"(任一个开就通)。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeGate = ref('AND')
const inputA = ref(false)
const inputB = ref(false)

const gates = [
  { 
    name: 'AND', 
    expTitle: 'AND门：两个都为1才输出1',
    expContent: '就像串联的两个开关，必须两个都按下灯才会亮。用于"同时满足多个条件"的场景。'
  },
  { 
    name: 'OR', 
    expTitle: 'OR门：任一个为1就输出1',
    expContent: '就像并联的两个开关，按任意一个灯就会亮。用于"满足任一条件"的场景。'
  },
  { 
    name: 'NOT', 
    expTitle: 'NOT门：取反，0变1，1变0',
    expContent: '就像一个反相器，输入开就输出关，输入关就输出开。用于"否定"的场景。'
  },
  { 
    name: 'XOR', 
    expTitle: 'XOR门：相同为0，不同为1',
    expContent: '就像"异或"判断，两个输入不同才输出1。用于比较两个值是否不同。'
  }
]

const currentGate = computed(() => gates.find(g => g.name === activeGate.value))

const output = computed(() => {
  const a = inputA.value
  const b = inputB.value
  switch (activeGate.value) {
    case 'AND': return a && b ? 1 : 0
    case 'OR': return a || b ? 1 : 0
    case 'NOT': return a ? 0 : 1
    case 'XOR': return a !== b ? 1 : 0
    default: return 0
  }
})

const currentTruthTable = computed(() => {
  if (activeGate.value === 'NOT') {
    return [
      { a: 0, b: '-', out: 1 },
      { a: 1, b: '-', out: 0 }
    ]
  }
  const table = []
  for (let a = 0; a <= 1; a++) {
    for (let b = 0; b <= 1; b++) {
      let out = 0
      switch (activeGate.value) {
        case 'AND': out = a && b ? 1 : 0; break
        case 'OR': out = a || b ? 1 : 0; break
        case 'XOR': out = a !== b ? 1 : 0; break
      }
      table.push({ a, b, out })
    }
  }
  return table
})
</script>

<style scoped>
.logic-gate-demo {
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

.gate-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.gate-display {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.gate-visual {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.input-btn {
  width: 36px;
  height: 36px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.input-btn.on {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.gate-symbol {
  width: 120px;
  text-align: center;
}

.gate-svg {
  width: 100%;
  height: 60px;
}

.gate-name {
  font-weight: bold;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  color: var(--vp-c-brand);
}

.output {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.output-label {
  font-size: 0.85rem;
}

.output-value {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.1rem;
}

.output-value.on {
  background: var(--vp-c-success);
  color: white;
  border-color: var(--vp-c-success);
}

.truth-table-mini {
  flex: 1;
  min-width: 150px;
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
  padding: 0.3rem 0.5rem;
  text-align: center;
}

th {
  background: var(--vp-c-bg-alt);
}

tr.highlight {
  background: var(--vp-c-brand-soft);
}

.gate-explanation {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.exp-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.exp-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
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
