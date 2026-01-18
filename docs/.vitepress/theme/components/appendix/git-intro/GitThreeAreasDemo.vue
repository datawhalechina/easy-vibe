<template>
  <div class="three-areas-demo">
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
              <div class="file-icon">{{ file.icon }}</div>
              <div class="file-name">{{ file.name }}</div>
              <div class="action-hint">Add +</div>
            </div>
          </transition-group>
          <div v-if="workingFiles.length === 0" class="empty-state">
            桌上很干净 ✨
            <button class="create-btn" @click="createNewFile">
              新建文件 📝
            </button>
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="flow-arrow">
        <div class="arrow-line"></div>
        <div class="arrow-label">git add</div>
        <div class="arrow-head">▶</div>
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
                <div class="file-icon">{{ file.icon }}</div>
                <div class="file-name">{{ file.name }}</div>
                <div class="action-hint">Remove -</div>
              </div>
            </transition-group>
            <div v-if="stagedFiles.length === 0" class="empty-state box-empty">
              盒子是空的 🕸️
            </div>
          </div>
          <div class="box-flap left"></div>
          <div class="box-flap right"></div>
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
        <div class="arrow-line"></div>
        <div class="arrow-label">git commit</div>
        <div class="arrow-head">▶</div>
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
              <div class="drawer-handle"></div>
              <div class="commit-info">
                <span class="commit-hash">#{{ commit.hash }}</span>
                <span class="commit-msg">{{ commit.message }}</span>
              </div>
              <div class="commit-files">
                <span v-for="f in commit.files" :key="f" class="tiny-file"
                  >📄</span
                >
              </div>
            </div>
          </transition-group>
          <div v-if="commits.length === 0" class="empty-state">
            柜子是空的 💨
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileIdCounter = ref(1)

const createId = () => `file-${fileIdCounter.value++}`

const workingFiles = ref([
  { id: createId(), name: 'essay.txt', icon: '📝' },
  { id: createId(), name: 'photo.jpg', icon: '🖼️' },
  { id: createId(), name: 'style.css', icon: '🎨' }
])

const stagedFiles = ref([])
const commits = ref([])

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
}

const addToStaging = (file) => {
  const index = workingFiles.value.findIndex((f) => f.id === file.id)
  if (index !== -1) {
    workingFiles.value.splice(index, 1)
    stagedFiles.value.push(file)
  }
}

const unstageFile = (file) => {
  const index = stagedFiles.value.findIndex((f) => f.id === file.id)
  if (index !== -1) {
    stagedFiles.value.splice(index, 1)
    workingFiles.value.push(file)
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
}
</script>

<style scoped>
.three-areas-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-alt);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
  overflow-x: auto;
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
  border-radius: 12px;
  padding: 12px;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
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
  border-color: #f59e0b;
  background: #fffbeb;
}
.desk-surface {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  padding: 8px;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 10px 10px;
  border-radius: 8px;
}

.file-card {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px;
  width: 80px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  position: relative;
}

.file-card:hover {
  transform: translateY(-4px) rotate(2deg);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  border-color: #f59e0b;
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
  background: rgba(245, 158, 11, 0.9);
  color: white;
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
  background: #f59e0b;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  cursor: pointer;
  margin-top: 8px;
}

/* 2. Staging Box */
.zone.staging {
  border-color: #3b82f6;
  background: #eff6ff;
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
  background: #dbeafe;
  border: 2px solid #3b82f6;
  border-top: none;
  border-radius: 0 0 8px 8px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 8px;
  gap: 4px;
  overflow-y: auto;
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
  border-color: #ef4444;
}
.file-card.mini .action-hint {
  background: rgba(239, 68, 68, 0.9);
}

.box-flap {
  position: absolute;
  top: -20px;
  width: 45%;
  height: 20px;
  background: #93c5fd;
  border: 2px solid #3b82f6;
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
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
}
.commit-btn:disabled {
  background: #93c5fd;
  cursor: not-allowed;
  box-shadow: none;
}
.commit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(59, 130, 246, 0.4);
}

/* 3. Repo Cabinet */
.zone.repo {
  border-color: #10b981;
  background: #ecfdf5;
}
.cabinet-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;
}

.drawer-item {
  background: white;
  border: 1px solid #10b981;
  border-radius: 4px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  box-shadow: 0 2px 0 #059669; /* 3D effect */
  position: relative;
}
.drawer-handle {
  width: 30px;
  height: 6px;
  background: #d1fae5;
  border: 1px solid #10b981;
  border-radius: 2px;
}
.commit-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.commit-hash {
  font-size: 0.6rem;
  color: #10b981;
  font-family: monospace;
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
}
</style>
