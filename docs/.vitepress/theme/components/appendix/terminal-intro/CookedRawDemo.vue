<template>
  <div class="cooked-raw-demo">
    <div class="mode-switch">
      <button :class="{ active: mode === 'cooked' }" @click="setMode('cooked')">
        🥘 Cooked Mode (Standard)
      </button>
      <button :class="{ active: mode === 'raw' }" @click="setMode('raw')">
        🥩 Raw Mode (Vim/Games)
      </button>
    </div>

    <div class="demo-container" @click="focusInput">
      <!-- Hidden Input for capturing keystrokes -->
      <input
        ref="inputRef"
        type="text"
        class="hidden-input"
        @keydown="handleKey"
        @blur="isFocused = false"
        @focus="isFocused = true"
      />

      <!-- Visualization -->
      <div class="flow-diagram">
        <!-- 1. User Input -->
        <div class="stage user-input" :class="{ focused: isFocused }">
          <div class="stage-title">1. Keyboard Input</div>
          <div class="key-visual">
            <span v-if="lastPressedKey" class="key-cap">{{
              lastPressedKey
            }}</span>
            <span v-else class="placeholder">Type here...</span>
          </div>
          <div class="status-text" v-if="!isFocused">Click to focus</div>
        </div>

        <div class="arrow">⬇</div>

        <!-- 2. OS Buffer (Only for Cooked) -->
        <div
          class="stage buffer"
          :class="{ disabled: mode === 'raw', active: mode === 'cooked' }"
        >
          <div class="stage-title">
            2. Line Buffer (Kernel)
            <span class="badge" v-if="mode === 'cooked'">Active</span>
            <span class="badge disabled" v-else>Bypassed</span>
          </div>
          <div class="buffer-content">
            <template v-if="mode === 'cooked'">
              <span v-for="(char, i) in buffer" :key="i" class="char">{{
                char
              }}</span>
              <span class="cursor">_</span>
            </template>
            <template v-else>
              <span class="bypass-text">⚡ Direct Pass-through ⚡</span>
            </template>
          </div>
          <div class="explanation">
            <span v-if="mode === 'cooked'"
              >Waiting for Enter... (Backspace works)</span
            >
            <span v-else>No buffering. Every key is sent immediately.</span>
          </div>
        </div>

        <div class="arrow">⬇</div>

        <!-- 3. Application -->
        <div class="stage app-input">
          <div class="stage-title">3. Application Receives</div>
          <div class="app-content">
            <div v-for="(line, i) in appLines" :key="i" class="app-line">
              {{ line }}
            </div>
            <div class="app-line current">
              {{ appCurrentLine }}<span class="app-cursor">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('cooked')
const buffer = ref([])
const appLines = ref([])
const appCurrentLine = ref('')
const lastPressedKey = ref('')
const inputRef = ref(null)
const isFocused = ref(false)

const setMode = (m) => {
  mode.value = m
  buffer.value = []
  appLines.value = []
  appCurrentLine.value = ''
  lastPressedKey.value = ''
  // Focus input
  setTimeout(() => inputRef.value?.focus(), 50)
}

const focusInput = () => {
  inputRef.value?.focus()
}

const handleKey = (e) => {
  e.preventDefault()

  const key = e.key

  // Visual feedback
  if (key === ' ') lastPressedKey.value = 'Space'
  else if (key === 'Enter') lastPressedKey.value = 'Enter'
  else if (key === 'Backspace') lastPressedKey.value = '⌫'
  else if (key.length === 1) lastPressedKey.value = key
  else lastPressedKey.value = key

  // Clear visual feedback after delay
  setTimeout(() => {
    if (
      lastPressedKey.value ===
      (key === ' '
        ? 'Space'
        : key === 'Enter'
          ? 'Enter'
          : key === 'Backspace'
            ? '⌫'
            : key)
    ) {
      // lastPressedKey.value = '' // Optional: keep last key visible
    }
  }, 500)

  if (mode.value === 'cooked') {
    handleCookedMode(e)
  } else {
    handleRawMode(e)
  }
}

const handleCookedMode = (e) => {
  if (e.key === 'Enter') {
    // Flush buffer to app
    const text = buffer.value.join('')
    appLines.value.push(text)
    buffer.value = []
  } else if (e.key === 'Backspace') {
    buffer.value.pop()
  } else if (e.key.length === 1) {
    buffer.value.push(e.key)
  }
}

const handleRawMode = (e) => {
  // Immediate send
  if (e.key === 'Enter') {
    appLines.value.push(appCurrentLine.value)
    appCurrentLine.value = ''
  } else if (e.key === 'Backspace') {
    // In raw mode, Backspace is just a control code sent to app
    // But for demo visualization, let's show it effectively deletes in app if app handles it
    // Or strictly show control code? Let's simulate app handling it immediately.
    appCurrentLine.value = appCurrentLine.value.slice(0, -1)
  } else if (e.key.length === 1) {
    appCurrentLine.value += e.key
  }
}
</script>

<style scoped>
.cooked-raw-demo {
  margin: 24px 0;
  font-family: 'Menlo', 'Monaco', monospace;
  user-select: none;
}

.mode-switch {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.mode-switch button {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.mode-switch button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.demo-container {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #333;
  position: relative;
  cursor: text;
}

.hidden-input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: text;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.stage {
  width: 100%;
  background: #2d2d2d;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 15px;
  transition: all 0.3s;
}

.stage-title {
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stage.user-input.focused {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 10px rgba(var(--vp-c-brand-rgb), 0.1);
}

.key-visual {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.key-cap {
  background: #eee;
  color: #333;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 2px 0 #ccc;
  font-size: 16px;
  animation: pop 0.1s;
}

.placeholder {
  color: #555;
  font-style: italic;
}

.status-text {
  text-align: center;
  font-size: 11px;
  color: #666;
  margin-top: 5px;
}

.arrow {
  color: #555;
  font-size: 20px;
}

/* Buffer */
.stage.buffer.active {
  background: #25332e;
  border-color: #0dbc79;
}

.stage.buffer.disabled {
  opacity: 0.5;
  background: #222;
  border-style: dashed;
}

.buffer-content {
  background: #000;
  padding: 10px;
  border-radius: 4px;
  min-height: 40px;
  color: #0dbc79;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.bypass-text {
  color: #e5e510;
  font-style: italic;
  font-size: 12px;
  width: 100%;
  text-align: center;
}

.explanation {
  font-size: 11px;
  color: #999;
  margin-top: 8px;
}

/* App */
.stage.app-input {
  background: #252526;
}

.app-content {
  background: #000;
  padding: 10px;
  border-radius: 4px;
  min-height: 80px;
  color: #ccc;
  font-size: 14px;
}

.app-line {
  min-height: 20px;
}

.badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  background: #0dbc79;
  color: #000;
}

.badge.disabled {
  background: #555;
  color: #ccc;
}

.cursor,
.app-cursor {
  display: inline-block;
  width: 8px;
  background: currentColor;
  animation: blink 1s infinite;
}

@keyframes pop {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
