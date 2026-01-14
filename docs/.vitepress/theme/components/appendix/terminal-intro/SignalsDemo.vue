<!--
  SignalsDemo.vue
  信号机制演示组件
  
  用途：
  演示进程控制信号（Signals）如何工作，特别是 `Ctrl+C` 和 `Ctrl+Z`。
  说明这些组合键不是发送字符，而是触发操作系统级别的中断信号。
  
  交互功能：
  - 模拟运行：点击按钮启动一个模拟进程（如 `sleep 100`）。
  - 发送信号：点击按钮或快捷键发送 SIGINT/SIGTSTP。
  - 状态反馈：展示进程状态的变化（运行中 -> 被杀死/被挂起）。
-->
<template>
  <div class="signals-demo">
    <div class="left-panel">
      <div class="signal-list">
        <div 
          class="signal-item" 
          :class="{ active: activeSignal === 'SIGINT' }"
          @click="sendSignal('SIGINT')"
        >
          <div class="key-combo">
            <span class="key">Ctrl</span>+<span class="key">C</span>
            <span class="action">Interrupt</span>
          </div>
          <div class="signal-name">SIGINT</div>
        </div>

        <div 
          class="signal-item" 
          :class="{ active: activeSignal === 'SIGTSTP' }"
          @click="sendSignal('SIGTSTP')"
        >
          <div class="key-combo">
            <span class="key">Ctrl</span>+<span class="key">Z</span>
            <span class="action">Suspend</span>
          </div>
          <div class="signal-name">SIGTSTP</div>
        </div>
      </div>

      <div class="info-box">
        <div v-if="activeSignal === 'SIGINT'">
          <div class="info-header">
            <span class="highlight">Ctrl+C</span> → <span class="signal-green">SIGINT</span>
          </div>
          <div class="info-desc">Stop the running program</div>
          <p>Sends SIGINT (signal interrupt) to the foreground process. Most programs respond by stopping immediately. It's how you cancel a long-running command or exit a program that's stuck.</p>
          <div class="example-box">
            Example: Running `sleep 100` and pressing Ctrl+C stops it immediately.
          </div>
        </div>
        <div v-else-if="activeSignal === 'SIGTSTP'">
          <div class="info-header">
            <span class="highlight">Ctrl+Z</span> → <span class="signal-blue">SIGTSTP</span>
          </div>
          <div class="info-desc">Suspend the running program</div>
          <p>Sends SIGTSTP (signal terminal stop). The process is paused and put in the background. You can resume it later with `fg` command.</p>
          <div class="example-box">
            Example: Pressing Ctrl+Z pauses a running editor like vim, returning you to the shell.
          </div>
        </div>
        <div v-else>
          <div class="info-header">Select a signal</div>
          <p>Click on a signal type above to see how it works.</p>
        </div>
      </div>
    </div>

    <div class="right-panel">
      <div class="terminal-window">
        <div class="window-header">
          <div class="dots"><span></span><span></span><span></span></div>
        </div>
        <div class="window-content">
          <div v-for="(line, i) in lines" :key="i" class="term-line" :class="line.type">
            {{ line.text }}
          </div>
          <div v-if="isRunning" class="term-line output">sleeping...</div>
          <div v-if="inputBuffer" class="term-line input">
            <span class="prompt">$</span> {{ inputBuffer }}<span class="cursor"></span>
          </div>
          <div v-else class="term-line input">
            <span class="prompt">$</span> <span class="cursor"></span>
          </div>
        </div>
      </div>

      <div class="controls">
        <button class="btn" @click="runCommand" :disabled="isRunning">Run Command</button>
        <button class="btn" @click="sendSignal('SIGINT')">Ctrl+C</button>
        <button class="btn" @click="sendSignal('SIGTSTP')">Ctrl+Z</button>
        <button class="btn secondary" @click="reset">Reset</button>
      </div>

      <div class="state-display">
        State: <span :class="stateClass">{{ processState }}</span>
      </div>
      
      <p class="instruction">
        Click "Run Command" to start a simulated process, then try sending different signals.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeSignal = ref('SIGINT')
const isRunning = ref(false)
const lines = ref([
  { type: 'input', text: '$ sleep 100' }
])
const processState = ref('Running')
const inputBuffer = ref('')

const stateClass = computed(() => {
  if (processState.value.includes('Running')) return 'state-green'
  if (processState.value.includes('interrupted')) return 'state-red'
  if (processState.value.includes('suspended')) return 'state-blue'
  return ''
})

const runCommand = () => {
  reset()
  isRunning.value = true
  processState.value = 'Running (PID 1234)'
}

const sendSignal = (sig) => {
  activeSignal.value = sig
  
  if (!isRunning.value && sig === 'SIGINT') return

  if (sig === 'SIGINT') {
    lines.value.push({ type: 'output', text: 'sleeping...' })
    lines.value.push({ type: 'control', text: '^C' })
    isRunning.value = false
    processState.value = 'Process interrupted (killed)'
  } else if (sig === 'SIGTSTP') {
    lines.value.push({ type: 'output', text: 'sleeping...' })
    lines.value.push({ type: 'control', text: '^Z' })
    lines.value.push({ type: 'output', text: '[1]+  Stopped                 sleep 100' })
    isRunning.value = false
    processState.value = 'Process suspended (stopped)'
  }
}

const reset = () => {
  lines.value = [{ type: 'input', text: '$ sleep 100' }]
  isRunning.value = true
  processState.value = 'Running (PID 1234)'
}

// Initial state
reset()
</script>

<style scoped>
.signals-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 自动适应宽度，不够时换行 */
  gap: 30px;
  background: #09090b;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #27272a;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
  color: #e4e4e7;
  overflow: hidden; /* 防止溢出 */
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0; /* 防止 flex 子项溢出 */
}

.signal-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.signal-item:hover {
  border-color: #52525b;
}

.signal-item.active {
  background: #27272a;
  border-left: 3px solid #facc15;
}

.key-combo {
  display: flex;
  align-items: center;
  gap: 5px;
}

.key {
  color: #facc15;
  font-weight: bold;
}

.action {
  color: #a1a1aa;
  margin-left: 10px;
  font-size: 13px;
}

.signal-name {
  color: #22d3ee;
  font-weight: bold;
}

.info-box {
  background: #18181b;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #27272a;
  font-size: 14px;
  line-height: 1.6;
}

.info-header {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}

.highlight { color: #facc15; }
.signal-green { color: #22c55e; }
.signal-blue { color: #3b82f6; }

.info-desc {
  color: #a1a1aa;
  margin-bottom: 15px;
}

.example-box {
  background: #000;
  padding: 10px;
  border-radius: 4px;
  font-size: 13px;
  color: #d4d4d8;
  margin-top: 15px;
  border: 1px solid #27272a;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0; /* 防止 flex 子项溢出 */
}

.terminal-window {
  background: #000;
  border: 1px solid #27272a;
  border-radius: 8px;
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.window-header {
  padding: 10px 15px;
  border-bottom: 1px solid #27272a;
  background: #18181b;
}

.dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3f3f46;
  margin-right: 6px;
}

.window-content {
  padding: 15px;
  flex: 1;
  font-size: 14px;
  overflow-y: auto;
}

.term-line {
  margin-bottom: 5px;
}

.control { color: #ef4444; }
.output { color: #d4d4d8; }
.input { color: #fff; }
.prompt { color: #71717a; margin-right: 8px; }

.cursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #a1a1aa;
  vertical-align: middle;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap; /* 允许按钮换行 */
}

.btn {
  background: #18181b;
  border: 1px solid #27272a;
  color: #e4e4e7;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  white-space: nowrap; /* 防止文字换行 */
  min-width: 80px; /* 最小宽度 */
  transition: all 0.2s;
  font-size: 13px;
}

.btn:hover:not(:disabled) {
  background: #27272a;
  border-color: #52525b;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.state-display {
  font-size: 16px;
  margin-top: 10px;
}

.state-green { color: #22c55e; }
.state-red { color: #ef4444; }
.state-blue { color: #3b82f6; }

.instruction {
  color: #a1a1aa;
  font-size: 13px;
}

@media (max-width: 640px) {
  .signals-demo {
    padding: 20px;
    gap: 20px;
  }
}
</style>
