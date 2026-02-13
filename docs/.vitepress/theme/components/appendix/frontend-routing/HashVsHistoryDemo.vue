<template>
  <div class="hash-vs-history-demo">
    <div class="demo-header">
      <span class="icon">⚖️</span>
      <span class="title">路由模式对比</span>
      <span class="subtitle">Hash vs History</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">邮寄包裹</span>：Hash模式像是把地址写在<span class="highlight">便签条</span>上（#后面），History模式则是直接写在<span class="highlight">信封</span>上。前者简单但不够正式，后者美观但需要服务端配合。
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
            <span class="char-label">兼容性</span>
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
            <span class="char-label">兼容性</span>
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

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>选择建议：</strong>现代项目优先选History模式（URL美观、SEO友好），如果需要兼容老浏览器或无法修改服务端配置，再用Hash模式。
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
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-column {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
}

.mode-header {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  font-size: 1rem;
  font-weight: bold;
}

.mode-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.browser-mockup {
  border-bottom: 1px solid var(--vp-c-divider);
}

.browser-toolbar {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-controls {
  display: flex;
  gap: 0.375rem;
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
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: monospace;
}

.protocol, .host { color: var(--vp-c-text-3); }
.hash-path { color: #e06c75; font-weight: 500; }
.history-path { color: #61afef; font-weight: 500; }

.browser-viewport {
  display: flex;
  min-height: 120px;
}

.nav-bar {
  width: 60px;
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0;
  border-right: 1px solid var(--vp-c-divider);
}

.nav-item {
  display: block;
  padding: 0.5rem 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
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
  padding: 0.75rem;
}

.page-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.page-content p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.characteristics {
  padding: 0.75rem;
}

.char-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.char-item:last-child {
  border-bottom: none;
}

.char-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.badge {
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.65rem;
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

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}
</style>
