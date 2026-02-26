<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

const categories = [
  {
    id: 'computer-fundamentals',
    name: '计算机基础',
    icon: '💻',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #10b98115, #10b98108)',
    description: '理解计算机最底层的工作原理',
    whyLearn: '这是所有软件工程的基础。掌握计算机如何执行代码、管理内存、处理请求，能帮助你写出更高效的代码。',
    learningGoals: ['CPU 与内存原理', '操作系统核心', '网络通信基础', '数据结构与算法'],
    articles: [
      { title: 'Vibe Coding 全栈开发', path: '/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack', description: 'AI 辅助时代下的全栈开发全景图' },
      { title: '从晶体管到 CPU', path: '/zh-cn/appendix/1-computer-fundamentals/transistor-to-cpu', description: '理解计算机最底层的硬件逻辑' },
      { title: '操作系统', path: '/zh-cn/appendix/1-computer-fundamentals/operating-systems', description: '进程管理、内存管理、文件系统' },
      { title: '数据结构', path: '/zh-cn/appendix/1-computer-fundamentals/data-structures', description: '数组、链表、树、图的组织方式' },
      { title: '算法思维入门', path: '/zh-cn/appendix/1-computer-fundamentals/algorithm-thinking', description: '排序、搜索、递归的思维框架' },
      { title: '编程语言图谱', path: '/zh-cn/appendix/1-computer-fundamentals/programming-languages', description: '从汇编到高级语言的演进' },
      { title: '网络基础', path: '/zh-cn/appendix/1-computer-fundamentals/computer-networks', description: '从网线到互联网的通信原理' }
    ]
  },
  {
    id: 'development-tools',
    name: '开发工具',
    icon: '🔧',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #3b82f615, #3b82f608)',
    description: '熟练使用命令行、Git、IDE 等工具',
    whyLearn: '工具是开发者的武器。掌握高效的工具使用能让你事半功倍，减少重复劳动。',
    learningGoals: ['IDE 高效使用', 'Git 版本控制', '命令行操作', '调试与排查'],
    articles: [
      { title: 'IDE 基础', path: '/zh-cn/appendix/2-development-tools/ide-basics', description: 'VS Code、Cursor、Trae 的使用技巧' },
      { title: '命令行与 Shell', path: '/zh-cn/appendix/2-development-tools/command-line-shell', description: '终端操作与脚本自动化' },
      { title: 'Git 版本控制', path: '/zh-cn/appendix/2-development-tools/git-version-control', description: '版本控制与团队协作' },
      { title: '环境变量与 PATH', path: '/zh-cn/appendix/2-development-tools/environment-path', description: '系统环境配置与问题排查' },
      { title: '包管理器', path: '/zh-cn/appendix/2-development-tools/package-managers', description: 'npm、pip、cargo 依赖管理' },
      { title: '调试的艺术', path: '/zh-cn/appendix/2-development-tools/debugging-art/', description: '断点调试与问题定位' }
    ]
  },
  {
    id: 'browser-frontend',
    name: '浏览器与前端',
    icon: '🌍',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #f59e0b15, #f59e0b08)',
    description: '掌握浏览器原理和前端开发技术',
    whyLearn: '浏览器是用户接触软件的入口。理解浏览器如何渲染页面，能帮助你构建更流畅的 Web 应用。',
    learningGoals: ['浏览器渲染原理', 'JavaScript 核心', '前端框架对比', '前端工程化'],
    articles: [
      { title: 'JavaScript 深入', path: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive', description: '闭包、原型链、异步核心概念' },
      { title: 'TypeScript', path: '/zh-cn/appendix/3-browser-and-frontend/typescript', description: '类型安全与接口定义' },
      { title: '浏览器是一个操作系统', path: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os', description: '进程模型与资源管理' },
      { title: '浏览器渲染管道', path: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os-rendering', description: 'DOM、CSSOM、布局与绘制' },
      { title: '前端框架对比', path: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks', description: 'React、Vue、Svelte、Angular' },
      { title: '前端工程化', path: '/zh-cn/appendix/3-browser-and-frontend/frontend-engineering', description: '构建工具与模块化' }
    ]
  },
  {
    id: 'server-backend',
    name: '服务端与后端',
    icon: '⚙️',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #8b5cf615, #8b5cf608)',
    description: '构建可靠的后端服务和 API',
    whyLearn: '后端是应用的神经中枢。学会设计 API、处理数据，能让你独立完成全栈开发。',
    learningGoals: ['HTTP 协议', 'API 设计原则', '认证与授权', '缓存与消息队列'],
    articles: [
      { title: '后端语言对比', path: '/zh-cn/appendix/4-server-and-backend/backend-languages', description: 'Go、Node.js、Python 后端选型' },
      { title: 'HTTP 协议', path: '/zh-cn/appendix/4-server-and-backend/http-protocol', description: '请求响应与状态码' },
      { title: 'API 设计哲学', path: '/zh-cn/appendix/4-server-and-backend/api-design', description: 'RESTful 与 GraphQL 设计' },
      { title: 'Web 框架的本质', path: '/zh-cn/appendix/4-server-and-backend/web-frameworks', description: '路由、中间件、模板引擎' },
      { title: '认证与授权', path: '/zh-cn/appendix/4-server-and-backend/auth-authorization', description: 'JWT、OAuth 与权限控制' },
      { title: '缓存策略', path: '/zh-cn/appendix/4-server-and-backend/caching', description: 'Redis 与 CDN 缓存' },
      { title: '消息队列', path: '/zh-cn/appendix/4-server-and-backend/message-queues', description: 'RabbitMQ、Kafka 应用' }
    ]
  },
  {
    id: 'data',
    name: '数据',
    icon: '📊',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #ec489915, #ec489908)',
    description: '掌握数据库和数据分析技能',
    whyLearn: '数据是现代应用的核心资产。学会存储、查询、分析数据，能帮助你做出数据驱动的决策。',
    learningGoals: ['SQL 查询', '数据库原理', '数据模型设计', '数据分析基础'],
    articles: [
      { title: 'SQL', path: '/zh-cn/appendix/5-data/sql', description: '查询、聚合与事务' },
      { title: '数据库原理', path: '/zh-cn/appendix/5-data/database-fundamentals', description: '索引、事务与隔离级别' },
      { title: '数据模型全景', path: '/zh-cn/appendix/5-data/data-models', description: '关系型 vs NoSQL vs NewSQL' },
      { title: '数据分析基础', path: '/zh-cn/appendix/5-data/data-analysis', description: 'Excel、SQL 与 BI 可视化' }
    ]
  },
  {
    id: 'architecture',
    name: '架构设计',
    icon: '🏗️',
    color: '#14b8a6',
    bgGradient: 'linear-gradient(135deg, #14b8a615, #14b8a608)',
    description: '学习系统设计和架构模式',
    whyLearn: '架构决定系统的未来。学会从宏观角度设计系统，能让你构建可扩展的大型应用。',
    learningGoals: ['微服务架构', '分布式系统', '高可用设计', '系统设计方法论'],
    articles: [
      { title: '从单体到微服务', path: '/zh-cn/appendix/6-architecture-and-system-design/monolith-to-microservices', description: '服务拆分与架构演进' },
      { title: '分布式系统', path: '/zh-cn/appendix/6-architecture-and-system-design/distributed-systems', description: 'CAP 定理与一致性' },
      { title: '高可用与容灾', path: '/zh-cn/appendix/6-architecture-and-system-design/high-availability', description: '负载均衡与故障转移' },
      { title: '系统设计方法论', path: '/zh-cn/appendix/6-architecture-and-system-design/system-design-methodology', description: '从需求到方案的思路' }
    ]
  },
  {
    id: 'infrastructure',
    name: '基础设施',
    icon: '☁️',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #06b6d415, #06b6d408)',
    description: '掌握云原生和运维技能',
    whyLearn: '基础设施是应用的底座。学会容器化、自动化部署，能让你高效地运维应用。',
    learningGoals: ['Linux 基础', 'Docker 容器化', 'Kubernetes', 'CI/CD 自动化'],
    articles: [
      { title: 'Linux 基础', path: '/zh-cn/appendix/7-infrastructure-and-operations/linux-basics', description: '文件系统与进程管理' },
      { title: 'Docker 容器化', path: '/zh-cn/appendix/7-infrastructure-and-operations/docker-containers', description: '镜像、容器与网络' },
      { title: 'Kubernetes', path: '/zh-cn/appendix/7-infrastructure-and-operations/kubernetes', description: 'Pod、Deployment 与 Service' },
      { title: 'CI/CD 自动化', path: '/zh-cn/appendix/7-infrastructure-and-operations/ci-cd', description: 'GitHub Actions 与流水线' }
    ]
  },
  {
    id: 'ai',
    name: '人工智能',
    icon: '🤖',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #f9731615, #f9731608)',
    description: '了解 AI 原理和 LLM 应用开发',
    whyLearn: 'AI 正在改变软件开发的方式。理解大语言模型，能帮助你更好地利用 AI 提升效率。',
    learningGoals: ['神经网络基础', 'Transformer 架构', 'LLM 原理', 'RAG 与 Agent'],
    articles: [
      { title: 'AI 简史', path: '/zh-cn/appendix/8-artificial-intelligence/ai-history', description: '从专家系统到深度学习' },
      { title: '神经网络', path: '/zh-cn/appendix/8-artificial-intelligence/neural-networks', description: '感知机与反向传播' },
      { title: 'Transformer', path: '/zh-cn/appendix/8-artificial-intelligence/transformer-attention', description: '注意力机制与自注意力' },
      { title: '大语言模型原理', path: '/zh-cn/appendix/8-artificial-intelligence/llm-principles', description: '预训练与指令微调' },
      { title: 'RAG 架构', path: '/zh-cn/appendix/8-artificial-intelligence/rag', description: '检索增强生成实战' },
      { title: 'AI Agent', path: '/zh-cn/appendix/8-artificial-intelligence/ai-agents', description: 'Agent 架构与工具调用' }
    ]
  },
  {
    id: 'engineering',
    name: '工程素养',
    icon: '✨',
    color: '#a855f7',
    bgGradient: 'linear-gradient(135deg, #a855f715, #a855f708)',
    description: '提升代码质量和工程实践能力',
    whyLearn: '代码是写给人看的。掌握设计模式、测试策略，能让你写出更优雅、更易维护的代码。',
    learningGoals: ['设计模式', '代码重构', '测试策略', '技术写作'],
    articles: [
      { title: '设计模式', path: '/zh-cn/appendix/9-engineering-excellence/design-patterns', description: 'SOLID 原则与 23 种模式' },
      { title: '代码质量与重构', path: '/zh-cn/appendix/9-engineering-excellence/code-quality-refactoring', description: '坏味道与重构手法' },
      { title: '测试策略', path: '/zh-cn/appendix/9-engineering-excellence/testing-strategies', description: '单元测试、集成测试、E2E' },
      { title: '技术写作', path: '/zh-cn/appendix/9-engineering-excellence/technical-writing', description: '文档与 API 编写规范' },
      { title: '开源协作', path: '/zh-cn/appendix/9-engineering-excellence/open-source-collaboration', description: 'Issue、PR 与社区参与' }
    ]
  }
]

const activeCategory = ref(null)
const hoveredArticle = ref(null)
const showDetail = ref(true)

const toggleCategory = (id) => {
  activeCategory.value = activeCategory.value === id ? null : id
  showDetail.value = true
}

const articleCount = categories.reduce((sum, cat) => sum + cat.articles.length, 0)

const activeCategoryData = computed(() => {
  if (!activeCategory.value) return null
  return categories.find(cat => cat.id === activeCategory.value)
})

const hoveredArticleData = computed(() => {
  if (!hoveredArticle.value || !activeCategoryData.value) return null
  return activeCategoryData.value.articles.find(article => article.path === hoveredArticle.value)
})
</script>

<template>
  <div class="appendix-bento">
    <div class="bento-header">
      <h3 class="bento-title">探索附录</h3>
      <p class="bento-subtitle">9 个主题方向 · {{ articleCount }} 篇文章</p>
    </div>

    <div class="bento-main">
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
          
          <div class="card-indicator" v-if="activeCategory !== category.id">
            <span>{{ category.articles.length }} 篇 →</span>
          </div>
        </div>
      </div>

      <Transition name="slide">
        <div 
          v-if="activeCategoryData" 
          class="detail-panel"
          :style="{ '--panel-color': activeCategoryData.color }"
        >
          <!-- 头部信息 -->
          <div class="panel-header">
            <div class="panel-title-row">
              <span class="panel-icon">{{ hoveredArticleData ? '📄' : activeCategoryData.icon }}</span>
              <div class="panel-title-group">
                <h4 class="panel-title">{{ hoveredArticleData?.title || activeCategoryData.name }}</h4>
                <p class="panel-desc">{{ hoveredArticleData?.description || activeCategoryData.description }}</p>
              </div>
            </div>
            
            <!-- 分类介绍 -->
            <div v-if="!hoveredArticleData" class="panel-intro">
              <p class="intro-text">{{ activeCategoryData.whyLearn }}</p>
            </div>
            
            <!-- 学习目标 -->
            <div v-if="!hoveredArticleData" class="panel-goals">
              <h5 class="goals-title">能学到什么？</h5>
              <div class="goals-list">
                <span v-for="(goal, index) in activeCategoryData.learningGoals" :key="index" class="goal-tag">
                  {{ goal }}
                </span>
              </div>
            </div>
          </div>

          <!-- 文章列表区 -->
          <div class="panel-articles">
            <div class="articles-header">
              <span class="articles-icon">{{ activeCategoryData.icon }}</span>
              <span class="articles-title">文章列表 ({{ activeCategoryData.articles.length }}篇)</span>
            </div>
            <div class="articles-list-scroll">
              <a
                v-for="article in activeCategoryData.articles"
                :key="article.path"
                :href="withBase(article.path)"
                class="article-item"
                :class="{ hover: hoveredArticle === article.path }"
                @mouseenter="hoveredArticle = article.path"
                @mouseleave="hoveredArticle = null"
              >
                <span class="article-bullet"></span>
                <div class="article-info">
                  <span class="article-name">{{ article.title }}</span>
                  <span class="article-desc">{{ article.description }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Transition>
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

.bento-main {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1rem;
  align-items: start;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
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

/* 右侧面板 */
.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--panel-color);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 520px;
}

.panel-header {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.panel-title-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.panel-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.panel-title-group {
  flex: 1;
  min-width: 0;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.panel-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.4;
}

.panel-intro {
  margin-bottom: 0.75rem;
}

.intro-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

/* 学习目标 */
.panel-goals {
  margin-top: 0.75rem;
}

.goals-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--panel-color);
  margin: 0 0 0.5rem;
}

.goals-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.goal-tag {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
}

/* 文章列表区 */
.panel-articles {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.articles-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.articles-icon {
  font-size: 1.1rem;
}

.articles-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--panel-color);
}

.articles-list-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
}

.article-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.15s ease;
  margin-bottom: 0.25rem;
}

.article-item:hover,
.article-item.hover {
  background: var(--vp-c-bg-soft);
}

.article-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--panel-color);
  flex-shrink: 0;
  margin-top: 0.4rem;
}

.article-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.article-name {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.article-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

/* 动画 */
.slide-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 响应式 */
@media (max-width: 1100px) {
  .bento-main {
    grid-template-columns: 1fr;
  }
  
  .detail-panel {
    max-height: 400px;
  }
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
</style>