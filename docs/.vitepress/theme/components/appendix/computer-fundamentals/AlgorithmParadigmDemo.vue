<template>
  <div class="algorithm-paradigm-demo">
    <div class="demo-header">
      <span class="icon">🔧</span>
      <span class="title">算法设计范式</span>
      <span class="subtitle">解决问题的常用套路</span>
    </div>

    <div class="intro-text">
      算法设计范式是解决问题的<strong>通用策略</strong>，掌握这些套路可以快速找到解题思路
    </div>

    <div class="paradigm-grid">
      <div
        v-for="paradigm in paradigms"
        :key="paradigm.id"
        :class="['paradigm-card', { active: activeParadigm === paradigm.id }]"
        @click="activeParadigm = paradigm.id"
      >
        <div class="card-icon">{{ paradigm.icon }}</div>
        <div class="card-name">{{ paradigm.name }}</div>
        <div class="card-tagline">{{ paradigm.tagline }}</div>
      </div>
    </div>

    <!-- 详细说明 -->
    <div v-if="activeParadigm" class="paradigm-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentParadigm.icon }}</span>
        <span class="detail-title">{{ currentParadigm.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">核心思想</div>
          <div class="section-text">{{ currentParadigm.idea }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">适用场景</div>
          <div class="scenario-tags">
            <span
              v-for="(scenario, index) in currentParadigm.scenarios"
              :key="index"
              class="scenario-tag"
            >
              {{ scenario }}
            </span>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">经典问题</div>
          <div class="problems-list">
            <div
              v-for="(problem, index) in currentParadigm.problems"
              :key="index"
              class="problem-item"
            >
              <div class="problem-icon">📝</div>
              <div class="problem-text">{{ problem }}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">时间复杂度</div>
          <div class="complexity-box">
            <div class="complexity-value">{{ currentParadigm.complexity }}</div>
            <div class="complexity-note">{{ currentParadigm.complexityNote }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 对比总结 -->
    <div class="paradigm-comparison">
      <div class="comparison-title">范式对比总结</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>范式</th>
            <th>核心策略</th>
            <th>最优性</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in comparisonData"
            :key="index"
            :class="{ highlighted: item.id === activeParadigm }"
          >
            <td>{{ item.icon }} {{ item.name }}</td>
            <td>{{ item.strategy }}</td>
            <td>{{ item.optimal }}</td>
            <td>{{ item.use }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 选择建议 -->
    <div class="selection-guide">
      <div class="guide-title">如何选择合适的范式？</div>
      <div class="guide-steps">
        <div class="guide-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-title">分析问题特征</div>
            <div class="step-desc">是否有重叠子问题？是否有最优子结构？</div>
          </div>
        </div>
        <div class="guide-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-title">判断是否需要最优解</div>
            <div class="step-desc">贪心不一定最优，动态规划保证最优</div>
          </div>
        </div>
        <div class="guide-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-title">考虑数据规模</div>
            <div class="step-desc">回溯适合小规模，分治适合大规模</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeParadigm = ref('divide')

const paradigms = [
  {
    id: 'divide',
    name: '分治法',
    icon: '✂️',
    tagline: '分而治之',
    idea: '将大问题分解成多个小问题，递归解决小问题，最后合并结果',
    scenarios: ['数组排序', '矩阵乘法', '大整数运算'],
    problems: ['归并排序', '快速排序', '二分查找', 'Strassen 矩阵乘法'],
    complexity: 'O(n log n)',
    complexityNote: '通常比暴力法快很多'
  },
  {
    id: 'dynamic',
    name: '动态规划',
    icon: '📊',
    tagline: '保存结果避免重复',
    idea: '将问题分解为重叠子问题，保存子问题的解，避免重复计算',
    scenarios: ['最优解问题', '计数问题', '路径问题'],
    problems: ['斐波那契数列', '背包问题', '最长公共子序列', '最短路径'],
    complexity: 'O(n²) 或 O(n³)',
    complexityNote: '用空间换时间，比递归快'
  },
  {
    id: 'greedy',
    name: '贪心法',
    icon: '🎯',
    tagline: '局部最优',
    idea: '在每一步选择中都采取当前状态下最优的选择，希望达到全局最优',
    scenarios: ['优化问题', '调度问题', '图问题'],
    problems: ['找零钱', '活动选择', 'Huffman 编码', '最小生成树'],
    complexity: 'O(n log n)',
    complexityNote: '最快，但不一定最优'
  },
  {
    id: 'backtrack',
    name: '回溯法',
    icon: '🔙',
    tagline: '试错法',
    idea: '系统性地搜索解空间，遇到死路就回退到上一个分岔口',
    scenarios: ['组合问题', '排列问题', '约束满足'],
    problems: ['N 皇后问题', '数独', '全排列', '子集问题'],
    complexity: 'O(2ⁿ) 或 O(n!)',
    complexityNote: '指数级，适合小规模'
  }
]

const comparisonData = [
  {
    id: 'divide',
    name: '分治法',
    icon: '✂️',
    strategy: '分解 → 递归 → 合并',
    optimal: '保证最优',
    use: '问题可独立分解'
  },
  {
    id: 'dynamic',
    name: '动态规划',
    icon: '📊',
    strategy: '保存子问题解',
    optimal: '保证最优',
    use: '有重叠子问题'
  },
  {
    id: 'greedy',
    name: '贪心法',
    icon: '🎯',
    strategy: '每次选最优',
    optimal: '不一定最优',
    use: '局部最优 → 全局最优'
  },
  {
    id: 'backtrack',
    name: '回溯法',
    icon: '🔙',
    strategy: '深度优先搜索',
    optimal: '保证最优',
    use: '解空间小，需要穷举'
  }
]

const currentParadigm = computed(() => paradigms.find(p => p.id === activeParadigm.value))
</script>

<style scoped>
.algorithm-paradigm-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.intro-text {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.paradigm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.paradigm-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.paradigm-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.paradigm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card-tagline {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.paradigm-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.scenario-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.scenario-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
}

.problems-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.problem-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.problem-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.problem-text {
  font-size: 0.85rem;
  line-height: 1.5;
}

.complexity-box {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.complexity-value {
  font-family: 'Courier New', monospace;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.35rem;
}

.complexity-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.paradigm-comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

tr.highlighted {
  background: var(--vp-c-brand-soft);
}

.selection-guide {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.guide-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.guide-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.guide-step {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
