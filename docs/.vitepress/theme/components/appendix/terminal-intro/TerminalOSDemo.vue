<template>
  <div class="terminal-os-demo">
    <div class="os-switch">
      <button
        v-for="os in osList"
        :key="os.id"
        :class="{ active: currentOS === os.id }"
        @click="switchOS(os.id)"
      >
        <span class="os-icon">{{ os.icon }}</span>
        {{ os.name }}
      </button>
    </div>

    <div class="terminal-window" :class="currentOS">
      <div class="window-bar">
        <div class="window-buttons">
          <span class="btn close"></span>
          <span class="btn minimize"></span>
          <span class="btn maximize"></span>
        </div>
        <div class="window-title">{{ currentOSConfig.title }}</div>
        <div class="window-controls">
          <button class="control-btn" @click="resetDemo" title="Reset">
            ↺
          </button>
        </div>
      </div>
      <div
        class="terminal-content"
        @click="nextStep"
        :class="{ clickable: !isTyping && !isFinished }"
      >
        <!-- Start Overlay -->
        <div
          class="start-overlay"
          v-if="
            lines.length === 0 ||
            (lines.length === 1 &&
              lines[0].content === '' &&
              currentStepIndex === -1)
          "
        >
          <div class="start-hint">
            <span class="icon">👆</span>
            <span class="text">不断点击屏幕演示 / Keep Clicking</span>
          </div>
        </div>

        <!-- Completed Overlay -->
        <div class="completed-overlay" v-if="isFinished">
          <div class="completed-hint" @click.stop="resetDemo">
            <span class="icon">✅</span>
            <span class="text">演示结束，点击重置 / Finished (Reset)</span>
          </div>
        </div>

        <div v-for="(line, index) in lines" :key="index" class="line">
          <template v-if="line.type === 'input'">
            <span class="prompt">{{ line.prompt }}</span
            ><span class="cmd-text">{{ line.content }}</span>
          </template>
          <template v-else>
            <span class="output-text">{{ line.content }}</span>
          </template>
        </div>

        <!-- Active Input Line (when not animating or just waiting) -->
        <div
          class="line input-line"
          v-if="
            lines.length === 0 ||
            (!isTyping &&
              lines[lines.length - 1].type !== 'input' &&
              !isFinished)
          "
        >
          <span class="prompt">{{ currentOSConfig.prompt }}</span>
          <span class="cursor">_</span>
          <span v-if="lines.length === 0" class="hint">
            (点击屏幕继续 / Click screen to continue)</span
          >
          <span v-else class="hint blink-hint"> ⏎ </span>
        </div>
      </div>

      <!-- Explanation Bar -->
      <div class="explanation-bar" :class="{ visible: currentExplanation }">
        <span class="icon">💡</span>
        <span class="text">{{ currentExplanation }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentOS = ref('win-cmd')
const isTyping = ref(false)
const lines = ref([])
const currentExplanation = ref('')
const currentStepIndex = ref(-1)

const osList = [
  { id: 'win-cmd', name: 'Windows CMD', icon: '🪟' },
  { id: 'win-ps', name: 'Windows PowerShell', icon: '⚡' },
  { id: 'mac', name: 'macOS Terminal', icon: '🍎' },
  { id: 'linux', name: 'Linux Terminal', icon: '🐧' }
]

const configs = {
  'win-cmd': {
    title: 'Command Prompt',
    prompt: 'C:\\Users\\User>',
    demo: [
      { type: 'explanation', content: '准备输入命令...' },
      {
        type: 'command',
        content: 'dir',
        delay: 400,
        explanation:
          '输入 `dir` (Directory)。这是 Windows 系统用来**列出当前文件夹内容**的命令。'
      },
      {
        type: 'output',
        content: ' Volume in drive C has no label.',
        delay: 100,
        explanation: '系统正在执行命令...'
      },
      {
        type: 'output',
        content: ' Volume Serial Number is A1B2-C3D4',
        delay: 50
      },
      { type: 'output', content: '', delay: 50 },
      { type: 'output', content: ' Directory of C:\\Users\\User', delay: 50 },
      { type: 'output', content: '', delay: 50 },
      {
        type: 'output',
        content: '01/15/2026  10:00 AM    <DIR>          .',
        delay: 50
      },
      {
        type: 'output',
        content: '01/15/2026  10:00 AM    <DIR>          ..',
        delay: 50
      },
      {
        type: 'output',
        content: '01/15/2026  10:00 AM               128 demo.txt',
        delay: 50
      },
      {
        type: 'output',
        content: '               1 File(s)            128 bytes',
        delay: 50
      },
      {
        type: 'output',
        content: '               2 Dir(s)  50,000,000,000 bytes free',
        delay: 50,
        explanation:
          '系统返回了文件列表。`<DIR>` 表示这是一个文件夹，数字表示文件大小。'
      },
      { type: 'output', content: '', delay: 100 }
    ]
  },
  'win-ps': {
    title: 'Windows PowerShell',
    prompt: 'PS C:\\Users\\User>',
    demo: [
      { type: 'explanation', content: '准备输入命令...' },
      {
        type: 'command',
        content: 'Get-Date',
        delay: 400,
        explanation:
          '输入 `Get-Date`。PowerShell 使用动词-名词的命名方式，这里是**获取当前时间**。'
      },
      {
        type: 'output',
        content: '',
        delay: 100,
        explanation: '系统返回了当前的日期和时间。'
      },
      {
        type: 'output',
        content: 'Thursday, January 15, 2026 10:00:00 AM',
        delay: 100
      },
      { type: 'output', content: '', delay: 100 },
      {
        type: 'command',
        content: 'echo "Hello World"',
        delay: 400,
        explanation:
          '输入 `echo`。这是让计算机**复读**你说的话，常用于测试或打印信息。'
      },
      {
        type: 'output',
        content: 'Hello World',
        delay: 100,
        explanation: '计算机乖乖地输出了 "Hello World"。'
      }
    ]
  },
  mac: {
    title: 'user — -zsh — 80x24',
    prompt: 'user@MacBook-Pro ~ % ',
    demo: [
      { type: 'explanation', content: '准备输入命令...' },
      {
        type: 'command',
        content: 'ls -G',
        delay: 400,
        explanation:
          '输入 `ls` (List)。这是 Mac/Linux 系统用来**列出文件**的命令。`-G` 参数让输出带颜色。'
      },
      {
        type: 'output',
        content: 'Desktop   Downloads   Movies    Music',
        delay: 100
      },
      {
        type: 'output',
        content: 'Documents Library     Pictures  Public',
        delay: 100,
        explanation: '系统列出了你的主目录下的文件夹。'
      },
      {
        type: 'command',
        content: 'sw_vers',
        delay: 400,
        explanation:
          '输入 `sw_vers` (Software Version)。这是 macOS 特有的命令，查看**系统版本**。'
      },
      { type: 'output', content: 'ProductName:		macOS', delay: 50 },
      { type: 'output', content: 'ProductVersion:		15.1', delay: 50 },
      {
        type: 'output',
        content: 'BuildVersion:		24B83',
        delay: 50,
        explanation: '系统返回了当前的 macOS 版本信息。'
      }
    ]
  },
  linux: {
    title: 'user@hostname: ~',
    prompt: 'user@hostname:~$ ',
    demo: [
      { type: 'explanation', content: '准备输入命令...' },
      {
        type: 'command',
        content: 'ls -la',
        delay: 400,
        explanation:
          '输入 `ls` (List)。这是 Linux/Mac 系统用来**列出文件**的命令。`-la` 是参数，表示“列出所有文件(all)的详细信息(long)”。'
      },
      {
        type: 'output',
        content: 'total 8',
        delay: 100,
        explanation:
          '系统返回了文件列表。左边的 `drwxr-xr-x` 看起来像乱码，其实是**权限描述**（谁能读、谁能写）。'
      },
      {
        type: 'output',
        content: 'drwxr-xr-x  2 user user 4096 Jan 15 10:00 .',
        delay: 50
      },
      {
        type: 'output',
        content: 'drwxr-xr-x  3 user user 4096 Jan 15 10:00 ..',
        delay: 50
      },
      {
        type: 'output',
        content: '-rw-r--r--  1 user user  128 Jan 15 10:00 demo.txt',
        delay: 50
      },
      {
        type: 'command',
        content: 'whoami',
        delay: 400,
        explanation:
          '输入 `whoami` (Who am I)。这是一个经典的哲学命令（笑），告诉计算机：**我是谁？**（当前登录用户）。'
      },
      {
        type: 'output',
        content: 'user',
        delay: 100,
        explanation: '系统回答：你是 "user"。'
      }
    ]
  }
}

const currentOSConfig = computed(() => configs[currentOS.value])
const isFinished = computed(
  () =>
    currentOSConfig.value &&
    currentStepIndex.value >= currentOSConfig.value.demo.length - 1
)

const switchOS = (id) => {
  currentOS.value = id
  resetDemo()
}

const resetDemo = () => {
  lines.value = []
  currentExplanation.value = ''
  currentStepIndex.value = -1
  isTyping.value = false
  // Add initial prompt
  lines.value.push({
    type: 'input',
    prompt: currentOSConfig.value.prompt,
    content: ''
  })
}

// Initial reset
watch(currentOSConfig, resetDemo, { immediate: true })

const nextStep = async () => {
  if (isTyping.value || isFinished.value) return

  const demoLines = currentOSConfig.value.demo
  const promptText = currentOSConfig.value.prompt

  // Loop to process consecutive output lines or until a pause point
  while (currentStepIndex.value < demoLines.length - 1) {
    currentStepIndex.value++
    const step = demoLines[currentStepIndex.value]

    // 1. Update Explanation if exists
    if (step.explanation) {
      currentExplanation.value = step.explanation
    }

    // 2. Handle specific types
    if (step.type === 'explanation') {
      // Just show explanation and pause
      break
    }

    if (step.type === 'command') {
      // Ensure input line exists
      if (
        lines.value.length === 0 ||
        lines.value[lines.value.length - 1].type !== 'input'
      ) {
        lines.value.push({ type: 'input', prompt: promptText, content: '' })
      }

      // Type effect
      isTyping.value = true
      const text = step.content
      const targetLine = lines.value[lines.value.length - 1]

      for (let i = 0; i < text.length; i++) {
        targetLine.content += text[i]
        await new Promise((r) => setTimeout(r, 30 + Math.random() * 40))
      }
      isTyping.value = false

      // Pause after typing command
      break
    }

    if (step.type === 'output') {
      lines.value.push({ type: 'output', content: step.content })

      // Logic to continue or pause:
      // Pause if:
      // - This output has an explanation (user needs to read)
      // - Next step is NOT output (it's a command or explanation block)
      // - Next step is output BUT has an explanation

      if (step.explanation) {
        break
      }

      const nextStep = demoLines[currentStepIndex.value + 1]
      if (!nextStep || nextStep.type !== 'output' || nextStep.explanation) {
        // If next is command, we might want to show a prompt before pausing?
        // But the command step logic adds prompt.
        // If we pause here, the user sees output. Next click -> types command.
        // Seems correct.
        break
      }

      // Small delay between batched outputs for visual smoothness
      await new Promise((r) => setTimeout(r, 50))
    }
  }

  // If we finished everything, add a final prompt
  if (isFinished.value) {
    lines.value.push({ type: 'input', prompt: promptText, content: '' })
  }
}
</script>

<style scoped>
.terminal-os-demo {
  margin: 24px 0;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.os-switch {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.os-switch button {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.os-switch button:hover {
  background: var(--vp-c-bg-mute);
  transform: translateY(-1px);
}

.os-switch button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.3);
}

.terminal-window {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(128, 128, 128, 0.2);
  transition: background 0.3s;
}

/* Windows CMD Style */
.terminal-window.win-cmd {
  background: #0c0c0c;
  color: #cccccc;
  font-family: 'Consolas', monospace;
}
.terminal-window.win-cmd .window-bar {
  background: #ffffff;
  border-bottom: 1px solid #ccc;
  color: #000;
}
.terminal-window.win-cmd .window-title {
  color: #000;
  font-weight: normal;
}
.terminal-window.win-cmd .window-buttons .btn {
  background: #ccc;
  border-radius: 0;
}

/* PowerShell Style */
.terminal-window.win-ps {
  background: #012456;
  color: #ffffff;
  font-family: 'Consolas', monospace;
}
.terminal-window.win-ps .window-bar {
  background: #ffffff;
  border-bottom: 1px solid #ccc;
  color: #000;
}
.terminal-window.win-ps .window-title {
  color: #000;
}
.terminal-window.win-ps .window-buttons .btn {
  background: #ccc;
  border-radius: 0;
}

/* Linux Style */
.terminal-window.linux {
  background: #2b2b2b;
  color: #f0f0f0;
  font-family: 'Ubuntu Mono', monospace;
}
.terminal-window.linux .window-bar {
  background: #3e3e3e;
  border-bottom: 1px solid #222;
  color: #ccc;
}
.terminal-window.linux .window-buttons .btn {
  border-radius: 50%;
}
.terminal-window.linux .window-buttons .close {
  background: #ff5f56;
}
.terminal-window.linux .window-buttons .minimize {
  background: #ffbd2e;
}
.terminal-window.linux .window-buttons .maximize {
  background: #27c93f;
}

/* Common Layout */
.terminal-window.mac {
  background: #1e1e1e;
  color: #f0f0f0;
  font-family: 'Menlo', monospace;
}
.terminal-window.mac .window-bar {
  background: #3a3a3a;
  border-bottom: 1px solid #222;
  color: #ccc;
}
.terminal-window.mac .window-buttons .btn {
  border-radius: 50%;
}
.terminal-window.mac .window-buttons .close {
  background: #ff5f56;
}
.terminal-window.mac .window-buttons .minimize {
  background: #ffbd2e;
}
.terminal-window.mac .window-buttons .maximize {
  background: #27c93f;
}

.window-bar {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  position: relative;
  height: 36px;
  justify-content: space-between;
}

.window-buttons {
  display: flex;
  gap: 8px;
  z-index: 10;
}

.window-controls {
  display: flex;
  gap: 8px;
  z-index: 10;
  align-items: center;
}

.control-btn {
  background: transparent;
  border: 1px solid currentColor;
  color: inherit;
  opacity: 0.7;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  height: 22px;
  line-height: 16px;
}

.control-btn:hover:not(:disabled) {
  opacity: 1;
  background: rgba(128, 128, 128, 0.2);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
  opacity: 1;
}

.control-btn.primary:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.btn {
  width: 12px;
  height: 12px;
  display: inline-block;
}

.window-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
  line-height: 36px;
  user-select: none;
}

.terminal-content {
  padding: 16px;
  min-height: 240px;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
  transition: background-color 0.2s;
  position: relative; /* For overlay */
}

.terminal-content.clickable {
  cursor: pointer;
}

.start-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
}

.start-hint {
  background: var(--vp-c-brand);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.completed-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  animation: fade-in 0.5s;
}

.completed-hint {
  background: #10b981;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s;
}

.completed-hint:hover {
  transform: scale(1.05);
  background: #059669;
}

.terminal-content.clickable:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.blink-hint {
  animation: blink 1s step-end infinite;
  font-weight: bold;
  margin-left: 5px;
  color: var(--vp-c-brand);
}

.line {
  white-space: pre-wrap;
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
}

.prompt {
  margin-right: 8px;
  font-weight: bold;
}

/* Linux Prompt Colors */
.terminal-window.linux .prompt {
  color: #87d700;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background-color: currentColor;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
  opacity: 0.7;
}

/* If last line input, show cursor there */
.line:last-child .cmd-text::after {
  content: '';
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background-color: currentColor;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
  opacity: 0.7;
  margin-left: 2px;
}

/* Only show cursor on the very last line if it is input type and we are animating OR we are idle (lines=0) */
/* Actually, simpler: */
.input-line .cursor {
  display: inline-block;
}

/* Hide the pseudo-element cursor if we are not on the last line or if it is output */
.line:not(:last-child) .cmd-text::after {
  display: none;
}

/* Also if the last line is output, no cursor */
.line:last-child:not(:has(.prompt)) .cmd-text::after {
  /* This selector is tricky. Let's rely on v-if logic in template if possible, 
     but since we iterate lines, I added a cursor logic in CSS. 
     Let's adjust template to be explicit about cursor.
  */
  display: none;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.hint {
  opacity: 0.5;
  font-size: 0.9em;
  font-style: italic;
  margin-left: 10px;
}

.explanation-bar {
  background: #fff;
  border-top: 1px solid #ddd;
  padding: 8px 12px;
  font-size: 13px;
  color: #333;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-height: 40px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s;
  pointer-events: none;
}

.explanation-bar.visible {
  opacity: 1;
  transform: translateY(0);
}

.explanation-bar .icon {
  font-size: 16px;
}

.explanation-bar .text {
  line-height: 1.5;
}

.terminal-window.win-cmd .explanation-bar,
.terminal-window.win-ps .explanation-bar {
  background: #f0f0f0;
  color: #333;
  border-top-color: #ccc;
}

.terminal-window.linux .explanation-bar,
.terminal-window.mac .explanation-bar {
  background: #222;
  color: #ccc;
  border-top-color: #444;
}
</style>
