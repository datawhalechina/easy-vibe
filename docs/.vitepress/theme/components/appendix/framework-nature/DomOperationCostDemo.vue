<template>
  <div class="dom-cost-demo">
    <div class="demo-header">
      <span class="title">DOM 操作耗时对比</span>
      <span class="subtitle">逐个操作 vs 批量操作</span>
    </div>

    <div class="control-panel">
      <div class="control-group">
        <label>修改次数</label>
        <div class="radio-group">
          <button
            v-for="n in counts"
            :key="n"
            :class="['radio-btn', { active: selectedCount === n }]"
            @click="selectedCount = n"
          >
            {{ n }} 次
          </button>
        </div>
      </div>
      <button class="action-btn" :disabled="isRunning" @click="runComparison">
        {{ isRunning ? '执行中...' : '开始对比' }}
      </button>
    </div>

    <div class="visualization-area">
      <div class="comparison-row">
        <div class="method-card">
          <div class="method-header">
            <span class="method-badge slow">逐个操作 DOM</span>
          </div>
          <div class="method-desc">
            每修改一次数据 → 立刻操作一次真实 DOM → 浏览器每次都要重新布局和绘制
          </div>
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div
                class="progress-bar-fill slow"
                :style="{ width: slowProgress + '%' }"
              />
            </div>
          </div>
          <div class="result-row">
            <span class="result-label">模拟耗时</span>
            <span class="result-value" :class="{ highlight: showResults }">
              {{ showResults ? slowTime + 'ms' : '—' }}
            </span>
          </div>
          <div class="step-list">
            <div class="step-item" v-for="i in Math.min(selectedCount, 4)" :key="i">
              <span class="step-num">{{ i }}</span>
              <span class="step-text">修改 → 布局 → 绘制</span>
            </div>
            <div v-if="selectedCount > 4" class="step-item ellipsis">
              <span class="step-text">... 重复 {{ selectedCount - 4 }} 次 ...</span>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <span class="method-badge fast">批量计算后一次性操作</span>
          </div>
          <div class="method-desc">
            所有修改先在内存中计算好 → 最后只操作一次真实 DOM → 浏览器只需要重新布局和绘制一次
          </div>
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div
                class="progress-bar-fill fast"
                :style="{ width: fastProgress + '%' }"
              />
            </div>
          </div>
          <div class="result-row">
            <span class="result-label">模拟耗时</span>
            <span class="result-value" :class="{ highlight: showResults }">
              {{ showResults ? fastTime + 'ms' : '—' }}
            </span>
          </div>
          <div class="step-list">
            <div class="step-item">
              <span class="step-num">1</span>
              <span class="step-text">内存中计算 {{ selectedCount }} 次变化</span>
            </div>
            <div class="step-item">
              <span class="step-num">2</span>
              <span class="step-text">一次性提交 → 布局 → 绘制</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showResults" class="savings-banner">
        批量操作节省了 <strong>{{ savingsPercent }}%</strong> 的耗时
        （{{ slowTime }}ms → {{ fastTime }}ms）
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span>DOM 操作的真正代价不是"修改值"本身，而是每次修改后浏览器必须执行的"重新布局 + 重新绘制"。减少 DOM 操作次数，就是减少这些昂贵的计算。虚拟 DOM 的作用就是先在内存中算好所有变化，最后一次性提交。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const counts = [5, 20, 100, 500]
const selectedCount = ref(20)
const isRunning = ref(false)
const slowProgress = ref(0)
const fastProgress = ref(0)
const showResults = ref(false)

const COST_PER_OP = 3
const BATCH_OVERHEAD = 8

const slowTime = computed(() => selectedCount.value * COST_PER_OP)
const fastTime = computed(() => Math.round(BATCH_OVERHEAD + selectedCount.value * 0.1))
const savingsPercent = computed(() =>
  Math.round((1 - fastTime.value / slowTime.value) * 100)
)

async function runComparison() {
  if (isRunning.value) return
  isRunning.value = true
  showResults.value = false
  slowProgress.value = 0
  fastProgress.value = 0

  const totalSlow = slowTime.value
  const totalFast = fastTime.value
  const duration = Math.min(totalSlow * 2, 2000)
  const steps = 30
  const stepDelay = duration / steps

  for (let i = 1; i <= steps; i++) {
    await new Promise(r => setTimeout(r, stepDelay))
    slowProgress.value = Math.min((i / steps) * 100, 100)
    const fastRatio = totalFast / totalSlow
    fastProgress.value = Math.min((i / steps / fastRatio) * 100, 100)
  }

  slowProgress.value = 100
  fastProgress.value = 100
  showResults.value = true
  isRunning.value = false
}
</script>

<style scoped>
.dom-cost-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: 600;
}

.demo-header .subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.control-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.radio-group {
  display: flex;
  gap: 0.35rem;
}

.radio-btn {
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.radio-btn:hover {
  border-color: var(--vp-c-brand);
}

.radio-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.action-btn {
  padding: 0.35rem 0.8rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.visualization-area {
  margin-bottom: 0.75rem;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.method-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.method-header {
  margin-bottom: 0.4rem;
}

.method-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.method-badge.slow {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}

.method-badge.fast {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

.method-desc {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.6rem;
  line-height: 1.4;
}

.progress-container {
  margin-bottom: 0.5rem;
}

.progress-bar-bg {
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.1s linear;
}

.progress-bar-fill.slow {
  background: var(--vp-c-danger-1);
}

.progress-bar-fill.fast {
  background: var(--vp-c-green-1);
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.result-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.result-value {
  font-size: 1rem;
  font-weight: 700;
}

.result-value.highlight {
  color: var(--vp-c-brand);
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.step-item.ellipsis {
  padding-left: 1.4rem;
  font-style: italic;
}

.step-num {
  width: 1rem;
  height: 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  flex-shrink: 0;
}

.savings-banner {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid var(--vp-c-green-1);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-green-1);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .comparison-row {
    grid-template-columns: 1fr;
  }
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
