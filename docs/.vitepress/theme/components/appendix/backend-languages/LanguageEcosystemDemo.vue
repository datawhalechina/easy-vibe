<template>
  <div class="language-ecosystem-demo">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">生态系统</span>
      <span class="subtitle">不同语言的社区和包管理器</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">逛超市</span>：有的超市商品种类多但质量参差（NPM），有的商品质量高但价格贵（Java Maven），有的商品精挑细选（Go Modules）。
    </div>

    <div class="ecosystem-grid">
      <div
        v-for="eco in ecosystems"
        :key="eco.name"
        class="eco-card"
      >
        <div class="eco-icon">{{ eco.icon }}</div>
        <div class="eco-name">{{ eco.name }}</div>
        <div class="eco-lang">{{ eco.language }}</div>
        <div class="eco-stats">
          <div class="stat">
            <span class="stat-label">包数量</span>
            <span class="stat-value">{{ eco.packages }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">特点</span>
            <span class="stat-value">{{ eco.feature }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>JavaScript/Node.js 的 NPM 是世界最大的包仓库，几乎任何功能都有现成方案。Python 的 PyPI 在 AI 领域无敌。Go 的 Go Modules 简洁可靠，没有依赖地狱。
    </div>
  </div>
</template>

<script setup>
const ecosystems = [
  {
    name: 'NPM',
    icon: '💚',
    language: 'Node.js',
    packages: '200万+',
    feature: '最大生态'
  },
  {
    name: 'PyPI',
    icon: '🐍',
    language: 'Python',
    packages: '50万+',
    feature: 'AI 霸主'
  },
  {
    name: 'Maven',
    icon: '☕',
    language: 'Java',
    packages: '30万+',
    feature: '企业级'
  },
  {
    name: 'Go Modules',
    icon: '🐹',
    language: 'Go',
    packages: '10万+',
    feature: '简洁可靠'
  },
  {
    name: 'Cargo',
    icon: '🦀',
    language: 'Rust',
    packages: '10万+',
    feature: '现代化'
  },
  {
    name: 'RubyGems',
    icon: '💎',
    language: 'Ruby',
    packages: '15万+',
    feature: '优雅'
  }
]
</script>

<style scoped>
.language-ecosystem-demo {
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

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

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

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.eco-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.eco-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.eco-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.eco-lang {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.eco-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
}

.stat-label {
  color: var(--vp-c-text-2);
}

.stat-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
