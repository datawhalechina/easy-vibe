<template>
  <div class="url-parser-demo">
    <div class="control-panel">
      <div class="input-group">
        <label>输入 URL</label>
        <input
          v-model="inputUrl"
          type="text"
          placeholder="https://www.example.com:8080/path?query=1#fragment"
          class="url-input"
        />
      </div>
      <div class="encoding-toggle">
        <button @click="encodeUrl" class="action-btn">Encode</button>
        <button @click="decodeUrl" class="action-btn">Decode</button>
      </div>
    </div>

    <div class="visualization-area">
      <div v-if="parsedUrl" class="url-parts">
        <div
          v-for="(part, key) in parts"
          :key="key"
          class="url-part"
          :class="key"
          @mouseover="highlightedPart = key"
          @mouseleave="highlightedPart = null"
        >
          <div class="part-label">{{ labels[key] }}</div>
          <div class="part-value">{{ part || '-' }}</div>
          <div class="part-desc" v-if="highlightedPart === key">
            {{ descriptions[key] }}
          </div>
        </div>
      </div>
      <div v-else class="error-message">无效的 URL 格式</div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Note:</strong>
        URL (统一资源定位符)
        是互联网资源的地址。浏览器首先需要将它拆解成不同的部分，才能知道要去哪里（域名）、用什么方式（协议）、找什么东西（路径）。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const inputUrl = ref(
  'https://www.example.com:8080/search/results?q=vue&page=1#top'
)
const highlightedPart = ref(null)

const labels = {
  protocol: '协议 (Protocol)',
  host: '域名 (Host)',
  port: '端口 (Port)',
  pathname: '路径 (Path)',
  search: '查询 (Query)',
  hash: '锚点 (Fragment)'
}

const descriptions = {
  protocol: '告诉浏览器使用什么方式连接（如 https 安全连接）',
  host: '服务器的地址，需要通过 DNS 解析为 IP',
  port: '服务器的门牌号（http默认80，https默认443）',
  pathname: '资源在服务器上的具体位置',
  search: '传递给服务器的额外参数',
  hash: '页面内的定位标记，不会发送给服务器'
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

const encodeUrl = () => {
  inputUrl.value = encodeURI(inputUrl.value)
}

const decodeUrl = () => {
  inputUrl.value = decodeURI(inputUrl.value)
}
</script>

<style scoped>
.url-parser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.url-input {
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: monospace;
  width: 100%;
}

.encoding-toggle {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: var(--vp-c-brand-dark);
}

.visualization-area {
  margin-bottom: 1.5rem;
  min-height: 200px;
}

.url-parts {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.url-part {
  flex: 1;
  min-width: 140px;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  position: relative;
  transition: all 0.2s;
  cursor: default;
}

.url-part:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.url-part.protocol {
  border-left: 4px solid #ef4444;
}
.url-part.host {
  border-left: 4px solid #3b82f6;
}
.url-part.port {
  border-left: 4px solid #f59e0b;
}
.url-part.pathname {
  border-left: 4px solid #10b981;
}
.url-part.search {
  border-left: 4px solid #8b5cf6;
}
.url-part.hash {
  border-left: 4px solid #ec4899;
}

.part-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.part-value {
  font-size: 1rem;
  font-weight: bold;
  word-break: break-all;
}

.part-desc {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--vp-c-text-inverse-1);
  color: var(--vp-c-text-inverse-2);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 10;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.error-message {
  color: #ef4444;
  text-align: center;
  padding: 2rem;
}
</style>
