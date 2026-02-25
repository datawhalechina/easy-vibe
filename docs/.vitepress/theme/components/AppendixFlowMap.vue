<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'

const categories = [
  {
    id: 'computer-fundamentals',
    name: '计算机基础',
    icon: '💻',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #10b98115, #10b98108)',
    articles: [
      { title: 'Vibe Coding 全栈开发', path: '/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack' },
      { title: '从晶体管到 CPU', path: '/zh-cn/appendix/1-computer-fundamentals/transistor-to-cpu' },
      { title: '操作系统', path: '/zh-cn/appendix/1-computer-fundamentals/operating-systems' },
      { title: '数据结构', path: '/zh-cn/appendix/1-computer-fundamentals/data-structures' },
      { title: '算法思维入门', path: '/zh-cn/appendix/1-computer-fundamentals/algorithm-thinking' },
      { title: '编程语言图谱', path: '/zh-cn/appendix/1-computer-fundamentals/programming-languages' },
      { title: '网络基础', path: '/zh-cn/appendix/1-computer-fundamentals/computer-networks' }
    ]
  },
  {
    id: 'development-tools',
    name: '开发工具',
    icon: '🔧',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #3b82f615, #3b82f608)',
    articles: [
      { title: 'IDE 基础', path: '/zh-cn/appendix/2-development-tools/ide-basics' },
      { title: '命令行与 Shell', path: '/zh-cn/appendix/2-development-tools/command-line-shell' },
      { title: 'Git 版本控制', path: '/zh-cn/appendix/2-development-tools/git-version-control' },
      { title: '环境变量与 PATH', path: '/zh-cn/appendix/2-development-tools/environment-path' },
      { title: '包管理器', path: '/zh-cn/appendix/2-development-tools/package-managers' },
      { title: '调试的艺术', path: '/zh-cn/appendix/2-development-tools/debugging-art/' }
    ]
  },
  {
    id: 'browser-frontend',
    name: '浏览器与前端',
    icon: '🌍',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #f59e0b15, #f59e0b08)',
    articles: [
      { title: 'JavaScript 深入', path: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive' },
      { title: 'TypeScript', path: '/zh-cn/appendix/3-browser-and-frontend/typescript' },
      { title: '浏览器是一个操作系统', path: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os' },
      { title: '浏览器渲染管道', path: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os-rendering' },
      { title: '前端框架对比', path: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks' },
      { title: '前端工程化', path: '/zh-cn/appendix/3-browser-and-frontend/frontend-engineering' }
    ]
  },
  {
    id: 'server-backend',
    name: '服务端与后端',
    icon: '⚙️',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #8b5cf615, #8b5cf608)',
    articles: [
      { title: '后端语言对比', path: '/zh-cn/appendix/4-server-and-backend/backend-languages' },
      { title: 'HTTP 协议', path: '/zh-cn/appendix/4-server-and-backend/http-protocol' },
      { title: 'API 设计哲学', path: '/zh-cn/appendix/4-server-and-backend/api-design' },
      { title: 'Web 框架的本质', path: '/zh-cn/appendix/4-server-and-backend/web-frameworks' },
      { title: '认证与授权', path: '/zh-cn/appendix/4-server-and-backend/auth-authorization' },
      { title: '缓存策略', path: '/zh-cn/appendix/4-server-and-backend/caching' },
      { title: '消息队列', path: '/zh-cn/appendix/4-server-and-backend/message-queues' }
    ]
  },
  {
    id: 'data',
    name: '数据',
    icon: '📊',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #ec489915, #ec489908)',
    articles: [
      { title: 'SQL', path: '/zh-cn/appendix/5-data/sql' },
      { title: '数据库原理', path: '/zh-cn/appendix/5-data/database-fundamentals' },
      { title: '数据模型全景', path: '/zh-cn/appendix/5-data/data-models' },
      { title: '数据分析基础', path: '/zh-cn/appendix/5-data/data-analysis' }
    ]
  },
  {
    id: 'architecture',
    name: '架构设计',
    icon: '🏗️',
    color: '#14b8a6',
    bgGradient: 'linear-gradient(135deg, #14b8a615, #14b8a608)',
    articles: [
      { title: '从单体到微服务', path: '/zh-cn/appendix/6-architecture-and-system-design/monolith-to-microservices' },
      { title: '分布式系统', path: '/zh-cn/appendix/6-architecture-and-system-design/distributed-systems' },
      { title: '高可用与容灾', path: '/zh-cn/appendix/6-architecture-and-system-design/high-availability' },
      { title: '系统设计方法论', path: '/zh-cn/appendix/6-architecture-and-system-design/system-design-methodology' }
    ]
  },
  {
    id: 'infrastructure',
    name: '基础设施',
    icon: '☁️',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #06b6d415, #06b6d408)',
    articles: [
      { title: 'Linux 基础', path: '/zh-cn/appendix/7-infrastructure-and-operations/linux-basics' },
      { title: 'Docker 容器化', path: '/zh-cn/appendix/7-infrastructure-and-operations/docker-containers' },
      { title: 'Kubernetes', path: '/zh-cn/appendix/7-infrastructure-and-operations/kubernetes' },
      { title: 'CI/CD 自动化', path: '/zh-cn/appendix/7-infrastructure-and-operations/ci-cd' }
    ]
  },
  {
    id: 'ai',
    name: '人工智能',
    icon: '🤖',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #f9731615, #f9731608)',
    articles: [
      { title: 'AI 简史', path: '/zh-cn/appendix/8-artificial-intelligence/ai-history' },
      { title: '神经网络', path: '/zh-cn/appendix/8-artificial-intelligence/neural-networks' },
      { title: 'Transformer', path: '/zh-cn/appendix/8-artificial-intelligence/transformer-attention' },
      { title: '大语言模型原理', path: '/zh-cn/appendix/8-artificial-intelligence/llm-principles' },
      { title: 'RAG 架构', path: '/zh-cn/appendix/8-artificial-intelligence/rag' },
      { title: 'AI Agent', path: '/zh-cn/appendix/8-artificial-intelligence/ai-agents' }
    ]
  },
  {
    id: 'engineering',
    name: '工程素养',
    icon: '✨',
    color: '#a855f7',
    bgGradient: 'linear-gradient(135deg, #a855f715, #a855f708)',
    articles: [
      { title: '设计模式', path: '/zh-cn/appendix/9-engineering-excellence/design-patterns' },
      { title: '代码质量与重构', path: '/zh-cn/appendix/9-engineering-excellence/code-quality-refactoring' },
      { title: '测试策略', path: '/zh-cn/appendix/9-engineering-excellence/testing-strategies' },
      { title: '技术写作', path: '/zh-cn/appendix/9-engineering-excellence/technical-writing' },
      { title: '开源协作', path: '/zh-cn/appendix/9-engineering-excellence/open-source-collaboration' }
    ]
  }
]

const activeCategory = ref(null)
const hoveredArticle = ref(null)

const toggleCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? null : id
}

const articleCount = categories.reduce((sum, cat) => sum + cat.articles.length, 0)
</script>

<template>
  <div class="appendix-bento">
    <div class="bento-header">
      <h3 class="bento-title">探索附录</h3>
      <p class="bento-subtitle">9 个主题方向 · {{ articleCount }} 篇文章</p>
    </div>

    <div class="bento-grid">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bento-card"
        :class="{ active: activeCategory === category.id }"
        :style="{ 
          '--card-color': category.color,
          '--card-bg': category.bgGradient
        }"
        @click="toggleCategory(category.id)"
      >
        <div class="card-icon">{{ category.icon }}</div>
        <div class="card-content">
          <h4 class="card-title">{{ category.name }}</h4>
          <p class="card-count">{{ category.articles.length }} 篇</p>
        </div>
        
        <Transition name="pop">
          <div v-if="activeCategory === category.id" class="card-articles">
            <a
              v-for="article in category.articles"
              :key="article.path"
              :href="withBase(article.path)"
              class="article-item"
              @mouseenter="hoveredArticle = article.path"
              @mouseleave="hoveredArticle = null"
            >
              <span class="article-dot"></span>
              <span class="article-title">{{ article.title }}</span>
              <span class="article-arrow">→</span>
            </a>
          </div>
        </Transition>
        
        <div class="card-indicator" v-if="activeCategory !== category.id">
          <span>{{ category.articles.length }} 篇 →</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appendix-bento {
  padding: 1rem 0;
}

.bento-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.bento-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
}

.bento-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 900px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

.bento-card {
  position: relative;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--card-bg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bento-card:hover::before {
  opacity: 1;
}

.bento-card:hover {
  border-color: var(--card-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.bento-card.active {
  border-color: var(--card-color);
  background: var(--vp-c-bg);
}

.bento-card.active::before {
  opacity: 1;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  position: relative;
}

.card-content {
  position: relative;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.card-count {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.card-indicator {
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  transition: all 0.2s ease;
}

.bento-card:hover .card-indicator {
  color: var(--card-color);
}

.card-articles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vp-c-bg);
  border-radius: 15px;
  padding: 1rem;
  overflow-y: auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.article-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  color: var(--vp-c-text-1);
}

.article-item:hover {
  background: var(--vp-c-bg-soft);
}

.article-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--card-color);
  flex-shrink: 0;
}

.article-title {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
}

.article-arrow {
  opacity: 0;
  color: var(--card-color);
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.article-item:hover .article-arrow {
  opacity: 1;
  transform: translateX(3px);
}

/* Animations */
.pop-enter-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pop-leave-active {
  transition: all 0.2s ease;
}

.pop-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.pop-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>