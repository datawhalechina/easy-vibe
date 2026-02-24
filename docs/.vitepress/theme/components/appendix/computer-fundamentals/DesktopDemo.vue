<template>
  <div class="desktop-demo">
    <div class="demo-label">桌面是如何出现的 ── 点击加载</div>

    <div class="desktop-view" @click="loading = !loading">
      <div class="screen" :class="{ loaded: loading }">
        <div class="boot-screen" v-if="!loading">
          <div class="boot-logo">⚙️</div>
          <div class="boot-text">正在启动...</div>
        </div>
        <div class="desktop" v-else>
          <div class="desktop-icons">
            <div class="desktop-icon">📁</div>
            <div class="desktop-icon">🗑️</div>
            <div class="desktop-icon">⚙️</div>
            <div class="desktop-icon">🌐</div>
          </div>
          <div class="taskbar">
            <div class="taskbar-icon">🏠</div>
            <div class="taskbar-icon">📊</div>
            <div class="taskbar-time">{{ time }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="tap-hint">👆 点击切换开机状态</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const loading = ref(false)
const time = ref('')

let timer = null

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.desktop-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.desktop-view {
  display: flex;
  justify-content: center;
}

.screen {
  width: 14rem;
  height: 9rem;
  background: #1a1a1a;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.5s;
}

.screen.loaded {
  background: linear-gradient(180deg, #2d5af5 0%, #1e3a8a 100%);
}

.boot-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}

.boot-logo {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.boot-text {
  font-size: 0.75rem;
}

.desktop {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
}

.desktop-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.desktop-icon {
  width: 2.2rem;
  height: 2.2rem;
  background: rgba(255,255,255,0.15);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.taskbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.3);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
}

.taskbar-icon {
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(255,255,255,0.2);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.taskbar-time {
  margin-left: auto;
  font-size: 0.7rem;
  color: white;
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}
</style>
