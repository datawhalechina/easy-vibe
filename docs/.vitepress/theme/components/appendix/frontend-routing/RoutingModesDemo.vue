<template>
  <div class="routing-modes-demo">
    <div class="demo-header">
      <span class="icon">🔀</span>
      <span class="title">路由模式</span>
      <span class="subtitle">不同的URL管理方式</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">寄快递</span>：可以选择平邮（Hash，简单但慢）、快递（History，快速但需要配合）、或者专人送达（Memory，特殊场景）。不同模式适合不同需求。
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

    <div class="mode-detail">
      <div class="mode-info">
        <h5>{{ getCurrentMode().name }}</h5>
        <p class="mode-desc">
          {{ getCurrentMode().description }}
        </p>
      </div>

      <div class="mode-features">
        <div class="feature-section">
          <h6>✅ 优点</h6>
          <ul>
            <li
              v-for="pro in getCurrentMode().pros"
              :key="pro"
            >
              {{ pro }}
            </li>
          </ul>
        </div>
        <div class="feature-section">
          <h6>❌ 缺点</h6>
          <ul>
            <li
              v-for="con in getCurrentMode().cons"
              :key="con"
            >
              {{ con }}
            </li>
          </ul>
        </div>
      </div>

      <div class="url-example">
        <h6>🌐 URL 示例</h6>
        <div class="url-bar">
          <span class="url-prefix">https://example.com</span>
          <span class="url-suffix">{{ getUrlSuffix() }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>选择建议：</strong>现代Web应用优先选History模式，老项目或特殊场景用Hash，移动端App或测试环境可用Memory模式。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentMode = ref('history')

const modes = [
  {
    key: 'hash',
    name: 'Hash 模式',
    icon: '#',
    description: '使用URL的hash部分（#）来模拟路由，兼容性最好',
    pros: ['兼容IE8+', '无需服务端配置', '部署简单'],
    cons: ['URL带有#号', 'SEO不友好', '分享可能丢失hash']
  },
  {
    key: 'history',
    name: 'History 模式',
    icon: '/',
    description: '使用HTML5 History API实现URL管理，最常用的模式',
    pros: ['URL美观', 'SEO友好', '符合用户习惯'],
    cons: ['需要服务端配置', '兼容性IE10+', '刷新返回404']
  },
  {
    key: 'memory',
    name: 'Memory 模式',
    icon: 'M',
    description: '将路由信息保存在内存中，不修改浏览器URL',
    pros: ['无需浏览器环境', '适用于测试', '移动端App内嵌'],
    cons: ['不支持刷新', 'URL不变化', '仅限特定场景']
  }
]

const switchMode = (mode) => {
  currentMode.value = mode
}

const getCurrentMode = () => {
  return modes.find(m => m.key === currentMode.value) || modes[0]
}

const getUrlSuffix = () => {
  const path = '/home'
  switch (currentMode.value) {
    case 'hash':
      return `/#${path}`
    case 'history':
      return path
    case 'memory':
      return ' (URL不变)'
    default:
      return path
  }
}
</script>

<style scoped>
.routing-modes-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
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

.mode-selector {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
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
  font-size: 1rem;
}

.mode-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.mode-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.mode-info h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.mode-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.mode-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.feature-section h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.feature-section ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.feature-section li {
  margin: 0.25rem 0;
}

.url-example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
}

.url-example h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.url-bar {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider);
}

.url-prefix {
  color: var(--vp-c-text-3);
}

.url-suffix {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .mode-features {
    grid-template-columns: 1fr;
  }
}
</style>
