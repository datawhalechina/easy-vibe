<template>
  <div class="sorting-algorithm-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">排序算法</span>
      <span class="subtitle">把数据按顺序排列</span>
    </div>

    <div class="visual-array">
      <div
        v-for="(item, index) in array"
        :key="index"
        class="array-bar"
        :class="{ 
          comparing: comparingIndices.includes(index),
          swapping: swappingIndices.includes(index),
          sorted: index < sortedCount
        }"
        :style="{ height: item * 3 + 'px' }"
      >
        {{ item }}
      </div>
    </div>

    <div class="controls">
      <button @click="generateArray" class="control-btn">生成新数组</button>
      <button @click="startBubbleSort" class="control-btn">冒泡排序</button>
      <button @click="startQuickSort" class="control-btn">快速排序</button>
    </div>

    <div class="algorithm-info">
      <div class="info-title">{{ currentAlgo }}</div>
      <div class="info-desc">{{ currentAlgoDesc }}</div>
      <div class="info-complexity">时间复杂度：{{ complexity }}</div>
    </div>

    <div class="comparison">
      <div class="comparison-title">算法对比</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>算法</th>
            <th>平均时间</th>
            <th>最坏时间</th>
            <th>空间</th>
            <th>稳定</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>冒泡排序</td>
            <td>O(n²)</td>
            <td>O(n²)</td>
            <td>O(1)</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>快速排序</td>
            <td>O(n log n)</td>
            <td>O(n²)</td>
            <td>O(log n)</td>
            <td>✗</td>
          </tr>
          <tr>
            <td>归并排序</td>
            <td>O(n log n)</td>
            <td>O(n log n)</td>
            <td>O(n)</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>插入排序</td>
            <td>O(n²)</td>
            <td>O(n²)</td>
            <td>O(1)</td>
            <td>✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const array = ref([50, 30, 70, 40, 90, 20, 60, 80, 10, 55])
const comparingIndices = ref([])
const swappingIndices = ref([])
const sortedCount = ref(0)
const currentAlgo = ref('请选择排序算法')
const currentAlgoDesc = ref('选择一个排序算法开始演示')
const complexity = ref('')

const generateArray = () => {
  array.value = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10)
  sortedCount.value = 0
  comparingIndices.value = []
  swappingIndices.value = []
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const startBubbleSort = async () => {
  currentAlgo.value = '冒泡排序'
  currentAlgoDesc.value = '重复遍历数组，比较相邻元素并交换'
  complexity.value = 'O(n²)'
  
  sortedCount.value = 0
  const arr = [...array.value]
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      comparingIndices.value = [j, j + 1]
      await sleep(300)
      
      if (arr[j] > arr[j + 1]) {
        swappingIndices.value = [j, j + 1]
        await sleep(300)
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        array.value = [...arr]
        await sleep(300)
        swappingIndices.value = []
      }
    }
    sortedCount.value++
  }
  
  comparingIndices.value = []
  sortedCount.value = arr.length
}

const startQuickSort = async () => {
  currentAlgo.value = '快速排序'
  currentAlgoDesc.value = '选择基准，将数组分成小于和大于基准的两部分'
  complexity.value = 'O(n log n)'
  
  sortedCount.value = 0
  const arr = [...array.value]
  
  await quickSort(arr, 0, arr.length - 1)
  array.value = arr
  sortedCount.value = arr.length
  comparingIndices.value = []
}

const quickSort = async (arr, low, high) => {
  if (low < high) {
    const pi = await partition(arr, low, high)
    await quickSort(arr, low, pi - 1)
    await quickSort(arr, pi + 1, high)
  }
}

const partition = async (arr, low, high) => {
  const pivot = arr[high]
  let i = low - 1
  
  for (let j = low; j < high; j++) {
    comparingIndices.value = [j, high]
    await sleep(300)
    
    if (arr[j] < pivot) {
      i++
      swappingIndices.value = [i, j]
      await sleep(300)
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      array.value = [...arr]
      await sleep(300)
    }
  }
  
  swappingIndices.value = [i + 1, high]
  await sleep(300)
  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  array.value = [...arr]
  await sleep(300)
  swappingIndices.value = []
  
  return i + 1
}
</script>

<style scoped>
.sorting-algorithm-demo {
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

.visual-array {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
  height: 300px;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.array-bar {
  flex: 1;
  max-width: 50px;
  background: var(--vp-c-brand);
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  transition: all 0.3s;
}

.array-bar.comparing {
  background: #f59e0b;
}

.array-bar.swapping {
  background: #ef4444;
}

.array-bar.sorted {
  background: #10b981;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.control-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  transform: translateY(-2px);
}

.algorithm-info {
  text-align: center;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.info-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.info-desc {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.info-complexity {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  font-weight: 600;
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
  text-align: center;
  font-size: 0.85rem;
}
</style>
