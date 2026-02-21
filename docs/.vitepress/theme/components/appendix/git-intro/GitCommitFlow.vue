<template>
  <div class="gc-root">
    <!-- Terminal -->
    <div class="gc-terminal">
      <div class="term-bar">
        <span class="dot r" /><span class="dot y" /><span class="dot g" />
        <span class="term-title">~/project (main)</span>
      </div>
      <div ref="termEl" class="term-body">
        <div v-for="(l, i) in lines" :key="i" class="t-line">
          <span v-if="l.kind === 'cmd'" class="t-ps">$ </span>
          <span :class="'t-' + l.kind">{{ l.text }}</span>
        </div>
        <div class="t-line">
          <span class="t-ps">$ </span>
          <span class="t-typing">{{ typing }}<span class="t-cur">▋</span></span>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="gc-btns">
      <button
        v-for="op in ops"
        :key="op.id"
        :disabled="running || !op.ok()"
        :class="['gc-btn', { 'gc-btn--on': active === op.id, 'gc-btn--dim': !op.ok() }]"
        @click="run(op)"
      >
        <code>{{ op.cmd }}</code>
      </button>
      <button class="gc-btn gc-btn--reset" :disabled="running" @click="reset">重置</button>
    </div>

    <!-- 三区可视化 -->
    <div class="gc-three-areas">
      <div class="area-col area-work" :class="{ 'area-highlight': pulseArea === 'work' }">
        <div class="area-header">
          <span class="area-icon">📝</span>
          <span class="area-title">工作区</span>
          <span class="area-desc">Working Directory<br/>你正在改的文件</span>
        </div>
        <div class="area-body">
          <div class="area-label">Changes not staged for commit:</div>
          <template v-if="workFiles.length">
            <div v-for="f in workFiles" :key="f.name" class="file-row file-mod">
              <span class="file-badge">M</span>
              <code class="file-name">{{ f.name }}</code>
              <span class="file-state">未暂存</span>
            </div>
          </template>
          <div v-else class="area-empty">（无未暂存修改）</div>
        </div>
      </div>

      <div class="area-arrow" :class="{ 'arrow-lit': addDone }">
        <code class="arrow-cmd">git add</code>
        <span class="arrow-symbol">→</span>
      </div>

      <div class="area-col area-stage" :class="{ 'area-highlight': pulseArea === 'stage' }">
        <div class="area-header">
          <span class="area-icon">📦</span>
          <span class="area-title">暂存区</span>
          <span class="area-desc">Staging Area<br/>准备这次提交的文件</span>
        </div>
        <div class="area-body">
          <div class="area-label">Changes to be committed:</div>
          <template v-if="stagedFiles.length">
            <div v-for="f in stagedFiles" :key="f.name" class="file-row file-staged">
              <span class="file-badge">A</span>
              <code class="file-name">{{ f.name }}</code>
              <span class="file-state">已暂存</span>
            </div>
          </template>
          <div v-else class="area-empty">（空）</div>
        </div>
      </div>

      <div class="area-arrow" :class="{ 'arrow-lit': commitDone }">
        <code class="arrow-cmd">git commit</code>
        <span class="arrow-symbol">→</span>
      </div>

      <div class="area-col area-repo" :class="{ 'area-highlight': pulseArea === 'repo' }">
        <div class="area-header">
          <span class="area-icon">🗄️</span>
          <span class="area-title">仓库</span>
          <span class="area-desc">Repository (.git)<br/>永久保存的版本</span>
        </div>
        <div class="area-body">
          <div class="area-label">已提交记录 (git log):</div>
          <template v-if="commits.length">
            <div v-for="(c, i) in commits" :key="c.hash" class="commit-row">
              <span class="commit-badge">✓</span>
              <code class="commit-hash">{{ c.hash }}</code>
              <span class="commit-msg">{{ c.msg }}</span>
              <span v-if="i === 0" class="commit-head">HEAD</span>
            </div>
          </template>
          <div v-else class="area-empty">（无提交）</div>
        </div>
      </div>
    </div>

    <!-- Hint -->
    <div v-if="hint" class="gc-hint">💡 {{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const termEl = ref(null)
const lines = ref([{ kind: 'dim', text: '# 你刚改了 3 个文件，现在演示 add → commit 流程' }])
const typing = ref('')
const running = ref(false)
const active = ref(null)
const hint = ref('点击下方命令按钮，按顺序执行。观察上方三区里文件如何随命令移动。')
const pulseArea = ref(null)

const files = ref([
  { name: 'login.js', staged: false, committed: false },
  { name: 'style.css', staged: false, committed: false },
  { name: 'debug.log', staged: false, committed: false },
])
const commits = ref([{ hash: '9f3e1b2', msg: 'init: 项目初始化' }])

// 工作区：未暂存且未提交的修改（git status 里红色的）
const workFiles = computed(() =>
  files.value.filter(f => !f.staged && !f.committed)
)
// 暂存区：已暂存但还没提交的（git status 里绿色的）
const stagedFiles = computed(() =>
  files.value.filter(f => f.staged && !f.committed)
)

let addDone = false, commitDone = false

const ops = [
  {
    id: 'status',
    cmd: 'git status',
    ok: () => true,
    output: [
      { kind: 'dim', text: 'On branch main' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'Changes not staged for commit:' },
      { kind: 'red', text: '  modified:   login.js' },
      { kind: 'red', text: '  modified:   style.css' },
      { kind: 'red', text: '  modified:   debug.log' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'no changes added to commit (use "git add")' },
    ],
    hint: '红色 = 改了但还没暂存。三区里可以看到：3 个文件都在「工作区」，暂存区是空的。先用 git status 看清楚状态，再决定下一步。',
    do: () => { pulseArea.value = 'work' },
  },
  {
    id: 'add',
    cmd: 'git add login.js style.css',
    ok: () => !addDone,
    output: [
      { kind: 'dim', text: '# git add 只加你指定的文件，debug.log 跳过' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'On branch main' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'Changes to be committed:' },
      { kind: 'grn', text: '  modified:   login.js' },
      { kind: 'grn', text: '  modified:   style.css' },
      { kind: 'dim', text: '' },
      { kind: 'red', text: 'Untracked files:' },
      { kind: 'red', text: '  debug.log   ← 没 add，不会提交' },
    ],
    hint: '绿色 = 进入暂存区。观察：login.js 和 style.css 从工作区「搬进」了暂存区；debug.log 仍留在工作区（未暂存），不会参与这次提交。',
    do: () => {
      addDone = true
      files.value[0].staged = true
      files.value[1].staged = true
      pulseArea.value = 'stage'
    },
  },
  {
    id: 'commit',
    cmd: 'git commit -m "feat: 添加登录功能"',
    ok: () => addDone && !commitDone,
    output: [
      { kind: 'dim', text: '[main a1b2c3d] feat: 添加登录功能' },
      { kind: 'dim', text: ' 2 files changed, 47 insertions(+)' },
      { kind: 'dim', text: ' create mode 100644 login.js' },
      { kind: 'dim', text: ' create mode 100644 style.css' },
    ],
    hint: 'commit 成功！暂存区里的内容被「封存」进仓库，形成新的一条提交记录。暂存区变空；debug.log 仍在工作区，不受影响。',
    do: () => {
      commitDone = true
      files.value[0].staged = false
      files.value[0].committed = true
      files.value[1].staged = false
      files.value[1].committed = true
      commits.value.unshift({ hash: 'a1b2c3d', msg: 'feat: 添加登录功能' })
      pulseArea.value = 'repo'
    },
  },
  {
    id: 'log',
    cmd: 'git log --oneline',
    ok: () => commitDone,
    output: [
      { kind: 'yel', text: 'a1b2c3d (HEAD -> main) feat: 添加登录功能' },
      { kind: 'yel', text: '9f3e1b2 init: 项目初始化' },
    ],
    hint: '每行一个 commit，最新的在最上面。仓库区里可以看到完整的历史时间轴；工作区里只剩 debug.log（未提交的临时文件）。',
    do: () => { pulseArea.value = 'repo' },
  },
  {
    id: 'status2',
    cmd: 'git status',
    ok: () => commitDone,
    output: [
      { kind: 'dim', text: 'On branch main' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'Changes not staged for commit:' },
      { kind: 'red', text: '  modified:   debug.log' },
      { kind: 'dim', text: '' },
      { kind: 'dim', text: 'no changes added to commit (use "git add")' },
    ],
    hint: '提交后：login.js 和 style.css 已进仓库，工作区里只剩 debug.log 的修改。红色 = 改了但还没暂存，下次提交前可再 git add。',
    do: () => { pulseArea.value = 'work' },
  },
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function run(op) {
  if (running.value) return
  running.value = true
  active.value = op.id
  hint.value = ''
  typing.value = ''
  pulseArea.value = null

  for (const ch of op.cmd) {
    typing.value += ch
    await sleep(22)
  }
  await sleep(80)
  lines.value.push({ kind: 'cmd', text: op.cmd })
  typing.value = ''
  await nextTick()
  scroll()
  await sleep(150)

  for (const l of op.output) {
    lines.value.push(l)
    await nextTick()
    scroll()
    await sleep(50)
  }

  op.do()
  await sleep(120)
  hint.value = op.hint
  running.value = false
  setTimeout(() => { pulseArea.value = null }, 1500)
}

function scroll() {
  if (termEl.value) termEl.value.scrollTop = termEl.value.scrollHeight
}

function reset() {
  lines.value = [{ kind: 'dim', text: '# 你刚改了 3 个文件，现在演示 add → commit 流程' }]
  files.value.forEach(f => { f.staged = false; f.committed = false })
  commits.value = [{ hash: '9f3e1b2', msg: 'init: 项目初始化' }]
  addDone = false
  commitDone = false
  active.value = null
  pulseArea.value = null
  hint.value = '点击下方命令按钮，按顺序执行。观察上方三区里文件如何随命令移动。'
  typing.value = ''
  running.value = false
}
</script>

<style scoped>
.gc-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

/* Terminal */
.gc-terminal { background: #141420; }
.term-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  background: #1e1e2e;
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }
.term-title { margin-left: 8px; font-size: 0.72rem; color: #666; font-family: monospace; }

.term-body {
  min-height: 140px;
  max-height: 200px;
  overflow-y: auto;
  padding: 0.8rem 1rem;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.76rem;
  line-height: 1.65;
  color: #cdd6f4;
}
.t-line { display: flex; }
.t-ps { color: #a6e3a1; flex-shrink: 0; }
.t-cmd { color: #cdd6f4; }
.t-dim { color: #585b70; }
.t-red { color: #f38ba8; }
.t-grn { color: #a6e3a1; }
.t-yel { color: #89b4fa; }
.t-typing { color: #cdd6f4; }
.t-cur { animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* Buttons */
.gc-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 10px;
  background: #0d0d1a;
  border-top: 1px solid #2a2a3e;
}
.gc-btn {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 5px;
  padding: 4px 9px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.gc-btn code { font-size: 0.7rem; color: #7f849c; font-family: monospace; white-space: nowrap; }
.gc-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); }
.gc-btn--on { border-color: var(--vp-c-brand) !important; }
.gc-btn--on code { color: var(--vp-c-brand); }
.gc-btn--dim { opacity: 0.3; cursor: not-allowed; }
.gc-btn--reset {
  background: transparent;
  border-color: #313244;
  margin-left: auto;
}
.gc-btn--reset code { display: none; }
.gc-btn--reset::after { content: '重置'; font-size: 0.7rem; color: #585b70; }

/* 三区布局 */
.gc-three-areas {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0;
  align-items: stretch;
  padding: 12px 14px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  min-height: 180px;
}
@media (max-width: 720px) {
  .gc-three-areas {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
  }
  .area-arrow { transform: rotate(90deg); justify-self: center; }
}

.area-col {
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.area-col.area-highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand) 14%, transparent);
}
.area-work { border-left: 4px solid #f38ba8; }
.area-stage { border-left: 4px solid #a6e3a1; }
.area-repo { border-left: 4px solid #5b9cf6; }

.area-header {
  padding: 6px 10px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}
.area-icon { font-size: 1rem; margin-right: 4px; }
.area-title {
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
}
.area-desc {
  display: block;
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 2px;
  line-height: 1.3;
}

.area-body {
  padding: 8px 10px;
  flex: 1;
  min-height: 72px;
}
.area-label {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
  font-family: monospace;
}
.area-empty {
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.file-row,
.commit-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 0.76rem;
  margin-bottom: 4px;
}
.file-row:last-child,
.commit-row:last-child { margin-bottom: 0; }
.file-mod {
  background: #f38ba818;
  border-left: 3px solid #f38ba8;
}
.file-staged {
  background: #a6e3a118;
  border-left: 3px solid #a6e3a1;
}
.file-badge {
  font-weight: 700;
  font-size: 0.72rem;
  width: 14px;
  flex-shrink: 0;
  text-align: center;
}
.file-mod .file-badge { color: #f38ba8; }
.file-staged .file-badge { color: #a6e3a1; }
.file-name { font-family: monospace; color: var(--vp-c-text-1); }
.file-state {
  margin-left: auto;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.commit-row {
  background: #5b9cf618;
  border-left: 3px solid #5b9cf6;
}
.commit-badge { color: #5b9cf6; font-weight: 700; flex-shrink: 0; }
.commit-hash {
  font-family: monospace;
  font-size: 0.7rem;
  color: #5b9cf6;
  flex-shrink: 0;
}
.commit-msg {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.commit-head {
  font-size: 0.64rem;
  font-family: monospace;
  font-weight: 700;
  background: #5b9cf6;
  color: #fff;
  padding: 1px 4px;
  border-radius: 3px;
  flex-shrink: 0;
}

.area-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 8px;
  opacity: 0.3;
  transition: opacity 0.3s;
}
.area-arrow.arrow-lit { opacity: 1; }
.arrow-cmd {
  font-size: 0.66rem;
  font-family: monospace;
  color: var(--vp-c-brand);
  white-space: nowrap;
}
.arrow-symbol {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
  line-height: 1;
}

.gc-hint {
  padding: 10px 12px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
