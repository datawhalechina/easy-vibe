<template>
  <div class="cache-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">缓存层级结构</span>
      <span class="subtitle">数据是如何在不同缓存层级间流动的</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">超市</span>买东西：先在购物车找（L1缓存），没有就去货架上找（L2缓存），
      再没有就去仓库找（L3缓存）。越往上层，速度越快但容量越小；越往下层，速度越慢但容量越大。
    </div>

    <div class="hierarchy-layers">
      <div
        v-for="(layer, index) in layers"
        :key="layer.id"
        class="layer"
        :class="{ active: activeLayer === layer.id }"
        @click="activeLayer = layer.id"
      >
        <div class="layer-header">
          <span class="layer-icon">{{ layer.icon }}</span>
          <span class="layer-name">{{ layer.name }}</span>
        </div>
        <div class="layer-stats">
          <div class="stat">
            <span class="stat-label">速度</span>
            <span
              class="stat-value"
              :class="layer.speedClass"
            >{{ layer.speed }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">容量</span>
            <span class="stat-value">{{ layer.capacity }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">成本</span>
            <span class="stat-value">{{ layer.cost }}</span>
          </div>
        </div>
        <div
          v-if="index < layers.length - 1"
          class="arrow"
        >
          ↓
        </div>
      </div>
    </div>

    <div class="data-flow">
      <div class="flow-title">
        数据流动演示
      </div>
      <div class="flow-steps">
        <div
          class="flow-step"
          :class="{ active: flowStep >= 1 }"
        >
          <div class="step-number">
            1
          </div>
          <div class="step-text">
            查询 L1 缓存
          </div>
          <div class="step-time">
            ~1ns
          </div>
        </div>
        <div class="flow-arrow">
          ↓
        </div>
        <div
          class="flow-step"
          :class="{ active: flowStep >= 2 }"
        >
          <div class="step-number">
            2
          </div>
          <div class="step-text">
            未命中，查 L2
          </div>
          <div class="step-time">
            ~10ns
          </div>
        </div>
        <div class="flow-arrow">
          ↓
        </div>
        <div
          class="flow-step"
          :class="{ active: flowStep >= 3 }"
        >
          <div class="step-number">
            3
          </div>
          <div class="step-text">
            未命中，查 L3
          </div>
          <div class="step-time">
            ~100ns
          </div>
        </div>
      </div>
      <button
        class="simulate-btn"
        @click="simulateFlow"
      >
        模拟数据查找
      </button>
    </div>

    <div class="comparison-table">
      <div class="table-title">
        各层级对比
      </div>
      <table>
        <thead>
          <tr>
            <th>层级</th>
            <th>速度</th>
            <th>容量</th>
            <th>成本</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="layer in layers"
            :key="layer.id"
            :class="{ active: activeLayer === layer.id }"
          >
            <td>{{ layer.name }}</td>
            <td>{{ layer.speed }}</td>
            <td>{{ layer.capacity }}</td>
            <td>{{ layer.cost }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>多级缓存利用<span class="highlight">局部性原理</span>——程序倾向于访问最近访问过的数据位置。通过把热点数据放在最快的层级，大幅提升访问速度。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref('l1')
const flowStep = ref(0)

const layers = [
  {
    id: 'l1',
    name: 'L1 缓存',
    icon: '⚡',
    speed: '~1ns',
    capacity: '~64KB',
    cost: '极高',
    speedClass: 'fast'
  },
  {
    id: 'l2',
    name: 'L2 缓存',
    icon: '🚀',
    speed: '~10ns',
    capacity: '~256KB',
    cost: '高',
    speedClass: 'medium'
  },
  {
    id: 'l3',
    name: 'L3 缓存',
    icon: '📦',
    speed: '~100ns',
    capacity: '~8MB',
    cost: '中',
    speedClass: 'slow'
  }
]

const simulateFlow = () => {
  flowStep.value = 0
  setTimeout(() => { flowStep.value = 1 }, 300)
  setTimeout(() => { flowStep.value = 2 }, 800)
  setTimeout(() => { flowStep.value = 3 }, 1300)
}
</script>

<style scoped>
.cache-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  max-width: 600px;
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

.hierarchy-layers {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.layer {
  width: 100%;
  max-width: 400px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
}

.layer:hover {
  border-color: var(--vp-c-brand);
}

.layer.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.layer-icon {
  font-size: 1.5rem;
}

.layer-name {
  font-weight: 600;
  font-size: 1rem;
}

.layer-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
}

.stat-value.fast {
  color: #22c55e;
}

.stat-value.medium {
  color: #f59e0b;
}

.stat-value.slow {
  color: #ef4444;
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
}

.data-flow {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
  width: 100%;
  max-width: 350px;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: #eff6ff;
}

.step-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.85rem;
}

.step-text {
  flex: 1;
  font-weight: 600;
  font-size: 0.9rem;
}

.step-time {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.simulate-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.simulate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

tr.active {
  background: #eff6ff;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
