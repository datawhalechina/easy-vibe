<template>
  <div class="flip-flop-wrapper">
    <div class="header">
      <div class="title">从触发器到寄存器：记忆的闭环机制</div>
      <div class="desc">试着改变数据并观察，没有时钟信号的允许，输出重新反馈回输入端的"闭环"长久保护了记忆。</div>
    </div>
    
    <div class="interactive-panel">
      <!-- Left side: Controllable Data inputs -->
      <div class="data-input-sec">
        <div class="sec-label">数据总线 (Data Input)</div>
        <div class="bus-lines">
          <div 
            v-for="(bit, idx) in inputBits" :key="'in'+idx" 
            class="input-node"
            :class="{ active: bit === 1 }"
            @click="toggleInput(idx)"
          >
            {{ bit }}
            <span v-if="bit === 1" class="pulse-ring"></span>
          </div>
        </div>
      </div>

      <!-- Arrow indicating flow, blocked by a 'gate' if no clock -->
      <div class="gate-sec">
        <div class="sec-label transparent">大门</div>
        <div class="gate-door-container">
          <div class="flow-paths">
            <div v-for="(bit, idx) in inputBits" :key="'path'+idx" class="flow-line" :class="{ active: bit === 1, open: isClockPulsing }">
              <span v-if="bit === 1 && isClockPulsing" class="data-particle"></span>
            </div>
          </div>
          <div class="gate-door" :class="{ open: isClockPulsing }">
            <span v-if="!isClockPulsing" class="lock-icon">🔒</span>
            <span v-else class="lock-icon">🔓</span>
          </div>
        </div>
      </div>

      <!-- Right side: The flip-flops (registers) -->
      <div class="register-sec" :class="{ writing: isClockPulsing }">
        <div class="sec-label">4位寄存器 (存储状态)</div>
        <div class="stored-bits">
          <div 
            v-for="(bit, idx) in storedBits" :key="'s'+idx" 
            class="store-node-wrapper"
          >
            <div class="store-node" :class="{ active: bit === 1 }">
              {{ bit }}
            </div>
            <!-- Individual loop for each bit to vividly show Feedback -->
            <svg class="node-loop" viewBox="0 0 50 50" aria-hidden="true">
               <path d="M 40 25 C 50 25 50 45 25 45 C 0 45 0 25 10 25" fill="none" class="loop-stroke" :class="{ active: bit === 1 }" stroke-width="2.5" />
               <polygon points="6,20 6,30 14,25" class="loop-arrow" :class="{ active: bit === 1 }" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Clock button at bottom -->
    <div class="clock-sec">
      <div class="sec-label">控制中心</div>
      <button class="clock-btn" :class="{ active: isClockPulsing }" @click="triggerClock">
        <span class="icon">⚡</span> 发送时钟脉冲 (Clock)
      </button>
      <div class="status-msg">
        <strong :class="{ 'warning-text': pendingChanges, 'success-text': !pendingChanges && !isClockPulsing, 'action-text': isClockPulsing }">
          {{ statusMessage }}
        </strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputBits = ref([1, 0, 1, 0])
const storedBits = ref([0, 0, 0, 0])
const isClockPulsing = ref(false)
const manualStatus = ref('')

const pendingChanges = computed(() => {
  return inputBits.value.join('') !== storedBits.value.join('')
})

const statusMessage = computed(() => {
  if (isClockPulsing.value) {
    return '脉冲到达！突破闭环防线，正并行读入新数据...'
  }
  if (manualStatus.value) return manualStatus.value;
  return '尝试改变左侧输入，闭环保护期间寄存器值无法更改。'
})

const toggleInput = (idx) => {
  inputBits.value[idx] = inputBits.value[idx] === 1 ? 0 : 1
  if (pendingChanges.value) {
    manualStatus.value = '准备写入新数据，请点击"发送时钟脉冲"打破锁死。'
  } else {
    manualStatus.value = '输入总线与当前存储状态相同。'
  }
}

const triggerClock = () => {
  if (isClockPulsing.value) return
  isClockPulsing.value = true
  manualStatus.value = ''
  
  // lock in the data exactly halfway through animation
  setTimeout(() => {
    storedBits.value = [...inputBits.value]
  }, 150)

  setTimeout(() => {
    isClockPulsing.value = false
    if (pendingChanges.value) {
      manualStatus.value = '闭环重新生效，但还有未写入的新数据？'
    } else {
      manualStatus.value = '脉冲消退。反馈闭环恢复，当前状态被长久稳固保存。'
    }
  }, 600)
}
</script>

<style scoped>
.flip-flop-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
}

.header .title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.header .desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.4rem;
  line-height: 1.4;
}

.sec-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.8rem;
  text-align: center;
}
.transparent {
  opacity: 0;
  user-select: none;
}

.interactive-panel {
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  gap: 1.5rem;
  background: var(--vp-c-bg-alt);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider-light);
}

.data-input-sec, .register-sec {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bus-lines, .stored-bits {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.input-node, .store-node {
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  z-index: 2;
}

/* Inputs */
.input-node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.input-node:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateX(2px);
}
.input-node.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.pulse-ring {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 8px;
  box-shadow: 0 0 10px var(--vp-c-brand-1);
  animation: static-pulse 2s infinite;
  z-index: -1;
  opacity: 0.5;
}
@keyframes static-pulse {
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}

/* Stored */
.store-node-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.store-node {
  background: var(--vp-c-bg);
  border: 2px dashed var(--vp-c-divider);
  color: var(--vp-c-text-2);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}
.store-node.active {
  border-style: solid;
  background: rgba(16, 185, 129, 0.08);
  border-color: #10b981;
  color: #10b981;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}

/* Loop Animation */
.node-loop {
  position: absolute;
  bottom: -40px;
  width: 45px;
  height: 45px;
  z-index: 1;
}
.loop-stroke {
  stroke: var(--vp-c-divider);
  stroke-dasharray: 4;
  animation: loop-march 2s linear infinite;
  transition: all 0.3s;
}
.loop-stroke.active {
  stroke: #10b981;
}
.loop-arrow {
  fill: var(--vp-c-divider);
  transition: all 0.3s;
}
.loop-arrow.active {
  fill: #10b981;
}
@keyframes loop-march {
  from { stroke-dashoffset: 8; }
  to { stroke-dashoffset: 0; }
}

.register-sec.writing .store-node {
  transform: scale(1.1);
  border-color: #eab308;
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.4);
}


/* Gate Section */
.gate-sec {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}
.gate-door-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  position: relative;
}

.flow-paths {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  justify-content: flex-start;
  padding-top: 1.4rem; 
  height: 100%;
}
.flow-line {
  height: 0;
  width: 100%;
  border-bottom: 2px solid var(--vp-c-divider);
  opacity: 0.2;
  position: relative;
  transition: all 0.3s;
}
.flow-line.active {
  border-bottom-color: var(--vp-c-brand-1);
  opacity: 0.5;
}
.flow-line.open.active {
  opacity: 1;
}

.data-particle {
  position: absolute;
  top: -4px;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--vp-c-brand-1);
  animation: slide-across 0.3s linear forwards;
}
@keyframes slide-across {
  0% { left: 0; }
  100% { left: 100%; }
}

.gate-door {
  position: absolute;
  top: 10px;
  bottom: 10px;
  width: 8px;
  background: var(--vp-c-danger-1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.gate-door.open {
  transform: translateY(-80px);
  opacity: 0;
  background: #eab308;
}

.lock-icon {
  position: absolute;
  left: -9px;
  font-size: 1.2rem;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  padding: 2px;
}


/* Clock Section */
.clock-sec {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(234, 179, 8, 0.05);
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid rgba(234, 179, 8, 0.2);
}

.clock-btn {
  background: var(--vp-c-bg);
  border: 2px solid #eab308;
  color: #c2410c;
  padding: 0.6rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(234, 179, 8, 0.15);
}
.dark .clock-btn {
  color: #fde047;
}
.clock-btn:hover {
  background: #eab308;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(234, 179, 8, 0.3);
}
.clock-btn.active {
  background: #eab308;
  color: white;
  transform: scale(0.95);
}
.icon {
  font-size: 1.2rem;
}

.status-msg {
  margin-top: 1rem;
  font-size: 0.85rem;
  text-align: center;
}
.warning-text { color: var(--vp-c-warning-1); }
.success-text { color: var(--vp-c-success-1); transition: color 0.3s; }
.action-text { color: #eab308; }

@media (max-width: 600px) {
  .interactive-panel {
    flex-direction: column;
    align-items: center;
  }
  .gate-sec {
    height: 40px;
    width: 60%;
  }
  .gate-door {
    top: 50%; bottom: auto;
    width: 100%; height: 8px;
    left: 0; right: 0;
    transform: translateY(-50%);
  }
  .gate-door.open {
    transform: translateY(-50%) translateX(-100px);
  }
  .flow-paths {
    flex-direction: row; height: 100%; width: 100%;
    align-items: center; justify-content: space-evenly;
    padding-top: 0;
  }
  .flow-line {
    width: 0; height: 100%;
    border-bottom: none; border-right: 2px solid var(--vp-c-divider);
  }
  .flow-line.active { border-right-color: var(--vp-c-brand-1); }
  .data-particle {
    top: 0; left: -4px;
    animation: slide-down 0.3s linear forwards;
  }
  @keyframes slide-down {
    0% { top: 0; left: -4px; }
    100% { top: 100%; left: -4px; }
  }
  .bus-lines, .stored-bits {
    flex-direction: row; justify-content: center; flex-wrap: wrap; gap: 0.8rem;
  }
  .node-loop { display: none; /* Hide loops on mobile to avoid layout breaking */ }
}
</style>
