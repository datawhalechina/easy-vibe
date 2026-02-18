<script setup>
import { ref } from 'vue'

const activeTab = ref('browser')

const tabs = [
  { value: 'browser', label: '浏览器环境', icon: '🌐' },
  { value: 'nodejs', label: 'Node.js 环境', icon: '🟢' }
]

const browserApis = [
  { name: 'window', description: '浏览器全局对象', example: 'window.location.href' },
  { name: 'document', description: 'DOM 操作', example: 'document.querySelector("h1")' },
  { name: 'localStorage', description: '本地存储', example: 'localStorage.setItem("key", "value")' },
  { name: 'fetch', description: '网络请求', example: 'fetch("/api/data")' },
  { name: 'setTimeout', description: '定时器', example: 'setTimeout(() => {}, 1000)' }
]

const nodeApis = [
  { name: 'global', description: 'Node.js 全局对象', example: 'global.process' },
  { name: 'process', description: '进程信息', example: 'process.env.NODE_ENV' },
  { name: 'fs', description: '文件系统', example: 'fs.readFile("./data.txt")' },
  { name: 'http', description: 'HTTP 服务器', example: 'http.createServer((req, res) => {})' },
  { name: 'path', description: '路径处理', example: 'path.join("/a", "b")' }
]

const tryCode = ref('console.log(typeof window)')

const browserResult = ref('')
const nodeResult = ref('')

const runInBrowser = () => {
  try {
    browserResult.value = eval(tryCode.value)
  } catch (e) {
    browserResult.value = e.message
  }
  nodeResult.value = '在 Node.js 中运行...'
}

const runInNode = () => {
  nodeResult.value = '在浏览器中无法直接运行 Node.js 代码'
  try {
    browserResult.value = eval(tryCode.value)
  } catch (e) {
    browserResult.value = e.message
  }
}

const reset = () => {
  browserResult.value = ''
  nodeResult.value = ''
  tryCode.value = 'console.log(typeof window)'
}
</script>

<template>
  <div class="runtime-environment-demo">
    <h3>运行时环境对比</h3>

    <div class="tab-container">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="{ 'active': activeTab === tab.value }"
          class="tab-btn"
          @click="activeTab = tab.value"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>

      <div class="tab-content">
        <!-- 浏览器环境 -->
        <div
          v-if="activeTab === 'browser'"
          class="environment-content"
        >
          <h4>浏览器环境</h4>

          <div class="api-grid">
            <div
              v-for="api in browserApis"
              :key="api.name"
              class="api-card"
            >
              <div class="api-name">
                {{ api.name }}
              </div>
              <div class="api-description">
                {{ api.description }}
              </div>
              <div class="api-example">
                {{ api.example }}
              </div>
            </div>
          </div>

          <div class="environment-note">
            <strong>特点:</strong>
            <ul>
              <li>✅ 有 DOM 和 BOM API,可以操作网页</li>
              <li>✅ 有 Web Storage (localStorage, sessionStorage)</li>
              <li>✅ 有 fetch 和 XMLHttpRequest 进行网络请求</li>
              <li>❌ 没有文件系统访问权限</li>
              <li>❌ 不能直接创建 HTTP 服务器</li>
            </ul>
          </div>
        </div>

        <!-- Node.js 环境 -->
        <div
          v-if="activeTab === 'nodejs'"
          class="environment-content"
        >
          <h4>Node.js 环境</h4>

          <div class="api-grid">
            <div
              v-for="api in nodeApis"
              :key="api.name"
              class="api-card"
            >
              <div class="api-name">
                {{ api.name }}
              </div>
              <div class="api-description">
                {{ api.description }}
              </div>
              <div class="api-example">
                {{ api.example }}
              </div>
            </div>
          </div>

          <div class="environment-note">
            <strong>特点:</strong>
            <ul>
              <li>✅ 有文件系统访问权限</li>
              <li>✅ 可以创建 HTTP 服务器</li>
              <li>✅ 可以操作进程和系统资源</li>
              <li>❌ 没有 DOM 和 BOM</li>
              <li>❌ 不能直接操作网页元素</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 代码对比演示 -->
    <div class="code-comparison-section">
      <h4>代码演示:不同环境的差异</h4>

      <div class="code-input">
        <label>试试运行这段代码:</label>
        <input
          v-model="tryCode"
          type="text"
          placeholder="输入 JavaScript 代码"
          class="code-input-field"
        >
      </div>

      <div class="result-grid">
        <div class="result-card">
          <div class="result-header">
            <span class="result-icon">🌐</span>
            <span class="result-title">浏览器结果</span>
          </div>
          <div class="result-content">
            {{ browserResult || '点击"在浏览器运行"查看结果' }}
          </div>
          <button
            class="run-btn"
            @click="runInBrowser"
          >
            在浏览器运行
          </button>
        </div>

        <div class="result-card">
          <div class="result-header">
            <span class="result-icon">🟢</span>
            <span class="result-title">Node.js 结果</span>
          </div>
          <div class="result-content">
            {{ nodeResult || '需要在 Node.js 环境中运行' }}
          </div>
          <button
            class="run-btn"
            disabled
            @click="runInNode"
          >
            需要终端运行
          </button>
        </div>
      </div>

      <button
        class="reset-btn"
        @click="reset"
      >
        重置
      </button>
    </div>

    <!-- 总结 -->
    <div class="summary-box">
      <p><strong>核心区别:</strong></p>
      <p>浏览器运行时专注于用户界面和网页交互,提供 DOM、BOM、fetch 等前端专用 API。</p>
      <p>Node.js 运行时专注于服务器端开发,提供文件系统、HTTP 服务器、进程管理等后端专用 API。</p>
      <p class="highlight">
        同样的 JavaScript 语法,但能用的 API 完全不同——这就是"环境判断"的重要性。
      </p>
    </div>
  </div>
</template>

<style scoped>
.runtime-environment-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tab-container {
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--vp-c-border);
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
}

.tab-btn:hover {
  color: var(--vp-c-brand-1);
}

.tab-btn.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.tab-icon {
  font-size: 18px;
  margin-right: 8px;
}

.tab-label {
  font-size: 14px;
}

.tab-content {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.api-card {
  padding: 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.2s ease;
}

.api-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.api-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 8px;
  font-family: 'Courier New', monospace;
}

.api-description {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.api-example {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-family: 'Courier New', monospace;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.environment-note {
  padding: 16px;
  background: rgba(62, 175, 124, 0.1);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
}

.environment-note strong {
  display: block;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.environment-note ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.environment-note li {
  padding: 4px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.code-comparison-section {
  border-top: 2px solid var(--vp-c-border);
  padding-top: 24px;
}

.code-input {
  margin-bottom: 20px;
}

.code-input label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.code-input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s ease;
}

.code-input-field:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
}

.result-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-border);
}

.result-icon {
  font-size: 20px;
}

.result-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.result-content {
  min-height: 60px;
  padding: 12px;
  margin-bottom: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.run-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.run-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.run-btn:disabled {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  cursor: not-allowed;
}

.reset-btn {
  padding: 10px 24px;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.summary-box {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
}

.summary-box p {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.summary-box p:last-child {
  margin-bottom: 0;
}

.summary-box strong {
  color: var(--vp-c-brand-1);
}

.summary-box .highlight {
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}
</style>
