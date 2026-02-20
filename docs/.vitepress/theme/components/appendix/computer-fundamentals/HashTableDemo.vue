<template>
  <div class="hash-table-demo">
    <div class="demo-header">
      <span class="icon">🗂️</span>
      <span class="title">哈希表：超快的查找</span>
      <span class="subtitle">通过关键词直接找到数据</span>
    </div>

    <div class="analogy-box">
      <div class="analogy-icon">📚</div>
      <div class="analogy-text">
        哈希表就像图书馆的<strong>索引卡片</strong>：不用在一排排书架上找，直接查索引就能找到书的位置
      </div>
    </div>

    <div class="hash-visual">
      <div class="input-section">
        <div class="section-title">存储数据</div>
        <div class="input-group">
          <input
            v-model="newKey"
            type="text"
            placeholder="键 (如: apple)"
            class="hash-input"
          />
          <input
            v-model="newValue"
            type="text"
            placeholder="值 (如: 苹果)"
            class="hash-input"
          />
          <button @click="addData" class="add-btn">
            添加
          </button>
        </div>
      </div>

      <div class="hash-process">
        <div class="process-title">哈希过程</div>
        <div class="process-diagram">
          <div class="process-step">
            <div class="step-label">输入键</div>
            <div class="step-box">{{ exampleKey }}</div>
          </div>
          <div class="process-arrow">↓</div>
          <div class="process-step">
            <div class="step-label">哈希函数</div>
            <div class="step-box func">hash(key) % 10</div>
          </div>
          <div class="process-arrow">↓</div>
          <div class="process-step">
            <div class="step-label">数组索引</div>
            <div class="step-box index">{{ exampleIndex }}</div>
          </div>
        </div>
      </div>

      <div class="hash-table-display">
        <div class="section-title">哈希表</div>
        <div class="table-slots">
          <div
            v-for="(slot, index) in hashTable"
            :key="index"
            :class="['table-slot', { occupied: slot !== null, highlighted: index === exampleIndex }]"
          >
            <div class="slot-index">{{ index }}</div>
            <div class="slot-value">{{ slot || '空' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="performance-comparison">
      <div class="comparison-title">性能对比</div>
      <div class="comparison-grid">
        <div class="comparison-item">
          <div class="item-label">哈希表查找</div>
          <div class="item-value excellent">O(1)</div>
          <div class="item-desc">瞬间找到</div>
        </div>
        <div class="comparison-item">
          <div class="item-label">数组查找</div>
          <div class="item-value good">O(n)</div>
          <div class="item-desc">需要遍历</div>
        </div>
        <div class="comparison-item">
          <div class="item-label">二分查找</div>
          <div class="item-value better">O(log n)</div>
          <div class="item-desc">需要排序</div>
        </div>
      </div>
    </div>

    <div class="applications">
      <div class="app-title">常见应用</div>
      <div class="app-list">
        <div class="app-item">
          <span class="app-icon">👤</span>
          <div class="app-text">用户信息表（用户ID → 用户资料）</div>
        </div>
        <div class="app-item">
          <span class="app-icon">🛒</span>
          <div class="app-text">购物车（商品ID → 数量）</div>
        </div>
        <div class="app-item">
          <span class="app-icon">📝</span>
          <div class="app-text">缓存系统（URL → 网页内容）</div>
        </div>
        <div class="app-item">
          <span class="app-icon">🔍</span>
          <div class="app-text">字典（单词 → 释义）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newKey = ref('')
const newValue = ref('')
const exampleKey = ref('apple')

const hashTable = ref([null, null, null, null, null, null, null, null, null, null])

// 初始化一些数据
const initData = () => {
  const data = [
    { key: 'apple', value: '苹果' },
    { key: 'banana', value: '香蕉' },
    { key: 'orange', value: '橙子' }
  ]
  data.forEach(item => {
    const index = simpleHash(item.key)
    hashTable.value[index] = `${item.key}: ${item.value}`
  })
}

const simpleHash = (key) => {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i)
  }
  return hash % 10
}

const exampleIndex = computed(() => simpleHash(exampleKey.value))

const addData = () => {
  if (newKey.value && newValue.value) {
    const index = simpleHash(newKey.value)
    hashTable.value[index] = `${newKey.value}: ${newValue.value}`
    newKey.value = ''
    newValue.value = ''
  }
}

initData()
</script>

<style scoped>
.hash-table-demo {
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
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  margin-bottom: 2rem;
}

.analogy-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.analogy-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.hash-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hash-visual {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hash-input {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
}

.add-btn {
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn:hover {
  transform: translateY(-2px);
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.process-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.process-step {
  text-align: center;
}

.step-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.step-box {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
}

.step-box.func {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-box.index {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.process-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.hash-table-display {
  grid-column: 1 / -1;
}

.table-slots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
}

.table-slot {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
}

.table-slot.occupied {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.table-slot.highlighted {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.slot-index {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.slot-value {
  font-size: 0.85rem;
  font-weight: 600;
}

.performance-comparison {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.comparison-item {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.item-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.item-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.item-value.excellent {
  color: #10b981;
}

.item-value.good {
  color: var(--vp-c-brand);
}

.item-value.better {
  color: #f59e0b;
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
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
  gap: 0.75rem;
}

.app-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.app-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.app-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}
</style>
