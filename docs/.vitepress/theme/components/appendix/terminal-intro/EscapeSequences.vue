<!--
  EscapeSequences.vue
  转义序列演示组件
  
  用途：
  解释终端如何通过“不可见字符”来控制颜色、光标位置和清屏操作。
  揭示 ANSI 转义序列（如 `\033[31m`）的工作原理。
  
  交互功能：
  - 颜色/样式按钮：点击后发送对应的转义序列。
  - 序列显示：实时显示当前发送的原始序列代码（如 `^[[31m`）。
  - 终端反馈：下方模拟终端根据接收到的序列改变文字颜色或清除内容。
-->
<template>
  <div class="escape-demo">
    <div class="controls">
      <div class="panel-section">
        <div class="section-title">
          <span class="en">16-COLOR PALETTE</span>
          <span class="divider">|</span>
          <span class="zh">16 色调色板</span>
        </div>
        <div class="palette-grid">
          <div 
            v-for="(color, index) in palette" 
            :key="index"
            class="swatch"
            :style="{ backgroundColor: color }"
            @click="applyColor(index)"
            :title="`^[[38;5;${index}m`"
          ></div>
        </div>
        <div class="hint-text" v-if="activeColor">
          Sequence: <span class="code">^[[38;5;{{ palette.indexOf(activeColor) }}m</span>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-title">
          <span class="en">STYLE SEQUENCES</span>
          <span class="divider">|</span>
          <span class="zh">样式序列</span>
        </div>
        <div class="btn-group">
          <button @click="applyStyle('1')" :class="{ active: isBold }">
            <span class="btn-code">^[[1m</span>
            <span class="btn-label">Bold / 加粗</span>
          </button>
          <button @click="applyStyle('4')" :class="{ active: isUnderline }">
            <span class="btn-code">^[[4m</span>
            <span class="btn-label">Underline / 下划线</span>
          </button>
        </div>
        <div class="btn-group" style="margin-top: 8px">
          <button @click="resetStyle" class="reset-btn">
            <span class="btn-code">^[[0m</span>
            <span class="btn-label">Reset / 重置所有样式</span>
          </button>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-title">
          <span class="en">CURSOR SEQUENCES</span>
          <span class="divider">|</span>
          <span class="zh">光标控制序列</span>
        </div>
        <div class="btn-stack">
          <button @click="clearScreen">
            <span class="code">^[[2J</span>
            <span class="desc">Clear Screen / 清屏</span>
          </button>
          <button @click="moveHome">
            <span class="code">^[[H</span>
            <span class="desc">Move Home / 回到原点 (0,0)</span>
          </button>
          <button @click="moveTo">
            <span class="code">^[[5;10H</span>
            <span class="desc">Move to 5,10 / 移动到 (5,10)</span>
          </button>
        </div>
      </div>
    </div>

    <div class="preview">
      <div class="terminal-window">
        <div class="window-header">
          <div class="dots">
            <span></span><span></span><span></span>
          </div>
          <div class="window-title">Terminal Preview</div>
        </div>
        <div class="window-content">
          <div class="sequence-display-area">
            <span class="label">Last Sequence:</span>
            <span v-if="lastSequence" class="sequence-code">{{ lastSequence }}</span>
            <span v-else class="placeholder">Waiting for input...</span>
          </div>
          
          <div class="main-display" :style="currentStyle" v-if="isContentVisible">
            Hello World
          </div>
          
          <div class="cursor-line">
            <span class="prompt">$</span>
            <span class="cursor-placeholder" v-if="cursorMode === 'absolute'"></span>
            <span class="cursor-block" :style="cursorStyle"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const palette = [
  '#000000', '#cd3131', '#0dbc79', '#e5e510', '#2472c8', '#bc3fbc', '#11a8cd', '#e5e5e5',
  '#666666', '#f14c4c', '#23d18b', '#f5f543', '#3b8eea', '#d670d6', '#29b8db', '#ffffff'
]

const activeColor = ref(null)
const isBold = ref(false)
const isUnderline = ref(false)
const lastSequence = ref('')
const isContentVisible = ref(true)
const cursorMode = ref('static') // 'static' | 'absolute'
const cursorPosition = ref({ top: 0, left: 0 })

const currentStyle = computed(() => ({
  color: activeColor.value || '#ccc',
  fontWeight: isBold.value ? 'bold' : 'normal',
  textDecoration: isUnderline.value ? 'underline' : 'none'
}))

const cursorStyle = computed(() => {
  if (cursorMode.value === 'static') {
    return {}
  }
  return {
    position: 'absolute',
    top: `${cursorPosition.value.top}px`,
    left: `${cursorPosition.value.left}px`
  }
})

const applyColor = (index) => {
  activeColor.value = palette[index]
  lastSequence.value = `^[[38;5;${index}m`
}

const applyStyle = (code) => {
  if (code === '1') isBold.value = !isBold.value
  if (code === '4') isUnderline.value = !isUnderline.value
  lastSequence.value = `^[[${code}m`
}

const resetStyle = () => {
  activeColor.value = null
  isBold.value = false
  isUnderline.value = false
  lastSequence.value = '^[[0m'
  isContentVisible.value = true
  cursorMode.value = 'static'
}

const clearScreen = () => {
  lastSequence.value = '^[[2J'
  isContentVisible.value = false
}

const moveHome = () => {
  lastSequence.value = '^[[H'
  cursorMode.value = 'absolute'
  cursorPosition.value = { top: 20, left: 20 }
}

const moveTo = () => {
  lastSequence.value = '^[[5;10H'
  cursorMode.value = 'absolute'
  // Approximate position for 5,10 (5th line, 10th char)
  // Assuming line height ~24px, char width ~9px
  // Base padding 20px
  cursorPosition.value = { top: 20 + 4 * 24, left: 20 + 10 * 9 }
}
</script>

<style scoped>
.escape-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: #09090b;
  padding: 30px;
  border-radius: 12px;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
  border: 1px solid #27272a;
}

.panel-section {
  margin-bottom: 24px;
}

.section-title {
  color: #a1a1aa;
  font-size: 12px;
  margin-bottom: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title .divider {
  color: #3f3f46;
  font-weight: normal;
}

.palette-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #27272a;
  transition: transform 0.1s;
}

.swatch:hover {
  transform: scale(1.1);
  border-color: #fff;
  z-index: 1;
}

.hint-text {
  font-size: 11px;
  color: #71717a;
  margin-top: 8px;
}

button {
  background: #18181b;
  border: 1px solid #27272a;
  color: #e4e4e7;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  text-align: left;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

button:hover {
  background: #27272a;
  border-color: #52525b;
}

button.active {
  background: #27272a;
  border-color: #22c55e;
  color: #22c55e;
}

.btn-code {
  color: #facc15;
  font-weight: bold;
  min-width: 50px;
}

.btn-label {
  color: #a1a1aa;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.reset-btn {
  width: 100%;
}

.btn-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-stack button {
  display: flex;
  justify-content: space-between;
}

.code { color: #facc15; font-weight: bold; }
.desc { color: #a1a1aa; font-size: 12px; }

.terminal-window {
  background: #000;
  border: 1px solid #27272a;
  border-radius: 8px;
  height: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.window-header {
  padding: 10px 15px;
  border-bottom: 1px solid #27272a;
  background: #18181b;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3f3f46;
  margin-right: 6px;
}

.window-title {
  color: #71717a;
  font-size: 11px;
}

.window-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #e4e4e7;
}

.sequence-display-area {
  margin-bottom: 40px;
  font-size: 13px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.sequence-display-area .label {
  color: #71717a;
}

.sequence-code {
  color: #22d3ee;
  font-family: monospace;
  background: #18181b;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #27272a;
}

.placeholder {
  color: #3f3f46;
  font-style: italic;
}

.main-display {
  font-size: 32px;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.cursor-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  border: 1px solid #27272a;
  padding: 10px;
  background: #09090b;
  border-radius: 4px;
}

.prompt {
  color: #22c55e;
}

.cursor-block {
  width: 8px;
  height: 16px;
  background: #e4e4e7;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (max-width: 768px) {
  .escape-demo {
    grid-template-columns: 1fr;
  }
}
</style>
