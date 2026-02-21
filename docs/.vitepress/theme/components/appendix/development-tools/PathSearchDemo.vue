<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">PATH 搜索过程</span>
      <span class="subtitle">输入命令名，看 Shell 是如何逐目录查找的</span>
    </div>

    <div class="control-panel">
      <div class="preset-label">选择命令：</div>
      <div class="preset-btns">
        <button
          v-for="cmd in presets"
          :key="cmd.name"
          class="preset-btn"
          :class="{ active: command === cmd.name }"
          :disabled="isSearching"
          @click="selectCommand(cmd)"
        >
          {{ cmd.name }}
        </button>
      </div>
      <button class="action-btn" :disabled="isSearching || !command" @click="startSearch">
        {{ isSearching ? '搜索中...' : '▶ 开始搜索' }}
      </button>
      <button class="reset-btn" :disabled="isSearching" @click="reset">重置</button>
    </div>

    <div class="visualization-area">
      <div class="path-display">
        <div class="path-label">当前 PATH：</div>
        <div class="path-value">
          <span
            v-for="(dir, idx) in pathDirs"
            :key="dir"
            class="path-segment"
            :class="{ active: currentDirIdx === idx }"
          >{{ dir }}<span v-if="idx < pathDirs.length - 1" class="sep">:</span></span>
        </div>
      </div>

      <div class="search-grid">
        <div
          v-for="(dir, idx) in pathDirs"
          :key="dir"
          class="dir-card"
          :class="getDirClass(idx)"
        >
          <div class="dir-name">{{ dir }}</div>
          <div v-if="dirStates[idx] === 'searching'" class="dir-status searching">
            <span class="spin">⟳</span> 查找 {{ command }}...
          </div>
          <div v-else-if="dirStates[idx] === 'found'" class="dir-status found">
            ✓ 找到了！
          </div>
          <div v-else-if="dirStates[idx] === 'notfound'" class="dir-status notfound">
            ✗ 没有
          </div>
          <div v-else class="dir-status idle">待查找</div>

          <div v-if="dirStates[idx] === 'found' && currentCmd" class="found-path">
            {{ dir }}/{{ command }}
          </div>
        </div>
      </div>

      <div v-if="result" class="result-panel" :class="result.type">
        <span class="result-icon">{{ result.type === 'success' ? '✅' : '❌' }}</span>
        <div class="result-text">
          <strong>{{ result.title }}</strong>
          <div class="result-detail">{{ result.detail }}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心机制：</strong>Shell 拿到命令名后，按 PATH 里目录的顺序依次查找。找到第一个匹配就立即使用，停止继续搜索。所以 PATH 中目录的顺序非常重要——先出现的目录优先级更高。
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const pathDirs = ['/usr/local/bin', '/usr/bin', '/bin', '/usr/sbin', '/sbin']

const presets = [
  { name: 'git', foundAt: 1, desc: 'Git 版本控制工具' },
  { name: 'python3', foundAt: 2, desc: 'Python 解释器' },
  { name: 'node', foundAt: 0, desc: 'Node.js 运行时（通常安装在 /usr/local/bin）' },
  { name: 'ls', foundAt: 2, desc: '列出目录内容的内置命令' },
  { name: 'foobar', foundAt: -1, desc: '一个不存在的命令' }
]

const command = ref('')
const currentCmd = ref(null)
const isSearching = ref(false)
const currentDirIdx = ref(-1)
const dirStates = reactive(Array(pathDirs.length).fill('idle'))
const result = ref(null)

const selectCommand = (cmd) => {
  if (isSearching.value) return
  command.value = cmd.name
  currentCmd.value = cmd
  reset()
}

const reset = () => {
  currentDirIdx.value = -1
  for (let i = 0; i < pathDirs.length; i++) dirStates[i] = 'idle'
  result.value = null
}

const getDirClass = (idx) => {
  const s = dirStates[idx]
  return {
    searching: s === 'searching',
    found: s === 'found',
    notfound: s === 'notfound',
    'past-current': idx < currentDirIdx.value && s !== 'found'
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const startSearch = async () => {
  if (isSearching.value || !currentCmd.value) return
  reset()
  isSearching.value = true

  const cmd = currentCmd.value
  const foundIdx = cmd.foundAt

  for (let i = 0; i < pathDirs.length; i++) {
    currentDirIdx.value = i
    dirStates[i] = 'searching'
    await sleep(700)

    if (i === foundIdx) {
      dirStates[i] = 'found'
      result.value = {
        type: 'success',
        title: `命令找到了！`,
        detail: `在 ${pathDirs[i]}/${cmd.name} 找到可执行文件，搜索停止。`
      }
      break
    } else {
      dirStates[i] = 'notfound'
    }

    if (i === pathDirs.length - 1 || (foundIdx === -1 && i === pathDirs.length - 1)) {
      result.value = {
        type: 'error',
        title: `command not found: ${cmd.name}`,
        detail: `已搜索 PATH 中所有 ${pathDirs.length} 个目录，均未找到。需要先安装该程序，或将其所在目录加入 PATH。`
      }
    }
  }

  currentDirIdx.value = -1
  isSearching.value = false
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 0.75rem 0;
  min-width: 0;
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
}

.preset-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.preset-btns {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  flex: 1;
}

.preset-btn {
  padding: 0.25rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
  transition: all 0.15s;
}

.preset-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.preset-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.preset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn {
  padding: 0.3rem 0.9rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn {
  padding: 0.3rem 0.7rem;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
  white-space: nowrap;
}

.reset-btn:hover:not(:disabled) {
  border-color: var(--vp-c-text-2);
}

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.visualization-area {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.path-display {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  min-width: 0;
  overflow: hidden;
}

.path-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  flex-shrink: 0;
}

.path-value {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  min-width: 0;
  word-break: break-all;
}

.path-segment {
  transition: color 0.2s;
}

.path-segment.active {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.sep {
  color: var(--vp-c-divider);
  margin: 0 1px;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.6rem;
}

@media (max-width: 720px) {
  .search-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.dir-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  transition: all 0.3s ease;
  min-height: 80px;
}

.dir-card.searching {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 8px color-mix(in srgb, var(--vp-c-brand) 40%, transparent);
}

.dir-card.found {
  border-color: var(--vp-c-green-1);
  background: color-mix(in srgb, var(--vp-c-green-1) 8%, var(--vp-c-bg));
}

.dir-card.notfound {
  opacity: 0.55;
}

.dir-name {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  font-weight: bold;
  margin-bottom: 0.4rem;
  word-break: break-all;
}

.dir-status {
  font-size: 0.75rem;
  line-height: 1.4;
}

.dir-status.idle {
  color: var(--vp-c-text-3);
}

.dir-status.searching {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.dir-status.found {
  color: var(--vp-c-green-1);
  font-weight: bold;
}

.dir-status.notfound {
  color: var(--vp-c-danger-1, #f87171);
}

.spin {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.found-path {
  margin-top: 0.3rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  color: var(--vp-c-green-1);
  word-break: break-all;
}

.result-panel {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid;
}

.result-panel.success {
  background: color-mix(in srgb, var(--vp-c-green-1) 8%, var(--vp-c-bg));
  border-color: var(--vp-c-green-1);
}

.result-panel.error {
  background: color-mix(in srgb, var(--vp-c-danger-1, #f87171) 8%, var(--vp-c-bg));
  border-color: var(--vp-c-danger-1, #f87171);
}

.result-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.result-text strong {
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 0.2rem;
  font-family: var(--vp-font-family-mono);
}

.result-detail {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box {
  display: block;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong {
  white-space: nowrap;
  color: var(--vp-c-text-1);
}
</style>
