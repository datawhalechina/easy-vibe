<template>
  <div class="batch-demo">
    <div class="header">
      <div class="title">批量处理演示</div>
      <div class="subtitle">模拟分批处理大量数据</div>
    </div>
    <div class="controls">
      <div class="input-group">
        <label>数据总量：</label>
        <input type="number" v-model.number="total" min="1" max="1000" class="num-input" />
      </div>
      <div class="input-group">
        <label>批量大小：</label>
        <input type="number" v-model.number="batchSize" min="1" max="100" class="num-input" />
      </div>
      <button @click="process" class="process-btn">开始处理</button>
      <button @click="reset" class="reset-btn">重置</button>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">已处理</span>
        <span class="stat-value">{{ processed }}/{{ total }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">当前批次</span>
        <span class="stat-value">{{ currentBatch }}/{{ totalBatches }}</span>
      </div>
    </div>
    <div class="log-area">
      <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const total = ref(100)
const batchSize = ref(20)
const processed = ref(0)
const currentBatch = ref(0)
const logs = ref([])

const totalBatches = computed(() => Math.ceil(total.value / batchSize.value))
const progress = computed(() => (processed.value / total.value) * 100)

function process() {
  logs.value = []
  processed.value = 0
  currentBatch.value = 0
  
  let remaining = total.value
  let batch = 1
  while (remaining > 0) {
    const toProcess = Math.min(remaining, batchSize.value)
    processed.value += toProcess
    remaining -= toProcess
    currentBatch.value = batch
    logs.value.push(`批次 ${batch}: 处理 ${toProcess} 条数据`)
    batch++
  }
  logs.value.push('处理完成！')
}

function reset() {
  processed.value = 0
  currentBatch.value = 0
  logs.value = []
}
</script>

<style scoped>
.batch-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.controls { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; }
.input-group { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
.num-input { width: 80px; padding: 0.4rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); }
.process-btn, .reset-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.process-btn { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.progress-bar { height: 8px; background: var(--vp-c-bg); border-radius: 4px; overflow: hidden; margin-bottom: 1rem; }
.progress-fill { height: 100%; background: var(--vp-c-brand); transition: width 0.3s; }
.stats { display: flex; gap: 2rem; margin-bottom: 1rem; }
.stat-item { display: flex; flex-direction: column; }
.stat-label { font-size: 0.8rem; color: var(--vp-c-text-2); }
.stat-value { font-size: 1.1rem; font-weight: 600; }
.log-area { background: var(--vp-c-bg); border-radius: 8px; padding: 0.75rem; max-height: 150px; overflow-y: auto; }
.log-item { font-size: 0.85rem; padding: 0.3rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.log-item:last-child { border-bottom: none; }
</style>
