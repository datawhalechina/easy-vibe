<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

const activeTab = ref('elements') // 默认改为 Elements，匹配截图
const hoverInfo = ref('')
const isDark = ref(false)
const isAutoPlaying = ref(false)
const cursorX = ref(0)
const cursorY = ref(0)
const cursorVisible = ref(false)
const highlightVisible = ref(false)
const highlightStyle = ref({})
let tourTimeout = null
const demoRef = ref(null)

// 导览选项
const tourOptions = [
  { value: '', label: '选择导览场景...', disabled: true },
  { value: 'elements', label: '1. 元素面板 (Elements)' },
  { value: 'console', label: '2. 控制台 (Console)' },
  { value: 'sources', label: '3. 源代码 (Sources)' },
  { value: 'network', label: '4. 网络 (Network)' },
  { value: 'application', label: '5. 应用 (Application)' }
]
const selectedTour = ref('')

const tabs = [
  {
    id: 'elements',
    label: '元素',
    desc: '查看和修改页面 HTML 结构与 CSS 样式'
  },
  {
    id: 'console',
    label: '控制台',
    desc: '查看日志、错误信息，执行 JavaScript 代码'
  },
  {
    id: 'sources',
    label: '源代码/来源',
    desc: '查看源代码，设置断点调试 JavaScript'
  },
  {
    id: 'network',
    label: '网络',
    desc: '监控网络请求，查看接口数据和加载性能'
  },
  { id: 'performance', label: '性能', desc: '分析页面运行性能' },
  { id: 'memory', label: '内存', desc: '检测内存泄漏' },
  {
    id: 'application',
    label: '应用',
    desc: '查看本地存储(Storage)、Cookies、缓存等'
  },
  { id: 'security', label: '隐私与安全', desc: '查看证书和安全问题' },
  { id: 'lighthouse', label: 'Lighthouse', desc: '页面质量审计' },
  { id: 'recorder', label: '记录器', desc: '录制用户操作' }
]

// --- Console Data ---
const consoleSidebarItems = [
  { label: '6 条消息', icon: 'list', count: 6, type: 'all' },
  { label: '6 条用户消息', icon: 'user', count: 6, type: 'user' },
  { label: '无错误', icon: 'error', count: 0, type: 'error' },
  { label: '无警告', icon: 'warn', count: 0, type: 'warn' },
  { label: '无信息', icon: 'info', count: 0, type: 'info' },
  { label: '6 条详细消息', icon: 'verbose', count: 6, type: 'verbose' }
]
const consoleLogs = ref([
  { type: 'log', msg: '[vite] connecting...', source: 'client:733' },
  { type: 'log', msg: '[vite] connected.', source: 'client:827' },
  {
    type: 'log',
    msg: 'Config Layers for 404.md:\n========================\n1. locale config (root)\n2. .vitepress/config (root)',
    source: 'shared.js:194'
  },
  {
    type: 'log',
    msg: 'Config Layers for zh-cn/appendix/browser-devtools/index.md:\n=======================================================\n1. locale config (zh-cn)\n2. .vitepress/config (root)',
    source: 'shared.js:194'
  },
  {
    type: 'log',
    msg: '[vite] hot updated: .vitepress/theme/components/appendix/browser-devtools/BrowserDevToolsDemo.vue',
    source: 'client:810'
  },
  {
    type: 'log',
    msg: '[vite] hot updated: .vitepress/theme/components/appendix/browser-devtools/BrowserDevToolsDemo.vue?vue&type=style&index=0&scoped=d906459f&lang.css',
    source: 'client:810'
  }
])
const consoleInput = ref('')

// --- Elements Data (Aligned with screenshot) ---
const domTree = ref([
  {
    tag: 'html',
    attrs: { class: 'mac', lang: 'zh-CN', dir: 'ltr' },
    expanded: true,
    children: [
      {
        tag: 'head',
        expanded: false,
        children: [{ tag: 'title', text: 'DevTools Demo' }]
      },
      {
        tag: 'body',
        expanded: true,
        children: [
          {
            tag: 'div',
            attrs: { id: 'app', 'data-v-app': '' },
            expanded: true,
            children: [
              { tag: 'div', text: '' },
              {
                tag: 'script',
                attrs: {
                  type: 'module',
                  src: '/easy-vibe/node_modules/vitepress/dist/client/app/index.js'
                }
              },
              {
                tag: 'div',
                attrs: { id: 'el-popper-container-3083' },
                text: ''
              }
            ]
          },
          {
            tag: 'div',
            attrs: { style: 'all: initial' },
            expanded: false,
            children: []
          },
          {
            tag: 'div',
            attrs: {
              id: 'immersive-translate-browser-popup',
              style: 'all: initial'
            },
            expanded: false,
            children: []
          }
        ]
      }
    ]
  }
])
const cssRules = ref([
  {
    selector: 'body',
    styles: {
      'background-color': 'rgb(255, 255, 255)',
      color: '#24292f',
      margin: '0',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    }
  },
  { selector: '#app', styles: { padding: '20px' } },
  { selector: '.mac', styles: { 'font-synthesis': 'none' } }
])

// --- Sources Data ---
const fileSystem = ref([
  { name: 'index.html', type: 'file' },
  {
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      { name: 'main.js', type: 'file' },
      { name: 'App.vue', type: 'file' },
      { name: 'utils.js', type: 'file' }
    ]
  }
])
const activeFile = ref('main.js')
const fileContent = ref(`import { createApp } from 'vue'
import App from './App.vue'

console.log('App mounted successfully.')

const app = createApp(App)
app.mount('#app')`)

// --- Network Data ---
const networkRequests = ref([
  {
    id: 1,
    name: 'index.html',
    status: 200,
    type: 'document',
    size: '2.4kB',
    time: '120ms',
    waterfall: 10,
    headers: { 'Content-Type': 'text/html; charset=utf-8', Server: 'Vite' },
    requestHeaders: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      Accept: 'text/html'
    },
    preview:
      '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>...</head>\n<body>...</body>\n</html>'
  },
  {
    id: 2,
    name: 'main.js',
    status: 200,
    type: 'script',
    size: '15.2kB',
    time: '80ms',
    waterfall: 40,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache'
    },
    requestHeaders: {
      'User-Agent': 'Mozilla/5.0 ...',
      Referer: 'http://localhost:3000/'
    },
    preview:
      'import { createApp } from "vue";\nimport App from "./App.vue";\ncreateApp(App).mount("#app");'
  },
  {
    id: 3,
    name: 'style.css',
    status: 200,
    type: 'stylesheet',
    size: '4.1kB',
    time: '45ms',
    waterfall: 50,
    headers: { 'Content-Type': 'text/css' },
    requestHeaders: {
      'User-Agent': 'Mozilla/5.0 ...',
      Referer: 'http://localhost:3000/'
    },
    preview:
      'body { margin: 0; font-family: sans-serif; }\n#app { padding: 20px; }'
  },
  {
    id: 4,
    name: 'api/user',
    status: 200,
    type: 'fetch',
    size: '500B',
    time: '200ms',
    waterfall: 120,
    headers: { 'Content-Type': 'application/json' },
    requestHeaders: {
      Authorization: 'Bearer eyJhbGci...',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    preview:
      '{\n  "id": 1001,\n  "username": "developer",\n  "role": "admin",\n  "permissions": ["read", "write"]\n}'
  },
  {
    id: 5,
    name: 'logo.png',
    status: 304,
    type: 'png',
    size: '12kB',
    time: '20ms',
    waterfall: 60,
    headers: { 'Content-Type': 'image/png' },
    requestHeaders: {
      'User-Agent': 'Mozilla/5.0 ...',
      Accept: 'image/webp,image/apng'
    },
    preview: '[Binary Data - Image]'
  }
])
const selectedRequest = ref(null)
const activeDetailTab = ref('headers')

const selectRequest = (req) => {
  if (selectedRequest.value && selectedRequest.value.id === req.id) {
    selectedRequest.value = null // Toggle off
  } else {
    selectedRequest.value = req
    activeDetailTab.value = 'headers' // Reset to default tab
  }
}

// --- Application Data ---
const localStorageData = ref([
  { key: 'theme', value: 'light' },
  { key: 'user_token', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
  { key: 'sidebar_collapsed', value: 'false' }
])

// --- Actions ---

const showInfo = (text) => {
  if (isAutoPlaying.value) return
  hoverInfo.value = text
}

const clearInfo = () => {
  if (isAutoPlaying.value) return
  hoverInfo.value = ''
}

const runConsoleCommand = () => {
  if (!consoleInput.value.trim()) return
  consoleLogs.value.push({ type: 'command', msg: consoleInput.value })
  try {
    const val = consoleInput.value
    if (val === '1+1') consoleLogs.value.push({ type: 'result', msg: '2' })
    else if (val.includes('alert'))
      consoleLogs.value.push({ type: 'result', msg: 'undefined' })
    else
      consoleLogs.value.push({
        type: 'error',
        msg: 'ReferenceError: Command not found in mock'
      })
  } catch (e) {
    consoleLogs.value.push({ type: 'error', msg: e.message })
  }
  consoleInput.value = ''
  nextTick(() => {
    const output = demoRef.value?.querySelector('.console-output')
    if (output) output.scrollTop = output.scrollHeight
  })
}

// --- Auto Tour Logic ---

const handleTourSelect = async () => {
  if (!selectedTour.value) return
  const target = selectedTour.value

  // 如果已经在播放，先停止
  if (isAutoPlaying.value) {
    stopTour()
    await new Promise((r) => setTimeout(r, 100))
  }

  // 切换到目标 Tab
  activeTab.value = target

  // 启动导览
  startTour(target)
}

const moveCursorTo = (selector, infoText, waitTime = 2000) => {
  return new Promise((resolve) => {
    const container = demoRef.value
    if (!container) return resolve()

    // Find element
    const el = container.querySelector(selector)
    if (el) {
      const containerRect = container.getBoundingClientRect()
      const rect = el.getBoundingClientRect()

      // Calculate center
      const targetX = rect.left - containerRect.left + rect.width / 2
      const targetY = rect.top - containerRect.top + rect.height / 2

      // Move cursor
      cursorX.value = targetX
      cursorY.value = targetY
      cursorVisible.value = true

      // Show highlight after a slight delay to simulate travel time
      setTimeout(() => {
        if (!isAutoPlaying.value) return resolve()

        highlightStyle.value = {
          top: rect.top - containerRect.top + 'px',
          left: rect.left - containerRect.left + 'px',
          width: rect.width + 'px',
          height: rect.height + 'px'
        }
        highlightVisible.value = true
        hoverInfo.value = infoText

        // Wait and then clear
        tourTimeout = setTimeout(() => {
          highlightVisible.value = false
          resolve()
        }, waitTime)
      }, 500) // faster movement
    } else {
      console.warn('Selector not found:', selector)
      resolve() // Skip if not found
    }
  })
}

const stopTour = () => {
  isAutoPlaying.value = false
  cursorVisible.value = false
  highlightVisible.value = false
  hoverInfo.value = ''
  selectedTour.value = ''
  if (tourTimeout) clearTimeout(tourTimeout)
}

const startTour = async (targetTab) => {
  if (isAutoPlaying.value) return
  isAutoPlaying.value = true
  cursorVisible.value = true
  hoverInfo.value = ''

  try {
    // Dispatch based on target tab
    if (targetTab === 'console') await runConsoleTour()
    else if (targetTab === 'elements') await runElementsTour()
    else if (targetTab === 'sources') await runSourcesTour()
    else if (targetTab === 'network') await runNetworkTour()
    else if (targetTab === 'application') await runApplicationTour()

    stopTour()
  } catch (e) {
    console.error(e)
    stopTour()
  }
}

const runConsoleTour = async () => {
  await moveCursorTo(
    '.tab[data-id="console"]',
    '控制台 (Console)：查看日志、交互式运行代码'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.console-toolbar',
    '工具栏：可清空日志、设置 Log 级别、过滤内容'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.console-sidebar',
    '侧边栏：按类型聚合消息 (Errors, Warnings)'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.log-line:nth-child(1)',
    '日志流：显示代码输出，点击右侧链接可跳转源码'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.bottom-drawer-header',
    '抽屉 (Drawer)：查看搜索结果、Issues 等辅助信息'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.console-input-area',
    '即时执行：在这里输入 JS 表达式并回车运行'
  )
}

const runElementsTour = async () => {
  await moveCursorTo(
    '.tab[data-id="elements"]',
    '元素面板 (Elements)：实时查看和修改 DOM/CSS'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.dom-tree-panel',
    'DOM 树：页面的 HTML 结构，可折叠/展开/拖拽'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.dom-node[data-tag="div"]',
    '选中元素：点击元素以在右侧查看其样式'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.styles-panel',
    '样式面板 (Styles)：查看计算后的样式和 CSS 规则'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.style-rule:first-child',
    'CSS 规则：可直接修改属性值，实时预览效果'
  )
}

const runSourcesTour = async () => {
  await moveCursorTo(
    '.tab[data-id="sources"]',
    '源代码 (Sources)：文件浏览与断点调试'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo('.file-navigator', '文件系统：查看加载的所有资源文件')
  if (!isAutoPlaying.value) return
  await moveCursorTo('.code-editor', '编辑器：查看源码，点击行号设置断点')
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.debugger-sidebar',
    '调试器：查看变量 (Watch)、调用栈 (Call Stack)'
  )
}

const runNetworkTour = async () => {
  await moveCursorTo('.tab[data-id="network"]', '网络 (Network)：抓包分析')
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.network-toolbar',
    '过滤器：按类型筛选请求 (XHR/Fetch, CSS, JS)'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.network-grid-header',
    '请求列表：查看状态码、类型、大小、耗时'
  )
  if (!isAutoPlaying.value) return

  // Simulate clicking the API request
  await moveCursorTo('.network-row:nth-child(4)', '点击请求行查看详情')
  if (!isAutoPlaying.value) return

  // Trigger selection
  selectedRequest.value = networkRequests.value[3] // api/user

  await moveCursorTo(
    '.detail-header',
    '详情面板：查看 Headers, Preview, Response'
  )
  if (!isAutoPlaying.value) return

  // 1. Headers Tab
  activeDetailTab.value = 'headers'
  await moveCursorTo(
    '.detail-title:nth-child(1)',
    'Headers: 查看请求/响应头信息'
  )
  if (!isAutoPlaying.value) return

  await moveCursorTo(
    '.detail-section:nth-child(1)',
    'General：查看 URL、Method (GET/POST) 和状态码 (200)'
  )
  if (!isAutoPlaying.value) return

  await moveCursorTo(
    '.detail-section:nth-child(2)',
    'Response Headers：服务器返回的头信息 (Content-Type)'
  )
  if (!isAutoPlaying.value) return

  await moveCursorTo(
    '.detail-section:nth-child(3)',
    'Request Headers：浏览器发送的头信息 (User-Agent, Cookies)'
  )
  if (!isAutoPlaying.value) return

  // 2. Preview Tab
  await moveCursorTo(
    '.detail-title:nth-child(2)',
    'Preview: 格式化预览接口返回的数据'
  )
  if (!isAutoPlaying.value) return
  activeDetailTab.value = 'preview'

  await moveCursorTo('.preview-content', 'Preview Content: 查看 JSON 结构')
  if (!isAutoPlaying.value) return

  // 3. Response Tab
  await moveCursorTo('.detail-title:nth-child(3)', 'Response: 查看原始响应数据')
  if (!isAutoPlaying.value) return
  activeDetailTab.value = 'response'

  await moveCursorTo('.preview-content', 'Response Body: 原始文本内容')
  if (!isAutoPlaying.value) return

  await moveCursorTo(
    '.waterfall-cell',
    '瀑布流 (Waterfall)：请求生命周期耗时分析'
  )
}

const runApplicationTour = async () => {
  await moveCursorTo(
    '.tab[data-id="application"]',
    '应用 (Application)：存储与缓存管理'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.storage-sidebar',
    '存储类型：Local Storage, Cookies, IndexedDB'
  )
  if (!isAutoPlaying.value) return
  await moveCursorTo(
    '.storage-content',
    '数据视图：查看 Key-Value 数据，支持增删改查'
  )
}

onUnmounted(() => {
  if (tourTimeout) clearTimeout(tourTimeout)
})
</script>

<template>
  <div
    class="browser-devtools-demo"
    :class="{ 'dark-mode': isDark }"
    ref="demoRef"
  >
    <!-- Top Controls (Custom for Demo) -->
    <div class="demo-controls">
      <div class="control-label">Chrome DevTools 模拟器</div>
      <div class="control-actions">
        <select
          v-model="selectedTour"
          @change="handleTourSelect"
          class="tour-select"
          :disabled="isAutoPlaying"
        >
          <option
            v-for="opt in tourOptions"
            :key="opt.value"
            :value="opt.value"
            :disabled="opt.disabled"
          >
            {{ opt.label }}
          </option>
        </select>
        <button v-if="isAutoPlaying" class="stop-btn" @click="stopTour">
          停止演示
        </button>
      </div>
    </div>

    <!-- Virtual Cursor & Highlight -->
    <div
      class="virtual-cursor"
      v-if="cursorVisible"
      :style="{ transform: `translate(${cursorX}px, ${cursorY}px)` }"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19823L11.4818 12.3673H5.65376Z"
          fill="#000"
          stroke="white"
          stroke-width="1.5"
        />
      </svg>
    </div>
    <div
      class="highlight-box"
      v-if="highlightVisible"
      :style="highlightStyle"
    ></div>

    <!-- Main UI Container -->
    <div class="devtools-container">
      <!-- Header -->
      <div class="devtools-header">
        <div class="header-left">
          <div
            class="icon-btn element-picker"
            title="选择页面中的元素以进行检查"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#6e6e6e">
              <path
                d="M4 4h9v2H4V4zm0 4h5v2H4V8zm0 4h5v2H4v-2zm12-5l-4 4h3v4h2v-4h3l-4-4z"
              />
            </svg>
          </div>
          <div class="icon-btn device-toggle" title="切换设备工具栏">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#6e6e6e">
              <path
                d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"
              />
            </svg>
          </div>
          <div class="separator"></div>
          <div class="tabs">
            <div
              v-for="tab in tabs"
              :key="tab.id"
              class="tab"
              :class="{ active: activeTab === tab.id }"
              :data-id="tab.id"
              @click="activeTab = tab.id"
              @mouseenter="showInfo(tab.desc)"
              @mouseleave="clearInfo"
            >
              {{ tab.label }}
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="icon-btn settings" title="设置">⚙️</div>
          <div class="icon-btn close" title="关闭">×</div>
        </div>
      </div>

      <!-- Body Area -->
      <div class="devtools-body">
        <!-- 1. Console Panel -->
        <div v-if="activeTab === 'console'" class="panel console-panel-layout">
          <div class="console-toolbar" @mouseenter="showInfo('控制台工具栏')">
            <div class="icon-btn clear" title="清除控制台">🚫</div>
            <div class="separator"></div>
            <div class="dropdown-trigger">top ▼</div>
            <div class="icon-btn eye" title="创建实时表达式">👁️</div>
            <div class="filter-box">
              <span class="filter-icon">🔍</span><input placeholder="过滤" />
            </div>
            <div class="dropdown-trigger">默认级别 ▼</div>
          </div>
          <div class="console-main-area">
            <div class="console-sidebar">
              <div
                v-for="(item, idx) in consoleSidebarItems"
                :key="idx"
                class="sidebar-item"
                :class="{ active: item.type === 'all' }"
              >
                <span class="item-icon">{{
                  item.icon === 'error'
                    ? '❌'
                    : item.icon === 'warn'
                      ? '⚠️'
                      : item.icon === 'info'
                        ? 'ℹ️'
                        : item.icon === 'verbose'
                          ? '💬'
                          : item.icon === 'user'
                            ? '👤'
                            : '📋'
                }}</span>
                <span class="item-label">{{ item.label }}</span>
              </div>
            </div>
            <div class="console-content-wrapper">
              <div class="console-output">
                <div
                  v-for="(log, idx) in consoleLogs"
                  :key="idx"
                  class="log-line"
                  :class="log.type"
                >
                  <div class="log-gutter">
                    <span class="icon error" v-if="log.type === 'error'"
                      >❌</span
                    >
                    <span class="icon warn" v-else-if="log.type === 'warn'"
                      >⚠️</span
                    >
                    <span class="icon" v-else-if="log.type === 'command'"
                      >&gt;</span
                    >
                    <span class="icon" v-else>&lt;</span>
                  </div>
                  <div class="log-content">
                    <pre>{{ log.msg }}</pre>
                  </div>
                  <div class="log-source">
                    <span class="source">{{ log.source }}</span>
                  </div>
                </div>
                <!-- Input area inside scrollable area for Chrome feel -->
                <div class="console-input-area">
                  <span class="prompt">&gt;</span>
                  <input
                    v-model="consoleInput"
                    @keyup.enter="runConsoleCommand"
                    class="input-field"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Bottom Drawer -->
          <div class="bottom-drawer">
            <div class="bottom-drawer-header">
              <div
                class="icon-btn more"
                style="padding: 0 4px; margin-right: 4px"
              >
                ⋮
              </div>
              <div class="drawer-tab">控制台</div>
              <div class="drawer-tab">AI 辅助</div>
              <div class="drawer-tab">新变化</div>
              <div class="drawer-tab">问题</div>
              <div class="drawer-tab active">
                搜索 <span class="close-icon">×</span>
              </div>
            </div>
            <div class="drawer-content">
              <div class="search-panel">
                <div class="search-bar">
                  <span class="prompt">🔍</span>
                  <input
                    placeholder="A terminal is just a grid of same-sized cells..."
                    class="search-input"
                  />
                  <div class="search-actions">Aa ab .*</div>
                </div>
                <div class="search-results">
                  <div class="no-results">
                    <div class="no-results-title">未找到匹配项</div>
                    <div class="no-results-desc">
                      没有与您的搜索查询相符的结果
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Elements Panel -->
        <div v-else-if="activeTab === 'elements'" class="panel elements-panel">
          <div class="dom-tree-panel">
            <div class="dom-tree-content">
              <div class="dom-node" data-tag="html">
                <div class="line-content">
                  <span class="arrow expanded">▼</span>
                  <span class="tag-name">html</span>
                  <span class="attr-name">class</span>=<span class="attr-val"
                    >"mac"</span
                  >
                  <span class="attr-name">lang</span>=<span class="attr-val"
                    >"zh-CN"</span
                  >
                  <span class="attr-name">dir</span>=<span class="attr-val"
                    >"ltr"</span
                  >
                  <span class="attr-name">style</span>=<span class="attr-val"
                    >"--ev-doc-font-size: 14px..."</span
                  >
                </div>
                <div class="children">
                  <div class="dom-node" data-tag="head">
                    <div class="line-content">
                      <span class="arrow">▶</span>
                      <span class="tag-name">head</span>
                      <span class="dots">...</span>
                    </div>
                  </div>
                  <div class="dom-node" data-tag="body">
                    <div class="line-content">
                      <span class="arrow expanded">▼</span>
                      <span class="tag-name">body</span>
                      <span class="node-trail">== $0</span>
                    </div>
                    <div class="children">
                      <div class="dom-node selected" data-tag="div">
                        <div class="line-content">
                          <span class="arrow expanded">▼</span>
                          <span class="tag-name">div</span>
                          <span class="attr-name">id</span>=<span
                            class="attr-val"
                            >"app"</span
                          >
                          <span class="attr-name">data-v-app</span>
                        </div>
                        <div class="children">
                          <div class="dom-node">
                            <div class="line-content">
                              <span class="indent"></span
                              ><span class="tag-name">div</span
                              ><span class="dots">...</span
                              ><span class="tag-name">/div</span>
                            </div>
                          </div>
                          <div class="dom-node">
                            <div class="line-content">
                              <span class="indent"></span
                              ><span class="tag-name">script</span>
                              <span class="attr-name">type</span>=<span
                                class="attr-val"
                                >"module"</span
                              >
                              <span class="attr-name">src</span>=<span
                                class="attr-val"
                                >"/easy-vibe/..."</span
                              ><span class="tag-name">/script</span>
                            </div>
                          </div>
                          <div class="dom-node">
                            <div class="line-content">
                              <span class="indent"></span
                              ><span class="tag-name">div</span>
                              <span class="attr-name">id</span>=<span
                                class="attr-val"
                                >"el-popper-container-3083"</span
                              ><span class="tag-name">&gt;</span
                              ><span class="dots">...</span
                              ><span class="tag-name">/div</span>
                            </div>
                          </div>
                        </div>
                        <div class="line-content">
                          <span class="tag-name">/div</span>
                        </div>
                      </div>
                      <div class="dom-node">
                        <div class="line-content">
                          <span class="arrow">▶</span>
                          <span class="tag-name">div</span>
                          <span class="attr-name">style</span>=<span
                            class="attr-val"
                            >"all: initial;"</span
                          ><span class="tag-name">&gt;</span
                          ><span class="dots">...</span
                          ><span class="tag-name">/div</span>
                        </div>
                      </div>
                      <div class="dom-node">
                        <div class="line-content">
                          <span class="arrow">▶</span>
                          <span class="tag-name">div</span>
                          <span class="attr-name">id</span>=<span
                            class="attr-val"
                            >"immersive-translate-browser-popup"</span
                          >
                          <span class="attr-name">style</span>=<span
                            class="attr-val"
                            >"all: initial;"</span
                          ><span class="tag-name">&gt;</span
                          ><span class="dots">...</span
                          ><span class="tag-name">/div</span>
                        </div>
                      </div>
                    </div>
                    <div class="line-content">
                      <span class="tag-name">/body</span>
                    </div>
                  </div>
                </div>
                <div class="line-content">
                  <span class="tag-name">/html</span>
                </div>
              </div>
            </div>
            <div class="breadcrumbs">html.mac > body > div#app</div>
            <!-- Bottom Drawer (Shared) -->
            <div class="bottom-drawer" style="border-top: 1px solid #ccc">
              <div class="bottom-drawer-header">
                <div
                  class="icon-btn more"
                  style="padding: 0 4px; margin-right: 4px"
                >
                  ⋮
                </div>
                <div class="drawer-tab">控制台</div>
                <div class="drawer-tab">AI 辅助</div>
                <div class="drawer-tab">新变化</div>
                <div class="drawer-tab">问题</div>
                <div class="drawer-tab active">
                  搜索 <span class="close-icon">×</span>
                </div>
              </div>
              <div class="drawer-content">
                <div class="search-panel">
                  <div class="search-bar">
                    <span class="prompt">🔍</span>
                    <input
                      placeholder="A terminal is just a grid of same-sized cells..."
                      class="search-input"
                    />
                    <div class="search-actions">Aa ab .*</div>
                  </div>
                  <div class="search-results">
                    <div class="no-results">
                      <div class="no-results-title">未找到匹配项</div>
                      <div class="no-results-desc">
                        没有与您的搜索查询相符的结果
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="styles-panel">
            <div class="styles-tabs">
              <div class="style-tab active">样式</div>
              <div class="style-tab">计算样式</div>
              <div class="style-tab">布局</div>
              <div class="style-tab">事件监听器</div>
              <div class="style-tab">»</div>
            </div>
            <div class="styles-content">
              <!-- Box Model Mock -->
              <div class="box-model-container">
                <div class="box-margin">
                  <div class="label">margin</div>
                  <div class="val-top">-</div>
                  <div class="val-left">-</div>
                  <div class="val-right">-</div>
                  <div class="val-bottom">-</div>
                  <div class="box-border">
                    <div class="label">border</div>
                    <div class="val-top">-</div>
                    <div class="val-left">-</div>
                    <div class="val-right">-</div>
                    <div class="val-bottom">-</div>
                    <div class="box-padding">
                      <div class="label">padding</div>
                      <div class="val-top">-</div>
                      <div class="val-left">-</div>
                      <div class="val-right">-</div>
                      <div class="val-bottom">-</div>
                      <div class="box-content">
                        <div class="val-content">1600 x 3461</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="filter-bar">
                <input placeholder="过滤" />
                <span class="filter-opt">:hov</span>
                <span class="filter-opt">.cls</span>
                <span class="filter-opt">+</span>
              </div>

              <div
                class="style-rule"
                v-for="(rule, idx) in cssRules"
                :key="idx"
              >
                <div class="selector">{{ rule.selector }} {</div>
                <div
                  class="property"
                  v-for="(val, key) in rule.styles"
                  :key="key"
                >
                  <span class="prop-name">{{ key }}</span
                  >: <span class="prop-val">{{ val }}</span
                  >;
                </div>
                <div class="selector">}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Sources Panel -->
        <div v-else-if="activeTab === 'sources'" class="panel sources-panel">
          <div class="file-navigator">
            <div class="nav-header">
              <span class="nav-tab active">Page</span>
              <span class="nav-tab">Filesystem</span>
            </div>
            <div class="file-tree">
              <div class="file-item file">
                <span class="icon">📄</span> index.html
              </div>
              <div class="file-item folder expanded">
                <span class="folder-icon">▼</span>
                <span class="icon">📁</span> src
                <div class="folder-children">
                  <div class="file-item file active">
                    <span class="icon">📄</span> main.js
                  </div>
                  <div class="file-item file">
                    <span class="icon">📄</span> App.vue
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="code-editor">
            <div class="editor-tabs">
              <div class="editor-tab active">
                <span class="icon">📄</span> main.js
                <span class="close">×</span>
              </div>
            </div>
            <div class="editor-content">
              <div class="line-numbers">
                1<br />2<br />3<br />4<br />5<br />6
              </div>
              <div class="code-text">
                <pre>{{ fileContent }}</pre>
              </div>
            </div>
          </div>
          <div class="debugger-sidebar">
            <div class="debug-section">
              <div class="section-title">
                <span class="arrow">▼</span> Watch
              </div>
              <div class="section-content empty">No watch expressions</div>
            </div>
            <div class="debug-section">
              <div class="section-title">
                <span class="arrow">▼</span> Breakpoints
              </div>
              <div class="section-content">
                <label><input type="checkbox" checked /> main.js:12</label>
              </div>
            </div>
            <div class="debug-section">
              <div class="section-title">
                <span class="arrow">▼</span> Scope
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Network Panel -->
        <div v-else-if="activeTab === 'network'" class="panel network-panel">
          <div class="network-toolbar">
            <div class="record-icon">🔴</div>
            <div class="separator"></div>
            <span class="filter-btn active">All</span>
            <span class="filter-btn">Fetch/XHR</span>
            <span class="filter-btn">JS</span>
            <span class="filter-btn">CSS</span>
            <span class="filter-btn">Img</span>
          </div>
          <div class="network-split-view">
            <div class="network-grid">
              <div class="network-grid-header">
                <div class="col name">Name</div>
                <div class="col status">Status</div>
                <div class="col type">Type</div>
                <div class="col size">Size</div>
                <div class="col time">Time</div>
                <div class="col waterfall">Waterfall</div>
              </div>
              <div class="network-rows">
                <div
                  class="network-row"
                  v-for="(req, idx) in networkRequests"
                  :key="idx"
                  :class="{
                    selected: selectedRequest && selectedRequest.id === req.id
                  }"
                  @click="selectRequest(req)"
                >
                  <div class="col name">{{ req.name }}</div>
                  <div class="col status">{{ req.status }}</div>
                  <div class="col type">{{ req.type }}</div>
                  <div class="col size">{{ req.size }}</div>
                  <div class="col time">{{ req.time }}</div>
                  <div class="col waterfall">
                    <div
                      class="waterfall-bar"
                      :style="{
                        width: req.waterfall + 'px',
                        left: idx * 10 + 'px'
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Network Detail Panel (Right Side) -->
            <div class="network-detail" v-if="selectedRequest">
              <div class="detail-header">
                <span
                  class="detail-title"
                  :class="{ active: activeDetailTab === 'headers' }"
                  @click="activeDetailTab = 'headers'"
                  >Headers</span
                >
                <span
                  class="detail-title"
                  :class="{ active: activeDetailTab === 'preview' }"
                  @click="activeDetailTab = 'preview'"
                  >Preview</span
                >
                <span
                  class="detail-title"
                  :class="{ active: activeDetailTab === 'response' }"
                  @click="activeDetailTab = 'response'"
                  >Response</span
                >
                <span class="close-detail" @click="selectedRequest = null"
                  >×</span
                >
              </div>
              <div class="detail-content">
                <div v-if="activeDetailTab === 'headers'">
                  <div class="detail-section">
                    <div class="section-label">General</div>
                    <div class="detail-row">
                      <span class="key">Request URL:</span>
                      <span class="val"
                        >http://localhost:3000/{{ selectedRequest.name }}</span
                      >
                    </div>
                    <div class="detail-row">
                      <span class="key">Request Method:</span>
                      <span class="val">GET</span>
                    </div>
                    <div class="detail-row">
                      <span class="key">Status Code:</span>
                      <span class="val status-code"
                        >{{ selectedRequest.status }} OK</span
                      >
                    </div>
                  </div>
                  <div class="detail-section">
                    <div class="section-label">Response Headers</div>
                    <div
                      class="detail-row"
                      v-for="(val, key) in selectedRequest.headers"
                      :key="key"
                    >
                      <span class="key">{{ key }}:</span>
                      <span class="val">{{ val }}</span>
                    </div>
                  </div>
                  <div
                    class="detail-section"
                    v-if="selectedRequest.requestHeaders"
                  >
                    <div class="section-label">Request Headers</div>
                    <div
                      class="detail-row"
                      v-for="(val, key) in selectedRequest.requestHeaders"
                      :key="key"
                    >
                      <span class="key">{{ key }}:</span>
                      <span class="val">{{ val }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="activeDetailTab === 'preview'">
                  <div class="detail-section">
                    <div class="section-label">Preview</div>
                    <div class="preview-content">
                      {{ selectedRequest.preview }}
                    </div>
                  </div>
                </div>

                <div v-if="activeDetailTab === 'response'">
                  <div class="detail-section">
                    <div class="section-label">Response</div>
                    <div class="preview-content">
                      {{ selectedRequest.preview }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Application Panel -->
        <div
          v-else-if="activeTab === 'application'"
          class="panel application-panel"
        >
          <div class="storage-sidebar">
            <div class="sidebar-section">
              <div class="section-title">Application</div>
              <div class="section-item">Manifest</div>
              <div class="section-item">Service Workers</div>
            </div>
            <div class="sidebar-section">
              <div class="section-title">Storage</div>
              <div class="section-item active">
                <span class="arrow">▼</span> Local Storage
              </div>
              <div class="section-item indent">http://localhost</div>
              <div class="section-item">
                <span class="arrow">▶</span> Session Storage
              </div>
              <div class="section-item">
                <span class="arrow">▶</span> Cookies
              </div>
            </div>
          </div>
          <div class="storage-content">
            <div class="storage-table">
              <div class="table-header">
                <div class="col key">Key</div>
                <div class="col value">Value</div>
              </div>
              <div
                class="table-row"
                v-for="(item, idx) in localStorageData"
                :key="idx"
              >
                <div class="col key">{{ item.key }}</div>
                <div class="col value">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Bar Overlay -->
      <div class="info-bar" v-if="hoverInfo">
        <span class="info-icon">💡</span> {{ hoverInfo }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Base - COMPACT MODE */
.browser-devtools-demo {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #ffffff;
  color: #202124;
  font-family: 'Segoe UI', '.SFNSDisplay', 'Roboto', sans-serif;
  font-size: 11px; /* Smaller font */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 400px; /* Reduced height */
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  user-select: none;
}

/* Demo Controls (Top Bar) */
.demo-controls {
  padding: 6px 12px;
  background: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  height: 32px;
}
.control-label {
  font-weight: 600;
  color: #24292f;
  font-size: 12px;
}
.control-actions {
  display: flex;
  gap: 8px;
}
.tour-select {
  padding: 2px 6px;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  font-size: 11px;
  color: #24292f;
  min-width: 180px;
  cursor: pointer;
}
.stop-btn {
  background: #cf222e;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 11px;
}

/* DevTools Container */
.devtools-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header & Tabs */
.devtools-header {
  background-color: #f3f3f3;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  height: 24px; /* Reduced header height */
  padding: 0 4px;
}
.header-left,
.header-right {
  display: flex;
  align-items: center;
  height: 100%;
}
.icon-btn {
  padding: 0 6px;
  cursor: pointer;
  color: #6e6e6e;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn:hover {
  color: #202124;
  background-color: #eaeaea;
}
.separator {
  width: 1px;
  height: 14px;
  background-color: #ccc;
  margin: 0 6px;
}

.tabs {
  display: flex;
  height: 100%;
  overflow-x: auto;
}
.tab {
  padding: 0 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #5f6368;
  border-bottom: 2px solid transparent;
  height: 100%;
  font-size: 11px;
  white-space: nowrap;
}
.tab:hover {
  background-color: #e8eaed;
  color: #202124;
}
.tab.active {
  color: #1a73e8;
  border-bottom: 2px solid #1a73e8;
  font-weight: 500;
}

/* Body Layout */
.devtools-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  background-color: #fff;
  position: relative;
}
.panel {
  flex: 1;
  display: flex;
  overflow: hidden;
  width: 100%;
}

/* --- 1. Console Panel --- */
.console-panel-layout {
  flex-direction: column;
}
.console-toolbar {
  height: 24px; /* Reduced */
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 4px;
  background: #f1f3f4;
}
.filter-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 2px;
  padding: 0 4px;
  margin: 0 8px;
  flex: 1;
  max-width: 300px;
  height: 18px;
}
.filter-box input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 11px;
}
.dropdown-trigger {
  font-size: 11px;
  color: #5f6368;
  padding: 0 6px;
  cursor: pointer;
}

.console-main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.console-sidebar {
  width: 160px;
  border-right: 1px solid #e0e0e0;
  background: #f3f3f3;
  padding-top: 2px;
}
.sidebar-item {
  display: flex;
  align-items: center;
  padding: 1px 8px;
  cursor: pointer;
  color: #5f6368;
  height: 20px;
}
.sidebar-item:hover {
  background: #e8eaed;
}
.sidebar-item.active {
  background: #d2e3fc;
  color: #1a73e8;
}
.item-icon {
  margin-right: 6px;
  width: 14px;
  text-align: center;
}

.console-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}
.console-output {
  flex: 1;
  overflow-y: auto;
  font-family: Consolas, 'Lucida Console', monospace;
  font-size: 11px;
}
.log-line {
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  padding: 2px 0;
  min-height: 18px;
}
.log-line.error {
  background: #fef0f0;
  border-bottom-color: #ffd6d6;
  color: #d93025;
}
.log-line.warn {
  background: #fff8e1;
  border-bottom-color: #ffeba0;
  color: #5f4b0e;
}
.log-gutter {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  padding-top: 1px;
}
.log-content {
  flex: 1;
  white-space: pre-wrap;
  padding-right: 4px;
  line-height: 1.3;
}
.log-source {
  margin-left: 10px;
  margin-right: 10px;
  text-align: right;
  flex-shrink: 0;
  color: #80868b;
  text-decoration: underline;
  cursor: pointer;
}

.console-input-area {
  display: flex;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  padding: 2px 4px;
  min-height: 22px;
}
.console-input-area .prompt {
  color: #1a73e8;
  margin-right: 6px;
  font-weight: bold;
}
.input-field {
  border: none;
  outline: none;
  flex: 1;
  font-family: Consolas, monospace;
  font-size: 11px;
}

/* Bottom Drawer */
.bottom-drawer {
  height: 120px;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  background: #fff;
}
.bottom-drawer-header {
  height: 24px;
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
}
.drawer-tab {
  padding: 0 12px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #5f6368;
  border-right: 1px solid transparent;
  font-size: 11px;
}
.drawer-tab.active {
  background: #fff;
  color: #202124;
  border-right: 1px solid #ccc;
}
.close-icon {
  margin-left: 6px;
  font-size: 12px;
}
.drawer-content {
  flex: 1;
  overflow: hidden;
}
.search-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.search-bar {
  padding: 4px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 11px;
}
.search-actions {
  color: #5f6368;
  cursor: pointer;
}
.search-results {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.no-results {
  text-align: center;
  color: #5f6368;
}
.no-results-title {
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 4px;
}
.no-results-desc {
  font-size: 11px;
}

/* --- 2. Elements Panel --- */
.elements-panel {
  display: flex;
  flex-direction: row;
}
.dom-tree-panel {
  flex: 2;
  border-right: 1px solid #d0d7de;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 4px 0;
  font-family: Consolas, Menlo, monospace;
  font-size: 12px;
  background: #fff;
}
.dom-node {
  padding-left: 14px;
  line-height: 18px;
  cursor: default;
  white-space: nowrap;
}
.dom-node.selected {
  background-color: #cfe8fc;
}
.line-content {
  display: flex;
  align-items: center;
}
.node-trail {
  color: #5f6368;
  margin-left: 6px;
}
.arrow {
  color: #5f6368;
  font-size: 10px;
  display: inline-block;
  width: 14px;
  margin-left: -14px;
  text-align: center;
}
.tag-name {
  color: #a90d91;
}
.attr-name {
  color: #994500;
  margin-left: 4px;
}
.attr-val {
  color: #1a1aa6;
}
.dots {
  background: #eee;
  border-radius: 2px;
  padding: 0 2px;
  color: #777;
  font-size: 10px;
  margin: 0 2px;
}
.indent {
  display: inline-block;
  width: 14px;
}
.breadcrumbs {
  border-top: 1px solid #ccc;
  padding: 2px 8px;
  font-size: 11px;
  color: #5f6368;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.styles-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #d0d7de;
  min-width: 260px;
}
.styles-tabs {
  display: flex;
  background: #f1f3f4;
  border-bottom: 1px solid #ccc;
  height: 26px;
}
.style-tab {
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: #5f6368;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-size: 11px;
}
.style-tab:hover {
  background-color: #e8eaed;
  color: #202124;
}
.style-tab.active {
  color: #1a73e8;
  border-bottom: 2px solid #1a73e8;
  font-weight: 500;
}
.styles-content {
  padding: 0;
  overflow: auto;
  background: #fff;
  flex: 1;
}

/* Refined Box Model */
.box-model-container {
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 4px;
}
.box-margin {
  background-color: rgba(249, 204, 157, 0.4);
  border: 1px dashed #caaa87;
  padding: 16px; /* Increased padding for values */
  position: relative;
  font-size: 9px;
  color: #222;
}
.box-border {
  background-color: rgba(255, 221, 150, 0.4);
  border: 1px solid #dac689;
  padding: 16px;
  position: relative;
}
.box-padding {
  background-color: rgba(195, 223, 183, 0.4);
  border: 1px dashed #9bc89b;
  padding: 16px;
  position: relative;
}
.box-content {
  background-color: rgba(174, 213, 243, 0.4);
  border: 1px solid #7eb0d8;
  padding: 4px 8px;
  min-width: 60px;
  text-align: center;
}
.label {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 8px;
  color: #555;
  pointer-events: none;
}
/* Positioning values */
.val-top {
  position: absolute;
  top: 2px;
  left: 0;
  right: 0;
  text-align: center;
}
.val-bottom {
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  text-align: center;
}
.val-left {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 2px;
  display: flex;
  align-items: center;
}
.val-right {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 2px;
  display: flex;
  align-items: center;
}

.filter-bar {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 2px 4px;
  margin: 8px;
  background: #fff;
  align-items: center;
}
.filter-bar input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 11px;
}
.filter-opt {
  padding: 0 4px;
  color: #5f6368;
  cursor: pointer;
  font-weight: bold;
  margin-left: 4px;
}

.style-rule {
  margin-bottom: 8px;
  font-family: Consolas, Menlo, monospace;
  font-size: 11px;
  border-bottom: 1px solid #eee;
  padding: 4px 8px 8px 8px;
}
.selector {
  color: #a90d91;
  font-weight: bold;
}
.property {
  padding-left: 14px;
  line-height: 1.4;
}
.prop-name {
  color: #994500;
}
.prop-val {
  color: #222;
}

/* --- 3. Sources Panel --- */
.sources-panel {
  display: flex;
}
.file-navigator {
  width: 180px;
  border-right: 1px solid #ccc;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.nav-header {
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  display: flex;
  height: 24px;
}
.nav-tab {
  padding: 0 8px;
  cursor: pointer;
  color: #5f6368;
  font-size: 11px;
  display: flex;
  align-items: center;
}
.nav-tab.active {
  background: #fff;
  color: #202124;
  border-right: 1px solid #ccc;
}
.file-tree {
  padding: 4px;
  overflow: auto;
  font-family: 'Segoe UI', sans-serif;
  font-size: 11px;
}
.file-item {
  padding: 1px 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.file-item:hover {
  background: #f3f3f3;
}
.file-item.active {
  background: #cfe8fc;
}
.file-item .icon {
  margin-right: 6px;
  opacity: 0.7;
  font-size: 12px;
}
.folder-children {
  padding-left: 16px;
}

.code-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}
.editor-tabs {
  display: flex;
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  height: 24px;
}
.editor-tab {
  padding: 0 8px;
  background: #fff;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #333;
}
.editor-content {
  flex: 1;
  display: flex;
  font-family: Consolas, monospace;
  font-size: 11px;
  overflow: auto;
}
.line-numbers {
  width: 30px;
  background: #f3f3f3;
  border-right: 1px solid #ddd;
  text-align: right;
  padding: 4px;
  color: #999;
  line-height: 1.5;
}
.code-text {
  flex: 1;
  padding: 4px;
  line-height: 1.5;
  color: #222;
}

.debugger-sidebar {
  width: 200px;
  border-left: 1px solid #ccc;
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
}
.debug-section {
  border-bottom: 1px solid #ccc;
}
.section-title {
  padding: 2px 8px;
  background: #e0e0e0;
  font-weight: 700;
  font-size: 11px;
  color: #333;
  cursor: pointer;
}
.section-content {
  padding: 2px 8px;
  background: #fff;
}

/* --- 4. Network Panel --- */
.network-panel {
  display: flex;
  flex-direction: column;
}
.network-toolbar {
  height: 24px;
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
}
.record-icon {
  color: #d93025;
  font-size: 10px;
  cursor: pointer;
}
.filter-btn {
  cursor: pointer;
  padding: 1px 6px;
  border-radius: 2px;
  color: #5f6368;
}
.filter-btn:hover {
  background: #e0e0e0;
  color: #202124;
}
.filter-btn.active {
  background: #cdcdcd;
  font-weight: 600;
  color: #202124;
}

.network-split-view {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.network-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  overflow: hidden;
}
.network-grid-header {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #ccc;
  padding: 1px 0;
  font-weight: bold;
  color: #333;
}
.network-rows {
  flex: 1;
  overflow: auto;
  background: #fff;
}
.network-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 1px 0;
  cursor: default;
}
.network-row:nth-child(even) {
  background: #f9f9f9;
}
.network-row:hover {
  background: #e8f0fe;
}
.network-row.selected {
  background: #cfe8fc;
}

.col {
  padding: 1px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-right: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
}
.col.name {
  width: 140px;
}
.col.status {
  width: 40px;
  color: #5f6368;
}
.col.type {
  width: 60px;
  color: #5f6368;
}
.col.size {
  width: 50px;
  color: #5f6368;
}
.col.time {
  width: 50px;
  color: #5f6368;
}
.col.waterfall {
  flex: 1;
  position: relative;
}
.waterfall-bar {
  height: 6px;
  background: #8ab4f8;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2px;
  border: 1px solid #4285f4;
}

/* Network Detail Panel */
.network-detail {
  width: 300px;
  border-left: 1px solid #ccc;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-size: 11px;
}
.detail-header {
  height: 24px;
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 8px;
}
.detail-title {
  margin-right: 12px;
  color: #5f6368;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  line-height: 22px;
}
.detail-title:hover {
  color: #333;
}
.detail-title.active {
  color: #1a73e8;
  border-bottom: 2px solid #1a73e8;
}
.close-detail {
  margin-left: auto;
  cursor: pointer;
  font-size: 14px;
  color: #5f6368;
}
.detail-content {
  flex: 1;
  overflow: auto;
  padding: 8px;
}
.detail-section {
  margin-bottom: 12px;
}
.section-label {
  font-weight: bold;
  margin-bottom: 4px;
  color: #333;
}
.detail-row {
  display: flex;
  margin-bottom: 2px;
  line-height: 1.4;
  word-break: break-all;
}
.detail-row .key {
  color: #5f6368;
  margin-right: 6px;
  flex-shrink: 0;
  min-width: 80px;
}
.detail-row .val {
  color: #222;
}
.status-code {
  color: #1a73e8;
  font-weight: bold;
}
.preview-content {
  font-family: Consolas, monospace;
  background: #f8f9fa;
  padding: 6px;
  border-radius: 2px;
  border: 1px solid #eee;
  white-space: pre-wrap;
  color: #24292e;
}

/* --- 5. Application Panel --- */
.application-panel {
  display: flex;
}
.storage-sidebar {
  width: 180px;
  border-right: 1px solid #ccc;
  background: #fff;
  padding: 0;
  overflow: auto;
}
.sidebar-section {
  margin-bottom: 8px;
}
.section-title {
  font-weight: bold;
  color: #5f6368;
  padding: 2px 8px;
}
.section-item {
  padding: 1px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
}
.section-item:hover {
  background: #f3f3f3;
}
.section-item.active {
  background: #cfe8fc;
}
.section-item.indent {
  padding-left: 20px;
}
.section-item .arrow {
  margin-right: 4px;
  width: 10px;
}
.storage-content {
  flex: 1;
  background: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.storage-table {
  width: 100%;
  font-size: 11px;
  border-collapse: collapse;
}
.table-header {
  display: flex;
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}
.table-row {
  display: flex;
  border-bottom: 1px solid #eee;
}
.table-row:nth-child(even) {
  background: #f9f9f9;
}
.table-row:hover {
  background: #eef;
}
.storage-table .col {
  padding: 2px 8px;
  border-right: 1px solid #eee;
}
.storage-table .col.key {
  width: 150px;
  font-weight: 600;
}
.storage-table .col.value {
  flex: 1;
  font-family: Consolas, monospace;
}

/* Overlays */
.info-bar {
  background-color: #323232;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  white-space: nowrap;
  pointer-events: none;
}
.info-icon {
  font-size: 14px;
}

.virtual-cursor {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  pointer-events: none;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  margin-top: -5px;
  margin-left: -3px;
}

.highlight-box {
  position: absolute;
  border: 2px solid #1a73e8;
  background-color: rgba(26, 115, 232, 0.15);
  pointer-events: none;
  z-index: 9998;
  box-sizing: border-box;
  transition: all 0.3s ease;
  border-radius: 2px;
}
</style>
