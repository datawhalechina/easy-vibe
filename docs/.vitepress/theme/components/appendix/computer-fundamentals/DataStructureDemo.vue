<template>
  <div class="data-structure-demo">
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">数据结构：数据的"容器"</span>
      <span class="subtitle">不同场景选择不同的存储方式</span>
    </div>

    <div class="demo-content">
      <div class="structure-tabs">
        <button 
          v-for="s in structures" 
          :key="s.name"
          :class="['tab-btn', { active: activeStructure === s.name }]"
          @click="activeStructure = s.name"
        >
          {{ s.name }}
        </button>
      </div>

      <div class="structure-visual">
        <div class="visual-header">
          <span class="structure-name">{{ currentStructure.name }}</span>
          <span class="structure-desc">{{ currentStructure.desc }}</span>
        </div>

        <div class="visual-content">
          <div
            v-if="activeStructure === '数组'"
            class="array-visual"
          >
            <div class="array-container">
              <div
                v-for="(item, i) in arrayData"
                :key="i"
                class="array-item"
              >
                <span class="index">{{ i }}</span>
                <span class="value">{{ item }}</span>
              </div>
            </div>
            <div class="operation-hint">
              访问 arr[2] = O(1)，插入/删除 = O(n)
            </div>
          </div>

          <div
            v-else-if="activeStructure === '链表'"
            class="linked-visual"
          >
            <div class="linked-container">
              <div
                v-for="(item, i) in linkedData"
                :key="i"
                class="linked-node"
              >
                <span class="node-value">{{ item.value }}</span>
                <span
                  v-if="i < linkedData.length - 1"
                  class="node-arrow"
                >→</span>
              </div>
            </div>
            <div class="operation-hint">
              访问第 n 个 = O(n)，插入/删除 = O(1)
            </div>
          </div>

          <div
            v-else-if="activeStructure === '栈'"
            class="stack-visual"
          >
            <div class="stack-container">
              <div
                v-for="(item, i) in stackData"
                :key="i"
                class="stack-item"
              >
                {{ item }}
              </div>
              <div class="stack-bottom">
                栈底
              </div>
            </div>
            <div class="stack-ops">
              <button
                class="op-btn"
                @click="pushStack"
              >
                入栈 Push
              </button>
              <button
                class="op-btn"
                @click="popStack"
              >
                出栈 Pop
              </button>
            </div>
            <div class="operation-hint">
              后进先出 (LIFO)，操作都是 O(1)
            </div>
          </div>

          <div
            v-else-if="activeStructure === '队列'"
            class="queue-visual"
          >
            <div class="queue-container">
              <span class="queue-label">出 ←</span>
              <div
                v-for="(item, i) in queueData"
                :key="i"
                class="queue-item"
              >
                {{ item }}
              </div>
              <span class="queue-label">← 入</span>
            </div>
            <div class="queue-ops">
              <button
                class="op-btn"
                @click="enqueue"
              >
                入队
              </button>
              <button
                class="op-btn"
                @click="dequeue"
              >
                出队
              </button>
            </div>
            <div class="operation-hint">
              先进先出 (FIFO)，操作都是 O(1)
            </div>
          </div>

          <div
            v-else-if="activeStructure === '哈希表'"
            class="hash-visual"
          >
            <div class="hash-container">
              <div
                v-for="(bucket, i) in hashData"
                :key="i"
                class="hash-bucket"
              >
                <span class="bucket-index">{{ i }}</span>
                <div class="bucket-items">
                  <span
                    v-for="(item, j) in bucket"
                    :key="j"
                    class="bucket-item"
                  >{{ item }}</span>
                </div>
              </div>
            </div>
            <div class="operation-hint">
              查找/插入/删除平均 O(1)，最坏 O(n)
            </div>
          </div>

          <div
            v-else-if="activeStructure === '树'"
            class="tree-visual"
          >
            <div class="tree-container">
              <div class="tree-level">
                <div class="tree-node root">
                  {{ treeData.value }}
                </div>
              </div>
              <div class="tree-level">
                <div class="tree-node">
                  {{ treeData.left?.value }}
                </div>
                <div class="tree-node">
                  {{ treeData.right?.value }}
                </div>
              </div>
              <div class="tree-level">
                <div class="tree-node leaf">
                  {{ treeData.left?.left?.value }}
                </div>
                <div class="tree-node leaf">
                  {{ treeData.left?.right?.value }}
                </div>
                <div class="tree-node leaf">
                  {{ treeData.right?.left?.value }}
                </div>
                <div class="tree-node leaf">
                  {{ treeData.right?.right?.value }}
                </div>
              </div>
            </div>
            <div class="operation-hint">
              查找/插入/删除 O(log n)，遍历 O(n)
            </div>
          </div>
        </div>
      </div>

      <div class="complexity-table">
        <div class="table-title">
          时间复杂度对比
        </div>
        <table>
          <thead>
            <tr>
              <th>操作</th>
              <th>数组</th>
              <th>链表</th>
              <th>哈希表</th>
              <th>树</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>访问</td>
              <td class="good">
                O(1)
              </td>
              <td class="bad">
                O(n)
              </td>
              <td class="good">
                O(1)
              </td>
              <td class="mid">
                O(log n)
              </td>
            </tr>
            <tr>
              <td>查找</td>
              <td class="bad">
                O(n)
              </td>
              <td class="bad">
                O(n)
              </td>
              <td class="good">
                O(1)
              </td>
              <td class="mid">
                O(log n)
              </td>
            </tr>
            <tr>
              <td>插入</td>
              <td class="bad">
                O(n)
              </td>
              <td class="good">
                O(1)
              </td>
              <td class="good">
                O(1)
              </td>
              <td class="mid">
                O(log n)
              </td>
            </tr>
            <tr>
              <td>删除</td>
              <td class="bad">
                O(n)
              </td>
              <td class="good">
                O(1)
              </td>
              <td class="good">
                O(1)
              </td>
              <td class="mid">
                O(log n)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>数据结构是数据的"容器"，不同的容器有不同的特点。选择合适的数据结构，能让程序效率提升几个数量级。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStructure = ref('数组')

const structures = [
  { name: '数组', desc: '连续内存，索引访问快' },
  { name: '链表', desc: '节点相连，插入删除快' },
  { name: '栈', desc: '后进先出，函数调用用' },
  { name: '队列', desc: '先进先出，任务调度用' },
  { name: '哈希表', desc: '键值对，查找最快' },
  { name: '树', desc: '层次结构，排序搜索' }
]

const currentStructure = computed(() => {
  return structures.find(s => s.name === activeStructure.value)
})

const arrayData = ref([10, 20, 30, 40, 50, 60, 70, 80])

const linkedData = ref([
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 }
])

const stackData = ref(['A', 'B', 'C'])
const stackCounter = ref(68)

const pushStack = () => {
  stackCounter.value++
  stackData.value.push(String.fromCharCode(stackCounter.value))
}

const popStack = () => {
  if (stackData.value.length > 0) {
    stackData.value.pop()
  }
}

const queueData = ref(['任务1', '任务2', '任务3'])
const queueCounter = ref(3)

const enqueue = () => {
  queueCounter.value++
  queueData.value.push(`任务${queueCounter.value}`)
}

const dequeue = () => {
  if (queueData.value.length > 0) {
    queueData.value.shift()
  }
}

const hashData = ref([
  ['apple', 'ant'],
  ['banana'],
  [],
  ['cat', 'car', 'cup'],
  ['dog'],
  [],
  ['egg', 'eye']
])

const treeData = ref({
  value: 50,
  left: {
    value: 30,
    left: { value: 20 },
    right: { value: 40 }
  },
  right: {
    value: 70,
    left: { value: 60 },
    right: { value: 80 }
  }
})
</script>

<style scoped>
.data-structure-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.structure-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.structure-visual {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.visual-header {
  margin-bottom: 0.75rem;
}

.structure-name {
  font-weight: bold;
  font-size: 1rem;
}

.structure-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-left: 0.5rem;
}

.visual-content {
  min-height: 120px;
}

.array-container {
  display: flex;
  gap: 2px;
}

.array-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-alt);
}

.index {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.value {
  font-weight: bold;
  font-size: 0.9rem;
}

.linked-container {
  display: flex;
  align-items: center;
  gap: 0;
}

.linked-node {
  display: flex;
  align-items: center;
}

.node-value {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
}

.node-arrow {
  margin: 0 0.25rem;
  color: var(--vp-c-brand);
}

.stack-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2px;
}

.stack-item {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
}

.stack-bottom {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
}

.stack-ops, .queue-ops {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
}

.op-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.queue-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.queue-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.queue-item {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
}

.hash-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hash-bucket {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bucket-index {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.bucket-items {
  display: flex;
  gap: 0.25rem;
}

.bucket-item {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.tree-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tree-level {
  display: flex;
  gap: 0.5rem;
}

.tree-node {
  padding: 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.tree-node.root {
  background: var(--vp-c-brand);
  color: white;
}

.tree-node.leaf {
  background: var(--vp-c-bg-alt);
}

.operation-hint {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  text-align: center;
}

.complexity-table {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.table-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

th, td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.35rem;
  text-align: center;
}

th {
  background: var(--vp-c-bg);
}

.good { color: var(--vp-c-success); font-weight: bold; }
.mid { color: var(--vp-c-warning); }
.bad { color: var(--vp-c-danger); }

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
</style>
