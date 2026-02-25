<template>
  <div class="demo">
    <div class="title">📁 你看到的文件 vs 硬盘上的碎片</div>
    
    <div class="scene">
      <!-- 文件视图 -->
      <div class="file-view">
        <div class="view-label">📂 你看到的（文件夹）</div>
        <div class="folder-tree">
          <div class="folder">
            <span class="folder-icon">📁</span>
            <span>照片</span>
          </div>
          <div class="files">
            <div 
              class="file-item"
              :class="{ active: currentFile === 'pet' }"
            >
              <span class="file-icon">🖼️</span>
              <span>宠物.jpg</span>
              <span class="file-size">2.5MB</span>
            </div>
            <div 
              class="file-item"
              :class="{ active: currentFile === 'trip' }"
            >
              <span class="file-icon">🖼️</span>
              <span>旅游.png</span>
              <span class="file-size">1.8MB</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 读取动画 -->
      <div class="read-animation" v-if="isReading">
        <div class="read-text">正在读取...</div>
        <div class="read-blocks">
          <div 
            v-for="(block, idx) in readingBlocks" 
            :key="idx"
            class="read-block"
            :class="{ read: idx <= readProgress }"
            :style="{ animationDelay: idx * 0.1 + 's' }"
          >
            {{ block }}
          </div>
        </div>
      </div>

      <!-- 硬盘视图 -->
      <div class="disk-view">
        <div class="view-label">💾 硬盘实际存储（数据块）</div>
        <div class="disk-grid">
          <div
            v-for="n in 12"
            :key="n"
            class="disk-block"
            :class="[
              getBlockType(n),
              { 
                active: isReading && currentBlocks.includes(n),
                reading: isReading && currentBlocks.indexOf(n) === readProgress
              }
            ]"
          >
            <span class="block-num">{{ n }}</span>
            <span class="block-content">{{ getBlockContent(n) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="explain">
      <strong>💡 原理：</strong>文件系统把文件切成碎片存在硬盘各处（如宠物.jpg存在第3、7、11块），然后用"账本"记录位置。你看到的整齐文件夹只是账本上的记录。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentFile = ref('')
const isReading = ref(false)
const readProgress = ref(-1)
const currentBlocks = ref([])

// 文件存储位置
const fileLocations = {
  pet: [3, 7, 11],    // 宠物.jpg 存在第3、7、11块
  trip: [5, 6]        // 旅游.png 存在第5、6块
}

// 每块的内容
const blockContents = {
  3: '宠-1',
  7: '宠-2', 
  11: '宠-3',
  5: '旅-1',
  6: '旅-2'
}

let timer = null
let phase = 0

const getBlockType = (n) => {
  if (fileLocations.pet.includes(n)) return 'pet'
  if (fileLocations.trip.includes(n)) return 'trip'
  return 'empty'
}

const getBlockContent = (n) => {
  return blockContents[n] || ''
}

const readingBlocks = computed(() => {
  return currentBlocks.value.map(b => blockContents[b] || '')
})

const runDemo = () => {
  switch(phase) {
    case 0: // 开始读取宠物.jpg
      currentFile.value = 'pet'
      currentBlocks.value = fileLocations.pet
      isReading.value = true
      readProgress.value = -1
      phase = 1
      break
    case 1: // 逐块读取
      if (readProgress.value < currentBlocks.value.length - 1) {
        readProgress.value++
      } else {
        phase = 2
      }
      break
    case 2: // 读取完成，暂停
      isReading.value = false
      phase = 3
      break
    case 3: // 开始读取旅游.png
      currentFile.value = 'trip'
      currentBlocks.value = fileLocations.trip
      isReading.value = true
      readProgress.value = -1
      phase = 4
      break
    case 4: // 逐块读取
      if (readProgress.value < currentBlocks.value.length - 1) {
        readProgress.value++
      } else {
        phase = 5
      }
      break
    case 5: // 重置
      isReading.value = false
      currentFile.value = ''
      currentBlocks.value = []
      phase = 0
      break
  }
}

onMounted(() => {
  timer = setInterval(runDemo, 800)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 1rem 0;
}

.title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
}

.scene {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.file-view, .disk-view {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 10px;
}

.view-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.folder-tree {
  padding-left: 8px;
}

.folder {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  margin-bottom: 4px;
}

.folder-icon {
  font-size: 16px;
}

.files {
  padding-left: 20px;
  border-left: 1px dashed var(--vp-c-divider);
  margin-left: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.3s;
}

.file-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.file-icon {
  font-size: 14px;
}

.file-size {
  margin-left: auto;
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.file-item.active .file-size {
  color: var(--vp-c-brand);
}

.read-animation {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
}

.read-text {
  font-size: 11px;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
  font-weight: 600;
}

.read-blocks {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.read-block {
  width: 32px;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: var(--vp-c-text-3);
  transition: all 0.2s;
}

.read-block.read {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
  animation: pulse 0.3s ease;
}

.disk-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.disk-block {
  aspect-ratio: 1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  transition: all 0.3s;
  position: relative;
}

.disk-block.empty {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
}

.disk-block.pet {
  background: #16a34a22;
  border-color: #16a34a55;
  color: #16a34a;
}

.disk-block.trip {
  background: #3b82f622;
  border-color: #3b82f655;
  color: #3b82f6;
}

.disk-block.active {
  box-shadow: 0 0 8px currentColor;
}

.disk-block.reading {
  transform: scale(1.1);
  font-weight: 600;
  animation: glow 0.5s ease infinite alternate;
}

.disk-block.pet.reading {
  background: #16a34a;
  color: white;
}

.disk-block.trip.reading {
  background: #3b82f6;
  color: white;
}

.block-num {
  font-size: 8px;
  opacity: 0.6;
  position: absolute;
  top: 2px;
  left: 3px;
}

.block-content {
  font-weight: 600;
}

.explain {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.explain strong { color: var(--vp-c-text-1); }

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes glow {
  from { box-shadow: 0 0 5px currentColor; }
  to { box-shadow: 0 0 15px currentColor; }
}
</style>
