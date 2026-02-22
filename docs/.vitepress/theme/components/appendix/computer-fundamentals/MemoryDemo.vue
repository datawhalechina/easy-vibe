<template>
  <div class="memory-demo">
    <div class="demo-controls">
      <button class="allocate-btn wechat" @click="allocate('wechat')" :disabled="!hasFreeSpace">
        + 给微信分配数据
      </button>
      <button class="allocate-btn game" @click="allocate('game')" :disabled="!hasFreeSpace">
        + 给游戏分配数据
      </button>
      <button class="reset-btn" @click="reset">
        ↺ 重置
      </button>
    </div>

    <div class="system-view">
      <!-- 虚拟内存试图 -->
      <div class="virtual-cluster">
        <div class="process-vm wechat">
          <div class="title">💬 微信的虚拟内存<br/>(它认为自己独占了空间)</div>
          <div class="vm-blocks">
            <div v-for="i in 4" :key="'w'+i" class="block" :class="{ filled: wechatBlocks >= i }">
              {{ wechatBlocks >= i ? '数据 ' + i : '虚拟空闲' }}
            </div>
          </div>
        </div>

        <div class="process-vm game">
          <div class="title">🎮 游戏的虚拟内存<br/>(它也认为自己独占了空间)</div>
          <div class="vm-blocks">
            <div v-for="i in 4" :key="'g'+i" class="block" :class="{ filled: gameBlocks >= i }">
              {{ gameBlocks >= i ? '数据 ' + i : '虚拟空闲' }}
            </div>
          </div>
        </div>
      </div>

      <!-- OS 页表 (映射表) -->
      <div class="os-page-table">
        <div class="title">保安大叔 (OS 页表)</div>
        <div class="table-info">
          当程序存数据时，<br/>由我暗中转移到真正的物理缝隙里。
        </div>
      </div>

      <!-- 物理内存 -->
      <div class="physical-memory">
        <div class="title">🗄️ 真实的物理内存条<br/>(其实像个大杂烩一样乱)</div>
        <div class="pm-blocks">
          <div 
            v-for="(block, idx) in physicalBlocks" 
            :key="'p'+idx" 
            class="block"
            :class="[block.type, { occupied: block.type !== 'empty' }]"
          >
            {{ block.label }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="explanation-box" v-if="wechatBlocks > 0 || gameBlocks > 0">
      💡 发现了没？尽管右侧真正的物理内存已经被塞得像个狗皮膏药，但在左侧的微信和游戏眼里，自己的内存条永远是连续且干净的。更重要的是，微信绝对访问不到橘色的物理块，保证了安全！
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const wechatBlocks = ref(0)
const gameBlocks = ref(0)

// 初始物理内存状态，模拟碎片化
// empty = 空, os = 系统占用
const initialPhysicalBlocks = [
  { type: 'os', label: '系统核心占用' },
  { type: 'empty', label: '空闲' },
  { type: 'os', label: '系统保留' },
  { type: 'empty', label: '空闲' },
  { type: 'empty', label: '空闲' },
  { type: 'empty', label: '空闲' },
  { type: 'os', label: '系统驱动' },
  { type: 'empty', label: '空闲' },
]

const physicalBlocks = ref(JSON.parse(JSON.stringify(initialPhysicalBlocks)))

const freeSpaceCount = computed(() => {
  return physicalBlocks.value.filter(b => b.type === 'empty').length
})

const hasFreeSpace = computed(() => freeSpaceCount.value > 0)

const allocate = (process) => {
  if (!hasFreeSpace.value) return
  
  // Find a process block logic
  if (process === 'wechat' && wechatBlocks.value < 4) {
    wechatBlocks.value++
    fillRandomEmptyBlock('wechat', `微信数据 ${wechatBlocks.value}`)
  } else if (process === 'game' && gameBlocks.value < 4) {
    gameBlocks.value++
    fillRandomEmptyBlock('game', `游戏数据 ${gameBlocks.value}`)
  }
}

const fillRandomEmptyBlock = (type, label) => {
  const emptyIndices = []
  physicalBlocks.value.forEach((b, i) => {
    if (b.type === 'empty') emptyIndices.push(i)
  })
  
  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
    physicalBlocks.value[randomIndex] = { type, label }
  }
}

const reset = () => {
  wechatBlocks.value = 0
  gameBlocks.value = 0
  physicalBlocks.value = JSON.parse(JSON.stringify(initialPhysicalBlocks))
}
</script>

<style scoped>
.memory-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.demo-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.allocate-btn {
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.allocate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(1);
}
.allocate-btn.wechat {
  background: var(--vp-c-success-1);
}
.allocate-btn.wechat:not(:disabled):hover {
  filter: brightness(1.1);
}
.allocate-btn.game {
  background: var(--vp-c-warning-1);
}
.allocate-btn.game:not(:disabled):hover {
  filter: brightness(1.1);
}

.reset-btn {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.reset-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.system-view {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .system-view {
    flex-direction: column;
  }
}

.title {
  font-size: 0.85rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  min-height: 2.5rem;
}

.virtual-cluster {
  display: flex;
  gap: 1rem;
  flex: 2;
}

.process-vm {
  flex: 1;
  background: var(--vp-c-bg-alt);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
}

.vm-blocks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block {
  padding: 0.6rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.3s;
}

.process-vm .block {
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  opacity: 0.5;
}
.process-vm.wechat .block.filled {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid var(--vp-c-success-1);
  color: var(--vp-c-success-1);
  opacity: 1;
}
.process-vm.game .block.filled {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid var(--vp-c-warning-1);
  color: var(--vp-c-warning-1);
  opacity: 1;
}

.os-page-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 10px;
  padding: 1rem;
  position: relative;
  border: 2px solid var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.os-page-table .table-info {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  text-align: center;
  background: var(--vp-c-bg);
  padding: 0.8rem;
  border-radius: 8px;
}

.physical-memory {
  flex: 1;
  background: var(--vp-c-bg-alt);
  border-radius: 10px;
  padding: 1rem;
  border: 2px solid var(--vp-c-text-3);
}

.pm-blocks {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.pm-blocks .block {
  padding: 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.pm-blocks .block.os {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border-style: dashed;
}
.pm-blocks .block.wechat {
  background: var(--vp-c-success-1);
  color: white;
  border-color: var(--vp-c-success-1);
  animation: popIn 0.3s ease-out;
}
.pm-blocks .block.game {
  background: var(--vp-c-warning-1);
  color: white;
  border-color: var(--vp-c-warning-1);
  animation: popIn 0.3s ease-out;
}

@keyframes popIn {
  0% { transform: scale(0.9); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.explanation-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(16, 185, 129, 0.1);
  border-left: 4px solid var(--vp-c-success-1);
  border-radius: 0 8px 8px 0;
  font-size: 0.95rem;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
