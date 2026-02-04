<!--
  UrlParserDemo.vue
  URL解析演示 - 网购订单隐喻版
  
  设计理念：
  1. 隐喻对齐：严格对应 url-to-browser.md 中的"网购订单"比喻。
  2. 视觉映射：将枯燥的 URL 字符串映射为一张清晰的"购物清单"。
  3. 实时交互：输入即解析，所见即所得。
-->
<template>
  <div class="url-parser-order">
    <!-- 顶部：输入区 -->
    <div class="input-section">
      <div class="url-input-box" :class="{ 'has-error': error }">
        <span class="input-label">URL</span>
        <input
          v-model="urlInput"
          type="text"
          placeholder="https://www.example.com/path?query=1"
          class="real-input"
          @input="parseUrl"
        />
        <button v-if="urlInput" class="clear-btn" @click="clear">✕</button>
      </div>
      <div class="quick-actions">
        <span class="action-label">试一试：</span>
        <button 
          v-for="ex in examples" 
          :key="ex.name"
          @click="useExample(ex)"
          class="action-chip"
          :class="{ active: currentExample === ex.name }"
        >
          {{ ex.name }}
        </button>
      </div>
    </div>

    <!-- 核心区域：左右对照布局 -->
    <template v-if="parsed.protocol">
      <div class="core-stage">
        <!-- 左侧：解析结果 (技术视角) -->
        <div class="tech-view">
          <div class="view-header">
            <span class="icon">💻</span>
            <span class="title">技术解析</span>
          </div>
          <div class="code-blocks">
            <div 
              v-for="(field, key) in formFields" 
              :key="key"
              v-show="shouldShowField(key)"
              class="code-block"
              :class="[key, { active: hovered === key }]"
              :style="{ '--color': field.color }"
              @mouseenter="hovered = key"
              @mouseleave="hovered = null"
            >
              <span class="field-name">{{ key }}</span>
              <span class="field-value">{{ getDisplayValue(key) }}</span>
            </div>
          </div>
        </div>

        <!-- 中间：转换箭头 -->
        <div class="transform-arrow">
          <span class="arrow-icon">➔</span>
          <span class="arrow-text">映射为</span>
        </div>

        <!-- 右侧：购物单 (生活视角) -->
        <div class="life-view">
          <div class="view-header">
            <span class="icon">🧾</span>
            <span class="title">购物订单</span>
          </div>
          <div class="order-ticket">
            <div class="ticket-hole"></div>
            
            <div 
              v-for="(field, key) in formFields"
              :key="key"
              v-show="shouldShowField(key)"
              class="ticket-row"
              :class="{ active: hovered === key }"
              :style="{ '--color': field.color }"
              @mouseenter="hovered = key"
              @mouseleave="hovered = null"
            >
              <div class="ticket-icon" :style="{ backgroundColor: field.color }">{{ field.icon }}</div>
              <div class="ticket-content">
                <span class="ticket-label">{{ field.analogyLabel }}</span>
                <span class="ticket-desc">{{ field.analogyDesc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 技术答疑面板 -->
      <transition name="fade">
        <div class="qa-panel" v-if="activeQa">
          <div class="qa-header">{{ activeQa.title }}</div>
          <div class="qa-content">
            <div v-for="(item, idx) in activeQa.content" :key="idx" class="qa-item">
              <div class="qa-q">Q: {{ item.q }}</div>
              <div class="qa-a">A: {{ item.a }}</div>
            </div>
          </div>
        </div>
        <div class="qa-placeholder" v-else>
          👆 鼠标悬停在上方色块，查看详细技术解释
        </div>
      </transition>
    </template>

    <!-- 空状态引导 -->
    <div class="empty-state" v-else>
      <div class="empty-icon">🛒</div>
      <div class="empty-text">
        <p>输入网址，生成你的"数字购物单"</p>
        <span class="sub-text">看看浏览器如何理解这一长串字符</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const urlInput = ref('')
const parsed = ref({})
const hovered = ref(null)
const currentExample = ref('')
const error = ref(false)

const examples = [
  { name: '标准网购', url: 'https://www.nike.com/shoes/running?size=42&color=red' },
  { name: '带端口', url: 'http://localhost:8080/api/status' },
  { name: '带锚点', url: 'https://vuejs.org/guide.html#setup' }
]

// 定义字段映射（严格对齐 url-to-browser.md）
const formFields = {
  protocol: {
    color: '#f43f5e', // Red
    icon: '🚚',
    analogyLabel: '物流方式',
    analogyDesc: '决定怎么送货（HTTP普通/HTTPS加密保密）。',
    qa: {
      title: '🤔 为什么要写 http/https？',
      content: [
        {
          q: '这两者有什么区别？',
          a: 'HTTP 就像寄明信片，邮递员（黑客）能看到内容。HTTPS 就像寄密封的信封，只有收件人能拆开看。'
        },
        {
          q: '为什么现在都是 https？',
          a: '为了安全！现在的浏览器如果发现不是 HTTPS，会提示"不安全"，就像快递公司拒收没封口的信件一样。'
        }
      ]
    }
  },
  hostname: {
    color: '#3b82f6', // Blue
    icon: '🏠',
    analogyLabel: '店铺名称',
    analogyDesc: '告诉浏览器去哪家店（服务器）买东西。',
    qa: {
      title: '🤔 域名还是 IP？',
      content: [
        {
          q: '浏览器认识域名吗？',
          a: '其实不认识。浏览器只认识 IP 地址（一串数字）。域名是为了方便人记的。下一步（DNS 查询）就是把这个名字翻译成数字。'
        }
      ]
    }
  },
  port: {
    color: '#f59e0b', // Amber
    icon: '🔢',
    analogyLabel: '柜台编号',
    analogyDesc: '店铺很大，指定去几号柜台办理业务。',
    qa: {
      title: '🤔 这里的数字是什么意思？',
      content: [
        {
          q: '为什么平时上网看不到它？',
          a: '因为有默认值！就像去银行默认去"综合柜台"一样。HTTP 默认是 80，HTTPS 默认是 443。只有特殊的才需要写出来。'
        }
      ]
    }
  },
  pathname: {
    color: '#10b981', // Emerald
    icon: '📦',
    analogyLabel: '货架位置',
    analogyDesc: '商品在仓库里的具体存放位置。',
    qa: {
      title: '🤔 这一长串是干嘛的？',
      content: [
        {
          q: '它对应服务器上的文件吗？',
          a: '通常是的。/shoes/running 就像告诉仓库管理员：去"鞋子区"的"跑步架"上拿货。'
        }
      ]
    }
  },
  search: {
    color: '#8b5cf6', // Violet
    icon: '📝',
    analogyLabel: '订单备注',
    analogyDesc: '给商家的额外要求（如：红色、42码）。',
    qa: {
      title: '🤔 问号后面的内容？',
      content: [
        {
          q: '这对网页有什么影响？',
          a: '就像你点外卖备注"不要香菜"。网页内容会根据这些参数变化，比如只显示红色的鞋子。'
        }
      ]
    }
  },
  hash: {
    color: '#ec4899', // Pink
    icon: '🔖',
    analogyLabel: '说明书页码',
    analogyDesc: '拿到商品后，直接翻到说明书的第几页。',
    qa: {
      title: '🤔 为什么要用 # 号？',
      content: [
        {
          q: '这部分会发给服务器吗？',
          a: '不会。这只是给你自己（浏览器）看的。就像你买书回家后翻到第10页，书店老板并不需要知道你看哪一页。'
        }
      ]
    }
  }
}

const activeField = computed(() => hovered.value || null)

const activeQa = computed(() => {
  if (!activeField.value) return null
  return formFields[activeField.value].qa
})

const shouldShowField = (key) => {
  const val = parsed.value[key]
  if (!val) return false
  if (key === 'search' && (val === '' || val === '?')) return false
  if (key === 'hash' && (val === '' || val === '#')) return false
  return true
}

const getDisplayValue = (key) => {
  let val = parsed.value[key]
  if (key === 'protocol') return val + '://'
  if (key === 'port') return ':' + val
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
  hovered.value = null
  error.value = false
}

const parseUrl = () => {
  if (!urlInput.value) {
    parsed.value = {}
    return
  }
  try {
    let urlStr = urlInput.value.trim()
    // 自动补全协议以支持 new URL() 解析
    if (!urlStr.match(/^https?:\/\//)) {
       urlStr = (urlStr.startsWith('localhost') ? 'http://' : 'https://') + urlStr
    }
    const u = new URL(urlStr)
    
    parsed.value = {
      protocol: u.protocol.replace(':', ''),
      hostname: u.hostname,
      port: u.port || (u.protocol === 'https:' ? '443 (默认)' : '80 (默认)'),
      pathname: u.pathname,
      search: u.search,
      hash: u.hash
    }
    error.value = false
  } catch (e) {
    // 解析失败时不更新 parsed，或者显示错误状态
    // 这里选择静默失败，等待用户输入完整
    if (urlInput.value.length > 10) {
        // error.value = true 
    }
  }
}
</script>

<style scoped>
.url-parser-order {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  padding: 20px;
  margin: 16px 0;
  font-family: var(--vp-font-family-base);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* 输入区 */
.input-section {
  margin-bottom: 24px;
}
.url-input-box {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-alt);
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.2s;
}
.url-input-box:focus-within {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}
.input-label {
  font-weight: bold;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-right: 12px;
  user-select: none;
}
.real-input {
  flex: 1;
  background: transparent;
  border: none;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-text-1);
  outline: none;
  min-width: 0;
}
.clear-btn {
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px;
}
.clear-btn:hover { color: var(--vp-c-text-1); }

.quick-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.action-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding-top: 4px;
}
.action-chip {
  padding: 4px 12px;
  border-radius: 100px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
  border: 1px solid transparent;
}
.action-chip:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}
.action-chip.active {
  background: var(--vp-c-brand);
  color: white;
}

/* 核心展示区 */
.core-stage {
  display: flex;
  align-items: stretch;
  gap: 16px;
  min-height: 200px;
}

/* 通用标题 */
.view-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.view-header .icon { font-size: 16px; }
.view-header .title { font-weight: bold; font-size: 14px; color: var(--vp-c-text-1); }

/* 左侧：技术视图 */
.tech-view {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
}
.code-blocks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.code-block {
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border-left: 3px solid var(--color);
  transition: all 0.2s;
  cursor: default;
}
.code-block:hover, .code-block.active {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.field-name {
  font-size: 11px;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  margin-bottom: 2px;
}
.field-value {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

/* 中间：箭头 */
.transform-arrow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--vp-c-text-3);
  font-size: 12px;
  width: 40px;
}
.arrow-icon { font-size: 20px; }

/* 右侧：生活视图 (票据样式) */
.life-view {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid var(--vp-c-divider);
}
/* 暗黑模式适配票据背景 */
:root.dark .life-view {
  background: #1e1e20;
}

.order-ticket {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px dashed var(--vp-c-divider);
  padding: 16px;
  border-radius: 8px;
  position: relative;
}
.ticket-hole {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: var(--vp-c-bg);
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}
.ticket-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;
  opacity: 0.8;
}
.ticket-row:hover, .ticket-row.active {
  background: var(--vp-c-bg-soft);
  opacity: 1;
  transform: scale(1.02);
}
.ticket-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
}
.ticket-content {
  display: flex;
  flex-direction: column;
}
.ticket-label {
  font-weight: bold;
  font-size: 13px;
  color: var(--vp-c-text-1);
}
.ticket-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--vp-c-text-3);
  text-align: center;
}
.empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
.empty-text p { font-size: 16px; font-weight: bold; margin: 0 0 8px 0; color: var(--vp-c-text-2); }
.sub-text { font-size: 13px; }

/* 响应式 */
@media (max-width: 640px) {
  .core-stage {
    flex-direction: column;
  }
  .transform-arrow {
    flex-direction: row;
    width: 100%;
    height: 40px;
    gap: 8px;
  }
  .arrow-icon { transform: rotate(90deg); }
}

/* QA Panel */
.qa-panel {
  margin-top: 16px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  font-size: 13px;
}
.qa-header {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.qa-item {
  margin-bottom: 10px;
}
.qa-item:last-child {
  margin-bottom: 0;
}
.qa-q {
  color: var(--vp-c-text-1);
  font-weight: 500;
  margin-bottom: 4px;
}
.qa-a {
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
.qa-placeholder {
  margin-top: 16px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 13px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px dashed var(--vp-c-divider);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>