<template>
  <div class="url-parser-demo">
    <div class="browser-bar">
      <div class="nav-buttons">
        <span class="nav-btn">←</span>
        <span class="nav-btn">→</span>
        <span class="nav-btn">↻</span>
      </div>
      <div class="omnibox">
        <span class="lock-icon">🔒</span>
        <!-- Segmented URL Display -->
        <div class="segmented-url" v-if="parsedUrl">
          <span
            class="url-part protocol"
            :class="{ active: highlightedPart === 'protocol' }"
            @mouseover="highlightedPart = 'protocol'"
            @mouseleave="highlightedPart = null"
            >{{ parts.protocol }}:</span
          >
          <span class="divider">//</span>
          <span
            class="url-part host"
            :class="{ active: highlightedPart === 'host' }"
            @mouseover="highlightedPart = 'host'"
            @mouseleave="highlightedPart = null"
            >{{ parts.host }}</span
          >
          <span
            v-if="parts.port"
            class="url-part port"
            :class="{ active: highlightedPart === 'port' }"
            @mouseover="highlightedPart = 'port'"
            @mouseleave="highlightedPart = null"
            >:{{ parts.port }}</span
          >
          <span
            class="url-part pathname"
            :class="{ active: highlightedPart === 'pathname' }"
            @mouseover="highlightedPart = 'pathname'"
            @mouseleave="highlightedPart = null"
            >{{ parts.pathname }}</span
          >
          <span
            v-if="parts.search"
            class="url-part search"
            :class="{ active: highlightedPart === 'search' }"
            @mouseover="highlightedPart = 'search'"
            @mouseleave="highlightedPart = null"
            >{{ parts.search }}</span
          >
          <span
            v-if="parts.hash"
            class="url-part hash"
            :class="{ active: highlightedPart === 'hash' }"
            @mouseover="highlightedPart = 'hash'"
            @mouseleave="highlightedPart = null"
            >{{ parts.hash }}</span
          >
        </div>
        <input
          v-else
          v-model="inputUrl"
          type="text"
          class="url-input"
          placeholder="https://example.com"
        />
      </div>
    </div>

    <div class="visualization-area">
      <div v-if="parsedUrl" class="url-breakdown">
        <div
          v-for="(part, key) in parts"
          :key="key"
          class="url-segment"
          :class="[key, { active: highlightedPart === key }]"
          @mouseover="highlightedPart = key"
          @mouseleave="highlightedPart = null"
        >
          <div class="segment-header">
            <span class="segment-icon">{{ icons[key] }}</span>
            <span class="segment-label">{{ labels[key] }}</span>
          </div>
          <div class="segment-value">{{ part || '-' }}</div>
          <div class="segment-desc">{{ descriptions[key] }}</div>
        </div>
      </div>
      <div v-else class="error-state">Invalid URL format / 无效的 URL 格式</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'zh'
  }
})

const inputUrl = ref('https://shop.com/toys/lego-castle?color=red#summary')
const highlightedPart = ref(null)

const icons = {
  protocol: '🚛',
  host: '🏢',
  port: '🚪',
  pathname: '🧸',
  search: '📝',
  hash: '📍'
}

const labels = {
  protocol: '交通方式 (Protocol)',
  host: '店铺地址 (Host)',
  port: '大门号 (Port)',
  pathname: '商品位置 (Path)',
  search: '备注要求 (Query)',
  hash: '快速定位 (Hash)'
}

const descriptions = {
  protocol: '怎么去？(例如 https = 坐装甲车去，很安全)',
  host: '去哪家店？(域名，例如 shop.com)',
  port: '从哪个门进？(默认 443 号门)',
  pathname: '商品在哪个货架？(路径)',
  search: '给店员的备注 (例如 ?color=red)',
  hash: '直接翻到说明书第几页 (锚点)'
}

const parsedUrl = computed(() => {
  try {
    return new URL(inputUrl.value)
  } catch (e) {
    return null
  }
})

const parts = computed(() => {
  if (!parsedUrl.value) return {}
  return {
    protocol: parsedUrl.value.protocol.replace(':', ''),
    host: parsedUrl.value.hostname,
    port:
      parsedUrl.value.port ||
      (parsedUrl.value.protocol === 'https:' ? '443' : '80'),
    pathname: parsedUrl.value.pathname,
    search: parsedUrl.value.search,
    hash: parsedUrl.value.hash
  }
})
</script>

<style scoped>
.url-parser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  overflow: hidden;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.browser-bar {
  background: var(--vp-c-bg-soft);
  padding: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-buttons {
  display: flex;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
  user-select: none;
}

.omnibox {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 0.9rem;
  overflow: hidden;
}

.lock-icon {
  font-size: 0.8rem;
}

/* Segmented URL Styles */
.segmented-url {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.url-part {
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
}

.url-part:hover,
.url-part.active {
  transform: scale(1.1);
}

.url-part.protocol {
  color: #ef4444;
}
.url-part.host {
  color: #3b82f6;
}
.url-part.port {
  color: #f59e0b;
}
.url-part.pathname {
  color: #10b981;
}
.url-part.search {
  color: #8b5cf6;
}
.url-part.hash {
  color: #ec4899;
}

.url-part.active.protocol {
  background: #fef2f2;
}
.url-part.active.host {
  background: #eff6ff;
}
.url-part.active.port {
  background: #fffbeb;
}
.url-part.active.pathname {
  background: #ecfdf5;
}
.url-part.active.search {
  background: #f5f3ff;
}
.url-part.active.hash {
  background: #fdf2f8;
}

.divider {
  color: var(--vp-c-text-3);
  margin: 0 1px;
}

.visualization-area {
  padding: 1.5rem;
}

.url-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.url-segment {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid transparent; /* Prepare for border color */
  background: var(--vp-c-bg-alt);
  transition: all 0.2s;
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.url-segment.active {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Color Coding for Cards */
.url-segment.protocol {
  border-color: #ef4444;
}
.url-segment.host {
  border-color: #3b82f6;
}
.url-segment.port {
  border-color: #f59e0b;
}
.url-segment.pathname {
  border-color: #10b981;
}
.url-segment.search {
  border-color: #8b5cf6;
}
.url-segment.hash {
  border-color: #ec4899;
}

.url-segment.active.protocol {
  background: #fef2f2;
}
.url-segment.active.host {
  background: #eff6ff;
}
.url-segment.active.port {
  background: #fffbeb;
}
.url-segment.active.pathname {
  background: #ecfdf5;
}
.url-segment.active.search {
  background: #f5f3ff;
}
.url-segment.active.hash {
  background: #fdf2f8;
}

.segment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 0.5rem;
}

.segment-icon {
  font-size: 1.2rem;
}

.segment-label {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.segment-value {
  font-size: 1.1rem;
  font-weight: bold;
  word-break: break-all;
  font-family: monospace;
}

.segment-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.error-state {
  text-align: center;
  color: #ef4444;
  padding: 2rem;
}
</style>
