<!--
  InputVisualizer.vue
  输入可视化组件
  
  用途：
  展示键盘输入在底层是如何被转换为字节流发送给终端的。
  纠正“按键直接上屏”的误区，强调“按键 -> 编码 -> 发送”的过程。
  
  交互功能：
  - 键盘监听：捕获用户的真实按键。
  - 数据展示：同时显示按键名、16进制字节码和转义序列（如方向键）。
  - 历史记录：记录最近几次按键的编码流。
-->
<template>
  <div class="input-visualizer" tabindex="0" @keydown="handleKeydown" @blur="handleBlur">
    <div class="focus-overlay" v-if="!isFocused" @click="focus">
      <div class="focus-btn">
        <span class="icon">⌨️</span>
        <span>Click to Type</span>
      </div>
    </div>

    <div class="main-display" :class="{ 'blur-content': !isFocused }">
      <div class="key-name">{{ currentKey.name || 'Press any key' }}</div>
      
      <div class="info-grid">
        <div class="info-box">
          <div class="label">BYTES (HEX)</div>
          <div class="value highlight">{{ currentKey.bytes || '-' }}</div>
        </div>
        <div class="info-box">
          <div class="label">SEQUENCE</div>
          <div class="value code">{{ currentKey.sequence || '-' }}</div>
        </div>
      </div>
      
      <div class="char-display">
        Character: <span class="char-val">{{ currentKey.charDisplay || '-' }}</span>
      </div>
    </div>

    <div class="history-strip">
      <div v-for="(item, i) in history" :key="i" class="history-item">
        <span class="h-name">{{ item.name }}</span>
        <span class="arrow">→</span>
        <span class="h-bytes">{{ item.bytes }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isFocused = ref(false)
const currentKey = ref({ name: '', bytes: '', sequence: '', charDisplay: '' })
const history = ref([])

const focus = (e) => {
  // Find the parent .input-visualizer and focus it
  const container = e.currentTarget.closest('.input-visualizer')
  if (container) {
    container.focus()
    isFocused.value = true
  }
}

const handleBlur = () => {
  isFocused.value = false
}

const handleKeydown = (e) => {
  e.preventDefault()
  
  let name = e.key
  let bytes = ''
  let sequence = ''
  let charDisplay = e.key

  // Map special keys
  const keyMap = {
    ' ': { name: 'Space', bytes: '20', char: ' ' },
    'Enter': { name: 'Enter', bytes: '0a', char: '\\n' },
    'Tab': { name: 'Tab', bytes: '09', char: '\\t' },
    'Escape': { name: 'Esc', bytes: '1b', char: '\\e' },
    'Backspace': { name: 'Backspace', bytes: '7f', char: '\\b' },
    'Delete': { name: 'Del', bytes: '1b 5b 33 7e', sequence: '^[[3~' },
    'ArrowUp': { name: 'Arrow Up', bytes: '1b 5b 41', sequence: '^[[A' },
    'ArrowDown': { name: 'Arrow Down', bytes: '1b 5b 42', sequence: '^[[B' },
    'ArrowRight': { name: 'Arrow Right', bytes: '1b 5b 43', sequence: '^[[C' },
    'ArrowLeft': { name: 'Arrow Left', bytes: '1b 5b 44', sequence: '^[[D' },
  }

  if (keyMap[e.key]) {
    const map = keyMap[e.key]
    name = map.name
    bytes = map.bytes
    sequence = map.sequence || ''
    charDisplay = map.char || map.name
  } else if (e.key.length === 1) {
    // Printable characters
    const code = e.key.charCodeAt(0)
    bytes = code.toString(16).toLowerCase().padStart(2, '0')
    if (e.ctrlKey) {
      // Ctrl + Letter
      name = `Ctrl+${e.key.toUpperCase()}`
      const ctrlCode = code >= 97 && code <= 122 ? code - 96 : code
      bytes = ctrlCode.toString(16).toLowerCase().padStart(2, '0')
      sequence = '^' + e.key.toUpperCase()
      charDisplay = sequence
    }
  } else {
    // Other special keys
    name = e.key
    charDisplay = e.key
  }

  const keyData = { name, bytes, sequence, charDisplay }
  currentKey.value = keyData
  
  history.value.unshift(keyData)
  if (history.value.length > 5) history.value.pop()
}
</script>

<style scoped>
.input-visualizer {
  position: relative;
  background: #09090b; /* Slightly lighter than pure black */
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
  outline: none;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-visualizer:focus {
  border-color: #10b981; /* Emerald 500 */
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.focus-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
}

.focus-overlay:hover {
  background: rgba(0, 0, 0, 0.3);
}

.focus-btn {
  background: #10b981;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: transform 0.1s;
}

.focus-btn:hover {
  transform: translateY(-1px);
}

.focus-btn:active {
  transform: translateY(1px);
}

.main-display {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s, filter 0.2s;
}

.blur-content {
  opacity: 0.5;
  filter: blur(1px);
}

.key-name {
  font-size: 36px;
  font-weight: 700;
  color: #e4e4e7; /* Zinc 200 */
  margin-bottom: 30px;
  height: 50px;
  line-height: 50px;
}

.info-grid {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 30px;
  width: 100%;
}

.info-box {
  background: #18181b; /* Zinc 900 */
  padding: 16px 20px;
  border-radius: 8px;
  min-width: 140px;
  border: 1px solid #27272a;
}

.label {
  color: #71717a; /* Zinc 500 */
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.value {
  font-size: 24px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.highlight { color: #facc15; /* Yellow 400 */ }
.code { color: #22d3ee; /* Cyan 400 */ }

.char-display {
  color: #a1a1aa; /* Zinc 400 */
  font-size: 14px;
}

.char-val {
  color: #fff;
  font-weight: bold;
  background: #27272a;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 5px;
}

.history-strip {
  display: flex;
  gap: 12px;
  justify-content: center;
  border-top: 1px solid #27272a;
  padding-top: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.history-item {
  display: flex;
  align-items: center;
  background: #18181b;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #a1a1aa;
  border: 1px solid #27272a;
}

.arrow { 
  color: #71717a; /* Lighter grey for better visibility */
  margin: 0 8px; 
}

.h-name {
  font-weight: 500;
  color: #e4e4e7;
}

.h-bytes { 
  color: #facc15; 
  font-family: monospace;
}
</style>
