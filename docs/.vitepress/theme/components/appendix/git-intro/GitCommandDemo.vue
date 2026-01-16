<template>
  <div class="command-demo">
    <div class="panel">
      <div class="terminal">
        <div class="output">
          <div v-for="(line, i) in output" :key="i" :class="line.type">
            <span v-if="line.type === 'command'" class="prompt">$</span>
            <span v-html="line.text"></span>
          </div>
          <div v-if="output.length === 0" class="welcome">
            输入命令开始学习 Git
          </div>
        </div>
        <div class="input-line">
          <span class="prompt">$</span>
          <input v-model="cmd" @keyup.enter="execute" placeholder="git status" class="cmd-input" />
          <button @click="execute" class="run-btn">运行</button>
        </div>
      </div>

      <div class="quick-cmds">
        <button @click="runCmd('git init')" class="cmd-btn">初始化</button>
        <button @click="runCmd('git status')" class="cmd-btn">状态</button>
        <button @click="runCmd('git add .')" class="cmd-btn">添加</button>
        <button @click="runCmd('git commit -m \'msg\'')" class="cmd-btn">提交</button>
      </div>
    </div>

    <div class="info-box">
      <p><strong>💡 常用命令:</strong> init → status → add → commit</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cmd = ref('')
const output = ref([])

const execute = () => {
  const c = cmd.value.trim()
  if (!c) return
  
  output.value.push({ type: 'command', text: c })
  
  if (c === 'git init') {
    output.value.push({ type: 'success', text: 'Initialized empty Git repository' })
  } else if (c === 'git status') {
    output.value.push({ type: 'info', text: 'On branch main\nnothing to commit' })
  } else if (c === 'git add .') {
    output.value.push({ type: 'success', text: 'Files added to staging area' })
  } else if (c.startsWith('git commit')) {
    output.value.push({ type: 'success', text: '1 file committed' })
  } else {
    output.value.push({ type: 'error', text: 'Unknown command' })
  }
  
  cmd.value = ''
}

const runCmd = (c) => {
  cmd.value = c
  execute()
}
</script>

<style scoped>
.command-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.terminal {
  background: #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-family: monospace;
}

.output {
  min-height: 150px;
  margin-bottom: 1rem;
  color: #d1d5db;
}

.output .command { color: #10b981; }
.output .success { color: #10b981; }
.output .error { color: #ef4444; }
.output .info { color: #60a5fa; }
.output .welcome { color: #9ca3af; font-style: italic; }

.input-line {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.prompt { color: #10b981; }

.cmd-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #d1d5db;
  font-family: monospace;
  font-size: 0.875rem;
}

.cmd-input:focus { outline: none; }

.run-btn {
  padding: 0.25rem 0.75rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}

.quick-cmds {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cmd-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
}

.cmd-btn:hover { background: var(--vp-c-brand); color: var(--vp-c-bg); }

.info-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  margin-top: 1rem;
}

.info-box p { margin: 0; color: var(--vp-c-text-1); line-height: 1.6; }
</style>
