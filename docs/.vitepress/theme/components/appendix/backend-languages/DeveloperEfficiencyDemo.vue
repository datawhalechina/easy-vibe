<template>
  <div class="developer-efficiency-demo">
    <div class="demo-header">
      <h4>开发效率对比</h4>
      <p class="subtitle">不同语言完成相同任务所需的代码量和时间</p>
    </div>

    <div class="task-selector">
      <label>选择任务：</label>
      <select v-model="selectedTask" @change="updateMetrics">
        <option v-for="task in tasks" :key="task.id" :value="task.id">
          {{ task.name }}
        </option>
      </select>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">📝</span>
          <h5>代码行数</h5>
        </div>
        <div class="metric-chart">
          <div
            v-for="lang in sortedLanguages"
            :key="lang.name"
            class="metric-bar"
          >
            <div class="bar-label">{{ lang.name }}</div>
            <div class="bar-container">
              <div
                class="bar-fill"
                :style="{ width: getBarWidth(lang.lines) + '%' }"
              >
                <span class="bar-value">{{ lang.lines }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="metric-insight">
          <p>
            <strong>💡 分析：</strong>
            {{ getTaskDetail(selectedTask).linesInsight }}
          </p>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">⏱️</span>
          <h5>开发时间（小时）</h5>
        </div>
        <div class="metric-chart">
          <div
            v-for="lang in sortedLanguages"
            :key="lang.name"
            class="metric-bar"
          >
            <div class="bar-label">{{ lang.name }}</div>
            <div class="bar-container">
              <div
                class="bar-fill time"
                :style="{ width: getBarWidth(lang.time) + '%' }"
              >
                <span class="bar-value">{{ lang.time }}h</span>
              </div>
            </div>
          </div>
        </div>
        <div class="metric-insight">
          <p>
            <strong>💡 分析：</strong>
            {{ getTaskDetail(selectedTask).timeInsight }}
          </p>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">🐛</span>
          <h5>调试时间（小时）</h5>
        </div>
        <div class="metric-chart">
          <div
            v-for="lang in sortedLanguages"
            :key="lang.name"
            class="metric-bar"
          >
            <div class="bar-label">{{ lang.name }}</div>
            <div class="bar-container">
              <div
                class="bar-fill debug"
                :style="{ width: getBarWidth(lang.debug) + '%' }"
              >
                <span class="bar-value">{{ lang.debug }}h</span>
              </div>
            </div>
          </div>
        </div>
        <div class="metric-insight">
          <p>
            <strong>💡 分析：</strong>
            {{ getTaskDetail(selectedTask).debugInsight }}
          </p>
        </div>
      </div>
    </div>

    <div class="efficiency-radar">
      <h5>综合效率雷达图</h5>
      <div class="radar-chart">
        <div class="radar-grid">
          <div
            v-for="lang in languages"
            :key="lang.name"
            class="radar-point"
            :style="getRadarPosition(lang)"
          >
            <div class="point-label">{{ lang.name }}</div>
            <div class="point-dot"></div>
          </div>
        </div>
      </div>
      <div class="radar-legend">
        <div class="legend-item">
          <span class="legend-dot"></span>
          <span>左上：代码少，开发快</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot"></span>
          <span>右上：调试快，类型安全</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot"></span>
          <span>左下：生态好，库丰富</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot"></span>
          <span>右下：学习简单，上手快</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTask = ref('rest')

const tasks = [
  { id: 'rest', name: 'REST API 服务' },
  { id: 'web', name: 'Web 应用' },
  { id: 'script', name: '数据处理脚本' },
  { id: 'micro', name: '微服务' }
]

const languages = [
  'Python',
  'Ruby',
  'Go',
  'Node.js',
  'Java',
  'C#',
  'Rust',
  'C++'
]

const taskMetrics = {
  rest: {
    Python: { lines: 50, time: 4, debug: 2 },
    Ruby: { lines: 45, time: 3.5, debug: 2.5 },
    Go: { lines: 80, time: 5, debug: 1.5 },
    'Node.js': { lines: 60, time: 4.5, debug: 2 },
    Java: { lines: 150, time: 8, debug: 2 },
    'C#': { lines: 120, time: 7, debug: 2 },
    Rust: { lines: 100, time: 10, debug: 3 },
    'C++': { lines: 180, time: 12, debug: 5 },
    linesInsight:
      'Python 和 Ruby 用最少的代码实现 REST API，得益于简洁的语法和强大的框架（Flask、Sinatra）。Go 虽然语法简洁，但需要显式类型声明。Java 和 C# 的样板代码最多。',
    timeInsight:
      'Ruby 和 Python 开发最快，适合快速迭代。Go 和 Node.js 居中，平衡了开发速度和性能。Java 和 C# 开发时间较长，但后期维护成本低。Rust 和 C++ 开发时间最长，主要受学习曲线和编译时间影响。',
    debugInsight:
      'Go、Java、C# 的静态类型让调试更容易，大部分错误在编译时就能发现。Python 和 Ruby 虽然开发快，但运行时错误多，调试时间长。Rust 的借用检查器虽然学习曲线陡峭，但能提前发现大量 bug。'
  },
  web: {
    Python: { lines: 200, time: 10, debug: 5 },
    Ruby: { lines: 180, time: 9, debug: 5 },
    Go: { lines: 300, time: 12, debug: 4 },
    'Node.js': { lines: 250, time: 11, debug: 5 },
    Java: { lines: 500, time: 20, debug: 6 },
    'C#': { lines: 400, time: 18, debug: 6 },
    Rust: { lines: 350, time: 25, debug: 8 },
    'C++': { lines: 600, time: 30, debug: 12 },
    linesInsight:
      'Rails 和 Django 的"约定优于配置"让 Web 开发极其高效，代码量最少。全栈的 Node.js 也表现不错。Go 需要 more boilerplate。Java 的 Spring Boot 虽然强大，但配置和样板代码较多。',
    timeInsight:
      'Ruby (Rails) 和 Python (Django) 是 Web 开发的效率之王，内置 ORM、模板引擎、认证等功能，开箱即用。Node.js 的全栈特性让前后端统一，减少沟通成本。Go 和 Java 需要更多配置和 boilerplate。',
    debugInsight:
      '静态类型语言（Go、Java、C#）在大型 Web 项目中优势明显，IDE 支持更好，重构更安全。Python 和 Ruby 在小项目中调试很快，但随着项目增长，动态类型带来的维护成本会急剧上升。'
  },
  script: {
    Python: { lines: 20, time: 1, debug: 0.5 },
    Ruby: { lines: 18, time: 1, debug: 0.5 },
    Go: { lines: 40, time: 2, debug: 0.5 },
    'Node.js': { lines: 25, time: 1.5, debug: 0.5 },
    Java: { lines: 80, time: 4, debug: 1 },
    'C#': { lines: 70, time: 3.5, debug: 1 },
    Rust: { lines: 50, time: 4, debug: 1 },
    'C++': { lines: 100, time: 5, debug: 2 },
    linesInsight:
      'Python 是脚本自动化的绝对王者，标准库丰富，第三方库如 Pandas、Requests 让数据处理极其简单。Ruby 也很优秀。其他语言对于简单脚本来说都太重量级了。',
    timeInsight:
      'Python 和 Ruby 是脚本任务的首选，几行代码就能完成复杂的数据处理。Node.js 在处理 JSON 数据时也很方便。编译型语言（Go、Java、C++）对于简单脚本来说 overhead 太大。',
    debugInsight:
      'Python 的交互式解释器（REPL）和丰富的调试工具（pdb、ipdb）让脚本调试极其高效。Ruby 的 Pry 也很强大。其他语言的编译/运行循环对于脚本开发来说太慢了。'
  },
  micro: {
    Python: { lines: 100, time: 6, debug: 3 },
    Ruby: { lines: 90, time: 5.5, debug: 3.5 },
    Go: { lines: 120, time: 7, debug: 2 },
    'Node.js': { lines: 110, time: 6.5, debug: 3 },
    Java: { lines: 250, time: 15, debug: 4 },
    'C#': { lines: 200, time: 13, debug: 4 },
    Rust: { lines: 140, time: 18, debug: 5 },
    'C++': { lines: 300, time: 22, debug: 8 },
    linesInsight:
      'Go 是微服务的理想选择，单一二进制文件 + 内置 HTTP 服务器 + 强大的标准库。Node.js 的 Express/Koa 也很轻量。Python 的 FastAPI 表现不错，但性能和并发不如 Go。',
    timeInsight:
      'Go 和 Node.js 在微服务开发中效率最高，启动快，部署简单。Python 和 Ruby 适合快速原型，但生产环境需要更多优化。Java 和 C# 的 Spring Cloud/.NET 虽然强大，但对于简单微服务来说太重量级。',
    debugInsight:
      'Go 和 Rust 的类型系统和错误处理让微服务的调试和测试更容易。Java 和 C# 的成熟工具链（JUnit、NUnit）也很有优势。Python 和 Ruby 的动态类型在分布式系统中可能带来运行时错误。'
  }
}

const currentMetrics = computed(() => {
  return taskMetrics[selectedTask.value]
})

const sortedLanguages = computed(() => {
  return languages
    .map((lang) => ({
      name: lang,
      ...currentMetrics.value[lang]
    }))
    .sort((a, b) => a.lines - b.lines)
})

const getBarWidth = (value) => {
  const max = Math.max(
    ...Object.values(currentMetrics.value).flatMap((v) => [
      v.lines,
      v.time * 20,
      v.debug * 20
    ])
  )
  return (value / max) * 100
}

const getTaskDetail = (taskId) => {
  return taskMetrics[taskId]
}

const getRadarPosition = (langName) => {
  const metrics = currentMetrics.value[langName]
  const avgLines =
    Object.values(currentMetrics.value).reduce((sum, v) => sum + v.lines, 0) /
    languages.length
  const avgTime =
    Object.values(currentMetrics.value).reduce((sum, v) => sum + v.time, 0) /
    languages.length
  const avgDebug =
    Object.values(currentMetrics.value).reduce((sum, v) => sum + v.debug, 0) /
    languages.length

  // Normalize metrics (lower is better, so we invert)
  const linesScore = 1 - metrics.lines / 300 // Max lines ~300
  const timeScore = 1 - metrics.time / 30 // Max time ~30
  const debugScore = 1 - metrics.debug / 12 // Max debug ~12

  // Position in 2D space
  // X: code efficiency (linesScore) vs ecosystem (hardcoded)
  // Y: speed (timeScore) vs maintainability (debugScore)
  const x = 50 + (linesScore - 0.5) * 80
  const y = 50 + (timeScore - 0.5) * 80

  return {
    left: `${x}%`,
    top: `${y}%`
  }
}

const updateMetrics = () => {
  // Trigger reactivity
}
</script>

<style scoped>
.developer-efficiency-demo {
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

.task-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.task-selector label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.task-selector select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
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
  margin-bottom: 1.5rem;
}

.metric-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bar-label {
  min-width: 70px;
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
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
}

.bar-fill.time {
  background: linear-gradient(90deg, #10b981, #059669);
}

.bar-fill.debug {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.metric-insight {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border-left: 3px solid var(--vp-c-brand);
}

.metric-insight p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.efficiency-radar {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.efficiency-radar h5 {
  margin: 0 0 2rem 0;
  text-align: center;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.radar-chart {
  position: relative;
  width: 100%;
  height: 400px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.radar-grid {
  position: relative;
  width: 100%;
  height: 100%;
}

.radar-point {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
}

.radar-point:hover {
  transform: translate(-50%, -50%) scale(1.2);
}

.point-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.point-dot {
  width: 12px;
  height: 12px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
}

.radar-legend {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.legend-dot {
  width: 10px;
  height: 10px;
  background: var(--vp-c-brand);
  border-radius: 50%;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .bar-label {
    min-width: 55px;
    font-size: 0.75rem;
  }

  .efficiency-radar {
    padding: 1rem;
  }

  .radar-chart {
    height: 300px;
  }
}
</style>
