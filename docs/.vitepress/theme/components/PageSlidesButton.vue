<script setup>
import 'reveal.js/reveal.css'

import { Close, Present } from '@element-plus/icons-vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const overlayRef = ref(null)
const revealRef = ref(null)
const slidesRef = ref(null)
const hasDocContent = ref(false)
const isOpen = ref(false)
const isPreparingSlides = ref(false)
const slideCount = ref(0)

// 这个组件只负责把当前 VitePress 文档页临时渲染为浏览器幻灯片。
// 它不修改 Markdown 源文件、路由、部署配置，也不改变页面原有阅读体验。
let deck = null
let previousBodyOverflow = ''
let openedFullscreen = false
let slideRun = 0
let openRequest = 0

const FIT_TOLERANCE = 2
const CONTENT_IMAGE_WAIT_TIMEOUT = 2500
const MIN_RENDER_FIT_ZOOM = 0.62
const MIN_OVERSIZED_BLOCK_SCALE = 0.35

const isDocPage = computed(() => {
  const layout = frontmatter.value.layout
  return layout !== 'home' && route.path !== '/welcome/' && !route.path.endsWith('/welcome/')
})

const getDocContent = () => {
  const doc = document.querySelector('.VPDoc .vp-doc')
  if (!doc) return null

  const onlyChild = doc.children.length === 1 ? doc.firstElementChild : null
  if (onlyChild?.querySelector?.('h1, h2, h3')) return onlyChild

  return doc
}

const refreshAvailability = async () => {
  await nextTick()
  hasDocContent.value = Boolean(isDocPage.value && getDocContent()?.querySelector('h1, h2, h3'))
}

const waitForContentImages = async (source) => {
  const pendingImages = Array.from(source.querySelectorAll('img')).filter((image) => !image.complete)

  if (!pendingImages.length) return

  const imageSettled = Promise.all(
    pendingImages.map((image) => {
      if (image.complete) return Promise.resolve()

      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true })
        image.addEventListener('error', resolve, { once: true })
      })
    })
  )

  const timeout = new Promise((resolve) =>
    window.setTimeout(resolve, CONTENT_IMAGE_WAIT_TIMEOUT)
  )

  await Promise.race([imageSettled, timeout])
}

const isHeading = (node, level) => node.tagName?.toLowerCase() === `h${level}`

const isPrimarySlideHeading = (node) => ['h1', 'h2', 'h3'].includes(node.tagName?.toLowerCase())

// 复制正文节点时保留表单、details、canvas 等运行时状态，避免幻灯片内容退回初始态。
const removeIds = (root) => {
  if (root.id) root.removeAttribute('id')
  root.querySelectorAll?.('[id]').forEach((node) => node.removeAttribute('id'))
}

const removeHeaderAnchors = (root) => {
  root
    .querySelectorAll?.('a.header-anchor, a[aria-label^="Permalink"]')
    .forEach((node) => node.remove())
}

const createContinuationHeading = (heading) => {
  if (!heading) return null

  const clone = heading.cloneNode(true)
  removeIds(clone)
  removeHeaderAnchors(clone)
  clone.classList.add('ev-slide-continuation-heading')

  const label = document.createElement('span')
  label.className = 'ev-slide-continuation-label'
  label.textContent = '续页'
  clone.appendChild(label)

  return clone
}

const syncClonedState = (source, clone) => {
  const sourceNodes = [source, ...(source.querySelectorAll?.('*') ?? [])]
  const clonedNodes = [clone, ...(clone.querySelectorAll?.('*') ?? [])]

  sourceNodes.forEach((sourceNode, index) => {
    const clonedNode = clonedNodes[index]
    if (!clonedNode) return

    const tagName = sourceNode.tagName?.toLowerCase()

    if (tagName === 'canvas') {
      clonedNode.width = sourceNode.width
      clonedNode.height = sourceNode.height

      try {
        clonedNode.getContext?.('2d')?.drawImage(sourceNode, 0, 0)
      } catch {
        // Some canvases are tainted or WebGL-backed; keep the structural clone in those cases.
      }
      return
    }

    if (tagName === 'input') {
      if (sourceNode.type === 'checkbox' || sourceNode.type === 'radio') {
        clonedNode.checked = sourceNode.checked
      } else {
        clonedNode.value = sourceNode.value
      }
      return
    }

    if (tagName === 'textarea' || tagName === 'select') {
      clonedNode.value = sourceNode.value
      return
    }

    if (tagName === 'details') {
      clonedNode.open = sourceNode.open
    }
  })
}

const cloneContentNode = (node, options = {}) => {
  const clone = node.cloneNode(true)
  syncClonedState(node, clone)
  if (options.stripIds) removeIds(clone)
  return clone
}

const createMeasuredClone = (node) => cloneContentNode(node, { stripIds: true })

const createMeasureContext = (size) => {
  const container = document.createElement('div')
  container.className = 'ev-page-slides ev-slide-measure'
  container.style.width = `${size.width}px`
  container.style.height = `${size.height}px`

  const page = document.createElement('article')
  page.className = 'ev-slide-page vp-doc'
  container.appendChild(page)
  document.body.appendChild(container)

  return {
    container,
    page,
    destroy: () => container.remove()
  }
}

const hasGeneratedVisual = (nodes) =>
  nodes.some((node) => node.classList?.contains('ev-slide-visual-card'))

const hasVisualMedia = (nodes) =>
  nodes.some((node) => {
    const tagName = node.tagName?.toLowerCase()
    if (['img', 'video', 'canvas', 'svg', 'table', 'pre'].includes(tagName)) return true
    return Boolean(node.querySelector?.('img, video, canvas, svg, table, pre'))
  })

const getSlideTextLength = (nodes) =>
  nodes.reduce((total, node) => total + (node.textContent || '').trim().length, 0)

const renderMeasurePage = (measureContext, nodes) => {
  measureContext.page.classList.toggle('ev-slide-page--with-visual', hasGeneratedVisual(nodes))
  measureContext.page.replaceChildren(...nodes.map(createMeasuredClone))
}

const doesPageFit = (measureContext, nodes) => {
  renderMeasurePage(measureContext, nodes)

  return (
    measureContext.page.scrollHeight <= measureContext.page.clientHeight + FIT_TOLERANCE &&
    measureContext.page.scrollWidth <= measureContext.page.clientWidth + FIT_TOLERANCE
  )
}

const splitListNode = (node) => {
  const children = Array.from(node.children)
  if (children.length <= 1) return [node]

  return children.map((child) => {
    const list = node.cloneNode(false)
    list.appendChild(cloneContentNode(child))
    return list
  })
}

const splitTableNode = (node) => {
  const tagName = node.tagName?.toLowerCase()
  const table = tagName === 'table' ? node : node.querySelector?.(':scope table')
  if (!table) return [node]

  const hasOnlyTableContent =
    table === node ||
    Array.from(node.children).every((child) => child === table || child.contains(table))

  if (!hasOnlyTableContent) return [node]

  const rows = Array.from(table.querySelectorAll(':scope > tbody > tr'))
  const fallbackRows = rows.length ? rows : Array.from(table.querySelectorAll(':scope > tr'))
  if (fallbackRows.length <= 1) return [node]

  const caption = table.querySelector(':scope > caption')
  const colGroups = Array.from(table.querySelectorAll(':scope > colgroup'))
  const thead = table.querySelector(':scope > thead')

  const tablePieces = fallbackRows.map((row) => {
    const tablePiece = table.cloneNode(false)
    if (caption) tablePiece.appendChild(cloneContentNode(caption))
    colGroups.forEach((colGroup) => tablePiece.appendChild(cloneContentNode(colGroup)))
    if (thead) tablePiece.appendChild(cloneContentNode(thead))

    const tbody = document.createElement('tbody')
    tbody.appendChild(cloneContentNode(row))
    tablePiece.appendChild(tbody)

    return tablePiece
  })

  if (table === node) return tablePieces

  return tablePieces.map((tablePiece) => {
    const wrapper = node.cloneNode(false)
    wrapper.appendChild(tablePiece)

    return wrapper
  })
}

const splitCodeLikeNode = (node) => {
  const pre = node.tagName?.toLowerCase() === 'pre' ? node : node.querySelector?.('pre')
  const code = pre?.querySelector('code')
  const text = code?.innerText || pre?.innerText || ''
  const lines = text.split('\n')

  if (!pre || lines.length <= 14) return [node]

  const chunks = []
  for (let index = 0; index < lines.length; index += 14) {
    const wrapper = node.tagName?.toLowerCase() === 'pre' ? null : node.cloneNode(false)
    const preClone = pre.cloneNode(false)
    const codeClone = code ? code.cloneNode(false) : document.createElement('code')

    codeClone.textContent = lines.slice(index, index + 14).join('\n')
    preClone.appendChild(codeClone)

    if (wrapper) {
      wrapper.appendChild(preClone)
      chunks.push(wrapper)
    } else {
      chunks.push(preClone)
    }
  }

  return chunks
}

const getSplitPieces = (node) => {
  const tagName = node.tagName?.toLowerCase()

  if (tagName === 'ul' || tagName === 'ol') return splitListNode(node)
  if (tagName === 'table') return splitTableNode(node)

  const codePieces = splitCodeLikeNode(node)
  if (codePieces.length > 1) return codePieces

  return [node]
}

const createScaledBlock = (node, measureContext, prefixNodes) => {
  renderMeasurePage(measureContext, [...prefixNodes, node])

  const measuredNode = measureContext.page.lastElementChild
  if (!measuredNode) return node

  const nodeRect = measuredNode.getBoundingClientRect()
  const pageRect = measureContext.page.getBoundingClientRect()
  const availableHeight = Math.max(120, pageRect.bottom - nodeRect.top)
  const availableWidth = Math.max(120, pageRect.width)
  const scale = Math.max(
    MIN_OVERSIZED_BLOCK_SCALE,
    Math.min(1, (availableHeight - FIT_TOLERANCE) / nodeRect.height, availableWidth / nodeRect.width)
  )

  if (!Number.isFinite(scale) || scale >= 1) return node

  const wrapper = document.createElement('div')
  wrapper.className = 'ev-slide-scaled-block'
  wrapper.style.height = `${Math.ceil(nodeRect.height * scale)}px`

  const inner = document.createElement('div')
  inner.className = 'ev-slide-scaled-block-inner'
  inner.style.transform = `scale(${scale})`
  inner.style.width = `${Math.ceil(100 / scale)}%`
  inner.appendChild(cloneContentNode(node))

  wrapper.appendChild(inner)
  return wrapper
}

const shouldAddVisualCard = (nodes, role) => {
  if (!nodes.length || hasVisualMedia(nodes)) return false
  if (role === 'cover') return getSlideTextLength(nodes) <= 520
  if (role === 'intro') return getSlideTextLength(nodes) <= 260
  return false
}

const createSlideVisualCard = (role) => {
  const card = document.createElement('figure')
  card.className = `ev-slide-visual-card ev-slide-visual-card--${role}`
  card.setAttribute('aria-label', 'AI 编程教学场景插图')

  const panel = document.createElement('div')
  panel.className = 'ev-slide-visual-panel'

  const header = document.createElement('div')
  header.className = 'ev-slide-visual-header'

  const badge = document.createElement('span')
  badge.className = 'ev-slide-visual-badge'
  badge.textContent = role === 'cover' ? 'AI Coding' : 'Mini Lesson'

  const title = document.createElement('strong')
  title.textContent = role === 'cover' ? '从想法到原型' : '一节课一个主题'

  header.append(badge, title)

  const stage = document.createElement('div')
  stage.className = 'ev-slide-visual-stage'

  const promptCard = document.createElement('div')
  promptCard.className = 'ev-slide-visual-note ev-slide-visual-note--prompt'
  promptCard.innerHTML = '<span>说清目标</span><b>Prompt</b>'

  const aiCard = document.createElement('div')
  aiCard.className = 'ev-slide-visual-note ev-slide-visual-note--ai'
  aiCard.innerHTML = '<span>AI 协作</span><b>Generate</b>'

  const resultCard = document.createElement('div')
  resultCard.className = 'ev-slide-visual-note ev-slide-visual-note--result'
  resultCard.innerHTML = '<span>运行验证</span><b>Demo</b>'

  const connector = document.createElement('div')
  connector.className = 'ev-slide-visual-connector'

  const screen = document.createElement('div')
  screen.className = 'ev-slide-visual-screen'
  screen.innerHTML = `
    <div class="ev-slide-visual-window">
      <span></span><span></span><span></span>
    </div>
    <div class="ev-slide-visual-code-row ev-slide-visual-code-row--wide"></div>
    <div class="ev-slide-visual-code-row"></div>
    <div class="ev-slide-visual-code-row ev-slide-visual-code-row--short"></div>
    <div class="ev-slide-visual-preview">
      <span></span><span></span><span></span><span></span>
    </div>
  `

  stage.append(promptCard, connector, aiCard, resultCard, screen)

  const footer = document.createElement('figcaption')
  footer.className = 'ev-slide-visual-caption'
  footer.textContent = '把自然语言转成可演示的网页、小游戏和应用原型'

  panel.append(header, stage, footer)
  card.appendChild(panel)

  return card
}

const decorateSparseSlide = (nodes, role) => {
  if (!shouldAddVisualCard(nodes, role)) return nodes
  return [...nodes, createSlideVisualCard(role)]
}

const paginateLogicalSlide = (nodes, measureContext) => {
  if (!nodes.length) return []

  // 先按 h2/h3 切出逻辑页，再用隐藏测量容器分页；超长表格、列表和代码块会继续拆分或缩放。
  const primaryHeading = nodes.find(isPrimarySlideHeading)
  const pages = []
  let currentNodes = []
  let pageNumber = 1

  const currentBaseNodeCount = () => {
    if (pageNumber > 1 && primaryHeading) return 1
    if (pageNumber === 1 && currentNodes[0] === primaryHeading) return 1
    return 0
  }

  const currentHasBodyContent = () => currentNodes.length > currentBaseNodeCount()

  const startContinuationPage = () => {
    pageNumber += 1
    const heading = createContinuationHeading(primaryHeading)
    currentNodes = heading ? [heading] : []
  }

  const commitCurrentPage = () => {
    if (currentNodes.length) pages.push(currentNodes)
    startContinuationPage()
  }

  const addNode = (node) => {
    const candidateNodes = [...currentNodes, node]
    if (doesPageFit(measureContext, candidateNodes)) {
      currentNodes.push(node)
      return
    }

    if (currentHasBodyContent()) {
      commitCurrentPage()
      addNode(node)
      return
    }

    const pieces = getSplitPieces(node)
    if (pieces.length > 1) {
      pieces.forEach(addNode)
      return
    }

    const scaledBlock = createScaledBlock(node, measureContext, currentNodes)
    currentNodes.push(scaledBlock)
  }

  nodes.forEach(addNode)
  if (currentNodes.length) pages.push(currentNodes)

  return pages
}

const createSlideSection = (nodes, idMap, slideIndex) => {
  const section = document.createElement('section')
  section.className = 'ev-slide-section'

  const page = document.createElement('article')
  page.className = 'ev-slide-page vp-doc'
  page.classList.toggle('ev-slide-page--with-visual', hasGeneratedVisual(nodes))
  page.dataset.slideIndex = String(slideIndex)

  const prefix = `ev-slide-${slideRun}-${slideIndex}-`
  nodes.forEach((node) => {
    const clone = cloneContentNode(node)
    rewriteIds(clone, prefix, idMap)
    page.appendChild(clone)
  })

  section.appendChild(page)
  return section
}

const rewriteIds = (root, prefix, idMap) => {
  const nodes = root.id ? [root, ...root.querySelectorAll('[id]')] : [...root.querySelectorAll('[id]')]

  nodes.forEach((node) => {
    const oldId = node.id
    const newId = `${prefix}${oldId}`
    idMap.set(oldId, newId)
    node.id = newId
  })
}

const rewriteInternalLinks = (root, idMap) => {
  root.querySelectorAll('a[href^="#"]').forEach((link) => {
    const oldTarget = link.getAttribute('href')?.slice(1)
    if (!oldTarget || !idMap.has(oldTarget)) return
    link.setAttribute('href', `#${idMap.get(oldTarget)}`)
  })
}

const groupPageNodes = (source) => {
  const cover = []
  const sections = []
  let currentH2 = null
  let currentH3 = null

  Array.from(source.children).forEach((node) => {
    if (isHeading(node, 2)) {
      currentH2 = {
        intro: [node],
        children: []
      }
      currentH3 = null
      sections.push(currentH2)
      return
    }

    if (isHeading(node, 3) && currentH2) {
      currentH3 = {
        nodes: [node]
      }
      currentH2.children.push(currentH3)
      return
    }

    if (!currentH2) {
      cover.push(node)
      return
    }

    if (currentH3) {
      currentH3.nodes.push(node)
      return
    }

    currentH2.intro.push(node)
  })

  return { cover, sections }
}

const buildSlides = (source, slidesRoot, size) => {
  const idMap = new Map()
  const { cover, sections } = groupPageNodes(source)
  const measureContext = createMeasureContext(size)
  let slideIndex = 0

  slidesRoot.innerHTML = ''
  slideRun += 1

  const appendPages = (container, pages) => {
    pages.forEach((pageNodes) => {
      slideIndex += 1
      container.appendChild(createSlideSection(pageNodes, idMap, slideIndex))
    })
  }

  const appendLogicalPages = (container, pages) => {
    if (pages.length <= 1) {
      appendPages(container, pages)
      return
    }

    const stack = document.createElement('section')
    stack.className = 'ev-slide-stack'
    appendPages(stack, pages)
    container.appendChild(stack)
  }

  try {
    if (cover.length) {
      appendLogicalPages(slidesRoot, paginateLogicalSlide(decorateSparseSlide(cover, 'cover'), measureContext))
    }

    if (!sections.length && !cover.length) {
      appendLogicalPages(slidesRoot, paginateLogicalSlide(Array.from(source.children), measureContext))
    }

    sections.forEach((section) => {
      const introPages = paginateLogicalSlide(decorateSparseSlide(section.intro, 'intro'), measureContext)

      if (!section.children.length) {
        appendLogicalPages(slidesRoot, introPages)
        return
      }

      const horizontal = document.createElement('section')
      horizontal.className = 'ev-slide-stack'

      appendPages(horizontal, introPages)
      section.children.forEach((child) => appendPages(horizontal, paginateLogicalSlide(child.nodes, measureContext)))
      slidesRoot.appendChild(horizontal)
    })
  } finally {
    measureContext.destroy()
  }

  rewriteInternalLinks(slidesRoot, idMap)
  return slideIndex
}

const fitRenderedSlides = () => {
  if (!revealRef.value) return

  const pages = Array.from(revealRef.value.querySelectorAll('.ev-slide-page'))
  pages.forEach((page) => {
    page.style.removeProperty('zoom')
    page.classList.remove('ev-slide-render-fitted')
  })

  pages.forEach((page) => {
    if (
      page.scrollHeight <= page.clientHeight + FIT_TOLERANCE &&
      page.scrollWidth <= page.clientWidth + FIT_TOLERANCE
    ) {
      return
    }

    const heightScale = page.clientHeight / page.scrollHeight
    const widthScale = page.clientWidth / page.scrollWidth
    const scale = Math.max(MIN_RENDER_FIT_ZOOM, Math.min(0.98, heightScale, widthScale) - 0.01)

    page.style.zoom = String(scale)
    page.classList.add('ev-slide-render-fitted')
  })
}

const requestOverlayFullscreen = async () => {
  const overlay = overlayRef.value
  if (!overlay?.requestFullscreen || document.fullscreenElement) return

  try {
    await overlay.requestFullscreen()
    openedFullscreen = true
  } catch {
    openedFullscreen = false
  }
}

const getRevealSize = () => {
  if (window.innerWidth <= 768) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      margin: 0.02
    }
  }

  return {
    width: 1280,
    height: 720,
    margin: 0.04
  }
}

const openSlides = async () => {
  const source = getDocContent()
  if (!source || isOpen.value) return
  const size = getRevealSize()
  const requestId = openRequest + 1
  openRequest = requestId

  isOpen.value = true
  isPreparingSlides.value = true
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  await nextTick()
  if (!isOpen.value || requestId !== openRequest) return

  await waitForContentImages(source)
  await nextTick()
  if (!isOpen.value || requestId !== openRequest) return

  if (!slidesRef.value || !revealRef.value) {
    await closeSlides()
    return
  }

  slideCount.value = buildSlides(source, slidesRef.value, size)

  const { default: Reveal } = await import('reveal.js')
  deck = new Reveal(revealRef.value, {
    controls: true,
    progress: true,
    hash: false,
    history: false,
    center: false,
    width: size.width,
    height: size.height,
    margin: size.margin,
    minScale: 0.2,
    maxScale: 2,
    transition: 'slide'
  })

  await deck.initialize()
  fitRenderedSlides()
  isPreparingSlides.value = false
  void requestOverlayFullscreen().then(() => {
    deck?.layout?.()
    fitRenderedSlides()
  })
  overlayRef.value?.focus()
}

const closeSlides = async () => {
  if (!isOpen.value) return

  openRequest += 1
  isPreparingSlides.value = false

  if (deck) {
    deck.destroy()
    deck = null
  }

  if (openedFullscreen && document.fullscreenElement) {
    try {
      await document.exitFullscreen()
    } catch {
      // Keep closing the overlay even if the browser rejects fullscreen exit.
    }
  }

  openedFullscreen = false
  isOpen.value = false
  isPreparingSlides.value = false
  slideCount.value = 0
  document.body.style.overflow = previousBodyOverflow

  await nextTick()
  if (slidesRef.value) slidesRef.value.innerHTML = ''
}

watch(
  () => route.path,
  async () => {
    await closeSlides()
    await refreshAvailability()
  }
)

watch(isDocPage, refreshAvailability)

onMounted(refreshAvailability)

onBeforeUnmount(() => {
  if (deck) deck.destroy()
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <button
    v-if="hasDocContent"
    class="ev-slides-button"
    type="button"
    aria-label="打开幻灯片"
    title="幻灯片"
    @click="openSlides"
  >
    <el-icon :size="16">
      <Present />
    </el-icon>
    <span class="ev-slides-button-label">幻灯片</span>
  </button>

  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="overlayRef"
      class="ev-slides-overlay"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-label="页面幻灯片播放"
      @keydown.esc.stop.prevent="closeSlides"
    >
      <button
        class="ev-slides-close"
        type="button"
        aria-label="关闭幻灯片"
        title="关闭幻灯片"
        @click="closeSlides"
      >
        <el-icon :size="18">
          <Close />
        </el-icon>
      </button>

      <div class="ev-slides-shell">
        <div
          v-if="isPreparingSlides"
          class="ev-slides-loading"
          role="status"
          aria-live="polite"
        >
          <span class="ev-slides-loading-dot" aria-hidden="true" />
          <span>正在生成幻灯片...</span>
        </div>

        <div
          ref="revealRef"
          class="reveal ev-page-slides"
          :data-slide-count="slideCount"
        >
          <div ref="slidesRef" class="slides" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.ev-slides-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  min-width: 32px;
  margin-left: 12px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
}

.ev-slides-button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.ev-slides-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  color: #1f2937;
  background: #f8fafc;
  outline: none;
}

.ev-slides-shell {
  position: relative;
  width: 100%;
  height: 100%;
}

.ev-slides-loading {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #f8fafc;
  color: #334155;
  font-size: 18px;
  font-weight: 700;
}

.ev-slides-loading-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #2563eb;
  animation: ev-slides-pulse 1s ease-in-out infinite;
}

@keyframes ev-slides-pulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.86);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.ev-slides-close {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 10010;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(148, 163, 184, 0.42);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #334155;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
  cursor: pointer;
}

.ev-slides-close:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.ev-page-slides {
  width: 100%;
  height: 100%;
  background: #f8fafc;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

.ev-page-slides .slides {
  text-align: left;
}

.ev-page-slides section {
  height: 100%;
}

.ev-page-slides .ev-slide-section {
  padding: 0;
  background: transparent;
}

.ev-page-slides .ev-slide-page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 48px 58px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.14);
  color: var(--vp-c-text-1);
  font-size: 22px;
  line-height: 1.62;
}

.ev-page-slides .ev-slide-page--with-visual {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  gap: 28px 38px;
  align-content: start;
}

.ev-page-slides .ev-slide-page--with-visual > :not(.ev-slide-visual-card) {
  grid-column: 1;
}

.ev-page-slides .ev-slide-page--with-visual > .ev-slide-visual-card {
  grid-column: 2;
  grid-row: 1 / span 8;
}

.ev-page-slides .ev-slide-page > :first-child {
  margin-top: 0;
}

.ev-page-slides .ev-slide-page > :last-child {
  margin-bottom: 0;
}

.ev-page-slides .ev-slide-page h1 {
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.16;
}

.ev-page-slides .ev-slide-page h2 {
  margin-bottom: 22px;
  font-size: 38px;
  line-height: 1.2;
}

.ev-page-slides .ev-slide-page h3 {
  margin-bottom: 20px;
  font-size: 32px;
  line-height: 1.25;
}

.ev-page-slides .ev-slide-page h4 {
  font-size: 26px;
}

.ev-page-slides .ev-slide-continuation-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  color: #475569;
}

.ev-page-slides .ev-slide-continuation-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 9px;
  border: 1px solid rgba(37, 99, 235, 0.24);
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
  font-size: 0.42em;
  font-weight: 700;
  line-height: 1.25;
}

.ev-page-slides .ev-slide-page p,
.ev-page-slides .ev-slide-page li,
.ev-page-slides .ev-slide-page blockquote,
.ev-page-slides .ev-slide-page td,
.ev-page-slides .ev-slide-page th {
  font-size: inherit;
}

.ev-page-slides .ev-slide-page img,
.ev-page-slides .ev-slide-page video,
.ev-page-slides .ev-slide-page canvas,
.ev-page-slides .ev-slide-page svg {
  max-width: 100%;
  height: auto;
}

.ev-page-slides .ev-slide-page table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.8em;
  line-height: 1.42;
}

.ev-page-slides .ev-slide-page th,
.ev-page-slides .ev-slide-page td {
  padding: 8px 10px;
  word-break: break-word;
}

.ev-page-slides .ev-slide-page :where(.vp-adaptive-theme, [class*="language-"]) {
  max-width: 100%;
  overflow: hidden;
}

.ev-page-slides .ev-slide-page pre {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  font-size: 0.72em;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
}

.ev-page-slides .ev-slide-page code {
  font-size: 0.86em;
}

.ev-page-slides .ev-slide-page .custom-block {
  margin: 16px 0;
  padding: 14px 18px;
  font-size: 0.92em;
  line-height: 1.5;
}

.ev-page-slides .ev-slide-visual-card {
  align-self: start;
  box-sizing: border-box;
  width: 100%;
  min-height: 472px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(30, 64, 175, 0.14);
  border-radius: 20px;
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.14), rgba(20, 184, 166, 0.1)),
    #ffffff;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.16);
  color: #1e293b;
}

.ev-page-slides .ev-slide-visual-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: inherit;
  padding: 22px;
}

.ev-page-slides .ev-slide-visual-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.ev-page-slides .ev-slide-visual-header strong {
  color: #0f172a;
  font-size: 18px;
  line-height: 1.25;
}

.ev-page-slides .ev-slide-visual-badge {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid rgba(37, 99, 235, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.ev-page-slides .ev-slide-visual-stage {
  position: relative;
  flex: 1;
  min-height: 340px;
}

.ev-page-slides .ev-slide-visual-note {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 132px;
  padding: 13px 14px;
  border: 1px solid rgba(148, 163, 184, 0.32);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
}

.ev-page-slides .ev-slide-visual-note span {
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
}

.ev-page-slides .ev-slide-visual-note b {
  color: #0f172a;
  font-size: 19px;
  line-height: 1.15;
}

.ev-page-slides .ev-slide-visual-note--prompt {
  top: 4px;
  left: 0;
}

.ev-page-slides .ev-slide-visual-note--ai {
  top: 74px;
  right: 4px;
  border-color: rgba(20, 184, 166, 0.28);
}

.ev-page-slides .ev-slide-visual-note--result {
  right: 52px;
  bottom: 12px;
  border-color: rgba(245, 158, 11, 0.34);
}

.ev-page-slides .ev-slide-visual-connector {
  position: absolute;
  top: 58px;
  left: 92px;
  width: 190px;
  height: 118px;
  border-top: 3px solid rgba(37, 99, 235, 0.28);
  border-right: 3px solid rgba(20, 184, 166, 0.26);
  border-radius: 0 26px 0 0;
}

.ev-page-slides .ev-slide-visual-screen {
  position: absolute;
  left: 8px;
  right: 18px;
  bottom: 48px;
  z-index: 1;
  min-height: 170px;
  padding: 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 18px;
  background: #0f172a;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.ev-page-slides .ev-slide-visual-window {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
}

.ev-page-slides .ev-slide-visual-window span {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #38bdf8;
}

.ev-page-slides .ev-slide-visual-window span:nth-child(2) {
  background: #22c55e;
}

.ev-page-slides .ev-slide-visual-window span:nth-child(3) {
  background: #f59e0b;
}

.ev-page-slides .ev-slide-visual-code-row {
  width: 58%;
  height: 10px;
  margin-bottom: 10px;
  border-radius: 999px;
  background: rgba(226, 232, 240, 0.7);
}

.ev-page-slides .ev-slide-visual-code-row--wide {
  width: 78%;
}

.ev-page-slides .ev-slide-visual-code-row--short {
  width: 42%;
}

.ev-page-slides .ev-slide-visual-preview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 20px;
}

.ev-page-slides .ev-slide-visual-preview span {
  height: 46px;
  border-radius: 12px;
  background: #dbeafe;
}

.ev-page-slides .ev-slide-visual-preview span:nth-child(2) {
  background: #ccfbf1;
}

.ev-page-slides .ev-slide-visual-preview span:nth-child(3) {
  background: #fef3c7;
}

.ev-page-slides .ev-slide-visual-preview span:nth-child(4) {
  background: #e0e7ff;
}

.ev-page-slides .ev-slide-visual-caption {
  margin-top: 20px;
  color: #475569;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
}

.ev-page-slides .controls {
  color: #2563eb;
}

.ev-page-slides .progress {
  color: #2563eb;
}

.ev-slide-scaled-block {
  width: 100%;
  overflow: hidden;
}

.ev-slide-scaled-block-inner {
  transform-origin: top left;
}

.ev-slide-measure {
  position: fixed;
  top: 0;
  left: -100000px;
  z-index: -1;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
}

.ev-slide-measure .ev-slide-page {
  box-shadow: none;
}

@media (max-width: 768px) {
  .ev-slides-button {
    width: 32px;
    margin-left: 8px;
    padding: 0;
  }

  .ev-slides-button-label {
    display: none;
  }

  .ev-page-slides .ev-slide-page {
    padding: 34px 28px;
    border-radius: 14px;
    font-size: 18px;
  }

  .ev-page-slides .ev-slide-page--with-visual {
    display: block;
  }

  .ev-page-slides .ev-slide-visual-card {
    min-height: 260px;
    margin-top: 22px;
  }

  .ev-page-slides .ev-slide-visual-panel {
    padding: 16px;
  }

  .ev-page-slides .ev-slide-visual-header {
    margin-bottom: 14px;
  }

  .ev-page-slides .ev-slide-visual-header strong,
  .ev-page-slides .ev-slide-visual-caption {
    display: none;
  }

  .ev-page-slides .ev-slide-visual-stage {
    min-height: 214px;
  }

  .ev-page-slides .ev-slide-visual-note {
    width: 112px;
    padding: 10px;
  }

  .ev-page-slides .ev-slide-visual-note b {
    font-size: 15px;
  }

  .ev-page-slides .ev-slide-visual-screen {
    right: 4px;
    bottom: 4px;
    min-height: 108px;
    padding: 12px;
  }

  .ev-page-slides .ev-slide-visual-preview span {
    height: 28px;
  }

  .ev-page-slides .ev-slide-page h1 {
    font-size: 34px;
  }

  .ev-page-slides .ev-slide-page h2 {
    font-size: 28px;
  }

  .ev-page-slides .ev-slide-page h3 {
    font-size: 24px;
  }
}
</style>
