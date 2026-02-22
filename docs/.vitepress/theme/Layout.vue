<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import TextType from './components/TextType.vue'
import GitHubStars from './components/GitHubStars.vue'
import { onMounted, ref, watch, computed } from 'vue'
import ReadingProgress from './components/ReadingProgress.vue'
import { Setting } from '@element-plus/icons-vue'

const { frontmatter } = useData()

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
const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const isHomePage = computed(() => frontmatter.value.layout === 'home')

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

  initOutlineAutoScroll()
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
    <template v-if="!isHomePage" #nav-bar-title-before>
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
    <template #nav-bar-content-after>
      <GitHubStars />
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
      v-if="!isHomePage"
      class="ev-sidebar-hover-area"
      :class="{ collapsed: sidebarCollapsed }"
    >
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
    <ReadingProgress />
  </ClientOnly>  
</template>

<style>
/* 隐藏默认的 tagline，因为我们用打字机效果替代了它 */
.VPHomeHero .tagline {
  display: none !important;
}

/* 调整打字机容器的样式，使其看起来像原来的 tagline */
.vp-typed-tagline {
  padding-top: 8px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: #000000;
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
  margin: 0 auto;
}
.VPHomeHero .name,
.VPHomeHero .text {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.VPHomeHero .text {
  color: #000000 !important;
}
.VPHomeHero .actions {
  justify-content: center;
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
  left: calc(var(--vp-sidebar-width, 272px) - 16px);
  width: 24px;
  height: 100vh;
  z-index: 30;
}
.ev-sidebar-hover-area.collapsed {
  left: 0;
}

/* 分界线上的收起按钮 */
.ev-sidebar-toggle-btn {
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 6px;
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
    left: calc((100% - (var(--vp-layout-max-width, 1440px) - 64px)) / 2 + var(--vp-sidebar-width, 272px) - 32px - 16px);
  }
}

/* ---- 收起状态下的 CSS 覆盖 ---- */

/* 隐藏侧边栏 */
.ev-sidebar-collapsed .VPSidebar {
  display: none !important;
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
</style>
