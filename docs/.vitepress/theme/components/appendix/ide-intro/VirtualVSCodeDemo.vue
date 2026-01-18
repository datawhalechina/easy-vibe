<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const files = ref([
  {
    name: 'Welcome',
    language: 'welcome',
    content: '',
    fixed: true
  },
  {
    name: 'pyeval_expression.py',
    language: 'python',
    content: `"""
Expression - defines an infix expression

Uses Operator to break the infix expression down
outputs an RPN string using the shunting yard
Algorithm outlined at https://en.wikipedia.org/wiki/Shunting-yard_algorithm
"""

from pyeval_operator import Operator

class Expression():
    """
    Defines and parses an infix expression string,
    an RPN expression string, or raising an exception
    """
    def __init__(self, expr):
        self.expr = expr
        self.rpn = []
        self.parse()

    def parse(self):
        # Implementation of shunting yard algorithm
        pass
`
  },
  {
    name: 'pyeval_operator.py',
    language: 'python',
    content: `class Operator:
    def __init__(self, symbol, precedence, associativity):
        self.symbol = symbol
        self.precedence = precedence
        self.associativity = associativity
        
    def __repr__(self):
        return f"Operator({self.symbol})"
`
  },
  {
    name: 'README.md',
    language: 'markdown',
    content: `# PyEval

A simple Python expression evaluator.

## Usage

\`\`\`python
from pyeval_expression import Expression
expr = Expression("1 + 2 * 3")
print(expr.evaluate())
\`\`\`
`
  }
])

const activeFileIndex = ref(0)
const activePanel = ref('TERMINAL')
const sidebarVisible = ref(false) // Hidden by default for Welcome experience
const panelVisible = ref(true)

const terminalLines = ref([
  {
    text: '➜  pyeval git:(master) ✗ python3 pyeval_expression.py',
    type: 'command'
  },
  { text: 'Expression initialized.', type: 'output' },
  { text: 'Parsing...', type: 'output' }
])

const activeFile = computed(() => files.value[activeFileIndex.value])

const selectFile = (index) => {
  activeFileIndex.value = index
  // Show sidebar if a code file is selected, or keep user preference?
  // VS Code usually keeps sidebar state.
  if (files.value[index].language !== 'welcome' && !sidebarVisible.value) {
    sidebarVisible.value = true
  }
}

const closeTab = (index) => {
  if (files.value[index].fixed) return
  // Logic to close tab
  // For demo, maybe just switch to welcome if current is closed
  if (index === activeFileIndex.value) {
    activeFileIndex.value = 0
  }
}

const activeSidebarView = ref('EXPLORER') // 'EXPLORER' | 'EXTENSIONS'
const extensions = ref([
  {
    id: 'python',
    name: 'Python',
    description: 'IntelliSense, linting, debugging...',
    installed: false,
    installing: false
  },
  {
    id: 'cpp',
    name: 'C/C++',
    description: 'C/C++ IntelliSense, debugging...',
    installed: false,
    installing: false
  },
  {
    id: 'vue',
    name: 'Vue - Official',
    description: 'Language support for Vue 3',
    installed: false,
    installing: false
  }
])

const searchQuery = ref('')

const typeText = async (text, setter) => {
  for (let i = 0; i < text.length; i++) {
    setter(text.substring(0, i + 1))
    await new Promise((r) => setTimeout(r, 100)) // typing speed
  }
}

const filteredExtensions = computed(() => {
  if (!searchQuery.value) return extensions.value
  const query = searchQuery.value.toLowerCase()
  return extensions.value.filter(
    (ext) =>
      ext.name.toLowerCase().includes(query) ||
      ext.description.toLowerCase().includes(query)
  )
})

const installExtension = (id) => {
  const ext = extensions.value.find((e) => e.id === id)
  if (ext && !ext.installed && !ext.installing) {
    ext.installing = true
    setTimeout(() => {
      ext.installing = false
      ext.installed = true
    }, 1500)
  }
}

const toggleSidebarView = (view) => {
  if (activeSidebarView.value === view && sidebarVisible.value) {
    sidebarVisible.value = false
  } else {
    activeSidebarView.value = view
    sidebarVisible.value = true
  }
}

const togglePanel = () => {
  panelVisible.value = !panelVisible.value
}

// Menu System
const activeMenu = ref(null)
const menus = {
  File: [
    { label: 'New File', info: '新建文件：创建空文件' },
    { label: 'Open File...', info: '打开文件：选择文件' },
    { label: 'Save', info: '保存：保存修改' },
    { label: 'Save As...', info: '另存为：保存为新文件' },
    { label: 'Auto Save', info: '自动保存：开启自动保存' },
    { label: 'Preferences', info: '首选项：设置主题等' },
    { label: 'Exit', info: '退出：关闭 VS Code' }
  ],
  Edit: [
    { label: 'Undo', info: '撤销：撤回操作' },
    { label: 'Redo', info: '重做：恢复操作' },
    { label: 'Cut', info: '剪切：剪切选中' },
    { label: 'Copy', info: '复制：复制选中' },
    { label: 'Paste', info: '粘贴：粘贴内容' },
    { label: 'Find', info: '查找：搜索内容' },
    { label: 'Replace', info: '替换：替换内容' }
  ],
  Selection: [
    { label: 'Select All', info: '全选：选中所有' },
    { label: 'Expand Selection', info: '扩展选区：扩大范围' },
    { label: 'Shrink Selection', info: '缩小选区：缩小范围' }
  ],
  View: [
    { label: 'Command Palette...', info: '命令面板：执行命令' },
    { label: 'Open View...', info: '打开视图：显示窗口' },
    { label: 'Appearance', info: '外观：调整显示' },
    { label: 'Editor Layout', info: '布局：调整分屏' }
  ],
  Go: [
    { label: 'Back', info: '后退：上个位置' },
    { label: 'Forward', info: '前进：下个位置' },
    { label: 'Go to File...', info: '转到文件：快速打开' },
    { label: 'Go to Symbol...', info: '转到符号：跳转定义' }
  ],
  Debug: [
    { label: 'Start Debugging', info: '开始调试：运行并调试' },
    { label: 'Run Without Debugging', info: '运行：直接运行' },
    { label: 'Stop Debugging', info: '停止：结束调试' }
  ],
  Terminal: [
    { label: 'New Terminal', info: '新建终端：打开命令行' },
    { label: 'Split Terminal', info: '拆分终端：并排显示' },
    { label: 'Run Task...', info: '运行任务：执行任务' }
  ],
  Help: [
    { label: 'Welcome', info: '欢迎页：入门指南' },
    { label: 'Documentation', info: '文档：查看文档' },
    { label: 'Show Release Notes', info: '发行说明：版本更新' },
    { label: 'About', info: '关于：版本信息' }
  ]
}

const toggleMenu = (menuName) => {
  if (activeMenu.value === menuName) {
    activeMenu.value = null
  } else {
    activeMenu.value = menuName
  }
}

const closeMenu = () => {
  activeMenu.value = null
}

// Handle clicks outside to close menu
const handleClickOutside = (event) => {
  if (activeMenu.value && !event.target.closest('.menu-bar-container')) {
    activeMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const hoverInfo = ref('')
const showInfo = (text) => {
  if (isAutoPlaying.value) return // 自动播放时禁止鼠标干扰
  hoverInfo.value = text
}
const clearInfo = () => {
  if (isAutoPlaying.value) return
  hoverInfo.value = ''
}

// Auto Tour Logic
const isAutoPlaying = ref(false)
const cursorX = ref(0)
const cursorY = ref(0)
const cursorVisible = ref(false)
let tourTimeout = null

const vscodeMockRef = ref(null)

const highlightStyle = ref({
  top: '0px',
  left: '0px',
  width: '0px',
  height: '0px'
})
const highlightVisible = ref(false)

const tourOptions = [
  { label: '全功能演示 (Full Tour)', value: 'all' },
  { label: '界面导航 (Interface Navigation)', value: 'navigation' },
  { label: '插件安装 (Extensions)', value: 'extensions' },
  { label: '代码编辑 (Code Editing)', value: 'editor' },
  { label: '调试与终端 (Debug & Terminal)', value: 'debug' }
]
const selectedTour = ref('all')
const selectOpen = ref(false)

const currentTourLabel = computed(() => {
  return (
    tourOptions.find((o) => o.value === selectedTour.value)?.label ||
    '选择演示模式'
  )
})

const selectTour = (val) => {
  selectedTour.value = val
  selectOpen.value = false
}

const closeSelect = () => {
  selectOpen.value = false
}

// Custom directive for clicking outside
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}

const startTour = async () => {
  if (isAutoPlaying.value) return
  isAutoPlaying.value = true
  cursorVisible.value = true

  // Reset UI state to ensure all elements are visible
  activeFileIndex.value = 0
  activePanel.value = 'TERMINAL'
  sidebarVisible.value = false
  panelVisible.value = true
  activeMenu.value = null
  hoverInfo.value = ''
  searchQuery.value = '' // Reset search
  activeSidebarView.value = 'EXPLORER' // Reset sidebar view

  const container = vscodeMockRef.value
  if (!container) return

  const moveCursorTo = (selector, infoText, action = null) => {
    return new Promise((resolve) => {
      if (action) action()

      // Small delay to allow UI updates (like opening menus)
      setTimeout(() => {
        const el = container.querySelector(selector)
        if (el) {
          // Recalculate container rect in case of scroll
          const containerRect = container.getBoundingClientRect()
          const rect = el.getBoundingClientRect()

          // Calculate relative position
          cursorX.value = rect.left - containerRect.left + rect.width / 2
          cursorY.value = rect.top - containerRect.top + rect.height / 2

          // Update highlight box
          // Use box-sizing: border-box in CSS
          // Match exact size (border will be drawn inside the element area)
          highlightStyle.value = {
            top: rect.top - containerRect.top + 'px',
            left: rect.left - containerRect.left + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px'
          }
          highlightVisible.value = true

          hoverInfo.value = infoText
        } else {
          // Fallback if element not found: just proceed after delay
          // This prevents the tour from hanging forever
          console.warn(`Tour element not found: ${selector}`)
        }

        tourTimeout = setTimeout(
          () => {
            highlightVisible.value = false
            resolve()
          },
          el ? 2500 : 500
        ) // Shorter delay if skipped
      }, 800) // Increased delay for better stability
    })
  }

  // --- Tour Segments ---

  const runTitleBarTour = async () => {
    // --- 1. Top Title Bar Area ---
    await moveCursorTo('.vscode-logo', 'VS Code 徽标：主菜单')
    if (!isAutoPlaying.value) return

    // Menus
    await moveCursorTo('.menu-bar-container', '菜单栏：所有功能')
    if (!isAutoPlaying.value) return

    // Demonstrate clicking a menu
    await moveCursorTo('.menu-item:nth-child(1)', '文件菜单：文件操作', () =>
      toggleMenu('File')
    )
    if (!isAutoPlaying.value) return

    // Show a specific item in the dropdown
    await moveCursorTo('.dropdown-item:nth-child(1)', '新建文件：创建空文件')
    if (!isAutoPlaying.value) return

    // Close menu
    activeMenu.value = null
    await new Promise((r) => setTimeout(r, 500))

    await moveCursorTo('.nav-arrows', '导航按钮：后退/前进')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.search-box', '命令中心：快速搜索')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.layout-controls', '布局控制：切换视图')
  }

  const runActivityBarTour = async () => {
    // --- 2. Activity Bar (Left) ---
    await moveCursorTo('.activity-bar', '活动栏：切换视图')
    if (!isAutoPlaying.value) return

    await moveCursorTo(
      '.icon[title="Explorer"]',
      '资源管理器：管理文件',
      () => {
        sidebarVisible.value = true
      }
    )
    if (!isAutoPlaying.value) return

    await moveCursorTo('.icon[title="Search"]', '全局搜索：查找替换')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.icon[title="Source Control"]', '源代码管理：Git')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.icon[title="Run and Debug"]', '运行和调试：调试代码')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.icon[title="Extensions"]', '扩展商店：安装插件')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.icon[title="Accounts"]', '账户：同步设置')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.icon[title="Manage"]', '管理：全局设置')
  }

  const runSidebarTour = async () => {
    // --- 3. Sidebar ---
    if (!sidebarVisible.value) {
      sidebarVisible.value = true
      await new Promise((r) => setTimeout(r, 300))
    }

    await moveCursorTo('.sidebar', '侧边栏：详细内容')
    if (!isAutoPlaying.value) return

    await moveCursorTo(
      '.sidebar-section:nth-child(2)',
      '打开的编辑器：编辑中文件'
    )
    if (!isAutoPlaying.value) return

    await moveCursorTo('.sidebar-section:nth-child(3)', '项目文件树：项目结构')
  }

  const runEditorTour = async () => {
    // Force switch to code file for better demonstration
    const codeFileIndex = files.value.findIndex(
      (f) => f.name === 'pyeval_expression.py'
    )
    if (codeFileIndex !== -1 && activeFileIndex.value !== codeFileIndex) {
      selectFile(codeFileIndex)
      await new Promise((r) => setTimeout(r, 800)) // Wait for DOM update
    }

    // --- 4. Editor Area ---
    await moveCursorTo('.tabs', '标签页：已打开文件')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.breadcrumbs', '路径导航：文件路径')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.code-wrapper', '编辑区：编写代码')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.minimap', '缩略图：预览代码')
  }

  const runPanelTour = async () => {
    // --- 5. Bottom Panel ---
    await moveCursorTo('.bottom-panel', '底部面板：集成工具')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.panel-tabs', '面板切换：切换工具')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.terminal-content', '终端：运行命令')
  }

  const runStatusTour = async () => {
    // --- 6. Status Bar ---
    await moveCursorTo('.status-bar', '状态栏：全局信息')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.status-left', '左侧信息：Git/错误')
    if (!isAutoPlaying.value) return

    await moveCursorTo('.status-right', '右侧信息：环境信息')
  }

  try {
    const mode = selectedTour.value

    if (mode === 'all' || mode === 'navigation') {
      await runTitleBarTour()
      if (!isAutoPlaying.value) return
      await runActivityBarTour()
      if (!isAutoPlaying.value) return
    }

    if (mode === 'all' || mode === 'extensions') {
      // --- Extensions Tour ---
      await moveCursorTo(
        '.icon[title="Extensions"]',
        '扩展商店：安装插件',
        () => toggleSidebarView('EXTENSIONS')
      )
      if (!isAutoPlaying.value) return

      await moveCursorTo(
        '.sidebar-search input',
        '搜索插件：输入 python',
        async () => {
          await typeText('python', (v) => (searchQuery.value = v))
        }
      )
      if (!isAutoPlaying.value) return

      await moveCursorTo(
        '.extension-item:first-child .install-btn',
        '点击安装：一键安装插件',
        () => installExtension('python')
      )
      if (!isAutoPlaying.value) return

      // Switch back to explorer for next steps if in 'all' mode
      if (mode === 'all') {
        await moveCursorTo('.icon[title="Explorer"]', '返回资源管理器', () => {
          toggleSidebarView('EXPLORER')
          searchQuery.value = '' // Clear search when leaving
        })
      }
    }

    if (mode === 'all' || mode === 'editor') {
      await runSidebarTour()
      if (!isAutoPlaying.value) return
      await runEditorTour()
      if (!isAutoPlaying.value) return
    }

    if (mode === 'all' || mode === 'debug') {
      await runPanelTour()
      if (!isAutoPlaying.value) return
      await runStatusTour()
      if (!isAutoPlaying.value) return
    }

    // Finish
    stopTour()
  } catch (e) {
    console.error(e)
    stopTour()
  }
}

const stopTour = () => {
  isAutoPlaying.value = false
  cursorVisible.value = false
  highlightVisible.value = false
  activeMenu.value = null
  hoverInfo.value = '演示结束'
  if (tourTimeout) clearTimeout(tourTimeout)
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (tourTimeout) clearTimeout(tourTimeout)
})
</script>

<template>
  <div class="demo-wrapper">
    <!-- External Controls -->
    <div class="demo-controls">
      <h3 class="demo-title">虚拟 IDE 交互演示</h3>

      <div class="tour-controls" v-if="!isAutoPlaying">
        <!-- Custom Select -->
        <div
          class="custom-select"
          :class="{ open: selectOpen }"
          @click="selectOpen = !selectOpen"
          v-click-outside="closeSelect"
        >
          <div class="select-trigger">
            <span>{{ currentTourLabel }}</span>
            <span class="arrow">▼</span>
          </div>
          <div class="select-options" v-if="selectOpen">
            <div
              v-for="opt in tourOptions"
              :key="opt.value"
              class="select-option"
              :class="{ selected: selectedTour === opt.value }"
              @click.stop="selectTour(opt.value)"
            >
              {{ opt.label }}
            </div>
          </div>
        </div>

        <button class="tour-btn" @click="startTour">▶ 开始自动导览</button>
      </div>
      <button class="tour-btn stop" @click="stopTour" v-else>■ 停止演示</button>
    </div>

    <!-- Info Bar (Text Only) -->
    <div class="info-bar">
      <div class="info-content">
        <span class="info-icon">ℹ️</span>
        {{ hoverInfo || '悬停查看功能说明' }}
      </div>
    </div>

    <div class="vscode-mock" ref="vscodeMockRef">
      <!-- Virtual Cursor -->
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
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19823L11.4818 12.3673H5.65376Z"
            fill="white"
            stroke="black"
          />
        </svg>
      </div>

      <!-- Highlight Box for Auto Tour -->
      <div
        class="highlight-box"
        v-if="highlightVisible"
        :style="highlightStyle"
      ></div>

      <!-- Combined Title Bar -->
      <div
        class="title-bar"
        @mouseenter.stop="showInfo('标题栏：全局控制')"
        @mouseleave="clearInfo"
      >
        <div class="title-bar-left">
          <div
            class="vscode-logo"
            @mouseenter.stop="showInfo('VS Code 徽标')"
            @mouseleave="clearInfo"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 12L7 2L22 12L7 22L2 12Z" fill="#007ACC" />
              <path d="M17 12L7 5V19L17 12Z" fill="white" />
            </svg>
          </div>
          <div
            class="menu-bar-container"
            @mouseenter.stop="showInfo('菜单栏：功能入口')"
            @mouseleave="clearInfo"
          >
            <div
              v-for="(items, name) in menus"
              :key="name"
              class="menu-item-wrapper"
            >
              <span
                class="menu-item"
                :class="{ active: activeMenu === name }"
                @click.stop="toggleMenu(name)"
              >
                {{ name }}
              </span>
              <div v-if="activeMenu === name" class="menu-dropdown">
                <div
                  v-for="item in items"
                  :key="item.label"
                  class="dropdown-item"
                  @click="closeMenu"
                  @mouseenter.stop="showInfo(item.info)"
                  @mouseleave="clearInfo"
                >
                  {{ item.label }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="title-bar-center">
          <div
            class="nav-arrows"
            @mouseenter.stop="showInfo('导航：后退/前进')"
            @mouseleave="clearInfo"
          >
            <span class="nav-arrow">←</span>
            <span class="nav-arrow">→</span>
          </div>
          <div
            class="search-box"
            @mouseenter.stop="showInfo('命令中心：搜索')"
            @mouseleave="clearInfo"
          >
            <span class="search-icon">🔍</span>
            <span class="search-placeholder">pyeval</span>
          </div>
        </div>

        <div class="title-bar-right">
          <div
            class="layout-controls"
            @mouseenter.stop="showInfo('布局控制：切换视图')"
            @mouseleave="clearInfo"
          >
            <span
              class="layout-icon"
              @click="toggleSidebarView(activeSidebarView)"
              title="Toggle Sidebar"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 2h12v12H2V2zm11 11V3H3v10h10z" />
                <path d="M3 3v10h3V3H3z" />
              </svg>
            </span>
            <span class="layout-icon" @click="togglePanel" title="Toggle Panel">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 2h12v12H2V2zm11 11V3H3v10h10z" />
                <path d="M3 10v3h10v-3H3z" />
              </svg>
            </span>
          </div>
          <div
            class="window-controls"
            @mouseenter.stop="showInfo('窗口控制')"
            @mouseleave="clearInfo"
          >
            <span class="win-btn minimize">─</span>
            <span class="win-btn maximize">☐</span>
            <span class="win-btn close">✕</span>
          </div>
        </div>
      </div>

      <div class="main-layout">
        <!-- Activity Bar -->
        <div
          class="activity-bar"
          @mouseenter.stop="showInfo('活动栏：切换视图')"
          @mouseleave="clearInfo"
        >
          <div class="top-icons">
            <div
              class="icon"
              :class="{
                active: activeSidebarView === 'EXPLORER' && sidebarVisible
              }"
              title="Explorer"
              @click="toggleSidebarView('EXPLORER')"
              @mouseenter.stop="showInfo('资源管理器：文件管理')"
              @mouseleave="clearInfo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="icon"
              title="Search"
              @mouseenter.stop="showInfo('全局搜索：查找替换')"
              @mouseleave="clearInfo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="icon"
              title="Source Control"
              @mouseenter.stop="showInfo('源代码管理：Git')"
              @mouseleave="clearInfo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="18"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M6 9C6 9 12 7 12 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="6"
                  cy="6"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div
              class="icon"
              title="Run and Debug"
              @mouseenter.stop="showInfo('运行和调试：调试')"
              @mouseleave="clearInfo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11C19 11 19 13.15 17.5 14.65C16 16.15 14 17 14 17V21H10V17C10 17 8 16.15 6.5 14.65C5 13.15 5 11 5 11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 3V7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 11H2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 11H19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 7L19.5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.5 7L4.5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="icon"
              :class="{
                active: activeSidebarView === 'EXTENSIONS' && sidebarVisible
              }"
              title="Extensions"
              @click="toggleSidebarView('EXTENSIONS')"
              @mouseenter.stop="showInfo('扩展：插件')"
              @mouseleave="clearInfo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4H4V10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 10V4H14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 20H20V14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 14V20H10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect
                  x="11"
                  y="11"
                  width="6"
                  height="6"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
              </svg>
            </div>
          </div>
          <div class="bottom-icons">
            <div
              class="icon"
              title="Accounts"
              @mouseenter.stop="showInfo('账户：同步')"
              @mouseleave="clearInfo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="icon"
              title="Manage"
              @mouseenter.stop="showInfo('管理：设置')"
              @mouseleave="clearInfo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.4 15C20.3 14.6 20.9 13.8 20.9 12.8C20.9 11.8 20.3 11 19.4 10.6L19 10.4C18.8 10.3 18.7 10 18.7 9.8C18.7 9.6 18.7 9.4 18.8 9.2L19.2 8.4C19.6 7.5 19.4 6.5 18.6 5.9L18 5.4C17.2 4.8 16.1 4.8 15.4 5.5L14.9 6C14.7 6.2 14.5 6.2 14.3 6.2C14.1 6.2 13.9 6.1 13.7 6L13.2 5.3C12.8 4.5 11.9 4 11 4H10C9.1 4 8.2 4.5 7.8 5.3L7.3 6C7.1 6.1 6.9 6.2 6.7 6.2C6.5 6.2 6.3 6.2 6.1 6L5.6 5.5C4.9 4.8 3.8 4.8 3 5.4L2.4 5.9C1.6 6.5 1.4 7.5 1.8 8.4L2.2 9.2C2.3 9.4 2.3 9.6 2.3 9.8C2.3 10 2.2 10.3 2 10.4L1.6 10.6C0.7 11 0.1 11.8 0.1 12.8C0.1 13.8 0.7 14.6 1.6 15L2 15.2C2.2 15.3 2.3 15.5 2.3 15.7C2.3 15.9 2.2 16.1 2.2 16.3L1.8 17.1C1.4 18 1.6 19 2.4 19.6L3 20.1C3.8 20.7 4.9 20.7 5.6 20L6.1 19.5C6.3 19.3 6.5 19.3 6.7 19.3C6.9 19.3 7.1 19.4 7.3 19.5L7.8 20.2C8.2 21 9.1 21.5 10 21.5H11C11.9 21.5 12.8 21 13.2 20.2L13.7 19.5C13.9 19.4 14.1 19.3 14.3 19.3C14.5 19.3 14.7 19.3 14.9 19.5L15.4 20C16.1 20.7 17.2 20.7 18 20.1L18.6 19.6C19.4 19 19.6 18 19.2 17.1L18.8 16.3C18.7 16.1 18.7 15.9 18.7 15.7C18.7 15.5 18.8 15.3 19 15.2L19.4 15Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div
          class="sidebar"
          v-show="sidebarVisible"
          @mouseenter.stop="showInfo('侧边栏：详细内容')"
          @mouseleave="clearInfo"
        >
          <div v-if="activeSidebarView === 'EXPLORER'" class="sidebar-content">
            <div class="sidebar-header">
              <span>EXPLORER</span>
              <span class="sidebar-dots">•••</span>
            </div>

            <div class="sidebar-section expanded">
              <div class="section-header">▼ OPEN EDITORS</div>
              <div class="file-list">
                <div
                  v-if="activeFile.language !== 'welcome'"
                  class="file-item active-editor"
                  @click="selectFile(activeFileIndex)"
                >
                  <span class="file-icon">🐍</span>
                  <span class="file-name">{{ activeFile.name }}</span>
                  <span class="unsaved-dot">●</span>
                </div>
                <div v-else class="empty-list-item">No open editors</div>
              </div>
            </div>

            <div class="sidebar-section expanded">
              <div class="section-header">▼ PYEVAL</div>
              <div class="file-list">
                <div
                  v-for="(file, index) in files"
                  :key="file.name"
                  v-show="!file.fixed"
                  class="file-item"
                  :class="{ active: index === activeFileIndex }"
                  @click="selectFile(index)"
                >
                  <span class="file-icon">
                    <span v-if="file.language === 'html'" style="color: #e34c26"
                      >📄</span
                    >
                    <span
                      v-else-if="file.language === 'css'"
                      style="color: #563d7c"
                      >🎨</span
                    >
                    <span
                      v-else-if="file.language === 'python'"
                      style="color: #3776ab"
                      >🐍</span
                    >
                    <span
                      v-else-if="file.language === 'markdown'"
                      style="color: #42a5f5"
                      >📝</span
                    >
                    <span v-else style="color: #f1e05a">JS</span>
                  </span>
                  <span class="file-name">{{ file.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="activeSidebarView === 'EXTENSIONS'"
            class="sidebar-content"
          >
            <div class="sidebar-header">
              <span>EXTENSIONS</span>
              <span class="sidebar-dots">•••</span>
            </div>
            <div class="sidebar-search">
              <input
                type="text"
                placeholder="Search Extensions in Marketplace"
                :value="searchQuery"
                readonly
              />
            </div>
            <div class="sidebar-section expanded">
              <div class="section-header">▼ POPULAR</div>
              <div class="extension-list">
                <div
                  v-for="ext in filteredExtensions"
                  :key="ext.id"
                  class="extension-item"
                >
                  <div class="extension-icon"></div>
                  <div class="extension-info">
                    <div class="extension-name">
                      {{ ext.name }}
                      <span v-if="ext.installed" class="installed-badge"
                        >✔</span
                      >
                    </div>
                    <div class="extension-desc">{{ ext.description }}</div>
                    <div class="extension-actions">
                      <button
                        class="install-btn"
                        :class="{
                          installing: ext.installing,
                          installed: ext.installed
                        }"
                        @click.stop="installExtension(ext.id)"
                      >
                        {{
                          ext.installed
                            ? 'Manage'
                            : ext.installing
                              ? 'Installing'
                              : 'Install'
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Editor Area -->
        <div class="editor-area">
          <!-- Tabs -->
          <div
            class="tabs-container"
            @mouseenter.stop="showInfo('标签页：切换文件')"
            @mouseleave="clearInfo"
          >
            <div class="tabs">
              <div
                v-for="(file, index) in files"
                :key="file.name"
                class="tab"
                :class="{ active: index === activeFileIndex }"
                @click="selectFile(index)"
              >
                <span class="tab-icon">
                  <span v-if="file.language === 'welcome'">👋</span>
                  <span
                    v-else-if="file.language === 'python'"
                    style="color: #3776ab"
                    >🐍</span
                  >
                  <span
                    v-else-if="file.language === 'markdown'"
                    style="color: #42a5f5"
                    >📝</span
                  >
                  <span v-else>📄</span>
                </span>
                <span class="tab-name">{{ file.name }}</span>
                <span class="close-tab" @click.stop="closeTab(index)">×</span>
              </div>
            </div>
            <div class="tab-actions">
              <span class="action-btn" title="Open Changes">🔃</span>
              <span class="action-btn" title="Split Editor">◫</span>
              <span class="action-btn" title="More Actions">•••</span>
            </div>
          </div>

          <!-- Breadcrumbs (Hidden for Welcome) -->
          <div
            class="breadcrumbs"
            v-if="activeFile.language !== 'welcome'"
            @mouseenter.stop="showInfo('路径导航：文件路径')"
            @mouseleave="clearInfo"
          >
            <span>pyeval</span>
            <span class="separator">›</span>
            <span>{{ activeFile.name }}</span>
            <span class="separator">›</span>
            <span v-if="activeFile.language === 'python'">Expression</span>
          </div>

          <div
            class="editor-main"
            @mouseenter.stop="showInfo('编辑区：编写代码')"
            @mouseleave="clearInfo"
          >
            <!-- Welcome Content -->
            <div
              class="welcome-content"
              v-if="activeFile.language === 'welcome'"
            >
              <div class="welcome-container">
                <div class="welcome-header">
                  <h1>Visual Studio Code</h1>
                  <p class="subtitle">Editing evolved</p>
                </div>
                <div class="welcome-grid">
                  <div class="welcome-column">
                    <h3>Start</h3>
                    <div class="welcome-action">
                      <span class="action-icon">📄</span>
                      <span class="action-text">New File...</span>
                    </div>
                    <div class="welcome-action">
                      <span class="action-icon">📂</span>
                      <span class="action-text">Open File...</span>
                    </div>
                    <div class="welcome-action">
                      <span class="action-icon">📁</span>
                      <span class="action-text">Open Folder...</span>
                    </div>
                    <div class="welcome-action">
                      <span class="action-icon">🌿</span>
                      <span class="action-text">Clone Git Repository...</span>
                    </div>
                    <h3 class="mt-4">Recent</h3>
                    <div class="recent-item">
                      <span class="recent-path"
                        >pyeval/pyeval_expression.py</span
                      >
                      <span class="recent-detail">~/projects/pyeval</span>
                    </div>
                    <div class="recent-item">
                      <span class="recent-path">easy-vibe/docs</span>
                      <span class="recent-detail">~/projects/easy-vibe</span>
                    </div>
                  </div>
                  <div class="welcome-column">
                    <h3>Walkthroughs</h3>
                    <div class="walkthrough-card">
                      <div class="walkthrough-icon">⭐</div>
                      <div class="walkthrough-info">
                        <div class="walkthrough-title">
                          Get Started with VS Code
                        </div>
                        <div class="walkthrough-desc">
                          Discover the best customizations to make VS Code
                          yours.
                        </div>
                      </div>
                    </div>
                    <div class="walkthrough-card">
                      <div class="walkthrough-icon">🐍</div>
                      <div class="walkthrough-info">
                        <div class="walkthrough-title">
                          Get Started with Python
                        </div>
                        <div class="walkthrough-desc">
                          Set up your Python environment.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Code Content -->
            <div class="code-content" v-else>
              <div class="line-numbers">
                <div v-for="n in 20" :key="n">{{ n }}</div>
              </div>
              <div class="code-wrapper">
                <pre><code>{{ activeFile.content }}</code></pre>
              </div>
              <!-- Minimap -->
              <div
                class="minimap"
                @mouseenter.stop="showInfo('缩略图：快速跳转')"
                @mouseleave="clearInfo"
              >
                <div class="minimap-slider"></div>
                <div
                  v-for="n in 40"
                  :key="n"
                  class="minimap-line"
                  :style="{
                    width: Math.random() * 80 + '%',
                    opacity: Math.random() * 0.5 + 0.3
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Panel -->
      <div
        class="bottom-panel"
        v-if="panelVisible"
        @mouseenter.stop="showInfo('底部面板：集成工具')"
        @mouseleave="clearInfo"
      >
        <div class="panel-header">
          <div class="panel-tabs">
            <span
              class="panel-tab"
              :class="{ active: activePanel === 'PROBLEMS' }"
              @click="activePanel = 'PROBLEMS'"
              @mouseenter.stop="showInfo('问题面板：错误警告')"
              @mouseleave="clearInfo"
              >PROBLEMS <span class="badge">0</span></span
            >
            <span
              class="panel-tab"
              :class="{ active: activePanel === 'OUTPUT' }"
              @click="activePanel = 'OUTPUT'"
              @mouseenter.stop="showInfo('输出面板：日志')"
              @mouseleave="clearInfo"
              >OUTPUT</span
            >
            <span
              class="panel-tab"
              :class="{ active: activePanel === 'DEBUG CONSOLE' }"
              @click="activePanel = 'DEBUG CONSOLE'"
              @mouseenter.stop="showInfo('调试控制台')"
              @mouseleave="clearInfo"
              >DEBUG CONSOLE</span
            >
            <span
              class="panel-tab"
              :class="{ active: activePanel === 'TERMINAL' }"
              @click="activePanel = 'TERMINAL'"
              @mouseenter.stop="showInfo('终端：命令行')"
              @mouseleave="clearInfo"
              >TERMINAL</span
            >
          </div>
          <div
            class="panel-actions"
            @mouseenter.stop="showInfo('面板操作')"
            @mouseleave="clearInfo"
          >
            <span class="action-btn">➕</span>
            <span class="action-btn">🗑️</span>
            <span class="action-btn" @click="panelVisible = false">×</span>
          </div>
        </div>
        <div class="panel-body">
          <div v-if="activePanel === 'TERMINAL'" class="terminal-content">
            <div v-for="(line, i) in terminalLines" :key="i" :class="line.type">
              {{ line.text }}
            </div>
            <div class="cursor-line">
              ➜ pyeval git:(master) ✗ <span class="cursor">_</span>
            </div>
          </div>
          <div v-else class="empty-panel">
            No content to display in {{ activePanel }}.
          </div>
        </div>
      </div>

      <!-- Status Bar -->
      <div
        class="status-bar"
        @mouseenter.stop="showInfo('状态栏：环境信息')"
        @mouseleave="clearInfo"
      >
        <div class="status-left">
          <span class="status-item"><span class="icon">🔃</span> master*</span>
          <span class="status-item"
            ><span class="icon">ⓧ</span> 0 <span class="icon">⚠</span> 0</span
          >
        </div>
        <div class="status-right">
          <span class="status-item">Ln 119, Col 71</span>
          <span class="status-item">Spaces: 4</span>
          <span class="status-item">UTF-8</span>
          <span class="status-item">LF</span>
          <span class="status-item">{{
            activeFile.language === 'python' ? 'Python 3.8.5' : 'Markdown'
          }}</span>
          <span class="status-item notification">🔔</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-wrapper {
  max-width: 900px;
  margin: 20px auto;
  font-family: 'Segoe UI', 'SF Pro Text', Helvetica, Arial, sans-serif;
}

.demo-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 4px;
  flex-wrap: wrap;
  gap: 10px;
}

.tour-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative; /* Context for dropdown */
}

/* Custom Select Styles */
.custom-select {
  position: relative;
  width: 240px;
  font-size: 13px;
  font-family: 'Segoe UI', sans-serif;
  user-select: none;
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  background: #f3f3f3;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
}

.select-trigger:hover {
  background: #e8e8e8;
  border-color: #d1d1d1;
}

.custom-select.open .select-trigger {
  border-color: #007acc;
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
}

.arrow {
  font-size: 10px;
  color: #666;
  margin-left: 8px;
  transition: transform 0.2s;
}

.custom-select.open .arrow {
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 4px;
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  padding: 4px 0;
}

.select-option {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.1s;
  color: #333;
}

.select-option:hover {
  background: #f0f0f0;
}

.select-option.selected {
  background: #e6f7ff;
  color: #007acc;
  font-weight: 500;
}

/* Dark mode adaptation for custom select */
:root.dark .select-trigger {
  background: #252526;
  border-color: #3c3c3c;
  color: #cccccc;
}
:root.dark .select-trigger:hover {
  background: #2a2d2e;
}
:root.dark .custom-select.open .select-trigger {
  border-color: #007acc;
}
:root.dark .select-options {
  background: #252526;
  border-color: #454545;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
:root.dark .select-option {
  color: #cccccc;
}
:root.dark .select-option:hover {
  background: #2a2d2e;
}
:root.dark .select-option.selected {
  background: #094771;
  color: white;
}

.demo-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
/* Dark mode adaptation for title */
:root.dark .demo-title {
  color: #e1e1e1;
}

.info-bar {
  background: #007acc;
  color: white;
  padding: 0 12px;
  font-size: 13px;
  transition: all 0.2s ease;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center; /* Centered content since button is moved */
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  position: relative;
  border-radius: 6px;
  margin-bottom: 8px;
}
.info-content {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.tour-btn {
  background: linear-gradient(135deg, #007acc 0%, #005999 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 122, 204, 0.3);
}

.tour-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 122, 204, 0.4);
}
.tour-btn.stop {
  background: #e51400;
}
.tour-btn.stop:hover {
  background: #b41000;
}
.info-icon {
  margin-right: 8px;
  font-size: 14px;
}

.virtual-cursor {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.vscode-mock {
  display: flex;
  flex-direction: column;
  height: 500px;
  border: 1px solid #2b2b2b;
  border-radius: 6px;
  background: #1e1e1e;
  color: #ccc;
  font-family: 'Segoe UI', 'SF Pro Text', Helvetica, Arial, sans-serif;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  font-size: 11px;
  /* max-width and margin handled by wrapper now */
  width: 100%;
  position: relative; /* Context for absolute cursor */
}

/* Combined Title Bar */
.title-bar {
  height: 30px;
  background: #3c3c3c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  user-select: none;
}

.title-bar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.vscode-logo {
  opacity: 1;
  display: flex;
  align-items: center;
}
.menu-bar-container {
  display: flex;
  gap: 4px;
}
.menu-item-wrapper {
  position: relative;
}
.menu-item {
  padding: 2px 6px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 11px;
  color: #cccccc;
}
.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
.menu-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
.menu-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #252526;
  border: 1px solid #454545;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  min-width: 180px;
  z-index: 2000;
  padding: 4px 0;
  border-radius: 3px;
}
.dropdown-item {
  padding: 4px 15px;
  cursor: pointer;
  color: #cccccc;
  display: flex;
  justify-content: space-between;
}
.dropdown-item:hover {
  background: #094771;
  color: white;
}

.title-bar-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.nav-arrows {
  display: flex;
  gap: 8px;
  color: #999;
  margin-right: 10px;
}
.nav-arrow {
  cursor: pointer;
  font-size: 14px;
}
.nav-arrow:hover {
  color: white;
}

.search-box {
  background: #2b2b2b; /* Slightly lighter than title bar */
  border: 1px solid #444;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  color: #999;
  cursor: text;
}
.search-icon {
  opacity: 0.7;
  font-size: 10px;
}

.title-bar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.layout-controls {
  display: flex;
  gap: 8px;
  color: #999;
  margin-right: 10px;
}
.layout-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.8;
}
.layout-icon:hover {
  color: white;
  opacity: 1;
}
.window-controls {
  display: flex;
  gap: 8px;
}
.win-btn {
  cursor: pointer;
  font-size: 11px;
  color: #999;
  width: 14px;
  text-align: center;
}
.win-btn:hover {
  color: white;
}
.win-btn.close:hover {
  color: #ff5f56;
}

/* Main Layout */
.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Activity Bar */
.activity-bar {
  width: 40px;
  background: #333333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-top: 5px;
}
.top-icons,
.bottom-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.activity-bar .icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
  cursor: pointer;
  position: relative;
  color: #ccc;
}
.activity-bar .icon svg {
  width: 22px;
  height: 22px;
}
.activity-bar .icon:hover {
  opacity: 0.8;
}
.activity-bar .icon.active {
  opacity: 1;
  border-left: 2px solid white;
  color: white;
}

/* Sidebar */
.sidebar {
  width: 180px;
  background: #252526;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1e1e1e;
}
.sidebar-header {
  padding: 8px 16px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  color: #bbbbbb;
  text-transform: uppercase;
}
.sidebar-dots {
  cursor: pointer;
}
.sidebar-section {
  margin-bottom: 0;
}
.section-header {
  padding: 4px 8px;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #bbbbbb;
}
.section-header:hover {
  background: #2a2d2e;
}
.file-list {
  padding-top: 0;
}
.file-item {
  padding: 3px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #cccccc;
  position: relative;
  height: 22px;
}
.file-item:hover {
  background: #2a2d2e;
}
.file-item.active {
  background: #37373d;
  color: white;
}
.file-item.active-editor {
  background: #37373d;
}
.unsaved-dot {
  margin-left: auto;
  font-size: 8px;
  opacity: 0.8;
}
.empty-list-item {
  padding: 4px 16px;
  font-style: italic;
  color: #666;
  font-size: 10px;
}

/* Sidebar Search */
.sidebar-search {
  padding: 8px 12px;
}
.sidebar-search input {
  width: 100%;
  background: #3c3c3c;
  border: 1px solid #3c3c3c;
  color: #cccccc;
  padding: 4px 6px;
  font-size: 11px;
  outline: none;
}
.sidebar-search input:focus {
  border-color: #007acc;
}

/* Extension List */
.extension-list {
  padding: 0;
}
.extension-item {
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid #2b2b2b;
  cursor: pointer;
}
.extension-item:hover {
  background: #2a2d2e;
}
.extension-icon {
  width: 32px;
  height: 32px;
  background: #444;
  margin-right: 10px;
  flex-shrink: 0;
}
.extension-info {
  flex: 1;
  min-width: 0;
}
.extension-name {
  font-weight: 600;
  color: #e1e1e1;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.installed-badge {
  color: #007acc;
  font-size: 10px;
}
.extension-desc {
  color: #888;
  font-size: 10px;
  margin: 2px 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.install-btn {
  background: #0e639c;
  border: none;
  color: white;
  padding: 2px 8px;
  font-size: 10px;
  cursor: pointer;
  border-radius: 2px;
}
.install-btn:hover {
  background: #1177bb;
}
.install-btn.installing {
  background: #333;
  color: #ccc;
  cursor: wait;
}
.install-btn.installed {
  background: #3c3c3c;
  color: #ccc;
}
.install-btn.installed:hover {
  background: #444;
}

/* Editor Area */
.editor-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  overflow: hidden;
}

/* Tabs */
.tabs-container {
  display: flex;
  background: #252526;
  height: 30px;
}
.tabs {
  display: flex;
  overflow-x: auto;
  flex: 1;
}
.tab {
  padding: 0 10px;
  background: #2d2d2d;
  font-size: 11px;
  border-right: 1px solid #1e1e1e;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #969696;
  min-width: 90px;
  cursor: pointer;
  height: 100%;
}
.tab:hover {
  background: #2d2d2d;
  color: #cccccc;
}
.tab.active {
  background: #1e1e1e;
  color: white;
  border-top: 1px solid #007acc;
}
.close-tab {
  margin-left: auto;
  font-size: 14px;
  opacity: 0;
  border-radius: 3px;
  padding: 0 2px;
}
.tab:hover .close-tab {
  opacity: 1;
}
.close-tab:hover {
  background: #444;
}
.tab-actions {
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
  color: #cccccc;
}
.action-btn {
  cursor: pointer;
  font-size: 12px;
  opacity: 0.7;
}
.action-btn:hover {
  opacity: 1;
}

/* Breadcrumbs */
.breadcrumbs {
  padding: 2px 12px;
  font-size: 11px;
  color: #aaaaaa;
  border-bottom: 1px solid #2b2b2b;
  display: flex;
  align-items: center;
  height: 20px;
}
.separator {
  margin: 0 4px;
  opacity: 0.6;
}

/* Editor Main */
.editor-main {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}
.code-content {
  flex: 1;
  display: flex;
  padding-top: 4px;
  overflow-y: auto;
}
.line-numbers {
  width: 40px;
  text-align: right;
  padding-right: 12px;
  color: #858585;
  font-size: 11px;
  line-height: 1.5;
  user-select: none;
  font-family: 'Consolas', 'Monaco', monospace;
}
.code-wrapper {
  flex: 1;
}
.code-content pre {
  margin: 0;
  color: #d4d4d4;
  font-size: 11px;
  line-height: 1.5;
  font-family: 'Consolas', 'Monaco', monospace;
  white-space: pre-wrap;
}

/* Welcome Page */
.welcome-content {
  flex: 1;
  background: #1e1e1e;
  padding: 30px;
  overflow-y: auto;
  color: #ccc;
  display: flex;
  justify-content: center;
}
.welcome-container {
  max-width: 700px;
  width: 100%;
}
.welcome-header {
  margin-bottom: 40px;
}
.welcome-header h1 {
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 6px 0;
  color: white;
}
.subtitle {
  font-size: 18px;
  color: #999;
  margin: 0;
}
.welcome-grid {
  display: flex;
  gap: 60px;
}
.welcome-column {
  flex: 1;
}
.welcome-column h3 {
  font-size: 13px;
  font-weight: 500;
  color: #999;
  margin-bottom: 14px;
  text-transform: uppercase;
}
.welcome-action {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  color: #007acc;
  font-size: 12px;
}
.welcome-action:hover {
  color: #40a9ff;
  text-decoration: underline;
}
.mt-4 {
  margin-top: 24px;
}
.recent-item {
  margin-bottom: 10px;
  cursor: pointer;
}
.recent-item:hover .recent-path {
  color: #007acc;
}
.recent-path {
  display: block;
  color: #ccc;
  font-size: 12px;
  margin-bottom: 2px;
}
.recent-detail {
  display: block;
  color: #666;
  font-size: 11px;
}
.walkthrough-card {
  background: #252526;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  border: 1px solid transparent;
}
.walkthrough-card:hover {
  background: #2a2d2e;
  border-color: #007acc;
}
.walkthrough-icon {
  font-size: 24px;
}
.walkthrough-info {
  flex: 1;
}
.walkthrough-title {
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  font-size: 12px;
}
.walkthrough-desc {
  font-size: 11px;
  color: #999;
  line-height: 1.3;
}

/* Minimap */
.minimap {
  width: 50px;
  background: #1e1e1e;
  padding: 4px;
  overflow: hidden;
  opacity: 0.8;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}
.minimap-line {
  height: 2px;
  background: #666;
  margin-bottom: 2px;
  border-radius: 1px;
}
.minimap-slider {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 80px;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  z-index: 10;
}

/* Bottom Panel */
.bottom-panel {
  height: 120px;
  background: #1e1e1e;
  border-top: 1px solid #2b2b2b;
  display: flex;
  flex-direction: column;
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 28px;
  border-bottom: 1px solid #2b2b2b;
}
.panel-tabs {
  display: flex;
  gap: 16px;
}
.panel-tab {
  font-size: 10px;
  cursor: pointer;
  color: #969696;
  padding: 6px 0;
  position: relative;
  text-transform: uppercase;
  font-weight: 600;
}
.panel-tab:hover {
  color: #cccccc;
}
.panel-tab.active {
  color: white;
  border-bottom: 1px solid #e7e7e7;
}
.badge {
  background: #333;
  border-radius: 6px;
  padding: 0 4px;
  font-size: 9px;
  margin-left: 2px;
}
.panel-body {
  flex: 1;
  padding: 8px 12px;
  overflow-y: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 11px;
}
.terminal-content {
  color: #cccccc;
}
.command {
  color: #cccccc;
  margin-top: 4px;
}
.output {
  color: #aaaaaa;
}
.cursor-line {
  margin-top: 4px;
}
.cursor {
  display: inline-block;
  width: 6px;
  height: 12px;
  background: #aaaaaa;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.empty-panel {
  color: #666;
  font-style: italic;
  padding: 4px;
}

/* Status Bar */
.status-bar {
  height: 22px;
  background: #007acc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: white;
  font-size: 10px;
  user-select: none;
}
.status-left,
.status-right {
  display: flex;
  gap: 14px;
}
.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.status-item:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  padding: 0 2px;
}
.notification {
  margin-left: 8px;
}

.highlight-box {
  position: absolute;
  border: 2px solid #007acc;
  background-color: rgba(0, 122, 204, 0.1);
  pointer-events: none;
  z-index: 9998;
  animation: highlightPulse 1.5s infinite;
  box-sizing: border-box;
}

@keyframes highlightPulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}
</style>
