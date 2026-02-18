<template>
  <div class="algorithm-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">算法思维：解决问题的方法</span>
      <span class="subtitle">不同策略解决不同类型的问题</span>
    </div>

    <div class="demo-content">
      <div class="algorithm-tabs">
        <button 
          v-for="algo in algorithms" 
          :key="algo.name"
          :class="['tab-btn', { active: activeAlgo === algo.name }]"
          @click="activeAlgo = algo.name"
        >
          {{ algo.name }}
        </button>
      </div>

      <div class="algorithm-visual">
        <div class="visual-header">
          <span class="algo-name">{{ currentAlgo.name }}</span>
          <span class="algo-desc">{{ currentAlgo.desc }}</span>
        </div>

        <div class="visual-content">
          <div
            v-if="activeAlgo === '二分查找'"
            class="binary-search"
          >
            <div class="search-input">
              <span>在有序数组中查找：</span>
              <input
                v-model.number="searchTarget"
                type="number"
                class="num-input"
                placeholder="输入数字"
              >
              <button
                class="search-btn"
                @click="runBinarySearch"
              >
                查找
              </button>
            </div>
            <div class="array-display">
              <div 
                v-for="(num, i) in sortedArray" 
                :key="i"
                class="array-cell"
                :class="{ 
                  highlight: i >= searchRange.left && i <= searchRange.right,
                  found: i === foundIndex,
                  mid: i === midIndex
                }"
              >
                {{ num }}
              </div>
            </div>
            <div
              v-if="searchSteps.length"
              class="search-info"
            >
              <div
                v-for="(step, i) in searchSteps"
                :key="i"
                class="step"
              >
                {{ step }}
              </div>
            </div>
          </div>

          <div
            v-else-if="activeAlgo === '排序'"
            class="sorting"
          >
            <div class="sort-controls">
              <button
                class="sort-btn"
                @click="resetArray"
              >
                重置数组
              </button>
              <button
                class="sort-btn"
                @click="runSort"
              >
                开始排序
              </button>
            </div>
            <div class="array-display">
              <div 
                v-for="(num, i) in sortArray" 
                :key="i"
                class="array-cell"
                :class="{ comparing: comparingIndices.includes(i), sorted: sortedIndices.includes(i) }"
              >
                {{ num }}
              </div>
            </div>
            <div class="sort-info">
              {{ sortStatus }}
            </div>
          </div>

          <div
            v-else-if="activeAlgo === '递归'"
            class="recursion"
          >
            <div class="recursion-input">
              <span>计算斐波那契数列第</span>
              <input
                v-model.number="fibN"
                type="number"
                min="1"
                max="15"
                class="num-input"
              >
              <span>项</span>
              <button
                class="calc-btn"
                @click="calcFib"
              >
                计算
              </button>
            </div>
            <div
              v-if="fibResult !== null"
              class="fib-result"
            >
              <span class="result-value">F({{ fibN }}) = {{ fibResult }}</span>
            </div>
            <div
              v-if="fibSteps.length"
              class="recursion-tree"
            >
              <div class="tree-title">
                递归调用过程
              </div>
              <div class="tree-content">
                <div
                  v-for="(step, i) in fibSteps.slice(0, 8)"
                  :key="i"
                  class="tree-node"
                >
                  {{ step }}
                </div>
                <div
                  v-if="fibSteps.length > 8"
                  class="tree-more"
                >
                  ... 共 {{ fibSteps.length }} 次调用
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="activeAlgo === '贪心'"
            class="greedy"
          >
            <div class="greedy-desc">
              硬币找零问题：用最少的硬币凑出指定金额
            </div>
            <div class="greedy-input">
              <span>目标金额：</span>
              <input
                v-model.number="coinTarget"
                type="number"
                min="1"
                class="num-input"
              >
              <button
                class="calc-btn"
                @click="calcCoins"
              >
                计算
              </button>
            </div>
            <div class="coins-available">
              可用硬币：{{ coins.join(', ') }} 元
            </div>
            <div
              v-if="coinResult.length"
              class="coin-result"
            >
              <div class="result-title">
                找零方案：
              </div>
              <div class="coin-list">
                <span
                  v-for="(c, i) in coinResult"
                  :key="i"
                  class="coin"
                >{{ c }}元</span>
              </div>
              <div class="result-summary">
                共 {{ coinResult.length }} 枚硬币
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="complexity-info">
        <div class="info-title">
          时间复杂度速查
        </div>
        <div class="complexity-list">
          <div
            v-for="c in complexities"
            :key="c.name"
            class="complexity-item"
          >
            <span class="c-name">{{ c.name }}</span>
            <span
              class="c-value"
              :class="c.class"
            >{{ c.value }}</span>
            <span class="c-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>算法是解决问题的方法。好的算法能让程序效率提升几个数量级。理解算法思维，比记住具体算法更重要。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const activeAlgo = ref('二分查找')

const algorithms = [
  { name: '二分查找', desc: '每次排除一半，O(log n)' },
  { name: '排序', desc: '将无序变有序' },
  { name: '递归', desc: '自己调用自己' },
  { name: '贪心', desc: '每步选最优' }
]

const currentAlgo = computed(() => {
  return algorithms.find(a => a.name === activeAlgo.value)
})

const sortedArray = ref([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25])
const searchTarget = ref(13)
const searchRange = reactive({ left: 0, right: 12 })
const foundIndex = ref(-1)
const midIndex = ref(-1)
const searchSteps = ref([])

const runBinarySearch = () => {
  searchSteps.value = []
  foundIndex.value = -1
  midIndex.value = -1
  let left = 0
  let right = sortedArray.value.length - 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    midIndex.value = mid
    searchRange.left = left
    searchRange.right = right
    
    searchSteps.value.push(`查找范围 [${left}, ${right}]，中间位置 ${mid}，值 ${sortedArray.value[mid]}`)
    
    if (sortedArray.value[mid] === searchTarget.value) {
      foundIndex.value = mid
      searchSteps.value.push(`找到目标 ${searchTarget.value} 在位置 ${mid}`)
      return
    } else if (sortedArray.value[mid] < searchTarget.value) {
      left = mid + 1
      searchSteps.value.push(`${sortedArray.value[mid]} < ${searchTarget.value}，在右半部分继续查找`)
    } else {
      right = mid - 1
      searchSteps.value.push(`${sortedArray.value[mid]} > ${searchTarget.value}，在左半部分继续查找`)
    }
  }
  searchSteps.value.push(`未找到目标 ${searchTarget.value}`)
}

const sortArray = ref([64, 34, 25, 12, 22, 11, 90, 45])
const comparingIndices = ref([])
const sortedIndices = ref([])
const sortStatus = ref('点击"开始排序"观察冒泡排序过程')

const resetArray = () => {
  sortArray.value = [64, 34, 25, 12, 22, 11, 90, 45]
  comparingIndices.value = []
  sortedIndices.value = []
  sortStatus.value = '数组已重置'
}

const runSort = async () => {
  sortedIndices.value = []
  const arr = [...sortArray.value]
  const n = arr.length
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparingIndices.value = [j, j + 1]
      sortStatus.value = `比较 ${arr[j]} 和 ${arr[j + 1]}`
      await new Promise(r => setTimeout(r, 300))
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        sortArray.value = [...arr]
        sortStatus.value = `交换 ${arr[j + 1]} 和 ${arr[j]}`
        await new Promise(r => setTimeout(r, 200))
      }
    }
    sortedIndices.value.push(n - i - 1)
  }
  sortedIndices.value.push(0)
  comparingIndices.value = []
  sortStatus.value = '排序完成！'
}

const fibN = ref(8)
const fibResult = ref(null)
const fibSteps = ref([])

const calcFib = () => {
  fibSteps.value = []
  const fib = (n) => {
    fibSteps.value.push(`fib(${n})`)
    if (n <= 1) return n
    return fib(n - 1) + fib(n - 2)
  }
  fibResult.value = fib(fibN.value)
}

const coinTarget = ref(67)
const coins = [100, 50, 20, 10, 5, 1]
const coinResult = ref([])

const calcCoins = () => {
  coinResult.value = []
  let remaining = coinTarget.value
  for (const coin of coins) {
    while (remaining >= coin) {
      coinResult.value.push(coin)
      remaining -= coin
    }
  }
}

const complexities = [
  { name: 'O(1)', value: '常数', desc: '最优，如数组访问', class: 'good' },
  { name: 'O(log n)', value: '对数', desc: '很好，如二分查找', class: 'good' },
  { name: 'O(n)', value: '线性', desc: '一般，如遍历', class: 'mid' },
  { name: 'O(n log n)', value: '线性对数', desc: '可接受，如快速排序', class: 'mid' },
  { name: 'O(n²)', value: '平方', desc: '较慢，如冒泡排序', class: 'bad' },
  { name: 'O(2ⁿ)', value: '指数', desc: '很慢，如暴力递归', class: 'bad' }
]
</script>

<style scoped>
.algorithm-demo {
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

.algorithm-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.algorithm-visual {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.visual-header {
  margin-bottom: 0.75rem;
}

.algo-name {
  font-weight: bold;
  font-size: 1rem;
}

.algo-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-left: 0.5rem;
}

.search-input, .greedy-input, .recursion-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.num-input {
  width: 60px;
  padding: 0.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
}

.search-btn, .sort-btn, .calc-btn {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.array-display {
  display: flex;
  gap: 2px;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.array-cell {
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.85rem;
  min-width: 32px;
  text-align: center;
}

.array-cell.highlight {
  background: var(--vp-c-brand-soft);
}

.array-cell.found {
  background: var(--vp-c-success);
  color: white;
}

.array-cell.mid {
  border: 2px solid var(--vp-c-brand);
}

.array-cell.comparing {
  background: var(--vp-c-warning-soft);
}

.array-cell.sorted {
  background: var(--vp-c-success-soft);
}

.search-info, .sort-info {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step {
  padding: 0.15rem 0;
}

.sort-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.fib-result {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.recursion-tree {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
}

.tree-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.tree-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tree-node {
  font-size: 0.75rem;
  font-family: monospace;
  background: var(--vp-c-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.tree-more {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.greedy-desc {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.coins-available {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.coin-result {
  margin-top: 0.5rem;
}

.result-title {
  font-weight: bold;
  font-size: 0.85rem;
}

.coin-list {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin: 0.25rem 0;
}

.coin {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.result-summary {
  font-size: 0.85rem;
  color: var(--vp-c-success);
  font-weight: bold;
}

.complexity-info {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.info-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.complexity-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.complexity-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.c-name {
  font-family: monospace;
  font-weight: bold;
  min-width: 60px;
}

.c-value {
  min-width: 50px;
}

.c-value.good { color: var(--vp-c-success); }
.c-value.mid { color: var(--vp-c-warning); }
.c-value.bad { color: var(--vp-c-danger); }

.c-desc {
  color: var(--vp-c-text-2);
}

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
