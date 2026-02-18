<template>
  <div class="command-demo">
    <div class="panel">
      <div class="terminal">
        <div class="output">
          <div
            v-for="(line, i) in output"
            :key="i"
            :class="line.type"
          >
            <span
              v-if="line.type === 'command'"
              class="prompt"
            >$</span>
            <span v-html="line.text" />
          </div>
          <div
            v-if="output.length === 0"
            class="welcome"
          >
            输入命令开始学习 Git（建议先点“制造改动”，再跑 git status）
          </div>
        </div>
        <div class="input-line">
          <span class="prompt">$</span>
          <input
            v-model="cmd"
            placeholder="（默认安全模式）请用下方按钮执行命令"
            class="cmd-input"
            :disabled="!freeMode"
            @keyup.enter="execute({ fromQuick: false })"
          >
          <button
            class="run-btn"
            :disabled="!freeMode"
            @click="execute({ fromQuick: false })"
          >
            运行
          </button>
          <button
            class="run-btn secondary"
            @click="clearOutput"
          >
            清空
          </button>
          <button
            class="run-btn secondary"
            @click="toggleFreeMode"
          >
            {{ freeMode ? '切回安全模式' : '开启自由模式' }}
          </button>
        </div>
      </div>

      <div class="quick-cmds">
        <button
          class="cmd-btn"
          @click="makeChanges"
        >
          制造改动
        </button>
        <button
          class="cmd-btn"
          @click="runCmd('git init')"
        >
          git init
        </button>
        <button
          class="cmd-btn"
          @click="runCmd('git status')"
        >
          git status
        </button>
        <button
          class="cmd-btn"
          @click="runCmd('git add .')"
        >
          git add .
        </button>
        <button
          class="cmd-btn"
          @click="runCmd(`git commit -m 'msg'`)"
        >
          git commit
        </button>
        <button
          class="cmd-btn"
          @click="runCmd('git log --oneline')"
        >
          git log
        </button>
        <button
          class="cmd-btn"
          @click="runCmd('git switch -c feat/demo')"
        >
          新分支
        </button>
      </div>
    </div>

    <div class="info-box">
      <p>
        <strong>💡 建议练习顺序:</strong> 制造改动 → status → add → status →
        commit → log
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cmd = ref('')
const output = ref([])
const freeMode = ref(false)

// Minimal in-memory git state for learning purposes.
const state = ref({
  inited: false,
  branch: 'main',
  commits: { main: [] },
  working: [], // modified files (not staged)
  staged: [] // staged files
})

const pushLine = (type, text) => {
  output.value.push({ type, text: escapeHtml(text).replace(/\n/g, '<br />') })
  // keep the terminal from growing forever
  if (output.value.length > 60) output.value.splice(0, output.value.length - 60)
}

const escapeHtml = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\"', '&quot;')
    .replaceAll("'", '&#039;')

const genHash = () => Math.random().toString(16).slice(2, 9)

const ensureRepo = () => {
  if (!state.value.inited) {
    pushLine(
      'error',
      'fatal: not a git repository (or any of the parent directories): .git'
    )
    return false
  }
  return true
}

const statusText = () => {
  const s = state.value
  const lines = [`On branch ${s.branch}`]
  if (s.staged.length === 0 && s.working.length === 0) {
    lines.push('nothing to commit, working tree clean')
    return lines.join('\n')
  }
  if (s.staged.length) {
    lines.push('Changes to be committed:')
    s.staged.forEach((f) => lines.push(`  modified:   ${f}`))
  }
  if (s.working.length) {
    lines.push('Changes not staged for commit:')
    s.working.forEach((f) => lines.push(`  modified:   ${f}`))
  }
  return lines.join('\n')
}

const logText = () => {
  const s = state.value
  const list = s.commits[s.branch] || []
  if (!list.length)
    return 'fatal: your current branch does not have any commits yet'
  return list
    .slice()
    .reverse()
    .slice(0, 8)
    .map((c) => `${c.hash} ${c.msg}`)
    .join('\n')
}

const branchText = () => {
  const s = state.value
  return Object.keys(s.commits)
    .sort()
    .map((b) => (b === s.branch ? `* ${b}` : `  ${b}`))
    .join('\n')
}

const makeChanges = () => {
  if (!state.value.inited) {
    pushLine('info', '提示：先 git init，再制造改动效果更真实。')
    return
  }
  const base = ['src/app.js', 'README.md', 'src/utils.js']
  state.value.working = base.slice(0, 1 + Math.floor(Math.random() * 3))
  // staged changes are independent
  pushLine(
    'success',
    `Edited ${state.value.working.length} file(s) (simulated).`
  )
}

const execute = ({ fromQuick }) => {
  if (!freeMode.value && !fromQuick) {
    pushLine(
      'info',
      '当前是安全模式：请用下方按钮执行预设命令，避免“想当然”操作造成误解。'
    )
    cmd.value = ''
    return
  }

  const c = cmd.value.trim()
  if (!c) return

  pushLine('command', c)

  // Commands
  if (c === 'git init') {
    state.value.inited = true
    state.value.branch = 'main'
    state.value.commits = { main: [] }
    state.value.working = []
    state.value.staged = []
    pushLine('success', 'Initialized empty Git repository in ./.git/')
  } else if (c === 'git status') {
    if (!ensureRepo()) return
    pushLine('info', statusText())
  } else if (c === 'git add .' || c.startsWith('git add ')) {
    if (!ensureRepo()) return
    const s = state.value
    if (s.working.length === 0) {
      pushLine('info', 'Nothing specified, nothing added.')
      return
    }
    const toStage =
      c === 'git add .'
        ? [...s.working]
        : [c.replace(/^git add\s+/, '').trim()].filter(Boolean)
    toStage.forEach((f) => {
      if (!s.staged.includes(f)) s.staged.push(f)
      s.working = s.working.filter((x) => x !== f)
    })
    pushLine('success', `Added ${toStage.length} path(s) to staging area.`)
  } else if (c.startsWith('git commit')) {
    if (!ensureRepo()) return
    const s = state.value
    if (s.staged.length === 0) {
      pushLine('error', 'nothing to commit (no changes added to commit)')
      return
    }
    const msgMatch = c.match(/-m\\s+\"([^\"]+)\"|-m\\s+'([^']+)'/)
    const msg = msgMatch?.[1] || msgMatch?.[2] || 'commit'
    const commit = { hash: genHash(), msg, files: [...s.staged] }
    if (!s.commits[s.branch]) s.commits[s.branch] = []
    s.commits[s.branch].push(commit)
    s.staged = []
    pushLine(
      'success',
      `[${s.branch} ${commit.hash}] ${msg}\\n ${commit.files.length} file(s) changed`
    )
  } else if (c === 'git log --oneline') {
    if (!ensureRepo()) return
    pushLine('info', logText())
  } else if (c === 'git branch') {
    if (!ensureRepo()) return
    pushLine('info', branchText())
  } else if (
    c.startsWith('git switch -c ') ||
    c.startsWith('git checkout -b ')
  ) {
    if (!ensureRepo()) return
    const name = c.replace(/^git (switch -c|checkout -b)\s+/, '').trim()
    if (!name) {
      pushLine('error', 'fatal: you must specify a branch name')
      return
    }
    if (state.value.commits[name]) {
      pushLine('error', `fatal: A branch named '${name}' already exists.`)
      return
    }
    const base = state.value.commits[state.value.branch] || []
    state.value.commits[name] = [...base]
    state.value.branch = name
    pushLine('success', `Switched to a new branch '${name}'`)
  } else if (c.startsWith('git switch ') || c.startsWith('git checkout ')) {
    if (!ensureRepo()) return
    const name = c.replace(/^git (switch|checkout)\s+/, '').trim()
    if (!state.value.commits[name]) {
      pushLine(
        'error',
        `error: pathspec '${name}' did not match any file(s) known to git`
      )
      return
    }
    state.value.branch = name
    pushLine('success', `Switched to branch '${name}'`)
  } else if (c.startsWith('git restore')) {
    if (!ensureRepo()) return
    // Simplified restore for learning: clear working changes
    state.value.working = []
    pushLine('success', 'Restored working tree (simulated).')
  } else {
    pushLine(
      'error',
      'Unknown command (supported: init/status/add/commit/log/branch/switch/checkout/restore)'
    )
  }

  cmd.value = ''
}

const runCmd = (c) => {
  cmd.value = c
  execute({ fromQuick: true })
}

const clearOutput = () => {
  output.value = []
}

const toggleFreeMode = () => {
  freeMode.value = !freeMode.value
  cmd.value = ''
  pushLine(
    'info',
    freeMode.value
      ? '已开启自由模式：现在可以手动输入命令（仍然只模拟，不会影响真实仓库）。'
      : '已切回安全模式：请使用下方按钮执行预设命令。'
  )
}
</script>

<style scoped>
.command-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 0.5rem 0;
}

.terminal {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-family: var(--vp-font-family-mono);
}

.output {
  min-height: 150px;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.output .command {
  color: var(--vp-c-text-1);
}
.output .success {
  color: var(--vp-c-text-1);
}
.output .error {
  color: var(--vp-c-red-1, #ef4444);
}
.output .info {
  color: var(--vp-c-text-2);
}
.output .welcome {
  color: var(--vp-c-text-2);
  font-style: italic;
}

.input-line {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.prompt {
  color: var(--vp-c-brand);
}

.cmd-input {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
}

.cmd-input:focus {
  outline: none;
  border-color: rgba(var(--vp-c-brand-rgb), 0.45);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.run-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}

.run-btn.secondary {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-2);
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

.cmd-btn:hover {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  margin-top: 1rem;
}

.info-box p {
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
