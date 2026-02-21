<template>
  <div class="cpu-arch-demo">
    <div class="demo-header">
      <span class="title">CPU 架构全貌</span>
      <span class="subtitle">从功能单元到完整核心</span>
    </div>

    <div class="architecture-overview">
      <div class="overview-title">核心组件一览（静态展示）</div>
      <div class="overview-grid">
        <div v-for="comp in components" :key="comp.name" class="overview-card">
          <div class="card-top">
            <span class="comp-icon">{{ comp.icon }}</span>
            <span class="comp-name">{{ comp.name }}</span>
          </div>
          <div class="comp-desc">{{ comp.desc }}</div>
          <div class="comp-role">{{ comp.role }}</div>
        </div>
      </div>
    </div>

    <div class="instruction-flow">
      <div class="flow-title">一条指令在 CPU 内部的流动</div>
      <div class="flow-steps">
        <div
          v-for="(step, index) in instructionFlow"
          :key="step.name"
          class="flow-step"
        >
          <span class="step-index">{{ index + 1 }}</span>
          <span class="step-name">{{ step.name }}</span>
          <span class="step-desc">{{ step.desc }}</span>
          <span
            v-if="index < instructionFlow.length - 1"
            class="step-arrow"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong
      >CPU 不是单一部件，而是多个功能单元的有序协作：控制器负责调度，ALU 负责计算，寄存器负责高速暂存，总线负责连接与传输。
    </div>
  </div>
</template>

<script setup>
const components = [
  {
    icon: '🎮',
    name: '控制器（CU）',
    desc: '负责取指、解码和发出控制信号',
    role: '像指挥员，安排每个模块何时工作'
  },
  {
    icon: '📊',
    name: 'ALU',
    desc: '执行加减与、或、比较等运算',
    role: '像计算器，完成核心算术与逻辑处理'
  },
  {
    icon: '📁',
    name: '寄存器组',
    desc: '保存当前最常用的数据和中间结果',
    role: '像桌面便签，读写速度远高于内存'
  },
  {
    icon: '🚌',
    name: '内部总线',
    desc: '在模块间传输数据、地址和控制信息',
    role: '像高速通道，把各组件连接成整体'
  }
]

const instructionFlow = [
  { name: '取指', desc: '控制器从缓存/内存取来指令' },
  { name: '解码', desc: '识别指令类型与需要的操作数' },
  { name: '执行', desc: 'ALU 或其他单元完成具体运算' },
  { name: '写回', desc: '结果写入寄存器，供后续指令使用' }
]
</script>

<style scoped>
.cpu-arch-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1.25rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.overview-title,
.flow-title {
  font-weight: bold;
  font-size: 0.92rem;
  margin-bottom: 0.5rem;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}

.overview-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.7rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.comp-icon {
  font-size: 1rem;
}

.comp-name {
  font-weight: bold;
  font-size: 0.85rem;
}

.comp-desc {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.comp-role {
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.25rem 0.4rem;
}

.instruction-flow {
  margin-top: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.flow-step {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.35rem 0.55rem;
}

.step-index {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: bold;
}

.step-name {
  font-size: 0.78rem;
  font-weight: bold;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.step-arrow {
  margin-left: 0.1rem;
  color: var(--vp-c-text-3);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.85rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 680px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
