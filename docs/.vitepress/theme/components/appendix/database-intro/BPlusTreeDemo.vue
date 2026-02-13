<template>
  <div class="btree-demo">
    <div class="demo-header">
      <span class="icon">🌳</span>
      <span class="title">B+ 树索引演示</span>
      <span class="subtitle">理解数据库如何快速查找数据</span>
    </div>

    <div class="intro-text">
      想象你要在<span class="highlight">字典</span>里找一个字。你会先看目录，定位到首字母的区域，再在这个区域里找具体页码。B+ 树就是这样的<span class="highlight">多层目录</span>，让数据库在 10 亿条数据中 3 次就能找到目标。
    </div>

    <div class="comparison">
      <div class="compare-card scan">
        <div class="card-header">
          <span class="icon">🐢</span>
          <span class="title">全表扫描</span>
        </div>
        <div class="card-content">
          <div class="data-rows">
            <div v-for="i in 20" :key="i" class="data-row" :class="{ found: scanMode === 'found' && i === targetId }">
              <span class="row-id">{{ String(i).padStart(3, '0') }}</span>
              <span class="row-name">用户{{ i }}</span>
            </div>
          </div>
          <div class="scan-info">
            <p v-if="!scanMode">👆 点击"开始查找"看全表扫描有多慢</p>
            <p v-else-if="scanMode === 'scanning'">正在扫描... 第 {{ scanCount }} 条</p>
            <p v-else class="found">✅ 找到了！扫描了 {{ scanCount }} 条记录，耗时 {{ scanTime }}秒</p>
          </div>
          <button v-if="!scanMode" @click="startScan" class="btn">开始查找</button>
        </div>
      </div>

      <div class="compare-card index">
        <div class="card-header">
          <span class="icon">⚡</span>
          <span class="title">索引查找</span>
        </div>
        <div class="card-content">
          <div class="tree-structure">
            <div class="tree-level root">
              <div class="node-label">根节点</div>
              <div class="node">1-100</div>
            </div>
            <div class="tree-level intermediate">
              <div class="node-label">中间节点</div>
              <div class="node">1-10</div>
            </div>
            <div class="tree-level leaf">
              <div class="node-label">叶子节点</div>
              <div
                v-for="i in 10"
                :key="i"
                class="node leaf-node"
                :class="{ found: indexMode === 'found' && i === targetId }"
              >
                {{ i }}
              </div>
            </div>
          </div>
          <div class="index-info">
            <p v-if="!indexMode">👆 点击"开始查找"看索引有多快</p>
            <p v-else-if="indexMode === 'searching'">正在搜索... 第 {{ indexStep }} 步</p>
            <p v-else class="found">✅ 找到了！只用了 {{ indexSteps.length }} 步，耗时 {{ indexTime }}秒</p>
          </div>
          <button v-if="!indexMode" @click="startIndex" class="btn">开始查找</button>
        </div>
      </div>
    </div>

    <div class="stats-box">
      <div class="stat-item">
        <div class="stat-label">数据量</div>
        <div class="stat-value">100 万条</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">全表扫描</div>
        <div class="stat-value slow">平均 50 万次比较</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">B+ 树索引</div>
        <div class="stat-value fast">仅 3 次比较</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">速度提升</div>
        <div class="stat-value highlight">10 万倍+</div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心原理：</strong>B+ 树通过"矮胖"的设计，让树的高度只有 3-4 层。每层可以存储成百上千个键值，所以 10 亿数据也只需要 3 次磁盘 I/O。这就是数据库查询飞快的秘密。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const targetId = ref(7)
const scanMode = ref(null)
const scanCount = ref(0)
const scanTime = ref(0)
const indexMode = ref(null)
const indexStep = ref(0)
const indexSteps = ref([])
const indexTime = ref(0)

const startScan = () => {
  scanMode.value = 'scanning'
  scanCount.value = 0
  let count = 0

  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 3) + 1
    scanCount.value = count

    if (count >= targetId.value) {
      clearInterval(interval)
      scanMode.value = 'found'
      scanTime.value = (count * 0.001).toFixed(3)
    }
  }, 30)
}

const startIndex = () => {
  indexMode.value = 'searching'
  indexStep.value = 0
  indexSteps.value = ['根节点', '中间节点', '叶子节点']

  const steps = ['根节点 (1-100)', '中间节点 (1-10)', '叶子节点 (找到 7)']
  let currentStep = 0

  const interval = setInterval(() => {
    currentStep++
    indexStep.value = currentStep

    if (currentStep >= 3) {
      clearInterval(interval)
      indexMode.value = 'found'
      indexTime.value = (0.003).toFixed(3)
    }
  }, 500)
}
</script>

<style scoped>
.btree-demo {
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

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}

.compare-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-header .icon { font-size: 1rem; }
.card-header .title { font-weight: 600; font-size: 0.85rem; }

.card-content {
  padding: 0.75rem;
}

.data-rows {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  margin-bottom: 0.75rem;
}

.data-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.65rem;
  transition: background 0.2s;
}

.data-row.found {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid #22c55e;
}

.row-id {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.row-name {
  color: var(--vp-c-text-3);
}

.tree-structure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tree-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.node-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.node {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 60px;
  text-align: center;
}

.leaf {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.leaf-node {
  min-width: 28px;
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.leaf-node.found {
  background: rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
  color: #22c55e;
}

.scan-info, .index-info {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scan-info .found, .index-info .found {
  color: #22c55e;
  font-weight: 500;
}

.btn {
  width: 100%;
  padding: 8px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: var(--vp-c-brand-1);
}

.stats-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .stats-box {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-item {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-value.slow {
  color: #ef4444;
}

.stat-value.fast {
  color: #22c55e;
}

.stat-value.highlight {
  color: var(--vp-c-brand-1);
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
</style>
