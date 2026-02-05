<template>
  <div class="scaling-strategy-demo">
    <div class="demo-header">
      <h4>📈 扩展策略对比</h4>
      <p>垂直扩展 vs 水平扩展</p>
    </div>

    <div class="strategies">
      <div class="strategy-card" :class="{ active: activeStrategy === 'vertical' }" @click="activeStrategy = 'vertical'">
        <div class="strategy-icon">📦</div>
        <div class="strategy-name">垂直扩展</div>
        <div class="strategy-desc">买更强的机器</div>
        <div class="visual-vertical">
          <div class="server" :class="{ scale: activeStrategy === 'vertical' }">
            <div class="cpu">CPU</div>
            <div class="memory">内存</div>
          </div>
        </div>
      </div>

      <div class="strategy-card" :class="{ active: activeStrategy === 'horizontal' }" @click="activeStrategy = 'horizontal'">
        <div class="strategy-icon">🔄</div>
        <div class="strategy-name">水平扩展</div>
        <div class="strategy-desc">加更多机器</div>
        <div class="visual-horizontal">
          <div class="servers">
            <div class="server-mini" v-for="n in 4" :key="n" :class="{ active: activeStrategy === 'horizontal' && n <= serverCount }" :style="{ animationDelay: (n * 0.1) + 's' }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-row header">
        <span>维度</span>
        <span>垂直扩展</span>
        <span>水平扩展</span>
      </div>
      <div class="table-row" v-for="item in comparisonData" :key="item.dim">
        <span>{{ item.dim }}</span>
        <span :class="{ better: item.verticalBetter }">{{ item.vertical }}</span>
        <span :class="{ better: item.horizontalBetter }">{{ item.horizontal }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStrategy = ref('horizontal')
const serverCount = ref(3)

const comparisonData = [
  { dim: '成本', vertical: '硬件贵', horizontal: '机器多', verticalBetter: false, horizontalBetter: true },
  { dim: '上限', vertical: '有瓶颈', horizontal: '理论上无限', verticalBetter: false, horizontalBetter: true },
  { dim: '复杂度', vertical: '简单', horizontal: '需要分布式', verticalBetter: true, horizontalBetter: false },
  { dim: '数据', vertical: '一致性好', horizontal: '需要同步', verticalBetter: true, horizontalBetter: false }
]
</script>

<style scoped>
.scaling-strategy-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-header h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.strategies {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.strategy-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.strategy-card:hover {
  border-color: var(--vp-c-brand);
}

.strategy-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.05);
}

.strategy-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.strategy-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.125rem;
}

.strategy-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.visual-vertical,
.visual-horizontal {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.server {
  width: 50px;
  height: 40px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition: all 0.3s;
}

.server.scale {
  transform: scale(1.2);
  border-color: var(--vp-c-brand);
}

.cpu, .memory {
  font-size: 0.5rem;
  padding: 1px 3px;
  background: var(--vp-c-bg);
  border-radius: 2px;
  color: var(--vp-c-text-2);
}

.servers {
  display: flex;
  gap: 4px;
}

.server-mini {
  width: 20px;
  height: 30px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  opacity: 0.3;
  transition: all 0.3s;
}

.server-mini.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.comparison-table {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.table-row:not(.header):not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-row.header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.table-row span:first-child {
  color: var(--vp-c-text-2);
}

.better {
  color: var(--vp-c-success);
  font-weight: 500;
}

@media (max-width: 768px) {
  .strategies {
    grid-template-columns: 1fr;
  }

  .comparison-table .table-row {
    font-size: 0.75rem;
    padding: 0.4rem 0.5rem;
  }
}
</style>
