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
      { title: 'Vibe Coding 全栈开发', path: '/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack', description: 'AI 辅助时代下的全栈开发全景图', detail: '从前端到后端、从数据库到部署，梳理 AI 辅助时代下全栈工程师需要掌握的完整技能树，帮你建立全局视野。' },
      { title: '从晶体管到 CPU', path: '/zh-cn/appendix/1-computer-fundamentals/transistor-to-cpu', description: '理解计算机最底层的硬件逻辑', detail: '从最基本的晶体管开关出发，逐步构建逻辑门、加法器、寄存器，最终理解 CPU 如何一步步执行你写的每一行代码。' },
      { title: '操作系统', path: '/zh-cn/appendix/1-computer-fundamentals/operating-systems', description: '进程管理、内存管理、文件系统', detail: '操作系统是硬件与软件之间的桥梁。了解进程调度、虚拟内存、文件系统的工作原理，理解程序运行的底层环境。' },
      { title: '数据结构', path: '/zh-cn/appendix/1-computer-fundamentals/data-structures', description: '数组、链表、树、图的组织方式', detail: '数据结构决定了程序如何高效地存储和访问数据。掌握数组、链表、栈、队列、树、图等核心结构及其适用场景。' },
      { title: '算法思维入门', path: '/zh-cn/appendix/1-computer-fundamentals/algorithm-thinking', description: '排序、搜索、递归的思维框架', detail: '算法是解决问题的思维方式。通过排序、搜索、递归、动态规划等经典问题，培养分析和拆解复杂问题的能力。' },
      { title: '编程语言图谱', path: '/zh-cn/appendix/1-computer-fundamentals/programming-languages', description: '从汇编到高级语言的演进', detail: '从机器码到汇编、从 C 到 Python，了解编程语言的演进历程、分类方式和各自的设计哲学与适用领域。' },
      { title: '网络基础', path: '/zh-cn/appendix/1-computer-fundamentals/computer-networks', description: '从网线到互联网的通信原理', detail: '从物理层到应用层，理解 TCP/IP 协议栈、DNS 解析、HTTP 通信等网络基础，搞懂两台电脑如何跨越万里对话。' }
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
      { title: 'IDE 基础', path: '/zh-cn/appendix/2-development-tools/ide-basics', description: 'VS Code、Cursor、Trae 的使用技巧', detail: '对比主流 IDE 的核心功能，掌握快捷键、插件生态、代码片段等提效技巧，让编辑器成为你最顺手的武器。' },
      { title: '命令行与 Shell', path: '/zh-cn/appendix/2-development-tools/command-line-shell', description: '终端操作与脚本自动化', detail: '从基础命令到 Shell 脚本编写，学会用命令行高效操作文件、管理进程、自动化重复任务，告别鼠标依赖。' },
      { title: 'Git 版本控制', path: '/zh-cn/appendix/2-development-tools/git-version-control', description: '版本控制与团队协作', detail: '从 init 到 rebase，系统掌握 Git 的分支模型、合并策略、冲突解决，理解团队协作中的 Git 工作流。' },
      { title: '环境变量与 PATH', path: '/zh-cn/appendix/2-development-tools/environment-path', description: '系统环境配置与问题排查', detail: '理解 PATH 的查找机制、环境变量的作用域，学会排查「命令找不到」「版本不对」等常见开发环境问题。' },
      { title: '包管理器', path: '/zh-cn/appendix/2-development-tools/package-managers', description: 'npm、pip、cargo 依赖管理', detail: '了解包管理器如何解决依赖地狱问题，掌握 npm、pip、cargo 等工具的使用方式和 lock 文件的意义。' },
      { title: '调试的艺术', path: '/zh-cn/appendix/2-development-tools/debugging-art/', description: '断点调试与问题定位', detail: '从 console.log 到断点调试，掌握系统化的问题定位方法论，学会用 DevTools、日志分析快速找到 Bug 根因。' }
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
      { title: 'JavaScript 深入', path: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive', description: '闭包、原型链、异步核心概念', detail: '深入理解 JavaScript 的闭包机制、原型继承链、事件循环与 Promise 异步模型，夯实前端开发的语言基础。' },
      { title: 'TypeScript', path: '/zh-cn/appendix/3-browser-and-frontend/typescript', description: '类型安全与接口定义', detail: '学习如何用类型系统在编译期捕获错误，掌握接口、泛型、类型推断等核心特性，写出更健壮的前端代码。' },
      { title: '浏览器是一个操作系统', path: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os', description: '进程模型与资源管理', detail: '现代浏览器拥有多进程架构、沙箱隔离、任务调度等操作系统级能力。理解这些机制，才能写出高性能的 Web 应用。' },
      { title: '浏览器渲染管道', path: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os-rendering', description: 'DOM、CSSOM、布局与绘制', detail: '从 HTML 解析到像素上屏，完整拆解浏览器渲染管道的每个阶段，理解重排与重绘的性能影响。' },
      { title: '前端框架对比', path: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks', description: 'React、Vue、Svelte、Angular', detail: '横向对比主流前端框架的设计理念、响应式机制、生态系统和适用场景，帮你做出合理的技术选型。' },
      { title: '前端工程化', path: '/zh-cn/appendix/3-browser-and-frontend/frontend-engineering', description: '构建工具与模块化', detail: '从 Webpack 到 Vite，理解模块打包、代码分割、Tree Shaking 等工程化实践，搭建高效的前端开发流水线。' }
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
      { title: '后端语言对比', path: '/zh-cn/appendix/4-server-and-backend/backend-languages', description: 'Go、Node.js、Python 后端选型', detail: '从性能、生态、开发效率等维度对比主流后端语言，帮你根据项目需求选择最合适的技术栈。' },
      { title: 'HTTP 协议', path: '/zh-cn/appendix/4-server-and-backend/http-protocol', description: '请求响应与状态码', detail: '深入理解 HTTP 请求方法、状态码、头部字段、Cookie 与缓存机制，这是所有 Web 开发的通信基础。' },
      { title: 'API 设计哲学', path: '/zh-cn/appendix/4-server-and-backend/api-design', description: 'RESTful 与 GraphQL 设计', detail: '对比 REST、GraphQL、gRPC 三种 API 风格的设计理念与适用场景，学会设计清晰、一致、易用的接口。' },
      { title: 'Web 框架的本质', path: '/zh-cn/appendix/4-server-and-backend/web-frameworks', description: '路由、中间件、模板引擎', detail: '剥开框架的外衣，理解路由匹配、中间件管道、请求上下文等核心机制，知其然更知其所以然。' },
      { title: '认证与授权', path: '/zh-cn/appendix/4-server-and-backend/auth-authorization', description: 'JWT、OAuth 与权限控制', detail: '从 Session 到 JWT，从密码登录到 OAuth 第三方授权，系统掌握用户身份验证与权限控制的完整方案。' },
      { title: '缓存策略', path: '/zh-cn/appendix/4-server-and-backend/caching', description: 'Redis 与 CDN 缓存', detail: '理解浏览器缓存、CDN 缓存、Redis 应用缓存的分层架构，学会用缓存策略大幅提升系统响应速度。' },
      { title: '消息队列', path: '/zh-cn/appendix/4-server-and-backend/message-queues', description: 'RabbitMQ、Kafka 应用', detail: '了解消息队列如何实现服务解耦、流量削峰和异步处理，对比 RabbitMQ 与 Kafka 的架构差异与适用场景。' }
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
      { title: 'SQL', path: '/zh-cn/appendix/5-data/sql', description: '查询、聚合与事务', detail: '从 SELECT 到子查询，从 JOIN 到事务控制，系统学习 SQL 语言，掌握与数据库对话的核心能力。' },
      { title: '数据库原理', path: '/zh-cn/appendix/5-data/database-fundamentals', description: '索引、事务与隔离级别', detail: '深入 B+ 树索引结构、ACID 事务特性、MVCC 并发控制，理解数据库引擎如何保证数据的正确与高效。' },
      { title: '数据模型全景', path: '/zh-cn/appendix/5-data/data-models', description: '关系型 vs NoSQL vs NewSQL', detail: '对比关系型、文档型、图数据库、时序数据库等不同数据模型的设计理念，学会根据业务场景选择合适的存储方案。' },
      { title: '数据分析基础', path: '/zh-cn/appendix/5-data/data-analysis', description: 'Excel、SQL 与 BI 可视化', detail: '从数据采集到指标体系搭建，掌握漏斗分析、留存分析等常用方法，学会用数据驱动产品和业务决策。' }
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
      { title: '从单体到微服务', path: '/zh-cn/appendix/6-architecture-and-system-design/monolith-to-microservices', description: '服务拆分与架构演进', detail: '理解单体架构的瓶颈，学习何时拆分、如何拆分微服务，以及拆分后面临的服务发现、数据一致性等新挑战。' },
      { title: '分布式系统', path: '/zh-cn/appendix/6-architecture-and-system-design/distributed-systems', description: 'CAP 定理与一致性', detail: '深入 CAP 定理、分布式事务、一致性协议（Paxos/Raft），理解分布式环境下数据一致性与可用性的权衡。' },
      { title: '高可用与容灾', path: '/zh-cn/appendix/6-architecture-and-system-design/high-availability', description: '负载均衡与故障转移', detail: '学习负载均衡策略、主从切换、异地多活、熔断降级等高可用设计模式，让系统在故障面前依然稳定运行。' },
      { title: '系统设计方法论', path: '/zh-cn/appendix/6-architecture-and-system-design/system-design-methodology', description: '从需求到方案的思路', detail: '掌握系统设计面试与实战中的思维框架：需求分析、容量估算、核心模块设计、瓶颈识别与架构权衡。' }
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
      { title: 'Linux 基础', path: '/zh-cn/appendix/7-infrastructure-and-operations/linux-basics', description: '文件系统与进程管理', detail: '掌握 Linux 文件权限、进程管理、系统监控等核心操作，这是服务器运维和容器化部署的必备基础。' },
      { title: 'Docker 容器化', path: '/zh-cn/appendix/7-infrastructure-and-operations/docker-containers', description: '镜像、容器与网络', detail: '从 Dockerfile 编写到镜像构建，从容器网络到数据卷挂载，学会用 Docker 将应用打包成可移植的标准化单元。' },
      { title: 'Kubernetes', path: '/zh-cn/appendix/7-infrastructure-and-operations/kubernetes', description: 'Pod、Deployment 与 Service', detail: '理解 K8s 的核心概念：Pod 调度、Deployment 滚动更新、Service 服务发现，掌握容器编排的行业标准工具。' },
      { title: 'CI/CD 自动化', path: '/zh-cn/appendix/7-infrastructure-and-operations/ci-cd', description: 'GitHub Actions 与流水线', detail: '学习持续集成与持续部署的理念，用 GitHub Actions 搭建自动化流水线，实现代码提交后自动测试、构建和部署。' }
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
      { title: 'AI 简史', path: '/zh-cn/appendix/8-artificial-intelligence/ai-history', description: '从专家系统到深度学习', detail: '回顾 AI 从图灵测试到 GPT 的关键里程碑，理解每次技术突破背后的核心思想转变与驱动力。' },
      { title: '神经网络', path: '/zh-cn/appendix/8-artificial-intelligence/neural-networks', description: '感知机与反向传播', detail: '从单个神经元到多层网络，理解前向传播、损失函数、反向传播与梯度下降，这是所有深度学习的基石。' },
      { title: 'Transformer', path: '/zh-cn/appendix/8-artificial-intelligence/transformer-attention', description: '注意力机制与自注意力', detail: '深入 Transformer 架构的核心——自注意力机制，理解它如何让模型捕捉长距离依赖，成为现代大模型的基础。' },
      { title: '大语言模型原理', path: '/zh-cn/appendix/8-artificial-intelligence/llm-principles', description: '预训练与指令微调', detail: '从海量文本预训练到 RLHF 对齐，拆解 GPT、Claude 等大语言模型的训练流程与核心工作原理。' },
      { title: 'RAG 架构', path: '/zh-cn/appendix/8-artificial-intelligence/rag', description: '检索增强生成实战', detail: '学习如何用向量检索为 LLM 注入外部知识，掌握 RAG 的完整流程：文档切分、Embedding、检索与生成。' },
      { title: 'AI Agent', path: '/zh-cn/appendix/8-artificial-intelligence/ai-agents', description: 'Agent 架构与工具调用', detail: '了解 AI Agent 如何通过规划、记忆、工具调用实现自主决策，掌握 ReAct、Function Calling 等核心模式。' }
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
      { title: '设计模式', path: '/zh-cn/appendix/9-engineering-excellence/design-patterns', description: 'SOLID 原则与 23 种模式', detail: '从 SOLID 五大原则到工厂、观察者、策略等经典模式，学会用设计模式解决代码中反复出现的结构性问题。' },
      { title: '代码质量与重构', path: '/zh-cn/appendix/9-engineering-excellence/code-quality-refactoring', description: '坏味道与重构手法', detail: '识别重复代码、过长函数、过度耦合等常见坏味道，掌握提取方法、内联变量、搬移字段等系统化重构手法。' },
      { title: '测试策略', path: '/zh-cn/appendix/9-engineering-excellence/testing-strategies', description: '单元测试、集成测试、E2E', detail: '理解测试金字塔的分层策略，学会编写单元测试、集成测试和端到端测试，用自动化测试守护代码质量。' },
      { title: '技术写作', path: '/zh-cn/appendix/9-engineering-excellence/technical-writing', description: '文档与 API 编写规范', detail: '学习如何写出清晰的 README、API 文档和技术方案，好的技术写作能力是高级工程师的核心软技能。' },
      { title: '开源协作', path: '/zh-cn/appendix/9-engineering-excellence/open-source-collaboration', description: 'Issue、PR 与社区参与', detail: '掌握 GitHub 开源协作流程：提 Issue、Fork 仓库、提交 PR、Code Review，学会参与和维护开源项目。' }
    ]
  }
]

const activeCategory = ref(categories[0].id)
const hoveredArticle = ref(null)

const toggleCategory = (id) => {
  activeCategory.value = id
  hoveredArticle.value = null
}

const articleCount = categories.reduce((sum, cat) => sum + cat.articles.length, 0)

const activeCategoryData = computed(() => {
  if (!activeCategory.value) return null
  return categories.find(cat => cat.id === activeCategory.value)
})

const hoveredArticleData = computed(() => {
  if (!hoveredArticle.value || !activeCategoryData.value) return null
  return activeCategoryData.value.articles.find(a => a.path === hoveredArticle.value)
})
</script>

<template>
  <div class="appendix-bento">
    <div class="bento-header">
      <h3 class="bento-title">探索附录</h3>
      <p class="bento-subtitle">9 个主题方向 · {{ articleCount }} 篇文章</p>
    </div>

    <div class="bento-main">
      <!-- 左侧：卡片网格 -->
      <div class="bento-left">
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
            </div>
            <div class="card-indicator">
              <span>{{ category.articles.length }} 篇 {{ activeCategory === category.id ? '↓' : '→' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：详情面板 -->
      <div
        class="detail-panel"
        :style="{ '--panel-color': activeCategoryData.color }"
        :key="activeCategoryData.id"
      >
        <div class="panel-header">
          <div class="panel-title-row">
            <span class="panel-icon">{{ hoveredArticleData ? '📄' : activeCategoryData.icon }}</span>
            <div class="panel-title-group">
              <h4 class="panel-title">{{ hoveredArticleData?.title || activeCategoryData.name }}</h4>
              <p class="panel-desc">{{ hoveredArticleData?.description || activeCategoryData.description }}</p>
            </div>
          </div>
          <div class="panel-body">
            <p class="intro-text">{{ hoveredArticleData?.detail || activeCategoryData.whyLearn }}</p>
          </div>
          <div v-if="!hoveredArticleData" class="panel-goals">
            <h5 class="goals-title">能学到什么？</h5>
            <div class="goals-list">
              <span v-for="(goal, index) in activeCategoryData.learningGoals" :key="index" class="goal-tag">
                {{ goal }}
              </span>
            </div>
          </div>
        </div>

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
  grid-template-columns: 1fr 280px;
  height: 520px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.bento-left {
  overflow-y: auto;
  padding: 0.75rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

.card-indicator {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  position: relative;
}

.bento-card:hover .card-indicator {
  color: var(--card-color);
}

/* 右侧面板 */
.detail-panel {
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  height: 200px;
  overflow-y: auto;
  flex-shrink: 0;
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

.panel-body {
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

/* 响应式 */
@media (max-width: 768px) {
  .bento-main {
    grid-template-columns: 1fr;
    height: auto;
    max-height: 80vh;
  }

  .bento-left {
    max-height: 300px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .detail-panel {
    border-left: none;
    max-height: 400px;
  }
}

@media (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}
</style>