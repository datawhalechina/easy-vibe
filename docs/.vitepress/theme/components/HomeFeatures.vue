<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, withBase, useData } from 'vitepress'
import GitHubStars from './GitHubStars.vue'
import VibeStories from './VibeStories.vue'
import { provide } from 'vue'
import { i18n } from './home/HomeI18n'
import { locales } from './home/HomeData'
import HomeStage1 from './home/HomeStage1.vue'
import HomeStage2 from './home/HomeStage2.vue'
import HomeStage3 from './home/HomeStage3.vue'
import HomeAppendix from './home/HomeAppendix.vue'
import HomeAppleFooter from './home/HomeAppleFooter.vue'

const router = useRouter()
const { site, lang } = useData()
const activeTab = ref('home')
const showLangMenu = ref(false)
const topPromoProgress = ref(1)
const topPromoDismissed = ref(false)
const topPromoIntroProgress = ref(0)
const topPromoColorProgress = ref(0)
let topPromoIntroRaf = 0
let topPromoColorRaf = 0
let topPromoColorTimer = 0
const WELCOME_SEEN_KEY = 'easy-vibe-welcome-seen'

const vibeStoriesSection = ref(null)

const normalizeLocaleCode = (value) => {
  const code = value ? value.toLowerCase() : 'zh-cn'
  const locale = locales.find(
    (item) =>
      item.code === code || item.code.replace('-', '') === code.replace('-', '')
  )
  if (locale) return locale.code
  if (code === 'en-us') return 'en'
  return 'zh-cn'
}

const normalizeLocaleRelativePath = (value = '') =>
  value
    .replace(/^\//, '')
    .replace(/\.html$/, '')
    .replace(/\/index$/, '')
    .replace(/\/$/, '')

const hasBuiltLocalePath = (locale, relativePath = '') => {
  const cleanPath = normalizeLocaleRelativePath(relativePath)
  if (!cleanPath) return true
  if (typeof window === 'undefined') return true
  const hashMap = window.__VP_HASH_MAP__ || {}
  const mdPath = `${locale}/${cleanPath}.md`.replace(/\//g, '_')
  const indexMdPath = `${locale}/${cleanPath}/index.md`.replace(/\//g, '_')
  return Boolean(hashMap[mdPath] || hashMap[indexMdPath])
}

const resolveSafeLocalePath = (locale, relativePath = '') => {
  const cleanPath = normalizeLocaleRelativePath(relativePath)
  if (!cleanPath || hasBuiltLocalePath(locale, cleanPath)) {
    return `/${locale}/${cleanPath ? `${cleanPath}.html` : ''}`
  }

  return `/${locale}/`
}

const t = computed(() => {
  const code = normalizeLocaleCode(lang.value)
  const result = i18n[code] || i18n['en']
  result._locale = code
  return result
})

provide('t', t)

const isCjkLocale = computed(() => {
  const code = normalizeLocaleCode(lang.value)
  if (['zh-cn', 'zh-tw', 'ja-jp', 'ko-kr'].includes(code)) {
    return true
  }
  const path = router.route.path.toLowerCase()
  return /^\/(zh-cn|zh-tw|ja-jp|ko-kr)\//.test(path)
})

const topPromo = computed(() => {
  const code = normalizeLocaleCode(lang.value)
  const isChinese = code === 'zh-cn' || code === 'zh-tw'
  return {
    text: isChinese
      ? '用 Easy-Vibe 构建你的第一个 AI 应用，最快当天可上线原型。'
      : 'Build your first AI app with Easy-Vibe and ship a working prototype fast.',
    cta: isChinese ? '开始学习 ›' : 'Start learning ›',
    link: `/${code}/stage-1/learning-map/`
  }
})

const toggleLangMenu = () => {
  showLangMenu.value = !showLangMenu.value
}

const updateHash = (id) => {
  const targetHash = id === 'home' ? '#home' : `#${id}`
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const nextUrl = `${window.location.pathname}${window.location.search}${targetHash}`
  if (currentUrl !== nextUrl) {
    window.history.replaceState(null, '', nextUrl)
  }
}

const syncTopPromoWithHash = () => {
  const rawHash = window.location.hash.replace(/^#/, '')
  const targetId = rawHash || 'home'
  if (targetId === 'home') {
    topPromoDismissed.value = false
    topPromoProgress.value = 1
    return
  }
  topPromoDismissed.value = true
  topPromoProgress.value = 0
}

const changeLang = (targetLocale) => {
  const currentPath = router.route.path
  const currentLocale = locales.find((l) =>
    currentPath.startsWith(`/${l.code}/`)
  )

  let newPath = `/${targetLocale}/`
  if (currentLocale) {
    const relativePath = normalizeLocaleRelativePath(
      currentPath.slice(currentLocale.code.length + 2)
    )
    newPath = resolveSafeLocalePath(targetLocale, relativePath)
  }

  const hash = window.location.hash || ''
  window.location.assign(withBase(`${newPath}${hash}`))
  showLangMenu.value = false
}

const scrollTo = (id) => {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeTab.value = 'home'
    updateHash('home')
    syncTopPromoWithHash()
    updateTopPromoVisibility()
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const navHeight = 48
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const extraOffset = id === 'vibe-stories' ? 20 : 40
    const offset = elementPosition - navHeight - extraOffset
    window.scrollTo({ top: offset, behavior: 'smooth' })
    activeTab.value = id
    updateHash(id)
    syncTopPromoWithHash()
  }
}

const scrollToHashTarget = (behavior = 'auto') => {
  const rawHash = window.location.hash.replace(/^#/, '')
  const targetId = rawHash || 'home'
  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior })
    activeTab.value = 'home'
    syncTopPromoWithHash()
    updateTopPromoVisibility()
    return
  }
  const el = document.getElementById(targetId)
  if (el) {
    const navHeight = 48
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const extraOffset = targetId === 'vibe-stories' ? 20 : 40
    const offset = elementPosition - navHeight - extraOffset
    window.scrollTo({ top: offset, behavior })
    activeTab.value = targetId
    syncTopPromoWithHash()
  }
}

const closeLangMenu = (e) => {
  if (!e.target.closest('.lang-switch-wrapper')) {
    showLangMenu.value = false
  }
}

const updateTopPromoVisibility = () => {
  if (topPromoDismissed.value) {
    topPromoProgress.value = 0
    return
  }
  if (!vibeStoriesSection.value) {
    topPromoProgress.value = 1
    return
  }
  const navHeight = 44
  const sectionTop =
    vibeStoriesSection.value.getBoundingClientRect().top + window.pageYOffset
  const endY = sectionTop - navHeight
  const startY = endY - 96
  const scrollY = window.pageYOffset
  if (scrollY <= startY) {
    topPromoProgress.value = 1
    return
  }
  if (scrollY >= endY) {
    topPromoProgress.value = 0
    topPromoDismissed.value = true
    return
  }
  topPromoProgress.value = (endY - scrollY) / (endY - startY)
}

const topPromoStyle = computed(() => {
  const scrollProgress = topPromoProgress.value
  const introProgress = topPromoIntroProgress.value
  const colorProgress = topPromoColorProgress.value
  const progress = scrollProgress * introProgress
  const scrollOffset = -100 * (1 - scrollProgress)
  const startTextColor = { r: 255, g: 255, b: 255 }
  const endTextColor = { r: 29, g: 29, b: 31 }
  const startBgColor = { r: 0, g: 113, b: 227 }
  const endBgColor = { r: 245, g: 245, b: 247 }
  const startLinkColor = { r: 255, g: 255, b: 255 }
  const endLinkColor = { r: 0, g: 102, b: 204 }
  const textColor = `rgb(${Math.round(startTextColor.r + (endTextColor.r - startTextColor.r) * colorProgress)}, ${Math.round(startTextColor.g + (endTextColor.g - startTextColor.g) * colorProgress)}, ${Math.round(startTextColor.b + (endTextColor.b - startTextColor.b) * colorProgress)})`
  const bgColor = `rgb(${Math.round(startBgColor.r + (endBgColor.r - startBgColor.r) * colorProgress)}, ${Math.round(startBgColor.g + (endBgColor.g - startBgColor.g) * colorProgress)}, ${Math.round(startBgColor.b + (endBgColor.b - startBgColor.b) * colorProgress)})`
  const linkColor = `rgb(${Math.round(startLinkColor.r + (endLinkColor.r - startLinkColor.r) * colorProgress)}, ${Math.round(startLinkColor.g + (endLinkColor.g - startLinkColor.g) * colorProgress)}, ${Math.round(startLinkColor.b + (endLinkColor.b - startLinkColor.b) * colorProgress)})`
  return {
    opacity: progress,
    transform: `translateY(${scrollOffset}%)`,
    maxHeight: `${30 * progress}px`,
    backgroundColor: bgColor,
    color: textColor,
    '--top-promo-link-color': linkColor,
    pointerEvents: progress < 0.02 ? 'none' : 'auto'
  }
})

const resolveFooterHref = (link) => {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link
  }
  return withBase(link)
}

onMounted(() => {
  const introDuration = 1800
  const colorDelay = 500
  const colorDuration = 1800
  const introStart = performance.now()
  const stepTopPromoIntro = (now) => {
    const raw = Math.min(1, (now - introStart) / introDuration)
    const eased = 1 - Math.pow(1 - raw, 3)
    topPromoIntroProgress.value = eased
    if (raw < 1) {
      topPromoIntroRaf = window.requestAnimationFrame(stepTopPromoIntro)
      return
    }
    topPromoColorTimer = window.setTimeout(() => {
      const colorStart = performance.now()
      const stepTopPromoColor = (time) => {
        const colorRaw = Math.min(1, (time - colorStart) / colorDuration)
        const colorEased = 1 - Math.pow(1 - colorRaw, 3)
        topPromoColorProgress.value = colorEased
        if (colorRaw < 1) {
          topPromoColorRaf = window.requestAnimationFrame(stepTopPromoColor)
        }
      }
      topPromoColorRaf = window.requestAnimationFrame(stepTopPromoColor)
    }, colorDelay)
  }
  topPromoIntroRaf = window.requestAnimationFrame(stepTopPromoIntro)

  const currentPath = window.location.pathname
  const basePath = site.value.base || '/'
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
  const normalizedPath = currentPath.endsWith('/')
    ? currentPath
    : `${currentPath}/`
  const localeHomeSuffixes = [
    '/zh-cn/',
    '/en/',
    '/zh-tw/',
    '/ja-jp/',
    '/ko-kr/',
    '/es-es/',
    '/fr-fr/',
    '/de-de/',
    '/ar-sa/',
    '/vi-vn/'
  ]
  const isLocaleHome = localeHomeSuffixes.some(
    (suffix) =>
      currentPath.endsWith(suffix) ||
      currentPath.endsWith(`${suffix}index.html`)
  )
  const isRootHome =
    normalizedPath === normalizedBase ||
    currentPath === `${normalizedBase}index.html`
  if (isRootHome && !isLocaleHome) {
    const hasSeenWelcome = window.localStorage.getItem(WELCOME_SEEN_KEY) === '1'
    if (!hasSeenWelcome) {
      window.location.assign(
        withBase(`/welcome/?next=${encodeURIComponent(currentPath)}`)
      )
      return
    }
  }

  document.addEventListener('click', closeLangMenu)
  syncTopPromoWithHash()
  window.setTimeout(() => {
    scrollToHashTarget('auto')
  }, 0)
  updateTopPromoVisibility()
  window.addEventListener('scroll', updateTopPromoVisibility, { passive: true })
  window.addEventListener('resize', updateTopPromoVisibility)
  window.addEventListener('hashchange', scrollToHashTarget)
})

onUnmounted(() => {
  if (topPromoIntroRaf) {
    window.cancelAnimationFrame(topPromoIntroRaf)
    topPromoIntroRaf = 0
  }
  if (topPromoColorRaf) {
    window.cancelAnimationFrame(topPromoColorRaf)
    topPromoColorRaf = 0
  }
  if (topPromoColorTimer) {
    window.clearTimeout(topPromoColorTimer)
    topPromoColorTimer = 0
  }
  document.removeEventListener('click', closeLangMenu)
  window.removeEventListener('scroll', updateTopPromoVisibility)
  window.removeEventListener('resize', updateTopPromoVisibility)
  window.removeEventListener('hashchange', scrollToHashTarget)
})
</script>

<template>
  <div class="apple-container">
    <nav class="sticky-nav glass">
      <div class="nav-content">
        <div class="nav-cluster">
          <div
            class="nav-title"
            :aria-label="t.nav.title"
          >
            <img
              class="nav-title-logo no-viewer"
              :src="withBase('/assets/easy-vibe-logo-hd.svg')"
              :alt="t.nav.title"
              width="64"
              height="30"
              draggable="false"
            >
          </div>
          <div class="nav-links">
            <button
              :class="{ active: activeTab === 'home' }"
              class="nav-link-item"
              @click="scrollTo('home')"
            >
              {{ t.nav.home }}
            </button>
            <button
              :class="{ active: activeTab === 'vibe-stories' }"
              class="nav-link-item"
              @click="scrollTo('vibe-stories')"
            >
              {{ t.nav.stories || 'Vibe 故事' }}
            </button>
            <button
              :class="{ active: activeTab === 'pm' }"
              class="nav-link-item"
              @click="scrollTo('pm')"
            >
              {{ t.nav.pm }}
            </button>
            <button
              :class="{ active: activeTab === 'junior' }"
              class="nav-link-item"
              @click="scrollTo('junior')"
            >
              {{ t.nav.junior }}
            </button>
            <button
              :class="{ active: activeTab === 'senior' }"
              class="nav-link-item"
              @click="scrollTo('senior')"
            >
              {{ t.nav.senior }}
            </button>
            <button
              :class="{ active: activeTab === 'appendix' }"
              class="nav-link-item"
              @click="scrollTo('appendix')"
            >
              {{ t.nav.appendix }}
            </button>
          </div>
          <div class="nav-action">
            <div class="nav-icons">
              <div class="lang-switch-wrapper">
                <button
                  type="button"
                  class="button"
                  aria-haspopup="true"
                  :aria-expanded="showLangMenu"
                  aria-label="Change language"
                  @click.stop="toggleLangMenu"
                >
                  <span class="text">
                    <span class="vpi-languages option-icon" />
                    <span class="vpi-chevron-down text-icon" />
                  </span>
                </button>
                <div
                  v-if="showLangMenu"
                  class="lang-dropdown glass"
                >
                  <button
                    v-for="locale in locales"
                    :key="locale.code"
                    class="lang-item"
                    @click="changeLang(locale.code)"
                  >
                    {{ locale.text }}
                  </button>
                </div>
              </div>
              <GitHubStars class="nav-github-stars" />
            </div>
            <a
              class="buy-btn"
              :href="withBase(t.stage1.cards[0].link)"
            >{{ t.footer.btn }}</a>
          </div>
        </div>
      </div>
      <div
        class="nav-promo"
        :style="topPromoStyle"
      >
        <span>{{ topPromo.text }}</span>
        <a :href="resolveFooterHref(topPromo.link)">{{ topPromo.cta }}</a>
      </div>
    </nav>

    <div
      id="home"
      style="height: 0"
    />

    <section
      id="vibe-stories"
      ref="vibeStoriesSection"
      class="section-container"
    >
      <VibeStories />
    </section>

    <div class="section-band section-band-learning">
      <HomeStage1 />
      <HomeStage2 />
    </div>

    <HomeStage3 />
    <HomeAppendix />
    <HomeAppleFooter :is-cjk-locale="isCjkLocale" />
  </div>
</template>

<style scoped>
.apple-container {
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'PingFang SC',
    'Helvetica Neue', sans-serif;
  color: var(--vp-c-text-1);
  background: transparent;
}

#vibe-stories,
#vibe-stories:focus,
#vibe-stories:focus-visible,
#vibe-stories:target {
  outline: none !important;
  box-shadow: none !important;
}

a {
  text-decoration: none;
  color: inherit;
}

:is(.buy-btn) {
  border-bottom: none !important;
  outline: none !important;
  -webkit-tap-highlight-color: transparent;
}

:is(.buy-btn):is(:hover, :focus, :focus-visible, :active) {
  border-bottom-color: transparent !important;
  text-decoration: none !important;
  outline: none !important;
}

.highlight {
  color: var(--vp-c-text-2);
}

.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid #d2d2d7;
  transition: all 0.3s ease;
  background: rgba(245, 245, 247, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

:root.dark .sticky-nav {
  background: rgba(18, 18, 20, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.nav-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 28px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.nav-cluster {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 100%;
}

.nav-title {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: default;
  display: inline-flex;
  align-items: center;
}

.nav-title-logo {
  display: block;
  max-width: 64px !important;
  max-height: 30px !important;
  height: 30px !important;
  width: 64px !important;
  min-width: 64px;
  min-height: 30px;
  object-fit: contain;
  flex: 0 0 auto;
  filter: grayscale(1) brightness(0.28) contrast(1.05);
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 0;
  white-space: nowrap;
}

.nav-links button,
.nav-link-item {
  background: none;
  border: none;
  font-size: 12px;
  color: var(--vp-c-text-1) !important;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0;
  margin: 0;
  line-height: 1;
  font-weight: 400;
  opacity: 0.76;
  text-decoration: none;
}

.nav-links button:hover,
.nav-links button.active,
.nav-link-item:hover {
  color: var(--vp-c-text-1) !important;
  opacity: 1;
}

.nav-action {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.nav-icons {
  display: flex;
  gap: 10px;
  align-items: center;
}

:deep(.nav-github-stars) {
  display: flex;
  align-items: center;
}

:deep(.nav-github-stars .github-stars-link) {
  color: var(--vp-c-text-1) !important;
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

:deep(.nav-github-stars .github-stars-link:hover) {
  opacity: 0.7;
}

:deep(.nav-github-stars .github-stars-wrapper) {
  padding-left: 0 !important;
}

.nav-promo {
  height: 30px;
  max-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: #1d1d1f;
  padding: 0 16px;
  overflow: hidden;
  transform-origin: top center;
  position: relative;
  z-index: 1;
  will-change: transform, opacity, max-height, background-color, color;
  transition:
    transform 0.16s ease-out,
    opacity 0.16s ease-out,
    max-height 0.16s ease-out,
    background-color 0.22s ease-out,
    color 0.22s ease-out;
}

.nav-promo a {
  color: var(--top-promo-link-color, #0066cc);
  text-decoration: none;
  transition: color 0.25s ease-out;
}

.button {
  background: none;
  border: none;
  padding: 0;
  color: var(--vp-c-text-1) !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.7;
}

.button .text {
  display: flex;
  align-items: center;
  gap: 2px;
}

.button .option-icon {
  width: 20px;
  height: 20px;
  color: var(--vp-c-text-1) !important;
}

.button .text-icon {
  width: 14px;
  height: 14px;
  color: var(--vp-c-text-1) !important;
}

.lang-switch-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: -10px;
  margin-top: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 6px;
  min-width: 140px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 20;
}

.lang-item {
  text-align: left;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  transition: background 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.lang-item:hover {
  background: var(--vp-c-bg-soft);
}

.buy-btn {
  background: #0071e3;
  color: #fff !important;
  padding: 7px 16px;
  border-radius: 980px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  transition: all 0.2s ease;
}

.buy-btn:hover {
  background: #0077ed;
  transform: scale(1.02);
}

.buy-btn.large {
  padding: 12px 24px;
  font-size: 15px;
  margin-top: 20px;
  display: inline-block;
}

.section-container {
  max-width: 1280px;
  margin: 0 auto 96px;
  padding: 0 40px;
}

.section-band-learning {
  width: 100vw;
  max-width: none;
  margin: 0 calc(50% - 50vw) 96px;
  background: #f5f5f7;
  border-radius: 0;
  padding-top: 64px;
  padding-bottom: 64px;
  padding-left: max(40px, calc((100vw - 1280px) / 2 + 40px));
  padding-right: max(40px, calc((100vw - 1280px) / 2 + 40px));
}

.section-band-learning .section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
}

.section-band-learning .section-junior {
  margin-top: 72px;
}

.dark .section-band-learning {
  background: rgba(255, 255, 255, 0.03);
}

.section-header {
  margin-bottom: 44px;
}

.section-category {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 14px;
  border: none;
  padding: 0;
  color: #1d1d1f;
  letter-spacing: -0.024em;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.section-headline {
  font-size: 64px;
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.034em;
  margin-bottom: 12px;
  color: #1d1d1f;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.section-sub {
  font-size: 21px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #6e6e73;
  max-width: 760px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'PingFang SC',
    sans-serif;
}

.dark .section-category,
.dark .section-headline {
  color: var(--vp-c-text-1);
}

.dark .section-sub {
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .section-headline {
    font-size: 42px;
  }

  .nav-links {
    display: none;
  }

  .nav-promo {
    font-size: 12px;
    height: 28px;
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
  }

  .section-band-learning {
    margin-bottom: 96px;
    padding-top: 42px;
    padding-bottom: 42px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .section-band-learning .section-junior {
    margin-top: 56px;
  }
}
</style>

<style>
.VPHome {
  padding-top: 84px !important;
}
</style>
