<script setup>
import { ref, computed } from 'vue'

const round = ref(1)
const minRound = 1
const maxRound = 5

const contextTokens = computed(() => 120 + (round.value - 1) * 80)

const cacheHitRate = computed(() =>
  round.value === 1 ? 0 : Math.min(80, (round.value - 1) * 20)
)

const baseCostPerRound = 0.025

const currentCost = computed(() => {
  const rate = cacheHitRate.value / 100
  const cost = baseCostPerRound * (1 - rate * 0.9)
  return cost.toFixed(4)
})

const savedPercent = computed(() => {
  const cost = Number(currentCost.value)
  const saved = ((baseCostPerRound - cost) / baseCostPerRound) * 100
  return saved.toFixed(1)
})

const increaseRound = () => {
  if (round.value < maxRound) round.value += 1
}

const decreaseRound = () => {
  if (round.value > minRound) round.value -= 1
}
</script>

<template>
  <div class="agent-context-intro">
    <div class="header">
      <h3>三个关键数字：轮次、上下文长度、缓存命中率</h3>
      <p>拖动轮次，看看这三个数字是怎么一起变化的。</p>
    </div>

    <div class="round-control">
      <button class="round-btn" @click="decreaseRound" :disabled="round === minRound">
        -
      </button>
      <div class="round-text">
        当前假设：我们已经聊到了
        <strong>第 {{ round }} 轮</strong>。拖动右侧滑块，看看聊多几轮之后，黑板会写满到什么程度，背课文本比例会涨到多高。
      </div>
      <input
        class="round-slider"
        type="range"
        :min="minRound"
        :max="maxRound"
        v-model.number="round"
      />
      <button class="round-btn" @click="increaseRound" :disabled="round === maxRound">
        +
      </button>
    </div>

    <div class="metrics-row">
      <div class="metric-card">
        <div class="metric-label">聊了几轮</div>
        <div class="metric-value">第 {{ round }} 轮</div>
        <div class="metric-desc">对话轮次</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">记了多少字</div>
        <div class="metric-value">{{ contextTokens }}</div>
        <div class="metric-desc">大致对应 token 数</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">背课文本比例</div>
        <div class="metric-value">{{ cacheHitRate }}%</div>
        <div class="metric-desc">前缀复用比例</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">这轮大概多少钱</div>
        <div class="metric-value">${{ currentCost }}</div>
        <div class="metric-desc">比不做优化便宜了 {{ savedPercent }}%</div>
      </div>
    </div>

    <div class="summary-line">
      参考基准：一轮完全不做优化大约 {{ baseCostPerRound.toFixed(4) }} 美元。
      在当前轮次下，通过复用前缀，这轮的成本约为 {{ currentCost }} 美元。
    </div>
  </div>
</template>

<style scoped>
.agent-context-intro {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.header {
  margin-bottom: 0.75rem;
}

.header h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.header p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.round-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
}

.round-btn {
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.85rem;
}

.round-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.round-text {
  flex: 1;
  color: var(--vp-c-text-2);
}

.round-slider {
  width: 120px;
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.metric-card {
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.metric-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.summary-line {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .metrics-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
