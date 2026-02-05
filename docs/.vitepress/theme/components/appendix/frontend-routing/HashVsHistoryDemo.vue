<template>
  <div class="hash-vs-history-demo">
    <div class="demo-header">
      <h4>Hash vs History 模式对比</h4>
      <p class="demo-desc">直观对比两种主流路由模式的URL变化、浏览器行为和兼容性</p>
    </div>

    <div class="comparison-container">
      <!-- Hash Mode -->
      <div class="mode-column">
        <div class="mode-header hash">
          <span class="mode-icon">#</span>
          <span class="mode-title">Hash 模式</span>
        </div>

        <div class="browser-mockup">
          <div class="browser-toolbar">
            <div class="window-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="address-bar">
              <span class="protocol">https://</span>
              <span class="host">example.com</span>
              <span class="hash-path">/#/{{ hashPath }}</span>
            </div>
          </div>

          <div class="browser-viewport">
            <nav class="nav-bar">
              <a
                v-for="item in navItems"
                :key="item.path"
                :class="['nav-item', { active: hashPath === item.path }]"
                @click="hashPath = item.path"
              >
                {{ item.name }}
              </a>
            </nav>
            <div class="page-content">
              <h3>{{ getPageTitle(hashPath) }}</h3>
              <p>{{ getPageContent(hashPath) }}</p>
            </div>
          </div>
        </div>

        <div class="characteristics">
          <div class="char-item">
            <span class="char-label">URL格式</span>
            <code>/#/path</code>
          </div>
          <div class="char-item">
            <span class="char-label">浏览器兼容</span>
            <span class="badge good">IE8+</span>
          </div>
          <div class="char-item">
            <span class="char-label">服务端配置</span>
            <span class="badge good">无需配置</span>
          </div>
          <div class="char-item">
            <span class="char-label">SEO友好度</span>
            <span class="badge bad">较差</span>
          </div>
        </div>
      </div>

      <!-- History Mode -->
      <div class="mode-column">
        <div class="mode-header history">
          <span class="mode-icon">/</span>
          <span class="mode-title">History 模式</span>
        </div>

        <div class="browser-mockup">
          <div class="browser-toolbar">
            <div class="window-controls">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="address-bar">
              <span class="protocol">https://</span>
              <span class="host">example.com</span>
              <span class="history-path">/{{ historyPath }}</span>
            </div>
          </div>

          <div class="browser-viewport">
            <nav class="nav-bar">
              <a
                v-for="item in navItems"
                :key="item.path"
                :class="['nav-item', { active: historyPath === item.path }]"
                @click="historyPath = item.path"
              >
                {{ item.name }}
              </a>
            </nav>
            <div class="page-content">
              <h3>{{ getPageTitle(historyPath) }}</h3>
              <p>{{ getPageContent(historyPath) }}</p>
            </div>
          </div>
        </div>

        <div class="characteristics">
          <div class="char-item">
            <span class="char-label">URL格式</span>
            <code>/path</code>
          </div>
          <div class="char-item">
            <span class="char-label">浏览器兼容</span>
            <span class="badge medium">IE10+</span>
          </div>
          <div class="char-item">
            <span class="char-label">服务端配置</span>
            <span class="badge warn">需要配置</span>
          </div>
          <div class="char-item">
            <span class="char-label">SEO友好度</span>
            <span class="badge good">良好</span>
          </div>
        </div>
      </div>
    </div>

    <div class="summary-section">
      <h4>如何选择？</h4>
      <div class="decision-tree">
        <div class="decision-item">
          <span class="decision-q">需要支持IE8/9？</span>
          <span class="decision-a">→ 选 Hash 模式</span>
        </div>
        <div class="decision-item">
          <span class="decision-q">重视SEO？</span>
          <span class="decision-a">→ 选 History 模式</span>
        </div>
        <div class="decision-item">
          <span class="decision-q">无法修改服务端配置？</span>
          <span class="decision-a">→ 选 Hash 模式</span>
        </div>
        <div class="decision-item">
          <span class="decision-q">追求URL美观？</span>
          <span class="decision-a">→ 选 History 模式</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hashPath = ref('home')
const historyPath = ref('home')

const navItems = [
  { name: '首页', path: 'home' },
  { name: '产品', path: 'products' },
  { name: '关于', path: 'about' }
]

const getPageTitle = (path) => {
  const titles = {
    home: '首页',
    products: '产品中心',
    about: '关于我们'
  }
  return titles[path] || '首页'
}

const getPageContent = (path) => {
  const contents = {
    home: '欢迎来到我们的网站！这是SPA的首页，所有页面切换都在前端完成，无需刷新。',
    products: '这里展示了我们的核心产品系列。SPA让浏览体验更流畅，切换更快。',
    about: '了解更多关于我们的故事。SPA模式下，页面间跳转几乎没有延迟。'
  }
  return contents[path] || contents.home
}
</script>

<style scoped>
.hash-vs-history-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.demo-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.mode-column {
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.mode-header {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.mode-header.hash {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mode-header.history {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.mode-icon {
  font-size: 20px;
  font-weight: bold;
}

.mode-title {
  font-size: 16px;
  font-weight: 600;
}

.browser-mockup {
  border-bottom: 1px solid var(--vp-c-divider);
}

.browser-toolbar {
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.window-controls {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.address-bar {
  flex: 1;
  background: var(--vp-c-bg);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Monaco', 'Menlo', monospace;
}

.protocol, .host { color: var(--vp-c-text-3); }
.hash-path { color: #e06c75; font-weight: 500; }
.history-path { color: #61afef; font-weight: 500; }

.browser-viewport {
  display: flex;
  min-height: 160px;
}

.nav-bar {
  width: 80px;
  background: var(--vp-c-bg-soft);
  padding: 12px 0;
  border-right: 1px solid var(--vp-c-divider);
}

.nav-item {
  display: block;
  padding: 8px 12px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.nav-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-right: 2px solid var(--vp-c-brand);
}

.page-content {
  flex: 1;
  padding: 16px;
}

.page-content h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.page-content p {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.characteristics {
  padding: 16px;
}

.char-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.char-item:last-child {
  border-bottom: none;
}

.char-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.char-item code {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
}

.badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.badge.good {
  background: rgba(39, 201, 63, 0.15);
  color: #27c93f;
}

.badge.medium {
  background: rgba(255, 189, 46, 0.15);
  color: #ffbd2e;
}

.badge.warn {
  background: rgba(255, 149, 0, 0.15);
  color: #ff9500;
}

.badge.bad {
  background: rgba(255, 95, 86, 0.15);
  color: #ff5f56;
}

.summary-section {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
}

.summary-section h4 {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.decision-tree {
  display: grid;
  gap: 12px;
}

.decision-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand);
}

.decision-q {
  font-size: 14px;
  color: var(--vp-c-text-2);
  flex: 1;
}

.decision-a {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand);
  white-space: nowrap;
}

@media (max-width: 900px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }

  .decision-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
