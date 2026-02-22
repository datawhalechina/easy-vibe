<template>
  <div class="filesystem-demo">
    <div class="demo-wrapper">
      <!-- 文件树：逻辑视角 -->
      <div class="logical-view">
        <div class="view-title">
          <span>📁 你的视角 (文件系统)</span>
          <span class="subtitle">漂亮、整洁的目录树</span>
        </div>

        <div class="file-tree">
          <div class="tree-node folder expanded">
            <span class="icon">💾</span> D盘 (根目录)
          </div>
          <div class="tree-children">
            <div class="tree-node folder expanded">
              <span class="icon">📂</span> 照片
            </div>
            <div class="tree-children">
              <div
                class="tree-node file"
                :class="{ active: activeFile === 'pet' }"
                @click="selectFile('pet')"
              >
                <span class="icon">🖼️</span> 宠物.jpg
                <span class="size-badge">3 块</span>
              </div>
              <div
                class="tree-node file"
                :class="{ active: activeFile === 'vacation' }"
                @click="selectFile('vacation')"
              >
                <span class="icon">🖼️</span> 旅游.png
                <span class="size-badge">2 块</span>
              </div>
            </div>

            <div class="tree-node folder expanded">
              <span class="icon">📂</span> 工作
            </div>
            <div class="tree-children">
              <div
                class="tree-node file"
                :class="{ active: activeFile === 'doc' }"
                @click="selectFile('doc')"
              >
                <span class="icon">📄</span> 总结.docx
                <span class="size-badge">4 块</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 翻译官动画 -->
      <div class="translator">
        <div class="arrow"></div>
        <div class="badge">文件系统账本<br />(inode表)</div>
        <div class="arrow"></div>
      </div>

      <!-- 磁盘块：物理视角 -->
      <div class="physical-view">
        <div class="view-title">
          <span>🖨️ 硬盘的视角 (物理存储)</span>
          <span class="subtitle">无序、零散的数据块</span>
        </div>

        <div class="disk-grid">
          <div
            v-for="block in 24"
            :key="block"
            class="disk-block"
            :class="[getBlockOwner(block), { active: isBlockActive(block) }]"
          >
            {{ block }}
          </div>
        </div>
      </div>
    </div>

    <div class="explanation-box" v-if="activeFile">
      <span v-if="activeFile === 'pet'">
        💡 宠物.jpg 其实被切碎分别放在了第 3、8、14
        块。文件系统帮你做好了翻译，你只需双击它！
      </span>
      <span v-if="activeFile === 'vacation'">
        💡 旅游.png 放在了第 5、6 块。
      </span>
      <span v-if="activeFile === 'doc'">
        💡 总结.docx 被分散存放在 10、11、18、22
        块，如果没有文件系统，你得自己背下这些数字才能打开文件。
      </span>
    </div>
    <div class="explanation-box default" v-else>
      ☝️ 试着点击左侧的文件，看看它们在硬盘里到底长什么样。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeFile = ref(null)

// 映射关系伪造
const fileMap = {
  pet: [3, 8, 14],
  vacation: [5, 6],
  doc: [10, 11, 18, 22]
}

const selectFile = (file) => {
  activeFile.value = file
}

const getBlockOwner = (block) => {
  for (const [key, blocks] of Object.entries(fileMap)) {
    if (blocks.includes(block)) return `owner-${key}`
  }
  return 'empty'
}

const isBlockActive = (block) => {
  if (!activeFile.value) return false
  return fileMap[activeFile.value].includes(block)
}
</script>

<style scoped>
.filesystem-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.demo-wrapper {
  display: flex;
  align-items: stretch;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .demo-wrapper {
    flex-direction: column;
  }
  .translator {
    transform: rotate(90deg);
    margin: 1rem 0;
  }
}

.logical-view,
.physical-view {
  flex: 1;
  background: var(--vp-c-bg-alt);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.view-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.view-title span {
  font-weight: bold;
  font-size: 0.95rem;
}
.view-title .subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: normal;
  margin-top: 0.2rem;
}

/* File Tree Styles */
.file-tree {
  font-size: 0.9rem;
}
.tree-node {
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}
.tree-node:hover {
  background: var(--vp-c-bg-mute);
}
.tree-node.file.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: bold;
}
.tree-children {
  padding-left: 1.5rem;
  border-left: 1px dashed var(--vp-c-divider);
  margin-left: 0.6rem;
}
.size-badge {
  margin-left: auto;
  font-size: 0.7rem;
  background: var(--vp-c-bg-mute);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}
.tree-node.active .size-badge {
  background: var(--vp-c-brand-1);
  color: white;
}

/* Translator */
.translator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.translator .badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}
.arrow {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
  position: relative;
}
.arrow::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: -4px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--vp-c-divider) transparent transparent transparent;
}

/* Disk Grid */
.disk-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
}
.disk-block {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.disk-block.owner-pet {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}
.disk-block.owner-vacation {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}
.disk-block.owner-doc {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
}

.disk-block.active {
  transform: scale(1.1);
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.disk-block.owner-pet.active {
  background: var(--vp-c-success-1);
  border-color: var(--vp-c-success-1);
}
.disk-block.owner-vacation.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.disk-block.owner-doc.active {
  background: var(--vp-c-warning-1);
  border-color: var(--vp-c-warning-1);
}

.explanation-box {
  padding: 1rem;
  background: rgba(16, 185, 129, 0.1);
  border-left: 4px solid var(--vp-c-success-1);
  border-radius: 0 8px 8px 0;
  font-size: 0.95rem;
  animation: fadeIn 0.3s;
}
.explanation-box.default {
  background: var(--vp-c-bg-alt);
  border-left-color: var(--vp-c-text-3);
  color: var(--vp-c-text-2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
