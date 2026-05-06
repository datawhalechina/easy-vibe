<template>
  <Transition name="progress-fade">
    <div 
      v-if="showProgress" 
      class="reading-progress"
      :class="{ 'is-dragging': isDragging }"
      :title="progressTitle"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @click="handleClick"
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
        <div v-if="showArrow && !isDragging" key="arrow" class="progress-arrow">↑</div>
        <div v-else key="percent" class="progress-text">{{ progress }}%</div>
      </Transition>

      <div v-if="!isDragging && bookmarkLabel" class="bookmark-label">
        {{ bookmarkLabel }}
      </div>
      
      <!-- 拖拽时的提示 -->
      <div v-if="isDragging" class="drag-hint">拖动调整</div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, nextTick, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import {
  createReadingBookmark,
  readReadingBookmark,
  writeReadingBookmark
} from '../utils/readingBookmark.js'

const route = useRoute()
const progress = ref(0)
const showProgress = ref(false)
const showArrow = ref(false)
const articleTitle = ref('')
const activeSection = ref('')
const restoredBookmark = ref(null)
// Circle circumference = 2 * PI * r, where r=24
const circumference = 2 * Math.PI * 24
let scrollTimer = null
let saveTimer = null
let restoreTimer = null
let clickSaveTimer = null

// 拖拽相关状态
const isDragging = ref(false)
const startY = ref(0)
const startProgress = ref(0)
const movedDuringDrag = ref(false)
let dragRafId = null
let skipNextClick = false

const currentPath = () =>
  `${window.location.pathname}${window.location.search || ''}`

const getClientStorage = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const getMaxScrollY = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

const getArticleTitle = () => {
  const heading = document.querySelector('.vp-doc h1')
  return (heading?.textContent || document.title || '').trim()
}

const updateActiveSection = () => {
  const headings = Array.from(
    document.querySelectorAll('.vp-doc h2, .vp-doc h3')
  )
  let current = ''

  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= 96) {
      current = heading.textContent?.trim() || ''
    } else {
      break
    }
  }

  activeSection.value = current
}

const bookmarkLabel = computed(() => {
  const title = articleTitle.value || restoredBookmark.value?.title || ''
  const section = activeSection.value || restoredBookmark.value?.section || ''
  return section || title
})

const bookmarkTitle = computed(() => {
  const title =
    articleTitle.value || restoredBookmark.value?.title || '当前文章'
  const section = activeSection.value || restoredBookmark.value?.section || ''
  return section ? `${title} - ${section}` : title
})

const progressTitle = computed(() =>
  isDragging.value
    ? '拖动调整位置'
    : `${bookmarkTitle.value} · 阅读进度 ${progress.value}%`
)

const saveBookmark = () => {
  writeReadingBookmark(
    getClientStorage(),
    createReadingBookmark({
      path: currentPath(),
      title: articleTitle.value,
      section: activeSection.value,
      scrollY: window.scrollY,
      progress: progress.value
    })
  )
}

const scheduleBookmarkSave = () => {
  if (saveTimer) {
    window.clearTimeout(saveTimer)
  }
  saveTimer = window.setTimeout(saveBookmark, 180)
}

const updateProgress = () => {
  // 拖拽时不更新进度，避免冲突
  if (isDragging.value) return

  articleTitle.value = getArticleTitle()
  updateActiveSection()
  
  const scrollTop = window.scrollY
  const docHeight = getMaxScrollY()
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  
  progress.value = Math.min(Math.round(scrollPercent), 100)
  showProgress.value = scrollTop > 0 // 开始滚动就显示
  restoredBookmark.value = null
  
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

  scheduleBookmarkSave()
}

const restoreBookmark = async () => {
  await nextTick()

  if (restoreTimer) {
    window.clearTimeout(restoreTimer)
  }

  restoreTimer = window.setTimeout(() => {
    articleTitle.value = getArticleTitle()
    updateActiveSection()

    const saved = readReadingBookmark(
      getClientStorage(),
      currentPath(),
      getMaxScrollY()
    )

    if (!saved || saved.scrollY <= 0) {
      updateProgress()
      return
    }

    restoredBookmark.value = saved
    articleTitle.value = saved.title || articleTitle.value
    activeSection.value = saved.section || activeSection.value
    progress.value = saved.progress
    showProgress.value = true
    showArrow.value = true

    window.scrollTo({
      top: saved.scrollY,
      behavior: 'auto'
    })

    window.setTimeout(updateProgress, 0)
  }, 80)
}

const resetRouteState = () => {
  progress.value = 0
  showProgress.value = false
  showArrow.value = false
  restoredBookmark.value = null
  articleTitle.value = ''
  activeSection.value = ''
}

// 开始拖拽
const startDrag = (e) => {
  e.preventDefault()
  
  isDragging.value = true
  startY.value = 'touches' in e ? e.touches[0].clientY : e.clientY
  startProgress.value = progress.value
  movedDuringDrag.value = false
  
  // 添加全局事件监听
  document.addEventListener('mousemove', onDrag, { passive: false })
  document.addEventListener('mouseup', endDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', endDrag)
}

// 拖拽中
const onDrag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  
  const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY
  const deltaY = startY.value - currentY // 向上拖动为正值
  if (Math.abs(deltaY) > 4) {
    movedDuringDrag.value = true
  }
  
  // 每拖动 3 像素调整 1% 进度
  const sensitivity = 3
  const progressDelta = deltaY / sensitivity
  
  // 计算新的进度值
  let newProgress = startProgress.value + progressDelta
  newProgress = Math.max(0, Math.min(100, newProgress))
  
  // 使用 requestAnimationFrame 优化性能
  if (dragRafId) {
    cancelAnimationFrame(dragRafId)
  }
  
  dragRafId = requestAnimationFrame(() => {
    progress.value = Math.round(newProgress)
    
    // 实时滚动页面
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight > 0) {
      window.scrollTo({
        top: (progress.value / 100) * docHeight,
        behavior: 'auto' // 拖拽时使用 auto 避免延迟
      })
    }
  })
}

// 结束拖拽
const endDrag = () => {
  const shouldSkipClick = movedDuringDrag.value
  isDragging.value = false
  
  // 清除事件监听
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
  
  if (dragRafId) {
    cancelAnimationFrame(dragRafId)
    dragRafId = null
  }
  
  // 恢复箭头显示
  if (window.scrollY > 0) {
    showArrow.value = true
  }

  articleTitle.value = getArticleTitle()
  updateActiveSection()
  saveBookmark()

  if (shouldSkipClick) {
    skipNextClick = true
    window.setTimeout(() => {
      skipNextClick = false
    }, 0)
  }
}

// 点击回到顶部
const handleClick = () => {
  // 如果是拖拽结束后的点击，不触发回到顶部
  if (isDragging.value || skipNextClick) {
    skipNextClick = false
    return
  }
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  if (clickSaveTimer) {
    window.clearTimeout(clickSaveTimer)
  }
  clickSaveTimer = window.setTimeout(() => {
    updateProgress()
    saveBookmark()
  }, 400)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  restoreBookmark()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  if (restoreTimer) {
    clearTimeout(restoreTimer)
  }
  if (clickSaveTimer) {
    clearTimeout(clickSaveTimer)
  }
  // 清理拖拽事件
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
  if (dragRafId) {
    cancelAnimationFrame(dragRafId)
  }
})

watch(
  () => route.path,
  () => {
    resetRouteState()
    restoreBookmark()
  }
)
</script>

<style scoped>
.reading-progress {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  cursor: grab;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: none;
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

.reading-progress.is-dragging {
  cursor: grabbing;
  transform: scale(1.15);
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2));
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
  transition: stroke-dashoffset 0.1s ease;
}

.reading-progress.is-dragging .progress-ring-circle {
  transition: none; /* 拖拽时移除过渡动画，更跟手 */
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

.bookmark-label {
  position: absolute;
  right: 0;
  bottom: 100%;
  width: max-content;
  max-width: min(260px, calc(100vw - 48px));
  margin-bottom: 8px;
  padding: 5px 9px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: opacity 0.18s ease, transform 0.18s ease;
  transform: translateY(4px);
}

.reading-progress:hover .bookmark-label {
  opacity: 1;
  transform: translateY(0);
}

@keyframes bounce {
  0%, 100% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
}

/* 拖拽提示 */
.drag-hint {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  animation: fadeIn 0.2s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
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
