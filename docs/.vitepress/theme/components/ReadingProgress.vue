<template>
  <Transition name="progress-fade">
    <div 
      v-if="showProgress" 
      class="reading-progress"
      @click="scrollToTop"
      :title="'阅读进度 ' + progress + '%'"
    >
      <svg class="progress-ring" viewBox="0 0 56 56">
        <circle
          class="progress-ring-bg"
          cx="28"
          cy="28"
          r="24"
        />
        <circle
          class="progress-ring-circle"
          cx="28"
          cy="28"
          r="24"
          :style="{ strokeDashoffset: circumference - (progress / 100) * circumference }"
        />
      </svg>
      <Transition name="content-switch">
        <div v-if="showArrow" key="arrow" class="progress-arrow">↑</div>
        <div v-else key="percent" class="progress-text">{{ progress }}%</div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const showProgress = ref(false)
const showArrow = ref(false)
const circumference = 2 * Math.PI * 24 // 2πr，r=24
let scrollTimer: number | null = null

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  
  progress.value = Math.min(Math.round(scrollPercent), 100)
  showProgress.value = scrollTop > 0 // 开始滚动就显示
  
  // 滚动时显示百分比
  showArrow.value = false
  
  // 清除之前的定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
  
  // 停止滚动1.5秒后显示箭头
  scrollTimer = window.setTimeout(() => {
    if (window.scrollY > 0) {
      showArrow.value = true
    }
  }, 1500)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
})
</script>

<style scoped>
.reading-progress {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.reading-progress:focus {
  outline: none;
}

.reading-progress:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 50%;
}

.dark .reading-progress {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.reading-progress:hover {
  transform: scale(1.1);
}

.reading-progress:active {
  transform: scale(0.95);
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-divider);
  stroke-width: 3;
}

.progress-ring-circle {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 150.796; /* 2πr = 2 * 3.14159 * 24 */
  transition: stroke-dashoffset 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  pointer-events: none;
  user-select: none;
}

.progress-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  pointer-events: none;
  user-select: none;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
}

/* 内容切换动画 */
.content-switch-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.content-switch-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.content-switch-enter-from {
  opacity: 0;
  transform: translate(-50%, -40%) scale(0.8);
}

.content-switch-leave-to {
  opacity: 0;
  transform: translate(-50%, -60%) scale(0.8);
}

/* 渐入渐出动画 */
.progress-fade-enter-active,
.progress-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.progress-fade-enter-from,
.progress-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .reading-progress {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
  }

  .progress-text {
    font-size: 11px;
  }
  
  .progress-arrow {
    font-size: 22px;
  }
}
</style>
