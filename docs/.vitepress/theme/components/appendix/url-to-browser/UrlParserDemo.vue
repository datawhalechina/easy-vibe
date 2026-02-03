<!--
  UrlParserDemo.vue
  URL解析演示 - 交互式可视化组件
  
  用途：
  将 URL 解析过程可视化，通过颜色编码和分块展示，
  直观地展示 URL 的各个组成部分及其对应的技术含义和生活比喻。
-->
<template>
  <div class="url-parser-demo">
    <!-- 头部控制区 -->
    <div class="control-panel">
      <div class="header-section">
        <span class="icon">🔍</span>
        <span class="title">URL 解析器</span>
      </div>
      
      <div class="examples-section">
        <span class="label">试一试：</span>
        <div class="button-group">
          <button
            v-for="ex in examples"
            :key="ex.name"
            @click="useExample(ex)"
            class="action-btn outline small"
            :class="{ active: currentExample === ex.name }"
          >
            {{ ex.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-section">
      <div class="input-wrapper">
        <input
          v-model="urlInput"
          type="text"
          placeholder="输入或粘贴一个网址..."
          @input="parseUrl"
          class="url-input"
        />
        <button class="clear-btn" @click="clear" v-if="urlInput">✕</button>
      </div>
    </div>

    <!-- 可视化展示区 -->
    <div class="visualization-area" v-if="parsed.protocol">
      <div class="url-blocks">
        <div 
          v-for="(field, key) in formFields" 
          :key="key"
          v-show="shouldShowField(key)"
          class="url-block"
          :class="[key, { active: hovered === key }]"
          :style="{ '--block-color': field.color, '--block-bg': hexToRgba(field.color, 0.15) }"
          @mouseenter="hovered = key"
          @mouseleave="hovered = null"
        >
          <span class="block-value">{{ getDisplayValue(key) }}</span>
          <span class="block-label">{{ field.techName }}</span>
        </div>
      </div>
    </div>

    <!-- 详情说明卡片 -->
    <div class="info-card" v-if="hovered && formFields[hovered]">
      <div class="info-header" :style="{ borderLeftColor: formFields[hovered].color }">
        <span class="info-title">{{ formFields[hovered].techLabel }} ({{ formFields[hovered].techName }})</span>
        <span class="info-badge" :style="{ backgroundColor: formFields[hovered].color }">
          {{ formFields[hovered].icon }}
        </span>
      </div>
      
      <div class="info-content">
        <div class="info-row">
          <div class="info-label">技术含义</div>
          <div class="info-value">
            <strong>{{ formFields[hovered].techDesc }}</strong>
            <div class="info-detail">{{ formFields[hovered].techDetail }}</div>
          </div>
        </div>
        <div class="info-divider"></div>
        <div class="info-row">
          <div class="info-label">生活比喻</div>
          <div class="info-value">
            <strong>{{ formFields[hovered].analogyLabel }}</strong>
            <div class="info-detail">{{ formFields[hovered].analogyDesc }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态提示 -->
    <div class="empty-state" v-else-if="!urlInput">
      <p>👆 在上方输入网址，查看它是由哪些部分组成的</p>
    </div>
    
    <div class="default-info" v-else>
      <p>👆 鼠标悬停在上方色块上，查看详细解释</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const urlInput = ref('')
const parsed = ref({})
const hovered = ref(null)
const currentExample = ref('')

const examples = [
  { name: '百度搜索', url: 'https://www.baidu.com/s?wd=hello' },
  { name: 'GitHub项目', url: 'https://github.com/vuejs/core' },
  { name: '带端口', url: 'http://localhost:8080/api/users' },
  { name: '带锚点', url: 'https://vuejs.org/guide/introduction.html#what-is-vue' }
]

const formFields = {
  protocol: {
    techName: 'Protocol',
    techLabel: '协议',
    color: '#f43f5e', // Red
    icon: '规',
    analogyLabel: '快递公司',
    techDesc: '通信规则',
    analogyDesc: '决定是用"顺丰"(HTTPS)还是"平邮"(HTTP)传输',
    techDetail: 'https (加密) 或 http (明文)'
  },
  hostname: {
    techName: 'Hostname',
    techLabel: '域名',
    color: '#3b82f6', // Blue
    icon: '名',
    analogyLabel: '收件人',
    techDesc: '服务器地址',
    analogyDesc: '如 "google.com"，方便人类记忆的名字',
    techDetail: '最终需要通过 DNS 解析为 IP 地址'
  },
  port: {
    techName: 'Port',
    techLabel: '端口',
    color: '#f59e0b', // Amber
    icon: '门',
    analogyLabel: '门牌号',
    techDesc: '服务入口',
    analogyDesc: '如 ":8080"，大楼里的具体房间号',
    techDetail: '默认端口(80/443)通常会被浏览器省略'
  },
  pathname: {
    techName: 'Path',
    techLabel: '路径',
    color: '#10b981', // Emerald
    icon: '径',
    analogyLabel: '具体位置',
    techDesc: '资源路径',
    analogyDesc: '如 "/files/doc.txt"，文件柜的位置',
    techDetail: '指向服务器上的具体资源'
  },
  search: {
    techName: 'Query',
    techLabel: '参数',
    color: '#8b5cf6', // Violet
    icon: '参',
    analogyLabel: '备注',
    techDesc: '查询参数',
    analogyDesc: '如 "?q=hello"，告诉对方具体要求',
    techDetail: '键值对形式的附加数据'
  },
  hash: {
    techName: 'Hash',
    techLabel: '锚点',
    color: '#ec4899', // Pink
    icon: '锚',
    analogyLabel: '页码',
    techDesc: '页内定位',
    analogyDesc: '如 "#section1"，书的某一页',
    techDetail: '浏览器滚动到指定位置，不会发送给服务器'
  }
}

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const shouldShowField = (key) => {
  const val = parsed.value[key]
  if (!val) return false
  if (val === '无') return false
  if (key === 'search' && (val === '' || val === '?')) return false
  if (key === 'hash' && (val === '' || val === '#')) return false
  return true
}

const getDisplayValue = (key) => {
  let val = parsed.value[key]
  
  if (key === 'protocol') return val + '://'
  if (key === 'port') return ':' + val.replace('(默认)', '')
  // simple formatting
  return val
}

const useExample = (ex) => {
  urlInput.value = ex.url
  currentExample.value = ex.name
  parseUrl()
}

const clear = () => {
  urlInput.value = ''
  parsed.value = {}
  currentExample.value = ''
}

const parseUrl = () => {
  if (!urlInput.value) {
    parsed.value = {}
    return
  }

  try {
    let urlStr = urlInput.value.trim()
    // Auto-add protocol if missing for better UX
    if (!urlStr.match(/^https?:\/\//)) {
      if (urlStr.startsWith('localhost')) {
         urlStr = 'http://' + urlStr
      } else {
         urlStr = 'https://' + urlStr
      }
    }

    const u = new URL(urlStr)
    
    // Determine if port is explicit or default
    let portDisplay = u.port
    if (!portDisplay) {
        // Just for display logic in the parser, we might not show it if it's default/hidden
        // But let's show it if we want to be educational
        // Actually, let's only show if it's in the string or we want to be explicit
        // For visualizer, maybe better to show what's THERE. 
        // But to be educational, maybe show implied?
        // Let's stick to what's in the URL object but handle defaults
        // If the user typed it, u.port is set. If implied, it's empty string.
    }

    parsed.value = {
      protocol: u.protocol.replace(':', ''),
      hostname: u.hostname,
      port: u.port, // Only show if explicit
      pathname: u.pathname === '/' ? '/' : u.pathname,
      search: u.search,
      hash: u.hash
    }
  } catch (e) {
    // simplistic fallback or error state could go here
    // parsed.value = {}
  }
}
</script>

<style scoped>
.url-parser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.header-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.examples-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.action-btn.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.input-section {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.url-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.url-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.clear-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 1rem;
}

.clear-btn:hover {
  color: var(--vp-c-text-1);
}

.visualization-area {
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.url-blocks {
  display: flex;
  gap: 4px;
  align-items: flex-start;
}

.url-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background-color: var(--block-bg);
  border: 1px solid var(--block-color);
  cursor: help;
  transition: all 0.2s;
  min-width: fit-content;
}

.url-block:hover, .url-block.active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  filter: brightness(1.05);
}

.block-value {
  font-weight: bold;
  color: var(--block-color);
  font-size: 1rem;
  white-space: nowrap;
}

.block-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  margin-top: 0.25rem;
  opacity: 0.7;
  color: var(--block-color);
}

.info-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  animation: slide-up 0.3s ease;
}

.info-header {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-alt);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid transparent;
}

.info-title {
  font-weight: bold;
  font-size: 0.95rem;
}

.info-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.info-content {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 1rem;
}

.info-divider {
  background: var(--vp-c-divider);
  height: 100%;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.9rem;
}

.info-detail {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.empty-state, .default-info {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border: 1px dashed var(--vp-c-divider);
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .info-content {
    grid-template-columns: 1fr;
  }
  .info-divider {
    height: 1px;
    width: 100%;
  }
}
</style>
