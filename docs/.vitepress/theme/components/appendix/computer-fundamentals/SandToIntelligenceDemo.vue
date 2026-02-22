<template>
  <div class="sand-demo">
    <div class="demo-label">从沙子到智能 ── 每一层都是对下一层的封装</div>

    <div class="layers">
      <div
        v-for="(layer, i) in layers" :key="i"
        class="layer-row"
        :class="{ active: activeLayer === i }"
        @mouseenter="activeLayer = i"
        @mouseleave="activeLayer = null"
      >
        <div class="layer-num">{{ i + 1 }}</div>
        <div class="layer-icon">{{ layer.icon }}</div>
        <div class="layer-body">
          <div class="layer-name">{{ layer.name }}</div>
          <div class="layer-desc">{{ layer.desc }}</div>
        </div>
        <div class="layer-scale">{{ layer.scale }}</div>
        <div v-if="i < layers.length - 1" class="arrow-down">
          <span class="arrow-label">{{ layer.arrow }}</span>
        </div>
      </div>
    </div>

    <div class="demo-caption">层层抽象封装，最底层的物理材料最终变成通用计算平台</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref(null)

const layers = [
  { icon: '🏖️', name: '沙子（硅）',     desc: '地球上最丰富的元素之一，提炼出高纯度硅',         scale: '原材料',      arrow: '提纯 → 切割' },
  { icon: '💿', name: '硅晶圆',         desc: '直径约 30cm 的单晶硅片，表面极其光滑',           scale: '基底',        arrow: '光刻 → 蚀刻 → 掺杂' },
  { icon: '🔌', name: '晶体管（开关）',  desc: 'Gate=1 导通，Gate=0 断开，用电压控制电流',       scale: '数百亿 / 芯片', arrow: '组合成逻辑电路' },
  { icon: '🔲', name: '逻辑门',         desc: 'AND / OR / NOT / XOR，实现基本布尔运算',          scale: '数十亿',      arrow: '组合成功能模块' },
  { icon: '⚙️', name: '功能单元',       desc: '加法器、寄存器、多路选择器……各司其职',            scale: '数百个',      arrow: '集成为处理器' },
  { icon: '🧠', name: 'CPU 核心',       desc: 'ALU + 控制器 + 寄存器组，取指→解码→执行→写回',   scale: '1–128 核',    arrow: '软件编程' },
  { icon: '🚀', name: '软件应用',       desc: '操作系统 / AI / 游戏 / 网页……一切皆指令',         scale: '无限可能',    arrow: '' },
]
</script>

<style scoped>
.sand-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.layers {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.layer-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border-radius: 6px;
  position: relative;
  transition: all 0.15s;
  cursor: default;
}

.layer-row:hover,
.layer-row.active {
  background: var(--vp-c-bg);
}

.layer-num {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.layer-row.active .layer-num {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.layer-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.layer-body {
  flex: 1;
  min-width: 0;
}

.layer-name {
  font-size: 0.88rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.layer-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.layer-scale {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  flex-shrink: 0;
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

/* ── arrow between layers ── */
.arrow-down {
  position: absolute;
  left: 1.1rem;
  bottom: -0.55rem;
  z-index: 1;
}

.arrow-label {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0 0.3rem;
  white-space: nowrap;
}

.demo-caption {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.6rem;
  text-align: center;
}

@media (max-width: 600px) {
  .layer-scale {
    display: none;
  }
}
</style>
