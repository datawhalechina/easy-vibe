<template>
  <div class="region-latency-demo">
    <div class="user-location">
      <label>你的位置:</label>
      <div class="location-options">
        <button
          v-for="loc in locations"
          :key="loc.id"
          :class="{ active: userLocation === loc.id }"
          @click="userLocation = loc.id"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>

    <div class="latency-table">
      <div class="table-header">
        <div class="col region">云厂商地域</div>
        <div class="col latency">延迟</div>
        <div class="col rating">推荐度</div>
      </div>
      <div
        v-for="item in latencyData"
        :key="item.region"
        class="table-row"
        :class="{ best: item.rating === '⭐⭐⭐' }"
      >
        <div class="col region">{{ item.region }}</div>
        <div class="col latency">
          <div class="latency-bar">
            <div class="bar-fill" :style="{ width: item.percent + '%' }"></div>
            <span class="latency-value">{{ item.latency }}ms</span>
          </div>
        </div>
        <div class="col rating">{{ item.rating }}</div>
      </div>
    </div>

    <div class="recommendation">
      <span class="rec-icon">💡</span>
      <span class="rec-text">{{ recommendation }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const userLocation = ref('beijing')

const locations = [
  { id: 'beijing', name: '北京' },
  { id: 'shanghai', name: '上海' },
  { id: 'guangzhou', name: '广州' },
  { id: 'chengdu', name: '成都' }
]

const latencyMap = {
  beijing: [
    { region: '华北-北京', latency: 15, rating: '⭐⭐⭐' },
    { region: '华东-上海', latency: 35, rating: '⭐⭐' },
    { region: '华南-广州', latency: 55, rating: '⭐' },
    { region: '亚太-新加坡', latency: 85, rating: '⭐' }
  ],
  shanghai: [
    { region: '华东-上海', latency: 12, rating: '⭐⭐⭐' },
    { region: '华北-北京', latency: 38, rating: '⭐⭐' },
    { region: '华南-广州', latency: 45, rating: '⭐⭐' },
    { region: '亚太-新加坡', latency: 75, rating: '⭐' }
  ],
  guangzhou: [
    { region: '华南-广州', latency: 10, rating: '⭐⭐⭐' },
    { region: '华东-上海', latency: 42, rating: '⭐⭐' },
    { region: '华北-北京', latency: 58, rating: '⭐' },
    { region: '亚太-新加坡', latency: 45, rating: '⭐⭐' }
  ],
  chengdu: [
    { region: '华东-上海', latency: 40, rating: '⭐⭐' },
    { region: '华北-北京', latency: 48, rating: '⭐⭐' },
    { region: '华南-广州', latency: 52, rating: '⭐' },
    { region: '西南-成都', latency: 8, rating: '⭐⭐⭐' }
  ]
}

const latencyData = computed(() => {
  const data = latencyMap[userLocation.value] || latencyMap.beijing
  const maxLatency = Math.max(...data.map(d => d.latency))
  return data.map(d => ({
    ...d,
    percent: (d.latency / maxLatency) * 100
  }))
})

const recommendation = computed(() => {
  const best = latencyData.value.find(d => d.rating === '⭐⭐⭐')
  return `建议选择 ${best?.region}，延迟最低 (${best?.latency}ms)`
})
</script>

<style scoped>
.region-latency-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.user-location {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.user-location label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.location-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.location-options button {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.location-options button:hover {
  border-color: var(--vp-c-brand);
}

.location-options button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.latency-table {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

.table-header {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
}

.table-row {
  font-size: 0.85rem;
  background: var(--vp-c-bg);
}

.table-row.best {
  background: var(--vp-c-brand-soft);
}

.col.region {
  font-weight: 500;
}

.latency-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  overflow: hidden;
  padding: 2px;
}

.bar-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 8px;
  transition: width 0.3s;
}

.latency-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 45px;
}

.recommendation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
}

.rec-icon {
  font-size: 1rem;
}

.rec-text {
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .user-location {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-header,
  .table-row {
    grid-template-columns: 80px 1fr 50px;
    font-size: 0.75rem;
  }
}
</style>
