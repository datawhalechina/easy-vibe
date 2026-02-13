<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref(55)
const isSearching = ref(false)
const scanCurrentIndex = ref(-1)
const treeActiveNodes = ref([])
const searchResult = ref(null)
const mode = ref('scan') // 'scan' or 'index'

const DATA_SIZE = 64
const data = Array.from({ length: DATA_SIZE }, (_, i) => ({
  id: i + 1,
  value: `Data-${i + 1}`
}))

// Simplified Tree Search Simulation (Binary Search steps)
const startSearch = async () => {
  if (isSearching.value) return
  isSearching.value = true
  scanCurrentIndex.value = -1
  treeActiveNodes.value = []
  searchResult.value = null

  const target = Number(searchQuery.value)

  if (mode.value === 'scan') {
    for (let i = 0; i < data.length; i++) {
      scanCurrentIndex.value = i
      await new Promise((r) => setTimeout(r, 30)) // 30ms per step
      if (data[i].id === target) {
        searchResult.value = data[i]
        break
      }
    }
  } else {
    // Tree Search Simulation (Binary Search steps)
    let start = 0
    let end = data.length - 1

    while (start <= end) {
      let mid = Math.floor((start + end) / 2)
      treeActiveNodes.value.push(mid) // Highlight the "node" we are checking
      await new Promise((r) => setTimeout(r, 400)) // Slower steps for tree to be visible

      if (data[mid].id === target) {
        searchResult.value = data[mid]
        break
      } else if (data[mid].id < target) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }

  isSearching.value = false
}
</script>

<template>
  <div class="db-index-demo">
    <div class="demo-header">
      <span class="icon">🔍</span>
      <span class="title">索引查找演示</span>
      <span class="subtitle">全表扫描 vs 索引查找</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">图书馆</span>找一本叫"数据库原理"的书。如果没有目录，你得一排排书架找；有了索书号，直接去对应区域拿。数据库索引就像这个<span class="highlight">索书号</span>，让查找速度从"翻遍所有书"变成"直接定位"。
    </div>

    <div class="controls-area">
      <div class="input-group">
        <label>查找 ID:</label>
        <el-input-number
          v-model="searchQuery"
          :min="1"
          :max="DATA_SIZE"
          size="small"
          :disabled="isSearching"
        />
      </div>

      <div class="mode-selector">
        <button
          class="mode-btn"
          :class="{ active: mode === 'scan' }"
          @click="mode = 'scan'"
          :disabled="isSearching"
        >
          🐢 全表扫描 O(n)
        </button>
        <button
          class="mode-btn"
          :class="{ active: mode === 'index' }"
          @click="mode = 'index'"
          :disabled="isSearching"
        >
          ⚡ 索引查找 O(log n)
        </button>
      </div>

      <button
        class="search-btn"
        @click="startSearch"
        :disabled="isSearching"
      >
        {{ isSearching ? '查找中...' : '开始查找' }}
      </button>
    </div>

    <div class="visualization-area">
      <!-- Full Scan Visualization -->
      <div v-if="mode === 'scan'" class="view-container scan-view">
        <div class="grid">
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="data-block"
            :class="{
              active: index === scanCurrentIndex,
              found: searchResult && searchResult.id === item.id,
              dimmed: scanCurrentIndex >= 0 && index > scanCurrentIndex
            }"
          >
            {{ item.id }}
          </div>
        </div>
        <p class="view-desc">
          全表扫描：数据库像<span class="highlight">逐个翻书架</span>一样，必须逐行检查数据，直到找到匹配项。数据越多，速度越慢。
        </p>
      </div>

      <!-- Index Visualization -->
      <div v-else class="view-container index-view">
        <div class="grid">
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="data-block tree-node"
            :class="{
              visited: treeActiveNodes.includes(index),
              found: searchResult && searchResult.id === item.id,
              dimmed: treeActiveNodes.length > 0 && !treeActiveNodes.includes(index)
            }"
          >
            {{ item.id }}
          </div>
        </div>
        <p class="view-desc">
          索引查找：类似<span class="highlight">查字典</span>，通过二分查找或 B+ 树，每次比较都能排除掉一半（或更多）的数据，极快地定位目标。
        </p>
      </div>
    </div>

    <div class="stats-box" v-if="!isSearching && searchResult">
      <div class="stat-item">
        <span class="stat-icon">🎯</span>
        <div class="stat-content">
          <div class="stat-label">查找结果</div>
          <div class="stat-value">{{ searchResult.value }}</div>
        </div>
      </div>
      <div class="stat-item">
        <span class="stat-icon">{{ mode === 'scan' ? '🐢' : '⚡' }}</span>
        <div class="stat-content">
          <div class="stat-label">操作次数</div>
          <div class="stat-value" :class="mode">
            {{ mode === 'scan' ? scanCurrentIndex + 1 : treeActiveNodes.length }} 次
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>索引是用<span class="highlight">空间换时间</span>的经典案例。虽然需要额外空间存储索引结构，但能让查询速度提升成千上万倍。就像图书馆的目录卡片，虽占位置，但找书快太多了。
    </div>
  </div>
</template>

<style scoped>
.db-index-demo {
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

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.controls-area {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.mode-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.mode-btn {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.mode-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.mode-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.visualization-area {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.view-container {
  max-height: 300px;
  overflow-y: auto;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.data-block {
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
  border: 1px solid var(--vp-c-divider);
}

.data-block.active {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  border-color: var(--vp-c-brand);
  z-index: 1;
}

.data-block.found {
  background: #22c55e;
  color: white;
  transform: scale(1.2);
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.5);
  border-color: #22c55e;
  z-index: 2;
  font-weight: bold;
}

.data-block.dimmed {
  opacity: 0.2;
  filter: grayscale(100%);
}

.tree-node.visited {
  background: #f59e0b;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
  z-index: 1;
}

.view-desc {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.view-desc .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.stats-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat-item {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-value.scan {
  color: #ef4444;
}

.stat-value:not(.scan) {
  color: #22c55e;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
