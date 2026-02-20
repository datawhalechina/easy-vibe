<template>
  <div class="algorithm-overview-demo">
    <div class="demo-header">
      <span class="icon">🧮</span>
      <span class="title">算法思维入门</span>
      <span class="subtitle">解决问题的一套步骤和方法</span>
    </div>

    <div class="analogy-box">
      <div class="analogy-content">
        <div class="analogy-icon">📖</div>
        <div class="analogy-text">
          <strong>算法就像菜谱：</strong><br>
          食材 = 数据<br>
          烹饪步骤 = 算法<br>
          美味菜肴 = 结果
        </div>
      </div>
    </div>

    <div class="algorithm-categories">
      <div class="category-title">常见算法类型</div>
      <div class="category-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="['category-card', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          <div class="card-icon">{{ category.icon }}</div>
          <div class="card-name">{{ category.name }}</div>
          <div class="card-desc">{{ category.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 算法详解 -->
    <div v-if="activeCategory" class="algorithm-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentCategory.icon }}</span>
        <span class="detail-title">{{ currentCategory.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">核心思想</div>
          <div class="section-text">{{ currentCategory.idea }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">生活类比</div>
          <div class="analogy-card">
            <div class="analogy-scenario">{{ currentCategory.analogy.scenario }}</div>
            <div class="analogy-explanation">{{ currentCategory.analogy.explanation }}</div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">时间复杂度</div>
          <div class="complexity-display">
            <div class="complexity-bigO">{{ currentCategory.complexity }}</div>
            <div class="complexity-desc">{{ currentCategory.complexityDesc }}</div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">典型应用</div>
          <div class="app-list">
            <div
              v-for="(app, index) in currentCategory.applications"
              :key="index"
              class="app-tag"
            >
              {{ app }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 复杂度对比 -->
    <div class="complexity-comparison">
      <div class="comparison-title">常见算法复杂度对比</div>
      <div class="comparison-chart">
        <div
          v-for="(item, index) in complexityChart"
          :key="index"
          class="chart-item"
        >
          <div class="chart-label">{{ item.name }}</div>
          <div class="chart-bar-container">
            <div
              class="chart-bar"
              :style="{ width: item.width, backgroundColor: item.color }"
            ></div>
          </div>
          <div class="chart-value">{{ item.complexity }}</div>
        </div>
      </div>
    </div>

    <!-- 学习建议 -->
    <div class="learning-tips">
      <div class="tips-title">算法学习建议</div>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">📚</div>
          <div class="tip-title">理解优先</div>
          <div class="tip-desc">先理解算法思想，再关注代码实现</div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">✏️</div>
          <div class="tip-title">动手实践</div>
          <div class="tip-desc">自己实现一遍，加深理解</div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">🔄</div>
          <div class="tip-title">多次练习</div>
          <div class="tip-desc">不同场景反复应用同一算法</div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">⚡</div>
          <div class="tip-title">分析优化</div>
          <div class="tip-desc">思考时间和空间复杂度，寻找优化方案</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('search')

const categories = [
  {
    id: 'search',
    name: '查找算法',
    icon: '🔍',
    desc: '在一堆数据中找到目标',
    idea: '从数据集合中找到特定元素的过程',
    analogy: {
      scenario: '在字典里查单词',
      explanation: '顺序查找 = 从第一页翻到最后一页；二分查找 = 直接翻到中间，判断在前半还是后半'
    },
    complexity: 'O(log n)',
    complexityDesc: '二分查找非常快，每次排除一半数据',
    applications: ['搜索引擎', '数据库查询', '自动补全']
  },
  {
    id: 'sort',
    name: '排序算法',
    icon: '📊',
    desc: '把数据按顺序排列',
    idea: '将无序数据重新排列成有序序列',
    analogy: {
      scenario: '整理扑克牌',
      explanation: '插入排序 = 每次拿一张牌插到正确的位置；快速排序 = 把牌分成大小两堆，递归整理'
    },
    complexity: 'O(n log n)',
    complexityDesc: '快速排序、归并排序是最高效的通用排序算法',
    applications: ['排行榜', '文件排序', '数据可视化']
  },
  {
    id: 'recursive',
    name: '递归算法',
    icon: '🔄',
    desc: '自己调用自己',
    idea: '将大问题分解为相同类型的小问题',
    analogy: {
      scenario: '俄罗斯套娃',
      explanation: '打开一个大娃娃，里面有个小一点的娃娃，再打开还有更小的...直到最小的一个'
    },
    complexity: 'O(log n) 到 O(2ⁿ)',
    complexityDesc: '取决于问题类型，二分查找递归很快，斐波那契递归较慢',
    applications: ['树遍历', '分治算法', '动态规划']
  },
  {
    id: 'greedy',
    name: '贪心算法',
    icon: '🎯',
    desc: '每步都选当前最优',
    idea: '在每一步选择中都采取当前状态下最优的选择',
    analogy: {
      scenario: '找零钱',
      explanation: '找 37 元零钱：先拿一张 20（最大可能），再拿 10、5、1、1，每次都选最大的面值'
    },
    complexity: 'O(n) 或 O(n log n)',
    complexityDesc: '通常很快，但可能得不到全局最优解',
    applications: ['最短路径', '背包问题', '任务调度']
  },
  {
    id: 'dynamic',
    name: '动态规划',
    icon: '📈',
    desc: '保存中间结果避免重复',
    idea: '将复杂问题分解为子问题，保存子问题的解',
    analogy: {
      scenario: '爬楼梯',
      explanation: '要爬到第 n 级，可以从 n-1 级跨 1 步，或从 n-2 级跨 2 步，记住之前的结果避免重复计算'
    },
    complexity: 'O(n²) 或 O(n³)',
    complexityDesc: '用空间换时间，比递归快很多',
    applications: ['最短路径', '背包问题', '字符串匹配']
  }
]

const complexityChart = [
  { name: '二分查找', complexity: 'O(log n)', width: '10%', color: '#10b981' },
  { name: '快速排序', complexity: 'O(n log n)', width: '25%', color: '#3b82f6' },
  { name: '插入排序', complexity: 'O(n²)', width: '50%', color: '#f59e0b' },
  { name: '暴力递归', complexity: 'O(2ⁿ)', width: '100%', color: '#ef4444' }
]

const currentCategory = computed(() => categories.find(c => c.id === activeCategory.value))
</script>

<style scoped>
.algorithm-overview-demo {
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

.analogy-box {
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.analogy-content {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.analogy-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.analogy-text {
  font-size: 1rem;
  line-height: 1.8;
}

.algorithm-categories {
  margin-bottom: 2rem;
}

.category-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.category-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.category-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.category-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.algorithm-detail {
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

.analogy-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.analogy-scenario {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.analogy-explanation {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.complexity-display {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.complexity-bigO {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.complexity-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.app-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.app-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
}

.complexity-comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-chart {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.chart-item {
  display: grid;
  grid-template-columns: 100px 1fr 80px;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-item:last-child {
  margin-bottom: 0;
}

.chart-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.chart-bar-container {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  height: 24px;
  overflow: hidden;
}

.chart-bar {
  height: 100%;
  transition: width 0.5s ease-out;
  border-radius: 4px;
}

.chart-value {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.learning-tips {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.tips-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tip-card {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.tip-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.tip-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.tip-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
