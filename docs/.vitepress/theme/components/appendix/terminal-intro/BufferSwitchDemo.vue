<template>
  <div class="buffer-demo">
    <div class="terminal-frame">
      <div class="window-bar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">Terminal - Buffer Switching Demo</span>
      </div>

      <div class="screen-container">
        <!-- Main Buffer (Layer 0) -->
        <div class="buffer main-buffer">
          <div class="line">
            <span class="prompt">➜</span> <span class="cmd">ls -la</span>
          </div>
          <div class="line output">total 16</div>
          <div class="line output">
            drwxr-xr-x 2 user staff 64 Jan 15 10:00 .
          </div>
          <div class="line output">
            drwxr-xr-x 4 user staff 128 Jan 15 09:55 ..
          </div>
          <div class="line output">
            -rw-r--r-- 1 user staff 1024 Jan 15 10:00 notes.txt
          </div>
          <div class="line">
            <span class="prompt">➜</span>
            <span class="cmd">echo "Hello World"</span>
          </div>
          <div class="line output">Hello World</div>
          <div class="line">
            <span class="prompt">➜</span> <span class="cmd">vim notes.txt</span>
          </div>
          <!-- The cursor would be here if not in vim -->
        </div>

        <!-- Alternate Buffer (Layer 1) -->
        <transition name="slide-up">
          <div v-if="isAltBufferActive" class="buffer alt-buffer">
            <div class="vim-header">
              <span class="filename">notes.txt</span>
              <span class="modified">[+]</span>
            </div>
            <div class="vim-body">
              <div class="line-num">1</div>
              <div class="code">This is a text file opened in Vim.</div>
              <div class="line-num">2</div>
              <div class="code"></div>
              <div class="line-num">3</div>
              <div class="code">Notice how this interface takes up</div>
              <div class="line-num">4</div>
              <div class="code">the entire screen?</div>
              <div class="line-num">5</div>
              <div class="code"></div>
              <div class="line-num">6</div>
              <div class="code">
                It is running in the
                <span class="highlight">Alternate Buffer</span>.
              </div>
              <div class="line-num">~</div>
              <div class="line-num">~</div>
            </div>
            <div class="vim-status-bar">
              <span class="mode">NORMAL</span>
              <span class="file-info">notes.txt [unix] (10:24)</span>
            </div>
            <div class="vim-cmd-line">
              <span v-if="showQuitCmd">:q</span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="controls">
      <div class="description">
        <div v-if="!isAltBufferActive">
          <p><strong>Current: Primary Buffer (主缓冲区)</strong></p>
          <p>
            This is the standard scrolling log. Commands are executed line by
            line.
          </p>
          <button class="action-btn" @click="openVim">
            Execute `vim notes.txt`
          </button>
        </div>
        <div v-else>
          <p><strong>Current: Alternate Buffer (备用缓冲区)</strong></p>
          <p>
            A separate "canvas" for full-screen apps. It hides the history but
            doesn't delete it.
          </p>
          <button class="action-btn red" @click="quitVim">
            Execute `:q` (Quit)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isAltBufferActive = ref(false)
const showQuitCmd = ref(false)

const openVim = () => {
  isAltBufferActive.value = true
  showQuitCmd.value = false
}

const quitVim = () => {
  showQuitCmd.value = true
  setTimeout(() => {
    isAltBufferActive.value = false
  }, 500)
}
</script>

<style scoped>
.buffer-demo {
  margin: 20px 0;
  font-family: 'Menlo', 'Monaco', monospace;
}

.terminal-frame {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.window-bar {
  background: #2d2d2d;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.red {
  background: #ff5f56;
}
.yellow {
  background: #ffbd2e;
}
.green {
  background: #27c93f;
}

.title {
  margin-left: 10px;
  font-size: 12px;
  color: #999;
}

.screen-container {
  position: relative;
  height: 240px;
  background: #000;
  overflow: hidden;
}

.buffer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

/* Main Buffer Styles */
.main-buffer {
  color: #ccc;
  font-size: 13px;
  line-height: 1.5;
}

.prompt {
  color: #27c93f;
  margin-right: 8px;
}

.cmd {
  font-weight: bold;
  color: #fff;
}

.output {
  color: #888;
}

/* Alt Buffer Styles (Vim Look) */
.alt-buffer {
  background: #282c34;
  color: #abb2bf;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.vim-header {
  display: none; /* Vim doesn't usually have a top header like this, but helpful for context? Maybe skip */
}

.vim-body {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
}

.line-num {
  display: inline-block;
  width: 30px;
  color: #5c6370;
  text-align: right;
  margin-right: 10px;
}

.code {
  display: inline-block;
}

.highlight {
  color: #e5c07b;
  font-weight: bold;
}

.vim-status-bar {
  background: #3e4452;
  color: #ccc;
  padding: 4px 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.mode {
  font-weight: bold;
  background: #98c379;
  color: #282c34;
  padding: 0 5px;
  margin-right: 10px;
}

.vim-cmd-line {
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 5px;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.controls {
  margin-top: 15px;
  background: #f6f6f7;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #eee;
}

.dark .controls {
  background: #252529;
  border-color: #333;
}

.action-btn {
  background: #27c93f;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.2s;
  margin-top: 10px;
}

.action-btn:hover {
  background: #22b036;
  transform: translateY(-1px);
}

.action-btn.red {
  background: #ff5f56;
}

.action-btn.red:hover {
  background: #e0483e;
}

p {
  margin: 5px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}
</style>
