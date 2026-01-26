<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import TextType from './components/TextType.vue'
import GitHubStars from './components/GitHubStars.vue'
import { onMounted, ref, watch } from 'vue'
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
})

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
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <GitHubStars />
      <ClientOnly>
        <el-popover placement="bottom-end" trigger="click" :width="260">
          <template #reference>
            <button
              class="ev-fontsize-button"
              type="button"
              aria-label="阅读设置"
              style="margin-left: 16px; padding: 0; width: 32px"
            >
              <el-icon :size="16"><Setting /></el-icon>
            </button>
          </template>
          <div class="ev-fontsize-panel">
            <div class="ev-setting-group">
              <div class="ev-setting-header">
                <div class="ev-setting-title">字号</div>
                <div class="ev-setting-value">{{ fontSize }}px</div>
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
                <div class="ev-setting-title">行距</div>
                <div class="ev-setting-value">{{ lineHeight.toFixed(2) }}</div>
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
        v-if="frontmatter.layout === 'home' && (frontmatter.hero?.tagline || frontmatter.hero?.typingTagline)"
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
</style>
