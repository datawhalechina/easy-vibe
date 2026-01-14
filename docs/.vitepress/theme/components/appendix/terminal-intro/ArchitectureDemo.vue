<!--
  ArchitectureDemo.vue
  终端架构演示组件
  
  用途：
  可视化展示 Terminal（终端）、Shell（壳）和 Kernel（内核）之间的交互流程。
  通过模拟 "ls" 命令的执行过程，帮助用户理解输入传输、解析、系统调用、数据返回和渲染显示的完整链路。
  
  交互功能：
  - 逐步演示 (Step-by-Step)：用户点击按钮一步步观察数据包流转。
  - 中英双语说明：适应不同语言背景的读者。
  - 状态反馈：实时显示各组件（终端/Shell/内核）的当前状态（空闲/忙碌）。
-->
<template>
  <div class="arch-demo">
    <div class="analogy-header">
      <div class="analogy-item">
        <div class="icon">🍽️</div>
        <div class="text">
          <div class="role">Terminal = Table (餐桌)</div>
          <div class="desc">UI & Input/Output<br>交互界面与输入输出</div>
        </div>
      </div>
      <div class="analogy-item">
        <div class="icon">💁‍♂️</div>
        <div class="text">
          <div class="role">Shell = Waiter (服务员)</div>
          <div class="desc">Interpreter & Logic<br>解释器与逻辑处理</div>
        </div>
      </div>
      <div class="analogy-item">
        <div class="icon">👨‍🍳</div>
        <div class="text">
          <div class="role">Kernel = Kitchen (后厨)</div>
          <div class="desc">System Execution<br>系统执行与硬件调度</div>
        </div>
      </div>
    </div>

    <div class="diagram-container">
      <!-- Terminal Node -->
      <div class="node terminal" :class="{ active: activeNode === 'terminal' }">
        <div class="node-title">TERMINAL (终端)</div>
        <div class="screen">
          <div v-for="(line, i) in terminalLines" :key="i" class="line">{{ line }}</div>
          <div class="line input-line">
            <span class="prompt">$</span>
            <span class="typing">{{ currentInput }}</span>
            <span class="cursor" v-if="activeNode === 'terminal'"></span>
          </div>
        </div>
        <div class="node-label">/dev/tty</div>
      </div>

      <!-- Connections -->
      <div class="connection t-s" :class="{ active: packetState === 't-to-s' || packetState === 's-to-t' }">
        <div class="line-path"></div>
        <div class="data-label" v-if="packetState === 't-to-s'">
          <span class="icon">➡️</span> Bytes
        </div>
        <div class="data-label" v-if="packetState === 's-to-t'">
          <span class="icon">⬅️</span> Text
        </div>
        <div class="conn-label">stdin / stdout</div>
      </div>

      <!-- Shell Node -->
      <div class="node shell" :class="{ active: activeNode === 'shell' }">
        <div class="node-title">SHELL (壳)</div>
        <div class="process-box">
          <div class="status-icon">{{ shellIcon }}</div>
          <div class="status">{{ shellStatus }}</div>
        </div>
        <div class="node-label">/bin/zsh</div>
      </div>

      <!-- Connections -->
      <div class="connection s-k" :class="{ active: packetState === 's-to-k' || packetState === 'k-to-s' }">
        <div class="line-path"></div>
        <div class="data-label" v-if="packetState === 's-to-k'">
          <span class="icon">➡️</span> Syscall
        </div>
        <div class="data-label" v-if="packetState === 'k-to-s'">
          <span class="icon">⬅️</span> Raw Data
        </div>
        <div class="conn-label">System Calls</div>
      </div>

      <!-- Kernel Node -->
      <div class="node kernel" :class="{ active: activeNode === 'kernel' }">
        <div class="node-title">KERNEL (内核)</div>
        <div class="process-box">
          <div class="status-icon">{{ kernelIcon }}</div>
          <div class="status">{{ kernelStatus }}</div>
        </div>
        <div class="node-label">macOS / Linux</div>
      </div>
    </div>

    <div class="controls">
      <div class="btn-group">
        <button class="btn primary" @click="nextStep" :disabled="currentStep >= totalSteps">
          <span v-if="currentStep === 0">▶️ Start Simulation / 开始演示</span>
          <span v-else-if="currentStep < totalSteps">Next Step / 下一步 ({{ currentStep }}/{{ totalSteps }}) ➡️</span>
          <span v-else>✅ Done / 完成 (Reset)</span>
        </button>
        <button class="btn secondary" @click="reset" v-if="currentStep > 0">
          Reset / 重置
        </button>
      </div>
      
      <div class="step-info" v-if="currentStep > 0">
        <div class="step-title">
          {{ steps[currentStep - 1].titleEn }} 
          <span class="divider">|</span> 
          {{ steps[currentStep - 1].titleZh }}
        </div>
        <div class="step-desc">
          <div class="en">{{ steps[currentStep - 1].descEn }}</div>
          <div class="zh">{{ steps[currentStep - 1].descZh }}</div>
        </div>
        <div class="step-tech">
          <span class="tech-label">Technical / 技术原理:</span>
          <div class="tech-content">
            <div class="en">{{ steps[currentStep - 1].techEn }}</div>
            <div class="zh">{{ steps[currentStep - 1].techZh }}</div>
          </div>
        </div>
      </div>
      <div class="step-info placeholder" v-else>
        <div class="step-desc">
          <div class="en">Click "Start Simulation" to see how the command 'ls' travels through the system.</div>
          <div class="zh">点击“开始演示”查看 'ls' 命令如何在系统中流转。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const activeNode = ref('terminal') 
const packetState = ref(null) 
const terminalLines = ref([])
const currentInput = ref('')
const shellStatus = ref('Idle')
const shellIcon = ref('💤')
const kernelStatus = ref('Idle')
const kernelIcon = ref('💤')

const steps = [
  {
    titleEn: "1. User Input",
    titleZh: "1. 用户输入",
    descEn: "You type 'ls' in the terminal window. The terminal captures your keystrokes.",
    descZh: "你在终端窗口输入 'ls'。终端会捕获你的按键操作。",
    techEn: "Terminal buffers input in 'Cooked Mode' until you press Enter.",
    techZh: "终端在“加工模式 (Cooked Mode)”下缓冲输入，直到你按下回车键。",
    action: async () => {
      activeNode.value = 'terminal'
      currentInput.value = 'l'
      await wait(200)
      currentInput.value = 'ls'
    }
  },
  {
    titleEn: "2. Transmission",
    titleZh: "2. 传输",
    descEn: "The Terminal sends the characters 'l', 's', and 'Enter' to the Shell.",
    descZh: "终端将字符 'l'、's' 和 '回车' 发送给 Shell。",
    techEn: "Data travels via standard input (stdin) as a byte stream.",
    techZh: "数据通过标准输入 (stdin) 以字节流的形式传输。",
    action: async () => {
      packetState.value = 't-to-s'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: "3. Shell Parsing",
    titleZh: "3. Shell 解析",
    descEn: "The Shell receives the characters and figures out what you want.",
    descZh: "Shell 接收到字符，并解析你的意图。",
    techEn: "Shell tokenizes input, finds the 'ls' executable in $PATH.",
    techZh: "Shell 对输入进行分词，并在 $PATH 环境变量中查找 'ls' 可执行文件。",
    action: async () => {
      activeNode.value = 'shell'
      shellIcon.value = '🧠'
      shellStatus.value = 'Parsing "ls"...'
    }
  },
  {
    titleEn: "4. System Call",
    titleZh: "4. 系统调用",
    descEn: "The Shell asks the Kernel to read the file list from the disk.",
    descZh: "Shell 请求内核从磁盘读取文件列表。",
    techEn: "Shell invokes `execve()` and `getdents()` system calls.",
    techZh: "Shell 调用 `execve()` 和 `getdents()` 等系统调用。",
    action: async () => {
      packetState.value = 's-to-k'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: "5. Kernel Execution",
    titleZh: "5. 内核执行",
    descEn: "The Kernel (the boss) talks to the hardware to get the actual data.",
    descZh: "内核（大管家）与硬件通信以获取实际数据。",
    techEn: "Kernel driver accesses the file system (APFS/ext4).",
    techZh: "内核驱动程序访问文件系统 (APFS/ext4)。",
    action: async () => {
      activeNode.value = 'kernel'
      kernelIcon.value = '💾'
      kernelStatus.value = 'Reading Disk...'
      await wait(800)
      kernelStatus.value = 'Data Found'
    }
  },
  {
    titleEn: "6. Returning Data",
    titleZh: "6. 返回数据",
    descEn: "The Kernel gives the raw file list back to the Shell.",
    descZh: "内核将原始文件列表数据返回给 Shell。",
    techEn: "System call returns with file descriptors/structs.",
    techZh: "系统调用返回文件描述符或结构体数据。",
    action: async () => {
      kernelStatus.value = 'Idle'
      kernelIcon.value = '💤'
      packetState.value = 'k-to-s'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: "7. Formatting",
    titleZh: "7. 格式化",
    descEn: "The Shell formats the raw list into text, adding colors if needed.",
    descZh: "Shell 将原始列表格式化为文本，并根据需要添加颜色。",
    techEn: "Shell formats output buffer, adding ANSI color codes.",
    techZh: "Shell 格式化输出缓冲区，并添加 ANSI 颜色代码。",
    action: async () => {
      activeNode.value = 'shell'
      shellIcon.value = '🎨'
      shellStatus.value = 'Formatting...'
      await wait(500)
    }
  },
  {
    titleEn: "8. Display Output",
    titleZh: "8. 显示输出",
    descEn: "The Shell sends the final text back to the Terminal to show you.",
    descZh: "Shell 将最终文本发送回终端以供显示。",
    techEn: "Data travels via standard output (stdout) to the TTY.",
    techZh: "数据通过标准输出 (stdout) 传输到 TTY。",
    action: async () => {
      shellStatus.value = 'Idle'
      shellIcon.value = '💤'
      packetState.value = 's-to-t'
      await wait(1000)
      packetState.value = null
    }
  },
  {
    titleEn: "9. Render",
    titleZh: "9. 渲染",
    descEn: "The Terminal draws the text on the screen grid.",
    descZh: "终端在屏幕网格上绘制文本。",
    techEn: "Terminal emulator renders glyphs into the frame buffer.",
    techZh: "终端模拟器将字形渲染到帧缓冲区中。",
    action: async () => {
      activeNode.value = 'terminal'
      terminalLines.value = ['file1.txt  photo.jpg', 'notes.md']
      currentInput.value = ''
    }
  }
]


const totalSteps = steps.length

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const nextStep = async () => {
  if (currentStep.value >= totalSteps) {
    reset()
    return
  }
  
  const step = steps[currentStep.value]
  currentStep.value++
  await step.action()
}

const reset = () => {
  currentStep.value = 0
  activeNode.value = 'terminal'
  packetState.value = null
  terminalLines.value = []
  currentInput.value = ''
  shellStatus.value = 'Idle'
  shellIcon.value = '💤'
  kernelStatus.value = 'Idle'
  kernelIcon.value = '💤'
}
</script>

<style scoped>
.arch-demo {
  background: #09090b;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #27272a;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
  color: #e4e4e7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.analogy-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  border-bottom: 1px solid #27272a;
  padding-bottom: 20px;
}

.analogy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.analogy-item .icon {
  font-size: 24px;
  background: #18181b;
  padding: 8px;
  border-radius: 50%;
  border: 1px solid #27272a;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analogy-item .role {
  font-weight: bold;
  color: #22d3ee;
  font-size: 13px;
}

.analogy-item .desc {
  font-size: 11px;
  color: #a1a1aa;
}

.diagram-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 10px;
}

.node {
  background: #18181b;
  border: 2px solid #27272a;
  border-radius: 8px;
  width: 140px;
  height: 130px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  z-index: 2;
  position: relative;
}

.node.active {
  border-color: #22c55e;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
  transform: translateY(-2px);
}

.node-title {
  background: #27272a;
  color: #a1a1aa;
  font-size: 10px;
  padding: 6px 0;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 6px 6px 0 0;
}

.node-label {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  color: #71717a;
}

.screen, .process-box {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.process-box {
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.status-icon {
  font-size: 24px;
}

.screen {
  background: #000;
  justify-content: flex-start;
  font-family: monospace;
  overflow: hidden;
}

.line {
  height: 16px;
  white-space: nowrap;
  overflow: hidden;
}

.input-line {
  display: flex;
  align-items: center;
}

.prompt {
  color: #22c55e;
  margin-right: 4px;
}

.cursor {
  width: 6px;
  height: 12px;
  background: #e4e4e7;
  animation: blink 1s step-end infinite;
}

.status {
  text-align: center;
  color: #facc15;
  font-size: 11px;
}

.connection {
  flex: 1;
  height: 2px;
  background: #27272a;
  position: relative;
  margin: 0 15px;
  transition: all 0.3s;
}

.connection.active {
  background: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
}

.conn-label {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  color: #52525b;
}

.data-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: #22c55e;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 10;
  animation: pop-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  from { opacity: 0; transform: translate(-50%, 5px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes blink {
  50% { opacity: 0; }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #18181b;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #27272a;
}

.btn-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn.primary {
  background: #22c55e;
  color: #000;
}

.btn.primary:hover:not(:disabled) {
  background: #16a34a;
}

.btn.primary:disabled {
  background: #27272a;
  color: #71717a;
  cursor: not-allowed;
}

.btn.secondary {
  background: transparent;
  border-color: #3f3f46;
  color: #a1a1aa;
}

.btn.secondary:hover {
  border-color: #71717a;
  color: #e4e4e7;
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  animation: fade-in 0.3s ease;
}

.step-title {
  font-size: 16px;
  font-weight: bold;
  color: #22d3ee;
}

.step-desc {
  font-size: 14px;
  color: #e4e4e7;
}

.step-tech {
  font-size: 12px;
  color: #71717a;
  background: #09090b;
  padding: 8px;
  border-radius: 4px;
  display: inline-block;
  margin: 0 auto;
}

.tech-label {
  color: #facc15;
  font-weight: bold;
  margin-right: 4px;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .analogy-header {
    grid-template-columns: 1fr;
  }
  
  .diagram-container {
    flex-direction: column;
    gap: 50px;
    padding: 20px 0;
  }
  
  .connection {
    width: 2px;
    height: 50px;
    margin: 0;
  }
  
  .conn-label {
    top: 50%;
    left: 10px;
    right: auto;
    transform: translateY(-50%);
    text-align: left;
    white-space: nowrap;
  }
  
  .packet {
    top: 0;
    left: 10px;
    animation: travel-vertical 1s linear forwards;
  }
  
  .packet.reverse {
    animation: travel-vertical-back 1s linear forwards;
  }
  
  @keyframes travel-vertical {
    0% { top: 0; transform: translateY(0); }
    100% { top: 100%; transform: translateY(-100%); }
  }
  
  @keyframes travel-vertical-back {
    0% { top: 100%; transform: translateY(-100%); }
    100% { top: 0; transform: translateY(0); }
  }
}
</style>