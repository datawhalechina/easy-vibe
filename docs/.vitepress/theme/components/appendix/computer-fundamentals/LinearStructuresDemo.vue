<template>
  <div class="linear-structures-demo">
    <div class="demo-header">
      <span class="icon">📚</span>
      <span class="title">线性结构的四种形态</span>
      <span class="subtitle">数组、链表、栈、队列的区别</span>
    </div>

    <div class="structure-tabs">
      <button
        v-for="structure in structures"
        :key="structure.id"
        :class="['tab-btn', { active: activeStructure === structure.id }]"
        @click="activeStructure = structure.id"
      >
        {{ structure.icon }} {{ structure.name }}
      </button>
    </div>

    <!-- 可视化展示 -->
    <div class="structure-visual">
      <div class="visual-header">
        <span class="structure-title">{{ currentStructure.name }}</span>
        <span class="structure-tagline">{{ currentStructure.tagline }}</span>
      </div>

      <!-- 数组 -->
      <div v-if="activeStructure === 'array'" class="array-visual">
        <div class="memory-block">
          <div
            v-for="(item, index) in arrayData"
            :key="index"
            class="array-cell"
          >
            <div class="cell-index">{{ index }}</div>
            <div class="cell-value">{{ item }}</div>
          </div>
        </div>
        <div class="visual-note">
          ✓ 连续内存存储 | ✓ 快速访问 (O(1)) | ✗ 插入删除慢 (O(n))
        </div>
      </div>

      <!-- 链表 -->
      <div v-if="activeStructure === 'linkedlist'" class="linkedlist-visual">
        <div class="nodes-chain">
          <div
            v-for="(item, index) in linkedListData"
            :key="index"
            class="linked-node"
          >
            <div class="node-data">{{ item }}</div>
            <div class="node-pointer">→</div>
          </div>
          <div class="linked-node null">
            <div class="node-data">NULL</div>
          </div>
        </div>
        <div class="visual-note">
          ✓ 非连续内存 | ✗ 访问慢 (O(n)) | ✓ 快速插入删除
        </div>
      </div>

      <!-- 栈 -->
      <div v-if="activeStructure === 'stack'" class="stack-visual">
        <div class="stack-container">
          <div class="stack-top">栈顶 ↓</div>
          <div class="stack-items">
            <div
              v-for="(item, index) in stackData"
              :key="index"
              class="stack-item"
            >
              {{ item }}
            </div>
          </div>
          <div class="stack-bottom">栈底</div>
        </div>
        <div class="stack-operations">
          <button class="op-btn" @click="pushStack">
            入栈 (PUSH)
          </button>
          <button class="op-btn" @click="popStack">
            出栈 (POP)
          </button>
        </div>
        <div class="visual-note">
          后进先出 (LIFO) | 应用：撤销操作、函数调用
        </div>
      </div>

      <!-- 队列 -->
      <div v-if="activeStructure === 'queue'" class="queue-visual">
        <div class="queue-container">
          <div class="queue-front">队首 →</div>
          <div class="queue-items">
            <div
              v-for="(item, index) in queueData"
              :key="index"
              class="queue-item"
            >
              {{ item }}
            </div>
          </div>
          <div class="queue-rear">→ 队尾</div>
        </div>
        <div class="queue-operations">
          <button class="op-btn" @click="enqueue">
            入队 (ENQUEUE)
          </button>
          <button class="op-btn" @click="dequeue">
            出队 (DEQUEUE)
          </button>
        </div>
        <div class="visual-note">
          先进先出 (FIFO) | 应用：任务队列、打印队列
        </div>
      </div>
    </div>

    <!-- 对比表格 -->
    <div class="comparison-table">
      <div class="table-title">操作对比</div>
      <table>
        <thead>
          <tr>
            <th>数据结构</th>
            <th>访问</th>
            <th>插入</th>
            <th>删除</th>
            <th>特点</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="struct in structures"
            :key="struct.id"
            :class="{ highlighted: struct.id === activeStructure }"
          >
            <td>{{ struct.icon }} {{ struct.name }}</td>
            <td>{{ struct.access }}</td>
            <td>{{ struct.insert }}</td>
            <td>{{ struct.delete }}</td>
            <td>{{ struct.feature }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 应用场景 -->
    <div class="applications">
      <div class="app-title">实际应用场景</div>
      <div class="app-list">
        <div
          v-for="(app, index) in currentStructure.applications"
          :key="index"
          class="app-card"
        >
          <div class="app-icon">{{ app.icon }}</div>
          <div class="app-content">
            <div class="app-name">{{ app.name }}</div>
            <div class="app-desc">{{ app.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStructure = ref('array')

const structures = [
  {
    id: 'array',
    name: '数组',
    icon: '📊',
    tagline: '连续内存，编号访问',
    access: 'O(1) 快',
    insert: 'O(n) 慢',
    delete: 'O(n) 慢',
    feature: '大小固定',
    applications: [
      { icon: '📋', name: '列表数据', desc: '学生成绩、商品价格列表' },
      { icon: '🖼️', name: '图像处理', desc: '像素矩阵存储' },
      { icon: '📈', name: '统计图表', desc: '按时间顺序的数据' }
    ]
  },
  {
    id: 'linkedlist',
    name: '链表',
    icon: '🔗',
    tagline: '指针链接，灵活增删',
    access: 'O(n) 慢',
    insert: 'O(1) 快',
    delete: 'O(1) 快',
    feature: '大小可变',
    applications: [
      { icon: '↩️', name: '撤销功能', desc: '操作历史记录' },
      { icon: '🎵', name: '音乐播放', desc: '播放列表' },
      { icon: '📝', name: '文本编辑', desc: '文档内容的动态存储' }
    ]
  },
  {
    id: 'stack',
    name: '栈',
    icon: '🥞',
    tagline: '后进先出',
    access: 'O(n)',
    insert: 'O(1) 快',
    delete: 'O(1) 快',
    feature: '一端操作',
    applications: [
      { icon: '↩️', name: '撤销操作', desc: '编辑器的撤销功能' },
      { icon: '🔙', name: '浏览器历史', desc: '后退按钮实现' },
      { icon: '📞', name: '函数调用', desc: '程序调用栈管理' }
    ]
  },
  {
    id: 'queue',
    name: '队列',
    icon: '🚶',
    tagline: '先进先出',
    access: 'O(n)',
    insert: 'O(1) 快',
    delete: 'O(1) 快',
    feature: '两端操作',
    applications: [
      { icon: '🖨️', name: '打印队列', desc: '文档按顺序打印' },
      { icon: '🎫', name: '任务调度', desc: '操作系统进程调度' },
      { icon: '💬', name: '消息队列', desc: '异步任务处理' }
    ]
  }
]

const arrayData = ref([10, 25, 33, 47, 59, 62])
const linkedListData = ref(['A', 'B', 'C', 'D', 'E'])
const stackData = ref(['书5', '书4', '书3', '书2', '书1'])
const queueData = ref(['人1', '人2', '人3', '人4'])

const currentStructure = computed(() => structures.find(s => s.id === activeStructure.value))

const pushStack = () => {
  const newItem = `书${stackData.value.length + 1}`
  stackData.value.unshift(newItem)
}

const popStack = () => {
  if (stackData.value.length > 0) {
    stackData.value.shift()
  }
}

const enqueue = () => {
  const newItem = `人${queueData.value.length + 1}`
  queueData.value.push(newItem)
}

const dequeue = () => {
  if (queueData.value.length > 0) {
    queueData.value.shift()
  }
}
</script>

<style scoped>
.linear-structures-demo {
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

.structure-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.75rem 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.structure-visual {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.visual-header {
  text-align: center;
  margin-bottom: 2rem;
}

.structure-title {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.structure-tagline {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.memory-block {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.array-cell {
  width: 70px;
  text-align: center;
}

.cell-index {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.cell-value {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
}

.nodes-chain {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.linked-node {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.node-data {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  font-weight: 600;
  font-size: 1rem;
}

.node-pointer {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.linked-node.null .node-data {
  background: var(--vp-c-divider);
  border-color: var(--vp-c-text-2);
}

.stack-container,
.queue-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stack-top,
.queue-front {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.stack-items,
.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 150px;
}

.stack-item,
.queue-item {
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.queue-items {
  flex-direction: row;
}

.queue-item {
  width: 80px;
}

.stack-bottom,
.queue-rear {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stack-operations,
.queue-operations {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.op-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.op-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.visual-note {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.comparison-table {
  margin-bottom: 2rem;
}

.table-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

tr.highlighted {
  background: var(--vp-c-brand-soft);
}

.applications {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.app-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.app-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.app-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.app-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.app-content {
  flex: 1;
}

.app-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.app-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
