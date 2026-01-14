<!--
  FlowDiagram.vue
  输入输出流程图组件
  
  用途：
  可视化展示一次按键从物理键盘到屏幕显示的完整“往返旅程” (Round Trip)。
  将复杂的系统流程（键盘 -> 操作系统 -> 终端 -> 程序 -> 终端 -> 屏幕）抽象为清晰的图表。
  
  交互功能：
  - 静态展示：清晰的 SVG 或 CSS 流程图。
  - 节点说明：鼠标悬停可查看每个环节的具体解释。
-->
<template>
  <div class="flow-diagram">
    <div class="stack-col">
      <div class="stack-label">TERMINAL STACK</div>
      
      <div class="stack-box kbd" :class="{ active: activeStage === 'kbd' }">
        <div class="box-header">
          <span class="box-icon">[kbd]</span>
          <span class="box-title">You (Keyboard)</span>
        </div>
        <div class="box-desc">Physical keystrokes</div>
      </div>

      <div class="arrow">↓ / ↑</div>

      <div class="stack-box tty" :class="{ active: activeStage === 'tty' }">
        <div class="box-header">
          <span class="box-icon">[tty]</span>
          <span class="box-title">Terminal Emulator</span>
        </div>
        <div class="box-desc">Encodes input, renders output</div>
      </div>

      <div class="arrow">↓ / ↑</div>

      <div class="stack-box pty" :class="{ active: activeStage === 'pty' }">
        <div class="box-header">
          <span class="box-icon">[pty]</span>
          <span class="box-title">PTY (Pseudo-Terminal)</span>
        </div>
        <div class="box-desc">Bidirectional pipe</div>
      </div>

      <div class="arrow">↓ / ↑</div>

      <div class="stack-box sh" :class="{ active: activeStage === 'sh' }">
        <div class="box-header">
          <span class="box-icon">[sh]</span>
          <span class="box-title">Shell / Program</span>
        </div>
        <div class="box-desc">bash, zsh, or any CLI program</div>
      </div>
    </div>

    <div class="output-col">
      <div class="output-label">OUTPUT</div>
      
      <div class="terminal-preview">
        <div class="term-header">
          <span></span><span></span><span></span>
        </div>
        <div class="term-body">
          <span class="prompt">$ </span>
          <span class="typed-text">{{ displayText }}</span>
          <span class="cursor" :class="{ blinking: !isAnimating }"></span>
        </div>
      </div>

      <div class="status-box">
        <div class="status-title" :class="statusColor">{{ statusTitle }}</div>
        <div class="status-desc">{{ statusDesc }}</div>
      </div>

      <div class="controls">
        <button class="play-btn" @click="startAnimation" :disabled="isAnimating">
          {{ isAnimating ? 'Simulating...' : 'Simulate Keystroke' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref(null)
const isAnimating = ref(false)
const displayText = ref('')
const statusTitle = ref('Ready')
const statusDesc = ref('The terminal is waiting. The cursor blinks.')

const statusColor = computed(() => {
  if (statusTitle.value === 'Ready') return 'text-red'
  return 'text-green'
})

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const startAnimation = async () => {
  if (isAnimating.value) return
  isAnimating.value = true
  displayText.value = ''
  
  // Stage 1: Keyboard
  activeStage.value = 'kbd'
  statusTitle.value = 'Input'
  statusDesc.value = 'Key "l" pressed. Physical event generated.'
  await sleep(800)

  // Stage 2: Terminal Emulator
  activeStage.value = 'tty'
  statusDesc.value = 'Terminal encodes key to byte 0x6C.'
  await sleep(800)

  // Stage 3: PTY
  activeStage.value = 'pty'
  statusDesc.value = 'Bytes travel through the pseudo-terminal pipe.'
  await sleep(800)

  // Stage 4: Shell
  activeStage.value = 'sh'
  statusTitle.value = 'Processing'
  statusDesc.value = 'Shell receives 0x6C, decides to echo it back.'
  await sleep(800)

  // Return Trip
  // Stage 3: PTY
  activeStage.value = 'pty'
  statusTitle.value = 'Output'
  statusDesc.value = 'Shell sends 0x6C back through PTY.'
  await sleep(600)

  // Stage 2: Terminal Emulator
  activeStage.value = 'tty'
  statusDesc.value = 'Terminal receives 0x6C, renders "l" character.'
  displayText.value = 'l'
  await sleep(600)

  // Finish
  activeStage.value = null
  statusTitle.value = 'Ready'
  statusDesc.value = 'The terminal is waiting. The cursor blinks.'
  isAnimating.value = false
}
</script>

<style scoped>
.flow-diagram {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: #0a0a0a;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #333;
  font-family: 'Menlo', monospace;
  color: #ccc;
}

.stack-col, .output-col {
  display: flex;
  flex-direction: column;
}

.stack-label, .output-label {
  color: #eab308;
  font-size: 12px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.stack-box {
  background: #111;
  border: 1px solid #333;
  padding: 15px;
  border-radius: 4px;
  transition: all 0.3s;
  opacity: 0.5;
}

.stack-box.active {
  opacity: 1;
  border-color: #22c55e;
  background: #1a1a1a;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
}

.box-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.box-icon {
  color: #666;
  margin-right: 10px;
  font-size: 12px;
}

.box-title {
  font-weight: bold;
  color: #fff;
}

.box-desc {
  color: #666;
  font-size: 12px;
  margin-left: 40px;
}

.arrow {
  text-align: center;
  color: #444;
  margin: 10px 0;
  font-size: 12px;
}

.terminal-preview {
  background: #000;
  border: 1px solid #333;
  border-radius: 6px;
  height: 200px;
  margin-bottom: 20px;
}

.term-header {
  padding: 8px;
  border-bottom: 1px solid #222;
}

.term-header span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #333;
  margin-right: 5px;
}

.term-body {
  padding: 15px;
  font-size: 16px;
  color: #fff;
}

.prompt { color: #888; }
.typed-text { color: #22c55e; }

.cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #22c55e;
  vertical-align: middle;
  margin-left: 2px;
}

.cursor.blinking {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.status-box {
  background: #111;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #333;
  margin-bottom: 20px;
}

.status-title {
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
}

.status-desc {
  color: #888;
  font-size: 13px;
  line-height: 1.5;
}

.text-red { color: #ef4444; }
.text-green { color: #22c55e; }

.play-btn {
  width: 100%;
  padding: 12px;
  background: #22c55e;
  border: none;
  border-radius: 4px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.play-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .flow-diagram {
    grid-template-columns: 1fr;
  }
}
</style>
