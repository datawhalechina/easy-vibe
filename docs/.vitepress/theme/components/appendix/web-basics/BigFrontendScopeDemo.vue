<!--
  BigFrontendScopeDemo.vue
  前端 vs 大前端（跨端）范围演示
-->
<template>
  <div class="bigfe-demo">
    <div class="header">
      <div class="title">前端 vs 大前端：到底“前端”都包含什么？</div>
      <div class="subtitle">点一下不同“端”，立刻看到它跑在哪里、怎么发布</div>
    </div>

    <div class="platforms">
      <button
        v-for="p in platforms"
        :key="p.key"
        class="platform"
        :class="{ active: current === p.key }"
        @click="current = p.key"
      >
        <span class="icon">{{ p.icon }}</span>
        <span>{{ p.label }}</span>
      </button>
    </div>

    <div class="cards">
      <div class="card">
        <div class="label">运行环境</div>
        <div class="value">{{ currentData.runtime }}</div>
      </div>
      <div class="card">
        <div class="label">主要技术</div>
        <div class="value">{{ currentData.stack }}</div>
      </div>
      <div class="card">
        <div class="label">发布方式</div>
        <div class="value">{{ currentData.release }}</div>
      </div>
    </div>

    <div class="skills">
      <div class="skills-title">哪些能力是“共通的”？</div>
      <div class="tags">
        <span v-for="t in commonSkills" :key="t" class="tag">{{ t }}</span>
      </div>
      <div class="skills-note">
        大前端的核心不是“会更多框架”，而是：<strong>用同一套工程能力，把体验交付到不同平台</strong>。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const platforms = [
  { key: 'web', label: 'Web 网站', icon: '🌐' },
  { key: 'h5', label: 'H5 活动页', icon: '📱' },
  { key: 'miniapp', label: '小程序', icon: '🧩' },
  { key: 'native', label: 'App（原生）', icon: '📲' },
  { key: 'cross', label: '跨端 App', icon: '🧱' },
  { key: 'desktop', label: '桌面应用', icon: '🖥️' }
]

const current = ref('web')

const data = {
  web: {
    runtime: '浏览器 (Chrome/Safari/Edge)',
    stack: 'HTML + CSS + JavaScript / Vue / React',
    release: '部署到服务器/静态托管，用户刷新即可更新'
  },
  h5: {
    runtime: '手机浏览器 / App 内的 WebView',
    stack: '同 Web，但更关注性能与兼容',
    release: '发链接/扫码即用，迭代很快'
  },
  miniapp: {
    runtime: '小程序运行时（微信/支付宝等）',
    stack: '小程序框架 + JS/TS + 组件',
    release: '需要审核/发布（比网页慢一些）'
  },
  native: {
    runtime: 'iOS/Android 原生系统',
    stack: 'Swift/Objective-C / Kotlin/Java',
    release: '应用商店上架（流程最慢，但能力最强）'
  },
  cross: {
    runtime: '原生壳 + 跨端引擎',
    stack: 'React Native / Flutter（用一套代码做多端）',
    release: '仍走商店流程，但研发复用更高'
  },
  desktop: {
    runtime: 'Windows/macOS/Linux',
    stack: 'Electron / Tauri（用 Web 技术做桌面）',
    release: '打包成安装包/自动更新'
  }
}

const currentData = computed(() => data[current.value] || data.web)

const commonSkills = [
  'HTTP/网络',
  '性能优化',
  '工程化与构建',
  '组件化',
  '状态管理',
  '调试与排错',
  '用户体验'
]
</script>

<style scoped>
.bigfe-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 1rem;
}

.platform {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.platform.active {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.12);
}

.icon {
  font-size: 1rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.85rem;
}

.label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.value {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
}

.skills {
  margin-top: 1rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 1rem;
}

.skills-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tag {
  font-size: 0.8rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.skills-note {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
