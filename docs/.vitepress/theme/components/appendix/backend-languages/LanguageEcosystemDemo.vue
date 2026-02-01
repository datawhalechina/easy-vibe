<template>
  <div class="language-ecosystem-demo">
    <div class="demo-header">
      <h4>生态系统对比</h4>
      <p class="subtitle">不同语言的包管理器、框架和社区活跃度</p>
    </div>

    <div class="ecosystem-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: selectedTab === tab.id }"
        @click="selectedTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="selectedTab" class="tab-content">
        <!-- Package Managers -->
        <div v-if="selectedTab === 'packages'" class="packages-section">
          <div class="packages-grid">
            <div
              v-for="pkg in packageManagers"
              :key="pkg.name"
              class="package-card"
            >
              <div class="pkg-header">
                <span class="pkg-icon">{{ pkg.icon }}</span>
                <div class="pkg-info">
                  <h5>{{ pkg.name }}</h5>
                  <span class="pkg-lang">{{ pkg.language }}</span>
                </div>
              </div>
              <div class="pkg-stats">
                <div class="stat">
                  <span class="stat-label">包数量</span>
                  <span class="stat-value">{{ formatNumber(pkg.count) }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">周下载量</span>
                  <span class="stat-value">{{
                    formatDownloads(pkg.downloads)
                  }}</span>
                </div>
              </div>
              <div class="pkg-command">
                <code>{{ pkg.command }}</code>
              </div>
              <div class="pkg-features">
                <div
                  v-for="feature in pkg.features"
                  :key="feature"
                  class="feature-tag"
                >
                  {{ feature }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Web Frameworks -->
        <div
          v-else-if="selectedTab === 'frameworks'"
          class="frameworks-section"
        >
          <div class="frameworks-table-wrapper">
            <table class="frameworks-table">
              <thead>
                <tr>
                  <th>框架</th>
                  <th>语言</th>
                  <th>性能</th>
                  <th>学习曲线</th>
                  <th>特点</th>
                  <th>适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fw in frameworks" :key="fw.name">
                  <td class="fw-name">
                    <span class="fw-icon">{{ fw.icon }}</span>
                    {{ fw.name }}
                  </td>
                  <td>{{ fw.language }}</td>
                  <td>
                    <div class="rating-bar">
                      <div
                        class="rating-fill"
                        :style="{ width: fw.performance + '%' }"
                      ></div>
                    </div>
                  </td>
                  <td>
                    <div class="rating-bar learning">
                      <div
                        class="rating-fill"
                        :style="{ width: fw.learning + '%' }"
                      ></div>
                    </div>
                  </td>
                  <td>
                    <div class="tags">
                      <span
                        v-for="tag in fw.tags"
                        :key="tag"
                        class="tag"
                        :class="`tag-${tag.type}`"
                      >
                        {{ tag.label }}
                      </span>
                    </div>
                  </td>
                  <td>{{ fw.useCase }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Community -->
        <div v-else-if="selectedTab === 'community'" class="community-section">
          <div class="community-metrics">
            <div class="metric-card">
              <div class="metric-header">
                <span class="metric-icon">📦</span>
                <h5>GitHub Stars</h5>
              </div>
              <div class="metric-chart">
                <div
                  v-for="lang in communityStats"
                  :key="lang.name"
                  class="chart-bar"
                >
                  <div class="bar-label">{{ lang.name }}</div>
                  <div class="bar-container">
                    <div
                      class="bar-fill"
                      :style="{ width: lang.stars / 100 + '%' }"
                    >
                      <span class="bar-value">{{ lang.stars }}M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-header">
                <span class="metric-icon">💬</span>
                <h5>Stack Overflow 问题</h5>
              </div>
              <div class="metric-chart">
                <div
                  v-for="lang in communityStats"
                  :key="lang.name"
                  class="chart-bar"
                >
                  <div class="bar-label">{{ lang.name }}</div>
                  <div class="bar-container">
                    <div
                      class="bar-fill questions"
                      :style="{ width: lang.questions / 30 + '%' }"
                    >
                      <span class="bar-value">{{ lang.questions }}M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="community-insights">
            <h5>社区活跃度分析</h5>
            <div class="insight-grid">
              <div class="insight-card">
                <h6>最活跃</h6>
                <p>
                  JavaScript/Node.js 社区最活跃，NPM
                  每周新增数万个包，问题响应速度最快。
                </p>
              </div>
              <div class="insight-card">
                <h6>最专业</h6>
                <p>
                  Java 社区最专业，企业级问题讨论深入，Stack Overflow 质量最高。
                </p>
              </div>
              <div class="insight-card">
                <h6>增长最快</h6>
                <p>
                  Rust 和 Go 社区增长最快，新一代开发者涌入，问题讨论质量高。
                </p>
              </div>
              <div class="insight-card">
                <h6>最友好</h6>
                <p>Python 和 Ruby 社区对新手最友好，问题回复耐心，文档详尽。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Learning Resources -->
        <div v-else-if="selectedTab === 'learning'" class="learning-section">
          <div class="resources-grid">
            <div
              v-for="resource in learningResources"
              :key="resource.language"
              class="resource-card"
            >
              <div class="resource-header">
                <span class="resource-icon">{{ resource.icon }}</span>
                <h5>{{ resource.language }}</h5>
              </div>
              <div class="resource-content">
                <div class="resource-section">
                  <h6>官方文档</h6>
                  <div class="doc-rating">
                    <span
                      v-for="i in 5"
                      :key="i"
                      class="star"
                      :class="{ filled: i <= resource.docQuality }"
                    >
                      ★
                    </span>
                  </div>
                  <p class="doc-comment">{{ resource.docComment }}</p>
                </div>
                <div class="resource-section">
                  <h6>推荐书籍</h6>
                  <ul>
                    <li v-for="book in resource.books" :key="book">
                      {{ book }}
                    </li>
                  </ul>
                </div>
                <div class="resource-section">
                  <h6>在线课程</h6>
                  <div class="courses">
                    <span
                      v-for="course in resource.courses"
                      :key="course"
                      class="course-tag"
                    >
                      {{ course }}
                    </span>
                  </div>
                </div>
                <div class="resource-section">
                  <h6>学习曲线</h6>
                  <div class="learning-curve">
                    <div
                      class="curve-bar"
                      :style="{ width: resource.learningCurve + '%' }"
                    ></div>
                  </div>
                  <p class="curve-label">{{ resource.curveLabel }}</p>
                </div>
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

const selectedTab = ref('packages')

const tabs = [
  { id: 'packages', label: '包管理器' },
  { id: 'frameworks', label: 'Web 框架' },
  { id: 'community', label: '社区活跃度' },
  { id: 'learning', label: '学习资源' }
]

const packageManagers = [
  {
    name: 'NPM',
    icon: '💚',
    language: 'Node.js',
    count: 2000000,
    downloads: '50B/week',
    command: 'npm install express',
    features: ['最大生态', '版本管理灵活', '依赖地狱风险']
  },
  {
    name: 'PyPI',
    icon: '🐍',
    language: 'Python',
    count: 500000,
    downloads: '10B/week',
    command: 'pip install django',
    features: ['虚拟环境', '依赖管理清晰', '打包部署复杂']
  },
  {
    name: 'Maven',
    icon: '☕',
    language: 'Java',
    count: 300000,
    downloads: '5B/week',
    command: 'mvn install',
    features: ['企业级', '依赖管理严格', 'XML 配置冗长']
  },
  {
    name: 'Go Modules',
    icon: '🐹',
    language: 'Go',
    count: 100000,
    downloads: '500M/week',
    command: 'go get github.com/gin-gonic/gin',
    features: ['简洁', '无依赖地狱', '版本支持完善']
  },
  {
    name: 'Cargo',
    icon: '🦀',
    language: 'Rust',
    count: 100000,
    downloads: '200M/week',
    command: 'cargo add serde',
    features: ['现代化', '构建工具集成', '编译时间长']
  },
  {
    name: 'RubyGems',
    icon: '💎',
    language: 'Ruby',
    count: 150000,
    downloads: '300M/week',
    command: 'gem install rails',
    features: ['Bundler 管理', 'Gemfile 简洁', '版本冲突问题']
  }
]

const frameworks = [
  {
    name: 'Express',
    icon: '💚',
    language: 'Node.js',
    performance: 70,
    learning: 90,
    tags: [
      { type: 'success', label: '简洁' },
      { type: 'info', label: '灵活' }
    ],
    useCase: '快速原型、API 服务'
  },
  {
    name: 'Django',
    icon: '🐍',
    language: 'Python',
    performance: 40,
    learning: 85,
    tags: [
      { type: 'success', label: '大而全' },
      { type: 'info', label: 'ORM' }
    ],
    useCase: '数据驱动应用、快速开发'
  },
  {
    name: 'Spring Boot',
    icon: '☕',
    language: 'Java',
    performance: 75,
    learning: 50,
    tags: [
      { type: 'success', label: '企业级' },
      { type: 'warning', label: '复杂' }
    ],
    useCase: '企业级应用、微服务'
  },
  {
    name: 'Gin',
    icon: '🐹',
    language: 'Go',
    performance: 95,
    learning: 80,
    tags: [
      { type: 'success', label: '高性能' },
      { type: 'info', label: '轻量' }
    ],
    useCase: '高性能 API、微服务'
  },
  {
    name: 'Rails',
    icon: '💎',
    language: 'Ruby',
    performance: 35,
    learning: 85,
    tags: [
      { type: 'success', label: '约定优于配置' },
      { type: 'info', label: 'MVC' }
    ],
    useCase: '初创公司、快速迭代'
  },
  {
    name: 'Flask',
    icon: '🐍',
    language: 'Python',
    performance: 45,
    learning: 95,
    tags: [
      { type: 'success', label: '轻量' },
      { type: 'info', label: '灵活' }
    ],
    useCase: '小型项目、学习'
  },
  {
    name: 'FastAPI',
    icon: '🐍',
    language: 'Python',
    performance: 65,
    learning: 85,
    tags: [
      { type: 'success', label: '异步' },
      { type: 'info', label: '类型安全' }
    ],
    useCase: '现代 API、异步任务'
  },
  {
    name: 'Actix',
    icon: '🦀',
    language: 'Rust',
    performance: 98,
    learning: 30,
    tags: [
      { type: 'success', label: '极致性能' },
      { type: 'danger', label: '难学' }
    ],
    useCase: '高性能服务、系统编程'
  }
]

const communityStats = [
  { name: 'JavaScript', stars: 85, questions: 28 },
  { name: 'Python', stars: 75, questions: 25 },
  { name: 'Java', stars: 65, questions: 22 },
  { name: 'Go', stars: 55, questions: 8 },
  { name: 'Rust', stars: 60, questions: 5 },
  { name: 'Ruby', stars: 40, questions: 6 },
  { name: 'C#', stars: 50, questions: 12 },
  { name: 'C++', stars: 70, questions: 18 }
]

const learningResources = [
  {
    language: 'Python',
    icon: '🐍',
    docQuality: 5,
    docComment: '官方文档极其详尽，教程丰富',
    books: ['Fluent Python', 'Python Cookbook'],
    courses: ['Coursera', 'edX', 'Udemy'],
    learningCurve: 95,
    curveLabel: '最简单'
  },
  {
    language: 'Go',
    icon: '🐹',
    docQuality: 5,
    docComment: '官方教程优秀，A Tour of Go 经典',
    books: ['The Go Programming Language', 'Go in Action'],
    courses: ['Udemy', 'Coursera', '官方文档'],
    learningCurve: 80,
    curveLabel: '简单'
  },
  {
    language: 'JavaScript',
    icon: '💚',
    docQuality: 4,
    docComment: 'MDN 文档权威，但碎片化',
    books: ['Eloquent JavaScript', "You Don't Know JS"],
    courses: ['freeCodeCamp', 'Udemy', 'Codecademy'],
    learningCurve: 75,
    curveLabel: '中等'
  },
  {
    language: 'Java',
    icon: '☕',
    docQuality: 4,
    docComment: 'Oracle 官方文档完善，但冗长',
    books: ['Effective Java', 'Java Concurrency'],
    courses: ['Coursera', 'Udemy', 'Oracle 官方'],
    learningCurve: 40,
    curveLabel: '较难'
  },
  {
    language: 'Rust',
    icon: '🦀',
    docQuality: 5,
    docComment: 'The Rust Book 极其详细',
    books: ['The Rust Programming Language', 'Rust in Action'],
    courses: ['Udemy', 'Exercism', '官方文档'],
    learningCurve: 20,
    curveLabel: '极难'
  },
  {
    language: 'C#',
    icon: '💜',
    docQuality: 5,
    docComment: 'Microsoft 文档极其详细',
    books: ['C# in Depth', 'Pro C#'],
    courses: ['Microsoft Learn', 'Udemy', 'Pluralsight'],
    learningCurve: 50,
    curveLabel: '中等'
  }
]

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+'
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K+'
  return num.toString()
}

const formatDownloads = (downloads) => {
  return downloads
}
</script>

<style scoped>
.language-ecosystem-demo {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.ecosystem-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.tab-content {
  animation: fade-in 0.3s ease;
}

.packages-grid,
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.package-card,
.resource-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.package-card:hover,
.resource-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.pkg-header,
.resource-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.pkg-icon,
.resource-icon {
  font-size: 2.5rem;
}

.pkg-info h5,
.resource-header h5 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.pkg-lang {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.pkg-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.pkg-command {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.pkg-command code {
  color: #4ec9b0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
}

.pkg-features,
.courses {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag,
.course-tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.frameworks-table-wrapper {
  overflow-x: auto;
}

.frameworks-table {
  width: 100%;
  border-collapse: collapse;
}

.frameworks-table th {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

.frameworks-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.fw-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fw-icon {
  margin-right: 0.5rem;
}

.rating-bar {
  width: 100px;
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}

.rating-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #8b5cf6);
  transition: width 0.5s ease;
}

.rating-bar.learning .rating-fill {
  background: linear-gradient(90deg, #10b981, #059669);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
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

.community-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.metric-icon {
  font-size: 2rem;
}

.metric-header h5 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.metric-chart {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chart-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bar-label {
  min-width: 80px;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.bar-container {
  flex: 1;
  height: 24px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  background: linear-gradient(90deg, var(--vp-c-brand), #8b5cf6);
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  transition: width 0.5s ease;
}

.bar-fill.questions {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.community-insights h5 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.insight-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid var(--vp-c-brand);
}

.insight-card h6 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.insight-card p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.resource-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resource-section h6 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
}

.doc-rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.star {
  color: var(--vp-c-divider);
}

.star.filled {
  color: #fbbf24;
}

.doc-comment {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.resource-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.resource-section li {
  padding: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  position: relative;
  padding-left: 1rem;
}

.resource-section li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
}

.learning-curve {
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.curve-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.5s ease;
}

.curve-label {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
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

@media (max-width: 768px) {
  .ecosystem-tabs {
    font-size: 0.85rem;
  }

  .packages-grid,
  .resources-grid {
    grid-template-columns: 1fr;
  }

  .community-metrics {
    grid-template-columns: 1fr;
  }

  .frameworks-table {
    font-size: 0.85rem;
  }

  .frameworks-table th,
  .frameworks-table td {
    padding: 0.5rem;
  }
}
</style>
