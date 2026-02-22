<template>
  <div class="cpu-architecture-demo">
    <div class="demo-label">
      CPU 核心组件与指令执行周期演示 ── 点击"时钟脉冲"执行一个指令周期
    </div>

    <div class="cpu-container">
      <div class="cpu-frame">
        <h3 class="cpu-title">CPU (中央处理器)</h3>

        <div class="components-grid">
          <!-- Control Unit -->
          <div
            class="cu-box component"
            :class="{ active: currentStage === 1 || currentStage === 2 }"
          >
            <div class="comp-title">控制单元 (CU)</div>
            <div class="comp-state">{{ cuState }}</div>
          </div>

          <!-- ALU -->
          <div
            class="alu-box component"
            :class="{ active: currentStage === 3 }"
          >
            <div class="comp-title">算术逻辑单元 (ALU)</div>
            <div class="comp-state">{{ aluState }}</div>
          </div>

          <!-- Registers -->
          <div
            class="reg-box component"
            :class="{ active: currentStage === 4 }"
          >
            <div class="comp-title">寄存器组</div>
            <div class="reg-list">
              <span class="reg">R0: {{ r0 }}</span>
              <span class="reg">R1: {{ r1 }}</span>
              <span class="reg">PC: {{ pc }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Memory -->
      <div
        class="mem-frame component"
        :class="{ active: currentStage === 1 || currentStage === 4 }"
      >
        <h3 class="cpu-title">内存 (Memory)</h3>
        <div class="mem-list">
          <div class="mem-loc" :class="{ 'hl-mem': pc === 10 }">
            <span class="addr">M[10]</span> 取指：LOAD R0, #5
          </div>
          <div class="mem-loc" :class="{ 'hl-mem': pc === 11 }">
            <span class="addr">M[11]</span> 译码：ADD R1, R0
          </div>
          <div class="mem-loc" :class="{ 'hl-mem': pc === 12 }">
            <span class="addr">M[12]</span> 执行：ALU 计算
          </div>
          <div class="mem-loc" :class="{ 'hl-mem': pc === 13 }">
            <span class="addr">M[13]</span> 写回：将结果保存
          </div>
        </div>
      </div>
    </div>

    <!-- Stages progress -->
    <div class="pipeline">
      <div class="stage" :class="{ active: currentStage === 1 }">
        <span class="step-num">1. Fetch</span>
        <span class="step-desc">取指</span>
      </div>
      <div class="stage" :class="{ active: currentStage === 2 }">
        <span class="step-num">2. Decode</span>
        <span class="step-desc">译码</span>
      </div>
      <div class="stage" :class="{ active: currentStage === 3 }">
        <span class="step-num">3. Execute</span>
        <span class="step-desc">执行</span>
      </div>
      <div class="stage" :class="{ active: currentStage === 4 }">
        <span class="step-num">4. WriteBack</span>
        <span class="step-desc">写回</span>
      </div>
    </div>

    <div class="controls">
      <button class="clock-btn" @click="nextStage">
        <span class="clock-icon">⟳</span> 给一个时钟脉冲 (Next Stage)
      </button>
      <button class="reset-btn" @click="reset">重置</button>
    </div>

    <div class="logic-explain">
      <p>
        当前阶段状态：<strong>{{ statusMsg }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStage = ref(0) // 0 = Idle, 1 = Fetch, 2 = Decode, 3 = Execute, 4 = Writeback
const cycleCount = ref(0)

const pc = ref(10)
const r0 = ref(0)
const r1 = ref(0)

const cuState = ref('等待时钟信号...')
const aluState = ref('空闲')

const instructions = [
  'LOAD R0, #5',
  'LOAD R1, #3',
  'ADD R0, R1',
  'STORE M[14], R0'
]

const statusMsg = computed(() => {
  if (currentStage.value === 0)
    return '系统启动，等待接收时钟脉冲开始运行程序。'
  if (currentStage.value === 1)
    return `CPU 内部的控制单元根据程序计数器 (PC=${pc.value})，从内存取出当前指令。`
  if (currentStage.value === 2)
    return `控制单元翻译指令为硬件控制信号：准备执行操作。`
  if (currentStage.value === 3)
    return `ALU 进行计算或控制流转移，当前在处理实际数据...`
  if (currentStage.value === 4)
    return `将运算结果写入寄存器组或写回内存，更新程序计数器(PC)。`
  return ''
})

function nextStage() {
  if (currentStage.value === 0 || currentStage.value === 4) {
    currentStage.value = 1
    cuState.value = `取指: 读取指令`
    aluState.value = '空闲'
    if (currentStage.value === 4) pc.value++
  } else if (currentStage.value === 1) {
    currentStage.value = 2
    cuState.value = `译码: 准备相关电路`
  } else if (currentStage.value === 2) {
    currentStage.value = 3
    cuState.value = '等待 ALU 结果'
    aluState.value = '计算进行中...'
  } else if (currentStage.value === 3) {
    currentStage.value = 4
    cuState.value = '完成'
    aluState.value = '结果输出'
    // Fake logic update
    if (cycleCount.value === 0) r0.value = 5
    if (cycleCount.value === 1) r1.value = 3
    if (cycleCount.value === 2) r0.value = r0.value + r1.value
    cycleCount.value++
    if (pc.value >= 13) {
      pc.value = 9
    }
  }
}

function reset() {
  currentStage.value = 0
  cycleCount.value = 0
  pc.value = 10
  r0.value = 0
  r1.value = 0
  cuState.value = '等待时钟信号...'
  aluState.value = '空闲'
}
</script>

<style scoped>
.cpu-architecture-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.cpu-container {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.cpu-frame {
  flex: 2;
  border: 2px dashed var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
}

.mem-frame {
  flex: 1;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg-alt);
}

.cpu-title {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  text-align: center;
}

.components-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.component {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0.8rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.component.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.comp-title {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.comp-state {
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  font-family: monospace;
}

.reg-list {
  display: flex;
  gap: 0.5rem;
}
.reg {
  font-family: monospace;
  font-size: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
}

.mem-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
}

.mem-loc {
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.mem-loc.hl-mem {
  background: #fef08a;
  color: #a16207;
  border-color: #a16207;
  font-weight: bold;
}

.addr {
  color: var(--vp-c-text-3);
  margin-right: 0.5rem;
}

/* Pipeline Stages */
.pipeline {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.stage {
  flex: 1;
  text-align: center;
  padding: 0.5rem 0;
  border-right: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.stage:last-child {
  border-right: none;
}

.stage.active {
  background: var(--vp-c-brand-1);
  color: white;
}

.step-num {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.1rem;
}
.step-desc {
  display: block;
  font-size: 0.8rem;
}

/* Controls */
.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.clock-btn,
.reset-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
}

.clock-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
}
.clock-btn:hover {
  background: var(--vp-c-brand-2);
}

.reset-btn {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.logic-explain {
  margin-top: 1rem;
  padding: 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

@media (max-width: 600px) {
  .cpu-container {
    flex-direction: column;
  }
}
</style>
