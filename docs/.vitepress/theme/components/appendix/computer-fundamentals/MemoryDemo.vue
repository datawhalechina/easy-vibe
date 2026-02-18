<template>
  <div class="memory-demo">
    <div class="demo-header">
      <span class="icon">🧠</span>
      <span class="title">内存管理：程序的"工作台"</span>
      <span class="subtitle">操作系统如何分配和管理内存</span>
    </div>

    <div class="demo-content">
      <div class="memory-visual">
        <div class="mem-header">
          <span>虚拟内存空间 (4GB)</span>
          <span class="used-info">已用: {{ usedMemory }}MB / 4096MB</span>
        </div>
        <div class="mem-blocks">
          <div 
            v-for="(block, i) in memoryBlocks" 
            :key="i"
            class="mem-block"
            :class="{ allocated: block.allocated, selected: selectedBlock === i }"
            :style="{ height: block.size + '%' }"
            @click="selectedBlock = i"
          >
            <span
              v-if="block.size > 5"
              class="block-label"
            >{{ block.name }}</span>
            <span
              v-if="block.size > 8"
              class="block-size"
            >{{ block.sizeMB }}MB</span>
          </div>
        </div>
      </div>

      <div class="memory-info">
        <div class="info-section">
          <div class="section-title">
            内存分配策略
          </div>
          <div class="strategy-tabs">
            <button 
              v-for="s in strategies" 
              :key="s.name"
              :class="['strat-btn', { active: activeStrategy === s.name }]"
              @click="activeStrategy = s.name"
            >
              {{ s.name }}
            </button>
          </div>
          <div class="strategy-desc">
            {{ currentStrategy.desc }}
          </div>
        </div>

        <div class="info-section">
          <div class="section-title">
            虚拟内存的作用
          </div>
          <div class="vm-benefits">
            <div
              v-for="b in benefits"
              :key="b.title"
              class="benefit-item"
            >
              <span class="benefit-icon">{{ b.icon }}</span>
              <div class="benefit-content">
                <span class="benefit-title">{{ b.title }}</span>
                <span class="benefit-desc">{{ b.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>虚拟内存让每个进程都以为自己独占整个内存空间，实际由操作系统统一管理和映射，实现隔离和保护。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedBlock = ref(0)
const activeStrategy = ref('首次适应')

const memoryBlocks = ref([
  { name: '内核空间', size: 25, allocated: true, sizeMB: 1024 },
  { name: '进程A', size: 15, allocated: true, sizeMB: 600 },
  { name: '空闲', size: 5, allocated: false, sizeMB: 200 },
  { name: '进程B', size: 20, allocated: true, sizeMB: 800 },
  { name: '空闲', size: 10, allocated: false, sizeMB: 400 },
  { name: '进程C', size: 10, allocated: true, sizeMB: 400 },
  { name: '空闲', size: 15, allocated: false, sizeMB: 600 }
])

const strategies = [
  { name: '首次适应', desc: '从内存开始找，找到第一个足够大的空闲块就分配。速度快，但可能产生小碎片。' },
  { name: '最佳适应', desc: '找最小的能满足需求的空闲块。内存利用率高，但可能产生很多小碎片。' },
  { name: '最坏适应', desc: '找最大的空闲块分配。减少小碎片，但大块内存很快用完。' }
]

const benefits = [
  { icon: '🔒', title: '内存隔离', desc: '进程间互不干扰，一个崩溃不影响其他' },
  { icon: '📦', title: '内存保护', desc: '防止进程访问不该访问的内存区域' },
  { icon: '💾', title: '内存扩展', desc: '用磁盘当内存用，突破物理内存限制' }
]

const currentStrategy = computed(() => {
  return strategies.find(s => s.name === activeStrategy.value)
})

const usedMemory = computed(() => {
  return memoryBlocks.value
    .filter(b => b.allocated)
    .reduce((sum, b) => sum + b.sizeMB, 0)
})
</script>

<style scoped>
.memory-demo {
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

.memory-visual {
  flex: 1;
  min-width: 200px;
}

.mem-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.used-info {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.mem-blocks {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 250px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.mem-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.mem-block.allocated {
  background: var(--vp-c-brand-soft);
}

.mem-block:not(.allocated) {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
}

.mem-block.selected {
  outline: 2px solid var(--vp-c-brand);
}

.block-label {
  font-size: 0.75rem;
  font-weight: bold;
}

.block-size {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.memory-info {
  flex: 1;
  min-width: 280px;
}

.info-section {
  margin-bottom: 1rem;
}

.section-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.strategy-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.strat-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}

.strat-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.strategy-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
}

.vm-benefits {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.benefit-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.benefit-icon {
  font-size: 1.2rem;
}

.benefit-content {
  display: flex;
  flex-direction: column;
}

.benefit-title {
  font-weight: bold;
  font-size: 0.85rem;
}

.benefit-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
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
