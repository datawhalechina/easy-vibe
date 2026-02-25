<template>
  <div class="desktop-demo">
    <div class="demo-title">从开机到桌面</div>
    <div class="screen-wrapper">
      <div class="screen">
        <div v-if="phase === 0" class="phase-bios">
          <div class="bios-text">POST 自检中...</div>
        </div>
        <div v-else-if="phase === 1" class="phase-boot">
          <div class="boot-spinner"></div>
          <div class="boot-text">正在加载内核...</div>
        </div>
        <div v-else-if="phase === 2" class="phase-loading">
          <div class="loading-bar-track">
            <div class="loading-bar-fill"></div>
          </div>
          <div class="loading-text">启动系统服务...</div>
        </div>
        <div v-else class="phase-desktop">
          <div class="desktop-icons">
            <div class="icon-item" v-for="icon in icons" :key="icon.label">
              <div class="icon-box">{{ icon.emoji }}</div>
              <div class="icon-label">{{ icon.label }}</div>
            </div>
          </div>
          <div class="taskbar">
            <span class="taskbar-start">☰</span>
            <span class="taskbar-spacer"></span>
            <span class="taskbar-clock">{{ clock }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="phase-labels">
      <span v-for="(label, i) in labels" :key="label" class="phase-label" :class="{ active: phase >= i }">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const phase = ref(0)
const clock = ref('')
let timer = null
let phaseTimer = null

const icons = [
  { emoji: '📁', label: '文件' },
  { emoji: '🌐', label: '浏览器' },
  { emoji: '⚙️', label: '设置' },
  { emoji: '🗑️', label: '回收站' }
]
const labels = ['BIOS 自检', '内核加载', '服务启动', '桌面就绪']

const updateClock = () => {
  const now = new Date()
  clock.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const runSequence = () => {
  if (phaseTimer) clearTimeout(phaseTimer)
  phase.value = 0
  const delays = [1500, 1500, 1800]
  let i = 0
  const next = () => {
    if (i < delays.length) {
      phaseTimer = setTimeout(() => {
        phase.value = i + 1
        i++
        next()
      }, delays[i])
    }
  }
  next()
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 30000)
  runSequence()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (phaseTimer) clearTimeout(phaseTimer)
})
</script>

<style scoped>
.desktop-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.screen-wrapper { display: flex; justify-content: center; }
.screen {
  width: 16rem;
  height: 10rem;
  background: #111;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}
/* BIOS phase */
.phase-bios {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bios-text {
  font-size: 0.7rem;
  color: #0f0;
  font-family: monospace;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
/* Boot phase */
.phase-boot {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}
.boot-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #333;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.boot-text {
  font-size: 0.65rem;
  color: #888;
}
/* Loading phase */
.phase-loading {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.loading-bar-track {
  width: 8rem;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
}
.loading-bar-fill {
  height: 100%;
  background: #4a9eff;
  border-radius: 2px;
  animation: fill 1.6s ease-out forwards;
}
@keyframes fill {
  from { width: 0; }
  to { width: 100%; }
}
.loading-text {
  font-size: 0.65rem;
  color: #888;
}
/* Desktop phase */
.phase-desktop {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  animation: fadeIn 0.5s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.desktop-icons {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  align-content: flex-start;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2.5rem;
}
.icon-box {
  width: 2rem;
  height: 2rem;
  background: rgba(255,255,255,0.15);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.icon-label {
  font-size: 0.5rem;
  color: rgba(255,255,255,0.8);
  margin-top: 0.15rem;
}
.taskbar {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background: rgba(0,0,0,0.4);
}
.taskbar-start {
  font-size: 0.7rem;
  color: white;
}
.taskbar-spacer { flex: 1; }
.taskbar-clock {
  font-size: 0.6rem;
  color: rgba(255,255,255,0.8);
}
/* Phase labels */
.phase-labels {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 0.7rem;
}
.phase-label {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  opacity: 0.4;
  transition: opacity 0.3s;
}
.phase-label.active {
  opacity: 1;
  color: var(--vp-c-brand);
}
</style>
