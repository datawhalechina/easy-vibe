<template>
  <div class="search-algorithm-demo">
    <div class="demo-header">
      <span class="icon">🔍</span>
      <span class="title">查找算法</span>
      <span class="subtitle">如何在数据中找到目标</span>
    </div>

    <div class="algorithm-selector">
      <button
        :class="['algo-btn', { active: activeAlgo === 'linear' }]"
        @click="activeAlgo = 'linear'"
      >
        顺序查找
      </button>
      <button
        :class="['algo-btn', { active: activeAlgo === 'binary' }]"
        @click="activeAlgo = 'binary'"
      >
        二分查找
      </button>
    </div>

    <!-- 顺序查找 -->
    <div v-if="activeAlgo === 'linear'" class="algo-content">
      <div class="content-title">顺序查找：一个一个找</div>
      <div class="linear-demo">
        <div class="search-array">
          <div
            v-for="(num, index) in numbers"
            :key="index"
            :class="['array-cell', { found: index === foundIndex, searching: index <= searchStep && searching }]"
          >
            {{ num }}
          </div>
        </div>
        <div class="search-controls">
          <button @click="startLinearSearch" class="search-btn">开始查找</button>
          <button @click="reset" class="reset-btn">重置</button>
        </div>
        <div class="search-info">
          目标数字：<input v-model="targetNumber" type="number" class="target-input" />
        </div>
      </div>
      <div class="algo-stats">
        <div class="stat-item">时间复杂度：O(n)</div>
        <div class="stat-item">适用：无序数组</div>
      </div>
    </div>

    <!-- 二分查找 -->
    <div v-if="activeAlgo === 'binary'" class="algo-content">
      <div class="content-title">二分查找：每次排除一半</div>
      <div class="binary-demo">
        <div class="sorted-array">
          <div
            v-for="(num, index) in sortedNumbers"
            :key="index"
            :class="['array-cell', {
              found: index === binaryFoundIndex,
              left: index >= binaryLeft && index <= binaryRight,
              eliminated: index < binaryLeft || index > binaryRight
            }]"
          >
            {{ num }}
          </div>
        </div>
        <div class="binary-info">
          <div class="info-step">查找范围：[{{ binaryLeft }}, {{ binaryRight }}]</div>
          <div class="info-mid">中间位置：{{ binaryMid }}</div>
          <div class="info-comparison">{{ sortedNumbers[binaryMid] }} vs {{ binaryTarget }}</div>
        </div>
        <div class="search-controls">
          <button @click="binaryStep" class="search-btn">下一步</button>
          <button @click="resetBinary" class="reset-btn">重置</button>
        </div>
      </div>
      <div class="algo-stats">
        <div class="stat-item">时间复杂度：O(log n)</div>
        <div class="stat-item">适用：有序数组</div>
      </div>
    </div>

    <!-- 对比 -->
    <div class="comparison">
      <div class="comparison-title">性能对比</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>数据量</th>
            <th>顺序查找</th>
            <th>二分查找</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in [10, 100, 1000, 10000]" :key="n">
            <td>{{ n }}</td>
            <td>最多 {{ n }} 次</td>
            <td>最多 {{ Math.ceil(Math.log2(n)) }} 次</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeAlgo = ref('linear')
const targetNumber = ref(7)
const foundIndex = ref(-1)
const searchStep = ref(-1)
const searching = ref(false)

const numbers = ref([3, 7, 2, 9, 5, 1, 8, 4, 6, 10])

const sortedNumbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const binaryTarget = ref(7)
const binaryLeft = ref(0)
const binaryRight = ref(9)
const binaryMid = ref(4)
const binaryFoundIndex = ref(-1)

const startLinearSearch = () => {
  searching.value = true
  searchStep.value = -1
  foundIndex.value = -1
  
  let step = 0
  const interval = setInterval(() => {
    if (step < numbers.value.length) {
      searchStep.value = step
      if (numbers.value[step] === targetNumber.value) {
        foundIndex.value = step
        searching.value = false
        clearInterval(interval)
      }
      step++
    } else {
      searching.value = false
      clearInterval(interval)
    }
  }, 500)
}

const reset = () => {
  searchStep.value = -1
  foundIndex.value = -1
  searching.value = false
}

const binaryStep = () => {
  binaryMid.value = Math.floor((binaryLeft.value + binaryRight.value) / 2)
  
  if (sortedNumbers.value[binaryMid.value] === binaryTarget.value) {
    binaryFoundIndex.value = binaryMid.value
  } else if (sortedNumbers.value[binaryMid.value] < binaryTarget.value) {
    binaryLeft.value = binaryMid.value + 1
  } else {
    binaryRight.value = binaryMid.value - 1
  }
}

const resetBinary = () => {
  binaryLeft.value = 0
  binaryRight.value = 9
  binaryMid.value = 4
  binaryFoundIndex.value = -1
}
</script>

<style scoped>
.search-algorithm-demo {
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

.algorithm-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.algo-btn {
  flex: 1;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.algo-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.algo-content {
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

.search-array,
.sorted-array {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.array-cell {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
}

.array-cell.searching {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.array-cell.found {
  border-color: #10b981;
  background: #10b981;
  color: white;
}

.array-cell.left {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.array-cell.eliminated {
  opacity: 0.3;
}

.search-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.search-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.reset-btn {
  padding: 0.6rem 1.25rem;
  background: var(--vp-c-divider);
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.search-info {
  text-align: center;
  margin-bottom: 1rem;
}

.target-input {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.binary-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.info-step,
.info-mid,
.info-comparison {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.algo-stats {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.comparison {
  margin-top: 2rem;
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
