<template>
  <div class="cpu-arch-demo">
    <div class="demo-header">
      <span class="icon">🖥️</span>
      <span class="title">CPU 架构全貌</span>
      <span class="subtitle">从门电路到处理器</span>
    </div>

    <div class="demo-content">
      <div class="architecture-layers">
        <div 
          v-for="(layer, i) in layers" 
          :key="layer.name"
          class="layer"
          :class="{ active: activeLayer === i }"
          @click="activeLayer = activeLayer === i ? null : i"
        >
          <div class="layer-header">
            <span class="layer-icon">{{ layer.icon }}</span>
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-count">{{ layer.count }}</span>
          </div>
          <Transition name="fade">
            <div
              v-if="activeLayer === i"
              class="layer-detail"
            >
              <p class="detail-desc">
                {{ layer.desc }}
              </p>
              <div class="detail-example">
                <span class="example-label">🌰 例子：</span>
                <span class="example-content">{{ layer.example }}</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <div class="cpu-components">
        <div class="comp-title">
          CPU 核心组件
        </div>
        <div class="comp-grid">
          <div
            v-for="comp in components"
            :key="comp.name"
            class="comp-item"
          >
            <span class="comp-icon">{{ comp.icon }}</span>
            <span class="comp-name">{{ comp.name }}</span>
            <span class="comp-desc">{{ comp.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>CPU是层次化构建的：晶体管→逻辑门→功能单元→处理器。每一层都是下一层的"积木"，最终形成能执行程序的"大脑"。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref(null)

const layers = [
  {
    name: '晶体管',
    icon: '⚡',
    count: '数十亿个',
    desc: '最基本的开关单元，用半导体材料制成。现代CPU包含数十亿个晶体管。',
    example: 'Apple M2 芯片有约 200 亿个晶体管'
  },
  {
    name: '逻辑门',
    icon: '🔌',
    count: '数亿个',
    desc: '由多个晶体管组成，实现基本逻辑运算（AND、OR、NOT等）。',
    example: '一个 AND 门需要 2-6 个晶体管'
  },
  {
    name: '功能单元',
    icon: '🔧',
    count: '数百个',
    desc: '由逻辑门组成，实现特定功能：加法器、多路选择器、寄存器等。',
    example: '一个 64 位加法器需要约 1000 个逻辑门'
  },
  {
    name: 'CPU 核心',
    icon: '🧠',
    count: '1-128个',
    desc: '包含完整的运算和控制能力，能独立执行指令流。',
    example: 'Intel i9-13900K 有 24 核心'
  }
]

const components = [
  { icon: '📊', name: 'ALU', desc: '算术逻辑单元，做加减乘除和逻辑运算' },
  { icon: '📁', name: '寄存器', desc: '超高速存储，存放正在处理的数据' },
  { icon: '🎮', name: '控制器', desc: '指挥官，解码指令并协调各部件' },
  { icon: '🚌', name: '总线', desc: '数据高速公路，连接各部件' }
]
</script>

<style scoped>
.cpu-arch-demo {
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

.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.layer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.layer:hover {
  border-color: var(--vp-c-brand);
}

.layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.layer-icon {
  font-size: 1rem;
}

.layer-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.layer-count {
  margin-left: auto;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.layer-detail {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-desc {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.detail-example {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.example-label {
  font-weight: bold;
}

.cpu-components {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.comp-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.comp-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.comp-item {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.comp-icon {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.comp-name {
  font-weight: bold;
  font-size: 0.85rem;
}

.comp-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
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
