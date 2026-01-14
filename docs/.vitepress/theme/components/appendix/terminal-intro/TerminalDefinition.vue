<template>
  <div class="terminal-definition">
    <div class="mode-switch">
      <button 
        :class="{ active: mode === 'cli' }" 
        @click="mode = 'cli'"
      >
        🖥️ CLI (命令行界面)
      </button>
      <button 
        :class="{ active: mode === 'gui' }" 
        @click="mode = 'gui'"
      >
        🖱️ GUI (图形用户界面)
      </button>
    </div>

    <!-- CLI Visualization -->
    <div v-if="mode === 'cli'" class="visualization-container">
      <div class="flow-container">
        <!-- Input Side -->
        <div class="stage input-stage">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M6 8h.001"></path><path d="M10 8h.001"></path><path d="M14 8h.001"></path><path d="M18 8h.001"></path><path d="M6 12h.001"></path><path d="M10 12h.001"></path><path d="M14 12h.001"></path><path d="M18 12h.001"></path><path d="M7 16h10"></path></svg>
          </div>
          <div class="label">Input (Keyboard)</div>
          <div class="sub-label">发送指令 (字符信号)</div>
        </div>

        <!-- Stream Animation -->
        <div class="stream-path">
          <div class="stream-line"></div>
          <div class="stream-label">Character Stream / 字符流</div>
          <div 
            v-for="char in activeChars" 
            :key="char.id"
            class="stream-char"
            :style="{ left: char.progress + '%' }"
          >
            {{ char.val }}
          </div>
        </div>

        <!-- Output Side -->
        <div class="stage output-stage">
          <div class="terminal-screen">
            <div class="screen-content">
              <span class="prompt">$</span> {{ typedContent }}<span class="cursor">_</span>
            </div>
          </div>
          <div class="label">Output (Text Grid)</div>
          <div class="sub-label">文本网格反馈</div>
        </div>
      </div>
      
      <div class="desc-box">
        <p><strong>CLI (Command Line Interface)</strong>: 这种模式下，计算机只认识字符。你的每一次按键都会被转换成编码发送给系统，系统处理后返回文字结果。它不关心你在哪里点击，只关心你输入了什么。</p>
      </div>

      <div class="control-bar">
        <button @click="startSimulation" :disabled="isAnimating">
          <span v-if="!isAnimating">▶ Play Simulation / 演示输入流</span>
          <span v-else>Simulating... / 演示中...</span>
        </button>
      </div>
    </div>

    <!-- GUI Visualization -->
    <div v-else class="visualization-container">
      <div class="flow-container">
        <!-- Input Side -->
        <div class="stage input-stage">
          <div class="icon-box gui-input" :class="{ clicking: isGuiClicking }">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path></svg>
          </div>
          <div class="label">Input (Mouse)</div>
          <div class="sub-label">发送事件 (坐标/点击)</div>
        </div>

        <!-- Event Animation -->
        <div class="stream-path">
          <div class="stream-line dashed"></div>
          <div class="stream-label">Event Loop / 事件循环</div>
          <div 
            v-if="guiEvent"
            class="gui-event-packet"
            :style="{ left: guiEvent.progress + '%' }"
          >
            {{ guiEvent.type }}
          </div>
        </div>

        <!-- Output Side -->
        <div class="stage output-stage">
          <div class="gui-screen">
            <div class="window-frame">
              <div class="win-header"></div>
              <div class="win-body">
                <div class="icon-grid">
                  <div class="desktop-icon" :class="{ selected: iconSelected }">📁</div>
                  <div class="desktop-icon">📄</div>
                </div>
                <div class="gui-cursor" :style="cursorStyle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div class="label">Output (Graphics)</div>
          <div class="sub-label">像素图形渲染</div>
        </div>
      </div>

      <div class="desc-box">
        <p><strong>GUI (Graphical User Interface)</strong>: 这种模式下，计算机实时追踪鼠标坐标和点击事件，并每秒刷新 60 次屏幕像素。它更直观，但需要消耗大量资源来处理图形渲染。</p>
      </div>

      <div class="control-bar">
        <button @click="startGuiSimulation" :disabled="isGuiAnimating">
          <span v-if="!isGuiAnimating">▶ Play Interaction / 演示交互</span>
          <span v-else>Simulating... / 演示中...</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('cli') // 'cli' | 'gui'

// CLI Logic
const isAnimating = ref(false)
const activeChars = ref([])
const typedContent = ref('')
const demoText = 'ls -la'

const startSimulation = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  typedContent.value = ''
  activeChars.value = []
  
  let index = 0
  
  const processNextChar = () => {
    if (index >= demoText.length) {
      setTimeout(() => {
        isAnimating.value = false
      }, 1000)
      return
    }

    const char = demoText[index]
    const charId = Date.now() + index
    
    // Create new flying char
    const newChar = {
      id: charId,
      val: char,
      progress: 10 // start position
    }
    
    activeChars.value.push(newChar)
    
    // Animate this char
    let progress = 10
    const interval = setInterval(() => {
      progress += 2
      const charObj = activeChars.value.find(c => c.id === charId)
      if (charObj) charObj.progress = progress
      
      if (progress >= 90) {
        clearInterval(interval)
        // Remove from stream and add to screen
        activeChars.value = activeChars.value.filter(c => c.id !== charId)
        typedContent.value += char
        
        // Next char
        index++
        setTimeout(processNextChar, 300)
      }
    }, 20)
  }
  
  processNextChar()
}

// GUI Logic
const isGuiAnimating = ref(false)
const isGuiClicking = ref(false)
const guiEvent = ref(null)
const iconSelected = ref(false)
const cursorPosition = ref({ x: 50, y: 50 })

const cursorStyle = computed(() => ({
  transform: `translate(${cursorPosition.value.x}px, ${cursorPosition.value.y}px)`
}))

const startGuiSimulation = () => {
  if (isGuiAnimating.value) return
  isGuiAnimating.value = true
  iconSelected.value = false
  cursorPosition.value = { x: 80, y: 60 } // Reset pos
  
  // 1. Move Cursor
  let step = 0
  const moveInterval = setInterval(() => {
    step++
    cursorPosition.value = { 
      x: 80 - step * 2, 
      y: 60 - step * 1.5 
    }
    
    if (step >= 20) {
      clearInterval(moveInterval)
      // 2. Click
      performClick()
    }
  }, 20)
}

const performClick = () => {
  setTimeout(() => {
    isGuiClicking.value = true
    
    // Send Event Packet
    guiEvent.value = { type: 'Click(40,30)', progress: 10 }
    
    let progress = 10
    const packetInterval = setInterval(() => {
      progress += 2
      if (guiEvent.value) guiEvent.value.progress = progress
      
      if (progress >= 90) {
        clearInterval(packetInterval)
        guiEvent.value = null
        isGuiClicking.value = false
        iconSelected.value = true // Effect
        
        setTimeout(() => {
          isGuiAnimating.value = false
        }, 1000)
      }
    }, 10)
    
  }, 300)
}
</script>

<style scoped>
.terminal-definition {
  background: #09090b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 20px;
  font-family: 'JetBrains Mono', monospace;
  margin: 20px 0;
}

.mode-switch {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #27272a;
  padding-bottom: 15px;
}

.mode-switch button {
  background: transparent;
  border: 1px solid transparent;
  color: #71717a;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

.mode-switch button.active {
  background: #27272a;
  color: #e4e4e7;
  border-color: #3f3f46;
}

.mode-switch button:hover {
  color: #e4e4e7;
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 120px;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
  width: 100px;
}

.input-stage {
  flex: 0 0 auto;
}

.output-stage {
  flex: 0 0 auto;
}

.icon-box {
  width: 60px;
  height: 60px;
  background: #18181b;
  border: 1px solid #3f3f46;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a1a1aa;
  margin-bottom: 10px;
  transition: all 0.2s;
}

.icon-box.clicking {
  transform: scale(0.9);
  border-color: #22d3ee;
  color: #22d3ee;
}

.terminal-screen {
  width: 140px;
  height: 80px;
  background: #000;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  padding: 10px;
  color: #22c55e;
  font-size: 12px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
  overflow: hidden;
}

.gui-screen {
  width: 140px;
  height: 80px;
  background: #27272a;
  border: 1px solid #52525b;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
}

.window-frame {
  background: #3f3f46;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.win-header {
  height: 12px;
  background: #52525b;
  border-bottom: 1px solid #27272a;
}

.win-body {
  flex: 1;
  background: #18181b; /* Wallpaper */
  position: relative;
  padding: 10px;
}

.icon-grid {
  display: flex;
  gap: 10px;
}

.desktop-icon {
  font-size: 16px;
  padding: 2px;
  border-radius: 4px;
  border: 1px solid transparent;
}

.desktop-icon.selected {
  background: rgba(34, 211, 238, 0.2);
  border-color: #22d3ee;
}

.gui-cursor {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: transform 0.05s linear;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));
}

.screen-content {
  word-break: break-all;
}

.label {
  font-size: 13px;
  font-weight: 600;
  color: #e4e4e7;
  text-align: center;
}

.sub-label {
  font-size: 10px;
  color: #71717a;
  margin-top: 2px;
  text-align: center;
}

.stream-path {
  flex: 1;
  height: 60px;
  position: relative;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stream-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #27272a;
  transform: translateY(-50%);
}

.stream-line.dashed {
  background: repeating-linear-gradient(90deg, #27272a 0, #27272a 6px, transparent 6px, transparent 10px);
  height: 1px;
}

.stream-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-left: 6px solid #27272a;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.stream-label {
  position: absolute;
  top: 10px;
  font-size: 10px;
  color: #52525b;
  background: #09090b;
  padding: 0 8px;
}

.stream-char {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #22d3ee;
  color: #000;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
  z-index: 10;
}

.gui-event-packet {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #facc15;
  color: #000;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  box-shadow: 0 0 5px rgba(250, 204, 21, 0.3);
  white-space: nowrap;
  z-index: 10;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.desc-box {
  background: #18181b;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #a1a1aa;
  line-height: 1.5;
}

.desc-box strong {
  color: #e4e4e7;
}

.control-bar {
  display: flex;
  justify-content: center;
}

button {
  background: #18181b;
  color: #e4e4e7;
  border: 1px solid #27272a;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

button:hover:not(:disabled) {
  background: #27272a;
  border-color: #52525b;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .flow-container {
    flex-direction: column;
    height: auto;
    gap: 20px;
  }
  
  .stream-path {
    width: 100%;
    height: 40px;
    margin: 10px 0;
  }
  
  .stream-line {
    transform: rotate(90deg);
    width: 40px;
    left: 50%;
    margin-left: -20px;
  }
}
</style>