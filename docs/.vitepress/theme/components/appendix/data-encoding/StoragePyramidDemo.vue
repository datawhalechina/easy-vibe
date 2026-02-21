<template>
  <div class="storage-pyramid-demo">
    <div class="pyramid-area">
      <div
        v-for="(layer, i) in layers"
        :key="layer.name"
        class="pyramid-layer"
        :class="[layer.colorClass, { active: selectedLayer === i }]"
        :style="{ width: (40 + i * 15) + '%' }"
        @click="selectedLayer = i"
      >
        <span class="layer-icon">{{ layer.icon }}</span>
        <span class="layer-name">{{ layer.name }}</span>
        <span class="layer-speed">{{ layer.speedLabel }}</span>
      </div>
    </div>

    <div class="detail-panel" v-if="currentLayer">
      <div class="detail-header">
        <span class="detail-icon">{{ currentLayer.icon }}</span>
        <span class="detail-name">{{ currentLayer.name }}</span>
        <span class="detail-badge" :class="currentLayer.colorClass">{{ currentLayer.speedLabel }}</span>
      </div>

      <div class="detail-stats">
        <div class="stat-item">
          <div class="stat-bar-label">
            <span>访问速度</span>
            <span class="stat-val">{{ currentLayer.speed }}</span>
          </div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill" :class="currentLayer.colorClass" :style="{ width: currentLayer.speedPct + '%' }"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-bar-label">
            <span>典型容量</span>
            <span class="stat-val">{{ currentLayer.capacity }}</span>
          </div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill cap-bar" :style="{ width: currentLayer.capacityPct + '%' }"></div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-bar-label">
            <span>单价（每GB）</span>
            <span class="stat-val">{{ currentLayer.price }}</span>
          </div>
        </div>
      </div>

      <div class="analogy-box">
        <div>
          <strong>生活类比：</strong>{{ currentLayer.analogy }}
        </div>
      </div>

      <div class="use-case-box">
        <strong>实际用途：</strong>{{ currentLayer.useCase }}
      </div>
    </div>

    <div class="insight-bar">
      <strong>提示：</strong>越快越贵，越慢越大。CPU 缓存极快但只有几 MB；机械硬盘虽慢但便宜又能存 TB。操作系统会自动在各层之间搬运数据——这叫<strong>存储层次结构</strong>。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const layers = [
  {
    name: 'CPU 寄存器',
    icon: 'L0',
    speedLabel: '极快',
    colorClass: 'tier-0',
    speed: '< 1 纳秒',
    speedPct: 98,
    capacity: '几百字节',
    capacityPct: 2,
    price: '极贵（集成在CPU）',
    analogy: '你大脑里当前正在「想」的那个数字——随取随用，但只能记住一两个。',
    useCase: 'CPU 内部运算时临时存放操作数和指令，程序员几乎不需要直接管理它。'
  },
  {
    name: 'CPU 缓存（Cache）',
    icon: 'L1',
    speedLabel: '很快',
    colorClass: 'tier-1',
    speed: '5–50 纳秒',
    speedPct: 82,
    capacity: '几 KB ~ 几十 MB',
    capacityPct: 5,
    price: '贵',
    analogy: '你办公桌上的便签纸——放最近用过的东西，翻找极快，但桌面面积有限。',
    useCase: '缓存最近频繁访问的内存数据，减少 CPU 等待时间。大多数性能敏感程序都会考虑「缓存友好」写法。'
  },
  {
    name: '内存（RAM）',
    icon: 'L2',
    speedLabel: '快',
    colorClass: 'tier-2',
    speed: '几十 ~ 100 纳秒',
    speedPct: 60,
    capacity: '几 GB ~ 几百 GB',
    capacityPct: 25,
    price: '适中（约 ¥30/GB）',
    analogy: '你打开的浏览器标签页——断电就没了，但当前工作全在这里。',
    useCase: '运行中的程序、操作系统、当前打开的文件都住在内存里。内存不够了→程序卡顿甚至崩溃。'
  },
  {
    name: 'SSD（固态硬盘）',
    icon: 'L3',
    speedLabel: '较快',
    colorClass: 'tier-3',
    speed: '~100 微秒',
    speedPct: 35,
    capacity: '几百 GB ~ 几 TB',
    capacityPct: 60,
    price: '便宜（约 ¥0.5/GB）',
    analogy: '你电脑里的文件夹——关机后数据还在，但比内存慢上千倍。',
    useCase: '存储操作系统、应用程序、用户文件。现在的 NVMe SSD 已经非常快了。'
  },
  {
    name: '机械硬盘（HDD）',
    icon: 'L4',
    speedLabel: '慢',
    colorClass: 'tier-4',
    speed: '~10 毫秒',
    speedPct: 15,
    capacity: '几 TB ~ 几十 TB',
    capacityPct: 90,
    price: '最便宜（约 ¥0.1/GB）',
    analogy: '仓库里的档案柜——容量巨大、便宜，但找东西要走过去翻，慢。',
    useCase: '存储大量冷数据、备份、视频录像。现在大多数笔记本已经换成 SSD 了。'
  }
]

const selectedLayer = ref(2)  // default: RAM

const currentLayer = computed(() => layers[selectedLayer.value])
</script>

<style scoped>
.storage-pyramid-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pyramid-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.pyramid-layer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  user-select: none;
}

.pyramid-layer:hover { filter: brightness(1.05); transform: scaleX(1.01); }
.pyramid-layer.active { border-color: var(--vp-c-text-1); filter: brightness(1.08); }

.tier-0 { background: linear-gradient(90deg, #7c3aed22, #7c3aed44); border-left: 4px solid #7c3aed; }
.tier-1 { background: linear-gradient(90deg, #2563eb22, #2563eb44); border-left: 4px solid #2563eb; }
.tier-2 { background: linear-gradient(90deg, #059669 22, #05966944); border-left: 4px solid #059669; }
.tier-3 { background: linear-gradient(90deg, #d97706 22, #d9770644); border-left: 4px solid #d97706; }
.tier-4 { background: linear-gradient(90deg, #dc262622, #dc262644); border-left: 4px solid #dc2626; }

.tier-0.active, .tier-0:hover { background: #7c3aed22; }
.tier-1.active, .tier-1:hover { background: #2563eb22; }

.layer-icon { font-size: 1.1rem; }
.layer-name { font-weight: bold; font-size: 0.88rem; flex: 1; margin-left: 0.5rem; }
.layer-speed { font-size: 0.75rem; color: var(--vp-c-text-2); }

/* Detail Panel */
.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon { font-size: 1.4rem; }
.detail-name { font-size: 1rem; font-weight: bold; flex: 1; }

.detail-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}
.tier-0.detail-badge { background: #7c3aed; }
.tier-1.detail-badge { background: #2563eb; }
.tier-2.detail-badge { background: #059669; }
.tier-3.detail-badge { background: #d97706; }
.tier-4.detail-badge { background: #dc2626; }

.detail-stats { display: flex; flex-direction: column; gap: 0.5rem; }

.stat-item { display: flex; flex-direction: column; gap: 0.2rem; }

.stat-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.stat-val { font-weight: bold; color: var(--vp-c-text-1); }

.stat-bar-bg {
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.tier-0.stat-bar-fill { background: #7c3aed; }
.tier-1.stat-bar-fill { background: #2563eb; }
.tier-2.stat-bar-fill { background: #059669; }
.tier-3.stat-bar-fill { background: #d97706; }
.tier-4.stat-bar-fill { background: #dc2626; }
.cap-bar { background: var(--vp-c-text-3); }

.analogy-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  line-height: 1.6;
}

.analogy-icon { font-size: 1.1rem; flex-shrink: 0; }

.use-case-box {
  font-size: 0.83rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.insight-bar {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.85rem;
  line-height: 1.6;
}
</style>
