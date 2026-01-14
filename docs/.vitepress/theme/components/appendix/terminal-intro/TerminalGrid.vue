<!--
  TerminalGrid.vue
  终端网格模型演示组件
  
  用途：
  展示终端屏幕本质上是由“字符网格”构成的。
  帮助用户理解终端不是像素画板，而是由一个个固定大小的单元格（Cell）组成的矩阵。
  
  交互功能：
  - 点击/拖拽：可以在网格上“画”出字符。
  - 键盘输入：可以直接在网格中打字，观察光标移动和字符填充。
  - 响应式布局：支持横向滚动，适应不同屏幕宽度。
-->
<template>
  <div class="grid-demo">
    <div class="terminal-screen">
      <div class="grid-row" v-for="(row, rIndex) in rows" :key="rIndex">
        <div 
          class="grid-cell" 
          v-for="(cell, cIndex) in row" 
          :key="cIndex"
          :class="{ 
            'active-cursor': cursor.r === rIndex && cursor.c === cIndex,
            'drawn': cell.drawn 
          }"
          @mousedown.prevent="handleCellMouseDown(rIndex, cIndex)"
          @mouseover="handleCellHover(rIndex, cIndex)"
        >
          {{ cell.char || ' ' }}
        </div>
      </div>
    </div>
    
    <div class="controls">
      <input 
        ref="inputRef"
        type="text" 
        v-model="inputText" 
        placeholder="Type here..."
        class="text-input"
        @keydown="handleKeydown"
      />
      <button class="btn" @click="clearGrid">Clear</button>
      <span class="hint">Click/Drag cells to draw, Type to insert text</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const ROW_COUNT = 10
const COL_COUNT = 40

const createGrid = () => Array.from({ length: ROW_COUNT }, () => 
  Array.from({ length: COL_COUNT }, () => ({ char: '', drawn: false }))
)

const rows = reactive(createGrid())
const cursor = reactive({ r: 0, c: 0 })
const inputText = ref('')
const isDrawing = ref(false)
const inputRef = ref(null)
const drawingListener = () => {
  isDrawing.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'Backspace') {
    if (cursor.c > 0) {
      cursor.c--
    } else if (cursor.r > 0) {
      cursor.r--
      cursor.c = COL_COUNT - 1
    }
    rows[cursor.r][cursor.c].char = ''
    return
  }
  
  if (e.key.length === 1) {
    rows[cursor.r][cursor.c].char = e.key
    advanceCursor()
  }
  
  if (e.key === 'Enter') {
    cursor.r = Math.min(cursor.r + 1, ROW_COUNT - 1)
    cursor.c = 0
  }
}

const advanceCursor = () => {
  cursor.c++
  if (cursor.c >= COL_COUNT) {
    cursor.c = 0
    cursor.r++
    if (cursor.r >= ROW_COUNT) {
      cursor.r = ROW_COUNT - 1 // Stop at bottom
    }
  }
}

const handleCellMouseDown = (r, c) => {
  isDrawing.value = true
  rows[r][c].drawn = !rows[r][c].drawn
  cursor.r = r
  cursor.c = c
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const handleCellHover = (r, c) => {
  if (isDrawing.value) {
    rows[r][c].drawn = true
  }
}

const clearGrid = () => {
  for(let r=0; r<ROW_COUNT; r++) {
    for(let c=0; c<COL_COUNT; c++) {
      rows[r][c].char = ''
      rows[r][c].drawn = false
    }
  }
  cursor.r = 0
  cursor.c = 0
  inputText.value = ''
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

onMounted(() => {
  window.addEventListener('mouseup', drawingListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', drawingListener)
})
</script>

<style scoped>
.grid-demo {
  background: #09090b;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #27272a;
  font-family: 'JetBrains Mono', 'Menlo', 'Monaco', monospace;
  overflow: hidden; /* 防止内容溢出圆角 */
}

.terminal-screen {
  border: 1px solid #27272a;
  background: #000;
  cursor: text;
  display: block;
  overflow-x: auto; /* 允许横向滚动 */
  max-width: 100%;
  border-radius: 6px;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #3f3f46 #18181b;
}

/* Webkit scrollbar styles */
.terminal-screen::-webkit-scrollbar {
  height: 8px;
}

.terminal-screen::-webkit-scrollbar-track {
  background: #18181b;
}

.terminal-screen::-webkit-scrollbar-thumb {
  background-color: #3f3f46;
  border-radius: 4px;
}

.grid-row {
  display: flex;
  width: max-content; /* 确保内容撑开宽度 */
}

.grid-cell {
    width: 16px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #27272a;
    border-bottom: 1px solid #27272a;
    color: #e4e4e7;
    font-size: 14px;
    user-select: none;
  }
  
  .grid-cell.drawn {
    background-color: #3f3f46;
  }
  
  .grid-cell.active-cursor {
    background-color: #e4e4e7;
    color: #000;
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    50% { opacity: 0.7; }
  }
  
  .controls {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .text-input {
    background: #18181b;
    border: 1px solid #3f3f46;
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-family: inherit;
  }
  
  .btn {
    background: #27272a;
    border: 1px solid #3f3f46;
    color: #e4e4e7;
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn:hover {
    background: #3f3f46;
    border-color: #52525b;
  }
  
  .hint {
    color: #a1a1aa; /* Zinc 400 */
    font-size: 12px;
    margin-left: auto;
  }
  </style>
