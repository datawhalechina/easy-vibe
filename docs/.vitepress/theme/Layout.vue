<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute, withBase } from 'vitepress'
import TextType from './components/TextType.vue'
import GitHubStars from './components/GitHubStars.vue'
import PageSlidesButton from './components/PageSlidesButton.vue'
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import ReadingProgress from './components/ReadingProgress.vue'
import { Setting } from '@element-plus/icons-vue'
import easyVibePaths from './data/easyVibePaths.json'

const { frontmatter } = useData()
const route = useRoute()

const openWelcomeFromWordmark = () => {
  const currentPath = window.location.pathname
  window.location.href = withBase(
    `/welcome/?next=${encodeURIComponent(currentPath)}`
  )
}

const homeTaglineTyping = {
  typingSpeed: 45,
  initialDelay: 0,
  pauseDuration: 2500,
  postDeletingDelay: 500,
  deletingSpeed: 18
}

const FONT_SIZE_STORAGE_KEY = 'ev-doc-font-size'
const LINE_HEIGHT_STORAGE_KEY = 'ev-doc-line-height'
const MIN_FONT_SIZE = 12
const MAX_FONT_SIZE = 18
const DEFAULT_FONT_SIZE = 14
const MIN_LINE_HEIGHT = 1.25
const MAX_LINE_HEIGHT = 1.8
const DEFAULT_LINE_HEIGHT = 1.65

const fontSize = ref(DEFAULT_FONT_SIZE)
const lineHeight = ref(DEFAULT_LINE_HEIGHT)
const isHydrated = ref(false)

const clampFontSize = (value) => {
  if (value === null || value === undefined || value === '')
    return DEFAULT_FONT_SIZE
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return DEFAULT_FONT_SIZE
  return Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, numeric))
}

const clampLineHeight = (value) => {
  if (value === null || value === undefined || value === '')
    return DEFAULT_LINE_HEIGHT
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return DEFAULT_LINE_HEIGHT
  return Math.min(MAX_LINE_HEIGHT, Math.max(MIN_LINE_HEIGHT, numeric))
}

const applyFontSize = (size) => {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty('--ev-doc-font-size', `${size}px`)
}

const applyLineHeight = (value) => {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty(
    '--ev-doc-line-height',
    String(value)
  )
}

const decreaseFontSize = () => {
  fontSize.value = clampFontSize(fontSize.value - 1)
}

const increaseFontSize = () => {
  fontSize.value = clampFontSize(fontSize.value + 1)
}

const resetFontSize = () => {
  fontSize.value = DEFAULT_FONT_SIZE
}

const resetLineHeight = () => {
  lineHeight.value = DEFAULT_LINE_HEIGHT
}

// ============================================
// 目录栏（左侧 VPSidebar）收起/展开功能
// ============================================
const SIDEBAR_COLLAPSED_KEY = 'ev-sidebar-collapsed'
const SIDEBAR_WIDTH_KEY = 'ev-sidebar-width'
const DEFAULT_SIDEBAR_WIDTH = 272
const MIN_SIDEBAR_WIDTH = 160
const MAX_SIDEBAR_WIDTH = 560
const sidebarCollapsed = ref(false)
const sidebarWidth = ref(DEFAULT_SIDEBAR_WIDTH)
const sidebarResizing = ref(false)
let sidebarResizeLeft = 0

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const getSidebarWidthBounds = () => {
  if (typeof window === 'undefined') {
    return {
      min: MIN_SIDEBAR_WIDTH,
      max: MAX_SIDEBAR_WIDTH
    }
  }
  const viewportMax = window.innerWidth - 240
  return {
    min: MIN_SIDEBAR_WIDTH,
    max: Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, viewportMax))
  }
}

const clampSidebarWidth = (value) => {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return DEFAULT_SIDEBAR_WIDTH
  const bounds = getSidebarWidthBounds()
  return Math.min(bounds.max, Math.max(bounds.min, numeric))
}

const applySidebarWidth = (width) => {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty('--vp-sidebar-width', `${width}px`)
}

const setSidebarWidth = (value, shouldPersist = true) => {
  const normalized = clampSidebarWidth(value)
  sidebarWidth.value = normalized
  applySidebarWidth(normalized)
  if (shouldPersist) {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, String(normalized))
  }
}

const getSidebarLeftBoundary = () => {
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar) {
    return sidebar.getBoundingClientRect().left
  }
  return 0
}

const updateSidebarWidthFromPointer = (clientX) => {
  const nextWidth = clientX - sidebarResizeLeft
  setSidebarWidth(nextWidth, false)
}

const handleSidebarResizeMove = (event) => {
  if (!sidebarResizing.value) return
  updateSidebarWidthFromPointer(event.clientX)
}

const stopSidebarResize = () => {
  if (!sidebarResizing.value) return
  sidebarResizing.value = false
  document.body.classList.remove('ev-sidebar-resizing')
  localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth.value))
  window.removeEventListener('pointermove', handleSidebarResizeMove)
  window.removeEventListener('pointerup', stopSidebarResize)
  window.removeEventListener('pointercancel', stopSidebarResize)
}

const startSidebarResize = (event) => {
  if (typeof window === 'undefined') return
  if (window.innerWidth < 960 || sidebarCollapsed.value) return
  event.preventDefault()
  sidebarResizeLeft = getSidebarLeftBoundary()
  sidebarResizing.value = true
  document.body.classList.add('ev-sidebar-resizing')
  updateSidebarWidthFromPointer(event.clientX)
  window.addEventListener('pointermove', handleSidebarResizeMove)
  window.addEventListener('pointerup', stopSidebarResize)
  window.addEventListener('pointercancel', stopSidebarResize)
}

const handleViewportResize = () => {
  setSidebarWidth(sidebarWidth.value, false)
}

const isHomePage = computed(() => frontmatter.value.layout === 'home')
const isWelcomePage = computed(() =>
  route.path === '/welcome/' ||
  route.path.endsWith('/welcome/') ||
  route.path.endsWith('/welcome.html')
)

onMounted(() => {
  const saved = clampFontSize(localStorage.getItem(FONT_SIZE_STORAGE_KEY))
  const savedLineHeight = clampLineHeight(
    localStorage.getItem(LINE_HEIGHT_STORAGE_KEY)
  )
  fontSize.value = saved
  lineHeight.value = savedLineHeight
  applyFontSize(saved)
  applyLineHeight(savedLineHeight)
  isHydrated.value = true

  // 恢复目录栏收起状态
  const savedCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
  if (savedCollapsed === 'true') {
    sidebarCollapsed.value = true
    document.body.classList.add('ev-sidebar-collapsed')
  }

  const savedSidebarWidth = localStorage.getItem(SIDEBAR_WIDTH_KEY)
  if (savedSidebarWidth) {
    setSidebarWidth(savedSidebarWidth, false)
  } else {
    setSidebarWidth(DEFAULT_SIDEBAR_WIDTH, false)
  }

  window.addEventListener('resize', handleViewportResize)

  initOutlineAutoScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleViewportResize)
  stopSidebarResize()
})

// ============================================
// Outline 侧边栏自动滚动跟随功能
// 当页面滚动时，自动滚动 outline 让当前激活项保持在可视区域
// ============================================
function initOutlineAutoScroll() {
  const outlineSelectors = [
    '.VPDocAsideOutline',
    '.VPTableOfContents',
    '.vitepress-doc-sidebar',
    '.sidebar-outline',
    'aside'
  ]

  const sidebarSelectors = [
    '.VPSidebar',
    '.VPDocSidebar',
    '.vitepress-doc-sidebar'
  ]

  let outlineContainer = null
  for (const selector of outlineSelectors) {
    outlineContainer = document.querySelector(selector)
    if (outlineContainer) break
  }

  if (!outlineContainer) return

  let sidebarContainer = null
  for (const selector of sidebarSelectors) {
    sidebarContainer = document.querySelector(selector)
    if (sidebarContainer) break
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target
        if (target.classList.contains('active') && target.tagName === 'A') {
          scrollOutlineToActiveItem(target)
        }
      }
    }
  })

  const sidebarObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target
        if (target.classList.contains('is-active')) {
          scrollSidebarToActiveItem(target)
        }
      }
    }
  })

  const startObserving = () => {
    const outlineContainer = document.querySelector('.VPDocAsideOutline')
    if (outlineContainer) {
      observer.observe(outlineContainer, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
      })

      const existingActive = outlineContainer.querySelector('.active')
      if (existingActive) {
        scrollOutlineToActiveItem(existingActive)
      }
    }

    if (sidebarContainer) {
      sidebarObserver.observe(sidebarContainer, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
      })

      const existingSidebarActive = sidebarContainer.querySelector('.is-active')
      if (existingSidebarActive) {
        scrollSidebarToActiveItem(existingSidebarActive)
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserving)
  } else {
    startObserving()
  }

  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  history.pushState = function (...args) {
    originalPushState.apply(this, args)
    setTimeout(startObserving, 300)
  }

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args)
    setTimeout(startObserving, 300)
  }

  window.addEventListener('popstate', () => {
    setTimeout(startObserving, 300)
  })
}

// 滚动 outline 让当前激活项保持在可视区域中心
function scrollOutlineToActiveItem(activeLink) {
  const outlineContainer = document.querySelector('.VPDocAsideOutline')
  if (!outlineContainer || !activeLink) return

  const containerRect = outlineContainer.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()

  // 计算链接相对于容器的位置
  const linkTop = linkRect.top - containerRect.top + outlineContainer.scrollTop
  const linkHeight = linkRect.height
  const containerHeight = containerRect.height

  // 判断链接是否在可视区域外
  const isAbove = linkRect.top < containerRect.top + 20
  const isBelow = linkRect.bottom > containerRect.bottom - 20

  if (isAbove || isBelow) {
    // 将激活项滚动到容器中间位置
    const targetScrollTop = linkTop - containerHeight / 2 + linkHeight / 2
    outlineContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })
  }
}

// 滚动侧边栏让当前激活项保持在可视区域中心
function scrollSidebarToActiveItem(activeItem) {
  const sidebarContainer = document.querySelector('.VPSidebar') || document.querySelector('.VPDocSidebar')
  if (!sidebarContainer || !activeItem) return

  const targetElement = activeItem.querySelector('.item') || activeItem.querySelector('a') || activeItem

  const containerRect = sidebarContainer.getBoundingClientRect()
  const targetRect = targetElement.getBoundingClientRect()

  const targetTop = targetRect.top - containerRect.top + sidebarContainer.scrollTop
  const targetHeight = targetRect.height
  const targetCenterY = targetTop + targetHeight / 2

  const isInside = targetRect.top >= containerRect.top - 20 &&
                     targetRect.bottom <= containerRect.bottom + 20

  if (!isInside) {
    const targetScrollTop = targetCenterY - containerRect.height / 2
    sidebarContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })
  }
}

watch(fontSize, (next) => {
  if (!isHydrated.value) return
  const normalized = clampFontSize(next)
  applyFontSize(normalized)
  localStorage.setItem(FONT_SIZE_STORAGE_KEY, String(normalized))
})

watch(lineHeight, (next) => {
  if (!isHydrated.value) return
  const normalized = clampLineHeight(next)
  applyLineHeight(normalized)
  localStorage.setItem(LINE_HEIGHT_STORAGE_KEY, String(normalized))
})

watch(sidebarCollapsed, (collapsed) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('ev-sidebar-collapsed', collapsed)
  localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed))
})
</script>

<template>
  <DefaultTheme.Layout>
    <template v-if="!isHomePage && !isWelcomePage" #nav-bar-title-before>
      <button
        class="ev-sidebar-nav-btn"
        type="button"
        :aria-label="sidebarCollapsed ? '展开目录' : '收起目录'"
        @click.stop.prevent="toggleSidebar"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="2" width="14" height="1.5" rx="0.75" />
          <rect x="1" y="7.25" width="14" height="1.5" rx="0.75" />
          <rect x="1" y="12.5" width="14" height="1.5" rx="0.75" />
        </svg>
      </button>
    </template>
    <template #doc-before>
      <CopyOrDownloadAsMarkdownButtons />
    </template>
    <template #nav-bar-content-after>
      <GitHubStars />
      <ClientOnly>
        <PageSlidesButton />
      </ClientOnly>
      <ClientOnly>
        <el-popover
          placement="bottom-end"
          trigger="click"
          :width="260"
        >
          <template #reference>
            <button
              class="ev-fontsize-button"
              type="button"
              aria-label="阅读设置"
              style="margin-left: 16px; padding: 0; width: 32px"
            >
              <el-icon :size="16">
                <Setting />
              </el-icon>
            </button>
          </template>
          <div class="ev-fontsize-panel">
            <div class="ev-setting-group">
              <div class="ev-setting-header">
                <div class="ev-setting-title">
                  字号
                </div>
                <div class="ev-setting-value">
                  {{ fontSize }}px
                </div>
              </div>
              <div class="ev-fontsize-actions">
                <button
                  class="ev-fontsize-action"
                  type="button"
                  @click="decreaseFontSize"
                >
                  A-
                </button>
                <button
                  class="ev-fontsize-action"
                  type="button"
                  @click="resetFontSize"
                >
                  默认
                </button>
                <button
                  class="ev-fontsize-action"
                  type="button"
                  @click="increaseFontSize"
                >
                  A+
                </button>
              </div>
              <el-slider
                v-model="fontSize"
                :min="MIN_FONT_SIZE"
                :max="MAX_FONT_SIZE"
                :step="1"
              />
            </div>

            <div class="ev-setting-group">
              <div class="ev-setting-header">
                <div class="ev-setting-title">
                  行距
                </div>
                <div class="ev-setting-value">
                  {{ lineHeight.toFixed(2) }}
                </div>
              </div>
              <div class="ev-fontsize-actions">
                <button
                  class="ev-fontsize-action"
                  type="button"
                  @click="resetLineHeight"
                >
                  默认
                </button>
                <button
                  class="ev-fontsize-action"
                  type="button"
                  @click="lineHeight = clampLineHeight(lineHeight - 0.05)"
                >
                  更紧
                </button>
                <button
                  class="ev-fontsize-action"
                  type="button"
                  @click="lineHeight = clampLineHeight(lineHeight + 0.05)"
                >
                  更松
                </button>
              </div>
              <el-slider
                v-model="lineHeight"
                :min="MIN_LINE_HEIGHT"
                :max="MAX_LINE_HEIGHT"
                :step="0.05"
              />
            </div>
          </div>
        </el-popover>
      </ClientOnly>
    </template>
    <template #home-hero-info-before>
      <button
        v-if="frontmatter.layout === 'home'"
        class="vp-home-wordmark"
        type="button"
        aria-label="打开欢迎页"
        @click="openWelcomeFromWordmark"
      >
        <svg
          viewBox="0 0 460 220"
          class="vp-home-wordmark-svg"
        >
          <defs>
            <linearGradient
              id="home-hero-ocean"
              x1="0"
              y1="0"
              x2="460"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stop-color="#06b6d4" />
              <stop offset="50%" stop-color="#0ea5e9" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            v-for="(path, index) in easyVibePaths"
            :key="index"
            :d="path"
            class="vp-home-wordmark-path"
          />
        </svg>
      </button>
    </template>
    <template #home-hero-info-after>
      <div
        v-if="
          frontmatter.layout === 'home' &&
            (frontmatter.hero?.tagline || frontmatter.hero?.typingTagline)
        "
        class="vp-typed-tagline"
      >
        <ClientOnly>
          <TextType
            :text="frontmatter.hero.typingTagline || frontmatter.hero.tagline"
            v-bind="homeTaglineTyping"
            :loop="true"
          />
        </ClientOnly>
      </div>
    </template>
  </DefaultTheme.Layout>
  <ClientOnly>
    <div
      v-if="!isHomePage && !isWelcomePage"
      class="ev-sidebar-hover-area"
      :class="{ collapsed: sidebarCollapsed, resizing: sidebarResizing }"
    >
      <div
        v-if="!sidebarCollapsed"
        class="ev-sidebar-resizer"
        role="separator"
        aria-orientation="vertical"
        @pointerdown="startSidebarResize"
      />
      <button
        class="ev-sidebar-toggle-btn"
        :class="{ collapsed: sidebarCollapsed }"
        type="button"
        :aria-label="sidebarCollapsed ? '展开目录' : '收起目录'"
        @click="toggleSidebar"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path v-if="!sidebarCollapsed" d="M8 1L3 6l5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <path v-else d="M4 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </ClientOnly>
  <ClientOnly>
    <ReadingProgress v-if="!isHomePage && !isWelcomePage" />
  </ClientOnly>  
</template>

<style>
.VPNavBarTitle .VPImage.logo,
.VPNavBarTitle .logo {
  width: 84px !important;
  height: 40px !important;
  max-width: 84px !important;
  max-height: 40px !important;
  object-fit: contain;
  display: block;
}

/* 隐藏默认的 tagline，因为我们用打字机效果替代了它 */
.VPHomeHero .tagline {
  display: none !important;
}

/* 调整打字机容器的样式，使其看起来像原来的 tagline */
.vp-typed-tagline {
  padding-top: 0;
  margin-top: 8px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
  min-height: 28px;
  display: flex;
  /* 居中对齐 */
  text-align: center;
  justify-content: center;
}

/* 强制 HomeHero 内容居中 */
.VPHomeHero .container {
  text-align: center;
}
.VPHomeHero .main {
  margin: -18px auto 0;
}
.VPHomeHero .name,
.VPHomeHero .text {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.VPHomeHero .name {
  display: none !important;
}
.VPHomeHero .text {
  color: var(--vp-c-text-1) !important;
}
.VPHomeHero .actions {
  justify-content: center;
  margin-top: 20px;
}
.vp-home-wordmark {
  display: flex;
  justify-content: center;
  margin-top: -12px;
  margin-bottom: 18px;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.vp-home-wordmark-svg {
  width: min(380px, 52vw);
  height: auto;
  filter: none;
}
.vp-home-wordmark-path {
  fill: url(#home-hero-ocean);
  stroke: none;
}

@media (min-width: 640px) {
  .vp-typed-tagline {
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .vp-typed-tagline {
    line-height: 36px;
    font-size: 24px;
  }
}

.ev-fontsize-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
}

.ev-fontsize-button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.ev-fontsize-panel {
  display: grid;
  gap: 12px;
}

.ev-setting-group {
  display: grid;
  gap: 8px;
}

.ev-setting-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.ev-setting-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ev-setting-value {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.ev-fontsize-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.ev-fontsize-action {
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
}

.ev-fontsize-action:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* ============================================
   目录栏收起/展开
   ============================================ */

/* 导航栏左侧的收起按钮 */
.ev-sidebar-nav-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  margin-right: 4px;
  flex-shrink: 0;
}
.ev-sidebar-nav-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

/* 左侧边缘悬停区域 */
.ev-sidebar-hover-area {
  display: none;
  position: fixed;
  top: 0;
  --ev-sidebar-divider-offset: 16px;
  left: calc(var(--vp-sidebar-width, 272px) - var(--ev-sidebar-divider-offset));
  width: 24px;
  height: 100vh;
  z-index: 30;
}
.ev-sidebar-hover-area.collapsed {
  left: 0;
}
.ev-sidebar-resizer {
  position: absolute;
  left: var(--ev-sidebar-divider-offset);
  top: 0;
  width: 2px;
  height: 100%;
  background: var(--vp-c-divider);
  opacity: 0;
  cursor: col-resize;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}
.ev-sidebar-hover-area:hover .ev-sidebar-resizer,
.ev-sidebar-hover-area.resizing .ev-sidebar-resizer {
  opacity: 1;
  background: var(--vp-c-brand-1);
}

/* 分界线上的收起按钮 */
.ev-sidebar-toggle-btn {
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(var(--ev-sidebar-divider-offset) - 4px);
  width: 18px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0 4px 4px 0;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease;
  opacity: 0;
  animation: ev-sidebar-btn-flash 2.5s ease-out 0.5s;
}
@keyframes ev-sidebar-btn-flash {
  0% { opacity: 0; }
  20% { opacity: 0.7; }
  60% { opacity: 0.7; }
  100% { opacity: 0; }
}
.ev-sidebar-toggle-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  opacity: 1;
  animation: none;
}
.ev-sidebar-hover-area:hover .ev-sidebar-toggle-btn {
  opacity: 0.7;
  animation: none;
}
.ev-sidebar-hover-area.resizing .ev-sidebar-toggle-btn {
  opacity: 1;
}

/* 桌面端才显示按钮 */
@media (min-width: 960px) {
  .ev-sidebar-nav-btn {
    display: inline-flex;
  }
  .ev-sidebar-hover-area {
    display: block;
  }
}

/* @1440px 时分界线按钮跟随侧边栏实际宽度 */
@media (min-width: 1440px) {
  .ev-sidebar-hover-area:not(.collapsed) {
    left: calc((100% - (var(--vp-layout-max-width, 1440px) - 64px)) / 2 + var(--vp-sidebar-width, 272px) - var(--ev-sidebar-divider-offset));
  }
}

/* ---- 收起状态下的 CSS 覆盖 ---- */

/* 隐藏侧边栏 — 仅桌面端，避免覆盖移动端的汉堡菜单 */
@media (min-width: 960px) {
  .ev-sidebar-collapsed .VPSidebar {
    display: none !important;
  }
}

/* 修复侧边栏收起后导航栏标题 border-bottom 重叠问题 */
.ev-sidebar-collapsed .VPNavBar.has-sidebar .VPNavBarTitle .title {
  border-bottom-color: transparent !important;
}

/* 内容区域填满页面 */
@media (min-width: 960px) {
  .ev-sidebar-collapsed .VPContent.has-sidebar {
    padding-left: 0 !important;
  }
  .ev-sidebar-collapsed .VPNavBar.has-sidebar .content {
    padding-left: 0 !important;
  }
  .ev-sidebar-collapsed .VPNavBar.has-sidebar .divider {
    padding-left: 0 !important;
  }
}

@media (min-width: 1440px) {
  .ev-sidebar-collapsed .VPContent.has-sidebar {
    padding-left: calc((100% - var(--vp-layout-max-width, 1440px)) / 2) !important;
  }
  .ev-sidebar-collapsed .VPNavBar.has-sidebar .content {
    padding-left: calc((100% - var(--vp-layout-max-width, 1440px)) / 2) !important;
  }
  .ev-sidebar-collapsed .VPNavBar.has-sidebar .divider {
    padding-left: calc((100% - var(--vp-layout-max-width, 1440px)) / 2) !important;
  }
}

/* 收起/展开过渡动画 */
.VPSidebar,
.VPContent.has-sidebar,
.VPNavBar.has-sidebar .content,
.VPNavBar.has-sidebar .divider {
  transition: padding-left 0.3s ease, transform 0.3s ease;
}

.ev-sidebar-resizing,
.ev-sidebar-resizing * {
  cursor: col-resize !important;
  user-select: none;
}

.ev-sidebar-resizing .VPSidebar,
.ev-sidebar-resizing .VPContent.has-sidebar,
.ev-sidebar-resizing .VPNavBar.has-sidebar .content,
.ev-sidebar-resizing .VPNavBar.has-sidebar .divider {
  transition: none !important;
}
</style>
