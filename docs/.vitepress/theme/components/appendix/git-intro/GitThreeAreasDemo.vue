<template>
  <div class="three-areas-demo">
    <div class="demo-header">
      <span class="icon">📂</span>
      <span class="title">Git 三区概念</span>
      <span class="subtitle">工作区 → 暂存区 → 仓库</span>
    </div>

    <div class="demo-content">
      <div class="scene">
        <!-- 1. Working Directory (Desk) -->
        <div class="zone working">
          <div class="zone-header">
            <span class="zone-icon">💻</span>
            <div class="zone-info">
              <span class="zone-title">工作区 (Desk)</span>
              <span class="zone-desc">你的书桌，随便乱放</span>
            </div>
          </div>
          <div class="desk-surface">
            <transition-group name="file-pop">
              <div
                v-for="file in workingFiles"
                :key="file.id"
                class="file-card"
                @click="addToStaging(file)"
              >
                <div class="file-icon">
                  {{ file.icon }}
                </div>
                <div class="file-name">
                  {{ file.name }}
                </div>
                <div class="action-hint">
                  Add +
                </div>
              </div>
            </transition-group>
            <div
              v-if="workingFiles.length === 0"
              class="empty-state"
            >
              桌上很干净 ✨
              <button
                class="create-btn"
                @click="createNewFile"
              >
                新建文件 📝
              </button>
            </div>
          </div>
        </div>

        <!-- Arrow -->
        <div class="flow-arrow">
          <div class="arrow-line" />
          <div class="arrow-label">
            git add
          </div>
          <div class="arrow-head">
            ▶
          </div>
        </div>

        <!-- 2. Staging Area (Box) -->
        <div class="zone staging">
          <div class="zone-header">
            <span class="zone-icon">📦</span>
            <div class="zone-info">
              <span class="zone-title">暂存区 (Box)</span>
              <span class="zone-desc">快递盒，准备打包</span>
            </div>
          </div>
          <div class="box-container">
            <div class="box-body">
              <transition-group name="file-drop">
                <div
                  v-for="file in stagedFiles"
                  :key="file.id"
                  class="file-card mini"
                  @click="unstageFile(file)"
                >
                  <div class="file-icon">
                    {{ file.icon }}
                  </div>
                  <div class="file-name">
                    {{ file.name }}
                  </div>
                  <div class="action-hint">
                    Remove -
                  </div>
                </div>
              </transition-group>
              <div
                v-if="stagedFiles.length === 0"
                class="empty-state box-empty"
              >
                盒子是空的 🕸️
              </div>
            </div>
            <div class="box-flap left" />
            <div class="box-flap right" />
          </div>
          <div class="staging-actions">
            <button
              class="commit-btn"
              :disabled="stagedFiles.length === 0"
              @click="commitFiles"
            >
              封箱寄出 (git commit) 🚚
            </button>
          </div>
        </div>

        <!-- Arrow -->
        <div class="flow-arrow">
          <div class="arrow-line" />
          <div class="arrow-label">
            git commit
          </div>
          <div class="arrow-head">
            ▶
          </div>
        </div>

        <!-- 3. Repository (Cabinet) -->
        <div class="zone repo">
          <div class="zone-header">
            <span class="zone-icon">🗄️</span>
            <div class="zone-info">
              <span class="zone-title">仓库 (Cabinet)</span>
              <span class="zone-desc">档案柜，永久保存</span>
            </div>
          </div>
          <div class="cabinet-body">
            <transition-group name="drawer-slide">
              <div
                v-for="commit in commits.slice().reverse()"
                :key="commit.hash"
                class="drawer-item"
              >
                <div class="drawer-handle" />
                <div class="commit-info">
                  <span class="commit-hash">#{{ commit.hash }}</span>
                  <span class="commit-msg">{{ commit.message }}</span>
                </div>
                <div class="commit-files">
                  <span
                    v-for="f in commit.files"
                    :key="f"
                    class="tiny-file"
                  >📄</span>
                </div>
              </div>
            </transition-group>
            <div
              v-if="commits.length === 0"
              class="empty-state"
            >
              柜子是空的 💨
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="block">
        <div class="block-title">
          当前等价命令
        </div>
        <pre class="mono"><code>{{ historyText }}</code></pre>
      </div>
      <div class="block">
        <div class="block-title">
          git status（模拟）
        </div>
        <pre class="mono"><code>{{ statusText }}</code></pre>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>Git 的三区就像餐厅——工作区是餐桌（随便放），暂存区是备菜盘（准备上菜），仓库是菜单（永久记录）。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const fileIdCounter = ref(1)

const createId = () => `file-${fileIdCounter.value++}`

const workingFiles = ref([
  { id: createId(), name: 'essay.txt', icon: '📝' },
  { id: createId(), name: 'photo.jpg', icon: '🖼️' },
  { id: createId(), name: 'style.css', icon: '🎨' }
])

const stagedFiles = ref([])
const commits = ref([])
const history = ref(['$ git status'])

const pushHistory = (line) => {
  history.value.push(line)
  if (history.value.length > 6)
    history.value.splice(0, history.value.length - 6)
}

const historyText = computed(() => history.value.join('\n'))

const statusText = computed(() => {
  const lines = ['On branch main']
  if (stagedFiles.value.length === 0 && workingFiles.value.length === 0) {
    lines.push('nothing to commit, working tree clean')
    return lines.join('\n')
  }
  if (stagedFiles.value.length) {
    lines.push('Changes to be committed:')
    stagedFiles.value.forEach((f) => lines.push(`  new file:   ${f.name}`))
  }
  if (workingFiles.value.length) {
    lines.push('Untracked files:')
    workingFiles.value.forEach((f) => lines.push(`  ${f.name}`))
  }
  return lines.join('\n')
})

const createNewFile = () => {
  const types = [
    { name: 'script.js', icon: '📜' },
    { name: 'data.json', icon: '📊' },
    { name: 'readme.md', icon: '📘' }
  ]
  const randomType = types[Math.floor(Math.random() * types.length)]
  workingFiles.value.push({
    id: createId(),
    name: randomType.name,
    icon: randomType.icon
  })
  pushHistory(`$ touch ${randomType.name}`)
}

const addToStaging = (file) => {
  const index = workingFiles.value.findIndex((f) => f.id === file.id)
  if (index !== -1) {
    workingFiles.value.splice(index, 1)
    stagedFiles.value.push(file)
    pushHistory(`$ git add ${file.name}`)
  }
}

const unstageFile = (file) => {
  const index = stagedFiles.value.findIndex((f) => f.id === file.id)
  if (index !== -1) {
    stagedFiles.value.splice(index, 1)
    workingFiles.value.push(file)
    pushHistory(`$ git restore --staged ${file.name}`)
  }
}

const commitFiles = () => {
  if (stagedFiles.value.length === 0) return

  const files = [...stagedFiles.value]
  stagedFiles.value = []

  const msgs = [
    'Fix bug',
    'Add feature',
    'Update docs',
    'Refactor code',
    'Initial commit'
  ]
  const randomMsg = msgs[Math.floor(Math.random() * msgs.length)]

  commits.value.push({
    hash: Math.random().toString(16).substr(2, 6),
    message: randomMsg,
    files: files.map((f) => f.name)
  })

  pushHistory(`$ git commit -m "${randomMsg}"`)
}
</script>

<style scoped>
.three-areas-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.scene {
  display: flex;
  align-items: stretch;
  gap: 10px;
  min-width: 600px;
}

/* Common Zone Styles */
.zone {
  flex: 1;
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.zone-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px dashed var(--vp-c-divider);
}

.zone-icon {
  font-size: 1.5rem;
}
.zone-info {
  display: flex;
  flex-direction: column;
}
.zone-title {
  font-weight: bold;
  font-size: 0.9rem;
}
.zone-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* 1. Working Desk */
.zone.working {
  border-color: rgba(var(--vp-c-brand-rgb), 0.25);
}
.desk-surface {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  background-size: 10px 10px;
  border-radius: 6px;
  border: 1px dashed var(--vp-c-divider);
}

.file-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px;
  width: 80px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.file-card:hover {
  border-color: var(--vp-c-brand);
}

.file-icon {
  font-size: 2rem;
  margin-bottom: 4px;
}
.file-name {
  font-size: 0.7rem;
  text-align: center;
  word-break: break-all;
  line-height: 1.2;
}
.action-hint {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(var(--vp-c-brand-rgb), 0.9);
  color: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.2s;
  font-weight: bold;
  font-size: 0.8rem;
}
.file-card:hover .action-hint {
  opacity: 1;
}

.create-btn {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border: none;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  cursor: pointer;
  margin-top: 8px;
}

/* 2. Staging Box */
.zone.staging {
  border-color: rgba(var(--vp-c-brand-rgb), 0.25);
}
.box-container {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
}

.box-body {
  width: 100%;
  height: 140px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-radius: 0 0 8px 8px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 8px;
  gap: 4px;
  
}

.file-card.mini {
  width: 100%;
  height: 30px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 4px 8px;
  gap: 8px;
}
.file-card.mini .file-icon {
  font-size: 1rem;
  margin: 0;
}
.file-card.mini .file-name {
  font-size: 0.8rem;
}
.file-card.mini:hover {
  border-color: var(--vp-c-brand);
}
.file-card.mini .action-hint {
  background: rgba(var(--vp-c-brand-rgb), 0.9);
}

.box-flap {
  position: absolute;
  top: -20px;
  width: 45%;
  height: 20px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-bottom: none;
  transition: all 0.5s;
}
.box-flap.left {
  left: 0;
  border-radius: 4px 0 0 0;
  transform-origin: bottom left;
  transform: rotate(10deg);
}
.box-flap.right {
  right: 0;
  border-radius: 0 4px 0 0;
  transform-origin: bottom right;
  transform: rotate(-10deg);
}

.staging-actions {
  margin-top: 12px;
  text-align: center;
}
.commit-btn {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}
.commit-btn:disabled {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  cursor: not-allowed;
}
.commit-btn:hover:not(:disabled) {
  opacity: 0.95;
}

/* 3. Repo Cabinet */
.zone.repo {
  border-color: rgba(var(--vp-c-brand-rgb), 0.25);
}
.cabinet-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;
}

.drawer-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  position: relative;
}
.drawer-handle {
  width: 30px;
  height: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
}
.commit-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.commit-hash {
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}
.commit-msg {
  font-size: 0.8rem;
  font-weight: bold;
}
.commit-files {
  display: flex;
  gap: 2px;
}
.tiny-file {
  font-size: 0.6rem;
}

/* Arrows */
.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  color: var(--vp-c-text-3);
}
.arrow-line {
  width: 100%;
  height: 2px;
  background: currentColor;
}
.arrow-label {
  font-size: 0.7rem;
  margin: 4px 0;
  font-weight: bold;
  white-space: nowrap;
}
.arrow-head {
  font-size: 0.8rem;
}

.bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1rem;
}

.block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  min-width: 260px;
}

.block-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.mono {
  margin: 0;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow-x: auto;
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
}

/* Transitions */
.file-pop-enter-active,
.file-pop-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.file-pop-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.file-pop-leave-to {
  opacity: 0;
  transform: scale(0);
}

.file-drop-enter-active,
.file-drop-leave-active {
  transition: all 0.3s ease;
}
.file-drop-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.file-drop-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.drawer-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.drawer-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

@media (max-width: 768px) {
  .scene {
    flex-direction: column;
    min-width: auto;
  }
  .flow-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
    width: 100%;
    align-items: center;
  }
  .arrow-line {
    width: 2px;
    height: 20px;
  }

  .bottom {
    grid-template-columns: 1fr;
  }
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
