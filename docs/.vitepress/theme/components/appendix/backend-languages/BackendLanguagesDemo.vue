<template>
  <div class="backend-languages-demo">
    <div class="language-grid">
      <div
        v-for="lang in languages"
        :key="lang.name"
        class="language-card"
        :class="{ active: selectedLang === lang.name }"
        @click="selectedLang = lang.name"
      >
        <div class="lang-header">
          <div class="lang-icon">{{ lang.icon }}</div>
          <h4>{{ lang.name }}</h4>
          <div class="lang-year">{{ lang.year }}</div>
        </div>
        <div class="lang-tags">
          <span
            v-for="tag in lang.tags"
            :key="tag"
            class="tag"
            :class="`tag-${tag.type}`"
          >
            {{ tag.label }}
          </span>
        </div>
        <div class="lang-description">{{ lang.description }}</div>
        <div class="lang-stats">
          <div class="stat">
            <span class="stat-label">性能</span>
            <div class="stat-bar">
              <div
                class="stat-fill performance"
                :style="{ width: lang.stats.performance + '%' }"
              ></div>
            </div>
          </div>
          <div class="stat">
            <span class="stat-label">开发效率</span>
            <div class="stat-bar">
              <div
                class="stat-fill efficiency"
                :style="{ width: lang.stats.efficiency + '%' }"
              ></div>
            </div>
          </div>
          <div class="stat">
            <span class="stat-label">生态</span>
            <div class="stat-bar">
              <div
                class="stat-fill ecosystem"
                :style="{ width: lang.stats.ecosystem + '%' }"
              ></div>
            </div>
          </div>
          <div class="stat">
            <span class="stat-label">学习曲线</span>
            <div class="stat-bar">
              <div
                class="stat-fill learning"
                :style="{ width: lang.stats.learning + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="selectedLang" class="lang-detail">
        <h3>{{ getLangDetail(selectedLang).title }}</h3>
        <div class="detail-grid">
          <div class="detail-section">
            <h4>核心特点</h4>
            <ul>
              <li
                v-for="feature in getLangDetail(selectedLang).features"
                :key="feature"
              >
                {{ feature }}
              </li>
            </ul>
          </div>
          <div class="detail-section">
            <h4>典型应用</h4>
            <ul>
              <li
                v-for="app in getLangDetail(selectedLang).applications"
                :key="app"
              >
                {{ app }}
              </li>
            </ul>
          </div>
          <div class="detail-section">
            <h4>优劣势</h4>
            <div class="pros-cons">
              <div class="pros">
                <strong>优势：</strong>
                <ul>
                  <li
                    v-for="pro in getLangDetail(selectedLang).pros"
                    :key="pro"
                  >
                    {{ pro }}
                  </li>
                </ul>
              </div>
              <div class="cons">
                <strong>劣势：</strong>
                <ul>
                  <li
                    v-for="con in getLangDetail(selectedLang).cons"
                    :key="con"
                  >
                    {{ con }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLang = ref('Java')

const languages = [
  {
    name: 'Java',
    icon: '☕',
    year: '1995',
    tags: [
      { type: 'primary', label: '企业级' },
      { type: 'success', label: '跨平台' },
      { type: 'info', label: '强类型' }
    ],
    description: '企业级开发的霸主，Spring Boot 生态成熟',
    stats: { performance: 75, efficiency: 60, ecosystem: 95, learning: 40 }
  },
  {
    name: 'Python',
    icon: '🐍',
    year: '1991',
    tags: [
      { type: 'primary', label: 'AI/ML' },
      { type: 'success', label: '简洁' },
      { type: 'warning', label: '动态类型' }
    ],
    description: 'AI 与数据分析的首选语言',
    stats: { performance: 30, efficiency: 95, ecosystem: 95, learning: 95 }
  },
  {
    name: 'Go',
    icon: '🐹',
    year: '2009',
    tags: [
      { type: 'primary', label: '云原生' },
      { type: 'success', label: '高性能' },
      { type: 'info', label: '并发' }
    ],
    description: 'Google 出品，云原生时代的宠儿',
    stats: { performance: 90, efficiency: 85, ecosystem: 75, learning: 80 }
  },
  {
    name: 'Node.js',
    icon: '💚',
    year: '2009',
    tags: [
      { type: 'primary', label: '全栈' },
      { type: 'success', label: 'NPM' },
      { type: 'info', label: '异步' }
    ],
    description: 'JavaScript 运行时，前后端统一',
    stats: { performance: 70, efficiency: 85, ecosystem: 95, learning: 75 }
  },
  {
    name: 'C#',
    icon: '💜',
    year: '2000',
    tags: [
      { type: 'primary', label: '.NET' },
      { type: 'success', label: '跨平台' },
      { type: 'info', label: 'Unity' }
    ],
    description: '微软出品，Windows 生态王者',
    stats: { performance: 80, efficiency: 70, ecosystem: 85, learning: 50 }
  },
  {
    name: 'Rust',
    icon: '🦀',
    year: '2010',
    tags: [
      { type: 'primary', label: '系统级' },
      { type: 'success', label: '内存安全' },
      { type: 'danger', label: '难学' }
    ],
    description: 'Mozilla 出品，内存安全的系统语言',
    stats: { performance: 95, efficiency: 40, ecosystem: 70, learning: 20 }
  },
  {
    name: 'C++',
    icon: '⚡',
    year: '1985',
    tags: [
      { type: 'primary', label: '高性能' },
      { type: 'success', label: '游戏' },
      { type: 'danger', label: '复杂' }
    ],
    description: '高性能计算的基石',
    stats: { performance: 98, efficiency: 35, ecosystem: 90, learning: 25 }
  },
  {
    name: 'Ruby',
    icon: '💎',
    year: '1995',
    tags: [
      { type: 'primary', label: 'Rails' },
      { type: 'success', label: '优雅' },
      { type: 'warning', label: '慢' }
    ],
    description: 'Ruby on Rails，快速开发典范',
    stats: { performance: 25, efficiency: 90, ecosystem: 70, learning: 85 }
  }
]

const langDetails = {
  Java: {
    title: 'Java - 企业级开发的霸主',
    features: [
      'JVM (Java Virtual Machine) 实现跨平台',
      '强类型系统，编译时检查',
      'Spring 全家桶生态成熟',
      'JIT 编译器提供接近 C++ 的性能'
    ],
    applications: [
      '大型企业系统（银行、保险、电商）',
      'Android 应用开发',
      '大数据处理（Hadoop、Spark）',
      '微服务架构（Spring Cloud）'
    ],
    pros: [
      '✅ 生态极其成熟，框架完备',
      '✅ 强类型，编译时检查',
      '✅ 多线程模型成熟',
      '✅ 跨平台，JVM 优化强大'
    ],
    cons: [
      '❌ 代码冗长，样板代码多',
      '❌ 启动慢，内存占用高',
      '❌ 学习曲线陡峭（Spring 全家桶）',
      '❌ 版本更新快，兼容性问题'
    ]
  },
  Python: {
    title: 'Python - AI 与脚本之王',
    features: [
      '极简语法，像读英语一样',
      'AI 生态无与伦比（NumPy、PyTorch）',
      '快速开发，代码量少',
      '丰富的科学计算库'
    ],
    applications: [
      'AI/机器学习（所有主流框架）',
      '数据分析（Pandas、Jupyter）',
      '脚本自动化（运维、数据处理）',
      'Web 开发（Django、Flask）'
    ],
    pros: [
      '✅ 语法简单，学习曲线平缓',
      '✅ AI 生态无与伦比',
      '✅ 快速开发，代码量少',
      '✅ 社区活跃，库丰富'
    ],
    cons: [
      '❌ 运行速度慢（比 Java/Go 慢 10-100 倍）',
      '❌ 动态类型，运行时错误多',
      '❌ GIL 限制，多线程性能差',
      '❌ 打包部署复杂（依赖地狱）'
    ]
  },
  Go: {
    title: 'Go - 云原生时代的宠儿',
    features: [
      'Goroutine (协程) 轻量级并发',
      '简洁语法，25 个关键字',
      '快速编译，比 Java 快 10 倍',
      '单一可执行文件，无依赖'
    ],
    applications: [
      '云原生基础设施（Docker、K8s）',
      '微服务架构',
      'DevOps 工具（Terraform、Prometheus）',
      '区块链（Hyperledger Fabric）'
    ],
    pros: [
      '✅ 原生并发，性能接近 C++',
      '✅ 简洁语法，学习曲线平缓',
      '✅ 编译快，部署简单',
      '✅ 单一可执行文件，无依赖'
    ],
    cons: [
      '❌ 生态不如 Java/Python 成熟',
      '❌ 错误处理繁琐（if err != nil）',
      '❌ 泛型支持较弱（Go 1.18+ 才引入）',
      '❌ 不如 Java/Python 灵活'
    ]
  },
  'Node.js': {
    title: 'Node.js - 全栈工程师的利器',
    features: [
      '事件驱动，非阻塞 I/O',
      '前后端统一语言',
      'NPM 世界最大的包仓库',
      '适合实时应用'
    ],
    applications: [
      '全栈 Web 应用（React + Node.js）',
      '实时系统（聊天应用、协作工具）',
      'Serverless（AWS Lambda、Vercel）',
      'CLI 工具（VS Code、Webpack）'
    ],
    pros: [
      '✅ 前后端统一，减少语言切换成本',
      '✅ NPM 生态庞大，库丰富',
      '✅ 适合 I/O 密集型应用',
      '✅ 社区活跃，更新快'
    ],
    cons: [
      '❌ 单线程，CPU 密集型任务性能差',
      '❌ 回调地狱（async/await 有改善）',
      '❌ 动态类型，运行时错误多',
      '❌ 版本兼容性问题多'
    ]
  },
  'C#': {
    title: 'C# - Windows 生态的王者',
    features: [
      '微软 Visual Studio 极其强大',
      '.NET Core 实现跨平台',
      '高性能，CoreFX 优化',
      'Unity 游戏开发官方语言'
    ],
    applications: [
      'Windows 应用开发',
      '游戏开发（Unity 引擎）',
      'Web 开发（ASP.NET Core）',
      'Azure 云服务'
    ],
    pros: [
      '✅ Visual Studio 极其强大',
      '✅ ASP.NET Core 性能优秀',
      '✅ 跨平台（.NET Core）',
      '✅ 游戏开发（Unity）'
    ],
    cons: [
      '❌ Windows 历史包袱重',
      '❌ 社区不如 Java/Python 活跃',
      '❌ 学习曲线陡峭',
      '❌ 开源生态相对较弱'
    ]
  },
  Rust: {
    title: 'Rust - 系统级编程的未来',
    features: [
      '所有权系统保证内存安全',
      '零成本抽象',
      '编译时保证无内存泄漏',
      'WebAssembly 支持'
    ],
    applications: [
      '系统编程（操作系统、数据库）',
      '区块链（Solana、Polkadot）',
      'WebAssembly（前端高性能计算）',
      '基础设施（AWS Firecracker）'
    ],
    pros: [
      '✅ 内存安全，无 GC',
      '✅ 性能接近 C++',
      '✅ 现代化语法',
      '✅ WebAssembly 支持'
    ],
    cons: [
      '❌ 学习曲线极其陡峭',
      '❌ 编译时间长',
      '❌ 生态不如 Go/Rust 成熟',
      '❌ 开发速度慢'
    ]
  },
  'C++': {
    title: 'C++ - 高性能计算的基石',
    features: [
      '极致性能，无语言能超越',
      '底层控制，直接操作内存',
      '游戏引擎标准',
      '现代 C++ (11/14/17/20)'
    ],
    applications: [
      '游戏开发（Unreal Engine）',
      '高频交易（金融系统）',
      '浏览器引擎（Chrome V8）',
      'AI 框架底层（PyTorch、TF）'
    ],
    pros: ['✅ 性能极致', '✅ 底层控制力强', '✅ 游戏开发标准', '✅ 生态成熟'],
    cons: [
      '❌ 学习曲线极其陡峭',
      '❌ 内存管理复杂（易泄漏）',
      '❌ 开发效率低',
      '❌ 不适合 Web 开发'
    ]
  },
  Ruby: {
    title: 'Ruby - 快速开发的典范',
    features: ['Ruby on Rails 框架', '约定优于配置', '代码优雅', '快速开发'],
    applications: [
      '初创公司（GitHub、Airbnb）',
      '快速原型（MVP、黑客松）',
      'Web 开发（Rails、Sinatra）',
      'CI/CD 脚本'
    ],
    pros: [
      '✅ Rails 框架极其成熟',
      '✅ 快速开发，代码优雅',
      '✅ 约定优于配置',
      '✅ 社区活跃'
    ],
    cons: [
      '❌ 性能较差',
      '❌ 动态类型，运行时错误多',
      '❌ 多线程性能差',
      '❌ 生态不如 Java/Python 广泛'
    ]
  }
}

const getLangDetail = (name) => {
  return langDetails[name] || {}
}
</script>

<style scoped>
.backend-languages-demo {
  border-radius: 16px;
  background: var(--vp-c-bg);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  margin: 2rem 0;
  padding: 2rem;
}

.language-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.language-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.language-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.lang-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.lang-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.lang-header h4 {
  flex: 1;
  margin: 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.lang-year {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.lang-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tag-primary {
  background: #e0f2fe;
  color: #0369a1;
}

.tag-success {
  background: #dcfce7;
  color: #15803d;
}

.tag-info {
  background: #e0e7ff;
  color: #4338ca;
}

.tag-warning {
  background: #fef3c7;
  color: #b45309;
}

.tag-danger {
  background: #fee2e2;
  color: #b91c1c;
}

.lang-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.lang-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 60px;
  font-weight: 600;
}

.stat-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.stat-fill.performance {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
}

.stat-fill.efficiency {
  background: linear-gradient(90deg, #34d399, #10b981);
}

.stat-fill.ecosystem {
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
}

.stat-fill.learning {
  background: linear-gradient(90deg, #f472b6, #ec4899);
}

.lang-detail {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  animation: fade-in 0.3s ease;
}

.lang-detail h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.detail-section h4 {
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.detail-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-section li {
  padding: 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
  position: relative;
  padding-left: 1.5rem;
}

.detail-section li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.pros-cons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pros,
.cons {
  font-size: 0.9rem;
}

.pros strong {
  color: #10b981;
}

.cons strong {
  color: #ef4444;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
