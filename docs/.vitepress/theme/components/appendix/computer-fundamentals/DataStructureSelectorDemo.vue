<template>
  <div class="ds-selector-demo">
    <div class="demo-header">
      <span class="title">如何选择合适的数据结构？</span>
      <span class="subtitle">根据场景需求做出最佳选择</span>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">你的使用场景是？</div>
      <div class="scenario-grid">
        <div
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-card', { active: activeScenario === scenario.id }]"
          @click="activeScenario = scenario.id"
        >
          <div class="scenario-icon">{{ scenario.icon }}</div>
          <div class="scenario-name">{{ scenario.name }}</div>
          <div class="scenario-desc">{{ scenario.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 推荐结果 -->
    <div v-if="activeScenario" class="recommendation">
      <div class="rec-header">
        <span class="rec-title">推荐使用：{{ currentScenario.recommendation }}</span>
      </div>

      <div class="rec-reason">
        <div class="reason-title">为什么？</div>
        <div class="reason-list">
          <div
            v-for="(reason, index) in currentScenario.reasons"
            :key="index"
            class="reason-item"
          >
            <span class="reason-bullet">✓</span>
            <span class="reason-text">{{ reason }}</span>
          </div>
        </div>
      </div>

      <div class="rec-example">
        <div class="example-title">实际例子</div>
        <div class="example-content">{{ currentScenario.example }}</div>
      </div>
    </div>

    <!-- 快速参考表 -->
    <div class="quick-reference">
      <div class="ref-title">快速参考表</div>
      <table class="ref-table">
        <thead>
          <tr>
            <th>场景需求</th>
            <th>推荐数据结构</th>
            <th>时间复杂度</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in referenceTable" :key="index">
            <td>{{ row.scenario }}</td>
            <td>{{ row.structure }}</td>
            <td class="complexity">{{ row.complexity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 决策流程 -->
    <div class="decision-flow">
      <div class="flow-title">选择决策流程</div>
      <div class="flow-diagram">
        <div class="flow-step question">
          <div class="step-icon">❓</div>
          <div class="step-text">需要快速访问元素？</div>
        </div>
        <div class="flow-branch">
          <div class="branch-yes">
            <div class="branch-label">是</div>
            <div class="flow-result">数组 / 哈希表</div>
          </div>
          <div class="branch-no">
            <div class="branch-label">否</div>
            <div class="flow-step question">
              <div class="step-text">需要频繁插入删除？</div>
            </div>
            <div class="flow-branch">
              <div class="branch-yes">
                <div class="branch-label">是</div>
                <div class="flow-result">链表</div>
              </div>
              <div class="branch-no">
                <div class="branch-label">否</div>
                <div class="flow-step question">
                  <div class="step-text">需要保持顺序？</div>
                </div>
                <div class="flow-branch">
                  <div class="branch-yes">
                    <div class="branch-label">是</div>
                    <div class="flow-result">栈 / 队列</div>
                  </div>
                  <div class="branch-no">
                    <div class="branch-label">否</div>
                    <div class="flow-result">树 / 图</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref(null)

const scenarios = [
  {
    id: 'lookup',
    icon: '🔍',
    name: '快速查找',
    desc: '根据关键词快速找到对应数据',
    recommendation: '哈希表',
    reasons: [
      '平均查找时间 O(1)，瞬间找到',
      '键值对存储，语义清晰',
      '无需遍历整个数据集'
    ],
    example: '用户 ID 查找用户资料、字典查词、缓存系统'
  },
  {
    id: 'ordered',
    icon: '📊',
    name: '保持顺序',
    desc: '数据需要按插入顺序或特定顺序存储',
    recommendation: '数组 或 链表',
    reasons: [
      '数组支持索引直接访问',
      '链表可以灵活调整大小',
      '按位置访问速度快'
    ],
    example: '学生成绩列表、时间序列数据、排行榜'
  },
  {
    id: 'lifo',
    icon: '🥞',
    name: '后进先出',
    desc: '最后进入的最先处理',
    recommendation: '栈',
    reasons: ['只能在栈顶操作', '入栈出栈都是 O(1)', '适合回溯和撤销操作'],
    example: '浏览器后退、编辑器撤销、函数调用栈'
  },
  {
    id: 'fifo',
    icon: '🚶',
    name: '先进先出',
    desc: '先来的先处理',
    recommendation: '队列',
    reasons: ['一端入队，另一端出队', '入队出队都是 O(1)', '公平的调度方式'],
    example: '打印队列、任务调度、消息队列'
  },
  {
    id: 'hierarchy',
    icon: '🌳',
    name: '层级关系',
    desc: '数据之间有父子层级关系',
    recommendation: '树',
    reasons: ['清晰表达层级结构', '查找效率 O(log n)', '支持多种遍历方式'],
    example: '文件系统、组织架构、HTML DOM'
  },
  {
    id: 'relationship',
    icon: '🕸️',
    name: '复杂关系',
    desc: '数据之间有多对多的复杂连接',
    recommendation: '图',
    reasons: ['可以表示任意关系', '支持路径搜索算法', '适合网络和社交关系'],
    example: '社交网络、地图导航、网页链接'
  }
]

const referenceTable = [
  { scenario: '随机访问', structure: '数组', complexity: 'O(1)' },
  { scenario: '快速查找', structure: '哈希表', complexity: 'O(1)' },
  { scenario: '有序查找', structure: '二叉搜索树', complexity: 'O(log n)' },
  { scenario: '频繁插入删除', structure: '链表', complexity: 'O(1)' },
  { scenario: '撤销操作', structure: '栈', complexity: 'O(1)' },
  { scenario: '任务调度', structure: '队列', complexity: 'O(1)' }
]

const currentScenario = computed(() => {
  return scenarios.find((s) => s.id === activeScenario.value)
})
</script>

<style scoped>
.ds-selector-demo {
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

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.scenario-selector {
  margin-bottom: 2rem;
}

.selector-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.scenario-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.scenario-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.scenario-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.scenario-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.scenario-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.recommendation {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.rec-icon {
  font-size: 1.5rem;
}

.rec-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.rec-reason {
  margin-bottom: 1.5rem;
}

.reason-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.reason-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reason-item {
  display: flex;
  gap: 0.75rem;
  align-items: start;
}

.reason-bullet {
  color: #10b981;
  font-weight: 700;
  flex-shrink: 0;
}

.reason-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.rec-example {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.example-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.example-content {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.quick-reference {
  margin-bottom: 2rem;
}

.ref-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.ref-table {
  width: 100%;
  border-collapse: collapse;
}

.ref-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
}

.ref-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.complexity {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.decision-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.flow-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flow-step {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.flow-step.question {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.step-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.flow-branch {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
}

.branch-yes,
.branch-no {
  flex: 1;
}

.branch-label {
  text-align: center;
  padding: 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.flow-result {
  text-align: center;
  padding: 0.75rem;
  background: #10b981;
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
