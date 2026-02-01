<script setup>
import { ref, nextTick, watch } from 'vue'

const logs = ref([
  { type: 'log', message: 'Welcome to the interactive console demo!' },
  { type: 'info', message: 'Try typing simple JavaScript commands below.' },
  { type: 'warn', message: 'This is a simulated environment, not a real JS engine.' }
])

const inputCommand = ref('')
const consoleRef = ref(null)

const executeCommand = () => {
  const cmd = inputCommand.value.trim()
  if (!cmd) return

  logs.value.push({ type: 'command', message: `> ${cmd}` })

  try {
    let result
    // Simple simulation of common commands
    if (cmd.startsWith('console.log')) {
      const match = cmd.match(/console\.log\((.*)\)/)
      const msg = match ? match[1].replace(/['"]/g, '') : ''
      logs.value.push({ type: 'log', message: msg })
      result = undefined
    } else if (cmd.startsWith('console.warn')) {
      const match = cmd.match(/console\.warn\((.*)\)/)
      const msg = match ? match[1].replace(/['"]/g, '') : ''
      logs.value.push({ type: 'warn', message: msg })
      result = undefined
    } else if (cmd.startsWith('console.error')) {
      const match = cmd.match(/console\.error\((.*)\)/)
      const msg = match ? match[1].replace(/['"]/g, '') : ''
      logs.value.push({ type: 'error', message: msg })
      result = undefined
    } else if (cmd.startsWith('alert')) {
        const match = cmd.match(/alert\((.*)\)/)
        const msg = match ? match[1].replace(/['"]/g, '') : ''
        alert(msg)
        result = undefined
    } else if (cmd === 'clear()') {
      logs.value = []
      result = 'Console was cleared'
    } else {
      // Safe eval for math and basic types
      // Note: This is a demo, strict security is less critical but good practice to avoid real eval
      // using Function constructor for basic math
      try {
        result = new Function('return ' + cmd)()
      } catch (e) {
        throw new Error(e.message)
      }
    }

    if (result !== undefined) {
      logs.value.push({ type: 'result', message: '< ' + String(result) })
    }
  } catch (err) {
    logs.value.push({ type: 'error', message: 'Uncaught ReferenceError: ' + err.message })
  }

  inputCommand.value = ''
  scrollToBottom()
}

const clearConsole = () => {
  logs.value = []
}

const scrollToBottom = () => {
  nextTick(() => {
    if (consoleRef.value) {
      consoleRef.value.scrollTop = consoleRef.value.scrollHeight
    }
  })
}

const shortcuts = [
  { label: 'console.log("Hello")', cmd: 'console.log("Hello World")' },
  { label: '1 + 1', cmd: '1 + 1' },
  { label: 'console.error("Oops")', cmd: 'console.error("Something went wrong!")' },
  { label: 'alert("Hi")', cmd: 'alert("Hello from DevTools!")' }
]

const runShortcut = (cmd) => {
  inputCommand.value = cmd
  executeCommand()
}
</script>

<template>
  <el-card class="console-demo" shadow="hover">
    <template #header>
      <div class="header">
        <span class="title">Console (控制台)</span>
        <el-button size="small" @click="clearConsole" icon="Delete" circle title="Clear console" />
      </div>
    </template>
    
    <div class="console-body" ref="consoleRef">
      <div v-for="(log, index) in logs" :key="index" class="log-item" :class="log.type">
        <span class="icon" v-if="log.type === 'error'">❌</span>
        <span class="icon" v-else-if="log.type === 'warn'">⚠️</span>
        <span class="icon" v-else-if="log.type === 'info'">ℹ️</span>
        <span class="icon" v-else-if="log.type === 'result'">⬅️</span>
        <span class="content">{{ log.message }}</span>
      </div>
    </div>

    <div class="input-area">
      <el-input
        v-model="inputCommand"
        placeholder="输入 JS 代码，按回车执行..."
        @keyup.enter="executeCommand"
      >
        <template #prepend>></template>
      </el-input>
    </div>
    
    <div class="shortcuts">
      <span class="label">快速尝试：</span>
      <el-button-group>
        <el-button 
          v-for="s in shortcuts" 
          :key="s.label" 
          size="small" 
          @click="runShortcut(s.cmd)"
        >
          {{ s.label }}
        </el-button>
      </el-button-group>
    </div>
  </el-card>
</template>

<style scoped>
.console-demo {
  margin: 20px 0;
  border: 1px solid #dcdfe6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: bold;
}

.console-body {
  height: 250px;
  overflow-y: auto;
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  margin-bottom: 12px;
}

.log-item {
  padding: 4px 8px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: flex-start;
}

.log-item.command {
  color: #606266;
  font-weight: bold;
}

.log-item.result {
  color: #909399;
  font-style: italic;
}

.log-item.error {
  background-color: #fef0f0;
  color: #f56c6c;
  border-left: 4px solid #f56c6c;
}

.log-item.warn {
  background-color: #fdf6ec;
  color: #e6a23c;
  border-left: 4px solid #e6a23c;
}

.log-item.info {
  color: #409eff;
}

.log-item .icon {
  margin-right: 8px;
  flex-shrink: 0;
}

.log-item .content {
  word-break: break-all;
}

.shortcuts {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.shortcuts .label {
  font-size: 12px;
  color: #909399;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .console-body {
    background-color: #1e1e1e;
    border-color: #333;
    color: #d4d4d4;
  }
  
  .log-item {
    border-bottom-color: #333;
  }
  
  .log-item.command { color: #a8a8a8; }
  .log-item.result { color: #808080; }
  .log-item.error { background-color: #290000; color: #f14c4c; }
  .log-item.warn { background-color: #332b00; color: #cca700; }
}
</style>
