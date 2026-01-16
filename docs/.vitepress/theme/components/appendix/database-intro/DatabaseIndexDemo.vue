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
  <div class="db-demo">
    <div class="controls">
      <div class="control-item">
        <span>查找 ID: </span>
        <el-input-number
          v-model="searchQuery"
          :min="1"
          :max="DATA_SIZE"
          size="small"
        />
      </div>
      <el-radio-group v-model="mode" size="small">
        <el-radio-button label="scan">全表扫描 (O(n))</el-radio-button>
        <el-radio-button label="index">索引查找 (O(log n))</el-radio-button>
      </el-radio-group>
      <el-button
        type="primary"
        @click="startSearch"
        :loading="isSearching"
        size="small"
        >开始查询</el-button
      >
    </div>

    <div class="visualization-area">
      <!-- Full Scan Visualization -->
      <div v-if="mode === 'scan'" class="view-container">
        <div class="grid">
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="data-block"
            :class="{
              active: index === scanCurrentIndex,
              found: searchResult && searchResult.id === item.id
            }"
          >
            {{ item.id }}
          </div>
        </div>
        <p class="desc">
          全表扫描：数据库必须逐行检查数据，直到找到匹配项。数据越多，速度越慢。
        </p>
      </div>

      <!-- Index Visualization -->
      <div v-else class="view-container">
        <div class="grid">
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="data-block tree-node"
            :class="{
              visited: treeActiveNodes.includes(index),
              found: searchResult && searchResult.id === item.id,
              dimmed:
                treeActiveNodes.length > 0 && !treeActiveNodes.includes(index)
            }"
          >
            {{ item.id }}
          </div>
        </div>
        <p class="desc">
          索引查找：类似二分查找或 B+
          树，每次比较都能排除掉一半（或更多）的数据，极快地定位目标。
        </p>
      </div>
    </div>

    <div class="stats" v-if="!isSearching && searchResult">
      <div class="stat-item">
        <span class="label">查找结果:</span>
        <span class="value">{{ searchResult.value }}</span>
      </div>
      <div class="stat-item">
        <span class="label">操作次数:</span>
        <span class="value highlight"
          >{{
            mode === 'scan' ? scanCurrentIndex + 1 : treeActiveNodes.length
          }}
          次</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.db-demo {
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #ffffff;
  font-family: sans-serif;
}
.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.view-container {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 15px;
}
.data-block {
  width: 32px;
  height: 32px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 4px;
  color: #606266;
  transition: all 0.3s;
  border: 1px solid transparent;
}
.data-block.active {
  background: #409eff;
  color: white;
  transform: scale(1.15);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-color: #409eff;
  z-index: 1;
}
.data-block.found {
  background: #67c23a;
  color: white;
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(103, 194, 58, 0.5);
  border-color: #67c23a;
  z-index: 2;
  font-weight: bold;
}

.tree-node.visited {
  background: #e6a23c;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(230, 162, 60, 0.4);
  z-index: 1;
}
.tree-node.dimmed {
  opacity: 0.2;
  filter: grayscale(100%);
}

.desc {
  font-size: 14px;
  color: #909399;
  text-align: center;
  margin-top: 10px;
  max-width: 600px;
}

.stats {
  margin-top: 20px;
  padding: 15px;
  background: #fdf6ec;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.label {
  font-size: 12px;
  color: #909399;
}
.value {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}
.value.highlight {
  color: #e6a23c;
  font-size: 20px;
}
</style>
