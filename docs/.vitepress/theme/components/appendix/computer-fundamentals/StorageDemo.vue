<template>
  <div class="storage-demo">
    <div class="demo-header">
      <span class="icon">💾</span>
      <span class="title">存储层次：从寄存器到云存储</span>
      <span class="subtitle">速度与容量的权衡</span>
    </div>

    <div class="demo-content">
      <div class="storage-pyramid">
        <div 
          v-for="(level, i) in storageLevels" 
          :key="level.name"
          class="level"
          :class="{ active: activeLevel === i }"
          :style="{ width: level.width }"
          @click="activeLevel = i"
        >
          <div class="level-name">
            {{ level.name }}
          </div>
          <div class="level-speed">
            {{ level.speed }}
          </div>
          <div class="level-size">
            {{ level.size }}
          </div>
        </div>
      </div>

      <div
        v-if="currentLevel"
        class="level-detail"
      >
        <div class="detail-title">
          {{ currentLevel.name }} 详情
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">访问速度</span>
            <span class="value">{{ currentLevel.speed }}</span>
          </div>
          <div class="detail-item">
            <span class="label">典型容量</span>
            <span class="value">{{ currentLevel.size }}</span>
          </div>
          <div class="detail-item">
            <span class="label">每字节成本</span>
            <span class="value">{{ currentLevel.cost }}</span>
          </div>
          <div class="detail-item">
            <span class="label">易失性</span>
            <span class="value">{{ currentLevel.volatile }}</span>
          </div>
        </div>
        <div class="detail-desc">
          {{ currentLevel.desc }}
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>存储遵循"金字塔"原则：越快的存储越贵、容量越小。CPU 需要的数据放在最快的存储（寄存器、缓存），暂时不用的放在慢速大容量存储（磁盘、云端）。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLevel = ref(0)

const storageLevels = [
  { 
    name: '寄存器', 
    speed: '~1 纳秒', 
    size: '几百字节', 
    width: '30%',
    cost: '极高',
    volatile: '是',
    desc: 'CPU 内部最快的存储，直接参与运算。数量有限，由编译器自动管理。'
  },
  { 
    name: 'L1 缓存', 
    speed: '~2 纳秒', 
    size: '32-64 KB', 
    width: '45%',
    cost: '很高',
    volatile: '是',
    desc: 'CPU 内置的高速缓存，存储最常用的数据。每个核心独立拥有。'
  },
  { 
    name: 'L2/L3 缓存', 
    speed: '~10 纳秒', 
    size: '几 MB', 
    width: '60%',
    cost: '高',
    volatile: '是',
    desc: '更大但稍慢的缓存，L3 通常多核心共享。'
  },
  { 
    name: '内存 (RAM)', 
    speed: '~100 纳秒', 
    size: '8-128 GB', 
    width: '75%',
    cost: '中等',
    volatile: '是',
    desc: '程序运行时的主要工作区。断电后数据丢失。'
  },
  { 
    name: 'SSD 固态硬盘', 
    speed: '~100 微秒', 
    size: '256 GB - 4 TB', 
    width: '90%',
    cost: '较低',
    volatile: '否',
    desc: '比机械硬盘快很多，无机械部件。断电数据保留。'
  },
  { 
    name: 'HDD 机械硬盘', 
    speed: '~10 毫秒', 
    size: '1-20 TB', 
    width: '100%',
    cost: '低',
    volatile: '否',
    desc: '容量大、成本低，但有机械延迟。适合存储大量数据。'
  }
]

const currentLevel = computed(() => storageLevels[activeLevel.value])
</script>

<style scoped>
.storage-demo {
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

.demo-content {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.storage-pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 200px;
}

.level {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.level:hover {
  background: var(--vp-c-bg-soft);
}

.level.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.level-name {
  font-weight: bold;
  font-size: 0.85rem;
}

.level-speed {
  font-size: 0.75rem;
  color: var(--vp-c-success);
}

.level-size {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.level-detail {
  flex: 1;
  min-width: 250px;
}

.detail-title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
}

.detail-item .label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.detail-item .value {
  font-weight: bold;
  font-size: 0.9rem;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
</style>
