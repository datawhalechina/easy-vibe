<script setup>
import { ref, reactive, computed } from 'vue'

const activeTab = ref('elements')
const selectedNode = ref('h1') // 'container', 'h1', 'button'

// Live State for the Virtual Page
const liveStyles = reactive({
  container: {
    backgroundColor: '#f9f9f9',
    padding: '40px',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  h1: {
    color: '#2c3e50',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '16px',
    marginTop: '0px',
    fontFamily: 'sans-serif'
  },
  button: {
    backgroundColor: '#42b983',
    color: '#ffffff',
    borderRadius: '6px',
    padding: '10px 24px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  }
})

const liveContent = reactive({
  h1: 'Hello, Easy Vibe!',
  button: 'Click Me'
})

// Presets Definition
const stylePresets = {
  h1: [
    {
      name: '默认样式 (Default)',
      style: {
        color: '#2c3e50',
        fontSize: '28px',
        fontFamily: 'sans-serif',
        fontWeight: '700'
      }
    },
    {
      name: '活力红 (Vibrant Red)',
      style: {
        color: '#e74c3c',
        fontSize: '36px',
        fontFamily: 'serif',
        fontWeight: '800'
      }
    },
    {
      name: '科技蓝 (Tech Blue)',
      style: {
        color: '#3498db',
        fontSize: '32px',
        fontFamily: 'monospace',
        fontWeight: '500'
      }
    },
    {
      name: '优雅紫 (Elegant Purple)',
      style: {
        color: '#9b59b6',
        fontSize: '24px',
        fontFamily: 'cursive',
        fontWeight: '400'
      }
    }
  ],
  button: [
    {
      name: '默认样式 (Default)',
      style: {
        backgroundColor: '#42b983',
        color: '#ffffff',
        borderRadius: '6px',
        border: 'none'
      }
    },
    {
      name: '警告风格 (Warning)',
      style: {
        backgroundColor: '#f1c40f',
        color: '#333333',
        borderRadius: '24px',
        border: '2px solid #e67e22'
      }
    },
    {
      name: '幽灵按钮 (Ghost)',
      style: {
        backgroundColor: 'transparent',
        color: '#42b983',
        borderRadius: '6px',
        border: '1px solid #42b983'
      }
    },
    {
      name: '深黑按钮 (Dark)',
      style: {
        backgroundColor: '#34495e',
        color: '#ecf0f1',
        borderRadius: '2px',
        border: '1px solid #2c3e50'
      }
    }
  ],
  container: [
    {
      name: '默认卡片 (Card)',
      style: {
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }
    },
    {
      name: '深色模式 (Dark)',
      style: {
        backgroundColor: '#2c3e50',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }
    },
    {
      name: '极简白 (Minimal)',
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '0px',
        boxShadow: 'none'
      }
    }
  ]
}

// Helper to get current styles for the selected node
const currentStyles = computed(() => {
  return liveStyles[selectedNode.value] || {}
})

// Helper for presets
const availablePresets = computed(() => {
  return stylePresets[selectedNode.value] || []
})

const applyPreset = (event) => {
  const presetName = event.target.value
  const preset = availablePresets.value.find((p) => p.name === presetName)
  if (preset) {
    Object.assign(liveStyles[selectedNode.value], preset.style)
  }
}

// Tabs definition
const tabs = [
  { id: 'elements', label: '元素' },
  { id: 'console', label: '控制台' },
  { id: 'sources', label: '源代码' },
  { id: 'network', label: '网络' },
  { id: 'application', label: '应用' }
]

const selectNode = (node) => {
  selectedNode.value = node
}
</script>

<template>
  <div class="live-demo-wrapper">
    <!-- Virtual Web Page Preview -->
    <div class="virtual-page-container">
      <div class="virtual-browser-bar">
        <div class="dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="address-bar">http://localhost:3000/demo</div>
      </div>
      <div
        class="virtual-page-content"
        :style="liveStyles.container"
        @click.self="selectNode('container')"
      >
        <h1 :style="liveStyles.h1" @click.stop="selectNode('h1')">
          {{ liveContent.h1 }}
        </h1>
        <button :style="liveStyles.button" @click.stop="selectNode('button')">
          {{ liveContent.button }}
        </button>
      </div>
      <div class="instruction-overlay">
        👆 点击上方元素，下方 DevTools 实时联动
      </div>
    </div>

    <!-- DevTools Simulator -->
    <div class="browser-devtools-demo">
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
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </div>
          </div>
        </div>
        <div class="header-right">
          <div class="icon-btn settings">⚙️</div>
          <div class="icon-btn close">×</div>
        </div>
      </div>

      <!-- Body -->
      <div class="devtools-body">
        <!-- Elements Panel -->
        <div v-if="activeTab === 'elements'" class="panel elements-panel">
          <div class="dom-tree-panel">
            <div class="dom-tree-content">
              <div
                class="dom-node"
                @click="selectNode('container')"
                :class="{ selected: selectedNode === 'container' }"
              >
                <div class="line-content">
                  <span class="arrow expanded">▼</span>
                  <span class="tag-name">div</span>
                  <span class="attr-name">class</span>=<span class="attr-val"
                    >"virtual-page-content"</span
                  >
                  <span class="node-trail" v-if="selectedNode === 'container'"
                    >== $0</span
                  >
                </div>
                <div class="children">
                  <div
                    class="dom-node"
                    @click.stop="selectNode('h1')"
                    :class="{ selected: selectedNode === 'h1' }"
                  >
                    <div class="line-content">
                      <span class="indent"></span>
                      <span class="tag-name">h1</span>
                      <span class="node-trail" v-if="selectedNode === 'h1'"
                        >== $0</span
                      >
                    </div>
                    <div class="line-content">
                      <span class="indent"></span>
                      <input
                        v-model="liveContent.h1"
                        class="dom-text-input"
                        @click.stop="selectNode('h1')"
                      />
                    </div>
                    <div class="line-content">
                      <span class="indent"></span
                      ><span class="tag-name">/h1</span>
                    </div>
                  </div>
                  <div
                    class="dom-node"
                    @click.stop="selectNode('button')"
                    :class="{ selected: selectedNode === 'button' }"
                  >
                    <div class="line-content">
                      <span class="indent"></span>
                      <span class="tag-name">button</span>
                      <span class="node-trail" v-if="selectedNode === 'button'"
                        >== $0</span
                      >
                    </div>
                    <div class="line-content">
                      <span class="indent"></span>
                      <input
                        v-model="liveContent.button"
                        class="dom-text-input"
                        @click.stop="selectNode('button')"
                      />
                    </div>
                    <div class="line-content">
                      <span class="indent"></span
                      ><span class="tag-name">/button</span>
                    </div>
                  </div>
                </div>
                <div class="line-content">
                  <span class="tag-name">/div</span>
                </div>
              </div>
            </div>
            <div class="breadcrumbs">
              html > body > div.virtual-page-content
              {{ selectedNode !== 'container' ? '> ' + selectedNode : '' }}
            </div>
          </div>

          <!-- Interactive Styles Panel -->
          <div class="styles-panel">
            <div class="styles-tabs">
              <div class="style-tab active">样式 (Styles)</div>
              <div class="style-tab">计算 (Computed)</div>
            </div>
            <div class="styles-content">
              <!-- Preset Selector -->
              <div class="style-section" v-if="availablePresets.length > 0">
                <div class="style-section-title">✨ 快速预设 (Presets)</div>
                <select class="preset-select" @change="applyPreset">
                  <option value="" disabled selected>
                    选择一种风格 (Select Preset)...
                  </option>
                  <option
                    v-for="preset in availablePresets"
                    :key="preset.name"
                    :value="preset.name"
                  >
                    {{ preset.name }}
                  </option>
                </select>
              </div>

              <!-- CSS Properties -->
              <div class="style-rule">
                <div class="selector">element.style {</div>
                <div
                  class="property"
                  v-for="(val, key) in currentStyles"
                  :key="key"
                >
                  <span class="prop-name">{{ key }}</span
                  >:
                  <input
                    v-model="liveStyles[selectedNode][key]"
                    class="style-input"
                  />
                  ;
                </div>
                <div class="selector">}</div>
              </div>
              <div class="style-add-hint"></div>
            </div>
          </div>
        </div>

        <!-- Other Panels (Simplified placeholders) -->
        <div v-else class="panel placeholder-panel">
          <div class="placeholder-text">
            此演示主要展示 Elements 面板的实时编辑功能。请切换回 "元素" 面板。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}

/* Virtual Page Preview */
.virtual-page-container {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.virtual-browser-bar {
  background: #f1f3f4;
  padding: 10px 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.dots {
  display: flex;
  gap: 8px;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.dot.red {
  background: #ff5f56;
}
.dot.yellow {
  background: #ffbd2e;
}
.dot.green {
  background: #27c93f;
}

.address-bar {
  flex: 1;
  background: #fff;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 12px;
  color: #5f6368;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
}

.virtual-page-content {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-image: radial-gradient(#e1e1e1 1px, transparent 1px);
  background-size: 20px 20px;
}

.instruction-overlay {
  background: #e8f0fe;
  color: #1a73e8;
  font-size: 12px;
  padding: 6px;
  text-align: center;
  border-top: 1px solid #d2e3fc;
  font-weight: 500;
}

/* DevTools Simulator (Enhanced) */
.browser-devtools-demo {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background-color: #ffffff;
  color: #202124;
  font-family: 'Segoe UI', '.SFNSDisplay', 'Roboto', sans-serif;
  font-size: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 320px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  user-select: none;
}

/* Header & Tabs */
.devtools-header {
  background-color: #f3f3f3;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  height: 28px;
  padding: 0 4px;
}
.header-left,
.header-right {
  display: flex;
  align-items: center;
  height: 100%;
}
.icon-btn {
  padding: 0 8px;
  cursor: pointer;
  color: #6e6e6e;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.icon-btn:hover {
  color: #202124;
  background-color: #eaeaea;
}
.separator {
  width: 1px;
  height: 16px;
  background-color: #ccc;
  margin: 0 8px;
}

.tabs {
  display: flex;
  height: 100%;
  overflow-x: auto;
}
.tab {
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #5f6368;
  border-bottom: 2px solid transparent;
  height: 100%;
  font-size: 12px;
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

.devtools-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  background-color: #fff;
}
.panel {
  flex: 1;
  display: flex;
  overflow: hidden;
  width: 100%;
}

/* Elements Panel */
.elements-panel {
  display: flex;
  flex-direction: row;
}
.dom-tree-panel {
  flex: 3;
  border-right: 1px solid #d0d7de;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 6px 0;
  font-family: Consolas, Menlo, monospace;
  font-size: 12px;
  background: #fff;
}
.dom-node {
  padding-left: 14px;
  line-height: 20px;
  cursor: pointer;
  white-space: nowrap;
}
.dom-node.selected {
  background-color: #cfe8fc;
}
.dom-node:hover:not(.selected) {
  background-color: #f0f4f8;
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
.text-node {
  color: #222;
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
  flex: 2;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #d0d7de;
  min-width: 280px;
}
.styles-tabs {
  display: flex;
  background: #f1f3f4;
  border-bottom: 1px solid #ccc;
  height: 26px;
}
.style-tab {
  padding: 0 12px;
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

.style-section {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}
.style-section-title {
  font-weight: 600;
  color: #5f6368;
  margin-bottom: 6px;
  font-size: 11px;
  text-transform: uppercase;
}
.preset-select {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 11px;
}

.content-editor-row {
  font-family: Consolas, Menlo, monospace;
  font-size: 11px;
  display: flex;
  align-items: center;
}
.content-input {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 2px 4px;
  font-family: inherit;
  font-size: 11px;
  color: #222;
  flex: 1;
  margin-left: 4px;
}
.content-input:focus {
  border-color: #1a73e8;
  outline: none;
}

.style-rule {
  margin-bottom: 8px;
  font-family: Consolas, Menlo, monospace;
  font-size: 11px;
  border-bottom: 1px solid #eee;
  padding: 8px 12px;
}
.selector {
  color: #a90d91;
  font-weight: bold;
}
.property {
  padding-left: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  line-height: 1.6;
}
.prop-name {
  color: #c80000;
  margin-right: 4px;
}
/* CSS Properties Input Styling */
.style-input {
  border: 1px solid transparent;
  font-family: Consolas, Menlo, monospace;
  font-size: 11px;
  color: #1a1aa6;
  width: 140px;
  background: transparent;
  padding: 0 2px;
  margin-left: -2px;
}
.style-input:hover {
  border: 1px solid #ccc;
  background: #fff;
}
.style-input:focus {
  outline: none;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0 0 1px #e0e0e0;
}

/* DOM Text Input Styling */
.dom-text-input {
  border: 1px solid transparent;
  font-family: Consolas, Menlo, monospace;
  font-size: 12px;
  color: #222;
  background: transparent;
  padding: 0 2px;
  margin-left: -2px;
  width: 200px; /* Give it enough space */
}
.dom-text-input:hover {
  border: 1px solid #ccc;
  background: #fff;
}
.dom-text-input:focus {
  outline: none;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0 0 1px #e0e0e0;
}

.placeholder-panel {
  align-items: center;
  justify-content: center;
  color: #999;
  padding: 20px;
  text-align: center;
}
</style>
