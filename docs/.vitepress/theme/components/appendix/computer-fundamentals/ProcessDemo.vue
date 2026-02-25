<template>
  <div class="demo">
    <div class="title">⏱️ CPU 在疯狂切换，你感觉不出来</div>
    
    <div class="cpu-core">
      <div class="cpu-label">CPU</div>
      <div class="current-task" :class="{ switching: isSwitching }">
        <span class="task-icon">{{ currentTask.icon }}</span>
        <span class="task-name">{{ currentTask.name }}</span>
      </div>
      <div class="time-slice">时间片: {{ timeLeft }}ms</div>
    </div>

    <div class="process-queue">
      <div
        v-for="(proc, idx) in processes"
        :key="proc.id"
        class="process"
        :class="{ 
          active: idx === currentIdx, 
          waiting: idx !== currentIdx,
          done: proc.progress >= 100
        }"
        :style="{ '--progress': proc.progress + '%' }"
      >
        <span class="p-icon">{{ proc.icon }}</span>
        <div class="p-info">
          <span class="p-name">{{ proc.name }}</span>
          <div class="p-bar">
            <div class="p-fill"></div>
          </div>
        </div>
        <span class="p-status">{{ idx === currentIdx ? '运行中' : (proc.progress >= 100 ? '完成' : '等待') }}</span>
      </div>
    </div>

    <div class="explain">
      <strong>💡 原理：</strong>CPU 每 {{ sliceTime }}ms 切换一次进程，因为太快了你感觉是"同时运行"。实际上每个进程都在断断续续地执行。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const processes = ref([
  { id: 1, name: '微信', icon: '💬', progress: 0 },
  { id: 2, name: '音乐', icon: '🎵', progress: 0 },
  { id: 3, name: '浏览器', icon: '🌐', progress: 0 }
])

const currentIdx = ref(0)
const timeLeft = ref(0)
const isSwitching = ref(false)
const sliceTime = 100 // 每个时间片100ms（演示用，实际是10ms左右）

let timer = null
let switchTimer = null

const switchTask = () => {
  isSwitching.value = true
  setTimeout(() => {
    currentIdx.value = (currentIdx.value + 1) % processes.value.length
    timeLeft.value = sliceTime
    isSwitching.value = false
  }, 200)
}

const tick = () => {
  const current = processes.value[currentIdx.value]
  
  // 当前进程执行
  if (current.progress < 100) {
    current.progress = Math.min(100, current.progress + 5)
  }
  
  // 时间片倒计时
  timeLeft.value -= 10
  
  // 时间片用完，切换
  if (timeLeft.value <= 0) {
    switchTask()
  }
  
  // 检查是否全部完成
  if (processes.value.every(p => p.progress >= 100)) {
    // 重置演示
    setTimeout(() => {
      processes.value.forEach(p => p.progress = 0)
      currentIdx.value = 0
      timeLeft.value = sliceTime
    }, 2000)
  }
}

onMounted(() => {
  timeLeft.value = sliceTime
  timer = setInterval(tick, 10) // 每10ms更新一次
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (switchTimer) clearTimeout(switchTimer)
})

const currentTask = computed(() => processes.value[currentIdx.value])
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 1rem 0;
}

.title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
}

.cpu-core {
  background: linear-gradient(135deg, #667eea22, #764ba222);
  border: 2px solid #667eea;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  margin-bottom: 12px;
  position: relative;
}

.cpu-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.current-task {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s;
}

.current-task.switching {
  opacity: 0.3;
  transform: scale(0.9);
}

.task-icon {
  font-size: 24px;
}

.time-slice {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 10px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
}

.process-queue {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.process {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.3s;
}

.process.active {
  border-color: #667eea;
  background: #667eea11;
  box-shadow: 0 0 10px #667eea33;
}

.process.done {
  opacity: 0.6;
}

.process.done .p-fill {
  background: #10b981;
}

.p-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.p-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.p-name {
  font-size: 12px;
  font-weight: 600;
}

.p-bar {
  height: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  overflow: hidden;
}

.p-fill {
  height: 100%;
  width: var(--progress);
  background: #667eea;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.p-status {
  font-size: 10px;
  color: var(--vp-c-text-3);
  padding: 2px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.process.active .p-status {
  color: #667eea;
  background: #667eea22;
}

.explain {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.explain strong { color: var(--vp-c-text-1); }
</style>
