<script setup>
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'
import macbookImage from '../../../../assets/macbook.png'
import story1Cover from '../../../zh-cn/vibe-stories/images/story-1/image5.png'
import story2Cover from '../../../zh-cn/vibe-stories/images/story-2/image4.png'
import story3Cover from '../../../zh-cn/vibe-stories/images/story-3/image3.png'
import story4Cover from '../../../zh-cn/vibe-stories/images/story-4/image7.png'

// Try to inject translation context from parent or provide a default fallback
const t = inject('t', {
  value: {
    stories: {
      cat: '用户故事',
      title: '看见每一个<br><span class="highlight">闪亮的你</span>',
      sub: '加入他们，分享你的 vibe coding 故事',
      authorPrefix: '讲述者：',
      ui: {
        prevLabel: '上一则故事',
        nextLabel: '下一则故事',
        selectLabel: '查看这个故事',
        imageAlt: '用户故事封面'
      }
    }
  }
})

const tStories = computed(() => [
  {
    id: 1,
    title: t.value?.stories?.s1?.title || '放弃月入过万，他在农村小学带孩子们“用AI赶苍蝇”',
    author: t.value?.stories?.s1?.author || '小学老师小浩',
    avatar: '👨‍🏫',
    image: story1Cover,
    imageStyle: {
      objectPosition: 'center center'
    },
    link: '/zh-cn/vibe-stories/story-1'
  },
  {
    id: 2,
    title: t.value?.stories?.s2?.title || '期末考试周，我偷偷用AI造了个“校园闲鱼”',
    author: t.value?.stories?.s2?.author || '一位大二学生',
    avatar: '🎓',
    image: story2Cover,
    imageStyle: {
      objectPosition: 'center center'
    },
    link: '/zh-cn/vibe-stories/story-2'
  },
  {
    id: 3,
    title: t.value?.stories?.s3?.title || '我给每个学生，做了一个不会累的“学霸同桌”',
    author: t.value?.stories?.s3?.author || '高中信息技术老师',
    avatar: '🧑‍🏫',
    image: story3Cover,
    imageStyle: {
      objectPosition: '34% center'
    },
    link: '/zh-cn/vibe-stories/story-3'
  },
  {
    id: 4,
    title: t.value?.stories?.s4?.title || '48岁货车司机，熬了几个通宵，硬是用AI磕出一个出海工具站',
    author: t.value?.stories?.s4?.author || '货车司机老黄',
    avatar: '🚚',
    image: story4Cover,
    imageStyle: {
      objectPosition: 'center center'
    },
    link: '/zh-cn/vibe-stories/story-4'
  }
])

const defaultScreenViewport = Object.freeze({
  left: 19,
  top: 1.75,
  width: 62.75,
  height: 71.5,
  radius: 12
})

const currentIndex = ref(0)
let autoplayTimer = null
const isPaginating = ref(false)
const containerRef = ref(null)
const laptopRef = ref(null)
let wheelHandler = null
let resizeObserver = null

const LAPTOP_ASPECT_RATIO = 2675 / 4608
const laptopHeightPx = ref(null)

// Visible image container geometry relative to `.laptop-container`.
// Adjust these five values directly to control the screen viewport.
const screenViewport = ref({ ...defaultScreenViewport })

const formatPercent = (value) => `${value}%`
const formatPixels = (value) => `${value}px`

// The percentages below are always resolved against `.laptop-container`.
const screenViewportStyle = computed(() => ({
  '--screen-left': formatPercent(screenViewport.value.left),
  '--screen-top': formatPercent(screenViewport.value.top),
  '--screen-width': formatPercent(screenViewport.value.width),
  '--screen-height': formatPercent(screenViewport.value.height),
  '--screen-radius': formatPixels(screenViewport.value.radius)
}))

const currentStory = computed(() => tStories.value[currentIndex.value] ?? tStories.value[0])

const currentImageStyle = computed(() => currentStory.value?.imageStyle || {})

const laptopContainerStyle = computed(() => (
  laptopHeightPx.value
    ? { height: `${laptopHeightPx.value}px` }
    : {}
))

const transitionName = ref('slide-left')

const next = () => {
  if (isPaginating.value) return
  isPaginating.value = true
  transitionName.value = 'slide-left'
  currentIndex.value = (currentIndex.value + 1) % tStories.value.length
  setTimeout(() => {
    isPaginating.value = false
  }, 800)
}

const prev = () => {
  if (isPaginating.value) return
  isPaginating.value = true
  transitionName.value = 'slide-right'
  currentIndex.value = (currentIndex.value - 1 + tStories.value.length) % tStories.value.length
  setTimeout(() => {
    isPaginating.value = false
  }, 800)
}

const setIndex = (index) => {
  if (index === currentIndex.value) return
  transitionName.value = index > currentIndex.value ? 'slide-left' : 'slide-right'
  currentIndex.value = index
}

const startAutoplay = () => {
  autoplayTimer = setInterval(() => {
    if (!isPaginating.value) {
      transitionName.value = 'slide-left'
      currentIndex.value = (currentIndex.value + 1) % tStories.value.length
    }
  }, 4000)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
  }
}

const updateLaptopHeight = () => {
  const laptop = laptopRef.value
  if (!laptop) return

  const nextHeight = laptop.clientWidth * LAPTOP_ASPECT_RATIO
  laptopHeightPx.value = nextHeight > 0 ? nextHeight : null
}

onMounted(() => {
  startAutoplay()
  const container = containerRef.value
  const laptop = laptopRef.value
  if (!container) return

  wheelHandler = (e) => {
    if (Math.abs(e.deltaX) > 20 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      if (e.deltaX > 0) {
        next()
      } else {
        prev()
      }
    }
  }

  container.addEventListener('wheel', wheelHandler, { passive: false })

  updateLaptopHeight()

  if (typeof ResizeObserver !== 'undefined' && laptop) {
    resizeObserver = new ResizeObserver(() => {
      updateLaptopHeight()
    })
    resizeObserver.observe(laptop)
  } else if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateLaptopHeight)
  }
})

onUnmounted(() => {
  stopAutoplay()
  const container = containerRef.value
  if (container && wheelHandler) {
    container.removeEventListener('wheel', wheelHandler)
  }

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  } else if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateLaptopHeight)
  }
})
</script>

<template>
  <div ref="containerRef" class="vibe-stories-container">
    <div class="section-header">
      <h3 class="section-headline" v-html="t.stories?.title || '看见每一个<br><span class=\'highlight\'>闪亮的你</span>'"></h3>
      <p class="section-sub">{{ t.stories?.sub || '加入他们，分享你的 vibe coding 故事' }}</p>
    </div>

    <div class="laptop-wrapper" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
      <div ref="laptopRef" class="laptop-container" :style="laptopContainerStyle">
        <!-- Navigation Controls -->
        <button class="nav-btn prev" :aria-label="t.stories?.ui?.prevLabel || 'Previous story'" @click="prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button class="nav-btn next" :aria-label="t.stories?.ui?.nextLabel || 'Next story'" @click="next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        <div class="screen-content" :style="screenViewportStyle">
          <a :href="withBase(currentStory.link)" class="screen-link">
            <transition :name="transitionName">
              <div :key="currentStory.id" class="screen-image-wrapper">
                <img
                  :src="currentStory.image"
                  class="screen-image" 
                  :style="currentImageStyle"
                  :alt="t.stories?.ui?.imageAlt || 'Story screenshot'"
                />
              </div>
            </transition>
          </a>
        </div>
        <!-- Laptop Frame -->
        <img :src="macbookImage" class="laptop-frame" alt="MacBook Frame" />
      </div>

      <!-- Story Info & Avatar -->
      <div class="story-info">
        <div class="story-avatar">{{ currentStory.avatar }}</div>
        <div class="story-text">
          <a :href="withBase(currentStory.link)" class="story-title">
            {{ currentStory.title }}
          </a>
          <div class="story-author">{{ t.stories?.authorPrefix || 'by' }} {{ currentStory.author }}</div>
        </div>
      </div>
      
      <!-- Indicators -->
      <div class="indicators">
        <button 
          v-for="(_, index) in tStories" 
          :key="index"
          class="indicator-dot"
          :class="{ active: index === currentIndex }"
          :aria-label="t.stories?.ui?.selectLabel || 'Select story'"
          @click="setIndex(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vibe-stories-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px 28px;
  text-align: center;
}

.section-header {
  margin-bottom: 24px;
}

.section-headline {
  font-size: 60px;
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.034em;
  margin-bottom: 10px;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC', sans-serif;
}

.dark .section-headline {
  color: #f5f5f7;
}

.highlight {
  background: linear-gradient(120deg, #0066cc, #3399ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark .highlight {
  background: linear-gradient(120deg, #2997ff, #66b3ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-sub {
  font-size: 19px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #6e6e73;
  max-width: 760px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'PingFang SC', sans-serif;
}

.dark .section-sub {
  color: #a1a1a6;
}

.laptop-wrapper {
  position: relative;
  width: 100%;
  margin-top: 0;
}

.laptop-container {
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  aspect-ratio: 4608 / 2675;
}

.laptop-frame {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
}

.dark .laptop-frame {
  filter: drop-shadow(0 25px 25px rgb(255 255 255 / 0.05));
}

.screen-content {
  position: absolute;
  z-index: 1;
  top: var(--screen-top);
  left: var(--screen-left);
  width: var(--screen-width);
  height: var(--screen-height);
  border-radius: var(--screen-radius);
  background: #0b0b0f;
  overflow: hidden;
  perspective: 1000px;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);
  isolation: isolate;
}

.screen-link {
  position: absolute;
  inset: 0;
  display: block;
  background: transparent;
  overflow: hidden;
  border-radius: inherit;
}

.screen-link:focus,
.screen-link:focus-visible {
  outline: none;
}

.screen-image-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
}

.screen-image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
  object-position: center;
}

/* Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Nav Buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.laptop-wrapper:hover .nav-btn {
  opacity: 1;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn.prev {
  left: 20px;
}

.nav-btn.next {
  right: 20px;
}

@media (max-width: 768px) {
  .nav-btn {
    opacity: 1;
    width: 36px;
    height: 36px;
  }
  .nav-btn.prev { left: 10px; }
  .nav-btn.next { right: 10px; }

  .section-headline { font-size: 42px; }
  .section-sub { font-size: 17px; }
  .laptop-container { max-width: 100%; }
  .story-info {
    margin-top: 18px;
    gap: 12px;
  }
}

/* Story Info */
.story-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 22px;
}

.story-avatar {
  font-size: 48px;
  line-height: 1;
  background: #f5f5f7;
  border-radius: 50%;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.dark .story-avatar {
  background: #2c2c2e;
}

.story-text {
  text-align: left;
}

.story-title {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  text-decoration: none;
  margin-bottom: 4px;
  transition: color 0.2s;
}

.dark .story-title {
  color: #f5f5f7;
}

.story-title:hover {
  color: #0066cc;
}

.dark .story-title:hover {
  color: #2997ff;
}

.story-author {
  font-size: 15px;
  color: #86868b;
}

/* Indicators */
.indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d2d2d7;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark .indicator-dot {
  background: #424245;
}

.indicator-dot:hover {
  background: #86868b;
}

.indicator-dot.active {
  width: 24px;
  border-radius: 4px;
  background: #1d1d1f;
}

.dark .indicator-dot.active {
  background: #f5f5f7;
}

</style>
