<template>
  <div class="language-comparison-demo">
    <div class="demo-header">
      <span class="icon">⚖️</span>
      <span class="title">语言天平</span>
      <span class="subtitle">权衡不同维度的优劣势</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">超市购物</span>：有的商品便宜但不耐用，有的质量好但价格高。选择后端语言也一样，需要在性能、开发效率、生态成熟度等多个维度之间做权衡。
    </div>

    <div class="dimension-selector">
      <div class="dimension-label">选择比较维度：</div>
      <div class="dimension-buttons">
        <button
          v-for="dim in dimensions"
          :key="dim.key"
          class="dimension-btn"
          :class="{ active: selectedDimension === dim.key }"
          @click="selectedDimension = dim.key"
        >
          <span class="dim-icon">{{ dim.icon }}</span>
          <span class="dim-label">{{ dim.label }}</span>
        </button>
      </div>
    </div>

    <div class="comparison-chart">
      <div class="chart-header">
        <span class="chart-title">{{ getDimensionInfo().title }}</span>
        <span class="chart-unit">{{ getDimensionInfo().unit }}</span>
      </div>
      <div class="bars-container">
        <div
          v-for="lang in sortedLanguages"
          :key="lang.name"
          class="bar-wrapper"
        >
          <div class="bar-label">{{ lang.name }}</div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :class="getBarClass(lang.score)"
              :style="{ width: lang.score + '%' }"
            >
              <span class="bar-value">{{ lang.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="insight-box">
      <span class="icon">🔍</span>
      <div class="insight-content">
        <strong>洞察分析：</strong>
        <p>{{ getDimensionInfo().insight }}</p>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>没有"万能银弹"。高性能往往意味着高开发成本（C++、Rust），快速开发通常伴随性能损失（Python、Ruby）。根据项目核心诉求做取舍，而不是追求"样样都行"。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedDimension = ref('performance')

const dimensions = [
  { key: 'performance', icon: '⚡', label: '性能' },
  { key: 'efficiency', icon: '🚀', label: '开发效率' },
  { key: 'ecosystem', icon: '📦', label: '生态成熟度' },
  { key: 'learning', icon: '📚', label: '学习曲线' },
  { key: 'concurrency', icon: '🔄', label: '并发能力' }
]

const dimensionInfo = {
  performance: {
    title: '性能对比',
    unit: '(分数越高越快)',
    insight: 'C++ 和 Rust 在性能方面遥遥领先，但学习曲线极其陡峭。Go 和 Java 在性能和开发效率之间取得了很好的平衡。Python 和 Ruby 性能最弱，但开发速度最快。'
  },
  efficiency: {
    title: '开发效率',
    unit: '(分数越高越快)',
    insight: 'Python 和 Ruby 在快速开发方面无与伦比，适合原型和初创公司。Go 和 Node.js 居中，兼顾了开发速度和性能。Rust 和 C++ 开发效率最低，主要受学习曲线影响。'
  },
  ecosystem: {
    title: '生态成熟度',
    unit: '(分数越高库越多)',
    insight: 'Java、Python、Node.js 拥有最成熟的生态系统。Go 和 Rust 虽然年轻，但发展迅速。C++ 生态成熟但学习成本高。Ruby 生态主要集中在 Web 开发领域。'
  },
  learning: {
    title: '学习曲线',
    unit: '(分数越高越简单)',
    insight: 'Python、Ruby、Go 最容易上手。Node.js 需要理解异步概念。Java 需要掌握面向对象和框架。Rust 和 C++ 学习曲线最陡，需要深入理解内存管理。'
  },
  concurrency: {
    title: '并发能力',
    unit: '(分数越高越强)',
    insight: 'Go 的 Goroutine 是并发的王者，轻量且简单。Rust 的异步模型性能强大但复杂。Java 的线程池成熟稳定。Node.js 的事件循环适合 I/O 密集型。Python 的 GIL 限制了多线程性能。'
  }
}

const languageScores = {
  performance: [
    { name: 'C++', score: 98 },
    { name: 'Rust', score: 95 },
    { name: 'Go', score: 90 },
    { name: 'Java', score: 75 },
    { name: 'Node.js', score: 70 },
    { name: 'Python', score: 30 },
    { name: 'Ruby', score: 25 }
  ],
  efficiency: [
    { name: 'Python', score: 95 },
    { name: 'Ruby', score: 90 },
    { name: 'Go', score: 85 },
    { name: 'Node.js', score: 85 },
    { name: 'Java', score: 60 },
    { name: 'Rust', score: 40 },
    { name: 'C++', score: 35 }
  ],
  ecosystem: [
    { name: 'Java', score: 95 },
    { name: 'Python', score: 95 },
    { name: 'Node.js', score: 95 },
    { name: 'C++', score: 90 },
    { name: 'Go', score: 75 },
    { name: 'Ruby', score: 70 },
    { name: 'Rust', score: 70 }
  ],
  learning: [
    { name: 'Python', score: 95 },
    { name: 'Ruby', score: 85 },
    { name: 'Go', score: 80 },
    { name: 'Node.js', score: 75 },
    { name: 'Java', score: 40 },
    { name: 'C++', score: 25 },
    { name: 'Rust', score: 20 }
  ],
  concurrency: [
    { name: 'Go', score: 95 },
    { name: 'Rust', score: 90 },
    { name: 'Node.js', score: 85 },
    { name: 'Java', score: 80 },
    { name: 'C++', score: 85 },
    { name: 'Python', score: 30 },
    { name: 'Ruby', score: 25 }
  ]
}

const sortedLanguages = computed(() => {
  const scores = languageScores[selectedDimension.value]
  return [...scores].sort((a, b) => b.score - a.score)
})

const getDimensionInfo = () => {
  return dimensionInfo[selectedDimension.value]
}

const getBarClass = (score) => {
  if (score >= 85) return 'bar-high'
  if (score >= 60) return 'bar-medium'
  return 'bar-low'
}
</script>

<style scoped>
.language-comparison-demo {
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

.dimension-selector {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.dimension-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.dimension-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dimension-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.dimension-btn:hover {
  border-color: var(--vp-c-brand);
}

.dimension-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.dim-icon {
  font-size: 1rem;
}

.comparison-chart {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.chart-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.chart-unit {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.bars-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar-label {
  min-width: 70px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bar-track {
  flex: 1;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
}

.bar-high {
  background: var(--vp-c-green-1);
}

.bar-medium {
  background: var(--vp-c-yellow-1);
}

.bar-low {
  background: var(--vp-c-brand-1);
}

.insight-box {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  border-left: 3px solid var(--vp-c-brand);
}

.insight-box .icon {
  flex-shrink: 0;
}

.insight-content {
  flex: 1;
}

.insight-content strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.insight-content p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
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
