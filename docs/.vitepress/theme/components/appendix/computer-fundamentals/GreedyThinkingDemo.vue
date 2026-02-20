<template>
  <div class="greedy-thinking-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">贪心算法：每步都选当前最优</span>
      <span class="subtitle">局部最优 → 全局最优?</span>
    </div>

    <div class="core-idea">
      <div class="idea-box">
        <div class="idea-icon">💡</div>
        <div class="idea-text">
          贪心算法在每一步选择中都采取当前状态下<strong>最优</strong>的选择<br>
          希望通过一系列局部最优选择达到<strong>全局最优</strong>
        </div>
      </div>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">经典问题</div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-btn', { active: activeScenario === scenario.id }]"
          @click="activeScenario = scenario.id"
        >
          {{ scenario.icon }} {{ scenario.name }}
        </button>
      </div>
    </div>

    <!-- 找零钱问题 -->
    <div v-if="activeScenario === 'change'" class="scenario-content">
      <div class="content-title">找零钱问题</div>
      <div class="change-demo">
        <div class="change-amount">
          需要找零：<span class="amount">{{ changeAmount }}</span> 元
        </div>
        <div class="change-process">
          <div class="process-step" v-for="(step, index) in changeSteps" :key="index">
            <div class="step-coin">{{ step.coin }}</div>
            <div class="step-text">× {{ step.count }} = {{ step.value }}元</div>
          </div>
        </div>
        <div class="change-result">
          共需要 <strong>{{ totalCoins }}</strong> 个硬币
        </div>
      </div>
      <div class="scenario-note">
        ✓ 贪心策略：每次选择面值最大的硬币<br>
        ✓ 适用于人民币、美元等货币系统
      </div>
    </div>

    <!-- 活动选择问题 -->
    <div v-if="activeScenario === 'activity'" class="scenario-content">
      <div class="content-title">活动选择问题</div>
      <div class="activity-demo">
        <div class="activities-list">
          <div
            v-for="(activity, index) in activities"
            :key="index"
            :class="['activity-item', { selected: activity.selected, conflicting: activity.conflicting }]"
          >
            <div class="activity-time">{{ activity.start }} - {{ activity.end }}</div>
            <div class="activity-name">{{ activity.name }}</div>
          </div>
        </div>
        <div class="activity-rule">
          贪心策略：<strong>选择最早结束</strong>的活动
        </div>
        <div class="activity-result">
          最多可以参加 <strong>{{ selectedCount }}</strong> 个活动
        </div>
      </div>
    </div>

    <!-- 最短路径 -->
    <div v-if="activeScenario === 'shortest'" class="scenario-content">
      <div class="content-title">最短路径问题 (Dijkstra)</div>
      <div class="shortest-demo">
        <div class="path-graph">
          <div class="graph-nodes">
            <div class="node start">A(起点)</div>
            <div class="node">B</div>
            <div class="node">C</div>
            <div class="node">D</div>
            <div class="node end">E(终点)</div>
          </div>
          <div class="graph-edges">
            <div class="edge">A-B: 4</div>
            <div class="edge">A-C: 2</div>
            <div class="edge">B-D: 3</div>
            <div class="edge">C-D: 1</div>
            <div class="edge">C-E: 5</div>
            <div class="edge">D-E: 2</div>
          </div>
        </div>
        <div class="path-result">
          <div class="result-step">从 A 出发，选择距离最近的节点</div>
          <div class="result-path">A → C → D → E</div>
          <div class="result-distance">总距离：2 + 1 + 2 = 5</div>
        </div>
      </div>
    </div>

    <!-- 贪心 vs 动态规划 -->
    <div class="comparison">
      <div class="comparison-title">贪心 vs 动态规划</div>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特点</th>
              <th>贪心算法</th>
              <th>动态规划</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>决策方式</td>
              <td>每步选当前最优</td>
              <td>考虑所有可能，选最优</td>
            </tr>
            <tr>
              <td>最优性</td>
              <td>可能不是全局最优</td>
              <td>保证全局最优</td>
            </tr>
            <tr>
              <td>时间复杂度</td>
              <td>O(n) 或 O(n log n)</td>
              <td>O(n²) 或更高</td>
            </tr>
            <tr>
              <td>适用场景</td>
              <td>局部最优 → 全局最优</td>
              <td>重叠子问题</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 优缺点 -->
    <div class="pros-cons">
      <div class="pros-column">
        <div class="column-title">✓ 优点</div>
        <ul>
          <li>实现简单</li>
          <li>效率高</li>
          <li>空间复杂度低</li>
        </ul>
      </div>
      <div class="cons-column">
        <div class="column-title">✗ 缺点</div>
        <ul>
          <li>不保证全局最优</li>
          <li>适用范围有限</li>
          <li>需要证明最优性</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref('change')

const scenarios = [
  { id: 'change', name: '找零钱', icon: '💰' },
  { id: 'activity', name: '活动选择', icon: '📅' },
  { id: 'shortest', name: '最短路径', icon: '🗺️' }
]

const changeAmount = ref(37)

const changeSteps = [
  { coin: '20元', count: 1, value: 20 },
  { coin: '10元', count: 1, value: 10 },
  { coin: '5元', count: 1, value: 5 },
  { coin: '1元', count: 2, value: 2 }
]

const totalCoins = computed(() => changeSteps.reduce((sum, step) => sum + step.count, 0))

const activities = [
  { start: '9:00', end: '10:00', name: '活动1', selected: true, conflicting: false },
  { start: '9:30', end: '11:30', name: '活动2', selected: false, conflicting: true },
  { start: '10:00', end: '11:00', name: '活动3', selected: true, conflicting: false },
  { start: '10:30', end: '12:00', name: '活动4', selected: false, conflicting: true },
  { start: '11:00', end: '12:00', name: '活动5', selected: true, conflicting: false }
]

const selectedCount = computed(() => activities.filter(a => a.selected).length)
</script>

<style scoped>
.greedy-thinking-demo {
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

.core-idea {
  margin-bottom: 2rem;
}

.idea-box {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
}

.idea-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.idea-text {
  font-size: 0.95rem;
  line-height: 1.8;
}

.scenario-selector {
  margin-bottom: 2rem;
}

.selector-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.scenario-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.scenario-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.content-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.change-demo {
  text-align: center;
}

.change-amount {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.amount {
  color: var(--vp-c-brand);
  font-weight: 700;
  font-size: 1.3rem;
}

.change-process {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.process-step {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.step-coin {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.35rem;
}

.step-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.change-result {
  font-size: 1rem;
  padding: 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 6px;
}

.scenario-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.6;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.activity-item.selected {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.activity-item.conflicting {
  opacity: 0.5;
}

.activity-time {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  flex-shrink: 0;
}

.activity-name {
  flex: 1;
}

.activity-rule {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.activity-result {
  text-align: center;
  font-size: 1rem;
}

.shortest-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .shortest-demo {
    grid-template-columns: 1fr;
  }
}

.path-graph {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
}

.graph-nodes {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.node {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
}

.node.start {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  font-weight: 600;
}

.node.end {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  font-weight: 600;
}

.graph-edges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edge {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.path-result {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result-step {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.result-path {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-align: center;
}

.result-distance {
  text-align: center;
  font-size: 0.95rem;
}

.comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-table table {
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
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros-column,
.cons-column {
  padding: 1.25rem;
  border-radius: 8px;
}

.pros-column {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
}

.cons-column {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
}

.column-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.pros-column ul,
.cons-column ul {
  margin: 0;
  padding-left: 1.25rem;
}

.pros-column li,
.cons-column li {
  font-size: 0.9rem;
  line-height: 1.8;
}
</style>
