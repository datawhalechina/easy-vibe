<template>
  <div class="terminal-hands-on">
    <div class="lab-container">
      <!-- Left Panel: Task Guide -->
      <div class="task-panel">
        <div class="panel-header">
          <span class="panel-title"
            >🎯 实操任务 ({{ currentTaskIndex + 1 }}/{{ tasks.length }})</span
          >
          <div class="os-selector">
            <select v-model="currentOS" @change="resetCurrentTask">
              <option value="mac">macOS</option>
              <option value="win-ps">Windows PowerShell</option>
              <option value="win-cmd">Windows CMD</option>
              <option value="linux">Linux</option>
            </select>
          </div>
        </div>

        <div class="task-content">
          <h3>{{ currentTask.title }}</h3>
          <p class="task-desc">{{ currentTask.description }}</p>

          <div class="ai-helper">
            <div class="ai-header">
              <span class="ai-icon">🤖</span>
              <span class="ai-title">不知道怎么写？问问 AI</span>
            </div>
            <div class="ai-chat" v-show="isAiOpen">
              <div class="chat-bubble user">
                {{ currentTask.aiQuery }}
              </div>
              <div class="chat-bubble ai">
                <p>
                  {{
                    currentTask.aiResponse[currentOS] ||
                    currentTask.aiResponse.common
                  }}
                </p>
                <!-- Multiple Commands Support -->
                <div
                  v-if="currentTask.commands && currentTask.commands[currentOS]"
                  class="cmd-buttons"
                >
                  <button
                    v-for="(cmdItem, idx) in currentTask.commands[currentOS]"
                    :key="idx"
                    class="copy-btn"
                    @click="copyCommand(cmdItem.cmd)"
                  >
                    {{ cmdItem.label || '复制命令' }}
                  </button>
                </div>
                <!-- Fallback for Single Command -->
                <button
                  v-else-if="currentTask.expectedCmd"
                  class="copy-btn"
                  @click="
                    copyCommand(
                      currentTask.expectedCmd[currentOS] ||
                        currentTask.expectedCmd.common
                    )
                  "
                >
                  复制命令
                </button>
              </div>
            </div>
          </div>

          <div class="expected-result" v-if="!isTaskCompleted">
            <span class="label">预期目标：</span>
            <span class="value">{{ currentTask.goal }}</span>
          </div>

          <div class="success-message" v-if="isTaskCompleted">
            <span class="icon">🎉</span>
            <span>太棒了！任务完成！</span>
            <button
              class="next-btn"
              @click="nextTask"
              v-if="currentTaskIndex < tasks.length - 1"
            >
              下一关
            </button>
            <button class="reset-btn" @click="resetAll" v-else>重新开始</button>
          </div>
        </div>
      </div>

      <!-- Right Panel: Terminal Emulator -->
      <div class="terminal-panel" :class="currentOS">
        <div class="terminal-header">
          <div class="dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="title">{{ terminalTitle }}</div>
        </div>
        <div class="terminal-body" ref="terminalBody" @click="focusInput">
          <div v-for="(line, index) in history" :key="index" class="line">
            <span v-if="line.type === 'input'" class="prompt">{{
              line.prompt
            }}</span>
            <span :class="line.type">{{ line.content }}</span>
          </div>

          <div
            class="line input-line"
            v-if="!isTaskCompleted || currentTaskIndex < tasks.length - 1"
          >
            <span class="prompt">{{ prompt }}</span>
            <input
              ref="cmdInput"
              v-model="inputCmd"
              @keydown.enter="executeCommand"
              @keydown.tab.prevent
              type="text"
              spellcheck="false"
              autocomplete="off"
            />
            <span v-if="inputCmd.length > 0" class="enter-hint"
              >⏎ 按回车执行</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const currentOS = ref('win-cmd')
const currentTaskIndex = ref(0)
const isAiOpen = ref(true)
const inputCmd = ref('')
const history = ref([])
const cmdInput = ref(null)
const terminalBody = ref(null)

// System Configurations
const osConfig = {
  mac: { prompt: 'user@MacBook ~ % ', title: 'user — -zsh' },
  'win-ps': { prompt: 'PS C:\\Users\\User> ', title: 'Windows PowerShell' },
  'win-cmd': { prompt: 'C:\\Users\\User> ', title: 'Command Prompt' },
  linux: { prompt: 'user@localhost:~$ ', title: 'user@localhost: ~' }
}

const prompt = computed(() => osConfig[currentOS.value].prompt)
const terminalTitle = computed(() => osConfig[currentOS.value].title)

// Tasks Definition
const tasks = [
  {
    title: '第一步：看看这里有什么',
    description: '在对文件进行操作之前，我们首先需要知道当前目录下有哪些文件。',
    goal: '列出当前目录下的所有文件。',
    aiQuery: '我想查看当前目录下的文件，应该用什么命令？',
    aiResponse: {
      mac: '在 macOS 和 Linux 中，查看文件列表使用 `ls` 命令 (List)。',
      linux: '在 macOS 和 Linux 中，查看文件列表使用 `ls` 命令 (List)。',
      'win-ps': '在 PowerShell 中，你可以使用 `ls` 或 `dir` 命令。',
      'win-cmd': '在 Windows CMD 中，查看文件列表使用 `dir` 命令 (Directory)。',
      common: '通常使用 ls 或 dir。'
    },
    expectedCmd: {
      mac: 'ls',
      linux: 'ls',
      'win-ps': 'ls',
      'win-cmd': 'dir'
    },
    validate: (cmd, os) => {
      const valid = os === 'win-cmd' ? ['dir'] : ['ls', 'dir', 'll']
      return valid.includes(cmd.trim().toLowerCase())
    },
    output: (os) => {
      if (os === 'win-cmd' || os === 'win-ps') {
        return `
    Directory: C:\\Users\\User

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           1/15/2026  9:00 AM                Documents
d----           1/15/2026  9:00 AM                Downloads
-a---           1/15/2026  9:00 AM            128 todo.txt`
      }
      return `Documents  Downloads  todo.txt`
    }
  },
  {
    title: '第二步：创建一个新家',
    description:
      '文件太多会很乱，我们创建一个专门的文件夹来存放今天的练习文件。',
    goal: '创建一个名为 "demo" 的文件夹。',
    aiQuery: '怎么创建一个新的文件夹？名字叫 demo。',
    aiResponse: {
      common:
        '创建文件夹（目录）的命令是 `mkdir` (Make Directory)。你可以输入 `mkdir demo`。'
    },
    expectedCmd: {
      common: 'mkdir demo'
    },
    validate: (cmd) => cmd.trim() === 'mkdir demo',
    output: () => '' // mkdir usually has no output on success
  },
  {
    title: '第三步：进入新家',
    description: '文件夹建好了，但我们现在还在外面。我们需要“走”进去。',
    goal: '进入 "demo" 文件夹。',
    aiQuery: '怎么进入刚才建好的 demo 文件夹？',
    aiResponse: {
      common: '切换目录使用 `cd` 命令 (Change Directory)。输入 `cd demo` 即可。'
    },
    expectedCmd: {
      common: 'cd demo'
    },
    validate: (cmd) => cmd.trim() === 'cd demo',
    output: () => '' // cd usually has no output, but prompt changes
  },
  {
    title: '第四步：新建一个文件',
    description: '现在我们在 demo 文件夹里了。来创建一个简单的文本文件吧。',
    goal: '创建一个名为 "hello.txt" 的文件。',
    aiQuery: '我想新建一个空文件叫 hello.txt，怎么做？',
    aiResponse: {
      mac: '在 Mac/Linux 上，使用 `touch hello.txt` 可以快速创建一个空文件。',
      linux: '在 Mac/Linux 上，使用 `touch hello.txt` 可以快速创建一个空文件。',
      'win-ps':
        '在 PowerShell 中，可以使用 `ni hello.txt` 或 `echo "" > hello.txt`。',
      'win-cmd':
        '在 CMD 中，可以使用 `type nul > hello.txt` 或 `echo. > hello.txt`。'
    },
    expectedCmd: {
      mac: 'touch hello.txt',
      linux: 'touch hello.txt',
      'win-ps': 'ni hello.txt',
      'win-cmd': 'type nul > hello.txt'
    },
    validate: (cmd, os) => {
      if (
        cmd.includes('touch') ||
        cmd.includes('echo') ||
        cmd.includes('ni') ||
        cmd.includes('type')
      ) {
        return cmd.includes('hello.txt')
      }
      return false
    },
    output: () => ''
  },
  {
    title: '第五步：安装程序 (系统软件 & Python库)',
    description:
      '终端不仅能管理文件，还能安装软件。我们来尝试两种常见的安装场景：安装系统工具（如 wget/git）和安装 Python 库（如 requests）。',
    goal: '任选其一：安装系统工具或 Python 库。',
    aiQuery: '怎么用命令行安装软件？我想装 git 或者 python 的 requests 库。',
    aiResponse: {
      mac: 'macOS 推荐使用 Homebrew 安装系统软件，使用 pip 安装 Python 库。',
      linux:
        'Linux (Ubuntu/Debian) 使用 apt 安装系统软件，使用 pip 安装 Python 库。',
      'win-ps':
        'Windows PowerShell 推荐使用 winget 安装系统软件，使用 pip 安装 Python 库。',
      'win-cmd':
        'Windows CMD 推荐使用 winget 安装系统软件，使用 pip 安装 Python 库。',
      common: '不同系统有不同的包管理器。'
    },
    commands: {
      mac: [
        { label: '安装 wget (系统)', cmd: 'brew install wget' },
        { label: '安装 requests (Python)', cmd: 'pip install requests' }
      ],
      linux: [
        { label: '安装 git (系统)', cmd: 'sudo apt install git' },
        { label: '安装 requests (Python)', cmd: 'pip install requests' }
      ],
      'win-ps': [
        { label: '安装 git (系统)', cmd: 'winget install git.git' },
        { label: '安装 requests (Python)', cmd: 'pip install requests' }
      ],
      'win-cmd': [
        { label: '安装 git (系统)', cmd: 'winget install git.git' },
        { label: '安装 requests (Python)', cmd: 'pip install requests' }
      ]
    },
    expectedCmd: {
      // Fallback/Legacy
      mac: 'brew install wget',
      linux: 'sudo apt install git',
      'win-ps': 'pip install requests',
      'win-cmd': 'pip install requests'
    },
    validate: (cmd, os) => {
      const c = cmd.trim()
      if (os === 'mac')
        return c === 'brew install wget' || c === 'pip install requests'
      if (os === 'linux')
        return (
          c === 'sudo apt install git' ||
          c === 'apt install git' ||
          c === 'pip install requests'
        )
      if (os === 'win-ps' || os === 'win-cmd')
        return (
          c === 'winget install git.git' ||
          c === 'winget install git' ||
          c === 'pip install requests'
        )
      return c === 'pip install requests'
    },
    output: (os, cmd) => {
      // Modified to accept cmd
      const c = cmd ? cmd.trim() : ''

      // Python requests output
      if (c.includes('pip install requests')) {
        return `
Downloading/unpacking requests
  Downloading requests-2.31.0-py3-none-any.whl (62kB): 62kB downloaded
Installing collected packages: requests
Successfully installed requests
Cleaning up...`
      }

      // Windows winget output
      if (c.includes('winget install')) {
        return `
Found Git [Git.Git] Version 2.43.0
This application is licensed to you by its owner.
Microsoft is not responsible for, nor does it grant any licenses to, third-party packages.
Downloading https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe
  ██████████████████████████████  58.2 MB / 58.2 MB
Successfully verified installer hash
Starting package install...
Successfully installed`
      }

      // System tools output
      if (os === 'mac') {
        return `
==> Downloading https://ghcr.io/v2/homebrew/core/wget/manifests/1.21.4
######################################################################## 100.0%
==> Installing wget
🍺  /usr/local/Cellar/wget/1.21.4: 90 files, 4.2MB`
      }
      if (os === 'linux') {
        return `
Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  git
0 upgraded, 1 newly installed, 0 to remove.
Get:1 http://archive.ubuntu.com/ubuntu jammy/main amd64 git amd64 1:2.34.1 [3MB]
Fetched 3MB in 1s (2560 kB/s)
Setting up git (1:2.34.1-1ubuntu1.9) ...`
      }
      return `Successfully installed.`
    }
  },
  {
    title: '第六步：打扫战场',
    description: '练习结束了，我们把刚才创建的文件删除掉，保持环境整洁。',
    goal: '删除 "hello.txt" 文件。',
    aiQuery: '我不想要 hello.txt 了，怎么删除它？',
    aiResponse: {
      mac: '删除文件使用 `rm` 命令 (Remove)。小心，这个操作通常不可撤销！输入 `rm hello.txt`。',
      linux:
        '删除文件使用 `rm` 命令 (Remove)。小心，这个操作通常不可撤销！输入 `rm hello.txt`。',
      'win-ps': '在 PowerShell 中使用 `rm` 或 `del`。输入 `rm hello.txt`。',
      'win-cmd': '在 CMD 中使用 `del` 命令 (Delete)。输入 `del hello.txt`。'
    },
    expectedCmd: {
      mac: 'rm hello.txt',
      linux: 'rm hello.txt',
      'win-ps': 'rm hello.txt',
      'win-cmd': 'del hello.txt'
    },
    validate: (cmd, os) => {
      const c = cmd.trim()
      return c === 'rm hello.txt' || c === 'del hello.txt'
    },
    output: () => ''
  }
]

const currentTask = computed(() => tasks[currentTaskIndex.value])
const isTaskCompleted = ref(false)

const toggleAi = () => {
  isAiOpen.value = !isAiOpen.value
}

const copyCommand = (cmd) => {
  inputCmd.value = cmd
  focusInput()
}

const focusInput = () => {
  if (cmdInput.value) {
    cmdInput.value.focus()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

const executeCommand = () => {
  const cmd = inputCmd.value
  if (!cmd.trim()) return

  // 1. Add to history
  let currentPrompt = prompt.value
  // Special handling for prompt update simulation (hacky way)
  if (
    currentTaskIndex.value >= 2 &&
    currentTaskIndex.value < 6 &&
    history.value.length > 0
  ) {
    // If we are inside demo folder
    if (currentOS.value === 'mac') currentPrompt = 'user@MacBook demo % '
    else if (currentOS.value === 'linux')
      currentPrompt = 'user@localhost:~/demo$ '
    else if (currentOS.value === 'win-ps')
      currentPrompt = 'PS C:\\Users\\User\\demo> '
    else currentPrompt = 'C:\\Users\\User\\demo> '
  }

  history.value.push({ type: 'input', prompt: currentPrompt, content: cmd })
  inputCmd.value = ''

  // 2. Process Command
  // Check if it matches current task requirement
  if (
    !isTaskCompleted.value &&
    currentTask.value.validate(cmd, currentOS.value)
  ) {
    // Success
    const out = currentTask.value.output(currentOS.value, cmd) // Pass cmd to output
    if (out) {
      history.value.push({ type: 'output', content: out })
    }
    isTaskCompleted.value = true
  } else {
    // Failure or just random command
    // Simple mock responses for common commands if not matching task
    if (cmd.trim() === 'ls' || cmd.trim() === 'dir') {
      if (currentTaskIndex.value < 2) {
        // Initial state
        history.value.push({
          type: 'output',
          content: tasks[0].output(currentOS.value)
        })
      } else if (currentTaskIndex.value >= 2) {
        // Inside demo
        if (currentTaskIndex.value === 3)
          history.value.push({ type: 'output', content: '' }) // empty
        else history.value.push({ type: 'output', content: 'hello.txt' })
      }
    } else if (cmd.trim() === 'clear' || cmd.trim() === 'cls') {
      history.value = []
    } else if (!isTaskCompleted.value) {
      history.value.push({
        type: 'error',
        content: `Command not found or not matching task: ${cmd}`
      })
      history.value.push({
        type: 'info',
        content: `💡 提示：试试点击左侧的“问问 AI”？`
      })
    }
  }

  scrollToBottom()
}

const nextTask = () => {
  if (currentTaskIndex.value < tasks.length - 1) {
    currentTaskIndex.value++
    isTaskCompleted.value = false
    // Clear history to keep it clean? Or keep it? Let's keep it but maybe add a separator
    history.value.push({
      type: 'info',
      content: `--- 进入下一关: ${currentTask.value.title} ---`
    })
    scrollToBottom()
  }
}

const resetCurrentTask = () => {
  isTaskCompleted.value = false
  inputCmd.value = ''
  history.value = []
}

const resetAll = () => {
  currentTaskIndex.value = 0
  resetCurrentTask()
}

watch(currentOS, () => {
  // When OS changes, prompt changes, reset history to look consistent
  resetCurrentTask()
})
</script>

<style scoped>
.terminal-hands-on {
  margin: 2rem 0;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.lab-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .lab-container {
    grid-template-columns: 1fr;
  }
}

/* Left Panel */
.task-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--vp-c-divider);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-title {
  font-weight: bold;
  color: var(--vp-c-brand);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.os-selector select {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
}

.task-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.task-desc {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

/* AI Helper */
.ai-helper {
  margin-bottom: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.ai-header {
  padding: 10px 15px;
  background: linear-gradient(to right, rgba(16, 185, 129, 0.1), transparent);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: background 0.2s;
}

.ai-header:hover {
  background: linear-gradient(to right, rgba(16, 185, 129, 0.2), transparent);
}

.ai-chat {
  padding: 15px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.chat-bubble {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 10px;
  max-width: 90%;
}

.chat-bubble.user {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  margin-left: auto;
  border-bottom-right-radius: 2px;
}

.chat-bubble.ai {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  margin-right: auto;
  border-bottom-left-radius: 2px;
}

.cmd-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.copy-btn {
  font-size: 0.8rem;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}

.copy-btn:hover {
  background: var(--vp-c-brand);
  color: white;
}

/* Result & Success */
.expected-result {
  margin-top: auto;
  padding: 10px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9rem;
}

.expected-result .label {
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.success-message {
  margin-top: auto;
  padding: 15px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 8px;
  color: #10b981;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.next-btn,
.reset-btn {
  margin-left: auto;
  padding: 6px 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.1s;
}

.next-btn:hover,
.reset-btn:hover {
  transform: scale(1.05);
  background: #059669;
}

/* Right Panel: Terminal */
.terminal-panel {
  background: #1e1e1e;
  color: #f0f0f0;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.terminal-panel.win-cmd {
  background: #0c0c0c;
  color: #cccccc;
  font-family: 'Consolas', monospace;
}
.terminal-panel.win-ps {
  background: #012456;
  color: #ffffff;
  font-family: 'Consolas', monospace;
}
.terminal-panel.mac,
.terminal-panel.linux {
  background: #2b2b2b;
  color: #f0f0f0;
}

.terminal-header {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  position: relative;
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red {
  background: #ff5f56;
}
.dot.yellow {
  background: #ffbd2e;
}
.dot.green {
  background: #27c93f;
}

.terminal-panel.win-cmd .dot,
.terminal-panel.win-ps .dot {
  border-radius: 0;
  background: #ccc;
}

.terminal-header .title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

.terminal-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  cursor: text;
  font-size: 14px;
  line-height: 1.5;
}

.line {
  white-space: pre-wrap;
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
}

.prompt {
  margin-right: 8px;
  color: #87d700;
  font-weight: bold;
}

.terminal-panel.win-cmd .prompt {
  color: #cccccc;
}
.terminal-panel.win-ps .prompt {
  color: #ffffff;
}

.input-line {
  display: flex;
  align-items: center;
}

.input-line input {
  background: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  flex: 1;
  outline: none;
  padding: 0;
  margin: 0;
}

.enter-hint {
  color: #666;
  font-size: 12px;
  margin-left: 10px;
  animation: blink 1.5s infinite;
  white-space: nowrap;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.line.output {
  color: inherit;
  opacity: 0.9;
  margin-bottom: 4px;
}

.line.error {
  color: #ff5f56;
}

.line.info {
  color: #27c93f;
  margin: 8px 0;
  font-style: italic;
  opacity: 0.7;
}
</style>
