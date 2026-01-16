<template>
  <div class="parser-demo">
    <div class="demo-header">
      <div class="title">转义序列解析原理 (Parser Mechanism)</div>
      <div class="controls">
        <button @click="reset" :disabled="isPlaying">Reset</button>
        <button @click="togglePlay" class="play-btn">
          {{
            isPlaying ? '⏸ Pause' : isFinished ? '↺ Replay' : '▶ Play Animation'
          }}
        </button>
      </div>
    </div>

    <!-- 1. 字节流传送带 -->
    <div class="stream-container">
      <div class="label">Input Byte Stream / 输入字节流</div>
      <div class="stream-track">
        <div class="stream-window-mask">
          <div
            class="stream-content"
            :style="{ transform: `translateX(-${currentIndex * 40}px)` }"
          >
            <div
              v-for="(char, index) in charStream"
              :key="index"
              class="char-box"
              :class="{
                active: index === currentIndex,
                processed: index < currentIndex,
                special: char.isSpecial,
                arg: char.isArg
              }"
            >
              <span class="char-val">{{ char.display }}</span>
              <span class="char-code">{{ char.hex }}</span>
            </div>
          </div>
        </div>
        <!-- 指针 -->
        <div class="pointer">
          <div class="arrow">⬆</div>
          <div class="pointer-label">Current Byte</div>
        </div>
      </div>
    </div>

    <!-- 2. 解析器状态机 -->
    <div class="parser-state-machine">
      <div class="state-box" :class="{ active: parserState === 'NORMAL' }">
        <div class="state-name">NORMAL</div>
        <div class="state-desc">Print Characters</div>
      </div>
      <div class="arrow-right">→</div>
      <div
        class="state-box warning"
        :class="{ active: parserState === 'ESCAPE' }"
      >
        <div class="state-name">ESCAPE MODE</div>
        <div class="state-desc">Buffer Command...</div>
      </div>

      <!-- 指令说明框 -->
      <div class="action-log" v-if="lastAction">
        <span class="action-icon">⚡</span>
        {{ lastAction }}
      </div>
    </div>

    <!-- 3. 终端屏幕 -->
    <div class="terminal-screen">
      <div class="label">Terminal Screen / 屏幕显示</div>
      <div class="screen-content">
        <span
          v-for="(char, index) in outputBuffer"
          :key="index"
          :style="char.style"
          >{{ char.val }}</span
        ><span class="cursor">_</span>
      </div>
    </div>

    <div class="explanation">
      <p>
        <span class="badge normal">Normal</span> 模式下，字符直接上屏。
        <span class="badge escape">Escape</span> 模式下（遇到
        <code>ESC</code>
        后），终端<strong>停止输出</strong>，开始收集字符作为指令，直到指令结束（如
        <code>m</code>）并执行。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 原始字符串: Hello [RED]World[RESET]!
// \x1B [ 3 1 m
const RAW_DATA = [
  { val: 'H', display: 'H', hex: '48' },
  { val: 'i', display: 'i', hex: '69' },
  { val: ' ', display: ' ', hex: '20' },
  { val: '\x1B', display: 'ESC', hex: '1B', isSpecial: true },
  { val: '[', display: '[', hex: '5B', isSpecial: true },
  { val: '3', display: '3', hex: '33', isArg: true },
  { val: '1', display: '1', hex: '31', isArg: true },
  { val: 'm', display: 'm', hex: '6D', isSpecial: true }, // End of seq
  { val: 'V', display: 'V', hex: '56' },
  { val: 'i', display: 'i', hex: '69' },
  { val: 'b', display: 'b', hex: '62' },
  { val: 'e', display: 'e', hex: '65' },
  { val: '\x1B', display: 'ESC', hex: '1B', isSpecial: true },
  { val: '[', display: '[', hex: '5B', isSpecial: true },
  { val: '0', display: '0', hex: '30', isArg: true },
  { val: 'm', display: 'm', hex: '6D', isSpecial: true },
  { val: '!', display: '!', hex: '21' }
]

const charStream = ref(RAW_DATA)
const currentIndex = ref(0)
const outputBuffer = ref([])
const parserState = ref('NORMAL') // NORMAL, ESCAPE
const currentStyle = ref({})
const isPlaying = ref(false)
const isFinished = ref(false)
const lastAction = ref('')

const reset = () => {
  isPlaying.value = false // Stop first
  currentIndex.value = 0
  outputBuffer.value = []
  parserState.value = 'NORMAL'
  currentStyle.value = {}
  isFinished.value = false
  lastAction.value = ''
}

const togglePlay = () => {
  if (isPlaying.value) {
    isPlaying.value = false
  } else {
    play()
  }
}

const play = async () => {
  if (isPlaying.value) return
  isPlaying.value = true

  // If finished, reset first
  if (isFinished.value) {
    reset()
    isPlaying.value = true
  }

  while (currentIndex.value < charStream.value.length) {
    if (!isPlaying.value) break

    const char = charStream.value[currentIndex.value]

    // Processing Logic
    if (parserState.value === 'NORMAL') {
      if (char.val === '\x1B') {
        parserState.value = 'ESCAPE'
        lastAction.value = 'Start Sequence'
      } else {
        outputBuffer.value.push({
          val: char.val,
          style: { ...currentStyle.value }
        })
        lastAction.value = 'Print Char'
      }
    } else if (parserState.value === 'ESCAPE') {
      // 简单模拟：遇到 'm' 结束
      if (char.val === 'm') {
        // 解析指令 (Hardcoded for demo)
        const prevChar = charStream.value[currentIndex.value - 1]
        if (prevChar.val === '1') {
          currentStyle.value = { color: '#ff5f56', fontWeight: 'bold' }
          lastAction.value = 'Execute: Set Color Red'
        } else if (prevChar.val === '0') {
          currentStyle.value = {}
          lastAction.value = 'Execute: Reset Style'
        }

        // Small delay to show "Executing" state
        await new Promise((r) => setTimeout(r, 200))
        parserState.value = 'NORMAL'
      } else {
        lastAction.value = 'Buffering...'
      }
    }

    await new Promise((r) => setTimeout(r, 600)) // Animation speed

    // Check playing again after wait
    if (!isPlaying.value) break

    currentIndex.value++
  }

  if (currentIndex.value >= charStream.value.length) {
    isPlaying.value = false
    isFinished.value = true
    lastAction.value = 'Done'
  }
}
</script>

<style scoped>
.parser-demo {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 20px;
  color: #fff;
  font-family: 'Menlo', monospace;
  margin: 20px 0;
  border: 1px solid #333;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-weight: bold;
  color: #ccc;
}

.controls button {
  background: #333;
  border: 1px solid #555;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 12px;
}

.controls button.play-btn {
  background: #0dbc79;
  border-color: #0dbc79;
  color: #000;
  font-weight: bold;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Stream Track */
.stream-container {
  background: #111;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.label {
  font-size: 10px;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.stream-track {
  position: relative;
  height: 60px;
  /* Use a fixed height to contain the items */
}

.stream-window-mask {
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 100%;
  /* Mask gradient to fade edges */
  mask-image: linear-gradient(
    to right,
    transparent,
    black 40%,
    black 60%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 40%,
    black 60%,
    transparent
  );
}

.stream-content {
  display: flex;
  gap: 4px;
  position: absolute;
  left: 50%; /* Center the container start */
  /* 
     Correct centering logic:
     - Item width: 36px
     - Gap: 4px
     - Total unit: 40px
     - We want Item[0] center to be at left:0 (relative to left:50%)
     - Item[0] center is at: 18px (half width)
     - So we need to shift left by 18px initially.
  */
  margin-left: -18px;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.char-box {
  width: 36px;
  height: 48px;
  background: #2d2d2d;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-shrink: 0;
  transition: all 0.3s;
}

.char-box.active {
  background: #fff;
  color: #000;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  z-index: 10;
  border-color: #fff;
}

.char-box.processed {
  opacity: 0.3;
}

.char-box.special {
  border-color: #e5e510;
  color: #e5e510;
}
.char-box.active.special {
  background: #e5e510;
  color: #000;
}

.char-box.arg {
  border-color: #11a8cd;
  color: #11a8cd;
}
.char-box.active.arg {
  background: #11a8cd;
  color: #fff;
}

.char-val {
  font-size: 14px;
  font-weight: bold;
}
.char-code {
  font-size: 9px;
  opacity: 0.7;
  margin-top: 2px;
}

.pointer {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #0dbc79;
}
.arrow {
  font-size: 20px;
  line-height: 1;
}
.pointer-label {
  font-size: 10px;
  white-space: nowrap;
}

/* State Machine */
.parser-state-machine {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  background: #252526;
  padding: 10px;
  border-radius: 6px;
  height: 60px;
}

.state-box {
  padding: 8px 16px;
  border-radius: 4px;
  background: #333;
  opacity: 0.3;
  text-align: center;
  transition: all 0.3s;
  min-width: 100px;
}

.state-box.active {
  opacity: 1;
  background: #0dbc79;
  color: #000;
  box-shadow: 0 0 15px rgba(13, 188, 121, 0.2);
}

.state-box.warning.active {
  background: #e5e510;
  color: #000;
}

.state-name {
  font-weight: bold;
  font-size: 12px;
}
.state-desc {
  font-size: 10px;
  opacity: 0.8;
}

.arrow-right {
  color: #555;
  font-size: 18px;
}

.action-log {
  margin-left: 20px;
  padding: 4px 12px;
  background: #000;
  border-radius: 4px;
  border: 1px solid #444;
  font-size: 12px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: flash 0.5s;
}

/* Screen */
.terminal-screen {
  background: #000;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 15px;
  min-height: 80px;
}

.screen-content {
  font-size: 16px;
  line-height: 1.5;
}

.cursor {
  animation: blink 1s infinite;
  color: #0dbc79;
}

.explanation {
  margin-top: 15px;
  font-size: 13px;
  color: #999;
  line-height: 1.5;
}

.badge {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  color: #000;
}
.badge.normal {
  background: #0dbc79;
}
.badge.escape {
  background: #e5e510;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes flash {
  0% {
    background: #333;
  }
  100% {
    background: #000;
  }
}
</style>
