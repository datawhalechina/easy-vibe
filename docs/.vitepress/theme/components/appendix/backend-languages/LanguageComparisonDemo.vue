<template>
  <div class="language-comparison-demo">
    <div class="comparison-table-wrapper">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>维度</th>
            <th v-for="lang in languages" :key="lang.name" class="lang-col">
              {{ lang.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dimension in dimensions" :key="dimension.key">
            <td class="dimension-label">{{ dimension.label }}</td>
            <td v-for="lang in languages" :key="lang.name" class="score-cell">
              <div class="score-bar">
                <div
                  class="score-fill"
                  :class="`score-${dimension.key}`"
                  :style="{ width: getScore(lang.name, dimension.key) + '%' }"
                >
                  <span class="score-text">{{
                    getScore(lang.name, dimension.key)
                  }}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="insight-panel">
      <h4>💡 洞察分析</h4>
      <div class="insight-content">
        <div class="insight-item">
          <strong>性能王者：</strong>
          <span>C++ 和 Rust 在性能方面遥遥领先，但学习曲线极其陡峭。</span>
        </div>
        <div class="insight-item">
          <strong>开发效率：</strong>
          <span
            >Python 和 Ruby 在快速开发方面无与伦比，适合原型和初创公司。</span
          >
        </div>
        <div class="insight-item">
          <strong>生态成熟度：</strong>
          <span
            >Java、Python、Node.js 拥有最成熟的生态系统，库和框架丰富。</span
          >
        </div>
        <div class="insight-item">
          <strong>学习曲线：</strong>
          <span
            >Python、Ruby、Go 最容易上手，Rust 和 C++ 需要较长时间学习。</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const languages = [
  { name: 'Java' },
  { name: 'Python' },
  { name: 'Go' },
  { name: 'Node.js' },
  { name: 'Rust' },
  { name: 'C++' }
]

const dimensions = [
  { key: 'performance', label: '性能' },
  { key: 'efficiency', label: '开发效率' },
  { key: 'ecosystem', label: '生态成熟度' },
  { key: 'learning', label: '学习曲线' },
  { key: 'concurrency', label: '并发能力' },
  { key: 'memory', label: '内存管理' }
]

const scores = {
  Java: {
    performance: 75,
    efficiency: 60,
    ecosystem: 95,
    learning: 40,
    concurrency: 80,
    memory: 70
  },
  Python: {
    performance: 30,
    efficiency: 95,
    ecosystem: 95,
    learning: 95,
    concurrency: 30,
    memory: 40
  },
  Go: {
    performance: 90,
    efficiency: 85,
    ecosystem: 75,
    learning: 80,
    concurrency: 95,
    memory: 85
  },
  'Node.js': {
    performance: 70,
    efficiency: 85,
    ecosystem: 95,
    learning: 75,
    concurrency: 85,
    memory: 75
  },
  Rust: {
    performance: 95,
    efficiency: 40,
    ecosystem: 70,
    learning: 20,
    concurrency: 90,
    memory: 98
  },
  'C++': {
    performance: 98,
    efficiency: 35,
    ecosystem: 90,
    learning: 25,
    concurrency: 85,
    memory: 70
  }
}

const getScore = (lang, dimension) => {
  return scores[lang][dimension]
}
</script>

<style scoped>
.language-comparison-demo {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.comparison-table-wrapper {
  overflow-x: auto;
  margin-bottom: 2rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.comparison-table th {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison-table th.lang-col {
  color: var(--vp-c-brand);
  font-size: 1.1rem;
}

.comparison-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dimension-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.score-cell {
  padding: 0.75rem;
}

.score-bar {
  height: 30px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.score-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
}

.score-performance {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
}

.score-efficiency {
  background: linear-gradient(90deg, #34d399, #10b981);
}

.score-ecosystem {
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
}

.score-learning {
  background: linear-gradient(90deg, #f472b6, #ec4899);
}

.score-concurrency {
  background: linear-gradient(90deg, #a78bfa, #8b5cf6);
}

.score-memory {
  background: linear-gradient(90deg, #fb923c, #ea580c);
}

.score-text {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.insight-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid var(--vp-c-brand);
}

.insight-panel h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
  font-size: 1.2rem;
}

.insight-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.insight-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.insight-item strong {
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.insight-item span {
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .comparison-table-wrapper {
    font-size: 0.85rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }

  .insight-content {
    font-size: 0.9rem;
  }
}
</style>
