<template>
  <div class="pipeline-demo">
    <div class="demo-header">
      <span class="title">CPU 指令流水线</span>
      <span class="subtitle">五级流水线：取指 → 译码 → 执行 → 访存 → 写回</span>
    </div>

    <div class="control-panel">
      <button class="btn" @click="startPipeline" :disabled="isRunning">开始执行</button>
      <button class="btn" @click="stepPipeline" :disabled="isRunning">单步执行</button>
      <button class="btn" @click="resetPipeline">重置</button>
      <select v-model="selectedMode" class="mode-select">
        <option value="sequential">顺序执行</option>
        <option value="pipeline">流水线执行</option>
      </select>
    </div>

    <div class="pipeline-visualization">
      <div class="stage-header">
        <div v-for="stage in stages" :key="stage" class="stage-label">{{ stage }}</div>
      </div>

      <div class="instruction-grid">
        <div v-for="(inst, i) in instructions" :key="i" class="instruction-row">
          <div class="inst-label">{{ inst }}</div>
          <div v-for="(stage, j) in stages" :key="j" class="stage-cell">
            <div v-if="isActive(i, j)" :class="['pipeline-box', currentStageClass(i, j)]">
              {{ inst }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-panel">
      <div class="stat-item">
        <span class="stat-label">总周期数</span>
        <span class="stat-value">{{ totalCycles }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">已完成指令</span>
        <span class="stat-value">{{ completedInstructions }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">CPI</span>
        <span class="stat-value">{{ cpi }}</span>
      </div>
    </div>

    <div class="pipeline-explanation">
      <div class="explanation-title">流水线原理</div>
      <div class="explanation-content">
        <p><strong>顺序执行：</strong>每条指令执行完才执行下一条，N条指令需要 N × 5 个周期</p>
        <p><strong>流水线执行：</strong>多条指令同时处于不同阶段，理想情况下 CPI ≈ 1</p>
        <div class="hazard-warning" v-if="showHazard">
          ⚠️ 流水线冒险：数据冒险、控制冒险、结构冒险
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stages = ['取指(IF)', '译码(ID)', '执行(EX)', '访存(MEM)', '写回(WB)']
const instructions = ref(['ADD R1,R2,R3', 'SUB R4,R1,R5', 'LOAD R6,[R4]', 'STORE R6,[R7]', 'AND R8,R1,R6'])

const selectedMode = ref('pipeline')
const currentCycle = ref(-1)
const isRunning = ref(false)
const showHazard = ref(false)

const pipelineState = ref([])

const startPipeline = () => {
  isRunning.value = true
  currentCycle.value = -1
  runCycle()
}

const runCycle = () => {
  if (currentCycle.value >= 20) {
    isRunning.value = false
    return
  }
  currentCycle.value++
  setTimeout(runCycle, 800)
}

const stepPipeline = () => {
  if (currentCycle.value < 20) {
    currentCycle.value++
  }
}

const resetPipeline = () => {
  currentCycle.value = -1
  isRunning.value = false
  showHazard.value = false
}

const isActive = (instIdx, stageIdx) => {
  if (selectedMode.value === 'sequential') {
    return currentCycle.value >= 0 && instIdx === Math.floor(currentCycle.value / 5) && stageIdx === currentCycle.value % 5
  } else {
    const offset = instIdx * 5
    return currentCycle.value >= offset && currentCycle.value < offset + 5 && stageIdx === currentCycle.value - offset
  }
}

const currentStageClass = (instIdx, stageIdx) => {
  if (!isActive(instIdx, stageIdx)) return ''
  return 'stage-' + stageIdx
}

const totalCycles = computed(() => {
  if (currentCycle.value < 0) return 0
  if (selectedMode.value === 'sequential') {
    return (currentCycle.value + 1)
  } else {
    return currentCycle.value + 1
  }
})

const completedInstructions = computed(() => {
  if (currentCycle.value < 0) return 0
  if (selectedMode.value === 'sequential') {
    return Math.floor((currentCycle.value + 1) / 5)
  } else {
    return Math.max(0, currentCycle.value - 4)
  }
})

const cpi = computed(() => {
  if (completedInstructions.value === 0) return 0
  return (totalCycles.value / completedInstructions.value).toFixed(2)
})
</script>

<style scoped>
.pipeline-demo {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
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

.control-panel {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  font-size: 13px;
}

.btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.mode-select {
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-left: auto;
}

.pipeline-visualization {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.stage-header {
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.stage-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-align: center;
}

.instruction-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.instruction-row {
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  gap: 4px;
}

.inst-label {
  font-size: 12px;
  color: #1e293b;
  padding: 4px;
}

.stage-cell {
  height: 28px;
  background: #f8fafc;
  border-radius: 4px;
}

.pipeline-box {
  height: 100%;
  border-radius: 4px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
}

.stage-0 { background: #f97316; }
.stage-1 { background: #eab308; }
.stage-2 { background: #22c55e; }
.stage-3 { background: #3b82f6; }
.stage-4 { background: #8b5cf6; }

.stats-panel {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 16px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  display: block;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.pipeline-explanation {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.explanation-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.explanation-content p {
  font-size: 12px;
  color: #475569;
  margin: 4px 0;
}

.hazard-warning {
  margin-top: 8px;
  padding: 8px;
  background: #fef3c7;
  border-radius: 6px;
  font-size: 12px;
  color: #92400e;
}
</style>
