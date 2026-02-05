<template>
  <div class="routing-modes-demo">
    <div class="demo-header">
      <h4>路由模式对比</h4>
      <p class="demo-desc">点击切换不同路由模式，观察URL变化和浏览器行为</p>
    </div>

    <div class="mode-selector">
      <button
        v-for="mode in modes"
        :key="mode.key"
        :class="['mode-btn', { active: currentMode === mode.key }]"
        @click="switchMode(mode.key)"
      >
        <span class="mode-icon">{{ mode.icon }}</span>
        <span class="mode-name">{{ mode.name }}</span>
      </button>
    </div>

    <div class="demo-content">
      <div class="browser-mockup">
        <div class="browser-header">
          <div class="browser-controls">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="address-bar">
            <span class="url-protocol">{{ getProtocol() }}</span>
            <span class="url-host">example.com</span>
            <span class="url-path">{{ currentPath }}</span>
            <span v-if="currentMode === 'hash'" class="url-hash">#/home</span>
          </div>
        </div>
        <div class="browser-content">
          <nav class="nav-menu">
            <a
              v-for="item in navItems"
              :key="item.path"
              :class="['nav-link', { active: currentPath === item.path }]"
              @click="navigate(item.path)"
            >
              {{ item.name }}
            </a>
          </nav>
          <div class="page-content">
            <div class="page-header">
              <h2>{{ getPageTitle() }}</h2>
            </div>
            <div class="page-body">
              <p>{{ getPageContent() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mode-info">
        <div class="info-card">
          <h5>{{ getCurrentMode().name }}</h5>
          <p class="info-desc">{{ getCurrentMode().description }}</p>
          <div class="pros-cons">
            <div class="pros">
              <h6>优点</h6>
              <ul>
                <li v-for="pro in getCurrentMode().pros" :key="pro">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h6>缺点</h6>
              <ul>
                <li v-for="con in getCurrentMode().cons" :key="con">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentMode = ref('history')
const currentPath = ref('/home')

const modes = [
  {
    key: 'hash',
    name: 'Hash 模式',
    icon: '#',
    description: '使用URL的hash部分（#）来模拟完整URL，当hash改变时不会触发页面刷新。',
    pros: ['兼容性好，支持IE8+', '无需服务端配置', '部署简单'],
    cons: ['URL带有#号，不够美观', '部分浏览器分享链接可能丢失hash', 'SEO不友好']
  },
  {
    key: 'history',
    name: 'History 模式',
    icon: '/',
    description: '使用HTML5 History API（pushState/replaceState）来实现无刷新导航。',
    pros: ['URL美观，没有#号', '更符合用户习惯', 'SEO友好'],
    cons: ['需要服务端支持', '兼容性要求IE10+', '配置相对复杂']
  },
  {
    key: 'memory',
    name: 'Memory 模式',
    icon: 'M',
    description: '将路由信息保存在内存中，不修改浏览器URL，适用于非浏览器环境。',
    pros: ['无需浏览器环境', '适用于测试环境', '移动端App内嵌'],
    cons: ['不支持浏览器刷新', 'URL不会同步', '仅适用于特定场景']
  }
]

const navItems = [
  { name: '首页', path: '/home' },
  { name: '产品', path: '/products' },
  { name: '关于', path: '/about' },
  { name: '用户', path: '/user/profile' }
]

const switchMode = (mode) => {
  currentMode.value = mode
  // 重置路径
  currentPath.value = '/home'
}

const navigate = (path) => {
  currentPath.value = path
  // 模拟路由切换效果
  if (currentMode.value === 'history') {
    // History模式下使用pushState（这里仅模拟）
    console.log(`pushState: ${path}`)
  } else if (currentMode.value === 'hash') {
    // Hash模式下修改hash
    console.log(`hashchange: #${path}`)
  }
}

const getProtocol = () => {
  return 'https://'
}

const getCurrentMode = () => {
  return modes.find(m => m.key === currentMode.value) || modes[0]
}

const getPageTitle = () => {
  const item = navItems.find(i => i.path === currentPath.value)
  return item ? `${item.name}页面` : '首页'
}

const getPageContent = () => {
  const contents = {
    '/home': '欢迎来到首页！这是SPA应用的入口页面，所有导航都在前端完成，无需刷新整个页面。',
    '/products': '产品列表页面展示了我们的核心产品。你可以在这里浏览、筛选和查看详情。',
    '/about': '关于我们页面介绍了公司的历史、愿景和团队信息。',
    '/user/profile': '个人中心页面，显示用户的基本信息、订单历史和设置选项。'
  }
  return contents[currentPath.value] || contents['/home']
}
</script>

<style scoped>
.routing-modes-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
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

.mode-selector {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mode-icon {
  font-weight: bold;
  font-size: 16px;
}

.mode-name {
  font-size: 14px;
  font-weight: 500;
}

.demo-content {
  display: grid;
  gap: 20px;
}

.browser-mockup {
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.browser-header {
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.browser-controls {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.address-bar {
  flex: 1;
  background: var(--vp-c-bg);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-family: monospace;
  display: flex;
  align-items: center;
  gap: 2px;
}

.url-protocol { color: var(--vp-c-text-3); }
.url-host { color: var(--vp-c-text-2); }
.url-path { color: var(--vp-c-brand); font-weight: 500; }
.url-hash { color: #e06c75; font-weight: 500; }

.browser-content {
  display: flex;
  min-height: 200px;
}

.nav-menu {
  width: 120px;
  background: var(--vp-c-bg-soft);
  padding: 16px 0;
  border-right: 1px solid var(--vp-c-divider);
}

.nav-link {
  display: block;
  padding: 10px 16px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-link:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.nav-link.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-right: 2px solid var(--vp-c-brand);
}

.page-content {
  flex: 1;
  padding: 20px;
}

.page-header h2 {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
  font-size: 20px;
}

.page-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.mode-info {
  margin-top: 16px;
}

.info-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.info-card h5 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.info-desc {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.pros, .cons {
  padding: 12px;
  border-radius: 6px;
}

.pros {
  background: rgba(39, 201, 63, 0.1);
}

.cons {
  background: rgba(255, 95, 86, 0.1);
}

.pros h6, .cons h6 {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
}

.pros h6 {
  color: #27c93f;
}

.cons h6 {
  color: #ff5f56;
}

.pros ul, .cons ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.pros li, .cons li {
  margin: 4px 0;
}

@media (max-width: 768px) {
  .mode-selector {
    flex-direction: column;
    align-items: stretch;
  }

  .mode-btn {
    justify-content: center;
  }

  .browser-content {
    flex-direction: column;
  }

  .nav-menu {
    width: 100%;
    display: flex;
    padding: 8px;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .nav-link {
    padding: 8px 12px;
    white-space: nowrap;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>