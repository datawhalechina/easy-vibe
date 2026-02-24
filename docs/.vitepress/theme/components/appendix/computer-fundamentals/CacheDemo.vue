<template>
  <div class="cache-demo">
    <div class="demo-header">
      <span class="title">缓存 (Cache) 原理</span>
      <span class="subtitle">CPU 与内存之间的"桥梁"</span>
    </div>

    <div class="cache-visualization">
      <div class="cache-levels">
        <div class="level cpu-level">
          <div class="level-label">CPU 核心</div>
          <div class="level-icon">⚡</div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level l1-cache" :class="{ active: activeLevel === 'L1' }">
          <div class="level-label">L1 缓存</div>
          <div class="level-info">
            <span class="size">64 KB</span>
            <span class="speed">~1ns</span>
          </div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level l2-cache" :class="{ active: activeLevel === 'L2' }">
          <div class="level-label">L2 缓存</div>
          <div class="level-info">
            <span class="size">256 KB</span>
            <span class="speed">~5ns</span>
          </div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level l3-cache" :class="{ active: activeLevel === 'L3' }">
          <div class="level-label">L3 缓存</div>
          <div class="level-info">
            <span class="size">8 MB</span>
            <span class="speed">~15ns</span>
          </div>
        </div>
        
        <div class="arrow-right">→</div>
        
        <div class="level memory" :class="{ active: activeLevel === 'MEM' }">
          <div class="level-label">主存</div>
          <div class="level-info">
            <span class="size">16 GB</span>
            <span class="speed">~100ns</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cache-operation">
      <div class="control-panel">
        <div class="panel-title">缓存操作演示</div>
        <div class="btn-group">
          <button class="btn" @click="simulateRead(100)">读取地址 100</button>
          <button class="btn" @click="simulateRead(104)">读取地址 104</button>
          <button class="btn" @click="simulateRead(200)">读取地址 200</button>
          <button class="btn" @click="simulateRead(108)">读取地址 108</button>
        </div>
      </div>

      <div class="operation-log">
        <div class="log-title">操作记录</div>
        <div class="log-content">
          <div v-for="(log, i) in logs" :key="i" :class="['log-item', log.type]">
            <span class="log-time">T+{{ log.time }}ns</span>
            <span class="log-text">{{ log.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="locality-explanation">
      <div class="exp-title">为什么缓存有效？—— 局部性原理</div>
      <div class="locality-grid">
        <div class="locality-card">
          <div class="locality-icon">⏱️</div>
          <div class="locality-name">时间局部性</div>
          <div class="locality-desc">刚访问的数据很可能再次被访问</div>
          <div class="locality-example">循环中的变量</div>
        </div>
        <div class="locality-card">
          <div class="locality-icon">📦</div>
          <div class="locality-name">空间局部性</div>
          <div class="locality-desc">访问某个数据后，附近的数据也可能被访问</div>
          <div class="locality-example">数组遍历、顺序执行</div>
        </div>
      </div>
    </div>

    <div class="cache-mapping">
      <div class="mapping-title">缓存映射方式</div>
      <div class="mapping-tabs">
        <button 
          v-for="map in mappings" 
          :key="map.type"
          :class="['map-btn', { active: selectedMapping === map.type }]"
          @click="selectedMapping = map.type"
        >
          {{ map.type }}
        </button>
      </div>
      
      <div class="mapping-details" v-if="selectedMappingData">
        <div class="mapping-desc">{{ selectedMappingData.desc }}</div>
        <div class="mapping-compare">
          <div class="compare-item">
            <span class="compare-label">速度</span>
            <span class="compare-value fast">{{ selectedMappingData.speed }}</span>
          </div>
          <div class="compare-item">
            <span class="compare-label">命中率</span>
            <span class="compare-value">{{ selectedMappingData.hitRate }}</span>
          </div>
          <div class="compare-item">
            <span class="compare-label">实现复杂度</span>
            <span class="compare-value">{{ selectedMappingData.complexity }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hit-rate-calc">
      <div class="calc-title">命中率计算</div>
      <div class="calc-formula">
        <span class="formula">平均访问时间 = H × T<sub>c</sub> + (1-H) × T<sub>m</sub></span>
      </div>
      <div class="calc-example">
        <div class="calc-row">
          <label>缓存访问时间 (Tc):</label>
          <input type="range" v-model="tc" min="1" max="10" />
          <span>{{ tc }} ns</span>
        </div>
        <div class="calc-row">
          <label>内存访问时间 (Tm):</label>
          <input type="range" v-model="tm" min="50" max="200" />
          <span>{{ tm }} ns</span>
        </div>
        <div class="calc-row">
          <label>命中率 (H):</label>
          <input type="range" v-model="hitRate" min="0" max="100" />
          <span>{{ hitRate }}%</span>
        </div>
        <div class="calc-result">
          平均访问时间 = {{ avgTime }} ns
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLevel = ref('')
const logs = ref([])
const tc = ref(2)
const tm = ref(100)
const hitRate = ref(90)
const selectedMapping = ref('直接映射')

const mappings = ref([
  { 
    type: '直接映射', 
    desc: '每个主存块只能映射到唯一的缓存行',
    speed: '最快',
    hitRate: '较低',
    complexity: '最低'
  },
  { 
    type: '组相联', 
    desc: '每个主存块可以映射到 N 个缓存行（N路组相联）',
    speed: '较快',
    hitRate: '较高',
    complexity: '中等'
  },
  { 
    type: '全相联', 
    desc: '主存块可以放到任意缓存行中',
    speed: '最慢',
    hitRate: '最高',
    complexity: '最高'
  }
])

const selectedMappingData = computed(() => {
  return mappings.value.find(m => m.type === selectedMapping.value)
})

const avgTime = computed(() => {
  const h = hitRate.value / 100
  return Math.round(h * tc.value + (1 - h) * tm.value)
})

const simulateRead = async (addr) => {
  logs.value = []
  
  if (addr >= 100 && addr < 110) {
    logs.value.push({ time: 0, text: `读取地址 ${addr}`, type: 'read' })
    activeLevel.value = 'L1'
    logs.value.push({ time: tc.value, text: '✓ L1 缓存命中!', type: 'hit' })
  } else if (addr >= 200 && addr < 210) {
    logs.value.push({ time: 0, text: `读取地址 ${addr}`, type: 'read' })
    activeLevel.value = 'L1'
    logs.value.push({ time: tc.value, text: '✗ L1 缓存未命中', type: 'miss' })
    activeLevel.value = 'L2'
    logs.value.push({ time: tc.value + 5, text: '✗ L2 缓存未命中', type: 'miss' })
    activeLevel.value = 'MEM'
    logs.value.push({ time: tc.value + 5 + 100, text: '从主存加载数据', type: 'load' })
    logs.value.push({ time: tc.value + 5 + 100, text: '数据存入缓存', type: 'store' })
  }
}
</script>

<style scoped>
.cache-demo {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  margin-left: auto;
}

.cache-visualization {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.cache-levels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.level {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: #f1f5f9;
  transition: all 0.3s;
}

.level.active {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.cpu-level {
  background: #fef3c7;
}

.l1-cache.active { background: #dbeafe; border: 2px solid #3b82f6; }
.l2-cache.active { background: #dbeafe; border: 2px solid #2563eb; }
.l3-cache.active { background: #dbeafe; border: 2px solid #1d4ed8; }
.memory.active { background: #dcfce7; border: 2px solid #16a34a; }

.level-label {
  font-size: 11px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.level-icon {
  font-size: 24px;
}

.level-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
}

.size { color: #0369a1; font-weight: 600; }
.speed { color: #64748b; }

.arrow-right {
  font-size: 18px;
  color: #94a3b8;
}

.cache-operation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.control-panel, .operation-log {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.panel-title, .log-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn {
  padding: 8px 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.btn:hover {
  background: #2563eb;
}

.log-content {
  max-height: 120px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  gap: 8px;
  padding: 4px 0;
  font-size: 11px;
}

.log-time {
  color: #64748b;
  min-width: 50px;
}

.log-item.hit .log-text { color: #16a34a; }
.log-item.miss .log-text { color: #ea580c; }
.log-item.load .log-text { color: #0369a1; }

.locality-explanation {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.locality-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.locality-card {
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.locality-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.locality-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.locality-desc {
  font-size: 11px;
  color: #64748b;
  margin: 8px 0;
}

.locality-example {
  font-size: 10px;
  padding: 4px 8px;
  background: #e0f2fe;
  border-radius: 4px;
  color: #0369a1;
}

.cache-mapping {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.mapping-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.mapping-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.map-btn {
  padding: 8px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.map-btn.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.mapping-desc {
  font-size: 12px;
  color: #475569;
  margin-bottom: 12px;
}

.mapping-compare {
  display: flex;
  gap: 16px;
}

.compare-item {
  display: flex;
  flex-direction: column;
}

.compare-label {
  font-size: 10px;
  color: #64748b;
}

.compare-value {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.compare-value.fast { color: #16a34a; }

.hit-rate-calc {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.calc-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.calc-formula {
  text-align: center;
  margin-bottom: 16px;
}

.formula {
  font-family: monospace;
  font-size: 14px;
  color: #0369a1;
}

.calc-example {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calc-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.calc-row label {
  min-width: 120px;
  color: #475569;
}

.calc-row input {
  flex: 1;
}

.calc-result {
  margin-top: 12px;
  padding: 12px;
  background: #dcfce7;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #166534;
}
</style>
