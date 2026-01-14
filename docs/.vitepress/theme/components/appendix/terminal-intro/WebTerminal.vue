<!--
  WebTerminal.vue
  Web 模拟终端组件
  
  用途：
  提供一个在浏览器中可交互的简易终端环境，作为本章节的综合练习场。
  让用户在学完所有理论后，能够在一个受控环境中实际体验输入输出、命令执行等操作。
  
  交互功能：
  - 命令执行：支持简单的模拟命令（如 help, clear, echo 等）。
  - 历史记录：支持上下键翻阅命令历史。
  - 真实反馈：模拟真实的终端响应延迟和输出格式。
-->
<template>
  <div class="web-terminal-wrapper">
    <div class="terminal-container">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn red"></span>
          <span class="btn yellow"></span>
          <span class="btn green"></span>
        </div>
        <div class="terminal-title">Terminal - zsh</div>
      </div>
      <div class="terminal-body" ref="terminalBody" @click="focusInput">
        <div v-for="(line, index) in history" :key="index" class="terminal-line">
          <span class="prompt" v-if="line.type === 'input'">
            <span class="path">{{ currentPath }}</span>
            <span class="arrow">$ </span>
          </span>
          <span :class="line.type">{{ line.content }}</span>
        </div>
        <div class="input-line">
          <span class="prompt">
            <span class="path">{{ currentPath }}</span>
            <span class="arrow">$ </span>
          </span>
          <input 
            type="text" 
            v-model="currentInput" 
            @keyup.enter="executeCommand"
            @keydown.up.prevent="navigateHistory(-1)"
            @keydown.down.prevent="navigateHistory(1)"
            @keydown.tab.prevent="handleTabCompletion"
            ref="inputField"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    </div>

    <div class="cheat-sheet">
      <div class="sheet-title">
        <span class="icon">📖</span> 
        <span class="en">Command Cheat Sheet</span>
        <span class="divider">|</span>
        <span class="zh">命令速查表</span>
      </div>
      <div class="sheet-content">
        <div class="cmd-group" v-for="(group, gIndex) in cheatSheet" :key="gIndex">
          <div class="group-title">{{ group.category }}</div>
          <div class="cmd-item" v-for="(cmd, cIndex) in group.commands" :key="cIndex">
            <div class="cmd-name" @click="fillCommand(cmd.name)">{{ cmd.name }}</div>
            <div class="cmd-desc">
              <div class="en">{{ cmd.descEn }}</div>
              <div class="zh">{{ cmd.descZh }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const history = ref([
  { type: 'output', content: 'Welcome to the interactive terminal simulator! / 欢迎使用交互式终端模拟器！' },
  { type: 'output', content: 'Type "help" to see available commands. / 输入 "help" 查看可用命令。' }
])
const currentInput = ref('')
const inputField = ref(null)
const terminalBody = ref(null)
const commandHistory = ref([])
const historyIndex = ref(-1)

// 模拟文件系统
const fileSystem = {
  name: '/',
  type: 'dir',
  children: {
    'home': {
      name: 'home',
      type: 'dir',
      children: {
        'user': {
          name: 'user',
          type: 'dir',
          children: {
            'hello.txt': { name: 'hello.txt', type: 'file', content: 'Hello World! This is a mock file.\n你好！这是一个模拟文件。' },
            'notes.md': { name: 'notes.md', type: 'file', content: '# My Notes\n- Learn Terminal\n- Learn Shell\n- Learn Kernel' },
            'projects': { 
              name: 'projects',
              type: 'dir', 
              children: {
                'app.js': { name: 'app.js', type: 'file', content: 'console.log("Hello");' }
              } 
            },
            'Downloads': { name: 'Downloads', type: 'dir', children: {} }
          }
        }
      }
    },
    'etc': {
      name: 'etc',
      type: 'dir',
      children: {
        'passwd': { name: 'passwd', type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/zsh' }
      }
    },
    'bin': {
      name: 'bin',
      type: 'dir',
      children: {
        'ls': { name: 'ls', type: 'file', content: 'Binary file' },
        'cat': { name: 'cat', type: 'file', content: 'Binary file' }
      }
    }
  }
}

let currentPath = '~'
let currentDirObj = fileSystem.children['home'].children['user']

const resolvePath = (path) => {
  if (path === '~' || path === '') return fileSystem.children['home'].children['user']
  if (path === '/') return fileSystem
  
  let parts = path.split('/').filter(p => p)
  let current = path.startsWith('/') ? fileSystem : currentDirObj
  
  for (const part of parts) {
    if (part === '.') continue
    if (part === '..') {
      // Find parent (simplification: we don't store parent refs, so we re-traverse or just mock it)
      // For this simple mock, '..' support is limited or we implement path string manipulation
      return null // path manipulation logic needs to be separate
    }
    if (current.type === 'dir' && current.children && current.children[part]) {
      current = current.children[part]
    } else {
      return null
    }
  }
  return current
}

const getParentPath = (path) => {
  if (path === '/' || path === '~') return path // Simplified
  const parts = path.split('/')
  parts.pop()
  return parts.join('/') || '/'
}

// Better path resolution logic
const navigateTo = (target) => {
  let newPath = currentPath
  let newDir = currentDirObj

  if (target === '/') {
    newPath = '/'
    newDir = fileSystem
  } else if (target === '~') {
    newPath = '~'
    newDir = fileSystem.children['home'].children['user']
  } else if (target === '..') {
    if (currentPath === '/') return { path: '/', dir: fileSystem }
    if (currentPath === '~') { // ~ is /home/user
       newPath = '/home'
       newDir = fileSystem.children['home']
    } else {
       // Simple string manipulation for path
       const parts = currentPath.split('/')
       parts.pop()
       newPath = parts.join('/') || '/'
       
       // Re-resolve dir from root for safety
       if (newPath === '/') newDir = fileSystem
       else if (newPath === '/home') newDir = fileSystem.children['home']
       else if (newPath === '/home/user') newDir = fileSystem.children['home'].children['user']
       else {
         // Fallback for deeper paths if we supported them
         // For now, let's keep it simple
       }
    }
  } else {
    // Relative path
    if (currentDirObj.children && currentDirObj.children[target]) {
      const targetObj = currentDirObj.children[target]
      if (targetObj.type === 'dir') {
        newDir = targetObj
        newPath = currentPath === '/' ? `/${target}` : `${currentPath}/${target}`
      } else {
        return { error: `cd: not a directory: ${target}` }
      }
    } else {
      return { error: `cd: no such file or directory: ${target}` }
    }
  }
  return { path: newPath, dir: newDir }
}

const cheatSheet = [
  {
    category: 'Navigation / 导航',
    commands: [
      { name: 'ls', descEn: 'List directory contents', descZh: '列出当前目录下的文件和文件夹' },
      { name: 'cd <dir>', descEn: 'Change directory', descZh: '进入指定目录 (例如: cd projects)' },
      { name: 'pwd', descEn: 'Print working directory', descZh: '显示当前所在的完整路径' }
    ]
  },
  {
    category: 'File Operations / 文件操作',
    commands: [
      { name: 'cat <file>', descEn: 'Show file contents', descZh: '查看文件内容 (例如: cat hello.txt)' },
      { name: 'touch <file>', descEn: 'Create empty file', descZh: '创建一个新文件' },
      { name: 'mkdir <dir>', descEn: 'Make directory', descZh: '创建一个新文件夹' },
      { name: 'rm <file>', descEn: 'Remove file', descZh: '删除文件' }
    ]
  },
  {
    category: 'System / 系统',
    commands: [
      { name: 'echo <text>', descEn: 'Print text', descZh: '在屏幕上打印一段文字' },
      { name: 'whoami', descEn: 'Current user', descZh: '显示当前用户名' },
      { name: 'date', descEn: 'Show date/time', descZh: '显示当前日期和时间' },
      { name: 'clear', descEn: 'Clear screen', descZh: '清空屏幕内容' }
    ]
  },
  {
    category: 'Package Manager / 软件包 (Mock)',
    commands: [
      { name: 'apt update', descEn: 'Update package list', descZh: '更新软件包列表' },
      { name: 'apt install <pkg>', descEn: 'Install package', descZh: '安装软件 (例如: apt install git)' }
    ]
  }
]

const commands = {
  help: () => {
    return `Available commands:
  ls, cd, pwd, cat, touch, mkdir, rm, echo, whoami, date, clear, apt`
  },
  
  ls: (args) => {
    if (!currentDirObj.children) return ''
    const items = Object.values(currentDirObj.children)
    if (items.length === 0) return ''
    
    // Simple column formatting
    const names = items.map(item => {
      return item.type === 'dir' ? `\x1b[1;34m${item.name}/\x1b[0m` : item.name
    })
    return names.join('  ')
  },

  pwd: () => {
    // Expand ~ to /home/user for display if needed, but keeping ~ is also standard zsh
    return currentPath === '~' ? '/home/user' : currentPath
  },

  cd: (args) => {
    const target = args[0] || '~'
    const result = navigateTo(target)
    if (result.error) return result.error
    currentPath = result.path
    currentDirObj = result.dir
    return null
  },

  clear: () => {
    history.value = []
    return null
  },

  echo: (args) => {
    return args.join(' ')
  },

  cat: (args) => {
    const file = args[0]
    if (!file) return 'usage: cat <file>'
    
    if (currentDirObj.children && currentDirObj.children[file]) {
      const target = currentDirObj.children[file]
      if (target.type === 'dir') return `cat: ${file}: Is a directory`
      return target.content
    }
    return `cat: ${file}: No such file or directory`
  },

  touch: (args) => {
    const name = args[0]
    if (!name) return 'usage: touch <file>'
    if (currentDirObj.children[name]) return null // Already exists, update time (mock: do nothing)
    currentDirObj.children[name] = { name, type: 'file', content: '' }
    return null
  },

  mkdir: (args) => {
    const name = args[0]
    if (!name) return 'usage: mkdir <dir>'
    if (currentDirObj.children[name]) return `mkdir: cannot create directory '${name}': File exists`
    currentDirObj.children[name] = { name, type: 'dir', children: {} }
    return null
  },

  rm: (args) => {
    const name = args[0]
    if (!name) return 'usage: rm <file>'
    // Mock: -r not supported for simplicity
    if (currentDirObj.children[name]) {
      if (currentDirObj.children[name].type === 'dir') return `rm: cannot remove '${name}': Is a directory`
      delete currentDirObj.children[name]
      return null
    }
    return `rm: cannot remove '${name}': No such file or directory`
  },

  whoami: () => 'user',
  
  date: () => new Date().toString(),

  apt: (args) => {
    const cmd = args[0]
    if (cmd === 'update') {
      return `Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Fetched 110 kB in 1s (135 kB/s)
Reading package lists... Done`
    }
    if (cmd === 'install') {
      const pkg = args[1]
      if (!pkg) return 'apt install: missing package name'
      return `Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  ${pkg}
0 upgraded, 1 newly installed, 0 to remove.
Need to get 1,234 kB of archives.
After this operation, 5,678 kB of additional disk space will be used.
Selecting previously unselected package ${pkg}.
(Reading database ... 25432 files and directories currently installed.)
Preparing to unpack .../${pkg}_1.0.0_amd64.deb ...
Unpacking ${pkg} (1.0.0) ...
Setting up ${pkg} (1.0.0) ...`
    }
    return 'apt: usage: apt update | apt install <package>'
  }
}

const executeCommand = () => {
  const input = currentInput.value.trim()
  
  if (!input) {
    history.value.push({ type: 'input', content: '' })
    currentInput.value = ''
    scrollToBottom()
    return
  }

  // Add to command history
  commandHistory.value.push(input)
  historyIndex.value = commandHistory.value.length

  history.value.push({ type: 'input', content: input })

  const [cmd, ...args] = input.split(/\s+/)
  
  if (commands[cmd]) {
    try {
      const output = commands[cmd](args)
      if (output !== null) {
        // Handle colored output simply by not escaping HTML if we trust it (Vue escapes by default)
        // For simple color simulation, we can strip codes or use a span. 
        // Here we just keep simple text, but `ls` returns ANSI codes which we might want to handle or strip.
        // For this demo, let's strip ANSI codes for safety/simplicity in Vue or parse them.
        // Let's simple string replace for blue color
        
        let safeOutput = output
        
        const lines = safeOutput.split('\n')
        lines.forEach(line => {
           // Basic ANSI parser for ls colors
           const isDir = line.includes('\x1b[1;34m')
           const cleanContent = line.replace(/\x1b\[[0-9;]*m/g, '')
           history.value.push({ type: isDir ? 'output-dir' : 'output', content: cleanContent })
        })
      }
    } catch (e) {
      history.value.push({ type: 'error', content: `Error executing command: ${e.message}` })
    }
  } else {
    history.value.push({ type: 'error', content: `zsh: command not found: ${cmd}` })
  }

  currentInput.value = ''
  scrollToBottom()
}

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return
  
  historyIndex.value += direction
  
  if (historyIndex.value < 0) historyIndex.value = 0
  if (historyIndex.value > commandHistory.value.length) historyIndex.value = commandHistory.value.length
  
  if (historyIndex.value === commandHistory.value.length) {
    currentInput.value = ''
  } else {
    currentInput.value = commandHistory.value[historyIndex.value]
  }
}

const handleTabCompletion = () => {
  // Simple tab completion for current directory
  const input = currentInput.value
  const [cmd, ...args] = input.split(/\s+/)
  const partial = args[args.length - 1] || ''
  
  if (cmd && currentDirObj.children) {
    const matches = Object.keys(currentDirObj.children).filter(name => name.startsWith(partial))
    if (matches.length === 1) {
      const completed = matches[0]
      // Replace last arg with completed
      args[args.length - 1] = completed
      currentInput.value = `${cmd} ${args.join(' ')}`
    }
  }
}

const focusInput = () => {
  inputField.value?.focus()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

const fillCommand = (cmdName) => {
  // Extract command from example (e.g., "cd <dir>" -> "cd")
  const cmd = cmdName.split(' ')[0]
  currentInput.value = cmd + ' '
  focusInput()
}

onMounted(() => {
  focusInput()
})
</script>

<style scoped>
.web-terminal-wrapper {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  margin: 20px 0;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
}

.terminal-container {
  background-color: #0a0a0a;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid #27272a;
  display: flex;
  flex-direction: column;
  height: 400px;
}

.terminal-header {
  background-color: #18181b;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #27272a;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.red { background-color: #ef4444; }
.yellow { background-color: #facc15; }
.green { background-color: #22c55e; }

.terminal-title {
  flex: 1;
  text-align: center;
  color: #71717a;
  font-size: 12px;
  margin-left: -50px;
}

.terminal-body {
  padding: 15px;
  flex: 1;
  overflow-y: auto;
  color: #e4e4e7;
  font-size: 14px;
  line-height: 1.6;
  cursor: text;
}

.terminal-line {
  margin-bottom: 2px;
  white-space: pre-wrap;
  word-break: break-all;
}

.input-line {
  display: flex;
  align-items: center;
}

.prompt {
  color: #22c55e;
  margin-right: 8px;
  user-select: none;
  white-space: nowrap;
}

.prompt .path {
  color: #3b82f6;
  margin-right: 4px;
}

.error {
  color: #ef4444;
}

.output-dir {
  color: #3b82f6;
  font-weight: bold;
}

input {
  background: transparent;
  border: none;
  color: #e4e4e7;
  outline: none;
  flex: 1;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  margin: 0;
}

/* Cheat Sheet Styles */
.cheat-sheet {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 400px;
}

.sheet-title {
  padding: 12px 15px;
  background: #27272a;
  color: #e4e4e7;
  font-weight: bold;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sheet-title .divider {
  color: #52525b;
  font-weight: normal;
}

.sheet-content {
  padding: 15px;
  overflow-y: auto;
  flex: 1;
}

.cmd-group {
  margin-bottom: 20px;
}

.group-title {
  color: #facc15;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
  padding-bottom: 4px;
}

.cmd-item {
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.1s;
}

.cmd-item:hover {
  transform: translateX(4px);
}

.cmd-name {
  color: #22d3ee;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 2px;
}

.cmd-desc {
  font-size: 11px;
  color: #a1a1aa;
}

.cmd-desc .zh {
  color: #71717a;
  margin-top: 1px;
}

@media (max-width: 768px) {
  .web-terminal-wrapper {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .terminal-container, .cheat-sheet {
    height: 350px;
  }
}
</style>
