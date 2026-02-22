<template>
  <div class="process-demo">
    <div class="controls-section">
      <button
        class="action-btn"
        :class="{ active: isRunning }"
        @click="toggleSimulation"
      >
        {{ isRunning ? '⏸ 暂停时间片轮转' : '▶️ 启动 CPU' }}
      </button>
      <div class="speed-control">
        <label>时间流速:</label>
        <button :class="{ active: speed === 'slow' }" @click="setSpeed('slow')">
          极慢动作
        </button>
        <button :class="{ active: speed === 'fast' }" @click="setSpeed('fast')">
          真实速度
        </button>
      </div>
    </div>

    <div class="cpu-container">
      <div class="cpu-core" :class="{ active: isRunning }">
        <div class="cpu-title">单核 CPU</div>
        <div class="current-task">
          <span v-if="activeProcess" class="task-badge">
            正在处理: {{ activeProcess.icon }} {{ activeProcess.name }}
          </span>
          <span v-else class="task-badge idle"> 空闲中... </span>
        </div>
      </div>
      <!-- 连接线动画 -->
      <div class="connector">
        <div
          class="data-flow"
          :class="[`flow-${activeProcessId}`, { running: isRunning }]"
        ></div>
      </div>
    </div>

    <div class="processes-grid">
      <div
        v-for="p in processes"
        :key="p.id"
        class="process-card"
        :class="{ active: p.id === activeProcessId }"
      >
        <div class="p-header">
          <div class="p-title">
            <span class="icon">{{ p.icon }}</span>
            <span class="name">{{ p.name }}</span>
          </div>
          <span
            class="status-badge"
            :class="p.id === activeProcessId ? 'running' : 'waiting'"
          >
            {{ p.id === activeProcessId ? '独占 CPU' : '排队等待' }}
          </span>
        </div>
        <div class="p-progress">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: p.progress + '%' }"
            ></div>
          </div>
          <div class="progress-text">{{ Math.floor(p.progress) }}% 完成</div>
        </div>
      </div>
    </div>

    <div
      class="explanation-box"
      :class="{ show: isRunning && speed === 'fast' }"
    >
      💡
      **关键启示**：当切换速度足够快时，肉眼已经无法分辨谁在“等待”。这也就是为什么只有一个
      CPU 核心的电脑，依然能让你一边听歌一边打字！
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const isRunning = ref(false)
const activeProcessId = ref(null)
const speed = ref('slow')
let interval = null

const processes = ref([
  { id: 1, name: '微信接收', icon: '💬', progress: 0 },
  { id: 2, name: '音乐播放', icon: '🎵', progress: 0 },
  { id: 3, name: '游戏渲染', icon: '🎮', progress: 0 }
])

const activeProcess = computed(() =>
  processes.value.find((p) => p.id === activeProcessId.value)
)

const setSpeed = (s) => {
  speed.value = s
  if (isRunning.value) {
    clearInterval(interval)
    startLoop()
  }
}

const startLoop = () => {
  const switchTime = speed.value === 'slow' ? 1200 : 80 // 慢动作 1.2s，快动作极快

  if (!activeProcessId.value) {
    activeProcessId.value = 1
  }

  interval = setInterval(() => {
    // 增加当前进度
    const curr = processes.value.find((p) => p.id === activeProcessId.value)
    if (curr) {
      curr.progress += speed.value === 'slow' ? 15 : 4
      if (curr.progress >= 100) curr.progress = 0
    }

    // 切换下一个
    let nextId = activeProcessId.value + 1
    if (nextId > 3) nextId = 1
    activeProcessId.value = nextId
  }, switchTime)
}

const toggleSimulation = () => {
  if (isRunning.value) {
    clearInterval(interval)
    isRunning.value = false
    activeProcessId.value = null
  } else {
    isRunning.value = true
    startLoop()
  }
}

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.process-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}
.action-btn.active {
  background: var(--vp-c-danger-1);
}
.action-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.speed-control button {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.speed-control button.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  font-weight: bold;
}

.cpu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.cpu-core {
  width: 240px;
  height: 90px;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  position: relative;
}
.cpu-core.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 20px var(--vp-c-brand-soft);
}
.cpu-title {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}

.current-task {
  height: 28px;
  display: flex;
  align-items: center;
}
.task-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}
.task-badge.idle {
  background: var(--vp-c-text-3);
}

/* 连接线动画占位，简化效果，用发亮的虚线替代 */
.connector {
  width: 2px;
  height: 30px;
  background: var(--vp-c-divider);
  margin-top: 5px;
  position: relative;
}

.processes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .processes-grid {
    grid-template-columns: 1fr;
  }
}

.process-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.process-card.active {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--vp-c-brand-soft);
}

.process-card.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--vp-c-brand-1);
}

.p-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.p-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
}

.status-badge {
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}
.status-badge.waiting {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
.status-badge.running {
  background: rgba(16, 185, 129, 0.15);
  color: var(--vp-c-success-1);
}

.p-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.1s linear;
}
.process-card.active .progress-fill {
  background: var(--vp-c-success-1);
}

.progress-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.explanation-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(16, 185, 129, 0.1);
  border-left: 4px solid var(--vp-c-success-1);
  border-radius: 0 8px 8px 0;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s ease;
}
.explanation-box.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
