<template>
  <div class="demo">
    <div class="title">🧠 操作系统给每个程序"画饼"</div>
    
    <div class="scene">
      <!-- 程序视角 -->
      <div class="view-box">
        <div class="view-title">📱 程序以为的内存（虚拟）</div>
        <div class="virtual-mem">
          <div class="proc-mem wechat">
            <div class="proc-label">💬 微信</div>
            <div class="mem-blocks">
              <div 
                v-for="n in 4" 
                :key="n"
                class="v-block"
                :class="{ filled: wechatProgress >= n * 25 }"
              >{{ n }}</div>
            </div>
          </div>
          <div class="proc-mem game">
            <div class="proc-label">🎮 游戏</div>
            <div class="mem-blocks">
              <div 
                v-for="n in 4" 
                :key="n"
                class="v-block game"
                :class="{ filled: gameProgress >= n * 25 }"
              >{{ n }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 映射箭头 -->
      <div class="mapping-arrow">
        <div class="arrow-text">操作系统偷偷映射 ↓</div>
        <div class="mapping-lines">
          <div 
            v-for="(map, idx) in visibleMappings" 
            :key="idx"
            class="map-line"
            :class="map.type"
            :style="{ animationDelay: idx * 0.2 + 's' }"
          >
            <span class="from">{{ map.from }}</span>
            <span class="line"></span>
            <span class="to">{{ map.to }}</span>
          </div>
        </div>
      </div>

      <!-- 物理内存 -->
      <div class="view-box physical">
        <div class="view-title">💾 真实的内存条（物理）</div>
        <div class="physical-mem">
          <div 
            v-for="(block, idx) in physicalBlocks" 
            :key="idx"
            class="p-block"
            :class="[block.type, { active: block.active }]"
          >
            <span class="p-addr">{{ idx + 1 }}</span>
            <span class="p-owner">{{ block.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="explain">
      <strong>💡 原理：</strong>每个程序以为自己独占连续的内存（左），实际上操作系统把数据分散存到真实内存各处（右）。程序看到的地址都是"假"的，操作系统负责翻译。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const wechatProgress = ref(0)
const gameProgress = ref(0)
const currentMapping = ref(0)

// 物理内存状态
const physicalBlocks = ref([
  { type: 'os', label: '系统', active: false },
  { type: 'empty', label: '', active: false },
  { type: 'empty', label: '', active: false },
  { type: 'os', label: '系统', active: false },
  { type: 'empty', label: '', active: false },
  { type: 'empty', label: '', active: false },
  { type: 'empty', label: '', active: false },
  { type: 'os', label: '系统', active: false }
])

// 映射关系（虚拟地址 -> 物理地址）
const mappings = [
  { from: '微信-1', to: '物理-2', type: 'wechat' },
  { from: '微信-2', to: '物理-3', type: 'wechat' },
  { from: '游戏-1', to: '物理-5', type: 'game' },
  { from: '游戏-2', to: '物理-6', type: 'game' }
]

const visibleMappings = computed(() => {
  return mappings.slice(0, currentMapping.value)
})

let timer = null
let phase = 0

const runDemo = () => {
  switch(phase) {
    case 0: // 微信申请内存
      wechatProgress.value = 50
      physicalBlocks.value[1] = { type: 'wechat', label: 'W1', active: true }
      physicalBlocks.value[2] = { type: 'wechat', label: 'W2', active: true }
      currentMapping.value = 2
      phase = 1
      break
    case 1: // 游戏申请内存
      gameProgress.value = 50
      physicalBlocks.value[4] = { type: 'game', label: 'G1', active: true }
      physicalBlocks.value[5] = { type: 'game', label: 'G2', active: true }
      currentMapping.value = 4
      phase = 2
      break
    case 2: // 高亮显示
      physicalBlocks.value.forEach(b => b.active = false)
      phase = 3
      break
    case 3: // 重置
      wechatProgress.value = 0
      gameProgress.value = 0
      currentMapping.value = 0
      physicalBlocks.value[1] = { type: 'empty', label: '', active: false }
      physicalBlocks.value[2] = { type: 'empty', label: '', active: false }
      physicalBlocks.value[4] = { type: 'empty', label: '', active: false }
      physicalBlocks.value[5] = { type: 'empty', label: '', active: false }
      phase = 0
      break
  }
}

onMounted(() => {
  timer = setInterval(runDemo, 2000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 1rem 0;
}

.title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
}

.scene {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.view-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 10px;
}

.view-box.physical {
  background: #1a1a2e11;
}

.view-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
  text-align: center;
}

.virtual-mem {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.proc-mem {
  display: flex;
  align-items: center;
  gap: 8px;
}

.proc-label {
  font-size: 11px;
  width: 50px;
  flex-shrink: 0;
}

.mem-blocks {
  display: flex;
  gap: 4px;
  flex: 1;
}

.v-block {
  flex: 1;
  height: 28px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: var(--vp-c-text-3);
  transition: all 0.3s;
}

.v-block.filled {
  background: #16a34a33;
  border: 1px solid #16a34a;
  color: #16a34a;
  font-weight: 600;
}

.v-block.game.filled {
  background: #d9770633;
  border-color: #d97706;
  color: #d97706;
}

.mapping-arrow {
  text-align: center;
  padding: 4px 0;
}

.arrow-text {
  font-size: 10px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.mapping-lines {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.map-line {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  animation: fade-in 0.3s ease;
}

.map-line.wechat {
  color: #16a34a;
}

.map-line.game {
  color: #d97706;
}

.map-line .line {
  width: 20px;
  height: 1px;
  background: currentColor;
}

.physical-mem {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.p-block {
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  transition: all 0.3s;
}

.p-block.os {
  background: var(--vp-c-bg-soft);
  border-style: dashed;
  color: var(--vp-c-text-3);
}

.p-block.wechat {
  background: #16a34a22;
  border-color: #16a34a;
  color: #16a34a;
}

.p-block.game {
  background: #d9770622;
  border-color: #d97706;
  color: #d97706;
}

.p-block.active {
  box-shadow: 0 0 8px currentColor;
  transform: scale(1.05);
}

.p-addr {
  font-size: 8px;
  opacity: 0.7;
}

.p-owner {
  font-weight: 600;
}

.explain {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.explain strong { color: var(--vp-c-text-1); }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
